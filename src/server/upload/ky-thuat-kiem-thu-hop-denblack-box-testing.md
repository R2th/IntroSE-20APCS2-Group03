Quá trình phát triển một hệ thống phần mềm bao gồm một chuỗi các hoạt động sản sinh ra mã lệnh, tài liệu. Nơi mà những sai sót của con người có thể sảy ra bất cứ lúc nào. Một lỗi có thể bắt đầu xuất hiện ngay tại lúc bắt đầu của quá trình phát triển, thiết kế, cài đặt. Vì vậy, quá trình phát triển một phần mềm phải kết hợp với một quá trình kiểm thử.

Kiểm thử phần mềm là quá trình khảo sát một hệ thống hay thành phần dưới những điều kiện xác định, quan sát và ghi lại các kết quả, và đánh giá một khía cạnh nào đó của hệ thống hay thành phần đó. 

Ba trong số những chiến lược kiểm thử phần mềm thông dụng nhất bao gồm: Kiểm thử hộp đen, Kiểm thử hộp trắng, và Kiểm thử hộp xám.

Bài viết này sẽ giúp bạn hiểu rõ hơn về kỹ thuật:  *Kiểm thử hộp đen.*

### 1. Kiểm thử hộp đen là gì(Black-Box Testing)?
  Là phương pháp kiểm thử tập trung vào yêu cầu về mặt chức năng của phần mềm mà không xem xét đến cấu trúc bên trong hoăc hoặc hoạt động của nó. Có thể tạo ra một bộ các input để kiểm thử tất     cả các chức năng của một chương trình.
  
   ![](https://images.viblo.asia/49b17302-e135-4cf3-a46d-fb9dade7ebe9.gif)
   
   Đây là phương pháp kiểm thử theo góc nhìn từ ngoài vào, người tham gia kiểm thử hộp ₫en không cần có kiến thức nào về  thông tin hiện thực thành phần phân mềm cần kiểm thử (mã nguồn của thành phần phần mềm, thuật giải ₫ược dùng, các dữ liệu ₫ược xử lý…).
###    2. Đối tượng kiểm thử
Đối tượng ₫ược kiểm thử là 1 thành phần phần mềm (TPPM). TPPM có thể là 1 hàm chức năng, 1 module chức năng, 1 phân hệ chức năng… Nói chung, chiến lược kiểm thử hộp ₫en thích hợp cho mọi cấp ₫ộ kiểm thử từ kiểm thử ₫ơn vị, kiểm thử tích hợp, kiểm thử hệ thống, kiếm thử ₫ộ chấp nhận của người dùng. 
### 3. Các bước kiểm thử hộp đen
  - Phân tích ₫ặc tả về các yêu cầu chức năng mà TPPM cần thực hiện.
  - Dùng 1 kỹ thuật ₫ịnh nghĩa các testcase xác ₫ịnh (sẽ giới thiệu sau) ₫ể ₫ịnh nghĩa các testcase. Định nghĩa mỗi testcase là xác ₫ịnh 3 thông tin sau :
*       +  Giá trị dữ liệu nhập ₫ể TPPM xử lý (hoặc hợp lệ hoặc không hợp lệ).
*       + Trạng thái của TPPM cần có ₫ể thực hiện testcase.
*       + Giá trị dữ liệu xuất mà TPPM phải tạo ₫ược.
-  Kiểm thử các testcase ₫ã ₫ịnh nghĩa.
-  So sánh kết quả thu ₫ược với kết quả kỳ vọng trong từng  testcase, từ ₫ó lập báo cáo về kết quả kiểm thử. 
### 4. Các phương pháp kiểm thử hộp đen
Vì chiến lược kiểm thử hộp ₫en thích hợp cho mọi mức ₫ộ kiểm thử nên nhiều người ₫ã nghiên cứu tìm hiểu và ₫ưa ra nhiều kỹ thuật kiểm thử khác nhau, dưới đây là 8 phương pháp kiểm thử có nhiều ưu điểm và phổ biến nhất hiện nay :
* Phương pháp phân lớp tương đương - *Equivalence Class Partitioning*
* Phân tích các giá trị biên - *Boundary value analysis*
* Kỹ thuật dùng các bảng quyết ₫ịnh - *Decision Tables*
* Kỹ thuật kiểm thử các bộ n thần kỳ - *Pairwise*
* Kỹ thuật dùng bảng chuyển trạng thái - *State Transition*
* Kỹ thật phân tích vùng miền - *Domain analysis*
* Kỹ thuật dựa trên ₫ặc tả Use Case - *Use case*
* Kỹ thuật dùng lược ₫ồ quan hệ nhân quả - *Cause-EffectDiagram*

Ngoài ra, đoán lỗi - error guessing - cũng là một phương pháp kiểm thử, trong đó các trường hợp kiểm thử - test case - được sử dụng để tìm lỗi trong các chương trình đã được phát triển - đã code - dựa vào kinh nghiệm trong các lần kiểm thử trước.
### 5. Các công cụ sử dụng để kiểm thử hộp đen
Phụ thuộc vào loại kiểm thử hộp đen bạn đang làm để lựa chọn công cụ kiểm thử sao cho phù hợp.
* Đối với các thử nghiệm chức năng / hồi quy, bạn có thể sử dụng - QTP ,  Selenium 
* Đối với các thử nghiệm không có chức năng, bạn có thể sử dụng - Loadrunner ,  Jmeter

### 6. Ưu điểm của kiểm thử hộp đen

* Kiểm thử viên được thực hiện từ quan điểm của người dùng và sẽ giúp đỡ trong việc sáng tỏ sự chênh lệch về thông số kỹ thuật => Kiểm thử viên có thể không phải IT chuyên nghiệp
* Kiểm thử hộp đen không có mối quan hệ nào liên quan đến mã lệnh và kiểm thử viên chỉ rất đơn giản tâm niệm là: một mã lệnh phải có lỗi. Sử dụng nguyên tắc " Hãy đòi hỏi và bạn sẽ được nhận ", những kiểm thử viên tìm ra lỗi mà các lập trình viên đã không tìm ra.
* Kiểm thử viên có thể được thực hiện bởi một cơ quan độc lập từ các developer, cho phép một cái nhìn khách quan và tránh sự phát triển thiên vị.
* Hệ thống thật sự với toàn bộ yêu cầu của nó được kiểm thử chính xác.
* Thiết kế kịch bản kiểm thử khá nhanh, ngay khi mà các yêu cầu chức năng được xác định.

### 7. Nhược điểm của kiểm thử hộp đen
Người ta nói kiểm thử hộp đen " giống như là đi trong bóng tối mà không có bóng đèn vậy ", bởi vì kiểm thử viên không biết các phần mềm được kiểm tra thực sự được xây dựng như thế nào. Đây là lý do mà một kiểm thử viên viết rất nhiều test case để kiểm tra một thứ gì đó mà đáng lẽ ra chỉ cần 1 ca kiểm thử là đủ, và/hoặc một số phần của phần mềm không được kiểm thử chút nào.
### 8. Mục đích của kiểm thử hộp đen
Không giống như kiểm thử hộp trắng có thể kiểm thử ở những giai đoạn đầu của quá trình kiểm thử phần mềm, phương pháp này tập trung vào phần sau của qua trình kiểm thử. Mục đích của quá trình kiêm thử hộp đen là tập trung trên vùng thông tin chứ không phải trên vùng mã chương trình. Các trường hợp kiểm thử để trả lời các câu hỏi sau:
*  Như thế nào là hàm/chức năng hợp lệ?
*  Lớp gì của thông tin đầu vào sẽ tạo ra những trường hợp kiểm thử tốt?
*  Hệ thống có khả năng bị thương tổn với một giá trị nhập vào nào đó không?
*  Ranh giới của các vùng dữ liệu có độc lập với nhau không?
*  Tỷ lệ và kích thước dữ liệu mà hệ thống có thể hứng chịu là bao nhiêu?

### 9.Vòng đời phát triển của kiểm thử hộp đen.
Kiểm thử hộp đen có chu kỳ sống riêng của nó được gọi là Vòng đời kiểm thử phần mềm ( STLC ) và nó liên quan đến mọi giai đoạn của Vòng đời phát triển phần mềm.

* **Requirement** - Đây là giai đoạn ban đầu của SDLC và trong giai đoạn này các yêu cầu được thu thập. Kiểm thử phần mềm cũng tham gia vào giai đoạn này.
* **Test Planning & Analysis**   -  Các loại thử nghiệm áp dụng cho dự án được xác định. Một kế hoạch thử nghiệm được tạo ra để xác định các rủi ro có thể xảy ra của dự án và giảm thiểu sự rủi ro của chúng.
* **Design** - Trong giai đoạn này các trường hợp / tập lệnh thử nghiệm được tạo trên cơ sở các tài liệu yêu cầu phần mềm
* **Test Execution** - Trong giai đoạn này chúng ta thực hiện các trường hợp thử nghiệm đã chuẩn bị.


 









































Tài liệu tham khảo :https://www.guru99.com/black-box-testing.html