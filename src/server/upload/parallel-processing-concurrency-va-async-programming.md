# Giới thiệu
**.NET** cung cấp 1 vài cách cho chúng ta để viết code xử lý bất đồng bộ (**asynchronous**) giúp cho ứng dụng mượt mà hơn khi người dùng trải nghiệm, và viết code xử lý song song (**parallel**) sử dụng **multiple threads** để phát huy tối đa hiệu năng của máy tính.
# Async Programming
## Async Overview
Không bao lâu từ thời trước, các ứng dụng chỉ chạy trên PC, và muốn ứng dụng mượt hơn thì đơn giản phải mua 1 PC hoặc server mới hơn (cấu hình cao hơn), nhưng sau đó thì Mobile phones và VM (máy ảo) xuất hiện. Users muốn UI tương tác tốt (responsive UI) và người chủ muốn các server có thể scale để đáp ứng việc kinh doanh của họ. Việc chuyển dịch sang mobile và cloud, số lượng người dùng internet hơn 3 tỷ đã đưa ra 1 hệ quả tất yếu về 1 nền tảng phần mềm mới (new set of software parterns).
Các ứng dụng client được mong đợi luôn luôn ở chế độ bật, kết nối, và đồng thời phải có UI responsive (tương tác mạnh mẽ, ví dụ là không bị đơ). Các services được trông đợi có thể handle được lượng traffic lớn.
**Async programming** là 1 công nghệ chủ chốt làm cho việc này trở nên đơn giản, xử lý đồng thời các request I/O và các tác vụ đồng thời trên nhiều core. **.NET** cũng đã cung cấp khả năng đó cho các app và service để tương tác tốt hơn trong hầu hết các ngôn ngữ **C#, VB và F#**.

## Why Write Async Code?
Các ứng dụng hiện nay sử dụng file và networking I/O, xử lý theo phong cách truyền thống thì sẽ làm block ứng dụng, kết quả là trải nghiệm user sẽ rất kém. ***Task-based async APIs và lập trình bất đồng bộ asynchronous*** đã sinh ra để giải quyết vấn đề này.

**Async code** có những thuộc tính sau:
* Handle nhiều request bằng các thread khác nhau trong khi đợi các request I/O trả về.
* Cho phép UI tương tác tốt hơn với người dùng bằng cách dùng 1thread để tương tác với UI trong khi các threads khác để handle các I/O request, ngoài ra thì có thể chuyển các công việ long-running cho các CPU core khác xử lý.
* Hiện nay thì rất nhiều .NET API đã viết dưới dạng asynchronous và rất dễ dàng để viết async code trong .NET

Ở phần tiếp theo thì mình sẽ làm rõ các khái niệm khác nhau, đó là **Synchronous** and **Asynchronous** programming model và Single threaded and **multi-threaded** environments. Mỗi programming model (Synchronous và Asynchronous) có thể chạy trên nền single thread hoặc multi-thread.

## Synchronous and Asynchronous
### Synchronous Programming model
Trong mô hình này, 1 thread trong 1 lúc được assign chỉ 1 task và làm việc với task đó. Khi xử lý xong task đó thì thread đó sẵn sàng để xử lý task tiếp theo, nó không thể bỏ giữa chừng việc xử lý 1 task giữa chừng để sang xử lý task khác. Hãy xem mô hình này khi xử lý trong single và multi-thread khác nhau như thế nào.
#### Single Threaded
Nếu chúng ta có 1 loạt task và hệ thống hiện tại chỉ cung cấp 1 single thread, thì chỉ lần lượt từng task được thực hiện bởi thread. Nó có thể được mô tả như hình bên dưới:

