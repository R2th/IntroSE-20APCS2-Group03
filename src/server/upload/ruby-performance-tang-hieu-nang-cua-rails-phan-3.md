Trong phần 2, chúng ta đã tìm hiểu về một vài lỗi phổ biến về hiệu năng trong Ruby. Chúng ta đã biết, muốn tăng hiệu năng thì cần phải sử dụng bộ nhớ ít hơn, tránh dùng các hàm xử lý phức tạp khi chạy vòng lặp. Tương tự, Rails cũng như vậy. Trong bài viết này, chúng ta sẽ đề cập đến một vài cách giúp cải thiện hiệu năng trong Rails.


### Làm cho ActiveRecord nhanh hơn

ActiveRecord là một bộ bao bọc lấy dữ liệu. Do vậy, ta có thể thấy rằng ActiveRecord sẽ cần phải tốn bộ nhớ, và thực vậy. Nó đã sử dụng vượt mức cả về số lượng object và bộ nhớ. Để rõ hơn, chúng ta thử tạo một cơ sở dữ liệu với bảng gồm 10 cột chuỗi và chứa 10,000 row, mỗi row chứa 10 chuỗi của 100 kí tự.

```ruby
class LargeTables < ActiveRecord::Migration 
def up
   create_table :things do |t| 
      10.times do |i|
         t.string "col#{i}" 
      end
   end
   execute <<-END
       insert into things(col0, col1, col2, col3, col4,
                         col5, col6, col7, col8, col9) (
        select
          rpad('x', 100, 'x'), rpad('x', 100, 'x'), rpad('x', 100, 'x'),
          rpad('x', 100, 'x'), rpad('x', 100, 'x'), rpad('x', 100, 'x'),
          rpad('x', 100, 'x'), rpad('x', 100, 'x'), rpad('x', 100, 'x'),
          rpad('x', 100, 'x')
        from generate_series(1, 10000)
      );
      END
   end

   def down
    drop_table :things
   end 
end
```

Quá trình migate sẽ tạo 10 triệu byte dữ liệu (10,000 * 10 * 100), khoảng 9.5MB. Cơ sở dữ liệu này khá hiệu quả trong việc lưu trữ. VD, với DB là PostgreSQL thì chỉ mất 11 MB.

```ruby
$ psql app_development
app_development=# select pg_size_pretty(pg_relation_size('things')); pg_size_pretty
----------------
11 MB
```

Giờ hãy xem mức độ hiệu quả bộ nhớ khi sử dụng ActiveRecord. Giả sử ta tạo model Thing

```ruby
class Thing < ActiveRecord::Base 
end
```

tiếp theo là tạo 1 bộ đo các thông số gồm bộ nhớ, GC 

```ruby

class Measure
  def self.run(options = {gc: :enable}) 
    if options[:gc] == :disable
      GC.disable
    elsif options[:gc] == :enable
      # collect memory allocated during library loading # and our own code before the measurement  
      GC.start
    end
    memory_before = `ps -o rss= -p #{Process.pid}`.to_i/1024 
    gc_stat_before = GC.stat
    time = Benchmark.realtime do
       yield 
    end
    gc_stat_after = GC.stat
    GC.start 
    if options[:gc] == :enable
         memory_after = `ps -o rss= -p #{Process.pid}`.to_i/1024
         puts({
           RUBY_VERSION => {
              gc: options[:gc],
              time: time.round(2),
              gc_count: gc_stat_after[:count].to_i - gc_stat_before[:count].to_i, 
              memory: "%d MB" % (memory_after - memory_before)
        } }.to_json)
   end 
