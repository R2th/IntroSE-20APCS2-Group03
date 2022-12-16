Mình rất vui vì được gặp lại các bạn trong tập ngày hôm nay. Ở tập trước chúng ta đã cùng nhau tìm hiểu khá nhiều về "Validation Laravel" rồi, nhưng hôm nay chúng ta vẫn sẽ tiếp tục nó, vì trong Laravel Docs, phần "Validation" khá là dài. Phần này quan trọng, vì thế các bạn không được bỏ qua đâu đấy.

# VI. Các rule validation có sẵn (Available validation rules)
Bên dưới là danh sách tất cả các validation rule có sẵn mà Laravel cung cấp.

## 1. Accepted

### a. Công dụng
Trường được xác thực phải có giá trị là `"yes"`, `"on"`, `1` hoặc `true`. Hữu dụng khi tạo checkbox "Ghi nhớ đăng nhập" hoặc "Đồng ý điều khoản và dịch vụ"...

### b. Cách sử dụng
**Cú pháp:** `accepted`

**HTML**: 

```HTML
<input type="checkbox" name="remember_me">
```

**Validation rule**:
```PHP
'remember_me' => 'accepted'
```

**Thông báo mặc định**:

```PHP:resources/lang/en/validation.php
'accepted' => 'The :attribute must be accepted.'
```

## 2. Active URL
### a. Công dụng
Trường được xác thực phải có bản ghi A hoặc AAAA hợp lệ theo `dns_get_record` của PHP. Cái này theo mình biết thường dùng để kiểm tra tên miền đã được đăng ký hay chưa, các bạn có thể Google để tìm hiểu thêm. Thường áp dụng cho mấy website thuê tên miền, hosting...

### b. Cách sử dụng
**Cú pháp:** `active_url`

**HTML:**

```HTML
<input type="text" name="url">
```

**Validation rule:**
```PHP
'url' => 'active_url'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'active_url' => 'The :attribute is not a valid URL.'
```

## 3.  Date
### a. Công dụng
Trường được xác thực phải có giá trị là một date hợp lệ, không liên quan theo hàm `strtotime` của PHP.

### b. Cách sử dụng
**Cú pháp:** `date`

**HTML:**

```HTML
<input type="text" name="date_string">
```

**Validation rule:**
```PHP
'date_string' => 'date'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'date' => 'The :attribute is not a valid date.'
```

## 4. Date format
### a. Công dụng
Trường được xác thực phải phù hợp với định dạng date đã cho. Bạn chỉ nên sử dụng một trong hai rule `date` hoặc `date_format` để xác định một trường, không phải cả hai.

### b. Cách sử dụng
**Cú pháp:** `date_format:format`

**HTML:**

```HTML
<input type="text" name="date_string">
```

**Validation rule:**
```PHP
'date_string' => 'date_format:"d/m/Y"'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'date' => 'The :attribute is not a valid date.'
```

## 5. After (Date)
### a. Công dụng
Trường được xác thực phải có giá trị là date sau date đã cho. Date sẽ được chuyển vào `strtotime` của PHP.

### b. Cách sử dụng
**Cú pháp:** `after:date`

**HTML:**

```HTML
<input type="text" name="date_string">
```

**Validation rule:**

Date format mặc định của Laravel là `Y-m-d H:i:s`. Trước tiên sử dụng rule `after:date` này, bạn có thể khai báo rule `date_format` để định dạng lại date trong validation sao cho theo ý muốn. 

Bạn có thể sử dụng các từ khóa thời gian như `now`, `tomorrow`... 

> **Lưu ý:** Nếu sử dụng các từ khóa thời gian này, framework sẽ tự động so sánh cả giờ, phút,  giây.

```PHP
'date_string' => 'date_format:"d/m/Y"|after:tomorrow'
```

hoặc một giá trị date cụ thể
 
```PHP
'date_string' => 'date_format:"d/m/Y"|after:"10/06/2001"'
```

Ngoài ra, bạn cũng có thể sử dụng giá trị của một input khác.

```PHP
'date_string' => 'date_format:"d/m/Y"|after:date_other'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'after' => 'The :attribute must be a date after :date.'
```

# 6. After or equal (Date)
### a. Công dụng
Trường được xác thực phải có giá trị là date sau hoặc bằng date đã cho. 

### b. Cách sử dụng
**Cú pháp:** `after_or_equal:date`

**HTML:**

```HTML
<input type="text" name="date_string">
```

**Validation rule:**

Hoàn toàn giống với rule `after`.

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'after_or_equal' => 'The :attribute must be a date after or equal to :date.'
```

# 7. Alpha
### a. Công dụng
Trường được xác thực chỉ được chứa chữ cái.

### b. Cách sử dụng
**Cú pháp:** `alpha`

**HTML:**

```HTML
<input type="text" name="title">
```

**Validation rule:**

```PHP
'title' => 'alpha'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'alpha' => 'The :attribute may only contain letters.'
```

# 8. Alpha dash
### a. Công dụng
Trường được xác thực chỉ được chứa chữ cái và số, cũng như dấu `-` và `_`.

### b. Cách sử dụng
**Cú pháp:** `alpha_dash`

**HTML:**

```HTML
<input type="text" name="title">
```

**Validation rule:**

```PHP
'title' => 'alpha_dash'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'alpha_dash' => 'The :attribute may only contain letters, numbers, dashes and underscores.'
```

# 9. Alpha numeric
### a. Công dụng
Trường được xác thực chỉ được chứa chữ cái và số.

### b. Cách sử dụng
**Cú pháp:** `alpha_num`

**HTML:**

```HTML
<input type="text" name="title">
```

**Validation rule:**

```PHP
'title' => 'alpha_num'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'alpha_num' => 'The :attribute may only contain letters and numbers.'
```

# 10. Array
### a. Công dụng
Trường được xác thực phải có định dạng mảng PHP.

### b. Cách sử dụng
**Cú pháp:** `array`

**Validation rule:**

```PHP
'data' => 'array'
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'array' => 'The :attribute must be an array.'
```

# 11. Bail
### a. Công dụng
Dừng validation rule input nếu thất bại tại rule trước đó.

### b. Cách sử dụng
**Cú pháp:** `bail`

**Validation rule:**

```PHP
'input' => 'bail|some_rules'
```

# 12. Before (Date)
### a. Công dụng
Trường được xác thực phải có giá trị là date trước date đã cho. 

### b. Cách sử dụng
**Cú pháp:** `before:date`

**HTML:**

```HTML
<input type="text" name="date_string">
```

**Validation rule:**

Hoàn toàn giống với rule `after`.

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'before' => 'The :attribute must be a date before :date.'
```

