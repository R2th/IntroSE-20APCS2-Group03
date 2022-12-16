## What is Black Box Testing?
Black box testing được định nghĩa là kỹ thuật kiểm thử, trong đó chức năng của Ứng dụng được kiểm tra (AUT) sẽ được kiểm thử mà không cần xem cấu trúc code bên trong, chi tiết thực thi và kiến thức về đường dẫn bên trong của phần mềm. Loại thử nghiệm này hoàn toàn dựa trên các yêu cầu và thông số kỹ thuật phần mềm. Trong Kiểm tra BlackBox, người kiểm thử chỉ tập trung vào đầu vào và đầu ra của hệ thống phần mềm mà không bận tâm về kiến thức nội bộ của chương trình phần mềm.

![](https://images.viblo.asia/eb1a71e9-c118-479e-895a-b8d2ab10dfc1.png)

## How to do BlackBox Testing
Dưới đây là các bước chung để thực hiện bất kỳ loại Kiểm Thử Hộp Đen - Black box testing nào.
* Ban đầu, các yêu cầu và thông số kỹ thuật của hệ thống được kiểm tra.
* Tester chọn các giá trị input hợp lệ (kịch bản thử nghiệm tích cực - positive test scenario) để kiểm tra xem hệ thống (System under test - SUT) có xử lý chúng chính xác hay không. Bên cạnh đó, một số giá trị input không hợp lệ (kịch bản kiểm thử tiêu cực - negative test scenario) cũng sẽ được chọn lựa để xác minh rằng hệ thống có thể phát hiện ra các giá trị không hợp lệ này.
* Tester xác định các output hợp lệ cho tất cả các input trước đó.
* Tester sẽ xây dựng các trường hợp kiểm thử ứng với các giá trị đầu vào được chọn.
* Các trường hợp kiểm thử được thực thi.
* Tester sẽ so sánh các giá trị output thực tế thu được với các giá trị output hợp lệ đang mong muốn thu được.
* Các lỗi phát hiện được (nếu có) sẽ được sửa và được kiểm tra lại. 

## Types of Black Box Testing
Có nhiều loại kiểm thử hộp đen, tuy nhiên dưới đây là các kiểu kiểm thử nổi bật và được sử dụng khá phổ biến:
* *Functional testing*: loại kiểm thử hộp đen này có liên quan đến các yêu cầu chức năng của một hệ thống; nó được thực hiện bởi những người kiểm thử phần mềm - tester 
* *Non-functional testing*: loại kiểm thử hộp đen này không liên quan đến kiểm thử chức năng cụ thể mà là kiểm thử các yêu cầu phi chức năng như hiệu suất, khả năng mở rộng, khả năng sử dụng.
* *Regression testing*: kiểm thử hồi quy được thực hiện sau khi sửa code, thực hiện nâng cấp hoặc thực hiện bất kỳ quá trình bảo trì hệ thống nào khác để kiểm tra rằng code mới không ảnh hưởng đến code hiện có.

## Tools used for Black Box Testing:
Các công cụ được sử dụng để kiểm thử hộp đen phần lớn phụ thuộc vào loại kiểm thử hộp đen bạn đang thực hiện.
* Functional/ Regression Tests: có thể sử dụng các tool như : [QTP](https://www.guru99.com/quick-test-professional-qtp-tutorial.html), [Selenium](https://www.guru99.com/selenium-tutorial.html)
* Non-Functional Tests: có thể sử dụng các tool như: [LoadRunner](https://www.guru99.com/loadrunner-v12-tutorials.html), [Jmeter](https://www.guru99.com/jmeter-tutorials.html)

## Black Box Testing Techniques
Sau đây là chiến lược kiểm thử nổi bật trong số nhiều chiến lược được sử dụng trong Kiểm thử hộp đen.
* **Equivalence Class Testing**: được sử dụng để giảm thiểu số lượng các trường hợp nghiệm thử đến mức tối đa trong khi vẫn duy trì phạm vi kiểm thử hợp lý.
* **Boundary Value Testing**: tập trung vào các giá trị tại các ranh giới. Kỹ thuật này xác định xem một phạm vi giá trị nhất định có được hệ thống chấp nhận hay không. Nó rất hữu ích trong việc giảm số lượng các trường hợp kiểm thử . Nó phù hợp nhất cho các hệ thống có đầu vào input nằm trong phạm vi nhất định.
* **Decision Table Testing**: là một kỹ thuật kiểm thử phần mềm được sử dụng để kiểm thử hoạt động của hệ thống bằng cách đặt nguyên nhân - causes và hệ quả - effects vào trong cùng một bảng ma trận. Đây là một cách tiếp cận có hệ thống trong đó các kết hợp đầu vào khác nhau và hành vi hệ thống tương ứng của chúng (đầu ra) được ghi lại dưới dạng bảng. Kiểm thử bảng quyết định - Decision table testing cũng được gọi là bảng [Nguyên nhân - Kết quả](https://freetuts.net/ky-thuat-kiem-thu-bang-quyet-dinh-1592.html)

## Comparison of Black Box and White Box Testing:

![](https://images.viblo.asia/095db68f-c1b3-48f5-887e-7ca222fffbc3.png)


| PARAMETER | BLACK BOX TESTING | WHITE BOX TESTING |
| -------- | -------- |-------- |
| Định nghĩa     |  là một phương pháp kiểm thử  được sử dụng để kiểm tra phần mềm mà không có kiến thức về cấu trúc bên trong của chương trình hoặc ứng dụng.    |là một phương pháp thử nghiệm mà người tester tiếp cận và hiểu biết về cấu trúc bên trong      |
| Tên gọi khác     | Nó cũng được gọi là kiểm soát dữ liệu, kiểm thử hộp - box testing, kiểm thử dữ liệu và chức năng - data and functional testing  |Nó cũng được gọi là kiểm thử cấu trúc - structured testing, kiểm thử hộp rõ ràng - clear box testing, kiểm thử dựa trên mã code - codebased testing hoặc kiểm thử hộp thủy tinh - glass box testing   |
| Nền tảng của kiểm thử   | tập trung vào những output được mong đợi; hành vi nội bộ của ứng dụng sẽ được bỏ qua.  |tập trung vào quá trình xử lý nội bộ và tester phải thực hiện kiểm thử dựa theo đó |
| Cách thức sử dụng   |lý tưởng cho các cấp độ thử nghiệm cao hơn như System testing, Acceptance testing  |phù hợp nhất cho cấp độ kiểm thử thấp hơn như Unit testing, Integration testing |
| Kiến thức lập trình   |không cần thiết để thực hiện Black box testing  |được yêu cầu phải có để thực hiện White box testing |
| Kiến thức thực thi   |không yêu cầu để thực hiện Black box testing  |hiểu một cách đầy đủ để thực hiện White box testing |
| Tính tự động  |khó để tự động hóa vì testers và programmers phụ thuộc vào nhau |có thể tự động hóa một cách dễ dàng |
| Mục tiêu  |mục tiêu chính của Black box testing là kiểm tra chức năng của hệ thống được thử nghiệm |mục tiêu chính của White box testing là kiểm tra chất lượng của code |
| Cơ sở cho các trường hợp kiểm thử |kiểm thử có thể bắt đầu sau khi chuẩn bị khác tài liệu đặc tả yêu cầu |kiểm thử có thể bắt đầu sau khi chuẩn bị cho tài liệu thiết kế chi tiết |
|Người thực hiện | end user, developer, và tester |thông thường là tester và developers|
|Độ chi tiết |độ chi tiết thấp|độ chi tiết cao|
|Phương pháp |dựa vào phương pháp thử và phương pháp lỗi|data domain và internal boudaries có được sử dụng|
|Thời gian |ít toàn diện và ít tiêu tốn thời gian|phương pháp toàn diện và tiêu tốn thời gian|
|Thuật toán kiểm thử |không phải là phương pháp tốt nhất để kiểm tra thuật toán|là phương pháp thích hợp nhất để kiểm tra thuật toán|
|Truy cập code |không yêu cầu|yêu cầu truy cập code, do đó, code có thể bị đánh cắp nếu kiểm thử được thực thi bởi 1 bên khác|
|Lợi ích |rất phù hợp và hiểu quả cho các phân đoạn mã lớn - large code segments|cho phép loại bỏ các dòng code bổ sung, có thể ẩn chứa các nguy cơ tiềm ẩn|
|Kỹ năng |tester có trình độ thấp có thể test ứng dụng mà không có kiến thức về việc thực thi ngôn ngữ lập trình hoặc hệ điều hành|cần một chuyên gia kiểm thử với nhiều kinh nghiệm để thực hiện|
|Kỹ thuật |Equivalence partitioning- phân vùng tương đương là kỹ thuật kiểm tra hộp đen được sử dụng để kiểm tra Blackbox. Phân vùng tương đương chia các giá trị đầu vào thành các phân vùng hợp lệ và không hợp lệ và chọn các giá trị tương ứng từ mỗi phân vùng của dữ liệu thử nghiệm. Phân tích giá trị biên và kiểm tra ranh giới cho các giá trị đầu vào.|Statement Coverage, Branch coverage, và Path coverage là kỹ thuật kiểm tra Whitebox. Statement Coverage xác nhận xem mỗi dòng code được thực thi ít nhất một lần. Branch coverage xác nhận xem mỗi nhánh branch được thực hiện ít nhất một lần. Path coverage kiểm tra tất cả các đường dẫn của chương trình |
|Hạn chế |cập nhật kịch bản test tự động hóa là rất cần thiết nếu ứng dụng thường xuyên được chỉnh sửa|kiểm thử tự động có thể trở nên vô dụng nếu code base được thay đổi nhanh chóng|

## Black Box Testing and Software Development Life Cycle (SDLC)
Kiểm thử hộp đen có vòng đời riêng gọi là Vòng đời kiểm thử phần mềm (STLC) và nó liên quan đến mọi giai đoạn của Vòng đời phát triển phần mềm của Kỹ thuật phần mềm.
* **Requirement**  -  Đây là giai đoạn ban đầu của SDLC và trong giai đoạn này, yêu cầu được thu thập. Người kiểm thử phần mềm cũng tham gia vào giai đoạn này.
* **Test Planning & Analysis**  -  Các loại kiểm thử áp dụng cho dự án được xác định. Một kế hoạch kiểm thử được tạo ra để xác định các rủi ro có thể xảy ra cho dự án và giảm thiểu chúng.
* **Design**  -  Trong giai đoạn này, các trường hợp / kịch bản thử nghiệm được tạo trên cơ sở các tài liệu yêu cầu phần mềm.
* **Test Execution**  -  Trong giai đoạn này, các trường hợp kiểm thử đã được chuẩn bị trước đó sẽ được thực hiện. Các lỗi xảy ra (nếu có) sẽ được sửa chữa và kiểm tra lại.

References:

https://www.guru99.com/black-box-testing.html

https://www.guru99.com/back-box-vs-white-box-testing.html