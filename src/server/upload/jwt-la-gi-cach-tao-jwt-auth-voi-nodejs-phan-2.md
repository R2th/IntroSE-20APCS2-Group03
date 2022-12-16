# Mở Đầu
Xin chào các bạn tiếp tục với phần một [JWT là gì? cách tạo JWT Auth với Nodejs](https://viblo.asia/p/jwt-la-gi-cach-tao-jwt-auth-voi-nodejs-Az45b0ooZxY) thì hôm nay mình tiếp tục tìm hiểu về   Refresh Token là gì? Tại sao lại sử dụng Refresh Token. Refresh token thực chất nó cũng chính là một token. Nhưng nó khác với Token Auth của JWT, chức năng của nó đó là để lấy một token mới, khi token được cấp  cho user hết hạn. Nó được cấp cho User cùng với token khi user xác thực đầu tiên nhưng thời gian hết hạn của nó lâu hơn thời gian hết hạn của token. Khi nói đến chức năng của ` Refresh Token` thì các bạn cũng đã hiểu vì sao cần dùng đến nó rồi đúng không, thời gian hết hạn của một token rất ngắn giả sử ta đặt thời gian hết hạn của một token là 1phút thì chả nhẽ cứ sau một phút token hết hạn là chúng ta lại phải đăng nhập lại, như vậy thì quá là bất tiện đúng không nào và sẽ chẳng có ai thèm vào trang web của chúng ta lần thứ 2 nữa :D. Vì thế chúng ta cần `Refresh Token` để có thể lấy một token mới. Lý thuyết là như thế rồi, bây giờ chúng ta chuyển đến phần thực hành luôn nhé :D.
# Tiến Hành
Trước khi bắt tay vào làm thì mình cần sửa lại một chút để có thể tách riêng 2 server với nhau, một server api và một server chỉ chuyên có chức năng authentication, Mình thêm một file `authServer.js` như sau:
```js
require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const port = 3300;

app.use(express.json());

app.post("/login", (req, res) => {
    const data = req.body;
    const tokens = generateTokens(data);

    res.json(tokens);
});

app.listen(port, function (error) {
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
});
```
Tiếp theo sẽ là file index.js mình sửa lại thành server.js với nội dung như sau :
```js

require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [
    {
        id: 1,
        name: 'Hoang'
    },
    {
        id: 2,
        name: 'Huy'
    }
]

app.get('/users', authenToken, function(req, res){
    res.json({data: users});
})

function authenToken(req, res, next) {
    const authorizationClient = req.headers['authorization'];
    const token = authorizationClient && authorizationClient.split(' ')[1]

    if (!token) return res.sendStatus(401)

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next();
    } catch (e) {
        return res.sendStatus(403)
    }
}

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})
```
và thử lại xem sau khi tách ra 2 server thì code chạy có lỗi gì không nhé :D. Tiếp theo sẽ  khi thực hiện login tạo một `token` thì chúng ta cũng sẽ tạo thêm một `Refresh Token`. Chúng ta cần sửa lại đoạn code  `login` như sau 
```js
app.post('/login', (req, res) => {
    const data = req.body;
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s',
    });
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    res.json({ accessToken, refreshToken });
})
```
Vì 2 phần tạo ra `accessToken` và `refreshToken` giống nhau lnên mình sẽ viết chung lại một hàm như sau: 
```js
const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    });

    return { accessToken, refreshToken };
};
```
Khi đó hàm login của chúng ta sẽ gọn hơn rất nhiều 
```js
app.post("/login", (req, res) => {
    const data = req.body;
    const tokens = generateTokens(data);

    res.json(tokens);
})
```
Chúng ta cũng cần thêm một secret key `REFRESH_TOKEN_SECRET` cho refreshToken ở file .env nữa nhé. Cùng thử test xem đã tạo được ra `accessToken` và `refreshToken` chưa nhé

![Peek 2021-09-19 16-19.gif](https://images.viblo.asia/57c44cbd-a466-424e-9e0e-cf5093ef76a0.gif)

Ok vậy là chúng ta đã có `accessToken` và `refreshToken` rồi. Tiếp theo chúng ta sẽ cần refresh lại token để lấy ra được token mới nhất. Mình sẽ tạo ra một router mới `refreshToken` để tiến hành refresh lại token, và chúng ta cũng cần phải verify `token` được gửi lên đó nếu token  bằng null  thì cũng trả về lỗi. Trên thực tế chúng ta sẽ lưu `refreshToken` vào databases để khi `refreshToken` được gửi lên từ client sẽ được so sánh với `refreshToken` được lưu trong database. Nhưng ở bài viết này mình không có Db nên sẽ tạo tạm một mảng để lưu trữ `refreshToken`, và cũng tiến hành kiểm tra xem `refreshToken` có nằm trong mảng `refreshTokens` hay không, nếu không thì sẽ thông báo lỗi, còn nếu có thì sẽ tiến hành verify và thực hiện tạo một `accessToken` và trả về cho client như sau:
```js
app.post("/refreshToken", (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403);
        const accessToken = jwt.sign(
            { username: data.username },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "30s",
            }
        );
        res.json({ accessToken });
    });
});
```
À một lưu ý nữa là khi chúng ta tạo ra một  `accessToken` và `refreshToken` ở router `login` thì chúng ta cũng cần lưu `refreshToken` vào mảng `refreshTokens`.
```js
const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    refreshTokens.push(refreshToken);

    return { accessToken, refreshToken };
};
```
Bây giờ chúng ta sẽ thử tạo ta một `refreshToken` rồi từ `refreshToken` tạo ra một `accessToken` lấy `accessToken` đó  thực hiện gọi đến router `users` có middleware để xem có lấy được data không nhé.
![Peek 2021-09-19 16-44.gif](https://images.viblo.asia/510b796b-2d48-474e-b198-8c9449e958b3.gif)
Như vậy là chúng ta đã thực hiện thành công  `refreshToken`. Cuối cùng khi người dùng tiến hành logout thì chúng ta cần xóa đi `refreshToken` được gửi lên từ phía người dùng. MÌnh có router `logout` như sau 
```js
app.post("/logout", (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
    res.sendStatus(200);
})
```
![Peek 2021-09-19 16-50.gif](https://images.viblo.asia/9e999dbb-c882-450b-9374-7296052c20a7.gif)
Như vậy khi người dùng tiến hành logout thì chúng ta cũng xóa thành thông `refreshToken`
# Kết Luận
Như vậy mình đã giới thiệu đến các bạn về Refresh Token là gì? Tại sao lại sử dụng Refresh Token cũng như cách tạo ra một  Refresh Token từ Refresh Token đó tạo ra một token mới. Cảm ơn các bạn đã đọc nếu thấy bài viết hữu ích hãy cho mình một upvote nhé. Cảm ơn các bạn.