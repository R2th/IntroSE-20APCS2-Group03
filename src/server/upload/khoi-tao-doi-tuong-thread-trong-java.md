# Khởi tạo Thread
Class `Thread`, `Object` và interface `Runnable` đều có những phương thức hỗ trợ cho concurrency trong java. `Thread` có các phương thức như `run()`, `start()` và `sleep()` rất hữu ích cho các tác vụ đa luồng. `Object` có các phương thức như `wait()` và `notify()` để hỗ trợ cho lập trình concurrency. Vì mọi class trong java đề kế thừa từ class `Object`, nên tất cả object đều có một số khả năng hỗ trợ đa luồng cơ bản. Ví dụ, ta có thể khóa  *bất kỳ* object nào trong java (sử dụng từ khóa `synchronized`- sẽ được nhắc đến ở các bài viết sau). Tuy nhiên, đối với việc *khởi tạo* thread thì các phương thức hỗ trợ của class `Object` không thực sự hữu dụng. Để giải quyết vấn đề này ta có thể extend class `java.lang.Thread`  hoặc implement  interface`java.lang.Runnable`.

Cách đơn giản nhất để thực thi một thread là sử dụng class `java.lang.Thread` (viết tắt là `Thread`). Thực thi một tác vụ với Thread là một quá trình gồm hai bước.
* Đầu tiên, xác định Thread với nhiệm vụ tương ứng sẽ được thực hiện. 
* Sau đó, bắt đầu tác vụ bằng cách sử dụng phương thức `start()`.

Lưu ý: Java sẽ không đảm bảo về thứ tự mà một thread sẽ được xử lý sau khi nó được bắt đầu. Nó có thể được thực hiện ngay lập tức hoặc bị trì hoãn trong một khoảng thời gian đáng kể.

Sau đây sẽ là cách để khởi tạo thread bằng `Thread` và `Runnable`

# Khởi tạo bằng class `Thread` 

Để khởi tạo một thread bằng cách kế thừa class `Thread` ta cần override phương thức `run()`. Nếu không, phương thức `run()` mặc định của class `Thread` sẽ được sử dụng, nó sẽ không làm gì cả. Để override `run()`, ta cần đặt nó là hàm `public`, không có tham số đầu vào và kiểu trả về là `void`. Hay nói cách khác, sẽ là `public void run()`. ta có thể thực thi một thread bằng cách gọi hàm `start()` từ một instance của class `Thread`. Khi JVM schedule thread, nó sẽ chuyển thread về trạng thái *runnable* và thực thi phương thức `run()`. Khi `run()` được hoàn thành thì thread này sẽ bị terminate. Ví dụ

```java
class MyThread extends Thread {
     public void run() {
         try {
             sleep(1000);
         }
         catch (InterruptedException ex) {
             ex.printStackTrace();
             // ignore the InterruptedException - this is perhaps the one of the
             // very few of the exceptions in Java which is acceptable to ignore
         }
         System.out.println("In run(); thread name is: " + getName());
     }
     
     public static void main(String args[]) {
         Thread myThread = new MyThread();
         myThread.start();
         System.out.println("In main(); thread name: " +
         Thread.currentThread().getName());
     }
}
```

Chương trình trên sẽ có kết quả như sau:

```
In main(); thread name is: main
In run(); thread name is: Thread-0
```

Trong ví dụ trên, class `MyThread` đã kế thừa  class `Thread`. Phương thức `run()` đã được override, nó sẽ được gọi đến khi mà thread chạy. Tại hàm `main()`, ta khởi tạo một thread mới và bắt đầu nó bằng cách sử dụng phương thức `start()`. Một điều quan trọng là, không được gọi trực tiếp đến phương thức `run()`. Thay vào đó, khi bắt đầu thread bằng cách gọi hàm `start()`, phương thức `run()` sẽ tự động được thực hiện bởi JVM.

