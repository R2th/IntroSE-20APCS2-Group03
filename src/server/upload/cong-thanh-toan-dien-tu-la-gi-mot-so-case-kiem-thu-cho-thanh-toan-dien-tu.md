Kiểm thử Cổng thanh toán đảm bảo một đường dẫn trung gian giữa các bên giao dịch như ngân hàng trực tuyến, thẻ ghi nợ, thẻ tín dụng và các ngân hàng do người bán mua đang lựa chọn sử dụng.

Cổng thanh toán chuyển thông tin của bên giao dịch đến ngân hàng thương mại và sau đó kiểm tra phản hồi nhận được từ ngân hàng tương ứng.

Ngày nay có rất nhiều cổng thanh toán. Một số trong số đó là PayPal, Braintree và Citrus Payments.

Trước tiên, chúng ta hãy kiểm tra quy trình của bất kỳ giao dịch nào xảy ra trên thương mại điện tử và sau đó chúng ta sẽ đi sâu vào chi tiết về việc kiểm tra quy trình của cổng thanh toán.

## 1. Thử nghiệm cổng thanh toán là gì
Tích hợp cổng thanh toán là điều bắt buộc đối với bất kỳ doanh nghiệp nào. Nó phải đảm bảo được bảo mật cao.

## 2. Luồng giao dịch Cổng thanh toán
![](https://images.viblo.asia/8d4a4621-f413-4328-9f51-243972f9876e.png)
Giao dịch bắt đầu với việc khách hàng đặt hàng một sản phẩm trên một trang web thương mại điện tử.

Sau khi xác nhận sản phẩm, khách hàng sẽ được chuyển hướng đến một số trang web nơi khách hàng được yêu thanh toán.

Trên trang này, khách hàng nhấp vào nút thanh toán ngay và sau đó cổng thanh toán gửi thông tin đã nhập này đến ngân hàng.

Thông tin này được gửi dưới dạng dữ liệu mã hóa và sau đó ngân hàng sẽ xác minh các chi tiết.

Nếu ngân hàng xác minh giao dịch, thì khoản thanh toán được chấp thuận và mã phản hồi thành công được gửi đến bộ xử lý thanh toán.

Trong khi nếu ngân hàng không chấp thuận giao dịch thì ngân hàng phát hành sẽ gửi mã phản hồi thất bại và cuối cùng, thông báo thất bại được hiển thị cho khách hàng.

## 3. Các loại thử nghiệm bắt buộc trên các cổng thanh toán

**Kiểm thử chức năng**
Bất cứ khi nào một cổng thanh toán mới được tích hợp vào hệ thống của bạn, cần phải kiểm tra chức năng để xem ứng dụng có hoạt động như cách nó hoạt động với các cổng thanh toán khác hay không. Xác minh xem các đơn đặt hàng, tính toán, thêm thuế VAT có được xử lý đúng.

**Kiểm thử tích hợp**
Bạn cần kiểm tra xem khách hàng có thể đặt hàng thành công hay không và sau khi thanh toán thành công, bạn cần đảm bảo rằng tiền đã được nhận thành công trong ngân hàng của người bán.

Ngoài ra, bạn cần xác minh xem giao dịch có bị vô hiệu hay được hoàn lại tiền hay không.

**Kiểm thử hiệu suất**
Kiểm tra hiệu suất là rất quan trọng để kiểm tra một cổng thanh toán. Bạn cần có số lượng tối đa truy cập vào cổng thanh toán cùng một lúc và xem liệu bộ xử lý thanh toán có bị lỗi hay không.
Bạn cần tăng người dùng trên mức ngưỡng để kiểm tra hiệu suất của cổng thanh toán.

**Kiểm thử security**
Kiểm tra bảo mật phải được thực hiện trên bất kỳ cổng thanh toán nào được ưu tiên vì thông tin nhạy cảm được cung cấp trong khi điền chi tiết thanh toán.
Điều rất quan trọng là phải kiểm tra xem chi tiết thanh toán do người dùng nhập có được mã hóa đúng cách hay không.

## 4. Cách kiểm thử cổng thanh toán
* Thu thập dữ liệu thích hợp với các nhà cung cấp thẻ khác nhau
* Đảm bảo rằng dữ liệu liên quan đến mã lỗi đã được ghi lại
* Đảm bảo rằng các thông báo bật lên đang hoạt động tốt
* Kiểm tra các biện pháp ngăn ngừa gian lận có hoạt động tốt không
* Kiểm tra trình tự hết hạn phiên
* Kiểm tra tích hợp tiền tệ
* Kiểm tra cổng thanh toán khi có sự cố gián đoạn

## 5. Các trường hợp kiểm tra quan trọng cho cổng thanh toán
Một số trường hợp thử nghiệm quan trọng cho cổng thanh toán.

* Thử nghiệm cổng thanh toán với các số thẻ khác nhau. Bạn nên có số thẻ dunny để kiểm tra luồng này.
* Xác minh luồng khi có phản hồi thành công từ ngân hàng phát hành.
* Sau khi giao dịch thành công từ ngân hàng, thông báo thanh toán thành công sẽ được hiển thị cho người dùng.
* Khi thanh toán thành công trên cổng thanh toán, bản cập nhật phải được gửi đến email hoặc số điện thoại của khách hàng.
* Xác minh luồng khi có giao dịch không thành công.
* Xác minh luồng khi cổng thanh toán ngừng phản hồi.
* Xác minh luồng giao dịch với các thiết lập bảo mật hoặc chống gian lận.
* Kiểm tra luồng trong trường hợp hết phiên trong khi thực hiện giao dịch.
* Xác minh xem cổng thanh toán có hoạt động dựa trên đơn vị tiền tệ của quốc gia mà khách hàng thực hiện thanh toán hay không.
* Nếu ứng dụng cho phép thanh toán thông qua các tùy chọn khác nhau, thì mỗi tùy chọn nên được thử nghiệm riêng lẻ.
* Xác minh rằng khoản tiền hoàn lại đúng với số tiền mà giao dịch đã bị hủy hoặc vô hiệu. Không nên có bất kỳ sự khác biệt nào về số lượng vì nó có thể gây ra tổn thất kinh doanh.
* Xác minh rằng khoản tiền hoàn lại được thực hiện vào tài khoản khách hàng được ghi có trong khoảng thời gian quy định được đề cập bởi các điều khoản và điều kiện áp dụng.
* Xác minh rằng khoảng thời gian hoàn lại tiền là khác nhau đối với các phương thức thanh toán khác nhau. Ví dụ: thời gian bắt đầu hoàn lại tiền cho Paytm ít hơn so với thẻ tín dụng hoặc thẻ ghi nợ.
* Xác minh luồng khi khách hàng tự nguyện hủy giao dịch ở giữa giao dịch.
* Kiểm tra trường hợp không đủ tiền thanh toán
* kiểm tra trường hợp thẻ bị hết hạn
* Trường hợp hết hạn phiên làm việc
* Thực hiện giao dịch trong trường hợp disconnect network
* Trường hợp input thông tin card không hợp lệ

Nguồn tài liệu : https://www.testbytes.net/blog/what-is-payment-gateway-testing/