# **A. Quy trình phát triển phần mềm là gì?**
## Quy trình phát triển phần mềm
Quy trình phát triển phần mềm là một cấu trúc bao gồm tập hợp các thao tác và các kết quả tương quan sử dụng trong việc phát triển để sản xuất ra một sản phẩm phần mềm.

## Các hoạt động cơ bản của quy trình phát triển phần mềm
* Đặc tả phần mềm: Định nghĩa được các chức năng, điều kiện hoạt động của phần mềm.
* Phát triển phần mềm: Là quá trình xây dựng các đặc tả.
* Đánh giá phần mềm: Phầm mềm phải được đánh giá để chắc chắn rằng ít nhất có thể thực hiện những gì mà tài liệu đặc tả yêu cầu.
* Tiến hóa phần mềm: Đây là quá trình hoàn thiện các chức năng cũng như giao diện để ngày càng hoàn thiện phần mềm cũng như các yêu cầu đưa ra từ phía khách hàng.

# **B. Các mô hình phát triển phần mềm**
## 1. Mô hình thác nước – Waterfall model
![](https://images.viblo.asia/f86666a5-dae3-4692-8efc-1d1d9a1e44d3.jpg)

Mô hình thác nước (tiếng Anh: waterfall model) là một mô hình của quy trình phát triển phần mềm, trong đó quy trình phát triển trông giống như một dòng chảy, với các pha được thực hiện theo trật tự nghiêm ngặt và không có sự quay lui hay nhảy vượt pha là: phân tích yêu cầu, thiết kế, triển khai thực hiện, kiểm thử, liên kết và bảo trì.

### Các giai đoạn của mô hình thác nước

**Thu thập yêu cầu** (Requirement gathering) : Đây là giai đoạn xác định các yêu cầu chức năng và phi chức năng mà hệ thống phần mềm cần có. Kết quả của giai đoạn này là bản tài liệu đặc tả yêu cầu. Tài liệu này sẽ là nền tảng cho những giai đoạn tiếp theo cho đến cuối dự án.

**Phân tích hệ thống** ( System Analysis): Là giai đoạn định ra làm thế nào để hệ thống phần mềm đáp ứng đúng yêu cầu của khách hàng. Giai đoạn này thực hiện phân tích, thiết kế hệ thống phần mềm.

**Coding:** Là giai đoạn thực hiện sản phẩm dựa trên đặc tả yêu cầu và tài liệu thiết kế module.

**Testing:** Tester sẽ nhận sản phẩm từ dev và thực hiện kiểm thử cho nhóm các thành phần và kiểm thử hệ thống. Khâu kiểm thử cuối cùng sẽ là Kiểm thử chấp nhận, giai đoạn này còn có sự tham gia của khách hàng.

**Implementation:** Triển khai hệ thống ra môi trường của khách hàng.

**Operations &Maintenance:** Đây là giai đoạn cài đặt, cấu hình và đào tạo cho khách hàng. Giai đoạn này sửa chữa những lỗi của sản phẩm (nếu có) và phát triển những thay đổi mới được khách hàng yêu cầu.

### Áp dụng
Thường được áp dụng cho các dự án không thường xuyên bị thay đổi về yêu cầu.

### Đặc điểm
Ưu điểm:

Dễ sử dụng, dễ tiếp cận
Các giai đoạn và hoạt động được xác định rõ ràng
Xác nhận ở từng giai đoạn, đảm bảo phát hiện sớm các lỗi
Nhược điểm:

Rất khó để quay lại giai đoạn nào khi nó đã kết thúc
Ít tính linh hoạt và phạm vi điều chỉnh của nó khá là khó khăn, tốn kém.
## 2. Mô hình chữ V – V- Shaped Model
![](https://images.viblo.asia/5e64e813-6428-4289-ae33-3ea7956d3ac8.png)

Mô hình V hiện nay là một trong những quy trình phát triển phần mềm được sử dụng rộng rãi nhất. Trong mô hình V việc thực hiện kiểm tra được diễn ra ngay từ giai đoạn lấy yêu cầu. V mô hình cũng được gọi là mô hình xác minh (verification) và mô hình xác nhận (validation).

Để hiểu được mô hình V, trước hết chúng ta hãy hiểu xác minh (verification) và xác nhận hợp lệ (validation) trong phần mềm là gì.

**Xác minh (verification) :** Xác minh là một kỹ thuật phân tích tĩnh. Trong kiểm thử, kỹ thuật này được thực hiện mà không phải chạy code. Nó bao gồm một số hoạt đông như xem lại (review), kiểm tra (inspection) và kiểm tra từ đầu tới cuối (walkthrough).

**Xác nhận (validation):** Xác nhận là một kỹ thuật phân tích động, trong đó việc kiểm thử được thực hiện bằng cách thực hiện code. Ví dụ bao gồm kỹ thuật kiểm tra chức năng (function) và phi chức năng (non-function).

### Áp dụng
Yêu cầu phần mềm phải xác định rõ ràng
Công nghệ phần mềm và các công cụ phải được tìm hiểu kĩ

### Đặc điểm
Ưu điểm:

Đơn giản dễ sử dụng
Phân phối cụ thể theo mỗi giai đoạn
Thực hiện verification và validation sớm trong mỗi giai đoạn phát triển
Nhược điểm:

Phạm vi điều chỉnh khá là khó khăn và tốn kém.
Trong mô hình V, các hoạt động phát triển và đảm bảo chất lượng được thực hiện đồng thời. Không có pha rời rạc được gọi là kiểm thử, thay vào đó kiểm thử được bắt đầu ngay từ giai đoạn lấy yêu cầu. Các hoạt động xác minh và xác nhận đi liền với nhau.

## 3. Mô hình xoắn ốc – Spiral Model
![](https://images.viblo.asia/0ff0e528-07e5-4a35-aaf4-b1286c5ff58b.png)

Mô hình xoắn ốc (tiếng Anh: spiral model) là quy trình phát triển định hướng rủi ro cho các dự án phần mềm. Kết hợp của thế mạnh của các mô hình khác và giải quyết khó khăn của các mô hình trước còn tồn tại. Dựa trên các mô hình rủi ro riêng biệt của mỗi dự án, mô hình xoắn ốc đưa ra cách áp dụng các yếu tố của một hoặc nhiều mô hình xử lý, chẳng hạn như mô hình gia tốc, mô hình thác nước hoặc mô hình tạo mẫu tiến hóa.

### Các giai đoạn của mô hình xoắn ốc

**Lập kế hoạch – Planning phase:**

Thu thập, phân tích yêu cầu từ của dự án từ phía khách hàng. Bao gồm các công việc: Ước lượng chi phí (estimating cost), lên lịch trình thực hiện dự án (shedule-master), xác định số lượng nhân lực, môi trường làm việc (identifying necessary resources and work environment), tìm hiểu yêu cầu hệ thống (requirements) từ đó đưa ra các tài liệu đặc tả (Bussiness Requirement Specifications và System Requirement specifications) để phục vụ cho việc trao đổi giữa khách hàng và phân tích hệ thống sau này.

**Phân tích rủi ro – Risk analysis phase:**

Một quá trình phân tích sẽ được thực hiện để xác định rủi ro và đưa ra các giải pháp thay thế. Một prototype sẽ được tạo ra ở cuối giai đoạn phân tích rủi ro. Nếu có bất kỳ rủi ro nào được tìm thấy trong quá trình này thì các giải pháp thay thế sẽ được đề xuất và thực hiện.

**Thực thi kỹ thuật – Engineering phase:**

Đây là giai đoạn mà dự án được các dev tiến hành code, các tester tiến hành test và deploying software trên trang web của khách hàng.

**Đánh giá – Evaluation phase:**

Khách hàng sẽ tham gia vào giai đoạn này để đánh giá công việc, sản phẩm và đảm bảo rằng sản phẩm đáp ứng tất cả các yêu cầu đã đặt ra trước đó. Nếu có bất kỳ yêu cầu thay đổi nào từ khách hàng, các giai đoạn sẽ được lặp lại. Đây là giai đoạn quan trọng vì cần có sự phản hồi của khách hàng về sản phẩm trước khi sản phẩm được release.

### Áp dụng
Thường được sử dụng cho các ứng dụng lớn và các hệ thống được xây dựng theo các giai đoạn nhỏ hoặc theo các phân đoạn

### Đặc điểm
Ưu điểm:

Estimates (i.e. budget, schedule, etc.) trở nên thực tế hơn như là một quy trình làm việc, bởi vì những vấn đề quan trọng đã được phát hiện sớm hơn.
Có sự tham gia sớm của deverlopers
Quản lý rủi ro và phát triển hệ thống theo phase
Nhược điểm:

Chi phí cao và thời gian dài để có sản phẩm cuối cùng
Phải có kỹ năng tốt để đánh giá rủi ro và giả định.
## 4. Mô hình Agile – Agile Model
Agile là một tập hợp các nguyên lý dành cho phát triển phần mềm, trong đó khuyến khích việc lập kế hoạch thích ứng, phát triển tăng dần, chuyển giao sớm, và cải tiến liên tục. Agile cũng chủ trương thích ứng nhanh chóng với các thay đổi. Những nguyên lý này được chia sẻ trong Tuyên ngôn Phát triển Phần mềm Linh hoạt và 12 Nguyên lý phía sau.

Agile không định nghĩa một phương pháp cụ thể để đạt được những điều này, nhưng lại có nhiều phương pháp phát triển phần mềm khác nhau thỏa mãn và hướng theo các tiêu chí đó.

Mục đích của các phương pháp Agile là giúp các doanh nghiệp đạt được sự linh hoạt (Agility), từ đó nâng cao sức cạnh tranh và phát triển bền vững. Các phương pháp Agile đã thay đổi diện mạo thế giới không chỉ trong Phát triển phần mềm mà còn đang thể hiện giá trị trong các lĩnh vực khác như Marketting (Agile Marketting), giáo dục (EduScrum, Lean Edu, v.v.), thiết kế (Lean UX, Design Thinking), khởi nghiệp (Lean Startup) và Phần cứng.

### Áp dụng

Có thể được sử dụng với bất kỳ loại hình dự án nào, nhưng nó cần sự tham gia và tính tương tác của khách hàng. Ngoài ra, nó có thể được sử dụng khi khách hàng yêu cầu chức năng sẵn sàng trong khoảng thời gian ngắn ( 3 tuần )

### Đặc điểm
Ưu điểm:

Giảm thời gian cần thiết để tận dụng một số tính năng của hệ thống
Kết quả cuối cùng là phần mềm chất lượng cao trong thời gian ít nhất có thể và sự hài lòng của khách hàng
Nhược điểm:

Phụ thuộc vào kỹ năng của người phát triển phần mềm Scalability
Tài liệu được thực hiện ở giai đoạn sau
 
## 5. Mô hình Scrum
Scrum là một quy trình phát triển phần mềm thuộc họ agile.

Là một quy trình phát triển phần mềm theo mô hình linh hoạt (agile). Với nguyên tắc chủ đạo là chia nhỏ phần mềm cần sản xuất ra thành các phần nhỏ để phát triển (các phần nhỏ này phải đọc lập và Release được), lấy ý kiến khách hàng và thay đổi cho phù hợp ngay trong quá trình phát triển để đảm bảo sản phẩm release đáp ứng những gì khách hàng mong muốn. Scrum chia dự án thành các vòng lặp phát triển gọi là các sprint. Mỗi sprint thường mất 2- 4 tuần (30 ngày) để hoàn thành. Nó rất phù hợp cho những dự án có nhiều sự thay đổi và yêu cầu tốc độ cao.

### Ưu điểm

Một người có thể làm nhiều việc ví dụ như dev có thể test
Phát hiện lỗi sớm hơn rất nhiều so với các phương pháp truyền thống
Khách hàng nhanh chóng thấy được sản phẩm qua đó đưa ra phản hồi sớm.
Có khả năng áp dụng được cho những dự án mà yêu cầu khách hàng không rõ ràng ngay từ đầu.
### Nhược điểm:

Trình độ của nhóm là có một kỹ năng nhất định
Phải có sự hiểu biết về mô hình aglie .
Khó khăn trong việc xác định ngân sách và thời gian.
Luôn nghe ý kiến phản hồi từ khách hàng và thay đổi theo nên thời gian sẽ kéo dài khi có quá nhiều yêu cầu thay đổi từ khách hàng.
Vai trò của PO (Product Owner) rất quan trọng, PO là người định hướng sản phẩm. Nếu PO làm không tốt sẽ ảnh hưởng đến kết quả chung.