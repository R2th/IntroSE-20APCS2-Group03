Trong bài này tôi sẽ hướng dẫn các bạn về Pre-Processors, Post-Processors và Controllers trong Jmeter. Các Controllers rất là hữu ích khi chúng ta tạo các kịch bản kiểm thử.
Bạn có thể muốn kiểm thử các kịch bản khác nhau nơi bạn có thể thiết lập một dãy các yêu cầu gửi đến máy chủ để giám sát thời gian trả về và các nhân tố về hiệu năng khác.
## Pre-Processors
Có một số thành phần được thực hiện trước một sampler được thực hiện. Bạn có thể đính kèm Pre-Processor với một Sampler cho cái mà bạn muốn tạo một số thay đổi trong yêu cầu gửi đi.
Một trường hợp đơn giản nhất là có thể thêm "Sample Timeout" preprocessor với một yêu cầu HTTP vì vậy đây là yêu cầu sẽ chạy chỉ xác định tổng số thời gian.  Nó cũng đảm bảo chắc rằng sự thay đổi này được làm chỉ cho Sampler cha.

**Dưới đây là một số các Pre-Processor được sử dụng trong JMeter:**

* Bean Shell Pre-Processor
* HTML Link Parser
* HTTP URL Re-Writing
* JDBC Preprocessor
* Sample Timeout
* User Parameters

Thông thường hầu hết các Pre-processor được giải thích dưới các ví dụ. Bạn có thể hoặc không cần tất cả trong dự án của mình. Cố gắng xác định các kịch bản liên quan tới dự án của bạn và áp dụng các Pre-Processors giúp các bạn bao phủ được thời gian thực của kịch bản hiệu năng.

**User Parameters**

