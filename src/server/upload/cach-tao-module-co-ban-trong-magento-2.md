![](https://images.viblo.asia/9818dc7f-511e-4e7d-8058-35a1f23a62ed.png)
Chúng ta sẽ xây dựng một module rất đơn giản trong Magento 2. Khi hoàn tất, output của module sẽ là `"Hello world!"` trong một khối content trên một route được tùy chỉnh ở frontend.
# 1. Điều kiên tiên quyết.
Không cần phải nói, bạn sẽ cần phiên bản Magento 2 mới nhất là 2.3. Trước khi chúng ta bắt đầu phát triển module Magento 2, có hai điều mọi người thường quên và mình khuyên bạn nên làm:

* **Disable Magento cache**:

Việc disable Magento cache trong quá trình phát triển sẽ giúp bạn tiết kiệm thời gian vì bạn đã giành được nhu cầu xóa bộ nhớ cache mỗi khi bạn thay đổi mã code của mình.

Cách dễ nhất để disbale cache là vào Admin → System → Cache Management → chọn tất cả các loại bộ cache và tắt chúng.

* **Đặt Magento vào chế độ developer**:

Bạn nên đặt Magento vào chế độ developer để đảm bảo rằng bạn thấy tất cả các lỗi mà Magento đang ném ra cho bạn.

Để thực hiện việc này, hãy mở terminal của bạn và đi đến root Magento 2. Từ đó bạn chạy lệnh sau:
```
php bin/magento deploy:mode:set developer
```
# 2. Tạo file module và các thư mục.
**Thiết lập Module**

Trong Magento 2, các mô-đun được nhóm theo không gian tên và được đặt trực tiếp trong thư mục app/code.

Vì vậy, bước đầu tiên của chúng ta là tạo thư mục module và các file cần thiết để đăng ký module.

 ###### 1. Tạo các thư mục sau:
  - app/code/Magento_Ex
  - app/code/Magento_Ex/Helloworld
 
Thư mục Magento_Ex là không gian tên module, và Helloworld là tên module.

Lưu ý: Nếu bạn không có thư mục `code `trong thư mục `app` của mình, hãy tạo thủ công nó.

 ###### 2. Bây giờ chúng ta đã có một thư mục module, chúng ta cần tạo một file module trong thư mục app/code/Magento_Ex/Helloworld/etc với mã sau:
```php
<?xml version="1.0"?>
 
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Magento_Ex_Helloworld" setup_version="1.0.0">
    </module>
</config>
```
 ###### 3. Để đăng ký module, hãy tạo file register.php trong thư mục app/code/Magento_Ex/Helloworld với mã sau đây:
```php
<?php
 
\Magento\Framework\Component\ComponentRegistrar::register(
    \Magento\Framework\Component\ComponentRegistrar::MODULE,
    'Magento_Ex_Helloworld',
    __DIR__
);
```
 ###### 4. Mở terminal của bạn và đi đến root Magento 2. Sau đó chạy lệnh sau
```
php bin/magento setup:upgrade
```
Nếu bạn muốn đảm bảo rằng module đã được cài đặt, bạn có thể truy cập Admin → Stores → Configuration → Advanced → Advanced và kiểm tra xem module có trong danh sách không hoặc bạn có thể mở ứng dụng /etc/config.php và kiểm tra trong mảng có tồn tại đối với từ khóa 'Magento_Ex_Hellowworld' hay không, và có giá trị được đặt là 1.

**Tạo một controller**

 ###### 1. Đầu tiên chúng ta cần định nghĩa route. Để thực hiện việc này, hãy tạo một file route.xml trong thư mục app/code /Magento_Ex/Helloworld/etc/frontend với mã sau:
 
 ```php
 <?xml version="1.0"?>
 
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/etc/routes.xsd">
    <router id="standard">
        <route id="helloworld" frontName="helloworld">
            <module name="Magento_Ex_Helloworld" />
        </route>
    </router>
</config>
 ```
 Ở đây, chúng ta định nghĩa một route và route của chúng ta gán một id là `"helloworld"`.

Thuộc tính `frontName` sẽ là phần đầu tiên của URL của chúng ta.

Trong Magento 2, URL được xây dựng theo cách này:

`<frontName>/<controler_folder_name>/<control_group_name>`

Vì vậy, trong ví dụ của chúng ta, URL cuối cùng sẽ trông như thế này:

`hellowworld/index index`
 ###### 2. Bây giờ chúng ta tạo file controller Index.php trong thư mục app/code/Magento_Ex/Helloworld/Controller/Index với mã sau:
 ```php
 <?php
 
namespace Magento_Ex\Helloworld\Controller\Index;
 
use Magento\Framework\App\Action\Context;
 
class Index extends \Magento\Framework\App\Action\Action
{
    protected $_resultPageFactory;
 
    public function __construct(Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory)
    {
        $this->_resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }
 
    public function execute()
    {
        $resultPage = $this->_resultPageFactory->create();
        return $resultPage;
    }
}
 ```
 Trong Magento 1, mỗi controller có thể có nhiều action, nhưng trong Magento 2 thì không phải vậy. Trong Magento 2, mọi hành động đều có lớp riêng thực hiện phương thức `execute()`.
 
 **Tạo một block**
 
 Chúng ta sẽ tạo một class block đơn giản với phương thức `getHelloWorldTxt()` trả về chuỗi "Hello world".
  ###### 1. Tạo một file Helloworld.php trong thư mục app/code/Magento_Ex/Helloworld/Block với mã sau:
  ```php
  <?php
namespace Magento_Ex\Helloworld\Block;
 
class Helloworld extends \Magento\Framework\View\Element\Template
{
    public function getHelloWorldTxt()
    {
        return 'Hello world!';
    }
}
  ```
  
   **Tạo file layout và template**
   
Trong Magento 2, các file `layout` và `template` được đặt trong thư mục `view` bên trong module của bạn. Trong thư mục `view`, chúng ta có thể có ba thư mục con: `adminhtml`, `base` và `frontend`.

Thư mục `adminhtml` được sử dụng cho admin, thư mục `frontend` được sử dụng cho frontend và thư mục base được sử dụng cho cả hai, admin và frontend.
  ###### 1.Trước tiên, chúng ta sẽ tạo một file `helloworld_index_index.xml` trong thư mục app/code/Magento_Ex/Helloworld/view/frontend/layout với mã sau:
  
  ```php
  <page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="../../../../../../../lib/internal/Magento/Framework/View/Layout/etc/page_configuration.xsd" layout="1column">
    <body>
        <referenceContainer name="content">
            <block class="Magento_Ex\Helloworld\Block\Helloworld" name="helloworld" template="helloworld.phtml" />
        </referenceContainer>
    </body>
</page>
  ```
  
Mỗi trang có một kiểu bố trí layout và đối với controller action của chúng ta, xử lý layout là helloworld_index_index.xml. Bạn có thể tạo một file cấu hình layout cho mọi xử lý layout.

Trong file layout của chúng ta, chúng ta đã thêm một block vào vùng chứa nội dung và đặt template của block của chúng ta là helloworld.phtml trong đó, template này sẽ tạo trong bước tiếp theo.
  ###### 2. Tạo một file helloworld.phtml trong thư mục app/code/Magento_Ex/Helloworld/view/frontend/templates với đoạn mã sau:
  ```php
  <h1><?php echo $this->getHelloWorldTxt(); ?></h1>
  ```
Biến $this đang trỏ đến class block của chúng ta và đang gọi phương thức getHelloWorldTxt (), phương thức này trả về một chuỗi "Hello world!". Mở URL  /helloworld/index/index trong trình duyệt của bạn và bạn sẽ thấy một chuỗi "Helloworld!" hiện thị trên màn hình.

Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về những thao tác cơ bản trong Magento 2. Cảm ơn các bạn đã theo dõi.