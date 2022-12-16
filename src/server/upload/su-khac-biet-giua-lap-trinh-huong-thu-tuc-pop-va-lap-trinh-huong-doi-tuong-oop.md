**Lập trình hướng thủ tục (POP)** và **Lập trình hướng đối tượng (OOP)** đều là phương pháp lập trình, sử dụng ngôn ngữ cấp cao. Một chương trình có thể được viết bằng cả hai ngôn ngữ, nhưng nếu tác vụ rất phức tạp, **OOP** hoạt động tốt so với **POP**. Trong **POP**, **'data security'** có nguy cơ khi dữ liệu di chuyển tự do trong chương trình, cũng như, **‘code reusability'** không đạt được, khiến cho việc lập trình trở nên dài và khó hiểu. Các chương trình lớn dẫn đến nhiều lỗi hơn và nó làm tăng thời gian gỡ lỗi.

Tất cả những sai sót này dẫn đến một cách tiếp cận mới, cụ thể là **lập trình hướng đối tượng**. Trong **lập trình hướng đối tượng**, mối quan tâm chính được đưa ra về **'data security '** nó liên kết dữ liệu chặt chẽ với các chức năng đã được xây dựng từ trước.

OOP cũng giải quyết vấn đề về **‘code reusability'**, vì nếu một lớp được tạo, nhiều thể hiện (đối tượng) của nó có thể được sử dụng để tái sử dụng các thành viên và các hàm thành viên được xác định bởi một lớp.

