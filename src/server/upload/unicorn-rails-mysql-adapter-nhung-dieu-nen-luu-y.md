Thời gian vừa rồi dự án của mình có một lỗi không quá nghiêm trọng nhưng nó cũng có khả năng ảnh hưởng tới trải nghiệm người dùng, đó là thỉnh thoảng khi request vào bất kỳ trang nào và vào bất kỳ site nào (dự án của mình có 3 site admin, quản lý và người dùng thông thường), bất kì người dùng nào cũng có thể bị gặp trang ERROR (lỗi 500).  Một số thông tin về hệ thống có thể cung cấp được là như sau:

- Server code bằng `Rails` 6.0.0.
- Application server là `Unicorn`.
- MySQL adapter sử dụng là `makara` - phục vụ cho việc phân chia kết nối tới Master, Slave
- DB server dĩ nhiên là MySQL server.

Lỗi 500 được log trong hệ thống như sau:

```perl
Makara::Errors::AllConnectionsBlacklistedA Makara::Errors::AllConnectionsBlacklisted occurred
...
[Makara/slave] All connections are blacklisted -> No error details
...
```

Như mình đã nói ở trên, với lỗi này thì rất khó có thể đoán được nguyên nhân, vì vấn đề không nằm ở code của hệ thống (vì nó xuất hiện rất ngẫu nhiên và rải rác, trang nào cũng có thể bị), nên mình đoán nó là do lỗi của một cơ chế nào đó trong gem mà mình đã sử dụng chưa đúng dẫn đến lỗi này. Sau một thời gian tìm hiểu thì mình biết được rằng việc sử dụng makara kết hợp với rails và unicorn chính là nguyên nhân, chúng ta hãy cùng đi vào tim hiểu chi tiết nhé.

### Background 

Đầu tiên, chúng ta hãy cùng tìm hiểu từng thành phần của hệ thống để có thể hiểu nguyên nhân chính tại sao, cũng như để biết thêm vài điều cần lưu ý nếu như dự án của bạn đang sử dụng những thành phần như trên nhé.

Như chúng ta luôn biết thì ActiveRecord (AR) là một ORM kinh điển của Rails, nó cung cấp và quản lý kết nối đến DB. AR quản lý kết nối thông qua một cơ chế được gọi là Connection Pool, mỗi một request được xử lý trong một thread, connection pool đảm bảo việc giới hạn connection tới DB server và bỏ qua độ trễ khi tạo một kết nối mới tới DB. Hãy cùng xem định nghĩa của của Rails về connection pool:

> Connection pool là một cơ chế đồng bộ một số lượng giới hạn các thread tạo kết nối tới cơ sở dữ liệu. Ý tưởng cơ bản của nó là mỗi một thread sẽ tạo một kết nối tới DB (connection) bằng cách checkout connection đó từ connection pool, sử dụng connection đó trong thread đó, rồi lại checkin ngược lại connection vào pool.

> Nó cũng handle case khi có nhiều threads hơn là số lượng connection khả dụng trong pool, khi đó các thread sẽ retry checkout connection cho đến khi có một thread khác checkin một connection trở lại pool.

Chúng ta có thể hiểu cơ chế checkin, checkout connection pool là như sau:

```ruby
if tồn tại connections đến database:
    return một trong số connection đó
if pool đã có số lượng connection đạt giới hạn:
    chờ các connection khác cho đến khi nó khả dụng
    raise exception nếu đã vượt quá một khoảng thời gian chờ giới hạn (`checkout_timeout` sẽ được nói đến dưới đây)

    return một connection khi nó được nhả bởi thread khác

tạo một connection mới đến database, 'đăng ký' nó vào connection pool
return connection mới vừa tạo
```

Trong Rails thì các kết nối này được cài đặt trong file `config/database.yml`, ngoài các thiết đặt về adapter, host, port, character_set,... Thì còn có các thiết đặt khác dành cho connection pool:

- `pool`: thiết đặt này chắc hẳn cũng phổ biến và quen thuộc với các ruby developer, đây chính là cài đặt cho số lượng tối đa mà các connection pool có thể có. Mặc định là `5` connections.
- `checkout_timeout`: khi một thread checkout connection từ pool, nếu connection trong pool đã bị chiếm hết bởi các connection khác, AR sẽ chờ một khoảng thời gian trước khi raise `ActiveRecord ConnectionTimeoutError` exeption. Mặc định là `5s`.
- `idle_timeout` và `reaping_frequency`: 
    - Khi một connection được checkin lại pool, nó sẽ ở trạng thái `idle` (đối với AR) và `sleep` (đối với MySQL server), khi sử dụng mysql client command, chúng ta có thể dùng lệnh `show processlist;` để thấy điều này. 
    - Trong AR, có một cơ chế gọi là reaping, khi rails app được init, AR sẽ tạo ra một thread độc lập, cứ một khoảng thời gian `reaping_frequency` (mặc định `1'`) qua đi, nó sẽ duyệt qua tất cả các connection có trong connection pool, nếu connection đó đã qua khoảng thời gian `idle_timeout` (mặc định `5'`) mà không sử dụng, connection đó sẽ được ngắt kết nối và loại bỏ khỏi pool.

