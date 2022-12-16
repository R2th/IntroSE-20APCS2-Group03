# Giới Thiệu
Hôm này mình xin giới thiệu các tính năng mới nổi bật từ bản java 11 trở đi, giúp bạn tự tin hơn để nâng cấp lên java 17 nhé.

![](https://images.viblo.asia/1c996fc5-27ee-4bdd-a873-a3d74803660c.png)

# Text Blocks (Java 15)
**Text Blocks** là tính năng được phát triển từ java 13, tuy nhiên phải tới java 15 nó mới được chính thức đưa vào sử dụng. Text Blocks giúp viện sử dụng chuỗi trong java dễ dành hơn.

 Ví dụ với Java old version.
 
```java
String demo = "Hoàng Phúc International"
      + "\n" 
      + "kafka\n"
      + "kafka\n";
```

Khi chuyển sang Java new version.

```java
String demo = """
    Hoàng Phúc International
    
      kafka
      kafka
      """;
```

Để sử dụng các giá trị biến trong Text Blocks bạn có thể dùng hàm `String.format`, ví dụ:

```java
String demo = """
        Some parameter: %s
        """.formatted("HPI");
```

# Records
record là một kiểu mới trong java 15, giúp bạn khởi tạo nhanh object.<br>
Mình cùng làm 1 ví dụ để thấy sự tiện lợi so với sử dụng Class nhé.

Sử dụng Class, khởi tạo tương đối dài và cồng kềnh =)).

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }
    public int getAge() {
        return age;
    }
}
```

Sử dụng Records, cú pháp rất tính gọn và không cần tới thư viện thứ 3 như *lombok*, biến name và age sẽ được record lưu trữ lại.

```java
public record Person(String name, int age) {
}

Person p = new Person("hpi",32);
p.name();
```

# Sealed Classes
Các Class khi được khai báo trong java sẽ không kiểm soát đường quyền thừa kế, bất cứ Class nào cũng có thể kế thừa được Class của bạn, để khắc phúc vấn đề này **Sealed Classes** được cho ra mắt trong java 15.

**Sealed Classes** kiểm soát việc kế thừa, các lớp chỉ được kế thừa lớp Sealed Classes khi Sealed Classes cấp quyền kế thừa.

```java
public abstract sealed class Person
    permits ClassA, ClassB {
 
}
```

Khi sử dụng `permits ClassA, ClassB` bạn đang cấp quyền cho ClassA, ClassB được phép kế thừa từ classs `Person` bất kỳ class khác khi kế thừa sẽ nhận được thông báo lỗi.

# Pattern Matching Type Checks
Từ phiên bản java 14 trở lên, việc kiểm tra Type sẽ trở nên đơn giản hơn về mặt cú pháp, thay đổi này thường không tạo ra sự khác biệt về hiệu năng tuy nhiên giúp code bạn minh bạc hơn khá nhiều.

```java
/// OLD
if (person instanceof Employee) {
    Employee employee = (Employee) person;
}

/// NEW
if (person instanceof Employee employee) {
    Date hireDate = employee.getHireDate();
}
```

#  Vector API
API Vector được phát triển lần đầu ở java 16. Ý tưởng của API này là cung cấp một phương tiện tính toán vector cuối cùng sẽ có thể hoạt động tối ưu hơn so với phương pháp tính toán vô hướng truyền thống.

```java
int[] a = {1, 2, 3, 4};
int[] b = {5, 6, 7, 8};

var c = new int[a.length];

for (int i = 0; i < a.length; i++) {
    c[i] = a[i] * b[i];
}
```

Ví dụ về tính toán này, đối với một mảng có độ dài 4, sẽ thực thi trong 4 chu kỳ. Bây giờ, chúng ta hãy xem xét phép tính dựa trên Vector:

```java
int[] a = {1, 2, 3, 4};
int[] b = {5, 6, 7, 8};

var vectorA = IntVector.fromArray(IntVector.SPECIES_128, a, 0);
var vectorB = IntVector.fromArray(IntVector.SPECIES_128, b, 0);
var vectorC = vectorA.mul(vectorB);
vectorC.intoArray(c, 0);
```

Vector giúp bạn tối ưu hơn khi bạn làm việc với mảng.

# Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).