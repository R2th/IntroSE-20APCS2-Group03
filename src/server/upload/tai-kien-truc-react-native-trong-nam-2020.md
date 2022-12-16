## Mở đầu

React Native được giới thiệu lần đầu tiên vào năm 2015 như một giải pháp để phát triển các ứng dụng cross-platform với sự tương thích các thành phần native bằng cách sử dụng framework **ReactJS**. Tuy thiết kế ban đầu của nền tảng này có xuất hiện một vài sai sót và nhược điểm, nhưng vẫn được cộng đồng hỗ trợ mạnh mẽ và trở nên phổ biến do cách xây dựng ứng dụng thân thiện với web developer.

Được công bố lần đầu vào năm 2018, việc kiến trúc lại React Native là một nỗ lực của nhóm Facebook nhằm làm cho nền tảng này mạnh mẽ hơn và giải quyết một số vấn đề phổ biến mà các developer gặp phải trong những năm qua. 

Chúng ta sẽ xem việc này sẽ ảnh hưởng đến hiệu suất và tốc độ phát triển ứng dụng thế nào nhé.

## Kiến trúc cũ

Thực chất, React Native là một giải pháp **platform-agnostic** (không phụ thuộc nền tảng). Trong phạm vi này, mục tiêu chính của framework là cho phép các developer viết code bằng Javascript với ReactJS trong khi ở bên dưới React Native sử dụng các cơ chế riêng của nó để biên dịch các **React Element** để phía hệ điều hành có thể hiểu được. Điều này có nghĩa là:

* Hiển thị chính xác giao diện người dùng
* Khả năng truy cập đến các thành phần native của hệ điều hành.

Thông thường, đối với hệ điều hành *Android/iOS*, cơ chế hoạt động sẽ như thế này:

![](https://images.viblo.asia/f2d9adde-bcb7-4e89-80c6-57615632ef8d.jpeg)

Có 3 luồng chạy song song và riêng biệt trong mỗi ứng dụng React Native:
* **JS thread**: là nơi tất cả code Javascript được đọc và biên dịch, nơi xử lí hầu hết các logic nghiệp vụ của ứng dụng. Metro sẽ đóng gói tất cả code Javascript thành một file duy nhất. Phần code này sẽ được chuyển tới công cụ **JavascriptCore (JSC)** để có thể chạy được.
* **Native thread**: là nơi xử lý code native. Nó giao tiếp với **JS Thread** bất cứ khi nào có nhu cầu cần thay đổi UI hoặc truy cập các hàm native. Chúng ta có thể chia **Native Thread** thành **Native UI** và **Native Modules**. Tất cả các **Native Modules** đều được khởi động khi chúng ta sử dụng ứng dụng. Điều đó có nghĩa là module Bluetooth sẽ luôn luôn ở trạng thái kích hoạt bởi React Native kể cả khi không có nhu cầu sử dụng.
* **Shadow Thread**: là nơi các layout sẽ được tính toán. Nó sử dụng Layout Engine riêng của Facebook được gọi là **Yoga** nhằm tính toán flexbox layout, sau đó gửi kết quả về phía Native UI.

Để giao tiếp giữa  **JS thread** và **Native thread** chúng ta sẽ sử dụng một **Bridge**. Phía bên dưới, Module C++ này hầu hết được xây dựng xung quanh bằng một **hàng đợi bất đồng bộ (asynchronous queue)**.  Bất cứ khi nào nó nhận được dữ liệu từ một trong hai phía (**JS thread** hoặc **Native thread**), nó sẽ tuần tự hóa dữ liệu dưới dạng JSON và chuyển nó qua hàng đợi, cuối cùng được giải mã khi nó tới nơi.

Điều này có nghĩa là tất cả các thread đều dựa trên chuỗi tín hiệu JSON được truyền bất đồng bộ qua **Bridge**, và chúng sẽ được gửi tới một trong hai phía với mong muốn (nhưng không chắc là đảm bảo) sẽ nhận được phản hồi trong tương lai. Bạn cũng có thể sẽ gặp phải vấn đề tắc nghẽn thông tin và không nhận được phản hồi.

Một ví dụ phổ biến cho biết lý do tại sao điều này lại tạo ra các vấn đề về hiệu suất khi được nhìn thấy khi cuộn một danh sách dữ liệu lớn: Bất cứ khi nào sự kiện onScroll xảy ra trên **Native thread**, thông tin sẽ được gửi không đồng bộ đến **JS thread**, nhưng **Native thread** không chờ **JS thread** thực hiện xong mà nó lại gửi trở lại theo cách khác. Điều này tạo ra một sự delay, sẽ có một khoảng trống trước khi thông tin xuất hiện trên màn hình.

Tương tự như vậy, việc tính toán hiển thị layout cần phải trải qua nhiều vòng trước khi nó có thể được hiển thị trên màn hình, vì nó cần phải đi qua **Yoga engine** trước khi có thể được tính bởi **Native thread** và tất nhiên chúng cũng sẽ phải đi qua **Bridge** để tới **JS Thread**.

Chúng ta có thể nhận thấy cách gửi dữ liệu JSON một cách bất đồng bộ sẽ tạo ra vấn đề về hiệu suất. Nhưng còn cách nào khác để Javascript của chúng ta giao tiếp với Native code? Đây là nơi **JSI** phát huy tác dụng.

## Kiến trúc mới

Việc tái kiến trúc của React Native sẽ dần loại bỏ **Bridge** và thay thế nó bằng một thành phần mới có tên là  **Javascript Interface (JSI)**.

**JSI** có một vài cải tiến mới rất thú vị, đầu tiên là JS bundle không còn phụ thuộc vào JS core nữa. Nói cách khác, **JSC engine** giờ đây có thể dễ dàng hoán đổi với các JavaScript engine khác - có khả năng hoạt động tốt hơn - như Chrome Engine V8 chẳng hạn.

Cải tiến thứ hai của kiến trúc mới này là Bằng cách sử dụng **JSI**, JavaScript có thể giữ tham chiếu đến **C++ Host Object** và truy cập phương thức trên chúng. Từ đó JavaScript và các thành phần Native sẽ nhận thức và giao tiếp được lẫn nhau.

Nói cách khác, **JSI** sẽ cho phép khả năng tương tác hoàn toàn giữa tất cả các thread. Với khái niệm **chia sẻ quyền sở hữu (shared ownership)**, code JavaScript có thể giao tiếp với các thành phần Native trực tiếp từ **JS thread** và bỏ qua việc tuần tự hóa thông điệp dạng JSON giữa các thành phần, loại bỏ tất cả các vấn đề tắc nghẽn và bất đồng bộ trên **Bridge**.

![](https://images.viblo.asia/3fc62b20-0ee3-44f9-b387-16ff02e11081.jpeg)

Ngoài việc cải thiện đáng kể hiệu suất giao tiếp giữa các thread với nhau, kiến trúc mới này cũng cho phép kiểm soát trực tiếp các **Native modules**. Có nghĩa là chúng ta hoàn toàn có thể sử dụng các **Native modules** khi chúng ta cần chúng, không cần kích hoạt tất cả khi khởi chạy ứng dụng. Điều này mang lại sự cải thiện hiệu suất hết sức rõ rệt.

Cơ chế mới này có khả năng linh hoạt, cũng có thể có lợi cho nhiều trường hợp sử dụng khác nhau. Chẳng hạn như bây giờ chúng ta có sức mạnh của C++ trong tay, thật dễ dàng để thấy React Native có thể được sử dụng trong một hệ thống rất lớn.

## Đó vẫn chưa phải là tất cả

Trong những năm qua, React Native đã tích lũy rất nhiều phần mà hiện tại chúng đã lỗi thời, không còn được sử dụng hoặc sử dụng theo cách khác. Với mục tiêu chính là dọn dẹp các thành phần không thiết yếu cũng như cải thiện việc bảo trì, React Native framework đã loại bỏ một số thành phần ra khỏi hệ thống. Ví dụ như các Core component nưu **Webview** hoặc **AsyncStorage**, dần dần được đưa ra khỏi React Native core để biến chúng thành các repositories được quản lý bởi cộng đồng.

Với một cơ chế mới, bộ core sạch sẽ và khả năng tương tác ấn tượng giữa Javascript code và Native code, kiến trúc mới của React Native được thiết lập để đạt được nhiều cải tiến về hiệu suất và quy trình làm việc của các developer.

Với lộ trình nhắm đến việc tái cấu trúc được thực hiện trong vài năm tới, sẽ khá là thú vị khi ứng dụng của chúng ta hoạt động mượt mà, hiệu quả hơn, cũng như trải nghiệm của các developer chúng ta trở nên tốt hơn.

Link bài viết: https://medium.com/swlh/react-natives-re-architecture-in-2020-9bb82659792c

Reference: Lorenzo S. https://t.co/wDaXRvLtlA?amp=1