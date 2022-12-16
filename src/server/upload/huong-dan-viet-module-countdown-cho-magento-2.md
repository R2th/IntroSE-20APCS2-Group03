Xin chào các bạn, hôm nay tôi sẽ hướng dẫn cách làm một module magento 2 đơn giản là countdown.
Mục đích của bài viết là giúp các bạn hiểu được cấu trúc và cách hoạt động của một module magento 2. Magento 2 là một CMS thương mại điện tử được viết bằng php theo mô hình MVC và module. Bạn có thể tìm hiểu thêm ở trên mạng, nhưng hiểu nôm na là nó gồm nhiều module khác nhau, mỗi module có cấu trúc theo mô hình MVC. Khi tải magento về thì đã có sẵn các module(core) để tạo nên 1 web bán hàng cơ bản. Khi muốn thêm chức năng thì sẽ viết thêm module mới.
Bây giờ chúng ta sẽ tạo một module có chức năng là tạo ra 1 clock hiển thị thời gian giảm giá của sản phẩm, clock hiển thị trên trang detail sản phầm và trên danh sách sản phẩm.

**1. Khởi tạo module**

Tên của module gồm 2 phần(vendorname_modulename) tương ứng với 2 thư mục. Ví dụ tên module là Framgia_Countdown ta sẽ tạo 2 thư mục trong app/code:
Sau đó tạo các thư mục như hình sau:

