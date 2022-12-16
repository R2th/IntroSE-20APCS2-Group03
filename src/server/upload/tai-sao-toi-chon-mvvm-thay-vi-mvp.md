### Vấn đề
Một vài vấn đề phổ biến như liên kết chặt của code khiến cho một thay đổi nhỏ trong một vài dòng code có thể dẫn đến thay đổi hoặc lỗi ở các phần code khác. Giảm bớt sự tái sử dụng code do copy - paste. Không Thể test được...
### Giải pháp
Android được viết theo MVC như là mặc định khi Activity chịu trách nhiệm cho gần như mọi thứ. Với các ứng dụng đơn giản điều đó có vẻ là đủ, nhưng đồng nghĩa với sự phức tạp tăng lên là sự tăng lên của các vấn đề phát  sinh.<br><br>
Có nhiều mô hình khác nhau có thể áp dụng như MVP, FLUX, MVI, MVVM... đã được chứng minh là giải quyết được các vấn đề trên. Một người có thể sử dụng bất kỳ cách tiếp cận nào chỉ cần code có thể bảo trì, dễ dàng thay đổi, mọi thứ hoạt động trơn tru trong quãng thời gian hạnh phúc ngắn ngủi của developer :D.
### Mục đích cuối cùng
Mục đích cuối cùng trong việc xây dựng các giải pháp là tách biệt những thứ thuộc về Android và những thứ không cần Android để chạy độc lập với nhau, sau đó tách biệt cách phần không phụ  thuộc vào Android một cách phù hợp để đạt được các mục đích như code rõ ràng, dễ dàng maintain, cải thiện hiệu năng, dễ dàng test...
![](https://images.viblo.asia/abdcf195-25be-4edd-a0dc-2d160a4ef96e.png)
## Tại sao lại là MVVM?
Có muôn vàn bài viết và bàn luận về architecture pattern, chúng ta có thể khẳng định kiến trúc phổ biến hơn cả là MVP (Model - View - Presenter). Tuy nhiên cũng có nhiều thứ được thổi phồng xung quanh mô hình này. <br><br>
MVP được phát triển khá đầy đủ, nhưng khi Google giới thiệu Android Architecture Components có bao gồm ViewModel chứ không phải Presenter và do đó đã chứng mình rằng ngay cả Google cũng hỗ trợ MVVM. Có điều gì không đúng với MVP chăng?<br><br>
Mô hình MVP được diễn tả đơn giản bằng biểu đồ sau:
![](https://images.viblo.asia/f7b3ee74-5b8f-4a25-a3fe-81521fde56c2.png)
<br>đây là MVVM
![](https://images.viblo.asia/99372113-9cf6-4801-ab94-b255dcedafd2.png)
Bạn có thể chỉ ra điểm khác biệt giữa hai mô hình này không? Hãy thử bắt đầu với một vài vấn đề mà chúng ta sẽ gặp phải với MVP và cách chúng ta khắc phục chúng bằng MVVM.
### Liên kết chặt
Với mỗi Activity hoặc Fragment chúng ta cần một Presenter. Đây là một sự ràng buộc cứng nhắc. Presenter giữ tham chiếu của Activity và Activity giữ tham chiếu của presenter. Mối quan hệ 1:1 là vấn đề lớn nhất.<br><br>
Khi độ phức tạp của view tăng lên, tương tự với sự phức tạp của việc bảo trì và xử lý quan hệ này cũng tăng lên. Điều này dẫn đến những vấn đề giống như trước đó chúng ta đã gặp, nếu thay đổi thiết kế thì chúng ta sẽ phải chỉnh sửa cả quan hệ của chúng.<br><br>
Để tránh được quan hệ chặt chẽ đó, ViewModels được giới thiệu. ViewModel là một lớp đơn giản tương tác với lớp logic/model và đưa trạng thái/dữ liệu ra bên ngoài, và thực sự không biết dữ liệu đó được sử dụng như thế nào và bởi thành phần nào. Chỉ có View giữ tham chiếu đến ViewModel, điều này giải quyết được vấn đề liên kết chặt. Một view có thể giữ tham chiếu của nhiều ViewModel.
### Khả năng test
Do presenter bị trói buộc chặt vào view, viết unit test trở nên khá khó khăn do nó phụ thuộc vào view. <br><br>
ViewModel dễ dàng hơn cho việc test vì chúng chỉ đưa trạng thái ra bên ngoài và có thể test độc lập mà không phụ thuộc vào cách dữ liệu được hiển thị, nghĩa là hoàn toàn không phụ thuộc vào view.
## Kết luận
Các architecture pattern luôn luôn tiến hóa và MVVM có đủ tầm cỡ hoặc chúng ta có thể khẳng định nó có tiềm năng trở nên mạnh mẽ, hữu ích và tuyệt vời để triển khai. MVP đã tiến hóa đến một mức độ nào đó nhưng không phải thứ gì cũng hoàn hảo. MVVM tuy cần thời gian để tìm hiểu nhưng đến cuối cùng nó sẽ giúp chúng ta tránh được nhiều vấn đề mà những nhà phát triển thường gặp phải.<br><br>
Tương lai không ai có thể dám chắc nhưng ở thời điểm hiện tại thì không có một giải pháp nào để phải quyết một lúc toàn bộ vấn đề và một pattern có thể không đủ yêu cầu. Miễn là chúng ta có thể đạt được mục đích cuối cùng, thì mọi thứ khác chẳng thành vấn đề.<br><br>
Trên đây chỉ là một số ý kiến cá nhân trong quá trình làm việc với cả MVP và MVVM mà tôi đã rút ra, bạn đọc nếu đồng ý hay không đồng ý thì hãy để lại comment bên dưới để chúng ta cùng bàn luận.<br><br>
Hiện tại tôi cũng đang xây dựng một base đơn giản để phát triển ứng dụng Android theo [link này](https://github.com/tungtd95/AndroidSimpleBase). Base này có áp dụng mô hình MVVM, Kotlin, LiveData, Rx, Koin (dependency injection) và Room. Các bạn có mong muốn đóng góp hay chỉnh sửa thì cứ gửi merge request thoải mái để mọi người cùng review nhé :D.<br><br>
Happy Coding!!!