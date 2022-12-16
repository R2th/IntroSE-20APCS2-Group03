Trong bài viết này, chúng ta sẽ tiến hành implement IoC Container. 

# 1. Initalize project
```
📦phpioccontainer
 ┣ 📂src
 ┃ ┗ 📂Illuminate
 ┃ ┃ ┣ 📂Container
 ┃ ┃ ┃ ┗ 📜Container.php
 ┃ ┃ ┗ 📂Contracts
 ┃ ┃ ┃ ┗ 📂Container
 ┃ ┃ ┃ ┃ ┗ 📜Container.php
 ┣ 📂tests
 ┃ ┗ 📂Container
 ┃ ┃ ┗ 📜ContainerTest.php
 ┣ 📜composer.json
 ┗ 📜index.php
```

Bên trên là cấu trúc thư mục khởi tạo project của chúng ta. Lần lượt nội dung của các file sẽ như sau :

**composer.json**
```json
{
    "name": "vscode/phpioccontainer",
    "autoload": {
        "psr-4": {
            "Illuminate\\": "src/Illuminate/"
        }
    },
    "require-dev": {
        "phpunit/phpunit": "^9"
    }
}
```

**src/Illuminate/Container/Container.php**

```php
<?php

namespace Illuminate\Container;

use Illuminate\Contracts\Container\Container as ContainerContract;

class Container implements ContainerContract
{
    protected $bindings = [];

    public function bind($abstract, $concrete = null)
    {
        return 'bind';
    }

    public function make($abstract)
    {
        return 'make';
    }
}
```

**src/Illuminate/Contracts/Container/Container.php**

```php
<?php

namespace Illuminate\Contracts\Container;

interface Container
{
    public function bind($abstract, $concrete = null);
    public function make($abstract);
}
```

**tests/Container/ContainerTest.php**

```php
<?php

namespace Illuminate\Tests\Container;

use Illuminate\Container\Container;
use PHPUnit\Framework\TestCase;

class ContainerTest extends TestCase
{
    public function testClosureResolution()
    {
        $container = new Container;
        $container->bind('name', function () {
            return 'You';
        });
        $this->assertSame('You', $container->make('name'));
    }
}
```

Đó là nội dung của 4 files chính của chúng ta trong bài viết lần này. 

Nếu ta chạy unit test tại thời điểm này, chắc chắn là test fail (RED), và đây là điều chúng ta mong muốn, theo đúng tinh thần của [TDD](https://en.wikipedia.org/wiki/Test-driven_development).

Công việc cần làm của chúng ta bây giờ là làm cho test pass (GREEN).

# 2. Implement Container

## 2.1. Closure resolution
Chúng ta sẽ implement dạng đơn giản nhất của container, là nó chỉ thực hiện resolve các **closure** (function) được binding. Về ý tưởng thì tương đối đơn giản.

> bind **this** with **that**.
> make **that** then give me **this**


Ý tưởng implement là ta sẽ có một mảng `bindings[] ` để lưu trữ tất cả các bindings.

```php
<?php

namespace Illuminate\Container;

use Illuminate\Contracts\Container\Container as ContainerContract;

class Container implements ContainerContract
{
    protected $bindings = [];

    public function bind($abstract, $concrete = null)
    {
        $this->bindings[$abstract] = $concrete;
    }

    public function make($abstract)
    {
        $concrete = $this->getConcrete($abstract);
        return $concrete();
    }

    protected function getConcrete($abstract)
    {
        return $this->bindings[$abstract];
    }
}
```

Việc thực hiện khá là đơn giản, giờ thì thử chạy lại unit test của chúng ta nào 

```
$ ./vendor/bin/phpunit tests

PHPUnit 9.5.2 by Sebastian Bergmann and contributors.

. 1 / 1 (100%)

Time: 00:00.004, Memory: 4.00 MB

OK (1 test, 1 assertion)
```

Hurray! Passed!

## 2.1. Singleton

...To Be Continued!

*Cảm ơn các bạn đã đọc bài viết, hẹn gặp lại ở bài viết tiếp theo, chúng ta sẽ tiến hành implement dạng singleton của binding nhé!*

----
Code: https://github.com/tunt-1890/phpioccontainer