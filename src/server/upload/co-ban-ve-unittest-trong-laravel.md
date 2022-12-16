## Lời mở đầu
Sau một thời gian làm việc thực tế thì mình thấy rằng các bạn dev mới ra trường trong đó có cả mình đều suy nghĩ đơn giản là làm sao cho code chạy được đúng yêu cầu và chuẩn conventions là xong. Nhưng cuộc sống mà, dự án ngày càng phình to, khách hàng liên tục thay đổi yêu cầu và thêm chức năng. Lúc này, một vài dòng code nhỏ cũng có thể ảnh hưởng lớn tới toàn bộ hệ thống, bugs chồng bugs. Bạn sẽ phải thốt lên giá mà có một công cụ hỗ trợ việc kiểm soát lỗi thì tốt biết bao. Và đây, Laravel đã cung cấp việc Testing này rồi dù bạn có để ý hay không.

Trong Laravel, chúng ta có 2 loại Testing là UnitTest và FeatureTest. Bài viết này mình sẽ tập trung vào những khái niệm và công việc đơn giản nhất mà UnitTest thực hiện.

### 1. UnitTest là gì?
* **UnitTest**: Kiểm thử ở mức đơn vị mã nguồn. Một đơn vị mã nguồn là thành phần nhỏ nhất trong mã nguồn mà chúng ta có thể kiểm tra như. Trong Unit Test ta sẽ kiểm thử các class, method,...Mục tiêu của unit testing là kiểm tra tính đúng đắn trong các xử lý của từng đơn vị mã nguồn.
* Hiểu đơn giản đây là công việc viết code để test code chúng ta viết ra.
* Để thực hiện công việc này chúng ta cần PHPUnit và trong Laravel tích hợp sẵn PHPUnit.

