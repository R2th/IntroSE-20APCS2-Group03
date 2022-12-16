# 1. Severity là gì
Severity là mức độ ảnh hưởng của defect với sự phát triển hoặc hoạt động của ứng dụng đang test. Mức độ ảnh hưởng tới các function càng cao thì severity càng cao. Tester/QA thường là người xác định serverity

# 2. Priority
Priority là thứ tự cần xử lý defect. Priority càng cao nghĩa là defect càng cần được giải quyết sớm
Thông thường, những defect ảnh hưởng đến hoạt động của cả hệ thống sẽ được ưu tiên cao hơn những defect của các chức năng nhỏ.

# 3. Phân loại Serverity, Priority
## 3.1 Phân loại Serverity
* Critical: Defect khiến cho tiến trình hoạt động của toàn phần mềm bị ngưng hoàn toàn, không còn phần nào có thể chạy được
* Major: Defect nghiêm trọng, có thể là sập hệ thống nhưng có một số phần khác vẫn hoạt động được
* Medium: Defect gây ra một số hành vi ngoài mong đợi nhưng hệ thống vẫn hoạt động
* Low: Defect không gây ra bất kì sự cố lớn nào cho hệ thống.

## 3.2 Phân loại Priority
* Low: Defect ảnh hưởng đến hoạt động hệ thống nhưng nó có thể giải quyết sau khi những defect nghiêm trọng hơn đã được giải quyết
* Medium: Defect nên được giải quyết trong tiến trình dự án hoặc có thể đợi đến khi version mới ra
* High: Defect phải được giải quyết càng sớm càng tốt vì nó ảnh hưởng nghiêm trọng đến hệ thống và không thể được sử dụng cho đến khi được khắc phục

# 4. Một số tip để xác định Severity của defect
**Dựa trên tần suất xuất hiện:** Trong một số trường hợp, nếu sự xuất hiện của một defect nhỏ thường xảy ra trong mã, ảnh hưởng của nó có thể nhiều hơn. Vì vậy, từ quan điểm của người dùng, nó nghiêm trọng hơn mặc dù đó là một defect nhỏ.

**Dựa trên sự cô lập defect:** Cô lập defect có thể giúp tìm ra mức độ nghiêm trọng theo bảng dưới đây:

![](https://images.viblo.asia/8b08c6f2-0d86-454e-90d1-b0ae91d02674.gif)

# 5. Phân biệt Severity và Priority

![](https://images.viblo.asia/258504e8-08f7-4bc0-82df-cb446a48d369.png)


| Priority | Severity | 
| -------- | -------- |
| Xác định thứ tự ưu tiên để giải quyết defect | Xác định mức độ nghiêm trọng của defect với hoạt động của phần mềm    |
| Phân thành 3 loại: Low, Medium, High | Phân thành 5 loại: Critical, Major, Moderate, Minor, Cosmetic    |
| Priority liên quan đến schedule của dự án | Severity liên quan đến các chức năng và tiêu chuẩn  |
| Priority cho biết defect cần được giải quyết sớm đến mức nào| Severity cho thấy defect ảnh hưởng đến chức năng nghiêm trọng như thế nào  |
| Priority được đưa ra cùng với sự tư vấn của manager, khách hàng| Severity do QA, Tester xác định  |
| Priority được đưa ra dựa trên business value của sản phẩm| Severity đưa ra dựa trên tính năng của sản phẩm  |
| Priority mang tính chủ quan, có thể thay đổi dựa trên tình hình, kế hoạch của dự án| Severity mang tính khách quan, ít thay đổi |
| Priority mang tính chủ quan, có thể thay đổi dựa trên tính hình, kế hoạch của dự án| Severity mang tính khách quan, ít thay đổi |
| Trong UAT, việc giải quyết defect dựa trên priority| Trong SIT, việc giải quyết defect dựa trên severity và sau đó là priority |

Một hệ thống phần mềm có thể có những defect có Severity thấp, Priority cao hoặc có Severity cao, Priority thấp

![](https://images.viblo.asia/03806b48-1741-4205-aeaf-c977f0f7d455.png)

**Ví dụ:**
**Severity thấp, Priority cao:** Lỗi logo của một website giao hàng , Severity thấp vì nó sẽ không ảnh hưởng đến chức năng của trang web nhưng Priority cao vì ngay cả đến logo còn sai thì khách hàng sẽ không có sự tin tưởng và không muốn sử dụng nữa.

**Severity cao, Priority thấp:** Đối với một website khai thác chuyến bay, lỗi về chức năng đặt chỗ có Severity cao vì nó ảnh hưởng đến một trong các function chính nhưng Priority thấp vì chức năng này cần release vào phase sau chứ không phải phase hiện tại.

# 6. Defect Triage
Defect Triage là việc cố gắng cân bằng tiến trình dự án trong trường hợp team test phải đối mặt với sự hạn chế về nguồn lực. Khi có một số lượng defect lớn nhưng số lượng QA/Tester còn hạn chế, Defect Triage giúp giải quyết được càng nhiều defect càng tốt dựa trên các tham số về Severity và Priority

**Defect Triage Process:**

![](https://images.viblo.asia/3e5ad1ca-37d7-47cf-a859-3ca982d289f4.png)

Hầu hết các hệ thống đều dựa trên Priority để đánh giá defect, tuy nhiên một hệ thống tốt còn phải dựa trên Severity
Quá trình xử lý bao gồm các bước sau:

* Review defect bao gồm các defect bị reject
* Đánh giá và xác định Priority, Severity dựa trên nội dung của defect
* Ưu tiên các defect dựa trên input
* Assign defect

# 7. Một số nguyên tắc

* Hiểu rõ khái niệm Priority và severity
* Luôn chỉ định mức Severity dựa trên loại sự cố vì điều này sẽ ảnh hưởng đến Priority của nó
* Hiểu vì sao scenario hoặc test case trong hệ thống có thể ảnh hưởng đến người dùng cuối
* Cần xem xét cần bao nhiêu thời gian để giải quyết một defect dựa trên độ phức tạp và thời gian để verify lỗi

Nguồn: https://www.guru99.com/defect-severity-in-software-testing.html