## API Testing là gì?
Ở cấp độ cơ bản nhất, API testing nhằm mục đích phát hiện lỗi: mâu thuẫn hoặc sai lệch so với kết quả mong đợi. Kiểm tra liên tục cũng rất quan trọng để đảm bảo việc có tiếp tục hoạt động không khi có nhiều người truy cập. Độ rủi ro khi đưa một sản phẩm xấu ,không có khả năng an toàn trên thị trường sẽ lớn hơn chi phí để kiểm tra nó.

API testing là một trong những phần khó khăn nhất của chuỗi phần mềm và kiểm tra QA vì nó hoạt động để đảm bảo rằng các hoạt động kỹ thuật số chạy một cách liền mạch và hiệu quả.

Trong khi các nhà phát triển có xu hướng chỉ kiểm tra các chức năng họ đang làm thì người kiểm thử lại chịu trách nhiệm kiểm tra cả hai chức năng riêng lẻ và chuỗi hoặc chức năng, khám phá cách chúng hoạt động cùng nhau từ đầu đến cuối.

API là những gì mang lại giá trị cho một ứng dụng. Đó là điều làm cho điện thoại của chúng ta “thông minh” hơn và là tiến trình hiện đại hóa. Nếu một API không hoạt động hiệu quả ,API đó sẽ không bao giờ được chấp nhận, bất kể nó có miễn phí hay không. Ngoài ra, nếu API bị hỏng do lỗi không được phát hiện, thì mối đe dọa không chỉ phá vỡ một ứng dụng duy nhất, mà còn là một chuỗi toàn bộ quy trình nghiệp vụ bản lề.

Dưới đây là một số lý do phổ biến nhất để tiến hành kiểm tra API:

1. Chắc chắn rằng nó làm những gì nó phải làm
2. Chắc chắn rằng nó có thể xử lý tải
3. Tìm tất cả cách thức người dùng có thể gây rối mọi thứ
4. Đảm bảo API của bạn hoạt động trên các thiết bị, trình duyệt và hệ điều hành
5. Đưa nỗ lực nhiều hơn vào thử nghiệm API sẽ cho ra một sản phẩm 'khỏe mạnh' hơn nhiều. 
6. Việc đảm bảo tất cả các quy tắc nghiệp vụ bắt buộc đang được thực thi ở cấp API cho phép thời gian nhiều hơn cho việc hoàn thành kiểm thử UX( kiểm thử các vấn đề cảm nhận, suy nghĩ của Người dùng liên quan đến việc sử dụng chức năng của ứng dụng / function đang được test.) sau khi UI (giao diện người dùng) được phát hành mà không phải tập trung vào việc kiểm tra mọi quy tắc nghiệp vụ và đường dẫn thông qua ứng dụng gần cuối dự án. 
8. Việc đảm bảo API cung cấp chức năng hoàn chỉnh cho phép dễ dàng mở rộng ứng dụng trong tương lai khi nhu cầu nghiệp vụ mới phát sinh.

## Bạn cần gì để bắt đầu API Testing
Phần đầu tiên của API testing liên quan đến việc cài đặt môi trường kiểm thử cùng với 1 bộ các thông số cần thiết xung quanh API. Điều này liên quan đến việc cấu hình cơ sở dữ liệu và máy chủ cho các yêu cầu của ứng dụng.

Khi bạn đã thiết lập môi trường kiểm thử API của mình, hãy thực hiện API call ngay lập tức để đảm bảo không có gì bị lỗi trước khi tiếp tục bắt đầu thử nghiệm kỹ lưỡng hơn.

Bạn có thể bắt đầu kết hợp dữ liệu ứng dụng của mình với các kiểm tra API để đảm bảo rằng API hoạt động như mong đợi đối với các cấu hình đầu vào có thể biết.

Tiếp theo, bạn cần phải tự tổ chức xung quanh bài kiểm tra API. Bắt đầu bằng cách tự hỏi mình những câu hỏi sau:

• Đối tượng mục tiêu của bạn là ai? Người tiêu dùng API của bạn là ai?

• API nên được sử dụng trong môi trường nào?

• Bạn đang kiểm tra những khía cạnh nào?

• Bạn đang thử nghiệm những vấn đề gì?

• Các ưu tiên của bạn khi kiểm tra là gì?

• Điều gì được cho là sẽ xảy ra trong hoàn cảnh bình thường?

• Điều gì có thể xảy ra trong những hoàn cảnh bất thường?

• Điều gì được định nghĩa là Pass hoặc Fail? Dữ liệu nào là đầu ra mong muốn? Chuỗi sự kiện là gì?

•API tương tác với API nào khác?

• Ai trong nhóm của bạn chịu trách nhiệm kiểm tra cái gì?

Sau khi đã tạo các yêu cầu và ranh giới kiểm thử này, bạn cần phải quyết định bạn muốn kiểm tra API của mình cho cái gì.

