Vai trò của Controller, lớp cơ sở AbstractController, các tác vụ trong action như đọc HTTP Request GET / POST, cách config đăng ký controller trong ZF
# Controller của Zend Framework
* Một controller cung cấp sự tương giữa ứng dụng, model, các view: nó nhận HTTP request gửi đến, nó sử dụng các model và view tương ứng để tạo ra HTTP response.

* Controller của module code của nó thường đặt trong thư mục con có tên Controller.

* Zend Skeleton Application đã cung cấp cho bạn module tên là Application và bên trong nó có một controller tên lớp là IndexController. IndexController là controller Index có mã như dưới đây:

```php
<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
}
```
* Từ mã trên, bạn thấy
    * Controller thường định nghĩa namespace riêng (Application\Controller).
    * Controller Index của module Application được xác định với namespace Application\Controller
    * Một controller thường xây dựng từ một lớp kế thừa từ lớp AbstractActionController hoặc AbstractController
    * Mặc định, một lớp controller thường chứa một phương thức action là indexAction(), thường trong ứng dụng bạn sẽ xây dựng nhiều phương thức action như vậy trong nó.
    
   *ZF3 có cách tổ chức các phương thức action (phương thức gọi tương ứng với phân tích URL) bằng tên action theo sau là hậu tố Action, như indexAction()*
