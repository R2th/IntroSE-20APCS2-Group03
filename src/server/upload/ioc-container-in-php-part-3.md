Tiếp nối 2 bài viết trước, trong bài viết này, chúng ta sẽ giúp cho IoC Container có khả năng quản lý các **singleton**. Nhưng trước khi tiến hành implement tính năng resolve singleton này. Chúng ta phải nâng cấp container để có khả năng resolve class thay vì chỉ là closure như hiện tại. Cụ thể hơn, chúng ta sẽ nâng cấp container để *bind một interface cho một implementation*.

# 1. Auto Concrete Resolution
Đây chỉ là một bước chuẩn bị, chúng ta sẽ bổ sung thêm feature cho container, là nó sẽ có khả năng tạo ra instance của một class, mà không thông qua quá trình binding, nếu như nó nhận được một concrete class.

## 1.1 Write test first

```php
public function testAutoConcreteResolution()
{
    $container = new Container;
    $this->assertInstanceOf(ContainerConcreteStub::class, $container->make(ContainerConcreteStub::class));
}

class ContainerConcreteStub
{
    //
}
```

Ở đoạn test này, ta muốn kiểm tra khả năng tạo ra instance của `$container` trong trường hợp, nó được yêu cầu `make` cho một concrete class.

## 1.2 Implementation
```php
<?php

namespace Illuminate\Container;

use Illuminate\Contracts\Container\Container as ContainerContract;
use Closure;
use ReflectionClass;
use Exception;

class Container implements ContainerContract
{
    protected $bindings = [];

    public function bind($abstract, $concrete = null)
    {
        $this->bindings[$abstract] = $concrete;
    }

    public function make($abstract)
    {
        return $this->resolve($abstract);
    }

    protected function resolve($abstract)
    {
        $concrete = $this->getConcrete($abstract);

        if (!$this->isBuildable($concrete, $abstract)) {
            throw new Exception("Target class [$concrete] is not buildable.");
        }

        $object = $this->build($concrete);
        return $object;
    }

    public function build($concrete)
    {
        if ($concrete instanceof Closure) {
            return $concrete($this);
        }

        $reflector = new ReflectionClass($concrete);
        return $reflector->newInstanceArgs();
    }

    protected function isBuildable($concrete, $abstract)
    {
        return $concrete === $abstract || $concrete instanceof Closure;
    }

    protected function getConcrete($abstract)
    {
        if (isset($this->bindings[$abstract])) {
            return $this->bindings[$abstract];
        }

        return $abstract;
    }
}

```

Để thực hiện được tính năng này, chúng ta phải refactor code đã viết trước đó. Cùng với một số functions được tạo mới, tổng cộng, cho tới thời điểm hiện tại, container của chúng ta sẽ có các function sau:
1. function bind
2. function make
3. function resolve
4. function build
5. function isBuildable
6. function getConcrete

**1. function bind:** công việc của function này rất đơn giản, nó sẽ lưu vào mảng `$bindings` giá trị `$abstract` map với `$concrete`

**2. function make:** về phía người dùng, đây là function chính sẽ thực hiện việc tạo ra instance, cũng là chức năng chính của container.

**3. function resolve:** ẩn bên trong, đây là function có nhiệm vụ trong việc biến một `$abstract` thành một `$concrete`.

```php
$concrete = $this->getConcrete($abstract);
```
Ở dòng đầu tiên, ta sẽ đi tìm `$concrete` type của `$abstract` được truyền vào, thông qua **function getConcrete**. Bên trong function getConcrete này, ta sẽ tìm trong mảng `$bindings` xem có key nào trùng khớp với `$abstract` không, nếu có, thì trả về value của key đó. *Nếu không thì ta sẽ xem như $abstract đó chính là `$concrete` và developer đang muốn tạo ra instance của concrete class.* => Đây chính là mấu chốt để ta thực hiện tính năng **Auto Concrete Resolution.**

