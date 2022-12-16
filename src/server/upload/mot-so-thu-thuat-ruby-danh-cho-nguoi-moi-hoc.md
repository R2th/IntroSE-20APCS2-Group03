### Word Array

Đây là một cách tạo mảng rất tiện ích mà không phải ai cũng biết:

`%w(vi du 1})=>  # "vi, du, 1"`

### Nối Chuỗi
Đối với các chuỗi lặp đi lặp lại chúng ta có thể dùng toán tử *:

`[1, 2, 3] * 3 == [1, 2, 3, 1, 2, 3, 1, 2, 3] # true`

### Định Dạng Số Thập Phân

Khi bạn muốn hiển thị số thập phân theo một định dạng nhất định:

```
number = 9.5
"%.2f" % number # => "9.50"
```

### Xóa Thư Mục

Đây là công việc tương đối phổ biến mà các lập trình viên phải đối mặt. Có nhiều cách khác nhau để xóa thư mục và đây là một trong những cách ngắn và nhanh nhất để làm công việc trên:

```
require 'fileutils'
FileUtils.rm_r 'somedir'
```

> Lưu ý: Kiểm tra kỹ lưỡng các file trong thư mục trước khi chạy câu lệnh trên vì sau khi xóa các file này không thể hồi phục được

### Massive Assignment
Massive assignment trong Ruby cho phép bạn phải gán giá trị cho nhiều biến cùng một lúc:

`a, b, c, d = 1, 2, 3, 4`

Tính năng này tỏ ra đặc biệt hữu dụng đối với các phương thức với nhiều tham số:

```
def my_method(*args)
  a, b, c, d = args
end
```