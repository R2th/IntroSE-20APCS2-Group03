# A. Introduction

## 1. Java

Java là ngôn ngữ lập trình cấp cao (high level) và là một nền tảng (platform) để chạy các chương trình viết bằng Java.

Java có thể tạo nhiều loại ứng dụng khác nhau:

* Standalone application: ứng dụng độc lập
* Web application: chạy trên server, tạo web động
* Enterprise application: ứng dụng dành cho doanh nghiệp, bank,... bảo mật, chịu tải cao
* Mobile application

Có khoảng 3 tỉ thiết bị chạy Java platform, chứng tỏ Java rất phổ biến hiện nay.

## 2. History

James Gosling và các cộng sự đã tạo ra ngôn ngữ Java, ban đầu có tên là Greentalk, rồi đổi thành Oak (cây sồi). Lúc đầu Java chỉ dùng cho các thiết bị điện tử và nhúng. Đến năm 1995 đổi tên thành Java.

Java trải qua nhiều version khác nhau, bản mới nhất là SE 14.

Java hiện đang được sở hữu bởi Sun Microsystem (thuộc Orable).

## 3. Editions

Có 4 phiên bản chính, dành cho các mục đích khác nhau:

* Java Card: dành cho smartcard như ATM, SIM,...
* Java Micro Edition (ME): phiên bản nhỏ gọn cho mobile, nhúng
* Java Standard Edition (SE): phiên bản tiêu chuẩn, cốt lõi của Java
* Java Enterprise Edition (EE): phiên bản doanh nghiệp, hệ thống lớn

## 4. Features

Một số đặc điểm, tính năng quan trọng và vượt trội của Java có thể kể đến như sau.

**Platform independent**

Độc lập nền tảng là đặc điểm quan trọng nhất của Java. Java biên dịch source code thành bytecode độc lập nền tảng, chạy được bất kì phần cứng, HĐH nào hỗ trợ Java platform.

> Write once, run anywhere - Tiêu chí của Java

**Simple**

Java là ngôn ngữ đơn giản, cú pháp dễ học tương tự C++ nhưng bỏ đi một số tính năng không cần thiết, rườm rà (pointer, operator overloading,...)

Bên cạnh đó, Java còn có GC giúp tự động dọn dẹp, quản lý bộ nhớ mà không cần quản lý thủ công.

**Object oriented**

Java là ngôn ngữ thuần hướng đối tượng (OOP).

**Multi threaded**

Chương trình Java có thể có nhiều thread, nên tốc độ và hiệu suất sẽ tốt hơn.

**Secure**

Java khá an toàn, hạn chế tối đa các vấn đề bảo mật tiềm ẩn. Java bỏ sử dụng pointer, ép kiểu chặt chẽ và cơ chế xác minh code nghiêm ngặt.

Ngoài ra, do chương trình Java chạy trong máy ảo JVM nên lỗi phát sinh dễ dàng kiểm soát, không ảnh hưởng tới hệ thống.

**Robust**

Java mạnh mẽ ở chỗ quản lý bộ nhớ tự động, có cơ chế xử lý ngoại lệ và kiểm tra lỗi nghiêm ngặt.

**Portable**

Bytecode của java có thể mang đi nhiều nền tảng khác nhau mà vẫn hoạt động bình thường, do đó Java có tính khả chuyển (portable).

# B. Java concepts

## 1. Components

**Java platform**

Platform (nền tảng) là một loại phần cứng hoặc phần mềm có thể thực hiện chức năng chạy chương trình.

Như vậy, java platform là nền tảng cho phép chạy các chương trình java trên nó. Java platform gồm compiler, các thư viện và nhiều tools khác hỗ trợ việc chạy chương trình.

**Java Virtual Machine**

JWM là chương trình chuẩn bị môi trường thực thi cho ứng dụng Java. Có thể xem nó như một máy ảo (trừu tượng) để chương trình chạy bên trong nó.

JWM có 4 chức năng:

* Tải bytecode từ file `.class` lên bộ nhớ (class loader)
* Xác minh bytecode hợp lệ (verifier)
* Thông dịch bytecode thành mã máy (interpreter) và thực thi
* Cung cấp môi trường thực thi

**Java Runtime Environment**

JRE gồm JVM, các thư viện chạy và các chương trình hỗ trợ chạy ứng dụng java. Có thể so sánh JRE với .NET framework.

JRE dành cho user muốn chạy các app viết bằng java, nếu không có thì không chạy được.

**Java Development Kit**

