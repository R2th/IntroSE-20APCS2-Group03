**Giới thiệu:**

Google **AMP** là từ viết tắt của **Accelerated Mobile Pages** là trang tăng tốc độ truy cập dành cho thiết bị di động, người dùng khi click vào website hỗ trợ AMP được hiển thị trên kết quả tìm kiếm sẽ cảm nhận tốc độ nhanh tới mức "**NGAY LẬP TỨC**". Trang cho thiết bị di động được tăng tốc (**AMP**)  là một mã nguồn mở ban đầu được hỗ trợ bởi các công ty công nghệ như Google và Twitter.

Thông thường nếu bạn sử dụng di động thực hiện truy vấn tìm kiếm một từ khóa nào đó trên Google và click vào kết quả mong muốn là một website nào đó thì bạn phải chờ cho tới khi website đó load hết các thành phần (text, hình ảnh, video...) sau đó mới xem được nội dung.

Thì:

Nếu trang web bạn click vào được hỗ trợ AMP, website đó sẽ xuất hiện rất nhanh giúp người dùng nhanh chóng đọc được nội dung website mà không phải chờ đợi nữa bởi nó đã được lưu trong bộ nhớ Cache của Google AMP.

Ví dụ về website sử dụng AMP:

![](https://images.viblo.asia/beac8003-7f7a-4027-8e64-5b1058f0b699.png)

**1. Tại sao lại như vậy?**

Khi website có hỗ trợ AMP thì Google sẽ lưu giao diện đó vào trong bộ nhớ Google AMP Cache, khi người dùng click vào đó xem link hiển thị vẫn là link của bạn tuy nhiên text, hình ảnh họ đang xem thực tế là của Google xuất ra cho người dùng xem. Sở dĩ tốc độ website được load rất nhanh bởi máy chủ của Google rất mạnh và thiết bị của người dùng sẽ không phải mất quá nhiều thời gian để load dữ liệu như load website trên hosting của bạn.

**2. Ưu điểm của việc cài đặt trang AMP đối với SEO**

* Các trang dành cho thiết bị di động được tăng tốc (AMP) sẽ được ưu tiên tăng thứ hạng trong kết quả tìm kiếm của Google trên thiết bị di động.
* Khi cài đặt AMP cho trang web của bạn sẽ giúp tăng tốc độ tải trang so với trang web không cài AMP từ 15-85%.
* Sử dụng trang AMP sẽ giúp bạn rút gọn tinh giảm các CSS.
* Tốc độ tải trang nhanh hơn đồng nghĩa với việc tăng lượt truy cập trang web và lượt xem quảng cáo.

**3. Phân tích kỹ thuật của Google AMP**

* Google AMP sử dụng kỹ thuật lazyload hình ảnh.
* Google AMP sử dụng kỹ thuật tải javascript bất đồng bộ async.
* Google AMP sử dụng kỹ thuật cdn để javascript nhanh chóng.

**4. Cách kiểm tra Google AMP**

* Công cụ kiểm tra AMP của chính Google

![](https://images.viblo.asia/3de20eb9-5dd8-415a-bfb5-2ad2d9ceadaf.png)


* Công cụ Web Interface https://validator.ampproject.org

![](https://images.viblo.asia/75d49d1e-bb57-40a3-bc30-fa73bf6a5760.png)

* Sử dụng trình duyệt Chrome: gõ link thêm "#development=1" vào đường link cần kiểm tra và ấn F12 chọn Tab Console

![](https://images.viblo.asia/ba9d966d-189a-41fd-9b18-0505862d8d89.png)

**5. Hướng dẫn cài đặt AMP cho website**

Hiện nay có 2 cách cài đặt **AMP** cho trang web của bạn là:

* Sử dụng Plugin AMP dành cho các trang web mã nguồn mở WordPress.
* Nếu bạn không sử dụng mã nguồn WordPress thì có thể làm theo hướng dẫn trực tiếp từ trang **Google Search guidelines for AMP pages**.

**Cách 1**: Truy cập vào trang **Google Search guidelines for AMP pages**

Tuy nhiên trước khi cài đặt chúng ta phải kiểm tra xem trang web của bạn được cài đặt AMP chưa bằng cách bạn truy cập vào trang Google Webmaster Tool theo hướng dẫn:

Truy cập vào trang quản lý trang web của bạn trong Google webmaster tool -> Bảng điều khiển-> giao diện tìm kiếm->trang dành cho thiết bị di động được tăng tốc.

![](https://images.viblo.asia/e07addda-c7bb-4a6a-b0fa-4fb0b5fc713a.png)

Nếu website của bạn chưa được cài đặt AMP bạn bạn click vào **Bắt đầu với AMP** và làm theo hướng dẫn của Google.

Lưu ý: *Cách làm này phải thật cẩn thận, nếu làm không đúng các bước thì những bài viết mới sẽ không được Google index*.

**Cách 2:** Sử dụng Plugin AMP

Bạn đang sử dụng mã nguồn WordPress là một lợi thế thi cài đặt trang AMP chỉ với các thao tác cơ bản bạn có thể tạo ra các trang AMP,  một cách nhanh chóng với  Plugin AMP được tích hợp sẵn:

Bạn tải **Plugin AMP** và tiến hành cài đặt trang theo hướng dẫn:

**Bước 1**: Tải Plugin và cài đặt.

**Bước 2**: Để kiểm tra trang web của bạn đã cài đặt AMP thành công hay chưa các bạn truy cập vào một bài viết bất kỳ trên trang web và thêm “/amp” vào cuối đường dẫn.

Đường dẫn url ban đầu: http://novadesign.vn/google-search-se-tich-hop-trang-amp/

Thêm amp vào cuối đường dẫn: http://novadesign.vn/google-search-se-tich-hop-trang-amp/amp/

![](https://images.viblo.asia/c681e84e-fc0a-4987-a61b-fd4f75fbb876.png)

Kết quả hiển thị như hình minh họa là bạn đã cài đăt AMP thành công.

Chú ý: Hiện nay AMP chỉ áp dụng cho các bài post chưa áp dụng cho các page trên trang web.

Khi cài đặt AMP cho trang web của bạn thì bạn đợi cho Google cập nhập mất khoảng vài hôm, bạn kiểm tra thường xuyên trong Google webmaster tool để cập nhật các thông báo mới nhất. Kết quả sau khi cài đặt thành công như hình minh họa.

![](https://images.viblo.asia/e1cbba9f-9c37-4a6c-96a5-23c110005b42.png)

**6. So sánh tốc độ google amp**

Hình ảnh bên dưới lần lượt là page bình thường và page sử dụng google amp.

![](https://images.viblo.asia/9e41aced-6eae-4b58-a46d-27187462d5f5.png)

**Kết luận**:

Qua bài viết hướng dẫn cài đặt AMP cho website, hy vọng đã mang đến cho các bạn những kiến thức bổ ích nhất, cải thiện được tốc độ cũng như tối ưu hoá website của mình.

**Tham khảo**:

https://kipalog.com/posts/Google-AMP-la-gi---Cai-dat-AMP-cho-website-asp-net-mvc

https://novadesign.vn/tin-tuc/google-amp-huong-dan-cai-dat-amp-cho-website.html