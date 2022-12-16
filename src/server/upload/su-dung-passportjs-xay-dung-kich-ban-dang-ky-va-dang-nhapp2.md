Ở phần trước chúng ta đã làm ví dụ cơ bản sử dụng `passport.js` để xây dựng kịch bản đăng ký, đăng nhập sử dụng tài khoản local ***username***, ***password***.

-----

Các bạn có thể tham khảo lại tại đây: https://viblo.asia/p/su-dung-passportjs-xay-dung-kich-ban-dang-ky-va-dang-nhap-4dbZNEJyKYM

-----
Trong bài viết bày sẽ trình bày cách dùng module `bcrypt-nodejs` mã hoá dữ liệu để lưu vào database và sử dụng `flash` hiển thị thông báo lỗi, sử dụng `express-validator` để kiểm tra lỗi input.

-----
**app.js**
```javascript
var flash = require('connect-flash');
var validator = require('express-validator');

...
app.use(validator());

app.use(flash());

```
Ta sẽ xây dựng 2 hàm mã hoá và so sánh mật khẩu trong model `user.js `

-----
**user.js**
```javascript
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
```
trong file **passport.js** ta chuyển.
```javascript
 newUser.local.password = password;
```
thành
```javascript
 newUser.local.password = newUser.encryptPassword(password);
```
Như vậy ta đã xây dựng thành công hàm mã hóa dữ liệu, giờ đây mật khẩu lưu vào trong database đã được mã hóa.

-----
Tiếp theo chúng ta sẽ xử lý form validation đăng ký và hiển thị thông báo lỗi. 

-----
Trong file **userRouter.js** ta sẽ thêm các biến để hiển thị lỗi trên trang đăng ký
```javascript
router.route('/dang-ky')
    .get(function(req, res) {  
        var messages = req.flash('error');
        
        dataForm = {
                    firstname : '',
                    lastname : '',
                    email : '',
                    password : ''
        }    
        
        res.render('register',{
            messages: messages,
            hasErrors: messages.length > 0,
            dataForm : dataForm
        });
    })
    
   .post(function (req, res, next) {
        // form values
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
       
        //check form validation
        req.checkBody("firstname", "firstname is required").notEmpty();
        req.checkBody("lastname", "lastname is required").notEmpty();
        req.checkBody("email", "email is invalid").isEmail();
        req.checkBody("password", "password is required").notEmpty();
        req.checkBody('password', 'Xác nhận mật khẩu không giống nhau, vui lòng kiểm tra lại.').equals(req.body.password_confirmation);
        //check for errors
        var errors = req.validationErrors();

        dataForm = {
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : password
        }
     
        if (errors) {
            var messages = [];
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            res.render('register',{
                messages: messages,
                hasErrors: messages.length > 0,
                dataForm : dataForm
            });
        } else {
           next()
        }
    }, passport.authenticate('local.register',{
            successRedirect:'/nguoi-dung/dang-nhap',
            failureRedirect: '/nguoi-dung/dang-ky',
            failureFlash : true  
    }))
```
>` var messages = req.flash('error') ` lấy các thông báo lỗi từ **passport.js**
> Mặc định các thông báo lỗi trong file **passport.js** sẽ lưu mặc định trong **flash** có tên là **error**.
-----
Vì mỗi lần load lỗi sẽ render lại trang nên dữ liệu trên form sẽ mất, nên ta cần lại lưu dữ liệu lại để hiển thị lại trên trang khi render. Vì ban đầu dữ liệu trên form chưa có nên ta cần phải tạo 1 object với dữ liệu rỗng để khi load page lần đầu không bị lỗi.

-----
Để hiển thị lại dữ liệu khi thông báo dã tồn tại email thì trong phần thông báo lỗi ở **passport.js** ta sẽ lưu lại dữ liệu form vào trong **flash**.

-----
**passport.js**
```javascript
...
 req.flash('dataForm',dataForm)
 return done(null, false, { message : 'Email đã được sử dụng, vui lòng chọn email khác'})
...
```

Trên trang register ta sẽ hiển thị danh sách các thông báo lỗi.

-----
**register.ejs**
```javascript
 <% if(hasErrors) { %>
    <div class="alert alert-danger">
       <% messages.forEach(function(message){ %>
          <span><%=  message %></span>
       <% })%>    
    </div>
 <% } %>
 
 ....
  <input type="text" name="firstname" id="firstname" value="<%= dataForm.firstname %>" class="form-control input-sm" placeholder="First Name" >
```
> `value="<%= dataForm.firstname %>"` hiển thị dữ liệu.

-----
Tương tự như trang register, bây giờ ta tiếp tục xử lý validation trang đăng nhập.

-----
**userRouter.js**
```javascript
router.route('/dang-nhap')
    .get(function(req, res) {   
        var messages = req.flash('error');

        res.render('login',{
            messages: messages,
            hasErrors: messages.length > 0
        });
    })
    .post(passport.authenticate('local.login', { 
        successRedirect: '/',
        failureRedirect: '/nguoi-dung/dang-nhap',
        failureFlash: true }))
```
**login.ejs**
```javascript
  <% if(hasErrors) { %>
     <div class="alert alert-danger">
         <% messages.forEach(function(message){ %>
            <span><%=  message %></span>
         <% })%>    
      </div>
   <% } %>
```
Như vậy chúng ta đã hoàn thành việc tạo validation cơ bản cho các trang đăng ký và đăng nhập. 

-----
***Tham khảo:***

-----
- https://blog.ijasoneverett.com/2013/04/form-validation-in-node-js-with-express-validator/
- https://booker.codes/input-validation-in-express-with-express-validator/
- https://code.tutsplus.com/vi/tutorials/build-web-application-using-nodejs--cms-29652