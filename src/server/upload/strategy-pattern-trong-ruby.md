Các design pattern có thể là mô hình khái niệm mạnh mẽ để suy nghĩ về cách giải quyết các vấn đề trong phát triển phần mềm. [Được phổ biến vào những năm 90 bởi Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns), rất nhiều trong số đó còn liên quan đến ngày nay.

Chúng cũng có thể là những phím tắt tuyệt vời để hiểu kiến trúc của một hệ thống. 

Khi tôi học hỏi các khái niệm và pattern mới, tôi luôn thích có những ví dụ thực tế. Trong bài viết này chúng ta hãy cũng nhau tìm hiểu một ví dụ thực tế về **Strategy pattern** trong một Ruby gem rất nổi tiếng.

# Tổng quan
Có một sự thật là khi nghe mô tả về pattern này, chúng ta sẽ thấy nó có gì đó rất trừu tượng và đáng sợ. Bạn hãy thử tìm hiểu về [một bài viết trên Wikipedia](https://en.wikipedia.org/wiki/Strategy_pattern) để hiểu rõ hơn về pattern này.

Về cơ bản,  Strategy pattern hữu ích nhất khi bạn muốn cung cấp nhiều cách xử lý yêu cầu, không có kiến thức mã hóa cứng về các phương thức khác nhau đó vào đối tượng xử lý yêu cầu.

Để có một ví dụ thực tế, chúng tôi sẽ xem xét [gem Devise](https://github.com/plataformatec/devise) và một trong những thử viện đi kèm của nó, [Warden](https://github.com/hassox/warden).

# Strategy Pattern trong Warden

[Warden](https://github.com/hassox/warden) là Ruby gem cung cấp xác thực cho các ứng dụng Rack. Nó là một thư viện đi kèm của [Devise](https://github.com/plataformatec/devise), sử dụng Warden để xác thực các yêu cầu.

Warden cung cấp các cơ chế để xác thực một session, nhưng vẫn không rõ về cách chính xác để thực hiện xác thực. Ví dụ: Devise cung cấp `DatabaseAuthenticizable` strategy để xác thực cho username và password và `Rememberable` strategy để xác thực session cookie có sẵn.

Ở đây, chúng ta thấy Strategy pattern làm việc như thế nào; bằng cách giữ các thuật toán xác thực tách biệt với code thực hiện xác thực, các thuật toán mới có thể được sử dụng mà không cần sửa đổi chính Warden và Warden có thể chọn một strategy trong một thời gian chạy mà không cần biết về cách thức hoạt động của thuật toán.

Khái niệm về nhiều strategies này có lẽ là một bước ngoặt nhỏ với Strategy pattern cổ điển; thay vì chọn một thuật toán duy nhất trong thời gian chạy dựa trên các đặc điểm của yêu cầu đến, Warden lặp qua tất cả các strategies đã chọn cho đến khi tìm thấy một thuật toán hoạt động.

# Ví dụ
Hãy xem sâu hơn vào Warden. Bạn sẽ thấy hữu ích khi biết những pattern được thực hiện như thế nào. 

[`Warden::Strategies::Base`](https://github.com/wardencommunity/warden/blob/master/lib/warden/strategies/base.rb) cung cấp một giao diện chung, trừu tượng cho tất cả các strategies để kế thừa từ đó. Mỗi strategy chỉ cần thực hiện phương thức `authenticate!` của riêng mình, và Warden xử lí phần còn lại.

Ví dụ: Hãy tham khảo ở đây xem [`DatabaseAuthenticatable`](https://github.com/plataformatec/devise/blob/master/lib/devise/strategies/database_authenticatable.rb) của Devise thế nào:

{@gist: https://gist.github.com/mctaylorpants/afbe751bedf40f1b0e187b8b9c745721#file-devise-database_authenticatable-rb}

Ở đây, chúng ta tìm kiếm "authenticatable resource"  (thường là user) sau khi xác minh rằng mật khẩu đã được cung cấp. Sau đó, xác thực password và gọi `#success!`, mà Warden định nghĩa trong lớp cha. Nếu strategy không thành công - tức là nếu password không hợp lệ - code `#fail` strategy và cho phép Warden thử một phương thức xác thực khác.

Điều này trông như thế nào từ quan điểm của Warden? Khi một yêu cầu xác thực được kích hoạt, nó được xử lý bởi [`Warden::Proxy`](https://github.com/hassox/warden/blob/master/lib/warden/proxy.rb).

Trong `#_run_strargeties_for`, lặp lại thông qua các strategies được thiết lập cho resource và xác định xem bất kỳ trong số chúng sẽ cung cấp quyền truy cập:

{@gist: https://gist.github.com/mctaylorpants/584617712ecd67f924ba16df0a281fd6#file-warden-proxy-rb}

Strategy pattern đi vào hoạt động trên dòng 12 ở trên; `strategy._run!` gọi `#authenticate!` trong lớp strategy.

Chúng ta có thể thấy rằng code trong `#_run_strargeties_for` có liên quan đến một điều: tìm ra strategy tiềm năng trong số nhiều strategies tiềm năng sẽ xác thực thành công yêu cầu. Hãy tưởng tượng phương pháp này sẽ trông như thế nào nếu nó cũng chứa logic từ các strategy đó. Hãy tưởng tượng sẽ khó khăn như thế nào để thêm một cái mới!
# Tách biệt concerns

Được sử dụng như ở đây, Strategy pattern cung cấp một giao diện thực sự tuyệt vời giữa Warden, Devise và ứng dụng của bạn và cho phép mỗi thành phần tập trung vào một nhiệm vụ duy nhất. Warden quan tâm đến các chi tiết chính của các phiên xử lý trong Rack. Devise hook vào Rails để cung cấp luồng người dùng và các chi tiết khác. Các strategies cung cấp một giao diện plug-and-play giúp tách biệt những mối concerns đó.

# Kết luận
Sử dụng Strategy pattern trong mã của riêng bạn có thể là một cách hiệu quả để quản lý sự phức tạp. Nó bao hàm tính đa hình (polymorphism) và cho phép code của bạn tập trung vào việc gửi tin nhắn thay vì chuyển sang loại. Nó cũng nhấn mạnh một sự tách biệt các concerns; client không cần phải quan tâm đến nhiều tới thuật toán bên trong là gì.

Cảm ơn các bạn đã theo dõi. Bài viết được dịch từ [nguồn](https://medium.com/rubyinside/design-patterns-in-ruby-strategy-pattern-17e2fa191d9c).