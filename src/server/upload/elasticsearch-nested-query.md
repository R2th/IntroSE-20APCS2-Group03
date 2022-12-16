## Nested query trong elasticsearch là gì ?
Là thực hiện 1 truy vấn để tìm kiếm các đối tượng lồng nhau. Nested query tìm kiếm các đối tượng lồng nhau như thể chúng được đánh index là những tài liệu riêng biệt. Nếu một đối tượng khớp với điều kiện tìm kiếm thì nested query sẽ trả về đối tượng gốc.
## Tạo index
Để sử dụng nested query, thì index của bạn phải bao gồm những ánh xạ lồng nhau
VD:
```
PUT /my_index
{
    "mappings" : {
        "properties" : {
            "obj1" : {
                "type" : "nested"
            }
        }
    }
}
```

Trong rails chúng ta dùng gem "chewy" để khai báo và quản lý index
[chewy](https://github.com/toptal/chewy/) ở trang chủ gem chewy này sẽ có hướng dẫn config, cài đặt, nên chúng ta sẽ bỏ qua bước này.
VD: Có 2 model là User và Post. 
- User có các field (name, email), 
- Post có các field (title, content)
Chúng ta sẽ thực hiện tìm kiếm Post title để lấy ra User tạo ra bài Post đó

User có quan hệ has_many với Post. Thì dùng chewy chúng ta sẽ khai báo index nested như thế này
```
class UsersIndex < Chewy::Index
  define_type Users.includes(:posts) do
    field :id, type: :integer
    field :name, type: :text
    field :email, type: :text
    field :posts, type: :nested do
      field :id, type: :integer
      field :title , type: :text
    end
  end
end
```
- field --> khai báo tên trường cần đánh index
- type --> khai báo kiểu dữ liệu của index đó
Đến đây chung ta đã xong bước setup index để sử dụng cho nested query
## Thực hiện query search
```
GET /users/_search
{
    "query":  {
        "nested" : {
            "path" : "posts",
            "query" : {
                "bool" : {
                    "must" : [
                        { "match" : {"posts.title" : "Elasticsearch"} }
                    ]
                }
            },
            "score_mode" : "avg"
        }
    }
}
```
- path (require, string) : đường dẫn đến nested object mà bạn muốn tìm kiếm
- query (require, object query): Truy vấn bạn muốn chạy trên các đối tượng lồng nhau trong path. Nếu một đối tượng thõa mãn điều kiện, nested query sẽ trả về đối tượng gốc là User

## Các đối tượng lồng nhau nhiều cấp
cách khai báo index tương tự như trên
```
PUT /users
{
    "mappings" : {
        "properties" : {
            "posts" : {
                "type" : "nested",
                "properties" : {
                    "title" : {
                        "type" : "text"
                    },
                    "tags" : {
                        "type" : "nested",
                        "properties" : {
                            "name" : {
                                "type" : "text"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Hoặc
```
class UsersIndex < Chewy::Index
  define_type Users.includes(:posts) do
    field :id, type: :integer
    field :name, type: :text
    field :email, type: :text
    field :posts, type: :nested do
      field :id, type: :integer
      field :title , type: :text
      field :tags, type: :nested do
          field :name, type: :text
      end
    end
  end
end
```
Đối với lồng nhau nhiều cấp thế này, query search cũng tương tự như trên
```
GET /users/_search
{
    "query" : {
        "nested" : {
            "path" : "posts",
            "query" : {
                "nested" : {
                    "path" :  "posts.tags",
                    "query" :  {
                        "bool" : {
                            "must" : [
                                { "match" : { "posts.tags.name" : "ES Search" } }
                            ]
                        }
                    }
                }
            }
        }
    }
}
```

Nếu có đối tượng thõa mãn điều kiện tìm kiếm, thì nó cũng trả về đối tượng gốc User.
## Tham khảo
1: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html

2: https://github.com/toptal/chewy/