Tại sao biểu đồ Memory của tôi lại thành ra thế này ? 

Đó là câu hỏi mà mình thường xuyên nhận được.

Và để điều tra vấn đề đó, tôi có 1 tool [Web server request simulator](https://github.com/schneems/simulate_ruby_web_memory_use) giúp tạo request và thống kê lượng memory mà ruby đang sử dụng.

Từ output của nó, ta sẽ debug và tìm hiểu nguyên nhân tại sao web app của ta lại có biểu đồ memory dư lày:

![Memory chart](https://images.viblo.asia/9734b3af-b43d-4145-a2d2-ee9860fc5fc9.png)

> Trông rất giống hàm logarit. Cái đoạn tạo thành đường ngang ngang là *Lim* - tiệm cận

Trong bài viết này, ta sẽ thảo luận nguyên nhân tại sao hình dạng memory sử dụng qua thời gian lại không phải là hình răng cưa như mình tưởng tượng :thinking:.

### 1 request 1 thread

Dưới đây là kết quả khi ta có 1 thread xử lý 1 request:

![](https://images.viblo.asia/1ae662aa-7ab3-456c-be76-af94d80b37e5.png)

Trục hoành tương ứng với thời gian, trục tung là lượng memory sử dụng. 

Theo thời gian, thread của ta sẽ xử lý request và cấp phát objects -> Điều này yêu cầu nhiều Memory hơn -> hành vi này thể hiện ra một đường chéo đi về phía đông bắc.
Một khi request kết thúc, memory trở về 0, và biểu đổ sẽ tạo hình 🦷.

### Multiple request trên 1 thread

Giờ ta đã hiểu về format của output, hãy tạo ra thêm và request và nhìn vào "Max total" memory:

![](https://images.viblo.asia/de493769-1c91-42fd-bc76-c4490367e45d.png)

Cái đường "max total" ở biểu đồ đánh dấu tổng dung lượng memory tối đa cần thiết để chạy app.

Trong ví dụ này, request đầu tiên cần một lượng lớn Memory.

Ruby sẽ cấp phát đủ tài nguyên để task có thể hoàn thành. 

Sau đó nó sẽ tiên tri (case này thì đoán đúng :v) rằng trong tương lai, bạn có thể cần dùng lượng memory đó, vì vậy nó giữ lại mà không giải phóng.

Một điều quan trọng về biểu đồ này là, các request khác nhau có yêu cầu lượng objects được cấp phát khác nhau. 

Vì vậy, hình dạng của biểu đồ có thể đại diện cho các request có endpoint hoặc parameters khác nhau ví dụ như `/users?per_page=2` vs `/users?per_page=42_000`.

### 2 Thread - mỗi thread 1 request

App của bạn hiếm khi chỉ phục vụ 1 request tại 1 thời điểm. Vậy server xử lý 2 process đồng thời thì memory trông sẽ thế nào?

Khi ta tạo nhiều requests cùng lúc, mức memory sử dụng sẽ là tổng cộng của tất cả các thread tại 1 thời điểm:

![](https://images.viblo.asia/802dee85-aa47-4396-ae18-3e8e91757f20.png)

Trong ví dụ này, request đầu tiên cần tới memory, và trong quá trình nó đang cấp phát, request tiếp theo ập đến. 

Bạn có thể thấy cả 2 thread đều xử lý request, "Max total" tăng bằng tổng cả tất cả các thread.

Thread 2 cần 222 memory units, trong lúc đó thread 1 là 74 unit => Con số "Max total" rơi vào 296 units.
![](https://images.viblo.asia/1ca04a4d-21aa-4e58-89d4-3cfc26769fca.png)


### 2 thread - mỗi thread 10 request

Dưới đây là ví dụ với 10 request ở mỗi thread:

![](https://images.viblo.asia/1ca04a4d-21aa-4e58-89d4-3cfc26769fca.png)

Tại thời điểm dòng "Max total" nhảy cách xa các đường khác, đó là lúc mà hệ thống đang xử lý đồng thời nhiều request.

### 2 thread - 1000 request mỗi thread

![](https://images.viblo.asia/b868e465-c3d7-47ec-afd7-8851c6a8453a.png)

Phải mất một lúc, nhưng dần dần lượng memory sử dụng đã tăng gấp đôi. 

Request lớn nhất của thread 1 và 2 đạt giá trị max tầm 390 units. Và tổng lượng memory sử dụng rơi vào tầm `780 (390 * 2)`. 

Vậy chuyện gì xảy ra nếu ta add thêm thread thứ 3? Liệu nó có lên mức 1170 memory unit không nhể ?

![](https://images.viblo.asia/074c9cee-bd4d-4921-b09e-1a7fa75aafc5.png)

Ta daaa!!! 

Con số đếch liên quan luôn, thậm chí nó còn không gần tới mức 1170 units tý nào, mà lượng memory sử dụng còn thấp hơn cả 2 thread ? Nhưng tại sao vậy?

Tổng lượng memory sử dụng không chỉ phụ thuộc vào số lượng threads, mà nó còn ảnh hưởng bởi sự **phân phối requests** mà ta đang có.

Khả năng các large request ập tới cùng lúc vào cả 3 thread vào cùng 1 thời điểm là bao nhiêu? Trong trường hợp này, điều đó đã không xảy ra, nhưng không có nghĩa là nó sẽ không bao giờ xảy ra.

### 10 threads

Chuyện gì xảy ra nếu ta tăng từ 2 threads lên 10 threads? Liệu rằng lượng memory sử dụng sẽ 10x?

![](https://images.viblo.asia/7e7379bd-cd4a-464b-8b8d-feb6c9e70861.png)

Nếu 10x memory, tức là ta kỳ vọng lượng memory unit sử dụng là `3900 (10 * 390)`.

Biều đồ thể hiện con số cách rất xa 3900. 
Vì để đạt được điều đó, cả 10 threads phải phục vụ largest request trong cùng 1 thời điểm. 

Trong khi cái hệ thống giả lập này đang là random =))

### Tất cả những điều trên có nghĩa là?

Dưới đây là một số kết luận bạn có thể rút ra từ vài cái mô phỏng này:

- Tổng lượng memory sử dụng **tỷ lệ thuận với số lượng threads.**
- Việc memory sử dụng bởi từng thread ảnh hưởng từ **request lớn nhất mà thread đó xử lý.**
- Tổng memory sử dụng dựa trên lượng **phân phối request lớn nhất trong cùng 1 thời điểm. **
- Khi chạy app trong một khoảng thời gian, **lượng memory sẽ cứ tăng dần cho đến khi nó đạt trạng thái ổn định.**

### Áp dụng

Nếu bạn muốn app của mình sử dụng ít memory hơn, bạn cần thay đổi một trong những yếu tố mà tôi kể bên trên: *Số lượng thread*, *request lớn nhất có thể có*,  hoặc cách *phân phối requests*.

Bạn có thể giảm số lượng thread để giảm memory, nhưng điều đó cũng giảm thông lượng app xuống.

Bạn có thể cấp thêm tài nguyên bằng cách scale out - add thêm servers. 
Việc tăng server lên giúp các request sẽ được phân tán tới nhiều servers, và tỷ lệ tất cả các threads trên 1 server đều xử lý request lớn tại 1 thời điểm sẽ giảm xuống.

Chiến lược này sẽ hiệu quả trong khi lượng server nhỏ. 

Nhưng lợi ích của nó sẽ giảm dần nếu lượng servers là rất lớn. Tức là việc tăng từ 99 servers lên 100 servers sẽ không có tác động đáng kể tới tổng thể lượng request tới từng máy nữa.

Theo kinh nghiệm của tôi, cả 2 cách trên đều không phải là giải pháp lâu dài. 

Giảm lượng objects cấp phát mới là hướng đi tốt nhất để giảm lượng memory sử dụng xuống.

TIn tốt, việc giảm objects còn giúp app của bạn chạy hơn.
Tin xấu, nó là công việc không dễ dàng chút nào, tốn nhiều effort để điều tra sâu, và nhiều lúc phải vọc tới các gem nữa.

Khi tiến hành giảm lượng memory sử dụng trong hệ thống, hãy tập trung vào những endpoint lớn nhất trước. 

Giả sử có thể giảm request lớn nhất trong ví dụ 2 của tôi, từ 390 -> 195, thì 10 threads trong trường hợp xấu nhất cũng chỉ dùng tới 1950 units.

**Vấn đề về memory không phải đến từ webserver hay framework, hay thậm chí cả ngôn ngữ đang sử dụng. Nó thường tới trực tiếp từ business/application logic mà bạn ( hoặc team bạn) viết ra.**

### Nguồn:

https://www.schneems.com/2019/11/07/why-does-my-apps-memory-usage-grow-asymptotically-over-time/