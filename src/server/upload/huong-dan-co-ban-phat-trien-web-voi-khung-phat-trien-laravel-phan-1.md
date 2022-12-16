# Tạo project
Sau khi cài đặt xong composer và Laravel, ta có thể tạo một project Laravel theo hai cách sau
Tạo project với phiên bản Laravel ta cần
```php
composer create-project laravel/laravel nameOfYourSite "~5.5.7"
```
Tạo project với phiên bản mới nhất
```php
composer create-project laravel/laravel nameOfYourSite
```
### Một số tập tin quan trọng
`Tập tin .env`<br>
Chứa các cài đặt và các key của các dịch vụ sử dụng trong dự án. Ví dụ như: database, các dịch vụ lưu trữ, mailer,...<br>
`Tập tin composer.json`<br>
Chứa các cài đặt và các package của Laravel mà chúng ta cần cài đặt<br>
```php
    "require": {
        "php": "^7.1.3",
        "aws/aws-sdk-php": "^3.108",
        "fideloper/proxy": "^4.0",
        "laravel/framework": "5.7.*",
        "laravel/socialite": "^4.1",
        "laravel/tinker": "^1.0",
        "laravelcollective/html": "^5.7",
        "league/flysystem-aws-s3-v3": "^1.0"
    },
```
`Tập tin package.json`<br>
Chứa các cài đặt liên quan đến javascript và sử dụng npm quản lý, cấu hình các pakage cài đặt thông qua lệnh npm<br>
```php
{
    "private": true,
    "scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "npm run development -- --watch",
        "watch-poll": "npm run watch -- --watch-poll",
        "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
        "prod": "npm run production",
        "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
    },
    "devDependencies": {
        "axios": "^0.18",
        "bootstrap": "^4.0.0",
        "cross-env": "^5.1",
        "jquery": "^3.2",
        "laravel-mix": "^4.0.7",
        "lodash": "^4.17.5",
        "popper.js": "^1.12",
        "resolve-url-loader": "^2.3.1",
        "sass": "^1.15.2",
        "sass-loader": "^7.1.0",
        "vue": "^2.5.17",
        "vue-template-compiler": "^2.6.10"
    },
    "dependencies": {
        "bootstrap-scss": "^4.3.1"
    }
}
```
### Vài lưu ý khi tải project từ github về chạy thử
Chạy cài đặt lại các package bằng lệnh
```php
composer update
```
Tạo application Key
```php
php artisan key:generate
```
# Cài đặt bootstrap, js, ghép theme
**Cách 1. Sử dụng Bootstrap CDN** <br>
Thêm các thiết đặt sau vào tập tin layouts gốc của project, ở đây là home.blade.php
```php
<html>
<head>
    <title>Home Page</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
</head>
<body>

<div class="container">
    <div class="content">
        <div class="title">Home Page</div>
        <div class="quote">Our Home page!</div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

</body>
</html>
```
**Cách 2. Sử dụng Precompiled Bootstrap Files** <br>
Chúng ta vào trang chủ của Bootstrap tải các tập tin của nó về rồi thêm vào thư mục như sau <br>
![](https://images.viblo.asia/77ef9a86-f400-47a8-b96c-6ef7e8e8e72a.png) <br>
Thêm các thiết đặt sau vào tập tin layouts gốc của project, ở đây là home.blade.php
```php
<html>
<head>
    <title>Home Page</title>
        <link rel="stylesheet" href="{!! asset('css/bootstrap.min.css') !!}">
</head>
<body>

<div class="container">
    <div class="content">
        <div class="title">Home Page</div>
        <div class="quote">Our Home page!</div>
    </div>
</div>

<script src="{!! asset('js/jquery-3.3.1.min.js') !!}"></script>
<script src="{!! asset('js/popper.min.js') !!}"></script>
<script src="{!! asset('js/bootstrap.min.js') !!}"></script>

</body>
</html>
```
**Cách 3. Cài đặt qua npm Laravel Mix** <br>
Chúng ta sử dụng nó bằng cách định nghĩa tập tin **package.json** như sau<br>
```php
{
    "private": true,
    "scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "npm run development -- --watch",
        "watch-poll": "npm run watch -- --watch-poll",
        "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
        "prod": "npm run production",
        "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
    },
    "devDependencies": {
        "axios": "^0.18",
        "bootstrap": "^4.0.0",
        "cross-env": "^5.1",
        "jquery": "^3.2",
        "laravel-mix": "^2.0",
        "lodash": "^4.17.5",
        "popper.js": "^1.12",
        "vue": "^2.5.7"
    }
}
```
Mở cmd từ thư mục gốc của project để chạy lệnh sau cài đặt Laravel Mix
```js
npm install
```
Chúng ta viết một Mix task mới trong webpack.mix.js. Mặc định, chúng ta có thể tìm thấy các đã được biên dịch từ app.sass file thành app.css, and bundles all JS file trong thư mục sau:
```php
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
```
Để chạy Mix task, ta sử dụng lệnh sau
```php
npm run dev
```

# Cấu hình database
Để tạo được form đăng nhập, trước tiên ta cần kết nối ứng dụng với database. File cấu hình nằm ở `config/database.php`, mở ra ta có thể thấy Laravel hỗ trợ kết nối 3 kiểu database: `sqlite, mysql, pgsql `và cấu hình mặc định kết nối đến mysql.<br>
Trong bài viết này ta sẽ dùng DB mysql, bạn có thể thay đổi ngay trong file cầu hình `config/database.php`<br>
```php
'connections' => [
    'mysql' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', 'localhost'),
        'port' => env('DB_PORT', '3306'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'charset' => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix' => '',
        'strict' => false,
        'engine' => null,
    ],
],
```
Hoặc nếu để ý ta sẽ thấy, Laravel đã cấu hình sẵn cho ta hàm `env()`để gọi đến các config trong file `.env` (nếu chưa có file này trong ứng dụng bạn copy từ file `.env.example` rồi đổi tên đi). Do vậy để kết nối DB ta chỉ cần thay đổi file .env, chẳng hạn:<br>
```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_test
DB_USERNAME=root
DB_PASSWORD=root
```
# Migrate
### 1.	Tạo tập tin migrate
Tạo migrations thông thường
```
php artisan make:migration create_users_table
```
Tạo mới migrations cho bảng
```
php artisan make:migration create_users_table --create=users
```
Tạo migrations chỉnh sửa bảng
```
php artisan make:migration add_votes_to_users_table --table=users
```
### 2.	Cách viết trong file migrate
**function up(): Có tác dụng thực thi migration.**<br>
Khi muốn tạo mới 1 column thì sẽ viết trong function `up()`.<br>
Như chúng ta thấy trong trường hợp update 1 column thì chúng ta sư dụng hàm `change()`, muốn sử dụng hàm `change()` ta phải cài thêm package tên là `doctrine/dbal`.<br>
**function down(): Có tác dụng thực thi đoạn lệnh rollback (trở về trước đó).**<br>
Trong hàm này sẽ thực thi các câu lệnh đảo ngược với function `up()`.<br>
Đối với tạo mới bảng, thì mặc định function `down()` của nó sẽ là xóa bảng đó đi bằng lệnh:<br>
`Schema::dropIfExists('table_name').`<br>
Đối với chỉnh sửa bảng thì trong function down() phải viết các hàm ngược lại với function up().<br>
**function Facade Schema: Là hàm Facade hỗ trợ để thực hiện các chức năng như create, update, delete bảng.**<br>
**- Tạo mới bảng:**<br>
`Schema::create('categories', function (Blueprint $table) {}`<br>
**- Chỉnh sửa bảng:**<br>
` Schema::table('categories', function (Blueprint $table) {}`<br>
**- Đổi tên bảng: từ category thành categories**<br>
`Schema::rename('category', 'categories');`<br>
**- Xóa bảng:**<br>
`Schema::dropIfExists('categories'); `<br>
**Các câu lệnh tạo cấu trúc bảng hay dùng trong Migrations**<br>
Modifier Column<br>
Tạo các rằng buộc cho các bảng<br>
https://viblo.asia/p/migration-trong-laravel-va-nhung-dieu-can-biet-ByEZkyEy5Q0<br>
```php
Schema::table('posts', function ($table) {
    $table->integer('user_id')->unsigned();
    $table->foreign('user_id')->references('id')->on('users');
});
```
Chú ý nếu không migrate mà không chạy được thì các bạn có thể tách ra làm 2 file migration để chạy. <br>
Để drop một foreign ta dùng: <br>
`$table->dropForeign('posts_user_id_foreign'); `<br>
Chúng ta nên để ý quy tắc đặt tên foreign `<tên_table>_<tên_khóa_ngoại>_foreign`
### 3.	Một số câu lệnh migration:
**Chạy các migration**<br>
`php artisan migrate`<br>
**Resest lại migration**<br>
Lệnh trên sẽ rollback toàn bộ CSDL của bạn hay đúng hơn là chạy toàn bộ function down() trong các file migration của bạn:
`php artisan migrate:resest`<br>
**Chạy lại migration**<br>
Lệnh này nhằm rollback toàn bộ CSDL đồng thời chạy lại luôn toàn bộ các file migrate của bạn<br>
`php artisan migrate:refesh`<br>
Lệnh này nhằm rollback toàn bộ CSDL đồng thời chạy lại luôn toàn bộ các file migrate đồng thời chạy tấy cả các seeder<br>
`php artisan migrate:refresh --seed `<br>
**Rollback migrate**<br>
`php artisan migrate:rollback`<br>
Với lệnh này, toàn bộ file có batch mới nhất trong bảng migration sẽ chạy tất cả các function down() hay chính xác hơn là đảo ngược lại thay đổi mà nó tạo ra cho CSDL.<br>
Nếu bạn không định nghĩa nội dung cho function down thì lệnh rollback coi như không có hiệu lực đồng nghĩa với việc migration đó vẫn tồn tại trong cơ sở dữ liệu.
# Seeder 
### Cách 1. Tạo trực tiếp data
Bước 1: Tạo 1 seeder mới cho bảng users có tên là `UsersTableSeeder.php`<br>
`php artisan make:seeder UsersTableSeeder`<br>
Bước 2: UsersTableSeeder.php trong thư mục `database/seeds/`
```php
public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        $users = [
            ['VuThiXuan', '12345678', 'vuxuan@gmail.com','3'],
        ];
        foreach ($users as $user) {
            Database\User::create([
                'username' => $user[0],
                'password' => $user[1],
                'email' => $user[2],
                'role_id' => $user[3]
            ]);
        }
        Schema::enableForeignKeyConstraints();
    }
```
Bước 3: Bây giờ chúng ta chỉ cần gọi `UsersTableSeeder.php` class vào function run() trong file seeder gốc.<br>
Bước 4: Chúng ta sẽ có 2 cách chạy.<br>
Cách 1: Chỉ định trực tiếp class seeder cần chạy bằng lệnh<br>
 `php artisan db:seed --class=UsersTableSeeder`<br>
Cách 2: Chạy tất cả các seeder được gọi vào file seeder gốc: <br>
`php artisan db:seed`<br>
### Cách 2.Tạo Model Factory
Chúng ta sẽ tiếp tục ví dụ với bảng users bằng việc tạo Model Factory cho nó và cùng cảm nhận nhé.<br>
Bước 1: Tạo Model Factory cho bảng users với tên `UserFactory.php`
```
php artisan make:factory UserFactory
php artisan make:model Models\Profile
```
Bước 2: Sau khi hoàn thành bước 1, chúng ta sẽ được 1 file `UserFactory.php` trong thư mục `database/factories/` . <br>
Tiếp đó chúng ta sẽ tạo dữ liệu, trong Model Factory đã tích hợp sẵn thư viện tạo dữ liệu giả Faker.
```php
<?php
use Faker\Generator as Faker;
$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'login_id' => $faker->unique()->ean8,
        'username' => $faker->username,
        'password' => Hash::make(12345678),         
        'email' => $faker->unique()->safeEmail,
        'role_id' => App\Models\Role::all()->random()->id,
    ];
});
```
Bước 3: Bây giờ trong function `run()` của `UsersTableSeeder` class chúng ta sử dụng hàm helper `factory()` với 2 đố số truyền vào:
* Class models cần tạo dữ liệu.
* Số bản ghi cần tạo.
```php
<?php
use Illuminate\Database\Seeder;
use App\Models\User; 
class JobTableSeeder extends Seeder
{
    public function run()
    {
        factory(User::class, 100)->create();
    }
}
```
# Repository Pattern
Trong các dự án Laravel, chúng ta thường áp dụng mẫu thiết kế Repository Pattern để triển khai dự án
### Repository Pattern là gì? 
![](https://images.viblo.asia/3d79151e-62fe-49d5-bf6a-091e049be059.png) <br>
* Repository Pattern là lớp trung gian giữa tầng Business Logic và Data Access, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.
* Repository đóng vai trò là một lớp kết nối giữa tầng Business và Model của ứng dụng.
### Một số lý do chung ta nên sử dụng Repository Pattern:
* Một nơi duy nhất để thay đổi quyền truy cập dữ liệu cũng như xử lý dữ liệu.
* Một nơi duy nhất chịu trách nhiệm cho việc mapping các bảng vào object.
* Tăng tính bảo mật và rõ ràng cho code.
* Rất dễ dàng để thay thế một Repository với một implementation giả cho việc testing, vì vậy bạn không cần chuẩn bị một cơ sở dữ liệu có sẵn.
### Sử dụng Repository Pattern trong Laravel?
Tạo một class định nghĩa một Inteface class chung cho các class repository, ở đây mình tạo `EloquentRepository` trong `app/Repositories/`<br>
https://github.com/tuananh97/quickstart/blob/master/app/Repositories/EloquentRepository.php<br>
Với mỗi Model, tạo một class repository để định nghĩa các method. Ví dụ như
```php
<?php
namespace App\Repositories;
use App\Repositories\EloquentRepository;
use App\Models\User;
use App\Models\Task;

class TaskRepository extends EloquentRepository
{
    public function getModel()
    {
        return Task::class;
    }

    public function forUser(User $user)
    {
        return $user->tasks()->orderBy('name', 'asc')->paginate(3);
    }
}
```
Trong controller tương ứng thêm hàm `__contruction` để khới tạo repository sử dụng trong các function như sau
```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Models\Task;

use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    protected $taskRepository;
    public function __construct(TaskRepository $tasks)
    {
        $this->middleware('auth');
        $this->taskRepository = $tasks;
    }
    
    public function index(Request $request)
    {
        return view('tasks.index', [
            'tasks' => $this->taskRepository->forUser($request->user()),
        ]);
    }
}
```
# Tham Khảo
https://viblo.asia/p/seeder-va-model-factory-trong-laravel-vyDZOx6Plwj
https://learninglaravel.net/books/laravel/building-our-first-website
https://viblo.asia/p/tim-hieu-ve-repository-pattern-trong-laravel-part-ii-oZVRgl2EMmg5