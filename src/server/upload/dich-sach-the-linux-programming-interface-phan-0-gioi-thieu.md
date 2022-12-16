## Giới thiệu

Mình là lập trình viên, mình thích nhiều thứ. System programming là điều thú vị đối với mình. Mình chưa biết gì cả. Chúng ta sẽ cùng học. Nội dung bài viết là phần dịch cuốn The Linux Programming Interface. Một số ý kiến cá nhân được thêm vào nội dung bài viết trong các dấu ngoặc tròn. Cuối bài viết sẽ gồm tổng kết của mình, có thể có một số bài luyện tập của mình đưa ra, lời khuyên, ...

Chỉ thấy Linux, lập trình C chắc cũng khiến nhiều bạn bấm nút back và đọc bài khác. Đây là một cuốn sách nổi tiếng, và mình tin rằng các bạn sẽ học được rất nhiều từ sách. Mình mong rằng các bài dịch sẽ hữu ích cho các bạn.

Và đây là bài dịch đầu tiên. Giới thiệu về cuốn sách.

## The Linux Programming Interface - Phần 0: Giới thiệu

### Nhiệm vụ

Trong cuốn sách này tôi sẽ mô tả về Linux Programming Interface - về system calls, library functions, và low level interface được cung cấp bởi Linux, một phiên bản miễn phí của hệ điều hành UNIX. Các interfaces này đã được sử dụng, trực tiếp hoặc gián tiếp bởi tất cả các chương trình chạy trên Linux. Chúng cho phép các ứng dụng có thể thực thi các tác vụ như file I/O, tạo hoặc xóa các tập tin, thư mục, tạo mới các tiến trình, thực thi các chương trình, thiết lập đồng hồ, giao tiếp giữa các processes, threads trên cùng một máy tính và giao tiếp giữa các tiến trình chạy trên các máy tính khác nhau cùng một mạng. Đây là tập các low level interfaces, cũng được gọi là system programming interface.

Mặc dù tôi tập trung vào Linux, tôi cũng nói về các tiêu chuẩn và portablility issues, phân biệt rõ ràng và thảo luận về các chi tiết riêng về thảo luận các tính năng thông thường của hầu hết các bản UNIX implementations và các chuẩn POSIX và Single UNIX Specification. Do vậy, cuốn sách này cung cấp một cách toàn diện về UNIX/POSIX programming interface và có thể được sử dụng bởi các lập trình viên đang viết ứng dụng cho các hệ thống UNIX khác hoặc tập trung vào các ứng đa nền tảng

### Đối tượng hướng đến

Cuốn sách này nhắm đến:
 - Các lập trình viên và các nhà thiết kế phần mềm xây dựng các ứng dụng cho Linux, các hệ thống UNIX khác, hay POSIX
 - Các lập trình viên ứng dụng chạy giữa Linux và các bản UNIX hoặc giữa Linux và các hệ điều hành khác
 - Các giáo viên, học sinh đang dạy và học Linux hoặc UNIX
 - những người quản lý hệ thống những "power users" muốn mở rộng hiểu biết về Linux/UNIX programming interface.

Tôi giả sử bạn đã có kinh nghiệm về lập trình, nhưng không có kinh nghiệm về lập trình hệ thống. Tôi cũng giả sử bạn có kinh nghiệm đọc code C, và biết sử dụng shell và các commands cơ bản của Linux/Unix. Nếu bạn là người mới Linux và UNIX., bạn sẽ tìm thấy các giúp đỡ trong chương 2.

### Linux và UNIX

Cuốn sách này có thể hoàn toàn nói về các chuẩn UNIX (đó là, POSIX) bởi về hầu hết các tính năng tìm thấy trong các UNIX implementations cũng có trong Linux và ngược lại. Tuy nhiên, khi viết các portable applications là mục đích xứng đáng, nó cũng là quan trọng để mô tả Linux extensions tới các chuẩn UNIX. Cũng vì sự nổi tiếng của Linux. Mặt khác các extensions khác không chuẩn thỉnh thoảng lại cần thiết, vì lý do hiệu năng hoặc các access functionality không có sẵn trong chuẩn UNIX programming interface (Tất cả các bản UNIX implementtations cung cấp các nonstandard extensions với lý do này).

