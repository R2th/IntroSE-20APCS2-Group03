© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Nói đến **multi-thread programming** thì không thể bỏ qua **Thread pool**. Các Java developer chắc đã quen thuộc với ExecutorService bao gồm nhiều loại thread pool và khá mạnh mẽ. 

Tuy nhiên, nó đã phải thứ tốt nhất giúp cho chương trình được **parallel execution** và tận dụng tối đa sức mạnh của **multi-processors** chưa? Cùng đi tìm câu trả lời với lượt bài cuối trong series này nhé.

Trước hết cần hiểu về **cooperative** và **preemptive** trong **multi-tasking**/**multi-threading**. Let's begin.

## 1) Multi-tasking
Multi-tasking là gì? Việc các đầu bếp liên tục đổi chỗ cho nhau ở [bài trước](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N) để thực hiện phần việc của mình một cách **concurrent** chính là ví dụ của **multi-tasking**.

Bản chất của **multi-tasking** muốn nói việc việc rất nhiều [**process/thread**](https://viblo.asia/p/003-thread-va-process-gDVK2eeA5Lj) được thực thi đồng thời với nhau dù chỉ với **single-processor**. [**Schedular**](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N#_1-schedular-0) sẽ đảm nhận nhiệm vụ đó và ta không cần quan tâm gì đến nó.

Ngoài ra, các máy tính hiện đại ngày nay đều được trang bị **multi-processors** càng làm cho nó có thể xử lý được nhiều tác vụ hơn nữa nhưng vẫn mượt mà.

## 2) Real life
Ta đã biết được sức mạnh của CPU với **multi-tasking** và sức mạnh của parallel execution với **multi-thread**/**multi-processors**. Giờ đến lúc tận dụng nó thôi.

