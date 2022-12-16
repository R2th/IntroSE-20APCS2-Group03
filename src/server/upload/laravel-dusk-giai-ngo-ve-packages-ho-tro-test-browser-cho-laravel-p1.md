1. Các bước cài đặt :																
-	Cài đặt thông qua composer : composer require --dev laravel/dusk:^2.0														
-	Đăng ký DuskServiceProvider trong ứng dụng :														
			+ Cách 1: Include trong providers array trong file config/app.php : Laravel\Dusk\DuskServiceProvider::class													
			 Với cách này, DuskServiceProvider sẽ được đăng ký trong ứng dụng cho tất cả các môi trường.													
			+ Cách 2: Đăng kí service provider Laravel\Dusk\DuskServiceProvider trong method register() của provider AppServiceProvide  cho các môi trường cụ thể:													

	if ($this->app->environment('local', 'testing')) {													
			     		   $this->app->register(DuskServiceProvider::class);											
			   	 }	
									
- Config url và môi truờng của dự án trong file .env : 															
			+ APP_URL=http://localhost:8000   // domain ứng dụng													
			+ APP_ENV=local    // môi trường test													
- hoàn tất quá trình cài đặt packages: php artisan dusk:install															
- Tải chromedriver mới nhất và cài đặt theo video sau :  https://www.youtube.com/watch?v=dz59GsdvUF8
- Để generating một Dusk test, sử dụng artisan command dusk:make. File test sẽ được lưu vào trong thư mục tests/Browser :
	Example : php artisan dusk:make LoginTest
 Khi muốn chạy test, ta chạy lệnh :
	`php artisan dusk`															
- Theo mặc định, Dusk sẽ sử dụng trình duyệt chrome để test và sẽ tự động tìm cách khởi động ChromeDriver. Nếu như việc tự động khởi động
 không làm việc cho hệ thống của bạn, bạn có thể khởi động ChromeDriver theo cách thủ công trước khi chạy lệnh dusk bằng cách mở cmd và chạy
 lệnh : chromedriver .														
- Nếu bạn chọn khởi động ChromeDriver theo cách thủ công, bạn nên comment hoặc xóa dòng sau trong file tests/DuskTestCase.php của bạn:

	public static function prepare() {
	 // static::startChromeDriver(); 
	}		
												
														
	 Mặc định Dusk sử dụng trình duyệt chrome để test, tuy nhiên bạn cũng có thể test với trình duyệt bạn mong muốn bằng cách sửa driver() method
 trong file tests/DuskTestCase.php với  URL và port selenium server của bạn. Tất nhiên bạn cũng cần cài đặt webdriver tương ứng .