![](https://images.viblo.asia/99a308e4-51fc-405d-a88f-6aa1a1cd9eca.jpg)

**2. File registration.php**

File này là khai đó tên module có cấu trúc như sau:

```php
<?php
\Magento\Framework\Component\ComponentRegistrar::register(
    \Magento\Framework\Component\ComponentRegistrar::MODULE,
    'Framgia_Countdown',
    __DIR__
);
```

Tên param truyền vào là `Framgia_Countdown`, cần viết hoa chữ đầu là ghép của tên 2 thư mục Framgia + CountDown

**3. Thư mục etc**

- File module.xml: Config requirement cho module

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
	<module name="Framgia_Countdown" setup_version="1.0.0">
		<sequence>
			<module name="Magento_Catalog"/>
		</sequence>
	</module>
</config>
```

Thẻ module có data về tên và version của module, còn thẻ `sequence` cần khai báo thẻ `module` có data là module `Magento_Catalog`, đây là module trong core của magento. Mục đích khai báo nư vậy là module countdown cần có module `Magento_Catalog` load trước. vì module này là phụ trách về sản phẩm mà count cần có sản phẩm mới hiển thị trên đó được.

- File di.xml:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <preference for="Magento\Catalog\Block\Product\ListProduct" type="Magenest\Countdown\Block\Product\ListProduct" />
</config>
```

File này là config dependency injection. File `Magento\Catalog\Block\Product\ListProduct` là file helper cho việc hiển thị danh sách sản phẩm. Khi config như vậy, magento sẽ load file `Magenest\Countdown\Block\Product\ListProduct` thay cho file mặc định. Khi đó file của mình sẽ kế thừa file mặc định. Mình sẽ viết thêm hàm cần thiết để làm coundown.

**4. Thư mục view/layout:**

![](https://images.viblo.asia/47a321e2-be84-463e-ad5e-d02a4543e7a3.jpg)

- Layout: config layout cho 2 trang: product detail và list product
Đây là file catalog_product_view.xml:
```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
	<head>
        
        <css src="Framgia_Countdown::css/jquery.flipclock.css"/>
        <css src="Framgia_Countdown::css/jquery.countdownTimer.css"/>
        
      
    </head>
    <body>
    <referenceContainer name="product.info.main">
        <block class="Framgia\Countdown\Block\Product\View" name="product.info.timer"   template="Framgia_Countdown::product_countdown.phtml"  />
    </referenceContainer>
    </body>
</page>
```
File này có tên trùng 1 với tên 1 file layout trong module magento/catalog. Khai báo thêm thẻ css trong head để hiển thị countdown. Trong thẻ body dùng thẻ `referenceContainer` tham chiếu đến container `product.info.main` đã được định nghĩa trong module magento/catalog. Bên trong khai báo thẻ block có data về file template html.

File catalog_product_view.xml:

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
	<head>      
        <css src="Magenest_Countdown::css/jquery.countdown.category.css"/>
    </head>
    <body>
 
    </body>
</page>
```
Thêm css để hiển thị countdown thôi

- Thư mục templates chứa các file html
- Thư mục web chứa các file css và js.

**5. Thư mục setup**

Chứa các file seed về schema và database. Module coundown cần có thêm 1 trường countdown_enabled để xác định có bật hiển thị countdown cho sản phẩm hay không. nên cần tạo thêm 1 trường như vậy:

```php
<?php
namespace Magenest\Countdown\Setup;

use Magento\Eav\Setup\EavSetup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;

class InstallData implements InstallDataInterface
{

/**
* EAV setup factory
*
* @var EavSetupFactory
*/

private $eavSetupFactory;

 

/**
* Init
*
* @param EavSetupFactory $eavSetupFactory
*/

public function __construct(EavSetupFactory $eavSetupFactory)

{

    $this->eavSetupFactory = $eavSetupFactory;

}

 
public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
{

    /** @var EavSetup $eavSetup */

    $eavSetup = $this->eavSetupFactory->create(['setup' => $setup]);

 

    /**
    * Add attributes to the eav/attribute
    */

    $eavSetup->addAttribute(
        \Magento\Catalog\Model\Product::ENTITY,
        'countdown_enabled',
        [
        'group' => 'General',
        'type' => 'int',
        'backend' => '',
        'frontend' => '',
        'label' => 'Show Countdown',
        'input' => 'boolean',
        'class' => '',
        'source' => '',
        'global' => \Magento\Catalog\Model\ResourceModel\Eav\Attribute::SCOPE_GLOBAL,
        'visible' => true,
        'required' => false,
        'user_defined' => true,
        'default' => '',
        'searchable' => false,
        'filterable' => false,
        'comparable' => false,
        'visible_on_front' => false,
        'used_in_product_listing' => true,
        'unique' => false,
        'apply_to' => 'simple,configurable,virtual,bundle,downloadable'
        ]
        ); 
    }

}
```

Chạy lệnh `magento setup:install` magento sẽ chạy file trên và tạo thêm 1 trường countdown_enabled vào product. Trương này có kiểu boolean, nên khi vào trang product detail trong backend sẽ hiển thị trương này với value yes/no

**6. Thư mục block**

File Product/View.php:

```php
<?php
namespace Magenest\Countdown\Block\Product;
class View extends \Magento\Catalog\Block\Product\View
{
    
    public function isCountdownEnabled()
    {
        return $this->getProduct()->getData('countdown_enabled');
    }
    public function getTypeWatch()
    {
    return $this->_scopeConfig->getValue('countdown/general/typewatch');
    }
     public function getLanguageClock()
    {
    return $this->_scopeConfig->getValue('countdown/general/languageclock');
    }
     public function getTimeToShow()
    {
    return $this->_scopeConfig->getValue('countdown/general/timetoshow');
    }
    public function getTitle()
    {
       return $this->_scopeConfig->getValue('countdown/general/title');
    }

    public function getCountdownStartDate(){
        return $this->getProduct()->getSpecialFromDate();
    }

    public function getCountdownEndDate(){
        return  $this->getProduct()->getSpecialToDate();
    }
    public function getCurrentDate(){
        return $currentDate =  date('Y-m-d H:i:s');
    }
    public function getPriceCountDown()
      {
          $currentDate =$this->getCurrentDate();
          $todate      =  $this->getProduct()->getSpecialToDate();
          $fromdate    =  $this->getProduct()->getSpecialFromDate();
          if($this->getProduct()->getSpecialPrice()>0) 
            {
            if($todate != null) 
              {
              if(strtotime($todate) >= strtotime($currentDate) )  return true;
              }
            }
      }
}

```

Đây là file helper cho view. Bạn còn nhớ file layout catalog_product_view.xml có gọi đến file Product/View.php và file template `product_countdown.phtml`. Như vậy trong file template này sẽ sử dụng được helper là file `Product/View.php` trong block.

Trong hàm `getPriceCountDown` sẽ lẫy giá trị `getSpecialPrice` là giá giảm giá. Nếu có thì sẽ hiển thị count down đếm ngược.

Trong file `product_countdown.phtml`:

```php
<?php 
	if($block->isCountdownEnabled() && $block->getPriceCountDown()){
	$currentDate=$block->getCurrentDate();
    $startDate= $block->getCountdownStartDate();
    $endDate= $block->getCountdownEndDate();
    $typewatch=$block->getTypeWatch();
    $languageclock = $block->getLanguageClock();
    $timetoshow = $block->getTimeToShow();
    $endDate_int= strtotime($endDate);
    $startDate_int= strtotime($startDate);
    $currentDate_int= strtotime($currentDate);
    
	if(($startDate_int-$currentDate_int)>(86400*$timetoshow)) {
        $day=date('m-d-Y H:i',$startDate_int);
        echo "<div id='show'>";
        echo "<div class='title' >".$block->getTitle()."</div> ";
        echo "<div class='status' ><h1>Start At</h1></div>";
    	echo "<h2 id='countdowntimer' >$day</h3></div>";
    }
    
	else if( ($currentDate_int>$startDate_int) && ($currentDate_int<$endDate_int) ){		
	$time = $startDate_int-$currentDate_int;
?>
<div id="show">
 <div class="title" ><?php echo $block->getTitle(); ?> </div>
 <div class="status" ><?php echo "<h1> Finish Remain </h1> "?> </div>
 <div id="countdowntimer"><span id="clock"></span></div>
 <script>
	require([
		'jquery',
		'Magenest_Countdown/js/jquery.countdownTimer'
	], function ($) {
		console.log('countdowntimer start');
		$("#clock").countdowntimer({
			startDate : "<?php echo $currentDate ?>",
			dateAndTime : "<?php echo $endDate ?>",
			size : "xl",
			languageclock:"<?php echo $languageclock; ?>",
	    });    
	});
 </script>
</div>
```

File view này sẽ sử dụng các hàm trong file Product/View.php để lấy thời gian giảm giá rồi hiển thị countdown đếm được.
Để sử dụng js cần sử dụng require các thư viện rồi thực thi qua callback. Trong file cần cần require jquery trước rồi đến file js coundown.

Ok, như vậy mình đã giới thiệu về cấu trúc của 1 module magento 2 và cách làm module countdown đơn giản.Xin cảm ơn