***Mục đích và nội dung của một kế hoạch test gồm có:***
* Xác định phạm vi, mục tiêu và rủi ro của test
* Xác định các tiếp cận tổng thể của test
* Tích hợp và phối hợp các hoạt động test vào các hoạt động phát triển phần mềm
* Ra quyết định về những gì cần test, nhân lực và các tài nguyên khác
* Lập kế hoạch phân tích test, thiết kế, thực hiện và đánh giá các hoạt động
* Chọn số liệu để theo dõi và kiểm soát test
* Ngân sách cho các hoạt động test
* Xác định mức độ chi tiết và cấu trúc của tài liệu test

## Chiến lược test và phương pháp test
* **Alalytical:** Phân tích một số yếu tố, ví dụ như yêu cầu, rủi ro…
* **Model-Based:** Các test được thiết kế dựa trên một số mô hình về một số khía cạnh bắt buộc của sản phẩm. Ví dụ như các mô hình quy trình kinh doanh, mô hình nhà nước và mô hình tăng trưởng độ tin cậy.
* **Methodical**: Sử dụng một số bộ test hoặc điều kiện test được xác định trước, chẳng hạn như phân loại các loại lỗi phổ biến hoặc có khả năng xảy ra, danh sách các đặc điểm chất lượng quan trọng hoặc tiêu chuẩn cho ứng dụng di động hoặc trang web.
* **Processs-compliant:** Dựa trên các quy tắc và tiêu chuẩn bên ngoài, quy trình
* **Directed (Consultative):** Dựa trên lời khuyên, hướng dẫn của các bên liên quan, chuyên gia trong lĩnh vực kinh doanh hoặc chuyên gia công nghệ.
* **Regression-averse:** Tự động hóa các bộ test hồi quy và bộ test tiêu chuẩn.
* **Reactive:** Các test có thể được thiết kế và thực hiện ngay lập tức để đáp ứng với kiến thức thu được từ các kết quả test trước đó. Test thăm dò (Exploratory testing) là một kỹ thuật phổ biến được sử dụng trong các chiến lược Reactive.

## Tiêu chí đầu vào và tiêu chí kết thúc
**Tiêu chí đầu vào điển hình bao gồm:**
* Tính khả dụng của các yêu cầu có thể test, yêu cầu của người dùng, các mô hình, mô hình.
* Tính khả dụng của các mục test đã đáp ứng tiêu chí thoát cho mọi test level trước đó.
* Sự sẵn có của môi trường test
* Có sẵn các công cụ test cần thiết
* Có sẵn dữ liệu test và các tài nguyên cần thiết khác

**Tiêu chí kết thúc điển hình bao gồm:**
* Test theo kế hoạch đã được thực hiện
* Mức độ bao phủ xác định
* Số lượng defect chưa được giải quyết nằm trong giới hạn đã thỏa thuận
* Số lượng defect còn lại ước tính là đủ thấp
* Các mức đánh giá độ tin cậy, hoạt động hiệu quả, khả năng sử dụng, bảo mật và các đặc tính chất lượng khác có liên quan là đủ

## Lịch trình thực thi
* Thực thi khi các trường hợp test và quy trình test khác nhau được tạo và tập hợp lại thành các bộ test.
* Các bộ test có thể được sắp xếp trong một lịch trình thực thi test xác định mà chúng sẽ được chạy
* Lịch thực hiện test cần tính đến các yếu tố như ưu tiên, phụ thuộc, test xác nhận, test hồi quy và trình tự hiệu quả nhất để thức hiện các test.

## Các yếu tố ảnh hưởng đến Test Efford
Ước tính nỗ lực test bao gồm dự đoán số lượng công việc liên quan đến test sẽ cần để đáp ứng các mục tiêu của test cho một dự án cụ thể.
### 1. Đặc tính sản phẩm
* Những rủi ro liên quan đến sản phẩm
* Chất lượng của test basis
* Kích thước của sản phẩm
* Sự phức tạp của miền sản phẩm
* Các yêu cầu về đặc tính chất lượng. Ví dụ như bảo mật, độ tin cậy
* Mức độ chi tiết cần thiết cho tài liệu test
* Yêu cầu tuân thủ pháp luật và quy định
### 2. Đặc điểm quy trình phát triển
* Sự ổn định, trưởng thành của tổ chức
* Mô hình phát triển được sử dụng
* Phương pháp test
* Các công cụ được sử dụng
* Quá trình test
* Áp lực thời gian
### 3. Đặc điểm con người
* Kỹ năng vào kinh nghiệm của những người liên quan, đặc biệt là với các dự án và sản phẩm tương tự
* Sự gắn kết nhóm và lãnh đạo
### 4. Kết quả test
* Số lượng và mức độ nghiêm trọng của defect được tìm thấy
* Số lượng làm lại cần thiết

## Kỹ thuật ước tính test
* Kỹ thuật dựa trên số liệu: ước tính nỗ lực test dựa trên số liệu của dự án tương tự trước đây hoặc dựa trên các giá trị tiêu biểu
* Kỹ thuật dựa trên chuyên gia: ước tính nỗ lực test dựa trên kinh nghiệm của chủ sở hữu các nhiệm vụ test hoặc bởi các chuyên gia