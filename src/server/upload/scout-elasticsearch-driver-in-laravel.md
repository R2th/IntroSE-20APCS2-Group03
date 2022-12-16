Chức năng tìm kiếm là chức năng mà bất kỳ một dự án lớn nhỏ nào cũng cần có. Và không ngoại lệ, trong một dự án laravel mình đang làm có sử dụng elasticsearch nên hôm nay mình xin giới thiệu với các bạn về package scout-elasticsearch-driver. 
![](https://images.viblo.asia/ffc04caa-4781-4884-b9a1-9adc52103ba4.png)
Để kết hợp ElasticSearch với Laravel có rất nhiều packages hỗ trợ như: Plastic, Elasticsearch Eloquent, elasticsearcher,... Nhưng trong bài viết này mình sẽ giới thiệu package Scout Elasticsearch Driver. Đây là 1 package giúp chúng ta làm việc với ElasticSearch và Eloquent một cách dễ dàng.Trước tiên chúng ta sẽ đi tìm hiểu qua một số khái niệm nhé!
### 1. Laravel Scout là gì?
Laravel Scout là full-text search dựa trên driver dành cho Eloquent. Ngoài ra, nó còn hỗ trợ Algolia, Elastic Search, và vì nó là full-text search dựa trên driver nên bất cứ ai cũng có thể tạo sự tích hợp của riêng mình với các hệ thông full-text search khác.

Laravel Scout hoạt động dựa trên nó thêm tính chất search vào các Model đã có. Sau đó chỉ việc đồng bộ hóa data với các dịch vụ tìm kiếm.
### 2. Elasticsearch là gì?
- Elasticsearch là công cụ tìm kiếm và phân tích phân tán, RESTful mã nguồn mở, được xây dựng trên Apache Lucene. Kể từ khi phát hành đến nay, Elasticsearch đã nhanh chóng trở thành công cụ tìm kiếm thông dụng nhất và được sử dụng rộng rãi.
- Elasticsearch thực chất hoặt động như 1 web server, có khả năng tìm kiếm nhanh chóng thông qua giao thức RESTful.
### 3. Cách cài đặt package
- Để cài đặt chúng ta chỉ cần dùng composer:
    ```
    composer require babenkoivan/scout-elasticsearch-driver
    ```
- Nếu bạn sử dụng laravel phiên bản <=5.4 thì sẽ thêm providers vào config/app.php:
    ```php
    'providers' => [
        Laravel\Scout\ScoutServiceProvider::class,
        ScoutElastic\ScoutElasticServiceProvider::class,
    ]
    ```
- Sau khi đã cài đặt thành công package thì bạn dùng command line sau để publish config:
    ```
    php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
    php artisan vendor:publish --provider="ScoutElastic\ScoutElasticServiceProvider"
    ```
- Lệnh này sẽ tự động  tạo cài đặt trong 2 file  config/scout.php và config/scout_elastic.php. Và chúng ta có thể thay đổi một số cấu hình ban đầu của nó. Các bạn có thể tham khảo thêm ở [đây](https://github.com/babenkoivan/scout-elasticsearch-driver#configuration)
Như vậy là chúng ta đã cài đặt thành công package rồi đó ạ. 
### 4. Cách sử dụng package trong project laravel
**1. Tạo IndexConfigurator**
- Mỗi một Model Eloquent sẽ đồng bộ với một chỉ mục tìm kiếm index, chứa tất cả các bản ghi có thể tìm kiếm cho mô hình đó. Nói cách khác , bạn có thể hiểu đơn giản index trogn Elasticsearch như 1 table vậy, tuy nhiên nó không hoàn toàn giống.
- Một index configurator được sử dụng để setting cho một chỉ mục tìm kiếm index. Để tạo 1 index configurator ta sử dụng command sau:
**Lưu ý** rằng tên của từng index configurator sẽ phải khác nhau.
    ```
    php artisan make:index-configurator MyIndexConfigurator
    ```
- Nó sẽ tạo ra một file MyIndexConfigurator.php ở trong thư mục app. Tại đây bạn có thể đặt tên và settings cho index configurator (Các bạn có thể tham khảo thêm các settings khác tại [đây](https://www.elastic.co/guide/en/elasticsearch/guide/current/index-management.html))

VD: Mình có 1 VD setting đơn giản sau: 
```php
<?php

namespace App;

use ScoutElastic\IndexConfigurator;

class MyIndexConfigurator extends IndexConfigurator
{
    // It's not obligatory to determine name. By default it'll be a snaked class name without `IndexConfigurator` part.
    protected $name = 'my_index'; 
    
    /**
    * You can specify any settings you want, for example, analyzers.
     * @var array
     */
    protected $settings = [
        'analysis' => [
            'analyzer' => [
                'custom_analyzer' => [
                    'type' => 'custom',
                    'tokenizer' => 'keyword',
                    'filter' => [
                        'lowercase'
                    ],
                ],
            ],
        ],
    ];
}
```
Và để index configurator hoạt động chúng ta cần run command sau:
```
php artisan elastic:create-index "App\MyIndexConfigurator"
```
Tương tự khi bạn sửa settings và bạn muốn update index configurator có thể run command:
```
php artisan elastic:update-index "App\MyIndexConfigurator"
```
Xoá một index configurator:
```
php artisan elastic:drop-index "App\MyIndexConfigurator"
```
**2. Tạo Searchable Model**

Thực ra bước này đa số khi làm vào thực tế thì bản thân chúng ta đã tạo sẵn các Model tương ứng cho từng chỉ mục tìm kiếm rồi. Nhưng mình vẫn giới thiệu cho các bạn cách tạo 1 Searchable Model nhes :D
- Để tạo 1 Searchable Model chúng ta sử dụng command sau:
    ```
    php artisan make:searchable-model Models/MyModel --index-configurator=MyIndexConfigurator
    ```
- Nó sẽ tạo ra một file app/Models/MyModel.php có dạng như sau:
    ```php
    <?php

    namespace App\Models;

    use ScoutElastic\Searchable;
    use App\MyIndexConfigurator;
    use Illuminate\Database\Eloquent\Model;

    class MyModel extends Model
    {
        use Searchable;

        protected $indexConfigurator = MyIndexConfigurator::class;

        // Here you can specify a mapping for model fields
        protected $mapping = [
            'properties' => [
                'title' => [
                    'type' => 'text',
                    // Also you can configure multi-fields, more details you can find here https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html
                    'fields' => [
                        'raw' => [
                            'type' => 'keyword',
                        ]
                    ]
                ],
            ]
        ];

        /**
         * Get the indexable data array for the model.
         *
         * @return array
         */
        public function toSearchableArray()
        {
            $array = $this->toArray();

            // Customize array...

            return $array;
        }
    }
    ```
- Trong đó: 
* Mapping là quá trình định nghĩa làm thế nào một document và các fields của nó được lưu trữ và đánh index. Cụ thể sử dụng mapping để định nghĩa: type, format,.. cho từng model fields.
* function toSearchableArray() dùng để tùy chỉnh data để đồng bộ hóa với từng chỉ mục tìm kiếm. Mình thấy có một bài khá hay về việc customize searchable data các bạn tham khảo thêm ở [đây](https://www.algolia.com/doc/framework-integration/laravel/indexing/configure-searchable-data/?language=php) nhes!
- Còn trong trường hợp chúng ta đã tạo sẵn Model rồi thì chỉ cần use thêm Searchable, khai báo index configurator, $mapping và function toSearchableArray().
- Và để đồng bộ hóa đc data thì chúng ta cần run command:
    ```
    php artisan elastic:update-mapping "App\Models\MyModel"
    ```
**3. Sử dụng**

- Vì đây là package kết hợp giữa scout và elasticsearch nên saukhi đã hoàn thành các bước trên chúng ta cần thêm một bước vô cùng quan trọng đó là import data vào từng index thông qua câu lệnh sau:
     `php artisan scout:import "App\Models\MyModel"`
 - Ngoài ra khi CRUD một record được tự động thêm vào chỉ mục tìm kiếm thì sau khi thực hiện chúng ta thêm:
     ```php
     // Create + Update
    $record->searchable();

    // Delete
    $record->unsearchable();
     ```
 - Giờ đây thông qua Model  bạn có thể bắt đầu tìm kiếm bằng các sử dụng phương thức search(), các bạn xem thêm ở [đây](https://github.com/babenkoivan/scout-elasticsearch-driver#usage) nhé!
     ```php
     MyModel::search($inputs)->get();
     ```
**4. Search rules**

Tuy nhiên khi thực hiện các query search chắc chắn không thể loại trừ ngoại lệ bạn muốn custom request, để tránh bị rối thì bạn nên tạo một class Search rules:
    ```
    php artisan make:search-rule MySearchRule
    ```
    Câu lệnh tạo ra một file app/MySearchRule.php có dạng như sau: 
```php
<?php

namespace App;

use ScoutElastic\SearchRule;

class MySearch extends SearchRule
{
    // This method returns an array, describes how to highlight the results.
    // If null is returned, no highlighting will be used. 
    public function buildHighlightPayload()
    {
        return [
            'fields' => [
                'name' => [
                    'type' => 'plain'
                ]
            ]
        ];
    }
    
    // This method returns an array, that represents bool query.
    public function buildQueryPayload()
    {
        return [
            'must' => [
                'match' => [
                    'name' => $this->builder->query
                ]
            ]
        ];
    }
}
```
   Ở trong model bạn add $searchRules property:
  
  ```php
  <?php

    namespace App\Models;

    use ScoutElastic\Searchable;
    use Illuminate\Database\Eloquent\Model;

    class MyModel extends Model
    {
        use Searchable;

        // You can set several rules for one model. In this case, the first not empty result will be returned.
        protected $searchRules = [
            MySearchRule::class
        ];
    }
  ```
  **5. Debug**
  
  - Package cũng cấp hai phương thức có thể giúp chúng ta phân tích kết quả truy vấn tìm kieesm:
*  [explain()](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-explain.html)
  ```php
  App\Models\MyModel::search('Brazil')
    ->explain();
  ```
*   [profile](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-profile.html)
```php
App\Models\MyModel::search('Brazil')
    ->profile();
```
###  5. Tài liệu tham khảo
 - https://www.elastic.co/guide/en/elasticsearch/client/php-api/current/index.html
 - https://github.com/babenkoivan/scout-elasticsearch-driver#usage