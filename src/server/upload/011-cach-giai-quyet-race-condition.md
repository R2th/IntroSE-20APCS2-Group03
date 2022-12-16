© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

[Bài trước](https://viblo.asia/p/010-nham-tuong-ve-data-race-va-race-condition-bWrZnVG9Zxw) ta đã kết luận được **race condition** muốn nói về:
> - Vấn đề sai sót về mặt thời gian hoặc thứ tự thực thi của các thread trong chương trình.

Để tránh **race condition**, ta cần cơ chế **synchronize** khác đảm bảo được việc thực thi đúng thứ tự. 

Với Java, có một vài cách kiểm soát được thứ tự thực thi của thread. Lưu ý, chỉ đảm bảo thứ tự thực thi trước sau của thread chứ không chắc chắn thread được thực thi khi nào. Từ đó giải quyết được vấn đề **race condition**.

## 1) Barrier
Đầu tiên là **Barrier**, là cái rào chắn thường thấy khi đi ở khu vực đèo núi nguy hiểm, ngăn cách đường nhựa và vực sâu. Trong lập trình, **Barrier** mang ý nghĩa:
> - Ngăn chặn một nhóm các **thread** được thực thi cho đến khi tất cả các **thread** đều **chạm** tới **barrier**.

Hơi khó hiểu, ví dụ như sau.

![](https://i.imgur.com/c6qXW0q.png)

Anh em văn phòng hay có thú vui giao lưu võ thuật (là chính) và bóng đá (là phụ) với nhau. Mỗi team gồm 7 thành viên, đến sớm muộn đều được, nhưng phải đủ 7 người trận đấu mới bắt đầu. Thiếu 1 cũng không được.

> Như vậy, có thể coi 7 thành viên là 7 **thread** và thời gian giới hạn (19h tối) là **barrier**. Tất cả các **thread** trong group cần **chạm** tới **barrier** mới có thể tiếp tục thực thi. Lưu ý, một group có thể bao gồm **một** hoặc **nhiều** thread.

Quay lại ví dụ bài trước về việc mua hộp khẩu trang. Với **barrier**, flow thực hiện sẽ như sau.

![](https://i.imgur.com/beoxBJQ.png)

Với **barrier** ta đã giải quyết được vấn đề. Không cần quan tâm đến việc OS sẽ thực thi thread khi nào, thời gian bao lâu, tần suất ra sao, kết quả cuối cùng sẽ không thay đổi.

Lý thuyết đủ rồi, đi vào thực hành. Trong Java, có 2 class dựa trên tư tưởng của **barrier** để giúp ta implement:
> - CyclicBarrier
> - CountDownLatch

Sử dụng ví dụ mua hộp khẩu trang làm bài toán. Bao gồm 6 lần tính toán, mỗi người 3 lần. Chú ý, method **addMask()** là **synchronized method**, đảm bảo không sảy ra **data race**.

```java
public class RaceCondition {

    public static void main(String... args) throws InterruptedException {
        final var shoppers = IntStream.range(0, 6)
                                      .mapToObj(Shopper::new)
                                      .collect(Collectors.toList());
        // Chạy toàn bộ các thread
        shoppers.forEach(Thread::start);
        // Chờ tất cả thread hoàn thành
        for (var shopper : shoppers) {
            shopper.join();
        }
        System.out.println("Total packs: " + Shopper.MASK_PACK_COUNT);
    }
}

class Shopper extends Thread {

    static int MASK_PACK_COUNT = 1;

    Shopper(int i) {
        setName(i % 2 == 0 ? "Husband" : "Wife");
    }

    @Override
    public void run() {
        addMask(getName());
    }

    static synchronized void addMask(String threadName) {
        if ("Husband".equals(threadName)) {
            MASK_PACK_COUNT += 1;
            System.out.println("Husband adds 1 pack");
            return;
        }
        MASK_PACK_COUNT *= 3;
        System.out.println("Wife multiple 3 times");
    }
}
```
Khi chạy code trên nhiều lần, thứ tự các thread thực khi khác nhau dẫn đến kết quả khác nhau.
```
# Kết quả lần 1

Husband adds 1 pack
Wife multiple 3 times
Husband adds 1 pack
Wife multiple 3 times
Wife multiple 3 times
Husband adds 1 pack
Total packs: 64
```

```
# Kết quả lần 2

Husband adds 1 pack
Wife multiple 3 times
Wife multiple 3 times
Wife multiple 3 times
Husband adds 1 pack
Husband adds 1 pack
Total packs: 56
```

Có thể hình dung cách thực hoạt động của nó với hình minh họa bên dưới.

![](https://i.imgur.com/bFHpbAz.png)

Khi implement với **barrier**, ta mong muốn nó sẽ hoạt động với thứ tự không đổi, ví dụ như mô hình bên dưới. Sẽ thực hiện 3 lần **+1** trước sau đó là 3 lần **x2**.

![](https://i.imgur.com/pbL9H52.png)

## 2) CyclicBarrier
Thực hiện implement **barrier** với **CyclicBarrier** như sau:
```java
public class RaceCondition {

    public static void main(String... args) throws InterruptedException {
        final var shoppers = IntStream.range(0, 6)
                                      .mapToObj(Shopper::new)
                                      .collect(Collectors.toList());
        // Chạy toàn bộ các thread
        shoppers.forEach(Thread::start);
        // Chờ tất cả thread hoàn thành
        for (var shopper : shoppers) {
            shopper.join();
        }
        System.out.println("Total packs: " + Shopper.MASK_PACK_COUNT);
    }
}

class Shopper extends Thread {

    static int MASK_PACK_COUNT = 1;
    static CyclicBarrier BARRIER = new CyclicBarrier(6);

    Shopper(int i) {
        setName(i % 2 == 0 ? "Husband" : "Wife");
    }

    @Override
    public void run() {
        addMask(getName());
    }

    static void addMask(String threadName) {
        if ("husband".equalsIgnoreCase(threadName)) {
            synchronized (Shopper.class) {
                MASK_PACK_COUNT += 1;
                System.out.println("Husband adds 1 pack");
            }
            waitAtBarrier();
            return;
        }
        waitAtBarrier();
        synchronized (Shopper.class) {
            MASK_PACK_COUNT *= 3;
            System.out.println("Wife multiple 3 times");
        }
    }

    static void waitAtBarrier() {
        try {
            BARRIER.await();
        } catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }
    }
}
```

Khi chạy trương trình trên, kết quả luôn luôn không đổi.
```
Husband adds 1 pack
Husband adds 1 pack
Husband adds 1 pack
Wife multiple 3 times
Wife multiple 3 times
Wife multiple 3 times
Total packs: 108
```
Nó được gọi là **CyclicBarrier** vì có thể được sử dụng lại khi tất cả các thread được giải phóng, hoặc khi gọi method **reset**. Có một vài **method** hữu ích trong **CyclicBarrier**:
```java
// Với ví dụ giao lưu võ thuật bóng đá

// Tổng số thread để giải phóng barrier: 7
int getParties();

// Số lượng thread đang chờ: số người đã có mặt trên sân
int getNumberWaiting();

// Reset về trạng thái ban đầu, getNumberWaiting() = 0
void reset();
```

## 3) CountDownLatch
Có một loại **barrier** khác chỉ dùng một lần, không thể sử dụng lại. Đó là **CountDownLatch**. Mục đích của **CountDownLatch** cũng khác so với **CyclicBarrier**, cụ thể nó cho phép **một** hoặc **nhiều** thread cùng chờ cho đến khi một chuỗi các hành đông/phép toán/nhiệm vụ được thực thi xong.
> - **CountDownLatch** được khởi tạo với một biến đếm (> 0).
> - Method **await()** sẽ chờ cho đến khi biến đếm đó về mức 0.
> - Method **countDown()** sẽ trừ biến đếm đó cho 1.

So sánh giữa **CyclicBarrier** và **CountDownLatch**:
> - **CyclicBarrier** sẽ giải phóng các thread đang chờ khi tất cả các thread đang chờ đó đạt đến một giá trị nhất định. **CountDownLatch** giải phóng các thread đang chờ khi giá trị biến đếm trở về 0.
> - **CyclicBarrier** có thể sử dụng lại. **CountDownLatch** không thể sử dụng lại. Sử dụng lại mang ý nghĩa reset về trạng thái ban đầu.

Ta sẽ implement **barrier** với **CountDownLatch** dưới đây. Lưu ý chỉ cần thay đổi class **Shopper**:

```java
class Shopper extends Thread {

    static int MASK_PACK_COUNT = 1;
    static CountDownLatch CDL = new CountDownLatch(3);

    Shopper(int i) {
        setName(i % 2 == 0 ? "Husband" : "Wife");
    }

    @Override
    public void run() {
        addMask(getName());
    }

    static void addMask(String threadName) {
        if ("husband".equalsIgnoreCase(threadName)) {
            synchronized (Shopper.class) {
                MASK_PACK_COUNT += 1;
                System.out.println("Husband adds 1 pack");
            }
            CDL.countDown();
            return;
        }
        waitAtBarrier();
        synchronized (Shopper.class) {
            MASK_PACK_COUNT *= 3;
            System.out.println("Wife multiple 3 times");
        }
    }

    static void waitAtBarrier() {
        try {
            CDL.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

Ý nghĩa của đoạn code trên, sau khi các thread **husband** hoàn thành công việc, biến **CDL** trở về 0. Lúc ấy, các thread **wife** được giải phóng và chạy. Kết quả các lần chạy đều như nhau và giống kết quả khi chạy với **Cyclic Barrier**.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)