Ở  bài viết [Sơ lược về mô hình Client-Server và giao thức HTTP](https://viblo.asia/p/so-luoc-ve-mo-hinh-client-server-va-giao-thuc-http-jvElaarNlkw), chúng ta đã cùng hiểu về mô hình client-server, hiểu được nguyên lý hoạt động của giao thức HTTP. Ở bài viết này, chúng ta sẽ đi sâu tìm hiểu thế nào là HTTP request và các phương thức của HTTP request.
# 1. Thế nào là HTTP request

HTTP request là thông tin được gửi từ client lên server, để yêu cầu server tìm hoặc xử lý một số thông tin, dữ liệu mà client muốn. HTTP request có thể là một file text dưới dạng XML hoặc Json mà cả hai đều có thể hiểu được. Dưới đây là một HTTP request sử dụng phương thức GET

![](https://images.viblo.asia/803be084-60a3-4fba-8570-5e3601f4be17.png)

# 2. Các phương thức của HTTP request

## 2.1. Phương thức GET

Get là phương thức được Client gửi dữ liệu lên Server thông qua đường dẫn URL nằm trên thanh địa chỉ của Browser. Server sẽ nhận đường dẫn đó và phân tích trả về kết quả cho bạn. Hơn nữa, nó là một phương thức được sử dụng phổ biến mà không cần có request body.

Ví dụ điển hình là khi bạn mở một trang web, Client sẽ gửi một phương thức Get lên server để truy xuất nội dung hiển thị của trang web. Nó tương đương với thao tác đọc.

Một số đặc điểm chính của phương thức Get là: 

* Giới hạn độ dài của các giá trị là 255 kí tự.
* Chỉ hỗ trợ các dữ liệu kiểu String.
* Có thể lưu vào bộ nhớ cache.
* Các tham số truyền vào được lưu trữ trong lịch sử trình duyệt.
* Có thể được bookmark (đánh dấu rồi xem lại sau) do được lưu trong lịch sử trình duyệt.

## 2.2. Phương thức POST

Phương thức Post là phương thức gửi dữ liệu đến server giúp bạn có thể thêm mới dữ liệu hoặc cập nhật dữ liệu đã có vào database.

Chúng ta sẽ gửi thông tin cần thêm hoặc cập nhật trong phần body request. 

Một số đặc điểm chính của Post là: 

* Dữ liệu cần thêm hoặc cập nhật không được hiển thị trong URL của trình duyệt.
* Dữ liệu không được lưu trong lịch sử trình duyệt.
* Không có hạn chế về độ dài của dữ liệu.
* Hỗ trợ nhiều kiểu dữ liệu như: String, binary, integers,..

## 2.3. Phương thức PUT
 Cách hoạt động tương tự như Post nhưng nó chỉ được sử dụng để cập nhật dữ liệu đã có trong database. Khi sử dụng nó, bạn phải sửa toàn bộ dữ liệu của một đối tượng. 
 
 ## 2.4. Phương thức PATCH
 
 Tượng tự như Post và Put, nhưng Patch được sử dụng khi phải cập nhật một phần dữ liệu của đối tượng.
 
 ## 2.5. Phương thức DELETE
 
 Giống như tên gọi, khi sử dụng phương thức Delete sẽ xoá các dữ liệu của server về tài nguyên thông qua URI. Cũng giống như GET, phương thức này không có body request.

## 2.6. Phương thức HEAD

HEAD gần giống giống với lại GET, tuy nhiên nó không có response body.

Nói một cách khác, nếu sử dụng phương thức GET tới đường dẫn /Books thì sẽ trả về danh sách các sản phẩm, còn khi sử dụng HEAD tới đường dẫn /Books nhưng không nhận được danh sách các sản phẩm.

Truy vấn HEAD hữu ích khi chúng ta sử dụng nó để kiểm tra API có hoạt động không do không có response body nên thời gian phản hồi nhanh hơn so với phương thức Get. Và thường được sử dụng để kiếm tra trước khi download file do cứ gọi đến api dowload sẽ download file nên thêm phương thức head vào nó kiểm tra xem api có đang hoạt động tốt không tránh down nhiều.

# 3. Cấu trúc của HTTP request

Một HTTP request bao gồm:
* Request line
* Body request ( có thể có hoặc không)
 
Một ví dụ về HTTP request đơn giản: https://bookstore.toolsqa.com/BookStore/v1/Books bao gồm các thành phần: 
* URL nguồn( URL chung cho tất cả Api trong hệ thống): https://bookstore.toolsqa.com/
* Parameter( định danh cho 1 Api cụ thể) : BookStore/v1/Books

 Bây giờ các bạn hãy mở một tab mới, paste URL https://bookstore.toolsqa.com/BookStore/v1/Books thanh công cụ tìm kiếm rồi enter. Sau đó bạn ấn chuột phải và chọn **Inspect** để mở các công cụ dành cho nhà phát triển. Tiếp đó chọn tab Network như bên dưới
 
 ![](https://images.viblo.asia/83045fef-9550-4e44-a3f8-e78c1d0117d2.jpg)

 Cuối cùng, các bạn ấn F5 lại trình duyệt, điều bất ngờ sẽ hiển thị ra. Chúng ta có thể nhìn thấy mô tả chi tiết của request. Hình dưới là chi tiết của phương thức Get

![](https://images.viblo.asia/7132e99b-a28b-4a1c-9d1d-62b73045e9d3.png)

### 3.1. Request line

Request line là dòng đầu tiên trong HTTP request. Nó bao gồm 3 phần:

* Phương thức HTTP được sử dụng
* URI( Uniform Resource Identifier) giúp xác định các tài nguyên mà client yêu cầu. 
* Phiên bản của giao thức HTTP

Một request line sẽ có định dạng như sau: `GET /BookStore/v1/Books HTTP/1.1`

### 3.2. Request header

Request header giúp client có thể gửi yêu cầu lên server. Mỗi yêu cầu sẽ kèm theo các thông số, và các thông số đó được gọi là *Header Parameters*. Trình duyệt và server sẽ dựa vào các thông số header này để trả dữ liệu và hiển thị dữ liệu cho phù hợp. 

![](https://images.viblo.asia/fab457ed-661d-4762-ac12-137891d8ea05.png)

Các thông số mà các bạn có thể gặp khá thường xuyên như:

* **User-Agent:** cho phép server xác định ứng dụng, hệ điều hành, nhà cung cấp và phiên bản.
* **Connection:** kiểm soát kết nối mạng. Nói cách khác, cho phép dừng hoặc tiếp tục kết nối sau khi server thực hiện xong yêu cầu.
* **Cache-Control:** chỉ định chính sách bộ nhớ đệm của trình duyệt.
* **Accept-Language:** cho biết tất cả các ngôn ngữ (tự nhiên) mà client có thể hiểu được.

### 3.3. Request body

Cho phép client gừi đến yêu cầu bổ sung cần server thực hiện như: tạo mới hoặc cập nhật dữ liệu mà không thể truyền trên Header Parameters.

Request body thường được sử dụng trong các phương thức Post, Put, Patch.

Dưới đây là request tạo account mới, với 2 parameter là userName và password

![](https://images.viblo.asia/024f0c76-25dd-40f7-827a-12b09560e67c.png)


**Tài liệu tham khảo**: https://toolsqa.com/client-server/http-request/