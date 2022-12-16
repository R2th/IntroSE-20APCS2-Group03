## 1. Giới thiệu
Khi làm việc với form request thì validate là một việc không thể tránh khỏi. Validate chia làm hai loại là validate form ở phí server và phía client. Hôm nay chúng ta sẽ tìm hiểu cách validate ở phía client với thư viện validate.js.
## 2. Cài đặt thư viện validate.js
Có 5 cách cài đặt thư viện validate.js như dưới đây:

Browser/CDN
```
<script src="//cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js"></script>
```
Requirejs/AMD
```
require(["validate.js"], function(validate) {
  ...
});
```
Npm/node.js
```
$ npm install --save validate.js

var validate = require("validate.js");
```
Bower
```
$ bower install --save validate.js
```
Component
```
$ component install ansman/validate.js
```
## 3. Tạo constraints
Khi làm việc với validate.js, đối tượng này là rất cần thiết. Bên trong cấu trúc constraints, bạn xác định thuộc tính nào của đầu vào bạn muốn kiểm tra, loại đầu vào nào bạn muốn kiểm tra, kiểm tra các tùy chọn trình xác thực tùy chỉnh của bạn và nhiều hơn nữa như xác định thông báo lỗi.

Cấu trúc cơ bản của đối tượng constraints:
```js
let constraints = {
  <attribute>: {
    <validator name>: <validator options>
  }
}
```
### Một số ví dụ constraints:
Email:
```js
email: {
    // email is reqiured
    presence: true,
    // check format email
    email: {
        message: 'Please enter valid email'
    },
},
```
Password:
```js
password: {
    // password is required
    presence: true,
    // min length is 8 character
    length: {
        minimum: 8,
    },
},
```
Confirm password:
```js
"confirm-password": {
    // confirm password is required
    presence: true,
    // confirm password is always equal to password.
    equality: {
        attribute: "password",
        message: "^The passwords does not match",
    },
},
```
Name:
```js
name: {
    presence: true,
    // min length is 3 and max length is 20
    length: {
        minimum: 3,
        maximum: 20,
    },
    // check name matches regular expressions 
    format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: " can only contain a-z and 0-9",
    },
},
```
## 4. Vaildate function
Cấu trúc cơ bản của hàm validate:
```
validate(attributes, constraints, [options])
```
Một số ví dụ cơ bản:
```js
let constraints = {
  username: {
    presence: true,
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
  },
};

validate({username: "nick"}, constraints);
// => undefined
// correct input

validate({username: "nicklas"}, constraints);
// => {"username": ["Username 'nicklas' is not allowed"]}

validate({}, constraints, {format: "flat"});
// => ["Username can't be blank"]
```
Xác thực một giá trị đơn lẻ:
```
validate.single("foo", {presence: true, email: true});
```
## 5. Ví dụ
### HTML form:
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Validate.js example</title>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
  <link href="index.css" rel="stylesheet">
