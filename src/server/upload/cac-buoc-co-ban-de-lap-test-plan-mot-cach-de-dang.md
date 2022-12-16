## 1. Test plan là gì?
Test plan là kế hoạch kiểm tra. Trong quy trình kiểm tra phần mềm test plan là kế hoạch nhằm để định hướng công việc chính xác cần làm.

## 2. Mục đích của việc lập test plan
Khi thực hiện qui trình kiểm tra thì mục đích việc lập test plan là để mô tả và đưa ra tất cả các loại kế hoạch kiểm tra.

## 3. Các bước cơ bản để lập test plan

Để lập test plan chúng ta có 7 bước cơ bản sau:

- Xác định yêu cầu kiểm tra.

- Khảo sát rủi ro.

-  Xác định chiến lược kiểm tra.

- Xác định nhân lực, vật lực cần thiết.

- Lập kế hoạch chi tiết.

- Tổng hợp và đưa ra kế hoạch kiểm tra.

- Xem xét các kế hoạch kiểm tra.

## 4. Nội dung cơ bản của một test plan
### a. Chiến lược kiểm tra
- Đưa ra phương pháp tiếp cận để kiểm tra mục tiêu là chiến lược kiểm tra.
- Chiến lược kiểm tra bao gồm các điều kiện để biết khi nào việc kiểm tra hoàn thành và những kỹ thuật được áp dụng.
+ Mô tả các kiểu kiểm tra dùng trong dự án.
+ Với mỗi kiểu kiểm tra tương ứng kiểm tra cho chức năng nào các bạn có thể liệt kê được.
+ Việc kiểm có thể dừng khi nào.

### b. Các kỹ thuật kiểm tra: Mỗi kiểu kiểm tra phải bao gồm các đìều kiện:
Kỹ thuật:
Trong quá trình kiểm tra và các phương pháp đánh giá kết quả các bạn sẽ biết những gì sẽ được kiểm tra, mô tả việc kiểm tra như thế nào và các hoạt động chính được thực hiện ra sao.
 Điều kiện hoàn thành: 
- Xác định chất lượng chương trình được chấp nhận.
- Thời điểm ktra hoàn tất.

Các vấn đề đặc biệt: Các vấn đề gây ảnh hưởng đến việc kiểm tra.
1. Functional testing – kiểm tra chức năng
a. Kiểm tra chức năng: Function testing
b. kiểm tra giao diện người sử dụng: User interface testing
c. kiểm tra DL & tích hợp DL: Data & database integrity testing  
d. kiểm tra chu trình nghiệp vụ: Business cycle testing

2. Performance testing: Kiểm tra hiệu suất

- Performance profiling
- Load testing
- Stress testing
- Volume testing

3. Kiểm tra bảo mật & kiểm soát truy cập: Security & Access control testing

4. kiểm tra hồi qui: Regression testing

### c. Môi trường kiểm tra
- Tuỳ vào mỗi giai đoạn Intergration test, Unit test, acceptance test, System test, sẽ ứng với môi trường kiểm tra nhất định. Các bạn sẽ sử dụng như môi trường thật hay tạo môi trường giả lập gần giống với môi trường chạy thật của chương trình khi đã xác định các yếu tố để xây dựng môi trường kiểm tra.

- Test chạy chương trình bằng bản dịch hay chạy trên code. Các giai đoạn Acceptance test, System test thông thường  phải chạy trên bản dịch

-  Ta thiết lập các thông số cho CSDL gần giống hoặc giống hệt như chương trình sẽ chạy và thiết lập CSDL riêng từ Intergration test với CSDL thì thông thường.

- Thông thường, khi Unit test, có thể sử dụng mạng LAN nhưng khi System test trở đi thì nên sử dụng hệ thống đường truyền giống như hoặc gần giống như môi trường chạy thật. Điều kiện về mạng: sẽ sử dụng mạng LAN hay Dial up…

-  Trong Unit test thông thường có thể sử dụng viếc thiết lập như khi lập trình, nhưng khi System test trở đi, phải chú ý thiết lập sao cho gần giống mô hình sẽ chạy trong thực tế nhất. Mô hình sẽ cài đặt chương trình test: số lượng máy chủ, máy trạm; việc chia tách các server, các máy trạm, việc cài đặt các domain …