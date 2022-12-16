**Đây là một bài viết khá hay mình muốn chia sẻ lại với mọi người để có thể trở thành 1 QA giỏi, bài viết chỉ giới thiệu chung chứ không đi sâu vào bất kỳ kỹ năng gì nên mọi người có thể tự tìm hiểu sâu về từng kỹ năng trong road map trên mạng sau nhé :)**

# Giới thiệu

Có thể nói, một trong những chìa khóa chính để làm tốt công việc của 1 Tester/Qa và để vượt lên đồng nghiệp là thể hiện được khả năng mô phỏng mối quan hệ 1-n trong việc sử dụng ứng dụng. QA Engineer phải có khả năng tái tạo hàng trăm thậm chí hàng nghìn người dùng về các tương tác khác nhau cũng như các điểm yếu nhất của developer.

Đảm bảo chất lượng là thói quen đối với bất kỳ tổ chức nào sẵn sàng mở rộng quy mô và tạo ra danh tiếng. Và điều này có thể đạt được bằng cách tìm hiểu các phương pháp khác nhau để kiểm thử phần mềm, các phương pháp tiếp cận và các loại kiểm thử để có được trải nghiệm  trong lĩnh vực này.

# Road map

Biểu đồ dưới đây có thể giới thiệu cho bạn các kỹ năng chính cần thiết trong việc kiểm thử phần mềm

