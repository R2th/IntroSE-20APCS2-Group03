Java 9 là bản phát hành chính và nó đã mang lại cho chúng tôi rất nhiều tính năng dành cho nhà phát triển. Trong bài viết này, chúng tôi sẽ giới thiệu các tính năng mới của Java 9 ở mức cao.Chúng ta sẽ khám phá các tính năng này cùng với các chi tiết như những cải tiến xảy ra với các tính năng hiện có.
### Giới thiệu

Java 8 đã giới thiệu một số tính năng mới và thú vị như lambdas, streams và một số thay đổi API, Java 9 ra mắt với các tính năng phong phú như Jigsaw, Jshell (REPL), collections ...vv. Lần này, chúng ta sẽ khám phá tất cả các tính năng mới của Java 9 ở cấp độ cao. Bạn có thể lấy thông tin chi tiết về tất cả các tính năng Java 9 có sẵn JDK 9.

### 1: Java 9 Module System
Một trong những thay đổi lớn hoặc tính năng java 9 là Module System. Oracle Corp sẽ giới thiệu các tính năng sau đây như một phần của **Jigsaw Project**.

* Modular JDK
* Modular Java Source Code
* Modular Run-time Images
* Encapsulate Java Internal APIs
* Java Platform Module System

Trước các phiên bản Java SE 9, chúng tôi đang sử dụng các khối nguyên khối để phát triển các ứng dụng dựa trên Java. Kiến trúc này có rất nhiều hạn chế và hạn chế. Để tránh tất cả những thiếu sót này, Java SE 9 sẽ đến với Module System.

JDK 9 đang đến với 92 mô-đun (có thể thay đổi trong bản phát hành cuối cùng). Chúng ta có thể sử dụng các mô-đun JDK và chúng ta cũng có thể tạo các mô-đun riêng của mình như hình dưới đây:

Ví dụ mô-đun đơn giản

``` 
com.foo.bar { }
```
Ở đây, chúng tôi đang sử dụng ‘mô-đun’ để tạo một mô-đun đơn giản. Mỗi mô-đun có một tên, mã liên quan và các tài nguyên khác.

### 2: Java 9 REPL (JShell)
Oracle Corp đã giới thiệu một công cụ mới có tên là “jshell”. Nó là viết tắt của Java Shell và còn được gọi là REPL (Đọc đánh giá Print Loop). Nó được sử dụng để thực hiện và kiểm tra bất kỳ cấu trúc Java nào như class, interface, enum, object, statements ...vv rất dễ dàng.

Chúng tôi có thể tải xuống phần mềm JDK 9 EA (Early Access) từ https://jdk9.java.net/download/

```

G:\>jshell
|  Welcome to JShell -- Version 9-ea
|  For an introduction type: /help intro


jshell> int a = 10
a ==> 10

jshell> System.out.println("a value = " + a )
a value = 10
```
### 3: Collection Factory Methods
Oracle Corp đã giới thiệu một số phương pháp nhà máy thuận tiện để tạo ra danh sách không thể thay đổi các  đối tượng Set, Map và Map.Entry. Các phương thức tiện ích này được sử dụng để tạo các đối tượng Collection trống hoặc không trống.

Trong các phiên bản Java SE 8 và các phiên bản trước, chúng ta có thể sử dụng các phương thức tiện ích lớp Collections như **unmodifiableXXX** để tạo ra các đối tượng Immutable Collection. Ví dụ, nếu chúng ta muốn tạo một danh sách không thể thay đổi, thì chúng ta có thể sử dụng **Collections.unmodifiableList** đã gặp.

Tuy nhiên, các phương thức Collections.unmodifiableXXX này rất khô khan và tiếp cận dài dòng. Để khắc phục những thiếu sót đó, Oracle corp đã thêm một vài phương thức tiện ích vào các giao diện List, Set và Map.

Các giao diện List và Set có các phương thức “of ()” để tạo ra một danh sách không thể loại bỏ hoặc không có sản phẩm nào hoặc không có sản phẩm nào như hình dưới đây:

