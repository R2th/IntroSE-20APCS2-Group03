Ở Phần 3 mình có trình bày về Testcase:
- Thế nào là TestCase?
- Những lưu ý khi viết testcase.
- Một testcase cơ bản.
- VIẾT TESTCASE HIỆU QUẢ & ĐẦY ĐỦ.

Link: https://viblo.asia/p/toi-da-hoc-de-tro-thanh-tester-nhu-the-nao-p3-yMnKMOyNl7P

Ở phần này mình xin giới thiệu về thứ thú vị nhất trong kiểm thử phầm mềm, đó chính là Bug.

# I. Thế nào là Bug?

## I.1. Khái niệm: 
- Bug là những lỗi  phát sinh trong phần mềm, phát sinh từ  sự không khớp giữa chương trình và đặc tả của nó. 
- Bug là những lỗi xảy ra khi thực thi test phần mềm.
- Phần mềm có quá nhiều bug thì sẽ không sử dụng được , gây mất uy tín của công ty trên thị trường và có thể khiến cả công ty phá sản.

## I.2. Severity - Mức độ nghiêm trọng của Bug: 
- Critical: Những lỗi nghiêm trọng khiến người dùng không thể sử dụng được hệ thống, mất data...
- High: Những lỗi khiến các chức năng chính của hệ thống không chạy được.
- Normal: Những lỗi bình thường, không đáp ứng được những function nhất định, nhưng không ảnh hưởng nhiều đến các chức năng khác của chương trình. 
- Low:  Những lỗi không ảnh hưởng đến chức năng, có thể là liên quan đến giao diện, chính tả...

## I.3. Priority - Độ ưu tiên của Bug: 
Khi phát hiện 1 bug, tester sẽ xác định mức độ nghiêm trọng của bug đó, bao gồm các mức:
- High
- Medium
- Low

Bug nào càng có độ nghiêm trọng cao thì developer nên ưu tiên fix trước. 

Thông thường thì bug về function - chức năng thì có độ nghiêm trọng cao hơn bug về giao diện và bug phi chức năng (hiệu năng, tính khả dụng, thân thiện,...). 

Nếu nhiều bug cùng là bug chức năng thì tùy yêu cầu dự án, và thứ tự ưu tiên release (phát hành - giao cho khách hàng) mà gán độ ưu tiên.
### Nói chung: Nếu bug nào xảy ra mà không thể test được các chức năng khác nữa thì thường là ưu tiên cao hơn

# II. Vòng đời của Bug

## II.1. Các trạng thái của Bug: 
- New: Trạng thái bắt đầu của bug.
- In Progress: Dev đang xử lý
- Resolved: Dev xử lý xong
- Testing: Tester tiến hành test lại
- Re-open: Tiến hành test lại nhưng vẫn còn bug
- Closed: Tiến hành test lại và đã hết bug
- Cancel: hủy bug 

## II.2. Quy Trình xử lý lỗi: 
Quy trình xử lý lỗi có thể bao gồm 6 bước chính:
- Bước 0: Bắt đầu - phát hiện phần mềm có lỗi
- Bước 1: Đưa lỗi lên hệ thống tracking
- Bước 2: Gán lỗi cho Dev
- Bước 3: Dev xử lý lỗi
- Bước 4: Tester kiểm thử lại
- Bước 5: Đóng lỗi



### II.2.1. Đưa lỗi lên hệ thống tracking

- Người thực hiện: tất cả các thành viên trong đội dự án như quản trị dự án, nhóm kiểm thử, nhóm giải pháp, nhóm lập trình.   
- Trạng thái của lỗi là NEW.  
- Một số thông tin cần có về lỗi: 
    
    Subject: Tóm tắt nội dung lỗi , có thể coi là tiêu đề của lỗi. 
    
    Category: Thư mục  lỗi dùng để phân  loại  lỗi,  lỗi  thuộc phần chức năng nào phải chọn đúng phần thư mục lỗi tương ứng để thuận tiện cho việc tra cứu, thống kê lỗi của chức năng.  
    
    Severity: Dựa vào mục I.2. Severity - Mức độ nghiêm trọng của Bug
    
    Priority: Dựa vào mục I.3. Priority - Độ ưu tiên của Bug.  
    
    Subject: Tóm tắt nội dung lỗi , có thể coi là tiêu đề của lỗi.  
    
    Description: Đây là phần mô tả lỗi, phải mô tả rõ các phần nội dung: 
        
       o  Precondition : Điều kiện tiền đề
        o  Step to perform : Các bước thực hiện
        o  Actual Result : Kết quả trả về từ hệ thống 
        o  Expected Result: Kết quả mong muốn 
        o  Bug Evidence
        o  Environment : Môi trường tái tạo bug

