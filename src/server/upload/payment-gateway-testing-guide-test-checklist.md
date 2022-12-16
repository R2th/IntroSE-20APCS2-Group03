**Payment Processors là gì?**

Theo Wikipedia: Payment Processor(Bộ xử lý thanh toán) là một công ty (thường là một bên thứ ba) được chỉ định bởi *người bán (Merchant)* để xử lý các giao dịch từ nhiều kênh khác nhau như *thẻ tín dụng( Credit card), thẻ ghi nợ( Debit card)* cho các *ngân hàng thương mại của họ*.  Payment Processor sẽ kiểm tra chi tiết các thông tin nhận được bằng cách chuyển tiếp chúng tới ngân hàng phát hành thẻ hoặc là hiệp hội thẻ tương ứng để xác minh và thực hiện các biện pháp chống gian lận trong khi giao dịch.

Một số Payment Gateways phổ biến như: Braintree, Authorize.net, PayPal, Bluepay, Citrus Payments... 

![](https://images.viblo.asia/e996a61a-b101-478e-ab2c-6fcd008136c8.png)

Chúng ta sẽ đi thảo luận về các thuật ngữ phổ biến, hiểu về luồng giao dịch End to End, tips và những phương pháp hữu hiệu.

# 1. Thuật ngữ Payment Gateway
Chúng ta cùng thảo luận về các thuật ngữ dưới đây:
![](https://images.viblo.asia/e1ba9ee0-394d-4230-928a-5c469f063d21.png)

**Merchant - Người bán**: Là một người hoặc một công ty bán các sản phẩm hoặc dịch vụ. Ví dụ như: Flipkart, Amazon, eBay...

**Credit Card - Thẻ tín dụng**: Là thẻ được sử dụng để mua sản phẩm hoặc dịch vụ thông qua số tài khoản. Trên thẻ gồm số thẻ có 16 chữ số, ngày hết hạn, hình ba chiều, dải từ, chữ kí và CVV( Card verification value) number.

**Mặt trước của thẻ:**

![](https://images.viblo.asia/cb89aa0a-5742-464f-9ac9-b3a30fb640f6.png)

**Mặt sau của thẻ:**

![](https://images.viblo.asia/5d833057-6260-447a-bfea-6a4909a7b26a.png)

**Acquiring bank - Ngân hàng thanh toán** : Là một tổ chức tài chính cung cấp các dịch vụ thanh toán, xử lý các giao dịch trực tuyến và đảm bảo về mặt tài chính cho giao dịch.

**Issuing Bank - Ngân hàng phát hành thẻ**: Là một tổ chức tài chính phát hành thẻ tín dụng hoặc thẻ ghi nợ ( Credit or debit card). Khi khách hàng sử dụng thẻ tín dụng hoặc thẻ ghi nợ để thực hiện giao dịch, ngân hàng phát hành có quyền chấp nhận hoặc từ chối giao dịch dựa trên thông tin tài khoản của chủ thẻ, sau đó chuyển thông tin tới Acquiring bank.

Ví dụ: Giao dịch sẽ bị từ chối khi thông tin ngày hết hạn của thẻ không chính xác, số tiền giao dịch trong tài khoản không đủ...

**Transaction - Giao dịch**: Một giao dịch kết thúc khi người bán nhận được tiền từ người mua.

**Authorization - Sự ủy quyền**:  Sự ủy quyển được yêu cầu bắt buộc khi mua hàng. Được cung cấp bởi ngân hàng phát hành của chủ thẻ, nhằm xác nhận tính hợp lệ của thẻ, khả năng thanh toán. Quá trình này xác nhận hạn mức của thẻ tín dụng và giữ lại một khoản tín dụng nhất định nào đó.

**Capture** - Thu thập các thông tin có liên quan tới giao dịch của khách hàng và gửi yêu cầu xử lý. Bộ xử lý sử dụng thông tin này để bắt đầu chuyển tiền giữa tài khoản thẻ của khách hàng và tài khoản ngân hàng người bán.
# 2. Luồng giao dịch
Theo dõi sơ đồ luồng giao dịch dưới đây:

![](https://images.viblo.asia/1f9fd576-753a-4b3e-a407-9899fe3507e9.png)

Nếu khách hàng từ chối or cancel order: 

![](https://images.viblo.asia/5081624a-dfaf-43c9-b8dd-8b490e2a6efc.png)

Sự khác nhau giữa Void và Refund phụ thuộc vào việc giao dịch đó có được nhận hay không.

Khi giao dich bị hủy thì số tiền sẽ được trả lại cho chủ tài khoản mua hàng. Nếu thanh toán được hoàn thành, số tiền sẽ được chuyển từ tài khoản của người mua sang cho người bán. Giao dịch hoàn tất.

# 3. Tại sao cần test Payment Gateways
+ Khi đi mua sắm tại một cửa hàng, chúng ta sẽ cần phải thanh toán tiền mặt hoặc quẹt thẻ qua một chiếc máy để hoàn thành giao dịch.
+ Khi sử dụng thẻ tín dụng hoặc thẻ ghi nợ, máy POS( máy bán hàng) sẽ thông báo cho chúng ta biết giao dịch được thành công hay thất bại.
+ Tương tự, khi chúng ta mua hàng online, chúng ta cũng cần phải có một hệ thống để check, chấp nhận hoặc từ chối giao dịch ngay lập tức.
+ Từ phía khách hàng, việc giao dịch từ web thương mại điện tử cần phải liền mạch. Chỉ cần click vào "Pay Now", người dùng có thể nhìn thấy thông báo giao dịch thành công hoặc thất bại trong vài giây.
+ Từ phía cửa hàng thương mại điện tử, người bán cần đảm bảo cho chu trình thanh toán hoàn chỉnh được hoạt động tốt( nhận giao dịch từ cửa hàng trực tuyến, tiếp nhận và xử lý). Nếu như có bất kì rủi ro trong chu trình hoạt động này thì sẽ ảnh hưởng tới quyền lợi của người bán.
+ Từ phía người bán, khi chọn một quy trình thanh toán nào đó, họ sẽ có giai đoạn thử nghiệm, làm quen với quy trình và đánh giá xem quy trình đó có phù hợp với yêu cầu của họ và doanh nghiệp của họ hay không.
# 4. Các loại kiểm thử bắt buộc
Tùy thuộc và phương thức xử lý của Payment Processor và yêu cầu về sản phẩm mà bạn có thể thực hiện các loại thử nghiệm dưới đây: 

**Functional Testing** - Kiểm thử chức năng là yêu cần bắt buộc khi kiểm thử các chức năng thanh toán mới ra đời, ít được sử dụng để đảm bảo rằng hoạt động của các ứng dụng như xử lý đơn đặt hàng, tính toán giá, thuế, refund... được chính xác. Khi các phương thức thanh toán hoạt động ổn định thì loại thử nghiệm này có thể giảm bớt.

**Integration Testing** - Kiểm thử tích hợp là quan trọng nhất khi tích hợp chứng năng với cổng thanh toán. Là tester, chúng ta cần phải xác mình rằng việc tích hợp trang web của bạn, shop online, ứng dụng hoạt động tốt với cổng thanh toán mà bạn đã chọn. Hơn nữa, chúng ta cần hiểu rõ toàn bộ luồng giao dịch:
+ Đặt hàng.
+ Khi kết thúc giao dịch, tiền có được chuyển vào tài khoản của người bán hay không.
+ Xác minh xem giao dịch có được refund hoặc cancel thành công hay không.

**Performance Testing** - Kiểm thử hiệu suất là điều cần thiết khi trang web, shop online, ứng dụng đi vào hoạt động. Khi nhiều người dùng cùng truy cập và thanh toán cùng một lúc, hệ thống phải đảm bảo không có lỗi xảy ra.

**Security Testing** - Trong quá trình giao dịch, có rất nhiều thông tin cá nhân của khách hàng trên thẻ tín dụng như số thẻ hay số CVV... Điều quan trọng nhất là phải đảm bảo được tất cả thông tin này sau khi người dùng input vào hệ thống sẽ được mã hóa và bảo mật.

# 5. Một số tip hữu ích
Dưới đây là môt số mẹo hữu ích cho tester:

**1.** Khi có cổng thanh toán cần được đưa vào hoạt động, hãy tìm hiểu về môi trường sandbox - Đây là một môi trường miễn phí. Nếu có một tài khoản sandbox available, nó sẽ rất hữu ích cho chúng ta chạy thử nghiệm và tùy chỉnh yêu cầu. 

**2.** Chắc chắn rằng giao dịch sẽ được kiểm thử từ đầu tới cuối. Trong dự án, chúng tôi đã test và report lại được khá nhiều bug liên quan tới thu thập dữ liệu, luồng dữ liệu từ ứng dụng tới cổng thanh toán. Dưới đây là một vài bug điển hình:

+  Thông tin của khách hàng không được capture chính xác.
+  Ngày hết hạn trên thẻ tín dụng của khách được capture lại không chính xác do chức năng này bị lỗi dẫn tới các giao dịch bị ngân hàng phát hàng thẻ reject. 
+  Giao dịch bị trùng lặp trong bộ xử lý.

**3.** Tìm hiểu các giới hạn về cổng thanh toán của Sandboxes.

**4.** Nếu thanh toán trong giao dịch không thành công bởi bất kì lý do gì,  cần phải hiển thị thông báo cho khách hàng. 

**5.** Để đưa vào chạy thực tế, khách hàng (Owner của ứng dụng) cần phải tạo tài khoản thanh toán trực tiếp, thiết lập các ID của chính họ...

Tùy thuộc vào bộ xử lý, chúng ta có thể mất từ 2 ngày tới và tuần để thiết lập tài khoản. Người quản lý dự án cần phải trao đổi trực tiếp với khách hàng để thiết lập tài khoản của họ và tích hợp vào hệ thống trước khi đưa ứng dụng vào thực tế. 
# 6. Payment Gateway - Checklist
Dưới đây là danh sách có thể hứu ích cho tester và dùng làm tài liệu tham khảo:

1) Thiết lập Payment Processor Sandbox

2) Thu thập các số thẻ tín dụng thử nghiệm dùng để test các thẻ tín dụng khác nhau. 

3) Xác minh các thao tác của ứng dụng khi giao dịch thành công. 
4) Sau khi giao dịch thành công,  kiểm tra xem cổng thanh toán có trả về cho ứng dụng của bạn thông báo xác nhận hay thông báo giao dịch thành công hay không.

5) Xác minh xem khách hàng có nhận được thông báo xác nhận hay không, như email xác nhận đơn hàng khi giao dịch thành công.

6) Kiểm tra xem khi thanh toán thất bại hoặc bộ xử lý không có response trả về - có bất kì thông báo lỗi nào không? 

