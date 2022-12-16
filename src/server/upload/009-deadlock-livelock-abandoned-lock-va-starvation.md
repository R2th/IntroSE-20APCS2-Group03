© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

## 1) Deadlock
Mình thích ví dụ trực quan, nó dễ hình dung hơn so với ngôn ngữ kĩ thuật khô khan. Bắt đầu với ví dụ dưới đây.

Trở lại hoang đảo ở bài trước, chỉ còn 2 cô gái (**X** và **Y**) với 1 chàng trai. Để chắc chắn chàng trai không thể trốn thoát, X và Y tu sửa lại chìa khóa (key), và cần cả 2 key (**W** và **E**) để mở căn hầm. **W** đặt ở cực Tây, **E** đặt ở cực Đông của hòn đảo.

**X** ở gần cực Đông hơn nên lấy key **W** trước. Đồng thời, **Y** ở gần cực Tây hơn nên lấy key **E** trước. Sau đó cả 2 đảo chiều. Tuy nhiênn khi đến nơi đều không thấy key còn lại đâu (vì mỗi người đang giữ 1 key). Cả 2 đều đứng im chờ lấy đủ khóa. Kết quả, cả 2 rơi vào trạng thái **deadlock**.

![](https://i.imgur.com/mS02TnZ.png)

Với ngôn ngữ kĩ thuật, **deadlock** diễn tả:
> - **Các thread** đang tranh chấp resource với nhau, đều **các chờ thread còn lại** để thực thi tiếp.

Trong lập trình **multi-thread** với **mutual exclusion**, nếu code không cẩn thận rất dễ xảy ra **deadlock**. Khi đó, toàn bộ hoặc một phần của hệ thống sẽ dừng hoạt động (như 2 cô gái ở trên).

Vậy, làm thế nào để tránh **deadlock**?

Rút kinh nghiệm lần trước, **X** và **Y** thống nhất sẽ lấy key theo thứ tự, **W** được ưu tiên trước sau đó đến **E**. **X** chủ quan biết **W** gần mình nên dậy muộn, **Y** biết vậy nên dậy sớm và lấy được **W** trước sau đó lấy nốt **E** và mở được căn hầm. **X** bắt buộc phải chờ **Y** thực hiện xong và trả các key về chỗ cũ mới chạy được tiếp.

Đúng là trời không phụ lòng người, muốn thành công thì dậy sớm các bạn nhé :100:. 

Lý thuyết suông chưa đủ thuyết phục, bắt đầu thực hành nhé. Đoạn code bên dưới gồm 2 thread **xThread** và **yThread** với 2 key là **wKey** và **eKey**. Mỗi thread sẽ thực hiện việc mở khóa hầm 100 lần, tổng cộng 200 lần.

```java
public class Deadlock {

    private static final Lock wKey = new ReentrantLock();
    private static final Lock eKey = new ReentrantLock();
    
    private static int openCaseCount = 0;

    public static void main(String... args) {
        var xThread = new Thread(() -> {
            IntStream.range(0, 100)
                    .forEach(i -> {
                        wKey.lock();
                        eKey.lock();
                        openCase();
                        eKey.unlock();
                        wKey.unlock();
                    });
        });
        var yThread = new Thread(() -> {
            IntStream.range(0, 100)
                    .forEach(i -> {
                        eKey.lock();
                        wKey.lock();
                        openCase();
                        wKey.unlock();
                        eKey.unlock();
                    });
        });
        xThread.start();
        yThread.start();
    }

    private static void openCase() {
        ++openCaseCount;
        System.out.println("Opened case! Count: " + openCaseCount);
    }

}
```
Chạy đoạn code trên, gần như 99.999% chương trình in ra vài dòng rồi đứng im. Thực hiện thay đổi code ở yThread, lock ở **wKey** sau đó đến **eKey**, chạy lại code, chương trình chạy từ đầu đến cuối và kết thúc.

Mình sử dụng ví dụ trên để giải thích cho **deadlock** dễ hiểu hơn. Trong thực tế, không ai implement như vậy :-1: , 1 **lock** là đủ.

## 2) Abandoned lock
Quay lại ví dụ trên, cả 2 thống nhất sẽ lấy **wKey** trước, sau đó là **eKey** để giải quyết **deadlock**. **X** đã thực hiện thành công, nhưng vì quá đê mê sung sướng nên đã quên trả **key** lại chỗ cũ dẫn đến **Y** chờ đợi trong vô vọng. 

Từ đó, ta thấy việc **release lock** rất quan trọng. Nếu method **openCase** có exception mà không được handle, các method release lock sẽ không được gọi dẫn đến **Abandoned lock**. Trong lập trình, best practice là nên try catch **critical section** và đưa các method **release lock** vào finally đảm bảo việc release lock luôn chạy.

```java
var yThread = new Thread(() -> {
    IntStream.range(0, 100).forEach(i -> {
        try {
            eKey.lock();
            wKey.lock();
            openCase();
        } finally {
            wKey.unlock();
            eKey.unlock();
        }
    });    
});
```

## 3) Thread starvation
Điều kiện lý tưởng, **X** và **Y** thay phiên nhau truy cập vào căn hầm bí mật. Tuy nhiên, không có điều gì đảm bảo nó xảy ra đúng như vậy.

OS, cụ thể hơn là [**Schedular** sẽ có những thuật toán riêng, tiêu chí riêng để quyết định thread nào sẽ được thực thi và thực thi bao lâu](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N). Từ đó có thể dẫn với việc **X** được truy cập liên tục mà **Y** không được thực thi. 

Nếu xảy ra thường xuyên, **Y** rơi vào trạng thái **starving**. **Thread starvation** nói đến việc:
> - Một thread bị từ chối thực thi. Ưu tiên các thread khác.

Quay lại bài trước, **Schedular** một phần sẽ dựa trên **thread priority** để quyết định ưu tiên thread nào thực thi trước. Nếu có nhiều thread, tất cả các thread có **priority** như nhau, duy nhất 1 thread có **priority** thấp. Khả năng **thread** có độ ưu tiên thấp được thực thi gần như = 0. Do đó, cần chú ý khi thay đổi priority cho các **thread** trong lập trình.

## 4) Livelock
Do lâu ngày ở trên đảo hoang nên tình cảm chị chị em em **X** và **Y** ngày càng thắm thiết. Thay vì tranh giành nhau chìa khóa mở căn hầm bí mật, họ cứ nhường nhịn nhau mãi không thôi :revolving_hearts:. Và chị chị em em rơi vào trạng thái **livelock**. 

> **Livelock** muốn nói về:
> - Nhiều thread cùng truy cập vào **critical section** nhưng luôn chủ động nhường các thread còn lại, điều đó khiến cho tất cả đều không được thực thi (đôi khi tốt quá lại thành dở :joy:).

Trong lập trình phần mềm, **livelock** thường xảy ra khi implement thread dựa trên các phản ứng của thread khác. Hoặc khi giải quyết **deadlock** không tốt cũng có thể dẫn đến **livelock**.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)