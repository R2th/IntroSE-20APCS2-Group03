## 1. Tìm hiểu về Nodemailer
NodeMailer là một trong những module cần thiết nhất nếu như bạn muốn xây dựng một website hoàn hảo. Chúng ta cần phải đặc biệt quan tâm tới việc bảo mật thông tin trong việc gửi và nhận mail nhưng với module Node-mailer điều này trở thành 1 việc rất đơn giản và dễ dàng như trong chính trong câu slogan của chính module này : Send e-mails from Node.js – easy as cake! 
## 2. Chọn SMTP Provider
**SMTP** là viết tắt của Simple Mail Transfer Protocol dịch ra có nghĩa là một giao thức truyền tải thư tín đơn giản hóa, là một tiêu chuẩn để truyền tải dữ liệu trên môi trường internet.

Và giao thức này thực hiện nhiệm vụ chính là gửi mail còn việc nhận mail hay truy xuất dữ liệu mail server sẽ có giao thức `IMAP` hay  `POP3`  đảm nhiệm.

Khi nói đến việc sử dụng SMTP trong ứng dụng, mục đích là sử dụng dịch vụ SMTP của bên thứ ba để xử lý các phần về kỹ thuật cho bạn để bạn có thể chỉ tập trung vào ứng dụng của mình. Có rất nhiều nhà cung cấp SMTP khác nhau, mỗi nhà cung cấp đều có những ưu điểm, nhược điểm và chi phí riêng.

