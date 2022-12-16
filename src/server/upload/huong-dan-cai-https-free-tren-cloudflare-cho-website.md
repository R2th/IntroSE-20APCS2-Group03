# HƯỚNG DẪN CÀI CLOUDFLARE CHO WEBSITE
Có thể bạn đã từng nghe nhiều về CloudFlare nhưng chưa biết làm thế nào để cài đặt nó cho website của mình? Ở bài này mình sẽ giúp bạn cách cài đặt CloudFlare chi tiết vào website.
Trước khi cài đặt, cũng thật tốt nếu chúng ta hiểu nó là cái gì và cơ chế hoạt động ra sao chứ nhỉ.
## **CLOUDFLARE LÀ GÌ?**
CloudFlare là một dịch vụ proxy trung gian cho website và điều phối lượng truy cập vào website thông qua lớp bảo vệ của CloudFlare. Nói theo một cách khác, thay vì người dùng sẽ truy cập trực tiếp vào máy chủ của website thông qua địa chỉ máy chủ phân giải tên miền riêng (DNS – Domain Name Server) thì chúng ta sẽ sử dụng máy chủ phân giải tên miền của CloudFlare và các truy cập sẽ phải đi qua máy chủ của CloudFlare để xem dữ liệu website thay vì truy cập trực tiếp.
Mô hình khi không dùng CloudFlare và khi dùng CloudFlare
## **LỢI ÍCH KHI DÙNG CLOUDFLARE**
### **Tăng tốc độ website**
CloudFlare sẽ lưu một bản bộ nhớ đệm (cache) của website trên máy chủ của CDN của họ và từ đó phân phối cho người dùng truy cập ở gần máy chủ đó nhất. Ví dụ hosting tại AZDIGI đặt máy chủ tại TP Hồ Chí minh, lúc này người dùng tại New York, Mỹ truy cập vào sẽ hơi chậm vì máy chủ vật lý ở rất xa người dùng, khi dùng CloudFlare thì nội dung đệm sẽ được lưu tại máy chủ CDN gần New York nhất là Washington D.C sẽ phân phối cho người dùng. Ngoài ra, các dữ liệu tĩnh trên website như hình ảnh, CSS, Javascript, các tập tin,..đều được nén gzip giúp website tải nhanh hơn. Với tính năng này, website không chỉ tải nhanh hơn mà bạn còn tiết kiệm được băng thông cho máy chủ vì hạn chế truy cập trực tiếp vào máy chủ.
Với số lượng 102 datacenter hỗ trợ, CloudFlare có thể tối ưu tốc độ cho website của bạn trên hầu hết các nơi trên thế giới dù bạn có sử dụng web hosting ở đâu.
Tuy nhiên hiện tại CloudFlare vẫn chưa có hỗ trợ datacenter tại Việt Nam nên khi truy cập vào website dùng CloudFlare tại Việt Nam thì các nội dung ở máy chủ ở các nước lân cận như Thái Lan, Hong Kong, Singapore và 1 số khu vực tại Trung Quốc. Vì vậy nếu dùng tại Việt Nam thì tốc độ tải trang có thể hơi chậm một chút nhưng một lý do khác để sử dụng CloudFlare là tăng tính bảo mật.
### **Tăng khả năng bảo mật**
Một lý do khác để chúng ta sử dụng CloudFlare là giúp website trở nên bảo mật hơn, hạn chế được tấn công DDoS, spam bình luận trên blog và một số phương thức tấn công cơ bản khác.
Với bản chất các lượt truy cập phải thông qua máy chủ CloudFlare nên tại các máy chủ CDN đã có sẵn các công nghệ sàng lọc lượt truy cập và phân loại các lượt truy cập có nguy cơ tấn công như botnet, các truy cập nặc danh hoặc từ những địa chỉ IP xấu.
Hiện tại với CloudFlare, bạn có thể cải thiện bảo mật bằng cách:

    Sử dụng SSL miễn phí để thêm giao thức HTTPS cho website.
    Hạn chế truy cập từ các quốc gia chỉ định.
    Cấm truy cập với các IP nhất định.
    Công nghệ tường lửa ứng dụng website (WAF) giúp ngăn chặn các phương thức tấn công SQL Injection, Cross-site Scripting (XSS), Cross-Site Request Forgery (CSRF) và một số thủ thuật khai thác lỗ hổng trên website (gói Pro).
    Bảo vệ các trang có tính chất đăng nhập (gói Pro).

