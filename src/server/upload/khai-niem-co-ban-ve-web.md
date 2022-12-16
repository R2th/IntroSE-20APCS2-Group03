# Mô hình chung
![](https://images.viblo.asia/9b219d89-d26b-4075-902a-9deaddd92981.png)

Client gởi yêu cầu thông tin lên internet 

Server nhận yêu cầu, xử lý và gởi kết quả về cho Client
## Địa chỉ URL
URL (Uniform Resource Loader) là địa chỉ đầy đủ chỉ đến một tài nguyên thông tin trên Internet

Ví dụ: https://viblo.asia/p/server-side-rendering-client-side-rendering-single-page-applications-jvElaWYYKkw

Trong đó: 
* **https://** Gọi là tên dịch vụ (có thể gọi là phần giao thức)
* **viblo.asia** Là phần tên máy chủ
* **p/server-side-rendering-client-side-rendering-single-page-applications-jvElaWYYKkw** Đường dẫn đến tài nguyên
Lợi ích của URL là cung cấp một phương pháp đơn giản, đồng bộ cho việc định danh các tài nguyên có sẵn trên Internet, thông qua các giao thức khác nhau như HTTP, FTP, Telnet,...
## Giao thức HTTP
Web Brower và Web Server giao tiếp với nhau  thông qua một giao thức được gọi là HTTP. Sự kết nối bằng HTTP thông qua 4 giai đoạn
* Tạo kết nối: Web Browser giao tiếp với Web Server nhờ địa chỉ Internet và số cổng (ngầm định là 80) được đặc tả trong URL
* Thực hiện yêu cầu: Web Browser gửi thông tin tới Web Server để yêu cầu phục vụ. Việc gởi và nhận thông tin ở đây theo phương thức POST, GET,... mình sẽ phân biệt POST GET bên dưới :)
* Phản hồi: Web Server gửi một phản hồi về Web Browser nhằm đáp ứng yêu cầu của Web Browser
* Kết thúc kết nối: Khi kết thúc quá trình trao đổi giữa Web Brower và Web Server thì sự kết nối chấm dứt

Mình xin nói sơ qua về 2 phương thức của HTTP là POST và GET
* GET: Dữ liệu của phương thức này gửi đi thì hiện trên thanh địa chỉ (URL) của trình duyệt. Có một số đặc điểm như: có thể được cache bởi trình duyệt, có thể duy trì bởi lịch sử đó cũng là lý do mà người dùng có thê bookmark được, không được sử dụng nếu trong form có các dữ liệu nhạy cảm như là password, tài khoản ngân hàng, bị giới hạn số trường độ dài data gửi đi.
* POST: Dữ liệu được gửi đi với METHOD POST thì không hiển thị trên thanh URL, Có một số đặc điểm như: không cache bởi trình duyệt, không thể duy trì bởi lịch sử đó cũng là lý do mà người dùng không thê bookmark HTTP POST được, không giới hạn dữ liệu gửi đi
* Từ các đặc điểm trên ta có thể phân biệt được giữa POST và GET: POST bảo mật hơn GET vì dữ liệu được gửi ngầm, không xuất hiện trên URL, GET dữ liệu được gửi tường minh, chúng ta có thể nhìn thấy trên URL, đây là lý do khiến nó không bảo mật so với POST, GET thực thi nhanh hơn POST vì những dữ liệu gủi đi luôn được webbrowser cached lại, khi dùng phương thức POST thì server luôn thực thi và trả về kết quả cho client, còn phương thức GET ứng với cùng một yêu cầu đó webbrowser sẽ xem trong cached có kết quả tương ứng với yêu cầu đó không và trả về ngay không cần phải thực thi các yêu cầu đó ở phía server, đối với những dữ liệu luôn được thay đổi thì chúng ta nên sử dụng phương thức POST, còn dữ liệu ít thay đổi chúng ta dùng phương thức GET để truy xuất và xử lý nhanh hơn.

