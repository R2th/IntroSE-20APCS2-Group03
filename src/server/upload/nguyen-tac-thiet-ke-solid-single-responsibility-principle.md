SOLID là một trong những bộ nguyên tắc thiết kế phổ biến nhất trong phát triển phần mềm hướng đối tượng. SOLID là từ viết tắt ghi nhớ cho năm nguyên tắc thiết kế sau đây:
* Single Responsibility Principle
* Open/Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion

Chúng đều là những nguyên tắc để một developer áp dụng để trở thành những developer "cứng". Bài viết này sẽ tập trung tìm hiểu về nguyên tắc thứ nhất: Single Responsibility Principle. Nào chúng ta cùng bắt đầu nhé.

*A class should have one, and only one, reason to change.*

Tạm dịch là như sau: *Một class chỉ nên có một và chỉ một trách nhiệm và lý do để sửa đổi nó.*
# 1. Lợi ích
Tại sao bạn nên áp dụng nguyên tắc này và điều gì sẽ xảy ra nếu bạn không áp dụng nó?
Lý giải cho nguyên tắc này tương đối đơn giản: nó làm cho chương trình của bạn thực hiện dễ dàng hơn và ngăn chặn các tác dụng phụ bất ngờ của những thay đổi trong tương lai.
# 2. Tần suất và ảnh hưởng của các sự thay đổi
Chúng ta đều biết rằng các yêu cầu thay đổi theo thời gian. Khi một class được cài đặt có nhiều chức năng khác nhau, thì trong tương lai bạn càng thường xuyên phải thay đổi nó. Nếu như class giữ nhiều chức năng thì nó sẽ không còn độc lập nữa. Vì thế, nếu như class của bạn chỉ có giữ một chức năng duy nhất thì vấn đề thay đổi nó sẽ giảm dần, và khi thay đổi nó sẽ không làm ảnh hưởng nhiều đến các class chức năng khác phụ thuộc vào nó.

Cuối cùng, bạn cần phải thay đổi class của bạn thường xuyên hơn, và mỗi thay đổi phức tạp hơn, có nhiều tác dụng phụ hơn, và đòi hỏi nhiều công việc hơn là cần phải có. Vì vậy, tốt hơn là tránh những vấn đề này bằng cách đảm bảo rằng mỗi class chỉ có một trách nhiệm, chức năng duy nhất.
# 3. Dễ hiểu
Nguyên tắc này còn cung cấp một lợi ích đáng kể khác. Các class, các component và các service nhỏ chỉ có một chức năng, làm cho người đọc hoặc phát triển dễ dàng hiểu và thực hiện hơn. Điều này làm giảm số lượng lỗi, cải thiện tốc độ phát triển của bạn và còn giúp bạn trở thành một developer code "cứng" đấy.
# 4. Ví dụ
![](https://images.viblo.asia/6f1135b8-a0b7-4bfb-9951-4a090ebfcc9e.jpg)

Như các bạn thấy ở trên, thì con dao này có nhiều chức năng khác nhau, ban đầu bạn thấy  nó thật sự có ích vì có thể làm được mọi thứ. Nhưng bạn có thể tưởng tượng sau này, nếu chúng ta phát triển con dao này trở nên to hơn để cắt được những đồ vật to hơn thì nó sẽ gồng gềnh và khó sử dụng như thế nào. Cũng giống như chúng ta phát triển một chức năng của chương trình vậy.
Cuối cùng, đây mới chỉ là nguyên tắc đầu tiên "S" trong 5 nguyên tắc SOLID. Hi vọng sẽ giúp ích được cho các bạn khi tham khảo nhé. :stuck_out_tongue_winking_eye:

Nguồn: https://stackify.com/solid-design-principles/