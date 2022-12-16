# Giới thiệu
Xin chào, Trong phần này mình sẽ giải thích về 7 loại trong `Structural Design Patterns`.

Link bài viết: 
- [Phần 1:Design Patterns Là gì](https://viblo.asia/p/design-patterns-phan-1-bJzKmJpPZ9N)
- [Phần 2: Creational Design Patterns](https://viblo.asia/p/creational-design-patterns-ORNZqLrnK0n)
- Phần 3: Structural Design Patterns
- [Phần 4: Behavioral Design Patterns](https://viblo.asia/p/behavioral-design-patterns-YWOZrbJ7ZQ0)

# Nội dung
## Adapter
**Ví dụ thực tế:**  Giả sử rằng bạn có một số hình ảnh trong thẻ nhớ và bạn cần chuyển chúng vào máy tính của mình. Để chuyển chúng, bạn cần một số loại bộ chuyển đổi tương thích với các cổng máy tính của bạn để bạn có thể gắn thẻ nhớ vào máy tính. Trong trường hợp này đầu đọc thẻ là một bộ chuyển đổi. Một ví dụ khác là power adapter, một phích cắm ba chân không thể được kết nối với một ổ cắm hai đầu, nó cần sử dụng một bộ power adapter để làm cho nó tương thích với ổ cắm hai đầu. Một ví dụ khác là một dịch giả dịch các từ được nói bởi người này sang người khác.

**Nói một cách dễ hiểu:** Adapter pattern cho phép bạn bọc một đối tượng không tương thích khác trong adapter để làm cho nó tương thích với class khác.

> wiki: In software engineering, the adapter pattern is a software design pattern that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.
 
### Ví dụ
Giả sử một game trong đó có thợ săn và sư tử. Đầu tiên chúng ta sẽ có interface `Lion`
```php
interface Lion
{
    public function roar();
}

class AfricanLion implements Lion
{
    public function roar()
    {
    }
}

class AsianLion implements Lion
{
    public function roar()
    {
    }
}
```
Bác thợ săn thì cần săn sư tử ha:
```php
class Hunter
{
    public function hunt(Lion $lion)
    {
        $lion->roar();
    }
}
```
Bây giờ chúng ta sẽ thêm `WildDog` vào trong game, và bác thợ săn cũng có thể săn thêm loài này :))) Nhưng chúng ta không thể làm điều này trực tiếp bởi bì Dog có interface khác. Để làm nó trở nên tương thích cho bác thợ săn, chúng ta sẽ tạp một adapter
```php
// This needs to be added to the game
class WildDog
{
    public function bark()
    {
    }
}

// Adapter around wild dog to make it compatible with our game
class WildDogAdapter implements Lion
{
    protected $dog;

    public function __construct(WildDog $dog)
    {
        $this->dog = $dog;
    }

    public function roar()
    {
        $this->dog->bark();
    }
}
```
Và bây giờ `WildDog` có thể chạy trong game khi sử dụng `WildDogAdapter`
```php
$wildDog = new WildDog();
$wildDogAdapter = new WildDogAdapter($wildDog);

$hunter = new Hunter();
$hunter->hunt($wildDogAdapter);
```

## Bridge
**Ví dụ thực tế:** giả sử bạn có một trang web với các pages khác nhau và bạn có thể cho phép người dùng thay đổi theme. Bạn sẽ làm gì? Tạo nhiều bản sao của mỗi page cho mỗi theme hoặc bạn chỉ cần tạo theme riêng và tải chúng dựa trên sở thích của người dùng? Bridge pattern cho phép bạn thực hiện lần thứ hai.

