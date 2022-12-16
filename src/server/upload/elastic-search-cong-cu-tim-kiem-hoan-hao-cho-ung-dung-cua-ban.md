## 1. Lời mở đầu
Xin chào tất cả các bạn lại là mình đây, mấy ngày cuối tuần buồn quá sinh ra nông nổi lại tìm tòi cái mới để giới thiệu với các bạn đây :hammer_and_pick:.

Đối với những bạn code thì hay gặp dự án mà có hợp đồng, bảo hiểm, hay các một bảng có nhiều cột, mà chúng ta lại muốn tìm kiếm bản ghi khi search nhiều trường. Đối với phương pháp thủ công dùng câu lệnh query chúng ta tạo bằng tay, hay đối với ruby on rails là có một số gem hỗ trợ search như (Ransack, Searchlogic, Searchkick...) thì cấu trúc câu query cũng như form chúng ta tạo rất vất vả. Những loại search như trên chúng ta cũng chỉ search tối đa dưới 5 trường là ổn còn tầm 15-20 trường mà search theo kiểu đó thì làm rất là khổ.

Do đó mình mới đây có tìm hiểu cách giải quyết vấn đề trên là sử dụng Elastic Search. Chắc nghe cụm từ này đối với người lão làng thì ko còn xa lạ gì nữa nhỉ. Không lan man nữa mình cùng đi tìm hiểu ở phần dưới nhé :muscle:

## 2. Giới thiệu về Elastic Search

### 2.1. Elastic Search là gì?
Elastic Search là một công cụ tìm kiếm dựa trên nền tảng Apache Lucene. Nó cung cấp một bộ máy tìm kiếm dạng phân tán, có đầy đủ công cụ với một giao diện web HTTP có hỗ trợ dữ liệu JSON. Elastic Search được phát triển bằng Java và được phát hành dạng nguồn mở theo giấy phép Apache.

Một số công ty đang sử dụng:
- Wikimedia
- Adobe Systems
- Facebook
- SoundCloud
- GitHub
- ....

Elasticsearch hoạt động như thế nào?
- Elastic Search là 1 server riêng biệt để “phục vụ” việc tìm kiếm dữ liệu. Elastic Search sẽ chạy một cổng (dưới local default là 9200). Người ta cũng có thể dùng Elastic Search là DB chính nhưng thường không ai làm thế vì cái gì cũng có nhiệm vụ riêng biệt của nó.

- Elastic Search không mạnh trong các thao tác CRUD, nên thường sẽ dùng song song với 1 DB chính (SQL, MySQL, MongoDB …)

Ưu điểm: 
 - Tìm kiếm dữ liệu rất nhanh chóng, mạnh mẽ dựa trên Apache Lucene ( near-realtime searching).
- Có khả năng phân tích dữ liệu (Analysis data).
- Khả năng mở rộng theo chiều ngang tuyệt vời.
- Hỗ trợ tìm kiếm mờ (fuzzy), tức là từ khóa tìm kiếm có thể bị sai lỗi chính tả hay không đúng cú pháp thì vẫn có khả năng Elastic Search trả về kết quả tốt.
- Hỗ trợ Structured Query DSL (Domain-Specific Language ), cung cấp việc đặc tả những câu truy vấn phức tạp một cách cụ thể và rõ ràng bằng JSON.
- Hỗ trợ nhiều Elastic Search client như Java, PhP, Javascript, Ruby, .NET, Python

Nhược điểm: 
- Elastic Search được thiết kế cho mục đích search, do vậy với những nhiệm vụ khác ngoài search như CRUD thì elastic kém thế hơn so với những database khác như Mongodb, Mysql …. Do vậy người ta ít khi dùng elasticsearch làm database chính, mà thường kết hợp nó với 1 database khác.
- Trong Elastic Search không có khái niệm database transaction , tức là nó sẽ không đảm bảo được toàn vẹn dữ liệu trong các hoạt động Insert, Update, Delete.Tức khi chúng ta thực hiện thay đổi nhiều bản ghi nếu xảy ra lỗi thì sẽ làm cho logic của mình bị sai hay dẫn tới mất mát dữ liệu. Đây cũng là 1 phần khiến Elastic Search không nên là database chính.
- Không thích hợp với những hệ thống thường xuyên cập nhật dữ liệu. Sẽ rất tốn kém cho việc đánh index dữ liệu.

### 2.2. Cách cài đặt
Đối với cách cài đặt thì các bạn vào link https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html để có hướng dẫn chi tiết hơn nhé.

Tải xuống và cài đặt PGP Key:
```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```

Cách 1: Cài Elastic Search bằng APT Repository

