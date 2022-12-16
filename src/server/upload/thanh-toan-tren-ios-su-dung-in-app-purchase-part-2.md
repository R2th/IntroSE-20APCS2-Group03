Trong [phần 1](https://viblo.asia/p/thanh-toan-tren-ios-su-dung-in-app-purchase-part-1-3P0lPeW85ox) mình đã nói về cách tích hợp Inapp purchase để tiến hành thanh toán trong ứng dụng IOS. Trong phần tiếp theo mình sẽ nói về loại Inapp purchase khá mới và đặc biệt, được apple khuyến khích sử dụng với nhiều ưu đãi.

# Auto-Renewable Subscriptions

## 1.  Auto-Renewable Subscriptions là gì ?

Như mình giới thiệu trong bài trước :
Đây là một kiểu thanh toán khá mới được công bố trước WWDC 2016, sử dụng cho các loại trả phí để sử dụng dịch vụ trong một khoảng thơi gian và sau đó có thể tự động gia hạn. Ví dụ người dùng trả tiền để đọc truyện miễn phí trong 1 tháng và được tự động gia hạn theo định kỳ cho đến khi người dùng huỷ. Có một điều đặc biệt trong kiểu in-app purchases này, đó là nó được Apple rẩt khuyến khích sử dụng ví dụ tỷ lệ ăn chia cho các giao dịch thông thường là 30% chiết khấu cho Apple tuy nhiên nếu sử dụng loại này thì Apple sẽ chỉ chiết khấu 15%, điều này được Apple giải thích là họ mong muốn giúp người dùng không phải đăng ký lại mỗi lần hết hạn, tuy nhiên một mục đích khác mà developer và Apple cùng được hưởng đó là người dùng sẽ sử dụng dịch vụ lâu dài hơn.

## 2. Tạo Auto-Renewable Subscriptions.

Trước khi bắt đầu, để cho dễ hiểu kịch bản mình muốn xây dựng ở đây đó là giải sử mình có 1 ứng dụng xem phim và mình sẽ có các loại gói thanh toán là hàng tháng hay hàng năm, nếu người dùng sử dụng gói hàng tháng họ sẽ phải trả 10$/tháng tuy nhiên nếu user sử dụng gói 1 năm thì họ sẽ chỉ phải trả 100$ mà lại còn được sử dụng free 1 tháng nữa, quá ưu đãi phải không nào :]]

Tại sao mình lại chọn loại Auto-Renewable Subscriptions mà không phải những kiểu còn lại, thì đơn giản là vì chiết khấu của apple rẻ hơn và cứ đến hạn nếu người dùng không huỷ việc Subscriptions thì apple sẽ tự động gia hạn nghĩa là tiền sẽ tự động chảy vào túi mình mà không chờ user đăng ký lại :)

Let's go :

Đăng nhập vào App Store Connnect  -> My apps. Trong application chọn Features -> In-App Purchases -> Click dấu + để thêm và chọn Auto-Renewable Subscriptions -> Create

