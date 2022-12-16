Sau đây mình xin hướng dẫn các bước để validate form trong ứng dụng nodejs
# Tạo thư mục ứng dụng
```
mkdir validate-form
cd validate-form
npm init //Để tạo file package.json
```
# Cài đặt các package cần thiết cho ứng dụng
```
npm install express --save
npm install body-parser --save
npm install express-session --save
npm install express-validator --save
npm install ejs --save
```

Khi đó file package.json có dạng như sau:
```
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Nguyen Trung Nam",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.3",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "express-session": "^1.15.6",
    "express-validator": "^5.3.1",
  }
}
```
# Khởi tạo file app.js để chạy ứng dụng
```
var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");
var expressValidator = require("express-validator");

var app = express();
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set("views", __dirname + "/path/views"); //Config đường dẫn tới folder chứa các file ejs

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public')); //Config đường dẫn tới folder chứa các file static như css,js,font...
var controllers = require(__dirname + "/path/controllers"); //Config đường dẫn tới folder chứa các file controller của ứng dụng

app.use(controllers);
app.listen(port, host, function () {
  console.log("Server is running port:", 3000);
})
```

# Viết base validator
Create basevalidator.js
```
function checkvalidate(req,user) {
    req.checkBody("email", "Email is required").notEmpty(); //validate để trống trường email sử dụng hàm notEmpty()
    req.checkBody("email", "Email is not invalid").matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/); //Validate định dạng email sử dụng regex, sử dụng hàm matches()
    req.checkBody("phonenumber","Phone is required").notEmpty();
    req.checkBody("phonenumber","Phone is not valid").matches(/(09|01[2|6|8|9])+([0-9]{8})\b/);
    return req.validationErrors();
}

module.exports = {
    checkvalidate: checkvalidate
};
```

# Tạo file html form
Create register.html
```
<h3 class="register-heading">Register Teacher</h3>
                        <form method="POST" action="signup">
                            <div class="row register-form">                            
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Your Email *" name="email"/>
                                        <p>
                                                <% for(var i=0; i<errors.length; i++) {%>
                                                    <% if(errors[i].param=="email"){%>
                                                        <%= errors[i].msg %>
                                                    <%}%>
                                                <%}%>
                                            </p>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" minlength="10" maxlength="10" name="phonenumber" class="form-control"
                                            placeholder="Your Phone *" />
                                        <p>
                                                    <% for(var i=0; i<errors.length; i++) {%>
                                                        <% if(errors[i].param=="phonenumber"){%>
                                                            <%= errors[i].msg %>
                                                        <%}%>
                                                    <%}%>
                                                </p>
                                    </div>
                                   
                                    <input type="submit" class="btnRegister" value="Register" />
                                </div>
                            </div>
                        </form>
```

# Viết controller
Create signup.js
```
var express = require("express");
var router = express.Router();
var basevalidate = require("../path/basevalidator");

router.post("/signup", function (req, res) {
    var user = req.body;

    var errors = basevalidate.checkvalidate(req, user);
    if (!errors) {
        res.render("home");
    } else {
        res.render("signup", { errors: errors, user: user });
    }

});
module.exports = router;
```

Cảm ơn mọi người đã theo dõi bài viết của mình!