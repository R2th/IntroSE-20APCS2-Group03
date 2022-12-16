# **1.Định nghĩa**
Adapter Pattern là một mẫu thiết kế cho phép bạn sửa đổi một giao diện (interface) giữa đối tượng (object) và một lớp (class) mà không phải sửa đổi trực tiếp lên chúng. Pattern này được sử dụng khi code của bạn sử dụng một thư viện bên ngoài như (API, Package, Libary ..) hoặc 1 class khác mà có sự thay đổi logic cách thường xuyên. 
# **2.vấn đề**
Giả sử có 2 người, 1 người đến từ Mỹ và chỉ có thể nói và hiểu tiếng Anh. Và người thứ hai là đến từ Việt Nam (^_^) và anh ta chỉ có thể nói và hiểu tiếng Việt. Bây giờ giả sử 2 người này phải giao tiếp với nhau. Họ sẽ làm như thế nào? Chắc chắn, họ sẽ cần sự giúp đỡ từ một thông dịch viên sẽ dịch từ ngôn ngữ này sang ngôn ngữ khác, để họ có thể giao tiếp với nhau. Trong trường hợp này, thông dịch viên sẽ hoạt động như một Adapter.

Giả sử có một người có thị lực yếu. Anh ấy cần đọc báo. Bây giờ mắt anh không tương thích với việc đọc văn bản trên báo. Những gì anh ta cần bây giờ là một cái kính. Ở đây kính sẽ hoạt động như một Adapter.
# **3.Cấu trúc**
![](https://images.viblo.asia/ada7a27d-25f3-43a7-bbb4-331f1e73861f.png)

* Target: định nghĩa giao diện Client đang làm việc (phương thức request()).
* Client: Đây là lớp sẽ sử dụng đối tượng của bạn (đối tượng mà bạn muốn chuyển đổi giao diện).
* Adoptee: Đây là những lớp bạn muốn lớp Client sử dụng, nhưng hiện thời giao diện của nó không phù hợp.
* Adapter: Đây là lớp trung gian, thực hiện việc chuyển đổi giao diện cho Adaptee và kết nối Adaptee với Client.
# **4.Ví dụ**
```
<?php

/**
 * Te Target defines the domain-specific interface used by the client code.
 */
class Target
{
    public function request()
    {
        return "Target: The default target's behavior.";
    }
}

/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
class Adaptee
{
    public function specificRequest()
    {
        return ".eetpadA eht fo roivaheb laicepS";
    }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * interface.
 */
class Adapter extends Target
{
    private $adaptee;

    public function __construct(Adaptee $adaptee)
    {
        $this->adaptee = $adaptee;
    }

    public function request()
    {
        return "Adapter: (TRANSLATED) ".strrev($this->adaptee->specificRequest());
    }
}

/**
 * The client code supports all classes that follow the Target interface.
 */
function clientCode(Target $target)
{
    print($target->request());
}

print("Client: I can work just fine with the Target objects:\n");
$target = new Target();
clientCode($target);
print("\n\n");

$adaptee = new Adaptee();
print("Client: The Adaptee class has a weird interface. See, I don't understand it:\n");
print("Adaptee: " .$adaptee->specificRequest());
print("\n\n");

print("Client: But I can work with it via the Adapter:\n");
$adapter = new Adapter($adaptee);
clientCode($adapter);
```

### Output
```
Client: I can work just fine with the Target objects:
Target: The default target's behavior.

Client: The Adaptee class has a weird interface. See, I don't understand it:
Adaptee: .eetpadA eht fo roivaheb laicepS

Client: But I can work with it via the Adapter:
Adapter: (TRANSLATED) Special behavior of the Adaptee.
```
# **5.Lời kết**
Adapter Design pattern thực sự rất hữu ích khi bạn code với ứng dụng lớn có sử dụng nhiều API từ bên ngoài, nó giúp bạn giảm thiểu tối đa nhưng thay đổi từ nhà cung cấp API. Nhìn thì thực sự nó hơi phức tạp vì phải tạo ra nhiều lớp và interface khác nhau nhưng nếu hệ thống lớn thì nó lại có rất nhiều hữu ích.