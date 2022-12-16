© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

**Lưu ý**, có 2 loại thread là:
> - **CPU thread**: đại diện cho nhân của CPU core, processor. Ví dụ như chúng ta hay nghe đến Intel Core i5 4 cores 4 threads. Có thể coi đó là **hardware thread** để phân biệt với **OS thread**.
> - **OS thread**: là **thread** của hệ điều hành, có thể gọi là **software thread** để phân biệt với **CPU thread**. **Java thread** tương ứng với một **OS thread**, tuy nhiên cần lưu ý rằng về bản chất nó là 2 thứ khác nhau.

Với bài viết này mình sẽ đề cập đến **OS thread**, thứ mà gần như toàn bộ các developer sẽ làm việc với nó.

## 1) Process
Có nhiều cách giải thích khác nhau cho **process**, ví dụ đơn giản và gần gũi nhất: khi double-click vào một ứng dụng trên máy tính (Chrome, Skype, Unikey...), một process được khởi chạy. Nếu double-click nhiều lần thì sao? Ví dụ khi mở 2 IntelliJ, nó được coi là 2 process. Tất nhiên, chúng ta có thể double-click rất nhiều lần vào các ứng dụng khác nhau. 

> **Kết luận đầu tiên**: process là một chương trình phần mềm **đang được thực** thi trên máy tính, có rất nhiều process được khởi tạo và chạy đồng thời.

Tiếp tục câu chuyện, bạn vừa fix bug trên IntelliJ lại vừa trò chuyện với bạn bè bằng Skype. Alt + Tab liên tục, nhưng không có cách nào để trò chuyện trực tiếp trên IntelliJ, diễn nhiên rồi :sweat_smile:. 

> **Kết luận thứ hai**: các process không liên quan đến nhau, không sử dụng chung vùng nhớ, không truy cập trực tiếp dữ liệu của nhau.

Vậy bên trong **process** có gì? 

Quay lại bài trước, nếu coi việc **làm đĩa salad** là một **process** thì bên trong có những phần nào. Ta sẽ thấy có hai phần quan trọng: đầu tiên là công thức chế biến, thứ hai là nguyên liệu. 

Tương tự với phần mềm, bên trong process bao gồm:
- **Instruction** (công thức chế biến, các chỉ dẫn, hay nói cách khác là code).
- **Data** (nguyên liệu của món salad).
- Còn một phần quan trọng nữa, đó là thông tin về trạng thái (**state**) của process.

> Vậy, process có các tính chất:
> - Bao gồm thông tin của **instruction, data và state**.
> - Các process chạy độc lập với nhau trên vùng nhớ riêng biệt, **không trực tiếp** truy cập được dữ liệu của nhau. Không trực tiếp được nhưng có thể gián tiếp :sweat_smile:.

### 2) Thread
Ngoài thông tin của instruction, data và state, process còn bao gồm **một** hoặc **nhiều** thành phần nhỏ hơn được gọi là **thread**.
> Thead nằm trong process.

Process bao gồm rất nhiều thread trong đó và thread sẽ trực tiếp thực thi các nhiệm vụ, chỉ dẫn (series of instruction).
> Thread là **đơn vị cơ bản** để hệ điều hành quản lý và thực thi. Phần sau sẽ tìm hiểu kĩ hơn về cách hệ điều hành làm việc với thread.

Để dễ hình dung, có thể coi việc làm đĩa salad là một process, có 2 đầu bếp là 2 thread cùng thực hiện một phần trong bài toán (same process). Cả hai đều **hoạt động độc lập** với nhau tuy nhiên cùng chung mục đích là hoàn thành đĩa salad nhanh nhất có thể. 

Mình cắt kiwi, bạn còn lại cắt cà chua. Có vẻ hơi chậm, mình gọi một bạn nữa vào thực hỗ trợ và cắt cà rốt. Nó giống như việc ta có thể khởi tạo thêm **một** hoặc **nhiều** thread khác tham gia công việc trong cùng **process**. 

Vậy có thể coi process chế biến món salad đang có 3 thread đang cùng hoạt động. Việc cắt cà rốt đã xong, 1 thread đã hoàn thành công việc, 2 thread còn lại vẫn tiếp tục chạy. 

