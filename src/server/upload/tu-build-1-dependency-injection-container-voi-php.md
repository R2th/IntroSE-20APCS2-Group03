Nếu bạn đã làm việc với các Framework như Laravel thì chắc hẳn bạn sẽ biết đến Service Container. Service Container trong Laravel **là một Dependency Injection (DI) Container**, `là nơi quản lý class dependency và thực hiện dependency injection`.

Để sử dụng Service Container thì khá đơn giản tuy nhiên tìm hiểu cách nó được xây dựng như thế nào thì là một vấn đề khác. Trong bài viết này mình sẽ giới thiệu một vài kiến thức mà Laravel áp dụng để xây dựng Service Container, từ đó thử build 1 mini Dependency Injection (DI) Container tương tự Service Container xem sao nhé.

**Nội dung bài viết**:
> 
> - Dependency Injection
> - Reflection (QUAN TRỌNG)
> - Build mini DI Container

> Trong đấy quan trọng nhất là Reflection, đây là vấn đề mấu chốt để xây dựng DI container.

# Dependency Injection

Nếu một Class A hoạt động phụ thuộc vào một vài Class khác, thay vì khởi tạo các instance của các Class kia bên trong Class A, ta sẽ inject những instance đó vào thông qua constructor hay setter. Những instance của các Class mà Class A cần để hoạt động đó được gọi là dependency. 

Ví dụ:

```php
class UserController
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register($dataUser)
    {
        $user = $this->userService->register($dataUser);
        if($user) {
            echo 'Success';
        } else {
            echo 'Fail';
        }
        
        return;
    }
}
```

```php
class UserService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register($dataUser)
    {
         return $this->userRepository->store($dataUser);
    }
}
```

```php
interface UserRepositoryInterface {
    public function store($data);
}

class UserRepository implements UserRepositoryInterface {
    public function store($data)
    {
        return $this->model()->create($data);
    }
}
```

Có thể thấy để `UserController` hoạt động cần 1 instance `UserService`, tương tự để `UserService` hoạt động cần 1 instance `UserRepositoryInterface`.

*Ở đây chúng ta đã áp dụng DI bằng cách inject các class dependency thông qua constructor như ví dụ trên.*

Tuy nhiên khi sử dụng `UserController`
```php
$userController = new UserController(new UserService(new UserRepository);
$userController->register($data)
```

*Sẽ ra sao nếu như class có nhiều dependency, và những dependency này lại có nhiều dependency khác?*

Ví dụ như `UserService` cần `GroupService`, `GroupService` cần `GroupRepository`:
```php
$userController = new UserController(new UserService(new UserRepository, new GroupService(new GroupRepository));
```

Đây chính là lúc bạn cần DI Container để giải quyết vấn đề trên. Sức mạnh của DI Container là ở chỗ, bạn có thể "type-hint" dependency trong constructor hoặc method của class, nó sẽ tự động resolve và inject nó vào class cho bạn. Sử dụng Reflection là cách DI Container làm nên điều kì diệu đấy.

