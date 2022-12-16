Trong bài viết này mình sẽ giải thích về cách thay đổi layout, template, kỹ thuật render với partial, placeholder trong template, cách thêm CSS, JS vào layout.
# Đổi layout ứng dụng
* Theo mặc định, ZF3 cung cấp cho bạn một mẫu layout duy nhất là layout.phtml . Trong thực tế có thể bạn cần một vài layout khác để sử dụng và việc này thực hiện cho các controler/action nhất định
* Ví dụ: bạn có thể có font-end và back-end của trang web.Font-end sẽ bao gồm các trang web hiển thị công khai cho tất cả người dùng và sẽ sử dụng layout mặc định cho tất cả các trang này. Phần back-end sẽ chỉ bao gồm các trang chỉ hiển thị cho người dùng quản trị viên và sử dụng một mẫu layout khác có chứa menu quản trị.
* Đầu tiên, chuẩn bị một file layout khác. Ví dụ  layout2.phtml. Để đơn giản hóa việc chuẩn bị tệp, sao chép nội dung của tệp layout.phtml mặc định và thực hiện thay đổi trong đó
*  Sau khi layout thứ 2 đc tạo bạn sẽ vào controller và thực hiện thay đổi layout như sau:

```php
// A controller's action method that uses an alternative
// layout template.
public function indexAction() 
{
  //...

  // Use the Layout plugin to access the ViewModel
  // object associated with layout template.
  $this->layout()->setTemplate('layout/layout2');
  
  //...
}
```
* Trong action method  ví dụ ở trên, đã sử dụng [Layout](https://olegkrivtsov.github.io/zf3-api-reference/html/classes/Zend/Mvc/Controller/Plugin/Layout.html) controller plugin cho phép truy cập vào instance của lớp ViewModel được liên kết với mẫu layout. Để thay đổi layout cho action cụ thể này, mình đã gọi phương thức setTemplate () được cung cấp bởi lớp ViewModel.
## Setting layout của tất cả Actions của Controller
* Nếu tất cả các action methods của lớp controller cần sử dụng cùng một layout thay thế, bạn có thể ghi đè phương thức onDispatch () của lớp [AbstractActionContoder](https://olegkrivtsov.github.io/zf3-api-reference/html/classes/Zend/Mvc/Controller/AbstractActionController.html) và gọi phương thức setTemplate () ở đó, như trong ví dụ dưới đây:
```php
// Add this alias in the beginning of the controller file
use Zend\Mvc\MvcEvent;

// ...

class IndexController extends AbstractActionController 
{
  /** 
   * We override the parent class' onDispatch() method to
   * set an alternative layout for all actions in this controller.
   */
  public function onDispatch(MvcEvent $e) 
  {
    // Call the base class' onDispatch() first and grab the response
    $response = parent::onDispatch($e);        
	
    // Set alternative layout
    $this->layout()->setTemplate('layout/layout2');                
	
    // Return the response
    return $response;
  }
}
```
# Partial Views
*  partial view là một  .phtml view template có thể được hiển thị bởi view template khác. Partial views cho phép soạn thảo trang của bạn và sử dụng lại các phần của view  trên các view template khác nhau.
*  Một ví dụ đơn giản về việc sử dụng partial view, hãy tưởng tượng rằng chúng ta cần hiển thị bảng của một số sản phẩm. Mỗi sản phẩm có ID, tên và giá cả. Chúng ta có thể sử dụng partial view template để hiển thị một hàng của bảng nhiều lần.
*  Thêm phương thức partDemoAction () vào IndexController :
```php
// An action that demonstrates the usage of partial views.
public function partialDemoAction() 
{
  $products = [
    [
      'id' => 1,
      'name' => 'Digital Camera',
      'price' => 99.95,
    ],
    [
      'id' => 2,
      'name' => 'Tripod',
      'price' => 29.95,
    ],
    [
      'id' => 3,
      'name' => 'Camera Case',
      'price' => 2.99,
    ],
    [
      'id' => 4,
      'name' => 'Batteries',
      'price' => 39.99,
    ],
    [
      'id' => 5,
      'name' => 'Charger',
      'price' => 29.99,
    ],
  ];
	
  return new ViewModel(['products' => $products]);
}
```
Với action method ở trên chỉ cần chuẩn bị một mảng các sản phẩm để rendering và passes  tới view template, truyền mảng product tới view sử dụng `new ViewModel(['products' => $products]);`
Tiếp theo tạo file partial-demo.phtml
```php
<?php
$this->headTitle('Partial View Demo');
?>

<h1>Partial View Demo</h1>
<p>
    Below, the table of products is presented. It is rendered with the help of
    partial views.
</p>
<table class="table table-striped table-hover">
  <tr>
    <th>ID</th>
    <th>Product</th>
    <th>Price</th>
  </tr>

  <?php 
    foreach ($this->products as $product) {
      echo $this->partial('application/index/table-row', ['product'=>$product]);
    }    
  ?>    
</table>
```
*  Ở trên đã sử dụng foreach và $this->partial() để gọi đến từng hàng trong bảng
    *  Tham số đầu tiên của Partial view helper chính là tên của view muốn sử dụng
    *  Tham số thử 2 là tham số chứa dữ liệu muốn truyền đến view đó
*  Cuối cùng tạo file view table-row.phtml
```php
<tr>
  <td> <?= $this->product['id'] ?> </td>
  <td> <?= $this->product['name'] ?> </td>
  <td> <?= $this->product['price'] ?> </td>
</tr>
```
* Truy cập vào route "http://localhost/application/partial-demo" sẽ nhìn thấy kết quả như sau:

![](https://images.viblo.asia/d3074528-aef3-4fa7-8892-b95d2099315e.png)
# Placeholder View Helper
* [ Placeholder](https://olegkrivtsov.github.io/zf3-api-reference/html/classes/Zend/View/Helper/Placeholder.html)  là một view helper khác cho phép capturing nội dung HTML và lưu trữ nội dung đó để sử dụng sau.  Tương tự như Partial view helper nó cho phép compose trang của bạn thành nhiều phần.
* [ Placeholder](https://olegkrivtsov.github.io/zf3-api-reference/html/classes/Zend/View/Helper/Placeholder.html)  view helper giúp lưu trữ dữ liệu trong PHP session storage
* Tóm lại Placeholder là kỹ thuật mà mã HTML phát sinh được lưu vào session sau đó đọc lại để sử dụng chứ không xuất trực tiếp. Một khối HTML muốn lưu lại thì đầu tiên chọn một cái tên gọi là keyholder.
* Cú pháp sử dụng như sau:
```php
<!--Bắt đầu khối HTML -->
<?php $this->placeholder('keyholder')->captureStart(); ?>

<!--Các mã HTML sẽ lưu vào keyholder -->

<?php $this->placeholder('keyholder')->captureEnd(); ?>

<!--Lấy nội dung trong keyholder -->
<? $noidung = $this->placeholder('keyholder');?>
```
* Thêm code sau vào layout2.phtml 
```php
<?php $this->placeholder('content')->captureStart(); ?>

<div class="row">
    <div class="col-md-8">
    <?= $this->content; ?>
    </div>
    <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Ads</h3>
          </div>
          <div class="panel-body">
            <strong>Zend Framework 3 Book</strong>
            <p>Learn how to create modern web applications with PHP 
                and Zend Framework 3</p>            
            <a target="_blank" 
               href="https://github.com/olegkrivtsov/using-zend-framework-3-book">
               Learn More
            </a>
          </div>
        </div>
    </div>
</div>

<?php 
  $this->placeholder('content')->captureEnd(); 
  echo $this->partial('layout/layout', 
          ['content'=>$this->placeholder('content')]); 
?>
```

* Chạy lại sẽ được kết quả như sau:

![](https://images.viblo.asia/003d0a78-aedc-4f5f-a71d-06ed67b7d3b9.png)
# Thêm JS và CSS
* Trong .phtml có thể thêm vào CSS và JS từ file hoặc nhúng mã
## Thêm JS
* Cú pháp thêm bằng cách gọi các phương thức thích hợp từ headScript() như: appendFile(), prependFile(), appendScript(), prependScript()
```php
$this->headScript()->appendFile('/js/yourscript.js');
```
* Thêm InlineScript JS
```php
$script = "alert('Hi')";
$this->inlineScript()->appendScript($script);
```
## Thêm CSS
* Thêm file CSS
```php
$this->headLink()->appendStylesheet('/css/style.css');
//Hoặc prependStylesheet
```
* Thêm CSS inline
```php
$css = "body {background:red;}";
$this->HeadStyle()->appendStyle($css);
//Hoặc $this->HeadStyle()->prependStyle($css);
```
```php
<?php $this->placeholder('rightaside')->captureStart(); ?>
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Quảng cáo</h3>
    </div>
    <div class="panel-body">
        <strong>Học lập trình Zend Framework 3</strong>
        <p>Các thông tin về lập trình PHP và các Framework hay dùng.
        Học lập trình, học lập trình, học lập trình</p>
        <a target="_blank"
           href="https://xuanthulab.net/">
            Chi tiết
        </a>
    </div>
</div>
<? $this->placeholder('rightaside')->captureEnd();?>
```
# Tham khảo
* https://olegkrivtsov.github.io/using-zend-framework-3-book/html/en/Page_Appearance_and_Layout
* https://xuanthulab.net/mot-so-van-de-khi-dung-html-trong-zend-framework.html