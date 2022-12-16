Trong Vòng đời phát triển phần mềm (SDLC) , bước đầu tiên là tổng hợp yêu cầu cẩn thận với việc đọc **Tài liệu đặc tả yêu cầu phần mềm** (SRS- Software Requirements Specification) , hiểu yêu cầu, đưa ra các thắc mắc về các yêu cầu không đầy đủ hoặc không rõ ràng. Mục đích chính của giai đoạn này là để hiểu và làm rõ các yêu cầu khác sâu xa hơn chưa được đề cập trong tài liệu. <br>
# 1. Tài liệu đặc tả yêu cầu là gì?
![](https://images.viblo.asia/90b89c8b-c194-46be-b8b8-78b9dcd686e6.jpg)<br>
*SRS- Software Requirements Specification*<br>

SRS là một tài liệu được tạo bởi nhóm phát triển phối hợp với các nhà phân tích kinh doanh và nhóm phân tích môi trường / dữ liệu. Thông thường, tài liệu này sau khi hoàn thành sẽ được chia sẻ với nhóm QA thông qua một cuộc họp đế chia sẻ, trao đổi và phân tích chi tiết. Đôi khi, đối với một ứng dụng đã có sẵn, chúng ta có thể không cần một cuộc họp chính thức và có một ai đó hiểu nhất về dự án sẽ hướng dẫn và giải thích giúp chúng ta thông qua tài liệu này. Qua tài liệu SRS chúng ta cũng có thông tin chính thống cần thiết để có thể tự tìm hiểu và phân tích yêu cầu của dự án. 

Nếu nhóm phát triển bắt đầu thực hiện triển khai dự án mà không giải quyết các yêu cầu còn thiếu hoặc không rõ ràng thì điều này sẽ gây ra các lỗi không đáng có trong ứng dụng phần mềm.

Sẽ luôn luôn tốt hơn nếu nắm bát và giải quyết sớm sự mơ hồ trong tài liệu SRS. Chi phí sửa chữa các khiếm khuyết trong giai đoạn đầu sẽ thấp hơn so với sửa chữa các khiếm khuyết trong các giai đoạn sau. Điều quan trọng nhất là xác định sự mơ hồ trong yêu cầu trước khi các thông số thiết kế kỹ thuật và các giai đoạn về sau khi thực hiện dự án của SDLC, do đó giai đoạn đầu tiên này còn được gọi là bước "Ngăn ngừa Khiếm khuyết".

# 2. Danh sách revew tài liệu đặc tả yêu cầu
Trong bài viết này, chúng ta sẽ thảo luận về các hướng dẫn chi tiết về danh sách kiểm tra và danh sách kiểm tra tài liệu đặc tả yêu cầu:<br>
![](https://images.viblo.asia/214bab9d-76bc-485b-b4be-6f49619693e3.jpg)
*Checklist to review software requirements specification*<br>

* **Đảm bảo rằng tất cả các nhóm đều đang tham gia vào review tài liệu đặc tả yêu cầu phần mềm**, đọc tài liệu đặc tả kỹ lưỡng và thảo luận từng điểm với các thành viên khác trong nhóm của bạn.<br><br>
Ví dụ phân chia 2 member cùng tìm hiểu spec của chức năng Signup/ Signin. Sau khi tìm hiểu có thể trao đổi với nhau xem có hiểu giống nhau không hoặc có thể chia sẻ những điểm khác biệt của chức năng Signup/ Signin trong ứng dụng này với các thành viên khác trong team. 
![](https://images.viblo.asia/379b3f1c-f506-43ba-96aa-9adc3c66faa4.png)<br>
*Teamwork*
* **Phần chính của SRS sẽ trình bày về chức năng và phần này sẽ cho chúng ta biết về phần mềm**: "Phần mềm phải làm gì?" Sẽ là hữu ích hơn nếu SRS còn trình bày cả về "Những gì mà phần mềm không yêu cầu làm?". Vì vậy, hãy đảm bảo rằng team của bạn có thể hiểu bao quát chính xác được tất cả các chức năng của phần mềm.<br><br>
Thông thường, tùy và dự án và khách hàng mà đội dự án có thể tự thống nhất và đưa ra phương án xử lý hợp lý nhất cho sản phẩm. Tuy nhiên có những phần mềm đặc thù mà yêu cầu của khách hàng cũng không bình thường như các ứng dụng khác. Vì vậy chúng ta cần làm rõ yêu cầu của khách hàng. <br><br>
Ví dụ: chức năng Signup thông thường sẽ lưu thông tin đăng nhập email là duy nhất trong DB, tuy nhiên có ứng dụng lại không yêu cầu vậy. User có thể *đăng ký bằng SNS với email A* thành công, sau đó cũng có thể *đăng ký bằng user ID với email A*. Nghĩa là sẽ có 2 tài khoản cùng email A nhưng login service khác nhau thì vẫn hợp lệ. 


* **Xem xét tài liệu đặc tả yêu cầu một cách cẩn thận** : nếu bạn quan sát các thuật ngữ được sử dụng trong thông số kỹ thuật dẫn đến sự mơ hồ thì hãy hỏi các bên liên quan để làm rõ. Bạn có thể kiểm tra các thuật ngữ mơ hồ, chung chung được sử dụng trong SRS như: usually, sometimes, some, mostly, most, may be, v.v.

* **Kiểm tra các điều khoản được sử dụng như một danh sách** nhưng không được đề cập rõ ràng hoặc không đề cập đầy đủ như danh sách đưa ra, v.v., 
Ví dụ trong spec của 1 màn hình có liệt kê 20 item, đánh số từ 1 đến 20 nhưng ở trang mô tả chi tiết thì lại thiếu mô tả cho item 15. 

* **Kiểm tra xem tất cả các thuộc tính được xem xét trong SRS như tính chính xác, bảo mật, khả năng bảo trì**, v.v.

* **Đừng giả sử bất kỳ yêu cầu nào**: nếu bất kỳ yêu cầu nào không rõ ràng thì bạn nên đưa ra các truy vấn. Đôi khi tùy vào mục đích của sản phẩm mà khách hàng sẽ có những spec khác so với suy nghĩ thông thường của mình. <br><br>
Ví dụ: nếu một trường đầu vào chấp nhận số tiền lớn hơn 10 và nhỏ hơn 100. Vì vậy, ở đây bạn có thể hỏi về việc liệu có hỗ trợ các dấu thập phân cho trường này không, nếu có thì là làm tròn đến số thập phân thứ mấy.<br>
![](https://images.viblo.asia/e420ce5e-bd97-4c2c-b4fa-aff0a2738fc0.jpg)<br>
*Đội dự án & Khách hàng*

* **Nếu yêu cầu được giải thích với đoạn văn lớn** thì hãy ngắt nhỏ đoạn văn trong câu nhỏ và đưa ra một hình ảnh hoặc biểu đồ tổng hợp để dễ hình dung và hiểu rõ hơn về kịch bản.<br><br>
Ví dụ với quy trình mua 1 sản phẩm cần phải qua các trạng thái bắt buộc từ Đã xác nhận mua hàng -> Chờ lấy hàng -> Đang vận chuyển -> Đã nhận hàng -> Đánh giá sản phẩm. Nhìn vào đây chúng ta có thể hiểu cơ bản luồng hoạt động chính của một chức năng. 

* **Nếu có bất kỳ thông số kỹ thuật không rõ ràng**, hãy đảm bảo rằng tất cả các truy vấn sẽ được làm rõ từ Project Manager càng sớm càng tốt.
![](https://images.viblo.asia/c7bd2a1d-b5c4-40e8-bfbe-a097f2400284.PNG)<br>
*Q&A*

* **Nếu có bất kỳ phép tính nào liên quan để có được các giá trị cụ thể**, thì hãy đảm bảo rằng bạn xem lại phép tính với các bộ dữ liệu đầu vào khác nhau (nghĩ đến việc chuyển các điều kiện giá trị biên.)<br>
Ví dụ bạn cần kiểm tra có đúng tài khoản này đã quá gia hạn thanh toán trong 1 tháng, nếu quá hạn sẽ không sử dụng được một số chức năng nào đó. Vậy, bạn cần chỉnh sửa dữ liệu test như: <br>
> Ngày hiện tại = 20/7 <br>
> Ngày thanh toán cuối cùng 19/6<br>
> Như vậy đã quá hạn, và tài khoản sẽ hạn chế 1 số chức năng. <br>

* **Kiểm tra yêu cầu tham số hiệu suất ( Performance parameters)**  được xem xét trong tài liệu SRS, nếu có thì bạn có thể yêu cầu các thôn tin về thời gian, tính sẵn sàng, tốc độ, thời gian phục hồi, v.v.
Ngoài ra có một số tham số khác như token

* **Nếu bản chất mô-đun lớn và phức tạp hơn một chút** thì hãy chia mô-đun thành các tính năng của nó và kiểm tra các kịch bản thử nghiệm xung quanh tính năng. Bạn cũng có thể chia nhỏ test scenarios thành các test cases nếu test scenarios vẫn còn phức tạp quá.

* **Đảm bảo rằng tất cả các câu hỏi / truy vấn / vấn đề đang chờ xử lý phải được theo dõi thường xuyên.** Luôn chắc chắn và đảm bảo rằng câu hỏi đó trả lời từ người quản lý sản phẩm ví dụ nhưu khách hàng, PM, BrSE. 
* **Khi nhận được xác nhận từ họ, sau đó đảm bảo rằng lịch sử sửa đổi được duy trì.**

* **Khi tất cả các câu hỏi đã được trả lời thỏa đáng và tài liệu đặc tả yêu cầu được cập nhật** và bây giờ nếu có bất kỳ yêu cầu thay đổi nào được đưa ra thì bạn nên đưa ra các truy vấn về các khu vực bị ảnh hưởng.
Như ví dụ trên:
> Nếu quá hạn thanh toán, tài khoản sẽ không sử dụng được một số chức năng nào đó.

<br>

![](https://images.viblo.asia/9064e38d-18c9-469c-9372-e75935bc32b9.jpg)
 <br>
*Think outside the box*<br><br>
Vậy **các chức năng đó** là gì, hãy làm rõ thêm về vấn đề này với người quản lý sản phẩm nha.
Tuy nhiên, tùy vào từng khách hàng hay dự án, chúng ta cũng cần thống nhất cách trao đổi sao cho hiệu quả nhất. Có dự án Q&A nhiều khách hàng đánh giá cao vì chúng ta phát hiện ra nhiều vấn đề mà họ chưa nghĩ đến. Nhưng cũng có dự án chúng ta hỏi quá lắt nhắt hoặc bị lặp câu hỏi thì khách hàng sẽ đánh giá mình đọc hiểu tài liệu đại khái. Vì vậy nên tổng hợp những vùng ảnh hưởng hay nhưng chức năng tương tự thì có xử lý cùng 1 kiểu hay không. Như vậy cũng tiết kiệm thời gian và khách hàng không cảm thấy bị phiền phức quá nhiều, mình cũng được đánh giá cao hơn về cách làm việc.


# 3. Template cho Test scenario
Trong quá trình tìm hiểu tài liệu đặc tả yêu cầu, chúng ta có thể tổng hợp như test scenario dưới đây:<br>
![](https://images.viblo.asia/67225db7-067b-4a8e-8fa8-8d8ad3d5d08c.jpg)<br>
*Template scenario*<br><br>
Bảng trên đây sẽ cho phép chúng ta tổng hợp và tạo các kịch bản kiểm thử. Các cột bao gồm:<br><br>

* **Cột 1: Test scenario ID**<br>
Mỗi thực thể trong quá trình test phải được định danh (tức là phải có yếu tố để phân biệt với các thực thể khác mà không trùng nhau). Vì vậy, mỗi kịch bản kiểm thử phải được định danh bằng ID. Các quy tắc để tuân theo trong khi gán ID này phải được định nghĩa. Chúng ta có thể quy ước đặt tên như sau:

    * Tiền tố viết tắt cho kịch bản kiểm thử là: TS
    * Tiếp theo bởi dấu “_”
    * Tên module: MI
    * Tiếp theo bởi dấu “_”
    * Và sau đó là các phần phụ (Ví dụ: MIM cho Module My info, P cho hình ảnh).
    * Tiếp theo bởi dấu “_”
    * Theo sau cùng là số serial.
    * Một ví dụ sẽ là: “TS_MI_MIM_01”.
    
* **Cột 2: Requirement**

Nó giúp chúng ta trong việc tạo một kịch bản kiểm thử, chúng ta có thể làm cho nó phù hợp trở lại phần của taid liệu SRS nơi mà chúng ta đã lựa chọn để base trên đó. Nếu yêu cầu có ID chúng ta sẽ sử dụng chúng. Nếu không phần số thậm chí số trang của tài liệu SRS từ nơi mà chúng ta xác đinh được yêu cầu có thể được kiểm thử sẽ làm.


* **Cột 3: Test scenario description**

Mô tả ngắn gọn " Kiểm thử cái gì". Chúng ta nên dề cập đến đối tượng kiểm thử ở đây. 

* **Cột 4: Importance**

Điều này để đưa ra tầm quan trọng của chức năng nhất định cho giai đoạn AUT. Những mức độ  như High, Midium, Low có thể được gán cho mục này  này. Bạn cũng có thể chọn một hệ thống điểm như từ 1 đến 5, trong đó 5 là quan trọng nhất, 1 là ít quan trọng. Dù giá trị mục này có thể bỏ qua trong 1 vài case, nhưng nó phải được quyết định trước.

* **Cột 5: No. of Test cases**

Ước tính sơ bộ có bao nhiêu test case cho một kịch bản kiểm thử. 
<br>Ví dụ: Để test chức năng login – tôi thiết lập bao gồm các tình huống: Tên người dùng và mật khẩu chính xác. Tên người dùng đúng và mật khẩu sai. Mật khẩu đúng và tên người dùng sai.
=> Vì vậy, việc kiểm thử chức năng đăng nhập sẽ có khoảng 3 test case.
Số testcasae ước tính không cần phải quá chính xác. Nó phụ thuộc vào cách viết testcase của từng người. Và bạn cũng cẫn có kinh nghiệm để estimate số testcase chuẩn nhất có thể. 

## Tóm lại, kết quả review SRS như sau:

* Danh sách các kịch bản kiểm thử.

* Kết quả review – lỗi tài liệu/ yêu cầu tìm thấy /xác minh các tài liệu SRS.

* Một danh sách các câu hỏi cho việc hiểu tốt nhất – trong bất kỳ trường hợp nào, đó chính là tài liệu Q&A 

    * Trong quá trình Q&A, bạn cũng cần theo dõi thường xuyên và cập nhật câu trả lời của khách hàng. Khi có câu trả lời thỏa đáng, cần update ngay lập tức vào kịch bản kiểm thử  
    * Nếu các câu trả lới bị mâu thuẫn với nhau, cần xác nhận lại đâu là mong muốn cuối cùng của khách hàng. 
    * Cần thông báo với các bên/ cá nhân liên quan để có thể cập nhật tình hình và thống nhất cách hiểu vởi nhau khi có thay đổi hoặc câu trả lời của khách hàng. 
    * Kiểm tra và yêu cầu khách hàng update tài liệu đặc tả yêu cầu tương ứng với các câu hỏi trong Q&A

* Ý tưởng sơ bộ về môi trường test được cho là giống nhau: cần test trên những thiêt bị nào, phiên bản bao nhiêu. 

* Xác định phạm vi kiểm thử và một ý tưởng kiểm thử sơ bộ dựa trên việc ước lượng có bao nhiêu test case.

## Những điểm chú ý quan trọng:

* Kịch bản kiểm thử không mở rộng ra bên ngoài (không được chia sẻ với đội phân tích nghiệp vụ hoặc đội Dev) nhưng rất quan trọng cho nội bộ của đội QA. Vì họ là những người đầu tiên để hướng tới mục tiêu của việc test bao phủ 100%. 

* Chúng ta có thể sử dụng một công cụ kiểm tra quản lý như HP ALM hoặc qTest để tạo kịch bản kiểm thử. Tuy nhiên, việc tạo ra các kịch bản kiểm thử trong thời gian thực là một hoạt động thủ công. Theo ý kiến của tôi, phương pháp bằng tay thuận tiện hơn. Vì nó là bước đầu tiên nên chúng ta không cần phải đi tìm các truy vấn lớn nào cả. Sheet excel là cách đơn giản và hữu ích nhất mà chúng ta nên làm.
# 4. Phần kết luận:

Trong bài viết này, chúng ta đã đề cập đến các đặc điểm để đo lường yêu cầu. Tổng hợp lại bao gồm:

* Yêu cầu phải rõ ràng và mọi điểm cần đề cập cụ thể.
* Yêu cầu phải được hoàn thành, không có bất kỳ sự không nhất quán.
* Yêu cầu phải có thể kiểm tra được và mọi yêu cầu có thể kiểm tra thì nên có một số tiêu chí để đánh giá lại yêu cầu đó liệu có phù hợp nhất chưa.
* Yêu cầu phải được đo lường và nó có thể được đo lường với các tiêu chuẩn / điều khoản cụ thể.<br>
Đảm bảo rằng bất kỳ sự mơ hồ nào trong yêu cầu phải được xác định sớm trong giai đoạn SDLC vì  nó sẽ giảm được chi phí để khắc phục lỗi cho các giai đoạn sau. Vì vậy bạn nên trao đổi nhiều hơn với các bên liên quan để làm rõ yêu cầu trước khi bắt đầu giai đoạn thiết kế và thực hiện.

# Tham khảo 
https://www.softwaretestinghelp.com/rview-srs-document-and-create-test-scenarios-software-testing-training-course-day-2/
http://www.softwaretestingclass.com/guidelines-to-review-software-requirements-specification-srs-document-the-complete-checklist/
https://www.bmc.com/blogs/software-requirements-specification-how-to-write-srs-with-examples/