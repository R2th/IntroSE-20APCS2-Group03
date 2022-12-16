# Mở đầu
Chào các bạn, ở bài viết trước, mình đã giới thiệu đến các bạn tiến trình (process) cũng như những [kỹ thuật cơ bản để Quản lý các tiến trình (process)](https://viblo.asia/p/basic-process-management-quan-ly-tien-trinh-trong-unixlinux-co-ban-LzD5der0KjY) trên hệ hiều hành Unix/Linux. Vậy thì, các tiến trình trên nguyên tắc là hoàn toàn độc lập, nhưng thực tế có thể như thế không ? Một chương trình của chúng ta nếu mở rộng dần ra, sẽ có lúc cần phải tách ra thành nhiều tiến trình để xử lý những công việc độc lập với nhau. Các lệnh của Linux thực tế là những lệnh riêng lẻ có khả năng kết hợp và truyền dữ liệu cho nhau thông qua các cơ chế giao tiếp giữa các tiến trình. Trong loạt bài tiếp theo này chúng ta sẽ tìm hiểu các cơ chế hỗ trợ việc liên lạc này cũng như những vấn đề đặt ra khi các tiến trình trao đổi thông tin với nhau.

Linux cung cấp một số cơ chế giao tiếp giữa các tiến trình gọi là IPC (Inter-Process Communication):
- Signals handling - Trao đổi bằng tín hiệu
- Pipe -Trao đổi bằng cơ chế đường ống
- Message Queues - Trao đổi thông qua hàng đợi tin nhắn
- Shared Memory - Trao đổi bằng phân đoạn nhớ chung
- Giao tiếp thông qua socket
- Giao tiếp đồng bộ dùng semaphore
# Signals handling
### Khái niệm

- Tín hiệu là một trong những phương thức truyền thông liên tiến trình lâu đời nhất được sử dụng bởi các  hệ thống Unix/Linux. Chúng được sử dụng để báo hiệu các sự kiện không đồng bộ cho một hoặc nhiều tiến trình. Mỗi tín hiệu có thể kết hợp hoặc có sẵn bộ xử lý tín hiệu (signal handler). Tín hiệu sẽ ngắt ngang quá trình xử lý của tiến trình, bắt hệ thống chuyển sang gọi bộ xử lý tín hiệu ngay tức khắc. Khi kết thúc xử lý tín hiệu, tiến trình lại tiếp tục thực thi.
- Mỗi tín hiệu được định nghĩa bằng một số nguyên trong /urs/include/signal.h. Danh sách các hằng tín hiệu của hệ thống có thể xem bằng lệnh `kill –l`. Ví dụ :

```
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
16) SIGSTKFLT	17) SIGCHLD	18) SIGCONT	19) SIGSTOP	20) SIGTSTP
21) SIGTTIN	22) SIGTTOU	23) SIGURG	24) SIGXCPU	25) SIGXFSZ
26) SIGVTALRM	27) SIGPROF	28) SIGWINCH	29) SIGIO	30) SIGPWR
31) SIGSYS	34) SIGRTMIN	35) SIGRTMIN+1	36) SIGRTMIN+2	37) SIGRTMIN+3
38) SIGRTMIN+4	39) SIGRTMIN+5	40) SIGRTMIN+6	41) SIGRTMIN+7	42) SIGRTMIN+8
43) SIGRTMIN+9	44) SIGRTMIN+10	45) SIGRTMIN+11	46) SIGRTMIN+12	47) SIGRTMIN+13
48) SIGRTMIN+14	49) SIGRTMIN+15	50) SIGRTMAX-14	51) SIGRTMAX-13	52) SIGRTMAX-12
53) SIGRTMAX-11	54) SIGRTMAX-10	55) SIGRTMAX-9	56) SIGRTMAX-8	57) SIGRTMAX-7
58) SIGRTMAX-6	59) SIGRTMAX-5	60) SIGRTMAX-4	61) SIGRTMAX-3	62) SIGRTMAX-2
63) SIGRTMAX-1	64) SIGRTMAX	
```

Ngoài ra, khi thực hiện lệnh `man 7 signal`, ta có thể xem chức năng cũng như hướng dẫn sử dụng của từng loại tín hiệu.

### Gửi tín hiệu đến tiến trình

##### 1. Các nguồn gửi signals:
- Từ phần cứng (ví dụ lỗi do các phép tính số học)
- Từ kernel:
    + Khi xảy ra một số điều kiện về phần cứng (SIGSEGV, SIGFPE)
    + Khi xảy ra điều kiện phần mềm (SIGIO)
- Từ người dùng đầu cuối
- Từ một tiến trình gửi đến một tiến trình khác ( ví dụ tiến trình cha yêu cầu một tiến trình con kết thúc)
##### 2. Các cách gửi tín hiệu đến tiến trình:
- Từ bàn phím
    + **Ctrl+C**: gửi tín hiệu **INT( SIGINT )** đến tiến trình, ngắt ngay tiến trình (interrupt).
    + **Ctrl+Z**: gửi tín hiệu **TSTP( SIGTSTP )** đến tiến trình, dừng tiến trình (suspend).
    + **Ctrl+\/**: gửi tín hiệu **ABRT( SIGABRT )** đến tiến trình, kết thúc ngay tiến trình (abort).
 - Từ dòng lệnh
     + Lệnh `kill` thường được sử dụng để ngừng thi hành một tiến trình. Lệnh `kill` có thể gởi bất kỳ tín hiệu signal nào tới một tiến trình, nhưng theo mặc định nó gởi tín hiệu 15, TERM (là tín hiệu kết thúc chương trình).
         ```
         kill -<signal> <PID>
         ```
        
        Ví dụ: `kill -INT 2309` hoặc `kill -2 2309`  dùng gửi tín hiệu **INT** ngắt tiến trình có **PID 2309**.
        
        Nếu không chỉ định tên tín hiệu, tín hiệu **TERM** được gửi để kết thúc tiến trình.
        
        + Lệnh **fg**: gửi tín hiệu **CONT** đến tiến trình, dùng đánh thức các tiến trình tạm dừng do tín hiệu **TSTP** trước đó.
- Bằng các hàm hệ thống kill():
    
    Ví dụ :
    
```    
    #include <stdio.h>
    #include <stdlib.h>
    #include <unistd.h>
    #include <signal.h>

    int main(void){

        pid_t retVal;

        retVal = fork();

        if(retVal > 0){
            int i = 0;
            while(i++ < 5){
                printf("in the parent process.\n");
                sleep(1);
            }
            //hủy tiến trình con 
            kill(retVal, SIGKILL);

        } else if (retVal == 0){
            int i = 0;
            //Không vượt quá 15, vì tiến trình cha sẽ hủy nó
            while(i++ < 15){
                printf("In the child process.\n");
                sleep(1);
            }
        } else {
            printf("Something bad happened.");
            exit(EXIT_FAILURE);
        }

   return 0;
   }
```   

### Nhận và xử lý tín hiệu:

##### 1. Khi một tiến trình nhận một tín hiệu, nó có thể xử sự theo một trong các cách sau :
   - Bỏ qua tín hiệu
   - Xử lý tín hiệu theo kiểu mặc định
   - Tiếp nhận tín hiệu và xử lý theo cách đặc biệt của tiến trình.
##### 2. Bộ xử lý tín hiệu mặc định

Hệ thống đã dành sẵn các hàm mặc định xử lý tín hiệu cho mỗi tiến trình. 
    
Ví dụ: 
- Bộ xử lý mặc định cho tín hiệu **TERM** gọi là hàm **exit()** - chấm dứt tiến trình hiện hành. 
- Bộ xử lý dành cho tín hiệu **ABRT** là gọi hàm hệ thống **abort()** để tạo ra file core lưu xuống thư mục hiện hành và thoát chương trình. 
    
    Mặc dù vậy đối với một số tín hiệu bạn có thể cài đặt hàm thay thế bộ xử lý tín hiệu mặc định của hệ thống. 
##### 3. Cài đặt bộ xử lý tín hiệu :

Có nhiều cách thiết lập bộ xử lý tín hiệu (signal handler) thay cho bộ xử lý tín hiệu mặc định. Một cách cơ bản nhất đó là ta sẽ gọi hàm signal() hoặc sigaction().

Ví dụ:
```
#include <signal.h>

typedef void (*sighandler_t) (int);
sighandler_t signal(int signum, sighandler_t handler);
```
 
Hàm signal() sẽ gọi bộ xử lý được xác định với signum. Bộ xử lý có thể là **SIG_IGN** (Bỏ qua tín hiệu), **SIG_DFL** (Đặt tín hiệu trở lại cơ chế mặc định) hoặc bộ xử lý do người dùng xây dựng hay là 1  function address.

Ngoài ra Linux còn hỗ trợ một cách dùng signal mới hơn là sigaction:

```
#include <signal.h>

int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact)
```
# Pipe - Đường ống
##### 1. Đường ống là gì ?
- Pipe (đường ống) là kênh truyền dữ liệu giữa các tiến trình với nhau, dữ liệu xuất của tiến trình này được chuyển đến làm dữ liệu nhập cho tiến trình kia dưới dạng một dòng các byte.
- Trên đường ống dữ liệu chỉ có thể chuyển đi theo một chiều, dữ liệu vào đường ống tương đương với thao tác ghi (pipe write), lấy dữ liệu từ đường ống tương đương với thao tác đọc (pipe read), một tiến trình kết nối với một pipe chỉ có thể thực hiện một trong hai thao tác đọc hoặc ghi, nhưng không thể thực hiện cả hai.
- Dữ liệu được chuyển theo luồng (stream) theo cơ chế FIFO. Một pipe có kích thước giới hạn (thường là 4096 ký tự). 
![](https://images.viblo.asia/4d8ed04a-a022-426a-974e-0e90b6bacfcc.png)

- Một tiến trình chỉ có thể sử dụng một pipe do nó tạo ra hay kế thừa từ tiến trình cha. Hệ điều hành cung cấp các lời gọi hệ thống read/write cho các tiến trình thực hiện thao tác đọc/ghi dữ liệu trong pipe. Hệ điều hành cũng chịu trách nhiệm đồng bộ hóa việc truy xuất pipe trong các tình huống:
    + Tiến trình đọc pipe sẽ bị khóa nếu pipe trống, nó sẽ phải đợi đến khi pipe có dữ liệu để truy xuất.
    + Tiến trình ghi pipe sẽ bị khóa nếu pipe đầy, nó sẽ phải đợi đến khi pipe có chỗ trống để chứa dữ liệu.
 
- Có hai loại pipe:
    + **Unnamed pipe**: có ý nghĩa cục bộ, dành cho các tiến trình có quan hệ cha con
    + **Named pipe (còn gọi là FIFO)**: có ý nghĩa toàn cục, sử dụng cho các
tiến trình không có quan hệ cha con.

##### 2. Tạo đường ống
- Để tạo một pipe, đặt một thanh dọc (|) trên dòng lệnh giữa hai lệnh.

Ví dụ: thực hiện lệnh `ls | pr | lpr`. Lệnh này chuyển đầu ra từ lệnh ls liệt kê các tệp của thư mục vào đầu vào của lệnh pr để phân trang chúng. Cuối cùng đầu ra từ lệnh pr được đưa vào đầu vào của lệnh lpr để in kết quả trên máy in mặc định.
- Ngoài ra, hệ thống cung cấp hàm pipe() để tạo đường ống có khả năng đọc / ghi. Sau khi tạo ra, có thể dùng đường ống để giao tiếp giữa hai tiến trình. Đọc / ghi đường ống hoàn toàn tương đương với đọc / ghi file.
    + System call pipe(): tạo một pipe, trong thư viện <unistd.h>, khi gọi hàm pipe() sẽ tạo ra một cặp filedescriptors đặt trong một mãng gồm 2 phần tử:  `filedes[0]: đọc` và `filedes[1]: ghi`.

        ```
        int pipe(int filedes[2]);
        ```
    + Nếu pipe() thành công sẽ trả về 0, bị lỗi sẽ trả về giá trị là -1
    
        ```
        int fifledes[2]; //mãng chứa file descriptors
        pipe(fifledes); //tạo pipe
        ```
    + Các tác vụ trên pipe:
    
        `write(int fd, const void *buf, size_t count)`
        
        `read(int fd, const void *buf, size_t count)`
    
##### 3. Đường ống hai chiều

Một số hệ điều hành cho phép thiết lập hai pipe giữa một cặp tiến trình để tạo liên lạc hai chiều. Trong những hệ thống đó, có nguy cơ xảy ra tình trạng tắc nghẽn (deadlock) : một pipe bị giới hạn về kích thước, do vậy nếu cả hai pipe nối kết hai tiến trình đều đầy(hoặc đều trống) và cả hai tiến trình đều muốn ghi (hay đọc) dữ liệu vào pipe(mỗi tiến trình ghi dữ liệu vào một pipe), chúng sẽ cùng bị khóa và chờ lẫn nhau mãi mãi !

# Tạm kết

Trên đây, mình vừa giới thiệu đến các bạn 2 cơ chế giao tiếp giữa các tiến trình là Tín hiệu (Signals) và Đường ống (Pipe). Ở các bài viết tiếp theo, chúng ta sẽ cùng nhau tìm hiểu về các cơ chế giao tiếp còn lại nhé :)))

Cảm ơn các bạn đã theo dõi bài viết của mình :D