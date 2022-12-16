## Tổng quan về hệ thống UNIX

### Giới thiệu

Tất cả các hệ điều hành cung cấp dịch vụ cho các chương trình chạy trên đó. Các dịch vụ điển hình bao gồm việc thực thi chương trình mới, mở một tập tin, đọc tập tin, cấp phát vùng nhớ, lấy thời gian hiện tại, ... Mục tiêu của sách để mô tả các dịch vụ được cung cấp bởi rất nhiều phiên bản của hệ điều hành UNIX.

Việc mô tả hệ thống UNIX một cách nghiêm ngặt sẽ không được mô tả ở đây, nó gần như không thể (và nếu có thì cũng rất chán nản). Chương này giúp bạn lướt qua hệ thống UNIX từ cái nhìn của một lập trình viên. Chúng tôi sẽ gửi bạn vài nét về các tính năng và sẽ đi vào chi tiết trong các chương sau. Chương này sẽ cung cấp một giới thiệu để giới thiệu tổng quan về các dịch vụ bởi hệ thống UNIX cho các lập trình viên mới.

### Kiến trúc UNIX

Một định nghĩa chuẩn, hệ điều hành có thể được định nghĩa như là một chương trình điều khiển các tài nguyên phần cứng của máy tính và cung cấp môi trường cho phép các chương trình có thể chạy trên nó. Nói chung, chúng ta có thể gọi phần mềm này là kernel, kể từ khi nó tương đối nhỏ và trú ngụ bên trong lõi của môi trường. Hình 1.1 sẽ mô tả kiến trúc UNIX.

