# 1. Mở đầu
Lần đầu tìm hiểu về Nodejs, tôi có thử tạo một project với mục đích gửi form và có đoạn code như sau:
```
app.get("/", function(req, res) {
  res.json(posts)
});
```
```
app.post("/", function(req, res) {
  Post.create(req.body)
});
```
Nhưng lỗi trả về là không tìm thấy req.body. Tôi đã thử kiểm tra req nhưng rất khó để có thể lấy được dữ liệu tôi đã gửi lên. Sau khi tìm hiểu, tôi đã biết tới [ body-parser](https://github.com/expressjs/body-parser)

# 2. Cài đặt
**Những library liên quan**
* [Express](https://expressjs.com/): Một trong những framework được ưa chuộng nhất của Nodejs
* [ body-parser](https://github.com/expressjs/body-parser): Lấy được dữ liệu nhập vào (như trong req.body)
* [EJS](https://ejs.co/): Template engine hỗ trợ sinh html động
* [Moment.js](https://momentjs.com/): Để thiết đặt hiển thị thời gian một cách đơn giản
# 3. Demo
Chúng ta hãy cùng xem ví dụ sau: Cho nhập vào một message, hiển thị message và thời điểm ghi ra message đó.
Mặc dù là demo nhỏ nhưng tôi muốn hướng dẫn cụ thể hơn một chút cho những bạn mới tìm hiểu Nodejs như tôi 
> 1. Tạo folder project
> 2. cd vào folder đó
> 3. Trên terminal gõ: npm init
> 4. Điền các thông tin cần thiết


**Cài đặt module** 
```
npm i --save express body-parser ejs moment
```

File package.json sau khi được tạo theo cách trên có thể có nội dung khác như bên dưới nhưng đừng bận tâm.
```
{
    "name": "body-parser-post-html",
    "private": true,
    "scripts": {
        "start": "node app"
    },
    "dependencies": {
        "body-parser": "^1.19.0",
        "ejs": "^2.7.1",
        "express": "^4.17.1",
        "moment": "^2.24.0"
    }
}
```

Trong cùng thư mục với **package.json** tạo một file **app.js** với nội dung:
```
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var routes = require("./routes")

app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000);
```

Hãy để ý câu lệnh sau ***app.use(bodyParser.urlencoded({ extended: false }))*** . Nó mang ý nghĩa là một đối tượng body chứa dữ liệu mà đã được parsed sẽ được đưa vào request (có thể hiểu là req.body). Dữ liệu đó là một cặp key-value, trong đó value có thể là array hoặc string nếu extended: false và các loại còn lại nếu extended: true.

Ngoài ra, module body-parser cung cấp những parsers nổi bật như sau:
* [ JSON body parser](https://github.com/expressjs/body-parser#bodyparserjsonoptions)
* [Raw body parser](https://github.com/expressjs/body-parser#bodyparserrawoptions)
* [Text body parser](https://github.com/expressjs/body-parser#bodyparsertextoptions)
* [URL-encoded form body parser](https://github.com/expressjs/body-parser#bodyparserurlencodedoptions)

Tiếp tục trong cùng thư mục với **package.json** tạo một file **router.js** với nội dung:
```
var express = require("express");
var moment = require("moment");
var router = express.Router();

router
    .get("/", (req, res) => {
        res.render("index", {
            message: "Please enter a message",
            date: "Time will be show"
        });
    })
    .post("/", (req, res) => {
        res.render("index", {
            message: req.body.message,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        });
    });

module.exports = router;
```
Trong cùng thư mục với **package.json** tạo một folder **views**, trong folder views đó tạo một file **index.ejs** với nội dung:
```
<h1><%= message %></h1>
<h1><%= date %></h1>
<form action="/" method="POST">
  <input type="text" name="message"/>
  <button type="submit">Send</button>
</form>
```

Chạy câu lệnh 
```
npm start
```
và truy cập http://localhost:3000/ sẽ hiển thị như sau:

![](https://images.viblo.asia/0403c51a-63d4-4211-ac77-65583e3c974e.png)

Khi nhập message và nhấn send, ta có kết quả:

![](https://images.viblo.asia/01ef5f39-696c-4382-b3f2-ed1c6ed193c4.png)


Qua bài viết này, tôi muốn giới thiệu cho các bạn một trong những cách sử dụng module Body-Parser để xử lý form nhập vào.

Tôi mới tìm hiểu về Nodejs và các module hay sử dụng, vì vậy nội dung bài viết có thể còn chưa rõ ràng và nhầm lẫn, mong nhận được sự góp ý của các bạn. Xin cảm ơn.

-----
[https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)
[https://qiita.com/atlansien/items/2dad964467874b846f04](https://qiita.com/atlansien/items/2dad964467874b846f04)
[https://noumenon-th.net/programming/2018/12/17/bodyparser01/](https://noumenon-th.net/programming/2018/12/17/bodyparser01/)