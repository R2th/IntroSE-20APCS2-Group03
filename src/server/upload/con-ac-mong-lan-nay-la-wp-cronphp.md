**Một điều quan trọng mà tôi có với WordPress là triển khai wp-cron.php mặc định. Nếu bạn đã quen với cách WordPress sử dụng wp-cron.php theo mặc định, bạn có thể sẽ thay đổi ý định sau khi đọc bài viết này.**

<img src="https://vnhackernews.com/wp-content/uploads/2020/09/1V8305Lnz2Ga0wP7yxuLm-w.png" alt="" class="wp-image-77200"/>


### wp-cron.php là gì &amp; nó hoạt động như thế nào?

Tệp wp-cron.php là một phần của WordPress xử lý các sự kiện đã lên lịch trong một trang WordPress. Bất cứ điều gì liên quan đến việc lên lịch cho các bài đăng hoặc ấn phẩm và thực sự là bất cứ thứ gì theo định hướng ngày/giờ đều được điều chỉnh bởi tệp wp-cron.php.

Để wp-cron.php hoạt động bình thường, nó cần được thực thi thường xuyên, nhưng không quá một lần mỗi phút. Tuy nhiên, hành vi mặc định không yêu cầu bạn thiết lập cron job cấp hệ thống thực trên máy chủ của bạn. Thay vào đó, nó sử dụng phương thức piggyback trên mọi yêu cầu đến. Khi một yêu cầu đến trang web, WordPress sẽ tạo thêm một yêu cầu từ chính nó đến tệp wp-cron.php qua HTTP(S). Nghe có vẻ khá vô thưởng vô phạt, phải không?

### Tại sao để cấu hình mặc định cho wp-cron.php lại là ác mộng?

Phương thức mặc định làm việc hoàn toàn tốt trên một trang web nhỏ với rất ít người truy cập mỗi giờ. Tuy nhiên, khi được triển khai trên một trang web vừa hoặc lớn hơn hoặc thậm chí là một trang web đang được rà quét bởi bot (điều này rất phổ biến hiện nay), điều này có nghĩa là bạn nhận được gấp đôi bất kỳ lưu lượng truy cập nào bạn đang xử lý. Nó trở thành một cuộc tấn công DDoS thô sơ chống lại chính bạn. Điều này là do cron đang được thực thi nhiều lần một phút bằng cách sử dụng HTTP request(yêu cầu HTTP). Yêu cầu HTTP tạo thêm chi phí bằng cách tạo, thương lượng và thiết lập kết nối qua socket mạng. Nó thậm chí còn ảnh hưởng đến dung lượng hiệu quả của máy chủ web bên dưới của bạn. Giải pháp này không hoạt động tốt trong hầu hết các tình huống và thành thật mà nói, nó nên bị loại bỏ làm hành vi mặc định do xu hướng bị lạm dụng hoặc biến thành vectơ tấn công trên máy chủ chỉ từ lưu lượng truy cập thông thường.

### Liệu có các lựa chọn thay thế?

Giải pháp thay thế thực sự duy nhất và hiệu quả là cấu hình cronjob hệ thống là thực thi tập lệnh wp-cron.php trực tiếp thông qua code PHP mỗi phút. Điều này đảm bảo rằng mọi tác vụ đã lên lịch thực sự được thực thi vào thời gian đã định của chúng. Nó cũng không nên được thực hiện thông qua yêu cầu HTTP mà là thực thi trực tiếp PHP để tránh cản trở dung lượng của máy chủ web hoặc tạo thêm chi phí bộ nhớ trên lớp mạng.

### Làm cách nào để tắt hành vi wp-cron.php mặc định?

Điều này khá phổ biến và đơn giản để làm. Bạn cần cập nhật tệp wp-cronfig.php của mình như sau:

```
define('DISABLE_WP_CRON', true);
```


<ul><li><em>Bạn thường có thể tìm thấy tệp wp-config.php của mình trong thư mục public_html của trang web.
</em></li><li><em>Thiết lập mới này sẽ được đặt trong tệp ngay sau dòng cơ sở dữ liệu DB_COLLATE trông giống như sau</em></li></ul>

```
define('DB_COLLATE', '');
```

### Làm cách nào để thiết lập cronjob hệ thống?

Điều này đơn giản trong cPanel, giả sử nhà cung cấp dịch vụ lưu trữ của bạn đã bật tính năng cron job trên tài khoản của bạn. Trong <a href="https://documentation.cpanel.net/display/70Docs/Cron+Jobs">cPanel Cron Jobs Documentation</a> có nói chi tiết về vấn đề này, cụ thể là:

<ol>
 <li>Đăng nhập vào cPanel từ domain của bạn: <em>yourdomain.tld/</em>cpanel</li><li>Nhập “cron” vào hộp tìm kiếm nhanh gần đầu trang.</li>
   <li>Click “Cron Jobs” icon.</li></ol>

