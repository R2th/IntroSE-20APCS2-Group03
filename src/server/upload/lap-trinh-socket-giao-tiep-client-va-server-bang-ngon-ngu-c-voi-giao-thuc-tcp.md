> ### Lập trình mạng là gì?
Có bao giờ bạn thắc mắc những chương trình bạn viết ra hoạt động, giao tiếp thế nào trong mạng máy tính chưa? Hay dễ hiểu là làm cách nào để server của bạn có thể nói chuyện được với client?


Lập trình mạng là một trong những nhiệm vụ căn bản để phát triển các ứng dụng. Một chương trình mạng được viết ra để các chương trình trên các máy tính khác nhau có thể truyền tin với nhau một cách hiệu quả và an toàn cho dù chúng được cài đặt trên mạng LAN, WAN hay mạng toàn cầu Internet, đây là điều căn bản đối với sự thành công của nhiều hệ thống.

Hãy cùng mình nghịc thử để viết 1 chương trình socket giao tiếp client và server đơn giản nhất!

> ### Giới thiệu về Socket
SocKet là một giao diện lập trình (API – Application Program Interface) ứng dụng mạng thông qua giao diện này có thể lập trình điều khiển việc truyền thông giữa 2 máy sử dụng các giao thức mức thấp như TCP,UDP… , Có thể tưởng tượng nó như một thiết bị truyền thông 2 chiều tương tự như tệp tin, chúng ta gửi/nhận dữ liệu giữa 2 máy, tương tự như việc đọc ghi trên tệp tin.

