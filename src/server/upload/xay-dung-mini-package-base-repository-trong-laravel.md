# 1. Đặt vấn đề
Chào các bạn nhá, hôm này mình sẽ hướng dẫn các bạn package siêu to khổng lồ :sweat_smile: (theo trending tí ).

Như các bạn đã biết, trong các dự án lớn với Laravel, code thường hay áp dụng các `design pattern` cho code clear cũng như dễ viết test hơn. Ví dụ trong Laravel mình hay sử dụng `Repository Design Pattern` làm tầng trung gian giữa `Model` và `Controller`. Vấn đề đặt ra ở đây là khi làm các dự án khác nhau, mình phải copy code phần `Repository` từ dự án này sang dự án kia, mất khá nhiều công sức. Nên hôm nay mình quyết định đóng gói nó lại thành package để dễ ràng sử dụng cho những dự án sau này.

Về cơ bản package của mình sẽ gồm 2 tính năng chính:
1. Tự tạo Repository à Interface của chúng thông qua câu lệnh command line .
```bash
php artisan make:repository UserRepository -i
```
Ví dụ khi chạy lệnh này sẽ tạo ra 2 file `UserRepository` và `UserRepositoryInterface`

2. Toàn bộ câu truy vấn liên quan đến việc CRUD sản phẩm sẽ được đóng gói sẵn trong package  không cần tốn công đi copy

# 2. Tạo package
Với bất kì 1 package nào bạn muốn đóng gói và publish chúng trên https://packagist.org/. Bạn cũng phải tạo file `composer.json` đầu tiên.
```
composer init
```
Sau khi tạo ra file và điền thông tin đầu đủ về `name`, `description` . . . mình được 1 cấu trúc như nhau 
```json
{
    "name": "su-1294/base-repository-laravel",
    "description": "Base repository implementation for Laravel",
    "keywords": [
      "laravel",
      "repository",
      "repository pattern",
      "eloquent",
      "repositories"
    ],
    "license": "BSD-2-Clause",
    "authors": [
      {
        "name": "Nguyen Huu Su",
        "email": "huusu1996@gmail.com"
      }
    ],
    "require": {
      "php": ">=7.1",
      "illuminate/support": "~5.1",
      "illuminate/database": "~5.1"
    },
    "require-dev": {
      "phpunit/phpunit": "^4.8",
      "mockery/mockery": "^0.9.4"
    },
    "autoload": {
      "psr-4": {
        "Kenini\\": "src/"
      }
    },
    "autoload-dev": {
      "files": [
        "tests/TestFunctions.php"
      ],
      "psr-4": {
        "Kenini\\Test\\": "tests"
      }
    },
    "extra": {
      "laravel": {
        "providers": [
            "Kenini\\RepositoryServiceProvider"
        ]
      }
    },
    "archive" : {
      "exclude": [
        "/tests"
      ]
    }
  }
  
```
Ở đây mình xin giải thích 1 số keywork cho mọi người lưu ý:
1. `psr-4` ở đây mình định nghĩa toàn bộ namespace trong thư mục `src` với cái tên là `Kenini`
2.  Với Laravel 5.5 trở đi. bạn có thể sử dụng ` Package Auto-Discovery`. Việc này giúp người dùng không phải định nghĩa các ServiceProvider trong config/app.php khi họ `installl` package của mình nữa.

Dựa theo tính năng mình sẽ chia package làm 2 folder chính:
1. src
*  Console: Code phát triển tính năng comand line
*  Repository: Code phát triển tính năng liên quan đến việc các hàm base truy cấn
*  RepositoryServiceProvider: Nơi để bind các class liên quan

2. Test: Test code package

Ngoài ra có thêm file `README.md` để hướng dẫn sử dụng nữa.

