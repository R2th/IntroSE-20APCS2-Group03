Để đảm bảo dữ liệu trong form đúng định dạng và đúng với những yêu cầu đặt ra, chúng ta cần phải validation form. Trong đó, để kiểm tra dữ liệu người dùng nhập vào, chúng ta có thể sử dụng **Jquery Validation** để kiểm tra trước khi submit form gửi dữ liệu lên server, giúp giảm công việc cho server side.

## 1. Tổng quan
### 1.1 Giới thiệu
Jquery Validation giúp cho công việc của bạn trở nên dễ dàng hơn. Plugin này cung cấp các phương thức kiểm tra định dạng của URL, email, số,... Ngoài ra bạn cũng có thể sử dụng các validation method được cung cấp sẵn hoặc xây dựng các customized method.

Plugin này cung cấp 3 method chính:
- validate() – Thực hiện validate cho form được chọn.
- valid() – Kiểm tra xem các input trong form có hợp lệ hay không
- rules() – Đọc, thêm hoặc bớt các quy tắc xác định cho các input

Các custom method cho selector:
- :blank – Chọn tất cả các thành phần có giá trị là rỗng
- :filled – Chọn tất cả các thành phần không rỗng
- :unchecked – Chọn tất cả các thành phần unchecked

Các method được xây dựng sẵn:


| Rule | Ý nghĩa | 
| -------- | -------- | 
| required     | Bắt buộc đối với trường này     |
| minlength     | Độ dài nhỏ nhất     |
| maxlength     | Độ dài lớn nhất cho phép     |
| email     | Trường này phải là một email     |
| url     |  Trường này phải là một url     |
| date     | Trường này phải là định dạng ngày    |
| digits     | Trường này là một số nguyên dương hoặc bằng 0      |
| equalTo     | Trường này bằng với giá trị một trường khác      |
| max     | Giá trị lớn nhất cho phép     |
| min     | Giá trị nhỏ nhất cho phép     |

Ví dụ ta có một đoạn code html như sau:

```
<form method="get" id="formDemo" action="">
		<p>
			<label>Name</label>
			<input id="name" name="name" type="text" />
		</p>
		<p>
			<label>Email</label>
			<input id="email" type="email" name="email" />
		</p>
		<p>
			<label>Phone Number</label>
			<input id="phone" type="phone" name="phone" />
		</p>
		<p>
		<input type="submit" value="Submit"/>
		</p>
	    </form>
```
 Trước tiên ta cần import thư viện Jquery và Jquery Validation vào bằng cách nhúng đoạn code này vào phần head của file html:
```
 <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/jquery.validate.min.js"></script>
```
Ta thực hiện validate cho form trong file js như sau:

```
$(document).ready(function(){
    $('#formDemo').validate({
        rules: {
            'name': {
            required: true,
            minlength: 6,
            maxlength: 50
          },
          'email': {
            required: true,
            maxlength: 255
          },
          'phone': {
              required: true,
              digits: true
          }
        },
        messages: {
            'name': {
            required: "Name can't be blank",
            minlength: "Name must be more than or equal 6 letters",
            maxlength: "Name must be less than or equal 50 letters",
          },
          'email': {
            email: "Email can't be blank",
            maxlength: "Email must be less than or equal 255 letters",
          },
          'phone': {
              required: "Phone can't be blank",
              digits: "Please type number only"
          }
        }
    })
});
```

### 1.2. Customize method

Nếu như chức năng bạn cần không có trong các method được dựng sẵn, bạn hoàn toàn có thể bổ sung các phương thức theo ý muốn của mình.
Ví dụ ta có rule cho email như sau:
```
email: {
    required: true,
    maxlength: 255,
    email: true
}
```

Giả sử bạn muốn kiểm tra email theo regex (regular expression) thì có thể thực hiện như sau:
Thêm rule valid_email vào email:

```
email: {
    required: true,
    maxlength: 255,
    email: true,
    valid_email: true
}
```

Define method valid_email:

```
jQuery.validator.addMethod('valid_email', function (value) {
    var regex = /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{1,5}$/;
    return value.trim().match(regex);
  });
```

### Add rules

Ngoài việc khai báo rules cùng với form, bạn cũng có thể tách riêng rule theo input

```
<div>
    <label>Name</label>
    <input id="name" type="text" name= "name" />
</div>

--------
$('#name').rules('add', {
    required: true,
    maxlength: 255,
    messages: {
        required: "Name can't be blank",
        maxlength: "Name is too long"
    }
})
```

Tương tự ta cũng có thể xóa bớt rules theo ý muốn:
```
d('#name').rules('remove', 'required');
```

Hi vọng bài viết này sẽ giúp ích cho các bạn
Đây là bài viết đầu tiên của mình. Mong sẽ được các bạn góp ý để hoàn thiện hơn trong những bài tiếp theo. Mình xin cảm ơn