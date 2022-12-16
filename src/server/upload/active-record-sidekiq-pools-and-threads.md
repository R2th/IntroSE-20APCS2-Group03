Đối với bản thân mình, thì việc sử dụng sidekiq được áp dụng khá là nhiều trong các dự án. Thực tế là mình sử dụng sidekiq cho hầu hết các tác vụ background job. Các sidekiq jobs có thể cần truy vấn vào database để thực thi job. Mọi thứ trong có vẻ ổn, cho đến khi lỗi sau xảy ra trong dự án của mình.
> could not obtain a connection from the pool within 5.000 seconds (waited 5.002 seconds); all pooled connections were in use (ActiveRecord::ConnectionTimeoutError)

## What happen ?
OK, sau khi kiểm tra tất cả các công cụ giám sát monitoring, log server, thì cuối cùng mình cũng phát hiện ra lỗi xuất hiện trong sidekiq job. Sau khi điều tra 1 hồi thì mình đã tìm ra được nguyên nhân và giải pháp như sau.
### Theory
Trước tiên, chúng ta có một file cấu hình database ở thư mục ***config/database.yml*** tương tự như bên dưới:
```
development:
  adapter: postgresql
  database: my_super_database_development
  pool: 3
```
Xem lại nội dung lỗi ở trên ***could not obtain a connection from the pool***. Có vẻ như nó đang liên quan đến việc config pool trong.file trên.
OK, mình sẽ kiểm tra nó. Trong [document của rails](https://guides.rubyonrails.org/v5.1/configuring.html#database-pooling) có đề cập là: 
> Active Record database connections are managed by ActiveRecord::ConnectionAdapters::ConnectionPool which ensures that a connection pool synchronizes the amount of thread access to a limited number of database connections.
> 
> Translator: Việc kết nối ActiveRecord với database sẽ được quản lí bởi ActiveRecord::ConnectionAdapters::ConnectionPool, nó sẽ đảm bảo rằng một connection pool sẽ đồng bộ số lượng thread access đến database trong một giới hạn nào đó. Nghĩa là nó sẽ hạn chế số lượng connection từ app đến database.


và
> If you try to use more connections than are available, Active Record will block you and wait for a connection from the pool. If it cannot get a connection, a timeout error similar to that given below will be thrown.
> 
> Translator: Nếu bạn sử dụng nhiều hơn số connection cho phép, Active Record sẽ block connection đó lại và chờ cho đến khi nào có một connection available từ pool. Nếu như k có được connection nào, thì lỗi timeout error như trên sẽ xảy ra.

Có vẻ khá là khó hiểu, tuy nhiên chỉ cần chúng ta hiểu được connection pool là gì thì sẽ rõ câu trả lời mà thôi.

### Connection Pool
Bây giờ chúng ta sẽ cùng trả lời câu hỏi. Connection Pool là gì ?
Một connection là một bộ đệm duy trì các kết nối tới database. Các kết nối tới database sau khi sử dụng sẽ không đóng lại ngay mà sẽ được dùng lại khi được yêu cầu trong tương lai.

Cơ chế hoạt động của nó như sau: khi một connection (một kết nối) được tạo, nó sẽ được đưa vào pool và sử dụng lại cho các yêu cầu kết nối tiếp theo và chỉ bị đóng khi hết thời gian timeout.
Ví dụ, max pool size = 10 (số lượng tối đa connection trong pool là 10).
Bây giờ user kết nối tới database (truy vấn database), hệ thống sẽ kiểm tra trong connection pool có kết nối nào đang rảnh không?

* Trường hợp chưa có kết nối nào trong connection pool hoặc tất cả các kết nối đều bận (đang được sử dụng bởi user khác) và số lượng connection trong connection < 10 thì sẽ tạo một connection mới tới database để kết nối tới database đồng thời kết nối đó sẽ được đưa vào connection pool.
* Trường hợp tất cả các kết nối đang bận và số lượng connection trong connection pool = 10 thì người dùng phải đợi cho các user dùng xong để được dùng.
* Sau khi một kết nối được tạo và sử dụng xong nó sẽ không đóng lại mà sẽ duy trì trong connection pool để dùng lại cho lần sau và chỉ thực sự bị đóng khi hết thời gian timeout (lâu quá không dùng đến nữa)

![connection_pool](https://images.viblo.asia/025a9122-f166-44d6-9165-ab91a7ada9e1.jpg)

### Config Sidekiq
Như vậy chúng ta có thể tạm kết luận là đó là số connection đến database nhiều hơn số connection cho phép trong một pool, dẫn đến việc có một vài request không được connect đến database vượt quá thời gian timeout nên sẽ gây ra lỗi trên. Lỗi được mô ta như hình bên dưới.

![](https://images.viblo.asia/1fee1382-a2ca-4ca7-90cb-6f29a841efe7.gif)

Tuy nhiên, chúng ta mới chỉ đang xét đến việc config ở trong server Rails, còn sidekiq thì sao ? Chúng ta cần config các thread của nó như thế nào để để ngăn chặn lỗi trên xảy ra ? Trong [wiki sidekiq](https://github.com/mperham/sidekiq/wiki/Advanced-Options#concurrency) đã đề cặp trực tiếp đến vấn đề trên như sau:

> You can tune the amount of concurrency in your sidekiq process. By default, one sidekiq process creates 10 threads.
> 
> Translator: Bạn có thể điều chỉnh số lượng concurency trong sidekiq process. Mặc định, một sidekiq process sẽ tạo ra 10 threads.

Vì vậy, việc tạo ra nhiều threads như mình đã đề cập ở trên sẽ được thực hiện ở file ***config/sidekiq.yml***

![](https://images.viblo.asia/c3bd2737-227c-45a4-bdb6-5152205a23a4.gif)

Và đây là một số lưu ý nhỏ trên wiki:

> Note that ActiveRecord has a connection pool which needs to be properly configured in config/database.yml to work well with heavy concurrency. Set the pool setting to something close or equal to the number of threads

Như vậy, nếu như số lượng concurency của sidekiq bằng với số connection tối đa có thể trong 1 pool của ActiveRecord, thì chúng ta sẽ không thể có thêm threads nào được ActiveRecord chấp nhận để kết nối đến database nữa. Như vậy có thể kết luận là sidekiq đã tạo ra nhiều kết nối đến database vượt quá giới hạn cho phép của ActiveRecord, nên có thể dẫn đến tình trạng trên. Có 2 nguyên nhân có thể xảy ra.

* Một là việc config số concurrentcy của sidekiq lớn hơn số connection được phép trong 1 pool của ActiveRecord
* Hai là mặc dù config số lượng bằng nhau. Nhưng trong qúa trình thực thi một thread, thì nó lại tạo thêm các connection khác đến database.

## Reproceduce
Để khẳng định giả thuyết trên, thì mình sẽ tạo ra một ứng dụng Rails nho nhỏ với database và sidekiq. Mình sẽ config 2 file như sau:
```
# config/sidekiq.yml
development:
  :concurrency: 3


# config/database.yml
development:
  pool: 3
```

Bây giờ mình sẽ tạo một worker như sau:
```
class MyWorker
  include Sidekiq::Worker
  def perform
    puts 'Inside worker'
    MyService.new.call
  end
end
```
Đây là một woker đơn giản, nhưng nó sẽ gọi đến một service để thực hiện việc tạo các kết nối đến database. Trong service đó chúng ta sẽ tái hiện lại việc tạo ra nhiều kết nối đến database vượt quá số lượng connection cho phép trong một pool.

```
class MyService
  def call
    threads = []
    ActiveRecord::Base.connection.execute("select pg_sleep(4);") # Simulate some query
    0.upto 10 do |index|
      puts "calling Service #{index}"
      threads << async_call do
        ActiveRecord::Base.connection.execute("select pg_sleep(20);") # <=== simulate a long query
      end
    end
    threads.join
  end

  def async_call
    Thread.new do
      puts 'do some async stuff here'
      yield
    end
  end
end
```

Thử chạy worker và chúng ta sẽ nhận được kết quả là:
> ruby-2.5.3/gems/activerecord-5.2.1.1/lib/active_record/connection_adapters/abstract/connection_pool.rb:199:in `block in wait_poll’: could not obtain a connection from the pool within 5.000 seconds (waited 5.010 seconds); all pooled connections were in use (ActiveRecord::ConnectionTimeoutError)

Không chắc chắn rằng đó chính xác là những gì đã xảy ra ở các dự án cụ thể, tuy nhiên lỗi này xảy ra tương tự như lỗi mà mình đã gặp.

Hãy nhớ lại rằng, mình đã đề cập đến với mỗi process ActiveRecord sẽ được assigns x connection đã được config trong file database.yml. Mỗi connection sẽ được thực hiện bởi một thread. Nếu như số concurrency của sidekiq bằng với giá trị pool, thì sẽ không có vấn đề gì. Nhưng nếu như một cái gì đó tạo ra một thread mới và gọi đến database trong quá trình thực thi, thì đó chính là trường hợp mà mình đã đề cập trong ví dụ trên ở class MyService.

## The Why!
![](https://images.viblo.asia/b22b2beb-8b61-415c-9cf9-05164cb314bb.gif)

Trong thực tế, các sidekiq job sẽ được thực hiện bất đồng bộ, nên sẽ khả năng xảy ra việc full connection trong 1 pool sẽ thấp. Tuy nhiên chúng ta cần đảm bảo rằng việc xử lí dữ liệu không tạo ra quá nhiều kết nối đến database, nhưng cũng có một số trường hợp bắt buộc phải kết nối nhiều đến database như là import lượng lớn dữ liệu vào database, lúc đó chúng ta cần config số lượng kết nối trong 1 pool và số concurrency một cách hợp lí để tránh gây ra lỗi trên cũng như tránh lãng phí tài nguyên.
Vì vậy để không phải đau đầu để tìm ra nguyên nhân cũng như giải pháp, thì chúng ta nên cẩn thận trong việc đặt cái gì vào trong workers của mình.

Link tham khảo:

https://www.guidearea.com/best-database-practices-single-connection-vs-connection-pool/
https://guides.rubyonrails.org/v5.1/configuring.html#database-pooling
https://github.com/mperham/sidekiq/wiki/Advanced-Options#concurrency