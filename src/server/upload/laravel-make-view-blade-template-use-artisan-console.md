# **1.Giới thiệu**
Artisan là giao diện dòng lệnh đi kèm với **Laravel**. Nó cung cấp một số lệnh hữu ích hỗ trợ bạn xây dựng ứng dụng của mình. 
Để xem danh sách tất cả các lệnh **Artisan** có sẵn, bạn có thể sử dụng lệnh:

```
php artisan list
```

![](https://images.viblo.asia/c871605b-23c9-4a8f-a89f-7b45c7bc451d.png)

Chúng ta  có thể tạo các **models** và **controllers** bằng cách sử dụng các lệnh **Artisan** dưới đây:

```
php artisan make:model modelName

php artisan make:controller controllerName

```

Nhưng để tạo 1 View & Blade Templates bằng **Artisan**  như dưới thì làm như thế nào ? 

```
 php artisan make:view

```

Research thoáng qua thì cũng có package [Artisan View
](https://github.com/svenluijten/artisan-view)
để xứ lý việc này. Nhưng chúng ta muốn tạo 1 **Artisan Console**  như thế thì làm như thế nào ?

Bài viết này sẽ hướng dẫn các bạn cách tạo Blade Template thông qua **Artisan Console**.  `php artisan make:view`

# **2.Bắt đầu**
1. **Tạo Commands: MakeView**
   
   `php artisan make:command MakeView
`
2. **Code logic tạo view**
    
   ```
   
   namespace App\Console\Commands;

    use Illuminate\Console\Command;
    use File;
    
    class MakeView extends Command
    {
    
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:view {view}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new blade template.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $view = $this->argument('view');

        $path = $this->viewPath($view);

        $this->createDir($path);

        if (File::exists($path)) {
            $this->error("View {$path} already exists!");
            return;
        }

        File::put($path, $path);

        $this->info("View {$path} created.");
    }

    /**
     * Get the view full path.
     *
     * @param $view
     * @return string
     */
    private function viewPath($view)
    {
        $view = str_replace('.', '/', $view) . '.blade.php';
        return "resources/views/{$view}";
    }

    /**
     * Create view directory if not exists.
     *
     * @param $path
     */
    private function createDir($path)
    {
        $dir = dirname($path);

        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }
    }
     }
 
    ```

3.  **Registered in App/Console/Kernel**

    ```
     protected $commands = [
        MakeView::class
    ];
    ```      

# **3.Test**
* Create a view  **home.blade.php**  trong thư mục mặc định

    `php artisan make:view home`
    
* Create a view **'home.blade.php'** trong sub-view ('pages')

    `php artisan make:view pages.home`