JDK bao gồm JRE và các công cụ khác để hỗ trợ lập trình java (compiler, interpreter, docs,...). Khác với JRE là dành cho user, JDK dành cho lập trình viên, để viết ra các chương trình java.

**Garbage Collection**

GC là một thành phần của JVM, có tác dụng kiểm soát và thu gom các vùng nhớ không dùng nữa (không còn được tham chiếu đến) để trả lại cho HĐH, giúp tiết kiệm bộ nhớ,

## 2. IDE

Có khá nhiều IDE hỗ trợ lập trình java, nhưng mình khuyến khích sử dụng Eclipse hoặc IntelliJ IDEA để code. NetBean khá ổn nhưng mình không thích giao diện của nó, ít ra Eclipse còn đẹp hơn.

## 3. Build commands

Tuy mọi IDE đều hỗ trợ build và chạy chương trình java, bạn cũng nên biết cách biên dịch thủ công bằng command line.

```shell
javac Test.java
```

Biên dịch file `Test.java` thành bytecode `Test.class`.

```shell
java Test
```

Thực thi bytecode trong file `Test.class` và chạy chương trình. Lưu ý không cần thêm đuôi `.class` vào tên file.

Chương trình `javac` có trong JDK (cho lập trình viên) và `java` có trong JRE và cả JDK (vì JDK chứa JRE).

## 4. Build tools

Trong dự án java lớn thì có thể sử dụng nhiều thư viện, nhiều framework khác để hỗ trợ. Có những thư viện của java và cả những thư viện bên ngoài. Do đó, cần có các công cụ hỗ trợ build và quản lý các thư viện đó (gọi là dependency), do đó build tools còn được gọi là dependencies manager.

Hai công cụ phổ biến là Maven và Gradle, có thể tìm hiểu thêm.

## 5. Naming convention

Để code java được rõ ràng, thống nhất, nên tuân thủ một số quy ước đặt tên (naming convention) của java. Điều này không bắt buộc, nhưng được khuyến khích để code clean hơn.

Các đối tượng khác nhau trong code có cách đặt tên riêng:

* Tên package: Lower case hoặc snake case `java.util`
* Tên class: Pascal case và là danh từ `MyClass`
* Tên interface: Pascal case và là tính từ `Flyable`
* Tên object: Camel case `obj`, `otherObj`
* Tên biến: Camel case `myName`
* Tên hằng: Upper case `PI_NUMBER`
* Tên method, Camel case, từ đầu tiên là động từ `getName`, `toString`

Java là ngôn ngữ phân biệt hoa thường.
# C. Java basic

## 1. Simple program

Cấu trúc chung của một chương trình java. Khi đi sâu hơn, thì mỗi class chứa trong một file riêng cũng có cấu trúc như thế này.

```App.java
// Chương trình thuộc package nào (chỉ thuộc 1 package)
package package_name;

// Import class vào để sử dụng (có thể import nhiều class)
import java.util.Scanner;  // Import một class
import java.util.*;  // Import toàn bộ package

// Định nghĩa thêm các class khác
class Util {
    ...
}

// Class chính, là public class duy nhất trong file
public class App {
    ...
    // Class chính phải có method main() như sau
    public static void main(String[] args) {
        ...
    }
}
```

Source code lưu trữ trong file `App.java`, mỗi file như vậy đều phải có một `public class` duy nhất, các class khác là phụ và chỉ được khai báo `class`.

Tên `public class` cần trùng với tên file, như ví dụ trên file là `App.java` thì tên class chính phải là `App`. Trong class chính, phải có một method `main()` là `public static void`. Đây là nơi bắt đầu chạy toàn bộ chương trình.

## 2. Comment

Comment bị bỏ qua khi biên dịch. Java có 2 loại comment:

* Single line comment: Từ dấu `//` cho tới hết dòng
* Multi line comment (block comment): trong cặp `/* */`

Comment `//` dùng để comment, chú thích cho code, trong khi đó `/* */` thường dùng để tạo document.

Và có thêm một loại comment nữa khá giống với `/* */` là documentation comment, dùng để viết document với công cụ javadoc. Documentation comment có dạng `/** */`.

## 3. Import

Dùng từ khóa `import` để import một hoặc nhiều class vào chương trình. Các class có thể thuộc nhiều package khác nhau.

```App.java
import java.util.*;  // Import toàn bộ package
import java.util.Scanner;  // Import một class Scanner vào
```

Nếu không import như trên, thì khi dùng trong chương trình cần chỉ định rõ `package.Class`, ví dụ như sau.

