Xin chào mọi người. Trong bài viết này mình xin chia sẻ cùng mọi người về **Unit Test** trong **Laravel**.
![](https://images.viblo.asia/a533ef26-2fdd-4db6-889b-dca753421838.png)
Theo các bạn thì công việc test là công việc của ai:question::grey_question::question:  Phần lớn khi nghĩ tới test là chúng ta sẽ nghĩ ngay tới các bạn **QA** (Quality Assurance) xinh đẹp phải không nào :grin::laughing::kissing_heart:. Để trả lời câu hỏi này chúng ta sẽ cùng nhau làm rõ các khái niệm về test nhé.
# 1 - Test là gì?
Kiểm thử phần mềm là quá trình thực thi 1 chương trình với mục đích tìm ra lỗi. Kiểm thử phần mềm đảm bảo sản phẩm phần mềm đáp ứng chính xác, đầy đủ và đúng theo yêu cầu của khách hàng, yêu cầu của sản phẩm đề đã đặt ra. Kiểm thử phần mềm cũng cung cấp mục tiêu, cái nhìn độc lập về phần mềm, điều này cho phép việc đánh giá và hiểu rõ các rủi ro khi thực thi phần mềm. Kiểm thử phần mềm tạo điều kiện cho bạn tận dụng tối đa tư duy đánh giá và sáng tạo để bạn có thể phát hiện ra những điểm mà người khác chưa nhìn thấy.

Câu hỏi lớn đăt ra cho chúng ta là **AI SẼ PHẢI VIẾT TEST?** Và **DEVELOPER THÌ CÓ PHẢI VIẾT TEST KHÔNG?** 

Đơn giản mà hiểu khi chúng ta tạo ra một cái gì đó, bạn phải kiểm tra xem sản phẩm của bạn có hoạt đông không. Và ở đây cũng vậy, developer cũng phải viết test như thường :D. Một vạn câu hỏi vì sao vậy Developer và  QA khác nhau ở chỗ nào?

Để làm rõ được điều này chúng ta sẽ phân loại test thành hai loại: 
1. Kiểm thử hộp trắng  (White-box testing)
2. Kiểm thử hộp đen (Black-box testing)


### 1.1 - Kiểm thử hộp trắng (White-box testing)
Kiểm thử hộp trắng là phương pháp kiểm thử mà cấu trúc thuật toán của chương trình được đưa vào xem xét. Các trường hợp kiểm thử được thiết kế dựa vào cấu trúc mã hoặc cách làm việc của chương trình. Người kiểm thử truy cập vào mã nguồn của chương trình để kiểm tra nó. Hoặc đơn giản hơn nó là cái hộp trắng, bạn sẽ cần quan tâm những gì xử lý trong hộp trắng đó, vì trắng nhìn xuyên qua mà. Nếu quan tâm tới cụ thể code được viết như thế nào, kiến trúc ra sao, nghe khá giống với những gì developer cần làm.
### 1.2 - Kiểm thử hộp đen (Black-box testing)
Kiểm thử hộp đen là 1 phương pháp kiểm thử mà tester sẽ chỉ xem xét đến đầu vào và đầu ra của chương trình mà không quan tâm code bên trong được viết ra sao. Tester thực hiện kiểm thử dựa hoàn toàn vào đặc tả yêu cầu. Mục đích của kiểm thử hộp đen là tìm ra các lỗi ở giao diện , chức năng của phần mềm. Các trường hợp kiểm thử sẽ được xây dựng xung quanh đó.
hay nói một cách nôm na dễ hiểu khác  thì nó là cái hộp đen, bạn sẽ không cần quan tâm những gì xử lý trong cái hộp đen đó, chỉ cần cho đầu vào và xác nhận đầu ra, nghe khá giống với những gì với bộ phận QA độc lập thực hiện.
# 2 - Test-Driven Development
Phát triển hướng kiểm thử TDD (Test-Driven Development) là một phương pháp tiếp cận cải tiến để phát triển phần mềm trong đó kết hợp phương pháp Phát triển kiểm thử trước (Test First Development) và phương pháp Điều chỉnh lại mã nguồn (Refactoring).

Mục tiêu quan trọng nhất của TDD là hãy nghĩ về thiết kế của bạn trước khi viết mã nguồn cho chức năng. Một quan điểm khác lại cho rằng TDD là một kỹ thuật lập trình. Nhưng nhìn chung, mục tiêu của TDD là viết mã nguồn sáng sủa, rõ ràng và có thể chạy được.
### 2.1 - Test-Driven Development là gì?

Test Driven Development là một quy trình viết mã mới. Công việc của lập trình viên là sẽ thực hiên qua từng bước nhỏ và tiến độ, chất lượng công việc được đảm bảo liên tục bằng cách viết và chạy test tự động . Quá trình lập trình trong Test Driven Development  cực kỳ chú trọng vào các bước liên tục sau:

1. Viết 1 test cho hàm mới. Chắc chắn về việc test sẽ fail.
2. Bắt đầu viết code cơ bản nhất cho function đó để test có thể pass.
3. Tối ưu hóa đoạn code của hàm vừa viết sao cho đảm bảo test vẫn pass và tối ưu nhất cho việc lập trình kế tiếp
4. Lặp lại cho các hàm khác từ bước 1

Thực tế, nên sử dụng UnitTestFramework cho TDD (như JUnit trong Java), chúng ta có thể có được môi trường hiệu quả vì các test được thông báo rõ rang thông qua màu sắc:

* Đỏ: test fail, chuyển sang viết function cho test pass
* Xanh lá: viết một test mới hoặc tối ưu code đã viết trong màu đỏ.
# 3 - Unit Test là gì?
Unit testing bản thân nó là cái gì đó khá trừu tượng vì tùy dự án, bạn có thể quy định “unit” ở mức độ nào. Thông thường, “unit” sẽ được quy định giới hạn trong một hàm (method) hay một class. Trong một dự án web thực tế, tùy vào kinh nghiệm và kĩ năng, developer sẽ đưa ra quyết định viết các Unit testing như thế nào cho phù hợp, có thể test đầu vào đầu ra của hàm, hay kiểm tra một phần hoặc toàn bộ class.

Mỗi UT thì gửi đi 1 nội dung và kiểm tra kết quả trả về có chính xác không:

* Kết quả trả về như mong đợi
* Lỗi ngoại lệ như mong đợi

Unit test có thể là hoạt đông liên tục hoặc theo chu kỳ để kiểm tra, phát hiện lỗi kỹ thuật trong quá trình phát triển dự án, do vậy Unit test hay được gọi là kỹ thuật kiểm tra tự động.

Các đặc điểm của Unit Test như sau:

* Như người sử dụng đầu tiên của hệ thống.
* Có giá trị khi phát hiện ra vấn đề lỗi kỹ thuật.
### 3.1 - Các khái niệm trong Unit test
**Assertion**: Mô tả các công việc kiểm tra cần thực hiện, thí dụ: AreEqual(), IsTrue(), IsNotNull()… Một unit test gồm nhiều assertion kiểm tra dữ liệu đầu ra, tính chính xác của các kết quả và các vấn đề phức tạp khác như:

– Sự tồn tại của đối tượng.

– Điều kiện biên: Các giá trị có nằm trong khuôn khổ hay không

– Trình tự hoạt động của luồng dữ liệu

**Test Point**: Là một đơn vị kiểm tra nhỏ nhất, chỉ chứa đơn giản một assertion nhằm khẳng định tính đúng đắn của một chi tiết mã nào đó. Mọi thành đều có thể  viết.

**Test Case**: Là tập cha của các test point để phục vụ cho một chức năng nào đó. Ví dụ toàn bộ giai đoạn người dùng đăng ký giỏ hàng cho đến khi đăng ký thành công. Có thể không cần viết test case trong một số trường hợp khẩn cấp.

**Test Suite**: Gồm nhiều test case để kiểm tra cho một modul hay 1 hệ thống nhỏ.

**Production Code**: Là mã nguồn đã được kiểm thử thành công và bàn giao cho khách hàng.

**Unit Testing Code**: Là phần code để kiểm tra Production Code và phần này sẽ không được chuyển cho khách hàng.

### 3.2 - Vòng đời của unit test

Một unit test sẽ có 3 trạng thái chính:

* Trạng thái lỗi (Fail)
* Tạm ngừng thực hiện(Ignore)
* Trạng thái làm việc(Pass)

Tất cả các Unit test sẽ được triển khai hoạt động ở hệ thống riêng biệt. Nhiều phần mềm hỗ trợ thực hiện unit test với phần hiển thị rõ ràng.

![](https://images.viblo.asia/c4d016a7-77d3-42e6-9612-0c099de0be8a.jpg)
Unit test hiệu quả khi:


* Lăp đi lặp lại nhiều lần.
* Thực hiện 1 cách tự động.
* Tách biệt và độc lập.
### 3.3 - Ứng dụng
* Giúp kiểm tra được các thuộc tính, sự kiện, thủ tục và hàm.
* Có thể kiểm tra được trạng thái , các ràng buộc mà thông thường chúng ta không thể truy cập được.
* Kiểm tra thứ tự luồng hoạt động và mở rộng hơn là các khung làm việc.
### 3.4 - Lợi ích vủa việc sử dụng Unit Test
Chúng ta thường do dự khi phải viết Unit Test thay vì tập trung vào code cho các chức năng nghiệp vụ. Công việc viết Unit Test có thể mất nhiều thời gian hơn code rất nhiều  vậy tai sao chúng ta vẫn sử dụng. Bởi vì nó mang lại lợi ích bất ngờ:

* Môi trường tốt để kiểm tra mã nguồn, phát hiện lỗi chính xác, tổng quát được toàn hệ thống, giảm thời gian và công sức cho việc gỡ lỗi.
* Phát hiện các giải thuật có hiệu quả thấp, các function thực thi vượt quá thời gian.
* Kiểm tra các vấn đề về thiết kế và xử lý hệ thống.
* Phát hiện được các lỗi nghiêm trọng mà thông thường không thể xử thấy được.

Tác dụng rất lớn của unit test tới hiệu suất công  việc:

* Giúp phần nào cho QA tránh các công việc kiểm tra phức tạp.
* Cảm giác an tâm khi hoàn thành công việc.
* Số lượng các test case có trạng thái “pass” sẽ thể hiện hiểu  quả công việc của developer. Do đó đánh giá được năng lực của mình.

# 4 - Kết Luận.
Hy vọng là khi nói đến đây chúng ta đã biết thế nào là Kiểm thử, và việc kiểm thử áp dụng cho những đối tượng nào. Sự khác biệt giữa QA và Developer trong việc test. Cũng như unit test và lợi ích của nó. Mình xin kết thúc Phần 1 tại đây. Phần tiếp theo mình sẽ chia sẻ cách cài đặt Phpunit và tạo ví dụ Unit Test đơn giản để các bạn dễ hiểu hơn phần nào nhé. 

   **To Be Continue.....**
   # 5 - Nguồn Tham Khảo.
   [https://viblo.asia/p/http-tests-trong-laravel-4P856aYRlY3](https://viblo.asia/p/http-tests-trong-laravel-4P856aYRlY3)
   
   [https://blog.duyet.net/2015/12/unit-test-va-function-test.html#.XJDZQh9fgpg](https://blog.duyet.net/2015/12/unit-test-va-function-test.html#.XJDZQh9fgpg)