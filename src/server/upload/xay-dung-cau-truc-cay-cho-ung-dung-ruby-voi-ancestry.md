Tiếp nối bài seri bài viết `Xây dựng cấu trúc cây cho ứng dụng Ruby`, hôm nay mình xin giới thiệu đến các bạn gem **Ancestry** (vote 2828 star tại thời điểm viết bài) được xây dựng trên mô hình **Path Enumeration**.

Link github: [Ancestry](https://github.com/stefankroes/ancestry)

Tuỳ từng phiên bản của Rails thì cũng tương thích với các phiên bản khác nhau của gem **Ancestry** này, bạn có thể tham khảo ở [đây](https://github.com/stefankroes/ancestry#ancestry).

Hãy cùng tìm hiểu gem này nó hoạt động như thế nào.

### Bản chất

Mô hình **Path Enumeration** chỉ sử dụng trường `ancestry` (tên trường này bạn hoàn toàn có thể đặt tên khác) kiểu `string` để lưu giá trị path của nhánh cây chứa node, từ root đến node đó. Với node root thì trường `ancestry` sẽ là `nil`.

Mình sử dụng lại hình ảnh cây của bài viết trước cho bạn dễ hình dung, và giả sử mình có id của các node như sau:

![](https://images.viblo.asia/62155417-3e53-4d1c-8ef3-c7104e4a19b6.png)

Ta sẽ có trường `ancestry` cụ thể của các node như sau:



| id | Tên | `ancestry` |
| -------- | -------- | -------- |
| 1 | ELECTRONICS | `nil` |
| 2 | TELEVISIONS | `1` |
| 3 | PORTABLE ELECTRONICS | `1` |
| 4 | TUBE | `1/2` |
| 5 | LCD | `1/2` |
| 6 | PLASMA | `1/2` |
| 7 | MP3 PLAYERS | `1/3` |
| 8 | CD PLAYERS | `1/3` |
| 9 | 2WAY RADIOS | `1/3` |
| 10 | FLASH | `1/3/7` |

Nhìn vào bảng trên chắc là cũng dễ hiểu, giả sử với node `LCD` có  id `5`, nhánh cây dẫn đến nó là `(1)ELECTRONICS` --> `(2)TELEVISIONS` -> `(5)LCD`.

#### Ưu điểm:

Model được xây dựng đơn giản, đơn giản hơn mô hình **Nested Sets** của gem Awesome Nested Set trong bài viết trước.

#### Nhược điểm:

- Khó tham chiếu trực tiếp và bị giới hạn chiều dài của path (nếu cấu trúc cây có độ sâu không quá lớn thì cũng thoải mái cho bạn sử dụng rồi :D).
- Để search cho trường `ancestry` kia thì sẽ phải sử dụng câu lệnh `LIKE` trong db, nó có thể sẽ làm chậm tốc độ xử lý, nhất là với những cây phức tạp.

### Cài đặt
Rất đơn giản, thêm vào Gemfile dòng:
```ruby
gem 'ancestry'
```

Và tiến hành bundle install.

### Sử dụng

#### Thiết lập

Như đã để cập ở trên, ta chỉ cần thêm trường `ancestry` cho bất cứ model nào cần. Rõ ràng thiết kế của mô hình này đã đơn giản hơn nhiều so với mô hình **Nested Sets**.

Có thể thêm migration để thêm trường vào bảng `rails g migration add_ancestry_to_categories ancestry:string:index`. Nên thêm index để có thể tìm kiếm tốt hơn bạn nhé.

Trong model đó thêm khai báo `has_ancestry` là ta đã sẵn sàng để xây dựng cấu trúc cây.

#### Lưu ý
Nếu muốn sử dụng gem **Ancestry** cho một cấu trúc cây trước đó (thường sử dụng trường `parent_id` để lưu lại id của node cha), bạn cần làm thêm thao tác chuyển về mô hình mới này như sau:

```ruby
TreeNode.build_ancestry_from_parent_ids!
TreeNode.check_ancestry_integrity! # chạy để chắc chắn rằng quá trình chuyển đổi đã hoàn thành
```

Xong bước này thì bạn có thể gỡ các gem của mô hình cũ cũng như xoá trường `parent_id` trong bảng đi, nhớ là phải cập nhật code liên quan nữa nhé :D.

#### Cách sử dụng cơ bản

```ruby
parent_node = TreeNode.create!(name: 'Squeeky')
TreeNode.create!(name: 'Stinky', parent: parent_node)
```

```ruby
node.children.create(nam: 'Stinky')
```

#### Các options cho has_ancestry

- `:ancestry_column`: khai báo một trường khác để lưu path của cây
- `:orphan_strategy`: xác định hành động với node con khi mà xoá node cha
    - `:destroy`: là mặc định, sẽ xoá tất cả node con.
    - `:rootify`: node con trực tiếp của node bị xoá sẽ trở thành node root
    - `:restrict`: không cho xoá nếu có node con, trả về exception `AncestryException`
    - `:adopt`: cây con bên dưới sẽ được thêm vào là cây con của node cha của node vừa bị xoá, nếu node bị xoá là root thì sẽ giống `:rootify`
- `:cache_depth`: cache độ sâu của mỗi node trong cột `ancestry_depth`, để bật tính năng này cần thêm trường `:ancestry_depth, :integer, default: 0` vào bảng, xong phải build cache `TreeNode.rebuild_depth_cache!`



#### Một số method cơ bản.

- `parent`, `parent_id`: trả về node và id cha của node đó, cha của root là `nil`
- `root`, `root_id`: trả về node root của node đó
- `root?`, `is_root?`: trả về `true` nếu node đó là root và ngược lạilại
- `children`, `child_ids`: node con trực tiếp của node đó
- `ancestors`, `ancestor_ids`: trả về các node tổ tiên, từ node root đến node cha của node đó
- `path`, `path_ids`: trả về nhánh cây chứa node, từ root cho đến node đó
- `has_parent?`, `ancestors?`: trả về `true` nếu node đó có cha và ngược lại
- `has_children?`, `children?`: trả về `true` nếu node đó có con và ngược lại
- `descendants`, `descendant_ids`: trả về các node con trực tiếp của node đó
- `depth` trả về độ sau của node đó, node root thì độ sâu là 0

Hầu hết các methods kể trên trả về scopes nên ta có thể thêm các điều kiện, sắp xếp, ... vào, ví dụ:

```ruby
node.children.where(name: 'Mary').exists?
node.subtree.order(:name).limit(10).each { ... }
node.descendants.count
```

Hoặc có thể tạo các node mới thông qua quan hệ của node như:

```ruby
node.children.create
node.siblings.create!
TestNode.children_of(node_id).new
TestNode.siblings_of(node_id).create
```

Ngoài ra còn một số method khác nữa, cũng như một số method để bạn kiểm tra mối quan hệ của 2 node bất kỳ với nhau. Bạn có thể tham khảo thêm [ở đây](https://github.com/stefankroes/ancestry#navigating-your-tree).

Hoặc là bạn có thể select các node theo chiều sâu của cây, sắp xếp...

***

### Kết

Trên đây mình đã giới thiệu những khái niệm cũng như cách sử dụng cơ bản để xây dụng cấu trúc cây theo mô hình **Path Enumeration** với gem **Ancestry**. So với mô hình **Nested Sets** thì nó cũng có những ưu nhược điểm của riêng nó.

Rất cám ơn bạn đã theo giõi và hẹn gặp lại ở các bài viết tiếp theo.

### Tham khảo

- https://github.com/stefankroes/ancestry