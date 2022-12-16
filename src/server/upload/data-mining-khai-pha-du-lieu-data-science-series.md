## I. Data Mining là gì?
**Data mining – khai phá dữ liệu** là quá trình phân loại, sắp xếp các tập hợp dữ liệu nhất định để xác định xu hướng, các mẫu và thiết lập các mối liên hệ hữu ích nhằm giải quyết các vấn đề nhờ phân tích dữ liệu. Mục tiêu của việc này là cho phép các doanh nghiệp có thể dự đoán được xu hướng tương lai, nhằm đưa ra các quyết định được hỗ trợ dữ liệu từ các tập dữ liệu khổng lồ

Quá trình khai phá dữ liệu là một quá trình phức tạp bao gồm kho dữ liệu chuyên sâu cũng như các công nghệ tính toán.

## II. Các giai đoạn trong Data mining
### 1.Thiết lập mục tiêu Data mining
Giống như khi chúng ta nấu ăn, bước đầu tiên chúng ta cần thiết lập mục tiêu, rằng chúng ta sẽ nấu món gì, lượng dinh dưỡng cần thiết và chi phí bỏ ra  là bao nhiêu,... Thì Data mining cũng tương tự như vậy.
Bước đầu tiên trong Data mining chính là bạn phải thiết lập mục tiêu. Rõ ràng, bạn phải xác định các câu hỏi chính cần được trả lời. Tuy nhiên, bên cạnh việc xác định các câu hỏi thì chúng ta cũng cần quan tâm đến chính là những chi phí phải bỏ ra và lợi ích từ của kết quả thu được từ Data mining. Chẳng hạn nếu bạn (hoặc công ty bạn :D ) có rất nhiều tiền, thì chi phí không phải là đối tượng mà bạn cần quan tâm nữa, bạn có thể ném càng nhiều tiền khi cần thiết để có được câu trả lời cần thiết. Tuy nhiên, sự đánh đổi giữa chi phí-lợi ích luôn là công cụ trong việc xác định mục tiêu và phạm vi của Data mining. Mức độ chính xác dự kiến từ kết quả cũng ảnh hưởng đến chi phí. Mức độ chính xác cao từ Data mining sẽ tốn kém hơn và ngược lại. Do đó, sự đánh đổi lợi ích chi phí cho mức độ chính xác mong muốn là những cân nhắc quan trọng cho các mục tiêu của task Data mining.  

### 2. Chọn dữ liệu 
Để nấu một món ăn ngon thì chúng ta cần những nguyên liệu thật sự chất lượng, tươi ngon. Và trong Data mining cũng vậy.
Đầu ra của một task Data mining phần lớn phụ thuộc vào chất lượng dữ liệu được sử dụng. Đôi khi, dữ liệu có sẵn để xử lý. Ví dụ, các nhà bán lẻ thường có cơ sở dữ liệu lớn về các giao dịch và thông tin khách hàng. 
Tuy nhiên trong một số trường hợp, dữ liệu có thể không có sẵn để sử dụng. Trong những trường hợp như vậy, bạn phải xác định các nguồn dữ liệu khác hoặc thậm chí lên kế hoạch thu thập dữ liệu mới, bao gồm các cuộc khảo sác, loại dữ liệu, kích thước và tần suất thu thập của nó có ảnh hưởng trực tiếp đến chi phí thực hiện khai thác dữ liệu. Do đó, việc xác định đúng loại dữ liệu cần thiết cho Data mining có thể trả lời các câu hỏi với chi phí hợp lý là rất quan trọng.  

### 3. Tiền xử lý dữ liệu
Tiền xử lý dữ liệu là một bước quan trọng trong Data mining. Giống như việc chúng ta phải sơ chế các nguyên liệu như rửa sạch, gọt vỏ, loại bỏ phần hư hại, thừa,.. trước khi đem chúng vào chế biến. Còn đối với dữ liệu, thông thường ban đầu dữ liệu sẽ ở dạng thô, lộn xộn, chứa dữ liệu sai hoặc không liên quan. Ngoài ra, ngay cả với dữ liệu có liên quan, thông tin đôi khi sẽ bị thiếu. Trong giai đoạn tiền xử lý, bạn xác định các thuộc tính không liên quan của dữ liệu và loại bỏ các thuộc tính đó. Đồng thời, việc xác định các điểm bất thường của tập dữ liệu và gắn cờ chúng là rất cần thiết. Ví dụ, lỗi của con người có thể dẫn đến vô tình hợp nhất hoặc phân tích không chính xác thông tin giữa các cột. Vì vậy dữ liệu phải được kiểm tra để đảm bảo tính toàn vẹn. Cuối cùng, bạn phải phát triển một phương pháp để xử lý dữ liệu bị thiếu và xác định xem dữ liệu bị thiếu ngẫu nhiên hay có hệ thống hay không.  

