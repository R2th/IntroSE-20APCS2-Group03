## Kiểm thử API là gì?

API là gì và nó hoạt động như thế nào?

API là một tập hợp các chức năng phần mềm, thủ tục có thể được sử dụng bởi các phần mềm khác. API được dùng để kết nối giữa các ứng dụng với nhau. Nó là lớp chuyên xử lý các thao tác của người dùng, nhận request từ người dùng, xử lý và gửi yêu cầu tới database, sau đó lấy dữ liệu từ database gửi ngược lại người dùng ở tầng giao diện.

Ví dụ, website Google có thể có API cho các chức năng khác nhau như search, translate, calendar,...

Một API có cấu trúc như sau:
http://<servername>/v1/export/Publisher/Standard_Publisher_Report?format=csv

API gồm nhiều phương thức, chủ yếu có 4 phương thức phổ biến sau:

* GET: Truy xuất một tài nguyên, nhận dữ liệu từ server và hiển thị
* POST: Tạo một tài nguyên trên server
* PUT: Thay đổi trạng thái một tài nguyên hoặc cập nhật nó
* DELETE: Huỷ bỏ hoặc xoá một tài nguyên
    
*Vậy kiểm thử API là:*
* Kiểm thử không cần giao diện (GUI).
* Lập trình mô phỏng dữ liệu và điều khiển theo kịch bản.
* Kiểm thử tập trung vào chức năng, không phụ thuộc vào hành vi hay kinh nghiệm của người dùng.

## Tại sao kiểm thử API lại quan trọng?

Kiểm thử API có những lợi thế đáng kể sau:

* Ngăn ngừa sớm những lỗi có thể xảy ra ở ứng dụng
Nếu một API có những lỗi không được phát hiện, nó có thể không chỉ phá huỷ một ứng dụng duy nhất mà có thể là cả một hệ thống.

Ở tầng giao diện ứng dụng thường sẽ chặn những dữ liệu không hợp lệ, cho nên khi gửi đến server dữ liệu nhận được thường đã hợp lệ. Tuy nhiên, nếu dùng thủ thuật một số dữ liệu không hợp lệ vẫn có thể vượt qua kiểm soát của giao diện, đến khi lưu vào database sẽ làm sai những ràng buộc, có thể gây nên những lỗi nghiêm trọng cho hệ thống. Vì vậy kiểm thử API giúp kiểm tra lại một lần nữa, sàng lọc lại những dữ liệu không hợp lệ bị lọt lưới từ tầng giao diện.

* Kiểm thử API đang trở thành loại kiểm thử rất phổ biến so với các kiểm thử khác. 

* Tiết kiệm thời gian
Với kiểm thử API chúng ta có thể thực hiện song song để giảm thời gian kiểm thử. Do đó có thể tiết kiệm lên đến 5 lần so với các loại kiểm thử khác.

* Ngôn ngữ độc lập
Dữ liệu được trao đổi thông qua XML hoặc JSON và mọi ngôn ngữ đều có thể sử dụng. Ví dụ, khi nhận được một respone ở định dạng JSON thì bạn có thể dễ dàng phân tích dữ liệu với Java, Objective-C, C# hoặc bất kỳ ngôn ngữ nào.

* Dễ dàng tích hợp
## Lập kế hoạch kiểm thử: Kiểm thử API cần những gì?

Trước khi bắt tay vào kiểm thử API, bạn nên suy nghĩ về những gì sẽ được test và thực hiện nó như thế nào.
Tùy thuộc vào yêu cầu, bạn có thể cần tạo tài liệu kỹ thuật hoặc tài liệu thiết kế, và nó nên được review bởi các đồng nghiệp của mình. Tài liệu này sẽ sử dụng trong suốt quá trình kiểm thử cũng như nâng cấp của bạn.

Thiết lập một môi trường kiểm thử: cấu hình databasse và server cho các yêu cầu của ứng dụng, đáp ứng các thông số cần thiết của API.
Sau khi thiết lập xong môi trường kiểm thử, các API cần được gọi để đảm bảo API được hoạt động trước khi thực hiện những kiểm thử chi tiết hơn.

Bạn cần phải sắp xếp thời gian cho các kiểm thử API cần có. Bắt đầu bằng cách tự hỏi những câu hỏi sau:

* Đối tượng mục tiêu của bạn là ai? người sử dụng API là ai?
* Các API thường sử dụng môi trường gì?
* Bạn đang kiểm thử ở khía cạnh nào?
* Kiểm thử cho vấn đề gì?
* Ưu tiên kiểm tra cho cái nào?
* Những gì sẽ xảy ra trong trường hợp bình thường?
* Những khả năng nào có thể xảy ra trong trường hợp bất thường?
* Những gì được định nghĩa là Pass/ Fail? dữ liệu đầu ra mong muốn dữ liệu là gì? chuỗi hành động là gì?
* API có thể tương tác với API nào khác không?
* Ai trong team sẽ phụ trách thử nghiệm này?
Sau khi đã xác định ranh giới giữa kiểm thử và yêu cầu, bạn cần phải quyết định kiểm thử của mình cần dùng loại nào là phù hợp. Dưới đây là một trong những loại kiểm thử phổ biến được dùng để kiểm thử API:

