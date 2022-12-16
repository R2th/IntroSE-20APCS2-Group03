Bài viết giới thiệu về phương thức [`inject`](https://apidock.com/ruby/Enumerable/inject) và [`each_with_object`](https://apidock.com/rails/Enumerable/each_with_object) là những phương thức thao tác vòng lặp và một số ví dụ giúp bạn hiểu khi nào thì sử dụng chúng.

**Inject**

Như được định nghĩa trong [document](https://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-inject)

> Combines all elements of enum by applying a binary operation, specified by a block or a symbol that names a method or operator.

Điều quan trọng nhất để hiểu về `inject` là khi bạn lặp qua từng phần tử của đối tượng enumerable, một giá trị tích lũy thứ hai cũng được truyền vào. Giá trị tích lũy này được cập nhật sau mỗi lần lặp và cuối cùng được trả về.

Ví dụ bên dưới chỉ sử dụng phương thức `inject` để thực hiện một phép toán trên một dãy số:

```
(1..5).inject(0){ |sum, num| sum + num } ==> returns 15
```
Ví dụ này chỉ đơn giản theo dõi biến `sum` và thêm mỗi số trong mảng vào nó và sau đó trả về tổng ở cuối.

Bạn cũng có thể sử dụng `inject` để chuyển đổi một array thành một hash:
```
# build a hash of { name => email }
  users = User.all

  users.inject({}) do |memo, user|
    memo[user.name] = user.email
    memo # you must return the memo each time!
  end
```

Có 2 điều cần phải lưu ý ở đây:

- Giá trị ban đầu của đối tượng accumulator (`memo`) là một hash rỗng.
- Chúng ta gọi phương thức `merge` cho hash accumulator trong mỗi vòng lặp, phương thức này trả về một hash đã update cho giá trị accumulator mới của chúng ta.

**each_with_object**

Theo định nghĩa tại [document](https://ruby-doc.org/core-2.2.3/Enumerable.html#method-i-each_with_object): 
> Iterates the given block for each element with an arbitrary object given, and returns the initially given object

Chúng ta có thể sử dụng ví dụ bên trên với `each_with_object`:
```
users.each_with_object({}) do |user, memo| 
    memo[user.name] = user.email
end
```
Có 2 sự khác biệt giữa đoạn code bên trên và ví dụ về `inject`:

- Các đối số đã bị đảo ngược. Trong `inject`, thứ tự các đối số là `|accumulator, element|` nhưng trong `each_with_object` thứ tự các đối số là `|element, accumulator|`.
- `each_with_object` bỏ qua giá trị trả về của block và chỉ chuyển đối tượng accumulator ban đầu cùng với lần lặp tiếp theo. Đây là lý do tại sao chúng ta không cần sử dụng phương thức `merge` ở đây.

Hãy xem các ví dụ bên dưới để hiểu rõ thêm về 2 method này nhé.

**Ví dụ 1**

Bài toán: Tưởng tượng bạn có một tập các object (`lower`) và bạn muốn tạo một Hash mới sử dụng chúng và thực hiện một số mapping từ tập object đó.

- Tạo một đối tượng mới (Hash `lower_to_upper`)
- Khởi tạo giá trị ban đầu với {}.

Trong trường hợp này, `each_with_object` là tiện lợi hơn.
```
lower = 'a'..'z'
lower_to_upper = lower.each_with_object({}) do |char, hash|
  hash[char] = char.upcase
end
```
Trong khi `inject` thì không thích hợp lắm:
```
lower = 'a'..'z'
lower_to_upper = lower.inject({}) do |hash, char|
  hash[char] = char.upcase
  hash
end
```
bởi vì `inject` yêu cầu rằng giá trị đã ghi nhớ được cung cấp khi gọi block tiếp theo (hash khởi tạo là {}) là giá trị được trả về từ lần gọi block trước đó. Vì vậy, mặc dù bạn liên tục hoạt động trên cùng 1 đối tượng, bạn vẫn phải gọi để trả về nó ở dòng cuối cùng của block được cung cấp. Trong khi đó, `each_with_object` luôn luôn gọi block với cùng một đối tượng ban đầu đã được truyền vào block làm đối số đầu tiên của phương thức.

**Ví dụ 2**

Vẫn là bài toán bên trên nhưng giả sử bây giờ bạn có 1 object đã tồn tại và bạn muốn sửa luôn object này. 

Trong trường hợp này, sử dụng `each` là thích hợp hơn `each_with_object` nhưng `each_with_object` có thể ngắn hơn nếu bạn vẫn cần trả về object đã thay đổi.

Cả 3 ví dụ dưới đây đều trả về cùng một kết quả:
```
mapping = {'ż' => 'Ż', 'ó' => 'Ó'}
lower = 'a'..'z'
lower.each do |char|
  mapping[char] = char.upcase
end
return mapping # optionally
```
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
Ở đây, `each` là thích hợp hơn nếu bạn thay đổi 1 collection đã có bởi vì bạn không cần trả lại nó sau khi gọi method. 

**Ví dụ 3**

Lần này, bạn không thay đổi trạng thái internal của đối tượng nhưng luôn tạo ra một đối tượng mới, toán tử bạn sử dụng sẽ luôn luôn trả về một đối tượng mới.

Ví dụ đơn giản nhất cho trường hợp này có thể là toán tử `+` trong chữ số:

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
Không có cách nào để thay đổi đối tượng integer được tham chiếu bởi biến `a` tới `3`, điều duy nhất bạn có thể làm là gán giá trị khác cho biến `a`, hoặc `b` hoặc `c`.

Hãy làm rõ hơn trong ví dụ sau với `Date`:

```
require 'date'
d = Date.new(2017, 10, 10)
```
Nếu bạn muốn một ngày khác, bạn không thế thay đổi thực thể `Date` đã tồn tại, bạn cần tạo một biến mới:
```
d.day=12
# => NoMethodError: undefined method `day=' for #<Date:

e = Date.new(2017, 10, 12)
```
Đây là một ví dụ nhỏ mà chúng ta sẽ thực hiện với phương thức `inject`. Nếu đối tượng ban đầu của bạn là bất biến, `inject` là lựa chọn hoàn hảo:

```
(5..10).inject(:+)
(5..10).inject(0, :+)
(5..10).inject{|sum, n| sum + n }
# => 45

(5..10).inject(1, :*)
# => 151200
```
hoặc
```
starting_date = Date.new(2017,10,1)
result = [1, 10].inject(starting_date) do |date, delay|
  date + delay
end
# => Date.new(2017,10,12)
```
hoặc
```
# gem install money
require 'money'
[
  Money.new(100_00, "USD"),
  Money.new( 10_00, "USD"),
  Money.new(  1_00, "USD"),
].inject(:+)
# => #<Money fractional:11100 currency:USD>
```

**Ví dụ 4**

Bây giờ, chúng ta sẽ tạo một đối tượng mới mỗi lần chạy, nhưng không phải bởi vì chúng ta không thể thay đổi trạng thái internal của đối tượng mà bởi vì một phương thức nào đó đã trả về một đối tượng mới. 


```
result = [
 {1 => 2},
 {2 => 3},
 {3 => 4},
 {1 => 5},
].inject(:merge)
# => {1=>5, 2=>3, 3=>4}
```

`Hash#merge` hợp nhất 2 hash và trả về một hash mới, đó là lý do tại sao chúng ta có thể sử dụng nó dễ dàng với `inject`.

Giờ thử dùng với `each_with_object`:

```
[
 {1 => 2},
 {2 => 3},
 {3 => 4},
 {1 => 5},
].each_with_object({}) {|element, hash| hash.merge!(element) }
# => {1=>5, 2=>3, 3=>4}
```

Thanks for reading!!!

Link: 

https://blog.arkency.com/inject-vs-each-with-object/
https://medium.com/@Fdel15/ruby-each-with-object-or-inject-a737bb90cdd8