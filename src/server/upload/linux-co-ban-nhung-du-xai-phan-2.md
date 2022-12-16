Ở phần trước mình có nói qua cho các bạn hiểu về các khái niệm cơ bản và tóm lược sự ra đời của hệ điều hành **GNU/ Linux** và trong phần tiếp theo này mình sẽ tóm lược tổng thể cho các bạn có thể nắm, hiểu và sử dụng  các tính năng của linux  thông qua các dòng lệnh cơ bản. <br>. Bài này mình sẽ dùng hệ điều hành Centos nhé. Các hệ điều hành khác chắc cũng tương tự thôi :) <br>
Riêng các phần dưới đây thì mình nghĩ các bạn học thì cần vừa đọc vừa thực hành luôn thì mới thấm được :) đọc k nhàn chán lắm (buồn ngủ :) lắm) do lý thuyết nhiều  <br> Nếu biết qua rồi thì có thể làm cái gối đầu cần thì mở ra cũng khá oke. <br>
Oke. Bắt đầu nào. <br>

# II. Làm việc với hệ điều hành Centos 
Trước khi bắt đầu mình cũng lưu ý với các bạn là lệnh thì nhiều vô kể cũng rất khó nhớ và các phần dưới đây mình chỉ liệt kê các lệnh cơ bản dễ sử dụng còn muốn biến tấu hay chi tiết hơn các bạn chỉ cần nhớ cho mình 2 câu lệnh thủ pháp này: <br>
> man <ten-cau-lenh> <br>
    ví dụ: man ls
    
> <ten-cau-lenh> --help <br>
     ví dụ:  ls --help

Hai câu lệnh trên tương tự nhau đều là câu lệnh giúp gợi ý cho chúng ta cách dùng, ý nghĩa cũng như sử dụng 1 câu lệnh như thế nào <br>
## 1. Bật tắt hệ điều hành
Câu lệnh shutdown: <br>
> init 0
> 
Câu lệnh reboot:<br>
> init 6
## 2. Cài đặt phần mềm, gói trên linux 
Như ở phần trước mình có đề cập với các bạn công cụ **Package management** giúp chúng ta cài đặt các gói tin, phần mềm vào hệ thống.<br>
Ở đây đối với Centos thì nó cũng có các cách cài đặt bằng giao diện nhưng bài này mình chơi lệnh thôi nhỉ :) <br>
Centos nó có thể quản lý các gói bẳng **RPM** và **YUM** <br>
### **2.1.Quản lý các gói dùng RPM**  <br>

Truy vấn thông tin mọi phần mềm: <br>

>  rpm -qa | more 

Truy vấn các tập tin cấu hình của phần mềm:
>  rpm -qc <ten-phan-mem> --c: configuration

Cài đặt 1 phần mềm:
>  rpm -ivh <ten-phan-mem>

Cập nhật 1 phần mềm: 
>  rpm -Uvh <ten-phan-mem>

Xóa bỏ 1 phần mềm:
>  rpm -e <ten-phan-mem>
>
Chú ý: Nếu gỡ phần mềm phụ thuộc vào phần mềm khác thì thêm tùy chọn `--nodeps`

### **2.2.Quản lý các gói dùng YUM** <br>
**YUM - Kiểm tra phần mềm**: <br>
Cập nhật danh sách các phần mềm được hỗ trợ của YUM:
>   yum check-update <br>
>   yum list updates

Liệt kê các phần mềm đã được cài đặt:
>  yum list installed

Liệt kê tất cả các phần mềm có thể cài đặt bằng lệnh YUM:
>  list available
>  
Xem thông tin và tìm kiếm phần mềm
>  yum info <ten-phan-mem>  <br>
>  yum search <ten-phan-mem>

**YUM - Cài đặt, cập nhật, xóa phần mềm** <br>
Cài đặt tự động phần mềm(yêu cầu có mạng hoặc có trong kho phần mềm repository)
>  yum install <ten-phan-mem>
>  
Kiểm tra và cập nhật phiên bản mới nhất của phần mềm
>  yum update <br>
>  yum update <ten-phan-mem>
>  
Gỡ bỏ, xóa phần mềm
>  yum remove <ten-phan-mem>
    
