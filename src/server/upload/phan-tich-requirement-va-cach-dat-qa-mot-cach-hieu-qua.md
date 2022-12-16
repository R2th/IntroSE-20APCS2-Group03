Trong quy trình phát triển phần mềm, giai đoạn đầu tiên vô cùng quan trọng cần làm là phân tích tài liệu đặc tả. Đây cũng là giai đoạn chúng ta sẽ đưa ra rất nhiều câu hỏi với khách hàng nhằm đảm bảo việc hiểu rõ tài liệu đặc tả. Vậy làm thế nào để phân tích được requirement một cách hiệu quả? Hỏi thế nào ngắn gọn nhưng khách hàng vẫn có thể hiểu được và tiết kiệm thời gian trả lời cho khách hàng?

Trong bài viết này chúng ta sẽ đề cập đến vấn đề làm sao để đặt Q&A sao cho hiệu quả.

# I. Software requirement là gì ?

## 1. Định nghĩa

Trước tiên chúng ta cần hiểu software requirement là gì? Hiểu một cách đơn giản software requirement là tài liệu miêu tả những yêu cầu của khách hàng về sản phẩm phần mềm, những hành vi của đối tượng trong sản phẩm đó, đó là những yêu cầu về chức năng hoặc phi chức năng mà sản phẩm phần mềm cần đáp ứng được.

## 2. Một số loại software requirement

- Tài liệu SRS (Software requirement specification): Là tài liệu đặc tả những yêu cầu của phần mềm, bao gồm những yêu cầu về chức năng và phi chức năng. Ví dụ về tài liệu đặc tả dự án các bạn có thế xem thêm tại đây nhé.

- UI/UX: Là những thiết kế về giao diện người dùng và trải nghiệm người dùng. Để hiểu hơn về khái niệm UI/UX các bạn có thể tìm hiểu thêm tại đây nhé.

- Use Case diagram: Là sơ đồ thể hiện các hành động, sự tương tác của user cho từng chức năng trên hệ thống phần mềm. Để hiểu hơn về Use case diagram, các bạn tìm hiểu thêm tại đây nhé.
Business rule diagram/Data flow diagram: Là sơ đồ thể hiện các logic nghiệp vụ, các luồng dữ liệu của hệ thống phần mềm.

- Data dictionary and Glossary: Khi phát triển phần mềm liên quan đến những lĩnh vực mới, có rất nhiều ngôn ngữ chuyên ngành khó hiểu. Do đó tài liệu đặc tả thường đính kèm Data dictionary and Glossary – văn bản liệt kê các từ ngữ chuyên ngành sử dụng trong tài liệu đặc tả nhằm giúp thành viên trong dự án hiểu rõ hơn.

- User stories: Yêu cầu của khách hàng có khi không phải là một văn bản mà còn có thể được viết trên các công cụ quản lý dự án như Jira, Redmine,…Thường được viết dưới dạng ngôn ngữ Gherkin rất dễ hiểu.

# II. Phân tích requirement như thế nào cho hiệu quả?

## 1. Tìm hiểu overview về hệ thống

- Join meeting để phân tích, review và chia sẻ những gì liên quan đến project.

- Hiểu về khách hàng và project.

- Hiểu về bối cảnh và kinh doanh.

## 2. Tự học và phân tích requirement 

- Tìm hiểu logic chính: main flow, alternative flow

- Tìm hiểu các yêu cầu kỹ thuật khác: interface, functional, non-functional...

- Xây dựng các mô hình requirements bằng cách sử dụng tools or manual (apply use case, statement transition)

- Áp dụng test design techniques để phân tích requirement.

- Note các câu hỏi thắc mắc về project vào file Q&A.

## 3. Tham gia một cuộc họp với team QA và đội phát triển dự án để xác nhận lại requirement.

Xác nhận lại requirement, cách hiểu về dự án cùng với các bên liên quan đến dự án.

## 4. Modeling requirement

- Modeling requirement giúp tester hiểu rõ ràng các chức năng của hệ thống.

- Modeling requirement sử dụng tool hoặc manual.

- Các requirement sẽ được chuyển thành các dạng như: Data flow diagram, sequence diagram, use case diagram, inheritance, activities diagram, mind map,...

- Ứng dụng test design techniques vào use case diagram, data flow diagram.

Ví dụ một số tool nên sử dụng để phân tích requirement hiệu quả mọi người có thể tham khảo
 https://www.liquidplanner.com/blog/7-tools-to-gather-better-software-requirements/

# III. Cách đặt Q&A file trong dự án phần mềm

## 1. Q&A file là gì?

- Là một dạng Question and Answer. Trong file sẽ bao gồm tất cả các câu hỏi và câu trả lời liên quan đến project như requirement, coding, design,..

- Khi thực hiện tìm hiểu yêu cầu, có bất kỳ câu hỏi nào liên quan đến dự án thì note vào Q&A file.

- Q&A file là một sổ ghi chép rất quan trọng.

