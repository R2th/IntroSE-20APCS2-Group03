## 1. Presigned URLs là gì nhỉ
Nếu bạn đã từng code chức năng upload S3 thì chắc bạn cũng hiểu rằng chúng ta có khá nhiều cách để upload 1 object lên S3 nhỉ. 
Tuy nhiên với nhiều hạn chế về mặt sử dụng, apply vào code và cả tính private thì mình thấy phương pháp presigned URL vẫn đảm bảo được tiêu chuẩn kép giữa việc dễ apply vào code và security. Hy vọng sau khi đọc xong bài này bạn sẽ có thêm 1 hướng giải quyết khi gặp các bài toán upload tương tự ha :D

Presigned URL cho phép bạn quyền truy cập vào 1 object cụ thể được xác định trong URL, tùy vào permissions mà người tạo đã chỉ định cho việc truy cập đó. 
Điều này có nghĩa, nếu bạn nhận được 1 presigned URL có tác dụng upload object và người tạo cho phép bạn làm việc đó, thì bạn có thể up object này lên S3 chỉ bằng cái link kia

Tất cả các object và bucket đều được mặc định ở chế độ private, presigned URLs sẽ hữu ích nếu bạn muốn người dùng của mình có thể upload 1 object nào đó lên bucket của mình mà không cần phải có AWS security credentials hay permissions được setting riêng biệt .

Khi bạn tạo ra 1 presigned URL, bạn buộc phải cung cấp đầy đủ security credentials, chỉ định bucket cụ thể, object key, HTTP method(ví dụ như PUT để upload) và thời hạn của cái link này. Presigned URL sẽ chỉ được tính là hợp lệ trong một khoảng thời gian thôi nhé, do vậy bạn phải chú ý điểm này khi sử dụng trong code. 
Nếu như action liên quan tới link gồm nhiều step, ví dụ như multipart upload chẳng hạn, thì tất cả các step đều phải chạy trước khi kết thúc thời gian expire, nếu không thì bạn sẽ nhận được 1 mã lỗi từ S3 với case này.

## 2. Các bước cần làm để thực hiện upload object 
Mình sẽ bỏ qua một số bước mà các bạn bắt buộc phải thực hiện như đăng ký tài khoản AWS, tạo user và get các key được generate từ S3 nhé.

Các bạn có thể tham khảo từ một số bài viết đang có trên Viblo, rất nhiều bạn đã viết về chủ đề này, cũng là để kéo view cho các bạn ấy luôn :joy::joy::joy:

Có 3 bước rất rõ ràng để thực hiện:

### 2.1. Tạo một instance của Aws::S3::Client class
```
require 'aws-sdk-s3'

s3 = Aws::S3::Client.new(
  region:               'us-west-2', #hoặc region khác tùy bạn ha
  access_key_id:        AWS_ACCESS_KEY_ID,
  secret_access_key:    AWS_SECRET_ACCESS_KEY
)
```
### 2.2. Generate presigned URL 
Cú pháp 
```
#presigned_request(method, params = {}) ⇒ String, Hash
```
Code:
```
signer = Aws::S3::Presigner.new(s3)
//cái này là tạo instance Presigner tương ứng với cái client mới tạo ở trên ha
url, headers = signer.presigned_request(
  :put_object, bucket: "bucket", key: "key"
)
//xong mình gọi method của instance đấy, chỗ này có thể dùng các method khác tùy ý đồ của bạn,tuy nhiên mình đang ví dụ về việc upload nên dùng put hen
```
Các thông số phụ khác bạn có thể tham khảo ở đây ha: https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/S3/Presigner.html


### 2.3. Sử dụng presigned URL để upload
Mình ví dụ với client ở đây là nodejs nhé
```
var request = require("request");
function uploadFileToS3(response) {
  var options = {
    method: 'POST',
    url: response.url,
    formData: {
      ...response.url_fields,
      file: <file-object-for-upload>
    }
  }

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
  });
}
response ở đây là kết quả gọi lên BE ở trên, tức response.url chính là presigned URL được sinh ra ở bước 2
```
## 3. Ví dụ về ứng dụng của presigned URL trong dự án cần upload trực tiếp từ client

Mình vẽ sơ bộ 1 sơ đồ mà bạn có thể thử áp dụng vào dự án của mình nhé
![image.png](https://images.viblo.asia/7fc34664-91ae-42a0-86a5-7cdb9ad3a92f.png)

Tùy dự án mà bạn có thể thay thế front end bằng mobile, hoặc thậm chí sử dụng ngay cả khi upload từ phía Back End trong một trường hợp cụ thể nào đó.

Hy vọng bài viết này sẽ giúp được các bạn phần nào đó trong việc thực hiện các task liên quan đến S3, đặc biệt là về việc upload.
Các bạn có thể tham khảo thêm các hướng dẫn từ Document chính chủ của Amazon mà mình đã dẫn ở trên nhé :sunglasses: