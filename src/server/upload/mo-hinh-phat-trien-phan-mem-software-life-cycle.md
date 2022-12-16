## Quy trình phát triển phần mềm
*Quy trình phát triển phần mềm là một tập hợp các hoạt động tổ chức mà mục đích của chúng là xây dựng và phát triển phần mềm.*

Mục đích giải quyết những câu hỏi được đặt ra :

* Nhân sự: *Ai sẽ làm? Ai làm gì?*
* Thời gian: *Khi nào làm? Làm mất bao nhiêu thời gian?*
* Phương pháp: *Làm như thế nào?*
* Công cụ: *Dùng công cụ gì để làm công việc này?*
* Chi phí: *Chi phí bỏ ra bao nhiêu? Thu về bao nhiêu? (ước tính)*
* Mục tiêu: *Mục tiêu hướng đến là gì?*

Mỗi loại hệ thống khác nhau thì cần những quy trình phát triển khác nhau.

Hoạt động kiểm thử không tồn tại độc lâp mà luôn gắn liền với các hoạt động khác trong chu kỳ phát triển phần mềm. Các mô hình phát triển phần mềm khác nhau thì cần có cách tiếp cận test khác nhau

**Các hoạt động cơ bản của quy trình phát triển phần mềm**

![](https://images.viblo.asia/d0c1598a-f6b6-43a1-9d20-39f10a69ebd4.png)

**Các hoạt động cơ bản của quy trình phát triển phần mềm**

![](https://images.viblo.asia/d2257cae-0bc4-4730-8cc3-40dd95154006.png)

## Waterfall model- Mô hình thác nước

![](https://images.viblo.asia/1ebe9581-be44-417a-9271-0c14b9a861b8.png)

**Mô tả:**

Mô hình thác nước là mô hình áp dụng theo tính tuần tự của các giai đoạn phát triển phần mềm. 
Có nghĩa là: giai đoạn sau chỉ được thực hiện tiếp khi giai đoạn trước đã kết thúc

Không được quay lại giai đoạn trước để xử lí các thay đổi trong yêu cầu


**Áp dụng:**

Thường được áp dụng cho các dự án không thường xuyên bị thay đổi về yêu cầu.

**Ưu điểm:**
* Dễ sử dụng, dễ tiếp cận
* Các giai đoạn và hoạt động được xác định rõ ràng
* Xác nhận ở từng giai đoạn, đảm bảo phát hiện sớm các lỗi

**Nhược điểm:**
* Rất khó để quay lại giai đoạn nào khi nó đã kết thúc
* Ít tính linh hoạt và phạm vi điều chỉnh của nó khá là khó khăn, tốn kém.

## V- Shaped Model- Mô hình chữ V

![](https://images.viblo.asia/3cfa1c59-33d8-4ab4-a0f6-f92f1633c72a.jpg)

**Mô tả:**

Toàn bộ quy trình được chia thành 2 giai đoạn tương ứng nhau: *Phát Triển* và *Kiểm Thử*

Mỗi giai đoạn phát triển sẽ được tiến hành song song với một giai đoạn kiểm thử tương ứng => Lỗi được phát hiện ra sớm ngay từ đầu

**Áp dụng:**
* Yêu cầu phần mềm phải xác định rõ ràng
* Công nghệ phần mềm và các công cụ phải được tìm hiểu kĩ

**Ưu điểm:**
* Quá trình phát triển và quy trình quản lý có tính tổ chức và hệ thống
* Hoạt động tốt cho các dự án có quy mô vừa và nhỏ.
* Kiểm tra bắt đầu từ khi bắt đầu phát triển vì vậy sự mơ hồ được xác định ngay từ đầu.
* Dễ dàng quản lý vì mỗi giai đoạn có các mục tiêu và mục tiêu được xác định rõ ràng.

**Nhược điểm:**
* Không thích hợp cho các dự án lớn và phức tạp
* Không phù hợp nếu các yêu cầu thường xuyên thay đổi.
* Không có phần mềm làm việc được sản xuất ở giai đoạn trung gian.
* Không có điều khoản cho việc phân tích rủi ro nên có sự không chắc chắn và có tính rủi ro.

## Agile Model

![](https://images.viblo.asia/422d7a12-5c21-4930-88e5-c7930db2bc36.png)

**Mô tả:**

Dựa trên mô hình iterative and incremental
Các yêu cầu và giải pháp phát triển dựa trên sự kết hợp của các function

**Áp dụng:**

Nó có thể được sử dụng với bất kỳ loại hình dự án nào, nhưng nó cần sự tham gia và tính tương tác của khách hàng. Ngoài ra, nó có thể được sử dụng khi khách hàng yêu cầu chức năng sẵn sàng trong khoảng thời gian ngắn ( 3 tuần )

**Ưu điểm:**
* Giảm thời gian cần thiết để tận dụng một số tính năng của hệ thống
* Kết quả cuối cùng là phần mềm chất lượng cao trong thời gian ít nhất có thể và sự hài lòng của khách hàng

**Nhược điểm:**
* Phụ thuộc vào kỹ năng của người phát triển phần mềm
* Tài liệu được thực hiện ở giai đoạn sau
* Cần một team có kinh nghiệm

## Mô hình Agile : Quy Trình SCRUM
Scrum là một khung làm việc trong đó con người có thể xác định các vấn đề thích nghi phức hợp, trong khi vẫn giữ được năng suất và sáng tạo để chuyển giao các sản phẩm có giá trị cao nhất.
### Giá trị cốt lõi của quy trình SCRUM
**Minh bạch** : thông tin liên quan tới quá trình phát triển phải minh bạch và thông suốt. Các thông tin đó có thể là: tầm nhìn (vision) về sản phẩm, yêu cầu khách hàng, tiến độ công việc, các khúc mắc và rào cản v.v. Từ đó mọi người ở các vai trò các nhau có đủ thông tin cần thiết để tiến hành các quyết định có giá trị để nâng cao hiệu quả công việc. 

**Thanh tra (inspection)**
Công tác thanh tra liên tục các hoạt động trong Scrum đảm bảo cho việc phát lộ các vấn đề cũng như giải pháp để thông tin đa dạng và hữu ích đến được với các bên tham gia dự án. Truy xét kĩ càng và liên tục là cơ chế khởi đầu cho việc thích nghi và các cải tiến liên tục trong Scrum.

**Thích nghi (adaptation)**
Scrum rất linh hoạt như các phương pháp Agile khác. Nhờ đó nó mang lại tính thích nghi rất 	cao. Dựa trên các thông tin minh bạch hóa từ các quá trình thanh tra và làm việc, Scrum có thể phản hồi lại các thay đổi một cách tích cực, nhờ đó mang lại thành công cho dự án.

### Ba Vai trò trong Quy trình Scrum
Trong Scrum, đội ngũ tham gia phát triển phần mềm được phân chia ra ba vai trò với trách nhiệm rõ ràng để đảm bảo tối ưu hóa các công việc đặc thù như sau:

**Product Owner (chủ sản phẩm)**
Là người chịu trách nhiệm về sự thành công của dự án, người định nghĩa các yêu cầu và đánh giá cuối cùng đầu ra của các nhà phát triển phần mềm.

**Scrum Master**
Là người có hiểu biết sâu sắc về Scrum và đảm bảo nhóm có thể làm việc hiệu quả với Scrum.

**Development Team (Đội sản xuất, hay Nhóm phát triển)**
Một nhóm liên chức năng (cross-functional) tự quản lý để tiến hành chuyển đổi các yêu cầu được tổ chức trong Product Backlog thành chức năng của hệ thống.

### Bốn Cuộc họp (4 Events)
Scrum định nghĩa quy tắc cho bốn sự kiện chủ chốt (các cuộc họp) nhằm tạo môi trường và quy cách hoạt động và cộng tác cho các thành viên trong dự án.
Sprint là một phân đoạn lặp đi lặp lại trong quy trình phát triển phần mềm, thường có khung thời gian ngắn (từ 1 – 4 tuần).

**Sprint Planning (Họp Kế hoạch Sprint)**
Nhóm phát triển gặp gỡ với Product Owner để lên kế hoạch làm việc cho một Sprint. Công việc lập kế hoạch bao gồm việc chọn lựa các yêu cầu cần phải phát triển, phân tích và nhận biết các công việc phải làm kèm theo các ước lượng thời gian cần thiết để hoàn tất các tác vụ.

**Daily Scrum (Họp Scrum hằng ngày)**
Scrum Master tổ chức cho Đội sản xuất họp hằng ngày trong khoảng 15 phút để Nhóm Phát triển chia sẻ tiến độ công việc cũng như chia sẻ các khó khăn gặp phải trong quá trình phát triển phần mềm suốt một Sprint.

**Sprint Review (Họp Sơ kết Sprint)**
Cuối Sprint, nhóm phát triển cùng với Product Owner sẽ rà soát lại các công việc đã hoàn tất (DONE) trong Sprint vừa qua và đề xuất các chỉnh sửa hoặc thay đổi cần thiết cho sản phẩm.

**Sprint Retrospective (Họp Cải tiến Sprint)**
Dưới sự trợ giúp của Scrum Master, nhóm phát triển sẽ rà soát lại toàn diện Sprint vừa kết thúc và tìm cách cải tiến quy trình làm việc cũng như bản thân sản phẩm.

### Tóm tắt chỉ cần nhớ các ý sau về Scrum
* Hoàn thành xong sprint1 rồi làm tiếp sprint 2, sprint … cho đến khi hoàn thành hết yêu cầu
* Trong mỗi 1 sprint thì sẽ có họp hàng ngày – daily meeting. Cả team sẽ họp thường chỉ họp ngắn từ 15 – 20 phút. Mỗi thành viên sẽ báo cáo: hôm qua tôi đã làm gì? Hôm nay tôi sẽ làm gì? Có gặp khó khăn gì ko?
*  Trong mỗi 1 sprint thì các thành viên của dự án phải tạo task cho code và test,1 task code xong là phải có task test liền ngay đó. Do thời gian làm ngắn ngày nên hiệu quả làm việc phải cao, đúng tiến độ để đảm bảo cuối sprint là hoàn thành testing.
* Ko thực hiện đầy đủ toàn bộ yêu cầu/ nghiệp vụ của hệ thống vào code và testing cùng 1 lúc ( như quy trình truyền thống) mà sẽ chia các Yêu cầu ra làm theo từng giai đoạn (Sprint). Mỗi 1 giai đoạn chỉ làm 1 số lượng yêu cầu nhất định
* Chia thành nhiều giai đoạn nhỏ để thực hiện hay còn gọi là Sprint
* Mỗi 1 sprint thường kéo dài từ 1 tuần đến 4 tuần ( ko dài hơn 1 tháng)
* Đầu sprint sẽ lên kế hoạch làm những yêu cầu nào. Sau đó, sẽ thực hiện code và test.
* Cuối sprint là 1 sản phẩm hoàn thiện cả code lẫn test có thể demo và chạy được
* Ưu điểm của quy trình này : là phù hợp với những yêu cầu/ nghiệp vụ hay thay đổi, hoặc hệ thống nghiên cứu do làm theo từng giai đoạn ngắn ngày, có thể nhìn thấy những rủi ro hay những điểm chfla phù hợp để thay đổi ( ý này nếu bị hỏi mới kể)
* Điều hành dự án gọi là Master scrum , Development Team (Đội sản xuất, hay Nhóm phát triển)