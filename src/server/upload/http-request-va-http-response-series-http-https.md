Ở phần trước chúng ta đã tìm hiểu qua về http. Ở bài viết này chúng ta sẽ tìm hiểu chi tiết về request và response của http 
https://viblo.asia/p/http-la-gi-series-http-https-maGK7rv95j2

## HTTP Request 
HTTP request là máy khách gửi và yêu cầu dữ liệu đến máy chủ bằng một phương thức như GET hoặc POST.
Hành vi của một trang web thường sẽ khác nhau tùy thuộc vào việc bạn có đã đăng nhập hay chưa.  
Để truy cập máy chủ web, máy khách kết nối với cổng TCP 80 (443 cho HTTPS)  trên máy chủ. Sau đó, nó sử dụng kết nối đó để gửi request đến máy chủ.

![image.png](https://images.viblo.asia/08715e70-5e65-480d-bcb1-274e62c7636c.png)

### Phương thức HTTP 
Phương thức này là loại yêu cầu HTTP và được mô tả trong Request-line. 
Có các loại phương thức sau: 
| Phương thức | Ý nghĩa |
|---|---|
| GET | Dùng để lấy thông tin từ sever theo URI đã cung cấp |
| HEAD | Response trả về không có body, chỉ có header |
| POST | Gửi thông tin tới sever thông qua các form http | 
| PUT | Ghi đè tất cả thông tin của đối tượng với những gì được gửi lên | 
| PATCH | Ghi đè các thông tin được thay đổi của đối tượng | 
| DELETE | Xóa thông tin trên server | 
| CONNECT | Thiết lập một kết nối tới server theo URI | 
| OPTIONS | Mô tả các tùy chọn giao tiếp cho resource | 
| TRACE | Thực hiện một bài test loop - back theo đường dẫn đến resource | 

Phương thức thường được sử dụng là get, post, put, delete
#### Phương thức GET 
- Đặc trưng 
    - Chuỗi truy vấn sẽ được hiển thị trong trường URL của trình duyệt của bạn.
        - ex: ```user=jhon&pass=java```
    - Chuỗi truy vấn không thích hợp để gửi một lượng lớn dữ liệu.

![image.png](https://images.viblo.asia/88903b29-1662-47db-8e37-33c7ba23a40b.png)

#### Phương thức POST  
- Đặc trưng 
    - POST có thể gửi dữ liệu lớn.
    - Nội dung đầu vào nằm trong phần "message body" và không được hiển thị trong URL của trình duyệt như GET.
    - Tuy nhiên, "message body" có thể xác nhận bằng cách phân tích, vì vậy nó không an toàn về mặt bảo mật. 

![image.png](https://images.viblo.asia/47246138-46b7-4794-99a8-9b42a1373db3.png)

### HTTP header fields
- là những thông tin mà máy khách và máy chủ có thể chuyển bổ sung trong các request và response. 

| Tên field | Ý nghĩa |
|---|---|
| WWW-Authenticate | Xác định phương thức xác thực sẽ được sử dụng cho URL được truy cập |
| Host |Tên máy chủ đích và tên DNS |
| User-Agent | Hiển thị thông tin về loại trình duyệt và hệ điều hành được người dùng sử dụng |
| Referer | Hiển thị địa chỉ của trang web trước đó |
| If-Modified-Since	 | Thông tin được lưu trữ dưới dạng "bộ nhớ cache cục bộ" của trình duyệt web nhưng sẽ chuyển tiếp nếu trang web được cập nhật hoặc thay đổi sau ngày và giờ đã chỉ định | 
| Clear-Site-Data | Xóa dữ liệu đã lưu trữ (cookie, bộ nhớ, bộ nhớ cache, v.v.) | 
| Accept | Thông báo cho máy chủ về loại dữ liệu bạn muốn nhận | 
| Cookie | Có một cookie HTTP được gửi từ máy chủ và được lưu trữ trong trình duyệt web của bạn |
| Set-Cookie | Gửi cookie từ máy chủ đến trình duyệt web của bạn | 
| Content-Disposition | Nếu thấy thuộc tính này, browser sẽ mở hộp thoại cho download file | 
| Content-Type | chỉ định kiểu MIME kiểu tài liệu, ví dụ như là text/html, image/gif, application/pdf,… | 
| Content-Length | kích thước của response body, ví dụ như browser dựa vào thông tin này để biết được tiến độ của việc download file. | 

## HTTP Response 
- là phản hồi mà máy chủ đã xử lý dữ liệu được gửi từ máy khách và trả lại cho máy khách. Khi bạn gửi yêu cầu đến máy chủ, quá trình xử lý theo phương thức được thực hiện trên máy chủ và kết quả xử lý sẽ được trả về. 

![image.png](https://images.viblo.asia/579962dd-5265-426d-8340-ccf52a3fdab8.png)

- Status line: Phiên bản HTTP và 200 cho biết rằng quá trình xử lý của máy chủ web đã thành công.
- Response Headers: Có thông tin chi tiết về response. 
- Có 1 dòng trống để phân tách header và body 
- Body:  chứa HTML, hình ảnh, v.v.


### Tài liệu tham khảo: 
- https://developer.mozilla.org/en-US/docs/Web/HTTP
- https://www.guru99.com/difference-get-post-http.html
- https://en.wikipedia.org/wiki/List_of_HTTP_header_fields