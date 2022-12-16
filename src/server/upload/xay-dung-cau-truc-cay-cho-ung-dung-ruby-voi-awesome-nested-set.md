Khi phát triển một ứng dụng Rails thì bạn sẽ rất hay gặp phải bài toán xây dựng cấu trúc cây cho dữ liệu. Bạn hoàn toàn có thể làm thủ công với trường `parent_id` kết hợp với đệ quy và các câu query để thực hiện công việc. Tuy nhiên với những cấu trúc cây phức tạp, việc thực hiện sẽ rất phức tạp và tốn thời gian, hiệu suất công việc thấp. 

Bài viết này mình xin giới thiệu đến các bạn gem **Awesome Nested Set** dùng để xây dựng cấu trúc cây (vote 2116 star trên github tại thời điểm viết bài).

Link github: [Awesome Nested Set](https://github.com/collectiveidea/awesome_nested_set)

### Bản chất

Được thiết kế dưới mô hình thiết kế **Nested Sets**

Về cơ bản cấu trúc cây khá đơn giản, ít nhất có 3 thông tin sau cần có cho một node:
- `parent_id` là id của node cha của node hiện tại.
- `lft`, `rgt` lưu trọng số của 1 node; phải đảm bảo là các node con phải có:
    + Trọng số bên trái `lft` lớn hơn trọng số bên trái `lft` của node cha
    + Trọng số bên phải `rgt` phải nhỏ hơn trọng số bên phải `rgt` của node hiện cha. 

Hãy xem ví dụ về một cây sau đây.

![](https://images.viblo.asia/40c1c355-0e2a-4374-afb4-659aaf19d1db.png)

Chuyển cây thành sơ đồ ven quen thuộc.

![](https://images.viblo.asia/0d5477fd-7739-4bae-89bf-5bf7e3cdbbf8.png)

Ta sẽ có cách đánh trọng số `rgt` và `lft` như sau là thỏa mãn.

![](https://images.viblo.asia/14e316ec-f8db-41ad-b6d7-83b75b2cb0da.png)

**Ưu điểm:**
- Select nhanh.
- Mô hình đơn giản, dễ sử dụng.

**Nhược điểm**
- Update chậm (hoặc có thể không update được vì phải cập nhật lại chỉ số của những node khác trong cây)


### Cài đặt

Thêm vào Gemfile dòng:
```ruby
gem 'awesome_nested_set'
```

Và tiến hành bundle install.

### Sử dụng

#### Thiết lập

Để sử dụng gem `awesome_nested_set` cho model nào thì bắt buộc bảng tương ứng phải có ít nhất 3 trường: `parent_id`, `lft`, `rgt`. Ngoài ra bạn còn thể thêm 2 trường `depth` và `children_count` (trường này nếu có thì bắt buộc phải set `null: false` và `default: 0`). Ví dụ với việc tạo bảng `categories` như sau:

```ruby
class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
      t.string :name
      
      # required fields
      t.integer :parent_id, null: true, index: true
      t.integer :lft, null: false, index: true
      t.integer :rgt, null: false, index: true

      # optional fields
      t.integer :depth, null: false, default: 0
      t.integer :children_count, null: false, default: 0
    end
  end

  def self.down
    drop_table :categories
  end
end
```

Nếu muốn áp dụng cấu trúc cây cho model đã có sẵn từ trước, ta cần migrate để thêm các trường cần thiết vào, sau đó thì bạn cần build lại model đó để điền thông tin của cây vào, có thể thêm luôn vào file migration như sau:

```ruby
Category.reset_column_information
Category.rebuild!
```

Bạn cần khai báo thêm `acts_as_nested_set` trong model như sau:

```ruby
class Category < ActiveRecord::Base
  acts_as_nested_set
end
```

Tất cả những trường được thêm vào bảng phục vụ cho gem đều có thể thay đổi tên tùy thuộc vào bạn config, có thể thay đổi `parent_column`, `left_column`, `right_column`, `depth_column`. Bạn có thể tham khảo thêm [ở đây](https://github.com/collectiveidea/awesome_nested_set#options).

Đến đây thì model `Category` đã sẵn sàng.

**Chú ý** Bạn nên thêm index cho các trường của `awesome_nested_set` để có thể tìm kiếm nhanh chóng hơn.

#### Cách sử dụng cơ bản.

Bạn có thể tham khảo các hàm cơ bản [ở đây](https://github.com/collectiveidea/awesome_nested_set/wiki/Awesome-nested-set-cheat-sheet#basic-usage).

- Tạo node root thì rất đơn giản: 
```ruby
science = Category.create!(name: 'Science')
```

- Thêm node con:
```ruby
physics = Category.create!(:name => 'Physics')
physics.move_to_child_of(science)
```

#### Một số hàm
**Class method**
- `root` node root đầu tiên
- `roots`  tất cả các node root, cây có thể có nhiều root, lệnh này khá đơn giản và nó hoạt động tương tự `Category.where(parent_id: nil)`

**Instance method**
- `root` node gốc của node hiện tại, root của note f thì lệnh này tương tự như `Category.where(parent_id: nil).where("lft < ? and rgt > ?", f.lft, f.rgt)`
- `parent` node cha trực tiếp.
- `children`  mảng các node con trực tiếp (chỉ ở level kế tiếp).
- `ancestors` mảng các node tổ tiên (từ node gốc), ngoại trừ chính nó. Ngoài ra còn có `self_and_ancestors`.
- `siblings`  mảng tất cả các node có cùng node cha (cùng level), ngoại trừ chính nó. Ngoài ra còn có `self_and_siblings`.
- `descendants` mảng tất cả node con cháu, ngoại trừ chính nó. Ngoài ra còn có `self_and_descendants`.
- `leaves` mảng tất cả các node lá (hậu duệ mà không có con).

Một số instance method mà không cần phải thao tác đến DB.

`root?` trả về `true` nếu là node gốc (không có cha).
`child?` trả về `true` nếu là node con (có cha).
`is_ancestor_of?(obj)` trả về `true` nếu là tổ tiên của `obj`.
`is_descendant_of?(obj)` trả về `true` nếu là hậu duệ của `obj`.
`leaf?` trả về `true` nếu là node lá (không có node con).

***

### Kết
Trên đây mình đã giới thiệu những khái niệm cũng như cách sử dụng cơ bản của gem **Awesome Nested Set** để xây dựng cấu trúc cây. Hi vọng bài viết sẽ này sẽ hữu ích với bạn.

Bài viết sau mình sẽ giới thiệu một gem khác tương tự được xây dựng trên mô hình **Path Enumeration** cho cấu trúc cây.

### Tham khảo

- https://github.com/collectiveidea/awesome_nested_set
- https://github.com/collectiveidea/awesome_nested_set/wiki/Awesome-nested-set-cheat-sheet