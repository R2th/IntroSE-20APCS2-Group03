## Giới thiệu
Về cơ bản thì` full-text search` là một cách để tăng tốc độ tìm kiếm và chất lượng kết quả. Bạn có thể tìm hiểu thêm qua loạt bài viết sau: https://kipalog.com/posts/Full-Text-Search--Tu-Khai-Niem-den-Thuc-Tien--Phan-1. 

Trong bài viết này mình sẽ tập trung vào công dụng của `full-text search` bằng cách xây dựng một demo dựa trên framework `Ruby On Rails` và gem `search_cop`.

Về gem `search_cop`, nó là một thư viện hỗ trợ việc sử dụng `full-text search` cho ứng dụng Rails mà không cần quan tâm đến database sử dụng là gì (MySQL, PostgreSQL) hay bạn sẽ không cần phải sử dụng search server của bên thứ 3 (Elasticsearch, Solr). Khi sử dụng, ta chỉ việc viết những câu query string hoặc query dạng hash đơn giản và gem sẽ tự động sinh và tối ưu query tương ứng với database.

## Xây dựng demo

Để bắt đầu, chúng ta thêm vào Gemfile các dòng sau

```bash
gem 'search_cop'
gem "faker" //để tạo dữ liệu mẫu
```
Tiếp theo chúng ta tạo một model Article chính là đối tượng search bằng câu lệnh

```bash
rails generate model Article title:string content:string author:string
```
Câu lệnh trên sẽ sinh ra một file migration,  thêm dòng sau

```ruby
add_index :articles, [:title, :content, :author], type: :fulltext // đánh index tương ứng cho các trường
```
Tiếp theo là thực hiện fake dữ liệu

```ruby
// tạo 10000 bản ghi có dữ liệu ngẫu nhiên
require 'faker'
100000.times.each do
  Article.create!(
    title: Faker::Lorem.sentence,
    content: Faker::Lorem.paragraph,
    author: Faker::Lorem.word
  )
end
```
Cuối cùng chạy các lệnh sau để tạo cơ sở dữ liệu

```
rails db:migrate
rails db:seed
```

Thêm scope search cho model

```ruby
class Article < ApplicationRecord
  include SearchCop //để sử dụng các phương thức trong gem

  // khai báo scope search
  search_scope :search do
    attributes all: [:title, :content, :author] //khai báo tập các field muốn search

    options :all, type: :fulltext, default: true //định nghĩa chúng ta muốn sử dụng full-text search
  end
end

```
Tạo một search controller

```ruby
class SearchController < ApplicationController
  before_action :get_q, only: [:search_by_full_text, :search_by_like]
  def index;end

  def search_by_full_text
    @articles = Article.search(q) // gọi tới scope search ta định nghĩa ở trên
    @found = @articles.count // số bản ghi tìm được
    @all = Article.count // tổng số bản ghi
    render :search_result
  end

  def search_by_like
    @articles = Article.where("title LIKE ? OR content LIKE ? OR author LIKE ?",
      "%"+q+"%", "%"+q+"%", "%"+q+"%") // tìm kiếm bằng LIKE 
    @found = @articles.count
    @all = Article.count
    render :search_result
  end

  private
  attr_reader :articles, :q

  def get_q
    @q = params[:q]
  end
end
```
Định nghĩa các routes

```ruby
Rails.application.routes.draw do
  get "/search", to: 'search#index'
  post "/search_by_full_text", to: 'search#search_by_full_text'
  post "/search_by_like", to: "search#search_by_like"

  root 'search#index'
end
```

Tạo các view tương ứng

*index.html.erb*

```ruby
<div class="form-group  col-md-offset-4" style="margin-top: 120px; margin-bottom: 120px;">
  <%= form_tag "/search_by_full_text", class: "form-inline" do %>
    <%= text_field_tag :q, nil, placeholder: 'Search Full-text', class: "form-control input-lg" %>
    <%= submit_tag :search, class: "btn btn-lg btn-primary" %>
  <% end %>
</div>
<div class="form-group col-md-offset-4">
  <%= form_tag "/search_by_like", class: "form-inline" do %>
    <%= text_field_tag :q, nil, placeholder: 'Search LIKE', class: "form-control input-lg" %>
    <%= submit_tag :search, class: "btn btn-lg btn-primary" %>
  <% end %>
</div>
```
*searchresult.html.erb*

```ruby
<div class="container">
  <h2><%= @found %> / <%= @all %></h2>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>TITLE</th>
        <th>CONTENT</th>
        <th>AUTHOR</th>
      </tr>
    </thead>
    <tbody>
      <% @articles.each do |article| %>
        <tr>
          <td><%= article.id %></td>
          <td><%= article.title %></td>
          <td><%= article.content %></td>
          <td><%= article.author %></td>
        </tr>
      <% end %>
    </tbody>
  </table>
</div>
```

Chạy server và ta có kết quả như sau:

![](https://images.viblo.asia/0c60d4dd-2c10-4021-bc82-2a04739069df.png)

Thử submit từng form và so sánh kết quả. Với từ khóa là 'quis'

*Kết quả sử dụng full-text search*

![](https://images.viblo.asia/b2b91dc4-5e51-482a-9991-00708397311d.png)

*Kết quả sử dụng LIKE search*

![](https://images.viblo.asia/f812b6b5-40f0-47b5-ac1f-09c3f18c7316.png)

Đầu tiên, ta thấy được số kết quả sử dụng full-text search ít hơn (25103 so với 35545 trong 117665 bản ghi), đó là do cơ chế tính điểm cho kết quả từ đó lọc ra được các kết quả phù hợp nhất. Cũng chính vì vậy mà thứ tự kết quả cũng đã được sắp xếp theo độ liên quan khác với kết quả của search LIKE cho kết quả theo thứ tự.

Tiếp đó là về hiệu năng

![](https://images.viblo.asia/77144501-a244-437d-95f4-e6205d3a4856.png)

Câu truy vấn Article Load đầu tiên chính là query full-text search được sinh ra trong MySQL với thời gian thực hiện chỉ bằng một nửa so với query bằng LIKE.
 
 Khi truy vấn với từ khóa mà số kết quả thỏa mãn ít (chỉ có 4 bản ghi) thì sự chêch lệch còn lớn hơn!!!
 
 ![](https://images.viblo.asia/47fa7224-52e9-4f67-9957-f13f6302376e.png)


Qua bài viết, mình đã nêu ra ưu điểm vượt trội của full-text search trong trường hợp số lượng bản ghi lớn và chứa nhiều text, cùng với đó là cách sử dụng cơ bản của gem search_cop trong ứng dụng Rails. Để tìm hiểu sâu hơn bạn có thể tham khảo các tài liệu sau:

https://github.com/mrkamel/search_cop

https://kipalog.com/posts/Full-Text-Search--Tu-Khai-Niem-den-Thuc-Tien--Phan-1

Cảm ơn các bạn đã theo dõi