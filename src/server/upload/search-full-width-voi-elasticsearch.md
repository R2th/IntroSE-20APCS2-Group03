![](https://images.viblo.asia/fa11bd2c-ad0a-4f71-a5fb-f35e964cf548.png)

## 1. Giới thiệu
Với đặc thù làm việc trong môi trường outsourcing Nhật nên các dự án không tránh khỏi việc sử dụng fullwidth, dự án của mình đang làm cũng vậy. Ồ thật ra trước khi bị QA bắt bug thì mình nghĩ chức năng tìm kiếm sử dụng **[Scout Elasticsearch Driver](https://viblo.asia/p/scout-elasticsearch-driver-in-laravel-Qbq5QN4LKD8)** là khá uki rồi, vì nó hỗ trợ rất nhiều kiểu query từ search chính xác, search like,.... tuy nhiên dữ liệu dùng để tìm kiếm mới chỉ dừng lại ở text halfwidth. Để hiểu rõ hơn mình sẽ lấy một ví dụ nhé!
- Text có dạng fullwidth: アロハ, Ａｌｏｈａ！
- Text có dạng halfwidth: ｱﾛﾊ, Aloha!
=> Khi bạn query "Aloha!" thì những records có text là" Ａｌｏｈａ！" sẽ k được trả về.

Như vậy hiểu nôm na là fullwidth là những từ có độ rộng hơn halfwidth, muốn nhập được fullwidth ta phải cài đặt bộ gõ tiếng Nhật. Thông thường chúng ta sẽ sử dụng halfwidth nhiều hơn, nhưng trong một số trường hợp đặc biệt đôi khi khi làm việc với khách hàng Nhật chúng ta vẫn sử dụng fullwidth, thật may Elasticsearch hỗ trợ việc này. Vì vậy tiếp tục chuỗi series **[Elasticsearch](https://viblo.asia/s/ung-dung-elasticsearch-trong-project-laravel-JzKmg8M6l9N)** hôm nay mình xin giới thiệu với các bạn một plugin giúp chúng ta tìm kiếm với fullwidth search.
## 2. Cách cài đặt
Để cài đặt plugin bạn run command sau:
```
sudo bin/elasticsearch-plugin install analysis-icu
```
![](https://images.viblo.asia/5b2f1432-c724-47af-a18b-faeee9729581.png)
Vậy là mình đã cài đặt xong plugin rồi, thật đơn giản đúng k ạ. Bạn có thể tìm hiểu kỹ hơn về [ICU Analysis Plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html#analysis-icu) bạn có thể xem ở đây nhé!
## 3. Cách sử dụng
### 3.1 Tạo IndexConfigurator
```
php artisan make:index-configurator ElasticSearch/CategoryIndexConfigurator
```
Một file **app\Elasticsearch\CategoryIndexConfigurator.php** sẽ được tạo ra, ở file này chúng ta setting đánh index cho đối tượng như sau:
```php
<?php

namespace App\ElasticSearch;

use ScoutElastic\Migratable;
use ScoutElastic\IndexConfigurator;

class CategoryIndexConfigurator extends IndexConfigurator
{
    use Migratable;

    /**
     * @var array
     */
    protected $settings = [
        'analysis' => [
            'normalizer' => [
                'nfkc_cf_normalized' => [
                    'filter' => [
                        'lowercase',
                        'icu_normalizer',
                    ],
                ],
            ],
        ],
    ];
}
```

Và để index hoạt động được bạn cần chạy lệnh sau:
```
php artisan elastic:create-index "App\ElasticSearch\CategoryIndexConfigurator"
```

### 3.2 Tạo Mapping Data
B1: Chúng ta tạo một Model Category có nội dung mapping như sau:
```php
/**
     * Mapping array
     *
     * @var array
     */
    protected $mapping = [
        'properties' => [
            'id' => [
                'type' => 'long',
            ],
            'name' => [
                'type' => 'keyword',
                'normalizer' => 'nfkc_cf_normalized',
            ],
            'description' => [
                'type' => 'keyword',
                'normalizer' => 'nfkc_cf_normalized',
            ],
        ],
    ];
```

B2: Tùy chỉnh data để đồng bộ hóa với từng chỉ mục tìm kiếm:
Sau khi tùy chỉnh mục tìm kiếm ( function toSearchableArray()) ta có được Category Model như sau
```php
<?php

namespace App\Models;
use ScoutElastic\Searchable;
use App\ElasticSearch\CategoryIndexConfigurator;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use Searchable;

    protected $indexConfigurator = AdminIndexConfigurator::class;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Mapping array
     *
     * @var array
     */
    protected $mapping = [
        'properties' => [
            'id' => [
                'type' => 'long',
            ],
            'name' => [
                'type' => 'keyword',
                'normalizer' => 'nfkc_cf_normalized',
            ],
            'description' => [
                'type' => 'keyword',
                'normalizer' => 'nfkc_cf_normalized',
            ],
        ],
    ];

    /**
     * Add field for search array
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
        ];

        return $array;
    }
}
```

Bạn đừng quên đồng bộ hóa data bằng command nì nha:
```
php artisan elastic:update-mapping "App\Models\MyModel"
```
B3: Seed data mẫu
Ở đây mình sẽ seed 3  records có nội dung như sau:
```php
$categories =  [
            [
              'name' => 'Banh ngot',
              'description' => 'Banh su kem, banh ga to',
            ],
            [
                'name' => 'Ｂａｎｈ　ｎｇｏｔ',
                'description' => 'Ｂａｎｈ　ｓｕ　ｋｅｍ，　ｂａｎｈ　ｇａ　ｔｏ',
            ],
            [
                'name' => 'ｂａｎｈ　ｎｇｏｔ',
                'description' => 'ｂａｎｈ　ｓｕ　ｋｅｍ，　ｂａｎｈ　ｇａ　ｔｏ',
            ],
          ];
```
B5: Import data
```
php artisan scout:import "App\Models\Category"
```

Vậy là chúng ta đã cài đặt và cấu hình hoàn tất plugin analysis-icu rồi đó ạ ting ting ^^ . Cùng xem thành quả nhé
### 3.3 Search
Cả 3 ví dụ sau đây mình đều sử dụng 
* VD1: name = **banh ngot** (halfwidth)
 ![](https://images.viblo.asia/5c7231be-c8ec-42c6-af90-085d611fa334.png)

* VD2: name = **Ｂａｎｈ　ｎｇｏｔ** (fullwidth)
![](https://images.viblo.asia/ee67bdef-fdfb-406e-b7d2-8d0b642c846d.png)

* VD3: name = **Ｂａｎｈ　ngot** (fullwidth + halfwidth)
![](https://images.viblo.asia/3fa28a0b-3e80-4dc0-b442-28d515c9da42.png)

Ở ba ví dụ trên cho dù bạn có sử dụng fullwidth hoặc halfwidth thì cũng đều ra cùng 1 kết quả.Thật tuyệt phải k ạ, vì plugin analysis-icu sẽ phân tích, chuẩn hóa cú pháp, hỗ trợ Unicode, chữ hoa, chữ thường cho câu lệnh query của chúng ta, không phân biệt fullwidth hay halfwidth.

## 4. Kết luận
Bài viết trên nhằm chia sẻ cho các bạn một plugin hữu ích, giúp chúng ta giải quyết được bài toán khi yêu cần search với fullwidth. Cảm ơn các bạn đã đọc bài viết của mình nhé :blush::blush::blush:
Tài liệu tham khảo: https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html#analysis-icu