# **1.Định nghĩa**
**Facade Pattern** là một trong các pattern quan trọng nhất và hay nhất trong thiết kế phần mềm, thuộc nhóm **structural pattern**. Nó đóng vai trò che dấu đi tất cả những sự phức tạp, sự lằng nhằng của một chức năng nào đó trong hệ thống và cung cấp một giao diện, một class với một cách thức sử dụng đơn giản và hiệu quả hơn rất nhiều.
# **2.vấn đề**
Giả sử bạn có một số thao tác cần thực hiện theo thứ tự và một vài action được yêu cầu thực hiện ở một vài chỗ trong ứng dụng của bạn. Do đó bạn sẽ phải lặp code ở một vài vị trí khác nhau. Sau một thời gian, bạn cần thay đổi code. Lúc này chúng ta cần thay đổi ở nhiều chỗ với cùng một nội dung. Như vậy sẽ rất phiền phức nếu ứng dụng của chúng ta ngày càng lớn và mở rộng. Mặt khác việc bảo trì hệ thống cũng rất tốn kém và mất thời gian sau này.
# **3.Giải pháp**
Những gì bạn cần phải làm chỉ là thiết kế một **Facade**, nó sẽ quản lý các đoạn code dùng chung của bạn. Bây giờ, nếu chúng ta cần thay đổi bất kỳ thứ gì thì sẽ chỉ cần thay đổi trong **Facade** và **Facade** sẽ áp dụng thay đổi lên tất cả các vị trí được sử dụng, thay vì thực hiện sự thay đổi ở những nơi sử dụng những đoạn code đó.
# **4.Cấu trúc**
![](https://images.viblo.asia/c3d56ee5-7216-4883-a598-6f2c4543f351.png)
# **5.Ví dụ**
Ví dụ này minh họa cấu trúc của  **Facade** và tập trung vào các câu hỏi sau:
* **Facade** bao gồm những gì?
* Các lớp này đóng vai trò như thế  nào?
* Chúng liên quan với nhau ra sao ?

### Code
```
<?php

class Facade
{
    protected $subSystem1;
    protected $subSystem2;

    /**
     * Facade constructor.
     *
     * @param SubSystem1|null $subSystem1
     * @param SubSystem2|null $subSystem2
     */
    public function __construct(
        SubSystem1 $subSystem1 = null,
        SubSystem2 $subSystem2 = null
    )
    {
        $this->subSystem1 = $subSystem1 ?: new SubSystem1();
        $this->subSystem2 = $subSystem2 ?: new SubSystem2();
    }

    /**
     * operation
     *
     * @return string
     */
    public function operation()
    {
        $result = "Facade initializes subsystems:\n";
        $result .= $this->subSystem1->operation1();
        $result .= $this->subSystem2->operation1();
        $result .= "Facade orders subsystems to perform the action:\n";
        $result .= $this->subSystem1->operationN();
        $result .= $this->subSystem2->operationZ();
        return $result;
    }
}

class SubSystem1
{
    /**
     * operation1
     *
     * @return string
     */
    function operation1()
    {
        return "Subsystem1: Ready!\n";
    }

    /**
     * operationN
     *
     * @return string
     */
    function operationN()
    {
        return "Subsystem1: Go!\n";
    }
}

class SubSystem2
{
    /**
     * operation1
     *
     * @return string
     */
    public function operation1()
    {
        return "Subsystem2: Get ready!\n";
    }

    /**
     * operationZ
     *
     * @return string
     */
    public function operationZ()
    {
        return "Subsystem2: Fire!\n";
    }
}

/**
 * client Code
 *
 * @param Facade $facade
 */
function clientCode(Facade $facade)
{
    print($facade->operation());
}

$subSystem1 = new SubSystem1();
$subSystem2 = new SubSystem2();
$facade = new Facade($subSystem1, $subSystem2);
clientCode($facade);
```
###  Output.txt: Output
```
Facade initializes subsystems:
Subsystem1: Ready!
Subsystem2: Get ready!
Facade orders subsystems to perform the action:
Subsystem1: Go!
Subsystem2: Fire!
```
# **6.Lời kết**
Facade Pattern định nghĩa một giao diện ở một cấp độ cao hơn để giúp cho người dùng có thể dễ dàng sử dụng hệ thống con này vì chỉ cần giao tiếp với một giao diện chung duy nhất, nhằm che đi sự phức tạp của các thành phần hệ thống con (phụ) đối với client và khắc phục cấu trúc khớp nối lỏng lẻo giữa các hệ thống con với nhau và giữa các hệ thống con với client.