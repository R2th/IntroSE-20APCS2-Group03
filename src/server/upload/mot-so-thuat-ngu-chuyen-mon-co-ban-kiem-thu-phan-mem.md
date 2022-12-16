# 1. SOFTWARE TESTING là gì? 
Kiểm thử phần mềm (software testing) là hoạt động nhằm tìm kiếm, phát hiện  các lỗi của phần mềm 

 Kiểm thử phần mềm đảm bảo sản phẩm phần mềm đáp ứng chính xác, đầy đủ và đúng theo yêu cầu của khách hàng, yêu cầu của sản phẩm đề đã đặt ra.
 
Kiểm thử phần mềm tạo điều kiện cho bạn tận dụng tối đa tư duy đánh giá và  sáng tạo để bạn có thể phát hiện ra những điểm mà người khác chưa nhìn thấy. 

 Software testing cũng có thể xem như là quá trình thẩm định và thẩm tra  (validating and verifying) phần mềm/chương trình/ứng dụng/sản phẩm để:
 
+ Đáp ứng được các yêu cầu công việc và kỹ thuật đã được quy định trong thiết kế  và trong lúc phát triển 
+ Làm việc như mong đợi

## 2. TEST PLAN là gì? 
Một kế hoạch kiểm thử dự án phần mềm (test plan) là một tài liệu mô tả các  mục tiêu, phạm vi, phương pháp tiếp cận, và tập trung vào nỗ lực kiểm thử  phần mềm. Quá trình chuẩn bị test plan là một cách hữu ích để suy nghĩ tới  những nỗ lực cần thiết để xác nhận khả năng chấp nhận một sản phẩm phần  mềm.  

Cấu trúc chung của một test plan: 

- Tên project 
- Danh sách các Module cần test 
- Ngày bắt đầu, ngày kết thúc 
- Danh sách các Test case 
- Nhân sự tham gia 
- Tài nguyên sử dụng (Servers, Workstations, Printers,…) 
- Kế hoạch thực hiện (sử dụng Ms Project lập kế hoạch)… 

# 3. TEST CASE là gì? 
 Test case mô tả một dữ liệu đầu vào (input), hành động (action) và một  kết quả mong đợi (expected response), để xác định một chức năng của  ứng dụng phần mềm hoạt động đúng hay không.  
 
Một test case có thể có các phần đặc thù khác nhau như mã test case, tên  test case, mục tiêu test, các điều kiện test, các yêu cầu data input, các  bước thực hiện và các kết quả mong đợi. Mức chi tiết có thể được định  nghĩa khác nhau dựa vào quy mô của dự án hay quy mô của công ty sản xuất  phần mềm. 

Quá trình phát triển test case có thể giúp tìm ra lỗi trong các yêu cầu hoặc thiết  kế của ứng dụng, vì nó đòi hỏi phải tư duy hoàn toàn thông qua các hoạt động  của ứng dụng. Vì lý do này, việc chuẩn bị test case sớm nhất có thể trong qui  trình phát triển phần mềm là rất hữu ích.

Nó bao gồm 3 bước cơ bản: 
- Mô tả : đặc tả các điều kiện cần có để tiến hành kiểm tra. 
- Nhập : đặc tả đối tượng hoặc dữ liệu cần thiết, được sử dụng làm đầu vào để  thực hiện kiểm tra. 
- Kết quả mong chờ : kết quả trả về từ đối tượng kiểm tra.  

# 4. TESTING EXECUTION là gì?
Thực hiện test trực tiếp trên ứng dụng phần mềm sau khi lập trình viên bàn giao 

Dựa trên các test cases đã được viết trước đó để thực hiện test trên phần mềm 

Thực hiện ghi nhận kết quả kiểm thử vào cột kết quả của tài liệu kịch bản kiểm  thử. Nếu kết quả kiểm thử là thất bại thì nhóm kiểm thử ghi nhận lỗi lên hệ  thống quản lý lỗi. 

Nhóm kiểm thử, QTDA, nhóm lập trình, nhóm giải pháp tham gia vào quá trình  quản lý/xử lý lỗi ( bug/ defect)

# 5. TEST REPORT là gì? 
Trong giai đoạn testing, một số document và report sẽ được tạo ra, ví dụ như là  Test plan, Testcase,... trong đó Test report là được tạo sau khi hoàn thành giai  đoạn Testing. Ngoài ra cũng Daily Report, Weekly Report tùy theo yêu cầu đặc thù của dự án 

Báo cáo test cũng thể hiện tiến độ kiểm thử, tiến độ sửa lỗi và số lượng lỗi được tìm thấy hay còn tồn của dự án. Báo cáo kiểm thử cũng là công cụ để phục vụ cho đánh giá hay giám sát dự án có kịp tiến độ hay không, có thể bàn giao hay  release cho khách hàng hay không và các vấn đề cần giải quyết khi mà số lượng lỗi còn nhiều, gây ra các rủi ro về tiến độ hoàn thành của dự án để có những điều chỉnh kịp thời

