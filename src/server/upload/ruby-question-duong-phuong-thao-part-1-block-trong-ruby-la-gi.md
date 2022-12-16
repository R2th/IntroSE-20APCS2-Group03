Series lần này sẽ tiếp tục với người đồng đội đã ăn code được 5 tháng với mình.
![](https://images.viblo.asia/5a4e2fdc-6704-4c95-b9f8-ad9a80c9c38c.png)

Câu hỏi của bạn ý hơi dài, nên chắc mình sẽ chia làm 3 part, bắt đầu thôi. :)
### Khái niệm
Block là một phần nền tảng của cú pháp vòng lặp trong Ruby, chúng ta có thể thấy
```
1.upto(10) {|x| puts x } 
1.upto(10) do |x| 
  puts x
end
```
Trong cú pháp vòng lặp, chúng ta đã biết `1` là `object`,  `.upto(10)` là `iterators method ` được gọi trên `object`đó và phần còn lại chính là `Block`. Ta có thể định nghĩa, 
> `Block` trong Ruby là một phần của cú pháp vòng lặp, được bao bọc bởi `do .. end` hoặc cặp dấu curly braces `{}`

### Block syntax
`Block` không đứng một mình, **khi block đứng một mình, nó trở lên vô nghĩa**. `Block` luôn phải đi kèm một lời gọi phương thức. Nếu bạn đặt `Block ` đứng sau một lời gọi `method` nào đó **mà không phải là một** `iterator method` (loại `method` mà không gọi `block` bằng câu lệnh `yield`) thì `block` của bạn sẽ bị "bơ đẹp". Hãy cùng xem ví dụ sau:
```
class Person
  def xinchao
    puts "xinchao"
  end
end

irb(main):006:0> Person.new.xinchao { |x| puts x }
xinchao
=> nil
```
Như các bạn thấy, `method` `.xinchao` là một `method` không dính dáng gì đến câu lệnh `yield`. Bạn truyền một chiếc `block` `{ |x| puts x }` vào nó,  nó vẫn chạy, nhưng chiếc `block` bạn truyền vào thì thật **vô dụng**. Để chiếc `block` này không bị tự ái, mình sẽ tìm cách cho nó trở thành thứ có ích, bằng cách rất đơn giản là thêm một câu lệnh `yield` vào method `xinchao` . Nào ta cùng xem:
```
class Person
  def xinchao
    puts "xinchao"
    yield #Them yield vao ne
  end
end

irb(main):020:0> Person.new.xinchao { puts "Cho block vào nè" }
xinchao
Cho block vào nè
=> nil
```
Đấy, vậy chốt lại là `block` chỉ có tác dụng với những method liên quan đến `yield`, còn để hiểu kỹ xem `yield` chạy như nào thì phải giải thích khá dài dòng. Tuy nhiên ở ví dụ trên, các bạn chỉ cần hiểu đơn giản `yield` là một phần thân của `method`, khi `yield` được gọi, nó sẽ thực thi code ở trong `block` đứng sau `method `đó.

Có 3 điều các bạn cần nhớ về cú pháp viết blog:

**Một là** 
> Chiếc ngoặc nhọn đầu tiên `{ `hoặc keyword `do` luôn phải nằm cùng dòng với lời gọi `method` 

Nếu không **trình thông dịch Ruby** sẽ hiểu phần tử đứng sau lời gọi phương thức là dấu `\n` (dấu xuống dòng) và `block` sẽ **đứng một mình** - đồng nghĩa với việc **trở lên vô dụng.**
```
# Cách viết chuẩn
1.upto(10) {|x| puts x } 
1.upto(10) do |x|
  puts x
end

#Cách viết sai quy ước
1.upto(10) # No block specified
{|x| puts x } # Syntax error: block not after an invocation
```

**Hai là**
> Để ý dấu ngoặc đơn `()` của tham số truyền vào `method`

