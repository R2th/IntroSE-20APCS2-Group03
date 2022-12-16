Mongodb là một trong những loại cơ sở dữ liệu Nosql phổ biến nhất hiện nay, thuộc kiểu document, mã nguồn mở, data được lưu dưới dạng binary json (BSON). Được viết bằng C++ nên mongodb có khả năng tính toán với tốc độ cao, hỗ trợ dynamic schema, cả vertical scaling và horizontal scaling.

Mongoid là trình ánh xạ object-document chính thức cho MongoDB trong Ruby. Ngoài các macro cơ bản để định nghĩa association giữa các document tương tự như khi sử dụng ActiveRecord thì Mongoid còn hỗ trợ các cách định nghĩa để lưu trữ dữ liệu riêng mà mình sẽ chia sẻ với các bạn dưới đây.
# Referenced Associations
Mongoid hỗ trợ các macro `has_one`, `has_many`, `belongs_to`, `has_and_belongs_to_many` để định nghĩa các association tương tự như ActiveRecord.
## Has One
`has_one` và `belongs_to` định nghĩa mối quan hệ 1-1 giữa hai collections độc lập với nhau.

**Defining**

`has_one` macro được định nghĩa ở document cha và `belongs_to` được định nghĩa ở document con:
```
class Band
  include Mongoid::Document
  has_one :studio
end

class Studio
  include Mongoid::Document
  field :name, type: String
  belongs_to :band
end
```
Việc định nghĩa `has_one` và `belongs_to` macro ở cả hai document là bắt buộc.

**Storage**

Khi định nghĩa quan hệ 1-1 của hai document như trên thì mỗi document sẽ được lưu trữ ở collection tương ứng và document con sẽ chứa `foreign key` của document cha:
```
# The parent band document.
{ "_id" : ObjectId("4d3ed089fb60ab534684b7e9") }

# The child studio document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7f1"),
  "band_id" : ObjectId("4d3ed089fb60ab534684b7e9")
}
```
## Has many
`has_many` và `belongs_to` macro được sử dụng để định nghĩa mối quan hệ 1-n giữa hai document trong mongoid.

**Defining**

```
class Band
  include Mongoid::Document
  has_many :members
end

class Member
  include Mongoid::Document
  field :name, type: String
  belongs_to :band
end
```
Tương tự việc định nghĩa hai macro là bắt buộc.

**Storage**

Tương tự với quan hệ 1-1, quan hệ 1-n sẽ định nghĩa thêm khóa ngoại ở document con:
```
# The parent band document.
{ "_id" : ObjectId("4d3ed089fb60ab534684b7e9") }

# A child member document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7f1"),
  "band_id" : ObjectId("4d3ed089fb60ab534684b7e9")
}
```
## Belongs To
`belongs_to` macro được sử dụng chung với `has_one` hoặc `has_many` macro để định nghĩa các mối quan hệ 1-1 và 1-n. `belongs_to` được định nghĩa ở document con.
## Has And Belongs To Many
Quan hệ n-n trong Mongoid được định nghĩa bằng cách sử dụng `has_and-belongs_to_many` macro. Không giống như has_and_belongs_to_many trong ActiveRecord, trong Mongoid không có `join collection` mà trong Mongoid mảng các khóa ngoại được lưu ở cả hai bên của quan hệ.

**Defining**

Cả hai bên document đều sử dụng `has_and_belongs_to_many` macro để định nghiax:
```
class Band
  include Mongoid::Document
  has_and_belongs_to_many :tags
end

class Tag
  include Mongoid::Document
  field :name, type: String
  has_and_belongs_to_many :bands
end
```
Bạn có thể định nghĩa quan hệ n-n một bên (one sided many to many):
```
class Band
  include Mongoid::Document
  has_and_belongs_to_many :tags, inverse_of: nil
end

class Tag
  include Mongoid::Document
  field :name, type: String
end
```

**Storage**

Khi định nghĩa quan hệ n-n sử dụng `has_and_belongs_to_many` macro thì ở cả hai bên document đều sẽ có trường khóa ngoại để lưu một mảng các id của document còn lại:
```
# The band document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
  "tag_ids" : [ ObjectId("4d3ed089fb60ab534684b7f2") ]
}

# The tag document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7f2"),
  "band_ids" : [ ObjectId("4d3ed089fb60ab534684b7e9") ]
}
```

