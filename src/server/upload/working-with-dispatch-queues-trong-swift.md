Xin chào các bạn, hôm nay mình sẽ viết về một chủ đề khá nâng cao trong ngôn ngữ swift, đó chính là Dispatch Queues. Vậy Dispatch Queues là gì và dùng để làm gì? Có lẽ mọi lập trình viên ios đều đã từng nghe qua và trong quá trình làm app thì cũng đã từng sử dụng ở mức độ ít nhiều. Đi sâu vào tìm hiểu thì nó có rất nhiều thứ để nói, đến nỗi bạn sẽ cảm thấy mông lung và rất khó hình dung. Để thực sự hiểu và master nó thì có lẽ sẽ phải trải qua nhiều thời gian đọc và thực hành thì mới có thể nắm bắt được hết. Vì vậy trong khuôn khổ bài viết này, mình sẽ giới thiệu những thứ cơ bản nhất để các bạn có thể dễ dàng tiếp cận và tìm hiều về Dispatch Queues, kèm theo nó là các ví dụ mà mình khẳng định chắc chắn các bạn sẽ phải sử dụng trong quá trình làm việc.
Hiện nay trên internet có khá nhiều bài viết chia sẻ về Dispatch Queues, vì vậy để có một góc nhìn khác một chút, mình sẽ chỉ nói qua về khái niệm và sau đó sẽ đưa ra ví dụ cơ bản nhất, đặc trưng nhất của nó để các bạn dễ hiểu.
# Khái niệm
Về định nghĩa, đầu tiên các bạn chỉ cần hiểu nó là một thư viện đã được viết sẵn, chỉ việc sử dụng của Apple. Mục đích là để tận dụng tối đa tài nguyên của phần cứng, làm cho ứng dụng mượt mà hơn khi sử dụng. Bằng cách sử dụng Dispatch Queues để có thể đưa một phần code thực hiện trên một luồng khác, chúng ta có thể giải quyết được nhiều vấn đề khi làm app.
# Ví dụ về dispatch
## Chạy bất đồng bộ
- Trong hầu hết các app từ lớn đến nhỏ, các bạn sẽ đều phải gặp trường hợp hàm của các bạn viết ra phải excute một lượng code lớn, cần thời gian để xử lí. Nếu thông thường, khi chạy các hàm đấy sẽ bị delay, giật nặng nhẹ tuỳ vào độ nặng của code. Cách giải quyết trong trường hợp này là show một popup loading lên, đợi code thực thi xong rồi dismiss đi. Như vậy trải nghiệm của người dùng sẽ không bị khó chiu. Mà app trông có vẻ pro ^^
Cách làm như sau: 
1 Bạn có thể sử dụng các thư viện có sẵn để show progress, loading. Hãy chọn những thư viện lớn. Có nhiều đánh giá tốt để tránh bị bug nhé các bạn. [Tham khảo](https://github.com/jdg/MBProgressHUD)
```

MBProgressHUD.showAdded(to: self.view, animated: true)
            DispatchQueue.global(qos: .userInteractive).async {
               // Code xử lí tại đây
                DispatchQueue.main.async {
                    MBProgressHUD.hide(for: AlertFrame.rootViewController().view, animated: true)
                }
               
```
Trong ví dụ trên, phần code đã được đẩy xuống một luồng khác. Chúng ta có thể chọn mức độ ưu tiên thực thi code, cụ thể ở trên là userInteractive. Ngoài ra còn có các lựa chọn khác như sau:
- User-interactive: thực hiện gần như ngay lập tức
- User-initiated: Sau một vài giây hoặc ít hơn
- Utility: Một vài giây hoặc một vài phút
- Background: Cần một khoảng thời gian đáng kể. Có thể là một phút hoặc thậm chí 1 giờ
## Delay 
- Sử dụng delay có thể giải quyết được nhiều vấn đề. Ví dụ như dùng để delay khi gõ chữ vào searchbar. Và sử dụng dispatch để delay là một ý tưởng không tồi. Tuy nhiên các bạn nên cẩn thận với những hàm cần chạy đồng bộ. Vì việc delay mất kiểm soát có thể ảnh hưởng nghiêm trọng đến tính đúng đắn của code hay của hàm. Cách làm thì rất đơn giản như sau: 
```
DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
// your code here
}
```

## Tổng hợp một số trường hợp hay sử dụng của Dispatch
- dispatch_async : Thực thi ngay lập tức, bất đồng bộ. Điển hình là trường hợp show loading hoặc progress
- dispatch_after: Thực hiện delay trước khi chạy một khoảng thời gian truyền vào
- dispatch_once: Chỉ chạy một lần duy nhất.
- dispatch_sync: Chạy đồng bộ với mainThread
- dispatch group: Quản lý các task khác nhau
- dispatchSemaphore:  Sử dụng để thực hiện nhiều tác vụ có liên quan ràng buộc đến nhau, chờ và thực thi

### Kết luận
Trên đây là một số ví dụ và kiến thức cơ bản về dispatch trong swift. Để nắm được rõ ràng thì các bạn cần có thời gian luyện tập vì kiến thức phần này cũng khá lằng nhằng. Cần phải hiểu về các khải niệm như đồng bộ, bất đồng bộ. Các loại Queues có thể là Serial hoặc Conccurrent. Và quan trọng nhất vẫn là thực hành nhiều để hiểu rõ. Hi vọng bài viết sẽ giúp ích cho các bạn.