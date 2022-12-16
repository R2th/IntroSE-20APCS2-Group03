Repository Pattern rất hữu ích để giữ code rõ ràng, sạch và dễ đọc hơn. Hôm nay mình sẽ giới thiệu cách sử dụng Repository trong Laravel để làm cho controller ngắn gọn và dễ đọc hơn.
# Working Without Repositories
Việc sử dụng repositories không phải là một bắt buộc. Bạn có thể hoàn thành rất nhiều thứ trong ứng dụng mà không dùng pattern này. Tuy nhiên nếu không sử dụng repository thì theo thời gian ứng dụng rất khó để test, khó khăn khi bảo trì và thay đổi. Ví dụ xem xét ví dụ sau:
# Getting House Listings From a Real Estate Database
## House controller
```php
<?php
 
class HousesController extends BaseController {
 
 
	public function index()
	{
		$houses = House::all();
		
		return View::make('houses.index', compact('houses'));
	}
 
 
	public function create()
	{
		return View::make('houses.create');
	}
 
 
	public function show($id)
	{
		$house = House::find($id);
		
		return View::make('houses.show', compact('house'));
	}
}
```
    Đây là một đoạn code kinh điển sử dụng Eloquent để tương tác với database để liệt kê danh sách nhà đất. Nó hoạt động okie nhưng có thể thấy controller đang phụ thuộc chặt chẽ vào Eloquent. Chúng ta có thể  `inject` một repository để dễ dàng sửa đổi và bảo trì sau này. 
# Working With Repositories
Có một số bước để tạo repository pattern như sau:
## 1. Create the Repository Folder
Chúng ta tạo thư mục `Repositories`  trong thư mục `app` của ứng dụng. 
## 2. Create Interface
Bước tiếp theo là tạo `interface` để  tất cả các repository sẽ implement  với một `namespace` và các phương thức.
```php
<?php
namespace Repositories;
 
interface HouseRepositoryInterface {
	
	public function selectAll();
	
	public function find($id);
	
}
```

## 3. Create Your Repository
Chúng ta có thể tạo repository để thực thi tất cả các chức năng. Trong file này chúng ta sẽ để tất cả các truy vấn chi tiết với Eloquent hoặc những xử lý phức  tạp. 
```php
<?php
namespace Repositories;
 
use House;
 
class DbHouseRepository implements HouseRepositoryInterface {
	
	public function selectAll()
	{
		return House::all();
	}
	
	public function find($id)
	{
		return House::find($id);
	}
}
```

## 4. Create Backend Service Provider
Đối với controller, chúng ta sẽ đánh gợi ý một interface. Chúng ta sẽ sử dụng `dependency injection`, nhưng là cách của một interface cơ bản. Nghĩa là chúng ta cần đăng ký interface với Laravel, vì vậy sẽ biết được implementation của interface chúng ta muốn sử dụng. Đầu tiên, chúng ta sử dụng Eloquent implementation, nhưng sau đó chúng ta move sang một file để show cách chúng ta chuyển đổi implementations dễ dàng sử dụng một interface. Chúng ta sẽ đặt  `Service Provider` này cùng tên namespace như các file khác.

```php
<?php
namespace Repositories;
 
use IlluminateSupportServiceProvider;
 
class BackendServiceProvider extends ServiceProvider {
	
	public function register()
	{
		$this->app->bind('repotutrepositoriesHouseRepositoryInterface', 'repotutrepositoriesDbHouseRepository');
	}
}
``` 
Đoạn code này cơ bản cho ta thấy controller đánh gợi ý `HouseRepositoryInterface`, chúng ta biết cần sử dụng `DbHouseRepository`.

## 5. Update Your Providers Array
Bây giờ chúng ta tạo một `Service Provider` thì cần thêm vào `provider array` trong  `app/config/app.php`. Nó có thể trông như thế này:

```php
'providers'  =>  [

		'IlluminateFoundationProvidersArtisanServiceProvider',
		'IlluminateAuthAuthServiceProvider',
		'IlluminateCacheCacheServiceProvider',
		'IlluminateSessionCommandsServiceProvider',
		'IlluminateFoundationProvidersConsoleSupportServiceProvider',
		'IlluminateRoutingControllerServiceProvider',
		'IlluminateCookieCookieServiceProvider',
		'IlluminateDatabaseDatabaseServiceProvider',
		'IlluminateEncryptionEncryptionServiceProvider',
		'IlluminateFilesystemFilesystemServiceProvider',
		'IlluminateHashingHashServiceProvider',
		'IlluminateHtmlHtmlServiceProvider',
		'IlluminateLogLogServiceProvider',
		'IlluminateMailMailServiceProvider',
		'IlluminateDatabaseMigrationServiceProvider',
		'IlluminatePaginationPaginationServiceProvider',
		'IlluminateQueueQueueServiceProvider',
		'IlluminateRedisRedisServiceProvider',
		'IlluminateRemoteRemoteServiceProvider',
		'IlluminateAuthRemindersReminderServiceProvider',
		'IlluminateDatabaseSeedServiceProvider',
		'IlluminateSessionSessionServiceProvider',
		'IlluminateTranslationTranslationServiceProvider',
		'IlluminateValidationValidationServiceProvider',
		'IlluminateViewViewServiceProvider',
		'IlluminateWorkbenchWorkbenchServiceProvider',
		'repotutrepositoriesBackendServiceProvider'
 ],
 ```
    
## 6.  Update Your Controller for Dependency Injection
Khi controller `inject` một implementation của `HouseRepositoryInterface` thì chúng đã sẽ remove tất cả các cách gọi Eloquent trực tiếp trong controller và thay thế bằng một phương thức của repository như sau:

```php
<?php
 
use repotutrepositoriesHouseRepositoryInterface;
 
class HousesController extends BaseController {
	
	public function __construct(HouseRepositoryInterface $house)
	{
		$this->house = $house;
	}
 
 
	public function index()
	{
		$houses = $this->house->selectAll();
 
		return View::make('houses.index', compact('houses'));
		
	}
 
 
	public function create()
	{
		return View::make('houses.create');
	}
 
 
	public function show($id)
	{
		$house = $this->house->find($id);
		
		return View::make('houses.show', compact('house'));
 
	}
}
```

## 7. Confirm Routes are Correct
Trong ví dụ này chúng ta tạo một route resource đơn giản như sau:
```php
<?php
 
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
 
Route::resource('houses', 'HousesController');
``` 
Phải chắc chắn rằng `namespace` đã được liên kết trong file composer.json . Chú ý rằng đoạn ` "psr-4":{"repotut\": "app/repotut" }` sẽ bảo composer autoload tất cả các class trong  repotut namespace. 

```php
{
	"name": "laravel/laravel",
	"description": "The Laravel Framework.",
	"keywords": ["framework", "laravel"],
	"license": "MIT",
	"require": {
		"laravel/framework": "4.2.*"
	},
	"autoload": {
		"classmap": [
			"app/commands",
			"app/controllers",
			"app/models",
			"app/database/migrations",
			"app/database/seeds",
			"app/tests/TestCase.php"
		],
            
                "psr-4":{
                     "repotut\": "app/repotut"
                }
	},
	"scripts": {
		"post-install-cmd": [
			"php artisan clear-compiled",
			"php artisan optimize"
		],
		"post-update-cmd": [
			"php artisan clear-compiled",
			"php artisan optimize"
		],
		"post-create-project-cmd": [
			"php artisan key:generate"
		]
	},
	"config": {
		"preferred-install": "dist"
	},
	"minimum-stability": "stable"
}

```
Đừng quên run `composer dump` sau khi sửa file `composer.json`.