Ngoài ra có một số thông số khác liên quan đến MySQL Server mà chúng ta cũng nên biết:
- `wait_timeout`: đây là một system variable trong MySQL Server, nó dùng để track một connection ở một trạng thái không sử dụng, nếu thời gian đó vượt quá giá trị này, server sẽ ngắt kết nối của client.

### Những điều cần lưu ý

#### Unicorn + Rails 6.0.0 và MySQL connections

- Như đã nói ở trên thì AR trong Rails có một cơ chế gọi là reaping, cơ chế này giúp giảm thiểu tối đa việc giữ kết nối không sử dụng tới DB server, ở đây là cứ không sử dụng một connection quá `5'` thì AR sẽ loại bỏ connection đó ra khỏi connection pool.
- Nhưng khi dùng rails với application server là unicorn thì lại không được như vậy, vì những lí do sau:
    - Thứ nhất, unicorn sử dụng cơ chế pre-fork model, và mỗi một request được xử lý bằng một worker process (từ `pre` ở đây có thể hiểu là worker processes được fork trước khi cả khi server có bất kỳ request nào). Ta cũng có thể hiểu là vì chạy trên process, và mỗi process là độc lập, nên unicorn không cần quan tâm đến yếu tố thread safe.
    - Thứ hai, với rails và đặc biệt là connection pool trong AR lại sử dụng cơ chế tạo connection trong từng thread và chú ý đến cả yếu tố thread safe.
    - Hai điều trên dẫn đến việc, khi unicorn chạy trên master process và `preload_app` thì nó đã khởi tạo thread reaping trong master process (thread này được tạo khi nó connection pool được khởi tạo khi app bắt đầu được chạy)
    - Thread này lại truy cập biến `@pools` (quản lý các reaping threads của các connection pools khác nhau) và `@mutex` (cung cấp cơ chế synchronize giữa các thread trong process).
    - Hai biến trên được khởi tạo trong master process, các worker processes sau khi được fork sẽ sử dụng chính hai biến này để quản lý reaper trong process đó (vì hai biến này là instance variable ở class level).
    - Ta thấy `@pools` ở đây là một hash và sẽ không spawn thêm thread reaping nếu giá trị frequency không thay đổi -> ở worker process sẽ không có reaping thread, mà ở master process thì không truy cập được bộ nhớ của worker process -> connection pools ở worker process sẽ không có cơ chế reaping.

```ruby
# activerecord-6.0.0/lib/active_record/connection_adapters/abstract/connection_pool.rb:413
...
        # mặc định thời gian interval của cơ chế này là 1 phút
        reaping_frequency = spec.config.fetch(:reaping_frequency, 60)
        @reaper = Reaper.new(self, reaping_frequency && reaping_frequency.to_f)
        # reaper được run ngay khi app bắt đầu chạy
        @reaper.run
...
```

```ruby
# activerecord-6.0.0/lib/active_record/connection_adapters/abstract/connection_pool.rb:318
...
        @mutex = Mutex.new
        @pools = {}

        class << self
          def register_pool(pool, frequency) # :nodoc:
            @mutex.synchronize do
              unless @pools.key?(frequency)
                @pools[frequency] = []
                spawn_thread(frequency)
              end
              @pools[frequency] << WeakRef.new(pool)
            end
          end

          private
            def spawn_thread(frequency)
              Thread.new(frequency) do |t|
                loop do
                  sleep t
                  @mutex.synchronize do
                    @pools[frequency].select!(&:weakref_alive?)
                    @pools[frequency].each do |p|
                      p.reap
                      p.flush
                    rescue WeakRef::RefError
                    end
                  end
                end
              end
            end
        end

        def run
          return unless frequency && frequency > 0
          self.class.register_pool(pool, frequency)
        end
```

