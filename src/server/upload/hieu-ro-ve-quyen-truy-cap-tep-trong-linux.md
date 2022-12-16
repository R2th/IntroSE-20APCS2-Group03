Khi làm việc với điều hành Linux thi thoảng bạn nhận được message tựa tựa thế này 'Permission denied' và bạn thường sẽ lên mạng tìm cách sửa hoặc sẽ sử dụng kiểu như 'sudo chmod -R 777' hoặc 'chmod 777' để giải quyết, tuy nhiên bạn đã thực sự hiểu về những câu lên trên? Bài viết này sẽ giúp bạn hiểu rõ những câu lệnh đó. Để hiểu hơn về bài viết bạn nên nhớ lại hoặc tìm hiểu một số kiến thức như
1. Chuyển số thập phân sang nhị phân hoặc ngược lại
2. Phép bù của một số nhị phân
3. Phép toán & giữa hai số nhị phân 

# 1. Giới thiệu quyền truy xuất
Quyền là thuộc tính của tệp và thư mục. Nó cho biết từng đối tượng người dùng (chủ sở hữu - owner, người cùng nhóm - group, người dùng khác - other) có quyền gì (đọc - read, ghi - write, thực thi - execute) trên tệp và thư mục. Linux sử dụng 9 bit cho việc này, trong đó 3 bit đầu cho biết quyền đọc, ghi, thực thi của owner, 3 bit tiếp theo cho biết quyền của group, 3 bit cuối cho biết quyền của other.  Ví dụ, 111110100 hay rwxrw-r--  cho biết owner có cả ba quyền, group có thể đọc và ghi nhưng không được thực thi, other chỉ được đọc. Trong các lệnh, 3 bit xác định quyền cho một đối tượng người dùng được biểu diễn bằng một số nguyên (có giá trị từ 0 đến 7), quyền được biểu diễn bằng ba số nguyên liên tiếp. Ví dụ, 764 là biểu diễn của rwxrw-r-- ở trên.

# 2. Quyền cho tệp và thư mục được tạo mới
Với các tệp và thu mục được tạo mới, quyền được xác định dựa trên quyền cơ sở (base permission) và `user mask`.

Base permission được thiết lập sẵn, không thể thay đổi

* Đối với file thông thường giá trị BS là 666 (111 111 110) (rw-rw-rw-)
* Đối với thư mục (file đặc biệt) giá trị BS là 777 (111 111 111) (rwxrwxrwx)

User mask sẽ “che đi” một số bit trong Base Permission để tạo ra quyền truy cập chính thức cho file (tương tự như cơ chế của subnet mask).  Cụ thể, quyền truy cập được tính bằng “Base permission” & “biểu diễn bù 1 của user mask”. Ví dụ, Base Permission là 666 (tức 110110110 khi chuyển sang dạng nhị phân), nên nếu giá trị user mask là 022 (có dạng nhị phân là 000010010 => dạng bù 1 của nó thì chuyển 1->0, 0->1 nên ta được 111101101) thì quyền truy nhập chính thức của file sẽ là:

`110 110 110 & 111 101 101 = 110 100 100 = 644 (rw-r–r–)`

Có thể tính nhanh quyền truy xuất tệp và thư mục theo các công thức sau:

```
Permit of file = 666 - umask
Permit of directory = 777 - umask
```

Giá trị user mask mặc định cho người dùng thông thường là **002**

Với mask này thì quyền hạn truy cập mặc định cho thư mục là **775** và file là **664**

Giá trị mask mặc định cho root là **022**

Với mask này thì quyền hạn truy cập mặc định cho thư mục là **755** và file là **644**

Sử dụng chương trình **umask** để thay đổi user mask. **Các tệp và thư mục được tạo ra sau lệnh umask sẽ chịu tác động của giá trị mask mới.**

# 3. Thay đổi quyền của tệp và thư mục đã tồn tại


Có thể sử dụng chương trình **umask** để thay đổi user mask, sau đó dùng chương trình touch để cập nhật quyền của tệp theo user mask mới . Dưới đây là một ví dụ minh họa việc giá trị user mask quyết định các quyền hạn trên file.txt như thế nào.

```
umask 077
touch test_file.txt
ls -l test_file.txt

> -rw——- 1 uit uit 0 2020-02-01 11:10 test_file.txt
```

