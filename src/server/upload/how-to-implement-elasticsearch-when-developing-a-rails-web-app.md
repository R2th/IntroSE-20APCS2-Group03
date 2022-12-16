Lưu trữ và tìm kiếm thông tin là hai trong số những công việc quan trọng nhất đối với bất kỳ một ứng dụng web nào. Chúng ảnh hưởng đến thành công của dự án. Một web app phải lưu trữ hàng tỷ bản ghi dữ liệu khác nhau, khiến việc lưu trữ và tìm kiếm của nó trở nên vô cùng khó khăn. Và elasticsearch được sinh ra để giải quyết vấn đề này.
Trong bài viết này, mình sẽ hướng dẫn bạn quá trình tích hợp một app Ruby on Rails đơn giản với Elaticsearch.
## Defining the terms
Trước khi bắt tay vào code một web Ruby on Rails và implement thuật toán tìm kiếm chúng ta cùng lướt qua các thuật ngữ chính và cài đặt các service cần thiết.

Elaticsearch là một service tìm kiếm dựa trên dịch vụ tìm kiếm mã nguồn mở JSON-based. Nó cho phép lưu trữ, scan và phân tích dữ liệu cần thiết trong một phần nghìn giây. Service này bao gồm cả việc tích hợp các điều kiên và điều kiện tìm kiếm phức tạp.
Đó là lý do Elaticsearch được yêu thích, chẳng hạn như NASA, Microsoft, eBay, Uber, GitHub, Facebook, Warner Brothers, ....
<br>
Chúng ta cùng xem qua một vài thuật ngữ chính của Elasticsearch:
<br>**Mapping** là một quá trình xác định cách mà các document và các field được lưu trữ và đánh index.
<br>**Indexing** là một hành động để giữ lại dữ liệu trong elasticsearch, mỗi cluster có thể chứa các index khác nhau mà mỗi index có thể chứa nhiều type. Mỗi type gần giống như 1 table trong database và có 1 danh sách các field được chỉ định cho document của type đó.
<br>**Cluster** là một tập hợp các node - nơi lưu trữ toàn bộ dữ liệu, thực hiện đánh index và search giữa các node.
<br>**Node** mỗi node là 1 server bên trong cluster, là nơi lưu trữ dữ liệu, tham gia thực hiện việc đánh index của cluster, và thực hiện search.
<br>**Analysis process** là một quá trình hiển thị văn bản thành token hoặc term để tìm kiếm.
<br><br>![](https://images.viblo.asia/e53803e0-2f22-49ef-961b-104f21d59ea9.png)<br>
<br>**Analyzer** một analyzer bao gồm: character filters, tokenizer, and token filters.
<br>**Character filters** Trước hết, nó đi qua một hoặc một vài `character filters`. Nó nhận các field văn bản gốc và sau đó chuyển đổi giá trị bằng cách thêm, xóa hoặc sửa đổi các ký tự. Ví dụ: nó có thể xóa html markup khỏi văn bản.
<br>**Tokenizer**  Sau đó chúng được phân tách thành các token thường sẽ là các từ.
<br>**Token filters** gần giống như `character filters`. Sự khác biệt chính là `token filters` hoạt động với token stream, trong khi `character filters` hoạt động với character stream.
<br><br>![](https://images.viblo.asia/d5094527-7444-4914-a19f-43bb15e7c9f9.png)<br>
<br>**Inverted index** Mục đích của một `inverted index` là lưu trữ cấu trúc một văn bản cho phép tìm kiếm toàn bộ văn bản một cách nhanh chóng và hiệu quả nhất.
    <br>Chúng ta cùng xem ví dụ sau:
    Mình có hai câu như sau: “I am a Ruby programmer” và “This project was built in Ruby”.
    Vậy trong `inverted index`, chúng sẽ được lưu như sau:
    <br><br>![](https://images.viblo.asia/0d019a91-5f86-4d40-974e-c0c91a9eab4c.png)<br>
    <br>Nếu chúng ta tìm kiếm với từ khóa "Ruby" chúng ta sẽ thấy là từ khóa được tìm thấy ở trong cả hai câu:
    <br><br>![](https://images.viblo.asia/609a5f11-74d3-43f1-97c7-dd561c9189cb.png)<br>
## Step #1: Installing the tools
Trước khi bắt đầu với việc code, chúng ta cần cài đặt môi trường và service.
<br>**Install Ruby**
<br>**Install Rails**
<br>**Install Elasticsearch 6.4.0** Để chắc chắn rằng elasticsearch đã được cài đặt thành công. Bạn hãy truy cập [http://localhost:9200/](http://localhost:9200/)
<br>Chúng ta có thể thấy được một vài cấu hình của elasticsearch:
<br><br>![](https://images.viblo.asia/8c6232bc-e682-483a-8eaa-ebe4a3da6fcb.png)<br>
<br>**Install Kibana 6.4.2**
<br>Đây là giao diện sử dụng dành cho người dùng trên môi trường web. Kibana sẽ sử dụng Elashtichsearch để tìm kiếm các dữ liệu phù hợp với yêu cầu của người dùng.
<br>Để chắc chắn rằng kibana đã được cài đặt và đang chạy. Bạn hãy truy cập [http://localhost:5601/](http://localhost:5601/)
<br><br>![](https://images.viblo.asia/483d817b-edb5-4c62-ac4a-30dce3b7f824.png)<br>
## Step #2: Initiating a new Rails app
Trong ứng dụng lần này chúng ta sẽ sử dụng PostgreSQL cho Rails API:
```
rvm use 2.6.1
rails new elasticsearch_rails --api -T -d postgresql
cd elasticsearch_rails
bundle install
```
Config database trong `config/database.yml`:
```
default: &default
 adapter: postgresql
 encoding: unicode
 pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
 username: postgres

development:
 <<: *default
 database: elasticsearch_rails_development

test:
 <<: *default
 database: elasticsearch_rails_test

production:
 <<: *default
 database: elasticsearch_rails_production
 username: elasticsearch_rails
 password: <%= ENV['DB_PASSWORD'] %>
```
Rồi chạy `db:create`. Chúng ta sẽ tạo Model Location với 2 trường: name và level.
```
rails generate model location name level
```
Tiếp theo chúng ta cần fake dữ liệu ban đầu để test cho ứng dụng của bạn trong file `db/seeds.rb`. Dữ liệu đã được chuẩn bị sẵn tại [đây](https://github.com/codica2/sample-article-code-elasticsearch-rails/blob/master/db/seeds.rb)
Đừng quên `db:seed` để import dữ liệu vào database nhé!
## Step #3: Using Elasticsearch with Rails
Để tích hợp được elasticsearch vào ứng dụng chúng ta cần thêm 2 gem sau vào Gemfile:
```
gem 'elasticsearch-model'
gem 'elasticsearch-rails'
```
Đừng quên `bundle install` để cài đặt nhé!
Bây giờ chúng ta đã sẵn sàng thêm các method, chức năng vào model Location.
Chúng ta tạo file `searchable.rb` trong `app/models/concerns` với nội dung sau:
```
module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks
  end
end
```
Chúng ta include module `Searchable` vào trong class `Location`
```
class Location < ApplicationRecord
  include Searchable
end
```
Như các bạn thấy trong `searchable.rb` chúng ta có include 2 module: `Elasticsearch::Model` và `Elasticsearch::Model::Callbacks`.
<br>- Với `Elasticsearch::Model`mô-đun, chúng tôi thêm tích hợp Elaticsearch vào mô hình.
<br>- Với `Elasticsearch::Model::Callbacks` Mỗi khi một object được lưu, cập nhật hoặc xóa thì dữ liệu được index cũng được cập nhật tương ứng.
<br>Việc tiếp theo chúng ta cần làm là đánh index cho model Location. Mở rails console bằng lệnh `rails c` và thực thi câu lệnh  `Location.import force: true`.
Để kiểm tra chúng ta sử dụng kibana , truy cập [http://localhost:5601/](http://localhost:5601/) trên browser và insert `GET _cat/indices?v`.
<br>Như bạn thấy chúng ta đã tạo index với tên location
<br><br>![](https://images.viblo.asia/1ca01a91-3855-406a-b081-45c916487df8.png)<br>
Bây giờ chúng ta đã có thể thử nghiệm các câu query với dữ liệu test ban đầu. Bạn cũng có thể tham khảo các câu lệnh Elaticsearch Query DSL tại [đây].(https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
<br>Tiếp tục chúng ta cùng insert đoạn code bên dưới:
```
GET locations/_search
{
  "query": {
    "match_all": {}
  }
}
```
![](https://images.viblo.asia/82fd7f99-0eba-4943-b96c-30311a02e96b.png)<br>
<br>Các `hits` attribute  được trả về và bạn có thể thấy, tất cả các fields trong Location model đã được index.
## Step #4: Building a custom index with autocomplete functionality
Trước khi tạo một index mới chúng ta cần xóa index trước đó. Mở rails console bằng lệnh `rails c` và thực thi câu lệnh `Location.__elasticsearch__.delete_index!`, index trước đó sẽ được loại bỏ.
<br>Tiếp đên chúng ta cần thay đổi file `app/models/concerns/searchable.rb`:
```
module Searchable
 extend ActiveSupport::Concern

 included do
   include Elasticsearch::Model
   include Elasticsearch::Model::Callbacks

   def as_indexed_json(_options = {})
     as_json(only: %i[name level])
   end

   settings settings_attributes do
     mappings dynamic: false do
       # we use our autocomplete custom analyzer that we have defined above
       indexes :name,  type: :text, analyzer: :autocomplete
       indexes :level, type: :keyword
     end
   end

   def settings_attributes
     {
       index: {
         analysis: {
           analyzer: {
             # we define custom analyzer with name autocomplete
             autocomplete: {
               # type should be custom for custom analyzers
               type: :custom,
               # we use standard tokenizer
               tokenizer: :standard,
               # we apply two token filters
               # autocomplete filter is a custom filter that we defined above
               filter: %i[lowercase autocomplete]
             }
           },
           filter: {
             # we define custom token filter with name autocomplete
             autocomplete: {
               type: :edge_ngram,
               min_gram: 2,
               max_gram: 25
             }
           }
         }
       }
     }
   end
 end
end
```
Trong đoạn code trên chúng ta đã serializing các thuộc tính của model thành JSON trong method `as_indexed_json`. Chúng ta sẽ lấy ra 2 fields: `name` và `level`.
```
def as_indexed_json(_options = {})
  as_json(only: %i[name level])
end
```
Quan trọng hơn, chúng ta cũng định nghĩa cách cấu hình index.
<br>Mở rails console và kiểm tra các request đã hoạt động đúng hay chưa:
```
results = Location.search('san francisco', {})
results.map(&:name) # => ["san francisco", "american samoa"]
```
Chúng ta cũng nên kiểm tra các ngoại lệ đã được đặt ra xem chúng hoạt động chính xác chưa nhé!
```
results = Location.search('Asan francus', {})
results.map(&:name) # => ["san francisco"]
```
## Step #5: Making the search request available by API
Tiếp tục, chúng ta sẽ tạo `HomeController` để thực hiện các câu truy vấn.
```
rails generate controller Home search
```
Thêm mã code vào `HomeController`:
<br>`app/controllers/home_controller.rb`:
```
class HomeController < ApplicationController
 def search
   results = Location.search(search_params[:q], search_params)

   locations = results.map do |r|
     r.merge(r.delete('_source')).merge('id': r.delete('_id'))
   end

   render json: { locations: locations }, status: :ok
 end

 private

 def search_params
   params.permit(:q, :level)
 end
end
```
Cuối cùng, `rails s` để kiểm tra thành quả. Tới trang [http://localhost:3000//home/search?q=new&level=state](http://localhost:3000//home/search?q=new&level=state)
<br>Kết quả API trả về sẽ bao gồm những location có `name` chứa `new` và `level` bằng `state`.
```
{
  "locations": [
    {
      "_index": "locations",
      "_type": "_doc",
      "_id": "41",
      "_score": 3.676841,
      "name": "new york",
      "level": "state",
      "id": "41"
    },
    {
      "_index": "locations",
      "_type": "_doc",
      "_id": "17",
      "_score": 3.5186555,
      "name": "new jersey",
      "level": "state",
      "id": "17"
    },
    {
      "_index": "locations",
      "_type": "_doc",
      "_id": "10",
      "_score": 2.7157228,
      "name": "new hampshire",
      "level": "state",
      "id": "10"
    }
  ]
}
```
Như vậy chúng ta đã có một ứng dụng rails được tích hợp chức năng tìm kiếm của elasticsearch.
## Advantages and disadvantages
Ưu điểm:
1. Tốc độ: dùng elasticsearch trả về giá trị rất nhanh, vì chỉ cần tìm kiếm 1 term là trả về các giá trị liên quan tới term đó
2. Xây dựng trên Lucene: Vì được xây dựng trên Lucene nên Elasticesearch cung cấp khả năng tìm kiếm toàn văn bản (full-text) mạnh mẽ nhất.
3. Hướng văn bản: Nó lưu trữ các thực thể phức tạp dưới dạng JSON và đánh index tất cả các field theo cách mặc định, do vậy đạt hiệu suất cao hơn.
4. Giản đồ tự do: Nó lưu trữ số lượng lớn dữ liệu dưới dạng JSON theo cách phân tán. Nó cũng cố gắng phát hiện cấu trúc của dữ liệu và đánh index của dữ liệu hiện tại, làm cho dữ liệu trở nên thân thiện với việc tìm kiếm.

<br>Nhược điểm:
1. Elasticsearch được thiết kế cho mục đích search, do vậy với những nhiệm vụ khác ngoài search như CRUD (Create Read Update Destroy) thì elasticsearch kém thế hơn so với những database khác như Mongodb, Mysql …. Do vậy người ta ít khi dùng elasticsearch làm database chính, mà thường kết hợp nó với 1 database khác.
2. Trong elasticsearch không có khái niệm database transaction , tức là nó sẽ không đảm bảo được toàn vẹn dữ liệu trong các hoạt động Insert, Update, Delete.Tức khi chúng ta thực hiện thay đổi nhiều bản ghi nếu xảy ra lỗi thì sẽ làm cho logic của mình bị sai hay dẫn tới mất mát dữ liệu. Đây cũng là 1 phần khiến elasticsearch không nên là database chính.
3. Không thích hợp với những hệ thống thường xuyên cập nhật dữ liệu. Sẽ rất tốn kém cho việc đánh index dữ liệu.

<br>Trên đây là những tìm hiểu của mình về elasticsearch và việc tích hợp elasticsearch vào một ứng dụng rails đơn giản.
<br>Mong rằng những kiến thức trên sẽ giúp được các bạn trong việc xây dựng ứng dụng của riêng mình

<br><br>Tài liệu tham khảo:
1. [www.codica.com](https://www.codica.com/blog/developing-rails-web-app-with-elasticsearch/#step-3-using-elasticsearch-with-rails)