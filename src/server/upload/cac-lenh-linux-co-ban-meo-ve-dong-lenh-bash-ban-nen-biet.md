![](https://images.viblo.asia/7302da98-dd27-4906-9c40-1ab90ecc6f4c.png)

Linux có rất nhiều lệnh, nhưng hầu hết mọi người chỉ sử dụng một phần trong số đó. Dưới đây là một số lệnh Linux được sử dụng nhiều nhất để sử dụng trong terminal.

Trước tiên, chúng ta sẽ đề cập đến một số mẹo sẽ giúp dòng lệnh dễ sử dụng hơn:

* Sử dụng tab để tự động hoàn thành. Sau khi bạn bắt đầu nhập một cái gì đó trong terminal Linux, nhấn tab và nó sẽ gợi ý các tùy chọn có thể bắt đầu với chuỗi bạn đã nhập cho đến nay.
* Sử dụng `ctrl+r search_term` để tìm kiếm các lệnh bạn đã sử dụng trước đó.
* Nhanh chóng di chuyển đến đầu hoặc cuối của một dòng với `ctrl+a` và `ctrl+e`.
* Sử dụng lại lệnh trước đó trong lệnh hiện tại với `!!`.
* Bạn có thể chạy nhiều lệnh trong một dòng bằng cách tách các lệnh bằng `;`.

Đã đến lúc học các lệnh Linux phổ biến. Bạn có thể nhận thêm thông tin về bất kỳ lệnh nào trong số này bằng cách sử dụng lệnh `man`. Điều này sẽ đưa lên trang hướng dẫn cho một lệnh. Ví dụ, nếu bạn gõ `man cat` vào terminal linux, bạn sẽ có thêm thông tin về lệnh `cat`.

## ls
Liệt kê nội dung thư mục. 

Ví dụ: `ls /applications` sẽ hiển thị tất cả các tệp và thư mục được lưu trong thư mục applications.

## cd
Thay đổi một thư mục. 

Ví dụ: Thay đổi từ thư mục hiện tại thành /usr/local với `cd /usr/local`.

## mv 
Đổi tên hoặc di chuyển tập tin hoặc thư mục. 

Ví dụ: lệnh `mv todo.txt /home/qlarson/Documents` sẽ di chuyển "todo.txt" vào thư mục "Documents".

## mkdir
Tạo một thư mục mới. 

Ví dụ: `mkdir freecodecamp` sẽ tạo một thư mục có tên "freecodecamp".

## rmdir
Xóa các thư mục trống.

## touch
Tạo một tập tin trống với tên được chỉ định.

## rm
Xóa một hoặc nhiều tệp hoặc thư mục.

Ví dụ: `rm todo.txt` sẽ xóa tệp.

## locate
Xác định vị trí một tập tin cụ thể. 

Ví dụ: `locate -i vacuum*mop` lệnh sẽ tìm kiếm bất kỳ tệp nào chứa từ "vacuum" và "mop". Lệnh `-i` làm cho trường hợp tìm kiếm không phân biệt chữ hoa và chữ thường.

## clear
Xóa màn hình/cửa sổ dòng lệnh để bắt đầu mới.

## cp
Sao chép tập tin và thư mục.

Ví dụ: lệnh `cp todo.txt /home/qlarson/Documents` sẽ tạo một bản sao của "todo.txt" vào thư mục "Documents".

## alias
Tạo một bí danh cho các lệnh Linux. 

Ví dụ: `alias search=grep` sẽ cho phép bạn sử dụng `search` thay vì `grep`.

## cat
Hiển thị nội dung của một tập tin trên màn hình. 

Ví dụ: `cat todo.txt` sẽ hiển thị văn bản của "todo.txt" trên màn hình.

## chown
Thay đổi người sở hữu một tập tin. 

Ví dụ: `chown qlarson todo.txt` sẽ biến "qlarson" thành chủ sở hữu của "todo.txt".

## chmod
Thay đổi quyền của tập tin.

Ví dụ: `chmod 777 todo.txt` sẽ giúp mọi người có thể đọc "todo.txt", có thể ghi và thực thi được. Các chữ số trong "777" chỉ định các quyền cho người dùng, nhóm và những người khác, theo thứ tự đó.

## sudo
Thực hiện các nhiệm vụ yêu cầu quyền quản trị hoặc quyền root. 

Ví dụ: Sử dụng `sudo passwd quincy` để thay đổi mật khẩu của người dùng "quincy". 

## find
Tìm kiếm các tập tin phù hợp với một mẫu được cung cấp. Lệnh này là để tìm kiếm các tệp và thư mục bằng cách sử dụng các bộ lọc như tên, kích thước, thời gian truy cập và thời gian sửa đổi. 
Ví dụ: `find /home/ -name todo.txt`  sẽ tìm kiếm một tệp có tên "todo.txt" trong thư mục chính và các thư mục con của nó.

## grep
Tìm kiếm tệp hoặc đầu ra cho một chuỗi hoặc biểu thức cụ thể. Lệnh này tìm kiếm các dòng chứa một mẫu đã chỉ định và theo mặc định, ghi chúng vào đầu ra tiêu chuẩn.

Ví dụ: `grep run todo.txt` sẽ tìm kiếm từ "run" trong tệp "todo.txt". Các dòng có chứa "run" sẽ được hiển thị.

## date
Hiển thị hoặc đặt ngày giờ hệ thống.

## df
Hiển thị báo cáo về việc sử dụng không gian đĩa của hệ thống.
![](https://images.viblo.asia/9e108634-bd0f-44e4-b100-45609f16be12.png)


## du
Hiển thị chiếm bao nhiêu không gian trong mỗi tập tin. Điều này sẽ hiển thị kích thước trong số khối đĩa. Nếu bạn muốn xem nó theo byte, kilobyte và megabyte, hãy thêm `-h` đối số như thế này : `du -h`.

## file
Xác định loại tệp. 

Ví dụ: `file todo.txt` có thể sẽ hiển thị loại "ASCII text".

## history
Hiển thị lịch sử lệnh.

## kill
Dừng một quá trình.

Ví dụ: Dừng một quá trình với PID là 485 bằng lệnh `kill 485`. Sử dụng lệnh `ps` để xác định PID của một quá trình.

## less
Xem nội dung của một trang một tập tin tại một thời điểm. 

Ví dụ: `less todo.txt` sẽ hiển thị nội dung của "todo.txt".

## ps
Hiển thị danh sách các quy trình hiện đang chạy. Điều này có thể được sử dụng để xác định các PID cần thiết cho `kill` các quy trình.

## pwd
Hiển thị tên đường dẫn cho thư mục hiện tại.

## ssh
Đăng nhập từ xa vào một máy Linux khác, qua mạng. 

Ví dụ: `ssh quincy@104.25.105.32` sẽ đăng nhập vào 104.25.105.32 bằng tên người dùng "quincy".

## tail
Hiển thị 10 dòng cuối cùng của tệp. Xem ít hoặc nhiều dòng bằng cách sử dụng -n (số). 

Ví dụ: `tail -n 5 todo.txt` sẽ hiển thị 5 dòng cuối cùng của "todo.txt".

## tar
Lưu trữ và trích xuất các tệp từ một tarfile (.tar) hoặc tarball (.tar.gz hoặc .tgz).

## top
Hiển thị các tài nguyên đang được sử dụng trên hệ thống của bạn, tương tự như trình quản lý tác vụ trong Windows.

Nguồn: https://www.freecodecamp.org/news/basic-linux-commands-bash-tips-you-should-know/