**Ví dụ danh sách trống**
```
List immutableList = List.of();
```
**Ví dụ danh sách Non-Empty**
```
List immutableList = List.of("one","two","three");
```
**Ví dụ Map**
```
jshell> Map emptyImmutableMap = Map.of()
emptyImmutableMap ==> {}
```
**Ví dụ Non-Empty Map**
```
jshell> Map nonemptyImmutableMap = Map.of(1, "one", 2, "two", 3, "three")
nonemptyImmutableMap ==> {2=two, 3=three, 1=one}
```
### 4:  Private methods in Interfaces
Trong Java 8, chúng ta có thể cung cấp phương thức thực hiện trong các Interfaces bằng cách sử dụng các phương thức Default và Static. Tuy nhiên, chúng tôi không thể tạo các phương thức Private trong Interfaces.

Để tránh mã dư thừa và khả năng sử dụng lại nhiều hơn, Oracle Corp sẽ giới thiệu các phương thức Private trong Java SE 9 Interfaces. Từ Java SE 9 on-wards, chúng ta cũng có thể viết các phương thức private static và private trong một giao diện sử dụng từ khoá ‘private’.

Các phương thức private này giống như các phương thức private khác, không có sự khác biệt giữa chúng.

**Ví dụ:**
```
public interface PrivateMethodExample {

    private static String getDBDetails(){
        return "MySQL";
    }

    private boolean checkConnection(String DBDetails){
        return  DBDetails.equalsIgnoreCase("MySQL") ? true : false;
    }

    default void checkDBConnection(){
        String dbName = getDBDetails();
        boolean isAlive =   checkConnection(dbName);  
    }
}
```
### 5:  Process API Improvements
Java SE 9 is coming with some improvements in Process API. They have added couple new classes and methods to ease the controlling and managing of OS processes.

Two new interfcase in Process API:

* java.lang.ProcessHandle
* java.lang.ProcessHandle.Info

**Ví dụ về quy trình API**
```
ProcessHandle currentProcess = ProcessHandle.current();
System.out.println("Current Process Id: = " + currentProcess.getPid());
```
### 6:  Try With Resources Improvement
Java 7 đã giới thiệu các tài nguyên cố gắng để quản lý tài nguyên một cách tự động và để đảm bảo rằng các tài nguyên sẽ bị đóng sau khi thực hiện chương trình.

Trước Java 9, để sử dụng try-with-resources, chúng ta sẽ phải sử dụng một cái gì đó như thế này:
```
void testARM_Before_Java9() throws IOException{
    try (BufferedReader br = new BufferedReader(new FileReader("https://prod-acb5.kxcdn.com/input.txt"))) {
            String line;
            while (null != (line = br.readLine())) {
                // processing each line of file
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
}
```
Hoặc cú pháp trên cung cấp rất nhiều tính năng và quản lý tự động các tài nguyên, tuy nhiên, chúng ta vẫn cần khai báo một biến cục bộ để làm việc với, Java 9 tinh chỉnh thêm cho tính năng này để tránh sự rườm rà .
```
void testARM_Java9() throws IOException{
    BufferedReader br = new BufferedReader(new FileReader("https://prod-acb5.kxcdn.com/input.txt"));

    // Java 9 make it simple
    try (br) {
        String line;
        while (null != (line = br.readLine())) {
            // processing each line of file
            System.out.println(line);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```
### 7:  CompletableFuture API Improvements
Trong Java SE 9, Oracle Corp sẽ cải thiện API CompletableFuture để giải quyết một số vấn đề được nêu ra trong Java SE 8. Chúng sẽ bổ sung để hỗ trợ một số delay và timeouts, một số phương thức tiện ích và phân lớp phụ tốt hơn.
```
Executor exe = CompletableFuture.delayedExecutor(50L, TimeUnit.SECONDS);
```
Ở đây delayExecutor () là phương thức tiện ích tĩnh được sử dụng để trả về một Executor mới gửi một tác vụ tới trình thực hiện mặc định sau khi trễ nhất định.
### 8: Reactive Streams
Bây giờ, một ngày,  **Reactive Programming** đã trở nên rất phổ biến trong việc phát triển các ứng dụng để có được một số lợi ích đẹp. Scala, Play, Akka ...vv Frameworks đã tích hợp Stream Reactive và nhận được nhiều lợi ích. Oracle Corps cũng giới thiệu API Reactive Streams mới trong Java SE 9.

