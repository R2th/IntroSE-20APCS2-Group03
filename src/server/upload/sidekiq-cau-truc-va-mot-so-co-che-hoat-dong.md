![](https://images.viblo.asia/10e886e0-6922-4cd1-8021-0f0a61d98ad1.png)
### 1. Tổng quan về Background Job
Như chúng ta đã biết, mô hình chung của một ứng dụng web thường như sau: **Web application** nhận **request** từ người dùng, tiến hành xử lý logic (service, Database, ...) và trả về một **response** cho người dùng.<br>
Đây là mô hình đơn giản, server xử lý nhanh chóng và phản hồi ngay lập tức kết quả cho người dùng. Tuy nhiên có những tác vụ, request server **không xử lý ngay lập tức** được, cần thời gian thực thi lâu hơn bình thường, người dùng phải chờ một khoảng thời gian trước khi server phản hồi lại. Những tác vụ như vậy gọi là ***synchronous task*** và có thể xử lý bằng **background job** hay **asynchronous job** (xử lý bất đồng bộ) trên một luồng hoàn toàn riêng biệt .<br>
Cách xử lý này giúp người dùng tránh phải chờ nhưng vẫn đảm bảo tác vụ được thực thi, không ảnh hưởng đến luồng làm việc đồng bộ của ứng dụng.
![](https://images.viblo.asia/6a52a49c-2a39-4c4c-80c6-214a0a74a823.png)
### 2. Khi nào nên sử dụng Background Job?
`Background Job` nên được sử dụng khi thực hiện:
- Xử lý các tác vụ nặng có liên quan tới **hiệu năng**, **CPU**
- Xử lý các tác vụ liên quan nhiều tới **I/O** 
- **Batch jobs** (send mail, ...), **scheduled jobs**
- …

### 3. Sidekiq là gì?
`Sidekiq` là một ***full-featured background processing framework*** cho Ruby. Đơn giản hóa việc tích hợp với bất kỳ ứng dụng Rails và cho **hiệu năng cao** hơn nhiều so với các giải pháp hiện có khác như `Resque` hay `Delayed Jobs` vì `Sidekiq` xử lý đa luồng và sử dụng `Redis` thực thi đồng thời nhiều jobs.
### 4. Cấu trúc
`Sidekiq` cho phép mở rộng quy mô ứng dụng bằng cách thực hiện tác vụ ở chế độ chạy nền. Do vậy, yêu cầu có 3 phần chính:
![](https://images.viblo.asia/04280ff2-c064-459b-b1da-9bd863e32ac8.png)
***Sidekiq client***
- Chạy trong bất kỳ Ruby `process` nào (thường là `puma` hoặc `passenger`) 
- **Tạo job** để xử lý sau và **đẩy jobs** vào queue qua các lệnh Redis như LPUSH, …
- Có 2 cách tạo job: hai phương thức được sử dụng bên dưới là tương đương nhau, đều tạo một `Hash` đại diện cho job, `serialize` Hash đó thành `JSON String` và **push String** đó vào **queue** trong Redis.
```ruby
MyWorker.perform_async(1, 2, 3)
Sidekiq::Client.push('class' => MyWorker, 'args' => [1, 2, 3])
```
- Một lưu ý là các đối số cho `Worker` phải là kiểu dữ liệu `JSON` đơn giản (**numbers**, **strings**, **boolean**, **array**, **hash**). Các `object Ruby` phức tạp (**Date**, **Time**, **ActiveRecord models**) sẽ không được `serialize` chính xác.

***Redis***<br>
Tại sao lại nên sử dụng `Redis` thì mọi người có thể kham thảo thêm một số bài viết sau [Tìm hiểu chung về Redis](https://viblo.asia/p/tim-hieu-chung-ve-redis-maGK7VMx5j2), [So sánh Redis, MySQL và MongoDB](https://viblo.asia/p/so-sanh-redis-mysql-va-mongodb-Az45br265xY ).
- `Sidekiq` sử dụng Redis để lưu trữ tất cả dữ liệu, các job cần xử lý. Điểm khác biệt quan trọng của `Sidekiq` với `Delayed Job`.
- `Redis` chứa tất cả dữ liệu của job cùng với `runtime` và dữ liệu lịch sử cho `UI's web` của Sidekiq.
- Theo mặc định, Sidekiq kết nối với Redis tại `localhost: 6379` trong môi trường `development`.
- Redis thường được dùng để `cache` dữ liệu, tuy nhiên việc cache và `storage job` là khác nhau (cache có thể `invalidate` nhưng job thì không), do vậy nên tách rời 2 server Redis cho việc cache và lưu trữ job sidekiq giúp hạn chế `timeout` khi `full memory`. (Sidekiq chỉ lưu `1000 job` cuối cùng để tránh lưu quá nhiều dẫn tới full memory.)

Chi tiết hơn tại [Using Redis](https://github.com/mperham/sidekiq/wiki/Using-Redis).<br>

***Sidekiq server***
- Là một process `độc lập`, **pull job** từ **queue** trong Redis và xử lý nó.
- Sidekiq **boot** Rails để job và worker có đầy đủ API Rails, gồm Active Record, có sẵn để sử dụng. Máy chủ sẽ khởi tạo job và thực hiện `perform` với các đối số đã cho.
- Sử dụng lệnh Redis **BRPOP** để **lấy jobs**: khi có job trong queue thì lấy, queue rỗng sẽ đợi đến khi có job thì lấy tiếp. 
### 5. Vòng đời của một job
![](https://images.viblo.asia/0695f13d-9876-4d40-b755-2c271167a68e.png)
Các trạng thái của một job và cách chuyển đổi giữa chúng:
- **Processed**: thực thi thành công và sẽ không có hành động nào nữa.
- **Failed**: số lần tất cả các job được thực hiện bởi Sidekiq và phát sinh lỗi (default max là 25). Một job sẽ không bao giờ kết thúc trong trạng thái **Failed**, vì đây là một trạng thái **bắc cầu**. Các trạng thái cuối cùng chỉ có thể là **Processed** hoặc **Dead**.
- **Busy**: hiện đang thực thi.
- **Enqueued**: chờ đến lượt trong processing queue (được liệt kê theo thứ tự thời gian, theo hàng đợi).
- **Retries**: thất bại, nhưng đôi khi sẽ tự động được thực thi lại trong tương lai (được liệt kê theo thứ tự thời gian).
- **Scheduled**: được cấu hình để chạy ở một thời điểm nào đó trong tương lai (có thể được xử lý khi thời gian xử lý của chúng xuất hiện).
- **Dead**: không được thực thi lại mà được lưu trữ để có thể thực thi lại bằng cách thủ công tại một thời điểm nào đó trong tương lai gần.

Cần lưu ý khi một job đơn có thể làm tăng cả bộ đếm **Processed** và **Failed** nếu nó thất bại một lần hoặc hơn, nhưng `success` khi thử lại.
### 6. Một số cơ chế hoạt động
- Đẩy và lấy job từ Redis.
- Xử lý các tín hiệu (signals)
- Xử lý lỗi.
- Xử lý scheduled jobs.
- Về Delayed Extensions.
- Cùng sử dụng với Active Job.
- Deployment
- …

Chi tiết tại [Sidekiq Wiki](https://github.com/mperham/sidekiq/wiki).
### 7. Best Practices
- Tạo các tham số job nhỏ và đơn giản.
- Các job nên **idempotent** và **transactional**:<br>
  - **Idempotency** có nghĩa là job có thể thực hiện một cách an toàn nhiều lần.
- Thiết kế các jobs có thể chạy đồng thời song song một thời điểm.

### 8. Tham khảo
- [Sidekiq Wiki](https://github.com/mperham/sidekiq/wiki)
- [BLPOP](https://redis.io/commands/blpop)