end
```

Giờ bắt đầu chạy migration và đo bộ nhớ tiêu thụ. Thêm config production để đảm bảo không bị ảnh hưởng bởi môi trường development.

```ruby
$ RAILS_ENV=production bundle exec rake db:create
$ RAILS_ENV=production bundle exec rake db:migrate
$ RAILS_ENV=production bundle exec rails console
2.2.0 :001 > Measure.run(gc: :disable) { Thing.all.load } 
{"2.2.0":{"gc":"enable","time":0.32,"gc_count":1,"memory":"33 MB"}}
=> nil
```

ActiveRecord sử dụng nhiều hơn 3.5 lần bộ nhớ so với kích thước dữ liệu. Nó cũng kích hoạt quá trình thu dọn rác trong quá trình tải dữ liệu.

ActiveRecord rất tiện dụng, nhưng sự tiện dụng mà ActiveRecord cung cấp yêu cầu một cái giá phải trả. Tôi sẽ không thuyết phục bạn tránh xa khỏi ActiveRecord, nhưng bạn cần hiểu hậu quả khi sử dụng nó. Trong 80% trường hợp, tốc độ khi phát triển đáng giá hơn là chi phí của tốc độ thực thi. Trong 20% trường hợp còn lại, bạn có các kết quả khác, như:

#### Chỉ tải các thuộc tính cần thiết 

Đầu tiên là chỉ tải dữ liệu bạn mong muốn dùng. Rails làm việc này rất dễ dàng 

```ruby
$ RAILS_ENV=production bundle exec rails console 
Loading production environment (Rails 4.1.4)
2.2.0 :001 > Measure.run { Thing.all.select([:id, :col1, :col5]).load } 
{"2.2.0":{"gc":"enable","time":0.21,"gc_count":1,"memory":"7 MB"}}
=> nil
```

Bằng cách này chỉ sử dụng ít hơn bộ nhớ 5 lần và chạy nhanh hơn 1.5 lần so với `Thing.all.load`. Càng nhiều cột bạn dùng, thì càng thêm lựa chọn trong query, đặc biệt nếu sử dụng join table.

#### Preloading 

Cách thực hành khác là tải trước. Mỗi khi bạn query bằng quan hệ has_many hay belongs_to, hãy thực hiện tải trước.

VD, để thêm quan hệ has_many trong model Thing. Chúng ta sẽ cần cài đặt migration và ActiveRecord model.

```ruby
class Minions < ActiveRecord::Migration 
  def up
    create_table :minions do |t| 
       t.references :thing 
       10.times do |i|
         t.string "mcol#{i}" 
       end
     end
  execute <<-END
  insert into minions(thing_id,
            select things.id,
            rpad('x', 100, 'x'), rpad('x', 100, 'x'), rpad('x', 100, 'x'),
            rpad('x', 100, 'x'), rpad('x', 100, 'x'), rpad('x', 100, 'x'),
            rpad('x', 100, 'x'), rpad('x', 100, 'x'), rpad('x', 100, 'x'),
            rpad('x', 100, 'x')
         from things, generate_series(1, 10)
      );
    END
  end
  def down
    drop_table :minions
  end 
end            

# Minion model 
class Minion < ActiveRecord::Base 
  belongs_to :thing
end

# Thing model 
class Thing < ActiveRecord::Base 
  has_many :minions