*    Mỗi action trong Controller thi hành một tác vụ và trả một trang Web. Ví dụ bạn xây dựng các action: indexAction là trang chủ, aboutAction() hiện thị trang giới thiệu, contactUsAction() hiện thị trang liên hệ ...
# Lớp cơ sở của Controller
Các controller bạn xây dựng, kế thừa từ lớp cơ sở của ZF là AbstractActionController hoặc AbstractController, như vậy tại các phương thức của controller có thể gọi các phương thức sau:
![](https://images.viblo.asia/055bc0ae-02f3-4620-9034-73bc23ff07f3.png)
# Controller lấy thông tin HTTP Resquest
* Như trên đã trình bày, trong các phương thức action của controller có thể gọi getRequest để lấy đối tượng Request, có được đối tượng này sẽ có được các thông tin gửi đến từ khách (xem HTTP Resquest để biết các phương thức hay dùng)
```php
public function indexAction()
{
    $request = $this->getRequest();
    if ($request->isGet())
        echo "HTTP Method là GET<br>";

    echo "Cookie:<br>";
    echo $request->getCookie()."<br>";


    return new ViewModel();
}
```
# Đọc các biến POST / GET
* Để nhận các biến GET hoặc POST trong yêu cầu HTTP (như PHP thuần ở các biên $GET, $POST), bạn hoàn toàn chỉ cần dùng Request lấy được từ phương thức getRequest() như cách phần trên. Ngoài ra trong Controller còn cung cấp thêm một Plugin là params() để lấy các biến này linh hoạt hơn

```php
// Lấy biến từ GET
$getVar = $this->params()->fromQuery('var_name', 'default_val');

// Lấy biến từ POST
$postVar = $this->params()->fromPost('var_name', 'default_val');
```
* Trong đó 'defautl_val' là giá trị trả về nếu tên biến 'var_name' không tồn tại.
# Chèn dữ liệu vào HTTP Response
* HTTP Response là đối tượng trừu tượng hóa HTTP Message sẽ trả về cho khách, như trên trong Controller lấy đối tượng này bằng phương thức getResponse(). Thường thì ít khi bạn can thiệp vào đối tượng này mà đối tượng này tự động chứa các thông tin theo logic hoạt động của MVC trong Zend Framework. Tuy nhiên, bạn vẫn có thể can thiệp thiết lập các giá trị mong muốn cho HTTP Response sau khi lấy được đối tượng này bằng các phương thức mô tả tại HTTP Respone

* Thiết lập mã trả về thành 404 (trang không thấy)

```php
$this->getResponse()->setStatusCode(404);
```
* Thiết lập dòng header

```php
$headers = $this->getResponse()->getHeaders();
$headers->addHeaderLine(
"Content-type: application/octet-stream");
```
* Thiết lập nội dung trả về

```
$this->getResponse()->setContent('Some content');
```
* Nếu sau khi thiết lập mà phương thức Action trả về luôn Response, thì quá trình trao đổi MVC của ứng dụng sẽ dừng lại và trả về đúng HTTP Response đó

```php
public function indexAction()
{
    $headers = $this->getResponse()->getHeaders();
    $headers->addHeaderLine(
    "Content-Type:application/json");

    $data = ['name' => 'XT', 'website'=>'xuanthulab.net'];
    $this->getResponse()->setContent(json_encode($data));

    return $this->getResponse();
}
```
# Túi chứa biến trong Controller
* Sau khi có được thông tin từ HTTP Request, bạn thực hiện một số tác vụ với dữ liệu đó (thường sẽ sử dụng layer model), sau đó trả dữ liệu về. Dữ liệu trả về từ Action lưu trong các biến, và ZF có một lớp gọi là ViewModel mà Action sử dụng để chuyển các biến vào đó sau đó trả về đối tượng ViewModel như một túi chứa dữ liệu.
* Bạn mở action indexAction của Controller IndexController trong module Application của chương trình Skeleton ra bạn thấy nó tạo và trả về một ViewModel ở dòng cuối:
```php
return new ViewModel();
```
* Lớp ViewModel là một thành phần của zend-view trong xây dựng MVC, ViewModel sẽ được chuyển cho View để dựng mã HTML. Cấu trúc ViewModel và cách sử dụng nó rất đa dạng, ở đây chỉ đề cập đơn giản về thiết lập chứa dữ liệu của action

# Thiết lập dữ liệu ngay khi khởi tạo ViewModel
* Cú pháp :
```php
return new ViewModel([
        'name1' => $value1,
        'name2' => $value2,
         //...
    ]);
```
* Ví dụ:
```php
public function indexAction()
{
    $title = 'Lập trình Zend Framework';
    $des   = 'Học Zend Framework bắt đầu từ Zend Skeleton Application';
    $content = "ZEND";

    return new ViewModel([
        'tieude'  => $title,
        'mota'    => $des,
        'noidung' => $content
    ]);
}
```
* Như vậy dữ liệu truyền cho ViewModel bạn thấy nó là một mảng kết hợp, mỗi tên khóa key tương ứng với một dữ liệu. Dữ liệu mảng này lưu trong ViewModel và sau này để PhpRender sử dụng để dựng HTML
# Một số phương thức của ViewModel
![](https://images.viblo.asia/40a9902e-eaae-416b-857b-c3aaf5921e6a.png)
* Nếu sử dụng phương thức bạn có thể thực hiện lại ví dụ trên như sau:
```php
public function indexAction()
{
    $title = 'Lập trình Zend Framework';
    $des   = 'Học Zend Framework bắt đầu từ Zend Skeleton Application';
    $content = "ZEND";

    $view = new ViewModel();

    //gán một biến
    $view->setVariable('tieude',$title);

    //gán nhiều biến
    $view->setVariables(['mota' => $des, 'noidung' => $content]);

    return $view;
}
```
# Trả về báo lỗi từ action của Controller
* Trong một số trường hợp, nếu dữ liệu người dùng truy vấn không hợp lệ thì action bạn xây dựng có thể trả về trang thông báo lỗi với mã cụ thể ví dụ 404.
* Để làm điều này có thể đơn giản là thiết lập mã 404 có Response và return không xử lý tiếp code của Action
* Ví dụ :
```php
public function indexAction()
{
    // Lấy ID ở của từ URL request
    $id = (int)$this->params()->fromQuery('id', null);

    // Kiểm tra id, giả sự nếu id == 1000 sẽ báo lỗi
    if ($id  == 1000) {
        $this->getResponse()->setStatusCode(404);
    return;
}

return new ViewModel();
}
```
* Hãy chạy thử ví dụ với địa chỉ http://localhost/zf3/?id=1000 để xem lỗi
* Một cách nữa, là phát sinh một Exception
```php
public function indexAction()
{
    // Lấy ID ở của từ URL request
    $id = (int)$this->params()->fromQuery('id', null);

    // Kiểm tra id, giả sự nếu id == 1000 sẽ báo lỗi
    if ($id  == 1000) {
        throw new \Exception("Mã ID=$id không tìm thấy trong dữ liệu");
    }

    return new ViewModel();
}
```
# Đăng ký Controller
* Các lớp controller xây dựng trong một module theo cấu trúc và viết mã như trên để hệ thông MVC của Zend Framework nhận ra lớp đó là một controller thì cần phải đăng ký theo hệ thống cấu hình của module
* Bạn mở file module.config.php đoạn mã đăng ký controller vào hệ thống đó là:
```php
'controllers' => [
    'factories' => [
        Controller\IndexController::class => InvokableFactory::class,
    ],
],
```
# Đăng ký controller với InvokableFactory
* Trong ZF có lớp Zend\ServiceManager\Factory\InvokableFactory được dùng để khởi tạo đối tượng lớp (theo mô hình lập trình factory). Áp dụng khai báo đăng ký controller có sử dụng InvokableFactory, thì thực hiện bằng cách khai báo

```
'factories' => [
    class_controller => InvokableFactory::class,
],
```
* class_controller là tên đầy đủ của lớp controller (gồm cả namespace) ví dụ như 'Application\Controller\IndexController', tên này sẽ được lớp InvokableFactory dùng để tìm đến lớp định nghĩa controller khi cần và cũng trở thành tên ám chỉ controller của các cấu hình khác. Trong PHP 7 dùng text 'Application\Controller\IndexController' có thể thay thế bằng Application\Controller\IndexController::class

# Đăng ký với một lớp Factory tự xây dựng
* Cách đăng ký ở phần trên, thì mỗi khi cần lấy controller theo tên key đăng ký thì SM sẽ tạo ra lớp controller nếu đối tượng lớp chưa tồn tại bằng khởi tạo hàm tạo mặc định (new Controller()). Nhưng nhiều trường hợp bạn muốn trước khi controller được tạo bạn muốn thi hành một số tác vụ, bạn muốn tự tạo ra một số lớp liên quan khác trước, bạn muốn truyền một số loại dữ liệu vào controller khi tạo (inject)... thì lúc này bạn cần xây dựng một lớp khởi tạo (Factory riêng), và đăng ký controller theo factory đó.
* Ví dụ bạn tạo ra một Factory trong thư mục Factory trong thư mục src của module Application, dùng để khởi tạo ra lớp controller IndexController
* Bạn khai báo lớp này tên là IndexControllerFactory, theo cấu trúc mẫu như sau:
```php
<?php
namespace Application\Controller\Factory;

use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CurrencyConverter;
use Application\Controller\IndexController;

class IndexControllerFactory implements FactoryInterface
{
    public function __invoke(ContainerInterface $container,
                             $requestedName, array $options = null)
    {

        //các code muốn thi hành trước khi tạo controller
        //các lớp muốn tạo ra trước khi tạo controller ở đây

        // khởi tạo controller theo các loại hàm khởi tạo mong muốn
        // như new IndexController($a, $b ...);
        // hoặc sử dụng hàm setter để inject

        return new IndexController($objectinject);
    }
}
```
* Chú ý các Factory bạn tạo đúng theo cấu trúc này, tức triển khai theo giao diện FactoryInterface
* Đã có lớp Factory riêng, việc đăng ký controller sẽ thực hiện tương tự như trên
```php
'factories' => [
      Controller\IndexController::class
          => Controller\Factory\IndexControllerFactory::class,
],
```
## Biến chính lớp Controller thành chính lớp Factory
* Bạn đơn giản, thêm vào lớp IndexController phương thức __invoke với cấu trúc như sau:
```php
public function __invoke($container)
{
    //$container chính là đối tượng Service Manager của hệ thống
    //thực hiện tạo các đối tượng khác ở đây

    //Quan trọng
    return $this;
}
```
* Lúc đó có thể khai báo đăng ký
```php
'factories' => [
      Controller\IndexController::class
          => Controller\IndexController::class,
],
```
# Kết luận
Tham khảo : https://xuanthulab.net/zend-mvc-controller-trong-zend-framework.html