© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Ngày 15/09 vừa qua, các iFan đã được “thỏa mãn” với màn ra mắt của iPhone 13. Hòa chung không khí đó, các tín đồ Java cũng được “sung sướng” khi Oracle chính thức release JDK 17 LTS sau 3 năm thống trị của JDK 11 LTS release vào 09/2018.

Khi JDK 8 LTS release vào 03/2014, nó là một cuộc cách mạng siêu to khổng lồ khi có rất nhiều sự khác biệt với phiên bản tiền nhiệm JDK 7. Rất nhiều features nổi bật như stream API, lambda expression, method reference, functional interface, interface default method, Optional… Phải nói là cực kì đồ sộ, chả thế mà người người, nhà nhà, các công ty, các dự án update ầm ầm.

... 

4 năm sau, Oracle release JDK 11 LTS nhưng không thực sự có sự dịch chuyển mạnh mẽ như JDK 8 đã làm được trước đó. 

> Đến thời điểm hiện tại cũng còn kha khá các công ty và project sử dụng JDK 8 hoặc kết hợp cả 2 JDK 8 và JDK 11 (theo nguồn khảo sát tự tìm hiểu :joy:). 
>
> Oracle vẫn support JDK 8 cho đến hết 03/2022. Tức là chỉ còn còn vài tháng ngắn ngủi (tính từ thời điểm viết bài này). Thực ra cũng không cần quan tâm lắm vì đa số sử dụng OpenJDK vì OracleJDK không còn free nếu sử dụng cho mục đích thương mại từ lâu.
> 
> Nhưng...
> 
> Với JDK 17, [**mọi thứ hoàn toàn free bao gồm cả mục đích thương mại**](https://blogs.oracle.com/java/post/free-java-license). 

JDK 11 vẫn ổn, thậm chí JDK 8 vẫn đang phổ biến. Vậy JDK 17 có những feature gì nổi bật, đáng để chuyển đổi hay không?

![](https://i.imgur.com/CWnQ2WN.png)

Cùng đi tìm hiểu những feature chính và điểm khác biệt **hay được sử dụng** từ JDK 8 lên JDK 17 qua bài viết này nhé. Let's begin.

> Những thứ nâng cấp hoặc bỏ đi ít được sử dụng như RMI activation, Applet API, Stack-Walking API, Process API improvement... mình sẽ không đề cập đến trong bài viết này.

### 1) Java 9: Interface private method

Trước thời điểm Java 8 release, **Interface** và **Abstract class** có sự khác biệt khá lớn và gần như luôn xuất hiện trong các buổi phỏng vấn.

Sau đó, Java 8 cung cấp thêm **default** method biến một abstract method thành non-abstract method với 2 mục đích:
> - Cung cấp method mặc định cho interface.
> - Support backward compatibility.

Tiếp tục đến Java 9, Oracle đã bổ sung thêm **private method** cho interface. Tất nhiên các **private method** với mục đích tăng tính re-used cho code.

Ví dụ, với Java 8:

```java
public interface Human {
    
    default void awake() {
        System.out.println("Same code here");
    }
    
    default void sleep() {
        System.out.println("Same code here");
    }
}
```

Java 9 với private method:

```java
public interface Human {

    default void awake() {
        doSomething();
    }

    default void sleep() {
        doSomething();
    }

    private void doSomething() {
        System.out.println("Same code here");
    }
}
```

Thậm chí support luôn **private static** method:

```java
public interface Human {

    default void awake() {
        doSomething();
    }

    default void sleep() {
        doSomething();
    }

    private static void doSomething() {
        System.out.println("Same code here");
    }
}
```

Như vậy, **interface** đã có non-abstract method, private/public static method, public static variable. Về mặt **implement** đã không còn khác nhau quá nhiều giữa **interface** và **abstract class**.

> Lưu ý rằng về ý nghĩa thì **interface** và **abstract class** vẫn khác nhau, và **interface** không có instance variable và private static variable.

### 2) Java 9: CompletableFuture API improvement

**CompletableFuture** đã xuất hiện từ Java 8. Tuy nhiên, Oracle bổ sung thêm 4 method trong Java 9 liên quan đến **delay** và **timeout** để support cho việc lập trình bất đồng bộ dễ dàng hơn.

Với **delay** là 2 method:

```java
static Executor delayedExecutor(long delay, TimeUnit unit);

static Executor delayedExecutor(long delay, TimeUnit unit, Executor executor);
```

Method đầu tiên trả về **executor** sẽ thực thi task mà chúng ta submit sau một khoảng thời gian **delay** time.

Method thứ hai cần truyền thêm **executor** và chính **executor** đó sẽ thực thi task sau **delay** time.

Có thể chạy đoạn code sau để hiểu thêm về nó nhé:

```java
public static void main(String[] args) throws InterruptedException {

    var future = new CompletableFuture<>();
    var delayExecutor = CompletableFuture.delayedExecutor(3, TimeUnit.SECONDS);
    future.completeAsync(() -> {
                System.out.println("Processing data");
                return "process success";
            }, delayExecutor)
            .thenAccept(r -> System.out.println("Result: " + r));

    for (int i = 1; i <= 5; i++) {
        Thread.sleep(1000);
        System.out.println("Running outside... " + i + " s");
    }

}
```

Tiếp theo cùng đến với 2 method **timeout**:

```java
CompletableFuture<T> orTimeout(long timeout, TimeUnit unit);

CompletableFuture<T> completeOnTimeout(T value, long timeout, TimeUnit unit);
```

Giống với tên gọi của nó, method đầu tiên support việc throw exception nếu process time quá khoảng thời gian chỉ định. Method thứ hai thay vì throw exception sẽ trả về giá trị default value.

Thực hiện run code dưới đây để hiểu thêm nếu cần.

```java
public static void main(String[] args) throws Exception {

    var task = CompletableFuture.supplyAsync(() -> {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Finish";
    });

    BiConsumer<String, Throwable> onComplete = (result, error) -> {
        if (error == null) {
            System.out.println("The result is: " + result);
            return;
        }
        System.out.println("Time is over");
    };

    var future = task
            .orTimeout(3, TimeUnit.SECONDS)
            .whenComplete(onComplete);
    var content = future.get();
    System.out.println("Result: " + content);
}
```

### 3) Java 9: Stream API improvement 

Java 9 đã bổ sung thêm 4 methods để tương tác với **stream**, trong đó có 2 instance methods và 2 static methods là:

```java
Stream<T> takeWhile(Predicate<? super T> predicate);
Stream<T> dropWhile(Predicate<? super T> predicate);

static <T> Stream<T> iterate(T seed, Predicate<? super T> hasNext, UnaryOperator<T> next);
static <T> Stream<T> ofNullable(T t);
```

#### 3.1) Take while

Giống với tên gọi của nó, method **takeWhile()** trả về tất cả các element thỏa mãn điều kiện. Nghe thì có vẻ giống **filter()** nhưng có đôi chút khác biệt. Hãy chú ý vào chữ **while()**: có thể hiểu nôm na rằng sẽ duyệt stream từ đầu cho đến khi nào gặp element không thỏa mãn điều kiện thì sẽ dừng lại luôn.

```java
Stream.of(1, 2, 3, 4, 1, 2, 3, 4)
    .filter(i -> i < 4)
    .forEach(System.out::print);
    
Stream.of(1, 2, 3, 4, 1, 2, 3, 4)
    .takeWhile(i -> i < 4)
    .forEach(System.out::print);
```

Kết quả của dòng đầu tiên với **filter()** là `123123`. Với **takeWhile()** kết quả chỉ là `123`.

#### 3.2) Drop while

Idea tương tự như **takeWhile()** tuy nhiên logic của nó sẽ là loại bỏ tất cả các element thỏa mãn điều kiện và dừng lại cho đến khi gặp phần tử không thỏa mãn.

```java
Stream.of(1, 2, 3, 4, 1, 2, 3, 4)
    .filter(i -> i < 4)
    .forEach(System.out::print);
```

Dễ dàng đoán được kết quả là `41234`.

#### 3.3) Iterate

Nếu muốn tạo ra một stream với element đầu tiên = 2, element sau gấp đôi element trước cho đến khi element cuối cùng < 30, có thể sử dụng **iterate** với Java 9 như sau:

```java
IntStream.iterate(2, x -> x < 30, x -> 2 * x)
         .forEach(System.out::println);
```


#### 3.4) Of nullable

Cuối cùng là **ofNullable()**, nó sẽ trả về stream chứa element đó nếu element not null, còn không sẽ trả về empty stream.

```java
Stream.ofNullable(1).forEach(System.out::println);

Stream.ofNullable(null).forEach(System.out::println);
```

### 4) Java 9: Collection factory

Từ Java 8 trở về trước, việc tạo một collection (List, Set, Map...) khá dài dòng:

```java
List<String> values = new ArrayList<>();
values.add("Hello");
values.add("World");
```

Vì lý do đó nên Google đã tung ra Guava collection giúp chúng ta thuận tiên hơn trong việc tạo ra một collection với cú pháp đơn giản:

```java
List<String> values = ImmutableList.of("Hello", "World");
```

May mắn thay, Oracle đã nhận ra sự bất tiện này và đưa chúng vào luôn Java 9. Vậy là từ giờ không cần thêm common lib bên ngoài nữa:

```java
List<String> values = List.of("Hello", "World");
```

### 5) Java 9: Java Module system

Java Module system đem đến 3 lợi ích chính:
- Chia nhỏ application thông qua Modular Java platform. Có thể hiểu Java bao gồm rất nhiều các thành phần và cấu trúc khác nhau giống như căn biệt thự khổng lồ. Không phải lúc nào cũng tận dụng được hết các phòng trong căn biệt thự đó, ta chỉ sử dụng những thứ mà ta cần, vừa tiết kiệm chi phí lại tiết kiệm cả thời gian. 
- Tăng tính **encapsulation**. Mặc dù là public class nhưng chỉ có thể truy cập được từ những package được chỉ định. Nghe có vẻ hay ho rồi đây.
- Nếu triển khai code với Module system, JVM có thể detect missing module và shutdown application.

Thực tế mình cũng chưa thấy có dự án hoặc công ty nào sử dụng Modular Java platform để triển khai code base. Ngoài ra có rất nhiều thứ để nói về Java module, mình sẽ trình bày trong một bài khác. 

### 6) Java 10: var

Không cần bàn cãi nhiều, đây chính là cứu tinh của cuộc đời những lập trình viên Java.

Java là một ngôn ngữ **đẹp**, **rõ ràng**, nên nó muốn mọi thứ phải rõ ràng. Trước JDK 10, nếu muốn khai báo bất kì biến nào chúng ta cũng cần chỉ đích danh biến đó có type gì:

```java
Object object = new Object();

Map<String, String> map = new HashMap<>();

BiConsumer<String, String> biConsumer = new BiConsumer<>() {
    @Override
    public void accept(String s1, String s2) {
    }
};
```

Thank God! À không thank Oracle mới đúng, mọi thứ sẽ ngắn gọn hơn rất nhiều với **var**:

```java
var object = new Object();

var map = new HashMap<>();

var biConsumer = new BiConsumer<>() {
    @Override
    public void accept(String s1, String s2) {
    }
};
```

Lưu ý rằng Java vẫn là một ngôn ngữ rõ ràng, giàu tính thống nhất, scope của **var** là **compile time** chứ không phải **run time** giống như JavaScript.

**Note**: Oracle đã tăng thêm phạm vi sử dụng của **var** trong Java 11. Cụ thể là **var** có thể được sử dụng với lambda parameter.

```java
Map.of("key", "value").forEach((var k, var v) -> {});
```

> Tất nhiên, nếu dùng Java 10 trở xuống chúng ta vẫn có cách sử dụng **var** thông qua thư viện **Lombok** thần thánh. **Lombok** còn tân tiến hơn đó là cung cấp không chỉ **var** mà còn **val**: tương đương với **final var**.

### 7) Java 11: String API improvement

#### 7.1) isBlank()
Nếu trước đây để check một string có blank hay không ta cần sử dụng 2 method là **trim()** và **isEmpty()** thì nay đã có **isBlank()**.

```java
boolean result = "   ".trim().isEmpty();

boolean result = "   ".isBlank(); 
```

#### 7.2) repeat()

Giống tên gọi của nó, method này thực hiện nối chuỗi với chính nó theo số lần chỉ định.

```java
var string = "repeat ";
System.out.print(string.repeat(3)); // repeat repeat repeat
```

#### 7.3) strip()

Method này thực hiện bỏ tất cả những khoảng trắng ở đầu và cuối string, giống như những gì **trim()** đang làm. Sự khác biệt đó là **strip()** xịn xò hơn **trim()** do sử dụng cách thức định nghĩa khoảng trắng **xịn sò** hơn, nhờ đó đem lại tốc độ tốt hơn và fix một [bug](https://bugs.openjdk.java.net/browse/JDK-8200373) đang tồn tại với **trim()**.

#### 7.4 lines()

Cuối cùng là lines(), method này giúp chúng ta chia string thành stream of lines phân cách nhau bằng `\n`:

```java
"hello\nworld".lines().forEach(System.out::println);
// hello
// world
```

### 8) Java 12: String API improvement

Tiếp tục là sự cải tiến cho String API ở JDK 12 với 2 methods:
- indent()
- transform()

#### 8.1) indent()

Với **indent()** method, chuỗi ban đầu được split thành nhiều line giống method **lines()**, sau đó mỗi line được indent (thêm khoảng trắng) dựa trên giá trị truyền vào.

```java
var input = "Hello\nWorld";
System.out.println(input);
System.out.println(input.indent(2));

// Result
Hello
World
  Hello
  World
```

#### 8.2) transform()

Không có gì phức tạp, **transform()** apply function lên string hiện tại để tạo ra một kết quả mới:

```java
var result = "Hello".transform(input -> input + " world");
System.out.println(result); // Hello world
```

### 9) Java 14: Switch expression

Nếu cần assign value với if else, ta đã có ternary operator. Nhưng với switch case thì.. chẳng có cách nào cho đến khi Java 14 xuất hiện.

```java
// ternary operator
var isMonday = day == Day.Monday ? true : false;

// switch expression
var isMonday = switch (day) {
    case MONDAY -> true;
    default -> false;
};
```

### 10) Java 14: NullPointerException

Mình tin rằng bất kì dev nào cũng đã từng bị ám ảnh bởi Java NPE vì chẳng biết variable nào bị null ngoài cách đọc code và debug.

Tỉ dụ có đoạn code như sau:

```java
var fullName = employee.getDetail().getFullName().toLowerCase();
```

Và đoạn log:

```shell
Exception in thread "main" java.lang.NullPointerException
  at com.oracle.java14.Application.main(Application.java:7)
```

Có 3 trường hợp null: **employee**, **employee.getDetail()** hoặc **employee.getDetail().getFullName()**. Chỉ biết chửi đứa nào code như ..., không check choác gì cả :hammer:.

May mắn thay Oracle đã tung ra một JVM options mới giúp chúng ta thuận tiện hơn trong việc debug NPE:

```shell
-XX:+ShowCodeDetailsInExceptionMessages
```

Sau khi thêm option trên, nếu có lỗi xảy ra JVM sẽ show message thân thiện hơn rất nhiều:

```shell
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "com.oracle.java14.Application$Employee.getName()" because "employee" is null
	at com.oracle.java14.Application.main(Application.java:7)
```

hoặc 

```shell
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.trim()" because the return value of "com.oracle.java14.Application$Employee.getName()" is null
	at com.oracle.java14.Application.main(Application.java:7)
```

tùy thuộc giá trị nào là null.

> Với Java 17, tính năng này đã được tự động thêm vào, không cần enable bằng JVM option nữa.

### 11) Java 15: Text block

Feature này đã có từ Java 13 tuy nhiên chỉ là phiên bản preview, nếu muốn sử dụng phải enable. Đến Java 15 mới được đưa vào chính thức.

Với Java 15 trở xuống, nếu muốn tạo một String và xuống dòng:

```java
var string = "Line 1\n"
            + "Line 2\n"
            + "Line 3";
```

Hơi vất vả nhưng vẫn dùng được. Để đơn giản hóa việc khai báo này, Java 15 sử dụng cú pháp như sau:

```java
var string = """
             Line 1
             Line 2
             Line 3
             """;
```

Những dòng code đã nói lên tất cả, rất tiện lợi. Thank Oracle.

### 12) Java 16: Pattern matching for `instanceof`

Nếu muốn check một object có type là String không và assign nó sang biến mới để sử dụng ta làm như sau:

```java
Object object = "";
if (object instanceof String) {
   var string = (String) object;
   System.out.println(string);
}
```

Để đơn giản hóa quá trình này, Java 16 cung cấp pattern matching cho `instanceof` với cách sử dụng mới như sau:

```java
Object object = "";
if (object instanceof String string) {
   System.out.println(string);
}
```

### 13) Java 16: Record type

Chúng ta đã quá nhàm chán với việc tạo ra những Java bean chứa đầy rẫy boilerplate code với getter(), setter(), toString()...

Nếu bạn đã quen với Lombok thì không còn lạ gì những annotation `@Getter`, `@Setter`, `@Data`. Chúng sẽ giúp giải quyết những boilerplate code kể trên. 

Oracle biết điều đó nhưng họ muốn làm tốt hơn. Và keyword **record** ra đời, ngang hàng với class hoặc interface, đều là type.

Nếu trước đây nếu muốn tạo một Java bean Person với các thông số fullName và address, thực hiện như sau:

```java
public class Person {

    private String fullName;
    private String address;
    
    public Persion();
    
    public Persion(String fullName, String address);
    
    public getFullName();
    
    public setFullName(String fullName);
    
    public getAddress();
    
    public setAddress(String fullName);
}
```

Với **record**:

```java
public record Person(String fullName, String address) {

    public Person() {
        this("defaultValue", "defaultValue");
    }
}
```

Nhẹ nhàng thư thái, code ngắn gọn hơn hẳn.

### 14) JDK 17: Sealed class

Vẫn là nhu cầu tăng tính **encapsulation**. Java đã mạnh OOP nay càng mạnh hơn. 

Thực tế khi implement, sẽ có những lúc ta muốn class A chỉ được phép extends bởi class B và C. Một cách để có thể triển khai đó là đặt cả 3 class vào chung package để để class A có level access modifier là package. Tuy nhiên sẽ có những trường hợp không muốn đặt chung như vậy.. nhưng vẫn phải làm như vậy.

**Sealed class** sẽ giúp chúng ta xử lý vấn đề này.

```java
sealed interface Runnable permits Dog {

    void run();

}

final class Dog implements Runnable {

    @Override
    public void run() {
    }

}
```

Sử dụng keyword **sealed** để thông báo đây là một class/interface giới hạn, chỉ được phép extend bởi class Dog. Nếu tạo một class khác implement interface Runnable sẽ báo lỗi.

### Finally

Với mỗi feature mình chỉ lấy ví dụ đơn giản để dễ hình dung nhất có thể. 

Ngoài ra còn rất nhiều feature/tool khác hoặc cả những thứ đã bị loại bỏ mà chưa đề cập đến như:
- Docker container support với -XX:-UseContainerSupport từ JDK 10.
- CompactNumberFormat từ JDK 12.
- Foreign Function & Memory API với JDK 17.
- Packing tool với JDK 14.
- JShell - Java REPL từ JDK 9.
- Vector API từ JDK 16.
- Context-Specific deserialization filters từ JDK 17.
- Z GC từ JDK 15.

... và rất rất nhiều những cải tiến khác.

Từ những thứ kể trên có thể thấy rằng bản release lần này chất lượng thật sự, lại còn free toàn tập kể cả trong trường hợp sử dụng với mục đích thương mại. Còn chần chừ gì mà không nâng cấp lên JDK 17 và code thôi.

Say goodbye to Java 8 or even Java 11.

> Nếu cần bí kíp ôn luyện OCPJP 11 II thì ping mình. Chỉ cần 2 tuần là có ngay tấm bằng trên tay post LinkedIn nhận job vài nghìn USD ầm ầm (vài nghìn một năm nhé, thời buổi này ai tính theo tháng nữa :beer:).

### After credit

Theo thông lệ thì khoảng 6 - 9 tháng sau khi release LTS, Oracle sẽ tung ra exam certificate. Tức là khoảng tháng 4 năm sau, [chờ ra sách rồi lại cày cuốc thôi](https://www.wiley.com/en-us/OCP+Oracle+Certified+Professional+Java+SE+17+Study+Guide%3A+Exam+1Z0+829-p-9781119864585).

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee](https://drive.google.com/file/d/10PVj-kjVqCrKd_PevOliWwl5fiwtZi9H/view?usp=sharing)