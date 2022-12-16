Bài viết này sẽ liệt kê một số command cơ bản thường được dùng trong linux, tiện dụng cho các bạn khi sử dụng linux mà có thể bạn chưa biết. 

## whoami
Tôi là ai, câu lệnh này sẽ cho bạn biết bạn đang sử dụng linux bằng tài khoản người dùng nào
```
$ whoami
leducson
```
## pwd
Câu lệnh này sẽ trả về cho bạn đường dẫn tuyệt đối của thư mục bạn đang thao tác. Sử dụng trong trường hợp bạn muốn lấy đường dẫn tuyệt đối của thư mục sử dụng cho mục đích khác
```
le@phoenix ~/working_space $ pwd
/home/le/working_space
```
## ls
Câu lệnh này sẽ liệt kê tất cả thư mục và tập tin trong thư mục bạn đang  đứng
```
le@phoenix ~ $ ls
 Documents   Downloads   Music   Pictures   Public   Templates   Videos  'VirtualBox VMs'   working_space
```
## cp
Câu lệnh này giúp bạn có thể copy thư mục, tập tin từ thư mục này sang thư mục khác
```
$ cp abc.txt /abc/files/
```
Câu lệnh trên sẽ thực hiện việc copy file abc.txt vào trong thư mục `/abc/files/`
## mv
Câu lệnh này cho phép bạn di chuyển các thư mục và tập tin từ thư mục này sang thư mục khác.
Ngoài ra nó còn có thể đổi tên file được di chuyển
```
mv ~/Document/document ~/Learning/NoImportant/NoAcess/
```
Câu lệnh trên sẽ di chuyển thư mục `document` sang thư mục `NoAccess`

Hoặc bạn muốn đổi tên 1 file hoặc thư mục thì nhập tên file hiện tại và tên file mới thôi
```
mv ~/Document/test.txt ~/Learning/NoImportant/demo1.txt
```
## mkdir
Câu lệnh này cho phép bạn tạo mới 1 thư mục trống ở thư mục hiện tại
```
mkdir some-folder
```
Trong trường hợp thư mục đã tồn tại nó sẽ hiện thông báo lỗi
```
mkdir some-folder
mkdir: cannot create directory ‘some-folder’: File exists
```
## rm -rf
Câu lệnh này sẽ cho phép xóa file hoặc thư mục
```
rm -rf abc.txt some-folder
```
hoặc xóa folder có thể sử dụng cả câu lệnh rmdir
```
rmdir some-folder
```
## touch
Touch cho phép tạo 1 file mới mà không có nội dung bên trong
```
touch demo.txt
```
## cat
Cho phép xem nội dung của file và tạo 1 file mới có nội dung từ file cũ
- Xem nội dung của file
```
cat demo.txt
```
- Tạo file mới
```
cat demo.txt > demo2.txt
```
## chmod
Lệnh này dùng để phân quyền tập tin và thư mục
* 0: (000) No permission.
* 1: (001) Execute permission.
* 2: (010) Write permission.
* 3: (011) Write and execute permissions.
* 4: (100) Read permission.
* 5: (101) Read and execute permissions.
* 6: (110) Read and write permissions.
* 7: (111) Read, write, and execute permissions.
VD: Muốn set tất cả các quyền cho thư mục `demo`
```
chmod 777 demo
```
```
drwxr-xr-x  2 le   le   4096 Thg 2 20 21:50  demo/
```
## find
Lệnh này cho phép bạn nhanh chóng tìm kiếm 1 tập tin và thư mục. Nó hữu ích với dự án lớn, có chứa hàng nghìn tập tin và thư mục
```
find path -name filename
```
```
#Tìm kiếm tập tin index.js trong thư mục hiện tại
find . -name index.js
```
```
#Tìm kiếm tất cả những file .js trong thư mục hiện tại
find . -name "*.js"
```
## alias
Câu lệnh này cho phép bạn đặt tên mình thích cho 1 câu lệnh hoặc 1 chuỗi lệnh. Sau đó bạn nhập tên viết tắt và câu lệnh sẽ được thực thi
```
alias cls=clear
cls
```
```
alias demo="cd ~/home/learning/demo"
```
## chown
Câu lệnh này cho phép bạn thay đổi chủ sở hữu và nhóm sở hữu của 1 thư mục hoặc tập tin
```
sudo chown dave:mamy example.txt
```
Câu lệnh trên sẽ giữ user dave là chủ sở hiểu file  và đặt user mary làm chủ sở hữu của nhom

