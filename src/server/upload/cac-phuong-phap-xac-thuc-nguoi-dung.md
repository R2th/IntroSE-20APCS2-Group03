Ở bài viết này chúng ta sẽ tìm hiểu về một trong những vấn đề quan trọng nhất trong việc xây dựng các ứng dụng web, đấy chính là phương pháp xác nhận danh tính người dùng. Trước tiên ta cần phải hiểu về hai khái niệm xác thực người dùng và uỷ quyền người dùng.

## Authentication vs Authorization
- **Authentication** hay quyền xác thực người dùng, là quá trình xác minh thông tin đăng nhập của một người dùng hoặc thiết bị cố gắng truy cập vào một hệ thống

- **Authorization** hay uỷ quyền, là quá trình xác minh xem người dùng hoặc thiết bị có được phép thực hiện các tác vụ nhất định trên hệ thống nhất định hay không.

![auth](https://ren0503.github.io/assets/img/auth/authen_author.png)

Hiểu đơn giản

- Authentication là câu hỏi *Bạn Là Ai ?*

- Authorization là câu hỏi *Bạn có thể làm gì ?*

Dễ dàng thấy rằng **authentication** sẽ luôn diễn ra trước **authorization**. Tức là phải xác định được danh tính của bạn trước khi thực hiện uỷ quyền. Vậy với các ứng dụng web, ta có những phương thức xác nhận danh tính hay uỷ quyền nào.

# HTTP/HTTPS

Để hiểu về cách xác định danh tính với web thì trước tiên phải hiểu giao thức mà các trang web đang dùng. Ở đây chúng là HTTP hay HTTPS, sự khác biệt của hai giao thức này nằm ở việc dữ liệu của HTTPS được bảo mật, tuy nhiên cả hai đều thực hiện request/response giữa client và server một cách độc lập. Tức là khi client thực hiện một request đến server (ở đây có thể là một **HTTP POST** để đăng ký hay đăng nhập). Server thực hiện tạo tài khoản ở cơ sở dữ liệu sau đấy gửi về response là `HTTP Status 200 OK`. Tuy nhiên khi đến câu lệnh request tiếp theo thì server không thể nhận biết được, client gửi request này có phải là client trước đó hay không. 

Ví dụ ở một trang blog mà người dùng tạo tài khoản sau đấy tiến hành đăng bài, thì server sẽ không xác định được request tạo tài khoản trước đó, và request tạo bài viết hiện tại có phải cùng một người không.

Để giải quyết vấn đề này, HTTP tích hợp xác thực vào trong phần header của mỗi request.

```
"Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" your-website.com
```

Các thông tin đăng nhập của người dùng sẽ được nối lại với nhau và mã hoá (ở đây chính là đoạn `dXNlcm5hbWU6cGFzc3dvcmQ`), phương pháp mã hoá được dùng ở đây là **base64**.

```javascript
let auth = 'username:password';
let encode = btoa(auth);
let decode = atob(encode);
```

Ví dụ trong Chrome ta sẽ có phần header của request như sau

![authHttp](https://ren0503.github.io/assets/img/auth/authHttp.png)

## Hoạt động

1. Phía client thực hiện yêu cầu truy cập một tài nguyên bị hạn chế.
2. Server gửi về **HTTP 401 Unauthorized** với tiêu đề `WWW-Authenticate` có giá trị là `Basic`.
3. Sau đấy client sẽ mã hoá **username** và **password** rồi request về server.
4. Khi server xác nhận được danh tính người dùng, thì với mỗi request chúng sẽ được thêm phần `Authorization: Basic dcdvcmQ=` vào.

![authHttp](https://ren0503.github.io/assets/img/auth/authHttpflow.png)

## Ưu điểm

- Không mất nhiều thời gian, hoạt động nhanh.
- Dễ triển khai.
- Có thể thực hiện trên mọi trình duyệt.

## Khuyết điểm
- Phương pháp mã hoá base64 có thể bị giải mã dễ dàng. Vì phần username và password là thông tin cần cho đăng nhập, nếu nó bị tấn công và giải mã thì người dùng sẽ mất hoàn toàn tài khoản của mình.
- Phải xác thực danh tính với mỗi request.
- Người dùng chỉ có thể đăng xuất bằng cách đăng nhập thông tin không hợp lệ.

## Ví dụ

```javascript
import basicAuth from 'basic-auth';

function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
};

export default function auth(req, res, next) {
    const {name, pass} = basicAuth(req) || {};

    if (!name || !pass) {
        return unauthorized(res);
    };

    if (name === 'john' && pass === 'secret') {
        return next();
    }

    return unauthorized(res);
};
```

*Notes*: Trong vài trường hợp người ta có thể dùng **md5** để mã hoá thay cho **base64**, điều này giúp thông tin được bảo mật hơn nhưng hiệu quả vấn chưa cao. 

# Session-Cookies

Với xác thực dựa trên session-cookies, trạng thái của người dùng sẽ được lưu trên máy chủ. Tức là nó không yêu cầu **username** hay **password** sau mỗi lần request mà thay vào đó, sau lần đăng nhập hợp lệ đầu tiên, nó sẽ tạo **sessionId** cho người dùng. Và gửi nó cho client, phía client cụ thể là browser sẽ lưu **sessionId** vào trong cookies. Như vậy mỗi là cần có yêu cầu đến server nó chỉ cần gửi theo **sessionId**.

Thông tin về session được lưu trong cookies:

![cookie](https://ren0503.github.io/assets/img/auth/cookie.png)

## Hoạt động

1. Client gửi một thông tin xác nhận hợp lệ về phía server.
2. Sau khi server xác định danh tính nó tạo ra một **sessionId** và lưu nó. Và rồi phản hồi client bằng cách thêm nó vào HTTP với `Set-Cookie` ở header.
3. Client nhận được **sessionId** sẽ lưu ở cookie của browser. Sau đó với mỗi lần request tiếp theo sẽ gửi về server.

![session](https://ren0503.github.io/assets/img/auth/session_auth.png)

## Ưu điểm

- Vì thông tin nằm trong các request của HTTP lúc này chỉ còn là **sessionId**, nên sẽ bảo mật tốt hơn so với phương thức HTTP ở trên.
- Các lần đăng nhập tiếp theo nhanh hơn, vì thông tin đăng nhập không bắt buộc.
- Khá dễ thực hiện.

## Khuyết điểm

- Phía server sẽ phải lưu trữ session cho tất cả client, tức là nó sẽ phải lưu trữ một số lượng lớn các **sessionId**, điều này sẽ gây ra áp lực server quá mức. Nếu server mà chúng ta đang triển khai dạng cluster (cụm), để đồng bộ hóa trạng thái đăng nhập, **sessionId** cần phải được đồng bộ hóa cho từng máy, điều này vô hình trung làm tăng chi phí bảo trì server. 
- Sẽ gặp khó khi triển khai sang các nền tảng khác (như ứng dụng di động vì nó không cookie để lưu).
- Dễ bị tấn công CSRF.

## Ví dụ

```javascript
const express = require('express');
const sessions = require('express-session');
const app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
```

# Token

Phương pháp này thay vì sử dụng cookie thì ở đây ta sẽ dùng token. Người dùng sẽ gửi thông tin đăng nhập hợp lệ và server sẽ trả về một **token**. **Token** này sẽ được dùng cho các yêu cầu xác thực tiếp theo. Phần lớn token được sử dụng hiện tại đều là **Jsonwebtoken(JWT)**.

> JSON Web Mã (JWT) là một chuẩn mở (RFC 7519) định nghĩa một cách nhỏ gọn và khép kín để truyền một cách an toàn thông tin giữa các bên dưới dạng đối tượng JSON. Thông tin này có thể được xác minh và đáng tin cậy vì nó có chứa chữ ký số. JWTs có thể được ký bằng một thuật toán bí mật (với thuật toán HMAC) hoặc một public/private key sử dụng mã hoá RSA.

![jwt](https://ren0503.github.io/assets/img/auth/jwt.jpeg)

Một chuỗi JWT bao gồm 3 phần là:

- **header**: chứa kiểu dữ liệu , và thuật toán sử dụng để mã hóa ra chuỗi JWT.
- **payload**: chứa các thông tin mình muốn đặt trong chuỗi token như `username` , `userId`, `author`,...
- **signature**: được tạo ra bằng cách mã hóa phần **header**, **payload** kèm theo một chuỗi **secret** (khóa bí mật)

```javascript
data = base64urlEncode( header ) + "." + base64urlEncode( payload )
signature = Hash( data, secret_key );
```

## Hoạt động

1. Client sẽ gửi thông tin đăng nhập hợp lệ cho phía server.
2. Server sau khi xác thực được người dùng sẽ gửi về cho client một token.
3. Client sẽ lưu token này ở phía mình, với từng yêu cầu xác thực tiếp theo client sẽ cần gửi token về server.
4. Tại đây server sẽ decode token, và lấy thông tin người dùng ở phần payload. Sao khi xác thực xong nó thực hiện yêu cầu và gửi phản hồi về cho client.

![token](https://ren0503.github.io/assets/img/auth/token_auth.png)

## Ưu điểm

- Vì token được lưu ở client nên nó sẽ giảm chi phí cho server. Đồng thời cũng thuận lợi cho phát triển ứng dụng di động vì nó có thể lưu token ở `AsyncStorage`.
- Phù hợp với kiến trúc RESTful API và Single-Page-Application.

## Khuyết điểm

- Vẫn có thể bị tấn công XSS(vào localStorage) hay CSRF(vào cookie).
- Các token không thể xoá mà chỉ có thể hết hạn, nên cần thiết lập thời hạn token ở mức ngắn (để tránh tình trạng kẻ xấu lấy được token và làm bậy)

## Ví dụ

```javascript
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = generateToken;
```

# One Time Password

OTP (One Time Password) nghĩa là mật khẩu sử dụng một lần. Đây là một dãy các ký tự hoặc chữ số ngẫu nhiên được gửi đến điện thoại của bạn để xác nhận bổ sung khi thực hiện giao dịch, thanh toán qua Internet. Mỗi mã OTP chỉ có thể sử dụng một lần và sẽ mất hiệu lực trong vài phút.

One Time Password (OTP) còn gọi là mật khẩu sử dụng một lần thường được dùng để xác nhận cho việc xác thực danh tính người dùng. OTP là những mã được tạo ngẫu nhiên có thể được sử dụng để xác thực người dùng dựa trên một hệ thống đáng tin cậy. Hệ thống đó có thể là email hoặc số điện thoại đã xác minh.

Mỗi mã OTP chỉ có thể sử dụng một lần, và chúng hết hạn sau một khoảng thời gian ngắn. Vì có lớp bảo mật bổ sung nên OTP thường được dùng cho các dữ liệu nhạy cảm như các giao dịch online.

## Hoạt động

1. Client gửi thông tin xác thực hợp lệ.
2. Sau khi xác minh thông tin xác thực, server tạo mã ngẫu nhiên, lưu trữ ở phía server và gửi mã đến hệ thống đáng tin cậy(email/điện thoại).
3. Người dùng lấy mã trên hệ thống đáng tin cậy và nhập lại vào ứng dụng web.
4. Server xác minh mã so với mã được lưu trữ, đảm bảo rằng nó chưa hết hạn và cấp quyền truy cập cho phù hợp.

## Ưu điểm

- Khó bị bẻ khoá trong các cuộc tấn công replay attack.
- Mật khẩu bị mất cắp không thể được sử dụng để đăng nhập các trang và dịch vụ khác nhau.
- Độ bảo mật cao dành cho người dùng.

## Khuyết điểm

- Cần sử dụng thêm loại hình công nghệ khác.
- Quá trình tạo OTP có thể trở nên rắc rối, phức tạp.
- Các vấn đề phát sinh khi thiết bị người dùng không khả dụng (hết pin, lỗi mạng, v.v.)

## Ví dụ

```javascript
const { Auth, LoginCredentials } = require("two-step-auth");
  
async function login(emailId) {
  try {
    const res = await Auth(emailId, "Company Name");
    console.log(res);
    console.log(res.mail);
    console.log(res.OTP);
    console.log(res.success);
  } catch (error) {
    console.log(error);
  }
}
  
// This should have less secure apps enabled
LoginCredentials.mailID = "yourmailId@anydomain.com"; 
  
// You can store them in your env variables and
// access them, it will work fine
LoginCredentials.password = "Your password"; 
LoginCredentials.use = true;
  
// Pass in the mail ID you need to verify
login("verificationEmail@anyDomain.com"); 
```

# OAuth

OAuth/OAuth2 là những phương pháp xác thực và uỷ quyền danh tính người dùng phổ biến. Chúng là hình thức đăng nhập một lần(SSO) bằng cách sử dụng thông tin hiện có từ một dịch vụ mạng xã hội như Facebook, Github hoặc Google, để đăng nhập vào trang web của bên thứ ba thay vì tạo tài khoản đăng nhập mới dành riêng cho trang web đó. OAuth2 sử dụng SSL/TLS thay vì yêu cầu chứng chỉ xác thực như OAuth.

## Hoạt động

1. Ứng dụng (website hoặc mobile app) yêu cầu ủy quyền để truy cập vào **Resource Server** (Gmail,Facebook, Twitter hay Github…) thông qua người dùng.
2. Nếu người dùng ủy quyền cho yêu cầu trên, Ứng dụng sẽ nhận được ủy quyền từ phía người dùng (dưới dạng một token string).
3. Ứng dụng gửi thông tin định danh (ID) của mình kèm theo ủy quyền của người dùng tới **Authorization Server**.
4. Nếu thông tin định danh được xác thực và ủy quyền hợp lệ, Authorization Server sẽ trả về cho Ứng dụng **access_token**. Đến đây quá trình ủy quyền hoàn tất.
5. Để truy cập vào tài nguyên (resource) từ **Resource Server** và lấy thông tin, Ứng dụng sẽ phải đưa ra **access_token** để xác thực.
6. Nếu **access_token** hợp lệ, **Resource Server** sẽ trả về dữ liệu của tài nguyên đã được yêu cầu cho Ứng dụng.

![OAuth2](https://ren0503.github.io/assets/img/auth/OAuth2.png)

## Ưu điểm

- OAuth 2.0 là một giao thức rất linh hoạt dựa trên SSL (Secure Sockets Layer đảm bảo dữ liệu giữa máy chủ web và trình duyệt vẫn giữ được tính riêng tư) để lưu token truy cập của người dùng.
- Cho phép truy cập hạn chế vào dữ liệu của người dùng và cho phép truy cập khi authorization token hết hạn.
- Có khả năng chia sẻ dữ liệu cho người dùng mà không phải tiết lộ thông tin cá nhân.
- Dễ dàng hơn để thực hiện và cung cấp xác thực mạnh mẽ hơn.

## Nhược điểm

- Nếu bạn thêm nhiều phần mở rộng ở các đầu cuối trong đặc tả hệ thống, nó sẽ tạo ra một loạt các triển khai không thể tương tác, có nghĩa là bạn phải viết các đoạn mã riêng cho Facebook, Google, v.v.
- Nếu các tài khoản Google, Facebook bị hack, thì nó sẽ dẫn đến các ảnh hưởng nghiêm trọng trên nhiều trang web thay vì chỉ một.

## Ví dụ

```javascript
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });
```

# Tổng kết

Bài viết xác thực người dùng đến đây là hết. Hy vọng các đoạn demo code và hoạt động sẽ giúp mọi người hiểu hơn về các phương pháp trên. Mong bài viết sẽ có ích với những ai đang cần nó.

# Tham khảo

[**testdriven**](https://testdriven.io/blog/web-authentication-methods/#one-time-passwords)

[**anonystick**](https://anonystick.com/blog-developer/4-co-che-dang-nhap-bai-viet-nay-la-du-cho-dan-lap-trinh-phan-1-2020091071827696)

[**loginradius**](https://www.loginradius.com/blog/async/google-authentication-with-nodejs-and-passportjs/)

[**topdev**](https://topdev.vn/blog/oauth2-la-gi/)