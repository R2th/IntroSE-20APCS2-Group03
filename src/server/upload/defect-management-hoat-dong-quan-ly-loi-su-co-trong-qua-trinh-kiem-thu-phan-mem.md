Trong quá trình phát triển phần mềm, chắc chắn sẽ xảy ra lỗi hoặc sự cố làm ảnh hưởng đến chức năng của phần mềm. Vậy khi phát hiện những sự cố, lỗi đó thì chúng ta cần quản lý lỗi, sự cố  một cách tốt nhất  để giúp sản phẩm phần mềm được hoàn thiện.

Để hiểu rõ hơn về Defect Management - Quản lý lỗi, sự cố bài viết này lần lượt tìm hiểu các nội dung sau đây:
*     Defects-What?
*     Defects - Come from where ?
*     Defects Management - Definition
*     Defects Management - 4 steps
# Defects-What?
Trong tiếng anh có rất nhiều từ để diễn tả về lỗi như : error, fault, failuve, bug, defect hay incident..
Vậy thế nào là lỗi?
* Lỗi được định nghĩa là bất kỳ 1 sự cố, vấn đề gì được tìm bởi các hoạt động đảm bảo chất lượng. Các hoạt động đảm bảo chất lượng bao gồm các hoạt động trong kiểm thử tĩnh và kiểm thử động .
* Lỗi cũng được coi là 1 sự cố, 1 vấn đề xảy ra trong 1 chức năng hoặc hệ thống làm chức năng hoặc hệ thống đó làm việc không đúng như yêu cầu. Ví dụ: câu lệnh không đúng hoặc định nghĩa dữ liệu không đúng...
* Trong quá trình kiểm thử, nếu bạn cảm thấy cân nhắc rằng chỗ này, chỗ kia cần kiến nghị, đề xuất sửa thì đề xuất này cũng sẽ được ghi nhận như là 1 sự cố hay là 1 lỗi để quản lý.
* Ngoài ra còn một số thuật ngữ chúng ta nên biết để hiểu hơn về lỗi, sự cố như:
   - Root cause: Nguyên nhân gốc rễ - đây là nguồn gốc phát sinh ra lỗi. Nếu nó được loại bỏ thì lỗi sẽ giảm đi hoặc không xuất hiện nữa.
   - Incident - sự cố : Bất cứ một vấn đề gì xảy ra cần nghiên cứu, một thuật ngữ khác thông dụng như defect.
   - Incident report: Báo cáo sự cố, bộ tài liệu mô tả cho thấy sự cố đã xảy ra trong quá trình kiểm thử.
   - Defect logging : Ghi nhận lại lỗi khi lỗi được phát hiện.
   - Defect tracking: Theo dỗi lỗi từ khi lưu lại lỗi được phát hiện cho đến khi lỗi được xử lí hoàn toàn. Việc theo dõi lỗi thông qua kiểm tra trạng thái của lỗi.

# Defects - Come from where ? 
Lỗi đến từ đâu?
* Thứ nhất : Lỗi đến từ các sản phẩm cần kiểm thử như : tài liệu yêu cầu đặc tả(software Requirement Specification), tài liệu thiết kế chi tiết(Detail Design), source code, tài liệu các tình huống kiểm thử(Test case), chức năng cần kiểm thử...
* Thứ hai: Lỗi có thể tìm thấy qua các hoạt động kiểm soát chất lượng như : kiểm tra tài liệu, kiểm tra thiết kế, kiểm tra code, kiểm thửu đơn vị, kiểm thử tích hợp, kiểm thử hệ thống hay kiểm thử chấp nhận.
* Thứ ba: Lỗi có thể đến từ các quá trình tạo ra sản phẩm phần mềm như: tạo ra sản phẩm yêu cầu, thiết kế, kiểm thử..
* Hoặc lỗi có thể đến từ một số nguồn như : do môi trường kiêm thử bị thiếu hoặc sai hay hỏng dữ liệu kiểm thử, do việc quản lý cấu hình phiên bản không tốt...
# Defects Management - Definition
Vậy chúng ta nên làm gì khi một lỗi 1 tìm thấy?
* Một lỗi khi tìm thấy thì phải được ghi nhận, phân tích để giao cho tác giả hoặc người thích hợp để sửa nó. Sau khi lỗi được sửa thì phải được kiểm tra lại và có thể phải quyết định xem có phải kiểm thử hồi qui để kiểm tra xem việc sửa lỗi có ảnh hưởng đến các phần khác hay không.
* 
![](https://images.viblo.asia/a8d7e9e7-f633-40fc-bbca-6094a098ef99.PNG)

=> Quản lý lỗi sẽ quản lý toàn bộ quy trình này. Như vậy, quản lý lỗi là quá trình ghi nhận , phân tích và xử lý các lỗi đã được ghi nhận.
#  Defects Management - 4 steps
Quy trình quản lý lỗi bao gồm 4 bước :
* Bước 1:Khi xác định ra lỗi, 1 vấn đề thì lỗi đó được ghi vào hệ thống quản lý lỗi. Nếu không có một hệ thống quản lý lỗi thì ghi nhận vào một biểu mẫu riêng của dự án dưới dạng excel hay word. Ghi nhận lỗi phải đày đủ thông tin, mô tả kỹ lỗi đó, xuất hiện như thế nào, thực hiện hoạt động đảm bảo chất lượng gì? Thông thường ai phát hiện ra lỗi thì người đó phải là người ghi nhận lỗi đó.
* Bước 2: Sau khi lỗi được ghi nhận sẽ phải thực hiện phân tích lỗi đó để trước tiên xác nhận xem đó có phải là lỗi hay không, để có những hành động thích hợp.
* Bước 3 : Lỗi được xác định là sẽ sửa thì phải được giao cho người thích hợp sửa. Người chịu trách nhiệm sửa sẽ phải thực hiện sửa lỗi. Trong quá trình sửa lỗi, người sửa lỗi sẽ phải tự kiểm thử đơn vị họ sửa trước khi thông báo lỗi đó đã được sửa.
* Bước 4: Lỗi sau khi được sửa phải kiểm thử lại để xác nhận xem lỗi đó thực sự đã được sửa chưa, nếu sửa chưa đúng thì mở lại lỗi đó, nếu sửa đúng rồi thì đóng lỗi.

=>  Việc quản lý lỗi, quản lý sự cố chính là việc kiểm soát lỗi hay sự cố đó từ khi lỗi hay sự cố được ghi nhận đến khi chúng ở trạng thái đóng.