Trong bài viết trước mình đã nói về controller, cách tạo và đăng ký controller. Trong bài hôm nay mình sẽ tiếp tục nói về phần mở rộng của controller đó là controller plugin. ộTrong Controller có một số plugin như  plugin layout, url, redirect,.. 
# Controller Plugins
* Controller Plugin là một lớp mở rộng các chức năng cho tất các Controller trong ứng dụng (nếu không dùng Plugin thì các chức năng mở rộng bạn phải tự xây dựng trong một lớp cơ sở và Controller phải kế thừa lớp đó, tuy nhiên cách này rất gò bó không linh loạt trong quá trình phát triển code).

* Khi bạn đăng ký Plugin Controller, các chức năng dưới cơ chế của hệ thống MVC sẽ tự động có hiệu lực đối với tất cả các controller (Controller tự động sử dụng phương thức magic _call() như cầu nối để gọi đến controller plugin)
* Trong Zend Framework đã định nghĩa sẵn cho bạn một số Plugin Controller tiện dụng và cấu hình để chúng đã tải vào Skeleton gồm:

![](https://images.viblo.asia/31d8a019-56ac-4d09-afa8-020174473f53.png)
* Để truy cập đến Plugin trong một Controller, thật đơn giản trong các phương thức của controller chỉ việc gọi theo tên Plugin: $this->nameplugin()
```php
// Access Url plugin
$urlPlugin = $this->url();

// Access Layout plugin
$layoutPlugin = $this->layout();

// Access Redirect plugin
$redirectPlugin = $this->redirect();
```
* Ví dụ: Đọc tham số query bằng plugin params bằng cách sửa indexAction như sau:
```php
//..\zf3\module\Application\src\Controller\IndexController.php

public function indexAction()
{
    $product = $this->Params()->fromQuery('productname', null);

    return new ViewModel();use Zend\Mvc\Controller\Plugin\Url; 
 
// Inside your controller's action use the plugin() method.
$urlPlugin = $this->plugin(Url::class);
}

```
* Ngoài ra, bạn có thể gọi một plugin bằng tên đủ điều kiện của nó với phương thức plugin () như sau:
```php
use Zend\Mvc\Controller\Plugin\Url; 
 
// Inside your controller's action use the plugin() method.
$urlPlugin = $this->plugin(Url::class);
```
# Sử dụng một số Plugin chuẩn
## Forward
* Plugin này gọi một Controller/Action bằng phương thức dispatch của nó:
* Để Forward plugin hoạt động, controller gọi nó phải là ServiceLocatorAware; nếu không, plugin sẽ không thể truy xuất cấu hình and injected instance của controller được yêu cầu.
```php
 $this->forward()->dispatch($name, $params);

//$name : tên controller
//$param: mảng tham số truyền đi, các phần tử này phải chỉ ra đúng cấu trúc
//controller khai báo với các loại phần tử như 'action', 'query' ...
```
* Ví dụ sử dụng Action: testAction của controller IndexController
```php
$htmlpage = $this->forward()->dispatch('\Application\Controller\IndexController',
                                        ['action' => 'test']);
```
## Layout Plugin
* Cho phép bạn lấy đối tượng layout (chính là đối tượng ViewModel biểu diễn layout hệ thống), qua đó bạn có thiết lập một số tham số của layout dựng HTML của hệ thống MVC, như thay đổi template, như thiết lập biến truyền vào template ...Trong file ..\module\Application\config\module.config.php có dòng 'layout/layout'=> __DIR__ . '/../view/layout/layout.phtml' là định nghĩa template của layout gốc (file layout.phtml) có tên 'layout/layout'. Bạn có thể định nghĩa một layout khác để sử dụng mã lệnh trên như thêm vào khu vực đó: 'layout/newlayout' => 'đường-dẫn-đến-một-layout.phtml'
* Ví dụ bạn muốn đổi Script layout mới:
```php
$this->layout()->setTemplate('layout/newlayout');
```
* Nó cũng thực hiện magic method __invoke, cho phép gọi plugin dưới dạng gọi phương thức:
```php
$this->layout('layout/newlayout');
```

* *Trong file ..\module\Application\config\module.config.php có dòng 'layout/layout'=> __DIR__ . '/../view/layout/layout.phtml' là định nghĩa template của layout gốc (file layout.phtml) có tên 'layout/layout'. Bạn có thể định nghĩa một layout khác để sử dụng mã lệnh trên như thêm vào khu vực đó: 'layout/newlayout' => 'đường-dẫn-đến-một-layout.phtml'*
## Params Plugin
* Parms cho phép bạn truy cập vào các tài nguyên của action thông qua các phương thức như:
    * fromFiles($name) : lấy file upload, nếu $name == null, trả về mảng tất cả các file
    * fromHeader($name) : lấy header
    * fromPost($name) : lấy biến từ POST
    * fromQuery($name) : lấy biến từ chuỗi query URL
    * fromRoute($name) : lấy biến từ phân tích Route
* *Các phương thức trên nếu $name == null thì trả về mảng tất cả các đối tượng phương thức lấy*
* Plugin cũng thực hiệnmagic method __invoke, cung cấp shortcut để gọi phương thức fromRoute:
```php
$this->params()->fromRoute('param', $default);
// or
$this->params('param', $default);
```
## Redirect Plugin
* lugin cho phép chuyển hướng trang. Nó có một số phương thức
    * toRoute($route, $params, $options) : chuyển hướng đến URL phát sinh bởi Route thông qua các tham số
    * toUrl($url) : chuyển hướng đến URL
    * refresh() : nạp lại Route hiện tại
*    Mỗi phương thức trên có một Response trả về, bạn có thể lập tức return để chuyển hướng.
```php
return $this->redirect()->toRoute('login-success');
```
## Url Plugin
* Plugin giúp xây dựng URL từ định nghĩa Route, bằng cách truyền các tham số tương ứng cho phương thức fromRoute
* Cú pháp :
```php
fromRoute($route, array $params = [], $options = [], $reuseMatchedParams = false)
```
* Trong đó:
    * $route: là tên Route định nghĩa trong config (tìm hiểu sau)
    * $params: tham số truyền theo định nghĩa route ví dụ ['tite' => 'hoc-html', id => 100]
    * $options: các thiết lập bổ xung, như query, force_canonical ..., ví dụ [query => ['id'=>100], 'force_canonical' => true], (force_canonical: true xây dựng full URL gồm cả phần host)
    * $reuseMatchedParams nếu là true, sẽ sử dụng các tham số còn của URL hiện tại xây dựng nên URL mới (ví dụ $route ...)
#  Xây dựng Controller Plugin riêng
* Một Plugin tự viết đơn giản là xây dựng một lớp kế thừa Zend\Mvc\Controller\Plugin\AbstractPlugin, rồi đăng ký nó trong hệ thống cấu hình
* Ví dụ xây dựng Plugin tên SamplePlugin trong Skeleton
```php
//file: \zf3\module\Application\src\Controller\Plugin\SamplePlugin.php
<?php
namespace Application\Controller\Plugin;


use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class SamplePlugin extends AbstractPlugin
{
    public function __invoke($name = null)
    {
        if ($name == null)
            return $this;

        return "Hi, ".$name;
    }

    public function sayHello($name) {
        return "Hello, ".$name;
    }
}
```
* Sau đó đăng ký, bằng cách mở module/Application/config/module.config.php, thêm vào phần tử controller_plugins với nội dung
```php
'controller_plugins' => [
    'factories' => [
        //Đăng ký Plugin, tương tự ServiceManager
        \Application\Controller\Plugin\SamplePlugin::class
                => InvokableFactory::class,
    ],
    'aliases' => [
        //Thiết lập tên tắt gọi đến Plugin
        'testsample' => \Application\Controller\Plugin\SamplePlugin::class,
    ]
],
```
* Bằng cách đăng ký và tên tắt như vậy, giờ trong tất cả các controller đều có thể gọi Plugin bằng phương thức $this->testsample()
* Ví dụ trong IndexAction bạn cập nhật đoạn mã sau chạy để xem thử kết quả:
```php
$greeting1 = $this->testsample("A");
$greeting2 = $this->testsample()->sayHello("B");

var_dump($greeting1, $greeting2);
```
* Trong Plugin trên do có định nghĩa phương thức __invoke, nên có thể gọi ngay Plugin bằng $this->testsample($name)
* Trong AbstractPlugin có phương thức getController() giúp bạn lấy Controller gọi Plugin.
# Kết luận
* Tham khảo :
    * https://docs.zendframework.com/zend-mvc/plugins/
    * https://olegkrivtsov.github.io/using-zend-framework-3-book/html/en/Model_View_Controller/Controller_Plugins.html
    * https://xuanthulab.net/controller-plugin-trong-zend-framework.html