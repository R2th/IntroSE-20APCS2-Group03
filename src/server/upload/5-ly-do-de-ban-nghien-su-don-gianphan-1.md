Khác với những bài tôi đã viết, ở số này, tôi chia sẻ và dịch một bài viết hay và thêm những bình luận cá nhân về bài viết này!  Tôi nghĩ bài viết gốc này rất hữu ích và hay đối với lập trình viên nói riêng và đối với tất cả mọi người.

**"Khi tôi mới bắt đầu, tôi đã muốn có tất cả. Tôi muốn xây dựng các app tuyệt vời với kiến thức hạn chế mà tôi có. Tất cả điều đó đã dẫn đến những cách làm của tôi quá phức tạp để mọi thứ hoạt động
Nếu tôi có thể quay lại thời điểm đó và đưa ra một số lời khuyên dành cho chính bản thân, tôi sẽ nói: hãy làm bản thân đơn giản mọi thứ"**

![](https://images.viblo.asia/fd6ebd71-b743-47d9-990d-be2056967662.png)

**Lời bình:** nếu tôi được quay lại thời gian, có lẽ tôi cũng giống tác giả, tôi sẽ dành cho chính bản thân câu nói trên. Đối với lập trình viên, rất nhiều khi chúng ta thường phức tạp hoá vấn đề, điều đó khiến chúng ta bị bối rối trước các phương án có thể thực hiện và chính sự phức tạp hoá đó là dẫn đến chất lượng công việc bị giảm, app nhiều bug hơn, nợ kĩ thuật(Technical Debt) nhiều hơn,....

**"Bạn muốn biết chìa khoá để đơn giản? (và lý do đầu tiên trong danh sách)**

**Lý do số 1: Modularity**

![](https://images.viblo.asia/f9f8c53b-ad93-48d7-b147-6d3ef5828aac.png)

**Giống như con quái vật của Frankenstein, ứng dụng của bạn nên được tạo ra từ các phần khác nhau và riêng biệt. Gỉa sử bạn tháo cánh tay của con quái vật thì con quái vật không ôm được nữa, nhưng tất cả các bộ phận khác của anh ta đều hoạt động.
Điều này có nghĩ là bạn có thể thêm sửa xoá các tính năng khỏi app của mình mà không làm hỏng nó. Làm điều đó trong chính app là điều tuyệt vời, nhưng chưa hết! Còn nữa! Mã của bạn bây giờ sạch hơn và tái sử dụng được
Với modular code, bạn đầu tư nhiều thời gian code ban đầu hơn. Phải mất thời gian để xây dựng một cách chính xác, tuy nhiên về lâu dài nó đơn giản hoá các dự án của bạn rất nhiều, bạn sẽ tự hỏi tại sao bạn không bao giờ làm điều đó.
Khi nào thì bạn làm và tại sao? 
"**
</br>
**Lời bình:**  
- Modul hoá là điều quan trọng trong lập trình. Bạn có thể tìm thấy trên wiki viết về tính như sau:  modul hoá là cấp độ các thành phần của một hệ thống có thể tách ra và tái kết hợp được, thường được sử dụng để đem lai lợi ích cho linh hoạt và đa dạng trong sử dụng. Khái niệm về modul hoá được sử dụng chủ yếu để làm giảm độ phức tạp bằng cách phá vỡ một hệ thống hình thành các mức độ phục thuộc lẫn nhau và che giấu sự phực tạp của phần phía sau một giao diện trừu tượng".
- Modul hoá là cùng chung ý tưởng với nguyên lý SOLID:
+ [S]ingle Responsibility Principle (SRP): Nguyên lý đơn chức năng => Modul thực hiện một trách nhiệm, nhiệm vụ riêng
+ [O]pen Close Principle (OCP): Nguyên lý mở rộng và che giấu. => Che giấu đi sự phức tạp phía sau và không cho chỉnh sửa nhưng vẫn có khả năng mở rộng("software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.")
+ [L]iskov Subsitution Principle (LSP): Nguyên lý thay thế Liskov
+ [I]nterface Segregation Principle (ISP): Nguyên lý phân tách các “Interface” => Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể
+ [D]ependancy Inversion Principle (DIP): Nguyên lý đảo ngược “Dependancy”
=> Giảm sự phụ thuộc giữa các modul, code dễ bảo trì, dễ thay thế modul


Những lời bình của tôi theo những kiến thức tôi biết nên còn nhiều hạn chế mong mọi người góp ý thêm.

Link gốc bài viết: https://swiftsailing.net/https-swiftsailing-net-5-reasons-to-be-addicted-to-simplicity-64cacbd85488

Tham khảo:
- https://toidicodedao.com/2015/11/03/dependency-injection-va-inversion-of-control-phan-1-dinh-nghia/
- http://swiftyvn.com/