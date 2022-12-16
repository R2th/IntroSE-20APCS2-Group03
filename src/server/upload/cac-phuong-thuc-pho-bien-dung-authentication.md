##  1.Basic Authentication
**Định nghĩa**
HTTP Basic authentication yêu cầu client cung cấp username và password mỗi lần gọi request.
Hiểu 1 cách đơn giả thì nó là phương thức để xác thực người dùng khi truy cập tài nguyên thông qua HTTP(s)
Thông tin đăng nhập được gửi kèm theo mỗi request
Cấu trúc header sẽ có thêm : **Authorization**: `Basic <Base 64 endcode {username:password}>`

**Cách hoạt động:** 

![image.png](https://images.viblo.asia/61532f7e-9628-45d9-8254-03b165dba3ac.png)

**Ưu điểm**
- Đơn giản, do đó được hầu hết các trình duyệt, webserver (nginx, apache,...) hỗ trợ. Bạn có thể dễ dàng config cho webserver sử dụng Basic Auth với 1 vài dòng config.
- Dễ dàng kết hợp với các phương pháp khác. Do đã được xử lý mặc định trên trình duyệt và webserver thông qua truyền tải http header, các bạn có thể dễ dàng kết hợp phương pháp này với các phương pháp sử dụng cookie, session, token,...

**Nhược điểm:**
- Username/password dễ bị lộ. Do mỗi request đều phải truyền username và password nên sẽ tăng khả năng bị lộ qua việc bắt request, log server,...
- Không thể logout. Vì việc lưu username, password dưới trình duyệt được thực hiện tự động và không có sự can thiệp của chủ trang web. Do vậy không có cách nào logout được người dùng ngoại trừ việc tự xóa lịch sử duyệt web hoặc hết thời gian lưu của trình duyệt.
- Không thân thiện với người dùng. Việc hiển thị hộp thoại đăng nhập cũng như thông báo lỗi của trình duyệt, như các bạn đã biết là vô cùng nhàm chán, không chứa đựng nhiều thông tin cho người dùng.


## 2.Session-based Authentication
Session-based authentication là cơ chế đăng nhập người dùng dựa trên việc tạo ra session của người dùng ở phía server. 
Sau quá trình xác thực người dùng thành công (username/password,...) thì phía server sẽ tạo và lưu ra một session chứa thông tin của người dùng đang đăng nhập và trả lại cho client session ID để truy cập session cho những request sau.

**Nơi lưu trữ: **
- Tại server: Lưu dữ liệu của session trong database, file, ram,... và dùng Session ID để tìm kiếm.
- Tại client: Lưu Session ID trong bộ nhớ cookie, hoặc URL trang web, form field ẩn,...
- Truyền tải: Session ID sẽ xuất hiện trong các HTTP request tiếp theo trong Cookie (header Cookie: SESSION_ID=abc), URL (/profile?session_id=abc), body (form field ẩn),...

**Cách hoạt động:**

![image.png](https://images.viblo.asia/ddc2f0d3-7b7c-4b88-b6bc-19bb7e3d6e5e.png)

**Ưu điểm:**
- **Thông tin được giấu kín**: Client chỉ được biết tới Session ID thường là 1 chuỗi random không mang thông tin gì của người dùng, còn mọi thông tin khác của phiên đăng nhập hay người dùng hiện tại đều được lưu phía server nên cơ chế này giữ kín được thông tin của người dùng trong quá trình truyền tải.
- **Dung lượng truyền tải nhỏ**: Bởi vì tự thân Session ID không mang theo thông tin gì, thông thường chỉ là một chuỗi ký tự unique khoảng 20-50 ký tự, do vậy việc gắn Session ID vào mỗi request không làm tăng nhiều độ dài request, do đó việc truyền tải sẽ diễn ra dễ dàng hơn.
- **Không cần tác động client**: Theo mình thì để sử dụng cơ chế session này bạn chủ yếu chỉ cần sửa phía server. Client mà cụ thể là browser hầu như không cần phải xử lý gì thêm bởi đã được tích hợp tự động (đối với cookie), hoặc response trả về của server đã có sẵn (đối với session ID ở URL hoặc hidden form)
- **Fully-controlled session**: Tính chất này có thể cho phép hệ thống quản trị TẤT CẢ các hoạt động liên quan tới phiên đăng nhập của người dùng như thời gian login, force logout,...

**Nhược điểm:**
- **Chiếm nhiều bộ nhớ:** Với mỗi phiên làm việc của user, server sẽ lại phải tạo ra một session và lưu vào bộ nhớ trên server. Số data này có thể còn lớn hơn cả user database của bạn do mỗi user có thể có vài session khác nhau. Do vậy việc tra cứu đối với các hệ thống lớn nhiều người dùng sẽ là vấn đề.
- **Khó scale**: Vì tính chất stateful của việc lưu session data ở phía server, do đó bạn sẽ khó khăn hơn trong việc scale ngang ứng dụng, tức là nếu bạn chạy ứng dụng của bạn ở 10 máy chủ, hay 10 container, thì 1 là bạn phải dùng chung chỗ lưu session, 2 là nếu không dùng chung bộ nhớ session thì phải có giải pháp để ghi nhớ user đã kết nối tới server nào của bạn. Nếu không rất có thể chỉ cần ấn refresh thôi, user kết nối với server khác khi cân bằng tải là sẽ như chưa hề có cuộc login ngay.
- **Phụ thuộc domain**: Vì thường sử dụng cookie, mà cookie lại phụ thuộc vào domain, do vậy khả năng sử dụng phiên đăng nhập của bạn sẽ bị giới hạn ở đúng domain được set cookie. Điều này không phù hợp với các hệ thống phân tán hoặc tích hợp vào ứng dụng bên thứ 3.
- **CSRF**: Nói nôm na là Session ID thường được lưu vào Cookie, và cookie mới là thứ dễ bị tấn công kiểu này. Vì cookie được tự động gắn vào các request tới domain của bạn. Ví dụ:
User vừa login vào my-bank.com và được set cookie: session_id=123
User vào trang web taolahacker.com xem tut của mình
Trên taolahacker.com mình ngầm gửi 1 request ajax tới domain my-bank.com.
Vì browser tự động thêm cookie session_id=123 vào request ajax trên, do vậy request của mình có thể thao tác mọi thứ NHƯ USER

## 3.Token-based Authentication (Bearer Authentication) 
Token-based Authentication là cơ chế đăng nhập người dùng dựa trên việc tạo ra token - một chuỗi ký tự (thường được mã hóa) mang thông tin xác định người dùng được server tạo ra và lưu ở client. Server sau đó có thể không lưu lại token này.

**Nơi lưu trữ**: 
- Tại server: Thường là không cần lưu.
- Tại client: Ứng dụng client (javascript, mobile,...) phải tự lưu token trong các bộ nhớ ứng dụng, local storage, cookie,...
- Truyền tải: Token sẽ xuất hiện trong các HTTP request tiếp theo trong Authorization header (Authorization: Bearer abc), Cookie (header Cookie: token=abc), URL (/profile?token=abc), body (ajax body, field),...

**Cách hoạt động**:

![image.png](https://images.viblo.asia/3dde35c7-f3d6-4ad6-97e9-6084c4546073.png)

**Ưu điểm:**
- **Stateless**: Bởi vì token thường có tính chất self-contained, do vậy server không cần lưu thêm thông tin gì về token hay map giữa token và người dùng. Do vậy đây là tính chất quan trọng nhất, phục vụ cho việc scale ứng dụng theo chiều ngang khi không cần quan tâm tới việc bạn sẽ sinh ra token ở đâu và verify token ở đâu.
- **Phù hợp với nhiều loại client**: Nên nhớ, cookie là một concept được các browser áp dụng tự động, còn với các client sử dụng Web API như mobile, IoT device, server,... thì việc sử dụng cookie lại rất hạn chế. Sử dụng token trong header hay URL,... sẽ dễ dàng hơn cho client trong việc lưu lại token và truyền tải token.
- **Chống CSRF**: Do việc sử dụng token phải được client xử lý từ việc lưu tới truyền tải, do vậy sử dụng token (mà không dùng cookie) sẽ phòng chống được các trường hợp tấn công như với trường hợp session/cookie.
- **Không bị giới hạn bởi domain**: Đây là tính chất giúp các hệ thống hiện đại có sự tham gia của bên thứ 3 hoạt động dễ dàng hơn khi không bị giới hạn chỉ ở domain của hệ thống đăng nhập.


**Nhược điểm:**
- **Khó quản lý đăng xuất**: Bởi vì server không lưu thông tin gì về token hay session của user, do đó điều khó kiểm soát nhất chính là việc đăng xuất. Và vì việc kiểm tra token chỉ dựa vào thông tin trên token, do vậy sẽ khó để ứng dụng của chúng ta vô hiệu hóa một token vẫn còn hiệu lực.
- **Phức tạp phần client**: Cơ chế sử dụng token thường yêu cầu client phải có xử lý liên quan tới lưu token, gửi token, do vậy sẽ không phù hợp với những website kiểu cũ, sử dụng nhiều server render html và phần javascript hạn chế.
- **Thông tin dễ lộ**: Khác với session, thông tin về phiên đăng nhập của người dùng có trên token và được lưu phía client, do vậy sẽ có các nguy cơ liên quan tới lộ thông tin trong token trong quá trình lưu trữ, truyền tải,... Chính vì vậy, thông thường người ta chỉ lưu 1 số thông tin thiết yếu như user_id, username mà không lưu những thông tin nhạy cảm như password vào token.
- **Dung lượng truyền tải lớn**: Thường thì 1 token sẽ dài hơn session ID khá nhiều, mà token lại được gửi với mỗi request, do vậy độ dài request sẽ tăng lên, do đó băng thông truyền tải cũng sẽ cần phải tăng theo. Tuy nhiên, đây chỉ là một điểm hạn chế nhỏ so với những lợi ích nó mang lại.


## 4. OAuth (2.0)
OAuth bao gồm bốn vai trò khác nhau:
- **Resource Server**: REST API là một ví dụ, một máy chủ HTTP nơi người dùng có thể tạo, sửa đổi hoặc xóa các bản ghi, tài liệu hoặc tệp.

- **Resource Owner**: Duy trì quyền sở hữu tài nguyên mà người dùng đã tạo hoặc sửa đổi trên máy chủ và người ủy quyền cho ứng dụng bên thứ 3 truy cập vào tài khoản của họ. Ứng dụng của bên thứ 3 có quyền truy cập hạn chế vào tài khoản của người dùng, dựa trên phạm vi của phạm vi của ủy quyền được cấp.

- **Client**: Ứng dụng bên thứ 3 muốn truy cập vào tài khoản người dùng. Trước khi nó có thể làm như vậy, máy chủ resource/authorization và chủ sở hữu tài nguyên phải ủy quyền cho yêu cầu đó. Mọi khách hàng phải được đăng ký với máy chủ authorization và sẽ được cung cấp cho nó thông tin xác thực duy nhất của riêng mình (client_id và client_secret) để xác thực riêng.

- **Authorization Server (thường là giống Resource Server)**: Đôi khi, ta có thể muốn rút ra khỏi máy chủ authorization từ máy chủ resource và triển khai nó như một phiên bản chuyên dụng, đặc biệt là trong các môi trường phân tán.

**Cách hoạt động**
1. Ứng dụng (website hoặc mobile app) yêu cầu ủy quyền để truy cập vào Resource Server (Gmail,Facebook, Twitter hay Github…) thông qua User
2. Nếu User ủy quyền cho yêu cầu trên, Ứng dụng sẽ nhận được ủy quyền từ phía User (dưới dạng một token string)
3. Ứng dụng gửi thông tin định danh (ID) của mình kèm theo ủy quyền của User tới Authorization Server
4.Nếu thông tin định danh được xác thực và ủy quyền hợp lệ, Authorization Server sẽ trả về cho Ứng dụng access_token. Đến đây quá trình ủy quyền hoàn tất.
5. Để truy cập vào tài nguyên (resource) từ Resource Server và lấy thông tin, Ứng dụng sẽ phải đưa ra access_token để xác thực.
6. Nếu access_token hợp lệ, Resource Server sẽ trả về dữ liệu của tài nguyên đã được yêu cầu cho Ứng dụng.

![image.png](https://images.viblo.asia/0aa5a974-9fc0-4ec3-84b7-fb51febd57fb.png)