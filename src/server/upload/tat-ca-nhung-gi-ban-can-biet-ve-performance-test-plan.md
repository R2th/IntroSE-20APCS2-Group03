Performance Testing - Kiểm thử hiệu năng đã trở thành một tiến trình không thể thiếu trong vòng đời kiểm thử phần mềm. Để thực thi cần chuẩn bị tài liệu một cách tổng quát và chi tiết nhất. Nó bao gồm tất cả các hoạt động được thực hiện trong quá trình Performance Testing, các điều kiện tiên quyết trước khi bắt đầu Performance Testing và điều kiện để dừng lại.

Mẫu Performance Test Plan chuẩn có các phần được đề cập bên dưới. Trong bài viết này, chúng ta sẽ tập trung vào sự khác nhau của mỗi phần trong tài liệu Performance Test Plan. 

1) Background & Mục tiêu

2) Tiêu chuẩn để bắt đầu thực hiện Performance Testing

3) Phạm vi test

4) Phương pháp và lịch trình test

5) Các giả định

6) Rủi ro và dự phòng

7) Cấu hình bắt buộc và cấu hình môi trường

8) Tiêu chí để tiếp tục và dừng lại

9) Bàn giao

10) Tiêu chuẩn chấp nhận hoặc thoát

*Lưu ý*: Mô tả cho từng phần được viết chung cho các dự án. Vui lòng coi đó là tài liệu tham khảo và sửa đổi thông tin cần thiết dựa trên nhu cầu của dự án của bạn.

## Background & Objective:

### Background

Test Plan này bao gồm các hoạt động Performance Testing được thực hiện cho < Project Name >.

Đưa ra tổng quan ngắn gọn về Dự án, đề cập đến chức năng quan trọng nhất cùng với mục tiêu chức năng của chúng.

### Mục tiêu:

Mục tiêu chính của Performance Testing trên <Project Name> là để đảm bảo thời gian phản hồi của ứng dụng cùng với giới hạn dự kiến cho 100 người dùng đồng thời.(Số lượng người dùng đề cập đến có thể thay đổi tùy vào yêu cầu cụ thể của từng trang / chức năng) Đề cập đến tất cả các tài liệu yêu cầu được lấy làm tài liệu tham khảo để chuẩn bị Performance Test Plan này.

## Tiêu chuẩn để bắt đầu thực hiện Performance Testing
 
Điều kiện tiên quyết để thực hiện Performance Testing là:

- UAT server khả dụng khi thực hiện Load Testing. 

- Quá trình phát triển dự án phải được hoàn thành và tất cả code phải được freeze. Code mới nhất sẽ được triển khai trên UAT server. 

- Ứng dụng không được tồn tại các Bug chức năng như Blocker, Critical và Major.

- Cơ sở hạ tầng phần cứng dự kiến ​​phải có sẵn để thực hiện Performance Testing. 

- Phiên bản mới nhất của Performance Testing phải được khách hàng ký tên. 

- Có đủ Test Data để sử dụng trong hoạt động Performance Testing. Test Data phải được khách hàng xác thực.

## Phạm vi test

Ở đây chúng ta đề cập đến các Page và danh sách chức năng được xác định cho Performance Testing. Để dễ dàng hình dung, ta hiển thị nó dưới dạng bảng như sau:

Ví dụ về trang web Thương mại điện tử:

