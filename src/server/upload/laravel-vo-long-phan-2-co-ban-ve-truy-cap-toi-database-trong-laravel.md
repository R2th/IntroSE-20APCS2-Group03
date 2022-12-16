Đây là chuỗi bài viết theo phong thái dễ hiểu, đơn giản, cơ bản, phù hợp với những người bắt đầu với Laravel từ con số 0. 
# Laravel Database Access
   Phần này sẽ bao gồm các nội dung sau:
* Init database và kết nối tới project laravel.
* Eloquent Model
* Migrations
* Các option đi kèm khi sinh model
* Tinker
## Init database và kết nối tới project laravel
Sau khi lựa chọn được hệ quản trị cơ sở dữ liệu và có một cơ sở dữ liệu (CSDL) đã được thiết lập, hãy tiến tới việc kết nối database đó vào project.

Code ở file dưới đây cho biết project đang kết nối tới hệ quản trị CSDL nào.
```php:config/database.php
'default' => env('DB_CONNECTION', 'mysql'),
```
Đồng thời trong file này cũng định nghĩa các xử lý cho việc kết nối tới hệ quản trị CSDL tương ứng. Như là, mySQL, postgreSQL, sqlite, Microsoft SQL Server,...
```php:config/database.php
'connections' => [
    'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            ...
            ],
            ...
    ],
    ...
```
Phần code trên sẽ xử lý việc kết nối cho chúng ta. Vì thế, cần truyền vào những thông tin về database mình đã thiết lập. Ở đây, ta thấy laravel sử dụng method `env('DB_DATABASE', 'forge')`. Đây là method sẽ lấy nội dung tương ứng của những key được truyền vào, key này được định nghĩa tại file chứa giá trị thiết lập cho project là `.env`. Dưới đây là các giá trị chúng ta cần truyền vào.
```php:.env
# Hệ quản trị cơ sở dữ liệu sẽ kết nối.
DB_CONNECTION=mysql
# Địa chỉ kết nối
DB_HOST=127.0.0.1
# Cổng kết nối
DB_PORT=3306
# Tên database bạn đã tạo
DB_DATABASE=laravel
# Tên tài khoản của cơ sở dữ liệu trên
DB_USERNAME=root
# Mật khẩu tương ứng
DB_PASSWORD=
```
Sau đó hãy sửa code trong detail controller để check xem cơ sở dữ liệu đã được kết nối thành công chưa nhé.

