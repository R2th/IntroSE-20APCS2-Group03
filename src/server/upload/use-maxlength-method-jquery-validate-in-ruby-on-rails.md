- Khi làm việc với ruby on rails ngoài việc validate ở model, database thì validate trên view cũng rất cần thiết. Để có thể validate trên view thì chúng ta có thể sử dụng jquery validate.
- Trong ruby chúng ta có thể sử dụng gem jquery-validation-rails, có thể xem thêm [tại đây](https://github.com/meowsus/jquery-validation-rails) để biết cách cài đặt nhé.
Jquery validate có rất nhiều method hữu dụng để validate trên view. Các bạn xem chi tiết tại [đây](https://jqueryvalidation.org). Trong bài viết này chúng ta chỉ nói về method maxlength.
- Tạo model với validate như sau:
```
class Category < ApplicationRecord
  validates :name, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 50 }
end
```
- Tạo file js xử lý validate:
```
  $("#new_category").validate({
    debug: true,
    rules: {
    "category[name]": {maxlength: 50},
    "category[description]": {maxlength: 50}
    },
    messages: {},
    onfocusout: function(element) {
      this.element(element);
    },
    submitHandler: function(form) {
      form.submit();
    }
  });

  $.extend($.validator.messages, {
    maxlength: jQuery.validator.format("more than 50 characters")
  });
```
- Khi chúng ta sử dụng maxlength mặc định của jquery validate, Khi nhập đủ 50 ký tự trong input thì jquery validate đang hiểu là sẽ cộng các ký tự user nhập và tính tổng vì vậy validate trên view đã passed. Tuy nhiên khi save vào db thì giá trị của field vừa nhập có chứa cả ký tự \r\n (đây là ký tự xuống dòng trên window), vì vậy khi save vào db sẽ bị failed validate vì trong model chúng ta đang validate 50 ký tự ( view 50 ký tự + ký tự \r\n).
```
Processing by Admin::CategoriesController#create as HTML
  Parameters: {"utf8"=>"✓", "authenticity_token"=>"pWQxT7zCO1vP2lc132XrZKapiuPJSvyUdyskLIDmqAxSQGPio4+akY481VCVA5awQQETJ1ukpriRSOMyPUvBTA==", "category"=>{"parent_id"=>"", "name"=>"chuc", "description"=>"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing \r\n\r\nindustries for previewing layouts and visual mockups."}, "commit"=>"Create", "locale"=>"en"}

```
- Để giải quyết được vấn để trên thì cần định nghĩa lại maxlength nhé.
```
$.validator.addMethod("maxlength", function (value, element, length) {
     value.replace(/[\r\n]+/gm, "").length <= length;
});
```

- Hy vọng với bài chia sẻ này có thể giúp mọi người tránh được lỗi trên khi sử dụng maxlength method trong jquery validate.
- Happy coding!