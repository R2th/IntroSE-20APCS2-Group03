# 1. Giới Thiệu
## 1.1. API là gì??
- API (Application Programming Interface) là giao diện lập trình ứng dụng, nó là phương thức để kết nối với các thư viện và ứng dụng khác. Window, Google, Twitter... đều có API riêng. 
- Với API này ta có thể tạo ra các ứng dụng bằng cách sử dụng tính năng hoặc dữ liệu hiện có trên máy chủ của họ. 
**=> Nói nôm na nó cũng giống như 1 thư viện mà bạn có thể sử dụng thông qua các request**
## 1.2. Facebook API là gì??
- Facebook API là nền tảng do Facebook cung cấp cho người viết ứng dụng để dễ dàng trong việc tạo ứng dụng và đảm bảo người viết ứng dụng không can thiệp quá sâu vào hệ thống của Facebook.

- Thông qua Facebook API, ta có thể lấy được thông tin về người dùng như là thông tin cá nhân, ảnh profile.... nếu như được cấp quyền cho ta truy cập trang cá nhân.

- Facebook sẽ gửi một phương thức POST đến máy chủ Facebook API. Nó bao gồm một số các thông số yêu cầu như api_key của ứng dụng, session_key của người dùng đưa ra yêu cầu. Bên cạnh đó Facebook còn thêm vào tham số fb_sig để thông báo ứng dụng đưa ra yêu cầu. Bằng cách này tất cả các lời gọi API sẽ được đảm bảo, Facebook có thể xác minh các yêu cầu được gửi từ một ứng dụng đã được chấp thuận.
# 2. Facebook Graph API
## 2.1. Định Nghĩa
- Từ Graph dịch ra có nghĩa là từ đồ thị cho nên Facebook Graph API là cách để lấy dữ liệu vào và ra khỏi đồ thị xã hội của Facebook. Bạn có thể sử dụng để truy vấn dữ liệu, gửi những câu chuyện mới, tải lên hình ảnh và một loạt các nhiệm vụ khác mà một ứng dụng có thể làm.
- Nó bao gồm:
     - node (nút): Những thứ xuất hiện trên facebook có tương tác như ảnh, post…
     - edge (cạnh): những kết nối, liên hệ giữa nó.
     - field (trường): thông tin của nó.

![](https://images.viblo.asia/3b886031-281c-496f-9909-006e209a9da5.png)

*Graph API là dựa trên HTTP, do đó, làm việc với bất kỳ ngôn ngữ nào có một thư viện HTTP, như cURL, urllib*
*- Bạn sẽ lấy dữ liệu thông qua các http request.*

![](https://images.viblo.asia/81bbfaae-814d-45f7-a179-a10d3c18e088.png)
*Ảnh minh họa*
## 2.2. Truy cập giao diện Graph API của Facebook
- Đầu tiên bạn truy cập vào trang  **https://developers.facebook.com/**
- Sau đó bạn phải **tạo 1 ứng dụng facebook**, nếu không bạn sẽ không thể sử dụng api. (cách tạo thì các bạn google nhé). 
- Vào **More** -> **Tool** -> **Graph API Explorer** các bạn sẽ ra được giao diện bên dưới.

![](https://images.viblo.asia/8f65ae66-cf85-4f57-a199-41c06dc2e148.PNG)

- **Các thành phần chính:**
1. Nơi cấp quyền truy cập vào dữ liệu của bạn, bạn có thể quy định quyền truy cập của API
2. Tạo ra **Access_Token** để truy cập vào API
3. Nơi để gửi request
4. Nhập vào các thông tin mà bạn muốn lấy ra
5. Nơi hiển thị dữ liệu (dữ liệu được hiển thị dưới dạng json)
> Ví dụ: Mình muốn lấy ra user_id và name thì mình sẽ nhập vào chỗ số 4, dữ liệu sẽ được trả ra ở số 5
>
>  Bạn cũng có thể lấy ra cái bài post và các reaction bạn đã thả bằng cách nhập thêm vào (các bạn chỉ được truy cập vào các trường đã được cho phép ở số 1 thôi nhé)
## 2.3. Sử dụng Graph API thủ công
- Bạn sẽ mở 1 tab mới và sẽ nhập địa chỉ như sau: 
**https://graph.facebook.com/[your-user-id]?fields=[field]&access_token=[your-user-access-token]**
> - **Chú ý:**
>   - **your-user-id**: user id, hoặc có thể gõ là **me**.
>    - **field**: trường mà bạn muốn lấy ra
>   - **your-user-access-token**: Access_Token mà bạn đã lấy ở giao diện lúc nãy.
- *Ví dụ: Mình sẽ lấy các thông tin userId, tên, giới tính, ngày sinh và đếm xem có bao nhiêu bạn bè*

![](https://images.viblo.asia/1f10cd9d-3c31-4efa-b419-243df84f7b80.PNG)
# 3. Kết Bài
Vậy là mình đã tổng hợp xong "sương sương" những gì cơ bản nhất graph api của facebook, nếu có thời gian mình sẽ viết tiếp 1 bài sử dụng facebook api vào trong code nhé.

Nếu bài viết còn thiếu sót thì xin các bạn thông cảm và góp ý để các bài viết khác tốt hơn ạ.
Rất cảm ơn mọi người đã xem bài viết :joy::joy:
# 4. Tài Liệu Tham Khảo
- Nguồn từ Facebook: https://developers.facebook.com/docs/
- Nguồn từ youtube:

{@embed: https://www.youtube.com/watch?v=WteK95AppF4}

-----