Khi tải thử nghiệm API, bạn cần sử dụng các điều kiện tải khác nhau để xem cách API xử lý chúng. Dưới đây là một số câu hỏi mà bài kiểm tra tải của bạn sẽ trả lời:

Số lượng người dùng có thể làm việc với API cùng một lúc?
Người dùng có thể làm việc với API trong bao lâu trước khi khởi động lại là cần thiết?
Điều gì xảy ra nếu một số lượng lớn người dùng đang làm việc với API trong một thời gian dài?
Điều gì xảy ra nếu một đột biến người dùng mà API không thể xử lý xảy ra?
Dưới đây là phần giới thiệu về năm kịch bản khác nhau mà bạn có thể kiểm tra:

## Kiểm tra cơ bản

Bạn có thể sử dụng chiến lược kiểm tra tải này để có cơ sở cho các thử nghiệm tải tiếp theo của mình hoặc để đánh giá cách API của bạn hoạt động theo thỏa thuận cấp dịch vụ (SLA).

Thử nghiệm của bạn sẽ giúp bạn xác định phản hồi nào là bình thường đối với API. Sau đó, bạn có thể sử dụng các giá trị này để thiết lập xác nhận trong các thử nghiệm khác. Bạn cũng có thể tìm thấy các sự cố API hoặc mục tiêu TestCase sẽ ngăn các bài kiểm tra tải dài hơn chạy chính xác. Đây cũng là một cách tốt để kiểm tra xem API của bạn có hoạt động theo SLA hay không.

Để ước tính hiệu suất API, hãy thêm các xác nhận và trình giám sát API sẽ kiểm tra thời gian phản hồi, kích thước của dữ liệu được truyền và các giá trị khác mà SLA của bạn có thể tham chiếu.
![](https://images.viblo.asia/12ed1b28-a433-4aa2-8868-1ea22b00d352.png)

## Bài kiểm tra về áp lực

Kiểm tra căng thẳng có nghĩa là mô phỏng tải nặng trên API để tìm số lượng người dùng tối đa mà API có thể xử lý. Con số này còn được gọi là điểm va chạm

Điểm sự cố không nhất thiết có nghĩa là API gặp sự cố hoặc bị treo. Điều đó có thể có nghĩa là lỗi bắt đầu xảy ra hoặc hiệu suất API hoặc thời gian phản hồi giảm xuống dưới mức mà thỏa thuận cấp dịch vụ (SLA) của bạn xác định.

Bạn sẽ cần tạo các xác nhận và trình giám sát API để kiểm tra phản hồi API theo các giới hạn được chỉ định trong SLA của bạn. Khi các phản hồi mất nhiều thời gian hơn SLA chỉ định, API của bạn hết khả năng xử lý hoặc lỗi bắt đầu xảy ra - bạn đã đạt đến dung lượng tối đa của API.
 
## Thử nghiệm ngâm

Bạn sử dụng thử nghiệm ngâm để tìm các vấn đề phát sinh trong quá trình làm việc mở rộng với API, như rò rỉ bộ nhớ API.

Lý tưởng nhất là khi kết thúc quá trình chạy thử, hiệu suất API phải có hiệu suất tương tự như khi bắt đầu thử nghiệm. Việc giảm hiệu suất có thể chỉ ra rằng mã API có một số vấn đề.

### Thông số kiểm tra
Để tạo một thử nghiệm ngâm:

* Sử dụng cấu hình tải cố định, phương sai hoặc kết hợp cả hai.
* Định cấu hình cài đặt cấu hình để mô phỏng tải trọng cao hơn tải trung bình dự kiến một chút.
* Đặt thời gian thử nghiệm rất dài. Lý tưởng nhất, ngâm thử nghiệm nên chạy hơn một ngày
* Tạo các xác nhận và trình giám sát API sẽ giúp bạn đánh giá hiệu suất API.
 
## Kiểm tra đỉnh
Sử dụng thử nghiệm cao điểm để kiểm tra cách API của bạn hoạt động trong thời gian bận rộn nhất. Thử nghiệm đỉnh tương tự như thử nghiệm ngâm, nhưng với tải nặng hơn nhiều và thời gian ngắn hơn.

Để tạo một bài kiểm tra đỉnh:

* Sử dụng hồ sơ tải Ramp Sequence hoặc Variance. Bạn cũng có thể chạy thử nghiệm với cấu hình tải cố định song song để mô phỏng tải nền.
* Mô phỏng tải gần với tải tối đa dự kiến trên API, đồng thời cung cấp một số không gian thở.
* Đặt thời lượng thử nghiệm dài, ví dụ: nửa ngày
* Tạo các xác nhận và trình giám sát API sẽ giúp bạn đánh giá hiệu suất API.
 
## Kiểm tra đột biến

Kiểm tra Spike giúp bạn kiểm tra cách API được kiểm tra phản ứng với sự tăng đột biến về số lượng người dùng. API sẽ có thể ổn định và trở lại hoạt động bình thường sau khi tăng đột biến.

Để tạo một bài kiểm tra tăng đột biến, hãy sử dụng cấu hình tải Burst. Nó giúp bạn mô phỏng một nhóm người dùng ngắn vượt quá tải tối đa dự kiến. Sau đó hoặc song song, hãy chạy thử nghiệm tải khác để kiểm tra cách API xử lý tăng đột biến.
Nếu bạn mô phỏng cấu hình tải Burst với loại Tải tốc độ, thử nghiệm sẽ tạo ra một số lượng lớn người dùng ảo đến với API. Điều này sẽ mô phỏng sự tăng đột biến có thể dễ dàng áp đảo API. Nếu bạn mô phỏng cấu hình tải Burst với loại tải VU, bạn có thể chỉ định số lượng người dùng hàng đầu chính xác sẽ làm việc với API. Thử nghiệm sẽ mô phỏng số lượng người dùng được chỉ định, ngay cả khi phản hồi API chậm lại.
 
 ![](https://images.viblo.asia/7b3aac49-65c8-4516-a4fe-955f71108dfe.png)

## Kiểm tra hiệu suất yêu cầu bộ công cụ phù hợp
Như bạn có thể thấy, có một số thử nghiệm bạn có thể chạy để đảm bảo hiệu suất của API. Mặc dù kiểm tra tải là cần thiết, chiến lược hiệu suất của bạn sẽ mở rộng trong suốt vòng đời của API. May mắn thay, với một công cụ như API sẵn sàng, bạn có thể sử dụng lại các kiểm tra chức năng để thiết lập màn hình cho API khi nó được sản xuất. 

ReadyAPI kết hợp sức mạnh của  soapUI Pro ,  LoadUI Pro ,  ServiceV , và  API Giám sát trong AlertSite  vào một ứng dụng duy nhất. Từ  kiểm tra chức năng ,  kiểm tra hiệu suất  đến  giám sát sau triển khai , các công cụ API của SmartBear giúp bạn cung cấp các API chính xác, nhanh chóng và  an toàn .

Tài liệu tham khảo:
https://www.soapui.org/learn/load-testing/5-load-testing-scenarios-for-your-api.html