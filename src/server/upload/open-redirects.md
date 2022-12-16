# Giới thiệu
Hầu hết cái ứng dụng web ngày nay đều sử dụng `redirect`. Nếu site của bạn chuyển tới URL cùng chuỗi `query` thì bạn có thể dính phải `phishing attacks`. Mình sẽ lấy ví dụ về cách bạn đang giúp đỡ những kẻ lừa đảo qua email như thế nào nhé :)

# Cách thức hoạt động
`Open redirect` xảy ra khi mà ứng dụng chuyển hướng người dùng tới URL được cung cấp từ nguồn không đáng tin cậy với việc không validate URL đó. Nó thường được sử dụng để `phishing attacks` - tấn công với link độc được gửi trong email với lỗ lực lừa người dùng truy cập site có hại. Bằng cách gửi link trỏ tới website của bạn nhưng lại chuyển hướng ngay tớ site độc, kẻ tấn công có thể phá vỡ biện pháp chống phishing. Loại tấn công này có thể ảnh hưởng tới tin tưởng của người dùng trong site của bạn từ khi xảy ra lỗ hổng này.

Và đây là cách mà nó hoạt động...

Anh chàng **Mal** quen thuộc trong [series](https://viblo.asia/s/to-da-hoc-bao-mat-co-ban-nhu-the-nao-68Z00JY2ZkG) muốn thử lỗ hổng này trên site của bạn, thông thường, đây là tính năng hữu dụng, nhưng site của bạn lại không kiểm tra URL được redirect. **Vic** là một người dùng bình thường, **Mal** muốn lừa **Vic** truy cập vào web độc. **Mal** chế ra URL chuyển hướng tới trang chứa mã độc của hắn: `www.example.com?next=http://www.haxxed.com`. Để trông nó đáng tin hơn, hắn mã hóa redirect parameter, và thêm vài param thừa vào query: `www.example.com?_g=DernKFjelgnne&vid=iguana-party&referrer=email&next=http%3A%2F%2Fwww.haxxed.com`. **Mal** gửi đường dẫn tới **Vic** thông qua email. Đường dẫn là website của bạn và nó không được đưa vào `black-listed` như là một trang chứa mã độc bởi email provider của **Vic**, vậy nên sẽ không có cảnh báo khi email được quét.

![](https://images.viblo.asia/62853f77-c55d-4a5a-99df-8df629d8a1e4.png)

Sau khi click vào đường dẫn, Vic được chuyển hướng tới trang login do chưa được đăng nhập trên website của bạn

![](https://images.viblo.asia/63295622-ea8f-4867-aa54-005c00dc53c7.png)

Ngay khi đăng nhập thành công, param chuyển hướng được xử lý. Site không kiểm tra URL với param `next` và **Vic** bị chuyển hướng tới site độc, anh ta bị `phishinged`.

Nếu trang web của bạn cho phép `open redirect` bạn có thể vô tình giúp những kẻ tấn công lợi dụng người dùng của bạn.

# Rủi do
Đây là lỗi thường gặp, dễ khai thác và cũng đáng lo ngại. Chuyển hướng là chức năng hữu ích khi xây dựng website. Nếu người dùng cố gắng truy cập tài nguyên trước khi đăng nhập, nó thông thường sẽ chuyển hướng họ tới trang đăng nhập, thay thế với `origin URL` trên query param, và sau khi người dùng tiến hành đăng nhập thành công, tự động chuyển hướng họ tới đường dẫn ban đầu. Tính năng này làm tăng trải nghiệm người dùng nhưng bạn cũng cần chắc chắn tới nơi mà nó được chuyển hướng là an toàn, nếu không bạn đã đặt người dùng vào tình thế nguy hiểm bằng cách cho phép `phishing attacks`.

Các dịch vụ mail hiện tại thực hiện rất tốt việc xử lý thư rác và thư độc hại, cách làm của họ là phân tích các liên kết ngoài trong html emails. Các link này được so sánh với danh sách đen domains bị cấm, nó sẽ tự chuyển vào hòm thư rác.

Do vậy đây Lỗ hổng ưa thích cho `spammers` và `phishers` .

# ngăn chặn
* Không cho phép chuyển hướng tới trang khác bằng cách kiểm tra URL: Tất cả các URL phải là đường dẫn tương đối (Lưu ý rằng các URL bắt đầu bằng // sẽ được trình duyệt hiểu là giao thức không xác định, URL tuyệt đối - vì vậy chúng cũng sẽ bị từ chối). Nếu cần chuyến hướng tới trang khác, hãy liệt kê nó vào `white list`.
* Kiểm tra `Referrer` khi chuyển hướng.
* Kiểm tra code ở client

# Tổng kết
Trên đây là phần giới thiệu ngắn gọn về `Open redirect`, hy vọng sẽ hữu ích cho bạn. Happy coding ! <3