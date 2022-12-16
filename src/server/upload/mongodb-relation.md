Các quan hệ của mongodb là các **NoSQL** tương đương với liên kết trong cơ sở dữ liệu quan hệ. Tuy chúng đều thực hiện những mục đích tương tự nhau, xuất hiện ở những trường hợp tương tự nhau nhưng bản chất về hành vi xử lý của chúng lại khác nhau hoàn toàn.
## NoSQL relations vs RDBMS associations
Các **Relation** (quan hệ) liên kết dữ liệu từ **model** này với **model** khác. Sâu hơn nữa thì đây chính là những gì dành các **RDBMS** liên kết. Tùy nhiên, cái cách mà dữ liệu được liên kết trong **NoSQL** lại hoàn toàn khác.
Trong cơ sở dữ liệu quan hệ truyền thống, các quan hệ được dùng để liên kết giữa bảng này với các bảng khác. **MongoDB** và các cơ sở dữ liệu **NoSQL** tương đương là các "**document-oriented**" (tức là không có bảng nào cả mà chỉ là những bản ghi thôi). Vậy thay vào đó,  các liên kết được vẽ ra ở giữa những "**bản ghi**".
### ActiveRecord
```ruby
class Post < ActiveRecord::Base
  belongs_to :author
  has_many :comments
end
```

### Mongoid (referencing)
```ruby
class Post
  include Mongoid::Document
  belongs_to :author
  has_many :comments
end
```

### Mongoid (embedding)
```ruby
class Post
  include Mongoid::Document
  embedded_in :author
  embeds_many :comments
end
```

Tất cả những class trên về cơ bản đều thực hiện liên kết giữa 1 **author** có nhiều bài post, 1 bài **posts** lại có nhiều **comments**. Nhìn vào đoạn code trên ta có thể thấy 

 **embeds_many**  <=>  **has_many** 

**embeds_in** <=>  **belongs_to**

Nhưng điều này đã làm đơn giản hóa nó đi.

## ActiveRecord
Cơ sở dữ liệu quan hệ sẽ xử lý các liên kết thông qua khóa ngoại than chiếu tới 1 hàng duy nhất của bảng khác.
Ví dụ: một **post** sẽ có một **author** tham chiếu ID của bản ghi trong bảng **authors** mà nó thuộc về. Nếu một **author** có nhiều **post**, nhiều bản ghi **post** sẽ có cùng tác giả. **author** không có post_ids.

![Relational database schema](https://miro.medium.com/max/666/1*N--OFHhEC155ulYfHhPQGQ.png)

Relational database schema

## Mongoid References

Có một cách cơ sở dữ liệu NoQuery xử lý một đến nhiều mối quan hệ là thông qua các mối quan hệ. Tham chiếu tương tự như các association trong cơ sở dữ liệu quan hệ hơn là nhúng (phần này sẽ được giải thích ở bên dưới). Mối quan hệ cũng sử dụng các khóa ngoại, tuy nhiên chúng trỏ từ document này sang document khác, thay vì một bản ghi trong một bảng này đến một bản ghi trong một bảng khác.

```javascript
// An author document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
  "name" : "Pat Whitrock"
}

// A post document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e0"),
  "author_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
  "name" : "Mongo Stuff"
}

// A comment document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e8"),
  "post_id" : ObjectId("4d3ed089fb60ab534684b7e0"),
  "content" : "Lots of stuff about Mongo."
}
```

## Mongoid Embeds

Một cách khác để cơ sở dữ liệu NoQuery xử lý loại mối quan hệ này với nhiều mối quan hệ là thông qua việc nhúng các document. Một document được nhúng trong một document khác, dẫn đến cơ bản là một ***hash*** (hàm băm) khổng lồ. Ví dụ: ***author*** sẽ nhúng nhiều tài liệu bài đăng và mỗi tài liệu bài đăng sẽ nhúng nhiều ***comment***. Mỗi ***author***  là một ***hash*** chứa một mảng các ***post***, mỗi document chứa một mảng các  ***comment***.
```javascript
// An author document.
{
  "_id" : ObjectId("4d3ed089fb60ab534684b7e9"),
  "name" : "Pat Whitrock",
  "posts" : [
    // An embedded post document.
    {
      "_id" : ObjectId("4d3ed089fb60ab534684b7e0"),
      "name" : "Mongo Stuff",
      "comments" : [
        // An embedded comment document.
        {
          "_id" : ObjectId("4d3ed089fb60ab534684b7e8"),
          "content" : "Lots of stuff about Mongo."
        }
      ]
    }
  ]
}
```

## Embedding vs Referencing

Tại sao Mongo cần có nhiều cách để xác định cùng một mối quan hệ với nhiều mối quan hệ khi các ORM như ActiveRecord chỉ yêu cầu một? Cả nhúng và tham chiếu đều là các lựa chọn hợp lý, nhưng mỗi lựa chọn phục vụ nhiều hơn cho các trường hợp sử dụng cụ thể. Có một vài điều sẽ cần được xem xét trước khi đưa ra quyết định.

Dữ liệu của bạn sẽ được kết nối từ nhiều điểm? Nếu bạn cần truy cập dữ liệu của mình từ nhiều điểm, có lẽ bạn nên sử dụng ***Referencing***. Nếu dữ liệu của bạn chỉ hữu ích liên quan đến tài liệu gốc của nó, thì ***Embedding*** là cách để đi.
Cũng quan trọng để xem xét là tính nhất quán dữ liệu và kích thước tài liệu. Các document MongoDB có thể bị giới hạn ở kích thước tối đa 4 MB, tuy nhiên, rất khó có thể đây là vấn đề bạn sẽ gặp phải sớm.

**Source**: http://pat-whitrock.github.io/blog/2014/05/07/mongodb-relations/