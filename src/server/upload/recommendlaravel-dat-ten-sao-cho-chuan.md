# Mở đầu
Hếy yoo, xin chào các bạn , trước kia hồi mới là sinh viên chưa bỏ được code cẩu thả đã nhảy vào code laravel ngay. Kết quả là mình đặt tên lớp, tên hàm, tên biến .... rất lung tung và không theo một quy tắc nhất định nào cả. Rồi đến lúc đọc lại code thì thôi rồi. nước mắt cứ phải gọi là tuôn rơi :sweat_smile::sweat_smile::sweat_smile:  nghĩ lại vẫn thấy ngu rồi có khi định viết lại cả chức năng auth của nó ấy chứ. 

Vì vậy mình lên mạng tham khảo góp nhặt  1 số best practices về quy tắc đặt tên chung của laravel. Để các bạn cùng tìm hiểu. Ai biết rồi thì có thể lướt xuống và upvote ạ ai chưa biết có thể đọc để apply vào những dự án tiếp theo. Hoặc là dự án đang làm luôn (nhưng nếu cty có cách đặt tên riêng rồi thì lên theo qui tắc của cty nhé, không lại bị đuổi việc như chơi đấy) . :joy::joy::joy::joy: 
# Conventions là gì
Thì **conventions** là tập hợp những nguyên tắc chung khi lập trình nhằm làm cho code dễ đọc, dễ hiểu, do đó dễ quản lý, bảo trì hơn.
Cái này thì mỗi cty sẽ có quy định khác nhau nhưng đa phần sẽ theo các chuẩn PSR . 

PSR là viết tắt của PHP Standards Recommendations , là những tiêu chuẩn khi code PHP, nó được cộng đồng PHP xây dựng và áp dụng theo.

**Chuẩn PSR-0 nói về autoloading**

**Chuẩn PSR-1 về basic coding**

**Chuẩn PSR-2 về style coding**

**Chuẩn PSR-3 nói về logging**

**Chuẩn PSR-4 nói về autoloading : đây là phần cải tiến của PSR-0**

**Chuẩn PSR-7 nói về HTTP message**

Các bạn có thể tìm hiểu thêm về các chuẩn này. trên mạng có rất nhiều bài viết về chuẩn này.

Ở khuôn khổ bài này thì sẽ có liên quan một chút ít về **chuẩn PSR-2 về style coding**

Mà mình nói gì mà miên man vậy đang xem qua về một số **best practices** về quy tắc đặt tên của laravel mà. Let go nhé.

# Naming Conventions
> Sau đây là các quy ước đặt tên được chấp nhận và đang được sử dụng bởi cộng đồng người dùng Larave nhé! Không phải mình tự nghĩ ra đâu!
## Controllers

Laravel dựa trên mô hình MVC mà. nên controller chúng ta sẽ thấy khá nhiều trong một project laravel vậy sao để đặt tên cho controller 1 cách xinh đẹp nhất. 

Ở đây thì người ta khuyến nghị: 

* Tên controller phải bắt đầu bằng một danh từ 
* Danh từ đó ở dạng số ít
* Theo sau đó là hậu tố "Controller"
* Tên Lớp trùng với tên file luôn nhé

Ví dụ: 

**Good**

```ArticleController.php
class ArticleController extends Controller
    //
{
```

**Bad**

```php
class ArticlesController extends Controller    
{

```
```php
class wp_articlesController extends Controller

{
```
```php
class Article extends Controller

{
```


**Bạn nên dùng Resource Controllers trừ khi có lý do cụ thể nào đó mà không thể làm như vậy**

Ví dụ: 

**Good**

```php
class DomainController extends Controller
{
    public function index(){} // list domains
    public function create(){} // show create form
    public function store(Request $request){ } // handle the form POST 
    public function show($id){} // show a single domain
    public function edit($id){} // show edit page
    public function update(Request $request, $id){} // handle show edit page POST
    public function destroy($id){} // delete a domain
}
```

