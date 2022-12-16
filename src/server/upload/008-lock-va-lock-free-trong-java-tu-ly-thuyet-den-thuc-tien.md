© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Với bài trước, để xử lý **data race** chúng ta sẽ sử dụng cơ chế **mutual exclusion**. Bài này sẽ diễn giải rõ hơn về các cách để implement trong ngôn ngữ Java. Let's begin.

```java
public class MutualExclusion {

    private static int COUNTER = 0;

    public static void main(String... args) throws Exception {
        
        final Runnable increaseCounterFunc = () -> IntStream
                .range(0, 100)
                .forEach(Application::increaseCounter);

        final var first = new Thread(increaseCounterFunc);
        final var second = new Thread(increaseCounterFunc);

        first.start();
        second.start();
        
        first.join();
        second.join();
        
        System.out.println(COUNTER);
    }
    
    private static void increaseCounter(int i) {
        ++COUNTER;
    }
}
```

Có hai thread là **first** và **second**. Mục tiêu của bài toán là mỗi thread sẽ loop 100 lần, mỗi lần tăng giá trị của **biến dùng chung** COUNTER lên 1 đơn vị. Expect kết quả in ra màn hình là 200. 

Tất nhiên khi chạy chương trình trên, kết quả sẽ không dự đoán được. Method **increaseCounter(int i)** chính là **critical region** và không được **bảo vệ**, tất cả các thread đều có thể truy cập cùng nhau dẫn đến **data race**. Có một vài cách xử lý như sau.

### 1) ReentrantLock
Sử dụng class **ReentrantLock**, nó giống như ví dụ chiếc chìa khóa ở bài trước. Cơ chế chung là **lock** và **unlock**. Một thread có thể **lock** nhiều lần và lưu ý phải **unlock** số lần bằng số lần **lock** để chương trình thực hiện đúng (vậy nên nó có tên gọi reentrant). Giải quyết bài toán trên với **ReentrantLock** như sau:

```java
public class MutualExclusion {

    private static int COUNTER = 0;
    private static Lock LOCK = new ReentrantLock)();

    public static void main(String... args) throws Exception {
        
        final Runnable increaseCounterFunc = () -> IntStream
                .range(0, 100)
                .forEach(Application::increaseCounter);

        final var first = new Thread(increaseCounterFunc);
        final var second = new Thread(increaseCounterFunc);

        first.start();
        second.start();
        
        first.join();
        second.join();
        
        System.out.println(COUNTER);
    }
    
    private static void increaseCounter(int i) {
        lock.lock();
        lock.lock();
        ++COUNTER;
        lock.unlock();
        lock.unlock();
    }
}
```

Chạy đoạn code trên, kết quả sẽ luôn luôn là 200. **Critical region** đã được bảo vệ bởi khóa. Sẽ **khóa** trước khi thay đổi giá trị của **COUNTER** và **mở khóa** khi thực hiện xong. Do đó luôn luôn chỉ có 1 thread được truy cập để thay đổi giá trị. **Data race** được giải quyết. 

### 2) Synchronize, Insintric lock
Ngoài **ReentrantLock**, ta có **synchronize** là **intrinsic lock** (khóa bên trong, khóa nội tại). Cụ thể hơn, intrinsic lock có các loại:
> - Synchronized method.
> - Synchronized statement.
> - Mọi object trong Java có sẵn intrinsic lock.

