Một trong những yếu tố quan trọng quyết định sự thành công của kiểm thử phần mềm và development team là liệu họ có thể bàn giao sản phẩm hoàn chỉnh một cách kịp thời, đúng hạn.

![](https://images.viblo.asia/83834225-56c0-40b1-abfb-26e0282f2179.jpg)

Có 1 thời gian biểu rõ ràng và gắn kết với nó là rất quan trọng để xây dựng 1 danh tiếng, lòng tin từ khách hàng và mang đến sự hài lòng cho khách hàng.

Điều đó đang được nói đến, có thể rất khó khăn để tính toán đơn giản các khung thời gian cho 1 dự án test được đưa ra bằng việc ước lượng nó bằng mắt.

Mặc dù 1 chuyên gia có thể đánh giá rất sát các yêu cầu về thời gian tối ưu của 1 dự án, tôi muốn sử dụng bài viết này để đi qua 5 kỹ thuật ước lượng thời gian phổ biến mà mỗi tester cần phải biết.

## 1.  Kỹ thuật Delphi

Delphi. Ai chưa từng nghe về nhà tiên tri nổi tiếng của Ai Cập cổ đại?

** Know Thyself is a maxim that is equally valid for software testing as it is for life in general, though maybe I’d add: And Thine Software Projects.**

Kỹ thuật Delphi bao gồm việc thực hiện các survey từ các chuyên gia để có được 1 ước tính trung bình cuối cùng về time-effort mà 1 task có thể sẽ tiêu thụ.

Mỗi thành viên của nhóm được gán 1 task để đánh giá và họ thu thập thông tin theo nhiều vòng. Ở cuối mỗi vòng, các feedback thu được được phân tích để đạt được 1 kết luận về thời gian để hoàn thành các task.

## 2. Phương thức Function Point

Kỹ thuật này là đối nghịch với kỹ thuật trước, bởi vì trong trường hợp này chúng ta phân tích mỗi task theo các Function Point chỉ định, hoặc những gì mà end-user sẽ thấy trên màn hình.

Trong các phương thức functional point, chúng ta gán mỗi functional point 1 cấp độ mà có thể phạm vi từ đơn giản (1) tới trung bình (3) tới phức tạp (5). Sau đó chúng ta sẽ nhân nhiều functional point trong mỗi danh mục với danh mục cấp độ và bổ sung vào tổng số.

Tổng các functional point sau đó được theo quy tắc 2 person-hours cho mỗi functional point để đạt được ước tính thời gian cuối cùng cho toàn bộ project. Xem ví dụ bên dưới.



|  | Weighting | Functional Points | Total |
| -------- | -------- | -------- | -------- |
| Complex     | 5     | 5     | 25     |
| Medium     | 3     | 10     | 30     |
| Simple     | 1     | 3     | 3     |
|      |      | Total FP     | 58     |
|      |      | Estimated Person-hours/FP     | 2.0     |
|      |      | Total Person-hours     | 116 hours     |

## 3. Work Breakdown Structure

Không cần tìm kiếm liệu pháp nào cả. Work breakdown trong trường hợp này đề cập đến tất cả những gì chúng ta đang làm theo: phân tích các project vào trong các thành phần cơ bản của nó.

Dĩ nhiên bạn đã nghe nói rằng: don’t bite more than you can chew. Tương tự như vậy, bằng cách chia nhỏ các task thành các bước chi tiết, các thành viên của team có thể khám phá bất cứ function nào, hoặc thậm chí các sub-function, cái mà họ có thể chưa xem xét trong các plan ban đầu.

Việc làm này không chỉ cải thiện ngân sách và giúp tạo ra 1 lịch trình chặt chẽ hơn xung quanh các project, mà còn thúc đẩy tinh thần trách nhiệm và sự giao kết giữa các thành viên của team, vì mỗi người chia sẻ trách nhiệm hoàn thành 1 nhiệm vụ cụ thể.

## 4. Three-Point Estimation

![](https://images.viblo.asia/2338fcc7-4634-411f-8714-bb27ad4c64f4.jpg)

Three-point estimation có thể được xem như 1 sự bổ sung hợp lý cho kỹ thuật work breakdown structure.

Sau khi các project được chia thành các task của nó, mỗi task đưa ra 3 loại ước tính thời gian (three-point):

1.1 Optimistic estimate (A) – đây là các ước lượng thời gian từ thiên đường, nơi mà mọi thứ thuận lợi và tất cả các điều kiện được yêu cầu được đáp ứng.

1.2 Pessimistic estimate (B) – ước lượng thời gian từ địa ngục, 1 kịch bản nơi mà định luật của Murphy đã được chứng minh.

1.3 Realistic estimate (R) – thời gian khả thi nhất của các dự án trong điều kiện bình thường.

Để tìm giá trị ước lượng thời gian (E) của các dự án, chỉ cần sử dụng công thức sau:
E = (A + 4xR + B)/6

## 5.  Planning poker

![](https://images.viblo.asia/683d7bbe-3947-4516-a073-95b519a70927.jpg)

1 ứng dụng khác của work breakdown structure, và thú vị hơn nhiều.

Để ước lượng thời gian cần thiết cho các effort của việc test trên từng task, hãy viết ra mỗi task trên từng phần riêng của tờ giấy, phân phát cho các thành viên của team và cho phép thảo luận 1 thời gian.

Sau vòng thảo luận đầu tiên, mỗi bản sẽ được đánh số thẻ mà đại diện cho ước tính của người ấy về những công việc liên quan đến câu chuyện đang thảo luận. Tất cả các ước tính được giữ kín cho đến khi mỗi người tham gia đã chọn 1 thẻ. Thời điểm đó, tất cả các ước tính đều được tiết lộ và cuộc thảo luận có thể bắt đầu trở lại.

Kỹ thuật này sử dụng trí tuệ tập thể của team để đạt được 1 ước tính khá chính xác. Chúng tôi gợi ý sử dụng công cụ https://www.planningpoker.com/ này nếu không thể giữ các phiên planning poker trong 1 địa điểm thực tế.

## 4 mẹo ước lượng thời gian tốt nhất

Trong bài này, tôi đã đi qua 5 kỹ thuật phổ biến giúp bạn đạt được 1 ước tính thời gian chính xác của các effort cần thiết để hoàn thành 1 task test.

Để kết luận, tôi muốn gợi ý 4 mẹo mà tôi thấy hữu ích trong công việc của riêng tôi để ước lượng thời gian tốt hơn cho các dự án test.

1.1 Cho phép buffer time: Cắt giảm 1 vài thời gian của chính mình và team của bạn và bổ sung thêm thời gian cho các trường hợp bất khả kháng. Nhưng đừng quên định luật của Parkingson: làm việc thêm để lắp đầy tất cả thời gian sẵn có, do đó hãy chắc chắn sử dụng buffer time chỉ khi cần thiết, nếu không vướng mắc tới các ước tính ban đầu.

1.2 Đưa vào giải thích các chu kỳ lỗi: Các chu kỳ test được liên kết với các chu kỳ lỗi, và bất kỳ vấn đề nào về tính ổn định của các phần mềm bạn đang làm việc, cái mà có thể yêu cầu bổ sung thời gian cho các developer để fix nó, dẫn đến việc mở rộng chu kỳ của việc test.

1.3 Thời gian là tiền bạc: Hãy chắc chắn xem xét sự sẵn có của các tài nguyên vật lý (và con người) trong ước lượng test của bạn. Thời gian sẵn có không là không đủ, vì sự thiết hụt của 1 số tài nguyên cụ thể có thể khiến bạn đợi chờ cho đến khi nó sẵn sàng.

1.4  Test so sánh: Nếu bạn đã từng làm việc trên các phiên bản trước đó (hoặc tương tự) của các task hiện tại, thì bạn có thể dựa trên các ước tính của bạn sử dụng dữ liệu từ các dự án trước.

Tham khảo: [https://reqtest.com/testing-blog/how-to-estimate-time-for-testing/](https://reqtest.com/testing-blog/how-to-estimate-time-for-testing/)