**Bad**
```php
class DomainController extends Controller
{
    public function list(){} // list domains
    public function create_or_save(){} // show create form then handle save
    public function show_edit($id){} // show a single domain then show edit page
    public function delete($id){} // delete a domain
}
```

## Models
Đối với model thì cộng đồng khuyến nghị như sau: 

* Chứ cái đầu tiên của class là chữ hoa
* Phải là danh từ dạng số ít


**Good**
```php
class Flight extends Model
{
     //
}
```

**Bad**
```php
class Flights extends Model
{
```
```php
class flight extends Model
{
```

> Phương thức định nghĩa mối quan hệ (relationship methods) **hasOne** hoặc **belongsTo**  phải là danh từ số ít


**Good**
```php
class User extends Model
{
    public function phone()
    {
        return $this->hasOne('App\Phone');
    }
}
```

**Bad**
```php
class User extends Model
{
    public function phones()
    {
        return $this->hasOne('App\Phone');
    }
}
```

> Các phương  thức quan hệ  khác (relationship methods) phải là dạng danh từ số nhiều

**Good**
```php
class Post extends Model
{
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
```

**Bad**
```php
class User extends Model
{
    public function comment()
    {
        return $this->hasMany('App\Comment');
    }
}
```

> Thuộc tính của model phải ở dạng snake_case

**Good**
```php
$user->created_at
```

**Bad**
```php
$user->createdAt
```

> Phương thức của model phải ở dạng camelCase

**Good**
```php
class User extends Model
{
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }
```

**Bad**
```php
class User extends Model
{
    public function scope_popular($query)
    {
        return $query->where('votes', '>', 100);
    }
```
## Functions

> Trong ưng dụng của chúng ta thì không thể thiểu các function do chúng ta tự viết ra nhằm trợ giúp một chức năng nào đó . Bạn nên tạo 1 file có tên helper.php 
> 
**Good**
```php
project_folder/app/helper.php
project_folder/app/Http/helper.php
```

**Bad**
```php
project_folder/functions.php
```

> Bạn nên sử dụng autoloading của Composer để load các function của bạn
> 

**Good**
```php
// file composer.json
...
"autoload": {
    "files": [
        "app/helpers.php"
    ],
...
```

**Bad**
```php
// file app/Http/Controllers/HomeController.php

class HomeController.php
{
    function index(){
        require_once(app_path("helpers.php"));
    }
}
```

> Trước khi viết nõ hãy kiểm tra xem đã có đã tồn tại hay chưa băng cách
> 
**Good**
```php
if (! function_exists('my_custom_helper')) {
    function my_custom_helper($key, $default = null) {
        // ...
    }
}
```

**Bad**
```php
function my_custom_helper($key, $default = null) {
    // ...
}
```

> Khuyến nghị khác: 
> 
> Nếu function dài quá 25 dòng thì bạn nên tách nhỏ function đó thành những funtion nhỏ hơn.
> 
> Mỗi function bạn nên viết Unit Test cho chúng để đảm bảo chúng chạy đúng
## Routes
> Router phải ở dạng số nhiều và các chữ cái đều là chữ thường . chỗ này mình cũng không biết giải thích như nào nhưng các bạn nhìn vào ví dụ nhé:

**Good**
```php
Route::get('/users', 'UserController@index');
```
```php
Route::resource('photos', 'PhotoController');
```

**Bad**
```php
Route::get('/user', 'UserController@index');
```
```php
Route::get('/UsersList', 'UserController@index');
```
```php
Route::resource('PHOTO', 'PhotoController');
```

> Tên của router phải ở dạng snake_case

**Good**
```php
Route::get('/user', 'UserController@active')->name('users.show_active');
```
**Bad**
```php
Route::get('/user', 'UserController@active')->name('users.show-active');
```
```php
Route::get('/user', 'UserController@active')->name('show-active-users');
```
## Variables

Cái này hay gặp phải nhất này. Xem cộng đồng khuyến nghị gì về quy tắc đặt tên biến nhé !

