Có thể bạn đã nghe qua hoặc đã dùng thử với `inject` và `each_with_object` nhưng chưa thực sự hiểu sâu về chúng mà chỉ đọc qua guide về cách sử dụng căn bản. Hôm nay chúng ta sẽ đi sâu tìm hiểu để có một cái nhìn sâu hơn về `inject` và `each_with_object` thông qua các ví dụ trực quan.

### inject
Định nghĩa trên trang  [apidock](https://apidock.com/rails/Enumerable/inject)
> inject(p1 = v1, p2 = v2)
> 
> Combines all elements of enum by applying a binary operation, specified by a block or a symbol that names a method or operator.
> 


- Tốt hơn cho các hoạt động trên các đối tượng/collections có thể thay đổi giá trị và trả về một giá trị mới
- Tốt cho các đối tượng nguyên thủy và các đối tượng mà trả về giá trị mới khi thay đổi.

### each_with_object
Định nghĩa trên trang  [apidock](https://apidock.com/rails/Enumerable/each_with_object)
> each_with_object(memo) public
> 
> Iterates over a collection, passing the current element and the memo to the block. Handy for building up hashes or reducing collections down to one object.

- Tốt hơn cho các hoạt động có thể thay đổi trên các đối tượng như là Hash hoặc Array
- Khi sử dụng chúng ta cần cung cấp một đối tượng mới để bắt đầu và sử dụng đối tượng nó. Và dĩ nhiên sẽ không hữu dụng nếu bạn muốn sửa đổi trên 1 đối tượng hiện tại.


*Bây giờ chúng ta sẽ cùng nhau đi vào ví dụ để làm rõ những luận điểm trên!*

### VD1:
Hãy chú ý tới các ví dụ khác nhau. Tưởng tượng bạn có một tập hợp các đối tượng và bạn muốn tạo ra một `hash` sử dụng chúng và thực hiện một số loại ánh xạ khác nhau.

Cùng tìm hiểu vấn đề:

- Bạn muốn xây dựng một đối tượng mới (Hash `lower_to_upper)
- Bắt đầu với hash trống `{}`

Trong trường hợp này, `each_with_object` rất tiện lợi:
```
lower = 'a'..'z'
lower_to_upper = lower.each_with_object({}) do |char, hash|
  hash[char] = char.upcase
end
```

Cùng xem sử dụng `inject` nhưng có vẻ không tiện lợi bằng việc sử dụng `each_with_object`

```
lower = 'a'..'z'
lower_to_upper = lower.inject({}) do |hash, char|
  hash[char] = char.upcase
  hash
end
```

nguyên nhân vì `inject` yêu cầu giá trị để ghi nhớ cho block trong các lần sử dungj tiếp theo (`hash` được khởi tạo với `{}`) được trả về sau mỗi lần lặp qua `block`. Vì vậy mặc dù bạn liên tục hoạt động trên cùng một đối tượng, bạn luôn cần nó được trả về ở cuối của khối.

`each_with_object` mặt khác luôn gọi khối có cùng một đối tượng ban đầu được truyền làm đối số đầu tiên cho method.

### VD2
Nhưng với trường hợp bạn đã có một đối tượng hiện để thay đổi. Trong trường hợp như vậy, thông thường bạn nên sử dụng `each` thay vì `each_with_object` nhưng `each_with_object` có thể ngắn hơn một chút nếu bạn vẫn cần trả về đối tượng đã thay đổi.

*Sử dụng each:*
```
mapping = {'ż' => 'Ż', 'ó' => 'Ó'}
lower = 'a'..'z'
lower.each do |char|
  mapping[char] = char.upcase
end
return mapping # optionally
```

*Sử dụng `each_with_object`:*
```
mapping = {'ż' => 'Ż', 'ó' => 'Ó'}
lower = 'a'..'z'
lower.each_with_object(mapping) do |char, hash|
  hash[char] = char.upcase
end
```

```
mapping = {'ż' => 'Ż', 'ó' => 'Ó'}
lower = 'a'..'z'
lower.each_with_object(mapping) do |char|
  mapping[char] = char.upcase
end
```
Nhấn mạnh ở đây `each` sẽ tốt hơn nếu bạn muốn thay đổi một tập hợp hiện có, bởi vì thông thường bạn không cần phải `return`. Sau cùng, bất cứ khi nào đối tượng làm đối số, cho dù xuất phát từ đâu, có thể vẫn đang có đối tượng tham chiếu đến đối tượng này.

### VD3
Trong ví dụ tiếp theo sẽ không thay đổi trạng thái bên trong của đối tượng mà luôn tạo ra một đối tượng mới. Pháp tóan sử dụng sẽ luôn trả về một đối tượng mới.

Ví dụ đơn giản nhất là toán tử `+` số.

```
a = 1
b = 2

a.frozen?
# => true
b.frozen?
# => true

c = a + b
# => 3
```
Không có cách nào để thay đổi đối tượng `integer` được tham chiếu bởi biến a thành 3. ĐIều duy nhất có thể làm là gán một đối tượng khác cho biến a hoặc bằn b hoặc c.

Tiếp theo là một ví dụ rõ ràng hơn:
```
require 'date'
d = Date.new(2017, 10, 10)
```
Nếu bạn muốn một ngày khác, bạn không thể thay đổi instance `Date` hiện tại. Bạn cần tạo một instance mới.
```
d.day=12
# => NoMethodError: undefined method `day=' for #<Date:

e = Date.new(2017, 10, 12)
```

Hey, sau một vài ví dụ đơn giản chúng ta đã phần nào hiểu được chúng ta có gì khi làm chủ được `inject` nếu bạn có một đối tượng bất biến, `inject` là sự lựa chọn hoàn hảo.

```
(5..10).inject(:+)
(5..10).inject(0, :+)
(5..10).inject{|sum, n| sum + n }

(5..10).inject(1, :*)
```

Hoặc:
```
starting_date = Date.new(2019,10,20)
result = [1, 10].inject(starting_date) do |date, delay|
  date + delay
end
# => Date.new(2017,10,31)
```

### VD4
Làn này chúng ta sẽ tạo một đối tượng mới môi lần nhưng không phải vì có thể thay đổi trạng thái bên trong mà bởi vì phương thức đó nhất định sẽ trả về một đối tượng mới.
```
result = [
 {1 => 2},
 {2 => 3},
 {3 => 4},
 {1 => 5},
].inject(:merge)
# => {1=>5, 2=>3, 3=>4}
```

`Hash#merge` gộp hai hashes và trả về hash mới. Điều đó giải thích vì sao chúng ta có thể dễ dàng sử dụng với `inject`
Sẽ ngắn gọn hơn so với:
```
[
 {1 => 2},
 {2 => 3},
 {3 => 4},
 {1 => 5},
].each_with_object({}) {|element, hash| hash.merge!(element) }
# => {1=>5, 2=>3, 3=>4}
```

**Funny**

Có một điều lạ là các phần tử truyền vào block của `inject` và `each_with_object` đảo ngược nhau.

```
lower_to_upper = lower.each_with_object({}) do |char, `hash`|
  hash[char] = char.upcase
end

lower_to_upper = lower.inject({}) do |`hash`, char|
  hash[char] = char.upcase
  hash
end
```

Hi vọng sau bài này các bạn có thể hiểu thêm về `inject` và `each_with_object`. Chúc các bạn một ngày vui vẻ :D

Nguồn: https://blog.arkency.com/inject-vs-each-with-object/