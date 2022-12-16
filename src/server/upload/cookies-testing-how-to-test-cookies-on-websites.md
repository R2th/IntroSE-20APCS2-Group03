### Cookies Testing - How to Test Cookies on Websites

**What are Cookies?**
![](https://images.viblo.asia/11093959-78e9-477a-94e7-dfd8ee12692f.png)

Cookies nắm giữ một lượng dữ liệu giới hạn thu thập được dựa trên mỗi trang web mà người dùng truy cập. Thông tin sau đó được lưu trữ trong một tập tin văn bản trong ổ cứng của thiết bị mà người dùng sử dụng tại mỗi phiên làm việc. Dữ liệu này sau đó được trình duyệt truy cập khi nó yêu cầu thông tin từ máy chủ, chẳng hạn như id người dùng hoặc tùy chọn mà chúng tôi đã thiết lập trước đó.

Cookies thường được sử dụng nhiều nhất trong việc lưu trữ id người dùng truy cập hoặc save password của người dùng cho một số trang web, giúp người dùng truy cập nhanh hơn và thuận tiện hơn trong lần truy cập tiếp theo. Chúng thường được sử dụng bởi các trang web mua sắm, đặc biệt là những trang web sử dụng giỏ hàng. Các trang web tiếp thị sử dụng cookie để cá nhân hóa quảng cáo theo sở thích của người dùng đã được theo dõi và ghi lại trước đó trong cookie. Chúng cũng được sử dụng bởi các trang web khác có mối quan tâm trong việc theo dõi lượt truy cập của người dùng.

**Thông tin nào được lưu trữ trong Cookies?**

*Cookies chủ yếu chứa* :

-Tên của máy chủ nơi gửi thông tin cookie

-Ngày hết hạn của cookie

-Định danh duy nhất của Cookie , gọi là ID cookie.

*Có phải tất cả các Cookies đều giống nhau?*

Tất cả các cookie đều lưu trữ các mẩu dữ liệu nhỏ nhưng mục đích sử dụng của chúng không giống nhau. Có ba loại cookie : session cookies, persistent cookies and third-party cookies.

Session cookies được tự động xóa khỏi máy tính người dùng ngay sau khi đóng trình duyệt, trong khi persistent cookies sẽ có ngày hết hạn được đính kèm, do đó sẽ vẫn còn trong máy tính của người dùng cho đến khi hết hạn hoặc cho đến khi người dùng chủ động xóa bộ nhớ cache cookie. Lớp cookie cuối cùng được cài đặt bởi bên thứ ba vì lý do nghiên cứu, không được triển khai thông qua hoạt động trực tiếp của người dùng.

**Test Cookies có quan trọng?**

Vì cookie đóng vai trò quan trọng trong việc khiến các chức năng của trang web hoạt động trơn tru, điều này khá quan trọng khi bạn kiểm tra cách chúng được viết và lưu trữ trong ổ cứng của bạn bằng các trang web bạn truy cập. Vấn đề bảo mật cũng quan trọng vì thông tin quan trọng được lưu trữ cục bộ trong mỗi cookie.

**Làm thế nào để test Cookies**

Dưới đây là một loạt các đề xuất trường hợp kiểm thử có thể được xem xét khi kiểm tra cookie.

**Disable your Cookies**

Cookie có thể bị vô hiệu hóa từ các cài đặt trình duyệt. Sau khi tắt cookie, bạn sẽ cần kiểm tra các chức năng và trang khác nhau trong trang web và theo dõi chức năng chung vì nó có thể hoạt động bất ngờ trong khi cookie bị vô hiệu hóa, mặc dù các trang web có thể chủ động phục hồi sau mọi sự cố tiềm ẩn và hoạt động bình thường. Một số trang web cung cấp thông tin cho người dùng thông qua thông báo trợ giúp mỗi khi cookie bị vô hiệu hóa, do đó thử nghiệm hiệu quả sẽ đảm bảo rằng các kịch bản này có thể được xử lý trước.

***Test by Cookies by editing them***

Đây là một kịch bản khác để kiểm tra ứng dụng sau khi chỉnh sửa thông tin cookie. Điều này có liên quan khi cookie được sử dụng để lưu trữ thông tin người dùng như id người dùng. Bạn có thể truy cập tệp cookie và chỉnh sửa id hiện tại với một số thông tin hợp lệ / không hợp lệ khác. Sau lần chỉnh sửa đó, trang web sẽ không đăng nhập vào bạn và sẽ hiển thị các thông báo truy cập bị từ chối đúng cách.

***Test Cookies by removing them***

Ở đây, bạn cần xóa vật lý cookie và kiểm tra lại cách trang web hoạt động trong trường hợp này. Khi chúng đã bị xóa khỏi máy tính, trang web vẫn hoạt động bình thường và cung cấp đủ thông tin cho người dùng, thay vì không truy cập được.

***Corrupt your Cookies***

Đây là một trường hợp thử nghiệm quan trọng trong thử nghiệm cookie. Tin tặc sẽ sử dụng cookie để lấy thông tin trái phép về bạn và ứng dụng web của bạn. Họ chủ yếu làm điều đó bằng cách làm hỏng và ghi đè thông tin cookie với mục đích cho phép hacker truy cập trái phép vào trang web của bạn. Bài kiểm tra này rất cần thiết cho các trang web tài chính ngân hàng, trong đó bảo mật là vô cùng quan trọng. Bạn cần làm hỏng cookie của mình, sau đó theo dõi hoạt động của ứng dụng web.

***Test Cookies for Cross-Browser Compatibility***

Các trang web có thể viết cookie đúng trên tất cả các trình duyệt được hỗ trợ. Thông tin cookie có thể không được lưu trữ đúng cách trong khi sử dụng một số trang web trên một số trình duyệt. Vì vậy, khả năng tương thích giữa các trình duyệt của cookie cũng cần được kiểm tra và xác minh.

***Test for Cookie Encryption***

Chúng tôi đã nói rằng tên người dùng, ID người dùng và thông tin nhạy cảm khác có thể được lưu trữ trong các tệp cookie cho một số trang web. Để đảm bảo an ninh, thông tin này cần được mã hóa trước khi gửi đến máy tính cục bộ.

***Test the behavior of Cookies across different websites and Browsers***

Một cookie được viết bởi một trang web trên một trình duyệt cụ thể sẽ không thể được sử dụng bởi một trình duyệt khác hoặc một trang web khác. Kịch bản này cần phải được kiểm tra thích hợp.

***Test the behavior of Cookies when accepting and rejecting them***

Bằng cách đặt tùy chọn cookie trên trình duyệt để nhanh chóng chấp nhận / từ chối cookie, bạn có thể kiểm tra từng kịch bản khi đang di chuyển trong khi cookie được tạo và theo dõi hành vi của ứng dụng.

***Một số vấn đề cần lưu ý khi sử dụng Cookies***

Từ những gì chúng ta đã thảo luận cho đến nay, chúng ta có thể thấy rằng các vấn đề sau có thể xảy ra nếu bạn sử dụng cookie trên trang web của mình :

Usability ( Tính khả dụng ) : Nếu người dùng có một số thiết lập chống lại cookie hoặc là không chắc chắn về chính sách cookie trên trình duyệt, sử dụng quá nhiều, cookie có thể ngăn cản họ truy cập vào trang web của bạn.
Security (Bảo mật) : Lưu trữ thông tin nhạy cảm trong cookie có thể gây nguy hiểm hoặc ảnh hưởng đến bảo mật.
Functionality (Chức năng) : Trục trặc có thể xảy ra trong một trang web lạm dụng cookie, nếu người dùng đã chọn chính sách cookie nghiêm ngặt hoặc không chắc chắn về chính sách cookie trên trình duyệt.
Nguồn tham khảo : https://blog.testlodge.com/cookie-testing