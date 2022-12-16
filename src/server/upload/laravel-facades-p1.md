# Giới thiệu
Facades cung cấp một interface "static" cho các class sử dụng trong service container. Laravel mang theo nhiều facades cung cấp cho hầu hết các tính năng của Laravel. Laravel facades phục vụ như "proxies tĩnh" cho các class bên dưới ở trong service container, cung cấp lợi ích của việc sử dụng cú pháp vừa ngắn gọn vừa có thể bảo trì có thể thoải mái hơn là sử dụng các phương thức tĩnh truyền thống.

Tất cả facades của Laravel được định nghĩa trong Illuminate\Support\Facades namespace. Vì vậy, bạn có thể dễ dàng truy cập facade như sau:

```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```
Khắp tài liệu Laravel documentation, rất nhiều ví dụ sử dụng facades để chứng minh sự đa dạng tính năng của framework.


# Khi nào sử dụng facades
Facades có rất nhiều lợi ích. They cung cấp một cách gắn gọn, dễ nhớ cho phép bạn sử dụng tính năng của Laravel không cần nhớ tên dài của class nó phải được injected hoặc cấu hình thủ công. Hơn nữa, vì tính duy nhất của các phương thức tĩnh PHP, bạn có thể dễ dàng kiểm tra.

Tuy nhiên, bạn phải cẩn thận khi sử dụng facades. Ngu hiểm nhất của facades là class scope creep. Khi facades dễ sử dụng và không yêu cầu injection, nó dễ dàng cho bạn phát triển nhiều facades trong một class. Sử dụng dependency injection, nó làm cho việc phát triển các dòng code trong class càng ngày càng lớn hơn. Vì vậy, khi sử dụng facades, đặc biệt để ý kích thước class của bạn để class ở phạm vi cho phép.

> Khi bạn sử dụng package thứ ba tương tác với Laravel, nó tốt hơn inject để Laravel contracts thay vì sử dụng facades. Khi các packages được xây dựng bên ngoài Laravel, bạn sẽ không thể truy cập facade Laravel kiểm tra helper.

### Facades với Dependency Injection
Một trong những lợi ích chính của dependency injection là có khả năng hoán vị implementations của injected class. Nó thật hữu dụng khi bạn muốn kiểm tra inject một mock hoặc stub và xác nhận rằng các hàm khác cũng được gọi trong stub.

Thông thường, nó không thể mock hoặc stub một phương thức static. Tuy nhiên, khi facades sử dụng phương thức động đến phương thức proxy gọi đến objects để giải quyết từ service container, chúng ta có thể thật sự test facades cũng như chúng ta test một injected class instance. Ví dụ, cho một route:

```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```
Chúng ta có thể viết test để kiểm chứng rằng phương thức Cache::get được gọi với tham số chúng ta mong đợi:

```
use Illuminate\Support\Facades\Cache;

/**
 * A basic functional test example.
 *
 * @return  void
 */
public function testBasicExample()
{
    Cache::shouldReceive('get')
         ->with('key')
         ->andReturn('value');

    $this->visit('/cache')
         ->see('value');
}
```

### Facades Vs Hàm helper
Ngoài, Facade của Laravel cung cấp vài hàm "helper" khác có thể thực hiện các task như sinh ra views, firing events, dispatching jobs, hoặc sending HTTP responses. Rất nhiều hàm helper giống như facade tương ứng. Ví dụ, facade call và helper call là tương đương:

```
return View::make('profile');

return view('profile');
```
Tất nhiên là không có sự khác biệt giữa facades và hàm helper. Khi sử dụng hàm helper, bạn vẫn có thể test chúng chính xác như facade của nó.Ví dụ, cho một route:

```
Route::get('/cache', function () {
    return cache('key');
});
```
Hàm cache helper đang gọi một phương thức get trong class dưới Cache facade. Vì vậy, mặc dù chúng ta sử dụng hàm helper, chúng ta có thể viết test để kiểm tra phương thức được gọi với tham số chúng ta mong đợi:

```
use Illuminate\Support\Facades\Cache;

/**
 * A basic functional test example.
 *
 * @return  void
 */
public function testBasicExample()
{
    Cache::shouldReceive('get')
         ->with('key')
         ->andReturn('value');

    $this->visit('/cache')
         ->see('value');
}
```

# Facades hoạt động thế nào
Trong ứng dụng Laravel, một facade là một class nó cho phép truy cập object từ container. Các hàm hoạt động trong Facade class. facades Laravel, và bấn cứ tùy biến facades nào bạn tạo, nó sẽ kế thừa từ class base Illuminate\Support\Facades\Facade.

Class base Facade có thể sử dụng phương thức magic __callStatic() để điều khiển thực thi từ facade tới object đã được resolve từ container. Trong ví dụ sau, một phương thức được tạo từ Laravel cache system. Nhìn liếc qua code, người ta có thể đoán được phương thức get được gọi trong class  Cache:

```
<?php

namespace App\Http\Controllers;

use Cache;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param    int  $id
     * @return  Response
     */
    public function showProfile($id)
    {
        $user = Cache::get('user:'.$id);

        return view('profile', ['user' => $user]);
    }
}
```
Chú ý ở gần đầu file chúng ta có thực hiện "importing" vào facade Cache. Facade này đóng vai trò như một proxy để truy cập vào phần triển khai phía dưới của interface  Illuminate\Contracts\Cache\Factory. Bất cứ việc gọi nào mà chúng ta sử dụng từ facade sẽ được đẩy tới instance phía dưới của Laravel cache service.

Nếu chúng ta nhìn vào class Illuminate\Support\Facades\Cache bạn sẽ thấy không hề có phương thức tĩnh get:

```
class Cache extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return  string
     */
    protected static function getFacadeAccessor() { return 'cache'; }
}
```
Thay vào đó, facade Cache mở rộng class base Facade à định nghĩa phương thức  getFacadeAccessor(). Nhớ là nhiệm vụ của phương thức này là trả về tên của liên kết trong service container. Khi mà người dùng tham chiếu tới bất kì phương thức tĩnh nào trong facade Cache, Laravel thực hiện việc resolve cache binding từ service container và thực thi phương thức được gọi (trong trường hợp này get) đối với object.
nguồn https://laravel.com/docs/5.6/facades