# 13. Before or equal (Date)
### a. Công dụng
Trường được xác thực phải có giá trị là date trước hoặc bằng date đã cho. 

### b. Cách sử dụng
**Cú pháp:** `before_or_equal:date`

**HTML:**

```HTML
<input type="text" name="date_string">
```

**Validation rule:**

Hoàn toàn giống với rule `after`.

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'before_or_equal' => 'The :attribute must be a date before or equal to :date.'
```

# 14. Between 
### a. Công dụng
Trường được xác thực phải có kích thước nằm ở giữa hai giá trị min và max đã cho.
* Chuỗi: dựa trên độ dài
* Số: dựa trên độ lớn
* Mảng: dựa trên phần tử
* File: dựa trên kích thước (tính theo đơn vị KB)

### b. Cách sử dụng
**Cú pháp:** `between:min,max`

**Validation rule:**

Với chuỗi:
```PHP
'string' => 'between:5,10'
```

Với số cần lưu ý một chút, ta cần phải thêm rule `number` để xác thực là số trước khi rule `between` được kiểm tra.
```PHP
'number' => 'numeric|between:5,10'
```

```PHP
// Phần tử của mảng từ 2-5 phần tử
'array' => 'between:2,5' 
```

```PHP
// Kích thước của file từ 200-1000 KB
'file' => 'between:200,1000' 
```

**Thông báo mặc định:**
```PHP:resources/lang/en/validation.php
'between' => [
    'numeric' => 'The :attribute must be between :min and :max.',
    'file' => 'The :attribute must be between :min and :max kilobytes.',
    'string' => 'The :attribute must be between :min and :max characters.',
    'array' => 'The :attribute must have between :min and :max items.',
]
```

# 15. Boolean
### a. Công dụng
Trường được xác định phải ở dạng boolean, có thể chấp nhận `true`, `false`, `1`, `0`, `"1"` và `"0"`.

### b. Cách sử dụng
**Cú pháp:** `boolean`

**HTML:**

```HTML
<input type="radio" value="1" name="answer">
<input type="radio" value="0" name="answer">
```

**Validation rule**:

```PHP
'answer' => 'boolean'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'boolean' => 'The :attribute field must be true or false.'
```

# 16. Confirmed
### a. Công dụng
Trường `foo` được xác thực phải khớp với trường `foo_confirmation`. Chẳng hạn bạn muốn xác thực trường `password` với rule `confirmed`, trường `password_confirmation` phù hợp (khớp với trường `password`) phải có mặt trong request.

### b. Cách sử dụng
**Cú pháp:** `confirmed`

**HTML:**

```HTML
<input type="text" name="password">
<input type="text" name="password_confirmation">
```

> **Lưu ý:** Tuân thủ cú pháp đặt tên cho input.

**Validation rule**:

```PHP
'password' => 'confirmed'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'confirmed' => 'The :attribute confirmation does not match.'
```

# 17. Date equals
### a. Công dụng
Trường được xác thực phải có date bằng date đã cho. Date được chuyển vào hàm `strtotime` của PHP.

### b. Cách sử dụng
**Cú pháp:** `date_equals:date`

**HTML:**

```HTML
<input type="text" name="date_string">
```

**Validation rule:**

Hoàn toàn giống với rule `after`.

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'date_equals' => 'The :attribute must be a date equal to :date.'
```

# 18. Different
### a. Công dụng
Trường được xác thực phải có giá trị khác với trường đã cho.

### b. Cách sử dụng
**Cú pháp:** `different:field`

**HTML:**

```HTML
<input type="text" name="input1">
<input type="text" name="input2">
```

**Validation rule:**

```PHP
'input1' => 'different:input2'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'different' => 'The :attribute and :other must be different.'
```

# 19. Digits
### a. Công dụng
Trường được xác thực phải là số và có độ dài bẳng độ dài đã cho.

### b. Cách sử dụng
**Cú pháp:** `digits:length`

**HTML:**

```HTML
<input type="text" name="numeric">
```

**Validation rule:**

```PHP
'numeric' => 'digits:3'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'digits' => 'The :attribute must be :digits digits.'
```

# 20. Digits between
### a. Công dụng
Trường được xác thực phải là số và có độ dài nằm trong khoảng min, max đã cho.

### b. Cách sử dụng
**Cú pháp:** `digits_between:min,max`

**HTML:**

```HTML
<input type="text" name="numeric">
```

**Validation rule:**

```PHP
'numeric' => 'digits_between:3,9'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'digits_between' => 'The :attribute must be between :min and :max digits.'
```

# 21. Dimensions
### a. Công dụng
Trường được xác thực phải là một ảnh và đáp ứng các ràng buộc về kích thước được chỉ định bởi các tham số của rule.

### b. Cách sử dụng
**Cú pháp:** `dimensions:param_1,param_2,..param_n`

**HTML:**

```HTML
<input type="file" name="image">
```

**Validation rule:**
Có tất cả 7 loại tham số:
* `min_width`
* `min_height`
* `max_width`
* `max_height`
* `ratio`: giá trị tỉ lệ = chiều rộng / chiều cao hoặc bằng số float nào đó
* `width`
* `height`

