Một trong những vấn đề quan trọng khi làm bất kỳ một game nào đó chính là lợi nhuận. 

Hiện nay có một số cách để kiếm tiền từ game như sau

- Paid: Trả tiền trước cho ứng dụng

- Free-to-play: Hình thức chơi game miễn phí, Tuy nhiên muốn tăng level trong game, hay muốn trang bị đồ tốt thì đều phải  nạp tiền.

- Ad-funded: Kiếm tiền bằng cách sử dụng quảng cáo. Cách này cần phải làm sao để nguời dùng thu hút và ấn vào quảng cáo, hơn nữa tuổi thọ của game khá ngắn nên cách này sẽ không kéo dài được lâu
- Freemium: Cung cấp các game miễn phí và sau đó tính phí cho các tính năng thêm bằng cách sử dụng In-App Purchases (IAP).

Cách Freemium khá là hiệu quả do có thể thu hút người chơi ban đầu bằng hình thức miễn phí và sau đó khiến họ đầu tư tiền để có thể tận hưởng toàn bộ trải nghiệm trong game. Cách này đang dần phổ biến vào hầu hết các game hiện nay

Vậy nên, trong bài viết này, chúng ta sẽ đi tìm hiểu về cách thức mua hàng qua In-app purchases do Google play cung cấp trên nền tảng Android để hiểu rõ hơn hình thức thanh toán này như thế nào nhé

## Tổng quan về In - app billing(In-app purchase)

In - app billing là một tính năng được tích hợp bên trong ứng dụng di động (iOS hay Android) hoặc máy tính (Windows) để giúp người dùng có thể mua những tính năng hoặc vật phẩm bổ sung trong ứng dụng. Trong trường hợp bạn muốn bán và phân phối các sản phẩm như quần áo, giày dép, thực phẩm và các thứ khác có liên quan đến thế giới thực, thì bắt buộc cần sự trợ giúp của các nhà cung cấp cổng thanh toán của bên thứ ba (PayPal, Braintree, Stripe... ).





