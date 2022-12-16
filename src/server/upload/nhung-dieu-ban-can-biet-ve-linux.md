Mình là một lập trình viên ruby, và điều đó đồng nghĩa với việc môi trường làm việc của mình phần lớn là trên Linux. Và tất nhiên, để có thể làm việc được với Linux thì điều đầu tiên là chúng ta cần phải có những hiểu biết cơ bản nhất định về nó. Trong bài viết này mình sẽ giới thiệu một vài khái niệm trong Linux mà bạn nên biết nếu làm việc lâu dài với nó. 
## 1. Linux là gì?
Linux là một hệ điều hành mã nguồn mở dựa trên UNIX. Hệ điều hành là một phần mềm hệ thống dùng để quản lý phần cứng và phần mềm. Ví dụ bạn muốn thực hiện phép tính 1 + 1, hệ điều hành sẽ tạo điều kiện để input được thực hiện bằng các bộ vi xử lý máy tính (phần cứng) và hiển thị ra màn hình (phần mềm). Mã nguồn mở, có nghĩa là những bạn phát triển phần mềm và chia sẻ mã nguồn một cách miễn phí, những người khác có thể thêm vào đó các tính năng của riêng họ cũng như debug mã nguồn. 

Linux hiện có khá nhiều các bản phân phối khác nhau như Fedora, Ubuntu, OpenSUSE là các phiên bản thương mại, trong khi Debian và Arch Linux là các phiên bản "hướng cộng đồng". Và tất cả đều có một đặc điểm chung là có một Linux kernel bên trong. Linux thu hút các lập trình viên bởi tính linh hoạt, sức mạnh, tốc độ và phần mềm quản lý package cho phép cài đặt phần mềm một cách dễ dàng.
![](https://images.viblo.asia/403e8617-ace9-41ea-a303-0c5180206e7f.jpeg)
## 2.Kernel là gì?
Ở trên mình có nhắc đến kernel, vậy thì nó là cái gì? HIểu đơn giản thì kernel là trái tim của một hệ điều hành. Linux kernel là một phần mềm hệ thống low-level. Nó cung cấp các giao diện để tương tác ở mức người dùng. Nó quản lý các tài nguyên trong máy như RAM, Disk, Processort, các thiết bị đầu ra ..v..v..
## 3.Shell trong Linux là gì?
Linux shell là một giao diện người dùng cơ bản. Bạn có thể nhập input vào shell, nó sẽ thực thi các lệnh bạn gõ và giao tiếp với Linux OS để chạy. Có khác nhiều loại shell: BASH (Bourne Again SHell), CSH ( C Shell), KSH ( Korn Shell) và TCSH.
## 4.Bash là gì?
BASH là một short form của  Bourne Again SHell. Nó cũng là một command language và có các cú pháp command riêng của mình
## 5.File permission trong Linux là gì?
Có 3 loại quyền trong Linux bao gồm:
* `Read`: Người dùng chỉ có thể đọc file và liệt kê danh mục
* `Write`: Người dùng có thể viết file mới hoặc chỉnh sửa file
* `Execute`: Người dùng có thể truy cập và chạy file trong danh mục
Các danh mục (directory) ở đây tương tự như folder trên Windows. Các câu lệnh `chmod` và `chown` được sử dụng để kiểm soát truy cập file trong Unix và hệ thống Linux. `Chmod` có nghĩa là `change mode`, cho phép thay đổi permission của các file và folder trong Linux. `Chown` có là viết tắt của `change owner`.

![](https://images.viblo.asia/ed2e021f-8fea-4fb9-8e43-fbfcd236f344.jpeg)

Với `chmod`, User U, Groups G và Others O có thể được cấp các quyền khác nhau như Read, Write hay Excute đối với file và directory. Read có giá trị là 4, Write là 2 và Excute là 1. Thêm các giá trị này vào permission cần thiết và gán giá trị tương ứng cho nó 

![](https://images.viblo.asia/3da98a23-9eb2-44bd-bfd1-bc480ddd1674.png)
## 6.Sudo là gì?
`Sudo` là viết tắt của "super user do". Nếu bạn thêm `sudo` vào trước bất kì câu lệnh nào trong Linux, nó sẽ chạy câu lệnh đó với quyền cao nhất. Vì thế bạn có thể thực hiện các admin task nhất định như cài đặt server hay reboot. 

![](https://images.viblo.asia/8f1b4f37-bdd4-4206-892e-3bc8d0ba0b0b.png)

## 7.`Sudo rm -rf *`
Nhân nói đến `sudo` thì mình cũng nói đến `sudo rm -rf` luôn. Đây là câu lệnh sẽ xóa sạch tất cả mọi thứ trong máy. `rm` có nghĩa là remove, và thẻ `-rf` sẽ ép phải xóa toàn bộ thư mục. Và `*` , có nghĩa là toàn bộ file và folder trong hệ thống Linux.

![](https://images.viblo.asia/abb83c82-206e-4518-936c-cd18415f7071.jpeg)

## 8.Editor trên Linux là gì?
Một text editor là một ứng dụng phải có đối với bất kỳ hệ điều hành nào. Editor trên Linux có thể chia thành 2 loại: 
* GUI editors - Có đồ họa và thân thiện với người dùng. Ví dụ: Gedit, Sublime
* Console text editors - Chúng hoạt động ngay trong terminal, nhưng khá khó với người mới bắt đầu. Ví dụ: Vim, Nano, Vi
## 9. Bạn sử dụng câu lệnh nào trong các file hệ thống của Linux?
* `pwd`: Nó là một câu lệnh có sẵn, viết tắt của `print working directory`. Nó hiển thị toàn bộ đường dẫn tới thư mục hiện tại
* `ls`: liệt kê toàn bộ file trong folder hiện tại
* `cd`: Viết tắt của `change directory`. Lệnh này thường được sử dụng khi bạn muốn chuyển đổi thư mục
* `mkdir`: Tạo ra một directory mới
* `rmdir`: xóa một directory khỏi hệ thống
## 10. Câu lệnh quản lý nội dung file trong Linux là gì?
* `head`: Hiển thị bắt đầu của file
* `tail`: Hiển thị phần cuối cùng của file
* `cat`: kết hợp file và hiển thị (trên terminal)
* `more`: Hiển thị nội dung trong page form - một page một lần
* `less`: Hiển thị nội dung trong page forrm và cho phép lùi lại file

![](https://images.viblo.asia/2c9bdcf1-8a99-4a68-851d-5810bb2549a2.jpeg)

## 11. Cron là gì?
Cron là một phần mềm lập lịch jobs dựa trên thời gian. Nó lên lịch các jobs (các câu lệnh hoặc các đoạn script) để chạy định kỳ tại các thời gian cố định. Bạn có thể thiết lập để nó tải xuống bộ phim mới vào mỗi tối thứ sáu hàng tuần chẳng hạn, bằng cách viết một đoạn script và gán nó cho cron
## 12. LVM là gì?
LVM, hay Logical Volume Management, là một công nghệ quản lý thiết bị lưu trữ. Nó cho phép người dùng có khả năng nhốm và trừu tượng các bố cục vật lý của các thiết bị lưu trữ thành phần như ở đĩa cứng hay ổ đĩa ngoài để quản lý một cách dễ dàng và linh hoạt
## 13.CLI là gì?
CLI (Command Line Interface) là một giao diện text-based trong Linux, cho phép người dùng tương tác với hệ điều hành và các ứng dụng. Nó không giống như GUI (Graphical User Interface) trong Window với các icon, link và folder. CLI cho phép người dùng thực hiện các task bằng cách gõ các dòng lệnh trên terminal. Cơ chế làm việc rất dễ dàng và nhanh chóng, tuy nhiên lại không thân thiện với người dùng.
## 14. LILO là gì?
LILO (Linux Loader) là một boot loader của hệ điều hành Linux dùng để load nó vào trong main memory để khởi động. Bootloader ở đây là một chương trình nhỏ quản lý dual boot. LILO nằm trong MBR (Master Boot Record)
## 15. Grep, Awk và Sed command là gì?
Grep, Awk và Sed là 3 công cụ command-line hữu ích nhất
* `Grep (Global Regular Expression Print)` được sử dụng để tìm kiếm các chuỗi nhất định trong một file. Ví dụ, dùng để tìm kiếm các dòng có từ `result`
* `Awk` được sử dụng để khai thác dữ liệu và báo cáo trong file Excel. Ví dụ, để in ra các cột cụ thể trong một sheet excel. 
* `Sed` -  `Stream Editor`, có thể thực hiện việc chuyển text trong file đã có. Ví dụ, bạn muốn replace toàn bộ một cụm từ trong file bằng một cụm từ khác, hãy dùng `Sed`
## 16. Làm sao để tìm kiếm sự giúp đỡ trong Linux?
* Chạy command với `-h` hoặc `-help`. Ví dụ, bạn muốn biết `ls` là gì, hãy gõ `ls -help`
* `man` command sẽ hiển thị chi tiết cho mỗi command. Ví dụ, bạn muốn biết về `ls` command, hãy gõ `man ls`

Trên đây là một số điều cơ bạn mà các bạn cần biết khi bắt đầu làm việc với môi trường Linux. Để tìm hiểu sâu hơn, các bạn có thể tham khảo ở các link sau: 

https://www.pcworld.com/article/2918397/operating-systems/how-to-get-started-with-linux-a-beginners-guide.html
https://www.tutorialspoint.com/unix/


Bài viết được dịch từ: https://hackernoon.com/heres-what-you-need-to-know-about-linux-a7de13769a74C