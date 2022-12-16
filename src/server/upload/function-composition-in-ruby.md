- Bài viết được dịch từ bài [Function Composition in Ruby](https://medium.com/rubycademy/function-composition-in-ruby-d9ca64f65abb).
- [proc-composition-in-ruby](https://thoughtbot.com/blog/proc-composition-in-ruby)
-----

![](https://miro.medium.com/max/700/1*r9pFRH9R4PGpkFQ2UVxNzQ.jpeg)

---
Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:
* Cách dùng hàm hợp trong Ruby
* Cú pháp thân thiện
* Cách hoạt động với Lambda 
* Hàm hợp và [gõ vịt](https://medium.com/rubycademy/why-ruby-community-encourages-duck-typing-2e5fb529fca1)
* Phía sau một hàm hợp

---

## Hàm hợp (Function composition)
*Trong toán học, hàm hợp là một phép toán nhận hai hàm số f và g và cho ra một hàm số h sao cho h(x) = g(f(x)). Trong phép toán này, hàm số f : X → Y và g : Y → Z được hợp lại để tạo thành một hàm mới biến x thuộc X thành g(f(x)) thuộc Z.*

Trong khoa học máy tính, khái niệm hàm hợp đề cập tới hành động kết hợp nhiều chức năng để xây dựng nên chức năng phức tạp hơn. Trong Ruby 2.6, khái niệm này được biểu diễn đại diện bởi các phương thức `Proc#<<` và `Proc#>>`.
```ruby
increment = proc {|x| x + 1}
double    = proc {|x| x * 2}

(double << increment).call(5) # => 12
```
Vậy chi tiết xảy ra từng bước cụ thể ở ví dụ trên là gì ? 
```ruby
increment = proc {|x| x + 1}
double    = proc {|x| x * 2}

x = 5
x = increment.call(x) # => 5 + 1 = 6
double.call(x)        # => 6 * 2 = 12
```
Khi chúng ta sử dụng toán tử dịch trái, thì Proc bên phải (`increment`) được thực hiện trước và kết quả của lệnh gọi Proc này được truyền dưới dạng đối số của lệnh gọi bên trái (`double`). Cơ chế này tương tự theo hương ngược lại với toán ử dịch phải `>>` khi lệnh bên trái được thực hiện trước

---

## Cú pháp thân thiện
Cú pháp được cung cấp bởi Ruby rất thân thiện với con người và nó cho bạn cơ hội để đảm bảo có được cùng một kết quả theo nhiều cách khác nhau. Cách tiếp cận này cung cấp cho bạn cơ hội để thể hiện giải pháp trực tiếp từ suy nghĩ của bạn. Thật vậy, trong khi ở các ngôn ngữ khác, bạn phải tuân thủ cú pháp duy nhất và tuân theo theo thứ tự thực hiện để đảm bảo kết quả đúng cho chức năng của bạn, trong Ruby bạn không phải đối phó với sự bất tiện này. Ngoài ra, cú pháp có thể đọc một cách dễ dàng hơn với Ruby.

Hãy thử so sánh Ruby với Python:

**Python**
```
import functools

def double(x):
    return x * 2
    
 
def inc(x):
    return x + 1
    
def dec(x):
    return x - 1
    
def compose(*functions):
    return functools.reduce(lambda f, g: lambda x: f(g(x)), functions, lambda x: x)
    
func_comp = compose(dec, double, inc)
func_comp(10) # => 21
```
Như vậy bạn có chắc hiểu được ngay python làm gì không ?
**Ruby**
```
double = proc { |x| x * 2 }
inc    = proc { |x| x + 1 }
dec    = proc { |x| x - 1 }

(dec << double << inc).call(10) # => 21
```
Với ruby thì sao ?

Bạn phải đồng ý rằng cú pháp ruby viết một cách tự nhiên và dễ đọc hơn. Ngoài ra, trong Python, bạn phải chơi theo quy tắc thứ tự các phương thức được truyền dưới dạng đối số của lệnh gọi, để đảm bảo kết quả mong đợi.

Trong Ruby, bạn có thể thay đổi thứ tự thực hiện trong khi vẫn đảm bảo kết quả tương tự mà không có nguy cơ làm lộn xộn mã nguồn của bạn: `(X + 1) * 2 - 1 = 21 # cho X = 10 `
```
(double << inc >> dec).call(10) # => 21
(dec << double << inc).call(10) # => 21
(inc >> double >> dec).call(10) # => 21
```

---

## Hàm hợp với lambdas
**Đầu tiên**, vui lòng xem qua sự khác nhau giữa [Proc vs Lambda](https://medium.com/rubycademy/procs-and-lambdas-46433b93080d) trong bài viết về Ruby, nếu bạn không quen với sự khác biệt giữa hai thằng này.

Vì lambdas và procs đều là các thể hiện của lớp Proc, Thành phần chức năng có thể được sử dụng với cả hai công cụ này:
```ruby
double = proc   { |x| x * 2 }
inc    = lambda { |x| x + 1 }
dec    = proc   { |x| x - 1 }
(dec << double << inc).call(10) # => kết quả vẫn là 21.
```

---

Vì lambdas nghiêm ngặt về số lượng đối số, bạn phải cẩn thận để tránh tác dụng phụ

```ruby
double = proc   { |x| p x * 2 }
add    = lambda { |x, y| x + y }
(double << add).call(1)
```
khi gọi method add => `ArgumentError (wrong number of arguments (given 1, expected 2))` => để không bị lỗi cần truyền đủ 2 đối số:
```ruby
double = proc   { |x| p x * 2 }
add    = lambda { |x, y| x + y }
(double << add).call(1, 2) # => 6****
```
Thật vậy, ở đây kết quả của `add` lambda được thông qua dưới dạng đối số duy nhất của Proc `double`. Vậy (1 + 2) * 2 = 6.

---

## Hàm hợp và gõ vịt
Vậy điều gì sẽ xảy ra nếu tôi nói với bạn rằng Hàm hợp trong Ruby **không chỉ hoạt động với procs và lambdas**?
```ruby
class Triple
  def call(x)
    x * 3
  end
end
increment = ->(x) { x + 1 }
triple = Triple.new
(increment << triple).call(1) # => 4
```
Ở đây `triple` là một instance của class Triple với phương thức `call`. Thật vậy, các phương thức `Proc # <<` và `Proc # >>` mong rằng đối tượng được truyền dưới dạng đối số đáp ứng với phương thức `call`. Hạn chế duy nhất là hàm đầu tiên từ bên trái sang (`increment`) buộc phải là một thể hiện của Proc hoặc một trong các kiểu của nó.

Cái hàm hợp trên này thực hiện theo quy tắc của [nguyên tắc thiết kế gõ vịt](https://medium.com/rubycademy/why-ruby-community-encourages-duck-typing-2e5fb529fca1).
> Khi tôi thấy một con chim mà có thể đi như vịt, bơi như vịt, kêu quác quác như vịt thì tôi gọi nó là con vịt.

do vậy, ở đây ta có thể giả định rằng:
> Nếu một đối tượng hoạt động như một Proc (bằng cách phản hồi y hệt với phương thức `.call`), chỉ cần tiếp tục và coi nó như là một Proc để `call` là được.


---

## Phân tích hàm hợp
Các phương thức `Proc # >>` và `Proc # <<` trả về một thể hiện mới của Proc, sẽ thực thi proc đầu tiên và chuyển giá trị trả về của lệnh gọi proc này làm đối số của proc thứ hai để thực thi. 
Cơ chế này được kích hoạt khi bạn gọi lệnh trên chương trình viết bằng hàm hợp mới được tạo này:
```ruby
a = proc { 42 }
b = proc { |x| x * 2 }
composed_proc = (a >> b) # => #<Proc:0x00007f95820bb908>
composed_proc.call       # => 84
```