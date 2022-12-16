## 1. UAT là gì ?
Kiểm thử chấp nhận của người dùng được định nghĩa là một loại kiểm thử thực hiện bới khách hàng để xác nhận hệ thống đã làm việc đúng như mong đợi và thỏa mãn yêu cầu của người dùng. Hoạt động này được thực hiện ở giai đoạn kiểm thử cuối cùng trước khi phần mềm được đưa vào hoạt động chính thức. Mục đích của thử nghiệm này là kiểm tra lại sản phẩm để đưa sản phẩm đến release.Thử nghiệm này được thực hiện trong một môi trường thử nghiệm riêng biệt với môi trường dev. Đây là một loại thử nghiệm hộp đen trong đó hai hoặc nhiều người dùng cuối sẽ tham gia.
## 2. Ai là người thực hiện UAT?
* Khách hàng
* Người dùng cuối

![](https://images.viblo.asia/8a788e02-de9f-4679-8834-5e6a6069a273.png)
## 3.Kiểm thử chấp nhận và mô hình V-Model
Trong VModel, kiểm thử chấp nhận của Người dùng tương ứng với giai đoạn phân tích yêu cầu của vòng đời Phát triển Phần mềm (SDLC)
![](https://images.viblo.asia/7f19b889-aeda-466f-ac55-21b4a8f9057c.png)
## 4.Tại sao cần kiểm thử chấp nhận người dùng:
Kiểm thử chấp nhận của người dùng cần thiết bởi vì:
* Người phát triển xây dựng phần mềm dựa trên tài liệu phân tích yêu cầu lấy từ khách hàng nhưng tài liệu phân tích có thực sự đúng với những gì khách hàng mong đợi. 
* Các thay đổi trong quá trình dự án có được truyền đạt đến các nhà phát triển.

![](https://images.viblo.asia/b1a593c3-4a87-40a9-b889-885b2a5b99d9.png)
## 5.Điều kiện tiên quyết của kiểm tra chấp nhận người dùng
* Phải đảm bảo các yêu cầu nghiệp vụ chính của ứng dụng hoạt động
* Phần mềm đã được hoàn thiện nhất
* Các khâu kiểm thử Unit testing, integration testing, system testing đã được hoàn thành
* Không có lỗi quan trọng còn tồn tại trong hệ thống
* Lỗi về thẩm mỹ được chấp nhận trước UAT
* Regression testing phải được hoàn thành và không có lỗi lớn
* Tất cả các lỗi đã phát hiện phải được sửa và kiểm tra trước khi UAT
* Môi trường UAT phải được chuẩn bị sẵn sàng
* Nhà phát triển phải chắc chắn rằng hệ thống đã sẵn sàng thực hiện UAT
## 6.Các bước thực hiện UAT
![](https://images.viblo.asia/b94e372a-4e95-4672-b255-e7451bad1fbb.png)

* Phân tích các yêu cầu nghiệp vụ của phần mềm
* Tạo kế hoạch kiểm tra UAT
* Xác định các kịch bản kiểm thử
* Tạo các trường hợp kiểm tra UAT
* Chuẩn bị data test (giống với data thật nhất)
* Thực hiện kiểm thử
* Ghi nhận kết quả
* Xác nhận các chức năng của sản phẩm
## 7.Tiêu chí đánh giá UAT
Trước khi phần mềm được đưa đến tay người dùng, cần xem xét các yếu tố sau:
* Không có lỗi quan trọng về chức năng và cả gia diện
* Các chức năng của phần mềm hoạt động ổn định
* UAT đã họp với các bên liên quan về kết quả của việc kiểm thử
## 8.Phẩm chất của người 
Người thực hiện kiểm thử chấp nhận (UAT) phải có hiểu biết rõ về các yêu cầu của phần mềm(mục đích kinh doanh), sử dụng phầm mềm như người dùng cuối. Tuy nhiên cũng cần có tư duy phân tích các trường hợp và kết hợp dữ liệu để làm cho khâu kiểm thử UAT thành công.
## 9.Những chuẩn bị tốt nhất cho UAT
* Chuẩn bị kế hoạch UAT sớm 
* Chuẩn bị các case kiểm thử trước khi bắt đầu UAT
* Xác định rõ mục tiêu và phạm vi của UAT
* Thực hiện kiểm thử với các kịch bản và dữ liệu thực tế 
* Không đè nặng tư tưởng là người xây dựng ứng dụng mà thực hiện như một người dùng sản phẩm
* Kiểm tra khả năng sử dụng 
* Báo cáo kết quả trước khi quyết định phát hành sản phẩm
## 10.Kết luận
UAT là môt trong các loại kiểm thử được áp dụng trong kiểm thử phần mềm. Với UAT Khách hàng sẽ biết chắc chắn các tính năng mà phầm mềm đáp ứng thay vì giả định. 

Nguồn tài liệu: https://www.guru99.com/user-acceptance-testing.html