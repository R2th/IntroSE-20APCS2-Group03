![](https://images.viblo.asia/bcba5f92-7cc2-4fb8-8f3a-80eb9079d13d.jpg)
Bạn đã bao giờ nghĩ đến việc thay đổi chiếc xe bạn đang có bây giờ chưa? Nếu có, thì lý do bạn nêu ra là gì: những năm đẹp nhất đã trôi qua, nó ngốn quá nhiều ngân sách của bạn, một chiếc xe không có nhiều điểm chung với các công nghệ mới, phải không? Nói cách khác, bạn muốn thứ gì đó mới mẻ hơn, tiết kiệm chi phí và hiện đại.

Ta-da-a-a, ở đây chúng tôi đã đưa ra khái niệm về metric - số liệu, trong trường hợp này, chúng tôi xác định kỳ vọng của bạn từ chiếc xe mong muốn. Tương tự với thử nghiệm - để theo dõi hiệu quả của nó, trước tiên bạn cần xác định các thông số. Để biết thêm về các số liệu được sử dụng trong kiểm thử phần mềm, hãy tiếp tục đọc bài viết dưới đây.

### 1. Phân loại các chỉ số kiểm thử phần mềm
Dữ liệu chính xác nên xem xét các đặc điểm có thể có của đối tượng được phân tích. Do đó, các thước đo kiểm thử được phân loại theo các thông số như: đặc điểm, giai đoạn dự án, đối tượng mục tiêu.
![](https://images.viblo.asia/2c095c3c-6231-4fdd-9f26-ee0123c0c92c.jpg)
Nói về các đặc điểm, các số liệu kiểm thử phần mềm có thể là:

#### 1.1. Quantity metrics - Số liệu đo lường
Đây là những thực thể có thể được đo lường. Ví dụ về các số liệu là số lượng defect, mức độ bao phủ của các yêu cầu, số lượng defect được tìm thấy bởi người dùng, tỷ lệ giữa số lượng open defects và close defect, v.v.
#### 1.2. Quality metrics - Chỉ số chất lượng
Ngoài số lượng, chúng tôi còn quan tâm đến chất lượng. Các chỉ số chất lượng cho biết mức độ chúng tôi thực hiện dự án. Ví dụ, chất lượng của các bug report, các test case đã phát triển, v.v. Các chỉ số chất lượng còn được gọi là các phán đoán giá trị. Theo quy luật, chúng phải được hỗ trợ bởi các chỉ số số lượng. Ví dụ: chúng tôi cung cấp đánh giá chất lượng về các bug report. Đây là đánh giá chủ quan của các thành viên trong nhóm dự án. Để xác nhận điều đó, chúng tôi có thể phân tích số lượng lỗi với kết quả “Không phải lỗi” hoặc số lượng yêu cầu từ lập trình viên để làm rõ các bước tạo bug.

Ngoài ra, các số liệu có thể được chia tùy thuộc vào giai đoạn của dự án:

**Final**. Đây là những số liệu chứng minh hiệu suất trong toàn bộ thời gian làm việc của dự án. Hơn nữa, những số liệu này sẽ giúp đánh giá các dự án tương tự về phạm vi và mục tiêu.
**Interim**. Các chỉ số này dựa trên kết quả của các lần lặp lại. Chúng được so sánh với kết quả của các lần lặp trước đó và giúp phát hiện các vấn đề có thể xảy ra hoặc tồn tại.
**Functional.** Những số liệu như vậy được sử dụng khi chúng ta muốn nhận được kết quả của công việc trên một chức năng nhất định.

Một loại phân loại khác để kiểm tra số liệu dựa trên đối tượng mục tiêu:

**Process metrics**
Các số liệu này đánh giá các đặc điểm quy trình khác nhau. Ví dụ, tổng số lỗi, sự phân bố các defect theo mức độ nghiêm trọng và mức độ ưu tiên, số lỗi bị reject, số lỗi trên N dòng code, hiệu quả của việc test, sự phân bố của các defect theo component, số lượng lỗi do người dùng báo cáo, chi phí sửa lỗi, v.v.

**Result metrics** Loại chỉ số này đánh giá kết quả mà chúng ta nhận được. Một ví dụ về các số liệu là số lượng lỗi do người dùng tìm thấy, số lỗi sản phẩm, số lượng phiên bản đã phát hành, chi phí bảo trì sản phẩm.

### 2. So sánh các chỉ số hàng đầu được sử dụng trong kiểm thử phần mềm (kèm theo mô tả)
Trong quá trình trao đổi với khách hàng, team lead và đôi khi project manager phải cung cấp danh sách các QA metric sẽ được sử dụng trong toàn bộ dự án. Điều này cho phép khách hàng theo dõi tiến trình kiểm thử và xem kết quả tạm thời. Trong phần này, chúng tôi sẽ chia sẻ ví dụ về quality metrics mà team QA cung cấp cho khách hàng.
![](https://images.viblo.asia/e7e8d419-a150-4aab-97ec-ea793ba9f70d.jpg)
### 3. Cuối cùng thì bạn nhận được gì từ các Chỉ số Chất lượng Phần mềm?
Bằng cách sử dụng các số liệu trên, bạn có thể nhận được câu trả lời cho các câu hỏi: chính xác thì team đã làm tốt điều gì, bạn đã phát triển ở những chỉ số nào, liệu các quyết định quản lý của bạn có đúng và kịp thời hay không. Bất cứ lúc nào, bạn có thể trả lời các câu hỏi sau của khách hàng:

* Trạng thái hiện tại của phiên bản là gì?
* Mô-đun sản phẩm nào là quan trọng nhất và có nhiều lỗi nhất?
* Những mô-đun nào cần đặc biệt chú ý?
* Số liệu nào phù hợp với các sản phẩm ưu tiên?
* Có thể đưa phiên bản vào production không?

Kiểm soát và giám sát không kém phần quan trọng hơn các hoạt động đảm bảo chất lượng và bản thân các kết quả thử nghiệm. Chỉ khi chúng ta đo lường một cái gì đó, chúng ta có thể kiểm soát nó. Sử dụng các chỉ số, bạn sẽ có được thử nghiệm hiệu quả hơn.

Bạn không thể nói rằng chiếc xe mới của bạn tuyệt vời trước khi bạn đánh giá khả năng lái của nó, hoặc bạn có thể đánh giá bằng hình ảnh, nhưng đánh giá như vậy sẽ khó có thể là một đánh giá khách quan. Sử dụng các chỉ số thử nghiệm và lời khuyên mà chúng tôi đã chia sẻ với bạn và cho chúng tôi biết nếu chúng ảnh hưởng đến quá trình chạy dự án và giao tiếp của bạn với khách hàng. Để thực hiện việc này, hãy đăng ký blog của chúng tôi và giữ liên lạc với thông tin hữu ích về các vấn đề đảm bảo chất lượng.

***Bài dịch và tham khảo từ nguồn: https://blog.qatestlab.com/2019/09/12/top-testing-metrics/***