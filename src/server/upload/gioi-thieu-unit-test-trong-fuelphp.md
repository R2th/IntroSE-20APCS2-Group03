### Mở đầu

Unit test cũng có thể  nói rất có ích trong các dự án, vì điều quan trọng xuyên suốt dự án là phải thường xuyên kiểm tra xem API có trả về đúng dữ liệu hay không. Bài này sẽ giới thiệu về unit test được thực hiện trong FuelPHP như thế nào.

Nếu chưa quen với unit test, bạn có thể bắt đầu bằng cách đọc tài liệu FuelPHP về  Unit test tại http://fuelphp.com/docs/general/unit_testing.html.\
\
Bạn có thể  truy cập tài liệu tại trang web FuelPHP bằng cách điều hướng đến DOCS | FuelPHP | General | Unit Testing.
Để biết thêm thông tin chung, bạn có thể xem trang web Wikipedia để biết thêm thông tin tham khảo: (http://en.wikipedia.org/wiki/Unit_testing).

Để làm cho mọi thứ đơn giản, unit test cho phép bạn kiểm tra theo unit riêng lẻ trong code (phương thức hoặc class) để kiểm tra xem chúng có hoạt động như ý muốn hay không. Hầu hết, unit test được thực hiện thường xuyên và xuyên suốt trong quá trình xây dựng method hoặc class. Thậm chí có thể viết trước khi viết các function, nó được sử dụng như một loại sắp xếp đặc tả đơn vị. Trong quá trình phát triển, các nhà phát triển đầu tiên xác định cách một phương thức nên làm việc như thế nào dựa theo unit test, sau đó thực hiện phương pháp và kiểm tra xem nó có vượt qua được các test đó không.\
\
Các unit test không nên được tách khỏi các unit test tích hợp, trường hợp đó chúng ta nên chia theo các nhóm hoạt động cùng nhau, các test này kiểm tra xem các method có tuân thủ đúng chức năng của chúng hay không và test các tính năng cuối cùng mà người dùng truy cập như mong đợi.

### Nguyên tắc tối thiểu
Khi viết unit test, bạn nên cố gắng là phải tuân thủ các nguyên tắc tối thiểu sau:

* Mỗi unit test chỉ nên test a single code unit (thường là các phương thức hoặc các class) tại một thời điểm.
* Cố gắng viết càng ít assertions càng tốt để kiểm tra các tính năng, vì các assertions không cần thiết dẫn đến ít khả năng maintain hơn.
* Các test phải độc lập với nhau. Ví dụ, bạn không nên viết một unit test mà một unit test khác đã được chạy trước đó.
* Mỗi mục đích unit test phải rõ ràng: tên của nó phải rõ ràng và code nên dễ hiểu (đừng ngại sử dụng comment).

### Start

Đầu tiên, bạn cần cài đặt PHPUnit. 
Để thực hiện điều đó, bạn cần chạy:
```php
php composer.phar require phpunit/phpunit:4.4.*
```

Trong khi PHPUnit được tải xuống và cài đặt, hãy tạo tệp cấu hình ```APPPATH/config/oil.php``` và thay nội dung của nó thành:
```php
<?php
return array(
  'phpunit' => array(
      'autoload_path' =>
            VENDORPATH.'phpunit/phpunit/PHPUnit/Autoload.php',
      'binary_path' => VENDORPATH.'bin/phpunit',
  ),
);
```
### Test all
Khi PHPUnit đã cài đặt xong, bạn có thể  test rồi. Cần thực thi dòng lệnh sau:
```php
php oil test
```
Output sẽ in ra:
```php
Tests Running...This may take a few moments.
...
Time: 512 ms, Memory: 20.25Mb
OK (375 tests, 447 assertions)
```
Như bạn thấy, 375 tests tồn tại và lệnh ```php oil test``` thực thi tất cả chúng. Các thử nghiệm này đều nằm trong core FuelPHP và có thể tìm thấy trong thư mục ```fuel/core/tests directory```.

Chúng ta sẽ tạo ra các test của riêng mình. Tạo tệp ```APPPATH/tests/examples.php``` và thêm:
```php
<?php
namespace Fuel\App;

/**
 * Examples tests 
 *
 * @group App
 */
class Test_Examples extends \TestCase
{
    // This method is executed before all tests are executed.
    // If your unit test require some initialization, you can
    // do it here.
    public static function setUpBeforeClass() {
        \Config::load('mymicroblog', true);

        // Executing migrations (we are on a test database)
        \Migrate::latest('auth', 'package');
        \Migrate::latest();

        // Truncating the tables since we might already have data
        \DBUtil::truncate_table('users');
        \DBUtil::truncate_table('posts');

        // Generating test data
        \Auth::create_user(
            'first_user',
            'test',
            'email@email.com'
        );
        for ($i = 1; $i < 100; $i++) {
            $post = \Model_Post::forge(array(
                'content' => 'post 1',
                'user_id' => 1
            ));
            $post->save();
        }

        // ...
    }

    /**
   * Tests the User mapper.
   *
   * @test
   */
    public function test_extract_properties() {
        $object = new \stdClass();
        $object->a = '1';
        $object->b = 2;
        $object->c = true;

        $res = \Mapper::extract_properties(
            $object,
            array('a', 'c')
        );

        $expected_res = array('a' => '1', 'c' => true);

        $this->assertEquals($res, $expected_res);

        // A lot more should be tested...
    }
  
  /**
   * Tests the User mapper.
   *
   * @test
   */
  public function test_user_mapper() {
        // Getting any user.
        // Note: In order not to depend on the database and on
        // the ORM, you might want to create mock users objects
        // (simulated users objects) and test features on these
        // objects instead...
        $user = \Model_User::find('first');

        // Testing that the profile context returns 4
        // attributes
        $profile = \Mapper_User::get('profile', $user);
        $this->assertCount(4, $profile);

        // Testing that the minimal context returns 1 attribute
        $minimal = \Mapper_User::get('minimal', $user);
        $this->assertCount(1, $minimal);

        // A lot more should be tested...
  }
  
  // This method is executed after all tests have been
  // executed
  static function tearDownAfterClass() {} 
}
```
Tất cả các phương thức bắt đầu bằng phép thử sẽ được thực hiện khi chạy file test này. Đọc các chú thích trong đoạn mã trên và đọc tài liệu chính thức của PHPUnit để biết thêm thông tin (https://phpunit.de).\
\
Khi bạn đang chạy file test, FuelPHP nằm trong môi trường thử nghiệm. Vì vậy, bạn phải cấu hình truy cập cơ sở dữ liệu trong tệp ```APPPATH/config/test/db.php```. Bạn nên tạo một cơ sở dữ liệu riêng biệt cho các bài kiểm tra đơn vị.

### Test Group
```php
php oil test --group=App
```
Nó sẽ cho ra màn hình:
```
Tests Running...This may take a few moments.
..
Time: 22 ms, Memory: 18.50Mb
OK (2 tests, 3 assertions)
```
\
\
Các mục test đã được thực hiện đúng. Tuy nhiên, như đã giải thích ở phần đầu của bài này, chúng tôi đã viết test còn đơn giản. Tùy thuộc vào yêu cầu trong ứng dụng của bạn, nên viết chi tiết hơn nữa để project được hoàn hảo hơn.
(continue)

Source: Book Learning FuelPHP for Effective PHP Development
(https://www.safaribooksonline.com/library/view/learning-fuelphp-for/9781782160366/cover.html)