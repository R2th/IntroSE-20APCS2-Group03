# Cấu trúc file của một Prestashop module
Một module được cấu thành bởi nhiều files, tất cả files được lưu trong một folder có cùng tên với module, các modules của Prestashop được lưu trư trong folder: ProJect_name_foler/modules/<br/>
Dưới đây là các files và folder cho một Prestashop 1.6 modules:


| Tên file/folder | Mô tả | Chi tiết |
| -------- | -------- | -------- |
| ten_cua_module.php    | file chính     | file PHP chính phải có tên giống với tên của folder  chứa nó. <br/>Ví dụ module blockCMS: <br/> - Tên foler: /modules/blockcms/<br/>- Tên file chính: /modules/blockcms/blockcms.php|
|config.xml| file cấu hình | nếu như file này không tồn tại thì nó sẽ tự được được tạo ra khi cài đặt xong  module.  |
|logo.gif or logo.jpg (up to v1.4)logo.png (v1.5+)|Ảnh đại diện của module show trong backoffice|Prestashop 1.4: 16x16 px Gif hoặc Jpeg file.<br/>Prestashop 1.5: 32x32 px PNG file<br/> nếu module của bạn sử trên cả hai Prestashop 1.4 và Prestashop 1.5+, bạn nên có cả hai logo.gif và logo.png file|
|/views|Folder chưa view file|
|/views/teamplates|Folder chưa template của module (.tpl)|Nếu module cần sử dụng với Prestashop 1.4, thì template phải được đặt ngoài thư mục gốc của module hoặc nằm trong thư mục template ở thư mục gốc của module |
|/views/templates/admin|Sub folder cho template files sử dụng cho admin controllers module||
|/views/templates/front|Sub folder cho template files sử dụng cho front controllers module||
|/views/templates/hook|Sub folder cho template files sử dụng cho hook||
|/views/css|Sub folder cho css file|Nếu module sử dụng cả Prestashop 1.4 you phải đặt css files trong /css|
|/views/js|Sub folder cho js file|Nếu module sử dụng cả Prestashop 1.4 you phải đặt js files trong /js|
|/views/img|Sub folder cho img file|Nếu module sử dụng cả Prestashop 1.4 you phải đặt js files trong /img|
|/controllers|Folder chứa controller files|Bạn có thể sử dụng giống đường dẫn như sub folder của View file <br/> Ví dụ: /modules/bankwire/controllers/front/payment.php |
|/override|Sub folder cho class overriding code hoặc controllers overrding|Điều này rất tốt cho bạn muốn thay đổi mã của Prestashop mặc định. Bởi vì bạn không được sửa trực tiếp vào code core của Prestashop vì khi sửa như vậy sau đó nâng cấp lên Prestashop version cao hơn sẽ bị mất code đã chỉnh sửa trong core<br/> Ví dụ:  /modules/gsitemap/override/classes/Shop.php Kế thừa từ mặc định ShopCore class|
|/translations|Sub folder cho file dịch|ví dụ: fr.php, en.php, es.php ...|
|themes|`[theme_name]`/modules|Sub folder cho overrding .tpl file và languages files, nếu cần|Folder này rất cần thiết để sửa đổi template của module khác, vì bạn có thể điều chỉnh nó mà không cần phải sửa trực tiếp vào file gốc. Đáng chú ý, nó cho phép bạn xử lí các template theo nhiều cách khác nhau, tùy thuộc vào chủ đề hiện tại.|
|/upgrade|Sub folder cho upgrade files|Khi phát hành mới một phiên bản module, bạn sẽ cần để nâng cấp dữ liệu hoặc files. |
Chỉ có ba cái đầu tiên là cần thiết cho một module cơ bản: the main file, file cấu hình(Prestashop tự đông tạp ra) và icon file. Tất cả những thứ khác có thể sử dụng nếu như cần thiết, module có thể làm việc nếu không có chúng. Module có thể có nhiều tập tin và thư mục khác khi cần thiết.<br/>
> Nếu bạn muốn sử dụng thư viện, bạn nên có một folder chuyên dụng. 
Tên folder có tên như sau: lib, libs, libraries, sdk, vendor, vendors...