Note: *Cơ chế làm việc của umask khiến chúng ta không thể tạo ra các file với quyền execute. Vì Base permission của file luôn là 666, tức các bit ứng với quyền execute đều bằng 0, nên bất kể giá trị mask bằng bao nhiêu thì quyền của file đều không có execute.*

Cách khác để thay đổi quyền của tệp và thư mục đã tồn tại là sử dụng chmod. Sử dụng chmod có thể thêm quyền thực thi cho tệp và thư mục.

`chmod [OPTION] MODE FILE`

trong đó:
* OPTION hay được dùng nhất là -R hoặc --recursive (đệ quy) khi muốn áp dụng quyền cho tất cả tệp và các thư mục con.

* MODE cho biết đối tượng người dùng nào (u: user sở hữu; g: group; o: other, a: all) được cấp/thu hồi/gán (+-=) quyền gì (rwxXst hoặc [0-7]+)

* File là file hoặc folder bạn muốn thay đổi quyền

Đến đây ta có thể hiểu tại sao ta lại cần sử dụng chmod khi có lỗi 'File deny permission', và tại sao lại là -R. Chúng ta cùng tìm hiểu thêm qua một vài ví dụ: 

- Thêm quyền ghi tệp files1.txt cho người dùng hiện tại: 
`chmod u+w file1.txt`

- Thêm đủ các quyền cho tất cả các đối tượng người dùng: `chmod a+rwx file1.txt` hoặc `chmod +777 file1.txt`

- Thu cả ba quyền của người dùng khác: `chmod 770 file1.tx`

- Thu quyền thực thi của người dùng nhóm: `chmod g-x file1.txt`

# 4. Thay đổi chủ sở hữu của tệp và thư mục

Người tạo ra tệp hay thư mục là chủ sở hữu (owner) mặc định của tệp hay thư mục. Quyền sở hữu của tệp hay thư mục còn thuộc owning group. Owner hoặc root có thể thay đổi chủ sở hữu của tệp và thư mục bằng dùng  chương trình chown.

`chown [OPTION]  [OWNER][:[GROUP]] FILE`

Ví dụ:
- Thay owner của /lab cho root: `chown root /lab`

- Thay owner của /lab cho root, đồng thời chuyển quyền sở hữu về nhóm staff: `chown root:staff /lab`

- Thay owner của /lab cùng các tệp và thư mục con cho root: `chown -hR root /lab`

# 5. SUID, SGID, Sticky bit
Ngoài 9 bits cơ bản xác định các quyền rwx của owner, group và other, Linux sử dụng 3 bit khác để định nghĩa quyền trên tệp và thư mục. Các bit này lần lượt là SUID, SGID, Sticky. Trong các lệnh, một số nguyên nữa có giá trị từ 0 đến 7 được dùng để xác định ba quyền này. Ví dụ, trong lệnh

```
chmod 6750 file1.txt
```

số 6 (nhị phân là 110) đầu tiên trong quyền xác định SUID, SGID được bật, sticky không được bật.

Ý nghĩa của ba bit  SUID, SGID, Sticky được giải thích lần lượt như sau.

## **SUID** (**S**et owner **U**ser **ID** up on execution)

Thông thường, khi một chương trình/tệp/lệnh chạy, nó sử dụng các quyền của người dùng hiện tại, hay người dùng chạy nó. Nếu SUID được đặt, chương trình sẽ sử dụng quyền của owner chứ không phải quyền của người dùng hiện tại. Ví dụ, owner của /etc/passwd, /etc/shadow là root. Người dùng thông thường không có quyền ghi các tệp này. Nếu các tệp này không được đặt quyền SUID, khi người dùng chạy lệnh passwd sẽ xuất hiện lỗi do không mở và ghi vào tệp /etc/shadow được.  Ngược lại, khi các tệp này được đặt quyền SUID, người dùng thông thường cũng có thể chạy lệnh passwd.

Ví dụ
- Đặt quyền SUID của tệp cho người dùng hiện tại: `chmod u+s file1.txt` hoặc `chmod 4750 file1.txt`
- Bỏ quyền SUID trên tệp đối với người dùng hiện tại: `chmod u-s file1.txt`
- Để tìm các tệp có quyền SUID, chạy lệnh: `find / -perm +4000`
- Kiểm tra bit SUID được bật hay không bằng cách chạy: `ls -l files.txt`