Xóa hết cache của yum
>  yum clean all
   <br>
    
**Note**: Với 2 cách trên thì ta thường dùng YUM hơn lý do là vì YUM nó sẽ tải các gói tự động và các gói phụ thuộc đi kèm còn RPM thì không phải tải chạy bằng cách thủ công.<br>
    
## 3. Quản lý file thư mục
### 3.1.Một số tập tin thư mục cơ bản: <br>


| Tập tin thư mục  | Chức năng |  
| -------- | -------- |  
| /bin, /sbin     | Chứa các tập tin nhị phân hỗ trợ cho việc boot và thực thi các lệnh     |
| /boot | Chứa kernel, file hỗ trợ cho việc load hệ điều hành  |  
| /dev | Chứa các tập tin thiết bị (CDROM, HDD, ...)  |  
| /etc | Chứa các tập tin cấu hình hệ thống  |  
| /home | Chứa các home directory mặc định của người dùng |  
|  /lib| Chứa kernel module và các thư viện chia sẻ cho các tập tin nhị phân trong  /bin và /sbin  |  
| /mnt  | Chứa các mount point của các thiết bị được mount vào hệ thống  |  
| /proc | Lưu trữ các thông tin về kernel, các tiến trình  |  
| /root  |  Lưu trữ home directory cho user root|  
| /tmp |  Chứa các file tạm|  
|  /usr|  Chứa các chương trình đã được cài đặt|  
| /var |  Chứa các log file, hàng đợi các chương trình, mailbox của user|  

### 3.2. Liệt kê file, thư mục
Liệt kê danh sách file, thư mục:  **ls** <br>
> ls -la

Một số option thường dùng với lệnh ls <br>
    

| Options  | Ý nghĩa  |
| -------- | -------- |
| ls -L     | Hiện thị danh sách file (chỉ hiện thị tên)     | 
| ls -l | Hiển thị danh sách file (gồm nhiều cột: filename, size,date, ...) |
| ls -a | Liệt kê tất cả các file bao gồm những file ẩn |
| ls -R | Liệt kê tất cả các file kể cả file trong thư mục con |
 
### 3.3. Tạo, xem, xóa, liên kết, di chuyển, làm việc với file/thư mục
    
**Tạo tập tin: touch,vi, echo** 
| Lệnh| Ý nghĩa | 
| -------- | -------- | 
| echo "abc" >  /data/test.txt | Tạo tập tin test.txt trong thư mục data và ghi text abc vào nếu tập tin có rồi thì sẽ xóa trắng và ghi đè     |
| echo "abc" >>  /data/test.txt | Tạo tập tin test.txt trong thư mục data và ghi text abc vào nếu tập tin có rồi thì sẽ ghi vào cuối    |
| vi /test.txt |Tạo ra tập test.txt tin rỗng  và cần insert data vào và save lại |
| touch /test.txt |Tạo ra tập tin test.txt rỗng  | <br>
    
<br>**Xem nội dung của tập tin**


| Lệnh  | Ý nghĩa  | 
| -------- | -------- | 
| cat <ten-file>     | Xem nội dung của tập tin      |
| more <ten-file>     | Xem nội dung của tập tin theo trang     | 
| less <ten-file>     | Xem nội dung của tập tin theo dòng     |
| head  <ten-file>     | Xem nội dung của tập tin với các dòng đầu file (head –n + số dòng + file)     | 
| tail  <ten-file>     | Xem nội dung của tập tin  với các dòng cuối file (tail –n + số dòng + file)     |
**Chú ý**: <br> Thường trong  công việc thì mình thường sử dụng lệnh tail và less.
Vì sao? Khi đọc file log và các log mới thường nó sẽ ghi vào cuối file -> tail. <br>
     Còn lệnh less: nó cho hiển thị như kiểu văn bản có thể lên, xuống,search….
<br>
    
**Tạo thư mục**  <br>
Dùng lệnh: <br>
> mkdir <ten-thu-muc> <br>
> ví dụ: mkdir van

<br>**Xem thư mục**  <br>
> ls -la <ten-thu-muc>
    