User Parameters được sử dụng để định nghĩa các giá trị cho các biến trước khi chúng được sử dụng trong Samplers. Khi JMeter thực thi thành phần Pre-Processor, Nó lưu trữ các giá trị trong các biến cái có thể được tham chiếu bởi bất kỳ Sampler nào bên trong cùng một Thread Group
![](https://images.viblo.asia/7c148986-f149-485a-8738-801c1e54aa61.png)

Nếu bạn có nhiều threads hơn tổng số user trong "User Parameters" các threads ở ngoài sẽ tiếp tục lặp lại thông qua các giá trị.
Ví dụ, bạn có 5 user trong thread group nhưng chỉ có 3 trong pre-processor sau đó thread thứ tư và thứ năm sẽ sử dụng tham số 1 và tham số 2 

![](https://images.viblo.asia/0638e61d-2a69-4f4e-b6a4-373966af6fcd.png)

## Sample Time Out

Đây là pre-processor thường được sử dụng để định nghĩa thời gian timeout trong suốt quá trình gửi yêu cầu.

Ví dụ, nếu bạn đặt một thời gian timeout mẫu là 400 mili giây, sau đó tất cả các yêu cầu mà thời gian gửi yêu cầu > 400 sẽ có đáp ứng trả về là lỗi.

![](https://images.viblo.asia/2a51cc14-32a0-45cd-9c81-e14d3e967330.png)

## Controllers

Controllers có vai trò rất quan trọng trong việc xây dựng một kế hoạch kiểm thử JMeter thời gian thực. Nó định nghĩa một dãy tuần tự nơi các yêu cầu được gửi tới máy chủ.

Ví dụ, nếu bạn muốn kiểm thử một ứng dụng web chỉ có chức năng là đăng nhập một lần và thực hiện tìm kiếm, lựa chọn mục yêu cầu đi từng cái một cho tất cả các lần lặp. Controllers làm có việc này là có thể thực hiện bằng cách quản lý dòng các yêu cầu đi tới mày chủ dưới việc kiểm thử.

**Dưới đây là các controller thường được sử dụng nhiều nhất trong JMeter**

* Simple Controller
* Module Controller
* Once Only Controller
* Interleave Controller
* If Controller
* Loop Controller
* For Each Controller
* Recording Controller and etc.,

**Simple Controller**

Một simple controller không thực hiện bất kỳ một chức năng đặc biệt gì. Nó chỉ là một loại thùng chứa nơi bạn có thế giữ các yêu cầu tương tự của mình để tạo kế hoạch kiểm thử của mình có thể hiểu dễ dàng hơn.

![](https://images.viblo.asia/a9d23969-044e-42ff-b0f8-4bd975bb1a9f.png)

**Loop Controller**

Nếu bạn muốn một số các yêu cầu đặc biệt để chạy nhiều lần lặp hơn cái được xác định trong Thread Group, bạn có thể đặt chúng dưới Loop Controller và  đưa vào đếm số lần lặp trong cấu hình controller.
Ví dụ : Nếu bạn có một thread group với một người dùng và 3 lần lặp, sau đó tất cả các yêu cầu của bạn dưới nhóm này sẽ chạy 3 lần. Bây giờ nếu bạn có hai HTTP Sampler dưới một vòng lặp Controller với số vòng lặp là 2. Sampler sẽ chạy là 1*2*3 = 6 lần.
Hình dưới đây sẽ giải thích thêm ví dụ trên.

![](https://images.viblo.asia/9f367d08-f6a8-4d38-8a7a-3038571e7a70.png)

**Once Only Controller**

Đây là controller được sử dụng khi bạn muốn chạy một số yêu cầu đặc biệt chỉ sử dụng một lần thậm chí nếu bạn có nhiều thread trong một Thread Group. Ví dụ đơn giản nhất cái mà có thể được coi là: "Lấy một trang chủ của một website" hoặc "Đăng nhập vào một ứng dụng web". Kịch bản thời gian thực sẽ muốn nó xảy ra chỉ một lần và các yêu cầu khác như tìm kiếm hoặc thay đổi, xóa một số thứ xảy ra nhiều lần.
Yêu cầu mà được thực thi chỉ một lần chỉ có thể được đặt dưới Once Only Controller. Nhìn hình dưới Thiết lập Once Only Controller bỏ qua thiết lập Thread Group cha

![](https://images.viblo.asia/0ea5e029-e89a-49f2-b273-5724c276b2bb.png)

**Recording Controller**

Giống với Simple Ccontroller, Recording Controller không thay đổi bất kỳ thứ tự của các yêu cầu mà sẽ được gửi tới máy chủ. Nó được sử dụng với HTTP(S) Script Recorder. Tất cả các yêu cầu mà được ghi lại với Non-Test Element được ghi lại dưới Recording Controller.
Bạn cần xác định controller đích để ghi lại các yêu cầu được ghi lại cho máy chủ.

![](https://images.viblo.asia/2d7d93f9-a997-40a0-b74d-718f36bdeba3.png)

Recording controller and HTTP(s) script recorder cùng trong HTTP(S) Test Script Recoder khi các nhân viên kiểm thử không có thông tin trên URL yêu cầu và các tham số. Đơn giản chúng có thể được ghi lại hay chụp lại tất cả các yêu cầu mà gửi tới máy chủ của họ. Điều này làm việc cho cả ứng dụng di động cũng như các dự án web.

**Throughput Controller**

Đây là controller cũng được sử dụng để điều khiển dòng thực hiện. Ở hình dưới, đây là controller được chia làm hai phần: 

![](https://images.viblo.asia/b17b6184-9f77-46e8-b312-db82d3bae7c6.png)

**Percent Execution** - Đây là một lựa chọn này sẽ làm cho Jmeter chỉ thực hiện một tỷ lệ phần trăm nhất định trong tổng số lần lặp cho Sampler được đặt dưới Controller này. Bạn cũng có thể check vào checkbox "Per User" tới điều khiển này ở mức độ một người dùng.
Ví dụ: Thread Group được cấu hình có 10 user và đếm số lần lặp là 5. Vì vậy, tổng số lần lặp sẽ là 50. Nếu phần trăm thực hiện được thiết lập là 50%, sau đó tất cả các sampler dưới Throughput Controller sẽ tạo chỉ 25 lần lặp ( 50% của 50 ).

**Total Executions** - Item này cho phép người dùng xác định số lần lặp trực tiếp cho samplers được chứa dưới controller này. 

![](https://images.viblo.asia/bc57bcc6-1312-473e-9cf8-d77cc7194cc7.png)

**Interleave Controller**

Đây là controller cho phép bạn tăng pham vi kiểm tra hiệu năng bằng việc thay đổi thứ tự trong n cách vì thế bạn có thể kiểm tra tải trên máy chủ khi ứng dụng đang gửi yêu cầu với các thứ tự khác nhau. Interleave Controller tạo các thay đổi lựa chọn với các sampler dưới nó.

Trong trường hợp có các Controller khác như Simple Controller được giữ dưới khối này, interleave controller đưa ra đặc quyền để lựa chọn một sampler từ thùng chứa cho mỗi lần lặp. Để hiểu thêm hãy quan sát hình dưới.

![](https://images.viblo.asia/f5be0c00-2ec3-46e0-82d7-81bd70869d20.png)

Vì thế , Jmeter sẽ lặp đi lặp lại giữa các controller cho mỗi vòng lặp. Thứ tự sẽ được đề cập như dưới đây
Request1 -> Request3 -> Request 5 – Request2 -> Request4 -> Request6
Nhìn Kết quả của Jmeter dưới đây với số lượng Thread = 2 và số lần lặp = 2

![](https://images.viblo.asia/74adc468-9b1f-495f-aecf-9904ee6201d5.png)

Ở ví dụ trên Jmeter là Interleaving với các vòng lặp kế tiếp. Có thiết lập cấu hình trong Interleave Controller mà có thể tạo Jmeter gửi các yêu cầu luân phiên với mọi thread mới

![](https://images.viblo.asia/b8184c1a-532a-4afc-91ee-b64c5db3fda1.png)

Hình dưới đây là kết quả. Điều này là có ích trong kịch bản nơi bạn muốn tấn công máy chủ theo tuần tự hoặc đồng thời với một trình tự yêu cầu khác nhau từ máy giống nhau.

![](https://images.viblo.asia/005f963d-76fe-4b56-b60c-f7a96ee7a8a1.png)

**Random Controller**

Nó làm việc gần như là Interleave controller nhưng nó không nhặt các sampler theo trật tự. Nó chỉ lựa chọn các controller con và các sampler bên trong chúng theo một sự ngẫu nhiên đơn giản.

**If Controller**

If controller làm việc theo cách đơn giản một biểu thức If được xử lý trong bất kỳ ngôn ngữ lập trình nào. Điều kiện được xác nhận đầu tiên và sau đó các thành phần dưới thùng chứa này thực thi nếu điều kiện là đúng và ngược lại các thành phần bên ngoài If Controller sẽ được thực thi.
Ví dụ, Tiếp tục với một ví dụ ở trên liên quan đến Interleave Controller, bây giờ một trong hai Interleave Controller giữ dưới If Controller và Điều kiện "$(COUNT) < 10" được thêm vào như một điều kiện. Biến COUNT được định nghĩa trong thành phần cấu hình "User Defined Variables" và được đưa ra một giá trị bằng tới 11. Dưới đây là bảng cấu hình

![](https://images.viblo.asia/f67d2492-d8b9-4dd1-aabc-e4cbe27eb3b0.png)

Định nghĩa và đánh giá một giá trị tới biến COUNT

![](https://images.viblo.asia/f514c5e6-90b3-4a6d-bf41-a75ecfc77f98.png)

Định nghĩa điều kiện trong cấu hình If Controller. Jmeter sẽ đánh giá điều kiện này và nếu IF đúng sẽ thực thi các khối dưới thùng chứa này

Như bạn nhìn test plan dưới, chỉ Request 3, Request 4 và Request 5 sẽ thực hiện trong trường hợp điều kiện If được đánh giá là sai

![](https://images.viblo.asia/f8510063-83ec-4d02-bfaa-73193325094e.png)

**While Controllers**

Đây là controller thực thi thành phần dưới nó tới tận khi điều kiện trở thành sai
Ví dụ, Chúng ta có một điều kiện While($(count)<10), nó sẽ thực thi các thành phần con tới tận khi điều kiện là sai. Để kiểm tra điều này, nên có một bộ đếm Counter cái mà có được sự tăng dần hay giảm dần trên mỗi vòng lặp và sau đó điều kiện được đánh giá. Thành phần cấu hình "Counter" có thể được sử dụng để phục vụ mục đích này.
Cấu hình "Counter" bắt đầu từ 1 và sau đó tăng dần ở mỗi lần lặp. 

![](https://images.viblo.asia/cf545594-c1b5-4373-8ff1-0632f09a713e.png)

**Real Time Example**

Chúng ta xem xét kịch bản nơi đội kiểm thử không biết URL và các tham số của tất cả các yêu cầu tấn công máy chủ dưới việc kiểm thử. Bây giờ, để kiểm tra việc tải máy chủ chúng ta cần phải ghi lại các yêu cầu và sau đó điều chỉnh tải liên tục hoặc đồng thời và tạo ra các kịch bản từ chúng để thực hiện kiểm tra hiệu năng kiểm thử.

**Các bước thực hiện**

* Thêm một mẫu trong Jmeter cho Recording Controller
* Thiết lập proxy trên trình duyệt của bạn và chọn cổng tương tự trong HTTP(s) Script Recorder
* Ghi lại các yêu cầu
* thay đổi kế hoạch kiểm thử và tăng tải
* Nhóm các giao dịch tương ứng
* Cố gắng kết hợp các yêu cầu khác nhau

**JMeter'secording Template**

JMeter cũng có một số mẫu được định nghĩa sẵn. Lựa chọn "Template" từ File Menu. Sau khi lựa chọn mẫu chọn "Recording" trong cửa sổ cái mà mở và nhấn Create.

![](https://images.viblo.asia/90b8bcb9-a466-404d-b47f-0c89238d8b1d.png)

![](https://images.viblo.asia/1a0f953d-f4ce-4fa6-9889-eb7c5054fa9c.png)

Ngay khi bạn chọn Mẫu Recording này, bạn sẽ nhìn thấy một số thành phần đã được thêm sẵn vào Kế hoạch kiểm thử
* HTTP(s) Script Recorder dưới Work Bench
* HTTP Request Defaults và HTTP Cookie Manager
* Recording Controller dưới Thread Group

Bạn có thể thiết lập proxy trên trình duyệt của mình để nói tới Jmeter proxy của máy chủ hoặc sử dụng tiện ích mở rộng của CHROME Blazemeter để ghi lại các yêu cầu và sau đó xuất ra file .jmx tới Jmeter. Có nhiều tiện ích mở rộng khác để ghi lại kịch bản và sau đó xuất nó tới Jmeter. Công cụ BADBOY cũng làm việc tốt với Jmeter cho việc ghi lại cả web lẫn ứng dụng di động.

![](https://images.viblo.asia/31fe93c2-ec36-46b6-a77e-09864d92bfa4.png)

Nhấn vào lựa chọn .Jmx để xuất ra các yêu cầu đã được ghi lại tới Jmeter. Bây giờ từ Jmeter mở file .jmx và nhìn các yêu cầu và các tham số được liên kết với mỗi yêu cầu.

Kết luận: Qua bài viết trên đây tôi hy vọng giúp các bạn phần nào hiểu thêm về Processors và Controllers trong Jmeter. Việc hiểu thêm về Processors và Controllers sẽ giúp ích hơn trong việc sử dụng Jmeter. Chúc các bạn thành công

*Tài liệu tham khảo* : https://www.softwaretestinghelp.com/jmeter-processors-and-controllers/