![](https://images.viblo.asia/8d626cd3-6070-4f71-82c1-cbdc2c6d712a.png)

Okay, tiếp theo chúng ta sẽ điền name và id, ở đây mình sẽ tạo 2 gói là hàng tháng đặt tên là Monthly và hàng năm là Yearly, product ID thì bạn nên sử dụng format : buddleId + name

![](https://images.viblo.asia/eab5270c-c24d-4682-afde-28b1d8f8c4aa.png)

Sau khi nhấp next bạn sẽ đến màn tạo Subscription Group

![](https://images.viblo.asia/853cc2ed-425e-4f7d-835e-4f10bc667aa3.png)

đến đây, nếu ai đã từng sử dụng các loại payment khác sẽ thấy sự khác biệt đó là các Subscription item cùng kiểu sẽ nằm trong cùng một group, điều này để user chỉ có thể Subscription một item trong group tại 1 thời điểm. Mục đích là tránh để người dùng phải trả tiền nhiều lần cho những nội dung giống nhau. 

Ví dụ rõ ràng nếu bạn là người dùng và bạn đã đăng ký gói Monthly rồi và bạn thấy chất lượng rất tốt và muốn nâng cấp lên gói Yearly, vậy trong thời điểm gói Monthly vẫn còn hạn rõ ràng bạn vẫn muốn dùng cho hết rồi mới chuyển sang gói Yearly thì điều này sẽ giúp apple xử lý chính xác. Trường hợp khác giả sử gói monthly của minh chỉ cung cấp các loại phim, mình còn cung cấp cả xem bóng đá NHA, thì lúc này rõ ràng mình sẽ tạo 1 group khác liên quan tới gói NHA của mình, rất dễ hiểu đúng không nào.

Kết quả là :

![](https://images.viblo.asia/a5301f39-3159-45fa-a558-4404a1a671fc.png)

Okay, mọi thứ khá là giống những loại khác, chúng ta chú ý vào một số điểm khác biệt ở đây.

- Subscription Duration : đây là thời gian của gói, ở đây chúng ta sử dụng cho 1 tháng nên mình sẽ chọn 1 Month
- Subscription Prices : đây chính là chỗ để setup giá của gói. Click vào chọn price chúng ta có giao diện Subscription Price

![](https://images.viblo.asia/3ca4384e-8191-4393-a796-9bfb4d5632a6.png)

Bạn chọn Currency để lựa chọn loại tiền thanh toán và Price để chọn mức giá. Sau bước này bạn sẽ review 1 lượt price ở các địa điểm trên thế giới được apple tính toán sẵn và chỉnh sửa nếu muốn, cuối cùng click Create.

![](https://images.viblo.asia/ea615cc1-900e-4a7a-82e2-98605a6a646c.png)

Phía trên các bạn sẽ để ý nó gồm 3 tab : 
- Subscription Prices : đây là giá trị của gói thanh toán, chỉnh sửa nếu muốn ở đây
- Introductory Offers : đây là mục để bạn setup để ưu đãi cho người dùng đăng ký lần đầu, ví dụ ở đây mình muốn cho người dùng dùng thử 1 tháng với gói Yearly thì sẽ setup ở đây 
- Promotional Offers : đây là chỗ để bạn setup thông tin khuyến mãi bạn sẽ tạo ra một code để người dùng khi nhập vào thì sẽ hưởng các ưu đãi, ví dụ như dịp tết thì sẽ giảm thêm hay tặng thêm gì đó.

Okay rồi thử tạo 1 cái Introductory Offers :
- Đầu tiên là Territories for Introductory Offer : đây là chỗ bạn lựa chọn các khu vực mà người dùng sẽ được hưởng ưu đãi
- Tiếp đến chọn Start date và End date : đây là thời gian bạn muốn ưu đãi được áp dụng quá hạn hay chưa tới hạn thì nó sẽ không tính đến.
- Tiếp đến chọn kiểu thanh toán : Pay as you go (dùng đến đâu trả đến đó), Pay up front (trả tiền trước), Free(miễn phí), ở đây mình muốn free 1 tháng nên chọn free với duration là 1Month, done vậy là xong.

![](https://images.viblo.asia/8b3c7164-409e-4340-86ba-e894ffe7ecea.png)

Tiếp theo là implement code mình đã trình bày ở [phần 1](https://viblo.asia/p/thanh-toan-tren-ios-su-dung-in-app-purchase-part-1-3P0lPeW85ox), các bạn có thể tham khảo thêm.

## 3. Kết luận

Qua bài này mình đã hướng dẫn các bạn cách tao một Auto-Renewable Subscriptions, phần tiếp mình sẽ nói về flow tương tác giữa client và server để việc thanh toán trở nên bảo mật và tin cậy hơn. 

Thanks for watching ~