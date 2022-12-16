## Mở đầu



## The Linux Programming Interface - Phần 1: Các khái niệm cơ bản

Chương này sẽ giới thiệu các khái niệm liên quan tới lập trình hệ thống Linux. Nó tập trng vào những bạn đang sử dụng hệ điều hành khác, hoặc có ít kinh nghiệm với Linux cũng như các bản UNIX implementation khác.

### Lõi hệ điều hành: The Kernel

Operating system (hệ điều hành) được sử dụng với 2 nghĩa: 

1. Để chỉ ra tất cả các gói bao gồm của một phần mềm trung tâm quản lý các tài nguyên của máy tính tất cả các công cụ đi kèm như là command line interpreters, graphical user interfaces, file utilities and editors
2. Nghĩa hẹp hơn là nói tới phần mềm trung tâm quản lý và cấp phép nguồn tài nguyên của máy tính (CPU, RAM và thiết bị ngoại vi)

Thuật ngữ Kernel thường được sử dụng như từ đồng nghĩa với operating system cái mà chúng ta nói tới trong cuốn sách này.

Mặc dù nó có thể chạy các chương trình trên một máy tính mà không cần kernel, Sự hiện diện của kernel đơn giản hóa việc viết và sử dụng các chương trình khác, và tăng tính mạnh mẽ và khả chuyển có sẵn phục vụ các lập trình viên. The kernel đã làm điều này để cung cấp một lớp phần mềm để quản lý các giới hạn tài nguyên của một máy tính

The Linux kernel excutable có thể tìm thấy ở /boot/vmlinuz, hoặc đâu đó tương tự, Nói về lịch sử, Trước UNIX, the kernel được gọi là unix, Sau UNIX, cái mà đã có virtual memory, được đổi tên thành vmunix, Trên Linux tên này là ánh xạ của tên hệ thống với z thay thế x để nói rằng kernel là một bản compressed executable

Các nhiệm vụ được thực thi bởi kernel:

 - Process scheduling: Lập lịch tiến trình: Một máy tính có nhiều CPU cái mà thực thi các chỉ thị của các chương trình. Giống UNIX systems, Linux là hệ điều hành preemptive multitasking, Đa tác vụ nghĩa là đa tiến trình (running programs) có thể đồng thời chạy trên  bộ nhớ và mỗi các có thể nhận sử dụng CPU. Preemptive nghĩa là các luật để quản lý việc các tiến trình nào được sử dụng CPU và trong bao lâu .

 - Memory management: Trong khi bộ nhớ máy tính là rất lớn so với 1 2 thế kỉ trước đây, kích cỡ của phần mềm cũng lớn lên tương ứng, vì thế bộ nhớ vật lý (RAM) vẫn là giới hạn và kernel phải chia sẻ chúng cho các tiến trình như một cách công bằng và  hiệu quả. Gióng như hầu hết các hệ điều hành hiện đại , Linux sử dụng virtual memory management, một kĩ thuật:

* Các tiến trình là độc lập với các tiến trình khác và kernel, vì thế một tiến trình không thể đọc và sửa được bộ nhớ của các tiến trình khác hoặc trong kernel
* Chỉ một phần tiến trình cần giữ memory, hạ thấp bộ nhớ giới hạn của mỗi tiến trình và cho phép nhiều tiến trình cùng giữ trong bộ nhớ RAM. Điều này giúp việc sử dụng dụng CPU,bất kì thời điểm nào cũng có ít nhất một process có mà CPU có thể thực thi
* Cung cấp một file system: The kernel cung cấp một file system trên đĩa cho phép các file có thể đợc tạo ra, lấy ra, cập nhật và chỉnh sửa trên chúng
* Tạo và hủy các tiến trình: The kernel có thể tải một chương trình mới vào bộ nhớ, cung cấp cho nó các tài nguyên (như CPU, memory, và access tới các tập tin) cung cấp thứ tự để chạy. Mỗi một tiến trình thực thi xong, kernel sẽ đảm bảo các nguồn tài nguyên nó sử dụng được giải phóng.
* Truy cập tới thiết bị: Các thiết bị như chuột, màn hình, bàm phím, đĩa cứng, đĩa mềm được đính kèm tới một máy tính cho phép giao tiếp giữa máy tính với các phần khác của thế giới, cho phép vào ra, hoặc cả hai. The kernel cung cấp các chương trình với các interface để chuẩn hóa và đơn giản hóa truy cập tới các thiết bị, trong khi điều chỉnh việc truy cập bởi nhiều tiến trình trên một thiết bị
* Mạng: The kernel chuyển và nhận các gói tin. Các tác vụ bao gồm việc định tuyến các gói tin tới hệ thống mục tiêu
* Cung cấp một system call application programming interface (API): Tiến trình có thể yêu cầu kernel thực thi một vài tác vụ bằng cách sử dụng một vài kernel entry points được biến tới như là system calls. The linux system call API là chủ đề chính của cuốn sách này Mục 3.1 sẽ chi tiết các bowsc thực thi khi một tiến trình được thực thi một system call

