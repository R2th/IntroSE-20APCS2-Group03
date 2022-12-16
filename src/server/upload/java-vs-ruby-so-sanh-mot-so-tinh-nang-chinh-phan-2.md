Ở phần 1 kỳ trước, chúng ta đã so sánh một số tính năng khác nhau cơ bản giữa Java và Ruby. Và ở kỳ này, chúng ta sẽ cùng nhau thảo luận về những điểm tương đồng cũng như khác biệt giữa 2 ngôn ngữ này trên một mẫu hình lập trình được phần lớn lập trình viên sử dụng. Đó chính là **Lập Trình Hướng Đối Tượng (Object Oriented Programming hay OOP)**.
### **1. Đối tượng (Object)**<br>
* Trong Ruby, mọi thứ đều được xem như là một đối tượng, từ các biến các con số cho tới các phương thức các lớp. Chúng ta có thể dùng phương thức **.class** để lấy ra tên lớp của đối tượng và sử dụng **.ancestors** để kiểm tra xem lớp đó kế thừa từ những lớp nào.
```
"string".class
 > String
 String.ancestors
> [String, Comparable, Object, Kernel, BasicObject]

1.class
> Integer
Integer.ancestors
> [Integer, Numeric, Comparable, Object, Kernel, BasicObject]

Class.class
> Class
Module.class
> Class
Class.ancestors
> [Class, Module, Object, Kernel, BasicObject]

BasicOject.class
> class
```
* Khi đó trong Java, chỉ có các lớp mới có tồn tại khái niệm đối tượng. Một đối tượng được khởi tạo thông qua từ khóa **new** theo sau đó là constructer của lớp tương ứng.
```
Scanner scanner = new Scanner();
```
### **2. Cách định nghĩa 1 lớp (Class Definition)**<br>
* Ruby sử dụng cặp từ khóa **class ... end** để định nghĩa 1 khối lớp hay phương thức. Theo sau từ khóa class sẽ là tên của lớp tương ứng với ký tự đầu được viết in hoa.
```
class User
    # body
end
```
* Java định nghĩa lớp bằng cách sử dụng từ khóa **class** theo sau là tên lớp cũng được viết hoa ký tự đầu tiên. Thân lớp được gói gọn trong 1 cặp ngoặc { }. Đặc biệt trong Java theo kèm với lớp còn có thể có thêm các access modifier như **public**, **protected** hay **private**.
```
public class User{
    # body
}
```
### **3. Cách định nghĩa 1 phương thức (Method Definition)**<br>
Theo mặc định, các phương thức trong Ruby là public. Như Java, các phương thức Ruby cũng có thể được chỉ định public, private, hay protected. Trong Ruby, các phương thức có thể trả về một giá trị, nhưng loại giá trị trả về không được chỉ định trong định nghĩa phương thức. Trong khi đó ở Java, các phương thức có quyền truy cập gói theo mặc định và yêu cầu kiểu trả về.
* Ruby:
```
class User
    def public_method params 
        puts params
    end
    
    protected
    
    def protected_method params
        params
    end
    
    private
    
    def private_method
    
    end
end
```
* Java:
```
public class User {
    public void public_method(String params) {
        System.out.println(params);
    }
    
    protected int protected_method(int params) {
        return params;
    }
    
    private void private_method() {
    
    }
}
```
Đặc biệt phương thức trong Ruby khi khai báo hay được gọi thì đều có thể lược bỏ bớt cặp dấu ngoặc đơn ( ). Ngoài ra mỗi phương thức sẽ mặc định trả về giá trị ở dòng cuối cùng mà không cần phải khai báo từ khóa **return**.
```
class Hello
    def hello name
       "Hello " + name
   end
end

helloObj = Hello.new
helloObj.hello("John") => Hello John
helloObj.hello "John"  => Hello John
```
### **4. Khai báo Constructor và Khởi tạo lớp (Class Instantiation)**<br>
Java sẽ sử dụng lại tên của chính lớp đó để khai báo constructor trong khi Ruby hỗ trợ phương thức **initialize**. Để khởi tạo đối tượng của lớp, cả Java và Ruby đều sử dụng từ khóa **new**. Từ khóa **new** có thể được sử dụng với bất kỳ phương thức khởi tạo nào được định nghĩa trong lớp. Trong Java, nhiều hơn một phương thức khởi tạo có thể được khai báo, nhưng một lớp trong Ruby chỉ có thể có một phương thức khởi tạo. Ruby không tạo ra Exception nếu nhiều hơn một phương thức khởi tạo được khai báo, mà sẽ sử dụng phương thức khởi tạo cuối cùng.
* Java:
```
public class Hello {
    String defaultMsg;
    
    public Hello(String msg) {
        defaultMsg = msg;
    }
}

Hello hello = new Hello();
```
* Ruby:
```
class Hello
   @defaultMsg
   
   def initialize msg
       @defaultMsg = msg
   end
end

hello = Hello.new "Hello Ruby"
```
### **5. Tính kế thừa (Inheritance)**<br>
Cả Java và Ruby đều có cung cấp khả năng kế thừa từ một lớp khác. Trong Java, một lớp được kế thừa bằng cách sử dụng từ khóa **extends**. Còn trong Ruby, một lớp có thể kế thừa bằng cách sử dụng dấu " < ". Trong cả Ruby và Java, một lớp chỉ có thể kế thừa một lớp khác. Java cung cấp đa kế thừa với các giao diện (interfaces) bao gồm các phương thức trừu tượng có thể được thực hiện bởi một lớp kế thừa các giao diện đó. Ruby cung cấp đa kế thừa với các mô-đun (module) và mixins.

Các mô-đun tương tự như các lớp trong đó chúng bao gồm các biến và phương thức. Nhưng, các mô-đun khác với các lớp trong đó các mô-đun không thể tạo một instance và mô-đun không thể được phân lớp. Một mô-đun được định nghĩa với mô-đun từ khóa **module**. Khi một mô-đun được bao gồm trong một lớp khác bằng cách sử dụng từ khóa **include**, các biến, phương thức và các lớp trong mô-đun sẽ có sẵn cho lớp bao gồm nó.
```1
public class LinkedHashSet extends HashSet{}

class Catalog < ActiveRecord::Base

end

module Catalog
    PI=3.1419
    @journal

    def setJournal(journal)
        @journal=journal
    end
end
```
### **Tham khảo**<br>
https://www.developer.com/open/article.php/3716356/Java-vs-Ruby-a-Comparison-of-the-Key-Elements.htm