![](https://images.viblo.asia/f5c7ffb0-1352-4aac-ac55-7f62b5b0f759.jpg)


## Biểu đồ so sánh giữa OOP và POP


| CƠ SỞ ĐỂ SO SÁNH | POP | OOP |
| -------- | -------- | -------- |
| Căn bản     | Thủ tục / Cấu trúc định hướng.     | Hướng đối tượng.     |
| Hướng tiếp cận     | Từ trên xuống     | Từ dưới lên     |
| Nền tảng     |Trọng tâm chính là "làm thế nào để hoàn thành nhiệm vụ" tức là về thủ tục hoặc cấu trúc của một chương trình.    | Trọng tâm chính là "bảo mật dữ liệu". Do đó, chỉ các đối tượng được phép truy cập các thực thể của một lớp.     |
| Division     | Chương trình lớn được chia thành các đơn vị gọi là chức năng.     | Toàn bộ chương trình được chia thành các đối tượng.     |
| Chế độ truy cập thực thể     | Không có specifier truy cập.     | Có tình xác định truy cập là "public", "private", "protected".|
|Overloading or Polymorphism    | Neither it overload functions nor operators.     | It overloads functions, constructors, and operators.    |
| Thừa kế  | Không hỗ trợ thừa kế     |Thừa kế được hỗ trợ ở ba trạng thái "public", "private", "protected"      |
| Bảo mật    |Không có cách ẩn dữ liệu thích hợp, vì vậy dữ liệu không an toàn     | Dữ liệu được ẩn trong ba chế độ"public", "private", "protected" do đó bảo mật dữ liệu tăng lên.     |
|Chia sẻ dữ liệu     | Dữ liệu toàn hệ thống được chia sẻ giữa các chức năng trong chương trình.     | Dữ liệu được chia sẻ giữa các đối tượng thông qua các chức năng.     |
| Function và Class   | Không có khái niệm về Function và Class     | Các lớp hoặc hàm có thể trở giao tiếp với nhau với từ khóa. (tùy các ngôn ngữ khác nhau thì từ khóa sẽ khác nhau)     |
|Virtual classes hoặc virtual function     | Không có khái niệm về lớp ảo     | Khái niệm về chức năng ảo xuất hiện trong quá trình kế thừa.    |
| Các ngôn ngữ thường sử dụng     | TC, VB, GIỚI THIỆU, Pascal     | C ++, JAVA, VB.NET, C # .NET, Ruby,...     |

##  Định nghĩa lập trình hướng đối tượng (OOP)

Mối quan tâm chính của **OOP** là làm sao để che giấu dữ liệu khỏi các chức năng không phải là đối tượng của lớp, đó là cách nó làm việc với các dữ liệu quan trọng. Dữ liệu được liên kết chặt chẽ với các function của một lớp, hoạt động trên nó. Nó không cho phép bất kỳ **non-member function** nào sửa đổi dữ liệu bên trong nó. Các đối tượng tương tác với nhau thông qua các **member function** để truy cập dữ liệu của của hệ thống.

**OOP** được phát triển dựa trên khái niệm cơ bản về đối tượng, các lớp, dữ liệu mã hóa hoặc dữ liệu trừu tượng, tính kế thừa, và tính đa hình hoặc overload. Trong **OOP**, các chương trình có thể được chia thành các mô-đun bằng cách phân vùng dữ liệu theo các chức năng, có thể được sử dụng thêm làm mẫu để tạo các bản sao mới của mô-đun, nếu cần. Do đó, đây là một cách tiếp cận tạo điều kiện thuận lợi trong việc mô đun hóa các chương trình bằng cách xây dựng vùng nhớ được phân vùng cho dữ liệu và chức năng.

![](https://images.viblo.asia/a731bb98-3a69-40d9-b913-aea02a369725.PNG)

### Khái niệm hướng đối tượng

* **Đối tượng** : Nó được coi là một thể hiện của một lớp.
* **Lớp** : Nó là một tập hợp các đối tượng cùng loại. Một bộ dữ liệu và mã hoàn chỉnh của một đối tượng tạo ra một kiểu dữ liệu do người dùng định nghĩa bằng cách sử dụng một lớp.
* **Trừu tượng hóa dữ liệu và đóng gói :** Trừu tượng hóa chính là phương pháp ẩn chi tiết và thể hiện các tính năng thiết yếu. Đóng gói là một phương pháp gom dữ liệu và chức năng thành một đơn vị.
* **Kế thừa** : Kế thừa là một kỹ thuật thu nhận các tính năng của các đối tượng từ một lớp này sang các đối tượng lớp khác. Nói cách khác, nó giúp tạo ra một lớp mới từ lớp hiện có.
* **Đa hình** : Đa hình cung cấp một phương pháp tạo nhiều dạng của hàm bằng cách sử dụng một tên hàm duy nhất.
* **Liên kết động** : Nó xác định rằng mã được liên kết với một thủ tục cụ thể không được biết cho đến thời điểm nó được gọi trong thời gian chạy chương trình.
* **Message passing:** Khái niệm OOP  cho phép tương tác giữa các lớp khác nhau bằng cách truyền và nhận dự liệu.

## Định nghĩa lập trình hướng thủ tục (POP)

**POP** là một cách lập trình thông thường. Lập trình thủ tục là nơi tập trung chính vào việc hoàn thành nhiệm vụ theo thứ tự tuần tự. Lưu đồ tổ chức luồng điều khiển của chương trình. Nếu chương trình được mở rộng, nó được cấu trúc trong một số đơn vị nhỏ gọi là hàm, chia sẻ dữ liệu toàn hệ thống. Ở đây, mối quan tâm về bảo mật dữ liệu phát sinh, vì có một sự thay đổi ngoài mong muốn trong chương trình bởi các chức năng được phát triển thêm.

### Đặc điểm POP
* Trong khi thiết kế một chương trình, POP tuân theo cách tiếp cận lập trình từ trên xuống.
* Đa số các chức năng cho phép dữ liệu toàn hệ thống được chia sẻ. 
* Nó cũng chia các chương trình lớn hơn thành các phần nhỏ hơn được gọi là các hàm.
* Nó cho phép di chuyển dữ liệu tự do xung quanh hệ thống.
* Dữ liệu được chuyển đổi bởi các chức năng từ dạng này sang dạng khác.

## Sự khác biệt chính giữa OOP và POP

1. POP là lập trình hướng thủ tục trong khi OOP là lập trình hướng đối tượng.
2. Trọng tâm chính của **POP** là về cách thức thực hiện nhiệm vụ của hệ thống, nó tuân theo biểu đồ dòng chảy để hoàn thành nhiệm vụ. Trọng tâm chính của **OOP** là bảo mật dữ liệu vì chỉ các đối tượng của một lớp mới được phép truy cập các thuộc tính hoặc chức năng của một lớp.
3. Các chức năng là các đơn vị nhỏ của các chương trình lớn hoặc một chương trình con thực thi để hoàn thành nhiệm vụ chính. Ngược lại, các thuộc tính và hàm **OOP** của lớp được chia cho các đối tượng .
4. Trong **POP**, không có chế độ truy cập cụ thể để truy cập các thuộc tính hoặc chức năng trong chương trình. Ngược lại, trong **OOP** có ba chế độ truy cập,  "public", "private", "protected" được sử dụng như một phương thức truy cập để truy cập các thuộc tính hoặc chức năng.
5. **POP** không hỗ trợ khái niệm  **Overloading/polymorphism**. Ngược lại, **OOP** hỗ trợ **Quá tải / Đa hình**, nghĩa là sử dụng cùng tên hàm để thực hiện các chức năng khác nhau. Chúng ta có thể **Overload** các hàm, hàm tạo và toán tử trong **OOP**.
6. Không có khái niệm thừa kế trong **POP** trong khi đó, **OOP** hỗ trợ kế thừa cho phép sử dụng thuộc tính và chức năng của lớp khác bằng cách kế thừa nó.
7. **POP** kém an toàn hơn so với **OOP** vì trong **OOP**, bộ chỉ định truy cập giới hạn quyền truy cập vào các thuộc tính hoặc chức năng làm tăng tính bảo mật.
8. Trong **POP** nếu một số dữ liệu được chia sẻ giữa tất cả các chức năng trong chương trình, nó được khai báo trên toàn hệ thống bên ngoài tất cả các chức năng. Trong khi trong **OOP**, data-member của lớp có thể được truy cập thông qua các member-function của lớp.
9. Không có khái niệm về các lớp ảo trong **POP** trong khi trong **OOP**, các hàm ảo hỗ trợ đa hình.

## Ưu điểm của các kiểu lập trình.
### POP (Lập trình hướng thủ tục)
* Cung cấp khả năng tái sử dụng cùng một mã tại nhiều nơi khác nhau.
* Tạo điều kiện trong việc theo dõi dòng chương trình.
* Có khả năng xây dựng các mô-đun.

### OOP (Lập trình hướng đối tượng)
* Các đối tượng giúp phân vùng nhiệm vụ trong dự án.
* Chương trình an toàn có thể được xây dựng bằng cách ẩn dữ liệu.
* Nó có khả năng lập biểu đồ cho các đối tượng.
* Cho phép phân loại các đối tượng thành các lớp khác nhau.
* Hệ thống hướng đối tượng có thể được nâng cấp dễ dàng.
* Mã dự phòng có thể được loại bỏ bằng cách sử dụng kế thừa.
* Mã có thể được mở rộng bằng cách sử dụng lại.
* Mô-đun lớn hơn có thể đạt được.
* Trừu tượng dữ liệu làm tăng độ tin cậy.
* Linh hoạt do các khái niệm ràng buộc năng động.
* Tách riêng các đặc điểm kỹ thuật cần thiết từ việc thực hiện bằng cách sử dụng ẩn thông tin.

## Kết luận
Các lỗ hổng của **POP** phát sinh nhu cầu **OOP**. **OOP** ra đời khắc phục các sai sót của **POP** bằng cách đưa ra khái niệm về **đối tượng** và các **lớp** . Nó tăng cường bảo mật dữ liệu và tự động khởi tạo & clear-up các **đối tượng**. **OOP** cho phép tạo nhiều phiên bản của đối tượng mà không có bất kỳ sự can thiệp nào.

Dưới đây là những chia sẻ của mình về 2 phương pháp lập trình, hi vọng qua bài viết này các bạn sẽ hiểu hơn về OOP và POP. Cảm ơn các bạn đã theo dõi bài chia sẻ.

## Tài liệu tham khảo:
*  https://techdifferences.com/difference-between-oop-and-pop.html
*  https://stackify.com/oop-concept-polymorphism/
*  http://www.hexainclude.com/procedure-oriented-programming-language/