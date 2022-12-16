## 1. Giới thiệu
Trong phần trước mình đã giới thiệu đến các bạn  design pattern DDD được đánh giá khá cao trong thời gian gần đây. Domain model là cách chúng ta hiểu biết về thế giới thực và những vấn đề mà phần mềm của chúng ta cần giải quyết, là cách thiết kế kiến trúc ở mức độ hệ thống chứ không phải mức độ class như MVC hay những design pattern khác. Trong bài viết hôm nay mình sẽ cùng với các bạn tìm hiểu sâu hơn về cách ứng dụng của DDD trong dự án như thế nào, cụ thể là framework Laravel.

Trước khi đi vào việc chính chúng ta cần dành thời gian phân tích những gì chúng ta cần đạt được và những gì chúng ta cần tránh trong quá trình làm việc với `DDD` và vì sao chọn Laravel. Chúng ta cùng xem xét 3 quy tắc được đúc kết ra như sau :

**Quy tắc 1:** Tập trung vào Domain của ứng dụng, bản chất của mô hình DDD, Các Model Object cần phải phù hợp với Domain và tuẩn theo ngôn ngữ của dự án.

**Quy tắc 2:**  Sử dụng đúng Framework có khả năng mở rộng thêm và dễ dàng nâng cấp.  Chúng ta có thể dễ dàng đọc hiểu code của Framework khi cần thiết.

**Quy tắc 3:** Hạn chế phải maintain với 2 phiên bản, một mà chỉ có Domain hiểu và một chỉ có Laravel hiểu , chúng ta cần sử dụng ngôn ngữ chung cho 2 phần này.

## 2. layer structure
![](https://images.viblo.asia/ae975596-ab57-43db-b597-c148089cc3fb.png)

Một trong những khái niệm quan trọng của DDD là nó tách biệt phần logic ra khỏi ứng dụng của bạn. Điều này giúp cho lập trình viên dễ dàng phân tích khi hệ thống của họ phức tạp hơn, và kiến trúc phân tầng được đưa ra, chúng ta có thể thực hiện được bằng nhiều cách miễn sao cho phần logic Domain được cô lập.
Theo kiến trúc trên quy chiếu với các thư mục code Laravel chúng ta có thể phân loại từng thư mục vào từng lớp như sau:

![](https://images.viblo.asia/190a81cf-0342-4ba8-9e50-06a73005b66a.png)

Và thực sự khó khăn để quyết định xem một thư mục nên nằm trong layer nào thì hợp lý,  Ví dụ chúng ta làm việc với Eloquent và rõ ràng ta biết nó nằm trong thư mục vendor (Infrastructure), Tuy nhiên thì phần lớn code logic của nó trong Domain Model lại lại kế thưa rất nhiều từ lớp ứng dụng (Application) cho nên cấu trúc của chúng ta có thể như thế này :
![](https://images.viblo.asia/83f04722-ec3a-4a2a-9e1c-baf2a049e111.png)

Từ đó chúng ta có thể thấy rằng cấu trúc này khá bất cập, vì mối liên kết của các thành phần thực sự không rõ ràng đúng không. Vì vậy hãy cùng xem xét một cấu trúc khác sau đây.

## 3. compromising structure

![](https://images.viblo.asia/d493b4f2-498e-4ccb-a83f-b8c16e5d992a.png)

Kiến trúc này giúp chúng ta giải quyết các câu hỏi:
1.  Làm sao cho ứng dụng của chúng ta available với nhiều interface khác nhau
2.   Cách phối hợp domain với các app folder
3.   Cách định nghĩa các business logic trong laravel
4.   Sử dụng tốt các dependency trong Laravel

## 4. Tập trung vào Domain

![](https://images.viblo.asia/24b84439-bcd6-4be2-b932-bb65e3cbe297.png)

Như đã nói Domain được hình thành bởi rất nhiều modules, trong đó chứa các object model của chúng ta. Những object này có thể là các `định danh`, `thực thể (Entities)` hoặc các `Value Objects`. Tập hợp các Value Objects và các thực thể cho chúng ta một `Aggregate`. 
Đôi khi Domain không có nghĩa phải là đối tượng cụ thể, nó có thể chỉ hiểu đơn giản dùng để tính toán đầu vào/ đầu ra. Chúng ta gọi đó là các `Services`.
Ngoài ra chúng ta có `Repository` là  Interface cho chúng ta biết cách duy trì của model, và `Factory` là cách tạo một một đối tượng cụ thể như thế nào.

## 5. Sử dụng Framework cho Domain
Chúng ta sẽ tự hỏi là làm sao có thể vẫn sử dụng Laravel mà lại đặt phần logic tách biệt bên ngoài ứng dụng, thật sự khó hiểu phải không?
- Chúng ta có thể sử dụng PHP thuần để làm việc này, tuy nhiên đồng nghĩa với việc chúng ta sẽ mất đi sức mạnh của Laravel: Eloquent, rõ ràng điều này đã làm trái với `quy tắc 2`.
- Chúng ta có thể  cho các Entities và các Aggregates kế thừa Eloquent để sử dụng tối đa sức mạnh của nó, tuy nhiên khi đó chúng ta lại quên đi việc tập trung vào Domain, điều này vi phạm `Quy tắc 1` ở trên.
Giờ đây cấu trúc ứng dụng của chúng ta có thể như thế này:

![](https://images.viblo.asia/009050e3-8be6-4864-80cd-74287707ff69.png)

Trong lớp cơ sở hạ tầng (Infrastructure) là nơi chúng ta có thể thực hiện 
```
use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
```
Cung cấp bởi các thư mục `vendor`, `storage` hay `config`  ngoại trừ `database` vì nó đã được đóng gói bởi các `repository interfaces`.

## 6. Sử dụng Domain trong ứng dụng của chúng ta

![](https://images.viblo.asia/6b520daa-5264-42af-ad90-809e1d19c8a0.png)

Tiếp theo chúng ta chỉ cần đơn giản là thêm vào các lớp còn lại những thành phần của Laravel mà chúng ta đã biết,
- `Router` là đầu vào ứng dụng của chúng ta bao gồm web.php, api.php, console.php ...
- Trước khi các request đến được với tầng logic thì nó cần đi qua `middleware `, hoặc pass qua `Requests ` hoặc `Policies`.
- Cuối cùng sẽ đến các phần Controller như chúng ta đã biết.


Điểm cuối cùng là chúng ta còn thiếu việc triển khai các Interface trong Domain ra tầng ứng dụng, chúng ta sẽ có mô hình cuối cùng như sau :

![](https://images.viblo.asia/b8d24f34-407f-4320-b1aa-4c01baf349d9.png)

## 7. Kết luận
Trên đây là toàn bộ kiến trúc mà chúng ta sẽ áp dụng khi sử dụng DDD và Laravel, Thực sự đây là một kiến thức mới khá khó hiểu mình đang cố gắng tiêu hóa, bằng cách đi nhặt lượm các nguồn khác nhau, hy vọng giúp các bạn phần nào hiểu được cách thức xây dựng một ứng dụng dùng DDD như thế nào, còn về chi tiết code ra sao mình sẽ tiếp tục nghiên cứu và chia sẻ cho mọi người trong bài viết sau. Cảm ơn mọi người đã theo dõi :D