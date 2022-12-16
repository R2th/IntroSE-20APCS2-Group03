# Mở đầu
   Ở bài trước mình đã giới thiệu cho các bạn khái niệm về **Design Patterns** (sau này mình sẽ viết tắt là DP nhé) trong lập trình. Và như chúng ta đã tìm hiểu từ trước đó thì chúng ta có 3 loại DP chính, đó là: <br>
*    **Khởi tạo (Creational Design Pattern)**
*    **Cấu tạo (Structure Design Pattern)**
*    **Hành vi (Behavioral Design Pattern)**
<br>

Ở [bài trước](https://viblo.asia/p/nhap-mon-design-pattern-GrLZDx8wZk0) đã nói rõ nên nếu bạn nào chưa xem có thể vào đọc lại nhé.
Trong bài này mình sẽ đi sâu hơn vào **Creational Design Pattern** và đặc biệt là Abstract Factory - một trong những mẫu của Creational Design Pattern.
# Creational Design Pattern là gì?
Như chúng ta đã biết thì các mẫu DP được tạo ra để giúp chúng ta dễ dàng quản lý và bảo trì code hơn trong hầu hết các dự án của chúng ta. Và với mỗi mẫu DP riêng thì có những cách thức hoạt động cũng như vai trò riêng của nó. Vậy Creational Design Pattern (CDP)  có vai trò chính là gì chúng ta hãy cùng tìm hiểu nhé.<br><br>
Trong kỹ thuật phần mềm, CDP là các mẫu thiết kế đối ứng với các cơ chế tạo đối tượng, cố gắng tạo các đối tượng theo cách phù hợp với từng tình huống nhất định. Các hình thức cơ bản của việc tạo đối tượng là kết quả của các vấn đề thiết kế hoặc sự phức tạp trong vấn đề thiết kế. CDP giải quyết vấn đề này bằng cách kiểm soát việc tạo các đối tượng.<br>
Các mẫu CDP hiện có là: Abstract Factory, Builder, Factory Method, Object Pool, Prototype và Singleton.
# Abstract Factory
## Mục đích
* Cung cấp giao diện cho việc tạo ra các mẫu chung của các đội tượng liên quan hoặc phụ thuộc mà không nêu rõ các lớp cụ thể của chúng.
* Là một hệ thống phân cấp đóng gói: nhiều "nền tảng", và xây dựng một bộ "sản phẩm.
* Với mô hình này, thì toán tử *new* được xem là không tốt.
## Bài toán đặt ra
Để một ứng dụng có thể được sử dụng ở các thiết bị khác nhau, nó cần được đóng gói các "nền tảng" phụ thuộc đi kèm. Những "nền tảng" này có thể bao gồm: hệ thống giao diện, hệ điều hành, cơ sở dữ liệu... Thông thường, sự đóng gói này không được thiết kế trước, và cần rất nhiều trường hợp `#ifdef` với các tùy chọn cho tất cả các nền tảng hiện đang được hỗ trợ được sinh ra trong suốt quá trình xây dựng mã.
## Hướng giải quyết
Cung cấp mức độ gián tiếp sự trừu tượng việc tạo ra các đối tượng chung hoặc phụ thuộc mà không trực tiếp xác định lớp cụ thể của chúng. Đối tượng **Factory** có trách nhiệm cung cấp tạo ra các dịch vụ cho toàn bộ nền tảng. Phía khách không trực tiếp tạo ra các đối tượng nền tảng, mà nó yêu cầu đối tượng nền tảng làm điều đó cho chúng. Sẽ có một lớp trừu tượng được tạo đại diện cho toàn bộ ứng dụng. và chỉ được khởi tạo một lần. Do các dịch vụ cung cấp bởi các đối tượng gốc như vậy là phổ biến, nó thường được thực hiện như một **Singleton**.
## Cấu trúc
**Abstract Factory** sẽ định nghĩa một **Factory Method** cho mỗi sản phẩm. Mỗi **Factory Method**  lại đóng gói toán tử *new* và một lớp sản phẩm hay một nền tảng cụ thể. Mỗi nền tảng sau đó được mô hình hóa với một lớp dẫn xuất **Factory**.<br>
![](https://images.viblo.asia/87c95aea-2f6d-4fa0-a40d-5352baa3c1b1.png)
<br>
Mình sẽ giải thích sơ bộ như sau:<br>
Mỗi sản phẩm hay nền tảng nào đó chúng ta sẽ có một interface chung cho các sản phẩm liên quan. Và trong mỗi interface chúng ta sẽ đi định nghĩa các phương thức riêng cho mỗi từng trường hợp có thể có. Và cuối cùng, chúng ta chỉ việc kế thừa để tạo ra sản phẩm mà chúng ta cần.
## Các bước cụ thể
1. Quyết định nếu nền tảng độc lập và các dịch vụ khởi tạo là vấn đề hiện tại.
2. Lập bản đồ ma trận nền tảng so với sản phẩm.
3. Xác định **Factory** interface bao gồm **Factory Method** trên mỗi sản phẩm.
4. Xác định một lớp dẫn xuất của **Factory** cho mỗi nền tảng đóng gói tất cả các tham chiếu đến toán tử *new*.
5. Máy khách nên gỡ bỏ tất cả các tham chiếu đến *new* và sử dụng các phương thức factory để tạo các đối tượng sản phẩm.
# Lời kết
Qua phần trình bày của mình, hy vọng các bạn có thể hiểu rõ hơn về Creational Design Pattern cũng như Abstract Factory và ứng dụng nó trong con đường coding của mình.<br>
Link tham khảo: [https://sourcemaking.com/design_patterns/abstract_factory]()