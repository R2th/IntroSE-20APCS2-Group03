Là một web developer, mình sử dụng Linux mỗi ngày. Trong bài viết này mình sẽ chia sẻ một số ứng dụng CLI giúp tăng năng suất làm việc. Một số công cụ là lựa chọn thay thế tốt hơn cho các lệnh Linux hiện có, một số khác cung cấp các tính năng hoàn toàn mới. Mình tin rằng các bạn sẽ thích chúng.

Hệ điều hành mình sử dụng để chạy các lệnh bên dưới là Ubuntu 16.04
## grep => ack, ag
[ack](https://beyondgrep.com/) và [ag](https://github.com/ggreer/the_silver_searcher) là hai công cụ được giới thiệu là tốt hơn, mạnh mẽ hơn `grep`. Với `ack` hoặc `ag`, bạn không phải nhập bất kỳ option nào được yêu cầu như `grep` để tìm kiếm trong một thư mục nhất định. Ngoài ra kết quả tìm kiếm bao gồm số dòng và đầy màu sắc, giúp dễ đọc hơn.
Chúng ta có thể  cài đặt bằng các lệnh sau:
```
# Install ack
$ sudo apt install ack-grep

# Install ag
$ sudo apt install silversearcher-ag
```
![](https://images.viblo.asia/501e273b-f3e7-49b4-b64b-fca9be8f76d4.png)

Chi tiết cách sử dụng `ack` và `ag` các bạn có thể tham khảo bài viết [này](https://viblo.asia/p/ag-the-silver-searcher-Az45bgo6KxY) :grin:
## fzf: Trình tìm kiếm Fuzzy
`fzf` là một trình tìm kiếm file mạnh mẽ có thể tìm thấy các file, tiến trình, biến môi trường nhanh chóng. So với việc autocomplete mặc định, `fzf` có thể hiển thị tên file dưới dạng danh sách và lọc danh sách đó khi bạn gõ lệnh, điều này dễ dàng hơn nhiều so với nhấn Tab nhiều lần và cố gắng tìm tên file trên màn hình chằng chịt chữ.
Nó không phải là một package của ubuntu vì vậy chúng ta phải cài đặt nó từ source:
```
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```
Sau khi cài đặt, bạn có thể sử dụng ** <TAB> để autocomplete với `fzf` gần như mọi nơi:
```
vim **<TAB>    # select files from current dir and edit
vim ../**<TAB> # select files from parent dir and edit
kill -9 <TAB>  # auto complete process to kill
export **<TAB> # auto complete env var to export
<C-R>          # search command line history
```
    
Các bạn có thể  xem thêm cách sử dụng ở [đây](https://github.com/junegunn/fzf)
## TheFuck :fu:: bộ sửa lỗi chính tả dòng lệnh
Bạn đã bao giờ bực bội khi gõ một dòng lệnh dài chỉ để tìm thấy có một lỗi typing trong lệnh hoặc chỉ đơn giản là thiếu `sudo`? `TheFuck` có thể giúp bạn. Cài đặt nó bằng cách:
```
$ sudo apt install thefuck
```
Sau đó, bạn cần phải thêm dòng này vào file `~/.bashrc` của bạn:
```
eval $(thefuck --alias)
```
Sau khi đăng nhập lại (hoặc là tải lại `.bashrc` bằng cách sử dụng lệnh `source ~/.bashrc`), bạn hãy thử làm như này:
```
$ apt install git
E: Could not open lock file /var/lib/dpkg/lock - open (13: Permission denied)
E: Unable to lock the administration directory (/var/lib/dpkg/), are you root?
$ fuck
sudo apt install git [enter/↑/↓/ctrl+c]
Reading package lists... Done
Building dependency tree
```
## top => htop
`htop` rất nổi tiếng và các nhiều bài viết về chúng rồi, nên ta sẽ không nói quá nhiều về nó.
```
$ sudo apt install htop
$ htop
```
## traceroute => mtr
`mtr` là một công cụ tốt hơn cho xử lý sự cố mạng. Nó nhanh hơn và dễ sử dụng hơn `traceroute` có sẵn.
```
$ sudo apt install mtr
```
Để lần dấu đường đi trên mạng, chỉ cần gõ:
```
$ mtr 8.8.8.8
```
Lệnh này sẽ hiển thị một cửa sổ GUI để hiển thị quá trình và kết quả lần dấu đường đi. Nếu bạn thích đầu ra dưới dạng CLI, thêm option -t:
```
$ mtr -t 8.8.8.8
```
## df => pydf
`pydf` có thể hiển thị dụng lượng disk đã được sử dụng màu sắc, dễ đọc.
```
$ sudo apt install pydf
```
![](https://images.viblo.asia/e2260bf7-67ff-422d-a438-2a88f43c9731.png)
## mc: Quản lý File
`mc` (GNU Midnight Commander) là một trình quản lý file tuyệt vời cho CLI. Nó sử dụng chế độ xem hai cửa sổ để quản lý file và cũng hỗ trợ FTP và SFTP. Công cụ tuyệt vời khi bạn cần thực hiện nhiều thao tác file mà không cần truy cập vào GUI, ví dụ như là trên server.
![](https://images.viblo.asia/eae5e769-a283-476f-9922-cd0dca822234.png)
## ftp => lftp
Mặc dù FTP ngày nay ít phổ biến hơn nhưng đôi khi chúng ta vẫn cần nó để truy cập một số tài nguyên cũ. `lftp` là một ứng dụng CLI FTP tuyệt vời. So với `ftp`, nó hỗ trợ lệnh `mget`, `mput` và lệnh `mirror` mạnh mẽ để tải xuống hoặc tải lên toàn bộ thư mục. Nó thậm chí còn hỗ trợ tải torrent bằng lệnh `torrent`
```
$ sudo apt install lftp
```
## wget => aria2
`aria2` là một công cụ tải xuống hỗ trợ HTTP / HTTPS, FTP, SFTP, BitTorrent và quan trọng nhất là tải xuống với nhiều kết nối. Nhờ tính năng tải xuống đa kết nối của nó, nó có thể tải xuống nhanh hơn `wget`. Nó cũng có thể tiếp tục tải xuống khi chưa hoàn thành. Ví dụ có trên trang chủ [aria2](https://aria2.github.io/)
```
$ sudo apt install aria2
$ aria2c https://example.com/ubuntu.iso
```
## nnn: Trình phân tích file
Một điều chúng ta thường làm khi tìm các file hoặc thư mục có dung lượng lớn là sử dụng lệnh `du -sh *` và xóa chúng. `nnn` có thể làm tốt hơn. Chỉ cần gõ `nnn` và nhấn chữ hoa `S` và bạn sẽ thấy kích thước cho tất cả các thư mục và file.
```
$ sudo apt install nnn
```
## References
https://itnext.io/10-cli-tools-that-you-will-love-d214bc73d856