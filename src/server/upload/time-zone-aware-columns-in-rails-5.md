Backend của Ứng dụng của chúng tôi đang chạy trên Rails 4.2 (Ruby 2.4.2) và chúng tôi đã sẵn sàng nâng cấp lên Rails 5. Tại Liefery, hàng tuần chúng tôi đều retro  và một người nào đó hầu như mỗi tuần đều đề cập đến việc họ muốn chúng tôi thực hiện nâng cấp. Thật không may, nó không dễ dàng như việc chỉ cần thay đổi phiên bản trong Gemfile. Service của Chúng tôi đã bị maintain trong một thời gian vì Gem không tương thích, vì vậy chúng tôi phải giữ cảnh giác và tiến hành nâng cấp từng Gem một mỗi khi có thể.
<br>
<br>
Để chuẩn bị tất cả các Gem theo thứ tự mất một thời gian, nhưng một khi chúng đã được tương thích với Rails 5, chúng tôi cuối cùng có thể bắt đầu việc nâng cấp! Sau khi hồi sửa đi sửa lại version Rails trong Gemfile, chúng tôi đã quyết định đến với phiên bản 5.0.6 và chúng tôi đã đẩy code của chúng tôi lên đến GitHub để xem Jenkins thế nào.
<br>
<br>
Jenkins đã không happy (vì nhiều lý do), nhưng một trong những lý do đặc biệt đáng sợ nhất đó là Deprecation warning (cảnh báo không sử dụng được nữa).
<br>
<br>
> DEPRECATION WARNING: Time columns will become time zone aware in Rails 5.1. This still causes `String`s to be parsed as if they were in `Time.zone`, and `Time`s to be converted to `Time.zone`.
> 
> To keep the old behavior, you must add the following to your initializer:
> 
>     config.active_record.time_zone_aware_types = [:datetime]
> 
> To silence this deprecation warning, add the following:
> 
>     config.active_record.time_zone_aware_types = [:datetime, :time]
<br>
<br>
Tôi không chắc chắn bạn như thế nào, nhưng không biết bao nhiêu lần tôi đọc cảnh báo deprecation dạng này, tôi không thể hiểu những gì nó đang cố gắng nói với tôi. Vì vậy, chúng ta hãy bỏ nó sang một bên và cố gắng tìm ra những gì đang xảy ra với một ví dụ. Vì chúng ta cần so sánh hành vi trong Rails 4 với hành vi trong Rails 5, hãy bắt đầu với một thứ mà chúng ta đã quen thuộc, Rails 4.

## Behaviour in Rails 4
Tại thời điểm viết bài này, tôi đang ở Berlin, và chúng tôi vẫn đang trong thời gian mùa hè (CEST), có nghĩa là ở múi giờ 2 giờ trước UTC.

