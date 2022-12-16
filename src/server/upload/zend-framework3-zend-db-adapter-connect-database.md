# Adapter - Kết nối CSDL
* Thư viện zend-db trong ZF3 dùng để kết nối và thi hành các lệnh SQL trên CSDL quan hệ. Bạn cần đảm bảo đã cài đặt bằng lệnh Composer sau:
```php
composer require zendframework/zend-db
```
* Trong ứng dụng Skeleton bạn cũng cần đảm bảo khai báo thêm 'Zend\Db' trong file config/modules.config.php để ứng dụng load Module này

* Để làm việc với CSDL bạn cần tạo ra một đối tượng Zend\Db\Adapter\Adapter với cú pháp như sau:
```php
use Zend\Db\Adapter\Adapter;

$configArray = [
    'driver'   => 'Mysqli',
    'database' => 'sitedata',
    'username' => 'admin',
    //...
    ];

$adapter = new Adapter($configArray);
```
* $configArray là mảng cấu hình thông số với các key/giá trị có thể có như sau:
![](https://images.viblo.asia/ad281c6d-57be-4cdc-8471-ae08aecb966d.png)

# Một số driver kết nối phổ biến
## Driver - Mysqli
* Sử dụng đối tượng thư viện Mysqli để kết nối CSDL MySQL
```php
$configArray = [
    'driver'   => 'Mysqli',
    'username' => 'root',
    'password' => '',
    'database' => 'xtdb',
    //'charset'  => 'utf8', //latin1
    ];
```
## Driver - Pdo_Sqlite
* Sử dụng đối tượng thư viện Pdo_Mysql để kết nối CSDL MySQL
```php
$configArray = [
    'driver'   => 'Pdo_Mysql',
    'username' => 'root',
    'password' => '',
    'database' => 'xtdb',
    //'charset'  => 'utf8', //latin1
    ];
```
## Driver - Pdo
* Sử dụng Pdo cho phép dùng thư viện PDO để kết nối đến các loại CSDL khác nhau như MySQL, SQL Server
* Ví dụ kết nối đến MySQL
```php
$configArray = [
    'driver'   => 'Pdo',
    'username' => 'root',
    'password' => '',
    'dsn'            => 'mysql:dbname=xtdb;host=localhost',
    'driver_options' => [
        //PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'",
        ],
    ];
```
# Thực hiện lệnh SQL
## Thi hành ngay lập tức câu lệnh SQL
* Gọi phương thức query với tham số thứ hai là hằng QUERY_MODE_EXECUTE thì sẽ thi hành ngay lệnh SQL và kết quả trả về là đối tượng Zend\Db\ResultSet\ResultSet chứa tập hợp kết quả truy vấn trả về

``` php
//$dbadapter là đối tượng Zend\Db\Adapter\Adapter

$query = "select * from Categories";

//Lấy ResultSet
$items = $dbadapter->query($query, \Zend\Db\Adapter\Adapter::QUERY_MODE_EXECUTE);

//Đọc dữ liệu query trả về
foreach ($items as $item) {
    var_dump($item);
}
```
* Một vd cụ thể để bạn hiểu rõ hơn:
*  Tạo listcategory Action trong controller
```php
//module/Application/src/Controller/IndexController.php
public function listcategoryAction() {
    $configArray   = [
        'driver'   => 'Mysqli',
        'username' => 'root',
        'password' => '',
        'database' => 'xtdb',
    ];

    $dbadapter = new \Zend\Db\Adapter\Adapter($configArray);
    $query = "select * from Categories";


    $results = $dbadapter->query($query,
        \Zend\Db\Adapter\Adapter::QUERY_MODE_EXECUTE);
    $categories = [];
    foreach ($results as $item) {
        $categories[] = $item;
    }

    return new ViewModel(['categories' => $categories]);
}
//...

```    

* Tạo một view để hiển thị dữ liệu. Với controller như trên thì đường dẫn file mặc định là views/index/index.phtml
```php
<h1>Danhh sách các category</h1>
<?
$categories = $this->categories;
?>

<table class="table table-bordered">
    <tr>
        <th>CategoryID</th>
        <th>CategoryName</th>
        <th>Description</th>
    </tr>
    <?foreach ($categories as $cate):?>
        <tr>
            <td><?=$cate['CategoryID']?></td>
            <td><?=$cate['CategoryName']?></td>
            <td><?=$cate['Description']?></td>
        </tr>
    <?endforeach;?>
</table>
```
## Query Preparation
* Khi gọi phương thức query với tham số thứ hai mặc định là QUERY_MODE_PREPARE thì nó trả về một đối tượng Statement (Zend\Db\Adapter\Driver\StatementInterface). Quy trình để thi hành một lệnh SQL như sau:

    * Tạo đối tượng Statement, ví dụ lệnh $adapter->query()
    * Inject đối tượng ParameterContainer chứa các tham số sẽ điền vào placeholder của câu lệnh vào Statement
    * Thi hành lệnh với phương thức $statement->execute()
    * Kiểm tra kết quả trả về và xử lý theo tình huống
* Ví dụ sửa lại đoạn mã của action trên
```php
//module/Application/src/Controller/IndexController.php
public function listcategoryAction() {

    $configArray   = [
        'driver'   => 'Mysqli',
        'username' => 'root',
        'password' => '',
        'database' => 'xtdb',
    ];

    $dbadapter = new \Zend\Db\Adapter\Adapter($configArray);
    $query = "select * from Categories where CategoryID	= ? or CategoryID = ?";
    $statement = $dbadapter->query($query);
    $statement->setParameterContainer(new ParameterContainer(
        [1,7]
    ));

    $results = $statement->execute();

    $categories = [];
    foreach ($results as $item) {
        $categories[] = $item;
    }
    return new ViewModel(['categories' => $categories]);
}
```
* Việc sử dụng phương thức query như trên để tạo ra Statement khuyến khích áp dụng với các query thực hiện một lần, chạy ngay. Trường hợp khác tốt hơn tạo ra Statement bằng cách:
```php
$statement = $adapter->createStatement($sql, $optionalParameters);
$result    = $statement->execute();
```
# Cấu hình tham số khởi tạo Adapter DB trong Skeleton
* Để sử dụng đối tượng Zend\Db\Adapter\Adapter như một dịch vụ trong hệ thống quản lý bởi Service Manager (Chỉ một đối tượng Adapter trong hệ thống) thì bạn chỉ cần thiết lập tham số config ở cấp độ ứng dụng hoặc module.

* Thường thì cấu hình Adapter kết nối DB khai bảo ở cấp độ ứng dụng, cụ thể trong file config: config/autoload/global.php

* Bạn chỉ cần thêm một phần tử db là mảng cấu hình Adapter trên
```php
return [
//...
    'db' = [
        'driver'   => 'Mysqli',
        'username' => 'root',
        'password' => '',
        'database' => 'xtdb',
    ];
//...
];
```
* Nếu có cấu hình trên, thì đối tượng Zend\Db\Adapter\Adapter có được mỗi khi ấn dụng cần chỉ cần gọi:
```php
$adapter = $servicemanager->get(\Zend\Db\Adapter\Adapter::class);
```
# Ví dụ sử dụng Adapter như Service
* Bước1:  Bạn hãy cập nhật config/autoload/global.php như trên theo đúng thông số kết nối đến CSDL cấu hình của bạn (ở đây sử dụng dữ liệu mẫu [xtdb](https://github.com/ichte/xtlab/blob/master/xtdb.zip)  tải ở đây).

* Bước 2:  Thiết lập controller Index như là một factory như hướng dẫn tại Đăng ký controller, bằng cách triển khai thêm phương thức __invoke($container), đồng thời thêm một biến thuộc tính $servicemanager
```php
//module/Application/src/Controller/IndexController.php

class IndexController extends AbstractActionController
{
    protected $servicemanager;

    public function __invoke($container)
    {
        //Lưu Service Manager
        $this->servicemanager = $container;
        return $this;
    }

 //...
```
Sau đó mở file module/Application/config/module.config.php thay dòng Controller\IndexController::class => InvokableFactory::class bằng Controller\IndexController::class => Controller\IndexController::class
* Bước 3:  Tạo thử phương thức testadapter để kiểm tra
```php
//module/Application/src/Controller/IndexController.php

public function testadapterAction() {

    $adapter = $this->servicemanager
                ->get(\Zend\Db\Adapter\Adapter::class);
    return $this->getResponse()
                ->setContent('Cơ sở dữ liệu:'.$adapter->getCurrentSchema());

}
 //...
```
# Tài liệu
* https://docs.zendframework.com/tutorials/db-adapter/
* https://bom.to/Jv8oS2