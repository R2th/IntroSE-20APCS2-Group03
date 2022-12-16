# Giới thiệu
Chào mọi người, đến hẹn lại lên (hehe). 

Thì như mọi người cũng đã biết, tìm kiếm là một chức năng quan trọng và không thể thiếu trong các ứng dụng Website. Đặc biệt trong các ứng dụng lớn, các chức năng như tìm kiếm thông minh từ những từ khóa đã nhập vào, gợi ý từ khóa tìm kiếm, ... là những chức năng không thể thiếu. 

Chính vì vậy, trong bài viết này mình sẽ giới thiệu cho các bạn về `Typeahead.js`. Đây là một thư viện `JavaScript` linh hoạt, nó hỗ trợ mạnh mẽ cho việc xây dựng một hệ thống tìm kiếm thông minh tương tự như tìm kiếm trên Google, Facebook hay Twitter. 
# Sơ lược về Typeahead.js
`Typeahead` gồm 2 thành phần chính là:

* `Typeahead`: Là phần hiển thị giao diện người dùng
    * Hiển thị gợi ý cho người dùng sau khi nhập từ khóa.
    * Hiển thị các gợi ý từ khóa trên ô nhập dữ liệu.
    * In đậm các từ, các chữ trùng với từ khóa đã nhập.
    * Hỗ trợ các tùy chỉnh về giao diện, sự kiện linh hoạt.
    * ......
* `Bloodhound Engine`: Là một Bộ máy gợi ý 
    * Lấy các dữ liệu từ trước, giảm độ delay khi hiển thị gợi ý.
    * Sử dụng Local Storage giảm số lượng các request đến máy chủ.
    * Cho phép các dữ liệu được hardcode.
    * Sử dụng rate limit và bộ đệm cho các request đến máy chủ, giảm nhẹ việc tải dữ liệu.
    * .....
# Cài đặt
### Npm
Chạy lệnh sau để cài đặt: 
```bash
npm install typeahead.js
```
### CDN
Đây là link cdn cho các bạn muốn nhúng thẳng `Typeahead` vào ứng dụng của mình
https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js

**Chú ý**: `Typeahead` yêu cầu phiên bản jquery từ 1.9 trở lên.
# Tạo Typeahead
Để khởi tạo `Typeahead` với bất kể trường text input nào, ta sử dụng đoạn code sau:
```javascript
$(".search-input").typeahead(options, [*datasets])
```
Trong đó: 

