# Introduction
Facades cung cấp một interface "static" cho các class sử dụng trong [service container](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2). Laravel mang theo nhiều facades cung cấp truy cập cho hầu hết các tính năng của Laravel. Laravel facades đóng vai trò như "static proxies" cho các class bên dưới ở trong service container, cung cấp lợi ích của việc sử dụng cú pháp ngắn gọn trong khi duy trì khả năng kiểm tra và tính linh hoạt hơn là sử dụng các static method truyền thống.

<br>

Tất cả facades của Laravel được định nghĩa trong ```Illuminate\Support\Facades``` namespace. Vì vậy, bạn có thể dễ dàng truy cập facade như sau:

<br>

```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

Khắp tài liệu của Laravel, rất nhiều ví dụ sử dụng facades để chứng minh sự đa dạng tính năng của framework.

# When To Use Facades

Facades có rất nhiều lợi ích. Nó cung cấp một cú pháp gắn gọn, dễ nhớ cho phép bạn sử dụng các tính năng của Laravel mà không cần nhớ tên dài của class nó phải được inject hoặc cấu hình thủ công. Hơn nữa, do việc sử dụng các dynamic method của PHP một cách độc đáo, chúng dễ dàng để kiểm tra.

<br>

Tuy nhiên, bạn phải cẩn thận khi sử dụng facades. Mối nguy hiểm chính của facades là class scope creep. Vì facades rất dễ sử dụng và không yêu cầu injection, nó có thể dễ dàng làm cho class tiếp tục phình ra (grow) và sử dụng nhiều facades trong một single class. Sử dụng dependency injection, nó làm cho việc phát triển các dòng code trong class càng ngày càng lớn hơn. Vì vậy, khi sử dụng facades, đặc biệt để ý kích thước class của bạn để class ở phạm vi cho phép.

### Facades Vs. Dependency Injection

Một trong những lợi ích chính của dependency injection là khả năng hoán vị implementations của injected class. Nó thật hữu dụng trong quá trình test vì bạn có thể  inject một mock hoặc stub và xác nhận rằng các phương thức khác cũng được gọi trong stub.

<br>

Thông thường, nó không thể mock hoặc stub một static class method. Tuy nhiên, vì facades sử dụng dynamic method để gọi phương thức proxy đến các objects để giải quyết từ service container, chúng ta có thể thật sự test facades cũng như chúng ta test một injected class instance. Ví dụ, cho một route:

```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

Chúng ta có thể viết test sau đây để kiểm chứng rằng method ```Cache::get``` được gọi với tham số chúng ta mong đợi:

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

### Facades Vs. Helper Functions

Ngoài các facades, Laravel còn cung cấp một vài hàm "helper" khác có thể thực hiện các task như sinh ra views, firing events, dispatching jobs, hoặc sending HTTP responses. Rất nhiều hàm helper thực hiện chức năng giống như facade tương ứng. Ví dụ, facade call và helper call là tương đương:

```
return View::make('profile');

return view('profile');
```

Tất nhiên là không có sự khác biệt giữa facades và hàm helper. Khi sử dụng hàm helper, bạn vẫn có thể kiểm tra chúng chính xác như facade tương ứng.Ví dụ, cho một route:

```
Route::get('/cache', function () {
    return cache('key');
});
```

Phương thức ```cache``` helper đang gọi một phương thức ```get``` trong class dưới ```Cache``` facade. Vì vậy, mặc dù chúng ta đang sử dụng hàm helper, chúng ta có thể viết test để kiểm tra phương thức được gọi với tham số  mà chúng ta mong đợi:

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

# How Facades Work
Trong ứng dụng Laravel, một facade là một class cung cấp quyền truy cập vào một object từ container. Các hàm hoạt động trong ```Facade``` class. Laravel Facades và bất kỳ custom facades nào bạn tạo ra, nó sẽ kế thừa từ class base ```Illuminate\Support\Facades\Facade```.