Cài gói `apt-transport-https`
```
sudo apt-get install apt-transport-https
```
Lưu định nghĩa kho lưu trữ vào  `/etc/apt/sources.list.d/elastic-7.x.list`
```
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
```
Cài đặt Elastic Search bằng lệnh:
```
sudo apt-get update && sudo apt-get install elasticsearch
```

Cách 2: Tải và cài đặt Elastic Search thủ công (Debian package manually)
```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.8.0-amd64.deb
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.8.0-amd64.deb.sha512
shasum -a 512 -c elasticsearch-7.8.0-amd64.deb.sha512 
sudo dpkg -i elasticsearch-7.8.0-amd64.deb
```

Ok đến đây là chúng ta đã cài đặt thành công elasticsearch. Có một số câu lệnh chúng ta thao tác với Elastic Search như sau:

Kích hoạt serivce Elastic Search:
```
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable elasticsearch.service
```
Và bật, tắt Elastic Search.
```
sudo -i service elasticsearch start
sudo -i service elasticsearch stop
```
Xem trạng thái run của Elastic Search, ở ảnh dưới của mình đang là `running` tức là mình có thể sử dụng Elastic Search vào ứng dụng rùi nhé.

![](https://images.viblo.asia/05314e62-bd71-4bdc-9fd0-087295304062.png)


Xem thông tin của Elastic Search chúng ta chạy lệnh curl localhost:9200.
![](https://images.viblo.asia/593b0de6-4f8a-42cc-a84c-dc42b6824856.png)

Đến đây là chúng ta có thể sử dụng Elastic Search rùi nhé, chúng ta cùng đi vào ví dụ để hiểu hơn về nó nào. :clapper:

## 3. Ví dụ
Ok đến bước này là các bạn có thể hiểu cơ bản về Elastic Search rùi nhỉ. Để hiểu sâu hơn về nó mình có làm một ví dụ đơn giản dưới đây giúp các bạn h iểu hơn về nó:

Để có được demo thì mình phải tiến hành cài vào máy 2 loại dưới nhé. Mình coade ruby nên mình cài ruby, các bạn có thể sử dụng PHP, Java,... để thực hành nhé.
```
- Ruby on Rails
- Elastic seach
```
Các bạn tạo cho mình một bảng và giao diện trong project rails bằng các gõ lệnh:
```
rails g scaffold Product name:string description:text quantity:integer price:float
```

Các bạn cài thêm 2 gem dưới để seach nhé
```
gem 'elasticsearch-model'
gem 'elasticsearch-rails'
```

Chúng ta thiết kế view để hiển thị list Product và  form search.
```
<h1>Products</h1>

<%= form_tag products_path, method: :get do %>
  <p>
    <%= text_field_tag(:search, params[:search]) %>
    <%= submit_tag("Seach") %>
  </p>
<% end %>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Quantity</th>
      <th>Price</th>
      <th colspan="3"></th>
    </tr>
  </thead>

  <tbody>
    <% @products.each do |product| %>
      <tr>
        <td><%= product.name %></td>
        <td><%= product.description %></td>
        <td><%= product.quantity %></td>
        <td><%= product.price %></td>
      </tr>
    <% end %>
  </tbody>
</table>

<br>

<%= link_to 'New Product', new_product_path %>

```

![](https://images.viblo.asia/0c88c666-feec-4fbc-b9a6-e7424b29a48f.png)


Trong model Product các bạn để như dưới cho mình.
```
require 'elasticsearch/model'

class Product < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
end

Product.__elasticsearch__.create_index!
Product.import
```

Trong controller Product hàm index của chúng ta viết thật đơn giản phải ko nào.

```
 def index
   @products = if params["search"].blank?
                 Product.all
               else
                 @articles = Product.search params["search"]
               end
 end
```

Ok bây giờ các bạn có thể search tất cả thông tin của product qua các trường giá, tên, mô tả, số lượng. Elastic Search sẽ tìm tất cả các kết quả map với param các bạn search trả về kết quả.

![](https://images.viblo.asia/e8774f64-86e1-4de0-8393-3c491ddf6246.png)


## 4. Kết luận
Rất đơn giản phải không nào chỉ với vài thao tác cơ bản là bạn đã có một chức năng thật là hay và hữu ích nhỉ. Mình chia sẻ trên đây kiến thức mình mới tìm hiểu nên có gì chưa đúng, sai sót các bạn cùng comment dưới để mình chỉnh sửa nhé. Cám ơn các bạn đã đọc bài viết nếu các bạn thấy hay hãy cho mình một :two_hearts: nhé!

Tài liệu tham khảo:

+ https://github.com/elastic/elasticsearch-rails

+ https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html