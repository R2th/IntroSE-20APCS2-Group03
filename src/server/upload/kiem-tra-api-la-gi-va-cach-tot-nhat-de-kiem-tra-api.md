# 1. API là gì?
Application Programming Interface (Giao diện lập trình ứng dụng) - API. API là một lớp trung gian trong hệ thống phần mềm chịu trách nhiệm truyền dữ liệu giữa nguồn dữ liệu và Giao diện người dùng đồ họa (GUI) mà người dùng nhìn thấy. Nói cách khác, API là lớp nghiệp vụ của phần mềm tạo ra kết nối giữa lớp trình bày và lớp dữ liệu.
![](https://images.viblo.asia/b83eee70-99c9-46e7-a502-4ecc387fff15.png)

Kiểm thử API tập trung vào những gì được gọi là lớp kinh doanh của ứng dụng, nghĩa là các phương thức kiểm tra sẽ hoàn toàn khác so với kiểm tra GUI tiêu chuẩn. Vì vậy, thay vì sử dụng bàn phím và nhấp chuột làm đầu vào tiêu chuẩn, trong thử nghiệm API, chúng ta có thể cần sử dụng một số mẫu thử nghiệm khác, sử dụng một số công cụ kiểm tra hoặc mã riêng của chúng tôi để kiểm tra các API này đang thử nghiệm. Bạn cần xác thực các phản hồi (đầu ra) từ các API này để xác minh rằng chúng có hoạt động hay không. Để biết những gì cần tìm, bạn sẽ cần biết phản hồi mà API tạo ra.

Một phản hồi API sẽ là:

- Thông báo trạng thái / Giá trị Boolean (ví dụ: thành công / lỗi hoặc đúng / sai, v.v.) sẽ hiển thị trạng thái của lệnh gọi API. Nó cũng sẽ hoạt động như một cờ (đúng / sai), trên đó lớp Trình bày hoặc lớp Cơ sở dữ liệu sẽ được cập nhật.
- Một tập hợp dữ liệu sẽ được chuyển cho API tiếp theo hoặc GUI hoặc Cơ sở dữ liệu.
# 2. Kiểm tra những gì trong API
- Chức năng: Đây là nơi bạn tìm kiếm phản hồi API dựa trên đầu vào được cung cấp. Kiểm tra xem phản ứng thực tế phù hợp với phản ứng dự kiến.
- Hiệu suất: Tại đây, bạn cần lưu ý về thời gian phản hồi API . Đôi khi, phải mất một thời gian dài để nhận được phản hồi từ API. Điều này có thể là do vấn đề về hiệu năng liên quan đến thiết kế API.
- Bảo mật: Kiểm tra xem bất kỳ dữ liệu nhạy cảm nào truyền vào API đã được mã hóa hay chưa, là một phần của thử nghiệm này. 

Ví dụ: bạn có thể muốn kiểm tra API chịu trách nhiệm tạo báo cáo bảng điều khiển trên trang chủ. Để truy cập API bảng điều khiển, bạn có thể cần một mã thông báo đã được tạo như một phản hồi từ API đăng nhập đã chạy trước đó. Mã thông báo này phải ở định dạng được mã hóa. Bạn cũng có thể kiểm tra xem có mã hóa HTTPS nào không.
- Độ tin cậy: Bạn có thể kiểm tra xem API có cung cấp cho bạn phản hồi nhanh chóng mỗi khi bạn kiểm tra các cấu hình khác nhau không (ví dụ: môi trường khác nhau, đăng nhập người dùng khác nhau, v.v.) Bạn có thể kiểm tra xem đầu ra có trả về bất kỳ lỗi xử lý ngoại lệ nào không, lỗi hết thời gian, v.v. đến độ tin cậy của API. Một phần của kiểm tra độ tin cậy, bạn cũng có thể kiểm tra xem dữ liệu phản hồi có được cấu trúc đúng không. Thông thường phản hồi API sẽ được cấu trúc theo định dạng JSON hoặc XML.
- Kiểm tra tiêu cực: Ở đây mục đích là cung cấp dữ liệu đầu vào không hợp lệ cho API và kiểm tra cách dữ liệu đầu ra hoạt động. API nên xử lý các lỗi đúng cách. Nó sẽ cung cấp các thông báo lỗi hợp lệ, có ý nghĩa cho mọi điều kiện đầu vào tiêu cực. Bạn cũng có thể kiểm tra hành vi của API nếu dữ liệu đầu vào trống được sử dụng cho một số đối số. Bạn cũng có thể xem bất kỳ cờ không sử dụng, các giá trị đầu ra bị thiếu / trùng lặp cho các dữ liệu đầu vào khác nhau.
# 3. Trường hợp nào cần kiểm tra API?
## Các bước kiểm tra
### URL API

Đây là yêu cầu HTTP để gọi một API cụ thể. Lấy ví dụ, một API cho chức năng đăng nhập. Nếu cấu trúc URL của nó là Mobile/User/Login và URL tên miền của bạn là http://domain.com, thì URL API để gọi API từ trình duyệt / công cụ sẽ là http://domain.com/Mobile/User/Login

### Phương thức HTTP

Trong trường hợp API RESTful, họ sử dụng các phương thức HTTP để phân loại API dựa trên loại cuộc gọi được thực hiện với máy chủ. Ví dụ: POST, GET,... Phương thức POST gửi dữ liệu đến máy chủ trong khi phương thức GET lấy dữ liệu từ máy chủ.

### Payload

Điều này xác định cấu trúc hoặc mô hình dữ liệu đầu vào sẽ được cung cấp cho API. Ví dụ: nếu chúng tôi sử dụng API đăng nhập ở trên, chúng tôi có thể sử dụng cấu trúc dữ liệu bên dưới:

{

username:string

password:string

device_id:string

object_id:string

device_token:string

mobile_os:string

app_language:string
}

### Yêu cầu dữ liệu mẫu

Mẫu yêu cầu chứa dữ liệu đầu vào thực tế được truyền cho API dưới dạng tải trọng. Bạn có thể có nhiều trường hợp thử nghiệm như bạn muốn dựa trên dữ liệu mẫu này. Đối với kịch bản đăng nhập ở trên, dữ liệu mẫu có thể trông như thế này:

{

“device_id”:”F3649737-B25D-43BA-A212-71192″,

“object_id”:””,

“device_token”:”f4icqBpC04k:APA91bFFYp8MKaetZKiAJ,

“mobile_os”:”iOS”,

“App_language”:”en”

}

## Kết quả mong muốn
### Mã phản hồi

Điều này thể hiện mã phản hồi của yêu cầu API. 200 OK phải là Mã phản hồi của yêu cầu API thành công. Có các mã Phản hồi khác như 400 Yêu cầu kém (Bad request), Không được phép 401, Cấm 403, Không tìm thấy 404, Lỗi Máy chủ nội bộ 500, v.v ... Sẽ rất hữu ích nếu bạn có thể ghi lại Mã phản hồi của API từ bảng điều khiển đầu ra của kiểm tra API dụng cụ.

### Phản hồi tin nhắn kết quả
Đối với mỗi đầu vào, có thể có các thông báo thành công đầu ra API khác nhau. Bạn cần tìm ra các thông điệp phản hồi tương ứng và ghi lại chúng trong các trường hợp thử nghiệm của bạn. Một số thông báo phổ biến cho API đăng nhập sẽ là: SUCCESS, INACTIVE_ACCOUNT, INVALID_PASSWORD, USER_NOT_FOUND, INVALID_DEVICE_ID, ERROR

### Mẫu kết quả trả lời
Đây là dữ liệu đầu ra cho mỗi kết hợp dữ liệu đầu vào. Bạn sẽ cần dữ liệu này để có thể xác thực dựa trên đầu ra thực tế từ kết quả API. Một mẫu cho hoạt động Đăng nhập thành công được đưa ra dưới đây:
{

“result”: “SUCCESS”,

“data”: {

“id”: 7093,

“company_id”: 0,

“customer_id”: “181055033”,

“user_type”: 0,

“username”: “user@company.com”,

“first_name”: “Test”,

“last_name”: “User”,

“app_language”: “en”,

“mobile_os”: “iOS”,

“email”: “user@company.com”,

“phone”: “917837322”,

“secondary_phone”: “0”,

“address”: “”,

“created_at”: “2018-10-01”,

“updated_at”: “2018-10-01”,

“last_login”: “2018-10-01”,

}}
# 4. Tips để kiểm tra API
- Hiểu từng API được sử dụng để làm gì trong ứng dụng. Nếu không hiểu việc sử dụng một API cụ thể, sẽ rất khó để ghi lại đủ các trường hợp thử nghiệm cho nó.
- Khi viết các trường hợp thử nghiệm cho các điều kiện đầu vào khác nhau, hãy sử dụng các kỹ thuật thử nghiệm như Phân tích giá trị biên và Phân vùng lớp tương đương.
- Tài liệu chính xác các tham số đầu vào và phản hồi của API cho từng trường hợp thử nghiệm để việc kiểm tra có thể được thực hiện theo cách có cấu trúc. Nó cũng quan trọng là bạn đặt  các trường hợp thử nghiệm của mình theo cách mà cái này theo cái kia. Ví dụ, để kiểm tra các hoạt động CRUD, bạn cần viết các trường hợp kiểm tra theo thứ tự Tạo, Cập nhật và Xóa.

Bài viết được translate từ nguồn: https://blog.testlodge.com/api-testing/ :):)