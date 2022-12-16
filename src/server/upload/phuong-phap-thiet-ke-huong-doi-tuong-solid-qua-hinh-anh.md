Xin chào tất cả các bạn! Với các bạn đang làm backend như mình, có lẽ các bạn đã nghe về `SOLID`. Nó là 5 nguyên tắc phát triển phầm mềm giúp cho lập trình viên khi xây dựng phần mềm sẽ dễ dàng mở rộng và bảo trì hơn.

Nếu google 1 bài viết về `SOLID`, có rất nhiều bài viết về `SOLID` nhưng mình thấy các bài viết chỉ có chữ là chữ, và hiếm khi thấy bất kỳ ví dụ nào có hình ảnh minh họa. Điều này gây khó hiểu cho người học. Vì vậy, mục đích chính của bài viết này là để hiểu rõ hơn về các nguyên tắc này bằng cách sử dụng hình ảnh minh họa và nhấn mạnh đến mục tiêu cho từng nguyên tắc.

Các bạn hãy cùng mình khám phá về thế giới `SOLID` nhé!

![](https://images.viblo.asia/5f91c090-2ed4-4d72-9cc8-b27811175d9b.png)

`SOLID` là tập hợp của 5 nguyên tắc và mỗi nguyên tắc ứng với 1 ký tự trong nó:
1. **S: Single responsibility principle.**
2. **O: Open/Closed principle.**
3. **L: Liskov Substitution Principle.**
4. **I: Interface segregation principle**.
5. **D: Dependency Inversion Principle.**

# S: Single responsibility principle
> **Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất)**

