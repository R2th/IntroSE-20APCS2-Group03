Bài viết được dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại https://medium.com/better-programming/developer-productivity-boost-with-google-search-tips-tricks-9ae384602e22.

![](https://images.viblo.asia/e2dcf6a1-dd34-47a9-852f-913541e2b3a9.jpeg)

Có rất nhiều cách để tăng tốc độ bàn giao sản phẩm phần mềm, như tôi đã đề cập trong một [bài viết](https://www.avanderlee.com/optimization/speeding-up-development-a-collection-of-tips/) trước đây.
Nhưng ở đây, tôi sẽ đi sâu hơn vào chi tiết, giải thích một số mẹo và thủ thuật mà tôi thường dùng hàng ngày để tìm được các câu trả lời nhanh hơn.

### Sử dụng dấu hoa thị *
Khi bạn gặp một vấn đề trong XCode, thông thường bạn sẽ nhận được một thông báo lỗi cho một đối tượng cụ thể nào đó.
Thông thường, chúng ta sẽ tiến hành tìm kiếm lỗi này trên Goolge như sau:

![](https://images.viblo.asia/46b0df12-4e74-459b-9c30-9f5f93e24c1b.png)

Mặc dù bạn vẫn sẽ thường xuyên tìm thấy câu trả lời cho mình với các lỗi phổ biến, nhưng nó không phải lúc nào cũng hiệu quả.

Bạn có thể sử dụng dấu hoa thị. Chỉ cần thay thế các đối tượng cụ thể bằng dấu hoa thị `*`, giống như bạn thấy trong ví dụ `Coyote.HomeViewController (0x1010b01f0)` và `Coyote.BucketListViewController (0x10bd7f580)` được thay bằng `*`. 
Những đối tượng cụ thể có thể là: tên ứng dụng, tên lớp, hoặc con trỏ, chúng là những đối tượng chỉ có trong ứng dụng của bạn mà thôi.
Từ khóa bạn sử dùng để tìm kiếm trên Google sẽ như sau:

![](https://images.viblo.asia/1b15f55e-2861-4576-aef2-74c8ec73e654.png)

Số lượng kết quả tìm kiếm đã tăng lên thành 578.000.000 kết quả, so với 2 kết quả tìm kiếm nếu như không sử dụng dấu hoa thị.

Như bạn có thể thấy trong ví dụ trên, kết quả tìm kiếm chính xác hơn nhiều và có nhiều khả năng chính xác là những gì bạn cần.
### Sử dụng một tên miền cụ thể
Năng suất của lập trình viên có thể được cải thiện hơn nữa nếu bạn biết tìm kiếm ở đâu. Nếu bạn đang tìm kiếm một vấn đề về mã chẳng hạn, có lẽ bạn có thể sẽ muốn tìm kiếm nó trên [Stack Overflow](https://stackoverflow.com/). Chúng ta có thể tìm kiếm như sau:

![](https://images.viblo.asia/c0081707-bda5-48da-8764-ffd232fb463d.png)

Điều này đã thu hẹp số lượng kết quả xuống còn 810.000. Các kết quả cụ thể hơn và có nhiều khả năng chứa câu trả lời mà chúng ta đang tìm kiếm hơn.
### Sử dụng "solved" như một thuật ngữ tìm kiếm
Mặc dù, đây không phải là một tính năng được hỗ trợ chính thức bởi Google, nhưng nó sẽ giúp tăng năng suất cho lập trình viên bằng cách cố gắng lọc ra các câu hỏi chưa được giải quyết.
![](https://images.viblo.asia/03277172-1a85-4845-b66d-94b4d35b8582.png)

Điều này thu hẹp số lượng kết quả xuống còn 295.000 và đưa chúng ta đến gần hơn với câu trả lời đúng.
Nếu bạn tự hỏi tại sao tôi lại đặt từ khóa **"solved"** ở đầu thay vì cuối, thì là vì nó có sự khác biệt. Thứ tự của các từ khóa ảnh hưởng đến mức độ ưu tiên và mang lại kết quả tìm kiếm khác nhau.
#### Sử dụng từ khóa “accepted” thay cho “solved”
Bạn có thể muốn sử dụng từ khóa **“accepted”** thay cho **“solved”** trên Stack Overflow. Điều này hoạt động tốt hơn vì Stack Overflow đánh dấu các câu trả lời là được chấp nhận thay vì đánh dấu các câu hỏi đã được giải quyết. Tuy nhiên, nói chung, **“solved”** có vẻ như hoạt động tốt hơn với các trang web khác.
### Có phải việc tìm kiếm trực tiếp trên Stack Overflow sẽ cải thiện hiệu suất của lập trình viên hơn nữa hay không?
Bạn có thể nghĩ rằng ý kiến trên là đúng. Tuy nhiên, việc tìm kiếm cùng một câu trả lời trên trang tìm kiếm của Stack Overflow không hiệu quả. Ngay cả khi chỉ tìm kiếm các câu trả lời và câu hỏi liên quan đến Swift ,bao gồm cả câu trả lời được chấp nhận, kết quả tìm kiếm vẫn khá thất vọng.
![](https://images.viblo.asia/f815b400-ad0e-4083-bbf5-3cb963906440.png)
Điều này chỉ là riêng trên Stack Overflow và các trang web khác có thể tốt hơn hoặc tệ hơn.
### Các ví dụ tìm kiếm khác
Ví dụ trên là tuyệt vời để tìm câu trả lời cho các vấn đề lập trình cụ thể. Tuy nhiên, đôi khi bạn muốn tìm một cái gì đó khác, như thư viện scanning tài liệu được viết bằng Swift chẳng hạn:
![](https://images.viblo.asia/a20da67e-b06b-4f50-ba9b-25f9f67b9b7f.png)

Hoặc có thể bạn muốn tìm một bài đăng cụ thể trên blog [SwiftLee](https://www.avanderlee.com/) .

![](https://images.viblo.asia/dc90e01b-54a9-4b9b-aa10-b4cba58c781c.png)

Tôi hy vọng điều này giúp tăng được năng suất phát triển phần mềm của bạn.