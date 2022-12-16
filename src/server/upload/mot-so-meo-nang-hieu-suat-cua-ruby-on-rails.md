# 1. Loại bỏ N+1 query
N+1 query là một vấn đề kinh điển trong xử lý database. Trong các vòng lặp như each, map,... số lượng query bị lặp thừa ra là vô cùng nhiều nếu không được xử lý. Để loại bỏ N+1 có thể dùng nhiều phương pháp và cơ bản cũng như rất hiệu quả là sử dụng ```includes```.

 ```ruby 
 user = User.includes(:comments)
 ```
Gem Bullet có thể tự động tìm ra những vấn đề này và config vào hệ thống giúp bạn nhận được thông báo mỗi khi load lại hệ thống xảy ra N+1 query.
# 2. Đánh index cho database
Gem ```rack-mini-profiler``` có thể loại bỏ các truy vấn chậm và rất nhiều thời gian xảy ra do index bị thiếu hoặc không tối ưu. Để dễ dàng tìm thấy index nào bị thiếu, có thể sử dụng gem ```lol_dba```. Gem này sẽ tìm thấy bất kỳ trường hợp đơn giản nào khi thiếu index.
 
# 3. Phân trang
Nếu truy vấn chậm thì phân trang có thể là một vấn đề lớn, đặc biệt nếu đang ```group``` trong truy vấn. Có thể nhận được kết quả tốt bằng cách sửa đổi cách phân trang được thực hiện bằng cách không including một row count. 

Nếu phân trang không phải thực hiện ```count``` để tìm tổng số row thì thường sẽ cải thiện hiệu suất đáng kể. Sử dụng 1 số gem hỗ trợ phân trang để tăng tốc tối ưu hơn cho phần này như là gem Pagy, Kiminari.

# 4. Eager hoặc preloaded cho query
Khi sử dụng ```includes``` để cải thiện hiệu suất của các relation trong ActiveRecord là một cách tốt và phổ biến. Tuy nhiên, ```includes``` sẽ có ít nhất một truy vấn thêm. Tránh điều này bằng cách sử dụng ```eager_load``` hoặc ```preload``` sẽ tạo một truy vấn duy nhất thay thế. Tuy nhiên, không phải lúc nào cũng nhanh hơn và có thể dẫn đến việc tốn bộ nhớ đáng kể. 

Nếu sử dụng ```includes``` không có đi kèm câu điều kiện sau đó thì cách hoạt động sẽ giống như ```preload```.

Khi ```includes``` đi cùng với ```reference``` thì query sẽ giống với ```eager_load```.

# 5. Sử dụng cache thích hợp
Cách tốt nhất để làm cho code nhanh hơn là không chạy nó. Vì vậy, caching dữ liệu có ý nghĩa quan trọng trong bất kỳ ngôn ngữ nào, đặc biệt là Ruby.

Cache Store là nơi lưu trữ dữ liệu được lưu trong bộ nhớ cache trong ứng dụng Rails. Mặc định lưu trữ bộ đệm trong hệ thống tệp quá chậm để sử dụng. 

Sử dụng ActiveSupport :: Cache :: MemoryStore để lưu cache nhưng không được chia sẻ giữa các tiến trình và sẽ không tồn tại khi khởi động lại. Một ứng dụng Rails có thể sẽ có nhiều request service, ví dụ như sử dụng Puma trong clustered mode và có một bộ đệm không được chia sẻ giữa các tiến trình là khá tệ, nếu sử dụng Memcache hoặc Redis sẽ lưu cache tốt hơn.

Nếu chạy backgroud job với Sidekiq thì đã có sẵn server của Redis để sau đó có thể sử dụng nó làm bộ đệm. Redis có thể dễ dàng được fields up với dữ liệu bộ nhớ cache không còn chỗ cho các job của Sidekiq. Có thể giải quyết với Redis 4 bằng cách sử dụng policy ```volatile-lfu```.

# 6. Sử dụng gem fast JSON 
Nếu có API và sử dụng gem ```ActiveModelSerializers``` thì nên dùng thêm gem ```fast_jsonapi``` từ Netflix. Gem này có hiệu suất tốt hơn nhiều. Cũng có thể dùng gem ```oj``` để lấy các JSON thông thường. Điều này có thể tạo ra sự khác biệt lớn cho một lượng lớn dữ liệu JSON.

# 7. Dùng find_each thay cho find
Nếu muốn lặp qua một khối dữ liệu lớn thì không cần phải tải tất cả dữ liệu vào bộ nhớ cùng một lúc. Đơn giản chỉ cần sử dụng phương thức ```ActiveRecord # find_each``` thay vì load hàng loạt bằng ```all```. 

# 8. Không render vòng lặp trong view
Nếu có một vòng lặp trong view, ví dụ để hiển thị một phần cho mỗi mục thì có thể rất tốn kém tài nguyên. Thay vào đó, hãy sử dụng

```<%= render partial: 'item', collection: @item, as: :item %>```.

Điều này nhanh hơn rất nhiều vì trong trường hợp đó, Rails sẽ chỉ khởi tạo mẫu một lần thay vì một lần cho mỗi mục nếu được hiển thị bằng một vòng lặp.

# 9. Render parial không đồng bộ
View trong Rails có thể chiếm khá nhiều thời gian request. Nếu có các phần của trang web chậm hiển thị thì có thể thử load các phần đó một cách không đồng bộ.  Điều này có nghĩa là server sẽ load các partial bằng ajax, có thể tìm hiểu và sử dụng gem ```render_async gem``` để xử lý khi render partial không đồng bộ.

# 10. Raw caching
Một cách khác để cache mọi thứ là sử dụng phương thức ```Rails.cache.fetch``` 

```ruby
Rails.cache.fetch('my_cache_key', expires_in: 1.hour) do
  SomeApi.fetch_posts
end
```

Khi chạy code này với cùng cache key, Rails sẽ fetch kết quả của block từ cache. Điều này có thể được sử dụng ở bất cứ đâu trong ứng dụng Rails và đó là một cách tốt để lưu trữ các API bên ngoài và các công cụ data fetching khác.

**Cảm ơn các bạn đã theo dõi đến đây!!! Xin chào và hẹn gặp lại ^^!**

Link tham khảo: https://dev.to/mskog/42-performance-tips-for-ruby-on-rails-4aik