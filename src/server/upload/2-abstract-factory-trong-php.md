Xin chào, mình mới tìm hiểu chút nữa về design pattern. Hôm nay mình sẽ giới thiệu chút về Abtract Factory. Bài viết cũng có liên quan 1 chút đến Dota 2 để khiến bài đọc trở nên rối và khó hiểu với người không biết chơi game. Vậy nên hãy học chơi dota để hiểu rõ bài viết hơn nhé.
# 1. Intro
Có thể hiểu rằng design pattern (DP)  là tập hợp các mẫu thiết kế cũng như giải pháp trong việc xây dựng và bảo trì ứng dụng. Thiết kế theo mẫu thì sẽ giúp chúng ta có 1 ứng dụng có bố cục tốt, tổ chức linh hoạt, dễ hiểu, dễ bảo trì và nâng cấp.

Có khoảng 23 *design pattern* (được định nghĩa ở cuốn Design Patterns - Elements of Reusable Object-Oriented Software" của Erich Gamma, Richard Helm, Ralph Johnson, và John Vlissides) được chia thành 3 loại chính là:
- **Creational**:  gồm 5 DP là *Abstract Factory*, *Builder*, *Factory Method*, *Prototype* và *Singleton*. Loại này cung cấp cách khởi tạo các đối tượng khác nhau, giúp tăng khả năng linh hoạt và tái sử dụng của code.
- **Structural**: gồm 7 DP là *Adapter*, *Bridge*, *Composite*, *Decorator*, *Facade*, *Flyweight* và *Proxy*. Những pattern này giải thích cách làm thế nào để có thể tập hợp các đối tượng và các lớp vào 1 cấu trúc lớn cụ thể mà vẫn giữ được tính linh hoạt và hiêu quả.
- **Behavioral**: gồm 11 DP là *Chain of Responsibility*, *Command*, *Interpreter*, *Iterator*, *Mediator*, *Memento*, *Observer*, *State*, *Strategy*, *Template Method* và *Visitor*. Những pattern này liên quan đến thuật toán và phân chia trách nhiệm giữa các đối tượng.

***Abstract Factory*** là 1 *creational design pattern*, nó giả quyết vấn đề khi khởi tạo 1 họ của 1 đối tượng mà không cần xác định các lớp cụ thể của nó. Ta sẽ đi vào bài viết để xem cách hoạt động của nó.
# 2. Vấn đề
Tưởng tượng vấn đề của chúng ta là tạo ra 1 hệ thống gọi đến skill và tính toán dame skill đó của 1 hero trong dota. Chúng ta có:
- 2 hero: Axe và Injoker.
- 2 loại skill: skill 1 và skill 2.

Với mỗi hero đều có skill 1 và 2, tuy nhiên skill của chúng lại khác nhau zz...

Chúng ta cần 1 cách thức để gọi đến skill1 sao cho khi chúng ta chơi Axe nó sẽ gọi đến skill1 của Axe chứ không phải skill 1 của Injoker. Và tất nhiên là chúng ta cũng không muốn thay đổi code cũ khi thêm 1 skill mới hoặc 1 skill thứ 3 hay thứ 4 ...
# 3. Cách giải quyết
- **Abstract Factory** định nghĩa ra 1 interface cho việc tạo ra tất cả các đối tượng khác nhau, nhưng  để lại việc tạo đối tượng thực sự cho các lớp **Concrete Factory** .
- **Concrete Factory** sẽ trả lại đối tượng đúng với ngữ cảnh của nó và đảm bảo được tất cả các đối tượng được tạo đều phải hoạt động đúng trong trường hợp cụ thể.
- **Client** sẽ gọi tới các phương thức trong Factory thay vì tạo đối tượng trực tiếp. Client code sẽ làm việc với các factory và đối tượng chỉ qua **Abstract Factory**. Điều này cho phép ta có thể làm việc với các đối tượng khác nhau. Bạn chỉ cần tạo ra lớp **concrete factory** và đẩy nó vào code phía client.

Nói có vẻ trừu tượng, ta sẽ đi vào ví dụ cụ thể:

```php
/**
 * Abstract Factory
 */
abstract class SkillFactory
{
    abstract public function firstSkill();
    abstract public function secondSkill();
}

/**
 * Concrete Factory
 */
class AxeSkillFactory extends SkillFactory
{
    private $type = "Axe";
    function firstSkill() {
        return new BerserkerCall;
    }
    function secondSkill() {
        return new BattleHunger;
    }
}

class InjokerSkillFactory extends SkillFactory
{
    private $type = "Injoker";
    function firstSkill() {
        return new Quas;
    }
    function secondSkill() {
        return new Wex;
    }
}
```

Ta thấy ở đoạn trên ta đã tạo ra **AbstractFactory** là **SkillFactory**, nó phân biệt cho ta **FirstSkill** và **SecondSkill** . 

Các **ConcreteFactory** là các factory cụ thể tương ứng với hero sử dụng nó như **Axe** hay **Injoker**.  Ta thấy các **concreteFactory** này định nghĩa cho ta cụ thể xem hero đó sẽ có tương ứng skill 1 và 2 là gì. Giờ ta sẽ tạo các Skill đó để hero có thể sử dụng.
```php
/**
 * Abstract Object
 */
 abstract class Skill 
 {
     abstract function getDamage();
     abstract function getAoe();
 }
 
 abstract class FirstSkill extends Skill
 {
    protected $name="first_skill";
 }
 
 class BerserkerCall extends FirstSkill
 {
    private $damage;
    private $aoe;
    
    function __construct() {
        $this->damage = "100";
        $this->aoe = "500";
    }
    
    function getDamage() {
        return $this->damage;
    }
    
    function getAoe() {
        return $this->aoe;
    }
 }
 
  class Quas extends FirstSkill
 {
    private $damage;
    private $aoe;
    
    function __construct() {
        $this->damage = "200";
        $this->aoe = "600";
    }
    
    function getDamage() {
        return $this->damage;
    }
    
    function getAoe() {
        return $this->aoe;
    }
 }
```
Ở trên mình đã tạo ra 1 họ của các skill như 1 **ObjectAbstract** đó là **Skill**. Ở đó ta lại kế thừa tiếp họ **FirstSkill** sẽ là 1 họ nhỏ trong họ **Skill**. Nó chỉ định các skill sẽ là skill đầu tiên của 1 hero. 
Ở trong các skill cụ thể của họ **FirstSkill** ta có thể định nghĩa các method ở trong abstract classs **Skill**. Ví dụ như ở trên skill **BerserkerCall** có thể gây ra 100 damage trong phạm vi 500 aoe.

```php
 abstract class SecondSkill extends Skill
 {
    protected $name="second_skill";
 }
 
 class BattleHunger extends SecondSkill
 {
    private $damage;
    private $aoe;
    
    function __construct() {
        $this->damage = "50";
        $this->aoe = "800";
    }
    
    function getDamage() {
        return $this->damage;
    }
    
    function getAoe() {
        return $this->aoe;
    }
 }
 
  class Wex extends SecondSkill
 {
    private $damage;
    private $aoe;
    
    function __construct() {
        $this->damage = "300";
        $this->aoe = "1000";
    }
    
    function getDamage() {
        return $this->damage;
    }
    
    function getAoe() {
        return $this->aoe;
    }
 }
```
Tương tự với loại **SecondSkill**. Và khi muốn gọi ta chỉ cần đơn giản tạo đối tượng và call đến loại mà ta cần. Ví dụ như ta muốn tính damage gây ra bởi skill **BerserkerCall** khi bấm và đang chơi con Axe:

```php
function clientGetDamageFirstSkill(SkillFactory $skill)
{
   $firstSkill = $skill->firstSkill();
   
   return $firstSkill->getDamage();
}
// ta sẽ gọi hàm này kiểu như sau
$axeSkillFactory = new AxeSkillFactory();
clientGetDamageFirstSkill($axeSkillFactory);
```

Giờ thì ta không sợ bấm skill 1 của Axe mà lại ra skill 1 của invoker hay khi thêm mới 1 skill hoặc loại skill thứ 3 cho các hero ta chỉ việc thêm code chứ không phải sửa code. Nó tương ứng với [nguyên lý SOLID](https://viblo.asia/p/nguyen-tac-solid-trong-lap-trinh-huong-doi-tuong-LzD5dX145jY) mình đã đề cập ở bài viết trước.

Giờ ta hiểu được phần nào cách mà Vavle có thể sẽ lập trình cho dota2 (bốc phét tý thôi chứ game họ viết cồng kềnh lắm chứ không đơn giản như này).

Đây là 1 design pattern khá cơ bản nhưng rất hữu dụng, được sử dụng trong rất nhiều framework hiện tại. Nó giúp ta tuân thủ được nguyên lý SOLID, giúp ta tổ chức code rõ ràng và dễ tái sử dụng khi khởi tạo các đối tượng.

Cảm ơn các bạn đã đọc bài viết, có gì sai hoặc khó hiểu vui lòng commend phía dưới cho mình nhé.
# Tài liệu tham khảo
- https://refactoring.guru/design-patterns/abstract-factory
- https://sourcemaking.com/design_patterns/abstract_factory