# Embedded Associations
Với đặc tính NoSql của MongoDB nên nó có thể lưu trữ dữ liệu một cách mềm dẻo hơn. Mongoid hỗ trợ `embedded associations`, nó định nghĩa các quan hệ cho phép các document khác nhau được lưu trữ dưới cùng một collection. `Embedded associations` được định nghĩa sử dụng `embeds_one`, `embeds_many`, `embedded_in` macro, thêm vào đó là `recursively_embeds_one` và `recursively_embeds_many`.
## Embeds One
`embeds_one` được sử dụng cùng với `embedded_in` để định nghĩa quan hệ 1-1.

**Defining**

```
class Band
  include Mongoid::Document
  embeds_one :label
end

class Label
  include Mongoid::Document
  field :name, type: String
  embedded_in :band
end
```

**Storage**

Khi đó document Band sẽ có thêm trường label là giá trị của label
```
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
  "label" : {
    "_id" : ObjectId("4d3ed089fb60ab534684b7e0"),
    "name" : "Mute",
  }
}
```
Bạn có thể sử dụng option :store_as để định nghĩa tên của key thay vì sử dụng mặc định của nó là tên của document:
```
class Band
  include Mongoid::Document
  embeds_one :label, store_as: "lab"
end
```
khi đó thay vì trường label thì sẽ được thay bằng trường lab.
## Embeds Many
`embeds_many` được sử dụng để định nghĩa quan hệ 1-n.

**Defining**

Sử dụng `embeds_many` ở document cha để định nghĩ rằng nó có nhiều document con và trong document con sử dụng `embedded_in` để định nghĩa document cha mà nó thuộc về:
```
class Band
  include Mongoid::Document
  embeds_many :albums
end

class Album
  include Mongoid::Document
  field :name, type: String
  embedded_in :band
end
```

**Storage**

Việc lưu trữ cũng tương tự như khi sử dụng `embeds_one` nhưng thay vì giá trị của document con là một hash thì khi sử dụng `embeds_many` thì giá trị của nó là một mảng hash với key là tên của document con:
```
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
  "albums" : [
    {
      "_id" : ObjectId("4d3ed089fb60ab534684b7e0"),
      "name" : "Violator",
    }
  ]
}
```
Và bạn có thể sử dụng option `store_as` để định nghĩa chính xác key sẽ được sử dụng:
```
class Band
  include Mongoid::Document
  embeds_many :albums, store_as: "albs"
end
```
## Recursive Embedding
Bạn có thể sử dụng `recursively_embeds_one` và `recursively_embeds_many` để định nghĩa các quan hệ 1-1 và 1-n với chính document đó. Khi đó bạn có sử dụng `parent_` và `child_` method để truy cập đến nó:
```
class Tag
  include Mongoid::Document
  field :name, type: String
  recursively_embeds_many
end
# Một tag có thể có nhiều tag con khác

root = Tag.new(name: "programming")
child_one = root.child_tags.build
child_two = root.child_tags.build

root.child_tags # [ child_one, child_two ]
child_one.parent_tag # [ root ]
child_two.parent_tag # [ root ]

class Node
  include Mongoid::Document
  recursively_embeds_one
end
# Một node có thể chứa một node con khác

root = Node.new
child = Node.new
root.child_node = child

root.child_node # child
child.parent_node # root
```

# Referencing và Embedding
Như vậy chúng ta có thể sử dụng Referenced Association và Embedded Association để định nghĩa các quan hệ cho các document của chúng ta. Nhưng nó có những điểm khác biệt về việc lưu trữ dữ liệu nên mỗi cách sẽ có những trường hợp tối ưu để sử dụng nó.

Khi bạn định nghĩa một Embedded Association thì cả document cha và document con đều được lưu trữ trong cùng một collection. Vì vậy nó sẽ hữu ích khi mà cả document cha và document con được sử dụng chung với nhau.

Sử dụng Embedded Association cho phép bạn sử dụng các công cụ mà MongoDB hỗ trợ như [Aggregation pipeline](https://docs.mongodb.com/manual/coredocs.mongodb.com/mongoid/current/tutorials/mongoid-relations/#referencing-vs-embedding/aggregation-pipeline/) để có thể query dễ dàng hơn.

# Tài liệu tham khảo
https://docs.mongodb.com/mongoid/current/tutorials/mongoid-relations/#referencing-vs-embedding