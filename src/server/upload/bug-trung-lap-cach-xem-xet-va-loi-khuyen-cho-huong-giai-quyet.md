Refer:
https://www.stickyminds.com/article/when-testers-should-consider-bug-duplicate
https://blogs.msdn.microsoft.com/johnguin/2009/04/27/duplicate-bugs-a-simple-example/

## Quan điểm 
Một bug có thể xem là trùng lặp khi nó đã tồn tại trong hệ thống quản lý bug. Nếu bạn hỏi developer (DEV), nếu có 2 bug được phát hiện với cùng một lỗi trong code, nó vẫn chưa đủ để xem 2 bug đó là trùng lặp. [Michael Stahl](https://www.stickyminds.com/users/michael-stahl) đã có những quan điểm để chỉ ra rằng, trong trường hợp đó thì report bug vẫn tốt hơn là không report và để nó nằm ngoài bảng quản lý.

Trong kiểm thử phần mềm, có một số lượng các vấn đề không được xem là vấn đề vì sự phổ biến của nó và vì nó được mọi người chấp nhận/ thỏa hiệp, một trong những số đó là quản lý bug.

Về lý thuyết, quản lý bug là một quy trình rõ ràng: Có một cuộc họp 3 bên bao gồm DEVs, Project Manager (PM), những người quan tâm. Trước tiên, các bug đã báo cáo được kiểm tra từ mô tả bug, logs, các hình ảnh/ video, sau đó bug sẽ được tái hiện theo mô tả. Bước tiếp theo, họ sẽ thảo luận về mức độ nghiêm trọng của vấn đề. Đôi khi vấn đề được làm rõ một cách dễ dàng, và đôi khi nó phức tạp và đòi hỏi người tham dự cuộc họp phải có hiểu biết về kỹ thuật. Khi một bug được xác định là nghiêm trọng, mọi người sẽ thảo luận tiếp thời gian fix bug. Mặc dù quy trình là đã có và rõ ràng, nhưng ở một vấn đề nào đó vẫn có tranh chấp, tranh luận diễn ra.

![Quy trình Tracking bug](https://images.viblo.asia/38f36920-d314-48f5-9a01-34fcf8e886bf.png)

Trường hợp khi có một bug được xem là trùng lặp, có nghĩa nó đã tồn tại trong hệ thống quản lý bug. Trong trường hợp này, bug mới không cần log hoặc nó sẽ được close mà không cần phải thảo luận.
Một bug được xem là trùng lặp khi nó được xác định có cùng cách dẫn đến lỗi từ việc xem xét bằng mắt và sau khi kiểm định. Trong trường hợp này Tester đã không chuyên nghiệp, họ nên kiểm tra vấn đề đã được log trên hệ thống quản lý lỗi chưa trước khi log bug mới, tránh gây nhiễu bằng cách log các bug tương tự nhau. Tuy nhiên, không phải trường hợp nào cũng là bug trùng lặp, một số DEVs vì muốn giảm số lượng bug còn tồn, với họ việc close bug là một điều tốt, do đó vẫn có các buổi họp 3 bên diễn ra và vẫn có những cuộc tranh cãi không hiệu quả diễn ra.

## Xem xét một bug có trùng lặp?

Nếu người được hỏi là DEVs, và 2 bug xảy ra do một lỗi tương tự trong code, họ sẽ khuyến nghị bạn chỉ report một lần, bug thứ 2 sẽ không còn khi bug 1 được fix. Như cách nhìn của Devs (PM cũng nhìn nhận như thế trong khá nhiều trường hợp), những khẳng định của họ có thể làm thông tin về bug và mức độ ưu tiên bị hạn chế. Chúng ta hãy cùng xem qua 2 ví dụ sau: 
### 1. Ví dụ 1:
Dưới đây là một ví dụ (nếu bạn là Devs): Giả sử bạn có một app để lưu trữ và báo cáo điểm số cho sinh viên. Code để extract điểm số từ Database (DB) sử dụng Mã số sinh viên (MSSV) của sinh viên để xác định sinh viên. App cho phép sinh viên tự nhập vào các thông tin của mình như họ tên, số PIN, số điện thoại, số thẻ tín dụng. App sẽ sử dụng các thông tin sinh viên nhập để lấy MSSV từ bảng điểm sinh viên, sau đó MSSV được sử dụng để xuất thông tin điểm từ DB. 
Có 5 test case được đưa ra trong việc kiểm thử hệ thống. Mỗi case kiểm tra khả năng extract điểm sử dụng các dữ liệu khác nhau mà sinh viên nhập. Chúng ta thử đoán xem chuyện gì xảy ra khi sự hồi quy trong code extract điểm từ bảng thứ 2, tất cả 5 case sẽ fail.
Chuyện gì đã xảy ra trong code trong trường hợp trên? Nếu chúng ta báo cáo 5 bug đồng nghĩa là hệ thống là rất nghiêm trọng, nó tác động lớn đến project. Nhưng điều này là không hoàn toàn đúng, chỉ có một lỗi trong code, nó sẽ được giải quyết trong nửa ngày bao gồm cả thời gian kiểm tra. Vì vậy, chỉ có 1 lỗi chính đáng trong 5 lỗi trùng lặp. Tuy nhiên hãy cùng đọc tiếp những phản đối dưới đây từ góc nhìn của tester.
Chúng ta tự tin rằng 5 case fail do cùng 1 lý do, đối với ví dụ trên là đúng. Nhưng với tester: nếu điểm số bị sai từ việc extract trong code sẽ lấy sai MSSV. Nếu chúng tôi close 4 bug được cho là trùng lặp, sẽ có thể chỉ có 1 lỗi được fix. Các lỗi khác chỉ được phát hiện khi test lần sau. Khi không đủ thời gian, Tester có thể sẽ không kiểm tra lại trường hợp không có lỗi được log. Với vị trí là tester, chúng tôi cần báo cáo những gì đã xảy ra trong kiểm thử, nó không liên quan đến việc thảo luận về các bug. Chúng tôi chỉ chấp nhận bug trùng lặp khi chúng có cùng hành động để tái tạo và có cùng kết quả xảy ra.
Một trường hợp khác của bug trùng lặp là, có 2 tester cùng kiểm tra một task và cả 2 cùng log bug mà không kiểm tra xem nó đã tồn tại trong hệ thống quản lý bug chưa. Vậy với trường hợp cùng 1 tester lại log 2 bug tương tự nhau. Chuyện gì xảy ra khi họ lại log 1 vấn đề lần thứ 2? Họ vẫn nhớ bug đã log lần trước, họ phán đoán hai vấn đề không hoàn toàn giống nhau, ngay cả khi Devs nghĩ là nó giống.

Điều quan trọng là phải có những cuộc thảo luận về chủ đề này vì tester đôi khi quyết định không report một số vấn đề bởi họ nghĩ nó là trùng lặp.

### 2. Ví dụ 2:

Bạn có thể tham khảo thêm một ví dụ từ Miccrosoft ở [link](https://blogs.msdn.microsoft.com/johnguin/2009/04/27/duplicate-bugs-a-simple-example/). Tôi sẽ tóm tắt lại như sau:
Giả sử OneNote có một lỗi về phép tính khi yêu cầu chia với số 0
Nhập "1/0" và nhấn Enter
Kết quả: 1/0 = 0, đây là kết quả không chính xác đối với toán học, Tôi sẽ kiểm tra một vài trường hợp khác, tôi gọi đó là #1
Nhập "1/0 =" trên một page mới và nhấn Enter
Kết quả: Một dòng mới được thêm vào
Giả sử có một lỗi khác là #2
Nhập bất kỳ phép tính với dấu bằng ở cuối và nhấn enter
Kết quả: Đáp án luôn luôn bằng 0
Kết luận: Các bug giống như bug #1 và sẽ được giải quyết dưới dạng bug trùng lặp.
Tuy nhiên, có một vấn đề cho tình trạng này, nếu có một số lượng lớn người dùng gặp các lỗi trên (cố gắng chia cho 0), có nghĩa là nhiều người đang sử dụng tính năng này, và bên project sẽ đánh giá mức độ ưu tiên cho bug.

## Vậy nên làm gì khi gặp bug có thể là trùng hợp?

![Bug hay không phải bug](https://images.viblo.asia/add60d80-3d0a-42b3-b687-29cd4882b6de.png)

Những tester thường nghĩ rằng họ hiểu được những ảnh hưởng tổng thể của lỗi, họ kết luận là bug này giống với bug trước đó, ngay cả khi bug mới không hoàn toàn giống với bug trước đó.
Bất cứ khi nào gặp lỗi mà nó không hoàn toàn giống chính xác với lỗi trước đó, hay tạo một bug mới. Nếu nó cùng là 1 bug, các devs sẽ fix một lần. Nếu cả 2 bug không giống nhau, Devs sẽ fix luôn cho cả 2 bug. Hãy liên kết các bug này với nhau trong hệ thống quản lý bug, nó sẽ hỗ trợ các Devs biết rằng các lỗi này có thể liên kết với nhau hoặc là có thể cùng một vấn đề, hãy viết rõ ràng trong mô tả bug là chúng có thể liên quan với nhau.