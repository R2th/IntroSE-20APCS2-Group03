### Grand Central Dispatch (GCD)

> Là một thư viện Apple cung cấp nhằm hỗ trợ việc chạy những tasks song song nhằm tối ưu hiệu năng cho những thiết bị có bộ xử lý đa lõi (multi core processor).
> 
### 1. Giới thiệu 
*  Là một **API** phổ biến của Apple được sử dụng để hỗ trợ việc xử lý tác vụ đồng thời trên các phần cứng đa lõi của iOS và OSx. Với **GCD**, chúng ta có thể thực hiện các thao tác sau một cách đơn giản:
   - Gửi một tác vụ đến luồng chạy ngầm(background thread) chạy song song với luồng chính(main thread).
   - Dùng chung dữ liệu giữa các luồng(mutex).
   - Lập lịch chạy cho một tác vụ.
   - Xếp các tác vụ chạy theo thứ tự.
  
*   **GCD** hoạt động dựa trên cơ chế Thread Pool: thay vì phải tạo các threads trực tiếp thì chúng ta sẽ đưa các tasks vào **Queues**. **Queues** sẽ tự động tạo và huỷ threads, còn việc tạo bao nhiêu threads thì sẽ do hệ thống quyết định dựa trên công việc của CPU đang thực thi. Do đó công việc của developers đơn giản chỉ là quản lý trên Queues mà thôi.

    **Queues**(hàng đợi):  để quản lý những tasks mà bạn submit tới và chạy chúng theo thứ tự *FIFO*. Điều này đảm bảo rằng task đầu tiên được thêm vào queue sẽ là task đầu tiên được start sau đó lần lượt các task được start theo thứ tự đến hết queue. GCD cung cấp cho chúng ta 2 loại hình của DispatchQueue là: **Serial Queues** và **Concurrent Queues**.

### 2. Serial Queues  
Là hàng đợi thực hiện tuần tự tức là chỉ có 1 task được thực hiện trong 1 thời điểm và khi nào task này thực hiện xong thì task khác mới được bắt đầu. 

**Main queue**: là queue đặc biệt có sẵn trong hệ thống và là **Serial queue**, nó chạy những tasks trên main thread của ứng dụng. Được sử dụng để update UI của app, thực hiện những task liên quan đến update UIViews hay posting notifications. Bởi vì nó là serial queue nên chỉ có một task được chạy tại một thời điểm, do đó bạn sẽ bị block UI khi chạy những task nặng trên main queue (vd: download image từ server về). Mặc định hệ thống chỉ tạo duy nhất 1 queue này.

![](https://images.viblo.asia/cc460bc2-eb72-4146-8165-500511ec2498.png)

Ở hình minh hoạ mình khởi tạo serial queue thực hiện một vài tasks, lúc này thì serial queue sẽ tạo ra một thread chạy song song với main thread để thực hiện các tác vụ này.

### 3. Concurrent Queues
Là hàng đợi thực hiện đồng thời. Trong một thời điểm có thể có nhiều task được thực hiện cùng một lúc.  Hệ thống sẽ tuỳ vào tải hiện thời của hệ thống và cấu hình phần cứng thực tế để khởi tạo và cấp phát các Threads để xử lý các tác vụ. Global queue là concurrent queue và có sẵn trong hệ thống.

Đến đoạn này chắc nhiều bạn sẽ thắc mắc là Queue hoạt động theo nguyên tắc FIFO thì liệu Concurrent queue có đảm bảo theo nguyên tắc này không nhỉ :thinking: ? 
Câu trả lời là có :open_mouth:. Tại sao lại như vậy? Thực chất nguyên tắc này thực hiện trên từng thread và trong concurrent queue thì nó được thực hiện đồng thời trên nhiều threads.

![](https://images.viblo.asia/1169f973-7f83-4318-a3ff-659e4732b4cf.png)

### 4. Synchronous và Asynchronous
Đầu vào của các queue là các *closure* hay có thể hiểu nôm na task là một block of code. Các tasks này được đánh dấu về cách thức thực hiện nó trước khi gửi đến một queue. Có hai cách thức thực hiện của một task:

*  **Synchronous**: Nếu task được đánh dấu là **Synchronous**(đồng bộ) thì về mặt cơ chế muốn đồng bộ dữ liệu sẽ phải lock các threads trong cùng queue với nó và trả quyền điều khiển cho main queue để thực thi task cần đồng bộ, sau khi task này được thực thi, nó sẽ unlock các threads và đẩy task mới vào.

![](https://images.viblo.asia/ad291500-dec8-48cb-811d-14cc87b1fdbd.png)

* **Asynchronous**: Nếu task được đánh dấu là **Asynchronous**(bất đồng bộ) thì task này được đẩy vào queue và ngay sau đó nó trả quyền điều khiển cho hàm gọi nó trong khi queue này đang thực thi một task.

![](https://images.viblo.asia/d1b19984-7c74-4a6c-80f0-27ed206628b6.png)

**Lưu ý:** Khi dùng **Serial Queue** và đặc biệt là **Main queue** thì không nên dùng **Synchronous** vì như cơ chế của Sync đã nói ở trên thì trong main queue có một thread duy nhất là main thread, nếu block nó lại thì ai sẽ là người thực thi task đưa vào. Trong khi đó thì main queue(serial queue) sẽ lại đợi cho task được thực hiện xong mới đưa task khác vào dẫn đến main thread sẽ bị lock mãi mãi và hiện tượng này gọi là **deadlock.**

### 5. Các ví dụ về GCD 

* **Ví dụ về Serial Queues** 

  - Gửi sync tasks vào trong serial queue:

     ![](https://images.viblo.asia/906088fc-0680-4de7-abcf-33896fa23cdd.png)
     
Khi gửi một task được đánh dấu là sync vào trong serial queue thì thread mà serial queue đăng kí với hệ thống sẽ bị lock lại và task đưa vào trong queue sẽ được thực thi trên main thread(đồng bộ với main thread). Khi nào task này được thực hiện xong thì thread của serial queue sẽ được unlock và đẩy task mới vào.

Kết quả xử lý sync tasks trong serial queue:
![](https://images.viblo.asia/fa0e6261-2f85-473e-b1e2-b2f0133d6edf.png)

   - Gửi async tasks vào trong serial queue:
  
![](https://images.viblo.asia/fe04506a-073c-4956-9205-519c5801d638.png)

Khi gửi một task được đánh dấu là async vào trong serial queue thì lúc này thread của serial queue sẽ không bị lock và task này sẽ được thực thi tuần tự ngay trên thread của serial queue và không đồng bộ với main thread.

Kết quả xử lý async tasks trong serial queue:
![](https://images.viblo.asia/b9dcee10-4ad4-4936-a2a8-309ad6ff3b78.png)

* **Ví dụ về Concurrent Queues** 

  -	Gửi async tasks vào trong concurrent queue:

   Ở ví dụ 10 tasks được đánh dấu là async được gửi vào trong concurrent queue. Queue này sẽ dựa vào tài nguyên hệ thống để tạo ra số threads để thực thi các tasks này. 
![](https://images.viblo.asia/ec53a17a-78c4-4995-801e-82c1f292c617.png)

  Kết quả xử lý async tasks trong concurrent queue:
![](https://images.viblo.asia/3499cfa7-edd8-4150-bf09-ec1b3ebc508b.png)

Kết quả concurrent queue tạo ra mười threads mỗi thread thực thi một task và không thằng nào chờ thằng nào.

Tuy nhiên async concurrent queue sử dụng nhiều threads để thực thi nhiểu tasks và bất đồng bộ với nhau nhưng nếu mà các tasks này cùng xử lý trên một tài nguyên thì liệu kết quả cuối cùng có chính xác hay không :thinking:?

Trường hợp này được gọi là Racing data - trạng thái mà hai hay nhiều luồng (thread) cùng truy xuất, thay đổi tài nguyên dùng chung (shared resource) một cách đồng thời. Tài nguyên dùng chung (shared resource) ở đây có thể là một thuộc tính (property), một object, một file, memory, … Bất cứ mọi tài nguyên dùng chung nào mà được chia sẽ giữa nhiều thread đều tìm ẩn nguy cơ xung đột (conflict). Dưới đây là ví dụ về Racingdata:

![](https://images.viblo.asia/eacd3765-6158-4142-898d-79fdfd956358.png)

Kết quả trả về:

![](https://images.viblo.asia/6cc64a53-1dd8-4b18-8b26-71ad2093a872.png)

Kết quả trả về không chính xác vì các tasks được xử lý bất đồng bộ với nhau, khi 1 thread này đang thực thi công việc cộng thì có một thread khác cũng đang cộng nên dữ liệu không còn được chính xác nữa. Để giải quyết chỉ cần cho các tasks này xử lý đồng bộ (được gọi là safe thread).

### 6. Tổng kết
 Vậy là bài viết của mình đến đây là hết :grin: , bài này mình mới chỉ đưa ra các ví dụ đơn giản về việc sử dụng **GCD** .
Mong rằng bài viết của mình sẽ giúp các bạn áp dụng **GCD** vào project iOS một cách nhanh chóng và đơn giản hơn. 

Cảm ơn các bạn đã theo dõi bài viết. :smiley: