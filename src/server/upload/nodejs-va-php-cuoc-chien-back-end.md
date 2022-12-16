PHP và Node.js đều là các nền tảng backend mạnh mẽ cho các website động, cả hai đều thuộc cùng một loại, nhưng tính năng của chúng khá khác biệt. Không nghi ngờ gì PHP là ngôn ngữ được biết đến và sử dụng phổ biến hơn cho server-side. Tuy nhiên Node.js đã biến việc có thể sử dụng JavaScript trong việc lập trình server-side khi được giới thiệu vào năm 2009, thúc đẩy sự gia tăng của các website hoàn toàn sử dụng JavaSript ở cả front-end và back-end. Trước khi tìm hiểu vể sự khác biệt giữa chúng, trước tiên hãy tìm hiểu PHP và Node.js là gì.

# PHP

PHP: Hypertext Preprocessor là ngôn ngữ lập trình có mục đích ban đầu được thiết để phát triển website. Nguyên bản của nó được tạo ra bởi Rasmus Lerdorf vào năm 1994 và kể từ đó nó đã được sử dụng như ngôn ngữ ưu tiên số một cho các hệ thống CMS như WordPress, Drupal và Joomla. Theo thống kê năm 2018, hơn 80% trang web hiện nay được xây dựng bằng PHP.

# Node.js

Node.js là một mã nguồn mở, đa nền tảng, chạy trên môi trường JavaSript, được xây dựng trên V8 JavaScript engine của Chrome - V8 thực thi mã JavaScript bên ngoài trình duyệt. Nó được tạo ra vào năm 2009 đi kèm với một lợi thế chính - Node.js cho phép thực hiện lập trình bất đồng bộ. Mặc dù tỷ lệ phần trăm các trang web được xây dựng bằng Node.js tương đối thấp (0,4%), nhưng nó đang nhanh chóng trở nên phổ biến hơn giữa các developer.

> **Code đồng bộ** thực thi từng dòng và tiến hành thực thi dòng tiếp theo khi dòng hiện tại đã thực thi xong.
> 
> **Code bất đồng bộ** thực thi tất cả dòng code cùng một lúc.
> 
# Node.js vs PHP: Sự khác biệt

### Môi trường thực thi

Mặc dù cả JavaScript và PHP đều có thể được nhúng trực tiếp vào HTML, nhưng cả hai đều cần một trình thông dịch để chạy. PHP từ lâu đã dễ dàng cài đặt và sử dụng ở phía server và được cung cấp bởi Zend engine. Node.js là một môi trường thực thi cho JavaScript ở phía server, được cung cấp bởi V8 JavaScript engine của Chrome.

