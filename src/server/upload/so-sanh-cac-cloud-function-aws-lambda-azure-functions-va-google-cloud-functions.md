Trong những năm gần đây nhu cầu về các function trên cloud đã dần trở nên phổ biến, Có rất nhiều các nhà cung cấp không có máy chủ cho bạn lựa chọn. Bài viết này mô tả đánh giá qua về các nhà cung cấp không máy chủ nổi tiếng.

# Giới thiệu về AWS Lambda

AWS Lambda là đơn vị đầu tiên đi tiên phong trong lĩnh vực cloud không máy chủ vào năm 2014. Để sử dụng aws lambda rất đơn giản đầu tiên bạn hãy tải mã code của bạn lên đó. Nó sẽ cung cấp mọi thứ mà bạn yêu cầu để có thể chạy được và có độ mở rộng cao. 

Để khởi tạo ra 1 function lambda JavaScript đơn giản tạo 1 file `lambda.js`.  Để biết thêm thông tin về lambda có thể tham khảo tại [Node.js Lambda Programming Model](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html) trên aws

```js
exports.handler = function (event, context) {
	context.succeed('hello world');
};
```
để gửi được file code trên lên aws bạn có thể cài đặt tool `claudia` và chạy lệnh sau

```sh
$ npm install claudia -g
$ claudia create --region us-east-1 --handler lambda.handler
```

và bây giờ nếu muốn chạy function trên cloud bạn có thể gọi trực tiếp qua console

```sh
$ claudia test-lambda
```

Response

```json
{
  "StatusCode": 200,
  "Payload": "\"hello world\""
}
```

Có 1 ưu điểm của lambda là với mỗi hàm chạy gần đây bạn có thể log lại trạng thái của mỗi hàm bằng một hàm khác. Hiện tại nó được lập hoá đơn dựa trên số lần yêu cầu và thời gian thực thi tính trên đơn vị `ms`.
### Support language
Ngôn ngữ support của lambda cũng khá phổ biến. Nó hỗ trợ rất nhiều các ngôn ngữ riêng như JavaScript, Node.js, Python, Java and C#, Và nó cũng đã hỗ trợ Golang vào đầu năm nay. Sự thoải mái về môi trường và độ linh hoạt cao của nó làm cho nó trở thành sữ lựa chọn đầu tiên của các nhà phát triển.
### Deploy
Lambda cung cấp deploy qua API với tool CLI, tải file zip, hay code trong web editor
### Quản lý dependencies
Trong lambda các dependencies được đóng gói lại tuy nhiên để làm điều đó bạn cần phải tổ chức các file dependencies đó một cách nhất định. Tuỳ theo ngôn ngữ mà các file quản lý package sẽ khác nhau.
### Xử lý đồng thời và thời gian chạy
Lambda hiện tại đang giới hạn về tổng số lần xử lý đồng thời trên các hàm tại 1 vùng nhất định khoảng 1000. Bạn có thể kiểm xoát đồng thời theo 2 cách cho từng function cá nhân riêng lẻ, hoặc theo tài khoản riêng lẻ. Thời gian thực thi lớn nhất của function là 900 seconds hoặc 15 minutes
# Giới thiệu về Azure Functions

Azure được ra đời vào năm 2016. và cho đến nay nó đang dần trở thành 1 phần không thể thiếu của Microsoft Cloud Platform. Tuy nhiên nếu so sánh với AWS lambda thì nó có vẻ ít các dịch vụ hơn. Mặt khác  nó cung cấp cho người dùng các chức năng thực tế và tích hợp mạnh mẽ. Với chức năng dễ sử dụng bạn có thể tạo hàm bằng ngôn ngữ native hoặc có thể tải các function được chỉ định lên.

Cũng giống Lambda nó cũng hỗ trợ về các `event`, `lịch trình (CRON jobs)`.

### Support language
Ngôn ngữ support của Azure như C#, F#, Python, Java, Node.js, Python & PHP. 
### Deploy
Azure Functions cung cấp cho bạn nhiều tùy chọn để deploy chức năng của bạn, chẳng hạn như GitHub, DropBox, Visual Studio, Kudu Console, tải file Zip và One Drive.
### Quản lý dependencies
Azure cho phép bạn tải cả file như `package.json` lên và có thể chạy `npm install` để quản lý package.

### Xử lý đồng thời và thời gian chạy
Azure hỗ trợ nhiều hàm xử lý đồng thời với điều kiện chúng nằm trong những ứng dụng riêng lẻ và không bị giới hạn. Số lượng các xử lý đồng thời và các hàm thực thi chức năng được giới hạn ở mức 10X số cores xử lý trên máy ảo. Nó có giới hạn về thời gian thực thi là 300 seconds or 5 minutes tuy nhiên bạn có thể nâng cấp lên 600 seconds hoặc 10 minutes

# Giới thiệu về Google Cloud Functions

Google ra đời bản Alpha vào năm 2016 và Beta vào năm 2017 và tới tháng 7 năm 2018 thì nó mới chở nên phổ biến. Tuy nhiên nếu so sánh với 2 nền tảng trên thì nó cũng có 1 vài mặt hạn chế. các `event-triggers` thì vẫn bị giới hạn trong các chủ để sự kiện nội bộ của Google. Các sự kiện sử dụng webhook thông qua giao thức http được hỗ trợ cùng với các event từ mobile platform app trên Firebase

### Support language
Google function thay đổi chức năng thực thi theo ngôn ngữ mà bạn đã chọn. Hiện tại nó hỗ trợ Node.js 6, Node.js 7 and Python 3.7 và nhiều tính năng khác cũng sẽ sớm được hỗ trợ. 
### Deploy
Để deploy nó bạn có thể sử dụng tool CLI, tải lên file zip, code trong web editor, lưu trữ đám mây.
### Quản lý dependencies
Cũng giống với Azure google function cho phép bạn install với file quản lý package `package.json`. Hoặc bạn cũng có thể đóng gói lại trực tiếp các dependencies. Ngoài ra nó còn hỗ trợ pip requirements.txt

### Xử lý đồng thời và thời gian chạy
Google không giới hạn về chạy đồng thời khi sử dụng webhook. Tuy nhiên với các kiểu gọi khác số yêu cầu hàm xử lý đồng thời là 1000. Tuy nhiên thời gian thực hiện tối đa theo mặc định là 60 seconds, có thể nâng cấp lên 540 seconds hoặc 9 minutes


# Nhận xét
Đa số các nhà phát triển thường ưa thích sử dụng AWS lambda hơn vì tính mở rộng và hiệu năng xử lý của nó. Vì được ra đời sớm hơn nên nó chăm chút khá nhiều vào các yếu tố performance.

Dưới đây là một vài hình ảnh đánh giá về cả hiệu năng và các thông số kỹ thuật của 3 đơn vị cung cấp lớn này
![](https://images.viblo.asia/2193b8d2-a1ba-4972-a326-0b44776ba98e.jpg)

![](https://images.viblo.asia/17c63d13-6a04-44b9-bec8-3147a20f89b2.png)