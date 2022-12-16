## Tại sao "Naming" (việc đặt tên) lại quan trọng ?
> Là người viết code, chúng ta luôn muốn code của mình dễ hiểu nhất để hiểu, để đọc lướt qua, không cần phải suy nghĩ sâu sa. Không giống như khi ta viết các học thuật đòi hỏi phải đào sâu để hiểu"

Hầu hết thời gian coding là chúng ta phải đọc code đã có. Do đó, nó nên dễ đọc và rõ ràng nhất có thể. Ta có thể làm được điều này bằng cách chọn từ và ghép chúng lại sao cho nó gần giống với ngôn ngữ chúng ta sử dụng. Naming (đặt tên) là một phần quan trọng của điều đó

Hơn nữa việc đưa ra một cái tên phù hợp cho thấy bản chất của một thứ, giúp chúng ta phân chia các thành phần tốt hơn và nó sẽ giúp ích cho ta duy trì và mở rộng sau này.
## Tại sao Naming lại khó ?
Việc đặt tên cũng đòi hỏi một kỹ năng mô tả tốt. Việc đó rất dễ dàng và trôi chảy với nhiều người nhưng hầu hết chúng ta lại khó khắn với việc này.
Một lý do khác là có thể tên chúng ta đặt lại không được sự đồng ý từ những thành viên khác. Vì họ sợ nó không phù hợp. Điều đó có thể xảy ra nếu ta chọn một cái tên không tốt, nó sẽ gây ra nhiều nhầm lẫn và khó hiểu về sau.
## Bắt đầu như thế nào ?
Có thể bạn sẽ lướt nhanh qua những mục của bài này, đó cũng là một cách tốt để bắt đầu. Nhưng sau khi đã có một cái nhìn tổng quan, mình mong muốn bạn hãy cố gắng thử thay đổi theo từng mục. Hãy thử thách bản thân dành vài ngày thay đổi cách suy nghĩ như những hướng dẫn bên dưới và nhìn lại quá trình của mình nếu cảm thấy phù hợp thì rất vui vì đã giúp ích được cho bạn.
Đừng sợ việc phải tái cấu trúc (refactor) và đặt tên lại. Hãy tập làm quen với nó vì sau nhiều lần ta sẽ được những cái tên tốt hơn, phù hợp hơn. Xui nhất là những cái tên ta mới suy nghĩ ra sẽ được chính ta thay đổi sau đó, nhưng dù thế nào thì nó cũng giúp ta học và trở nên tốt hơn.
### Không làm chúng ta suy nghĩ - Tên phải đầy đủ ý nghĩa
Không làm chúng ta suy nghĩ! Đây là một lưu ý quan trọng trong việc đặt tên.
Tên không nên làm chúng ta phải đặt câu hỏi về ý nghĩa và giá trị của các đối tượng. Code là đủ rắc rối rồi, nên một cái tên rõ ràng sẽ giúp ta dễ dàng hiểu được ý nghĩa của những thuật toán kì lạ, những đoạn code hack não.