# Reflection
Nguyên văn từ [PHP](https://www.php.net/manual/en/intro.reflection.php):

> PHP 5 comes with a complete reflection API that adds the ability to reverse-engineer classes, interfaces, functions, methods and extensions. Additionally, the reflection API offers ways to retrieve doc comments for functions, classes and methods.

Dịch nôm na: **Reflection là khả năng để chương trình "inspect" chính nó, bạn có thể khảo sát class, interface, function, method và cả extension xem nó tên gì, cần gì,... Nó còn có thể lấy được comment của function, class, method.**

Mình sẽ giới thiệu với bạn 1 vài build-in function của Reflection sẽ áp dụng vào việc xây dựng DI Container dưới đây, chi tiết hơn bạn có thể vào [docs Reflection](https://www.php.net/manual/en/intro.reflection.php).

```php
$reflector = new ReflectionClass($concrete);

// check if class is instantiable
$reflector->isInstantiable();

// get class constructor
$reflector->getConstructor();

// get new instance from class
$reflector->newInstance();

// get new instance with dependencies resolved
$reflector->newInstanceArgs($dependencies);

// get constructor params
$constructor->getParameters();

// get the type hinted class
$params->getClass();

// check if default value for a parameter is available
$parameter->isDefaultValueAvailable();

// get default value of parameter
$parameter->getDefaultValue();
```

Laravel Service Container là một DI Container, về cơ bản thì Laravel  **sử dụng Reflection kết hợp đệ quy** *để resolve các dependency* từ đấy tạo nên sức mạnh của Service Container mà bạn đã thấy.

Chưa tin thì bạn vào đây https://github.com/laravel/framework/blob/master/src/Illuminate/Container/Container.php

*Tại function build (dòng 793)*

```php
try {
    $reflector = new ReflectionClass($concrete);
} catch (ReflectionException $e) {
    throw new BindingResolutionException("Target class [$concrete] does not exist.", 0, $e);
}
```

Chưa biết thế nào nhưng có từ `ReflectionClass` thì chắc là đúng rồi?


# Build Mini DI Container

Ok giờ đến cách xây dựng DI như thế nào, mời bạn xem source code dưới đây, chi tiết mình đã comment từng function. Có gì không hiểu bạn cứ comment phía dưới nhé.

**Mini DI Container**

```php
class Container
{
    protected $instances = [];

    /**
     * Đăng ký một class hay interface với Container
     *
     * @param $abstract
     * @param $concrete
     */
    public function bind($abstract, $concrete = NULL)
    {
        if (is_null($concrete)) {
            $concrete = $abstract;
        }
        $this->instances[$abstract] = $concrete;
    }

    /**
     * Lấy ra instance từ Container
     *
     * @param $abstract
     * @return mixed|object
     * @throws Exception
     */
    public function make($abstract, $parameters = [])
    {
        if (!isset($this->instances[$abstract])) {
            $this->bind($abstract);
        }

        return $this->resolve($this->instances[$abstract], $parameters);
    }

    /**
     * Sử dụng Reflection và đệ quy (hàm resolveDependencies)
     * để inspect class và lấy các class dependency của nó cho đến hết
     *
     * @param $concrete
     * @return mixed|object
     * @throws ReflectionException
     */
    protected function resolve($concrete, $parameters)
    {
        if ($concrete instanceof Closure) {
            return $concrete($this, $parameters);
        }

        $reflector = new ReflectionClass($concrete);

        if (!$reflector->isInstantiable()) {
            throw new Exception("Class {$concrete} is not instantiable");
        }

        $constructor = $reflector->getConstructor();

        if (is_null($constructor)) {
            return $reflector->newInstance();
		}

        $parameters = $constructor->getParameters();
        $dependencies = $this->resolveDependencies($parameters);

        return $reflector->newInstanceArgs($dependencies);
    }

    /**
     * Sử dụng Reflection và đệ quy để
     * inspect class và lấy các class dependency của nó cho đến hết
     * @param $parameters
     * @return array
     * @throws Exception
     */
    protected function resolveDependencies($parameters)
    {
        $dependencies = [];
 
        foreach ($parameters as $parameter) {
            $dependency = $parameter->getClass();

            if (is_null($dependency)) {
                if ($parameter->isDefaultValueAvailable()) {
                    $dependencies[] = $parameter->getDefaultValue();
                } else {
                    throw new Exception("Can not resolve dependency {$parameter->name}");
                }
            } else {
                $dependencies[] = $this->make($dependency->name);
            }
        }

        return $dependencies;
    }
}
```

Chúng ta sẽ thử sử dụng class Container vừa mới xây dựng áp dụng vào ví dụ đầu bài nhé.

```php
$container = new Container();
// Bind Interface với class Implementation
$container->bind(UserRepositoryInterface::class, UserRepository::class);
 // Resolve instance của UserController
$userController = $container->make(UserController::class);
$userController->register($dataUser);  // 'Success' by echo
```

Hoặc bạn cũng có thể bind 1 Closure (kèm params)

```php
// Bind Closure
$container->bind(UserRepositoryInterface::class, function($container, $parameters) {
    return new UserRepository();
});
// Resolve instance của UserController với array params
$userController = $container->make(UserController::class, []);
$userController->register($dataUser); // 'Success' by echo
```

Trên đây mình đã giới thiệu với bạn cách xây dựng 1 Dependency Injection Container. Hi vọng từ bài viết này bạn có thể hiểu hơn về cách DI Container được xây dựng và hoạt động như thế nào. Nếu có thắc mắc và góp ý bạn comment phía dưới nhé. Cảm ơn bạn 😊

Tham khảo:

https://thanhpvz.com/posts/tu-build-1-dependency-injection-container-voi-php/

https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB

https://viblo.asia/p/dependency-injection-hoat-dong-the-nao-trong-laravel-3Q75wD3JKWb