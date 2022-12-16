# I. Giới thiệu:
## 1. Linux:
- Linux là một hệ điều hành máy tính được phát triển đầy tiên do Linux Torvalds viết vào năm 1991, khi ấy tác giả vẫn là sinh viên tại đại học Helsinki tại Phần Lan. <br>
- Hệ điều hành hỗ trợ một lượng lớn kiến trúc xử lý và được sử dụng trong nhiều ứng dụng khác nhau để phát triển các phần mềm như Web, các ngôn ngữ lập trình, cơ sở dữ liệu ... <br>
- Nhưng hiện tại phần cứng hỗ trợ linux vẫn còn khá khiêm tốn bởi vì các thiết bị tương thích với WIndown nhiều hơn Linux và giao diện của Linux cũng không thân thiện và dễ sử dụng như hệ điều hành Windown.<br>
- Bù lại Linux lại có tốc độ nổi bật với chi phí phần cứng thấp cộng với hệ thống bảo mật rất cao nên được các nhà phát triển (developer) yêu thích.<br>
## 2. User:
- Linux có một hệ thống phân quyền sử dụng khá là đa dạng chia làm 3 phần đó là: User, Group, Other. <br>
+ User: ở đây được hiển là Own. Là user thường dùng để đăng nhập và thao tác tất cả trên hệ điều hành Linux.<br> Ví dụ: Khi cài đặt xong Linux bạn sẽ thường phải có user ban đầu mặc định đó là root để thao tác tất cả các xử lý của hệ thống và phần mềm. Bạn cũng có thể tạo ra 1 hoặc nhiều user để sử dụng chúng ta sẽ cùng tìm hiểu ở phần bên dưới.<br>
+ Group: là một nhóm mà Linux bạn định nghĩa để dễ quản lý và phân quyền. <br> 
Ví dụ: Nhóm A là thành viên: X và Y, và bạn quy định nhóm A chỉ được quyền sử dụng trên 1 folder NHOM_A -> các thành viên X và Y chỉ được thao tác trên foder NHOM_A. <br>
+ Other: được hiểu là những User không phải Own và không thuộc những group được quyền thao tác trên folder đó. <br>
+ Và 1 lưu ý khá quan trọng nữa là Uset: root mặc định khi bạn cài đặt hệ điều hành có quyền lực mạnh nhất trong hệ điều hành( trùm).
# II. Phân quyền:
## 1. Những loại quyền chính:
### a. Read permission:
- Đối với File loại quyền này bạn chỉ có khả năng thao tác là mở file và đọc những nội dung bên trong filfe đó. <br>
- Nếu là Folder, bạn có thể xem list các nội dụng bên trong thư mục đó. <br>
- Và loại quyền này là có độ nguy hiểm với hệ thống là thấp nhất bởi vì người dùng chỉ có thể đọc nội dung của bạn. <br> 
- Kí hiệu: `r`. <br>
### b. Write permission:
* Đối với File, bạn có quyền viết và chỉnh sửa nội dung theo mong muốn của mình, thêm xóa các nội dung bên trong file. <br>
- Còn trong Folder, nếu bạn sở dũng nó thì gần như nắm giữ hết quyền lực ^^! có thể thêm file, sửa nội dụng thậm chí xóa cả file đó đi nếu nó không cần thiết. <br>
- Với loại quyền này bạn nên cân nhắc khi trao quyền này cho bất cứ user nào bởi vì mức độ ảnh hưởng và nguy trọng là mức cao nhất. <br>
- Kí hiệu: `w`. <br>
### c. Execute permission:
- Thực sự mình cũng khá lạ với quyền này lúc mới bắt đầu tìm hiểu về các loại quyền của Linux. Và mình thấy nó khá chả quan trọng gì nhưng mình đã sai khi bắt đầu thực hiện các dự án mà có các phần xử lý liên quan đến shell script. Vì mình không có quyền chạy nó :(((<br>
- Thì như cái tên nó có thể giúp User có quyền thực thi các lệnh của Linux, shell script...  <br>
Ví dụ: Chạy nội dung của FIle A.html<br>
- Với folder, phần này cho phép accesss vào folder và thực thi nhưng lệnh đã được quy định của Linux.<br>
Ví dụ: `ls -l`, `cd`, `cp`...
- Kí hiệu: `x`. <br>
## 2. Cấu trúc phần quyền của 1 Folder:
- Đối với 1 folder hay 1 directory bất kì thì đều bị tác động bởi 3 loại phần quyền người dùng ở phần 1 mình đã giới thiệu đó là: Own, Group, Other. <br>
Ví dụ: <br>
```
[root@task ~]# ls -l
total 32
-rw-------. 1 root root  1412 Aug 10 16:06 con-ks.cfg
-rw-r--r--. 1 root root 14522 Aug 10 18:06 install.ext
-rw-r--r--. 1 root root  5037 Jan 10 13:06 hello.pdf
drwxr-xr-x  6 root root  4196 Feb  9 10:02 text.txt
```
- Các quyền hạn : <br>
Read – r – 4  : cho phép đọc nội dung. <br>
Write – w – 2  : dùng để tạo, thay đổi hay xóa. <br>
Execute – x – 1  : thực thi chương trình. <br>
- Ví dụ : quyền r, w, x : 4+2+1 = 7<br>
Tổ hợp 3 quyền trên có giá trị từ 0 đến 7.
## 3.  Một số lệnh phân quyền thường dùng:
- Lệnh Chmod : dùng để cấp quyền hạn.<br>
Cú pháp : #chmod  <specification> <file>
- Ví dụ: #chmod 644 hello.txt <br>  -> cấp quyền cho owner có thể ghi các nhóm các chỉ có quyền đọc với file hello.txt
- Lệnh Chown : dùng thay đổi người sở hữu. <br>
 Cú pháp : #chown  <owner>  <filename>
- Lệnh Chgrp : dùng thay đổi nhóm sở hữu.<br>
Cú pháp : #chgrp  <group>  <filename>
# III. Tham khảo: <br>
- GocIT: http://gocit.vn
- Baomat: http://wiki.matbao.net
- Medium: https://medium.com