Kiểm thử cổng thanh toán điện thử hiện nay rất phổ biến đối với tester làm việc trong môi trường startup hoặc là ngành công nghiệp dịch vụ. Dưới đây là một số test cases và test scenario mẫu cho các cổng thanh toán điện tử như vậy. 

# Kiểm thử cổng thanh toán điện tử là gì ? 
 Hệ thống cổng thanh toán là một dịch vụ ứng dụng thương mại điện tử chấp thuận thanh toán thẻ tín dụng cho mua hàng trực tuyến. Cổng thanh toán bảo vệ các chi tiết thẻ tín dụng bằng cách mã hóa thông tin nhạy cảm như số thẻ tín dụng, chi tiết chủ tài khoản, v.v. Thông tin này được truyền an toàn giữa khách hàng và thương gia và ngược lại.

Cổng thanh toán hiện đại cũng chấp thuận an toàn thanh toán qua thẻ ghi nợ, chuyển khoản ngân hàng điện tử, thẻ tiền mặt, điểm thưởng, v.v.

# Các loại cổng thanh toán điện tử 

Có 2 loại: 

* **Cổng thanh toán được lưu trữ (hosted payment gateway) **

Hệ thống cổng thanh toán được lưu trữ hướng khách hàng đi từ một trang web thương mại điện tử đến liên kết cổng trong quá trình thanh toán. Sau khi thanh toán xong, nó sẽ đưa khách hàng trở lại trang web thương mại điện tử. Ví dụ:  PayPal, Noche và WorldPay.

* **Cổng thanh toán dùng chung (Shared payment gateway):**

Trong một cổng thanh toán dùng chung, trong khi xử lý, khách hàng thanh toán được chuyển đến trang thanh toán và ở lại trên trang web thương mại điện tử. Khi chi tiết thanh toán được điền, quá trình thanh toán được tiến hành. Vì nó không rời khỏi trang web thương mại điện tử trong khi xử lý thanh toán, chế độ này dễ dàng và tốt hơn là, một ví dụ về cổng thanh toán được chia sẻ là eWay, Stripe.

# Các loại kiểm thử cho cổng thanh toán 

**Kiểm tra chức năng (Functional testing)** : Đây là hành động kiểm tra chức năng cơ bản của cổng thanh toán. Đó là để xác minh xem ứng dụng có hoạt động đúng  giống như xử lý các đơn đặt hàng, tính toán, thêm thuế VAT theo quốc gia, v.v.

**Tích hợp (Intergration)** : Kiểm tra tích hợp với dịch vụ thẻ tín dụng của bạn.

**Hiệu suất (Performance)** : Xác định các số liệu hiệu suất khác nhau như số lượng người dùng cao nhất có thể đến qua các cổng trong một ngày cụ thể ...

**Kiểm thử bảo mật (Security testing)** : Việc kiểm thử kĩ càng bảo mật đối với cổng thanh toán là vô cùng cần thiết. 
# 
# Cách kiểm thử Cổng thanh toán

Trước khi bạn bắt đầu kiểm thử, cần thực hiện công việc sau: 


* Thu thập dữ liệu kiểm tra thích hợp cho số thẻ tín dụng giả cho maestro, visa, master, v.v.
* Thu thập thông tin cổng thanh toán như Google Wallet, Paypal hoặc những thứ khác
* Thu thập tài liệu cổng thanh toán với mã lỗi
* Hiểu phiên và các tham số được truyền qua ứng dụng và cổng thanh toán
* Hiểu và kiểm tra lượng thông tin liên quan được truyền qua chuỗi truy vấn 
* Kiểm tra các cài đặt khác nhau của cổng thanh toán như định dạng tiền tệ, dữ liệu thu thập.

# Một số lưu ý  cho kiểm thử cổng thanh toán 

* Trong quá trình thanh toán, hãy cố gắng thay đổi ngôn ngữ cổng thanh toán
*  Sau khi thanh toán thành công, hãy kiểm tra tất cả các thành phần cần liên quan, cho dù nó có được truy xuất hay không
* Kiểm tra xem điều gì xảy ra nếu cổng thanh toán ngừng phản hồi trong khi thanh toán ( not responding) 
* Kiểm tra xem nếu hết phiên làm việc ( session ends) thì điều gì xảy ra 
*  Trong quá trình thanh toán, hãy kiểm tra xem back-end hoạt động như thế nào 
* Nếu quá trình thanh toán không thành công thì hệ thống xử lý như thế nào 
*  Trong cơ sở dữ liệu có lưu giữ chi tiết thông tin tín dụng không? 
* Trong quá trình thanh toán, kiểm tra các trang bảo mật và trang lỗi ( thanh toán lỗi....) 
* Kiểm tra cài đặt của popup, kiểm tra on/off của popup 
* Kiểm tra thanh toán thành công, mã thành công được gửi đến ứng dụng và hiển thị trang xác nhận cho người dùng 
*  Xác minh xem các quy trình giao dịch được thực hiện ngay lập tức hoặc xử lý được giao cho ngân hàng.
*  Sau khi giao dịch thành công kiểm tra xem có quay trở lại ứng dụng ngay hay không? 
* Kiểm tra tất cả định dạng và tin nhắn khi  thanh toán thành công
* Thông báo qua email cho chủ sở hữu cho bất kỳ giao dịch nào được thực hiện. Mã hóa nội dung của email 
* Kiểm tra định dạng số tiền có phù hợp với định dạng tiền tệ không 
* Kiểm tra xem mỗi tùy chọn thanh toán có thể chọn (click vào) không
* Kiểm tra xem với mỗi tuỳ chọn của phương thức thanh toán thì có phù hợp với đặc điểm của loại thanh toán đó không 
* Xác minh xem cổng thanh toán có mặc định cho tùy chọn thẻ ghi nợ / thẻ tín dụng mong muốn không


Bài viết được tham khảo từ nguồn: https://www.guru99.com/payment-gateway-testing-tutorial-with-sample-test-cases.html