<ul><li>Nếu nó không xuất hiện, tài khoản của bạn chưa bật tính năng Cron Jobs và bạn sẽ cần nói chuyện với nhà cung cấp dịch vụ lưu trữ của mình để được trợ giúp thiết lập cron hoặc chuyển sang gói bao gồm tính năng Cron Jobs.</li></ul>

<ol><li>Hãy chú ý đến trang Cron Jobs, nó sẽ cung cấp cho bạn vị trí chính xác của tệp nhị phân PHP của bạn. Bạn sẽ cần sao chép đường dẫn đó vào hộp lệnh(command box) ở cuối trang và thay đổi tệp đang được PHP thực thi thành tệp /home/username/public_html/wp-cron.php của bạn. Sử dụng đường dẫn đầy đủ.</li><li>Chọn entry đầu tiên (“*”) cho mỗi tham số. Thao tác này sẽ thực thi tệp wp-cron.php mỗi phút.</li><li>Nhấp vào nút thêm cron và bạn đã hoàn tất.</li></ol>

### Tại sao bạn lại làm cách làm này một cách khó khăn, nó có vẻ hợp lý và có cách dễ hơn trong việc khắc phục?

Tôi tin rằng các kỹ sư phần mềm phát triển thế giới kỹ thuật số của chúng ta phải tự gây ấn tượng với họ về tinh thần trách nhiệm đối với sản phẩm của họ. WordPress ngày nay phổ biến và với phần mềm cài đặt tự động, như Softaculous, WordPress được cài đặt trên phần lớn các trang web. Chúng được cài đặt với hành vi mặc định được bật, về cơ bản là một vectơ tấn công trên bất kỳ máy chủ nào. Hiện nay với việc ngành công nghiệp lưu trữ đang rất thịnh hành trong cuộc sống của chúng ta, nhiều người có các trang web WordPress và không biết về vấn đề này cho đến khi nó làm tê liệt trang web của họ. Tích hợp mặc định rất thiếu và cần được gỡ bỏ. Hôm nay chỉ riêng trên một máy chủ, tôi đã tìm thấy hơn 500 lượt cài đặt WordPress khác nhau và theo dõi khi một bot tấn công từng trang web trên máy chủ. Mỗi một trong những trang web đó đột nhiên trở thành trách nhiệm pháp lý cho sự ổn định của máy chủ.

Tôi nhận thấy rằng vấn đề này được xử lý theo từng trường hợp. Tuy nhiên, với rất nhiều lượt cài đặt trên khắp thế giới, WordPress sẽ giải quyết tốt hơn là mọi nhà cung cấp dịch vụ lưu trữ đơn lẻ phải thiết lập các điều kiện đặc biệt trên máy chủ của họ để bảo vệ khỏi lỗ hổng mà phần mềm này tạo ra. Chi phí để loại bỏ hành vi này và buộc chủ sở hữu trang web tạo cronjob hệ thống phải là cơ sở và một thông báo được đặt trong giao diện quản trị WordPress rằng các tác vụ đã lên lịch sẽ không được thực thi cho đến khi cronjob hệ thống được tạo đúng cách. Điều này nằm trong kỹ năng lập trình của tôi, vì vậy tôi biết nó cũng nằm trong kỹ năng của họ.

WordPress hướng tới sự dễ sử dụng, vì vậy khách hàng mục tiêu của họ là những người thường biết ít về lưu trữ. Tôi tin rằng trách nhiệm ở đây hoàn toàn thuộc về WordPress để sửa chữa và họ đã đưa ra giải pháp để chống lại nó. Trong khi đó, Quản trị viên hệ thống trong ngành công nghiệp lưu trữ phải chịu đựng “tính năng” khủng khiếp này khi kiểm tra các máy chủ bị mất kiểm soát do một con bot chạy trên WordPress được thiết lập mặc định.

### Hình dung về sự điên rồ

![](https://images.viblo.asia/a8f0e99d-9e5a-4b99-8ecd-e719dda85b23.png)
*Mỗi khách truy cập trong thiết lập wp-cron.php mặc định tạo ra một kết nối phụ bắt nguồn từ máy chủ qua socket mạng tới wp-cron.php. Cứ mỗi khách truy cập trong thiết lập này làm giảm một nửa tổng thể các socket mạng có sẵn và tăng đóng góp tải của một khách truy cập lên gấp đôi so với một lượt truy cập. Giải pháp đang chạy wp-cron.php thông qua PHP thông qua cronjob hệ thống được lên lịch thường xuyên. Điều này giúp loại bỏ hoàn toàn vấn đề và theo tôi, nên là. để ngăn việc lạm dụng cài đặt mặc định trên website Wordpress.
*
Nguồn: https://medium.com/@thecpanelguy/the-nightmare-that-is-wpcron-php-ae31c1d3ae30