Để thay đổi chủ sở hữu file và chủ sở hữu nhóm thành mary
```
sudo chown mary:mary example.txt
```
## curl
Câu lệnh này dùng để lấy thông tin và tập tin từ url trên internet. Lệnh curl có thể không được cung cấp mặc định trong linux, để sử dụng được câu lệnh này thì bạn cần phải cài đặt curl trước
```
sudo apt-get install curl
```
Giả sử bạn muốn lấy một tệp được lưu trên github, github không hỗ trợ việc download 1 file về. Tuy nhiên sử dụng curl sẽ lấy được tập tin mà chúng ta cần
```
curl https://raw.githubusercontent.com/torvalds/linux/master/kernel/events/core.c -o core.c
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  313k  100  313k    0     0  1375k      0 --:--:-- --:--:-- --:--:-- 1375k
```
## df
Câu lệnh này sẽ hiển thị kích thước, % sử dụng, % còn trống của hệ thống tập tin của hệ thống
Các thông số tùy chọn hữu ích -h(thông tin con người có thể đọc được ), thông số hiển thị bằng MB, GB thay vì hiển thị bằng Byte
```
df
Filesystem     1K-blocks     Used Available Use% Mounted on
udev             3916868        0   3916868   0% /dev
tmpfs             790860     1800    789060   1% /run
/dev/sda2      229192044 27706700 189773344  13% /
tmpfs            3954292   201516   3752776   6% /dev/shm
tmpfs               5120        4      5116   1% /run/lock
tmpfs            3954292        0   3954292   0% /sys/fs/cgroup
/dev/sda1         523248     6196    517052   2% /boot/efi
tmpfs             790856       68    790788   1% /run/user/1000
```
```
df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            3,8G     0  3,8G   0% /dev
tmpfs           773M  1,8M  771M   1% /run
/dev/sda2       219G   27G  181G  13% /
tmpfs           3,8G  188M  3,6G   5% /dev/shm
tmpfs           5,0M  4,0K  5,0M   1% /run/lock
tmpfs           3,8G     0  3,8G   0% /sys/fs/cgroup
/dev/sda1       511M  6,1M  505M   2% /boot/efi
tmpfs           773M   72K  773M   1% /run/user/1000
```
## diff
Câu lệnh này thực hiện so sánh 2 tập tin với nhau và cho thấy sự khác biệt giữa chúng

Tùy chọn

`-y` cho phép tùy chọn hiển thị của các dòng khác nhau<br>
`-w` cho phép tùy chọn chiều rộng của các dòng để dễ nhìn hơn<br>
`--suppress-common-lines` tập trung vào các dòng có sự khác biệt
```
$ diff -y -W 70 demo1.txt demo2.txt --suppress-common-lines
cdf				  |	   123
```
## free
Câu lệnh này hiển thị thông tin bộ nhớ Ram và SWap của máy tính

Tùy chọn `-h` cho phép thông tin hiển thị ra thân thiện với người dùng (người dùng có thể đọc được )
```
free
              total        used        free      shared  buff/cache   available
Mem:        7908584     1633072     3499020      551712     2776492     5442080
Swap:       2097148           0     2097148
```
```
free -h
              total        used        free      shared  buff/cache   available
Mem:           7,5G        1,5G        3,3G        567M        2,7G        5,2G
Swap:          2,0G          0B        2,0G
```
## grep
Lệnh này dùng để tìm kiếm các dòng có nội dụng giống với nội dung search
```
grep abc *.txt
demo1.txt:abc
demo2.txt:abc
```
## gzip
Dùng để tạo file nén cho tập tin thư mục. Theo mặc định khi thực hiện lệnh này nó sẽ xóa file gốc và để lại cho bạn file được nén. Để giữ lại file nén thì bạn cần thêm tùy chọn `-k`
```
gzip -k demo2.txt
```
```
ls -l demo*
-rw-rw-r-- 1 le le 39 Thg 2 20 22:32 demo1.txt.gz
-rw-rw-r-- 1 le le  8 Thg 2 20 22:32 demo2.txt
-rw-rw-r-- 1 le le 38 Thg 2 20 22:32 demo2.txt.gz
```
## head
Lệnh này sẽ hiển thị cho bạn 10 line đầu tiên của file. Trong trường hợp bạn không muốn hiển thị nhiều như vậy thì thêm tùy chọn `-n number`  thay number bằng số dòng của bạn

```
head demo1.txt
```
```
head -n 5 demo1.txt
```
## history
Lệnh này sẽ liệt kê tất cả các lệnh mà bạn đã từng sử dụng trên command line
```
history
359  free
  360  free -h
  361  grep abc *.txt
  362  ls
  363  clear
  364  gzip demo1.txt
  365  ls
  366  gzip -k demo2.txt
  367  ls
  368  ls -l *demo
  369  ls -l demo*
  370  head demo2.txt
  371  head -nn 1 demo2.txt
  372  head -n 1 demo2.txt
  373  history
```

Bạn có thể chạy lại bất cứ lệnh nào từ lịch sử của mình bằng các thêm `!` vào trước số thứ tự của lệnh trong lịch sử

VD: Bạn muốn chạy lại câu lệnh clear từ lịch sử thì gõ vào
```
!363
```
## kill
Lệnh này cho phép chấm dứt 1 chương trình bằng dòng lệnh. Để thực hiện được việc này thì bạn cần cung cấp ID của chương trình (PID) 

Để tìm được PID của chương trình thì chúng ta dùng lệnh
```
ps aux | grep teen_chuongw_trình
```
lệnh trên sẽ trả về pid của chương trình cần. Sau đó thưc hiện lệnh kill
```
kill pid hoặc kill -9 pid
```
## less
Less cho phép xem nội dung của file mà không cần trình soạn thảo. Nó nhanh hơn và tránh được khả năng bạn vô tình sửa nội dung của file.
```
less demo.txt
```

## Kết
Trên đây mình giới thiệu với các bạn một số câu lệnh thông dụng trong linux, để sử dụng linux thuận tiện hơn. 

Ở bài sau mình sẽ bổ sung thêm những câu lệnh tiện dụng khác