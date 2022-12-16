**Laravel Elasticsearch**  là chủ đề hàng đầu hiện nay.Trong ví dụ này, tôi sẽ sử dụng gói soạn thảo có tên là  **Elasticquent** . Nó được gọi là  Elaticsearch cho các mô hình Larlo **Eloquent**. Elasticquent làm cho làm việc với  Elasticsearch  và  hùng biện  mô hình dễ dàng hơn bằng cách ánh xạ chúng **Elasticsearch** loại. Bạn có thể sử dụng các cài đặt mặc định hoặc xác định cách Elaticsearch nên lập chỉ mục và tìm kiếm các mô hình Eloquent của bạn ngay trong mô hình. The **Elasticquent** cho phép bạn lấy một mô hình Eloquent và dễ dàng lập chỉ mục và tìm kiếm nội dung của nó trong **Elaticsearch** . Được rồi, chúng ta hãy bắt đầu Ví dụ hướng dẫn tìm kiếm của Laravel.
# Bước 1: Cài đặt Elaticsearch trên Mac.
Nếu trước đây bạn chưa cài đặt  **Elaticsearch**  trên mac thì bạn cần bước này nếu không bạn có thể bỏ qua bước này. Nhập cmd sau vào thiết bị đầu cuối của bạn để cài đặt  Elaticsearch  qua  homebrew .

`brew install elasticsearch`

Nó sẽ cài đặt nó và bây giờ bắt đầu các services  bằng lệnh sau.

`brew services start elasticsearch`

# Bước 2: Thiết lập Laravel và Elaticsearch env.

Cài đặt Laravel 5.6 bằng lệnh sau.

`laravel new elasticlaravel`

Đi vào thư mục dự án.

`cd elasticlaravel`

Mở dự án trong trình soạn thảo của bạn.

`code .`

Cấu hình cơ sở dữ liệu bên trong  tệp .**env  .**
Thêm dòng sau vào tệp **composer.json**  . Chúng ta đang cài đặt gói **Elasticquent** .
```
"require": {
        "php": "^7.1.3",
        "fideloper/proxy": "^4.0",
        "laravel/framework": "5.6.*",
        "laravel/tinker": "^1.0",
        "elasticquent/elasticquent": "dev-master"
    },
```
Gõ lệnh sau để cài đặt .

`composer update`

