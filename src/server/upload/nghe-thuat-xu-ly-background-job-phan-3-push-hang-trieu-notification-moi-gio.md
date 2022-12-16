Quá trình lột xác ngoạn mục của một hệ thống **cổ lỗ sĩ** khi được thiết kế cẩn thận: 1 usecase thành công của việc áp dụng triệt để các phương pháp xử lý background job.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/32w4onv3g2_%E1%BA%A3nh.png)

## First things first

Chào quý vị và các anh em bạn bè gần xa, mình là Minh Monmen - một blogger nghiệp dư thi thoảng hứng chí chia sẻ về những công việc mình làm hàng ngày trong lĩnh vực công nghệ. Hôm nay nhân dịp mình đọc được bài viết của **Go Jek** mô tả về hệ thống push notification của họ ở đây: [How We Manage a Million Push Notifications an Hour](https://blog.gojekengineering.com/how-we-manage-a-million-push-notifications-an-hour-549a1e3ca2c2) thì mình cũng nổi hứng chia sẻ về những thứ tương tự nhưng dưới những góc nhìn sâu sát hơn về mặt giải pháp công nghệ cũng như cách giải quyết vấn đề.

> **Lưu ý:** Đây không phải là bài dịch từ bài viết trên. Dưới ngòi bút của mình thì các bạn có thể yên tâm đọc tiếp.

1 số kiến thức bạn có thể cần để hiểu được trọn vẹn bài viết này:

- **Background job**, có thể đọc thêm qua những bài viết trước của mình như [Nghệ thuật xử lý background job](https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4) hay [Nghệ thuật xử lý background job phần 2: Job order with concurrent worker](https://viblo.asia/p/nghe-thuat-xu-ly-background-job-phan-2-job-order-with-concurrent-worker-LzD5d1YOKjY).
- **Batch processing**: bài viết có ứng dụng batch processing ở nhiều khâu xử lý.

Nhào vô nào.

## The problem

Chỉ ít ngày trước mình được giao tiếp quản 1 hệ thống push notification cũ được viết bằng `python + mysql` đang gặp nhiều vấn đề về performance như:

- **Latency lớn** gây chậm các service yêu cầu.
- **Service quá tải** vào các thời gian cao điểm dẫn tới mất push.
- **Failed rate** liên quan tới network với firebase lớn do tần suất call dày đặc. 
- **Quản lý token** không hiệu quả, xuất hiện duplicate token và nhiều token inactive gây chậm quá trình push.
- **Thiết kế DB dạng normalized không phù hợp** dẫn tới việc tất cả các request push đều cần join 3 table.
- **Sử dụng nhiều tài nguyên** CPU và RAM

Ngoài ra hệ thống cũ này chưa track được tỷ lệ thành công của mỗi lần push, cũng như truy vết hành động push từ các service nội bộ khác.

Kiến trúc hiện tại của hệ thống này như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/24yqmkzkeq_queue41.png)

Như vậy với mỗi request nhận được, **Push API** sẽ gọi list token của user từ **Token store** và gửi yêu cầu push lên **Firebase API**. Rất đơn giản phải không nào?

Sau khi nhận đề bài, mình đã nghiên cứu lại hệ thống và đưa ra 1 giải pháp thiết kế hoàn toàn mới phù hợp hơn với tính chất dữ liệu và tính chất hoạt động của bài toán.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/pybjb5l4mu_queue42.png)

## Thiết kế DB và API

Về cơ bản, database sẽ lưu 2 loại dữ liệu chính:

- **Push token (FCM token) của user**: Update ít, đọc theo list nhiều, nhiều data bên lề như thông tin thiết bị, thông tin hệ điều hành cần lưu cùng.
- **Push log chứa log và kết quả push**: Insert + update rất nhiều, đọc ít.

Dựa vào tính chất những dữ liệu trên mình đã chuyển database từ Mysql sang MongoDB để phù hợp với dữ liệu dạng document và tận dụng performance tốt hơn của MongoDB trong các operation insert/update bản ghi.

Phần **Push API** sẽ chủ yếu hứng traffic request push từ các service nội bộ. Để quá trình này diễn ra nhanh chóng và không bắt các service khác phải chờ thì flow đơn giản như sau:

