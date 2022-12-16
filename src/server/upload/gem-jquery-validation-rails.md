## Giới thiệu:
Như đã biết việc validate dữ liệu ở Client trước khi gửi lên Server rất quan trọng nó đảm bảo được tính hợp lệ và an toàn cho dữ liệu, ở bài viết này mình xin giới thiệu gem "jquery-validation-rails" là một Plugin jQuery bao gồm nhiều tùy chọn giúp việc validate dữ liệu dễ dàng hơn.
## Thử Demo 
Giờ ta hãy tạo 1 app demo<br>
```
rails new demo_validate_jquery -d mysql
rails g scaffold user name:string birthday:date email:string: password:string password_confirmation:string
```

thêm vào Gemffile:
```
gem "jquery-rails"
gem 'jquery-validation-rails'
```

Thêm vào application.js
```
//= require jquery
//= require jquery.validate
//= require jquery.validate.localization/messages_vi  //thêm line này để message thông báo là tiếng Việt còn k mặc định sẽ là English
```

Nếu bạn cần thêm các additional methols như: `accept`, `creditcard`, `extension`, `phoneUS,` `or require_from_group ` thì thêm"
```
//= require jquery.validate.additional-methods
```

Bước tiếp theo ta sửa form  `users/new` một chút như thế này:
```
<%= form_for user do |form| %>
  <div class="field">
    <%= form.label :name %>
    <%= form.text_field :name %>
    <p class="text-error"></p>
  </div>

  <div class="field">
    <%= form.label :birthday %>
    <%= form.text_field :birthday %>
    <p class="text-error"></p>
  </div>

  <div class="field">
    <%= form.label :email %>
    <%= form.text_field :email %>
    <p class="text-error"></p>
  </div>

  <div class="field">
    <%= form.label :password %>
    <%= form.text_field :password, type: "password" %>
    <p class="text-error"></p>
  </div>

  <div class="field">
    <%= form.label :password_confirmation %>
    <%= form.text_field :password_confirmation, type: "password" %>
    <p class="text-error"></p>
  </div>

  <div class="actions">
    <%= form.submit %>
  </div>
<% end %>
```

Thêm css cho những field invalid
```
  .field-error {
    border: 1px solid red;
  }

  .text-error {
    color: red;
  }
```
<br>
**Giờ ta sẽ validate cho form trên: **jquery validate đã cung cấp một số phương thức tiêu chuẩn các bạn có thể tham khảo thêm ở đây [Documentation](https://jqueryvalidation.org/documentation/). Dưới đây mình sẽ ví dụ một vài phương thức hay dùng để validate:

```
$("form#new_user").validate({
  rules: {
    "user[name]": {
      required: true,               // filed này là bắt buộc
      maxlength: 255                // độ dài tối đa của text là 255 ký tự
    }, 
    "user[birthday]": {
      required: true
    },
    "user[email]": {
      required: true,
      email: true,                  //phải nhập vào field là email
      maxlength: 255
    },
    "user[password]": {
      required: true,
      minlength: 6,                 //độ dài tối thiểu của text là 6 ký tự
      maxlength: 12
    },
    "user[password_confirmation]": {
      required: true,
      minlength: 6,
      maxlength: 12
    }
  }, 
  
  //jquery validate sẽ cung cấp cho ta những message mặc định
  //nhưng với option *messages* ta có thể customize lại những message phù hợp hơn
  
  messages: {
    "user[name]": {
      required: "This field is required.",
      maxlength: "Please enter no more than 255 characters."
    },
    "user[birthday]": {
      required: "This field is required."
    },
    "user[email]": {
      required: "This field is required.",
      email: "Please enter a valid email address.",
      maxlength: "Please enter no more than 255 characters."
    },
    "user[password]": {
      required: "This field is required.",
      minlength: "Please enter at least 6 characters.",
      maxlength: "Please enter no more than 12 characters."
    },
    "user[password_confirmation]": {
      required: "This field is required.",
      minlength: "Please enter at least 6 characters.",
      maxlength: "Please enter no more than 12 characters."
    },
  },
  
  //với option *highlight* bắt trường hợp invalid ta có kèm theo chút css để làm nổi bật field lỗi
  
  highlight: function(element) {
    $(element).addClass("field-error");
  },
  
  //với option *unhighlight* thì ngược lại với *highlight*
  
  unhighlight: function(element) {
    $(element).removeClass("field-error");
  },
  
  //với option **onkeyup** bắt keyup khi nhâp dữ liệu ta có thể kiểm tra việc validate của dữ liệu tương ứng với element
  
  onkeyup: function(element) {
    $(element).valid();
  },
  
 // với option **errorPlacement** bắt trường hợp invalid cho phép show message error ở vị trí ta muốn.
 
  errorPlacement: function(error, element) {
    if($(error).is(":empty")) return
    $(element).parent().find(".text-error").html(error)
  }
  
  //option **submitHandler** này cũng hay được dùng sau khi nhập tất cả dữ liệu hợp lệ thì ta bắt sự kiện submit.
  // ở đây thường dùng là sau khi submit ta sẽ do something ... hoặc thay vì submit bằng button submit ta có thể viết ajax ở đây.
  
  submitHandler: function(form, event) {
    event.preventDefault();
    $.ajax({
       //do something
    })
  })
})
```

![](https://images.viblo.asia/be8e6819-13f2-4455-b3b1-30b2148003f2.png)
<br>
Mở rộng hơn với jquery validate này bạn cũng có thể tự tạo một qui tắc, chuẩn mới cho dữ liệu.
```
// validate cho email
$.validator.addMethod("regexTrimEmail", function(value, element, regex) {
  return regex.test($.trim(value));
}, "Email invalid");

// REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+\-\/=?^_`{|}~]+@[a-zA-Z0-9.\-]+\.[a-zA-Z0-9.\-]+$/

"user[email]": {
   ...
    regexTrimEmail: REGEX_EMAIL,
   ...
},

// format date
// REGEX_DATE_MONTH_YEAR_FORMAT = /^\d{4}[/]\d{1,2}[/]\d{1,2}$/

$.validator.addMethod("dateFormat", function(value, element) {
  REGEX_DATE_MONTH_YEAR_FORMAT.test(value)
}, "Date invalid");

"user[date]": {
   ...
    dateFormat: true,
   ...
},
```

Ngoài ra thay vì tất cả ta phải thay báo rules của tất cả các filed cùng với form thì ta cũng có thể thêm hoặc xóa rules theo element ta muốn.
```
$("#myinput").rules( "add", {
  minlength: 6
});
```
```
$("#myinput").rules("add", {
  required: true,
  minlength: 6,
  maxlength: 20,
  messages: {
    required: "Required input",
    minlength: "",
    minlength: "Please enter at least 6 characters.",
    maxlength: "Please enter no more than 20 characters."
  }
});
```
Hoặc remove tất cả các qui tắc của element:
```
$("#myinput").rules("remove");
```
hoặc chỉ remove một vài qui tắc mà ta muốn.
```
$("#myinput").rules("remove", "min max");
```


## Nguồn
Gem "jquery-validation-rails" giúp cho việc validate giữ liệu chúng ta dễ dàng hơn nhiều, trên là bài giới thiệu cơ bản về gem này hi vọng sẽ giúp bạn làm quen với nó nhanh chóng. Để biết thêm về gem "jquery-validation-rails" các bạn có thể tham khảo thêm tài liệu:
https://github.com/meowsus/jquery-validation-rails<br>
https://jqueryvalidation.org/documentation/