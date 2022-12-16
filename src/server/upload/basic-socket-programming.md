## 1. Struct address
### 1.1. Struct sockaddr{}
```c
struct sockaddr {
    unsigned short    sa_family;    // address family, AF_xxx
    char              sa_data[14];  // 14 bytes of protocol address
};
```
Cấu trúc này sử dụng hầu hết trong các system call ở phần 2, trong đó:

- sa_family là address family, có dạng AF_xxxx, chủ yếu ta sử dụng AF_INET
- sa_data[]: lưu trữ địa chỉ đích và cổng 

### 1.2. Struct sockaddr_in{}
```c
struct sockaddr_in {
    short int          sin_family;  // Address family
    unsigned short int sin_port;    // Port number
    struct in_addr     sin_addr;    // Internet address
    unsigned char      sin_zero[8]; // Same size as struct sockaddr
}; 
```
```c
// Internet address (a structure for historical reasons)
struct in_addr {
    unsigned long s_addr; // that's a 32-bit long, or 4 bytes
}; 
```
Là một cấu trúc song song với struct sockaddr{}, bởi vì việc lưu và lấy dữ liệu trong struct sockaddr{} khá phức tạp, ta sử dụng cấu trúc này. 

Đối với 1 số func yêu cầu cấu trúc trên, có thể sử dụng cấu trúc sockaddr_in sau đó tiến hành ép kiểu.
```c
int sockfd;
struct sockaddr_in my_addr;

sockfd = socket(PF_INET, SOCK_STREAM, 0); // do some error checking!

my_addr.sin_family = AF_INET;         // host byte order
my_addr.sin_port = htons(MYPORT);     // short, network byte order
my_addr.sin_addr.s_addr = inet_addr("10.12.110.57");
memset(&(my_addr.sin_zero), '\0', 8); // zero the rest of the struct

// int bind(int sockfd, struct sockaddr *my_addr, int addrlen); 
bind(sockfd, (struct sockaddr *)&my_addr, sizeof(struct sockaddr));
```
### 1.3. Struct hostent{}
Cấu trúc lưu trữ dữ liệu host, chủ yếu sử dụng trong việc chuyển đổi giữa ip address và host (DNS), sử dụng ở phần 4 - Chuyển đổi giữa Host name và IP address. Đặc trưng là 2 function sau:

```struct hostent* gethostbyname(const char* hostname)```

```struct hostent* gethostbyaddr(const char* addr, size_t len, int family)```

```c
struct hostent {
               char  *h_name;            /* official name of host */
               char **h_aliases;         /* alias list */
               int    h_addrtype;        /* host address type */
               int    h_length;          /* length of address */
               char **h_addr_list;       /* list of addresses */
           }
```

## 2. Xử lý dữ liệu
### 2.1. Chuyển đổi giữa host byte và network byte
Dữ liệu được lưu trữ theo 2 kiểu Big-endian và Little-endian. Đọc thêm về 2 kiểu dữ liệu này 2 đây:
https://viblo.asia/p/little-endian-vs-big-endian-E375z0pWZGW

Trong lập trình socket, có 2 tên gọi lưu trữ dữ liệu là Host byte order và Network byte order(IP), tương ứng với Little-endian và Big-endian. Sử dụng Network byte order đối với các dữ liệu cần truyền qua các máy chủ khác nhau. Vì vậy cần chuyển giữa 2 kiểu dữ liệu này bằng các function sau:

- htons() -- "Host to Network Short"
- htonl() -- "Host to Network Long"
- ntohs() -- "Network to Host Short"
- ntohl() -- "Network to Host Long"

Trong đó Short thực hiện chuyển đổi với loại 2 bytes (sử dụng chuyển đổi cho port), Long là 4 bytes (sử dụng chuyển đổi cho network)

Ví dụ mình có port 64, cần lưu trữ trong biến sin_port trong `struct sockaddr_sin`, và đương nhiên cần được lưu ở dạng Network byte order vì dữ liệu này được truyền đi. 

64 có giá trị hex là 0x40, hay ở dạng 2 bytes được viết là 0x0040. Thực hiện chuyển đổi sin_addr = htons(64), hàm này thực hiện chuyển từ little qua big, vậy giá trị hex của nó sẽ là 0x4000 và có giá trị là 16384. Đó là lý do khi mình run chương trình sau sẽ được kết quả là 16384. Hiểu đơn giản hơn cả 2 kiểu chuyển đổi đều làm đảo byte, tuy nhiên ta có 2 loại func khác nhau để hiểu rõ loại chuyển đổi.
### 2.2. Chuyển đổi string host thành Numbers and dots và ngược lại

