Trong Ruby có một class có thể giúp bạn theo dõi một số hoạt động như gọi method, khai báo class, exception,... Và class đó là TracePoint. Nó khá hữu ích khi bạn muốn theo dõi và gọi một hàm cụ thể, bạn có thể xem hàm đó được gọi như thế nào, nó trả về gì.

# Tạo một TracePoint

Dưới đây là một ví dụ tạo một TracePoint để theo dõi các lần gọi hàm từ một method:

```rb
class Foo
  def bar
    yaa
    mod
  end

  def yaa
    mod
  end

  def mod
  end
end

trace = TracePoint.new(:call) do |tp|
  puts "#{tp.defined_class}##{tp.method_id}"
end

trace.enable
Foo.new.bar
trace.disable

# Foo#bar
# Foo#yaa
# Foo#mod
# Foo#mod
```

Với event `:call` bạn có thể theo dõi được các lần Ruby gọi một method bất kỳ. Vì vậy bạn có thể ở trên ta có `trace.enable` và `trace.disable` để đảm bảo `trace` của chúng ta sẽ không theo chạy tất cả mọi lần mỗi lần có phương thức nào đó gọi, mà chỉ giới hạn trong một phạm vi nhất định.

# Các sự kiện có thể theo dõi

Bảng bên dưới liệt kê các sự kiện mà TracePoint hỗ trợ (Ruby 2.5.0):

| Tên sự kiện | Mô tả |
| -------- | -------- |
|line| Chạy code trên một dòng mới |
|class| Khi bắt đầu định nghĩa một Class hoặc Module |
|end| Khi kết thúc định nghĩa một Class hoặc Module |
|call| Gọi một hàm trong Ruby |
|return| Trả về từ một hàm trong Ruby |
|c_call| Gọi một hàm được viết bằng C |
|c_return| Trả về từ một hàm được viết bằng C |
|raise| Khi bắn ra một exception |
|b_call| Bắt đầu một block |
|b_return| Kết thúc một block |
|thread_begin| Khi bắt đầu một thread |
|thread_end| Khi kết thúc một thread |
|fiber_switch| khi chuyển đổi ngữ cảnh |

> **Fiber** là một class trong Ruby dùng tạo các đoạn code có thể dừng và tiếp tục.

# Các phương thức có sẵn

Bảng bên dưới liệt kê các phương thức mà TracePoint hỗ trợ (Ruby 2.5.0):

| Tên phương thức | Mô tả |
| -------- | -------- |
|binding|	Trả về đối tượng binding tạo ra kèm sự kiện	|
|defined_class| Trả về Class hoặc Module mà phương thức đang được gọi|
|disable| Vô hiệu hoá TracePoint |
|enable| Kích hoạt TracePoint |
|enabled?| Kiểm tra trạng thái hoạt động của TracePoint |
|event| Tên sự kiện đang xảy ra |
|inspect|	Trả về một chuỗi chứa trạng thái TracePoint	|
|lineno| Số dòng xảy ra sự kiện |
|method_id|	Tên phương thức được gọi	|
|path| Đường dẫn của file đang chạy |
|raised_exception| Giá trị trả về từ Exception của sự kiện `:raise` |
|return_value| Trả về giá trị từ các sự kiện `:return`, `:c_return`, `:b_return` |
|self| Trả về đối tượng đã tạo ra sự kiện |

# Vẽ luồng gọi hàm với TracePoint

Mình đã viết một gem để mô hình hoá một hàm trong ruby, với ví dụ ở đầu bài ta sẽ có:

![](https://images.viblo.asia/eab4d745-7674-4961-a664-1a2d8c336302.png)

Ví dụ về hàm tính số Fibonacci:

![](https://images.viblo.asia/27d860a4-482d-42e4-8b70-f549ce4e3704.png)

Code:

```rb
def fibonacci n
  return n if (0..1).include? n

  fibonacci(n - 1) + fibonacci(n - 2)
end
```

# Kết luận

Hy vọng bài viết có thể giúp bạn hiểu rõ thêm về `TracePoint` trong Ruby.

Gem mình đã viết

https://github.com/muoihai-com/visual_call_html