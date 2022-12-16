Để tạo ra một sản phẩm phần mềm thì giai đoạn phát triển phần mềm là giai đoạn quan trọng. Nhưng sản phẩm đó đã đáp ứng được yêu cầu của người dùng chưa thì thì giai đoạn kiểm thử phần mềm cũng không thể bỏ qua. Vậy giai đoạn kiểm thử phần mềm sẽ được thực hiện ở thời điểm nào? Để trả lời được câu hỏi này thì việc nắm rõ mô hình phát triển mềm là điều rất quan trọng.  Nó sẽ giúp bạn có cái nhìn định hướng và xây dựng hoạt động kiểm thử đúng đắn, hiệu quả và phù hợp hơn. 
Đã có rất nhiều các mô hình phát triển phần mềm ra đời như WaterFall, V-model,... Và hiện nay mô hình Agile đang là mô hình phát triển phẩm mềm linh hoạt và rất phổ biến.
  
##   Vậy mô hình kiểm thử Agile là gì?

Không giống như mô hình WaterFall, việc kiểm thử trong mô hình Agile có thể thực hiện ngay từ khi bắt đầu dự án, trong đó việc phát triển và kiểm thử được tiến hành song song với nhau. Nếu quy trình phát triển trong mô hình WaterFall là tuần tự, việc kiểm thử chỉ được thực hiện sau khi giai đoạn phát triển đã hoàn thành xong thì với Agile việc kiểm thử diễn ra liên tục từ đầu cho đến khi kết thúc dự án. 
Agile là mô hình phát triển phần mềm linh hoạt, dựa trên phương thức lặp (iterative) và tăng trưởng (incremental). Nó sẽ gắn kết khách hàng vào quy trình phát triển của phần mềm, mọi người cố gắng cho ra sản phẩm càng nhanh càng tốt. Sau đó đưa cho khách hàng dùng thử và phản hồi lại, đội ngũ phát triển sẽ tiếp tục phát triển các giai đoạn tiếp theo. Tùy vào dự án mà thời gian release ra sản phẩm dài hay ngắn (có thể 1 tuần, hoặc cũng có thể kéo dài 4 tuần).

Bài viết này chúng ta hãy cùng tìm hiểu về những vấn đề sau:

* Test Plan trong Agile.
* Agile Testing Strategies.
* Agile Testing Quadrant.
* Những thách thức đối với QA trong mô hình phát triển phần mềm Agile.
* Rủi ro của Automation trong Agile process.

# Test Plan trong Agile
Không như trong mô hình WaterFall, kế hoạch kiểm thử trong mô hình Agile được viết và update liên tục trong mỗi lần release. Kế hoạch kiểm thử điển hình trong Agile bao gồm:

1. Phạm vi test
2. Những chức năng mới sẽ cần test
3. Test level và test type
4. Load test và Performance test
5. Phân tích cơ sở hạ tầng
6. Các rủi ro và giải pháp
7. Nguồn lực
8. Sản phẩm bàn giao và mốc thời gian

# Agile Testing Strategies
Quy trình kiểm thử trong mô hình Agile gồm 4 giai đoạn:

