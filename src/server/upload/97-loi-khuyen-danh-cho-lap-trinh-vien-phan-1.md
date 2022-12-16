# Mở đầu
Chào các bạn, đây là phần 1 trong serie dịch cuốn sách “97 Things Every Programmer Should Know” của Kevlin Henney (Kevlin Henney không phải là người đưa ra 97 điều khuyên này, mà là tổng hợp từ nhiều người khác nhau trong một dự án của họ). Trong mỗi bài viết, mình sẽ dịch 5 điều, và mình sẽ cố gắng hoàn thành serie này sớm nhất có thể.

Các bạn lưu ý và thông cảm rằng, mình sẽ chỉ dịch thoát ý (free translation) và dùng văn phong cá nhân để diễn đạt, không phải dịch từng câu từng chữ (literal translation) vì sẽ rất dài. Nên nếu có thời gian, mình vẫn khuyến khích các bạn đọc phiên bản gốc của cuốn sách. Có chỗ nào các bạn thấy mình diễn đạt khó hiểu, thì vui lòng góp ý trong phần bình nhé.

Mặc dù cuốn sách này được xuất bản vào năm 2010, những lời khuyên của các tác giả trong cuốn sách vẫn còn hữu ích đến tận bây giờ và xa hơn nữa. Nói ngắn gọn, những lời khuyên này là mindset mà người lập trình viên nên có, vì thế nó sẽ không thể lỗi thời một sớm một chiều được. Tuy nhiên nó sẽ đúng hoặc sai tùy người, tùy hoàn cảnh và tùy dự án. Vì thế hi vọng các bạn tham khảo một cách cởi mở và đừng phán xét tính đúng sai.

Bài viết gốc của mình tại đây: https://phucluong.com/97-loi-khuyen-danh-cho-lap-trinh-vien-phan-1/

## Điều 1 – Act with Prudence – Hành động với sự thận trọng
Thông thường khi bạn code một tính năng nào đó, có thể nó khá nhỏ, nhưng cũng rất lớn. Nhưng dù thế nào thì cũng khó tránh khỏi những thời điểm mà bạn cảm thấy vô cùng áp lực, ví dụ như vì deadline đến gần, hoặc vì bạn bí về giải pháp. Và nếu bạn phải chọn 1 trong 2 lựa chọn sau đây: “Làm đúng cách” và “làm cho xong” (“do it right” và “do it quick”), thì thường bạn sẽ đưa ra quyết định là “thôi làm cho xong cái đã rồi mình sẽ quay lại sửa nó thật bài bản sau. Sớm thôi! Thề!”. Và nó trở thành một “technical debt” mà bạn cần giải quyết. Giả sử như nếu sprint sau (scrum), những vấn đề mới, thách thức mới lại ùa đến, thì liệu “technical debt” đó có được ưu tiên giải quyết không, hay lại trễ hẹn qua những sprint tiếp theo?

“Technical debt” không phải điều gì xa lạ với lập trình viên, bạn thử ngẫm lại xem dự án bạn đang làm hiện có bao nhiêu “technical debt”? Nó giống như một món nợ ngân hàng mà nếu bạn không trả sớm, lãi sẽ ngày càng tăng cao, và khả năng bạn trả hết nợ sẽ lại càng khó. Một “technical debt” nằm lại càng lâu, thì khả năng bạn quên mất ngữ cảnh của vấn đề cũng tăng lên, và độ khó của nó cũng có thể tăng lên vì source code ngày càng phức tạp hơn. Và có thể việc giải quyết nó sẽ lại gây ra những “technical debt” khác vì nó quá khó để xử lý triệt để, hoặc do thời gian eo hẹp, hoặc do việc xử lý nó rủi ro cao quá nên sếp của bạn không muốn mạo hiểm.

Bạn hãy tránh đưa mình vào những tình huống như vậy, và cố gắng thận trọng làm tốt ngay từ những bước ban đầu. Nhưng nếu bất khả kháng phải quyết định tạo ra “technical debt” để có thể kịp deadline, thì cứ thoải mái, vì nó không phải là điều gì đáng xấu hổ. Tuy nhiên, bạn cần ghi nhớ lại những technical debt này một cách có hệ thống ngay khi bạn tạo ra chúng. Chẳng hạn như một cái TODO nho nhỏ trong code, với những diễn giải chi tiết về “What, Why và How”. Hay một cái sticky note trên màn hình để nhắc nhở bạn về nó. Theo kinh nghiệm của bản thân, mình khuyến khích các bạn nên dùng JIRA (hoặc công cụ tương tự) để track những technical debt của mình hiệu quả hơn, vì có thể không phải là bạn, mà là một người khác sẽ là người xử lý những technical debt đó.

## Điều 2 – Apply Functional Programming Principles – Áp dụng các nguyên tắc lập trình chức năng
Lập trình chức năng (FP) có thể hiểu nôm na là phong cách lập trình sử dụng các “pure function”. Pure function là gì? Pure function là một hàm đơn thuần với 2 tính chất sau:

Với những tham số truyền vào cố định, kết quả trả ra của hàm là không thay đổi.
Không có các side effect, ví dụ như thay đổi giá trị của tham số truyền vào, ghi log…
Chương trình được viết theo phong cách FP sẽ tránh sử dụng các khái niệm như “shared state” hay “mutable data”. Và một trong những tính chất quan trọng khác của FP chính là đảm bảo tính “Referential Transparency”. “Referential transparency” ám chỉ rằng các function sẽ luôn cho cùng một kết quả với cùng các tham số đầu vào, bất kể nó được gọi ở đâu và được gọi khi nào.

FP giúp giảm thiểu lỗi đáng kể so với phong cách lập trình trái nghịch là “imperative”, vì trong “imperative programming”, nó cho phép các “impure function” (function có thể trả ra giá trị khác nhau tùy vào từng thời điểm và hoàn cảnh khác nhau), cho phép thay đổi giá trị của biến (mutable variables)… Bạn có thể hình dung được rằng các lỗi tiềm ẩn sẽ nhiều hơn, và việc debug sẽ khó hơn vì chúng ta khó xác định được lỗi bắt nguồn từ đâu.

FP còn nhiều tính chất quan trọng khác đáng kể đến, các bạn tự tìm hiểu thêm nhé. Tuy nhiên, FP cũng có những hạn chế của nó, không phải lúc nào áp dụng FP đều mang lại kết quả tốt. Vì thế, nếu bạn hiểu rõ được tư tưởng và phong cách của FP, bạn sẽ tận dụng được nó vào đúng thời điểm và đúng dự án, mang lại hiệu quả tối ưu nhất. Điều cuối cùng mình muốn nhấn mạnh rằng, một dự án hoàn toàn có thể kết hợp nhiều mô hình (paradigm) khác nhau chứ không phải chỉ được phép mỗi FP hay object-oriented programming.

## Điều 3 – Ask, “What Would the User Do?” (You Are Not the User) – Đặt câu hỏi “người dùng sẽ làm thế nào”
Người dùng (users) không phải ai cũng có nhiều kinh nghiệm về máy tính như chúng ta (những lập trình viên), và có thể họ cũng chả quan tâm đến chúng. Tuy nhiên, chúng ta thường mặc nhiên nghĩ rằng ai cũng giống chúng ta, từ suy nghĩ cho đến hành động. Hãy tưởng tượng rằng bạn đang lập trình một trang web, và bạn nghĩ rằng user sẽ thực hiện các thao tác trên trang web giống hệt với những gì team bạn đã thiết kế và lập trình ra. Bạn nghĩ rằng trang web của mình rất dễ dùng và thân thiện, nhưng user họ có thật sự nghĩ vậy không?

Cách tốt nhất để biết câu trả lời là xem cách user tương tác với ứng dụng của chúng ta như thế nào. Bạn chỉ xem, và đưa ra yêu cầu chung chung chứ không đưa ra hướng dẫn chi tiết từng bước cho user. Lấy một ví dụ, bạn quan sát xem cách user tính tổng của một cột các con số trong Excel. Bạn sẽ đưa ra yêu cầu “Hãy tính tổng các con số này”, hoặc là “Hãy tính xem tháng này tổng chi phí văn phòng phẩm là bao nhiêu”, chứ không phải đưa ra chỉ dẫn “chọn vào ô này, dùng lệnh SUM, chọn các ô…”. Sau đó quan sát – chỉ quan sát – xem user xử lý và hoàn thành công việc như thế nào, có những trở ngại gì, hay họ có khám phá ra đường vòng (work-around/shortcut) nào để hoàn thành công việc không. Và thường thì, khi họ đã quen với một chuỗi các hành động nào đó để hoàn thành công việc, họ sẽ rất ít khi thay đổi (dù có cách khác nhanh hơn). Vì thế, việc thay đổi giao diện có thể sẽ khiến user của bạn vô cùng lúng túng và khó chịu, trong khi bạn lại nghĩ rằng giao diện mới sẽ giúp user xử lý công việc nhanh hơn.

Sẽ luôn có sự khác biệt giữa những gì user nói và những gì họ thật sự muốn và làm. Vì thế khi tiếp nhận yêu cầu từ khách hàng, cách tốt nhất là xem cách user xử lý công việc, chứ không nên chỉ có hỏi và hỏi. Dành ra hàng giờ để xem và thấu hiểu cách user làm việc sẽ có ích hơn là ngồi cả ngày để đoán xem user muốn gì.

