## 1. API Testing
### 1.1. API là gì?
**API (Full form Application Programming Interface)** cho phép kết nối và trao đổi dữ liệu giữa hai phần mềm riêng biệt. Một hệ thống phần mềm triển khai API bao gồm các hàm/thủ tục con có thể được thực hiện bởi một hệ thống phần mềm khác.
### 1.2. Kiểm thử API là gì?
**Kiểm thử API** là loại kiểm thử phần mềm xác nhận API. Nó rất khác với kiểm thử GUI và tập chung chủ yếu vào logic nghiệp vụ của kiến trúc phần mềm. Thay vì sử dụng đầu vào (bàn phím) và đầu ra, trong kiểm thử API bạn sử dụng phần mềm để gửi yêu cầu đến API, nhận đầu ra và ghi lại phản hồi của hệ thống. Kiểm thử này không tập chung vào kiểm thử giao diện.<br/>
Kiểm thử API yêu cầu một ứng dụng để tương tác với API. Để kiểm thử API bạn sẽ cần:<br/>
* Sử dụng Tool kiểm thử để kiểm tra API
* Viết các câu lệnh để kiểm tra API
### 1.3. Tại sao phải kiểm thử API?
* Trong quá trình triển khai dự án, phần Server và Client làm độc lập với nhau nên có nhiều chỗ bên Client chưa làm xong, ta không thể chờ Client làm xong để test được dữ liệu. Do đó ta cần kiểm tra API bằng công cụ khác, lúc này việc test hoàn toàn không phụ thuộc gì vào client.
* Khi Client làm xong rồi, nếu ta kiểm tra trên client mà thấy lỗi liên quan đến logic và dữ liệu thì cũng cần phải kiểm tra thêm cả API để biết chính xác là Server sai hay Client sai nhằm giúp cho việc sửa lỗi nhanh hơn.
* Khi làm hệ thống web services, dự án chỉ viết API cho bên khác dùng, nên sẽ không có client để test giống như các dự án khác. Do đó, phải test API hoàn toàn.
## 2. Test API với Postman
### 2.1. Postman là gì?
Postman hiện tại là công cụ phổ biến để test API. Nó bắt đầu có từ năm 2012 như một dự án phụ của Abhinav Asthana để đơn giản hóa quy trình làm việc API trong kiểm thử và phát triển.
### 2.2. Tại sao sử dụng Postman?
Với hơn 4 triệu người dử dụng bây giờ, Postman trở thành công cụ được lựa chọn vì những lý do sau:
1. **Accessibility** - Để sử dụng Postman bạn chỉ cần đăng nhập vào tài khoản của bạn để dễ dàng truy cập các tệp mọi lúc, mọi nơi miễn là ứng dụng Postman được cài đặt trên máy tính.
2. **Use of Collections** - Postman cho phép người dùng tạo collections cho các lệnh API của họ. Mỗi một collections có thể tạo nhiều thư mục con và nhiều yêu cầu.
3. **Collaboration** - Collections và môi trường có thể nhập hoặc xuất giúp dễ dàng chia sẻ tệp. Một liên kết trực tiếp có thể sử dụng để chia sẻ collections.
4. **Creating Environments** - Có nhiều môi trường hỗ trợ ít lặp lại các thử nghiệm nên có thể sử dụng collection cho môi trường khác. 
5. **Creation of Tests** - Test checkpoints kiểm tra trạng thái phản hồi HTTP thành công có thể thêm vào mỗi lệnh gọi API giúp đảm bảo phạm vi kiểm tra.
6. **Automation Testing** - Thông qua việc sử dụng Collection Runner hoặc Newman, kiểm thử có thể chạy  nhiều lần lặp lại tiết kiệm thời gian.
7. **Debugging** - Bảng điều khiển Postman giúp kiểm tra dữ liệu nào đã được truy xuất giúp dễ dàng gỡ lỗi.
8. **Continuous Integration** - Với khả năng tích hợp liên tục, các hoạt động phát triển được duy trì.
### 2.3. Download và cài đặt Postman
Là một công cụ mã nguồn mở, postman có thể download dễ dàng. Dưới đây là các bước để cài đặt:<br/>
**Bước 1:** Truy cập https://www.getpostman.com/downloads/ và chọn hệ điều hành Mac, Windows or Linux. Bấm Download.<br/><br/>
![](https://images.viblo.asia/2e3becac-dd82-473f-94d5-724cf8371b56.png)<br/><br/>
**Bước 2:** Thông báo quá trình download của bạn hiển thị trên trang ứng dụng. Khi download đã hoàn thành, bấm vào Run.<br/><br/>
![](https://images.viblo.asia/42622300-5869-4f21-85fc-dff937f402ed.jpg)<br/><br/>
**Bước 3:** Bắt đầu cài đặt<br/><br/>
![](https://images.viblo.asia/3e4726e0-924c-4839-9734-e87ef70d54cf.png)<br/><br/>
**Bước 4:** Trong của sổ tiếp theo, đăng ký tài khoản Postman<br/><br/>
![](https://images.viblo.asia/f1dffda7-b2d1-4851-9ae2-1352b8300fc5.png)<br/><br/>
**Chú ý:** Có 2 cách để đăng ký tài khoản Postman. Một là tạo tài khoản Postman riêng,  hai là sử dụng tài khoản Google. Mặc dù Postnam cho phép người dùng sử dụng công cụ không cần đăng nhập, đăng ký vẫn đảm bảo collection của bạn được lưu và có thể sử dụng cho lần sau.<br/><br/>
**Bước 5:** Chọn công cụ không gian làm việc bạn cần và nhấn vào Save My Preferences<br/><br/>
![](https://images.viblo.asia/33db8b28-86db-4d5d-b0ef-9a2219f655c4.png)<br/><br/>
**Bước 6:** Bạn sẽ nhìn thấy màn hình khởi động<br/><br/>
![](https://images.viblo.asia/e23daa93-5280-4c31-8315-e73db979c353.png)<br/><br/>
### 2.4. Sử dụng Postman như thế nào?
Dưới đây là không gian làm việc của Postman
![](https://images.viblo.asia/8be2032c-527f-45fa-a6fc-6eb9c57ec7ed.png)<br/><br/>
1. **New** - Đây là nơi bạn tạo request, collection hoặc môi trường mới.
2. **Import**  - Nó sử dụng để nhập collection hoặc môi trường. Có các lựa chọn như nhập từ file, folder, link hoặc paste  text.
3. **Runner** - Kiểm thử tự động có thể thực hiện thông qua Collection Runner. 
4. **Open New** - Mở một Tab mới, cửa sổ Postman hoặc cửa sổ Runner bằng cách nhấn vào nút số 4 như hình vẽ
5. **My Workspace** - Bạn có thể tạo mới không gian làm việc riêng hoặc theo nhóm.
6. **Invite** - Cộng tác trên một không gian làm việc bằng cách mời các thành viên trong nhóm.
7. **History** - Các request bạn đã gửi sẽ được hiển thị trong lịch sử. Điều này giúp bạn dễ dàng theo dõi các hành động mà bạn đã thực hiện.
8. **Collections** - Cấu tạo bộ kiểm thử bằng cách tạo collections. Mỗi collection có thể có các thư mục con và nhiều request. Một yêu cầu hoặc thư mục cũng có thể được nhân đôi.
9. **Request tab** - Hiển thị tiêu đề của request bạn đang làm việc. Mặc định "Untitled Request" sẽ được hiển thị cho các yêu cầu không có tiêu đề.
10. **HTTP Request** - Nhấn vào sẽ hiển thị danh sách các yêu cầu khác nhau như: GET, POST, COPY, DELETE,v.v. Trong kiểm thử các yêu cầu được sử dụng phổ biến nhất là: POST, GET.
11. **Request URL** - Đây là nơi bạn sẽ xác định liên kết đến API sẽ truyền đến.
12. **Save** - Nếu có thay đổi với request, nhấn vào lưu là những thay đổi mới sẽ không bị mất hoặc ghi đè.
13. **Params** - Nơi sẽ viết các tham số cần thiết cho một request.
14. **Authorization** - Để truy cập API, cần có sự cho phép thích hợp. Nó có thể ở dạng tên người dùng, mật khẩu,v.v.
15. **Headers** - Bạn có thể cài các tiêu đề như nội dung dưới dạng JSON.
16. **Body** - Là nơi có thể điều chỉnh chi tiết trong một request, thường sử dụng trong request POST.
17. **Pre-request Scrip**t - Đây là tập lệnh sẽ được thực hiện trước request. Thông thường, các pre-request scripts cho môi trường cài đặt được sử dụng, để đảm bảo kiểm thử sẽ được chạy trong môi trường chính xác.
18. **Tests** - Là các kịch bản được thực hiện trong khi request. Điều quan trọng là có các thử nghiệm, vì nó thiết lập các checkpoints để xác minh xem trạng phản hồi có ổn không, dữ liệu truy xuất như mong đợi.<br/><br/>

Tài liệu tham khảo<br/>
https://www.guru99.com/postman-tutorial.html<br/>
https://www.guru99.com/api-testing.html?fbclid=IwAR1Ap_MXV1ioGhQtPJJY_Q5CnFUqAH5XYxfEJIemxrK0koc6kdxhH6OWrEg