# CÁCH CÀI ĐẶT CLOUDFLARE
Để cài đặt CloudFlare, đầu tiên bạn truy cập vào https://www.cloudflare.com/sign-up để đăng ký một tài khoản miễn phí.
Sau khi đăng ký xong, nó sẽ dẫn bạn tới trang thêm website vào, tại đây bạn nhập tên miền cần sử dụng CloudFlare, hãy nhập tên miền vào và ấn Add website.
cai-dat-cloudflare-01
Sau đó nó sẽ dẫn bạn tới trang quản lý các record DNS, hãy ấn vào nút Edit của Record A và sửa IP thành IP của host bạn đang dùng. Hoặc bổ sung đầy đủ các bản ghi DNS trong tên miền vào đây.
cai-dat-cloudflare-02
Sửa xong thì kéo xuống và ấn nút “I’ve added all missing records, continue” để tiếp tục.
Tại trang tiếp theo bạn sẽ chọn gói dịch vụ cần sử dụng, hãy chọn gói Free nhé.
cai-dat-cloudflare-03
Tiếp tục ấn Continue và ở trang cuối cùng, nó sẽ cung cấp cho bạn 2 nameserver, nhiệm vụ của bạn là hãy sửa domain để sử dụng 2 namesever của CloudFlare thay vì dùng Nameserver của nhà cung cấp host.
cai-dat-cloudflare-04
Chẳng hạn mình dùng tên miền ở Godaddy thì mình vào đó và trỏ Nameserver về hai địa chỉ của CloudFlare như thế này:
cai-dat-cloudflare-05
Đổi xong thì vào lại CloudFlare và ấn nút I’ve updated my nameservers…để hoàn tất quá trình cài đặt. Việc bây giờ của bạn là chờ đợi CloudFlare phát hiện ra tên miền của bạn đã cập nhật DNS của họ để bắt đầu sử dụng.
### **LÀM QUEN VỚI CLOUDFLARE**
Ngay sau khi thêm website thì ở trang quản lý của CloudFlare sẽ có danh sách các website bạn đang sử dụng dịch vụ này. Muốn sửa thiết lập của website nào thì click vào website đó.
quan-ly-cloudflare-01
Ngay tại đây, bạn sẽ thấy giao diện quản lý được chia làm các mục như Overview, Analytics, DNS,….
cloudflare-overview
## **Dưới đây mình xin hướng dẫn chi tiết từng mục như sau:**
### **Overview**
Mục này bạn sẽ xem được tổng quan thiết lập của website trên CloudFlare và nơi để bạn chỉnh lại trạng thái của website hay nâng cấp lên CloudFlare trả phí. Thường thì chúng ta sẽ không dùng nhiều tính năng ở đây.
Để chuyển trạng thái của CloudFlare,bạn chọn nút Quick Actions. Nếu website của bạn đang bị tấn công, bạn có thể chuyển trạng thái thiết lập CloudFlare sang Under Attacked Mode để nó tự cấu hình bảo mật tối đa cho bạn. Nếu webite bạn đang trong giai đoạn phát triển, đang chỉnh sửa các tập tin CSS hay JS thì nên chuyển về trạng thái Development Mode để nó không lưu cache.
### **Analytics**
Nếu bạn cần xem thống kê lượng băng thông của website đã sử dụng hoặc các thống kê khác liên quan đến bảo mật thì có thể xem tại trang này. Ở đây bạn sẽ thấy các thống kê rất chi tiết dù là tài khoản miễn phí, nhưng khi nâng cấp trả phí bạn sẽ sử dụng được nhiều hơn.
### **DNS**
Nơi quản lý và sửa đổi các bản ghi DNS của tên miền. Khi bạn trỏ tên miền về CloudFlare thì khi có nhu cầu trỏ tên miền về máy chủ khác, bạn sẽ thực hiện sửa trong đây.
**Crypto**
Ở trang này bạn sẽ thấy được các tùy chọn bật những tính năng liên quan đến việc mã hóa của website như SSL, HSTS, TLS,…Tài khoản miễn phí sẽ bị giới hạn một số tính năng. Và nếu bạn không có ý định cài SSL miễn phí cho CloudFlare thì đừng sửa thiết lập phần này.
Để biết cách cài SSL miễn phí trên CloudFlare, hãy tham khảo bài viết Hướng dẫn cài SSL cho CloudFlare.
### **Firewall**
Mục này sẽ cần đụng tới nếu bạn cần sửa các thiết lập liên quan tới tường lửa trên website như bật tắt tường lửa, theo dõi IP truy cập vào website,….
Security Level: Chọn mức độ bảo vệ.
Challenge Passage: Chọn thời gian lưu lại thử thách với các lượt truy cập nghi vấn tấn công/spam. Thử thách ở đây là các lượt truy cập đó sẽ phải nhập một mã captcha khi vào website bạn.
IP Firewall: tại đây bạn có thể xem danh sách các IP đã truy cập vào website. Nếu bạn cảm thấy IP nào nghi vấn, bạn có thể ấn vào nút Whitelist và chọn CAPTCHA hoặc BLOCK hoặc Javascript Challenge
Bạn có thể bật captcha cho tất cả lượt truy cập từ quốc gia nào đó, rất tiếc là không thể chặn.
Bật Captcha cho một quốc gia nào đó.
### **Speed**
Nơi chứa các thiết lập liên quan đến việc tăng tốc độ cho website sử dụng CloudFlare như bật tắt các tính năng nén Javascript/CSS/HTML, bật tính năng RocketLoader (sử dụng kỹ thuật tải async cho Javascript),…

    Auto Minify: Bật chức năng nén Javascript, CSS và HTML. Lưu ý một vài giao diện website sẽ không thể hoạt động tốt sau khi bật chức năng nén CSS hoặc Javascript.
    Polish: Tính năng tự động tối ưu dung lượng hình ảnh trên website để tăng tốc tốt hơn. Chỉ có ở gói Pro.
    Railgun: Sử dụng công nghệ Railgun để nén dữ liệu gửi từ server đến CloudFlare nhằm giảm thời gian tải trang tốt hơn. Chỉ có ở gói Business.
    Mirage: Giảm thời gian tải hình ảnh trên các thiết bị di động. Chỉ có ở gói Pro.
    Rocket Loader: Giảm thời gian tải trang bằng cách tải các tập tin Javascript ở dạng không đồng bộ.
    Mobile Redirect: Chuyển hướng qua một sub-domain khác khi truy cập bằng diện thoại di động. Bạn phải thêm bản ghi cho subdomain tại mục DNS mới dùng được tính năng này.

