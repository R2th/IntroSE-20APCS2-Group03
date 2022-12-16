Khi đứng trước một bài toán cần cải thiện performance, chúng ta có nhiều phương pháp khác nhau. Và một trong những phương pháp đó mà mình muốn đề cập tới ngày hôm nay là xử lí đa luồng. Trong bài viết này, chúng ta cùng tìm hiểu xem đa luồng có thực sự hoàn toàn tối ưu và hiệu quả không nhé.
# 1. Process và Thread trong Java
Đầu tiên khi nói về lập trình đa luồng, chúng ta cần phân biệt được 2 khái niệm Process (tiến trình) và Thread (luồng) trong Java:
|            |  Process  | Thread |
| -------- | -------- | -------- |
| **Khái niệm**     | Một chương trình đang chạy được gọi là một **process**.     | Một chương trình chạy có thể có nhiều **thread**, Cho phép chương trình đó chạy trên nhiều luồng một cách "đồng thời".    |
| **Không gian địa chỉ**     | Mỗi **process** có một không gian địa chỉ riêng biệt.     | Tất cả **thread** thuộc một **process** chia sẻ không gian địa chỉ với nhau, hợp chúng lại thành một tiến trình.     |
| **Đa nhiệm**    | Đa nhiệm dựa trên process cho phép máy tính chạy 2 hoặc nhiều hơn 2 chương trình đồng thời. | Đa nhiệm dựa trên thread cho phép một chương trình chạy trên 2 hoặc nhiều luồng đồng thời. |
| **Giao tiếp**    | Giao tiếp giữa 2 tiến trình là tốn kém và bị giới hạn. | Giao tiếp giữa 2 thread ít tốn kém hơn so với tiến trình. |
| **Thành phần**    | Một tiến trình có: không gian địa chỉ, biến global, xử lí tín hiệu, những tiến trình con, thông tin tính toán. | Một thread có: thanh ghi, trạng thái, stack, bộ đếm chương trình. |
| **Điều khiển**    | Đa nhiệm dựa trên process không thuộc quyền kiểm soát của Java. | Đa nhiệm dựa trên thread phụ thuộc quyền kiểm soát của Java. |
| **Ví dụ**    | Khi chạy một ứng dụng Java thì đó được gọi là một tiến trình. | Một ứng dụng đếm từ trong 1000 file, có sử dụng 4 luồng để chạy đồng thời. |
# 2. Concurrency và Parallelism
Trong multi-threading có tồn tại 2 khái niệm là Concurrency (đồng thời) và Parallelism (song song). Thoạt đầu thì nghĩ chúng có vẻ giống nhau, nhưng chúng không phải là một đâu nhé.

**Concurrency** nghĩa là những tác vụ có thể bắt đầu, chạy, và hoàn thành trong những khoảng thời gian chống chéo lên nhau mà không theo thứ tự nào cả. Ví dụ: chạy trên 1 core processor. Còn **Parallelism** là nhiều tác vụ hoặc một phần của tác vụ chạy đồng thời tại cùng một thời điểm. Ví dụ: chạy trên multi-core processors.

**Concurrency** thực sự được ứng dụng khi chúng ta có ít nhất 2 tác vụ trở lên. Khi mà ứng dụng có thể thực hiện 2 task gần như cùng một thời điểm, chúng ta gọi đây là Concurent Application. Có thể chúng ta nhìn thấy nó gần như là thực hiện cùng 1 thời gian nhưng có vẻ không phải như vậy. Chúng tận dụng lợi thế của CPU time-slicing (Chia cắt thời gian) của hệ điều hành, mỗi tác vụ thực hiện nhiệm vụ của nó và chuyển sang trạng thái chờ. Khi tác vụ đầu tiên ở trạng thái chờ, CPU được gán cho tác vụ thứ 2 thực hiện nhiệm vụ của nó. Hệ điều hành dựa trên độ ưu tiên cũng từn task, sẽ phân chia CPU và tài nguyên để tính toán. Đối với người sử dụng, thấy dường như là các task được chạy một cách song song.

**Parallelism** không yêu cầu 2 task trở lên để tồn tại. Nó chạy một phần của task hoặc multi-task tại cùng 1 thời gian, dựa vào cấu trúc mult-core của CPU, bằng cách phân chia mỗi core của CPU thực hiện 1 task hoặc 1 sub-task. **Parallelism** yêu cầu phần cứng phải có nhiều đơn vị xử lí. Đối với CPU có 1 core, bạn có thể thực hiện **Concurrency** nhưng không thể là **Parallelism**.
# 3. Code ví dụ
## a. Sử dụng Thread và Runnable
Tạo một implement của Runnable:
```java
public class MyRunnable implements Runnable {

    @Override
    public void run() {
        try {
            String threadName = Thread.currentThread().getName();
            System.out.println("Running in " + threadName);
            Thread.sleep(5000);
            System.out.println("Finish in " + threadName);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
Sử dụng Thread để khởi chạy:
```java
    private static void runThread() {
        MyRunnable runnable1 = new MyRunnable();
        MyRunnable runnable2 = new MyRunnable();
        Thread thread1 = new Thread(runnable1);
        Thread thread2 = new Thread(runnable2);
        Arrays.asList(thread1, thread2).parallelStream().forEach(Thread::start);
    }
```
## b. Sử dụng ExecutorService
ExecutorService là một Java api thuộc package `java.util.concurrent`. Đầu tiên, chúng ta tạo một implement của Callable:
```java
public class MyCallable implements Callable<String> {

    @Override
    public String call() {
        String threadName = Thread.currentThread().getName();
        System.out.println("Running in " + threadName);
        try {
            Thread.sleep(5000);
            return threadName;
        } catch (InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```
Sử dụng ExecutorService để khởi chạy:
```java
    private static void runConcurrency() throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(4);
        MyCallable callable1 = new MyCallable();
        MyCallable callable2 = new MyCallable();
        List<Future<String>> futures = executor.invokeAll(Arrays.asList(callable1, callable2));
        futures.parallelStream().forEach(future -> {
            try {
                String result = future.get();
                System.out.println("Finish in " + result);
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        });
        executor.shutdown();
    }
```
# 4. Tổng kết
Nhìn chung, multi-thread là một công cụ rất tốt để tăng perfomance của ứng dụng, tận dụng được những tài nguyên hệ thống máy tính để tăng tốc cho ứng dụng của chúng ta. Nhưng cũng không vì thế mà quá lạm dụng multi-thread vì nó cũng sẽ làm tiêu tốn rất nhiều tài nguyên máy tính: CPU, bộ nhớ để thực thi.

Tham khảo:
[Concurrency vs. Parallelism](https://howtodoinjava.com/java/multi-threading/concurrency-vs-parallelism/)

Code demo: https://github.com/vannn-1601/demo-multi-thread