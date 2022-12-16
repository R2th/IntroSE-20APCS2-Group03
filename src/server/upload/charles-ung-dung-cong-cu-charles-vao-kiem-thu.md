Đối với việc kiểm thử ứng dụng hay app, khi muốn check việc gọi API xem ứng dụng đó gọi API nào hay API nào được gọi trước hoặc là muốn kiểm tra dữ liệu truyền đi / trả về có đúng với mong đợi không? 

Thường những việc như vậy chúng cần phải nhờ dev debug để check log, việc này rất mất thời gian, đôi khi không đảm bảo chính xác được kết quả mà lại còn ảnh hưởng đến công việc của dev .

Vì vậy, trong bài viết này sẽ gợi ý cho Tester một công cụ có thể giúp ích cho những công việc trên. Đó chính là sử dụng Charles tool.
# I. Giới thiệu Charles Tool

![](https://images.viblo.asia/c2fcbf65-2798-4b41-9024-0de89da66ed5.png)
## 1. Định nghĩa
Charles là:
- Một web proxy chạy trên máy tính của bạn, hữu ích cho việc debug hoặc test với các app/ứng dụng mô hình client - server.
- Cho phép  theo dõi tất cả đường truyền HTTP traffic giữa browser/mobile app tới Internet, bao gồm các requests, responses và HTTP Headers (chứa cả cookies và các thông tin caching), đặc biệt là khả năng theo dõi các kết nối HTTPS đã được mã hóa.

Nói một cách dễ hiểu hơn là chúng ta có thể chỉnh sửa để web browser hoặc device bên ngoài truy cập vào internet thông qua máy tính của bạn. charles có thể theo dõi và hiển thị dữ liệu gửi đi và nhận về các request.

## 2. Một số chức năng chính của Charles
Một số chức năng chính của Charles tool:
- SSL Proxying – xem SSL requests and responses
- Bandwidth Throttling – dùng để test với những đường truyền khác nhau (giới hạn tốc độ đường truyền)
- AJAX debugging – xem XML and JSON requests and responses theo dạng cây thư mục hoặc dạng text
- Repeat requests to test thay đổi back-end 
- Edit requests – để test nhiều inputs
- Breakpoints để chỉnh sửa requests và responses

Ở phần sau sẽ chỉ đề cập đến những chức năng QA hay dùng và hướng dẫn lấy log với Charles.
# II. Hướng dẫn cài đặt và sử dụng
## 1. Hướng dẫn cài đặt
- Dowload charles tại trang chủ : http://www.charlesproxy.com/download/ .
- Sau khi dowload xong tiến hành cài đặt  tương tự như các tool khác. Lưu ý là charles mất phí nhưng vẫn có thể dùng thử 1 tháng, đủ để sử dụng trong quá trình phát triển dự án.
- Sau khi cài đặt xong sẽ thấy giao diện của Charles như sau:

![](https://images.viblo.asia/2b4a4703-3d6a-4812-817a-c1a35b998e16.png)


Tiếp theo , chúng ta cần setup cho thiết bị hoặc device. Ở đây, mình sẽ setup cho Iphone 6S Plus.
- Kiểm tra ip máy tính bằng cách vào command line gõ `ipconfig`
- Sau đó vào device iphone, đi tới màn hình setting/wifi, tap vào wifi đang kết nối chọn http proxy/manual, nhập  chỉ ip máy tính của bạn, port default là 8888

![](https://images.viblo.asia/7eb57bb7-6503-4856-a81c-7d4ea8da9dde.PNG)


- Cài đặt SSL Certificate: để Charles có thể theo dõi được các kết nối HTTPS, client cần phải cài đặt và trust CA Certificate từ Charles.

  Đối với iOS, mở trình duyệt Safari (hoặc Android Browser, Chrome đối với Android, lưu ý không dùng Firefox, tôi sẽ giải thích lí do bên dưới), truy cập vào địa chỉ https://charlesproxy.com/getssl - lúc này hệ thống sẽ hỏi bạn có muốn cài đặt CA Certificate vào máy không, chọn có và cài đặt.

![](https://images.viblo.asia/db8df3f3-6f66-45f8-beed-efdccb1ff4d7.jpg)


 **Note:**  
 Đối với iOS 10.3 trở lên, bạn cần vào Settings > General > About > Certificate Trust Settings và enable certificate vừa cài đặt thì mới có hiệu lực.


Khi setting cho thiết bị xong,  bên phía charles sẽ nhận được thông báo có thiết bị muốn truy cập qua máy bạn, hãy click allow


   ![](https://images.viblo.asia/92bdfe8f-6ed3-4b2b-888d-1e92f4dd1cb1.png)
   
##    2. Sử dụng
### Get log
   Sau khi allow,  thiết bị sẽ truy cập vào internet thông qua proxy mà máy tính của bạn. Khi tiến hành gửi request mạng trên device là Charles sẽ có đầy đủ thông tin kết nối.
   
   Ví dụ khi vào một trang bất kì sẽ thấy charles bắt được request. Xem ảnh dưới đây:
   
![](https://images.viblo.asia/7669b5ab-ffe8-4b56-8117-57360581d5d1.png)

Sau khi có thông tin của request, có thể get log bằng cách chọn File > Save sesion as > Chọn lưu file dưới format .chls. File này dùng để check thông tin log so với spec của dự án và cũng có thể dùng làm envidence khi có bug.

### Break point để chỉnh sửa request hoặc response

Chọn Proxy/Breakpoint Settings và break thử với link https://viblo.asia/series


![](https://images.viblo.asia/f51783d6-616d-46f6-8de0-e88e29b300c0.png)


Khi chạy trên device tới trang nay, sẽ xuất hiện thông báo có thực thi tiếp hay cancel không?

Ở bước này , charles breaking request gói tin đó, bạn có thể chỉnh sửa header, body, ... tuỳ ý, sau đó ấn execute để thực hiện tiếp.


![](https://images.viblo.asia/66f37694-059a-4af8-b661-33a0d8beb6e5.png)


Tiếp tục sẽ breakpoint response, tại đây bạn có thể chỉnh sửa format json trả về trước khi execute.


![](https://images.viblo.asia/11b8bf57-5c37-4e9d-b3b0-58340fccabfb.png)


Như vậy mình có thể check được những case theo mong muốn.

Ví dụ như cần check một case thông tin call API sau khi xem video xong xem nó gọi API nào trước trong trường hợp:  đang xem video -> Tắt mạng -> Tiếp tục xem video cho đến khi xong -> Bật mạng.

Khi mà thực hiện bằng tay , mình không thể căn đúng lúc gọi API để ngắt mạng đúng lúc được. Như vậy, trong trường hợp này Charles rất giúp ích cho QA trong việc kiểm thử.

### Bandwidth throttling - Giới hạn tốc độ đường truyền
Sẽ có những dự án yêu cầu test với các tốc độ mạng khác nhau để đảm bảo ứng dụng có thể chạy hoặc download app trong các điều kiện mạng nhất định.
Khi đó chúng ta sẽ dùng chức năng Bandwidth throttling của Charles để thiết lập băng thông thích hợp để test.

Chọn Proxy > Throttling Settings...> Bạn chọn Enable Throttling và lựa chọn gói mạng phù hợp để kiểm tra

![](https://images.viblo.asia/ced40b46-f97a-4b9b-a157-c366e2bc8d84.png)

Trên đây là một số chức năng chính hữu dụng cho việc kiểm thử, mong là bài viết có thể giúp ích phần nào cho công việc của mọi người.


### Tài liệu tham khảo trang chủ của Charles:
https://www.charlesproxy.com/