* `options`: Các tùy chọn cấu hình khi khởi tạo `Typeahead` như:
    
    * `highlight` : in đậm các chữ, các từ trong gợi ý trùng với các từ khóa đã nhập, mặc định tùy chọn này là `false`.
    * `hint`: hiển thị từ gợi ý trong ô nhập dữ liệu, mặc định tùy chọn này là `true`.
    * `minLength`: số kí tự tối thiểu cần phải nhập để chức năng gợi ý bắt đầu hoạt động, mặc định của tùy chọn này là 1.
    * ..... (Bạn có thể xem thêm các tùy chọn khác [ở đây](https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#options))
```javascript
$(".search-input").typeahead({
    hint: true,
    highlight: true,
    minLength: 1
});
```
* `datasets`: Một `Typeahead` có thể có nhiều `datasets`, mỗi `datasets` sẽ trả về một tập gợi ý theo từ khóa đã nhập. Một số tùy chọn cấu hình của `datasets`:
    
    * `name`: tên của datasets
    * `source`: Nguồn dữ liệu dùng cho gợi ý, có thể là một thể hiện của `Bloodhound` (Bộ máy thực hiện các gợi ý).
    * `limit`: số kí tự tối đa hiển thị của gợi ý, mặc định là 5.
    * ..... (Bạn có thể xem thêm các tùy chọn khác [ở đây](https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#options))
# Tạo Bloodhound Engine
Đối với `source` trong `datasets`, chúng ta cần lấy dữ liệu từ server. Để làm việc này chúng ta cần `BloodHound`. Nó là bộ máy gợi ý của `Typeahead.js`, nó đưa ra nhiều tính năng nâng cao để lấy dữ liệu từ xa, đồng thời sử dụng bộ đệm để tăng tốc.
```javascript
var engine = new Bloodhound({
    remote: {
        url: '/search/name?value=%QUERY%',
        wildcard: '%QUERY%'
    },
    datumTokenizer: Bloodhound.tokenizers.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace
});
```
Bạn cần chú ý rằng đường dẫn `/search/name` sẽ được thiết lập trong `route`, và `value` sẽ là tham số truyền đến controller của ứng dụng Laravel (ở phần dưới). Như vậy chúng ta đã có dữ liệu và có thể dùng để thiết lập cho `source` trong `datasets` của `Typeahead`.
```javascript
source: engine.ttAdapter()
```
# Tạo Templates cho các gợi ý
`Typeahead` cho phép bạn sử dụng các templates để thay đổi style cho các gợi ý, bạn cũng có thể sử dụng `Bootstrap` ở đây.
```javascript
templates: {
    empty: [
        '<div class="header-title">Name</div><div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
    ],
    header: [
        '<div class="header-title">Name</div><div class="list-group search-results-dropdown"></div>'
    ],
    suggestion: function (data) {
        return '<a href="/students/' + data.id + '" class="list-group-item">' + data.name + '</a>';
    }
}
```
# Tạo ứng dụng Laravel 
### Migration & Seeder
Ở đây chúng ta sẽ tạo một table ***students*** với các thuộc tính ***name***, ***email*** và ***studentcode***. Tạo một Migration như sau:
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('student_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
```
Chúng ta sẽ seeding 20,000 dữ liệu mẫu để testing cho ứng dụng. Sử dụng `Faker` để seeding, bạn hãy copy đoạn code sau và dán vào file `databases/factories/UserFactory.php`:
```php
$factory->define(App\Student::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'student_code' => $faker->randomNumber()
    ];
});
```
Tạo một seeder với tên là `StudentsTableSeeder` bằng lệnh:
```bash
php artisan make:seeder StudentsTableSeeder
```
Và thêm đoạn code sau vào file `databases/seeds/StudentsTableSeeder.php` vừa tạo.
```php
public function run()
{
    factory(App\Student::class, 20000)->create();
}
```
Đăng ký seeder vừa tạo vào trong file `databases/seeds/DatabaseSeeder.php`
```php
public function run()
{
    $this->call(StudentsTableSeeder::class);
}
```
Cuối cùng chạy migration và seeder đã tạo bằng lệnh:
```bash
php artisan migrate --seed
```
### Route
Chúng ta sẽ tạo 1 route để hiển thị trang tìm kiếm, 1 route để hiển thị thông tin ***student*** và 2 route để thực hiện việc tìm kiếm ***student*** theo ***name*** , theo ***email*** và trả dữ liệu dạng JSON về cho `Bloodhound` . Bạn hãy copy đoạn code sau và dán vào file `routes/web.php`:
```php
Route::get('/students', 'StudentController@index');

Route::get('/students/{id}', 'StudentController@show');

Route::get('/search/name', 'StudentController@searchByName');

Route::get('/search/email', 'StudentController@searchByEmail');
```
### Controller
Tạo một controller với tên là `StudentController` bằng lệnh:
```bash
php artisan make:controller StudentController
```
Thêm các phương thức `index()`, `show()`, `searchByName()` và `searchByEmail()` vào `StudentController` vừa tạo.
```php
public function index()
{
    return view('index');
}

public function show($id)
{
    $student = Student::findOrFail($id);

    $data = 'Name: ' . $student->name 
        . '<br/>Email: ' . $student->email 
        . '<br/>Student Code: ' . $student->student_code ;

    return $data;
}

public function searchByName(Request $request)
{
    $students = Student::where('name', 'like', '%' . $request->value . '%')->get();

    return response()->json($students); 
}

public function searchByEmail(Request $request)
{
    $students = Student::where('email', 'like', '%' . $request->value . '%')->get();

    return response()->json($students); 
}
```
### View
Chúng ta sẽ tạo một View index đơn giản với 1 ô input tìm kiếm. Ta cần include thư viện `Typeahead` vào phần header của View. Ở đây mình sẽ viết code Css và Javascript trong view cho thuận tiện, tuy nhiên các bạn nên tách ra file riêng để dễ dàng cho việc quản lý.
```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Smart search in Laravel with Typeahead.js</title>

        {{ Html::style(asset('css/app.css')) }}
        {{ Html::script(asset('js/app.js')) }}
        {{ Html::script(asset('js/typeahead.bundle.min.js')) }}
        
        <!-- Styles -->
        <style>
            h3 {
                text-align: center;
                margin: 20px auto;
            }
          
            .content {
                text-align: center;
            }

            a {
                color: #333;
            }

            .header-title {
                padding: 5px 10px;
                background: #dadada;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <h3>Smart search in Laravel with Typeahead.js</h3>
        <div class="flex-center position-ref full-height">
            <div class="content">
                <form class="typeahead" role="search">
                    <input type="search" name="q" class="form-control search-input" placeholder="Type something..." autocomplete="off">
                </form>
            </div>
        </div>

        <script type="text/javascript">
            /* TYPEAHEAD CODE */
        </script>
    </body>
</html>
```
Thêm đoạn code khởi tạo `Bloodhound` và `Typeahead` như chúng ta đã tìm hiểu ở phần trên vào chỗ mình đã comment ở view index trên. Ta sẽ khởi tạo 2 `datasets` với 2 `Bloodhound` gợi ý tìm kiếm ***student*** theo ***name*** và ***email***.
```javascript
$(document).ready(function($) {
    var engine1 = new Bloodhound({
        remote: {
            url: '/search/name?value=%QUERY%',
            wildcard: '%QUERY%'
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    var engine2 = new Bloodhound({
        remote: {
            url: '/search/email?value=%QUERY%',
            wildcard: '%QUERY%'
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    $(".search-input").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, [
        {
            source: engine1.ttAdapter(),
            name: 'students-name',
            display: function(data) {
                return data.name;
            },
            templates: {
                empty: [
                    '<div class="header-title">Name</div><div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
                ],
                header: [
                    '<div class="header-title">Name</div><div class="list-group search-results-dropdown"></div>'
                ],
                suggestion: function (data) {
                    return '<a href="/students/' + data.id + '" class="list-group-item">' + data.name + '</a>';
                }
            }
        }, 
        {
            source: engine2.ttAdapter(),
            name: 'students-email',
            display: function(data) {
                return data.email;
            },
            templates: {
                empty: [
                    '<div class="header-title">Email</div><div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
                ],
                header: [
                    '<div class="header-title">Email</div><div class="list-group search-results-dropdown"></div>'
                ],
                suggestion: function (data) {
                    return '<a href="/students/' + data.id + '" class="list-group-item">' + data.email + '</a>';
                }
            }
        }
    ]);
});
```
# Demo
![](https://images.viblo.asia/6fbf3597-2cc2-4e56-9bfc-550f63ec5873.gif)

Tuy với 20,000 dữ liệu nhưng tốc độ tìm kiếm của `Typeahead` khá nhanh.
# Kết luận
Qua bài viết này mình đã giới thiệu cho các bạn về `Typeahead.js`. Một thư viện hỗ trợ linh hoạt cho việc xây dựng một hệ thống tìm kiếm thông minh.

Hy vọng với bài viết này, các bạn đã biết thêm được một thư viện `Javascript` bổ ích.
# Tham khảo
https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#options

https://scotch.io/tutorials/implementing-smart-search-with-laravel-and-typeahead-js