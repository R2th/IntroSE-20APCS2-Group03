# Breadcrumb là gì?
Breadcrumb cung cấp một hệ thống điều hướng giúp người dùng biết được vị trí của họ và quan hệ giữa các trang trong một website.

Cái tên breadcrumb bắt nguồn từ một câu chuyện cổ tích nổi tiếng *'Hansel và Grettel'*, bởi nó làm những điều tương tự, để lại dấu vết, giúp người dùng không bị lạc giữa một hệ thống web phức tạp. qua đó giúp nâng cao trải nghiệm của người dùng. Breadcrumb cũng làm giảm đi thao tác của người dùng khi họ muốn đến một trang chỉ định nào đó.

Việc cài đặt breadcrumb với laravel thực chất khá là đơn giản. Có một package đã giải quyết hầu hết logic, công việc của chúng ta là tìm hiểu cách sử dụng package đó để xây dựng lên một hệ thống breadcrumb tiện dụng

# Xây dựng hệ thống breadcrumb trong laravel
***Để tìm hiểu cách xây dựng hệ thống breadcrumb như thế nào, ta làm một ví dụ đơn giản để mô tả hệ thống các lục địa, quốc gia và thành phố:***
## Cài đặt project laravel
Tạo một project laravel mới với composer:
> composer create-project --prefer-dist laravel/laravel breadcrumbs
> 
Cài đặt package [Laravel Breadcrumb](https://github.com/davejamesmiller/laravel-breadcrumbs):
> composer require davejamesmiller/laravel-breadcrumbs
> 
## Migration và model
Hệ thống sẽ bao gồm ba thực thể: lục địa (continent), quốc gia (country) và thành phố (city):
Tạo migration và model cho ba thực thể này:
> php artisan make:model Continent -m
> 

> php artisan make:model Country -m
> 

> php artisan make:model City -m
> 
### Migration
**Continent** gồm thông tin: id, tên và timestamps
```php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContinentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('continents', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
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
        Schema::dropIfExists('continents');
    }
}
```
**Country** bao gồm thông tin: id, tên, vì thành phố sẽ thuộc vào một châu lục nào đó nên sẽ có thêm id của lục địa, timestamps
```php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('continent_id');
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
        Schema::dropIfExists('countries');
    }
}
```
**City**: thông tin của thành phố cũng sẽ có id, tên, nó thuộc về một đất nước nào đó nên sẽ có thêm id của đất nước và cuối cùng là timestamps
```php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('country_id');
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
        Schema::dropIfExists('cities');
    }
}
```
Sau khi tạo xong migration migrate database với câu lệnh
> php artisan migrate
> 
### Model

Model thể hiện các trường và mối quan hệ giữa các bảng

**Continent:** app/Continent
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Continent extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $date = [
        'created_at',
        'updated_at',
    ];

    public function country()
    {
        return $this->hasMany(Country::class);
    }
}
```

**Contry:** app/Country
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $date = [
        'created_at',
        'updated_at',
    ];

    public function city()
    {
        return $this->hasMany(City::class);
    }

    public function continent()
    {
        return $this->belongsTo(Continent::class);
    }
}
```
**City:** app/City
```php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $date = [
        'created_at',
        'updated_at',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
```
## Tạo dữ liệu

### Factory
Sử dụng câu lệnh dưới đây để tạo factory
> php artisan make:factory ContinentFactory --model=Continent
> 

> php artisan make:factory CountryFactory --model=Country
> 

> php artisan make:factory CityFactory --model=City
> 

### Seeder
Tạo dữ liệu cho các bảng :
> php artisan make:seeder DatabaseSeeder
> 
Trong database/seeds/DatabaseSeeder.php, sử dụng fatory để tạo ra một thành phố Hà Nội, thuộc đất nước Việt Nam và địa phận châu Á:
```php
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\City::class)->create([
            'name' => 'Ha Noi',
            'country_id' => function () {
                return factory(App\Country::class)->create([
                    'name' => 'Viet Nam',
                    'continent_id' => function () {
                        return factory(App\Continent::class)->create(['name' => 'Asia' ])->id;
                    }
                ])->id;
            }
        ]);
    }
}
```
Chạy câu lếnh seeder để sinh dữ liệu
> php artisan db:seed --class=DatabaseSeeder
> 
## Route
Expect của chúng ta sẽ xây dựng 4 trang
* home với breadcrumb có cấu trúc `home`.
* continent với breadcrumb có cấu trúc `home > continent`
* country với breadcrumb có cấu trúc `home > continent > country`
* city  với breadcrumb có cấu trúc `home > continent > country > city`

Như vậy khi đứng ở một trang bất kỳ  người dùng đều có thể theo dõi được việc mình đang ở đâu và trước đó là gì