### Đồng bộ
PHP là ngôn ngữ đồng bộ nhưng có một số API hoạt động không đồng bộ ngoài luồng đồng bộ. Nó sử dụng multi-threaded blocking I/O để thực hiện nhiều tác vụ chạy song song với nhau.
![](https://images.viblo.asia/d02ed09b-e757-4dce-97b1-c065566d0e27.png)

Node.js về bản chất là ngôn ngữ bất đồng bộ, điều đó có nghĩa là JavaScript engine chạy qua toàn bộ đoạn code trong một lần và không đợi đến khi hàm return. Nó sử dụng mô hình thực thi event-driven non blocking I/O. Các dòng mã bên dưới một function sẽ thực thi trong khi function đó đang được thực thi và sẽ trả về output sau khi hoàn thành và do đó nó làm cho Node.js nhanh.


### Module
PHP sử dụng các công nghệ cài đặt module như PEAR (framework và hệ thống phân phối cho các component PHP có thể sử dụng lại)

Node.js đi kèm với một hệ thống quản lý package được gọi là NPM (Node Package Manager)

### Khả năng mở rộng

PHP được hỗ trợ trên hầu hết các hệ thống CMS phổ biến (như Drupal, Joomla, WordPress), điều này khiến nó thường được lựa chọn như một công cụ để xây dựng blog và các ứng dụng web thương mại điện tử.

Ngược lại, Node.js hoạt động hiệu quả như là một công cụ để xây dựng các giải pháp có thể mở rộng để xử lý hệ thống với số lượng lớn I/O. Cũng có thể mở rộng quy mô Node trên các hệ thống đa lõi, mặc dù cần nhiều effort.


### Web Servers

PHP chạy trên máy chủ web Apache / Nginx. Nó cũng có thể chạy trên máy chủ web IIS trong trường hợp máy Windows. 

NPM không cần máy chủ web, nó chạy trên môi trường thực thi của chính nó.

### Hiệu suất

Mặc dù Node.js luôn được nêu bật là có hiệu năng cao vì mô hình bất đồng bộ của nó, PHP cũng đã phát triển theo hướng này. Với các thư viện như ReactPHP, PHP cũng có thể được sử dụng trong lập trình hướng sự kiện.

![](https://images.viblo.asia/0d95f32a-27ba-401e-8965-b264b8b89da5.png)


> Tuy nhiên, khi so sánh cả hai môi trường, bạn sẽ thấy rằng Node.js nhanh hơn rất nhiều so với PHP, do một số lý do:
> - V8 engine tốc độ cao
> - Kết nối máy chủ liên tục
> - Callback function xử lý nhiều requests cùng một lúc

# Khi nào thì nên sử dụng PHP hay Node.js

Cả hai đều là ngôn ngữ back-end, nhưng Node.js có thể mang lại lợi thế nếu bạn đang muốn có một hệ thống sử dụng JavaScript ở cả front-end và back-end. Nếu bạn đang cố gắng lựa chọn giữa các công nghệ back-end, có lẽ nên đi sâu vào một chi tiết hơn một chút.

### Khi nào thì dùng PHP
**Máy chủ tập trung**: Trong trường hợp chúng ta không có kế hoạch nhân rộng ứng dụng của mình ra nhiều máy chủ, chúng ta có thể sử dụng LAMP (Linux, Apache, MySQL và PHP). Điều này có thể thay đổi tùy thuộc vào yêu cầu dự án.

**Tính di động**: PHP là ngôn ngữ linh hoạt. Chi phí rẻ cho việc lưu trữ web và sự sẵn có của các máy chủ cho PHP là không cần bàn. PHP có thể chạy trên hầu hết mọi nền tảng có cài đặt Apache, IIS và có một hệ thống database được hỗ trợ, điều này làm cho các ứng dụng PHP có thể linh động và dễ dàng triển khai.

### Khi nào thì dùng Node.js

**Dùng chung một ngôn ngữ**: Node.js sẽ là lựa chọn chính xác để sử dụng nếu dự án của bạn liên quan đến những thứ như MongoDB, ExpressJs, AngularJs, BackBoneJs, ReactJs, SPA (single page applications),.. Điều này giúp bạn dễ dàng có hệ thống hoàn toàn sử dụng JavaScript.

**Realtime**: Node.js rất tốt cho các ứng dụng yêu cầu realtime, tuy nhiên mình sẽ quan ngại về việc sử dụng Node.js cho các ứng dụng liên quan đến tài chính, tiền bạc, vì bản thân Javascript không đáng tin cậy khi nói về các con số vì mọi thứ đều là integer hoặc float và không có sự tách biệt rõ ràng thực sự giữa hai loại, "floating point number" là một ví dụ điển hình khi nói về tính toán với JavaScript. Một ngôn ngữ an toàn hơn được khuyến cáo khi làm việc trên các ứng dụng tài chính đòi hỏi nhiều tính toán, hoặc là cần cài thêm một thư viện đủ tin cậy.

**Tốc độ**: Node.js nhanh hơn nhiều so với PHP khi nói về tốc độ thực thi, nếu tốc độ là tất cả những gì bạn cần cho ứng dụng của mình, chẳng hạn như trò chơi nhiều người chơi trên  một trình duyệt hoặc ứng dụng trò chuyện, Node.js là lựa chọn tuyệt vời hơn so với PHP.

# Tổng kết
Mặc dù các cuộc tranh luận xung quanh Node.js và PHP không có vẻ là sẽ chấm dứt sớm, một điều quan trọng cần nhớ là không có gì độc nhất mà bạn chỉ có thể làm với một ngôn ngữ - chúng có thể hoán đổi cho nhau. Tuy nhiên, bạn luôn có thể tự định hướng những công nghệ sẽ được sử dụng trong quá trình phát triển sản phẩm của mình. Hãy lựa chọn thông minh.

Ref: https://medium.com/@varshney.shivam786/node-js-vs-php-for-backend-4078a3f65741