![](https://images.viblo.asia/1c3e6479-d560-41a5-b2ca-e7b1dcd0c059.png)

 Nếu 1 class có quá nhiều chức năng, quá cồng kềnh, việc thay đổi code sẽ rất khó khăn, mất nhiều thời gian, còn dễ gây ảnh hưởng tới các module đang hoạt động khác.
 
 Ví dụ 1 class vi phạm nguyên tắc này:
 ```php
 public class MasterRobot()
{
    public void cooking();
    public void garden();
    public void paint();
    public void driver();
}
 ```
 Class này đang chịu trách nhiệm cho 4 chức năng: nấu ăn, làm vườn, vẽ tranh và lái xe. Giả sử, nếu chức năng nấu ăn của robot bị lỗi thì sao. Ta sẽ phải sửa cả con Robot, điều này có thể gây ảnh hưởng đến các chức năng khác.
 
 Theo đúng nguyên tắc, ta phải tách class này ra làm 4 class riêng. Tuy số lượng class nhiều hơn nhưng việc sửa chữa sẽ đơn giản hơn, class ngắn hơn nên cũng ít bug hơn.
 
**Mục tiêu:**
> Nguyên tắc này nhằm mục đích phân tách nhỏ các hành vi để nếu có lỗi phát sinh do thay đổi của bạn, nó sẽ không gây ảnh hưởng đến các hành vi không liên quan khác.

# O: Open/Closed principle
> **Có thể thoải mái mở rộng 1 class, nhưng không được sửa đổi bên trong class đó (open for extension but closed for modification)**

![](https://images.viblo.asia/8c8f3c5e-9ba7-40f1-9413-adf811fdd301.png)

Việc thay đổi hành vi hiện tại của 1 Class sẽ ảnh hưởng đến hệ thống đang sử dụng Class đó. Nếu bạn muốn Class thực hiện nhiều chức năng hơn, cách tiếp cận lý tưởng là viết Class mới mở rộng từ Class cũ (bằng cách kế thừa hoặc sở hữu Class cũ).

**Mục tiêu:**
> Nguyên tắc này nhằm mục đích mở rộng hành vi của Class mà không làm thay đổi hành vi hiện có của Class đó. Điều này là để tránh gây ra lỗi ở bất cứ nơi nào Class đang được sử dụng.

# L: Liskov Substitution Principle

> **Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn hay không ra lỗi của chương trình.**
> 
![](https://images.viblo.asia/8130569f-6b7f-4d89-8276-ae589ea21270.png)

Khi 1 `Class con` không thể thực hiện các hành động giống như `Class cha` của nó, điều này có thể gây ra lỗi.

Nếu bạn có 1 `Class A` và tạo 1 `class B` từ `class A` đó, thì `Class A` sẽ trở thành `Class parent (Class cha mẹ)`, `Class B` là `Class child (Class con)`. Các Class con nên có thể làm tất cả những gì mà Class cha mẹ có thể làm. Quá trình này được gọi là [Kế thừa](https://www.php.net/manual/en/language.oop5.inheritance.php).

Các Class con nên có thể xử lý các yêu cầu tương tự và cung cấp những kết quả tương tự như Class cha.

Liên tưởng đến hình ảnh trên, `Robot tên là Sam (Class cha)` cung cấp cafe (có thể là bất kỳ loại cafe nào). Có thể chấp nhận cho `Robot tên Eden (Class con)` để cung cấp Cappuchino vì nó là 1 loại cụ thể của cafe, nhưng không thể chấp nhận khi `Robot tên Eden` cung cấp 1 chai nước được.

Nếu Class con không đáp ứng được nhu cầu này, điều này có nghĩa là Class con bị thay đổi hoàn toàn và vi phạm quy tắc này.

**Mục tiêu:**
> Nguyên tắc này nhằm mục đích thực thi tính nhất quán để `Class cha` hoặc `Class con` của nó có thể được sử dụng theo cùng 1 cách mà không có bất kỳ lỗi nào.

# I: Interface segregation principle

> Một class không nên thực hiện một `interface` mà nó không dùng đến hoặc không nên phụ thuộc vào một phương thức `method()` mà nó không sử dụng.
Để làm điều này, thay vì một `interface` lớn bao trùm chúng ta tách thành nhiều `interface` khác nhau.

![](https://images.viblo.asia/ee6e9348-e83f-4ee0-af51-b2bed6048770.png)

Như đã biết, 1 Class `implement` từ 1 `interface` sẽ phải thực hiện `override` lại tất cả các phương thức `method()` của `interface` này, và có thể có những phương thức `method()` trong `interface` mà class này không dùng đến. 
Ví dụ:

```php
interface Workable
{
    public function canSpinAround();
    public function canRotateArm();
}

class RobotA implement Workable
{
    public function canSpinAround(){
        return 'Robots that can spin around';
    }
    
    public function canRotateArm() {
        return false;
    }
}

class RobotB implement Workable
{
    public function canSpinAround(){
        return false;
    }
    
    public function canRotateArm() {
        return 'Robots that can rotate arm';
    }
}
```

Sự dư thừa ở ví dụ trên đã hiện lên rõ ràng, và chúng ta sẽ tối ưu lại bằng cách tách `interface` tổng thành các `interface` nhỏ hơn:
```php
interface SpinAround()
{
    public function canSpinAround();
}

interface RotateArm()
{
    public function canRotateArm();
}

class RobotA implement SpinAround
{
    public function canSpinAround(){
        return 'Robots that can spin around';
    }
}

class RobotB implement RotateArm
{
    public function canRotateArm() {
        return 'Robots that can rotate arm';
    }
}
```

**Mục tiêu:**
> Nguyên tắc này nhằm mục đích là chia 1 tập hợp các hành động thành các tập nhỏ hơn để Class CHỈ thực hiện tập hợp các hành động mà nó yêu cầu.

# D: Dependency Inversion Principle

> 1. **Các module cấp cao không nên phụ thuộc vào các modules cấp thấp.**
> 
>    **Cả 2 nên phụ thuộc vào sự trừu tượng (abstraction).**
> 2. **Trừu tượng (Interface/Abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.**

![](https://images.viblo.asia/fac2b786-eae7-47fe-8d70-3048471ecfaf.png)

Đầu tiên, nên hiểu vài thuật ngữ sau:

- 1 `module cấp cao (Class)` là 1 module phụ thuộc vào module khác.
- `Trừu tượng (Abstract)` là 1 cái gì đó không hoàn toàn cụ thể. Nó chỉ là 1 ý tưởng hoặc ý chính của 1 cái gì đó mà không có bản triển khai cụ thể. Vì vậy, sự trừu tượng trong lý thuyết có nghĩa là tạo ra 1 `interface` hoặc 1 `abstract class` không cụ thể.

Nguyên tắc này có thể hiểu:

> -  Những thành phần trong 1 chương trình chỉ nên phụ thuộc vào những cái `trừu tượng (abstraction)`.
> 
>     Những thành phần trừu tượng không nên phụ thuộc vào các thành phần mang tính cụ thể mà nên ngược lại.
>     
> - Những cái `trừu tượng (abstraction)` là những cái ít thay đổi và biến động, nó tập hợp những đặc tính chung nhất của những cái cụ thể.
> 
>    Những cái cụ thể dù khác nhau thế nào đi nữa đều tuân theo các quy tắc chung mà cái trừu tượng đã định ra.
>    
>    Việc phụ thuộc cái trừu tượng sẽ giúp chương trình linh động và thích ứng tốt với các sự thay đổi diễn ra liên tục.
   
Với hình ảnh ví dụ trên thì ... `interface` chính là `đuôi xoáy`, `implementation` là cái dao cắt và cái cưa cắt (mình không thể hình dung ra được nó là cái gì =)) ... haizzguzzz ... các bạn cứ nghĩ ra 1 cái gì đó dùng để cắt cái pizza đi :sweat_smile:). Ta có thể swap dễ dàng giữa 2 dụng cụ cắt khác nhau vì `Robot` chỉ quan tâm chỉ quan tâm tới `interface` (đuôi xoáy) để nó có thể cắt được pizza mà không quan tâm đến `implementation` là gì.

Trong code cũng như vậy, các bạn có thể xem qua ví dụ này nhé (bow)
```php
interface Robot
{
    public function cut();
}

class RobotUseKnife implement Robot
{
    public function cut() {
        //code
    }
}

class RobotUseSaw implement Robot
{
    public function cut() {
        //code
    }
}

clas RobotCutPizza
{
    private $robot;
    
    public function __construct(Robot $robot)
    {
        $this->robot = $robot;
    }
}
```

**Mục tiêu:**
> Nguyên tắc này nhằm mục đích giảm sự phụ thuộc của `Module cấp cao` vào `Module cấp thấp` bằng việc sử dụng `interface`. 

# Kết luận

Cuối cùng mình cũng giải thích xong được 5 nguyên tắc :sweat_smile: . Qua bài viết này, mình hy vọng bạn sẽ giúp bạn làm cho phần code của mình dễ dàng điều chỉnh, mở rộng và kiểm tra hơn. Mình chẳng biết nói gì cả, chỉ biết cảm ơn bạn đã đọc hết bài của mình và nếu giúp ích nhiều cho bạn hãy ủng hộ cho mình nhé :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:

**Tham khảo**

https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898

https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/

https://viblo.asia/p/lap-trinh-huong-doi-tuong-trong-phpphan-3-Az45bb1O5xY