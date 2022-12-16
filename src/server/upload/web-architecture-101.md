## Giới thiệu
Trong lúc lướt web thì mình đọc được bài viết khá hay với nội dung về kiến trúc hệ thống để một ứng dụng web nói chung hoạt động hiệu quả, chính vì thế mình quyết định sẽ dịch lại và chia sẻ lại với mọi người.

Bài viêt được dịch từ nguồn https://engineering.videoblocks.com/web-architecture-101-a3224e126947

![](https://images.viblo.asia/88714677-f434-422d-b25a-b5b60a50c4f0.png)
Sơ đồ trên là một dạng kiến trúc phổ biến áp dụng trong các ứng dụng web bao gồm các thành phần thường được sử dụng. Nếu thấy hơi phức tạp thì bạn có thể đọc qua ví dụ sau trước khi đi vào cụ thể từng thành phần.
> 
> Một người dùng tìm kiếm trên Google từ khóa “Strong Beautiful Fog And Sunbeams In The Forest”. Kết quả đầu tiên xuất hiện là từ Storyblocks (một trang web lưu trữ và chia sẻ ảnh). Người dùng nhấn vào kết quả, chuyển hướng trình duyệt đến trang chi tiết ảnh. Trước đó, trình duyệt của người dùng đã gửi một request đến máy chủ DNS để tìm cách liên lạc với Storyblocks, và sau đó gửi một request tiếp theo.
> 
> Request đó đến load blancer và nó sẽ chọn ngẫu nhiên một trong số các web server để tiếp tục xử lý request. Web server tìm kiếm thông tin về hình ảnh từ caching service và tìm nạp các dữ liệu còn lại về ảnh đó từ database. Ngoài ra dữ liệu về màu sắc cũng cần được tính toán, nên một job cho việc đó được đẩy vào job queue để job server thực hiện một cách không đồng bộ, cập nhật database với kết quả đó một cách phù hợp.
> 
> Tiếp theo, Storyblocks sẽ tìm kiếm các ảnh tương tự bằng cách gửi một request tới một full-text search service sử dụng tiêu đề của ảnh hiện tại làm đầu vào và hiển thị chúng như một gợi ý cho người dùng. Cuối cùng, là việc lưu trữ các sự kiện trên trang hiển thị vào data firehose, sau đó là cloud storage system và cuối cùng tới data warehouse, để có thể sử dụng cho việc phân tích từ đó tìm ra câu trả lời cho các câu hỏi về nghiệp vụ
> 
> Server bây giờ sẽ trả về giao diện (HTML) cho trình duyệt người dùng. Trang hiển thị gồm các tài nguyên Javascript và CSS mà đã tải lên cloud storage system có kết nối tới CDN, nên trình duyệt sẽ liên lạc với CDN để lấy nội dung. Cuối cùng trình duyệt sẽ hiển thị trang web một cách hoàn chình cho người dùng. 
> 
> Bây giờ, chúng ta sẽ đi qua từng thành phần, giới thiệu sơ lược và cung cấp cho bạn một cái nhìn tổng quan về kiến trúc của một ứng dụng web



### 1. DNS
DNS là viết tắt của "Domain Name Server" và công nghệ xương sống giúp cho world wide web trở nên khả dụng, phổ biến như bây giờ. Về cơ bản, DNS cung cấp một bảng tìm kiếm dạng key/value từ một tên miền (vd: google.com) tới địa chỉ IP (vd: 85.129.83.120), từ đó giúp máy tính của bạn định tuyến được tới server phù hợp.

So sánh với danh bạ, sự khác biệt giữa tên miền và địa chỉ IP tương đương với sự khác biệt giữa "John Doe" và "201-867-5309". Vì thế, cũng giống như bạn cần một quyển danh bạ để tìm kiếm số điện thoại của John (thời xa xưa :) ), bạn cần DNS để tìm kiếm địa chỉ IP từ tên miền.   
### 2. Load Balancer
Hay còn gọi là cân bằng tải và trước khi nói tới nó, chúng ta cần nhắc lại về việc mở rộng hệ thống bao gồm theo chiều ngang hoặc chiều dọc. Hiểu đơn giản mở rộng theo chiều ngang nghĩa là bạn thêm tài nguyên (máy tính) vào hệ thống còn mở rộng theo chiều ngang là bạn thêm sức mạnh cho các tài nguyên có sẵn (vd: CPU, RAM, ...).