![](https://images.viblo.asia/40361c9c-2555-4978-bd0d-78a0d9133a3d.PNG)

### (a) Iteration 0
Trong giai đoạn đầu tiên hay còn gọi là iteration 0, bạn sẽ thực hiện những task khởi tạo đã được thiết lập bao gồm xác định những người tham gia kiểm thử, cài đặt tool test, lên kế hoạch quản lý resource. Cụ thể bao gồm các bước sau:

* Thành lập các business case cho dự án
* Thiết lập các boundary condition và phạm vi dự án
* Vạch ra những yêu cầu và use case quan trọng cần cân nhắc để triển khai
* Phác thảo một vài kiến trúc có thể áp dụng cho dự án
* Xác định các rủi ro
* Estimate chi phí và chuẩn bị một dự án sơ bộ

### (b) Construction Iterations
Giai đoạn thứ 2 trong quá trình kiểm thử đó là Construction Iterations, phần lớn các công việc kiểm thử sẽ được thực hiện trong giai đoạn này. Giai đoạn này được xem như là một tập hợp các vòng lặp và tăng trưởng, qua đó giải pháp dần được xây dựng. Để làm được điều đó, trong mỗi một vòng lặp team sẽ thực hiện một kết hợp các thực hành như XP, Scrum, Agile modeling, hay agile data, v.v.

Trong Construction Iteration, team sẽ thực hiện các yêu cầu được ưu tiên. Với mỗi vòng lặp, yêu cầu thiết yếu nhất sẽ được chọn từ backlog và thực hiện. 

Construction Iteration được chia thành 2 phần: Confirmatory tesing và Investigative tesing. Confirmatory tesing tập trung vào xác minh xem hệ thống có đáp ứng được mục đích của các bên liên quan giống như mô tả mà team nhận và thực hiện hay không. Trong Investigative testing,  người kiểm thử xác định các vấn đề mà team đã bỏ sót hoặc bỏ qua, ngoài ra Investigative testing còn kèm thêm integration testing, load/stress tesing và security testing.

Ngoài ra, confirmatory testing có hai khía cạnh thử nghiệm đó là developer testing và acceptance testing. Cả hai đều được đưa regression testing vào trong suốt lifecycle. Confirmatory testing tương đương với kiểm thử kỹ thuật.

Agile acceptance testing là sự kết hợp giữa kiểm thử chức năng truyền thống và kiểm thử chấp nhận truyền thống với tư cách là nhóm phát triển và các bên liên quan đang thực hiện nó cùng nhau. Developer testing là sự kết hợp giữa unit testing và integration testing. Developer testing còn xác minh cả ứng dụng của code và lược đồ về database.

### (c) Release (End Game)
Mục tiêu của "Release, End Game" là để deploy hệ thống một cách thành công lên production. Hoạt động trong giai đoạn này bao gồm training end user, support mọi người sử dụng sản phẩm. Ngoài ra, nó còn bao gồm maketing sản phẩm, back-up, restoration, hoàn thiện hệ thống và tài liệu.

Giai đoạn kiểm thử cuối cùng bao gồm system testing và acceptance testing. Để giai đoạn này có thể kết thúc tốt đẹp, bạn cần đảm bảo đã kiểm thử một cách kĩ lưỡng sản phẩm khi nó còn ở trong các vòng lặp. Trong giai đoạn cuối, những người thử nghiệm sẽ làm việc với những lỗi còn lại của chương trình.

### (d) Production
Sau giai đoạn release, sản phẩm sẽ chuyển sang giai đoạn production.

# Agile Testing Quadrant
![](https://images.viblo.asia/7ae9f172-926d-4df5-af2d-0cd83cbaba79.PNG)

Agile Testing Quadrant tách tiến trình kiểm thử thành 4 góc giúp ta hiểu về cách thực hiện kiểm thử trong Agile

### (a) Agile Quadrant I
Chất lượng của mã nguồn là mục tiêu chính cần quan tâm trong Quadrant này. Nó bao gồm các ca kiểm thử (theo hướng công nghệ) bao gồm:

1. Unit tests
2. Component Test

### (b) Agile Quadrant II
Các trường hợp kiểm thử phần này tập trung vào bussiness logic dựa trên requirement. Các loại kiểm thử trong Quadrant này bao gồm:

1. Scenario và workflows testing
2. User experience testing
3. Pair testing

### (c) Agile Quadrant III
Quadrant này cung cấp các phản hồi cho Quadrant I và Quadrant II. Các trường hợp kiểm thử ở Quadrant này sẽ được sử dụng để là cơ sở thực hiện Automation test. Trong Quadrant này, việc kiểm thử của vòng lặp được review và thực hiện để đảm bảo tính tin cậy của sản phẩm. Các loại kiểm thử được thực hiện trong Quadrant này gồm có:

1. Usability Testing
2. Exploratory Testing
3. Pair testing with customers
4. Collaborative testing
5. User acceptance testing

### (d) Agile Quadrant IV
Quadrant này tập trung vào kiểm tra các yêu cầu phi chức năng như performance, security, stability... Các loại kiểm thử trong Quadrant này bao gồm:

1. Non-fucntion test như stress test, performance test
2. Security test
3. Infrastructure test
4. Data migration test
5. Scalability test
6. Load test

# Những thách thức đối với QA trong mô hình phát triển phần mềm Agile 
* Trong Agile, QA có cơ hội phát hiện lỗi sớm, tuy nhiên tài liệu lại ít được coi trọng hơn do đó phải mất nhiều effort để study spec
* Các feature mới được đưa ra rất nhanh, chính vì vậy mà nhóm kiểm thử không có đủ thời gian để xác định xem liệu tính năng này có đang tuân theo yêu cầu hay không và liệu rằng nó có giải quyết được các bussiness hay không
* Người kiểm thử thường được yêu cầu phải tham gia như một semi- developer role
* Chu kì thực hiện execute test bị dồn lại rất nhiều
* Có rất ít thời gian để chuẩn bị test plan
* Chỉ có một khoảng thời gian tối thiểu để thực hiện test hồi qui
* Vai trò của QA cũng có sự thay đổi, từ một người quản lý chất lượng đơn thuần dưới những yêu cầu đã có sẵn sang một partner, một người tham gia vào phân tích, đóng góp ý kiến về chất lượng sản phẩm cùng khách hàng và đội phát triển.
* Luôn phải đối mặt với thay đổi và cập nhật liên tục

# Rủi ro của Automation trong Agile process
* Automated UI cung cấp mức độ tự tin cao, nhưng thực hiện khá chậm, dễ bảo trì và cũng tốn kém khi buil. Automation có thể không cải thiện được nhiều cho năng suất kiểm thử trừ khi người kiểm thử biết cách.
* Unreliable tests là mối quan tâm chính trong automated testing. Sửa chữa các trường hợp kiểm thử fail và giải quyết các vấn đề liên quan đến các trường hợp kiểm thử false nên là ưu tiên hàng đầu.
* Nếu Automated test được bắt đầu thủ công thay vì thông qua CI (Continuous Integration) thì có nguy cơ chúng không được chạy thường xuyên và do đó có thể gây ra lỗi trong các thử nghiệm
* Automated test không thể thay thế cho manual testing. Để có được chất lượng mong đợi của sản phẩm, cần có hỗn hợp các loại và cấp độ thử nghiệm
* Có rất nhiều  automation tools  có sẵn cung cấp các tính năng đơn giản như tự động capture và replay lại các trường hợp manual test. Các tool như vậy thường hay được đưa vào để kiểm tra UI tuy nhiên nó vốn dễ vỡ và khó duy trì. Ngoài ra, lưu trữ các trường hợp thử nghiệm bên ngoài hệ thống sẽ khó kiểm soát dẫn đến nhiều phức tạp không cần thiết.
* Để tiết kiệm thời gian, nhiều kế hoạch kiểm thử tự động hóa được lên kế hoạch kém hoặc không có kế hoạch dẫn đến thử nghiệm thất bại
* Trong automated test thường bỏ qua quy trình thử nghiệm, trong khi manual test luôn có.
* Các metrics như một số trường hợp thử nghiệm được tạo hoặc thực hiện mỗi ngày có thể gây hiểu lầm khủng khiếp và có thể dẫn đến một khoản đầu tư lớn vào việc chạy thử nghiệm nhưng không có tác dụng.
* Thành viên của nhóm tự động hóa phải là những người chuyên môn cao: dễ tiếp cận, hợp tác và tháo vát nếu không hệ thống này sẽ nhanh chóng thất bại
* Tự động có thể đề xuất và cung cấp các giải pháp thử nghiệm yêu cầu bảo trì liên tục quá nhiều so với giá trị được cung cấp
* Kiểm thử tự động có thể thiếu chuyên môn để hình thành và đưa ra các giải pháp hiệu quả
* Kiểm thử tự động có thể thành công đến nỗi họ hết những vấn đề quan trọng cần giải quyết, và do đó chuyển sang những vấn đề không quan trọng.

# Tóm lại
Agile testing yêu cầu việc kiểm thử phải được tiến hành càng sớm càng tốt. Nó đòi hỏi có sự tham gia của khách hàng, mã nguồn phải được kiểm thử ngay khi sẵn sàng. Mã nguồn cũng phải đủ ổn định mới nên đưa vào thử nghiệm trong hệ thống. Kiểm thử hồi qui có thể hoàn thành để đảm bảo bug được fix và retest thành công. Và quan trọng hơn là sự giao tiếp, phối hợp làm việc giữa các team để Agile testing thành công tốt đẹp.

Nguồn tham khảo: https://www.guru99.com/agile-testing-a-beginner-s-guide.html