**Sao chép file/ thư mục**
> cp <nguồn> <đích> (với thư mục thì sử dụng –r) <br>
> ví dụ: mkdir van

**Chuyển  file/ thư mục**
> mv <nguồn> <đích> <br>
> ví dụ: mv /ect/text.txt /data/ : chuyển file text.txt sang folder data

**Đổi tên file/ thư mục**
> mv <tên file cũ> <tên file mới> <br>
>ví dụ mv test1 test2
    
**Xóa file:** <br>
>rm  <ten-file>
> Nếu muốn xóa nhiều: rm <file1> <file2>

**Xóa thư mục:** 
> rm -r <ten-thu-muc> (áp dụng với thư mục chứa dữ liệu)<br> 
> hoặc rmdir <ten-thu-muc> (áp dụng với thư mục rỗng)
    
**Đặc biệt cần thiết thì thêm thộc tính -f để ép buộc xóa file thư mục k cần xác nhận.** <br>
> rm -f <ten-file> <br>
> rm -rf <ten-thu-muc>

**Liên kết tập tin: ls** 
>ln -s [target file] [Symbolic filename]
* -s – lựa chọn để tạo Symbolic Links.
* [target file] – tên của file gốc hoặc nơi bạn muốn tạo file link tới
* [Symbolic filename] – tên của file symbolic link.
<br>
    
**Để chuyển đổi qua lại các thư mục : cd** <br>
*   cd  <duong-dan-den> : Di chuyển đến thư mục theo đường dẫn
*   cd .. : Lùi lại 1 thư mục
* 	cd - : Lùi lại thư mục mình rời đi trước đó.

**Xem thư mục hiện hành:**
> pwd
    
**Muốn xem lịch sử các câu lệnh:**
>history <br>
> CTRL + R: search các lệnh ở history nhanh chóng.

**Làm việc với trình soạn thảo vi:** <br>
Trình soạn thảo văn bản vi sẽ có 3 chế độ làm việc: 
+ chế độ command: di chuyển văn bản
+ chế độ insert: soạn thảo văn bản (phím i)
+ chế độ exit: lưu và thoát văn bản (phím :q hoặc :wq)

Sửa 1 file ví dụ: **vi test.txt** <br>


| Gõ| Ý nghĩ a|  
| -------- | -------- | 
| :wq     | Thoát và lưu văn bản     | 
| :q!     | Thoát và không lưu văn bản     | 
| i     | Vào chế độ insert từ ký tự bên trái     | 
| a     | Vào chế độ insert từ ký tự bên phải     | 
| x     | Xóa 1  ký tự     | 
| dd     | Xóa 1 dòng     | 
| yy     | Sao chép  1 dòng     |
| p     | Paste     |
| 1-99%     | Đi tới % của văn bản     |
| g   | Đi tới đầu văn bản   |
| G    | Đi tới cuối văn bản    |
    
    
### 3.4. Đồng bộ file/ thư mục
> rsync <tùy-chọn> <nguồn> <đích>



| Tùy chọn  | Ý nghĩa |
| -------- | -------- | 
| -v     | Hiện thị trạng thái kết quả     | 
| -r     | Copy dữ liệu recursively nhưng không đảm bảo thông số file và thư mục     |
| -a     | Cho phép copy dữ liệu recursively đồng thời giữ nguyên được tất cả các thông số của thư mục và file    |
| -z     | Nén dữ liệu trước khi truyền đi giúp tăng tốc quá trình đồng bộ file     |
| -h     | Kết hợp với -v để định dạng dữ liệu show ra     |
| -delete    | Xóa dữ liệu ở đích nếu nguồn k tồn tại dữ liệu đó    |
| -exclude    | Loại trừ đi những dữ liệu không muốn truyền đi nếu bạn đang cần loại ra nhiều file hoặc folder ở nhiều đường dẫn khác nhau thì mỗi cái bạn phải thêm --exclude tương ứng   |
    
Ngoài ra cũng có thể đồng bộ file/thư mục giữa local server, giữa các server hoặc qua ssh nhưng mình cũng chưa dùng bao giờ :) . (chỉ nghe qua thôi)
### 3.5. Lệnh đường ống và grep
Lệnh đường ống được kí hiệu | : giúp ta thực thi nhiều câu lệnh chạy cùng 1 lúc <br>
    
