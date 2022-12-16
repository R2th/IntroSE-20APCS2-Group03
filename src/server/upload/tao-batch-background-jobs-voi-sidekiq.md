Khi chúng ta muốn tạo nhiều background jobs chạy song song và muốn biết lúc nào tất cả các jobs đó đã complete hay chưa, vậy chúng ta phải làm thế nào? 

Sidekiq Pro cho phép mình chạy tập các background jobs song song và sau đó sẽ nhận được callback ngay sau tất cả các jobs đã chạy xong. Tuy nhiên, Sidekiq Pro là tính năng tính phí của Sidekiq. Rất may, [gem sidekiq-batch](https://github.com/breamware/sidekiq-batch) đã được build lên dựa trên api của Sidekiq Pro và mình có thể dùng miễn phí, và cách sử dụng thì giống với Sidekiq Pro.

# Installation
```ruby
gem "sidekiq-batch"
```
```
$ bundle install
```

# Basic Usage
```ruby
batch = Sidekiq::Batch.new
batch.description = "Creating Complex Jobs..."
batch.on(:success, MyCallback, option) #option là dạng Hash
batch.on(:complete, MyCallback, option) #option là dạng Hash
batch.jobs do
 ComplexWorker1.perform_async
 ComplexWorker2.perform_async
 ComplexWorker3.perform_async
 ...
end
```
Khi tập tất cả các jobs đã complete, `MyCallBack` sẽ được thực hiện.

```ruby
class MyCallBack
  def on_complete(status, options)
    puts "Batch has failures" if status.failures != 0
  end
  def on_success(status, options)
    puts "Batch succeed"
  end
end
```

* `complete` -  khi tất cả các jobs trong batch được chạy xong ít nhất một lần, dù thành công hay không.
* `success` -  khi tất cả các jobs trong batch đã được chạy thành công.
* `death` - khi batch có error xảy ra

Trong các callback trên, params status sẽ có các option sau:
```ruby
status = Sidekiq::Batch::Status.new(bid)
status.total # số jobs
status.failures # số jobs đã fail
status.pending # số jobs đang chạy chưa thành công
status.created_at # => datetime chạy
status.complete? #  check nếu batch đã complete chưa
status.failure_info # array của jobs failed
status.data # hash của batch data
```

# Demo Example
```ruby
# app/services/create_complex_jobs_service.rb

class CreateComplexJobsService
  def perform
    batch = Sidekiq::Batch.new
    batch.description = "Creating cluster"
    batch.on(:success, ComplexJobCallbackService)
    batch.on(:complete, ComplexJobCallbackService)
    batch.jobs do
      5.times { |i| CreateComplexJobWorker.perform_async(i) }
    end
  end
end
```

```ruby
# app/services/complex_job_callback_service.rb

class ComplexJobCallbackService
  def on_success(status, options)
    puts "----"
    puts status, options
    puts "Batch success"
  end

  def on_complete(status, options)
    if status.failures != 0
      puts "Batch has failures"
      puts status.failure_info
    end
    puts "----"
    puts status, options
    puts "Batch complete"
  end
end
```
```ruby
# app/workers/create_complex_job_worker.rb

class CreateComplexJobWorker
  include Sidekiq::Worker
  def perform(id)
    puts "Creating job #{id}..."
    sleep 1
  end
end
```

Kết quả:

```
$ CreateComplexJobsService.new.perform
=> ["08353e8f349b8452800e922c", "55444a8b49e196ebf91d1003", "ab31baab81a49a7773fb056d", "474e88d1442faf7e6159a077", "8300a336f66a6f8c72e85adc"]
```

```
2021-01-22T08:16:59.356Z 4220 TID-ovfhvkj7o CreateComplexJobWorker JID-08353e8f349b8452800e922c BID-tdYhwcrQsEQabA INFO: start
2021-01-22T08:16:59.359Z 4220 TID-ovfhf08hs CreateComplexJobWorker JID-ab31baab81a49a7773fb056d BID-tdYhwcrQsEQabA INFO: start
2021-01-22T08:16:59.363Z 4220 TID-ovfhf08gs CreateComplexJobWorker JID-55444a8b49e196ebf91d1003 BID-tdYhwcrQsEQabA INFO: start
2021-01-22T08:16:59.365Z 4220 TID-ovfhvkizk CreateComplexJobWorker JID-8300a336f66a6f8c72e85adc BID-tdYhwcrQsEQabA INFO: start
2021-01-22T08:16:59.371Z 4220 TID-ovfhf07kg CreateComplexJobWorker JID-474e88d1442faf7e6159a077 BID-tdYhwcrQsEQabA INFO: start
Creating job 0...
2021-01-22T08:17:00.440Z 4220 TID-ovfhvkj7o CreateComplexJobWorker JID-08353e8f349b8452800e922c BID-tdYhwcrQsEQabA INFO: done: 1.084 sec
Creating job 2...
Creating job 3...
Creating job 1...
Creating job 4...
2021-01-22T08:17:01.491Z 4220 TID-ovfhf08hs CreateComplexJobWorker JID-ab31baab81a49a7773fb056d BID-tdYhwcrQsEQabA INFO: done: 2.131 sec
2021-01-22T08:17:01.492Z 4220 TID-ovfhf07kg CreateComplexJobWorker JID-474e88d1442faf7e6159a077 BID-tdYhwcrQsEQabA INFO: done: 2.121 sec
2021-01-22T08:17:01.495Z 4220 TID-ovfhvkizk CreateComplexJobWorker JID-8300a336f66a6f8c72e85adc BID-tdYhwcrQsEQabA INFO: done: 2.129 sec
2021-01-22T08:17:01.497Z 4220 TID-ovfhvkj7o Sidekiq::Batch::Callback::Worker JID-c7f98aa5721f57015a48334b BID-5UNzECYjGM035Q INFO: start
2021-01-22T08:17:01.497Z 4220 TID-ovfhf08gs CreateComplexJobWorker JID-55444a8b49e196ebf91d1003 BID-tdYhwcrQsEQabA INFO: done: 2.134 sec
----
#<Sidekiq::Batch::Status:0x00007fa34b6bdd98>
{}
Batch complete
2021-01-22T08:17:01.501Z 4220 TID-ovfhf07rg Sidekiq::Batch::Callback::Worker JID-c57ca2bcd2fe25269066a8ea BID-GJJ4t5EPp_XGNw INFO: start
2021-01-22T08:17:01.501Z 4220 TID-ovfhvkj7o Sidekiq::Batch::Callback::Worker JID-c7f98aa5721f57015a48334b BID-5UNzECYjGM035Q INFO: done: 0.005 sec
----
#<Sidekiq::Batch::Status:0x00007fa3474ebed8>
{}
Batch success
2021-01-22T08:17:01.504Z 4220 TID-ovfhf07rg Sidekiq::Batch::Callback::Worker JID-c57ca2bcd2fe25269066a8ea BID-GJJ4t5EPp_XGNw INFO: done: 0.003 sec
```

 Như kết quả trên, chúng ta thấy rằng sau khi các jobs chạy song song complete, callback on_success và on_complete đã thực hiện như mong muốn.
 
 References:
 
 https://github.com/breamware/sidekiq-batch
 
 https://github.com/mperham/sidekiq/wiki/Batches
 
 https://gorails.com/episodes/batching-background-jobs-with-sidekiq?autoplay=1