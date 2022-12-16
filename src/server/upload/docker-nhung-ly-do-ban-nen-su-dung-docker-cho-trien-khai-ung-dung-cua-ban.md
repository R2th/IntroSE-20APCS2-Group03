Đối với những ma mới bắt đầu tập tẹ triển khai (deploy) ứng dụng thì một phần không nhỏ sẽ có chút bỡ ngỡ với Docker và những khái niệm liên quan. Phần lớn các nền tảng, framework, dịch vụ thứ 3 đều bắt đầu với hướng dẫn triển khai cài đặt trực tiếp trên máy chủ hoặc máy của người dùng khiến nhiều người chưa quen với khái niệm Docker. Khi đó, họ sẽ đặt nhiều câu hỏi như Docker có những ưu điểm gì, tại sao phải dùng Docker mà không deploy theo cách truyền thống. Để trả lời những câu hỏi trên, bài viết này sẽ giải thích bằng việc xuất phát từ những vấn đề gặp phải trong quá trình vận hành khi những công nghệ như Docker chưa được sinh ra. Cụ thể những vấn đề đó là:

### Cài đặt môi trường

Việc cài đặt môi trường thường được đánh giá là một công việc tẻ nhạt và mất thời gian, nhưng lại là bắt buộc khi phát triển và triển khai phần mềm. Chúng ta muốn chạy ứng dụng Java, Tomcat thì phải có JRE hay JDK; chúng ta muốn chạy WordPress thì phải có PHP và các thư viện liên quan; đa phần ứng dụng web cũng phải làm thêm bước cấu hình và khởi tạo cơ sở dữ liệu,… Mặc dù bạn có thể bỏ công sức tạo các đoạn script (đoạn mã lệnh) để tăng tốc quá trình trên, nhưng không phải lúc nào đoạn script đó cũng chạy được, ví dụ như network đứt giữa chừng hay máy chủ chứa thư viện gặp vấn đề hay hệ điều hành không tương thích hoặc xung đột với những dịch vụ đã có.

*=> Với Docker, bạn chỉ cần cài đặt môi trường duy nhất một lần, và toàn bộ môi trường đó sẽ được đóng gói vào một image, và khi triển khai bạn đơn giản là chỉ cần chạy container với image đó là có toàn bộ môi trường đã được cài đặt một cách nhanh chóng.*

### Sự xung đột môi trường

Với một máy chủ, việc cài đặt nhiều phần mềm vào nó thì việc bị xung đột là hoàn toàn có thể xảy ra. Có rất nhiều trường hợp ứng dụng A cần python 2.0 nhưng ứng dụng B lại cần python 3.0 hay ứng dụng A nâng cấp thư viện dùng chung với B, nhưng B lại không tương tích với nó. Ngoài ra, nếu bạn muốn nâng cấp thư viện hoặc nền tảng (nâng cấp phiên bản MySQL 5 lên MySQL 8 để dùng thêm nhiều tính năng mới chẳng hạn), bạn phải sẵn sàng đối mặt với vấn đề rủi ro như nâng cấp bị lỗi giữa chừng khiến bản mới lẫn bản cũ đều không chạy được. Hoặc một trường hợp khác là bạn có 2 ứng dụng mà bạn muốn database của nó độc lập, nhưng mà việc cấu hình để 2 service database đồng thời trên một máy chủ cũng không phải đơn gian (khó nhất là 2 database đó lại khác phiên bản nhau).

*=> Với Docker, mỗi container chạy riêng biệt và độc lập không ảnh hưởng đến nhau, do đó việc xung đột môi trường là khó có thể xảy ra được. Tất cả đều được đóng gói lại, khi bạn nâng cấp, stop/start hay cài thêm nhiều dịch vụ khác nhau thì cũng không ảnh hưởng đến những dịch vụ có sẵn đang chạy.*

### Sự nhất quán giữa các môi trường
Mỗi phiên bản của một phần mềm thường sẽ phải được test (kiểm thử) qua nhiều môi trường như local, development, production, staging,… mỗi môi trường có thể do những người khác nhau cài đặt vào các thời điểm khác nhau. Mình từng gặp trường hợp là máy của developer chạy python 3.8, máy chủ development chạy python 3.6 nhưng production lại chạy bản 3.7 dẫn đến trường hợp local chạy được nhưng bản dev không chạy được, hay thư viện phiên bản mới lại đổi tham số đầu vào khiến tham số bị truyền sai,… Việc này gây khó khăn cho việc kiểm thử cũng như chứa nhiều rủi ro tiềm ẩn mà đôi khi đến lúc xảy ra lỗi chúng ta mới biết được.

