Java 8 đã được release vào năm 2014, tuy nhiên hiện nay còn nhiều lập trình viên vẫn chưa hiểu và chưa sử dụng một số những tính năng mới, rất tiện lợi của phiên bản này. Trong bài viết lần này chúng ta sẽ cùng nhau tìm hiểu về `Lambda expressions` và `Method references`, hai tính năng khá đặc biệt của `Java 8`.

### Lambda expressions
Trước hết chúng ta sẽ cùng tìm hiểu một khái niệm là `functional interface`. `Functional interface` là `interface` chỉ có duy nhất một phương thức trừu tượng (Single Abstract Method - SMA). Như chúng ta đã biết, một lớp khi implement một interface thì class đó phải override toàn bộ method của interface trong body của mình. Chúng ta sẽ lấy một ví dụ về `Runnable` interface, interface này đã có từ phiên bản Java 1.0. Nó chỉ có duy nhất một phương thức trừu tượng là `run`, phương thức này không cần tham số và kiểu trả về là `void`. Một `Thread` sẽ có constructor với tham số chính là `Runnable`, khi đó một `anonymous inner class` sẽ được tạo thành
```java
public class Main {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("inside runnable using an anonymous inner class");
            }
        }).start();
    }
}
```

Khi chúng ta sử dụng `Lambda`, đoạn code trên sẽ ngắn gọn hơn rất nhiều
```java
public class Main {
    public static void main(String[] args) {
        new Thread(() -> System.out.println("inside runnable using an anonymous inner class")).start();
    }
}
```

Cú pháp `Lambda` sử dụng một `arrow` (mũi tên), để chỉ định tham số được sử dụng trong body. Trong trường hợp này, phương thức trừu tượng `run` ko có tham số nên chỉ cần `() -> `. Thân hàm trong trường hợp này chỉ có một câu lệnh nên chúng ta ko cần để khối lệnh trọn `{}`. Đây chính là một `expression lambda`. Giá trị của expression sẽ được trả về tự động. Ở đây giá trị trả về của phương thức `println` là void, do đó giá trị trả về từ `expression` cũng là void và phù hợp với giá trị trả về của phương thức `run`.

Một `lambda expression` phải phù hợp với kiểu tham số và kiểu trả về (hay còn gọi là chữ ký) của `SMA`. Một cách khác chúng ta cũng có thể assign lambda cho một biến, ví dụ
```java
Runnable r = () -> System.out.println("lambda expression implementing the run method");
new Thread(r).start();
```

Chúng ta cũng có thể hiểu `lambda` chính là body của `anonymous inner class` kế thừa interface. Điều này cũng giải thích cho việc vì sao `lambda` phải phù hợp với phương thức trừu tượng, hay nói cách khác là phải giống nhau về chữ ký. Tuy nhiên, chú ý là với `lambda` thì tên của phương thức trừu tượng là không quan trọng. Chúng ta không cần khai báo ở bất cứ đâu trong cú pháp của `lambda`.

Ví dụ trên là một ví dụ đơn giản về việc sử dụng `lambda`, vì phương thức run return void và không có tham số. Chúng ta sẽ xem xét một ví dụ khác là `java.io.FilenamFilter`, một functional interface cũng có từ phiên bản java 1.0. Một instance của FilenameFilter được sử dụng là tham số của File.list method. 

Chúng ta có thể tìm thấy định nghĩa của FilenameFilter trong `Javadoc` như sau
```java
boolean accept(File dir, String name)
```
Tham số đầu tiên chính là đường dẫn mà có thể tìm thấy file, tham số thứ hai chính là tên của file. Ví dụ sau đây chúng ta sẽ tìm những file mà có extension là `.java` trong đường dẫn chỉ định.

```java
        File directory = new File("./src/main/java");
        String[] names = directory.list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.endsWith(".java");
            }
        });
        System.out.println(Arrays.asList(names));
```

