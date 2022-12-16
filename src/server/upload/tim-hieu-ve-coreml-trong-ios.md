Khi chúng ta nói về Machine Learning (ML) trên thiết bị di động, nó nói về suy luận hoặc dự đoán dữ liệu người dùng bằng mô hình học máy được đào tạo trước.

![](https://images.viblo.asia/546ea505-0dd9-4e02-b860-e6b8d740c98c.png)

Đối với ML, các nhà phát triển iOS có ba lựa chọn để truy cập các mô hình được đào tạo để cung cấp suy luận:
1. Sử dụng Core ML để truy cập vào mô hình được đào tạo trước trên thiết bị cục bộ. Đây là chủ đề hôm nay!
2. Lưu trữ Mô hình Máy học trong đám mây và gửi dữ liệu từ thiết bị đến điểm cuối được lưu trữ để cung cấp dự đoán.
3. Gọi các dịch vụ được quản lý đám mây API-Machine Machine Learning của bên thứ ba nơi dịch vụ lưu trữ và quản lý một mô hình được đào tạo được xác định trước. Dữ liệu người dùng được truyền qua lệnh gọi API từ thiết bị và dịch vụ trả về các giá trị dự đoán.

Core ML là gì?
Core ML là khung học máy được sử dụng trên các sản phẩm của Apple (macOS, iOS, watchOS và tvOS) để thực hiện dự đoán nhanh hoặc suy luận với việc tích hợp dễ dàng các mô hình học máy được đào tạo trước, cho phép bạn thực hiện dự đoán theo thời gian thực hình ảnh hoặc video trực tiếp trên thiết bị.
**Ưu điểm của ML **

Độ trễ thấp và kết quả gần thời gian thực: Bạn không cần phải thực hiện cuộc gọi API mạng bằng cách gửi dữ liệu và sau đó chờ phản hồi. Điều này có thể rất quan trọng đối với các ứng dụng như xử lý video các khung hình liên tiếp từ camera trên thiết bị.
Tính khả dụng (Ngoại tuyến), Quyền riêng tư và Chi phí hấp dẫn khi ứng dụng chạy mà không cần kết nối mạng, không có lệnh gọi API và dữ liệu không bao giờ rời khỏi thiết bị. Hãy tưởng tượng sử dụng thiết bị di động của bạn để xác định gạch lịch sử khi ở trong tàu điện ngầm, lập danh mục ảnh kỳ nghỉ riêng tư khi ở chế độ máy bay hoặc phát hiện các cây độc khi ở nơi hoang dã.

**Nhược điểm của ML**

Kích thước ứng dụng: Bằng cách thêm mô hình vào thiết bị, bạn có thể tăng kích thước của ứng dụng và một số mô hình chính xác có thể khá lớn.
Sử dụng hệ thống: Dự đoán và suy luận trên thiết bị di động liên quan đến rất nhiều tính toán, làm tăng hao pin. Các thiết bị cũ hơn có thể đấu tranh để cung cấp dự đoán thời gian thực.
Đào tạo mô hình: Trong hầu hết các trường hợp, mô hình trên thiết bị phải được đào tạo liên tục bên ngoài thiết bị với dữ liệu người dùng mới. Khi mô hình được đào tạo lại, ứng dụng sẽ cần được cập nhật với mô hình mới và tùy thuộc vào kích thước của mô hình, điều này có thể làm căng chuyển mạng cho người dùng. Xem lại thử thách kích thước ứng dụng được liệt kê ở trên và bây giờ chúng tôi có vấn đề về trải nghiệm người dùng tiềm năng.

**Bạn có thể làm gì với Core ML?**

Nhận dạng hình ảnh thời gian thực, Nhận diện khuôn mặt, Dự đoán văn bản và Nhận dạng người nói đại diện cho một số trong nhiều đổi mới được thực hiện với Machine Learning bằng Core ML.
Làm thế nào nó hoạt động?
Core ML sử dụng mô hình học máy được đào tạo trước trên đám mây sau đó được chuyển đổi sang định dạng Core ML và được thêm trực tiếp vào dự án Xcode của bạn.

**Train model là gì?**

Đào tạo mô hình học máy liên quan đến việc cung cấp một thuật toán ML với dữ liệu đào tạo để học hỏi. Mô hình học máy là một tạo tác của đào tạo và loại mô hình phụ thuộc vào những gì bạn muốn dự đoán. Trong hình ảnh bên dưới, hình ảnh được dán nhãn của hoa được gửi đến (các) thuật toán để tìm hiểu và phân loại những bông hoa đó. Mô hình được đào tạo về dữ liệu để sau đó dự đoán một loại hoa khi được người dùng ứng dụng trình bày trên thiết bị.
![](https://images.viblo.asia/46acfa75-fb01-43d0-be81-419cb090ac61.png)

**Framework / Công cụ hỗ trợ Core ML**
Machine Learning trên iOS thực sự là một hệ thống các công cụ và framework với Core ML là lõi Core. Core ML được tích hợp chặt chẽ và hỗ trợ Vision framework (phân tích hình ảnh), Xử lý ngôn ngữ tự nhiên và khung GameplayKit.

 Vision framework thực hiện phát hiện khuôn mặt và mốc, phát hiện văn bản, nhận dạng mã vạch, đăng ký hình ảnh và theo dõi tính năng. Khi sử dụng Core ML để giải quyết các vấn đề về thị giác máy tính như phân loại đối tượng và phát hiện đối tượng, hãy sử dụng  Vision framework vì Apple đã làm cho việc sử dụng Vision làm đường ống từ di động sang Core ML trở nên cực kỳ đơn giản. Vision thực hiện tất cả các công việc nặng nề từ định dạng AVFoundation sang CVPixelBuffer mà Core ML mong đợi. Tận dụng lợi thế của nó.
API NLP cung cấp khả năng xử lý ngôn ngữ tự nhiên và nhận dạng giọng nói. Nó sử dụng học máy để hiểu sâu văn bản bằng các tính năng như nhận dạng ngôn ngữ, mã thông báo và phát hiện tên từ văn bản.
Đối với các nhà phát triển trò chơi, GameplayKit dành cho kiến trúc và tổ chức logic trò chơi của bạn. Nó kết hợp các hành vi chơi trò chơi phổ biến như tạo số ngẫu nhiên, trí tuệ nhân tạo, tìm đường và hành vi tác nhân.