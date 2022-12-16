## Giới thiệu
Bài viết này sẽ đưa ra cách sử dụng terminal, một số command cơ bản, giúp các bạn mới sử dụng Linux không còn các câu hỏi ngớ ngẩn như "em cài composer rồi mà gõ lệnh không được", "em chạy lệnh bị lỗi, thử chạy bằng sudo cũng không được", "người ta bảo em chạy câu lệnh này nhưng em chạy không được", "em search ra lệnh này nhưng chạy cũng không được", hay "HELP! HELP!! Sau khi chạy lệnh thì máy tính không khởi động được" :sweat_smile:

## Terminal là gì
Nếu bạn là người dùng Linux hay đang bắt đầu tìm hiểu về Linux thì sẽ không còn xa lạ với từ *terminal*, trong các hướng dẫn thường có các câu kiểu như "mở terminal lên và chạy lệnh" hay "mở terminal để compile chương trình"... Cái tên terminal được bắt nguồn từ [một loại máy tính](https://en.wikipedia.org/wiki/Computer_terminal) trong những thập niên 1960, 1970. Vì thế, các chương trình terminal trong Linux thường được gọi là terminal emulator (giả lập terminal). Windows cũng có một dạng terminal gọi là "command prompt" hay "cmd" có nguồn gốc từ HĐH MS-DOS trong những năm 1980.

Các distro Linux thường có 1 ứng dụng terminal mặc định và có thể mở nhanh bằng tổ hợp phím `Ctrl` + `Alt` + `T`. Khi đã quen với terminal, command bạn có thể cài các ứng dụng terminal với các chức năng nâng cao như `terminator`, `terminology`, `tilda`...

![Gnome Terminal](https://viblo.asia/uploads/2ebe6b26-cab7-4990-abde-5cbad33f64da.png)

## Tại sao lại phải sử dụng command?
Các máy tính Mac, Linux và Windows hiện nay chủ yếu được điều khiển qua các ứng dụng GUI đa năng, thân thiện với người dùng, với menu, thanh cuộn scrollbar... Nhưng tất cả các công việc cơ bản đều có thể thực hiện được bằng cách gõ các câu lệnh vào terminal hay command prompt. 

Sử dụng giao diện, việc mở 1 thư mục nó cũng giống như sử dụng `cd` (change directory). Xem nội dung của 1 thư mục giống như `ls` (list). Và có hàng trăm những cái khác cho việc di chuyển file, sửa file, mở ứng dụng, chỉnh sửa image, back up và restore... 

Vậy tại sao mọi người cứ phải rắc rối với các commands này khi mà bạn có thể dùng chuột?? Lý do chính là chúng rất có ích trong việc điều khiển các máy tính từ xa mà không có giao diện GUI, chẳng hạn Web server, đặc biệt là những Linux server đã lược bỏ đi những ứng dụng GUI không cần thiết. Trong một số trường hợp, các Linux server này có thể được điều khiển qua giao diện web như cPanel hoặc Plesk, cho phép bạn tạo database, địa chỉ email nhưng thỉnh thoảng nó là chưa đủ.

Và nếu là 1 web developer hay quản trị hệ thống, bạn chắc sẽ có một tài sản lớn một khi thành thạo các câu lệnh này, dành cho việc cứu hộ website, cấu hình server và cho cái CV của bạn. Nó cũng có thể tiết kiệm tiền cho bạn. Nhiều dịch vụ hosting cung cấp nhiều dạng server fully-managed (server do nhà cung cấp hosting tự quản lý và maintain thay cho khách hàng), nhưng nó có giá cao hơn. Hoặc họ sẽ thu tiền theo giờ cho việc hỗ trợ kỹ thuật.

![](https://images.viblo.asia/3288eb56-1bf9-432a-8971-4487fcff92a6.png)

Chúng ta sẽ bắt đầu với một số tình huống và command thông dụng.

## Xem, di chuyển vị trí thư mục, liệt kê danh sách file
Trên Windows, khi bạn vào "My Documents" từ Start Menu hay Desktop icon, nó mở thư mục "My Documents" và hiển thị nội dung của thư mục. Nếu bạn đồng nghiệp vui nhộn nào đó đi qua và hỏi "Chú đang ở thư mục nào thế?" bạn có thể nói "Tôi đang trong My Documents".

Nếu bạn dùng Linux với username là `ohmygirl`, khi mở terminal bạn có thể đang đứng trong thư mục `/home/ohmygirl`. Bạn có thể xác nhận điều này bằng lệnh `pwd` (Print Working Directory), nó sẽ hiển thị vị trí hiện tại của bạn:
![](https://viblo.asia/uploads/0483a01b-7f15-440a-beca-2ba4262f2a5a.png)

Để di chuyển sang thư mục khác, bạn dùng lệnh `cd`, (Change Directory) ví dụ `cd /`, trong trường hợp này nó sẽ chuyển đến thư mục `/`. Và lệnh `ls` (List) sẽ liệt kê danh sách file, folder trong thư mục hiện tại.

Trong ảnh chụp màn hình phía trên, terminal đã được trang trí bằng các màu sách khác nhau. Những chữ màu xanh da trời màu tối là các thư mục, còn các màu khác để chỉ file.

Khi sử dụng `cd` bạn có thể truyền tham số là **đường dẫn tuyệt đối** (đường dẫn bắt đầu với dấu `/`, như `/var/www` hoặc **đường dẫn tương đối** (không có `/` ở đầu). Bạn có thể chuyển sang thư mục cha với hai dấu `.`: `cd ..`. Thực hành theo thứ tự dưới đây và nhấn `Enter` sau mỗi command. Bạn có thể đoán được kết quả của câu lệnh `pwd` cuối cùng không?
```sh
cd /var
ls
cd www
ls
cd ..
pwd
```

## Xem nội dung file
Lệnh `cat` sẽ in ra màn hình terminal nội dung của toàn bộ file. Ví dụ, bạn có 1 file tên là `index.html`:
```sh
cat index.html
```
Nếu file `index.html` có nhiều dòng, nó sẽ hiển thị nội dung rất nhanh, khó nhìn. Bạn có thể làm chậm lại bằng cách sử dụng lệnh `more`, nó sẽ hiển thị theo từng trang một.
```sh
more index.html
```
Sau lệnh trên, nó sẽ hiển thị nội dung vừa 1 trang của màn hình terminal, bạn có thể nhần phím cách để hiển thị trang tiếp theo, và phím `Enter` để hiển thị dòng kế tiếp và phím `q` để thoát.'

Bạn cũng có thể chỉ hiển thị 1 vài dòng đầu tiên hoặc cuối cùng của 1 file với các lệnh `head` và `tail`. Nó sẽ hiển thị 10 dòng theo mặc định, nhưng có thể thay đổi nó:
```sh
head index.html
tail -20 index.html
```

## Copy,  xoá, di chuyển, đổi tên file
Để đổi tên file bạn sẽ  dùng lệnh `mv` (move):
```sh
mv index.html new_index.html
```

Tương tự, `cp` (copy) là lệnh copy và `rm` (remove) là lệnh xóa file.
```sh
cp index.html copy_index.html
rm old_index.html
```

## Tìm kiếm files
Lệnh `find` sẽ tìm kiếm toàn bộ file theo tên, kích thước và thời gian chỉnh sửa file. Nếu bạn truyền vào tên thư mục, nó sẽ liệt kê toàn bộ mọi thứ bên trong thư mục:
```sql
find /var/www
```
Bạn có thể nhìn thấy nó hiện ra rất rất nhiều tên file hiển thị rất nhanh ra màn hình. Nếu có nhiều file trong thư mục, nó có thể tiếp tục chạy trong vài phút. Bạn có thể dừng nó bằng cách nhấn `Ctrl` + `C`. Đó là cách để dừng 1 lệnh Linux. Trong trường hợp này lệnh `more` có thể giúp ích được nhiều:
```sql
find /var/www | more
```
Ký hiệu `|` (pipe) ở đây được dùng với vai trò đặc biệt đó là nó sẽ nhận output của 1 lệnh (trong trường hợp này là danh sách files được tạo ra bởi lệnh find) và truyền nó cho 1 lệnh khác (ở đây là lệnh `more`).

Để tìm kiếm file theo 1 tên cụ thể, thêm tham số `-name` và tên file bạn muốn tìm. Bạn có thể sử dụng ký tự `*` như wildcard (ký tự thay thế) (ký tự gạch chéo `\` có thể không phải lúc nào cũng cần đế escape dấu `*` nhưng nó là thói quen tốt khi dùng lệnh find) để tìm theo pattern. Bạn có thể kết hợp các điều kiện search bằng `-o` (or). Nếu bạn bỏ tham số `-o` nó sẽ trở thành điều kiện "and":
```sh
find /var/www -name logo.gif
find /var/www -name \*.gif
find /var/www -name *.gif -o -name *.jpg
```

Bạn cũng có thể tìm kiếm theo kích thước file bằng cách thêm tham số `-size`. Theo đó, bạn có thể tìm tất cả những file ảnh GIF có kích thước trong khoảng 5 ~ 10KB:
```sh
find /var/www -name *.gif -size +5k -size -10k
```

Tương tự, để tìm những files có thời gian thay đổi trong khoảng 90 - 180 ngày trước, bạn sử dụng `-ctime`:
```sh
find /var/www -name *.gif -ctime +90 -ctime -180
```

Trong cả hai trường hợp, có thể bạn sẽ muốn biết kích thước thật và thời gian thay đổi của file. Trong trường hợp này, tham số `-printf`, nhìn có vẻ giống với hàm `printf` trong C, trong đó bạn sử dụng `%` để in ra các thông tin khác nhau. Command dưới đây sẽ in ra kích thước file, thời gian thay đổi và đường dẫn đến file:
```sh
find Pictures \*.png -size +5k -size -10k -ctime +90 -ctime -180 -printf "%10s  %c  %p\n"
```
![](https://viblo.asia/uploads/21d865b4-837d-4272-b924-37091bab414e.png)

Một tham số cũng khá hữu ích khác đó là `-cmin` cho phép bạn tìm nhưng files đã được thay đổi trong vài phút trước. Ví dụ, nếu có gì đó không ổn trên websites, bạn có thể chạy lệnh sau để xem những files và folders đã thay đổi trong 10 phút trước:
```sh
find /var/www -cmin -10 -printf "%c %p\n"
```
Mặc dù vậy, nó không hiển thị file nào đã bị xóa (vì nó không còn ở đó nữa), nhưng nó sẽ hiển thị thư mục mà có file bị xóa. Để chỉ hiển thị file, hãy thêm tham số `-type f`, tương tự với thư mục là `-type d`:
```sh
find /var/www -cmin -10 -type f -printf "%c %p\n"
```

### Tips: đọc mannual
Bạn không thể nhớ hết các tham số, tùy chọn như trên, khi đó bạn có thể đọc manual của command bằng cách dùng lệnh `man`:
```sh
man find
```
Trong khi đọc manual, các phím điều khiển tương tự khi dùng `more`: phím `space` dùng cho cuộn trang, `Enter` để cuộn theo dòng và `q` để thoát. Các phím di chuyển up và down cũng dùng được. Bạn có tìm kiếm trong 1 trang manual bằng cách gõ `/` và keyword, ví dụ `/printf`. Trang manual sẽ nhảy đến vị trí xuất hiện tiếp theo của từ khóa đó. Bạn có thể tìm kiếm theo chiều ngược lại với `?printf` và bạn có thể lặp lại qua các vị trí kết quả tìm kiếm khác bằng phím `n`.

Nếu bạn cảm thấy khó đọc manual, bạn có thể tìm kiếm trợ giúp bằng các trang web:

- [TLDR pages](https://tldr.sh/)
- https://explainshell.com/
- [cheat.sh](https://github.com/chubin/cheat.sh)

## Tìm kiếm nội dung file
Hầu hết các code editor hiện nay đều cho phép bạn tìm kiếm từ khóa trong nhiều file. Bạn cũng có thể làm việc này trực tiếp trên terminal bằng việc sử dụng command `grep`. 
VD tìm kiếm trong các file php:
```sh
cd /var/www/html
grep "phpinfo();" *.php
```

Lệnh này sẽ cho biết những file nào trong thư mục hiện tại có chứa đoạn code đó.

Nếu bạn muốn search cả trong thư mục con thì thêm tùy chọn `-r` với một thư mục ở cuối lệnh thay vì danh sách file. Dấu `.` đại diện cho thư mục hiện tại.
```sh
grep -r "phpinfo();" .
```

Ngoài ra bạn có thể sử dụng `grep` với `find` command. Ví dụ câu lệnh dưới đây tìm kiếm trong các file PHP mà được chỉnh sửa trong vòng 14 ngày trở lại:
```sh
find . -name \*.php -ctime -14 -exec grep "phpinfo();" {} +
```

Bạn cũng có thể thêm tham số `-n` để hiển thị số dòng mà ở đó tìm thấy từ khoá:
```php
grep -n "phpinfo();" *.php
```
![](https://viblo.asia/uploads/138ed851-5709-4fcc-b9e3-714ced3c4768.png)

Trong bài tiếp theo, chúng ta sẽ tiếp tục với một số khái niệm và lệnh cơ bản khác như:
- Các lệnh sinh ra ở đâu?
- Biến môi trường là gì, PATH là gì?
- "Thêm" lệnh vào terminal như thế nào??
- Checksum file là gì và để làm gì?
- Nén và giải nén file
- File permissions, sudo là cái chi?
- Cài đặt phần mềm
- Chuyển hướng nhập xuất stdin, stdout

#### Reference:
- http://www.dwmkerr.com/effective-shell-part-1-navigating-the-command-line/
- https://www.youtube.com/watch?v=VgI4UKyL0Lc&index=5&list=PL6gx4Cwl9DGCkg2uj3PxUWhMDuTw3VKjM
- https://commandlinepoweruser.com/
- https://unix.stackexchange.com/questions/4126/what-is-the-exact-difference-between-a-terminal-a-shell-a-tty-and-a-con
- https://zwischenzugs.com/2018/01/06/ten-things-i-wish-id-known-about-bash/
- https://linuxjourney.com/
- https://www.smashingmagazine.com/2012/01/introduction-to-linux-commands/
- https://www.digitalocean.com/community/tutorials/an-introduction-to-the-linux-terminal#environment-variables
- https://diyhacking.com/linux-commands-for-beginners/
- https://www.pcsteps.com/5010-basic-linux-commands-terminal/
- https://zwischenzugs.com/2018/01/21/ten-more-things-i-wish-id-known-about-bash/