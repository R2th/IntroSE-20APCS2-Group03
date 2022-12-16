## Mở đầu
Mục đích của bài viết này là thực hiện thêm, đổi tên, xóa, di chuyển mô hình lồng nhau của activerecord model và cho phép kéo thả được.
![](https://images.viblo.asia/3a21c613-1dc1-47b3-83e7-85c39f9280ee.png)

## Cài đặt
Đầu tiên cần sử dụng gem [awesome_nested_set](https://github.com/collectiveidea/awesome_nested_set) và jQuery plugin [jsTree](https://www.jstree.com/)
### Gem awesome_nested_set
- Thêm vào Gemfile `gem "awesome_nested_set"` và `bundle install`

### Tạo model Category
- Tạo model `Category` và thêm các cột như sau

![](https://images.viblo.asia/a81b7dd3-65ee-4b38-a890-afceec8460a3.png)

![](https://images.viblo.asia/c0c9a09b-4b0d-499e-a0be-5637b613b6bc.png)

### jQuery plugin jsTree

1. Tải xuống tệp nguồn từ "Tải xuống jsTree".

2. Sao chép `dist/jstree.min.js` của tệp giải nén vào `vendor/asset/javascripts/`.

3. Sao chép `dist/themes/default/*` của tập tin giải nén cho nhà cung cấp `vendor/asset/stylesheets/`.
Sau đó xóa style.css và đổi tên style.min.css thành jstree.min.css.

4. Thêm jstree.min vào application.js.

![](https://images.viblo.asia/fcf6a358-29d6-40d4-8f5f-766b940dbeab.png)

5. Thêm jstree.min vào application.scss

![](https://images.viblo.asia/8d960b6f-4ee4-45f6-aca9-59df888d1003.png)

## Thực hiện
1. Khởi tạo jsTree

Bắt đầu khởi tạo jsTree trong categories.js

![](https://images.viblo.asia/275e9603-ad81-4760-9514-ffc331fb9b4a.png)

> Về phần code rails để có được trang index đã coi như làm

Sẽ có trang như dưới

![](https://images.viblo.asia/78e75e8c-e381-45b9-b809-f0e1ed813560.png)

Tiếp đến tạo thêm 3 nút: Tạo/sửa tên/Xóa

![](https://images.viblo.asia/18a69991-6dfc-4e0e-aa3f-d120393bd2fa.png)

2. Kết hợp jsTree với Rails API

Sử dụng `ajax` để gửi các yêu cầu thêm, đổi tên, xóa, di chuyển.

- Tạo dữ liệu trên server trong file `db/seed.rb` và chạy command `rake db:seed`

![](https://images.viblo.asia/6a7b40ad-4ffe-4b22-b846-05ea1c6e72e4.png)

- Tạo json của category với jbuilder `index.json.jbuilder`

![](https://images.viblo.asia/45256f5c-7a98-4af5-8ff4-652e9c093efb.png)

- Sửa lại js để load json data

![](https://images.viblo.asia/bd404d11-a6ea-422b-a977-e6eb0ab77e7a.png)

> plugin `dnd` để kích hoạt kéo thả

Sau khi load được dữ liệu sẽ tiếp tục làm thêm, đổi tên, xóa, di chuyển

- Phía server

1. Trong [controller](https://github.com/limkimhuor/categorized_lab_app/blob/develop/app/controllers/categories_controller.rb) permit các params `:name, :parent_id, :new_position`

2. Thêm 2 phương thức trong [models/category.rb](https://github.com/limkimhuor/categorized_lab_app/blob/develop/app/models/category.rb):
    - `parent_id=(parent_id)` Khi di chuyển đến nút gốc, vì parent_id là "#", Gọi phương thức move_to_root để chuyển sang root, Nếu có nút cha cập nhật parent_id
    - `new_position=(new_position)` Khi di chuyển đến nút gốc, vì nút cha là nil, đích di chuyển được chỉ định từ mảng child node gốc, Nếu có một nút cha di chuyển nó bằng phương thức move_to_child_with_index 

- Phía client

1. Nút [Create](https://github.com/limkimhuor/categorized_lab_app/blob/develop/app/assets/javascripts/categories.js#L38): Khi click sẽ tìm nút đang chọn và tạo node con với tên mặc định `New node` với parent_id là node đang chọn.

2. Nút [Rename](https://github.com/limkimhuor/categorized_lab_app/blob/develop/app/assets/javascripts/categories.js#L57): Khi click sẽ tìm nút đang chọn và gọi hàm edit để cho phép đổi tên, sau khi sửa xong sẽ có event `rename_node.jstree` lúc đó sẽ gửi tên đã sửa lên server để update.

3. Nút [Delete](https://github.com/limkimhuor/categorized_lab_app/blob/develop/app/assets/javascripts/categories.js#L81): Khi click sẽ tìm nút đang chọn và gọi hàm delete_node để xóa nút đang chọn.

4. [Kéo thả](https://github.com/limkimhuor/categorized_lab_app/blob/develop/app/assets/javascripts/categories.js#L21): Sau khi thả sẽ bắt event `move_node.jstree` trong đó có cần thông tin nút kéo `id`, `parent_id` và `new_position` và dùng ajax để gửi lên server.

## Kết quả

![](https://images.viblo.asia/9ddbbb81-06cc-44e1-a1e9-67533e4a762e.png)

Hy vọng bài này có thể giúp bạn giải quyết vấn đề gặp phải.

#### Tham khảo

- [awesome_nested_set](https://github.com/collectiveidea/awesome_nested_set)
- [jsTree](https://www.jstree.com/)
- [Railsでawesome_nested_setを使って階層構造を作成する](https://ruby-rails.hatenadiary.com/entry/20150216/1424092796)
- [Railsでawesome_nested_setとjsTreeでインタラクティブにツリー構造を操作する](https://ruby-rails.hatenadiary.com/entry/20150217/1424179269)