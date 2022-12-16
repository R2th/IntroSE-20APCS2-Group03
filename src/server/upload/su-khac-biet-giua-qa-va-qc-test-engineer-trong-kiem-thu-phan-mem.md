![](https://images.viblo.asia/08ae46ea-a335-4af3-ac59-b5b4cc3e5551.png)

# 1. QA (Quality Assurance = Đảm bảo chất lượng) 

QA được dùng để nói về quy trình đảm bảo chất lượng theo các tiêu chuẩn, quy trình và thủ tục phù hợp cho dự án và được triển khai chính xác. Quy trình này có thể được thực hiện qua đội ngũ QA Engineer, hoặc manager, hoặc có thể là từ client (với client thì hoạt động này gọi là Acceptance Testing).

QA không phải là QC, hay nói cách khác không trực tiếp kiểm tra chất lượng phần mềm. Công việc của QA là đảm bảo sản phẩm, project theo kịp tiến độ hoặc là tạo ra những quy chuẩn chất lượng của sản phẩm để QC có thể follow. Trong một số công ty, QA bao hàm cả QC trong nó.

Một số công ty không có QC mà chỉ có QA, nên khái niệm sẽ được thay đổi bằng PQA và SQA. PQA (Process/Procedure QA) hoạt động như một QA thuần túy còn SQA (Software QA) chính là QC Engineer. 

Nhiệm vụ chính của của QA là: 
+ Đề xuất đưa ra quy trình phát triển phần mềm phù hợp với dự án. Ví du: mô hình V-model hay Agile (đa số là Scrum) hay thông qua việc áp dụng những quy trình quản lý sẵn có như ISO hay CMMI
+ Đưa ra những tài liệu, biểu mẫu, hướng dẫn để đảm bảo chất lượng của sản phẩm cho tất cả các bộ phận trong nhóm phát triển sản phẩm
+  Kiểm tra việc thực hiện quy trình trong nhóm phát triển sản phẩm có đúng quy trình QA đã đề ra không. Nhắc nhở đội phát triển sản phẩn làm việc theo đúng quy trình đã đặt ra.
+  Đề xuất, điều chỉnh quy trình phù hợp với sản phẩm mà team đang thực hiện.

Vậy nên: QA = Process + Procedure + meta (nền tảng và quy trình)

# 2. QC (Quality Control = Kiểm soát chất lượng) / Test Engineer

QC thực hiện test tuân theo các quy trình, quy chuẩn của QA đưa ra. Là người chịu trách nhiệm thực hiện công việc kiểm tra chất lượng phần mềm, kiểm soát sản phẩm đã đúng và đủ những yêu cầu mà khách hàng đề ra. **Log bug và report bug, follow up bug, confirm bug** là những hoạt động hàng ngày của QC.

QC hay Tester có thể được dùng thay thế nhau, và phần lớn các công ty phần mềm đều dùng QC để đặt tên. Công việc của QC là đảm bảo chất lượng của sản phẩm bằng cách test nó. Và ngoài việc đảm bảo phần mềm follow theo guidelines &amp; checklist của QA team, QC còn đảm bảo rằng phần mềm không chỉ đúng và đủ yêu cầu, mà còn dễ sử dụng và có hiệu suất tốt (thông qua Usability Test &amp; Performance Test).

Nhiệm vụ chính của QC bao gồm:
+ Tìm hiểu phân tích tài liệu mô tả về hệ thống. Sau đó thiết kế test case, test script ( Tạo thuận lợi cho việc thực hiện việc test phần mềm trước khi giao cho khách hàng)
+  Lên kế hoạch kiểm thử
+  Sử dụng các test case chi tiết để thực hiện test ( Có thể thực hiện test thủ công hoặc sử dụng các tool để test, nên kết hợp cả Ad-hoc Testing).
+  Phối hợp với nhân viên lập trình trong quá trình fix bug và báo cáo chi tiết cho các thành viên trong dự án hoặc các bên liên quan khác tuỳ dự án.

QC = Test + Report + Follow-up + Product (tập trung vào sản phẩm, kiểm thử sản phẩm)

=> **Tester (Hoặc Test Engineer) == QC Engineer**

| QA | QC | 
| -------- | -------- | 
| QA bao gồm các hoạt động đảm bảo và thực hiện quy trình, trình tự và tiêu chuẩn trong nội dung kiểm thử phần mềm đã phát triển và những yêu cầu đặt ra    | QC/Tester bao gồm các hoạt động để đảm bảo việc kiểm tra một phần mềm đã đáp ứng yêu cầu trong tài liệu yêu cầu (đảm bảo việc phát hiện lỗi/bug trong phần mềm)   | 
| Tập trung vào quy trình và tuần tự hơn là quản lý việc test thực tế trên hệ thống     | Tập trung vào việc test thự tế trên phần mềm nhằm phát hiện lỗi trong quá trình phát triển hệ thống      | 
| Đảm bảo chất lượng là quy trình định hướng    | Kiểm soát chất lượng là định hướng sản phẩm      |
| Mục tiêu của đảm bảo chất lượng phần mềm là phòng tránh lỗi trong ứng dụng phần mềm giúp cải thiện quá trình phát triển và kiểm thử | Mục tiêu của kiểm soát chất lượng phần mềm là xác định, phát hiện các lỗi trong khi phát triển ứng dụng phần mềm |
| Không liên quan đến việc thực thi chương chình, code | Liên quan đến việc thực thi chương trình, code |
| Xác định điểm yếu trong các quy trình phát triển để cải thiện |  Xác định các lỗi cần sửa |
|  Đây là tập hợp con của vòng đời phát triển phần mềm (SDLC)   | Testing là tập hợp con của Quality Control (Quản lý chất lượng)     |
| Được thực hiện trước khi kiểm soát chất lượng | Được thực hiện chỉ sau khi hoạt động Đảm bảo Chất lượng được hoàn thành |

# Kết luận 
QA: là người người đặt ra các quy định cho dự án như: đề xuất đưa ra quy trình phát triển dự án, giám sát, quản lý và ban hành chất lượng. Mục đích để đảm bảo rằng quy trình phát triển hoặc bảo trì chắc chắn sẽ đáp ứng được các mục tiêu hệ thống đã đề ra.

QC: Là người thi thành các quy định, nguyên tắc để đảm bảo sản phẩm cuối cùng thực hiện đúng các quy định, nguyên tắc mà QA đặt ra. Cũng là người kiểm thử, tìm các trường hợp còn thiếu sót hay lỗi so với yêu cầu được đặt ra bởi khách hàng.

# Tài liệu tham khảo 
http://www.softwaretestingclass.com/difference-between-quality-assurance-qa-and-quality-control-qc/