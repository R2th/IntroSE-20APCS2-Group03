Đối với mỗi lập trình viên web, đặc biệt là back-end developer thì chắc hẳn chúng ta sẽ phải đối mặt với nhứng vấn đề lớn thường gặp phải đó là: Search, Cache và Load Balancing. Bài viết sẽ giới thiệu 1 vài điều cơ bản về Application Cache, Cache Store và trường hợp sử dụng tổng quát của từng loại. <br>
# Rails Caching Overview
Nếu như chưa có chút khái niệm nào về Rails Caching, hãy thử đọc qua bài viết [ Caching with Rails: An Overview](http://guides.rubyonrails.org/caching_with_rails.html) nhé. Đây là bài viết khá ngắn gọn nhưng sẽ cho ta cái nhìn tổng quan về Rails Caching. <br>
# Benefits of Caching
Tại sao chúng ta cần dùng cache? Câu trả lời rất đơn giản, đó là Tốc độ. <br>
Ruby là một ngôn ngữ có tốc độ khá chậm (so với mặt bằng chung của các ngôn ngữ khác như C, Java, Go, ..). Giải pháp đặt ra đó là: Chúng ta cần thực hiện ít nhất có thể các xử lý Ruby trong mỗi request. Cách đơn giản nhất đó là Caching. Chỉ cần thực hiện công việc 1 lần, cache lại kết quả, trả về kết quả cache này cho các request lần sau. <br>
Phần lớn người dùng cảm thấy thoải mái với ngưỡng < 1s (Không phải response time 1s, mà là 1s kể từ lúc user click hoặc interacte đến lúc DOM được vẽ xong).  Hãy thử cùng phân tích xem trong 1s kia, chúng ta cần phải thực hiện những gì? <br>

- 50ms cho việc chạy ngầm của network.
- 150ms cho loading JS and CSS resources. (dùng để vẽ khung của trang web)
- Ít nhất 250ms cho việc thực hiện code JS mà chúng ta vừa download. (Khoảng thời gian này có thể lớn hơn nếu như code JS của ta có nhiều function cần thực hiện ngay lúc load DOM). <br>
Như vậy, chúng ta chỉ còn ~500ms. Vậy để đạt được mốc 1s, thời gian phản hồi của server nên nằm trong khoảng 200 - 300ms. Đây cũng là mức mà trang Google Speed Insight gợi ý. 300ms cho mỗi request, chúng ta vẫn có thể thực hiện được mà không cần dùng Rails caching. Đặc biệt, nếu ta chú ý tối ưu các câu queries SQL/ sử dụng ActiveRecord 1 cách thuần thục, có thể thời gian phản hồi của server còn nhỏ hơn. Tuy nhiên, dùng caching sẽ đơn giản, dễ dàng hơn rất nhiều. Nhưng, chúng ta cần phải Cache cái gì? <br>
# What need to be cached?
Thay vì việc lần mò xem trong app của mình có chỗ nào hiệu năng chưa tốt, chỗ nào cần query nhiều, .. chúng ta có thể dùng tool để detect phần nào của web đang bị chậm. Ta có thể dùng gem rack-mini-profiler. Gem này sẽ giúp ta xác định thời gian server xử lý từng công việc một, làm thế nào để có thể in ra được 1 trang web. Nếu không muốn dùng gem, ta cũng có thể theo dõi bằng log của Rails. <br>
![](https://images.viblo.asia/af9f3cfb-80f6-4c69-a8d9-4a54687b0010.PNG)
Như trong hình trên, chúng ta thấy Rails show ra
```
    Completed 200 OK in 110ms (Views: 65.6ms | ActiveRecord: 19.7ms)
```
Tổng thời gian in ra view + thời gian query là 110ms. Có 2 điểm đáng lưu ý là: <br>
- ActiveRecord::Relations lazily loads data. Giả sử trong controller, ta để đoạn code @users = User.all và không xử lý gì với biến @users này. Trong views, khi  show ra thông tin của từng user: @users.each do ..., lúc này thì @users mới bắt đầu được query vào DB để lấy dữ liệu. và thời gian query này sẽ được tính vào tổng thời gian của Views.
- Thời gian được tổng hợp ở ActiveRecord không phải là tổng thời gian execute code Ruby trong ActiveRecord (build queries, executing query, turning query results into ActiveRecord objects), nó chỉ bao gồm thời gian query trong DB <br>
NOTE: Khi test Rails app performance, hãy tạo 1 môi trường mà có RAILS_ENV=production. Việc chạy trên production mode sẽ giúp kiểm chứng về mặt tốc độ dưới con mắt của end users, đồng thời disable việc reload code và compile assets. Cách tốt nhất là ta hãy dùng Docker, build 1 môi trường giống như trên production để trải nghiệm. <br>
# Caching techniques
## 1. Key-based cache expiration
Phần phức tạp nhất của cache là biết khi nào expire caches. Ý tưởng là: Lưu trữ thông tin dưới dạng Hash, trong đó cache key chứa thông tin về giá trị được cached. Khi 1 object thay đổi, cache key cho object đó cũng sẽ bị thay đổi => cache cũ đã bị expired. <br>
Trong ActiveRecord, bất cứ khi nào chúng ta thay đổi 1 attribute và save vào DB, updated_at attribute cũng thay đổi. Nên chúng ta có thể sử dụng updated_at trong cache keys khi chúng ta caching ActiveRecord object. Đó chính là cách mà Rails đã thực hiện:
``` ruby
    <% todo  = Todo.first %>
    <% cache(todo) do %>
      ... a whole lot of work here ...
    <% end  %>
```
Khi chúng ta viết như trên, Rails sẽ tạo ra 1 cache key có dạng: `views/todos/123-20170806214154/7a1156131a6928cb0026877f8b749ac9` <br>
trong đó: todos là class của object được cache. 123 là id của object, 20170806214154 là updated_at attribute của object. Và phần còn lại được gọi là template tree digest. Đây là một đoạn mã hash md5, là tên của file chứa đoạn thông tin vừa được cache. <br>
Khi ta thay đổi bất cứ thứ gì trong cache key thì sẽ expires the cache: <br>
- Class của object thay đổi.
- Object id thay đổi.
- Trường updated_at của object thay đổi.
- Template thay đổi. (file cache bị thay đổi nội dung/ …) <br>

Có thể nhận ra rằng, technique này không thực sự expire các cache keys, nó chỉ không sử dụng tới các cache cũ. <br>
Ngoài ra, cũng có thể truyền 1 mảng vào trong cache. Cache key sẽ dựa trên version của các phần tử trong array đó. Ví dụ như: <br>
``` ruby
    <% todo  = Todo.first %>
    <% cache([current_user, todo]) do %>
      ... a whole lot of work here ...
    <% end  %>
```
Bất cứ khi nào current_user được update hoặc todo thay đổi, cache key sẽ bị expire và thay thế.
Vậy khi nào thì những đoạn cache kia sẽ bị xoá? Rails có cũng cấp thêm 1 vài option khi config cache_store. Có thể xem ở [đây](http://guides.rubyonrails.org/v4.1/caching_with_rails.html#activesupport-cache-store). Trong đó có set expires_in. Sau thời gian expires_in được cung cấp, cache entries sẽ được tự động remove đi <br>
## 2. Russian Doll Caching
Russian Doll - Búp bê Nga là loại búp bê mà 1 con búp bê sẽ chứa 1 con nhỏ hơn ở bên trong. Russian doll caching cũng giống như vậy. Chúng ta sẽ stack các đoạn cache fragments bên trong 1 đoạn cache khác. Ví dụ như chúng ta có đoạn in ra list các Todo như sau:
``` ruby
    <% cache('todo_list')  do %>
      <ul>
        <% @todos.each  do |todo| %>
          <% cache(todo) do %>
            <li class="todo"><%= todo.description %></li>
          <% end  %>
        <% end %>
      </ul>
    <% end %>
```
Nhìn đoạn code trên thì có vẻ khá ổn. Tuy nhiên, nó sẽ có vấn đề nếu như chúng ta thay đổi description của 1 todo có sẵn. Ví dụ từ “description 1” thành “description 2”. Khi ta reload lại page, todo list vẫn hiển thị “description 1” vì: mặc dù đoạn cache bên trong đã bị thay đổi nhưng đoạn cache ngoài (đoạn cache todo list) thì không. Nếu chúng ta muốn tái sử dụng đoạn cache fragment bên trong, chúng ta cũng sẽ phải renew đoạn code bên ngoài nếu đoạn code bên trong thay đổi. <br>
Russian doll caching vẫn sử dụng key-based cache expiration để giải quyết vấn đề này. Mục đích cần làm là: Khi đoạn cache bên trong bị hết hạn, chúng ta sẽ expire đoạn code bên ngoài. Còn nếu như đoạn code bên ngoài bị expire, chúng ta KHÔNG muốn đoạn code bên trong bị expire.
``` ruby
    <% cache(["todo_list",  @todos.map(&:id), @todos.maximum(:updated_at)]) do %>
      <ul>
        <% @todos.each  do |todo| %>
          <% cache(todo) do %>
            <li class="todo"><%= todo.description %></li>
          <% end  %>
        <% end %>
      </ul>
    <% end %>
```
Bây giờ. Nếu bất cứ 1 @todo nào thay đổi, @todos.maximum(:updated_all) sẽ thay đổi. Hoặc nếu có 1 Todo bị xoá hoặc thêm vào @todos, đoạn @todos.map(&:id) cũng sẽ thay đổi => đoạn code bên ngoài bị expire. Tuy nhiên, bất cứ todo items nào bên trong không thay đổi, chúng ta vẫn có thể tái sử dụng. Rails có cung cấp cho ta 1 option khác, đó là sử dụng touch option trong ActiveRecord associations. Khi 1 object gọi hàm touch(), no sẽ update trường updated_at trong DB. <br>
``` ruby
    class Corporation < ActiveRecord::Base
      has_many :cars
    end

    class Car < ActiveRecord::Base
      belongs_to :corporation, touch: true
    end

    class Brake < ActiveRecord::Base
      belongs_to :car, touch: true
    end

    @brake = Brake.first

    # calls the touch method on @brake, @brake.car, and @brake.car.corporation.
    # @brake.updated_at, @brake.car.updated_at and @brake.car.corporation.updated_at
    # will all be equal.
    @brake.touch

    # changes updated_at on @brake and saves as usual.
    # @brake.car and @brake.car.corporation get "touch"ed just like above.
    @brake.save

    @brake.car.touch # @brake is not touched. @brake.car.corporation is touched.
```
Chúng ta có thể sử dụng behavior này kết hợp với Russian Doll caches:
``` ruby
    <% cache  @brake.car.corporation %>
      Corporation: <%= @brake.car.corporation.name %>
      <% cache  @brake.car %>
        Car: <%= @brake.car.name %>
        <% cache  @brake %>
          Brake system: <%= @brake.name %>
        <% end  %>
      <% end %>
    <% end  %>
```
Với đoạn code này, kết hợp cùng touch relationships config bên trên, mỗi khi @brake thay đổi, đoạn cache bên ngoài cũng sẽ bị expired (vì trường updated_at của car và corporation đã bị thay đổi). Tuy nhiên, nếu car và corporation thay đổi, đoạn cache cho brake bên trong sẽ vẫn có thể tái sử dụng. <br>
## Which cache backend should I use?
Rails developers có khá nhiều lựa chọn cho cache backend:
- ActiveSupport::FileStore Mặc định. Nếu ta chọn cache backend này, các đoạn cache sẽ được lưu trữ trong filesystem.
- ActiveSupport::MemoryStore Config này cho phép đặt các đoạn cache vào 1 thread-safe Hash và lưu trữ trên RAM.
- Memcache and dalli dalli là Memcache cache stores client khá phổ biến. Memcache được phát triển cho LiveJournal năm 2003 và được design cho web app.
- Redis and redis-store redis-store là một client phổ biến nếu ta sử dụng Redis để cache.
- LRURedux là 1 memory-based cache store. Khá giống với ActiveSupport::MemoryStore, nhưng nó được thiết kế trên cơ chế cải thiện hiệu năng bởi Sam Saffron, co-founder của Discourse.

### 1. ActiveSupport::FileStore
FileStore là default cache implementation cho Rails app. Nếu như ta không set config.cache_store trong file production.rb, nó sẽ mặc định sử dụng FileStore. FileStore thường lưu trữ caches trong folder tmp/cache. <br>
Hãy dùng FIleStore nếu ta có ít request load (1 hoặc 2 servers) và vẫn cần very large cache (>100MB). Ít nhất, không dùng nó trên Heroku. <br>
### 2. ActiveSupport::MemoryStore
MemoryStore cũng được Rails cung cấp sẵn. Thay vì lưu trữ cached value trong filesytem, MemoryStore lưu trữ chúng ở trên RAM, dưới dạng 1 big Hash. ActiveSupport::MemoryStore, cũng giống như các cache stores khác, là thread-safe. <br>
Nếu có 1 hoặc 2 servers, với ít workers, và lưu trữ cache data với dung lượng nhỏ (<20MB), MemoryStore sẽ khá phù hợp.
### 3. Memcache and dailli
Memcache là một external cache store được sử dụng + recommended nhiều nhất cho Rails apps. Memcache được phát triển cho LiveJournal vào năm 2003 và được sử dụng trên production cho các site như Wordpress.org, Wikipedia và Youtube. <br>
Nếu sử dụng nhiều hơn 2 hosts, ta nên sử dụng distributed cache store. Tuy nhiên, Redis cũng có thể là 1 lựa chọn tốt hơn <br>
### 4. Redis and redis-store
Redis, giống như Memcache, là 1 dạng lưu trữ dữ liệu trên memory, dưới dạng key-value. Nếu ta đang chạy nhiều hơn 2 servers hoặc processes, Redis là 1 sự lựa chọn tốt. <br>
### 5. LRURedux
Được phát triển bởi Sam Safron của Discourse, LRURedux là một bản nâng cấp, tối ưu của ActiveSupport::MemoryStore. Tuy nhiên, nó không còn cung cấp 1 ActiveSupport-compatible interface nữa nên khi có thể ta sẽ bị tắc khi sử dụng ở mức low-level trong app, nó không còn là default Rails cache store nữa. Ta có thể nghĩ tới việc sử dụng LRURedux khi app yêu cầu tốc độ cao. App có thể mở rộng, dữ liệu lớn,… <br>
# Kết luận
Như vậy bài viết đã tìm hiểu một cách tổng quan về Cache trong Rails, đồng thời có so sánh 1 số Cache Store, để có thể cân nhắc sử dụng của từng loại và sử dụng cho phù hợp với Rails app của mình. Hy vọng bài viết có thể giúp ích cho mọi người. See you! <br>
# Reference
https://www.speedshop.co/2015/07/15/the-complete-guide-to-rails-caching.html <br>
https://guides.rubyonrails.org/