7) Kiểm tra xem ứng dụng trên trình duyệt của bạn bật hay tắt. Khi có thông báo nó sẽ hiển thị trong cửa sổ được bật lên của trình duyệt.

8) Kiểm tra các thiết lập bảo mật hoặc ngăn chặn gian lận.
9) Kiểm tra các mục trong giao dịch khi tester có tài khoản truy cập vào database.

10) Kiểm tra xem điều gì xảy ra khi phiên làm việc của khách hàng bị hết hạn. 

11) Kiểm tra lệnh điều khiển trong suốt quá trình giao dịch và báo cáo lại tất cả lỗi quan sát được.

12) Xác minh giao dịch được thực hiện trên một kênh an toàn.
13) Xác minh rằng đơn vị tiền tệ của bộ xử lý được thiết lập đúng. Ví dụ như: Công ty sử dụng bộ xử lý là công ty của Việt Nam, thì cần thiết lập đơn vị tiền tệ là VND.
14) Nếu trong ứng dụng có nhiều phương thức thanh toán như thẻ tín dụng và Paypal, cả 2 phương thức này cần phải test riêng lẻ từ đầu tới cuối. 
15) Xác minh số tiền refund or void giống với số tiền giao dịch. Không có trường hợp số tiền refund or Void sẽ vượt quá số tiền trong giao dịch.

