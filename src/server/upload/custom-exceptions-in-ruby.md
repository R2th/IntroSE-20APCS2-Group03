Hôm nay chúng ta sẽ cùng nhau tự custom 1 exception trong Ruby xem có gì vui không nhé. Here we go !
## 1. Tạo một Class
Exceptions là những clas, cũng như những thứ khác trong Ruby, để tạo một exception, chỉ việc tạo một class kế thừa StandardError, hoặc là con của nó
```
class MyError < StandardError
end

raise MyError
```
Theo convention thì chúng ta sẽ đặt tên class có đuôi là "Error", một best practice khác đó là đặt exceptopm của chúng ta trong 1 module.
Như vậy cuối cùng chúng ta sẽ có 1 class lỗi có dạng như ActiveRecord::RecordNotFound and Net::HTTP::ConnectionError.

## 2. Thêm tin nhắn lỗi
Mọi đối tượng exception trong ruby đều có một thuộc tính message, nó được ghi bên cạnh tên exception 
![](https://images.viblo.asia/15999af0-5c85-4b4c-8ac6-4b7fad0c224b.png)
Bạn có thể tuỳ chỉnh message khi raise exception: 

```
raise MyError, "My message"
```

Bạn cũng có thể thêm message mặc định vào class lỗi bằng cách đưa vào hàm dựng

```
class MyError < StandardError
  def initialize(msg="My default message")
    super
  end
end
```

## 3. Thêm các thuộc tính custom data vào exception
Bây giờ bạn có thể thêm các custom data vào exception như ở trong mọi class khác, chỉ cần thêm thuộc tính vào class và update hàm dựng
```
class MyError < StandardError
  attr_reader :thing
  def initialize(msg="My default message", thing="apple")
    @thing = thing
    super(msg)
  end
end

begin
  raise MyError.new("my message", "my thing")
rescue => e
  puts e.thing # "my thing"
end
```

## 4. Rescue Exception hay Standard Error?
Ở ví dụ trên, chúng ta chỉ kế thừa từ StandardError, và hầu như không nhắc gì đến Exception. Kế thừa từ Exception khá là tệ vì nó sẽ phá vỡ hành vi của rescue.
Phần này mình sẽ giải thích rõ hơn.
- Tại sao không nên rescue Exception

Vấn đề của rescue exception đó là nó sẽ thực sự rescue tất cả exception kế thừa từ Exception. Không vui lắm nhỉ
Chuyện này xảy ra bởi vì một số exception được thừa kế nội bộ trong Ruby, và đôi khi nó sẽ tạo ra những rắc rối không đáng có 
```
SignalException::Interrupt - Nếu như bạn rescue nó, bạn không thể thoát ứng dụng bằng cách Ctrl C.

ScriptError::SyntaxError - ("Forgot something) sẽ sai một cách âm thầm.

NoMemoryError - Tại sao bạn lại muốn biết điều gì sẽ xảy ra khi chương trình của bạn tiếp tục chạy sau khi đã dùng hết RAM ?
```

```
begin
  do_something()
rescue Exception => e
  # Don't do this. This will swallow every single exception. Nothing gets past it. 
end
```
- Sử dụng StandardError thay thế

Tất cả các exception mà chúng ta quan tâm kế thừa từ StandardError, ví dụ như: NoMethodError, TypeError, RuntimeError.
Để rescue lỗi như vậy, chúng ta sẽ rescue StandardError

```
begin
  do_something()
rescue StandardError => e
  # Only your app's exceptions are swallowed. Things like SyntaxErrror are left alone. 
end
```

Nhưng Ruby hỗ trợ chúng ta khá nhiều trong vụ này, khi bạn không chỉ đích danh exception class, ruby sẽ tự hiểu đó là StandardError. Vì vậy bạn có thể viết như này: 

```
begin
  do_something()
rescue => e
  # This is the same as rescuing StandardError
end
```

## 5. Kết luận
Well, vậy là việc tạo ra một custom error hay exception trong Ruby không quá khó, mong là bạn sẽ có thêm những trải nghiệm vui vẻ với Ruby. Peace :D

Nguồn tham khảo: http://blog.honeybadger.io/ruby-custom-exceptions/