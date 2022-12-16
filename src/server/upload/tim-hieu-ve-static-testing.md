## 1. Static testing là gì?
Static testing là một kỹ thuật kiểm thử phần mềm để tìm kiếm lỗi trong phần mềm/ ứng dụng mà không thực thi code. Khác với Dynamic testing đó là kỹ thuật cần thực thi code. Kiểm thử tĩnh được thực hiện để tránh lỗi sớm trong giai đoạn đầu phát triển phần mềm, nó cũng dễ dàng xác định lỗi và giải quyết lỗi. Nó còn giúp tìm kiếm lỗi mà có thể không tìm thấy ở Dynamic testing. 

Có 2 loại chính của kỹ thuật kiểm thử tĩnh là:
* Kiểm thử thủ công hay còn gọi là các hoạt động review
* Kiểm thử tự động là sử dụng các tool để phân tích

![](https://images.viblo.asia/dc8f67a9-9822-4a2a-8fe3-e6bd35079187.jpg)

## 2. Tại sao Static testing là cần thiết

* Kiểm tra tĩnh cho phép phát hiện sớm các khuyết tật trước khi thực hiện kiểm tra động (ví dụ: trong các yêu cầu hoặc đánh giá thông số kỹ thuật thiết kế, sàng lọc tồn đọng sản phẩm, v.v.).
* Các khiếm khuyết được phát hiện sớm thường rẻ hơn nhiều so với các khiếm khuyết được tìm thấy sau đó trong vòng đời, đặc biệt là so với các khiếm khuyết được tìm thấy sau khi phần mềm được triển khai và sử dụng tích cực
* Tăng năng suất phát triển (ví dụ: do thiết kế được cải tiến, mã dễ bảo trì hơn)
* Giảm chi phí và thời gian phát triển
* Giảm chi phí và thời gian thử nghiệm
* Xác định các khuyết tật không dễ tìm thấy bằng thử nghiệm động
* Phát hiện và sửa chữa các khuyết tật hiệu quả hơn và trước khi thực hiện thử nghiệm động

## 3. Quy trình thực hiện Static testing
**Quy trình review gồm 5 hoạt động chính:**
* Planning 
* Initiate review 
* Individual review 
* Issue communication and analysis 
* Fixing and report

**1.Planning**

* Xác định scope, bao gồm mục đích của review, những tài liệu or 1 phần tài liệu để review, và các đặc điểm chất lượng để đánh giá
* Ước lượng effort và khung thời gian
* Xác định các đặc điểm review như là loại review với roles, activities, và checklist
* Lựa chọn người để tham gia review và phân bổ vai trò
* Xác định tiêu chí đầu vào và đầu ra cho mỗi loại formal review
* Kiểm tra tiêu chí đầu vào được đáp ứng

**2. Initiate review** 

* Phân phối sản phẩm làm việc và vật liệu khác như là form log issue, checklists, và liên quan đến sản phẩm làm việc
* Giải thích về scope, mục tiêu, process, roles, và sản phẩm đến những thành viên tham gia
* Trả lời cho bất kỳ câu hỏi nào mà thành viên có thể có trong buổi review

**3.Individual review**

* Review tất cả or 1 phần sản phẩm
* Ghi lại những lỗi tiềm năng, recommendations và question 

**4.Issue communication and analysis** 
* Truyền đạt các lỗi tiền năng đã được xác định
* Phân tích lỗi tiềm năng, chỉ định quyền sở hữu và trạng thái cho nó
* Đánh giá và ghi lại các đặc tính chất lượng
* Đánh giá lại các phát hiện được tìm thấy với tiêu chí đầu ra để ra quyết định review

**5.Fixing and report**

* Tạo report lỗi 
* Fix lỗi tìm thấy
* Thông báo lỗi cho mọi người
* Ghi lại, update lại trạng thái của lỗi
* Tập hợp số liệu (những loại formals review)
* Kiểm tra tiêu chí đầu ra được đáp ứng
* Chấp nhận sản phẩm khi tiêu chí đầu ra đạt được

## 4. Static testing bao gồm những loại nào?
**Testing review là gì?**

Review trong static testing là 1 quy trình hay 1 cuộc họp được tiến hành để tìm kiếm những lỗi tiềm năng trong thiết kế hoặc chương trình bất kỳ. Một ý nghĩa khác của review là tất cả các thành viên trong nhóm đều biết tiến độ của project và đôi khi sự đa dạng về suy nghĩ có thể dẫn đến những đề xuất tuyệt vời. 

Các kỹ thuật review thường dùng: 
![](https://images.viblo.asia/3357036d-6ef7-4fb4-9d4e-a819c3d46e3b.png)


Các thành phần tham gia review:
* Moderator: Thực hiện kiểm tra đầu vào, theo dõi làm lại, huấn luyện thành viên của team, lên lịch trình meeting 
* Author: Chịu trách nhiệm fix những lỗi được tìm thấy và cải thiện chất lượng tài liệu
* Scribe: Ghi lại những vấn đề xảy ra, log bug và tham dự review meeting
* Reviewer: Kiểm tra tài liệu xem có defect và thanh tra
* Manager: Quyết định thực hiện review và đảm bảo mục tiêu được đáp ứng

**Informal Reviews:** 

* Mục đích chính: Phát hiện lỗi tiềm năng không dự vào 1 process chính thức nào 
* Review meeting: Led by author
* Performed by: 1 đồng nghiệp của tác giả hoặc nhiều người hơn
* Result: có thể được ghi lại 
* Use of checklist: có thể có hoặc không

**Walkthrough:**
* Mục đích chính: tìm lỗi, cải thiện sản phẩm phần mềm, xem xét các triển khai thay thế, đánh giá sự phù hợp với các thông số kỹ thuật. Cá nhân có thể có hoặc không chuẩn bị trước khi review. 
* Review meeting: có, dẫn dắt bởi tác giả của sản phẩm phần mềm
* Scribe: bắt buộc
* Use of checklist: có thể có hoặc không
* Result: Logs những lỗi tiềm năng và review reports có thể được tiến hành. Có thể thay đổi trong thực tế từ informal đến formal 

**Technical review:**
* Mục đích chính: đạt được sự đồng thuận, phát hiện lỗi tiềm năng
* Reviewer: nên là những đồng nghiệp kỹ thuật của tác giả và chuyên gia về kỹ thuật .Cá nhân được yêu cầu chuẩn bị trước khi review
* Review meeting: có thể có or không, lý tưởng được led bởi 1 điều hành viên được đào tạo (không phải là author)
* Scribe: bắt buộc, lý tưởng không phải là tác giả
* Use of checklist: có thể có hoặc không
* Result: Logs những lỗi tiềm năng và review reports có thể được tiến hành

**Inspection review:**

* Mục đích chính: phát hiện lỗi tiềm năng, ngăn chặn lỗi tương tự trong tương lai
Thực hiện theo 1 quy trình xác định với đầu ra được ghi lại chính thức: dựa vào các luật và checklist
Cá nhân được yêu cầu chuẩn bị trước khi review.Các roles trong buổi review phải được xác định rõ ràng
* Review meeting: có, được led bởi 1 điều hành viên được đào tạo (không phải là tác giả)
* Reviewer: là đồng nghiệp của tác giả or chuyên gia trong các lĩnh vực khác liên quan đến sản phẩm
* Specified: tiêu chí đầu vào và đầu ra được sử dụng
* Scribe: bắt buộc
* Result:  logs các lỗi tiềm năng và review process có thể được tiến hành
## 5. Các kỹ thuật dùng trong Static testing
Có một số kỹ thuật xem xét có thể được áp dụng trong hoạt động xem xét riêng lẻ (tức là chuẩn bị riêng lẻ) để phát hiện ra các khiếm khuyết. Các kỹ thuật này có thể được sử dụng cho các loại đánh giá được mô tả ở trên. Hiệu quả tùy thuộc vào loại đánh giá được sử dụng.

Các kỹ thuật đánh giá thường áp dụng

* Ad hoc
* Checklist-based 
* Scenarios and dry runs 
* Perspective-based 
* Role-based

**1. Review technique Adhoc**
* Người đánh giá được cung cấp ít hoặc không có hướng dẫn về cách thực hiện nhiệm vụ này.
* Xem xét đặc biệt là một kỹ thuật thường được sử dụng, cần ít sự chuẩn bị
* Kỹ thuật này phụ thuộc nhiều vào kỹ năng của người đánh giá và có thể dẫn đến nhiều vấn đề trùng lặp được báo cáo bởi những người đánh giá khác nhau.

**2.Review Techniques: Checklist based**
- Là một kỹ thuật có hệ thống
- Người đánh giá phát hiện các vấn đề dựa trên danh sách kiểm tra
- Danh sách kiểm tra đánh giá bao gồm một tập hợp các câu hỏi dựa trên các khiếm khuyết tiềm ẩn, có thể rút ra từ kinh nghiệm.
 - Danh sách kiểm tra phải cụ thể cho loại sản phẩm công việc
 - Ưu điểm chính của kỹ thuật dựa trên danh sách kiểm tra là có hệ thống bao quát các dạng khuyết tật điển hình.
- Không chỉ đơn giản tuân theo danh sách kiểm tra trong việc xem xét cá nhân, mà còn để tìm kiếm những khiếm khuyết bên ngoài danh sách kiểm tra.

**3.Review Techniques: Scenarios and dry runs**
- Trong đánh giá dựa trên kịch bản, người đánh giá được cung cấp các hướng dẫn có cấu trúc về cách đọc qua
sản phẩm công việc.
- Đánh giá dựa trên kịch bản hỗ trợ người đánh giá thực hiện "chạy khô" trên sản phẩm làm việc
dựa trên mức sử dụng dự kiến của sản phẩm công việc (ví dụ: các trường hợp sử dụng).
- Các tình huống này cung cấp cho người đánh giá các hướng dẫn tốt hơn về cách xác định các
các loại lỗi hơn các mục danh sách kiểm tra đơn giản.
- Tuy nhiên, người đánh giá không nên bị bó buộc vào các tình huống đã được tài liệu hóa. Người đánh giá cũng nên tìm kiếm các khiếm khuyết bên ngoài các tình huống

**4.Review Techniques: Perspective-based** 
- Người đánh giá đảm nhận các bên liên quan khác nhau
quan điểm trong kiểm điểm cá nhân.
- Quan điểm của các bên liên quan điển hình bao gồm người dùng cuối, tiếp thị, nhà thiết kế,
người kiểm tra hoặc các hoạt động.
- Sử dụng các quan điểm khác nhau của các bên liên quan dẫn đến đánh giá cá nhân sâu hơn
với ít vấn đề trùng lặp hơn giữa những người đánh giá.

- Ngoài ra, đọc theo quan điểm cũng yêu cầu người đánh giá cố gắng sử dụng sản phẩm công việc
đang được xem xét để tạo ra sản phẩm mà họ sẽ thu được từ nó. Ví dụ: một người thử nghiệm sẽ cố gắng
tạo các kiểm tra chấp nhận nháp nếu thực hiện đọc dựa trên quan điểm về đặc tả yêu cầu để xem liệu tất cả thông tin cần thiết đã được đưa vào chưa.
- Đọc theo quan điểm,
danh sách kiểm tra dự kiến ​​sẽ được sử dụng.

**5. Review Techniques: Role based**

- Đánh giá dựa trên vai trò là một kỹ thuật trong đó người đánh giá đánh giá sản phẩm công việc từ góc độ
vai trò của từng bên liên quan.
- Các vai trò điển hình bao gồm các kiểu người dùng cuối cụ thể (có kinh nghiệm, chưa có kinh nghiệm,
cấp cao, cấp con, v.v.) và các vai trò cụ thể trong tổ chức (quản trị viên người dùng, quản trị viên hệ thống,
người kiểm tra hiệu suất, v.v.).
- Các nguyên tắc tương tự được áp dụng như trong đọc theo quan điểm vì các vai trò
tương tự nhau.



## 6.Những lỗi chính được tìm thấy trong static testing
* Sai lệch so với tiêu chuẩn
* Code không được bảo trì
* Lỗi trong design 
* Lỗi trong requirement
* Thông số kỹ thuật không nhất quán 
* Thông thường, lỗi được phát hiện trong quá trình kiểm thử tĩnh là do lỗ hổng bảo mật, các biến không được khai báo, vi phạm ranh giới, vi phạm cú pháp, giao diện không nhất quán,..

***Tài liệu tham khảo:***

Syllabus 2018

https://www.guru99.com/testing-review.html