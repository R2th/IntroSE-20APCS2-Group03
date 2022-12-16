# 1. Test design là gì?
![](https://images.viblo.asia/70b50687-b33f-4059-82ae-4b1a487d1970.jpg)

Test design là tài liệu phác thảo những case cần có trong test case. Hiểu một cách đơn giản thì nó là dạng rút gọn của test case.
Test design có một số đặc điểm sau:
* Thể hiện rõ quan điểm test, những case cần có để cover Spec.
* Ngắn gọn, dễ hiểu.

# 2. Ví dụ
Để hiểu rõ hơn về test design, ta cùng xét ví dụ về màn hình login đơn giản.
User admin/123 đã được đăng kí trong hệ thống. User "test/123" đã bị xóa logic. 


![](https://images.viblo.asia/1486ee33-6ae4-4647-bafc-d283a2246534.png)

**Bước 1:  Tạo test design**

Có nhiều cách để thể hiện test design như mindmap, table, ... Tùy vào thói quen mà mỗi người sẽ có cách thể hiện khác nhau. Mình hay dùng table vì cảm thấy nó dễ convert sang test case hơn.

Bạn có thể tham khảo cách tạo test design bằng mindmap tại bào viết này: https://viblo.asia/p/su-dung-mindmap-thiet-ke-test-design-ZalGrNbZGqX

*Test design cho chức năng login*

| Mục đích| Input (Username/Password)| Output |
| -------- | -------- | -------- |
|  1. Confirm trường hợp login thành công   |  "admin"/"123" |  Login thành công, hiển thị homepage  |
|   2. Confirm trường hợp để trống |   blank/blank  |  Hiển thị message "Thông tin đăng nhập không đúng"  |
|    |   blank/"123"  |  Hiển thị message "Thông tin đăng nhập không đúng"    |
|    |   "admin"/blank| Hiển thị message "Thông tin đăng nhập không đúng"     |
|    3. Confirm trường hợp nhập sai thông tin login |  "abc"/"123"  |  Hiển thị message "Thông tin đăng nhập không đúng"    |
|    | " admin"/"abc" |  Hiển thị message "Thông tin đăng nhập không đúng"    |
|    |  "abc"/"abc"  |  Hiển thị message "Thông tin đăng nhập không đúng"    |
|   4. Confirm trường hợp login bằng user đã bị xóa  |  "test"/"123"  |  Hiển thị message "Thông tin đăng nhập không đúng"   |

**Bước 2: Tạo testcase**

Từ test design ở buớc 1, ta dễ dàng tạo được test case bằng cách thêm Step.

*Test case cho chức năng login*
![](https://images.viblo.asia/d3c8b99f-037b-457c-b01c-dccd5ba93332.png)

# 3. Những lợi ích của test design

Đa số chúng ta đều bỏ qua test design (hoặc chỉ tạo ở trong suy nghĩ) mà viết thẳng test case. Thực tế nó rất quan trọng,  nhất là trong những chức năng có logic phức tạp. Dưới đây là một số lợi ích của test design:
*  Test design ngắn gọn, dễ hiểu, giúp người đọc dễ dàng hình dung những quan điểm test. Đặc bieejet với những chức năng có logic phức tạp thì đọc testdessign dễ chịu hơn testcase rất nhiều.
*  Tránh lack case khi viết test case.
*  Viết theo dạng từ input -> output nên bạn sẽ không phải suy nghĩ nhiều về việc sửa Step khi có thay đổi quan điểm. Tránh tihf trạng râu ông nọ cắm cằm bà kia.
*  Trong trường hợp không đủ thời gian, có thể nhìn vào test design để test mà không cần tạo test case.

# 4. Test design vs Test plan

![](https://images.viblo.asia/e3e31cea-c7eb-4f34-9a16-3b912260e209.jpg)


| Tiêu chí| Test plan | Test design |
| -------- | -------- | -------- |
| Nội dung  | Tài liệu mô tả schedule của đội test cũng như các task cần làm trong dự án.  | Tài liệu design những case cần có trong testcasse của một modul hay chức năng. |
|   Đặc điểm| Bao gồm tất cả các hoạt động trong dự án như: xác định phạm vi, vai trò, rủi ro,... Các task được gán cho từng thành viên trong nhóm.| Thể hiện rõ quan điểm test, ở mỗi case thể hiện rõ giá trị input và output mong muốn.  |
|   Vai trò| Giúp việc quản lý, theo dõi và báo cáo tiến độ công việc dễ dàng hơn.   |  Dễ dàng hơn trong việc review cũng như tạo testcase, tránh lack case |

Test design nhiều lợi ích như vậy thì còn ngại gì mà không thử nhỉ :))

> Tài liệu tham khảo:
> 
https://viblo.asia/p/su-dung-mindmap-thiet-ke-test-design-ZalGrNbZGqX

https://www.getzephyr.com/insights/test-plan-vs-test-design-whats-difference

https://en.wikipedia.org/wiki/Test_design