Cú pháp của Ruby rất **buông thả**, **lẳng lơ** . Các dấu ngoặc đơn `()` thường xuyên bị bỏ đi ở trong Ruby, và nó cũng chính là nguyên nhân gây ra nhiều `syntax error` nhất  khi chúng ta code Ruby. Cụ thể với block, bạn nên cân nhắc kỹ nên sử dụng `do .. end` hay `{}` với các `method `đi kèm với tham số. Xem ví dụ dưới đây sẽ hiểu ngay:
```
1.upto(3) {|x| puts x } # Code chạy
1.upto 3 do |x| puts x end # Code chạy
1.upto 3 {|x| puts x } # Code không chạy đâu, raise exception đóa!
```

**Ba là**
> `Block` cũng có thể truyền tham số vào, tham số của `block` được bọc bằng dấu `||`

Ta có thể truyền nhiều tham số vào `block`, cách các tham số này được gọi liên quan trực tiếp đến câu lệnh `yield`, xem 2 ví dụ dưới đây để hiểu nhé:

```
class P
  def initialize a,b
    @a = a
    @b = b
  end

  def xinchao
    yield @a  #loop 1
    yield @b  #loop 2
  end
end

=> :xinchao
irb(main):048:0> P.new(4,5).xinchao do |n|
irb(main):049:1* puts n
irb(main):050:1> end
4
5
=> nil
```

```
class P
  def initialize a,b
    @a = a
    @b = b
  end

  def xinchao
    yield @a, @b  #loop 1
  end
end

=> :xinchao
irb(main):048:0> P.new(4,5).xinchao do |n,m|
irb(main):049:1* puts n
irb(main):050:1* puts m
irb(main):051:0> end
4
5
=> nil
```
Qua hai ví dụ trên, các bạn có thể thấy đoán ra được cách để gán giá trị cho tham số của `block` thông qua câu lệnh `yield` ứng với mỗi vòng lặp. Mỗi câu lệnh `yield` sẽ chỉ được thực thi trong một vòng lặp, tương ứng với thứ tự xuất hiện của nó trong `method`( câu lệnh `yield` đầu tiên sẽ được thực hiện trong vòng lặp đầu tiên, câu lệnh `yield `thứ hai sẽ được thực hiện trong vòng lặp thứ 2). Điều này tương ứng với việc, số câu lệnh `yield` sẽ bằng với số vòng lặp trong `method`. Để giải thích rõ hơn về cách gán đối số(arguments) cho tham số(parameters) của `block` thông qua câu lệnh `yield`, chúng ta sẽ đi tới phần tiếp theo nhé.

### Passing Arguments to a Block
Việc truyền tham số vào một `method` , có vài điểm khác với việc truyền tham số vào một `block` .Như chúng ta đã biết, đối với một method thông thường, việc gán đối số(argument) cho tham số(parameter) hoạt động như sau:
```
def method a,b   #a , b là 2 tham số của method
  .....
end

method(5,6) # Quá trình gán xảy ra với: a = 5, b =6.
```
Tuy nhiên đối với một `block` việc truyền tham số sẽ phụ thuộc vào **số vòng lặp** . Cụ thể, với trường hợp có một tham số `|n|` và 3 vòng lặp
```
class P
  def iterator_method a,b,c
     yield a
     yield b
     yield c
  end
end

P.new.iterator_method(a,b,c) do |n| # loop 1: n = 5, loop 2: n = 6, loop 3: n = 7
endirb(main):026:0> P.new.iterator_method(5,6,7) do |n|
irb(main):027:1* puts n
irb(main):028:1> end
5
6
7
=> nil
```
Chúng ta có thể thấy, giá trị đối số(argument) của `block` đứng ngay sau câu lệnh `yield` ở phần định nghĩa hàm (Chính là a,b và c). Ở vòng lặp số 1, `n` sẽ được gán bằng 5; ở vòng lặp số 2 , `n = 6` và ở vòng lặp số 3, `n = 7` .  

Chúng ta cũng có thể truyền nhiều tham số cho `block` trong một vòng lặp với cú pháp như sau. 
```
class P
  def iterator_method a,b,c
     yield a,b,c 
  end
end

irb(main):035:0> P.new.iterator_method(5,6,7) do |n,m,h|
irb(main):036:1* puts n + m + h
irb(main):037:1> end
18
=> nil
```
Như trong ví dụ trên, ta đã truyền giá trị cho 3 tham số `|n,m,h|` của block trong một vòng lặp, với `n = 5` , `m = 6` , `h = 7` .

