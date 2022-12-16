# Cài đặt ElasticSearch
* Các bạn download file ZIP tại: https://www.elastic.co/downloads/elasticsearch
* Giải nén, cd tới thư mục elasticsearch
* Setup ElasticSearch:  bin/elasticsearch
* Kiểm tra server ElasticSearch: curl -X GET http://localhost:9200/
* Nếu thành công, bạn sẽ nhìn thấy màn hình:

![](https://images.viblo.asia/102ca7b4-72b2-4f89-a13e-05d77c4bc2aa.png)

Note: Nếu bạn gặp lỗi về JDK, hãy kiểm tra lại để chắc chắn bạn sử dụng cùng version jdk và jre

```ruby
sudo update-alternatives --config java

sudo update-alternatives --config javac
```
# Áp dụng ElasticSearch vào ứng dụng Ruby on Rails
* Trước hết, các bạn cần thêm 2 gem dưới vào Gemfile và bundle
```ruby
gem 'elasticsearch-model'
gem 'elasticsearch-rails'
```
* Tạo file:  `concerns/searchable.rb`
```ruby
#app/models/concerns/searchable.rb

require 'elasticsearch/model'

module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    def self.search_by(type, query)
      self.search("#{type}:#{query}")
    end
  end

end
```
* Include Searchable Model vào model
```ruby
# app/models/user.rb

class User &lt; ActiveRecord::Base
  include Searchable
...
end
```
* Create `lib/tasks/elasticsearch.rake` và add đoạn code sau:
```ruby
require 'elasticsearch/rails/tasks/import'
```
* Chạy rake command trên terminal để import data từ model vào ElasticSearch
```ruby
rake environment elasticsearch:import:all
```
* Bạn có thể sẽ chỉ muốn index một số fields nhất định của Model để giảm bộ nhớ cho ElasticSearch
```ruby
# app/models/user.rb
class User &lt; ActiveRecord::Base
...
  def as_indexed_json(options = {})
    self.as_json({
      only: [:name, :email],
      include: {
        books: { only: :name }
      }
    })
  end
end
```
## Test bằng Rails Console
```ruby
User.search('*').map { |u| u.name }

User.search('ColinDao').records.to_a

User.search('Tech Master').results.total

@users = User.search(params[:q]).page(params[:page]).records

response = User.search query: {match: {name: 'Tech Master'}}

# Nếu bạn muốn sử dụng partial query , bạn có thể tìm hiểu về query string query
# Bạn cũng có thể truyền params page và size để request
Book.search(query: { query_string: {query: "title: *Ruby*"}}, size: 15, from: 2).records.map{|b| b.price}
```
### Cảm ơn các bạn đã đọc.