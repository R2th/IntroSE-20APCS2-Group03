Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/ios-os-x-development/edit-breakpoints-in-xcode-a20b4e453598

Các **Breakpoint** đóng một vai trò quan trọng trong quá trình **debug**.
**XCode** cung cấp những tính năng mạnh mẽ cho chúng. Đây là một số gợi ý giúp bạn **debug** một cách hiệu quả hơn.

Nào chúng ta cùng bắt đầu nhé.

Giả sử chúng ta có một vòng lặp như dưới đây:

```
var sum = 0
for i in 0...100 {
  sum += i
}
print(sum)
```

#### Câu hỏi: Tôi muốn biết giá trị sum khi i bằng 60. Làm cách nào để tôi có thể thực hiện được việc này?

Chúng ta có thể cấu hình **Condition** cho **Breakpoint** để thực hiện việc này. Đây là các bước thực hiện:

1. Thiết lập một **Breakpoint** bên trong vòng lặp
2. Nháy đúp vào **Breakpoint**, hoặc nhấp chuột phải và chọn **Edit Breakpoint**
3. Trong **Condition** điền vào `i == 60`

![](https://images.viblo.asia/ef0ad716-a286-4cce-b856-8504f2d0f2f7.png)

Giờ thì chúng ta sẽ biết giá trị *sum* bằng *1770* khi *i*  bằng *60* . Chúng ta có được điều này mà không cần viết bất kì dòng code nào, khá đơn giản đúng không các bạn?

#### Câu hỏi: Tôi muốn biết giá trị sum chỉ khi i lớn hơn hoặc bằng 90. Làm cách nào tôi có được điều này?
Bạn có thể để ý thấy có tuỳ chọn **Ignore** nằm bên dưới **Condition**. Đây là câu trả lời chính xác: thiết lập **Ignore** là *90* và chúng ta không cần phải quan tâm gì về giá trị *sum*  khi *i* nhỏ hơn *90* 

![](https://images.viblo.asia/cba49eb1-adb3-4125-9c8d-47dab350ed92.png)

**Breakpoint** này sẽ chỉ dừng khi *i* lên tới giá trị *90*  và giá trị *sum* lúc này là *4005* . Bạn có thể tiếp tục cho chương trình chạy và kiểm tra giá trị *sum*  tương ứng với các giá trị *i* lơn hơn *90*.

#### Câu hỏi: Tôi muốn biết giá trị sum chỉ khi i lớn hơn hoặc bằng 90. Tuy nhiên tôi không muốn thực hiện bằng tay cho chương trình tiếp tục chạy mà hi vọng có thể thấy tất cả giá trị sum một lần. Có cách nào để thực hiện việc này không?

Câu trả lời là CÓ. *Action* và *Options* chính là điều bạn cần. Đây là các bước thực hiện:

1. Set giá trị **Ignore** là 90, như câu hỏi trước.
2. Nhấp chuột vào **Add Action**, điền `po sum` , điều này có nghĩa là sẽ in ra giá trị *sum*
3. Tích vào **Options**, điều này có nghĩa là chúng ta sẽ liên tục in ra giá trị *sum* sau khi *i* đáp ứng yêu cầu của **Ignore** 
4. [Không bắt buộc] Nếu bạn muốn biết trong quá trình **Breakpoint** được kích hoạt, bạn có thể thêm **Action** với **Log Message** để in ra tên của **Breakpoint** trong **Console**.

![](https://images.viblo.asia/4d2554fb-3afa-427b-a25b-2be589edd989.png)

Xong! Chúng ta sẽ có được tất cả các giá trị *sum* với *i* lớn hơn hoặc bằng 90. Và chúng ta biết được việc này xảy ra trong *viewDidLoad()*.

Đây chỉ là một số tính năng cơ bản của **Breakpoint**. Để biết thêm các chủ đề thú vị về **Breakpoint** và **Debugging** mời các bạn tham khảo tại đây [Apple’s Debugging Tools](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/debugging_tools.html).