![](https://i.imgur.com/xKM9Vee.png)

Với **synchronized method**, chỉ cần thêm từ khóa **synchronized** vào method là được. Khi đó, intrinsic lock xảy ra trên chính đối tượng gọi hàm. Nếu là static method thì intrinsic lock trên class đó. Cụ thể, ta sửa đoạn code trên như sau:
```java
private static synchronized void increaseCounter(int i) {
    ++COUNTER;
}
```
Thực thi và kết quả với mọi lần chạy không đổi = 200.

Với **synchronized statement**, ta sẽ đưa phần **critical region** vào **synchronized block** và phải khai báo đối tượng lock để thực hiện **intrinsic lock**. Sửa đoạn code trên như sau:
```java
private static void increaseCounter(int i) {
    synchronized(MutualExclusion.class) {
        ++COUNTER;
    }
}
```
Kết quả sẽ luôn là 200. 

Lưu ý với **synchronized statement**, nếu khai báo đối tượng lock không cẩn thận rất sẽ có bug phát sinh. Phải đảm bảo tất cả các thread đều được lock trên một đối tượng duy nhất không đổi trong suốt quá trình. Ví dụ, nếu khai báo như sau, kết quả sẽ không đúng:
```java
private static void increaseCounter(int i) {
    synchronized(new Object()) {
        ++COUNTER;
    }
}
```
Vì với mỗi lần cố gắng truy cập **critical section**, ta sẽ có các đối tượng khác nhau. Giống như việc 1 ổ khóa nhưng rất nhiều chìa có thể mở được, vậy khóa đó không an toàn.

### 3) Atomic variable
Với atomic variable, chúng ta sẽ chuyển biến **COUNTER** từ primitive type sang dạng object **AtomicInteger**.
```java
private static AtomicInteger COUNTER = new AtomicInteger(0);

private static void increaseCounter(int i) {
    COUNTER.incrementAndGet();
}
```
Cụ thể, Atomic variable là gì, sao chúng kì diệu đến vậy?

Với **lock** và **synchronized**, khi có nhiều thread cùng truy cập vào **critial region**, chỉ có duy nhất 1 thread thành công, tất cả các thread còn lại rơi vào trạng thái **blocked**. 

Các thread đó không tiêu tốn tài nguyên của CPU nhưng sẽ xảy ra **context switch**, nhường việc thực thi cho các thread khác, gián tiếp làm **giảm performance** của hệ thống. 

**Atomic variable** sẽ giải quyết vấn đề đó sử dụng low-level **atomic operation** (mã máy) với cơ chế **Compare and Swap** (CAS) đảm bảo tính toàn vẹn của data.

**CAS** hoạt động dựa trên operands:
> - Vị trí của bộ nhớ sẽ hoạt động (M).
> - Giá trị của biến hiện tại (A).
> - Giá trị mới của biến sau khi thay đổi (B).

Các bước thực hiện **CAS**:
> - Kiểm tra giá trị hiện tại của biến tại (M).
> - So sánh giá trị đó với (A):
>     - Nếu giá trị đó khác (A), không làm gì, kết thúc **CAS**.
>     - Nếu giá trị là (A), thực hiện việc thay đổi vùng nhớ sang giá trị (B).

Toàn bộ các bước trên thực hiện trong duy nhất một thao tác của OS, **single action**, **atomic operation**, không thể chen ngang, không thể bị gián đoạn.

Khác biệt sẽ nằm ở đây, khi nhiều thread cùng thực hiện **CAS** trên một biến, chỉ có duy nhất 1 thread truy cập thành công và thay đổi giá trị. Các thread còn lại không bị **block**, chúng vẫn thực hiện **CAS** nhưng không có gì thay đổi vì giá trị mới đã khác (A).

> Do đó, các thread không bị **block** và không xảy ra **context switch**. Có một thuật ngữ khác để diễn tả cơ chế **lock** này là **lock-free**.


### 4) So sánh
Kết luận: 
> - **Synchronize (lock)** sẽ gây ra tình trạng các thread bị **block** và xảy ra **context switch**, giảm performance của hệ thống. 
> - Với **CAS (lock-free)**, các thread sẽ không bị **block**, không xảy ra **context switch**, tránh nhược điểm của **ReentrantLock** và **Synchronize**.

Vậy, **CAS** có nhược điểm gì? Có thể hoàn toàn thay thế **synchronize** không?

**CAS** thao tác trực tiếp với memory, thực hiện phép so sánh và thay đổi giá trị. Nhờ đó các thread không bị **blocked**. Tuy nhiên đó cũng là mặt hạn chế, chương trình trở nên phức tạp hơn trong trường hợp **CAS** fail, cần thực hiện **retry** cho đến khi thành công. 

Ngoài ra, vì nó cần so sánh kết quả mới với vùng nhớ hiện tại, nếu vùng nhớ càng lớn, việc **compare** càng mất nhiều thời gian. Do đó cần lưu ý khi sử dụng các **Atomic variable** đặc biệt là **AtomicReference**.

Do đó, tùy từng bài toán và yêu cầu cụ thể để quyết định sử dụng cơ chế nào.


### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Ngoài **ReentrantLock**, **synchronized method** và **synchronized statement**, Java cung cấp thêm nhiều cách khác để thực hiện **synchronize** như:
- **Condition variable**
- **Semaphore**
- **Producer - Consumer**

Mình sẽ có bài khác nói về các cách trên. See you in next writing!

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)