Ngoài ra thì một hệ điều hành đa người dùng như Linux sẽ cung cấp một vài người dùng trừu tượng như một virtual private computer;
Ví dụ mỗi user có một home directory.

### Kernel mode and user mode

Các kiến trúc vi xử lý điển hình cho phép CPU tổ chức ít nhất 2 mode: user mode và kernel mode (supervisor mode). Chỉ thị phần cứng cho phép chuyển đổi giữa 2 cái. Tương ứng, vùng bộ nhớ ảo có thể đánh dấu là user space hoặc kernel space. Khi chạy với user mode, CPU có thể truy cập chỉ bộ nhớ được đánh dấu là user space; Khi chạy trên kernel mode, CPU có thể truy cập tới cả 2 user và kernel memory space.

Một số hành động có thể được thực thi trong kernel mode. Ví dụ việc thực thi dừng hệ thống, truy cập vào các các vùng quản lý bộ nhớ, khởi tạo các thiết bị quản lý vào ra. Bằng cách tận dụng các thiết kế phần cứng để đặt hệ điều hành tỏng kernel space, các bản cài đặt hệ điều hành đảm bảo rằng các tiến trình người dùng không được phép truy cập các chỉ thị và các cấu trúc dữ liệu của kernel, hoặc để các hoạt động làm ảnh hưởng xấu tới hệ thống.

### Process vs kernel views of the system

Trong nhiều công việc lập trình ngày nay, chúng ta đã quen với việc nghĩ về chương trình như cách hướng tiến trình. Tuy nhiên, khi xem nhiều chủ đề trong cuốn sách này, nó có thể là hữu dụng khi có một cái nhìn khác, cái nhìn từ kernel. Để làm rõ hơn, chúng ta từ bây giờ sẽ xem xét mọi thư từ cách nhìn process viewpoint và sau đó là kernel viewpoint.

Một chương trình điển hình có rất nhiều tiến trình. Với mỗi tiến trình có rất nhiều thứ xuất hiện bất đồng bộ. Mỗi một tiến trình thực thi không biết khi nào nó sẽ được làm việc tiếp, vì nó phụ thuộc vào việc lập lịch CPU. Việc chuyển các tín hiệu và giao tiếp giữa các tiến trình ngay lập tức hay ở thời điểm nào đó là do kernel. Một tiến trình không biết nó được cấp ở đâu trong bộ nhớ RAM. 

```
A running system typically has numerous processes. For a process, many things
happen asynchronously. An executing process doesn’t know when it will next time
out, which other processes will then be scheduled for the CPU (and in what order),
or when it will next be scheduled. The delivery of signals and the occurrence of
interprocess communication events are mediated by the kernel, and can occur at
any time for a process. Many things happen transparently for a process. A process
24 Chapter 2
doesn’t know where it is located in RAM or, in general, whether a particular part of
its memory space is currently resident in memory or held in the swap area (a
reserved area of disk space used to supplement the computer’s RAM). Similarly, a
process doesn’t know where on the disk drive the files it accesses are being held; it
simply refers to the files by name. A process operates in isolation; it can’t directly
communicate with another process. A process can’t itself create a new process or
even end its own existence. Finally, a process can’t communicate directly with the
input and output devices attached to the computer.
By contrast, a running system has one kernel that knows and controls everything. The kernel facilitates the running of all processes on the system. The kernel
decides which process will next obtain access to the CPU, when it will do so, and for
how long. The kernel maintains data structures containing information about all
running processes and updates these structures as processes are created, change
state, and terminate. The kernel maintains all of the low-level data structures that
enable the filenames used by programs to be translated into physical locations on
the disk. The kernel also maintains data structures that map the virtual memory of
each process into the physical memory of the computer and the swap area(s) on
disk. All communication between processes is done via mechanisms provided by
the kernel. In response to requests from processes, the kernel creates new processes and terminates existing processes. Lastly, the kernel (in particular, device
drivers) performs all direct communication with input and output devices, transferring information to and from user processes as required.
Later in this book we’ll say things such as “a process can create another process,” “a process can create a pipe,” “a process can write data to a file,” and “a process can terminate by calling exit().” Remember, however, that the kernel mediates
all such actions, and these statements are just shorthand for “a process can request
that the kernel create another process,” and so on.
```
### The Shell

