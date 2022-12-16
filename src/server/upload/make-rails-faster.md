Chúng ta hãy tạo ra một bảng cơ sở dữ liệu với 10 cột và 10.000 hàng. ActiveRecord sử dụng bộ nhớ gấp 3,5 lần so với kích thước của dữ liệu. Nó cũng kích hoạt GC trong khi tải.
## Load Only the Attributes You Need
Tùy chọn đầu tiên của bạn là chỉ tải dữ liệu bạn định sử dụng. Rails làm cho điều này rất dễ làm, như thế này:
```
Thing.select([:id, :col1, :col5])
```
Điều này sử dụng bộ nhớ ít hơn 5 lần và chạy nhanh hơn 1,5 lần so với Thing.all. Càng có nhiều cột, bạn càng có ý nghĩa khi thêm select vào truy vấn, đặc biệt nếu bạn join các bảng.
## Preload Aggressively
Mỗi khi bạn truy vấn vào mối quan hệ has_many hoặc belongs_to, hãy sử dụng preload. Chúng ta sẽ tạo hai models: Thing và Minion sau đó tạo ra 10 Minions
```
class Minion < ActiveRecord::Base
    belongs_to :thing
end

class Thing < ActiveRecord::Base
    has_many :minions
end
```
Để lấy ra các minion của Thing: 
```
Thing.each { |thing| thing.minions }
```
Thời gian thực thi: "time":272.93, "memory":"478 MB"
Nó không chỉ cần tải mọi thứ vào bộ nhớ mà còn phải thực hiện 10.000 truy vấn đối với cơ sở dữ liệu để tìm các minion. Giải pháp là sử dụng preloading
```
Thing.includes(:minions)
```
Thời gian thực thi: "time":11.59 ,"memory":"518 MB". Sử dụng preloading nhanh hơn 25 lần vì Rails chỉ thực hiện hai truy vấn cơ sở dữ liệu Một để tải Thing và một truy vấn để tím Minion.
## find_each and find_in_batches
Cả find_each và find_in_batches sẽ tải theo mặc định 1.000 đối tượng. Bạn có thể yêu cầu các batch nhỏ hơn hoặc lớn hơn với tùy chọn: batch_size.
find_each và find_in_batches vẫn sẽ phải tải tất cả các đối tượng trong bộ nhớ. Vậy làm thế nào để họ cải thiện hiệu suất? . Sau khi bạn thực hiện với batch, GC có thể thu thập nó. Hãy để xem cách làm việc đó.
GC thực sự thu thập các đối tượng từ các batch trước, vì vậy không quá hai batch trong bộ nhớ trong quá trình lặp.
## Use ActiveRecord without Instantiating Models
```
Thing.where("id < 10").update_all(col1: 'something')
```
Điều này không chỉ giúp bạn tiết kiệm bộ nhớ mà còn chạy nhanh hơn vì chúng không khởi tạo model cũng như thực thi các bộ lọc. Tất cả những gì cần làm là chạy các truy vấn SQL đơn giản.
```
Thing.all.pluck :col1, :col5
```
 Trả về một mảng các giá trị chứa toàn bộ hàng hoặc các cột bạn đã chỉ định.
##  Make ActionView Faster
Render view mất nhiều thời gian hơn. Nhưng bạn có thể nghĩ rằng bạn có thể làm được nhiều thứ để tăng tốc nó.
## Render Partials in a Loop Faster
```
<% objects.each do |object| %>
<%= render partial: 'object', locals: { object: object } %>
<% end %>
```
Render trong vòng lặp làm cho nó trở nên chậm trên một bộ sưu tập lớn các đối tượng. Làm thế nào chậm? Tôi đã đo render 10.000 partial trong các phiên bản Rails khác nhau và kết quả :
![](https://images.viblo.asia/2e633383-09ea-4a8e-8e3d-24a77e9eeb6d.png)

Điều đáng lo ngại nữa là việc render cũng trở nên tồi tệ hơn với mỗi version Rails tiếp theo. Rails 3.0 trở đi có một giải pháp cho vấn đề này được gọi là render collection:
```
<%= render :partial => 'object', :collection => @objects %>
```
Or
```
<%= render @objects %>
```
![](https://images.viblo.asia/9a3b952a-51d4-469e-9c68-75d1a1fa1288.png)

Thời gian đã giảm 20 lần. Lý do khiến collection nhanh hơn là vì nó chỉ khởi tạo template một lần. Sau đó, nó sử dụng lại cùng một khuôn mẫu để render tất cả các đối tượng từ bộ sưu tập. Kết xuất 10.000 partials trong một vòng lặp sẽ phải lặp lại 10.000 lần khởi động ban đầu. Bao nhiêu công việc để khởi tạo template ? Tôi đã mô tả render 10.000 partials trong Rails 4 để minh họa điều đó. Hãy nhìn vào bản tóm tắt.
![](https://images.viblo.asia/59c4299f-d079-473c-8496-43bf9fd22094.png)

Render thực tế chỉ mất 5% thời gian. Hãy để xem tại sao việc logger chiếm 45% thời gian. Nó chỉ ra rằng với config.log_level =: info tạo ra quá nhiều output.
![](https://images.viblo.asia/a61a5d72-61b1-4fa4-a34e-2bc3f20dde59.png)

Hy vọng một vài chia sẻ trên có thể giúp mọi người trong quá trình cải thiện performance.
Happy coding!