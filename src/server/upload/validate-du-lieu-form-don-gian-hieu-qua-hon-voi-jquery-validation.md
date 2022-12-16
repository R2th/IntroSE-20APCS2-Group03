Cảm hứng để viết bài này bắt nguồn từ một vấn đề mình gặp phải khi làm project. Khi validate form từ phía server, mỗi lần submit form thì sẽ tải lại trang, nếu làm việc với popup thì mỗi lần như vậy popup sẽ không hiển thị lên nữa; và giải giáp cho vấn đề này chính là validate form ở client, dùng jQuery Validation Plugin. 
<br>
## **Bước 1: Download thư viện Jquery**<br>
Bạn cần có thư viện gốc jquery để có thể sử dụng JQuery Validation.

Bạn có thể download thư viện tại:<br>
https://cdn.jsdelivr.net/jquery/1.12.4/jquery.min.js

## **Bước 2: Download thư viện Jquery Validation**<br>
Bạn có thể download thư viện này tại:
https://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js

## **Bước 3: Tạo form HTML**<br>
```html
<div class="container">
    <div class="row centered-form">
        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Sign Up</h3>
                </div>
                <div class="panel-body">
                    <form role="form" name="registration">
                        <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <input type="text" name="firstname" id="firstname" class="form-control input-sm" placeholder="First Name">
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <input type="text" name="lastname" id="lastname" class="form-control input-sm" placeholder="Last Name">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address">
                        </div>
                        <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <input type="password" name="password" id="password" class="form-control input-sm" placeholder="Password">
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-sm" placeholder="Confirm Password">
                                </div>
                            </div>
                        </div>
                        <input type="submit" value="Register" class="btn btn-info btn-block">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
```
## **Bước 4: Bắt đầu làm với Jquery validation**<br>
Ngay bây giờ, chúng ta sẽ bắt tay vào làm việc với JQuery Validation.<br>
Giả sử yêu cầu xác thực thông tin là: họ, tên bắt buộc; email bắt buộc và phải đúng định dạng; password và password confirm bắt buộc và có độ dài bé nhất là 5.<br>
Đoạn js của chúng ta sẽ như sau:
```JS
$("#registration").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      },
      password_confirmation: {
        required: true,
        minlength: 5
      }
    },

    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      password_confirmation: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address"
    },

    submitHandler: function(form) {
      form.submit();
    }
 });
```
Và bây giờ các bạn có thể test và xem thành quả :)<br>
Chúng ta cũng có thể custom rule nếu rule đó không có sẵn:
```JS
$.validator.addMethod("validatePassword", function (value, element) {
            return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value);
        }, "Hãy nhập password từ 8 đến 16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số");
        
```
Nếu  muốn validate với một giá trị của một element khác, trong rule "validatePassword" thay vì là true, ta truyền vào id của element cần so sánh.


```
validatePassword: "#re-password",
```

Bạn cũng có thể tùy biến vị trí hiển thị message bằng option errorPlacement:

```JS
errorPlacement: function(error, element) {
        if (element.attr('name') == 'password') {
            error.insertAfter('#password');
        } else{
            error.insertAfter(element);
        }
 }
```
## **Tổng kết**
<br>
Vậy là chúng ta đã có một ví dụ đơn giản về cách làm việc với JQuery Validation, đây là một plugin rất gọn nhẹ xong thực sự hữu ích trong validate client site. Hy vọng đã mang lại cho mọi người một bài viết hữu ích. <br>
Tài liệu tham khảo:
<br>
https://jqueryvalidation.org/<br>
https://techblog.vn/tim-hieu-jquery-validation-qua-vi-du-co-ban