grep “<string>”: Để tìm kiếm 1 xâu có trong file hoặc trong danh sách thư mục nào đó. (grep –i “<string>” để phân biệt chữ hoa và chữ thường)<br>
VD: grep “van” test.txt .(tìm kiếm xâu “van” trong file text)<br>
    
Trong công việc mình thường sử dụng đường ống + grep để tìm ra 1 file nhanh chóng.<br>
Vd: ls –l | grep “.txt” : Lấy ra list các file + thư mục và lọc ra file có đuôi .txt<br>

### 3.6. Tìm kiếm file/ thư mục
**Tìm kiếm sử dụng find:**
> find <thu-muc-can-tim> <ten-tim-kiem><br>
>Cái này cũng nhiều các bạn có thể dùng man find để xem thêm nhé. 

**Tìm 1 chuỗi trong 1 file sử dụng grep**
> cat /data/test.txt | grep 456 (tìm trong file test.txt có 456 thì in ra)
<br>
### 3.7. Nén và giải nén 
**Nén và giải nén dùng tar**:  
Ví dụ: 
> tar -cvf test.tar test.txt                  | Tạo file tar                                                <br>
> tar -cvf  home/vanvc.tar /home/vanvc | Tạo file tar cho cả thư mục vanvc <br>
> tar -cvfz test.tar.gz test.txt | Tạo file tar.gz <br>
> tar -vxf test.tar -C /data/ | Giai nén file tar <br>
> tar -xvfz test.tar.gz  | giải nén file tar.gz<br>
    
**Nén và giải nén dùng gzip/gunzip**:<br>
    Ví dụ:
> gzip /data/test.txt  | (nén file test.txt dạng .gz và hiện thị tên test.txt.gz tại thư mục hiện hành data) <br>
> gunzip /data/test.txt.gz |  (giải nén file test.txt.gz ở thư mục hiện hành data)


    
## 4.Phân quyền cho file/ thư mục
Trong linux có 3 quyền chính: <br>
- Owner: Chỉ cấp quyền cho chủ sở hữu của file 
- Group: Chỉ cấp quyền cho nhóm sở hữu của file
- Other: Cấp quyền cho những người dùng và nhóm không thuộc 2 nhóm trên <br>
**Chú ý:** User root là trường hợp ngoại lệ (siêu người dùng) có mọi quyền hạn trên hệ thống <br>

**Có 2 cách thay đổi quyền**: 
*    Bằng chữ
*    Bằng số
<br> 
    
Như bảng dưới đây:
    
| Tên quyền| Ký hiệu| Dạng số | Mô tả
| -------- | -------- | -------- |-------- |
| Read     | r     | 4     | Quyền đọc file |
| Write     | w     | 2     | Quyền ghi file |
| Execute     | x     | 1     | Quyền thực thi file |
<br>
Ví dụ về ý nghĩa các quyền: 
    <br>
Read: <br>
Quyền đọc nội dung file. Đây đây là điều kiện cần để có thể sao chép một file. (Để sao chép file A (ở đâu đó) thành file B ở vị trí P thì ngoài quyền đọc file A còn cần quyền tạo file B ở vị trí P) <br>
<br>
Write: <br>
Quyền sửa đổi nội dung file. Sẽ thế nào nếu chỉ có quyền ghi mà không có quyền đọc một file ?
Giả sử có file văn bản document.txt, nếu có quyền đọc và quyền ghi file này thì người dùng có thể dùng trình soạn thảo văn bản vi, emacs, … để hiển thị toàn bộ nội dung file và tìm những chỗ không vừa ý để sửa chữa. Nếu chỉ có quyền ghi file mà không có quyền đọc thì người dùng không thể dùng trình soạn thảo để sửa chữa file nhưng người dùng có thể dùng lệnh cat >>document.txt để ghi thêm vào cuối file hoặc cat >document.txt để ghi đè lên toàn bộ nội dung của file. <br>
    <br>
