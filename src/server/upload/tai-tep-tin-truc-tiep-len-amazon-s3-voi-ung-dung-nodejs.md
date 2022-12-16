Các ứng dụng web thường được thiết kế với khả năng cho phép người dùng tải lên các tập tin như hình ảnh hoặc tài liệu lưu trữ. Amazone S3 là một tuỳ chọn phổ biến và đáng tin cậy.

Bài viết này hướng dẫn tạo ra một ứng dụng Node.js, tải trực tiếp tập tin lên S3 thay vì thông qua ứng dụng web, sử dụng tính năng chia sẻ tài nguyên của S3 - Cross-Origin Resource Sharing (CORS).

Trong bài hướng dẫn mình sẽ sử dụng expressjs để hỗ trợ xây dựng một http server, xử lý các yêu cầu từ phía client, nhưng quy trình thì dùng chung cho tất cả các ứng dụng Node.js.

# Amazon S3
"Amazon S3 (Amazon Simple Storage Service) là dịch vụ lưu trữ đối tượng được xây dựng để lưu trữ và truy xuất bất kỳ lượng dữ liệu nào từ bất cứ đâu – trang web và ứng dụng di động, ứng dụng doanh nghiệp và dữ liệu từ cảm biến hoặc thiết bị IoT. "


-----
Việc lưu trữ trên S3 được tổ chức thành các bucket, mỗi bucket có một tên duy nhất trên toàn cầu. Trong mỗi bucket chúng ta lưu các tập tin riêng lẻ (gọi là các Object), hoặc tạo ra các thư mục.

Để thực hiện được theo bài viết này, tôi mặc định chúng ta có các kiến thức cơ bản về Nodejs, http, Amazon S3 và một tài khoản aws console - tài khoản có quyền tải các tập tin lên các bucket của S3.

# Tải file trực tiếp lên S3
**Ưu điểm** chính của phương pháp này là chúng ta sẽ tải file trực tiếp lên s3, mà không cần thông qua ứng dụng của mình, điều này có nghĩa chúng ta sẽ tận dụng hoàn toàn được hạ tầng của dịch vụ S3, lưu lượng qua ứng dụng từ đó sẽ được giảm xuống, đặc biệt khi những file được tải lên là những file có kích thước lớn.

Ứng dụng server-side được viết bằng Nodejs sẽ đảm nhận nhiệm vụ tạo ra một đường dẫn có chữ ký, đường dẫn này sẽ được ứng dụng client-side sử dụng để thực hiện tải file trực tiếp lên S3. Quá trình tải file lên S3 là một quá trình không đồng bộ, việc xử lý luồng của ứng dụng sẽ được điều khiển hoàn toàn ở phía client-side (ví dụ: Bạn có thể làm hiển thị nội dung file khi file được tải lên thành công, thay vì phải tải lại toàn bộ trang).


## Mô tả
Bài viết sẽ mô tả thực hiện một ứng dụng có nội dung như sau:

* Chọn một file để tải lên bởi người dùng trong trình duyệt web.
* Ứng dụng Client-side sẽ tạo ra một http request tới Server-side để yêu cầu một link có chữ ký tạm thời cho việc tải file lên S3.
* Link có chữ ký tạm thời sẽ được trả lại Client-side dưới dạng một đối tượng JSON.
* Client-side sử dụng link tạm đó thực hiện tải file lên S3.

-----
Bài viết này bao gồm thông tin về cách xây dựng và thực hiện cả ở phía client và server để tạo thành một hệ thống hoàn chỉnh. Sau khi hoàn thành hướng dẫn chúng ta sẽ có một hệ thống đơn giản, cho phép người dùng tải file lên S3.

