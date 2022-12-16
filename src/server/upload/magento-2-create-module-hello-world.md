# Magento 2: Tạo  Module Hello World với Magento 2
Để tạo mô-đun Hello World, bạn cần hoàn thành các bước cấp cao sau:
* Bước 1: Tạo thư mục của mô-đun Hello World
* Bước 2: Tạo tệp etc / module.xml
* Bước 3: Tạo tập tin etc / register.php
* Bước 4: Kích hoạt mô-đun

## Bước 1: Tạo thư mục của mô-đun Hello World
Tên của mô-đun được định nghĩa là VendorName_ModuleName. Phần đầu tiên là tên của nhà cung cấp và phần cuối là tên của mô-đun: Ví dụ: Magento_HelloWorld, Sun_Pdf Invoice. Tập trung vào hướng dẫn sau để tạo các thư mục: <br>
`app/code/Sun/HelloWorld`
## Bước 2: Tạo tập tin etc / module.xml.
Sau đó, cần phải tạo thư mục vv và thêm module.xml tệp <br>

`  app/code/Sun/HelloWorld/etc/module.xml` <br>
Nội dung sẽ là: <br>

```
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Sun_HelloWorld" setup_version="1.0.0">
    </module>
</config>
```

## Bước 3: Tạo tập tin etc / register.php
Trong bước này, chúng tôi sẽ thêm registration.php như hướng dẫn sau:<br>

`  app/code/Mageplaza/HelloWorld/registration.php` <br>
Nội dung sẽ là: <br>

```
<?php
\Magento\Framework\Component\ComponentRegistrar::register(
	\Magento\Framework\Component\ComponentRegistrar::MODULE,
	'Mageplaza_HelloWorld',
	__DIR__
);
```

## Bước 4: Kích hoạt mô-đun
Kết thúc bước 3, chúng ta đã tạo được HelloWorldmô-đun. Và chúng tôi sẽ kích hoạt mô-đun này trong bước này <br>

Sau khi tạo mô-đun nếu bạn chạy lệnh như: <br>

`  php bin/magento module:status` <br>
Bạn sẽ thấy mô-đun bị vô hiệu hóa ngay bây giờ: <br>

Danh sách các mô-đun bị vô hiệu hóa: Sun_HelloWorld <br>

Làm theo hướng dẫn chính xác để kích hoạt mô-đun ngay bây giờ, hãy chạy lệnh như: <br>

`  php bin/magento module:enable Sun_HelloWorld` <br>
Hoặc cách khác, bạn có thể truy cập tệp: <br>

`  app/etc/config.php` <br>
Bạn sẽ thấy một danh sách dài các mô-đun ở đó, chỉ cần thêm mô-đun của bạn là tốt <br>

```
  ...
  'Sun_HelloWorld' => 1, 
  ...
```
 <br>
Mô-đun của bạn nên có sẵn ngay bây giờ. <br>

Sau bước này, khi bạn mở trang web của mình trong trình duyệt, bạn sẽ gặp lỗi thông báo <br>

Vui lòng nâng cấp cơ sở dữ liệu của bạn: Chạy **bin/magento setup:upgrade** từ thư mục gốc Magento. <br>

Hãy chạy lệnh: <br>

`  php bin/magento setup:upgrade` <br>
Sau khi hoàn thành, khi bạn mở trang web của bạn trong trình duyệt, bạn sẽ thấy bố cục của trang web bị hỏng. <br>

![](https://images.viblo.asia/9c9f65b4-45bc-4cc9-b80b-8e831c6764da.png) <br>

Vui lòng chạy dòng lệnh deloy để sửa nó. <br>
 <br>
`php bin/magento setup:static-content:deploy` <br>

Sau khi triển khai hoàn tất, bạn cũng có thể thấy mô-đun của mình từ phụ trợ tại** System Configuration -> Advanced -> Disable Modules Output**.

Bây giờ, chúng tôi sẽ tạo một controller để kiểm tra mô-đun. <br>

Trước khi tạo bộ điều khiển, chúng tôi sẽ tạo một routecho mô-đun HelloWorld. <br>

Tuyến đường trong magento được chia thành 3 phần: Tên tuyến, bộ điều khiển và hành động (Route frontname, controller và action) như ví dụ sau: <br>

`http://sun-asterisk.com/index.php/frontname/controller/action` <br>

Để thêm tuyến đường, cần phải tạo tệp routes.xml  <br>

`app/code/Sun/HelloWorld/etc/frontend/routes.xml` <br>

vì đây là tuyến đường lối vào, chúng tôi đã thêm nó vào frontend / thư mục khác, chúng tôi cần thêm nó vào adminhtml/ folder <br>

Nội dung sẽ là: <br>
```
<?xml version="1.0" ?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/etc/routes.xsd">
    <router id="standard">
        <route frontName="helloworld" id="helloworld">
            <module name="Sun_HelloWorld"/>
        </route>
    </router>
</config>
```
 <br>
Sau khi xác định phần đầu tiên của tuyến đường, URL sẽ được hiển thị dưới dạng: <br> 
 ` http://<yourhost.com>/helloworld/*` <br>
 
` Ví dụ: http://localhost/helloworld/* ` <br>

Sau đó, chúng tôi sẽ tiếp tục tạo bộ điều khiển và hành động <br>

Thư mục và tệp bạn cần tạo là: <br>

`app/code/Sun/HelloWorld/Controller/Index/Test.php` <br>

Nội dung sẽ là: <br>
```

<?php
namespace Sun\HelloWorld\Controller\Index;

class Test extends \Magento\Framework\App\Action\Action
{
	protected $_pageFactory;

	public function __construct(
		\Magento\Framework\App\Action\Context $context,
		\Magento\Framework\View\Result\PageFactory $pageFactory)
	{
		$this->_pageFactory = $pageFactory;
		return parent::__construct($context);
	}

	public function execute()
	{
		echo "Hello World";
		exit;
	}
}
```
 <br>
Sau khi hoàn thành, hãy chạy php bin/magento cache:cleanđể kiểm tra kết quả. <br>

URL của bạn bây giờ phải là: <br>

 http://<yourhost.com>/helloworld/index/test <br>
Sau khi hoàn thành tất cả các bước, đầu ra Hello Worldsẽ được hiển thị trong trình duyệt của bạn khi bạn mở URL. <br>
Chúng tôi hy vọng hướng dẫn của chúng tôi rất hữu ích và hiệu quả cho bạn. <br>
Bất kỳ câu hỏi, hãy để lại một lời khen dưới đây. <br>
Hẹn gặp lại các bạn bài viết lần sau. <br>
Thank all.