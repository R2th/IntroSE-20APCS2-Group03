Sau 2 bài viết, chúng ta đã hiểu thế nào là client và server, cách chúng sử dụng HTTP để nói chuyện với nhau và việc xác định định dạng dữ liệu để hiểu nhau. Có lẽ trong đầu chúng ta sẽ có câu hỏi: Làm thế nào để server biết client mà mình đang nói chuyện là ai???

**I. Xác thực danh tính trong thế giới ảo**

Giả sử bạn đã đăng ký 1 account ở **1 website**, 2 thông tin không thể thiếu là username và password. Những thông tin này còn được gọi là **“Giấy thông hành” – Credentials.** Và những lần sau, để vào website bạn cần đưa ra cái “Giấy thông hành” đó.
Trong API, có rất nhiều kỹ thuật để xử lý phần Authentication này. Chúng được gọi là **Authentication schemes.**

**II. Basic Authentication**

Cái ví dụ vừa nói ở trên là cái form cơ bản nhất của Authentication, tên gọi chuẩn là Basic Authentication, hay được viết tắt là “Basic Auth”. Basic Auth thì chỉ yêu cầu username và password thôi. Client nhập 2 thông tin trên rồi gửi chúng qua **HTTP header cho server**  , đây gọi là quá trình xin phép **– Authorization.**

![](https://images.viblo.asia/8d512e21-f881-4f27-9f6d-7767b682b6d1.gif)

Khi server nhận được 1 request, nó sẽ soi vào **Authorization header** và so sánh thông tin đó với thông tin Credential mà chúng cất giữ ở DB. Nếu đúng, server sẽ chấp thuận request của client và trả thêm các thông mà client yêu cầu ở phần Body. Nếu không đúng, server sẽ trả lại mã code 401, báo hiệu rằng quá trình xác thực fail và yêu cầu bị từ chối.

Mặc dù **Basic Auth** là 1 kỹ thuật thường xuyên được sử dụng nhưng trên thực tế việc nó dùng cùng 1 username và password để truy cập đến API và quản lý tài khoản là không lý tưởng. Nó giống như việc 1 khách sạn đưa cho khách cả chùm chìa khóa của cả khách sạn chứ không phải là chìa khóa của 1 phòng.

**III. API Key Authentication**

**API Key Authentication là 1 kỹ thuật giúp xử lý điểm yếu của mô hình Basic Auth ở phía trên**. Thay vì đưa cả chùm chìa khóa cho khách hàng, chủ khách sạn chỉ đưa cho khách hàng đúng 1 (Key) chìa khóa phòng của họ. Key thông thường là 1 dãy dài số và chữ, là duy nhất và khác biệt với password.

Khi Client xác thực với API Key, server sẽ biết để đồng ý cho client truy cập tới data. Vậy thì API Key sẽ nằm ở vị trí nào trên request. 

Có thể chúng ta sẽ nghĩ là Key này chắc cũng nằm ở header giống như Basic Auth phía trên. Ơ không, nó nằm ở vị trí mà người lập trình mong muốn vì không có chuẩn nào cả. :v Có thể đặt nó trên header, trên URL (http://example.com?api_key=my_secret_key), hoặc là ở Body. Và cho dù có đặt chúng ở đâu đi chăng nữa, chúng cũng sẽ có cùng 1 tác dụng.

**Vậy công cụ sử dụng ở đây là gì ?** Là ***POSTMAN*** 

**IV . Ưu, nhược điểm của Postman**

Postman là 1 công cụ để test API của cty Postdot Technologies được bắt đầu phát triển từ năm 2012. Hiện tại Postman có 3 phiên bản: Postman, Postman Pro (2016) và Postman Enterprise (2017). Mình mới sử dụng Postman phiên bản free nên mình chỉ giới thiệu phần này.

Ưu điểm:

– Dễ sử dụng, hỗ trợ cả chạy bằng UI và non-UI.

– Hỗ trợ viết code cho assert tự động bằng Javascript.

– Hỗ trợ cả RESTful services và SOAP services.

– Có chức năng tạo API document.

Nhược điểm:

– Những bản tính phí mới hỗ trợ những tính năng advance: Làm việc theo team, support trực tiếp…

**V. Cài đặt Postman**

Download tại địa chỉ: https://www.getpostman.com/

**VI. Các thành phần chính của Postman**

Giao diện chung:

![](https://images.viblo.asia/e7aa1410-ee7b-4767-a71f-ce7b2c67cbaf.png)

**1.  Settings:** chứa các thông tin về cài đặt chung.

Thông tin Account: dùng để Login, logout và sync data.

Settings tùy chỉnh: themes, shortcut, format…

Import data từ ngoài vào

**2 . Collections:** lưu trữ thông tin của các API theo folder hoặc theo thời gian.

**3. API content:** hiển thị nội dung chi tiết API và các phần hỗ trợ giúp thực hiện test API. Đây là phần mà tester phải làm việc nhiều nhất.

Trong phần này gồm có 3 thành phần chính:

**Environments:** Chứa các thông tin môi trường. Ví dụ: mình làm 1 dự án nhưng có 3 môi trường khác nhau: dev, staging và product. Có phần này, mình có thể nhanh chóng đổi sang môi trường cần test mà không phải mất công đổi URL của từng request. 

**Request:** Phần chứa các thông tin chính của API. Có thể đọc lại bài trước

**Response:** Chứa các thông tin trả về sau khi Send Request.