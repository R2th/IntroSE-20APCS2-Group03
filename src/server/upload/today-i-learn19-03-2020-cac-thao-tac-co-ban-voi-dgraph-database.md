## Lý do có series này 

Đơn giản là muốn nhờ Viblo note lại những kiến thức học được trong một ngày thôi. Đây không phải là các bài blog chia sẻ hoàn chỉnh nên mọi người có thể không cần để ý đến nó 
## Lý do học Dgraph 
Hôm nay mưa to quá và COVID thì chưa có dấu hiệu dừng lại. Dự là sẽ còn phải remote tránh dịch dài dài nên ngoài các công việc hàng ngày mình vẫn phải làm ra thì thời gian được dôi thêm khá nhiều (1 - 2h một ngày ý). Thế là lọ mọ lên Github như một thói quen check Github discovery thấy có cái này đang trending trong topic của **GraphQL** nên quyết định dành ra vài giờ để học nó biết đâu sau này có việc dùng.  

## Bắt đầu học 
### Bắt đầu với Dgraph 
* **Cài đặt Dgraph với Docker**

```shell 
docker run --rm -it -p 8000:8000 -p 8080:8080 -p 9080:9080 dgraph/standalone
```
* **Khái niệm về nodes**: Trong Graph Database tất cả các thực thể hoặc các khái niệm đều được biểu diễn dưới dạng các nodes. Nó có thể là các giao dịch, các mặt hàng, các person ... tất cả các thực thể đó đều được biểu diễn dưới dạng node. 
* **Khái niệm về cạnh edges**: Tất cả các quan hệ giữa các nốt được biểu diễn bằng các cạnh. Ví dụ trong hình sau:

