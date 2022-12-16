Cùng với sự phát triển của môi trường kỹ thuật số, các loại hình CMS cũng phát triển đa dạng hơn. Hôm nay chúng ta cùng nhau đi tìm hiểu sự khác nhau giữa các loại CMS

## Traditional CMS (Mô hình CMS truyền thống)
![](https://images.viblo.asia/8070f087-01f5-4b38-b8bf-0192ff765789.png)

Trong một CMS truyền thống, mọi thứ được đóng gói với nhau, và về mặt kỹ thuật, mọi tầng ví dụ frontend (design, layout), backend (source code) và tầng lưu trữ (database) đều liên kết với nhau rất chặt chẽ. Việc quản lý CMS Backend được ràng buộc trong cùng một hệ thống cung cấp nội dung hoặc Frontend. Các biên tập viên tạo và xuất bản nội dung trong phần Backend của một trang Web đang làm việc trên phần mà khách truy cập trang Web sẽ xem. Ngoài ra, tất cả các ứng dụng thiết kế và tùy chỉnh trang Web cũng được lưu trữ trong phần Backend. Ví dụ với WordPress, khi download và sử dụng, bạn sẽ nhận được mọi thứ như sau trong 1 gói sản phẩm:

* Một theme (bao gồm HTML, CSS, JavaScript) được chuẩn bị sẵn. Có rất nhiều file dạng frontend này để thể hiện trang web.
* Một database định nghĩa sẵn (Với WordPress là MySQL). Lưu ý rằng, các lập trình viên có thể thay đổi schema của database nhưng đồng thời cũng phải thay đổi code để trang web có thể hoạt động được.
* Mã nguồn (PHP) lập trình sẵn toàn bộ các chức năng của trang web. Với người dùng bình thường, thì phần này có nhiệm vụ lấy dữ liệu từ database và chuyển nó cho theme để hiển thị.

Nếu một người truy cập trang web sử dụng WordPress ở trên, quá trình xử lý có thể mô tả như dưới đây:
* Dữ liệu thô về các bài viết được lấy ra từ database bởi code PHP.
* Sau đó dữ liệu này được truyền sang cho theme.
* Theme (bao gồm HTML, CSS, JavaScript) có nhiệm vụ chuyển dữ liệu thô thành HTML và hiển thị cho người dùng.

Để quản lý các nội dung của trang web (ví dụ các bài blog), các CMS truyền thống thường có 1 dashboard cho phép quản trị viên có thể dễ dang thêm bớt nội dung cũng như chỉnh sửa việc hiển thị trang web cho người dùng.

Như đã nói ở trên, mô hình CMS truyền thống này đã tồn tại rất lâu. WordPress, một đại diện tiêu biểu cho CMS truyền thống đã được phát triển đâu đó vào năm 2003, đến nay đã được 18 năm. Tuy nhiên, thế giới công nghệ luôn phát triển không ngừng, và nhu cầu của người dùng cũng thay đổi theo. Do đó, trong nhiều trường hợp, CMS truyền thống không thể đáp ứng được các yêu cầu về hiệu suất, sự mềm dẻo. Đó là lý do headless CMS ra đời.

## Headless CMS là gì?
Headless CMS tập trung vào việc tạo, biên tập và lưu trữ nội dung của trang web. Headless CMS phá vỡ mối liên kết chặt chẽ giữa backend và frontend. Nó chỉ lưu trữ nội dung, cung cấp một dashboard cho phép tạo và biên tập nội dung và cuối cùng là cung cấp API cho phép lập trình viên sử dụng để phát triển frontend của riêng mình. Headless CMS không cung cấp một giao diện dựng sẵn.

Nhiều nhà phát triển yêu thích Headless CMS, nhưng nó có thể làm tổn hại đến các nỗ lực tiếp thị của bạn. Trong môi trường Headless CMS, hệ thống có khả năng biên tập và quản lý nội dung nhỏ. Sau đó, nó sẽ xuất bản lên Web-Service hoặc API để có thể truyền tải nội dung tới bất kỳ hệ thống nào có truy cập Internet. Do đó, Headless CMS có thể xuất bản cùng một nội dung lên một trang Web, một ứng dụng, thiết bị di động hoặc bất kỳ thiết bị nào được kết nối qua Internet of Things (IoT). Lý do là bởi nội dung không bị ràng buộc bởi cấu trúc nội dung được xác định trước.

Một CMS Headless CMS bao gồm:
* Một chương trình phụ trợ quản lý nội dung (Content Management Backend).
* Một API.
* Không có giao diện xuất bản nội dung Drontend xác định trước và có thể xuất bản lên bất kỳ thiết bị nào được kết nối qua IoT.

## Ưu và nhược điểm của 2 CMS này
### CMS truyền thống
##### Ưu điểm
* Ưu điểm lớn nhất của CMS truyền thống là nó đã quá quen thuộc với cả người dùng và lập trình viên. Nên để bắt đầu với nó là một điều khá dễ dàng
* Mọi thứ được đóng gói vào 1 hệ thống, rất dễ dàng để quản trị trang web bao gồm cả nội dung và giao diện
* Một người ít hiểu biết về kỹ thuật, không biết về lập trình cũng có thể sử dụng được
##### Nhược điểm
* Gò bó, không mềm dẻo khi mọi thứ đều được đóng gói sẵn mà bạn chỉ có thể customize một phần của nó mà thôi
* Chỉ có thể tạo ra website (mặc dù cùng nội dung có thể được hiển thị ở các thiết bị khác nhưng sẽ khó khăn)
* Thường hiệu suất không cao do khả năng scale kém (vì các thành phần dính liền vào nhau)
* Yêu cầu lập trình viên phải có hiểu biết về CMS đang làm việc, đổi sang CMS khác gần như phải học lại từ đầu.
* Lượng code lớn, rất tốn chi phí để maintain
##### Các trường hợp nên dùng CMS truyền thống
* Bạn muốn xây dựng một website mới và không nhu cầu tìm hiểu sâu về công nghệ đằng sau
* Bạn đã có hiểu về về một CMS nhất định (ví dụ WordPress và ngôn ngữ PHP)
* Bạn có thể thuê gia công một công ty chuyên làm CMS truyền thống (tôi biết một số công ty chuyên nhận làm WordPress hoặc Drupal) với một chi phí hợp lý
* Bạn chỉ có 1 trang web chạy độc lập và không có nhu cầu liên kết với các hệ thống khác. Lưu ý rằng các CMS truyền thống mặc dù khó liên kết với hệ thống ngoài do thiếu API nhưng nó lại có thể dễ dàng cài đặt thêm plugin để làm việc đó (tuy nhiên hiệu suất không so được với headless CMS)

### Headless CMS
##### Ưu điểm
* Nội dung có thể được hiển thị ở bất kỳ đâu
* Lập trình viên không cần quan tâm đến backend và chỉ cần tập trung vào frontend
* Có thể tự do sử dụng ngôn ngữ, thư viện hay framework nào để lập trình
* Dễ dàng tạo và biên tập nội dung và không cần lo lắng về các thành phần khác (ví dụ frontend) do mọi thứ được xây dựng không phụ thuộc vào nhau

##### Nhược điểm
* Không thể preview nội dung (mặc dù có nhiều CMS vẫn cho làm việc này nhưng sẽ cần phải thao tác rất nhiều)
* Sẽ khó khăn khi bắt đầu, và sẽ tốn công sức cho các thao tác tích hợp, cấu hình CMS và lập trình frontend

##### Các trường hợp nên dùng headless CMS
* Trang web cần sử dụng các framework JavaScript mới như React, Angular or VueJs
* Bạn có nhu cầu hiển thị nội dung trên nhiều loại thiết bị khác nhau như website, mobile app, IoT, v.v...
* Bạn có sẵn một website hoặc ứng dụng sử dụng những công nghệ hiện đại (Node.js, Django, React, Vue) và muốn thêm tính năng blog và một số tính năng CMS khác
* Bạn muốn lập trình viên tập trung vào kỹ thuật và mọi người đang làm việc thay vì mất thời gian vào việc tích hợp công nghệ đó với một công nghệ khác (sử dụng bởi CMS)
* Bạn muốn trang web của bạn dễ dàng maintain và scale
* Bạn muốn kiểm soát ở mức tối đa việc nội dung sẽ được hiển thị như thế nào

## Kết luận
Không có cầu trả lời chính xác headless CMS hay CMS truyền thống là tốt hơn. Nó phụ thuộc vào từng bài toán cụ thể, và cần được xem xét kỹ lưỡng từng khía cạnh. Hy vọng bài viết này sẽ cho các bạn những hiểu biết cơ bản về CMS và bạn sẽ có lựa chọn cho mình khi gặp bài toán tương tự. Trên đây là ý kiến cá nhân của mình qua sự tìm hiểu của bản thân. Nếu có gì sai sót mong các bạn đóng góp qua phần cmt nhé.

Nếu thấy bài viết có hữu ích hãy tặng mình một upvote nha 😀😀😀. Cảm ơn các bạn đã theo dõi.