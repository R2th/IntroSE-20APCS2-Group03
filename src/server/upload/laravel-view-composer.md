## Giới thiệu 
- Nếu bạn đã quen làm với cấu trúc MVC trong lập trình web, chúng ta đều hiểu rằng, mọi dữ liệu có trong view có thể được render xuống từ controller. Và trong laravel cũng tuân theo cấu trúc này. Tuy nhiên trong laravel, chúng ta có thể tái cấu trúc lại view để làm code sạch hơn, rõ ràng hơn và tránh cho việc lặp đi lặp lại một số code nhất định đó là sử dụng **kế thừa view** (extend view) hoặc sử dụng include view (ví dụ @include('layouts.includes.header'). Tuy nhiên, với hai hướng tiếp cận trên, thì chúng ta chỉ hạn chế việc phải lặp đi lặp lại đoạn code html (chính xác hơn là code .blade), còn những dữ liệu được truyền xuống view, thì vẫn phải lặp lại từ mọi controller muốn render view.
- Câu hỏi đặt ra là, có cách nào chúng ta gom các xử lý logic gắn như là một phần của view, mà mỗi lần view được render thì logic đó được tích hợp sẵn ? View Composer được đưa ra để giải quyết vấn đề này.
## Các bước tạo một view composer 
### Tạo mới một ServiceProvider 
- Laravel không thêm thư mục **ViewComposers** trong cấu trúc của một project, do vậy chúng ta trước hết cần tạo ra một thư mục **App\Http\ViewComposers**. 
- Chúng ta sẽ tạo ra một **service provider** để handle mọi view composer của chúng ta. Sử dụng **php artisan**
  ```bash
      php artisan make:provider ComposerServiceProvider`
  ```
- ComposerServiceProvider sẽ như các service Provider khác, phải được thêm vào trong phần **providers** trong **config/app.php** 
    ```php
     'provides' => [App\Providers\ComposerServiceProvider::class,]
    ```
- Cập nhật lại phương thức **boot** trong ComposerServiceProvider, thêm phương thức **composer** , kế thừa từ **view**
    ```php
    /**
         * Bootstrap the application services.
         *
         * @return void
         */
        public function boot()
        {
            view()->composer(
                'app',
                'App\Http\ViewComposers\MovieComposer'
            );
        }
    ```
   Laravel sẽ thực thi phương thức **MovieComposer@compose** mỗi lần render **app.blade.php**. Bạn có thể thay thế phương thức (có thể không phải là **composer** mà là **loadData**), view  không phải là **app.blade.php** mà bất kỳ mọi file **.blade.php** nào đó, và tên của **ViewComposer**. 
### Tạo một ViewComposer 
Trong ví dụ này, chúng ta sẽ tạo một **MovieComposer** 
   ```php
    <?php
    namespace App\Http\ViewComposers;

    use Illuminate\View\View;

    class MovieComposer
    {
        public $movieList = [];
        /**
         * Create a movie composer.
         *
         * @return void
         */
        public function __construct()
        {
            $this->movieList = [
                'Shawshank redemption',
                'Forrest Gump',
                'The Matrix',
                'Pirates of the Carribean',
                'Back to the future',
            ];
        }

        /**
         * Bind data to the view.
         *
         * @param  View  $view
         * @return void
         */
        public function compose(View $view)
        {
            $view->with('latestMovie', end($this->movieList));
        }
    }
```
Phương thức compose được định nghĩa ở composerview service provider được định nghĩa ở trên. 
Trong phương thức compose, chúng ta sẽ đưa vào xử lý logic và dữ liệu được gắn vào với file **.blade.php**. Như code ở trên, chúng ta sẽ luôn có biến **latestMovie** mỗi lần render view **app.blade.php**
### Mở rộng
- Một **ViewComposer** có thể share nhiều view. Thay vì **app.blade.php** trong định nghĩa **serviceProvider**, chúng ta có thể đính kèm **viewcomposer** trong nhiều view. Cụ thể
    ```php
    /**
         * Bootstrap the application services.
         *
         * @return void
         */
        public function boot()
        {
            view()->composer(
                ['app', 'movie.index'],
                'App\Http\ViewComposers\MovieComposer'
            );
        }
    ```