Một Shell là một chương trình đặc biệt được thiết kế để đọc các lệnh được nhập từ người dùng và thực thi các chương trình thích hợp và phản hồi lại. Thỉnh thoảng được biết đến như một trình thông dịch.

Thuật ngữ "login shell" để nói đến tiến trình được tạo để chạy một shell khi người dùng đăng nhập lần đầu.

Trong khi một vài hệ điều hành tích hợp trình thông dịch vào kernel, trên UNIX, shell là một user process. Trên cùng máy tính, người dùng khác nhau có thể sử dụng các shell khác nhau. Một số shell nổi bật:
 - Bourne shell (sh): Là shell cũ nhất và được sử dụng rộng rãi, được viết bởi Steve Bourne. Nó là shell chuẩn của UNIX phiên bản thứ 7. The Bourne shell bao gồm rất nhiều tính năng quan thuộc: IO redirection, pipelines, filename generation (globbing), variables, manipulation of environment variables, command substitution, background command execution, và functions. Tất cả các bản UNIX sau đó đều có Bourne shell.
 - C shell(csh): Shell này được viết bởi Bill Jou tại Đại học California bởi Berkeley. Tên này xuất phát từ sự tương đồng của rất nhiều cấu trúc luồng điều khiển của shell này với ngôn ngữ lập trình C. C shell cung cấp một vài tính năng tương tác không có sẵn trong Bourne shell, bao gồm command history, command line editting, job control, và aliases. The C shell không tương thích ngược với Bourne shell. Mặc dù các chuẩn tương tác trên BSD là C shell, shell scripts.

 - Korn shell (ksh): Đây là shell được viết như là một sự thay thế cho Bourne shell bởi David Korn tại AT&T Bell Laboratories. Trong khi vẫn giữa được sự tương thích với Bourne shell, nó cũng kết hợp các tính năng tương tác giống với C shell.
 - Bourne again shell (bash): Shell này là bản cài đặt GNU project cho Bourne shell. Nó cung cấp các tính năng tương tác với những các có sẵn của C và Korn shell. Tác giả chính của bash là Brian Fox và Chet Ramey. Bash được sử dụng rộng rãi trong Linux.

Các shell được thiết kế không chỉ đơn thuần để cho việc tương tác, mà còn có thể sử dụng để thông dịch shell scripts, là các text files bao gồm shell commands. Với mục đích này mỗi shell có các tiện ích như một ngôn ngữ lập trình: biến, vòng lặp, điều kiện, IO commands, và các hàm.

Mỗi shells thực thi các tác vụ giống nhau, có thể cú pháp khác nhau. Hầu hết các ví dụ trong sách này yêu cầu một shell sử dụng bash, trừ khi được ghi chú, người đọc có thể giả sử rằng tất cả các ví dụ hoạt động cùng một cách với Bourne-type shells.

### Người dùng và nhóm

Môi người dùng tỏng hệ thống là duy nhất và một người dùng có thể thuộc vào nhiều nhóm.

#### Người dùng

Mỗi người dùng trong hệ thống đều có một login name (username) và được có một user ID (UID). MỖi người dùng, được định nghĩa bởi một dòng trong password file /etc/passwd. Bao gồm các thông tin sau:

 - Group ID: là id của nhóm đầu tiên mà người dùng thuộc về
 - Home directory: thư mục khởi tạo nơi user được đặt vào sau khi đăng nhập
 - Login shell: tên của chương trình được thực thi để thông dịch các lệnh của người dùng.

Mỗi password record cũng có thể bao gồm mật khẩu của người dùng, theo dạng mã hóa. Tuy nhiên vì lý do bảo mật, mật khẩu thường được lưu trữ trong các shadow password file, cái mà chỉ đọc cho những người dùng được cấp quyền.

#### Nhóm

Vì lý do quản trị, điều khiển việc truy cập vào các file và tài nguyên hệ thống - nó là hữu dụng để tổ chức các người dùng vào các nhóm. Ví dụ, mọi người trong một đội có một dự án, và chia sẻ các tập tin. Trong các bản UNIX sớm hơn. một người dùng chỉ có thể là thành viên của chỉ 1 nhóm. BSD cho phép một người dùng thuộc về nhiều nhóm, một ý tưởng được đưa lên bởi các bản UNIX khác và trong chuẩn POSIX.1-1990. Mỗi nhóm được định danh bởi một dòng trong group file /etc/group, mỗi group bao gồm các thông tin dưới đây:

 - Group name: là tên duy nhất của nhóm
 - Group ID: mã griup
 - User list: một danh sách tên đăng nhập phân cách bởi dấu phẩy, những thành viên của nhóm này.

