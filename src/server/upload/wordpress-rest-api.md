# RESTful Web Service là gì?
RESTful  hiểu đơn giản là các ràng buộc và quy ước để thiết kế Web Services, chú trọng vào tài nguyên của hệ thống, bao gồm các trạng thái của tài nguyên được định nghĩa như thế nào và được truyền tải  qua HTTP
REST tuân thủ 4 nguyên tắc thiết kế cơ bản:
1. Sử dụng các phương thức HTTP một cách rõ ràng
2. Phi trạng thái
3. Hiển thị cấu trúc thư mục như các URIs
4. Truyền tải Json, xml hoặc cả 2

REST đặt ra 4 phương thức:
1. POST : để tạo một tài nguyên trên máy chủ
2. GET : để truy xuất một tài nguyên, sử dụng GET
3. PUT : Để thay đổi trạng thái một tài nguyên, hoặc để cập nhật nó
4. DELETE : Huỷ hoặc xoá 1 tài nguyên 

# Wordpress REST API
Wordpress REST API cung cấp API endpoints cho phép developer có thể tương tác với các website của mình bằng cách gửi và nhận dữ liệu JSON . Khi bạn gửi nội dung hay tạo một request tới API, thì bạn sẽ nhận lại 1 dữ liệu kiểu JSON. Điều này cho phép nhà phát triển có thể CRUD từ các thiết bị khác ( app android, ios ... 

# Tại sao sử dụng Wordpress REST API
Wordpress REST API giúp cho develop dễ dàng hơn tương tác với hệ thống thay vì phải tạo một page để thực hiện ngay trên web. Bạn có thể tạo plugin để cung cấp toàn bộ trải nghiệm admin cho Wordpress, hay tạo tạo các trải nghiệm người dùng khác.

Wordpress REST API có thể thay thế cho việc dùng admin-ajax API trong core của Wordpress. Với REST API bạn có thẻ dễ dàng tạo cấu trúc cho việc lấy data theo ý của bạn. AJAX có thể được sử dụng một cách dễ dàng hơn và thân thiện với người dùng hơn.

# Các khái niệm chính
Để có thể bắt đầu xử dụng Wordpress Rest API chúng ta sẽ phải nắm được các khái niệm sau
1. Routes/Endpoints
2. Requests
3. Responses
4. Schema
5. Controller Classes

Mỗi khái niệm này đóng vai trò quan trọng trong việc sử dụng và hiểu về Wordpress REST API. Cùng tìm hiểu sâu hơn 1 chút nhé: 

## Routes & Endpoints
Route: trong Wordpress REST API là một ỦI có thể ánh xạ tới các phương thức HTTP khác nhau. Ánh xạ của một phương thức HTTP riêng lẻ tới  một route được gọi là "endpoints" 

## Requests
Một trong những lớp chính trong cơ sở hạ tầng **Wordpress REST API** là **WP_REST_Request**. Lớp này được sử dụng để lưu trữ và truy xuất thông tin cho yêu cầu hiện tại; các yêu cầu có thể được gửi từ xa qua **HTTP** nhưng cũng có thể được thực hiện nội bộ từ **PHP** với **WordPress**. Các đối tượng **WP_REST_Request** được tạo tự động cho bạn bất cứ khi nào bạn thực hiện yêu cầu **HTTP** đến tuyến đã đăng ký. Dữ liệu được chỉ định trong yêu cầu sẽ xác định phản hồi nào bạn nhận được từ **API**. Có rất nhiều điều gọn gàng bạn có thể làm bằng cách sử dụng lớp yêu cầu. 

## Responses
Phản hồi là dữ liệu bạn nhận được từ **API**. Lớp **WP_REST_Response** cung cấp cách tương tác với dữ liệu phản hồi được trả về bởi các điểm cuối. Phản hồi có thể trả về dữ liệu mong muốn và chúng cũng có thể được sử dụng để trả về lỗi.

## Schema
Mỗi endpoint yêu cầu và cung cấp các cấu trúc dữ liệu hơi khác nhau và các cấu trúc đó được xác định trong **Schema API**. Lược đồ cấu trúc dữ liệu API và cung cấp một danh sách toàn diện về tất cả các thuộc tính mà **API** có thể trả về và nhập các tham số mà nó có thể chấp nhận. **Schema** cũng cung cấp các lợi ích bảo mật cho **API**, vì nó cho phép chúng tôi xác thực các yêu cầu được thực hiện đối với **API**. 

## Controller Classes
Như bạn có thể thấy, **API WordPress REST** có rất nhiều bộ phận chuyển động mà tất cả cần phải làm việc cùng nhau. Các lớp điều khiển mang tất cả các yếu tố này lại với nhau ở một nơi duy nhất. Với lớp trình điều khiển, bạn có thể quản lý việc đăng ký các tuyến & điểm cuối, xử lý các yêu cầu, sử dụng lược đồ và tạo các phản hồi **API**.

# Tobe continue ...
Bài này giới thiệu sơ qua các khái niệm về REST trên Wordpress, ở bài tiếp theo sẽ hướng dẫn các bạn làm 1 ứng dụng nho nhỏ khi dùng laravel để làm phần frontend và wordpress làm admin quản trị.