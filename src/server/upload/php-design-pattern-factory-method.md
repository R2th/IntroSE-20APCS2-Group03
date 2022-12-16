# **1.Định nghĩa**
Factory Method là một mẫu thiết kế sáng tạo giúp giải quyết vấn đề tạo ra các đối tượng sản phẩm mà không cần chỉ định các lớp cụ thể của chúng.

Factory Method định nghĩa một phương thức, nên được sử dụng để tạo các đối tượng thay vì gọi hàm dựng trực tiếp (toán tử new). Các lớp con có thể ghi đè phương thức này để thay đổi lớp đối tượng sẽ được tạo.
# **2.Vấn đề**
Hãy tưởng tượng rằng bạn đang tạo ra một ứng dụng quản lý hậu cần. Phiên bản đầu tiên của ứng dụng của bạn chỉ có thể xử lý việc vận chuyển bằng xe tải, vì vậy phần lớn mã của bạn sẽ tồn tại trong lớp Xe tải.

Sau một thời gian, ứng dụng của bạn trở nên phổ biến đến mức bạn nhận được rất nhiều yêu cầu bao gồm cả việc vận chuyển  bằng đường biển, và sau này có thể mở rộng thêm các phương tiện vận chuyển khác nữa.
![](https://images.viblo.asia/2e4ae5bd-422a-4680-af7b-080686726c70.png)
# **3.Giải pháp**
Factory Method cho thấy thay thế việc tạo đối tượng trực tiếp (sử dụng toán tử new) với một lời gọi đến phương thức "factory" đặc biệt. . Các đối tượng được trả về bởi các Factory Method thường được gọi là "products".

Bạn có thể ghi đè lên phương thức factory trong một lớp con và thay đổi lớp của một đối tượng sẽ được tạo ra. Hãy xem nó hoạt động như thế nào
![](https://images.viblo.asia/27004c0c-e9b5-42f8-a036-cc935303f74e.png)
Tất cả các products phải có một interface chung (Transport).

![](https://images.viblo.asia/284fc47a-9013-41db-8d2b-a23aecf96c0e.png)

Các lớp con có thể trả về các products khác nhau miễn là các products này có một lớp cơ sở chung hoặc interface.
# **4.Cấu trúc**
![](https://images.viblo.asia/e6b5131e-00cc-4db8-971d-a0f15a1207a4.png)
1. Products là 1 interface duy nhất cho tất cả các đối tượng có thể được tạo bởi Creator và các lớp con của nó.
2. Concrete Products triển khai implementations Products Interface. Concrete Creators sẽ tạo và trả về các instances của các lớp này.
3. Creator chính là factory method trả về Product type.
4. Concrete Creators sẽ implement hoặc ghi đè factory method bằng cách tạo và trả lại một  Concrete Products.
# **5.Ví dụ**
### Code
```php
<?php

abstract class Creator
{
    public abstract function factoryMethod();

    public function someOperation()
    {
        // Call the factory method to create a Product object.
        $product = $this->factoryMethod();
        // Now, use the product.
        $result = "Creator: The same creator's code has just worked with " .
            $product->operation();

        return $result;
    }
}

?> 

<?php

interface Product
{
    public function operation();
}
?> 

<?php
include('Creator.php');

class ConcreteCreator1 extends Creator
{
    public function factoryMethod()
    {
        return new ConcreteProduct1();
    }
}

?> 

<?php
include('Product.php');
include('ConcreteCreator1.php');

class ConcreteProduct1 implements Product
{
    public function operation()
    {
        return "{Result of the ConcreteProduct1}";
    }
}

function clientCode(Creator $creator)
{
    print("Client: I'm not aware of the creator's class, but it still works.\n"
        . $creator->someOperation());
}

print("App: Launched with the ConcreteCreator1.\n");
clientCode(new ConcreteCreator1());
print("\n\n");
?> 
```
### Output
```
App: Launched with the ConcreteCreator1.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct1}
```