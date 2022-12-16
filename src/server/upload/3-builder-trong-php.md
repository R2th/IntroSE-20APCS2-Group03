Xin chào anhem, rất lâu rồi mình mới quay trở lại với series[ Desgin Pattern with PHP](https://viblo.asia/s/desgin-pattern-with-php-Am5yq0ek5db). Bữa trước mình có giới thiệu về [Abstract Factory](https://viblo.asia/p/2-abstract-factory-trong-php-LzD5dXpz5jY), 1 design pattern tương đối nổi tiếng. Hôm nay mình sẽ tiếp tục giới thiệu về 1 design pattern khác đó là Builder design pattern. 

Bài viết tiếp tục liên quan đến Dota 2 như mình đã đề cập từ bài viết trước là để khiến bài đọc trở nên rối và khó hiểu với người không biết chơi game. Do đó hãy học cách chơi Dota 2 để hiểu rõ hơn về bài của mình nhé.

# 1. Intro
Phần trước mình có giới thiệu rằng chúng ta có tất cả *23 design pattern* và được chia vào 3 nhánh chính. ***Builder design pattern*** ở trong nhóm **Creational**, nhóm này chủ yếu mục đích giúp ta xây dựng cách khởi tạo đối tượng, giúp tăng khả năng linh hoạt cũng như tái sử dụng.

Theo ý nghĩa của pattern này thì nó cho phép ta từng bước xây dựng các đối tượng phức tạp. Nó cho phép ta tạo ra những đối tượng có type khác nhau hoặc có cách biểu diễn khác nhau với cùng 1 cấu trúc code. Oke nghe khá phức tạp, ta sẽ thử tìm hiểu cách nó hoạt động

# 2. Vấn đề
Tưởng tượng hệ thống chúng ta muốn tạo ra 1 đối tượng là Hero. Để tạo ra đối tượng này thì cũng không có gì khó, như các phần trước ta đã giới thiệu thì việc build 1 hero tương đối dễ, nhưng những người sản xuất họ muốn kiếm tiền từ sản phẩm. Họ yêu cầu phải có các trang bị như quần áo, phông bạt, hiệu ứng cho từng hero. 

Nếu như các hero đều giống nhau về hình dáng (chân tay mặt mũi) thì oke không sao cả. Nhưng cấu trúc của mỗi hero lại khác nhau, hero người thì có thân có 2 tay, có 2 chân, đầu có tóc (kiểu như invoker)... còn hero thú thì thân có tay cầm búa, có 4 chân, đầu có sừng(kiểu con centau)... Do đó việc cài đặt từng thành phần 1 sẽ rất khó, ta sẽ ví dụ 1 trường hợp nhau sau: 

```php
class Hero 
{
    public function __construct ($numberOfEye, $numberOfHand, $numberOfLeg, $hasHorn, $handWeapon) {
        ....
    }
    
    public function createEye() {
        ....
    }
    public function createHand() {
        ....
    }
    public function createHorn() {
        ....
    }
    ....
}

// rồi khi khởi tạo con Centau ta sẽ phải kiểu
$centau = new Hero(2, 2, 4, true, true);
// còn với invoker kiểu:
$invoker = new Hero(2, 2, 2, false, false);
```
Oke vậy là truyền vào ti tỉ biến để cấu thành lên 1 nhân vật game có hình dáng như vậy và có những biến ta còn chả dùng đến. Chúng ta cần 1 cách thức để có thể build Hero 1 cách tổng quan hơn và dễ dàng hơn như vậy.

# 3. Cách giải quyết
Builder design pattern tách việc khởi tạo nhiều bước ở 1 đối tượng phức tạp - được gọi là Product thành 1 tập hợp các thao tác để khởi tạo từng phần của đối tượng. 1 lớp Director quyết định xem là đối tượng sẽ có thứ tự khởi tạo như thế nào, liên kết các thành phần đó. Lớp cuối là lớp Builder sẽ thực sự xây dựng các thành phần cho lớp đó.

Kiến trúc này được xây dựng như sau (cái này cop từ trang [này](https://refactoring.guru/design-patterns/builder))

![Kiến trúc Builder pattern](https://images.viblo.asia/9a7af43f-9d5a-43c0-b664-983b25422f73.png)

Ta thấy : 
- Builder: cung cấp interface để Director tạo ra các thành phần của đối tượng phức tạo là Product. Từ các thành phần này sẽ xây dựng lên Product.
- ConcreteBuilder: Cài đặt chi tiết nội dung của từng thành phần ứng với đối tượng muốn khởi tạo. Mỗi 1 thằng này tương ứng với 1 Product.
- Director: Người chơi sẽ gọi Director để tạo ra Product từ các thành phần do Builder cung cấp.

Lý thuyết đoạn này dài quá mình triển khai luôn cho lẹ (mình viết vào tầm gần sáng nên hơi buồn ngụ rầu)
```php
// Builder
interface HeroBuilder 
{
    public function createHead($eyeColor, $hairColor);
    public function createBody();
    public function createLowBody();
    public function getHero();
}
// ConcreteBuilder Invoker
class InvokerBuilder implements HeroBuilder {
    protected $hero;
    
    public function __construct() {
        $this->hero = new Invoker(); // ConcreteProduct
    }
    
    public function createHead($eyeColor, $hairColor) {
        $this->hero-> = $eyeColor;
        $this->hero['hair']['color'] = $hairColor;
        ....
        return $this;
    }
    public function createBody()...; // Giống thằng trên...
    public function createLowBody()...; // Tao cũng giống thằng trên...
    public function getHero() {
        return $this->hero;
    };
}

// ConcreteBuilder Centau
class CentauBuilder implements HeroBuilder
{
    protected $hero;
    
    public function __construct() {
        $this->hero = Invoker();
    }
    
    public function createHead($eyeColor, $hairColor) {
        $this->hero->head['eyes']['number'] = 4;
        $this->hero->head['eyes']['color'] = $eyeColor;
        $this->hero->head['hair']['color'] = $hairColor;
        ....
        return $this;
    }
    public function createBody()...; // Giống thằng trên...
    public function createLowBody()...; // Tao cũng giống thằng trên...
    public function getHero() {
        return $this->hero;
    };
}

// Product
interface Hero
{
    public function heroShow();
}

// ConcreteProduct
class Invoker implements Hero
{
    public $head = [];
    ...
    
    public function heroShow() {
        foreach ($this->head as $key => $value) {
            echo "Hero " . $key . "include: " . implode(',',  $value) ." \n";
        }
        ...
    }
}

// Director
class HeroBuilderDirector
{
    public $builder;
    
    public function setHeroBuilder(HeroBuilder $builder) {
        $this->builder = $builder;
    }
    
    public function buildHero() {
        return $this->builder->getHero();
    }
}

// Client Code

$heroBuilderDirector = new HeroBuilderDirector();
$invokerBuilder = new InvokerBuilder();
$invokerBuilder->createHead('red', 'yellow');
$invokerBuilder->createBody(...);
...
$heroBuilderDirector->setHeroBuilder($invokerBuilder);
$invoker = $heroBuilderDirector->buildHero();
$invoker->heroShow();
// => result
```

Chúng thấy rằng sau khi tạo xong thì với mỗi 1 loại Hero Builder, chúng ta có thể tạo cho nó các thành phàn Head, Body, ... khác nhau  mà vẫn giữ nguyên format của 1 hero phải có đủ 3 bộ phận. Đối tượng Hero là 1 đối tượng phức tạp vì nó yêu cầu khả năng thay đổi về hình dạng với từng hero một (mỗi hero có hình dáng khác nhau) nhưng tóm lại thì vẫn có cấu trúc tổng quát 3 phần chính.

Đoạn code tương đối dài, do đó các bạn có thể map lại với sơ đồ mình đã vẽ ở trên, các bạn sẽ thấy thực sự nó tương đối đơn giản.

# 4. Chốt tộ
Builder Design Pattern là 1 trong những pattern quan trọng giúp cho xây dựng được một object phức tạp, được sử dụng nhiều trong các framework hiện nay (điển hình các bạn thấy trong PHP là QueryBuilder trong laravel). 

Tất nhiên không hẳn bạn phải tuân thủ 100%  các pattern như hình vẽ, các bạn có thể áp dụng và kết hợp với 1 vài design pattern khác để hỗ trợ trong việc tạo ra builder cho đối tượng của mình. 

Cảm ơn anhem đã đọc bài viết, nếu có gì không đúng hoặc khó hiểu anhem cứ comment ở dưới để trao đổi nhá. 

# Tài lịu tham khảo 
- https://refactoring.guru/design-patterns/builder
- https://sourcemaking.com/design_patterns/builder
- Một vài khái niệm trên google...