![](https://images.viblo.asia/61b54964-ae6b-46a0-8ff8-b2eba54672ac.jpg)

### Xin chào các bạn, hôm nay chúng ta sẽ đi tìm hiểu về nền tảng Nodejs xem nó là gì? Cũng như tại sao nó lại là một cái tên khá nổi tiếng trong giới công nghệ ở thời điểm gần đây nhé.

Những nội dung có trong bài này:

*1. Khái niệm Nodejs.*

*2. Những ứng dụng nên viết bằng Nodejs.*

*3. Những kết luận sai lầm về Nodejs.*

*4. Lý do để tự tin sử dụng Nodejs.*

*5. Những công ty lớn nào đang sử dụng Nodejs*

– Bài viết cũng đồng thời được Post trên trang blog cá nhân: [https://trungquandev.com/series-lap-trinh-nodejs/](https://trungquandev.com/series-lap-trinh-nodejs/)

### 1. Khái niệm Nodejs
![](https://images.viblo.asia/22239e09-2b19-486f-a3d5-902aca30d068.jpg)
* Nodejs là một **nền tảng** (Platform) phát triển độc lập được xây dựng ở trên Javascript Runtime của Chrome mà chúng ta có thể xây dựng được các ứng dụng mạng một cách nhanh chóng và dễ dàng mở rộng.

* Nodejs được xây dựng và phát triển từ năm 2009, bảo trợ bởi công ty Joyent, trụ sở tại California, Hoa Kỳ. Dù sao thì chúng ta cũng nên biết qua một chút chút lịch sử của thứ mà chúng ta đang học một chút chứ nhỉ? =))

* Phần Core bên dưới của Nodejs được viết hầu hết bằng C++ nên cho tốc độ xử lý và hiệu năng khá cao.

* Nodejs tạo ra được các ứng dụng có tốc độ xử lý nhanh, realtime thời gian thực.

* Nodejs áp dụng cho các sản phẩm có lượng truy cập lớn, cần mở rộng nhanh, cần đổi mới công nghệ, hoặc tạo ra các dự án Startup nhanh nhất có thể.

### 2. Những ứng dụng nên viết bằng Nodejs
Rõ ràng, không phải cứ hot và mới là Nodejs làm gì cũng tốt, ví dụ như một ứng dụng cần tính ổn định cao, logic phức tạp thì các ngôn ngữ PHP hay Ruby… vẫn là sự lựa chọn tốt hơn. Còn dưới đây là những ứng dụng có thể và nên viết bằng Nodejs:

* **Websocket server:** Các máy chủ web socket như là Online Chat, Game Server…

* **Fast File Upload Client:** là các chương trình upload file tốc độ cao.

* **Ad Server:** Các máy chủ quảng cáo.

* **Cloud Services:** Các dịch vụ đám mây.

* **RESTful API:** đây là những ứng dụng mà được sử dụng cho các ứng dụng khác thông qua API.

* **Any Real-time Data Application:** bất kỳ một ứng dụng nào có yêu cầu về tốc độ thời gian thực.
Micro Services: Ý tưởng của micro services là chia nhỏ một ứng dụng lớn thành các dịch vụ nhỏ và kết nối chúng lại với nhau. Nodejs có thể làm tốt điều này.

### 3. Những kết luận sai lầm về Nodejs
* Thứ nhất, Nodejs là một **nền tảng (platform)**, không phải Web Framework, cũng không phải ngôn ngữ lập trình. Có một kỷ niệm đáng nhớ của mình khi đi phỏng vấn, được hỏi Nodejs là gì? Và mình đã trả lời một cách rất tự tin rằng “Nodejs là một Framework của javascript.” Và thế là thôi khỏi bàn luôn, may mà hồi đó mình mới tìm hiểu nên các anh phỏng vấn cũng thông cảm cho =))

![](https://images.viblo.asia/885c1e01-0ef8-4d0b-96ef-3c142126ba94.jpeg)

* Thứ hai, Nodejs không hỗ trợ đa luồng, nó là một máy chủ đơn luồng.

* Và một điều nữa, **Nodejs không dành cho** người mới tinh mà chưa biết gì về lập trình, vì như đã nói ở trên, **Nodejs không phải là ngôn ngữ lập trình**, để học được Nodejs thì bạn cần phải biết về Javascript, kỹ thuật lập trình, một số giao thức…v..v

### 4. Lý do để tự tin sử dụng Nodejs
* Các ứng dụng Nodejs được viết bằng **javascript**, ngôn ngữ này là một ngôn ngữ khá thông dụng. Theo tác giả của ngôn ngữ Javascript, Ryan Dahl: *“Javascript có những đặc tính mà làm cho nó rất khác biệt so với các ngôn ngữ lập trình động còn lại, cụ thể là nó không có khái niệm về đa luồng, tất cả là đơn luồng và hướng sự kiện.”*

* Nodejs chạy đa nền tảng phía Server, sử dụng kiến trúc hướng sự kiện Event-driven, cơ chế non-blocking I/O làm cho nó nhẹ và hiệu quả.

* Có thể chạy ứng dụng Nodejs ở bất kỳ đâu trên máy Mac – Window – Linux, hơn nữa cộng đồng Nodejs rất lớn và hoàn toàn miễn phí. Các bạn có thể thấy cộng đồng Nodejs lớn như thế nào tại đây, các package đều hoàn toàn free:
[https://www.npmjs.com/](https://www.npmjs.com/)

* Các ứng dụng NodeJS đáp ứng tốt thời gian thực và chạy đa nền tảng, đa thiết bị.

### 5. Những công ty lớn nào đang sử dụng Nodejs.
* Amazon, Ebay, Linkedin, Microsoft, Paypal, trello, Uber và còn nhiều cái tên nổi tiếng khác nữa.
Theo như Paypal thì sử dụng Nodejs làm giảm thời gian đáp ứng lên tới 35%, các bạn có thể xem nguồn ở bài báo này:
[https://medium.com/@Jessicawlm/node-js-v-8-0-57c8a6449762](https://medium.com/@Jessicawlm/node-js-v-8-0-57c8a6449762)

* Còn về phía Linkedin chuyển từ Ruby sang sử dụng Nodejs để xử lý các truy cập từ mobile, và con số Server sử dụng giảm từ 30 còn 3, nghĩa là giảm gần 90%.

![](https://images.viblo.asia/f5e2e685-87da-409d-9c16-68cce9565c3d.png)

-----
Cũng kha khá nội dung rồi, trên đây chỉ là một chút kiến thức mình tìm hiểu được về Nodejs, ngoài thế giới còn nhiều lắm ^^, hy vọng sẽ giúp ích phần nào đó cho những bạn đang tìm hiểu và muốn học hỏi công nghệ này.

Cảm ơn các bạn đã dành chút thời gian xem bài viết của mình!

**[Best Regards – Trung Quân – Green Cat](https://trungquandev.com)**