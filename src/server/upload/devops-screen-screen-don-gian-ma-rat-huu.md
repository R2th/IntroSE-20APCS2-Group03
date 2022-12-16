# Xin chào các mọi người. Vẫn là series DevOps của mình. Bài tiếp theo là chủ đề screen.
## I. Screen là gì
### 1.1. Một số thông tin về Screen
![image.png](https://images.viblo.asia/36141c6f-3b33-4a5b-adea-beb0068b89e1.png)
Screen là một tool khá hay ho. Nó được sử dụng kết hợp với SSH. Nếu bạn làm việc thực sự nhiều với SSH thì bạn nên biết cả Screen.

Screen cho phép tạo ra nhiều subconnect hay nhiều phiên kết nối hoặc có thể hiểu có thể tạo ra nhiều cửa sổ thao tác cùng lúc thực hiện nhiều việc chỉ với một session SSH. Ngoài ra kết nối có thể hoạt động ngay cả khi kết nối ssh bị ngắt. Screen cũng giúp bạn thao tác với nhiều cửa sổ ngay trong cùng một session ssh.

Screen có sẵn trên Ubuntu. Ngoài ra cũng có thể cài trên Linux.
### 1.2. Các lệnh làm việc với Screen

**Lệnh tạo một socket screen mới**\
`screen`

Tạo một của sổ trong socket mới và socket mới nếu chưa có socket hoặc socket đó đã dettach. Nếu đang trong 1 socket thì chỉ tạo thêm một của sổ trong socket đó.\
`Ctrl a + c`

Chuyển màn hình  giữa các của sổ\
`Ctrl a + a`\
`Ctrl a + 0`\
`Ctrl a + 1`\
`Ctrl a + 2`...

Show các cửa sổ trong session hiện tại\
`Ctrl a + w`\
`Ctrl a + " ` (với các ký tự viết hoa hoặc đặc biệt bạn kết hợp thêm Shift cùng ký tự đó, dú vị Shift a = A )

Đổi tên cửa sổ hiện tại\
`Ctrl a + A`

Chia màn hình hiện tại thành 2 theo chiều dọc\
`Ctrl a + |`

Chia màn hình hiện tại thành 2 theo chiều ngang\
`Ctrl a + S`

Chuyển giữa các màn hình\
`Ctrl a + tab`

Đóng toàn bộ các cửa sổ trên màn hình hiện tại\
`Ctrl a + Q`

**Lệnh tắt một socket bất kỳ**\
`screen -XS 4323 quit`

**Lệnh show các socket kết nối**\
`screen -ls`

**Lệnh ngắt tạm thời một socket**\
`screen -d 4323`\
Nếu muốn tạo thêm một socket khác có thể dùng lệnh này sau đó tạo thêm socket mới

Hoặc\
`Ctrl a + d `\
Dettach socket hiện tại

**Lệnh kết nối lại một socket đang Detached**\
`screen -r 4323`\
![image.png](https://images.viblo.asia/afc3ee9c-70c5-406b-ba72-4eb89147bb39.png)
## II. Cài đặt Screen
Trên Ubuntu đã có sẵn nên trong hướng dẫn cài đặt trên Linux.
Bước 1: Cập nhật\
`sudo yum update && sudo yum upgrade`

Bước 2: Cài đặt dependency\
`sudo yum install epel-release`

Bước 3: Cài đặt Screen\
`sudo yum install screen`

Bước 4: Kiểm tra\
`screen --vesion`

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***