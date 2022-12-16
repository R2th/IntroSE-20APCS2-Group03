**General Notes**

Thời gian subscription đã được rút ngắn đáng kể cho mục đích kiểm thử . Điều này cho phép người dùng nhanh chóng kiểm thử gia hạn nhiều lần và hết hạn thông qua TestFlight hoặc môi trường sandbox

Thời gian subscription thực tế -> Thời gian kiểm thử thử nghiệm

1 tuần -> 3 phút

1 tháng -> 5 phút

2 tháng -> 10 phút

3 tháng -> 15 phút

6 tháng -> 30 phút

1 năm -> 1 giờ

Subscription sẽ tự động gia hạn 6 lần cho mỗi account, sau đó đăng kí sẽ tự động hết hạn vào cuối mỗi giai đoạn subscription. Sự gia hạn  này sẽ tự động được thực hiện cho dù chúng ta có đang mở ứng dụng hay không, nó giống như gia hạn trên App store. Nhưng không giống như trên App store, không có cách nào để hủy subscription do đó không có cách nào để kiểm thử trực tiếp việc hủy subscription. Cũng không có cách nào để kiểm thử quản lí subscription trong khi sử dụng TestFlight hoặc môi trường sandbox.

Mỗi lần gia hạn tự động sẽ gửi mội transaction đến ứng dụng. Tùy thuộc vào cần bao nhiêu thời gian mà các giao dịch này được xử lí vào lần tiếp theo khi ứng dụng được mở lại. Để xác thực các giao dịch này, thì yêu cầu nhập mật khẩu mỗi lần sử dụng. Khi ứng dụng chạy trên môi trường thật (App store) thì không nên kích hoạt lời nhắc mật khẩu này.

**TestFlight Testing**

Trước hết, subscribe trên TestFlight nhắc người dùng 3 lần nhập mật khẩu Apple ID của họ và không cho phep sử dụng Touch ID để hoàn tất giao dịch.  Nhưng đôi khi, sau khi bắt đầu subscribe mới nhiều lần trên cùng một thiết bị (sau 6 lần tự động gia hạn đầu tiên), chỉ có 2 lời nhắc mật khẩu được hiển thị. Có thể bạn sẽ cảm thấy khó chịu khi thấy nhiều yêu cầu mật khẩu trong khi kiểm thử, nhưng hãy yên tâm, một khi ứng dụng đã được phát hành lên App store, luồng mua hàng sẽ hoạt động như mong đợi (có thể sử dụng Touch ID trên iOS 11)

Kiểm thử gia hạn và hết hạn:

1. Subscribe một gói subscription có duration là 1 tháng
2. Đóng ứng dụng và đặt hẹn giờ 5 phút
3. Khởi động lại ứng dụng 
4. Nếu lời nhắc hiển thị, hãy nhập mật khẩu

Tại thời điểm này, ứng dụng sẽ tiếp tục hoạt động ở trạng  thái được đăng kí. Lắp lại các bước 2-4 vài lần nữa (hoặc chỉ đóng ứng dụng và đợi) cho đến khi hết 35 phút (6 lần gia hạn sau mỗi 5 phút cộng với subscribe 5 phút ban đầu). Bây giờ, ứng dụng sẽ trở lại trạng thái chưa subscribe và cho phép người dùng subscribe lại.

Kiểm thử restore sau khi hết hạn 
1. Subscribe một gói subscription có duration là 1 tháng
2. Đóng ứng dụng và đợi 35 phút
3. Khởi động lại ứng dụng
4. Nếu lời nhắc được hiển thị, nhập mật khẩu
Lúc  này ứng dụng trở lại trạng thái chưa đăng kí 
5. Tap và nut “Restore Purchases”
=> Kết quả: App vẫn ở trạng thái chưa đăng kí subscription

Kiểm thử restore trong khi đang subscription
1. Subscribe một gói subscription có duration là 1 tháng
2. Xóa ứng dụng và cài đặt lại trong vòng 5 phút
3. Khởi động lại ứng dụng
4. Nếu lời nhắc được hiển thị, nhập mật khẩu
=> Kết quả: App ở trạng thái đang đăng kí subscription

Kiểm thử restore trên nhiều devices
1. Subscribe một gói subscription có duration là 1 tháng
2. Cài đặt ứng dụng trên một thiết bị khác trước khi đăng ký hết hạn
3. Khởi động lại ứng dụng
4. Nếu lời nhắc được hiển thị, nhập mật khẩu
=> Kết quả: App ở trạng thái đang đăng kí subscription

**Sandbox Testing**

Cũng có thể kiểm thử tự động gia hạn subscription thông qua tài khoản text sandbox, nhưng chủ đề này sẽ được trình bày ở bài khác

**Production Testing**

Đối với một ứng dụng chưa được phát hành trên App Store, dùng version đầu tiên được phê duyệt của app là một cách tốt nhất để  kiểm thử subscriptions:

1. Submit một bản beta của App đến App review. Đảm bảo cài đặt “Version Release” thành “Manually release this version” để ứng dụng không được release trên App Store. 
2. Tạo mã khuyến mãi cho ứng dụng. Điều này có thể được thực hiện đối với các ứng dụng miễn phí đã được phê duyệt nhưng chưa có trên App Store.
3. Tải xuống ứng dụng từ App Store bằng mã khuyến mãi.
4. Subscribe
 
 Vì ứng dụng này đã được phê duyệt, nên subscriptions sẽ hoạt động chính xác như khi ứng dụng có trên App Store, bao gồm cả những charging testers, những người subscribe và quản lí subscription trên App store. Mã khuyển mại có thể được trao cho người kiểm thử để họ kiểm thử ứng dụng miễn phí. Subscription được trả tiền qua mã khuyến mại và hoạt động chính xác như subscribe trả phí, ngoại trừ việc tự động gia hạn.
 
 Nguồn tham khảo: https://www.revenuecat.com/blog/the-ultimate-guide-to-subscription-testing-on-ios