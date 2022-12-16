## Tính đóng gói (Encapsulation)
* được định nghĩa là "tiến trình đóng gói một hoặc nhiều mục bên trong một gói logic hoặc vật lý". Tính đóng gói, trong phương pháp lập trình hướng đối tượng, ngăn cản việc truy cập tới chi tiết của trình triển khai (Implementation Detail).
* Nó được thể hiển qua các access modifier, trong c# có 5 kiểu access modifiers:
1. private
2. protected
3. internal
4. protected internal
5. public.

Bảng minh họa dưới đây cho bạn cái nhìn tổng quan về cách sử dụng các access modifier.
![](https://images.viblo.asia/14b83b4a-aa66-452c-86e9-34b963de0d01.png)

* ptivate: 	Truy cập bị hạn chế trong phạm vi của định nghĩa Class. Đây là loại phạm vi truy cập mặc định nếu không được chính thức chỉ định.
* protected:	Truy cập bị giới hạn trong phạm vi định nghĩa của Class và bất kỳ các class con thừa kế từ class này.
* public: Không có bất kỳ giới hạn nào khi truy cập vào các thành viên công khai (public)
* internal: Truy cập bị giới hạn trong phạm vi Assembly của dự án hiện tại, nếu trong cùng assembly của dự án thì nó giống hệt như public. Bạn có thể test phạm vi sử dụng của nó bằng  cách sau:
    1. Tạo 1 project với loại Library Class
    2. Tạo class có chưa internal
    3. Build project để tạo file .dll
    4. Tạo 1 project mới với dạng bất ký như console, asp.net,...
    5. add file dll vừa tạo vào dự án này và bạn có thể thấy các method loại internal sẽ không thể truy cập ở đây.
* protected internal: Truy cập bị giới hạn trong phạm vi Assembly hiện tại và trong class định nghĩa hoặc các class con, nó đơn giản chỉ là sự kết hợp của protected và internal 

## Tính kế thừa
* Tính kế thừa (Inheritance) cho phép chúng ta định nghĩa một lớp trong điều kiện một lớp khác, mà làm cho nó dễ dàng hơn để tạo và duy trì một ứng dụng. Điều này cũng cung cấp một cơ hội để tái sử dụng tính năng code và thời gian thực thi nhanh hơn.
* Thừa kế trong c# được sử dụng với dấu `:`
* Khi tạo một lớp, thay vì viết toàn bộ các thành viên dữ liệu và các hàm thành viên mới, lập trình viên có thể nên kế thừa các thành viên của một lớp đang tồn tại. Lớp đang tồn tại này được gọi là Base Class - lớp cơ sở, và lớp mới được xem như là Derived Class – lớp thừa kế.
* C# không hỗ trợ đa kế thừa. Tuy nhiên, bạn có thể sử dụng Interface để triển khai đa kế thừa. Vậy interface là gì và cách sử dụng nó như thé nào?
    1. Interface được định nghĩa như là một giao ước có tính chất cú pháp (syntactical contract) mà tất cả lớp kế thừa Interface đó nên theo. 
    2. Các tính chất đặc biệt của interface:
        * bắt buộc các method trong interface là public và abstract (abstract là gì sẽ nói ở dưới)
        * Không thể khai báo các field trong này, ví dụ như khai báo các biến `public int a;`, v.v.v..
        * Các method không có than hàm
        * không có contructor (hàm tạo)
        * 1 class có thể implement từ nhiều interface.
        *  ở lớp thực thi interface phải chứa đầy đủ các method có trong interdace.

## Tính trừu tượng
* Tính trừu tượng là một tiến trình ẩn các chi tiết trình triển khai và chỉ hiển thị tính năng tới người dùng. Tính trừu tượng cho phép bạn loại bỏ tính chất phức tạp của đối tượng bằng cách chỉ đưa ra các thuộc tính và phương thức cần thiết của đối tượng trong lập trình.

* Tính trừu tượng và tính đóng gói là hai đặc điểm có liên quan với nhau trong lập trình hướng đối tượng. Tính trừu tượng cho phép tạo các thông tin liên quan có thể nhìn thấy và tính đóng gói cho lập trình viên khả năng triển khai độ trừu tượng đã được kế thừa.

* Trong c# tính trừu tượng thường để thể hiện qua từ khóa abstract và interface, vậy 1 class abstract thì khác gì với interface?
    * Trong class abstract có thể khai báo các field.
    * 1 class chỉ có thể thừa kế 1 class abstract
    * Có constructor
    * Các method có thể chứa các access modifier (piblic, private, ...) không bắt buộn như interface.
    * Ở lớp thừa kế có thể có hoặc không các hàm ở lớp cơ sở.
    Ngoài ra:
    * bạn không thể tạo một Instance (sự thể hiện) của một lớp abstract.
    * bạn không thể khai báo một phương thức abstract ở bên ngoài một lớp abstract
    * Khi một lớp được khai báo là sealed, nó không thể được kế thừa, các lớp abstract không thể được khai báo là sealed.

## Tính đa hình
* Từ polymorphism (tính đa hình) nghĩa là có nhiều hình thái. Trong lập trình hướng đối tượng, tính đa hình thường được diễn đạt như là "một Interface, nhiều hàm".
Trong c#, tính đa hình chia làm 2 loại là đa hình static và đa hình dynamic (2 từ khóa overloading và overide).
### Đa hình static
* Kỹ thuật liên kết một hàm với một đối tượng trong thời gian biên dịch được gọi là Early Binding. Nó cũng được gọi là Static Binding. C# cung cấp hai kỹ thuật để triển khai đa hình tĩnh. Chúng là:

    * Nạp chồng hàm (Function overloading)
    * Nạp chồng toán tử (Operator overloading)

1. Nạp chồng hàm: Có thể có nhiều tên hàm giống nhau trong 1 class, nhưng với tham số truyền vào có kiểu hoặc số số lượng phải khác nhau. Trong c# không thể nạp chồng hmaf chỉ với kiểu trả về của hàm khác nhau.
2. Nạp chồng toán tử: Bạn có thể tái định nghĩa lại các phép toán `+ - * =`v.v.v , vì thế chúng ta có thể tự định nghĩa 1 phép toán cho mình như các phép tính đối với 2 ma trận, ví dụ phép toán cộng 2 instance của 1 class:
    ```
    public static Box operator+ (Box b, Box c)
    {
       Box box = new Box();
       box.chieu_dai = b.chieu_dai + c.chieu_dai;
       box.chieu_rong = b.chieu_rong + c.chieu_rong;
       box.chieu_cao = b.chieu_cao + c.chieu_cao;
       return box;
    }
    ```
### Đa hình dynamic
* Đa hình dynamic trong C# được triển khai bởi các lớp abstract và các hàm virtual.
vậy hàm virtual thì khác và giống gì với hàm abstract?
    * Giống:
        1. Đều là những hàm ở base class, để các hàm ở lớp thừa kế overide.
        2. Nếu không khai báo virtural hoặc abstract thì sẽ không overide được.
    * Khác:

    | abstract | vitural |
    | -------- | -------- |
    | không có thân hàm    | Có thân hàm     |
    | bắt buộc phải được overide ở lớp thừa kế    | Không bắt buộc overide    |
    | phải nằm trong abstract class    | |


tài liệu tham khảo: https://www.tutorialspoint.com/csharp/