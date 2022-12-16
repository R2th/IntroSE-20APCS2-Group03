# A. Data type

## 1. Primitive types

Những kiểu dữ liệu nguyên thủy (primitive types) trong java gồm.

| Type | Size |
| - | - |
| boolean | 1 bit |
| char | 2 bytes |
| byte | 1 bytes |
| short | 2 bytes |
| int | 4 bytes |
| long | 8 bytes |
| float | 4 bytes |
| double | 8 bytes |

Các kiểu primive là chữ thường toàn bộ. Kiểu số trong java luôn là số có dấu (signed), và có kích thước cố định, không phụ thuộc vào nền tảng chạy.

Đối với kiểu primive, có một số chú ý:

* Value số thực có thể viết dạng khoa học
* Mặc định java hiểu một giá trị số thực là kiểu `double`, nếu muốn dùng cho một biến kiểu float thì cần chỉ thêm hậu tố `f`, ví dụ như `float a = 3.14f`
* Kiểu `char` có hỗ trợ escape sequences (như `\n`, `\t`,...)
* Kí tự nằm trong nháy đơn `''`, còn string trong nháy kép `""`

Đặc biệt kiểu `String` trong java vừa là primitive vừa là object type.

## 2. Operators

Các toán tử trong java tương tự như C++:

* Toán tử tăng giảm (increment, decrement): `a++`, `++a`, `a--`, `--a`
* Toán tử thuận và đối (position, negation): `+a`, `-a`
* Toán tử số học (arithmetic): `a + b`, `a - b`, `a * b`, `a / b` (chia nguyên), `a % b` (chia dư)
* Toán tử ba ngôi (ternary): `a > b ? a : b` và có thể lồng nhau như `(a > 0) ? "Dương" : (a < 0) ? "Âm" : "Số không"`
* Toán tử gán (assignment): phép gán `a = 5` và phép gán kết hợp như `a += 5`, `a -= 3`
* Toán tử quan hệ (relational): So sánh bằng `a == 5`, khác `a != 5`, lớn `a > 5`, bé `a < 5`, lớn hơn hoặc bằng `a >= 5`, bé hơn hoặc bằng `a <= 5`.
* Toán tử logic (thực hiện trên boolean): phép and `a && b`, or `a || b` và not `!a`
* Toán tử thao tác bit (bitwise): gồm and `10 & 3`, or `10 | 3` và not `!10`. Các phép bitwise thực hiện trên số nguyên, và kí hiệu chỉ gồm 1 dấu.
* Toán tử dịch chuyển bit (bit shifting): phép dịch trái `x << y` (nhân 2^y), dịch phải điền cùng dấu `x >> y` (chia nguyên 2^y) và dịch phải điền 0 (zero filled - chia nguyên lấy trị tuyệt đối cho 2^y) `x >>> y`. 

## 3. Math class

Lớp `java.lang.Math` có nhiều hằng số và hàm toán học dạng static, có thể sử dụng trực tiếp từ lớp `Math`.

```App.java
// Math constants
Math.E;
Math.PI;
...

// Math static methods
Math.max(2, 4);  // chỉ nhận 2 số, return số lớn
Math.sqrt(9);  // 3
Math.cbrt(8);  // 2, cubic root
Math.abs(-1);  // 1
...
```

## 4. Type casting

Ép kiểu (type casting) là chuyển đổi dữ liệu từ kiểu này sang kiểu khác. Bên dưới là phép so sánh đơn giản độ lớn các kiểu số (nguyên và thực).

> byte < short < int < long < float < double

Theo thứ tự trên, chúng ta có hai dạng ép kiểu:

* Từ nhỏ sang lớn (widening casting - ép kiểu mở rộng): hay còn gọi ép kiểu ngầm định (implicit casting), java tự động thực hiện ép kiểu phù hợp trong biểu thức.
* Từ lớn xuống nhỏ (narrowing casting - ép kiểu thu gọn): hay còn gọi ép kiểu tường minh (explicit casting). Ép kiểu dạng này không an toàn và có thể gây mất dữ liệu, do đó java không thực hiện tự động mà bạn phải ép kiểu thủ công.