![](https://images.viblo.asia/5d343e1b-02b0-4fe8-a08a-55e8b72a9ba6.png)

*Ghi chú:*

- Liệt kê các scenarios để đưa vào hoạt động Performance Testing. 

- Vẫn phải chú ý đến tất cả các chức năng / tính năng sẽ không được đưa vào (ngoài phạm vi).

### Người dùng đồng thời

Hệ thống sẽ hỗ trợ trung bình là trên 50 người dùng đồng thời tại bất kỳ thời điểm nào. Nếu yêu cầu có đề cập đến số lượng người dùng đồng thời cụ thể của trang / chức năng thì bạn có thể thay đổi để phù hợp với yêu cầu.
 
## Phương pháp và lịch trình test

### Dưới đây là phương pháp test cho < Project Name >:

- Performance Test Plan sẽ do QA chuẩn bị. 

- Performance Test scripts sẽ được chuẩn bị bởi QA. 

- Test Plan sẽ được xem xét bởi Trưởng nhóm test và quản lý dự án. 

- Test Plan sẽ được Khách hàng ký. 

- Development team sẽ chịu trách nhiệm chuẩn bị môi trường test.

- Test script sẽ được thực thi trên Test server chuyên dụng. 

- Development team sẽ tham gia vào hoạt động điều chỉnh hiệu năng. 

- Performance Test reports sẽ được chuẩn bị bởi QA.

Để có kết quả đáp ứng được thời gian gần nhất có thể, với mỗi chu kỳ test, Mỗi scenario sẽ được chạy thử 2 lần  và dựa trên kết quả đạt được, thời gian phản hồi trung bình của 2 lần chạy sẽ được tính toán. Thời gian phản hồi trung bình của các page sẽ được xem xét và tính toán trong các quá trình test.

### Lịch trình test

Trong phần này, bạn cần phải đề cập đến khoảng thời gian cho mỗi nhiệm vụ bắt đầu từ việc chuẩn bịTest Plan, Test script và thực thi test.

## Các giả định

Sau đây là các giả định được thực hiện (Thêm / Loại bỏ theo yêu cầu của bạn):

- Tài liệu Performance Test Plan được nhóm khách hàng chuẩn bị và ký tên. 

- Tài liệu hướng dẫn Script workflow được Quản lý dự án đăng ký và ký tên. 

- Performance Testing sẽ được thực hiện trên môi trường chuyên dụng và được kiểm soát. 

- Việc thực hiện Performance Testing sẽ được thực hiện trên cùng một bản build và bản build này cũng là bản Production.

- Cơ sở dữ liệu trong môi trường thử nghiệm là bản sao của Cơ sở dữ liệu Production.
Rủi ro và dự phòng

- Test scripts được chuẩn bị trong các bản build trước đó thường không đáng tin cậy đối với các bản build mới nhất do các thay đổi chức năng và sửa lỗi. Vấn đề này sẽ tốn thêm thời gian và chi phí build lại các script trên bản build mới nhất. 

- Thời gian server được lên kế hoạch / không được lập kế hoạch trong khi thực hiện Performance Testing sẽ ảnh hưởng đến công việc test. Sự chậm trễ trong việc thực hiện sẽ được báo cáo đến các chủ sở hữu bởi Người quản lý dự án. 

- Không có required resources có thể cản trở việc test. Sự chậm trễ này sẽ được Nhóm QA truyền đạt cho PM / TL. 

- Build không ổn định hoặc tính khả dụng của Trình Blocker/Critical nghiêm trọng có thể ảnh hưởng đến lịch biểu Performance Testing. 

- Thay đổi trong ứng dụng/server/test data/ cấu hình có thể ảnh hưởng đến yêu cầu sửa đổi performance test script(s). Nó cũng có thể ảnh hưởng đến lịch trình Load testing.

## Cấu hình bắt buộc và cấu hình môi trường

Ở đây bạn cần phải đề cập đến cấu hình môi trường test (UAT và / hoặc Production) + Thông tin cơ sở dữ liệu.

Máy test : Bắt buộc phải có 4 máy thử nghiệm với RAM tối thiểu 8 GB và băng thông cao ở đầu client. Máy test phải có JDK 1.6 trở lên và cài đặt JMeter 2.12 hoặc cao hơn.

### Công cụ / Phần mềm:

**Jmeter** - Để thực hiện test và thực thi performance test script record. Nó chèn các load threads và nắm bắt thời gian phản hồi của hệ thống.

**YSlow** - YSlow được sử dụng để đo lường hiệu năngcủa page cụ thể với người dùng đơn lẻ.

**JConsole** - Dùng để theo dõi hiệu năng. Được sử dụng để giám sát hiệu năng của các server khi đang tải. Điều này sẽ được cài đặt trên tất cả các server của ứng dụng để thực hiện performance testing.

## Tiêu chí để tiếp tục và dừng lại

Performance testing sẽ bị tạm ngưng trong các điều kiện dưới đây:

- Hệ thống không sẵn sàng

- Server bị tạm ngưng trong một thời gian với một lý do không được chắc chắn.

- Ứng dụng có Blocker / Critical  chưa được xử lý.

- Các yếu tố tiên quyết bắt buộc không có sẵn.

Performance testing sẽ được tiếp tục trong các điều kiện dưới đây:

- Hệ thống có sẵn.

- Máy chủ có sẵn, sẵn sàng hoạt động.

- Blocker / Critical quan trọng được giải quyết và khắc phục.

- Các yếu tố tiên quyết bắt buộc được giải quyết và Ứng dụng hoạt động.

## Bàn giao

Nhóm QA sẽ chịu trách nhiệm chuẩn bị Performance Test Plan và thực thi các Script.

Trong khi các Test Script thực thi thì báo cáo được tạo sẽ được xuất.

## Tiêu chuẩn chấp nhận hoặc thoát

- Kết quả Performance testing phù hợp với các yêu cầu dự kiến được đề cập trong phần “Phạm vi kiểm tra” của Test plan này.

- Không có vấn đề về Hiệu năng nào ở trạng thái Open đối với tất cả các tính năng.


***Bài viết được dịch lại từ nguồn:*** http://www.testingjournals.com/performance-test-plan/