Trong routes/web.php:
```php
Route::get('/',  ['as' => 'home', 'uses' => 'MainController@home']);

Route::get('continent/{name}', 'MainController@continent')->name('continent');

Route::get('country/{name}', 'MainController@country')->name('country');

Route::get('city/{name}', 'MainController@city')->name('city');

```
## Controllers
Tạo một controller main
> php artisan make:controller MainController
> 
Ở controller ta sẽ xây dựng bốn function tương ứng với 4 route bên trên. mỗi function sẽ trả về view riêng tương ứng cùng với model của nó.
```php
namespace App\Http\Controllers;

use App\Continent;
use App\Country;
use App\City;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function home(){
        return view('home');
    }

     public function continent($name)
     {
        $continent = Continent::where('name', $name)->first();
        return view('continent', compact('continent'));
    }

     public function country($name)
     {
         $country = Country::where('name', $name)->first();
        return view('country', compact('country'));
    }

     public function city($name)
     {
        $city = City::where('name', $name)->first();
        return view('city', compact('city'));
    }
}
```
## Xây dựng hệ thống Breadcrumbs
Việc đăng ký breadcrumb nằm trong file routes\breadcrumbs.php

Nhìn chung cấu trúc của một breadcrumbs sẽ như thế này:
`Breadcrumbs::register(string $name, closure $callback)`

Mình sẽ đi giải thích về một phần breadcrumbs của home, continent, từ đó bạn có thể dễ dàng hiểu hơn về việc tạo một breadcrumb mới:

```php
Breadcrumbs::register('home', function ($breadcrumbs) {
     $breadcrumbs->push('Home', route('home'));
});
```
Với breadcrumb home, bạn có thể thấy đoạn code sử dụng static method, đăng ký một breadcrumb mới với tên là home 'home' và gọi một closure. Sau đó closure lấy tham số $breadcrumbs và đẩy vào thêm một đối tượng breadcumb mới cùng với url của nó. 'Home' trong hàm push sẽ là những gì được hiển thị ra khi render breadcrumbs này.

```php
Breadcrumbs::register('continent', function ($breadcrumbs, $continent) {
    $breadcrumbs->parent('home');
    $breadcrumbs->push($continent->name, route('continent', ['name' => $continent->name]));
});
```
Với breadcrumb continent,  closure sẽ có thêm một tham số mới dó là $continent (được truyền vào view từ controller và sẽ được cung cấp bởi view khi gọi hàm render). Tiếp đến, sử dụng breabcrumbs home là parent như vậy ta sẽ có cấu trúc breabcrumb như `home > continent`. Cuối cùng là sử dụng push để đẩy tương tự với breadcrumb home. Lưu ý việc sử dụng $continent->name sẽ giúp cho với mỗi $continent truyền vào khác nhau, breadcrumb sẽ hiển thị khác nhau.

Cứ như vậy để xây dựng một cấu trúc breadcrumb `home > continent > country > city` ta sẽ lần lượt đăng ký tiếp breadcrumb của country với parent là continent, breadcrumb của city với parent là country. Cuối cùng ta sẽ được như sau:
```php
Breadcrumbs::register('home', function ($breadcrumbs) {
     $breadcrumbs->push('Home', route('home'));
});

Breadcrumbs::register('continent', function ($breadcrumbs, $continent) {
    $breadcrumbs->parent('home');
    $breadcrumbs->push($continent->name, route('continent', ['name' => $continent->name]));
});

Breadcrumbs::register('country', function ($breadcrumbs, $continent, $country) {
    $breadcrumbs->parent('continent', $continent);
    $breadcrumbs->push($country->name, route('country', ['name' => $country->name]));
});

Breadcrumbs::register('city', function ($breadcrumbs, $continent, $country, $city) {
    $breadcrumbs->parent('country', $continent, $country);
    $breadcrumbs->push($city->name, route('city', ['name' => $city->name]));
});
```
## Render breadcrumb trên mỗi view
Như đã thấy ở controller, chúng ta cần 4 view là home, continent, country và city. Mỗi view sẽ chỉ hiển thị ra breadcrumb của trang đó. Các breadcrumb này có giao diện là mặc định với bootstrap 4
Trong foler resources\views. tạo các view:

```html:home.blade.php
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

 </head>
 <body>

{{ Breadcrumbs::render('home') }}

</body>
</html>
```

```html:continent.blade.php
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

 </head>
 <body>

{{ Breadcrumbs::render('continent', $continent) }}

</body>
</html>
```

```html:country.blade.php
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

 </head>
 <body>

{{ Breadcrumbs::render('country', $country->continent, $country) }}

</body>
</html>
```

```html:city.blade.php
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

 </head>
 <body>

{{ Breadcrumbs::render('city', $city->country->continent, $city->country, $city) }}

</body>
</html>
```

Lại giải thích về render breadcrumb, mình lấy ví dụ về city. Render truyền vào 4 tham số, tham số đầu tiên là tên breadcrumb gọi đến, ba tham số tiếp theo lần lượt là ba tham số gọi đến trong closure khi đăng kí breadcrumb có tên này.

Bây giờ run project và xem kết quả thôi
# Kết luận
Việc sử dụng breadcrumb trong laravel không hề khó chút nào. Có khó chắc là do mình viết hơi khó hiểu chút thôi :p. Chúc các bạn thành công nhé

Tài liệu tham khảo:
> https://medium.com/@jordanIrabor/building-dynamic-breadcrumbs-in-laravel-f6bf1eb23a7d
>