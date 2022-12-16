**S.O.L.I.D** là một từ viết tắt cho **năm nguyên tắc thiết kế hướng đối tượng (OOD)**.

Những nguyên tắc này, khi kết hợp với nhau, giúp cho một lập trình viên dễ dàng để phát triển phần mềm dễ bảo trì và mở rộng.
Chúng cũng giúp các nhà phát triển dễ dàng tránh các lỗi mã, dễ dàng refactor code, và cũng là một phần của sự phát triển phần
mềm nhanh hoặc thích ứng trên nhiều nền tảng.

Trong quá trình học, hầu như các bạn sinh viên đều được học một số khái niệm OOP cơ bản như sau:

Abstraction (Tính trừu tượng)
Encapsulation (Tính bao đóng)
Inheritance (Tính kế thừa)
Polymophirsm (Tính đa hình)
Những nguyên lý mình giới thiệu hôm nay là những nguyên lý thiết kế trong OOP. Một project áp dụng những nguyên lý này sẽ có 
code dễ đọc, dễ test, rõ ràng hơn.Và việc quan trọng nhất là việc maintainace code sẽ dễ hơn rất nhiều.
## **S.O.L.I.D là viết tắt của:**
Khi mở rộng các từ viết tắt có vẻ phức tạp, nhưng chúng khá đơn giản để nắm bắt.

* S - Single-responsiblity principle
* O - Open-closed principle
* L - Liskov substitution principle
* I - Interface segregation principle
* D - Dependency Inversion Principle

### 1. Single-responsibility Principle
S.R.P - nguyên tắc này nói rằng:
Một class nên có một và chỉ một lý do để thay đổi, có nghĩa là một class chỉ nên có một công việc.
Ví dụ: chúng tôi có hai class Person và Account. Cả hai đều có trách nhiệm duy nhất để lưu trữ thông tin cụ thể của họ. 
Nếu chúng ta muốn thay đổi trạng thái của Person thì chúng ta không cần phải thay đổi Account class và ngược lại.

    public class Person
    {
        private Long personId;
        private String firstName;
        private String lastName;
        private String age;
        private List<Account> accounts;
    }
    
    public class Account
    {
        private Long guid;
        private String accountNumber;
        private String accountName;
        private String status;
        private String type;
    }
### 2. Open-closed Principle
Đây là quy tắc quan trọng thứ hai mà chúng ta nên lưu ý khi thiết kế ứng dụng của mình.
Các đối tượng hoặc thực thể nên được mở để mở rộng, nhưng đóng để sửa đổi. Điều này đơn giản có nghĩa là một lớp nên dễ dàng mở rộng mà không sửa đổi chính lớp đó.

Nếu chúng ta nhìn vào bất kỳ framework như struts hoặc spring, chúng ta sẽ thấy rằng chúng ta không thể thay đổi logic cốt lõi của chúng và xử lý yêu cầu, nhưng chúng ta sửa đổi luồng ứng dụng mong muốn chỉ bằng cách mở rộng một số lớp và cắm chúng vào các tệp cấu hình.

Ví dụ framework Spring có lớp DispatcherServlet. Lớp này hoạt động như bộ điều khiển phía trước cho các ứng dụng web dựa trên chuỗi. Để sử dụng lớp này, chúng tôi không bắt buộc phải sửa đổi lớp này. Tất cả những gì chúng ta cần là chuyển các tham số khởi tạo và chúng ta có thể mở rộng chức năng của nó theo cách chúng ta muốn.

### 3. Liskov substitution principle
Nguyên tắc này là một biến thể của nguyên tắc **Open-closed Principle** được thảo luận trước đó. Nội dung nguyên lí: Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.
### 4. Interface segregation principle
Nguyên tắc này là một trong những yêu thích của tôi. Nó được áp dụng cho các interfaces như là nguyên tắc trách nhiệm duy nhất giữ cho các lớp. Nội dung nguyên lí:
Một clients không bao giờ bị buộc phải thực hiện một interface mà nó không sử dụng hoặc các client không nên bị buộc phải phụ thuộc vào các phương thức mà họ không sử dụng.
### 5. Dependency Inversion principle
Nguyên lý cuối cùng, tương ứng với chữ D trong SOLID. Nội dung nguyên lý:
1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. 
Cả 2 nên phụ thuộc vào abstraction.
2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.
( Các class giao tiếp với nhau thông qua interface, 
không phải thông qua implementation.)


> Đây là năm nguyên tắc thiết kế lớp, còn được gọi là nguyên tắc SOLID, mà làm cho các thực hành tốt nhất để được theo sau để thiết kế các lớp ứng dụng. Thành thật mà nói, S.O.L.I.D có vẻ ít được sử dụng với các lập trình viên mới vào nghề, nhưng với việc sử dụng liên tục và tuân thủ các nguyên tắc của nó, nó trở thành một phần của bạn và giúp cho code của bạn mà có thể dễ dàng mở rộng, sửa đổi, kiểm tra và tái cấu trúc mà không gặp bất kỳ vấn đề gì.

# Tài liệu tham khảo
1. https://howtodoinjava.com/best-practices/5-class-design-principles-solid-in-java/
2. https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#toc-single-responsibility-principle