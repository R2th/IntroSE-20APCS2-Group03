Lại là mình [HaiHaChan](https://viblo.asia/u/HaiHaChan) cùng series bài viết[ Mình thích Laravel nhờ người ấy](https://viblo.asia/s/24lJDgVNKPM) đây :) Phải nói là lâu lắm rồi mình mới lại viết một bài viết với chủ đề như vậy. Hơi tiếc là qua 14-2 rồi, nhưng vẫn hi vọng anh em đọc bài của mình sẽ nhanh tìm thấy "gấu" ;)

Cơ mà gấu ở đâu thì học "elasticsearch" đi rồi mình nói cho mà nghe nhé ;)

### 1. Đừng bỏ qua khái niệm

**Elasticsearch** là một search engine (công cụ tìm kiếm ) phân tán mạnh mẽ, hỗ trợ cho rất nhiều loại dữ liệu, bao gồm cả dữ liệu có cấu trúc và phi cấu trúc. 

Tại sao chúng ta nên sử dụng Elasticsearch?
- **Elasticsearch rất nhanh**: Vì Elasticsearch được xây dựng dựa trên Lucene nên nó vượt trội trong việc tìm kiếm toàn văn bản. Elasticsearch cũng là một nền tảng tìm kiếm gần thời gian thực, có nghĩa là độ trễ từ khi tài liệu được đánh chỉ mục cho đến khi tài liệu có thể tìm kiếm được là rất ngắn - thường là 1s. Do đó, Elasticsearch rất phù hợp cho các trường hợp tìm kiếm có yêu cầu cao về mặt thời gian.
- **Elasticsearch là phân tán**: Các tài liệu được lưu trữ trong Elasticsearch được phân tán trên các vùng chứa khác nhau được gọi là các phân đoạn, và được sao chép để cung cấp các bản sao dự phòng trong trường hợp lỗi phần cứng. Bản chất phân tán của Elasticsearch cho phép nó mở rộng quy mô lên hàng trăm (hoặc thậm chí hàng nghìn) máy chủ và xử lý hàng petabyte dữ liệu.
- **Elasticsearch đi kèm với một loạt các tính năng hữu ích**: Ngoài tốc độ, khả năng mở rộng và khả năng phục hồi, Elasticsearch có một số tính năng tích hợp mạnh mẽ giúp lưu trữ và tìm kiếm dữ liệu hiệu quả hơn, chẳng hạn như cuộn dữ liệu và quản lý vòng đời chỉ mục.
- **Elastic Stack đơn giản hóa việc nhập, hiển thị và báo cáo dữ liệu**. Tích hợp Beats và Logstash giúp dễ dàng xử lý dữ liệu trước khi đánh chỉ mục cho Elasticsearch. Và Kibana cung cấp real-time visualization (hình ảnh trực quan theo thời gian thực) của dữ liệu cũng như giao diện người dùng để truy cập nhanh chóng vào dữ liệu, giúp giám sát hiệu suất ứng dụng (APM), logs,...vv

### 2. Cài đặt Elasticsearch

Bước 1: Download và install public signing key:
```
$ wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```
Bước 2: Lưu repository định nghĩa từ `/etc/apt/sources.list.d/elastic-7.x.list`:
```
$ echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
```
Bước 3: Cài đặt Elasticsearch
```
sudo apt-get update && sudo apt-get install elasticsearch
```

Bạn có thể tham khảo thêm tại [đây](https://www.elastic.co/guide/en/elasticsearch/reference/7.2/deb.html) để được hướng dẫn chi tiết nhé :)

Sau khi cài đặt xong thì bạn hãy tải thêm vài plugin cần thiết
```
sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-kuromoji
sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-icu
sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install https://github.com/sun-asterisk-research/elasticsearch-analysis-vi/releases/download/v1.0.0/analysis-vi-1.0.0-es7.2.0.zip
```

Ở đây mình có gợi ý cho bạn 3 plugin cho 3 ngôn ngữ: Anh, Nhật, Việt :)

