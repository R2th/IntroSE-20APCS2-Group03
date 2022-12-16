ReactiveX là một framework tuyệt vời cho phép viết mã dựa trên sự kiện một cách rất thanh thoát và dễ đọc. Tuy nhiên, bắt đầu với nó có thể là thách thức. Trên thực tế, một khi bạn hiểu một số nguyên tắc chính của ReactiveX, bạn có thể bắt đầu viết code một cách dễ dàng.
Mục đích của bài viết này là giải thích các nguyên tắc chính này và chỉ ra cách chúng áp dụng thông qua một ví dụ đơn giản. 

Trước khi đọc tiếp, hãy lưu ý một điều quan trọng: Lập trình reactive rất gây nghiện! Một khi bạn bắt đầu nghĩ như một `luồng dữ liệu` thay vì `luồng điều khiển`, bạn có xu hướng coi rằng nó giải quyết vấn đề tốt hơn các phương pháp lập trình khác và bạn sử dụng lập trình reactive ngày càng nhiều.

### Lập trình Reactive và ReactiveX

Vậy lập trình reactive là gì? Đó là một cách để viết mã event driven code. Tên gọi này xuất phát từ thực tế là mã reactive bao gồm các thực thể tương tác với các sự kiện được phát ra từ nguồn. Các thực thể này áp dụng các phép biến đổi trên các sự kiện này và kết quả là trả về các sự kiện khác. Vì vậy, các thực thể này - được đặt tên là operators - có thể được xâu chuỗi với nhau, để tạo ra các đồ thị tính toán.
Đồ thị tính toán reactive luôn có hướng. Chúng chỉ chảy theo một chiều. Một số đồ thị là Đồ thị vòng có hướng - DAG - như biểu đồ sau:
![](https://images.viblo.asia/5b49735c-7020-4175-af1e-4f9fe1ca8c8f.png)

Trên biểu đồ này, các nút đại diện cho các phép tính và  đường liên kết giữa các phép tính.

Một số đồ thị cũng có thể là Đồ thị chu kỳ như sau:
![](https://images.viblo.asia/b1176a76-da6a-4fb1-bd6c-138b7a4d2768.png)

Đồ thị chu kỳ rất phổ biến khi viết một ứng dụng hoàn toàn bằng reactive. Hầu hết thời gian, phần chính của đồ thị ứng dụng là dạng ko có tính chu kỳ và phần phụ có thể có chu kỳ.
ReactiveX là cách triển khai phổ biến nhất của Lập trình reactive. Một lý do là nó là một trong những thư viện phản ứng đầu tiên. Ban đầu nó được phát triển bởi Microsoft cho nền tảng .net. Kể từ năm 2012, nó trở thành open source và đã được chuyển sang hơn 20 ngôn ngữ lập trình.
Triển khai python của ReactiveX chính là RxPY. Thư viện này có sẵn trên pypi và có thể được cài đặt bằng pip:

```
pip3 install rx
```

### Observable, Observer, Operator

Nền tảng của ReactiveX chỉ dựa trên một số nguyên tắc chính được mô tả trong `Observable Contract`. Khi bạn hiểu các nguyên tắc này, bạn sẽ hiểu rõ ràng hành vi của bất kỳ mã ReactiveX nào.
Thực thể cơ sở trong ReactiveX là `Observable`. `Obserable` là một entity nguồn của `item`. `Item` là thuật ngữ ReactiveX cho một sự kiện. Bạn có thể coi rằng một `Observable` là một dòng sự kiện.

Thực thể thứ hai là `Observer`. `Observer` là thực thể đăng ký tới `Observers` để nó có thể xử lý các `Items` khi chúng được phát ra. Điều này có nghĩa là một Observable không phát ra các `Items` cho đến khi một `Observer` đăng ký với nó. Khi một `Observable` được tạo, không có luồng dữ liệu nào xảy ra. Luồng dữ liệu bắt đầu tại thời điểm đăng ký, không phải tại thời điểm tạo.

Sau đó, chúng ta có thể kết hợp một `Observer` và một `Observable` để tạo ra một `Operator`. Một `Operator` đăng ký một  `Observable` nguồn, áp dụng một số phép biến đổi cho các `Items` đến và phát ra các `Items` mới trên một Observable khác.

Đây là tất cả những gì bạn cần để hiểu cách hoạt động của ReactiveX! Chúng ta sẽ đi vào chi tiết hơn trong các đoạn sau, nhưng tất cả đều kết thúc với việc hiểu bốn khái niệm sau: Observable, Observer, Subscription, Operator

### Marble Diagrams

Đây là của sơ đồ cẩm thạch: Một ví dụ để biểu diễn hành vi của một operator. Bạn sẽ tìm thấy những sơ đồ như vậy hầu như ở khắp mọi nơi trong các tài liệu. Hãy xem xét operator map. Toán tử này lấy các mục từ một nguồn Observable, áp dụng một hàm chuyển đổi và trả về một giá trị Observable với hàm chuyển đổi được áp dụng trên các `items` nguồn. Cái này khá đơn giản, nhưng cũng khá dài dòng để giải thích bằng text. Sơ đồ cẩm thạch của operator map là một cách dễ dàng hơn để giải thích điều này và cũng là một cách trực quan để hiểu cách hoạt động của ReactiveX:
![](https://images.viblo.asia/446668cf-6d85-433e-bdc8-eec1dfbd0311.png)

Có ba phần trong sơ đồ này:
* Mũi tên trên cùng biểu thị nguồn Observable : Khi được đăng ký, nguồn Observable này phát ra các số từ 1 đến 4.
* Hình chữ nhật đại diện cho tính toán được thực hiện bởi operator. Trong ví dụ này, mỗi item bị trừ đi 1
* Mũi tên dưới cùng đại diện cho sink Obserable. Kết quả của việc trừ đi 1 cho mỗi items, nó sẽ tạo ra các items từ 0 đến 3.

Trên sơ đồ cẩm thạch, thời gian tăng dần từ trái sang phải. Vì vậy, mục ngoài cùng bên trái được phát ra trước mục ngoài cùng bên phải. Phần cuối của các mũi tên có thể có các hình dạng khác nhau, mỗi mũi tên chỉ ra những cách khác nhau để Observable hoàn thành:
![](https://images.viblo.asia/5ccd2a63-cf43-4f4e-9e5b-b408b7d90b33.png)

Một Dòng kết thúc bằng một mũi tên có nghĩa là Observable sẽ tiếp tục phát ra các items trong tương lai. Các vòng tròn trên dòng là vị trí thời gian khi các mục được phát ra.

Một dòng kết thúc bằng một đường ống - | - cho biết rằng Observable kết thúc khi thành công. Không có thêm items nào có thể được phát ra sau đó.

Một dòng kết thúc bằng dấu chéo - X - cho biết rằng Observable kết thúc do lỗi. Không có thêm items nào có thể được phát ra sau đó.

### Sơ đồ Reactivity

Biểu đồ reactivity là một dạng biểu diễn khác. Chúng được sử dụng để mô tả hành vi của một ứng dụng hoặc một thành phần. Chúng tương tự như Sơ đồ hoạt động UML, nhưng chúng mô tả luồng dữ liệu thay vì luồng điều khiển. Hãy xem xét một ứng dụng đơn giản lấy một nguồn có thể Observable làm đầu vào, giảm giá trị và chỉ giữ lại các giá trị chẵn. Đây là sơ đồ reactivity của ứng dụng này:

![](https://images.viblo.asia/2b932a90-ef11-4313-b54a-d65c0c63c62e.png)

Vòng tròn màu đen cho biết nguồn Observable. Các hình chữ nhật tròn là operator. Ở đây chúng tôi xâu chuỗi hai toán tử: *map* và *filter*. Vòng tròn đen bao quanh là phần chìm của luồng dữ liệu.
Các đồ thị phức tạp hơn có thể được mô tả theo cách tương tự. Biểu đồ reactivity là một cách tốt để làm việc trên kiến trúc trước khi viết mã. Xem ở đây một ví dụ đơn giản khác với đồ thị chu trình:

![](https://images.viblo.asia/7d8b3cad-a0ba-4144-9e37-a11f2e80aebc.png)

### Show Me some code !
Bây giờ bạn đã sẵn sàng để đọc và viết mã ReactiveX! Hãy triển khai code tương ứng với sơ đồ phản ứng đầu tiên của phần trước. Chúng ta sẽ cần:
```
import rx
import rx.operators as ops
```

Bước đầu tiên là tạo một nguồn Observable. Chúng tôi không sử dụng dữ liệu thực ở đây, mà thay vào đó chúng tôi tạo một Observable từ một danh sách. 

```
import rx
import rx.operators as ops

source = rx.from_iterable([1, 2, 3, 4])
```

Sau đó, chúng tôi xây dựng các hàm tính toán. Cái này bao gồm hai toán tử: *map* và *filter*.

```
import rx
import rx.operators as ops

source = rx.from_iterable([1, 2, 3, 4])

source.pipe(
    ops.map(lambda i: i - 1),
    ops.filter(lambda i: i % 2 == 0),
)
```

Pipe Operator cho phép tạo chuỗi dây chuyền operators. Đây là một cách dễ dàng để tạo Graphs. Các toán tử *map* và *filter* lấy các hàm làm tham số. Chúng ta sử dụng `lambdas` ở đây cho những tính toán đơn giản này.
Bạn có thể thực thi mã này rồi. Tuy nhiên, hãy nhớ rằng sẽ không có gì xảy ra: Graph được tạo nhưng không ai đăng ký nó, vì vậy chưa có luồng dữ liệu nào. Hãy làm như sau : 

```
import rx
import rx.operators as ops

source = rx.from_iterable([1, 2, 3, 4])

source.pipe(
    ops.map(lambda i: i - 1),
    ops.filter(lambda i: i % 2 == 0),
).subscribe(
    on_next=lambda i: print("on_next: {}".format(i)),
    on_completed=lambda: print("on_completed"),
    on_error=lambda e: print("on_error: {}".format(e))
)
```

Phương thức đăng ký… đăng ký một Observable. Nó có ba lệnh callback. Các lệnh gọi lại này sẽ được gọi vào các thời điểm khác nhau:
* *onnext* được gọi mỗi khi nhận được một items.
* *oncompleted* được gọi khi Observable hoàn thành thành công.
* *onerror* được gọi khi Observable hoàn thành do lỗi.
Lưu ý rằng theo Observable Contract, lệnh gọi lại *onnext* sẽ không bao giờ được gọi sau lệnh gọi lại *oncompleted* và *onerror*.

Có một bước cuối cùng cần thiết để dọn dẹp tài nguyên khi hoàn thành. Đối với vấn đề này này, phương thức đăng ký trả về một đối tượng dùng một lần. Phương thức xử lý của đối tượng Dùng một lần này có thể được gọi để dọn dẹp các tài nguyên:

```
import rx
import rx.operators as ops

source = rx.from_iterable([1, 2, 3, 4])

disposable = source.pipe(
    ops.map(lambda i: i - 1),
    ops.filter(lambda i: i % 2 == 0),
).subscribe(
    on_next=lambda i: print("on_next: {}".format(i)),
    on_completed=lambda: print("on_completed"),
    on_error=lambda e: print("on_error: {}".format(e)),
)

disposable.dispose()
print("Done!")
```

### Error Management


Được rồi, mã chạy ổn, nhưng điều gì sẽ xảy ra nếu nguồn Observable chứa chuỗi thay vì số nguyên?

Thay thế nguồn có thể quan sát được bằng:

```
source = rx.from iterable([1, ”foo” , 3, 4])
```

Kết quả trả về:
```
$ python demo1_error.py
on_next: 0
on_error: unsupported operand type(s) for -:
        ’str’ and ’int’
Done!
```

*on_error* đã được gọi với ngoại lệ. Vậy điều gì đã xảy ra ở đây? Và sau đó thì toán tử *filter* sẽ xử lý cái gì sau toán tử *map*?
Lời giải thích đầy đủ nằm trong hình sau:

![](https://images.viblo.asia/b689ac3d-d894-4718-ba5f-3042e5c4e7fd.png)

Có thể thấy một toán tử đang làm việc trên hai luồng dữ liệu song song:
* Happy path xử lý tất cả các items đến
* Error path xử lý lỗi

Đây là cách ứng dụng mình viết ở trên chạy: Mỗi khi một items được phát ra, nó sẽ đi qua happy path của toán tử *map* (tức là giá trị của nó bị giảm). Nếu mọi việc suôn sẻ, item kết quả sẽ tiếp tục trên happy path của toán tử *filter*. Khi thành công, lệnh *on_next* được gọi.

Trong trường hợp có lỗi trong toán tử *map*, operator map sẽ bắt ngoại lệ và phát ra nó trên error path. Ngoại lệ được chuyển tiếp đến error path của toán tử *filter*. Toán tử *filter* chỉ chuyển tiếp nó xuống downstream và lệnh *on_error* được gọi.

Có thể dễ dàng nhận thấy, operator handle lỗi rất rõ ràng và minh bạch. Ngoài ra còn có một số operators dành riêng cho việc quản lý lỗi, chẳng hạn như retry đăng ký hoặc timeout.

Điều tuyệt vời với cấu trúc này là trong nhiều trường hợp, bạn được quản lý lỗi miễn phí. 


### Concurrency

Trong ví dụ triển khai ở trên chúng ta đã thực hiện `blocking`: Tất cả tính toán được thực hiện trong lệnh gọi phương thức đăng ký. Đây là hành vi mặc định của ReactiveX, nhưng nó không phải lúc nào cũng là điều được mong muốn. Đôi khi chúng ta cần quản lý các xử lý đồng thời kiểu như IO hoặc CPU. ReactiveX xử lý đồng thời thông qua operators chuyện dụng và schedulers.

Scheduler là đối tượng quản lý luồng và vòng lặp sự kiện. RxPY triển khai các scheduler để đối phó với xử lý song song thông qua các luồng và nhóm luồng. Nó cũng cung cấp scheduler cho IO đồng thời với AsyncIO, Twisted, GEvent và Eventlet.

Chúng ta sẽ tìm hiểu phần này sau!

### Kết luận

Bây giờ bạn có tất cả cái khái niệm để bắt đầu sử dụng Lập trình reactive. 
Khi bạn đã quen thuộc với điều này, các khái niệm khác như các multicasting, hot/cold Observable và higher order Observable cũng sẽ dễ dàng có thể tiêp cận được.
Mình sẽ dịch và tìm hiểu thêm về vấn đề này trong các bài viết tiếp theo.

Nguồn : 
https://medium.com/swlh/an-introduction-to-reactive-programming-in-python-a9985e4c43b9