## 1. Mở đầu
   Chắc hẳn các bạn đã từng nghe hay ứng dụng các design pattern để ứng dụng vào phát triển website của mình. Hôm nay mình xin giới thiệu các về desgin pattern và đặc biệt hơn là triển khai design pattern repository trong code của mình.
## 2. Design pattern là gì?
  -  Design patterns là đại diện những mô hình lập trình được sử dụng bởi những lập trình có kinh nghiệm về lập trình hướng đối tượng. 
  -  Design patrens như là những giải pháp cho những vẫn đề thường gặp trong quá trình phát triển phần mềm.
  -   Nó đã được kiểm chứng bởi nhiều lập trình viên trong một khoảng thời gian dài. 
  -   Nó không phải là một ngôn ngữ cụ thể nào mà là một mô hình được ứng dụng rất nhiều trong các dự án của các ngôn ngữ khác nhau
     Để hiểu rõ hơn  các bạn có thể tham khảo ở [link](https://viblo.asia/p/design-pattern-tai-sao-phai-hoc-design-pattern-ORNZq9OGZ0n) .
## 3. Sử dụng desgin pattern repository trong một ứng dụng Laravel.
![](https://images.viblo.asia/84b7e6cc-72fd-4739-aa53-4835b1d7f4b5.png)
Nhìn vào hình trên các bạn có thể thấy desgin pattern repository nó như là tầng trung gian giữa tầng Business Logic và Data Source. Bạn cứ tưởng tượng khi phát triển một hệ thống lớn và logic càng phức tạp mà các bạn chỉ dùng Controller, View, Model để code thì khi có một sự thay đổi về DB, logic hay để cho một team khác để maintain thì đó đúng là một cơn ác mộng đối với những lập trình viên. Thì tầng repository được đưa vào để giải quyết việc đó tức là nó sẽ nhóm những xử lý logic của hệ thống ở đây và controller chỉ có việc gọi tới các function này, khi có thay đổi logic bạn chỉ cần vào đây thay đổi. Ngoài ra, nếu một ngày đẹp trời nào đó khác hàng muốn đổi mysql sang cassandra chẳng hạn thì bạn chỉ cần thay đổi repository thật nhanh đúng không.
Nói cho cùng khi bạn sử dụng design patterns cho phát triển hệ thống thì bạn sẽ giảm thiểu rất nhiều và có thể ứng phó được những thay đổi requirment của khách hàng.
Nào mình cùng triển khai design patterns repository vào Laravel nhé =))

