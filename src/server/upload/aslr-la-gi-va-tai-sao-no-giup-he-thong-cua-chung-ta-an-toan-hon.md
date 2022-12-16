## 1. Mở đầu
* Address Space Layout Randomization (ASLR) - Ngẫu nhiên hóa sơ đồ không gian địa chỉ là một kỹ thuật bảo mật được sử dụng trong các hệ điều hành, được triển khai lần đầu tiên vào năm 2001. Các phiên bản hiện tại của tất cả các hệ điều hành phổ biến (như iOS, Android, Windows, macOS và Linux) đều có ASLR. 
* ASLR lần đầu được giới thiệu là một bản vá cho kernel Linux, mục tiêu của nó là phân đoạn ngẫu nhiên bộ nhớ, góp phần tránh bị các chương trình độc hại lợi dụng. 
* Trước khi giải thích thế nào là ASLR, chúng ta cần tìm hiểu về virtual memory - bộ nhớ ảo.

## 2. Sơ qua về Virtual Memory
* Bộ nhớ ảo là một kỹ thuật cho phép xử lý một tiến trình không được nạp toàn bộ vào bộ nhớ vật lý. 
* Bộ nhớ ảo mô hình hoá bộ nhớ như một bảng lưu trữ rất lớn và đồng nhất, tách biệt hẳn khái niệm không gian địa chỉ và không gian vật lý. Người sử dụng chỉ nhìn thấy và làm việc trong không gian địa chỉ ảo, việc chuyển đổi sang không gian vật lý do hệ điều hành thực hiện với sự trợ giúp của các cơ chế phần cứng cụ thể.
* Bộ nhớ ảo cho phép một chương trình ứng dụng tưởng rằng mình đang có một dải bộ nhớ liên tục (một không gian địa chỉ), trong khi thực ra phần bộ nhớ này có thể bị phân mảnh trong bộ nhớ vật lý và thậm chí có thể được lưu trữ cả trong đĩa cứng. 

