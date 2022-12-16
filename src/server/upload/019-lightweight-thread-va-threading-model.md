© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Với [bài trước](https://viblo.asia/p/018-cooperative-va-preemptive-trong-multi-tasking-Qpmleeqklrd), chúng ta đã hiểu về **cooperative scheduling** và **preemptive scheduling**. Điều tiếp theo cần quan tâm trước khi thực hiện optimize multi-thread programming là hiểu về **threading model** và thuật ngữ **lightweight thread** với bài cuối cùng trong series. Let's begin.

## 1) Lightweight thread
Kết luận từ bài trước, **thread**/**OS thread** là đơn vị cơ bản để CPU thực thi thông qua cơ chế **scheduling** của **Schedular**. Vậy **lightweight thread** là gì? Giống tên gọi của nó, nếu **lightweight thread** lightweight hơn **OS thread** thì **Schedular** làm việc với nó như thế nào?

> [From Techopedia](https://www.techopedia.com/definition/24784/lightweight-thread): A lightweight thread is a computer program process, normally a **user thread**, that can share address space and resources with other threads, **reducing context switching time during execution**.

Vậy, có thể hiểu **lightweight thread** là **user thread**, nó share chung địa chỉ vùng nhớ với nhau. Vẫn chưa thấy sự khác biệt so với thread thông thường. Tuy nhiên, nó giúp giảm context switch khi thực thi so với thread thông thường? Làm cách nào nó làm được điều đó, và **user thread** là gì?

Thật ra, gọi là **lightweight thread** để phân biệt và so sánh với **thread** thông thường (OS thread):
> - Cần ít thời gian để xử lý hơn.
> - Cần ít bộ nhớ hơn trong quá trình khởi tạo.
> - Chi phí tạo mới hoặc hủy bỏ ít tốn kém hơn.

Lưu ý rằng, **thread** (OS thread) vẫn là đơn vị cơ bản nhất để **Schedular** tiến hành phân phối đến cho các processor xử lý. Do đó, **lightweight thread** chỉ mang ý nghĩa phân biệt và so sánh với **OS thread**. Cùng đi tìm hiểu kĩ hơn về **lightweight thread**/**user thread** với **Threading model**.

## 2) Threading model
Đứng từ góc nhìn hệ điều hành có 2 loại thread (type of thread) là:
> - **CPU thread - Hardware thread**: luồng xử lý của processor. Thông thường mỗi processor xử lý một luồng, với những CPU hỗ trợ [**hyper-threading**](https://viblo.asia/p/012-su-that-ve-hyper-threading-63vKjdEbl2R) có thể xử lý được hai luồng **đồng thời** với nhau. 
> - [**OS thread - Software thread**](https://viblo.asia/p/003-thread-va-process-gDVK2eeA5Lj#_2-thread-1): các luồng thực thi code được quản lý bởi **OS** và điều phối bởi **Schedular**. Với Java, một thread (``new Thread()``) mapping với một OS thread để được thực thi. Lưu ý thread trong Java không phải OS thread, nó chỉ là mapping 1-1 nhé.

Tuy nhiên với **threading model** ta quan tâm đến level of thread là:
> - **Kernel-level thread**: chính là **OS thread**, là đơn vị cơ bản nhất được quản lý/thực thi bởi **Schedular** và **OS**.
> - **User-level thread**: thứ chúng ta cần quan tâm là đây, còn được gọi là **green-thread** hoặc **lightweight-thread**. **OS** và **Schedular** chỉ quản lý **OS thread**, do đó nó không biết gì về sự tồn tại của **lightweight-thread**. Vậy **lightweight-thread** do ai quản lý? Chính là tầng application, nói cách khác nó được kiểm soát ở [**user-space**](https://viblo.asia/p/001-so-luoc-ve-linux-kernel-gDVK2e7j5Lj#_3-tong-quan-kien-truc-gnulinux-2). Như vậy, developer/engineer chúng ta hoàn toàn có thể tự code **Schedular** để quản lý các **lightweight-thread** này.

May mắn thay đã có rất nhiều lib hỗ trợ và nó đem lại lại lợi ích nhất định thì cộng đồng mới tập trung vào nhiều đến vậy. Với 2 level of thread trên, ta phân loại được thành 3 threading model là:
> - Kernel-level threading model.
> - User-level threading model.
> - Hybrid threading model (kernel-level & user-level).

### 2.1) Kernel-level threading model
Việc khởi tạo thread thực ra không đơn giản. Java là high-level programming language, nó đã support chúng ta rất nhiều trong việc tạo ra thread với **Thread** class hoặc **ExecutorService**. Java làm rất nhiều thứ bên dưới, thông qua [**system call**](https://viblo.asia/p/001-so-luoc-ve-linux-kernel-gDVK2e7j5Lj#_3-tong-quan-kien-truc-gnulinux-2) và mapping **programming thread** với **OS thread**.

![](https://i.imgur.com/jQsUsVE.png)

Với việc mapping 1 - 1 như vậy, các Java thread sử dụng chung **Schedular** với hệ điều hành nên hưởng trọn nhược điểm của [**preemtive scheduling**](https://viblo.asia/p/018-cooperative-va-preemptive-trong-multi-tasking-Qpmleeqklrd#_4-preemptive-scheduling-3). Càng nhiều thread, context switch xảy ra càng thường xuyên, ít nhiều ảnh hưởng đến performance của hệ thống.

Không thể phủ nhận ưu điểm của **preemptive scheduling** so với thế hệ trước là **cooperative scheduling**, tuy nhiên cần nhìn vào nhược điểm của nó để cải thiện tốt hơn.

### 2.2) User-level threading model
Với user-level threading model, các user-thread (lightweight thread) được mapping N - 1 với OS thread. Ta cần một bộ **Schedular** riêng để quản lý việc này trong quá trình runtime. Tất nhiên, việc quyết định cơ chế **preemtive scheduling** hay **cooperative scheduling** lúc này do các developer/engineer, không còn phụ thuộc vào OS. **Context switch** xảy ra ở application, dễ dàng kiểm soát hơn, cost dành cho nó cũng giảm đi nhiều so với **OS thread** và **process**.

![](https://i.imgur.com/mOjp8s6.png)

Nhìn vào mô hình trên, dễ dàng nhận thấy nhược điểm của nó là không tận dụng được sức mạnh của **multi-threading** với **multi-processors**.


### 2.3) Hybrid threading model
Hybrid threading model tận dụng ưu điểm của cả 2 mô hình trên và kết nối chúng lại với nhau. Các kernel-level thread vẫn có thể thực thi song song trên môi trường **multi-processors**, đồng thời các user-level thread được sử dụng để thực thi đồng thời với nhau. Như vậy, context switch được chuyển một phần từ low-level lên high-level, dễ dàng kiểm soát, quản lý hơn, từ đó tăng performance cho hệ thống.

![](https://i.imgur.com/ukJGtOb.png)

Java core đang áp dụng mô hình đầu tiên: kernel-threading model để thực hiện multi-thread programming. 

Gần đây, Golang nổi lên với lời quảng cáo xử lý các bài toán high CCU (concurrent user) và hỗ trợ multi-thread programming cực tốt. Sự thật đằng sau nó chính là **hybrid threading model** với **lightweight-thread**. Cụ thể trong Golang chính là **goroutine**. 

Với Java, hiện tại có vài libraries đã implement dựa trên **hyper-threading model** để giúp xử lý các bài toán **multi-threading** tốt hơn, ví dụ: Project Loom, Akka, RxJava...

## 3) Memory model với Cooperative scheduling
Ở bài trước, chúng ta đã biết về cách một chương trình hoạt động, một đoạn code được thực thi, cụ thể với các bước cơ bản sau:
- Toàn bộ thông tin về chương trình như instruction (code), data... được load vào RAM.
- CPU/Processor là nơi thực thi các instruction đó, với data được lưu trữ ở processor register (set of registers).

Dung lượng của processor register là rất nhỏ, nó chỉ lưu trữ các data đang được xử lý hoặc chuẩn bị được xử lý. Các data/instruction được copy từ RAM lên các bộ nhớ đệm Cache L1, L2, L3 sau đó đến processor register. Sau khi thực thi xong, các data đó được gửi ngược trở lại RAM. Nó là nguyên nhân chính dẫn đến các vấn đề liên quan tới **multi-thread programming**.

Ta cần các cơ chế [synchronize](https://viblo.asia/p/008-lock-va-lock-free-trong-java-tu-ly-thuyet-den-thuc-tien-YWOZrVvEZQ0) hoặc các atomic operation để đảm bảo chương trình không xảy ra [**heisenbug**](https://viblo.asia/p/010-nham-tuong-ve-data-race-va-race-condition-bWrZnVG9Zxw). Và điểm yếu của nó cũng nằm ở **synchronize**.

**Synchronize** chỉ cho phép duy nhất một thread được truy cập đến critical block. Nó đảm bảo **thread-safe**, nhưng phải trả một cái giá không hề.. rẻ, đó là có khả năng xảy ra bottleneck trong **multi-thread programming**.

![](https://i.imgur.com/gdeNmFD.png)

Vậy nên cơ chế **scheduling** nào cũng phải đối mặt với **memory model**. Tuy nhiên **cooperative scheduling** phần nào sẽ có lợi thế hơn so với **preemtive scheduling**.

Với việc tự code **Schedular** dùng cơ chế **cooperative scheduling**, ta có toàn quyền quản lý thời gian/thời điểm thực thi của lightweight thread. Nhờ vậy vấn đề bottlenect với sync được quản lý tốt hơn và có khả năng phòng tránh tuy nhiên không phải 100%.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Ngoài **Hybrid threading model** với cooperative + preemptive, có một vài ngôn ngữ sử dụng với preemptive + preemptive... như Haskell, Erlang. Hơi ngoài lề :joy:.

---
Series đã kết thúc, phần lớn về lý thuyết với **multi-thread programming**. Tuy nhiên, muốn làm được những thứ to lớn hơn, ta cần nắm vững lý thuyết. Ngoài ra, nó còn giúp chúng ta lên level trong con đường sự nghiệp :joy:.

Thay vì tự viết **Schedular** và cơ chế **scheduling** để optimize multi-thread programming, hãy đứng trên vai người khổng lồ và sử dụng các thư viện có sẵn :joy:.

Series tiếp theo mình sẽ nói về **Akka** và các practice với nó. **Akka** tuân theo **Actor model** và **Hybrid threading model**, một trong những thư viện xử lý multi-threading đáp ứng được high CCU khá tốt với các đặc điểm chính:
> - Message driven: sử dụng message thay cho method call, async programming, sender không cần chờ đợi kết quả từ receiver.
> - Giảm thiểu synchronize: đơn giản hóa việc synchronize với Actor model, xử lý các request theo thứ tự FIFO.
> - Hybrid threading model.

See you in next series!

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)