Trong Ví dụ này, giả sử chúng ta có một Model cửa hàng (tôi sẽ gọi nó là "CornStore", cửa hàng bán ngô) và cửa hàng đó muốn việc bán hàng sẽ bắt đầu vào một ngày nhất định tại một thời điểm nhất định. Để làm được điều đó, chúng ta cần cột `datetime`. Cửa hàng cũng mở cửa hàng ngày lúc 9 giờ sáng, ngày không quan trọng ở đây, vì vậy, chúng tôi sẽ sử dụng cột `time`. Hãy thực hiện `migration` và xem nội dung trông như thế nào:
```ruby
rails generate migration AddTimesToCornStore sale_start_at:datetime opening_time:time
```
Lệnh trên tạo ra file migration trông như thế này
```ruby
class AddTimesToCornStore < ActiveRecord::Migration
  def change
    add_column :corn_stores, :sale_start_at, :datetime
    add_column :corn_stores, :opening_time, :time
  end
end
```
Sau khi chạy `rake db:migrate` chúng ta cùng mở structure.sql ra xem nó như thế nào:
```sql
CREATE TABLE corn_stores (
    id SERIAL PRIMARY KEY,
    sale_starts_at timestamp without time zone,
    opening_time time without time zone
);
```
Thêm dữ liệu vào nào!. Giờ hiện tại ở đây là October 19th, 11:00 am CEST.
```ruby
corn_store = CornStore.create!(
                sale_start_at: Time.current + 1.day,
                opening_time: Time.zone.parse("09:00"))
corn_store.reload

corn_store.sale_start_at
# => Fri, 20 Oct 2017 11:00:00 CEST +02:00
corn_store.sale_start_at.class
# => ActiveSupport::TimeWithZone

corn_store.opening_time
# => "2000-01-01T07:00:00.000Z"
corn_store.opening_time.class
# => Time
```
Điều này có vẻ kỳ lạ. Tại sao `opening_time` lại có một ngày lạ như vậy ("2000-01-01T07:00:00.000Z")? Tại sao giá trị trả về của nó lại khác với sale_start_at? Hãy kiểm tra kỹ Postgres trước khi chúng tôi đưa ra bất kỳ giả định nào:
```sql
SELECT sale_start_at FROM corn_stores WHERE id = 1;

#      sale_start_at
# --------------------------
# 2017-10-20 09:00:00.513386

SELECT opening_time FROM corn_stores WHERE id = 1;

# opening_time
# -------------
#   07:00:00
```
Có một vài điều thú vị thực sự đang diễn ra ở đây:
1. Giá trị `sale_start_at` của chúng tôi được lưu trữ trong Postgres ở UTC. Tuy nhiên, điều này hơi khó hiểu một chút, bởi vì nó không thể hiện “UTC” ở bất cứ đâu.
2. Khi chúng ta đang ở trong rails console, ActiveRecord trả về giá trị sale_started_at như một đối tượng của ActiveSupport::TimeWithZone. Ứng dụng của chúng ta biết múi giờ của chúng ta bởi vì chúng ta có `config.time_zone = "Berlin"` trong `application.rb` của chúng ta. Nếu tôi đổi thành "London", chúng tôi sẽ nhận được “Fri, 20 Oct 2017 10:00:00 BST +01:00” thay vì “Fri, 20 Oct 2017 11:00:00 CEST +02:00”.
3. Còn nhớ structure.sql? Nó tạo ra hai cột, cả hai cột đều “không có múi giờ”. Theo như Postgres có liên quan, các giá trị này không có múi giờ, nhưng Rails áp dụng logic múi giờ cho chúng. Cột `datetime` cho `sale_started_at` là nhận biết múi giờ. Nó biết múi giờ của ứng dụng là gì và cho chúng ta giá trị dựa trên điều đó.
4. Giá trị `opening_time` của chúng tôi trong Postgres chỉ là một kiểu `time` (không có `date`!). Nó cũng là giờ UTC, một lần nữa, rất khó hiểu.
5. Khi chúng ta đang ở trong rails console, ActiveRecord trả về giá trị `opening_time` như một đối tượng `Time`, điều mà… gây nhầm lẫn… bây giờ đó là có một ngày gắn liền với nó và ngày đó là ngày 1 tháng 1 năm 2000 (điều này dường như là một giá trị giả có nguồn gốc từ những ngày đầu của Rails). Nó cũng vẫn là giờ UTC. Rails không dịch giá trị sang múi giờ Berlin cho chúng tôi. Điều này có nghĩa là cột `time` của chúng tôi không tuân theo múi giờ.