Narrowing casting không an toàn, vì khi ép dữ liệu từ kiểu lớn xuống kiểu nhỏ hơn có thể gây mất dữ liệu hoặc không chính xác, do kiểu nhỏ hơn có thể không chứa đủ dữ liệu.

```App.java
// Implicit casting
int a = 1000;
long b = a;
    // Java tự động ép số 1000 từ int sang long
    
// Explicit casting
double x = 12345.67890;
float y = x;
    // Sai, vì đây là narrowing casting, không an toàn
    // nên java không tự động thực hiện ép kiểu
    // phải thực hiện ép thủ công
float y = (float) x;
    // Đúng, đây là cú pháp thực hiện ép kiểu thủ công
    // x đang là double, chuyển sang float thì dùng (float) x
```

Cú pháp ép kiểu trên cũng được dùng cho class và object, với tên upcasting và downcasting, sẽ tìm hiểu sau.
# B. Control statements

## 1. Conditional statement

**If else statement**

Lệnh `if else` tương tự như trong C++. Nếu điều kiện trong `if` đúng thì thực hiện lệnh, nếu không thì đi tiếp hoặc thực hiện lệnh trong `else` (nếu có).

```App.java
if (condition)
    ...;  // Cần có chấm phẩy
else  // Phần else có thể bỏ qua
    ...
```

Điều kiện có thể là bất kì thứ gì trả về một boolean, như biến boolean, phép so sánh, biểu thức logic,...

Nếu có 2 lệnh trở lên thì cần đặt trong cặp `{}`.

Các khối `if else` có thể lồng vào nhau (nested) nên chú ý đặt ngoặc rõ ràng để dễ đọc hơn.

**Ternary operator**

Ternary operator là một toán tử ba ngôi, dùng thay thế điều kiện if trong một số trường hợp đơn giản, để return giá trị dựa theo điều kiện. Ví dụ như tìm số chẵn hoặc lẻ như sau.

```App.java
// Chọn một trong 2 dựa theo điều kiện
String s = (a % 2 == 0) ? "Số chẵn" : "Số lẻ";

// Có thể có nhiều điều kiện liên tiếp
String s = (a > 0) ? "Số dương" :
    (a < 0) ? "Số âm" : "Số không";
```

Chú ý ternary operator chỉ chọn một trong hai value dựa theo điều kiện, chứ không thực hiện lệnh như `if`. Như ví dụ sau là sai.

```App.java
// Sai vì ternary operator không thể thực hiện lệnh
// mà nó chỉ chọn 1 trong 2 giá trị thôi
(a % 2 == 0)
    ? System.out.println("Số chẵn")
    : System.out.println("Số lẻ");
```

**Switch case**

`Switch case` tương tự C++, không khác gì luôn.

```App.java
// Dựa vào kết biểu thức mà chọn case phù hợp
switch (expression) {
    // Nhiều case gom thành 1 nhóm
    case v1: case v2... case vn:
        // Lệnh 1
        break;  // Phải dùng break để tránh trôi lệnh
    case va:
        // Lệnh 2
        break;
    // Khi không có case nào ở trên khớp thì gọi default
    // Phần default có thể bỏ qua
    default:
        ...
        break;
}   
```

## 2. Loop statement

**While loop**

Vòng lặp `while` kiểm tra điều kiện, nếu đúng thì thực hiện lệnh, sau đó quay lại kiểm tra điều kiện lần nữa,... cho tới khi điều kiện sai thì dừng.

```App.java
while (condition)
    ...
```

**Do while loop**

Lặp `do while` khác với `while` chút xíu, là `do while` sẽ thực hiện lệnh trước rồi mới check điều kiện. Do đó, lệnh luôn được thực hiện ít nhất một lần.

```App.java
do {
    ...
} while (condition);
```

Cả hai vòng lặp `do while` và `while` cần tránh lặp vô tận.

**For loop**

```App.java
for (init; condition; increment)
    ...
```

Lệnh lặp `for` gồm 3 phần trong ngoặc tròn:

* Phần init dùng khởi tạo biến đếm
* Phần condition chỉ định điều kiện lặp tiếp
* Phần increment dùng tăng, giảm biến đếm, để tới lúc nào đó điều kiện trở thành false.

