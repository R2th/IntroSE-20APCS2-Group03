![](https://images.viblo.asia/efda4995-b6a7-41a2-b52f-2571f7c65042.png)
# Mở đầu
Chào các bạn, lại đến hẹn rồi nay mình sẽ viết về ElasticSearch, cách sử dụng ElasticSearch trong Laravel. Chắc hẳn là developer thì các bạn không lạ gì với keyword ElasticSearch rồi đúng không. Để tìm hiểu thêm về ElasticSearch thì các bạn có thể đọc thêm bài [này](https://viblo.asia/p/tim-hieu-ve-elasticsearch-MdZkAQMKkox) trên Viblo. Một cách tổng quan ta có thể điểm lại một vài thông tin ngắn gọn về ElasticSearch như sau:
> * Elasticsearch là một search engine. 
> 
> * Elasticsearch được xây dựng để hoạt động như một server cloud theo cơ chế của RESTful.
> 
> * Kế thừa và phát triển từ Lucene Apache.
> 
> * Phát triển bằng ngôn ngữ java.

Như vậy ta có thể hiểu nôm na ElasticSearch là 1 engine hỗ trợ search sử dụng như 1 server và khi ta muốn thêm, sửa, xóa dữ liệu thì ta sẽ dùng curl để connect đến server ElasticSearch thông qua cổng 9200. Về cấu trúc của ElasticSearch thì ta có thể hiểu như sau (so sánh với SQL):

Trong SQL ta có các cơ sở dữ liệu với các bảng chứa cấu trúc của dữ liệu (các cột) và các row dữ liệu. Chuyển cấu trúc đó so sánh với ElasticSearch thì ta có `Indexes` (giống các Database trong DBMS) và bên trong Indexes ta có `Types` (giống Table trong DBMS) và ta cũng có `Documents` giống như các bản ghi trong SQL. Trong Document chứa các field tương ứng với các thuộc tính của Document đó. Như vậy cũng đủ hiểu sơ qua về ElasticSearch rồi bây giờ chúng ta sẽ đi tìm hiểu chi tiết các cài đặt và ứng dụng vào với project Laravel.

# Cài đặt
## Cài đặt ElasticSearch trên Ubuntu
ElasticSearch thích hợp trên mọi môi trường Windows, Mac, Linux. Mình dùng Ubuntu nên xin phép chỉ nêu cách cài đặt trên Ubuntu. Trên các hệ điều hành khác các bạn vui lòng xem tại [đây](https://www.elastic.co/downloads/elasticsearch).
Để cài đặt trên Ubuntu trước hết ta cần cài đặt Java.
Để cài đặt Java ta thực hiện các lệnh sau:
```bash
$ sudo apt-get remove --purge openjdk*
$ sudo add-apt-repository -y ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get -y install oracle-java8-installer
```
Sau khi cài đặt xong ta có thể check bằng cách dùng lệnh: 
```bash 
$ java -version
```
Nếu output như sau tức là bạn đã cài đặt java thành công:
```
java version "1.8.0_181"
Java(TM) SE Runtime Environment (build 1.8.0_181-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.181-b13, mixed mode)
```

Tiếp tục để cài ElasticSearch ta có thể tải file [.DEB này](https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.3.2.deb) về chạy là được luôn. 
Để kiểm tra đã cài đặt thành công ElasticSearch lên máy hay chưa ta truy cập thử `localhost:9200` nếu ra kết quả như sau có nghĩa là bạn đã cài đặt thành công:

![](https://images.viblo.asia/75d5512b-0bb4-4c78-9cbc-a8debe362589.png)

## Sử dụng ElasticSearch for PHP
ElasticSearch cung cấp sẵn thư viện dành cho PHP tại địa chỉ này https://www.elastic.co/guide/en/elasticsearch/client/php-api/current/index.html

Để cài đặt ta chỉ cần sử dụng composer:
```
composer require elasticsearch/elasticsearch
```

Một vài ví dụ khi sử dụng:
```php
use Elasticsearch\ClientBuilder;

$client = ClientBuilder::create()->build();

// Index a document
$params = [
    'index' => 'my_index',
    'type' => 'my_type',
    'id' => 'my_id',
    'body' => ['testField' => 'abc']
];

$response = $client->index($params);
print_r($response);

// Search for a document
$params = [
    'index' => 'my_index',
    'type' => 'my_type',
    'body' => [
        'query' => [
            'match' => [
                'testField' => 'abc'
            ]
        ]
    ]
];

$response = $client->search($params);
print_r($response);
```
Nôm na là tạo một biến `$client` để gửi các request thực hiện các yêu cầu đến server ElasticSearch và nhận kết quả.

## Tích hợp với Laravel Eloquent Model
Để kết hợp ElasticSearch với Laravel có rất nhiều packages có thể làm được. Ví dụ như: [Plastic](https://github.com/sleimanx2/plastic), [Elasticsearch Eloquent](https://isswp101.github.io/elasticsearch-eloquent/), [elasticsearcher](https://github.com/madewithlove/elasticsearcher),...
Nhưng trong phạm vi bài viết này mình sẽ giới thiệu package [Elasicquent](https://github.com/elasticquent/Elasticquent). Đây là 1 package giúp chúng ta làm việc với ElasticSearch và Eloquent một cách dễ dàng hơn. Ta có thể tạo index và tìm kiếm ngay trong Eloquent Model.

Ta có thể cài đặt dễ dàng qua composer:
```
composer require elasticquent/elasticquent
```
Thêm providers và aliases:
```php
'providers' => [
    ...
    Elasticquent\ElasticquentServiceProvider::class,
],
'aliases' => [
    ...
    'Es' => Elasticquent\ElasticquentElasticsearchFacade::class,
],
```

Thêm `ElasticquentTrait` vào Model mà bạn muốn sử dụng để index với ElasticSearch.
```php
use Elasticquent\ElasticquentTrait;

class Book extends Eloquent
{
    use ElasticquentTrait;
}
```
Elasticsearch Configuration:
`php artisan vendor:publish --provider="Elasticquent\ElasticquentServiceProvider"`

```php
<?php

return array(

    /*
    |--------------------------------------------------------------------------
    | Custom Elasticsearch Client Configuration
    |--------------------------------------------------------------------------
    |
    | This array will be passed to the Elasticsearch client.
    | See configuration options here:
    |
    | http://www.elasticsearch.org/guide/en/elasticsearch/client/php-api/current/_configuration.html
    */

    'config' => [
        'hosts'     => ['localhost:9200'],
        'retries'   => 1,
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Index Name
    |--------------------------------------------------------------------------
    |
    | This is the index name that Elastiquent will use for all
    | Elastiquent models.
    */

    'default_index' => 'my_custom_index_name',

);
```

# Demo với Laravel
Để thực hiện demo với Laravel ta tạo model và data để test như sau:
```php
php artisan make:model Post -m
```
```php
// Post.php

class Post extends Model
{
    protected $fillable = [
        'title', 
        'body', 
        'tags'
    ];
}
```
```php
<?php

// PostTableSeeder.php

use Illuminate\Database\Seeder;
use App\Article;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for($i=0; $i<50; $i++) {
          Post::create([
            'title' => $faker->sentence(3),
            'body' => $faker->paragraph(6),
          ]);
        }
    }
}
```

Sau khi chạy seed ta đã có một bảng dữ liệu cơ bản để test.
Tiếp theo ta sẽ setup Elasticquent trong model Post:
```php
<?php

// Post.php

namespace App;
use Elasticquent\ElasticquentTrait;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use ElasticquentTrait;

    protected $fillable = ['title', 'body', 'tags'];

    protected $mappingProperties = array(
        'title' => [
          'type' => 'text',
          'analyzer' => 'standard',
        ],
        'body' => [
          'type' => 'text',
          'analyzer' => 'standard',
        ],
      );
}
```
Các thuộc tính trong $mappingProperties chính là các trường cần đánh index. Và kiểu analyzer = stanard chính là việc tự động tách từ theo space trong quá trình phân tích dữ liệu đưa vào đánh index.
Và bây giờ để đánh index cho Post ta dùng tinker và chạy command 
```php
App\Post::addAllToIndex();
```

Sau khi đã add vào index ta có thể kiểm tra bằng cách truy cập `localhost:9200/ten_index` với tên index chính là tên đã setup trong file `config/elasticquent.php` nếu ra kết quả thì có nghĩa là đã thêm index thành công. 
Bây giờ ta thử search theo ElasticSearch nhé:
```
Route::get('search-es', function () {
    $response = \App\Post::searchByQuery([
        'match' => [
            'title' => 'Illo'
        ]
    ]);

    return dd($response);
});
```
Kết quả như sau:
![](https://images.viblo.asia/c1641240-d29f-40a7-bb60-1705d4da37af.png)
Như vậy ta search theo title match với chữ "Illo" cho ra 3 kết quả.
Ngoài ra còn nhiều hàm nữa của Elasticquent các bạn có thể xem thêm ở [đây](https://github.com/elasticquent/Elasticquent).
# Kết luận
Như vậy mình vừa giới thiệu đến các bạn cách tích hợp và sử dụng ElasticSearch trong PHP. Bài này là cơ bản nhất để bắt đầu với ElasticSearch. Còn rất nhiều thứ của ElasticSearch mà mình chưa thể trình bày hết ở đây. Các bạn có thể tìm hiểu thêm. 
### Tham khảo
* ElasticSearch https://www.elastic.co
* Elasticquent https://github.com/elasticquent/Elasticquent