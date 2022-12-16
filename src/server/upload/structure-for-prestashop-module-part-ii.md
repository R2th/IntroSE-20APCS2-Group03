Ở bài viết trước mình đang giới thiệu cho các bạn về cấu trúc module trong prestashop nhưng do bài viết qua dài vì vậy ở bài viết này mình sẽ tiếp túc giới thiệu các thành phần còn lại của module.
 Các bạn có thể đọc bài viết trước ở link sau: https://viblo.asia/p/structure-for-prestashop-module-part-i-E375zw82KGW
# I. Xây dựng phương thức `install` và `uninstall`
Một số module cần có nhiều tính năng hơn Prestashop core cung cấp. Module của bạn cần thực thi một số hành động khi cài đặt ví dụ như tạo database, tạo dữ liệu mẫu, kiểm tra version module hoặc đăng kí module. nếu bạn có chỉnh sửa database khi cài đặt bạn phải nhớ thay đổi trở lại như lúc ban đâu khi gỡ hoặc loại bỏ module.<br/>
Phương thức `install()` hoặc `uninstall()` nó có thể kiểm soát những gì sảy ra cài đặt module trong backoffice. Hai phương thức này phải năm trong class chính của module (trong ví dụ là class MyModule) cùng cấp với phương thức constructor
## 1. Phương thức `install()`
Ở đây là đoạn code tối thiểu mà phương thức install cần có
```
public function install()
{
  if (!parent::install())
    return false;
  return true;
}
```
Đoạn này rất đơn giản phải không. Phương thức chỉ thực hiện những việc cần thiết để cài đặt được module: trả về `true` thì module cài đặt thành công, và ngược lại. Nếu bạn không định nghĩa phương thức này thì mặc định module sẽ gọi tới phương thức install() của class cha nó. và cho về kểt quả tương tự.<br/>
Tuy nhiên, chúng ta phải chú ý đến phương thức này. bởi vì nó sẽ rất có ích để sử lí những việc trong quá trình cài đặt: ví dụ như là tạo bảng, copy file, tạo config...<br/>
ví dụ  sau chúng ta sẽ viết thêm code cho phương thức install để kiểm tra cài đặt.
```
public function install()
{
  if (Shop::isFeatureActive())
    Shop::setContext(Shop::CONTEXT_ALL);
 
  if (!parent::install() ||
    !$this->registerHook('leftColumn') ||
    !$this->registerHook('header') ||
    !Configuration::updateValue('MYMODULE_NAME', 'my friend')
  )
    return false;
 
  return true;
}
```
* kiểm tra nếu của hàng là mutil store thì sẽ set context cho tất cả các shop
* Kiểm tra xem class cha của module đã cài đặt chưa
* Kiểm tra module có thể đăng kí vào `leftColumn` và `header`
* Tạo config setting `MYMODULE_NAME` giá trị của nó là "my friend"<br/>
Nếu một trong những đoạn code trên trả về false thì quá trình cài đặt sẽ thất bại. 

## 2. Phương thức `uninstall()`
Ở đây là đoạn code tối thiểu mà phương thức uninstall cần có
```
public function uninstall()
{
  if (!parent::uninstall())
    return false;
  return true;
}
```

Dưới đây, tôi muốn phương thức `uninstall()` xóa dữ liệu mà lúc cài đặt tôi thêm vào. (tức là xóa biến config `MYMODULE_NAME`).
```
public function uninstall()
{
  if (!parent::uninstall() ||
    !Configuration::deleteByName('MYMODULE_NAME')
  )
    return false;
 
  return true;
}
```
#  II. Đối tượng `Configuration`
Như bạn có thể nhìn thấy, ba khối code trong ba phương thức construct(), install() and uninstall() dùng để xây dựng mới đối tượng.<br/>
Configuration: đây là đối tượng đặc biệt của Prestashop, tạo ra để developer dễ dang quản lí module. Nó lưu trữ cài đặt trong database mà không cần sử dụng SQL truy vấn. Đặc biệt, đối tượng này sử lí dữ liệu từ bảng `ps_configuration`
## 1. Các phương thức chính
* `Configuration::get('myVariable')`: Lấy ra một biến 
* `Configuration::getMultiple(array('myFirstVariable', 'mySecondVariable', 'myThirdVariable'))`: Lấy ra nhiều biến, và sẽ trả về mảng
* `Configuration::updateValue('myVariable', $value)`: Cập nhật dữ liệu của một biến nếu biến đã có trong bảng, nếu chưa có nó tự động tạo ra biến với cùng giá trị truyển vào
* `Configuration::deleteByName('myVariable')`: Xóa biến
Bạn có thể đọc thêm class `Configuration` để có thể biết thêm về nhiều phương thức của nó nhưng các phương thức ở trên là sử dụng nhiều nhất.<br/>
Khi bạn sử dụng `updateValue()` nội dụng của giá trị bạn đẩy vào có thể là chuỗi, số, serialized PHP, json. Ví dụ sau là serialized PHP: 
```
Configuration::updateValue('MYMODULE_SETTINGS', serialize(array(true, true, false)));
 
$configuration_array = unserialize(Configuration::get('MYMODULE_SETTINGS'));
```
## 2. Lấy ra nhưng biến từ bảng `ps_configuration` mà không phải do bạn tạo ra
Bạn có thể lấy bất cứ biến gì trong trong `ps_configuration` do bạn hoặc không phải do bạn tạo ra. bởi vì mặc định prestashop cũng lưu rất nhiều biến vào trong Configuration
* `Configuration::get('PS_LANG_DEFAULT')`: ID ngôn ngữ mặc định
* `Configuration::get('PS_TIMEZONE')`: Tên múi giờ hiện tại
* `Configuration::get('PS_DISTANCE_UNIT')`: Đơn vị khoảng cách mặc định
* `Configuration::get('PS_SHOP_EMAIL')`:  Email contact của shop
* `Configuration::get('PS_NB_DAYS_NEW_PRODUCT')`: Số ngày mà một sản phẩm coi như là mới

# III. Đối tượng `Shop`
```
if (Shop::isFeatureActive())
  Shop::setContext(Shop::CONTEXT_ALL);
```
Như ở tôi đã nói kiểm tra nếu của hàng là mutil store thì sẽ set context cho tất cả các shop.<br/>
Đối tượng Shop sẽ giúp bạn quản lí tính năng multistore. Chúng ta sẽ không đi sâu vào nó mà chỉ giải thích hai dòng sau đây:
* `Shop::isFeatureActive()`: Kiểm tra multistore có bật hay không.
* `Shop::setContext(Shop::CONTEXT_ALL)`:  dòng này sẽ thay đổi context cho tất cả các cửa hàng. thay vì chỉ cửa hàng hiện tại.
# IV. Đi tới backoffice và cài đặt module
Bây giờ bạn sẽ nhìn thấy module của bạn trong backoffice.
![](https://images.viblo.asia/3f423a98-8ff0-4e09-a21c-b63f67f86637.png)
<br/>Click `install`
![](https://images.viblo.asia/07b67fd2-3660-4a33-8627-d4306025b46d.png)
sau khi cài đặt xong, Prestashop sẽ tự động tạo ra file config.xml bên trong foler của module. nếu bạn chỉnh sửa file này bạn nên cân thận vì sẽ dễ dàng gây ra lỗi.<br/>
Prestashop cũng sẽ thêm một hàng vào trong bảng `ps_module` 
![](https://images.viblo.asia/bdafb99d-a64f-410e-b5f3-e146dba0bf9e.png)
<br/>Link tham khảo: http://doc.prestashop.com/pages/viewpage.action?pageId=51184607