Đầu tiên, phần init thực hiện duy nhất một lần. Sau đó tới bước kiểm tra điều kiện, nếu đúng thì thực hiện lệnh, cuối cùng là thực hiện increment. Sau đó quay lại kiểm tra điều kiện tiếp, cứ thế cho tới khi condition là false thì thôi.

**Foreach loop**

Java có một vòng lặp khác, gọi là `foreach` nhưng vẫn dùng từ khóa `for`, nhưng theo cú pháp khác.

```App.java
int[] a = { 1, 2, 3 };
for (int e: a)
    ...
```

Vòng lặp này lặp qua từng phần tử của một iterable object (mảng, chuỗi, collection,...), từ phần tử đầu cho tới cuối. Mỗi lần lặp thì giá trị biến đếm bằng giá trị phần tử đang trỏ tới.

**Break & continue**

Hai từ khóa `break` và `continue` thường dùng trong vòng lặp:

* `break` dừng toàn bộ vòng lặp đang chạy
* `continue` dừng lần lặp hiện tại, và đi tới lần lặp tiếp theo

**Label & goto**

Không dùng nữa vì gây rối logic code.

# C. Basic method

## 1. Overview

Java là ngôn ngữ thuần OOP, nên mọi thứ trong java đều phải thuộc về một class. Các khái niệm hàm (function) và thủ tục (procedure) khi nằm trong class được gọi là phương thức (method). Vì vậy, có thể hiểu method là những function nằm trong class.

Cú pháp khai báo method khá giống với function trong C++, gồm:

* Phần đầu bao gồm các `modifiers`, kiểu trả về, tên method, danh sách tham số trong cặp `()`
* Phần thân method trong cặp `{}` chứa các lệnh cần thực hiện

Khai báo method của java hơi khác C++ ở chỗ có thêm những modifiers, hiểu đơn giản là những từ khóa gắn vào đầu method, giúp biến đổi chức năng của method. Phần này sẽ được tìm hiểu sau.

```App.java
public class App {
    // private, static là 2 modifers thêm vào hello()
    private static void hello() {
        System.out.println("Hello");
    }
    
    // Method có thể return giá trị tương tự C++
    private static String getName() {
        return "John";
    }
    
    // Method main()
    public static void main(String[] args) {
        // Gọi method
        hello();  // "Hello"
        System.out.println("Your name is " + getName);
    }
}
```

**Gọi method**

Ở ví dụ trên, chúng ta khai báo các method là `static`, nên chúng có thể gọi lẫn nhau cho dễ hiểu. Phần static method sẽ được nói tới sau.

Về cơ bản, muốn gọi method có 2 trường hợp:

* Method cần gọi cùng nằm trong một class: gọi thẳng bằng tên và truyền đối số vào
* Method trong class khác: nếu method bình thường thì kèm theo tên object chứa nó phía trước, dạng `obj.method()`. Nếu nó là static method thì gọi kèm tên class `MyClass.method()`.

**Return value**

Java cũng có từ khóa `return`, để return một giá trị bên trong method.

## 2. Params & args

**Parameters & arguments**

Tham số (parameter - viết gọn param) là những biến lưu trữ giá trị truyền vào method. Các tham số được coi như tương đương với biến cục bộ trong method.

Đối số (argument - arg) là những giá trị thực sự truyền vào method, mỗi lần gọi method khác nhau thì có thể có đối số khác nhau.

Tham số là trừu tượng, chúng không có giá trị cụ thể mà phụ thuộc vào đối số truyền vào method là cái gì. Còn đối số mới là những giá trị thực, được truyền vào method và biến thành tham số.

Hãy xem ví dụ sau để hiểu rõ hơn.

```App.java
public class App {
    // Tham số là x, y, chúng chỉ là đại diện
    // không có giá trị cụ thể
    public static int sum(int x, int y) {
        return x + y;
    }
    
    public static void main(String[] args) {
        // 10, 5 là đối số, có giá trị thực sự
        // Khi truyền vào sum thì chúng được đưa vào tham số
        // theo đúng thứ tự, do đó lúc này x = 10 và y = 5
        sum(10, 5);  // 15
        
        // Tương tự, ở đây đối số là a và 10
        // Bên trong method thì x = a và y = 10
        int a = 20;
        sum(a, 10);  // 30
    }
}
```

