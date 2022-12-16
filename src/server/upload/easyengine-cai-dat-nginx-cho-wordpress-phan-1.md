Qua các bài viết trước chúng ta đã tìm hiểu mua domain tại namecheap, mua VPS tại Digital Ocean:

https://viblo.asia/p/huong-dan-dang-ky-ten-mien-domain-tai-namecheap-va-tro-ve-hosting-3Q75wXwQKWb

https://viblo.asia/p/huong-dan-mua-vps-tai-digitalocean-m68Z0L1XZkG

Trong series bài viết này mình sẽ hướng dẫn các bạn cài đặt EasyEngine là một script cài đặt NGINX Webserver rất tốt dành cho WordPress. Sau khi từng sử dụng khá nhiều các script khác nhau và cài đặt NGINX webserver 1 cách thủ công thì mình thấy đây là 1 script rất tốt và sử dụng khá dễ dàng cho những người không chuyên.

Trong phần đầu tiên của Series này chúng ta sẽ tìm hiểu Nginx là gì cũng như các ưu điểm và nhược điểm của nó.
Các bạn có thể xem các thông tin trên trang chủ của Nginx bằng tiếng Anh tại đây: https://easyengine.io/
## EasyEngine là gì?
EasyEngine là một *UNIX script dành cho hệ điều hành Ubuntu/Debian giúp bạn tự động cài đặt một webserver sử dụng NGINX và PHP-FPM hoàn chỉnh và tối ưu cho việc cài đặt và sử dụng WordPress. Nó sẽ tự động tối ưu hóa cho NGINX để làm việc với WordPress tốt nhất. 
![](https://images.viblo.asia/ad605a1d-7568-414d-a65e-f291d3f22ec8.png)
## Một số tính năng của EasyEngine
- Cài đặt hoàn chỉnh 1 Webserver: bao gồm WordPress, Nginx, PHP, MySQL, Redis và deps các phiên bản mới nhất.
- Hỗ trợ bảo mật: hỗ trợ cài đặt HTTPS với wildcard và hỗ trợ tự động gia hạn (auto-renewal)
- Tối ưu cho WordPress: Hướng tới tối ưu cho WordPress và hỗ trợ cache
- Dễ dàng cập nhật: thường xuyên cập nhật và thêm các tính năng mới, dễ dàng cập nhật với dòng lệnh đơn giản.
- Docker: Mạnh mẽ hơn với Docker và không phức tạp
- Cron: hỗ trợ Cron cho mỗi site WordPress.
- Cài sẵn Postfix để tối ưu gửi mail, không vào spam
- ...
- 
Các tính năng trên gần như đã hoàn thiện và đầy đủ cho việc cài đặt và sử dụng WordPress trên máy chủ của bạn.
## Một số lưu ý khi dùng EasyEngine
- Nginx không sử dụng file .htacess
- EasyEngine 100% tương tác và sử dụng qua lệnh
- EasyEngine có rất nhiều bài viết hướng dẫn sử dụng tại đây: https://easyengine.io/tutorials/ . Trong quá trình cài đặt và sử dụng nếu có lỗi bạn có thể nhờ support trên diễn đàn: https://community.easyengine.io/
## Chuẩn bị server
- EasyEngine sẽ hoạt động tốt nhất nếu cài đặt trên một máy chủ Linux sử dụng hệ điều hành Ubuntu hoặc Debian. Lưu ý chọn hệ điều hành loại 64-bits 
- Bộ nhớ RAM tốt nhất là từ 1GB trở lên. Nếu bạn sử dụng VPS tại DigitalOcean thì RAM tối thiểu đã là 1GB với gói sử dụng thấp nhất.
- Nếu Server của bạn có lượng RAM tương đối thấp các bạn có thể tạo SWAP theo hướng dẫn bên dưới. Swap là một bộ nhớ ảo được sử dụng dựa trên tài nguyên của ổ cứng, chẳng hạn bạn có thể lấy 2GB dung lượng ổ cứng làm 2GB cho swap, và khi RAM trên máy chủ bị đầy thì swap sẽ được sử dụng. Nó cũng tương tự việc bạn tạo bộ nhớ RAM ảo trên máy tính cá nhân :)

Như ở trên EasyEngine 100% tương tác và sử dụng qua lệnh. Các bạn có thể sử dụng 1 phần mềm để kết nối dễ dàng hơn đến server của mình là ZOC: SSH Client and Terminal Emulator for macOS and Windows
Các bạn có thể tải ZOC tại đây: https://www.emtec.com/zoc/
Sau khi cài đặt xong ZOC bạn có thể click Quick Connect và điền account để kết nối đến server của bạn:

![](https://images.viblo.asia/97f301ae-3ba7-4761-89f1-3f3196338f87.png)

Lưu ý account và password được gửi về email của bạn sau khi tạo Droplet trên DigitalOcean. Bạn sẽ được yêu cầu thay đổi password sau khi đăng nhập.
Bây giờ bạn có thể tương tác trực tiếp với server của bạn thông qua các dòng lệnh.

## Kết luận
Hy vọng qua phần 1 của bài viết đã giới thiệu giúp các bạn bước đầu tìm hiểu về EasyEngine và các bước cơ bản ban đầu để có thể tự cài đặt một Webserver hoàn chỉnh trên máy chủ của riêng mình. Trong các bài viết sau chúng ta sẽ đi chi tiết hơn vào phần cài đặt.