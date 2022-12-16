Gem Ancestry cho phép các bản ghi trong Ruby on Rails có thể tổ chức phân cấp dưới dạng cấu trúc cây. Và hiển thị tất cả các mối quan hệ theo cấu trúc của cây (ancestors, parent, root, children, siblings, descendants) và dĩ nhiên có thể sử dụng một câu truy vấn SQL duy nhất để có thể truy xuất toàn bộ. 

Đây là một cây phân cấp:

```
      a
      ├── ab
          │ └── abd
      └── ac
```

**Install**
```
# Gemfile
gem 'ancestry'
```
và `$ bundle install`

thêm cột ancestry vào table

`$ rails g migration add_ancestry_to_[table] ancestry:string:index`

và thêm ancestry vào model
```
class [Model] < ActiveRecord::Base
   has_ancestry
end
```

Xong một số bước đơn giản trên thì model bây giờ đã là một cây phân cấp. :+1:

**Tổ chức cây phân cấp**

Có thể sử dụng các thuộc tính của root để sắp xếp các bản ghi thành một cây. 

```
TreeNode.create! :name => 'Stinky', :parent => TreeNode.create!(:name => 'Squeeky')
```

Ở đây, tạo 1 bản ghi con có name `Stinky` và tạo root (parent) của nó với name là `Squeeky`. Hoặc nếu có sẵn một bản ghi cha với parent_id = 1 thì có thể viết thành

```
TreeNode.create! :name => 'Stinky', :prent_id => 1
```

và tạo thêm một node con cho nó

```
node.children.create :name => 'Stinky'
```

**Method được Ancestryancestors cung cấp sẵn**

* parent - parent_id: trả về bản ghi - id của bản ghi là parent của nó

* root - root_id: trả về node gốc - id của node gốc của nó

* root? - is_root?: kiểm tra bản ghi có phải là node gốc hay không

* ancestors: truy xuất các bản ghi có phân cấp lớn hơn nó (root -> parent), và ancestor_ids sẽ trả về một mảng các id tuơng ứng

* path: đường dẫn truy xuất đến chính nó, bắt đầu sẽ là từ root, và path_ids sẽ là mảng các id cha dẫn đến nó

* children - child_ids: truy xuất các phần tử con - id của các phần tử con của chính nó

* has_parent? - ancestors?: kiểm tra xem nó có parent hay không, kiểm tra ngược lại ta sẽ dùng has_children? - children?

* depth: độ sâu của node, node của root sẽ có depth là 0