Nếu bây giờ chúng ta nhìn lại cảnh báo Deprecation, mọi thứ đang bắt đầu có ý nghĩa hơn một chút. Trong Rails 4, chỉ các cột datetime mới nhận biết múi giờ. Vì vậy, để giữ hành vi này trong Rails 5, chúng ta có thể thêm `config.active_record.time_zone_aware_types = [:datetime]` vào `application.rb` (điều này sẽ tắt cảnh báo Deprecation). Nếu bạn đã lặp lại tất cả các bài tập trong dự án Rails 5 với cấu hình ở trên, bạn sẽ nhận được kết quả chính xác giống như trong Rails 4.
## Behaviour in Rails 5
Hãy thử hành vi mặc định mới trong Rails 5.1. Trong dự án Rails 5, hãy thêm `config.active_record.time_zone_aware_types = [:datetime, :time]` vào `application.rb` của chúng tôi và thoát ra khỏi và sau đó vào lại rails console (chỉ để đảm bảo mọi thứ được tải lại đúng cách). Hãy cùng xem lại CornStore cũ và xem có gì khác biệt. Hãy nhớ rằng, thời gian ban đầu của tôi là ngày 19 tháng 10, 11:00 sáng theo giờ CEST. Việc bán hàng của tôi bắt đầu vào ngày mai (ngày 20 tháng 10) và cửa hàng của tôi mở cửa hàng ngày lúc 9 giờ sáng.
```ruby
corn_store = CornStore.last

corn_store.sale_start_at
# => Fri, 20 Oct 2017 11:00:00 CEST +02:00
corn_store.sale_start_at.class
# => ActiveSupport::TimeWithZone

corn_store.opening_time
# => Sat, 01 Jan 2000 08:00:00 CET +01:00
corn_store.opening_time.class
# => ActiveSupport::TimeWithZone
```
Một cái gì đó đã thay đổi! Tại đây, bạn có thể thấy rằng thay vì nhận lại đối tượng `Time` cho `opening_time`, chúng tôi đã nhận được đối tượng `ActiveSupport :: TimeWithZone`. Giống như cảnh báo Deprecation đề xuất, nó đã trở nên nhận biết múi giờ. Rails đã áp dụng logic múi giờ cho giá trị này. Chúng tôi đặt giá trị là 9 giờ sáng CEST, nó đã được lưu vào Postgres là 7 giờ sáng UTC và nó đã được trả lại là 8 giờ sáng CET (giờ mùa đông)! Điều này là không may, bởi vì nó thậm chí không phải là một chút thời gian mà chúng tôi muốn.
<br>
<br>
Cách bạn đối phó với thay đổi này tùy thuộc vào bạn. Chúng tôi quyết định rằng việc sử dụng cấu hình mới sẽ khá rắc rối đối với chúng tôi vì nó sẽ khiến thời gian của chúng tôi giảm một giờ - không phải là ý tưởng hay đối với một công ty giao hàng! Hành động hiện tại của chúng tôi chỉ là sử dụng cấu hình `config.active_record.time_zone_aware_types = [: datetime]` cho bây giờ và thảo luận về việc tái cấu trúc trong tương lai.

## Conclusion
Hãy nhìn lại cảnh báo Deprecation một lần nữa:
> DEPRECATION WARNING: Time columns will become time zone aware in Rails 5.1. This still causes `String`s to be parsed as if they were in `Time.zone`, and `Time`s to be converted to `Time.zone`.
> 
> To keep the old behavior, you must add the following to your initializer:
> 
>     config.active_record.time_zone_aware_types = [:datetime]
> 
> To silence this deprecation warning, add the following:
> 
>     config.active_record.time_zone_aware_types = [:datetime, :time]
Giờ Nó đã có ý nghĩa hơn, nhưng giải thích cho các tùy chọn cấu hình được đề xuất là không rõ ràng. Nếu bạn muốn giữ lại hành vi cũ, bạn phải thêm tùy chọn cấu hình đầu tiên vào dự án Rails 5 của mình. Nếu bạn muốn sử dụng hành vi hoàn toàn mới, bạn có thể thêm tùy chọn cấu hình thứ hai. Bạn phải thêm một trong hai tùy chọn cấu hình này để tắt cảnh báo Deprecation.
<br>
<br>
Đây là một cách hay để suy nghĩ về nó: cột nào trong ứng dụng của bạn sẽ trả về đối tượng `ActiveSupport :: TimeWithZone`?
* Để giữ hành vi cũ và chỉ có các cột `datetime` trả về đối tượng `ActiveSupport :: TimeWithZone`, sử dụng `[: datetime]`.
* Để sử dụng hành vi mới và có các cột `time` cũng trả về đối tượng `ActiveSupport :: TimeWithZone`, sử dụng `[: datetime,: time]`.