# 7. Thiết lập Sandbox: ví dụ Braintree Payments
Đi tới Braintree website.

Nhấn vào ‘Try the sandbox’.

![](https://images.viblo.asia/ba210fcf-0bea-4a6f-9ac1-0fefd80f056b.png)

Điền tất cả thông tin bắt buộc và đăng kí Sandbox
 
 ![](https://images.viblo.asia/b23b6aec-6257-41e4-bb44-0687542db188.png)
 
Bạn sẽ nhận được một email thông báo được gửi vào chính email dùng đăng kí liên quan đến việc xác nhận tạo tài khoản.
 
 ![](https://images.viblo.asia/8ed4cbf4-760a-4d19-9ffa-7c32d13b7068.png)
 
Bạn cần phải điền thông tin người dùng để xử lý thêm khi được yêu cầu đổi password. Nhấn vào ‘Agree and Create your account button’
 
![](https://images.viblo.asia/5d8964b3-b160-42aa-b618-7fbc304f5335.png)

Bạn sẽ đăng nhập và đi tới trang quản lý Braintree

![](https://images.viblo.asia/d4f34ec1-4ff5-4b72-a19a-6686e21a1dc5.png)

Lưu ý về Sandbox keys và sử dụng trong ứng dụng của bạn để tích hợp với Braintree sandbox.

![](https://images.viblo.asia/604e1e03-7dc0-4fd3-9019-98672afbdc5f.png)

Sau khi tích hợp xong, Sandbox đã sẵn sàng để sử dụng. Nếu bạn cần thay đổi thiết lập thì sử dụng Setting menu.

 ![](https://images.viblo.asia/e1185785-2a39-4888-98e9-afa47c193b97.png)
 
Các tùy chọn thường được sử dụng:
 
 ![](https://images.viblo.asia/beee4200-7222-4372-94ea-05bc6b9f53a4.png)
 
#  Kết luận
Bộ xử lý thanh toán là một thành phần rất quan trọng đối với bất kỳ ứng dụng thương mại điện tử nào, nó được thiết kế để thanh toán cho khách hàng của mình. Do đó, cần phải kiểm thử kỹ thành phần này. Thiếu bất kỳ trường hợp nào cũng có thể tác động đến doanh số hoặc giao dịch của người bán và tác động tiêu cực đến trải nghiệm của người dùng.
Tester cần chuẩn bị hoặc thiết lập môi trường thử nghiệm (sandboxes, thu thập thông tin thẻ tín dụng thử nghiệm, kết quả trả về...) và xây dựng chiến lược thử nghiệm cho cả môi trường thử nghiệm và môi trường thực tế.
 
 

Nguồn tham khảo: https://www.softwaretestinghelp.com/payment-gateway-testing-tutorial/