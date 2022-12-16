# 1. OneLink là gì? 

OneLink là công cụ giúp bạn tạo ra 1 link duy nhất sẽ tự chuyển đến "Hệ điều hành tương ứng". Ví dụ PC sẽ chuyển về link cho PC, Android sẽ chuyển về link Android và tương tự cho IOS.
Các công cụ có thể giúp bạn tạo OneLink hiện tại có thể kể đến như

+ AppsFlyer: Đây có thể là cách đỉnh nhất hiện tại, tuy nhiên nó có phí, và cần phải cài đặt SDK của bên đó nên sẽ hơi phức tạp
+ OneLink to: Công cụ này hoàn toàn miễn phí, tuy nhiên không cho phép bạn custom từng link riêng lẽ trên từng hệ điều hành nên không thể tracking sâu được
+ Dynamic Link của Firebase: Đây cũng là 1 công cụ miễn phí, có thể tracking sâu cho từng chiến dịch. Không thể thay đổi link chiến dịch khi đã đăng tải và seeding xong

Mỗi công cụ đều có 1 ưu điểm và khuyết điểm riêng. Hôm nay mình mới tìm được 1 công cụ cũng khá mới có thể sẽ khắc phục các khuyến điểm trên đó là Url To Url

# 2. Url To Url là gì? 
URL To URL cũng là 1 dạng OneLink với rất nhiều ưu điểm so với các công cụ trên 
+ Dễ dàng cài đặt và sử dụng không cần phải thêm bất kỳ SDK nào
+ Có thể tracking riêng cho từng nên tảng, shortlink riêng từng nên tảng cho hiệu quả tracking dễ hơn
+ Dễ dàng **thay đổi link gốc**  sau khi đã đăng bài. Rất phù hợp với các bạn đi **seeding rồi muốn đổi link gốc**
+ Quản lý link dễ dàng bằng Google Sheets
+ Url to Url dùng chính file Google Sheets của Google nên bạn có thể tận dụng hoàn toàn các công thức và tác dụng của Google Sheets
+ Rất an toàn vì dùng chính file Google Sheets của bạn làm "server" chính nên bạn không thể lo
+ Dễ dàng phân quyền quản trị ngay trên file Google Sheets
+ Giá cả siêu rẻ chỉ 5$/ 1 năm, bạn sẽ có 30 ngày để trải nghiệm miễn phí(Lưu ý sau thời gian miễn phí nếu bạn không đăng ký gói pro tất cả link đều sẽ dẫn về link mặc định của Url To Url)

# 3. Hướng dẫn xây dựng server Onlink Với Url To Url 
## Bước 1: Cài đặt
Các bạn [vào trang này](https://sites.google.com/view/urltourl/how-to-use) để lấy file Google Sheets rồi click vào đó và chọn tạo bản sao nhé. Sau đó chọn "**Công cụ**" -> "**Trình chỉnh sửa tập lệnh**" -> "**Triển Khai**" và đồng ý các quyền. Sau đó bạn sẽ có 1 link, lưu link này lại nha
Mình vào lại file Google Sheets lúc nãy dán link đó vào sheet "setup" dán hết các cột B luôn nha cột "linkRelease"
Đến đây là xong bước cài đặt rồi. Giờ chúng ta sẽ tìm hiểu 1 tý về các thêm 1 link vào nhé
## Bước 2: Thêm link mới
Để tạo 1 link mới bạn cần quay về sheet "data" sau đó điền các thông tin sau: 
+ idAt: Đây là id của link, phải điền từ khóa không xuất hiện trong file ví dụ bạn có thể lấy thời gian hoặc tên chiến dịch để cho không trùng
+ status: Trạng thái của link bật là true tắt là false
+ link: Đây là link sẽ dẫn đến nếu là pc
+ linkWhenOff: Đây là link sẽ dẫn đến nếu status là false (Không phân biệt Platform)
+ linkAndroid: Link dẫn về khi user dùng android (Nếu không có sẽ trỏ về link)
+ linkIos: Link dẫn về khi user dùng IOS(Nếu không có sẽ trỏ về link)
+ utm_source,utm_medium: Hai biến này dùng để thêm nguồn tracking nếu bạn muốn
+ shortLink,qrCode: Hệ thống tự động gen sau khi bạn điền xong các data cần thiết
+ **linkShare**:(hệ thống tự gen) Đây là link quan trọng nhất nó là kết quả bạn cần, bạn có thể lấy link này đi short với các tool khác hoặc dùng chính short link bên mục trên

# 4. Lời kết
URL to URL là 1 công cụ khá mới nhưng nếu bạn biết cách tận dụng nó sẽ giúp bạn khá nhiều công việc. Ví dụ như: 
+ Khi bạn đi seeding cho 1 chương trình và các link đã seeding xong, nhưng cần phải đổi link :( thì ôi giòi ôi không lẽ phải seeding lại từ đầu. Thì đây là 1 cứu cánh cho bạn, bạn chỉ cần vào đổi cái link trong file excel là ok ngay 
+ Hay bạn seeding cho 1 chương trình mà nó đã kết thúc muốn trỏ về 1 link khác. Thì đây cũng là 1 công cụ khá hay bạn nên thử

Mình đang được tặng 1 vài code miễn phí 1 tháng của công cụ này nếu bạn nào cần có thể **comment email** hoặc liên hệ qua skype **ruaconnb93** mình sẽ tặng cho 5 bạn nhanh nhất nhé. 
Giá công cụ này cũng khá mềm