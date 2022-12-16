Mình vừa làm một cái task liên quan đến phần này, và phát hiện ra có khá ít tài liệu liên quan đến nó, mặc dù mình thấy nó cũng được ứng dụng khá nhiều trong cuộc sống, từ thứ nhỏ nhất ngày nào mình cũng làm là đặt báo thức, tới những công việc quan trọng hơn như hẹn giờ mở bán vé bóng đá chẳng hạn =)) 

Đầu tiên thì vì mình làm việc với rails nên mình dùng gem Sidekiq, nếu bạn chưa biết thì Sidekiq là gem thường được dùng để xử lý background job, sử dụng các luồng (thread) để xử lý nhiều công việc 1 lúc, và nó là chạy ngầm, nên sẽ không ảnh hưởng đến thao tác của người dùng. Cụ thể hơn thì bạn có thể đọc thêm ở [đây](https://github.com/mperham/sidekiq/wiki/Getting-Started). Trong bài viết này mình sẽ tập trung vào việc hướng dẫn sử dụng schedule job thôi.

Sidekiq cung cấp 2 method mà ta có thể sử dụng là `perform_in(interval, *args)` và `perform_at(timestamp, *args)`. Ví dụ:
```
PublishProductWorker.perform_in(3.hours, 'New Product')
PublishProductWorker.perform_at(3.hours.from_now, 'New Product')
```
Nhìn vào ví dụ này ta cũng dễ dàng hiểu được sự khác nhau giữa 2 method, `perform_in` là thực hiện 1 hành động sau bao lâu tính từ thời điểm hiện tại, còn với `perform_at` là sẽ truyền vào đó 1 thời gian cụ thể nào đó mà ta muốn, như ngày a tháng b giờ xyz, và nó sẽ thực hiện job vào đúng thời gian đó. 

Trong worker, ta sẽ viết như sau:
```
class PublishProductWorker
  include Sidekiq::Worker
  sidekiq_options queue: :publish_product

  def perform(args)
     //nội dung job bạn muốn thực hiện
     
    Sidekiq.logger.info "Publish product successfully with args #{args}"
  rescue => exception
    return Sidekiq.logger.error "Failed to publish product with args #{args} - exception: #{exception}"
  end
```
`quere` ở đây là tên luồng để ta nhóm các job lại với nhau, các job thuộc các luồng khác nhau có thể chạy song song với nhau, đấy là cơ chế đa luồng của Sidekeq, cái này mình sẽ confict trong file `sidekiq.yml`
```
:queues:
    - publish_product
    - other_queue
```
Sidekiq còn cung cấp cho ta 1 giao diện web để theo dõi các job
![](https://images.viblo.asia/b7331117-ba66-4d65-ad52-c8795cdba381.png)
Ta có thể tìm thấy job mình vừa tạo trong tab Scheduled.

Về cơ bản tạo 1 cái schedule job cũng chỉ có vậy thôi, đơn giản nhỉ =)) Nhưng nếu chỉ dừng lại ở đây thì ta lại gặp 1 vấn đề, đó là làm thế nào nếu ta muốn thay đổi lịch thực hiện job, hoặc cancel cái job ấy? 

Như thông thường, ta muốn update hay destroy 1 bản ghi nào đó, ta sử dụng id để tìm ra nó và xử lý nó, sidekiq cũng tương tự như vậy, nó cũng sinh ra 1 cái gọi là `jid` (job id) của job, nhưng cũng chẳng thể lưu nó vào database, vì sau khi cái job ấy được thực thi thì jid chẳng còn ý nghĩa gì. Giờ là lúc ta cần đến Redis, Redis là 1 hệ thống lưu trữ key-value trên RAM rất phổ biến, thao tác cũng khá đơn giản.

Giờ sửa lại 1 chút, khi tạo job:
```
jid = PublishProductWorker.perform_at(3.hours.from_now, 'New Product')
redis = Redis.new
// redis.set(redis_key, redis_value)
redis.set(product_id, jid)
```
Thêm thời gian hết hạn, chắc bạn không muốn nó lưu mãi mãi trong redis đâu nhỉ :)) Trong trường hợp này mình sẽ set thời gian hết hạn là thời gian job được thực hiện, lưu ý là thời gian bạn truyền vào phải là đơn vị giây, redis sẽ tự động xóa cặp key-value đó sau số giây bạn truyền vào.
```
// redis.expire(redis_key, expire_second)
redis.expire(product_id, 3*60*60)
```
Giờ khi muốn update hay cancel job, ta chỉ cần lấy jid từ Redis ra
```
//redis.get(redis_key)
jid = redis.get(product_id)
```
Sau đó tìm job đó trong Sidekiq
```
scheduler = Sidekiq::ScheduledSet.new
job = scheduler.select { |s| s.klass == 'PublishProductWorker' && s.jid == jid }.first
```
Ở đây còn có thể sử dụng 1 cách khác là
```
Sidekiq::ScheduledSet.new.find_job(jid)
```
Nhưng cách này khá chậm, nhất là khi lượng job của bạn đã trở nên quá lớn.

Giờ nếu muốn update job:
```
entry = Sidekiq::SortedEntry.new(job.parent, job.score, job.item) if job.present?
entry.reschedule(new_publish_time)
```
sau đó đừng quên update lại thời gian hết hạn của key-value trong Redis nhé, giống như khi ta set thời gian hết hạn cho nó thôi.

Còn nếu muốn cancel job thì càng đơn giản hơn:
```
job.delete
// xóa trong Redis
redis.del(product_id)
```
Vậy là xong rồi đó, hy vọng bài viết này sẽ có ích với bạn! ^^