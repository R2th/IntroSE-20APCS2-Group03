Trong bài viết trước mình đã giới thiệu cơ bản về zend và cách cài đặt, trong bài viết này mình hướng dẫn cách tạo ra một module mới trong zend
* [Start with Zend Framework 3 (Part I)](https://viblo.asia/p/start-with-zend-framework-3-part-i-1Je5EeDY5nL)

Zend-mvc sử dụng một hệ thống module riêng để tổ chức các source code

Trong ứng dụng zend Skeleton đã cài đặt sẵn một module là Application. Nó được sử dụng để cung cấp sẵn bootstrapping, error và routing configuration cho toàn bộ ứng dụng và thường được sử dụng để cung cấp các controller mức độ ứng dụng cho trang chủ hệ thống.
# 1. Cài đặt một Blog Module
* Đầu tiên tạo ra một thư mục Blog như cấu trúc bên dưới :
```php
Zend_Demo/
    /module
        /Blog
            /config
            /src
                /Controller
                /Form
                /Model
            /view
                /blog
                    /blog
```
* Trong đó :
    * **config**:  sẽ chứa các file config cho module 
    * **src** : sẽ chứa các controller, model, form, repository,...
    * **view** : sẽ chứa các file giao diện của module
* Tạo ra một Module class trong folder src.
```php
//Blog/src/Module.php

namespace Blog;

use Zend\ModuleManager\Feature\ConfigProviderInterface;

class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
}
```
* Để load và config một mô-đun, Zend Framework cung cấp một `ModuleManager`. `ModuleManager` sẽ tự động gọi function `getConfig()`
* Trong `getConfig()` sẽ gọi đến file config.php trong `Blog/config/module.config.php`, file này dùng để cấu hình cho module ,sẽ được viết sau.
# 2. Autoloading
* Mặc dù Zend Framework cung cấp khả năng autoloading thông qua  zend-loader component, nhưng bạn nên sử dụng khả năng autoloading của Composer. Như vậy, chúng ta cần thông báo cho Composer về new namespace và where its files live.
* Mở file composer.js trong thư mục gốc của dự án và tìm đến phần "autoload" . Mặc định ở đây đã khai báo Application module, chúng ta sẽ thêm blog module vào :
```php
"autoload": {
    "psr-4": {
        "Application\\": "module/Application/src/",
        "Blog\\": "module/Blog/src/" //Thêm ở đây
    }
},
```
* Trong thư mục config của dự án mở file modules.config.php và thêm vào tên module
```php
// config/mdules.config.php
return [
    'Zend\Form',
    'Zend\Db',
    'Zend\Router',
    'Zend\Validator',
    'Application',
    'Blog',//Thêm ở đây
];
```
* Zend Framework cung cấp một `ModuleManager`. Nó sẽ tìm kiếm tên module được khai báo trong file config/modules.config.php của ứng dụng, sau đó vào module để tìm file `Module.php` 
* Trong trường hợp ở đây tên module chính là Blog và nó sẽ tìm kiếm file `Module.php`  trong `module/Blog/src/`. 
* Sau khi thêm xong chạy câu lệnh `composer dump-autoload` để tự động cập nhập các module.
# 3. Configuration
* Tạo ra file `Blog/src/Controller/BlogController.php`
```php
<?php
namespace Blog\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class BlogController extends AbstractActionController
{

    public function indexAction()
    {
        return new ViewModel();
        
    }
}
```
Tạo ra file view `Blog/view/blog/blog/index.phtml`
```php
<h1>Hello My First Application</h1>
```
*  Tạo ra file `Blog/config/module.config.php`, như đã nói ở trên file này dùng để cấu hình cho module:
```php
<?php

namespace Blog;

use Zend\Router\Http\Literal;
use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;

return [
    'router' => [
        'routes' => [
            'blog' => [
                'type' => Literal::class,
                'options' => [
                    'route'    => '/blog',
                    'defaults' => [
                        'controller' => Controller\BlogController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
        ],    
    ],
    'controllers' => [
        'factories' => [
            Controller\BlogController::class => InvokableFactory::class,
        ],
    ],

    'view_manager' => [
        
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];

```
*  Trong file này sẽ khai báo các router, controller, view, service manager,.. mà module sử dụng.
*  Mình sẽ nói qua về các phần có ở trên:
    *  **'router'** : Ở đây sẽ khai báo tên router, có 2 kiểu router hay dùng phổ biến nhất là `Literal  `(đường dẫn tuyệt đối) và `Segment` (đường dẫn tương đối). Ngoài ra còn một số kiểu khác như : Regex, Hostname, Scheme, Method.
        *  Trong router cũng sẽ xác định controller nào sẽ được sử dụng, ở đây là `BlogController.php`
        *  Các 'action' ở đây khai báo tên function sẽ được thực thi khi route chạy.
    *  '**controller**' : Đăng ký controller với hệ thống . Có 2 cách để đăng ký controller: 
        *  *Đăng ký controller với InvokableFactory*: Trong ZF có lớp `Zend\ServiceManager\Factory\InvokableFactory` được dùng để khởi tạo đối tượng lớp (theo mô hình lập trình factory) . Trong vd trên là đăng ký controller có sử dụng InvokableFactory.
        *  *Đăng ký với một lớp Factory tự xây dựng* :  Cái này được sử dụng trong trường hợp bạn muốn trước khi controller được tạo bạn thi hành một số tác vụ khác trước đã. Lúc này bạn cần xây dựng một lớp khởi tạo (Factory riêng), và đăng ký controller theo factory đó.
Cái này mình sẽ nói rõ hơn trong phần service manager
    *  **'view_manager'** :  Khai báo các view sẽ sử dụng cho module. Trong zend mặc định view sẽ được gọi theo đường dẫn như này : ` /view/namemodule/namecontroller/nameaction.phtml` . Nếu muốn custom, chỉ định các đường dẫn thì có thể khai báo thêm trong 'view_manage'. Vd như trong file config của Application module :
    
    ```
    'view_manager' => [
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => [
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ```
*  Ngoài ra trong file config còn cấu hình thêm nhiều thành phần khác nữa, tùy vào nhu cầu sử dụng.
*  Khi chạy `http://localhost:8080/blog` sẽ được kết quả như này :

![](https://images.viblo.asia/d8a2f22e-217b-4839-83b2-bbfe218f5e2f.png)
# Kết luận
* Trong bài viết này mình đã tạo ra một module mới và chạy, trong các bài viết tiếp theo mình sẽ tìm hiểu về service manager. Thank you for reading ^^
* Tham khảo:
    * https://docs.zendframework.com/tutorials/getting-started/modules/
    * https://xuanthulab.net/nap-thu-vien-va-module-trong-zend-framework.html