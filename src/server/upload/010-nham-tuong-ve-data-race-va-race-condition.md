© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Hai vấn đề **data race** và **race condition** hay bị đánh đồng là một (có lẽ vì cùng từ **race**). Tuy nhiên nó diễn tả hai vấn đề khác nhau trong lập trình **multi-thread**.

Gần như không có bài tiếng Việt nào phân biệt về hai khái niệm này và coi chúng như nhau khi Google search, thậm chí không đề cập đến **data race**. Do đó, học tốt ngoại ngữ và đặc biệt là tiếng Anh sẽ giúp ích rất nhiều cho con đường hiện tại và sau này của chúng ta.

Lưu ý, không phải nguồn nào cũng chính thống và bài viết nào cũng đúng. Nhiệm vụ của chúng ta là đọc, phân tích và lựa chọn sự đúng đắn cho bản thân. Cũng đừng vội tin những gì mình chia sẻ mà hãy tự kiểm chứng.

![](https://i.imgur.com/CNeguid.png)

Hơi lan man, [bài trước](https://viblo.asia/p/4dbZNGvmlYM) chúng ta đã nắm rõ về **data race**, hôm nay sẽ tìm hiểu về khái niệm còn lại là **race condition** và xem chúng khác nhau như thế nào. Let's begin.

## Race condition
Quay lại khái niệm **data race**, nó xảy ra khi:
> - Từ 2 thread/process trở lên cùng truy cập vào vùng nhớ chung (shared resource).
> - Ít nhất 1 thread/process thay đổi giá trị của vùng nhớ chung đó.

Do đó, vấn đề gặp phải có thể là:
> - Các giá trị ghi đè lẫn nhau.
> - Đọc ra sai giá trị.

Việc xử lý **data race** không phức tạp, chỉ cần đảm bảo **một thread** được truy cập vào **critical section** tại một thời điểm, sử dụng cơ chế [**mutual exclusion**](https://viblo.asia/p/4dbZNGvmlYM).

Tuy nhiên, với cách làm trên chỉ đảm bảo không có **data race**, nhưng không ngăn chặn được **race condition**. Cụ thể, **race condition** nói về:
> - Vấn đề sai sót về mặt thời gian hoặc thứ tự thực thi của các thread trong chương trình khiến cho kết quả cuối cùng không đúng như mong muốn.

Trong thực tế, **race condition** xảy ra do **data race** và **data race** dẫn đến **race condition**. Không khác nhau lắm nhỉ :joy:, tuy nhiên hai vấn đề này không phụ thuộc vào nhau.
> - Một chương trình có thể có **data race** mà không có **race condition**.
> - Hoặc có **race condition** mà không có **data race**.

Loằng ngoằng thật, nhảy vào ví dụ cho dễ hình dung.

Quay trở lại vài năm trước khi **Jônny Đíp** và **Ambờ Hớp** vẫn mặn nồng thắm thiết bên nhau. Mỗi khi ra đường là cánh **paparazi** lại săn đuổi đến chạy tụt cả quần. Vì thế nên cả 2 quyết định đeo bịt kín mặt khi ra đường, vừa để che giấu thân phận cũng vừa để bảo vệ bản thân khỏi con Corona đang hoành hành.

> Câu chuyện có vẻ íu liên quan lắm nhỉ. Vào vấn đề chính đi ông ơi.

Ok, **Đíp** chợt nhận ra trong nhà chỉ còn một hộp N95 duy nhất. **Đíp** note luôn vào cuốn sổ đi chợ để đi mua không lại quên.

**Đíp** và **Hớp** đóng vai 2 **thread**, danh sách mua đồ là **shared resource**, đã có sẵn 1 hộp khẩu trang rồi. Cây bút đại diện cho **mutex**.

**Đíp** nghĩ mua thêm 3 hộp là đủ, **Đíp** lấy cây bút (đảm bảo không xảy ra **data race**), sửa lại từ 1 thành 4. **Hớp** tính thích mua sắm, **Hớp** phải mua gấp 3 mới thích. Sau khi **Đíp** viết xong,  **Hớp** lấy cây bút và sửa từ 4 thành 12. Chốt deal, mua **12 hộp khẩu trang**. Hoàn toàn không xảy ra **data race**, duy nhất 1 thread đọc ghi tại 1 thời điểm.

Hình như chưa có vấn đề gì, hãy để ý khi ta đổi ngược thứ tự thực hiện.  **Hớp** mình lấy cây bút trước, sửa từ 1 thành 3 (1 * 3). Sau đó đến lượt **Đíp** và sửa từ 3 thành 6 (3 + 3). Chốt deal, mua **6 hộp khẩu trang**.

Mặc dù đã sử dụng cây bút là **mutex** thực hiện việc truy cập đến danh sách mua sắm là **shared resource** đảm bảo không xảy ra **data race**. Tuy nhiên kết quả cuối cùng với mỗi cách thực hiện lại khác nhau vì ta không kiểm soát được thứ tự và **số lần** thực thi của các thread. Đó chính là **race condition**.

Chờ chút, tại sao không kiểm soát được **số lần** thực thi của **thread**? Bài trước mình có đề cập đến **Thread starvation**. Nếu trong cả 2 lần thực thi trên, mình không được thực hiện lần nào, kết quả sẽ là 1 * 3 * 3 = **9 hộp khẩu trang**. Kết quả không giống 2 lần trước.

> **Data race** và **race condition** là hai vấn đề khác nhau! Có **race condition** nhưng không có **data race**.

Ví dụ về **data race** mà không có **race condition** thì sao? Đơn giản thôi, là bài toán rút tiền ở ATM (bài trước).

Trong thực tế, không dễ để phát hiện ra **race condition** vì vấn đề liên quan đến thứ tự thực hiện các thread, và tất nhiên OS sẽ làm điều đó.

Ví dụ với code cho dễ hình dung:
```java
public class RaceCondition {
    public static void main(String[] args) throws InterruptedException {
        var firstThread = new Thread(() -> IntStream.range(0, 1000)
                .forEach(i -> System.out.println("First thread " + i)));
        var secondThread = new Thread(() -> IntStream.range(0, 1000)
                .forEach(i -> System.out.println("Second thread" + i)));
        firstThread.start();
        secondThread.start();
        firstThread.join();
        secondThread.join();
    }
}
```

Hai thread **firstThread** và **secondThread** chạy đồng thời và in ra 1000 dòng với mỗi thread. Không sử dụng **shared resource** nào nên chắc chắn không có **data race**. Tuy nhiên mỗi lần chạy sẽ ra kết quả khác nhau. Đó là **race condition**.

> Bạn có thể chạy đúng hàng trăm lần, test hàng nghìn lần và không có vấn đề gì xảy ra. Nhưng một ngày đẹp trời, nó xảy ra và làm sai lệch kết quả chương trình. Những bug tiềm tàng đó được gọi với cái tên **Heisenbug** (có bạn nào là fan của **Breaking Bad** không nhỉ). 

Thời sinh viên mình đã từng gặp case nếu thêm **System.out.println()** thì chương trình chạy đúng kết quả, nhưng bỏ đi thì chạy sai (smell vãi :joy:).

Với Java, có một vài cách để kiểm soát được thứ tự thực thi của thread. Lưu ý, chỉ đảm bảo thứ tự thực thi trước sau của thread chứ không chắc chắn thread được thực thi khi nào. Từ đó giải quyết được vấn đề **race condition**.

Bài sau mình sẽ trình bày chi tiết ngăn chặn **race condition**. 

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Với **single thread**, có khả năng xảy ra **data race** không?

Bản chất của **data race** là đọc sai giá trị trong **shared resource**. Trong một chương trình, nếu 2 **thread** cùng đọc/ghi vào **shared resource** (không sử dụng mutex) sẽ có khả năng xảy ra **data race**.

Vậy với **single thread** làm sao có thể xảy ra **data race** được? Mấu chốt là nếu 2 chương trình **single thread**  chạy đồng thời với nhau, cùng thực hiện đọc/ghi và **shared resource** ví dụ như: file, database... thì hoàn toàn có khả năng xảy ra **data race**.

Như vậy **data race** có khả năng xảy ra với **single thread**. Đi phỏng vấn mà được hỏi như vậy, cứ mạnh dạn trả lời như trên nhé :joy:.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)