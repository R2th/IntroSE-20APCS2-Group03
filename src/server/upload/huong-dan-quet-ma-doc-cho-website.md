**Mã độc được tạo ra với mục đích gây hại cho website, máy tính và người sử dụng. Bài viết này sẽ tập trung phân tích và hướng dẫn cách quét mã độc cho website của mình.**
Đối với website, mã độc được sử dụng để đánh cắp thông tin của khách hàng, giữ thông tin của website để đòi tiền chuộc hoặc chiếm quyền kiểm soát. Hàng ngày, hơn một triệu mối đe doạ từ mã độc mới được phát hành. Vì vậy tất cả các chủ sở hữu website cần biết cách quét mã độc và làm sạch mã độc sớm nhất có thể.

Để bảo vệ website của bạn một cách chủ động và toàn diện. Có hai cách chính:

* Đầu tiên: Tìm hiểu về bảo mật website để chủ động loại bỏ mã độc cũng như tăng tường bảo mật cho website.
* Cách thứ hai và hiệu quả với mọi người: Sử dụng trình quét website để phát hiện và bảo vệ tự động cho website. Các phần mềm này được cập nhật liên tục bởi các chuyên gia sẽ giúp bạn đủ sức để chiến đấu với mã độc và tin tặc.
Nếu bạn đang gặp các vấn đề về bảo mật cho website, chúng tôi có một số hướng dẫn dành cho bạn.
![](https://images.viblo.asia/c257bf80-b651-434e-9381-e187b1846325.png)
## Hướng dẫn loại bỏ mã độc cho website
### 1. Dấu hiệu phổ biến khi website bị nhiễm mã độc
Dấu hiệu trực quan nhất để biết website của bạn bị nhiễm mã độc là: website bị xoá hoặc phá hủy, thay đổi giao diện, website bị chuyển hướng đến trang web đen, trình duyệt chặn truy cập đến website của bạn… Tuy nhiên các dấu hiệu này chỉ chiếm 15% các sự cố do nhiễm mã độc trong quý 3 năm 2017.

Tuy nhiên, phần lớn các quản trị không biết là website của mình đang bị hack. Hãy lưu ý các vấn đề sau đây:

Thông tin đăng nhập tài khoản của bạn đã được thay đổi trái phép.
Các tệp tin trên website bị sửa đổi hoặc xóa bỏ trái phép.
Website bị gián đoạn hoặc gặp sự cố không thể truy cập.
Bị cảnh báo nội dung độc hại hoặc danh sách đen trên các trình duyệt. Hoặc bị google gắn cờ “website may be hacked” trên kết quả tìm kiểm (SERP).
Website của bạn giảm nhanh hoặc tăng lưu lượng truy cập bất thường.
Nếu website của bạn có bất kỳ dấu hiệu nào ở trên, hãy làm theo các bước tiếp theo dưới đây để phát hiện và loại bỏ các loại mã độc này.

### 2. Sử dụng trình quét URL
Nếu bạn nghi ngờ rằng website của mình bị nhiễm mã độc, dùng trình quét URL để kiểm tra mã độc. Chúng tôi khuyên bạn sử dụng VIRUS TOTAL.

Ngoài ra, một sản phẩm tự động giúp bạn kiểm tra mã độc cho tất cả các URL. CyStack Scanning, với ứng dụng này bạn có thể quét mã độc cho tất cả các URL của website. Sử dụng Javascript Malware Profile để thực hiện, [bắt đầu tại đây](https://vn.cystack.net/responding/?utm_campaign=malware&utm_source=viblo).

### 3. Quét mã độc cho website trong cơ sở dữ liệu
Để làm việc này, bạn cần biết về SQL. Hãy truy cập vào công cụ quản trị cơ sở dữ liệu được cung cấp bởi máy chủ web như phpMyAdmin hoặc có thể trực tiếp vào console của cơ sở dữ liệu. Khi bạn có quyền truy cập vào công cụ, hãy kiểm tra các dấu hiệu của mã độc bằng cách sử dụng một số chữ ký (mẫu nhận diện mã độc) phổ biến sau đây.
* eval
* base64_decode
* gzinflate
* shell_exec
* GLOBALS
* error_reporting(0)
### 4. Làm sạch mã độc, spam SEO trong mã nguồn
Đầu tiên, hãy VIEWSOURCE và tìm kiếm các thẻ độc hại. Có hai loại thẻ HTML mà bạn cần kiểm tra: <script> & <iframe>. Hãy tìm kiếm bất kỳ dòng nào bắt đầu bằng “<script” và “<iframe”. Sau đó kiểm tra các URL hoặc tên tệp trong thuộc tính src. Khi tồn tại bất kỳ URL lạ, đó có thể là dấu hiệu của tội phạm mạng. Tin tặc thường chèn các thẻ SCRIPT & IFRAME vào website để nhúng mã độc hoặc các đoạn mã độc hại vào website của bạn.

Tin tặc thường để lại các đường dẫn để tạo backlink nhằm tăng Page Rank cho các website khác. Bạn nên rà soát toàn bộ mã nguồn của mình để xóa bỏ các đoạn mã trái phép này.

### 5. Quét mã độc trong tệp tin
Kiểm tra mã độc trong các tệp tin trên website một cách triệt để là tương đối phức tạp với cả những người đã biết lập trình website. Bạn có thể sử dụng các cú pháp tìm kiểm trong hệ điều hành của máy chủ với các lệnh FIND hoặc GREP. Tuy nhiên, để đảm bảo sự chính xác và triệt để, chúng tôi khuyên bạn nên sử dụng một công cụ quét mã độc tự động. Một công cụ, đang được sử dụng rộng rãi và hiệu quả là CyStack Responding App. Ứng dụng này sẽ giúp bạn phân tích tất cả các tệp tin trên website để phát hiện những tệp tin, vị trí bị lây nhiễm mã độc. CyStack Responding hỗ trợ quét với 2GB mã nguồn.
CyStack Responding được xây dựng với bộ dữ liệu hơn 10.000 loại mã độc đa dạng. 

Nếu xác định thấy malware, chủ sở hữu website sẽ được cảnh báo ngay lập tức và có thể sử dụng công cụ In-app của CyStack để làm sạch mã độc một cách dễ dàng. Đăng ký miễn phí 14 ngày [tại đây](https://vn.cystack.net/responding/?utm_campaign=malware&utm_source=viblo).
## Bạn có cần quét mã độc cho website thường xuyên?
Mã độc luôn xuất hiện mỗi ngày và sẽ liên tục gây hại cho bạn. Cách hiệu quả là hãy giữ website của mình an toàn. Hãy lưu ý các vấn đề sau đây:

* Đảm bảo website không chứa lỗ hổng, hãy quét lỗ hổng cho website của mình trước khi đưa lên hosting (hoặc máy chủ). Và duy trì việc này một cách liên tục, ít nhất là mỗi tháng.
* Chủ động rà soát, quét mã độc cho website của mình liên tục. Hãy sử dụng các công cụ quét mã độc mà bạn có thể sử dụng mỗi ngày.
* Theo dõi và giám sát hoạt động cho website 24/7, phát hiện sớm các sự cố bất thường. Việc này sẽ giúp bạn hạn chế thời gian downtime của website. Đọc bài này để hiểu hơn những thiệt hại của bạn nếu thời gian downtime kéo dài.
* Sử dụng một nền tảng tưởng lửa để ngăn chặn các cuộc tấn công của hacker.

Khi tội phạm mạng và mã độc liên tục phát triển và thay đổi. Hãy chủ động bảo mật website của mình là cách tốt nhất dành cho bạn. Hôm nay website của bạn an toàn, không có nghĩa là ngày mai sẽ không bị hack.

**Dù bạn sử dụng phương pháp thủ công để loại bỏ mã độc hay quét website tự động. Bằng cách tìm hiểu các phương pháp khác nhau, bạn đã có thêm kiến thức về bảo mật website. Website của bạn đã đến gần hơn với sự bảo mật. Để bảo vệ tuyệt đối, bạn cần một giải pháp tưởng lửa ứng dụng web để ngăn chặn các cuộc tấn công từ tin tặc và mã độc.**

Một giải pháp do một startup tại Việt Nam, mời anh em viblo sử dụng và cùng góp ý ạ. Đăng ký miễn phí [tại đây](https://vn.cystack.net).