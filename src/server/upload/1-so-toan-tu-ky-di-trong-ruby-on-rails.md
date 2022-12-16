Bên cạnh những toán tử quen thuộc kiểu nhà nhà đều biết, người người đều dùng như các toán tử số học `+`, `-`, `*`, `/` hay các toán tử so sánh `==`, `!=`, `>`, `<` ... thì trong Ruby on Rails cũng có những toán tử "kỳ dị", với `syntax` sẽ ít nhiều gây khó hiểu cho chúng ta khi vô tính gặp phải chúng trong quá trình Dev.
Và ở bài viết này mình sẽ cố gắng "diễn tả" ý nghĩa của 1 vài toán tử "kỳ dị" này theo hướng đơn giản nhất nhá :D :D :D

### Shovel Operator (<<)
Với nhiều người thì đây có thể là 1 loại toán tử quen thuộc và hay sử dụng. Tuy nhiên, với 1 vài bạn mới làm quen với lập trình và đặc biệt với Ruby on Rails thì nó có thể là "lạ lẫm". Nên mình vẫn sẽ list nó trong danh sách này
Toán tử này sẽ hoạt động khác nhau tùy trên mỗi kiểu dữ liệu , cụ thể:

#### Array
```Ruby
2.6.0 :005 > arr = [1,2,3]
 => [1, 2, 3] 
2.6.0 :006 > arr << 4
 => [1, 2, 3, 4]
```

#### String
```Ruby
2.6.0 :034 > a = “aniket”
 => “aniket” 
2.6.0 :035 > a.object_id
 => 10355360 
2.6.0 :036 > a << “shivam”
 => “aniketshivam” 
2.6.0 :037 > a.object_id
 => 10355360
```

*  Chú ý: ngay cả bạn nối thêm vào chuối thì `object_id` cũng k thay đổi.

#### Hash
```Ruby
hsh = Hash.new([])

hsh[:one] << 'one'
hsh[:two] << 'two'
hsh
# => {}
```

* Để tìm hiểu sâu về ruby `hash` bạn có thể tham khảo từ liên kết ở [đây](https://stackoverflow.com/questions/16159370/ruby-hash-default-value-behavior)

#### Integer
Giả sử bạn số nguyên 5. Với toán tử `<<` thì sẽ được
```Ruby
2.6.0 :010 > 5 << 2

=> 20
```

* Có thể thấy khi sử dụng toán tử `<<` với số nguyên thì ta sẽ thấy kết quả bằng với toán tử dịch trái :D

### Spaceship Operator (<=>)
Về cơ bản thay vì trả về 1 (đúng) hoặc 0 (sai) tùy thuộc vào việc các đối số là bằng hay không bằng nhau, toán tử "tàu vũ trụ" =)) sẽ trả về 1, 0 hoặc −1 tùy thuộc vào giá trị của đối số bên trái so với đối số bên phải.
```Ruby
a <=> b :=
  if a < b then return -1
  if a = b then return  0
  if a > b then return  1
  if a and b are not comparable then return nil
```

### Pipe Operator (|)
Về cơ bản, nó là toán tử OR. Giả sử 1 | 2 = 3  --> tại sao lại thế
Sâu bên dưới core thì điều j đã xảy ra nhỉ?
```Ruby
1 = 0001
2 = 0010
--------
3 = 0011 <- result
```
1 ví dụ khác nhé `10|2 = 10`
```Ruby
10 = 1010
2  = 0010
--------
10 = 1010 <- result
```

### Tilt Operator (~)
Nó được biết đến như là toán tử kết hợp trên mạng và có thể được sử dụng để khớp chuỗi với biểu thức chính quy. Nếu một kết quả khớp được tìm thấy, chỉ mục của kết quả khớp đầu tiên trong chuỗi được trả về. Nếu chuỗi không thể được tìm thấy, nil sẽ được trả lại.
```Ruby
/abc/ =~ "abcdef"
```
Trong trường hợp này, biểu thức trả về 0, vì tìm thấy "abc" là chỉ số khớp đầu tiên trong chuỗi. 1 ví dụ khác:
```Ruby
/xyz/ =~ "abcdef"
```
trả về nil bởi vì không thể tìm thấy "xyz" bất cứ nơi nào trong chuỗi.

### Safe navigation Operator (&.)
Tương tự như `try`, nhưng sẽ đưa ra một ngoại lệ `NoMethodError` nếu phương thức gọi đến bị lỗi. Chi tiết hơn các bạn có thể xem ở 1 [bài viết](https://viblo.asia/p/su-dung-trong-ruby-gAm5yvAOKdb) về toán tử này của mình :D

### Power Operators (**)

Khi bạn muốn tìm Số mũ của một số nào đó thì bạn có thể sử dụng toán tử `**`.  Ví dụ dưới đây sẽ giải thích rõ hơn:
```Ruby
2.6.0 :014 > 2 ** 3
 => 8 
2.6.0 :015 > 2 ** 4
 => 16
```

### Splat Operator (*)

Ý tưởng chính là bất cứ khi nào bạn không muốn chỉ định số lượng đối số bạn có, bạn sẽ sử dụng toán tử splat. Ví dụ đơn giản nhất sẽ là một cái gì đó như thế này:
```Ruby
2.6.0 :016 > def unknown_amount(*args)
2.6.0 :017?> p args
2.6.0 :018?> end
 => :unknown_amount 
2.6.0 :019 > unknown_amount(1, 2, 3) 
[1, 2, 3]
 => [1, 2, 3]
```

Bạn cũng có thể sử dụng toán tử `*` để lấy bất kỳ phân đoạn nào của mảng:
```Ruby
2.6.0 :020 > first, *rest, last = [“a”, “b”, “c”, “d”]
 => [“a”, “b”, “c”, “d”] 
2.6.0 :021 > p first
“a”
 => “a” 
2.6.0 :022 > p rest
[“b”, “c”]
 => [“b”, “c”] 
2.6.0 :023 > p last
“d”
 => “d”
```

### Scope Resolution Operator `(::)`

Nó cho phép bạn truy cập các mục trong các mô-đun hoặc các mục cấp độ trong các lớp
```Ruby
2.6.0 :071 > module Foo
2.6.0 :072?> MR_COUNT = 1
2.6.0 :073?> ::MR_COUNT = 2 
2.6.0 :074?> MR_COUNT = 3 
2.6.0 :075?> end

2.6.0 :076 > puts MR_COUNT # this is the global constant
2

2.6.0 :077 > puts Foo::MR_COUNT # this is the local "Foo" constant
3
```

Trên đây là 1 vài ví dụ về các toán tử "kỳ dị" có thể bạn chưa biết. Để xem lại 1 cách đầy đủ các toán tử trên hoặc các toán tử khác nữa bạn có thể tham khảo ở [đây](https://www.tutorialspoint.com/ruby/ruby_operators.htm)

Bài viết tham khảo từ: https://medium.com/@aniket.tiw/ruby-on-rails-operators-48b784b872c2