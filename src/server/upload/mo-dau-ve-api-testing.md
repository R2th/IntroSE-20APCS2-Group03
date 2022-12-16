![](https://images.viblo.asia/fbc671e4-1c87-40a5-aef7-7d815a833580.png)
**I.API là gì? ​**

*Trên phương diện khách quan:*

API là cái cầu nối giữa client và server. Client ở đây có thể là máy tính, điện thoại sử dụng hệ điều hành khác nhau và được viết bằng những ngôn ngữ khác nhau. Tương tự, server back-end cũng được viết bằng các ngôn ngữ khác nhau. Để 2 bên có thể "giao tiếp" được với nhau chúng phải nói cùng 1 ngôn ngữ. Ngôn ngữ ấy chính là API (nó đóng vai trò như "phiên dịch viên" vậy).

*Trên phương diện tổng quát:*

API là cầu nối giữa 2 đối tượng (Object). Khi bạn làm việc, thường sẽ gặp trường hợp tích hợp với service của bên thứ 3, có khi 1 app phải tích hợp với rất nhiều bên. Để các bên có thể chia sẻ dữ liệu qua lại lẫn nhau thì chỉ có cách là tạo ra các public API để bên khác có thể kết nối vào.

Vậy thì liên quan thì đến kiểm thử, nó giao tiếp ở đâu thì kệ nó chứ, quan tâm làm gì ?!:(:(:(:( xem tiếp ha ... =]]

**II. Vì sao phải test API?**

1. Trong quá trình triển khai dự án, phần server và client làm độc lập với nhau nên có nhiều chỗ client chưa làm xong, mình không thể chờ client làm xong để test được dữ liệu mà test API bằng công cụ khác luôn (Postman, Jmeter) –> Lúc này việc test hoàn toàn không phụ thuộc gì vào client.
2. Kể cả khi client làm xong rồi, nếu mình test trên client mà thấy lỗi liên quan đến logic và dữ liệu thì cũng cần test thêm cả API để biết chính xác là server sai hay client sai –> fix lỗi sẽ nhanh hơn.
3. Khi làm hệ thống web services, dự án của mình chỉ viết API cho bên khác dùng, mình sẽ không có client để test giống như các dự án khác –> phải test API hoàn toàn.

Vậy thằng API "giao tiếp" với server & client như nào?

Trong website thì Protocol chính là HTTP – HyperText Transfer Protocol và nó là giao thức "giao tiếp" được dùng cho các API.

**III. HTTP hoạt động như thế nào?**

Việc "giao tiếp" của API với server & client qua HTTP xoay quanh 2 thứ: Request (Yêu cầu của client) và Response ( phản hồi của thằng server) =]]]]]

**1. Request:**

Một cái Request chuẩn bao gồm:
1. URL
2. Method
3. Headers
4. Body

Rồi, bây giờ mổ xẻ từng thứ ha:

1. URL: là cái link website/API cần để trả về kết quả mình cần đấy.
2. Method: là cái hành động client muốn tác động lên “resources”, và nó thường là động từ. Có 4 loại Method hay được dùng:
    *  **GET**: Yêu cầu server đưa lại resource , câu truy vấn sẽ được đính kèm vào đường dẫn HTTP request, không nên dùng GET request với dữ liệu quan trọng mà chỉ dùng để nhận dữ liệu, không có tính bảo mật). GET request có thể được cached, bookmark và lưu trong lịch sử của trình duyệt mà bị giới hạn về chiều dài (chiều dài của URL là có hạn).


    *  **POST**: Yêu cầu server cho tạo ra 1 resource mới, câu truy vấn sẽ được gửi trong phần message body của HTTP request, POST không thể cached, bookmark hay lưu trong lịch sử trình duyệt và cũng không bị giới hạn về độ dài.

    *  **PUT**: Yêu cầu server cho sửa / thêm vào resource đã có trên hệ thống. 

    *  **DELETE**: Yêu cầu server cho xóa 1 resourse. 

3. Headers: nơi chứa các thông tin cần thiết của 1 request nhưng end-users không biết có sự tồn tại của nó. Ví dụ: độ dài của request body, thời gian gửi request, loại thiết bị đang sử dụng, loại định dạng cái response mà client có đọc được.
4. Body: nơi chứa thông tin mà client sẽ điền. Giả sử bạn đặt 1 cái bánh pizza, thì thông tin ở phần body sẽ là: Loại bánh pizza, kích cỡ, số lượng đặt.

**2. Response:**

Thông tin trả về bao gồm:
1.  Status code
2. Headers
3.  Body

Tiếp tục mổ rồi xẻ nè:

1.  Status code: là một số nguyên 3 ký tự. Ký tự đầu tiên của mã hóa trạng thái định nghĩa hạng (loại) phản hồi và hai ký tự cuối không có bất cứ vai trò phân loại nào.

    Có 5 giá trị của ký tự đầu tiên:

    *  **1xx (100 – 199)**: Information responses / Phản hồi thông tin – Yêu cầu đã được chấp nhận và quá trình xử lý yêu cầu của bạn đang được tiếp tục.

    *  **2xx (200 – 299)**: Successful responses / Phản hồi thành công – Yêu cầu của bạn đã được máy chủ tiếp nhận, hiểu và xử lý thành công.

    *  **3xx (300 – 399):** Redirects / Điều hướng – Phía client cần thực hiện hành động bổ sung để hoàn tất yêu cầu.

    *  **4xx (400 – 499):** Client errors / Lỗi phía client – Yêu cầu không thể hoàn tất hoặc yêu cầu chứa cú pháp không chính xác. 4xx sẽ hiện ra khi có lỗi từ phía client do không đưa ra yêu cầu hợp lệ.

    *  **5xx (500 – 599):** Server errors / Lỗi phía máy chủ – Máy chủ không thể hoàn thành yêu cầu được cho là hợp lệ. Khi 5xx xảy ra, bạn chỉ có thể đợi để bên hệ thống máy chủ xử lý xong.

 Danh sách các Status-code đầy đủ có thể xem ở đây: 
 https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 
2.  Headers: giống với thằng số 3 của Request nà.
3. Body: đúng rồi, nó giống với thằng thứ 4 của Request luôn đấy =]]]



Tạm thời dừng ở đây nha, em sẽ quay lại sớm ^^