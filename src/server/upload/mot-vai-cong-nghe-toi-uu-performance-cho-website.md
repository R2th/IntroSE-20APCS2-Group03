Website rất quan trọng để bạn có thể tiếp cận, đưa thông tin đến với người truy cập, nó là bộ mặt của sản phẩm, dịch vụ, công ty của bạn. Một website tốt là một website có tốc độ tải trang nhanh, theo thống kê, [người dùng mong muốn có thể nhìn thấy nội dung trang web trong khoảng thời gian 2 giây](http://insights.wired.com/profiles/blogs/47-of-consumers-expect-a-web-page-to-load-in-2-seconds-or-less#axzz4OODH4Li2) tính từ lúc gõ địa chỉ truy cập (URL) vào browser. Vậy làm thế nào mà các trang web thương mại điện tử, mạng xã hội với nội dung trang web vừa nhiều ảnh, vừa nhiều chữ lại có thể phục vụ tốt user với khoảng 2 giây? Trên thực tế có rất nhiều cách để tối ưu performance cho website, bài viết này chỉ cung cấp một vài cách để thực hiện điều đó.

# 1. Giảm HTTP request.
Thông thường càng nhiều HTTP request càng khiến website của bạn load lâu hơn. Trình duyệt cũng được cấu hình để hạn chế số lượng các request đồng thời đến 1 host. Để tránh bottleneck, số lượng thành phần của từng trang được giảm xuống bằng cách hợp nhất tài nguyên theo đó các file nhỏ hơn, chẳng hạn như với các icon, chúng sẽ được nhóm lại với nhau thành 1 file. Phương pháp này đã và đang được sử dụng rất rộng rãi, để cụ thể nội dung, mình sẽ đưa ra một vài tip cho các bạn tham khảo.

#### 1.1 Inline, internal CSS/JS.

![Google sử dụng internal CSS](https://images.viblo.asia/8e2a4d6f-0113-4a63-a0e0-69c696c401c6.png)


Nếu bạn để ý, hầu hết các trang web lớn đều có sử dụng inline/internal css/js, điều này đôi khi đi ngược lại với quy tắc khi code phải không? Nhưng lợi ích của việc sử dụng inline/internal css/js lại mang lại rất lớn. Ví dụ với Goole, họ sử dụng inline/internal CSS/JS cho các chức năng nhỏ, điều này thực sự hữu ích khi mỗi giây Google có hàng triệu lượt truy cập đến website của họ.

#### 1.2 Sử dụng webpack.

![](https://images.viblo.asia/dbcc1636-df57-46fa-adbd-75805322e9f2.jpg)

**[Why webpack?](https://webpack.js.org/concepts/why-webpack/)**
TL;DR: webpack là công cụ bundle (gói) các tài sản (assets) của website lại. webpack quan tâm rất nhiều đến performance, webpack luôn tìm cách thêm vào hoặc nâng cao các chức năng như async load chunk file hoặc prefetch file để hạn chế loading time và tăng performance.

#### 1.3 Sử dụng 1 file ảnh chứa các icon.

Thay bằng việc load từng icon từ web server, bạn có thể gộp các icon lại thành 1 file png to và sử dụng css `background-position` để hiển thị icon mà mình mong muốn.

# 2. Tối ưu hóa web cache.

Tối ưu hóa web cache giúp giảm tải cho máy chủ về băng thông và độ trễ. Đối với gà mờ về web server thì việc sử dụng CDN là cách đơn giản và hiệu quả cũng như đỡ tốn chất xám nhất :D .
Mình cũng chia sẻ một vài kinh nghiệm về optimize web cache trong quá trình làm việc của mình.

* **Định nghĩa các URL sao cho thích hợp nhất**: cách này lợi dụng browser caching url, bạn có thể xem thêm về browser caching ở đây: [How Browser Caching Works](https://thesocietea.org/2016/05/how-browser-caching-works/).
* **Sử dụng ETag**: ETag là 1 HTTP response header, nó như 1 ID cho 1 phiên bản cụ thể của 1 resource, giúp caching chính xác hơn.
* **Sử dụng nginx**: web server nhanh nhất, open source, nhiều config mẫu cho bạn voọc, được sử dụng nhiều bởi các công ty và dịch vụ lớn như Dropbox, Netflix.
* **Định nghĩa các HTTP header phù hợp**: như `Expires`, `Max-Age`, `Cache-control`, ...

# 3. Tối ưu hóa webfont.
![](https://images.viblo.asia/4db113e7-1460-43a2-9178-c9e69a8f4539.png)
Webfont là một tập các nét, mỗi nét là một vector biểu diễn ký tự hay là ký hiệu. Vì vậy font càng phức tạp thì file font size càng lớn, việc load font file sẽ làm tốc độ tải trang tăng lên rất nhiều. Lời khuyên là:
* bạn không nên sử dụng quá nhiều font trên 1 trang.
* nếu có thể, hãy nén font có định dạng EOT hoặc TTF sang GZIP (dùng webpack được).
* customize font loading và font rendering sử dụng `<link rel="preload">`, `font-display` hoặc Font Loading API.

# 4. Tối ưu Database.
Bạn nên ghi lòng tạc dạ phương pháp này trước khi quyết định tạo thêm 1 trường/bảng nào trong database.