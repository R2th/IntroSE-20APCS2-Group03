Xin chào tất cả các mọi người, bài viết này mình xin trình bày tổng quan về Design Patterns, rất mong được sự theo dõi của mọi người

### 1) Design Patterns là gì?

- Design patterns là một kỹ thuật trong lập trình hướng đối tượng, được các nhà nghiên cứu đúc kết và tạo ra các mẫu thiết kế chuẩn.
- Design pattern không phải là một ngôn ngữ lập trình cụ thể nào cả, mà nó có thể sự dụng được trong hầu hết các ngôn lập trình có hỗ trợ OOP hiện nay.

### 2) Tại sao nên sử dụng Design Pattern?

- Design pattern cung cấp giải pháp ở dạng tổng quát
- Design pattern giúp dễ dàng mở rộng và tăng tốc độ phát triển phần mềm
- Dùng lại các design pattern giúp tránh được các vấn đề tiềm ẩn có thể gây ra những lỗi lớn, dễ dàng nâng cấp, bảo trì về sau
-  Một lợi thế lớn để sử dụng một mẫu thiết kế là lập trình viên khác sẽ có thể dễ dàng nhận ra nó (đặc biệt là nếu bạn sử dụng quy ước đặt tên tốt).

### 3) Phân loại Design Pattern

- Về cơ bản thì design pattern sẽ được chia làm 3 dạng chính:

**Creational Design Pattern:** ( nhóm khởi tạo): Nhóm này sẽ giúp bạn rất nhiều trong việc khởi tạo đối tượng

- Abstract Factory

    Cung cấp một interface cho việc tạo lập các đối tượng (có liên hệ với nhau) mà không cần qui định lớp khi hay xác định lớp cụ thể (concrete) tạo mỗi đối tượng
- Builder

    Tách rời việc xây dựng (construction) một đối tượng phức tạp khỏi biểu diễn của nó sao cho cùng một tiến trình xây dựng có thể tạo được các biểu diễn khác nhau
- Factory Method

    Định nghĩa Interface để sinh ra đối tượng nhưng để cho lớp con quyết định lớp nào được dùng để sinh ra đối tượng Factory method cho phép một lớp chuyển quá trình khởi tạo đối tượng cho lớp con
- Multiton

    Mẫu Multiton được mở rộng từ mẫu singleton. Nếu bạn nào để ý sẽ phát hiện ngay trong mẫu singleton phần contructor hoàn toàn không có tham số trong đó. Nhưng trong rất nhiều trường hợp, chúng ta cần khởi tạo một đối tượng với những thông số cấu hình nhất định, và cũng chính vì điều này mà multiton ra đời
- Pool

    Cung cấp một kỹ thuật để tái sử dụng objects thay vì khởi tạo không kiểm soát
- Prototype

    Qui định loại của các đối tượng cần tạo bằng cách dùng một đối tượng mẫu, tạo mới nhờ vào sao chép đối tượng mẫu này
- Simple Factory

    Tạo ra các đối tượng mà không để lộ việc tạo ra đối tượng đó như thế nào khi sử dụng
- Singleton

    Đảm bảo 1 class chỉ có 1 instance và cung cấp 1 điểm truy xuất toàn cục đến nó

**Strutural Design Pattern:** (nhóm cấu trúc) Các mẫu liên quan đến cấu trúc, kết cấu các đối tượng

- Adapter/ Wrapper

    Do vấn đề tương thích, thay đổi interface của một lớp thành một interface khác phù hợp với yêu cầu người sử dụng lớp
- Bridge

    Tách rời ngữ nghĩa của một vấn đề khỏi việc cài đặt ; mục đích để cả hai bộ phận(ngữ nghĩa và cài đặt) có thể thay đổi độc lập nhau
- Composite

    Tổ chức các đối tượng theo cấu trúc phân cấp dạng cây; Tất cả các đối tượng trong cấu trúc được thao tác theo một cách thuần nhất như nhau.Tạo quan hệ thứ bậc bao gộp giữa các đối tượng. Client có thể xem đối tượng bao gộp và bịbao gộp như nhau -> khả năng tổng quát hoá trong code của client -> dễ phát triển, nâng cấp, bảo trì
- Decorator

    Gán thêm trách nhiệm cho đối tượng (mở rộng chức năng) vào lúc chạy
- Facade

    Cung cấp một interface thuần nhất cho một tập hợp các interface trong một “hệ thống con”(subsystem). Nó định nghĩa 1 interface cao hơn các interface có sẵn để làm cho hệ thống con dễ sử dụng hơn