Đối với `lambda`, đoạn code trên sẽ trở thành
```java
        File directory = new File("./src/main/java");
        String[] names = directory.list((dir, name) -> name.endsWith(".java"));
        System.out.println(Arrays.asList(names));
```

Qua ví dụ trên chúng ta thấy trong cú pháp `lambda`, chúng ta không cần thể hiện kiểu của tham số. Khi compile, trình compile sẽ biết rằng phương thức `list` cần 1 tham số kiểu FilenameFilter, vì vậy nó cũng biết được kiểu tham số của phương thức SMA (accept) là File và String. Tuy nhiên, chúng ta cũng hoàn toàn có thể thể  hiện kiểu dữ liệu của tham số (tuy nhiên điều này là không cần thiết :D ).Kiểu trả về của phương thức SMA là boolean, do đó kiểu trả về của expression cũng phải là boolean. Khi thể hiện với `{}` thì chúng ta cần câu lệnh return như sau
```java
        File directory = new File("./src/main/java");
        String[] names = directory.list((dir, name) -> {
            return name.endsWith(".java");
        });
        System.out.println(Arrays.asList(names));
```

Một chú ý cuối cùng là `lambda` không bao giờ tồn tại một mình, mà nó bắt buộc phải nằm trong ngữ cảnh của của functional interface khi được implement. Mọi người chú ý nhé :D

### Method references
Nếu một `lambda expression` xử lý một phương thức như một object thì `method references` xử lý một method như một `lambda`. Chúng ta sẽ xem xét ví dụ sau để hiểu rõ hơn
```java
Stream.of(3, 1, 4, 1, 5, 9)
    .forEach(x -> System.out.println(x)); // sử dụng lambda
    
Stream.of(3, 1, 4, 1, 5, 9)
    .forEach(System.out::println); // sử dụng method reference
    
Consumer<Integer> printer = System.out::println; // gán method reference như một functional interface
Stream.of(3, 1, 4, 1, 5, 9)
    .forEach(printer);
    
```

Trong cú pháp `method reference` , double-colon được sử dụng để thể hiện reference đến phương thức println của instance `System.out`. 

`Method reference` có 2 ưu điểm so với `lambda expression`. Đầu tiên là ngắn gọn và thứ hai là nó bao gồm tên của class bao gồm method đó. Cả hai điều này làm cho code dễ đọc hơn.

`Method referece` cũng được sử dụng cho `static method`. Ví dụ Math.random như sau
```java
Stream.generate(Math::random)
    .limit(10)
    .forEach(System.out::println);
```
Tham số của static method `generate` là một Supplier, đây là một functional interface bao gồm một phương thức trừu tượng không tham số và return về một giá trị. Phương thức `random` của lớp `Math` phù hợp với chữ ký của SMA (nằm trong Supplier) vì nó cũng là phương thức không tham số, và return về một giá trị đơn. Nói cách khác, method reference Math::random được thể hiện như một sự thực thi của Supplier interface. 

Tiếp theo chúng ta sẽ tìm hiểu một số cách sử dụng `method reference`
* object::instanceMethod -> ví dụ: System.out::println
* Class::staticMethod -> ví dụ: Math::max 
* Class::instanceMethod -> ví dụ String::length 

Chú ý cách sử dụng thứ 3 rất dễ gây nhầm lẫn với static method. Chúng ta cần nhớ là cả `lambda expression` lẫn `method reference` không bao giờ tồn tại độc lập mà nó phải được thể hiện trong một ngữ cảnh nào đó. 

Cuối cùng, chúng ta sẽ xem một số ví dụ về cách chuyển đổi giữa `lambda` và `method reference` sau

```java
// equivalent to System.out::println
x -> System.out.println(x)

// equivalent to Math::max
(x,y) -> Math.max(x,y)

// equivalent to String::length
x -> x.length()
```

Hy vọng với bài viết này, các bạn sẽ hiểu thêm về `lambda expressions` và `method reference` :D

#### Cảm ơn các bạn đã đọc bài viết. Happy coding!