## 3. Arguments passing

Trong C++ có nhiều kiểu truyền đối số (arg passing) như tham trị, tham chiếu, con trỏ. Trong java, tất cả đối số đều được truyền bằng tham trị (pass by value):

* Đối số là primitive: một bản sao đối số được tạo ra và đưa vào tham số, do đó method thao tác trên bản sao này nên không thay đổi dữ liệu gốc.
* Đối số là wrapper: vì wrapper là immutable (bất biến), nên chúng tương tự primitive types, do đó cũng truyền theo tham trị.
* Đối số là object: Có thể xem như truyền bằng tham chiếu, do dữ liệu gốc có thể bị thay đổi sau khi method thực hiện. Thực ra nó vẫn là pass by value, tuy nhiên bản sao được tạo ra lại chính là bản sao tham chiếu của object, do đó vẫn là trỏ tới cùng object, nên method có khả năng thay đổi dữ liệu gốc.

Chú ý, java **luôn** pass by value, và không có vụ pass by reference. Chi tiết xem lại mục thứ 3 ở trên.

## 4. Method overloading

Nạp chồng phương thức (method overloading) hiểu là một method nhưng lại có nhiều phiên bản khác nhau. Hay nói cách khác, có nhiều method cùng tên nhưng khác tham số.

Khi gọi method được overload, thì tùy vào đối số truyền vào thế nào mà gọi phiên bản có tham số tương ứng.

Như ví dụ sau, có hai method `hello()`, nhưng khi gọi với đối số khác nhau thì một trong hai method sẽ được gọi.

```App.java
public class App {
    // Phiên bản 1 không có tham số
    private void hello() {
        System.out.println("Hello");
    }
    
    // Phiên bản 2 có một tham số chuỗi
    private void hello(String name) {
        System.out.println("Hello, " + name);
    }
    
    public static void main(String[] args) {
        // Gọi phiên bản 2, vì đối số có 1 string
        hello("John");
        
        // Gọi phiên bản 1, do không có đối số
        hello();
        
        // Lỗi nè, do không có phiên bản nào khớp cả
        hello(10);
    }
}
```

Các method được overload có cùng tên, nhưng khác nhau ở:

* Số lượng tham số
* Thứ tự các tham số
* Kiểu dữ liệu tham số

Chỉ cần 1 trong 3 cái khai báo khác đi là ra một phiên bản overload mới.

Chú ý, hai method tuy cùng tên nhưng khác kiểu trả về không được tính là overload, vì java sẽ không hiểu nên chạy phiên bản nào (lỗi ambiguous).

## 5. Main method

Trong chương trình java có thể có nhiều class, mỗi class như vậy có nhiều method. Tuy nhiên, có một class đặc biệt được đánh dấu `public class`, có tên trùng với tên file `.java`. Trong `public class` đó có một method tên `main` như sau.

```App.java
public class App {
    public static void main(String[] args) {
        ...
    }
}
```

Method `main()` này là điểm khởi đầu của mọi chương trình java. Nó được gọi đầu tiên khi chạy chương trình.

Method `main()` nhận vào tham số là mảng string tên là args, để lưu trữ các đối số dòng lệnh (command line argument). `main()` không có kiểu trả về, tuy nhiên khi có lỗi thì nó sẽ trả về một số nào đó và dừng lại.

Phương thức `main()` có hai modifier quan trọng, chức năng của chúng như sau:

* `public` (access modifier): cho phép method `main()` có thể được gọi từ bên ngoài. Khi chương trình chạy, thì JVM sẽ là thứ gọi cho `main()`, mà JVM là đối tượng bên ngoài nên bắt buộc `main()` phải có `public`.
* `static`: Khi chương trình mới chạy, chưa có đối tượng nào được tạo ra. Do đó `main()` phải là static method để JVM gọi nó từ class `App.main()` chứ không phải gọi từ object.