Đầu tiên chúng ta cần hiểu rõ về 2 dạng string host và numbers and dots. String host tức là dạng địa chỉ ở dạng string, ví dụ như "192.168.1.1", hoặc 1 host "scanme.nmap.org". Còn dạng numbers and dots chỉ đơn giản là 1 chuỗi số nguyên dạng unsigned long, ví dụ như dưới đây, mình có chương trình như sau
```
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>

int main(){
   unsigned long a = inet_addr("192.168.1.1");
   printf("%x",a); #0x101a8c0
   printf("%b", a); #1000000011010100011000000
   printf("%d", a); #16885952
}
```
Như vậy bởi vì lưu ở dạng unsigned long nên ta có thể dễ dàng chuyển qua hex hoặc binary để biểu diễn địa chỉ IP của nó.

***inet_addr()***
```c:inet_addr
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

struct sockaddr_in my_addr
my_addr.sin_addr.s_addr = inet_addr("192.168.1.1"); => 192.168.1.1 (Network byte order - Big endian)
```
***inet_aton()***
```c:inet_aton
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int inet_aton(const char *cp, struct in_addr *inp);
```
Hàm này chuyển đổi `const char *cp` (string address) thành dạng numbers-and-dots, lưu trữ trong `struct in_addr` mà ta sử dụng trong `struct sockaddr_in`

Example:
```c
struct sockaddr_in my_addr;

my_addr.sin_family = AF_INET;         // host byte order
my_addr.sin_port = htons(MYPORT);     // short, network byte order
inet_aton("10.12.110.57", &(my_addr.sin_addr));
memset(&(my_addr.sin_zero), '\0', 8); // zero the rest of the struct 
```

***inet_ntoa***

Chuyển đổi từ dạng numbers_and_dots thành string address
```c
char* inet_ntoa(struct in_addr inp);
```
Example
```c
string *addr = inet_ntoa(my_addr.sin_addr);
```

## 3. System calls
Nguồn tham khảo: https://www.gta.ufrj.br/ensino/eel878/sockets/syscalls.html
### 3.1. Socket()
```c
#include <sys/types.h>
#include <sys/socket.h> //để sử dụng socket()

int socket(int domain, int type, int protocol); 
```
Tạo 1 socket, trả về file descriptor, có giá trị nhỏ nhất mà chưa được sử dụng. Bằng -1 nếu thất bại.
- domain: sử dụng PF_INET
- type: SOCK_STREAM hoặc SOCK_DGRAM
- protocol: 0 để tự động chọn giao thức thích hợp

Xem thêm bằng: `man socket`
### 3.2. Bind()
Khi 1 socket được tạo, chưa có 1 giá trị nào được gán cho socket (ipaddress, port), bind() sử dụng để làm điều đó. Xem thêm tại `man bind`
```c
#include <sys/types.h>
#include <sys/socket.h>

int bind(int sockfd, struct sockaddr *my_addr, int addrlen); 
```
- sockfd: sock file descriptor
- struct sockaddr *my_addr: 
- addrlen : size của address, có thể sử dụng sizeof(struct sockaddr)

Example:
```c
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define MYPORT 3490

main()
{
    int sockfd;
    struct sockaddr_in my_addr;

    sockfd = socket(PF_INET, SOCK_STREAM, 0); // do some error checking!

    my_addr.sin_family = AF_INET;         // host byte order
    my_addr.sin_port = htons(MYPORT);     // short, network byte order
    my_addr.sin_addr.s_addr = inet_addr("10.12.110.57");
    memset(&(my_addr.sin_zero), '\0', 8); // zero the rest of the struct

    // don't forget your error checking for bind():
    bind(sockfd, (struct sockaddr *)&my_addr, sizeof(struct sockaddr));
}
```
### 3.3. Connect()
Kết nối với 1 máy chủ từ xa
```c
#include <sys/types.h>
#include <sys/socket.h>

int connect(int sockfd, struct sockaddr *serv_addr, int addrlen); 
```
- sockfd: sock file desciptor
- struct sockaddr *serv_addr: Cấu trúc lưu địa chỉ và cổng đích kết nối
- addrlen: size địa chỉ, sử dụng sizeof(struct sockaddr)

Hàm này sẽ trả về giá trị -1 nếu gặp lỗi.

Example:
```c
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define DEST_IP   "10.12.110.57"
#define DEST_PORT 23

main()
{
    int sockfd;
    struct sockaddr_in dest_addr;   // will hold the destination addr

    sockfd = socket(PF_INET, SOCK_STREAM, 0); // do some error checking!

    dest_addr.sin_family = AF_INET;          // host byte order
    dest_addr.sin_port = htons(DEST_PORT);   // short, network byte order
    dest_addr.sin_addr.s_addr = inet_addr(DEST_IP);
    memset(&(dest_addr.sin_zero), '\0', 8);  // zero the rest of the struct

    // don't forget to error check the connect()!
    connect(sockfd, (struct sockaddr *)&dest_addr, sizeof(struct sockaddr));
}
```

