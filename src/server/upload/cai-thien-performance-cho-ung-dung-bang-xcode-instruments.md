# Sử dụng Xcode Instruments để cải thiện performance cho ứng dụng 


-----
> Xcode Instruments là 1 công cụ phát triển kèm trong Xcode . Nó có rất nhiều công cụ hữu ích để kiểm tra và cải thiện ứng dụng của bạn.Mặc dù nó có rất nhiều thứ đáng để sử dụng nhưng nó thường là một công cụ ít được biết đến :grin:
-----

Trong bài viết này, mình sẽ cho bạn thấy 1 ví dụ về việc đã cải thiện hiệu suất như thế nào trong ứng dụng [Collect](https://collect.wetransfer.com/) được phát triển bởi **WeTransfer** bằng cách sử dụng Xcode Instruments. Để cho bạn dễ hình dung về ý tưởng này , [đây](https://www.avanderlee.com/wp-content/uploads/2019/08/Xcode-Instruments-Before-and-after.mp4) là kết quả của trước và sau khi sử dụng Xcode Instruments.

 Như bạn thấy phần **“Importing photos”** đã được cải thiện mạnh mẽ :+1: và ở phiên bản cũ popup **“Importing photos”** hiện lên lâu hơn so với sau khi cải thiện và cả bảng share cũng delay như vậy :sweat_smile:

Vậy hãy xem cải thiện việc này như thế nào nhé :smile:

## 1. Xcode Instruments là gì ?

Xcode Instruments là một công cụ kiểm tra và phân tích hiệu suất mạnh mẽ và linh hoạt được đánh giá là tốt nhất. Nó là một phần của bộ công cụ Xcode, bao gồm công cụ như trình kiểm tra khả năng truy cập.

Các công cụ có thể được sử dụng để:

* Theo dõi các vấn đề trong mã nguồn của bạn
* Phân tích hiệu suất ứng dụng của bạn
* Tìm vấn đề về bộ nhớ

Và còn nhiều tính năng khác nữa :heart_eyes:

## 2. Làm sao để có thể sử dụng Xcode Instruments?

Bạn có thể truy cập Instruments bằng cách ấn **`Product ➔ Profile`** từ menu của Xcode hoặc tổ hợp phím tắt **`⌘ + I`**. Việc này sẽ xây dựng lại sản phẩm của bạn và mở ra bảng tổng quan về Xcode Instruments.

![](https://images.viblo.asia/0e1570d0-6dc5-47da-b376-73a5fd35f596.png)

Tổng quan cho ta thấy có 17 công cụ khác nhau, mỗi cái trong số chúng có thể rất có giá trị nhưng chắc chắn không cần thiết cho mọi ứng dụng. Một số trong số chúng, ví dụ như công cụ **`Game Performance`** chỉ có giá trị nếu bạn phát triển trò chơi. Như vậy bạn có thể gặp phải một vấn đề có thể được giải quyết hoàn hảo bằng một trong những công cụ có sẵn trên.

Vậy có thể sử dụng các instruments trong simulator được không :thinking:? 

Câu trả lời là có mặc dù hầu hết các thiết bị đều có thể chạy trên simulator, nhưng không phải lúc nào bạn cũng nên làm như vậy. Một thiết bị thật sẽ hiển thị kết quả thực tế hơn và do đó nên sử dụng chúng.

## 3. Sử dụng Xcode Instruments Time Profiler để điều tra và cải thiện hiệu suất

Công cụ **Time Profiler** cung cấp cái nhìn sâu hơn về CPU của hệ thống và hiệu quả khi nhiều lõi và luồng được sử dụng. Phần này trong ứng dụng của bạn càng tốt thì ứng dụng của bạn càng hoạt động tốt hơn.

Trong ví dụ về hiệu suất của ứng dụng **Collect** trên, chúng ta đã có mục tiêu tăng tốc độ thêm nội dung vào ứng dụng của mình. **Time Profiler** là điểm khởi đầu của chúng ta để hiểu rõ hơn về phần nào của code có thể được tối ưu hóa.

### 3.1 Tạo bản ghi mới bằng công cụ Time Profiler

Sau khi chọn **Time Profiler** Instrument,  chúng ta có thể bắt đầu bản ghi mới bằng cách nhấn nút màu đỏ ở trên cùng bên trái hoặc sử dụng tổ hợp phím **⌘ + R**. Việc này sẽ khởi chạy ứng dụng của bạn trong thiết bị được chọn sau đó bạn có thể bắt đầu luồng của mình.

Sau khi bạn kết thúc luồng bạn muốn cải thiện, bạn có thể dừng bản ghi và đi sâu vào kết quả. Trước tiên chúng ta muốn biết main thread được sử dụng như thế nào. Giao diện của người dùng bị block khi có rất nhiều công việc xảy ra trên main thread, đó chính xác là vấn đề chúng ta gặp phải trong ứng dụng **Collect** ở trên. 

### 3.2 Sử dụng FILTERS để tạo tổng quan về THREADS 
Thanh *FILTER* có thể được sử dụng để thu hẹp tổng quan và hiểu rõ hơn về các threads được sử dụng bằng cách chọn tab *THREAD*. Cuộn xuống cho ta thấy rằng main thread của chúng ta được sử dụng rất nhiều trong khi các thread khác không quá bận rộn:

![](https://images.viblo.asia/095d04f1-e369-4634-ac86-4a0cc1b5a297.png)

### 3.3 Xác định đoạn Code có thể tối ưu hoá 

Sử dụng **`⌘ + D`** để mở ra khu vực chi tiết nếu nó chưa hiển thị. Điều này cho thấy tên biểu tượng cho giai đoạn nổi bật. Trong ví dụ trước, bạn có thể thấy các đỉnh trong biểu đồ được tô sáng màu xanh lam. Bạn có thể làm tương tự bằng cách sử dụng nhấp và kéo vào phần bạn muốn điều tra. 

Lúc đầu, nó trông khá khó sử dụng khi nhìn vào các tên biểu tượng trong vùng chi tiết:

![](https://images.viblo.asia/814002a4-3cb6-4f5b-9f8f-9f699b861be8.png)

Mặc dù phía bên phải của khu vực chi tiết cho chúng ta thấy phần **Heaviest Stack Trace**, chúng ta có thể sử dụng bộ lọc đầu vào **Call Tree** để có cái nhìn tổng quan hơn nữa. Điều này cũng sẽ cải thiện chế độ xem **Heaviest Stack Trace** bằng cách ẩn các biểu tượng nhất định. 

![](https://images.viblo.asia/30a3298d-e4d5-43ef-b795-5b5aed6b40b3.png)

Chúng ta sẽ chọn **Hide system libraries**, việc này sẽ lấy đi tất cả các biểu tượng cấp thấp hơn không nằm trong tầm kiểm soát của chúng ta và có thể được tối ưu hóa hơn. Như bạn có thể thấy, tổng quan về **Heaviest Stack Trace** hiện đã sạch hơn rất nhiều so với trước.

Tiếp theo là bộ lọc **Invert Call Tree** sẽ làm cho các method cấp cao nhất hiển thị mà không cần phải nhấp qua từng **Call tree**. Kết hợp với sắp xếp trên cột **Weight**, chúng ta có thể thấy chính xác những method nào cần được tối ưu hóa.

![](https://images.viblo.asia/0261893b-a134-4180-830a-e13b475e3e8c.png)

Nó cho ta thấy rõ ràng là code **`PHImageManager`** của chúng ta đang hoạt động kém nhất vì mất 3,36 giây trong tổng số 11,16 giây. Hóa ra chúng ta có thể di chuyển cái này sang một background thread khá dễ dàng và giảm tải cho main thread phần này.

Sau khi bạn cải thiện code của mình, đây là lúc bạn chạy lại **Time Profiler** và xác thực các kết quả để đảm bảo rằng nó đã thực sự được cải thiện.

![](https://images.viblo.asia/61864502-1710-4039-8297-a20b5054d942.png)

Mặc dù chúng ta đã thấy những cải tiến đã có trong video lúc trước và sau khi chia sẻ ở trên, bây giờ chúng ta cũng có thể thấy rằng cùng một luồng không còn chứa `PHImageManager` là **Heaviest Stack Trace** nữa. Điều này đã xác nhận rằng việc thay đổi code của chúng ta đã hoạt động và hiệu suất flow của chúng ta đã được cải thiện :heart_eyes:

## 4. Tổng kết 

 Xcode Instruments chứa rất nhiều công cụ có giá trị để cải thiện hiệu suất của ứng dụng của bạn. **Time Profiler** có thể được sử dụng để đi sâu vào một luồng nhất định, cải thiện một đoạn code và xác nhận ngay sau đó.

Vậy là bài viết của mình đến đây là hết 😁. Mong rằng bài viết của mình sẽ giúp các bạn áp dụng để giúp project của mình được flexible nhất có thể.

Cảm ơn các bạn đã theo dõi bài viết. 😃