> Ngoài `ratio`, các tham số còn lại tính bằng đơn vị pixel.

```PHP
'image' => 'dimensions:width=300,height=300'
```

Bạn có thể sử dụng `Rule::dimensions` để dễ dàng truyền các biến trong việc khai báo validation rule.

```PHP
use Illuminate\Validation\Rule;

'image' => [
    'other_rule', 
    Rule::dimensions()->width(300)->height(300)
]
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'dimensions' => 'The :attribute has invalid image dimensions.'
```

# 22. Distinct
### a. Công dụng
Khi làm việc với array, trường được xác thực không được có gí trị trùng lặp nào.

### b. Cách sử dụng
**Cú pháp:** `distinct`

**Validation rule:**
```PHP
'users.*.id' => 'distinct'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'distinct' => 'The :attribute field has a duplicate value.'
```

# 23. Email
### a. Công dụng
Trường được xác thực phải là một địa chỉ email. Trong giới hạn, rule này sử dụng gói [egulias/email-vaidator](https://github.com/egulias/EmailValidator) để validate email. Trong đó có các validator như:
* `rfc`: `RFCValidator`
* `strict`: `NoRFCWarningsValidation`
* `spoof`: `SpoofCheckValidation`
* `dns`: `DNSCheckValidation`
* `filter`: `FilterEmailValidation`

Mặc định Laravel sử dụng validator `rfc` để validate. Với validator `filter`, nó sử dụng method `filter_var` để validate.

### b. Cách sử dụng
**Cú pháp:** `email:validator`

**HTML:**

```HTML
<input type="text" name="email">
```

**Validation rule:**
```PHP
'email' => 'email:rfc,dns'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'email' => 'The :attribute must be a valid email address.'
```

# 24. Ends with
### a. Công dụng
Trường được xác thực phải kết thúc bằng một trong các giá trị đã cho.

### b. Cách sử dụng
**Cú pháp:** `ends_with:value_1,value_2,...value_n`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**
```PHP
'text' => 'ends_with:foo,bar'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'ends_with' => 'The :attribute must end with one of the following: :values'
```

# 25. Exists (Database)
### a. Công dụng
Trường được xác thực phải chứa giá trị tồn tại trong cột của database table. Thường dùng để kiểm tra xem ID có tồn tại trước khi thực hiện sửa hoặc xóa...

### b. Cách sử dụng
**Cú pháp:**  `exists:table,column`

**HTML:**

```HTML
<input type="text" name="id">
```

**Validation rule:**

Nếu `column` không được chỉ định thì sẽ tự động lấy tên của trường đển gán cho `column`.
```PHP
'id' => 'exists:users'
```

Trường hợp khai báo `column`:
```PHP
'id' => 'exists:users,id'
```

Nếu ứng dụng của bạn sử dụng nhiều database connection, có thể sử dụng ký hiệu `.` để tham chiếu theo ý muốn.

```PHP
'id' => 'exists:mysql.users,id'
```

Mặc định thì rule này sẽ sử dụng câu truy vấn:

```SQL
select count(*) as aggregate from `connect.table` where `column` = value
```

Nếu bạn muốn thay đổi thiết lập này, bạn có thể sử dụng method `Rule::exists`:

```PHP
use Illuminate\Validation\Rule;

'id' => [
    'other_rule',
    Rule::exists('users')->where(function ($query) {
        return $query->where('id', request('id'));
    })
]
```

Ta có thể sử dụng global helper `request` để lấy dữ liệu từ input `id`.

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'exists' => 'The selected :attribute is invalid.'
```

# 26. File
### a. Công dụng
Trường được xác thực phải là tệp đã upload thành công.

### b. Cách sử dụng 
**Cú pháp:** `file`

**HTML:**

```HTML
<input type="file" name="image">
```

**Validation rule:**

```PHP
'image' => 'file'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'file' => 'The :attribute must be a file.'
```

# 27. Greater than
### a. Công dụng
Trường được xác thực phải lớn hơn trường đã cho. Hai trường phải cùng loại dữ liệu, bao gồm: chuỗi, số, mảng và file. Về quy ước so sánh tương tự như rule `between`.

### b. Cách sử dụng 
**Cú pháp:** `gt:field`

**HTML:**

```HTML
<input type="text" name="text_1">
<input type="text" name="text_2">
```

**Validation rule:**

```PHP
'text_1' => 'gt:text_2'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'gt' => [
    'numeric' => 'The :attribute must be greater than :value.',
    'file' => 'The :attribute must be greater than :value kilobytes.',
    'string' => 'The :attribute must be greater than :value characters.',
    'array' => 'The :attribute must have more than :value items.',
]
```

# 28. Greater than or equal
### a. Công dụng
Trường được xác thực phải lớn hơn hoặc bằng trường đã cho. Hai trường phải cùng loại dữ liệu, bao gồm: chuỗi, số, mảng và file. Về quy ước so sánh tương tự như rule `between`.

### b. Cách sử dụng 
**Cú pháp:** `gt:field`

**HTML:**

```HTML
<input type="text" name="text_1">
<input type="text" name="text_2">
```

**Validation rule:**

```PHP
'text_1' => 'gte:text_2'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'gte' => [
    'numeric' => 'The :attribute must be greater than or equal :value.',
    'file' => 'The :attribute must be greater than or equal :value kilobytes.',
    'string' => 'The :attribute must be greater than or equal :value characters.',
    'array' => 'The :attribute must have :value items or more.',
]
```

# 29. Image
### a. Công dụng
Trường được xác thực phải là tệp ảnh, bao gồm các định dạng: jpeg, png, bmp, gif, svg, hoặc webp.

### b. Cách sử dụng 
**Cú pháp:** `image`

**HTML:**

```HTML
<input type="file" name="avatar">
```

**Validation rule:**

```PHP
'avatar' => 'image'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'image' => 'The :attribute must be an image.'
```

# 30. In
### a. Công dụng
Trường được xác thực phải là một phần tử nằm trong mảng đã cho.

### b. Cách sử dụng 
**Cú pháp:** `in:item_1,item_2,...item_n`

**HTML:**

```HTML
<input type="file" name="item">
```

**Validation rule:**

Mặc định:
```PHP
'item' => 'in:' . implode(',', [1, 2, 3, 4, 5])
```

Đôi khi sử dụng valiation rule còn khá nhiều hạn chế. Chính vì vậy, ta có thể sử dụng method `Rule::in` để linh hoạt hơn.

```PHP
use Illuminate\Validation\Rule;

'item' => [
    'other_rule',
    Rule::in([1, 2, 3, 4, 5])
];
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'in' => 'The selected :attribute is invalid.',
```

# 31. In array
### a. Công dụng
Trường được xác thực phải có giá trị thuộc các key của mảng. Thường để kiểm tra một giá trị có tồn tại trong multi-level array hay không.

### b. Cách sử dụng 
**Cú pháp:** `in_array:array.*`

**Dữ liệu:**

```PHP
$request->merge([
    'users' => [
        'id' => 1,
        'username' => 'lechihuy'
    ]
]);
```

hoặc

```PHP
$request->merge([
    'users' => [
        [
            'id' => 1,
            'username' => 'lechihuy'
        ],

        [
             'id' => 2,
             'username' => 'huydeo'
        ]
    ]
]);
```

**Validation rule:**

```PHP
'id' => 'in_array:users.*'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'in_array' => 'The :attribute field does not exist in :other.'
```

# 32. Integer
### a. Công dụng
Trường được xác thực phải là một số nguyên.

> **Chú ý:** Kiểu dữ liệu có thể là chuỗi hoặc số, miễn có giá trị là số nguyên.

### b. Cách sử dụng 
**Cú pháp:** `integer`

**HTML:**

```HTML
<input type="text" name="number">
```

**Validation rule:**

```PHP
'number' => 'integer'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'integer' => 'The :attribute must be an integer.'
```

# 33. IP address
### a. Công dụng
Trường được xác thực phải một địa chỉ IP. Bao gồm các loại:
* `ip`: Địa chỉ IP
* `ipv4`: Địa chỉ IPv4
* `ipv6`: Địa chỉ IPv6

### b. Cách sử dụng 
**Cú pháp:** 
* `ip`: Địa chỉ IP
* `ipv4`: Địa chỉ IPv4
* `ipv6`: Địa chỉ IPv6

**HTML:**

```HTML
<input type="text" name="ip">
```

**Validation rule:**

```PHP
'ip' => 'ip'
```
```PHP
'ip' => 'ipv4'
```
```PHP
'ip' => 'ipv6'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'ip' => 'The :attribute must be a valid IP address.',
'ipv4' => 'The :attribute must be a valid IPv4 address.',
'ipv6' => 'The :attribute must be a valid IPv6 address.'
```

# 33. IP address
### a. Công dụng
Trường được xác thực phải là một chuỗi JSON hợp lệ.

### b. Cách sử dụng 
**Cú pháp:** `json`

**HTML:**

```HTML
<input type="text" name="string_json">
```

**Validation rule:**

```PHP
'string_json' => 'json'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'json' => 'The :attribute must be a valid JSON string.'
```

# 34. Less than
### a. Công dụng
Trường được xác thực phải nhỏ hơn trường đã cho. Hai trường phải cùng loại dữ liệu, bao gồm: chuỗi, số, mảng và file. Về quy ước so sánh tương tự như rule `between`.

### b. Cách sử dụng 
**Cú pháp:** `lt:field`

**HTML:**

```HTML
<input type="text" name="text_1">
<input type="text" name="text_2">
```

**Validation rule:**

```PHP
'text_1' => 'lt:text_2'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'lt' => [
    'numeric' => 'The :attribute must be less than :value.',
    'file' => 'The :attribute must be less than :value kilobytes.',
    'string' => 'The :attribute must be less than :value characters.',
    'array' => 'The :attribute must have less than :value items.',
]
```

# 35. Less than or equal
### a. Công dụng
Trường được xác thực phải nhỏ hơn hoặc bằng trường đã cho. Hai trường phải cùng loại dữ liệu, bao gồm: chuỗi, số, mảng và file. Về quy ước so sánh tương tự như rule `between`.

### b. Cách sử dụng 
**Cú pháp:** `lte:field`

**HTML:**

```HTML
<input type="text" name="text_1">
<input type="text" name="text_2">
```

**Validation rule:**

```PHP
'text_1' => 'lte:text_2'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'lte' => [
    'numeric' => 'The :attribute must be less than or equal :value.',
    'file' => 'The :attribute must be less than or equal :value kilobytes.',
    'string' => 'The :attribute must be less than or equal :value characters.',
    'array' => 'The :attribute must not have more than :value items.',
],
```

# 36. Max
### a. Công dụng
Trường được xác thực phải nhỏ hơn hoặc bằng giá trị lớn nhất cho trước, bao gồm: chuỗi, số, mảng và file. Về quy ước so sánh tương tự như rule `between`.

### b. Cách sử dụng 
**Cú pháp:** `max:value`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'max:10'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'max' => [
    'numeric' => 'The :attribute may not be greater than :max.',
    'file' => 'The :attribute may not be greater than :max kilobytes.',
    'string' => 'The :attribute may not be greater than :max characters.',
    'array' => 'The :attribute may not have more than :max items.',
],
```

# 37. MIME types
### a. Công dụng
File được xác thực phải khớp với một trong các MIME đã cho. Để xác thực được MIME của file, nội dung file sẽ được đọc và framework sẽ dự đoán loại MIME, điều này có thể khác với loại MIME cho người dùng cung cấp.

### b. Cách sử dụng 
**Cú pháp:** `mimetypes:text/plain,...`

**HTML:**

```HTML
<input type="file" name="video">
```

**Validation rule:**

```PHP
'video' => 'mimetypes:video/avi,video/mpeg'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'mimes' => 'The :attribute must be a file of type: :values.'
```

# 38. Extension (File)
### a. Công dụng
File được xác thực phải khớp với một trong các định dạng mở rộng đã cho. Rule này sẽ xác thực MIME trước thông qua đọc nội dụng file và đoán rồi mới xác thực định dạng mở rộng. Có thể nói đây là một rule mở rộng của `mimetypes`. Bạn có thể tham khảo một số các MIME tại https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types.

### b. Cách sử dụng 
**Cú pháp:** `mimes:foo,bar...`

**HTML:**

```HTML
<input type="file" name="image">
```

**Validation rule:**

```PHP
'image' => 'mimes:png,jpeg'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'mimes' => 'The :attribute must be a file of type: :values.'
```

# 39. Min
### a. Công dụng
Trường được xác thực phải lớn hơn hoặc bằng giá trị lớn nhất cho trước, bao gồm: chuỗi, số, mảng và file. Về quy ước so sánh tương tự như rule `between`.

### b. Cách sử dụng 
**Cú pháp:** `min:value`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'min:10'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'min' => [
    'numeric' => 'The :attribute may not be greater than :max.',
    'file' => 'The :attribute may not be greater than :max kilobytes.',
    'string' => 'The :attribute may not be greater than :max characters.',
    'array' => 'The :attribute may not have more than :max items.',
],
```

# 40. Not in
### a. Công dụng
Trường được xác thực phải không phải là một phần tử nằm trong mảng đã cho.

### b. Cách sử dụng 
**Cú pháp:** `not_in:item_1,item_2,...item_n`

**HTML:**

```HTML
<input type="file" name="item">
```

**Validation rule:**

Mặc định:
```PHP
'item' => 'not_in:' . implode(',', [1, 2, 3, 4, 5])
```

Đôi khi sử dụng valiation rule còn khá nhiều hạn chế. Chính vì vậy, ta có thể sử dụng method `Rule::notIn` để linh hoạt hơn.

```PHP
use Illuminate\Validation\Rule;

'item' => [
    'other_rule',
    Rule::notIn([1, 2, 3, 4, 5])
];
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'not_in' => 'The selected :attribute is invalid.'
```

# 41. Not regex
## a. Công dụng
Trường được xác thực không được khớp với regular expression đã cho. Rule này bản chất sử dụng  hàm `preg_match` trong PHP, do đó cần chú ý đến các ký tự của chuỗi pattern.

## b. Cách sử dụng
**Cú pháp:** `not_regex:pattern`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'not_regex:/^[a-z]+$/'
```

> **Lưu ý:** Nếu như trong chuỗi pattern có chứa ký tự `|` thì bạn có thể sử dụng mảng để liệt kê các validation rule.
> 
> ```PHP
> 'text' => ['other_rule', 'not_regex:/^[a-z]+$/'] 

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'not_regex' => 'The :attribute format is invalid.'
```

# 42. Nullable
## a. Công dụng
Trường được xác thực có thể nhận giá trị `null`, nếu không thì phải tuân thủ các validation rule còn lại.

## b. Cách sử dụng
**Cú pháp:** `nullable|other_rule|...`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'nullable|alpha'
```

# 43. Numeric
## a. Công dụng
Trường được xác thực phải là một số.

## b. Cách sử dụng
**Cú pháp:** `numeric`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'numeric'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'numeric' => 'The :attribute must be a number.'
```

# 43. Present
## a. Công dụng
Trường được xác thực phải có mặt trong request nhưng có thể trống.

## b. Cách sử dụng
**Cú pháp:** `present`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'present'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'present' => 'The :attribute field must be present.'
```

# 44. Regex
## a. Công dụng
Trường được xác thực phải khớp với regular expression đã cho. Rule này bản chất sử dụng  hàm `preg_match` trong PHP, do đó cần chú ý đến các ký tự của chuỗi pattern.

## b. Cách sử dụng
**Cú pháp:** `regex:pattern`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'regex:/^[a-z]+$/'
```

> **Lưu ý:** Nếu như trong chuỗi pattern có chứa ký tự `|` thì bạn có thể sử dụng mảng để liệt kê các validation rule.
> 
> ```PHP
> 'text' => ['other_rule', 'regex:/^[a-z]+$/'] 

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'not_regex' => 'The :attribute format is invalid.'
```

# 45. Required
## a. Công dụng
Trường được xác thực phải có mặt trong request và không được trống. Một trường được coi là trống nếu rơi vào các trường hợp sau:
* Giá trị là `null`.
* Giá trị là mội chuỗi trống.
* Giá trị là một mảng trống hoặc object `Countable` trống (sẽ tìm hiểu ở các tập sau).
* Giá trị là một file đã upload nhưng không tìm thấy đường dẫn.

## b. Cách sử dụng
**Cú pháp:** `required`

**HTML:**

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'required'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'required' => 'The :attribute field is required.'
```

# 46. Required if
## a. Công dụng
Trường được xác thực phải có mặt trong request và không được trống nếu như một trường khác có giá trị bằng giá trị đã cho.

## b. Cách sử dụng
**Cú pháp:** `required_if:anotherfield,value`

**HTML:**

```HTML
<input type="text" name="filed">
<input type="text" name="anotherfield">
```

**Validation rule:**

Mặc định:
```PHP


'field' => 'required_if:anotherfield,value'
```

Ngoài ra bạn cũng có thể sử dụng method `Rule::requiredIf` để linh hoạt hơn. Method này chấp nhận giá trị boolean hoặc một Closure object trả về gía trị boolean. Nếu là `true` thì validation rule này sẽ được thực thi.

```PHP
'field' => Rule::requiredIf(boolean)
```

```PHP
'field' => Rule::required(function () use ($request) {
    return boolean;
});
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'required_if' => 'The :attribute field is required when :other is :value.'
```

# 47. Required unless
## a. Công dụng
Trường được xác thực phải có mặt trong request và không được trống trừ khi một trường khác có giá trị bằng giá trị đã cho.

## b. Cách sử dụng
**Cú pháp:** `required_unless:anotherfield,value`

**HTML:**

```HTML
<input type="text" name="field">
<input type="text" name="anotherfield">
```

**Validation rule:**

```PHP
'field' => 'required_unless:anotherfield,value'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'required_unless' => 'The :attribute field is required unless :other is in :values.'
```

# 48. Required with
## a. Công dụng
Trường được xác thực phải có mặt trong request và không được trống trừ nếu một trong các trường liệt kê có mặt trong request.

## b. Cách sử dụng
**Cú pháp:** `required_with:foo,bar`

**HTML:**

```HTML
<input type="text" name="field">
<input type="text" name="anotherfield">
```

**Validation rule:**

```PHP
'field' => 'required_with:anotherfield,value'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'required_with' => 'The :attribute field is required when :values is present.'
```

# 49. Required with all
## a. Công dụng
Trường được xác thực phải có mặt trong request và không được trống trừ nếu tất cả các trường liệt kê có mặt trong request.

## b. Cách sử dụng
**Cú pháp:** `required_with_all:foo,bar`

**HTML:**

```HTML
<input type="text" name="field">
<input type="text" name="anotherfield">
```

**Validation rule:**

```PHP
'field' => 'required_with_all:anotherfield,value'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'required_with_all' => 'The :attribute field is required when :values are present.'
```

# 50. Required without
## a. Công dụng
Trường được xác thực phải có mặt trong request và không được trống trừ nếu một trong các trường liệt kê không có mặt trong request.

## b. Cách sử dụng
**Cú pháp:** `required_without:foo,bar`

**HTML:**

```HTML
<input type="text" name="field">
<input type="text" name="anotherfield">
```

**Validation rule:**

```PHP
'field' => 'required_without:anotherfield,value'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'required_without' => 'The :attribute field is required when :values is not present.'
```

# 51. Required without all
## a. Công dụng
Trường được xác thực phải có mặt trong request và không được trống trừ nếu tất cả các trường liệt kê không có mặt trong request.

## b. Cách sử dụng
**Cú pháp:** `required_without_all:foo,bar`

**HTML:**

```HTML
<input type="text" name="field">
<input type="text" name="anotherfield">
```

**Validation rule:**

```PHP
'field' => 'required_without_all:anotherfield,value'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'required_without_all' => 'The :attribute field is required when none of :values are present.'
```

# 52. Same
## a. Công dụng
Trường được xác thực phải khớp về giá trị và kiểu dữ liệu với trường đã cho.

## b. Cách sử dụng
**Cú pháp:** `same:field`

**HTML:**

```HTML
<input type="text" name="field">
```

**Validation rule:**

```PHP
$request->merge([
    'number' => '3'
]);

'field' => 'same:number'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'same' => 'The :attribute and :other must match.'
```

# 53. Size
## a. Công dụng
Trường được xác thực phải có kích thước khớp với giá trị đã cho, bao gồm: chuỗi, số, mảng và file. Về quy ước so sánh tương tự như rule `between`.

## b. Cách sử dụng
**Cú pháp:** `size:field`

**HTML:**

```HTML
<input type="text" name="string">
```

**Validation rule:**

Về hình thức  tương tự như rule `between`.
```PHP
'string' => 'size:10'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'size' => [
    'numeric' => 'The :attribute must be :size.',
    'file' => 'The :attribute must be :size kilobytes.',
    'string' => 'The :attribute must be :size characters.',
    'array' => 'The :attribute must contain :size items.',
]
```

# 54. Start with
## a. Công dụng
Trường được xác thực phải bắt đầu bằng một trong các giá trị đã cho.

## b. Cách sử dụng
**Cú pháp:** `starts_with:foo,bar,...`

**HTML**:

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'starts_with:foo'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'starts_with' => 'The :attribute must start with one of the following: :values'
```

# 55. String
## a. Công dụng
Trường được xác thực phải là chuỗi. Nếu bạn muốn nó có giá trị `null`, bạn cần phải khai báo thêm validation rule `nullable`.

## b. Cách sử dụng
**Cú pháp:** `string`

**HTML**:

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'string'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'string' => 'The :attribute must be a string.'
```

# 55. Timezone
## a. Công dụng
Trường được xác thực phải là mội múi giờ hợp lệ theo hàm `timezone_identifiers_list` của PHP.

## b. Cách sử dụng
**Cú pháp:** `timezone`

**HTML**:

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'timezone'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'timezone' => 'The :attribute must be a valid zone.'
```

# 56. Unique (Database)
## a. Công dụng
Trường được xác thực không được tồn tại trong database table.

## b. Cách sử dụng
**Cú pháp:** `unique:table,column,except,idColumn`

**Validation rule:**

*Chỉ định tên cột tùy chỉnh:*

```PHP
'email' => 'unique:users,email_address'
```

`column` có thể dùng để xác định cột tương ứng cho việc kiểm tra. Nếu `column` không được chỉ định, framework sẽ sử dụng tên trường để thay thế.

*Tùy chỉnh kết nối database:*

```PHP
'email' => 'unique:mysql.users,email_address'
```

Ta chỉ cần sử dụng ký tự `.` để chọn database connection.

*Ràng buộc `unique` rule bỏ qua một ID nhất định:*

Đôi khi chúng ta cần bỏ qua một ID nhất định trong lần kiểm tra tồn tại duy nhất. Xem xét trường hợp "Cập nhật hồ sơ" bao gồm username, email. Bạn muốn xác thực rằng địa chỉ email là duy nhất. Tuy nhiên, nếu người dùng chỉ thay đổi username mà không thay đổi email, chắc chắn bạn không muốn rằng ném lột lỗi "Email đã tồn tại" cho user đúng không nào?

Để hướng dẫn Validator bỏ qua ID người dùng, chúng ta có thể sử dụng lớp `Rule` để định nghĩa. Ta có thể làm như sau:

```PHP
use Illuminate\Validation\Rule;

'email' => [
    'other_rule',
    Rule::unique('users')->ignore($user->id)
]
```

> **Lưu ý:** Tham số truyền vào method `ignore` chỉ nên là do bạn định nghĩa, không nên lấy từ dữ liệu đầu vào của người dùng, bạn rất có thể sẽ bị tấn công SQL injection.

Bạn cũng có thể truyền một object model. framework sẽ tự động lấy key cần thiết.

```PHP
Rule::unique('users')->ignore($user)
```

Nếu table bạn sử dụng cột khóa chính khác với `id`, bạn có thể chỉ định tên của cột tại method `ignore`.

```PHP
Rule:ignore('users')->ignore($user, 'user_id')
```

Mặc định. rule `unique` sẽ kiểm tra tính duy nhất của cột khớp với tên của trường gửi đến. Tuy nhiên, bạn có thể thay đổi tên cột bằng cách truyền tham số thứ hai tại method `Rule:unique`.

```PHP
Rule::ignore('users', 'email_address')->ignore($user->id)
```

*Thêm các điều kiện bổ sung:*

Bạn có thể chỉ định câu truy vấn bổ sung bằng cách sử dụng method `where`.

```PHP
'email' => Rule::unique('users')->where(function ($query) {
    return $query->where('account_id', 1);
})
```

> **Lưu ý:** Hiện tại chúng ta chưa tiếp xúc đến database nên validation rule này mình nghĩ nên test trong các bài học sau.

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'unique' => 'The :attribute has already been taken.'
```

# 57. URL
## a. Công dụng
Trường được xác thực phải có dạng URL.

## b. Cách sử dụng
**Cú pháp:** `url`

**HTML**:

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'url'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'url' => 'The :attribute format is invalid.'
```

# 58. UUID
## a. Công dụng
Trường được xác thực phải có dạng RFC 4122 (phiên bản 1, 3, 4 hoặc 5) universally unique identifier (UUID). Cái này hiểu đơn giản là một ID thay thế cho auto-increment ID chính để tối ưu cho việc truy vấn trong ngữ cảnh nào đó, các bạn có thể Google thêm.

## b. Cách sử dụng
**Cú pháp:** `uuid`

**HTML**:

```HTML
<input type="text" name="text">
```

**Validation rule:**

```PHP
'text' => 'uuid'
```

**Thông báo mặc định:**

```PHP:resources/lang/en/validation.php
'uuid' => 'The :attribute must be a valid UUID.'
```

# VII. Thêm điều kiện (Conditionally adding rules)
## 1. Xác thực khi tồn tại (Validating when present)
Trong một vài trường hợp, bạn muốn chạy trình xác thực khi trường đó thực sự tồn tại trong đầu vào. Để thực hiện nhanh, bạn có thể thêm rule `sometimes` trước khi khai báo các validation rule khác.

```PHP
$validator = Validator::make($data, [
    'email' => 'sometimes|required|email'
]);
```

Trong đoạn code trên, trường `email` chỉ được xác thực khi nó tồn tại trong `$data`.

> **Lưu ý:** Nếu như bạn đang muốn xác thực một trường nhưng nó có thể trống, bạn có thể xem xét đặt rule `nullable`.

## 2. Xác thực điều kiện phức tạp (Complex conditional validation)
Đôi khi, bạn muốn thêm các quy tắc xác thực dựa trên điều kiện logic phức tạo hơn. Chẳng hạn bạn chỉ muốn `required` một trường nhất định nếu trường khác có giá trị lớn hơn hoặc bằng 100. Hãy xem ví dụ sau:

**HTML:**

Mình sẽ tạo hai trường `field` và `anotherfield`.

```HTML
<input type="text" name="field">
<input type="text" name="anotherfield">
```

**Validation rule:**

Đến đây, ta sẽ tạo trình validator với `Validator` facade.

```PHP
use Illuminate\Support\Facades\Validator;

$validator = Validator::make($request->all(), [
    'field' => 'required|numeric'
]);

$validator->sometimes('anotherfield', 'required', function ($input) {
    return $input->field >= 100;
});
```

Quan sát quá trình validator trên, ban đầu mình đã khai báo các validation rule cho trường `field`. Yêu cầu của ứng dụng là nếu như giá trị của trường `field` này mà lớn hơn hoặc bằng 100 thì sẽ xác thực `required` cho trường `anotherfield` bằng cách sử dùng method `sometimes`.
* Tham số thứ nhất chính là tên trường cần xác thực
* Tham số thứ hai chính là danh sách các validation rule cần vượt qua.
* Tham số thứ ba sẽ là một Closure object, nó nhận nhận tham số `$input` để có thể truy cập đến các input request, cuối cùng trả về một giá trị boolean, nếu `true` thì trường đó sẽ thực hiện validate.

# VIII. Xác thực mảng (Validating array)
Xác thực các trường dựa trên mảng không phải là một điều quá khó khăn. Bạn có thể sử dụng ký tự `.` để tham chiểu đến các phần tử trong mảng trong quá trình tạo trình xác thực. Chẳng hạn nếu request có chứa mảng hình ảnh `photos[profile]` thì ta có thể thực hiện validate như sau:

```PHP
$validator = Validator::make($request->all(), [
    'photos.profile' => 'required|image'
]);
```

Nếu request chứa mảng multi-level, bạn vẫn có thể tham chiếu đến các phần tử con trong mảng như sau:

```PHP
$validator = Validator::make($request->all(), [
    'users.*.email' => 'required|email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name'
]);
```

Tương tự, bạn cũng có thể sử dụng ký tự `*` để chỉ định các thông báo xác thực trong file ngôn ngữ, giúp dễ dàng tạo thông báo xác thực cho các trường dựa trên mảng.

```PHP
'custom' => [
    'person.*.email' => [
        'unique' => 'Each person must have a unique e-mail address',
    ]
],
```

# IX. Tùy chỉnh quy ước xác thực (Custom validation rule)
## 1. Sử dụng rule object (Using rule object)
Laravel cung cấp rất nhiều rule hữu ích; tuy nhiên, chúng ta vẫn có thể chỉ định các rule theo ý muốn. Để tạo một rule object mới, ta có thể sử dụng lệnh Artisan sau:

> php artisan make:rule Uppercase

Một thư mục `app/Rules` sẽ được tạo cùng với file `Uppercase.php` bên trong. Bây giờ hãy mở file này lên và quan sát:

```PHP:app/Rules/Uppercase.php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Uppercase implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The validation error message.';
    }
}
```

Trong một rule object có hai method chính: `passes` và `message`. Method `passes` sẽ nhận tên trường và giá trị của nó và trả về các giá trị `true` hoặc `false` tùy thuộc vào giá trị của trường có hợp lệ hay không. Method `message` sẽ trả về thông báo lỗi xác thực nếu không vượt qua.

Giờ hay chèn đoạn code này vào method `passes`:

```PHP:app/Rules/Uppercase.php
public function passs($attribute, $value)
{
    return strtoupper($value) === $value;
}
```

Tiếp đến là tùy chỉnh một chút câu thông báo:

```PHP:app/Rules/Uppercase.php
public function message()
{
    return 'The :attribute must be uppercase.';
}
```

Như thế là ta đã có thể kiểm tra được rồi đấy, để gọi validation rule ta chỉ cần khởi tạo object của nó trong validator.

```PHP
use App\Rules\Uppercase;

$request->validate([
    'name' => ['required', 'string', new Uppercase]
]);
```

## 2. Sử dụng closure (Using closure)
Nếu bạn chỉ cần tùy chỉnh rule 1 lần duy nhất trong ứng dụng, bạn có thể sử dụng hình thức closure để làm việc này thay thế cho rule object. Closure này sẽ nhận tên trường, giá trị của trường và một biến callback `$fail` để trả về lỗi nếu không vượt qua.

```PHP
$request->validate([
    'name' => [
        'required',
        'string',
        function ($attribute, $value, $fail)) {
            if ($value !== strtoupper($value) {
                $fail("The $attribute must be uppercase.");
            }
        }
    ]
]);
```

## 3. Sử dụng tiện ích mở rộng (Using extension)
Một cách khác để đăng ký validation rule tùy chỉnh đó là sử dụng method `extend` trong `Validator` facade. Ta có thể định nghĩa nó tại method `boot` của `AppServiceProvider`.

```PHP:app/Providers/AppServiceProvider.php
public function boot()
{
    Validator::extend('uppercase', function ($attribute, $value, $parameters, $validator) {
         return strtoupper($value) === $value;
    });
}
```

Bạn cũng có thể truyền vào một controller action thay vì closure.

```PHP
Validator::extend('uppercase', 'UppercaseValidator@validate');
```

```PHP:
public function validate($attribute, $value, $parameters, $validator)
{
    return strtoupper($value) === $value;
}
```

Để khai báo thông báo xác thực lỗi cho rule vừa khởi tạo, các bạn mở file `resources/lang/xx/validation.php` và định nghĩa câu thông báo cùng cấp với các rule có sẵn khác.

```PHP:resources/lang/en/validation.php
// ...
'uuid' => 'The :attribute must be a valid UUID.',
'uppercase' => 'The :attribute must be uppercase.',
// ...
```

Như vậy là ta đã có thể sử dụng được rồi đấy.

```PHP
$request->validate([
    'name' => 'required|string|uppercase'
]);
```

Ngoài ra, bạn cũng có thể thay đổi câu thông báo xác thực tại service provider bằng cách sử ụng method `Validator::replacer` sau khi đã định nghĩa method `Validator::extend` trước đó.
```PHP:app/Providers/AppServiceProvider.php
public function boot() 
{
    Validator::extend(...);
    
    Validator::replacer('uppercase', function ($message, $attribute, $rule, $parameters) {
        return str_replace('uppercase', 'chữ hoa', $message);
    });
}
```

## 4. Tiện ích mở rộng tiềm ẩn (Implicit extension)
Theo mặc định, một trường được xác thực không tồn tại hoặc rỗng trong đầu vào, các quy tắc xác thực có sẵn, bao gồm cả các quy tắc tùy chỉnh sẽ không được chạy. Chẳng hạn rule `unique` sẽ không chạy nếu như đầu vào mang giá trị rỗng.

```PHP
$rules = ['name' => 'unique:users,name'];

$input = ['name' => ''];

Validator::make($input, $rules)->passes(); // true
```

Để một rule chạy ngay cả khi trường mang dữ liệu trống, quy tắt phải ngụ ý rằng trường được `required`. Để tạo một "implicit" extension, sử dụng method `Validator::extendImplicit`.

```PHP
Validator::extendImplicit('foo', function ($attribute, $value, $parameters, $validator) {
    return $value == 'foo';
});
```

> **Lưu ý:** Một "implicit" extension chỉ ngụ ý rằng trường được `required`. Cho dù nó thực sự làm mất hiệu lực một trường không tồn tại hoặc trống là tùy thuộc vào bạn.

### Rule object tiềm ẩn
Nếu bạn muốn một rule object chạy ngay cả khi giá trị của trường trống hoặc không tồn tại, bạn có thể `implement` interface `Illuminate\Contracts\Validation\ImplicitRule`. Interface này sẽ đóng vai trò là "giao diện đánh dấu" cho validator; do đó nó sẽ không chứa bất cứ method nào bạn cần để `implement`.

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