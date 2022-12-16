## **I. Giới thiệu**

Trong Rails, chúng ta có thể validate các dữ liệu trước khi chúng được lưu vào cơ sở dữ liệu bằng cách sử dụng `Active Record's validatetion`. Đây là cách tốt nhất để kiểm tra và đảm bảo rằng chỉ có dữ liệu hợp lệ mới được lưu vào cơ sở dữ liệu. Tuy nhiên có một số cách khác để xác nhận dữ liệu trước khi lưu, như việc validate dữ liệu ở `Client` trước khi gửi lên `Server`. Bài viết này mình sẽ trình bày một phương pháp để thực hiện việc này: Sử dụng gem `"jquery-validation-rails"`


-----


## II. Cài đặt:

Thêm `gem "jquery-validation-rails"` vào Gemfile, sau đó chạy `bundle install`
```ruby
##Gemfile

gem "jquery-validation-rails"
```
Và thêm vào file application.js:
```ruby
##app/assets/javascripts/application.js

//= require jquery.validate
//= require jquery.validate.additional-methods
```

-----


## III. Sử dụng:

Ví dụ về form đăng kí người dùng sử dụng jquery validation
```html
##app/views/users/new.html.erb

<%= form_for(@user) do |f| %>
    <%= f.label :username %>
    <%= f.text_field :username %>
    <%= f.label :email %>
    <%= f.text_field :email %>
    <%= f.label :password %>
    <%= f.text_field :password %>
	<%= f.label :password_confirmation %>
    <%= f.text_field :password_confirmation%>
    <%= f.label :birthdate %>
    <%= f.text_field :birthdate %>
    <%= f.label :introduction %>
    <%= f.text_field :introduction %>
<% end %>
<script type="text/javascript">
  <%= render "validate.js" %>
</script>
```
Thêm một số quy tắc đơn giản như định dạng của dữ liệu nhập vào, độ dài yêu cầu, bắt buộc nhập, ......
```js
app/views/users/_validate.js

$("#new_user").validate({
  //error place
  errorPlacement: function (error, element) {
    error.insertBefore(element);
  },
//adding rule
  rules: {
  // username is required with max of 20 and min of 6
  "user[username]":{
    required: true,
    maxlength: 20,
    minlength: 6
  },
  // email is required with format
  "user[email]": {
    required: true,
    email: true
  },
  // password is required
  "user[password]": {
    required: true
  },
  // password_confirmation is required and is the same with password
  "user[password_confirmation]": {
    required: true,
    equalTo: "#user_password"
  },
  // introduction is optional with maxlenght 500
  "user[password_confirmation]": {
    maxlength: 500
  }
  },
  // error messages
  messages: {
    username:{
      required: "Username is required.",
      maxlength: "Username must be less than 20",
      minlength: "Username must be more than 6"
    },
    mail:{
      required: "Email is required",
      email: "Please enter a valid email address"
    },
    password: {
      required: "Password is required"
    },
    password_confirmation: {
      required: "Password confirmation is required",
      equalTo: "Password and password confirmation must be same"
    }
  }
});
```
jQuery validation cung cấp rất nhiều Rules cho người dùng lựa chọn. Dưới đây là danh sách các Rules được hỗ trợ:

```js
jQuery.extend(jQuery.validator.messages, {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});
```
Chúng ta cũng có thể thêm qui tắc mới cho biểu mẫu của mình bằng cách sử dụng phương thức addMethod():
```js
app/views/users/_validate.js

$("#new_user").validate({
  //error place
  errorPlacement: function (error, element) {
    error.insertBefore(element);
  },
//adding rule
  rules: {
  ...
  // introduction is optional with maxlenght 500
  "user[password_confirmation]": {
    maxlength: 500
  },
  // birthdate is required with format yyyy-mm-dd
  "user[birthdate]": {
    valid_date: 500
  }
  },
  ...
});

$.validator.addMethod("valid_date", function (value, element) {
  return this.optional(element) || isValidDate(value);
}, "Please enter date with form yyyy-mm-dd");

function isValidDate(str) {
  date = new Date(str);
  return !(str != date.toISOString().slice(0, 10));
}
```


----- 

Tham khảo: https://stackoverflow.com/questions/2457032/jquery-validation-change-default-error-message/2457053

https://github.com/meowsus/jquery-validation-rails

https://viblo.asia/p/jquery-validation-in-rails-NPVMaxl6RQOk