![](https://docs.dgraph.io//images/tutorials/1/gs-1.JPG)
Thì chúng ta có hai node biểu diễn 2 người và một cạnh biểu diễn quan hệ follows giữa chúng. Có thể thấy hai node này có hai thuộc tính là `age` và `name`. Tất cả các thuộc tính trong một node được gọi chung là `predicates` trong Dgraph. Cạnh `follows` giữa hai node này cũng được gọi là một `predicate` mặc dù nó không phải là một string hay một số nguyên mà nó trỏ đến một node khác. 

### Tạo mới một node 
Tất cả các thao tác như create , update ,delete trong Dgraph đều được gọi là mutations. Chúng ta hay thử thêm một đoạn dữ liệu mới bằng cách vào trong tab mutate 

![](https://docs.dgraph.io//images/tutorials/1/gs-3.png)

Thêm vào đoạn dữ liệu sau:

```json 
{
  "set": [
    {
      "name": "Karthic",
      "age": 28
    },
    {
      "name": "Jessica",
      "age": 31
    }
  ]
}
```

Đoạn dữ liệu này sẽ khởi tạo hai node biểu thị cho 2 person. Tuy nhiên nó chưa thể hiện mối quan hệ giữa hai node. Để thể hiện mối quan hệ đó chúng ta cần có ột chút thay đổi nhỏ:

```json 
{
  "set": [
    {
      "name": "Karthic",
      "age": 28,
      "follows": {
        "name": "Jessica",
        "age": 31
      }
    }
  ]
}
```
### Query với hàm has 
Thử sư rdungj mode query 

```json 
{
  people(func: has(name)) {
    name
    age
  }
}
```

Sẽ list tất cả các danh sách các node có predicate `name` và trong data trả về sẽ có trương people giống như RESTful

![](https://docs.dgraph.io//images/tutorials/1/query-2.png)

### Tạo schema động 

Ngay khi thêm các predicate vào trong graph thì Dgraph mặc định sẽ sinh ra các schema tương ứng. Điều này khiến cho ứng dụng của chúng ta khá uyển chuyển tuy nhiên nếu như chúng ta muốn ràng buộc các trường nhập vào cũng phải theo một schema cố định thì cũng sẽ có cách (sẽ tìm hiểu trong những bài tiếp theo) 

## Các thao tác xử lý dữ liệu cơ bản 

### Thao tác với UID 

Khi mọt node được tạo ra trên graph sẽ tồn tại tơng ứng một `uid` và việc thêm các `predicate` hay update, xoá có thể thực hiện với các `uid` này. Việc này giống với việc sử dụng khoá chính trong cơ sở dữ liệu quan hệ. Chúng ta thử ví dụ sau:
```json 
{
  "set": [
    {
      "uid": "0x1",
      "name": "Pham Van Toan",
      "age": 28,
      "follows": {
        "uid": "0x2",
        "name": "Tran Duc Thang",
        "age": 34
      }
    }
  ]
}
```
Ví dụ này sẽ tạo ra hai user và cho chúng follow lẫn nhau. Khi cần update chúng ta cũng cần phải truyền tương ứng các `uid` vào. Để query chúng ta sẽ sử dụng 

```json 
{
  people(func: has(follows)) {
    uid
    name
    age
    follows{
      uid
      name
      age
    }
  }
}
```

và thu được kết quả như sau:

![](https://images.viblo.asia/319004d0-d73e-4ba0-ac3b-28401c424695.png)

### Thêm cạnh bằng uid 

Chúng ta muốn thêm một user nưa vào dánh sách follow của user có `uid = 0x2` như sau:

```json 
{
  "set": [
    {
      "uid": "0x2",
      "follows": {
        "uid": "0x3",
        "name": "Nguyen Trung Son",
        "age": 34
      }
    }
  ]
}
```

### Duyệt qua các cạnh.

Như vậy chúng ta đã thấy có quan hệ User 1 follow User 2 và User 2 follow User 3. Chúng ta có thể duyệt qua các cạnh này bằng cách follow như sau:

```json 
{
  people(func: has(follows)) {
    uid
    name
    age
    follows{
      uid
      name
      age
      follows{
        uid
        name
        age
      }
    }
  }
}
```
Ta được kết quả như sau 
![](https://images.viblo.asia/a7890cc4-ee89-479e-bd27-c3b9fad4b017.png)

Nhưng cách này thực sự không được gọn cho lắm. Chúng ta có thể sử dungj đệ quy để gọi 

```json 
{
  people(func: uid("0x1")) @recurse(depth: 4){
    uid
    name
    age
    follows
  }
}
```
Ta cũng thu được kết quả tương tự 
![](https://images.viblo.asia/a24570b2-7026-4402-98ff-f2298fc98581.png)


### Xoá một predicate trong node 

Để xoá một thuộc tính trong một node chúng ta sử dụng cú pháp sau 

```jsnon 
{
  delete {
    <0x4> <age> * .
  }
}
```

Tương tự để xoá đi một follow chúng ta cũng có thể sử dụng cú pháp 
```json
{
  delete {
    <0x3> <follows> * .
  }
}
```

## Các kiểu dữ liệu cơ bản trong DGraph

Để minh hoa cho phần này chúng ta sẽ xây dựng một ứng dụng blog nhỏ có mô hình như sau:

![](https://docs.dgraph.io//images/tutorials/3/a-main-graph.JPG)

Đồ thị trên bao gồm 3 thực thể là Author, Blog Post và các Tags. Có một vài ràng buộc trong graph này như sau 
* Tất cả các Author trong graph có thể có 1 hoặc nhiều blog post. Cạnh `published` biểu diễn mối quan hệ giữa một bài post và  author của nó. Cạnh này có gốc ở Author và đỉnh ở Blog node 
* Tất cả các blog post có thể có 1 hoặc nhiều tags. Cạnh `tagged` biểu diễn mối quan hệ giữa blog post và các tags của chúng. Cạnh này bắt đầu từ `blog post node` và trỏ đến `tag node`. 

Bây giờ thì dựng graph thôi 

```json 
{
 "set": [
  {
   "author_name": "John Campbell",
   "rating": 4.1,
   "published": [
    {
     "title": "Dgraph's recap of GraphQL Conf - Berlin 2019",
     "url": "https://blog.dgraph.io/post/graphql-conf-19/",
     "content": "We took part in the recently held GraphQL conference in Berlin. The experience was fascinating, and we were amazed by the high voltage enthusiasm in the GraphQL community. Now, we couldn’t help ourselves from sharing this with Dgraph’s community! This is the story of the GraphQL conference in Berlin.",
     "likes": 100,
     "dislikes": 4,
     "publish_time": "2018-06-25T02:30:00",
     "tagged": [
      {
       "uid": "_:graphql",
       "tag_name": "graphql"
      },
      {
       "uid": "_:devrel",
       "tag_name": "devrel"
      }
     ]
    },
    {
     "title": "Dgraph Labs wants you!",
     "url": "https://blog.dgraph.io/post/hiring-19/",
     "content": "We recently announced our successful Series A fundraise and, since then, many people have shown interest to join our team. We are very grateful to have so many people interested in joining our team! We also realized that the job openings were neither really up to date nor covered all of the roles that we are looking for. This is why we decided to spend some time rewriting them and the result is these six new job openings!.",
     "likes": 60,
     "dislikes": 2,
     "publish_time": "2018-08-25T03:45:00",
     "tagged": [
      {
       "uid": "_:hiring",
       "tag_name": "hiring"
      },
      {
       "uid": "_:careers",
       "tag_name": "careers"
      }
     ]
    }
   ]
  },
  {
   "author_name": "John Travis",
   "rating": 4.5,
   "published": [
    {
     "title": "How Dgraph Labs Raised Series A",
     "url": "https://blog.dgraph.io/post/how-dgraph-labs-raised-series-a/",
     "content": "I’m really excited to announce that Dgraph has raised $11.5M in Series A funding. This round is led by Redpoint Ventures, with investment from our previous lead, Bain Capital Ventures, and participation from all our existing investors – Blackbird, Grok and AirTree. With this round, Satish Dharmaraj joins Dgraph’s board of directors, which includes Salil Deshpande from Bain and myself. Their guidance is exactly what we need as we transition from building a product to bringing it to market. So, thanks to all our investors!.",
     "likes": 139,
     "dislikes": 6,
     "publish_time": "2019-07-11T01:45:00",
     "tagged": [
      {
       "uid": "_:annoucement",
       "tag_name": "annoucement"
      },
      {
       "uid": "_:funding",
       "tag_name": "funding"
      }
     ]
    },
    {
     "title": "Celebrating 10,000 GitHub Stars",
     "url": "https://blog.dgraph.io/post/10k-github-stars/",
     "content": "Dgraph is celebrating the milestone of reaching 10,000 GitHub stars 🎉. This wouldn’t have happened without all of you, so we want to thank the awesome community for being with us all the way along. This milestone comes at an exciting time for Dgraph.",
     "likes": 33,
     "dislikes": 12,
     "publish_time": "2017-03-11T01:45:00",
     "tagged": [
      {
       "uid": "_:devrel"
      },
      {
       "uid": "_:annoucement"
      }
     ]
    }
   ]
  },
  {
   "author_name": "Katie Perry",
   "rating": 3.9,
   "published": [
    {
     "title": "Migrating data from SQL to Dgraph!",
     "url": "https://blog.dgraph.io/post/migrating-from-sql-to-dgraph/",
     "content": "Dgraph is rapidly gaining reputation as an easy to use database to build apps upon. Many new users of Dgraph have existing relational databases that they want to migrate from. In particular, we get asked a lot about how to migrate data from MySQL to Dgraph. In this article, we present a tool that makes this migration really easy: all a user needs to do is write a small 3 lines configuration file and type in 2 commands. In essence, this tool bridges one of the best technologies of the 20th century with one of the best ones of the 21st (if you ask us).",
     "likes": 20,
     "dislikes": 1,
     "publish_time": "2018-08-25T01:44:00",
     "tagged": [
      {
       "uid": "_:tutorial",
       "tag_name": "tutorial"
      }
     ]
    },
    {
     "title": "Building a To-Do List React App with Dgraph",
     "url": "https://blog.dgraph.io/post/building-todo-list-react-dgraph/",
     "content": "In this tutorial we will build a To-Do List application using React JavaScript library and Dgraph as a backend database. We will use dgraph-js-http — a library designed to greatly simplify the life of JavaScript developers when accessing Dgraph databases.",
     "likes": 97,
     "dislikes": 5,
     "publish_time": "2019-02-11T03:33:00",
     "tagged": [
      {
       "uid": "_:tutorial"
      },
      {
       "uid": "_:devrel"
      },
      {
       "uid": "_:javascript",
       "tag_name": "javascript"
      }
     ]
    }
   ]
  }
 ]
}

```

Sau khi dựng graph sang phần query để truy vấn thử 
```json 
{
  people(func: has(published)){
    author_name
    rating
    published {
      title
      url
      tagged {
        tag_name
      }
    }
  }
}
```

Sau đó thu được graph như sau:

![](https://images.viblo.asia/4480867b-3620-4b75-8f61-6f051ed07b9f.png)

Trong graph trên chúng ta thấy có 
* 3 node author màu xanh dương 
* mỗi author có 2 blog post màu xah lá cây 
* mỗi post có một vài tag màu hồng, có thể là các tag riêng hoặc nhiều post share chung một vài common tag 

### Kiểu dữ liệu cho các predicates
Bình thường thì các kiểu dữ liệu cho các predicate sẽ được tự động detect sau khi tạo graph thành công. Có thể xem trên hình 

![](https://docs.dgraph.io//images/tutorials/3/a-initial.png)

Các kiểu dữ liệu cơ bản bao gồm `string, float, int` hay `uid` và Dgraph còn có nhiều kểu dữ liệu khác như `geo, datetime, boolean` trong đó 
* Kiểu `uid` cung cấp cạnh liên kết giữa hai node 
* Mảng `[uid]` biểu diễn một collections của các `uid` biểu thị cho việc biểu diễn nhiều relationships

### Truy vấn giá trị của các predicates 

Ngoài việc sử dụng hàm `has` như trên thì chúng ta còn có các hàm khác sử dụng để truy vấn dữ liệu với các ý nghĩa lần lượt như hình dưới 

![](https://images.viblo.asia/efae14c4-1891-4687-8ffa-317bdf16ec47.png)

Chúng ta cùng thử ví dụ tìm ra các best_author với rule là các điểm rating cao hơn 4.0

```json 
{
  best_authors(func: ge(rating, 4.0)){
    uid
    author_name
    rating
  }
}
```

Tuy nhiên chúng ta thấy kết quả báo trường rating chưa được đánh index 

![](https://docs.dgraph.io//images/tutorials/3/b-index-missing.png)

> **Note**: Chúng táex không thể query giá trị của một predicate nếu như predicate đó chưa được đánh index

### Đánh index cho predicate 

Indexx là kĩ thuật giúp cho việc query trên predicate được thực hiện với tốc độ nhanh hơn và nó là bắt buộc khi muốn query giá trị của một predicate. Dgraph cung cấp các loại index khác nhau cho từng kiểu dữ liệu cụ thể như trong bảng sau 

![](https://images.viblo.asia/e888c0a7-d594-4376-80cd-e776bd152b83.png)

Để đặt index có thể sử dụng tab Schema trên giao diện  

![](https://docs.dgraph.io//images/tutorials/3/c-add-schema.png)

Sau khi đánh index chúng ta tiến hành query lại và sẽ nhận được kết quả thành công  

![](https://docs.dgraph.io//images/tutorials/3/d-rating-query.png)

### Filter cạnh trên query 
Câu query trên giúp chúng ta lấy các thông tin của author. Giờ chúng ta muốn lấy thêm các blog post tương ứng của author đó thì làm thế nào 

```json 
{
  authors_and_ratings(func: ge(rating, 4.0)) {
    uid
    author_name
    rating
    published {
      title
      content
      dislikes
    }
  }
}
```

Chúng a thu được kết quả như sau 

![](https://images.viblo.asia/7ce51957-1ad3-48e2-b683-619c1888324c.png)

Bây giờ muốn filter các bài viết với số lượng dislike nhỏ hơn 12 thì làm thế nào. Chúng ta sử dụng `@filter` nó giống như một decorator của Python. Lúc này câu query sẽ trở thành 


```json 
{
  best_authors(func: ge(rating, 4.0)){
    uid
    author_name
    rating
    published @filter(lt(dislikes, 10)){
      title
      content
      dislikes 
    }
  }
}
```

Và chúng ta cũng cần phải đánh index cho predicate dislikes này. Sau đó thu được kết quả như sau:

![](https://images.viblo.asia/68c7d5bd-c321-438e-b2c6-cab4a2eb34bc.png)

###  Query với string predicate 

Với predicate kiểu dữ liệu là `string` thì trước tiên cũng cần phải đánh index cho chúng. Tuy nhiên index của predicate string này có nhiều loại khác nhau 

![](https://docs.dgraph.io//images/tutorials/3/p-string-index-2.png)

trong đó ý nghĩa từng loại như sau:

* `fulltext, term, trigram` là một vài loại cao siêu hơn (giống như tokenizer trong NLP) 
* `exact` index chỉ sử dụng cho các query `eq, gt, lt, ge, le` ngoài ra sử dụng các query khác sẽ báo lỗi 
* `hash` index sẽ giúp cho việc query `eq` được nhanh hơn nhưng chỉ dùng cho `eq` thôi 

![](https://docs.dgraph.io//images/tutorials/3/m-hash.png)

Sau đó query thử 

```json 
{
  tags(func: eq(tag_name, "devrel")){
    tag_name
  }
}
```

### Query với reverse edges 

Trong đồ thị chúng ta nhìn thấy lúc đầu thì các relationship đang là 1 chiều. Vậy nên nếu muốn querry các bài viết đã gắn thẻ xuất phát từ node tags thì câu truy vấn sau không   có tác dụng 

```json 
{
  devrel_tag(func: eq(tag_name,"devrel")) {
    tag_name
    tagged {
        title
        content
    }
  }
}
```

Muốn làm như vậy thì cần phải thêm mode reverse vào tagged bằng cách thêm `~tagged`. Query thử thấy xuất hiện lỗi do chưa đánh reverse 
![](https://docs.dgraph.io//images/tutorials/3/r-reverse-2.png)

Sau khi đánh rerverse xong thì kết quả thu được 

![](https://images.viblo.asia/65e44a59-0ffe-4870-9939-4ba2a3cc3a82.png)

## Tổng kết và nhận xét 

* Dùng Dgraph khá dễ dàng
* Thao tác trên RavelUI rất tiện và trực quan 
* Các thao tác với dữ liệu khá đơn giản 
* Kì vọng một cái gì đó hay ho hơn nhưng cảm nhận chung là nó khá dễ dùng và trực quan