Test Report thường chứa các nội dung như: 

▪ Số lương test cases đã viết/ số lượng testcase đã test 

▪ Số lượng test cases passed/failed 

▪ Số lượng defects tìm ra và status, severity của defects 

▪ Số lượng defects trên từng module 

▪ Các vấn đề liên quan đến testing, bản build, tiến độ sửa lỗi…

# 6. Defect/ Bug/ Fault là gì?
Testing là công việc không thể thiếu trong quá trình xây dựng sản phẩm  phần mềm. Cho dù sản phẩm của bạn là một đoạn chương trình, một chức  năng hay toàn bộ ứng dụng thì bạn đều phải thực hiện testing trước khi  bàn giao. Đó là lúc kiểm tra lại xem sản phẩm làm có đúng yêu cầu khách  hàng không? Có vận hành ổn định trên nhiều tình huống giả định không?  Có lỗi phát sinh nào không, nguyên nhân là gì để biết cách khắc phục và  hoàn thiện sản phẩm. 

Lỗi phần mềm được gọi là Defect hoặc Bug hoặc Fault trong tiếng anh.

Không phải tất cả các Lỗi gây ra đều xảy ra do code, lỗi có thể đến từ Đặc  tả yêu cầu, thiết kế...

# 7. Độ Ưu tiên ( Priority) & Độ nghiêm trọng (Severity) trong quản lý Bug 
 Trong kiểm thử phần mềm thì hai khái niệm Độ ưu tiên (Priority) và Độ nghiêm trọng  (Severity) cũng không quá xa lạ, đặc biệt là trong quản lý bug. 
 
**Độ nghiêm trọng: Severity Bug** 

Mức độ nghiêm trọng của một con bug thường chỉ mức độ tác động của con bug đó đến  sản phẩm 

 Mỗi dự án hay sản phẩm có tiêu chí đánh giá độ nghiêm trọng khác nhau nhưng thông  thường sẽ có 4 mức độ khác nhau từ nghiêm trọng nhất đến ít nghiêm trọng hơn:
 
 ▪ Mức độ 1 (Critical): Rất nghiêm trọng, có thể làm cho PM "chết cứng" và không sử dụng  được. 
 
▪ Mức độ 2 (Major): Nghiêm trọng, buộc phải sửa chữa để có thể sử dụng được như yêu  cầu đề ra. 

▪ Mức độ 3 (Minor): Nhẹ, tuy không làm PM ngưng chạy, nhưng làm cho việc sử dụng PM  khó khăn hoặc gây bất tiện cho người dùng 

▪ Mức độ 4 (Cosmetic): Không ảnh hưởng đến chức năng hay hiệu năng của PM được quy  định trong yêu cầu (như vấn đề thẩm mỹ hoặc thông báo sai chính tả).

Thực tế việc xác định độ nghiêm trọng của con bug không hẳn lúc nào cũng mang tính chất trắng-đen và tuyệt đối.

**Độ ưu tiên: Priority Bug** 

Đã là bug thì sẽ phải sửa. Tuy nhiên, có một thực tế là đội phát triển khó có thể sửa hết  tất cả bug một lượt cũng như không đáng để sửa hết tất cả các bug. Do đó, đội phát  triển sẽ phải cần đến độ ưu tiên của con bug để biết được bug nào cần được sửa trước  bug nào sau. Độ ưu tiên của bug cũng thường được chia thành 3-4 cấp độ: 

▪ Mức độ 1 (Immediate): Bug sẽ phải sửa ngay lập tức, nếu không công việc sẽ không thể  tiếp tục.

▪ Mức độ 2 (High): độ ưu tiên cao; công việc sẽ bị ngăn trở rất nhiều nếu như lỗi vẫn chưa  được sửa. 

▪ Mức độ 2 (Medium): độ ưu tiên trung bình; công việc sẽ gặp vài khó khăn nếu như lỗi  vẫn chưa được sửa. 

▪ Mức độ 3 (Low): độ ưu tiên thấp nhất; công việc không bị ảnh hưởng nhưng lỗi vẫn phải  được sửa.

Xác định độ ưu tiên? Bug nào sửa trước bug nào sửa sau (hoặc không sửa)? Dựa vào  độ nghiêm trọng của bug. Bug nào nghiêm trọng nhất, tác động đến người dùng  nhiều nhất thì sẽ được ưu tiên sửa trước. Bug nào ít nghiêm trọng hơn sẽ được sửa  sau. 

Xác định độ ưu tiên được khuyến khích đối với kỹ sư kiểm thử nhưng không phải bắt  buộc.


