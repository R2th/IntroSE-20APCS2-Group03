Xin chào mọi người, như mọi người đã biết, Laravel là một trong những Framework hot nhất hiện nay. Với việc sở hữu một hệ sinh thái lớn có lưu trữ tức thời cũng như hệ thống triển khai. Nó đã trở nên khá thông dụng và miễn phí cùng với đó là sở hữu một cộng đồng support rất lớn. Vậy, Laravel có gì mà lại được nhiều Dev chúng ta tin dùng đến thế? Thì trong bài viết này mình sẽ liệt kê một vài điểm nổi trổi của Laravel nhé.

### 1. Cộng đồng hỗ trợ mạnh mẽ

Với việc có một cộng đồng hỗ trợ và giải đáp về Laravel web application không khó có thể tìm thấy như Laracast, Viblo hay stackoverflow thì việc lập trình của các dev chúng ta không còn quá khó khăn đúng không nào. Ví dụ, Laracasts là công cụ học tập quan trọng của Laravel web development, là sự kết hợp giữa các hướng dẫn bằng video miễn phí và trả phí giúp người dùng hiểu về cách sử dụng Laravel. Jeffery, người thực hiện các video là một chuyên gia và một người hướng dẫn có kinh nghiệm trong nhiều năm. Ông đã đưa ra các hướng dẫn rõ ràng và chính xác, tạo ra những nội dung chất lượng cao, các bài học ý nghĩa. Chính vì vậy việc học Laravel web development trở nên thú vị hơn bao giờ hết. 

