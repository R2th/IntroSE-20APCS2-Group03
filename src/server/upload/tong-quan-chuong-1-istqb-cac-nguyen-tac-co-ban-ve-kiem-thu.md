# 1.1 Kiểm thử là gì?
- Thường mọi người hiểu khái niệm kiểm thử chỉ là chạy kịch bản kiểm thử, chạy phần mềm nhưng đó chỉ là 1 phần không phải tất cả các hoạt động kiểm thử
- Các hoạt động kiểm thử tồn tại trước và sau khi chạy phần mềm bao gồm: lên kế hoạch và kiểm soát, chọn điều kiện kiểm thử, thiết kế và chạy kịch bản, kết quả kiểm thử, đánh giá tiêu chí kết thúc, báo cáo trong quy trình kiểm thử và các hoạt động đóng sau khi giai đoạn kiểm thử hoàn thành.
- Kiểm thử thì bao gồm cả review tài liệu, source code, phân tích tĩnh.
- Cả kỹ thuật kiểm thử động và kiểm thử tĩnh được sử dụng đồng thời để đạt được mục đích giống nhau và sẽ cung cấp thông tin để cải tiến hệ thống đang được kiểm thử và các quy trình.
### 1.1.1 Các mục tiêu điển hình của kiểm thử
- Để đánh giá các sản phẩm như là đặc tả yêu cầu, user stories, thiết kế, và code
- Để xác minh xem tất cả các yêu cầu đã được thực hiện đầy đủ chưa
- Để xác thực xem đối tượng kiểm thử đã hoàn thành chưa và hoạt động như người dùng và các bên liên quan khác mong đợi chưa
- Để xây dựng sự tự tin về mức độ chất lượng
- Để ngăn ngừa lỗi
- Cung cấp đầy đủ thông tin cho các bên liên quan để cho phép họ đưa ra quyết định sáng suốt, đặc biệt là về mức độ chất lượng của đối tượng kiểm thử
- Để giảm mức độ rủi ro về chất lượng phần mềm không đầy đủ
- Tuân thủ các yêu cầu hoặc tiêu chuẩn theo hợp đồng, pháp lý hoặc theo quy định để xác minh đối tượng kiểm thử tuân thủ các yêu cầu hoặc tiêu chuẩn đó
###  1.1.2 Sự khác nhau giữa Testing và Debugging
* Testing là chạy kịch bản kiểm thử có thể  thấy các lỗi được gây ra từ những cái không chính xác từ source code hoặc so với tài liệu đặc tả yêu cầu
* Debugging: là hoạt động phát triển tìm , phân tích và sửa các lỗi đó
  
# 1.2  Vì sao Kiểm thử là cần thiết?
- Kiểm thử 1 cách cẩn trọng hệ thống và tài liệu có thể giúp giảm rủi ro cho các vấn đề có thể xảy ra trong quá trình vận hành phần mềm
- Khi phát hiện lỗi và sau đó được sửa, điều này góp phần vào chất lượng của các thành phần hoặc hệ thống
- Kiểm thử phần mềm cũng là 1 yêu cầu trong hợp đồng và các yêu cầu pháp lý hoặc chuẩn công nghiệp.
### 1.2.1 Những yếu tố đóng góp để thành công trong kiểm thử


| Giai đoạn | Sự đóng góp |  
| -------- | -------- | -------- |
| Tester tham gia vào đánh giá yêu cầu hoặc sàng lọc yêu cầu người dùng có thể phát hiện lỗi     | Giảm nguy cơ chức năng không chính xác hoặc không thể kiểm chứng đang được phát triển
Tester làm việc chặt chẽ với các designer trong khi hệ thống đang được thiết kế có thể tăng sự hiểu biết và cách test nó|  Giảm nguy cơ lỗi thiết kế cơ bản và cho phép các xét nghệm được xác định ở giai đoạn đầu
Tester làm việc chặt chẽ với các developer trong khi code có thể tăng sự hiểu biết và cách test nó | Giảm nguy cơ lỗi trong code và chạy test 
Tester xác minh và xác thực phần mềm trước khi phát hành có thể phát hiện lỗi | Tăng khả năng phần mềm đáp ứng nhu cầu của các bên liên quan và đáp ứng các yêu cầu

