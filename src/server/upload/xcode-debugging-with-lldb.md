Theo một số liệu được truyền từ đời này quà đời khác thì life-cycle của developers chúng ta dành ra tới 70% (hầu hết time) cho việc **debug** và **fix-bug**, 20% là dành cho việc nghĩ tới cách tiếp cận architecture và giao tiếp teamwork và chỉ có 10% cho việc viết code. Có thể số liệu 70% này là hơi quá hay còn ít, nhưng chúng ta không thể phủ nhận rằng thời gian để **debug** và **fix-bug** là vô cùng nhiều so với thời gian thực sự code. Vậy tại sao chúng ta không thử tìm hiểu các cách làm giảm thiểu, các công cụ tuyệt vời để giúp quảng thời gian này trở nên tuyệt vời hơn.

Bài viết lần này của mình sẽ nói về những tìm hiểu chung về công cụ LLBD command. Chúng ta hẳn không xa lạ với giao diện debug của Xcode (Fancy Xcode Debugger UI), việc sử dụng giao diện debug vô cùng thuận tiện mà không cần phải viết một dòng lệnh nào. Tuy nhiên không vì thế mà LLBD trở nên vô dụng, hãy cùng mình tìm hiểu về một số kiến thức chung - các tricks khi sử dụng LLBD hiệu quả hơn.