### Bước 1: Tạo folder repository
Tạo theo câu trúc sau: 
![](https://images.viblo.asia/ba49e2c9-7e91-4b56-ab3a-e2571ad85b3b.PNG)
Mình giải thích 1 chút:

-  Folder Contracts: Ở đây sẽ chứa class Interface mô tả những function mà mình sẽ dùng trong hệ thống.
Đây là ví dụ của class RepositoryInterface.php. Ở class này sẽ mô tả các function của hàm query như find(), all() .... mục đích là mình có thể sử dụng các hàm này thông qua repository.
```
<?php

namespace App\Repositories\Contracts;

interface RepositoryInterface
{
    public function all();

    public function withTrashed();

    public function onlyTrashed();

    public function makeModel();

    public function lists($column, $key = null);

    public function paginate($limit = null, $columns = ['*']);

    public function find($id, $columns = ['*']);

    public function findOrFail($id, $columns = ['*']);
}
```
-  Folder Eloquent: Ở đây mình sẽ chưa các class triển khai các funtion có trong class Interface chứa ở folder Contracts.
Đây là ví dụ của class BaseRepository.php. Ở class này sẽ triển khai các function thuộc class RepositoryInterface.php
```
<?php

namespace App\Repositories\Eloquent;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Container\Container as App;
use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Auth;

abstract class BaseRepository implements RepositoryInterface
{
    protected $model;

    protected $app;

    protected $guards;

    protected $user;

    public function __construct()
    {
        $this->app = new App();
        $this->makeModel();
    }

    /**
     * to call relationship in model
     *
     * @return relationship
    */
    public function __call($method, $args)
    {
        $model = $this->model;

        if ($method == head($args)) {
            $this->model = call_user_func_array([$model, $method], array_diff($args, [head($args)]));

            return $this;
        }

        if (!$model instanceof Model) {
            $model = $model->first();

            if (!$model) {
                throw new ModelNotFoundException();
            }
        }

        $this->model = call_user_func_array([$model, $method], $args);

        return $this;
    }

    /**
     * to call eager loading
     *
     * @return collection
    */
    public function __get($name)
    {
        $model = $this->model;

        if (!$model instanceof Model) {
            $model = $model->first();

            if (!$model) {
                throw new ModelNotFoundException();
            }
        }

        return $model->$name;
    }

    abstract public function model();

    public function setGuard($guard = null)
    {
        $this->guard = $guard;
        $this->user = Auth::guard($this->guard)->user();

        return $this;
    }

    public function makeModel()
    {
        $model = $this->app->make($this->model());

        if (!$model instanceof Model) {
            throw new Exception("Class {$this->model()} must be an instance of Illuminate\\Database\\Eloquent\\Model");
        }

        return $this->model = $model;
    }

    /**
     * function all to get all data of model.
     *
     * @return void
    */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * to get lists columns.
     *
     * @return void
    */
    public function lists($column, $key = null)
    {
        $model = $this->model->pluck($column, $key);
        $this->makeModel();

        return $model;
    }

    public function paginate($limit = null, $columns = ['*'])
    {
        $limit = $limit ?: config('setting.paginate');
        $model = $this->model->paginate($limit, $columns);
        $this->makeModel();

        return $model;
    }

    public function find($id, $columns = ['*'])
    {
        return $this->model->find($id, $columns);
    }

    public function findOrFail($id, $columns = ['*'])
    {
        try {
            $model = $this->model->findOrFail($id, $columns);
            $this->makeModel();

            return $model;
        } catch (ModelNotFoundException $e) {
            throw new \App\Exceptions\Api\NotFoundException('Model not found with id:' . $id, NOT_FOUND);
        }
    }

```

Hai class trên là basic trong mô hình design patterns repository nên những class interface, class repository được tạo sau này điều được extend từ 2 class trên. 
### Bước 2: Đăng ký repository ở Provider
- Vì sao khi sử dụng design patterns lại phải đăng ký provider ? Chắc chắn bạn đang hỏi như vậy? Xin trả lời là bởi vì **Service Container trong Laravel là nơi quản lý class dependency và thực hiện dependency injection.** Để hiểu rõ hơn thì bạn hãy đọc bài này nhé [Service Provider](https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-provider-zb7vDVJnMjKd) ( Bạn phải đọc bài này rồi đọc tiếp bài của mình nhé)
- Bây giờ mình đã mặc định các bạn đã hiểu về Service Provider nên mình sẽ thực hiện như sau:
    + Bạn hãy tạo 1 class provider bằng  ` php artisan make:provider RepositoryServiceProvider `
    ```
    <?php
       namespace App\Providers;

       use Illuminate\Support\ServiceProvider;

       class RepositoryServiceProvider extends ServiceProvider
         {
             protected static $repositories = [
                'user' => [
                    \App\Repositories\Contracts\UserInterface::class,
                    \App\Repositories\Eloquent\UserRepository::class,
                ],

            ];

            /**
             * Bootstrap the application services.
             *
             * @return void
             */
            public function boot()
            {
                //
            }

            /**
             * Register the application services.
             *
             * @return void
             */
            public function register()
            {
                foreach (static::$repositories as $repository) {
                    $this->app->singleton(
                        $repository[0],
                        $repository[1]
                    );
                }
            }
    }
    ```

    + Ở file config/app.php bạn phải khai báo RepositoryServiceProvider ở 
    ```
    'providers' => [
            RepositoryServiceProvider::class,
    ]

    ```
   ### Bước 3:  Inject repository vào Controller
   Mình sẽ hướng dẫn các bạn inject User repository vào class UserController.php
   ```
   <?php

    namespace App\Http\Controllers\Api;

    use Exception;
    use Illuminate\Http\Request;
    use App\Repositories\Contracts\UserInterface;

    class ActionController extends Controller
    {
        protected $userRepository;

        public function __construct(UserInterface $userRepository) {
            $this->userRepository = $userRepository;
        }

   }

   ```

   ## 4. Kết luận
   Qua bài viết này hy vọng bạn có thể hiểu và triển khai design patterns vào dự án của mình.