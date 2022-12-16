Khi bắt đầu tìm hiểu sâu về Asynchronous và Isolate trong Dart có rất nhiều bạn đang bị nhầm lẫn giữa 2 khái niệm đồng thời (**concurrency**) và song song (**paralleism**) trong Dart. Để có thể hiểu rõ hơn về 2 khái niệm này thì trước tiên chúng ta phải làm rõ 1 số các khái niệm cơ bản về Dart như sau :


> 1. Dart is a Single Threaded language

Dart là 1 ngôn ngữ đơn luồng cho nên Dart thực hiện từng tác vụ một, hết tác vụ này đến tác vụ khác nghĩa là miễn là một thao tác đang thực thi, nó không thể bị gián đoạn bởi bất kỳ đoạn code nào khác.
Nói cách khác, nếu bạn chạy  một purely synchronous method , thì phương thức sau sẽ là phương thức duy nhất được thực thi cho đến khi hoàn tất.
Ví dụ:
```
void myBigLoop(){
    for (int i = 0; i < 10000000; i++){
        _doSomethingSynchronously();
    }
}
```

Trong ví dụ trên, việc thực thi phương thức myBigLoop () sẽ không bao giờ bị gián đoạn cho đến khi nó hoàn thành. Do đó, nếu phương thức này mất một thời gian, ứng dụng sẽ bị "block" trong suốt quá trình thực thi toàn bộ phương thức.!
>2.The Dart execution model

Khi bạn run một  Flutter App (hoặc bất kỳ ứng dụng Dart nào), một quy trình Thread mới (trong ngôn ngữ Dart = “Isolate”) sẽ được tạo và khởi chạy. Luồng này sẽ là luồng duy nhất mà bạn phải quan tâm cho toàn bộ ứng dụng.

* khởi tạo 2 queue, đó là  FIFO “MicroTask Queue ” và “Event Queue”
* thực thi phương thức main () và khi quá trình thực thi mã này hoàn tất
* Khởi chạy Event Loop

Trong toàn bộ vòng đời của chuỗi, một quy trình nội bộ và vô hình, được gọi là “Event Loop”, sẽ điều khiển cách mã của bạn sẽ được thực thi và theo thứ tự trình tự nào, tùy thuộc vào nội dung của cả  “MicroTask Queue ” và “Event Queue”. Event Loop là 1 vòng lặp vô hạn, nó đảm nhiệm 1 nhiệm vụ chính là kiểm tra xem  nếu các sự kiện trong MicroTask Queue  trống  thì  sẽ đẩy các sự kiện của Event Queue vào main Isolate rồi thực thi nó .

Như chúng ta có thể thấy Hàng đợi MicroTask được ưu tiên hơn Event Queue nhưng 2 hàng đợi đó được sử dụng để làm gì? Hãy cùng mình tìm hiểu nhé :

>3.MicroTask Queue

Hàng đợi MicroTask được sử dụng cho các hành động nội bộ rất ngắn cần được chạy không đồng bộ, ngay sau khi thứ khác hoàn thành và trước khi đưa trở lại hàng đợi Sự kiện.
>4.Event Queue

Hàng đợi sự kiện được sử dụng để tham chiếu các hoạt động phát sinh từ các sự kiện bên ngoài như: I/O, gesture, drawing, timers, streams, …Trên thực tế, mỗi khi một sự kiện bên ngoài được kích hoạt, thì nó  sẽ được tham chiếu vào hàng đợi Sự kiện.

Ngay sau khi không còn bất kỳ nhiệm vụ vi mô nào để chạy, Vòng lặp sự kiện sẽ xem xét mục đầu tiên trong Hàng đợi sự kiện và sẽ thực thi nó. Một điều rất thú vị là các Hợp đồng tương lai cũng được xử lý thông qua Hàng đợi sự kiện.Các bạn xem hình để hiểu thêm nhé :3
![image.png](https://images.viblo.asia/de794826-8c30-4dc8-a3b3-5eb02e305568.png)

Đến đây mình nghĩ đã đến lúc đi vào vấn đề chính . Phân biệt rõ ràng 2 khái niệm đồng thời (**concurrency**)
và song song (**paralleism**) .Khi chúng ta sử dụng async thì đồng nghĩa là chúng ta đang sử dụng khái niệm đồng thời . Khi ta chạy 1 đoạn code async thì Dart không tự động tạo multithread mà ta **có thể chỉ cần** sử dụng duy nhất 1 thread, processor cũng sẽ không dừng lại hay làm bất cứ việc gì khi mà gặp 1 task async. Nói tóm lại khi 1 ta thực hiện 1 async task thì chương trình sẽ "Đồng thời" tiếp tục chạy và nó sẽ chỉ  "tạm dừng" lại đoạn code mà đang sử dụng từ khóa await và push nó vào Event Queue và tiếp tục thực hiện các đoạn code khác:
![image.png](https://images.viblo.asia/44c1137a-8564-4b34-9313-0b4c3b0fae27.png)
như các b có thể thấy ngay sau khi thực thi xong lệnh print("end of loop"); thì Event Loop sẽ ngay lập tức đẩy các sự kiện trong Event Queue vào main isolate để chạy tiếp. Mình xin nhấn mạnh lại 1 điều là 

* Async không yêu tự động biến chương trình của ta phải chạy multithread mà **có thể chỉ cần** sử dụng duy nhất 1 thread 
* Async là non-blocking đồng nghĩa với việc là các đoạn code tiếp theo sẽ vẫn có thể hoạt động bình thường nhưng không đồng nghĩa là nó sẽ không gây ra việc ứng dụng của bạn bị "JANK". 

Nếu giả sử như ở ví dụ trên hàm delayedPrint chạy quá lâu do phải xử lý 1 heavy task thì nó cũng sẽ dẫn đến việc app của các bạn bị đơ do đó khi nếu phải xử lý 1 heavy task có thể làm app của bạn  bị đơ . Đến đây thì ta sẽ sử dụng đến khái niệm song song (**paralleism**) bằng cách sử dụng 1 isolate khác chạy song song với main Isolate để xử lý cái heavy task đó, mình sẽ không đi sâu hơn về việc làm thế nào để sử dụng thêm 1 isolate mà sẽ chỉ đơn giản phân biệt rõ hơn 2 khái niệm trên. Mỗi “Isolate” đều có “Vòng lặp sự kiện” và Hàng đợi (MicroTask và Sự kiện) riêng. Điều này có nghĩa là mã chạy bên trong một Isolate, độc lập với một Isolate khác.Nhờ đó, chúng ta có thể có được parallel processing.