![](https://images.viblo.asia/83a08ca7-3576-4e3a-8834-4bfaffb2c1ef.png)



-----

## Types of Testing

Chẳng hạn như trong Road map trên, chúng ta có thể thấy 1 trong những phần quan trọng đó là Types of Testing.

Trong Types of Tessting lại chia ra làm 2 phần rõ rệt đó là Functional và Non Functional. Vậy chúng ta thử tìm hiểu 1 chút về 2 loại này nhé:

**Functional Testing**

Khái niệm "function" của của một system hay một component nghĩa là "những gì mà nó thực hiện", nó được mô tả trong requirement specification, function specification hoặc trong use case. Có thể có một vài chức năng được thêm vào mà không hề có bất kì tài liệu mô tả nào, mặc dù trường hợp này cũng khá khó khăn cho việc kiềm thử. Function testing được dựa trên các function, các tài liệu đặc tả hoặc sự hiểu biết của tester. Function testing có thể thực hiện ở tất cả các test level (ví dụ như kiểm tra một component có thể dự trên tài liệu đặc tả của component đó).

Một dữ liệu ( test data) thử nghiệm được dựa trên tài liệu và một bộ Test Case được chuẩn bị. Phần mềm đó sẽ được kiểm thử trong môi trường thực tế để kiểm tra xem kết quả thực tế ( Actual Result) có đồng bộ với kết quả mong đợi ( Expected Result) hay không. Kỹ thuật này được gọi là Kỹ thuật Hộp đen ( Black Box Technique) và chủ yếu được thực hiện thủ công (Manual Test) và cũng rất hiệu quả trong việc tìm lỗi.

Một số loại Functional testing phổ biến như là:

- Smoke Testing
- Sanity Testing
- Integration Testing
- Regression Testing
- Localization Testing
- User Acceptance Testing (UAT)

**Non Functional Testing**

Kiểm thử Phi chức năng là 1 loại kiểm thử liên quan đến các vấn đề như Hiệu suất, Bảo mật, Giao diện người dùng.... của phần mềm.
Nó được thiết kế để kiểm thử mức độ sẵn sàng của một hệ thống theo các tham số phi chức năng mà không được giải quyết bằng kiểm thử chức năng.
Vi dụ như: Kiểm thử xem có bao nhiêu người có thể đăng nhập đồng thời vào một phần mềm.
Việc kiểm tra loại này bằng tay ( manual test) là không khả thi, do đó chúng ta phải sử dụng tool để thực hiện chúng: LoadRunner, JMeter ...

Một số loại Non Functional Testing phổ biến như là:

- Performance Testing (Load testing)
- Usability Testing
- Security Testing


-----


## Defect Tracking Tools

Có lẽ mọi người đều biết và sử dụng một trong những hệ thống ví dụ như Redmine, Jira để quản lý Task, Bug. Những công cụ này được coi như là Defect Tracking Tools. Vậy mọi người có biết tại sao chúng ta lại sử dụng những công cụ này hay không.

Hầu hết các dự án hiện tại đều phát triển theo mô hình Agile để hướng tới việc phát triển nhanh và đưa sản phẩm sớm tới tay người dùng, vì vậy việc sử dụng các Defect Tracking Tools kia là điều bắt buộc. Trong quá trình phát triển phần mềm, chắc chắn sẽ xảy ra lỗi hoặc sự cố làm ảnh hưởng đến chức năng của phần mềm. Vậy khi phát hiện những sự cố, lỗi đó thì chúng ta cần quản lý lỗi, sự cố một cách tốt nhất để giúp sản phẩm phần mềm được hoàn thiện.

Không chỉ vậy, các công cụ trên còn cho chúng ta một cái nhìn tổng thể, toàn diện về tiến độ dự án đang chạy, việc hiểu biết về các Tool này cũng rất quan trọng nếu như mọi người muốn phát triển bản thân trở thành những Project Leader và Project Manager.


-----


Sau khi tìm hiểu cũng như thực hành các nguyên tắc cơ bản về kiểm thử, bạn cần phải bắt đầu với kỹ năng kiểm thử đầu tiên mà mọi QA đều phải biết: Manual Testing.

![](https://images.viblo.asia/39c90f20-9463-46b6-9647-5e59856e54fc.png)

Một công ty đã nhận được hóa đơn 50.000$ từ người kiểm tra phần mềm cho dịch vụ của anh ta đối với một ứng dụng trị giá hàng triệu $ mà không ai trong công ty có thể làm lại. Công ty đã bị choáng ngợp với hóa đơn cắt cổ cho một thời gian phục vụ ngắn như vậy và yêu cầu hạch toán chi tiết các khoản phí của anh ta.
Người kiểm tra phần mềm đã trả lời bằng cách phân loại:
Báo cáo lỗi: $ 1
Biết nơi để tìm ra bug: $ 49,999

Khắc phục sự cố là kỹ năng mà bạn cần phát triển, phát triển và chú ý nhiều hơn. Biết chính xác nguyên nhân gốc rễ của vấn đề sẽ giải quyết được nhiều vấn đề cũng như tiết kiệm thời gian của nhóm phát triển vốn là tài sản quý giá nhất mà họ sở hữu.


-----


Sau khi làm tốt được các kỹ năng của Manual Testing, chúng ta sẽ đi sâu một chút về kỹ thuật.

Đã bao giờ manual test mọi người gặp trường hợp phải test đi test lại một số case chưa, đôi khi team dev fix 1 bug mà lại phải test lại toàn bộ các case mình đã dành nhiều thời gian test trước đó. Kiểm thử tự động là cách kiểm tra mới nhất và hiện đại nhất để loại bỏ khối lượng công việc trùng lặp.


Hình dưới đây có thể giới thiệu cho bạn về lộ trình kiểm thử tự động hóa và các lĩnh vực bạn cần tham quan và có được một số kiến thức.

![](https://images.viblo.asia/4a193bd5-8282-4284-9a1e-947c3f211048.png)

Mình luôn khuyến khích tất cả QA Engineer phải chắc chắn nắm rõ các khái niệm kiểm thử, phương pháp và kiến thức về kiểm thử bằng tay trước khi bắt đầu học kiểm thử tự động. Việc viết test case đầy đủ rất quan trọng trước khi bắt đầu viết automation test, test case tốt là test case có thể dễ dàng đọc và dễ dàng sử dụng lại được.

# Tài liệu tham khảo
- https://medium.com/tech-tajawal/software-testing-the-road-map-5807a5590886