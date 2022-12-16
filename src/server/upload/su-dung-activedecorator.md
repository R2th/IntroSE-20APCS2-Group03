Xin chào các bạn. Bài viết lần này mình sẽ viết về ActiveDecorator, 1 trong những gem đang được sử dụng để giảm logic ở phần view của 1 ứng dụng Rails.

# Vấn đề đặt ra
Vấn đề đơn giản như sau: Bạn có 1 người dùng có Họ, Tên đệm và Tên. Và để hiển thị họ tên đầy đủ bạn sẽ phải viết như sau:
```ruby
<%= user.family_name %> <%= user.middle_name %> <%= user.name %>
```
Đồng ý là chạy được nhưng trông kinh dị khủng khiếp nếu code của bạn toàn 1 đống `<%=%>` như này. Nhất là nếu vấn đề không tồn tại Tên đệm thêm 1 câu lệnh điều kiện nữa.
```ruby
<%= user.family_name %> <%= user.middle_name if user.middle_name.exist? %> <%= user.name %>
```
hoặc
```ruby
<% if user.middle_name %>
  <%= user.family_name %> <%= user.middle_name %> <%= user.name %>
<% else %>
  <%= user.family_name %> <%= user.name %>
<% end %>
```
1 view mà lắm if else thế thì với sinh viên có thể bỏ qua, nhưng với hội người đi làm thì chắc chắn bị dạy dỗ lại nếu sếp và đồng nghiệp đủ kiên nhẫn(và thật may cho mình là như vậy). Vậy nên chúng ta sẽ phải trang trí lại code 1 chút
# ActiveDecorator
Giải pháp mình lựa chọn là ActiveDecorator. Nói ra lại bảo chê bai gem Draper nhưng quả thật Draper được viết như 1 thư viện ngoài bổ sung cho Rails, trong khi ActiveDecorator thì nghe tên có vẻ đồng bộ với ActiveRecord với ActiveStorage luôn. Nếu Rails là 1 cái iPhone thì ActiveDecorator như thể Airpod vậy. Thật vậy để Draper hoạt động, code ở controller sẽ phải viết:
```ruby
@user = User.first.decorate
```
trong khi đó, ActiveDecorator sẽ viết theo kiểu
```ruby
@user = User.first
```
Như các bạn thấy, viết kiểu 2 không khác gì kiểu thông thường cả mà hiệu quả như nhau. Việc gọn code hơn sẽ giúp dễ bảo trì hơn cho sau này. Với ý kiến chủ quan của mình thì gần đây chúng ta có ActiveStorage đã hoàn toàn loại gem paperclip đi, khả năng rất cao là draper sẽ bị deprecate trong các phiên bản rails tới còn ActiveDecorator sẽ được tích hợp vào rails để không cần thêm riêng lẻ như hiện nay.

Tác giả của ActiveDecorator là Akira Matsuda, 1 Ruby committer rất có uy tín và nhiều commit cho Ruby cũng như Rails(Nếu mình không nhầm thì hiện đang là 1 cố vấn tech ở Money Forward thì phải). Với uy tín thế thì ắt hẳn tool viết ra cũng tốt và khả năng ActiveDecorator được tích hợp thẳng trong tương lai là cao. Vậy nên dùng là hợp lý nhỉ?

