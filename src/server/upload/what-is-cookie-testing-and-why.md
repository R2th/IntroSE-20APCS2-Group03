*Khi chúng tôi truy cập một trang web lần đầu tiên, một số trang web sẽ chặn một phần chế độ xem của chúng tôi với một cửa sổ bật lên nói rằng cookie sẽ được thu thập trong phiên đó. Chúng tôi có nghĩa vụ đánh dấu vào một ô hoặc nhấn đóng, điều này sẽ thông báo cho hệ thống rằng chúng tôi đã đưa thông tin này lên server. Nhưng chính xác thì cookie là gì và mục đích của chúng là gì?*

### 1. Cookie Testing là gì?
Cookie testing là một loại Kiểm tra phần mềm kiểm tra Cookie được tạo trong trình duyệt web của bạn. Cookie là một phần thông tin nhỏ được máy chủ web lưu trữ trong tệp văn bản trên ổ cứng (máy khách) của người dùng. Phần thông tin này sau đó sẽ được gửi trở lại máy chủ mỗi khi trình duyệt yêu cầu một trang từ máy chủ. Thông thường, cookie chứa dữ liệu người dùng được cá nhân hóa hoặc thông tin được sử dụng để giao tiếp giữa các trang web khác nhau. Ảnh chụp màn hình bên dưới hiển thị các cookie cho các trang web khác nhau.
![](https://images.viblo.asia/be5cbff9-4d3e-4890-9410-ad1e83c879f7.png)
Nói cách khác, cookie không là gì ngoài danh tính của người dùng và được sử dụng để theo dõi nơi người dùng đã điều hướng trên khắp các trang của trang web. Mục đích của cookie là tạo sự tương tác nhanh chóng giữa người dùng và trang web. Các ứng dụng, nơi cookie có thể được sử dụng, là triển khai giỏ hàng, trải nghiệm web được cá nhân hóa, theo dõi người dùng, tiếp thị, phiên người dùng, v.v.
### 2. Nội dung của Cookie là gì?
**Cookie chủ yếu bao gồm ba thứ**

1. Tên của máy chủ mà cookie được gửi từ
1. Thời gian tồn tại của cookie
1. Một giá trị. Đây thường là một số duy nhất được tạo ngẫu nhiên

### 3. Các loại Cookie?
![](https://images.viblo.asia/d321ab6c-8739-41a8-9916-da07212ebcf9.png)
Thông thường, có hai loại cookie được viết trên máy người dùng:

* **Session Cookies**: Các cookie này hoạt động cho đến khi trình duyệt kích hoạt cookie được mở. Khi chúng tôi đóng trình duyệt, cookie phiên này sẽ bị xóa
* **Persistent Cookies:** Những cookie này được viết vĩnh viễn trên máy người dùng và nó tồn tại trong nhiều tháng hoặc nhiều năm

### 4. Cookie được lưu trữ ở đâu?
Khi bất kỳ ứng dụng trang web nào ghi một cookie, nó sẽ được lưu trữ trong một tệp văn bản trên ổ đĩa cứng của người dùng. Đường dẫn nơi cookie được lưu phụ thuộc vào trình duyệt. Các trình duyệt khác nhau lưu trữ cookie trong các đường dẫn khác nhau.

Ví dụ, trong trình duyệt Mozilla Firefox, bạn có thể thấy các cookie trong các tùy chọn trình duyệt. Để xem điều này, hãy nhấp vào Công cụ -> Tùy chọn -> Quyền riêng tư và sau đó nhấp vào "Xóa Cookie Cá nhân".
![](https://images.viblo.asia/b0474593-9529-4cd4-8243-3d61f2315dea.png)
Trong khi ở trong trình duyệt Internet Explorer, nó lưu trữ cookie trên đường dẫn " C: \ Documents and Settings \ Default User \ Cookies"

### 5. Cách kiểm tra Cookie
Dưới đây là một loạt các đề xuất trường hợp thử nghiệm có thể được xem xét khi thử nghiệm cookie.

**Tắt Cookie của bạn**
Cookie có thể bị tắt từ cài đặt trình duyệt. Sau khi vô hiệu hóa cookie, bạn sẽ cần phải kiểm tra các chức năng và trang khác nhau trong trang web và theo dõi hoạt động chung vì nó có thể hoạt động không mong muốn trong khi cookie bị vô hiệu hóa, mặc dù các trang web có thể chủ động khôi phục từ bất kỳ lỗi tiềm ẩn nào và hoạt động bình thường. Một số trang web cung cấp thông tin cho người dùng qua thông báo trợ giúp bất cứ khi nào cookie bị tắt, do đó, việc kiểm tra hiệu quả sẽ đảm bảo rằng các tình huống này có thể được xử lý trước.

**Kiểm tra bằng Cookie bằng cách chỉnh sửa chúng**
Một tình huống khác để kiểm tra ứng dụng sau khi chỉnh sửa thông tin cookie. Điều này có liên quan khi cookie được sử dụng để lưu trữ thông tin người dùng, chẳng hạn như id người dùng. Bạn có thể vào tệp cookie và chỉnh sửa id hiện tại bằng một số hợp lệ / không hợp lệ khác. Sau chỉnh sửa đó, trang web sẽ không đăng nhập cho bạn và sẽ hiển thị thông báo “quyền truy cập bị từ chối” thích hợp.

**Kiểm tra Cookie bằng cách xóa chúng**
Tại đây, bạn cần xóa cookie và kiểm tra lại cách trang web hoạt động trong trường hợp này. Khi chúng đã được xóa khỏi máy tính, trang web sẽ vẫn hoạt động bình thường và cung cấp đầy đủ thông tin cho người dùng, thay vì bị lỗi đột ngột.

**Làm hỏng cookie của bạn**
Đây là một trường hợp thử nghiệm quan trọng trong thử nghiệm cookie. Tin tặc sẽ sử dụng cookie để lấy thông tin trái phép về bạn và ứng dụng web của bạn. Họ chủ yếu làm điều đó bằng cách làm hỏng và ghi đè thông tin cookie với mục đích cung cấp cho hacker quyền truy cập trái phép vào trang web của bạn. Bài kiểm tra này rất cần thiết cho các trang web ngân hàng và tài chính, nơi bảo mật là quan trọng hàng đầu. Bạn cần làm hỏng cookie của mình, sau đó theo dõi hoạt động của ứng dụng web.

**Kiểm tra Cookie về Khả năng Tương thích Nhiều Trình duyệt**
Các trang web phải có thể ghi cookie đúng cách trên tất cả các trình duyệt được hỗ trợ. Thông tin cookie có thể không được lưu trữ đúng cách khi sử dụng một số trang web trên một số trình duyệt. Vì vậy, khả năng tương thích trên nhiều trình duyệt của cookie cũng cần được kiểm tra và xác minh.

**Kiểm tra mã hóa cookie**
Chúng tôi đã nói rằng tên người dùng, ID người dùng và thông tin nhạy cảm khác có thể được lưu trữ trong tệp cookie cho một số trang web. Để đảm bảo an ninh, thông tin này cần được mã hóa trước khi gửi đến máy tính cục bộ.

**Kiểm tra hoạt động của Cookie trên các trang web và Trình duyệt khác nhau**
Cookie được viết bởi một trang web trên một trình duyệt cụ thể sẽ không thể được sử dụng bởi một trình duyệt khác hoặc một trang web khác. Kịch bản này cần được kiểm tra một cách thích hợp.

**Kiểm tra hành vi của Cookie khi chấp nhận và từ chối chúng**
Bằng cách đặt các tùy chọn cookie trên trình duyệt để nhanh chóng chấp nhận / từ chối cookie, bạn có thể kiểm tra từng tình huống khi đang di chuyển trong khi cookie được tạo và theo dõi hành vi của ứng dụng.

### 6. Tôi có thể tìm thấy những Cookie này ở đâu?
Không có vị trí cố định nào để lưu các tệp văn bản cookie, vì các đường dẫn khác nhau tùy theo trình duyệt bạn sử dụng. Để khám phá vị trí của họ, hãy xem cài đặt cookie của trình duyệt trên máy của bạn

### 7. Sự khác nhau giữa Cookie và Session


| Cookie | Session |
| -------- | -------- |
| Cookie là các tệp phía máy khách chứa thông tin người dùng     | Phiên là các tệp phía máy chủ chứa thông tin người dùng     |
|Cookie kết thúc tùy thuộc vào thời gian tồn tại mà bạn đặt cho nó|Phiên kết thúc khi người dùng đóng trình duyệt của mình|
|Bạn không cần khởi động cookie vì nó được lưu trữ trong máy cục bộ của bạn|Trong PHP, trước khi sử dụng $ _SESSION, bạn phải viết session_start (); Tương tự như vậy đối với các ngôn ngữ khác|
|Kích thước cookie tối đa chính thức là 4KB|Trong phiên, bạn có thể lưu trữ bao nhiêu dữ liệu tùy thích. Giới hạn duy nhất bạn có thể đạt được là bộ nhớ tối đa mà một tập lệnh có thể sử dụng tại một thời điểm, theo mặc định là 128MB|
|Cookie không phụ thuộc vào Phiên|Một phiên phụ thuộc vào Cookie|
|Không có hàm nào có tên là unsetcookie ()|Session_destroy (); được sử dụng để phá hủy tất cả dữ liệu đã đăng ký hoặc hủy bỏ một số|

***Reference:***
https://blog.testlodge.com/cookie-testing/
https://www.softwaretestingclass.com/what-is-cookie-testing-and-test-cases-for-website-cookie-testing/