## Sidekiq
Các bạn code ruby chắc hẳn không hề xa lại với sidekiq. Đây là một gem thường được dùng cho việc xử lý background jobs trong Rails.
Về sidekiq, bạn có thể đọc thêm ở bài viết này: https://viblo.asia/p/gioi-thieu-ve-sidekiq-va-mot-so-co-che-hoat-dong-Qbq5QW2GZD8

Sidekiq  gồm 3 phần chính là Sidekiq Client, Sidekiq Server và Redis.

![](https://images.viblo.asia/c6663468-c667-4bfc-b91f-44837b665cb9.png)

* **Sidekiq client:** đẩy job vào hàng đợi.
* **Redis:** là data storage cho sidekiq, dùng để lưu trữ các job được đẩy xuống từ sidekiq client.
* **Sidekiq server:** là một process độc lập, pull job từ queue trong Redis và xử lý.

## Tình huống
Giả sử bạn có nhiều Sidekiq server (host), tất cả các host này đều sử dụng chung 1 redis server để lưu trữ các job.

Thông thường, 1 job sau khi đẩy vào hàng đợi sẽ được random 1 trong các Sidekiq Server pull về và thực thi.

Tuy nhiên, vì một lí do đặc biệt, bạn muốn 1 job nào đó chỉ được thực thi trên 1 Host cố định. Vậy phải làm thế nào?

## Giải pháp
Ý tưởng là chúng ta có thể sử dụng 1 queue chỉ tồn tại trên Host mình muốn.

Vậy làm thế nào để tạo ra 1 queue như trên ?

### Sửa file config/sidekiq.yml
Đầu tiên chúng ta sẽ yêu cầu các Sidekiq Server khi được khởi tạo sẽ listen 1 queue có tên là hostname của Sidekiq Server đó.
```
:verbose: false
:concurrency: 25
:queues:
  - default
  - <%= `hostname`.strip %>
 ```
Trong đó `hostname` là linux command trả về tên của Server. Với mỗi host, kết quả trả về sẽ khác nhau. Nhờ đó chúng ta đã tạo ra  1 dynamic queue.

### Chỉ định queue cho Worker
Giả sử server muốn chạy job này có tên là `AHIHI`
```
class SpecificWorker
  include Sidekiq::Worker
  sidekiq_options queue: "AHIHI"

  def perform(filename)
    # process image
  end
end
```
Bây giờ khi 1 job SpecificWorker được đẩy vào queue, nó sẽ được lưu vào hàng đợi có tên là "AHIHI". Và nó sẽ chỉ được thực thi trên server bạn muốn.

hoặc trong tình huống Sidekiq client và Sidekiq Server cùng đặt trên 1 host. Bạn muốn Sidekiq Server nào thực thi Job được tạo bởi Sidekiq Client trên host đấy thì có thể là 
```
sidekiq_options queue: `hostname`.strip
```


It worked like a charm!