### I. Mở Đầu.
- Như các bạn đã biết Laravel xậy dựng MVC với mô hình này bạn sẽ không gặp nhiều vấn đề với các dự án vừa và nhỏ.
Nhưng ngày ko đẹp trời nào đó bạn phải maintan dự án to hơn 1 chút lúc đó bạn cảm thấy khó khăn trong việc quản lý code của dự án thì ta phải làm thế nào ? 

- Để giải quyết vấn đề trên mình sẽ giới thiệu cho các bạn mô hình HMVC (Hierarchy - Model - View - Controller). Với mô hình này bạn nhóm code theo chức năng mỗi chức năng sẽ là 1 module. Trong mỗi module là 1 mô hình MVC đầy đủ model, view, controller và cả router. Như vậy việc quản lý code là rất dễ dàng.

### II. Cấu hình module.

- Laravel đã hộ trợ việc cấu hình module vậy nên việc cấu hình  là rất dễ dàng không gặp nhiều khó khăn cho dev.

##### Bước 1: 
Đầu tiền bạn phải tạo 1 forder chứa các module không ép buộc bạn đặt tên là gì nhưng đa phần mọi người đặt là Modules như hình dưới:

```
app/
└── Modules
└── Providers
```

##### Bước 2: Tạo ModuleServiceProvider.php 

```php
<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\File;

class ModuleServiceProvider extends ServiceProvider
{ 

  /**
     * registerModules
     *
     * @return void
     */
    public function boot()
    {
       foreach ($this->getModules() as $module => $value) {
            if (!$value) continue;
            $this->registerModuleMigrations($module);
            $this->mapModuleRoutes($module);
            $this->defineNamespaceModuleViews($module);
        }
    }
    
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }
    
    /**
     * @return array
     */
    public function getModules(): array
    {
        return File::directories(__DIR__ . '/../Modules/');
    }
    
       /**
     * Register paths to be published by the publish command.
     *
     * @param string $module
     * @return void
     */
    protected function registerModuleMigrations(string $module): void
    {
        $this->loadMigrationsFrom(module_path($module . DIRECTORY_SEPARATOR . 'Migrations'));
    }
    
        /**
     * Define the "module" routes for the application.
     *
     * @param string $module
     * @return void
     */
    protected function mapModuleRoutes(string $module): void
    {
        $namespace = str_replace('/', '\\', $module);

        $routerWebPath = module_path($module . DIRECTORY_SEPARATOR . 'Routers/web.php');
        $routerApiPath = module_path($module . DIRECTORY_SEPARATOR . 'Routers/api.php');

        if (file_exists($routerWebPath)) {
            $this->mapWebRoutes($namespace, $routerWebPath);
        }

        if (file_exists($routerApiPath)) {
            $this->mapApiRoutes($namespace, $routerApiPath);
        }
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @param $namespace
     * @param  $path
     * @return void
     */
    protected function mapApiRoutes($namespace, $path)
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace("App\Modules\\{$namespace}\\Controllers")
            ->group($path);
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *  @param $namespace
     * @param  $path
     * @return void
     */
    protected function mapWebRoutes($namespace, $path)
    {
        Route::middleware('web')
            ->namespace("App\Modules\\{$namespace}\\Controllers")
            ->group($path);
    }

    /**
     * Define namespace the "module" views for the application.
     *
     * @param string $module
     * @return void
     */
    protected function defineNamespaceModuleViews(string $module): void
    {
        $this->loadViewsFrom(module_path($module . DIRECTORY_SEPARATOR . 'Views'), $module);
    }
}

```

=> Sau đó khai báo ModuleServiceProvider trong app/config/app.php như hình:
![](https://images.viblo.asia/2f09099f-e2e2-48c2-aac4-31abf57058d4.png)

##### Bước 3: Tạo Module.

```
app/
└── Modules
    ├── Products
    │   ├── Controllsers
    │   │   └── ProductController.php
    │   ├── Models
    │   │   └── Product.php
    │   ├── Views
    │   │   └── index.php
    │   └── Routers
                └── web.php
└── Providers
    ├── ModuleServiceProvider.php 
```


=> Bây giờ các chức năng của product hoạt động bình thường.

### III. Kết thúc.

Bài viết của mình của mình đã xong hy vọng nó có thể giúp 1 chút gì đó.

**Cảm ơn các bạn đã đọc bài viết của mình. Thanks you!!**