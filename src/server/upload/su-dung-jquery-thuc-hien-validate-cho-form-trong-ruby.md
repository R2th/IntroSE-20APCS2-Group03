### Bắt đầu
Khi thực hiện validate cho một form, trước mình vẫn quen validate bằng Ruby. Nghĩa là mình sẽ cứ để cho người dùng nhập thông tin vào form, xong submit gửi thông tin đó lên, server sẽ sử dụng những validation mình đã định nghĩa trước để xử lý, nếu những thông tin được gửi lên không thỏa mãn được các validation kia thì sẽ trả về lỗi cho người dùng biết. Chắc cũng nhiều người đang sử dụng cách này.

Tuy nhiên, việc bắt người dùng phải nhập form, submit lên rồi chờ server xử lý, và cuối cùng có thể lại nhận lại một thông báo thông tin form bị lỗi :(. Dẫu rằng sau khi xử lý, Ruby có thể thông báo cụ thể đến người dùng rằng form kia nó đang sai ở đâu, nhưng như thể cũng mang lại cho người dùng cảm giác không mấy vui vẻ. Đặc biệt là với những form lớn có nhiều trường cần nhập, sẽ tốn nhiều thời gian hơn để người dùng có thể hoàn thành.

Rõ ràng là mỗi trường đã có những validation của riêng nó, thì nếu như ngay sau khi người dùng nhập vào trường nào, nếu dữ liệu không thỏa mãn, hệ thống sẽ trả về thông tin lỗi ngay để người dùng biết để sửa, cuối cùng khi submit thì ta đã có một form chuẩn. Đứng trên góc nhìn là người sử dụng cuối, mình sẽ thích cách xử lý thứ 2 hơn, và mình tin chắc rằng nhiều người cũng có chung quan điểm này.

Để validation kiểu này, mình sử dụng plugin [`jQuery Validation`](https://github.com/meowsus/jquery-validation-rails).

![](https://images.viblo.asia/336f2839-f277-40cb-9518-578979ce6607.png)

Bài viết này mình xin trình bày ngắn gọn cách cài đặt và sử dụng plugin `jQuery Validation` để validate cho form, hi vọng nó sẽ có ích với các bạn.

### Cài đặt.

Cài đặt thì chỉ cần làm 2 bước rất đơn giản
- Trước tiên là bạn phải cài đặt thư viện, thêm vào Gemfile dòng `gem 'jquery-validation-rails'` sau đó tiến hành bundle install.
- Khai báo để Ruby có thể load được, bằng cách thêm dòng `//= require jquery.validate` vào file `app/assets/javascripts/application.js` (chú ý là phải thêm vào ở trên dòng `//= require_tree .` nhé). `jquery.validate` là gói tiêu phương thức tiêu chuẩn thư viện cung cấp, và nó cũng có gần như là đầy đủ những gì bạn cần rồi.  
Done, bạn có thể bắt đầu sử dụng thư viện này để tiến hành validation được rồi.

**Note:** Bạn nhớ khởi động lại server nhé.

### Sử dụng.
Mình sẽ làm một demo đơn giản, giả sử form nhập tên và số lượng của sản phẩm có các trường  và validation tương ứng như sau:

- `:product`
    - Bắt buộc phải điền, không điền hiện thị message lỗi `Product required.`.
    - Số ký tự nhập vào thoả mãn là từ 2 đến 10.
- `:quantity`
    - Bắt buộc phải  điền, không điền hiện thị message lỗi `Quantity required.`.
    - Phải nhập vào một số

Mình có một form HTML như sau:

```
<form class='form-horizontal jquery-validation-form'>
  <div class='modal-body'>
    <div class='form-group'>
      <label class='control-label col-sm-2'>Product</label>
      <div class='col-sm-8'>
        <input type='text' name='product' value='' class='form-control'>
      </div>
    </div>

    <div class='form-group'>
      <label class='control-label col-sm-2'>Quantity</label>
      <div class='col-sm-8'>
        <input type='text' name='quantity' value='' class='form-control'>
      </div>
    </div>

    <div class='form-group'>
      <div class='col-sm-1 col-sm-offset-10'>
        <input type='submit' name='commit' value='Submit' class='btn btn-default bg-blue'>
      </div>
    </div>
  </div>
</form>

```

Định nghĩa JS như sau:

```javascript
$(document).ready(function(){
$('.jquery-validation-form').each(function() {
  $(this).validate({
    // Define element for validation, pass class of form
    errorClass: 'jquery-validation-error',
    
    // If invalid, show error message in below, also use insertBefore()
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },

    // Define list of rules
    rules: {
      'product': {
        required: true,
        rangelength: [2, 10]
      },
      'quantity': {
        required: true,
        number: true
      }
    },

    // Define content of message
    messages: {
      'product': {
        required: 'Product required.',
        rangelength: 'Product invalid, length range form 2 to 10.'
      },
      'quantity': {
        required: 'Quantity required.',
        number: 'Quantity Iinvalid, must be a number'
      }
    }
  });
});
```

Với class phần tử chứa message lỗi `jquery-validation-error` đã được định nghĩa trong code JS bên trên, hãy thêm chút style cho màu mè :D
```css
.jquery-validation-error {
  color: #ff0000;
  font-size: 11px;
  font-style: italic;
  font-weight: normal;
}
```

Hãy xem kết quả nhé.
![](https://images.viblo.asia/616f93f1-c8a1-4a84-b28c-dab16c5b118d.gif)

Ngoài những rule tiêu chuẩn như `required`, `number`, `rangelength`, `maxlength`, `minlength`... thì bạn có thể sử dụng thêm cả những rule mở rộng hơn như `accept`, `creditcard`.... Để sử dụng nhưng rule mở rộng này thì bạn cần khai báo thêm vào dòng `//= require jquery.validate.additional-methods` vào file `application.js`.

Bạn có thể tham khảo chi tiết thêm [List build in validation methods](https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods) ở đây, có rất nhiều method cho bạn lựa chọn để xây dựng validation cho form của mình.

Cũng giống như validation bằng Ruby, plugin `jQuery Validation` cũng cho phép chúng ta tự định nghĩa những custom validation cho riêng mình. Quay trở lại demo bên trên, thực tế trường `quantity` sẽ chỉ cho phép nhập số tự nhiên mà thôi, và ta sẽ phải tự thêm validation cho nó. `jQuery Validation` cung cấp phương thức `addMethod()` cho ta thực hiện việc này. Định nghĩa thêm methods `valid_quantity` để sử dụng, hửa lại code file JS một chút như sau:

```javascript
$('.jquery-validation-form').each(function() {
  $(this).validate({
    // code here
    rules: {
      // code here
      'quantity': {
        required: true,
        valid_quantity: 500
      }
    },

    // Define content of message
    messages: {
      'quantity': {
        required: 'Quantity required.',
        valid_quantity: 'Invalid quantity, please fill an integer'
      }
    }
  });
});

// Require integer for quantity
$.validator.addMethod('valid_quantity', function(value, element) {
  return this.optional(element) || /^\d+$/.test(value);
};
```

Kết quả như sau:
![](https://images.viblo.asia/aaca12f9-31fe-43f5-9e01-7b38e6677b3d.gif)

### Tổng kết.

Như vậy plugin `jQuery Validation` ngoài việc thay thế hoàn toàn được việc validation bằng Ruby thì nó còn giúp cải thiện đáng kể trải nghiệm của người dùng cho hệ thống của bản. Bên cạnh đó thì bạn có thể sử dụng nó rất linh hoạt, hay cũng có thể sử dụng chung cho nhiều form với nhau. 

***

### Tham khảo.

- https://github.com/meowsus/jquery-validation-rails
- http://codkal.com/add-jquery-validation-rails-5-forms-without-gem
- https://jqueryvalidation.org/documentation

***

Cám ơn bạn đã theo dõi bài viết, rất hi vọng nó sẽ có ích cho bạn!