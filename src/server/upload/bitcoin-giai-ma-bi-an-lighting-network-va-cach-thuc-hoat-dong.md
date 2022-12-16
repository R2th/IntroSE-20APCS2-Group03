![](https://images.viblo.asia/2991ebe7-3e11-4fc7-b02a-d5e20beec764.jpg)

Từ khi bắt đầu cho đến hiện tại đối với Bitcoin khả năng mở rộng (Scalability) vẫn là một bài toán lớn . Chính xác thì khả năng mở rộng nghĩa là gì ? Hiện tại Bitcoin chỉ có khả năng xử lý khoảng 7 giao dịch mỗi giây. Bạn biết đấy mọi giao dịch trên Bitcoin cần ghi vào sổ cái , không chỉ thế các Miner sẽ lựa chọn các giao dịch có phí cao hơn để ưu tiên đưa vào sổ cái trước điều đó làm cho giao dịch có thể mất rất nhiều thời gian và chi phí để thực hiện . Nếu như Bitcoin muốn trở thành một sự thay thế hoàn hảo cho hệ thống thanh toán hiện tại thì nó cần một giải pháp để mở rộng . Để hiểu mức độ cần thiết của khả năng mở rộng ta chỉ cần so sánh khả năng xử lý 7 giao dịch mỗi giây của Bitcoin với 24.000 giao dịch mỗi giây của VIsa. Trong những năm qua thì cồng đồng Bitcoin đã đưa ra nhiều đề xuất khác nhau về cách cải thiện nhưng vẫn chưa đạt được sự đồng thuận chung . Tuy nhiên gần đây một giải pháp mới được đưa ra và đang được thử nghiệm đó là Lightning network .
## Lightning network là gì ?
Để đơn giản hóa chúng ta có thể hiểu là chúng ta sẽ ko cần phải ghi lại tất cả các giao dịch trên mạng blockchain . Thay vào đó Lightning network sẽ tạo một layer trên mạng Bitcoin và nó cho phép người dùng tạo một kênh để giao dịch giữa 2 người dùng bất kì nào trên layer đó . Các kênh này sẽ tồn tại cho đến khi nào được yêu cầu hủy bởi nó chỉ tồn tại giữa 2 người . Và hơn nữa là các giao dịch sẽ gần như ngay lập tực và phí sẽ cực kì thấp hoặc thậm chí là 0.

## Nó hoạt động như thế nào ?
Hãy lấy ví dụ quen thuộc đó là Alice và Bob , họ cần gửi tiền cho nhau khá thường xuyên, nhanh chóng với mức giá tối thiểu . Do đó họ tạo một channel trên Lightning Network

![](https://images.viblo.asia/bdb72a5b-059d-455c-a3a5-b3fda4ecb06b.png)

Đầu tiên họ cần tạo mulitisignature wallet , đây là là ví mà cả 2 đều có thể truy cập bằng private key của họ . Sau đó cả 2 gửi một lượng Bitcoin nhất định ( giả sử 3 Bitcoin ) vào ví đó . Sau khi tiến hành xong việc gửi họ có thể thực hiện vô hạn giao dịch giữa 2 người họ . Về cơ bản các giao dịch chỉ phân phối lại quyền sở hữu tiền được lưu trên ví này .Chẳng hạn , nếu Alice muốn gửi cho Bob 1 BTC, cô sẽ chuyển quyền sở hữu 1BTC đấy cho Bob.  Sau đó cả 2 người sử dụng private key kí để update balance vào 1 bảng thống kê trong ví đó .Việc chuyển tiền thực tế sẽ xảy ra sau khi đóng kênh . Căn cứ vào lần cuối cả 2 kí update balance vào bảng thống kê để quyết định ai nhận được bao nhiêu tiền . Nếu Alice và Bob quyết định đóng kênh sau giao dịch trên thì Alice nhận lại được 2BTC và Bob nhận được 4BTC.

Sau khi đóng channel thông tin về số dư đầu tiên vào cuối cùng được gửi đến Bitcoin network. Vì vậy , cách thức hoạt động của Lightning Network là cho phép người dùng thực hiện nhiều giao dịch bên ngoài blockchain và ghi lại chúng dưới dạng một giao dịch duy nhất

Điều thú vị nhất là khi giải pháp này được áp dụng rộng rãi bạn thậm chí sẽ không cần thiết lập một kênh để gửi tiền cho một người nào đó . Thay vào đó bạn sẽ gửi tiền thông qua các kênh mà có tồn tại kết nối giữa 2 người. Hệ thống sẽ tự tìm đường đi ngắn nhất .
![](https://images.viblo.asia/55862eac-3d96-4440-8f90-160fc92fdbe7.jpg)

Về tính bảo mật .Điều đáng chú ý nhất của Lightning Network là nó họat động bên trên blockchain nhưng lại chưa thấy được tính bảo mật tuyệt đối đằng sau nó .Do đó rất nhiều khả năng giải pháp này sẽ được sử  dụng cho các giao dịch nhỏ . Đối với việc chuyển khoản lớn hơn, yêu cầu bảo mật hơn thì có vẻ như tốt nhất nên sử dụng mạng Bitcoin nguyên bản .

Cuối cùng , một tính năng hấp dẫn khác của Lightning Network đang được thử nghiệm tại thời điểm này là  **cross-chain atomic swaps**  ( chuyển token giữa các blockchain khác nhau) . Nói một cách đơn giản , đó là một cách hoán đổi bất kì loại tiền điện tử cụ thể nào sang một loại tiền điện tử khác . Thử nghiệm đầu tiên về trao đổi token giữa Bitcoin và Litecoin đã thành công. Các bạn có thể xem tại [đây](https://blog.lightning.engineering/announcement/2017/11/16/ln-swap.html)

## Ai phát triển giải pháp này ?
Lightning Network được mô tả lần đầu tiên trong white paper của Joseph Poon and Thaddeus vào năm 2015 ( mọi người có thể đọc tại [đây](http://lightning.network/lightning-network-paper.pdf)) Hiện tại có ba nhóm phát triển chính của Lightning Network là Blockstream, Lightning Labs và ACINQ . Mỗi nhóm phát triển Lightning Network Protocol sử dụng một ngôn ngữ lập trình khác nhau .

![](https://images.viblo.asia/fc0df5e9-8b7d-437f-b3d6-bb3a6c2b0f08.png)
Ngoài ra còn nhiều triển khai khác các bạn có thể xem tại [đây](https://github.com/bcongdon/awesome-lightning-network#tutorials)

## Ở đâu khi nào và tại sao nó được sử dụng
Có vẻ như cộng đồng tiền điện tử đang háo hức dự đoán sự ra mắt của Lightning Network. Ban đầu, nó được thiết kế dành riêng cho Bitcoin, nhưng công nghệ này hiện đang được phát triển cho một loạt các loại tiền điện tử khác, như Stellar, Litecoin, Zcash, Ether và Ripple.

Bitcoin thực sự đã được gửi đi và nhận lại bằng cách sử dụng Blockstream, Lightning Labs, và ACINQ, chứng minh rằng cả ba trong số đó đều có thể tương tác với nhau. Hơn nữa, phiên bản đầu tiên của [Lightning specifications](https://github.com/lightningnetwork/lightning-rfc) đã được xuất bản.

Những thông số kỹ thuật đó là một bước tiến lớn cho mạng, vì chúng có thể được sử dụng bởi các nhà phát triển ứng dụng và triển khai Lightning Network trong các ngôn ngữ lập trình khác.

Tuy nhiên, mạng vẫn còn trong giai đoạn trứng nước. Cho đến nay, vẫn chưa có sản phẩm chính thức nào mà người dùng trong mạng có thể sử dụng ngay được. Hơn nữa, việc triển khai hiện tại vẫn còn khá nhiều lỗi. Các nhà phát triển Lightning Network đã kêu gọi người dùng tìm hiểu về mạng bằng cách sử dụng testnet của Bitcoin và không gửi thử bất kỳ khoản tiền thật nào.
Các nhà phát triển cũng khuyên người dùng nên kiên nhẫn, vì network's code rất phức tạp và yêu cầu việc Testing rất nghiêm ngặt. Để được cộng đồng Bitcoin chấp nhận hoàn toàn, Lightning Network sẽ cần phải chứng minh bản thân an toàn và có thể sử dụng được. Các chuyên gia dự đoán rằng để Lightning Network có thể làm được điều đó thì cần từ vài tháng đến vài năm nữa.

Về lý do tại sao mạng sẽ được sử dụng, câu trả lời rất đơn giản: khả năng mở rộng. Nếu mạng thực sự sẽ cung cấp giải pháp cho vấn đề chính của Bitcoin, rất có thể nó sẽ được chấp nhận bởi các loại tiền điện tử khác.

Nếu điều đó xảy ra, có khả năng công nghệ **cross-chain atomic swap** sẽ được phát triển hơn nữa, đánh dấu bước đầu tiên hướng tới việc xây dựng nền tảng trao đổi tiền điện tử phi tập trung thực sự mà ko cần qua sàn.

## Tiềm năng
Một số tiềm năng đầu tiên mà chúng ta có thể nhìn thấy đó chính là :
### Tốc độ giao dịch 

Khi mạng hoạt động, bạn sẽ không phải chờ giao dịch mà bạn đang cố gắng thực hiện. Các giao dịch sẽ gần như ngay lập tức cho dù mạng bận đến đâu. Nếu điều này có thể thành hiện  thực , thị trường tiền điện tử sẽ có những bước tiến lớn để có thể cạnh tranh với các hệ thống thanh toán truyền thống như Visa, MasterCard và PayPal.

### Phí giao dịch

Vì các giao dịch diễn ra trong các kênh Lightning Network bạn sẽ chỉ cần trả các khoản phí nhỏ nhất, nếu có. Đây là một trong những lợi thế chính của Lightning Network, vì điều này sẽ hoàn toàn cho phép Bitcoin được sử dụng như một hình thức thanh toán tại các cửa hàng, quán cà phê, quán bar, v.v.

### Scalability

Lightning Network được cho là có thể tăng số lượng các giao dịch mỗi giây của Bitcoin và các loại tiền điện tử khác lên mức chưa từng thấy vào khoảng ít nhất 1 triệu giao dịch mỗi giây.

### Cross-chain atomic swaps

Các thử nghiệm đầu tiên về **cross-blockchain transactions** đã hoạt động. Miễn là hai blockchains chia sẻ cùng một **cryptographic hash function**, người dùng sẽ có thể gửi tiền từ blockchain này sang blockchain khác mà không cần phải tin tưởng vào một trung gian bên thứ ba, chẳng hạn như sàn. Công nghệ này có một tiềm năng thực sự cách mạng.

### Security và Ẩn danh

Phần lớn các loại tiền điện tử không hoàn toàn ẩn danh. Việc chuyển đổi vẫn có thể được truy tìm từ ví này sang ví khác. Tuy nhiên, khi nói đến Lightning Network, hầu hết các giao dịch xảy ra bên ngoài blockchain chính, vì vậy tất cả các khoản thanh toán vi mô được thực hiện qua các kênh Lightning sẽ gần như không thể theo dõi.

## Nhược điểm
Có lẽ nhược điểm chính của Lightning Network tại thời điểm này là nó không chạy trên thực tế, do đó, không có cách nào để khẳng định hoàn toàn nó thực sự tốt như thế nào. Hơn nữa, khái niệm của nó có vẻ rất tuyệt trên giấy, nhưng cho đến nay vẫn chưa thể chứng minh được liệu nó có giống như vậy hay không.

### Độ phức tạp của các kênh
Mạng Lightning được khái niệm hóa như một mạng lưới các kênh, một khi được thiết lập, về mặt lý thuyết sẽ cho phép các giao dịch liền mạch. Tuy nhiên, không có điều gì sẽ nói về những gì sẽ xảy ra nếu việc thanh toán phải mất quá nhiều route. Chắc chắn, nếu giao dịch của bạn cần phải đi qua hàng chục kênh trung gian thì phí sẽ tăng thêm.

### Channel caps
Một nhược điểm khác của mạng là trong phiên bản hiện tại của nó, các kênh bị giới hạn. Nghĩa là, số Bitcoin được lưu trữ trong ví của hai người dùng khi thiết lập kênh là số tiền tối đa trong kênh đó. Thiết lập này tạo ra một tình huống trong đó một số người dùng có thể cần phải chọn giữa việc giao dịch trên các kênh Lightning Network và giao dịch bên ngoài chúng ( trên blockchain chính ). Điều này là không lý tưởng, đặc biệt là đối với những người có nguồn lực khá hạn chế.

### Hubs
Hơn nữa, đã có những lo ngại về việc hình thành `hubs - một loại nút có nhiều vốn mà phần lớn các giao dịch sẽ thông qua`. Nhiều người dùng Bitcoin xem đây là sự tập trung của mạng. Nhưng, không có khả năng các hubs như vậy có thể tạo ra bất kỳ lợi nhuận đáng kể nào của phí giao dịch.

## Tổng kết
Trên đây là những lí thuyết cơ bản đầu tiên về Lightning network 

Tài liệu tham khảo : https://cointelegraph.com/lightning-network-101/what-is-lightning-network-and-how-it-works