Ngoài ra còn có các phương thức khác như put/patch, delete,... các bạn tìm hiểu thêm nhé :)
## Web Client
Là một phần mềm được sử dụng trên máy khách (Client), dùng để gởi các yêu cầu lên Web Server và nhận các kết quả đáp ứng từ Server đồng thời hiển thị lên với khuôn dạng thích hợp

Các trình duyệt: Mosaic NCSA, Internet Explore
## Web Server
Là phần mềm được sử dụng trên máy chủ (máy phục vụ) để lắng nghe các yêu cầu từ các máy khách (Web Client) và đáp ứng yêu cầu cho máy Client

Có rất nhiều Web server chạy trên nhiều flatfor: Web server của NSCA trên UNiX, Web Server dùng trên môi trường Windows, Web Server của Oracle được thiết kế để tận dụng khả năng truy cập vào cơ sở dữ liệu của Oracle 
## Mô hình xử lý Client/Server
Là mô hình nổi tiếng trên mạng máy tính, phổ biến và được áp dụng rộng rãi trên các trang Web hiện nay. Ý tưởng của mô hình này như sau : Client (máy khách) gửi yêu cầu (request) đến Server (máy chủ, cung ứng dịch vụ cho các máy khách). Server xử lý dữ liệu và gửi kết quả về cho Client.Việc giao tiếp giữa Client và Server phải dựa trên các giao thức chuẩn. Các giao thức chuẩn được sử dụng phổ biến hiện nay là : giao thức TCP/IP, giao thức SNA của IBM, OSI, ISDN, X.25 hoặc giao thức LAN-to-LAN NetBIOS

Một mô hình xử lý Client/Server phải có 3 thành phần cơ bản: Front-end Client, Back-end Server, Mạng máy tính (Network)
* Một chương trình Front-end Client chạy trên trạm làm việc (Workstation), mà ở đó người sử dụng giao tiếp với ứng dụng để yêu cầu cung cấp dịch vụ, như truy vấn dữ liệu.
* Chương trình Back-end Server chạy trên máy chủ (Host) tiếp nhận thông tin và cung cấp dịch vụ được yêu cầu, như phản hồi truy vấn 
* Mạng máy tính có chức năng truyền tải thông tin

Tại sao phải xử dụng mô hình này:
* Dữ liệu và tài nguyên được tập trung lại, tăng tính toàn vẹn của dữ liệu
* Sự linh động trong việc mở rộng hệ thống mạng
* Không phụ thuộc vào cùng 1 nền tảng, chỉ cần chung 1 định dạng giao tiếp (protocol) là có thể hoạt động
* Nhược điểm của mô hình này là tính an toàn và bảo mật thông tin trên mạng. Do phải trao đổi dữ liệu giữa 2 máy ở 2 khu vực khác nhau nên dễ dàng xảy ra hiện tượng thông tin trên mạng bị lộ và từ đó vai trò của quản trị mạng trở nên quan trọng hơn rất nhiều.

Ví dụ: 
* Mail Server : Ở phía Client, người dùng soạn thảo Email và gửi đến Mail Server, phía Mail Server tiếp nhận và lưu trữ, tìm kiếm địa chỉ mail được gửi đến và gửi đi.
* Web Server : Lưu trữ các Website. Khi người dùng ở máy Client nhập địa chỉ trang web, Client gửi yêu cầu đến Web Server và Web Server sẽ gửi toàn bộ nội dung trang web về cho Client.
* File Server : Lưu trữ các tập tin. Nhận và truyền tập tin về phía Client , người dùng có thể download - upload tập tin lên Server qua Web browser hoặc giao thức FTP
## Kết luận:
Trên đây là những kiến thức cơ bản về web, hi vọng những kiến thức này sẽ có ích cho những bạn đang có ý định trở thành một web developer trong tương lại :)