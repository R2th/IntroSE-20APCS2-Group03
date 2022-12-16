# Introduction
Công nghệ không ngừng phát triển, các hệ thống không ngừng được mở rộng cả về chiều rộng và chiều sâu. Đối với các website, chỉ session cookies có lẽ là không đủ. Trong bài viết này chúng ta sẽ đi vào tìm hiểu về authentication sử dụng hai hình thức HTTP Basic kinh điển và API Token, so sánh chúng và từ đó lựa chọn hình thức phù hợp để xác thực người dùng cho hệ thống của bạn.
# Mục lục
* Introduction
* Mục lục
* I. HTTP
* II. API Token
* Tổng kết
* References
# I. HTTP
## 1. Authentication truyền thống
HTTP (Hypertext Transfer Protocol) là một giao thức không trạng thái. Do vậy theo cách cổ điển, để xác thực hệ thống yêu cầu người dùng gửi thông tin như username/password đính kèm cho từng request.

**Luồng hoạt động**: 
1. Người dùng gửi thông tin xác thực tới hệ thống. *(VD: **username, password,** v.v...)*
2. Hệ thống kiểm tra thông tin đăng nhập với dữ liệu lưu trong database.
3. Thông tin đăng nhập chính xác, hệ thống tiếp nhận request. Nếu thông tin đăng nhập không chính xác hệ thống trả về thông báo lỗi và từ chối request.