### 3.4. Listen()
Đợi các kết nối từ xa đến và xử lý
```c
#include <sys/types.h>
#include <sys/socket.h>

int listen(int sockfd, int backlog); 
```

- sockfd: sock file descriptor
- backlog: số kết nối được gửi đến trên hàng chờ đợi được xử lý

Trả về fd hoặc giá trị -1 nếu gặp lỗi

Vì hàm listen() nhận kết nối từ 1 host khác, nên cần thiết lập port mà ta nhận vào. Vì vậy quá trình sẽ là:

- socket() => bind() => listen() => accept()

Chúng ta sẽ nói về hàm accept() ở phần dưới.

### 3.5. Accept()
Chấp nhận kết nối tới và trả về 1 file desciptor (cùng giá trị với fd của listen), sử dụng để gửi và nhận data với 2 func send() và recv().
```c
#include <sys/types.h>
#include <sys/socket.h>

int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen);
```
- sockfd: fd của listen()
- struct sockaddr *addr: con trỏ trỏ đến cấu trúc lưu trữ địa chỉ struct sockaddr_in
- socklen_t *addrlen: con trỏ trỏ đến biến lưu trữ sizeof(struct sockaddr_in)

Trả về fd với sử dụng cho send() và recv() ở phần dưới

Example
```c
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define MYPORT 3490    // the port users will be connecting to

#define BACKLOG 10     // how many pending connections queue will hold

main()
{
    int sockfd, new_fd;  // listen on sock_fd, new connection on new_fd
    struct sockaddr_in my_addr;    // my address information
    struct sockaddr_in their_addr; // connector's address information
    int sin_size;

    sockfd = socket(PF_INET, SOCK_STREAM, 0); // do some error checking!

    my_addr.sin_family = AF_INET;         // host byte order
    my_addr.sin_port = htons(MYPORT);     // short, network byte order
    my_addr.sin_addr.s_addr = INADDR_ANY; // auto-fill with my IP
    memset(&(my_addr.sin_zero), '\0', 8); // zero the rest of the struct

    // don't forget your error checking for these calls:
    bind(sockfd, (struct sockaddr *)&my_addr, sizeof(struct sockaddr));

    listen(sockfd, BACKLOG);

    sin_size = sizeof(struct sockaddr_in);
    new_fd = accept(sockfd, (struct sockaddr *)&their_addr, &sin_size);
}
```

### 3.6. Send() và Recv()
***Send()***
```c
int send(int sockfd, const void *msg, int len, int flags);
```
- sockfd: fd của host muốn gửi dữ liệu, có thể là fd được trả về bởi socket() hoặc accept()
- const void *msg: data cần gửi
- int len: Độ lớn của dữ liệu tính theo byte
- int flags: Đặt giá trị bằng 0

Hàm trả về số byte được gửi đi, gửi hết nếu số byte nhở hơn 1K. So sánh giá trị trả về với int len để biết dữ liệu gửi hết chưa và xử lý phần còn lại.

***Recv()***

Nhận dữ liệu được gửi đến
```c
int recv(int sockfd, void *buf, int len, unsigned int flags);
```
- sockfd: fd của nơi gửi
- void *buf: buffer chứa dữ liệu
- int len: độ lớn dữ liệu tối đa nhận vào
- flags đặt thành 0

Hàm trả về -1 nếu xảy ra lỗi, 0 nếu kết nối bị đóng và giá trị khác là số byte nhận được

### 3.7. Close() và shutdown()
***Close()***

```close(sockfd)```

- sockfd: fd muốn đóng kết nối, ngưng gửi và nhận dữ liệu

***shutdown()***
```c
int shutdown(int sockfd, int how); 
```
- sockfd: fd muốn đóng kết nối
- how: cách đóng (0-ngưng nhận, 1-ngưng gửi, 2-ngưng nhận và gửi)
## 4. Chuyển đổi giữa Host name và IP address
## 5. Xử lý lỗi trong socket

Để in lỗi trong quá trình kết nối hay sử dụng các function, ta sử dụng hàm `perror()` và `herror()` trong thư viện `errno.h`

Ví dụ khi gặp lỗi trả về -1 trong hàm socket(), ta thực hiện in lỗi bằng hàm perror("socket");
Example:
```c
if ((sockfd = socket(PF_INET, SOCK_STREAM, 0)) == -1) {
        perror("socket");
        exit(1);
    }
```
Đổi với các function xử lý DNS (ở phần 4), sử dụng hàm herror để in ra lỗi.
Example:
```c
if ((he=gethostbyname("facebook.com")) == NULL) {  // get the host info 
        herror("gethostbyname");
    }
```