* Functionality testing - Kiểm tra các API có thực hiện đúng chức năng của nó hay không.
* Usability testing - Kiểm tra API có dễ dàng để làm việc không.
* Reliability testing - Kiểm tra khi API được liên tục gọi đến và vẫn trả ra một kết quả như trước không.
* Load testing - Kiểm tra API có thể xử lý một lượng lớn các cuộc gọi hay không.
* Creativity testing - Kiểm tra xem API có thể sử dụng theo nhiều cách khác nhau không.
* Security testing - Kiểm tra API có đạt yêu cầu bảo mật, bao gồm: xác thực, cấp phép và kiểm soát truy cập hay không.
* Proficiency testing - Kiểm tra API có làm tăng những gì nhà phát triển có thể làm được không.
* API documentation testing - Kiểm tra các tài liệu API có đảm bảo đầy đủ, chi tiết và dễ dàng để dử sụng API không.
Mỗi kiểm thử chắc chắn sẽ khác nhau nhưng đây là những ví dụ kiểm thử API phổ biến:

* Kiểm tra giá trị API trả về dựa trên điều kiện đầu vào.
* Xác minh xem có API nào không trả ra bất cứ điều gì hay trả ra kết quả sai không.
* Xác minh xem các API có gây nên một số sự kiện khác hoặc gọi API khác không.
* Xác minh xem liệu API có cập nhật bất kỳ cấu trúc dữ liệu nào không.
    
## Những lời khuyên khi kiểm thử API:

Sau khi đã lên kế hoạch kiểm thử API phù hợp cho dự án của bạn. Hãy bắt tay vào tiến hành với các quy tắc "ngón tay cái" sau:

* Thử nghiệm đầu tiên cho kết quả điển hình hoặc thông thường, đối với những gì xảy ra một cách nhất quán và những gì không.

* Thêm một loạt các kiểm tra để kiểm tra chịu tải của hệ thống.

* Kiểm tra trường hợp thất bại: liên tục gọi đến API đến khi bị Fail hoặc kết quả trả ra không nhất quán.

* Test case nên được nhóm lại theo các loại kiểm thử (straight-line cases, boundary cases, null inputs, ...). Điều này sẽ làm người sau dễ đọc và dễ bảo trì hơn khi làm việc với một test case cụ thể nào đó.

* Với mỗi test case, cần phải khai báo các API được gọi.

* Các tham số lựa chọn nên được đề cập một cách rõ ràng trong test case.

* Các API nên được đặt độ ưu tiên để dễ dàng test hơn.

* Nên hạn chế các test case có nhiều biến, mỗi test case càng khép kín và cô lập phụ thuộc càng tốt. Nghĩa là test case càng đơn giản càng tốt.

* Tránh các thử nghiệm xâu chuỗi (test chainning) trong quá trình phát triển. Các thử nghiệm (n+1) sẽ dựa trên các thử nghiệm trước đó, việc này là thiếu chặt chẽ và sẽ làm tăng chi phí bảo trì.

* Thứ tự thực hiện test case cần phù hợp với plan cũng như yêu cầu. Thông thường, kế hoạch kiểm thử dễ bị bỏ quên sau khi tạo. Bằng cách giữ trật tự giống nhau giữa plan và các case lập ra ta dễ đồng bộ qua lại giữa chúng và thực hiện tốt cả hai cho đến cùng.

* Hãy cẩn thận khi thực hiện các chức năng gọi một lần như Delete, Closewindow(), CloseHandle(),...

* Có thể tự động tạo tài liệu API với một tiêu chuẩn như Swagger, nhưng sau đó chạy lại các kiểm thử để đảm bảo các tài liệu dễ hiểu cho bất kỳ người dùng nào.

* Các mã kiểm thử nên được review và phản hồi từ chính đồng nghiệp của bạn, vì có thể trong chính tài liệu kiểm thử cũng có thể gặp lỗi, đơn giản có thể chỉ là một lỗi copy-paste cho những trường hợp tương tự nhau.

* Ném bất cứ điều gì bạn có thể vào các API để kiểm tra nó xử lý các vấn đề không lường trước được và chịu tải như thế nào.

* Thêm sáng tạo cho test case, để đảm bảo bao quát toàn bộ kiểm thử, cần tạo test case cho tất cả các tổ hợp đầu vào có thể có của API.

* Tự động hóa bất cứ điều gì bạn có thể.

* Cuối cùng, hãy tin vào bản năng của bạn nếu có điều gì đó không đúng!

## Công cụ kiểm thử API?

API có thể được kiểm thử với rất nhiều công cụ hỗ trợ như:

* Advanced Rest Client
* Postman
* Curl trong Linux
* SOAPUI
    
Để cụ thể hơn mình sẽ giới thiệu về công cụ test API - Postman trong bài viết sau