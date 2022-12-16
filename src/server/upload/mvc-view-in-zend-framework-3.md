Trong bài viết lần này mình sẽ nói về view trong zend 3. Sự hoạt động cơ bản của View trong Zend Framework, cách tạo ra các template .phtml theo cấu trúc thư mục mặc định, tìm hiểu ViewModel truyền dữ liệu đến View, tạo các view helper cũng như cách thay đổi các template trong zend 
# View
* Các view là layer hiện thị dữ liệu, trình diễn dữ liệu (xuất trang HTML trả về cho người dùng). Zend Framework 2,3 View chính là các file template mà phần mở rộng là .phtml (PHP + HTML)
* Các file template có phần mở rộng .phtml bởi vì chúng trộn lẫn code PHP và mã HTML để phát sinh trang web. 
> * Bạn chú ý là các template (.phtml) được chứa trong thư mục view của module, về nguyên tắc thì bạn có thể đặt ở bất kỳ đầu nhưng làm điều này bạn thật sự hiểu mục đích làm của mình, ví dụ nếu đặt trong thư mục src do cơ chế autoload của PHP có thể dẫn tới xung đột. Mặt khác các template được ZF3 cấu hình với resolver để tự động quét các thư mục view để có được template phù hợp.
* Các template có thể có các ứng sử khác nhau, dựa trên biến được chuyển tới từ các action của controller. Dữ liệu chuyển tới template bằng đối tượng chứa biến ViewModel
* Khi action trả về ViewModel (chứa dữ liệu), hệ thống quản lý module, controller tự động phân tích và nạp template tương ứng sau đó chuyển cho nó ViewModel để nó dựng HTML.
# View Helper
* Các View Helper cơ bản trong ZF như Url, Part và cách xây dựng một helper riêng tích hợp vào hệ thống MVC của Zend Framework
* View Helper khá giống với Controller Plugin, nó mở rộng chức năng cho template, bạn có thể gọi các Helper này trong template để thực hiện render các HTML đặc trưng nào đó, hoặc các tác vụ nào đó. Mỗi view helper giống với các widget (menu, navigator ...).
* Trong template .phtml $this trỏ đến đối tượng PhpRender, để gọi một helper thường dùng cú pháp: $this->namehelper()
##  Các Helper hay dùng
| Helper  | Chi tiết |
| -------- | -------- |
| BasePath     | Lấy địa chỉ theo base path. |
|Url|	URL từ route|
|ServerUrl|	URL server|
|Doctype|Lấy doctype|
|HeadTitle|Thiết lập Title của trang|
|HtmlList|Sinh mã HTML list : ul/ol|
|ViewModel|Lấy ViewModel|
|Layout|Lấy template layout (template gốc)|
|Partial|Dựng HTML từ một template khác $this->Partial($template)|
|InlineScript|Lấy, thiết lập mã JS cho trang|
|Identity|Lấy định danh User đang truy cập|
|FlashMessenger|Lấy FashMessage|
|EscapeHtml|escape chuỗi ví dụ biến < thành &lg;|
* Ví dụ :
```php
<h1>Giới thiệu</h1>
<h2>BasePath</h2>
<p><?=$this->BasePath()?></p>
<p>
    <?=$this->BasePath('public/css/mycss.css')?>
</p>
<h2>Url</h2>
<p>Home: <?=$this->url('home')?></p>
<p>About: <?=$this->url('application', ['action'=>'about'])?></p>

<h2>ServerUrl</h2>
<p><?=$this->ServerUrl()?></p>

<h2>doctype</h2>
<?=$this->EscapeHtml($this->doctype()) ?>
<h2>HeadTitle</h2>
<?=$this->HeadTitle('Tiêu đề trang') ?>

<h2>HtmlList</h2>
<?
    $items = [
        'Cấp 1',
        [
            'Cấp 2',
            'Cấp 2',
            [
                'Cấp 3',
                'Cấp 3'
            ],
            'Cấp 2'
        ],
        'Cấp 1'
    ];

    $attribs = array(
        'class' => 'foo',
    );

?>
<h3>UL</h3>
<?=$this->HtmlList($items) ?>

<h3>OL</h3>
<?=$this->HtmlList($items, true, $attribs) ?>
```
## Tạo Helper riêng
* Đơn giản bạn tạo ra lớp kế thừa Zend\View\Helper\AbstractHelper
* Ví dụ tạo ra lớp Helper có tên MyHelper
```php
//File: module/Application/src/Helper/MyHelper.php

<?php
namespace Application\Helper;

use Zend\View\Helper\AbstractHelper;
class MyHelper extends AbstractHelper
{
    public function __invoke($text)
    {
        return "<quote class='myclass'>$text</quote>";
    }

}
```
* Sau khi có lớp Helper \Application\Helper\MyHelper như trên, đăng ký vào hệ thống, thêm vào module.config.php với một key mới và nội dung như sau

