# Giới thiệu
***Main Thread Checker*** là một công cụ độc lập được Apple tích hợp vào từ **Xcode 9** cho các ngôn ngữ Swift và C để phát hiện việc sử dụng sai cho AppKit, UIKit và các API khác trên *background thread*. Việc cập nhật UI trên một thread khác với main thread và một lỗi cơ bản mà có thể chúng ta rất dễ gặp nó sẽ khiến cho kết quả của việc cập nhật UI bị lỗi, hỏng dữ liệu hoặc crash app. 
# Main Thread Checker hoạt động như thế nào?
Khi khởi chạy app, Main Thread Checker sẽ tự động thay thế các *implement* của các phương thức chỉ nên được gọi trên *main thread* bằng một phiên bản kiểm tra trước. Các phương thức được biết là an toàn để sử dụng trên *background threads* sẽ được loại bỏ trong kiểm tra của ***Main Thread Checker***.

Note: 
> Không giống như các công cụ chẩn đoán mã khác, Trình kiểm tra luồng chính không yêu cầu biên dịch lại và có thể được sử dụng với các tệp nhị phân hiện có. Bạn có thể chạy nó trên ứng dụng macOS mà không cần trình gỡ lỗi Xcode, chẳng hạn như trên hệ thống tích hợp liên tục, bằng cách tiêm tệp thư viện động có tại /Applications/Xcode.app/Contents/Developer/usr/lib/libMainThreadChecker.dylib.
> 

# Hiệu năng 
Tác động hiệu năng của Main Thread Checker là rất nhỏ, với tổng chi phí CPU 1% 2% và thời gian khởi động quá trình bổ sung <0,1 giây.
Do chi phí hoạt động là rất nhỏ, Main Thread Checker sẽ tự động được bật khi bạn chạy ứng dụng của mình với trình gỡ lỗi Xcode.

# Cập nhật UI từ một Completion Handler
Dưới đây là một ví dụ cho việc cập nhật UI từ một *Completion Handler*, việc gọi dữ liệu từ API của chúng ta có thể mất một khoảng thời gian rất lâu, chúng được thực hiện trên *background thread*, khi thực hiện gọi API xong chúng ta sẽ cập nhật lại UI.
```
let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
   if let data = data {      
      self.label.text = "\(data.count) bytes downloaded"
      // Error: label updated on background thread   
   }
}
task.resume()
```
Đoạn code trên sẽ gây ra lỗi, việc update UI bắt buộc phải thực hiện trên *main thread*. Chúng ta sẽ phải sửa nó như sau:
```
let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
   if let data = data {
      DispatchQueue.main.async { // Correct
         self.label.text = "\(data.count) bytes downloaded"
      }
   }
}
task.resume()
```

Như trên tôi đã giới thiệu, việc check bạn có sử dụng đúng Main Thread hay không sẽ nhờ ***Main Thread Checker***, và kết quả việc chạy Main Thread Checker là app sẽ crash và nó sẽ chỉ ra cho bạn đúng chỗ bạn đã sử dụng sai.

![](https://images.viblo.asia/e59ccfc5-3424-4984-94b8-a9b4d1d4969a.png)

Tuy nhiên một vài tình huống, bạn đã vô tình tắt mất tính năng  ***Main Thread Checker*** này mà không biết, lúc đó việc update UI của bạn luôn luôn bị lỗi như case ở trên mà sẽ không có một cảnh báo nào hết. Khi đó có thể bạn sẽ mất rất nhiều thời gian để tìm hiểu tại sao UI không được cập nhật, thật là khó chịu. Bạn phải luôn kiểm tra rằng ***Main Thread Checker*** đã được bật bằng cách kiểm tra ở đây:

![](https://images.viblo.asia/8af371ca-589f-49ea-8eee-e2f4b52a9ee3.png)
hay
# Kết luận
 ***Main Thread Checker*** được Apple tích hợp vào và đã giúp cho developer rất nhiều tiết kiệm thời gian trong các trường hợp sử dụng sai Main Thread. Trên đây tôi đã giới thiệu đến các bạn nó là gì và hoạt động như thế nào, hi vọng bài viết sẽ hữu ích đến mọi người. Xin cám ơn!
 
 Nguồn:
 
 https://developer.apple.com/documentation/code_diagnostics/main_thread_checker