**Lưu ý: Bảng `details` đã được tạo sẵn ở trong database với 2 trường là `slug` và `body`.**
```php:app/Http/Controllers/InfosController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class InfosController extends Controller
{
    public function show($slug)
    {
        # Lấy dữ liệu từ database.
        $detail = DB::table('details')->where('slug',$slug)->first(); 
        
        # Dòng code này sẽ dừng việc thực hiện xử lý và hiển thị giá trị của biến $detail trên màn hình trình duyệt. Rất thích hợp để kiểm tra. Sau khi kiểm tra dữ liệu, Xóa dòng này đi để chạy tiếp xử lý nhé.
        dd($detail);
        
        # Đã giới thiệu ở phần trước. Việc check biến có khác NULL hay không rất quan trọng.
        if (! $detail) {
            abort(404, 'Sorry, that detail was not found.');
        }

        return view('info', [
            'detail' => $detail
        ]);
    }
}
```
Ở view các bạn sửa lại như sau.
```php:resources/views/info.blade.php
    ...
    {{ $detail->body }}
    ...
```
Đảm bảo file routes vẫn đang điều hướng chính xác.
```php:routes/web.php
    ...
    Route::get('info/{slug}', 'InfosController@show');
    ...
```
Những method sử dụng trong dòng code `$detail = DB::table('details')->where('slug',$slug)->first();` sẽ được giới thiệu ở phần sau. Ngoài ra, hãy tìm hiểu về `namespace` tại [đây](https://viblo.asia/p/series-php-lap-trinh-huong-doi-tuong-phan-2-WAyK8RXklxX#_the-nao-la-namespaces-2) nhé! `namespace` có thể hiểu đơn giản như là thư mục trên các hệ điều hành, để phân cấp và phân biệt các thực thể có tên giống nhau.
## Eloquent Model
Eloquent là thư viện được tích hợp trên laravel với mục đích chính là đơn giản hóa các thoa tác của lập trình viên tới cơ sở dữ liệu, hay thao tác tới cơ sở dữ liệu thông qua thư viện này với những cú pháp đơn giản hơn.
> "The Eloquent ORM included with Laravel provides a beautiful, simple ActiveRecord implementation for working with your database. " - Giới thiệu của laravel về Eloquent.

Nhìn chung, một số framework sẽ có những thư viện kiểu này và đặt tên cho nó. 😶 Ví dụ, Rails sẽ có ActiveRecord tương tự. Mục đích chính là để lập trình viên không phải thao tác trực tiếp với database và khiến các project MVC sẽ có tính hệ thống hơn (khi mà Model sẽ là đối tượng đại diện của bảng trong database để chúng ta thao tác trong project). Cho nên, thư viện này luôn được khuyên dùng khi lập trình.

Hãy thử tạo một model bằng `php artisan` như sau nhé.
**Lưu ý: Bảng `details` đã được tạo sẵn ở trong database với 2 trường là `slug` và `body`. Và câu lệnh này sẽ không sinh ra bảng trong database.**
```
php artisan make:model Detail
```
Sau đó hãy sửa code trong detail controller.
```php:app/Http/Controllers/InfosController.php
    ...
    # Nếu đã đọc về namespace thì các bạn phải hiểu về dòng lệnh này nha😳!
    use App\Detail;
    ...
    public function show($slug)
    {
        $detail = Detail::where('slug', $slug)->first();
        ...
    }
    ...
```
Với dòng code trên, chúng ta đang thao tác với database thông qua model Detail với những method trong thư viện Eloquent. Và các bạn thấy một dòng lệnh này sẽ đơn giản, dễ hiểu, dễ đọc, tránh bị lỗi cú pháp như câu lệnh SQL query thuần túy 
```sql:
select * from `details` where `slug` = ? limit 1
```
Hãy cùng refractoring lại code cho chuyên nghiệp hơn nào. Thay vì phải thêm đoạn xử lý `if~else` để check NULL.
```php:app/Http/Controllers/InfosController.php
        ...
        if (! $detail) {
            abort(404, 'Sorry, that detail was not found.');
        }
        ...
```
Thì file detail controller có thể được thu gọn như sau:
```php:app/Http/Controllers/InfosController.php
<?php

namespace App\Http\Controllers;

use App\Detail;

class InfosController extends Controller
{
    public function show($slug)
    {
        $detail = Detail::where('slug', $slug)->firstOrFail();

        return view('info', [
            'detail' => $detail
        ]);
    }
}
```
Method `firstOrFail()` sẽ xử lý trường hợp NULL cho chúng ta và hiển thị màn hình 404 nếu thấy NULL. Code đã trở nên ngắn gọn và có bố cục hơn.

Ngắn hơn nữa 😂
```php:app/Http/Controllers/InfosController.php
<?php

namespace App\Http\Controllers;

use App\Detail;

class InfosController extends Controller
{
    public function show($slug)
    {
        return view('info', [
            'detail' => Detail::where('slug', $slug)->firstOrFail()
        ]);
    }
}
```
Tuy nhiên, việc rút gọn code đôi khi sẽ gây tối nghĩa nên hãy cân nhắc nhé!😛
## Migrations
Như những phần trên, thì đều có lưu ý về việc **bảng `details` đã được tạo sẵn ở trong database**. Cơ mà việc tạo sẵn này cũng không đúng lắm khi mà chúng ta đã lại phải thao tác trực tiếp với database. Laravel, Eloquent sẽ hỗ trợ ngay cả việc thiết lập, thay đổi, thiết kế những thành phần trong database thông qua các file migration. Bạn có thể hiểu đơn giản file migration là như một bản thiết kế. Khi nó được chạy, nó sẽ áp dụng thiết kế đó vào database.
Nếu như dòng code dưới chỉ sinh ra model
```
php artisan make:model Detail
```
thì dòng code dưới đây sẽ vừa sinh ra model và file migration để tạo bảng tương ứng.
```
# Sinh ra model detail và file migration thiết kế việc tạo bảng details trong database.
# Cách 1.
php artisan make:model Detail --migration
# Cách 2.
php artisan make:model Detail --m
```
Qua những phần trước thì chúng ta đã chạy câu lệnh `php artisan make:model Detail` rồi nên chúng ta chỉ cần sinh file migration để tạo bảng tương ứng như sau:
```
php artisan make:migration create_details_table
```
Sau đó thêm 2 trường `slug` và `body`. Nội dung file migration sẽ như sau:
```php:database/migrations/[time_stamp]_create_details_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('details', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->text('body');
            # Câu lệnh default thêm 2 trường created_ad và updated_at để ghi lại thời gian.
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
        Schema::dropIfExists('details');
    }
}
```
Gõ lệnh sau để thực thi các file migrate.
```
php artisan migrate
```
Thêm các bản ghi test vào database và hãy kiểm tra xem trang web còn hoạt động không nhé. Một số lưu ý như sau:
* Trong một file migrate sẽ có hai method là `up` và `down`. `up` là để chúng ta viết những cú pháp để thiết kế bảng mong muốn trong database (tạo bảng, thêm cột, thêm index). Các bạn có thể check các cú pháp tại [đây](https://laravel.com/docs/7.x/migrations#creating-tables)! `down` là các cú pháp xử lý để chúng ta có thể rollback lại những thực thi vừa rồi của method `up`. Dễ thấy ở ví dụ trên, `up` sẽ tạo table `details` còn `down` sẽ xóa bỏ bảng đó. Nếu bạn có một file migrate mới, thông thường bạn sẽ phải viết `up` và `down` cho file đó.
* Khi muốn rollback một file migrate đã được thực thi. Ta có thể dùng lệnh `php artisan migrate:rollback`. Và có thể `php artisan` để xem có thêm những lệnh gì liên quan tới migrate nhé. Lưu ý, nếu thực hiện bất cứ rollback hay reset nào, bạn sẽ dữ liệu (data) tương ứng.
* **Quan trọng** Việc có những file migrate như này để giúp cho việc khi các member khác pull code chung về có thể migrate ra được database tương tự. Nếu như chúng ta muốn thay đổi cơ sở dữ liệu bằng các file migrate đã thông báo thì là điều tuyệt đối không nên. Thứ nhất, file đó migrate rồi và buộc phải rollback để migrate lại. Thứ hai, gây ra conflict ở file migrate giữa những phiên bản project khác nhau của member. Vì thế, nếu muốn sửa gì liên quan đến file database hãy tạo thêm file migrate mới nhé.
* **Convention** Các bạn có thắc mắc tại sao tên model lại viết hoa chữ cái đầu và không số nhiều, mà tên table thì viết thường và số nhiều, hay khi viết `php artisan make:migration create_details_table` thì file migrate lại tự hiểu tên bảng là `details` thì có thể hiểu đó là convention của laravel để chúng ta có thể "tự động hóa" được một số thứ. Hãy thử `php artisan make:migration add_title_to_details_table` xem nội dung file migration có gì khác với file trước đó nhé. Hãy cố gắng tuân theo convention của Laravel tránh "magic stops working" nhé.
* Đầu tên file migration thường có một chuỗi số gọi là time_stamp để ghi nhớ thời gian tạo file migration và cũng là căn cứ cho laravel hiểu đã migrate đến đâu rồi và sẽ rollback về đâu.
## Các option đi kèm khi sinh model
Nếu như bạn muốn khi sinh model muốn sinh thêm controller, file migration tương ứng luôn thì hãy thêm một số tùy chọn như câu lệnh sau.
```
php artisan make:model Detail -mc
```
Sẽ còn rất nhiều tùy chọn khác nhau cho mỗi câu lệnh của artisan vì thế hãy gõ theo cú pháp sau để xem được câu lệnh này có tham số và option nào nhé.
```
php artisan help [lệnh-command]
```
Ví dụ
```
php artisan help make:model
```
## Về Tinker
> "Laravel Tinker is a powerful REPL for the Laravel framework, powered by the PsySH package." - Laravel said

Hãy hiểu đơn giản Tinker là công cụ chạy trên ternimal giúp chúng ta debug vô vùng hữu dụng. Khởi chạy Tinker bằng câu lệnh.
```
php artisan Tinker
```
Tinker có thể giúp bạn thử thao tác với database với câu lệnh tương tự, khởi chạy method và kiểm tra đúng sai. Bạn có thể đọc thêm cách sử dụng về Tinker tại [đây](https://viblo.asia/p/debug-de-dang-hon-voi-laravel-tinker-YWOZrwy7lQ0)!
> Phần này xin được tạm kết tại đây!
> Nguồn tham khảo: https://laracasts.com/series/laravel-6-from-scratch/