Vì thế, tôi viết cuốn sách này như là tiện ích cho lập trình viên làm việc với tất cả các bản UNIX implementations, Tôi cũng full coverage về các tính năng được chỉ định cho Linux. Các tính năng bao gồm:
 - epoll: một cơ chế để lấy đợc các notifications của các sự kiện vào ra.
 - inotify: một cơ chế để theo dõi sự thay đổi của các tập tin và các thư mục
 - capabilities: cơ chế để cấp quyền cho một tiến trình được thực thi bởi superuser
 - extended attributes
 - i-node flags
 - clone() system calls
 - /proc file system
 - Linux specific I/O, signals, timers, threads, shared libraries, interprocess communication, và sockets

### Cách sử dụng và tổ chức 

Bạn có thể sử dụng cuốn sách này theo ít nhất 2 cách.

 - Như là một tutorial hướng dẫn về Linux/UNIX programming interface. Bạn có có thể đọc từ đầu tới cuối. Sau mỗi chương hãy làm các bài tập
 - Như là tài liệu tham khảo toàn diện về Linux/UNIX programming interface.

Tôi đã nhóm các chương của cuốn sách này thành các phần như bên dưới.

1. Nền tảng và các khái niệm: Lịch sử về UNIX, C, Linux, tổng quan về các chuẩn UNIX (chương 1); a programmer-oriented introduction to Linux and
UNIX concepts (chương 2), và các khái niệm cơ bản về system programming trên Linux và Unix (chương 3).
2. Các tính năng cơ bản của system programming interface: vào ra files (chương 4 và 5). Tiến trình (Chương 6). Cấp phát bộ nhớ (chương 7). users và groups (Chương 8). process cridential (chương 9); time (chương 10). system limits và options (chương 11); lấy thông tin hệ thống và tiến trình (chương 12).
3. Các tính năng nâng cao của system programming interface: file IO buffering (chương 13). file system (Chương 14). file attributes (chương 15). extened attributes (chương 16). access control lists (chương 17). thư mục và links (chương 18). monitoring file event (chương 19); signals (chương 20 đến 22) và timers (chương 23)
4. Process, Programs và threads: Việc tạo mới tiesng trình, dừng tiếng trình, theo dõi các tiến trình con, và thực thi chương trình (chương 24 đến 28) và POSIX threads (chương 29 đến 33).
5. Advanced process và program topics: process groups, sessions, job control (chương 34), process priorities và scheduling (chương 35); process resources (chương 36). daemons (chương 37); writing secure privileged programs (chương 38); capabilities (chương 39); login accounting (chương 40);
and shared libraries (chương 41 và 42).
6. Interprocess communication (IPC): tổng quan về IPC (chương 43); pipes và FIFOS (chương 44). System V IPC - message queues, semaphores, shared memory (chương 45-48). memory mappings (chương 49). virtual memory operations (chương 50). POSIX IPC - message queues ... chương 51 đến 54); file locking (chương 55).
7. Sockets và network programming: IPC và network programming với socket (chương 56 đến 61)
8. Advanced IO topics. terminals (chương 62). alternative IO models (chương 63), và pseudoterminal (chương 64).

### Các chương trình mẫu

Tôi minh họa cách sử dụng hầu hết các interfaces được mô tả trong cuốn sách một cách ngắn gọn, các chương trình hoàn chỉnh, nhiều trong số chúng được thiết kế để cho phép bạn dễ dàng thử từ command line để xem các các system call và library functions hoạt động. Đúc kết lại, cuốn sách bao gồm rất nhiều ví dụ khoảng 15.000 dòng code C và shell session logs.

Mặc dù việc đọc và thử các ví dụ là hiệu quả để bắt đầu, nhưng cách hiệu quả nhất để củng cố các khái niệm được thảo luận là viết code, thử sửa các chương trình mẫu để cố thực thi các ý tưởng hoặc viết một chương trình mới.

