Hà Nội một ngày mưa bì bõm. Nếu bạn có những dòng suy nghĩ sau đây thì có thể đọc bài viết của mình cho đỡ buồn:
* Bạn muốn ở nhà ôm máy tính hơn là ra đường trong thời tiết mưa gió
* Bạn đã từng làm việc với API hoặc từng viết API
* Đồng ý là hiện tại RESTful API là một chuẩn phổ biến để xây dựng API
* Bạn không chắc RESTful API của bạn có đúng là một RESTful API
* Công việc viết API đôi lúc làm bạn có cảm giác làm lại công việc của ngày hôm qua, làm bạn thấy nhàm chán
* Tỉ dụ bạn làm mobile app, công việc của bạn không phải viết API nhưng bạn cảm thấy phiền toái khi phải phụ thuộc vào 1 team khác đảm nhận việc này

Trong phạm vi bài viết mình muốn giới thiệu đến các bạn Apify - thư viện hỗ trợ lập trình viên phát triển RESTful API nhanh chóng và dễ dàng hơn. Thư viện này được phát triển không phải từ một cách tư duy cao siêu nào đó mà từ chính nhu cầu thiết thực trong công ty mình khi mà mình nhận thấy những vấn đề như:
* Công ty có rất nhiều dự án và hầu hết đều cần đến API
* Các nhóm trong công ty thường có những chuẩn API khác nhau
* Một số lập trình viên nhóm mobile không thể đảm nhận việc viết API
* Công việc viết API rất quan trọng nhưng cũng dễ gây nhàm chán cho lập trình viên

Đã có nhiều thư viện, công cụ để lập trình viên giải quyết các vấn đề liên quan tới RESTful API và Apify cũng chỉ là một giải pháp xuất phát từ cách nhìn nhận của một nhóm lập trình viên, mình không cố tạo ra một công cụ giải quyết hết tất cả các trường hợp sử dụng mà mục tiêu là cân bằng giữa tính tổng quát và khả năng mềm dẻo, tùy biến cao. Điều đó có nghĩa là với Apify lập trình viên có thể tạo ra những API service mà không cần viết bất cứ dòng code nào cũng như hoàn toàn có thể tùy biến hay tạo mới các hàm API theo nhu cầu sử dụng của riêng mình một cách dễ dàng.

Ưu điểm của RESTful API là sự tinh gọn - để xây dựng nó theo mình chỉ cần 1 nền tảng công nghệ là đủ, giữa vô vàn lựa chọn mình nhận thấy PHP và MySQL là sự kết hợp tuyệt vời cả về sự ổn định hiệu năng cũng như khả năng triển khai nhanh chóng trong chính các dự án của công ty mình. Giải pháp là mình sẽ đóng gói Apify như là một composer package dùng cho Laravel/Lumen Framework.

Tóm lại Apify giải quyết được các vấn đề:
* Đơn giản hóa việc xây dựng API service
* Tạo ra một quy chuẩn về URI, Request, Response… cho RESTful API
* Tùy biến theo nhu cầu: định nghĩa các relationship phức tạp, authorization, caching, tích hợp với các hệ thống khác...
* Làm công việc viết API trở nên bớt nhàm chán

Hiện tại thư viện này đang được dùng trong nhiều dự án của công ty cũng như của cá nhân mình, vì thế nó sẽ được nâng cấp thường xuyên vì những nhu cầu thực tế, hy vọng cũng phần nào giúp ích được cho cộng động lập trình viên trong việc tiết kiệm thời gian viết API hay đơn giản chỉ là đóng góp thêm một bài viết

