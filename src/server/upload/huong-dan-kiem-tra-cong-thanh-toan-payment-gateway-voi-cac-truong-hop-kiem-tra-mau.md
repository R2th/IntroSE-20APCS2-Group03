# 1. Kiểm tra cổng thanh toán là gì?
Payment gateway là kiểm tra 1 cổng thanh toán. Hệ thống cổng thanh toán là một dịch vụ ứng dụng thương mại điện tử chấp thuận thanh toán bằng thẻ tín dụng trong mua hàng trực tuyến. Cổng thanh toán bảo vệ các thông tin thẻ tín dụng bằng cách mã hóa các thông tin như số thẻ tín dụng, chi tiết chủ tài khoản, v.v. Thông tin này được truyền an toàn giữa khách hàng và người bán và ngược lại.

Cổng thanh toán hiện đại cũng chấp thuận thanh toán qua thẻ ghi nợ, chuyển khoản ngân hàng điện tử, thẻ tiền mặt, điểm thưởng, v.v.
# 2. Các loại hệ thống cổng thanh toán
![](https://images.viblo.asia/2a42d701-0ecc-4f92-a10f-1929e33cacb0.png)
## 2.1. Cổng thanh toán được lưu trữ (Hosted Payment Gateway):
Hosted Payment Gateway hướng khách hàng đi từ một trang web thương mại điện tử đến liên kết cổng trong quá trình thanh toán. Sau khi thanh toán xong, nó sẽ đưa khách hàng trở lại trang web thương mại điện tử. Đối với hình thức thanh toán này, bạn không cần id người bán ( VD: PayPal, Noche và WorldPay)
## 2.2. Cổng thanh toán dùng chung (Shared Payment Gateway):
Một share payment gateway, trong khi xử lý, khách hàng thanh toán được chuyển đến trang thanh toán và ở lại trên trang web thương mại điện tử khi chi tiết thanh toán được điền, quá trình thanh toán được tiến hành. Vì nó không rời khỏi trang web thương mại điện tử trong khi xử lý thanh toán, nên hình thức thanh toán này dễ dàng và tốt hơn (VD: eWay, Stripe).
# 3. Các loại thử nghiệm cho Payment Domain
## 3.1. Function testing:
Đó là hành động kiểm tra chức năng cơ bản của cổng thanh toán, để xác minh xem ứng dụng có hoạt động theo cùng một cách giống như xử lý các đơn đặt hàng, tính toán, thêm thuế VAT theo quốc gia, v.v
## 3.2. Integration:
Là kiểm tra tích hợp với dịch vụ thẻ tín dụng.
## 3.3. Performance:
Thống kê các số liệu hiệu suất khác nhau khi số lượng người dùng lớn nhất có thể thông qua các cổng trong một ngày cụ thể và chuyển đổi chúng thành người dùng đồng thời.
## 3.4. Security:
Bạn cần có bảo mật cao cho Cổng thanh toán.
# 4. Cách kiểm tra Cổng thanh toán: Danh sách kiểm tra hoàn chỉnh
Trước khi bắt đầu kiểm tra:

* Chuẩn bị dữ liệu để kiểm tra: số thẻ tín dụng giả lập cho maestro, visa, master, v.v.
* Thu thập thông tin cổng thanh toán như Google Wallet, Paypal hoặc những thứ khác
* Thu thập tài liệu cổng thanh toán với mã lỗi
* Hiểu các session và các tham số được truyền qua ứng dụng và cổng thanh toán
* Hiểu và kiểm tra lượng thông tin liên quan được truyền qua chuỗi truy vấn hoặc biến hoặc session
* Cùng với ngôn ngữ cổng thanh toán, kiểm tra ngôn ngữ của ứng dụng
* Các cài đặt khác nhau của cổng thanh toán như định dạng tiền tệ, dữ liệu thuê bao được thu thập.
## Các trường hợp kiểm tra ví dụ cho kiểm tra cổng thanh toán
Sau đây là các tình huống / trường hợp kiểm tra quan trọng để kiểm tra Cổng thanh toán
| # | Test case | 
| -------- | -------- | 
| 1     | Trong quá trình thanh toán, hãy cố gắng thay đổi ngôn ngữ cổng thanh toán     | 
| 2     | Sau khi thanh toán thành công, hãy kiểm tra tất cả các thông tin cần thiết, cho dù nó có được truy xuất hay không     | 
| 3     | Kiểm tra xem điều gì xảy ra nếu cổng thanh toán bị ngừng lại trong khi thanh toán     | 
| 4     | Trong quá trình thanh toán, hãy kiểm tra xem điều gì xảy ra nếu phiên kết thúc     | 
| 5     | Trong quá trình thanh toán, hãy kiểm tra những gì xảy ra trong phần backend     | 
| 6     | Kiểm tra xem điều gì xảy ra nếu quá trình thanh toán thất bại     | 
| 7     | Kiểm tra các mục Cơ sở dữ liệu có lưu trữ chi tiết thẻ tín dụng hay không     | 
| 8     | Trong quá trình thanh toán, kiểm tra các trang lỗi và trang bảo mật     | 
| 9     | Kiểm tra cài đặt của pop-up blocker và xem điều gì sẽ xảy ra nếu pop-up blocker bật và tắt     | 
| 10     | Kiểm tra các buffer page giữa cổng thanh toán và ứng dụng    | 
| 11     | Kiểm tra thanh toán thành công, mã thành công được gửi đến ứng dụng và trang xác nhận được hiển thị cho người dùng     | 
| 12     | Xác minh xem các giao dịch được xử lý ngay lập tức hoặc xử lý được giao cho ngân hàng của bạn     |
| 13     | Sau khi giao dịch thành công cổng thanh toán, kiểm tra xem có trở lại ứng dụng của bạn không    |
| 14     | Kiểm tra tất cả các định dạng và tin nhắn khi quá trình thanh toán thành công     |
| 15     | Khi bạn không có hóa đơn từ cổng thanh toán, không nên chuyển hàng     |
| 16     | Thông báo cho chủ sở hữu khi có bất kỳ giao dịch được xử lý qua e-mail. Mã hóa nội dung của thư     |
| 17     | Kiểm tra định dạng số tiền với định dạng tiền tệ     |
| 18     | Kiểm tra với mỗi  tùy chọn thanh toán được lựa chọn     |
| 19     | Kiểm tra xem với mỗi tùy chọn thanh toán được liệt kê có mở tùy chọn thanh toán tương ứng theo thông số kỹ thuật không     |
| 20     | Xác minh xem cổng thanh toán có tùy chọn cho thẻ ghi nợ / thẻ tín dụng không     |
| 21     | Xác minh tùy chọn mặc định cho thẻ ghi nợ có hiển thị drop down menu để lựa chọn thẻ không     |
# 5. Những điều cần xem xét trước khi mua qua payment gateway
* Nếu bạn đã mua một gói hàng, hãy tìm hiểu về khả năng tương thích của nó
* Nếu gói cổng mua sắm đến hạn, hãy hỏi nhà cung cấp cổng thanh toán để biết danh sách các ứng dụng được hỗ trợ
* Cổng phải có hệ thống bảo vệ thông tin địa chỉ
* Tìm hiểu các hình thức bảo vệ giao dịch đang được cung cấp
* Kiểm tra loại thẻ ghi nợ hoặc thẻ tín dụng nào được chấp nhận bởi cổng thanh toán bạn đã chọn
* Kiểm tra phí giao dịch được thu bởi cổng thanh toán
* Kiểm tra xem các cổng thu thập thanh toán ngay trên biểu mẫu hoặc trực tiếp đến một trang khác để hoàn tất giao dịch mua

Link tham khảo: https://www.guru99.com/payment-gateway-testing-tutorial-with-sample-test-cases.html