### **Caching**
Tùy chỉnh và bật tắt các tính năng lưu bộ nhớ đệm cho website để hỗ trợ tăng tốc và tiết kiệm băng thông.

    Purge Cache: Xóa bản lưu cache của website, bạn có thể xóa cache của một tập tin riêng hoặc cache toàn bộ website.
    Cache Level: Cấp độ lưu bộ nhớ đệm. Ấn phần Help để xem họ giải thích ý nghĩa của từng thiết lập, nếu bạn chưa rõ thì chọn Standard.
    Browser Cache Expiration: Chọn thời gian lưu bộ nhớ đệm của các tập tin trên website. Nếu website bạn có ít thay đổi về mã nguồn thì hãy chọn càng lâu càng tốt.
    Development Mode: Nếu website bạn đang tiến hành sửa code bên trong, tốt nhất nên bật chế độ Development Mode để CloudFlare không lưu lại cache.

### **Page Rules**
Tính năng này chỉ có ở gói Pro, nhưng nó sẽ rất có ích nếu như bạn muốn thiết lập CloudFlare riêng cho từng trang. Ví dụ ở trang chủ chúng ta thiết lập bảo vệ mạnh nhưng các trang khác thì không. Hoặc nếu một subdomain của bạn bị lỗi khi bật Minify thì có thể dùng tính năng này để tắt Minify ở subdomain đó.
### **Network**
Phần này chúng ta cũng ít khi đụng tới vì nó sẽ có một số tính năng để cấu hình như bật tắt hỗ trợ IPv6, bật tính năng IP Geolocation và một số tính năng nâng cao chỉ có ở tài khoản Pro hoặc Business.
HTTP/2 + SPDY: Sử dụng giao thức SPDY và HTTP/2 để kết nối vào website hỗ trợ SSL nhanh hơn, tính năng này có thể cấu hình khi cài đặt SSL cho domain tại CloudFlare.
IPv6 Compatibility: Hỗ trợ tính năng phân giải IPv6 nếu host của bạn có hỗ trợ IPv6.
Websockets: Cho phép websockets của CloudFlare kết nối với máy chủ của website bạn nhanh hơn. Và tuy theo gói bạn đang sử dụng, khả năng kết nối của websocket cũng khác.
IP Geolocation: bật tính năng xác định quốc gia của người dùng thông qua IP của họ. Đây là tính năng bạn sẽ cần nếu như bạn cần xác định quốc gia của khách hàng do website sử dụng CloudFlare đều pass lượt truy cập qua proxy nên thông tin thu thập từ server cũng khác. Sau khi bật tính năng này, bạn sử dụng code của họ để lấy IP của khách theo hướng dẫn này.
Maximum Upload Size: Dung lượng tập tin upload tối đa của người truy cập vào website cho mỗi request gửi đi. Mặc định gói miễn phí bạn bị giới hạn 100MB.
### **Traffic**
Theo dõi các lượt truy cập vào website đã bị chặn hoặc áp đặt thử thách.
### **Customize**
Một tính năng thú vị khi sử dụng gói Pro trở lên, đó là bạn có thể tùy biến lại các trang thông báo lỗi của CloudFlare.
### **App**
Một cái hay của CloudFlare là bạn có thể dễ dàng tích hợp các dịch vụ thứ ba vào, và bạn sẽ kích hoạt nó ở phần này. Ví dụ bạn có thể tích hợp Google Analytics vào website thông qua CloudFlare mà không cần chèn mã theo dõi vào website.
# MỘT SỐ LƯU Ý KHI DÙNG CLOUDFLARE
Mỗi khi bạn muốn sửa nội dung file CSS hay Javascript, bạn nên kích hoạt chế độ Development Mode để nó không lưu cache các file tĩnh và như vậy bạn mới thấy sự thay đổi. Chế độ này sẽ tự động bỏ đi sau 3 giờ.
cloudflare-devmode
Ngoài ra bạn cũng nên biết là sau này nếu có chuyển host, bạn hãy vào CloudFlare để đổi lại IP của host mới chứ đừng đụng chạm gì đến việc sửa lại Nameserver của tên miền.
# LỜI KẾT
Ở trên là cách thiết lập của CloudFlare, về cơ bản thì bạn chỉ cần làm vậy thôi là website bạn đã hoạt động tốt rồi. Nếu bạn muốn thì có thể vào phần thiết lập của từng tên miền trong CloudFlare để sửa lại các tùy chỉnh về tối ưu tốc độ và bảo mật, đừng quên xem qua phần https://www.cloudflare.com/app-signup để sử dụng thêm một số apps được tích hợp sẵn vào CloudFlare chẳng hạn như tích hợp Google Analytics chẳng hạn.

Nguồn: https://www.zozozo.xyz/2018/04/huong-dan-cai-cloudflare-cho-website.html