## 1. Vòng đời của 1 bug
**Bug là gì**: 
Theo wikipedia định nghĩa: "Bug là những error, flaw, failure, hay fault tạo ra một kết quả sai, hoặc không lường đến được."

**Vòng đời của bug**: là từ khi tìm thấy bug đến khi close bug

![](https://images.viblo.asia/48eb13fe-fab4-422b-9ec3-bf14ce919e68.png)

**NEW**  trạng thái là khi tester tìm ra bug. Sau khi tìm ra bug thì tester cần báo cho Teamlead hoặc devoloper bằng cách log bug 

**OPEN** là trạng thái bug được log lên bởi tester.
Sau khi Teamlead nhận bug thì  sẽ xác định xem đó có phải là bug hay không.  
-> **REJECTED**: Khi teamlead xác nhận rằng bug đó không hợp lệ thì sẽ được đánh dấu là Rejected 
Còn nếu  bug đó là hợp lệ  thì sẽ xác định xem bug đó đã tồn tại hay chưa

-> **DUPLICATE**: Nếu bug đã tồn tại thì sẽ đánh dấu nó là DUPLICATE. 

Nếu bug chưa tồn tại thì sẽ xác định xem bug đó  có trong phạm vi xử  lý hay  không (scope)

-> **DEFERRED**: Nếu bug không trong phạm vi xử lý thì sẽ được chuyển sang trạng thái Deferred

-> **ASSIGNED**: Nếu bug trong phạm vi xử lý thì sẽ được chuyển cho developer để tiến hành fix bug

->**FIX**: Khi nhận được bug từ team lead, developer sẽ thực hiện  fix bug cho đúng với yêu cầu, và đẩy lại cho tester kiểm tra lại lỗi đó.

-> **RE-TESTING** : Sau khi fix xong bug, thì bug sẽ được assign lại cho tester , tester sẽ  test lại xem nó đã chạy đúng hay chưa.

-> **CLOSED**:  Khi bug được xác minh lại là đã chạy đúng như yêu cầu thì tester sẽ đánh dấu nó là CLOSED.

-> **RE-OPENED**: Nếu như tester test lại mà bug đó  vẫn xảy ra thì bug đó sẽ được gán là Re-Open và assign lại cho developer để fix lại 

## 2. Cấu trúc report bug
***Khi log bug cần lưu ý các điểm sau***: 

- What: Bug này là bug gì,độ nghiêm trọng của nó như thế nào?

- Where: Xác định lỗi ở đâu,trên môi trường nào (web thì browser nào,app thì trên hệ điều hành nào)

- When: Bug xảy ra khi nào (nghĩa là thực hiện những bước nào thì xảy ra Bug)

- How: Hướng sửa Bug đó như thế nào? (expected result)

- Who: Bug do code của ai gây ra 

***Format report bug***: 
- Project Code: Dự án hay sản phẩm xuất hiện bug
- Defect ID: tên bug
- Title: Miêu tả ngắn gọn bug
- Description: Miêu tả chi tiết bug
- Severity: Mức độ nguy hại của bug
- Type: Phân loại bug
- Status: Trạng thái hiện tại của bug
- Stage detected: Phạm vi hoạt động của dự án xác định vòng  đời khi lỗi được phát hiện
- Activity: Các bước mô tả
- Process origin:  Tên hay mã nguồn của đoạn phần mềm mà trong đó bug là nguồn gốc
- Priority: Độ ưu tiên
- Creator: Người phát hiện bug
- Create date::  Ngày baó cáo bug
- Assign to: Người chịu trách nhiệm về bug
- Due date: Hạn chót cho việc hoàn thành bug
- Close date: ngày close bug
- Attached:  ảnh hoặc video mô tả

Ví dụ: 
![](https://images.viblo.asia/8983df5f-6014-468d-9137-799ac4c1909d.png)

![](https://images.viblo.asia/8504d789-f524-4d29-9ed7-d7c83e0b8b87.png)

## 3. Một số dạng thường gặp của bug
- Không thực hiện chức năng được yêu cầu
- Những yêu cầu đầu vào không được hiểu rõ
- Một phần hay toàn bộ đặc tính không được hoàn thành
- Không theo luồng công việc
- Lỗi giao diện
- Tốc độ xử lý, lỗi cấu hình, bộ nhớ
- Lỗi về document
- Vấn đề với xử lý dữ liệu hoặc luồng dữ liệu vào ra
- Vấn đề với đặc quyền người dùng hoặc bảo mật

....
## 4. Priority và severity
### Severity

***Critical***:  Những lỗi nghiêm trọng khiến người dùng không thể sử dụng được ứng dụng(crash, không cài được hệ thống....)

***Major***: Chức năng chính của sản phẩm không hoạt động (ví dụ: app game không thực hiện được tính năng play game, web quản lý thông tin sinh viên không thực hiện tính  năng hiển thị thông tin sinh viên, ...)

***Medium*** :  Sản phẩm hoặc ứng dụng hoạt động không đáp ứng tiêu chí nhất định hoặc vẫn còn bộc lộ một số hành vi không mong muốn, tuy nhiên các chức năng khác của hệ thống không bị ảnh hưởng.

***Low***:  Lỗi xảy ra hầu như không ảnh hưởng gì đến chức năng, nhưng vẫn là lỗi và vẫn cần được sửa. Ví dụ như các lỗi về sai text, sai vị trí button...

### Priority
***High***: Bug phải được sửa ngay lập tức 

***Medium***: Bug có thể được sửa trong lần cập nhật phiên bản sau

***Low***: Bug không cần sửa ngay, có thể sửa sau khi các bug High và Medium đã được sửa hết

### Mối quan hệ giữa priority và severity
***High Priority – High Severity*** bug có độ nghiêm trọng cao- độ ưu tiên cao

Vd: lỗi crash app, ảnh hưởng rất lớn đến hệ thống cần phải fix ngay

***High Severity – Low Priority*** bug có độ nghiêm trọng cao- độ ưu tiên thấp

Vd:  trong app đọc truyện, khi đến câu chuyện thứ 100 thì không hiển thị nội dung chuyện, tuy nhiên để đọc đến câu chuyện thứ 100 thì người chơi cần phải đọc trong 1 khoảng thời gian dài, do đó đây là 1 lỗi nghiêm trọng nhưng có thể từ từ fix

***High Priority – Low Severity*** bug có độ nghiêm trọng thấp- độ ưu tiên cao

Vd: sai tên logo công ty, tuy không ảnh hướng đến hê thống nhưng lại ảnh hướng lớn đến hình ảnh công ty nên cần được ưu tiên fix trước

***Low Priority – Low Severity bug*** bug có độ nghiêm trọng thấp - độ ưu tiên thấp

Vd, nhưng bug sai vị trí button

![](https://images.viblo.asia/80515c48-d43c-4b5f-b96d-c838133980a3.jpg)

**Kết luận**: 
Trên đây là những kiến thức căn bản về bug mà chúng ta cần hiểu rõ trước khi log bất kể 1 report nào nhằm hạn chế tối đa report sai bug hoặc report bug khó hiểu. 


Tài liệu tham khảo:
https://www.slideshare.net/qnv96/tm-hiu-v-k-thut-kim-th-phn-mm

https://viblo.asia/p/vong-doi-cua-bug-Az45bbdq5xY