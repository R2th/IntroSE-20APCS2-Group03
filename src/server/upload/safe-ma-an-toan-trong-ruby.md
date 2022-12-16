## Đặt vấn đề:
-  Chắc irb thì bất cứ bạn nào code ruby đều đã sử dụng qua, nó giúp chúng ta thực thi chương trình, tương tự ta cũng có lênh eval() đê thực thi các câu lệnh dưới dạng string do người dùng nhập vào. Nhưng việc thực thi những dòng lệnh đến từ bên ngoài chương trình là thật sự nguy hiểm. Về cơ bản bất cứ điều gì cũng có thể xảy ra, người dùng có thể dừng, xóa dữ liệu.. thực thi bất cứ câu lệnh nào mà người dùng nhập vào.  Chỉ với 1 lệnh đơn giản chúng ta có thể thực hiện xóa 1 file;
```
irb> eval "File.delete 'file'"
=> 1
```
- Và đây là lúc mà $SAFE phát huy tác dụng của nó.
## $SAFE là gì?
- Tóm gọn lại mình sẽ chỉ giải thích ngắn gọn để giúp các bạn đủ hiểu cách sử dụng $SAFE mà không phải quá đau đầu với nó, $SAFE được sinh ra nhằm mục đích xác định mức độ an toàn hay mức độ bảo mật của ruby.
-  Giá trị của $SAFE nằm trong khoảng từ giá trị tối thiểu 0 đến giá trị tối đa 4. Nó sẽ đánh giá các dữ liệu hay các đoạn code ở các mức độ từ 0 đến 4, Và đối với mỗi cấp độ, các thao tác sẽ bị giới hạn.
##  Các level của $SAFE:
- Với mỗi mức độ tăng dần của $SAFE sẽ tăng dần hạn chế các thao tác.

* Level 0: Giá trị mặc định của $SAFE và mọi thứ hoạt động ở môi trường bình thường.
* Level 1: Dữ liệu nguy hiểm, các dữ liệu nguy hiểm sẽ được đánh giá là tained và không cho phép sử dụng, ta sẽ không thể sử dụng eval hay File.Open với các dữ liệu này.
* Level 2: 
    *  Không thể thay đổi, tạo hoặc xóa thư mục hoặc sử dụng chroot.
    * Không thể tải tệp từ thư mục có thể ghi.
    *  Không thể tải tệp từ tên tệp bị nhiễm độc (tainted) bắt đầu bằng ~.
    *  Không thể sử dụng File # chmod, File # chown, File # lstat, File.stat, File # truncate, File.umask, File # flock, IO # ioctl, IO # stat, Kernel # fork, Kernel # syscall, Kernel # bẩy . Process :: setpgid, Process :: setsid, Process :: setp Warriority hoặc Process :: egid =.
    *  Không thể xử lý tín hiệu bằng trap.
* Level 3: Các đối tượng được tạo mới đều sẽ được đánh già là nguy hiểm (tainted)  và không thể untaint.
* Level 4:  Các thao tác như exit (), nhập xuất tệp, thao tác luồng (thread), định nghĩa lại phương thức..  đều không thể sử dụng.

- Chi tiết bạn có thể xem thêm tại http://ruby-doc.com/docs/ProgrammingRuby/html/taint.html
## Sử dụng $SAFE như thế nào?
- Bạn chỉ việc gán giá trị level cho biến $SAFE nếu bạn thật sự cảm thấy không an toàn:
- Ở đây mình chỉ gán level là 2 (sẽ không cho phép thực thi các thao tác với File).  
```
irb> $SAFE = 2
irb> eval "File.delete 'file'"
SecurityError: Insecure operation `delete' at level 2
	from (irb):2:in `eval'
	from (eval):1
	from (irb):2:in `eval'
	from (irb):2
	from /usr/bin/irb:11:in `'
```
- Ta có thể viết lại nó trong proc để nó chỉ ảnh hưởng đến cách lệnh thực thi trong proc: 
```
proc {
  $SAFE = 2
  eval @input
  }
```
- Hoặc ta có thể sử dụng chỉ áp dụng khi các dữ liệu được nhập từ bên ngoài.
```
proc {
$SAFE = 2 if @input.tainted?
eval @input
}
```
## Kết luận 
- Hi vọng qua bài viết các bạn sẽ có cái nhìn tổng quát hơn về $safe cũng như sự nguy hiểm thế nào nếu ta thật sự sử dụng eval 1 cách tùy tiện. Bài viết có thể còn nhiều thiếu xót nếu các bạn có thắc hoặc góp ý có thể comment ngay bên dưới nhé.
- Một số link liên quan: http://ruby-doc.com/docs/ProgrammingRuby/html/taint.html
https://ruby-hacking-guide.github.io/security.html