![](https://images.viblo.asia/7c84684d-cb90-4d19-b6c3-1a8a610bacde.png)

**Nói một cách dễ hiểu:** Bridge pattern là một design pattern sử dụng trong software engineering có nghĩa là "tách rời một abstraction khỏi implementation để hai cái có thể thay đổi độc lập"

### Ví dụ
Từ ví dụ web page ở trên, bây giờ chúng ta có như sau:
```php
interface WebPage
{
    public function __construct(Theme $theme);
    public function getContent();
}

class About implements WebPage
{
    protected $theme;

    public function __construct(Theme $theme)
    {
        $this->theme = $theme;
    }

    public function getContent()
    {
        return "About page in " . $this->theme->getColor();
    }
}

class Careers implements WebPage
{
    protected $theme;

    public function __construct(Theme $theme)
    {
        $this->theme = $theme;
    }

    public function getContent()
    {
        return "Careers page in " . $this->theme->getColor();
    }
}
```
Và các theme riêng biệt
```php

interface Theme
{
    public function getColor();
}

class DarkTheme implements Theme
{
    public function getColor()
    {
        return 'Dark Black';
    }
}
class LightTheme implements Theme
{
    public function getColor()
    {
        return 'Off white';
    }
}
class AquaTheme implements Theme
{
    public function getColor()
    {
        return 'Light blue';
    }
}
```
Sử dụng như sau:
```php
$darkTheme = new DarkTheme();

$about = new About($darkTheme);
$careers = new Careers($darkTheme);

echo $about->getContent(); // "About page in Dark Black";
echo $careers->getContent(); // "Careers page in Dark Black";
```

## Composite
**Ví dụ  thực tế:** mọi tổ chức đều có nhân viên, với mỗi nhân viên đều cùng feature, chẳng hạn như có lương :)) có một vài quyền hạn nhất định, có thể có hoặc không thể report cho ai đó, có thể có hoặc không có cấp dưới.

**Nói dễ hiểu:** Composite pattern cho phespp client xử lý các object riêng lẻ một cách thống nhất.

> Wiki: In software engineering, the composite pattern is a partitioning design pattern. The composite pattern describes that a group of objects is to be treated in the same way as a single instance of an object. The intent of a composite is to "compose" objects into tree structures to represent part-whole hierarchies. Implementing the composite pattern lets clients treat individual objects and compositions uniformly.

### Ví dụ
Từ ví dụ về nhân viên ở trên, chúng ta sẽ có nhiều loại nhân viên khác nhau:
```php
interface Employee
{
    public function __construct(string $name, float $salary);
    public function getName(): string;
    public function setSalary(float $salary);
    public function getSalary(): float;
    public function getRoles(): array;
}

class Developer implements Employee
{
    protected $salary;
    protected $name;
    protected $roles;
    
    public function __construct(string $name, float $salary)
    {
        $this->name = $name;
        $this->salary = $salary;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setSalary(float $salary)
    {
        $this->salary = $salary;
    }

    public function getSalary(): float
    {
        return $this->salary;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }
}

class Designer implements Employee
{
    protected $salary;
    protected $name;
    protected $roles;

    public function __construct(string $name, float $salary)
    {
        $this->name = $name;
        $this->salary = $salary;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setSalary(float $salary)
    {
        $this->salary = $salary;
    }

    public function getSalary(): float
    {
        return $this->salary;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }
}
```
Sau đó chúng ta có một tổ chức bao gồm nhiều loại nhân viên khác nhau
```php
class Organization
{
    protected $employees;

    public function addEmployee(Employee $employee)
    {
        $this->employees[] = $employee;
    }

    public function getNetSalaries(): float
    {
        $netSalary = 0;

        foreach ($this->employees as $employee) {
            $netSalary += $employee->getSalary();
        }

        return $netSalary;
    }
}
```
Và giờ sử dụng bằng cách:
```php
// Prepare the employees
$john = new Developer('John Doe', 12000);
$jane = new Designer('Jane Doe', 15000);

// Add them to organization
$organization = new Organization();
$organization->addEmployee($john);
$organization->addEmployee($jane);

echo "Net salaries: " . $organization->getNetSalaries(); // Net Salaries: 27000
```

## Decorator
**Ví dụ thực tế:** Hãy tưởng tượng bạn lái xe một cửa hàng dịch vụ xe hơi cung cấp nhiều dịch vụ. Bây giờ làm thế nào để bạn tính toán hóa đơn phải trả? Bạn chọn một dịch vụ và tự động tiếp tục thêm vào đó giá cho các dịch vụ được cung cấp cho đến khi bạn nhận được chi phí cuối cùng. Ở đây mỗi loại dịch vụ là một decorator.

**Nói một cách dễ hiểu:** Decorator pattern cho phép bạn thay đổi linh hoạt hành vi của một đối tượng trong run time bằng cách gộp chúng trong một decorator class.

> Wiki: In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class. The decorator pattern is often useful for adhering to the Single Responsibility Principle, as it allows functionality to be divided between classes with unique areas of concern.

