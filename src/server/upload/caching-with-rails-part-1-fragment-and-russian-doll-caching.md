## Introduction
![](https://images.viblo.asia/66711923-8d66-474b-b53e-5ee45b7d6ea3.png)


**Caching** là một trong những phương pháp hiệu quả để cải thiện hiệu năng của website bằng cách lưu các thành phần ít thay đổi của trang web vào bộ nhớ đệm để tái sử dụng mỗi lần truy cập lại.

Rails cung cấp cho chúng ta 3 kỹ thuật caching chính là **Page caching**, **Action caching** và **Fragment caching**. Trong bài viết này chúng ta sẽ chỉ tập trung vào **Fragment caching**.

Mặc định Rails chỉ enable caching cho môi trường production, để dùng được với môi trường development thì chúng ta sẽ phải thêm vào trong file config:
```ruby
# config/environments/development.rb
config.action_controller.perform_caching = true
```

## Fragment Caching
Chúng ta có thể cache luôn cả trang web lại và trả về cho các subsequent requests, tuy nhiên cách này chỉ áp dụng cho các trang gần như tĩnh hoàn toàn, bởi khi user phát sinh request tương tác khác nhau thì nội dung sẽ phải làm mới liên tục. Khi chúng ta cache cả trang, user chỉ nhìn thấy nội dung cũ, nên cách làm trên không hiệu quả. Trường hợp này, chúng ta nên cache lại những phần ít thay đổi nhất của trang mà thôi, và **Fragment Caching** sinh ra để làm công việc đó.

**Fragment Caching** cho phép một phần của view được gói gọn lại trong bộ nhớ đệm và trả lại khi có request tiếp theo tới.

Lấy ví dụ trong trường hợp chúng ta muốn cache lại từng product, có thể làm như sau:
```ruby
<% @products.each do |product| %>
  <% cache product do %>
    <%= render product %>
  <% end %>
<% end %>
```
Khi ứng dụng của chúng ta nhận được request đầu tiên đến, Rails sẽ tạo ra 1 cache entry mới với unique key có dạng:
```
views/products/1-201505056193031061005000/bea67108094918eeba42cd4a6e786901
```
Chuỗi số dài ở giữa là `product_id` kèm theo giá trị timestamp của field `updated_at` của product đó. Rails sử dụng giá trị timestamp này để đảm bảo data không bị cũ. Nếu giá trị của field `updated_at` bị thay đổi, một key mới sẽ được tạo ra, và Rails sẽ tạo ra cache mới với key vừa được tạo, cache cũ sẽ bị loại bỏ. Quá trình này được gọi là *key-based expiration*.

Cache của các fragments cũng sẽ bị hết hạn nếu như view của fragment bị thay đổi. Chuỗi các chữ cái ở cuối cache entry được gọi là *template tree digest*. Nó là một hash digest được tạo ra dựa trên nội dung của view fragment chúng ta đang muốn cache. Khi chúng ta thay đổi view của fragment, chuỗi digest cũng sẽ bị thay đổi theo, và cache sẽ hết hạn. 

Nếu chúng ta muốn cache fragment theo các điều kiện khác nhau, có thể sử dụng `cache_if` hoặc `cache_unless`:
```ruby
<% cache_if admin?, product do %>
  <%= render product %>
<% end %>
```
### Collection Caching
Method helper `render` cũng có thể cache các template riêng biệt của 1 collection bằng việc đọc trước toàn bộ cache templates 1 lần thay vì dùng `each` đọc lần lượt từng cache một như vd trên. Để làm được điều này, chúng ta truyền thêm `cached: true` khi render 1 collection:
```ruby
<%= render partial: 'products/product', collection: @products, cached: true %>
```
Tất cả các templates được cached từ lần render trước sẽ được fetch ra cùng lúc giúp cải thiện tốc độ load nhanh hơn rất nhiều. Với những template chưa được cache sẽ được cache lại vào lần render kế tiếp.

## Russian Doll Caching
![](https://images.viblo.asia/1a21afb2-a4d5-4a2b-b9cd-79088ec465e5.png)

**Russian Doll Caching** là kĩ thuật cho phép nested cached fragments - cache các fragment con bên trong một cached fragment khác.

Lợi thế của kỹ thuật này là nếu fragment bên ngoài được update, thì chỉ có mình fragment này thay đổi còn toàn bộ fragments con bên trong sẽ vẫn được cached để tái sử dụng lại.

Nhưng với trường hợp ngược lại, có thể lấy ví dụ:
```ruby
<% cache product do %>
  <%= render product.games %>
<% end %>
```
View bên trong được render:
```ruby
<% cache game do %>
  <%= render game %>
<% end %>
```
Nếu như attribute bất kì của `game` thay đổi, field `updated_at` sẽ được cập nhật mới, đồng nghĩa với việc cache sẽ hết hạn. Tuy nhiên, vì giá trị `updated_at` của product không thay đổi, nên cache của `product` sẽ không bị hết hạn, dữ liệu được render sẽ vẫn là dữ liệu cũ.

Để khắc phục vấn đề này, chúng ta có thể dùng `touch` method ở model:
```ruby
class Product < ApplicationRecord
  has_many :games
end
 
class Game < ApplicationRecord
  belongs_to :product, touch: true
end
```
Với việc set `touch` là `true`, bất cứ hành động nào thay đổi giá trị `updated_at` của `game` cũng sẽ tác động đến `product`, do đó cache của cả `game` lẫn `product` đều sẽ bị hết hạn và loại bỏ.

Từ vd trên ta có thể rút ra nguyên lí của kỹ thuật **Russian Doll Caching** như sau:
* Khi fragment ngoài cùng được cập nhật, sẽ chỉ có 1 mình fragment đó thay đổi, những fragments con sẽ vẫn tồn tại, và có thể sử dụng lại
* Khi fragment con trong cùng được cập nhật, nó sẽ bắt đầu 1 chuỗi dây chuyền khiến tất cả các fragments cha bên ngoài của nó phải thay đổi.

## Summary
Bài viết nhằm chia sẻ về Caching trong Rails và kĩ thuật caching rất mạnh mẽ và hiệu quả là **Russian Doll Caching**. Bài viết còn nhiều hạn chế, cảm ơn bạn đã dành thời gian đọc.

Nguồn và tài liệu tham khảo:
https://guides.rubyonrails.org/caching_with_rails.html