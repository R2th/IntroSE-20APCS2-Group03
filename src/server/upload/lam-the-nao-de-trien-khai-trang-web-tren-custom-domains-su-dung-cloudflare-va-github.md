Bạn đã từng xây dựng một trang web đẹp và đang tìm cách lưu trữ trang web miễn phí với một Custom Domains? Bạn muốn đưa website của mình lên host nhưng chi phí hạn hẹp? Trong bài viết này, mình sẽ chia sẻ cách để chia sẻ trang web của bạn sử dụng hai công cụ miễn phí là : **Github Pages** và **Cloudflare.** 
## Giới thiệu Cloudflare
**Cloudflare** là một **CDN** - nhà mạng phân phối nội dung. Nó lưu trữ trang web của bạn trên các máy chủ của mình trên toàn thế giới. Điều này có nghĩa là nó sẽ được truy cập nhanh hơn khi mọi người truy cập vào trang web của bạn ở bất cứ nơi đâu. Ngoài ra, nó cũng bảo vệ trang web của bạn khỏi những người tấn công khiến trang web của bạn không thể hoạt động với các con bot tự động truy cập khiến băng thông của bạn bị tiêu hao (DDOS attacks). Bạn có thể tìm hiểu thêm thông tin tại [đây](https://support.cloudflare.com/hc/en-us/articles/205177068-Step-1-How-does-Cloudflare-work-)
## Tại sao là Cloudflare?
Có một số lý do để sử dụng Cloudflare. Đầu tiên là nó **miễn phí**.  Tiếp đến, nó có trình quản lý DNS đơn giản cho phép bạn thiết lập mail và tên miền phụ. Thêm nữa, được tích hợp sẵn trình quản lý miền HTTPS. Nó tự động minify asset tĩnh trang web của bạn, tăng tốc độ truy cập trang web của bạn. Bạn có thể tham khảo các tính năng của Cloudflare dưới đây:

![](https://images.viblo.asia/6f97b810-43d5-4a75-8f78-1990f63628c9.png)

## Giới thiệu Github
Github nổi tiếng với tính năng lưu trữ code. GitHub ban đầu được thiết kế như một cách để lưu trữ  các dự án nguồn mở và trang về bản thân họ. Kể từ khi phát hành, nó được phát triển thành một nền tảng rất linh hoạt để lưu trữ nội dung trong môi trường production. Github đáng tin cậy, mạnh mẽ, nhanh chóng và tuyệt vời để phục vụ hầu hết các loại trang web tĩnh cá nhân và công ty. "GitHub Pages là một dịch vụ lưu trữ trang web tĩnh. Nó được thiết kế để lưu trữ các trang web cá nhân, tổ chức hoặc dự án của bạn trực tiếp từ kho lưu trữ GitHub." - Đó là mô tả về Github. Bạn có thể tìm hiểu thêm thông tin tại [đây](https://help.github.com/articles/what-is-github-pages/)

## Trang web tĩnh là gì?
Hiểu theo cách đơn giản nhất thì các trang tĩnh bao gồm HTML, CSS và Javascript thuần túy và không sử dụng cơ sở dữ liệu. Trái ngược với các trang web dựa trên cơ sở dữ liệu, liên tục thay đổi nội dung phụ thuộc vào người dùng (như Facebook hoặc Twitter), các trang web tĩnh hiển thị cùng một thông tin cho mọi khách truy cập.

## Những yêu cầu trước khi bắt đầu?
Trước khi bắt đầu, hãy chắc chắn rằng bạn đáp ứng đủ các yêu cầu sau:
- Có kho lưu trữ Github và môi trường triển khai sử dụng các trang Github. Bạn sẽ tạo một url với cấu trúc như sau:
"https://username.github.io/nameoftherepository"
- Tài khoản Cloudflare. Bạn có thể đăng ký tại [đây](https://dash.cloudflare.com/sign-up)
- Custom domain bạn đã mua từ nhà cung cấp tên miền như NameCheap, HostVNHostVN

## Deploy trang web của bạn bằng Github

### Bước 1: Đẩy code lên Github

Chúng ta nên có một kho lưu trữ trên Github và một môi trường triển khai sử dụng các trang Github. Chúng ta triển khai bằng cách sử dụng Github Pages khi chúng ta thực hiện việc push lên nhánh **"gh-pages"**.

![](https://images.viblo.asia/7ba53a86-9658-47e5-a335-f9baa4e96827.png)

### Bước 2: Deploy trang web dùng Github
Chọn tùy chọn **"Settings"** từ menu điều hướng của Github. Đó là tùy chọn cuối cùng. Khi bạn đang ở trong **"Settings"**, di chuyển đến khu vực Github Pages và chèn tên miền tùy chỉnh của bạn và bấm vào nút **"Save"**.

![](https://images.viblo.asia/c31ed623-8e9a-4bb4-81fb-36957812317f.png)

## Deploy trang web của bạn bằng Cloudflare

### Bước 1: Thêm Custom Domains
Đăng nhập vào tài khoản Cloudflare của bạn và thêm Custom Domains để quét DNS.

![](https://images.viblo.asia/1aa7aaee-1107-45f9-bedd-5ea8f2c038de.png)

Sau khi bạn nhấp vào nút **"Scan DNS Records"**, sẽ có một thanh tiến trình.
Bạn bấm vào **"continue button"** khi thanh tiến trình sẽ kết thúc. Sau đó chèn **DNS** và **CNAME** cần thiết. Chúng ta sẽ có cấu trúc như sau:

![](https://images.viblo.asia/f7eb7910-d0c1-4a3d-967e-045d2c6f95b8.png)

### Chú ý: 
- **A** và **[CNAME](https://support.dnsimple.com/articles/cname-record/)** là hai cách phổ biến để ánh xạ tên máy chủ đến một hoặc nhiều địa chỉ IP.

- Bản ghi A chỉ tên cho một IP cụ thể, khi IP được biết và ổn định . Trong trường hợp của chúng ta, tên yourdomain.com trỏ đến máy chủ 192.30.252.153

- Bản ghi CNAME chỉ tên cho một tên khác, thay vì một IP. Nguồn CNAME đại diện cho một bí danh cho tên mục tiêu và kế thừa toàn bộ chuỗi phân giải của nó. Trong trường hợp của chúng tôi, chúng tôi sử dụng Github Pages và chúng tôi đặt www là CNAME của astephannie.github.io
- Trong bước này, chúng ta đang thiết lập hai **“Bản ghi A DNS”**, điều này là cần thiết vì chúng ta đang liên kết giữa Cloudflare và Github Pages. Từ bây giờ, tất cả các yêu cầu tới yourdomain.com sẽ được chuyển đến trang web tĩnh trên Github. Nhấp vào nút **"Continue"** để chuyển sang bước tiếp theo.

### Bước 2: Chọn Cloudflare plan
Chọn plan Cloudflare bạn muốn. Trong trường hợp của chúng ta, chọn **"Free Website"** và nhấp vào nút **"Continue"**.

![](https://images.viblo.asia/2a13d420-00e4-4ad9-9611-1a4bf375c65f.png)

### Bước 3: Cập nhật Nameservers trên trang domain dashboard
Sao chép Nameservers từ Cloudflare và dán chúng trên domain dashboard của bạn.

![](https://images.viblo.asia/c59979ce-08c8-4d02-95a2-1fcb69ca5396.png)

Ví dụ, chúng ta có một miền của godaddy.com. Chúng ta cần truy cập vào miền của mình và thay đổi Nameservers.

![](https://images.viblo.asia/1293aa79-9717-4c99-ae93-b4e0742fb885.png)

 Kết quả là chúng ta sẽ rơi vào trạng thái chờ.

![](https://images.viblo.asia/2a4f58be-6130-4db1-9d89-595e16997f55.png)

Sau khi trạng thái thay đổi chúng ta sẽ được thành quả như sau:

![](https://images.viblo.asia/f29b52ac-6fa2-4295-abd0-6a8df4833dd8.png)

### Bước 4: Thiết lập Minification website assets

Chọn tùy chọn **"speed"**, nó nằm trên thanh điều hướng Cloudflare và chọn **"Javascript - CSS - HTML"**, các tệp tin chúng ta muốn được minify.

![](https://images.viblo.asia/8387c987-8e0c-4624-9f8a-ada91ef2b99a.png)

Ngoài ra, Cloudflare còn có các tuỳ chọn khác khiến tăng tốc độ trang web, bạn có thể tự mình khám phá nó. 

## Kết luận
Như vậy trong bài viết này mình đã giới thiệu cách giúp các bạn deploy website của bạn lên Custom Domain sử dụng Github Pages và Cloudflare. Cảm ơn các bạn đã đón đọc bài viết của mình!

**Nguồn tham khảo:** https://medium.com/crowdbotics/annie-azana-how-to-deploy-websites-using-cloudflare-and-github-pages-c415c55fea36