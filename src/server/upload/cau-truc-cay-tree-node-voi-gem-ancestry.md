Giới thiệu
Trong quá trình phát triển dự án web, chắc hẵn ai cũng từng gặp qua cấu trúc phân tầng như category hoặc những cấu trúc data khác tương tực có tính phân cấp theo cấu trúc tree node. Việc sử lý bằng tay sẽ tốn khá nhiều thời gian khi để mình xác định các thông tin như:  parent, root, children... 

Hôm nay mình sẽ giới thiệu cho các bạn 1 gem hỗ trợ tới tận răng cho các bạn, để các bạn ko cần phải lo lắng khi gặp những kiến trúc tree node nữa.

Gem mình muốn giới thiệu là `Gem ancestry`

# 1.Installation
Như thường lệ thì ta thêm vào file Gemfile
`gem "ancestry"`

Sau đó chạy lệnh `bundle install `


# 2. Add ancestry vào table cần dùng
Tạo migration:
`rails g migration add_ancestry_to_[table] ancestry:string:index`

Tiến hành Migrate database:
`rake db:migrate`

# 3. Add ancestry vào model
* Add vào app/models/[model_name.rb]

``` Ruby
class [ModelName] < ActiveRecord::Base
   has_ancestry
end
```
Bây giờ, Model của bạn đã có cấu trúc tree.

# 4. Sử dụng acts_as_tree thay vì has_ancestry
Về sau method `acts_as_tree` sẽ tiếp tục được support trong thời gian tới v.
Tuy nhiên: Trong version 1.2.0, method `acts_as_tree` đã được thay đổi tên thành `has_ancestry` để cho phép sử dụng cả hai `gem acts_as_tree` và `gem ancestry` trong cùng một application.  nên ở version này dùng thằng nào cũng đc :D

# 5. Tổ chức các records thành cấu trúc tree.
Bạn có thể sử dụng thuộc tính `parent` để tổ chức các record thành cấu trúc tree. Nếu bạn có id của record bạn muốn sử dụng như là parent và bạn không muốn fetch nó thì bạn có thể sử dụng parent_id. 

Giống như bất kì virtual attribute nào, `parent và parent_id` có thể set được giá trị bằng cách: 
* `parent= `, `parent_id=` trên một bản ghi 
hoặc
* Đưa chúng vào hash để truyền vào new, create, update_attributes và update_attributes!. Ví dụ:
``` ruby
TreeNode.create! name: "Node con", parent: TreeNode.create!(name: "Node cha")
```

Bạn cũng có thể tạo ra một children thông qua relation children:
```ruby
node.children.create name: "Node con"
```

# 6. Các method vi diệu liên quan đến tree
Ta có ví dụ 1 cây như sau: 
```Json
{
  "id": 1
  "name": "Ông nội",
  "child_node":
    {
      "id": 2,
      "name": "Cha",
      "child_node": 
        {
           "id": 3,
           "name": "Con"
        }
    }
}
```


| Phương thức | Chức năng| Ví dụ |
| -------- | -------- | -------- |
| parent     | Trả về thằng cha của record. Nếu là root thì trả về nil    | `cha.parent = ong_noi` ; `ong_noi.parent = nil`  |
| parent_id     | Trả về id của thằng cha của record. Nếu là root thì trả về nil    | `cha.parent_id = 1` ; `ong_noi.parent_id = nil`  |
| root     | Trả về thằng root của record. Nếu là root thì trả về chính nó    | `cha.root = ong_noi` ; `con.root = ong_noi` ; `ong_noi.root = ong_noi`  |
| root_id     | Trả về thằng root_id của record. Nếu là root thì trả về id chính nó    | `cha.root_id = 1` ; `con.root_id = 1` ; `ong_noi.root_id = 1`  |
| root?, is_root?     | Nếu là root thì trả về true, ngược lại false    | `cha.root = false` ; `ong_noi.root = true`  |
| ancestor_ids     | Trả về list id của tổ tiên của record. bắt đầu từ root id đến parent id    | `con.ancestor_ids = [1, 2]`  |
| ancestors     | Trả về list tổ tiên của record. bắt đầu từ root đến parent   | `con.ancestors = [ong_noi, cha]`  |
| path_ids     | Trả về list path ids. bắt đầu từ root id đến id của chính nó    | `con.path_ids = [1, 2, 3]`  |
| path     | Trả về list path. bắt đầu từ root đến chính nó    | `con.path = [ong_noi, cha, con]`  |
| child_ids     | Trả về list id của các con của record   | `ong_noi.child_ids = [2, 3]`  |
| children     | Trả về list con của recorde  | `ong_noi.children = [cha, con]`  |
| has_parent?     | Trả về true nếu có cha, ngược lại false  | `ong_noi.has_parent? = false` ; `cha.has_parent? = true`  |
| has_children?     | Trả về true nếu có con, ngược lại false  | `ong_noi.has_children? = true` ; `con.has_children? = false`  |
| is_childless?     | Trả về true nếu ko có con, ngược lại false  | `ong_noi.is_childless? = false` ; `con.is_childless? = true`  |
| siblings     | Trả về anh chị em ruột  cùng cấp bao gồm chính nó | trường hợp cha có thêm thằng con tạm gọi là con_2  thì  `con.siblings = [con, con_2]` |
| sibling_ids     | Trả về id của anh chị em ruột cùng cấp bao gồm chính nó |  |
| has_siblings?     | Trả về true nếu có anh chị em ruột cùng cấp vs nó |  |
| is_only_child?     | Trả về true nếu nó là 1 thằng con một | `con.is_only_child? = true` |
| descendants     | Trả về hậu duệ của nó, bắt đầu từ những thành gần nó nhất | `ong_noi.descendants = [ong_noi, cha, con]` |
| descendant_ids     | Trả về id của hậu duệ của nó , bắt đầu từ những thành gần nó nhất | `ong_noi.descendant_ids = [2, 3]` |
| subtree     | trả về 1 tree lấy nó làm root, bắt đầu từ những thành gần nó nhất  | |
| subtree_ids     | trả về 1 tree lấy nó làm root, bắt đầu từ những thành gần nó nhất  | |
| depth     | trả về dộ sâu của nó, nếu nó là lá thì nó = 0  | `ong_noi.depth=2` ; `con.depth=0` |

Note:  Nếu record là root, thì các root khác được coi là anh chị em (cùng cấp)

Ngoài ra còn có các phương thức  để xác định mối quan hệ giữa 2 node:


| Phương thức | Chức năng  | Ví dụ |
| -------- | -------- | -------- | 
| parent_of?(node)	     |  Trả về True nếu nó là parent của `node` | `cha.parent_of?(con) = true` |
| root_of?(node)	     | Trả về True nếu nó là root của `node`   | `ong_noi.root_of?(con) = true`|
| ancestor_of?(node)	     | Trả về True nếu nó là ancestor của `node`   |  `cha.ancestor_of?(con) = true` |
| child_of?(node)	     | Trả về True nếu nó là cha của `node`   | `cha.child_of?(con) = false` |
| descendant_of?(node)	     | Trả về True nếu nó là child của `node`   |  `cha.descendant_of?(con) = false` |
| indirect_of?(node)	     | Trả về True nếu nó là indirect của `node`   |  `cha.indirect_of?(con) = false` |


#  7. Kết luận
Bài viết với mong muốn giúp các bạn thao tác tốt với mô hình phân cấp tree node.
Cảm ơn các bạn đã theo dõi. (thankyou)

# Tài liệu tham khảo
https://github.com/stefankroes/ancestry