## Các kiểu API Testing bạn có thể làm?

• Functionality testing (Kiểm tra chức năng) - API hoạt động và thực hiện chính xác những gì nó phải làm

• Reliability testing (Kiểm tra độ tin cậy) - API có thể được kết nối liên tục và dẫn đến kết quả nhất quán

• Load testing (Tải thử nghiệm) - API có thể xử lý một số lượng lớn các cuộc gọi

• Creativity testing (Thử nghiệm sáng tạo) - API có thể xử lý được sử dụng theo nhiều cách khác nhau

.• Security testing (Kiểm tra bảo mật) - API đã xác định các yêu cầu bảo mật bao gồm xác thực, quyền và kiểm soát truy cập. Xem một số mẹo bảo mật API để bảo vệ dữ liệu quan trọng

• Proficiency testing (Kiểm tra thành thạo) - API làm tăng những gì các nhà phát triển có thể làm

• API documentation testing (Kiểm tra tài liệu API) - còn được gọi là kiểm tra khám phá, tài liệu API dễ dàng hướng dẫn người dùng

• Negative Testing (Kiểm tra tiêu cực) - kiểm tra mọi loại đầu vào sai mà người dùng có thể cung cấp

![](https://images.viblo.asia/d622a21e-2c5b-4745-afb1-252cffc72e94.png)

Các loại kiểm thử bạn chạy sẽ thay đổi, nhưng đây là những ví dụ kiểm tra API phổ biến, như bạn có thể thấy, chúng rất giống với các lý do tại sao bạn muốn kiểm tra API:

• Kiểm tra các giá trị trả lại API dựa trên điều kiện đầu vào

• Xác nhận xem API không trả lại bất kỳ điều gì hoặc kết quả sai

• Xác nhận xem API có kích hoạt một số sự kiện khác hoặc gọi một API khác không

• Xác nhận xem API có đang cập nhật cấu trúc dữ liệu nào không.

## Manual Testing vs. Automated Testing
Sự khác biệt giữa kiểm thử tự động so với kiểm thử thủ công là gì?

Kiểm thử tự động yêu cầu bạn sử dụng công cụ kiểm tra, như SoapUI, trong khi kiểm thử thủ công bao gồm viết mã của riêng bạn để kiểm tra API.

API testing là một trong những lĩnh vực mà kiểm thử tự động được đánh giá cao, đặc biệt là trong thế giới của DevOps, phát triển nhanh và chu kỳ phân phối liên tục.

***Bạn nên sử dụng kiểm thử thủ công khi thực hiện các kiểm thử sau:***

• Exploratory testing (Kiểm thử thăm dò)

• Usability testing (Kiểm thử khả năng sử dụng)

• Ad-hoc testing (Ad-hoc thử nghiệm)

***Bạn nên sử dụng thử nghiệm tự động cho những cái sau:***

• API functional testing (Kiểm tra chức năng API)

• Dynamic testing (Kiểm tra động)

Repeated test design (Thiết kế thử nghiệm lặp đi lặp lại)

• Phân tích phạm vi kiểm tra chức năng của bạn để biết bạn đang bỏ lỡ những gì

• Performance testing (Kiểm tra hiệu năng)

• Kiểm tra các giao thức trong một khung duy nhất, thống nhất

• Data driven testin (Kiểm tra định hướng dữ liệu)

• Load testing (Kiểm tra tải)

• Error testing (Kiểm tra lỗi)

• Thử nghiệm bằng nhiều ngôn ngữ

• Regression testing (Kiểm tra hồi quy)

Tất nhiên, kiểm thử API tự động có thể được thực hiện trong nhiều trường hợp hơn , quan trọng nhất là khi bạn được ép thời gian. Kiểm thử API tự động thậm chí cho phép bạn thử nghiệm song song với sự phát triển. Kiểm tra khả năng sử dụng API sẽ tiếp tục ưu tiên kiểm tra thủ công, đảm bảo tạo trải nghiệm tốt hơn, đơn giản hơn.Nếu bạn đang tìm kiếm trải nghiệm kiểm thử thủ công nhanh chóng và dễ dàng, hãy thử công cụ mới từ bạn bè của chúng tôi tại Swagger, Swagger Inspector. Đó là một công cụ kiểm tra siêu dễ sử dụng mà bạn có thể sử dụng ngay trong trình duyệt của mình.

## API Testing Tools
Có 3 loại API test-tool phổ biến rộng rãi nhất là : ***Postman, Curl và SoapUI.***

Postman là một công cụ mạnh mẽ được sử dụng để kiểm tra các dịch vụ web. Nó được phát triển để gửi các yêu cầu HTTP một cách đơn giản và nhanh chóng.

Curl là một công cụ command-line được sử dụng để phân phối các yêu cầu qua giao thức HTTP, HTTPS, FTP, FTPS, SCP, SFTP, TFTP, LDAP, DAP, DICT, TELNET, FILE, IMAP, POP3, SMTP và RTSP.

SoapUI là một công cụ miễn phí được sử dụng để kiểm tra SOAP và RESTful Web Services.

Bây giờ, tất nhiên chúng ta có thể tìm hiểu về tất cả các công cụ này tuy nhiên sẽ mất khá nhiều thời gian để đọc. Vì vậy, tôi quyết định chỉ nói với bạn về Postman thôi  vì công cụ này thực sự rất mạnh.

### Download và cài đặt Postman

Postman có thể sử dụng trên các hệ điều hành Mac, Windows và Linux.

Để cài đặt Postman, bạn hãy truy cập trang https://www.getpostman.com/apps . và cick vào Download cho Mac/Windows/ Linux tùy thuộc vào nền hệ thống của bạn.

![](https://images.viblo.asia/f64d09a7-e5f9-42e6-86c3-a87c5e9af15c.png)

**Cài đặt cho macOS**
Sau khi bạn tải app về, bạn có thể kéo file đó vào forder ‘Applications’. Double-click  vào Postman để mở ứng dụng.

**Cài đặt cho Windows**

•	Tải file setup

•	Chạy installer

**Cài đặt cho Linux**

•	Việc cài đặt trên Linux có thể khác nhau giữa các distributions. Hãy xem hướng dẫn cài đặt tại Postman app on Ubuntu 16.04.

### Gửi request đầu tiên
Một API request cho phép bạn liên hệ máy chủ có các điểm cuối API mà bạn muốn tiếp cận và thực hiện một số hành động. Những hành động đó là các phương thức HTTP.

Các phương thức phổ biến nhất là GET, POST, PUT và DELETE. Tên của các phương thức đã tự giải thích cho mình rồi. 
- ***GET***  cho phép bạn truy xuất dữ liệu từ máy chủ.
-  ***POST***  cho phép bạn thêm dữ liệu vào một tệp hoặc tài nguyên hiện có trong một máy chủ. 
- ***PUT***  cho phép bạn thay thế một tệp hoặc tài nguyên hiện có trong một máy chủ. 
- Và ***DELETE***  cho phép bạn xóa dữ liệu khỏi máy chủ.
Postman làm cho việc gửi yêu cầu API trở nên đơn giản.

Thay vì kiểm tra các API của bạn thông qua một dòng lệnh hoặc thiết bị đầu cuối, chúng ta cung cấp một giao diện đồ họa trực quan, nhanh chóng tìm hiểu và bổ ích để làm chủ nó.

Như bạn có thể thấy trong hình dưới đây, khi bạn nhập một yêu cầu trong Postman và nhấn nút Send, máy chủ sẽ nhận được yêu cầu của bạn và trả về một phản hồi mà Postman hiển thị trong giao diện.

![](https://images.viblo.asia/e61646a7-01fb-403b-b7fa-21f125981308.png)

***Gửi 1 request***

Ta hãy cùng thử với phương thức GET nhé.
Hãy làm theo step bên dưới nhé.

1.	Mở ứng dụng Post man
2.	Chọn phương thức GET , url = http://jsonplaceholder.typicode.com/users
3.	Click vào button Send.
Sau khi gửi yêu cầu lên Server, giá trị được trả về sẽ là danh sách các user hiển thị ở phần Response, Status: OK. Xem hình bên dưới:

![](https://images.viblo.asia/8ab5d9cb-ef70-4d46-949a-4f4067215f89.png)

Để lấy thông tin của 1 user ví dụ user có id = 1, bạn chỉ cần nhập url = http://jsonplaceholder.typicode.com/users/1 , nhấn Send. Kết quả trả về sẽ như sau:

![](https://images.viblo.asia/0ad37df9-be94-40a4-991e-4052f5ae1aa7.png)

Tiếp theo là phương thức POST cơ bản. Bạn làm theo các bước bên dưới nhé.

1.	Mở ứng dụng Post man
2.	Chọn phương thức POST , nhập url = http://jsonplaceholder.typicode.com/posts
3.	Click vào tab Body rồi truyền Key và value nhé. Ví dụ mình truyền các cặp (key,value) như sau: (username, Ha), (userId, 14), (title, This is my title), (body, This is my body of the post)
4.	Click vào button Send
Sau khi gửi yêu cầu lên Server ta được trả về Status : 201 Created. Lúc này 1 user mới đã được add thành công. Xem kết quả trả về như bên dưới:

![](https://images.viblo.asia/06045f29-a019-4574-abb1-e5517f47fdef.png)

Trên đây là 2 ví dụ về phương thức cơ bản GET và POST trong API testing với Post man. Khá thú vị phải không nào? Hi vọng các bạn dành thời gian tìm hiểu thêm về các phương thức của công cụ khá mạnh này nhé.

Nguồn:
https://www.soapui.org/resources/api-testing/article/api-testing-101.html
https://www.getpostman.com/docs/v6/postman/launching_postman/sending_the_first_request