> Với mô hình khách chủ TCP
![](https://images.viblo.asia/a4ced1ad-0dcf-4186-b643-07a6c440cb0e.png)

Bây giờ chúng ta sẽ bắt tay tìm hiểu cách làm và thực hành 

> ### Viết chương trình phía server
Các bước để tạo lên 1 chương trình phía server:
* Tạo socket với hàm `socket (int family, int type, int protocol)` các tham số trong đó theo thứ tự là họ giao thức, kiểu socket, kiểu giao thức.
* Gán địa chỉ cho socket `bind (int sockfd, const struct sockaddr *sockaddr, socklen_t addrlen)` các tham số lần lượt là mô tả socket vừa tạo, con trỏ chỏ đến địa chỉ socket, độ lớn địa chỉ
* Chỉ định socket lắng nghe kết nối `listen (int sockfd, int backlog)` trong đó sockfd là mô tả socket vừa tạo, backlog là số lượng tối đa các kết nối đang chờ
* Chờ/chấp nhận kết nối `accept (int sockfd, struct sockaddr *cliaddr, socklen_t *addrlen)` lần lượt có các tham số là mô tả socket vừa tạo, con trỏ tới cấu trúc địa chỉ socket của tiến trình kết nối đến, độ lớn cấu trúc địa chỉ
* Thiết lập kết nối với máy chủ TCP `connect (int sockfd, const struct sockaddr *servaddr, socklen_t addrlen)` 

>### Viết chương trình phía client
Các bước để tạo lên 1 chương trình phía client
* Tạo socket với hàm `socket (int family, int type, int protocol)` các tham số trong đó theo thứ tự là họ giao thức, kiểu socket, kiểu giao thức.
* Connect tới địa chỉ server với hàm `connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)`
* Đọc dữ liệu từ server và ghi vào biến buffer `read( sock , buffer, 1024)`

Sau đây mình sẽ đi vào thực hành với 1 requirement đơn giản là:

>Mô tả chương trình:
  - server mở công kết nối 8080
  - client nhập địa chỉ ip để kết nối với server qua cổng 8080
  - server hiển thị địa chỉ ip và cổng của client,
  - người dùng nhập chuỗi kí tự bất kì từ bàn phím
  - client đọc chuỗi kí tự và gửi cho server
  - server nhận tin nhắn từ client và trả về tin nhắn nhận được đã viết hoa các kí tự.
  - client hiển thị thông báo từ server
  - lặp đến khi client nhập”bye” thì đóng kết nối.

>Code phía server
```
#include <unistd.h> 
#include <stdio.h> 
#include <sys/socket.h> 
#include <stdlib.h> 
#include <netinet/in.h> 
#include <string.h>
#include <ctype.h>
#define PORT 8080 
int main(int argc, char const *argv[]) 
{ 
    int server_fd, new_socket, valread; 
    struct sockaddr_in address; 
    int opt = 1; 
    int addrlen = sizeof(address); 
    char mess_from_client[225];
    char buffer[1024] = {0}; 
    char *hello = "Hello from server";
    int continu = 1;
    //tao socket
    // tao file mo ta soket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) 
    { 
        perror("socket failed"); 
        exit(EXIT_FAILURE); 
    }  
    //gan dia chi cho socket
    // gan cong port 8080 
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt))) 
    { 
        perror("setsockopt"); 
        exit(EXIT_FAILURE); 
    } 
    address.sin_family = AF_INET; 
    address.sin_addr.s_addr = INADDR_ANY; 
    address.sin_port = htons( PORT );  //gan cong la 8080   
    // bind 
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address))<0) 
    { 
        perror("bind failed"); 
        exit(EXIT_FAILURE); 
    }
    //listen, chi dinh socket lang nghe ket noi
    if (listen(server_fd, 3) < 0) 
    { 
        perror("listen"); 
        exit(EXIT_FAILURE); 
    } 
    //accept, chap nhan ket noi
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address,(socklen_t*)&addrlen))<0) 
    { 
        perror("accept"); 
        exit(EXIT_FAILURE); 
    } 
   while(continu == 1){    
	    char str_cli_ip[INET_ADDRSTRLEN];
	    struct sockaddr_in* ip_client = (struct sockaddr_in*)&address;
	    inet_ntop(AF_INET, &ip_client->sin_addr, str_cli_ip, INET_ADDRSTRLEN);
	    printf("ipclient: %s\n", str_cli_ip );
	    char str_cli_port[INET_ADDRSTRLEN];
	    printf("port: %d\n", ntohs(ip_client->sin_port));
	    printf("Tin nhan ban nhan dc tu client: \n");
	    //read, doc du lieu gan vao bien valread tra ve so byte ma no doc duoc
	    valread = read( new_socket, buffer, 1024);
	    //viet hoa
	    ToUp(buffer); 
	    //gan bien hello tra ve cho client la buffer da viet hoa
	    hello = &buffer;
	    printf("%s\n",buffer ); 
	    send(new_socket, hello, strlen(hello), 0 ); 
    }
    close(new_socket);
    return 0; 
} 
void ToUp( char *p ) 
{ 
	while( *p ) 
	{ 
		*p=toupper( *p ); 
		p++; 
	} 
} 
```
>Code phía client
```
#include <stdio.h> 
#include <sys/socket.h> 
#include <stdlib.h> 
#include <netinet/in.h> 
#include <string.h> 
#define PORT 8080 
   
int main(int argc, char const *argv[]) 
{ 
    struct sockaddr_in address; 
    int sock = 0, valread; 
    struct sockaddr_in serv_addr; 
    char *hello = "Hello from client";
    char buffer[1024] = {0}; 
    char add[225];
    int continu = 1;
    printf("Nhap dia chi server\n");
    gets(add);
    //tao socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) 
    { 
        printf("\n Socket creation error \n"); 
        return -1; 
    } 
    memset(&serv_addr, '0', sizeof(serv_addr)); 
    serv_addr.sin_family = AF_INET; 
    serv_addr.sin_port = htons(PORT); 
    // Convert IPv4 and IPv6 addresses from text to binary form 
    if(inet_pton(AF_INET, add, &serv_addr.sin_addr) <= 0)  
    { 
        printf("\nInvalid address/ Address not supported \n"); 
        return -1; 
    } 
    // connect
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) 
    { 
        printf("\nConnection Failed \n"); 
        return -1; 
    } 
    while(continu == 1){
        char mess_from_client[225];
        printf("Nhap noi dung tin nhan gui den server\n");
        gets(mess_from_client);
        fflush(stdin);
        hello = &mess_from_client;

        printf("Tin nhan ban nhan dc tu server: \n");
        send(sock , hello , strlen(hello) , 0 ); 
        // printf("Hello message sent\n"); 
        valread = read( sock , buffer, 1024); 
        printf("%s\n",buffer );
        
        if (strcmp(mess_from_client, "bye") == 0)
        {
            continu = 0;
        }
        fflush(stdin);
    }
    close(sock);
    return 0; 
} 
```

Sau khi build và run mình sẽ được thành quả như sau

![](https://images.viblo.asia/9462bf19-612d-4e58-9b52-202824c8b96a.png)

Đó là demo về 1 chương trình socket sử dụng ngôn ngữ C đơn giản nhất để tìm hiểu về lập trình mạng, cảm ơn bạn đã đọc nhé.