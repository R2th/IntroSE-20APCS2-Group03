Chúng ta thường nghe đến khái niệm test design, hiểu một cách đơn giản thì test design là việc xác định, liệt kê ra một loạt các kịch bản dùng để kiểm thử phần mềm. Một trong những nguyên lý kiểm thử đó là "kiểm thử cạn kiệt tất cả các trường hợp là điều không thể". Do đó chúng ta cần phải xác định được một tập hợp test case hữu hạn nhưng lại có độ bao phủ tốt nhất. Khi đó, sử dụng các kỹ thuật thiết kế kịch bản kiểm thử (test design techniques) có thể giúp chúng ta liệt kê ra được tập hợp test case đó.

Vậy kỹ thuật thiết kế kiểm thử bao gồm những loại nào?


![](https://images.viblo.asia/9d0ca2b5-2c12-46a7-abfd-8f918ab61c45.png)

Trên đây là hình ảnh Test design techniques được phân ra làm 2 loại chính, đó là : Kỹ thuật kiểm thử tĩnh (static technique) và kỹ thuật kiểm thử động (dynamic technique).

Trong bài viết này, chúng ta sẽ cùng nhau đi vào tìm hiểu kỹ thuật kiểm thử tĩnh (static techniques)


# I. Kiểm thử tĩnh là gì?
- Là loại kỹ thuật kiểm thử mà không thực thi mã nguồn hoặc không thực hiện chạy hệ thống phần mềm. Hiểu 1 cách đơn giản như kiểm tra, review các tài liệu đặc tả, tài liệu thiết kế, source code để tìm lỗi.
- Mục tiêu chính của việc kiểm thử này là nâng cao chất lượng sản phẩm bằng việc tìm lỗi trong giai đoạn sớm của quy trình phát triển phần mềm.
- Có thể cân nhắc để áp dụng kỹ thuật static testing vào tất cả các phase trong quy trình kiểm thử phần mềm bao gồm: review tài liệu đặc tả, review bản thiết kế, review code, trong giai đoạn thực thi test có thể review test cases…
- Kỹ thuật static có 2 phần:
  + Review: điển hình sử dụng tìm lỗi trong tài liệu như requirement, thiết kế, test case...
  + Static analysis: code được viết bởi dev được phân tích (thường phân tích bằng tools)

# II. Lợi ích của kiểm thử tĩnh
- Kỹ thuật kiểm thử tĩnh có thế bắt đầu sớm trong vòng đời phát triển phần mềm, do đó có thể phát hiện lỗi ở giai đoạn sớm.

- Với việc phát hiện lỗi sớm, chi phí cho việc sửa chữa lỗi sẽ giảm.

- Do chi phí bỏ ra cho các việc sửa chữa, làm lại giảm nên năng xuất phát triển sản phẩm cũng tăng lên.

- Kiểm thử tĩnh giúp nâng cao nhận thức các vấn đề về chất lượng sản phẩm

Tóm lại, phương pháp kiểm thử tĩnh là phương pháp rất phù hợp cho việc nâng cao chất lượng của sản phẩm phần mềm.
# III. Các kỹ thuật trong kiểm thử tĩnh
## 1. Review 

- Kỹ thuật review được chia làm 2 loại: formal review và informal review.
   + Informal review: Trong informal review, các bước review không được xác định trước. Ví dụ về đánh giá không chính thức bao gồm lập trình cặp, review theo cặp... Kết quả review có thể được ghi lại hoặc không được ghi lại. Tuy nhiên, đánh giá không chính thức thường được sử dụng vì chúng là một phương pháp tốn ít chi phí để nắm bắt các lỗi, các sai xót quan trọng.
   + Formal review: Trái ngược với informal review, formal reviews làm theo quy trình chính thức. Một quy trình review chính thức bao gồm 6 bước: Planing, kick-off, preparation, review meeting, rework, follow up.

### 1.1 Quy trình các bước thực hiện và các vai trò trong formal review
a. Các vai trò trong formal review
Trong formal review có các vai trò sau:
- Manager: là người quản lý tham gia vào việc quyết định có thực hiện review hay không, tham gia vào việc phân bổ thời gian lịch trình của dự án và là người quyết định liệu mục tiêu của việc review đã đạt được hay chưa.
- Moderator: là người điều hành quá trình review, xác định sử dụng loại hình review nào, thực hiện kiểm tra đầu vào và theo dõi quá trình làm lại để kiểm soát chất lượng đầu vào và đầu ra của quá trình xem xét. Người điều hành cũng lên lịch cuộc họp, phát tài liệu trước cuộc họp, huấn luyện các thành viên khác trong nhóm, điều chỉnh cuộc họp, dẫn dắt các cuộc thảo luận có thể và lưu trữ dữ liệu được thu thập.
- Author: Tác giả của tài liệu, phần mềm được review. Nhiệm vụ của tác giả là cần hiểu rõ tài liệu hoặc phần mềm sẽ được review, tìm hiểu về các lỗi cần sửa chữa và rút kinh nghiệm cho những tài liệu, phần mềm sau.
- Reviewer: Người đánh giá, kiểm tra tài liệu hoặc phần mềm. 
- Recorder: là người ghi chép lại từng lỗi được đề cập và  ghi lại các đề xuất để cải thiện quy trình trong cuộc họp đánh giá.

b. Quy trình review
- Planning
   + Trước tiên, tác giả của văn bản, phần mềm...cần review sẽ đưa ra yêu cầu được request, xác định rõ mục tiêu review với moderator.
  + Moderator được giao nhiệm vụ sẽ lên kế hoạch rõ ràng cho buổi review như thời gian, địa điểm và thành phần tham gia buổi meeting. Moderator kiểm tra đầu vào và xác định tiêu chí đầu ra của buổi review meeting. Việc kiểm tra đầu vào nhằm đảm bảo các tài liệu, phần mềm đã chuẩn bị sẵn sàng tránh lãng phí thời gian của moderator và mọi người.
Moderator cũng cần xác định phạm vi phần nào của tài liệu cần được review. 

- Kick off
  + Là một cuộc họp khởi động (cuộc họp không bắt buộc) trong quy trình review. Mục tiêu của cuộc họp này là tạo ra sự hiểu biết gắn kết về tình huống giữa tất cả những người tham gia liên quan đến tài liệu được xem xét và cam kết với các mốc thời gian được đề cập.
  + Nhìn chung, việc khởi động rất được khuyến khích vì có tác động mạnh mẽ và tích cực đến động lực của người đánh giá.
  + Trong cuộc họp này, người đánh giá nhận được một đoạn giới thiệu ngắn về các mục tiêu của việc đánh giá. Ngoài ra, những người tham gia đánh giá cũng được gửi và giải thích mối liên quan giữa tài liệu được xem xét và các nguồn tài liệu liên quan khác.

- Preparation: Những người tham gia tự nghiên cứu tài liệu trước khi thực hiện đánh giá. Họ cũng có thể xác định các lỗi, các thiếu xót trong tài liệu bằng cách đưa ra các câu hỏi và nhận xét theo ý hiểu của mình và vai trò được phân công.

- Review meeting
  + Cuộc họp này có thể bao gồm các yếu tố sau: giai đoạn ghi chép lại, giai đoạn thảo luận và giai đoạn quyết định.

  + Giai đoạn ghi chép: các vấn đề về lỗi như lỗi được người xem xét xác định trong quá trình chuẩn bị sẽ được ghi lại mức độ nghiêm trọng của nó bởi tác giả hoặc bởi một người ghi chép.

  + Giai đoạn thảo luận: tất cả các vấn đề được đánh dấu sẽ được thảo luận. 
  + Giai đoạn quyết định cuối cùng: là khi quyết định được đưa ra.

- Rework: Dựa trên kết quả của cuộc họp đánh giá, tác giả của tài liệu hoặc sản phẩm sẽ phải sửa lỗi và cập nhật trạng thái lỗi cho phù hợp.
 Tác giả phải ghi chú lại những phần thay đổi, sửa chữa để dễ xác định trong quá trình theo dõi

- Follow-up.

Người điều hành (Moderator) có trách nhiệm đảm bảo rằng tất cả các lỗi được ghi lại, đề xuất cải tiến quy trình và yêu cầu thay đổi đều đã được cập nhật, sửa chữa.

Nếu quyết định tất cả người tham gia sẽ đều có trách nhiệm kiểm tra tài liệu sau khi cập nhật, Người điều hành sẽ quản lý việc phân phối và thu thập phản hồi.

Người điều hành tập hợp các số liệu cần thiết và đánh giá nếu các tiêu chí đầu ra được đáp ứng để đóng các hoạt động review.

### 1.2 Walkthrough (hướng dẫn)
- Walkthrough là một kiểu review mà có những tính chất của formal review và informal review.
- Trong buổi walkthrough meeting, tác giả sẽ là người dẫn dắt buổi họp, thuyết trình cho những người tham gia meeting về document...mà cần review. Có thể sẽ có 1 buổi họp chuẩn bị trước cho buổi họp review này.
- Thư ký của buổi họp sẽ ghi lại những vấn đề trong buổi họp này.
- Dưới đây là một vài mục tiêu của walkthrough:
  + Để thu thập thông tin và có sự hiểu biết chung về nội dung document/software...

  + Để trình bày tài liệu cho các bên liên quan.

  + Walkthrough cũng được sử dụng để giải thích, chuyển giao kiến thức và đảm bảo những người đánh giá đều hiểu tài liệu.
  + Họ cũng nhằm mục đích kiểm tra và thảo luận về các giải pháp được đề xuất và tạo sự đồng thuận giữa những người tham gia.

### 1.3 Technical review (đánh giá kỹ thuật)
- Loại đánh giá này là quá trình ghi lại các lỗi, các thiếu xót mà có sự tham gia của đồng nghiệp và chuyên gia kỹ thuật. Nó thường được thực hiện giống như đánh giá chéo (peer review) mà không có sự tham gia của quản lý. Lý tưởng nhất là buổi review được dẫn dắt bởi một Moderator được đào tạo hoặc bởi một chuyên gia kỹ thuật. 
- Đây là một đánh giá riêng rẽ được thực hiện trong thời gian kiểm tra sản phẩm .Các thủ tục chính thức khác được sử dụng trong techical review như danh sách kiểm tra, danh sách ghi nhật ký hoặc nhật ký lỗi (không bắt buộc).

- Mục tiêu của đánh giá kỹ thuật là:
  + Để đánh giá giá trị của các khái niệm và giải pháp kỹ thuật thay thế trong môi trường sản phẩm và dự án
  + Để thiết lập tính nhất quán trong việc sử dụng các khái niệm kỹ thuật.
  + Để đảm bảo ở giai đoạn đầu, các khái niệm kỹ thuật được sử dụng một cách chính xác.

### 1.4 Inspection (kiểm tra)
- Inspection là loại đánh giá chính thức nhất và thường được dẫn dắt bởi người điều hành (moderator) được đào tạo bài bản. Loại đánh giá này sử dụng quy trình và các vai trò rõ ràng của đánh giá chính thức (formal review).

- Các quy tắc và danh sách kiểm tra được sử dụng trong giai đoạn chuẩn bị, trong thời gian sản phẩm được kiểm tra và xác định lỗi. Những lỗi này được ghi lại danh sách cẩn thận.

- Người điều hành thực hiện theo sát quy trình review bằng cách áp dụng các tiêu chí đầu ra; ngoài ra có thể thêm một bước phân tích nguyên nhân để giải quyết các vấn đề và rút kinh nghiệm, học hỏi từ các vẫn đề được tìm thấy.

- Thu thập và phân tích số liệu để tối ưu hóa quá trình.

## 2. Static analysis (phân tích tĩnh)
### 2.1 Static analysis là gì?
GIống như các tài liệu yêu cầu, tài liệu thiết kế, các tài liệu về kế hoạch hoặc tài liệu kịch bản kiểm thử...được review đánh giá, mã code cũng cần được kiểm tra mà không cần thực thi code.

Việc kiểm tra mã code  mà không cần chạy thực thi được gọi là phân tích tĩnh (static analysis).

- Những lợi ích của phân tích tĩnh: 

  + Xác định lỗi trog code
  + Xác định các lỗi không thể tìm thấy thông qua các kỹ thuật kiểm tra động (dynamic techniques)
  + Xác định các phụ thuộc và sự không nhất quán trong mã code
  + Cải thiện khả năng bảo trì mã code

Việc phân tích các lỗi được tìm thấy sẽ giúp xác định các giai đoạn cần cải thiện quy trình phát triển phần mềm. Điều này giúp ngăn ngừa việc phát sinh các lỗi tương tự trong tương lai.

### 2.2 Một số loại lỗi được tìm thấy trong việc phân tích tĩnh bằng công cụ (tool)
Dưới đây là một vài lỗi được tìm thẩy bằng công cụ (tool) trong quá trình phân tích tĩnh:

- Biến với giá trị không xác định
- Không đồng nhất giữa giao diện và chức năng
- Biến được khai báo nhưng không được sử dụng
- Mã code không thể truy cập
- Vi phạm những tiêu chuẩn/ quy ước trong lập trình 
- Lỗ hổng bảo mật
- Lỗi sai cú pháp

Trên đây, mình vừa giới thiệu với các bạn về Kỹ thuật kiểm thử tĩnh. Khái quát lại thì kỹ thuật kiểm thử này bao gồm đánh giá (review) và phân tích tĩnh. Việc đánh giá được áp dụng đối với các văn bản, các tài liệu như tài liệu đặc tả yêu cầu của khách hàng, tài liệu thiết kế, các kịch bản kiểm thử,...Còn kỹ thuật phân tích tĩnh bằng công cụ (tool) thì được áp dụng đối với việc kiểm tra mã code.

Hi vọng qua bài này các bạn có cái nhìn khái quát và hiểu được các kỹ thuật trong kiểm thử tĩnh. Trong các bài viết tiếp theo của mình, chúng ta sẽ cùng nhau tìm hiểu về Kiểm thử động (dynamic testing) nhé.

### References: 
- Book: Foundation of software testing
- https://artoftesting.com/manualTesting/test-design-techniques.html
- https://www.guru99.com/static-dynamic-testing.html
- https://www.tutorialspoint.com/software_testing_dictionary/static_testing.htm
- https://www.simplilearn.com/static-techniques-ctfl-tutorial-video