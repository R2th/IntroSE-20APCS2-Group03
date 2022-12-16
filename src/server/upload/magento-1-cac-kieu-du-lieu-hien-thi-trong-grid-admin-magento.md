Hôm nay chúng ta  sẽ dựa trên ví dụ quản lý nhân viên bán hàng Salestaff và chúng một số trường như :

+ id
+ name
+ birthday
+ x
+ totals_sales : tổng số tiền bán hàng
+ items_qty : tổng số sản phẩm bán được
+ status

Để hiển thị grid có bao gồm các trường này thì trước tiên ta phải thêm chúng vào database thông qua file update sql mysql4-upgrade mysql4-upgrade-0.1.0-0.1.1.php
```
<?php
$installer = $this;
 
$installer->startSetup();
 
/**
 * create pdfinvoiceplus table
 */
$installer->run("
ALTER TABLE {$this->getTable('salestaff_staff')}
 ADD COLUMN `totals_sales` decimal(11,2) NOT NULL default '1',
 ADD COLUMN `items_qty` int(11) NOT NULL default '0';
");
```
``` 
$installer->endSetup();
```

Để file upgrade này được chạy thì ta cần vào file config.xml tăng vesion extension lên 0.1.1 . Cụ thể 

```
<?xml version="1.0"?>
<config>
 <modules>
 <!--Version của module-->
 <UC_Salestaff>
 <version>0.1.0</version>
 </UC_Salestaff>
 </modules>

</config>
```

Với những thay đổi vừa rồi thì extension UC_Salestaff được nâng từ version 1.0 lên 1.1 và bây giờ ta sẽ đi vào công việc chính là hiển thị grid bao gồm các cột :

+ id 
+ name
+ birthday 
+ sex
+ item_qty
+ totals_sales
+ status

Sau đây ta sẽ đi vào cho tiết từng kiểu dữ liệu hiển thị trong grid backend magento

##### 1. Kiểu varchar , text 

![Hinh 1](https://images.viblo.asia/56ce9a31-d305-4516-9947-473d9b651019.png)

File `Grid.php`

```
$this->addColumn('name', array(
 'header' => Mage::helper('salestaff')->__('Name'),
 'align' =>'left',
 'index' => 'name',
 ));
```

Khi ta không khai báo kiểu dữ liệu Magento sẽ để mặc định là kiểu text . Với kiểu dữ liệu này admin có thể filter hoặc sort theo nội dung của field đó .

##### 2. Kiểu number

![Hinh 2](https://images.viblo.asia/2b6f72c3-9666-4004-ab71-2f2ba83f8455.png)https://images.viblo.asia/2b6f72c3-9666-4004-ab71-2f2ba83f8455.png

File `Grid.php`

```
$this->addColumn('items_qty', array(
 'header' => Mage::helper('salestaff')->__('Items Qty'),
 'align' =>'left',
 'width' => '100px',
  'index' => 'items_qty',
 'type' => 'number'
 ));
 ```
 
Khi truyền tham số type=number cho hàm addColumn Magento sẽ render ra một cột hiển thị kiểu dữ liệu dạng số và admin có thể search giá trị trong khoảng từ “from” đến “to” 
 
 ##### 3. Kiểu date 
 
 ![Hinh 3](https://images.viblo.asia/3dcaf72b-2640-4159-8194-53c1faa4121c.png)
 
File `Grid.php`
```
$this->addColumn('birthday', array(
 'header' => Mage::helper('salestaff')->__('Birthday'),
 'width' => '150px',
 'index' => 'birthday',
 'type' => 'date'
 ));
 ```
 
 Chỉ cần thêm tham số type = date là ta có ngay một column hiển thị ngày theo fomat của magento
 
 ##### 4. Kiểu price(money)
 
 ![Hinh 4](https://images.viblo.asia/f34f13f8-d601-4cc5-b26a-27e800388667.png)
 

File `Grid.php`
```
$currencyCode = Mage::app()->getStore()->getBaseCurrency()->getCode();
 $this->addColumn('totals_sales', array(
 'header' => Mage::helper('salestaff')->__('Totals Sales'),
 'align' =>'right',
 'width' => '100px',
 'index' => 'totals_sales',
 'type' => 'price',
 'currency_code' => $currencyCode
 ));
 ```
Trong đó $curencyCode là mã tiền tệ được sử dụng trong admin

##### 5. Kiểu option

![Hinh 5](https://images.viblo.asia/bffd5f64-af8d-4c33-9c17-a56d8b7c6be6.png)

File `Grid.php`

```
$this->addColumn('status', array(
 'header' => Mage::helper('salestaff')->__('Status'),
 'align' => 'left',
 'width' => '80px',
 'index' => 'status',
 'type' => 'options',
 'options' => array(
 1 => 'Enabled',
 2 => 'Disabled',
 ),
 ));
```
Kiểu option này khi add cần phải truyền cả tham số options là một mảng các giá trị có thể nhận của trường đó  . 
 Như vậy , trên đây là 5 kiểu dữ liệu phổ biến nhất hiển thị trên grid admin của magento  . Tuy nhiên vẫn còn rất nhiều các kiểu dữ liệu thực tế khác mà admin muốn hiển thị trên grid admin , ví dụ như :
+ Link: liên kết đến một website khác
+ Image : hiển thị hình ảnh của product tương ứng 
+ Custom : một kiểu dữ liệu đặc biệt nào đấy mà admin muốn hiển thị