Trong phát triển web, bạn hầu như luôn muốn mở rộng theo chiều ngang, bởi vì server có thể gặp sự cố một cách ngẫu nhiên, network không ổn định. Khi đó toàn bộ trung tâm dữ liệu sẽ trở nên không sẵn sàng với người dùng. Có nhiều hơn một server cho phép bạn dự trù được cho sự cố nên hệ thống sẽ vẫn tiếp tục hoạt động. Nói cách khác, hệ thống của bạn trở nên "kháng lỗi", Thứ hai, mở rộng theo chiều ngang cho phép bạn lới lỏng việc kết nối các phần khác nhau của backend hệ thống (web server, database, service X, ...) bằng cách chạy chúng trên các server riêng biệt. Cuối cùng, bạn có thể gặp phải tình huống không thể mở rộng hệ thống theo chiều dọc được nữa. Không có máy tính nào trên thế giới đủ lớn để làm mọi công việc tính toán cho hệ thống của bạn.

Bây giờ, quay trả lại với cân bằng tải. Chúng định tuyến các request tới một trong các server của hệ thống, chính là các clone / mirror images của nhau và trả response từ server hệ thống laị cho client. Bất cứ server nào cũng nên xử lý request theo cùng một cách nên vấn đề chỉ nằm ở việc phân tán các yêu cầu cho các server để không cái nào bị quá tải.

### 3. Web Application Servers
Đây là thành phần không thể thiếu của ứng dụng web. Nó thực thi các logic nghiệp vụ chính, xử lý request của người dùng và trả về HTML cho trình duyệt người dùng. Để làm việc đó, chúng thức hiện giao tiếp với nhiều loại hạ tầng phía backend như cơ sở dữ liệu, lớp bộ nhớ đệm, job queues, search services, other microservices, data/logging queues, ...

Bạn nên biết rằng việc xây dựng web server yêu cầu lựa chọn một ngôn ngữ cụ thể  (Node.js, Ruby, PHP, Scala, Java, C# .NET, etc.) và một MVC framework cho ngôn ngữ đó (Express cho Node.js, Ruby on Rails, Laravel,...). 
### 4. Database Servers
Mọi ứng dụng web đều có trung bình một hoặc nhiều cơ sở dữ liệu để lưu trữ thông tin. Cơ sở dữ liệu cung cấp các phương thức định nghĩa cấu trúc dữ liệu, thêm mới, tìm kiếm, cập nhật hoặc xóa dữ liệu, thực hiện tính toán các dữ liệu đó, và hơn thế nữa. Trong đa số trường hợp, web server giao tiếp trực tiếp với một cơ sở dữ liệu. Hoặc có thể, mỗi backend service sẽ có cơ sở dữ liệu riêng tách biệt với phần còn lại của ứng dụng.

Hiện nay có hai dạng cơ sở dữ liệu chính là SQL và NoSQL.

SQL (Structured Query Language) cung cấp phương thức cho việc truy vấn các tập dữ liệu quan hệ. SQL lưu trữ dữ liệu dưới dạng bảng kết nối với nhau thông qua ID chung. NoSQL (Non-SQL) thì là một công nghệ mới trỗi dậy để thay thế SQL xử lý lượng lớn dữ liệu sinh ra bởi các ứng dụng web quy mô lớn hiện nay

### 5. Caching Service
Một dịch vụ caching cung cấp một phương thức lưu trữ dữ liệu dưới dạng key/value, giúp cho việc lưu trữ và tìm kiếm thông tin gần như O(1). Hệ thống thường tận dụng caching để lưu trữ kết quả của các phép tính tốn kém để có thể tái sử dụng kết quả mà không cần phải thực hiện tính toán lại. Một ứng dụng có thể cache kết quả từ truy vấn cơ sở dữ liệu, hay gọi từ service bên ngoài, và hơn thế nữa. Đây là một số ví dụ thực tế
* Google cache kết quả tìm kiếm cho các câu truy vấn phổ biến như "dog" hay "Taylor Swift" hơn là thực hiện tìm kiếm lại mỗi lần
* Facebook cache hầu hết dữ liệu bạn thấy khi bạn đăng nhập, như bài đăng, bạn bè,...

Hai dịch vụ caching server phổ biến nhất Redis và Memcache.

-----



Ngoài ra còn có cách thành phần khác như Job server, Services, Cloud storage, CDN, mình sẽ đề cập đến trong bài viết sau. Cảm ơn các bạn đã quan tâm tới bài viết của mình!