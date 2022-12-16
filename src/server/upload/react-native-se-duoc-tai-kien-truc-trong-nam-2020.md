React Native được chính thức giới thiệu vào năm 2015 như một giải pháp cho việc xây dựng các ứng dụng đa nền tảng bằng ReactJS, đi kèm với khả năng tương thích với các thành phần native của hệ điều hành. Thiết kế ban đầu của nền tảng tuy có rất nhiều yếu điểm và sai sót, nhưng vẫn được cộng đồng lập trình viên trên thế giới hỗ trợ một cách mạnh mẽ và trở nên phổ biến - do cách xây dựng ứng dụng thân thiện với các lập trình viên Web.

Như đã được thông báo vào năm 2018, React Native đã và đang được đội ngũ phát triển của Facebook nỗ lực tái kiến trúc nhằm giúp nền tảng này trở nên mạnh mẽ hơn và giải quyết một số vấn đề phổ biến mà các nhà phát triển đã gặp phải trong vài năm qua.

Chúng tay hãy cùng xem việc tái kiến trúc này sẽ ảnh hưởng và cải thiện hiệu suất cũng như thời gian phát triển ứng dụng như thế nào nhé.

### Kiến trúc cũ
React Native là một giải pháp nền tảng bất khả tri (platform-agnostic solution). Trong phạm vi đó, mục tiêu chính là cho phép các nhà phát triển viết code bằng Javascript với ReactJS, và ở phía bên dưới, React Native sẽ sử dụng các cơ chế riêng nhằm biên dịch các React Elements thành các thành phần mà phía hệ điều hành Native có thể đọc hiểu.

- Hiển thị chính xác giao diện người dùng
- Truy cập tới các thành phần native của hệ điều hành

Thường thường đối với các hệ điều hành Android/iOS, cơ chế hoạt động sẽ giống như thế này:
![](https://images.viblo.asia/0d82911a-696b-4a19-9331-ded265f71372.png)

Có ba luồng riêng biệt chạy song song trong bất cứ ứng dụng React Native nào

- JS Thread: là nơi tất cả code Javascript được đọc và biên dịch, và là nơi xử lí hầu hết các logic nghiệp vụ của ứng dụng. Metro sẽ dịch các cú pháp Javascript thay thế (Typescript hoặc JSX), và kết hợp tất cả code Javascript thành một tệp duy nhất. Phần code này sẽ được chuyển tới công cụ JavascriptCore (JSC) để có thể chạy được.
- Native Thread: là nơi các đoạn code native được khởi chạy. Nó giao tiếp với JS Thread bất cứ khi nào có nhu cầu thay đổi UI hoặc truy cập các hàm Native. Chúng ta có thể chia Native Thread thành Native UI và Native Modules. Tất cả các Native Modules đều được khởi động khi chúng ta sử dụng ứng dụng. Điều đó có nghĩa là module Bluetooth sẽ luôn luôn ở trạng thái kích hoạt bởi React Native kể cả khi không có nhu cầu sử dụng.
- Shadow Thread: là nơi mà React Native sẽ tính toán layout. Nó sử dụng Layout Engine riêng của Facebook có tên là Yoga nhằm tính toán flexbox layout, sau đó gửi kết quả về phía Native UI.

Để JS Thread và Native Thread "giao thông" với nhau, chúng ta cần sử dụng một module C++ là Bridge. Phía bên dưới, module Bridge này được xây dựng xung quanh một hàng đợi bất đồng bộ (asynchronous queue). Bất cứ khi nào nó nhận dữ liệu từ một trong hai phía (JS Thread hoặc Native Thread), dữ liệu này sẽ được serialize dưới dạng JSON và gửi tới hàng đợi, cuối cùng được giải mã khi đến nơi.

Điều này có nghĩa là tất cả các thread đều dựa trên chuỗi tín hiệu JSON được truyền bất đồng bộ qua Bridge, và chúng sẽ được gửi tới một trong hai phía với hi vọng (nhưng không phải là đảm bảo) sẽ nhận được phản hồi trong tương lai. Bạn cũng có thể sẽ gặp phải vấn đề tắc nghẽn thông tin và không bao giờ nhận được phản hồi.

Ở đây chúng ta sẽ có một ví dụ khá phổ biến giải thích lí do tại sao các vấn đề về hiệu suất được nhìn thấy khá rõ ràng khi chúng ta cuộn lên cuộn xuống một danh sách dữ liệu lớn: Bất cứ khi nào sự kiện onScroll xảy ra ở Native Thread, thông tin sẽ được gửi bất đồng bộ tới JS Thread. Thế nhưng, Native Thread không chờ đợi JS Thread thực hiện các tác vụ của riêng nó và gửi nó lại theo cách khác. Điều này tạo ra độ trễ (delay) - sẽ có một khoảng trống hiển thị trước khi thông tin xuất hiện trên màn hình.

Tương tự như thế, việc tính toán hiển thị layout cần phải trải qua nhiều vòng trước khi chúng có thể được hiển thị trên màn hình: nó cần phải đi qua Yoga engine trước khi được tính toán bởi Native Thread, và tất nhiên chúng cũng sẽ phải đi qua Bridge để tới JS Thread.

Chúng ta có thể nhận thấy cách các thông điệp JSON được gửi trở lại bất đồng bộ sẽ tạo ra vấn đề về hiệu suất. Nhưng liệu còn cách nào khác để Javascript của chúng ta giao tiếp với code Native? Đây là nơi JSI phát huy tác dụng.

### Kiến trúc mới

Kiến trúc mới của React Native đã dần loại bỏ Bridge và thay thế nó bằng một thành phần mới có tên là Javascript Interface (JSI).

JSI có một vài thay đổi khá thú vị.

Đầu tiên, JS Bundle không còn phụ thuộc vào JSC (Javascript Core) nữa. Nói cách khác, JSC Engine giờ đây có thể hoán đổi bằng các Javascript Engine khác có khả năng hoạt động tốt hơn, như Engine Chrome V8 chẳng hạn.

Điểm thứ hai: bằng cách sử dụng JSI, Javascript có thể giữ các tham chiếu đến các đối tượng C++ Host Object và truy cập các phương thức trên chúng. Từ đó, Javascript và các thành phần Native sẽ nhận thức và giao tiếp được với nhau.

Nói cách khác, JSI đem lại khả năng tương tác hoàn chỉnh giữa tất cả các thread. Với khái niệm chia sẻ quyền sở hữu - Shared Ownership, code Javascript có thể chạy được trực tiếp các phương thức từ JS Thread, bỏ qua việc serialize các thông điệp JSON giữa các thành phần, từ đó loại bỏ các vấn đề về tắc nghẽn thông tin và bất đồng bộ trên Bridge.

![](https://images.viblo.asia/88fa50f7-ca0d-4043-bbfd-240906a073ae.png)

Ngoài việc cải thiện đáng kể hiệu suất giao tiếp giữa các thread với nhau, kiến trúc mới này cũng cho phép chúng ta kiểm soát trực tiếp các Native Modules. Có nghĩa là, chúng ta hoàn toàn có thể sử dụng các Native Modules chỉ khi nào cần đến chúng, thay vì kích hoạt tất cả khi khởi chạy ứng dụng.

Điều này mang lại sự cải thiện hiệu suất hết sức rõ rệt cho thời gian khởi chạy ứng dụng. Cơ chế mới này có khả năng đem lại lợi ích cho chúng ta trong nhiều trường hợp sử dụng khác nhau. Chẳng hạn như bây giờ, chúng ta đã nắm được sức mạnh của C++ trong tay, thật dễ dàng nhận thấy cách React Native được sử dụng cho mục tiêu hệ thống lớn.

### Câu chuyện vẫn chưa đến hồi kết

Trong những năm qua, React Native đã tích lũy rất nhiều thành phần mà chúng đã lỗi thời ở thời điểm hiện tại, và chúng đã không còn được sử dụng hoặc sử dụng bằng những cách khác. Với mục tiêu dọn dẹp các thành phần không quan trọng cũng như cải thiện việc bảo trì, một số thành phần của React Native framework đã được đem ra khỏi hệ thống. Ví dụ, một số thành phần cốt lõi như WebView hoặc AsyncStorage đã bị xóa bỏ khỏi React Native core, và chúng trở thành các repositories được quản lí và hỗ trợ bởi cộng đồng.

Với một cơ chế mới, bộ core sạch sẽ và khả năng tương tác ấn tượng giữa Javascript code và Native code, kiến trúc mới của React Native được thiết lập để đạt được nhiều cải tiến về hiệu suất và quy trình làm việc của các developer.

Với lộ trình nhắm đến việc tái cấu trúc hoàn chỉnh vào quý 4 năm 2020, sẽ khá là thú vị khi ứng dụng của chúng ta hoạt động mượt mà, hiệu quả hơn, cũng như trải nghiệm của các developer chúng ta trở nên tốt hơn.

Link bài viết gốc:

[https://duypt.dev/react-native-se-duoc-tai-kien-truc-trong-nam-2020-6AWVe2E7Je.html](https://duypt.dev/react-native-se-duoc-tai-kien-truc-trong-nam-2020-6AWVe2E7Je.html)

[https://medium.com/swlh/react-natives-re-architecture-in-2020-9bb82659792c](https://medium.com/swlh/react-natives-re-architecture-in-2020-9bb82659792c)