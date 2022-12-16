***Hôm nay, chúng ta sẽ cùng tìm hiểu về Session, Cache, Cookie. Nhưng chúng ta sẽ không đi sâu vào Session, mà chúng ta sẽ tập trung vào việc phân biệt sự khác nhau giữa Cookie và Cache.*** 
## 1. Định nghĩa về Session, Cache, Cookie
###  **Session** 
* Session được hiểu đơn giản là một phiên làm việc. Nó chính là một biến toàn cục được lưu trữ trên máy chủ. Mỗi session được gán một id duy nhất được sử dụng để truy suất các giá trị được lưu trữ. Bất cứ khi nào một session được tạo, một cookie có chứa session id duy nhất được lưu trên máy tính người dùng và được trả về với mọi yêu cầu tới máy chủ. Nếu trình duyệt khác hàng không hỗ trợ cookie, session id này sẽ được hiển thị trong URL. Session có khả năng lưu trữ dữ liệu tương đối lơn so với cookie.
* Giá trị session sẽ tự động bị xóa khi đóng trình duyệt. Nếu bạn muốn lưu trữ các giá trị vĩnh viễn, thì bạn nên lưu trữ chúng trong database.
* **Why**
Để lưu trữ thông tin quan trọng như id người dùng một các an toàn hơn trên máy chủ nơi người dùng độc hại không thể truy cập vào nó được. Session được sử dụng để chuyển các giá trị từ trang này sang trang khác.
* **When**
Nó cũng được sử dụng khi bạn muốn thay thể cho cookie trên các trình duyệt không hỗ trợ cookie, để lưu trữ các biến toàn cục một cách hiệu quả và an toàn hơn so với việc chuyển chúng vào URL.
### Cookie 
* Cookie HTTP còn được gọi là cookie internet, cookie trình duyêt, cookie web hoặc đơn giản là cookie, là một phần dữ liệu nhỏ được gửi từ một trang web được browser của người dùng lưu trữ trên máy tính người dùng trong khi người dùng đang sử dụng browser.
* Mặc dù cookie phục vụ nhiều chức năng như lưu trữ mật khẩu, tùy chọn, trình duyệt, dữ liệu địa chỉ IP và thời gian truy cập... nhưng mục đích chính của chúng là lưu trữ thông tin đăng nhập cho một trang web cụ thể. 
* Một số trang web sẽ lưu cả trên người dùng và mật khẩu của bạn trong một cookie, trong khi những trang khác sẽ chỉ lưu tên người dùng của bạn. Bất cứ khi nào bạn đánh dấu vào "Remeber me", trang web sẽ tạo cookie đăng nhập khi bạn đăng nhập thành công. Bây giờ, mỗi khi bạn truy cập lại trang web, bạn có thể chỉ được yêu cầu nhập mật khẩu của mình hoặc bạn có thể không cấn nhập mật khẩu.
### Cache
* Bộ nhớ cache web còn được gọi là bộ nhớ đệm HTTP hoặc đơn giản bộ nhớ cache là một thành phần phần mềm lưu trữ dữ liệu để các yêu cầu trong trương lại cho dữ liệu cho dữ liệu đó có thể được phục vụ nhanh hơn.
* Dữ liệu được lưu trữ trong bộ nhớ cache có thể là kết quả của quá trình tính toán trước đó hoặc là bản sao dữ liệu được lưu trữ ở nơi khác. Bất cứ khi nào bạn truy cập vào trang web nào lần đầu tiên, các phần tử của trang đó sẽ được tải xuống và lưu trữ trong thư mục bộ nhớ cache và nếu bạn đã truy cập trang web đó, các phần tử của trang web đó có thể đã tồn tại trong thư mục bộ nhớ cache.
* Do đó, điều này giúp các trang tải nhanh hơn và cải thiện tốc độ duyệt web của bạn.
* Khi bạn truy cập một trang web, các tệp được yêu cầu sẽ được lưu trữ trong bộ nhớ máy tính của bạn trong bộ nhớ cache của trình duyệt.
* Các loại cache phổ biến bao gồm: Browser cache, memory cache, processor cache and disk cache.
## 2. Cách phân biệt giữa Cookie và Cache
|  | Cookie | Cache |
| -------- | -------- | -------- |
| **Mô tả**| Là một phần dữ liệu nhỏ được gửi từ một trang web và được trình duyệt web lưu trữ trên máy tính người dùng     | Bộ nhớ đệm hay còn gọi là bộ nhớ đệm web là nơi lưu trữ tạm thời các loại dữ liệu web như trang HTML và hình ảnh để giảm độ trễ của máy chủ     |
| **Thông tin lưu trữ** | Cookie lưu trữ thông tin như tùy chọn người dùng, số phiên, mật khẩu, lịch sử người dùng, số trang đã truy cập, địa chỉ IP... | Bộ nhớ cache web lưu trữ các tệp tài nguyên như tệp kịch bản, hình ảnh, biểu ngữ, âm thanh, video, tệp flash... |
| **Hết hạn** | Cookie tự động hết hạn sau một khoảng thời gian nhất định. | Bộ nhớ cache được lưu trong máy của khác hàng cho đến khi người dùng xóa nó theo cách thủ công. |
| **Mục đích chính** |Mục đích chính của cookie là lưu trữ các lựa chọn của người dùng | Mục đích chính của cache là lưu trữ nội dung trang web cho các mục đích lâu dài |
| **Sử dụng** | Cookie được sử dụng để lưu trữ thông tin để theo dõi các hoạt động khác nhau liên quan đến người dùng.| Bộ nhớ đệm được sử dụng để làm cho việc tải trang web nhanh hơn. |
| **Không gian** |Cookie là một tệp văn bản do đó nó không tiêu tốn nhiều dung lượng trên máy khách | Bộ nhớ đệm có thể lưu trữ các loại dữ liệu khác nhau, do đó nó tiêu tốn một lượng lớn dung lượng trên máy khách.|
| **Kích thước**| Cookie có thể có kích thước lên đến 4KB (4096 byte) và một trang web có thể gửi 50 cookie trên máy tính và tổng số cookie có thể ít nhất là 3000. | Kích thước của bộ nhớ cache phụ thuộc vào giới hạn của trình duyệt. Bạn cáo thể tăng kích thước để lưu trữ nhiều tệp tạm thời hơn bằng cách sử dụng cài đặt của trình duyệt. |
| **Dữ liệu độc hại** | Cookie là một tệp văn bản đơn giản vào do đó nó không thể chứa bất kỳ vi rút hoặc dữ liệu độc hại nào. | Bộ nhớ lưu trữ các loại dữ liệu khác nhau và do đó khả năng cao là nó có thể có vi rút hoặc dữ  liệu độc hại. |
| **Loại**| Các loại cookie bao gồm: Cookie liên tục, Cookie theo session |Các loại bộ nhớ cache bao gồm: Browser cache, memory cache, processor cache và dish cache. |
| **Phản ứng** | Cookie gửi phản hồi với các yêu cầu. | Bộ nhớ cache không gửi phản hồi với các yêu cầu. |