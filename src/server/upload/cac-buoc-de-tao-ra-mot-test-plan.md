# 1. Khái niệm 

Test plan là một tài liệu chi tiết phác thảo chiến lược kiểm thử, Mục tiêu kiểm thử, tài nguyên (nhân lực, phần mềm, phần cứng) cần thiết cho việc kiểm thử  , kế hoạch kiểm thử , Dự toán kiểm thử và phân phối thử nghiệm.

Test plan  xác định dựa theo các mục kiểm thử khác nữa, các tính năng kiểm tra, các nhiệm vụ kiểm thử, những người sẽ làm mỗi công việc, trình độ của mỗi tester độc lập, kiểm thử môi trường, kỹ thuật kiểm thử design và tiêu chuẩn nhập và xuất để được sử dụng, và lý do cho sự lựa chọn của họ, và bất kỳ rủi ro đòi hỏi phải lập kế hoạch dự phòng. Đây là báo cáo của quá trình lập kế hoạch kiểm thử.

Test plan đóng vai trò là một kế hoạch chi tiết để tiến hành các hoạt động kiểm thử phần mềm như một quy trình xác định, được giám sát và kiểm soát từng bước bởi người quản lý dự án.

# 2. Tầm quan trọng của việc xây dựng test plan 

- Test plan giúp chúng ta xác định effort cần thiết để đáp ứng chất lượng của sản phẩm đang thử nghiệm
- Giúp những người ngoài nhóm kiểm thử như nhà phát triển, quản lý doanh nghiệp, khách hàng hiểu chi tiết về quá trình kiểm thử.
- Test plan định hướng, dẵn dắt công việc theo một lịch trình đã định sẵn.

# 3. Cách viết 1 test plan 

Thực hiện theo 7 bước dưới đây để tạo một kế hoạch kiểm tra theo IEEE 829:

*Analyze the product - Phân tích sản phẩm*

*Design the Test Strategy - Lập chiến lược kiểm thử*

*Define the Test Objectives - Xác định mục tiêu kiểm thử*

*Define Test Criteria - Xác định tiêu chí kiểm tra*

*Resource Planning - Hoạch định nguồn lực*

*Plan Test Environment - Kế hoạch kiểm tra môi trường*

*Schedule & Estimation - Lịch trình & Dự toán*

*Determine Test Deliverables*

