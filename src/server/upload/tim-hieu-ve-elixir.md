Hôm nay ngày 30/4 cũng hơi rảnh nên mình đã quyết định dạo quanh trên mạng để tìm thứ gì đó hay ho để học và vô tình tìm thấy Elixir - một ngôn ngữ lập trình đa năng chạy trên nền tảng Erlang được thiết kế để xây dựng các ứng dụng mở rộng và có thể bảo trì.
> *Elixir* is a dynamic, functional language designed for building scalable and maintainable applications.

![](https://elixir-lang.org/images/logo/logo.png)

Mình chỉ tìm hiểu trong thời gian rất ngắn nên vốn hiểu biết hạn hẹp chủ yếu là mình nghiên cứu trên trang chủ chứ chưa đi sâu vào nó. Sau đây sẽ là hiểu biết của mình về ngôn ngữ này.
Ngôn ngữ này được tạo ra bởi *José Valim* (contributor rất nổi tiếng trong cộng đồng Ruby) được phát hành đầu tiên vào năm 2011. Ông có ý tưởng xây dựng ngôn ngữ mới do thiếu công cụ tốt để giải quyết các vấn đề tương tranh trong ngôn ngữ Ruby. Để xây một ngôn ngữ lập trình hàm và dễ dàng bảo trì.
```elixir
Erlang/OTP 21.0 [64-bit] [smp:2:2] [...]

Interactive Elixir (1.10.3) - press Ctrl+C to exit
iex(1)> 40 + 2
42
iex(2)> "hello" <> " world"
"hello world"
```
# Các kiểu cấu trúc dữ liệu
Về cấu trúc dữ liệu thì hầu như các ngôn ngữ đều khá giống và tương đương nhau, có syntax tương đối dễ nhìn.
```elixir
iex> 1          # integer
iex> 0x1F       # integer
iex> 1.0        # float
iex> true       # boolean
iex> :atom      # atom / symbol
iex> "elixir"   # string
iex> [1, 2, 3]  # list
iex> {1, 2, 3}  # tuple
```
Một điều khác là toán tử chia (/) Elixir luôn trả về `float`. Elixir cho phép bỏ dấu ngoặc đơn khi gọi các hàm được đặt tên. như kiểu thực hiện callback dùng arrow function.
# Anonymous functions
Anonymous functions trong Elixir cung cấp cho ta để truyền mã thực thi xong quanh 1 số hoặc 1 chuỗi, được cách nhau bởi 2 từ `fn` và `end` .
```elixir
iex> add = fn a, b -> a + b end
#Function<12.71889879/2 in :erl_eval.expr/5>
iex> add.(1, 2)
3
iex> is_function(add)
true
```
Ví dụ trên mình đã định nghĩa 1 hàm và truyền vào 2 tham số `a` và `b` kết quả trả về giá trị` a + b` . Có thể dùng is_function để kiểu tra xem số lượng tham số truyền vào hàm đó có đúng hay không.
```elixir
iex> is_function(add, 2)
true

iex> is_function(add, 1)
false
```
# Lists
Elixir sử dụng dấu ngoặc vuông để định nghĩa các giá trị bên trong nó,
```elixir
iex> [1, 2, true, 3]
[1, 2, true, 3]

iex> length [1, 2, 3]
3
```
Có thể cộng list bằng toán tử `++` và `--` để xóa phần tử trong list.
```elixir
iex> [1, 2, 3] ++ [4, 5, 6]
[1, 2, 3, 4, 5, 6]

iex> [1, true, 2, false, 3, true] -- [true, false]
[1, 2, 3, true]
```
List ban đầu không được thay đổi, ta chỉ có thể sử dụng khi trả về giá trị cho biến mới. `hd()` để trả  về giá trị đầu tiên của list còn tl() để trả về phần còn lại của list.
```elixir
iex> list = [1, 2, 3]

iex> hd(list)
1

iex> tl(list)
[2, 3]

iex> hd []
** (ArgumentError) argument error
```
Đôi khi Elixir nhận thấy giá trị trả về là 1 list các phần tử *ASCII numbers* nó sẽ in ra danh sách các kí tự tương ứng vs chuỗi số đó.
Hai loại dấu ngoặc đơn và ngoặc kép được định nghĩa giá trị là chuỗi nhưng so sánh lại không trả về kết quả giống nhau.
```elixir
iex> 'hello' == "hello"
false
```
# Tuples
Định nghĩa giống với lists nhưng tuples sử dụng dâu ngoặc nhọn để xác định dữ liệu.
```elixir
iex> {:ok, "hello"}
{:ok, "hello"}

iex> tuple_size {:ok, "hello"}
2
```
Để push phần tử vào 1 tuple ta sử dụng put_elem() :
```elixir

```
# Sự khác nhau giữa Lists và Tuples
Theo mình nghĩ nói cho ngắn gọn thì Lists tương đương với mảng (array) và Tuples thì tương đương với đối tượng (object).
```elixir
iex> list = [1, 2, 3]

iex> [0] ++ list
[0, 1, 2, 3]

iex> list ++ [4]
[1, 2, 3, 4]
```
# Tổng kết
Trên đây là những mình đã tìm hiểu và cảm nhận về ngôn ngữ thú vị này, rất thú vị để bắt đầu với thứ gì mới, các bạn hãy học thử xem sao nhé 😉
## Tham khảo
[https://elixir-lang.org/getting-started/basic-types.html](https://elixir-lang.org/getting-started/basic-types.html)
<br>
[https://elixir-lang.org/crash-course.html](https://elixir-lang.org/crash-course.html)