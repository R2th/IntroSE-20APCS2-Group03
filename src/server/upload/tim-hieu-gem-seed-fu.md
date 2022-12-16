Seed Fu là một gem cung cấp chức năng nâng cao tạo dữ liệu cho CSDL trong ứng dụng Rails của bạn. Seed Fu cung cấp một số tính năng làm cho nó trở thành một lựa chọn tốt hơn đáng kể so với chức năng mặc định trong Rails. Để bắt đầu, Seed Fu cho phép bạn tạo các bộ seed một cách nhanh chóng và dễ dàng dựa trên môi trường bạn đang thao tác. Ví dụ, Trên development bạn có thể có một bộ dữ liệu cho development và trên production cũng vậy. Ngoài ra, Seed Fu nhanh hơn nhiều vì nó bỏ qua callbacks.

## Chú ý
Phiên bản 2.0.0 của Seed Fu đã giới thiệu các thay đổi API. Seed::Writer đã được sửa chữa hoàn toàn và sẽ yêu cầu bạn cập nhật tập lệnh của mình. Một số  khác đã được giới thiệu và hỗ trợ, xóa hoàn toàn trong phiên bản 2.1.0. Vui lòng xem CHANGELOG để biết chi tiết.

Documentation đầy đủ tại [đây](http://rubydoc.info/github/mbleigh/seed-fu/master/frames).

## Cài đặt
### Rails 3.1, 3.2, 4.0, 4.1, 4.2, 5.0

Thêm `gem 'seed-fu', '~> 2.3'` đến Gemfile của bạn.

### Rails 3.0

Phiên bản hiện tại không tương thích ngược với Rails 3.0. Vui lòng sử dụng `gem 'seed-fu', '~> 2.0.0'`.

### Rails 2.3

Phiên bản hiện tại không tương thích ngược với Rails 3.0. Vui lòng sử dụng `'seed-fu', '~> 1.2.0'`.

=> Sau đó chạy `bundle install` trên terminal

## Ví dụ
Trong `db/fixtures/users.rb` thêm dữ liệu cho bảng/đối tượng user
```
User.seed do |s|
  s.id    = 1
  s.login = "jon"
  s.email = "jon@example.com"
  s.name  = "Jon"
end

User.seed do |s|
  s.id    = 2
  s.login = "emily"
  s.email = "emily@example.com"
  s.name  = "Emily"
end
```
Để chạy và load dữ liệu đến database.
```
$ rake db:seed_fu
== Seed from /path/to/app/db/fixtures/users.rb
 - User {:id=>1, :login=>"jon", :email=>"jon@example.com", :name=>"Jon"}
 - User {:id=>2, :login=>"emily", :email=>"emily@example.com", :name=>"Emily"}
```

## Tính ràng buộc (Constraints)
Càng ràng buộc được xác định trong seeds, để chúng có thể update! nếu cần thiết.
```
Point.seed(:x, :y) do |s|
  s.x = 4
  s.y = 7
  s.name = "Home"
end
```
Lần đầu tiên seed file được load, một đối tượng Point sẽ được tạo ra. Bây giờ muốn thay đổi name và giữ nguyên x,y
```
Point.seed(:x, :y) do |s|
  s.x = 4
  s.y = 7
  s.name = "Work"
end
```
Khi chạy seed fu sẽ tìm kiếm 1 đối tượng point với giá trị của x và y. Nếu đối tượng được tìm thấy nó sẽ update! giá trị của name chứ không tạo một bản ghi mới.

Nếu bạn muốn tạo một bản ghi mới thay vì update giá trị hãy sử dụng `seed_once`:
```
Point.seed_once(:x, :y) do |s|
  s.x = 4
  s.y = 7
  s.name = "Home"
end
```
Ràng buộc mặc định sẽ kiểm tra theo id của bản ghi.

## Nơi để thiết lập các thông tin seed files
Mặc định seed files sẽ được tìm đến địa chỉ như bên dưới:
* `#{Rails.root}/db/fixtures` và `#{Rails.root}/db/fixtures/#{Rails.env}`
* `./db/fixtures`
Bạn có thể thay đổi các giá trị này bằng cách sửa trong mảng `SeedFu.fixture_paths`, và bạn có thể đặt tên các seed files tùy ý.

## Cú pháp Terser
Khi load số lượng bản ghi lớn, cú pháp dựa trên block khá là dài dòng, bạn có thể sử dụng như bên dưới:
```
User.seed(:id,
  { :id => 1, :login => "jon",   :email => "jon@example.com",   :name => "Jon"   },
  { :id => 2, :login => "emily", :email => "emily@example.com", :name => "Emily" }
)
```