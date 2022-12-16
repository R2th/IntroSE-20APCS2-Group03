Các trang web/app thương mại điện tử, giao đồ ăn nhanh,... ngày càng được người tiêu dùng tin tưởng, ưa chuộng. Do đó các dịch vụ thanh toán trực tuyến cũng được phổ biến, dễ dàng sử dụng, thân thiện với người dùng hơn, giúp khách hàng, nhà cung cấp sản phẩm và ngân hàng thực hiện giao dịch một cách nhanh chóng, tiện lợi.

Để mang lại tiện ích đó, đội ngũ phát triển phần mềm cần đảm bảo độ chính xác, an toàn, bảo mật. Là một tester bắt đầu kiểm thử hệ thống thanh toán trực tuyến cần chuẩn bị kiến thức cơ bản như thế nào thì bài viết này mình sẽ chia sẻ những điều mình mới tìm hiểu được thôi nhé.

### 1. Định nghĩa thanh toán trực tuyến.
Thanh toán trực tuyến (Online payment) hiểu đơn giản là giao dịch chuyển tiền từ tài khoản của người mua (như từ thẻ ghi nợ - Debit card, thẻ tín dụng - Credit card, ví điện tử ...) sang tài khoản của người bán thông qua internet. 

![](https://images.viblo.asia/c19b5631-7110-4bb3-a903-39a8bc7e5261.jpg)

**Ưu điểm:**
* Nhanh chóng, tiết kiệm thời gian hơn rất nhiều so với việc đến cửa hàng mua và thanh toán bằng tiền mặt.
* Không bị hạn chế bởi không gian, thời gian.
* Đơn giản: nhập thông tin thẻ, nhập OTP chỉ mất vài phút, hoặc quẹt thẻ vào máy POST và ký xác nhận là xong.

Nếu một cửa hàng kinh doanh không chấp nhận thanh toán trực tuyến hoặc chỉ dừng lại ở chuyển khoản thì có thể giảm khả năng cạnh tranh, như bản thân mình cũng sẽ thấy bất tiện, đôi khi không hài lòng lắm...Trong khi, hiện nay có nhiều nền tảng của các nhà cung cấp cho khách hàng sử dụng, với hiệu năng cao, hình thức phong phú và có nhiều ưu đãi rất thu hút.

**Nhược điểm:**

![](https://images.viblo.asia/ef5718c6-dd73-4bbc-a47c-dd7e54c077e5.jpg)

* Yêu cầu sercurity cao: Cần bảo mật thông tin lưu trên thẻ, có nguy cơ thất thoát thông tin, gây thiệt hại cho khách hàng. 
* Rủi ro cho hệ thống khi có nhiều bên tham gia vào quá trình giao dịch, phát sinh các giao dịch gian lận.
* Giao dịch quốc tế: có nhiều dạng tiền tệ khác nhau.
* Khó đảm bảo tính chính xác, ví dụ: giao dịch báo thất bại nhưng vẫn trừ tiền, hoặc giao dịch bị treo do bên cổng thanh toán lỗi,...
* Performance hệ thống có thể bị ảnh hưởng khi có nhiều giao dịch cùng lúc, thanh toán từ nhiều ngân hàng khác nhau, mỗi ngân hàng có nhiều user khác nhau cùng sử dụng...

### 2. Các hình thức thanh toán trực tuyến phổ biến.
2.1. Thẻ tín dụng (Credit card): Ngân hàng cung cấp thẻ với một khoản (dựa vào mức thu nhập hàng tháng để tính toán ra số tiền này) để user tiêu dùng trước và trả sau. User chỉ có thể tiêu dùng trước trong khoản tiền được cung cấp sẵn đó.  

![](https://images.viblo.asia/3f9a213e-fa97-4e0e-826f-703c5aa38600.jpg)

2.2. Thẻ ghi nợ (Debit card): Chỉ dùng được khi có tiền sẵn trong thẻ. VD: Thẻ ATM là 1 loại thẻ debit - đây là thẻ ghi nợ nội địa, không dùng được cho thanh toán quốc tế.

![](https://images.viblo.asia/03d8535b-6b96-4dee-bb69-845d9ad1fa1a.jpg)

3.3. Ví điện tử (E-Wallet): Là một tài khoản điện tử định danh, user đăng kí với đơn vị cung cấp. Ví được liên kết với tài khoản ngân hàng, user chuyển khoản sang ví để thanh toán. Như vậy chỉ cần chiếc Smart Phone có kết nối internet là có thể shopping đủ thứ rồi. Hình thức thanh toán này chỉ hỗ trợ thanh toán cho các bên có liên kết với ví. Chắc hẳn mọi người biết đến ít nhất một ví: MoMo, ZaloPay, VNPay, ViettelPay...

![](https://images.viblo.asia/0b0bb0d1-e30f-43cb-9801-b139f2f70ad6.png)

4.4. Internet banking/Mobile banking: Là dịch vụ trực tuyến do ngân hàng cung cấp, hệ thống đã liên kết và user có thể thanh toán trực tiếp luôn thông qua hệ thống của ngân hàng. 

![](https://images.viblo.asia/331007ee-c5bf-402b-b5ea-e43693f21a3e.jpg)

### 3. Luồng xử lý trong thanh toán trực tuyến.
Trước tiên, cùng tìm hiểu các **thuật ngữ thường gặp** trong thanh toán trực tuyến nhé:
* Payment Gateway: Cổng thanh toán nhận giao dịch trực tiếp từ Website bán hàng và chuyển giao dịch này đến bộ vi xử lý tương ứng. Ví dụ: VNPay, Napas,...
* Payment processor: Bộ vi xử lý, xác nhận chi tiết các thông tin thẻ của người dùng, thực hiện những xử lý, trả kết quả về cho Payment Gateway.
* Payment provider: Nhà cung cấp dịch vụ, tổ chức vận hành của Payment Gateway và Payment processor.
* Payment services hoặc Payment system: Một Payment provider có thể cung cấp nhiều loại cổng thanh toán khác nhau, được gọi là một Payment services hoặc Payment system. VD: Cổng thanh toán tiền điện, internet, nước, hóa đơn truyền hình cable...
* Merchant account: Được cung cấp khi một website bán hàng liên kết với một cổng thanh toán, tiền sẽ được trả vào merchant account.
![](https://images.viblo.asia/7b103787-5b50-4f1a-a93c-f6d79ebc76f0.png)

Dưới đây là hình ảnh minh họa cho **một giao dịch thanh toán trực tuyến**:

![](https://images.viblo.asia/1c0d93c1-b161-45ff-8a16-6c25c0c46baa.jpg)

User: Chọn hàng cho vào giỏ hàng --> Click "Thanh toán" --> Chọn hình thức thanh toán --> Nhập thông tin thẻ/quét mã để thanh toán.

Hệ thống: Chuyển giao dịch "thanh toán" đến nhà cung cấp dịch vụ Payment provider.

--> Payment provider xác nhận và chuyển đến cổng thanh toán Payment Gateway tương ứng.

--> Payment Gateway chuyển giao dịch đến Payment processor.

--> Payment processor xử lý giao dịch --> trả kết quả về Payment Gateway.

--> Trả kết quả về cho website bán hàng.

--> Tiến hành cập nhật tài khoản của người mua và người bán.

**Cơ chế chạy của Payment Gateway:**

![](https://images.viblo.asia/a8452333-0c4e-451d-9c90-d6dd1915f46f.jpg)

User gửi yêu cầu thanh toán đến Web server của merchant.

--> Web server của Merchant gửi yêu cầu này đến Payment gateway.

--> Payment gateway gửi yêu cầu xác nhận thông tin giao dịch đến ngân hàng.

--> Ngân hàng xác nhận thông tin thẻ, nếu hợp lệ chính xác, đủ điều kiện giao dịch thì tiến hành chuyển tiền cho tài khoản của người bán và trả thông tin về cho Payment Gateway.

--> Payment gateway trả kết quả về cho Web server của Merchant.

--> Web server trả kết quả về cho user đã mua hàng.

Đây là luồng cơ bản của một Payment Gateway, có thể mỗi nhà cung cấp khác nhau sẽ xây dựng luồng xử lý cho những Payment Gateway khác nhau.

### 4. Lưu ý khi kiểm thử thanh toán trực tuyến.
4.1. Luồng cơ bản:
* Nếu giao dịch thành công:

    --> Trả kết quả "Thành công" về cho Payment Gateway --> trả kết quả "Thành công" về website bán hàng.
  - Tài khoản của bên bán được CỘNG tiền
  - Tài khoản của bên mua bị TRỪ tiền
  
*   Nếu giao dịch thất bại: Không được thực hiện cập nhật tài khoản cho cả 2 bên.

    --> Trả kết quả "Thất bại" về cho Payment Gateway --> trả kết quả "Thất bại" về website bán hàng.
    - Tài khoản của bên bán KHÔNG ĐƯỢC CỘNG tiền
    - Tài khoản của bên mua KHÔNG BỊ TRỪ tiền

    LƯU Ý: Một giao dịch luôn phải trả về kết quả hoặc thành công hoặc thất bại, không được xảy ra trường hợp user không biết trạng thái giao dịch của mình đang như thế nào, tiền đang treo ở đâu. Nếu giao dịch Pending thì phải có màn hình loading và trả về kết quả trong một khoảng thời gian mà hệ thống đã quy định.
    
 4.2. Tiêu chuẩn của hệ thống đang tích hợp.
 
 Khi kiểm thử các thanh toán trực tuyến, chúng ta cần tìm hiểu những chuẩn mà hệ thống đang tích hợp hoặc có liên quan được công nhận để xác định scope cho hợp lý. Dưới đây là 2 chuẩn phổ biến nhất hiện nay:
*  Chuẩn bảo mật thông tin PCI DSS: Dành cho các tổ chức thực hiện và xử lý credit card, bảo vệ an toàn thông tin thẻ cho người dùng. Nếu một Payment Gateway được chứng nhận bởi chuẩn PCI DSS này thì tester có thể an tâm về độ bảo mật của hệ thống. Việc thực hiện security testing có thể bỏ qua việc check bảo mật thông tin thẻ, còn test bảo mật sâu trong hệ thống thì chỉ cần có chuẩn này đảm bảo.
*  ISO 8583: Đây là tiêu chuẩn quốc tế về sự liên lạc, tương tác của các hệ thống ngân hàng với nhau. ISO 8583 đưa ra định dạng message và luồng giao tiếp để các hệ thống khác nhau có thể trao đổi trong giao dịch. Trong đó ISO 8583:2003 được công nhận rộng rãi. Nôm na là mọi thông tin như số thẻ, số tiền, ID đối soát giao dịch,...đều được mã hóa theo chuẩn ISO 8583 trước khi truyền đi. Nên tester có thể yên tâm hơn về các thông tin giao dịch.

4.3. Vài lưu ý
* Các đối tượng trong luồng giao dịch bao gồm: Web server của Merchant, Ngân hàng, Payment Gateway. Có thể phải giả lập các đối tượng Ngân hàng, Payment Gateway để kiểm tra xem Web server của Merchant đã chạy đúng chưa, sau khi OK mới đưa lên môi trường test.
* Test luồng chạy từ đầu đến cuối giao dịch thành công/thất bại/khi timeout.
* Test kết hợp với nhiều loại ngân hàng cùng lúc: ngân hàng mà user thanh toán/Merchant nhận tiền.
* Test kếp hợp giữa các hình thức thanh toán khác nhau.
* Test kếp hợp giữa các cổng thanh toán khác nhau.
* Test timeout, không nhận được thông tin tại từng giai đoạn trong luồng xử lý. Timeout do Web server của Merchant/Ngân hàng/Payment Gateway.
* Performance testing: Nhiều user cùng truy cập/thanh toán cùng lúc.
* Security testing: Xem thông tin được chuyển đi có được mã hóa hay không? Dạng mã hóa là gì? Chuyển thông tin có chính xác hay không?

Bài viết này là các khái niệm ban đầu giúp hình dung tổng quan về hệ thống thanh toán trực tuyến. Mình sẽ tiếp tục tìm hiểu check list các test case cần test để đảm bảo chất lượng của hệ thống thanh toán trực tuyến ở bài viết sau. Cảm ơn mọi người ạ.