Các bạn có thể tham khảo source code trên [Github](https://github.com/phult) của mình https://github.com/phult/apify, hướng dẫn sau đây sẽ giúp bạn làm việc với thư viện này, nó được mình lấy từ README.md, mình nghĩ không nên viết một tài liệu hướng dẫn bằng Tiếng Việt nữa vì hướng dẫn này đã đủ ngắn gọn và dễ hiểu, cũng để tránh việc làm thay đổi bản chất của những thuật ngữ chuyên ngành, ngoài ra mình làm không tốt trong việc viết tài liệu hướng dẫn, đây cũng là điểm yếu chung của nhiều anh em lập trình viên.

# Apify

A pretty library to help developers build `RESTful APIs` lightly, quickly and properly even without writing code.

It's always easy to customize to suit any need such as defining data relationships, authorization, caching, communicating or integrating into other systems.

## Features

* Serves RESTful APIs for any MySql database
  * Pagination 
  * Sorting
  * Selection
  * Grouping, Having
  * Filtering
  * Relationships
  * Metadata
* Supports Event Bus

Use HTTP clients like [Postman](https://www.getpostman.com/) to invoke RESTful API calls.

Combine with [API Gateway](https://github.com/megaads-vn/api-gateway) is also recommended to build a completely development environment for microservice.

## Installation

Apify is packed as a composer package. So it's installed quickly in 2 steps
1. Require the composer package

    `composer require megaads/apify`

2. Register the provider: 

    `Megaads\Apify\ApifyServiceProvider`

## System requirements
 - PHP: >= 5.6
 - Laravel/ Lumen Framework: 5.4.*
 - MySQL
 - Message queue server: optional

## API Overview

| HTTP Method | API URL                          | Description             
|-------------|----------------------------------|------------------------------------------------------- 
| GET         | `/api/entity`                      | List all records of table that match the query                 | 
| GET         | `/api/entity/:id`                  | Retrieve a record by primary key :id                      |   
| POST        | `/api/entity`                      | Insert a new record, bulk inserting is also avaiable      |   
| PUT         | `/api/entity/:id`                  | Replaces existed record with new one                      | 
| PATCH       | `/api/entity/:id`                  | Update record element by primary key                      |  
| DELETE      | `/api/entity/:id`                  | Delete a record by primary key                            |  
| DELETE      | `/api/entity`                      | Delete bulk records that match the query                   |  
| POST      | `/api/upload`                        | Upload a file                                            |  

## Pagination

| Parameter   | Required    | Default    | Description                                                      |
|-------------|-------------|------------|------------------------------------------------------------------|
| page_id     | No          | 0          | Page index, start at 0
| page_size   | No          | 50         | Number of rows to retrieve per page

```
/api/post?page_id=2&page_size=20
```

## Sorting

Order by multiple columns using **`sorts`** parameter

### Sort ascending

```
/api/post?sorts=user_id
```

### Sort descending

```
/api/post?sorts=-created_at
```

### Sort by multiple columns

```
/api/post?sorts=user_id,-created_at
```

## Selection

Select columns from the records using **`fields`** parameter. SQL aggregate functions such as `COUNT`, `MAX`, `MIN`, `SUM`, `AVG`, SQL aliases are also available

```
/api/post?fields=id,content,user_id,sum(view_count) as view_sum
```

## Group By

Group the result-set by one or more columns using **`groups`** parameter and combine with aggregate functions using `Selection`

```
/api/post?fields=user_id,sum(view_count)&groups=user_id
```

## Filtering

| Operator   | Condition          |  For example                                         
|--------------|--------------------|----------------------------------
| =            |  Equal to          | /api/post?filters=user_id=1
| !=           |  Not equal         | /api/post?filters=user_id!=1
| >            |  Greater           | /api/post?filters=user_id>1
| >=           |  Greater or equal  | /api/post?filters=user_id>=1
| <            |  Less              | /api/post?filters=user_id<1
| <=           |  Less or equal     | /api/post?filters=user_id<=1
| ={}          |  In                | /api/post?filters=user_id={1;2;3}
| !={}         |  Not in            | /api/post?filters=user_id!={1;2;3}
| =[]          |  Between           | /api/post?filters=user_id=[1;20]
| !=[]         |  Not between       | /api/post?filters=user_id!=[1;20]
| ~            |  Like              | /api/post?filters=title~hello
| !~           |  Not like          | /api/post?filters=title!~hello

Apify supports filtering records based on more than one `AND`, `NOT` condition by using comma. For example: 

```
/api/post?filters=user_id=1,status={enabled;pending},tile~hello,view_count!=null
```

Complex conditions that combine `AND`, `OR` and `NOT` will be available soon.

## Entity conventions

Apify works by a simple mechanism, looking for a model class that correspond to the API entity, otherwise the API entity will be matched to a suitable DB table. That means no model class is required to create, do it only in the case of defining relationships, customizing.

So API entity name should follow one of the conventions:

* The API entity name is the same as a model class name

* Or the API entity name in `snake_case` that correspond to a model class with the name in `CamelCase`

* Or the API entity name is the same as a DB table name

## Relationships

Apify is packed into a `Laravel`/ `Lumen` package so relationships also are defined as methods on `Eloquent` model classes.

See Laravel docs for details: https://laravel.com/docs/5.6/eloquent-relationships

Let's consider the following relationship definations:

- A `Nation` has many `City` (one-to-many relationship)

```php
namespace App\Models;
class Nation extends \Apify\Models\BaseModel {
    protected $table = 'location_nation';
    public function cities() {
        return $this->hasMany('App\Models\City', 'nation_id', id);
    }
}
```

- A `City` belongs to a `Nation` (many-to-one relationship)
- A `City` has many `District` (one-to-many relationship)

```php
namespace App\Models;
class City extends \Apify\Models\BaseModel {
    protected $table = 'location_city';
    public function nation() {
        return $this->belongsTo('App\Models\Nation', 'nation_id');
    }
    public function districts() {
        return $this->hasMany('App\Models\District', 'city_id', id);
    }
}
```

- A `District` belongs to a `City` (many-to-one relationship)

```php
namespace App\Models;
class District extends \Apify\Models\BaseModel {
    protected $table = 'location_district';
    public function city() {
        return $this->belongsTo('App\Models\City', 'city_id');
    }
}    
```

### Selection on relationships
Apify provides the ability to embed relational data into the results using `embeds` parameter

For example

```
/api/nation?embeds=cities
```

```
/api/city?embeds=nation,districts
```

```
/api/district?embeds=city
```

Even nested relationships

```
/api/nation?embeds=cities.districts
```

```
/api/district?embeds=city.nation
```

### Filtering on relationships

```
/api/city?filters=nation.location_code=EU,districts.name~land
```

## Metric

### metric=get (by default): Retrieve all records that match the query

```
/api/post
```
or

```
/api/post?metric=get
```

Response format

```json
{
    "meta": {
        "has_next": true,
        "total_count": 100,
        "page_count": 2,
        "page_size": 50,
        "page_id": 0
    },
    "result": [],
    "status": "successful"
}
```

### metric=first: Retrieve the first record that matchs the query


```
/api/post?metric=first
```

Response format

```json
{    
    "result": {},
    "status": "successful"
}
```

### metric=count: Retrieve the number of records that match the query

```
/api/post?metric=count
```

Response format

```json
{    
    "result": 50,
    "status": "successful"
}
```

### metric=increment/ decrement: Provides convenient methods for incrementing or decrementing the value of a selected column

```
/api/post?metric=increment&fields=view_count
```

Response format

```json
{    
    "result": 1,
    "status": "successful"
}
```

## Event Bus

Is being updated ...

## .env configurations

| Key | Default value                          | Description                                            |
|-------------|----------------------------------|--------------------------------------------------------- 
| APIFY_PREFIX_URL         | `api`                  | API URL prefix                                 | 
| APIFY_MODEL_NAMESPACE         | `App\Models`                  | Models namespace                                 | 
| APIFY_UPLOAD_PATH         | `/home/upload`                  | Upload path                                 | 
| APIFY_MQ_ENABLE         | `false`                  | Enable / Disable Message queue (Event Bus)                                | 
| APIFY_MQ_HOST         |                  | Message queue server host                                 | 
| APIFY_MQ_PORT         |                   | Message queue server port                                 | 
| APIFY_MQ_USERNAME         |                   | Message queue authentication - username                                | 
| APIFY_MQ_PASSWORD         |                   | Message queue authentication - password                                 |                                 | 
## License

The Apify is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
## Contact us/ Instant feedback

Email: phult.contact@gmail.com

Skype: [phult.bk](skype:phult.bk?chat)