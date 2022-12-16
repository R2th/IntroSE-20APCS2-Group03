### Lời mở đầu
Ngày nay, Website không còn là công cụ xa lạ của các doanh nghiệp, các tổ chức hay thậm chí là các cá nhân bởi hầu hết với sự phát triển của internet mỗi người đều sở hữu cho mình một website. Tuy vậy không phải cá nhân, tổ chức nào cũng có điều kiện để build một server hay trung tâm dữ liệu riêng. Chính vì thế các dịch vụ cho thuê hosting, server, cloud nổi cộm lên và trở thành 1 lĩnh vực kinh doanh đang khá hot. Với từng mục đích sử dụng và vấn đề tài chính cũng có các cách triển khai lên internet khác nhau. Cùng tìm hiểu qua về Hosting, Server, VPS, Cloud Server, Domain, Cloudflare để có thể triển khai trang web vừa an toàn vừa phù hợp với túi tiền của chúng ta nhé.
### Hosting là gì?
Hosting (hay web hosting, hosting website) là một dịch vụ online cho phép các tổ chức và cá nhân đăng một trang web hoặc ứng dụng web lên Internet. Máy chủ lưu trữ web hoặc nhà cung cấp dịch vụ lưu trữ web, là một doanh nghiệp cung cấp các công nghệ và dịch vụ cần thiết để trang web hoặc ứng dụng web chạy được trong Internet.
![](https://images.viblo.asia/f7fa4028-972a-487d-bdf1-638062ef226c.jpg)

### Server là gì?
Máy chủ (tên tiếng anh là Server Computer, Server, End System) là một máy tính, nó được kết nối với một mạng máy tính hoặc internet. Server có IP tĩnh và khả năng xử lý cao. Trên máy chủ, người ta cài đặt nhiều phần mềm để giúp cho các máy tính khác truy cập và yêu cầu cung cấp dịch vụ, tài nguyên. Đây kiến trúc được gọi là mô hình client-server.

![](https://images.viblo.asia/224070af-8abe-4051-a965-608d8e5f55f7.jpg)

### Các loại Server điển hình
* Database servers (máy chủ cơ sở dữ liệu).
* File servers (máy chủ file, là máy chủ lưu trữ file ví dụ như Dropbox, Google Drive, Microsoft One Drive)
* Mail servers (máy chủ mail ví dụ như gmail, yahoo mail, yandex, amazon mail service)
* Print servers (máy chủ in, thường được dùng trong mạng nhỏ của doanh nghiệp)
* Web servers (máy chủ web để phục vụ người dùng mua hàng như các site amazon, taobao, google shopping, phục vụ người dùng đọc tin tức …vv)
* Game servers (máy chủ trò chơi ví dụ máy chủ phục vụ game Võ Lâm, Warcaft, Tru tiên…vv)
* Application servers (máy chủ ứng dụng ví dụ để chạy các phần mềm quản lý ERP, phần mềm CRM trong doanh nghiệp, nhưng Application Server cũng có thể được hiểu chung là máy chủ cung cấp dịch vụ web, mail, file server, database…vv)
:p
### Share Hosting là gì?
Shared Hosting được hiểu là một dịch vụ của web hosting nơi mà có rất nhiều website nằm trong một web server được kết nối với internet.
Có thể hình dung rằng một nhà cung cấp hosting sẽ có một máy chủ đặt trong trung tâm dữ liệu, nhà cung cấp sẽ chia nhỏ các tài nguyên có trong máy chủ để phục vụ người dùng. Nếu website của các bạn không quá nặng thì đây là một sự lựa chọn tuyệt vời cho các bạn vì giá thành của nó khá rẻ so với các dịch vụ khác.

![](https://images.viblo.asia/4fc22e6d-d407-48e2-9130-0802f40b38bc.png)

**Ưu điểm của Shared Hosting:**
* Giá thành rẻ hơn khá nhiều so với các dịch vụ khác
* Không quá khó khăn để quản lý được dịch vụ này, nó không đòi hỏi bạn phải có quá nhiều kiến thức liên quan.
```
**Nhược điểm của Shared Hosting:**
* Do có giới hạn về dung lượng sử dụng nên cấu hình của nó không được cao
* Do có nhiều người cùng sử dụng trên một máy chủ nên dễ bị tấn công cục bộ nếu nó không được bảo mật cao
* Nếu tài nguyên của máy chủ phân chia một cách không hợp lý sẽ dẫn đến việc có website chạy nhanh, có website chạy chậm, nếu một website có lượng truy cập lớn thì cá website còn lại sẽ bị chậm.

### Dedicated Server là gì?
* Dedicated server (máy chủ riêng) là máy chủ chạy trên phần cứng và các thiết bị hỗ trợ riêng biệt, cụ thể: HDD, RAM, Card mạng, CPU,… Tùy ý cài đặt hệ điều hành.
* Khi muốn thay đổi hay nâng cấp cấu hình của máy chủ riêng phải tiến hành thay đổi phần cứng của nó.
* Thường được đặt ở trung tâm máy chủ dữ liệu, quản lý bởi những người có kiến thức về hạ tầng (Devops Engineer, Network & System Administrator).

![](https://images.viblo.asia/54179874-6385-4050-9b8a-5af0b189044a.jpg)

**Ưu điểm của Dedicated Server:**
* Lưu trữ được dữ liệu lớn
* Tốc độ xử lý nhanh
* Tốc độ internet mạnh
* Doanh nghiệp toàn quyền quản trị
* Không chia sẻ tài nguyên với các website khác

**Nhược điểm của Dedicated Server:**
* Cấu hình tốt chi phí càng cao 
* Cần duy trì nguồn điện, mạng internet 24/7, ...
* Cần có người quản trị mạng, cần phải thuê các vị trí Devops Engineer, Network & System Administrator.
* Tự chịu trách nhiệm với dữ liệu của mình.

### VPS là gì?
* Máy chủ ảo VPS là máy chủ được tạo thành khi sử dụng công nghệ ảo hóa. Nhờ công nghệ ảo hóa này mà máy chủ riêng sẽ được chia tách thành nhiều máy chủ ảo khác nhau. 
* Máy chủ ảo được tạo ra đều có tính năng tương tự Dedicated server (máy chủ riêng) có CPU, RAM, ổ cứng và IP riêng nhưng hoạt động dựa trên việc chia sẻ tài nguyên từ máy chủ vật lý. 
* Thay đổi cấu hình hoặc nâng cấp máy chủ ảo được thực hiện đơn giản và trực tiếp ngay trên phần mềm quản lý hệ thống.

![](https://images.viblo.asia/bb507e9d-15fe-4b9d-9b53-c509cf9c0e56.jpg)

**Ưu điểm của VPS:**
* Dễ dàng tùy biến nguồn tài nguyên, miễn là trong giới hạn của máy chủ vật lý cho phép.
* Từ 1 máy chủ vật lý có thể tạo ra nhiều VPS. Tiết kiệm được tiền đầu tư phần cứng, tiền điện vận hành, không gian lắp đặt.
* Nhiều VPS nằm tập trung trên 1 hệ thống máy chủ nên việc kiểm tra vận hành cũng được dễ dàng.

**Nhược điểm của VPS:**
* VPS bị ảnh hưởng bởi hoạt động và độ ổn định của máy chủ vật lý tạo ra nó.
* Việc sử dụng chung máy chủ vật lý khiến VPS của bạn bị phụ thuộc.
* Tốn thời gian và chi phí để nâng cấp tài nguyên và cũng không thể mở rộng nhiều.

### Giới hạn của Server, VPS, Hosting
* Giới hạn vị trí địa lý
* Mất dữ liệu do dữ liệu chỉ lưu trữ ở một nơi
* Không đảm bảo duy trì 24/7
* Dễ dàng bị tấn công DDos
* Tốc độ chậm khi có nhiều truy cập cùng 1 lúc

### Công nghệ điện toán đám mây là gì?

* Điện toán đám mây (Cloud computing) có thể hiểu một cách đơn giản là: các nguồn điện toán khổng lồ như phần mềm, dịch vụ… sẽ nằm tại các máy chủ ảo (đám mây) trên Internet thay vì trong máy tính gia đình và văn phòng (trên mặt đất) để mọi người kết nối và sử dụng mỗi khi họ cần. 
* Với các dịch vụ sẵn có trên Internet, doanh nghiệp không phải mua và duy trì hàng trăm, thậm chí hàng nghìn máy tính cũng như phần mềm. Họ chỉ cần tập trung sản xuất bởi đã có người khác lo cơ sở hạ tầng và công nghệ thay họ. 
* Có thể truy cập đến bất kỳ tài nguyên nào tồn tại trong “đám mây (cloud)” tại bất kỳ thời điểm nào và từ bất kỳ đâu thông qua hệ thống Internet.

![](https://images.viblo.asia/054bc0d9-bf98-4e9c-829e-9e0717c1d68c.jpg)

### Cloud Server là gì?

* Cloud Server cũng là server, đầy đủ thông số như CPU, RAM, ổ cứng
* Tuy nhiên Cloud Server không đơn thuần là một server vật lý như Dedicated Server. Cloud Server là một server nhưng tồn tại  với công nghệ điện toán đám mây.
* Do đó Cloud Server sẽ kế thừa những ưu điểm của công nghệ điện toán đám mây mà Dedicated Server không có được.

![](https://images.viblo.asia/97d78813-5d11-42df-b472-58dcb353fee8.jpg)

**Ưu điểm của Cloud Server:**
* Tốc độ xử lý nhanh, cùng một gói băng thông nhưng khi sử dụng mô hình điện toán đám mây tốc độ truy xuất sẽ nhanh hơn rất nhiều so với những dòng máy chủ hay VPS thông thường.
* Giảm bớt được chi phí đầu tư về hạ tầng
* Loại bỏ được yếu tố vật lý
* Khả năng mở rộng nhanh chóng (nâng cấp CPU, RAM)
* Tránh thất thoát dữ liệu
* Đảm bảo yếu tố 24/7 (Không còn sợ nỗi lo về nguồn điện, mạng, ...)
* Cloud Server uptime 99,99%
    * Cloud Server hoạt động trên nhiều server, Khi một server gặp sự cố dịch vụ Cloud sẽ tự động di chuyển đến các Server còn hoạt động.
* Linh hoạt và quản trị dễ dàng
    * Khi cảm thấy Cloud Server đang bị quá tải bạn có thể nâng cấp CPU, RAM, ổ cứng (SSD) nhanh chóng
    
### Domain là gì?

* Tên miền là địa chỉ của một trang web hoạt động trên internet, là địa chỉ mà khi gõ trực tiếp trên trình duyệt để truy cập vào website bất kỳ. Nói đơn giản, nếu website là ngôi nhà thì tên miền là địa chỉ của nó.
* Mỗi server, hosting sẽ có 1 IP, địa chỉ IP của website
* Add-ons tên miền với IP của server để truy cập website thông qua tên miền
Ví dụ: viblo.asia

![](https://images.viblo.asia/1291106a-cd82-4176-969c-88665c7ba46a.jpg)

### Cloudflare là gì?
* CloudFlare là dịch vụ DNS trung gian, giúp điều phối lượng truy cập giữa máy chủ và các client qua lớp bảo vệ CloudFlare.
* Trang web: https://www.cloudflare.com
* Xem chi tiết tại: https://viblo.asia/p/tim-hieu-doi-chut-ve-cloudflare-Az45bM8qlxY

![](https://images.viblo.asia/92ab9fd7-15c5-41d2-b8a9-40599f863347.png)

**Ưu điểm của Cloudflare:**
* Bảo vệ và chống lại những truy cập độc hại: CloudFlare còn có nhiều dịch vụ khác nữa về CDN, SPDY, tường lửa chống Ddos, Spam, Chứng chỉ số SSL, Forward Domain,… Tất cả các truy cập độc hại hay nói cách khác là các địa chỉ IP độc hại dựa sẽ được Cloudflare xét xem có được truy cập hay không, hoặc chặn hoàn toàn truy cập dựa trên cấp độ bảo mật mà ta đã thiết lập trên trang web. Bạn cũng có thể cải thiện bảo mật website bằng cách sử dụng CloudFlare như sử dụng SSL miễn phí để thêm giao thức HTTPS cho website;
* Vì dữ liệu trang web của bạn được lưu trong bộ nhớ cache trên mạng Cloudflare, khi truy cập trang web sẽ tải trang web của bạn từ trung tâm dữ liệu Cloudflare gần nhất, điều này sẽ giảm độ trễ, thay vì phải tải trực tiếp từ máy chủ của bạn.
* Ngoài ra, CloudFlare còn giúp tiết kiệm băng thông cho máy chủ vì hạn chế truy trực trực tiếp vào máy chủ.

**Nhược điểm của Cloudflare:**
* Nếu cài đặt Cloudflare tại máy chủ có hosting tại Việt Nam thì tốc độ tải trang sẽ bị chậm đi. Bởi vì truy cập sẽ đi vòng từ Việt Nam đến DNS Server của CloudFlare rồi mới trả kết quả về Việt Nam.
* Cloudflare có ưu điểm là sẽ không ai biết được IP của máy chủ của bạn, tuy nhiên điều này cũng tạo nên lỗ hổng. Nếu như website của bạn không được bảo mật cao, thì sẽ bị tấn công bởi nhiều cách khác nhau. Và hiển nhiên là bạn cũng sẽ không bao giờ biết được IP của máy đã tấn công website của bạn.
* Đôi lúc Firewall của hosting mà website bạn đang đặt hiểu lầm dải IP của CloudFlare là địa chỉ tấn công. Rất có thể website của bạn bị offline.

### Tạm kết
Chắc hẳn sau bài viết các bạn đã hiểu hơn về khái niệm Hosting, Server, VPS, Cloud Server, Domain, Cloudflare. Qua đó chúng ta cũng sẽ có những lựa chọn hợp lý khi muốn triển khai các trang web của mình lên internet đúng không nào. Rất mong được sự góp ý từ mọi người 🤗
![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)