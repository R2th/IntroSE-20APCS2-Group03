Bài viết dành cho những ai đã sử dụng PHPUnit để thực hiện Unit Testing, lí do thì xin mời đọc **mục 1 - Pest là đứa nào?** 🤪🤪
### 1. Pest là đứa nào?
Pest là một PHP Testing Framework được cung cấp bởi PHPUnit. Vì vậy mn hãy học code thuần với PHPUnit trước khi quyết định đọc tiếp nhé, đừng sống vội 😗😗
<br>
Pest có thể sử dụng với bất kì PHP Framework nào, ở bài viết này mình chỉ đề cập tới Laravel thôi nhé
<br>
Bạn có thể đọc documents gốc bằng tiếng Anh của Pest tại [pestphp.com](https://pestphp.com) nhé
### 2. Yêu cầu và cài đặt
* Pest yêu cầu PHP Version 7.3 trở lên
* Với Laravel, bạn cài đặt thông qua Composer:
```bash
cd [project_path]
```
```bash
composer require pestphp/pest --dev --with-all-dependencies
composer require pestphp/pest-plugin-laravel --dev
```
* Run tests:
```bash
./vendor/bin/pest
```
### 3. Cấu trúc thư mục test trong Laravel
Mình chỉ quan tâm tới files, folders sau đây thôi nhé:
```
tests
    - Unit
    - Feature
    - Pest.php
phpunit.xml
```
* Folder Unit: Chứa các file phục vụ Unit Testing
* File Pest.php: Đây là file đặc biệt của Pest. File này sẽ không tự sinh ra vì nó là optional, nhưng tôi khuyên bạn nên thêm file này theo cấu trúc trên để tận dụng được những chức năng thú vị của Pest. File này sẽ được tự động autoload nếu bạn sử dụng nó
* File phpunit.xml: Pest chỉ chạy các test files có tên kết thúc bằng suffix được cài đặt trong file phpunit.xml
Ví dụ file phpunit.xml cấu hình:
```xml
<testsuite name="Unit">
    <directory suffix="Test.php">./tests/Unit</directory>
</testsuite>
```
Nếu test file có tên là DemoTest.php thì thoả mãn, test file có tên là TestDemo.php thì không thoả mãn
### 4. Assertions
```php
<?php
it('asserts true is true', function () {
    $this->assertTrue(true);
});
// description trả về sẽ là "it asserts true is true"
 
// or

test('asserts true is true', function () {
    $this->assertTrue(true);
});
// description trả về được giữ nguyên là "asserts true is true"
```
* Bạn có thể sử dụng function **test()** hoặc **it()** để viết các test case nhé, tôi sẽ dùng **it()** cho nó khác bọt nhé 🥶🥶
* Pest sử dụng toàn bộ [Assertions của PHPUnit](https://phpunit.readthedocs.io/en/9.5/assertions.html) (tiết kiệm được chút thời gian học thêm rồi nhé 😬😬)
### 5. Expectations
* Nếu bộ Assertions không đủ nhu cầu sử dụng thì bạn yên tâm, Expectations sẽ lo cho bạn (không có người yêu thì ta nuôi chó đúng không ạ 🐶🐶)
```php
<?php
it('expect true to be true', function () {
  // thay vì dùng assertion
  $this->assertTrue(true);
 
  // ta có thể dùng expectation
  expect(true)->toBe(true);
});
```
* Pest cung cấp cho chúng ta rất nhiều Expectations:
<br>
Mấy cái **toBe** dưới đây thì bạn có thể đọc tại [toBe documents của Pest](https://pestphp.com/docs/expectations#available-expectations) nhé
```php
toBe()
toBeArray()
toBeEmpty()
toBeTrue()
toBeTruthy()
toBeFalse()
toBeFalsy()
toBeGreaterThan()
toBeGreaterThanOrEqual()
toBeLessThan()
// ...còn nhiều lắm, vào docs đọc đi :DD
```
* Ngoài ra để hỗ trợ thêm các Expectations, Pest cung cấp thêm [các phương thức](https://pestphp.com/docs/expectations#expect-and) sau:
```php
and($value)               // nối thêm expectation
dd()                      // dump and die expectation hiện tại, phục vụ debug
each()                    // duyệt các phần tử của biến được truyền vào hàm expect()
json()                    // convert biến chuyền vào hàm expect() thành json
match($key, $array)       // trả về value trong array mà có key bằng với $key được truyền vào, $array có thể có cặp (key, value) với value là 1 callback
not()                     // kết hợp với toBe để phủ định cho toBe
ray()                     // debug giá trị expectation hiện tại với myray.app (cái này tôi không biết :DD)
sequence()                // mỗi item trong sequence sẽ là 1 expectation ứng với mỗi phần tử trong biến được truyền vào expect()
when($param, $callback)   // thực hiện $callback nếu $param là true
unless($param, $callback) // thực hiện $callback nếu $param là false
```
* **Custom expections**
<br>
Bạn có thể tạo ra các expectations của riêng mình bằng cách sử dụng **expect()->extend()** ở test file hiện tại của bạn để truy cập nội bộ, hoặc ở file **Pest.php** để có thể truy cập ở toàn bộ các test files
```php
<?php
expect()->extend('toBeWithinRange', function ($min, $max) {
    return $this->toBeGreaterThanOrEqual($min)
                ->toBeLessThanOrEqual($max);
});
 
it('numeric ranges', function () {
    expect(100)->toBeWithinRange(90, 110);
});
```
### 6. Setup and Teardown
Dùng để chạy một số đoạn code trước và sau mỗi test hoặc test file, ví dụ như khởi tạo và huỷ bỏ các đối tượng,...
* **beforeEach()**: tương tự như **setUp()** trong PHPUnit
<br>
beforeEach() chạy trước mỗi test của file hiện tại
```php
<?php
beforeEach(function () {
    echo '1';
});
it('foo', function () {
    echo '2';
});
it('bar', function () {
    echo '3';
});
// kết quả: 1 -> 2 -> 1 -> 3
```
* **afterEach()**: tương tự **tearDown()** trong PHPUnit
<br>
afterEach() chạy sau mỗi test của file hiện tại
```php
<?php
afterEach(function () {
    echo '1';
});
it('foo', function () {
    echo '2';
});
it('bar', function () {
    echo '3';
});
// kết quả: 2 -> 1 -> 3 -> 1
```
* **beforeAll()**: tương tự **beforeClass annotation** của PHPUnit
<br>
beforeAll() chạy 1 lần trước tất cả các test của file hiện tại
```php
<?php
beforeAll(function () {
    echo '1';
});
it('foo', function () {
    echo '2';
});
it('bar', function () {
    echo '3';
});
// kết quả: 1 -> 2 -> 3
```
* **afterAll()**: tương tự **afterClass annotation** của PHPUnit
<br>
afterAll() chạy 1 lần sau tất cả các test của file hiện tại
```php
<?php
beforeAll(function () {
    echo '1';
});
it('foo', function () {
    echo '2';
});
it('bar', function () {
    echo '3';
});
// kết quả: 2 -> 3 -> 1
```
* **Tái sử dụng Setup and Teardown**
```php
<?php
// tests/Pest.php
uses()
    ->beforeAll(fn () => dump(1))
    ->beforeEach(fn () => dump(2))
    ->afterEach(fn () => dump(3))
    ->afterAll(fn () => dump(4))
    ->in('Unit');
```
```php
<?php
// tests/Unit/DemoTest.php
test('order', fn () => dump('foo'));
// kết quả: 1 -> 2 -> foo -> 3 -> 4
```
### 7. Datasets
Tuơng tự **Data Providers** trong PHPUnit
* **Inline Datasets**: Sử dụng trong 1 test duy nhất
```php
<?php
it('has emails', function ($name, $email) {
    expect($email)->not->toBeEmpty();
})->with([
    ['Nuno', 'enunomaduro@gmail.com'],
    ['Other', 'other@example.com']
]);
```
* **Shared Datasets**: Tạo dataset bằng hàm **dataset()** để tái sử dụng
```
tests
    - Unit/DemoTest.php
    - Datasets/Emails.php <--
phpunit.xml
```
```php
<?php
// tests/Datasets/Emails.php
dataset('emails', [
    'enunomaduro@gmail.com',
    'other@example.com'
]);
```
```php
<?php
it('has emails', function ($item) {
    expect($item)->not->toBeEmpty();
})->with('emails');
```
* **Lazy Datasets**: sử dụng với dữ liệu lớn nhưng ít bộ nhớ hơn (Pest xử lý bộ nhớ thế nào thì tôi ko rõ, thôi thì cứ dùng thôi 🙄🙄)
```php
<?php
dataset('emails', function () {
    yield 'enunomaduro@gmail.com';
    yield 'other@example.com';
});
 
it('has emails', function ($item) {
    expect($item)->not->toBeEmpty();
})->with(emails);
```
* **Combining datasets**:
<br>
Kết hợp các bộ dữ liệu theo nguyên tắc: 
<br>
A = {1,2}; B = {3,4}
<br>
A × B = {1,2} × {3,4} = {(1,3), (1,4), (2,3), (2,4)}
```php
<?php
dataset('days_of_the_week', [
    'Monday',
    'Tuesday',
    // ...
]);
it('business hours', function($business, $day) {
    expect($business)->isOpen($day)->toBeTrue();
})->with([
    Bar::class,
    Restaurant::class,
])->with('days_of_the_week');
```
### 8. Mock Plugin
* Yêu cầu PHP Version 8 trở lên
* Sử dụng để làm giả các object hoặc function để phục vụ cho unit testing. Core của Mock Plugin là Mockery, vì vậy bạn có thể tìm hiểu thêm các method tại [Mockery Docs](http://docs.mockery.io/en/latest/)
```php
<?php
it('some service', function () {
    $mock = mock(UserRepository::class)->expect(
        create: fn ($name) => false,
        save: fn ($name) => true,
    );
 
    expect($mock->create('Nuno'))->toBeFalse();
    expect($mock->save('Nuno'))->toBeTrue();
});
```
```php
<?php
it('some service', function () {
    $mock = mock(UserRepository::class)
        ->shouldReceive('save')
        ->andReturn(true)
        ->getMock();
 
    expect($mock->save('Nuno'))->toBeTrue();
});
```
### 9. Tổng kết
Quá đủ rồi, quá mệt rồi, quá muộn rồi @@ Mình xin tạm dừng bài viết tại đây, nếu có ý kiến đóng góp hay câu hỏi gì, hãy để lại comments cho mình nhé. Mình tuy kém nhưng được cái nhiệt mình trả lời lắm. See ya 🤗🤗