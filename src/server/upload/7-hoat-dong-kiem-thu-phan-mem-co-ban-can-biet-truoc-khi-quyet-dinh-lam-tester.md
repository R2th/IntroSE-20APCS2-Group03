Theo "State of Testing report", ngành kiểm thử phần mềm đang phát triển hơn bao giờ hết. Đây không phải là điều đáng ngạc nhiên khi ngày càng có nhiều người muốn trở thành một kiểm thử viên, với mức thu nhập thực sự "happy".

Nhưng cũng có những lời phàn nàn rằng họ không thích kiểm thử phần mềm. Họ cảm thấy đã chọn sai con đường và lãng phí thời gian với kiểm thử sau khi gắn bó vài tháng.

Tại sao điều đó xảy ra với cả những người đã rất quan tâm, hào hứng với nghề kiểm thử. Có nhiều lý do để lý giải, nhưng lý do lớn nhất là: sự vỡ mộng. Họ nghĩ rằng kiểm thử phần mềm dễ, nhưng khi bắt đầu lại không như thế. Họ nghĩ rằng kiểm thử phần mềm chỉ là tìm ra lỗi, bây giờ mới nhận ra có nhiều hoạt động liên quan mà họ không hề thích. Họ không chắc chắn kiểm thử có phải là lựa chọn phù hợp hay không? 

Tuy nhiên, có thể tránh tình huống này xảy ra bằng cách tìm hiểu trước kiểm thử là gì? các hoạt động liên quan đến kiểm thử,...để quyết định bắt đầu. Đó là nội dung chính được đề cập đến trong bài viết này: 7 hoạt động kiểm thử phần mềm cơ bản cần biết trước khi quyết định làm tester.

Bắt đầu thôi nào...

