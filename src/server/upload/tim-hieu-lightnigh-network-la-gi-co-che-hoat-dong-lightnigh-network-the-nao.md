Các bạn đang tìm hiểu về Blockchain vậy đã biết Lightnigh Network là gì, cơ chế hoạt động Lightnigh Network thế nào qua bài viết mình sưu tầm và chia sẻ dưới đây.

Lightning Network – Một giải pháp được thiết kế để tăng tốc độ xử lý giao dịch trên mạng Blockchain. Bài viết này Vakaxa mời bạn tìm hiểu kỹ hơn về Lightning Network là gì và Lightning Network hoạt động như thế nào nhé

Khi Bitcoin được Satoshi Nakamoto đề xuất lần đầu tiên vào năm 2008. Sau 10 năm hoạt động, khả năng mở rộng vẫn là vấn đề lớn nhất đối với Bitcoin cũng như các hệ thống tiền điện tử kỳ cựu khác.

![](https://images.viblo.asia/9c85a67a-f2f6-4f69-bde4-de2bf69804d2.jpg)

Khả năng mở rộng là gì? Trong suốt sự tồn tại của nó, Bitcoin chỉ có khả năng xử lý khoảng 7 giao dịch mỗi giây. Tốc độ này đáp ứng được trong giai đoạn ban đầu, tuy nhiên hệ thống đã bị tắc nghẽn trong một vài năm nay. Kết quả là các giao dịch mất một thời gian dài để xử lý và phí giao dịch rất cao. Trong khi Bitcoin xử lý 7 tỷ giao dịch của Bitcoin mỗi giây thì Visa là 24.000 và công suất đỉnh của nó khoảng 50.000 giao dịch mỗi giây.

Và một phương án đã được đề xuất để cải thiện tình trạng đó chính là Lightning Network.

**Lightnigh Network là gì**

Tại một số thời điểm trong lịch sử, việc gửi điện tín là cách truyền thông đường dài nhanh nhất và hiệu quả nhất. Để làm như vậy, bạn phải đi đến bưu điện địa phương của bạn, điền vào một mẫu đơn và trả tiền cho thông điệp của bạn dựa trên bao nhiêu chữ cái nó chứa. Sau đó, tin nhắn sẽ được gửi điện báo đến văn phòng điện báo gần nhất để truyền đến tận cùng. Sau đó, một người đưa thư sẽ gửi điện tín đến đích của nó.

Về cơ bản, có rất nhiều người tham gia vào việc gửi một tin nhắn ngắn đơn giản và bạn phải trả một chút tiền cho nó. Đó là trạng thái hiện tại của mạng Bitcoin. Tuy nhiên, Lightning Network về cơ bản giống như có một người mà bạn muốn nói chuyện trên quay số nhanh: bạn chỉ cần bấm ‘1’ và điện thoại của bạn bè bạn đã đổ chuông.

![](https://images.viblo.asia/abc4b1ba-e709-4be0-a43a-5dae3c6fba5e.jpg)

Nói một cách đơn giản, ý tưởng đằng sau Bitcoin Lightning Network có thể nghe như thế này: Chúng tôi thực sự không cần lưu giữ hồ sơ về mọi giao dịch đơn lẻ trên Blockchain. Thay vào đó, Lightning Network thêm một lớp khác vào Blockchain của Bitcoin và cho phép người dùng tạo các kênh thanh toán giữa bất kỳ hai bên nào trên lớp bổ sung đó. Các kênh này có thể tồn tại miễn và bởi vì chúng được thiết lập giữa hai người, giao dịch sẽ gần như tức thì và phí sẽ cực kỳ thấp hoặc thậm chí không tồn tại.

**Lightnigh Network hoạt động như thế nào?**

Để dễ hình dung cách hoạt động của Lightning Network bạn có thể theo dõi ví dụ sau đây.

Giả sử có hai người Danny và Jon. Họ có thể làm việc cùng nhau, họ có thể là họ hàng hoặc một cặp vợ chồng, quan điểm là họ cần gửi tiền cho nhau khá thường xuyên, nhanh chóng và với mức phí tối thiểu. Vì vậy, họ thiết lập một kênh trên Lightning Network.

Thứ nhất, họ cần phải tạo ra một ví Mulitisignature, đó là một ví mà cả hai có thể truy cập với các khóa riêng tương ứng. Sau đó, cả hai đều gửi một số tiền nhất định của Bitcoin, giả sử 3 BTC/người.

![](https://images.viblo.asia/f7508aa3-6b94-42e8-8758-ef4f7241e130.jpg)

Từ đó trở đi, họ có thể thực hiện các giao dịch không giới hạn giữa hai người họ. Về cơ bản, các giao dịch này là phân phối lại các khoản tiền được lưu trữ trong ví dùng chung. Ví dụ, nếu Danny muốn gửi 1 BTC cho Jon, cô ấy sẽ cần phải chuyển quyền sở hữu số tiền đó cho anh ta. Sau đó, hai người trong số họ sử dụng các khóa riêng của họ để ký một bảng cân đối cập nhật.

Việc phân phối tiền thực sự xảy ra khi kênh bị đóng. Thuật toán sử dụng bảng cân đối kế toán được ký gần đây nhất để xác định ai nhận được cái gì. Nếu Danny và Jon quyết định đóng kênh sau một lần giao dịch, Danny sẽ nhận được 2 BTC và Jon sẽ nhận được 4 BTC.

Chỉ sau khi kênh được đóng lại, thông tin về số dư ban đầu và cuối cùng của nó được phát tới chuỗi khối Bitcoin. Vì vậy, cách Lightning Network hoạt động là nó cho phép người dùng thực hiện nhiều giao dịch bên ngoài Blockchain chính và sau đó ghi chúng lại thành một giao thức duy nhất.

Điều thú vị nhất ở đây là khi công nghệ được áp dụng rộng rãi, bạn thậm chí sẽ không nhất thiết phải thiết lập một kênh chuyên dụng để gửi tiền cho một người nào đó. Thay vào đó, bạn sẽ có thể gửi thanh toán cho người nào đó sử dụng các kênh với những người mà bạn đã kết nối. Hệ thống sẽ tự động tìm tuyến đường ngắn nhất.

Đây là cách mà Lightning Network cuối cùng có thể đưa ra câu trả lời cho cuộc tranh luận không bao giờ kết thúc về việc khả năng mở rộng của Bitcoin.

**Ưu điểm của Lightning Network**

![](https://images.viblo.asia/1e336a1c-c912-4a76-b0a7-1f0d30af1d81.jpg)

* Tốc độ giao dịch: Khi mạng đang hoạt động, bạn sẽ không phải đợi một vài xác nhận về mọi giao dịch bạn đang cố gắng thực hiện. Các giao dịch sẽ gần như tức thời bất kể mạng bận như thế nào.
* Phí giao dịch: Vì các giao dịch thực sự sẽ diễn ra trong các kênh Lightning Network và bên ngoài Blockchain, bạn sẽ chỉ cần trả các khoản phí nhỏ nhất, nếu có.
* Khả năng mở rộng: Lightning Network được cho là có khả năng thực hiện các giao dịch trên mỗi bit thứ hai của Bitcoin và các loại tiền điện tử khác với chiều cao chưa từng có của ít nhất 1 triệu giao dịch mỗi giây.
* Cross-chain hoán đổi nguyên tử: Các thử nghiệm đầu tiên về các giao dịch cross-blockchain đã hoạt động và điều này rất thú vị. Miễn là hai blockchains chia sẻ cùng một hàm băm mật mã (và hầu hết các chức năng chính), người dùng sẽ có thể gửi tiền từ chuỗi này sang chuỗi khác mà không phải tin tưởng một bên trung gian của bên thứ ba, chẳng hạn như trao đổi. Công nghệ này có tiềm năng thực sự mang tính cách mạng.
* Bảo mật và ẩn danh: Phần lớn các tiền điện tử không có ẩn danh hoàn toàn. Quá trình chuyển đổi vẫn có thể được truy tìm từ ví này sang ví khác. Tuy nhiên, khi nói đến Lightning Network, hầu hết các giao dịch xảy ra bên ngoài Blockchain chính, vì vậy tất cả các micropayment được thực hiện thông qua các kênh Lightning sẽ gần như không thể theo dõi.

**Nhược điểm của Lightning Network**

* Không hoạt động đầy đủ: Có lẽ nhược điểm chính của Lightning Network hiện tại là một thực tế là nó chưa hoạt động đầy đủ, vì vậy không có cách nào để khẳng định nó thực sự tốt như thế nào.
* Độ phức tạp của kênh: Lightning Netwrok được khái niệm hóa như một mạng lưới các kênh, khi được thiết lập, về mặt lý thuyết nên cho phép các giao dịch liền mạch. Tuy nhiên, không có điều gì sẽ xảy ra nếu việc thanh toán sẽ phải mất quá phức tạp. Chắc chắn, nếu giao dịch của bạn sẽ cần phải đi qua hàng chục kênh trung gian, lệ phí sẽ tăng lên.
* Giới hạn số lượng lưu trữ: Một nhược điểm khác của mạng là thực tế là trong phiên bản hiện tại các kênh bị giới hạn. Tức là, số lượng Bitcoin được lưu trữ trong ví của hai người dùng khi thiết lập kênh là số tiền tối đa trong kênh đó.

**Ai đã phát triển Lightning Network**

* Lightning Network lần đầu tiên được mô tả trong một White Paper của Joseph Poon và Thaddeus Dryja vào năm 2015. Hiện tại có ba nhóm thực hiện chung hầu hết công việc về sự phát triển của Lightning Network: Blockstream, Lightning Labs và ACINQ. Mỗi Startups được đề cập ở trên đều đang thực hiện triển khai giao thức Lightning Network của riêng họ bằng các ngôn ngữ lập trình khác nhau.
* Hy vọng những thông tin trong bài viết có thể phần nào giúp các bạn hiểu Lightnigh Network là gì và Lightnigh Network hoạt động như thế nào.

[Ứng dụng công nghệ Blockchain](https://vakaxa.com/vi/giai-phap-blockchain/)

Chúc các bạn vui vẻ!

Theo Vakaxa