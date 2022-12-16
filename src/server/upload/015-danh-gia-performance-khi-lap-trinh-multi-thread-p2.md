© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Mục tiêu của bài viết sẽ trả lời câu hỏi: **Thêm bao nhiêu processors là đủ?** (tất nhiên nếu bạn là richkid thì con số không phải vấn đề). Anh em dev nổi tiếng nghèo ăn mì tôm chống đói, nên điều này rất đáng quan tâm. Let's begin.

## 1) Amdahl's law
Để tôn trọng tác quyền, một định lý hoặc quy luật sẽ được đặt tên theo tác giả đó. [Amdahl](https://en.wikipedia.org/wiki/Gene_Amdahl) đã phát minh **Amdahl's law** với mục đích ước lượng, tính toán con số [**speedup**](https://viblo.asia/p/1VgZvrRYZAw#_3-speedup-2) cho toàn bộ chương trình với công thức sau:

![](https://i.imgur.com/0ZfLDAB.png)

Quay lại [bài toán salad](https://viblo.asia/p/Ljy5Vvvy5ra#_1-sequential-vs-parallel-computing-0), một vài task có khả năng thực thi đồng thời và một vài task phải thực thi tuần tự. Mình ước lượng một con số **P = 0.8** (khá cao). Với công thức trên, ta tính được **overall speedup** như sau:
- 1 **processors** ➜ **overall speedup** = 1 (of course)
- 2 **processors** ➜ **overall speedup** = 1.67
- 4 **processors** ➜ **overall speedup** = 2.5
- 100 **processors** ➜ **overall speedup** = 4.81
- 1000 **processors** ➜ **overall speedup** = 4.98
- 100000 **processors** ➜ **overall speedup** = 4.99

Lắm tiền nhiều của, chơi hẳn con máy 1000 **processor** chạy cho nhanh. Kì vọng chương trình nhanh hơn vài trăm lần là happy lắm rồi. Tuy nhiên, **overall speedup** chỉ tăng **gần 5 lần** so với **single-processor**. 

Như vậy, 20% chương trình bắt buộc phải xử lý tuần tự sẽ ảnh hưởng đến giá trị **overall speedup** chúng ta mong muốn. Hàng triệu **process** có thể giúp xử lý 80% chương trình trong nháy mắt, và 20% còn lại được xử lý với thời gian gần như xử lý với **single-processor**. 

![](https://i.imgur.com/Ya7hvP4.png)

Như vậy, **Amdahl's law** minh họa cho chúng ta thấy vì sao việc sử dụng **multi-processors** chỉ thực sự hữu ích cho các chương trình có khả năng **parallelization** cao (tối đa các task thực thi đồng thời, tối thiểu các task thực thi tuần tự).

Với chương trình trên, việc tăng số lượng **processor** lên 100 gần như đã đạt mức **overall speedup** tối đa. Để tiếp tục tăng tốc độ ta cần con số hàng nghìn. Chi phí bỏ ra rất lớn trong khi hiệu quả đem lại không nhiều. Tất nhiên, trong máy tính không chỉ có duy nhất một ứng dụng đó chạy mà rất nhiều các chương trình khác. Nhưng đó không phải là vấn đề lớn. 

## 2) Efficiency
Ngoài **speedup**, ta có **efficiency** nhằm đánh giá hiệu năng **processor** được sử dụng để xử lý bài toán được tính với công thức:

![](https://i.imgur.com/CGrSYYy.png)

- 1 **processors** ➜ **overall speedup** ➜ **efficiency** = 100%
- 2 **processors** ➜ **overall speedup** = 1.67 ➜ **efficiency** = 83.5%
- 4 **processors** ➜ **overall speedup** = 2.5 ➜ **efficiency** = 62.5%
- 100 **processors** ➜ **overall speedup** = 4.81 ➜ **efficiency** = 4.81%
- 1000 **processors** ➜ **overall speedup** = 4.98 ➜ **efficiency** = 0.5%
- 100000 **processors** ➜ **overall speedup** = 4.99 ➜ **efficiency** = 0.5%

Khi tăng lên 4 processors, ta chỉ sử dụng khoảng 62.5% sức mạnh của toàn bộ **processors**. Khá dễ hiểu.

### Note
Thực tế khi đo lường performance của các ứng dụng, cần chú ý một vài thứ sau:
- Xung đột với các process khác. Thực tế máy tính chạy rất nhiều các process ngầm mà chúng ta không biết. Do đó con số sẽ luôn nằm trong một khoảng giá trị.
- Với Java có **JIT (Just in time) Compiler**. Như chúng ta biết Java biên dịch code thành ngôn ngữ JVM (**bytecode**). Khi chương trình thực thi, JVM dịch **bytecode** ra **machine language** để thực thi. Những đoạn **bytecode** sau khi dịch ra **machine language**, phụ thuộc vào một vài yếu tố mà sẽ chuyển đoạn code đó sang **machine language**, các lần sau khi chạy qua đoạn code đó sẽ không mất công chuyển đổi ngôn ngữ, khiến cho chương trình chạy nhanh hơn (đó là **JIT Compiler**). Vì vậy nên khi chạy lần đầu ta thấy chậm hơn so với các lần sau. Do đó cần chú ý quá trình **warm up** hệ thống khi thực hiện đo lường performance.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Chúng ta đã có đầy đủ các thông tin và các yếu tố cần thiết để tiến hành phát triển một phần mềm ứng dụng multi-thread để tối đa hiệu suất khi được xử lý với **multi-processors**. Đón chờ phần tiếp theo sẽ bàn luận về các bước để thiết kế một chương trình **parallel execution** sao cho hiệu quả.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)