## Điều 4 – Automate Your Coding Standard – Tự động hóa chuẩn coding của bạn
Khi bắt đầu một dự án, mọi người thường rất hứng khởi và có nhiều dự định (tech stack, coding convention…) cho dự án. Một số điều sẽ được ghi chú lại thành những tài liệu tham khảo sau này. Hãy nói về các chuẩn coding (“coding standard” hay “coding convention”) của dự án và team bạn. Khi bắt đầu dự án, các leader sẽ giới thiệu qua tất cả các document và quyết định về kĩ thuật, bao gồm cả những chuẩn coding, và lý tưởng thì mọi người sẽ đều thống nhất tuân theo. Tuy nhiên khi dự án được triển khai, những chuẩn này dần bị làm ngơ hoặc quên lãng. Và khi hoàn thành dự án, code của dự án như một đống lộn xộn, không ai biết nó trở nên như thế từ bao giờ.

Vậy vấn đề nằm ở đâu? Có thể nó nằm ở cuộc họp bắt đầu dự án, một số người có thể đã không tập trung, hoặc không hiểu người leader nói gì, hoặc một số người không đồng tình nhưng không nói ra, mà âm thầm quyết định làm theo những chuẩn của riêng mình. Hoặc cũng có thể do deadline mà một số người buộc phải “nhắm mắt làm ngơ”. Lợi ích của coding standard thì nhiều không thể nói hết, nhưng phải thú nhận rằng viết code mà lúc nào cũng phải để ý theo chuẩn thì khá là mệt, đôi khi cũng buồn chán nữa. Nên tốt nhất là nó được tự động hóa.

[Ý kiến cá nhân] Ngày xưa, có thể các IDE chưa thông minh như ngày nay, và các tool cũng hạn chế, nên việc viết code theo chuẩn thường cần phải làm bằng tay. Ngày nay, IDE đã vô cùng thông minh, và tool cũng vô cùng nhiều, nên việc format code cũng trở nên dễ dàng hơn rất nhiều.

Một số ví dụ mà bạn có thể tự động hóa:

Đảm bảo code được chuẩn hóa tự động mỗi khi các thành viên trong nhóm commit code.
Sử dụng các công cụ phân tích code để dò xem các lỗi tiềm ẩn, hoặc các antipattern trong code. Có thể tăng áp lực hơn bằng cách điều chỉnh để nó “break the build”, buộc người viết code phải sửa lại code.
Viết unit-test và đảm bảo duy trì code coverage ở mức cao. Tương tự, có thể “break the build” nếu code coverage giảm.
Cuối cùng thì, chúng ta cũng không nên quá cứng nhắc về chuẩn coding. Khi dự án phát triển, nhu cầu thực tế về chuẩn coding cũng có thể thay đổi. Có thể có những chuẩn tốt được cả nhóm (hoặc cả cộng đồng) đồng tình vào thời điểm đầu dự án, nhưng về sau nó có thể không còn tốt nữa.

## Điều 5 – Beauty Is in Simplicity – Vẻ đẹp đến từ sự đơn giản
Có rất nhiều tiêu chí mà chúng ta luôn phải để tâm đến khi lập trình, ví dụ như:

* Readability – Tính dễ đọc dễ hiểu của code
* Maintainability – Khả năng phát triển & bảo trì
* Speed of development – Tốc độ phát triển nhanh/chậm
* The elusive quality of beauty – “code đẹp”

Và để đạt được các tiêu chí trên, hóa ra rất đơn giản, chỉ cần “làm mọi thứ thật đơn giản”.

Trước hết, thế nào là “code đẹp”? Câu hỏi này khá khó để trả lời, vì mọi câu trả lời đều có khả năng mang ý kiến chủ quan. Mỗi người sẽ có những nhận thức và kinh nghiệm khác sau về cái “xấu” và “đẹp”, và chuẩn “đẹp” của các kĩ sư phần mềm khả năng cao sẽ khác với những người làm về lĩnh vực nghệ thuật. Tuy nhiên, theo kinh nghiệm của tôi (người đưa ra lời khuyên này), mẫu số chung của tất cả đều dựa trên cơ sở của “sự đơn giản”.

Hãy nghĩ về những đoạn code mà bạn đã học/viết. Và nếu bạn chưa từng (hoặc hiếm khi) dành thời gian nghiên cứu code của những người có tên tuổi trong ngành, thì hãy dừng lại và thử tìm kiếm trên mạng một mã nguồn mở nào đó do họ viết xem sao… Có thể bạn sẽ nhận ra rằng, dù cho các ứng dụng/thư viện/hệ thống của họ có lớn như thế nào, thì chúng đều cấu thành từ những mảnh ghép vô cùng đơn giản: những object đơn giản, được sử dụng vào duy nhất một mục đích (single responsibility). Những hàm cũng tương tự như vậy, tên được đặt rất tường minh, và nội dung hàm có thể cũng sẽ rất ngắn (chỉ khoảng 5-10 dòng).

Nói tóm lại, “code đẹp” là “code đơn giản”. Mọi thành phần đều được giữ ở mức đơn giản: mục đích sử dụng đơn giản, mối quan hệ đơn giản với các thành phần khác trong hệ thống… Đây là cách mà chúng ta có thể giữ cho hệ thống dễ dàng bảo trì cũng như phát triển về sau.