Tất cả source code trong cuốn sách là có sẵn và có thể tải xuống từ trang web của cuốn sách này. Mục đích và chi tiết của các chương trình được mô tả trong comments của mã nguồn. Makefiles được cung cấp để build các chương trình và đi kèm README file gửi tới chi tiết về chowng trình.

Source code là miễn phí để phân phối lại, sửa chữa với giấy phép GNU Affero General Public License (Affero GPL) version 3.

### Các bài tập

Hầu hết các chương đều có các bài tập, thỉnh thoảng có gợi ý các các bài tập sử dụng các code mẫu. Các bài tập khác là những câu hỏi liên quan đến các khái niệm được thảo luận trong chương và cũng có các gợi ý cho các chương trình bạn có thể viết để củng cố hiểu biết của bạn. Ban có thể tìm thấy giải pháp để chọn bài tập ở Appendix F

### Standards và portability

Thông qua cuốn sách này, tôi nói về các vấn đề portability issues. Bạn sẽ tìm thấy một cách thường xuyên liên quan đến các chuẩn, đặc biết là POSIX.1-2001 và Single UNIX Specification version 3 (SUSv3) standard. Bạn cũng sẽ tìm thấy chi tiết về các thay đổi. 
Về các tính năng không chuẩn. Tôi sẽ biểu thị các phạm vi khác nhau trong các bản UNIX implementations. Tôi cũng highlight các tính năng quan trọng của LINUX, cũng như các khác biệt nhỏ giữa các implementation của system calls, và các thư viện trên Linux và các bản UNIX implementations. Nơi mà một tính năng không được chỉ ra, bạn có thể giả sử rằng nó là tính năng chuẩn xuất hiện hầu hết trong các bản UNIX implementations.

Tôi đã thử test hầu hết các chương trình mẫu được trình bày trong cuốn sách với Solaris, FreeBSD, Mac OS X, Tru64 UNIX và HP-UX. Để improve portability một vài tính năng của hệ thống, website cho cuốn sách này cung cấp một phiên bản thay thế của các ví dụ với các code mở rộng xuất hiện tỏng sách.

### Linux kernel và C library versions

Cuốn sách tập trung chính vào Linux 2.6.x, kernel version được sử dụng rộng rãi nhất vào thời điểm tôi viết cuốn sách. Chi tiết về Linux 2.4 cũng được coverd. Tôi cũng chỉ ra những điểm khác biệt về Linux 2.4 và 2.6. Các tính năng mới trong 2.6.x chính xác là 2.6.34 sẽ được ghi lại.

Với sự tôn trọng tới thư viện C, tập trung vào GNU C library (glibc) version 2. Những điểm khác tỏng glibc 2.x version cũng được ghi chú

(Bây giờ Linux kernel đã có bản 5. rồi. Nhưng chúng ta vẫn cứ học theo cuốn sách này.)

### Sử dụng progmramming interface từ ngôn ngữ khác.

Mặc dù các chương trình mẫu được viết bằng C, bạn có thể sử dụng interfaces được mô tả trong sách từ nhiều ngôn ngữ khác - ví dụ, các ngôn ngữ biên dịch như C++, Pascal, Modula, Ada, FORTRAN, D và ngôn ngữ scripting như Perl, Python, Ruby (Java là mô hình khác).

## Tổng kết

Bài tiếp theo k khó nói về lịch sử của UNIX/Linux. Để sẵn sàng cho các bài tiếp. Chúng ta hãy bắt đầu bằng việc cài và sử dụng linux. Hãy sử dụng như hệ điều hành chính. 

> Đừng cố nhớ, hãy sử dụng nó

### Một số nguồn tài liệu khác

Kênh của Ariff Butt [https://www.youtube.com/channel/UCMqUl4U_8LwHiXT09_ouzxQ](https://www.youtube.com/channel/UCMqUl4U_8LwHiXT09_ouzxQ)
The Linux Command line [http://linuxcommand.org/tlcl.php](http://linuxcommand.org/tlcl.php)