### 1. Đọc tài liệu 
![](https://images.viblo.asia/ddcdbbeb-20b1-43dd-a18f-86a55df9d79c.jpg)

Sau vài vòng phỏng vấn, cuối cùng bạn đã được tuyển dụng cho vị trí kiểm thử. Trong ngày đầu tiên đi làm, bạn nhận task công việc và bắt đầu đọc tài liệu như yêu cầu đặc tả, hướng dẫn, trợ giúp,... để biết thêm về hệ thống sẽ kiểm thử.

Có thể bạn đang háo hức rằng mình sẽ bắt tay ngay vào công việc, sẽ tìm được nhiều bug của hệ thống, hay những việc khác thú vị hơn. Nhưng đọc tài liệu để hiểu về hệ thống đang kiểm thử là một trong những task đầu tiên khi tham gia vào bất kỳ dự án nào.

Bản thân tôi thì lại thấy hoang mang, không biết bắt đầu từ đâu nếu không có thời gian tìm hiểu overview về dự án, đọc tài liệu spec. Vì thế, nên tận dụng cơ hội này để tìm hiểu và đặt càng nhiều câu hỏi về hệ thống càng tốt. Nếu dự án không có bất kỳ tài liệu nào, hãy học hỏi, tìm hiểu qua leader hay những member tham gia dự án trước đó.

Sau khi tìm hiểu xong, có thể bạn phải trình bày những gì đã đọc và ý hiểu của mình với leader, các member khác. Thế nên trong quá trình tìm hiểu phải tỉ mỉ, mạnh dạn đặt câu hỏi, xác nhận lại nếu thấy phân vân để đảm bảo hiểu đúng, hiểu hết và nên note lại cẩn thận. Lúc đó, mới sử dụng kiến thức có được để bắt đầu các hoạt động kiểm thử tiếp theo như viết checklist, test case, execute test...

**Hoạt động này kéo dài bao lâu?** 
Phụ thuộc vào độ phức tạp của dự án. Với một số dự án nhỏ cần tới 1-2 ngày để tìm hiểu. Một số dự án lớn sẽ mất nhiều ngày hơn. Có thể là được assign đọc toàn bộ hệ thống hoặc một chức năng cụ thể nào đó.

**Hoạt động này thú vị như thế nào?** Câu trả lời là khá nhàm chán. Thậm chí còn nhàm chán hơn nếu dự án đó không có tài liệu sẵn, tài liệu không đầy đủ hoặc trong một số trường hợp bạn chưa/không có quyền truy cập tài liệu. Điều đó có nghĩa là không có tài liệu, hình ảnh để mô tả cụ thể về các chức năng trong hệ thống đó. Tuy nhiên, chắc chắn bạn sẽ thấy thú vị nếu có hình dung tổng quan về chức năng, hệ thống.

**Hoạt động này quan trọng như thế nào?** 
Rất quan trọng. Mặc dù bản chất của việc đọc tài liệu là nhàm chán, nhưng càng biết nhiều về hệ thống, mình càng có thể viết test case hoặc tìm bug hiệu quả hơn.

### 2. Viết test case 
![](https://images.viblo.asia/5c1b6bee-0612-4785-8a90-1b9d5772903c.jpg)

Thường test case sẽ được trình bày theo template của dự án mà test leader sẽ đưa ra.

Để bắt đầu viết test case (create test case), hãy tham khảo bản test case của các member khác để thấy hướng tư duy, cách trình bày sao cho thống nhất. Tập xây dựng các viewpoint (quan điểm test), tìm hiểu thêm về các kĩ thuật viết testcase (Phân vùng tương đương, phân tích giá trị biên, bảng quyết định,...) hay checklist những lỗi thường gặp để tạo ra các trường hợp kiểm thử tối ưu và hiệu quả nhất. Kỹ thuật viết test case sẽ được trau dồi, tích lũy dần nên không cần quá lo lắng...Có chức năng lên đến trăm, nghìn test case nhưng chức năng nhỏ lại chỉ vài chục case.

Bên cạnh đó, một hoạt động cần thiết đi kèm theo là **review test case**. Tuy nhiên, không thể coi đây là điều xấu khi ai đó xem xét xem mình làm như nào, đúng chưa? Việc review chéo test case bởi một member khác hay test leader để đảm bảo các trường hợp kiểm thử đúng, đầy đủ, mang lại hiệu quả tìm bug cao. 

### 3. Thực hiện kiểm thử/kiểm thử hồi quy
Tới bước kiểm thử hệ thống (execute test), tester mới thấy công việc thú vị hơn, bớt nhàm chán. Dựa vào bản test case đã xây dựng trước đó, viết cho một chức năng cụ thể được assign, chúng ta chạy hết một lượt test case, và tất nhiên nhiệm vụ chính là "xác nhận chức năng đó chạy đúng và tìm bug" rồi "report bug", sẽ "re-test" sau khi bug được fix. 

Lưu ý khi thực hiện test là version của bản build phải là mới nhất, test đúng môi trường.

"Re-test" là chỉ test lại phần gây ra bug. Nhưng việc fix bug, hay những thay đổi có thể làm phát sinh bug khác, nên cần thực hiện kiểm thử hồi quy (regression test) - Test các phần được thay đổi và các phần liên quan, đảm bảo việc thay đổi hay fix bug không làm ảnh hưởng đến các phần khác.

Test hồi quy rất cần thiết, mang lại hiểu quả cao cho kiểm thử nhưng có vài điểm hạn chế:
* Mất nhiều thời gian.
* Có thể phải cập nhật lại test case cho đúng khi chức năng đã thay đổi, điều đáng lo ngại là việc thay đổi lắt nhắt, nằm rải rắc trong file test case.
* Chạy lại test case hồi quy quá nhiều lần sẽ gây cảm giác nhàm chán, quan điểm test bị đi theo lối mòn. Tuy nhiên việc chạy test hồi quy vẫn không thể bỏ qua.

### 4. Kiểm thử khám phá
![](https://images.viblo.asia/cd60d1da-0f82-46f2-92dd-02b55f75d000.jpg)
Khi đã vận dụng hết các kỹ thuật kiểm thử cơ bản thông thường, test hồi quy nhiều lần nhưng không tìm thêm được bug nào nữa, chúng ta phải vận dụng khả năng đoán lỗi. Đoán lỗi dựa vào tất cả kiến thức về hệ thống, theo kinh nghiệm test, các lỗi đã gặp ở chức năng khác cũng có thể gặp ở phần đang test,...

Đây là lúc sáng tạo, hình dung nhiều tình huống, đứng ở vị trí người dùng trải nghiệm sản phẩm để nghĩ ra các kịch bản test ngoài file test case, sẽ thấy nhiều bug lạ, thú vị.

### 5. Báo cáo bug
![](https://images.viblo.asia/b1880e6b-c869-4352-946d-c685d14a89ec.jpg)
Khi phát hiện bug, việc cần làm là báo cáo cho dev càng sớm càng tốt, báo trực tiếp hoặc qua một vài tool như Jira, redmine,...tùy theo mỗi công ty lựa chọn.
Về cơ bản, đó chỉ là một hoạt động để dev thấy vấn đề đang xảy ra với hệ thống và fix. Nhưng sâu hơn, còn để quản lý tracking tiến độ, chất lượng code, số lượng bug xảy ra hay tester khác có thể tham khảo.

Nội dung báo bug thường bao gồm:
* Description: Nội dung khái quát, bug gì, xảy ra ở đâu, độ nghiêm trọng?
* Environment: Môi trường test, bug ở đâu, trên môi trường nào (web thì browser nào, app thì trên hệ điều hành nào), version nào,...
* Create date: Thời gian phát hiện.
* Step: Các bước tái hiện.
* Actual result: Kết quả thực tế, hình ảnh, video đính kèm.
* Expected result: Kết quả mong muốn.
* Priority: Độ ưu tiên.
* Severity: Mức độ ảnh hưởng.
* Assign to: dev nào fix bug? tester nào re-test?
* Status: thể hiện trạng thái của bug
* ...

Báo cáo bug cần chú ý:
* Tránh báo cáo bug trùng lặp
* Tránh báo cáo bug không hợp lệ
* Tránh báo cáo bug không thể fix
* Tránh đổ lỗi cho ai đó về nguyên nhân gây ra bug
* Bug phải được mô tả đầy đủ, chính xác, ngắn gọn, dễ hiểu.

### 6. Các cuộc họp
![](https://images.viblo.asia/635ce545-cbf0-4d1a-83e8-c74a282fc51b.gif)

**Daily meeting:**
Rất nhiều công ty đang theo mô hình Scrum, và Daily meeting được coi là bắt buộc. Trong cuộc họp này, mỗi sáng, thành viên dự án sẽ lần lượt cập nhật tiến độ làm việc bằng cách trả lời ba câu hỏi sau:
* Hôm qua đã làm gì?
* Có vấn đề gì phát sinh, có ảnh hưởng đến tiến độ?
* Dự định sẽ làm gì hôm nay?

Hoặc nếu không theo mô hình Scrum, cũng sẽ có những cuộc họp hoặc hình thức nào đó để báo cáo tiến độ hàng ngày hoặc khi cần thiết.

**Một vài cuộc họp khác:**
* Khi tài liệu requirement spec không cụ thể, rõ ràng, cả team cần họp để làm rõ.
* Khi phát sinh bug: Nếu cần thiết sẽ họp để tìm hướng fix bug hoặc yêu cầu thêm thông tin từ tester, quyết định bug nào fix trước, bug nào fix sau,...
* Các cuộc họp triển khai quy trình, kế hoạch của cả dự án, chia sẻ về kiến thức, chức năng mới,...
* Họp chia sẻ điểm mạnh, hạn chế của dự án...

### 7. Báo cáo tiến độ kiểm thử
![](https://images.viblo.asia/ab645974-9015-43a1-8620-cbac5f69127b.jpg)
Ngoài daily meeting, các member trong team cần báo cáo tiến độ, kết quả kiểm thử qua mail, tool, google sheet,.. theo ngày, theo tuần tùy thuộc vào dự án, cách quản lý của leader.

Thường xuyên báo cáo tiến độ, vấn đề phát sinh một cách chủ động để leader nắm được tình hình, cân đối lại plan, đưa ra những quyết định hoặc cáo báo cho cấp trên. Đôi khi, là member có thể thấy việc này không cần thiết, phiền phức lắm, ngày nào, tuần nào cũng phải làm...Nhưng nó lại mang ý nghĩa quan trọng, không chỉ giúp leader checking dự án mà còn giúp chúng ta học cách báo cáo, chủ động, tăng tương tác gắn kết trong công việc.

Lưu ý: các hoạt động kiểm thử phần mềm không giới hạn ở những gì được đề cập trong bài đăng này, mà được chia sẻ dựa theo kinh nghiệm thực tế, và đây chỉ là những hoạt động cơ bản. Ngoài ra, một số công ty sử dụng các thuật ngữ khác nhau với những điều tương tự nêu ở đây. Hy vọng bài viết này sẽ hữu ích với những bạn đang phân vân có nên bắt đầu với nghề kiểm thử không.

Bài viết tham khảo từ: https://www.asktester.com/7-common-software-testing-activities/