![](https://images.viblo.asia/91ea704c-4372-41e8-8798-82d9fe2e4023.png)


Hẳn không có gì ngạc nhiên, đây là một cách thức rất tệ để xác thực người dùng vì nhiều lý do:
- **Kém an toàn:** Việc gửi đi gửi lại **username/password** cho từng request đồng nghĩa rằng chỉ cần 1 trong các request đó để lộ thông tin và tin tặc sẽ có quyền truy cập tới tài khoản của bạn. Mặc dù HTTPs đã giảm thiểu mối nguy này ít nhiều nhưng đây vẫn không hẳn là điều mà chúng ta nên làm.
- **Không thân thiện:** Hình thức trên không những kém an toàn, nó còn gây tốn thời gian để thực hiện xác thực cho từng request. Chỉ thêm 1-2 bước xử lý, có thể dễ dàng kiến trang web của bạn thua xa các đối thủ cạnh tranh.

Vậy làm thế nào để xử lý vấn đề này? Tiếp theo chúng ta sẽ đi vào tìm hiểu Session Cookie.

## 2. Session Cookies
Để giải quyết vấn đề nêu trên, chúng ta sử dụng session và cookie để lưu trạng thái đăng nhập của người dùng. Trong đó:
* **Session** sẽ được lưu ở **server-side** trỏ tới người dùng hệ thống.
* **Cookies** sẽ được lưu ở **client-side** chứa một **access token** có thể sử dụng để so sánh với **sessionID**.

**Luồng hoạt động:** 
1. Người dùng gửi thông tin xác thực tới hệ thống. *(VD: **username, password,** v.v...)*
2. Hệ thống kiểm tra thông tin đăng nhập với dữ liệu lưu trong database.
3. Thông tin đăng nhập chính xác, hệ thống khởi tạo một **access token** độc nhất và gắn nó vào cookie gửi tới người dùng.
4. Từ các bước sau nếu người dùng tạo một request mới, trình duyệt sẽ gắn **cookies** tương ứng có chứa **access token** tạo trước đó.
5. Server sẽ kiểm tra **token** gửi đến và cấp quyền truy cập vào hệ thống.

![](https://images.viblo.asia/3a9b7afa-771b-4f60-b8e4-0c3996cd7bbd.png)

### Ưu/nhược điểm
* **Ưu điểm:**
    - Đơn giản, dễ cài đặt và sử dụng.
* **Nhược điểm:**
    - Server phải quản lý session người dùng.
    - Session cookies không thể sử dụng trên nhiều server backend khác nhau.
    - Không thể sử dụng với các ứng dụng non-browser. *(VD: Ứng dụng di động)*
    - Hiệu năng chậm: Hình thức đòi hỏi server phải quản lý và tìm kiếm và deserialize session cho mỗi request.

# II. API Token
## 1. Tổng quát về API Token
Session Cookie đã giải quyết phần nào các vấn đề gặp phải theo hình thức cũ nhưng không thể nói nó không có yếu điểm đặc biệt với các hệ thống lớn đòi hỏi mở rộng không ngừng. Để khắc phục các nhược điểm nêu trên, chúng ta có thể sử dụng API Token. Sau đây chúng ta sẽ đi vào tìm hiểu cách thức hoạt động của API Token và sao đó đi vào ví dụ cụ thể thông qua JWT.

**Luồng hoạt động:**
1. Người dùng gửi thông tin xác thực tới hệ thống. *(VD: **username, password**, v.v...)*
2. Hệ thống kiểm tra thông tin đăng nhập với dữ liệu lưu trong database.
3. Thông tin đăng nhập chính xác, hệ thống khởi tạo một **token** độc nhất và gắn nó vào response gửi tới người dùng.
4. Từ các bước sau nếu người dùng tạo một request mới sẽ thực hiện gửi đính kèm **API token** nhận được trước đó.
5. Server sẽ kiểm tra token gửi đến và cấp quyền truy cập vào dữ liệu được bảo vệ.

![](https://images.viblo.asia/4eb1d70a-3e68-4bc0-a086-81b91dd9b57f.png)

Nhìn qua trên luồng hoạt động thì có vẻ token-base authentication không khác là mấy so với sử dụng session cookie nhỉ? Với một hệ thống nhỏ thì có lẽ sử dụng session cookie vẫn là một lựa chọn tốt. Nhưng nếu chúng ta bắt đầu mở rộng hệ thống xử lý trên nhiều server, ta sẽ bắt đầu thấy các điểm nổi bật của **API token**.

Giả sử nếu chúng ta muốn mở rộng hệ thống và thực hiện tách nhỏ ra một authenticate server riêng và server quản lý resources riêng, lúc này session cookies là không đủ và luồng hoạt động cho **API token** sẽ trở thành:

![](https://images.viblo.asia/76c72c0d-0aa5-44f2-94ea-27dffccc58a0.png)

## 2. JWT là gì?
### Giới thiệu
Để hiểu rõ hơn về API Token, sau đây chúng ta sẽ đi vào tìm hiểu một thể hiện cụ thể thông qua **JSON Web Token**.

**JSON Web Token** (JWT) là một hệ thống token-based authentication. Nó là một tiêu chuẩn (**RFC 7519**) dùng để định nghĩa hình thức truyền dữ liệu một cách bảo mật giữa các bên sử dụng một JSON object.
### Cấu trúc JWT
Ở dạng nén của Json object, **JWT** bao gồm ba phần được ngăn cách nhau bởi dấu chấm "." bao gồm:
1. **HEADER**
2. **PAYLOAD**
3. **SIGNATURE**

**VD:**

![](https://images.viblo.asia/0238d61f-6f7a-4581-b874-6408999dd1dc.png)

* **HEADER**: Bao gồm hai phần:
    * **Thuật toán mã hóa.**
    * **Loại token.**
   
   ![](https://images.viblo.asia/8df400b0-ec49-44cb-b062-d10e0da8491d.png)


* **PAYLOAD**: Bao gồm các thông tin về người dùng:
    * **Registered**: Đây là các thông tin không bắt buộc nhưng được khuyến nghị sử dụng định nghĩa trong mục 4.1 của RFC 7519.
    * **Public**: Đây là các thông tin tự định nghĩa bởi người sử dụng JWTs. Nhưng các thông tin này vẫn nên tránh trùng lặp với tên chuẩn của JWTs.
    * **Private**: Đây là các thông tin được tạo để chia sẻ giữa các bên sử dụng và không phải là Registered hay Public.

![](https://images.viblo.asia/03d90352-8fce-4820-b863-b31fa3c001b5.png)

* **SIGNATURE**: Sử dụng để xác thực JWT không bị biến đổi trong quá trình sử dụng.
        * Để tạo chữ ký điện tử này ta kết hợp sử dụng header, payload và một khóa bí mật chạy qua thuật toán mã hóa.

![](https://images.viblo.asia/6ad3a348-5a84-4cb7-ab1c-20b826a4123a.png)

Kết hợp tất cả với nhau ta sẽ thu được **JWT**, các thông tin cần thiết để xác thực được gói gọn gàng trong một token. Nếu mọi người muốn thử nghiệm với các token này jwt.io cung cấp một công cụ thú vị để làm điều đó.
   
### Ưu/Nhược điểm
* **Ưu điểm:**
    - Tính mở rộng: Không giống session được quản lý riêng rẽ, **JWT** có thể hoạt động xuyên suốt nhiều server, cho phép dễ dàng mở rộng hệ thống.
    - Có thể sử dụng với các ứng dụng non-browser. *(VD: Ứng dụng di động)*
    - Hiệu năng: mỗi **JWT** là một gói đầy đủ các thông tin xác thực, thời gian hết hạn, v.v... được lưu trữ ngay phía client-side. Do đó, hệ thống không phải tra cứu quản lý các token như đối với session cookie cho phép cải thiện hiệu năng.
    - Bảo mật: JWT được mã hóa đảm bảo JSON object không bị thay đổi trong suốt quá trình sử dụng.
* **Nhược điểm:**
    - Kích cỡ: So với session cookie, **JWT** lớn hơn rất nhiều vì nó bao gồm đầy đủ thông tin xác thực, thời gian hết hạn, v.v... Đây cũng chính là lý do tên các claims thường chỉ bao gồm 3 ký tự để giữ token gọn nhẹ nhất có thể. Có thể hiểu đơn giản rằng **JWT** hoán đổi giữa kích cỡ và tốc độ.
    - JWT có thể bị tấn công bởi **CSRF** hay **XSS**. Để chống lại các hình thức tấn công này, nhà phát triển có thể thêm các bước để đảm bảo request được gửi đến từ các trang web an toàn.

# Tổng kết
Vậy thông qua bài viết trên chúng ta đã biết được cách xác thực người dùng sử dụng HTTP truyền thống và sử dụng JWT. Tuy nhiên, ở đây mình cũng muốn nhấn mạnh rằng HTTP hoàn toàn là một lựa chọn khả thi để xác thực người dùng nếu website của bạn không đòi hỏi mở rộng hay có quy mô lớn bởi tính đơn giản gọn nhẹ dễ cài đặt của hình thức HTTP. Nếu mọi người có câu hỏi gì xin hãy comment ở bên dưới.

# References
1. https://jwt.io/
2. https://tools.ietf.org/html/rfc7519
3. https://www.iana.org/assignments/jwt/jwt.xhtml