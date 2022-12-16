**Ở phần 1, mình đã đề cập đến các nội dung:**
* Vòng đời phát triển của các ứng dụng Game/Desktop.
* Kiểm thử Game và Kiểm thử phần mềm khác nhau như thế nào.
* Các kiểu của kiểm thử Game.

**Trong phần 2 này, mình sẽ tiếp tục đề cập đến các vấn đề còn lại:**
* Chơi Game hỗ trợ sử dụng các công nghệ thích ứng (phục vụ hỗ trợ cho người khuyết tật).
* Các chỉ số đo lường Game mà một tester nên biết.
* Các rủi ro chính trong việc test Game.

**4. Chơi Game hỗ trợ sử dụng các công nghệ thích ứng**

![](https://images.viblo.asia/c5cebd63-b15e-40bb-8ff1-86d86ac7c161.png)

Trò chơi hỗ trợ còn được gọi là trò chơi tiếp cận. Các tính năng được thiết kế sử dụng công nghệ thích ứng cho các cá nhân bị khuyết tật khác nhau như thị lực kém, mờ mắt, mù lòa, không có khả năng phân biệt màu sắc, lời nói, thính giác, suy giảm nhận thức, vận động và di chuyển.

Cardinal Direction (CD), Tower of London (TOL) là hai trò chơi phổ biến đã được sửa đổi cho người dùng bị vấn đề về trực quan. Trong các trò chơi này, việc sử dụng thị giác được thay thế bằng đầu vào âm thanh.

Một tester sẽ cần lưu ý những điểm sau đây sau khi thực hiện test một trò chơi như vậy:
* Các màu sẽ nhấp nháy theo một mẫu và các âm thanh sẽ phát cho từng màu. 
* Mỗi màu nên được đi kèm với một âm thanh nghe được.
* Dữ liệu trực quan cần được mô tả bằng từ ngữ để người khiếm thị không phải đối mặt với bất kỳ vấn đề nào nhận được thông qua việc sử dụng những bộ đọc màn hình.
* Người chơi nên nghe những âm thanh trong trò chơi theo không gian ba chiều và phải định hướng từ bằng cách sử dụng  m thanh 3D và âm thanh không gian trên màn hình cảm ứng.

**5. Các chỉ số đo lường Game mà một tester nên biết**

**DAU / MAU (Người dùng hoạt động hàng ngày / Người dùng hoạt động hàng tháng)**: Đây là tỷ lệ người dùng hoạt động chơi mỗi ngày so với số người dùng hoạt động hàng tháng. Tỷ lệ này cho thấy một ứng dụng giữ chân người dùng tốt như thế nào và thường được gọi là độ kết dính của trò chơi. Số liệu này cho bạn thấy tần suất người dùng đăng nhập vào ứng dụng của bạn. Số liệu này sẽ dễ dàng hơn để thảo luận với một ví dụ. Ví dụ với một ứng dụng có 100.000 MAU và trung bình 15.000 DAU. Như vậy, tỷ lệ DAU / MAU sẽ là 15 phần trăm. Điều này có nghĩa là người dùng trung bình đăng nhập vào khoảng 15 phần trăm số ngày trong tháng đó. Vì đây là tỷ lệ, chỉ số DAU / MAU chỉ có thể là giá trị giữa 0 và 1. Giá trị gần hơn với 1, có nghĩa là người dùng đang mở ứng dụng với tỷ lệ phần trăm ngày cao hơn. Các ứng dụng mạng xã hội phổ biến như Facebook đã báo cáo tỷ lệ DAU / MAU cao tới 50%. Nhưng hầu hết các ứng dụng chơi game thành công có tỷ lệ gần hơn 20%.

![](https://images.viblo.asia/e87a4d95-755d-45d6-9a4a-f763adb0213e.png)

**Phiên**: Mỗi khi bất kỳ người dùng nào mở ứng dụng, sẽ được tính là một phiên. Ở đây tập trung vào số phiên trung bình trên mỗi DAU.

**Xếp hạng tải xuống**: Thứ hạng của một trò chơi trong một cửa hàng ứng dụng cụ thể (iOS, Android Play) theo lượt tải xuống trò chơi hàng tháng.

**Sự duy trì việc sử dụng**: Đây là thước đo rất quan trọng trong một trò chơi miễn phí. Để tính toán duy trì, hãy tách người dùng thành các nhóm dựa trên ngày ứng dụng được tải xuống. Ngày tải xuống xảy ra là Ngày 0. Nếu người dùng mở ứng dụng của bạn vào ngày hôm sau (Ngày 1), họ sẽ được đánh dấu là giữ lại. Nếu họ không mở ứng dụng, họ sẽ không được đánh dấu là giữ lại. Tính toán này được thực hiện cho toàn bộ người dùng mỗi ngày sau khi họ tải xuống ứng dụng. Ngày thường được sử dụng để duy trì là 1, 3, 7 và 30.

![](https://images.viblo.asia/bfac66a8-c4f2-426c-844c-725817867fe2.png)

**Chỉ số hiệu năng**: Đây là để theo dõi hiệu năng của các trò chơi trực tuyến hoặc các trò chơi liên tục. Tốc độ khung hình mà trò chơi thực thi trên nền tảng phần cứng khác nhau hoặc trong trường hợp máy chủ game, thước đo về độ ổn định và hiệu năng của game có thể được sử dụng để theo dõi việc thay đổi các tính năng và các bản cập nhật.


**6. Các rủi ro chính trong việc test Game**

* Trò chơi không tạo ra trải nghiệm hấp dẫn cho đối tượng mục tiêu của nó.
* Trò chơi không có thiết kế lấy người chơi làm trung tâm.
* Yếu tố thú vị và lối chơi gây nghiện còn thiếu trong các trò chơi.
* Trò chơi không độc đáo, cạnh tranh, có nhịp độ đủ nhanh.
* Trò chơi thất bại vì các vấn đề kỹ thuật, tính năng bị hỏng, lỗi nghiêm trọng, âm nhạc tệ và video kém.
* Chi phí phát triển trò chơi vượt quá ngân sách.
* Trò chơi nên có thiết kế thẩm mỹ và lôí chơi đơn giản.

![](https://images.viblo.asia/3196ada1-94ef-4d71-a5b2-04229c9e348e.png)

**7. Tóm tắt bài viết**

* Vòng đời phát triển trò chơi bao gồm ba giai đoạn: Giai đoạn trước khi phát triển sản phẩm, giai đoạn phát triển sản phẩm và giai đoạn test và release sản phẩm.
* Kiểm thử game là một quá trình lặp đi lặp lại, mỗi bản build mới đều có thể có lỗi và do đó, nó đều phải được kiểm tra kỹ lưỡng.
* Các loại test khác nhau là 1) Test chức năng, 2) Test  tương thích, 3) Test  hiệu năng, 4) Test tính tuân thủ, 5) Test tính bản địa hóa, 6) Test ngâm, 7) Test tính khôi phục, 8) Test  bảo mật.
* Kiểm thử hộp trắng cho các game tập trung vào các khía cạnh kiến ​​trúc, tích hợp và hệ thống của game di động bao gồm 1) kiểm tra mã 2) kiểm tra tập trung 3) Phân tích dữ liệu 4) Kiểm tra đường và dòng chảy 5) Kiểm tra thuật toán cụ thể 6) Phân tích trí thông minh nhân tạo.
* Game hỗ trợ còn được gọi là game tiếp cận. Các tính năng được thiết kế bằng công nghệ thích ứng cho cá nhân.
* Một số số liệu trò chơi quan trọng là DAU / MAU, Phiên, Xếp hạng tải xuống, việc duy trì game trên máy khách hàng và hiệu suất.
* Rủi ro chính của việc test game là nó không tạo ra trải nghiệm hấp dẫn cho đối tượng mục tiêu.

**8. Liên kết tham khảo**

https://www.guru99.com/game-testing-mobile-desktop-apps.html