Với `method`, khi ở phần định nghĩa `method` có 2 tham số, nhưng khi gọi ta lại chỉ truyền 1 đối số (`arguments`), code sẽ chạy như thế nào. Cùng nhìn ví dụ bên dưới:
```
 class P
   def xinchao a,b
     puts "xinchao"
   end
 end

irb(main):049:0> P.new.xinchao 1
Traceback (most recent call last):
        5: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `<main>'
        4: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `load'
        3: from /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        2: from (irb):49
        1: from (irb):45:in `xinchao'
ArgumentError (wrong number of arguments (given 1, expected 2))
```
Như chúng ta đã thấy, trình thông dịch Ruby sẽ trả về một exception `ArgumentError (wrong number of arguments (given 1, expected 2))` .

Tương tự , với một `block` có 2 tham số, nhưng ta lại chỉ `yield` một đối số, code sẽ chạy như thế nào:
```
class P
  def xinchao
    yield 5
  end
end

irb(main):064:0> P.new.xinchao do |n,m|
irb(main):065:1* puts n
irb(main):066:1> puts m.class
irb(main):067:1> end
5
NilClass
=> nil
```
Trong trường hợp này, với `block`, code vẫn chạy bình thường mà không trả lại một `exception` nào cả, các `parameters` không được gán giá trị(ở đây là `m` ) sẽ mặc định được gán với `nil`. Vậy tóm lại, điểm khác biệt giữa `parameters` của `block` và `method` được tóm gọn trong hai cụm từ : **vòng lặp** và **giá trị mặc định của parameters** .

###  Block and variable scope
`Block` tạo ra một `scope` riêng biệt cho các biến. Điều này có nghĩa là, tất cả các biến được định nghĩa bên trong `block` sẽ vô nghĩa khi được sử dụng bên ngoài block.
```
irb(main):005:0> 1.times { a=15 }
=> [9, 8]
irb(main):006:0> puts a
NameError (undefined local variable or method `a' for main:Object)
```
Ở chiều ngược lại, nếu một biến `a` được định nghĩa ở bên ngoài `block`, khi sử dụng lại biến `a` ở bên trong `block` chúng ta cùng thử xem ví dụ dưới đây xem kết quả ra sao.
```
irb(main):001:0> a = 15
=> 15
irb(main):002:0> 1.times { a = 10 }
=> 1
irb(main):003:0> puts a
10
```
Như chúng ta đã thấy, `block` sẽ không tạo ra một biến `a` mới mà nó sử dụng luôn biến `a` đã được định nghĩa ở bên ngoài `scope` và thay đổi giá trị của biến `a` này. Đây là một lưu ý quan trọng với cách đặt **tên biến** của các bạn. Tuy nhiên, ở đây mình chỉ nói về **biến** ở trong `block`, **BIẾN** thôi nhé! Giả sử với `block` dưới đây:
```
irb(main):001:0> n =10
=> 10
irb(main):002:0> 1.times do |n|
irb(main):003:1* n = 5
irb(main):004:1> puts n
irb(main):005:1> end
5
=> 1
irb(main):006:0> n
=> 10
```
Các bạn có thể thấy, giá trị của `n` ở trong và ngoài `block` khác nhau. Lý do là vì `n` ở trong `block` không phải là **biến**, nó là một **tham số**. Tham số(parameter) của một `block` luôn là `local` ở trong `scope` của nó. Tức là trong ví dụ trên, tham số `n` ở trong `block` khác với biến `n` được định nghĩa trước đó ở bên ngoài `block`. 

Qua bài viết vừa rồi, mình đã tóm lược những điểm cơ bản mà bạn cần hiểu về `block` trong Ruby, cùng chờ đợi các part tiếp theo với phần giải thích về `proc` , `lambda` và `closure` nhé



-----

References: [The Ruby Programming Language ( O'Reilly)](https://theswissbay.ch/pdf/Gentoomen%20Library/Programming/Ruby/The%20Ruby%20Programming%20Language%20-%20Oreilly.pdf)