Searchkick là gem support search sử dụng Elasticsearch.<br>
Searchkick support các tính năng sau:<br>
- stemming ví dụ `tomatoes` sẽ match với `tomato`
- special characters ví dụ `jalapeno` sẽ match với `jalapeño` 
- extra whitespace ví dụ `dishwasher` sẽ match với `dish washer`
- misspellings ví dụ `zuchini` sẽ match với `zucchini`
- custom synonyms ví dụ `pop` sẽ match với `soda` <br>

Bên cạnh đó còn có:<br>
-  query like SQL
-  reindex without downtime
-  personalize result for each user
-  auto complete
-  "Did you mean" suggestions
-  supports manu languages
-  work with ActiveRecord, Mongoid và NoBrainer

# 1. Getting started:
- Chúng ta sẽ tạo 1 project để bắt đầu tìm hiểu gem seachkick
    ```ruby
    rails new elastic_search
    rails g model product name
    rails db:migrate
    ```
- Cài đặt các gem cần thiết
    ```ruby
    # Gemfile
    gem "ffaker"
    gem "searchkick"
    ```
- Tạo seed file
    ```ruby
    # db/seeds.rb
    100.times do
      Product.create name: FFaker::Lorem.words.join(" ")
    end
    ```
- Thêm searchkick vào Product
    ```ruby
    # app/models/product.rb
    class Product < ApplicationRecord
      searchkick
    end
    ```
- Chạy reindex cho Product trên rails console để push data lên server Elasticsearch
    ```ruby
    Product.reindex
    ```
- Sau khi đã chạy xong reindex, bạn có thể dùng searchkick để search product
    ```ruby
    Product.search("perferendis")
    ```
- Hoặc để search tất cả product thì ta search với key word là "*"
    ```ruby
    Product.search("*")
    ```