Và một số method được hỗ trợ khác như `siblings, sibling_ids, has_siblings?, siblings?, is_only_child?, only_child?, descendants, descendant_ids, indirects, indirect_ids, subtree, subtree_ids`, có thể tham khảo thêm [tại đây](https://github.com/stefankroes/ancestry) nếu có nhu cầu sử dụng chúng.

Và một số method được sử dụng để xác định mối quan hệ giữa 2 node:

* parent_of?(node): kiểm tra node có phải là parent không

* root_of?(node): kiểm tra node của phải là root của nó không

* ancestor_of?(node): kiểm tra các phần tử có phân cấp lớn hơn nó có bao gồm node

* child_of?(node): kiểm tra node có phải là children không

**Options for has_ancestry**

has_ancestry sẽ được thêm vào trong model với các tùy chọn cho từng mục đích sử dụng nó

* ancestry_column:  truyền vào một symbol để lưu trữ trong một cột khác

* orphan_strategy: cách thức thực hiện khi mà node con của một node bị xóa bỏ

```
     destroy: tất cả các node con cũng sẽ bị xóa bỏ, và đây cũng là tùy chọn mặc định

     rootify: Con của node bị phá hủy sẽ trở thành node gốc

     restrict : thêm một exception nếu có node con tồn tại

     adopt: node con sẽ được thêm vào parent của node bị xóa
```

* cache_depth: lưu trữ độ sâu của từng node trong cây, với cột `aneopry_depth`, và mặc định nó sẽ không được kích hoạt, còn sau khi kích hoặt thì mặc định của nó sẽ có độ sâu là 0

Ví dụ:

```
class Role < ApplicationRecord
      has_ancestry orphan_strategy: :restrict, cache_depth: true
end
```

**Scope**

Các method điều hướng sẽ trả về các phạm vi ảnh hưởng thay vì kết quả là các bản ghi như điều kiện hay giới hạn ...

Thực hiện truy vấn và kết quả tìm được được sử dụng để đếm, kiểm tra sự tồn tại hay lấy chính nó.

```
node.children.where(name: 'Mary').exists?
node.subtree.limit(10).each { ... }
node.descendants.count
```

Và một số scope cũng được cung cấp để dễ dàng sử dụng ở từng cấp độ phân cấp

```
roots: root của node
ancestors_of(node): các node có phân cấp cao hơn nó
children_of(node): các node có phân cấp thấp hơn nó
siblings_of(node): các node có cùng phân cấp với nó
```

**Selecting nodes by depth**

Nếu như ở trên có enabled của cache_depth (has_ancestry cache_depth: true) thì có thể sử dụng thêm 5 scope để chọn các node theo độ sâu của nó.

* before_depth(depth): trả về các node có độ sâu nhỏ hơn depth (node.depth < depth)

* to_depth(depth): trả về các node có độ sâu nhỏ hơn depth và chính nó (node.depth <= depth)
 
* at_depth(depth): trả về các node với độ sâu bằng depth (node.depth == depth)

* from_depth(depth):  trả về các node có độ sâu lớn hơn depth và chính nó (node.depth >= depth)

* after_depth(depth): trả về các node có độ sâu lớn hơn depth (node.depth > depth)

Và có thể gọi đến các node con có phân cấp thấp hơn với depth scopes:

* node.subtree.to_depth(5): lấy các node con với độ sâu tối đa là 5

* node.ancestors.to_depth(3): lấy 4 node cha với phân cấp lớn nhất (bao gồm cả root)

**Arrangement**

Ancestry có thể sắp xếp toàn bộ cây con vào một hash để thuận tiện sau khi truy xuất từ cơ sở dữ liệu và sắp xếp đơn giản thông qua hàm `arrange`

```
{
  #<TreeNode id: 100018, name: "Stinky", ancestry: nil> => {
    #<TreeNode id: 100019, name: "Crunchy", ancestry: "100018"> => {
      #<TreeNode id: 100020, name: "Squeeky", ancestry: "100018/100019"> => {}
    },
    #<TreeNode id: 100021, name: "Squishy", ancestry: "100018"> => {}
  }
}

TreeNode.find_by_name('Crunchy').subtree.arrange
```

Hoặc thực hiện sắp xếp có tùy chọn

```
TreeNode.find_by_name('Crunchy').subtree.arrange(:order => :name)
```

**Sorting**

Còn nếu chỉ muốn sắp xếp một mảng các node, thay vì `arrange`, ta sẽ sử dụng phương thức `sort_by_ancestry`. Và hơn nữa, các đường dẫn đến node không hỗ được hỗ trợ sắp xếp thứ tự trong một cấp bậc, mà thứ tự của các node liên quan phụ thuốc vào thứ tự của nó ở trong mảng ban đầu.

```
TreeNode.sort_by_ancestry(array_of_nodes)
```

**STI support**

Ancestry hoạt động cùng với STI. Chỉ cần tạo ra một hệ thống cây phân cấp STI và xây dựng từ các lớp hoặc các mô hình khác nhau. Tất cả các quan hệ trong ancestry sẽ trả về các node cho dù nó ở mô hình nào đi nữa. Còn nếu chỉ muốn các nút của một lớp con cụ thể, thì cần phải thêm một điều kiện cho loại đó.

[Tài liệu tham khảo](https://github.com/stefankroes/ancestry)