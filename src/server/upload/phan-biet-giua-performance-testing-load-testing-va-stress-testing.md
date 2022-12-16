**1. Performance Testing**

Kiểm thử hiệu năng là kiểm thử được thực hiện để xác định các thành phần của hệ thống đang hoạt động như thế nào trong một tình huống cụ thể. Việc sử dụng tài nguyên, khả năng mở rộng và độ tin cậy của sản phẩm cũng được xác nhận theo thử nghiệm này. 
![](https://images.viblo.asia/768347ff-d272-4a8c-8628-935736024c29.jpg)

Hình ảnh trên cho chúng ta thấy rõ rằng kiểm thử hiệu năng bao gồm cả Load testing và Stress testing. Các loại thử nghiệm khác bao gồm trong thử nghiệm hiệu năng là spike testing, volume testing, endurance testing và scalability testing. Vì vậy, kiểm thử hiệu năng về cơ bản là một thuật ngữ rất rộng.

***Mục đích của kiểm tra hiệu năng:***

Kiểm tra hiệu năng không nhằm mục đích tìm ra lỗi trong ứng dụng mà để thiết lập behavior chuẩn cho ứng dụng. Kiểm tra hiệu suất nên được thực hiện rất chính xác. Giám sát chặt chẽ hiệu năng của ứng dụng / hệ thống là đặc điểm chính của kiểm tra hiệu năng.

Behavior chuẩn của ứng dụng được đặt theo các thuộc tính như tốc độ, thời gian phản hồi, thông lượng, sử dụng tài nguyên và độ ổn định. Tất cả các thuộc tính này được kiểm tra trong kiểm thử hiệu năng.

***Ví dụ:***

Kiểm tra hiệu năng mạng ứng dụng thông qua chart Biểu đồ tốc độ kết nối với độ trễ. Độ trễ là chênh lệch thời gian giữa dữ liệu cần tiếp cận từ nguồn đến đích. Một trang 70kb sẽ mất không quá 15 giây để tải cho poor connection của modem 28,8kbps (độ trễ = 1000 mili giây), trong khi trang có cùng kích thước sẽ xuất hiện trong vòng 5 giây cho kết nối trung bình 256kbps DSL (độ trễ = 100 mili giây). Và, kết nối T1 1,5mbps (độ trễ = 50 mili giây) sẽ có behaviour chuẩn hiệu suất được đặt là 1 giây để đạt được mục tiêu này.

Một ví dụ khác là mô hình Yêu cầu phản hồi. Chúng ta có thể đặt behaviour chuẩn là chênh lệch thời gian giữa việc tạo yêu cầu và xác nhận phản hồi phải nằm trong phạm vi x ms (mili giây) và y ms, trong đó x và y là các chữ số chuẩn.
![](https://images.viblo.asia/0aedce06-eb61-4c10-ab62-640ed8f23290.jpg)


**2. Load Testing**

Load testing có nghĩa là kiểm tra hệ thống thông qua việc tăng tải liên tục và đều đặn cho hệ thống cho đến khi đạt đến giới hạn ngưỡng. Nó là một tập hợp con của kiểm tra hiệu năng.
![](https://images.viblo.asia/15c24bdd-14c6-475e-9da8-904e7deabb7b.jpg)

Load testing có thể dễ dàng thực hiện bằng cách sử dụng bất kỳ công cụ tự động hóa phù hợp nào có sẵn trên thị trường. WAPT và LoadRunner là hai công cụ nổi tiếng hỗ trợ. Loading testing thường được gọi là kiểm tra độ bền. Tuy nhiên kiểm tra độ bền chỉ tập trung chủ yếu kiểm tra hệ thống bằng cách giữ nó dưới một tải trọng đáng kể trong một khoảng thời gian duy trì.

Mục đích duy nhất của Loading testing là gán cho hệ thống công việc lớn nhất mà nó có thể xử lý để kiểm tra độ bền của hệ thống và theo dõi kết quả. 

Các thuộc tính được theo dõi trong Loading testing là hiệu suất cao nhất, thông lượng máy chủ, thời gian đáp ứng dưới các mức tải khác nhau (dưới ngưỡng ngắt), tính thỏa đáng của môi trường H / W, có bao nhiêu ứng dụng người dùng có thể xử lý mà không ảnh hưởng đến hiệu suất.

***Mục đích của Loading testing:***

Mục đích của Loading testing bao gồm:

Phơi bày các khiếm khuyết trong ứng dụng liên quan đến lỗi tràn bộ đệm, rò rỉ bộ nhớ và quản lý sai bộ nhớ. Kết quả kiểm tra tải có thể bao gồm các vấn đề băng thông, công suất của hệ thống hiện tại, v.v.

***Ví dụ:***

Để kiểm tra chức năng email của một ứng dụng, nó có thể tràn ngập 1000 người dùng cùng một lúc. Giờ đây, 1000 người dùng có thể kích hoạt các giao dịch email (đọc, gửi, xóa, chuyển tiếp, trả lời) theo nhiều cách khác nhau. Nếu thực hiện một giao dịch cho mỗi người dùng mỗi giờ, thì đó sẽ là 1000 giao dịch mỗi giờ. Bằng cách mô phỏng 10 giao dịch / người dùng, chúng ta có thể tải thử nghiệm máy chủ email bằng cách chiếm 10000 giao dịch / giờ.

Một ví dụ khác về Loading testing được hiển thị trong hình dưới đây:
![](https://images.viblo.asia/3456d4d0-a25a-404f-a2d3-2d97c67af75c.jpg)

Hình ảnh trên mô tả Loading testing được thực hiện trên JMeter. Thử nghiệm này được thực hiện để xác định có bao nhiêu người dùng mà một hệ thống có thể xử lý. Trong thử nghiệm này, 100 người dùng được thêm sau mỗi 30 giây cho đến khi tải đạt 1000 người dùng. Mỗi bước mất 30 giây để hoàn thành và JMeter đợi trong 30 giây trước khi bắt đầu bước tiếp theo. Khi tải, đạt 1000 luồng, tất cả chúng sẽ tiếp tục chạy trong 300 giây (5 phút) cùng nhau và cuối cùng dừng 10 luồng sau mỗi 3 giây.

**3. Stress testing**

Stress testing là tạo ra các hoạt động khác nhau để làm quá tải phá vỡ hệ thống. Stress testing sẽ nắm bắt được tính ổn định của ứng dụng bằng cách kiểm tra nó vượt quá khả năng băng thông của nó.

Vì vậy, về cơ bản, stress testing là đánh giá hành vi của ứng dụng vượt quá tải tối đa và điều kiện bình thường.
![](https://images.viblo.asia/10b369eb-de95-4f9c-b401-d103e6790d51.jpg)

Thách thức ở đây là thiết lập một môi trường được kiểm soát trước khi khởi chạy thử nghiệm để bạn có thể nắm bắt chính xác hành vi của hệ thống nhiều lần trong các tình huống khó lường nhất.

Các issues sẽ xuất hiện do kết quả của Stress testing có thể bao gồm các vấn đề đồng bộ hóa, rò rỉ bộ nhớ,  v.v.

Nếu Stress testing kiểm tra cách hệ thống hoạt động trong tình huống tăng đột ngột số lượng người dùng, thì đó được gọi là kiểm tra tăng đột biến.

***Mục đích của Stress testing:***

Mục đích của Stress testing là đảm bảo hệ thống không ảnh hưởng đến tính bảo mật của dữ liệu nhạy cảm sau khi xuất hiện các issues . Stress testing thành công chỉ khi hệ thống sẽ trở lại trạng thái bình thường ngay cả sau sự cố khủng khiếp nhất xảy ra.

***Ví dụ:***

Ví dụ, một trình xử lý văn bản như Writer1.1.0 của OpenOffice được sử dụng để phát triển các chữ cái, bảng tính, vv Mục đích của Stress testing là tải nó với số lượng ký tự vượt quá.

Để làm điều này, chúng ta sẽ liên tục dán một dòng dữ liệu, cho đến khi nó đạt đến giới hạn ngưỡng của nó để xử lý một khối lượng lớn văn bản. Ngay khi kích thước ký tự đạt 65.535 ký tự, nó sẽ từ chối chấp nhận nhiều dữ liệu hơn. Kết quả Stress testing trên Writer 1.1.0 đảm bảo rằng ứng dụng đó hoạt động chính xác ngay cả trong các điều kiện quá tải.

Một ví dụ khác về Stress testing được hiển thị trong hình ảnh bên dưới, mô tả 1 kiểm thử tăng đột biến thông qua việc tăng đột ngột của 7000 người dùng:
![](https://images.viblo.asia/568769e1-f8f9-44c4-975c-dd3ba484a8a0.jpg)

Trên đây là chia sẻ của mình về cách phân biệt giữa Performance testing, Load testing và Stress testing. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!