## Overall
Đầu tiên là một map rất hữu ích về các LLBD command. Cách sử dụng bảng này các bạn sử dụng như bảng tuần hoàn các nguyên tố hoá học vậy, với mỗi command đều có mô tả và ví dụ bên dưới.
![](https://images.viblo.asia/974296e6-25ca-475b-a3eb-7338b7cad93a.png)
> Link download ảnh full hd không che https://www.dropbox.com/s/9sv67e7f2repbpb/lldb-commands-map.png?dl=0

Hãy thử tìm hiểu công dụng của (llbd) thông qua các nhóm công dụng của nó
## Khám phá giá trị và trạng thái của biến
Commands: *expression*, *e*, *print*, *po*, *p*

![](https://images.viblo.asia/1853d779-3bdb-4785-85c8-b845e5e0b606.png)

Chức năng chính của một công cụ debug là khám phá và thay đổi giá trị của biến, đó chính xác là những gì mà lệnh **explore** và **e** làm được. Hãy tìm hiểu chức năng của 2 lệnh này qua ví dụ sau.

![](https://images.viblo.asia/69644da6-94f4-44f4-b0f5-22e128922e17.png)

Trong ví dụ này gồm có 2 function, và mình đang gọi function valueOfLife và mong muốn kết quả nhận được là hiệu của 69 và tổng 2 tham số truyền vào, nhưng không hiểu sao mà kết quả trả về vẫn không đúng. Hãy thử debug phương thức này có phép tính một là tính tổng 2 tham số truyền vào, hai là tiếng hiệu của 69 và tổng đó. Vậy là một trong 2 phép toán này sẽ gây ra lỗi cho phương thức này, hãy thử loại trừ để xem phép toán nào sai.

![](https://images.viblo.asia/fcfe57c9-fb78-4a9a-a5f2-eea16c996fdf.png)

Với cách này mình đã có thể xác định được là lỗi sai ở **sumOf(_ a: Int, _ b: Int)**. Đây có thể nói là một cách debug chạy bằng cơm, hãy thử dùng xăng để debug xem thế nào nhé. Đầu tiên mình sẽ thử đặt một **breakpoint** ở đầu của function và chạy lại. Ở đây vì **e** và **expression** giống nhau nên mình sẽ lấy ví dụ với lệnh **e** thôi.

![](https://images.viblo.asia/3a7b2b88-ccb7-4363-937a-b469f9ddf490.png)

```
(lldb) e sum       //Ở đây mình dùng lệnh e để in ra giá trị hiện tại của biến sum
(Int) $R0 = 17
(lldb) e sum = 15 //Lệnh e cũng có thể thay đổi giá trị của biến tại thời điểm chạy
(lldb) e sum     //Giờ kiểm tra lại biến sum, đã có giá trị mới và giá trị này sẽ tồn tại đến hết quá trình debug
(Int) $R4 = 15
(lldb) e result //StepOver qua result và kiểm tra lại result, đã có kết quả như mình muốn
(Int) $R6 = 54
```
Qua ví dụ nhỏ vừa rồi chúng ta có thể thấy được công dụng của 2 lệnh **e** và **expression**. Ngoài ra LLDB còn cung cấp các flag như các option thêm để thuận tiện hơn khi debug. Chúng ta có thể tìm hiểu các flag này thông qua lệnh **help**, lệnh này sẽ giúp bạn khám phá được các công dụng của các flag cho lệnh expression hoặc e.
```
(lldb) help expression
```
Câu lệnh chúng ta hay sử dụng nhất **po** cũng là một cách viết khác của `e -O --` 
Lệnh **print** và **p** cũng tương tự **expression** và **e** chỉ khác là chúng không có bất kì một flag nào hay là những argument phụ thêm.

## Khám phá trạng thái và ngôn ngữ của app
Bạn đã từng gặp phải trường hợp phải copy rồi pasted đống crash logs lên hỏi anh google hay giải trình với anh leader chưa? Nếu bạn từng gặp, hay chưa gặp thì mình cũng xin giới thiệu về một command sẽ giúp bạn giải quyết vấn đề này =)). Command mình muốn nói tới ở đây chính là **bugreport** hoặc viết tắt là **bu**!

[](https://images.viblo.asia/05105b22-8661-4710-a9bd-197b2ff4f940.png)

Command này sẽ giúp chúng ta một bản report đầy đủ trạng thái hiện tại của app. Nó sẽ rất hữu ích khi bạn phải đối mặt với một vấn đề nào đó (bugs, crash, ...) nhưng muốn giải quyết sau vì bận đi ăn sáng với team hay đơn giản là đến giờ TGIF (ko nhanh chân thì hết phần). Câu thần chú ở đây là
```
(lldb) bugreport unwind --outfile <path to output file>
```
Nó sẽ giúp chúng ta ghi lại trạng thái của app hiện tại. Kết quả chúng ta sẽ có một file log lại như này.

![](https://images.viblo.asia/ee07366a-862e-4b24-8f67-8da4999ea0cb.png)

LLDB cung cấp một vài command đặc trưng cho các ngôn ngữ C++, Objective-C, RenderScript và Swift. Tất nhiên mình sẽ nói về Swift, và một lệnh khá hữu ích giúp chúng ta biết được số lượng các tham chiếu tới đối tượng cần quan sát đó là **refcount**
```
(lldb) language swift refcount logger
refcount data: (strong = 4, weak = 0)
```
Với câu lệnh trên chúng ta đã có đủ thông tin những strong reference và weak reference đang tham chiếu tới đối tượng logger hiện tại.
## Điều khiển luồng thực thi của app
Đây là phần khá hay của LLBD, nếu bạn đã quen với nó, nó có thể giúp bạn tăng nhanh tốc độ debug rất nhiều. Đầu tiên là command **process** hay **pr**. Process có rất nhiều flag để giúp tương tác với tiến trình hiện tại. Trong đó có `process continue` có chức năng tương tự với nút continue trên thanh công cụ debug của Xcode

![](https://images.viblo.asia/95f8f32f-20f2-4b9c-bb3f-e93024b76109.png)

Tiếp theo sẽ là command **breakpoint**, cái này thực sự hữu ích giúp chúng ta tuỳ biến và control được các **breakpoint** trong cả app. Chúng ta có thể enable, disable hay bỏ breakpoint bằng các lệnh `breakpoint enable`, `breakpoint disable`, `breakpoint delete`. Một chức năng rất hữu ích của breakpoint đó là list các breakpoint đã đặt cũng như xem được trạng thái của nó breakpoint, như ở dưới chúng ta có thể xem được số hitcount của từng breakpoint đã đặt.

![](https://images.viblo.asia/39cf196b-2dac-40db-aa70-c4d172db50f3.png)

Nếu đã list ra được thì cũng có thể dùng command để add breakproint. Câu lệnh 1 dưới dùng để set một breakpoint mới với file nào đó tại dòng nào đó, còn câu lệnh 2 là cú pháp viết tắt thôi.
```
(lldb) breakpoint set -f <filename> -l <number of line> //1
(lldb) b <filename>:<number of line>                    //2
```
Tiếp dưới đây là điều mình thích nhất ở **breakpoint**. Bẩm sinh đã hay quên nên mình rất hay bị comment về convention để thừa **println()** trong code. Mình đã khắc phục bằng cách search tất cả keyword println trong project để remove trước khi pull nhưng vẫn quên TvT. Thật may giờ mình sẽ ko cần làm vậy nữa, vì `breakpoint command` sẽ giúp mình làm việc này.

![](https://images.viblo.asia/552c59d5-774e-4813-bf40-3bfd311a8d13.png)

Vẫn ví dụ cũ với 2 function kia thôi, giờ mình sẽ giải thích cách dùng breakpoint command để thay thế print.
```
(lldb) b ViewController.swift:24   //Đầu tiên hay add một breakpoint vào dòng 24, sau khi biến sum đã có giá trị
Breakpoint 2: where = LLBDExample`LLBDExample.ViewController.valueOfLife(Swift.Int, Swift.Int) -> Swift.Int + 71 at ViewController.swift:24, address = 0x000000010bd24eb7
(lldb) breakpoint command add 2    //Sau đó hãy add command cho breakpoint có id = 2, command này sẽ chị ngay sau khi breakpoint hit
Enter your debugger command(s).  Type 'DONE' to end.
> p sum                           //in ra giá trị của biến sum
> p a + b                        //in ra giá trị của a + b
> process continue               //cho tiến trình chạy tiếp luôn
> DONE
(lldb) process continue         //cho tiến trình chạy tiếp để xem kết quả in
Process 3020 resuming
 p sum
(Int) $R0 = 17

 p a + b
(Int) $R2 = 15

 process continue
Process 3020 resuming

Command #3 'process continue' continued the target.
52

```
Như các bạn thấy ở trên thì mình đã in ra được giá trị của sum và a+b, có thể thấy hai giá trị này khác nhau và bug sẽ đâu đó nằm trong hàm sumOf kia. Câu lệnh `process continue` ở cuối chuỗi command kia là để tiến trình sẽ chạy ngay lập tức luôn, vì vậy mà chúng ta vẫn có thể in ra giá trị mà không có cảm giác ngắt quãng khi thực thi.Ngoài việc dùng để in ra, hoàn toàn chúng ta có thể làm rất nhiều thứ khi breakpoint hit.
Ngoài ra còn command về `thread` có tính năng tương tự như là nút step-in, step-out, step-over của Xcode debugger.
Trên đây là những tìm hiểu chung của mình về công cụ debug LLBD command, mong sẽ giúp ích cho các bạn trong việc debug được dễ dàng và thuận tiện hơn.
> Reference: https://medium.com/flawless-app-stories/debugging-swift-code-with-lldb-b30c5cf2fd49