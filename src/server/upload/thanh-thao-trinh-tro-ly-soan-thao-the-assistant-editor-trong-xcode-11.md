## Sử dụng trình trợ lý soạn thảo "The Assistant Editor" trong Xcode 11 một cách linh hoạt

> Xcode 11 đã được giới thiệu trong WWDC 2019 và có những cải tiến trong cách thức hoạt động của trình trợ lý **Assistant Editor** .
> 

Nếu bạn sử dụng trình trợ lý thứ hai rất nhiều, ban đầu bạn có thể khá lúng túng khi bạn cố gắng sử dụng cùng một quy trình làm việc trong Xcode 11, khi các file được mở trong trình trợ lý bên trái trong khi bạn muốn chúng sẽ mở trong trình trợ lý bên phải. Vì vậy bạn chỉ cần tìm hiểu cách các trình trợ lý mới hoạt động trong Xcode 11. Khi bạn hiểu được nó, bạn sẽ cải thiện được và tăng tốc độ quy trình làm việc của mình!


### 1. Trình trợ lý soạn thảo "The Assistant Editor" trong Xcode là gì?

**Assistant Editor** trong Xcode là trình trợ lý thứ hai tự động hiển thị các file mà Xcode xác định là hữu ích nhất cho bạn dựa trên công việc bạn đang thực hiện trong trình soạn thảo chính. **Assistant Editor** rất tiện lợi với các file Interface (Xib). Assistant Editor còn rất nhiều chức năng khác, nhưng mình thường dùng Callers của nó (function đã trỏ, nó bị gọi với ai và nó gọi những function nào). Rất tiện dụng trong việc Debug, tìm hiểu xem code chạy như thế nào.
 
 Bạn có thể mở trình trợ lý từ menu Xcode **`Editor => Assisant`**. Ngày nay, **Assistant Editor** được xem nhiều hơn khi chỉ là trình trợ lý thứ hai bên cạnh trình soạn thảo chính.
 
###  2. Những thay đổi của trình trợ lý được giới thiệu trong Xcode 11

Trong Xcode 11 dường như không còn giới hạn nữa đối với số lượng trình soạn thảo bạn có thể mở:

![](https://images.viblo.asia/aec90aa4-127b-4b03-886f-f0192efcfde9.png)

Trình soạn thảo mới là một trong những thay đổi lớn nhất được giới thiệu trong Xcode 11 và được giới thiệu trong WWDC 2019:

* Mở nhiều trình soạn thảo cùng một lúc
* Tập trung vào một trình soạn thảo bằng cách vào chế độ chỉnh sửa toàn màn hình
* Có thể cấu hình riêng cho từng trình soạn thảo vì tất cả chúng đều có mini map, bản xem trước, trợ lý và các chế độ xem bổ sung khác

### 3. Thêm một trình soạn thảo bổ sung

Một trình soạn thảo mới có thể được thêm bằng cách sử dụng **`File -> New -> Editor`** hoặc sử dụng phím tắt **`Control + Command + T`**.

Một cách dễ dàng khác để thêm trình soạn thảo mới là nút bên trong phần đầu trình soạn thảo:

![](https://images.viblo.asia/91407425-56f1-4b68-9211-cc3de3240c99.gif)

### 4. Mở một tập tin trong trình trợ lý soạn thảo

Như đã thảo luận, bạn có thể thực sự mở một file trong trình trợ lý soạn thảo nhưng bạn còn có thể mở file trong trình soạn thảo phụ 

### 5. Khôi phục lại cách hoạt động cũ 

Nếu bạn vẫn không thể làm quen với các luồng mới, bạn có thể thay đổi cài đặt để mở những tệp tin như trước đây.

![](https://images.viblo.asia/3d12340b-319c-4dda-a008-f3674e7cb30d.png)

Đi đến **`Settings -> Navigation`** sau đó:

* Thiết lập **Navigation** thành **“Uses Primary Editor”**
* Thiết lập **Optional Navigation** thành **“Uses Second Editor”**

### 6. Mở một tập tin bằng cách sử dụng trình chọn đích đến

Sử dụng **`Option + Shift + Open file`** cho phép bạn chọn trình soạn thảo đích

![](https://images.viblo.asia/e4252c04-e58b-433a-82c9-a8c32773172e.png)

Nó có thể hữu ích nếu bạn làm việc với nhiều trình soạn thảo. Bạn cũng có thể sử dụng "Trình chọn đích đến" để mở tệp trong trình soạn thảo mới. Điều này có thể được thực hiện bằng cách di chuyển vùng màu xanh thành một dòng bên cạnh một trình soạn thảo hiện có.

![](https://images.viblo.asia/db646a51-09c0-45e3-94f4-891605d0a059.png)

Điều này có thể được thực hiện theo cả chiều ngang và chiều dọc cho phép bạn mở các trình soạn thảo chồng lên nhau:

![](https://images.viblo.asia/3e6c368e-4a7a-4910-a819-0eb10f05b434.png)

### 7. Làm việc với nhiều trình soạn thảo bằng cách sử dụng chế độ "Focus"

Lúc đầu, bạn có thể đóng bất kỳ trình soạn thảo phụ nào cho đến khi trình soạn thảo chính của bạn toàn màn hình trở lại. Với Xcode 11, điều này không còn cần thiết nữa vì giờ đây bạn có thể tập trung vào một trình soạn thảo duy nhất ở chế độ toàn màn hình.

Bạn có thể **focus** vào trình soạn thảo chính bằng cách đến **`View -> Editor -> Focus`**  hoặc sử dụng phím tắt **`Control + Shift + Command + Enter`**.  Cách dễ nhất có lẽ là sử dụng nút **focus** mới như dưới đây:

![](https://images.viblo.asia/3e0eb6a4-e242-4b60-b58d-c61fc54813f4.gif)

### 8. Kết luận 

Mặc dù có thể cần thời gian để làm quen với các trình soạn thảo mới trong Xcode 11, nhưng đó chắc là một cách tuyệt vời để cải thiện quy trình phát triển của bạn. Hãy đảm bảo rằng bạn tận dụng tối đa được các tính năng mới để cho việc code thêm flexible nhất có thể :grin:

Vậy là bài viết của mình đến đây là hết 😁. Mong rằng bài viết của mình sẽ giúp các bạn áp dụng được vào project

Cảm ơn các bạn đã theo dõi bài viết. 😃