```php
'view_helpers'=>[
    'invokables' => [ //ngoài ra có factories ... xem controller plugin
        'testhelper'       => \Application\Helper\MyHelper::class,
    ],
],
```
* Giờ các template đã có một view helper tên là testhelper, mở file about.pthml cập nhật nội dung sau rồi chạy thử kiểm tra
```php
<h1>Giới thiệu</h1>
<?=$this->testhelper("THIS IS HELPER"); ?>
```
# Template trong ViewModel
* Khi bạn trả về dữ liệu với biến ViewModel từ action của controller, Zend Framework sẽ biết được file template đi kèm với nó.
* Trong đối tượng ViewModel có lưu tên biến template là tên để dẫn tới file template (có chế tìm đến file template có thể tên đã được gán trong config, hay là tên nằm trong thư mục thiết lập chứa template), có phương thức getter/setter trên thuộc tính này.
    * **setTemplate($template)** thiết lập tên template vào ViewModel
    * **getTemplate($template)** lấy tên template của ViewModel
* Nếu khi action trả về ViewModel mà không thiết lập giá trị cụ thể tên template cho ViewModel, thì ZF tự động xác định tên template căn cứ theo tên Controller và tên Action. Như aboutAction() trong IndexController của module Application thì ZF3 tự động sử dụng 'application/index/about'. Còn nếu trước khi trả về, action sử dụng phương thức setTemplte để thiết lập, thì giá trị thiết lập sẽ được sử dụng.
## Resolver
* ZF làm thế nào để tìm được đến các file template, nó sử dụng cơ chế xác định file gọi là Resolver, chi tiết về Resolver mình sẽ viết ở 1 bài khác nhé 
* Cơ bản thì có hai kiểu: TemplateMapResolver và TemplatePathStack
    * TemplateMapResolver tập hợp ánh xạ giữa tên đặt và đường dẫn vật lý chính xác đến file (Resolver sẽ tìm tên trong tập hợp này trước)
    * TemplatePathStack tập hợp các thư mục mà Resolver sẽ tìm theo cấu trúc tương đối.
* Cấu hình các thông số này đều khai báo trong module.config.php, tại vị trí phần tử view_manager, bạn hãy mở file đó ra, và nội dung phần này là:
```php
<?php
return [
    //...

    'view_manager' => [
        //...

        'template_map' => [
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
```
* Như vậy bạn thấy, đầu tiên Resolver sẽ tìm các key trong **template_map**, nếu thấy sẽ sử dụng template theo đường dẫn, ví dụ nếu template name thiết lập là **application/index/index** thì sẽ thấy trong template_map đường dẫn đầy đủ đến file là: __DIR__ . '**/../view/application/index/index.phtml**'
* Khi không thấy trong template_map sẽ tìm theo đường dẫn với thông số là tìm các thư mục định nghĩa trong **template_path_stack**. Ví dụ nếu tên template là '**application/index/about**', ta thấy nó sẽ tìm trong **template_path_stack** vì trong **template_map** không thấy. Lúc này thì nó sẽ quét các thư mục trong **template_path_stack**, đến khi tìm thấy một file mà có cấu trúc đường dẫn tương đối trùng với **application/index/about** thì trả về file đó, tất nhiên chỉ tìm trong các thư mục chỉ ra trong config, ví dụ trên là: __DIR__ . '**/../view**'
##  Đổi Template
* Với phương thức setTemplate($template) bạn có thể thay đổi file template mong muốn, thậm chí thay cả layout file.
```php
public function aboutAction()
{

    $template_custome = 'application/index/about1.phtml';
    $layout_custome = 'application/index/layoutnew.phtml';



    $view = new ViewModel();

    //Đổi template
    $view->setTemplate($template_custome);


    //Thậm chí đổi layout, nhớ là layout mới phải có
    //đoạn code: echo $this->content;
    $this->layout()->setTemplate($layout_custome);


    return $view;
}
```
## Hủy template
* Áp dụng các trường hợp trả về một HTTP Response mà không sử dụng đến layout và template, trường hợp có dụng template mà không dùng layout
### Hủy quá trình Render View
* Nhiều khi bạn muốn hủy đi quá trình Render HTML trong View theo logic thông thường, thật đơn giản bạn cần trả về một HTTP Requesta từ action. Vì nếu action trả về một Response chứ không phải một ViewModel, array thì quá trình dùng template để phát sinh HTML sẽ dừng lại, và HTTP Response sẽ được chuyển ngay về cho client.
* Còn một trườn hợp nữa, bạn vẫn render template, nhưng kết quả trả về luôn không chuyển nội dung vao layout. Lúc này bạn chỉ cần thiết lập $viewmodel->setTerminal(true);
* **Ví dụ Zend Framework trả về JSON đơn giản**
    * Trở lại ví dụ Skeleton, bạn tạo một action tên là json trong controller IndexController của module Application, với yêu cầu dừng lại quá trình render template và trả về nội dung dữ liệu dạng json đơn giản. Bạn thêm action vào như sau:
