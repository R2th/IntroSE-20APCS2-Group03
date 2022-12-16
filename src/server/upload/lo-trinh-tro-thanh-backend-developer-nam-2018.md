Phát triển web ngày nay đã hoàn toàn khác biệt so với những năm về trước, có rất nhiều thứ khác nhau có thể dễ dàng cản trở bất kỳ ai tham gia vào quá trình phát triển web. Đó là một trong những lý do khiến chúng tôi quyết định vẽ ra một bức tranh tổng quan về lộ trình để trở thành một lập trình viên backend, để những ai đã và đang mong muốn trở thành lập trình viên  backend có được định hướng phát triển sau này.
    
   Hãy bắt đầu bằng biểu đồ dưới đây. Bạn có thể tìm thấy chi tiết lộ trình thông qua ảnh bên dưới, tuy nhiên mình sẽ giải thích chi tiết từng bước một bằng miêu tả bên dưới.
![](https://images.viblo.asia/4940d0e3-cffe-46d9-9426-608db0934670.png)
   Hãy chia nhỏ và giải thích từng bước trong phần bên dưới. 
    
   Trước khi bắt đầu, các bạn phải kiến thức nhất định về HTML/CSS, mặc dù trong lộ trình không đề cập đến nhưng mình khuyên các bạn nên ít nhất là hiểu và viết được HTML/CSS cơ bản.
##     BƯỚC 1: HỌC MỘT NGÔN NGỮ LẬP TRÌNH
   Ngày nay có rất nhiều ngôn ngữ để bạn lựa chọn. Mình chia nhỏ chúng thành các danh mục như ảnh trên để giúp bạn quyết định dễ dàng. Đối với người mới bắt đầu, mình khuyên các bạn nên chọn một ngôn ngữ kịch bản (scripting languages) để học bởi vì chúng được sử dụng khá nhiều cũng như dễ học. Nếu bạn có hiểu biết về frontend, bạn nên lựa chọn Node.js để dễ làm quen cũng như khá nhiều lựa chọn công việc sau này.
   
   Nếu bạn đã và đang là một lập trình backend và đã hiểu một vài ngôn ngữ kịch bản. Mình khuyên các bạn chọn một ngôn  ngữ khác ngoài ngôn ngữ kịch bản như ngôn ngữ "Functional" hoặc "Multiparadigm". Ví dụ: nếu bạn đã và đang sử dụng PHP hoặc Node.js, đừng howcj thêm Python hay Ruby mà hãy thử Erlang hoặc Golang. Điều đó chắc chắn sẽ giúp bạn mở mang cũng như phát triển kiến thức của bản thân.
## BƯỚC 2: THỰC HÀNH NHỮNG THỨ BẠN HỌC
  Không có cách nào tốt để học bằng cách thực hành. Thứ nhất bạn chọn ngôn ngữ và hiểu được các khái niệm cơ bản, và mang chúng ra sử dụng. Cố gắng tạo càng nhiều ứng dụng nhỏ càng tốt.
##   BƯỚC 3: TÌM HIỂU VỀ PACKAGE MANAGER
  Khi bạn đã hiểu cơ bản về ngôn ngữ cũng như tạo được một số ứng dụng cơ bản, chúng ta bắt đầu học về  package manager cho ngôn ngữ bạn lựa chọn. Pakage manager giúp bạn mở rộng ứng dụng bằng các thư viện bên  ngoài.
 
 Khái niệm chi tiết bạn có thể đọc tại đây: [Pakage manager](https://toidicodedao.com/2017/05/30/package-manager-la-gi/)
  
  Nếu bạn chọn PHP bạn nên học về Composer, Node.js là NPM hoặc Yarn, Python là Pip và Ruby sử dụng Gems. Bất kể bạn lựa chọn là gì, hãy tiếp tục tìm hiểu và học cách sử dụng chúng.
##  BƯỚC 4: TIÊU CHUẨN VÀ CÁCH THỰC HÀNH TỐT NHẤT
   Mỗi ngôn ngữ có một tiêu chuẩn và các thực hành riêng để làm mọi thứ. Nghiên cứu về những tiêu chuẩn theo ngôn  ngữ bạn chọn. Ví dụ PHP có tiêu chuẩn PHP-FIG và PSRs, Node.js cũng có nhiều quy tắc cộng đồng và tương tự với các ngôn ngữ khác.
## BƯỚC 5: BẢO MẬT
   Đảm bảo rằng bạn đã đọc về các phương pháp tối ưu nhất để đảm bảo an toàn cho ứng dụng của bạn. Đọc các hướng dẫn của Open Web Application Security Project (OWASP) để hiểu về những vấn đề bảo mật khác nhau và làm thế nào để tránh chúng với ngôn ngữ bạn chọn.
## BƯỚC 6: THỰC HÀNH
  Bây giờ khi bạn đã có những hiểu biết nhất định về ngôn ngữ, các tiêu chuẩn và cách thực hành các tiêu chuẩn, bảo mật và cách sử dụng package manger. Bây giờ hãy phát triển thêm bằng cách tự tao một pakage và công khai cho người khác sử dụng.
  
  Ví dụ: Nếu bạn sử dụng PHP bạn nên phát hành Packagist, nếu bạn sử dụng Node.js bạn có thể phát hành trên Npm ... 
   
  Nếu  bạn đã hoàn thành những điều trên,  hãy tìm kiếm một số projects trên Github, mở một số pull requests trong các projects đó:
*   Refactor và implement lại code là một trong những cách tốt nhất để bạn học.
*   Xem xét những sự cố  có thể xảy ra và giải quyết chúng.
*   Bổ sung thêm bất kỳ tính năng nào có thể.
## BƯỚC 7: HỌC VỀ KIỂM THỬ
  Có rất nhiều loại kiểm thử để bạn có thể test lại ứng dụng của mình. Hiểu về những loại kiểm thử này và mục đích của chúng. Nhưng trước tiên, hãy học để biết sử dụng Unit Tests và Integration tests cho ứng dụng của bạn. Đồng thời hiểu về các thuật ngữ trong kiểm thử như: mocks, stubs...
## BƯỚC 8: THỰC HÀNH KIỂM THỬ
  Thực hành về kiểm thử bằng cách viết unint test cho các ứng dụng mà bạn đã hoàn thiện lúc trước, đặc biệt là những gì bạn làm ở bước 6.
  
  Đồng thời tính toán và tìm hiểu mức độ phù hợp cho các test mà bạn đã viết.
## BƯỚC 9: HỌC VỀ  HỆ QUẢN TRỊ CƠ SỞ DỮ LIỆU QUAN HỆ
  Học cách xử lý dữ liệu của bạn trong cơ sở dữ liệu. Trước khi lựa chọn một CSDL và học chúng bạn nên tìm  hiểu về các thuật ngữ cơ bản trong CSDL như: khóa, chỉ mục, chuẩn hóa CSDL...
  
  Có nhiều lựa chọn để bắt đầu. Tuy nhiên khi bạn đã quen thuộc với một CSDL thì những loại còn lại sẽ không khó để làm quen. Những CSDL bạn nên học là MySQL, MariaDB và PostgreSQL. Hãy bắt đầu bằng MySQL.
  
##   BƯỚC 10: THỰC HÀNH
  Đây là thời điểm bạn mang tất cả những gì bạn học ra sử dụng.
  
  Tạo một ứng dụng đơn giản bằng cách sử dụng những thứ bạn đã học. Lựa chọn một ý tưởng bất kỳ, có thể tạo một blog đơn giản và triển khai các tính năng như sau:
*   Tài khoản người dùng - Đăng ký và đăng nhập
*   Người dùng đã đăng nhập có thể  tạo bài đăng.
*   Người dùng có thể xem toàn bộ bài đăng mà người dùng đó tạo.
*   Đồng thời người dùng có thể xóa bài đăng của họ.
*   Đảm bảo rằng người dùng chỉ có thể nhìn thấy bài đăng của mình và không thể nhìn thấy bài đăng của người khác.
*   Viêt unit/integration test cho ứng dụng.
*   Bạn có thể áp dụng chỉ mục cho truy vấn. Đảm bảo rằng chỉ mục đó được sử dụng.
## BƯỚC 11: HỌC VỀ MỘT FRAMEWORK
  Tùy thuộc vào dự án cũng như ngôn ngữ bạn lựa chọn, bạn có thể cần hoặc không cần sử dụng framework. Mỗi ngôn ngữ có nhiều lựa chọn khác nhau, vì vậy hãy cân nhắc và lựa chọn một framework thích hợp cho dự án của bạn.
  
  Nếu bạn sử dụng PHP, mình khuyên bạn nên bắt đầu với Laravel hoặc Symfony và  với các micro-framework như Lumen hoặc Slim. Nếu bạn lựa chọn Node.js, có nhiều lựa chọn khác nhau nhưng tiêu biết là Express.js.
##  BƯỚC 12: THỰC HÀNH TIẾP
  Đối với bước này, chuyển đổi ứng dụng bạn tạo trong bước 10 bằng cách sử dụng framework bạn chọn.
##  BƯỚC 13: HỌC VỀ HỆ QUẢN TRỊ CƠ SỞ DỮ LIỆU KHÔNG QUAN HỆ
  Trước tiên hãy hiểu CSDL không quan hệ là gì, chúng khác biệt thế nào với CSDL quan hệ và tại sao lại sử dụng chúng. Có rất nhiều lựa chọn để bắt đầu nhưng một số lựa chọn phổ biến là MongoDB, Cassandra, RethinkDB và Couchbase.  Nếu phải lựa chọn bạn nên  bắt đầu với MongoDB.
## BƯỚC 14: BỘ NHỚ ĐỆM
  Học cách sử dụng bộ nhớ đệm trong ứng dụng của bạn. Học cách sử dụng Redis hoặc Memcached và triển khai bộ nhớ đệm cho ứng dụng bạn tạo ở bước 12.
## BƯỚC 15: KHỞI TẠO RESTFUL APIS
  Hiểu về REST và học cách tạo RESTful APIs và chắc rằng bạn đã đọc hết về REST từ bản gốc của [Roy Fielding](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf). Và chắc rằng bạn có thể tranh luận với bất kỳ ai nếu họ nói REST chỉ dành cho các HTTP APIs.
## BƯỚC 16: HỌC VỀ SỰ KHÁC NHAU CỦA CÁC PHƯƠNG THỨC XÁC THỰC
  Học về sự khác nhau giữa sự xác thực (Authentication) và sự cho phép (Authorization). Bạn nên hiểu chúng là gì, chúng khác nhau như thế nào và khi nào chúng được sử dụng.
*   OAuth — Open Authentication
*   Basic Authentication
*   Token Authentication
*   JWT — JSON Web Tokens
*   OpenID
## BƯỚC 17: MESSAGE BROKERS
  Học về  message brokers và hiểu khi nào và tại sao lại sử dụng chúng. Có rất nhiều lựa chọn cho bạn nhưng nổi bật trong đó là RabbitMQ và Kafka. Nếu cần phải lựa chọn một thì hãy chọn RabbitMQ để khởi đầu.
## BƯỚC 18: CÔNG CỤ TÌM KIẾM
 Khi ứng dụng của bạn phát triển lên, việc tìm kiếm là không thể tránh khỏi. Vì vậy việc học và nghiên cứu các giải pháp tìm kiếm là một việc cần thiết. Có nhiều lựa chọn cho bạn, hiện nay elasticsearch là một trong những ký thuật được sử dụng rất nhiều trong thực tế.
## BƯỚC 19: HỌC CÁCH SỬ DỤNG DOCKER
 Vì sao phải học doker cũng như lợi ích của việc học nó bạn có thể tìm hiểu [tại đây](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-ByEZkWrEZQ0)
## BƯỚC 20: HIỂU BIẾT VỀ WEB SERVERS
 Nếu bạn đã đến tận bước này chắc chắn bạn đã quen thuộc với server trong những bước trước đó. Trong bước này chủ yếu để bạn tìm hiểu về sự khác nhau giữa các web servers, hiểu về giới hạn cũng như các cách tùy chỉnh cấu hình khác nhau của server.

## BƯỚC 21: HỌC CÁCH SỬ DỤNG WEB SOCKETS
 Học cách viết ứng dụng real-timem với web-socket và tạo một vài ứng dụng đơn giản với nó. Bạn có thể sử dụng ứng dụng blog bạn tạo ở các bước trước để tạo ứng dụng real-time cập nhật mỗi khi có bài đăng mới.
##  BƯỚC 22: HỌC GRAPHQL
 Học cách tạo APIs với GraphQL. Hiểu nó khác so với REST như thế nào và vì sao nó được gọi là REST 2.0
## BƯỚC 23: GRAPH DATABASES
 Các mô hình biểu đồ thể hiện một cách rất linh hoạt trong việc xử lý các mối quan hệ trong dữ liệu của bạn và các cơ sở dữ liệu đồ thị cung cấp lưu trữ, truy xuất và truy vấn nhanh chóng và hiệu quả cho nó. Tìm hiểu cách sử dụng Neo4j hoặc OrientDB.
## BƯỚC 24: TIẾP TỤC KHÁM PHÁ
 Khi bạn bắt đầu học và thực hành, bạn chắc chắn sẽ nhận ra nhiều thứ mình không đề cập tới trong lộ trình. Hãy mở rộng tâm trí và đón nhận, học hỏi những điều mới mẻ.
 
 Và hãy nhớ rằng chìa khóa là sự thực hành càng nhiều càng tốt. Cảm ơn các bạn đã theo dõi bài viết của mình
# NGUỒN THAM KHẢO:
https://medium.com/tech-tajawal/modern-backend-developer-in-2018-6b3f7b5f8b9