# 8. Verification & Validation

Software Testing là: 

▪ Là một quá trình thực thi một chương trình với mục đích tìm lỗi. 

▪ Là hoạt động kiểm tra xem phần mềm có chạy chính xác hay không (Verification)  và có thoả mãn yêu cầu của khách hàng hay không (Validation) nhằm hướng tới  mục tiêu chất lượng của phần mềm. 

Quality Testing = Verification + Validation

**Verification(xác minh)**:

- Đảm bảo phần mềm  thực hiện đúng đặc tả yêu cầu, có đúng thiết  kế hay không. 
- Phát hiện lỗi lập trình 

**Validation(thẩm định)**

- Đảm bảo phần mềm đáp  ứng nhu cầu người dùng. 
 - Phát hiện lỗi phân tích,  thiết kế. 
 
# 9. Re-testing # Regression testing (test hồi quy)
**Regression testing**: 

 Khi một chức năng mới được thêm vào phần mềm, chúng ta cần chắc chắn rằng phần  chức năng mới được thêm vào không phá hỏng các phần khác của ứng dụng. Hoặc khi  lỗi đã được chỉnh sửa, chúng ta cần chắc chắn rằng lỗi chỉnh sửa không phá hỏng các  phần khác trong ứng dụng. Để test điều này chúng ta thực hiện kiểu test lặp đi lặp lại  gọi là test hồi quy. 
 
Test hồi quy được thực hiện đối với những phần nằm trong phạm vi bị ảnh hưởng khi  mà có sự sửa đổi một chức năng nào đó hoặc là thêm mới, đảm bảo những sự thay đổi  không gây ra lỗi mới trên những chức năng vốn đã làm việc tốt. 

 Regression Test không phải là một mức kiểm tra ( giống như unit test, intergration  testing, system test & acceptance test). Regression test có thể thực hiện tại mọi mức  kiểm tra.
 
Mặc dù không là một mức kiểm tra, thực tế lại cho thấy Regression Test là một trong  những loại kiểm tra tốn nhiều thời gian và công sức nhất. Tuy thế, việc bỏ qua  Regression Test là "không được phép" vì có thể dẫn đến tình trạng phát sinh hoặc tái  xuất hiện những lỗi nghiêm trọng, mặc dù ta "tưởng rằng" những lỗi đó hoặc không có  hoặc đã được kiểm tra và sửa chữa rồi!

**Re-testing**

 Re-test: Đồng nghĩa với confirmation testing (kiểm tra xác nhận) 
 
Là thực hiện test để kiểm tra xem bug mình đã post có được fixed hay chưa (kiểm tra  lại xem đã hết bị lỗi mà mình đã gặp chưa) 

Nếu đã được sửa xong thì mình báo cáo Close bug 

Ngược lại, nếu vẫn còn lỗi thì báo cáo re-open để DEV sửa lại. 

 Là một loại kiểm thử thực hiện để kiểm tra lỗi được fix đã ok chưa

# 10. Functional testing , Non-functional 
**Functional testing:**

Kiểm thử chức năng: Tương tự black box testing (kiểm tra đến chức năng của chương  trình mà không quan tâm đến cấu trúc bên trong). kiểm thử chức năng là chỉ tập trung  kiểm tra chức năng của ứng dụng đó có hoạt động đúng như khách hàng mong đợi  không? Khi test sẽ dựa vào tài liệu yêu cầu (requirement) hoặc tài liệu mô tả chi tiết  (specification) để test 

**Non-functional:**

Kiểm thử phi chức năng như: 

▪ Peformance testing (kiểm thử hiệu năng) 

▪ Stress testing: kiểm tra các giới hạn của hệ thống 

▪ Security testing (kiểm thử bảo mật) 

▪ Usability testing (kiểm thử tính khả dụng)

# 11. QC (Quality Control), QA (Quality Assurance) 
Cả 2 lĩnh vực QA và QC đều làm bên mảng quản lý chất lượng

**QA: Giám sát, quản lý và đảm bảo chất lượng** 

**QC: Kiểm soát chất lượng sản**

# Kết Luận:
Bài viết này chỉ hy vọng giúp các bạn hiểu thêm về một số thuật ngữ hay sử dụng trong kiểm thử phần mềm. Giúp các bạn có thể nắm được những thông tin cơ bản, hiểu và áp dụng vào công việc . Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn, nhiều các thuật ngữ khác nữa để áp dụng hiệu quả nó vào công việc của bạn.

Tài liệu tham khảo:

https://itzone.com.vn/vi/article/thuat-ngu-trong-kiem-thu-phan-mem-phan-iii/

https://voer.edu.vn/m/cac-dinh-nghia-va-thuat-ngu-kiem-thu-phan-mem/7d808525

https://softwaretestingfundamentals.com/test-plan/