### 2. Cấu trúc thư mục và các file test
Phiên bản Laravel mình đang sử dụng là Laravel 5.7. Các thư mục và file phục vụ việc testing trong laravel được tổ chức như ảnh dưới:
![](https://images.viblo.asia/3b6aa53b-744d-4397-b716-4d7f1f24a0d6.png)

Bạn sẽ thấy bối rối tự hỏi sao có nhiều file đến vậy nhưng chúng ta chỉ cần quan tâm đến những thứ bên trong folder **tests** và file **phpunit.xml** mà thôi.

* **tests**: chứa code cho việc kiểm thử ứng dụng
* **tests/Feature**: chứa code sử dụng cho FeatureTest
* **tests/Unit**: chứa code sử dụng cho UnitTest
* **TestCase**: là 1 bootstrap file để thiết lập môi trường Laravel cho các tests
* **phpunit.xml** là file cấu hình cho PHPUnit

**Lưu ý**: Nội dung bên trong thư mục Feature hay Unit phải có cấu trúc giống thư mục app/ ví dụ app/Http/Controller/UserController.php thì trong thư mục Unit phải là test/Unit/Http/Controller/UserTest.php.\

### 3. Những thành phần cần viết UnitTest
* **Controllers**: với events handling được disable. Toàn bộ các thành phần bên ngoài PHẢI được mock.
* **Requests** (nếu có): Kiểm tra validation
* **Models**: getters, setters, và những chức năng khác
* **Transformers / Presenters** (nếu có): Kiểm tra kết quả output cho những dữ liệu khác nhau
* **Repositories** (nếu có): Kiểm tra từng hàm có tạo ra đúng SQL queries hay không, hay có các lời gọi hàm, đến mocked query builder, đúng hay không
* **Event listeners**
* **Queue jobs**
* **Auth policies**
* Và các Class chuyên biệt khác trong project.

### 4. Chạy thử 1 test đơn giản

Để tạo 1 test, ta sử dụng câu lệnh:
```
// Tạo 1 test trong thư mục Feature
    php artisan make:test UserTest
// Tạo 1 test trong thư mục Unit
    php artisan make:test UserTest --unit
```

Lưu ý về **conventions**:
- Class phải có hậu tố tương ứng với thuộc tính suffix trong file phpunit.xml, mặc định là Test => Nếu không phpunit sẽ bỏ qua k test class này.
- Extends class Tests/TestCase.
- Tên function sử dụng tiền tố là test và nên mô tả rõ công việc của nó. Nếu không muốn sử dụng chữ test thì hãy sử dụng annotation @test trước mỗi function.
- Tên function có thể viết theo camelCase hoặc snake_case.

Cấu hình trong file phpunit.xml:
- Ở đây chúng ta có thể chỉ định test case nào được thực hiện cũng như gom chúng lại theo mong muốn

![](https://images.viblo.asia/7bb5ccab-ad39-49b8-af93-ede126da4823.png)

* thẻ **<testsuites>** : tất cả nhóm cây thư mục được khai báo ở đây
* thẻ **<testsuite>** : Nơi khai báo cho từng group riêng biệt
* thuộc tính name trong thẻ **<testsuite>** dùng để đặt tên cho nhóm
* thẻ **<directiory>**: dùng để khai báo 1 thư mục các test case
* thẻ **<file>**: dùng để khai báo thêm 1 file cho 1 cây thư mục test case 

Run test: ta sử dụng câu lệnh ./vendor/bin/phpunit với các tùy chọn:
```
<!-- Run tất cả tests: -->
./vendor/bin/phpunit

<!-- Run theo testsuite -->
./vendor/bin/phpunit --testsuite Unit

<!-- Run từng file: -->
./vendor/bin/phpunit tests/Unit/ExampleTest.php

<!-- Format output: -->
./vendor/bin/phpunit --testdox

```

### 5. Setup và Teardown
Trường hợp đặt ra là trong class test của chúng ta có rất nhiều biến global và chúng ta phải gán hoặc hủy giá trị này sau mỗi lần chạy test, nếu mỗi testcase đều có những câu lệnh gán và hủy giống nhau thì không ổn. PHPUnit cung cấp các phương thức để giải quyết vấn đề: 
*  **setUp()**: Chạy trước mỗi method test. Sử dụng khi muốn khởi tạo biến, mở kết nối file,... chuẩn bị môi trường để test
*  **tearDown()**: Chạy sau mỗi method test. Sử dụng để hủy các biến, kết nối,...
*  **setUpBeforeClass()**: Chạy khi bắt đầu class test
*  **tearDownAfterClass()**: Chạy sau khi kết thúc class test

![](https://images.viblo.asia/86476cb0-ca1e-4ba6-8f49-bd674758be87.png)

Việc test sẽ lần lượt chạy như sau:
1. Method: OddEvenTest::setUp
2. Method: OddEvenTest::testOdd
3. Method: OddEvenTest::tearDown
4. Method: OddEvenTest::setUp
5. Method: OddEvenTest::testEven
6. Method: OddEvenTest::tearDown

### 6. Assertions 

Hiểu đơn giản Assertion chỉ là 1 câu lênh nhằm mục đích xác nhận một khẳng định là luôn đúng tại đoạn code đó.

Ví dụ: Nếu assert rằng false là true thì test fail
```
function testExample()
{
	$foo = true;
	$this->assertFail($foo);
}
```


Một số assert thường dùng:
* **assertTrue() / assertFalse()**
* **assertTrue() / assertFalse()**
* **assertEquals() / assertNotEquals()** : So sánh bằng
* **assertSame() / assertNotSame()** : So sánh bằng, cùng kiểu
* **assertContains() / assertNotContains()** : Array contain, String contains
* **assertArrayHasKey() / assertArrayNotHasKey()**
* **assertInstanceOf() / assertNotInstanceOf()** : Đối tượng thuộc class
* **assertCount()**
* **expectException()** : Expect sẽ có Exception khi gọi chạy unit

### 7. Reflection 
Một số test case phải truy cập vào private/protected method hoặc property của đối tượng để thực hiện assertion.

Ta bổ sung phần code sau đây vào class test:
```
/**
 * Get private/protected property value
 * $this->assertEquals('views/home', $this->getObjectProperty($view, 'file_name'));
 */
public function getObjectProperty($object, $propertyName) {
    $reflector = new \ReflectionClass($object);
    $property = $reflector->getProperty($propertyName);
    $property->setAccessible(true);

    return $property->getValue($object);
}

/**
 * Call protected/private method of a class.
 * $this->invokeObjectMethod($view, 'getData');
 */
public function invokeObjectMethod($object, $methodName, $parameters = [])
{
    $reflection = new \ReflectionClass($object);
    $method = $reflection->getMethod($methodName);
    $method->setAccessible(true);

    return $method->invokeArgs($object, $parameters);
}
```

### 8. Thế nào là 1 UnitTest đạt yêu cầu:
Một UnitTest thường có 3 thành phần:
1. Arrange: thiết lập trạng thái, khởi tạo Object, giả lập mock
2. Act: Chạy unit đang cần test (method under test)
3. Assert: So sánh expected với kết quả trả về.


## Kết luận

Trên đây mình đã giới thiệu cơ bản về UnitTest trong Laravel. Mình vẫn đang tiếp tục tìm hiểu thì thấy có nhiều kỹ thuật phức tạp sẽ giới thiệu ở những bài sau. Cảm ơn các bạn đã đọc bài và nếu có sai sót thì các bạn hãy góp ý cho mình nhé.



Nguồn tham khảo:
1. https://allaravel.com/laravel-tutorials/unit-testing-phan-1-gioi-thieu-phpunit/
2. https://laravel.com/docs/5.7/testing