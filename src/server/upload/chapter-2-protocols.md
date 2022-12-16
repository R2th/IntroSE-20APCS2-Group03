Ở [chapter 1](https://viblo.asia/p/chapter-1-gioi-thieu-ve-apis-m68Z0RmA5kG) chúng ta đã cùng tìm hiểu về sự liên quan của 2 mặt của API, client và server. Để các bạn nắm bắt được chắc chắn hơn cách thức chúng giao tiếp với nhau, chúng ta sẽ nhìn sâu hơn vào cách client và server tương tác với nhau trong nội dung bài viết này. Trước tiên chúng ta nhìn vào mô hình giao tiếp của con người và so sánh nó với máy tính. Sau đó, chúng ta sẽ chuyển sang các chi tiết cụ thể của một giao thức phổ biến được sử dụng trong API.

## Hiểu về các quy tắc

Mọi người tạo ra quy tắc xã hội để hướng dẫn các tương tác của họ. Một ví dụ là cách chúng ta nói chuyện với nhau trên điện thoại. Hãy tưởng tượng bạn đang trò chuyện với một người bạn. Trong khi họ đang nói, bạn biết mình cần giữ im lặng. Nếu họ hỏi bạn một câu hỏi và sau đó giữ im lặng, bạn biết họ đang mong chờ câu trả lời và giờ đến lượt bạn bắt đầu nói.

Máy tính cũng có quy tắc tương tự, và cách thức giao tiếp đó được gọi là protocol(giao thức). Giao thức máy tính là một bộ quy tắc được chấp nhận, chi phối cách hai máy tính có thể nói chuyện với nhau. Tuy nhiên, so với các tiêu chuẩn của chúng ta, giao thức máy tính cực kỳ cứng nhắc. Hãy suy nghĩ một lúc về hai câu "Màu yêu thích của tôi là màu xanh" và "Màu xanh là màu yêu thích của tôi". Mọi người có thể chia nhỏ từng câu và thấy rằng chúng có nghĩa giống nhau, mặc dù các từ theo thứ tự khác nhau. Thật không may, máy tính không thông minh như thế.

Để hai máy tính giao tiếp hiệu quả, máy chủ phải biết chính xác cách máy khách sẽ sắp xếp các tin nhắn của nó. Bạn có thể nghĩ về nó giống như một người yêu cầu biết địa chỉ email của bạn vậy. Khi bạn hỏi vị trí của một địa điểm nào đó, điều đầu tiên bạn được nói sẽ là số nhà, tên đường, quận, huyện, tiếp theo là thành phố và cuối cùng là mã zip. Bạn cũng có những kỳ vọng nhất định về từng phần của địa chỉ, giống như thực tế là mã zip chỉ nên bao gồm các số. Một mức độ rõ ràng tương tự là cần thiết để một giao thức máy tính hoạt động.

## Giao thức của Web

Có một giao thức cho tất cả mọi thứ, mỗi giao thức được thiết kế để làm các công việc khác nhau. Bạn có thể đã nghe nói về một số: Bluetooth để kết nối thiết bị và POP hoặc IMAP để tìm nạp email.

Trên web, giao thức phổ biến là Giao thức truyền siêu văn bản (Hyper-Text Transfer Protocol), được biết đến nhiều hơn bởi từ viết tắt HTTP. Khi bạn nhập một địa chỉ như http://example.com vào trình duyệt web, "http" sẽ cho trình duyệt sử dụng các quy tắc HTTP khi nói chuyện với máy chủ.

Với sự phổ biến của HTTP trên web, nhiều công ty chọn áp dụng nó làm giao thức làm nền tảng cho API của họ. Một lợi ích của việc sử dụng một giao thức quen thuộc là nó làm giảm quá trình học tập cho các nhà phát triển, điều này khuyến khích việc sử dụng API. Một lợi ích khác là HTTP có một số tính năng hữu ích trong việc xây dựng API tốt, chúng ta sẽ thấy ở phần tiếp theo. Ngay bây giờ, chúng ta hãy cùng xem cách HTTP hoạt động!

## Http Request

Giao tiếp trong HTTP thường tập trung vào một khái niệm gọi là Request-Response Cycle. Máy khách gửi cho máy chủ một yêu cầu để làm một cái gì đó. Đến lượt mình, máy chủ sẽ gửi cho máy khách một phản hồi cho biết liệu máy chủ có thể làm những gì máy khách yêu cầu hay không.

![Request-Response Cycle.](https://images.viblo.asia/dafb406f-e3cf-4c2d-827c-2a75e1406b89.jpeg)

Để thực hiện một yêu cầu hợp lệ, máy khách cần bao gồm bốn điều:
1. URL (Uniform Resource Locator)
2. Method
3. List of Headers
4. Body

Điều này nghe có vẻ giống như rất nhiều chi tiết cần nhập chỉ để gửi một email, nhưng hãy nhớ rằng, đối với máy tính sẽ phải cung cấp thông tin rất cụ thể để liên lạc với nhau.

## URL

URL rất quen thuộc với chúng ta thông qua việc sử dụng web hàng ngày, nhưng bạn đã bao giờ dành một chút thời gian để xem xét cấu trúc của chúng chưa? Trong HTTP, URL là một địa chỉ duy nhất cho một vật (danh từ). Những thứ nhận được địa chỉ hoàn toàn phụ thuộc vào doanh nghiệp chạy máy chủ. Họ có thể tạo URL cho các trang web, hình ảnh hoặc thậm chí video của các động vật dễ thương.

API mở rộng ý tưởng này thêm một chút, có thể bao gồm các danh từ như khách hàng, sản phẩm và tweet. Như vậy, URL trở thành một cách dễ dàng để máy khách có thế giao tiếp với máy chủ về thứ mà nó muốn tương tác. Tất nhiên, các API cũng không gọi chúng là "thứ", mà đặt cho chúng tên kỹ thuật là "resources" (tài nguyên).

## Method

Phương thức yêu cầu cho máy chủ biết loại hành động nào mà máy khách muốn máy chủ thực hiện. Trong thực tế, phương thức này thường được gọi là "động từ".

Bốn phương thức phổ biến nhất trong API là:

*  GET: Yêu cầu máy chủ truy xuất tài nguyên
*  POST: Yêu cầu máy chủ tạo tài nguyên mới
*  PUT: Yêu cầu máy chủ chỉnh sửa / cập nhật tài nguyên hiện có
*  DELETE: Yêu cầu máy chủ xóa tài nguyên

![](https://cdn.zapier.com/storage/photos/935a8b3ca25e078bed0bc11488a2ef8c.png)

Đây là một ví dụ để giúp minh họa các phương pháp này. Giả sử có một cửa hàng pizza với API bạn có thể sử dụng để đặt hàng. Bạn đặt hàng bằng cách gửi yêu cầu POST đến máy chủ của nhà hàng với chi tiết đơn hàng của bạn, yêu cầu họ tạo pizza của bạn. Tuy nhiên, ngay sau khi bạn gửi yêu cầu, bạn nhận ra rằng bạn đã chọn lớp vỏ kiểu sai, vì vậy bạn thực hiện yêu cầu PUT để thay đổi yêu cầu.

Trong khi chờ đợi trên đơn đặt hàng của bạn, bạn tạo một loạt các yêu cầu GET để kiểm tra trạng thái. Sau một giờ chờ đợi, bạn quyết định không mất thời gian thêm nữa và thực hiện một yêu cầu DELETE để hủy đơn hàng của bạn.

## Headers

Headers cung cấp thông tin meta về một yêu cầu. Chúng là một danh sách đơn giản các mục như thời gian khách hàng gửi yêu cầu và kích thước phần thân của request.

Bạn đã bao giờ truy cập một trang web trên điện thoại thông minh được định dạng đặc biệt cho thiết bị di động chưa? Điều đó được thực hiện bởi một header của HTTP có tên là "User-Agent". Máy khách sử dụng tiêu đề này để cho máy chủ biết loại thiết bị bạn đang sử dụng và các trang web đủ thông minh để phát hiện nó có thể gửi cho bạn định dạng tốt nhất cho thiết bị của bạn.

Có khá nhiều tiêu đề HTTP mà khách hàng và máy chủ xử lý, vì vậy chúng ta sẽ chờ để nói về những cái khác cho đến khi chúng có liên quan trong các chương sau.

## Body

Phần thân yêu cầu chứa dữ liệu máy khách muốn gửi máy chủ. Tiếp tục ví dụ đặt hàng pizza của chúng tôi ở trên, phần thân là nơi chi tiết đặt hàng đi.

Một đặc điểm độc đáo về phần thân là máy khách có toàn quyền kiểm soát phần này của yêu cầu. Không giống như phương thức, URL hoặc tiêu đề, trong đó giao thức HTTP yêu cầu cấu trúc cứng nhắc, phần thân cho phép khách hàng gửi bất cứ thứ gì nó muốn.

Bốn phần - URL, method, headers, and body - tạo thành một yêu cầu HTTP hoàn chỉnh.

![The structure of an HTTP request.](https://images.zapier.com/storage/photos/4717d012f26dc6a4928e0d025102af7f.png?format=jpg)

## HTTP Responses

Sau khi máy chủ nhận được yêu cầu từ máy khách, nó sẽ cố gắng thực hiện yêu cầu và gửi lại phản hồi cho khách hàng. Phản hồi HTTP có cấu trúc rất giống với yêu cầu. Sự khác biệt chính là thay vì một phương thức và một URL, phản hồi bao gồm mã trạng thái. Ngoài ra, các tiêu đề và nội dung phản hồi tuân theo cùng định dạng như các yêu cầu.

### Status Codes

Mã trạng thái là các số có ba chữ số mà mỗi số có một ý nghĩa nhất định và duy nhất. Khi được sử dụng chính xác trong API, số nhỏ này có thể truyền đạt rất nhiều thông tin cho khách hàng. 

Ví dụ: bạn có thể đã thấy trang này trong thời gian trải nghiệm trên internet của mình:

![](https://images.zapier.com/storage/photos/8b38efb0fa87bbf81018ff532f929a8a.png?format=jpg)

Mã trạng thái đằng sau phản hồi này là 404, có nghĩa là "Không tìm thấy". Bất cứ khi nào khách hàng đưa ra yêu cầu về tài nguyên không tồn tại, máy chủ sẽ phản hồi với mã trạng thái 404 để cho khách hàng biết: "tài nguyên đó không tồn tại, vì vậy vui lòng không yêu cầu lại!"

Có một loạt các trạng thái khác trong giao thức HTTP, bao gồm 200 ("thành công! Yêu cầu đó là tốt") đến 503 ("trang web / API của chúng tôi hiện đang ngừng hoạt động."). Chúng ta sẽ tìm hiểu thêm một vài mã khác khi chúng trong các chương sau.

Sau khi phản hồi được gửi đến máy khách, chu trình yêu cầu-phản hồi được hoàn thành và vòng giao tiếp đó kết thúc. Bây giờ, khách hàng có thể bắt đầu bất kỳ tương tác gì. Máy chủ sẽ không gửi cho khách hàng bất kỳ dữ liệu nào nữa cho đến khi nhận được yêu cầu mới.

![](https://images.zapier.com/storage/photos/df8b6d09ab35aac47c1fb7b020a42d61.png?format=jpg)

## Xây dựng APIs dựa trên HTTP bằng cách nào

Đến bây giờ, bạn có thể thấy rằng HTTP hỗ trợ một loạt các cách thức để giúp máy khách và máy chủ nói chuyện với nhau. Vậy, điều đó giúp ích gì cho chúng ta khi làm việc với API? Tính linh hoạt của HTTP có nghĩa là các API được xây dựng trên nó có thể cung cấp cho khách hàng rất nhiều tiềm năng ứng dụng. Chúng ta thấy tiềm năng đó trong ví dụ đặt hàng pizza ở trên. Một điều chỉnh đơn giản cho phương thức là sự khác biệt giữa việc yêu cầu máy chủ tạo đơn hàng mới hoặc hủy đơn hàng hiện có. Thật dễ dàng để biến kết quả kinh doanh mong muốn thành một hướng dẫn mà máy chủ có thể hiểu được. Cực kỳ mạnh mẽ!

Tính linh hoạt này trong giao thức HTTP cũng mở rộng sang các phần khác của yêu cầu. Một số API yêu cầu một tiêu đề cụ thể, trong khi các API khác yêu cầu thông tin cụ thể bên trong phần thân của yêu cầu. Có thể sử dụng các mẫu có sẵn của API để biết cách thực hiện yêu cầu HTTP chính xác để có được kết quả bạn muốn.

## Tóm tắt Chapter 2 

Mục tiêu của chương này là cung cấp cho bạn sự hiểu biết cơ bản về HTTP. Khái niệm chính là Chu trình yêu cầu - phản hồi, chúng tôi đã chia thành các phần sau:
* Yêu cầu - bao gồm một URL (http: //...), một phương thức (GET, POST, PUT, DELETE...), danh sách các tiêu đề (User-Agent...) và phần thân (dữ liệu).
* Phản hồi - bao gồm mã trạng thái (200, 404..), danh sách các tiêu đề và phần thân.

Trong suốt phần còn lại của bài viết, chúng tôi sẽ xem xét lại các nguyên tắc cơ bản này khi chúng tôi khám phá cách các API dựa vào chúng để cung cấp sức mạnh và tính linh hoạt.

## Tiếp theo
Trong chương tiếp theo, chúng ta khám phá loại dữ liệu nào được API chuyển qua lại giữa máy khách và máy chủ.

Go to [Chapter 3!](https://viblo.asia/p/chapter-3-dinh-dang-du-lieu-RQqKLE8MZ7z) 

## Tài liệu tham khảo
https://zapier.com/learn/apis/chapter-2-protocols/