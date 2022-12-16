Trong bài viết này, chúng ta sẽ thực hiện implement 2 tính năng mới cho container:
1. Abstract to concrete resolution

    Đây là khả năng của container cho phép ta bind một interface vào một implementation, rồi dùng interface để tạo ra các instance.

2. Dependency resolution 

    Đây là khả năng dựa vào **type-hint** ở **constructor** và tạo ra các *instances* tương ứng sau đó **inject** vào constructor (đây chính là công dụng hỗ trợ **dependency injection** trong truyền thuyết của container). 

# 1. Abstract to concrete resolution
## 1.1. Write test first (and see it failed):

```php
public function testAbstractToConcreteResolution()
{
    $container = new Container;
    $container->bind(IContainerContractStub::class, ContainerImplementationStub::class);
    $instance = $container->make(IContainerContractStub::class);
    $this->assertInstanceOf(ContainerImplementationStub::class, $instance);
}

interface IContainerContractStub
{
    //
}

class ContainerImplementationStub implements IContainerContractStub
{
    //
}
```

Trong test case này, chúng ta tập trung vào khả năng *bind* một interface vào một class của container. Rồi khi ta yêu cầu container tạo cho ta một instance của interface đó, container sẽ dựa vào giá trị bind này, để tạo ra instance tương ứng.

## 1.2. Implementation
Để thực hiện tính năng này, ta chỉ cần sự trợ giúp của [ReflectionClass](https://www.php.net/manual/en/class.reflectionclass.php).

Đoạn code magic là đây :

```php
$reflector = new ReflectionClass($concrete);
$instance = $reflector->newInstanceArgs();
```

Ở đây, *$concrete* là một string chứa tên của class. $instance được tạo ra bằng method [newInstanceArgs()](https://www.php.net/manual/en/reflectionclass.newinstanceargs.php) 

Chúng ta sẽ chỉ cần phải tập trung vào method **build** từ ví dụ  trước, để code có thể pass được test case.

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

Trong đoạn code trên, có thể thấy trước đó chúng ta đã có handle tính năng [Closure Resolution](https://viblo.asia/p/ioc-container-in-php-part-2-GrLZDJz35k0#_21-closure-resolution-2). Nếu như $concrete không phải là instance của Closure, ta sẽ mặc định xem nó là class, và tiến hành tạo $instance từ class đó.
# 2. Dependency resolution
## 2.1. Write test first (and see it failed):
```php
public function testDependencyResolution()
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

## 2.2. Implementation
Để thực hiện được tính năng xử lý **type-hint** ở constructor này, chúng ta cần đầu tiên lấy cái constructor ra đã, sử dụng hàm [getConstructor()](https://www.php.net/manual/en/reflectionclass.getconstructor.php).

```php
$constructor = $reflector->getConstructor();
```

Tiếp theo, từ $contructor (cái constructor này là là một [ReflectionMethod](https://www.php.net/manual/en/class.reflectionmethod.php) , ta sẽ lấy ra danh sách parameters sử dụng hàm [getParameters()](https://www.php.net/manual/en/reflectionfunctionabstract.getparameters.php).

```php
$dependencies = $constructor->getParameters();
```

Ở đây ta sẽ đổi tên một xíu, do tính năng ta đang nói là dependency injection, và mỗi một parameter được xem như một dependency của class.

Tiếp theo, ta sẽ sử dụng hàm [getType()](https://www.php.net/manual/en/reflectionparameter.gettype.php) để lấy ra type của dependency. Rồi từ type này, ta sẽ lấy ra name bằng hàm [getName()](https://www.php.net/manual/en/reflectionnamedtype.getname.php). Đây chính là cái tính năng **type-hint** huyền thoại. Nếu parameter không có type, thì nó sẽ là **null**.

```php
$type = $dependency->getType();
$className = $type->getName();
```

Cái $className mà chúng ta nhận được, sẽ có thể là interface mà cũng có thể là concrete class. Nhưng tới đây, mọi việc cứ để container hiện tại của chúng ta lo. 

Đây là đoạn code đầy đủ:

```php
public function build($concrete)
{
    if ($concrete instanceof Closure) {
        return $concrete($this);
    }

    $reflector = new ReflectionClass($concrete);

    $constructor = $reflector->getConstructor();

    if(is_null($constructor)) {
        return new $concrete;
    }

    $dependencies = $constructor->getParameters();

    $instances = $this->resolveDependencies($dependencies);

    return $reflector->newInstanceArgs();
}

protected function resolveDependencies(array $dependencies)
{
    $results = [];

    foreach ($dependencies as $dependency) {
        $result = $this->resolveClass($dependency);
        $results[] = $result;
    }

    return $results;
}

protected function resolveClass(ReflectionParameter $dependency)
{
    $type = $dependency->getType();
    $className = $type->getName();
    return $this->make($className);
}
```

# 3. Singleton Resolution

...to be continue



-----
Code: https://github.com/tunt-1890/phpioccontainer