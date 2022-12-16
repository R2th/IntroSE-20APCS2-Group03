## I/ Tổng quan về NodeJS
### 1/ Khái niệm Nodejs
- Node.js là một môi trường thực thi JavaScript bên ngoài trình duyệt, được xây dựng dựa trên Chrome’s V8 JavaScript engine. Chrome’s V8 JavaScript engine được viết bằng C++, giúp biên dịch code JavaScript thành mã máy một cách nhanh chóng, nên cho tốc độ xử lý và hiệu năng khá cao.
- Nodejs tạo ra được các ứng dụng có tốc độ xử lý nhanh, realtime thời gian thực.
- Nodejs áp dụng cho các sản phẩm có lượng truy cập lớn, cần mở rộng nhanh, cần đổi mới công nghệ, hoặc tạo ra các dự án Startup nhanh nhất có thể.
- Node.js chứa một thư viện built-in cho phép các ứng dụng hoạt động như một Webserver mà không cần phần mềm như Nginx, Apache HTTP Server hoặc IIS.
- Node.js cung cấp kiến trúc hướng sự kiện (event-driven) và non-blocking I/O API, tối ưu hóa thông lượng của ứng dụng và có khả năng mở rộng cao
- Mọi hàm trong Node.js là không đồng bộ (asynchronous). Do đó, các tác vụ đều được xử lý và thực thi ở chế độ nền (background processing)
### 2/ Ứng dụng của Nodejs
Nodejs thường được sử dụng để làm:
- Hệ thống Notification (Giống như facebook hayTwitter)
- Websocket server: Các máy chủ web socket như là Online Chat, Game Server…
- Fast File Upload Client: là các chương trình upload file tốc độ cao.
- Ad Server: Các máy chủ quảng cáo.
- Cloud Services: Các dịch vụ đám mây.
- RESTful API: đây là những ứng dụng mà được sử dụng cho các ứng dụng khác thông qua API.
- Any Real-time Data Application: bất kỳ một ứng dụng nào có yêu cầu về tốc độ thời gian thực.
- Ứng dụng Single Page Application (SPA): bởi những ứng dụng này thường request rất nhiều đến server thông qua AJAX
- Ứng dụng truy vấn tới NoSQL database như MongoDB, CouchDB,…
- Ứng dụng CLI: đây là các công cụ sử dụng command-line.

### 3/ Ưu và nhược điểm Nodejs
**a/ Ưu**
- Đặc điểm nổi bật của Node.js là nó nhận và xử lý nhiều kết nối chỉ với một single-thread. Điều này giúp hệ thống tốn ít RAM nhất và chạy nhanh nhất khi không phải tạo thread mới cho mỗi truy vấn giống PHP.
Ngoài ra, tận dụng ưu điểm non-blocking I/O của Javascript mà Node.js tận dụng tối đa tài nguyên của server mà không tạo ra độ trễ như PHP

- JSON APIs:
Với cơ chế event-driven, non-blocking I/O(Input/Output) và mô hình kết hợp với Javascript là sự lựa chọn tuyệt vời cho các dịch vụ Webs làm bằng JSON.

- Ứng dụng trên 1 trang( Single page Application): 
Nếu bạn định viết 1 ứng dụng thể hiện trên 1 trang (Gmail?) NodeJS rất phù hợp để làm. Với khả năng xử lý nhiều Request/s đồng thời thời gian phản hồi nhanh. Các ứng dụng bạn định viết không muốn nó tải lại trang, gồm rất nhiều request từ người dùng cần sự hoạt động nhanh để thể hiện sự chuyên nghiệp thì NodeJS sẽ là sự lựa chọn của bạn.

- Shelling tools unix: 
NodeJS sẽ tận dụng tối đa Unix để hoạt động. Tức là NodeJS có thể xử lý hàng nghìn Process và trả ra 1 luồng khiến cho hiệu xuất hoạt động đạt mức tối đa nhất và tuyệt vời nhất.

- Streamming Data (Luồng dữ liệu):
Các web thông thường gửi HTTP request và nhận phản hồi lại (Luồng dữ liệu). Giả xử sẽ cần xử lý 1 luồng giữ liệu cực lớn, NodeJS sẽ xây dựng các Proxy phân vùng các luồng dữ liệu để đảm bảo tối đa hoạt động cho các luồng dữ liệu khác.

- Ứng dụng Web thời gian thực:
Với sự ra đời của các ứng dụng di động & HTML 5 nên Node.js rất hiệu quả khi xây dựng những ứng dụng thời gian thực (real-time applications) như ứng dụng chat, các dịch vụ mạng xã hội như Facebook, Twitter,…

- Viết được cho cả 2 phía server và client. Chạy đa nền tảng trên Windows, MAC hoặc Linux. Hơn nữa cộng đồng Nodejs rất lớn và hoàn toàn miễn phí. Các bạn có thể thấy cộng đồng Nodejs lớn như thế nào tại đây, các package đều hoàn toàn free.

**b/ Nhược**
- Ứng dụng nặng tốn tài nguyên: 
Nếu bạn cần xử lý các ứng dụng tốn tài nguyên CPU như encoding video, convert file, decoding encryption… hoặc các ứng dụng tương tự như vậy thì không nên dùng NodeJS (Lý do: NodeJS được viết bằng C++ & Javascript, nên phải thông qua thêm 1 trình biên dịch của NodeJS sẽ lâu hơn 1 chút ). Trường hợp này bạn hãy viết 1 Addon C++ để tích hợp với NodeJS để tăng hiệu suất tối đa !

- Giống như hầu hết các công nghệ mới, việc triển khai Node.js trên host không phải là điều dễ dàng. Nếu bạn có một web hosting xài chung, bạn không thể đơn giản tải lên một ứng dụng Node.js và mong chờ nó hoạt động tốt. VPS và dedicated server là một sự lựa chọn tốt hơn - bạn có thể cài đặt Node.js trên chúng

- Thiếu sự kiểm duyệt chất lượng các module Nodejs

### 4/ Khi nào nên và không nên sử dụng Nodejs
**Bạn KHÔNG nên sử dụng Node.js khi:**

- Xây dựng các ứng dụng hao tốn tài nguyên:
Bạn đừng mơ mộng đến Node.js khi bạn đang muốn viết một chương trình convert video. Node.js hay bị rơi vào trường hợp thắt cổ chai khi làm việc với những file dung lượng lớn.

- Một ứng dụng chỉ toàn CRUD:
Node.js không nhanh hơn PHP khi bạn làm các tác vụ mang nặng tính I/O như vậy. Ngoài ra, với sự ổn định lâu dài của các webserver script khác, các tác vụ CRUD của nó đã được tối ưu hóa. Còn Node.js? Nó sẽ lòi ra những API cực kỳ ngớ ngẩn.

- Bạn chưa hiểu hết về Node.js
Node.js cực kỳ nguy hiểm trong trường hợp này, bạn sẽ rơi vào một thế giới đầy rẫy cạm bẫy, khó khăn. Với phần lớn các API hoạt động theo phương thức non-blocking/async việc không hiểu rõ vấn đề sẽ làm cho việc xuất hiện những error mà thậm chí bạn không biết nó xuất phát từ đâu? 

**Vậy bạn nên dùng Node.js khi nào?**

- Node.js thực sự tốt trong việc xây dựng RESTful API (json). Gần như không có ngôn ngữ nào xử lý JSON dễ dàng hơn Javascript, chưa kể các API server thường không phải thực hiện những xử lý nặng nề nhưng lượng concurrent request thì rất cao. Mà Node.js thì xử lý non-blocking. Chẳng còn gì thích hợp hơn Node.js trong trường hợp này!

- Những ứng dụng đòi hỏi các giao thức kết nối khác chứ không phải chỉ có http. Với việc hỗ trợ giao thức tcp, từ nó bạn có thể xây dựng bất kỳ một giao thức custom nào đó một cách dễ dàng.

- Những ứng dụng thời gian thực: Khỏi phải nói vì Node.js dường như sinh ra để làm việc này!

- Những website stateful. Node.js xử lý mọi request trên cùng một process giúp cho việc xây dựng các bộ nhớ đệm chưa bao giờ đơn giản đến thế: Hãy lưu nó vào một biến global, và thế là mọi request đều có thể truy cập đến bộ nhớ đệm đó. Caching sẽ không còn quá đau đầu như trước đây, và bạn có thể lưu cũng như chia sẻ trạng thái của một client với các client khác ngay trong ngôn ngữ, chứ bạn không cần thông qua các bộ nhớ ngoài!

###  5/ Ví dụ server dạng helloworld với Nodejs
```
const http = require('http');
const hostname = 'localhost';
const port = 8000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
## II/ So sánh Nodejs với PHP. Nên chọn ngôn ngữ nào?

Mặc dù cả PHP và Nodejs đều có thể xây dựng được những ứng dụng rất phức tạp. Rất nhiều hệ thống lớn sử dụng PHP hay Nodejs. Tất nhiên là PHP và Nodejs khác nhau hoàn toàn về tư tưởng và cả kiến trúc thiết kế.

Chúng ta cùng điểm qua một số chỉ số về PHP và Nodejs xem thế nào.

Đầu tiên là điểm qua 10 website lớn sử dụng hai công nghệ web này:

![](https://images.viblo.asia/0972c65d-5691-4568-abc7-b47f4c7b0c6d.png)
Về cơ bản thì những website lớn đều sử dụng qua lại hai công nghệ này. Nên ở điểm tin cậy thì hai công nghệ này coi như bằng nhau.

Xu hướng và cộng đồng sử dụng PHP và Javascript cũng tương đương.
![](https://images.viblo.asia/3092615c-826c-4617-8a42-2d13060b88e8.png)

**1 số ưu nhược điểm của PHP**
- Ưu
    + Có nhiều frameworks tốt, hỗ trợ đầy đủ: 
    
        PHP có rất nhiều platform tốt phục vụ việc xây dựng website như: WordPress, Joomla, Drupal… hay framework để tạo web app nhanh như Laravel, Symfony, ZendFramework…

        Với sự hỗ trợ của các CMS như WordPress, bạn dễ dàng triển khai một blog hay một trang thương mại điện tử với đầy đủ chức năng.

        PHP có lịch sử ra đời sớm nên cộng đồng cũng cực đông, có nhiều giải pháp mã nguồn mở được viết bằng PHP.
    + PHP là ngôn ngữ dành riêng cho thiết kế web
    
        Không giống như Java hay Python hay những ngôn ngữ đa năng khác, ngay từ đầu PHP được thiết kế dành riêng cho thế giới web. Đó là lý do tại sao PHP có đầy đủ những tính năng để xử lý HTML, server và database(MYSQL nói riêng).
- Nhược
    + Bị trộn lẫn giữa PHP và HTML
            
        Chính vì đặc điểm này mà người ta nói PHP là ngôn ngữ không hỗ trợ tốt mô hình MVC. MVC là mô hình chuẩn của thế giới web rồi. Vì sự mix giữa PHP và HTML nên trong mô hình MVC, chúng ta sẽ khó phân tách rạch ròi giữa View và Controller.

        Khi đó ứng dụng web sẽ khó mở rộng và thêm các tính năng mới sau này.
    + Sử dụng mô hình Client-Server cũ kĩ
    
        PHP tuân theo mô hình client-server cổ điển. Tức là mọi request tới ứng dụng sẽ lần lượt thực hiện các bước như: khởi tạo ứng dụng, kết nối tới database, xử lý tác vụ, sau đó cấu hình thông số và render trang HTML để trả về cho browser.

        Chính vì việc thực hiện tuần tự như vậy mà ứng dụng PHP sẽ chậm hơn đôi chút so với Nodejs. 

*Kết luận:* Với ưu và nhược điểm riêng biệt nhau, không thể nói Nodejs hay PHP tốt hơn được. Việc chọn ngôn ngữ nào để thực hiện ứng dụng, dự án phụ thuộc vào rất nhiều yếu tố liên quan nữa. Hãy lựa chọn công nghệ hợp lý cho mình