Trong bài viết trước mình đã hướng dẫn các bạn mua Domain từ Namecheap - nhà cung cấp tiền miền giá rẻ và uy tín hàng đầu hiện nay.
https://viblo.asia/p/huong-dan-mua-va-dang-ky-ten-mien-domain-tai-namecheap-3Q75wXwQKWb
Trong bài viết này mình sẽ hướng dẫn các bạn mua máy chủ VPS tại DigitalOcean. Cũng tương tự như các nhà cung cấp domain thì có rất nhiều các nhà cung cấp máy chủ, theo kinh nghiệm cá nhân thì mình đánh giá DigitalOcean là nhà cung cấp các dịch vụ máy chủ uy tín và chất lượng tốt hiện nay.
Như các bạn đã biết thì để 1 website hoạt động ngoài mã nguồn thì cần domain và hosting. Có rất nhiều loại hosting hiện nay như Shared Host, VPS,.. tuy nhiên thì Shared Host có độ bảo mật không cao và cấu hình có nhiều giới hạn. Do đó ở đây mình đã lựa chọn sử dụng VPS.
## VPS là gì?
![](https://images.viblo.asia/4cfc8d59-52c8-4985-bfcd-7b42890c5be7.jpg)
VPS (Virtual Private Server) là dạng máy chủ ảo, server ảo được tạo ra bằng phương pháp phân chia một máy chủ vật lý thành nhiều máy chủ khác nhau có tính năng tương tự như máy chủ riêng (dedicated server), chạy dưới dạng chia sẻ tài nguyên từ máy chủ vật lý ban đầu đó. 
Mỗi VPS hosting là một hệ thống hoàn toàn riêng biệt, có một phần CPU riêng, dung lượng RAM riêng, dung lượng ổ HDD riêng, địa chỉ IP riêng và hệ điều hành riêng, người dùng có toàn quyền quản lý root và có thể restart lại hệ thống bất cứ lúc nào.

Thông thường thì các website vượt quá 5.000 lượt truy cập mỗi ngày đều dễ dàng bị up lên down xuống liên tục do thường xuyên dùng quá tải bộ nhớ được định sẵn. VPS là một giải pháp khá tối ưu cho các website có lượt truy cập quá giới hạn của một **shared hosting** (loại hosting mà các bạn hay mua và cài đặt sử dụng thông qua CPanel).

Giá của một gói VPS đều giao động từ ít nhất $25/tháng cho đến vài trăm $ tuỳ theo nhu cầu sử dụng và uy tín của từng nhà cung cấp. Các nhà cung cấp Việt Nam giá thường cao hơn so với các nhà cung cấp nước ngoài. Sau khi sử dụng một số dịch vụ VPS của các nhà cung cấp nước ngoài như Vultr,... thì mình đánh giá DigitalOcean có chất lượng VPS tương đối tốt và giá cả hợp lý. Có rất nhiều gói để các bạn lựa chọn từ 5$ trở lên và có thể upgrade trong tương lai dễ dàng.
## Ưu điểm của VPS
- Dễ dàng tùy biến nguồn tài nguyên, miễn là trong mức giới hạn của máy chủ vật lý cho phép.
- Từ 1 máy chủ vật lý, có thể tạo ra nhiều VPS. Tiết kiệm được tiền đầu tư phần cứng, tiền điện vận hành máy chủ, không gian lắp đặt…
- Do nhiều VPS có thể nằm tập trung trên 1 hệ thống máy chủ. Việc kiểm tra vận hành sẽ dễ dàng hơn.
## Hướng dẫn mua VPS tại DigitalOcean
Tương tự như mua domain bạn cần chuẩn bị thẻ tín dụng có thể thanh toán quốc tế hoặc sử dụng Paypal để thanh toán.
Vào trang chủ của DigitalOcean để tiến hành đăng ký tài khoản:
https://www.digitalocean.com/
Điền thông tin để đăng ký. Sau khi đăng ký bạn sẽ nhận được thông báo email kích hoạt:
![](https://images.viblo.asia/168bca34-e144-42d1-b10e-5c73c814faa3.png)
Sau khi kích hoạt email bạn cần phải thêm thông tin thanh toán để xác thực cho tài khoản. Có thể sử dụng thẻ tín dụng quốc tế hoặc tài khoản Paypal
![](https://images.viblo.asia/65257268-c74a-404c-a61d-d90fff4c4e96.png)
Để sử dụng được các dịch vụ của DigitalOcean bạn cần nạp tiền vào tài khoản trước khi sử dụng.
Sau khi nạp tiền vào tài khoản thành công bạn có thể tạo Project đầu tiên:
https://cloud.digitalocean.com/
![](https://images.viblo.asia/b0739951-160a-4d9e-85cf-1ab1e8fe3feb.png)
Ở bước tiếp theo bạn cần tạo 1 Droplet mới (1 VPS mới)
![](https://images.viblo.asia/55d611c7-d549-4076-91f6-e4688e225220.png)
Do ở đây sẽ cài và sử dụng WordPress nên mình sẽ chọn hệ điều hành Ubuntu.
Choose a Plan mình sẽ chọn Standard và giá là 5$ 1 tháng vì các bạn có thể nâng cấp sau:
![](https://images.viblo.asia/9f4ed267-b5d0-49e0-945e-e6aea2c57e71.png)
Add backups các bạn cũng nên sử dụng để khi có trường hợp bị tấn công có thể dễ dàng restore lại thời điểm trước khi bị dễ dàng và không mất dữ liệu
![](https://images.viblo.asia/f362dd48-3582-4f93-8797-157549f1d4b0.png)
Choose a datacenter region nếu Website hướng tới người dùng là Việt Nam bạn có thể chọn Singapore để tốc độ nhanh hơn.
Các phần khác các bạn có thể thay đổi sau nên chúng ta sẽ click Create để tạo Droplet mới:
![](https://images.viblo.asia/6cca4636-9f99-413e-8fdf-07e983ca773f.png)
Bạn sẽ nhận được 1 email gửi vào email đăng kí tài khoản tại DigitalOcean về user và pass để đăng nhập vào VPS!
Đây là hình ảnh thông tin VPS sau khi được khởi tạo thành công:
![](https://images.viblo.asia/9428fa79-503b-4286-b56e-b1e83601c64a.png)
Các bạn sẽ thấy địa chỉ ipv4 của VPS. Như đã nói ở phần trỏ Domain từ Namecheap ở bài viết trước, các bạn sẽ sử dụng địa chỉ IP này để trỏ domain về VPS của bann. Có rất nhiều phần quản lý trong VPS. Chúng ta sẽ tìm hiểu thêm vào các bài viết sau.
## Kết luận
Như vậy qua bài viết đã hướng dẫn các bạn đăng ký tài khoản tại DigitalOcean và tạo Droplet (VPS) đầu tiên và các lựa chọn cơ bản lúc khởi tạo VPS. Trong bài viết sau chúng ta sẽ tìm hiểu về các phần quản lý của VPS thông qua giao diện web của DigitalOcean và cách cấu hình, upload code lên VPS,...