# Tạo một module nào
Chúng ta hãy đi tạo một module đơn giản. Điều sẽ cho phép bạn hiểu hơn về cấu trúc module Prestashop. We will set name là "My module".<br/>
Đầu tiên tạo module folder, trong /modules folder. no phải có tên cùng tên module, không khoảng cách. chỉ có chữ vào số, dấu gạch nối và dấu gạch dưới, tất cả chữ thường: `/mymodule`.<br/>
Folder phải chứa file chính, một file PHP same như tên của module folder, Nó sẽ xử lí hầu hết các quá trình của module: `mymodule.php`
> Điều này là đủ cho một module cơ bản nhưng ta có thể thêm nhiều tệp hoặc folder sau này khi cần đến.
## The constant test
ở đầu mỗi file PHP trong Prestashop chúng ta cần có đoạn code sau.
```
<?php   
if (!defined('_PS_VERSION_'))
  exit;
```
Điều này sẽ kiểm tra Prestashop version luôn phải tồn tại và nếu nó không tồn tại nó sẽ stop module. Mục đích của điều này là để ngăn chặn các truy cập từ bên ngoài và tải các tập tin trực tiếp.
> Lưu ý, theo tiêu chuẩn của Prestashop thì chúng ta không sử dụng đóng thẻ php `?>`
 ## Class chính `mymodule.php`
file chính chứ class chính của module(cũng có thể định nghĩa các class khác nếu cần nhưng không nên định nghĩ trong cùng 1 file). Prestashop sử dụng OOP và các modules của nó cũng vậy.<br/>
Tên class phải giống tên của module và tên file chính nhưng sử dụng CamelCase(cách viết lạc đà). ví dụ: `MyModule`.<br/>
Hơn nữa class này phải extend từ `Module` class để có thể kế thừa tất cả các methods và thuộc tính.
```
<?php
if (!defined('_PS_VERSION_'))
  exit;
 
class MyModule extends Module
{
}
```
> ngoài việc extend từ `Module` class thì bạn có thể extend từ các class khác như: PaymentModule, ModuleGridEngine, ModuleGraph... tùy vào nhu cầu sử dụng module.<br/>
Ở giai đoạn này, Nếu bạn coppy folder `mymodule` và folder `/modules` thì `mymodule` có thể tồn tại trong "Modules" page back office, trong "Other Module" tab mặc dù không tên không có logo.
## Phương thức constuctor
Bây giờ, Chúng ta sẽ viết code vào phương thức constructor của class `mymodule`.  constructor là một function trong class tự động được gọi khi you tạo mới mới instance của class. Trong Prestashop, Constructor là phương thức được gọi đầu tiên khi module load bởi Prestashop.

```
<?php
if (!defined('_PS_VERSION_'))
  exit;
 
class MyModule extends Module
{
  public function __construct()
  {
    $this->name = 'mymodule';
    $this->tab = 'front_office_features';
    $this->version = '1.0.0';
    $this->author = 'Firstname Lastname';
    $this->need_instance = 0;
    $this->ps_versions_compliancy = array('min' => '1.5', 'max' => 1.6);
    $this->bootstrap = true;
 
    parent::__construct();
 
    $this->displayName = $this->l('My module');
    $this->description = $this->l('Description of my module.');
 
    $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
 
    if (!Configuration::get('MYMODULE_NAME'))      
      $this->warning = $this->l('No name provided');
  }
}
```
Hãy bắt đầu đi vào từng dòng trong `MyModule` class
```
public function __construct()
```
dòng này định nghĩa ra constructor method.
```
$this->name = 'mymodule';
$this->tab = 'front_office_features';
$this->version = '1.0';
$this->author = 'Firstname Lastname';
```
Phần này gán một số thuộc tính cho module:<br/>
- thuộc tính `name`: định danh mà ta có thể sử dụng bên trong module. giá trị của nó phải là tên của module folder. không sử dụng kí tự đặc biệt, khoảng trắng. chỉ dùng chữ viết thường.
-  thuộc tính `tab` : nó định nghĩa ra để biết được rằng nó sẽ nằm trong tab nào của module list in Prestashop backoffice module list. bạn có thể chọn một tên đã tồn tại hoặc tự đặt một một tên. chúng ta sẽ chọn `front_office_features` bởi vì module có thao tác với front office<br/>
    Dưới đây là danh sách các tab có sẵn. và tên hiển thị của chúng trong module page.
    |thuộc tính`tab`| hiển thị trong backoffice|
    |-|-|
    |administration |  Administration |
    | advertising_marketing | Advertising & Marketing |
    | analytics_stats | Analytics & Stats |
    | billing_invoicing | Billing & Invoices |
    | checkout |  Checkout
    | content_management |  Content Management |
    | dashboard | Dashboard |
    | emailing |  E-mailing |
    | export |  Export |
    | front_office_features | Front Office Features |
    | i18n_localization | I18n & Localization |
    | market_place |  Market Place
    | merchandizing | Merchandizing |
    | migration_tools | Migration Tools |
    | mobile |  Mobile |
    | others |  Other Modules |
    | payments_gateways | Payments & Gateways |
    | payment_security |  Payment Security
    | pricing_promotion | Pricing & Promotion |
    | quick_bulk_update | Quick / Bulk update |
    | search_filter | Search & Filter |
    | seo | SEO
    | shipping_logistics |  Shipping & Logistics |
    | slideshows |  Slideshows
    | smart_shopping |  Smart Shopping |
    | social_networks | Social Networks |
