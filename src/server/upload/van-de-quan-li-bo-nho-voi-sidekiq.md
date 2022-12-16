## 1. Vấn đề bộ nhớ với sidekiq

Gần đây tôi có gặp phải vấn đề server thỉnh thoảng bị tràn bộ nhớ, tìm hiểu nguyên nhân thì ra `sidekiq` ngốn quá nhiều RAM. Đọc đi đọc lại code vẫn không thấy có vấn đề gì. Loay hoay một hồi mới tái hiện được trên máy cá nhân, lỗi là do các job khi chạy xong sidekiq không giải phóng bộ nhớ ngay. Với những job nhỏ chiếm ít bộ nhớ thì không sao nhưng với job cần nhiều bộ nhớ để thực thi thì vấn đề trở lên đáng quan ngại.

## 2. Tái hiện lỗi quản lí bộ nhớ của sidekiq

Để tái hiện lỗi xử lí bộ nhớ của sidekiq tôi tạo ra một job cần khá nhiều bộ nhớ để xử lí với nội dung như sau

```ruby
class SidekiqHardWorker
  include Sidekiq::Worker

  def perform(*args)
    puts "job starting"
    a = (0..200_000).to_a.map{|i| User.new name: "user name#{i}"}
    puts "job done !"
  end
end
```

Tiếp đó ta chạy sidekiq và tạo ra các job, tôi sẽ thử với 20 jobs

Start sidekiq
```
$ sidekiq
```

Test worker
```
$ rails c
2.3.0 :002 > 20.times{SidekiqHardWorker.perform_async}
```

Kết quả sau khi chạy xong 20 jobs thì sidekiq đã chiếm gần hết RAM trên máy tính đợi một thời gian khá lâu phần bộ nhớ này vẫn không được giải phóng. Đến khi tắt sidekiq thì bộ nhớ do sidekiq chiếm mới được giải phóng

Một vài hướng giải pháp đưa ra như chạy `garbage collection` khi job hoàn thành. Tuy nhiên kết quả không có gì thay đổi sidekiq vẫn chiếm bộ nhớ và không được giải phóng khi job chạy xong.

```
class SidekiqHardWorker
  include Sidekiq::Worker

  def perform(*args)
    puts "job starting"
    a = (0..200_000).to_a.map{|i| User.new name: "user name#{i}"}
    GC.start # run garbage collection
    puts "job done !"
  end
end
```

## 3. Sử dụng resque

Tôi thử tạo một job tương tự và cho chạy với một thư viện khác `resque`

```
class ResqueHardWorker
  @queue = :simple_queue

  def self.perform(*args)
    puts "job starting"
    a = (0..200_000).to_a.map{|i| User.new name: "user name#{i}"}
    puts "job done !"
  end
end
```

Start resque
```
$ COUNT=5 QUEUE=* rake resque:work
```

Test worker
```
$ rails c
2.3.0 :002 > 20.times{Resque.enqueue ResqueHardWorker, nil}
```

Kết quả thật đáng ngạc nhiên `resque` quản lí bộ nhớ rất tốt. Sau khi chạy xong 20 jobs bộ nhớ gần như không thay đổi so với lúc bắt đầu chạy `resque`.

## Kết luận

Sidekiq và Resque đều có những ưu điểm riêng. Theo một só sánh dưới [đây](https://imvishaltyagi444.wordpress.com/2016/07/11/delayed-job-vs-resque-vs-sidekiq) thì sidekiq có tốc độ xử lí job ưu việt hơn cả
![](https://images.viblo.asia/80310778-1d86-4db8-88f8-4ea8349bbfb0.png)

Tuy nhiên do Sidekiq có vấn đề với việc quản lí bộ nhớ với các job cần nhiều bộ nhớ, trong trường hợp ứng dụng của bạn cần phải xử lí những job như vậy thì chuyển sang `resque` là một lựa chọn không tệ.

## Tham khảo
1. [sidekiq](https://github.com/mperham/sidekiq)
2. [resque](https://github.com/resque/resque)
3. [delayed-job-vs-resque-vs-sidekiq](https://imvishaltyagi444.wordpress.com/2016/07/11/delayed-job-vs-resque-vs-sidekiq)
4. [sidekiq-resque-example](https://github.com/ngocthoaia1/viblo-reports/tree/master/sidekiq-resque-comparison)