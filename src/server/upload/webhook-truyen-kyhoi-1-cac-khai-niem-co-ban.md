# 1. Webhook là gì?

Webhook là một API concept ngày càng phổ biến. Khi mà giờ đây các hành vi của chúng ta tương tác với trang web đều có thể mô tả bằng các sự kiện, webhook lại càng có nhiều đất diễn hơn. Chúng thật sự rất hữu dụng và dần trở thành một trong những phương pháp tiết kiệm tài nguyên nhất có thể áp dụng vào việc phản ứng với các sự kiện.

Vậy Webhook là gì? Có thể hiểu đơn giản webhook(còn được gọi là HTTP push API) trong phát triển web là một phương pháp tăng cường hoặc thay đổi hành vi của một trang web hoặc ứng dụng web thông qua các custom callbacks, điều này giúp cho một ứng dụng có thể gọi tới các ứng dụng khác với thông tin theo thời gian thực. Các webhook cung cấp một cơ chế trong đó server-side sẽ gọi đến client-side khi bắt gặp một sự kiện nhất đinh nào đó vừa xảy ra.

Có thể hình dung webhook như một dạng API ngược, và bạn sẽ phải thiết kế API cho webhook sử dụng :joy::joy::joy:
Bình thường, với các API mà chúng ta vẫn biết, client sẽ luôn luôn gọi server, khi muốn get hay lưu trữ các dữ liệu, hoặc tạo phản hồi khi nhận được một sự kiện nào đó từ phía người dùng. Và nếu như chúng ta cần có các phản hồi với data ở thời gian thực, chúng ta sẽ phải cần thăm dò dữ liệu rất thường xuyên. Kiểu "Alo, em trang điểm xong chưa, khi nào xong thì gọi anh". Sau đó cứ 5 phút một lần chúng ta lại rút điện thoại từ túi ra và gào tên nàng trong vô vọng =))

Với webhook, phía server-side sẽ gọi webhook và endpoint URL này lại được cung cấp từ phía client. Điều này khiến webhook hiệu quả với cả nhà cung cấp lẫn người tiêu dùng.
Webhook hoạt động dựa trên khái niệm về phản ứng sự kiện - "event reaction" - thay vì ứng dụng client-side phải liên tục thăm dò ứng dụng server-side để kiểm tra các sự kiện mới, ứng dụng server-side sẽ gọi ứng dụng client-side (bằng cách gọi URL webhook từ client cung cấp) bất cứ khi nào server-side có thông tin gì mới để báo cáo cho client. Kiểu: "Đã bảo 5' nữa xong mà cứ 69 phút lại gọi 1 phát bực cả mình. Thôi anh cứ yên tâm đứng đấy lúc nào xong em tự gọi lại :scream:"
Hạn chế duy nhất đối với webhook là khó khăn khi thiết lập chúng ban đầu, nhưng được nhiều hơn mất nên là "mãi bên nhau bạn nhé" =))

![](https://images.viblo.asia/1da4840c-d62e-4c18-aa96-65f46c799033.png)
# 2. Sử dụng webhook như thế nào ?
Bước đầu tiên trong việc tiêu thụ một webhook là tạo cho nhà cung cấp webhook một URL để gửi yêu cầu đến. Điều này thường được thực hiện thông qua backend panel hoặc API. Nghĩa là bạn cần phải thiết lập một URL trong ứng dụng của mình  sao cho nó có thể truy cập được từ public web.

Phần lớn các webhook sẽ POST dữ liệu cho bạn theo một trong hai cách:  JSON hoặc XML hoặc dưới dạng form data(application / x-www-form-urlencoding hoặc Multipart / form-data ). Nhà cung cấp sẽ cho bạn biết chi tiết các response , hầu hết đều khá dễ hiểu và gần như các web frameworks sẽ support tận răng cho bạn.
# 3. Muốn debug webhook thì làm sao ?
Việc debug một webhook đôi khi có thể phức tạp, vì webhooks chủ yếu là không đồng bộ. Vì vậy, bạn phải kích hoạt chúng và chờ đợi, sau đó kiểm tra phản hồi. Điều này có thể gây mệt mỏi và khá kém hiệu quả. May mắn thay, có những cách tốt hơn, chúng ta  có thể điểm qua một vài phương pháp: 
* Hiểu những gì webhook cung cấp, bằng cách sử dụng một công cụ như RequestBin để thu thập các request trên webhook.
* Giả lập các request bằng cách sử dụng một công cụ như cURL hoặc Postman.
* Kiểm tra mã trên máy của bạn bằng cách sử dụng một công cụ như ngrok.
* Theo dõi toàn bộ flow bằng cách sử dụng Runscope.

Hẹn gặp lại các bạn trong phần tiếp theo, mình sẽ có 1 ví dụ cụ thể và thực tế để các bạn dễ hiểu hơn. Peace!


Bài viết có tham khảo một số định nghĩa từ nguồn: https://sendgrid.com/blog/whats-webhook/