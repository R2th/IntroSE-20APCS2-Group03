# Giới thiệu
Xin chào,  trong bài này mình sẽ giới thiệu 1 số lưu ý khi sử dụng thư viện winsock2.h (thư viện window socket) sử dụng trong window app.
## Cơ bản
Đầu tiên, bạn sẽ dễ dàng search được 1 ví dụ cụ thể trên document của winsock2.
```cpp
#ifndef UNICODE
#define UNICODE
#endif

#define WIN32_LEAN_AND_MEAN

#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdio.h>

// Need to link with Ws2_32.lib
#pragma comment(lib, "ws2_32.lib")

int wmain()
{
    //----------------------
    // Initialize Winsock
    WSADATA wsaData;
    int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (iResult != NO_ERROR) {
        wprintf(L"WSAStartup function failed with error: %d\n", iResult);
        return 1;
    }
    //----------------------
    // Create a SOCKET for connecting to server
    SOCKET ConnectSocket;
    ConnectSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (ConnectSocket == INVALID_SOCKET) {
        wprintf(L"socket function failed with error: %ld\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }
    //----------------------
    // The sockaddr_in structure specifies the address family,
    // IP address, and port of the server to be connected to.
    sockaddr_in clientService;
    clientService.sin_family = AF_INET;
    clientService.sin_addr.s_addr = inet_addr("127.0.0.1");
    clientService.sin_port = htons(27015);

    //----------------------
    // Connect to server.
    iResult = connect(ConnectSocket, (SOCKADDR *) & clientService, sizeof (clientService));
    if (iResult == SOCKET_ERROR) {
        wprintf(L"connect function failed with error: %ld\n", WSAGetLastError());
        iResult = closesocket(ConnectSocket);
        if (iResult == SOCKET_ERROR)
            wprintf(L"closesocket function failed with error: %ld\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    wprintf(L"Connected to server.\n");

    iResult = closesocket(ConnectSocket);
    if (iResult == SOCKET_ERROR) {
        wprintf(L"closesocket function failed with error: %ld\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    WSACleanup();
    return 0;
}
```
Ví dụ này khá cụ thể và chi tiết, tuy nhiên, mình có 1 số lưu ý khi sử dụng example này như bên dưới.
### WSAStartup
```cpp
int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
```
Đây là hàm bắt buộc được gọi khi muốn thao tác với window socket bằn 1 ứng dụng hoặc DLL. Ngoài việc khới tạo môi trường win socket, lệnh này còn chỉ định phiên bản winsock được sử dụng cho app. 
Phổ biến nhất, ta sử dụng phiên bản 2.2 cho hầu hết các ứng dụng, vì các phiên bản trước đã quá cũ rồi, ai cần dùng đâu. Chẳng hạn: win socket phiên bản 1.1 dành cho window 95 và window NT 3.51, toàn phiên bản từ đời nào rồi :). 
### WSACleanup()
```cpp
int WSACleanup();
```
Tất nhiên, có khởi tạo phải có kết thúc. Hàm `WSACleanup` sẽ làm điều này. Ở ví dụ trên, mỗi khi gặp lỗi ta sẽ Cleanup ngay trong đó rồi return.
Tuy nhiên, làm cách này rất dễ khiến ta bị quên hoặc nhầm lẫn khi gọi. Gọi Cleanup khi socket chưa được close sẽ sinh ra lỗi WSA_OPERATION_ABORTED.
Để khắc phục điều này, ta sử dụng:
```cpp
int atexit(
   void (__cdecl *func )( void )
);
```
Bằng cách sử dụng `atexit((void (*)(void))(WSACleanup))` Cleanup sẽ luôn được gọi khi kết thúc hàm. Quá tiện lợi. :v: 
### inet_addr();
```cpp
unsigned long inet_addr(
  const char *cp
);
```
Hàm convert ip từ char* về long. Tuy nhiên hàm này đã không còn được sử dụng nữa. Nếu bạn sử dụng phiên bản VS thấp hơn, warning sẽ xuất hiện.
Ở phiên bản mới hơn, ta sử dụng `inet_pton` thay thế:
```cpp
INT WSAAPI inet_pton(
  INT   Family,
  PCSTR pszAddrString,
  PVOID pAddrBuf
);
```
Inet_pton hoặc InetPton được ưu tiên sử dụng hơn vì sự rõ ràng trong param truyền vào và giá trị trả về.
Tuy nhiên, hàm này lại nằm ở thư viện `ws2tcpip.h` nên hãy nhớ include thư viện này nhé.
Ngoài ra, có thể sử dụng InetPton để check valid ip. Cụ thể, với ip không đúng chuẩn format, hàm này sẽ return 0, không có lỗi gì sẽ return 1(hơi lạ chút). Vậy hãy sử dụng hàm này để không phải viết đoạn code check valid ip theo text dài loằng ngoằng.
### WSAGetLastError()
`WSAGetLastError()` là công cụ hữu hiệu nhất để check error khi thao tác với winsocket. Bất cứ khi nào có lỗi xảy ra, hảm này sẽ trả về lỗi trong list: [Windows Sockets Error Codes](https://docs.microsoft.com/en-us/windows/win32/winsock/windows-sockets-error-codes-2).
Ngoài ra, ta có thể tự set lỗi thông qua hàm `WSASetLastError`. Việc set lỗi này sẽ có ý nghĩa trong 1 số trường hợp nhất định, set timeout cho server chẳng hạn.
### Send() và Receiv()
Tiến trình gửi và nhận data khi đã connect thành công.
```cpp
    iResult = send( ConnectSocket, sendbuf, (int)strlen(sendbuf), 0 );
    if (iResult == SOCKET_ERROR) {
        wprintf(L"send failed with error: %d\n", WSAGetLastError());
        closesocket(ConnectSocket);
        WSACleanup();
        return 1;
    }
```
Hàm send sẽ gửi lên server 1 gói tin bao gồm ip, port, path, param, ... tương đương với đường dẫn. Trong package  này còn chưa header và HTTP version.
Về http header, nếu không có option gì đặc biệt cho server khi request, giá trị này sẽ để trống. tham khảo [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
Về http version, có 2 phiên bản là HTTP 1.0 và HTTP 1.1. Tuy nhiên dùng HTTP 1.1 sẽ nhanh hơn, nên là khuyến cáo dùng HTTP 1.1 nếu server hỗ trợ. (Check server hỗ trợ HTTP 1.1 bằng cách check header response data)
> Note: luôn set giá trị buffer length với chiều dài xác định đúng bằng chiều dài package. Việc sai khác giá trị chiều dài bufffer với giá trị thực tế của buffer dẫn tới lỗi `400 Bad Request` từ phía server.
> Có thể shutdown send socket ngay sau khi send thành công.
```cpp
int recv(
  SOCKET s,
  char   *buf,
  int    len,
  int    flags
);
```
Vì mỗi lần nhận data từ server, ta chỉ  nhận được số byte cố định, nên ta dùng vòng lặp để lấy triệt để data từ server(cơ bản quá mà):
```cpp
    // Receive until the peer closes the connection
    do {

        iResult = recv(ConnectSocket, recvbuf, recvbuflen, 0);
        if ( iResult > 0 )
            printf("Bytes received: %d\n", iResult);
        else if ( iResult == 0 )
            printf("Connection closed\n");
        else
            printf("recv failed: %d\n", WSAGetLastError());

    } while( iResult > 0 );
```
### closesocket() và shutdown
Nhìn tên thì có vẻ 2 hàm này dễ gây nhầm lẫn, nhưng khi nhìn vào code thì lại khác.
```cpp
int closesocket(
  SOCKET s
);
```
```cpp
int shutdown(
  SOCKET s,
  int    how
);
```
Closesocket sẽ đóng hoàn toàn socket, tức là ta sẽ không thế sử dụng socket này nữa. Trong khi đó, với shutdown, ta có thể khóa chiều send, chiều receiv hoặc cả 2, Khuyến khích dùng shutdown trước khi closesocket.
# Tổng kết
Trên đây là 1 số phần mình rút ra được khi làm việc với winsock2.h và http request. Mong sẽ giúp các bạn tiết kiệm được chút ít thời gian tra google.
**Happy coding**