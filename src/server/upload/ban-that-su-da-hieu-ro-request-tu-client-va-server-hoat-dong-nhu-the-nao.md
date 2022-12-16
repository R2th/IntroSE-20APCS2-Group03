# Mở đầu
Hôm nay mình sẽ bàn luận về một vấn đề mà ở đây hẳn ai cũng có thể biết nhưng bài bày mình tập trung cho các bạn mới tìm hiểu về lập trình web application là chính. Nhưng các bạn  muốn củng cố kiến thức thì dành ít phút để đọc xem thử các bạn đã hiểu rõ bao nhiêu điều? Nào chúng ta cùng bắt đầu nào?

## 1. Mô hình client - server
Client-Server là một cấu trúc ứng dụng phân tán, phân vùng các tác vụ hoặc khối lượng công việc giữa các nhà cung cấp tài nguyên hoặc dịch vụ, được gọi là Server và người yêu cầu dịch vụ chính là Client. 
![](https://images.viblo.asia/ff45ca64-fca2-4a88-8ffc-d179aa343c68.png)

Nhưng mô hình này được nhiều người lại biết thông qua Web Application nơi mà một máy tính được đặt làm Server là nơi lưu trữ source code của hệ thống, xử lý các nghiệp vụ mà của các request gởi đến và Client là tất cả các thiết bị có thể truy cập đến Server đó thông qua Browser để gởi 1 request như (login, logout,...) được thực hiện thông qua Internet.


## 2. Phương thức giao tiếp giữa client - server
> Để 2 người có thể giao tiếp được với nhau thì có thể nói chuyện, nhắn tin, gặp nhau .... Thì Client - Server cũng như vậy nó sẽ giao tiếp thông qua giao thức HTTTP ( Hyperttext transfer protocol) với nhiều method như GET, POST, DELETE, PUT, PATCH.
> 
> Như các bạn biết đấy khi server xử lý xong yêu cầu của client thì nó cũng trả về cho client một kết quả. Cũng giống như request thì response trả về nó phải thông qua HTTP Response (HyperText Transfer Response) và ở đây nó có thể trả về 1 file .html, .php, json, ... tất cả những định dạng mà client yêu cầu nó sẽ trả về như vậy.
### 2.1. Request từ client đến server.

Bạn có tò mò khi một request của bạn từ client lên server nó sẽ bao gồm những gì không? 
Chắc hẳn ở đây các bạn điều biết là 1 request từ client lên server và thông qua giao thức HTTP or HTTPs với 2 method cơ bản là GET và POST nhưng thật ra 1 request lại chứa nhiều thông tin và từ đó chúng ta có thể lấy được rất nhiều thông tin bổ ích.

**Chúng ta cùng xem hình sau :**

Ví dụ bạn đang request đến 1 trang web thì thông tin bạn được chuyển lên như sau:
![](https://images.viblo.asia/b88593d2-576f-4e12-89b0-719cb7918175.PNG)

-   Request line: 
    + Method: Phương thức mà HTTP Request này sử dụng, thường là GET hoặc POST, ngoài ra còn có một số phương thức khác HEAD, PUT, DELETE, … . Trong ví dụ là phương thức GET
    + URI: Địa chỉ định danh tài nguyên. Trong trường hợp này là /index.html, nếu request không yêu cầu tài nguyên cụ thể , URI có thể là dấu *
    + HTTP version: Phiên bản HTTP đang sử dụng, trong ví dụ trên là HTTP 1.1
- Request headers cho phép client gửi thêm các thông tin bổ sung về thông điệp HTTP request và về chính client
   + Accept loại nội dung có thể nhận được từ thông điệp response. Ví dụ: text/plain, text/html…                    
    + Accept-Encoding: các kiểu nén được chấp nhận. Ví dụ: gzip, deflate, xz, exi…                     
    + Connection: tùy chọn điều khiển cho kết nối hiện thời. Ví dụ: keepalive,Upgrade…            
    + Cookie: thông tin HTTP Cookie từ server                                                                                    
User-Agent: thông tin về user agent của người dùng.
### 2.2. Response từ server trả về client
Cấu trúc HTTP response gần giống với HTTP request, chỉ khác nhau là thay vì Request-Line, thì HTTP có response có Status-Line. 
![](https://images.viblo.asia/28ce2629-d888-496b-9148-ec2a491ba70d.PNG)
-  **Status line**:
      + HTTP-version: phiên bản HTTP cao nhất mà server hỗ trợ.
      + Status-Code: mã kết quả trả về. (các mã status code các bạn có thể tham khảo ở API)
      + Reason-Phrase: mô tả về Status-Code.
-  **Response Header**: Nó sẽ cho mìn biết request của bạn được xử lý bởi service Apace hay Nginx kèm theo version của nó
# Kết thúc
Qua bài này hy vọng các bạn có đôi chút về kiến thức Web basic để có thể làm việc tốt hơn :D