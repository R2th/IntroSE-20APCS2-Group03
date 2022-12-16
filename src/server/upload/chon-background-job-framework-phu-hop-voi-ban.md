Chắc hẳn các bạn đã từng nghe thấy **background job** hay **offline processing**. Nhưng **background job** thực sự là gì? Làm sao để biết khi nào cần dùng đến nó? Và nên dùng framework nào?

### I. Background job là gì
Backgound job hay asunchronous job là một quy trình được thực hiên bên ngoài những respone/request thông thường của các wensite framework.<br>
Thông thường, các website nhận các request từ browser làm một số tác vụ(ví dụ như: query database, ...) và trả về một response chỉ với vài mili giây. Và quy trình đó được gọi là **synchronous communication**.<br>
**Asynchronous(không đồng bộ) job** như tên gọi của nó, request cũng được gửi đi một cách thông thường nhưng không thể trả response về ngay lập tức bởi vì request không thể được xử lí ngay lập tức và trả về response. Để không bị ảnh hưởng đến các tác vụ thông thường khác, các asynchronous tasks được thực hiện ở một server riêng biệt với quá trình riêng biệt.
### II. Khi nào cần dùng đến background job?
Background job thường được dùng để xử lí các tác vụ cần nhiều thời gian để thực hiện. Hãy tưởng tượng bạn đang làm một trang web có chức năng liên quan đến việc gửi email cho người dùng để xác nhận.<br>
Bạn có thể làm chức năng này như thông thường, nghĩa là khi khách hàng dùng chức năng này, response không thể được trả về cho người dùng khi email chưa được gửi. <br>
Chức năng này có thể vẫn chạy tốt, tuy nhiên trong một vài trường hợp nó có thể xảy ra lỗi:
<br>
1.  Server email bị sập và email không thể gửi đi được
2.  Dịch vụ nhận email của khách hàng bị lỗi và không thể nhận email
3.  Hòm thư của khách hàng đã đầy và không thể nhận thêm email được nữa.<br>

Khi những trường hợp lỗi phát sinh, nếu vẫn dùng  **synchronous job** khách hàng sễ phải đợi vài chục giây hoặc vài phút để nhận được response. Như vậy thì không hay chút nào, hệ quả là khách hàng sẽ không hãi lòng với trang web.<br>
**Background job** sinh ra để giải quyết vấn đề này. Vẫn lấy ví dụ trên, nhưng chúng ta làm việc với background job. Khi email được gửi đi, người dùng vẫn có thể tương tác được với trang web mà không phải chờ response được trả về.<br>
Một lợi ích khác của background job là có thể **retryable**. Trong các trường hợp lỗi phát sinh kể trên, email có thể bị "nghẽn" ở đâu đó không được gửi đi. Sau đó email server được sửa chữa hay khách hàng dọn trống thùng thư email nên được gửi thành công đến người dùng. Asynchronous jobs giúp server của bạn "retry" gửi lại thư sau một thời gian mà khách hàng không phải send lại request.<br>
Từ ví dụ trên, ta có thể thấy được background job có rất nhiều lợi ích trong việc xử lí các **long request** như: gửi email. upload ảnh, video, ....
    
### III. Nên chọn background job nào?
Phía trên ta có thể thấy được lợi ích và khi nào cần dùng background job. Nhưng cũng như ngôn ngữ lập trình, background job cũng có rất nhiều framework.<br>
Có một vài framework mà ta có thể cân nhắc sử dụng phù hợp với mục đích của chương trình.
#### 1. Delay::Job
[Deylay:job](https://github.com/collectiveidea/delayed_job) là một Ruby background framework được phát triển bởi [Shoptify](https://www.shopify.com/), một trang web thương mại. Delay::job làm việc bằng cách duy trì một bảng "job" trong database để theo dõi một task và vị trí của nó trong job lifecycle(schedule, running, complete, failed, ...).<br>
Delay::job có thể được tích hợp dễ dàng với Rails và ActiveRecord.
Delay::job giúp làm những tác vụ như: gửi email, resize ảnh, update search indexes, ....<br>
Tuy nhiên nó cũng có mặt hạn chế là phải thêm nhiều dependency vaod trong database. Nếu bảng "jobs" ở trong cùng database server với trang web của bạn, khi có job cần thực hiện database sễ phải load rất nặng và việc trả về response sẽ lâu hơn bình thường.
#### 2. Sidekiq
[Sidekiq](https://github.com/mperham/sidekiq/) là một trong những Ruby background job framework phor biến nhất bởi vì độ tin cậy và hiệu suất của nó. Sidekiq sử dụng [Redis](https://redis.io/) server - một in-memory store(hãy tưởng tượng giống như một thanh RAM vậy).<br> 
Sidekiq gây ấn tượng bởi tốc độ khởi tạo hay truy xuất dữ liệu nhanh. Theo [document](https://github.com/mperham/sidekiq/), Sidekiq mất 22 giây để thực hiện 100,000 jobs trong khi Delay::job mất 465 giây. Một lợi ích khác của Sidekiq là có một build-in darshboard để có thể xem job queues và process của chúng.
Nhưng cũng như Delay::job, Sidekiq cũng có mặt hạn chế của mình. Vì Redis là in-memory store, data có thể bị mất nếu xảy ra lỗi trong quá trình thực hiện task.
### IV. Tổng kết
Qua bài viết này tôi muốn chia sẻ với các bạncó thể chọn lựa cho mình một background job framework phù hợp với chương trình của mình.
*Goodluck and happy coding!*

Link tham khảo:<br>
[https://scoutapp.com/blog/which-ruby-background-job-framework-is-right-for-you](https://scoutapp.com/blog/which-ruby-background-job-framework-is-right-for-you)<br>
[https://github.com/mperham/sidekiq/](https://github.com/mperham/sidekiq/)<br>
[https://github.com/collectiveidea/delayed_job](https://github.com/collectiveidea/delayed_job)