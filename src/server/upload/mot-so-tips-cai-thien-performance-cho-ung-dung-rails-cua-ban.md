Ruby và Rails không nổi tiếng về mặt hiệu suất. Rails cũng không phải là web framework nhanh nhất nên đôi khi bạn cần phải tự thân vận động, tự tìm cách cải thiện hiệu suất để trang ứng dụng của bạn có hiệu suất tốt nhất có thể. Bài viết hôm nay mình xin giới thiệu một số tips để cải thiện tốc độ cho ứng dụng Rails.

### Sử dụng New Relic

Để tối ưu được server, hẳn các bạn sẽ cần đến những con số để đo lường. [New Relic](https://newrelic.com/) cho phép chúng ta có thể đo được các số liệu như thời gian tải trang trung bình, bao nhiêu request được gửi tới database. Tuy nhiên có nhược điểm là bạn sẽ phải trả phí cho việc này

### Sử dụng rack-mini-profiler

[Rack-mini-profiler](https://github.com/MiniProfiler/rack-mini-profiler) cũng là một thư viện mã nguồn mở tuyệt vời giúp bạn đo đạc thống kê thời gian của những request. 
    
Cài đặt gem này, mỗi lần tải trang bạn có thể xem được tổng thời gian tải trang, trong đó có chi tiết bao nhiêu câu query, thời gian cho từng câu query, thời gian render view.

### Luật 80/20

Hay còn được gọi là [nguyên tắc Pareto](https://en.wikipedia.org/wiki/Pareto_principle). Nói một cách đơn giản, 80% kết quả đến từ 20% nguyên nhân. Điều muốn nói ở đây là bạn không nên dành thời gian cho những việc tiểu tiết mà nên tập trung khắc phục những vấn đề lớn hơn. Ví dụ như bạn không nên bỏ công sức để cải thiện câu query giảm xuống vài mili giây trong khi vấn đề thực sự nằm ở đoạn render view

### Sử dụng background job

Những công việc tốn thời gian và không yêu cầu trả về ngay lập tức hãy đưa chúng xuống background job. Ví dụ như việc send email, gọi và gửi request từ service thứ ba, ....

### Loại bỏ n+1 query

Đây có lẽ là vấn đề quá kinh điển rồi. Active Record giúp chúng ta giao tiếp với database nhưng cũng vô tình làm cho chúng ta không để ý đến việc nó query như thế nào. Hãy cố gắng xem log sau mỗi request, hoặc cài đặt [gem Bullet](https://github.com/flyerhzm/bullet) nó sẽ warning bạn mỗi khi có vấn đề với việc truy vấn dữ liệu

### Đánh index cho database

Việc đánh index khá là cần thiết và quan trọng, nó sẽ giúp bạn cải thiện đáng kế tốc độ truy xuất dữ liệu. Tuy nhiên cũng không thể đánh index bừa bãi được, cài đặt [gem lol_dba](https://github.com/plentz/lol_dba) sẽ gợi ý cho bạn những column nào nên đánh index

### Học SQL

Bắt đầu với Rails, bạn không cần biết SQL, như đã đề cập ở trên Active Record đã làm cho cúng ta tất cả, tuy nhiên bạn cần phải biết Active Record nó đang làm cái quái gì, từ đó bạn mới có thể tìm được giải pháp tối ưu hơn.

### Sử dụng phân trang

Bạn có 1000 hoặc thậm chí là 1 triệu record, chỉ 1 câu query đơn giản bạn có thể có được trong tay những gì bạn mong muốn. Tuy nhiên hay tưởng tượng rằng, bạn phải join những record đó với table khác, hoặc dễ hiểu hơn là render đống dữ liệu đó ra view sẽ tốn bao nhiêu thời gian. Lúc này hãy nghĩ đến giải pháp phân trang, có lẽ việc này cũng khá quen thuộc rồi, nếu bạn ngại xử lý bằng tay hãy cài gem hỗ trợ như [pagy](https://github.com/ddnexus/pagy) hay [kaminari](https://github.com/kaminari/kaminari)

### Không insert dữ liệu lớn bằng Active Record

Giả sử bạn có một số lượng dữ liệu rất lớn đến từ một nguồn nào đó (chẳng hạn file CSV, data call API từ third party service, ...) muốn insert vào DB. Bạn lặp qua đống record đó và insert vào DB bằng Active Record, ứng dụng của bạn sẽ tốn khá nhiều thời gian và ngốn khá nhiều RAM. Thay vào đó, hãy sử dụng [activerecord-import](https://github.com/zdennis/activerecord-import), nó sẽ giúp bạn insert một số lượng lớn dữ liệu chỉ với 1 câu query, giúp cải thiện tốc độ rất nhiều

### Sử dụng bộ nhớ cache

Cách tốt nhất để code chạy nhanh hơn là không thực thi nó (chính xác là không phải lúc nào cũng thực thi nó :v). Giả sử có một đoạn code thực thi để lấy data và bạn sử dụng data đó ở nhiều nơi, thay vì gọi lại đoạn code thực thi đó, bạn có thể cache lại data đó và sử dụng ở những nơi bạn mong muốn mà không cần thực thi những câu lệnh phức tạp.

Tùy vào trường hợp cụ thể bạn có thể lựa chọn cách để cache dữ liệu. Chẳng hạn, dữ liệu chỉ sử dụng trong 1 class bạn có thể cache nó trong một biến instance. Với những dữ liệu đặc thù, sử dụng bất cứ lúc nào, bất cứ nơi đâu và ít bị thay đổi hãy sử dụng [Redis](https://guides.rubyonrails.org/caching_with_rails.html#activesupport-cache-rediscachestore)

### Không sử dụng render với vòng lặp

Bạn có một mảng data cùng cấu trúc và muốn hiển thị nó ra view, ví dụ là 1 list `@users`, bạn có 1 partial `_user` để hiển thị từng user trong mảng đó.

Thay vì sử dụng vòng lặp

```ruby
@users.each do |user|
  <%= render "user", user: user %>
end
```

lúc này Rails sẽ render template của bạn `@users.size` lần, cảm giác khá là nặng nề. Thay vào đó hãy sử dụng colection render

```ruby
<%= render partial: "user", collection: @users %>
```

nó sẽ nhanh hơn rất nhiều vì rails chỉ khởi tạo template 1 lần.

### Sử dụng find_each

Nếu bạn muốn lặp qua một khối lượng dữ liệu lớn thì bạn không thể tải tất cả dữ liệu vào bộ nhớ cùng một lúc để `find`. Hãy sử dung `ActiveRecord#find_each` thay cho `all` để tải hàng loạt, mặc định rails sẽ load 1000 records mỗi lần

### Kết

Bài viết của mình chỉ giới thiệu một số tips một cách ngắn gọn, để cài đặt và sử dụng một số thư viện mình đã giới thiệu, các bạn có thể tìm kiếm trong Viblo hoặc Google. 

Hi vọng có thể giúp bạn cải thiện được phần nào performance của hệ thống

Thank for your reading!

Bài viết tham khảo từ https://www.mskog.com/posts/42-performance-tips-for-ruby-on-rails