Execute: <br>
Quyền thực thi file. Có hai loại file có thể thực thi được là: (1) file chứa các lệnh máy mà CPU có thể thực thi luôn được (nhưng con người thì không hiểu được), những file kiểu này gọi là executable file (2) file text chứa các lệnh cần thực hiện những file kiểu này được gọi là shell script nhưng những lệnh trong script thực chất là những executable file nên cuối cùng lại qui về (1). Nếu file không thuộc 2 kiểu trên thì có quyền thực thi file cũng không có ý nghĩa gì. Giả sử bạn có file shell script X, sẽ thế nào nếu chỉ có quyền thực thi file mà không có quyền đọc và ghi file này ? Đơn giản là bạn có thể thực thi các lệnh chứa trong file này nhưng không thể mở file xem các lệnh đó là gì và cũng không thể thêm bớt, sửa chữa các lệnh trong file này.
<br>
Chú ý: việc xóa, đổi tên một file không được quyết định bởi quyền ghi với file đó mà bởi quyền ghi với thư mục chứa file đó.

### **4.1. Thay đổi quyền bằng chữ** <br>
Một file được sở hữu bởi 3 đối tượng:
+ User owner (kí hiệu u)
+ Group owner (kí hiệu g)
+ Other (kí hiệu o)
    
