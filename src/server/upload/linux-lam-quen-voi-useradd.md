![](https://images.viblo.asia/9eb03000-c479-4ea9-8374-ac187b489bf8.jpeg)

Nếu có nhiều người đang sử dụng máy Linux của bạn ở nhà hoặc bạn đang quản lý một máy chủ cung cấp quyền truy cập cho nhiều users, lệnh `useradd` là điều cần thiết để tạo user.

Ngoài ra, nhiều dịch vụ bạn sử dụng với tư cách là developer có thể yêu cầu tài khoản người dùng của họ hoạt động. Vì vậy, ngay cả khi sử dụng trên máy cá nhân, bạn có thể thấy mình đang tiếp cận các câu lệnh này khi bạn cài đặt MySQL hoặc một cái gì đó tương tự.

Bạn có thể có được một cái nhìn tổng quan đầy đủ về các tùy chọn khác nhau có sẵn cho bạn bằng cách gõ câu lệnh: `man useradd`

Nhưng nếu điều đó là quá sức, thì đây là bảng phân tích một số tùy chọn phổ biến bạn có thể sử dụng khi tạo user.

# Create a user
Format đơn giản cho lệnh này là useradd [options] USERNAME.

Ví dụ:  useradd test (với tư cách là root user - tiền tố với sudo nếu bạn chưa đăng nhập với quyền root).

Điều này sẽ tạo ra một user được gọi là test, nhưng đó là một hoạt động hạn chế và sẽ không tạo ra những thứ hữu ích khác như home directory hoặc password.

# Add a password
Sau đó, bạn thêm password cho user test bằng cách sử dụng lệnh `passwd`: `passwd test`. Điều này sẽ nhắc bạn nhập password cho user test này.

> Có một tùy chọn để thêm mật khẩu được mã hóa thông qua tùy chọn `-p` trên `useradd`, nhưng điều này không được khuyến nghị cho mục đích bảo mật.

Lưu ý rằng tùy chọn `-p` không cho phép bạn nhập password văn bản gốc, nó sẽ yêu cầu bạn mã hóa nó trước. Điều này khó khăn, bởi vì bạn không nên làm điều đó! Chỉ cần sử dụng lệnh `passwd`.
# Other common options
## Home directories
Để tạo một user với thư mục home mặc định, hãy sử dụng tùy chọn sau:

`useradd -m test`

User này hiện có một thư mục` /home/test`.

Để thay đổi thư mục home, bạn có thể vượt qua một tùy chọn bổ sung để sửa đổi điều này, ví dụ:

`useradd -m -d /alternate test`

## Shell
Theo mặc định, user được tạo của bạn sẽ có khả năng đăng nhập mặc định `bin/bash` hoặc `bin/sh`, sẽ được xác định trong `/etc/default/useradd`.

Bạn có thể ghi đè mặc định này bằng tùy chọn -s:

`useradd -s usr/bin/zsh test`

## Putting it all together
Để xây dựng toàn bộ lệnh, bạn đặt các tùy chọn lần lượt - thứ tự không quan trọng - và kết thúc bằng username bạn muốn tạo.

Vì vậy, việc tạo một user với một thư mục home và một customized shell sẽ trông như thế này:

`useradd -m -s /usr/bin/zsh user`

Và sau đó bạn sẽ thêm một password cho user:  `passwd user`


## Read the Fine Manual
Bây giờ bạn đã thấy những điều cơ bản về những gì công cụ này có thể làm.

`man useradd` sẽ chỉ cho bạn cách thêm những thứ chẳng hạn như ngày hết hạn account, assign groups, ... .


# Tham khảo
https://www.freecodecamp.org/news/linux-how-to-add-users-and-create-users-with-useradd/