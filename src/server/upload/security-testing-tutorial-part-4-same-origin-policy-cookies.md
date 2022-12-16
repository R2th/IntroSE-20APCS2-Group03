Ở phần trước chúng ta đã cùng nhau tìm hiểu về quá trình Encoding/ Decoding trong quá trình truyền tải trên Internet, ở phần này chúng ta sẽ cùng nhau tìm hiểu về Same Origin Policy và Cookies.
## What is Same Origin Policy?
![](https://images.viblo.asia/9c0d86ff-0393-43e0-9109-80fe89fb7d2b.jpeg)

**Same-origin policy** (SOP) là một trong những chính sách bảo mật quan trọng nhất trên trình duyệt hiện đại, nhằm ngăn chặn JavaScript code có thể tạo ra những request đến những nguồn khác với nguồn mà nó được trả về. Ba tiêu chí chính để so sánh request bao gồm:
* Domain (tên miền)
* Protocol (giao thức)
* Port (cổng kết nối)

Nói đơn giản thì request sẽ được coi là hợp lệ chỉ khi nó thỏa mãn 3 tiêu chí ở trên (cùng domain,cùng protocol và cùng port)
### Example
Thử tưởng tượng khi chúng ta đang mở 2 tab, 1 tab là facebook, tab kia là 1 trang web nào đó có chứa mã độc. Sẽ rất nguy hiểm nếu như các đoạn script ở bên tab chứa mã độc có thể tự do thao tác lên tab facebook phía bên kia, và **SOP** sinh ra với nhiệm vụ ngăn chặn các hành động này.

Dưới đây là vd về list các pages vi phạm **SOP** của site origin( http://www.example.com) :
* http://www.example.co.uk (khác domain)
* http://example.org (khác domain)
* https://example.com (khác protocol)
* http://example.com:8080 (khác port)

### Bypass Same-Origin Policy
Mặc dù ưu điểm bảo mật của **SOP** là rõ ràng, tuy nhiên trong một số trường hợp điều này lại gây khó khăn cho các nhà phát triển.

Điển hình Internet Explorer có hai ngoại lệ có thể bỏ qua **SOP**:
* Nếu 2 domain cùng thuộc trust zone
* Không bao gồm cổng, nghĩa là với IE thì http://company.com:81/index.html và http://company.com/index.html đều cùng source.

Nếu một công ty có nhiều web application cùng yêu cầu xác thực tại một nơi, vd như http://store.company.com cần xác thực tại http://login.company.com trước. Việc nhận dữ liệu trả về từ request đến http://login.company.com không khả thi vì đã bị chặn do vi phạm **SOP**.

Chúng ta có nhiều cách để giải quyết trong trường hợp này, thường dùng nhất là **Cross Origin Resource Sharing** (CORS). Tuy nhiên chúng ta sẽ nói về CORS ở phần khác.

## What is a Cookie?
![](https://images.viblo.asia/11ceef67-7ae3-4437-9223-5850ea8b881f.png)

Cách giải thích đơn giản nhất đó là: **Cookie** là một file tạm được tự động tạo ra trong máy tính, mỗi khi người dùng truy cập một trang web nào đó, nó sẽ lưu những thông tin liên quan đến cá nhân như tài khoản đăng nhập, các tùy chọn thiết lập... để sử dụng cho những lần sau.

Định nghĩa một cách chuyên nghiệp hơn: **Cookie** là một file được mã hóa chứa các thông tin của người dùng, được tạo ra bởi website và lưu trên chính thiết bị của người sử dụng (pc, laptop, smartphone.....). Khi trình duyệt thực hiện request đến server, thông tin lưu trong đó sẽ được trình duyệt đính kèm theo và được gửi ngược lên server.

Vì **Cookie** được tạo ra bởi website mà người dùng truy cập, do vậy 2 website khác nhau (cho dù cùng host trên 1 server) sẽ có 2 Cookies khác nhau gởi tới server. Ngoài ra, mỗi trình duyệt đều có phương thức quản lý và lưu trữ **Cookie** theo cách riêng, cho nên 2 trình duyệt cùng truy cập vào 1 website sẽ nhận được 2 Cookies khác nhau.

### Types of Cookies
**Cookie** có thể được phân làm hai loại chính:
* **Session cookies**: cookies này được giữ lại ở trình duyệt và sẽ bị xóa bỏ khi đóng trình duyệt. Khi cửa sổ trình duyệt mới được mở lại, người dùng sẽ phải cung cấp lại các chứng thực của mình.
* **Persistent cookies**: cookies này được giữ ở trình duyệt cho tới khi hết hạn hoặc được xóa một cách thủ công. Các trang web sẽ ghi nhớ các chứng thực ngay cả khi người dùng đóng trình duyệt.

### Cookie Contents
Các thành phần chính của **Cookie** bao gồm:
* **Name** - dùng để định danh, không phân biệt hoa thường.
* **Value** - các giá trị được lưu trong cookies
* **Domain** - là domain sở hữu cookies
* **Path** - là đường dẫn được chỉ định, nơi mà cookies sẽ được gửi đến
* **Expiration** - hạn sử dụng của cookies, sau khi quá thời gian quy định, cookies sẽ bị xóa
* **Secure Flag** - cookies sẽ được gửi chỉ khi được gắn cờ

### Testing Cookies
Dưới đây là các cách để test cookies:
* **Disabling Cookies** - chúng ta cần kiểm tra lại website sau khi vô hiệu hóa chức năng cookies, để xem mọi thứ có hoạt động bình thường hay không (có thể kiểm tra chức năng access như login logout, thanh điều hướng, các tùy chọn cá nhân, thông báo yêu cầu cần đến cookies...)
* **Corrupting Cookies** - trước tiên ta cần tìm ra vị trí của cookies cần tìm, sau đó tiến hành edit thủ công các giá trị trong và bên ngoài cookies sao cho cookie đó không còn "sạch", sau đó tiến hành check lại 1 lượt các chức năng của trang web sử dụng đến cookies.
* **Removing Cookies** - Xóa toàn bộ cookies và tiến hành kiểm tra sự thay đổi của trang web
* **Cross-Browser Compatibility** Kiểm thử nhiều trình duyệt - kiểm tra khả năng hoạt động của cookies trên nhiều trình duyệt khác nhau
* **Editing Cookies** - cũng gần giống như Corrupting Cookies nhưng khác biệt là nó ở mức độ nhẹ hơn, chúng ta có thể thay đổi thông tin cá nhân của người dùng được lưu trong cookies thành một người khác, sau đó tiến hành truy cập lại hệ thống.

*References*:
* https://www.tutorialspoint.com/security_testing/same_origin_policy.htm
* https://www.tutorialspoint.com/security_testing/testing_cookies.htm