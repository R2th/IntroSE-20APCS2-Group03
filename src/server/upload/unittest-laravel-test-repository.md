Hello anh em. Ở bài này mình tiếp tục chia sẻ một số kiến thức về viết test cho project laravel.  Mình sẽ hướng dẫn  cách viết test 1 repository trong laravel. 
# 1. Chuẩn bị
Để có thể test repository thì trước hết mình cần có repository để test, ở đây mình sẽ tạo userRepository và sau đó viết test cho nó.
1. Trước hết mình sẽ tạo baseRepository như sau
``` php
<?php
namespace App\Repositories\Eloquents;

use App\Repositories\Interfaces\BaseRepositoryInterface;

abstract class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * EloquentRepository constructor.
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * get model
     * @return string
     */
    abstract public function getModel();

    /**
     * Set model
     */
    public function setModel()
    {
        $this->model = app()->make(
            $this->getModel()
        );
    }

    /**
     * Get All
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {
        return $this->model->all();
    }

    /**
     * Get one
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        $result = $this->model->find($id);

        return $result;
    }

    /**
     * Create
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    /**
     * Update
     * @param $id
     * @param array $attributes
     * @return bool|mixed
     */
    public function update($id, array $attributes)
    {
        $result = $this->find($id);
        if ($result) {
            $result->update($attributes);
            return $result;
        }

        return false;
    }

    /**
     * Delete
     *
     * @param $id
     * @return bool
     */
    public function delete($id)
    {
        $result = $this->find($id);
        if ($result) {
            $result->delete();

            return $result;
        }

        return false;
    }
}
```
2. Tiếp theo mình sẽ tạo userRepository và viết lại  function store để thêm dữ liệu thay vì dùng create
``` php
use Auth;
use App\Models\User;
use App\Repositories\Eloquents\BaseRepository;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }
    public function store($request)
    {
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('public/images');
            $data['avatar'] = strstr($path, '/');
        }
        $data['name'] = $request->name;
        $data['email'] = $request->email;
        $data['password'] = bcrypt($request->password);
        $data['role'] = $request->role;
        $user = User::create($data);
        return $user;
    }
}
```

Trên đây là việc tạo repository nếu các bạn chưa có kiến thức về repository trong laravel thì có thể tìm hiểu  [tại đây](https://viblo.asia/p/curd-voi-repository-trong-laravel-5-part-1-PDOkqLJMejx)
# 2. Viết test cho UserRepository
Chúng ta sẽ tạo 1 file UserRepositoryTest để viết test<br>
Chạy lệnh để tạo unittest:

`php artisan make:test Repositories/UserRepositoryTest --unit`<br>
lệnh trên sẽ sinh ra một thư mục với đường dẫn là test/Unit/Repositories/UserRepositoryTest.php
file ban đầu sẽ như này:
``` php
<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserRepositoryTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
}
```

Tiếp theo viết  function testStore để test function store của UserRepository

``` php
<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use App\Repositories\Eloquents\UserRepository;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserRepositoryTest extends TestCase
{
    /**
     * test get model
     *
     * @return void
     */
    public function testGetModel()
    {
        $userRepository = new UserRepository;

        $data = $userRepository->getModel();
        $this->assertEquals(User::class, $data);
    }
    
      /**
     * test store function model
     *
     * @return void
     */
    public function testStore()
    {
        $userRepository = new UserRepository;
        $params = [
            'name' => 'abc',
            'email' => 'email@gmail.com',
            'password' => '12345678',
            'role' => '1',
            'avatar' => UploadedFile::fake()->image('avatar.jpg'),
        ];
        $request = new \Illuminate\Http\Request();
        $request->replace($params);

        $result = $userRepository->store($request);
        $this->assertEquals(1, User::all()->count());
    }
}
```
Vì mình dùng model User,UseRepository,uploaderFile nên mình sẽ use nó vào <br>
```
use App\Models\User;
use Illuminate\Http\UploadedFile;
use App\Repositories\Eloquents\UserRepository;
```
Trên có hai hàm là testGetModel để test get model và testStore để test store của UserRepository<br><br>
Trong function testStore ta sẽ tạo dữ liệu và gọi hàm store của userRepository để thêm dữ liệu<br>
`$result = $userRepository->store($request);`<br><br>
Sau đó ta kiểm tra xem dữ liệu đã được thêm hay chưa<br>
`$this->assertEquals(1, User::all()->count());` <br>
câu lệnh trên sẽ trả về true nếu thêm dữ liệu thành công<br>
### vậy là xong . sau đó chúng ta chạy lệnh để test:
`vendor/bin/phpunit`
Các bạn làm tương tự với các chức năng show, update, destroy nhé.
# Tổng kết
Trên đây là những kiến thức cơ bản về test Repository laravel, có góp ý gì vui lòng comment vào vài viết nhé. Thanks