### 1.2.2 Mỗi liên hệ giữa Đảm bảo chất lượng và Kiểm thử

Đảm bảo chất lượng và kiểm thử không giống nhau, nhưng chúng có liên quan

* Đảm bảo chất lượng bao gồm tất cả các hoạt động chỉ đạo và kiểm soát một đội liên quan đến chất lượng, bao gồm cả đảm bảo chất lượng và kiểm soát chất lượng.
*  Đảm bảo chất lượng thường tập trung vào việc tuân thủ các quy trình thích hợp để đảm bảo rằng mức độ chất lượng phù hợp sẽ đạt được
*  Đảm bảo chất lượng góp phần ngăn ngừa lỗi, nó liên quan đến các hoạt động khác nhau, bao gồm các hoạt động kiểm thử
*  Vì đảm bảo chất lượng liên quan đến việc thực hiện đúng toàn bộ quy trình, đảm bảo hỗ trợ kiểm thử thích hợp

### 1.2.3 Phân biệt giữa Error, Defects, and Failures

![](https://images.viblo.asia/2bce419c-bb4b-4ff2-ba98-cc41d92a4078.png)


* **Error, Mistake**: là những sai sót từ các hành động của con người
* **Defect/Fault/Bug**: là những sai sót dẫn từ đặc tả yêu cầu, tài liệu hoặc trong source code
* **Failure**: là lỗi sau khi chạy package trong source code

# 1.3. 7 nguyên lý cơ bản của kiểm thử
***1. Kiểm thử chứng minh sự hiện diện của lỗi***
- Kiểm thử có thể chỉ ra lỗi, nhưng không thể chứng minh rằng phần mềm không có lỗi.
- Kiểm thử làm giảm xác suất của các lỗi chưa được khám phá vẫn còn trong phần mềm nhưng ngay cả khi không có 1 lỗi nào được tìm thấy, nó cũng không phải là một bằng chứng về tính đúng đắn phần mềm.

***2. Kiểm thử toàn bộ là không thể***
- Kiểm thứ tất cả mọi thứ là không khả thi
- Thay vì kiểm thử tất cả, phân tích rủi ro và sắp xếp thứ tự ưu tiên nên được sử dụng để tập trung khi kiểm thử

***3. Kiểm thử càng sớm càng tốt***
- Các hoạt động kiểm thử nên bắt đầu càng sớm càng tốt trong chu kỳ phần mềm hoặc toàn bộ vòng đời phát triển và nên tập trung vào mục tiêu được xác định
- Thực hiện các kiểm thử và đánh giá càng sớm thì lỗi càng được phát hiện sớm khi đó ít tốn công để tìm và sửa chữa

***4. Lỗi thường được phân bố tập trung***
- Một số lượng nhỏ của các mô đun thường có chứa hầu hết các lỗi được phát hiện trong quá trình kiểm thử trước khi phát hành, hoặc là chịu trách nhiệm cho hầu hết các lỗi của hệ thống.
- Nguyên tắc 80/20: Mô đun chính thường chứa 80% lỗi

***5. Nghịch lý thuốc trừ sâu***
- Nếu các kiểm thử tương tự được lặp đi lặp lại nhiều lần, không có lỗi mới nào có thể được tìm thấy
- Để khắc phục nghịch lý thuốc trừ sâu này, kịch bản kiểm thử cần được thường xuyên cập nhật để tìm ra nhiều lỗi tiềm ẩn hơn

***6. Kiểm thử phụ thuộc vào ngữ cảnh***
- Kiểm thử được thực hiện khác nhau trong những bối cảnh khác nhau

***7. Quan niệm sai lầm về việc “hết lỗi”***

- Tất cả các yêu cầu được chỉ định và sửa tất cả các lỗi được tìm thấy vẫn có thể tạo ra một hệ thống khó sử dụng, không đáp ứng nhu cầu và mong đợi của người dùng, hoặc kém hơn so với các hệ thống cạnh tranh khác

# 1.4 Quy trình kiểm thử


| Các hoạt động kiểm thử |Đối tượng |Nhiệm vụ |
| -------- | -------- | -------- |
| Lập kế hoạch      | - Định nghĩa các đối tượng để kiểm thử và cách tiếp cận. Có thể tận dụng dựa vào các phản hồi từ hoạt động điều khiển và giám sát sản phẩm |  Kế hoạch kiểm thử bao gồm: Thông tin về các tài liệu để phân tích và thiết kế kiểm thử, tiêu chí đầu ra.
Giám sát và điều khiển kiểm thử| Đối tượng giám sát là so sánh giữa kế hoạch lập ra và tiến độ thực tế, song song với nó chính là hoạt động điều khiển để có hành động chỉnh sửa sao cho phù hợp | Lập ra bản báo cáo về quy trình kiểm thử và báo cáo sơ lược về kiểm thử
|Phân tích kiểm thử|Đặc tả yêu cầu, thông tin thiết kế và tiến hành, báo cáo phân tích rủi ro|Điều kiện kiểm thử được định nghĩa và xác định độ ưu tiên|
|Thiết kế kiểm thử|Thiết kế và xét độ ưu tiên kịch bản kiểm thử, xác định dữ liệu kiểm thử cần thiết, thiết lập môi trường và công cụ kiểm thử |Kịch bản kiểm thử ở cấp độ cao, mà không có giá trị về dữ liệu nhập vào và kết quả mong đợi|
|Thực thi kiểm thử|Phát triển và ưu tiên các kịch bản sử dụng các kỹ thuật cơ bản, tạo test suites từ các trường hợp kiểm thử để thực hiện kiểm thử hiệu quả, thực hiện và xác minh lại môi trường|Quy trình kiểm thử và trình tự thực hiện nó, thông số kiểm thử, môi trường, phiên bản, lịch chạy kịch bản kiểm thử|
|Thực hiện kiểm thử|Thực thi test suites và trường hợp kiểm thử riêng lẻ theo các phương thứ kiểm thử, ghi lại kết quả kiểm thử, so sánh kết quả thực tế và mong đợi|Tài liệu về trạng thái của riêng biệt các kịch bản kiểm thử, báo cáo lỗi. |
|Hoàn thành kiểm thử|Kiểm tra các báo cáo lỗi đã được đóng, ghi lại các yêu cầu thay đổi hoặc lỗi bất kỳ còn lại không xử lý tại lúc kết thúc thực hiện kiểm thử|Báo cáo tóm tắt kiểm thử, các yêu cầu thay đổi về sản phẩm |
# 1.5 Khía cạnh tâm lý của kiểm thử
### 1.5.1 Tâm lý con người và kiểm thử
Một số người có thể coi kiểm thử là hoạt động phá hoại, mặc dù nó đóng góp rất lớn vào tiến độ dự án và chất lượng sản phẩm, để giảm những nhận thức này:
- Thông tin về lỗi nên được truyền đạt theo cách xây dựng
- Kỹ năng giao tiếp tốt để có thể giao tiếp hiệu quả và khuyết điểm, kết quả kiểm thử, tiến độ kiểm thử và rủi ro và xây dựng mối quan hệ tích cực với đồng nghiệp

### 1.5.2 Nhận thức của người lập trình và người kiểm thử



|   | Lập trình viên | Người kiểm thử |
| -------- | -------- | -------- |
| Đối tượng    | Thiết kế và xây dựng sản phẩm  | xác nhận và xác minh sản phẩm, tìm lỗi trước khi phát hành   |
|Nhận thức|Quan tâm nhiều hơn đến việc thiết kế và xây dựng các giải pháp hơn là suy ngẫm những gì có thể sai với những giải pháp đó, khó tìm thấy sai lầm trong công việc của họ|tò mò, bi quan chuyên nghiệp, chú ý đến chi tiết|

Tài liệu tham khảo: https://www.istqb.org/downloads.html