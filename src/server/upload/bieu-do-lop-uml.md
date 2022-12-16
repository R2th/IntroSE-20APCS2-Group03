Biểu đồ UML Class (Unified Modeling Language Class) là một tập các ký hiệu đồ họa được sử dụng để xây dựng và trực quan hóa các hệ thống hướng đối tượng. Một sơ đồ Class trong ngôn ngữ mô hình hóa thống nhất (UML) là một loại sơ đồ cấu trúc tĩnh mô tả cấu trúc của một hệ thống bằng cách hiển thị:
* Các class,
* Các thuộc tính,
* Các phương thức,
* Các mối quan hệ giữa các đối tượng.

**Class là gì ?**

Một class không phải là một đối tượng mà nó là một mô tả cho đối tượng đó. Trong thực tế, class mô tả loại đối tượng, trong khi các đối tượng là các thể hiện có thể sử dụng của các class. Mỗi đối tượng được xây dựng từ cùng một tập hợp các bản thiết kế và do đó chứa các thành phần giống nhau (thuộc tính và phương thức). Ý nghĩa tiêu chuẩn là một đối tượng là một thể hiện của một class và đối tượng - Các đối tượng có các trạng thái và hành vi.

**Ký hiệu UML class**

Một claas đại diện cho một khái niệm đóng gói trạng thái (thuộc tính) và hành vi (phương thức). Mỗi thuộc tính có một loại. Mỗi phương thức có một chữ ký. Tên lớp là thông tin bắt buộc duy nhất.

Tên class:

* Tên của lớp xuất hiện trong phân vùng đầu tiên.

Thuộc tính class:

* Các thuộc tính được hiển thị trong phân vùng thứ hai.
* Thuộc tính được hiển thị sau dấu hai chấm.
* Thuộc tính map vào các biến thành viên (thành viên dữ liệu) trong code.

Phương thức:

* Phương thức được hiển thị trong phân vùng thứ ba. Chúng là các dịch vụ mà class cung cấp.
* Kiểu trả về của một phương thức được hiển thị sau dấu hai chấm ở cuối chữ ký phương thức.
* Kiểu trả về của các tham số phương thức được hiển thị sau dấu hai chấm theo tên tham số. 

Sơ đồ hoạt động vào các phương thức lớp trong mã

![](https://images.viblo.asia/ed4d6ef5-786a-48db-9fbf-7c8a3356f27f.png)

Các dấu (+) , (-) và (#) tương ứng với các thuộc tính  (public), (private) và (proteted).

**Định hướng tham số**

Mỗi tham số trong một hoạt động (phương thức) có thể được ký hiệu là vào, ra hoặc vào trong đó chỉ định hướng của nó đối với người gọi. Hướng này được hiển thị trước tên tham số.
![](https://images.viblo.asia/a4951043-beb1-4a9b-8594-7117d298df1c.png)

**Cách thể hiện sơ đồ class**

Tùy thuộc vào bạn muốn thể hiên điều gì và nhấn mạnh vào vấn đề gì thì bạn có thể trình diễn hoặc kết hợp một trong cách sơ đồ bên dưới đây:![](https://images.viblo.asia/c6ce7b16-9bc6-47b5-a616-3804fc2c03cc.png)

* Conceptual: đại diện cho các khái niệm trong miền.
* Specification: trọng tâm là các giao diện của Kiểu dữ liệu trừu tượng (ADTs) trong phần mềm.
* Implementation: mô tả cách các calss sẽ thực hiện giao diện của nó.

Trong triển khai sơ đồ class thì tên class thứ duy nhất ta không được bỏ.

**Mối quan hệ giữa các class**

UML không phải chỉ là những hình ảnh đẹp. Nếu được sử dụng một cách chính xác, UML truyền tải chính xác cách thức code được triển khai từ các sơ đồ. Nếu được giải thích chính xác, code được triển khai sẽ phản ánh chính xác ý định của người thiết kế. Bạn có thể mô tả ý nghĩa của từng mối quan hệ liên quan đến ngôn ngữ lập trình mục tiêu của bạn được hiển thị trong hình bên dưới không?

![](https://images.viblo.asia/51f0c675-32a1-434b-a1ca-9ce32d339199.png)


Nếu bạn chưa thể nhận ra chúng, không có vấn đề gì trong phần này nhằm giúp bạn hiểu các mối quan hệ của lớp UML. Một lớp có thể tham gia vào một hoặc nhiều mối quan hệ với các lớp khác. Một mối quan hệ có thể là một trong các loại sau:

**Association**

Association là sự liên kết giữa 2 class khi mà không cái nào  sở hữu cái nào. Vòng đời các thể hiện của 2 class thì độc lập nhau và không có mối quan hệ sở hữu nào trong biểu diễn này.

![](https://images.viblo.asia/602f35ba-5b28-499b-a2af-bce9ebfacc8f.png)


**Inheritance (or Generalization)**

Còn có tên khác là:

* Quan hệ tổng quát hóa
* Quan hệ khái quát hóa
* Quan hệ kế thừa
Đối tượng cụ thể (concrete) sẽ kế thừa các thuộc tính và phương thức của đối tượng tổng quát (general).

Ký hiệu: A is-a B

![](https://images.viblo.asia/86eb19f5-5b5d-4fe0-830a-e567e3857286.png)


Đọc là :

* A là tổng quát của B, B là chi tiết của A
* B là trường hợp đặc biệt của A
* A là cha của B, B là con của A

**Realization**

Realization là một mối quan hệ giữa lớp kế hoạch chi tiết và đối tượng chứa các chi tiết mức độ thực hiện tương ứng của nó. Đối tượng này được cho là nhận ra lớp kế hoạch chi tiết. Nói cách khác, bạn có thể hiểu đây là mối quan hệ giữa *interface*  và lớp *implementing* .

![](https://images.viblo.asia/cf70c369-96ef-4abc-9ae6-12e63166ffed.png)


**Dependency**

Một đối tượng của một classA  có thể sử dụng một đối tượng của một classB khác trong  một phương thức của classA. Nếu đối tượng (classA) không được lưu trữ trong bất kỳ trường nào (của classB), thì điều này được mô hình hóa như một mối quan hệ phụ thuộc.  Ta nói classA phụ thuộc vào classB. 

![](https://images.viblo.asia/9ee7630e-0e47-4891-b7da-ebf7dbb64e8a.png)


**Aggregation**

* ClassA và ClassB có quan hệ *Association* với nhau
* Object của ClassA có chứa object của ClassB
* Object của ClassA và Object của ClassB có vòng đời riêng biệt. Nghĩa là A bị hủy thì B sẽ không bị hủy theo. 
* Còn gọi là : Whole A – Part B . Nghĩa là A được tạo từ nhiều B kết hợp lại , và B có thể tạo ra độc lập , không cần phải tạo ra A , B có thể cùng thuộc 1 whole khác A.

![](https://images.viblo.asia/f6167440-33e2-4adb-a335-dd23e669ec1a.png)

**Composition**

* ClassA và ClassB có quan hệ *Association* với nhau
* Còn gọi là Whole A – Part B . Nghĩa là A được tạo từ nhiều B kết hợp lại , nhưng B không thể đứng 1 mình được , B chỉ là thuộc A mà thôi không thể cùng thuộc Whole khác được.
* Object của Class A có chứa object của ClassB. Nếu A bị hủy thì B sẽ không tồn tại. ngược lại, B bị hủy thì se không ảnh hưởng đến A


![](https://images.viblo.asia/5cb14ed6-c506-4f5f-9047-4d1675ed55fa.png)

nguồn : https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-class-diagram-tutorial/