> Quy tắc chung của biến là ở dạng **camelCase**

**Good**
```php
$articlesWithAuthor
```
**Bad**
```php
$articles_with_author
```

> Tên của collection nên theo quy tắc Mô tả collection + danh từ sô nhiều

**Good**
```php
$activeUsers = User::active()->get()
```
**Bad**
```php
$users = User::active()->get()
$user = User::active()->get()
$User = User::active()->get()
```

> Tên 1 object nên theo quy tắc Mô tả collection + danh từ sô ít

**Good**
```php
$activeUser = User::active()->first()
```
**Bad**
```php
$users = User::active()->first()
```
## Views

> Mọi người rất hay lúng túng khi đặt tên cho view. thì tên view chúng ta nên đặt ở dạng snake_case
> 
**Good**
```php
show_filtered.blade.php
```
**Bad**
```php
showFiltered.blade.php
```

> Gần đây cũng có khuyến nghị nên đặt tên view dạng kebab-case. bạn cũng có thể tham khảo cách này nhé! . Mình nghĩ cách này tốt hơn cách ở trên !
> 

**Good**
```php
show-filtered.blade.php
```

> Bạn không nên sử lý logic code trong file view nhé mà hãy viết trong controller. trừ trường hợp bất khả kháng. ví dụ:
> 
**Good**
```php
// $api_results is passed by controller
<ul>  
    @foreach($api_results as $result)
        <li>{{ $result->name }}</li>
    @endforeach
</ul>

```
**Bad**
```php
@php
   $api_results = json_decode(file_get_contents("https://api.example.com"));
@endphp
<ul>
    @foreach($api_results as $result)
        <li>{{ $result->name }}</li>
    @endforeach
</ul>

```
# Nếu đọc đến đây mà thấy mỏi mắt vì `Good` vs `Bad` quá thì clips lại mai đọc tiếp nhé !
# Database Conventions
## Table and Fields Naming
> Tên Table phải là danh từ ở dạng số nhiều và phải dạng viết thường
> 
**Good**
```php
class CreateFlightsTable extends Migration
{
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {

```
**Bad**
```php
class CreateFlightsTable extends Migration
{
    public function up()
    {
        Schema::create('flight', function (Blueprint $table) {

```

```php
class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('MyUsers', function (Blueprint $table) {

```

> Tên bảng pivot phải dạng số ít của 2 model và được săp sếp theo alphabetical
> 

**Good**
```php
post_user
article_user
photo_post

```
**Bad**
```php
posts_users
user_articles
post_photos
```

> Tên cột phải ở dạng snake_case và không lên có tên ở model
> 

**Good**
```php
username
title
thumb_url

```
**Bad**
```php
UserName
_title
ThumbUrl
post_title
```

> Khóa ngoại phải ở dạng tên model + hậu tố _id
> 
**Good**
```php
user_id

```
**Bad**
```php
userid
siteid
Memberid
TransactionID
```

> Khóa chính phải là id. cái này hơi kỳ kỳ :joy::joy::joy:. dù gì đây cũng là khuyến nghị lên dùng
> 
**Good**
```php
id

```
**Bad**
```php
ID
pkid
guid
```

## Database Alterations
> Tên file Migration phải theo pattern :  yyyy_mm_dd_<timestamp>_create_<table name>_table
> 
**Good**
```php
2019_06_06_164210_create_domains_table.php

```
**Bad**
```php
2019_06_06_164210_domains.php
```
    
# Tổng kết
    
   Bài viết cũng khá dài rồi. mặc dù còn rất nhiều recommend khác nhưng trên đây là nhưng cái các bạn hay dùng và hay gaejp nhất trong project của mình. hy vọng các bạn có thể tham khảo qua. và hãy comment xuống dưới recommend của bạn nhé 
    
  Thân ái và quyết thắng  :heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes:
    
  Tham khảo:  https://www.laravelbestpractices.com/