## 1. Test Plan là gì

Test Plan là một tài liệu mô tả chiến lược sẽ được sử dụng cho việc phát triển sản phẩm hoặc hệ thống nhằm đáp ứng các đặc tính và yêu cầu được đề ra. Phạm vi (Scope) giúp chúng ta xác định rõ các mục kiểm thử và các tính năng cần được kiểm thử. Một Test Plan cũng bao gồm mô tả chi tiết về người sẽ thực hiện các công việc được giao. <br>

![](https://images.viblo.asia/0f0bd21e-4950-4e71-ba02-65d934603d5d.png)

<br>Theo tiêu chuẩn IEEE 829, các thành phần cần có của một tài liệu Test Plan bao gồm: <br>
- Test Plan identifier (Test Plan id)
- References (Tài liệu tham khảo)
- Introduction (Giới thiệu)
- Test Items (Các mục kiểm thử)
- Risks (Các rủi ro)
- Items to be tested (Các mục cần kiểm thử)
- Features excluded for testing (Các tính năng không cần kiểm thử)
- Testing Approach (Phương pháp kiểm thử)
- Test Pass and Fail Criteria (Các tiêu chí kiểm thử thành công hay thất bại)
- Resumption/Suspension Criteria (Tiêu chí tiếp tục hay tạm ngưng)
- Test deliverables (Kiểm thử khả năng phát hành)
- Remaining Test Tasks (Các nhiệm vụ còn lại)
- Test Environment Set Up (Cài đặt môi trường kiểm thử)
- Training and Staffing (Đào tạo và nhân sự)
- Team Member Responsibilities (Trách nhiệm của các thành viên trong nhóm)
- Testing Schedule (Lịch trình kiểm thử)
- Planning for Risks and Contingency Plans (Lập kế hoạch cho các rủi ro, và lên kế hoạch dự phòng)
- Approvals (Phê duyệt)

## 2. Giải thích các thành phần trong một tài liệu Test Plan

### 2.1. Test Plan identifier (Test Plan id)
Các con số (ID) là duy nhất, và dùng để phân biệt Test Plan, cấp bậc của Test Plan nên tương xứng với cấp bậc của phần mềm liên quan. Và mỗi ID giúp chúng ta phân biệt đâu là Master plan, level plan, integration plan hoặc bất kỳ loại plan nào mà nó đại diện. Điều này hỗ trợ việc quản lý, tổ chức các phiên bản Test Plan và các phiên bản phần mềm liên quan. 


<br>Hãy nhớ rằng các kế hoạch kiểm thử cũng giống như các tài liệu phần mềm khác, chúng có tính linh động và phải được cập nhật. Do đó, chúng sẽ có revision number (số liệu sửa đổi).

Bạn có thể muốn thêm vào thông tin tác giả và liên hệ trong phần lịch sử sửa đổi ở phần giới thiệu của Test Plan.

### 2.2. References (Tài liệu tham khảo)

Liệt kê tất cả các tài liệu hỗ trợ cho Test Plan. Tham chiếu đến số phiên bản/phát hành thực tế của tài liệu được lưu trữ trong hệ thống quản lý cấu hình. Không sao chép văn bản từ các tài liệu khác vì điều này sẽ làm giảm tính khả thi của tài liệu và tăng nỗ lực bảo trì. Các tài liệu có thể được tham chiếu bao gồm:<br>
- Project Plan (Kế hoạch dự án)
- Requirements specifications (Đặc tả yêu cầu)
- High Level design document (Tài liệu thiết kế cấp cao)
- Detail design document (Tài liệu thiết kế chi tiết)
- Development and Test process standards (Các tiêu chuẩn quy trình phát triển và kiểm thử)
- Methodology guidelines and examples (Hướng dẫn và ví dụ về phương pháp luận)
- Corporate standards and guidelines (Tiêu chuẩn và hướng dẫn của công ty)


### 2.3. Introduction (Giới thiệu)

Nêu rõ mục đích của kế hoạch, có thể xác định mức độ của kế hoạch (master, level...). Đây thực chất là phần tóm tắt của kế hoạch.

<br>Bạn có thể thêm vào đây bất kỳ tham chiếu nào đến các kế hoạch khác, tài liệu hoặc các mục chứa thông tin liên quan đến dự án/quy trình. Hoặc không bạn có thể tạo một bảng tham chiếu riêng chứa tất cả các tài liệu tham chiếu. 

<br>Xác định phạm vi của kế hoạch. Các mục khác có thể bao gồm, các ràng buộc tài nguyên và ngân sách, phạm vi của nỗ lực kiểm thử, kiểm thử liên quan đến các hoạt động đánh giá khác (Phân tích & Đánh giá) như thế nào, và có thể sử dụng quy trình này để kiểm soát thay đổi và giao tiếp và điều phối các hoạt động chính.

<br>Vì đây là phần "Tóm tắt thực thi" nên thông tin cần phải ngắn gọn và đúng trọng tâm.


### 2.4. Test Items - Functions (Các mục kiểm thử)
Đây là những mục bạn sẽ làm trong phạm vi của kế hoạch kiểm thử. Về cơ bản, bạn sẽ trả lời câu hỏi bạn cần test gì, và kết quả như thế nào. <br>
Hãy nhớ rằng, những gì bạn đang kiểm thử là những gì bạn sẽ cung cấp cho Khách hàng.

Phần này có thể được định hướng đến mức của kế hoạch kiểm thử. Đối với cấp độ cao hơn, nó có thể là ứng dụng hoặc các chức năng ( application or functional area), với các cấp thấp hơn, nó có thể là chương trình (program), đơn vị (unit), mô-đun (module) hoặc build.

### 2.5. Risks (Các rủi ro)
Xác định những phần nào sẽ được kiểm thử, và phần nào là quan trọng, chẳng hạn như:

- Phân phối sản phẩm của bên thứ ba.
- Phiên bản mới của phần mềm giao tiếp
- Khả năng sử dụng và hiểu các gói/công cụ mới
- Các chức năng cực kỳ phức tạp
- Sửa đổi với các thành phần mà trước đây đã từng thất bại
- Các mô-đun hoặc yêu cầu thay đổi (CR) được tài liệu hoá một cách tồi tàn hoặc không rõ ràng 

<br>Có một số rủi ro phần mềm vốn có như sự phức tạp, và chúng cần phải được xác định rõ
- Tính An toàn
- Nhiều giao diện
- Tác động trên Khách hàng
- Quy định và luật của chính phủ

Một phần khác của sự rủi ro đó chính là việc hiểu sai ngay từ đầu về các yêu cầu mong muốn của khách hàng. Điều này có thể xảy ra ở cấp quản lý, người dùng, và các nhà phát triển. Việc cần thiết là hay nhận biết và để ý tới các yêu cầu mơ hồ không rõ ràng và những yêu cầu mà không thể thực thi việc kiểm thử được. 

Một cách tiếp cận tốt để xác định trường hợp nào rủi ro có thể xảy ra đó là hay động não và đặt ngay câu hỏi chẳng hạn như, điều gì đang làm tôi lo lắng về dự án hay ứng dụng này? 

### 2.6. Items to be tested (Các mục cần kiểm thử)

Đây là danh sách những gì cần được kiểm thử từ quan điểm của USERS (Người dùng) về những gì hệ thống làm. Đây không phải là mô tả kỹ thuật của phần mềm, mà là cách nhìn của người dùng đối với chức năng của hệ thống. 

<br>Đặt các mức độ rủi ro cho từng tính năng. Sử dụng thang xếp hạng đơn giản như (H, M, L): Cao, Trung bình và Thấp (High, Medium and Low). Các xếp loại này sẽ dễ hiểu đối với người dùng. Bạn nên có sự chuẩn bị để giải thích và thảo luận rõ tại sao lại xếp hạng như vậy. 

<br>Cần lưu ý rằng Mục 2.4 và 2.6 rất giống nhau. Sự khác biệt duy nhất là quan điểm. Phần 2.4 là mô tả loại kỹ thuật bao gồm số phiên bản và thông tin kỹ thuật khác còn phần 6 là danh sách được lấy từ quan điểm của người dùng. Người dùng sẽ không hiểu các thuật ngữ kỹ thuật. Họ chỉ hiểu các chức năng và quy trình khi chúng liên quan đến công việc của họ.


### 2.7. Features excluded for testing (Các tính năng không cần kiểm thử)
Đây là danh sách những thứ KHÔNG cần kiểm thử từ cả quan điểm của người dùng về những gì hệ thống làm và cả hướng nhìn quản lý cấu hình/phiên bản. Đây không phải là mô tả kỹ thuật của phần mềm, mà là USERS view của các chức năng.

Xác định TẠI SAO tính năng này không được kiểm tra, có thể là do những lý do sau
- Chức năng này không được đưa vào bản phát hành phần mềm hiện tại hoặc sắp tới.
- Nguy cơ thấp, đã được sử dụng trước và được coi là ổn định.
- Sẽ được phát hành nhưng không được kiểm thử hoặc ghi nhận là một phần chức năng của phiên bản phần mềm. 


Tài liệu tham khảo: 
http://www.fit.vutbr.cz/study/courses/ITS/public/ieee829.html