## Ví dụ
Lấy coffee làm ví dụ, đầu tiên chúng ta có `SimpleCoffee`  implementing `coffee` interface
```php
interface Coffee
{
    public function getCost();
    public function getDescription();
}

class SimpleCoffee implements Coffee
{
    public function getCost()
    {
        return 10;
    }

    public function getDescription()
    {
        return 'Simple coffee';
    }
}
```
Chúng ta muốn tạo code có thể mở rộng để cho phép sửa đổi các option nếu yêu cầu. Bây giờ chúng ta sẽ tạo vài `add-ons` (decorators)
```php
class MilkCoffee implements Coffee
{
    protected $coffee;

    public function __construct(Coffee $coffee)
    {
        $this->coffee = $coffee;
    }

    public function getCost()
    {
        return $this->coffee->getCost() + 2;
    }

    public function getDescription()
    {
        return $this->coffee->getDescription() . ', milk';
    }
}

class WhipCoffee implements Coffee
{
    protected $coffee;

    public function __construct(Coffee $coffee)
    {
        $this->coffee = $coffee;
    }

    public function getCost()
    {
        return $this->coffee->getCost() + 5;
    }

    public function getDescription()
    {
        return $this->coffee->getDescription() . ', whip';
    }
}

class VanillaCoffee implements Coffee
{
    protected $coffee;

    public function __construct(Coffee $coffee)
    {
        $this->coffee = $coffee;
    }

    public function getCost()
    {
        return $this->coffee->getCost() + 3;
    }

    public function getDescription()
    {
        return $this->coffee->getDescription() . ', vanilla';
    }
}
```
Bây giờ chúng ta có coffee để ún ròi :))
```php
$someCoffee = new SimpleCoffee();
echo $someCoffee->getCost(); // 10
echo $someCoffee->getDescription(); // Simple Coffee

$someCoffee = new MilkCoffee($someCoffee);
echo $someCoffee->getCost(); // 12
echo $someCoffee->getDescription(); // Simple Coffee, milk

$someCoffee = new WhipCoffee($someCoffee);
echo $someCoffee->getCost(); // 17
echo $someCoffee->getDescription(); // Simple Coffee, milk, whip

$someCoffee = new VanillaCoffee($someCoffee);
echo $someCoffee->getCost(); // 20
echo $someCoffee->getDescription(); // Simple Coffee, milk, whip, vanilla
```

## Facade
**Ví dụ thực tế:** Làm thế nào để bạn bật máy tính? Nhấn nút nguồn ! Đó là những gì bạn tin bởi vì bạn đang sử dụng một giao diện đơn giản mà máy tính cung cấp ở bên ngoài, bên trong nó phải làm rất nhiều thứ để biến nó thành hiện thực. Giao diện đơn giản cho hệ thống con phức tạp này là Facade.

**Nói một cách dễ hiểu:** Facade pattern cung cấp giao diện đơn giản cho một hệ thống con phức tạp

> Wiki: A facade is an object that provides a simplified interface to a larger body of code, such as a class library.

### Ví dụ
```php
class Computer
{
    public function getElectricShock()
    {
        echo "Ouch!";
    }

    public function makeSound()
    {
        echo "Beep beep!";
    }

    public function showLoadingScreen()
    {
        echo "Loading..";
    }

    public function bam()
    {
        echo "Ready to be used!";
    }

    public function closeEverything()
    {
        echo "Bup bup bup buzzzz!";
    }

    public function sooth()
    {
        echo "Zzzzz";
    }

    public function pullCurrent()
    {
        echo "Haaah!";
    }
}
```
Bây giờ là Facade
```php
class ComputerFacade
{
    protected $computer;

    public function __construct(Computer $computer)
    {
        $this->computer = $computer;
    }

    public function turnOn()
    {
        $this->computer->getElectricShock();
        $this->computer->makeSound();
        $this->computer->showLoadingScreen();
        $this->computer->bam();
    }

    public function turnOff()
    {
        $this->computer->closeEverything();
        $this->computer->pullCurrent();
        $this->computer->sooth();
    }
}
```
Sử dụng facade:
```php
$computer = new ComputerFacade(new Computer());
$computer->turnOn(); // Ouch! Beep beep! Loading.. Ready to be used!
$computer->turnOff(); // Bup bup buzzz! Haah! Zzzzz
```