- Flyweight

    Sử dụng việc chia sẻ để thao tác hiệu quả trên một số lượng lớn đối tượng “cở nhỏ”(chẳng hạn paragraph, dòng, cột, ký tự…)
- Proxy

    Cung cấp đối tượng đại diện cho một đối tượng khác để hỗ trợ hoặc kiểm soát quá trình truy xuất đối tượng đó. Đối tượng thay thế gọi là proxy

**Behavioral Design Pattern** (nhóm ứng xử) Các mẫu giải quyết các vấn đề về hành vi đối tượng

- Chain Of Responsibilities
- Command
- Iterator
- Mediator
- Memento
- Null Object
- Observer
- Specification
- State
- Strategy
- Template Method
- Visitor

### 4) Singleton Design Pattern

- Singleton pattern thuộc về Creational Design Pattern
- Là một design pattern có tần suất sử dụng khá nhiều trong lập trình
- Singleton Design Pattern đảm bảo rằng một lớp chỉ có một thể hiện (instance) duy nhất và trong đó cung cấp một cổng giao tiếp chung nhất để truy cập vào lớp đó
- Sử dụng Singleton khi chúng ta muốn

    Đảm bảo rằng chỉ có một instance của lớp
    Việc quản lý việc truy cập tốt hơn vì chỉ có một thể hiện duy nhất
    Có thể quản lý số lượng thể hiện của một lớp trong giớn hạn chỉ định
    
**Ví dụ** Website cần một đối tượng kết nối đến database nhưng chỉ cần duy nhất một đối tượng cho toàn bộ ứng dụng, sử dụng Singleton Pattern sẽ giải quyết được vấn đề này. Để bắt đầu bạn sử dụng một thuộc tính static để đảm bảo rằng chỉ có một thực thể của lớp này tồn tại

```php
class SomeClass {
  static private $_instance = NULL;
}
```

Thuộc tính static được chia sẻ giữa các đối tượng của class, do đó nếu đã có một thực thể của class thì tất cả sẽ tham chiếu đến class đó có thể sử dụng thuộc tính này. tiếp theo tạo ra một phương thức, phương thức này sẽ tạo ra một instance của class nếu nó chưa tồn tại và trả về instance đó.

```php
class ConnectDb {
  static private $_connect = NULL;
  static function getInstance() {
    if (self::$_connect == NULL) {
      self::$_connect = new Connect();
    }
    return self::$_connect;
  }
}
```

- Hàm getInstance() sẽ kiểm tra xem $_instance nếu  có giá trị là Null thì nó sẽ tạo mới một instance và gán nó vào thuộc tính $_instance sau đó sẽ trả ra instance vừa mới tạo
- Class này có thể được sử dụng như sau 

```php
    $connect = SomeClass::getInstance();
```

**Ví dụ** về Singleton pattern, tạo ra một file để thiết lập cấu hình

```php
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Ví dụ về Singleton Design pattern</title>
</head>
<body>
    <?php
    class Config {

       static private $_instance = NULL;
       private $_settings = array();

       private function __construct() {}
       private function __clone() {}

       // Phương thức này trả về một instance của class
       static function getInstance() {
          if (self::$_instance == NULL) {
             self::$_instance = new Config();
          }
          return self::$_instance;
       }
       // Phương thức này thiết lập cấu hình
       function set($index, $value) {
          $this->_settings[$index] = $value;
       }
       // Phương thức này lấy thiết lập cấu hình
       function get($index) {
          return $this->_settings[$index];
       }
    }
    // Tạo một đối tượng Config
    $config = Config::getInstance();

    // Thiết lập các giá trị trong thuộc tính cấu hình
    $config->set('database_connected', 'true');

    // In giá trị cấu hình
    echo '<p>$config["database_connected"]: ' . $config->get('database_connected') . '</p>';

    // Tạo một đối tượng thứ hai
    $test = Config::getInstance();
    echo '<p>$test["database_connected"]: ' . $test->get('database_connected') . '</p>';

    // Xóa các đối tượng sau khi sử dụng
    unset($config, $test);
    ?>
</body>
</html>
```

### Kết luận

- Design patterns là 1 đoạn mô tả, hoặc 1 khuôn mẫu để giải quyết 1 vấn đề nào đó
- Không phải là thiết kế cuối cùng
- Cho phép code được tối ưu hóa, dễ tái sử dụng. Người khác dễ dàng nắm bắt được code của bạn. Dễ nâng cấp sửa chữa
- Giúp cho lập trình viên có thể communicate với nhau

**Nguồn tham khảo**

- https://tuanitpro.com/
- https://toidicode.com/
- https://allaravel.com/