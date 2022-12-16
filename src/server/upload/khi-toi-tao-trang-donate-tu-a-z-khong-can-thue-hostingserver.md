Xin chào 500 anh em Viblo. Hôm nay nhân dịp cuối tuần mình lại bị ốm nên ở nhà làm cái trang donate đơn giản với hy vọng thông qua nó thì các ae ủng hộ mình có thể gửi quà cho mình thay lời cảm ơn. Mình cũng share lại template của donate lại lên đây để các ae nào cần cũng có thể sử dụng.

![](https://images.viblo.asia/b97ffdea-776d-425e-a598-62f600cb2a96.png)

<div align="center">

*(Ảnh preview)*

</div>

## Về source code

Do mục đích cũng chỉ là tạo một trang donate đơn giản và nhanh chóng nên mình thực hiện tạo giao diện bằng HTML và CSS luôn.

Link repo: https://github.com/kimyvgy/donate-page

Trong source code có sử dụng một số kỹ thuật, mình note lại để anh em nào mới học HTML/CSS có thể tham khảo nha:
- Sử dụng `filter: blur(8px)` để tạo ảnh background có hiệu ứng mờ.
- Sử dụng `box-shadow: 0 3px 5px rgba(0,0,0,0.3)` để tạo hiệu ứng đổ bóng khi rê chuột lên các button.
- Sử dụng `display: flex` (flexbox) để căn phần nội dung ra chính giữa trang web.
- Đã hỗ trợ responsive theo kích thước màn hình

Các hình thức donate, mình sử dụng 3 dịch vụ gồm:
- Momo: https://momo.vn
- Buymeacoffee: https://www.buymeacoffee.com
- Paypal: https://paypal.me

### Momo wallet

Tạo link Momo:
- Mở app Momo trên điện thoại > Ví của tôi
- Bấm vào icon QR > kéo xuống dưới chọn Link nhận tiền
- Trong màn hình này sẽ có mục chỉnh sửa lại tên đường link

Copy link này để sử dụng trong trang donate.

### Buymeacoffee và Paypal

Hai trang này bạn có thể truy cập link bên trên rồi tạo tài khoản.
- Buymeacoffee sẽ tạo một link tới trang profile riêng và cũng có chức năng donate bên trong. Bạn có thể connect để ví Paypal, Stripe để rút tiền về.
- Paypal, truy cập https://paypal.com để tạo account rồi qua https://paypal.me để tạo link nhận tiền

## Đưa web lên internet

Link demo: https://kimyvgy.webee.asia

Để đưa web lên internet, mình tạo subdomain là `kimyvgy.webee.asia`. Trang cũng đơn giản nên mình không mua hosting mà sẽ sử dụng luôn chức năng Github Page để host trang web.

Trong repo của mình, mình vào Settings > Pages rồi bật chức năng Github Pages lên và thiết lập Custom Domain:

![image.png](https://images.viblo.asia/88732eb6-b10d-46c2-8c74-23c7669f32d6.png)

Do web là HTML và đặt ở root của repository nên cũng không cần phải config gì thêm nữa cả. Nếu bạn không có domain thì hãy để trống ô Custom domain nhé. Khi đó sẽ dùng link của Github. Như repo của mình là https://kimyvgy.github.io/donate-page

> Format: https://<github_username>.github.io/<repository_slug>

## HTTPS với Cloudflare

Domain tới trang donate của mình sử dụng qua cloudflare để có HTTPS miễn phí. Việc trỏ domain về Github đơn giản chỉ cần tạo CNAME và cho nó qua proxy của Cloudflare.

![image.png](https://images.viblo.asia/a9802edb-e285-427c-8489-71b04aa8596c.png)

Save lại và mình đã có trang donate được public tại https://kimyvgy.webee.asia mà không cần phải hosting hay server gì cả.

## Tổng kết

Thành quả sau những giờ phút nỗ lực để cho ra một trang donate =)) 

![image.png](https://images.viblo.asia/0a9e1a72-835b-4788-ae64-732e64930394.png)

- Source: https://github.com/kimyvgy/donate-page
- Live page: https://kimyvgy.webee.asia

:coffee: *Nếu thấy nội dung này bổ ích, hãy mời mình một tách cà phê nha! Truy cập: **https://kimyvgy.webee.asia***