Để sử dụng thì với bản Ruby 2.6, Rails 6 tại thời điểm ra bài viết này, các bước sử dụng sẽ lần lượt là
- Thêm `gem 'active_decorator'` vào Gemfile
- Chạy `bundle`
- Chạy `rails g decorator user`. Và thế là chúng ta có file+đường dẫn `app/decorators/user_decorator.rb`
```ruby
module UserDecorator
end
```
Sẵn sàng sử dụng nào
# Với trường hợp họ-tên đệm-tên đầu tiên
Chúng ta sẽ viết gọn lại ở view còn
```ruby
  <%= user.full_name %>
```
Còn ở Decorator, chúng ta sẽ đặt 1 method `full_name` để hiển thị như trên
```ruby
module UserDecorator
  def full_name
    "#{family_name} #{middle_name} #{name}"
  end
end
```
Bằng cách gọi full_name, code sẽ tự động xử lý để gọi từng thuộc tính như đã ghi trong cơ sở dữ liệu. Thế là vấn đề được giải quyết.
# Với trường hợp họ-tên
Cũng vẫn cách viết như trên, ta có
```ruby
module UserDecorator
  def full_name
    if middle_name
      "#{family_name} #{middle_name} #{name}"
    else
      "#{family_name} #{name}"
    end
  end
end
```
Và thế là bạn chỉ cần gọi `user.full_name` như trên. Cơ mà code có vẻ chưa ổn lắm vì theo [bài này](https://viblo.asia/p/mastering-the-use-of-php-conditionals-GrLZD71nKk0#_6-tranh-su-dung-cau-lenh-else-11), ở Ruby cũng ta cũng tránh dùng else. Vậy nên chúng ta sẽ viết lại như sau
```ruby
module UserDecorator
  def full_name
    return "#{family_name} #{middle_name} #{name}" if middle_name
    
    "#{family_name} #{name}"
  end
end
```
# Trường hợp phức tạp hơn chút
Ở phía trên mình nghĩ các bạn cũng đã hiểu qua về việc dùng decorator có lợi sao với việc code. Chúng ta sẽ đến với 1 pha xử lý cồng kềnh như sau
```haml
- if @place.wifi == true
  = image_tag('Wireless.png', size: '50x50', alt: t('places.wifi_image'))
  p = t 'wifi.have'
- elsif @place.wifi == false
  = image_tag('No_wireless.png', size: '50x50', alt: t('places.wifi_image'))
  p = t 'wifi.not_have'
- else
  = image_tag('Unknown_wireless.png', size: '50x50', alt: t('places.wifi_image'))
  p = t 'wifi.unknown'
```
Ở đây, đoạn code ở phần view này(dùng slim) để hiển thị khu vực có wifi hay không. Chúng ta có thể hô biến nó từ 1 đoạn 9 dòng xuống còn 
```haml
= @place.wifi_status
```
Việc hô biến như vậy đồng nghĩa ở `place_decorator.rb`, bạn sẽ phải định nghĩa method `wifi_status`
```ruby
module PlaceDecorator
  def wifi_status
    if wifi == true
      image_tag('Wireless.png', size: '50x50', alt: t('places.wifi_image')) + content_tag(:p, t('wifi.have'))
    elsif wifi == false
      image_tag('No_wireless.png', size: '50x50', alt: t('places.wifi_image')) + content_tag(:p, t('wifi.not_have'))
    else
      image_tag('Unknown_wireless.png', size: '50x50', alt: t('places.wifi_image')) + content_tag(:p, t('wifi.unknown'))
    end
  end
end
```
Đoạn trên trước hết để xử lý gọn hơn, chúng ta cần tạo 1 method riêng
```ruby
module PlaceDecorator
  def wifi_status
    if wifi == true
      display_wifi('Wireless.png', t('wifi.have'))
    elsif wifi == false
      display_wifi('No_wireless.png', t('wifi.not_have'))
    else
      display_wifi('Unknown_wireless.png', t('wifi.unknown'))
    end
  end

  def display_wifi(picture, status_text)
    image_tag(picture, size: '50x50', alt: t('places.wifi_image')) + content_tag(:p, status_text)
  end
end
```
Rõ ràng `display_wifi` chỉ được dùng nội bộ trong file này nên ta sẽ phải đặt method trên trong `private`
```ruby
module PlaceDecorator
  ...
  private

  def display_wifi(picture, status_text)
    image_tag(picture, size: '50x50', alt: t('places.wifi_image')) + content_tag(:p, status_text)
  end
end
```
Tiếp tới xem xét đoạn `if...else` ở trên, chúng ta sẽ rút gọn còn
```ruby
  def wifi_status
    return display_wifi('Wireless.png', t('wifi.have')) if wifi == true
    return display_wifi('No_wireless.png', t('wifi.not_have')) if wifi == false
    
    display_wifi('Unknown_wireless.png', t('wifi.unknown'))
  end
```
Cách xử lý `== true` với `== false` trông không Ruby style tí nào cả. Vậy nên ta tiếp tục sửa lại thành
```ruby
  def wifi_status
    return display_wifi('Unknown_wireless.png', t('wifi.unknown')) if wifi.nil?
    return display_wifi('Wireless.png', t('wifi.have')) if wifi?

    display_wifi('No_wireless.png', t('wifi.not_have'))
  end
```
Vậy cuối cùng decorators của chúng ta sẽ là 
```ruby
module PlaceDecorator
  def wifi_status
    return display_wifi('Unknown_wireless.png', t('wifi.unknown')) if wifi.nil?
    return display_wifi('Wireless.png', t('wifi.have')) if wifi?

    display_wifi('No_wireless.png', t('wifi.not_have'))
  end
  
  private

  def display_wifi(picture, status_text)
    image_tag(picture, size: '50x50', alt: t('places.wifi_image')) + content_tag(:p, status_text)
  end
end
```
Và ở view chúng ta gọi mỗi 1 dòng là xong 
```haml
= @place.wifi_status
```
# Kết
Bài viết của mình tới đây là hết. Cảm ơn các bạn đã theo dõi

Tham khảo: 
- https://github.com/amatsuda/active_decorator
- https://tech.misoca.jp/entry/2016/02/05/111644