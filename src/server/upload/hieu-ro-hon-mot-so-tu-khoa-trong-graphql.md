Trong series [lần trước](https://viblo.asia/p/build-a-to-do-list-with-graphql-in-rails-5part-1-63vKj29kK2R) mình đã chia sẽ cho mn cách xây dựng một ứng dụng rails sử dụng Graphql. Qua series đó cơ bản thì mn đã hình dung được cách setup và hoạt động của Graphql. Để hiểu rõ hơn về graphql thì hôm nay mình sẽ chia sẻ về một số từ khóa trong graphql.
### Fields
Ở series trước mình đã sử dụng **fields** rồi nhưng chưa nói kĩ. Hiểu một cách đơn giản thì **fields** là những thuộc tính của đối tượng và trong Graphql cũng vậy, chúng ta định nghĩa các thuộc tính cần thiết trong kết quả trả về. Để hiểu hơn thì mình có một câu query đơn giản phía dưới và kết quả khi thực thi câu query đó.

![](https://images.viblo.asia/3399dff6-3dd4-4454-a08c-60f77699b450.png)

Như kết quả trong hình thì chúng ta dễ nhận thấy rằng kết quả trả về có cấu trúc giống hệt với câu query mình định nghĩa và đó chính là điểm khác biệt giữa Graphql và RESTful.
Ở câu query ta thấy có field **name**, đó chính là một thuộc tính của đối tượng **hero**, có kiểu dữ liệu là **string**.
Điều đặc biệt ở đây là mình có thể thay đổi fields trả về trong câu query như mình mong muốn để có một kết quả mới. Trong ví dụ này thì mình có thể thêm thuộc tính **age**, **address** vào đối tượng **hero** trong câu query và xem kết quả thay đổi.

Ngoài ra **fields** không chỉ đơn thuần là một string như thuộc tính **name** ở ví dụ phía trên mà nó có thể là một object. Trong trường hợp này chúng ta có thể tạo một **sub-selection** field cho đối tượng. Truy vấn trong GraphQL có thể truy xuất các đối tượng có quan hệ với nhau và các thuộc tính của chúng, giúp cho client có thể dễ dàng truy xuất nhiều dữ liệu liên quan trong một câu truy vấn.

![](https://images.viblo.asia/3aaf105a-5683-4bc0-a9e4-d8e20f1b25f5.png)
Chú ý rằng trong ví dụ này, thuộc tính **items** trả về một mảng các đối tượng.

### Arguments
Ngoài việc truy xuất các đối tượng và các thuộc tính của chúng thì GraphQL còn hỗ trợ thêm một tính năng là chúng ta có thể truyền đối số vào các trường.
![](https://images.viblo.asia/60a99a63-387f-4cc9-a697-d33c0f08ba72.png)

Đối với REST, bạn chỉ có thể truyền vào một tập hợp các đối số - tham số truy vấn và URL segment trong câu request. Nhưng với GraphQL, mọi thuộc tính và đối tượng lồng nhau đều có thể truyền đối số tương ứng, điều đó giúp GraphQL hoàn toàn thay thế cho nhiều API.
![](https://images.viblo.asia/9acf3654-dc39-4c36-bc85-b968106b52bd.png)

Arguments có thể là nhiều kiểu dữ liệu khác nhau. Như ví dụ ở trên, chúng ta có thể sử dụng kiểu dữ liệu Enumeration, nó đại diện cho nhiều kiểu dữ liệu(trong trường hợp đơn vị độ dài có thể là METER hoặc FOOT).

### Aliases
Aliases giúp chúng ta có thể đặt một cái tên tuỳ thích cho field trả về.
![](https://images.viblo.asia/e88c14f0-815e-4484-9b26-4296605144a1.png)

Trong ví dụ trên, hai thuộc tính **hero** sẽ bị xung đột, vậy nên chúng ta đã sử dụng aliases để có thể đặt tên cho thuộc tính theo ý muốn để có thể trả về một lúc hai thuộc tính **hero**
### Fragments
**Fragments**, theo mình nghĩ nó là một tính năng giúp tối ưu hoá code của GraphQL, giúp tránh DRY code, nó khá giống với **mixin** trong ruby. Fragments giúp chúng ta xây dựng một tập hợp các thuộc tính sử dụng nhiều, sau đó **include** nó vào câu query. Dưới đây là một ví dụ giúp bạn hiểu rõ hơn:

![](https://images.viblo.asia/8118f465-a1ab-42ce-99a6-5004400bb196.png)

Ví dụ trên chúng ta đã tạo ra một fragment là **comparisonFields** và include nó vào 2 field **leftComparison** và **rightComparison**. Qua ví dụ cho ta thấy các thuộc tính đã giảm thiểu đi 1 lần định nghĩa giúp code clear rất là nhiều.


Vậy là chúng ta đã tìm hiểu thêm một số keyword trong GraphQL và nó cũng khép lại bài viết lần này của mình. Còn rất nhiều keyword mới khá là thú vị và mình sẽ chia sẻ vào lần tới nhé! Good bye!!

Happy Coding!