- **Nhận yêu cầu push** từ service nội bộ
- **Tạo job** với unique job-id
- Push job vào **Job Queue** xây dựng trên redis (implement bằng thư viện [go-workers](https://github.com/jrallison/go-workers))
- **Trả lại job-id** cho service để trace về sau

Bằng việc đơn giản hóa phần việc của **Push API** và thiết kế lại DB mình đã giải quyết được 3 vấn đề: **latency của API**, các vấn đề liên quan tới **quản lý token** và **performance của việc tìm token** cho từng request.

## Thiết kế job worker

Các bạn đọc bài viết của **Go Jek** mình đề cập ở trên thì sẽ thấy phần thiết kế **job worker** của họ khá sơ sài khi chỉ nhắc tới việc xử lý mỗi yêu cầu push bằng 1 job. Với cách implement truyền thống 1 job dạng:

- Insert Push log vào DB
- Filter token của user từ DB
- Build push request dựa vào list token
- Call Firebase API
- Update kết quả push vào DB

thì 1 job push sẽ mất trung bình 200 ~ 300ms để xử lý. Hệ thống sẽ cần scale số lượng worker lên tương đối nhiều để đạt hiệu suất sử lý song song lớn.

Tuy nhiên trong hệ thống này các bạn sẽ thấy 2 điểm bottleneck ảnh hưởng tới performance của hệ thống như sau:

- **Insert log và update kết quả** làm tăng load database
- **Call API tới bên thứ 3** (ở đây là Firebase API) có giới hạn và độ trễ lớn do network

Để giải quyết được 2 vấn đề này, mình đã sử dụng kỹ thuật **batch processing** nội bộ trong từng instance **Job worker**. Tức là gộp chung 1 loạt những request giống nhau vào 1 lần call DB, API thông qua batch. [Muster](https://github.com/facebookarchive/muster) là 1 thư viện dành cho Golang giúp việc xử lý batch dễ dàng hơn bằng cách tạo ra batch dạng bucket. Các bạn sẽ fill dần bucket này và nó sẽ thực thi khi đầy dựa trên số lượng hoặc timeout. 

Bằng cách này mình đã tách việc xử lý 1 job ra làm các step khác nhau như sau. Để các bạn dễ hình dung thì mình thêm cả thông tin thời gian xử lý ở từng step với `n` là số lượng request push hệ thống nhận vào.

**Step 1:** Insert DB job < 1ms x n

- Fill **insert db** bucket

**Step 2:** Batch processing **~ 10ms x n/1000**

- Trigger **insert db** batch 
- Schedule push job

**Step 3:** Push job ~ 5ms x n

- Filter token của user từ DB
- Build push request dựa vào list token
- Fill **call Firebase** bucket

**Step 4:** Batch processing **~ 500ms x n/500**

- Trigger **call Firebase** batch
- Fill **update db** bucket

**Step 5:** Batch processing **~ 20ms x n/1000**

- Trigger **update db** batch

Với việc MongoDB hỗ trợ **Bulk write operation** và Firebase API cũng hỗ trợ **batch request** lên tới 500 message/call thì việc tận dụng batch đã giảm đi rất nhiều thời gian chờ API call (do giảm số lượng request) cũng như tài nguyên của database (do giảm số query đơn lẻ). Điều này đã giúp mình có thể đáp ứng trên **1000 push/s**, tức là **3,6 triệu push / giờ** chỉ với 1 worker và tiêu thụ lượng tài nguyên rất khiêm tốn. 

## Tổng kết

Tất nhiên vinh quang nào cũng phải trả giá bằng máu và nước mắt. **Batch processing** là một kỹ thuật khó và xử lý được nó đòi hỏi các bạn phải tính toán thật cẩn thận về các vấn đề liên quan tới **error**, **retry**, **report**. Mình cũng phải trả giá cho việc đạt performance như trên bằng khả năng xử lý lỗi khi 1 step nào đó có vấn đề. Giờ thay vì sự cố chỉ ảnh hưởng tới 1 push riêng lẻ của bạn thì nó sẽ có thể ảnh hưởng tới vài trăm tiến trình push khác nếu các bạn không xử lý retry cẩn thận. 

Nhưng sau tất cả thì mọi thứ bạn đánh đổi sẽ đều xứng đáng nếu các bạn biết sử dụng nó đúng cách. Hiện tại hệ thống push notification cho mạng xã hội của mình đang chạy với **khoảng 1 triệu push mỗi giờ** trên **5 worker**, tiêu thụ trung bình **0.25 vCPU và < 100MB RAM**. Theo mình đánh giá về số lượng request gửi tới firebase (100-150/min) cũng như load của DB (< 5% / 2 core) ít tẹo thì đây mới chỉ là 1 phần rất nhỏ workload mà hệ thống có thể chịu được.

Hết bài, cảm ơn các bạn đã đọc hết.