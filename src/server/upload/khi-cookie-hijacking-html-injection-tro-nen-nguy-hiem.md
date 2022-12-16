Chào các bạn,

Hôm nay mình sẽ chỉ với các bạn cách mà mình gặp một lỗi html injection, và cách mình biến nó thành lỗi nghiêm trọng với kĩ thuật cookie hijacking.

**Đôi điều về HTML Injection và Cookie Hijacking:**

> HTML injection là một lỗi giúp hacker có thể chèn được mã HTML vào website và thực thi đoạn mã đó trên trình duyệt của người dùng. Lỗi này có thể dẫn tới rất nhiều hệ lụy kể cả việc đánh cắp cookie.

> Session Hijacking là hình thức tấn công vào phiên làm việc giữa client và server cách đánh cắp cookie của người sử dụng sau khi họ đã qua bước xác thực với máy chủ, sau đó sẽ chiếm quyền điều khiển của phiên làm việc này

**Giai đoạn 1: Khám phá**

Lần này mình đã thực hiện test lần lượt trên từng input ở trang người dùng. Nhận thấy rằng các đoạn input đã không được validate như mong đợi. Tuy nhiên làm sao để có thể khai thác lỗi này khi mà cần phải đăng nhập thì mới hiện ra những thông tin này?

**Lần 1:** Thử khai thác bằng lỗi CSRF, gửi một đoạn code để đăng nhập vào tài khoản cho victim

Ex:
![](https://i.imgur.com/Phqae45.png) 

Không quá khó để đoán trước kết quả, cách thực hiện này không thành công vì server đã thực hiện validate login bằng token.

Lần 2

**Lần 2:**

Cookie Hijacking! Tới cách này thì mình đã thành công vì cookie quản lí phiên đăng nhập không hề hết hạn sau khi mình bấm Logout. Cookie chỉ được xóa khi mình xóa nó bằng tay:I logged in with a test account and then I clicked "logout". Note in the screenshot below that cookies were still stored in the browser after the logout:

![](https://anonymousvn.org/wp-content/uploads/2019/03/html-inject-2.png)

Cookie not expired when click logout

 Mình copy cookie bằng Edit This Cookie ([edit this cookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=pt-BR)), sửa lại và nhanh chóng được chuyển tới trang người dùng

![](https://anonymousvn.org/wp-content/uploads/2019/03/user-profile-html-injection.png)

Như vậy là xong! Giờ đã đến lúc khai thác lỗi HTML Injection

Như mình đã nói ở trên, trường "customer_name" dính lỗi không validate input. Để xác thực việc này, mình đã intercept request bằng burp suite và dán 1 thẻ H1 vào ô name:

![](https://anonymousvn.org/wp-content/uploads/2019/03/burp-html-injection.png)

![](https://anonymousvn.org/wp-content/uploads/2019/03/email-html-injection.png)

Như vậy là đã xong!

Bài viết mang tính chất tham khảo với mục đích học tập!

Chúc bạn thành công <3

Nguồn : https://anonymousvn.org/khi-cookie-hijacking-html-injection-tro-nen-nguy-hiem.hav