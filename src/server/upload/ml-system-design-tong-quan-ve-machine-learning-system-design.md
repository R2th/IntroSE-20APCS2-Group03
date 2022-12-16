# 1. Machine Learning (ML) System Design là gì?
### a) Khái niệm
ML System Design là quá trình xác định <b>giao diện, thuật toán, dữ liệu, phần cứng, hạ tầng...</b> cho một hệ thống ML nhằm đạt được các <b>yêu cầu nhất định</b>.

Lấy ví dụ 1 hệ thống ML đơn giản: phần mềm chấm công bằng khuôn mặt. Bạn cần gì, ngoài 1 cái model tốt? Đầu tiên là cái *server* với *database* lưu thông tin nhân viên, đương nhiên cả khuôn mặt. Bạn lại còn cần thêm cả *giao diện* dễ dùng, nhân viên dễ thao tác này nọ nữa. À, model phải update liên tục, vì công ty có thể tuyển nhân viên mới nữa mà.

Yêu cầu cho hệ thống gồm tất cả các thứ trên là gì? 
- <b>Reliable - đáng tin cậy:</b> đương nhiên, vì nó nghĩa là đủ tốt. Nhưng đủ tốt trong thực tế và trong lý thuyết là rất khác nhau
- <b>Scalable - có thể mở rộng:</b> Hệ thống phải đảm bảo vẫn hoạt động tốt khi công ty thêm nhân viên, tăng quy mô, hay phần mềm được thêm các chức năng mới
- <b>Maintainable - có thể bảo trì:</b> Bảo trì là bước tốn kém nhất cả về công sức và tiền bạc khi tạo ra 1 sản phẩm, nên nếu code của hệ thống không đủ tốt, việc bảo trì sẽ tốn kém và khó khăn hơn rất nhiều
- <b>Adaptable - dễ thích ứng:</b> Hệ thống cần có khả năng phản ứng tốt với các thay đổi không mong muốn từ bên ngoài. 

### b) Tại sao cần biết về ML System Design?
- Trên thực tế, với tốc độ phát triển vũ bão của các mô hình Deep Learning và sự phức tạp của chúng, vấn đề thuật toán có lẽ đã trở nên dễ dàng hơn rất nhiều
- Thay vào đó, **việc làm thế nào để thuật toán đó có thể hoạt động với các phần khác trong hệ thống nhằm giải quyết bài toán thực tế** đã trở nên khó khăn hơn
- Khoảng hơn **60%** lỗi xuất hiện trong các ML system đến từ các yếu tố không phải ML
<div align="center">
    <img src="https://images.viblo.asia/a7d16f49-b793-41e5-a5d9-c1dfc07b9cef.png"><br>
    Nguồn: https://www.youtube.com/watch?v=hBMHohkRgAA
</div>

# 2. Sự khác biệt của ML trong reseach (nghiên cứu) và production (sản phẩm thực tế)
Một hệ thống ML trong thực tế không chỉ khác trong nghiên cứu về các vấn đề Non-ML, mà ngay cả bản thân ML model được tạo ra phục vụ production cũng sẽ khác với model được tạo ra trong quá trình research.

**Mục đích tạo ra model**: trong nghiên cứu, điều tối quan trọng là <b>performance</b>, có thể thể hiện bằng accuracy, iou,... Còn trong thực tế, mục đích tạo ra model thường để phục vụ một vấn đề định ra từ trước, nên đôi khi model được đánh giá dựa trên việc đóng góp thực hiện các yêu cầu cụ thể nào đó của khách hàng.

**Accuracy-Latency tradeoff**: bạn có thể hiểu đó là sự đánh đổi giữa độ chính xác và độ trễ. Model càng tốt thì thường sẽ phức tạp, mà phức tạp thì có xu hướng chạy chậm hơn. Chính xác cao đương nhiên tốt, nhưng nếu model chạy chậm, khách hàng sẽ quay lưng với bạn. Model cần chạy vừa đủ tốt để đạt được sự tin tưởng của khách hàng, vừa phải đủ nhanh để không có chuyện họ bỏ đi trong khi nút loading vẫn quay.<br>
Latency là vấn đề cần cân nhắc trong mọi sản phẩm IT, không phải chỉ ML. Bạn có thể tìm hiểu thêm về sự quan trọng của low latency [tại đây](https://www.azul.com/blog/low-latency-effect-application-performance/). [Thống kê của Google năm 2016](https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/) cho biết 53% người dùng smartphone sẽ thoát khỏi trang web nếu nó mất hơn 3s để load.

**Dữ liệu:** Dữ liệu trên Kaggle có thể tiêu biểu cho dữ liệu trong quá trình nghiên cứu: sạch, bất biến, và thường là dữ liệu cũ. Trong production? Hệ thống có thể thu thập dữ liệu bằng nhiều cách khác nhau, dưới nhiều định dạng khác nhau (ví dụ như cách Google thu thập dữ liệu chúng ta trên thanh tìm kiếm, drive, youtube, mua của bên thứ 3,...) vậy nên nảy sinh khá nhiều vấn đề:
- Data lộn xộn, nhiều định dạng => Phải xử lý nhiều để có thể sử dụng
- Data tăng lên liên tục, lẫn lộn cũ mới => Phải huấn luyện lại, update model liên tục, cân nhắc các yếu tố khác (data nên dùng mới hay cũ hay cả 2, hiện tượng Dataset Shift,...)
- Data Biases
- Các vấn đề liên quan đến quyền riêng tư khi sử dụng các data mới

**Phụ thuộc vào hệ thống phần mềm:** Bạn không thể viết một model bằng Julia trong môi trường sản phẩm sử dụng Python, Javascript đúng không? Hơn nữa, dữ liệu thường được thu thập qua các hệ thống Non-ML, và sẽ là vấn đề không nhỏ nếu ngôn ngữ viết model khác với ngôn ngữ của các hệ thống thu thập dữ liệu. Nói thế chứ hiện tại vấn đề này đã được Docker giải quyết kha khá
(Update: có thể sử dụng gPRC nhằm gọi các thủ tục cross language)

**Giới hạn thời gian:** nếu sản phẩm được yêu cầu làm trong thời gian nhất định, vậy việc chọn, xây dựng và huấn luyện model cũng chỉ được trong khoảng thời gian giới hạn

# 3. Thử thách về mặt kỹ thuật với các mô hình lớn
Một mô hình trong các hệ thống ML thực tế thường khá lớn, và đi kèm với đó sẽ là các vấn đề kỹ thuật cần được cân nhắc kỹ lưỡng
- Mô hình quá lớn so với các thiết bị có bộ nhớ nhỏ
- Model chạy tiêu tốn quá nhiều năng lượng
- Với các real-time model, việc chạy chậm sẽ khiến nó trở nên vô dụng (ví dụ các hệ thống gợi ý từ tiếp theo - nếu nó dự đoán chậm hơn tốc độ gõ thì có tác dụng gì không?)