Một vài STMP provider ( Gmail, Hotmail, Office365 ... )
```
// gmail
const smtp = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    ...
});

// hotmail
const smtp = nodemailer.createTransport({
    host: 'smtp.live.com',
    ...
});

// office 365
const smtp = nodemailer.createTransport({
    host: 'smtp.office365.com',
    ...
});
```
## 3. Triển khai ứng dụng
### 3.1 Tạo nhanh ứng dụng nodeJS express
Để tạo nhanh ứng dụng nodeJS express mình sử dụng thư viện[ `express-generator`](https://expressjs.com/en/starter/generator.html) . Các bạn có thể vào trang chủ để tìm hiểu chi tiết.<br>

Cmd:
```
$ npm install -g express-generator
```
```
express --no-view mailer // Option [--no-view], Directory [mailer]
```
Câu lệnh trên sẽ tạo 1 folder `mailer` chứa toàn bộ source code của ta. 

![](https://images.viblo.asia/dd80343f-2ac6-46c9-b4b0-e4a080155e70.png)

Install dependancies `npm i` 

Start `npm start`

Kết quả: ![](https://images.viblo.asia/5cb90b22-1f86-46bd-b502-b624449ad02e.png)

### 3.2 Cấu hình SMTP server với nodemailer
Đầu tiên chúng ta cài đặt thư viện `nodemailer`
```
npm install nodemailer
```
Tiếp theo ta định nghĩa biến  `const smtp` và gán nó `nodemailer.createTransport()`, chức năng của phương thức này là thiết lập kết nối máy khách với nhà cung cấp SMTP.
```
const nodemailer = require('nodemailer')

const smtp = nodemailer.createTransport({
  host: 'smtp.someprovider.com', // smtp provider
  port: 587, // 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
  secure: false,
  auth: {
    user: 'email', địa chỉ email mà ta dùng để gửi mail
    pass: 'password', password
  },
});
```

- Gửi mail
   <br>
   Gửi mail với nodemailer cực kì đơn giản, ta chỉ cần gọi phương thức `sendMail()` thông qua biến `smtp` ở trên 
 ```
 [...]

smtp.sendMail({
  to: 'somebody@gmail.com',
  from: 'support@myapp.com',
  subject: 'Testing Email Sends', // Tiêu đề email
  html: '<p>Sending some HTML to test.</p>', //  Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông 
  thường. Nếu muốn gửi văn bản ta thay html bằng text
});
 ```
-  Cấp quyền để app đăng nhập vào mail
![](https://images.viblo.asia/18c4cc2c-38e0-4659-aa91-fed56f26d78f.png)

 
### 3.3  Tạo template mail với EJS
Đầu tiên ta cần cài 1 vài thư viện :

```
npm i ejs html-to-text juice fs
```
Kết hợp lại ta được: `helpers/sendMail.js`
```
const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const { convert } = require("html-to-text");
const juice = require("juice");

const smtp = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `templates/${templateName}.html`; // đường dẫn tới template
  const options = {
    from: process.env.EMAIL,
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, "utf-8");
    const html = ejs.render(template, templateVars);
    // templateVars là các biến được truyền vào template thông qua hàm render
    // const text = convert(html);
    const htmlWithStylesInlined = juice(html);

    options.html = htmlWithStylesInlined;
    //options.text = text;
  }

  // hàm smtp.sendMail() này sẽ trả về cho chúng ta một Promise
  return smtp.sendMail(options);
};

module.exports = {
  sendMail: sendMail,
};

```
- Tạo template: `templates/template.html`
```
<html>
  <head>
    <title>Reset Password</title>
  </head>
  <style>
    body {
      color: #000;
      font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
      font-size: 16px;
      line-height: 24px;
    }
  </style>
  <body>
    <p>Hello,</p>
    <p>My name is (<%= name %>)</p>
  </body>
</html>
```
- Biến `name` sẽ đc truyền thông qua  `const html = ejs.render(template, templateVars);`
### 3.4 Tạo controller để nhận request.
`controllers/sendMail.js`
```
const { sendMail } = require("../helpers/sendMail");

module.exports.sendMail = async (req, res) => {
  const data = req.body; // data nhận từ client
  try {
    await sendMail({ template: "template", ...data });
    res.send("Send mail successfully !");
  } catch (error) {
    res.status(500).send("Send mail fail !");
  }
};
```
`router/index.js`
```
var express = require('express');
const { sendMail } = require('../controllers/sendMail');
var router = express.Router();

router.post('/', sendMail);

module.exports = router;
```
### 3.5 Kết quả.
Mình sẽ dùng [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) (1 extension của VS code) để gửi request:

![](https://images.viblo.asia/5d6c06c8-8b08-45c1-b3ff-8d57c121cab3.png)

Vào mail để kiểm tra thôi nào: 
![](https://images.viblo.asia/8e9fa693-e663-4e38-b43e-5fb7710fd236.png)
### 3.6 Một vài giải pháp để tạo HTML Email Responsive.
- `Mjml` : Mjml là 1 framework cho phép chúng ta coding email responsive 1 cách dễ dàng. (Các bạn có thể tìm hiểu chi tiết hơn qua bài viết [này](https://viblo.asia/p/giai-phap-cho-html-email-responsive-4P856a6BlY3) )<br>
- Chúng ta sẽ lượn 1 vòng qua trang chủ của nó để kiếm 1 chiếc template thật đẹp nào.
![image.png](https://images.viblo.asia/df8e1a38-afb2-4ab1-b158-124095d5e222.png)

- Chọn template nào mình cảm thấy ưng ý, nếu không thì ta hoàn toán có thể tự xây dựng riêng cho mình 1 template thông qua những cú pháp của mjml:

![image.png](https://images.viblo.asia/9cbff969-7d54-4b92-a6d6-0c4744118ea8.png)
![image.png](https://images.viblo.asia/967af5c8-2065-4f69-bfa2-909136786a93.png)

- Sau đó copy source html đã compile từ mjml bỏ vào thư mục: `tempalte/template1.html`
- Kết quả: 
![image.png](https://images.viblo.asia/ac2d6e42-9825-4eda-b089-c703ab2dd5b0.png)
- [Heml](https://heml.io/editor/#): Các bạn có thể tìm hiểu kĩ hơn thông qua trang chủ của nó, cũng tương tự như mjml =))

![image.png](https://images.viblo.asia/8cf67b0d-4bb1-4e23-99bb-6059114f2533.png)

## Kết
- Vậy là chúng ta đã cùng nhau hoàn thiện về ý tưởng về cách triển khai cho việc gửi nhận email trong nodejs và tạo 1 HTML Email Responsive ưng ý thông qua các framework hỗ trợ.<br>
Cảm ơn các bạn đã dành thời gian đọc bài viết.<br>
**Xin chào và hẹn gặp lại !**

- Source: https://github.com/dangxuanthangqt/viblo_mailer

Tài liệu tham khảo: https://jasonwatmore.com/post/2020/07/20/nodejs-send-emails-via-smtp-with-nodemailer