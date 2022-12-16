Hiện tại tôi không tìm thấy 1 tài liệu nào miêu tả đầy đủ các API của elasticsearch. Vì thế để nắm được API thì tôi đã memo lại tại đây.
> Version sử dụng là 1.x

![](https://images.viblo.asia/e3bc4d9d-2268-4b82-b5f5-a6383de6d105.png)https://images.viblo.asia/e3bc4d9d-2268-4b82-b5f5-a6383de6d105.png

Elasticsearch cung cấp các loại API. Theo hình ảnh trên đây, không chỉ có đăng kí document, search mà còn setting các loại monitoring, maintain để tăng cường khả năng mở rộng API

### document API
là API thao tác với document như create và update
```
【document api】
PUT    /{index}/{type}/{id}          # update document
POST   /{index}/{type}               # create document
GET    /{index}/{type}/{id}          # get document
GET    /{index}/{type}/{id}/_source  # get _source
HEAD   /{index}/{type}/{id}          # confirm exist document
DELETE /{index}/{type}/{id}          # delete document
POST   /{index}/{type}/{id}/_update  # update bộ phận document
GET    /_mget                        # get many document
GET    /{index}/_mget                # get many document
GET    /{index}/{type}/_mget         # get many document
POST   /_bluk                        # delete many document
POST   /{index}/_bluk                # delete many document
POST   /{index}/{type}/_bluk         # delete many document
GET /{index}/{type}/{id}/_termvector # get information word statistic
GET /_termvectors                    # get information word statistic of many document
GET /{index}/_termvecrots            # get information word statistic of many document
GET /{index}/{type}/_termvectors     # get information word statistic of many document
```

### search api
là API dùng để search document đã được đánh index
```
【search api】
GET|POST    /{index}/{type}/_search    # search document
{index} ... blank | * | _all | glob pattern | name1, name2, …
{type}  ... blank | name1, name2, …
```

### Index management
là API thao tác liên quan đến index như là create
```
【index api】
PUT    /{index}                    # create index
DELETE /{index}                    # delete index
HEAD   /{index}                    # confirm exist index
POST   /{index}/_close             # block write index
POST   /{index}/_open              # open write index
{index} ... * | _all | glob pattern | name1, name2, …
```

### mapping management
là API quản lý và định nghĩa mapping
```
【mapping api】
PUT /{index}/_mapping/{type}       # định nghĩa mapping
PUT /{index}/{type}/_mapping       # mapping ngược?
GET /{index}/_mapping/{type}       # get định nghĩa mapping
GET /{index}/{type}/_mapping       # get mapping ngược？
GET /{index}/_mapping/{type}/field/{field} # get field đinh nghĩa mapping
GET /{index}/{type}/_mapping/field/{field} # get filed mapping ngược
DELETE /{index}/{type}             # delete mapping
DELETE /{index}/_mapping/{type}    # xoá định nghĩa mapping
DELETE /{index}/{type}/_mapping    # xoá định nghĩa mapping ngược
HEAD   /{index}/{type}             # confirm type exist
{index} ... blank | * | _all | glob pattern | name1, name2, …
{type}  ... blank | * | _all | glob pattern | name1, name2, …
{field} ... * | glob pattern | name1, name2, …
```

### alias management
là API quản lý index alias
```
【index aliases api】
POST   /_aliases                   # add, delete alias
PUT    /{index}/_alias/{name}      # add alias name 
DELETE /{index}/_alias/{name}      # delete alias
GET    /{index}/_alias/{name}      # get alias information
HEAD   /{index}/_alias/{name}      # check alias exist
{index} ... blank | * | _all | glob pattern | name1, name2, …
{name}  ... blank | * | _all | glob pattern | name1, name2, …
※ định nghĩa alias bao gồm cả việc khi tạo index
```

### index settings
Quản lý việc setting index
```
【indices settings api】
PUT    /{index}/_settings        # update setting index
GET    /{index}/_settings        # get setting index
{index} ... blank | * | _all | glob pattern | name1, name2, …
【analyze api】
GET    /{index}/_analyze         # test analyze 
{index} ... blank | name
【index templates api】
PUT    /_template/{name}         # setting index template
DELETE /_template/{name}         # delete index template
GET    /_template/{name}         # get index template
{name} ... blank | * | _all | glob pattern | name1, name2, …
【warmer api】
PUT    /{index}/{type}/_warmer/{name} # setting form search request
DELETE /{index}/{type}/_warmer/{name} # delete form search request
GET    /{index}/_warmer/{name}        # get form search request
{index} ... blank | * | _all | glob pattern | name1, name2, …
{name}  ... blank | * | _all | glob pattern | name1, name2, …
※ có thể sử dụng _warmers thay cho _warmer 
※ request form search là create index, setting template
```

### monitoring
API thực hiện việ monitor thông tin status index
```
GET    /{index}/_status        # get index status
GET    /{index}/_stats         # get index statistic¥
GET    /{index}/_segments      # get index shard
GET    /{index}/_recovery      # get recovery index
{index} ... blank | * | _all | glob pattern | name1, name2, …
```

### status management
API quản lý các thông tin của index như là cache
```
【status api】
POST /{index}/_cache/clear    # clear thông tin cache của index
POST /{index}/_refresh        # refresh index
POST /{index}/_flush          # clear transaction log
POST /{index}/_optimize       # tối ưu search
{index} ... blank | * | _all | glob pattern | name1, name2, …
※ _refresh、_flush là được default thực thi

```

### cat apis
API để export thông tin text 
```
GET    /_cat/aliases            # get alias index
GET    /_cat/allocation         # get shard and disk used
GET    /_cat/count/{index}      # get the number document of index
GET    /_cat/health             # get cluster information
GET    /_cat/indices/{index}    # get index information
GET    /_cat/master             # get master node
GET    /_cat/nodes              # get structure cluster
GET    /_cat/pending_tasks      # get pending task of cluster
GET    /_cat/recovery           # get replication shard
GET    /_cat/thread_pool        # get thread pool of node
GET    /_cat/shards             # get shard 
GET    /_cat/plugins            # get plugin 
```

### cluster apis
API thay đổi setting liên quan đến trạng thái của cluster

```
【cluster api】
GET  /_cluster/health/{index}           # get healthy cluster
GET  /_cluster/state/{metrics}/{index}  # get summary status cluster
GET  /_cluster/stats                    # get cluster status
GET  /_cluster/pending_tasks            # get pending task
POST /_cluster/reroute                  # get index reroute
PUT  /_cluster/settings                 # update setting cluster
GET  /_cluster/settings                 # get setting cluster
GET  /_nodes/{nodeIds}/stats/{stats}    # get node label
GET  /_nodes/{nodeIds}/{info}           # get node information
GET  /_nodes/{nodeIds}/hot_threads      # get hight thread
POST /_cluster/nodes/{nodeIds}/_shutdown # stop node
{index}   ... blank | * | _all | glob pattern | name1, name2, …
{nodeIds} ... blank | _all | _local | ip addresses | names | attributes
{info}    ... blank | settings | os | process | jvm | thread_pool | network | transport | http | plugins
{stats} ... blank | indices | fs | http | jvm | network | os | process | thread_pool | transport | breaker
```

### Pretty
muốn export kết quả dưới dạng JSON cho dễ nhìn chúng ta sử dụng tham số pretty
```
?pretty=true
```

Muốn export format YAML
```
?format=yaml
```

Ngoài ra kết quả cũng có thể export ra file khi sử dụng lệnh cURL
```
$ vi tweet1.js
{
    "user" : "kimchy",
    "post_date" : "2009-11-15T14:12:12",
    "message" : "trying out Elasticsearch"
}
```

khi sử dụng để xem nội dung của index
```
$ curl -XPUT 'localhost:9200/twitter/tweet/1' -d @tweet1.js
```