Các bạn tham khảo hình dưới ứng với mỗi đối tượng sẽ có 3 quyền tương ứng:
![](https://images.viblo.asia/7e5fec67-0d0c-4d49-b35d-3fd7933c24dc.PNG)

    
Câu lệnh: <br>
>chmod + nhóm sở hữu(u,g,o) + quyền(r,w,x)   <ten-file> <br>
    Ví dụ: chmod –u+x test.txt (add quyền thực thi với người sở hữu cho file test.txt)

### **4.2. Thay đổi quyền bằng số** <br>
Câu lệnh : 
> chmod <số>  <ten-file> <br>
>Ví dụ: chmod 775 test.txt
    
Giải thích:
*  User owner có quyền đọc ,ghi và thực thi 4+2+1 =7
*  Group owner có quyền đọc,ghi và thực thi 4+2+1 =7
*  Other có quyền đọc và thực thi: 4 +1 = 5

**Lưu ý:** <br>
Để xóa hết quyền sử dụng: chmod 000 test.txt <br>
Đôi lúc ta thấy lệnh chmod có thêm –R tức là ta thay đổi quyền cho cả các tâp tin bên trong thư mục đó. <br>
**Bảng tổng hợp**


| No  | Permission Type | Symbol |
| -------- | -------- | -------- |
| 0     | No Permission     |   ---     |
| 1     | Execute          |  --x     |
| 2     | Write          | -w-     |
| 3     | Execute + Write     |  -wx     |
| 4     | Read          |  r--     |
| 5     | Read + Execute     |  r-x     |
| 6     | Read + Write     | rw-     |
| 7     | Read + Write +Execute     | rwx     |




## 5. Quản lý user và group
**Tại sao cần phải quản lý phần này?** <br>
Phần này với phần quyền khá là quan trọng giúp ta bảo mật thông tin quan trọng mà chỉ có người nội bộ hoặc người nào được phép truy cập hay vào ứng dụng của chúng ta. <br>
Ví dụ như:  <br>
Tạo 1 user như là 1 em học sinh thì mặc định nó sẽ phải gán vào group nào (lớp nào) <br>
Thì khi đó học sinh đó sẽ có quyền hạn của lớp đó luôn (xem thông tin học sinh khác trong lớp, xem tài liệu của lớp, ....). tức là lớp đó có quyền gì hay dữ liệu xem chung gì thì học sinh thuộc lớp đó có thể xem được hết còn lớp khác hay học sinh khác k thuộc lớp này thì k thể xem được. 

### **5.1. Quản lý user** <br>
Thông tin của user sẽ được lưu trong file **/etc/passwd** <br>
Các bạn gõ lệnh :
>  cat /etc/passwd

Và nó sẽ hiện danh sách thông tin của user ví dụ đọc 1 thông tin như sau: 
![](https://images.viblo.asia/30f5d056-b515-45e0-b069-62b98f9b3cee.PNG)
    
File /etc/shadow sẽ chứa mật khẩu được mã hóa:<br>
Các bạn gõ lệnh: <br>
> cat /etc/shadow
Và nó sẽ hiện ra danh sách thông tin user mà password được mã hóa ví dụ đọc 1 thông tin như sau: <br>
    
![](https://images.viblo.asia/993c06d5-7adc-4d4d-b8dd-36a26e6315ad.PNG)
    
**Tạo user với userid home diretory chỉ định:**
> useradd -u 412 -d <thu-muc-chi-dinh> <ten-user>
    
Có thể tạo tắt bằng cách <br>
> useradd <ten-user> 
    
Rồi thêm các thuộc tính sau cũng được <br>

**Kiểm tra user:** <br>
>   more /etc/passwd <br>
>  id <ten-user> 
    
**Khóa/mở tài khoản**
>  passwd -l <ten-user> <br>
> passwd -u <ten-user>
    
**Đổi mật khẩu**
>     passwd  <ten-user>
 
Chú ý: có thể switch qua các tài khoản dùng lệnh : `su - <ten-tai-khoan>`

**CHỉnh sửa, xóa** <br>
Thay đổi thư mục home:<br>
>   usermod -d <duong-dan-thu-muc-moi> <ten-user>
    
Thay đổi nhóm: <br>
> usermod -G <group1> ,<group2>, ... <ten-user>

Xóa user: <br>
> userdel <ten-user>
    
### **5.2.Quản lý group** <br>
    

Thông tin group được lưu trong file **/etc/group** <br>
Để xem ta dùng lệnh: `cat /etc/group` nó sẽ hiện thị ra 1 danh sách group và đọc thông tin như sau: <br>
    
![](https://images.viblo.asia/32feebb3-4917-42e1-a85d-966c8a049a5f.PNG)
Trong đó: 
1.    Group name
2.    Group password
3.    Group ID (GID)
4.    Group members
    
**Quản lý group:**

Tạo 1 nhóm mới: <br>
> groupadd <ten-group>
    
Thay đổi GroupID: <br>
> groupmod -g <id-moi> <ten-group>
    
Chuyển user sang nhóm khác:
> usermod - G  <group1>,  <group2>, ... <ten-user> <br>
    ví dụ: usermod - G group1,group2,group3 vanvc <br>
    
Xóa nhóm:<br>
>  groupdel group2
## 6. Đặt lịch tiến trình chạy tự động
### 6.1.Mục đích
*    Thiết lập lịch cho 1 tác vụ được thực hiện vào 1 thời điểm xác định
*    Giúp tự động hóa các công việc mang tính lặp lại
*    Hỗ trợ cho việc vận hành và giám sát hệ thống
### 6.1. Dùng AT
Đặt lịch cho 1 lệnh hoặc 1 tiến trình thực thi duy nhất vào 1 thời điểm xác định <br>
**Install at**: 
>yum install at 

**Cú pháp**: 
> at + <time> <br>
    ví dụ: at 22:12  sau đó sẽ thực hiện các câu lệnh muốn làm gì vào giờ đó  như ảnh dưới mình tạo file vantest.txt vào lúc 22h12 phút
![](https://images.viblo.asia/50c18f82-03f1-46c0-b1d3-ced513084172.PNG)

**Lệnh kiểm tra**:<br>
>atq <br>
> hoặc at -l <br>
>Ví dụ như ảnh ở trên
    
### 6.2. Dùng crontab
    
Đặt lịch cho 1 lệnh hoặc 1 tiến trình thực hiện lặp đi lặp lại nhiều lần và cấu hình nó sẽ ở trong file crontab

**Định dạng file crontab**: <br>
![](https://images.viblo.asia/81cec06c-5ba0-4559-b175-592f5674b5c9.PNG)

**Các lệnh quản lý:** <br>
>  crontab -l: Liệt kê các crontab của user  <br>
> crontab -e: sửa crontab
    
Ví dụ:  <br>
>    Chạy script 30 phút 1 lần:<br>
> 0,30 * * * * command <br>
>  Chạy script 15 phút 1 lần: <br>
> 0,15,30,45 * * * * command <br>
> Chạy script vào 3 giờ sáng mỗi ngày:<br>
> 0 3 * * * command

**Thiết lập quyền sử dụng crontab:**
*    /ect/cron.allow: khai báo các user được phép đặt crontab
*    /ect/cron.deny: khai báo các user không được phép đặt crontab
    
**Chú ý**: Trong crontab cần đặt đường dẫn đầy đủ cho lệnh

    
## 7.Quản lý phần cứng
Ở phần này chúng ta sẽ đọc thông tin như **CPU,RAM,HDD**
<br>
**Với CPU**: <br>
> less /proc/cpuinfo 
    
**Với RAM**: <br>
>free -h
    ![](https://images.viblo.asia/715bf419-ebf1-42c9-853b-f4883ea5b9d0.PNG)

Lưu ý: Swap như là 1 RAM ảo lấy bộ nhớ từ phần cứng để bổ trợ khi RAM thật hết tránh rò rỉ hoặc chết chương trình. 

**Với HDD**: <br>
>df -h  <br>
> fdisk -l     (chi tiết hơn)

## 8.Quản lý dịch vụ linux
### 8.1.Kiểm tra dịch vụ được nạp khi boot OS
>  chkconfig  (2,3,4,5 on -> khởi động cùng boot OS có thể check man chkconfig )
### 8.2.Bỏ 1 dịch khi khởi động boot OS
>  chkconfig <tendichvu> off <br> 
>  hoặc systemctl disable <tendichvu>
### 8.3. Thêm 1 dịch vụ khi khởi động boot OS
>  chkconfig <tendichvu> on <br>
>  hoặc systemctl enable  <tendichvu>
### 8.4. Bật 1 dịch vụ 
>  service <tendichvu> start <br>
>  /etc/init.d/<tendichvu> start (tương đương với câu lệnh trên) <br>
>  hoặc systemctl start <tendichvu>
### 8.5. Tắt 1 dịch vụ 
>  service <tendichvu> stop <br>
>  /etc/init.d/<tendichvu> stop (tương đương với câu lệnh trên) <br>
>  hoặc systemctl start <tendichvu>

### 8.6. Restart 1 dịch vụ 
>  service <tendichvu> restart <br>
>  /etc/init.d/<tendichvu> restart (tương đương với câu lệnh trên) hoặc
>  systemctl reload <tendichvu> 
### 8.7. Check status 1 dịch vụ 
>  service <tendichvu> status <br> 
 >  hoặc systemctl status <tendichvu> 
### 8.8. Vậy nên dùng gì để quản lý service? 
 **Systemctl** về cơ bản là một ứng dụng hệ thống dòng lệnh được sử dụng để quản lý các service hệ thống và cho phép bắt đầu, dừng, khởi động lại, bật, tắt và xem trạng thái của mọi service.
<br>
 Các bạn có thể nhìn thấy ở trên thì **Systemctl** nó sẽ bao quát và thực thi chức năng của cả lệnh **service**  và **chkconfig** 
và các phiên bản linux mới họ cũng khuyến cáo dùng **Systemctl** hơn cho tương lai. <br>

    
<br>Nên mình nghĩ các bạn cứ dùng **Systemctl** đỡ phải nhức đầu đơn giản vì nó mới và nó có thể vá được 1 số lỗi mà các công cụ cũ gặp phải (nếu có). <br>
**Note**: Như Centos 7 đổ xuống k hỗ trợ **Systemctl** thì các bạn vẫn sẽ dùng **service** và **chkconfig**  nhé 
    
## 9. Quản lý tiến trình linux
### **9.1. Giới thiệu**
Tiến trình là 1 chương trình chạy trên hệ thống
<br>
Được định dạng bời một PID (tiến trình ID) phục vụ cho việc giám sát điều khiển và quản lý hệ thống <br>
Hiểu đơn giản như trong window vậy các phần mềm nào đang chạy sẽ có 1 hoặc nhiều tiến trình 
### 9.2. Tiến trình cha và con
Khi 1 tiến trình sinh ra 1 tiến trình khác:
*   Tiến trình ban đầu được gọi là tiến trình cha và được định danh bởi PPID (parent PID)
*   Tiến trình mới được gọi là tiến trình con <br>
    
Tương tác giữa tiến trình cha và con: 
*    Khi tiến trình con đang chạy thì tiến trình cha sẽ chờ
*    Khi tiến trình con hoàn thành thì tiếp trình cha sẽ tiếp tục thực thi và tiến trình con sẽ được kết thúc
### 9.3. Trạng thái của tiến trình


| Trạng thái | Mô tả  | 
| -------- | -------- |
| Run     | Tiến trình đang chạy     |
| Sleep     | Tiến trình đang ở trạng thái chờ hoạt động      |
| Zombie     | Tiến trình mà tiến trình cha đã kết thúc     |
| Stop     | Tiến trình đã dừng hoạt động      |
    
### 9.4. Các lệnh quản lý tiến trình
**Liệt kê các tiến trình đang hoạt động**
>ps -ef
![](https://images.viblo.asia/a8cc56a4-a604-45ba-84d0-c47665e1fd91.PNG)
    
Các thông số: <br>
    

| Thông số | Ý nghĩa |
| -------- | -------- | 
| UID     | User quản lý tiến trình     | 
| PID     | ID tiến trình     | 
| PPID     | ID tiến trình cha     | 
| STIME     | start time     | 
| C     | CPU đang thực thi     | 
| Time     | Thời gian thực thi của tiến trình     | 
| CMD     | Câu lệnh thực thi     | 
    
<br>
    
**Hiển thị trạng thái của các tiến trình đang hoạt động trên hệ thống**<br>
> top <br>
    (lệnh này hay dùng đặc biệt cũng có thể check được memory, CPU)

Ví dụ: như ảnh dưới đây: 
    ![](https://images.viblo.asia/08d02ff6-2ad4-4840-9c15-969c27a0f5c1.PNG)

Các thông số: 
    

| Thông số| Ý nghĩa 2 | 
| -------- | -------- |
| PID     | Tiến trình ID của các tiến trình     |
| USER     | User thực thi tiến trình     |
| %CPU     | Phần trăm CPU mà tiến trình sử dụng     |
| %MEM     | Dung lượng RAM mà tiến trình sử dụng     |
| TIME+     | Thời gian hoạt động của tiến trình từ khi bật     |
| COMMAND     | Chương trình chạy     |
    
<br>
    
**Để kill 1 tiến trình ta dùng lệnh dưới đây:**
    
> kill -9 <id-tien-trinh>:Kết thúc 1 chương trình ngay lập tức <br>
    
> kill -15 <id-tien-trinh>: Gửi tiến hiệu kết thúc đến tiến trình và chờ đến khi tiến trình cleanup và kết thúc (trong TH `kill -15` không tắt được thì dùng `kill -9`)
    
## 10. Làm việc với mạng
### 10.1.Khởi động lại dịch vụ mạng
>     service network restart
>     hoặc /etc/init.d/rc.d/network restart
### 10.2.Ping, traceroute, telnet
> ping -s ip_address <br>
>   traceroute ip_address <br>
>   telnet ip_address port <br>
### 10.3. Xem thông tin mạng và bật tắt mạng 
> ifconfig -a  <br>
>ifup <br>
>ifdown <br>
    
### Kết
Đến đây mình cũng xin kết thúc phần **linux cơ bản** của mình tại đây.  Thực ra mình cũng viết lại những gì mình thấy là cơ bản và quan trọng để mai sau quên vào đọc lại thôi. Đọc có vẻ hơi nhàm chán do lý thuyết nhiều để hiểu sâu hơn và thành thạo hơn k có cách nào ngoài thực hành thực hành và thực hành liên tục các bạn nhé. <br > 
    
    
Tài liệu tham khảo: <br>
https://www.hostinger.vn/huong-dan/cach-kill-proccess-linux <br>
https://viblo.asia/p/nhung-dieu-ban-can-biet-ve-linux-djeZ100JKWz <br>
https://www.hostinger.vn/huong-dan/cac-lenh-co-ban-trong-linux <br>
https://viblo.asia/p/nhung-cau-lenh-hay-dung-cho-newbie-trong-linux-MVpvKBjmkKd