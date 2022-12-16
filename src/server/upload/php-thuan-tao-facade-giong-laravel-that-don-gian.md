Đối với những ai đã từng sử dụng framework laravel, ắt hẳn các bạn đã biết tới Facades.
Mặc dù có nhiều ý kiến cho rằng nó là một `Anti-pattern`.
> Facades đóng vai trò là "proxy tĩnh" đối với các lớp cơ bản trong vùng chứa dịch vụ, mang lại lợi ích của cú pháp ngắn gọn, biểu cảm trong khi vẫn duy trì khả năng kiểm tra và tính linh hoạt hơn các phương thức tĩnh truyền thống. 

Tuy nhiên, không phải lúc nào các dự án của chúng ta đều được phép sử dụng framework.
Vì khi sử dụng framework, một khi có lỗi xảy ra thì chúng ta rất khó để control.
Trong bài viết này, mình xin chia sẻ cách tạo một Facades giống laravel trong PHP thuần.
# Đặt vấn đề
Giả sử các bạn có một class như sau:

```php
<?php

namespace Core\Http;

class Response
{
    /**
     * response json.
     *
     * @param  mixed  $content
     * @param  int    $options
     * @return string
     */
    public function json($content, int $options = 0)
    {
        header('Content-type: application/json');
        echo json_encode($content,  $options);
    }
}
```
Khi đó nếu bạn muốn gọi hàm json, bạn phải khởi tạo instance của class Response, sau đó mới gọi đến hàm json
```php
$instance = new Response;
$instance->json(['message' => 'success']);
```
Thật rắc rối. Với Facade, chúng ta chỉ làm đơn giản như sau:
```php
Response::json(['message' => 'success']);
```
Let's go :))
# Khởi tạo abstract class Facade

```php
<?php

namespace Support\Facades;

use RuntimeException;

abstract class Facade
{
    //
}
```

Đặc điểm của abstract là các bạn chỉ có thể extends mà không thể tạo instance của nó. 
Abstract class này sẽ là khuôn mẫu cho các Facade mà chúng ta sẽ khởi tạo sau này.

# Khởi tạo hàm getFacadeAccessor

```php
/**
 * Get the registered name of the component.
 *
 * @return string
 *
 * @throws \RuntimeException
 */
protected static function getFacadeAccessor()
{
    throw new RuntimeException('Facade does not implement getFacadeAccessor method.');
}
```
Nếu bạn không khai báo hàm getFacadeAccessor ở class con, khi hàm getFacadeAccessor được gọi, một RuntimeException sẽ được bắn ra.
Điều đó có nghĩa là hàm getFacadeAccessor là bắt buộc ở class con. 
Class con sẽ phải khai báo và trả về một string là class name cần khởi tạo.
# Xử lý các lệnh gọi tĩnh(static) đến đối tượng
Khi bạn gọi đến một phương thức static không có trong facade, magic method `__callStatic`  sẽ được gọi.
Chúng ta sẽ thực hiện khởi tạo instance và gọi tới hàm cần thiết.
```php
    /**
     * Handle dynamic, static calls to the object.
     *
     * @param  string  $method
     * @param  array  $arguments
     * @return mixed
     *
     * @throws \RuntimeException
     */
    public static function __callStatic($method, $arguments)
    {
        $instance = static::resolvedInstance(static::getFacadeAccessor());

        if (! $instance) {
            throw new RuntimeException('A facade root has not been set.');
        }

        return $instance->$method(...$arguments);
    }
```

Hàm resolvedInstance có nhiệm vụ kiểm tra instance đã được tạo trước đó hay chưa.
Nếu chưa thì thực hiện khởi tạo, lưu vào static property $resolvedInstance và return instance.
```php

    /**
     * The resolved object instances.
     *
     * @var array
     */
    protected static $resolvedInstance;

    /**
     * Resolve the facade root instance.
     *
     * @param  string  $name
     * @return mixed
     */
    protected static function resolvedInstance(string $accessor)
    {
        if (isset(static::$resolvedInstance[$accessor])) {
            return static::$resolvedInstance[$accessor];
        }

        return static::$resolvedInstance[$accessor] = new $accessor;
    }
```
# Tạo Response Facade
Response Facade sẽ extend từ abstract class Facade chúng ta đã khởi tạo ở trên
```php
<?php

namespace Support\Facades;

use Support\Facades\Facade;

class Response extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return \Core\Http\Response::class;
    }
}
```
Hàm getFacadeAccessor sẽ return class name của Core\Http\Response cho phép facades khởi tạo instance từ nó.

# Sử dụng
Bây giờ chỉ cần gọi  Support\Facades\Response thay vì Core\Http\Response;
```php
<?php

use Support\Facades\Response;

Response::json(['message' => 'success']);
```
Thật là đơn giản phải không :)).

Các bạn có thể xem file full [tại đây ](https://github.com/nguyenthemanh2601/pure_php/tree/master/core/Support/Facades)

Nếu thấy hay các bạn cho mình xin một vote một star nhe.

Thank for watching <3