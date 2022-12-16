Line Works là 1 ứng dụng chat dành riêng cho các doanh nghiệp nên sử dụng bot để thông báo 1 cách tự động là rất hữu ích. Nếu bạn chưa biết tới Line Works thì có thể tìm hiểu ở [đây](https://line.worksmobile.com/jp/en/).
Bài viết này mình sẽ hướng dẫn tạo 1 Bot Chat đơn giản để mọi người có thể hiểu được quy trình tạo và cách hoạt động của Bot Chat Line Works.
# Đăng ký Bot
Bạn truy cập vào trang [Developer Console](https://developers.worksmobile.com/jp/console/openapi/main) của Line Works để cài đặt các thông số cơ bản.
Khi truy cập thành công thì bạn sẽ có giao diện như sau:

![](https://images.viblo.asia/be252920-eb9d-40fd-8cb1-18769f446340.png)

*Sau đó, các bạn cần lấy thông tin cần thiết để chuẩn bị cài đặt Bot:*

### 1. API ID
Sau vào được màn hình Console, bạn tìm đến mục **API ID** và nhấn nút Get để lấy được API ID

![](https://images.viblo.asia/333c501b-d429-4629-a19b-d631e133b525.png)

### 2. CONSUMER KEY

Ở mục **Server API Consumer Key**, bạn có thể lấy được CONSUMER KEY

![](https://images.viblo.asia/7cf99255-479f-430c-b2f3-aa57724cfec8.png)

### 3. SERVER ID

Tại mục **Server List(ID Registration Style)**, bạn sẽ lấy được SERVER ID

![](https://images.viblo.asia/6e8a26c0-5813-4ca5-bafd-e129c7a0c6a4.png)

### 4. PRIVATE KEY

Vẫn tại mục **Server List(ID Registration Style)**, bạn tải PRIVATE KEY về. File được lưu với đuôi .key

![](https://images.viblo.asia/88b1cae4-b2d1-4c0e-ae30-588e62e8a22d.png)

### 5. BOT NO

Vẫn nằm trong màn hình Console, bạn tìm tới chỉ mục **Bot** nằm phía bên trái màn hình để lấy được BOT NO sau khi đăng ký Bot 

![](https://images.viblo.asia/41bd1f61-33aa-4b39-a3f0-c45a1a61428a.png)

# Chuẩn bị Server
### 1. Tạo tài khoản Heroku
Bạn có thể tạo tài khảon Heroku tại [đây](https://signup.heroku.com/dc).

### 2. Cài đặt môi trường ở Local
Bạn cần cài đặt những thứ sau:

- [Node.js, npm](https://nodejs.org/en/download/)
- [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
- [Git](https://git-scm.com/downloads)

### 3. Tạo Bot
Đầu tiên bạn cần tạo 1 thư mục để chứa Project, và cài đặt các thư viện cần thiết:

```
$ mkdir suntest
$ cd suntest
$ npm init
$ npm install express --save
$ npm install body-parser --save
$ npm install jsonwebtoken --save
$ npm install https --save
$ npm install request --save
$ npm install querystring --save
```

Sau đó bạn tạo 2 file:

**.gitignore** với nội dung:
```
.DS_Store
.gitignore
npm-debug.log
node_modules
```
**Procfile** với nội dung:
```
web: node index.js
```

Sau khi đã dựng hết môi trường cần thiết. Chúng ta bắt đầu vào phần chính là code nội dung xử lý cho Bot nhé. Toàn bộ phần xử lý mình sẽ đặt trong file **index.js**:

![](https://images.viblo.asia/debdb7df-2b77-4e27-b009-ac000293e2d8.jpeg)

> Note: Trong code mình đã chú thích thêm để bạn hiểu về nội dung xử lý.
```js
"use strict";

// Các module sẽ sử dụng
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const https = require("https");
const request = require("request");
const qs = require("querystring");
const fs = require("fs");

//Các thông tin cơ bản mà mình đã nói ở phần ĐĂNG KÝ BOT
const APIID = APIID;
const SERVERID = SERVERID;
const CONSUMERKEY = CONSUMERKEY;
const PRIVATEKEY = fs.readFileSync(File Private Key);;
const BOTNO = BOTNO;

server.use(bodyParser.json());

server.listen(process.env.PORT || 3000);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/callback', (req, res) => {
    res.sendStatus(200);

    const message = req.body.content.text;
    const roomId = req.body.source.roomId;
    const accountId = req.body.source.accountId;

    getJWT((jwttoken) => {
        getServerToken(jwttoken, (newtoken) => {
            sendMessage(newtoken, accountId, message);
        });
    });
});

//Tạo JWT Token cho máy chủ LineWorks 
function getJWT(callback){
    const iss = SERVERID;
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + (60 * 60);　//set thời gian JWT Token sử dụng(trong code hiện là 1 giờ)
    const cert = PRIVATEKEY;
    const token = [];
    const jwttoken = jwt.sign({"iss":iss, "iat":iat, "exp":exp}, cert, {algorithm:"RS256"}, (err, jwttoken) => {
        if (!err) {
            callback(jwttoken);
        } else {
            console.log(err);
        }
    });
}

//Sử dụng JWT Token để lấy Access Token thông qua API do LineWorks cung cấp
function getServerToken(jwttoken, callback) {
    const postdata = {
        url: 'https://authapi.worksmobile.com/b/' + APIID + '/server/token',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        form: {
            "grant_type" : encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer"),
            "assertion" : jwttoken
        }
    };
    request.post(postdata, (error, response, body) => {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            const jsonobj = JSON.parse(body);
            const AccessToken = jsonobj.access_token;
            callback(AccessToken);
        }
    });
}

//Gửi tin nhắn tới 1 user nhờ vào API do LineWorks cung cấp
function sendMessage(token, accountId, message) {
    const postdata = {
        url: 'https://apis.worksmobile.com/' + APIID + '/message/sendMessage/v2',
        headers : {
          'Content-Type' : 'application/json;charset=UTF-8',
          'consumerKey' : CONSUMERKEY,
          'Authorization' : "Bearer " + token
        },
        json: {
            "botNo" : Number(BOTNO),
            "accountId" : accountId,
            "content" : {
                "type" : "text",
                "text" : message
            }
        }
    };
    request.post(postdata, (error, response, body) => {
        if (error) {
          console.log(error);
        }
        console.log(body);
    });
}
```

### 4. Đưa Bot lên Heroku
Để đưa lên Heroku bạn chạy các lệnh terminal.

Đầu tiên bạn init Git ở local vào commint source lại: 
```
$ git init
$ git add .
$ git commit -m 'commit message'
```

Tiếp đó, đăng nhập vào tài khoản Heroku đã tạo và tạo project và đẩy source lên:
```
$ heroku login
$ heroku apps:create <tên project của bạn＞
$ git remote add heroku https://git.heroku.com/<tên project của bạn＞
$ git push heroku master
```

Như vậy là xong rồi đó, các bạn có thể nhìn vào ảnh sau để hiểu hơn về cách hoạt động của Bot.

![](https://images.viblo.asia/afa01091-367b-487d-8023-a88f382a14dc.png)

### 5. Kết quả

![](https://images.viblo.asia/8b47db2f-7c56-4c06-b0be-51144c49a82e.png)

# PHẦN KẾT
Mình xin kết thúc tại đây. Cảm ơn các bạn đã đọc bài viết. Chúc các bạn thực hiện thành công.

Nguồn tham khảo:
- https://qiita.com/tokotan/items/f615f4a62219d655436f
- https://developers.worksmobile.com/jp/document/1002002?lang=en
- https://developers.worksmobile.com/jp/document/100500801?lang=en