> Với ngôn ngữ kĩ thuật, các threads trong cùng process sẽ **chia sẻ chung vùng nhớ (shared address space)**, do đó chúng **có thể** truy cập đến data của nhau hay nói cách khác là của process. Hãy coi căn bếp là khu vực bộ nhớ chung của các đầu bếp. Tất cả đều có thể thực hiện theo chỉ dẫn nấu ăn và truy cập đến tất cả các thành phần nguyên liệu (data) có trong căn bếp đó. 

![](https://i.imgur.com/KXxNGeH.png)

Từ ví dụ trên có thể thấy rằng việc các threads chia sẻ chung vùng nhớ khá thuận tiện và dễ dàng làm việc. Tuy nhiên nó không đơn giản như vậy, sẽ có nhiều vấn đề xảy ra khi chúng ta (threads) không tương tác với người còn lại.

Trong process làm salad, có các đầu bếp là thread, tương tác với vùng nhớ chung là căn bếp, với các data là nguyên liệu. Cùng thời điểm đó, anh bạn hàng xóm (other thread) đang làm món gà quay (other process) trong căn bếp (other memory) của anh ấy. Mình không thể trực tiếp "xử" món gà quay kia được (mặc dù nó hấp dẫn hơn đĩa salad). 

> Vùng nhớ của các process là hoàn toàn **độc lập (isolation)** với nhau, việc trực tiếp chia sẻ bộ nhớ là điều không thể (bổ sung cho kết luận thứ hai của phần trên). 

> Việc giao tiếp giữa các process **khó hơn** so với việc giao tiếp giữa các thread. Việc thêm mới một process (bao gồm bếp ăn, công thức, đầu bếp, nguyên liệu) **khó hơn** việc thêm mới một thread (đầu bếp).

Tổng kết lại, thread có các tính chất:
> - Thread **nằm trong** process, là **tập con** của process. Trong 1 process có thể có **một** hoặc **nhiều** thread.
> - Thread là **đơn vị cơ bản** để hệ điều hành quản lý và thực hiện.
> - Tất cả các thread trong cùng một process sẽ **chia sẻ chung vùng nhớ** với nhau vì vậy việc giao tiếp giữa các thread khá đơn giản và dễ dàng hơn so với giao tiếp giữa các process.
> - Việc tạo mới/hủy thread đơn giản và tốn ít công hơn so với việc tạo mới/hủy một process.

### 3) Inter-process communication (IPC)
Với kết luận trên, các process sẽ không thể trực tiếp truy cập vào vùng nhớ của nhau. Vậy, ta có thể gián tiếp làm điều đó bằng cách để các process giao tiếp với nhau. Thuật ngữ diễn tả hành động đó là **Inter-process communication (IPC)**. 

Cụ thể hơn, IPC là gì? Nghe thì nguy hiểm nhưng thực chất đều là những thứ rất quen thuộc:
- **Sockets and pipes**. Giao tiếp thông qua network ví dụ như UDP, TCP, RESTful API hoặc các hệ thống Message broker như ActiveMQ, RabbitMQ, Kafka...
- **Remote procedure calls** thông qua gRPC. 
- **Shared memory**. 

### 4)  Open for discussion
Chúng ta đã nắm rõ về **proess**, **thread**, **multi processes** và **multi threads**, vậy khi lập trình các ứng dụng sẽ chọn cách sử dụng **multi processes** hay **multi threads**, cái nào sẽ tốt hơn?

Sẽ không có câu trả lời cụ thể, nó phụ thuộc vào nhiều yếu tố như môi trường chạy, ngôn ngữ lập trình hay sự khác nhau giữa các hệ điều hành. 

> Nếu ứng dụng phát triển theo hướng phân tán giữa nhiều máy tính thì có thể lựa chọn cách phân chia theo process để triển khai (ví dụ điển hình là kiến trúc [Microservice](https://viblo.asia/s/P0lPmr9p5ox)). Tuy nhiên nếu muốn tận dụng lợi ích của multithread thì hoàn toàn có thể phát triển theo hướng kiến trúc Monolithic. 

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Đón chờ bài viết sau với chủ đề Concurrent và Parallel nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)