Khi SUID được bật, bit x của owner được hiển thị là s nếu owner có quyền thực thi . Nếu owner không có quyền thực thi, bit x của owner được hiển thị là S. Ví dụ, -rwSrw-r-- có nghĩa là bit SUID đã được bật nhưng bit x của owner không được bật, -rwsrw-r-- có nghĩa là bit SUID đã được bật và bit x của owner  được bật, rwxrw-r--  nghĩa là bit SUID không được bật và owner có quyền thực thi.

## SGID (Set Group ID up on execution)
Tương tự SUID, nhưng thay owner là group. Nếu SGID được đặt, chương trình sẽ sử dụng quyền của group, chứ không phải quyền của người dùng hiện tại.

Sử dụng chmod để đặt quyền SGID cho tệp như các ví dụ sau: `chmod g+s file1.txt`
hoặc `chmod 2750 file1.txt`

Bỏ quyền SGID, như ví dụ sau: `chmod g-s file1.txt`

Để tìm các tệp có quyền SGID, chạy lệnh: `find / -perm +2000`

Kiểm tra bit SGID được bật hay không bằng cách chạy: `ls -l files.txt`

Khi SGID được bật, bit x của group được hiển thị là s nếu group có quyền thực thi. Nếu group không có quyền thực thi, bit x của group được hiển thị là S. Ví dụ, -rwxrwSr-- có nghĩa là bit SGID đã được bật nhưng bit x của group không được bật, -rwxrwsr-- có nghĩa là bit SGID đã được bật và bit x của group  được bật, rwxrwxr--  nghĩa là bit SGID không được bật và owner có quyền thực thi.

## Sticky bit

Sticky bit áp dụng cho thư mục. Nếu bit này được bật, chỉ owner và root có thể xóa nội dung của thư mục. Sử dụng bit này để thiết lập cấu hình ngăn người dùng xóa dữ liệu của người khác.

Ví dụ:
- Bật sticky bit trên thư mục /important: 
`chmod o+t /important` hoặc
`chmod +t /important` hoặc  `chmod 1757 /important`

- Tắt sticky bit trên thư mục /lab: `chmod o-t /important`

- Để tìm các tệp có quyền sticky, chạy lệnh: `find / -perm +1000`

 

Kiểm tra bit sticky được bật hay không bằng cách chạy: `ls -l files.txt`

Khi sticky được bật, bit x của other được hiển thị là t nếu other có quyền thực thi. Nếu other không có quyền thực thi, bit x của other được hiển thị là T. Ví dụ, -rwxrw-r-T có nghĩa là sticky đã được bật nhưng bit x của other không được bật.

# 6. Access Control List
ACLs là cách khác để xác định quyên trên tệp và thư mục. Chúng cho phép gán quyền cho một người dùng hoặc một nhóm bất kỳ, thậm chí không tương ứng với owner hoặc owning group. ACLs hỗ trợ các hệ thống file ReiserFS, Ext2, Ext3, JFS, XFS. Một tệp hoặc thư mục có thể có nhiều ACL.

Dùng ls -dl để kiểm tra quyền:

```bash
$ ls -dl mydir/

> drwxr-xr-x 2 quanta quanta 4096 2007-12-29 22:53 mydir/
```

Kiểm tra trạng thái khởi đầu của ACL:

```bash
$ getfacl mydir/
# file: mydir
# owner: quanta
# group: quanta
user::rwx
group::r-x
other::---
```

Gán quyền đọc, ghi, thi hành cho user kitty và group friends:
```bash
$ setfacl -m user:kitty:rwx,group:friends:rwx mydir/
```
Tuỳ chọn **-m** sẽ nhắc **setfacl** chỉnh sửa một ACL đã tồn tại.

Xem lại ACL với lệnh **getfacl**:
```bash
$ getfacl mydir/
# file: mydir
# owner: quanta
# group: quanta
user::rwx
user:kitty:rwx
group::r-x
group:friends:rwx
mask::rwx
other::---
```

Ngoài các mục (entries) cho user kitty và group friends, mask entry cũng được tạo ra. mask định nghĩa quyền truy cập có hiệu lực lớn nhất cho tất cả các entries của group.

Bây giờ thử dùng **chmod** để bỏ quyền write của group, output của lệnh ls cho thấy mask bits đã được điều chỉnh với chmod:
```
$ sudo chmod g-w mydir/
$ getfacl mydir/
# file: mydir
# owner: quanta
# group: quanta
user::rwx
user:kitty:rwx                  #effective:r-x
group::r-x
group:friends:rwx               #effective:r-x
mask::r-x
other::---
```

**Default ACLs**
Default ACL ảnh hưởng đến các thư mục con cũng như là các files. Nói cách khác, các thư mục con và tệp kế thừa default ACL của thư mục cha.

Xét ví dụ sau:

Thêm một default ACLs vào một thư mục  mydir:
```
$ setfacl -d -m group:friends:r-x mydir/
```
Tuỳ chọn **-d** sẽ nhắc setfacl thực hiện một "chỉnh sửa" trên **default ACLs**
```
$ getfacl mydir/
# file: mydir
# owner: quanta
# group: quanta
user::rwx
user:kitty:rwx                  #effective:r-x
group::r-x
group:friends:rwx               #effective:r-x
mask::r-x
other::---
default:user::rwx
default:group::r-x
default:group:friends:r-x
default:mask::r-x
default:other::---
```
**getfacl** sẽ trả về cả **access ACL** và **default ACL**.

Nếu tạo một thư mục con trong mydir, thư mục con này kế thừa **default ACL** từ **mydir**:
```
$ mkdir mydir/mysubdir
$ getfacl mydir/mysubdir/
# file: mydir/mysubdir
# owner: quanta
# group: quanta
user::rwx
group::r-x
group:friends:r-x
mask::r-x
other::---
default:user::rwx
default:group::r-x
default:group:friends:r-x
default:mask::r-x
default:other::---
```

**access ACL** của **mysubdir** phản ánh chính xác d**efault ACL** của mydir.

Nếu tạo một tệp trong mydir, tệp này kế thừa default ACL từ mydir: 

```
$ touch mydir/myfile
$ ls -l mydir/myfile
-rw-r-----+ 1 quanta quanta 0 2008-01-07 00:59 mydir/myfile
$ getfacl mydir/myfile
# file: mydir/myfile
# owner: quanta
# group: quanta
user::rw-
group::r-x                      #effective:r--
group:friends:r-x               #effective:r--
mask::r--
other::---
```
Ví dụ khác, giả sử /public là thư mục dùng chung cho mọi người trong công ty, hãy thiết lập để sao cho bất kỳ ai thuộc bất kỳ nhóm nào cũng có khả năng đọc file va chuyển vào trong thư mục này nhưng chỉ có người dùng trong nhóm quantri mới có thể ghi vào các file trong thư mục này.
```
mkdir /public
chmod 777 /public
groupadd quantri
setfacl -d --set u::rx,g::rx,o::rx,g:quantri:rwx,m:rwx /public
getfacl /public
useradd user1; useradd user2; usermod -G quantri user1
su user2
cd /public
touch user2_file.txt
echo "Them noi dung" > user2_file.tx
 exit
su user1
cd /public
echo "Them noi dung" > user2_file.txt  -> permit denie
```

Ví dụ khác, giả sử file mark.doc nằm trong thư mục /data đã được thiết lập quyền truy xuất chuẩn nhưng người quản trị cần thêm hai quyền ACL nữa cho file này (người dùng dev có quyền đọc ghi và nhóm qa có quyền đọc). Hãy thiết lập chính xác hai quyền trên cho file mark.doc. Nếu muốn việc thiết lập quyền ACL luôn sẵn sàng khi khởi động máy trên phân vùng /dev/hda1 thì phải làm gì?

```
useradd dev
useradd qa
setfacl -m u:dev:rw,g:qa:r,m:rwx /public/mark.doc
getfacl /public/mark.doc
su k50
echo "Them noi dung" > /public/mark.doc
exit
su k50d
cat /public/mark.doc
echo "Them noi dung" > /public/mark.doc
```

# 6. Quyền truy cập trên file được tạo bởi một số lệnh phổ biến
- Lệnh cp: Khi được sao chép sang vị trí mới, quyền truy cập chính thức của file được tính theo công thức trình bày ở trên với giá trị mask tại vị trí đích. Trong trường hợp trùng tên file và bạn quyết định ghi đè thì quyền truy cập của file ở vị trí đích sẽ được bảo lưu. Sử dụng tùy chọn –p trong lệnh cp để lấy quyền truy cập của file nguồn.

-  Lệnh tar: Khi giải nén các file, lệnh tar lấy quyền truy cập của từng file làm quyền truy nhập cơ sở cho file đó.