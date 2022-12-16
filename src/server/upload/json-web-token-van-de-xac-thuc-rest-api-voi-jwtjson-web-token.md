Trước cách đây mấy hôm tôi có viết về ["Vấn đề xác thực Firebase với custom token". ](https://anonystick.com/blog-developer/firebase-phan-1-van-de-xac-thuc-firebase-voi-custom-token-2019060582746819.jsx)Và nhận được tương tác trong mail và messenger về cách hỏi không liên quan đến firebase đó là JWT. Không hiểu tại sao mấy bạn lại quan tâm đến đến JWT trong khi mình viết về custom token trong firebase. Hài! Nhưng do cơ duyên đó nên mới có bài hôm nay cho các bạn. Ok giới thiệu được rồi, giờ vô phần chính của công việc hôm nay. Như thường lệ.

Đọc thêm nhiều bài viết ở đây: 

[Vấn đề xác thực Firebase với custom token](https://anonystick.com/blog-developer/firebase-phan-1-van-de-xac-thuc-firebase-voi-custom-token-2019060582746819.jsx)

[Hướng dẫn xác thực tài khoản login bằng SMS, miễn phí sử dụng Firebase](https://anonystick.com/blog-developer/huong-dan-xac-thuc-tai-khoan-login-bang-sms-mien-phi-su-dung-firebase-2019052757983530.jsx)

Và còn nhiều bài viết [tại đây](https://anonystick.com/):

### ✔ Yêu cầu người đọc

1 - Hiểu restful api là gì? 

2 - JSON Web Token là gì? 

3 - Tại sao lại xác thực REST API (Nodejs) với JWT(JSON Web Token)?

### ✔ Sơ lược 
Restful api là gì? 

REST (REpresentational State Transfer) được đưa ra vào năm 2000, trong luận văn tiến sĩ của Roy Thomas Fielding (đồng sáng lập giao thức HTTP). Nó là một dạng chuyển đổi cấu trúc dữ liệu, là một phong cách kiến trúc cho việc thiết kế các ứng dụng có kết nối. Nó sử dụng HTTP đơn giản để tạo cho giao tiếp giữa các máy. Vì vậy, thay vì sử dụng một URL cho việc xử lý một số thông tin người dùng, REST gửi một yêu cầu HTTP như GET, POST, DELETE, vv đến một URL để xử lý dữ liệu. 

Nguồn (https://movan.vn) 

JSON Web Token là gì? 

> JSON Web Mã (JWT) là một chuẩn mở (RFC 7519) định nghĩa một cách nhỏ gọn và khép kín để truyền một cách an toàn thông tin giữa các bên dưới dạng đối tượng JSON. Thông tin này có thể được xác minh và đáng tin cậy vì nó có chứa chữ ký số. JWTs có thể được ký bằng một thuật toán bí mật (với thuật toán HMAC) hoặc một public / private key sử dụng mã hoá RSA. Ví dụ
> 
> `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEzODY4OTkxMzEsImlzcyI6ImppcmE6MTU0ODk1OTUiLCJxc2giOiI4MDYzZmY0Y2ExZTQxZGY3YmM5MGM4YWI`
> 
> Nguồn https://viblo.asia


### Tại sao lại xác thực REST API (Nodejs) với JWT(JSON Web Token)? 

Đây là một câu hỏi quan trọng giúp các bạn hiểu thêm về security trong việc phát triển một restful api. Tất nhiên đây chỉ là một phần security trong rất rất nhiều phần security còn lại. 

Ví dụ: Bạn có một link rest api: https://domain.com/users/getAll Nhìn sơ qua các bạn cũng thấy nhiệm vụ của nó là gì? Đó chính là lấy tất cả các user hiện có trong collection users. Nếu như link này bất cứ ai cũng có thể truy cập được và lấy nó thì hậu quả như thế nào? Cho nên mới có việc xác thực một ai đó được cấp quyền mới lấy được những user đó. Vậy cho nên chúng ta mới sử dụng JSON Web Token để giải quyết vấn đề đó. 

### ✔ Quy trình việc xác thực JWT và restful nodejs. 
5 step giúp chúng ta hiểu nhanh hơn 

1 - Client gửi passWord, nameUser tới server nhằm để xác thực việc đăng nhập 

2 - Nếu login thành công back-end sẽ tạo ra một generate a random String dạng json web token gửi về cho client 

3 - Client nhận token đó, rồi lưu trữ ở đâu đó (cookies, storageSession..) 

4 - Khi client muốn get data gì đó thì luôn gửi kèm token này lên cùng với http request. 

5 - Server nhận được http request từ client thì check token này available hay không? Rồi cho đi tiếp, còn không chặn lại, và có thể report ip này. 

### ✔  Build một resful api với JWT(JSON Web Token) 

**1 - install project**

`npm install --save  express body-parser morgan jsonwebtoken `

**2 - index.js**

```
const express = require('express'),
bodyParser = require('body-parser'),
jwt    = require('jsonwebtoken'),
config = require('./configurations/config'),
app = express(); 

//set secret
app.set('Secret', config.secret);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.listen(3000,()=>{

 console.log('server is running on port 3000') 

});
app.get('/', function(req, res) {
    res.send('Hello world  app is running on http://localhost:3000/');
});
```

**3 - configurations/config.js**
```

module.exports = {

    secret : "heymynameismohamedaymen"
}
```
đến đây run phát xem chạy chưa?

`node index.js`
open your browser on http://localhost:3000/ 


![](https://images.viblo.asia/ff912dff-97e9-4b35-ae80-be7e9fc9fc08.png)


ok tiếp chạy rồi. 

**4 - Setting up the authentication system **

viết trong file index.js, giả sử password và user trong database tương ứng là 123 và anonystick

```
app.post('/authenticate',(req,res)=>{

    if(req.body.username==="anonystick"){

        if(req.body.password===123){
             //if eveything is okey let's create our token 

        const payload = {

            check:  true

          };

          var token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 1440 // expires in 24 hours

          });


          res.json({
            message: 'authentication done ',
            token: token
          });

        }else{
            res.json({message:"please check your password !"})
        }

    }else{

        res.json({message:"user not found !"})

    }

})
```
Giờ chạy trên postman xem sao nhé OK rồi. 

![](https://images.viblo.asia/f50cce39-2e29-4370-8c87-89b80b6de4c3.png)

Client có token rồi. Test tiếp nè Setting routes

```
const  ProtectedRoutes = express.Router(); 

app.use('/api', ProtectedRoutes);

ProtectedRoutes.use((req, res, next) =>{


    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {

      // verifies secret and checks if the token is expired
      jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
        if (err) {
          return res.json({ message: 'invalid token' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {

      // if there is no token  

      res.send({ 

          message: 'No token provided.' 
      });

    }
  });
```
  
  viết một routes cho việc get data
  
```
  ProtectedRoutes.get('/getAllProducts',(req,res)=>{
 let products = [
     {
         id: 1,
         name:"cheese"
     },
     {
        id: 2,
        name:"carottes"
    }
 ]

 res.json(products)

})
```
Xong, chúng ta sẽ so sánh hai cách lấy dữ liệu xem thế nào? 

without Token

![](https://images.viblo.asia/6abc6f68-549d-4143-b3c1-c62b124a2aef.png)


with Token
![](https://images.viblo.asia/440b4335-3b56-40c7-8b09-27336b61c934.png)

Đọc thêm nhiều bài viết ở đây: 

[Vấn đề xác thực Firebase với custom token](https://anonystick.com/blog-developer/firebase-phan-1-van-de-xac-thuc-firebase-voi-custom-token-2019060582746819.jsx)

[Hướng dẫn xác thực tài khoản login bằng SMS, miễn phí sử dụng Firebase](https://anonystick.com/blog-developer/huong-dan-xac-thuc-tai-khoan-login-bang-sms-mien-phi-su-dung-firebase-2019052757983530.jsx)

Và còn nhiều bài viết [tại đây](https://anonystick.com/):

Ví dụ trên tham khảo tại : https://dev.to/medaymentn/securing-your-node-js-api-with-json-web-token-5o5