Trong bài trước mình đã có giới thiệu sơ lược về QnA Maker - một dịch vụ lưu trữ ngôn ngữ tự nhiên trên nền tảng đám mây. Tuy nhiên để có thể sử dụng chatbot linh hoạt và với xu hướng càng thân thiện với người dùng, thì hôm nay mình giới thiệu thêm về LUIS.
LUIS là một dịch vụ AI, lưu trữ các đoạn hội thoại trên nền tảng đám mây và áp dụng trí thông minh của máy để tùy chỉnh vào văn bản, ngôn ngữ tự nhiên, cách trò chuyện của người dùng để dự đoán ý nghĩa tổng thể, và đưa ra các thông tin chi tiết, liên quan, giúp quá trình trò chuyện trở nên dễ dàng, tự nhiên, linh hoạt hơn.
### Cách sử dụng LUIS trong chatbot
Sau khi Azure LUIS được published thì Client sẽ gửi văn bản đến API (điểm cuối xử lý ngôn ngữ tự nhiên) và nhận kết quả trả về ở dạng JSON.<br>
Các bước thực hiện <br>
Step 1:
Ứng dụng khách gửi cho người dùng câu nói ( câu văn ) tới điểm cuối LUIS dưới dạng một request HTTP.<br>
Step 2:
LUIS cho phép bạn tạo những mô hình tùy chỉnh theo yêu cầu để tăng thêm tính thông minh cho ứng dụng của bạn. Các mô hình ngôn ngữ học lấy văn bản đầu vào không có cấu trúc của người dùng và trả về phản hồi có định dạng JSON.<br>
Step 3:
Ứng dụng khách sử dụng phản hồi JSON để đưa ra quyết định sử dụng theo sự cần thiết cá nhân.<br>
Ứng dụng LUIS cung cấp thông tin thông minh để ứng dụng khách có thể đưa ra các lựa chọn thông minh. LUIS không cung cấp những lựa chọn đó.<br>

### Các ngôn ngữ và khu vực LUIS hỗ trợ
Ứng dụng LUIS đa ngôn ngữ, nếu bạn muốn thực hiện 1 ứng dụng LUIS chạy được trên nhiều ngôn ngữ thì bạn có thể có một vài tùy chọn bên dưới: <br>
- Nếu tất cả các ngôn ngữ bạn muốn LUIS đều có hỗ trợ, thì bạn sẽ phát triển từng ứng dụng LUIS cho mỗi ngôn ngữ.<br>
- Nếu bạn cần thực hiện ứng dụng mà có ngôn ngữ LUIS không hỗ trợ thì bạn có thể sử dụng dịch vụ Translator service (của microsoft cung cấp ) để dịch lời nói, văn bản sang loại ngôn ngữ được hỗ trợ để thực hiện các thao tác. <br>
Các ngôn ngữ LUIS hỗ trợ <br>
![](https://images.viblo.asia/b79d9f50-21ae-4f65-8ceb-b84fb01d3565.png)
*(hình ảnh được lấy từ doccument của microsoft)*<br>
* Chú ý ở ngôn ngữ Chinese thì LUIs mong muốn sử dụng chữ Hán giản thể hơn so với bộ chữ truyền thống nên cần chú ý ở tham chiếu tên miền tạo sẵn để biết thông tin ngôn ngữ được tạo sẵn. <br>
* Chú ý ở ngôn ngữ Japanese thì LUIS sẽ không phân tích cú pháp nên không phân biệt giữa Keigo với tiếng nhật thông thường, nên bạn cần kết hợp các mức độ khác nhau trong quá trình phát triển. Ví dụ で ご ざ い ま す không giống với で す. で す không giống với だ.<br>
### Các giới hạn cơ bản trong LUIS
LUIS có một số giới hạn cơ bản như sau: <br><br>
**Đầu tiên là giới hạn mô hình, kiểm soát ý định, thực thể và tính năng trong LUIS.** <br>
- App name: Tối đa số ký tự mặc định.<br>
- Applications: 500 ứng dụng cho mỗi Azure Resource.<br>
- Batch testing: 10 bộ dữ liệu, 1000 lời nói (câu văn) trên mỗi bộ dữ liệu. <br>
- Explicit list: 50 cho mỗi ứng dụng. <br>
- External entities: không giới hạn.<br>
- Intents: 500 cho mỗi ứng dụng: 499 ý định tùy chỉnh và Không có ý định bắt buộc.<br>
- List entities: Parent: 50, child: 20,000.Tên chuẩn là * tối đa ký tự mặc định. Giá trị từ đồng nghĩa không có giới hạn độ dài.<br>
- machine-learning entities + roles: composite, simple, entity role: Giới hạn 100 thực thể mẹ hoặc 330 thực thể, tùy theo giới hạn mà người dùng truy cập.  Các thành phần phụ có thể được lồng vào nhau lên đến 5 cấp độ, với tối đa 10 con mỗi cấp độ.<br>
- Model as a feature: Số mô hình tối đa có thể được sử dụng làm tính năng cho một mô hình cụ thể là 10 mô hình. Số lượng danh sách cụm từ tối đa được sử dụng làm tính năng cho một mô hình cụ thể là 10 danh sách cụm từ.<br>
- Preview - Dynamic list entities: 2 danh sách khoảng 1000 cho mỗi yêu cầu điểm cuối của kết quả dự đoán truy vấn. <br>
- Patterns: 500 mẫu cho mỗi ứng dụng. Độ dài tối đa của mẫu là 400 ký tự.<br>
- Regular expression entities: 20 thực thể Tối đa 500 ký tự.<br>
- Roles: 300 roles cho mỗi ứng dụng. 10 roles cho mỗi entity (thực thể).<br>
- Utterance: 500 ký tự. <br>
- Versions: 100 versions cho mỗi ứng dụng.<br>
- Versions name: 128 ký tự. <br><br>

**Thứ hai là giới hạn hạn ngạch dựa trên loại khóa.** <br>
![](https://images.viblo.asia/338cc6c6-cd9c-4e67-8961-06d80a34a37c.png)
- TPS là số lượng giao dịch trong 1s. <br><br>

**Thứ ba là tổ hợp bàn phím để điều khiển trang web LUIS.**<br>
- Control + E chuyển đổi giữa các mã (tokens) thông báo và các thực thể (entities) trên danh sách lời nói (utterances list).<br><br>

**Thứ tư là bản đồ khu vực thế giới trong việc sử dụng trang web của LUIS và các API điểm cuối LUIS**<br>
- Dưới đây là bảng phân bố các web của LUIS tương ứng với từng khu vực.
![](https://images.viblo.asia/9e3a96bb-1b4d-4ce9-9103-2d93c621154a.png)
- Chi tiết hơn về việc phân chia khu vực trên thới giới theo tên miền bạn có thể tìm hiểu ở link sau: https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-regions <br>

Trên đây là những thông tin mình tìm hiểu cơ bản trước khi bắt đầu vào công cuộc phát triển ứng dụng trên nền tảng LUIS.<br>
Bài viết sẽ có thể còn thiếu nhiều nội dung, mong sự đóng góp ý kiến từ bạn đọc. <br>
Xin chân thành cám ơn!


Link tham khảo: https://docs.microsoft.com/en-us/azure/cognitive-services/luis/