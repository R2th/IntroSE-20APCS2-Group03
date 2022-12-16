# 1. Payment Gateway Testing là gì

Payment Gateway Testing là kiểm thử các hệ thống sử dụng Payment Gateway. Một hệ thống Payment gateway là một e-commerce application service cho phép người dùng thanh toán online qua credit card (thẻ tín dụng). Payment Gateway khi thanh toán sẽ bảo vệ thông tin chi tiết của thẻ tín dụng bằng cách mã hóa các thông tin nhạy cảm như số thẻ tín dụng, chi tiết chủ tài khoản, v.v..Những thông tin này sẽ được trao đổi một cách an toàn giữa người mua và người bán và ngược lại.

Ngoài credit card payment gateway còn cho phép thanh toán an toàn qua debit card, electronic bank transfers, cash cards, reward points...
Một số Cổng thanh toán phổ biến là Braintree, Authorize.net, PayPal, Bluepay, Citrus Pay, v.v.

![](https://images.viblo.asia/505826a5-f9e1-41e3-831a-1ff5c6a1c072.gif)

Một số thuật ngữ:

**1. Merchant** – là người hoặc công ty bán sản phẩm hoặc dịch vụ. Flipkart, Amazon, eBay là một số ví dụ về Thương gia.

**2. Credit Card** – Thẻ nhựa có thể được sử dụng để mua sản phẩm hoặc dịch vụ thông qua tài khoản tín dụng. Nó có số thẻ gồm 16 chữ số, ngày hết hạn, hình ba chiều, dải từ, bảng chữ ký và số giá trị xác minh Thẻ (CVV)

![](https://images.viblo.asia/e1d1f027-4a8f-42d8-8bdb-3be92b918204.jpg)

![](https://images.viblo.asia/fe71c1a7-ffc1-45a2-b4ed-0be3101e052a.jpg)

3. Acquiring bank – là một tổ chức tài chính duy trì tài khoản ngân hàng của người bán và cho phép người bán chấp nhận và xử lý các giao dịch ghi nợ và / hoặc thẻ tín dụng trên cửa hàng của họ.

4. Issuing Bank – là tổ chức tài chính phát hành thẻ ghi nợ hoặc thẻ tín dụng của khách hàng. Bất cứ khi nào khách hàng sử dụng thẻ tín dụng hoặc thẻ ghi nợ để mua hàng, ngân hàng phát hành sẽ chấp thuận hoặc từ chối giao dịch dựa trên tài khoản của chủ thẻ và chuyển thông tin đó đến Ngân hàng mua lại.

5) Transaction – Quá trình kết thúc để kết thúc thông qua đó thương gia nhận được tiền cho giao dịch với khách hàng.

6) Authorization – Ủy quyền được yêu cầu khi khách hàng mua hàng. Ủy quyền này được cung cấp bởi ngân hàng phát hành của khách hàng và xác nhận tính hợp lệ của chủ thẻ, khả năng thanh toán và sự hiện diện của đủ tiền, v.v ... Sau khi hoàn thành, tiền được giữ và số dư được khấu trừ khỏi giới hạn tín dụng của khách hàng nhưng không chưa được chuyển vào tài khoản thương gia.

7) Capture – Trong hành động này, thương gia thu thập thông tin thanh toán của khách hàng có liên quan và gửi yêu cầu thanh toán / bắt giữ cho bộ xử lý. Bộ xử lý sử dụng thông tin này để bắt đầu chuyển tiền giữa tài khoản thẻ của khách hàng và tài khoản ngân hàng thương mại.

Trong bài viết này sẽ đề cập đến các vấn đề sau:

1. Các loại Payment Gateway System
2. Testing Types cho Payment Domain
3. Kiểm thử Payment Gateway như nào: Complete Checklist
4. Example Test Cases cho kiểm thử Payment Gateway
5. Một số vấn đề cần cân nhắc khi mua Gateway Package

# 2. Các loại Payment Gateway System và luồng giao dịch