- Bạn có thể thấy trên log console, searchkick đã tạo 1 request dưới dạng curl sử dụng Elasticsearch DSL, chúng ta sẽ tìm hiểu kỹ thêm về Elasticsearch DSL ở bài sau
![](https://images.viblo.asia/0acda870-6ad3-4c38-a0c8-15375656b1be.png)
- Trong source code tham khảo đã implement sẵn 2 service để bạn có thể thử 2 loại query cơ bản trên
    ```ruby
    Search::AllService.new.perform
    Search::SimpleService.new("your key word").perform
    ```
# 2. Querying:
## a. Where with specific value:
- Searchkick nhận câu query như câu query của SQL để search.
- Ví dụ:
    ```ruby
    Product.search "your key word", where: {in_stock: true}
    ```
- Trong câu query, `params` where nhận giá trị là `hash` dạng `key-value`
- Trong đó key là tên của attribute, value là mô tả giá trị của attribute đó
- Searchkick sẽ thực hiện filter và chỉ search trên các product có các attribute thỏa giá trị của params where.
-  Trong ví dụ trên chỉ thực hiện trên các product có attribute in_stock là true.
- Trong source code tham khảo đã implement sẵn service để bạn có thể thử query where
    ```ruby
    Search::Where::SimpleService.new("your key word", in_stock: false).perform
    ```
## b. Where with range value:
- Trong các trường hợp giá trị của attribute không phải là giá trị biết trước (như true hoặc false) mà nằm trong 1 khoảng giá trị nhất định (như từ 10 đến 20) ta sử dụng câu truy vấn với `gte` và `lte`.
- Ví dụ:
    ```ruby
    Product.search "your key word", where: {orders_count: {gte: 10, lte: 20}}
    Product.search "your key word", where: {orders_count: (10..20}}
    ```
 - Trong source code tham khảo đã implement sẵn service để bạn có thể thử query where với `gte` và `lte`
    ```ruby
    Search::Where::RangeService.new("your key wor", gte: "10", lte: "20").perform
    ```
 ## c. Where with in:
 - Trong trường hợp giá trị của attribute không nằm trong 1 khoảng liên tục (ví dụ: `[1, 2, 3, 4, 5]`) mà là 1 mảng rới rạc (ví dụ `[1, 3, 5]`) ta sử dụng câu truy vấn với `in`:
 - Ví dụ:
    ```ruby
    Product.search "your key word", where: {store_id: {in: [1, 3, 5, 7, 9]}}
    ```
 - Trong source code tham khảo đã implement sẵn service để bạn có thể thử query where với `in`
    ```ruby
    Search::Where::InService.new("your key word", store_ids: [1, 3, 5, 7, 9]).perform
    ```
 ## d. Where with not:
 - Ngược lại với in ta có `not`, searchkick sẽ search trên các product có giá trị của attribute không nằm trong mảng giá trị cho trước:
 - Ví dụ:
    ```ruby
    Product.search "your key word", where: {store_id: {not: [1, 3, 5, 7, 9]}}
    ```
 - Trong source code tham khảo đã implement sẵn service để bạn có thể thử query where với `not`
    ```ruby
    Search::Where::NotService.new("your key word", store_ids: [1, 3, 5, 7, 9]).perform
    ```
  ## e. Where with all:
 - Tương tự với với in ta có `all`, searchkick sẽ search trên các product có giá trị của attribute bằng với mảng giá trị cho trước:
 - Ví dụ:
    ```ruby
    # Trả về các product có product.store_id là 1 hoặc 3, 5, 7 
    Product.search "your key word", where: {store_id: {in: [1, 3, 5, 7, 9]}}
    
    # Trả về các product có product.store_id là [1, 3, 5, 7, 9]
    Product.search "your key word", where: {store_id: {all: [1, 3, 5, 7, 9]}}
    ```
 - Trong source code tham khảo đã implement sẵn service để bạn có thể thử query where với `not`
    ```ruby
    Search::Where::AllService.new("your key word", store_ids: [1, 3, 5, 7, 9]).perform
    Search::Where::AllService.new("your key word", store_ids: [1]).perform
    ```
- Với câu truy vấn thứ nhất kết quả trả về luôn là mảng rỗng vì `product.store_id` không bap giờ trả về mảng
## f: Where with all and array value:
- Với lý do đã nêu ở trên, `all` thường được dùng với các attribute trả về mảng hơn là gia trị duy nhất.
- Mình tạo thêm các model có quan hệ như sau
    ```ruby
    # app/models/product.rb
    has_many :order_details
    has_many :orders, through: :order_details

    # app/models/order.rb
    has_many :order_details
    has_many :products, through: :order_details
    ```
- Khi đó ta có thể gọi product.order_ids và nhận được giá trị trả về là mảng
    ```ruby
    Product.first.order_ids = [1, 2, 3]
    ```
- Ta thử search product theo order_ids sử dụng all như sau
- Ví dụ:
    ```ruby
    Product.search("your key word", where: {order_ids: [1, 2, 3])
    ```
- Kết quả trả về luôn là mảng rỗng.
## g: Where with all and search_data and  search_import:
- Nguyên nhân là vì khi thực hiện reindex, data searchkick gửi lên elasticsearch mặc định là các column của table Product.
- Tức là searchkick chỉ gửi lên elasticsearch data về `id`, `name`, `created_at`, `updated_at`, `in_stock`, `orders_count` và `store_id`.
- Do đó khi search với order_ids của product thì elasticsearch luôn trả về mảng rỗng.
- Searchkick quy định data gửi lên elasticsearch bằng method `search_data`, sửa lại method này như sau và thêm scope `search_import` như sau
    ```ruby
    # app/models/product.rb
    class Product < ApplicationRecord
      belongs_to :store
      has_many :order_details
      has_many :orders, through: :order_details

      searchkick

      scope :search_import, -> {includes(:orders)}

      def search_data
        attributes.merge order_ids: order_ids 
      end
    end
    ```
- Thực hiện reindex cho Product
    ```ruby
    Product.reindex
    ```
- Chạy lại câu query với `all` và ta thu được kết quả
    ```ruby
    Product.search("your key word", where: {order_ids: [1, 2, 3])
    ```
- Chúng ta sẽ tìm hiểu về `search_data` và `search_import` kĩ hơn ở phần sau.
- **Chú ý** câu query `all` chỉ search trên các product có order_ids là mảng con hoặc chính là mảng tham số truyền vào. 
 - Trong source code tham khảo đã implement sẵn service để bạn có thể thử query where với `not`
    ```ruby
    Search::Where::AllWithArrayService.new("your key word", order_ids: [1, 2, 3]).perform
    ```
## h: Where with exists:
- Ta cũng có thể thực hiện filter trên các product có store_id với query `exists: true`.
    ```ruby
    Product.search("your key word", where: {store_id: {exists: true}})
    ```
- Tuy nhiên để filter trên các product có store_id là nil thì không sử dụng query exists: true được mà phải gọi trực tiếp `store_id: nil` như sau
    ```ruby
    Product.search("your key word", where: {store_id: nil})
    ```
- Trong source code tham khảo đã implement sẵn service để bạn có thể query với 2 trường hợp trên
    ```ruby
    Search::Where::ExistsService.new("your key word", store_exists: true).perform
    Search::Where::ExistsService.new("your key word", store_exists: false).perform
    ```
## i: Where with and:
- Operator mặc định của where là `and`, record trả về phải thỏa tất cả query của where, ví dụ
    ```ruby
    Product.search("your key word", where: {store_id: 1, orders_count: {gte: 70, lte: 100}})
    ```
- Ta có thể viết lại với query `_and` như sau
    ```ruby
    Product.search("your key word", where: {
      _and: [
        {store_id: 1},
        {orders_count: (70..100)}
      ]
    })
    
    Search::Where::AndService.new("your key word", store_id: 1, orders_count: 70..100).perform
    ```
## j: Where with or:
- Trong trường hợp filter các product thỏa 1 trong 2 mệnh đề thì ta sử dụng query `_or` như sau
    ```ruby
    Product.search("your key word", where: {
      _or: [
        {store_id: 1},
        {orders_count: (70..100)}
      ]
    })
    
    Search::Where::OrService.new("your key word", store_id: 1, orders_count: 70..100).perform
    ```
## k: Where with not:
- Trong trường loại của query `_not`, ta chỉ có thể truyền 1 attribute thay vì nhiều attribute
- Ví dụ `_not` với `store_id`
    ```ruby
    Product.search("your key word", where: {
      _not: {store_id: 1}
    })
    
    Search::Where::NotStoreIdService.new("your key word", store_id: 1).perform
    ```
- Ví dụ `_not` với `orders_count`
    ```ruby
    Product.search("your key word", where: {
      _not: {orders_count: 70..100}
    })
    
    Search::Where::NotOrdersCountService.new("your key word", orders_count: 70..100).perform
    ```
- Trong trường hợp truyền nhiều attribute thì searchkick sẽ filter với attribute sau cùng
- Ví dụ:
    ```ruby
    Product.search("your key word", where: {
      _not: {store_id: 1},
      _not: {orders_count: 70..100}
    })
    ```
- Sẽ tương đương với
    ```ruby
    Product.search("your key word", where: {
      _not: {orders_count: 70..100}
    })
    ```
# 3. Fields:
- Theo mặc định, elasticsearch sẽ search trên tất cả các attribute của product, ta có thể chỉ định elasticsearch chỉ search trên 1 vài attribute thông qua option `fields`
- Ví dụ:
    ```ruby
    Product.search("your key word", fields: ["*"])
    Product.search("your key word", fields: [:name])
    Product.search("your key word", fields: [:description])
    ```
- Trong source code tham khảo có implement service để bạn search với `fields` options
    ```ruby
    Search::FieldsService.new("your key word", fields: ["*"]).perform
    Search::FieldsService.new("your key word", fields: [:name]).perform
    Search::FieldsService.new("your key word", fields: [:description]).perform
    ```
# 4. Limit and offset:
- Searchkick cung cấp thêm 2 option là `offset` và `limit` có tác dụng tương tự `offset` và `limit` trong SQL.
- Ví dụ:
    ```ruby
    Product.search("your key word", limit: 10, offset: 20)
    ```
- Searchlick sẽ bỏ qua 20 product đầu tiên trong các product tìm được và chỉ trả về 10 product.
- Trong source code tham khảo có implement service để bạn search với `limit` và `offset`.
    ```ruby
    Search::LimitOffsetService.new("your key word", limit: 10, offset: 20).perform
    ```
# 5. Results:
- Method `search` của searchkick trả về `Searchkick::Results` object.
- Ta có thể coi object này như array và gọi các method của array như sau
    ```ruby
    results = Product.search("your key word")
    results.size
    results.length
    results.any?
    results.each {|result| ... }
    ```
- `Searchkick::Result` còn có thêm 2 method là `took` và `response`
    ```ruby
    # thời gian thực hiện search (ms)
    results.took

    # response elasticsearch trả về (JSON)
    results.response
    ```
- `Searchkick::Result` còn có thêm 1 method là `total_count` trả về toàn bộ product search được khi chưa pagination, khác với method `count`, `length` hay `size` 
-  Ví dụ
    ```ruby
    Product.search("your key word", limit: 10).length      # 10
    Product.search("your key word", limit: 10).size        # 10
    Product.search("your key word", limit: 10).count       # 10
    Product.search("your key word", limit: 10).total_count # 100
    ```

# 6. Source code
- Github: https://github.com/thanhlt-1007/elastic_search