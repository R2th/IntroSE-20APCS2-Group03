# **I. Function trong SASS**
### **1. Function là gì?**

Function không còn xa lại gì trong các ngôn ngữ lập trình nhưng với SASS thì nó là một khái niệm khá mới lạ và đương nhiên cũng rất là hữu ích trong việc xây dựng CSS . Về chức năng của function cũng tương tự như @mixin, tuy nhiên nếu phân tích kỹ thì @mixin giống như procedure (hàm không có return) còn function là hàm có return.

**Cú pháp**
```sass
@function function_name($var1, $var2, ...){
    @return value;
}
```
Để sử dụng ta chỉ cần gọi tên hàm và  truyền các parameter cho nó

```sass
function_name($val1, $val2, ...)
```

> Note: Trong function là bắt buộc bạn phải sử dụng lệnh @return để trả kết quả về. Còn trường hợp bạn không muốn `return` một giá trị về thì nên sử dụng **Place Holder** hoặc **Mixin**.

**Ví dụ đơn giản**: trả về chiều rộng và cộng thêm 20px;

```sass
@function width_wrapper($value)
{
    @return ($value + 20px);
}
 
.wrapper{
    width: width_wrapper(80px);
}
```
Còn trong @mixin
```sass
@function width_wrapper($value : 20)
{
    @return ($value + 20px);
}
```
### **2. Nên lựa chọn function, mixin hay place holder?**
**Function** dùng để xử lý một nhiệm vụ và nó sẽ trả về một kết quả duy nhất nên việc trả về một đoạn CSS dài ngoằn là điều không thể, vì vậy thông thường ta dùng function trong những trường hợp xủ lý một nhiệm vụ nào đó và mục đích cuối cùng là lấy một kết quả.

**Mixin** như ta đã biết thì nó giống như một procedure dùng để gom nhóm một đoạn code CSS lại.

**Place Holder** có chức năng giống **Mixin**, tuy nhiên có sự khác biệt là bạn không thể khai báo tham số trong **Place Holder**.

Dựa vào những yếu tố trên bạn sẽ quyết định nên sử dụng phần nào vào project của bạn.Việc lựa chọn Funtion, Mixin hay Place Hoder sẽ phụ thuộc vào mục đích của bạn.
# **II. Một số hàm thông dụng trong SASS**
### **1. Các hàm xử lý chuỗi trong SASS**
**SASS** cung cấp khá nhiều các hàm có sẵn giúp cho việc lập trình trở nên đơn giản hơn. Nó chia ra làm nhiều loại như các hàm xử lý chuỗi, xử lý number, xử lý màu sắc, ... Tuy nhiên vì thời gian có hạn nên trong bài này mình chỉ giới thiệu một số hàm xử lý chuỗi.

Chúng ta có tổng cộng 8 hàm xử lý chuỗi hay sử dụng như sau:

| Tên hàm |  	Mô tả |
| --------| -------- |
| `unquote($string)`      | Xóa các cặp quote ra khỏi chuỗi `$string`     |
| `quote($string)`      | Thêm cặp quote bao quanh chuỗi `$string`    |
| `str-length($string)`      | Trả về tổng số ký tự của chuỗi `$string`    |
| `str-insert($string,$insert,$index)`      |Thêm chuỗi  `$insert` vào chuỗi `$string` tại vị trí  `$index`     |
| `str-index($string, $substring)`      | Kiểm tra vị trí xuất hiện chuỗi `$subtring` trong chuỗi `$string`     |
| `str-slice($string,$start-at,[$end-at])`      | Cắt chuỗi bắt đầu từ `$start-at` và kết thúc tại `$end-at`, trường hợp không truyền `$end-at` thì nó lấy đến cuối chuỗi.    |
| `to-upper-case($string)`      | Chuyển chuỗi `$string` sang chữ in hoa    |
| `to-lower-case($string)`      | Chuyển chuỗi `$string` sang chữ in thường   |

### **2. Các hàm xử lý number trong SASS**
Chúng ta cũng có tổng cộng 8 hàm xử lý Number hay sử dụng như sau:

| Tên hàm |  	Mô tả |
| --------| -------- |
| `percentage($number)`      | Biến đổi số `$number` thành tỉ lệ phần trăm (%)  |
| `round($number)`      |Làm tròn số `$number`  |
| `ceil($number)`      | Làm tròn số `$number`ở cận trên    |
| `floor($number)`      |Làm tròn số `$number` ở cận dưới   |
| `abs($number)`      | Tính giá trị tuyệt đối cho `$number`   |
| `min($numbers…)`      | Tìm số `$number` nhỏ nhất trong dãy truyền vào |
| `max($numbers…)`      | Tìm số `$number `lớn nhất trong dãy truyền vào   |
| `random([$limit])`      |Random ngẫu nhiên một con số không quá `$limit`   |
# **III. Kết luận**
Vậy đây đã là bài cuối của mình trong series về SASS,  hy vọng với kiến thức mình chia sẻ các bạn có thể áp dụng nó vào project của mình.

Thank you!!!