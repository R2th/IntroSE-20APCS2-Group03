### Bạn đã bao giờ tự hỏi, với một ứng dụng web có nhiều data, thì làm cách nào để có thể tìm kiếm hiệu quả. Và 1 công cụ mình cảm thấy hiệu quả, dễ sử dụng với ứng dụng web của chúng ta đó là elasticsearch. Ở bài viết này mình sẽ giới thiệu về elasticsearch và cách sử dụng cũng như 1 số query cơ bản để có thể làm quen 1 cách dễ dàng.
## Elasticsearch là gì?
- Theo wikipedia Elasticsearch là một công cụ tìm kiếm dựa trên phần mềm Lucene. Nó cung cấp một bộ máy tìm kiếm dạng phân tán, có đầy đủ công cụ với một giao diện web HTTP có hỗ trợ dữ liệu JSON. Elasticsearch được phát triển bằng Java và được phát hành dạng nguồn mở theo giấy phép Apache. Elasticsearch là một công cụ tìm kiếm phổ biến nhất, theo sau là Apache Solr, cũng dựa trên Lucene.
- Theo trang web Elaticsearch Elaticsearch là một công cụ phân tích và tìm kiếm RESTful phân tán, có khả năng giải quyết số lượng các trường hợp sử dụng ngày càng tăng. Nó lưu trữ tập trung dữ liệu của bạn để bạn có thể tìm kiếm 1 cách nhanh chóng và chính xác.
- Thông tin thêm về [elasticsearch](https://www.elastic.co/blog/what-is-an-elasticsearch-index)
## Một số query cơ bản.
1. Match query
match query chấp nhận text / số / ngày, phân tích chúng và xây dựng một truy vấn. Và trả về document có message match với 1 trong các từ mà chúng ta đưa vào. 
Ví dụ:
```json
GET /_search
{
    "query": {
        "match" : {
            "message" : "the computer"
        }
    }
}
```
=>message:  "the cat",  "asus computer"

2. Match phrase query
Tương tự match query nhưng nó sẽ trả về document có chứa full text mà chúng ta đưa vào.
```json
GET /_search
{
    "query": {
        "match_phrase" : {
            "message" : "the computer"
        }
    }
}
```
=>message:  "the computer is ...",  "the computer ..."

3. Match phrase prefix query
Tương tự như pharse_match query nhưng nó sẽ match chính xác term. Và nó cho phép các tiền tố khớp với thuật ngữ cuối cùng trong văn bản. Ví dụ:
```json
GET /_search
{
    "query": {
        "match_phrase_prefix" : {
            "message" : "the computer r"
        }
    }
}
```
=>message:  "the computer restarted", "the computer reboot"

5. Multi Match query
Tương tự match query nhưng thay vì tìm kiếm trên 1 trường thì chúng ta có thể tìm kiếm trên nhiều trường
```json
GET /_search
{
  "query": {
    "multi_match" : {
      "query": "the computer", 
      "fields": [ "subject", "message" ] 
    }
  }
}
```
=> message or subject: "the cat", "computer reload"

6. Bool query
Dùng đề gom nhiều query khác nhau. 
```json
POST _search
{
  "query": {
    "bool" : {
      "must" : {
        "match" : { "user" : "kimchy" }
      },
      "must_not" : {
        "range" : {
          "age" : { "gte" : 10, "lte" : 20 }
        }
      },
      "should" : [
        { "match" : { "tag" : "wow" } },
        { "match" : { "tag" : "elasticsearch" } }
      ]
    }
  }
}
```
## Cách cài đặt và sử dụng với Rails.
Có nhiều cách khác nhau để sử dụng elasticseach với rails, tuy nhiên ở đây mình sẽ sử dụng gem searchkick. Nó hỗ trợ mọi thứ cho chúng ta. chỉ việc build query và search 1 cách dễ dàng nhất.
```
gem "searchkick"
```
Tạo model
```ruby
class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
    	t.string :name
    	t.text :content

      t.timestamps
    end
  end
end
```
và 1 ít data như sau
```ruby
Product.create name: "Apple Iphone XS", content: "iOS is the world’s most personal and secure mobile operating system, packed with powerful features that help you get the most out of every day."
Product.create name: "Apple Macbook", content: "Every Mac comes with a one-year limited warranty and up to 90 days of complimentary technical support. AppleCare+ for Mac extends your coverage to three years from your AppleCare+ purchase date and adds up to two incidents of accidental damage coverage."
Product.create name: "Apple Watch", content: "Introducing Apple Watch Series 4. Fundamentally redesigned and re-engineered to help you stay even more active, healthy, and connected."
```
Thêm config vào model Product như sau:
```ruby
class Product < ApplicationRecord
	searchkick mappings: {
    product: {
      properties: {
      	id: {type: "integer"},
        name: {type: "string"},
        content: {type: "string"}
      }
    }
  }
end
```
Vào rails console và reindex để data của chúng ta được import vào db elasticsearch.
```ruby
Product.reindex
```
Truy cập vào url http://localhost:9200/products_development/_search?pretty  ta thấy được db elasticsearch đã được import thành công.
Lúc này có thể tiến hành search.
![](https://images.viblo.asia/460e486f-ade3-4988-9452-8f4e2522826a.png)
Việc search gem đã hỗ trợ function search nên chúng ta chỉ cần truyền query vào.
```ruby
products = Product.search body: {query: {match: {name: "iphone"}}}
```
kết quả mình search được.
![](https://images.viblo.asia/118aa975-41f4-4bb4-8bf8-090caf2605c0.png)
Vậy là xong, mong qua bài viết mọi người có thể dễ dàng sử dụng elasticsearch vào ứng dụng của mình. Cám ơn mọi người đã đọc.