Java SE 9 Reactive Streams API là một khung công bố / đăng ký để triển khai các ứng dụng không đồng bộ, có thể mở rộng và song song rất dễ dàng bằng cách sử dụng ngôn ngữ Java.

Java SE 9 đã giới thiệu API sau đây để phát triển các luồng phản ứng trong các ứng dụng dựa trên Java.

* java.util.concurrent.Flow
* java.util.concurrent.Flow.Publisher
* java.util.concurrent.Flow.Subscriber
* java.util.concurrent.Flow.Processor
### 9: Diamond Operator for Anonymous Inner Class
Chúng ta biết, Java SE 7 đã giới thiệu một tính năng mới: Diamond Operator để tránh mã dư thừa và độ dài, để cải thiện khả năng đọc. Tuy nhiên trong Java SE 8, Oracle Corp (Nhà phát triển thư viện Java) đã phát hiện ra rằng một số hạn chế trong việc sử dụng toán tử Diamond với Anonymous Inner Class. Họ đã khắc phục các vấn đề đó và sẽ phát hành như một phần của Java 9.
```
public List getEmployee(String empid){
     // Code to get Employee details from Data Store
     return new List(emp){ };
}
```
### 10: Optional Class Improvements
Trong Java SE 9, Oracle Corp đã bổ sung thêm một số phương thức mới hữu ích vào lớp java.util.Optional. Ở đây tôi sẽ thảo luận về một trong những phương pháp đó với một số ví dụ đơn giản: **stream method**

Nếu một giá trị có trong đối tượng tùy chọn đã cho, phương thức stream() này trả về một stream tuần tự với giá trị đó. Nếu không, nó sẽ trả về một stream trống.

Họ đã thêm phương thức "stream()" để làm việc trên các đối tượng tùy chọn một cách uể oải như hình dưới đây:
```
Stream<Optional> emp = getEmployee(id)
Stream empStream = emp.flatMap(Optional::stream)
```
Ở đây phương thức Optional.stream () được sử dụng chuyển đổi một luồng tùy chọn của đối tượng nhân viên thành một luồng nhân viên để chúng ta có thể làm việc trên kết quả này một cách lười biếng trong mã kết quả.
### 11: Stream API Improvements
Trong Java SE 9, Oracle Corp đã thêm bốn phương thức mới hữu ích vào giao diện java.util.Stream. Vì Stream là một interface, tất cả các phương thức được triển khai mới này là các phương thức mặc định. Hai trong số chúng rất quan trọng: phương thức dropWhile và takeWhile

Nếu bạn đã quen thuộc với ngôn ngữ Scala hoặc bất kỳ ngôn ngữ lập trình hàm nào, bạn chắc chắn sẽ biết về các phương thức này. Đây là những phương pháp rất hữu ích trong việc viết một số mã phong cách chức năng. Chúng ta hãy thảo luận về phương thức tiện ích takeWhile tại đây.

Hàm takeWhile () này lấy một vị từ làm đối số và trả về một Luồng tập con của các giá trị Luồng đã cho cho đến khi hàm Predicate trả về false lần đầu tiên. Nếu giá trị đầu tiên KHÔNG đáp ứng rằng Predicate, nó chỉ trả về một luồng trống.
```
jshell> Stream.of(1,2,3,4,5,6,7,8,9,10).takeWhile(i -> i < 5 )
                 .forEach(System.out::println);
1
2
3
4
```
### 12: Enhanced @Deprecated annotation
Trong Java SE 8 và các phiên bản cũ hơn, chú thích @Deprecated chỉ là một giao diện Marker mà không có bất kỳ phương thức nào. Nó được sử dụng để đánh dấu một API Java là một lớp, trường, phương thức, giao diện, hàm tạo, enum, v.v.

