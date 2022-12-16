Thống kê và phân tích thông tin người dùng sử dụng là rất cần thiết để quản lý và phát triển website cũng như sản phẩm, dịch vụ mà website cung cấp. Để phục vụ cho mục đích này, Google Analytics (GA) là một dịch vụ mạnh mẽ, hiệu quả nhưng đồng thời cũng có thể cài đặt nhanh chóng và dễ dàng. Google Analytics giúp developers giảm được rất nhiều công sức để ghi lại cũng như hiển thị các bản thống kê hệ thống.
![](https://images.viblo.asia/613627fc-0b59-4585-9f03-bb48c481beef.jpg)
## Cài đặt Google Analytics
Để sử dụng Google Analytics cho trang web, các bạn cần đăng ký tài khoản GA [tại đây](http://www.google.com.vn/analytics/), sau đó làm theo các bước sau
### Tạo data stream
Data stream là luồng dữ liệu của khách hàng từ điểm cuối (web, app ...) đến GA. Khi bạn tạo data stream, GA sẽ tạo một đoạn mã để bạn thêm vào ứng dụng hoặc trang web của mình để thu thập dữ liệu. 

Nếu hệ thống của bạn đa nền tảng, bạn nên tạo một luồng dữ liệu cho từng nền tảng (ví dụ: một luồng dữ liệu cho ứng dụng Android, một luồng dữ liệu cho ứng dụng IOS và một luồng dữ liệu khác cho ứng dụng Web).

Để tạo một data stream mới các bạn làm như sau:

Vào **Admin**, chọn **Setup Assistant**
![](https://images.viblo.asia/acc1a294-5de2-4cde-bb03-1b9d913dd464.png)

Chọn **Tag installation**
![ga2.png](https://images.viblo.asia/edf69f5c-4354-4d3a-8a2f-6f0162cb3622.png)

Chọn **Add stream** và loại stream tương ứng với nền tảng sản phẩm của bạn
![](https://images.viblo.asia/f36f4a79-a633-4100-bad7-ec592b04157b.png)

Điền các thông tin cần thiết tùy vào nền tảng để tạo data stream
![](https://images.viblo.asia/23e1bced-e8c0-4c45-b70e-baeaf8e47869.png)
### Thêm mã tracking vào website
Sau khi đã tạo data stream, GA sẽ cung cấp mỗi stream một `Measurement ID` riêng biệt. ID này giúp định danh luồng dữ liệu cảu bạn khi gửi về GA.
![](https://images.viblo.asia/e7fac554-2181-4388-9507-bd8d161c3a59.png)

Sau khi có `Measurement ID`, bạn có thể thêm GA vào trang web bằng cách thêm vào thẻ `<header>` đoạn `gtag.js` script sau:
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=Your_Measurement_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'Your_Measurement_ID);
</script>
```
Sau khi thêm thành công, bạn sẽ thấy một số request gửi dữ liệu đến `google-analytics.com/g/collect` để thu thập dữ liệu. Ban đầu, GA sẽ mất một khoảng thời gian thu thập dữ liệu mới có thể tạo ra những thống kê cho người dùng.
## Bắt đầu sử dụng Google Analytics
### Tổng quan
Tại tab **Report snapshot**, bạn có thể thấy một số thông tin tổng quan trong hệ thống của bạn. Bạn có thể lọc dữ liệu theo khoảng thời gian; so sánh số liệu giữa các khoảng thời gian; hoặc thêm các thông tin so sánh đa dạng theo các thuộc tính của người dùng, thiết bị, session...
![2021-09-21_17-44.png](https://images.viblo.asia/8f8927f9-5845-4192-aced-efb2345a4f1d.png)
### Acquisition - Thu nạp
Thông tin trong tab `Acquisition` giúp bạn xác định lượng khách truy cập của mình tới từ đâu. Thông tin này rất quan trọng trong việc xác định sự hiệu quả của các chiến lược marketing bạn sử dụng cho hệ thống.

![analytics.google.com_analytics_web__authuser=3.png](https://images.viblo.asia/87b163d4-0cea-4966-b665-2b48861ed8b7.png)
Một số thông tin thu nạp của Google Analytics là:
 #### Medium - Phương tiện
Đây là thông tin về phương tiện mà người dùng truy cập trang web của bạn thông qua đó. Một số phương tiện chính bao gồm:
*   ***None:*** Người dùng truy cập trực tiếp trang web của bạn từ thanh địa chỉ hoặc qua bookmark của browser.
* ***Referral:*** Người dùng truy cập vào trang web thông qua đường dẫn từ một trang web khác ví dụ như Facebook, Instagram...
* ***Organic:*** Người dùng truy cập vào trang web thông qua các công cụ tìm kiếm miễn phí, ví dụ: như Google search, Bing, Baidu...
* ***CPC:*** Người dùng truy cập vào trang web thông qua quảng cáo, công cụ tìm kiếm được bạn trả phí
#### Source - Nguồn
Source là thông tin cụ thể hơn về nơi đưa người dùng đến với website của bạn. Ví dụ với medium `organic` thì source có thể là google, bing, baidu... hay `direct` với medium là `none`.
#### Campaign - Chiến dịch
Campaign là tên của chiến dịch Google Ads hoặc chiến dịch tùy chỉnh mà bạn đã tạo cho trang web của mình.

![2021-09-21_21-58.png](https://images.viblo.asia/c0c3ee75-114d-4661-9228-30484730679e.png)
Bạn có thể xem thông tin chi tiết theo medium, source hay campaign ở bảng phía dưới biểu đồ. Bạn có thể thấy các thông tin về tỉ lệ tương tác, thời gian tương tác... của người dùng được giới thiệu qua các phương tiện. Từ đó, bạn có thể đánh giá sự hiệu quả cũng như phát triển chiến lược marketing phù hợp với trang web.

Ngoài những thông tin mặc định, bạn hoàn toàn có thể tùy chỉnh thêm các thông tin khác cho bảng biểu này.

### Engagement - Mức độ tương tác
Tab `Engagement` chứa thông tin về hoạt động, tương tác của người dùng thông qua việc thu thập các `event` được kích hoạt trong lúc người dùng sử dụng trang web của bạn.

![2021-09-21_22-14.png](https://images.viblo.asia/bc718c72-9c10-4af4-80f1-e8f6d7cb49f3.png)

Mặc định, GA tự động thu thập cho chúng ta các sự kiện cần thiết trên trang web như `page_view`,  `user_engagement`,... Từ những `event` này, chúng ta có thể thấy được số lượng view, tương tác,... trong từng mục của trang web
![2021-09-21_22-24.png](https://images.viblo.asia/937921fd-8724-4710-b20e-62adf07455f2.png)
Ngoài ra, bạn có thể tự tạo và kích hoạt `event` tùy ý thông qua thư viện mà GA đã cung cấp. Nếu sử dụng `gtag.js`, bạn có thể sử dụng hàm `gtag("event", "EventName", payload)` để kích hoạt sự kiến tới GA:
```js
$('.orderContact').on('click', function (e) {
    gtag("event", "NhanNutLienHe", {
        type: 'Nút đặt hàng',
        from_url: window.location.pathname,
    });
    location.replace('/#contact')
})
```
Đối với các sự kiện quan trọng, bạn có thể đánh dấu chúng là `conversion - lượt chuyển đổi` tại **Configure > Events**
![2021-09-21_22-29.png](https://images.viblo.asia/543b2fae-2153-4af2-8dd0-a7495bc05e46.png)
Các `events` được đánh dấu là `conversions` sẽ xuất hiện trong tab `Engagement > Conversions` để tiện theo dõi.
![2021-09-21_22-35.png](https://images.viblo.asia/329549a2-d0dc-439b-a52b-82ef265a7834.png)

## Retention - Tỷ lệ giữ chân
Tab `retention` hiển thị thông tin về lượng người dùng cũ và người dùng mới cũng như tỷ lệ giữ chân - tỷ lệ người dùng cũ quay lại sử dụng trang web. Những thông tin này giúp bạn theo dõi và đưa ra những phương án hợp lý để thu hút người dùng tiếp tục quay lại sử dụng trang web.
![analytics.google.com_analytics_web__authuser=3 (1).png](https://images.viblo.asia/afe511f0-3b84-43e4-ab55-0ab1fc82eef2.png)
## Demographics - Nhân khẩu học
Thông tin của nhóm người dùng - khu vực địa lý, độ tuổi, giới tính, sở thích... sẽ được thể hiện trong tab `demographics`. Những thông tin này vô cùng quan trọng trong việc xác định nhóm đối tượng khách hàng quan tâm, phù hợp với dịch vụ, sản phẩm mà bạn cung cấp.
![2021-09-21_22-49.png](https://images.viblo.asia/0bd5e817-7c34-493a-8dc4-dfa5cf4a98d0.png)
# Kết luận
Trong bài viết này, mình đã hướng dẫn các bạn cách cài đặt và giới thiệu một số thành phần cơ bản của Google Analytics. Cảm ơn các bạn đã đọc bài viết của mình và đừng quên upvote nếu thấy hữu ích nhé :thumbsup: