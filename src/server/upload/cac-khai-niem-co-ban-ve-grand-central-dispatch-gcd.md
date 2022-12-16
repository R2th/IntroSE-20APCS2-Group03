Khái niệm về GCD mình sẽ ko nhắc lại nữa. Bài viết hôm nay mình chỉ muốn nêu ra 1 số định nghĩa rõ ràng cho người mới học về GCD. Để nắm rõ về GCD các bạn cần hiểu các khái niệm sau đây:
1. Serial Queue  và Concurrent Queue
2. Thread
3. Các hàng đợi của GCD
4. Sync and Async
5.  Không chạy  DispatchQueue.main.sync trên main thead
6.  Các ví dụ về GCD

-----
Hàng đợi là tập hợp các task , chạy trên chính luồng chính hoặc chạy trên nền.

Task  theo nghĩa đen là 1 khối code được gán cho hàng đợi và nó có thể được sử dụng nhiều lần(được sử dụng lại). Việc thực hiện các task phải tuân theo  quy tắc FIFO(First in, First out) .

Một  hàng đợi chứa nhiều task , mỗi task có thể thực thi theo kiểu serial hoặc  concurrent. Một chuỗi các task  được thực hiện serial , nếu task này được thực hiện xong thì các task khác mới được thưc hiện.
Mặt khác 1 chuỗi các task được thực hiện Concurrent nếu nhiều task cùng thực thi cùng 1 lúc.
# 1. Serial Queue  và Concurrent
##  Serial queue: 
* Thưc hiện các task một cách tuần tư. Một task chỉ được thực hiện khi mà task phía trước nó trong hàng đợi đã thực hiện xong và kết thúc. Thứ tự các task được nhập vào hàng đợi chính cũng chính là thứ tự các task được thực hiện và kết thúc.
##  Concurrent queue:
*  Các task được thưc hiện 1 cách đồng thời.Khi các task nhập vào hàng đợi thì các task này có thời gian bắt đầu thực hiện gần như bằng nhau , nhưng tuỳ thuộc vào mỗi task mà chúng có thời gian hoàn thành khác nhau.
![](https://images.viblo.asia/4c91924b-cb5a-42ed-834e-fac1def66760.png)

**Note:** **Mỗi 1 ô vuông được đánh số thứ tự là 1 task. Mỗi 1 task theo nghĩa đen chính là 1 khối block code.**
# 2. Thread là gì
Hiểu đơn giản nó là các luồng để thực hiện các task trong hàng đợi.
Vậy serial, concurrent queue có mấy luồng?
Serial queue chỉ có 1 luồng duy nhất còn concurrent queue thì có nhiều luồng.
![](https://images.viblo.asia/96c6da80-3715-4783-b30b-12bcfb9706dc.png)

Nhìn trên hình: Nếu queue là concurrent queue và có 2  thread  thì chương trình sẽ chia các task trong hàng đợi cho 2 thread 1 và 2 ,để các thread  thực hiện các task.
# 3. Các hàng đợi của GCD
1.  Main queue( nó chính là serial queue nó chạy các task trên main thread): Sử dụng để cập nhật giao diện người dùng sau khi hoàn thành công việc trong 1 task của concurrent queue.
2. Global queue( là concurrent queue): Sử dụng để thực hiện các công việc không phải giao diện người dùng dưới background.
3. Customer queue(nó có thể là serrial queue  hoặc concurrent queue)

### Ví dụ: 
![](https://images.viblo.asia/2e588845-8c96-4f5d-994a-9f81609d80f8.png)
# 4. Sync and Async
* **Sync**: Thực thi các tác vụ một cách đồng bộ với hàng đợi hiện tại.
![](https://images.viblo.asia/2c0293c8-2135-4bbc-92e7-1d47ee476e87.png)
Current queue sẽ bị block để task trên different queue thực thị.

Mình sẽ viết 1 ví dụ để các bạn hiểu rõ hơn: 

Hàng đợi queue chạy với phương thức sync:
![](https://images.viblo.asia/3521cf43-3a88-48ba-b465-b5d5b18013f9.png)

Chương trình sẽ dừng task B đang chaỵ trên main thread để cho task A đang chạy trong hàng đợi queue thực hiện vì nó đang chạy sync.
Kết quả:
![](https://images.viblo.asia/b8fe550a-8b32-4367-be20-0ecaa0d197df.png)

* **Async**: chạy bất đồng bộ với hàng đợi hiện tại, xử lý công việc song song với hàng đợi hiện tại.Nghĩa là chương trình sẽ trả điều khiển về hàng đợi hiên tại ngay lập tức sau khi mà khởi chạy task trên hàng đợi khác mà không chờ task trên hàng đợi hiện tại kết thúc.
![](https://images.viblo.asia/4afd38c9-6356-45fb-afe8-4821b3e290bd.png)
Nếu chúng ta thay đổi hàng đợi queue chạy với  phương thức async: thì chương trình sẽ chaỵ task A trên hàng đợi queue và task B trên main thread cùng 1 lúc:
![](https://images.viblo.asia/fbf3b6d6-b77e-4fa7-93b1-99bd87ddcc6c.png)

Kết quả: 
![](https://images.viblo.asia/7f60f089-6c10-4930-9872-a6797392cdbe.png)
# 5.  Không chạy  DispatchQueue.main.sync trên main thead!
[](https://images.viblo.asia/5462909c-ab93-4525-bb38-4ba4077ffcd5.png)
Khi chúng ta gọi phương thức sync trên main thread thì ứng dụng sẽ bị crash app , vì DispatchQueue.main là 1 serial queue nó chỉ có duy nhất 1 thread . Khi gọi phương thức sync thì chương trình sẽ block luồng chính,  luồng chính sẽ đợi các task thực hiện xong nhưng các task sẽ không bao giờ hoàn thành vì nó sẽ không thể bắt đầu do hàng đợi bị block ⇒ **hiện tượng deadlock.**
Mình sẽ nêu ra 1 ví dụ về deadlock:
![](https://images.viblo.asia/3e917319-48ad-4a38-8960-79a6cefca6df.png)

In Apple docs, it says:
Important: You should never call the dispatch_sync or dispatch_sync_f function from a task that is executing in the same queue that you are planning to pass to the function. This is particularly important for serial queues, which are guaranteed to deadlock, but should also be avoided for concurrent queues.

“Important: Bạn không bao call dispathch_sync từ một task  đang thực hiện trong cùng một hàng đợi. Điều này quan trong đặc biệt quan trọng đối với serial queue vì dẫn đến hiện tượng deadlock nhưng cũng nên tránh đối với concurrent queue. ”
# 6. Các ví dụ về GCD
Mình sẽ nêu ra 1 số ví dụ các bạn hãy tự đoán kết quả để hiểu hơn về GCD nhé:

VD1:
Hỏi: Khi mình tạo 1 concurrent queue chạy với phương thức async thì nó sẽ in ra lần lượt các giá trị của i hay in ra 1 cách lộn xộn ?
![](https://images.viblo.asia/4796a355-5f2a-4a82-912e-5831d9bd98c9.png)

Trả lời: Tuy đây là concurrentQueue có nhiều thread để chạy các task song song cho thực hiện với phương thức async nhưng các giá trị i vẫn in ra lần lượt đơn giản là cả vòng lặp for chỉ là 1 task duy nhất. 
Câu hỏi này mình đã từng bị các anh phỏng vấn hỏi, đây chỉ là câu hỏi mẹo 😄.

VD2: 
Hỏi : khi  chạy như code bên dưới nó sẽ in ra như thế nào?
![](https://images.viblo.asia/7e5fed2a-f60c-419e-a68e-737ecc2500dc.png)
Trả lời: Câu này dễ phải không mình có giải thích 1 chút ở phần Sync, các bạn tự trả lời nhé.

VD 3: 
Hỏi : 2 hàng đợi firstQueue và secondQueue có độ ưu tiên bằng nhau cùng chạy với phương thức sync thì kết quả sẽ in ra như thế nào
![](https://images.viblo.asia/59199875-f234-42a0-98f8-e2b039876bbe.png)
Kết quả : các bạn tự viết code run nhé
Trả lời: Vì chạy với phương thức sync nên hàng đợi secondQueue sẽ bị block để hàng đợi firstQueue thực hiện task trước sau khi task firstQueue thì chương trình mới chạy task secondQueue.

Cũng đoạn code trên nhưng mình thay thành async thì sao:
![](https://images.viblo.asia/e60040f5-222e-4660-aac2-1623b0557a0f.png)
Trả lời : Các bản hãy tự nghĩ và tự giải thích xem, đơn gian mà đúng ko !

VD4: cũng Ví dụ như trên nhưng mình thay đổi độ ưu tiên, Các bạn có bao giờ tự hỏi mình độ ưu tiên của các các hàng đợi nó có ý nghĩa gì
![](https://images.viblo.asia/10aa2d29-4465-460f-92bf-a37d64df3ec9.png)

Kết quả: 
![](https://images.viblo.asia/0f03b7c1-e887-4f44-a669-6eb00183641a.png)
Trả lời: Hàng đợi thứ hai có độ ưu tiên cao hơn hàng đợi thứ nhất, hệ thống sẽ cung cấp tài nguyên cho hàng đợi thứ hai vì nó được đánh dấu là hàng đợi quan trọng . Một khi hàng đợi thứ hai hoàn thành thì hệ thông sẽ cung cấp tài nguyên cho hàng đợi thứ nhất.



**Bạn viết tuy còn sơ sài nhưng cũng là 1 tài liệu cho những bạn mới tiếp xúc về GCD hiểu và nắm rõ kiến thức cơ bản để học tiếp các phần DispatchGroup, NSOperation.**

**Tài liệu tham khảo: **
- https://www.appcoda.com/grand-central-dispatch/
- https://medium.com/shakuro/introduction-to-ios-concurrency-a5db1cf18fa6
- https://medium.com/@nimjea/grand-central-dispatch-in-swift-fdfdd8b22d52
- https://swiftludus.org/using-grand-central-dispatch-and-concurrency-in-ios/