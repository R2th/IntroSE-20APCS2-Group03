Như ở [bài này](https://viblo.asia/p/php-voi-cassandra-6J3ZgB3PKmB) chúng ta biết thêm về 1 hệ cơ sở dữ liệu Cassandra. Vậy việc áp dụng hệ cơ sở dữ liệu này vào trong dự án sử dụng Laravel ta sẽ làm như thế nào.
Trong khi search google tôi có tìm thấy 1 thư viện có hỗ trợ nhưng bản thân tôi thấy dùng theo nó không tiện cho lắm vì vậy tôi chia sẻ cách tôi đã dùng với Cassandra như thế nào.
### Cài đặt và thiết lập ###
Để cài đặt môi trường tren máy thì bạn theo những bước mình đã chia sẻ ở bài trên, tiếp đến để chạy trên laravel ta cần dùng 1 thư viện mặc định của Cassandra cho php trong file compose.json
```composer.json
"datastax/php-driver": "v1.3.2"
```
Tiếp theo ta tạo 1 file config để thiết lập cấu hình cho việc kết nối đến database Cassandra này:
```cassandra.php
<?php

return [
    'contactpoints' => env('CASSANDRA_HOST', '127.0.0.1'),
    'port' => env('CASSANDRA_PORT', 9042),
    'keyspace' => env('CASSANDRA_KEYSPACE', ''),
    'username' => env('CASSANDRA_USER', ''),
    'password' => env('CASSANDRA_PASSWORD', ''),
];
```

Sau đó ta tạo 1 singleton để gọi việc connect đến Database này ở file App\Providers\CassandraServiceProvider
```CassandraServiceProvider.php
<?php

namespace App\Providers;

use Cassandra;
use Illuminate\Support\ServiceProvider;

class CassandraServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('cassandra', function () {
            $cluster = Cassandra::cluster()
                ->withContactPoints(config('cassandra.contactpoints'))
                ->withPort(intval(config('cassandra.port')))
                ->withCredentials(config('cassandra.username'), config('cassandra.password'))
                ->build();

            $keyspace = config('cassandra.keyspace');

            return $cluster->connect($keyspace);
        });
    }
}
```
Như vậy để lấy cluster của cassandra ta chỉ việc gọi app('casandra') là xong.

### Sử dụng trên Model ###
Tiếp đến để tạo ra gần như tương đồng với Model của laravel cho nên tôi viết thêm 1 hàm BaseCassandra.php trong folder Models (là nơi chứa các file Model) rồi sau đó những Model mà có cơ sở dữ liệu là cassandra thì chỉ việc extends BaseCassandra này là được.
Vì bản thân Cassandra cũng có vài hạn chế trong việc tìm kiếm do vậy chỉ có thể cung cấp vài hàm cơ bản là: whereIn, whereNotIn, where, get, limit.
Trước khi dùng đến cassandra ta đều cần phải connect đến DB, do vậy nội dung khởi tạo của hàm BaseCassandra như sau:
```BaseCassandra
<?php

namespace App\Models;
class BaseCassandra
{
    private $cassandra;
    public function __construct()
    {
        $this->cassandra = app('cassandra');
    }
}
```

Như vậy ta đã gọi việc kết nối đến cassandra đã xong, giờ ta viết các hàm cần thiết như tôi đã liệt kê ở trên
**Funtion limit**
```BaseCassandra
/**
     * Limit the query result
     *
     * @param null $limit
     * @return BaseCassandra
     */
    public function limit($limit = null)
    {
        if (is_numeric($limit) && $limit > 0) {
            $this->limit = $limit;
        }

        return $this;
    }
```

**Function where**
```BaseCassandra
/**
     * Add an "where" clause to the query.
     *
     * @param $key
     * @param $value
     * @param string $operator
     * @return $this
     */
    public function where($key, string $value, $operator = '=')
    {
        $this->where[] = [
            'operator' => $operator,
            'key' => $key,
            'value' => $value,
        ];

        return $this;
    }

```

**Function whereIn**
```BaseCassandra
/**
     * Add an "where in" clause to the query.
     *
     * @param $key
     * @param $values
     * @param string $operator
     * @return $this
     */
    public function whereIn($key, array $values, $operator = 'IN')
    {
        $values = array_wrap($values);

        $this->where[] = [
            'operator' => $operator,
            'key' => $key,
            'value' => $values,
        ];

        return $this;
    }

```

**Function whereNotIn**
```BaseCassandra
/**
     * Add an "where not in" clause to the query.
     *
     * @param $key
     * @param $values
     * @return BaseCassandra
     */
    public function whereNotIn($key, array $values)
    {
        return $this->whereIn($key, $values, 'NOT IN');
    }
```
Cuối cùng là hàm get để thực thi các điều kiện ở trên.
**Function get()**
```BaseCassandra
 }

    /**
     * Execute query
     *
     * @return \Illuminate\Support\Collection|null
     */
    public function get()
    {
        try {
            $query = $this->cassandra->executeAsync($this->toCql());
            $result = $query->get();
            $this->clearQuery();
            $data = [];

            foreach ($result as $row) {
                $data[] = $this->processRow($row);
            }

            return count($data) ? collect($data) : null;
        } catch (InvalidQueryException $ex) {
            \Log::debug($ex->getMessage());

            return collect();
        }
    }
```

### Elastic search ###
Như đã nói ở bài trước thì 1 trong những điều bất lợi của Cassandra đấy là viecj hỗ trợ tìm kiếm không tốt bằng MySQl, chính vì vậy để giải quyết vấn đề này thì tôi sử dụng Elastic Search đi kèm với Cassandra.
Để sử dụng các điều kiện tìm kiếm tôi viết thêm 1 BaseService để phục vụ riêng việc tìm kiếm trên elastic search sau đó trả về các Ids, từ đó lại gọi đến hàm whereIn mà tôi đã viết trên BaseCassandra ở trên.
Ở đây tôi ví dụ 1 vài hàm thường dùng để các bạn tham khảo.
```BaseService
<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

abstract class BaseService
{
    private $elasticSearch;
    public function __construct()
    {
        $this->elasticSearch = app('elasticSearch');
        $this->makeParam();
    }

    public function makeParam()
    {
        $this->params = $this->getConfig();
    }

    abstract public function getConfig();
    public function where($keys, $value, $exactly = false)
    {
        $keys = array_wrap($keys);
        if (!is_array($keys)) {
            $queryType = $exactly ? 'match_phrase' : 'match';
            $this->where[] = [
                $queryType => [
                    $keys => $value,
                ],
            ];
        } else {
            $queryType = $exactly ? 'most_fields' : 'phrase_prefix';
            $this->where[] = [
                'multi_match' => [
                    'query' => $value,
                    'fields' => $keys,
                    'type' => $queryType
                ],
            ];
        }

        return $this;
    }
    public function orWhere($keys, $value, $exactly = true)
    {
        $keys = array_wrap($keys);

        $queryType = $exactly ? 'match_phrase' : 'match';
        foreach ($keys as $key) {
            $this->orWhere[] = [
                $queryType => [
                    $key => $value,
                ],
            ];
        }

        return $this;
    }
    
    public function like($keys, $value, $others = [])
    {
        $keys = array_wrap($keys);

        foreach ($keys as $key) {
            $this->like[] = [
                [
                    'wildcard' => [
                        $key . '.keyword' => '*' . $value . '*',
                    ]
                ],
                [
                    'wildcard' => [
                        $key => '*' . $value . '*'
                    ]
                ]
            ];
        }

        if (!empty($others)) {
            foreach ($others as $key => $values) {
                $values = array_wrap($values);
                foreach ($values as $value) {
                    $this->like[] = [
                        'match' => [
                            $key => $value,
                        ],
                    ];
                }
            }
        }

        return $this;
    }
    
    public function execute()
    {
        $results = $this->getIdList();
        $items = $this->model->select($this->columns)->whereIn('id', $results['ids'])->get();
        $items = $this->mappingData($items, $results['ids']);

        return $this->getPagingLinks($items, $results['total'], $this->params['size'], $this->page);
    }

    public function getIdList()
    {
        $this->eagerLoadWhere();
        $response = $this->elasticSearch->search($this->params)['hits'];
        $idArr = array_pluck($response['hits'], '_id');

        $results = [
            'total' => $response['total'],
            'ids' => $idArr
        ];

        return $results;
    }
    
    private function eagerLoadWhere()
    {
        if (!count($this->where)
            !count($this->orWhere)
           !count($this->like)
        ) {
            return;
        }

        $queries = [];
        if (count($this->where)) {
            foreach ($this->where as $where) {
                $queries['must'][] = $where;
            }
        }

        if (count($this->orWhere)) {
            foreach ($this->orWhere as $orWhere) {
                $queries['should'][] = $orWhere;
            }
        }

      if (count($this->like)) {
            $queries['must'][]['bool']['should'] = $this->like;
        }

        $this->params['body']['query']['bool'] = $queries;
    }
  
    
```