- May mắn là điều này đã được fix và được cập nhật trong phiên bản `6.0.1` nên nếu server code của bạn có sử dụng `6.0.0` thì hãy kiểm tra và update lên `6.0.1` ngay nhé ([Ensure connection reaper threads respawn in forks](https://github.com/rails/rails/pull/36998))

### MySQL adapter của Rails & `wait_timeout`

- Vấn đề ở trên sẽ không phải quá là rắc rối nếu có một timeout ngắt kết nối connection không cần thiết - đó là `wait_timeout`
- Như đã nói ở trên thì `wait_timeout` là khoảng thời gian mà connection ở trạng thái idle/sleep sẽ bị MySQL Server ngắt kết nối. Giá trị này sẽ có thể được thiết lập cho mỗi kết nối gọi là `session variables`, nếu không thì nó sẽ copy giá trị mặc định được setting trong MySQL được gọi là `global variables`.
- Trong rails giá trị này được setting cho mỗi kết nối và được setting bằng một giá trị rất lớn (2147483 ~ hơn 20 ngày) nếu chúng ta không thiết lập ở trong `config/database.yml`.

```sql
# Log của rails khi mới start server và request lần đầu sẽ thấy đoạn này
(0.3ms)  SET NAMES utf8,  @@SESSION.sql_mode = 'TRADITIONAL',  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
```

- Điều này theo như rails là đảm bảo cho việc kết nối sẽ không bị ngắt và đủ để có thể chuyển trạng thái trước khi nó sleep quá timeout.
- Chúng ta cũng nên lưu ý giá trị này khi code những đoạn tạo connection với DB server, nếu chúng ta để trạng thái này quá ngắn, server sẽ tự ngắt connection, khi đó khi client cố request mà không kiểm tra kết nối, nó sẽ bị một trong các lỗi sau:

```markdown
Lost connection to MySQL server during query
MySQL server has gone away
```

- Vì vậy lời khuyên là để `wait_timeout` của kết nối đủ lớn để có thể sử dụng lại kết nối, và cũng nên có cơ chế check connection và disconnect những kết nối đã quá thời gian khi làm việc với MySQL server.

### Tại sao kết nối vẫn bị ngắt trong khi `wait_timeout` rất lớn như vậy?

- Về bản chất một kết nối từ client đến MySQL server là một kết nối tcp, tcp thì luôn có cơ chế keep-alive, trên linux server thì chúng ta có thế kiểm tra các thông số về tcp keep-alive như sau:
    - `/proc/sys/net/ipv4/tcp_keepalive_time`: khoảng thời gian gửi gói tin keep alive đầu tiên sau khi connection không được sử dụng. (default `7200s`)
    - `/proc/sys/net/ipv4/tcp_keepalive_probes`: số lần gửi gói tin keep-alive đi. (default `9`)
    - `/proc/sys/net/ipv4/tcp_keepalive_intvl`: thời gian chờ giữa các lần gửi gói tin. (default `75s`)

- Như vậy với một tcp connection không sử dụng, nó sẽ tốn tài được tối đa là `tcp_keepalive_time + tcp_keepalive_probes * tcp_keepalive_intvl` (`s`) trước khi bị ngắt kết nối.
- Đây chỉ là ***giả thiết*** của mình vì không có một cơ chế nào khác có thể khiến server ngắt kết nối, kết nối mạng của hệ thống cũng hoàn toàn ổn định, các chỉ số về gói tin request đến server cũng đều được kiểm tra và không có gì bất ổn, không có alarm nào cảnh báo trong hệ thống.

### Tại sao lại bị lỗi 500?

Cuối cùng chúng ta cũng sẽ cùng đi đến với nhân vật chính của chúng ta: `makara`. `makara` là một gem cung cấp cho chúng ta một cơ chế để phân chia query tới master hoặc là slave DB.

Về cơ bản thì AR đã cho chúng ta rất nhiều adapter sử dụng để kết nối đến rất nhiều loại DB (MySQL, Postgres,...), nhưng `makara` thì ... "không", nó không cho chúng ta một adapter nào cả, đơn giản `makara` chỉ cho chúng ta một lớp wrapper lại cái mà AR đã cung cấp cho chúng ta đó là `mysql2_adapter`.

![](https://images.viblo.asia/c8f6c2a0-11a8-4ff5-8d9a-7d69bae711c8.jpg)

```ruby
# makara-0.4.1/lib/active_record/connection_adapters/makara_mysql2_adapter.rb
...
      def active_record_connection_for(config)
        ::ActiveRecord::Base.mysql2_connection(config)
      end
...
# makara-0.4.1/lib/makara/proxy.rb
...
  class Proxy < ::SimpleDelegator
    class << self
      def hijack_method(*method_names)
        self.hijack_methods = self.hijack_methods || []
        self.hijack_methods |= method_names

        method_names.each do |method_name|
          define_method method_name do |*args, &block|
            appropriate_connection(method_name, args) do |con|
              con.send(method_name, *args, &block)
            end
          end
        end
      end

      def send_to_all(*method_names)
        method_names.each do |method_name|
          define_method method_name do |*args|
            send_to_all method_name, *args
          end
        end
      end
    end
....
    def graceful_connection_for(config)
      fake_wrapper = Makara::ConnectionWrapper.new(self, nil, config)

      @error_handler.handle(fake_wrapper) do
        connection_for(config)
      end
    rescue Makara::Errors::BlacklistConnection => e
      fake_wrapper.initial_error = e.original_error
      fake_wrapper
    end

```

- Từ đoạn code trên ta có thể thấy, `makara` với mỗi connection tạo ra, makara lại tạo ra hai pool gồm `n` connections khác, với `n` là số lượng DB master/slave mà ta khai báo trong config.
- Sau đó với mối một query, nó sẽ chọn ra DB phù hợp để gửi connection tới đó, về cơ bản thì cứ các câu read thì gửi đến slave, câu write thì gửi đến master.
- Nhưng với ngoại lệ là câu SET thì nó lại gửi đến tất cả các DB (chính là câu query mà ta đã nói ở phần trước để khởi tạo connection).
- Trong phần log lỗi, mình cùng team có điều tra thì đều thấy lỗi khi nó gửi rất nhiều câu SET như vậy, mình đã tiếp tục điều tra theo hướng query lỗi khi nó gửi câu khởi tạo connection tới DB server.
- Như đã nói ở trên câu lệnh để khởi tạo connection là một lệnh SET. Vậy nên khi nó được truyền tới makara, nó được `makara` gửi đến tất cả các DB để khởi tạo kết nối, khi một kết nối của `makara_adapter` được sử dụng xong, nó cũng được checkin lại pool như bình thường. Đến khi checkout khỏi pool để sử dụng lại khi có request khác. AR có một cơ chế đảm bảo connect đó còn active, nếu không thread đó sẽ tự disconnect và tạo connection mới trong nó (đây là một cơ chế được những người viết framework handle rất hiệu quả).
- Với bản rails 4, mọi thứ không vấn đề gì khi đơn giản là trong phần khởi tạo, AR gọi chính biến `@connection` chứa mysql client và send method `query` cho nó. Thế nhưng ở rails 6.0.0 thì nó lại viết lại bằng cách sử dụng hàm `execute`.

```ruby
# lib/active_record/connection_adapters/abstract_mysql_adapter.rb:748
# ở rails 6
        def configure_connection
          ...
          execute "SET #{encoding} #{sql_mode_assignment} #{variable_assignments}"
          ...
        end
# ở rails 4
        def configure_connection
          ...
          @connection.query  "SET #{encoding} #{variable_assignments}"
          ...
        end

```

- Hàm `execute` lại được wrap bởi chính `connection_wrapper` của makara -> nó gửi lệnh SET này đến cả hai kết nối
- Vì vậy đáng ra luồng đúng phải là:
    - checkout connection cũ.
    - kiểm tra connection còn active không.
    - Trả về connection cũ nếu active.
    - Disconnect và tạo connection mới khi không active.
    - Trả về connection vừa tạo.
- Thì nó lại chỉ được áp dụng cho một connection (slave) trong số hai connection, và với connection còn lại (master), nó gửi luôn câu lệnh SET mà không kiểm tra kết nối, dẫn đến lỗi `Lost connection` và `gone away` đã nói ở phần trước.

### Cách khắc phục

- Về cách khắc phục thì có khá nhiều cách, nhưng cách mà mình cho là tốt nhất là không nên dùng gem makara nữa, vì nó không mang lại cơ chế thread safe như AR đang cung cấp, hơn nữa nó luôn tạo connection đến master DB trong khi phần lớn các request của chúng ta đều là đọc từ slave. Hơn nữa vì thay đổi trong phiên bản rails 6 và cách makara wrap hàm `execute` của AR adapter, nên với những người dùng rails 6 thì nên lưu tâm vấn đề này. Với rails 6 chúng ta có thể tham khảo [multiple databases](https://guides.rubyonrails.org/active_record_multiple_databases.html) đã được tích hợp trong rails.
- Một cách đơn giản nhất mà chúng ta có thể dùng không sợ lỗi đó chính là thêm cài đặt `reconnect: true` vào setting `config/database.yml`, khi cung cấp cài đặt này sẽ cho phép các connection tự động reconnect lại *** 1 lần (retry once)*** nếu nó bị lỗi, mà không cần kiểm tra từ bước checkout khỏi pool. Bạn có thể tìm hiểu kỹ hơn tại [đây](https://dev.mysql.com/doc/refman/5.7/en/c-api-auto-reconnect.html) 
- Như ở trên đã nói, nếu bạn đã dùng rails 6 hãy update lên bản `6.0.1` để sửa lỗi reaping không chạy tại các worker process sau khi fork.

### Kết luận

Vậy sau bài hôm nay chúng ta có thể biết được một số lỗi cơ bản khi kết nối với DB và cách khắc phục một vài vấn đề khi scale MySQL server. Một sai lầm nghiêm trọng là không nên nâng cấp phiên bản rails của bạn quá nhanh mà không tìm hiểu kỹ major changes gây ảnh hưởng lên hệ thống của bạn. Mong rằng có thể giúp được các bạn trong các dự án thực tế sắp tới.