```php
//file: module/Application/src/Controller/IndexController.php
//...
    public function jsonAction() {
        $response = $this->getResponse();

        $response->setStatusCode(\Zend\Http\Response::STATUS_CODE_200);
        $response->getHeaders()->addHeaders(['Content-type' => 'application/json']);
        $data = [
            'name' => 'YourName',
            'age' => 30,
            'gender' => 'female'
        ];
        $response->setContent(json_encode($data));
        return $response;

    }
//...

Kết quả : {"name":"YourName","age":30,"gender":"female"}
```
* **Ví dụ ZF chỉ sử dụng template, không dùng tới layout**
* Trở lại ví dụ trên, bạn thêm một action tên nolayout *module/Application/src/Controller/IndexController.php*
```php
//...
public function nolayoutAction() {

    $view = new ViewModel();
    $view->setTerminal(true);

    return $view;
}

//...
```
* Sau đó tạo template cho action nolayout, với nội dung

*/view/application/index/nolayout.phtml*
```php
<!DOCTYPE html>
<html>
    <head>
        <title>This no layout</title>
    </head>

    <body>
        <h1>Xin chào!</h1>
        <p>Nội dung này không có sử dụng layout</p>
    </body>
</html>
```
kết quả :
![](https://images.viblo.asia/8f635617-6dcc-4c99-ad23-f060127d1390.png)
### Ví dụ tạo tiện ích download file
Giả sử có các file cho phép download lưu ở thư mục '/data/download/', khi người dụng nhập đường dẫn dạng http://localhost:8080/download?name=filename, thì sẽ cho phép tải file có tên filename trong thư mục đó.
* **Bước 1 - Mã Controller**
    * Do trả về không phải là HTML mà là nội dung file, nên bạn xây dựng một controller mới tên là Download, trong nó xây dựng một action tên là down, nội dung controller đó như sau:
```php
//module/Application/src/Controller/DownloadController.php

<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;

class DownloadController extends AbstractActionController
{

    public function downAction() {
        $fileName = $this->params()->fromQuery('name', '');

        // Xử lý an toàn tên file
        $fileName = str_replace("/", "", $fileName);
        $fileName = str_replace("\\", "", $fileName);

        // Thử mở file
        $path = './data/download/' . $fileName;
        if (!is_readable($path)) {
            $this->getResponse()->setStatusCode(404);
            throw new \Exception("$fileName : File not found");

            return;
        }

        $fileSize = filesize($path);

        $response = $this->getResponse();
        $headers = $response->getHeaders();
        $headers->addHeaderLine(
            "Content-type: application/octet-stream");
        $headers->addHeaderLine(
            "Content-Disposition: attachment; filename=\"" .
            $fileName . "\"");
        $headers->addHeaderLine("Content-length: $fileSize");
        $headers->addHeaderLine("Cache-control: private");

        // Write file content
        $fileContent = file_get_contents($path);
        if($fileContent!=false) {
            $response->setContent($fileContent);
        } else {
            // Set 500 Server Error status code
            $this->getResponse()->setStatusCode(500);
            return;
        }

        return $this->getResponse();

    }
}
```
* **Bước 2 - Đăng ký Controller**
```php
// module/Application/config/module.config.php

//...
'controllers' => [
    'factories' => [
        Controller\IndexController::class => InvokableFactory::class,
        Controller\DownloadController::class => InvokableFactory::class
    ],
    ],
//...
```
   *Bước trên cho biết trong hệ thống controller có tồn tại **Controller\DownloadController::class***
*    **Bước 3 - Thiết lập Route**
        * Tạo ra một route cho phép truy cập vào địa chỉ  http://localhost:8080/download 
        * Thêm vào module/Application/config/module.config.php, vào bên trong phần tử routes (có sẵn 2 phần tử con là home và application - giờ thêm downoadfileshare)
```php
//...
    // Đoạn thêm
    'downoadfileshare' => [
        'type'    => Segment::class,
        'options' => [
            'route'    => '/download[/:action]',
            'defaults' => [
                'controller'    => Controller\DownloadController::class,
                'action'        => 'down',
            ],
        ],
    ],

//...
```
Giờ bạn cho một số file vào thư mục /data/download/ rồi gõ url theo cấu trúc http://localhost:8080/download?name=download1.docx để kiểm tra, vd ở đây là file download1.docx trong /data/download/
# Kết luận
Tham khảo : [Tại đây](https://xuanthulab.net/huy-qua-trinh-render-template-thong-thuong-cua-zend-framework.html)