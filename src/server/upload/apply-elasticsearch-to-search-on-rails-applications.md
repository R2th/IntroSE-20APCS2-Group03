## Full text search là gì?
### Định nghĩa
Full text search có thể hiểu là việc tìm kiếm một chuỗi ký tự cụ thể từ nhiều tài liệu (files) trên máy tính. Khác với "tìm kiếm tên file" và "tìm kiếm chuỗi ký tự trong một file", nó có nghĩa là "tìm kiếm trên nhiều tài liệu, cho tất cả các câu có trong tài liệu".
### Phương pháp cắt từ khóa
Là phương pháp để tạo index. (Inverted index)
![](https://images.viblo.asia/a41a3e32-73f0-4d13-b5a2-8d6bc971493d.png)
ảnh nguồn: http://siddhumehta.blogspot.com/2014/06/elasticsearch-tutorial-inverted-index.html
**Morphological analysis**(Phân tích hình thái học)
Trong ruby thường sử dụng là mecab.
Đây là một kỹ thuật để phân chia các câu được viết bằng ngôn ngữ tự nhiên thành các hình thái (đơn vị tối thiểu có ý nghĩa bằng ngôn ngữ). Khi đó, bằng việc tham chiếu thông tin trong từ điển có thể lấy được thông tin như "từ loại", "dạng sử dụng", "cách đọc", ...
Việc cập nhật từ điển thường xuyên là điều quan trọng.
**N-gram**
Morphological analysis thì yêu cầu có từ điển, còn N-gram là một kiểu cắt các ký tự với số lượng ký tự chỉ định.
![](https://images.viblo.asia/a9b95135-2a0e-4758-9dcb-cdca379e366f.png)
ảnh nguồn: http://recognize-speech.com/language-model/n-gram-model/comparison
### Ví dụ về full text search engine
Có thể biết đến các ví dụ điển hình như là: Apache Solr, elasticsearch, Amazon cloudsearch.
Sau khi đọc các bài so sánh giữa những cái bên trên, thì có vẽ như elasticsearch là lựa chọn khá tối ưu.
## Elasticsearch
### Cài đặt Elastic search trên Cloud 9
Để development và muốn sử dụng gem tìm kiếm, bạn sẽ cần phải cài đặt elastic search.
```
sudo apt-get --purge autoremove elasticsearch
```
Sau đó, install mới lại
```
wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.7.0.deb
sudo dpkg -i elasticsearch-1.7.0.deb

#enable khi khởi động
sudo update-rc.d elasticsearch defaults 95 10

### Start ElasticSearch 
sudo /etc/init.d/elasticsearch start

### Confirm lại
curl http://localhost:9200
```
![](https://images.viblo.asia/9e86656b-3fd0-4e21-86fb-464b84163d29.png)
###  Add elasticsearch-rails Gem
Trước khi khởi động Rails Console thì add gem bên dưới vào Gemfile
```
gem 'elasticsearch-model'
gem 'elasticsearch-rails'
```
Install bằng `bundle install` 
![](https://images.viblo.asia/788bf501-aa71-4874-92a4-51a591c30293.png)
rồi khởi động Rails Console bằng `rails c`.
```
tranthitinh:~/workspace/toy_app (modify) $ rails c
Running via Spring preloader in process 2511
Loading development environment (Rails 5.1.4)
```
### Include Elasticsearch::Model
Trước tiên, Include `Elasticsearch::Model` ở `ActiveRecord` model class của data muốn xử lý.
```
> class User::UserSite; include Elasticsearch::Model; end
 => User::UserSite
```
Gọi  `User.connection` để thiết lập kết nối.
### import data vào Elasticsearch
Sử dụng `import` method để import vào Elasticsearch
```
> User::UserSite.__elasticsearch__.import
=> 0
```
### Confirm mapping
Trong request tới Elasticsearch thì cần thiết phải có index name và type name nên chúng ta confirm về nó.
```
>User::UserSite.__elasticsearch__.index_name
"users"
> User::UserSite.__elasticsearch__.document_type
"user"
```
Vậy là nó đã được đăng ký với type là `user` của index là `users`.
Biết được tên này thì có thể access được API của Elasticsearch nên hãy thử confirm kết quả import.
Có một số cách confirm mapping, nhưng giờ thử sử dụng `perform_request`
```
> User::UserSite.__elasticsearch__.client.perform_request(
  :get,
  users/user/_mapping'
).body
=> {"users"=>
  {"mappings"=>
    {"user"=>
      {"properties"=>
        {
         "name"=>{"type"=>"string"},
         "id"=>{"type"=>"integer"},
         "email"=>{"type"=>"string"},
         "title"=>{"type"=>"string"},
         "created_at"=>{"type"=>"date", "format"=>"dateOptionalTime"},
         "updated_at"=>{"type"=>"date", "format"=>"dateOptionalTime"}}}}}}
```
Đang đăng ký các property dạng  `integer`, `string`, `date`
### Get số dòng
Tiếp theo, thử xem số lượng record
```
> User::UserSite.__elasticsearch__.client.perform_request(
  :get,
  'users/user/_count'
).body
```
### Confirm data
Thử xem bên trong của data có id =1
```
> User::UserSite.__elasticsearch__.client.perform_request(
  :get,
  'users/user/1'
).body
```

### Tham khảo:
http://blog.enogineer.com/2014/12/03/rails-console-elasticsearch/
https://qiita.com/moriyaman/items/373107a3870c33229bac
http://y-ken.hatenablog.com/entry/essential-japanese-blogs-for-elasticsearch-study
http://gengoro.zoo.co.jp/
http://engineer.wantedly.com/2014/02/25/elasticsearch-at-wantedly-1.html