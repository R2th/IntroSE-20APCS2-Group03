##  3 mẹo để dễ dàng khắc phục crashes và bugs 

> Mỗi ứng dụng đều đi kèm với các vấn đề về hiệu suất, crashes và bugs để khắc phục. Mặc dù chúng ta cố gắng hết sức nhưng chúng ta sẽ gặp phải với những vấn đề không lường trước được. Ngay cả khi ứng dụng của bạn chạy trơn tru trên thiết bị của bạn, QA test tất cả các thử nghiệm đều thành công.
 Do đó, tất cả chúng ta có thể sử dụng một số mẹo để được chuẩn bị tốt hơn cho sự cố trong tương lai chưa biết. Bằng cách thu thập thông tin phù hợp, việc khắc phục hầu hết các bugs và crashes của bạn sẽ dễ dàng hơn rất nhiều.

### 1. Công cụ báo cáo crashes 

Khắc phục **crashes**, tất cả bắt đầu bằng việc hiểu biết về sự cố xảy ra trong ứng dụng của bạn. Cách dễ nhất để làm điều này là bằng cách vào `Xcode ➞ Organizer ➞ Crashes.` Bạn có thể chọn ứng dụng của mình và phiên bản mới nhất của ứng dụng để hiểu rõ hơn về các **crashes** đã xảy ra:

![](https://images.viblo.asia/11593342-086b-47b3-adc2-29f0d0ba5ca7.png)

Điều tuyệt vời ở đây là Xcode cho phép bạn nhảy trực tiếp vào đoạn code gây ra sự cố bằng cách nhấp vào nút màu xanh lam ở trên cùng bên phải: **“Open in Project…”.**

Bạn có thể trực tiếp bắt đầu khắc phục **crash**, thêm ghi chú vào **crash** trong Xcode và đánh dấu nó là đã được giải quyết bằng cách sử dụng nút **“Mark as Resolved”** ở góc dưới bên phải.

### 2. Kết nối với khách hàng của bạn

Một trong những cách hiệu quả nhất để khắc phục các **bugs** phổ biến là kết nối với khách hàng của bạn. Khách hàng của bạn sử dụng ứng dụng của bạn trong lĩnh vực này và biết rõ nhất điều gì sai hay không. Trên hết, nó rất khó chịu cho người dùng nếu một ứng dụng không hoạt động được như bình thường.

Bằng cách tạo nhóm người dùng **TestFlight**, bạn có thể bắt đầu thử nghiệm sớm phiên bản mới của ứng dụng. **TestFlight** có một công cụ báo cáo tích hợp để người dùng báo cáo bất kỳ lỗi nào được tìm thấy. Người dùng có thể truy cập trang này bằng cách chụp ảnh màn hình, nhấn vào **“Done”**, và nhấn vào **“Share Beta Feedback”**. Họ có thể thêm ghi chú và chia sẻ ảnh chụp màn hình để phản hồi:

![](https://images.viblo.asia/d779e00f-a03f-4163-a9d1-405bb28aa90b.png)


Phản hồi này sẽ kết thúc trong **App Store Connect** tại trang **TestFlight** với tất cả các loại thông tin hữu ích như thông tin về pin, dung lượng ổ đĩa, phiên bản ứng dụng và phiên bản hệ thống:

![](https://images.viblo.asia/c59f9408-e8d4-464c-a752-16ded5229406.png)

Rõ ràng, đây chỉ là một trong những cách để kết nối với người dùng của bạn. Các ý tưởng khác để làm tương tự:

* Tạo một tài khoản Twitter đang hoạt động để cho phép người dùng trả lời bạn
* Thêm chức năng trò chuyện trong ứng dụng
* Xây dựng một trang hỗ trợ với một hình thức phản hồi



### 3. Sự cố liên quan đến người dùng

Hầu hết các công cụ báo cáo **crash** cho phép bạn đặt một định danh người dùng cụ thể. Điều này cho phép bạn lọc ra các **crashes** cho một người dùng cụ thể. Bạn thậm chí có thể thêm điều này dưới dạng `hyperLink` vào báo cáo chuẩn đoán **HTML** tùy chỉnh của mình để trực tiếp mở trang web chứa tất cả các crashes cụ thể cho một người dùng đó:

```
static var firebaseCrashesURL: String {
    guard let identifier = Tracker.userIdentifier else { return "Unknown" }
    return "<a href=\"https://console.firebase.google.com/u/0/project/your-project-name/crashlytics/app/ios:your.bundle.identifier/search?time=last-seven-days&type=crash&q=\(identifier)\" target=\"_blank\">\(identifier)</a>"
}
```

Ví dụ này tạo ra một liên kết để trực tiếp mở các **crashes** được báo cáo trong **Firebase** cho người dùng là báo cáo về một vấn đề cụ thể. Hãy đảm bảo bạn bảo mật được `identifier` để nó tuân thủ `GDPR` bằng cách không tiết lộ bất kỳ cách nào để lấy dữ liệu riêng tư của người dùng.

### 4. Kết luận 

Đó là những mẹo giúp bạn chuẩn bị tốt hơn cho mọi vấn đề sắp tới. Tăng tốc quy trình fix bugs của bạn và tạo thêm thời gian để xây dựng các tính năng mới thay vì phải fix bugs :smile:

Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