Để lấy ra tên của thread, có thể sử dụng phương thức `getName ()`, nó trả về một String. Vì `main()` là một phương thức tĩnh nên không có quyền truy cập vào tham chiếu này. Vì vậy, phải lấy tên của thread hiện tại bằng cách sử dụng phương thức tĩnh `currentThread()` trong class `Thread` (trả về một đối tượng Thread). Bây giờ, ta có thể gọi `getName()` trên đối tượng được trả về đó. 
# Khởi tạo bằng interface `Runnable` 
`Runnable` interface là một functional interface có một phương thức duy nhất là `run()` và không yêu cầu tham số đầu vào cũng như return bất kỳ giá trị nào. Nó thường được sử dụng để xác định các công việc mà một thread sẽ thực thi, tách biệt với main thread của ứng dụng. 

```java
@FunctionalInterface public interface Runnable {
     void run();
}
```

Một cách khác để tạo một thread là implement interface `Runnable` (class `Thread` đã tự implement interface `Runnable`). Interface `Runnable` khai báo một phương thức duy nhất, `run()`. Do đó, khi implement, cần phải định nghĩa rõ ràng phương thức `run()`. Một điều quan trọng là interface `Runnable` không khai báo phương thức `start()`. Vì vậy, làm thế nào để tạo một thread bằng cách này? Câu trả lời là, Thread có một overloaded constructor, nó sẽ nhận một đối tượng `Runnable` làm tham số đầu vào. Cụ thể sẽ như sau:

```java
class RunnableImpl implements Runnable {
    public void run() {
        System.out.println("In run(); thread name is: " +
        Thread.currentThread().getName());
    }
    public static void main(String args[]) throws Exception {
        Thread myThread = new Thread(new RunnableImpl());
        myThread.start();
        System.out.println("In main(); thread name is: " +
        Thread.currentThread().getName());
    }
}
```

Chương trình trên sẽ có kết quả như sau:

```
In main(); thread name is: main
In run(); thread name is: Thread-0
```

Ở ví dụ trên, ta đã implement phương thức `run()`. Tuy nhiên, để lấy tên của thread, vẫn phải lấy thông qua `Thread.currentThread().GetName()`. Trong phương thức `main()`, để tạo một thread, ta đã truyền một object là một instance của class `RunnableImpl` cho phương thức khởi tạo của class `Thread`. Phương thức `start()` bắt đầu thread và sau đó JVM gọi phương thức `run()`.

# Thread vs Runnable
Trong trường hợp muốn biết được khi nào thì sử dụng Thread khi nào thì sử dụng Runnable để khởi tạo một đối tượng thread thì dưới đây là một số lý do để lựa chọn phương pháp này hay phương pháp kia.

- Nếu cần định nghĩa Thread một cách chi tiết , ví dụ như mức độ ưu tiên của thread thì việc extend class `Thread` sẽ phù hợp hơn.
- Vì Java không hỗ trợ đa kế thừa, nên việc extend class `Thread` sẽ không cho phép chúng ta extend thêm bất kì class nào khác nữa. Trong trường hợp này việc implement  interface`Runnable` sẽ cho phép chúng ta extend thêm một class khác.
- Implement  interface`Runnable` thường sẽ là một phương án đáp ứng được thiết kế OOP tốt hơn. Vì nó tách tác vụ đang được thực hiện ra khỏi đối tượng Thread đang thực hiện nó.
- Implement  interface`Runnable` cho phép class có thể được sử dụng bởi nhiều class concurrency API

Tuy nhiên, ngoài việc extend class `Thread` và implement interface `Runnable` thì ta có thể sử dụng `ExecutorService` như một cách tiện lợi hơn để có thể thực hiện các tác vụ liên quan đến thread mà không cần phải trực tiếp tạo các đối tượng thread

# Polling với Sleep()
Đôi khi, chúng ta cần một thread kiểm tra (poll) dữ liệu, trạng thái,.. tại một số thời điểm nhất định để tiến hành một số thao tác. Polling là một process kiểm tra dữ liệu không liên tục tại một số khoảng thời gian cố định. Ví dụ: giả sử ta có một thread cập nhật giá trị của một biến static `counter` được chia sẻ giữa các thread với nhau. Trong khi đó main thread sẽ đợi `counter` đạt giá trị 100. Được mô tả như sau:

```java
public class CheckResults {
    private static int counter = 0;
    
    public static void main(String[] args) {
        new Thread(() -> {
            for(int i=0; i<500; i++) {
                CheckResults.counter++;
            }
        })
        .start();
        
        while(CheckResults.counter<100) {
            System.out.println("Not reached yet");
        }
        
        System.out.println("Reached!");
    }
}
```

Câu hỏi đặt ra là **vòng lặp `while()` trong đoạn code trên sẽ thực hiện bao nhiêu lần và kết quả trả về sẽ in ra bao nhiêu dòng *Not reached yet* ?** Câu trả lời là, *không thể xác định được*. Kết quả có thể là không có lần nào, 10 lần hay cả nghìn lần. Thậm chí, nếu như có một thread scheduler không tốt, nó có thể sẽ chạy đến vô hạn lần. Sử dụng vòng lặp `while()` trong trường hợp này để kiểm tra dữ liệu mà không có một số kiểu độ trễ được áp dụng vào là một phương án code rất tệ vì nó khiến cho CPU resources bị chiếm dụng mà không có lý do gì cả. Chúng ta có thể tránh được việc này bằng cách sử dụng  phương thức `Thread.sleep()` để triển khai polling. Phương thức `Thread.sleep()` yêu cầu luồng hiện tại sẽ phải dừng lại trong một khoảng mili giây được chỉ định. Khi được sử dụng trong hàm `main()`, thread được dùng để thực thi hàm `main()` sẽ tạm dừng, trong khi các luồng khác sẽ tiếp tục chạy. Cụ thể như sau:

```java
public class CheckResults {
    private static int counter = 0;
    
    public static void main(String[] args) throws InterruptedException{
        new Thread(() -> {
            for(int i=0; i<500; i++) {
                CheckResults.counter++;
            }
        })
        .start();
        
        while(CheckResults.counter<100) {
            System.out.println("Not reached yet");
            Thread.sleep(1000); // 1 SECOND
        }
        
        System.out.println("Reached!");
    }
}
```

Ở ví dụ này, tạm thời bỏ qua việc phải throw`InterruptedException` thì ta đã delay 1000 mili giây ở cuối mỗi vòng lặp. Mặc dù thay đổi này là rất nhỏ, nhưng hiện ta ta đã có thể ngăn việc tạo ra một vòng lặp vô hạn và nguy cơ ứng dụng bị lock. Quay lại câu hỏi ban đầu, **vòng lặp `while()` trong đoạn code trên sẽ thực hiện bao nhiêu lần và kết quả trả về sẽ in ra bao nhiêu dòng *Not reached yet* ?** Câu trả lời vẫn sẽ là *không thể xác định được*. Mặc dù việc polling ngăn cho CPU không bị quá tải bởi một vòng lặp vô hạn có khả năng xảy ra, nhưng nó không chắc chắn được khi nào thì vòng lặp sẽ kết thúc.Ví dụ: thread tăng biến `counter` sẽ có thể sử dụng CPU một process có độ ưu tiên cao hơn, dẫn đến nhiều lần thực thi vòng lặp `while()` trước khi nó kết thúc.

Một vấn đề khác cần quan tâm là biến `counter` được chia sẻ giữa các thread. Điều gì sẽ xảy ra nếu một thread đang đọc nó trong khi một thread khác đang cập nhật lại nó? thread đọc sẽ có thể nhận được một giá trị không hợp lệ hoặc không chính xác. Đây chính là vấn đề về việc đồng bộ hóa (synchronization) sẽ được đề cập đến sau.

-----

Tài liệu tham khảo

Jeanne Boyarsky, Scott Selikoff. OCP Oracle Certified Professional Java SE 8 Programmer II Study Guide Exam