![](https://images.viblo.asia/3f8da9e6-f53f-44e5-a8a9-1b6f1755adbc.png)

Interface của kernel là các lớp phần mềm được gọi là system calls. Các thư viện của các hàm thường dùng được xây dựng trên system call interface, các ứng dụng có thể thoải mái sử dụng. (Chúng ta sẽ nói nhiều hơn về system calls và library fucntion). The shell là chương trình đặc biệt cung cấp một interface để chạy các ứng dụng khác.

Theo một nghĩa rộng hơn, một hệ điều hành bao gồm kernel và tất cả các chương trình tạo cho một máy tính hữu dụng và tạo ra cá tính của máy tính. Các phần mềm khác bao gồm system utilities, ứng dụng, shells, library of common function, ...

Ví dụ, Linux là kernel được sử dụng bởi GNU operating system. Một vài người nhắc đến là GNU/Linux operating system, nhưng thông thường được nhắc đến đơn giản là Linux. Mặc dù cách hiểu này là không hoàn toàn đúng, nhưng nó lại dễ hiểu.

### Đăng nhập

#### Tên đăng nhập

Khi chúng ta đăng nhập vào hệ thống UNIX, chúng ta sẽ nhập tên đăng nhập và mật khẩu. Hệ thống sẽ tìm kiếm tên đăng nhập trong password file, thường là /etc/passwd. Nếu chúng ta đọc password file, chúng ta sẽ nhìn thấy nó gồm 7 trường phân cách bởi dấu hai chấm: tên đăng nhập, mật khẩu được mã hóa, user id (205), group id(105), trường mô tả (Stephen Rago), home directory(/home/sả), shell program (/bin/kash)

sar:x:205:105:Stephen Rago:/home/sar:/bin/ksh

Tất cả các hệ thống đều di chuyển các mật khẩu được mã hóa tới các file khác. Trong chương 6, chúng ta sẽ xem các tập tin này và một vài hàm để truy cập chúng.

#### Shells

Mỗi lần chúng ta đăng nhập, một vài thông tin về hệ thống sẽ được hiển thị, và sau đó chúng ta có thể gõ lệnh vào shell (Một vài hệ thống bắt đầu một chương trình quản lý cửa sổ sau khi bạn đăng nhập, nhưng bạn thường kết thúc với một shell đang chạy một cửa sổ). Một shell là một trình thông dịch dòng lệnh đọc vào từ người dùng và thực thi các lệnh. Người dùng nhập lệnh tới shell thường thông qua terminal(một shell tương tác) hoặc thỉnh thoảng từ file (được gọi là shell script). Các shell thông thường có thể xem ở bảng 1.2

![](https://images.viblo.asia/5fd33da9-8af8-4ede-987a-21d67f5298d9.png)

Hệ thống biết shell nào để thực thi cho chúng ta dựa vào trường cuối trong password file.

The Bourne shell, được phát triển bởi Steve Bourne at Bell Labs, được cung cấp bởi hầu hết các hệ thống UNIX. Cấu trúc luông điều khiển của Bourne shell lấy ý tưởng của Algol 68.

The C shell, được phát triển bởi Bill Joy tại Berkeley, được cung cấp với tất cả các bản phát hành BSD. Thêm vào đó, C shell được cung cấp bởi AT&T với bản phát hành System V/386 3.2 và cung bao gồm tỏng System V Release 4 (SVR4). (Chúng ta phải nói nhiều hơn về sự khác biệt giữa các hệ thống UNIX trong chương tiếp theo.). C shell được xây dựng tới phiên bản thứ 6. Luồng điều khiển của nó giống với ngôn ngữ C, và nó hỗ trợ các tính năng mới không được cung cấp bởi Bourne shell: job control, history mechanism, command-line editting.

The Korn shell được cân nhắc để thay thế Bourne shell và lần đầu được cung cấp với SVR4. The Korn shell, được phát triển bởi David Korn tại Bell Labs, chạy trên hầu hết hẹ thống UNIX, nhưng trước SVR4 nó được coi là một extra-cost add-on, vì thế nó không được sử dụng rộng rãi như 2 shell kia. Nó cũng tương thích với Bourne shell và bao gồm các tính năng làm cho C shell thông dụng: job control, command line editting, ...

Bourne-again shell được GNU cung cấp với tất cả các hệ thống Linux. (Người dịch: bash). Nó được thiết kế để phù hợp với chuẩn POSIX, trong khi tương thích với Bourne shell, nó cũng hỗ trợ các tính năng của cả C shell và Korn shell.

TENEX C shell là một bản nâng cấp của C shell. Nó vay mượn các tính năng, như command completion, từ hệ điều hành TENEX (phát triển năm 1972 tại Bolt Beranek và Newman). The TENEX C shell thêm nhiều tính năng từ C shell và thường xuyên được sử dụng để thay thé C shell.

Shell được chuẩn hóa trong POSIX 1003.2 Chuẩn này xây dựng trên các tính năng của Korn shell và Bourne shell

Shell mặc định trên các bản phân phối Linux rất đa dạng. Một vài bản phân phối Linux sử dụng Bourne-again shell. Số khác sử dụng bản thay thế cho Bourne shell, gọi là dash (Debian Almquist shell, được viết bởi Kenneth Almquist). Shell mặc định trên FreeBSD là Almquist shell. Shell mặc định trên Mac OS X là Bourne-again shell. Solaris cung cấp tất cả các shell được cung cấp ở hình trên. Tất cả các shell đều có sẵn trên Internet.

Thông qua cuốn sách (trong sách ghi là text, this text), chúng tôi sẽ hiển thị các ví dụ mà chúng tôi phát triển. Các ví dụ sử dụng các tính năng thường dùng của Bourne shell, Korn shell và Bourne-again shell

### Tập tin và thư mục

#### File system

Hệ thống tập tin trên UNIX có cấu trúc cây tập hợp các thư mục và tập tin. Tất cả bắt đầu từ một thư mục được gọi là root, được đặt tên là /.

Một thư mục là một tập tin bao gồm nhiều mục. Về mặc logic, chúng ta có thể nghĩ mỗi thư mục bao gồm các tập tin, với thông tin về cấu trúc được mô tả trong các thuộc tính của tập tin. Các thuộc tính về tập tin như kiểu tập tin (regular file, directory), kích cỡ của file, chủ sở hữu, quyền, và lần chỉnh sửa cuối. Hàm stat và fstat trả về cấu trúc thông tin bao gồm tất cả các thuộc tính của tập tin. Chương 4, chúng tôi xem xét tất cả thuộc tính của tập tin.

Chúng tôi phân biệt giữa cách nhìn logic và cách lưu trên đĩa. Hầu hết các hệ thống UNIX không lưu trữ các thuộc tính trong chính thư mục, bởi vì khó khăn trong việc giữ chúng đồng bộ khi các tập tin có nhiều hard links. Điều này sẽ được trình bày rõ hơn khi chúng ta thảo luận về hard links trong chương 4.

#### Filename

Các tên trong thư mục được gọi là filenames. Chỉ 2 ký tự không được phép có trong tên file là dấu gạch chéo vào ký tự null (/ , \0). Dấu gạch chéo phân cách tên file thành các được dẫn (sẽ được mô tả sau đó). Tuy nhiên, tốt hơn vẫn nên giới hạn các ký tự được sử dụng cho việc đặt tên file (Nếu chúng ta sử dụng các ký tự đặc biệ trong shell, nó có thể gây ra các rắc rốt). Theo chuẩn POSIX.1 chỉ nên sử dụng các ký tự letters (a-zA-Z), numbers (0-9), period (.), dash (-), underscore (_).

Hai filenames được tạ động tạo khi tạo một thư mục mới được gọi là: . (dot) và .. (dot-dot). Dot chỉ đến thư mục hiện tại, dot-dot chỉ đến thư mục cha. Tập tin root dot-dot sẽ giống dot.

Nghiên cứu hệ thống UNIX và một số bản cũ của UNIX System V giới hạn tên file tỏng 14 ký tự, Các phiên bản BSD mở rộng giới hạn tới 255 ký tự, Ngày nay hầu hết các bản UNIX thương mại hỗ trợ ít nhất 255 ký tự.

#### Pathname

Một tập một hoặc nhiều filenames, phân cách bởi dấu gạch chéo và có thể bắt đầu với một gạch chéo. Một pathname bắt đầu với một dấu / được gọi là absolute pathname, ngược lại nó được gọi là một relative pathname. Relative pathnames chỉ đến tất cả các tập tin tới đường dẫn hiện tại. Tên của root là / là một trường hợp đặc biệt không có filename.

#### Ví dụ

Hiển thị danh sách tất cả tập tin trong thư mục là không khó. Hình 3, sẽ hiện thị một phiên bản đơn giản của lệnh ls

```C

#include "apue.h"
#include <dirent.h>
int
main(int argc, char *argv[])
{
    DIR *dp;
    struct dirent *dirp;
    if (argc != 2)
    err_quit("usage: ls directory_name");
    if ((dp = opendir(argv[1])) == NULL)
    err_sys("can’t open %s", argv[1]);
    while ((dirp = readdir(dp)) != NULL)
    printf("%s\n", dirp->d_name);
    closedir(dp);
    exit(0);
}

```

Ký hiện ls(1) là cách để đánh dấu trong tài liệu hướng dẫn sử dụng UNIX. Nó chỉ đến ls trong Phần 1 của sách đó. Các phần được đánh dấu từ 1 đến 8, tất cả phần được sắp xếp theo abc.

Ngược dòng lịch sử, hệ thống UNIX đã gộp 8 phần cùng nhau thành UNIX Programmer's Manual. Số lượng trang tăng lên, tách ra làm các phần: cho người dùng bình thường, cho lập trình viên, cho các quản trị hệ thống.

Ngày nay, hầu hết các tài liệu đã được số hóa. Đây là cách bạn xem tài liệu ls 

```bash

man 1 ls

```

```bash

man -s1 ls

```

Hình sau sẽ được in ra tên của tất cả các file trong thư mục. Nếu file mã nguồn được đặt tên là myls.c, chúng ta sẽ biên dịch nó thành file a.out và thực thi bằng cách

```bash

cc myls.c

```

Trong lịch sử, cc(1) là một trình biên dịch C. Trên các hệ thống GNU C compilation system, C compiler là gcc(1). Tuy nghiên cc thường được liên kết tới gcc

Vài ví dụ về đầu ra là:

```

$ ./a.out /dev
.
..
cdrom
stderr
stdout
stdin
fd
sda4
sda3
sda2
sda1
sda
tty2
tty1
console
tty
zero
null
many more lines that aren’t shown
mem
$ ./a.out /etc/ssl/private
can’t open /etc/ssl/private: Permission denied
$ ./a.out /dev/tty
can’t open /dev/tty: Not a directory

```

Nhớ rằng các file trong thư mục là không theo thứ tự alphabetical, lệnh ls sẽ sắp xếp các tên trước khi in ra chúng.

Có nhiều chi tiết cần phải xem xét trong 20 dòng mã trên.

Đầu tiên, chúng ta include thư viện apue.h của chúng tôi. Chúng ta sẽ sử dụng header này cho hầu hết các chương trình trong cuốn sách. Header này bao gồm các header hệ thống chuẩn định nghĩa một vài các constants và định nghĩa hàm chúng ta sử dụng trong sách. Danh sách này có trong Appendix B.

Tiếp theo chúng ta sẽ include một hàm hệ thống, dirent.h, để lấy được hàm số này cho hàm opendir, readdir, Trong vài hệ thống, các định nghĩa này chia thành nhiều header file. Ví dụ trong Ubuntu 12.04, /usr/include/dirent.h định nghĩa các function prototypes và include bits/dirent.h, thực sự định nghĩa trong /usr/include/x86_64-linux-gnu/bits

Định nghĩa hàm main theo chuẩn ISO C standard. (Chúng ta sẽ nói nhiều hơn chuẩn ISO C trong chương tiếp theo).

Tham số argv[1]. Trong Chương 7, chúng tôi sẽ tìm hiểu thêm về main function và cách gọi trong giao diện dòng lệnh và các biến môi trường truy cập từ chương trình.

Bởi vì định dạng thực sự của directory entries từ một hệ thống UNIX tới cái khác, chúng tôi sử dụng hàm opendir, readdir, closedir để sử dụng thư mục.

Hàm opendir trả về một con trỏ tới một cấu trúc, chúng ta sẽ truyền một con trỏ tới readdir. Chúng ta không cần quan tâm cái gì trong DIR structure. Chúng ta sẽ gọi hàm readdir trong vòng lặp để đọc các mục trong thư mục. Hàm readdir trả về một con trỏ tới dirent structure hoặc sau đó được kết thúc với thư mục, một null pointer. Tất cả chúng ta hãy hình dung cấu trúc dirent là tên của mỗi directory entry (d_name). Sử dụng tên này, chúng ta có thể gọi hàm stat (Phần 4.2) để xem các thuộc tính của file.

Chúng ta sẽ gọi 2 hàm để xử lý lỗi: err_sys và err_quit. Chúng ta có thể xem đầu ra của hàm err_sys in ra định dạng như ("Permission denied" hoặc "Not a directory"). Hai lỗi này được hiển thị và mô tả trong Appendix B. Chúng ta sẽ nói thêm về xử lý lỗi trong Phần 1.7

Sau khi chương trình của chúng ta hoàn thành, nó sẽ gọi hàm exit với đối số là 0. Hàm exit sẽ kết thúc chowng trình, Để thuận tiện, một đối số là 0 nghĩa là OK, và một đối số từ 1 đến 255 nghĩa là có lỗi xảy ra. Trong chương 8.5 chúng ta sẽ xem bất kỳ chương trình nào, như là shell hoặc một chương trình của chúng ta viết có thể lấy được trạng thái exit của một chương trình khi chúng thực thi.

#### Working Directory

Tất cả các tiến trình đều có một working directory, thỉnh thoảng được gọi là current working directory. Đây là thư mục để tất cả các relative pathnames thực thi. Một tiến trình có thể thay đổi working directory với lệnh chdir function.

Ví dụ đường dẫn tuyệt đối đang là doc/memo/joe refer tới file hoặc thư mục joe, trong thư mục memo, trong thư mục doc, cái phải là một thư mục trong working directory. Từ ví trí này chúng ta biết doc  và memo phải là thư mục, nhưng chúng ta không thể nói là joe là file hay thư mục. Pathname /usr/lib/lint là đường dẫn tuyệt đối refer tới tệp tin hoặc thư mục lint trong thư mục lib, trong thư mục usr, cái mà trong thư mục root.

#### Home Directory

Khi chúng ta đăng nhập, working directory được thiết lập trong thư mục /home. Thư mục home được định nghĩa trong password file (Phần 1.3)