© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Các cụ có câu **Sinh, lão, bệnh, tử** ý muốn nói về quy luật của cuộc đời mà bất cứ ai cũng phải trải qua. **Thread** cũng không nằm ngoài quy luật đó. Cùng đi tìm hiểu vòng đời của **thread** diễn ra như thế nào trong Java.

## Thread lifecycle
Khi mở một ứng dụng mới, nó sẽ bắt đầu với một thread đầu tiên, được gọi là **main thread**. Trong Java, **main thread** sẽ chạy đầu tiên và thực hiện lời gọi tới hàm `main(String[] args)`. 

Để tăng tốc chương trình thì **main thread** sẽ khởi tạo thêm nhiều **thread** bên trong nó, tất nhiên vẫn thuộc cùng một process và thực hiện các tác vụ độc lập với nhau. Vẫn hơi chậm, các **thread** bên trong tiếp tục tạo thêm nhiều **thread** bên trong khác để thực thi công việc (phụ thuộc vào lập trình viên có tạo thread mới không).

![](https://i.imgur.com/JSlFQkd.png)

Khi một **thread** được thực thi xong, nó báo cho parent **thread** và **kết liễu cuộc đời** của mình. Hơi sợ nhỉ, **nghỉ hưu** có được không? **Nghỉ hưu** vẫn sẽ tốn chi phí, nên chắc là.. không được. Khắc nghiệt quá.

Với OS, vòng đời của **thread** sẽ có những **state** (trạng thái) cơ bản sau:
> - **New**. Mới khởi tạo, chưa được đưa vào queue.
> - **Runnable**. Được đưa vào **queue**, chờ được thực thi.
> - **Running**. Đang được thực thi bởi processor.
> - **Blocked**. Bị dừng thực thi vì một vài lý do.
> - **Terminated**. Về với đất mẹ.

Với mỗi ngôn ngữ lập trình, sẽ có sự thêm bớt các state tuy nhiên vẫn dựa trên 5 state cơ bản trên. Với Java, **thread** có **6 state**:
> - **New**
> - **Runnable**
> - **Blocked**
> - **Waiting**
> - **Timed waiting**
> - **Terminated**

Cùng đi tìm hiểu kĩ hơn vòng đời của **thread** trong Java và các **state** nó phải trải qua.

![](https://i.imgur.com/ENZnwLa.png)

Từ kết luận ở bài trước, việc thực thi thread sẽ do OS quyết định. Đa số các ngôn ngữ lập trình trong đó có Java không có cơ hội để can thiệp vào. Vì vậy nên với thread trong Java không có state **Running**.

Ngoài ra, có 2 state mới **Waiting** và **Timed waiting**, bản chất là tập con của **Blocked**, tuy nhiên phân chia để làm rõ hơn tình trạng cụ thể của thread.

## 1) New
Khi khai báo mới một thread, nó sẽ có state **New**. Lưu ý là chưa start thread. Ví dụ, khai báo thread với Java 11:

```java
final var firstThread = new Thread(() -> System.out.println("First thread"));
final var secondThread = new Thread(() -> System.out.println("Second thread"));
```
That's easy game.

## 2) Runnable
Một vài ngôn ngữ lập trình yêu cầu chúng ta bắt buộc phải start thread một cách thủ công trong đó có Java. Chạy dòng code bên dưới:

```java
firstThread.start();
secondThread.start();
```

Sau khi start thread, nó sẽ được đưa vào **ready queue**, nhiệm vụ tiếp theo là của OS (bài trước). Chúng ta không biết thread thật sự được thực thi khi nào, thời gian thực thi là bao lâu. 

Kết quả có thể là:
```
First thread
Second thread
```
hoặc: 
```
Second thread
First thread
```
Có cách nào để kiểm soát được output không? Chuyển sang single thread thôi :joy:. Hoặc phải implement một cách khác (lượt bài sau).

## 3) Waiting
Mình thích những điều thực tế nên lấy ví dụ trước.

Chắc ai cũng đã từng chờ bạn gái (ít thì 30 phút, nhiều thì 1 vài giờ) để đưa đi.. đâu cũng được. Chàng trai (gọi tắt là **B**) và cô gái (gọi tắt là **G**), **B** đến đón **G** đi chơi cuối tuần.
- **B**: Em sắp xong chưa, anh đến rồi!
- **G**: Chờ em một chút, em xuống ngay.

Vì chưa có kinh nghiệm nên **B** chờ mốc mỏ, héo cả người mà không thấy **G** đâu.

![](https://i.imgur.com/Uj3P585.png)

Với ngôn ngữ kĩ thuật, hãy coi **B** và **G** là 2 thread. **G** sẽ phát thông báo cho **B** là chờ một chút. Tuy nhiên do chưa có kinh nghiệm nên **B** vội vàng tin lời và chờ đợi trong vô vọng. 

> Như vậy, **Waiting** là trạng thái thread này chờ thread khác và không có thời gian cụ thể.

Cụ thể với implementation, thread sẽ rơi vào trạng thái **Waiting** khi gọi các method:
```java
object.wait();
thread.join();
LockSupport.park();
```

## 4) Timed waiting
Rút kinh nghiệm lần trước, **B** đến đón **G** đi chơi:
- **B**: Em sắp xong chưa, anh đến rồi!
- **G**: Chờ em một chút, em xuống ngay.
- **B**: Chó nó tin, anh chờ em 20 phút thôi, em không xuống anh.. đi về (mạnh mồm thế chứ 2 tiếng cũng phải chờ).

> **Timed waiting** là trạng thái của thread khi chờ thread khác nhưng có thời gian giới hạn. Nếu **quá thời gian** chờ, thread tiếp tục chạy và không chờ nữa. 

Với implementation, **Timed waiting** xảy ra khi gọi các method sau, tất cả đều có tham số timeout:
```java
Thread.sleep(long);
object.wait(long);
object.wait(long, int);
thread.join(long);
thread.join(long, int);
LockSupport.parkNanos(long);
LockSupport.parkNanos(Object, long);
LockSupport.parkUntil(long);
LockSupport.parkUtil(Object, long);
```

## 5) Blocked
Về cơ bản, **Blocked** khá giống **Waiting**/**Timed waiting**. Tuy nhiên nó không diễn tả việc 1 thread chờ các thread còn lại. 

> Nó nói đến việc khi các thread cùng truy cập vào **shared resource**, chỉ có duy nhất 1 thread thành công, các thread còn lại rơi vào trạng thái **Blocked**. 

Lấy ví dụ cho sinh động và dễ hiểu. 

Bài toán có 4 cô gái và 1 chàng trai lạc trên hoang đảo (đừng nghĩ bậy nhé các bạn). Cả 4 cô gái đều muốn làm quen với chàng trai. Chàng trai sức lực có hạn chỉ tiếp được 1 cô tại một thời điểm (kém quá nhỉ, phải tay mình thì... chắc mình cũng chỉ được thế :joy:).

Các cô gái đều tỏ ra văn minh lịch sự, đưa ra thỏa thuận với nhau. Lần lượt từng người tham chiến, sau khi xong sẽ đến người tiếp theo.

Với ngôn ngữ kĩ thuật, ta có thể hiểu 4 cô gái là 4 **thread** cùng muốn truy cập vào **nguồn dữ liệu dùng chung (shared resource)** là chàng trai (phận con trai 12 bến nước). Tuy nhiên cả 4 thread không **Xabi Alonso** vào ngay mà nhường nhịn, chờ người trước xong thì mình vào, thực hiện đồng bộ (**synchronize**) với nhau. Những người chờ bên ngoài sẽ có trạng thái **Blocked**.

Cụ thể với implementation như thế nào để **thread** rơi vào **Blocked**, **synchronize** là gì, mình sẽ giải thích ở bài tiếp theo. Tạm thời ta chỉ cần hiểu được trạng thái **Blocked** là gì.

## 6) Terminated
Vẫn không thoát khỏi quy luật của cuộc đời. Sinh, lão, bệnh **tử**. 

> **Terminated** muốn nói đến trạng thái của thread khi đã hoàn thành xong sứ mệnh và trở về với cõi vĩnh hằng. 

Có nhiều cách để **terminate**, đa số sẽ quy về 2 loại:
> - **Già rồi chết**. Thread thực hiện xong công việc một cách bình thường và ra đi.
> - **Chết bất thình lình**. Tại nạn chết, bệnh nhưng không chữa nên chết. Giống như việc có exception và không handle nên thread **Terminated**.

Bài viết đã **terminated**. Subcribe để nhận thông báo khi có bài viết mới nhé.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)