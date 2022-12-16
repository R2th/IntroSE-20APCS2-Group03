![](https://images.viblo.asia/62824b94-cab9-40f2-97f3-e71e41bc270c.png)
# 1. NodeJS là gì ?
* NodeJS là một mã nguồn mở, đa nền tảng, chạy trên môi trường JavaSript, được xây dựng trên V8 JavaScript engine của Chrome - V8 thực thi mã JavaScript bên ngoài trình duyệt. Nó được tạo ra vào năm 2009 đi kèm với một lợi thế chính - NodeJS cho phép thực hiện lập trình bất đồng bộ.
* Ở chế **độ đồng bộ** thực thi từng dòng và tiến hành thực thi dòng tiếp theo khi dòng hiện tại đã thực thi xong.
* Khi **bất đồng bộ** thực thi tất cả dòng code cùng một lúc.
* NodeJS là một nền tảng được xây dựng trên JavaScript runtime của Chrome với mục đích xây dựng các ứng dụng mạng nhanh chóng và có thể mở rộng được một cách dễ dàng hơn. NodeJS sử dụng mô hình I/O lập trình theo sự kiện, non-blocking, do đó nodeJS khá gọn nhẹ và hiệu quả - công cụ hoàn hảo cho các ứng dụng chuyên sâu về dữ liệu theo thời gian thực chạy trên các thiết bị phân tán.
* NodeJS là môi trường runtime mã nguồn mở đa nền tảng, được sử dụng để phát triển các ứng dụng mạng và ứng dụng server-side. Các ứng dụng NodeJS được viết bằng JavaScript và có thể chạy trong NodeJS runtime trên OS X, Microsoft Windows và Linux.
* NodeJS cũng cung cấp một thư viện bao gồm rất nhiều các module JavaScript khác nhau nhằm đơn giản hóa việc phát triển các ứng dụng web, qua đó giảm thiểu tình trạng sử dụng quá nhiều Node.js.
# 2. Các tính năng của NodeJS
* **Lập trình hướng sự kiện và không đồng bộ**: Toàn bộ API trong thư viện NodeJS đều không đồng bộ, hay không bị chặn. Về cơ bản điều này có nghĩa là một server sử dụng NodeJS sẽ không bao giờ chờ một API trả về dữ liệu. Server sẽ chuyển sang API kế tiếp sau khi gọi API đó và cơ chế thông báo của Events trong NodeJS giúp server nhận được phản hồi từ lần gọi API trước.
* **Cực kỳ nhanh chóng**: Được xây dựng trên Công cụ JavaScript V8 của Google Chrome, thư viện NodeJS có khả năng xử lý mã vô cùng nhanh.
* **Đơn luồng/Single thread nhưng có khả năng mở rộng cao**: NodeJS sử dụng một mô hình luồng đơn với vòng lặp sự kiện/event. Cơ chế event cho phép máy chủ phản hồi non-blocking và cũng cho phép khả năng mở rộng cao hơn so với các server truyền thống hỗ trợ giới hạn các thread để xử lý yêu cầu. NodeJS sử dụng một chương trình đơn luồng, cùng một chương trình có thể cung cấp dịch vụ cho một số lượng yêu cầu lớn hơn so với các máy chủ truyền thống như Apache HTTP Server.
* **Không có buffer** - Các ứng dụng NodeJS không có vùng nhớ tạm thời (buffer) cho bất kỳ dữ liệu nào. Các ứng dụng này chỉ đơn giản xuất dữ liệu theo khối.
* **License** - NodeJS được phát hành theo giấy phép MIT.
# 3. Đối tượng và ứng dụng của NodeJS
## 3.1. Đối tượng
Các công ty đang sử dụng Node js có thể kể đến một số tên tuổi lớn như eBay, General Electric, GoDaddy, Microsoft, PayPal, Uber, Wikipin, Yahoo, và Yammer

## 3.2. Ứng dụng
* **Hệ thống Notification** - Giống như facebook hayTwitter
* **Websocket server** - Các máy chủ web socket như là Online Chat, Game Server…
* **Fast File Upload Client** - Các chương trình upload file tốc độ cao.
* **Ad Server** - Các máy chủ quảng cáo.
* **Cloud Services** - Các dịch vụ đám mây.
* **RESTful API** - Những ứng dụng mà được sử dụng cho các ứng dụng khác thông qua API.
* **Any Real-time Data Application** - Bất kỳ một ứng dụng nào có yêu cầu về tốc độ thời gian thực.
* **Ứng dụng Single Page Application (SPA)** - Những ứng dụng này thường request rất nhiều đến server thông qua AJAX
* **Ứng dụng truy vấn tới NoSQL database** - Như MongoDB, CouchDB,…
* **Ứng dụng CLI** - Các công cụ sử dụng command-line.
# 4. Một số ưu, nhược điểm của NodeJS
## 4.1 Ưu điểm
* **Nhận và xử lý nhiều kết nối** chỉ với một single-thread giúp **hệ thống tốn ít RAM nhất và chạy nhanh nhất** khi không phải tạo thread mới cho mỗi truy vấn.
* NodeJS **tận dụng tối đa tài nguyên** của server mà **không tạo ra độ trễ** vì áp dụng ưu điểm non-blocking I/O của Javascript.
* Với cơ chế event-driven, non-blocking I/O(Input/Output) và mô hình kết hợp với Javascript là sự lựa chọn tuyệt vời cho các dịch vụ **Webs làm bằng JSON**.
* Với khả năng xử lý nhiều Request/s đồng thời thời gian phản hồi nhanh. Rất phù hợp để áp dụng NodeJS để xây dựng các **ứng dụng Single page Application**, các **ứng dụng không muốn tải lại trang**, gồm rất nhiều request từ người dùng cần sự hoạt động nhanh, các **ứng dụng thời gian thực **như ứng dụng chat, các dịch vụ mạng xã hội như Facebook, Twitter,…
* NodeJS sẽ **tận dụng tối đa Unix để hoạt động**. Tức là NodeJS có thể **xử lý hàng nghìn process** và **trả ra một luồng khiến** cho **hiệu xuất hoạt động đạt mức tối đa nhất và tuyệt vời nhất**.
* **Streamming Data**: Các web thông thường gửi HTTP request và nhận phản hồi lại (Luồng dữ liệu). Giả xử sẽ cần xử lý 1 luồng giữ liệu cực lớn, NodeJS sẽ xây dựng các Proxy phân vùng các luồng dữ liệu để đảm bảo tối đa hoạt động cho các luồng dữ liệu khác.
* Viết được cho cả **2 phía server và client**. Chạy **đa nền tảng** trên Windows, MAC hoặc Linux. Hơn nữa cộng đồng NodeJS rất lớn và hoàn toàn miễn phí.
## 4.2 Nhược điểm
* Rất hạn chế khi áp dụng NodeJS khi xây dựng **ứng dụng nặng, tốn tài nguyên**. Bởi vì NodeJS được viết bằng C++ & Javascript, nên phải thông qua thêm 1 trình biên dịch của NodeJS sẽ lâu hơn 1 chút.
* Giống như hầu hết các công nghệ mới, việc **triển khai NodeJS trên host không phải là điều dễ dàng**.
* **Thiếu sự kiểm duyệt chất lượng các module NodeJS**.
# 5. Đôi chút khác biệt giữa NodeJS và PHP
![](https://images.viblo.asia/0c873f25-ee5b-4578-8bd3-eebd50c237f0.jpg)
## 5.1 Môi trường thực thi
* PHP từ lâu đã dễ dàng cài đặt và sử dụng ở phía server và được cung cấp bởi Zend engine. 
* NodeJS là một môi trường thực thi cho JavaScript ở phía server, được cung cấp bởi V8 JavaScript engine của Chrome.
## 5.2 Đồng bộ
* PHP là ngôn ngữ đồng bộ nhưng có một số API hoạt động không đồng bộ ngoài luồng đồng bộ. Nó sử dụng multi-threaded blocking I/O để thực hiện nhiều tác vụ chạy song song với nhau.
* NodeJS về bản chất là bất đồng bộ, như vừa tìm hiểu ở trên.
## 5.3 Module
* PHP sử dụng các công nghệ cài đặt module như PEAR (framework và hệ thống phân phối cho các component PHP có thể sử dụng lại)
* NodeJS đi kèm với một hệ thống quản lý package được gọi là NPM (Node Package Manager)
## 5.4 Khả năng mở rộng
* PHP được hỗ trợ trên hầu hết các hệ thống CMS phổ biến (như Drupal, Joomla, WordPress), điều này khiến nó thường được lựa chọn như một công cụ để xây dựng blog và các ứng dụng web thương mại điện tử.
* Ngược lại, NodeJS hoạt động hiệu quả như là một công cụ để xây dựng các giải pháp có thể mở rộng để xử lý hệ thống với số lượng lớn I/O. Cũng có thể mở rộng quy mô Node trên các hệ thống đa lõi, mặc dù cần nhiều effort.
## 5.5 Web Servers
* PHP chạy trên máy chủ web Apache / Nginx. Nó cũng có thể chạy trên máy chủ web IIS trong trường hợp máy Windows.
* NPM không cần máy chủ web, nó chạy trên môi trường thực thi của chính nó.
## 5.6 Hiệu suất
* Mặc dù Node.js luôn được nêu bật là có hiệu năng cao vì mô hình bất đồng bộ của nó, PHP cũng đã phát triển theo hướng này. Với các thư viện như ReactPHP, PHP cũng có thể được sử dụng trong lập trình hướng sự kiện.
* Tuy nhiên, khi so sánh cả hai môi trường, bạn sẽ thấy rằng Node.js nhanh hơn rất nhiều so với PHP.
# 6. Một số gợi ý khi dùng NodeJS, PHP
## 6.1 Khi nào nên dùng PHP
* **Máy chủ tập trung**: Trong trường hợp chúng ta không có kế hoạch nhân rộng ứng dụng của mình ra nhiều máy chủ, chúng ta có thể sử dụng LAMP (Linux, Apache, MySQL và PHP). Điều này có thể thay đổi tùy thuộc vào yêu cầu dự án.
* **Tính di động**: PHP là ngôn ngữ linh hoạt. Chi phí rẻ cho việc lưu trữ web và sự sẵn có của các máy chủ cho PHP là không cần bàn. PHP có thể chạy trên hầu hết mọi nền tảng có cài đặt Apache, IIS và có một
## 6.2 Khi nào nên dùng NodeJS
* **Dùng chung một ngôn ngữ**: NodeJS sẽ là lựa chọn chính xác để sử dụng nếu dự án của bạn liên quan đến những thứ như MongoDB, ExpressJs, AngularJs, BackBoneJs, ReactJs, SPA (single page applications),.. Điều này giúp bạn dễ dàng có hệ thống hoàn toàn sử dụng JavaScript.
* **Realtime**: NodeJS rất tốt cho các ứng dụng yêu cầu realtime, tuy nhiên mình sẽ quan ngại về việc sử dụng Node.js cho các ứng dụng liên quan đến tài chính, tiền bạc, vì bản thân Javascript không đáng tin cậy khi nói về các con số vì mọi thứ đều là integer hoặc float và không có sự tách biệt rõ ràng thực sự giữa hai loại, "floating point number" là một ví dụ điển hình khi nói về tính toán với JavaScript. Một ngôn ngữ an toàn hơn được khuyến cáo khi làm việc trên các ứng dụng tài chính đòi hỏi nhiều tính toán, hoặc là cần cài thêm một thư viện đủ tin cậy.
* **Tốc độ**: NodeJS nhanh hơn nhiều so với PHP khi nói về tốc độ thực thi, nếu tốc độ là tất cả những gì bạn cần cho ứng dụng của mình, chẳng hạn như trò chơi nhiều người chơi trên một trình duyệt hoặc ứng dụng trò chuyện, Node.js là lựa chọn tuyệt vời hơn so với PHP.
* **Giao thức khác http**: Những ứng dụng đòi hỏi các giao thức kết nối khác chứ không phải chỉ có http. Với việc hỗ trợ giao thức tcp, từ nó bạn có thể xây dựng bất kỳ một giao thức custom nào đó một cách dễ dàng.
# Kết luận
Bài viết của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.
# Tài liệu tham khảo
[Tìm hiểu về Node Js cơ bản](https://viblo.asia/p/tim-hieu-ve-node-js-co-ban-ojaqG0dGEKwZ#_uu-diem-nodejs-3)

[Tổng quan về NodeJS và so sánh với PHP](https://viblo.asia/p/tong-quan-ve-nodejs-va-so-sanh-voi-php-gDVK2GOvZLj#_3-uu-va-nhuoc-diem-nodejs-3)