end
```

chạy migration với lệnh RAILS_ENV=production bundle exec rake db:migrate

Chạy lặp dữ liệu mà không thực hiện tải trước thì không là ý kiến hay.

```ruby
$ RAILS_ENV=production bundle exec rails console 
Loading production environment (Rails 4.1.4)
2.2.0 :001 > Measure.run { Thing.all.each { |thing| thing.minions.load } } 
{"2.2.0":{"gc":"enable","time":272.93,"gc_count":16,"memory":"478 MB"}}
=> nil
```

câu lệnh trên không chỉ tải mọi thứ vào bộ nhớ mà còn thực hiện 10,000 query vào database để lấy dữ liệu minion.

Khi sử dụng Preload 

```ruby
$ RAILS_ENV=production bundle exec rails console 
Loading production environment (Rails 4.1.4)
2.2.0 :001 > Measure.run { Thing.all.includes(:minions).load } 
{"2.2.0":{"gc":"enable","time":11.59,"gc_count":19,"memory":"518 MB"}}
=> nil
```

Code đã chạy nhanh hơn 25 lần, khi chỉ cần phải thực hiện 2 câu query vào database, một là tải things, hai là tải minion.

#### Kết hợp các thuộc tính đang tải và tải trước 

Sẽ là tốt hơn nếu kết hợp cách trên với việc chỉ chọn các cột cần dùng. Nhưng có 1 lỗi , đó là Rails không có cách hiệu quả để chọn một tập các cột từ các model phụ thuộc. VD sau sẽ dẫn đến lỗi:

```ruby
Thing.all.includes(:minions).select("col1", "minions.mcol4").load
```

Nó lỗi bởi vì hàm includes(:minions) chạy thêm một query để lấy dữ liệu minion cho thing được chọn. Và rails không đủ thông minh để biết được các cột được chọn là thuộc về bảng Minions. 

Nếu chúng ta query từ phía quan hệ belongs_to, chúng ta cần sử dụng joins:

```ruby
Minion.where(id: 1).joins(:thing).select("things.col1", "minions.mcol4")
```

Từ phía has_many, join sẽ trả ra kết quả trùng lặp các đối tượng Thing giống nhau, trong trường hợp này là 10 object. Để khắc phục điểm này, chúng ta có thể sử dụng tính năng của PostgreSQL là `array_agg` sẽ tạo một mảng các cột từ bảng được join.

```ruby
$ RAILS_ENV=production bundle exec rails console 
Loading production environment (Rails 4.1.4)
2.2.0 :001 > query = "select id, col1, array_agg(mcol4) from things
2.2.0 :002">     inner join
2.2.0 :003">     (select thing_id, mcol4 from minions) minions on (things.id = minions.thing_id)
2.2.0 :004">     on (things.id = minions.thing_id)
2.2.0 :005">     group by id, col1"
 => "select id, col1, array_agg(mcol4) from things
     inner join
(select thing_id, mcol4 from minions) minions on (things.id = minions.thing_id)
group by id, col1"
2.2.0 :006 > Measure.run { Thing.find_by_sql(query) } 
{"2.2.0":{"gc":"enable","time":0.62,"gc_count":1,"memory":"8 MB"}}
=> nil
```

Khi đó, ta thấy bộ nhớ sử dụng là 8MB thay vì 518MB khi trả về tất cả các cột với preload. Và tốc độ thực thi nhanh hơn 20 lần.

Giới hạn số cột bạn query sẽ giúp giảm bớt thời gian thực thi và hàng trăm MB bộ nhớ.

#### Sử dụng các mẫu Each! trong Rails với find_each và find_in_batches

Rất tốn kém khi cần phải khởi tạo nhiều model ActiveRecord. Lập trình viên Rails cần biết điều này và cần thêm các hàm để duyệt trong tập dữ liệu lớn theo các khối - batch. Cả `find_each` và `find_in_batches` sẽ tải mặc định 1,000 đối tượng và trả lại cho bạn. Bạn có thể giảm bớt hay tăng lên kích thước của khối với tuỳ chọn `batch_size`.

find_each và find_in_batches sẽ vẫn phải tải tất cả đối tượng vào bộ nhớ. Vậy liệu chúng có cải thiện hiệu năng không? vẫn có, tương tự như khi sử dụng Each!. Ngay khi bạn hoàn thành với batch, GC sẽ thu dọn nó.

```ruby
$ RAILS_ENV=production bundle exec rails console 
Loading production environment (Rails 4.1.4)
2.2.0:001 > ObjectSpace.each_object(Thing).count
=> 0
2.2.0:002 > Thing.find_in_batches { |batch|
2.2.0:003?>   GC.start
2.2.0:004?>   puts ObjectSpace.each_object(Thing).count
2.2.0:005?>}
1000 
2000 
... 
2000 
2000

