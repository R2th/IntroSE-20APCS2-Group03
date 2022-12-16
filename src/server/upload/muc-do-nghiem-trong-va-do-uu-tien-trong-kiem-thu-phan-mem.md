## 1. Khái niệm
### Bug severity - mức độ nghiêm trọng của bug
Mức độ nghiêm trọng của bug là mức độ ảnh hưởng của lỗi đó trên phần mềm mà chúng ta test. Ảnh hưởng của lỗi càng cao sẽ dẫn đến mức độ nghiêm trọng cao hơn. QA nên thường xuyên xác định mức độ nghiêm trọng của lỗi.

### Priority - Mức độ ưu tiên
Mức độ ưu tiên được định nghĩa là thứ tự của 1 lỗi nên được fix khi nào. Độ ưu tiên càng cao thì càng nên giải quyết sớm. Các lỗi khiến phần mềm không sử dụng được được ưu tiên cao  hơn một chức năng nhỏ bị lỗi.

## 2. Phân loại 
### Trong kiểm thử phần mềm, mức độ nghiêm trọng của lỗi được chia thành 4 loại:
+ Critical: lỗi này cho biết quá trình hoạt động của hệ thống đã bị ngừng, cần được xử lý ngay lập tức.
+ Major: đây là một lỗi có thể làm ngừng hoạt động 1 phần hệ thống, tuy nhiên một số chức năng khác vẫn hoạt động bình thường.
+ Medium: gây ra những hành vi không mong muốn nhưng hệ thống vẫn hoạt động được.
+ Low: một lỗi nhỏ, không gây ảnh hưởng đến bất kì chức năng nào của hệ thống.

### Độ ưu tiên của lỗi thường được chia làm 3 loại:
+ High: Lỗi phải được khắc phục càng sớm càng tốt vì nó ảnh hưởng nghiêm trọng đến hệ thống và không thể sử dụng cho đến khi fix xong.
+ Medium: Lỗi cần được giải quyết. Chúng ta có thể test các phần khác cho đến khi bản mới của lỗi được built.
+ Low: Nó gây khó chịu, có thể fix khi 1 lỗi khác nghiêm trọng hơn được fix.

## 3. Các mẹo để xác định độ nghiêm trọng của bug
- Tần suất xuất hiện: trong một số trường hợp, nếu một lỗi nhỏ xảy ra thường xuyên thì nó có thể nghiêm trọng hơn. Vì vậy, ở dưới góc độ của người nhìn, nó trở nên nghiêm trọng hơn mặc dù chỉ là một lỗi nhỏ.
- Cô lập lỗi: Cô lập lỗi có thể giúp chúng ta tìm ra độ ảnh hưởng => độ nghiêm trọng của lỗi.

![](https://images.viblo.asia/9bfce151-85bf-4d35-8218-2c0291b2958a.gif)

## 4. Sự khác nhau giữa Priority và Severity

| Độ ưu tiên | Mức độ nghiêm trọng | 
| -------- | -------- |
| Xác  định thứ tự mà dev cần giải quyết     | Xác định mức độ ảnh hưởng của lỗi đối với phần mềm     |
| Liên quan đến việc lập kế hoạch     | Liên quan đến tiêu chuẩn và các chức năng khác     |
| Độ ưu tiên cho biết lỗi nên được sửa sớm ở mức nào     | Mức độ nghiêm trọng cho thấy độ nghiêm trọng của lỗi trên chức năng sản phẩm     |
| Độ ưu tiên được quyết định với sự tham vấn của quản lý / khách hàng     | QA xác định mức độ nghiêm trọng của bug     |
| Độ ưu tiên được xác định bởi nghiệp vụ	     | Mức độ nghiêm trọng được xác định bởi chức năng     |
| Có thể thay đổi trong một khoảng thời gian tùy thuộc vào tình hình dự án     | Ít có khả năng thay đổi     |
| Khi UAT, team phát triển sẽ fix các lỗi dựa vào mức độ ưu tiên     | Trong quá trình SIT, team phát triển fix lỗi dựa trên mức độ nghiêm trọng nhiều hơn và sau đó là mức độ ưu tiên     |

## 5. Ví dụ về độ nghiêm trọng và độ ưu tiên của lỗi

![](https://images.viblo.asia/d35a5666-bc63-42c0-a59b-ee9f801f4ca0.png)

Ví dụ dưới đây về mức độ nghiêm trọng thấp, mức độ ưu tiên cao và ngược lại:
- Mức độ nghiêm trọng thấp, mức độ ưu tiên cao: Logo của 1 website bị sai, có thể độ nghiêm trọng thấp vì nó không ảnh hưởng đến các chức năng khác nhưng có thể có độ ưu tiên cao vì logo sai ảnh hưởng đến uy tín của công ty.
- Mức độ nghiêm trọng cao, mức độ ưu tiên thấp: Ví dụ lỗi ở 1 game có nhiều level. Hiện tại level 5 đang bị crash, không chơi được. Đây là một lỗi rất nghiêm trọng nhưng lại có độ ưu tiên thấp hơn. Vì muốn đến được level 5 thì ta phải qua được level 1,2,3,4 nên những lỗi ở level 1,2,3,4 có độ ưu tiên cao hơn.

## 6. Defect triage (thử nghiệm lỗi)
Kiểm thử sai sót là một quá trình để cố gắng cân bằng lại quy trình trong đó nhóm kiểm thử phải đối mặt với việc hạn chế nguồn nhân lực. Số lượng lỗi lớn, nhân lực hạn chế thì việc phân loại lỗi sẽ giúp chúng ta giải quyết nhanh hơn.
Quá trình xử lý bao gồm những bước sau:
- Xem xét tất cả các bug bao gồm cả các bug bị reject
- Đánh giá ban đầu về lỗi dựa trên nội dung của nó và set mức độ ưu tiên và mức độ nghiêm trọng tương ứng
- Ưu tiên các lỗi dựa trên các đầu vào
- Chỉ định lỗi cần sửa để release chính xác bởi người quản lý sản phẩm
- Assign lại lỗi cho chủ sở hữu / nhóm để thực hiện

## 7.  Gợi ý tester nên xem xét trước khi chọn mức độ nghiêm trọng
Mức độ nghiêm trọng được đánh giá bởi người kiểm thử trong khi độ ưu tiên được đánh giá bởi người quản lý sản phẩm hoặc nhóm phân loại. Để phân loại độ ưu tiên, bắt buộc người kiểm thử phải chọn đúng mức độ nghiêm trọng.
- Hiểu rõ khái niệm độ ưu tiên và mức độ nghiêm trọng
- Luôn luôn gán mức độ nghiêm trọng dựa trên loại bug vì điều này sẽ ảnh hưởng đến mức độ ưu tiên của nó
- Hiểu kịch bản (scenario) cụ thể hoặc testcases sẽ ảnh hưởng đến người dùng cuối
- Cần xem xét cần bao nhiêu thời gian để sửa lỗi dựa trên độ phức tạp và thời gian để xác minh lỗi.

## Kết luận
Trong kĩ thuật phần mềm, việc xác định mức độ nghiêm trọng sai có thể làm chậm quá trình phát triển phần mềm và làm giảm hiệu suất chung của nhóm. Vì vậy, người có trách nhiệm cần phải xác định chính xác mức độ nghiêm trọng và độ ưu tiên của lỗi.

Bài viết được dịch và có sự bổ sung:   https://www.guru99.com/defect-severity-in-software-testing.html