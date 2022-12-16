Trong Frontend, có 1 thứ gọi là State dùng để thể hiện trạng thái của các thành phần trong app. Hiểu đơn giản là khi bạn gửi tin nhắn cho Crush thì tin nhắn đó sẽ có các trạng thái là đã gửi, đã nhận và đã xem (còn đã xem mà không trả lời là trạng thái mà bạn tự nhận ra được thì không phải là State sẽ được giải thích dưới đây). Các trạng thái trên là giá trị của state trong app, nó thể hiện ra để người dùng nhìn thấy. Tuy nhiên, cũng có những State được sinh ra để xử lý ngầm trong app mà không thể hiện ra UI. Ví dụ như khi bạn lướt Newsfeed Facebook, thực chất các nội dung sẽ được phân trang, mỗi lần bạn vuốt lên app sẽ tải nội dung của trang tiếp theo để hiển thị và số trang hiện tại chính là 1 State ngầm.

> Bạn cũng có thể đọc thêm bài viết tại đây: https://pixta.vn/state-management-la-gi-can-luu-y-gi-khi-su-dung-state-management 

## State Management là gì? 
Một chiếc app sẽ có rất nhiều State, đôi khi chúng hoạt động độc lập, hoặc phụ thuộc cũng như là ràng buộc lẫn nhau nên chúng ta phải quản lý nó. Đó chính là State Management.

## 2 điểm cần lưu ý khi làm việc với State 
State Management chưa bao giờ là điều đơn giản, biết dùng State thì dễ, nhưng để tối ưu nó mới là điều khó. Sau 1 khoảng thời gian làm việc với State, dưới đây là  2 điều mình đã rút ra được: 

### Không nên lạm dụng state
Điều đầu tiên, không phải tất cả các trạng thái của thành phần trong app đều nhất thiết phải được handle bởi State. 

Quay lại phần mở đầu, các trạng thái của tin nhắn là đã gửi, đã nhận và đã xem, các trạng thái này sẽ được quyết định bởi giá trị từ APIResponse. Vậy còn trạng thái đã xem mà không trả lời thì sao? Có phải cũng nên dùng State để handle nó hay không? 

Theo ý kiến của chúng tôi là không nên. Do đây là một trạng thái phụ thuộc, nó có thể tính toán từ state khác, cụ thể: Nếu tin nhắn bạn gửi đi có State là đã xem và tin nhắn mới nhất vẫn là của bạn thì có thể suy ra tin nhắn đã được xem mà không trả lời. Đương nhiên trạng thái này không thể hiện trực tiếp trên app như Messenger.
Hoặc là với trường hợp nhắn tin, mỗi tin nhắn sẽ có 3 trạng thái như đã nói và trên app sẽ có một icon (hình tròn) cạnh tin nhắn đó để thể hiện:
* Đã gửi: hình tròn chứa tích màu trắng
* Đã nhận: hình tròn chứa tích màu xanh
* Đã đọc: hình tròn chứa avatar của người đã đọc
Vậy thì thông tin mà icon hình tròn chứa có cần dùng state để handle hay không?
Đã có những lúc chúng tôi suy nghĩ mình sẽ code như dưới đây:
![](https://images.viblo.asia/97dba07f-4181-4298-8c63-351ea788ce45.png)

Nhưng tôi đã nhận ra: Phần nội dung của icon hình tròn phụ thuộc vào State trạng thái của tin nhắn, vậy nên nó không cần phải sử dụng 1 State mới để handle. Thực chất, chúng ta có thể xử lý như sau:
![](https://images.viblo.asia/8299bc5e-dd18-4ff5-9375-8ffcba442abb.png)

Chỉ là một thay đổi đơn giản nhưng cũng  giúp chúng tôi optimize code tốt hơn khi làm việc với state.

### Hãy cẩn thận với setState
Vấn đề ở đây là gì? Đó là setState là một hàm bất đồng bộ. Vậy nên đoạn code dưới đây sẽ không hoạt động đúng:
![](https://images.viblo.asia/fee86404-4981-4fe5-9874-97c732f86b56.png)

Lúc này, ngay sau khi gọi hàm setStatus, chúng ta đều mong muốn rằng state status sẽ được update ngay lập tức. Nhưng không, việc set giá trị mới cho state status sẽ được đưa vào event loop và xử lý sau. 

Nhìn ví dụ trên, có thể thấy một cách đơn giản là thay vì dùng `callbackToParent(status)` thì chúng ta dùng `callbackToParent(res.data)` là xong đúng không? Nhưng trong thực tế có những case phức tạp hơn là thế!

Khi tôi implement Upload function, tôi đã gặp một vấn đề phức tạp để handle status của các file upload. Tôi có 3 files cùng upload cùng một lúc và mỗi khi upload xong (thành công hoặc thất bại), tôi sẽ update status của các file này và đoạn code tôi xử lý sau khi upload như dưới đây:
![](https://images.viblo.asia/03c42f3e-dd48-4744-98f6-0bc4e64ed9ce.png)

Tôi đã hi vọng rằng đoạn code trên sẽ xử lý đúng, nhưng thật sự là ác mộng khi nó trả về cho tôi kết quả như thế này:
![](https://images.viblo.asia/be4906f4-8d0d-4d4b-9453-0aa130b8ce8a.png)

Thật sự tôi đã rất bối rối khi debug đoạn này, theo như tôi hiểu, vấn đề là do files state của tôi đang nhận giá trị cũ. Tại thời điểm file 1 finished thì file 2 và file 3 vẫn uploading, nhìn như không thấy vấn đề gì, nhưng sau đó khi file 2 finished thì tại scope này, files state bên trong hàm `handleFinishedUpload` vẫn chứa giá trị bao gồm file 1 và file 3 uploading, dù cho trước đó đã update files state với file 1 có status là uploaded.

Vậy thì phải làm thế nào đây? 
Thật may rằng `setState` cho phép chúng ta truyền vào 1 hàm thay vì 1 đối tượng. Hàm này chứa 2 đối số bao gồm đối số thứ nhất là *previous state* và đối số thứ hai là *props* tại thời điểm được update. Và với vấn đề nêu trên, tôi đã có thể fix được bằng cách sửa lại như thế này:
![](https://images.viblo.asia/e9fcd8b7-ff46-4e6f-b9e6-e7c6a387b20f.png)

Cuối cùng trông mọi thứ cũng đã “đẹp trai” hơn rồi! 

Trên đây là 2 vấn đề tôi gặp phải khi handle state cho React App và cách tôi xử lý chúng. Mong nhận được sự góp ý, chia sẻ kinh nghiệm của mọi người khi làm việc với Frontend. 

Thanks for reading. Have a nice day! <3