![](https://images.viblo.asia/1bf5d7c0-8740-4d25-9761-9c013e0955c4.png)

**Bước 1 : Analyze the product - Phân tích sản phẩm**

Bạn không thể kiểm tra một sản phẩm mà không có bất kỳ thông tin về nó. Vì vậy, đầu tiên bạn phải tìm hiểu kỹ một sản phẩm trước khi kiểm thử nó. Bạn nên nghiên cứu khách hàng và người dùng cuối để biết nhu cầu và mong đợi của họ từ sản phẩm 
- Ai sẽ sử dụng sản phẩm ?
-Nó được dùng để làm gì?
- Nó sẽ làm việc như thế nào?
- Phần mềm / phần cứng sản phẩm sử dụng là gì?
Bạn nên xem xét tất cả tài liệu về  sản phẩm nếu có. Điều đó giúp bạn hiểu tất cả các tính năng của trang web cũng như cách sử dụng nó. Nếu bạn không rõ ràng về bất kỳ mục nào, bạn có thể confirm với khách hàng, nhà phát triển, nhà thiết kế để có thêm thông tin.

![](https://images.viblo.asia/00e57349-e669-4246-ba46-d243f177a405.jpg)

**Bước 2:  Lập chiến lược kiểm thử**

Chiến lược kiểm thử  là một bước quan trọng trong việc lập Test Plan. Tài liệu Chiến lược kiểm thử là tài liệu high-level, thường được phát triển bởi Test Manager.

![](https://images.viblo.asia/e0c54ede-f830-4d2c-9520-3dc4a62bd502.png)

*Bước 2.1*

Trước khi bắt đầu bất kỳ hoạt động kiểm thử nào, phải biết phạm vi kiểm thử. Bạn phải suy nghĩ kỹ về nó.
Các thành phần của hệ thống sẽ được kiểm thử (phần cứng, phần mềm, phần mềm trung gian, v.v.) được định nghĩa là "in scope"
Các thành phần của hệ thống sẽ không được kiểm thử cũng cần được xác định rõ ràng là "out of scope".
Xác định phạm vi của dự án kiểm thử của bạn là rất quan trọng đối với tất cả các bên liên quan. Cung cấp cho mọi người một sự chắc chắn và thông tin chính xác về kiểm thử mà các bạn đang làm.

*Bước 2.2*

Testing Type là một quy trình kiểm thử tiêu chuẩn mang lại kết quả kiểm thử dự kiến.
Mỗi Testing Type được xây dựng để xác định một loại lỗi sản phẩm cụ thể. Nhưng, tất cả các Testing Type đều nhằm đạt được một mục tiêu chung. Phát hiện sớm tất cả các lỗi trước khi phát hành sản phẩm cho khách hàng.
Các Testing Type thường được sử dụng được mô tả như hình dưới đây : 

![](https://images.viblo.asia/b92ae2a0-026a-46ca-b18f-58a3b41f11c2.png)
Risk là sự kiện không chắc chắn xảy ra trong tương lai nhưng có xác suất xảy ra và có khả năng thua lỗ. Khi rủi ro thực sự xảy ra, nó sẽ trở thành issue.

Trong bài viết phân tích Risk và Solution, bạn đã tìm hiểu về phân tích Risk chi tiết và xác định các Risk tiềm ẩn trong dự án.

*Bước 2.3*

Trong QA Test Plan, bạn sẽ ghi lại những Risk đó:

![](https://images.viblo.asia/8e624e21-8365-43e3-822d-55973062d55f.png)

*Bước 2.4*

Trong Test Logistics, Test Manager cần trả lời các câu hỏi sau:

Who will test?
When will the test occur?
Who will test?

Bạn có thể không biết tên chính xác của Tester, nhưng type of tester có thể được xác định.

Để chọn thành viên phù hợp với task cụ thể, bạn phải xem xét nếu khả năng của họ có đủ điều kiện cho task hay không, cũng như ước tính ngân sách dự án. Lựa chọn thành viên sai cho task có thể gây ra các dự án thất bại hay chậm trễ.

Người có các kỹ năng sau là lý tưởng nhất để thực hiện kiểm thử phần mềm:

Khả năng hiểu quan điểm của khách hàng
Mong muốn chất lượng tốt
Chú ý đến chi tiết
Good cooperation Hợp tác tốt
Trong dự án của bạn, thành viên người mà sẽ chịu trách nhiệm thực hiện kiểm thử là Tester. Dựa trên ngân sách dự án, bạn có thể chọn thành viên trong nội bộ hoặc thuê người ngoài làm người kiểm thử.
When will the test occur?

Các hoạt động kiểm thử phải được kết hợp với các hoạt động phát triển liên quan. Bạn sẽ bắt đầu kiểm thử khi bạn có tất cả các mục yêu cầu được hiển thị trong hình dưới đây :

![](https://images.viblo.asia/8e27f861-67cf-42cf-8e26-4313a1992641.png)

**Bước 3: Xác định mục tiêu kiểm thử**

Test Objective là mục tiêu tổng thể và thành tích của việc thực hiện kiểm thử. Test Objective là tìm ra càng nhiều lỗi phần mềm càng tốt; đảm bảo rằng phần mềm được kiểm tra không có lỗi trước khi phát hành.

Để xác định Test Objective, bạn nên thực hiện 2 bước sau :

Liệt kê tất cả các tính năng phần mềm (functionality, performance, GUI…) có thể cần kiểm thử.
Xác định mục tiêu hoặc mục đích của kiểm thử dựa trên các tính năng trên.
Bạn có thể chọn phương thức ‘TOP-DOWN, để tìm các tính năng của trang web có thể cần kiểm thử. Trong phương pháp này, bạn chia nhỏ ứng dụng đang kiểm thử thành component và sub-component.
Bạn có thể tạo Mind-Map để tìm các tính năng của trang web như sau :

![](https://images.viblo.asia/556d14d7-ad16-4399-b126-1dcabeb1bb1f.png)

Dựa trên các tính năng trên, bạn kiểm tra xem liệu chức năng của trang web có hoạt động như mong đợi mà không có bất kỳ error hoặc bugs nào trong môi trường kinh doanh thực không ?
Kiểm tra xem giao diện bên ngoài của trang web như UI có hoạt động như mong đợi và đáp ứng nhu cầu của khách hàng không ?
Xác minh usability của trang web. Những chức năng đó có thuận tiện cho người dùng hay không?

Tham khảo: https://www.guru99.com/what-everybody-ought-to-know-about-test-planing.html

(Còn tiếp )