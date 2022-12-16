**Để xử lý việc nhận gửi thông tin từ 1 form của người dùng nhập vào trong lập trình web là việc thường xuyên. Chúng ta thường sử dụng 2 phương thức POST và GET. Tuy nhiên lúc nào sử dụng POST, lúc nào sử dụng GET? Sau đây là sự giống nhau và khác nhau giữa get và post**
## Sự giống nhau giữa GET và POST

- GET và POST đều là hai phương thức của giao thức HTTP.
- Đều gửi dữ liệu về server xử lí, sau khi người dùng nhập thông tin vào form và thực hiện submit.
- Trước khi gửi thông tin, nó sẽ được mã hóa bằng cách sử dụng một giản đồ gọi là url encoding. Giản đồ này là các cặp name/value được kết hợp với các kí hiệu = và các kí hiệu khác nhau được ngăn cách bởi dấu &. Các khoảng trống được xóa bỏ, thay thế bằng kí tự + và bất kì kí tự không phải dạng số và chữ được thay thế bằng giá trị hexa. Sau khi thông tin được mã hóa, nó sẽ được gửi lên Server.

## So sánh phương thức GET và POST

| GET | POST |
| -------- | -------- |
|Phương thức GET gửi thông tin người dùng đã được mã hóa được phụ thêm vào yêu cầu trang, truyền thông tin thông qua url.     | Phương thức POST truyền thông tin thông qua HTTP header    |
|Dữ liệu của METHOD GET gửi đi thì hiện trên thanh địa chỉ (URL) của trình duyệt.     | Dữ liệu được gửi đi với METHOD POST thì không hiển thị trên thanh URL    |
|   Phương thức GET được giới hạn gửi tối đa chỉ 2048 ký tự   | Phương thức POST không có bất kì hạn chế nào về kích thước dữ liệu sẽ gửi.     |
| HTTP GET có thể được cache bởi trình duyệt     | HTTP POST không cache bởi trình duyệt    |
| HTTP GET có thể duy trì bởi lịch sử đó cũng là lý do mà người dùng có thê bookmark được.     | HTTP POST không thể duy trì bởi lịch sử đó cũng là lý do mà người dùng không thê bookmark HTTP POST được.    |
| Không bảo mật     | Bảo mật     |
| Phương thức GET ứng với cùng một yêu cầu đó webbrowser sẽ xem trong cached có kết quả tương ứng với yêu cầu đó không và trả về ngay không cần phải thực thi các yêu cầu đó ở phía server.   | Khi dùng phương thức POST thì server luôn thực thi và trả về kết quả cho client     |
| Thực thi nhanh hơn POST vì những dữ liệu gửi đi luôn được webbrowser cached lại.     | Thực thi chậm hơn GET    |
| Không gửi được nhị phân.     |Phương thức POST có thể sử dụng để gửi ASCII cũng như dữ liệu nhị phân.     |
| Không bao giờ sử dụng phương thức GET nếu gửi password hoặc thông tin nhay cảm lên Server.     | Dữ liệu gửi bởi phương thức POST thông qua HTTP header, vì vậy việc bảo mật phụ thuộc vào giao thức HTTP. Bằng việc sử dụng Secure HTTP, bạn có thể chắc chắn rằng thông tin của mình là an toàn.     |
|PHP cung cấp mảng liên hợp $GET để truy cập tất cả các thông tin đã được gửi bởi phương thức GET.     | PHP cung cấp mảng liên hợp $POST để truy cập tất cả các thông tin được gửi bằng phương thức POST.     |
| Dữ liệu gửi bởi phương thức GET có thể được truy cập bằng cách sử dụng biến môi trường QUERYSTRING.    | Không thể    |
| Gửi lại form Với form gửi đi bằng phương thức GET bạn có thể gửi lại bằng cách bấm phím F5 hoặc Ctrl + R    | Nếu bạn muốn thực hiện việc gửi lại dữ liệu của form thì trình duyệt sẽ hiển thị một hộp thoại cảnh báo. Trở lại trang trước     |
| Dữ liệu gửi đi được lưu lại trong lịch sử web và có thể xem lại    | Không được lưu lại trong lịch sử     |
| Trong trường hợp bạn đã gửi form dữ liệu đi rồi sau đó bấm phím Backspace để quay lại trang trước thì với phương thức GET bạn sẽ vẫn được cùng một nội dụng (chứa form).    |Với POST thì bạn sẽ thấy một trang trống.     |
| Đối với dữ liệu ít thay đổi thường dùng phương thức GET để truy xuất và xử lý nhanh hơn.     | Đối với những dữ liệu luôn được thay đổi thì thường sử dụng phương thức POST     |
| Dữ liệu không cần bảo mật thì dùng phương thức GET    | Dữ liệu bảo mật thì dùng phương thức POST.     |