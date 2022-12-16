![](https://images.viblo.asia/0acfb405-8a64-4b92-9693-94b32c0c3e7a.jpg)


Khi chúng ta làm việc với bất kì một ngôn ngữ nào, có rất rất nhiều lí do để khai báo một `hàm/phương thức` và rồi sử dụng lại nó. Trong bất kì một ngôn ngữ nào, có tương đối nhiều cách gọi một `hàm/phương thức`, nhưng có bao giờ bạn nghĩ rằng trong một dự án, chỉ sử dụng một cách gọi `hàm/phương thức` duy nhất.

<br>

*`Bài viết này sẽ lấy ngôn ngữ Ruby và các cách gọi hàm của Ruby`.*
# Setup
Lấy một ví dụ đơn giản nhất. Có một class `User` , nó có một attribute là `name`, và phương thức được gọi là `Hello`, phương thúc này sẽ in ra màn hình dòng xin chào, bao gồm cả tên user.

```Ruby
class User
  def initialize(name)
    @name = name
  end

  def hello
    puts "Hello, #{@name}!"
  end

  def method_missing(_)
    hello
  end
end

user = User.new('MayFest')
```

# Call method

## 1. Cách hiển nhiên
```Ruby
user.hello()
```
Đơn giản như bao ngôn ngữ khác, đối tượng chấm phương thức là cách gọi hiển nhiên nhất.
Riêng ruby thì có thể bỏ thêm vài khoảng trắng trước và sau dấu chấm `user  .  hello()`, tất nhiên là nó vẫn sẽ hoạt động.

## 2. Bỏ dấu ngoặc đơn
```Ruby
user.hello
```
Dấu ngoặc đơn là một lựa chọn sử dụng có hoặc không trong ruby. Bỏ đi để trông ngắn ngọn hơn, nhưng đôi khi nó là cấn thiết để thể hiện sự chặt chẽ.

## 3. Sử dụng `send` và `public_send`
```Ruby
user.send(:hello)
user.public_send(:hello)
```
Hoặc
```Ruby
user.send("hello")
user.public_send("hello")
```


`Send` và `public_send` được định nghĩa trong mọi lớp. Trong trường hợp này, đưa tên của phương thức làm đối số của `send` hoặc `public_send`. Sự khác nhau cơ bản giữa `send` và `public_send` là quyền riêng tư của phương thức. Nếu cố gắng gọi `send` cho một phương thức private thì sẽ có lỗi xảy ra.
## 4. Sử dụng `method` kết hợp `call`
```Ruby
user.method(:hello).call
```
Gọi `user.method(:hello).call` sẽ trả lại một thể hiện của lớp `Method`. Từ đó có thể tham chiếu đến một đối tượng mới, vì thế, có thể thay đổi biến `name`, nó biến trả lại sẽ được sử dụng.
```Ruby
method = user.method(:hello)
user.set_instance_variable(:@name, "JuneFest")
method.call() # prints "Hello, JuneFest!"
```
## 5. Sử dụng `tap`
```Ruby
user.tap(&:hello)
```
Đối số yêu cầu của tap là một block, sẽ được thực thi và trả lại chính nó. Ít thứ để nói về tap nhưng nó sẽ rút ngắn code trong một vài trường hợp nhất định.

## 6. Sử dụng `to_proc`
```Ruby
:hello.to_proc.call(user)
```
Chỉ đơn giản là đưa phương thức về một `Proc` rồi sử dụng `call`. Để ý thì thấy rằng nó khá ngược, `user` lại trở thành đối số của phương thức, nhưng trong một số trường hợp chúng ta cẩn thay đổi cấu trúc hoặc logic của phương thức đối với từng `user` nhất định. Cấu trúc này sẽ bỏ số lượng lớn dòng code `if else`.
## 7. Sử dụng `method_missing`
```Ruby
class User
  def method_missing(_)
    hello
  end
end

user.i_am_a_lizard_king # prints "Hello, MayFest!"
user.i_can_do_everything # prints "Hello, MayFest!"
```

`method_missing` là một phương thức sẽ được thực thi khi đối tượng gọi đến một phương thức chưa được dịnh nghĩa. Nó sẽ rất hiệu quả trong trường hợp nắm bắt một số tính năng có ý gọi. Nó là một thể hiện đặc trưng cho tính linh động của ngôn ngữ Ruby. Nhưng đôi khi nếu gặp lỗi xảy ra ở đây thì sẽ mất kha khá thời gian để tìm và sửa được nó.

## 8. Sử dụng `eval`
```Ruby
eval("user.hello")
```
`eval` chuyển chuỗi tới trình phân tích cú pháp và trình thông dịch Ruby giống như thể nó là một phần trong mã, và sau đó thực thi mã. Bạn chắc chắn, tuyệt đối tránh sử dụng nó trong mã của mình, đặc biệt nếu bạn cho phép người dùng chuyển một số giá trị vào ứng dụng của mình.
# Kết
Trên đây là một số cách gọi `phương thức/hàm` trong Ruby. Có thể thấy với mỗi hoạt cảnh khác nhau, chúng ta nên sử dụng cách gọi chính xác và ngắn gọn nhất.<br>

Về cơ bản, Ruby là một ngôn ngữ linh hoạt, sẽ có rất nhiều cách gọi với một vấn đề, nhưng nên sử dụng cách đặc trưng nhất sao cho code vừa ngắn gọn lại vừa dễ hiểu.

Source: https://www.notonlycode.org/12-ways-to-call-a-method-in-ruby/