#### Superuser.
Một người dùng là một superuser sẽ có các quyền đặc biệt trong hệ thống. Tài khoản super user ID là 0, và thông thường có tên đăng nhập là root. Trong hệ thống UNIX, superuser có thể bỏ qua tất cả các quyền được yêu cầu bởi hệ thống. Vì thế super user có thể truy cập bất kỳ tập tin nào, bất kỳ là tập tin đó yêu cầu quyền gì, có thể đọc các tín hiệu của bất kỳ process nào trong hệ thống. Người quản trị hệ thống sử dụng superuser account để thực thi rất nhiều các tác vụ quản trị trên hệ thống.

### Single Directory Hierarchy, Directories, Links, và files.

The Kernel có một cây thự mục đơn tổ chức tất cả các file trong hệ thống. (Khác với Windows nơi mà mỗi đĩa sẽ có một cấu trúc thư mục). Gốc của cây này là root được đặt tên là / (slash). Tất cả các tập tin và thư mục là con cháu của nó. 

{% img [class names] /images/the-linux-command-line-interface/subset-of--the-linux-single-directory-hierarchy.png 'subset-of--the-linux-single-directory-hierarchy.png' 'subset-of--the-linux-single-directory-hierarchy.png' %}

#### Các loại tập tin

Có 2 loại tập tin thường được biết đến regular và plain. Các loại tập tin khác bao gồm devices, pipes, sockets, directories, symbolic links.

Thuật ngữ file thường được sử dụng để ám chỉ một tập tin ở bất cứ loại nào, không chỉ là regular file.

#### Directories và links

Một thư là một tập tin đặc biệt, nội dung của nó là một bảng các tên file với một refer tới tập tin tương ứng, Tên file + reference liên kết với nhau gọi là link, các file có thể có nhiều links, do đó có thể có nhiều tên, có thể cùng hoặc khác thư mục.

Thư mục bao gồm nhiều link tới các tập tin và các thư mục khác. Links giữa các thư mục được thiết lập bởi cấu trúc cây như hình trên.

Mỗi thư mục bao gồm ít nhất 2 đầu vào: . (dấu chấm), cái mà nối tới thư mục hiện tại và .. (chấm chấm) nối tới thư mục cha, thư mục bên trên nó trong cây. Mỗi thư mục trừ thư mục root, đều có cha.

#### Symbolic links.

Giống như một link bình thường, một symbolic link cung cấp một tên thay thế cho một tập tin. 

....

#### Filenames

#### Pathnames

#### Current working directory

#### File ownership and permissions

### File I/O Model

### Programs

### Processes

### Memory Mappings

### Static and Shared Libraries

### Interprocess Communication and Synchronization

### Signals

### Threads

### Process Groups and Shell Job Control

### Sessions, Controlling Terminals, and Controlling Processes

### Pseudoterminals

### Date and Time

### Client-Server Architecture

### Realtime

### The /proc File System

### Tổng kết

Trong chương này, chúng ta đã khảo sát một tập các khái niệm cơ bản liên quan đế lập trình hệ thống Linux. Việt hiểu được các khái niệm đã được cung cấp với những người dùng còn ít kinh nghiệm là các nền tảng để bắt đầu học lập trình hệ thống.

## Kết bài

Chương này dài quá mình sẽ dịch nốt trong ngày mai vẫn trong bài viết này.

Việc viết được chương này cho dễ hiểu cũng cần phải có hiểu biết nhất định. Bài viết này sẽ còn được chỉnh sửa khi hiểu biết của mình khá hơn.

Cảm ơn các bạn

> Biển học là vô bờ. Hai chữ “vô bờ” bản thân nó vốn ám chỉ rằng không có đích đến rồi. Bạn rong ruổi trên một con tàu theo năm tháng trên đại dượng tri thức. Vậy thì ý nghĩa của một cuộc sống như vậy nằm ở đâu? Là vẻ đẹp của những hòn đảo bạn ghé thăm, những trải nghiệm về phong ba bão táp của đại dương, những cuộc gặp gỡ duyên phận với những con tàu khác, những cuộc đua và những khi tản mạn.

Về bài tập các bạn hãy tiếp tục xem seri Bài số 6 của Arif Butt: https://www.youtube.com/watch?v=tuWDi53pomU&list=PL7B2bn3G_wfBuJ_WtHADcXC44piWLRzr8&index=7