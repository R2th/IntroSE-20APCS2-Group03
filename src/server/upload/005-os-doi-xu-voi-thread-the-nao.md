© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Tiêu đề có vẻ hơi đau khổ cho thread. Những tưởng có quyền to lớn mà nào ngờ chỉ là phận bèo dạt mây trôi. Trước khi kết luận thì phải đi tìm hiểu đã. Let's begin.

## 1) Schedular
Taskbar của bạn có gì? Của mình có Chrome (đang dùng để viết bài này), IntelliJ, DataGrip, Postman, Skype, Slack, Notes... rất nhiều, chưa kể hàng tá các ứng dụng chạy ẩn của OS mà mình không biết. Mỗi ứng dụng như thế lại có vô số thread :thinking: .

Tổng cộng, có đến hàng trăm process và hàng nghìn thread như vậy, mà con máy cùi bắp của mình có mỗi 2 cores (processors). Thread nào cũng muốn được thực thi, tranh nhau như thế có vẻ không ổn? 

Việc này hơi phức tạp nên OS sẽ làm giúp chúng ta. Bên trong OS có một thành phần gọi là **Schedular**, nhiệm vụ của **Schedular** là:
> - Sắp xếp thread vào các hàng đợi.
> - Lên kế hoạch và điều khiển các thread vào processor để thực thi.

![](https://i.imgur.com/ttgZOYo.png)

Ví dụ minh họa để dễ hiểu hơn. Cuộc thi Master Chef nông thôn, có rất nhiều team (**process**) tham gia cuộc thi. Mỗi team sẽ có một hoặc nhiều thành viên (**thread**). Tất nhiên, họ phải tự chuẩn bị nguyên liệu (**data**). Chỉ có hai bộ dụng cụ nấu ăn (**processor**), và giám sát viên (**schedular**).

Để đảm bảo tính công bằng, giám sát viên lần lượt gọi 2 đầu bếp lên để thực thi công việc. Sau khi xong, 2 người về chỗ, 2 người tiếp theo sẽ lên và cứ đều đều như vậy. Hơi đen một chút là anh đầu bếp áo vàng hết nguyên liệu, anh ấy được điều phối ra một hàng chờ khác (I/O queue) chờ tiếp tế. Giám sát viên điều người khác lên thế chỗ để đảm bảo bộ dụng cụ được sử dụng liên tục. 

Cách hoạt động của **Schedular** cũng giống với giám sát viên ở ví dụ trên. Tuy nhiên có một câu hỏi đặt ra, họ dựa trên tiêu chí gì để điều phối các đầu bếp, liệu có công bằng cho tất cả các team hay không? 

## 2) Context switch
Chú ý một chút, ở trên mình có đề cập đến việc các đầu bếp phải tự chuẩn bị nguyên liệu (data) và luôn mang theo bên mình:
- Mang nguyên liệu từ chỗ ngồi lên khu vực nấu ăn để thực hiện với bộ dụng cụ (processor).
- Sau khi thực hiện xong, đem nguyên liệu về chỗ, bảo quản kĩ để lượt sau lên thực hiện tiếp.

Như vậy, cần thêm vài công sức (effort) để đảm bảo món ăn được hoàn thiện. Những effort đó được gọi là **context switch**. Nó muốn nói đến việc các **thread** liên tục đổi chỗ cho nhau để được thực thi bởi processor. Khi **context switch** xảy ra:
> - **Lưu lại data và state** của thread trước trước thời điểm **context switch**.
> - **Phục hồi data và state** được lưu trước đó để thread tiếp tục chạy.

## 3) Scheduling algorithm

Có thể thấy effort cho **context switch** khá tốn. Nó sẽ ảnh hưởng đến việc schedular điều phối các thread thế nào?

Cụ thể, có một vài **scheduling algorithm** (thuật toán lập lịch) được schedular sử dụng như sau:
> - **Priority**. Ưu tiên dựa trên priority. Có thể change priority cho thread với Java.
> - **Round-robin**. Khá quen thuộc, xử lý lần lượt theo vòng.
> - **Shortest job next**. Ưu tiên thread nào có khối lượng công việc ít nhất.
> - **Multi-level queue**. Sẽ có nhiều queue thay vì một ready queue. Phân chia queue dựa trên các đặc điểm của thread.
> - **First come first serve**. Ưu tiên thread nào đến trước.
> - **Shortest remaining time**. Ưu tiên thread nào còn ít công việc nhất.

## 4) Scheduling target
Phần cuối cùng, với các **scheduling algorithm** trên, **Schedular** sẽ chọn thuật toán nào để điều phối các thread? 

Có một vài mục tiêu để **Schedular** lựa chọn thuật toán cho phù hợp:
> - **Maximize fairness**. Tối đa sự công bằng giữa các thread, priority và thời gian xử lý ngang nhau.
> - **Maximize throughput**. Tối đa số lượng các thread/process được xử lý trong 1 khoảng thời gian.
> - **Minimize latency**. Giảm thiểu độ trễ, giảm thiểu tần số **context switch**.
> - **Minimize waiting time**. Giảm thời gian chờ đợi để được thực thi giữa các thread.

Mỗi OS khác nhau, **Schedular** sẽ có những mục tiêu khác nhau để điều phối thread. Nó phụ thuộc toàn bộ vào OS và hardware. Developer sẽ không có cách nào quản lý được điều đó **khi lập trình phần mềm**, không thể quyết định được thứ tự thực thi, thời gian thực thi của thread.

Lưu ý, cách thức hoạt động của **Schedular** mình trình bày phía trên là cơ chế [**preemptive scheduling**](https://viblo.asia/p/018-cooperative-va-preemptive-trong-multi-tasking-Qpmleeqklrd). Đa số các hệ điều hành hiện đại xịn sò ngày nay đều sử dụng cơ chế này để hoạt động. Nó cũng có những ảnh hưởng nhất định đến performance khi **multi-thread programming**, mình sẽ viết cụ thể hơn về nó trong các [bài sau](https://viblo.asia/p/018-cooperative-va-preemptive-trong-multi-tasking-Qpmleeqklrd).

Như vậy, câu hỏi ở cuối phần [1. Schedular]() đã được giải đáp. See you in next writing!

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Phần hay sẽ nằm ở đây. Đùa thôi, có thể nhiều bạn đã biết nhưng mình vẫn giải thích thêm.

Tùy thuộc vào từng OS khác nhau (Windows, Linux, macOS...) mà **Schedular** sẽ có cách **đối xử** khác nhau với thread. Với một vài OS, **Schedular** chỉ quan tâm tới thread và sẽ điều phối nó đến processor để thực thi. Một vài OS khác thì sẽ không phân chia process hay thread (không phân chia về mặt chức năng) mà coi nó đều là các **task** cần được thực thi và **Schedular** sẽ làm việc với các **task** đó.

Bài tiếp theo sẽ nói về **Vòng đời của một thread trong OS**.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)