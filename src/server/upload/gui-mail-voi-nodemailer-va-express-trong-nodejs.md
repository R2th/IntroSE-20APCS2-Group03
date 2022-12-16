Chào mọi người, hôm nay mình sẽ chia sẻ về cách gửi mail với nodemailer và express trong node.js, 
Có rất nhiều bài viết đã viết về cái này, tuy nhiên, khi mình làm theo thì mắc một số lỗi, nên hôm nay mình sẽ nói về 2 vấn đề, thứ nhất là cách sử dụng nodemailer và thứ 2 là nói về lỗi và cách khắc phục.
Ok, bắt đầu nào!
# Nodemailer là cái quần què gì? :)
Theo cách mình hiểu đơn giản là cái module người ta viết ra để hỗ trợ việc gửi mail !
# Sử dụng nó như thế nào, có phức tạp hông?
Ở bài viết này, mình sẽ hướng dẫn các bạn gửi gmail thông qua nodemailer và express..
Còn về cách tạo một chương trình nodejs express như thế nào thì để bửa sau(hôm sau) mình sẽ nói nha!
Đầu tiên, bạn cần cài nó về dự án của mình
## Cài đặt nodemailer
```
npm install nodemailer --save
```
## Sử dụng
### Tạo tài khoản gmail
Để sử dụng, chắc chắn rồi, đó là phải tạo một tài khoản gmail (mình khuyên là nên tạo một tài khoản mới thay vì sử dụng tài khoản gốc bởi vì mail này mình chỉ sử dụng để gửi thôi, và nếu sau này có vấn đề gì thì cũng không ảnh hưởng nhiều đến tài khoản của mình :)
### Thiết lập bảo mật
Đối với gmail bạn cần cài đặt 2 vấn đề chính để có thể gửi mail, vì nếu không làm thì sau này sẽ gặp lỗi :))
1. Cho phép các ứng dụng bảo mật thấp truy cập: Vì bảo mật nên gmail sẽ mặc định cái này bị tắt!
  https://myaccount.google.com/?utm_source=OGB&tab=rk&utm_medium=act
  ![](https://images.viblo.asia/0d3cfbe7-210e-470d-9d1a-57ffbe00f57f.jpg)
  Chọn mục **security**: 
  Tìm đến mục Less secure app access
  ![](https://images.viblo.asia/40d534fb-baf7-4488-8ec3-013134f88abd.jpg)
  Bật Cho phép truy cập...
2. Đặt quyền truy cập IMAP:
Vào gmail của bạn, chọn nút setting trên góc phải màn hình
![](https://images.viblo.asia/25befe0d-63e4-4388-abed-3967a2036ee7.jpg)
Trong thanh chọn **Forwarding and POP/IMAP**, tìm đến mục **IMAP access**
Enable IMAP
![](https://images.viblo.asia/778775fc-91e8-4bd1-841d-5388f6a72221.jpg)
### Bắt đầu code nào!

Mình có sơ đồ file như sau, tên file có thể khác nhưng chức năng tương tự nha
```
--router: Xử lý hướng backend, router, render view,....
--app
---views: Chứa các file người dùng sẽ nhìn thấy,...
---publics: Thường thì mình sẽ để file css, js, bs trong này
--...
```
**Trong file router:**
Gọi nodemailer vào ứng dụng
```
const nodemailer =  require('nodemailer');
```
Tạo thêm 2 router: thứ nhất là lấy dữ liệu và thứ 2 là xử lý dữ liệu
```
app.get('/', function(req, res) {
    res.render('index.ejs', {
        mess: req.flash('mess')
    });
});
app.post('/send-mail', function(req, res) {
    //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'example@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'example' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                <span style="color: black">Đây là mail test</span>
            </div>
        </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'NQH-Test nodemailer',
        to: req.body.mail,
        subject: 'Test Nodemailer',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            res.redirect('/');
        }
    });
});
```
Phía trên mình có sử dụng flash để truyền thông tin từ server ra người dùng, bạn có thể sử dụng nhưng cần phải cài đặt trước nha!
**Trong file views:**
Mình tạo 1 file index.ejs như sau:
```
<!DOCTYPE html>
<html>
<head>
//...Ở đây bạn tự edit nha
</head>
<body>
    <%
        if(typeof(mess) != 'undefined' && mess != '') {
    %>
    <div style="padding: 10px; width: 100%; border-radius: 4px; background-color: #98c4ff; color: #006eff">
    <%- mess %>
    </div>
    <%
        }
    %>
    <form action="/send-mail" method="POST">
        <input name="mail" placeholder="Mail của bạn..." required>
        <button type="submit">Gửi</button>
    </form>
</body>
</html>
```
### Rồi xong! Bạn test xem có được hông nha!
##  Nhắn nhủ!
Thông thường mình thường sử dụng chức năng này cho việc bảo mật hoặc thông báo các thông tin cần thiết cho người dùng, cái gì nhiều quá cũng hông tốt, mình nghĩ vậy.
Cũng là một người dùng, mình không muốn có quá nhiều thư không quan trọng trong hòm thư của mình.
Bạn có thể test chức năng này trên web heroku của mình bằng chức năng quên mật khẩu, về việc tạo chức năng đó như thế nào, mình sẽ nói sau nha! Bài này cũng hơi dài rồi :))
web mình là: https://nqh.herokuapp.com/