## Sidekiq Logging

Sidekiq là một gem hỗ trợ đa luồng trong ruby có nghĩa là bạn có rất nhiều hành động xảy ra một lúc. Vì vậy khi hệ thống gặp lỗi thì dev sẽ luôn gặp khó khăn cho một hệ thống đa luồng như vậy. Tuy nhiên Sidekiq có hỗ trợ cho dev một công cụ là Logging sẽ export cho người dev thấy được các tiến trình trong sidekiq.

VD:

```logger
UTC Timestamp------- PID-- ThreadID----- LLvl  YourKlass- JobID--------
2012-03-02T19:40:45Z 32515 TID-oveahmcxw INFO: HardWorker JID-oveaivtrg start
2012-03-02T19:40:45Z 32515 TID-oveajt7ro INFO: HardWorker JID-oveaish94 start    
2012-03-02T19:40:55Z 32515 TID-oveahmcxw INFO: HardWorker JID-oveaivtrg done: 10.003 sec
2012-03-02T19:40:55Z 32515 TID-oveajt7ro INFO: HardWorker JID-oveaish94 done: 10.002 sec
```

Theo mặc định Sidekiq ghi dưới dạng STDOUT, vì vậy thời gian sẽ được ghi dưới định dạng UTC.

### Thêm log

Worker có thể xử dụng `logger` trong ruby như sau:

```
class YourWorker
  include Sidekiq::Worker

  def perform
    logger.info "=========="
    logger.debug "This is log"
  end
end
```

### Tìm kiếm log

Khi chạy sidekiq thì hệ thống sẽ sinh ra một file `log/sidekiq.log`.
File này đươc lưu trữ tại thư mục dự án. 
Nếu bạn gặp lỗi và cần kiểm tra `log`. Bạn có thể sử dụng `awk/grep/ack` để tìm kiếm vấn đề mình cần. 

VD:
Mình thường xuyên sử dụng `grep` thay vì `awk` vì thấy đa số mọi người đều vậy và cũng chưa kịp tìm hiểu `grep` vs `awk`, `ack` có khác nhau gì không.

Nếu bạn muốn tìm kiếm từ `This is log` trong ví dụ trên thì có thể sử dụng câu lệnh:

```
grep "This is log" log/sidekiq.log

hoặc zgrep "This is log" log/sidekiq.log
```

giữa 2 câu lệnh `grep` & `zgrep` thì đều cho ra một kết qua, tuy nhiên zgrep thì tìm  kiếm kết quả với file nén(hệ thống thông thường sẽ lưu log trong vòng 1 tuần hoặc 30 ngày tùy vào config, vì vậy file của bạn có thê bị nén).

### Định nghĩa tên file log

Để quyết định tên file `Log` bạn có thê dùng `-L` trên CLI. 
```
bundle exec sidekiq ... -L log/sidekiq.log
```

Hoặc trong phần `logfile` của file config `config/sidekiq.yml`

```
---
:verbose: false
:pidfile: ./tmp/pids/sidekiq.pid
:logfile: ./log/sidekiq.log
:concurrency:  2
```

### Tắt Logging trong môi trường Test

Thường thì chúng ta sẽ không ghi log trong môi trường test vì vậy bạn cần thêm:
```
require  "rspec/rails"
require "sidekiq/testing"
Sidekiq::Logging.logger = nil
```
Với Rspec..

### Chỉnh sửa Sidekiq Log theo ý

Mặc định Log sidekiq sẽ ghi mọi Log theo như Lib của ruby vì vậy để tùy chỉnh log bạn mong muốn hiển thị có thể dùng

```
Sidekiq::Logging.logger.level = Logger::WARN
```
Sẽ quyết định file log của bạn gồm những gì.
Theo như ở trên thì file log ghi ra sẽ chỉ gồm những log có trạng thái `WARN`.

### Format Log 
```
"#{time.utc.iso8601} #{Process.pid} TID-#{Thread.current.object_id.to_s(36)}#{context} #{severity}: #{message}\n" 
```

Mặc định log của sidekiq sẽ được ghi theo định dạng trên. Mình cũa chưa làm phần tùy chỉnh log của phần này tuy nhiên thấy có hỗ trợ  bạn có thể sử dụng: 

```
Sidekiq.logger.formatter = MyFormatter.new
```

### Ghi đè cấu hình log

Mặc định phần log của Sidekiq được viết trong file: [JobLogger](https://github.com/mperham/sidekiq/blob/master/lib/sidekiq/job_logger.rb).

Bạn có thể tùy chỉnh cấu hình bằng cách:

```
Sidekiq.configure_server do |config|
  config.options[:job_logger] = MyJobLogger
end

class MyJobLogger
  def call(item, queue)
    #
    # Optionally add context to all log lines of a given job, in addition to
    # Sidekiq’s default “TID-xxx JID-yyy” context.
    #
    Sidekiq::Logging.with_context("source=#{item['class']}") do
      begin
        start = Time.now
        logger.info('start')
        yield
        logger.info("count#job.success=1 measure#job.duration=#{elapsed(start)}s")
      rescue Exception
        logger.info("count#job.failure=1 measure#job.duration=#{elapsed(start)}s")
        raise
      end
    end
  end

  private

  def elapsed(start)
    (Time.now - start).round(3)
  end

  def logger
    Sidekiq.logger
  end
```

Thay đổi thuộc tính `config.options[:job_logger]` bằng `class` tùy chỉnh của bạn để phù hợp với dự án...

### Kết Luận

Cám ơn các bạn đã theo dõi, Log là một thành phần không thể thiếu khi bạn làm việc với môi trường production. Vì vậy hãy tạo ra một log dễ hiểu nhất vừa giúp được cho mình và đồng nghiệp sau này. 
Bản chính tại [Wiki Sidekiq](https://github.com/mperham/sidekiq/wiki/Logging).