![](https://images.viblo.asia/365fd1df-059c-4171-a31e-919c554495b7.png)


Khi bạn đã chạy  lệnh **composer update**  , bạn cần đăng ký nhà cung cấp dịch vụ Laravel, trong tệp **config / app.ph**p  của bạn  .

```
// config/app.php

'providers' => [
    ...
    Elasticquent\ElasticquentServiceProvider::class,
],
```

Tôi cũng cung cấp một mã ngoài cho một máy khách **elaticsearch-php** (đã kết nối bằng các cài đặt của chúng ta), thêm sau vào  **config / app.php** của  bạn nếu bạn cần.

```
// config/app.php

'aliases' => [
    ...
    'Es' => Elasticquent\ElasticquentElasticsearchFacade::class,
],
```

# Cấu hình Elaticsearch
Nhập lệnh Artisan sau đây để xuất bản tệp cấu hình vào thư mục cấu hình của bạn cho Laravel 5.6 .

```
php artisan vendor:publish --provider="Elasticquent\ElasticquentServiceProvider"
```

Bây giờ hãy vào tập tin cấu hình tại  **app >> config >> elastiquent.php**

Chúng ta cần thêm tên chỉ mục cho ứng dụng của chúng ta. Vì vậy, hãy để chúng ta thay đổi từ mặc định để bài viết .

```
<?php

// elastiquent.php

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
    | This is the index name that Elasticquent will use for all
    | Elasticquent models.
    */

    'default_index' => 'articles',

);
```


```
<?php

// elastiquent.php

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
    | This is the index name that Elasticquent will use for all
    | Elasticquent models.
    */

    'default_index' => 'articles',

);
```

# Bước 3: Tạo model Article  và migration.

Để tạo một model và migration  bằng lệnh sau.

```
php artisan make:model Article -m
```

Trong tệp <DATETIME> _create_articles_table.php của bạn thêm:

```
// create_articles_table.php

public function up()
{
   Schema::create('articles', function (Blueprint $table) {
       $table->increments('id');
       $table->string('title');
       $table->text('body');
       $table->string('tags');
       $table->timestamps();
   });
}
```
Migrate  table bằng lệnh sau :

```
php artisan migrate
```

# Bước 4: Tạo dữ liệu mẫu.

Tạo một ArticleTableSeeder bằng lệnh sau.

```
php artisan make:seeder ArticleTableSeeder
```

Để tạo dữ liệu mẫu, chúng ta sử dụng thư viện Faker . Tuy nhiên, trước đó, chúng ta cần thêm các trường $fillable được bảo vệ trong  tệp **Article.php**  để ngăn chặn ngoại lệ gán khối lượng.

```
// Article.php

class Article extends Model
{
    protected $fillable = ['title', 'body', 'tags'];
}
```

Bây giờ, thêm đoạn mã sau vào  tệp **ArticleTableSeeder.php  .**

```
<?php

// ArticleTableSeeder.php

use Illuminate\Database\Seeder;
use App\Article;

class ArticleTableSeeder extends Seeder
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
          Article::create([
            'title' => $faker->sentence(3),
            'body' => $faker->paragraph(6),
            'tags' => join(',', $faker->words(4))
          ]);
        }
    }
}
```

Thêm  lớp **ArticleTableSeeder**  bên trong  tệp **DatabaseSeeder.php**  nằm trong cùng thư mục.

```
<?php

// DatabaseSeeder.php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ArticleTableSeeder::class);
    }
}
```

Chạy seeder để tạo dữ liệu giả:

```
php artisan db:seed
```

# Bước 5: Thiết lập Elastiquent 

Viết đoạn mã sau trong  tập tin **Article.php  .**

```
<?php


// Article.php

namespace App;
use Elasticquent\ElasticquentTrait;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use ElasticquentTrait;

    protected $fillable = ['title', 'body', 'tags'];

    protected $mappingProperties = array(
        'title' => [
          'type' => 'text',
          "analyzer" => "standard",
        ],
        'body' => [
          'type' => 'text',
          "analyzer" => "standard",
        ],
        'tags' => [
          'type' => 'text',
          "analyzer" => "standard",
        ],
      );
}
```
Ở đây, chúng ta thêm cấu hình ánh xạ của chúng ta cho ElasticSearch . Bảng cơ sở dữ liệu có ba trường chính. Vì vậy, chúng ta cần chỉ định loại và máy phân tích mà trong trường hợp của chúng ta là tiêu chuẩn. Hãy nhớ rằng, tên chỉ mục  của chúng ta  là  **articles**. Các  **mappingProperties**   mảng là các lĩnh vực mà cần phải được lập chỉ mục với các loại thích hợp để tìm kiếm và có được kết quả hoàn hảo. Mỗi ánh xạ có một loại và một máy phân tích. Loại có thể là các loại dữ liệu khác nhau bao gồm chuỗi, số và ngày. Hiện tại, chúng ta sẽ bám vào loại văn bản nhưng lưu ý rằng các loại khác nhau cho phép bạn tận dụng những thứ khác nhau. Bạn có thể tìm thấy nhiều kiểu dữ liệu hơn ở đây tại các tài liệu tìm kiếm ban đầu .

Được rồi, bây giờ chúng ta cần lập chỉ mục cơ sở dữ liệu. Vì vậy, bên trong  tệp **web.php**  , viết mã sau đây. Hãy nhớ rằng, tôi đã viết đoạn mã sau trong  tệp **web.php**  nhưng trong một kịch bản thời gian thực , bạn cần phải viết bộ điều khiển bên trong này hoặc bất kỳ phần logic nào khác trong ứng dụng của bạn ngoại trừ  tệp **web.php**  .

# Indexing Documents

Để lập chỉ mục tất cả các mục trong mô hình **Eloquent**, hãy sử dụng  **addAllToIndex**:

```
Article::addAllToIndex();
```

Bạn cũng có thể lập chỉ mục một bộ sưu tập các mô hình:

```
$articles = Article::where('id', '<', 200)->get();
$articles->addToIndex();
```
Bạn cũng có thể lập chỉ mục các mục riêng lẻ:

```
$articles = Article::find($id);
$articles->addToIndex();
```
Bạn cũng có thể reindex toàn bộ mô hình:

 `Article::reindex()`
 
Bây giờ, chúng ta lập chỉ mục cho toàn bộ mô hình để chúng ta có thể viết mã lập chỉ mục bên trong tuyến đường gốc  .

```
<?php

// web.php

use App\Article;

Route::get('/', function () {
    Article::createIndex($shards = null, $replicas = null);

    Article::putMapping($ignoreConflicts = true);

    Article::addAllToIndex();

    return view('welcome');
});
```

Ở đây, chúng ta đã tạo ra chỉ mục. Tên của chỉ mục đã được xác định trong  tập tin **config >> elastiquent.php**  .

Sau đó, chúng ta đã đặt ánh xạ, được định nghĩa trong  mô hình Article.php  và cuối cùng thêm nó vào việc lập chỉ mục.

Truy cập trình duyệt và nhấn URL này:  http: //elasticlaravel.test/

Bạn sẽ nhận được trang chào mừng, nhưng dữ liệu của chúng ta hoàn toàn được lập chỉ mục và chúng ta có thể xác minh điều đó bằng cách gửi yêu cầu sau bằng  cURL. Chúng ta 
cũng có thể sử dụng người đưa thư cho việc đó, nhưng tôi đang gửi yêu cầu qua thiết bị đầu cuối.

**curl 'localhost:9200/articles/_mapping?pretty'**

![](https://images.viblo.asia/60467df3-d524-466c-b21f-0adad6ad32a9.png)https://images.viblo.asia/60467df3-d524-466c-b21f-0adad6ad32a9.png

```
curl 'localhost:9200/articles/articles/_search?q=title:Sed&pretty'
```

Ở đây, thuật ngữ tìm kiếm của chúng ta cho tiêu đề là  Sed. Vì vậy, nó sẽ lấy các hồ sơ có  thời hạn Sed  . Chúng ta có thể thấy các kết quả được tô điểm bên trong một thiết bị đầu cuối.

![](https://images.viblo.asia/60467df3-d524-466c-b21f-0adad6ad32a9.png)

# Bước 6: Tìm kiếm bằng các phương thức của  Laravel eloquent .

```
<?php

// Article.php

use App\Article;

Route::get('/', function () {
    Article::createIndex($shards = null, $replicas = null);

    Article::putMapping($ignoreConflicts = true);

    Article::addAllToIndex();

    return view('welcome');
});

Route::get('/search', function() {

    $articles = Article::searchByQuery(['match' => ['title' => 'Sed']]);

    return $articles;
});
```

# Search collections

Chúng ta có thể nhận được tổng số lượt truy cập để đếm bằng cách sử dụng mã sau đây.

```
$articles = Article::searchByQuery(['match' => ['title' => 'Heleium']]);
    
return $articles->totalHits();
```
Truy cập mảng phân đoạn:

` $articles->shards();`
Truy cập số điểm tối đa:

` $articles->maxScore();`
Truy cập thuộc tính boolean đã hết thời gian:

` $articles->timedOut();`
Truy cập tài sản đã lấy:

```
$articles->took();
```
Truy cập tập hợp tìm kiếm -  Xem Tổng hợp để biết chi tiết :

`$articles->getAggregations();`
# Chọn kết quả từ Elastiquent.
Để có kết quả trong các khối, bạn có thể sử dụng hàm  chunk ()  .

```
$articles = Article::searchByQuery(['match' => ['title' => 'Similique']]);
return $articles->chunk(2);
```

Cuối cùng,  ví dụ về hướng dẫn tìm kiếm của Laravel đã  kết thúc. Cảm ơn đã xem bài viết của mình .

Link tham khảo

https://github.com/cviebrock/laravel-elasticsearch

https://appdividend.com/2018/06/30/laravel-elasticsearch-tutorial-example/