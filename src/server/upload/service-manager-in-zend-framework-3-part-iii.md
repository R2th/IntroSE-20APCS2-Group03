Các bài viết trước mình đã giới thiệu với các bạn về ZF3 cách cài đặt cũng như cách tạo một module riêng, các bạn có thể tham khảo tại đây:
* [Start with Zend Framework 3 (Part I)](https://viblo.asia/p/start-with-zend-framework-3-part-i-1Je5EeDY5nL)
* [How to create a new module in Zend Framework 3 (Part II)](https://viblo.asia/p/how-to-create-a-new-module-in-zend-framework-3-part-ii-ByEZky1o5Q0)

Hôm nay tiếp tục loạt bài về ZF3 mình sẽ giúp các bạn tìm hiểu về service manager trong ZF3. Nếu bạn nào đã từng làm quen với laravel thì có thể hiểu đơn giản  service namage trong zf3 tương tự service provider trong laravel, nó quản lý các lớp phụ thuộc nhau, nó được coi như trái tym, trung tâm dịch vụ của ứng dụng ZF.
# I. Service Manager
Bạn có thể tưởng tượng ứng dụng web là một tập hợp các service. Ví dụ: bạn có thể có một authentication service chịu trách nhiệm đăng nhập người dùng trang web, entity manager service chịu trách nhiệm truy cập cơ sở dữ liệu, event manager service chịu trách nhiệm kích hoạt các sự kiện và cung cấp cho người nghe sự kiện, v.v.

Trong Zend Framework, lớp ServiceManager là một thùng chứa tập trung cho tất cả các service của ứng dụng.

*Service manager* được implemented trong  `Zend\ServiceManager` dưới dạng lớp *ServiceManager* . Bên dưới là biểu đồ kế thừa lớp

![](https://images.viblo.asia/001ebc62-a792-4ce5-890f-b8785477c1f4.png)

Lớp *ServiceManager* chính là triển khai mã lập trình theo mô hình [Service Locator](https://xuanthulab.net/mo-hinh-lap-trinh-service-loacator.html) của Zend Framework

Với Zend Framework thì *ServiceManager* đã được ứng dụng khởi tạo và kích hoạt trung tâm này (phương thức tĩnh init() của` Zend\Mvc\Application`, gọi trong file index.php).  *ServiceManager*  có phương thức get("name_of_service") để lấy đối tượng dịch vụ nào đó nó đang quản lý.

*ServiceManager* là một trung tâm quan trọng trong logic ứng dụng, mặc định Zend Skeleton Application được cấu hình để *ServiceManager* đưa vào trung tâm của nó các dịch vụ khởi tạo sẵn ở phía dưới và có thể lấy bằng $ServiceManager->get($Key):


| Key - Tên dịch vụ  | Description  |
| -------- | -------- |
| Application     | Đối tượng` Zend\Mvc\Application `    |
| ApplicationConfig     | Mảng cấu hình application.config.php`  `  |
| Config     | Mảng cấu hình tổng hợp từ các file module.config.php, autoload/global.php, autoload/local.php.  |
| EventManager     | Đối tượng` Zend\EventManager\EventManager` quản lý các sự kiện, các listener   |
| SharedEventManager     |Đối tượng `Zend\EventManager\SharedEventManager `  |
| ModuleManager     | Đối tượng lớp `Zend\ModuleManager\ModuleManager`, quản lý các module   |
| Request     | Đối tượng `Zend\Http\Request` biểu diễn HTTP Request khách gửi đến   |
| Response     | Đối tượng `Zend\Http\Response `biểu diễn HTTP response sẽ trả về cho khách.  |
| Router     | Đối tượng` Zend\Router\Http\TreeRouteStack`, phân tích định tuyển URL   |
| ServiceManager     |Chính là ServiceManager  |
| ViewManager     | Đối tượng `Zend\Mvc\View\Http\ViewManager` biểu diễn layer của mô hình MVC, quản lý hệ thống Render HTML |
| ControllerManager     | Đối tượng `Zend\Mvc\Controller\ControllerManager `biểu diễn layer Controller của mô hình MVC, quả lý các Controller   |

Ngoài ra còn nhiều dịch vụ tiện ích khác. Nhưng nên nhớ ServiceManager lưu trữ một phiên bản duy nhất của từng đối tượng lớp.

Bạn có thể sử dụng các phương thức sau của ServiceManager:

* **has**($name) : kiểm tra dịch vụ có tên $name tồn tại không
* **get**($name) : lấy dịch vụ $name
* **build**($name, $options) : khởi tạo và lấy dịch vụ mới $name

# II. Lấy đối tượng Service Manager
Mọi dịch vụ của ứng dụng do Service Manager quản lý, do vậy khi có nhu cầu lấy Service Manager có nhiều cách, nhưng thông thường bạn có được đối tượng Service Manager thông qua Inject với hàm tạo đối tượng bằng cách đăng ký dịch vụ trong config

Lấy Service Manager từ onBootstrap :

Bạn có thể lấy SM bằng cách thêm phương thức onBootstrap vào lớp Module của module nào bạn cần lấy tùy thích, ví dụ module Application mở file Module.php và thêm phương thức onBootstrap như sau:
```php
public function onBootstrap(\Zend\Mvc\MvcEvent $e)
{
    //Lấy SM
    $serviceManager =  $e->getTarget()->getServiceManager();

    //Có $serviceManager sử dụng tùy tình huống, ví dụ
    //lấy mảng ApplicationConfig, danh sách các module

    $appConfig = $serviceManager->get('ApplicationConfig');
    $modules = $appConfig['modules'];
    var_dump($modules);
}

```
Ngoài ra Service Manager còn lấy được thông qua quá trình Inject khi khởi tạo các loại dịch vụ, ví dụ Inject vào Controller, Inject vào View
# III. Đăng ký một service
Khi bạn xây dựng một chức năng nào đó, và muốn nó hoạt động như một service để các đối tượng khác cần dùng đến thì chỉ việc gọi dịch vụ của bạn, thì phải làm thế nào? Dưới đây là một số cách giúp bạn thwujc hiện việc này một cách dễ dàng.
## 3.1 Đăng ký service với setService
Làm thử một ví dụ đơn giản để bạn hiểu rõ hơn nhé :

Step 1: Tạo ra thư mục **Service** bên trong thư mục **src** 

Step 2: Bên trong folder **Service** tạo ra file **CircleApp.php**

Thư mục trông sẽ giống như này :
```php
/module
     /Blog
         /config
         /src
             /Controller
             /Service
                 /CircleApp.php
    
```
Step 3 : Mở file CircleApp.php cập nhật code như sau:

```php
<?php
namespace Blog\Service;

class CircleApp
{
    //Trả về chu vi theo bán kính $r
    public function Perimeter($r) {
        return 2*$r*3.14;
    }

    //Trả về diện tích theo bán kính $r
    public function Area($r) {
        return $r*$r*3.14;
    }
}
```
Step 4 : Sử dụng
* Với cách xây dựng code trong cấu trúc thư mục trên và cách khai báo *namespace* như vậy, bạn tạo ra một lớp **CircleApp** có thể sử dụng bất kỳ đâu. Ví dụ sử dụng trong controller, thêm vào phương thức *IndexAction*
```php
public function indexAction()
{
    $hinhtron = new Blog\Service\CircleApp();
    $dientich = $hinhtron->Area(150);

    echo $dientich;

    return new ViewModel();
}

```
* Nhưng giờ bạn muốn biến **CircleApp** trở thành một dịch vụ thuộc *ServiceManager*, cách đơn giản là sử dụng phương thức **setService** của SM với cú pháp :
```php
$serviceManager->setService($servicename, $serviceobject);

//$servicename - tên dịch vụ do bạn tự đặt
```
*  Để thực hiện đăng ký, mở **Module.php** ra, cập nhật *onBootstrap* như sau:
```php
public function onBootstrap(\Zend\Mvc\MvcEvent $e)
{
    $serviceManager =  $e->getTarget()->getServiceManager();

    $circleservice = new Blog\Service\CircleApp();

    $serviceManager->setService("DichvuHinhTron", $circleservice);
}
```
* Bằng cách đó, giờ trong hệ thống *Service Manager* của bạn đã có một dịch vụ có tên "DichvuHinhTron", bất kỳ ở đâu có SM, bạn có thể lấy dịch vụ này ra dùng như mã sau:
```php
$htron = $serviceManager->get("DichvuHinhTron");
$dientich = $htron->Area(10);
```
Lưu ý, nếu tên dịch vụ đã có và muốn ghi đề đối tượng mới thì phải thực hiện $serviceManager->setAllowOverride(true);
## 3.2 Đăng ký dịch vụ với setInvokableClass
Có một điều không tốt với phương thức setService () là bạn phải service instance trước khi bạn thực sự cần nó.

Nếu bạn không bao giờ sử dụng service đó, việc khởi tạo dịch vụ sẽ chỉ lãng phí thời gian và bộ nhớ. Để giải quyết vấn đề này, *service manager* cung cấp cho bạn phương thức **setInvokableClass ()**.

Cú pháp : 
```php
$serviceManager->setInvokableClass(classname);
```

Có thể sửa lại trong file **Module.php** như sau :
```php
$serviceManager->setInvokableClass(\Blog\Service\CircleApp::class);
//Hoặc $serviceManager->setInvokableClass("\Blog\Service\CircleApp");

//Lấy dịch vụ
$htron = $serviceManager->get(Blog\Service\CircleApp::class);
```
Trong ví dụ trên, đã đăng ký service manager với tên lớp đủ của service thay vì chuyển instead của nó.

Với kỹ thuật này, service sẽ được service manager khởi tạo chỉ khi ai đó gọi phương thức get (CircleApp :: class)
## 3.3 Đăng ký dịch vụ với InvokableFactory
Một lớp factory thì chỉ có duy nhất một chức năng: tạo đối tượng. Trong SM có phương thức setFactory() dùng để đăng ký một dịch vụ bằng factory. 

Dùng factory để tạo ra đối tượng trong trường hợp muốn trước khi tạo ra đối tượng mong muốn cần thi hành một số tác vụ, hoặc tạo đối tượng khác, truyền tham số cho đối tượng cần tạo ...

Cú pháp để đăng ký như sau:
```php
$serviceManager->setFactory('servicelassname', 'factoryclassname');
```
Ví dụ: đăng ký dịch vụ CircleApp ở trên bằng factory
```php
<?php
use Zend\ServiceManager\Factory\InvokableFactory;
//...
//...
$serviceManager->setFactory(\Blog\Service\CircleApp::class, InvokableFactory::class);
```
## 3.4 Tạo Factory riêng
Việc tạo ra một Factory dùng để khởi tạo đối tượng và đăng ký trong Service Manager, bạn có thể tạo ra một lớp triển khai giao diện Zend\ServiceManager\Factory\FactoryInterface

Trở lại ví dụ trên trong thư mục Service sẽ tạo một lớp factory tên là CircleAppFactory, tạo ra file CircleAppFactory.php và cập nhật nội dung lớp, chú ký implement giao diện FactoryInterface định nghĩa hàm __invoke theo đúng mẫu về tham số và trả về đối tượng cần tạo.
```php
<?php 
namespace Blog\Service\Factory;

use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CurrencyConverter;

// Factory class
class CurrencyConverterFactory implements FactoryInterface
{
    public function __invoke(ContainerInterface $container, 
                     $requestedName, array $options = null) 
    {
        // Create an instance of the class.
        $service = new CircleApp();	
	
        return $service;
    }
}
```
Đã có Factory thì có thể tiến hành đăng ký theo cú pháp trên như sau:
```php
$serviceManager->setFactory(\Blog\Service\CircleApp::class,
                            \Blog\Service\CircleAppFactory::class);
```
Trong ví dụ trên, ở factory đã khởi tạo đối tượng và truyền tham số $container vào CircleApp, đây chính là kỹ thuật Inject, lấy đối tượng Service Manager hay các đối tượng khác.
## 3.5 Cấu hình Service Manager
Thay vì việc phải sử dụng các phương thức của SM để đăng ký dịch vụ, bạn có thể sử dụng hệ thống cấu hình của ứng dụng, module để đăng ký. 
Mở các file module.config.php cấu hình cấp độ ứng dụng hoặc cấp độ module thiết lập cấu hình dạng như sau:
```php
<?php
return [
    //..
    // Đăng ký dịch vụ dưới key này
    'service_manager' => [
        'services' => [
           // Đăng ký đối tượng dịch vụ
        ],
        'invokables' => [
           // Đăng ký các lớp dạng invokable
        ],
        'factories' => [
           // Đăng ký các lớp dạng factory
        ],
        'abstract_factories' => [
           // Đăng ký các lớp dạng abstract factory

        ],
        'aliases' => [
           // Khóa tắt cho tên các dịch vụ (tên tắt)

        ],
        'shared' => [
            // Các dịch vụ dạng non-shared (tạo mới mỗi lầ get)
        ]
    ],

    //...
];
```
Ví dụ: mở file module.config.php thêm vào nội dung:
```php
'service_manager' => [
    'factories' => [
       \Blog\Service\CircleApp::class
                => \Blog\Service\CircleAppFactory::class
    ],
    
    'aliases' => [
        'CircleApp' => \Blog\Service\CircleApp::class
    ]
    ]
```
Đây là cách làm mà không cần gọi trức tiếp các phương thức của ServiceManager, mà hệ thống ứng dụng tự động nạp config, và kích hoạt SM nhận các tham số trên và khởi tạo theo khai báo và kết quả nhận được là tương tự. 

Đây là cách được sử dụng phổ biến nhất khi đăng ký service manager, cách này khuyến khích sử dụng
# Kết luận
Trên đây mình đã giới thiệu với các bạn về service manager, cách dùng và cách đăng ký, mong rằng nó sẽ giúp ích được cho các bạn. trong bài viết tiếp theo mình sẽ đi sâu về controller trong ZF3

Thank you for reading ^^

Tham khảo :
* https://xuanthulab.net/service-manager-co-ban-trong-zend-framework.html
* https://olegkrivtsov.github.io/using-zend-framework-3-book/html/en/Website_Operation/Service_Manager.html