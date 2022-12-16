# Mở đầu

Thời gian qua, mình có tham gia một vài buổi phỏng vấn với các bạn ứng viên của vị trí Fresher. Với các  vị trí Web Fresher, các Leader thường ưu tiên những câu hỏi foundation để khai thác kiến thức của ứng viên, trong hàng loạt những câu hỏi trong buổi phỏng vấn, mình tâm đắc nhất với một câu hỏi về kiến thức Web-base là : 
> Điều gì sẽ xảy ra từ khi nhập một tên miền (ví dụ: “viblo.asia”) vào trình duyệt đến khi trang được hiển thị?


Câu hỏi này bao quát được khá nhiều khái niệm trong quá trình xây dựng một ứng dụng Web, nó cũng đem lại nhiều điểm để người phỏng vấn có thể khai thác về ứng viên. Vì thế, trong bài viết này, mình sẽ chia sẻ về những điều mình biết về câu hỏi này, hay rộng hơn là `Web Architecture` - Kiến trúc của một ứng dụng web.
![](https://images.viblo.asia/30626381-a668-4966-ac6b-bf4dc984aa55.png)


# Điều gì sẽ xảy ra từ khi nhập một tên miền (ví dụ: “viblo.asia”) vào trình duyệt đến khi trang được hiển thị?

Khi bạn search google từ khóa Viblo.asia, và click vào kết quả sát nhất, nó sẽ chuyển hướng trình duyệt tới trang web. Bên dưới trình duyệt sẽ gửi 1 request tới `DNS  server` để phân giải tên miền `viblo.asia`, đưa ra địa chỉ máy chủ của Viblo  và gửi tiếp request đến đó.

Request đến được với máy chủ Viblo, sẽ đi qua một con `Load balancer`, nó sẽ chọn 1 trong nhiều replicas web server của Viblo để xử lý request này. Sau đó web server thực hiện render giao diện HTML và gửi nó quay trở lại cho trình duyệt của bạn. Trang HTML này sẽ chứa `Javascript`, `CSS`,.. và chúng được trình duyệt tải về từ các service CDN, các đường dẫn (thứ mà được cung cấp trong trang HTML trên). 

Cuối cùng thì trình duyệt sẽ kết hợp những thứ trên và hiển thị trang web tới bạn.

# Chia sẻ về các khái niệm được đề ra trong câu trả lời trên

## DNS

`DNS` viết tắt của `Domain Name System`, nó là 1 công nghệ cốt lõi để tạo nên mạng lưới website trên thế giới (world wide web). `DNS` cung cấp 1 cặp key / value để tìm kiếm tên miền (vd viblo.asia) tới địa chỉ IP (vd 44.139.72.xxx), nó giúp máy tính có thể điều hướng request đi tới chính xác máy chủ của ứng dụng web. 

Giống như ngày trước khi chúng ta còn sử dụng nhiều diện thoại có dây, sự khác nhau giữa tên miền và địa chỉ IP giống như việc chúng ta muốn gọi cho **Nguyễn Văn A** và số **0243.xxx.xxx** . Chúng ta cần dùng tới 1 cuốn sổ lưu số điện thoại, bây giờ chúng ta lại cần tới DNS để xác định tên miền đó có địa chỉ là bao nhiêu trên Internet.

## Load balancer 
![](https://images.viblo.asia/cd87587b-a51e-43a6-b47f-aca6fdf16d36.png)

Trước khi giải thích về `Load balancer`, mình muốn chia sẻ một chút về cách các ứng dụng mở rộng ứng dụng web bây giờ ( Scaling ), có 2 hướng **Scaling** là `horizontal scaling` và `vertical scaling`, mở rộng theo chiều ngang và mở rộng theo chiều dọc. Mở rộng theo chiều ngang (Horizontal scaling) nghĩa là bạn mở rộng ứng dụng bằng cách bổ sung thêm các máy chủ vào hệ thống hiện tại, trong khi đó mở rộng theo chiều dọc tức là bạn mở rộng khả năng của máy chủ hiện tại (bổ sung thêm RAM / CPU).

Trong quá trình phát triển web, thường thì mọi người luôn mong muốn có thể scaling ứng dụng theo chiều ngang bởi vì sự đơn giản, không làm gián đoạn trải nghiệm người dùng. Rủi ro về việc server bị lỗi, mất mạng, data center bị tắt là rất có thể xảy ra, vì thế có nhiều hơn 1 các thành phần đó sẽ khiến ứng dụng chạy tốt hơn, tránh làm gián đoạn trải nghiệm của người dùng.

Hơn nữa, mở rộng theo chiều ngang có thể giúp bạn tiến hành tách nhỏ các dịch vụ của ứng dụng backend (web server, database, cache), bằng việc để chúng chạy trên các server riêng biệt. 

Quay trở lại với `Load balancer`, nó là một công cụ hiện thực hóa việc mở rộng theo chiều ngang. Khi request đi tới ứng dụng (cái mà được tạo từ nhiều máy chủ khác nhau), nếu không có `Load balancer` mỗi máy chủ sẽ response request đó một lần =))  Bởi vậy, `Load balancer` sẽ xử lý request và phân tán nó tới server, đảm bảo việc tránh một server phải quá tải vì xử lý tất cả request.