![](https://images.viblo.asia/ae5c1cbd-a705-46e2-a271-3f61694d5d73.png)

## 2.1 Hosted Payment Gateway:

Hosted payment gateway system điều hướng khách hàng đi từ trang web thường mại điện tử (e-commerce site) đến gateway link trong tiến trình thanh toán. Sau khi thanh toán xong, sau khi thanh toán xong, nó sẽ đưa khách hàng trở lại trang web thương mại điện tử. Đối với loại thanh toán như vậy, bạn không cần id người bán, một ví dụ về cổng thanh toán được lưu trữ là PayPal, Noche và WorldPay.

## 2.2 Shared Payment Gateway:

Trong khi xử lý, khách hàng thanh toán được chuyển đến trang thanh toán và ở lại trên trang web thương mại điện tử. Khi chi tiết thanh toán được điền, quá trình thanh toán được tiến hành mà không rời khỏi trang web thương mại điện tử trong khi xử lý thanh toán, chế độ này dễ dàng và tốt hơn là, một ví dụ về cổng thanh toán được chia sẻ là eWay, Stripe.

# 3. Testing Types cho Payment Domain

Testing cho Payment Gateway nên bao gồm:

* Functional Testing: Kiểm tra chức năng cơ bản của cổng thanh toán, xác minh xem ứng dụng có hoạt động như nhau khi xử lý các đơn đặt hàng, tính toán, thêm thuế VAT theo quốc gia, v.v.

* Integration: Kiểm tra tích hợp với dịch vụ thẻ tín dụng
 
* Performance: Xác định các số liệu hiệu suất khác nhau như số lượng người dùng cao nhất có thể đến qua các cổng trong một ngày cụ thể và số lượng current user

* Security: Cần thực hiện kiểm thử security ở mức sâu với payment gateway

# 4. Kiểm thử Payment Gateway như nào: Complete Checklist

Trước khi thực hiện kiểm thử:
Thu thập dữ liệu kiểm tra thích hợp cho số thẻ tín dụng fake cho maestro, visa, master, v.v.
Thu thập thông tin cổng thanh toán như Google Wallet, Paypal hoặc những thứ khác
Thu thập tài liệu cổng thanh toán với error codes
Hiểu phiên và các tham số được truyền qua ứng dụng và cổng thanh toán
Hiểu và kiểm tra lượng thông tin liên quan được truyền qua query string hoặc  variable hoặc session

Ví dụ Test Scenarios/Cases cho check Payment Gateway

![](https://images.viblo.asia/201e1dfa-cdac-4c68-9015-3ab2f2ffa778.png)

# 5. Một số vấn đề cần cân nhắc
1. Đảm bảo giao dịch được kiểm tra từ đầu đến cuối. Trong các dự án của chúng tôi, chúng tôi đã thử nghiệm và báo cáo nhiều lỗi liên quan đến thu thập dữ liệu và luồng dữ liệu từ ứng dụng đến Cổng thanh toán. Một số lỗi cụ thể là:
- Thông tin tên khách hàng (người mua) không được nắm bắt chính xác
- Thẻ tín dụng của khách hàng hết hạn sử dụng đã bị bắt không đúng cách do một chức năng không chính xác nhưng lại gây các giao dịch bị từ chối bởi các ngân hàng phát hành trên tài khoản của thông tin thẻ tín dụng không chính xác.
- Giao dịch trùng lặp hiển thị trong Bộ xử lý thanh toán
2. Nếu thanh toán thất bại trong một giao dịch vì bất kỳ lý do gì, một thông báo phù hợp sẽ được hiển thị cho khách hàng. Bất kỳ thông báo lỗi nào quá kỹ thuật như ‘Đối tượng không được đặt thành cá thể hoặc lỗi 404 có thể gây nhầm lẫn cho khách hàng và ảnh hưởng đến trải nghiệm người dùng.
3. Với mục đích xác minh thả tù sau sản xuất, khách hàng (áp dụng chủ doanh nghiệp) sẽ cần phải tạo một tài khoản xử lý thanh toán trực tiếp, thiết lập ID Merchant của họ, vv Tùy thuộc vào bộ xử lý thanh toán được chọn, có thể mất từ ​​2 ngày đến vài tuần để thiết lập tài khoản. Điều này cần được thông báo bởi người quản lý dự án cho khách hàng trước với đủ thời gian để thiết lập tài khoản live trước khi ứng dụng và thanh toán tích hợp bộ vi xử lý đang go live
4. Nếu bạn đã mua một gói giỏ hàng, hãy tìm hiểu về khả năng tương thích của nó
5. Nếu gói cổng mua sắm đến hạn, hãy hỏi nhà cung cấp cổng thanh toán để biết danh sách các ứng dụng được hỗ trợ
6. Cổng phải cung cấp Bảo vệ Hệ thống Xác minh Địa chỉ
7. Tìm hiểu các loại bảo vệ giao dịch đang được cung cấp
8. Kiểm tra loại thẻ ghi nợ hoặc thẻ tín dụng nào được chấp nhận bởi cổng thanh toán bạn đã chọn
9. Kiểm tra phí giao dịch được thu bởi cổng thanh toán
10. Kiểm tra xem các cổng thu thập thanh toán ngay trên biểu mẫu hoặc trực tiếp đến một trang khác để hoàn tất giao dịch mua

Nguồn:
https://www.softwaretestinghelp.com/payment-gateway-testing-tutorial/
https://www.guru99.com/payment-gateway-testing-tutorial-with-sample-test-cases.html