## Lời mở đầu
Xin chào mọi người,

Đã lâu lắm rồi kể từ ngày mình update cho series [Become A SuperUser](https://viblo.asia/s/become-a-superuser-24lJDg3WKPM) này. Nãy check lại thì thấy bài gần nhất mình viết ở Series này cũng đã là từ ... 2 năm trước rồi, :joy: khi tham gia vào sự kiện May Fest của Viblo. Và giờ một mùa May Fest nữa lại đến. Có lẽ đây cũng là thời điểm thích hợp để mình có thêm động lực cố gắng viết tiếp cho một Series tính ra cũng rất tham vọng này :smiley: 

Tiếp theo bài viết giới thiệu về [Filesystem Hierarchy Standard](https://viblo.asia/p/become-a-superuser-filesystem-hierarchy-standard-gAm5ybw8Kdb), trong bài viết tiếp theo này, chúng ta sẽ cùng đi tìm hiểu về một số các command xuất hiện mặc định trong hầu hết các Linux Distribution, và có thể giúp các bạn **tìm kiếm các files khác một cách dễ dàng và nhanh chóng hơn**.

Cụ thể, có rất nhiều công cụ giúp chúng ta thực hiện việc này, và nếu không để ý bạn sẽ thỉnh thoảng còn rơi vào trạng thái ... "không hiểu chúng khác nhau thế nào" :joy: Bài viết này sẽ đi sâu vào giải thích các chức năng của từng câu lệnh dưới đây, cũng như phân tích sự khách biệt giữa chúng.

Các câu lệnh chúng ta sẽ cùng nhau tìm hiểu trong bài này bao gồm:

- find
- locate
- updatedb
- whereis
- which
- type

Đây chính là các câu lệnh được đề cập trong  [Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard](https://learning.lpi.org/en/learning-materials/101-500/104/) , objective [104.7 Find system files and place files in the correct location](https://learning.lpi.org/en/learning-materials/101-500/104/104.7/) của kỳ thi LPIC 1 (Linux Professional Institute Certification Level 1)

## Câu lệnh `find`
`find` là một câu lệnh rất linh hoạt, tuy nhiên cũng rất mạnh mẽ giúp bạn có thể tìm kiếm một hay nhiều file mà mình mong muốn. Câu lệnh `find` đi kèm với rất nhiều các parameters khác nhau, giúp bạn có thể tìm kiếm không chỉ dựa trên tên file, mà còn có thể tìm kiếm dựa trên các thông tin như ai là owner của file, thời gian last modified của file, hay permission của file. 

Về cơ bản thì câu lệnh `find` có cú pháp như sau:
```
find  [PATH] [OPTION] [EXPRESSION]
```

Trong đó thì `PATH` là đường dẫn đến thư mục mà ở đó câu lệnh `find` sẽ bắt đầu tìm kiếm. Và theo mặc định thì `find` sẽ tìm đệ quy trong thư mục đó, tức nó sẽ tìm hết các thư mục con trong thư mục mà chúng ta muốn tìm kiếm.

`OPTION` là nơi bạn chỉ định xem sẽ tìm kiếm theo tiêu chí gì, còn `EXPRESSION` là giá trị tương ứng của tiêu chí mà bạn mong muốn tìm kiếm.

Hãy cùng điểm qua một vài `OPTION` cơ bản của câu lệnh `find` nhé:

| OPTION | EXPRESSION | GIẢI THÍCH |
| -------- | -------- | -------- |
| -amin     | -     | Tìm kiếm những file mà được access `n` phút trước |
| -empty     | -     | Tìm kiếm những file text trống, hoặc thư mục trống     |
| -executable | - | Tìm kiếm những file mà user hiện tại có thể thực thi được (hay các thư mục mà user hiện tại có thể vào bên trong được) |
| -gid    | `n`     | Tìm kiếm những file mà có group id là `n`     |
| -group     | `g`     | Tìm kiếm những file mà thuộc về group có tên là `g`     |
| -inum     | `n`     | Tìm kiếm những file mà có inode number là `n`     |
| -maxdepth     | `n`     | Số level (số lần đệ quy) khi tìm kiếm xuống cây thư mục con. Ví dụ như `-maxdepth 1` thì sẽ chỉ tìm kiếm ở thư mục hiện tại, chứ không tìm trong thư mục con của thư mục hiện tại  |
| -mmin     | `n`     | Tìm kiếm những file mà được modify `n` phút trước  |
| -name     | `name`     | Tìm kiếm những file có tên là `name`  |
| -nogroup     | -     | Tìm kiếm những file mà không có group nào tương ứng với gid của file     |
| -nouser     | -     | Tìm kiếm những file mà không có user nào tương ứng với uid của file     |
| -perm     | `MMMM`     | Tìm kiếm những file mà có permission là `MMMM`     |
| -readable | - | Tìm kiếm những file mà user hiện tại có thể đọc được |
| -size     | `n`     | Tìm kiếm những file mà có dung lượng là `n`, với `n` theo mặc định là bộ số của 512-bytes. Ta có thể dùng các hậu tố để giúp số dung lượng này trở nên dễ đọc hơn, ví dụ `nc` sẽ đếm theo `bytes`, `nk` sẽ đếm theo KiB (Kibibytes), `nM` sẽ đếm theo MiB (Mebibytes), và `nG` sẽ đếm theo `GiB` (Gibibytes). Bên cạnh đó ta có thể dùng tiền tố `+` để biểu thị dung lượng lớn hơn, hay `-` để biểu thị dung lượng `-` |
| -user     | `u`     | Tìm kiếm những file mà thuộc về user có tên là `u`    |
| -writable | - | Tìm kiếm những file mà user hiện tại có thể ghi được |


Một vài ví dụ
```
// Tìm kiếm file có tên là thangtd.jpg ở trong thư mục hiện tại, 
// mà không tìm đệ quy bên trong các thư mục nằm trong thư mục hiện tại
find -name 'thangtd.jpg' -maxdepth 1

// Tìm kiếm những file có đuôi là .jpg bên trong thư mục  hiện tại
find -name '*.jpg'

// Tìm kiếm những file mà user hiện tại có quyền ghi, trong thư mục /bin 
find /bin/ -writable

// Tìm kiếm những file có dung lượng lớn hơn 100 MiB, 
// được chỉnh sửa cách đây 5 phút
find . -mmin -5 -size +100M
```

## Câu lệnh `locate` và `updatedb`
`locate` cũng là một câu lệnh rất mạnh mẽ, giúp bạn có thể nhanh chóng tìm được đến file mà mình mong muốn. Khác với `find` hoạt động theo cơ chế duyệt đệ qua qua cây thư mục, để tìm kiếm file/thư mục phù hợp, thì `locate` lại tìm kiếm trực tiếp từ một database vốn được chuẩn bị sẵn, lưu tại `/var/lib/mlocate/mlocate.db`. Do chỉ là tìm kiếm từ trong database, nên `locate` sẽ tìm kiếm và trả ra kết quả rất nhanh.

Nếu máy của bạn chưa có `locate`, bạn có thể bắt đầu bằng cách cài đặt theo câu lệnh
```
// Với hệ debian
apt install mlocate

// Với hệ redhat/centos
yum install mlocate
```

Một vấn đề với câu lệnh `locate` đó là nó tìm kiếm trong file database, mà theo mặc định thì database này chỉ được update 1 ngày 1 lần bằng cron job (có thể check tại file `/etc/cron.daily/mlocate`), nên có thể sẽ xảy ra trường hợp dữ liệu trong file database đó bị outdate so với thực tế. Ví dụ như trong database thì có file, nhưng thực tế nó đã bị xóa (trước khi database được update lại), hay trong database thì chưa có dữ liệu, mà file đó mới được tạo ra.

Trường hợp để kiểm tra chắc chắn rằng file có tồn tại, trước khi output ra kết quả, thì ta có thể sử dụng thêm option `-e`. Còn để giải quyết vấn đề với những file mới được tạo ra, chúng ta có thể manual update file database của `locate`, chứ không cần phải chờ đến thời điểm chạy cron job, thông qua câu lệnh `updatedb`. Thời gian để hoàn thành việc update database này thì sẽ phụ thuộc vào số lượng các file có trên hệ thống của bạn, nên có thể đôi lúc sẽ mất nhiều thời gian đấy :joy: 

Một số option thường dùng với câu lệnh `locate`


| SHORT FORM | LONG FORM | GIẢI THÍCH |
| -------- | -------- | -------- |
| -A	| --all	| Bạn có truyền một hoặc nhiều pattern vào câu lệnh `locate`. Với trường hợp có nhiều `pattern` thì theo mặc định, nó sẽ tìm các file có tên match *một trong các* patter đó. Với tham số `-A` tì `locate` sẽ tìm các file có têm match với *tất cả các* pattern | 
| -b	| --basename	| Chỉ hiện thị ra file/thư mục có tên match với pattern, mà không hiển thị ra file/thư mục có path của mình match với pattern (xem ví dụ bên dưới) | 
| -c	| --count	| Hiển thị ra số kết quả phù hợp, thay vì danh sách cụ thể các kết quả phù hợp | 
| -i	| --ignore-case	| Không phân biệt chữ hoa, chữ thường | 
| -q	| --quiet	| Bỏ qua không hiển thị các message lỗi, ví dụ như permission denied khi chạy câu lệnh| 
| -r	| --regexp R	| Sử dụng Regular Expression `R` , thay vì pattern khi search | 
| -w	| --wholename	| Hiển thị ra filename match với pattern, bao gồm cả trường hợp  path (wholename) của file đó có match với pattern. Đây là option được sử dụng mặc định của câu lệnh `locate`| 

Một vài ví dụ

```
// Tìm kiếm file/thư mục có tên, 
// hoặc trong phần path có chứ pattern .ssh
thangtd@localhost:~$ locate .ssh
/home/thangtd/.ssh
/home/thangtd/.ssh/authorized_keys
/home/thangtd/.ssh/id_rsa
/home/thangtd/.ssh/id_rsa.pub
/home/thangtd/.ssh/known_hosts

// Chỉ tìm kiếm file/thư mục có tên (basename) là .ssh
thangtd@localhost:~$ locate -b .ssh
/home/thangtd/.ssh

// Thay vì liệt kê ra danh sách đầy đủ thì chỉ đếm kết quả
thangtd@localhost:~$ locate -c .ssh
5

thangtd@localhost:~$ locate -b -c .ssh
1

// Tìm kiếm file/thư mục có tên chứa pattern zip hoặc jpg, 
// và không phân biệt chữ hoa, chữ thường
thangtd@localhost:~$ locate -i zip jpg
/home/thangtd/Downloads/avatar.jpg
/home/thangtd/Downloads/thangtd.JPG
/home/thangtd/Downloads/viblo.JPG
/home/thangtd/Downloads/image.zip
```

## Câu lệnh `which`
Câu lệnh `which` cho phép bạn nhanh chóng tìm ra full path của một shell command. Câu lệnh `which` sẽ rất hữu ích khí bạn muốn tìm kiếm xem đường dẫn đầy đủ của một câu lệnh (executable file) là nằm ở đâu, hay câu lệnh đó đã được install hay chưa.

Chú ý là `which` sẽ chỉ tìm những executable file từ các thư mục nằm trong `$PATH` của bạn mà thôi, tức những file thực thi khác, mà không có được dẫn được include vào `$PATH`, thì sẽ không thể được hiển thị ra. 

Ví dụ:
```
thangtd@localhost:~$ which ssh
/usr/bin/ssh
thangtd@localhost:~$ which shutdown
/usr/sbin/shutdown
thangtd@localhost:~$ which ls
/usr/bin/ls
```

khi thêm option `-a` vào, thì câu lệnh `which` sẽ output ra tất cả các pathname mà có match với executable file. Ví dụ:
```
thangtd@localhost:~$ which -a ls
/usr/bin/ls
/bin/ls
```

## Câu lệnh `whereis`
`whereis` là một câu lệnh khác giúp bạn tìm ra full path của một command, và không chỉ có thế, nó còn tìm kiếm source files hay manual page (hướng dẫn sử dụng vốn được dùng bởi câu lệnh `man`) của command đó. Ví dụ:
```
thangtd@localhost:~$ whereis ls
ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz
```

## Câu lệnh `type`
`type` là một câu lệnh hiển thị thông tin về một command nào đó, và nếu command đó vốn là một executable file, thì nó sẽ hiển thị thông tin về đường dẫn đầy đủ đến file đó. Đây chính là cách mà chúng ta có thể dùng `type` để tìm kiếm đường dẫn của một executable file.

Không giống như `which` hay `whereis` là một executable file, thì `type` là một built-in function của shell. Do đó `type` có thể sẽ có cách hoạt động khác nhau với những loại shell khác nhau. 

Với loại shell thông dụng nhất trên hệ thống Linux là bash, thì `type` có thể nhận diện 3 loại categories là: file, builtin và alias. Còn ở máy của mình thì mình hay dùng Fish, và khi mình check trên Fish thì thấy có 3 loại categories là file, builtin và function. Bạn có thể dùng tham số `-t` để chỉ output ra thông tin về categories của command.

***Note:*** Theo định nghĩa trên [wikipedia](https://en.wikipedia.org/wiki/Shell_builtin) thì *a shell builtin is a command or a function, called from a shell, that is executed directly in the shell itself, instead of an external executable program which the shell would load and execute*

Một vài ví dụ (khi dùng với bash)
```
bash-3.2$ type locate
locate is /usr/bin/locate
bash-3.2$ type cd
cd is a shell builtin
bash-3.2$ type dps
dps is aliased to `docker ps -a'
bash-3.2$ type type
type is a shell builtin
bash-3.2$ type which
which is /usr/bin/which

bash-3.2$ type -t which
file
bash-3.2$ type -t type
builtin
bash-3.2$ type -t dps
alias
```

## Tổng kết
Như vậy là trong bài viết này chúng ta đã cùng đi sâu vào tìm hiểu về một số công cụ mạnh mẽ dùng để tìm kiếm file (file bình thường, cũng như executable file/binary file), theo tên, cũng như rất nhiều các thuộc tính khác. Tổng kết lại chúng ta có câu lệnh `find` và `locate` với rất nhiều các option hữu ích giúp chúng ta tìm kiếm được hầu như mọi thể loại file khác nhau. Và trong khi `find` hoạt động bằng cách duyệt qua các cây thư mục, thì `locate` tìm kiếm trong một database đã được chuẩn bị từ trước, đồng thời được update hàng ngày thông qua cron job, hoặc update manual thông qua câu lệnh `updatedb`. Ngoài ra, với các executable file, hay các command, thì chúng ta có thể tìm kiếm nơi đặt chúng thông qua các câu lệnh `which`, `whereis`, hay `type`. Trong khi `which` đơn giản là hiển thị ra full path đến một executable file, thì `whereis` có thêm các thông tin liên quan đến manual pages, binaries và source code, còn `type` thì vừa có thể giúp chúng ta hiển thị ra đường dẫn của một command, nếu nó là executable file, vừa có thể hiển thị ra thêm thông tin trong trường hợp command đó là alias hay builtin. 

## References
- https://learning.lpi.org/en/learning-materials/101-500/104/104.7/104.7_01/
- https://developer.ibm.com/tutorials/l-lpic1-104-7/
- https://linuxize.com/post/locate-command-in-linux/
- [LPIC-1 Linux Professional Institute Certification Study Guide, 5th Edition](https://www.amazon.com/LPIC-1-Linux-Professional-Institute-Certification/dp/1119582121)