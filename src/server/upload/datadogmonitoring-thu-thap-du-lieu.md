### Mở đầu

Quản lý dữ liệu có nhiều dạng, một số hệ thống sẽ tổ chức dữ liệu liên tục và một số hệ thống chỉ thu thập dữ liệu khi xảy ra lỗi. 
Dữ liệu thì có rất nhiều loại và nó có thể rất hữu ích để giúp bạn xác định vấn đề xảy ra với hệ thống của bạn, cũng có thể để dùng để phát hiện sự cố với hệ thống bạn đang vận hành.

Dữ liệu mình nói tới trong bài này là `log` hệ thống, `log` services hoạt động như `mysql`, `elasticsearch`, `rails` .... hoặc là các nguồn tài nguyên hệ thống như `memory`, `CPU`, `Disk`....
 
 Dù dữ liệu của bạn thuộc dạng nào thì chúng ta luôn có một định nghĩa:
 
 ```
 Collecting data is cheap, but not having it when you need it can be expensive, so you should instrument everything, and collect all the useful data you reasonably can.
 ```
 
 theo google thì nó có nghĩa là:
 ```
 Thu thập dữ liệu là rẻ, nhưng không có nó khi bạn cần nó có thể tốn kém, vì vậy bạn nên trang bị mọi thứ và thu thập tất cả các dữ liệu hữu ích mà bạn có thể hợp lý.
 ```
 Với mình thì điều đó là đúng, dữ liệu luôn ảnh hưởng tới kinh tế và sức lao động. Khi hệ thống hoạt động bình thường thì vai trò của dữ liệu là không lớn, tuy nhiên hệ thống nếu xảy ra sự cố thì  cái quan trọng nhất tại thời điểm phát hiện sự cố là dữ liệu(đặc biệt là dữ liệu lỗi).
Vì vậy bạn hãy luôn chắc chắn rằng dữ liệu của bạn luôn được lưu lại ở một chỗ nào đó trong hệ thống.

### Số liệu

Số liệu là một giá trị liên quan tới hệ thống của bạn ở thời điểm nào đó.

VD: Số lượng truy cập hệ thống của bạn vào một thời điểm.

Vì thế nên số liệu thường được thu thập từ giây, mỗi phút hoặc khoảng thời gian thường xuyên để chắc có thể theo dõi hệ thống của bạn.

Có hai loại số liệu sẽ được định nghĩa riêng ở đây là số liệu cộng việc thực hiện, và số liệu tài nguyên.

Trong đó thì: 

- Số liệu công việc thực hiện là dữ liệu log liên quan tới các services trong hệ thông.
- Số liệu tài nguyên: là giá trị tài nguyên server(CPU, Memory, Disk, Network.....).



#### Số liệu cộng việc thực hiện

Số liệu thể hiện sức khỏe của hệ thống và chúng được chia ra làm bốn loại:

- `throughput` là khối lượng công việc mà hệ thống đang thực hiện trên mỗi đơn vị thời gian. Thông lượng thường được ghi là một số tuyệt đối
- `Success`: số liệu đại diện cho tỷ lệ phần trăm công việc được thực hiện thành công.
- `Error`: số liệu nắm bắt số lượng kết quả sai, thường được biểu thị bằng tỷ lệ lỗi trên mỗi đơn vị thời gian hoặc được chuẩn hóa bằng thông lượng để mang lại lỗi trên mỗi đơn vị công việc. Số liệu lỗi thường được ghi tách biệt với số liệu thành công khi có một số nguồn lỗi tiềm ẩn, một số trong đó nghiêm trọng hơn hoặc có thể hành động hơn các số liệu khác.
- `performance` số liệu định lượng hiệu quả của một thành phần đang làm công việc của nó. Chỉ số hiệu suất phổ biến nhất là độ trễ, biểu thị thời gian cần thiết để hoàn thành một đơn vị công việc. Độ trễ có thể được biểu thị ở mức trung bình hoặc dưới dạng phần trăm, chẳng hạn như 99% yêu cầu được trả về trong vòng 0,1 giây.

Những số liệu này là vô cùng quan trọng để quan sát hệ thống. Chúng là những biện pháp có thể giúp bạn trả lời nhanh những câu hỏi quan trọng nhất về hệ thống Sức khỏe và hiệu suất làm việc: hệ thống có sẵn làm những gì nó được xây dựng để làm gì không? Làm thế để tăng tốc độ công việc? Chất lượng của công việc đó là gì?

#### số liệu tài nguyên

Hầu hết các thành phần của cơ sở hạ tầng phần mềm của bạn là một nguồn tài nguyên của các hệ thống khác.

Các số liệu tài nguyên có thể giúp bạn xây dựng lại một bức tranh chi tiết về trạng thái hệ thống, khiến chúng đặc biệt có giá trị để điều tra và chẩn đoán các vấn đề. Đối với mỗi tài nguyên trong hệ thống của bạn, hãy cố gắng thu thập các số liệu bao gồm bốn lĩnh vực chính:

- `utilization` là phần trăm thời gian mà tài nguyên đang bận hoặc phần trăm dung lượng của tài nguyên đang sử dụng.
- `saturation` là thước đo lượng công việc được yêu cầu mà tài nguyên không thể phục vụ, thường được xếp hàng.
- `errors` đại diện cho các lỗi nội bộ có thể không quan sát được trong công việc mà tài nguyên tạo ra
- `availability`đại diện cho tỷ lệ phần trăm thời gian mà tài nguyên đáp ứng yêu cầu. Số liệu này chỉ được xác định rõ đối với các tài nguyên có thể được kiểm tra chủ động và thường xuyên về tính khả dụng.

### Sự kiện

Ngoài các số liệu được thu thập liên tục, một số hệ thống giám sát cũng có thể nắm bắt các sự kiện: không thường xuyên để biết những gì đã thay đổi trong của hệ thống của bạn. Vài ví dụ:

 - Changes: release code, build vs build failues
- Scaling events: thêm hoặc bớt server
- Alerts: thông báo nội bộ, hoặc thông báo bên thứ 3.


### Kết luận

- Để tối ưu hóa dữ liệu của bạn, thì bạn nên lưu trữ dữ liệu ít nhất trong vòng 15 tháng.
- Độ chị tiết phụ thuộc vào hệ thống bạn đang đo như chi phí đo lường, thời gian thay đổi giữa các số liệu.


Bài viết này mình dịch từ trang [Datadog Blog](https://www.datadoghq.com/blog/monitoring-101-collecting-data/). Tuy nhiên nó cũng vẫn còn thiếu nhiều do khả năng của mình trong cách sử dụng tài nguyên của hệ thống cảnh báo lỗi và phân tích lỗi với DataDog.