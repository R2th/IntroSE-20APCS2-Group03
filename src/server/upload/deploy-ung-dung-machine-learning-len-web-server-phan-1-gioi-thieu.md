Series gồm 5 phần:
* Phần 1: Giới thiệu
* Phần 2: Tạo Web server, Mysql với Google Cloud Platform
* Phần 3: Crawl dữ liệu từ sàn Binance.com
* Phần 4: Dự báo giá coin với LSTM - Keras - Python
* Phần 5: Tạo Website với Codeigniter, AdminLTE
* Phần 6: Dự báo đa bước, đa biến với LSTM - Keras - Python
* Phần 7: Ứng dụng CNN trong nhận diện cảm xúc

Sản phẩm demo tại: http://tradersupport.club

Admin: http://tradersupport.club/admin

## Giới thiệu series
Chào mừng đến với series deploy ứng dụng Machine learning lên Web server. Mục tiêu của loạt bài này là hướng dẫn hoàn chỉnh để build 1 ứng dụng Machine learning lên website.

Trong các ứng dụng web hiện nay, yêu cầu nhiều xử lý backend như cần xử lý ngôn ngữ, hình ảnh, xử lý dữ liệu lớn, machine learning thì hệ thống cần một kiến trúc phức tạp hơn, nhiều lớp xử lý phía backend.

Một series 5 bài viết sẽ không thể đi hết những vấn đề này, mình sẽ cố gắng thông qua việc build một ứng dụng **dự báo giá coin** giúp hỗ trợ những trader trong mua bán coin trên sàn giao dịch **Binance** để giới thiệu cơ bản các thành phần để xây dựng một ứng dụng thông minh.

## Tại sao lại là dự báo giá coin trên sàn Binance
1. Lý do mình chọn dự báo giá coin là vì mình có đầu tư và nghiên cứ trade coin hơn 1 năm nay trên sàn Binance.
2. Lý do chọn sàn Binance là vì:
    * Sàn có khối lượng giao dịch nhiều nhất thế giới theo thống kê trên Coinmarketcap.com.
    * Hỗ trợ giao dịch nhiều loại coin.
    * Cung cấp sẵn các API để giao dịch và lấy dữ liệu các bạn có thể xem ở đây: https://github.com/binance-exchange/binance-official-api-docs.
    * Phí giao dịch thấp: 0.1%/giao dịch.
## Why Python, MySQL, PHP?
Trước khi vào bài mình xin trả lời tại sao lại sử dụng Python, MySQL, Php để triển khai ứng dụng.

### Python
Là ngôn ngữ cho xử lý dữ liệu, machine learning.

Đơn giản.

Dễ học.

Thư viện mã nguồn mở cực nhiều.

Code sample nhiều.
### MySQL
Hầu hết mọi người đều được học CSDL với ngôn ngữ T-SQL.

Tính linh hoạt.

Tính thực thi cao.

Có thể sử dụng ngay.

Free.
### PHP
Dễ học.

Dễ triển khai.

Cài đặt đơn giản.

Có nhiều Framework hỗ trợ.

Thư viện phong phú.

"Mì ăn liền" có code sample sẵn để triển khai ứng dụng: 

Link source: https://github.com/kishor10d/Admin-Panel-User-Management-using-CodeIgniter

## Lời cảm ơn!
Xin gửi lời cảm ơn đến thầy **Nguyễn Danh Tú** giảng dạy môn CSDL nâng cao, Lập trình hướng đối tượng, thầy **Lê Chí Ngọc** giảng dạy môn Hệ hỗ trợ quyết định của **viện Toán ứng dụng và Tin học** tại trường **Đại học Bách Khoa Hà Nội** và các bạn trong lớp như **Phan Huy Hoàng, Nguyễn Thanh Bình, Nguyễn Văn Long** giúp đỡ mình rất nhiều trong việc học về **Machine Learning**, cùng với đó là thời gian thực tập trên **Tổ hợp giáo dục Topica** trong **phòng vận hành TOX** đã giúp mình biết được nhiều kiến thức để triển khai một ứng dụng lên web, cách đánh index CSDL sao cho hợp lí. 

Mình tìm hiểu về **Machine leaning** mới được tầm khoảng hơn 3 tháng do vậy theo quan điểm cá nhân của mình thì để học và code được 1 ứng dụng về ML trên Python không phải là 1 chuyện khó vấn đề chỉ là bạn có thực sự đam mê và muốn tìm hiểu về nó hay không thôi. Mình cũng xin mạn phép chia sẻ 1 số cách của bản thân để tạo được 1 ứng dụng về ML nho nhỏ: 

Bước 0: (bước khó nhất) Xác định xem mình định làm về bài toán nào (mình mất khoảng 1 tháng để xác định được) 

Bước 1: Hỏi Google là bài toán này đã có những thuật toán nào để giải hay chưa? 

Bước 2: Copy/past Code chẳng cần hiểu cái gì cả cứ copy/past xem nó chạy được code không đã rồi tính. 
        
* Nếu chạy được thì oke ngon quá.         
* Nếu không chạy được thì đặt câu hỏi là tại sao nó không chạy được? Copy lỗi và past lên hỏi Google xem là tại sao? Nếu vẫn không ra thì hỏi những người đã từng làm về vấn đề này xem họ có biết hay không. Mình khá là may mắn vì được học cùng với Bình và Hoàng :)) 
       
Bước 3: Đặt câu hỏi tại sao ở đây họ lại làm vậy? Tại sao nó chạy được? 

Bước 4: Tìm hiểu lí thuyết về thuật toán để xem mình có thể cải thiện những gì hay không? 

Bước 5: Tìm hiểu về những vấn đê dâu ria khác như làm thế nào để deploy lên web sử dụng chẳng hạn.