2.2.0 :006 > GC.start 
=> nil
2.2.0 :007 > ObjectSpace.each_object(Thing).count 
=> 0
```

Quả thật GC đã thu thập các đối tượng từ các batch trước đó, vì vậy sẽ không có nhiều hơn 2 batch trong bộ nhớ trong quá trình lặp. So sánh với cách lặp thông thường trong danh sách các đối tượng được trả về bởi Thing.all.

```ruby
$ RAILS_ENV=production bundle exec rails console 
Loading production environment (Rails 4.1.4)
2.2.0 :001 > ObjectSpace.each_object(Thing).count
=> 0
2.2.0 :002 > Thing.all.each_with_index { |thing, i|
2.2.0 :003?>  if i % 1000 == 0
2.2.0 :004?>    GC.start
2.2.0 :005?>    puts ObjectSpace.each_object(Thing).count
2.2.0 :006?>  end
2.2.0 :007?>  }; nil
10000
10000
...
10000
10000
=> nil
```

Chúng vẫn giữ lại 10,000 đối tượng trong toàn bộ thời gian chạy vòng lặp. Điều này làm tăng cả bộ nhớ sử dụng và thời gian GC. Nó cũng làm tăng nguy cơ tràn bộ nhớ nếu tập dữ liệu quá lớn. ( cần lưu ý là, ActiveRecord cần hơn 3.5 lần không gian để lưu trữ dữ liệu )

#### Sử dụng ActiveRecord không khởi tạo Model 

Nếu tất cả bạn cần là chỉ chạy một truy vấn database hay cập nhật một cột trong bảng, thì có thể xem xét sử dụng theo hướng các hàm ActiveRecord mà không cần tạo model.

- `ActiveRecord::Base.connection.execute("select * from things")`: hàm này thực hiện truy vấn và trả về kết quả chưa được xử lý 
- `ActiveRecord::Base.connection.select_values("select col5 from things")`: tương tự như trên nhưng trả về mảng các giá trị chỉ gồm cột đầu tiên trong kết quả truy vấn.
- `Thing.all.pluck(:col1, :col5)`: là một biến thể các 2 hàm trên, trả về một mảng các giá trị chưa hoặc toàn bộ row hay các cột mà bạn chỉ định trong tham số của pluck.
- `Thing.where("id < 10").update_all(col1: 'something')`: cập nhật các cột trong database.

Những hàm trên không chỉ tiết kiệm bộ nhớ mà cũng làm tăng tốc độ nhanh hơn bởi vì chúng vừa không khởi tạo model mà cũng không thực hiện các hàm lọc before hay after. Tất cả chúng làm là chạy câu query SQL thuần, trong một vài trường hợp thì sẽ trả lại các mảng trong kết quả.

### Làm cho ActionView nhanh hơn 

Sẽ không bất thường khi thực hiện render view lâu hơn nhiều sơ với code controller. Nhưng bạn đã nghĩ là bạn có thể tăng tốc nó không. Hầu hết các template chỉ là các lời gọi tập hợp bằng các hàm render trong helper mà không cần phải viết và không thể thực sự tối ưu hoá - ngoại trừ khi chúng được gọi trong vòng lặp.

Render là cơ bản một quá trình xử lý chuỗi. Như chúng ta đã biết, điều này sẽ cần sử dụng cả CPU và bộ nhớ. Mỗi khi bạn thực hiện duyệt một tập dữ liệu lớn trong một template, hãy xem bạn có thể tối ưu hoá nó như nào.

Quá trình render Rails template có các đặc tính hiệu năng tương tự như chạy lặp trong Ruby. Bạn có thể chỉ cần render các phần trong một vòng lặp. Có 2 lý do cho việc đó. Đầu tiên là render khá tốn kém. Nó tiêu tốn khá nhiều thời gian cho việc khởi tạo đối tượng view, tính toán bối cảnh thực thi và truyền các biến được yêu cầu. Vì vậy mỗi thành phần bạn render trong một vòng lặp nên nghi ngờ là làm cho hiệu năng tệ hơn. Thứ hai là đa số các hàm helper trong Rails view là các hàm chạy lặp không an toàn. Một lời gọi link_to sẽ không làm chậm đi nhưng hàng nghìn thì có thể. 

Có 2 vấn đề hiệu năng tiềm tàng là:

#### Render các thành phần trong một vòng lặp

Khi bạn render một tập các đối tượng, code template của bạn sẽ tương tự như:

```ruby
<% objects.each do |object| %>
<%= render partial: 'object', locals: { object: object } %>
<% end %>
```

Không có gì đáng lo với đoạn code trên, ngoại trừ việc nó sẽ chậm hơn với một tập dữ liệu lớn. Vậy chậm như nào? Hãy đo 10,000 phần 

```ruby
| Rails 2.x | Rails 3.x | Rails 4.x |
| -------- | -------- | -------- |
| 0.335 ± 0.006     | 1.355 ± 0.033     | 1.840 ± 0.045     |
```

Mặc dù 10,000 đối tượng không là một tập dữ liệu lớn, chỉ mất khoảng 2 giây với các phiên bản Rails gần đây. Nhưng nó thật khó chịu.

Rails 3.0 và cao hơn đã có một giải pháp cho vấn đề này là gọi render `collection`:

```ruby
<%= render :partial => 'object', :collection => @objects %>
```

hay ngắn hơn 

```ruby
<%= render @objects %>
```

kết quả là chạy nhanh hơn 20 lần 

```ruby
| Rails 3.x | Rails 4.x | 
| -------- | -------- | 
| 0.066 ± 0.001     | 0.100 ± 0.005     | 
```

Nguyên nhân làm cho việc render một tập hợp nhanh hơn là vì nó khởi tạo template chỉ một lần duy nhất. Sau đó nó tái sử dụng template đó để render tất cả các đối tượng từ collection đó. Render 10,000 phần trong một vòng lặp sẽ lặp lại việc khởi tạo 10,000 lần.

Vậy việc khởi tạo template bao lâu? ta có bảng thống kê:

```ruby
| -------- | -------- |
| Operation | Percent of total execution time |
| -------- | -------- |
| Logging     | 45%     |
| -------- | -------- |
| Finding and reading the template (from disk or cache) | 21% |
| -------- | -------- |
| Setting up execution context (local variables, etc.)     | 9%     |
| -------- | -------- |
| Template class instantiation     | 5%     |
| -------- | -------- |
| Rendering     | 5%     |
| -------- | -------- |
| Other work     | 15%     |
| -------- | -------- |
```

Từ trên ta thấy việc render thực tế chỉ mất 5% thời gian. 

Tại sao lại mất 45% thời gian cho việc logging. Nó liên quan tới cài đặt mặc định trong production rails là `config.log_level = :info` thực hiện quá nhiều output.

```ruby
INFO --: Started GET "/test" for 127.0.0.1 at 2014-08-13 10:21:40 -0500
INFO --: Processing by TestController#index as HTML
INFO --: Rendered test/_object.html.erb (0.1ms)
«9998 more object.html.erb partial rendering notifications»
INFO --: Rendering test/_object.html.erb (0.0ms)
INFO --: Rendering test/_dummy.html.erb (1904.0ms)
INFO --: Rendering test/index.html.erb within layouts/application (1945.4ms)
INFO --: Completed 200 OK in 1952ms (Views: 1948.6ms | ActiveRecord: 0.0ms)
```

Bạn cũng sẽ không muốn hiện thêm `config.log_level = :warn` khi việc này cũng làm tăng gấp đôi thời gian 

```ruby
| config.log_level = :info | config.log_level = :warn | 
| -------- | -------- | -------- |
| 1.840 ± 0.045     | 0.830 ± 0.049     | 
```

Nó vẫn sẽ không nhanh bằng render collection (0.1s). Vậy còn 0.7 giây đã đi đâu? Nó tiêu tốn cho việc thực hiện logger với việc sử dụng Observer pattern. Render partial kích hoạt một sự kiện `render_partial.action_view`. Khi đó ActionSupport::LogSubscriber sẽ gửi thông báo và chạy Logger để thực hiện output log. Điều đó làm cho code mất khoảng 0.2 giây. Việc khởi tạo template và thực thi đánh giá bối cảnh sẽ bị tạm ngưng.

Render collection sẽ không làm như vậy, nó không xuất ra log. 

#### Tránh sử dụng các helper và các hàm vòng lặp không an toàn 

Tất cả các helper render là các vòng lặp không an toàn. Chúng sẽ làm mất thời gian và bộ nhớ, vì vậy hãy cẩn thận khi sử dụng chúng trong vòng lặp, đặc biệt là với link_to, url_for và img_tag.

Hiệu năng của các helper phụ thuộc vào nhiều yếu tố. VD, link_to và url_for sẽ trở nên chậm hơn khi độ phức tạp của route tăng dần. Và img_tag chậm đi khi bạn thêm nhiều asset.