</head>
<body>
  <div class="card mx-5 my-5 px-5 py-5">
    <h1>Validate.js example</h1>
    <form id="main" class="form-horizontal" action="/example" method="post" novalidate>
      <div class="form-group row mb-0">
        <div class="col-sm-8 md-form px-0">
          <label class="control-label" for="name">Full name</label>
          <span id="error-name" class="text-danger"></span>
          <input id="name" class="form-control" type="text" name="name">
        </div>
        <div class="col-sm-4 messages">
        </div>
      </div>
      <div class="form-group row mb-0">
        <div class="col-sm-8 md-form px-0">
          <label for="email" class="control-label">Email</label>
          <span id="error-email" class="text-danger"></span>
          <input id="email" class="form-control" type="email" name="email">
        </div>
        <div class="col-sm-4 messages"></div>
      </div>
      <div class="form-group row mb-0">
        <div class="col-sm-8 md-form px-0">
          <label for="password" class="control-label">Password</label>
          <span id="error-password" class="text-danger"></span>
          <input id="password" class="form-control" type="password" name="password">
        </div>
        <div class="col-sm-4 messages"></div>
      </div>
      <div class="form-group row mb-0">
        <div class="col-sm-8 md-form px-0">
          <label class="control-label" for="confirm-password">Confirm password</label>
          <span id="error-confirm-password" class="text-danger"></span>
          <input id="confirm-password" class="form-control" type="password" name="confirm-password">
        </div>
        <div class="col-sm-4 messages"></div>
      </div>
      <div class="form-group row mb-0">
        <div class="col-sm-8 md-form px-0">
          <label class="control-label" for="phoneNumber">Phone Number</label>
          <span id="error-phone" class="text-danger"></span>
          <input id="phone" class="form-control" type="text" name="phoneNumber">
        </div>
        <div class="col-sm-4 messages">
        </div>
      </div>
      <div class="form-group row mb-0">
        <div class="col-sm-8 md-form px-0">
          <label class="control-label" for="birthday">Birthday</label>
          <span id="error-birthday" class="text-danger"></span>
          <input id="birthday" class="form-control" type="date" placeholder="YYYY-MM-DD" name="birthday">
        </div>~
        <div class="col-sm-4 messages"></div>
      </div>
      <div class="form-group">
        <div class="text-center pt-3">
          <button type="submit" class="btn btn-dark">Submit</button>
        </div>
      </div>
    </form>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js"></script>
  <script src="validate.js"></script>
</body>
</html>
```
### File validate bằng js:
```js
(function () {
    // Add parse and format functions to using validate date time 
    validate.extend(validate.validators.datetime, {
        parse: function (value, options) {
            return +moment.utc(value);
        },
        format: function (value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        },
    });
    const constraints = {
        email: {
            presence: true,
            email: {
                message: 'Please enter valid email'
            },
        },
        password: {
            presence: true,
            length: {
                minimum: 8,
            },
        },
        "confirm-password": {
            presence: true,
            equality: {
                attribute: "password",
                message: "^The passwords does not match",
            },
        },
        name: {
            presence: true,
            length: {
                minimum: 3,
                maximum: 20,
            },
            format: {
                pattern: "[a-z0-9]+",
                flags: "i",
                message: " can only contain a-z and 0-9",
            },
        },
        phone: {
            presence: true,
            length: {
                minimum: 10,
                maximum: 11,
            },
            format: {
                pattern: "[0-9]+",
                flags: "i",
                message: "can only contain a-z and 0-9",
            },
        },
        birthday: {
            presence: true,
            datetime: {
                dateOnly: true,
                latest: moment.utc().subtract(18, 'years'),
                message: "^You need to be at least 18 years old"
            }
        },
    }
    
    $('#email').blur(() => {
        let error = validate.single($('#email').val(), constraints.email) || {};
        $('#error-email').html(error)
    })

    $('#name').blur(() => {
        let error = validate.single($('#name').val(), constraints.name) || {};
        $('#error-name').html(error)
    })

    $('#password').blur(() => {
        let error = validate.single($('#password').val(), constraints.password) || {};
        $('#error-password').html(error)
    })

    $('#confirm-password').blur(() => {
        let error = validate.single($('#confirm-password').val(), constraints["confirm-password"]) || {};
        $('#error-confirm-password').html(error)
    })

    $('#phone').blur(() => {
        let error = validate.single($('#phone').val(), constraints.phone) || {};
        $('#error-phone').html(error)
    })

    $('#birthday').change(() => {
        console.log($('#birthday').val())
        let error = validate.single($('#birthday').val(), constraints.birthday) || {};
        $('#error-birthday').html(error)
    })
})();
```
Bây giờ chúng ta có thể xem kết quả thực hiện được.

## 6. Tổng kết
Validate.js là thư viện hữu ích để tạo tất cả các loại quy tắc xác thực và các giải pháp phức tạp. Bạn có thể tùy chỉnh mọi điểm trong biểu mẫu của mình mà không cần do dự.
### Link github source code
https://github.com/Quang173330/validate.git
### Tài liệu tham khảo
https://validatejs.org/

https://mdbootstrap.com/articles/jquery/validate-forms-with-validate-js/