## 2. How to make Q&A file?

Một số items cần thiết trong file Q&A:

+ Reference

+ ScreenID/ Category/ Component

+ Question content

+ Answer

+ Priority

+ Create date

+ Creator 

+ Assign to/ Answer person

+ Status

- Kind of question: Câu hỏi đóng và câu hỏi mở

### 2.1 Câu hỏi đóng

Câu hỏi đóng chủ yếu mang tính chất xác nhận đúng sai từ khách hàng về một vấn đề nào đó trong dự án mà bên mình chưa thực sự chắc chắn.

- Cấu trúc: Bên mình đưa ra quan điểm, vấn đề cần xác nhận để khách hàng đưa ra câu trả lời một cách ngắn gọn.

- Ví dụ: Cách tính tuổi của user như thế nào thì đúng?

+ Dựa vào ngày tháng năm sinh và ngày tháng năm hiện tại?

   hay
   
+ Chỉ dựa vào năm sinh và năm hiện tại?

### 2.2 Câu hỏi mở

Câu hỏi mở là những câu hỏi chưa có câu trả lời, đòi hỏi người được hỏi phải đưa ra câu trả lời, quan điểm về các vấn đề được đề cập đến.

Ví dụ: 

+ App/ web cần được check trên môi trường nào?

+ Format file CSV để import thông tin user như thế nào?

### 2.3 Khi nào thì đặt Q&A

- Bắt đầu một dự án: Đây là giai đoạn phân tích yêu cầu đặc tả, cần đưa ra nhiều câu hỏi với khách hàng để clear specs.

- Khi dự án đang chạy: Trong quá trình phát triển dự án có 

+ Change request

+ New function

- Trong quá trình test phát hiện ra có vấn đề và chưa clear/confuse.

- Khi kết thúc phase/ kết thúc dự án: Có đối ứng CR (change request) hay không? Nếu có thì cần Q&A để clear nội dung CR, xác định mức độ rủi ro, phạm vi ảnh hưởng và tổng hợp rồi gửi cho khách hàng sớm nhất có thể.

- Khi nào thì đặt Q&A nội bộ.

+ Khi nội dung requirement chưa rõ ràng mà trong nội bộ có thể giải quyết được.

- Khi nào thì đặt Q&A với khách hàng

+ Khi cần confirm lại requirement với khách hàng.

+ Tránh tình trạng Q&A trong nội bộ có thể giải quyết được mà lại thực hiện Q&A với khách hàng.

### 2.4 Khi bắt đầu dự án thì nên đặt Q&A theo thứ tự

- Q&A chung cho toàn dự án

+ Thứ tự ưu tiên cho các chức năng là gì? 

+ Môi trường test là gì (web, app, web-app), support version bao nhiêu?

+ Test trên devices nào (Android/IOS), Browser nào (Cốc cốc, Chrome, firefox...)

- Q&A riêng cho từng function cụ thể.

+ Khi nào thì có specs cho một function cụ thể.

+ Thực hiện Q&A theo 5W-1H:

![](https://images.viblo.asia/0e194ad3-4a74-40c3-bb52-ef5a85b51697.png)

![](https://images.viblo.asia/7a76ea5a-79e1-436c-9075-57c76fd13009.png)

### 2.5 Khi dự án đang chạy thì nên đặt loại Q&A như thế nào?

- Dùng Q&A mở (5W1H): khi spec của function X đã có, nhưng chưa thực sự rõ ràng.

- Dùng Q&A mở (5W1H): khi spec của function X đã có, QA chưa nắm được, khách hàng đang băn khoăn các phương án và cần tìm hiểu technical skill.

- Dùng Q&A đóng (Y/N question): khi spec của function X đã có, QA nắm được, nhưng khách hàng đang băn khoăn các phương án, cách thức xử lý: Cần đưa ra suggestion cho khách hàng.

- Dùng Q&A đóng (Y/N question): khi spec của function X đã có, QA nắm được nhưng chưa chắc chắn, cần confirm lại.

### 2.6 Một số chú ý khi đặt Q&A

- Không nên đặt nhiều câu hỏi trong cùng 1 nội dung

- Với mỗi câu hỏi cần có thông tin đối ứng để giảm thời gian cho người tiếp cận: Link spec, hình ảnh ...

- Trước khi đặt một câu hỏi mới cần kiểm tra lại câu hỏi có bị trùng không?

- Sau khi có câu trả lời nên trao đổi với người liên quan để thống nhất cách hiểu và hướng xử lý chung.

# IV. Tài liệu tham khảo

1. https://viblo.asia/p/phan-tich-requirement-va-cach-qa-voi-khach-hang-mot-cach-hieu-qua-4P8566rB5Y3

2. https://viblo.asia/p/cach-dat-qa-trong-du-an-phan-mem-Eb85oxqBK2G

3. https://itzone.com.vn/vi/article/phan-tich-requirement-va-cach-qa-voi-khach-hang-mot-cach-hieu-qua/