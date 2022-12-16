Nếu bạn là một người mới học Ruby, thì chắc chắn bạn sẽ gặp dấu (!) được đặt cùng một phương thức nào đó. Nếu đặt ở đầu phương thức thì đơn giản chỉ là phủ định như các ngôn ngữ lập trình phổ biến khác, còn được đặt ở cuối một method thì sẽ thế nào, bài viết này sẽ giúp bạn hiểu được điều đó.

# 1. Bang Methods là gì ? 
![](https://images.viblo.asia/eb81e756-98f0-4f87-a7cb-b40dd8c3f410.jpg)
Methods Bang được sử dụng khi kết thúc phương thức bằng dấu chấm than `!` (`bang`). Ví dụ như `upcase!` `compact!`.Chắc hẳn bạn từng một lần bị nhận cảnh báo : "Warning!", có thể là đi đường hay một bộ phim nào đó. `Bang` trong Ruby cũng được xem như một phương thức nguy hiểm, vì khi sử dụng nó sẽ thực hiện và sửa đổi đối tượng kết quả trả về đối tượng đã sửa đổi. Càng nguy hiểm sẽ càng thú vị phải không nào, vậy không có lí do gì để bỏ qua `bang`. 

# 2. Bang Methods trả lại đối tượng đã sửa đổi.
![](https://images.viblo.asia/3796ef16-095f-4c15-98e0-db71ca8549b5.jpg)

Không phải tất cả các phương thức đều có thế sử dụng với `bang`, hầu hết các phương thức thực hiện rồi trả về đối tượng mới đều không thể sử dụng với `bang`. Để sử dụng `bang` ta phải đảm bảo quá trình thực hiện sửa đổi đó trên cùng một đối tượng. Nếu đã sử dụng`bang` thì có thể sử dụng `non-bang`, sự khác nhau là `bang` thực hiện và sửa đổi đối tượng còn `non-bang` chỉ dừng lại ở thực hiện. Bắt đầu với một vài ví dụ cho dễ hiểu:

Sử dụng `non-bang` để xin chào thế giới 
```Ruby
name = "Hello, World"
puts name.upcase
puts name
```
Kết quả :
```
HELLO, WORLD
Hello, World
```
Sử dụng `bang` 
```Ruby
name = "Hello, World"
puts name.upcase!
puts name
```
Kết quả
```
HELLO, WORLD
HELLO, WORLD
```

Dễ dàng nhận thấy sự khác biệt của `bang` và `non-bang`, `bang` thực hiện hành động rồi sửa đổi đối tượng còn với `non-bang` thì chỉ dừng ở thực hiện hành động.
Tuy nhiên khi sử dụng `bang` biến `name` trước và sau khi sửa đổi liệu có cùng một đối tượng hay không? Dùng `oject_id` để giải quyết điều này. 
Nếu bạn muốn tìm hiểu kĩ hơn về `ojbect_id` thì có thể tìm đọc các bài viết chất lượng ngay tại Viblo. Ở đây tôi chỉ nhắc lại những thứ cơ bản về `object_id` thông qua ví dụ sau: 

```Ruby
a = "123"
puts a.object_id
puts "---------------"
a = "123"
puts a.object_id
```

Kết quả
```
46931933723760
---------------
46931933723580
```

Như bạn có thể thấy, có 2 đối tượng giống hệt nhau về mặt trực quan, nhưng chúng có `object_id` khác nhau, cho chúng ta biết rằng các đối tượng này khác nhau và được lưu trữ ở những nơi khác nhau.
Quay trở lại vấn đề chính, ta sẽ đi kiểm tra đối tượng sau khi `bang` qua ví dụ:

```Ruby
string = "I love Framgia"

puts "Initial value of string: #{string}"
puts "Object id of string: #{string.object_id}"

string.gsub!(/Framgia/, "Sun Asterisk")

puts "Object id of string: #{string.object_id}"
puts "Value of string: #{string}"
```

Kết quả
```
Initial value of string: I love Framgia
Object id of string: 47356345589720
Object id of string: 47356345589720
Value of string: I love Sun Asterisk
```

Như vậy chúng cùng một `id_object`, nên `bang` sửa đổi trên cùng một đối tượng

# 3. Bang Methods có thể trả về nil
```Ruby
puts "ruby".upcase!
puts "RUBY".upcase!
```

Kết quả
```
RUBY
=> nil
```

Như bạn có thể thấy, trong trường hợp thứ hai, chúng ta có giá trị là nil. Điều này là do chuỗi ruby, tất cả các ký tự đã được viết bằng chữ in hoa và `upcase!` không biết phải làm gì. Đó là lý do tại sao có thể có những tình huống khi một biểu thức có điều kiện bạn nhận được nil và điều kiện sẽ hoạt động theo cách không mong muốn.

# 4. Tổng kết
Qua bài viết này, bạn có thể hiểu cơ bản về Methods Bang, làm chủ được những nguy hiểm của `bang`, và cách sử dụng `bang` và `non-bang` sao cho phù hợp.
Đây là lần đầu tiên mình dịch và viết bài, nên có gì sai sót cả về kĩ thuật hành văn hay ví dụ, mong các bạn sẽ góp ý để mình hoàn thiện hơn.

### Tham khảo :

https://medium.com/@sologoubalex/bang-methods-in-ruby-60356cc5aeb6
http://ruby-for-beginners.rubymonstas.org/objects/bangs.html