Việc tạo ra một link có chữ ký ở phía server side được thực hiện bằng [AWS SDK](http://aws.amazon.com/sdk-for-node-js), các bạn có thể đọc thêm để biết về các tuỳ chọn cho phương thức này.

## Chuẩn bị
* Tạo một bucket trên S3.
* Có Key xác thực của Amazon, key này phải có quyền **ghi** vào bucket S3 được tạo ở trên.

## Thiết lập ban đầu

### S3 bucket
Chúng ta cần chỉnh sửa một số thuộc tính của S3 bucket để cho phép thực các request có đủ đặc quyền ghi các object vào bucket.

Các bạn thiết lập quyền CORS như trong hình:

![](https://images.viblo.asia/8a3cf8df-490c-42dc-be88-1c516a835f9c.png)

CORS (Cross-Origin Resource Sharing) sẽ cho phép ứng dụng của bạn có các quyền truy cập vào nội dung của bucket. Quy tắc này chỉ có tác dụng trên bucket mà bạn đặt quy tắc. **Các quy tắc có tác dụng trên các domain mà bạn quy định.**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

Với phân quyền như thế này, mọi tên miền đều có quyền truy cập vào bucket, **thiết lập này chỉ dành cho thử nghiệm. Khi triển khai các ứng dụng, các bạn có thể sửa lại giá trị "AllowedOrigin", chỉ chấp nhận các yêu cầu từ domain của ứng dụng.**

### Xây dựng ứng dụng
Tạo thư mục cho ứng dụng (nếu bạn chưa tạo) và tạo các thư mục cần thiết:

```shell
mkdir S3DirectUploader
cd S3DirectUploader
mkdir views
mkdir public
npm init -y
```

Chúng ta sẽ thấy một file có tên `package.json`, chúng ta sẽ thêm vào các package mà ứng dụng sẽ dùng:

```json
{
  "name": "S3DirectUploader",
  "version": "0.0.1",

  ...

  "dependencies": {
    "aws-sdk": "2.377.0",
    "ejs": "2.6.1",
    "express": "4.16.4"
  }
}
```

Tiến hành cài đặt các gói:

```shell
npm install
```



-----
Để ứng dụng có thể có quyền sinh link có chữ ký bằng aws-sdk, chúng ta phải thiết lập key xác thực của aws (AWS_ACCESS_KEY_ID và AWS_SECRET_ACCESS_KEY), có nhiều cách để làm việc này, nhưng đơn giản nhất là đặt chúng vào biến môi trường:

```shell
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key

# Đặt luôn tên bucket vào biến môi trường
export S3_BUCKET=xxx
```

Vì lý do bảo mật nên đây là cách được khuyên dùng, tuyệt đối không nên ghi các giá trị này bằng cách ghi trực tiếp trong code của chương trình. Nếu các bạn có sử dụng file `.env` thì nhớ cho file này vào `.gitignore` và chỉ sử dụng chúng ở môi trường local dev.

####  Ứng dụng phía client

Chúng ta sẽ làm ví dụ với một giao diện như thế này:

![](https://images.viblo.asia/a5ad3744-5d8b-4f0d-bd48-7eab05984b89.png)

Chọn một file ảnh để làm ảnh đại diện, quá trình tải lên sẽ được thực hiện, nhất nút "Update profile" cập nhật thông tin cho người dùng :D

Tạo ra một file `views/profile.html`, có nội dung chính như sau:

```html
<input type="file" id="file-input">
<p id="status">Please select a file</p>
<img id="preview" src="/images/default.png">

<form method="POST" action="/profile">
  <input type="hidden" id="avatar-url" name="avatar-url" value="/images/default.png">
  <input type="submit" value="Update profile">
</form>
```


`#preview` dùng để hiển thị ảnh đại diện được lựa chọn đã tải lên.

`#avatar-url` input chứa giá trị đường dẫn ảnh đại diện mới khi ảnh được tải lên thành công. Khi người dùng nhấn nút `submit` thông tin này sẽ được xử lý bởi phía server.


-----

Chúng ta sẽ không dùng thêm thư việc bên thứ ba để xử lý việc tải ảnh lên, ứng dụng client sẽ thực hiện hai nhiệm vụ:

* Gửi yêu cầu lấy link để upload trực tiếp ảnh đại diện lên S3
* Thực hiện tải ảnh lên S3

Để cho nhanh chúng ta sẽ tạo ra một thẻ `<script>` ở cuối nội dung html của file `profile.html`, điều này đảm bảo script sẽ được chạy khi các thành phần khác đã sẵn sàng.

Nội dung trong thẻ script:

```javascript
(() => {
  document.getElementById("file-input").onchange = () => {
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if(file == null){
      return alert('Bạn không chọn file :|');
    }
    getSignedRequest(file);
  };
})();
```

Đoạn code xử lý sự kiện `onchange` của  `input#file-input` - Khi người dùng chọn một file.

Nội dùng hàm `getSignedRequest`

```javascript
function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/signed-link-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Không thể lấy được link upload :|');
      }
    }
  };
  xhr.send();
}
```

Hàm trên truyền lên **Tên** và **Loại file (mime type)** trong tham số của phương thức GET, các thông tin này cần cho việc sinh ra link có kèm chữ ký - ký cho các thông tin yêu này.


Khi đã có link upload trực tiếp, việc còn lại là tải ảnh lên:

```javascript
function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.getElementById('preview').src = url;
        document.getElementById('avatar-url').value = url;
      }
      else{
        alert('Tải ảnh không thành công :|');
      }
    }
  };
  xhr.send(file);
}
```

Nếu ảnh được tải lên thành công, chúng ta thay đổi ảnh preview, và giá trị của input `#avatar-url`. url của ảnh là ID của object trên S3, thông tin này được trả về ngay khi chúng ta cung cấp thông tin của ảnh để sinh ra signed link.


####  Ứng dụng phía server

Đầu tiên chúng ta tạo ra một ứng dụng web cơ bản với expressjs

Tạo file `app.js` có nội dung:

```javascript
const express = require('express');
const aws = require('aws-sdk');

const app = express();
app.set('views', './views');
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 4000);

const S3_BUCKET = process.env.S3_BUCKET;
```

Xử lý yêu cầu khi người dùng sử dụng trình duyệt web truy cập vào đường dẫn http://example.com/profile

```javascript
app.get('/profile', (req, res) => res.render('account.html'));
```

Xử lý khi client side yêu cầu cung cấp một signed link:

```javascript
app.get('/signed-link-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});
```

Đơn giản, tôi đã bỏ qua các bước kiểm tra cần thiết khác.

Thêm một router nữa:

```javascript
app.post('/profile', (req, res) => {
  // TODO: Xử lý thông tin người dùng gủi lên. ex: req.body['avatar-url']
});
```

Chạy ứng dụng:

```shell
node app.js
```

Dùng trình duyệt truy cập vào đường dẫn: http://localhost:4000/profile

# Kết luận

Bài viết thực hiện một kịch bản khá đơn giản, nhưng dựa vào những kiến thức mà bài viết cung cấp, chúng ta rất dễ dàng để mở rộng tính năng tương tự trong từng trường hợp riêng.