*=> Với Docker, tất cả môi trường được đóng gói vào một docker image và nó được nhất quán trong toàn bộ quá trình phát triển và triển khai phần mềm. Do đó hạn chế được tối đa các lỗi tiềm ẩn do phiên bản thư viện hay môi trường.*

### Cạnh tranh tài nguyên

Một hệ thống có nhiều dịch vụ khác nhau thì một dịch vụ có thể lấn át tài nguyên (RAM hoặc CPU) của dịch vụ khác, khiến các dịch vụ đó không đủ tài nguyên để chạy (lỗi tràn bộ nhớ Java Stack Over Flow chẳng hạn). Đôi khi các port mà các dịch vụ sử dụng lại trùng nhau khiến tốn nhiều công để thiết lập. Trường hợp hi hữu là các dịch vụ còn có thể đọc ghi hay xóa các tệp của nhau.

*=> Với Docker, bạn có thể giới hạn tài nguyên của một container để tránh việc sử dụng quá mức tài nguyên. Ngoài ra, mỗi container hoạt động như một máy ảo (virtual machine) thu nhỏ, do đó khó có thể xảy ra trường hợp bị đụng độ tài nguyên của nhau giữa các dịch vụ.*

### Scale hệ thống

Một ứng dụng lớn với nhiều lượt truy cập sẽ phải sẵn sàng cho việc scale nó lên để đáp ứng lượng tải tương ứng. Cách nhanh nhất là bạn có thể scale bằng cách tăng cấu hình máy chủ (hay gọi cách khác là scale theo chiều dọc). Cách này đơn giản nhưng thường là mỗi lần scale như thế bạn phải tắt hoàn toàn máy chủ, rất tốn thời gian và làm gián đoạn người dùng. Cách các hệ thống thường làm là scale theo chiều ngang bằng cách tạo nhiều máy chủ và dùng cân bằng tải (load balancer) để điều hướng. Cách này ít tốn chi phí (nếu bạn không dùng và trả phí bản quyền cho Window Server) và không gây gián đoạn, đồng thời cũng tránh SPOF (Single Point Of Faiilure, một máy chủ gặp vấn đề vẫn có máy chủ khác thay thế). Tuy nhiên vấn đề là ta phải cài đặt lại môi trường tương tự nhau trên mỗi server, một công việc đã tẻ nhạt, mất thời gian mà phải làm lặp lại phải không? Sau đó mỗi lần phiên bản mới được release, chúng ta phải kiểm tra cẩn thận là phiên bản đó chạy được và đúng trên mỗi máy chủ.

*=> Với Docker, chỉ cần vào mỗi máy pull image về và chạy là xong, nếu bạn dùng Kubernetes thì chỉ cần một thao tác cập nhật lại service là hoàn tất, nhanh gọn và lỗi dường như hoàn toàn không xảy ra được.*

### Bảo mật

Các dịch vụ có thể yêu cầu quyền root thần thánh để chạy hoặc đơn giản là chúng có khả năng chạy được các script. Do đó nếu một dịch vụ bị tấn công hay truy cập trái phép, các hacker có thể có quyền làm nhiều thứ với máy chủ đang chạy dịch vụ đó. Xuất phát từ dịch vụ bị tấn công, thì tùy theo mức độ ảnh hưởng, một hacker có thể lấy cắp dữ liệu hoặc nguy hiểm hơn là chiếm đoạt cả máy chủ. Và khi trở thành nạn nhân, thì công việc bạn cần làm sau khi khóc là backup dữ liệu (nếu nó còn nguyên vẹn) và cài đặt lại máy chủ từ đầu.

*=> Với Docker, mọi sự ảnh hưởng chỉ nằm trong giới hạn của container đó, do đó khi container bị crash hoặc bị hacker chiếm đoạt, bạn đơn giản là stop và xóa nó đi, mọi phần còn lại của máy chủ không bị ảnh hưởng và hoạt động bình thường.*

### Kết luận

Như ta thấy ở trên, sử dụng Docker hoặc các công nghệ tương đương mang lại rất nhiều lợi ích đối với việc vận hành và triển khai sản phẩm. Do đó việc hiểu biết về các công nghệ như Docker là điều cần thiết với các DevOps nói riêng và nên tìm hiểu đối với các developer nói chung.

Cảm ơn các bạn đã đọc bài!

Link bài viết gốc: https://roobinson.com/2021/07/08/docker-tai-sao-ban-nen-su-dung-docker-cho-trien-khai-ung-dung-cua-ban/