* **Chọn tên rõ ràng thông tin.** Code càng rõ ràng càng tốt, nến biến lưu trữ cập nhật mới nhất hãy đặt tên là lastUpdatedRecord, đừng chỉ dùng là Record hoặc LastRecord.
* **Làm rõ sự khác biết về ý nghĩa**. Không phân biệt giữa các tên khác nhau bằng cách thêm từ không mục đích, thêm các số hoặc kí tự  không ý nghĩa chỉ để không lỗi khi compiler. Vi dụ hay gặp: ProductInfo và ProductData. Sẽ khiến ta đặt câu hỏi là thông gì mà ProductInfo có mà ProductData không có?
* **Thêm nội dung ảnh hưởng**. Phạm vi của điều bạn đang đặt tên nên được thêm vào nội dung có ý nghĩa. Bản thân trạng thái biến không có ý nghĩa, đặt nó trọng một class. Ví dụ : address.state hoặc engine.state thì những người khác sẽ tự hiểu state đó của ai. 
* **Sử dụng tên theo giải pháp**. Các đoạn code sẽ được những lập trình viên đọc nên bạn có thể sử dụng những tên là các thuật ngữ máy tính (jobQueue), tên thuật toán, thuật ngữ khoa học.        
* **Sử dụng tên chủ thế**. Nếu điều đó liên quan nhiều đến tên chủ thể được giải quyết. Vi dụ bạn có thể sử dụng "string address" và nó có nghĩa là địa chỉ giao hàng. Nhưng sẽ rõ ràng và mạnh hơn nếu ta dùng "Address shippingAddress". Vấn đề cần giải quyết ở đây là Address và khi ta tách nó thành một chủ thể là Address thì sẽ dễ dàng để hiểu và có thể tương tự với những loại Address khác nhau.
*  **Không viết tắt**. Không viết getWin mà nên đặt là getWindow
## Các khái niệm
Việc đặt tên các đối tượng là việc ta trừu tượng hóa và khái quát hành vi trong một khái niệm
* **Chọn một từ cho mỗi khái niệm trừu tượng và gắn với nó**. Nó sẽ giúp cho bạn và Team của bạn có một sự đồng nhất và sẽ biết những gì mong đợi từ một số tên nhất định. Điều gì khác biệt giữa fetch và retrieve? Chọn và sử dụng chỉ một. Tuy nhiên, không sử dụng cùng một từ cho những điều khác nhau. 
* **Sử dụng các quy ước**. Ví dụ như làm thế nào ta nhận được ID như bên dưới ?
```
worker.getId() 
candidate.id()
employee.id.get()
supervisor()
```
* **Sử dụng các đối lập**. Nếu bạn có thể mở open() thì bạn nên dùng close() đế đóng. Sau khi bạn start() bạn nên stop()
## Nhiễu và dư thừa
Tên nên rõ ràng và ngắn nhất có thể. Từ dư thừa hoặc gây nhiễu làm người đọc khó hiểu chứ không thêm được bất cứ lợi ích nào.
* **Từ gây nhiễu**. Bạn cảm thấy ProductInfo khác thế nào với ProductData? Hậu tố Info và Data là gây nhiễu .Chúng không thêm ý nghĩa riêng biệt.
* **Né tránh việc comment**. Một tên tốt thì tốt hơn ngàn lần việc comment thêm vào.
## Thông tin sai lệch
Đôi khi gây ra từ đầu, và đôi khi trong vòng đời phát triển và tái cấu trúc. Dù bằng cách nào ...
Tránh các từ và chữ viết tắt liên quan đến các nghĩa khác ngoài nghĩa của chúng ta.
Tránh sử dụng Type trong tên, ví dụ: accountList. Một ngày nào đó sẽ có người thay đổi loại thành hashSet, và tên sẽ mất đi ý nghĩa.
Tránh sự khác biệt nhỏ giữa các tên dài, ví dụ o l vì chúng trông giống với 0 I.
## Con người đọc
> Chương trình là được đọc bởi con người và máy tính xử lý chúng.
* **Độ dài** của tên phải dài nhất có thể để truyền đạt ý nghĩa một cách chính xác, tuy nhiên nó phải càng ngắn càng tốt để tăng khả năng đọc
* **Ưu tiên khả năng đọc hơn là ngắn gọn**. CanScrollHorizontally thì tốt hơn là ScrollableX.
* **Làm cho code dễ dọc như đọc đoạn văn**, câu và làm cú pháp càng dễ đọc càng tốt.
* **Tên có thể phát âm**. bạn nên đặt tên có thể phát âm rõ ra được hơn là dùng những tên khó phát âm như plhmbuster
* **Tránh mã hóa và các biểu tượng cảm xúc**
* **Tránh những tên tương tự nhau**
* **Tránh những tên dễ viết sai**
## Kết luận 
Đặt tên tốt giúp cho Code được tốt hơn. Khi chúng ta xây dựng các hệ thống lớn, hầu hết thời gian là cho việc đọc. Và tất cả chúng ta đều thích một câu chuyện được viết tốt. Hãy làm cho code bạn trở thành một câu chuyện hay nào.