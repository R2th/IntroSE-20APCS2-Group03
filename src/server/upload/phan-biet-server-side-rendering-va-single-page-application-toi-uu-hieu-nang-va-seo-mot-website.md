## Phân biệt Server Side Rendering
### 1. Server Side Rendering. 
- Hầu hết các logic (validation, đọc dữ liệu, chuyển trang, render ...) sẽ được xử lý ở server.
- Cơ chế hoạt động:
    + Khi người dùng vào một trang web, trình duyệt sẽ gửi GET request tới web server.
    + Web server sẽ nhận request, đọc dữ liệu từ database.
    + Web server sẽ render HTML, trả về cho browser để hiển thị cho người dùng.
    
![image.png](https://images.viblo.asia/12606b85-b6e6-4836-b6ee-f23c4707af85.png)
- Ưu điểm:
    + Hỗ trợ rất mạnh về SEO, vì khi bot của Google, Bing vào web sẽ thấy toàn bộ dữ liệu dưới dạng HTML.
    + Initial load nhanh, dễ otpimize, vì toàn bộ dữ liệu đã được xử lý ở server. Client chỉ việc hiển thị.
    + Rất tốt đối với các static page.
    + Các web framework từ xưa đến nay đều hỗ trợ cơ chế này.
    + Dễ hiểu và dễ code hơn. Developer chỉ cần code 1 project web là được, không cần phải tách ra front-end và back-end.
- Nhược điểm:
    + Trang web sẽ phải xử lý lại hoàn toàn và load lại dữ liệu khi có một thay đổi nhỏ.
    + Nặng server vì phải xử lý nhiều logic.
    + Tương tác không tốt như Client Side rendering vì trang phải refresh, load lại nhiều lần.
    + Lượng request lên server nhiều...
### 2. Single Page Application
- Ứng dụng nằm trong 1 page duy nhất. Tức là việc render HTML, CSS sẽ được thực hiện ở client (Tức JavaScript ở trình duyệt). Vì vậy front-end xử lý logic cơ bản (validation, đọc dữ liệu, chuyển trang, render ...) và back-end xử lý logic phức tạp (thanh toán, phân quyền) có thể tách biệt hoàn toàn và làm việc thông qua API. API là bản lề để nối giữa back-end và front-end. API là một cái lõi của Single Page Application thường gặp là RESTful API và GraphQL (mới nổi gần đây).

![image.png](https://images.viblo.asia/35e2e5a3-6e31-468f-abfe-851542b874c7.png)
- Ưu điểm:
    + Không tốn tài nguyên hệ thống vì máy của client sẽ chịu trách nhiệm render
    + Do tách biệt front-end với back-end và chỉ giao tiếp qua API giúp cho gửi và trả dữ liệu giữa client và server giảm đến mức tối thiểu.
    + Single page sẽ rất nhanh. Vì các tài nguyên tĩnh như HTML, CSS, Script chỉ được tải 1 lần duy nhất.
    + Tăng trải nghiệm người dùng
- Nhược điểm:
    + SEO sẽ bị ảnh hưởng do nội dung web được sinh ra trên client.
    + Việc phát triển cũng sẽ rất phức tạp hơn nhiều so với web truyền thống.
    + Trình duyệt sẽ phải xử lý nhiều, nên vấn đề hiệu năng sẽ cần phải chú ý.
## Các cách tối ưu hóa hiệu năng website
### 1. Sử dụng cache
- Tận dụng bộ nhớ đệm của trình duyệt là cần thiết cho nội dung ít khi thay đổi. Người ta khuyến khích bộ nhớ có thời gian tối đa 7 ngày cho những trường hợp như vậy. Có những loại header HTTP khác nhau như là:
    + Cache-control
    + Pragma
    + Expires
    + Validators
- Một trong các HTTP cache header quan trọng có lẽ là Cache-Control, một header bao gồm một bộ các lệnh cho phép bạn định nghĩa một phản hồi nên được lưu đệm khi nào/ như thế nào và bao lâu. HTTP caching xảy ra khi trình duyệt lưu trữ các bản sao của tài nguyên để truy cập nhanh hơn. Điều này có thể tận dụng để triển khai HTTPS.
- Bộ nhớ đệm Server
    + Có nhiều dạng server-side caching khác nhau khi nói đến tối ưu hiệu năng website. Điều này thường gặp ở các trang có lượng traffic cao. Varnish cache là một ví dụ rất lợi hại khi kết hợp với một plugin cache và CDN.
### 2.Tối ưu hình ảnh
- Kích thước: 
    + Crop bức ảnh về một kích thước chuẩn cho nó.(không nên load một bức ảnh với kích thước 2000px và đặt giá trị width=570px cho website có chiều rộng 570px.
- Dung lượng:
    + 1 tấm ảnh quá nặng có thể khiến blog, website chậm hơn, nhiều lúc độc giả không đủ kiên nhẫn để chờ hình ảnh load xong vì vậy cần giảm kích thước của ảnh một cách phù hợp nhất, vì ảnh chất lượng không tốt cũng ảnh hưởng đến trải nghiệm người dùng
- Định dạng: 
    + Định dạng tốt nhất là JEPG, PNG cũng tốt nhưng các browser thế hệ cũ không hỗ trợ đầy đủ dạng này.
    + Tránh sử dụng các src rỗng vì browser vẫn thực hiện một request tới tập tin website
- Tối ưu hóa css
    + Minify file css.( Loại bỏ khoảng trắng không cần thiết, dấu xuống hàng, dấu chấm phẩy…)
    + Khai báo class bổ trợ như bootstrap, để có thể tái sử dụng
    + Viết code ngắn gọn để thiết lập các thuộc tính
    + Hạn chế dùng inline
    + Giảm số file CSS
## Phương pháp SEO On-Page
### 1. Sử dụng thẻ <title/>
- Dùng để định nghĩa tiêu đề cho trang giúp cho users và search engines biết được nội dung mà trang web hướng đến.
- Thẻ title nên chứa một keyword chính.
- Thẻ title phải phản ánh chính xác chủ đề mà trang hướng đến.
- Thẻ title nên ngắn gọn, không vượt quá 70 kí tự.
### 2. Sử dụng thẻ meta description
- Thẻ meta description HTML dùng để mô tả ngắn gọn và chính xác tổng quan nội dung mà
trang đề cập tới và giúp các search engines nhận biết được chủ đề mà trang hướng đến.
- Thẻ meta description nên chứa một vài keywords chính, nhưng đừng lạm dụng nhồi nhét
quá nhiều keywords.
- Thẻ meta description cần phản ánh chính xác nội dung tổng quan mà trang hướng đến
- Độ dài của description không nên vượt quá 160 kí tự
### 3. Sử dụng các thẻ Heading (h1 -> h6)
- Thẻ Heading trong SEO có 6 loại từ h1 đến h6. Theo thứ tự ưu tiên thì tầm quan trọng sẽ
giảm dần. Thông thường thẻ được sử dụng nhiều nhất là h1, h2, h3. Đây là 3 thẻ được sử
dụng nhiều trong việc tối ưu Website. Khi sử dụng thẻ Heading trong SEO, Search Engines sẽ
hiểu được đâu là nội dung chính của website, lưu ý không nên lạm dụng quá nhiều thẻ h1
trên 1 page.
- Tránh in nghiêng hoặc gạch chân
### 4. Broken Links
- Không được để internal links, external links của các trang ngừng hoạt động, phải đảm bảo
chúng hoạt động tốt vì broken links sẽ ảnh hưởng đến trải nghiệm người dùng và ranking
của trang trên các bộ máy tìm kiếm.
### 5. Alt attribute image
- Nếu Image không thể hiển thị( internet chậm, đã bị xóa…) thì thuộc tính alt của thẻ img sẽ
cung cấp thông tin thay thế, thông tin này sẽ giúp cho users và search engines hiểu hơn về
nội dung ảnh.
### 6. Các thẻ HTML5
- Sử dụng các thẻ HTML5 header, footer, main, section, nav, article, aside,... thay thế các thẻ
div, span truyền thống qua đó tạo trang có ngữ nghĩa hơn cho các search engines.
### 7. Inline CSS
- Inline CSS property được sử dụng trong style attribute của thẻ HTML, loại bỏ inline CSS sẽ
cải thiện tốc độ load và dễ maintenance hơn.
### 8. SEO friendly URL
- Nên tối ưu hóa url của page, các search engines sẽ craw các keywords trên url.
- URL hiệu quả chứa keywords liên quan, không nên chứa space, kí tự đặc biệt, tham số.
### 9. Thẻ meta Open Graph
- Là thẻ cung cấp thông tin trang web. Mục đích của thẻ OG là để giúp các trang MXH như FB,
Twitter… xác định được thông tin chính về trang web của bạn và hiển thị thông tin đó khi ai
đó chia sẻ trang web.
- “og:url” Url của trang web đang được mô tả (Dưới title và ẩn trong image)
- “og:title” Nhan đề của trang web sẽ đc hiển thị ( Nếu không có thì sẽ lấy từ thẻ title)
- “og:type” Mô tả loại đối tượng thông tin mà muốn chia sẻ (vd: Bài viết (Article))
- “og:image” Thể hiện ảnh đại diện trang web khi chia sẻ trang web( Nên chọn ảnh phù hợp
và hấp dẫn người xem)
- “og:description” Như thể meta description. Tại đây tóm tắt nội dung chính của trang chia sẻ
- Xem thêm nhiều property ở đây
- Một số công cụ để tạo nhanh mã
- https://smallseotools.com/open-graph-generator/
- https://webcode.tools/open-graph-generator
- https://www.duplichecker.com/open-graph-generator.php
### Các cách triển khai noindex cho trang web khỏi bị thu thập dữ liệu từ các công cụ tìm kiếm
### 1. Dùng thẻ <meta/>
- Đặt thẻ meta sau vào phần <head> của trang: <meta name=”robots” content=”noindex”>
- Đặt thẻ <meta name=”googlebot” content=”noindex”> để chặn riêng trình thu thập dữ
liệu của google. 

### 2. Tiêu đề phản hồi HTTP
- Thay vì dùng thẻ meta, bạn cũng có thể trả về một tiêu đề X-Robots-Tag với giá trị noindex hoặc none trong phản hồi. Sau đây là một ví dụ về phản hồi HTTP chứa X-Robots-Tag hướng dẫn các trình thu thập dữ liệu không lập chỉ mục một trang
```
HTTP/1.1 200 OK
(…)
X-Robots-Tag: noindex
(…)
```
 [Đọc thêm về tiêu đề phản hồi](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag?hl=vi#xrobotstag)

### Tài liệu tham khảo
- https://support.google.com/webmasters/answer/114016?hl=vi
- https://support.google.com/webmasters/answer/7451184?hl=vi
- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization
- https://developers.google.com/web/fundamentals/design-and-ux/responsive/images