![](https://images.viblo.asia/dd377a95-7aaf-4d78-9aac-5e8ca0c838c1.png)

Ở đây chúng ta có thế thấy là có 1 thread và 4 tasks cần được xử lý. Thread bắt xử lý từng task 1 và hoàn thành lần lượt các task.
    
#### Multi-Thread
Ở môi trường này, chúng ta có nhiều thread và chúng có thể nhận lấy các task và bắt đầu xử lý. Có nghĩa là chúng ta có 1 pool chứa các thread và 1 đống task. Và các thread có thê xử lý các task như sau:

![](https://images.viblo.asia/9a098b1d-3129-4019-a055-854a52b9e0d2.png)

Ở đây chúng ta có thể thấy là có 4 thread và 4 task cần hoàn thành. Vì vậy mỗi thread lấy 1 task để thực hiện và hoàn thành.

Hãy xem ở nó thực hiện như thế nào ở model Asynchronous
### Asynchronous Programming Model
#### Single Threaded
Đối ngược với model Synchronous, ở đây 1 single thread có thể xử lý xử lý nhiều task, trong khi xử lý 1 task thì nó có thể lưu lại state của task đó và chuyển sang xử lý 1 task khác, sau đó quay về xử lý task trước, cứ vậy cho đến khi xong hết các task.
![](https://images.viblo.asia/245a9071-19de-4edf-b4bf-dd80cb92352c.png)
Ở đây chúng ta thấy 1 single thread chịu trách nhiệm hoàn thành tất cả task, và quá trình xử lý các task xen kẽ nhau.

#### Multi-Thread
Trong hệ thống có multiple thread thì tất cả các thread cũng có thể làm việc theo mô hình asynchronous

![](https://images.viblo.asia/3013b3f1-8e6f-4a4e-9506-c6114d7077ed.png)

Ở đây chúng ta có thể thấy các task T4, T5, T6 được handle bởi nhiều thread khác nhau. Task T4 được xử lý đầu tiên bởi Thread1 và hoàn thành bởi Thread2. Tương tự, Task T6 được hoàn thành bởi Thread2, Thread3 và Thread4. Điều này cho thấy sự mạnh mẽ của Thread khi xử lý theo mô hình Asynchronous, nó tận dụng tối đa khả năng xử lý của các thread, giúp giảm thời gian xử lý xuống tối đa.

Chúng ta đã hiểu cơ chế xử lý Asynchronous như thế nào, bây giờ hãy sang 1 khái niệm được gọi lại Concurrency.
## Concurrency (xử lý đồng thời)
Hiểu đơn giản, concurrency có nghĩa là xử lý nhiều request ngay tại 1 thời điểm. Giống như chúng ta đã tìm hiểu ở trên, khi nhiều request (nhiều Task) thì nó được xử lý đồng thời có thể bằng Multiple thread hoặc là Asynchronous. 

## Lợi ích của Asynchronous Programming
Có 2 lợi ích quan trọng đó là 
*  Trải nghiệm người dùng  (**Usability**)
Ví dụ khi người dùng click 1 button để lưu data, việc xử lý yêu cầu 1 vài task nhỏ được thực thi như đọc và lấy data từ object, kết nối đến database và lưu trữ data xuống. Vì Database có thể được lưu ở một máy tính khác, nên việc kết nối đến DB có thể tốn nhiều thời gian, nếu ứng dụng không chạy theo cơ chế Asynchronous thì UI có thể bị block khi xử lý Task lưu dữ liệu vào Database, dẫn đến trải nghiệm người dùng không tốt. Vì vậy các ứng dụng ngày nay đều phải làm việc dựa trên Asynchronous model.
* Hiệu suất (**Performance**)
Chúng ta có thể tối đa hiệu suất sử dụng chương trình bằng cách chạy nhiều thread để không lãng phí tài nguyên. Trong khi người dùng có thể thao tác với UI, thì chúng ta vẫn có thể chạy các task ngầm như đo thời gian người dùng đang thao tác, lưu dữ liệu, đồng bộ data, ...

## Asynchrony trong ASP.NET

Async trong ASP.NET có thể làm tăng mạnh performance của ứng dụng của bạn. Hãy xem cách IIS xử lý 1 request

![](https://images.viblo.asia/71f082ac-7e54-49bf-b900-8241f330060f.png)

Khi 1 request tới IIS, nó lấy 1 thread từ CLR thread pool (IIS không chứa bất ký thread-pool nào mà nó sử dụng CLR thread pool) và assign việc xử lý request này cho thread đó. Một số lượng giới hạn thread đã được tạo trước đó và một số có thể được tạo mới. Khi bạn viết code asynchronous (rất easy sử dụng keyword async/await), nó có thể làm tăng đáng kể sức mạnh của server, việc xử lý sẽ nhanh hơn nhiều vì việc xử lý dựa trên nhiều thread và được tối ưu bằng Asynchronous model.
# Parallel Procesing (xử lý song song)
Nhiều máy tính cá nhân và workstations có nhiều CPU core cho phép nhiều thread có thể thực hiện tác vụ đồng thời. Để tối ưu lợi thế của phần cứng, bạn có thể chạy song song (**parallelize**) code để phân tán công việc trên nhiều processor.
Visual Studio và .NET framework support mạnh mẽ cho việc lập trình song song (parallel) bằng việc cung cấp các thư viện, class runtime và các tool để đo đạc các thông số khi chạy code. Nhưng tính năng này giúp việc lập trình song song (parallel) trở nên dễ dàng hơn. Bạn có thể viết những đoạn code đơn giản mà hiệu quả được tối ưu cho parallel code, mà không phải làm việc trực tiếp với thead và thread pool.

Hình ảnh dưới đây mô phỏng tổng quan high-level về kiến trúc lập trình song song (**parallel programming architecture**) ở .NET Framework:

![](https://images.viblo.asia/d15ad760-04f4-4fa4-9e8d-9ca54d6531c2.png)

# Sự khác nhau
## Concurrency
> Doing more than one thing at a time.
Rõ ràng là **Concurrency** rất hữu dụng. Các ứng dụng của end-user sử dụng concurrency để respond user input trong khi lưu dữ liệu vào database. Server application sử dụng concurrency để respond request thứ 2 trong khi hoàn thành request đầu tiền. Bạn cần concurrency ở bất kì thời điểm mà ứng dùng làm 1 việc trong khi vẫn xử lý 1 việc khác. Hầu hết mỗi ứng dụng phần mềm trên thế giới đều nhận thấy lợi ích của concurrency.
## Multithreading
> A form of concurrency that uses multiple threads of execution.
Multithreading liên quan tới việc sử dụng nhiều thread cùng lúc. Đó là 1 dạng của concurrency, nhưng không phải là dạng duy nhất.
Multithreading được ứng dụng ở thread pool, nơi mà các thread được phân bổ tự động để đáp ứng các request. 
## Parallel Processing
> Doing lots of work by dividing it up among multiple threads that run concurrently
**Parallel processing** (hay là parallel programming) sử dụng multithreading để tối ưu hóa việc sử dụng nhiều processor. Các CPUs ngày nay đều có nhiều core, nếu có nhiều công việc cần xử lý, Parallel processing sẽ chia nhỏ công việc ra nhiều thread, và các thread có thể chạy độc lập trên mỗi core khác nhau.
Parallel processing là 1 loại của Multithreading và multithreading là 1 loại của concurrency. 
## Asynchronous Programming
> A form of concurrency that uses futures or callbacks to avoid unnecessary threads.
**Asynchronous programming** là 1 thể loại khác của concurrency vô cùng mạnh mẽ, sử dụng keywork async và await, lập trình đơn giản như synchronous (nonconcurrent).
## Reactive Programming
> A declarative style of programming where the application reacts to events.
Một loại khác của concurrency là **reactive programming**. Asynchronous programing cho phép ứng dụng start 1 operation mà sẽ hoàn thành ở 1 thời gian sau đó. Reactive programming cũng gần giống như asynchronous programming, nhưng nó được xây dựng dựa trên các asynchronous event thay vì asynchronous operation.

# Kết
Bài viết đã chỉ ra các cơ chế xử lý bất đồng bộ được sử dụng trong **.NET**, so sánh 1 số điểm khác nhau giữa một số khái niệm **Parallel Processing, Concurrency, and Async Programming.** Cảm ơn các bạn đã đọc bài.

Bài viết tham khảo một số nguồn sau:
https://codewala.net/2015/07/29/concurrency-vs-multi-threading-vs-asynchronous-programming-explained/
https://docs.microsoft.com/en-us/dotnet/standard/parallel-processing-and-concurrency
https://www.oreilly.com/library/view/concurrency-in-c/9781491906675/ch01.html