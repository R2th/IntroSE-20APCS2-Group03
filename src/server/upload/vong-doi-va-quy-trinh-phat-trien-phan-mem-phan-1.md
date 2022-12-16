### I. Giới thiệu chung
**1. Giới thiệu** <br>
*Kiểm thử phần mềm* là hoạt động không thể tách rời trong hoạt động phát triển phần mềm. Nếu ví quá trình phát triển phần mềm là xương sống tạo nên các chương trình phần mềm cơ bản hoàn thiện thì quá trình kiểm thử sẽ đắp lên cơ bắp theo đúng yêu cầu của khách hàng giúp hoàn thiện một hình hài đủ tiêu chuẩn. Việc nắm rõ mô hình phát triển mềm sẽ giúp chúng ta có cái nhìn định hướng và xây dựng hoạt động kiểm thử đúng đắn, hiệu quả và phù hợp hơn.

**2. Khái niệm**<br>
*a. Quy  trình kiểm thử*<br>
- Kiểm thử phần mềm là một quy trình bao gồm một vòng lặp cả tĩnh và động từ khi lập kế hoạch, chuẩn bị và đánh giá sản phẩm phần mềm để xác định xem phần mềm có đảm bảo yêu cầu đặc tả không, để phát hiện lỗi có trong hệ thống và để chứng minh sản phẩm phù hợp với nhu cầu sử dụng của người dùng.<br>
- Các hoạt động cơ bản của quy trình kiểm thử: <br>
![](https://images.viblo.asia/3f4e0083-1d3d-4ae6-a773-472daa25bfeb.PNG)

    * Test planning & control: Lập kế hoạch kiểm thử <br>
    * Test analysis & design: Phân tích và thiết kế <br>
    * Test implementation & execution: Thực hiện và thử nghiệm <br>
    * Evaluating & report: Đánh giá và báo cáo <br>
    * Test closure: Kết thúc kiểm thử <br>

*b. Vòng đời phát triển phần mềm* <br>
- Quy trình phát triển phần mềm là tập hợp tất cả các hoạt động, phương thức mà con người phải thực hiện để phát triển một hệ thống hay một sản phẩm phần mềm.
-	Những câu hỏi sẽ được đặt ra và cần giải quyết khi bắt đầu phát triển phần mềm đó là:
    * Nhân sự: Ai sẽ làm? Và ai sẽ làm công việc gì? Nếu thiếu nhân sự cần giải quyết thế nào?
    * Thời gian: Khi nào bắt đầu? Mất bao nhiêu thời gian để thực hiện?
    * Phương pháp: Làm như thế nào?
    * Công cụ: Dùng công cụ gì để thực hiện công việc này?
    * Chi phí: Chi phí bỏ ra và thu về ước tính là bao nhiêu? Rủi ro là bao nhiêu?
    * Mục tiêu: Mục tiêu hướng đến là gì?<br>

    Đối với mỗi hệ thống, sản phẩm và yêu cầu của khách hàng sẽ cần những quy trình khác nhau.<br>
- Quy trình phát triển phần mềm có 4 phần cơ bản sau:<br>
    * Đặc tả phần mềm: thu thập yêu cầu, định nghĩa được chức năng, điều kiện hoạt động của phần mềm.
    * Phát triển phần mềm: quá trình xây dựng sản phẩm, hệ thống từ những yêu cầu, đặc tả ban đầu.
    * Đánh giá sản phẩm: sau giai đoạn phát triển, sán phẩm phần mềm cần được đánh giá và ít nhất phải đáp ứng được các yêu cầu của tài liệu đặc tả.
    * Cải tiến và nâng cấp phần mềm: sau khi phần mềm đã hoàn thiện, đội ngũ phát triển cần cải tiến và nâng cấp giao diện, chức năng của hệ thống để ngày càng tốt hơn và đáp ứng được nhu cầu sử dụng của người dùng. <br>

### II. Vòng đời và quy trình phát triển phần mềm
**1. Vòng đời phát triển phần mềm - SDLC (Software Development Life-cycle)**<br>
  -   SDLC là một cách tiếp cận có hệ thống và có trật tự để giải quyết các vấn đề liên quan đến hệ thống phần mềm hay nói cách khác nó là một cấu trúc đối với sự phát triển của một sản phẩm phần mềm. Tuỳ thuộc vào các loại mô hình phát triển phần mềm khác nhau mà các giai đoạn (phase) sau có thể được sắp xếp và tổ chức khác nhau.
  -   Vòng đời phát triển phần mềm/ software development life-cycle (SDLC): 
  ![](https://images.viblo.asia/a8b0024e-d397-415c-b5cc-d3403a350c9c.PNG)
 <br>
        * *Requirment Analysis (Thu thập, phân tích yêu cầu):* đây phần khá quan trong trong việc phát triển phần mềm. Thông thường khi bắt đầu làm sản phẩm, khách hàng thường không định hình rõ được  mình muốn làm một hệ thống như thế nào nên yêu cầu đưa ra sẽ không đầy đủ, không rõ ràng hoặc mâu thuẫn lẫn nhau. Lúc này, đội phát triển bao gồm những kỹ sư có kinh nghiệm sẽ xác nhận/ góp ý/ sửa đổi để có một yêu cầu cơ bản hoàn thiện ban đầu.<br>
        *    *Design (Thiết kế):* Kiến trúc hệ thống liên quan đến việc bảo đảm rằng hệ thống phần mềm sẽ đáp ứng đầy đủ các yêu cầu của sản phẩm, cũng như đảm bảo rằng các yêu cầu trong tương lai có thể được giải quyết. Nó cũng liên quan đến việc giao tiếp giữa các hệ thống phần mềm và các sản phẩm phần mềm khác, cũng như các phần cứng cơ bản hoặc các hệ điều hành chủ.<br>
        * *Implementation (Thực hiện/xây dựng):* Thiết kế trước đó phải được lập trình viên dịch sang một dạng máy tính có thể đọc và hiểu được. Nếu thiết kế được thực hiện một cách chi tiết và đầy đủ thì đến giai đoạn này việc code sẽ rất dễ dàng. Ngược lại, nếu trước đó việc thiết kế hệ thống quá sơ sài thì đến giai đoạn này sẽ gặp nhiều khó khăn và mất thời gian giải quyết.
        * *Testing (Kiểm thử)*: Sau khi các lập trình viên đã hoàn thành việc phiên dịch mã code, đội kiểm thử viên bắt đầu công việc của mình. Đội ngũ kiểm thử sẽ dùng các phương pháp kiểm thử khác nhau để phát hiện ra những lỗi trên hệ thống, trong giai đoạn này, các công cụ kiểm thử tự động, các tool hỗ trợ cũng sẽ được sử dụng nhằmm phát hiện ra lỗi để đội phát triển có thể kịp thời sửa chữa trước khi đến với người dùng cuối. Ngoài ra, hiện nay cũng có nhiều công ty tự xây dựng công cụ kiểm thử để phục vụ cho các hoạt động phát triển của họ.
        * *Deployment (Triển khai):* Sau khi đội kiểm thử kết thúc công việc của mình, sản phẩm đảm bảo có thể đưa vào sử dụng thì nó sẽ được đưa vào sử dụng trong thực tế.
        *  *Maintenance (Bảo trì):*  Bảo trì và nâng cấp phần mềm để đối phó với các vấn đề được phát hiện hoặc yêu cầu mới có thể tốn nhiều thời gian hơn so với việc phát triển ban đầu của phần mềm.<br>
        
(Còn tiếp...)