**1. QA, QC & Testing.**

  Rất nhiều người trong ngành công nghệ thông tin còn đang rất mơ hồ và  không có được sự phân biệt rõ ràng giữa 3 khái niệm: Quality Assurance (QA), Quality Control (QC) và Testing. Hi vọng bài viết này phần nào đó sẽ giúp các bạn hiểu rõ hơn về những khái niệm trên.

![](https://images.viblo.asia/ebb2d233-b299-4fa4-b1b0-b72d2237ffb2.jpg)
 
  Có thể nói QA, QC và Testing có mối liên hệ chặt chẽ với nhau và khi chúng ta xem xét kỹ thì có thể thấy đôi khi chúng còn có chung những hoạt động giống nhau trong một dự án. Tuy nhiên, chúng vẫn có những điểm khác nhau rất rõ ràng để có thể chỉ ra được đâu là QA đâu là QC hay Testing:



| **Quality Assurance (QA)** | **Quality Control (QC)** | **Testing** |
| -------- | -------- | -------- |
| QA bao gồm những hoạt động để đảm bảo việc thực hiện các quy trình phát triển phần mềm một cách chính xác nhất, cũng như các phương pháp đang được sử dụng có chuẩn xác không, các tiêu chuẩn của nội dung cần xác nhận trong một phần mềm đã đúng chưa     | QC bao gồm những hoạt động để đảm bảo việc phát triển phần mềm đúng với các yêu cầu trong các tài liệu đặc tả liên quan của phần mềm.     | Testing bao gồm những hoạt động để đảm bảo việc tìm được các bugs/error/defects của phần mềm.     |
| Chủ yếu là tập trung về mặt quy trình cũng như phương pháp hơn là các hoạt động kiểm thử thực tế trên hệ thống.     | Tập trung vào việc kiểm thử thực tế hệ thống để tìm ra các bug/defect bằng cách áp dụng các quy trình cũng như các phương pháp kiểm thử.     | Chỉ tập trung vào việc kiểm thử thực tế trên hệ thống.     |
| Các hoạt động chủ yếu hướng tới quy trình.     | Các hoạt động chủ yếu thực hiện trên sản phẩm.     | Các hoạt động chủ yếu thực hiện trên sản phẩm.     |
| Các hoạt động mang tính phòng ngừa.     | Các hoạt động để phát hiện sau đó khắc phục.     | Các hoạt động để phát hiện sau đó khắc phục.     |
| Là một phần của vòng đời kiểm thử phần mềm.     | QC có thể coi là một phần của QA.     | Testing là một phần của QC.     |

**2. Audit and Inspection.**

  **Audit:** Đây là một quy trình bải bản với mục đích để cho việc kiểm thử thực tế được tiến hành trong tổ chức cũng như trong một team. Hoặc có thể nói đây là một quy trình kiểm tra độc lập có tính liên quan trong suốt quá trình kiểm thử phần mềm. Theo IEEE, đây là một quy trình kiểm tra các tài liệu mà tổ chức đang sử dụng và thực hiện. Các loại Audit đó là: Legal Compliance Audit, Internal Audit và System Audit.

  **Inspection:** Đây là một kỹ thuật có iên quan đến việc review xác định ra các Error và GAP trong quá trình phát triển. Theo IEEE, inspection là một kỹ thuật đánh giá bài bản, đối tượng là các yêu cầu đặc tả phần mềm, các thiết kế cũng như các dòng lệnh sẽ được kiểm tra bởi một người hoặc nhóm người độc lập khác với tác giả của chúng để tìm ra các faults, các vi phạm đối với chuẩn khi phát triển phần mềm và các lỗi khác.
  Cuộc họp inspection bao gồm các bước theo quy trình: Planning, Overview Preparation, Inspection Meeting, Rework và Follow-up. Thông thường các chuyên gia có kiến thức về QA sẽ được 

**3. Testing and Debugging.**

  **Testing**: Là những hoạt động liên quan đến việc phát hiện ra bug/error/defect của phầm mềm không bao gồm việc sửa chúng. Thông thường các chuyên gia có kiến thức về QA sẽ tham gia trong quá trình tìm bugs. Testing sẽ được thực hiện ở Testing phase.

  **Debugging**: Là những hoạt động liên quan đến việc tìm, phân tích và sửa các bugs. Các lập trình viên, những người phát triển phần mềm sẽ tham gia quá trình debugging khi gặp phải lỗi ở trong code. Debugging là một phần của White Box Testing hoặc Unit Testing. Debugging có thể được thực hiện ở development phase song song Unit Testing đang tiến hành hoặc trong giai đoạn sửa và báo cáo lỗi.
  
  **4. Error, Fault and Failure**
  
  ![](https://images.viblo.asia/238322fe-e8a0-4b23-9dd4-c733a7a8d427.jpg)
  
  Đây lại là một khái niệm nữa mà rất nhiều người trong ngành dễ nhầm lẫn hoặc không thể phân biệt được một cách rõ ràng, mạch lạc, không lấy được ví dụ nào điển hình để phân biệt được một cách xác thực 3 khái niệm trên. Vậy chúng ta hãy cùng tìm hiểu cặn kẽ chúng nhé.
  
| **Error** | **Fault** | **Failure** |
| -------- | -------- | -------- |
| Xảy ra do hành động của con người dẫn đến việc phát sinh Error    | Là một lỗi ở trong hệ thống làm cho hệ thống không thực hiện được đúng chức năng và yêu cầu của nó     | Là sự sai khác kết quả đầu ra giữa thực tế và mong đợi     |

Mối liên hệ giữa 3 khái niệm trên là vô cùng chặt chẽ, con người trong quá trình phát triển phần mềm có thể gây ra error ở đâu đó dẫn đến trong hệ thống sẽ có các Fault phát sinh và khi người dùng cuối sử dụng thì có các failure.

Link tham khảo: 
https://www.tutorialspoint.com/software_testing/software_testing_qa_qc_testing.htm