```App.java
// Không dùng import (dài dòng)
java.util.Scanner sc = new java.util.Scanner(System.in);

// Dùng import (ngắn hơn)
import java.util.Scanner;
Scanner sc = new Scanner(System.in);
```

Câu lệnh `import` thường đặt ở ngoài và trên cùng, dưới khai báo `package`.

## 4. Variable & constant

**Variable**

Biến trong Java có 3 loại, mỗi loại nằm ở vị trí riêng:

* Biến thực thể (instance variable): nằm trong class, không thuộc method nào. Biến này thuộc về các thực thể (instance - object) được tạo ra từ class.
* Biến tĩnh (static variable): tương tự biến thực thể, nhưng có từ khóa `static` để đánh dấu biến thuộc về class, không phải object.
* Biến cục bộ (local variable): được khai báo trong method.

Cú pháp khai báo tương tự C++. Có thể bỏ qua init value, và có thể khai báo nhiều biến cùng loại trên một dòng.

```App.java
// Biến không khai báo ở đây
public class App {
    // Biến thực thể
    int instanceVar = 10;
    
    // Biến tĩnh
    static double staticVar;  // Không cần init value
    
    // Đây là method
    public static void main() {
        // Biến cục bộ
        int localVar = "Hello", name = "John";
    }
}
```

**Constant**

Hằng (constant) tương tự như khai báo biến. Trước đây dùng từ khóa `const`, nhưng được thay thế bằng `final`.

```App.java
final float PI = 3.14;
```

Hằng không thể gán giá trị mới, và bắt buộc có init value khi khai báo. Đối với hằng số là object, thì các trường của object vẫn có thể thay đổi được.

## 5. Input & output

**Output**

Dùng các lệnh print của `System.out` để xuất output ra màn hình console (của cmd hoặc Eclipse console).

```App.java
System.out.print("String " + a);  // In không xuống dòng
System.out.println("String " + a);  // In và xuống dòng
System.out.printf("String %d %d", a, b);
    // In với chuỗi format và pass value vào
```

Các lệnh trên nhận tham số là chuỗi, đối với `printf()` thì tham số sau là những value truyền vào. Do đó, cách viết sau là sai.

```App.java
System.out.println(a, b, c);  // Sai
System.out.println(a + " " + b + " " + c);  // Đúng
```

Phải dùng phép nối chuỗi `+`, java sẽ tự động convert các biến thành chuỗi và nối lại mới hợp lệ.

Ngoài output stream là `System.out` còn có `System.err` tương tự, nhưng chỉ dùng xuất lỗi ra màn hình. Console trong eclipse sẽ hiển thị các văn bản xuất ra `System.err` bằng màu đỏ.

**Input**

Để nhập dữ liệu từ console, dùng class `java.util.Scanner` như sau.

```App.java
import java.util.Scanner;
Scanner sc = new Scanner(System.in);
    // Tạo object scanner, và đọc dữ liệu từ System.in stream
```

Để đọc dữ liệu, dùng các method `next_()` phù hợp với loại dữ liệu cần đọc, ví dụ.

```App.java
int a = sc.nextInt();  // Đọc số nguyên
double b = sc.nextDouble();  // Đọc số thực
String s = sc.nextLine();  // Đọc chuỗi thì đọc cả dòng
```

Sau khi dùng các lệnh `nextInt()`, `nextFloat()`,... nói chung là đọc số, thì dùng thêm một lệnh `nextLine()` phía sau để xóa kí tự `\n` thừa còn lại trong bộ đệm sau khi đọc số. 

Các method đọc số chỉ lấy số, bỏ lại kí tự `\n`, làm cho lệnh đọc chuỗi phía sau bị trôi đi (kết quả chuỗi rỗng, nó chạy luôn mà không dừng lại để nhập). Do đó, dùng thêm `nextLine()` sau khi đọc số để xóa kí tự `\n` còn sót đi, để tránh lỗi trôi lệnh như trên.

```App.java
int a = sc.nextInt();
sc.nextLine();
float b = sc.nextFloat();
sc.nextLine();

// Lệnh này không bị trôi đi
String s = sc.nextLine();
```

Cuối cùng là hai lưu ý khi sử dụng `Scanner` class để tránh lỗi:

* Nên dùng một scanner duy nhất cho toàn bộ chương trình. Nhiều scanner cùng truy cập tới `System.in` stream thì sẽ gây xung đột (ngay cả khi một scanner đã đóng).
* Khi dùng xong scanner cần gọi method `close()` để đóng input stream lại.