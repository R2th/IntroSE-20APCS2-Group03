# 1. Giới thiệu về Elasticsearch
ElasticSearch là 1 search engine sử dụng như 1 server và khi ta muốn thêm, sửa, xóa dữ liệu thì ta sẽ dùng curl để connect đến server ElasticSearch thông qua cổng 9200.<br>
Elasticsearch là một document oriented database, nhiệm vụ của nó là lưu trữ và triệu gọi document. Tất cả các documents được hiển thị dưới dụng Json. Elasticsearch cho phép phân tích và tìm kiếm dữ liệu theo thời gian thực, nó có performance rất tốt, dễ dàng áp dụng và triển khai một cách hiệu quả vào các nguồn dữ liệu khác nhau.<br>
![Screen Shot 2021-09-12 at 20.53.49.png](https://images.viblo.asia/295fa45a-4a99-48ec-9408-751b0544410d.png)
# 2. Cài đặt Elasticsearch
Tham khảo cách cài đặt [tại đây](https://www.elastic.co/downloads/elasticsearch).<br>
Với Macos, cách dễ dàng nhất là cài đặt thông qua homebrew.
- Để cài homebrew, chạy command sau:<br>
```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"<br>
```
- Để cài Elasticsearch:<br>
```
$ brew tap elastic/tap
$ brew install elastic/tap/elasticsearch-full
```
- Sau khi cài xong, chạy lệnh sau để start Elasticsearch:<br>
```
$ elasticsearch<br>
```
- Elasticsearch sẽ chạy ở cổng 9200, kiểm tra trên browser:
![Screen Shot 2021-09-12 at 21.05.57.png](https://images.viblo.asia/cb7d7e2b-36b2-4377-a36d-67f5b4acf5b7.png)
# 3. Cài đặt Kibana
Kibana là một nền tảng phân tích hiển thị dữ liệu từ Elasticsearch một cách trực quan dễ sử dụng, Kibana cũng là một công cụ mã nguồn mở miễn phí, cho tất cả mọi người sử dụng. Kibana cung cấp các tính năng cho người dùng quản lý như biểu đồ cột, biểu đồ đường, biểu đồ tròn, biểu đồ nhiệt và nhiều loại chart khác nữa.<br>
- Để cài Kibana, tham khảo [tại đây.](https://www.elastic.co/fr/downloads/kibana)
Mình sẽ minh họa cách cài đặt trên macos, thông qua homebrew:
```
$ brew tap elastic/tap
$ brew install elastic/tap/kibana-full
```
- Sau đó, tích hợp Elasticsearch với Kibana bằng cách sửa file cấu hình kibana.yml:
```
$ cd /usr/local/etc/kibana
$ nano kibana.yml
```
Ta chỉ việc uncomment dòng sau: **elasticsearch.hosts:["http://localhost:9200"]**<br>
- Để start Kibana, ta chỉ việc chạy command sau:<br>
`$ kibana`
- Kibana sẽ chạy ở cổng 5601, kiểm tra trên trình duyệt:
![](https://images.viblo.asia/19dbd252-453a-4e7a-8326-2e240568e098.png)
# 4. Cài đặt Laravel Scout
Tham khảo Laravel Scout trên docs của Laravel [tại đây.](https://laravel.com/docs/8.x/scout#introduction) <br>
Laravel Scout là full-text search dựa trên driver dành cho Eloquent. Ngoài ra, nó còn hỗ trợ Algolia, Elastic Search, và vì nó là full-text search dựa trên driver nên bất cứ ai cũng có thể tạo sự tích hợp của riêng mình với các hệ thông full-text search khác.<br>
- Cài đặt Laravel Scout package:<br>
```
composer require laravel/scout<br>
```
- Sau khi  cài thành công Scout, dùng command line để publish config Scout:
```
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```
# 5. Cài đặt Elasticsearch Driver
Ở đây, mình sẽ sử dụng matchish/laravel-scout-elasticsearch. Tham khảo [tại đây.](https://github.com/matchish/laravel-scout-elasticsearch)<br>
- Cài đặt:
```
composer require matchish/laravel-scout-elasticsearch
```
- Trong file .env:
SCOUT_DRIVER=Matchish\ScoutElasticSearch\Engines\ElasticSearchEngine
ELASTICSEARCH_HOST=localhost:9200
- Đăng kí provider trong config/app.php:<br>
```
'providers' => [
    // Other Service Providers
   \Matchish\ScoutElasticSearch\ElasticSearchServiceProvider::class
],
```
- Publich config sử dụng câu lệnh:<br>
```
php artisan vendor:publish --tag config
```
# 6. Cấu hình Model Indexes
Sau khi tạo model, migration, mỗi model sẽ được đồng bộ với một search index. Mỗi index sẽ chứa tất cả các records có thể được search trong Model đó. Ta có thể hiểu mỗi index giống như 1 SQL table:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class EmployeeProfile extends Model
{
    use Searchable;
}
```
# 7. Import index
- Nếu muốn import các records đã có trong models, ta sử dụng câu lệnh sau:
```
php artisan scout:import "App\Models\EmployeeProfile"
```
- Mở index management trong Kibana, ta sẽ thấy các index mới được import vào:<br>
![Screen Shot 2021-09-12 at 21.32.07.png](https://images.viblo.asia/1912a53a-51ca-4774-8af9-0651338850b7.png)
- Mỗi record trong SQL sẽ tương ứng với 1 document trong index.
# 8. Searching
- Sử dụng phương thức search():
```
$profiles = Employeeprofile::search('fpt')->get();
```
- Kết hợp sử dụng where:
```
$orders = Order::search('Starrek')->where('user_id', 1)->get();
```
- Kết hợp phân trang:<br>
```
$orders = Order::search('Starrek')->paginate(10);
```
# 9. Tài liệu tham khảo
https://viblo.asia/p/su-dung-elasticsearch-trong-laravel-3Q75wDxBKWb<br>
https://www.elastic.co/guide/index.html<br>
https://laravel.com/docs/8.x/scout