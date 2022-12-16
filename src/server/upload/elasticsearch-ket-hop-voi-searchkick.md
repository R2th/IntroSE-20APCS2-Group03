## 1. install java

Tại sao phải cài đặt java?
bời vì elasticsearch được phát triển bằng java vì vậy để chạy được Elasticsearch chúng ta cần cài đặt java.
Các bạn sử dụng các lệnh sau để cài đặt java.
```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```
kiểm tra java cài đặt thành công
```
java -version
```
   
## 2. cài đặt elasticsearch

Elasticsearch là một công cụ tìm kiếm dựa trên nền tảng Apache Lucene. Nó cung cấp một bộ máy tìm kiếm dạng phân tán, có đầy đủ công cụ với một giao diện web HTTP có hỗ trợ dữ liệu JSON.
Các bạn cài elasticserach sử dụng các lệnh sau
```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-5.x.list
sudo apt-get update
sudo apt-get install -y elasticsearch
```

Khởi động elasticserach service
```
sudo systemctl daemon-reload
sudo systemctl enable elasticsearch
sudo systemctl start elasticsearch
```

cuối cùng kiểm tra elasticsearch đã hoạt động chưa, mở trình duyệt gõ
```
localhost:9200
```
![](https://images.viblo.asia/f120d277-ebcf-4379-8f16-c47cbdb2f7d5.png)
nếu các bạn nhìn thấy giống như ảnh là các bạn đã cài đặt xong elasticsearch.

## 3. cài đặt gem searchkick
thêm `gem 'searchkick'` vào gemfile và chạy `bundle install`
## 4. thêm searchkick và đánh index cho model
```
class Product < ApplicationRecord
  searchkick
end
```
mở `rails c` gõ `Product.reindex` nó sẽ tự động đánh index tất cả các trường của bảng products.
Bạn có thể mở `http://localhost:9200/_all/_mapping` bạn sẽ nhìn thấy tất cả các trường được đánh index
![](https://images.viblo.asia/bdd76e70-8491-4697-8e59-5de31f0b2d0d.png)

- nếu bạn muốn chỉ đánh index một số trường thì sao?
các bạn có thể  viết các trường được đánh index vào hàm `sarch_data`
```
class Product < ApplicationRecord
  searchkick

  def search_data
    {
      name: name,
      short_description: short_description
    }
  end
end
```
ví dụ ở đây mình chỉ muốn đánh index trường `name` và `short_description`
sau đó chạy `Product.reindex` trên `rails c`,
mở `http://localhost:9200/_all/_mapping` bạn sẽ chỉ nhìn thấy `name` và `short_description` được đánh index
![](https://images.viblo.asia/18fd1e82-a836-42fc-ae88-a7682943d269.png)

## 5. Lấy dữ liệu từ elasticsearch bằng searchkick
bạn mở `rails c` gõ `data = Product.search "*"`
![](https://images.viblo.asia/6d3d8465-62d5-434e-979e-8ff25f16e708.png)
sau đó gõ `data.resutls` nó sẽ lấy dữ liệu ra cho bạn
![](https://images.viblo.asia/531ffd89-b272-4f8b-a8a6-215025109e55.png)
ở đây mình đang sử dụng câu lệnh `"*"` để lấy ra tất cả bản ghi.
nếu các bạn muốn tùy chỉnh câu lệnh truy vấn thì các bạn có thể đọc về  DSL query trong elasticsearch hoặc đọc trong gem searchkick cả hai cách để có thể tùy chỉnh được câu lệnh truy vấn lấy kết quả trả về.

### link tham khảo
https://www.howtoforge.com/tutorial/how-to-install-elastic-stack-on-ubuntu-16-04/
chú ý: đây là mình đang làm việc với hệ điều hành ubuntu