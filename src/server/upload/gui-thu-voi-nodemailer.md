# 1. Giới thiệu
Nodemailer là 1 module cho ứng dụng Node.js cho phép gửi mail 1 cách dễ dàng. Nodemailer là 1 dự án bắt đầu từ năm 2010 khi mà chưa có sự phát triển của các dịch vụ gửi mail và ngày nay đây là giải pháp mà hầu hết người dùng sử dụng cho ứng dụng Nodejs để  gửi mail. 
# 2. Sử dụng
Các tính năng của Nodemailer:
* Module độc lập vì không có bất kỳ sự phụ thuộc nào 
* Tập trung nhiều vào security 
* Hỗ trợ Unicode, để sử dụng bất kỳ ký tự nào, bao gồm cả emoji
* Hỗ trợ windows - bạn có thể cài đặt với npm trên windows giống như bất kỳ module khác
* Sử dụng HTML content, plain text 
* Thêm file attachments vào tin nhắn
* Nhúng file ảnh attachments cho HTML content 
* Gửi email an toàn sử dụng TLS/STARTTLS 
* Hỗ trợ phương thức gửi SMTP 
* Hỗ trợ chữ ký tin gửi vs DKIM 
* Hỗ trợ custom Plugin 
* Sử dụng OAuth2 authentication 
* Sử dụng Proxies cho kết nối SMTP 
* Sử dụng code ES6 - không gây rò rỉ bộ nhớ 
* Tự động generate email test từ Ethereal.email 

**Yêu cầu:**

Nodejs v6.0.0 hoặc phiên bản mới hơn 

Các phương thức Nodemailer hỗ trợ cả callbacks và Promises. Bạn sẽ cần Nodejs v8.0.0 nếu muốn sử dụng async...await với Nodemailer 

Cài đặt Nodemailer:
```js
npm install nodemailer

```


Các bước để gửi mail:
1. Tạo 1 Nodemail transporter sử dụng SMTP hoặc 1 cơ chế gửi nào đó
```js
let transporter = nodemailer.createTransport(transport[, defaults])
```
Trong đó:

* transporter: là đối tượng để gửi mail
* transport: là đối tượng cấu hình chuyển thư
* defaults: là đối tượng định nghĩa giá trị mặc định cho lựa chọn gửi thư

2. Cài đặt thư
* from: người gửi 
* to: người nhận (có thể là 1 hoặc nhiều mail với dấu phẩy ngăn cách nếu có nhiều mail)
* cc: tính năng tương tự trên gmail
* bcc: tính năng tương tự trên gmail
* subject: chủ đề thư
* text: nội dung thư
* html: 
* attachments: file đính kèm

Ví dụ
```js
var message = {
  from: "sender@server.com",
  to: "receiver@sender.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>"
};
```

Ngoài ra còn rất nhiều lựa chọn khác nữa,[tham khảo](https://nodemailer.com/message/)

3. Chuyển đối tượng tin nhắn sử dụng method sendMail() 
```js
transporter.sendMail(data[, callback])
```
* data: định nghĩa nội dung thư ở bước 2 
* callback: là function callback gửi thư chạy khi mà gửi thư thành công hoặc thất bại:

Ok, let's go

```js
"use strict";
const nodemailer = require("nodemailer");

async function main() {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sender@gmail.com",
      pass: "passwordSender"
    }
  });

  let info = await transporter.sendMail({
    from: '"KhanhPT👻" <sender@gmail.com>', // sender address
    to: "receiver1@gmail.com, receiver2@gmail.com", // list of receivers
    subject: "Test send email ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Test chức năng gửi mail ứng dụng Nodejs với Nodemailer</b>" // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
```

Trước khi gửi thư, nếu sử dụng gmail thì bạn phải cài đặt cho phép ứng dụng truy cập gmail bằng cách click [link](https://myaccount.google.com/lesssecureapps)  và bật tính năng bên dưới 
![](https://images.viblo.asia/78854ba1-0f12-403b-805b-2daf361eef95.png)

Và đây là kết quả:
![](https://images.viblo.asia/48921bd7-b223-4640-95fb-9c669bfcbe73.png)


# 3. Tham khảo
https://nodemailer.com/about/