Class base ```Facade``` có thể sử dụng magic method ```__callStatic()``` để  trì hoãn thực thi từ facade của bạn tới object đã được resolve từ container. Trong ví dụ dưới đây, một phương thức được gọi từ Laravel cache system. Nhìn liếc qua code, người ta có thể  giả định rằng phương thức ```get``` static đang được gọi trên class ```Cache```:

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

Lưu ý rằng ở gần đầu file chúng ta có thực hiện "importing" vào facade ```Cache```. Facade này đóng vai trò như một proxy để truy cập vào phần implementation phía dưới của interface  ```Illuminate\Contracts\Cache\Factory```. Bất cứ việc call nào mà chúng ta sử dụng bằng facade sẽ được đẩy tới instance phía dưới của Laravel cache service.

Nếu chúng ta nhìn vào class ```Illuminate\Support\Facades\Cache``` bạn sẽ thấy không hề có static method ```get```:

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

Thay vào đó, facade ```Cache``` extend từ class base ```Facade``` và định nghĩa phương thức  ```getFacadeAccessor()```. Công việc của phương thức này là trả về tên của một service container binding. Khi người dùng tham chiếu tới bất kì static method nào trong facade ```Cache```, Laravel thực hiện việc resolve ```cache``` binding từ [service container](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2) và thực thi phương thức được request (trong trường hợp này, ```get```) đối với object.

# Real-Time Facades
Sử dụng real-time facades, bạn có thể  đối xử  với  bất kỳ class nào trong ứng dụng của bạn như thể nó là một facades. Để minh họa cách sử dụng này, hãy xem xét một phương án thay thế. Ví dụ, giả sử model ```Podcast``` của chúng ta có một method ```publish```. Tuy nhiên, để publish podcast, chúng ta cần phải iinject một ```Publisher``` instance

```
<?php

namespace App;

use App\Contracts\Publisher;
use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    /**
     * Publish the podcast.
     *
     * @param  Publisher  $publisher
     * @return void
     */
    public function publish(Publisher $publisher)
    {
        $this->update(['publishing' => now()]);

        $publisher->publish($this);
    }
}
```

Việc inject một publisher implemention vào method cho phép bạn dễ dàng kiểm tra method này một cách độc lập vì chúng ta có thể mock injected publisher. Tuy nhiên, nó yêu cầu chúng ta luôn chuyển một publisher instance mỗi lần chúng ta gọi phương thức ```publish```. Sử dụng real-time facades, chúng ta có thể duy trì khả năng kiểm tra tương tự trong khi không bắt buộc phải chuyển một cách rõ ràng một ```Publisher``` instance.

<br>

Để tạo real-time facades, hãy đặt tiền tố namespace của lớp đã nhập với ```Facades```:

```
<?php

namespace App;

use Facades\App\Contracts\Publisher;
use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    /**
     * Publish the podcast.
     *
     * @return void
     */
    public function publish()
    {
        $this->update(['publishing' => now()]);

        Publisher::publish($this);
    }
}
```

Khi mà real-time facades được sử dụng, publisher implementation sẽ được resolve ra khỏi service container bằng cách sử dụng interface hoặc class name xuất hiện sau tiền tố ```Facades```. Khi testing, chúng ta có thể sử dụng Laravel built-in facade testing helpers để mock các method được call:

```
<?php

namespace Tests\Feature;

use App\Podcast;
use Tests\TestCase;
use Facades\App\Contracts\Publisher;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PodcastTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A test example.
     *
     * @return void
     */
    public function test_podcast_can_be_published()
    {
        $podcast = factory(Podcast::class)->create();

        Publisher::shouldReceive('publish')->once()->with($podcast);

        $podcast->publish();
    }
}
```

# Facade Class Reference
Dưới đây, bạn có thể tìm thấy mọi facade và class dưới của nó. Đây là một công cụ hữu ích để nhanh chóng đào sâu vào tài liệu API cho một root facade đã cho. [Service container binding](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2) key cũng được include nếu có.

<br>

Cái này được list ra rất chi tiết trong trang docs của Laravel. Các bạn có thể tham khảo ở đây:
https://laravel.com/docs/5.7/facades#facade-class-reference


<br>

**Tài liệu tham khảo:** https://laravel.com/docs/5.7/facades