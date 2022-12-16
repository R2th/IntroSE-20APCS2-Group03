![](https://images.viblo.asia/3e90b3d8-f62a-49cf-a5c0-ae4ae1d0b075.png)
![](https://images.viblo.asia/0125c6d4-3337-47e7-a6d9-187e95aa54eb.png)

### I. Đặt vấn đề
**1. Test code coverage là gì ?**

- Trong lĩnh vực kiểm thử thì test code coverage:  Là việc tạo các trường hợp test để thỏa mãn một số điều kiện bao phủ code - code coverage (ví dụ như, người thiết kế test có thể tạo ra các trường hợp test sao cho tất cả các câu lệnh của chương trình đều được thực thi ít nhất 1 lần).

- Code coverage là độ phủ của các dòng code đã được chạy qua các test case mà chúng ta đã viết. Điều này có nghĩa là nếu ta xác định mục tiêu của Unit sai, chia các case sai thì bug vẫn tồn tại. Bug ở đây thường là các bug về logic, bug giữa các unit khác nhau.

- Tuy nhiên code coverage chỉ đảm bảo các câu lệnh rẽ nhánh đã chaỵ qua hay không? Bạn có thể phát hiện code của mình viết thừa logic trong code qua những câu lệnh rẽ nhánh không bao giờ code chạy qua. Ý nghĩa của code coverage là đảm bảo các dòng code đã được chạy qua bởi các test case

**2. Test code coverage được tính trên những thành phần nào ?** 

- Code coverage là tính độ bao phủ trung bình mà code đã chạy qua:
    -  **lines** (dòng code), 
    -  **functions & methods** (các hàm và các phương thức),
    -  **classes & traits**

**3. Tại sao phải viết test code coverage cho dự án ?**

- Đảm bảo code được viết ra là code **sạch**, được viết theo một logic đúng và hợp lý.
- Đảm bảo ít **bugs** nhất xảy ra với những gì chúng ta code ra.
- Đảm bảo chúng ta đang code đúng specs, yêu cầu mà khách hàng đưa ra.
- Sản phẩm đưa đến tester, QA là một sản phẩm hoàn thiện ít **bugs** đẩy nhanh quá trình ``release`` dự án.
### II. Nội dung chính

Việc viết test nên được viết song song trong quá trình chúng ta code sản phẩm. Việc này giúp chúng ta định hình được base chuẩn cho code và cách viết code đúng. Trong laravel chúng ta cần viết code theo những phần sau:

**1. Console Tests:**

Console tests là việc test các command mà ta tạo ra xem nó có chạy không. Trong thực tế thì người ta ít khi sử dụng ```console tests``` để tính code coverage.
```php
/**
 * Test a console command.
 *
 * @return void
 */
public function testConsoleCommand()
{
    $this->artisan('question')
         ->expectsQuestion('What is your name?', 'Taylor Otwell')
         ->expectsQuestion('Which language do you program in?', 'PHP')
         ->expectsOutput('Your name is Taylor Otwell and you program in PHP.')
         ->assertExitCode(0);
}
```

**2. Feature Tests**

Thực chất trong laravel đã định danh cho ``feature test`` là [HTTP Tests](https://laravel.com/docs/6.x/http-tests). Một ví dụ đơn giản của ```feature tests```.
```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
```
Có ví dụ đơn giản như sau: Mình có 1 api tạo một post mới vào hệ thống.
```php
public function test_it_can_store_post()
{
    $url = '/api/posts';
    $this->postJson($url)
        ->assertStatus(422)
        ->assertJsonStructure([
            'errors' => [
                '*' => [],
            ],
        ]);
    $input = [
        'title' => 'This is test',
        'description' => 'example',
    ];
    $this->postJson($url, $input)
        ->assertStatus(200)
        ->assertJson([
            'status' => 'success',
        ]);
 }
```
Feature tests trên là việc test api để kiểm tra một số điều như sau:
- Check xem api đã pass validate input đầu vào hay chưa.

```php
    $this->postJson($url)
        ->assertStatus(422)
        ->assertJsonStructure([
            'errors' => [
                '*' => [],
            ],
        ]);
```
- Check xem api đã chạy qua hết code chưa.
```php
$this->postJson($url, $input)
    ->assertStatus(200)
    ->assertJson([
        'status' => 'success',
    ]);
```

**3. Integration Tests:**

Trong laravel nó được định nghĩa là: [Database Testing](https://laravel.com/docs/6.x/database-testing). Là việc kiểm tra code của chúng ta đã chạy xong và dự liệu đã được lưu trong database hay chưa. ```Integration Tests``` đôi lúc cũng được viết chúng trong ```Feature Tests```
```php
    $this->assertDatabaseHas('posts', [
        'title' => 'This is test',
        'description' => 'example',
    ]);
```

**4. Unit Test:**

Unit tests là việc sử dụng ```mock``` để gọi đến các classes, functions để tạo các [Mocking](https://laravel.com/docs/6.x/mocking) và test xem code coverage như thế nào.
```php
use App\Service;

$this->mock(Service::class, function ($mock) {
    $mock->shouldReceive('process')->once();
});
```
Sau khi mock thành công vào các classes, functions ta kiểm tra rằng code đã gọi đến hết các hàm, phương thức và đầu ra có đúng không.

### III. Một số lưu ý khi viết test

- Chỉ nên test và cover những phần code có ý nghĩa, trong Laravel thì chúng ta không cần viết test cho các phần base của Laravel ví dụ như: ```Provider```, ```Middleware```, hay 1 số ```command``` (```Console```)...
- Nên chủ động tách code cho hợp lý, chẳng hạn như: trong Controller không nên sử lý logic, ta nên chuyển phần code thao tác đến database vào Repositories, code logic tính toán, xử lý điều kiện vào services, factory, ... Và khi đó chúng ta sẽ test api (```feature tests```), repositories thao tác đến database (```Integration Tests```), những phần xử lý logic services, ...(```Unit Tests```).
- Nên viết test trước khi viết code.
-  Tránh việc cố tình pass tests để kiếm code coverage.
### IV. Tạm kết

Chắc rằng qua bài viết các bạn cũng đã có những lưu ý vể việc viết test code coverage cho dự án rồi đúng không nào. Rất mong được sự góp ý từ các bạn
![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)