## Flyweight
**Ví dụ thực tế:** Bạn đã bao giờ mua trà (sữa :)))) ? Họ thường làm nhiều hơn một cốc mà bạn yêu cầu và tiết kiệm phần còn lại cho bất kỳ khách hàng nào khác để tiết kiệm tài nguyên, ví dụ: gas v.v ... Flyweight pattern là tất cả về việc chia sẻ tài nguyên đó.

**Ngắn gọn:** Nó được sử dụng để giảm thiểu việc sử dụng bộ nhớ hoặc chi phí bằng cách chia sẻ càng nhiều càng tốt với các object tương tự.

> Wiki: In computer programming, flyweight is a software design pattern. A flyweight is an object that minimizes memory use by sharing as much data as possible with other similar objects; it is a way to use objects in large numbers when a simple repeated representation would use an unacceptable amount of memory.

### Ví dụ
Chúng ta sẽ có loại trà và máy pha trà
```php
// Anything that will be cached is flyweight.
// Types of tea here will be flyweights.
class KarakTea
{
}

// Acts as a factory and saves the tea
class TeaMaker
{
    protected $availableTea = [];

    public function make($preference)
    {
        if (empty($this->availableTea[$preference])) {
            $this->availableTea[$preference] = new KarakTea();
        }

        return $this->availableTea[$preference];
    }
}
```
Sau đó chúng ta sẽ tạo `TeaShop` nhận đơn hàng và phục vụ họ
```php
class TeaShop
{
    protected $orders;
    protected $teaMaker;

    public function __construct(TeaMaker $teaMaker)
    {
        $this->teaMaker = $teaMaker;
    }

    public function takeOrder(string $teaType, int $table)
    {
        $this->orders[$table] = $this->teaMaker->make($teaType);
    }

    public function serve()
    {
        foreach ($this->orders as $table => $tea) {
            echo "Serving tea to table# " . $table;
        }
    }
}
```
Sử dụng
```php
$teaMaker = new TeaMaker();
$shop = new TeaShop($teaMaker);

$shop->takeOrder('less sugar', 1);
$shop->takeOrder('more milk', 2);
$shop->takeOrder('without sugar', 5);

$shop->serve();
// Serving tea to table# 1
// Serving tea to table# 2
// Serving tea to table# 5
```

## Proxy
**Ví dụ thực tế:** Bạn đã bao giờ sử dụng một thẻ để đi qua cửa? Có nhiều tùy chọn để mở cửa, tức là có thể mở bằng thẻ hoặc bằng cách nhập mật khẩu. Chức năng chính của cánh cửa là mở nhưng có một proxy được thêm vào bên trên để thêm một số chức năng.

**Nói một cách dễ hiểu:** khi sử dụng Proxy pattern, một lớp thể hiện chức năng của một lớp khác.

> Wiki: A proxy, in its most general form, is a class functioning as an interface to something else. A proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can simply be forwarding to the real object, or can provide additional logic. In the proxy extra functionality can be provided, for example caching when operations on the real object are resource intensive, or checking preconditions before operations on the real object are invoked.
 
### Ví dụ
Trước hết, chúng ta sẽ tạo door interce và implementation của door
```php
interface Door
{
    public function open();
    public function close();
}

class LabDoor implements Door
{
    public function open()
    {
        echo "Opening lab door";
    }

    public function close()
    {
        echo "Closing the lab door";
    }
}
```
Sau đó chúng ta sẽ tạo proxy để bảo mật cho cửa
```php
class SecuredDoor
{
    protected $door;

    public function __construct(Door $door)
    {
        $this->door = $door;
    }

    public function open($password)
    {
        if ($this->authenticate($password)) {
            $this->door->open();
        } else {
            echo "Big no! It ain't possible.";
        }
    }

    public function authenticate($password)
    {
        return $password === '$ecr@t';
    }

    public function close()
    {
        $this->door->close();
    }
}
```
Và sử dụng như sau
```php
$door = new SecuredDoor(new LabDoor());
$door->open('invalid'); // Big no! It ain't possible.

$door->open('$ecr@t'); // Opening lab door
$door->close(); // Closing lab door
```

# Tổng kết
Trên đây là phần thứ 3 của bài viết về design pattern, bạn nhớ đọc hết phần 4 nhé, hy vọng bài viết sẽ giúp ích cho bạn. Happy coding !!! <3 <3 <3