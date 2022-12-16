Tối ưu hóa đệ quy đuôi là một phương pháp tối ưu hóa mà trong đó các hàm đệ quy đuôi được chuyển đổi thành các vòng lặp bởi trình biên dịch. Hàm đệ quy đuôi là một hàm mà trong đó câu lệnh cuối cùng là một lệnh gọi đến cùng một phương thức. Trong khuôn khổ bài viết này, chúng ta sẽ cùng nhau xem xét các chức năng đệ quy đuôi trông như thế nào, tối ưu hóa đệ quy đuôi ra sao và cách bật TCO trong Ruby.

# Đệ quy
Chúng ta hãy cùng nhau xem xét hàm đệ quy tính giai thừa, đây là một trong những ví dụ tiêu biểu của đệ quy đuôi, thông thường chúng ta hay viết hàm đệ quy như thế này
```ruby
def fact(n)
  return 1 if n <= 1
  n * fact(n-1)
end
```

Mặc dù method trên là đệ quy, nhưng không thể gọi nó là đệ quy đuôi, bởi vì dòng cuối cùng là một thao tác chứ không phải là một lời gọi hàm #fact. Hãy cùng xem cách hàm này thực hiện lời gọi đệ quy khi tính toán thực tế với n=4:

```ruby
fact(4)
#=> 4 * fact(3)
#=> 4 * ( 3 * fact(2) )
#=> 4 * ( 3 * ( 2 * fact(1) ) )
#=> 4 * ( 3 * ( 2 * 1 ) )
#=> 4 * ( 3 * 2 )
#=> 4 * 6
#=> 24
```

Chúng ta có thể thấy, các hoạt động tiếp tục "mở rộng" với mỗi lời gọi đệ quy `#fact`. Trình thông dịch cần theo dõi tất cả các giá trị của hàm `#fact` đi kèm với đó là là công thức tính đệ quy ngày càng được mở rộng, và chỉ dừng lại khi gặp trường hợp suy biến. Vì kích thước ngăn xếp bị giới hạn, điều này sẽ gây ra `SystemStackError` cho các giá trị lớn của n.

# Đệ quy đuôi

Và để tránh hình dạng "mở rộng" cũng như là sự phình to bộ nhớ khi mà lời gọi đệ quy ngày càng nhiều. Chúng ta có thể sử dụng thêm một đối số bổ sung cho phương thức, đối số này sẽ theo dõi các giá trị trung gian khi mà lời gọi đệ quy được thực hiện.

```ruby
def fact(n, acc=1)
  return acc if n <= 1
  fact(n-1, n*acc)
end
```

Dưới đây là mô tả quá trình gọi đệ quy khi sử dụng thêm một đối số để lưu lại giá trị sau mỗi lần gọi đệ quy

```ruby
fact(4)
#=> fact(4, 1)
#=> fact(3, 4)
#=> fact(2, 12)
#=> fact(1, 24)
#=> 24
```
Phương pháp này có thể được gọi là đệ quy đuôi. Mặc dù phương pháp này chỉ cần theo dõi hai đối số tại một thời điểm, nhưng điều này vẫn sẽ gây ra `SystemStackError`.

# Tối ưu hóa lời gọi đuôi
Khi tối ưu hóa lời gọi đuôi được bật, các lời gọi đệ quy đuôi có thể được tối ưu hóa để hoạt động như một vòng lặp. Thay vì xếp chồng các lời gọi phương thức trên ngăn xếp (call stack), trình thông dịch sẽ thay thế ngăn xếp trên cùng bằng một cấu trúc dữ liệu mới.

Mặc định thì Ruby không kích hoạt tối ưu hóa cuộc gọi đuôi, nhưng bạn vẫn có thể kích hoạt được nó.

```ruby
# fact.rb

RubyVM::InstructionSequence.compile_option = {
  tailcall_optimization: true,
  trace_instruction: false
}

def fact(n, acc=1)
  return acc if n <= 1
  fact(n-1, n*acc)
end

fact(1000)
```

Khi phương thức được gọi ví dụ `fact (4, 1)`, câu lệnh cuối cùng trong phương thức có thể được biểu diễn dưới dạng `fact (3, 4)`. Nhưng thay vì thực hiện một lời gọi đệ quy như thông thường thì lúc này trình thông dịch có thể thay thế nội dung của các đối số ở đầu ngăn xếp và nhảy đến bước bắt đầu phương thức.

Do đó, kích thước ngăn xếp không ảnh hưởng đến quá trình gọi đệ quy và bạn không gặp phải lỗi tràn bộ nhớ nữa.