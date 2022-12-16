- Bài viết được dịch từ bài [ES6 Arrow Functions in JavaScript](https://medium.com/rubycademy/the-case-statement-and-ranges-4de42b764003) của tác giả [@farsi_mehdi](https://medium.com/@farsi_mehdi).

-----
![](https://miro.medium.com/max/2200/1*xT-VAbLQo9Mi2v5n8v6zTA.jpeg)

-----
Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:
* Toán tử ..
* Toán tử ...
* Ranges avà giá trị floating

> Feel free to read the Case statement behind the scene article if you’re not familiar with the case statement and the when clause.

## Mệnh đề when vs range
Trong một câu lệnh `case `, mệnh đề khi có thể lấy một `range` làm tham số
```ruby
surface = 42

case surface
when 0..70   then :first_value
when 70...90 then :second_value
end
```
Ở đây, câu lệnh `case` lấy một số nguyên làm tham số.

Vì mệnh đề `when ` lấy một `range` làm tham số, nên toán tử `Range#===`được gọi và nó kiểm tra xem số nguyên có được bao gồm trong `range` không.

Toán tử `..` trong  `range` của chúng ta đảm bảo các toán hạng bên trái và bên phải được bao gồm trong phạm vi `range`.

Mệnh đề thứ hai khi lấy một `range` bằng cách sử dụng toán tử `...`.

Điều này có nghĩa là toán hạng bên phải được bao gồm trong `range` (Tập bị chặn phải - toán học).

Bây giờ chúng ta đã quen thuộc hơn với mệnh đề `range` && `when`, hãy bứt phá vs một trường hợp khía cạnh khác mà tôi gặp phải khi sử dụng float và rảnge.
## Phạm vi của các giá trị floating và mệnh đề when
Như chúng ta đã thấy trong ví dụ trên, toán tử trên loại trừ toán hạng bên phải của phạm vi. Nhưng, nếu tôi muốn loại trừ toán hạng bên trái thì sao? 
```ruby
surface = 90
inf = Float::INFINITY

case surface
when 0...70  then :first_value
when 70..90  then :second_value
when 90..inf then :third_value
end
```
Ở đây, chỉ nội dung của mệnh đề `when ` đầu tiên  khớp với giá trị bề mặt(surface) được xử lý - trong trường hợp của chúng ta khi `70..90 then :second_value`.

Trong trường hợp này, câu lệnh `case` trả về `:second_value`.

Vì vậy, mệnh đề `when` tiếp theo không bao giờ được đánh giá cho surface 90.

cái này, hoạt động tốt cho một loạt các số nguyên.

Nhưng nếu chúng ta phải đối phó với một loạt các `floats` thì sao?
```ruby
surface = 130.0+1e-10 # => 130.00000_00001
inf = Float::INFINITY

case surface
when 0...70.0    then :first_value
when 70.0..130.0 then :second_value
when 130.0..inf  then :third_value
end
```
Ở đây, câu lệnh case return `: third_value` dưới dạng` Surface `hoàn toàn lớn hơn` 130.0`.

nếu chúng ta gán lại bề mặt `= 130.0` thì câu lệnh tình huống của chúng ta trả về`: second_value` - giống như phạm vi số nguyên.

Lưu ý rằng chúng tôi sử dụng hằng số `Float :: INFINITY` để kết thúc phạm vi cuối cùng của chúng tôi.

Điều này tương đương với bất kỳ giá trị nào trên `130.0`.

Cuối cùng, hãy để Lôi có một cái nhìn về khái niệm phạm vi vô tận - Khái niệm này đã được giới thiệu trong `Ruby 2.6.0`.
```ruby
surface = 130.0+1e-10 # => 130.00000_00001

case surface
when 0...70.0    then :first_value
when 70.0..130.0 then :second_value
when 130.0..     then :third_value
end
```
Trên **dòng 6**, phạm vi bỏ qua toán hạng bên phải.

Ruby diễn giải điều này như sau: `130..Float :: INFINITY`

Điều này cho phép chúng tôi tránh để ngầm gọi `Float :: INFINITY` để kết thúc phạm vi của chúng tôi.

Vì vậy, ở đây, giá trị của `Surface` khớp với so sánh này và câu lệnh case trả về`:third_value`.