Nếu dữ liệu bị thiếu ngẫu nhiên, một bộ giải pháp đơn giản có thể sẽ đáp ứng được. Tuy nhiên, khi dữ liệu bị thiếu một cách có hệ thống, bạn phải xác định tác động nào khiến dữ liệu bị thiếu. Ví dụ, một lượng lớn data khách hàng của bạn bị thiếu thông tin về thu nhập, có thể họ đã từ chối tiết lộ thu nhập. Vì vậy những phân tích dựa trên thu nhập có thể sẽ không còn khách quan vì bộ dữ liệu về thu nhập là không đầy đủ. Do đó, bạn phải xem xét kỹ dữ liệu và cân nhắc loại bỏ thay vì nhắm mắt nhắm mũi đem hết chúng vào phân tích :D

### 4. Biến đổi (transform) dữ liệu
Sau khi đã tiền xử lý dữ liệu, bước tiếp theo là xác định định dạng thích hợp để lưu trữ dữ liệu. Một lưu ý trong Data mining là chúng ta cần giảm số lượng thuộc tính cần thiết xuống mức tối thiểu mà không làm mất đi những thông tin cần thiết để giải thích các hiện tượng. Tức là chúng ta sẽ chuyển đổi dữ liệu thông qua các thuật toán giảm dữ liệu, chẳng hạn như Principal Component Analysis (mọi người có thể research thêm). Ngoài ra, các biến có thể cần phải được chuyển đổi để giúp giải thích hiện tượng đang được nghiên cứu. 

Ví dụ, thu nhập của một cá nhân có thể được ghi lại trong bộ dữ liệu dưới dạng **nhiều nguồn** như:  
* Thu nhập tiền lương
* Thu nhập từ tài sản cho thuê
* Hỗ trợ các khoản thanh toán từ chính phủ
* Thu nhập khác,....
Tổng hợp thu nhập từ tất cả các nguồn này chúng ta sẽ **gom thành một thuộc tính** với chỉ số đại diện cho tổng thu nhập cá nhân.  

Thông thường bạn cần phải chuyển đổi các biến từ loại này sang loại khác. Có thể thận trọng khi chuyển đổi biến liên tục cho thu nhập thành một biến phân loại trong đó mỗi bản ghi trong cơ sở dữ liệu được xác định là cá nhân có thu nhập thấp, trung bình và cao. Điều này có thể giúp nắm bắt các phi tuyến tính trong các hành vi cơ bản.  

### 5. Lưu trữ dữ liệu 
Dữ liệu đã được chuyển đổi phải được lưu trữ ở định dạng dễ dàng cho việc Data mining. Dữ liệu phải được lưu trữ ở định dạng cung cấp các quyền đọc và ghi ngay lập tức và không hạn chế cho các Data Scientist. Trong quá trình Data mining, các biến mới được tạo ra, được ghi lại vào cơ sở dữ liệu ban đầu, đó là lý do tại sao sơ đồ lưu trữ dữ liệu sẽ tạo điều kiện đọc và ghi hiệu quả vào cơ sở dữ liệu. Nó cũng quan trọng để lưu trữ dữ liệu trên các máy chủ hoặc phương tiện lưu trữ giữ cho dữ liệu an toàn và cũng ngăn chặn thuật toán Data mining không cần thiết tìm khi  kiếm các mảnh dữ liệu nằm rải rác trên các máy chủ hoặc phương tiện lưu trữ khác nhau. An toàn và quyền riêng tư, bảo mậtr dữ liệu nên là mối quan tâm hàng đầu khi lưu trữ dữ liệu.  

### 6. Data mining
Sau khi dữ liệu được xử lý, chuyển đổi và lưu trữ một cách thích hợp, nó sẽ được mining. Bước này bao gồm các phương pháp phân tích dữ liệu, bao gồm các phương pháp tham số và không tham số, và các thuật toán Machine Learning. Chúng ta nên bắt đầu giai đoạn này bằng việc trực quan hóa dữ liệu, nó giúp chúng ta có góc nhìn đa chiều, xu hướng ấn,... về dữ liệu nhờ vào việc tận dụng khả năng vẽ đồ thị hiện đại của các phần mềm Data mining.   

### 7. Đánh giá kết quả
Sau khi kết quả đã được trích xuất từ Data mining, chúng ta cần thực hiện đánh kết quả. Đánh giá có thể bao gồm kiểm tra khả năng dự đoán của các mô hình trên dữ liệu quan sát được để xem các thuật toán đã hiệu quả chưa và hiệu quả như thế nào trong việc tái tạo dữ liệu. Điều này được gọi là "dự báo trong mẫu". Ngoài ra, kết quả được chia sẻ với các bên liên quan (stake holder) để phản hồi, sau đó được kết hợp trong các lần lặp lại sau này của Data mining để tiếp tục cải thiện quy trình.  Data mining và đánh giá kết quả trở thành một quá trình lặp đi lặp lại để các Analyst, Data Scientist sử dụng các thuật toán tốt hơn và cải thiện chất lượng kết quả được tạo ra theo phản hồi nhận được từ các bên liên quan.

#### Tham khảo từ quyển Getting Started with Data Science của IBM