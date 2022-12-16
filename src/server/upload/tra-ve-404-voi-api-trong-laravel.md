Một tính năng hữu dụng được đề xuất trong Laravel 5.5 mà ít ai để ý đó là fallback routing (nôm na là định tuyến dự phòng). Bạn có thể tím hiểu về fallback routing tại bài viết [Better 404 responses using Laravel +5.5](https://themsaid.com/laravel-55-better-404-response-20170921) của tác giả Mohamed Said để hiểu về nó một cách tổng quát nhất cũng như những tiện ích thiết thực mà nó mang lại.

Khi bạn tạo ra một API, bạn có thể muốn một route 404 đáp ứng với JSON (hoặc bất kỳ định dạng nào bạn muốn route trả về) thay vì phản hồi JSON 404 mặc định.

Đây sẽ là nội dung của Json bạn nhận được nếu route của bạn không định nghĩa trước:
```
curl \
-H"Content-Type:application/json" \
-H"Accept: application/json" \
-i http://apidemo.test/not/found

HTTP/1.1 404 Not Found
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
Cache-Control: no-cache, private
Date: Thu, 16 Aug 2018 06:00:42 GMT

{
    "message": ""
}
```

Như bạn thấy đó, chúng ta nhận về một message rỗng, và trông nó thật thừa thãi phải không nào. Và giờ chúng ta cùng xem xét một số tình huống qua đó bạn có thể đảm bảo rằng API của bạn sẽ phản hồi lại một fallback 404 cùng với message cụ thể khi mà route gọi đến API không khớp nhé.

## Thiết lập
Sử dụng laravel CLI, bạn sẽ tạo ra một project mới, qua đó tạo một response 404 cho API của bạn:
```
laravel new apidemo
cd apidemo/

# Valet users...
valet link
```
Chúng ta cùng cấu hình một database MySQL cho project nhé:
```
mysql -u root -e'create database apidemo'
```
Cập nhật một số thông tin trong file .env nào:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=apidemo
DB_USERNAME=root
DB_PASSWORD=
```
Chúng ta thao tác với bảng người dùng để làm một số ví dụ. Giờ chúng ta tạo seeder cho bảng user nhé:
```
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory('App\User', 10)->create();
    }
}
```
Cuối cùng chúng ta chạy migration và seeder nhỉ:
```
php artisan migrate:fresh --seed
```
## API Routes
Chúng ta sẽ cùng tạo ra một vài API routes, bao gồm cả một fallbackroute cho API của chúng ta: 
```
php artisan make:test Api/FallbackRouteTest
```
Thêm một test case để trả về phản hồi 404:
```
<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FallbackRouteTest extends TestCase
{
    /** @test */
    public function missing_api_routes_should_return_a_json_404()
    {
        $this->withoutExceptionHandling();
        $response = $this->get('/api/missing/route');

        $response->assertStatus(404);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertJson([
            'message' => 'Not Found.'
        ]);
    }
}
```
Nếu bạn chạy test suite vào thời điểm này thì sẽ không thành công vì bạn chưa xác định được fallback route tỏng trường hợp này:
```
phpunit --filter=ApiFallbackRouteTest
...
There was 1 error:

1) Tests\Feature\ApiFallbackRouteTest::missing_api_routes_should_return_a_json_404
Symfony\Component\HttpKernel\Exception\NotFoundHttpException: GET http://localhost/api/missing/route
```

Giờ chúng ta phải định nghĩa một fallback route ở cuối file `routes/api.php` như sau:
```
Route::fallback(function(){
    return response()->json(['message' => 'Not Found.'], 404);
})->name('api.fallback.404');
```
Vậy là chúng ta đã vừa tạo ra một fallback route cho respond của chúng ta với định dạng JSON, kèm theo trả về một message.

## Người dùng hợp lệ
Để minh họa thêm cách sử dụng fallback route, chúng ta sẽ xác định một route hợp lệ cho model User như sau:

```
Route::get('/users/{user}', 'UsersController@show')
    ->name('api.users.show');