Trong Java SE 9, Oracle Corp đã tăng cường chú thích @Deprecated để cung cấp thêm thông tin về API không còn được dùng nữa và cũng cung cấp Công cụ để phân tích mức sử dụng tĩnh của các ứng dụng API không dùng nữa. Họ đã thêm hai phương thức vào giao diện Không được chấp nhận này: forRemoval và từ đó để phục vụ thông tin này.
### 13: HTTP 2 Client
Trong Java SE 9, Oracle Corp sẽ phát hành API HTTP 2 Client mới để hỗ trợ giao thức HTTP / 2 và các tính năng WebSocket. Vì API khách hàng HTTP hiện tại hoặc cũ có nhiều vấn đề (như hỗ trợ giao thức HTTP / 1.1 và không hỗ trợ giao thức HTTP / 2 và WebSocket, chỉ hoạt động ở chế độ Chặn và nhiều vấn đề về hiệu suất.), Chúng đang thay thế API HttpURLConnection này bằng HTTP mới khách hàng.

Họ sẽ giới thiệu API ứng dụng khách HTTP 2 mới trong gói "java.net.http". Nó hỗ trợ cả hai giao thức HTTP / 1.1 và HTTP / 2. Nó hỗ trợ cả chế độ đồng bộ (chế độ chặn) và chế độ không đồng bộ. Nó hỗ trợ chế độ không đồng bộ bằng cách sử dụng API WebSocket.

Chúng ta có thể xem API mới này tại: http://download.java.net/java/jdk9/docs/api/java/net/http/package-summary.html
**ví dụ HTTP 2 Client**
```
jshell> import java.net.http.*

jshell> import static java.net.http.HttpRequest.*

jshell> import static java.net.http.HttpResponse.*

jshell> URI uri = new URI("http://rams4java.blogspot.co.uk/2016/05/java-news.html")
uri ==> http://rams4java.blogspot.co.uk/2016/05/java-news.html

jshell> HttpResponse response = HttpRequest.create(uri).body(noBody()).GET().response()
response ==> java.net.http.HttpResponseImpl@79efed2d

jshell> System.out.println("Response was " + response.body(asString()))
```
### 14: Multi-Resolution Image API
Trong Java SE 9, Oracle Corp sẽ giới thiệu một API hình ảnh đa độ phân giải mới. Giao diện quan trọng trong API này là MultiResolutionImage. Nó có sẵn trong gói java.awt.image.

MultiResolutionImage đóng gói một tập hợp các hình ảnh với Chiều cao và Chiều rộng khác nhau (đó là các độ phân giải khác nhau) và cho phép chúng tôi truy vấn chúng với các yêu cầu của chúng tôi.
### 15: Miscellaneous Java 9 Features
Trong phần này, tôi sẽ liệt kê ra một số tính năng mới của Java SE 9. Tôi KHÔNG nói đây là những tính năng ít quan trọng hơn. Chúng cũng rất quan trọng và hữu ích để hiểu chúng rất tốt với một số ví dụ hữu ích.

Hiện tại, tôi không có đủ thông tin về các tính năng này. Đó là lý do tại sao tôi sẽ liệt kê chúng ở đây để hiểu rõ. Tôi sẽ lấy các tính năng này từng cái một và thêm vào phần trên với một cuộc thảo luận ngắn gọn và ví dụ. Và cuối cùng viết một hướng dẫn riêng sau này.
* GC (Garbage Collector) Improvements
* Stack-Walking API
* Filter Incoming Serialization Data
* Deprecate the Applet API
* Indify String Concatenation
* Enhanced Method Handles
* Java Platform Logging API and Service
* Compact Strings
* Parser API for Nashorn
* Javadoc Search
* HTML5 Javadoc

Tôi sẽ lấy các tính năng java 9 từng cái một và cập nhật chúng với đủ mô tả và ví dụ.

Đó là tất cả về các tính năng java 9 trong ngắn gọn với các ví dụ.
### Tham khảo
https://www.javadevjournal.com/java/java-9-features/

https://www.journaldev.com/13121/java-9-features-with-examples