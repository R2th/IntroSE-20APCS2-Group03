# Xác thực người dùng
Khi xây dựng một ứng dụng, có nhiều trang chúng ta cần yêu cầu người dùng phải là ai đó mới cho truy cập. Vì vậy cần có xác thực người dùng - là việc kiểm tra xem người dùng đang truy cập đã đăng ký tài khoản hay chưa, người dùng là ai? Quy trình này được thực hiện bằng cách yêu cầu người dùng cung cấp thông tin cá nhân thông thường là địa chỉ email và mật khẩu để có thể truy cập vào một số trang nhất định.

Bài này mình sẽ giới thiệu cho các bạn sử dụng Passport.js để xác thực người dùng trong NodeJS nhé (Tất nhiên là với góc nhìn là người mới học NodeJS, mình sẽ giải thích cụ thể nhất về cách sử dụng và lý do từng dòng code cho các bạn dễ hiểu nhé :D) 

# Cài đặt - tải về Passport.js
Đầu tiên cần phải tải  về **Passport.js** đã chứ nhỉ. Vào folder project của bạn, mở *terminal* và sử dụng câu lệnh sau để tải về nhé:
```javascript
npm install passport --save
```
Để kiểm tra xem đã tải về thành công chưa, các bạn mở folder `node_modules` trong thư mục project của mình ra xem có folder `passport` chưa nhé! Ngoài ra để xem thêm document của **passport.js**, mọi người xem thêm tại [đây](http://www.passportjs.org/docs/downloads/html/) nhé.

Ngoài ra, để sử dụng passport, các bạn cũng cần phải có express nữa, bài này mình sẽ sửu dụng express js để hướng dẫn cho các bạn nhé
```javascript
npm install express ejs --save
```
Để kiểm tra xem đã được tải thành công chưa, hãy mở file `package.json` ra kiểm tra như sau nhé: tìm tới `dependencies`, tìm xem đã có `express` và `ejs` chưa, nếu thấy rồi tức là đã tải thành công rồi đó.
# Bắt đầu tìm hiểu cách sử dụng passport
Trước hết ta tạo 1 file **index.js** đóng vai trò như controller điều khiển các router nhé. 

Đầu tiên, ta sẽ khai báo vài biến const đã:
``` javascript
const express = require('express'); //khai báo sử dụng module express
const app = express();
const port = 3000; //Chọn cổng 3000 để chạy ứng dụng
app.listen(port, () => console.log('server đang chạy...')); //console.log ra nếu chương trình đã chạy thành công trên cổng
```
Giờ để xem đã chạy trên cổng 3000 được chưa, hãy mở terminal trong folder project và chạy lệnh sau nhé:
```
nodemon 3000
```
Nếu terminal hiển thị ra dòng console.log của bạn tức là ứng dụng đã chạy rồi đấy
![](https://images.viblo.asia/c42e6336-6541-49a6-b0b1-932e35774f7b.png)

Giờ thêm router đầu tiên để test nhé:
```javascript
app.get('/', (req, res) => res.send('Hello World'));
```
Ở đây, mình sẽ giải thích từng thứ nhé:
* `app.get` là khai báo phương thức sử dụng là `get`
* Tiếp theo là đường dẫn bạn muốn đặt khi gõ lên trình duyệt, ví dụ như `/index` thì bạn sẽ gõ trên đường dẫn là `http://localhost:3000/index`, còn như trên thì đường dẫn chỉ đơn giản là `http://localhost:3000/`. 
* `req` chính là request, nơi chứa những request từ client gửi lên server
* `res` là response, là dữ liệu trả về cho client
* Arrow function sẽ là những thực thi mà server sẽ thực hiện khi chạy request được gọi: ở đây là response ra dòng chữ 'Hello World' trên màn hình trả về (`res.send` nghĩa là chỉ in ra thôi).

Bây giờ mở đường dẫn `http://localhost:3000/` trên trình duyệt của bạn, bạn sẽ nhận được dòng chữ 'Hello World' trên màn hình:
![](https://images.viblo.asia/e7622f2e-890c-4672-85aa-e9ac232a30c9.png)

Bây giờ, để đường dẫn sẽ tới file giao diện của mình, bạn hãy đổi `.send('text)` thành `.render('tên file giao diện')` nhé.

Mình sẽ sử dụng express js, tạo ra file `index.ejs` nằm trong thư mục **views** làm file giao diện cho trang vừa rồi.
Trong **index.ejs**, in ra dòng chữ đơn giản thôi: 
```html
<!DOCTYPE html>
<html>
<head>
	<title>Home</title>
</head>
<body>
	<p>Hello</p>
	<a href="/login">Login</a>
</body>
</html>
```
Mình sẽ khai báo thư mục **views** dùng để chứa các file giao diện (tất nhiên là phải khai báo trước khi render ra giao diện nhé):
```javascript
// chọn view xuất ra là file ejs
app.set('views', './views'); //khai báo thư mục chứa giao diện là folder views
app.set('view engine', 'ejs');
```

Bây giờ cần phải sửa lại 1 chút: dòng `.send` giờ sẽ thành `.render('index')`. Đối với file `.ejs`, do đã khai báo sử dụng `view engine` là `ejs` ở trên rồi nên không cần phải ghi thêm đuôi `ejs` vào nữa, chỉ cần tên file là được rồi:
![](https://images.viblo.asia/45293afc-dbd7-4fe0-8c63-24f69b8a78b1.png)

Bây giờ refresh lại trang của bạn, bạn sẽ thấy nội dung trong trang `index.ejs` mà mình đã viết rồi :D

![](https://images.viblo.asia/8a946b45-355e-4e03-9753-a82391bcb2e4.png)

Giờ thử bấm vào dòng `/login`, bạn sẽ chỉ nhận được báo lỗi `Cannot GET /login` bởi vì khi click vào link, giống như PHP, mặc định phương thức là `GET`, mà chúng ta đã khai báo phương thức `GET` cho đường link này của ứng đâu, nên lỗi là đúng rồi :D

Mình sẽ khia báo cho phương thức `GET` của link `/login` này sẽ dẫn tới file view tên là `login.ejs` nhé:
```javascript
app.route('/login')
.get((req, res) => res.render('login'))
```

File view này thì nội dung mình để đơn giản thôi, là form đăng nhập cơ bản:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <form action="/login" method="post">
        <input type="text" name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <input type="submit" name="" value="Login">
    </form>
</body>
</html>
```
vậy là khi click vào đường dẫn `/login` ở trang `index.ejs` đã có đích tới là trang `login.ejs` rồi! Bây giờ thì các bạn thấy đấy, trang `/login` của mình có 1 cái form, mình đang đặt method là post phải không? Phương thức `GET` có rồi, giờ làm quen phương thức `POST` sử dụng để đăng nhập  :D

Trước hết đương nhiên là tạo cái điều hướng cho method `POST` của trang `/login` đã. Mình sẽ viết luôn vào ngay dưới phương thức `GET` trên kia cho nó gần nhau :v:
```javascript
app.route('/login')
.get((req, res) => res.render('login'))
.post(passport.authenticate('local', { //chọn phương thức check là local => npm install passport-local
    failureRedirect: '/login',  //nếu check không đúng thì redirect về link này
    successRedirect: '/loginOK'
}));
```
Các bạn có thể thấy, mình viết vài tham số lạ lạ vào trong phương thức `POST`.
Đầu tiên là mình có biến `passport`, nhưng mà bây giờ mà chạy thử là sẽ báo lỗi chưa khai báo biến `passport` ngay! Vì vậy giờ khai báo thêm biến `passport` sử dụng node modules `passport` và cả `body-parse` (để có thể lấy được dữ liệu từ form) ở trên dòng này đã nhé:
```javascript
//Nếu chưa có body-parser thì tải về bằng câu lệnh: 'npm install body-parser' nhé
const bodyParser = require('body-parser');
const passport = require('passport');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize()); //Dòng này để thông báo sử dụng passport nhé
```
Tiếp nữa, do chúng ta sử dụng phương thức chứng thực là `local` nên phải tải gói `local` về nữa:
```
npm install passport-local
```
và khai báo sử dụng trước khi dùng:
```javascript
const localStrategy = require('passport-local').Strategy;
```
Giống như PHP thuần, chúng ta lưu trữ thông tin đăng nhập vào session, thì ở đây cũng vậy, passport sẽ sử dụng session để lưu trữ thông tin. Thế nên là cần phải khai báo sử dụng session nữa nhé:
```javascript
//nếu chưa tải về thì tải gói session với lệnh
//npm install express-session
const session = require('express-session');
//và khai báo sử dụng:
app.use(session({
    secret: 'something',
    cookie: {
        maxAge: 1000 * 50 * 5 //đơn vị là milisecond
    }
}));
app.use(passport.session());

```

Giờ đã khai báo xong biến `passport` sử dụng modules `passport` và session để lưu thông tin. Để sử dụng `passport` xác thực người dùng, chúng ta sẽ sử dụng hàm `.authenticate`. Hàm này chính là hàm kiểm tra xác thực người dùng, là middleware giúp ta gắn kịch bản local vào route.

Trong hàm `.authenticate` này ta thấy có 3 tham số:
> `'local'`: khai báo chọn phương thức kiểm tra là 'local'
> 
> `failureRedirect`: điều hướng khi xác thực không đúng
> 
> `successRedirect`: điều hướng khi xác thực đúng

Tuy nhiên là như mọi người thấy, vẫn chưa thấy chỗ nào để biết điều kiện xác thực đâu cả. Vậy thì giờ cần điều kiện cho xác thực nữa:
```javascript
passport.use(new localStrategy(
     (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
         if(username == 'user') { //kiểm tra giá trị trường có name là username
             if (password == 12345) { // kiểm tra giá trị trường có name là password
                 return done(null, username); //trả về username
             } else {
                 return done(null, false); // chứng thực lỗi
             }
         } else {
             return done(null, false); //chứng thực lỗi
         }
     }
))
```
Ở đây do mình khai báo phương thức chứng thực là 'local' nên là khi sử dụng mình sẽ use localStrategy mà đã khai báo ở trên rồi đấy.
Bây giờ bạn thử nhập `username`, `password` sai, bạn sẽ thấy bị redirect về trang `login` ngay lập tức, vì mình đã điều hướng ở trên rồi. Nhưng mà nếu nhập đúng `username` và `password`, thì lại nhận được báo lỗi: 
```
Error: Failed to serialize user into session
```
Như vậy là lỗi chưa thể format - mã hóa dữ liệu để có thể lưu trữ user vào session. Lỗi đến đâu sửa đến đó, khai báo serialize thôi:
```javascript
passport.serializeUser((username, done) => {
    done(null, username);
})
```
Đã có mã hóa thì phải có hàm giải mã định dạng nữa:
```javascript
passport.deserializeUser((name, done) => {
    //tại đây hứng dữ liệu để đối chiếu
    if (name == 'user') { //tìm xem có dữ liệu trong kho đối chiếu không
        return done(null, name)
    } else {
        return done(null, false)
    }
})
```
Nhân tiện mình làm cái điều hướng cho trang `/loginOK` luôn nhé: Mình sẽ làm đơn giản là in ra chữ 'Thành công' thôi:
```javascript
app.get('/loginOK', (req, res) => res.send('Thành công'));
```
Bây giờ khi login với đúng tên đăng nhập và mật khẩu đã có thể tới trang 'Thành công' rồi đấy :)

Tuy nhiên là như bạn có thể thử, đường link này có thể truy cập tới bất cứ lúc nào, kể cả chưa đăng nhập vẫn truy cập được. Trong thực tế chúng ta có những đường dẫn không muốn người khác tùy tiện truy cập vào, chỉ khi đặng nhập đúng tài khoản mới được truy cập vào, vậy thì mình phải ứng dụng 'giấy thông hành' vừa học cho các route cần xác thực luôn nhé.

Trước hết mình sẽ tạo 1 route yêu cầu xác thực trước khi vào. Đặt tên là `secret` nhé:
```javascript
app.get('/secret', (req, res) => {
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi
        res.send('Đã đăng nhập');
    } else {
        res.redirect('/login');
    }
})
```
Ở đây sẽ check ngay đầu route xem đã xác thực chưa bằng hàm `.isAuthenticated()`, nếu hàm trả về true, thì sẽ thực hiện tiếp, ở đây là in ra dòng chữ 'Đã đăng nhập'. Còn nếu trả về false thì mình cho nó ra đảo - về `/login` luôn :D

Bây giờ thì chắc các bạn hiểu hơn cách dùng, vì sao dùng 1 đống thứ khai báo, sử dụng kia rồi nhỉ? Lúc tìm hiểu về cái này, mình thấy trên mạng cũng nhiều bài viết lắm, nhưng mà mỗi tội viết chục dòng code 1 lúc mà không hiểu cái nào để làm gì, cái nào là điều kiện cái nào. Dưới cái nhìn của đứa chưa biết nhiều về NodeJS thì cứ như kiểu chỉ có thể copy - paste, mất nhiều thời gian để search từng cái rồi hiểu TT.TT. 
Vì thế mình viết bài này, nói từng bước thêm code 1 để các bạn hiểu từng dòng code, hy vọng là giúp được mọi người dù mới là beginer cũng biết mình copy từng dòng có ý nghĩa gì. Cảm ơn mọi người đã đọc :)