- Thuộc tính `version`: số version của module. sẽ suất hiện trong module list. nó là chỗi, để bạn có thể sử dụng `0.1`, `0.2` hoặc `1.0 beta`...
- Thuộc tính `author`: Tên tác giả của module sẽ show trong module list
Tiếp theo với đoạn code sau:
```
$this->need_instance = 0;
$this->ps_versions_compliancy = array('min' => '1.5', 'max' => 1.6); 
$this->bootstrap = true;
```
Phân này nó xử lí mối quan hệ với module và môi trường:<br/>
    -  `need_instance`: Cho biết rằng có load module này hay không khi đang ở module page backoffice. nếu bạn đặt là 0 thì module sẽ không được load ở trang module và ngược lại<br/>
    -  `ps_versions_compliancy`:  Cho biết rằng module bạn đang viết hoạt động được trên nhưng phiên bản nào của Prestashop. Trên ví dụ trên thì module sẽ hoạt động trên phiên bản nhỏ nhất là 1.5.x.x và lớn nhất là 1.6.x.x<br/>
    -  `bootstrap`: cho biết rằng các template của module đã được xây dựng bởi Prestashop 1.6 bootstrap.

Tiếp theo, chúng ta gọi constructor method từ class cha: `parent::__construct();`. và bạn phải sử dụng nó sau `$this->name` và trước khi `$this->l()`<br/>
 <br/>
 Phần tiếp theo này chủ yếu liên quan tới phương thức dịch(`l()`) trong Prestashop 1.6
```
$this->displayName = $this->l('My module');
$this->description = $this->l('Description of my module.');
 
$this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
 
if (!Configuration::get('MYMODULE_NAME'))  
    $this->warning = $this->l('No name provided.'); 
```
   - `displayName` tên của module sẽ show trong module list
   - `description` mô tả của module sẽ show trong module list
   - `confirmUninstall` một messager bắn ra trước khi bạn muốn xác nhận gỡ bỏ module
   - cuối cùng một cảnh báo rằng module chưa có trong DB
   
Phương thức constructor bây giờ là ok. Bạn có thể thêm nhiều hơn nếu cần thiết thêm biến để sử dụng. nhưng như này là đủ cho một module cơ bản.<br/>
Bây giờ hay vào backoffice để nhận được thành quả nào:<br/>
![](https://images.viblo.asia/ed58657b-b448-4e12-a4da-e6b933b5cd50.png)
![](https://images.viblo.asia/3f1ac014-8d24-4080-be74-a8080a735244.png)
Bạn có thể click install nhưng chưa có tác dụng gì cả bởi chúng ta chưa viết code cho install method.

-----------------------
Mình xin tạm dừng bài viết ở đây vì đã quá dài, ở bài tiếp theo mình sẽ giới thiệu về install và uninstall trong module. đón chờ nhé...<br/>
Nguồn bài viết: http://doc.prestashop.com/pages/viewpage.action?pageId=51184607