![](https://images.viblo.asia/b1150fa9-e4f9-4cb6-892f-27894f96df44.png)
Webhook là một khái niệm API đang ngày càng phổ biến trong những năm gần đây. Như chúng ta đã biết các tương tác trên web được mô tả bằng các events vì thế webhook ngày càng được ứng dụng nhiều hơn vì chúng tương đối dễ dàng và hữu ích để phản ánh các sự kiện. 

Vậy thực chất webhook là gì? Webhook (cũng có thể gọi là web callback hay HTTP push API) cho phép ứng dụng cung cấp data cho một ứng dụng khác trong thời gian thực. Không như các API điển hình khác ta cần phải thăm dò server thường xuyên để biết xem có events mới hay không, với webhook bất cứ khi nào có event mới server-side sẽ tự động thông báo cho client-side được biết. 

Webhooks đôi khi cũng được gọi là **Reverse APIs** vì trước đó bạn phải thiết kế API cho webhook sử dụng. Webhook sẽ gửi một HTTP request tới ứng dụng của bạn (thường bằng method POST) và vấn để ở đây là bạn sẽ xử lý như thế nào. Để dễ hiểu hơn mình sẽ lấy ví dụ sau: 
Khi server có một sự kiện mới với nội dụng "Có mưa lớn ở khu vực miền Bắc" và gửi thông báo tới ứng dụng điện thoại, sau khi nhận được thông báo từ server ứng dụng của bạn sẽ lập tức hiển thị notification để cảnh báo cho người dùng.

# Consuming a Webhook
Bước đầu tiên ta cần cung cấp một URL để webhook provider gửi request tới. Điều này có nghĩa là chúng ta cần phải set up URL cho ứng dụng của mình có thể truy cập trên public web. 

Phần lớn các webhook sẽ POST data tới URL đã cung cấp bằng một trong hai hình thức: as JSON (thông thường) hay XML. Các nhà cũng cấp sẽ cho bạn biết nội dung của các API này (hoặc thậm chí cũng cho phép ta custom nội dung của API cung cấp). 

# Debugging a Webhook
Việc debugging webhook đôi khi cũng khá phức tạp vì cơ chế của nó là bất đồng bộ. Vì thế bạn cần phải trigger chúng và chờ đợi để nhận được response, điều này khiến ta cảm thấy khá vất vả và mệt mỏi. Tuy nhiên có một số tips sau đây có thể giúp việc debugging dễ dàng hơn: 
1. Hiểu về những gì webhook cũng cấp, ta có thể sự dụng  [RequestBin](https://requestbin.com/?gclid=EAIaIQobChMI5tq-nsf54gIVRaqWCh2ccQM6EAAYASAAEgLzvPD_BwE) để collect và inspect các request mà webhook gửi tới 
2. Giả lập request bằng các tool như cURL hay [Postman](https://www.getpostman.com/)
3. Publish code trên local machine với [ngrok](https://ngrok.com/)
4. Theo dõi toàn bộ flow bằng cách sử dụng các tool như là [Runscope](https://www.runscope.com/docs/)

# Securing a Webhook
Vì webhooks cung cấp dữ liệu tới các URL có sẵn công khai trong ứng dụng của bạn, nên có khả năng người khác có thể tìm thấy URL đó và sau đó cung cấp cho bạn dữ liệu sai. Để ngăn chặn điều này xảy ra ta có thể sử dụng một số kĩ thuật. Đầu tiền cần phải yêu cầu các kết nối đến là https
1. Cách đầu tiên và được hỗ trợ nhiều nhất để bảo mật webhook là thêm mã thông báo vào URL hoạt động như một nhận dạng duy nhất, ví dụ: ?auth=TK
2. Tùy chọn tiếp theo là triển khai [Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication), điều này cũng được hỗ trợ rộng rãi và rất dễ thực hiện.
3. Hai giải pháp trên đã có thể ngăn chặn được phần lớn các attacks, tuy nhiên điểm bất lợi ở đây là việc gửi auth token cùng với request. Còn một giải pháp nữa là bên phía provider sẽ sign các request gửi tới client và sau đó client-side sẽ verify các signature đấy. 

# Important Gotchas
Có 2 điều cần lưu ý khi tạo webhook consumers sau: 
* Webhooks gửi data đến ứng dụng của bạn và sẽ không quan tâm gì nữa sau việc tạo request. Điều này có nghĩa là nếu ứng dụng của chúng ta nếu có xảy ra lỗi thì data chúng ta sẽ bị mất. Mặt khác nhiều webhook vẫn quan tâm đến response bên phía client và nếu thấy có lỗi sẽ resend data. Việc này dẫn đến nếu ứng dụng của chúng ta đã xử lý request nhưng vẫn gửi error đến webhook sẽ dẫn đến trường hợp duplicate data. Do vậy ta cần hiểu rõ cơ chế của webhook provider mà ta sử dụng để xử lý trong các trường lỗi xảy ra trong ứng dụng. 
* Webhooks có thể thực hiện rất nhiều requests tương ứng với các events. Nếu như nhiều request liên tục được gửi đến client-side có thể dẫn đến DDoSing. Chúng ta cần đảm bảo ứng dụng có thể handle được trường hợp này khi webhook ngày càng scale.

Bài viết trên mình đã giới thiệu cho các bạn về webhook, chúc các bạn một ngày làm việc vui vẻ.

**Tham khảo**: https://sendgrid.com/blog/whats-webhook/