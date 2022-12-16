© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

[Parallel computing hardware P2](https://viblo.asia/p/Qbq5QEER5D8) có đề cập đến khái niệm **data race**. Mục đích của bài viết này sẽ giải thích rõ hơn về **data race** và các cách xử lý với Java. Let's begin.

## 1) Data race là gì?
Với **multi-thread programming**, cần chú ý khi tương tác với các biến vì vấn đề **cache coherency** (đọc [bài trước](https://viblo.asia/p/Qbq5QEER5D8#_11-uniform-memory-access-uma-2) nếu chưa rõ nhé).
> **Data race** xảy ra khi có từ 2 thread trở lên cùng truy cập vào một vùng nhớ chung (**shared resource**) với ít nhất 1 thread thực hiện việc thay đổi giá trị trên vùng nhớ đó. Nguyên nhân xảy ra **data race**  do **cache coherency**.

Ví dụ cụ thể:
- 2 thread A và B cùng thực hiện thao tác thay đổi giá trị biến **i**.
- Biến **i** sẽ được copy từ **RAM** lên càng tầng bộ nhớ cao hơn là **L3, L2, L1 Cache** và **processor register (set of registers)** (bộ thanh ghi của CPU). Thread sẽ **không tương tác trực tiếp** với vùng nhớ chứa biến **i** ở **RAM** mà chỉ **tương tác với giá trị copy** tại **register**. Lưu ý: một processor có một tập các register được gọi là processor register hoặc set of registers, toàn bộ các register chỉ phục vụ để lưu trữ dữ liệu cho duy nhất processor đó.
- Sau khi thay đổi giá trị, biến **i** được **copy ngược trở lại RAM**.

Nếu 2 thread chạy **concurrently** với nhau sẽ đều copy giá trị hiện tại của **i**, xử lý trên giá trị đó. Sau khi hoàn tất, giá trị cuối cùng của **i** là giá trị cuối cùng được copy ngược về RAM.

> Trong thực tế, ví dụ của **data race** là bài toán kinh điển rút tiền tại cây ATM. Giả sử có 1 thẻ ATM và 1 thẻ Visa Debit cùng link đến 1 tài khoản ngân hàng và đi rút tiền cùng lúc. Trong tài khoản còn 50k vừa đủ làm bát bún real cool và cốc trà đá. Mình đồng thời rút ở cả 2 máy ATM 50k. Nếu không xử lý **data race**, mình sẽ may mắn rút được tổng cộng 100k ở cả 2 máy. 

Kết luận, **data race** có khả năng xảy ra khi:
> - Có **từ 2 thread trở lên** cùng truy cập vào **shared resource** (dữ liệu dùng chung) để đọc hoặc ghi. Cụ thể shared resource là 1 variable hoặc 1 object.
> - Có **ít nhất 1 thread** thay đổi giá trị của variable hoặc object đó. Nếu tất cả **thread** chỉ đọc dữ liệu sẽ không xảy ra **data race**.

Chờ một chút, đọc lại ví dụ trên. Nếu biến **i** được copy lên cùng 1 **processor register (set of registers)** thì sao. Nếu máy tính chỉ có duy nhất 1 processor thì có khả năng xảy ra **data race** không?

> **Note**: data race có phải race condition không nhỉ? Câu trả lời là không nhé, theo dõi [tại đây](https://viblo.asia/p/010-nham-tuong-ve-data-race-va-race-condition-bWrZnVG9Zxw) để phân biệt 2 khái niệm này.

## 2) Cách xử lý
Khi có nhiều thread ****cùng đọc và ghi**** vào shared resource, xác suất xảy ra **data race** rất cao, giống y như việc bạn **không** trúng Vietlott vậy :sweat_smile:.

Quay lại ví dụ ở bài trước, 4 cô gái và 1 chàng trai lạc trên hoang đảo, mọc ra thêm con khỉ đột to vãi đạn, vì thấy thương nên đứng ra bảo vệ anh ấy. Hãy coi 4 cô là 4 **thread**, chàng trai là **shared resource**. Khỉ đột đóng vai trò chốt chặn, đảm bảo chỉ có **duy nhất** 1 người được phép tiếp cận anh trai (bảo vệ như không, chả hiểu kiểu gì :joy:). Như vậy, không có vấn đề 2 cô gái cùng thực hiện hành động với chàng trai.

Áp dụng ví dụ trên vào lập trình, ta cần đảm bảo chỉ **duy nhất 1 thread** được truy cập vào **shared resource** tại **một thời điểm**. Từ đó sẽ giải quyết được **data race**.

![](https://i.imgur.com/IUoFiAE.png)

Trong lập trình, đoạn code dùng để ****read/write shared resource**** gọi là **critical section**/**critical region**. Có 2 tính chất:
> - Là đoạn code thao tác với **shared resource**, có thể đọc hoặc ghi dữ liệu.
> - Chỉ có **duy nhất 1 thread** được phép thực thi tại **1 thời điểm**.

Vậy, sẽ sử dụng **critical section** để giải quyết **data race**. Cụ thể, làm thế nào để implement **critical section**?

Đó là **mutual exclusion**, nó giúp chúng ta implement **critical section**. Dịch ra là **loại trừ lẫn nhau**, nghe hơi.. củ chuối. Nó mang ý nghĩa nếu A thì thôi B, nếu B thì thôi A, chỉ 1 và duy nhất 1, ai nhanh hơn thì được. 

### Mutual exclusion
Vì thấy bản thân không làm được gì nên con khỉ đột lặng lẽ rời đi (đúng là vô dụng thật). Để tránh chàng trai lẻn đi trong đêm, 4 cô gái đã khóa anh ta lại vào căn hầm bí mật (thôi xong). Sẽ chỉ có **duy nhất** 1 chiếc chìa khóa mở được căn hầm này.

Từng người sẽ **thay phiên nhau** dùng chiếc chìa đó mở cửa hầm, thao tác với **shared resource**, sau đó trả chìa khóa lại chỗ cũ. Hành động cứ liên tục lặp lại cho đến khi tất cả đều được thỏa mãn :joy:.

Việc trao đổi chìa khóa đó là cơ chế để xử lý **data race**, gọi là **mutex**. Bạn có nhận ra nó là viết tắt của **Mut**ual **ex**cluision không? Nó có các đặc điểm:
> - Là cách để xử lý ****data race****.
> - Chỉ có ****duy nhất**** một thread được sở hữu key tại một thời điểm.
> - Giới hạn quyền truy cập đến **critical section**.

Quay lại ví dụ trên, cô gái lấy được chìa khóa, thực hiện bất kì hành đồng gì với chàng trai. Sau đó trả lại chìa khóa vào chỗ cũ. 

Chuỗi hành động đó được gọi là **atomic operation** với các đặc tính:
> - Thực thi như một **thao tác duy nhất**.
> - **Quá trình thực thi không bị gián đoạn bởi bất kì thread nào**. Giống như việc một khi đã nắm được chìa khóa thì lập tức **bất khả xâm phạm**, không ai có thể làm gì cho đến khi hoàn thành công việc và bỏ chìa khóa về chỗ cũ.

Chú ý, nếu cô gái không trả chìa khóa về chỗ cũ thì mọi người còn lại cũng không thể làm gì, rơi vào trạng thái **Blocked** mãi mãi.

> Tương tự với lập trình phần mềm, sau khi acquire lock, thực thi xong đoạn code phải release lock. **Điều này rất quan trọng**. 

Cụ thể hơn với Java, có một vài cách phổ biến để implement mutex:
- **Synchronize statement** hoặc **synchronize method**.
- Sử dụng **ReentrantLook** với lock, try lock và read-write lock.
- Sử dụng các **Atomic variable** với cơ chế **CAS** (atomic operation): AtomicBoolean, AtomicInteger, AtomicLong...

Vậy, chúng ta đã nắm rõ **data race**. [Bài tiếp theo](https://viblo.asia/p/008-lock-va-lock-free-trong-java-tu-ly-thuyet-den-thuc-tien-YWOZrVvEZQ0) mình sẽ đi chi tiết vào từng cách implement mutex cụ thể với Java để ngăn chặn **data race**.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Bạn đã trả lời được câu hỏi cuối phần 1 chưa?
> Nếu biến **i** được copy lên cùng 1 processor register thì sao. Nếu máy tính chỉ có duy nhất 1 processor thì có khả năng xảy ra **data race** không?

Câu trả lời đã có trong câu hỏi. **Có khả năng xảy ra data race**. 

Giải thích: OS có thể dừng thread đang thực thi tại bất kì thời điểm nào, lưu lại data và state hiện tại. Sau đó khôi phục để tiếp tục thực thi. Trong khoảng thời gian pause đó, một thread khác sẽ thay đổi giá trị của biến **i** và lưu xuống RAM. Thread bị dừng sẽ được phục hồi lại với trạng thái cũ, và thao tác với biến **i** có giá trị cũ. Khi đó **data race** đã xảy ra.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)