### II.2.2. Gán lỗi cho Dev
-  Nhân viên kiểm thử thực hiện gán  ỗi cho nhân viên phát triển, người sẽ chịu trách nhiệm về phần chức năng bị lỗi.   
-  Lưu ý:   
 Test Leader, PM có thể xem xét lại các lỗi trên hệ thống tracking bug: 
    
    o  Nếu  thấy  không  phải  là  lỗi  thì  đưa lỗi  về  trạng thái Cancel và note nguyên nhân.  
    o  Nếu thấy Tester mô  tả không  rõ ràng thì yêu cầu Tester bổ sung thêm thông tin.  
    o  Nếu thấy  lỗi không thuộc phạm vi phát triển của dự án trong giai đoạn hiện tại thì chuyển qua trạng thái LATER và rõ nguyên nhân.  
    o  Nếu thấy là lỗi nhưng  có  thể  chấp  nhận được  thì chuyển lỗi sang trạng thái ACCEPTED  và nêu  rõ nguyên nhân.

### II.2.3.  Xử lý lỗi 
DEV xem xét các lỗi được gán cho mình: 
-  Nếu  thấy đúng  là  lỗi  và đã mô  tả  lỗi  rõ  ràng, đầy đủ  thông  tin,  DEV thực hiện sửa  lỗi và chuyển  lỗi về trạng thái RESOLVED, đồng thời bắt buộc nêu  rõ hướng giải quyết và các chức năng bị  ảnh hưởng trong phần NOTES.  
-  Các trường hợp khác: Nếu thấy không phải là lỗi của hệ thống, nhân viên phát triển sẽ yêu cầu Tester bổ sung thêm thông tin, hoặc thấy  là  lỗi nhưng có thể chấp nhận được  lỗi  thì  nhân  viên phát  triển  chuyển  lỗi  sang  trạng  thái CONFIRMED  và  nêu  rõ  lý do chuyển lỗi sang trạng thái CONFIRMED trong phần NOTES. 

### II.2.4. Kiểm thử lại lỗi
Theo phân công của Test Leader, Tester thực hiện kiểm thử lại các chức năng có lỗi đang ở trạng thái RESOLVED: 
-  Nếu lỗi đã được sửa thì chuyển lỗi về trạng thái CLOSED.  
-  Nếu  lỗi  chưa  được  sửa  hoặc  mới  chỉ   sửa  một  phần  thì   chuyển  lỗi  về  trạng  thái Reopen và nêu rõ những phần chức năng nào chưa chỉnh sửa để DEV tiến hành sửa tiếp.  
-  Nếu thấy có thể chấp nhận lỗi thì chuyển lỗi về trạng thái ACCEPTED. Đồng thời khi cập nhật kịch bản kiểm thử thì sẽ để kết quả của case đó là fail (vì vẫn là lỗi).  
-  Trong mọi trường hợp, cần có note lại Evidence và Environment một cách rõ ràng và chi tiết nhất.

Để hiểu rõ hơn các bạn có thể xem sơ đồ vòng đời vủa bug:
![](https://images.viblo.asia/14d80029-f57f-40b4-b4ac-19a66903aa63.jpg)

# III. Làm thế nào để viết bug dễ hiểu

- Subject của bug không quá dài , ghi ngắn gọn và dễ hiểu. 
- Nội dung gồm những phần sau:
        
        o  Precondition : Mô tả rõ điều kiện tiền đề của bug là gì. Mô tả rõ Prefix để có thể dễ dàng filter sau này
        o  Step to perform : Ghi các bước thực hiện theo step 1 cách tuần tự, chính xác
        o  Actual Result : Mô tả hiện tượng được coi là bug, không đúng với mong muốn
        o  Expected Result: Kết quả mong muốn 
        o  Bug Evidence: Attach image/ video hoặc là output file (nếu có) của bug
        o  Environment : Cần ghi chi tiết OS nào, trình duyệt nào, version bao nhiêu.

Ngoài ra có thể attach thêm file đầu vào nếu cần thiết.

Ví dụ:

![](https://images.viblo.asia/c87c9843-8079-41ac-a49a-d19022e1a84b.PNG)


# Tổng kết:
Trong phần này mình đã chia sẻ về các kiến thức:
- Thế nào là Bug?
- Vòng đời của Bug.
- Làm thế nào để viết bug dễ hiểu.

Việc tìm,post Bug là một phần rất quan trọng, thú vị khi thực hiện test.

Đối với một report bug được viết 1 cách rõ ràng, chính xác sẽ "được đón nhận" một cách dễ hơn so với 1 bug được viết sơ sài, cẩu thả.

Cứ đặt mình vào vị trí của DEV, bạn sẽ hiểu khi đang rất khổ sở vì phải fix bug, mà gặp phải 1 report bug mà đọc vào không hiểu gì thì không thể không ức chế.

Vậy hãy cố gắng viết những report bug tốt nhất có thể và hãy "nhẹ nhàng" với những bạn DEV nhé.