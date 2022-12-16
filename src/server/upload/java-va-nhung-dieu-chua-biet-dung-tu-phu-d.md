# JVM vs JRE vs JDK
![](https://images.viblo.asia/9c99662e-aed9-468c-970e-6b7b447086ec.png)
## Java Virtual Machine (JVM)
JVM là máy ảo có thể thực thi các Java bytecode. Mỗi một Java source file được biên dịch ra một bytecode file. Java được thiết kế để các chương trình ứng dụng có thể chạy trên bất kỳ nền tảng nào mà không cần phải viết lại chương trình nhờ vào Java JVM. Cũng chính vì vậy mà các ứng dụng Java còn được gọi là WORA (Write Once Run Anywhere – Viết một lần chạy mọi nơi).
![](https://images.viblo.asia/784514dd-6dda-4785-b5b6-cec56ac7a81a.png)

## Java Runtime Environment (JRE)
JRE là một gói phần mềm (một thực thể vật lý) có chứa các artifacts cần thiết để chạy một chương trình Java. Nó bao gồm JVM cùng với các thư viện lớp Java (rt.jar).

## Java Development Kit (JDK)
JDK là một tập hợp chứa JRE và các công cụ phát triển dành cho các lập trình viên Java, ví dụ JavaDoc, Java Debugger,... JDK dùng để phát triển, biên dịch và thực thi các ứng dụng Java

# Heap & Stack
**Stack** là một vùng nhớ được sử dụng để lưu trữ các tham số và các biến cục bộ của phương thức mỗi khi một phương thức được gọi ra.
**Heap** là một vùng nhớ trong bộ nhớ được sử dụng để lưu trữ các đối tượng khi từ khóa new được gọi ra, các biến static và các biến toàn cục (biến instance).

# Từ khóa Static
Từ khóa static trong Java được sử dụng chính để **quản lý bộ nhớ**. Chúng ta có thể áp dụng từ khóa static với các biến (variable), các phương thức (method), các khối (block), các lớp lồng nhau (nested class).
* Từ khóa static thuộc về lớp chứ không thuộc về instance (thể hiện) của lớp.
* Static method không thể được ghi đè
* Không thể truy cập một biến non-static trong một ngữ cảnh static (static context)

# Các kiểu dữ liệu
## Kiểu Primitive
* boolean là kiểu dữ liệu có bộ nhớ lưu trữ nhỏ nhất, chỉ có 1 bit. Kiểu dữ liệu này được dùng để lưu trữ hai trạng thái true hoặc false Giá trị mặc định là false.
* char là kiểu dữ liệu này có thể dùng để lưu kí tự hoặc số nguyên không âm, có kích thước 2 byte. Giá trị nhỏ nhất là '\u0000' (hoặc 0) và giá trị lớn nhất là '\uffff' (hoặc 65,535).
* byte là kiểu dữ liệu này dùng để lưu số nguyên (âm hoặc dương), có kích thước 1 byte. Giá trị nhỏ nhất là -128 (-2^7) và giá trị lớn nhất là 127 (2^7 -1) Giá trị mặc định là 0.
* short dùng để lưu dữ liệu có kiểu số nguyên, nhưng kích cỡ lớn hơn byte. Bộ nhớ kiểu dữ liệu này là 2 byte. Giá trị nhỏ nhất là -32,768 (-2^15) và giá trị lớn nhất là 32,767 (2^15 -1) Giá trị mặc định là 0.
* int cũng là kiểu dữ liệu dùng để lưu kiểu số nguyên, kích cỡ 4 byte (lớn hơn byte và short). Giá trị nhỏ nhất là - 2,147,483,648.(-2^31) và giá trị lớn nhất là 2,147,483,647 (2^31 -1) Thông thường, int được sử dụng làm kiểu dữ liệu mặc định cho các giá trị nguyên. Giá trị mặc định là 0.
* long là kiểu dữ liệu dùng để lưu số nguyên lớn nhất là Long. Kích cỡ của nó lên đến 8 byte. Giá trị nhỏ nhất là -9,223,372,036,854,775,808.(-2^63) và lớn nhất là 9,223,372,036,854,775,807 (2^63 -1) Kiểu này được sử dụng khi cần một dải giá trị rộng hơn int. Giá trị mặc định là 0L.
* float là kiểu dữ liệu lưu số thực, kích cỡ 4 byte. Giá trị mặc định là 0.0f. Kiểu Float không bao giờ được sử dụng cho các giá trị chính xác như currency.
* double cũng là kiểu dữ liệu để lưu số thực, nhưng kích thước dữ liệu lớn hơn Float. Bộ nhớ của nó là 8 byte. Thông thường, kiểu dữ liệu này được sử dụng làm kiểu mặc định cho các giá trị decimal. Kiểu double cũng không bao giờ được sử dụng cho các giá trị chính xác như currency. Giá trị mặc định là 0.0d.

## Kiểu Non - Primitive
Trong Java tồn tại kiểu biến đối tượng, được tạo bằng cách sử dụng các constructor đã được định nghĩa của các class. Chúng được sử dụng để truy cập các đối tượng. Những biến này được khai báo ở kiểu cụ thể và không thể thay đổi được
Giá trị mặc định của kiểu biến đối tượng là null. Có thể sử dụng biến đối tượng để tham chiếu tới bất kỳ đối tượng nào trong kiểu được khai báo hoặc bất kỳ kiểu tương thích nào.

## Autoboxing / unboxing
Autoboxing là quá trình mà trình biên dịch của Java tự động chuyển đổi giữa kiểu dữ liệu cơ bản (Primitive type) về đối tượng tương ứng với lớp (Wrapper class) của kiểu dữ liệu đó. Ví dụ, trình biên dịch sẽ chuyển đổi kiểu dữ liệu int sang Integer, kiểu double sang Double,… Và ngược lại là unboxing. Đây là tính năng mới của Java 5.

# Overriding vs Overloading
![](https://images.viblo.asia/72a173b5-7f03-4a89-831b-3e5e88735a60.jpg)
* **Overloading (Nạp chồng phương thức)** là một kĩ thuật cho phép trong cùng một class có thể có nhiều phương thức cùng tên nhưng khác nhau về số lượng tham số hoặc kiểu dữ liệu tham số.
* **Overrding (tên đầy đủ là Method Overriding)**, được sử dụng trong trường hợp lớp con kế thừa từ lớp cha và muốn định nghĩa lại một phương thức đã có mặt ở lớp cha. Một lớp cha thông thường có thể có nhiều lớp con kế thừa, tuy nhiên phương thức ở lớp cha có thể phù hợp với lớp con này nhưng không phù hợp với lớp con khác, do đó lớp con cần ghi đè lại phương thức đó cho phù hợp.

# Interface vs Abstract Class
| Đầu mục | Abstract Class | Interface |
| -------- | -------- | -------- |
| Định nghĩa phương thức | Có thể có các phương thức **abstract** và **non-abstract**  | Java < 8, chỉ có thể có phương thức **abstract**. Từ Java 8, có thể thêm **default** và **static methods**. Từ Java 9, có thể thêm **private methods**.  |
| Hỗ trợ đa kế thừa | Không | Có |
| Định nghĩa biến | Có thể có các biến **final, non-final, static** và **non-static** | Chỉ có các biến **static final** |
| Các method đặc biệt | Có thể có phương thức **static**, **main** và **constructor** | Không thể có phương thức **static**, **main** hoặc **constructor**. |
| Khai báo | Từ khóa **abstract** được sử dụng để khai báo lớp trừu tượng | Từ khóa **interface** được sử dụng để khai báo Interface |
| Method body | Có | Không |
| Sử dụng | Sử dụng khi chúng ta chỉ có thể hoàn thành một vài chức năng (method/ function) chuẩn của hệ thống, một vài chức năng còn lại các lớp extends phải hoàn thành. Những tính năng đã hoàn thành này vẫn sử dụng như bình thường, đây là những tính năng chung. | Sử dụng khi bạn muốn tạo dựng một bộ khung chuẩn gồm các chức năng (method/ function) mà tất cả module/ project cần phải có. Các module phải implements tất cả chức năng đã được định nghĩa. |

# Exception
* **Checked Exceptions:** Là một ngoại lệ được kiểm tra và thông báo bởi trình biên dịch tại thời điểm biên dịch, chúng cũng có thể được gọi là ngoại lệ thời gian biên dịch (Compile-time Exceptions). Và lập trình viên không thể lường trước.
* **Unchecked Exceptions:** Là một ngoại lệ không được kiểm tra trong quá trình biên dịch. Chúng cũng được gọi là ngoại lệ thời gian chạy (Runtime Exceptions). Là ngoại lệ có thể tránh được bởi lập trình viên.