![](https://images.viblo.asia/960045b3-3106-436f-8c11-bb434ca74655.png)

## 2.1 Thư mục Console
Như mình đã nói ở phần đầu mình nói về chức năng tạo các class Repository bạn có thể đoán được nó nằm ở đây rồi đúng không ?
ở đây mình có chia ra làm 2 forder
1. stubs: Toàn bộ template của các class Repository khi generate bằng câu lệnh
2. Các xử lí liên quan đến xử lí với command line
```php 
class RepositoryMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:repository';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository class';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if (parent::handle() === false && ! $this->option('force')) {
            return;
        }

        if ($this->option('interface')) {
            $this->createRepositoryInterface();
        }
    }

    protected function createRepositoryInterface()
    {
        $repositoryName= Str::studly(class_basename($this->argument('name')));

        $this->call('make:interface', [
            'name' => "{$repositoryName}Interface",
        ]);
    }

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Repository';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__.'/stubs/repository.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Repositories';
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['force', 'f', InputOption::VALUE_NONE, 'Create the class even if the repository already exists.'],
            ['interface', 'i', InputOption::VALUE_NONE, 'Create a new interface for the repository.'],
        ];
    }
}
```
Mình xử lí toàn bộ phần generate class Repository ở `RepositoryMakeCommand`. Class này có kế thừa `GeneratorCommand`
1. ` protected $name = 'make:repository'` tên của comand line 
2. `getStub()`: Lấy ra `stub file` để generate
3. `handle()`: Ở đây mình xử lí thêm 1 tính năng 2 trong 1. Khi thêm option `-i` ở command line sẽ vừa tạo repository vừa tạo interface tương ứng. Cuối bài mình sẽ show link git cho mọi người dễ theo dõi.
## 2.2 Base Repository
Trong thư mục này mình sẽ định nghĩa ra toàn bộ các câu truy vấn có thể tái sử dụng với các Model khác nhau. Vì quá dài nên mình chỉ lấy 1 số hàm thông dụng nhất cho việc CRUD 1 bản ghi

AbstractRepository: 
```php
<?php

namespace Kenini\Repository;

use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent\Model;
use Kenini\Repository\Contracts\RepositoryInterface;
use Illuminate\Database\Query\Builder;

/**
 * Class AbstractRepository
 *
 * @package Kenini\Repository
 */
class AbstractRepository implements RepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * AbstractRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @inheritdoc
     */
    public function find(array $conditions = [])
    {
        return $this->model->where($conditions)->get();
    }

    /**
     * @inheritdoc
     */
    public function findOne(array $conditions)
    {
        return $this->model->where($conditions)->first();
    }

    /**
     * @inheritdoc
     */
    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * @inheritdoc
     */
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    /**
     * @inheritdoc
     */
    public function update(Model $model, array $attributes = [])
    {
        return $model->update($attributes);
    }

    /**
     * @inheritdoc
     */
    public function save(Model $model)
    {
        return $model->save();
    }

    /**
     * @inheritdoc
     */
    public function delete(Model $model)
    {
        return $model->delete();
    }
}
```
RepositoryInterface: 
```php
<?php

namespace Kenini\Repository\Contracts;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

/**
 * Interface BaseRepositoryInterface
 *
 * @package App\Repositories
 */
interface RepositoryInterface
{
    /**
     * Find all records that match a given conditions
     *
     * @param array $conditions
     *
     * @return Model[]
     */
    public function find(array $conditions = []);

    /**
     * Find a specific record that matches a given conditions
     *
     * @param array $conditions
     *
     * @return Model
     */
    public function findOne(array $conditions);

    /**
     * Find a specific record by its ID
     *
     * @param int $id
     *
     * @return Model
     */
    public function findById(int $id);

    /**
     * Create a record
     *
     * @param array $attributes
     *
     * @return Model
     */
    public function create(array $attributes);

    /**
     * Update a record
     *
     * @param Model $model
     * @param array $attributes
     *
     * @return bool
     */
    public function update(Model $model, array $attributes = []);

    /**
     * Save a given record
     *
     * @param Model $model
     *
     * @return boolean
     */
    public function save(Model $model);

    /**
     * Delete the record from the database.
     *
     * @param Model $model
     *
     * @return bool
     *
     * @throws Exception
     */
    public function delete(Model $model);
    
}
```
Các chức năng tương ứng mình đã viết kĩ ở doc mỗi `method()` rồi nên cũng không cần giải thích gì nhiều
## 2.3 ServiceProvider
Trong package này mình có tạo riêng `ServiceProvider` để dễ dàng bind các class liên quan.

```php
<?php

namespace Kenini;

use Illuminate\Support\ServiceProvider;
use Kenini\Console\RepositoryMakeCommand;
use Kenini\Console\RepositoryInterfaceMakeCommand;

class RepositoryServiceProvider extends ServiceProvider
{
    protected $commands = [
        RepositoryMakeCommand::class,
        RepositoryInterfaceMakeCommand::class
    ];
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->commands($this->commands);
    }
}
```
Ở đây mình đã bind vào `RepositoryMakeCommand` và `RepositoryInterfaceMakeCommand`. để có thể resolve mọi nơi.  Vậy là done về mặt coding.
# 3. Submit package lên packagist
[Packagist.org](https://packagist.org/) là kho chứa các package cho PHP. Bạn hiểu đơn giản nó giống dockerhub vậy đó. Để publish 1 package PHP bạn có thể thao tác rất dễ dàng trên trang này. 
Bạn chỉ cần push code package lên git rồi lấy link git sang packagist là đã có thể publish 1 package rồi.

![](https://images.viblo.asia/976ca003-2d00-405a-ab04-3ad6d7950abb.png)

Thành quả của mình sau khi submit lên là đây (len2)

![](https://images.viblo.asia/c36ae830-765e-4926-8924-8290ac02b187.png)

# 4. Tổng kết
Vậy là mình đã hướng dẫn các bạn các publish 1 package repository để có thể dùng chung trong các dự án tiếp theo. Cảm ơn mọi người đã theo dõi bài viết của mình. Hẹn mọi người trong những bài viết lần sau. Mình gửi mọi người soure code ở dưới cho dễ tham khảo.

Link git: https://github.com/sunh-1294/base-repository

Link package: https://packagist.org/packages/su-1294/base-repository-laravel