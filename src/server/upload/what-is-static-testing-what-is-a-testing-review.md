# Static Testing là gì?
Static Testing là một kỹ thuật kiểm thử phần mềm được sử dụng để kiểm tra các lỗi trong ứng dụng phần mềm mà không cần thực thi mã. Static Testing được dùng ở giai đoạn đầu của dự án vì khi đó bug dễ tìm ra và dễ giải quyết hơn. Nó cũng giúp tìm ra các lỗi mà Dynamic Testing có thể không tìm thấy.

2 kĩ thuật Static Testing:
- Review (manual)
- Static analys (tool) 
=> Điểm chung của 2 kỹ thuật này là without execution of code (không thực thi mã)

# Vậy Testing Review là gì?
Review trong Static Testing là một quá trình hoặc một cuộc họp được tiến hành để tìm ra các khiếm khuyết tiềm ẩn trong thiết kế của bất kỳ chương trình nào. Một ý nghĩa khác của review là khi những người tham gia hiểu rõ về tiến độ dự án sẽ đưa ra được nhiều đánh giá đề xuất đa dạng. Tài liệu sẽ được kiểm tra bởi mọi người và sự khác biệt sẽ được phân loại

Quá trình Reviews  có thể chia thành 4 phần
- Informal review
- Hướng dẫn
- Đánh giá kỹ thuật
- Kiểm tra

Trong quá trình Reviews, nhóm người tham gia thử nghiệm là:
- Moderator: Lên todo list , theo dõi công việc, tranning member, lên lịch họp
- Author: chịu trách nhiệm sửa chữa các lỗi được tìm thấy, và update tài liệu
- Scribe: Ghi lại các lỗi được tìm thấy và tham gia họp đánh giá tổng kết 
- Reviewer: Kiểm tra tài liệu về các defects và kiểm tra
- Manager: Quyết định việc thực hiện review và đảm bảo mục tiêu của quá trình đánh giá

Các loại defects có thể dễ dàng tìm thấy hơn trong quá trình Static Testing là:

- Sai lệch so với tiêu chuẩn
- Code không thể bảo trì
- Lỗi thiết kế
- Thiếu requirement
- Thông số kỹ thuật giao diện không nhất quán

Thông thường, lỗi được phát hiện trong quá trình thử nghiệm tĩnh là do lỗ hổng bảo mật, các biến không được khai báo, vi phạm ranh giới, vi phạm cú pháp, giao diện không nhất quán

# Tại sao phải Static Testing?
Kiểm tra tĩnh được thực hiện do những lý do sau

- Phát hiện và sửa lỗi sớm
- Giảm thời gian phát triển
- Giảm chi phí và thời gian thử nghiệm
- Để cải thiện năng suất 
- Để có ít sai sót hơn ở giai đoạn thử nghiệm sau

# Điều gì được kiểm tra trong Static Testing
Trong Kiểm tra tĩnh, những điều sau sẽ được kiểm tra

- Các trường hợp kiểm tra đơn vị
- Tài liệu Yêu cầu Kinh doanh (BRD)
- Use Cases
- Yêu cầu Hệ thống / Chức năng
- Prototype
- Tài liệu Đặc điểm kỹ thuật Prototype
- Thiết kế data base
- Dữ liệu thử nghiệm
- Traceability Matrix Document
- Hướng dẫn sử dụng / Hướng dẫn đào tạo / Tài liệu
- Tài liệu Test Plan/ Test Cases
- Automation/Performance Test Scripts

# Cách Static Testing được thực hiện
Để thực hiện Static Testing, người ta hiện theo các cách sau,

- Thực hiện quy trình kiểm tra để kiểm tra toàn bộ thiết kế của ứng dụng
- Sử dụng danh sách kiểm tra cho từng tài liệu đang được xem xét để đảm bảo tất cả các đánh giá được bao phủ hoàn toàn

# Các hoạt động khác nhau để thực hiện Static Testing là:

- **Xác thực các yêu cầu của Use Case:** Static Testing xác thực rằng tất cả các hành động của người dùng cuối đều được xác định, cũng như bất kỳ đầu vào và đầu ra nào liên quan đến chúng. Các case sử dụng càng chi tiết và kỹ lưỡng thì các case kiểm thử càng chính xác và toàn diện.
- **Xác thực các yêu cầu chức năng :** Static Testing đảm bảo rằng các Yêu cầu chức năng đáp ứng được tất cả các yêu cầu cần thiết. Static Testing cũng check cơ sở dữ liệu, danh sách giao diện và các yêu cầu về phần cứng, phần mềm và mạng.
- **Architecture Review** : Tất cả quy trình ở cấp độ nghiệp vụ như vị trí máy chủ, sơ đồ mạng, định nghĩa giao thức, cân bằng tải, khả năng truy cập cơ sở dữ liệu, thiết bị kiểm tra, v.v.
- **Xác thực Prototype / Screen Mockup** : Giai đoạn này bao gồm xác thực các validation of requirements and use cases
- **Field Dictionary Validation:** Mọi trường trong giao diện người dùng được xác định đủ tốt để tạo các trường hợp kiểm tra xác thực cấp trường. Các trường được kiểm tra độ dài tối thiểu / tối đa, giá trị danh sách, thông báo lỗi, v.v.

# Static Testing Techniques

- Informal Reviews
- Walkthroughs
- Technical Reviews
- Inspections
- Static Analysis
              - Data Flow
              - Control Flow
![](https://images.viblo.asia/47da0fb0-4271-4357-82e8-698824d6d192.jpg)
# Tools used for Static Testing

Các công cụ khác nhau được sử dụng để Static Testing
* Checkstyle
* Soot
* SourceMeter

# Mẹo cho quy trình Static Testing thành công
Một số mẹo hữu ích để thực hiện quy trình Static Testing trong Kỹ thuật phần mềm.

* Chỉ tập trung vào những thứ thực sự quan trọng
* Lập kế hoạch rõ ràng và theo dõi các hoạt động đánh giá. Hướng dẫn và kiểm tra phần mềm thường tổng hợp vào các đánh giá của bạn bè
* Huấn luyện người tham gia bằng các ví dụ
* Giải quyết các vấn đề về con người
* Giữ quy trình chính thức như văn hóa dự án
* Cải tiến liên tục - Quy trình và Công cụ
* Bằng cách loại bỏ sự chậm trễ lớn trong quá trình thực hiện thử nghiệm, chi phí và thời gian thử nghiệm có thể được giảm bớt

# Tóm lược:

* Kiểm tra tĩnh là để tìm ra các khuyết tật càng sớm càng tốt.
* Kiểm tra tĩnh không thay thế cho kiểm tra động, cả hai đều tìm ra một loại khuyết tật khác nhau
* Đánh giá là một kỹ thuật hiệu quả để Kiểm tra tĩnh
* Đánh giá không chỉ giúp tìm ra các khiếm khuyết mà còn hiểu được các yêu cầu còn thiếu, các khiếm khuyết trong thiết kế, mã không thể bảo trì.
* Giảm chi phí và thời gian phát triển
* Tăng năng xuất phát triển (do thiết kế được cải tiến, mã dễ bảo trì hơn)
* Giảm chi phí và thời gian test
* Cải thiện giao tiếp giữa các thành viên nhóm trong quá trình tham gia đánh giá

Nguồn tham khảo
* https://www.guru99.com/testing-review.html?fbclid=IwAR2VdUO-26JYa9fMCH9zKRXeKaEQyJfbAGsjwjs4gxVeIbWNgOrwqu8UVBg
* Chương 3 ISTQB