Giờ thì kiểm tra việc cài đặt nào
```
$ curl localhost:9200
{
    "name" : "localhost",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "aOC75N4xT625uDBRrsJt6g",
    "version" : {
        "number" : "7.2.0",
        "build_flavor" : "default",
        "build_type" : "deb",
        "build_hash" : "508c38a",
        "build_date" : "2019-06-20T15:54:18.811730Z",
        "build_snapshot" : false,
        "lucene_version" : "8.0.0",
        "minimum_wire_compatibility_version" : "6.8.0",
        "minimum_index_compatibility_version" : "6.0.0-beta1"
    },
    "tagline" : "You Know, for Search"
}
```

Như vậy là oke nhé :)

### 3. Viblo Docker và Viblo Docker Elasticsearch

Nay có Docker nên dev đã khác xưa rồi. Phải nói, nếu Docker có là trà xanh thì mình vẫn thấy Docker và Dev mới là cặp đôi hoàn hảo =)). Vậy lên hãy cùng mình tìm hiểu Docker với series [Đơn giản là Docker](https://viblo.asia/s/W65GEjAjZDO) nhé :rofl:

Quảng cáo đến đây là hết rồi :rofl:

Từ khi có Docker, thì thực sự, anh em dev chúng ta đã đỡ đau đầu hơn rất nhiều trong việc cài đặt môi trường cho project. Và cụ thể là với Elasticsearch, chúng ta có một image tuyệt vời - [Viblo Docker Elasticsearch](https://github.com/viblo-asia/docker-elasticsearch), là một OS của anh [Phương](https://viblo.asia/u/phuongth) thuộc **Sun* RnD**. Image này đã tích hợp sẵn 3 plugins hỗ trợ tìm kiếm với tiếng Việt, tiếng Nhật và tiếng Anh, nên là cực kì tiện lợi. Chỉ run 1 image là có tất cả. Quả là "A mazing gút chóp" :)

Bạn chỉ cần thêm service `viblo/elasticsearch`
```
services:
    elasticsearch:
        image: viblo/elasticsearch:7.2.0
```
và `docker-compose up`. Vậy là bạn đã có 1 container elasticsearch


### 4. Tích hợp Elasticsearch và Laravel

Để tích hợp Elasticsearch, mình sẽ dùng một package rất hay, đó là [Scout Elasticsearch Driver](https://github.com/babenkoivan/scout-elasticsearch-driver) 

Package này cung cấp chức năng nâng cao để tìm kiếm và lọc dữ liệu với Elasticsearch. Nó có rất nhiều tính năng, bao gồm:
- Giúp cấu hình và tạo chỉ mục Elasticsearch một cách dễ dàng. 
- Giúp cấu hình đầy đủ cho từng Model.
- Khả năng thêm trường mới vào ánh xạ một cách tự động hoặc sử dụng lệnh artisan.
- Có nhiều cách triển khai thuật toán tìm kiếm của bạn: sử dụng rules hoặc tìm kiếm thô.
- Có nhiều bộ lọc hộ trợ giúp bạn viết truy vấn nhanh và hiệu quả hơn hơn.
- Zero downtime migration khi đánh lại chỉ mục.
- Hỗ trợ đánh chỉ mục hàng loạt.

Để sử dụng package này, bạn cần
- PHP version >=7.1.3, <=7.3
- Laravel Framework version >=5.8
- Elasticsearch version >=7

Đầu tiên, bạn hãy cài đặt package này cho project của bạn
```
$ composer require babenkoivan/scout-elasticsearch-driver
```

Sau đó thì config nào
```php:config/app.php
'providers' => [
    Laravel\Scout\ScoutServiceProvider::class,
    ScoutElastic\ScoutElasticServiceProvider::class,
]
```

Tiếp theo, bạn chạy 2 lệnh này để sinh config cho package
```
$ php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
$ php artisan vendor:publish --provider="ScoutElastic\ScoutElasticServiceProvider"
```

Giờ thì bắt đầu việc đánh index nào. Chúng ta sẽ cần tạo 1 class để cấu hình việc đánh chỉ mục, được sử dụng để thiết lập cài đặt cho chỉ mục Elasticsearch. Lệnh sau sẽ giúp bạn sinh một file cấu hình mới cho model của bạn
```
$ php artisan make:index-configurator MyModelIndexConfigurator
```

Sau đó, chỉnh sửa file này để có cấu hình bạn mong muốn

```php:App\Elasticsearch\MyModelIndexConfigurator.php
<?php

namespace App\Elasticsearch;

use ScoutElastic\IndexConfigurator;

class MyModelIndexConfigurator extends IndexConfigurator
{
    // It's not obligatory to determine name. By default it'll be a snaked class name without `IndexConfigurator` part.
    protected $name = 'my_index';  
    
    // You can specify any settings you want, for example, analyzers. 
    protected $settings = [
        'analysis' => [
            'analyzer' => [
                'es_std' => [
                    'type' => 'standard',
                    'stopwords' => '_spanish_'
                ]
            ]
        ]
    ];
}
```

Để tìm hiểu thêm về phần settings, bạn có thể xem chi tiết tại [đây](https://www.elastic.co/guide/en/elasticsearch/guide/current/index-management.html).

Tiếp theo chúng ta sẽ config cho `MyModel`
```php:App\Models\MyModel.php
<?php

namespace App\Models;

use App\Elasticsearch\MyModelIndexConfigurator;
use ScoutElastic\Searchable;
use Illuminate\Database\Eloquent\Model;

class MyModel extends Model
{
    use Searchable;

    protected $indexConfigurator = MyModelIndexConfigurator::class;

   protected $searchRules = [
        //
    ];

    // Here you can specify a mapping for model fields
    protected $lmapping = [
        'properties' => [
            'title_en' => [
                'type' => 'text',
                'analyzer' => 'es_std',
                // Also you can configure multi-fields, more details you can find here https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html
                'fields' => [
                    'raw' => [
                        'type' => 'keyword',
                    ]
                ]
            ],
        ]
    ];
}
```
Trong đó, bạn cần quan tâm 2 biến:
- **$searchRules**: [Chi tiết](https://github.com/babenkoivan/scout-elasticsearch-driver#search-rules)
- **$mapping**: [Chi tiết](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/mapping.html)

Oke. Giờ thì đánh index thôi nào. Hai lệnh sau sẽ giúp bạn đánh index cho model của bạn
```sh
$ php artisan elastic:create-index "App\Elasticsearch\MyModelIndexConfigurator"
$ php artisan scout:import "App\Models\MyModel"
```

Đừng quên thêm lệnh update index cho cron nhé

```php:app/Console/Kernel.php 
$schedule->command('scout:import "App\Models\MyModel"')->dailyAt('00:00');
```

Để tìm hiểu thêm, bạn có thể đọc hướng dẫn tại [đây](https://github.com/babenkoivan/scout-elasticsearch-driver)

### 5. Xây dựng api tìm kiếm thôi là xong rồi

```php:App\Http\Controllers\SearchController
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MyModel;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $limit = $request->query->get('limit', 5);
        $ids = MyModel::search($request->get('q'))
            ->keys()
            ->toArray();

        $idsStr = implode(',', $ids);
        $myModels = Post::whereIn('id', $ids)
            ->orderByRaw("FIELD(id, $idsStr)")
            ->paginate($limit);

        return $myModels;
    }
}

```

Giờ bạn chỉ cần gọi tới api với param `?q=<noi_dung_tim_kiem>)` là ok. Ví dụ như:
```php
http://localhost:8000/api/search?q=where is my honey...
```

Cơ mà gấu ở đâu còn lâu mới biết =)). À ý mình là gấu ở đâu học lâu thành tài rồi gấu tự đến. Vậy nhé! Chúc bạn thành công với Elasticsearch nha, chứ bạn không biết thì mình làm sao mà biết được gấu của bạn ở đâu<div align="center"><b>:joy: Cà khịa một chút thì vui, cà khịa nhiều chút thì ... càng vui chứ còn sao nữa</b> :joy:</div>

Trên đây là một số tìm hiểu của mình về Elasticsearch. Hi vọng bài viết này sẽ có ích với bạn. Hẹn gặp lại bạn ở những bài viết lần sau nhé. Hứa sẽ tích cực cà khịa :joy:

Tài liệu tham khảo

[Elasticsearch](https://www.elastic.co/guide/index.html)