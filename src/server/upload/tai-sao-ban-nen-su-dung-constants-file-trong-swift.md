Không có gì ngạc nhiên và và việc code được viết clear, ngắn gọn là chìa khoá trong thế giới lập trình. Một trong những phương pháp yêu thích của tôi mà tôi đã học được trong quá trình phát triển iOS và vui vẻ áp dụng nó từ rất sớm là sử dụng Constants File.
# Constants file là gì?
Nói đơn giản, nó là một file dành riêng để lưu trữ những biến hằng số được khai báo trong code. Cái hay của nó là nó có thể truy cập được trong toàn bộ project.
# Lợi ích của constants file
Lợi ích chính của constants file là nó có một vị trí trung tâm để quản lý các globally properties và được sử dụng lặp đi lặp lại trong project. File này có tính tuỳ chỉnh cao và bạn sẽ giảm thiểu số lượng lỗi như code sai hoặc code nhầm.
# Những thuộc tính nào có thể được lưu trong Constants file?
Hãy nghĩ về các thuộc tính chung mà bạn có thể cần và sử dụng nhiều lần trong code. Ví dụ như màu sắc, mặc dù bạn có thể set màu ở file xib, nhưng trong một số tình huống đặc biệt, nhưng đôi khi có những yêu cầu cần thay đổi màu với những tính năng khác nhau. Việc phải thay đổi những màu đặc biệt khá dài dòng.

Ví dụ bạn hoặc khách hàng muốn sử dụng màu Indigo và Navy. Thật không may, Xcode không defind sẵn cho chúng ta những màu đó, vì vậy chúng ta sẽ phải kết hợp RGB cho màu mình mong muốn. Ví dụ

![](https://images.viblo.asia/291374fa-8e10-4085-98d9-c2bed00e8a01.png)

Bây giờ, chúng ta đã có được màu chúng ta mong muốn. Giả sử màu này sẽ là màu chủ đạo của toàn bộ project, nó sẽ được sử dụng lại ở khá nhiều đoạn code khác nhau. Tại thời điểm này, nếu chúng ta cứ copy paste vào những đoạn code chúng ta cần thì sẽ rất xấu code, dài dòng. Hoặc có thể không để ý lỡ tay thay 1 trong số các thuộc tính R-G-B thì màu sẽ sai mà chúng ta lại không hề hay biết cho đến khi self test hoặc người khác feedback cho mình. Vậy cách tốt hơn là gì? Đó chính là sử dụng Constants file.

Constants file bao gồm các struct lồng nhau và các static properties. Để hiểu rõ hơn về static property trong Swift, chúng là những thuộc tính được viết như một phần định nghĩa của type, bên trong những types { }, và mỗi type property được xác đinh rõ ràng theo type mà nó hỗ trợ.

Hãy đưa điều này vào thực tế. Thay vì sử dụng giá trị kết hợp UIColor cho textColor của label, chúng tôi muốn lưu trữ các giá trị màu này vào Constants file để truy cập toàn cục và áp dụng nó cho bất kỳ thành phần UI nào.

Thêm một file Swift mới vào dự án của bạn và đặt tên là Constants.swift . Vì UIColors là một phần của UIKit, bạn phải import UIKit . Để bắt đầu xây dựng Constants file, theo thông lệ, struct cấp cao nhất được đặt tên là K. Trong struct K, hãy thêm một struct có tên là Colors. Bên trong struct này là nơi chúng ta sẽ thêm các thuộc tính statict màu do RGB xác định màu navy và indigo. Lý do tại sao chúng ta khai báo chúng là static là vì chúng có thể được gọi thông qua K.Colors . Dưới đây là giao diện Constants file.

![](https://images.viblo.asia/db8e7200-870c-4b0b-bba5-9b06fc7dd4f0.png)

Bây giờ hãy sử dụng nó trong ViewController.swift

![](https://images.viblo.asia/732cbc75-7a53-4761-8241-e670b610a271.png)

Đơn giản chỉ cần áp dụng các giá trị màu cho các thuộc tính textColor của Label như sau:
```
navyColorLbl.textColor = K.Colors.navy
indigoColorLbl.textColor = K.Colors.indigo
```

Lưu ý, sau khi nhập K thì Xcode sẽ suggest cho bạn struct Colors, tiếp theo khi chọn Colors thì Xcode sẽ suggest tiếp cho chúng ta các màu đã được định nghĩa, và bạn chỉ cần chọn đúng màu mình cần mà không sợ bị nhầm hoặc sai màu.

Vì vậy, như bạn có thể thấy, có một Constants file để lưu trữ các global properties một cách rõ ràng và tập trung có thể hữu ích. Tôi hy vọng bạn thấy việc sử dụng Constants file hữu ích để áp dụng cho các ứng dụng của riêng bạn. Cá nhân tôi xây dựng Constants file của mình để tổ chức các URL và thông số API ngoài đường dẫn tệp; khả năng là vô tận. Nó thực sự đáng giá khi bạn ngồi xuống và cấu trúc một Constants file, đặc biệt là khi bạn biết rằng bạn sẽ phải sử dụng nhiều thuộc tính lặp đi lặp lại trên ứng dụng của mình.

Chúc bạn code vui vẻ!

Nguồn: https://medium.com/swlh/why-you-should-use-a-constants-file-in-swift-ff8c40af1b39