![](https://images.viblo.asia/930922b4-13da-41be-ab8e-d7b00676ec90.jpg)

## **Phân loại**

 In - app billing về cơ bản được chia thành hai loại đó là :
 
**Managed product**:  sản phẩm trong ứng dụng yêu cầu một khoản phí duy nhất, không định kỳ đối với hình thức thanh toán của người dùng. Chúng bao gồm tiêu hao và không tiêu hao. Một vật phẩm tiêu hao là tạm thờì, và khi sử dụng hết có thể mua lại được (máu, thể lực, kinh nghiệm...) . Còn vật phẩm không tiêu hao là các vật phẩm có thể dùng được mãi (quần áo, thiết bị...)

**Subscription**: Sản phẩm trong ứng dụng yêu cầu khoản phí định kỳ (hàn ngày, tháng, năm) cho hình thức thanh toán của người dùng và được tự động gia hạn vào cuối mỗi chu kỳ thanh toán. Khi đăng ký không được gia hạn, sản phẩm không còn hoạt động cho người dùng nữa. ( nâng cấp lên tài khoản vip, mở thêm tính năng...)

## **Kiểm tra giao dịch mua**

### ***Static responses:*** 

Thanh toán trên Google Play cung cấp ProductID riêng biệt  và các phản hồi tĩnh liên quan mà bạn có thể sử dụng để test thanh toán trên Google Play . Các phản hồi này cho phép bạn xác minh rằng  ứng dụng của bạn có xử lý chính xác tất cả các trạng thái có thể hay không.

 Bạn chỉ cần cài đặt ứng dụng của mình trên một thiết bị, đăng nhập vào thiết bị và thực hiện các yêu cầu thanh toán bằng cách sử dụng productID riêng biệt mà Google Play cung cấp
 
Thay vì sử dụng sản phẩm thực từ danh sách sản phẩm của ứng dụng, hãy sử dụng một trong các ProductID sau

    android.test.purchased
Khi bạn thực hiện yêu cầu Thanh toán trên Google Play với ProductID này, Google Play sẽ phản hồi như bạn đã mua thành công một mặt hàng. Phản hồi bao gồm chuỗi JSON, chứa thông tin mua hàng giả (ví dụ: ID đơn đặt hàng giả).

    android.test.canceled
Khi bạn thực hiện yêu cầu Thanh toán trên Google Play với ProductID này, Google Play phản hồi như thể giao dịch mua đã bị hủy. Điều này có thể xảy ra khi xảy ra lỗi trong quá trình đặt hàng, chẳng hạn như thẻ tín dụng không hợp lệ hoặc khi bạn hủy đơn đặt hàng của người dùng trước khi bị tính phí.

    android.test.item_unavailable
Khi bạn thực hiện yêu cầu Thanh toán trên Google Play với ProductID này, Google Play sẽ phản hồi như thể mặt hàng đang được mua không được liệt kê trong danh sách sản phẩm của ứng dụng của bạn.



###  ***Test purchases***

Bằng cách sử dụng Sandbox, có thể cho phép truy cập để test mua hàng. Điều này gần giống với mua thực tế, tuy nhiên có một vài ngoại lệ
- Không bị tính phí bất kỳ số tiền nào cho sản phẩm đã mua
- Nếu mua vật phẩm subscription, thời hạn thanh toán sẽ lặp lại hàng ngày, bất kể thời lượng được định cấu hình trong Play Console
- Có thể kiểm soát đối với phản hồi cho mỗi giao dịch mua

**Các bước tiến hành test**: 
- Tải APK của ứng dụng lên Play Console (bản nháp không còn được hỗ trợ)
- Add tài khoản test của tester vào Google Play Console
- Yêu cầu tester xác nhận  join vào  group alpha/beta testing (nếu có)
- Đợi 1 chút, sau đó bắt đầu test

**Flow**

Để thực hiện mua hàng, ứng dụng của bạn sẽ gửi một yêu cầu thanh toán cho một sản phẩm cụ thể trong ứng dụng. Google Play sau đó xử lý tất cả các chi tiết thanh toán cho các giao dịch, trong đó có yêu cầu và xác nhận các hình thức thanh toán và xử lý các giao dịch tài chính. 

Khi quá trình kiểm tra hoàn tất, Google Play sẽ gửi ứng dụng của bạn chi tiết mua hàng, chẳng hạn như số thứ tự, ngày đặt hàng và thời gian, và giá thanh toán.

## Lưu ý khi test: 



Khi test phải đảm bảo tính năng của các loại vật phẩm: Tiêu hao (Consumables), Không tiêu hao (Non-Consumables), Subscriptions tự động (Auto-Renewable Subscriptions), Subscriptions miễn phí (Free Subscriptions), Subscriptions định kì (Non-Renewable Subscriptions)

Trong trường hợp mua hàng thành công,thất bại hoặc huỷ giao dịch thì hiển thị đúng với yêu cầu

Mua hàng thất bại: 

-  Thông báo thanh toán thành công nhưng không trừ tiền( đây là một trong những trường hợp hay gặp phải nhất khi thất bại)
-  Không đủ tiền để mua
-  Các vật phẩm trả về không đúng loại, số lượng, tính năng
-  Trừ sai giá tiền đã đề ra
- Khi thay đổi loại tiền tệ thì trừ tiền có đúng hay không

...

 Mua hàng thành công: trả về đúng loại, số lượng, tính năng của vật phẩm và đúng giá tiền

                         
        

 Tham khảo
 
 
https://developer.android.com/google/play/billing/billing_testing
https://trainghiemso.vn/in-app-purchase-la-gi/
https://android.jlelse.eu/everything-you-need-to-know-about-google-plays-in-app-billing-29b728a32822
https://developer.apple.com/support/app-store-connect/