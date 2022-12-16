Chào các bạn, chắc hẳn trong các dự án IOS khi mà chúng ta mới join vào thì bạn sẽ thấy project đã được Team Leader chia ra thành các Scheme khác nhau tương ứng với đó là các configuration tương ứng. Ví dụ: Staging, Product.... Mặc định khi chúng ta khởi tạo một project thì đã có sẵn 2 configuration đó là Debug và Release. Vậy nếu chúng ta muốn tạo thêm Scheme và Configuration khác thì sao? Nếu các bạn có cùng câu hỏi như trên thì hãy đọc bài viết này. Mình sẽ hướng dẫn một cách nhanh và dễ nhất để có thể thiết lập được.
### Tạo Scheme 
Ở đây mình sẽ tạo 1 project có tên là **DemoEnv**  . Trên phần top menu của Xcode, chọn đến phần **Set the active scheme** như hình dưới đây, sau đó chọn **New Scheme** 
![](https://images.viblo.asia/705ed644-3e63-44de-8916-95a45a531b50.png)
Tiếp theo chúng ta sẽ chọn Target cho Scheme đó, tuy nhiên, ở project này mình chỉ có 1 target vì vậy mình sẽ không cần chọn mà sẽ tiến hành đặt tên luôn cho Scheme mới với tên **DemoEnv-Staging**
Sau khi tạo xong, chúng ta sẽ có được Scheme với tên vừa tạo. 
![](https://images.viblo.asia/71228c1e-3c03-4359-90b6-5402cbcabec9.png)
Như vậy là chúng ta đã có 2 Scheme cho project này. Chúng ta có thể dễ dàng chuyển đổi giữa chúng để phù hợp với môi trường phát triển....
### Tạo Configurations
Để tạo configuration tương ứng cho từng Scheme, Tại General -> Project -> Chọn project => Sau đó chúng ta sẽ thấy được một mục có tên Configurations như hình dưới đây:
![](https://images.viblo.asia/bdd6920b-2afe-4e87-9a2f-267a78f1d36b.png)
Tại mục **Configurations** hãy click vào dấu + để tạo thêm config hoặc click vào dấu - để xoá đi config. 
Hãy đặt tên cho nó tương ứng với Scheme của bạn, ở đây mình đặt tên cho nó là **Staging**.
![](https://images.viblo.asia/8ecf644b-a77f-4eba-a576-f8d5728a601c.png)
Sau khi tạo xong config, hay quay trở lại target **DemoEnv**, ở đây chúng ta sẽ thấy có thêm **Staging**. Chúng ta có thể cấu hình provisioning và certificate tương ứng cho từng config.
![](https://images.viblo.asia/8c5513cc-71f7-4236-920a-a0605cac1688.png)

### Thiết lập Scheme chạy đúng configuration cho chính nó
Sau khi đã tạo xong configuration, hay quay trở lại Scheme mà chúng ta vừa tạo, Chọn Edit Scheme -> Run -> Build Configuration -> Staging.
Điều này đảm bảo rằng khi chọn Scheme Staging, project sẽ lấy config của Staging.
![](https://images.viblo.asia/2a4d025a-eab5-4856-8d22-5a7323aefd6b.png)
**=> Như vậy là đã xong việc thiết lập Scheme cho project IOS của bạn. Nhưng?  ///// **

### Làm sao để config bundle id riêng cho từng Scheme?
Chắc hẳn khi tạo ra các Scheme riêng, chúng ta sẽ muốn tương ứng với Scheme thì sẽ có Bundle ID riêng. Vậy làm như thế nào?
Đầu tiên, vẫn ở Target đó, chọn sang tab Build Settings 
Tìm kiếm từ khoá bundle id, chúng ta sẽ thấy được mục có tên **Product Bundle Identifier** -> Đây chính là nơi chúng ta sẽ thiết lập bundle id riêng cho từng sheme.
Mình sẽ thiết lập riêng biệt như sau:
![](https://images.viblo.asia/1eaa5e10-1c10-46f8-9639-8b570d0265f3.png)

#### Vậy làm sao để ứng với mỗi bundle id, chúng ta sẽ có app name khác nhau?
Rất đơn giản, vẫn là trong Build Setting, lúc này ngay tại chô thanh tìm kiếm, hãy chọn dấu + 
Sau đó chọn **Add User-Defined Settings**
Sau đó đặt tên cho phần đó, thông thường mọi người sẽ đặt tên là **APP_DISPLAY_NAME**
Tại đây chúng ta cũng sẽ đặt tên cho từng config.
![](https://images.viblo.asia/b34b96fb-664a-4295-9533-807fdef2f2e6.png)
Sau đó, trong phần Target, tại tab General -> Display Name name hãy sửa thành **${APP_DISPLAY_NAME}**

### Kết quả
Giờ thì chạy project lên máy ảo và xem kết quả, với mỗi Scheme chúng ta sẽ có một project với bundle id và app name khác nhau.
![](https://images.viblo.asia/39bb661f-8c7a-4fd0-bdef-41afc6ed780c.png)
Xin cảm ơn các bạn đã đọc bài viết, hy vọng có thể giúp ích được.