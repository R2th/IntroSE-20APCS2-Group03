![](https://images.viblo.asia/1c489aa5-588d-4100-a887-b82221cdd247.png)

Hầu hết các ứng dụng Android chúng ta viết đều tuân theo chu trình sau: fetch/post dữ liệu từ remote server, xử lý chúng, lưu dữ liệu vào local và sau đó hiển thị dữ liệu theo cách có ý nghĩa.

Nếu bạn đã request dữ liệu thông qua API từ một remote server, rất có thể bạn đang sử dụng REST API. Tuy nhiên, do các ưu điểm của GraphQL API so với REST API (fetch dữ liệu tối ưu hơn, không fetch dữ liệu thừa), nó đang ngày càng được chấp nhận.

Trong bài viết này, chúng ta sẽ tìm hiểu các nguyên tắc cơ bản cần thiết để bắt đầu tận dụng sức mạnh của GraphQL trong các ứng dụng Android của mình.

### GraphQL là gì?
GraphQL là ngôn ngữ truy vấn cho API. Nó xác định các thông số kỹ thuật về cách truy vấn nên được thực hiện đối với API. Tương tự như các ngôn ngữ truy vấn khác, nó có các loại hoạt động khác nhau xác định các loại truy vấn có thể được thực hiện.

### Query
Một client request trong GraphQL có thể là query hoặc mutation. Một request là một truy vấn nếu nó nhận được dữ liệu từ server. Điều này tương tự với request HTTP GET trong REST.

![](https://images.viblo.asia/bd8e994e-9edb-49d2-8cc3-0ef08f83fefb.png)
Truy vấn trên có những điều quan trọng sau:
1. Loại Operation xác định rằng request là một query.
2. Tên Operation giúp theo dõi query dễ dàng hơn.
3. Các fields: Một truy vấn GraphQL tập trung vào việc chọn các fields mong muốn. Đây là một lợi thế so với việc sử dụng REST API (nó có thể  chỉ fetch về các fields mong muốn). Do đó, không có quá nhiều dữ liệu. Trong ví dụ này, truy vấn sẽ chỉ fetch firstName, lastName và email.

### Mutation
Mặt khác, một client request còn là một mutation nếu nó posts dữ liệu, updates hoặc deletes dữ liệu trên API.

![](https://images.viblo.asia/04941d7f-dfb3-489d-8cd1-14f7803eaa51.png)
Trong ví dụ này, các fields được cập nhật được chuyển thành mutation dưới dạng đối số arguments. Ngoài ra, mutation cũng trả về các giá trị field mới.

### Argument và Variables
Có những lúc chỉ cần truy vấn hoặc thay đổi dữ liệu cụ thể. Chẳng hạn khi chúng ta quan tâm đến việc truy vấn dữ liệu người dùng bằng một ID cụ thể. GraphQL làm điều này dễ dàng hơn và tránh được nhiều lời gọi đến API như trong API REST bằng cách cho phép nhiều query và mutation để nhận đối số arguments.

Một đối số argument được chỉ định bằng cách nêu tên của nó và kiểu của nó.

![](https://images.viblo.asia/d50efea7-a949-4532-98d1-b3ca7ba8a446.png)
Lưu ý rằng một đối số argument là không thể null nếu loại của nó có dấu chấm than ở cuối. Trong ví dụ trên, đối số firstName có kiểu String và nó không thể null.

### Directives
Chúng được sử dụng để include hoặc skip một field cụ thể trong truy vấn GraphQL nếu điều kiện là đúng.

![](https://images.viblo.asia/c5d673e0-6ee0-4e6d-8379-e57187d0366a.png)
Trong ví dụ này, truy vấn query sẽ bỏ qua việc fetch `lastName` nếu `$skipLastName` là `true`. Ngoài ra, nó sẽ chỉ bao gồm trường `email` nếu `$withEmail` là `true`.

### Fragments
Đây là những đơn vị tái sử dụng. Giả sử bạn có một ứng dụng mà bạn request dữ liệu khách hàng và nhân viên, bạn lặp lại dữ liệu contact trong cả hai. Một đoạn GraphQL cho phép sử dụng lại dữ liệu contact bằng cách biến nó thành một fragment.

Một fragment được xác định bằng cách bắt đầu với từ khóa `fragment` theo sau là tên fragment như hình bên dưới:

![](https://images.viblo.asia/d351f26b-14ac-4111-87cf-3a31161de539.png)

Fragment này sau đó được sử dụng như hình dưới đây:

![](https://images.viblo.asia/42240820-4e97-44d7-a29c-64b3e8879a85.png)

### Schema
Tương tự như schema trong SQL, một schema graphQL mô tả dữ liệu client có thể request, các trường và kiểu.

Đây là một contract giữa API và client. Bất cứ khi nào một request được thực hiện, đầu tiên nó được validated đối với schema trước khi nó được thực thi.

### Kết luận
Trong bài viết này, chúng ta đã tìm hiểu các khái niệm cần thiết để bắt đầu sử dụng GraphQL trong các ứng dụng Android của mình. 

Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu cách áp dụng các khái niệm trong các ứng dụng Android của mình bằng cách xây dựng một ứng dụng mẫu tạo một request cho GraphQL API.


ref: https://levelup.gitconnected.com/graphql-in-android-563c9cea705e