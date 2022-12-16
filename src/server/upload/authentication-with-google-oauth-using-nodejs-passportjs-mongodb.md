Chào mọi người,

Trong thời buổi hiện nay với việc tất cả các nền tảng, ứng dụng được kết nối với nhau thì việc đồng bộ với một số nền tảng lớn như Google, Facebook, Twitter, etc... là một điều hết sức cần thiết trong ứng dụng của chúng ta. 

Vào một số diễn đàn lớn như Stackoverflow, Medium, Hackermon, etc... chúng ta đều biết là sẽ phải tạo một tài khoản sau đó join vào đó. Nhưng sẽ tuyệt vời và thuận tiện hơn khi bạn có thể join vào mà không cần lập account. Lý do là bởi vì không phải ai cũng có thể nhớ được một đống account cho dù nó là những account do chính mình tạo ra :D :).

Hiểu được điều này, hôm nay mình xin chia sẻ với mọi người cách **xác thực** (hay còn gọi là Authentication) với Google thông qua OAuth.

Mình sẽ sử dụng **[Nodejs](https://nodejs.org/en/)**, **[MongoDB](https://www.mongodb.com/)** và một số third library hỗ trợ: **[Expressjs](https://expressjs.com/)**, **[Passportjs](http://www.passportjs.org/)**, **[Mongoose](https://mongoosejs.com/)** (các thư viện này sẽ giúp chúng ta thao tác với nodejs, mongodb và đồng bộ với Google một cách dễ dàng hơn) để xây dựng ứng dụng.

Ok, bắt đầu thôi !!

# OAuth Flow

---

Trước khi đi vào implementing thì mình sẽ giải thích OAuth để mọi người có cái nhìn khái quát nhất.

![](https://images.viblo.asia/a2e9badd-553d-4fcc-bd3a-6363fcffe4a8.png)

Ở trên mình có Diagram về OAuth Flow, miêu tả hành động, cách thức và quá trình **Client**, **Server** và **Goole** tương tác, giao tiếp với nhau. 

### Vậy thì OAuth là cái quái gì ?

Nói về OAuth thì cơ bản nó là một phương thức chứng thực, nhờ đó mà một web web servie hay một application thứ 3 (ứng dụng của chúng ta) có thể đại diện cho người dùng truy cập vào các tài nguyên của người dùng nằm trên một số dịch vụ nào đó (có thể là Facebook, Google, LinkedIn, etc... ).

Khi các công ty như Facebook cung cấp API cho bên thứ 3 để có thể truy cập vào tài nguyên của người dùng, qua đó mở nên một thị trường mới gọi là 3rd party app, ví dụ như tweetdeck hay hootsuite.

Mình sẽ đi vào giải thích chi tiết từng quá trình để mọi người có thể hiểu rõ nhất về cách chúng giao tiếp với nhau.


*Lưu ý: Đây là **Diagram** miêu tả chung về OAuth Flow nên chúng ta có thể áp dụng với tất cả các nền tảng khác nhau Facebook, LinkedIn, Spotify đều được nhé, ở đây mình sẽ làm ví dụ về Google.*

### Process


Phase 1:

- Đầu tiên khi user clicks "Login with Google" button, **Client** (user) sẽ gửi 1 request cho **Server** (vd: `localhost:5000/auth/google`). Trong request này có appId của người dùng. Sau đó **Server** nhận được appId và forward đến **Google** kèm theo appId hỏi về quyền truy cập của user đó.

- Goole tiếp nhận yêu cầu từ phía server, đồng ý cho server truy cập vào tài nguyên của user và direct ngay cho server kèm theo **code** (code này rất quan trọng vì code này sẽ được server dùng để request cho Google 1 lần nữa để lấy thông tin chi tiết của người dùng đó (user info).

- Sau khi nhận được **code** từ phía Goole gửi về thì **Server** lại tiếp tục gửi một request nữa cho **Goole** để lấy lại toàn bộ thông tin của user. 

- Dựa vào **code** của **Server** gửi, **Goole** lập tức trả về toàn bộ thông tin của user cho **Server**.

Và toàn bộ, toàn bộ bước trên sẽ do **Passportjs** thao tác và trả về thông tin của user đó.


Phase 2:

- Sau khi lấy được thông tin user từ **Google** về thì **Server** lúc này có thể làm bất cứ điều gì mà chúng ta muốn. Có thể lưu ngay user info đó vào Database sau đó trả về cho user.
Ở đây sau khi lấy được user info về mình sẽ lưu vào trong Database và set `userID` vào cookie trên browser của người dùng.

- Lúc này khi user muốn lấy dữ liệu từ Server thì từ request tiếp theo sẽ kèm theo cookie, or token, session, etc ...
- Server nhìn vào cookie có thể nhận ra user đó là ai và trả về dữ liệu của chính user đó.

Trên đây là toàn bộ quá trình khi người dùng Login thông qua Facebook, Server và Google đã tâm sự một hồi và bằng một phép màu nào đó, chúng ta đã Logged :D, fantastic :)

Hiểu được concept cũng như toàn bộ quá trình là điều rất quan trọng vì nó sẽ giúp chúng ta thao tác, implement code một cách dễ dàng.


# Implementation
---

Sau khi đã hiểu được concept và quá trình rồi thì bước này sẽ easy như ăn cơm thôi. Mình sẽ implement và sau đó sẽ show ra user info của người dùng dưới dạng json.


### 1. Setup passportjs

Mình sẽ sử dụng thư viện **Passportjs** để xử lý Goole OAuth.
Trong Passport Library, bao gồm 2 thư viện:
- Passport: hỗ trợ handle auth với Express app
- Passport Strategy: hỗ trợ kết nố với Facebook, Google, etc. Chúng ta có rất nhiều strategy (Google, Facebook, Spotify, vvv). Các bạn có thể search trên trang chủ của passport.

Nếu các bạn dùng Facebook thì có thể vào [passportjs.org](http://www.passportjs.org/), sau đó View All Strategy và tìm kiếm [passport-facebook](https://github.com/jaredhanson/passport-facebook#readme).

Ở đây mình dùng Goole Strategy: [passport-google-oauth2](https://github.com/jaredhanson/passport-google-oauth2).


Setup expressjs app, passportjs, passport-google-oauth20.

In `server.js`
```
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

Sau đó bạn cần phải lấy **Client ID**  và **Client Secret**

![](https://images.viblo.asia/49404efe-f414-4a47-8eca-6c0987d4165d.PNG)

Đối với Facebook hoặc các nên tảng khác thì cũng tương tự, **Client ID** và **Client Secret**.

Sau khi lấy được Client ID và Client Secret thì chúng ta sẽ pass vào GoogleStrategy.

In `key.js`, lưu ý là chúng ta không nên public client secret key ra ngoài. Để giải quyết vấn đề này thì các bạn có thể add `key.js` vào `.gitignore` trước khi public code lên github.
```
module.exports = {
  googleClientID: '820849889489-2l62hgnerhtneg65uuq6lbkehhfgbhg2.apps.googleusercontent.com',
  googleClientSecret: 'oiaSW7ok5pKyIGNz9_7TsLCi'
};
```

In `server.js`, thêm đoạn code này.
```
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);
```


Sau đó setup route để cho user gửi request. 

In `server.js`

```
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
```

Ở đây khi người dùng login (request: `http://localhost:5000/auth/google`) thì route này sẽ được gọi, **Passportjs** sẽ xử lý và gọi thằng `GoogleStrategy` để nó xử lý. và chúng ta muốn lấy ra `profile` và `email`.


Sau khi người dùng login thì **Google** sẽ redirect về **Server** để cho server xử lý, lúc này chúng ta cần tạo 1 route để hứng response từ thằng **Google** trả về. 

In `server.js`, thêm dòng này vào ngay dưới.
```
app.get('/auth/google/callback', passport.authenticate('google'));
```

Một lần nữa lại phải nhờ thằng **Passport** xử lý hộ :D.

OK đến đây thì các bạn có thể test bằng cách visit vào `http://localhost:5000/auth/google`, chọn tài khoản google của bạn, sau đó các bạn check log ở server. nó sẽ in ra `accessToken` của user. (vì mình đã `console.log(accessToken);` ở trên (remember ?).

![](https://images.viblo.asia/f21334d2-d601-4013-a7f5-7ed1d66724b7.PNG)

```
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);
```


Oke vậy là chúng ta đã lấy được dữ liệu từ **Google** trả về rồi, giờ là lúc để lưu nó vào **Database** hoặc làm bất cứ điều gì chúng ta muốn thôi :D


### 2. Setup MongoDB
Mình sử dụng Database online của [mlab](https://mlab.com). Các bạn cũng có thể dùng local database để lưu trữ. It's fine.

In `server.js`, connect with mongoDB via `URI`. 
```
mongoose.connect(keys.mongoURI);
```

Ở đây mình dùng mongodb online, nên `URI` của mình là:
```
mongodb://<dbuser>:<dbpassword>@ds257752.mlab.com:57752/fullstack-nodejs-react
```
Các bạn cũng có thể dùng local với `URI` có dạng, ví dụ:
```
mongodb://localhost:27017/TestDB
```


Tạo `User` Class model để save user info.

In `models/user.js`
```
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: String,
  name: String
});

mongoose.model('users', userSchema);
```


Save user info vào Database, mình đã tách đoạn code xử lý passport ra một file riêng sau đó `require` vào `server.js`.


In `passport.js`
```
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./../config/key');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (profile, done) => {

    // Check if google profile exist.
    if (profile.id) {

      User.findOne({googleId: profile.id})
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.name.familyName + ' ' + profile.name.givenName
            })
              .save()
              .then(user => done(null, user));
          }
        })
    }
  })
);
```


Tiếp theo là sử dụng `serializeUser` và `deserializeUser` để thao tác với cookie. 

Bài hướng dẫn hơi dài nên các bạn có thể đọc qua để hiểu về nó. Bản chất của 2 function này là *generate ra một đoạn mã nào đó (token) sau đó biên dịch ra (decoded) để xác thực người dùng*.

In `passport.js`, thêm đoạn code này trước đoạn xử lý `GoogleStrategy`

```
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});
```

Giờ là lúc để enable cookie app.

Do `expressjs` không có cách nào để handle cookie, session nên mình sẽ sử dụng thêm 1 library để manage cookie

```
npm i cookie-session --save
```

In `server.js`

```
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
```

Set thời gian (30 days) và cookie key (In `key.js`). Sau đó nhờ thằng Passport handle bằng cách gọi 2 hàm dưới.


OK we were finished!!!

### 3. Test Authentication

Mình sẽ tạo 1 route để test xem, sau khi chúng ta login bằng Goole xong thì có hiển thị được thông tin không nhé.

In `server.js`

```
app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
```

ở đây mình mong muốn sau khi access vào route này, server sẽ trả về thông tin của mình.


Sau khi login xong, bạn visit vào url: `http://localhost:5000/api/current_user`

Bump, đây là kết quả sau khi visited :D:

```
{
    _id: "5b9c9ab1f90dd1171823446e",
    googleId: "101172904249533367339",
    email: "nguyenphuongthuan95@gmail.com",
    name: "Thuận Nguyễn Phương",
    __v: 0
}
```

Trong Database cũng được khởi tạo:

![](https://images.viblo.asia/bd2a00a8-2243-42fd-8f14-fa36c29a4bf0.PNG)

# Summary

Authentication là một vấn đề không mới nhưng để hiểu và xử lý nó đúng cách, hiểu quả là một điều không hề dễ dàng. Chúng ta nên tìm hiểu kỹ concept, process của nó trước khi đi thực hiện để tránh hiểu sai vấn đề dẫn đến gặp bug trong quá trình thực hiện.

Vậy là mình đã chia sẻ với các bạn cách Login thông qua Google, bài chia sẻ khá dài và mình cũng không thể show được tất cả code nên các bạn có thể visited repo của mình trên [github](https://github.com/phuongthuan/fullstack-nodejs-react) nhé.

Cảm ơn mọi người đã đọc bài!

*Happy coding!!*

Diagram: StephenGrider