Ở đoạn tiếp theo
```php
if (!$this->isBuildable($concrete, $abstract)) {
    throw new Exception("Target class [$concrete] is not buildable.");
}
```
```php
protected function isBuildable($concrete, $abstract)
{
    return $concrete === $abstract || $concrete instanceof Closure;
}
```
Chúng ta sẽ kiểm tra xem `$concrete` class có buildable hay không, ở đây code đã được lược bỏ, để đơn giản hóa phù hợp cho ví dụ này. 

Cuối cùng chúng ta sẽ gọi hàm build để build ra instance mong muốn và trả về kết quả, bên trong hàm build này, sẽ còn nhiều thứ cần check...

**4. function build**
```php
public function build($concrete)
{
  if ($concrete instanceof Closure) {
     return $concrete($this);
  }

  $reflector = new ReflectionClass($concrete);
  return $reflector->newInstanceArgs();
}
```
Ở đây, lẽ ra chúng ta có thể check xem là `$concrete` class đó có tồn tại không, rồi là cái `$concrete` class đó có instantiable không? (tức là nó không phải abstract class và interface). 

Nếu $concrete là closure, ta chỉ việc invoke cái closure đó rồi trả kết quả về.

Nếu $concrete là class, thì ta chỉ việc instantiate nó rồi trả instance về.

Tới đây thì xem như quá trình Implementation kết thúc.

## 1.3 Check test
```
HPUnit 9.5.2 by Sebastian Bergmann and contributors.

..                                                                  2 / 2 (100%)

Time: 00:00.003, Memory: 4.00 MB

OK (2 tests, 2 assertions)
```
Hurray! Tests passed!

# 2. Abstract to Concrete resolution

## 2.1 Write test first

```php
public function testAbstractToConcreteResolution()
{
    $container = new Container;
    $container->bind(IContainerContractStub::class, ContainerImplementationStub::class);
    $class = $container->make(ContainerDependentStub::class);
    $this->assertInstanceOf(ContainerImplementationStub::class, $class->impl);
}
interface IContainerContractStub
{
    //
}
class ContainerImplementationStub implements IContainerContractStub
{
    //
}
class ContainerDependentStub
{
    public $impl;

    public function __construct(IContainerContractStub $impl)
    {
        $this->impl = $impl;
    }
}
```
Ở đoạn test trên, chúng ta bind interface `IContainerContractStub::class` cho implementation `ContainerImplementationStub::class`.

Tiếp tới, ta gọi `$container` tạo cho ta một instance của class `ContainerDependentStub::class`. Đây là một điểm cần lưu ý, container của chúng ta sẽ có khả năng tạo ra instance nếu như tham số truyền vào cho nó có thể tạo ra instance (concrete class).

## 2.2 Implementation
...To be continue

# 3. Singleton pattern

![](https://images.viblo.asia/a2e5ee31-b1a8-4a9b-aae7-ec7a72093c4c.png)

Nói qua 1 chút về singleton pattern. Signgleton pattern là một pattern được sử dụng trong lập trình hướng đối tượng. Giới hạn số lượng tạo mới instance về con số 1, nghĩa là đối với một class sẽ chỉ có một instance của class đó được tạo ra. Và instance đó sẽ được sử dụng trong suốt quá trình ứng dụng chạy.

## 4. IoC Container resolve Singleton

## 4.1 Write test first

Áp dụng TDD vào việc implementation, đầu tiên, chúng ta sẽ viết test:

```php
public function testSharedClosureResolution()
{
    $container = new Container;
    $container->singleton('class', function () {
        return new stdClass;
    });
    $firstInstantiation = $container->make('class');
    $secondInstantiation = $container->make('class');
    $this->assertSame($firstInstantiation, $secondInstantiation);
}
```

Trong đoạn test này, đầu tiên chúng ta sẽ tạo ra một `container`. Sau đó, ta đăng ký một singleton được đặt tên là `'class'`. Như mỗi khi ta yêu cầu `container` make cho ta một instance của `'class'`, ta sẽ đều nhận về cùng một instance **duy nhất**.

Trong phần test, ta dùng :

```php
$this->assertSame($firstInstantiation, $secondInstantiation);
```

Để kiểm tra là cả 2 biến tham chiếu đều cùng tham chiếu về cùng một instance.

## 4.2 Implementation

...To be continue