```
Tiếp theo chúng ta sẽ tạo một controllercho User:
```
php artisan make:controller UsersController
php artisan make:resource User
```

Chúng ta dựa vào các ràng buộc của model binding và controller User để trả về response với didnhgj dạng Json:
```
<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function show(User $user)
    {
        return new UserResource($user);
    }
}
```

Tiếp theo chúng ta sẽ tạo ra một ví dụ để xác minh User endpoint và nhận về một response 404 khi mà yêu cầu của user đó là không hợp lệ:

```
php artisan make:test Api/ViewUserTes
```
Chúng ta cùng thử một ví dụ kích hoạt ModelNotFoundException:
```
<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewUserTest extends TestCase
{
    /** @test */
    public function requesting_an_invalid_user_triggers_model_not_found_exception()
    {
        $this->withoutExceptionHandling();
        try {
            $this->json('GET', '/api/users/123');
        } catch (ModelNotFoundException $exception) {
            $this->assertEquals('No query results for model [App\User].', $exception->getMessage());
            return;
        }

        $this->fail('ModelNotFoundException should be triggered.');
    }
}
```

Một ví dụ hơi dư thừa nhỉ, chúng ta sẽ không vô hiệu hóa xử lý ngoại lệ và đảm abro rằng chúng ta đang nhận lại 404 và thông báo lỗi "không có kết quả truy vấn" nào từ API:
```
/** @test */
    public function requesting_an_invalid_user_returns_no_query_results_error()
    {
        $response = $this->json('GET', '/api/users/123');
        $response->assertStatus(404);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertJson([
            'message' => 'No query results for model [App\User].'
        ]);
    }
```

Tại thời điểm này, cả hai test case đều phải passing- chúng ta không nhất thiết phải sử dụng TDD để loại bỏ route model binding.
Tiếp theo chúng ta viết một trường hợp test sai để trả về một fallback route:
```
/** @test */
public function invalid_user_uri_triggers_fallback_route()
{
    $response = $this->json('GET', '/api/users/invalid-user-id');
    $response->assertStatus(404);
    $response->assertHeader('Content-Type', 'application/json');
    $response->assertJson([
        'message' => 'Not Found.'
    ]);
}
```
Khi bạn chạy sẽ nhận được lỗi như sau:
```
Failed asserting that an array has the subset Array &0 (
    'message' => 'Not Found.'
).
--- Expected
+++ Actual
@@ @@
 Array
 (
-    [message] => Not Found.
+    [message] => No query results for model [App\User].
```
Chúng ta có thể thực hiện kiểm tra bằng cashc hạn chế tham số:
```
Route::get('/users/{user}', 'UsersController@show')
    ->name('api.users.show')
    ->where('user', '[0-9]+');
```
Và giờ thì ok rồi đấy:
```
phpunit --filter=invalid_user_uri_triggers_fallback_route
...
OK (1 test, 4 assertions)
```
Bạn nên thêm điều kiện vào các tham số của route để route sẽ chỉ khớp với những param hợp lệ. Nếu sử dụng fallback route không cần thiết, thì response vẫn trả về lỗi 404, tuy nhiên lúc này có một số database có thể kích hoạt lỗi truy vấn bảng khi có giá trị không hợp lệ.

```
use RefreshDatabase;

/** @test */
public function guests_can_view_a_valid_user()
{
    $user = factory('App\User')->create([
        'name' => 'LeBron James',
        'email' => 'lebron@lakers.com',
    ]);

    $response = $this->json('GET', "/api/users/{$user->id}");
    $response->assertOk();
    $response->assertJson([
        'data' => [
            'name' => 'LeBron James',
            'email' => 'lebron@lakers.com',
        ]
    ]);
}
```
## Tùy chỉnh phản hồi ModelNotFoundException
Nếu bạn quan tâm tới việc dùng fallback route trowng trường hợp response trả về chứa ModelNotFoundException, bạn có thể cập nhật trình xử lý ngoại lệ như sau:
```
# app/Exceptions/Handler.php
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Route;

public function render($request, Exception $exception)
{
    if ($exception instanceof ModelNotFoundException && $request->isJson()) {
        return Route::respondWithRoute('api.fallback.404');
    }

    return parent::render($request, $exception);
}
```