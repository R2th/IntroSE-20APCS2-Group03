Sau bao nhiêu năm làm việc ở vị trí IT ở 1 trường Cao Đẳng X. Tôi nhận ra một điều, công việc đó quá nhàm chán và tôi muốn làm việc tại một môi trường năng động hơn.
Nhưng sau vài năm hầu như không động đến dòng code nào, làm sao để có thể apply vào một công ty phần mềm.
Sau khi nhận được vài lời khuyên của một vài người bạn, tôi có tham gia một khóa học tester và tìm tòi các kiến thức trên mạng.
Sau đây tôi xin chia sẻ những kiến thức cơ bản về Tester mà tôi đã học được.
Mong đây là nguồn kiến thức hữu ích với bạn trẻ nào quan tâm tới công việc này.

## I. Quy trình kiểm thử phần mềm theo tiêu chuẩn CMMI
![](https://images.viblo.asia/1fbb7292-378c-4687-9ddb-f710b11ed7d7.png)
![](https://images.viblo.asia/44c74602-f9c0-44ee-8e46-12d3b9b397e5.PNG)

## II. Mô hình V-mode trong phần mềm
![](https://images.viblo.asia/17ccb96e-63c1-4a87-aea6-ea16d54c7078.PNG)
Tương ứng mỗi giai đoạn của chu kỳ phát triển là giai đoạn kiểm thử tương ứng.
Phía bên trái của mô hình chữ V là giai đoạn (vòng đời) phát triển phần mềm. 
Phía bên phải của mô hình chữ V là các hoạt động kiểm thử tương ứng.
Tinh thần chủ đạo của V-model là các hoạt động kiểm thử phải được tiến hành song song (theo khả năng có thể) ngay từ đầu chu trình cùng với các hoạt động phát triển. 

## III. 4 mức Test cơ bản trong kiểm thử phần mềm
1. Unit Test
- Là kiểu test kiểm tra code xem liệu chức năng nó đang thực hiện có đúng cách như mong đợi theo như yêu cầu hay ko.
- Nó được thực hiện bởi DEV
- UT là kỹ thuật kiểm nghiệm các hoạt động của mọi chi tiết mã (code) với một quy trình tách biệt với quy trình phát triển PM, giúp phát hiện sai sót kịp thời. UT còn có thể giúp phát hiện các vấn đề tiềm ẩn và các lỗi thời gian thực ngay cả trước khi chuyên viên kiểm định chất lượng (QA - Quality Assurance) tìm ra, thậm chí có thể sửa lỗi ngay từ ý tưởng thiết kế.
2. Integration Test
- Là kiểu Test tích hợp 2 hay nhiều module lại với nhau.
- Nhằm kiểm tra xem hệ thống có đáp ứng được yêu cầu của khách hàng hay không. 
- Thực hiện sau khi tất cả các Unit Test được Pass. 
3. System Test
- Là kiểu test được thực hiện sau khi chương trình đã pass qua các mức như là UnitTest & Intergration Test
- Nhằm kiểm tra xem chương trình có đáp ứng được yêu cầu của người dùng hay không.
- Và chắc chắn ứng dụng chạy tốt trên môi trường thật dữ liệu thật
- Trong môi trường test, một vài điều không thể test hoặc thao tác . Tất cả sẽ khác nhau và cơ sở dữ liệu khác nhau, một số thao tác có thể không làm việc như mong đợi khi ứng dụng được chuyển từ môi trường test sang môi trường sản phẩm (test enviroment to production environment).
4. Acceptance Test
- Là Test chấp nhận người dùng. Trong kiểu test này, phần mềm sẽ được kiểm tra từ người dùng nhằm để kiểm tra xem phần mềm có phù hợp với sự mong đợi của người dùng và thực hiện đúng như mong đợi. Trong giai đoạn test này, tester có thể cũng thực hiện hoặc khách hàng có các tester của riêng họ để thực hiện.

## IV.Một số kiểu test khác
1. Regression Test
- Test hồi quy là kiểu test mà sau khi đã pass qua các mức test, trước khi giao cho khách hàng phải test hồi quy lại một lần nữa để đảm bảo không còn bug .
- Hoặc có thể là khi có một sự thay đổi nào đó về chương trình, hay có một bug được fix nhằm đảm bảo sự thay đổi đó hay bug đã fix đó không làm ảnh hưởng đến các phần khác của chương trình.
- Phương pháp test: sử dụng tất cả các test case đã test trước đó, các testcase được thêm mới theo yêu cầu của khách hàng, và những TC liên quan mà ta nghi ngờ là có lỗi.
2. Load testing
- Là kiểu test kiểm tra thời gian đáp lại người dùng với ứng số lượng người dùng bất kỳ trong một ngữ cảnh nào đó của cùng một ứng dụng tại cùng một thời điểm.
3. STress testing
- Là kiểu test kiểm tra thời gian đáp lại người dùng với ứng số lượng người dùng bất kỳ trong nhiều ngữ cảnh khác nhau của cùng một ứng dụng tại cùng một thời điểm.
4. Performance testing
- Trong loại test này, ứng dụng được test dựa vào sức nặng như sự phức tạp của giá trị, độ dài của đầu vào, độ dài của các câu truy vấn...Loại test này kiểm tra bớt phần tải (stress/load) của ứng dụng có thể được chắc chắn hơn.

## Tổng kết:
Trong phần này các bạn đã biết về các kiến thức:
- Quy trình kiểm thử phần mềm theo tiêu chuẩn CMMI
- Mô hình V-mode trong phần mềm
- Các mức test, kiểu test cơ bản.
Hẹn gặp lại các bạn ở các phần sau, chúng ta sẽ tìm hiểu về các phương pháp kiểm thử.