![](https://images.viblo.asia/96dfb759-1c4c-4bc9-b5ee-68cde2a641e4.png)

* Bộ nhớ ảo giúp các chương trình quản lý bộ nhớ của chúng dễ dàng và an toàn hơn. Các chương trình không cần phải lo lắng về việc các chương trình khác đang lưu trữ dữ liệu ở đâu hoặc còn lại bao nhiêu RAM. Chương trình này không được phép xem một bộ nhớ của chương trình khác.

## 3. ASLR là gì?
- ASLR là một kĩ thuật phòng thủ bằng cách ngẫu nhiên hóa địa chỉ bộ nhớ của các tiến trình, cố gắng ngăn chặn việc tấn công thông qua vị trí của các applications memory map. Để tăng tính bảo mật cho hệ thống, thay vì loại bỏ lỗ hổng bằng các công cụ mã nguồn mở, ASLR khiến cho việc khai thác các lỗ hổng hiện có trở nên khó khăn hơn.
-  Nhìn chung, các ứng dụng nên được biên dịch với sự hỗ trợ ASLR. Tính năng này dần trở thành mặc định, và đã được áp dụng với các phiên bản Android 5.0 trở lên.

## 4. Cấu hình ASLR trên Linux
- Dùng 1 trong 2 lệnh dưới đây để kiểm tra xem hệ thống của bạn có đang chạy ASLR hay không.
```
$ cat /proc/sys/kernel/randomize_va_space
2
$ sysctl -a --pattern randomize
kernel.randomize_va_space = 2
```
- Ý nghĩa của các giá trị trả về như sau:
> 0 = Disabled
> 
> 1 = Conservative Randomization
> 
> 2 = Full Randomization
- Nếu bạn tắt ASLR, sau đó chạy các command như dưới đây, các địa chỉ hiển thị trong phần output hoàn toàn giống nhau trong các lệnh ldd liên tiếp.
- ldd : xem các thư viện được sử dụng cho một ứng dụng trên Linux, load các shared objects và hiển thị ra nơi chúng kết thúc trong bộ nhớ
> Disable ASLR:
```
root@ubuntu:~# sysctl -w kernel.randomize_va_space=0
kernel.randomize_va_space = 0
root@ubuntu:~# ldd /bin/bash 
	linux-vdso.so.1 (0x00007ffff7ffb000)
	libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007ffff7891000)
	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007ffff768d000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007ffff729c000)
	/lib64/ld-linux-x86-64.so.2 (0x00007ffff7dd5000)
root@ubuntu:~# ldd /bin/bash 
	linux-vdso.so.1 (0x00007ffff7ffb000)
	libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007ffff7891000)
	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007ffff768d000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007ffff729c000)
	/lib64/ld-linux-x86-64.so.2 (0x00007ffff7dd5000)
```
- Nếu đặt lại giá trị của parameter thành 2 để bật ASLR, các địa chỉ sẽ khác nhau sau mỗi lần bạn chạy câu lệnh.
> Enable ASLR:
```
root@ubuntu:~# sysctl -w kernel.randomize_va_space=2
kernel.randomize_va_space = 2
root@ubuntu:~# ldd /bin/bash 
	linux-vdso.so.1 (0x00007ffc349b0000)
	libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f76d26db000)
	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f76d24d7000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f76d20e6000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f76d2c1f000)
root@ubuntu:~# ldd /bin/bash 
	linux-vdso.so.1 (0x00007ffebb689000)
	libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f7e30c36000)
	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f7e30a32000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f7e30641000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f7e3117a000)
```

## 5. ASLR giảm thiểu các cuộc tấn công buffer overflow 
- ASLR gia tăng tính toàn vẹn của luồng điều khiển (control-flow) của một hệ thống, khiến các cuộc tấn công tràn bộ đệm khó thành công hơn bằng cách ngẫu nhiên các offsets mà nó sử dụng trong phân bổ vị trí bộ nhớ.
![](https://images.viblo.asia/3d2e6514-d768-422d-87cb-b862b54ec7f0.png)
*Không gian địa chỉ của các chương trình được thay đổi ngẫu nhiên*
- Để thực hiện các cuộc tấn công tràn bộ đệm, kẻ tấn công cần chuẩn bị một hàm nhiều dữ liệu rác nhất có thể, sau đó là một playload độc hại. Payload này sẽ ghi đè lên dữ liệu mà chương trình dự định truy cập.
- Buffer overflows yêu cầu kẻ tấn công biết vị trí từng phần của chương trình trong bộ nhớ. Quá trình tìm chính xác vị trí này khá khó khăn vì cần thử nhiều lần và chắc chắn nhiều lỗi sẽ xảy ra. Sau khi xác định xong, kẻ tấn công phải tạo ra một payload và tìm một nơi thích hợp để inject nó vào. Nếu kẻ tấn công không biết target code nằm ở đâu, thì việc khai khác sẽ trở nên khó khăn hoặc thậm chí là không thể.
- ASLR hoạt động cùng với quản lý bộ nhớ ảo để đặt ngẫu nhiên từng vị trí của các phần khác nhau của một chương trình trong bộ nhớ. Mỗi khi chương trình được chạy, các thành phần (bao gồm stack, heap, và libraries) ) sẽ được chuyển đến một địa chỉ khác trong bộ nhớ ảo. Những kẻ tấn công không còn có thể biết mục tiêu của chúng ở đâu, bởi vì địa chỉ sẽ khác nhau mỗi lần.
- ASLR hoạt động tốt hơn đáng kể trên các hệ thống 64 bit, vì các hệ thống này cung cấp số lượng các entropy (vị trí ngẫu nhiên tiềm năng) lớn hơn nhiều.

## 5. Hạn chế của ASLR
Mặc dù ASLR làm cho việc khai thác các lỗ hổng hệ thống trở nên khó khăn hơn, khả năng bảo vệ hệ thống của nó vẫn bị hạn chế: 
- Không giải quyết các lỗ hổng
- Không thể theo dõi hoặc báo cáo các lỗ hổng 
- Không cung cấp bất kỳ sự bảo vệ nào cho các binaries không được xây dựng với hỗ trợ ASLR 

## References
https://www.howtogeek.com/278056/what-is-aslr-and-how-does-it-keep-your-computer-secure/
https://www.networkworld.com/article/3331199/what-does-aslr-do-for-linux.html