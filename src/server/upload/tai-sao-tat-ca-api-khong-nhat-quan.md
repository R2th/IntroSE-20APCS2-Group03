Có một bí ẩn đặc biệt trong việc thiết kế API cho các ứng dụng web, điều này được biết đến với bất kỳ chuyên gia API nào, tuy nhiên, không phải ai cũng nhận ra các thông số kỹ thuật của chúng tôi chưa hoàn thiện đến mức nào.

Về cơ bản, LÀM THẾ NÀO ĐỂ XỬ LÝ VI PHẠM LOGIC DOANH NGHIỆP?

Để giải thích nó, tôi cần nói một chút về [HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

## HTTP Status codes

Nếu bạn đã từng làm việc với bất kỳ API nào, bạn đã quen với thực tế là khi bạn gửi một yêu cầu đến máy chủ, nó có thể phản hồi với các phản hồi khác nhau.

Ví dụ, nếu tôi muốn lấy một bài báo, máy chủ có thể phản hồi bằng mã trạng thái 200, bao gồm cả nội dung bài viết.

![image.png](https://images.viblo.asia/a863a312-092e-4623-a343-e4d32523ceac.png)

Tuy nhiên, nếu tài nguyên được yêu cầu không tồn tại, máy chủ có thể sẽ trả về phản hồi lỗi, với mã trạng thái 404 chỉ ra thực tế là không thể tìm thấy bài viết. 

![image.png](https://images.viblo.asia/ac607e29-9713-4556-ae6e-f800e1fbf743.png)

Có rất nhiều [mã HTTP được xác định](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) cho các loại phản hồi khác nhau:

*      phản hồi thành công bắt đầu từ 2xx,
*      các phản hồi lỗi liên quan đến các thông báo chuyển hướng bắt đầu từ 3xx.
*      Mã trạng thái 4xx xác định sự cố với đầu vào do người dùng xác định, như thiếu thông số,
*      Mã trạng thái 5xx có liên quan đến các sự cố với máy chủ, chẳng hạn như dịch vụ không hoạt động hoặc lỗi nội bộ xuất hiện.

Có một số câu trả lời thường được sử dụng, như 201 hoặc 404, nhưng cũng có một số mã quý hiếm, có thể bạn chưa từng thấy vì đặc điểm kỹ thuật không rõ ràng, chúng có thể hữu ích trong tình huống nào.

Một ví dụ là mã trạng thái 300, mã này xác định rằng đối với một yêu cầu nhất định, máy chủ có thể đưa ra các phản hồi khác nhau và bạn nên chính xác hơn. Tuy nhiên, không có hướng dẫn chính thức nào về những trường hợp cụ thể nào nên áp dụng nó hoặc cách chỉ định đường dẫn yêu cầu nên cái này hiếm khi được sử dụng.

## Mảnh ghép còn thiếu

Tuy nhiên, ngay cả khi có rất nhiều mã trạng thái được xác định, vẫn có một số vấn đề chung nhất định, không có mã nào trong số chúng thực sự áp dụng.

Và ý tôi là, một sự vi phạm quy tắc kinh doanh.

Ví dụ điển hình sẽ là khi bạn muốn xuất bản một bài báo.

Giả sử bạn có một bài báo và bạn xuất bản nó. Nếu mọi thứ diễn ra tốt đẹp, bạn sẽ nhận được phản hồi thành công từ máy chủ. Tuy nhiên, nếu bạn cố gắng xuất bản lại bài viết, thì không rõ máy chủ sẽ phản hồi như thế nào!

### Forbidden (403).

Một cách để tiếp cận vấn đề này là trả về một lỗi bị cấm, cho biết rằng người dùng không thể thực hiện hành động này. Tuy nhiên, nó không có gì liên quan đến quyền của người dùng. Ngay cả quản trị viên cấp cao cũng không thể xuất bản bài báo đã được xuất bản, bởi vì các quy tắc kinh doanh không cho phép điều đó xảy ra!

### Thế thì dùng Method not allowed? (405)

Ứng cử viên khác có thể là mã trạng thái HTTP 405 đề cập đến lỗi phương thức không hợp lệ. Tuy nhiên, điều này đề cập đến phương thức HTTP, không chỉ là hành động không được chấp nhận tại thời điểm nhất định.

Một lần nữa, nó chỉ ra vấn đề với định dạng của yêu cầu. Nó có thể hữu ích, nếu bạn muốn máy chủ của mình chỉ xử lý các yêu cầu PATCH và không bao giờ chấp nhận các yêu cầu PUT, nhưng nó không phù hợp trong trường hợp cụ thể này.

Vì vậy, các lựa chọn khác là gì?

### I'm a teapot (418)

Có một, một giải pháp đặc biệt thú vị mà tôi rất muốn triển khai trong một ứng dụng thực, mặc dù giải pháp này cũng được thiết kế cho một trường hợp sử dụng khác. Đó là mã trạng thái 418 của ấm trà.

![image.png](https://images.viblo.asia/43138a54-f65a-4bed-aa8c-fa923576ea61.png)

Mã trạng thái ấm trà đã được phát minh như một trò đùa của ngày Cá tháng Tư vào năm 1998 và như bạn có thể tưởng tượng, nó không thường được sử dụng do thực tế đó. Rất tiếc, tôi cũng sẽ không sử dụng nó, ngoại trừ có thể là các dự án cá nhân của tôi, khi tôi chỉ muốn vui vẻ và mang lại nụ cười cho những người dùng thực sự sử dụng API của tôi.

Tuy nhiên, các ứng dụng đôi khi NÊN sử dụng nó, chủ yếu là để ngăn các truy vấn tự động, loại bỏ dữ liệu hoặc tạo nhiều tài nguyên ngẫu nhiên.

Vấn đề là, máy chủ đó từ chối làm điều gì đó vì một lý do mà máy chủ đã biết - không phải vì đầu vào của người dùng bị hỏng hoặc không hợp lệ.

Khi bạn muốn pha cà phê, sử dụng ấm trà, bạn có thể trả về 418, vì `POST /teapot/:id/brew?drink_type=coffee` có thể bị máy chủ từ chối, vì trong danh sách đồ uống được phép pha, xem ấm trà là chỉ trà.

Đây là quy tắc kinh doanh được xác định trên máy chủ.

Khi bạn muốn xuất bản một bài báo đã được xuất bản, nó cũng xảy ra tình huống tương tự. Máy chủ có các quy tắc kinh doanh nội bộ được xác định ngăn bạn thay đổi trạng thái của nó. Khi đó, bạn có thể nghĩ rằng mã trạng thái 418 là ứng cử viên phù hợp nhất cho trường hợp sử dụng này!

Tuy nhiên, còn một cái nữa, tôi nghĩ còn hay hơn.

### 409 - conflict

409, đứng về một cuộc xung đột. Nó nói rằng yêu cầu không thể được hoàn thành do xung đột về trạng thái của tài nguyên được yêu cầu.

Nó có chính xác trường hợp này không?

Mã này chỉ được phép trong các tình huống mà người dùng có thể giải quyết xung đột và gửi lại yêu cầu.

Trong tình huống được mô tả, người dùng không thể gửi lại yêu cầu. Bài báo được xuất bản, nó không có gì với phần thân yêu cầu có thể được sửa chữa.

Sau đó, điều chỉnh email trong biểu mẫu có thể làm cho yêu cầu thành công.

Mặc dù nó không phải là trường hợp trong ví dụ này, trong thế giới lý tưởng, tôi vẫn sẽ sử dụng cái này cho hầu hết các vi phạm kinh doanh.

Tuy nhiên, điều gì sẽ xảy ra nếu hành động không thể được thực hiện do tài nguyên KHÁC xung đột với nó?

Ví dụ: điều gì sẽ xảy ra nếu bạn muốn đăng ký người dùng nhưng EMAIL hoặc ID giao diện người dùng đã được sử dụng bởi NGƯỜI KHÁC đã đăng ký trong hệ thống.

Hoặc bạn muốn đặt bài viết là cao cấp, nhưng BLOG đã có một kế hoạch cơ bản?

### Invalid (422) or just BAD (400)

Sau đó, chúng ta có thể nói rằng yêu cầu không hợp lệ (422) hoặc không hợp lệ (400), nhưng nếu bạn nghĩ về nó, nó không phải vậy! Mọi thứ đều ổn với bản thân yêu cầu, chỉ là trong thời điểm cụ thể này, APPLICATION từ chối xử lý do điều kiện kinh doanh!

Tuy nhiên, như một trong những người dùng Reddit (BigLoveForNoodles) [đã chỉ ra trong chủ đề thảo luận của bài viết này](https://www.reddit.com/r/rails/comments/pq850g/why_all_apis_are_inconsistent/hdc1wqp), 422 thực sự là một ứng cử viên tuyệt vời trong hầu hết các vấn đề như vậy.

Vì lỗi 422 (không hợp lệ) được sử dụng cho các lỗi ngữ nghĩa. Vi phạm logic nghiệp vụ thực sự là một ví dụ về lỗi ngữ nghĩa trong hệ thống của bạn, vì vậy 422 thực sự phù hợp để giải quyết câu hỏi này.

Đối với cá nhân tôi, lỗi xác nhận trong trường hợp này có vẻ lạc lõng, nhưng hãy gạt cảm xúc cá nhân sang một bên. Về mặt logic, nó có vẻ như là một người chiến thắng.

## API dựa trên khả năng


Vào năm 2017, Scott Wlaschin đã có một buổi nói chuyện về [Software Design with Capabilities](https://www.youtube.com/watch?v=fi1FsDW1QeY). Cách tiếp cận này không nhằm trả lại các phản hồi lỗi cụ thể khi người dùng cố gắng thực hiện hành động không được hỗ trợ, mà ngược lại. Trong mọi yêu cầu, API có thể trả về danh sách các hành động có thể được thực hiện.

Đây cũng không phải là một cách tiếp cận phổ biến đối với vấn đề, tuy nhiên tôi có thể thấy nó hữu ích, trong một số trường hợp và nó là một ví dụ hoàn hảo về suy nghĩ bên ngoài. Bạn có thể kiểm tra xem nó ra ở đây.

Một phần đặc biệt thú vị là với cách tiếp cận này, bạn có thể khiến người dùng API của mình hoàn toàn không biết logic kinh doanh của bạn hoạt động như thế nào!

## Final thoughts

Đây là một cuộc thảo luận vô nghĩa bởi vì chúng ta không rời khỏi thế giới lý tưởng và rất nhiều tình huống chỉ được đơn giản hóa, bởi vì, cuối cùng, điều đó không quan trọng, miễn là bạn viết document cho API của mình tốt. Vì vậy, ngay cả khi các API được xây dựng khác nhau ngay cả khi sử dụng các tiêu chuẩn và thông số kỹ thuật giống nhau, điều quan trọng duy nhất là tính nhất quán NỘI BỘ.

Đây là lý do tại sao chúng tôi gặp lỗi Xác thực, trong đó người dùng cố gắng đăng ký bằng các email không phải là duy nhất, tại sao chúng tôi gặp lỗi bị cấm, nơi một bài báo đã được xuất bản, v.v.

Tôi chỉ muốn nói rằng có nhiều cách tiếp cận khác nhau, đối với một trong những vấn đề phổ biến nhất trong các ứng dụng web hiện đại, do thiếu đặc điểm kỹ thuật trong lĩnh vực đó, và thậm chí là trò đùa ngày Cá tháng Tư - mã trạng thái 418 HTTP - dường như là một ứng cử viên hợp lệ cho các trường hợp sử dụng thực tế khi nói đến các vi phạm logic nghiệp vụ và các trạng thái ứng dụng.