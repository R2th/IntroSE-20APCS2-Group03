# Network tool
Network tool là một tool quan trọng trong những tool mà Chrome cung cấp.

Nghe tên thì cũng đã đoán được tác dụng của tool để làm gì rồi nhỉ :rofl::upside_down_face:

-  Xem các request đã được gửi đi
-  Xem các thông tin nhận về
-  Block các request không mong muốn
-  Kiểm thử trang web với các điều kiện khác nhau (internet chậm nhanh, cache có hoặc không...)

![](https://images.viblo.asia/028f92e2-e29d-4f9e-8fa7-36927f13fe47.PNG)

## Xem các request đã gửi, nhận và lọc chúng
### Xem request
Network tool cho phép bạn nắm bắt được tất cả các request được gửi từ trình duyệt:
- Số lượng request
![](https://images.viblo.asia/372c16d2-f244-44c9-80f0-7f1e40a5e9dd.PNG)

- Thời gian gửi, nhận.
- Nội dung gửi nhận: Header, Response, Cookie,...

![](https://images.viblo.asia/bfd629c8-65e8-4886-9afe-bb27fb2a5eac.PNG)

### Lọc các request, response
Chrome hỗ trợ rất nhiều cách để bạn có thể lọc các request, response
- Bạn có thể dùng con trỏ chuột lăn lên lăn xuống để tìm.
- Cũng có thể chọn một trong các loại thường sử dùng đã được chrome gợi ý: All, XHR, JS, CSS, Img, Media, Font, Doc, WS (web-socket), Manifest, Orther. Hoặc chỉ xem các request đã bị block
- Hay cũng có thể dùng ô Filter bằng cách nhập các ký tự phù hợp như tên, regex, url:,....
- Ngoài ra nút Search cũng là một cách để lọc thông minh với các dữ liệu tìm kiếm lớn hơn, ở trong các Header, body, hay trong các response... Ngoài ra thì Search cũng có thể tìm kiếm theo Regurla hay chữ hoa chữ thường ...
- Cũng có thể lọc các request theo thời gian thông qua Setting. Lựa chọn Capture screenshots để chọn lựa request theo từng screenshots
![](https://images.viblo.asia/e41496bc-d008-4801-8e3f-8e68055a119a.PNG)

## Block các request không mong muốn
Chrome cho phép bạn block các request, làm cho nó không thể áp dụng cho trang web.

Block dễ dàng bằng cách click request cần block, chuột phải và chọn Blocking request URL .

Mặt khác thì trong lựa chọn cũng có rất nhiều điều tuyệt với cho bạn: có thể lưu request , mở trong tab mới, hay copy request dưới một dạng nào đó ví dụ như Power Shell để bạn có thể mang sang PS chạy thử - thật tuyệt vời.
![](https://images.viblo.asia/66406048-d28c-4366-a544-5fe3bd3224da.PNG)

Bạn có thể block bằng cách gõ Ctrl + Shift + P -> tìm kiếm "show request blocking":
![](https://images.viblo.asia/e92bc82d-671d-4aba-bf96-c072faee4efc.PNG)
Từ console: `Request blocking` chúng ta có thể thêm một request blocking mới hay loại bỏ các blocking này.

## Kiểm thử trang web với các điều kiện khác nhau
### Loại bỏ cache
Lắm lúc các dữ liệu cache gây trở ngại cho việc phát triển ứng dụng web của bạn, bạn muốn disable nó đi trong khi debug? Hãy click vào `Disable cache` chrome sẽ làm việc này giúp bạn.
![](https://images.viblo.asia/a66f1347-f231-4027-a964-bafaf2f66a87.PNG)
### Kiểm thử với các loại băng thông
Cái này thường được sử dụng nhiều để giúp bạn phát hiện ra các request quá nặng, quá tốn thời gian mà bạn cần phải loại bỏ hay khắc phục để tăng điểm cho trang web của mình.

Dựa vào cách kiểm thử với các tốc độ mạng khác nhau như: Slow 3G, Fast 3G, offline, ... hay bạn cũng có thể Custom nó.
![](https://images.viblo.asia/c3699a30-ad62-4135-acf3-cac17111b03d.png)

# Tổng kết
Network tool là công cụ quản lý thật tuyệt với các request đến server mà chrome đã trang bị cho bạn. Hãy thử và trải nghiệm nó ngay thôi :cowboy_hat_face:

Cảm ơn bạn đã đọc bài viết của mình. 
Tài liệu tham khảo: [developers.google.com](https://developers.google.com/web/tools/chrome-devtools/network)