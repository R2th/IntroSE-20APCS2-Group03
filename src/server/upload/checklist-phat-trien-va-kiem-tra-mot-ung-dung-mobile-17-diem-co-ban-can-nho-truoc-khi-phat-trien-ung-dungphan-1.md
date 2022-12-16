Gần đây, một nhóm tham gia thử nghiệm và phát triển ứng dụng di động đã đưa ra một checklist đề cập đến đến các kịch bản trong các hoạt động thảo luận, tìm hiểu yêu cầu của dự án mình đang phát triển đảm bảo rằng phạm vi công việc của bạn được xác định rõ ràng. Đây là những câu hỏi phổ biến và không cụ thể cho chức năng của ứng dụng  
# 1. Phát triển nền tảng di động nào? iOS hay Android?
iOS và Android là nền tảng ưa thích để phát triển ứng dụng di động. Tuy nhiên, Blackberry vẫn được sử dụng bởi một số người dùng doanh nghiệp và một dân số đáng kể của thế giới đang phát triển vẫn sử dụng điện thoại Symbian. Thật tốt khi biết  trước những nền tảng nào sẽ được hỗ trợ. Điều này sẽ giúp bạn đưa ra các quyết định quan trọng liên quan đến kiến trúc / thiết kế hạ tầng  của bạn và cũng cung cấp đầu vào về việc bạn muốn phát triển một ứng dụng hoàn toàn tự nhiên hay sử dụng một khung như PhoneGap. Các nền tảng phổ biến được liệt kê dưới đây:

* Android
* iOS
* Windows
* Blackberry
* Symbian

![](https://images.viblo.asia/f355c7bc-c52d-4e80-8dd8-93fd2672c9be.jpg)
 
# 2. Tôi nên nhắm mục tiêu phiên bản iOS nào? Tôi nên phát triển phiên bản Android nào?
Ứng dụng của bạn có sử dụng bất kỳ tính năng nào được giới thiệu trong một phiên bản cụ thể của HĐH không? Nếu vậy, bạn sẽ muốn đề cập đến điều này trong tài liệu yêu cầu của bạn và cũng thử nghiệm nó trên hệ điều hành mục tiêu. Nó cũng là một mind-set tốt để ngăn chặn ứng dụng được cài đặt trên các phiên bản hệ điều hành không được hỗ trợ. Điều này sẽ tránh người dùng để lại xếp hạng thấp và phản hồi tiêu cực sau khi cài đặt ứng dụng trên hệ điều hành không được hỗ trợ. Tất nhiên, bạn sẽ phải kiểm tra và đảm bảo rằng ứng dụng của bạn hoạt động trên phiên bản HĐH được nhắm đến.

![](https://images.viblo.asia/2cdf6f07-160b-41a5-9cc5-a0362e7bdf8a.png)

Hình ảnh trên cho thấy số liệu thống kê sử dụng cho các phiên bản khác nhau của Android và iOS. Google cung cấp các số liệu cập nhật cho phiên bản Android đang được sử dụng trên tất cả các thiết bị Android và thông tin về cách bạn có thể hỗ trợ nhiều phiên bản. Apple cũng cung cấp số liệu thống kê cho việc sử dụng phiên bản iOS cùng với danh sách kiểm tra của riêng họ (Những thống kê này có từ tháng 9 năm 2013 trước khi iOS7 ra mắt).

# 3. Yêu cầu phần cứng thiết bị
Ứng dụng của bạn có bất kỳ yêu cầu phần cứng cụ thể nào như bộ nhớ, máy ảnh, CPU, v.v. không? Như đã đề cập ở trên,  mình xác định trước các yếu tố tốt nhất để ngăn chặn cài đặt trên các thiết bị không được hỗ trợ  .  

# 4. Tôi nên nhắm mục tiêu độ phân giải màn hình nào?
Đảm bảo rằng ứng dụng của bạn tương thích tốt trên từng độ phân giải màn hình mà bạn có thể hỗ trợ được. Điện thoại thông minh và máy tính bảng có đủ hình dạng và kích cỡ. Một danh sách các thiết bị có độ phân giải màn hình và mật độ hiển thị có sẵn trên Wikipedia. Một số độ phân giải màn hình phổ biến dưới đây:

* 320 x 480px
* 640 x 960px
* 480 x 800px
* 720 x 1280px
* 768 x 1280px
* 800 x 1280px
* 1200 x 1920px
* 2048 × 1536px


# 5. Tôi có nên phát triển một ứng dụng khác cho máy tính bảng?
Ứng dụng mà bạn phát triển có thể vận hành tốt để sử dụng đồ họa chất lượng cao cho các thiết bị lớn như máy tính bảng, đặc biệt nếu ứng dụng hoặc trò chơi của bạn  sẽ được sử dụng trên các thiết bị này. Một số nhà phát triển phát hành phiên bản HD riêng của ứng dụng / trò chơi thay vì sử dụng một gói duy nhất. Bất kể quá trình triển khai của bạn là gì, bạn cũng nên thử nghiệm trên cả hai thiết bị nếu bạn mong đợi người dùng quan trọng trên cả hai thiết bị. Google cũng đã phát hành một danh sách kiểm tra chất lượng ứng dụng để giúp các nhà phát triển cung cấp các ứng dụng chất lượng cho các thiết bị máy tính bảng.

# 6. Định hướng xoay dọc hay xoay ngang màn hình hiển thị?
Một số trò chơi chỉ hoạt động ở chế độ ngang trong khi một số ứng dụng được thiết kế để chỉ hoạt động ở chế độ dọc và các ứng dụng khác ở cả hai chế độ. Hãy chắc chắn rằng bạn đã kiểm tra các ứng dụng của mình để xem liệu có bất kỳ vấn đề nào khi thay đổi hướng màn hình như lỗi ứng dụng hoặc lỗi UI không.

# 7. Kiểm tra chức năng định vị GPS , phím phần cứng
Nếu ứng dụng của bạn yêu cầu sử dụng các tính năng phần cứng sau, các trường hợp thử nghiệm của bạn cũng cần kiểm tra các kịch bản khi chúng không khả dụng 

### Phím phần cứng
- Ví dụ: Ứng dụng máy ảnh sử dụng nút camera chuyên dụng, 
- ứng dụng Trình quản lý sự kiện / sử dụng nút phần cứng để báo lại lời nhắc, trình phát phương tiện sử dụng âm lượng và các phím khác, v.v. 
- Một số ứng dụng cũng sử dụng nút nguồn để cung cấp thêm chức năng / phím tắt cho hành vi của ứng dụng.
### GPS
Các ứng dụng điều hướng của bạn sẽ phản hồi như thế nào nếu GPS bị tắt hoặc tắt đột ngột trong khi hoạt động?
## Kết luận
Nội dung bài viết trên mới chỉ là 7  trong 17 yếu tố chúng ta cần xác định quan điểm trước khi thực thi phát triển một ứng dụng mobile nhưng cũng sẽ là tiền đề giúp cho những bạn mới làm quen dần về cách khai thác các thông tin trước khi thực thi xuất bản một ứng dụng . Những quan điểm còn lại mình sẽ đề cập ở phần 2 sau .

Link tài liệu tham khảo tại: http://tryqa.com/mobile-application-development-and-testing-checklist/