Trên lý thuyết, muốn chương trình tận dụng được **parallel execution**, ta cần chia thành nhiều [concurrent task](https://viblo.asia/p/004-concurrent-va-parallel-RQqKLGV657z#_1-concurrent-0) và thực thi đồng thời với nhau bằng cách tạo ra số lượng thread bằng với số lượng task. Ví dụ 5000 tasks là 5000 threads với mong muốn tất cả các task đều được thực thi đồng thời.

Tất nhiên nó không ổn, vì 3 lý do:
> - Thực tế, các server có số lượng processors vào khoảng 8 đến 16 hoặc 64 đã là nhiều. Server càng mạnh thì.. số tiền bỏ ra càng lớn. Mà lợi ích thu được [chưa chắc đã bằng một phần so với chi phí bỏ ra](https://viblo.asia/p/015-danh-gia-performance-khi-lap-trinh-multi-thread-p2-924lJj7alPM#_1-amdahls-law-0).
> - Với JVM chạy trên OS 64-bit, để tạo ra một thread chúng ta cần ít nhất 1024 bytes ~ 1 MB. Con số có thể tăng lên tùy thuộc vào stack size. Như vậy với 5000 threads cần khoảng 5 GB RAM. Nhiều quá, tiền không đủ.
> - Càng nhiều thread, [**context switch**](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N#_2-context-switch-1) càng xảy ra thường xuyên dẫn đến giảm performance của hệ thống.

Trong thực tế, chúng ta là các kĩ sư chuyên ngành không tạo ra 5000 threads như vậy. Một cách đơn giản để xử lý là sử dụng **thread pool**, hiểu nôm na đó là một tập hợp **n** threads thực thi **m** tasks. Cụ thể với Java có **ExecutorService** sẽ đảm nhận nhiệm vụ này.

Tuy nhiên nó nảy sinh ra bài toán khác, điều chỉnh size (number of threads) trong pool như thế nào cho phù hợp. Nếu size quá lớn sẽ giống bài toán 5000 threads ở trên, nhưng size quá nhỏ thì không tận dụng được **multi-processors**, hoặc latency cao vì phải xử lý nhiều task, các task chưa được thực thi rơi vào trạng thái blocking.

Vậy có cách nào khác có thể đạt được cả 2 tiêu chí:
> - Thực thi các **concurrent tasks** hiệu quả hơn.
> - Dựa trên hệ thống hardware có sẵn mà không cần nâng cấp.

Các bạn đã nghe qua về [Actor model và Akka](https://akka.io/) chưa? Nếu chưa thì có vể đón chờ series sau của mình nhé. Phần này chỉ nhằm mục đích quảng cáo :joy_cat:.

Để xử lý được bài toán và đảm bảo 2 tiêu chí nêu trên, ta cần hiểu cụ thể hơn về **Schedular** và các loại **scheduling**. Bản chất, **scheduling** là cơ chế để giao **task** cho các **worker**. Với OS, có thể hiểu rằng **task** là **thread**, **worker** là **processor**.
> - Task = Thread
> - Worker = Processor/CPU Core

Có 2 loại **scheduling** cho **Schedular** là:
> - Preemtive scheduling / Preemtive multitasking
> - Cooperative scheduling / Non-preemtive multitasking

## 3) Cooperative scheduling

Cơ chế **scheduling** phụ thuộc vào OS vì **Schedular** thuộc OS, nó không phụ thuộc vào đời máy hay loại máy. Các OS sử dụng **cooperative scheduling** bao gồm MacOS 8.0 - 9.2.2, Windows 3.x và Linux 2.4.

**Cooperative scheduling** hoạt động thế nào và có gì hay ho?

Với **cooperative scheduling**, các **task** tự quản lý vòng đời của chúng. Ví dụ cho dễ hiểu, quay về cuộc thi [Master chef](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N#_1-schedular-0), **Schedular** chỉ có nhiệm vụ điều phối các đầu bếp đến các bộ dụng cụ đang không được sử dụng. Sau đó, việc người đầu bếp làm gì, làm bao lâu tùy thuộc vào quyết định của họ.
> Công việc của **Schedular** chỉ là điều phối **task** cho bất kì **worker** nào đang rảnh rỗi (free worker).

![](https://i.imgur.com/aF7QeiR.png)


Trong trường hợp không có **free worker** nào thì sao? **Schedular** không thể làm gì vì lúc này quyền kiểm soát thực thi là của **task**. **Schedular** phải chờ cho đến khi nhận được thông báo của **task** là:
> - Tôi đã thực thi xong. I'm done.
> - Hoặc tôi chủ động dừng và nhường lại **worker**. I stop, will be back later.

Trong quá trình đó, **schedular** không thể làm gì khác. Đó là lý do vì sao nó được gọi là **cooperative**, dịch ra nghĩa là **cộng tác, hợp tác**. Các task nên phối hợp, cộng tác với nhau để được thực thi công bằng bình đẳng.

Nếu nói về xã hội học, nó giống như việc các bộ lạc nguyên thủy cùng nhau săn bắt hái lượm, cùng góp đồ và cùng chia nhau một cách vui vẻ và hòa bình. Vấn đề sẽ xảy ra khi:
> - Mọi người đều nhận đủ phần của mình, tuy nhiên vẫn còn dư thừa nhiều, lòng tham trỗi dậy và hình thành sự tranh chấp chiếm đoạt.
> - Thậm chí ngay cả khi không dư thừa của cải, vẫn sẽ có những cá nhân muốn chiếm loạt phần lợi về bản thân mình.

Tương tự với **cooperative scheduling**, nếu một **task** trở nên tham lam và muốn sở hữu **worker** trong một thời gian dài, tất cả các **task** khác không được thực thi dẫn đến các chương trình khác có thể bị treo.

Do đó, nếu viết code và thực thi trên các OS sử dụng Cooperative Scheduling cần chú ý và rất cẩn thận trong việc tương tác giữa các task (thread). Nếu không toàn bộ chương trình hoặc thậm chí cả hệ điều hành sẽ bị treo.

Ta đã thấy được nhược điểm của **Cooperative scheduling**, nhưng vì sao nó vẫn được sử dụng? Trước khi trả lời câu hỏi này, đi tìm hiểu **Preempive scheduling** trước đã.

## 4) Preemptive scheduling
Nghe thì có vẻ lạ lẫm nhưng thực ra mình đã giới thiệu về nó ở [bài trước](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N). **Schedular** sẽ toàn quyền kiểm soát việc assign **task** cho **worker**, từ việc **task** nào được thực thi cho đến thời gian thực thi bao lâu. 

Các hệ điều hành hiện đại ngày này đa số sử dụng **Preemptive schedular** để lên lịch thực hiện các **task**.

Với cách quản lý này, **Schedular** sẽ đảm bảo tính công bằng bình đẳng giữa các **task**, ai cũng là người tốt, không ai có cơ hội trở nên tham lam :joy:. Từ đó trực tiếp giảm thiểu khả năng treo ứng dụng hoặc hệ điều hành xuống tối đa. Hoặc khi một ứng dụng bị treo thì các ứng dụng khác vẫn có thể hoạt động bình thường. Đó là ưu điểm tuyệt vời của **Preemtive scheduling** so với **Cooperative scheduling**, bravo :clap:.

Quay lại câu hỏi ở cuối phần trước, dù **Preemtive** có lợi thế nhất định so với **Cooperative** nhưng **Cooperative** vẫn được sử dụng? Để trả lời được ta cần xem nhược điểm của **Preemptive**.

[**Context switch**](https://viblo.asia/p/005-os-doi-xu-voi-thread-the-nao-bJzKmVvYZ9N#_2-context-switch-1) chính là nhược điểm rất lớn của **Preemptive scheduling**. Nó bao gồm hai bước cơ bản:
> - Lưu lại trạng thái của task hiện tại.
> - Khôi phục trạng thái của task để tiếp tục thực thi.

Nó liên quan đến việc chuyển đổi bộ nhớ register, chuyển đổi vị trí con trỏ, cập nhật các thông tin liên quan... và chi phí (cost of computation) để thực thi là rất rất lớn. Đây chính là thứ mà **Cooperative scheduling** không cần bận tâm, các **task** phải tự quản lý data, state, lifecycle của chúng. **Schedular** không cần lưu lại các state, do đó **context switch** xảy ra rất nhanh và không tốn kém như **Preemptive scheduling**.

Cái gì cũng có 2 mặt, muốn công bằng bình đẳng thì phải hy sinh nhiều công sức và tiền của :joy:.


### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Một câu hỏi đặt ra, vì sao cần quan tâm đến Cooperative scheduling và Preemptive scheduling? Đơn giản thôi:
> - Củng cố kiến thức, hiểu về cách máy tính vận hành.
> - Từ đó, vận dụng để optimize software với multi-thread programming. Nghe có vẻ hay ho rồi đây, đón chờ bài sau nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)