## Web Server

![](https://images.viblo.asia/a4e7fa61-e0b6-476e-a394-10113ea5adad.jpg)

`Web server` là nơi tập trung xử lý các logic của ứng dụng, chúng xử lý các request của người dùng, gửi HTML lại cho trình duyệt. Để thực hiện được công việc này, chúng giao tiếp với rất nhiều thành phần khác nữa của hệ thống backend như database, caching layers, search service, data / logging queues,... Với một ứng dụng web có `Load balancer` thì thường có tối thiểu 2 `web server`, cắm vào `load balancer` để xử lý request của người dùng. Các web server thường được xây dựng với các ngôn ngữ lập trình cụ thể (PHP, Node.js, Ruby,..), hơn nữa còn có các web framework cho từng ngôn ngữ nữa (Laravel cho PHP, Express cho Node.js, Ruby on rails, ...).

## Database



Mỗi ứng dụng web hiện đại thường có 1 hoặc nhiều database để lưu trữ thông tin. Database cung cấp cách để lưu trữ dữ liệu theo cấu trúc, chèn dữ liệu mới, tìm kiếm, sửa và xóa chúng. `SQL` viết tắt của `Structure Query Language` cung cấp cách cơ bản để truy vẫn các dữ liệu quan hệ. `SQL` database lưu dữ liệu trong các table. Ngoài ra, còn có `NoSQL` viết tắt của `Non-SQL`, là công nghê mới về lưu trữ cơ sở dữ liệu, nó thường dùng để xử lý dữ liệu lớn, được tạo ra bởi các app được scaling rất nhiều.

## CDN
![](https://images.viblo.asia/ec7a738a-8b9b-44d6-824d-6fc8a67a1e9c.png)


`CDN` viết tắt của `Content Delivery Network`, là công nghệ cung cấp giải pháp cho phục vụ cho phân phối các thành phần tĩnh của website như HTML, CSS, Javascript, Image, đảm bảo tốc độ truy cập cao hơn so với giải pháp lưu trực tiếp trên web server. `CDN` sẽ phân tán nội dung thông qua rất nhiều `edge` server khắp thế giới, người cùng cuối sẽ tải các asset trên từ các `edge` server, thay vì web server chính.

# Tạm kết
Trên đây là một chút chia sẻ về các thành phần cơ bản của một Ứng dụng web, trong bài viết chỉ mang tính giới thiệu khái niệm chứ chưa đi sâu vào một vấn đề nào, hy vọng mình sẽ có thời gian để cùng tìm hiểu về vài vấn đề nổi bật.

# Nguồn tham khảo
- https://engineering.videoblocks.com/web-architecture-101-a3224e126947