Bạn có thể tìm thấy ngay [tại đây](https://laracasts.com/)

### 2. Authentication và Authorization

Bất kỳ web app nào thì phần authentication cũng là một trong những phần quan trọng nhất. Laravel giúp sắp xếp authorization logic và kiểm soát truy cập vào tài nguyên, chức năng của web. Framework này cung cấp tính linh hoạt cho các lập trình viên trong việc xây dựng mọi thứ với website từ nhỏ đến lớn.

Laravel giúp cho việc thực hiện việc xác thực vô cùng đơn giản. Trong thực tế, hầu hết mọi thứ đã được cấu hình cho bạn mà bạn chỉ việc dùng. File cấu hình xác thực được đặt tại config/auth.php, bao gồm một số hướng dẫn tùy biến rõ ràng cho việc tùy biến cách xử lí của các dịch vụ authentication. Tất cả đều có trong Laravel Authentication, bạn có thể tìm hiểu thêm [ở đây](https://laravel.com/docs/5.8/authentication) nhé.

Với Authorization, việc phân quyền người dùng của bạn sẽ không còn là một vấn đề phải đau đầu suy nghĩ. Laravel cung cấp một cách đơn giản để tổ chức các logic cấp quyền và điều khiển việc truy cập vào tài nguyên

Laravel cung cấp Gate và Policy, nó giống như Route với Controller.

Gate cung cấp một giải pháp dựa trên Closure để phân quyền trong khi các policy giống với controller nhóm các logic nghiệp vụ liên quan đến Model hoặc các tài nguyên. 

Phần lớn các ứng dụng sẽ sử dụng cả Gate và Policy, Gate được áp dụng cho các hành động không liên quan đến Model hoặc các tài nguyên như việc truy nhập vào trang quản trị dashboard. Ngược lại, policy được sử dụng khi bạn muốn cho phép một hành động truy nhập vào một model hoặc nguồn tài nguyên.

Bạn có thể đọc và tìm hiểu thêm về cách sử dụng [tại đây ](https://laravel.com/docs/5.8/authorization)nhé.

### 3. Bảo mật

Laravel web development đảm bảo an toàn cho web application. Nó sử dụng mật khẩu băm (#) và không lưu mật khẩu ở dạng văn bản thuần túy, sử dụng thuật toán băm Bcrypt trong việc tạo mật khẩu được mã hóa. SQL statement được sử dụng bởi Laravel khiến cho các injection attack khó tiếp cận được. Laravel cung cấp một phương pháp đơn giản để thoát khỏi user input, để tránh injection của thẻ script (<script>).

Các bạn có thể tham khảo thêm tại [Resettting Passwords](https://laravel.com/docs/5.8/passwords), [Hashing](https://laravel.com/docs/5.8/hashing)
    
### 4.  Artisan

Đối với những ai đã và đang làm việc với Laravel, thì không ai là không biết những dòng lệnh với tên gọi là Artisan. Đây là một công cụ được cung cấp bởi Laravel web development. Lập trình viên tương tác với framework bằng cách sử dụng dòng lệnh tạo và quản lý Laravel web development project environment. Artisan là một công cụ tích hợp được cung cấp bởi Laravel giúp lập trình viên giải quyết các công việc mang tính lặp đi lặp lại nhàm chán.

Chúng ta có thể tìm hiểu và thực hiện[ tại đây](https://laravel.com/docs/5.8/artisan) 

### 5.  ORM Eloquent
ORM (Object Relational Mapping) là một kỹ thuật lập trình dùng để chuyển đổi dữ liệu giữa một hệ thống không hướng đối tượng như cơ sở dữ liệu sang hệ thống hướng đối tượng như lập trình hướng đôi tượng trong PHP. Kỹ thuật này tạo ra các đối tượng CSDL ảo có thể được lập trình trong mã nguồn và có nhiều ưu điểm như mã nguồn trở lên rõ ràng và dễ bảo trì, dễ dàng thao tác với dữ liệu và thực hiện việc tối ưu hệ thống thông qua việc sử dụng bộ đệm… Các công việc khó hoặc không thể xử lý ở database layer sẽ được đưa lên lớp ứng dụng. ( Theo [All Laravel](https://allaravel.com/laravel-tutorials/laravel-eloquent-orm-phan-1-thao-tac-voi-database-qua-eloquent-model/) )
    
Việc thao tác với ORM không hề khó, nhất là khi các bạn đã dùng qua MVC thì đây là một kỹ thuật lập trình rất tuyệt vời dành cho những Dev yêu thích Laravel. Ngoài ra, còn có thêm những mẹo để giúp chúng ta trong quá trình triển khai [ORM Eloquent](https://laravel.com/docs/5.8/eloquent), các bạn xem thêm [tại đây](https://chungnguyen.xyz/posts/20-meo-khi-lam-viec-voi-laravel-eloquent) nhé.
    
### 6. Blade Templating Engine
    
Đây là tính năng tốt nhất của Laravel web developing framework. Không giống những PHP templating engine phổ biến khác, Blade không giới hạn chúng ta sử dụng code PHP trong views. Tất cả các file Blade sẽ được dịch thành file code PHP và cache cho đến khi file Blade bị thay đổi, điều đó cũng có nghĩa là Blade tự làm tất cả những việc cần thiết để có thể chạy views cho ứng dụng của bạn. Laravel web development cho phép người dùng soạn thảo mã PHP đơn giản trong layout shape, do đó giảm thiểu được các khó khăn khi sử dụng.
    
Về cách sử dụng các bạn xem [chi tiết tại đây](https://laravel.com/docs/5.8/blade) nhé.
    
### 7. MVC
Với việc hỗ trợ MVC như Symfony, đảm bảo sự rõ ràng giữa logic và presentation. MVC giúp cải thiện hiệu suất và có nhiều chức năng tích hợp.
![](https://images.viblo.asia/513c02e6-4923-4565-8876-cd467982bd34.png)

    
Bài viết này là sự tổng hợp của mình về những điểm nổi bật của Laravel khiến cho nó trở thành một trong những Framework đáng tin dùng nhất hiện nay, ngoài ra còn rất nhiều điểm khác nổi bật ở Laravel như Mailer, Queue, Middleware, Transaction, Helpers, CSRF Protection,...

Nếu các bạn có bất kỳ thắc mắc hay câu hỏi nào, hãy để lại và mình sẽ giải đáp ở phần comment hoặc ở trong bài viết tiếp theo nhé. Cảm ơn các bạn đã theo dõi bài viết của mình.
Hẹn gặp lại các bạn vào bài viết tiếp theo.
    
Link tham khảo:
    
https://viblo.asia/p/tai-sao-laravel-la-framework-tot-nhat-2018-vyDZOxA9lwj
    
https://tech.vccloud.vn/laravel-la-gi-20181215105304519.htm