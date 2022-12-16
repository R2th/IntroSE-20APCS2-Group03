Xin chào mọi người, lại là mình ... sau nhiều lần hứa hẹn sẽ viết 1 bài về build 1 project laravel với docker thì mình lại 1 lần nữa phải thất hứa vì build fail liên tọc :v Thôi để dành tháng sau vậy.

Bài viết này đề cập đến SOLID, những nguyên tắc trong thiết kế hướng đối tượng (tốt cho việc coding của bạn). Mình không phải là một người code sạch đẹp cũng như rõ ràng, do đó mình viết bài này cũng gần như là để nhắc nhở bản thân chú ý hơn sau mỗi lần code, tránh cho mọi người phải nhìn vào đống rác rưởi hoặc ai đó maintain phải code của mình sẽ đập bàn phím chửi (that's life, bro).

# Overview

Một vài điều mà ta hay được nghe để code sạch đẹp:
- Don’t Repeat Yourself (DRY), không nên viết lặp code trong cùng 1 chương trình mà nên tách ra dùng các abtract class hoặc interface.
- Đóng gói những phần dễ bị thay đổi
- Các lớp không nên phụ thuộc quá nhiều vào nhau (loosely coupling).
- Composition over inheritance, tức là kiểu nên sử dụng đa hình (polymorphic) hơn là thừa kế (inheritance) code bằng cách là chứa nhiều cách thể hiện khác nhau của một hành vi (function) thay cho kế thừa từ 1 lớp cha.
- Các lớp sử dụng nên làm việc với thành phần trừu tượng hơn là sử dụng trực tiếp lớp cài đặt.
- Đặt cho đối tượng tự thực hiện hành vi của nó thay vì áp một hành vi lên đối tượng.

Đù, viết xong đoạn trên chả hiểu gì cả @@ (chả hiểu sao viết được, copy trên mạng đấy, đừng tin). Nếu bạn đọc xong mấy cái kia mà thấy bản thân thực hiện đầy đủ rồi (hoặc hiểu rồi - chỉ cần hiểu thôi cũng được) thì thôi không cần đọc nữa đâu. Ai đọc xong mấy cái quy tắc kia mà vẫn còn ngáo đá và không hiểu gì như mình thì tiếp tục nhé mah fen :v 

Thực ra thì mấy câu trên được đúc kết từ 5 nguyên tắc thiết kế hướng đối tượng mà như tiêu đề đã nói, người ta gọi là SOLID:
- Single Responsibility
- Open-Closed
- Liskov’s Substitution
- Interface Segregation
- Dependency Inversion

Nhìn thấy mấy cái từ tiếng Anh kia đã không muốn đọc tiếp rồi (buồn ngủ vice lynch zz...). Đi ngủ nào!!! À mà để ý kĩ thì thấy SOLID là viết tắt của mấy chữ cái đầu của mấy cái nguyên tắc kia, nó làm mình nhớ đến cái ảnh ![](https://images.viblo.asia/4c276ff6-ec54-4164-8e5f-954d893777e3.jpg)
Mình nói trươc là các ví dụ trong bài đều liên quan đến deadgame Dota2 (hoặc mấy cái game nhái theo) nên có gì mọi người đọc ví dụ không hiểu thì cứ comment hỏi nhé.
# 1. Single Responsibility Principle (SRP) 
Nguyên lý này của 2 ông Tom DeMarco và Meilir Page-Jones nghĩ ra trong lúc làm việc. Đại khái hiểu nó là mỗi lớp chỉ nên làm 1 nhiệm vụ. Mỗi nhiệm vụ không phải chỉ là 1 phương thức, nó có thể là một nhóm các phương thức có các hành động liên quan đến nhau hoặc hỗ trợ lẫn nhau (ví dụ như chơi support thì phải mua mắt, mua gà chả hạn).

Ví dụ sau sẽ làm chúng ta hiểu rõ hơn nguyên lý này:
```php
class Item
{
    public $gold;
    
    public function regenerate() { // hồi phục };
    public function attackPhysic() { // tấn công vật lý };
    public function attackMagic() { // tấn công phép };
    public function increaseArmor() { // tăng giáp};
    public function increaseMagicResitant() { // tăng kháng phép };
    public function increaseHealth() { // tăng máu };
}
```
Đại khái ta thấy lớp item phải làm quá nhiều công việc vừa phải hồi phục, vừa phải tấn công, vừa phải phòng thủ. Ta sẽ khiến nó trở nên dễ dàng hơn bằng việc chia ra các nhiệm vụ qua các lớp con: 
```php
abstract class Item
{
    public $gold;
}

class RegenerationItem extends Item
{
    public function regenerate() { // hồi phục };
}

class AttackItem extends Item
{
    public function attackPhysic() { // tấn công vật lý };
    public function attackMagic() { // tấn công phép };
}

class DefenseItem extends Item
{
    public function increaseArmor() { // tăng giáp};
    public function increaseMagicResitant() { // tăng kháng phép };
    public function increaseHealth() { // tăng máu };
}
```
Với việc chia nhỏ ra ta thấy ta có thể dễ dàng gọi đến lớp tương ứng với từng công việc, nó cũng dễ hơn khi maintain code và không phải sửa ở lớp chính quá nhiều, các đối tượng đã được tách biệt hoàn toàn về nhiệm vụ.

# 2. Open-Closed Principle (OCP)
Nguyên lý đóng mở này được đề xuất bởi Bertrand Meyer. Đại khái có thể hiểu là chúng ta sẽ thiết kế các lớp sao cho có thể dễ dàng mở rộng và chỉ cần thêm code chứ không phải sửa code. Nguyên tắc chính là : 
- Open for extensibility: Sẵn sàng mở rộng để thêm chức năng.
- Closed for modification: đóng gói và không cho phép thay đổi code hiện tại.

Thôi bốc phét ít làm xừ nó ví dụ cho đễ hiểu:
```php
abstract class Damage 
{
  // sth  
}

class Physic extends Damage
{
    public $physicRegistance;
}

class Magic extends Damage
{
    public $magicRegistance;
}

class DamageCalculator
{
    public function damageTaken(Damage $damage, $damageReceive) {
        $dameTaken = 0;
        if ($damage instanceof Physic) {
            $dameTaken = $damageReceive * $damage->physicRegistance;
        }
        
        if ($damage instanceof Magic) {
            $dameTaken = $damageReceive * $damage->magicRegistance;
        }
        
        return $dameTaken;
    }
}
```
Ta thấy chúng ta phải chia cách tính từng loại sát thương đúng ko, rất tù và rối, nếu thêm tầm chục loại sát thương nữa chắc phải tạo thêm vài vòng if mới ổn =)). Ta sẽ sửa lại như sau:

```php
abstract class Damage
{
    abstract public function resistance();
}

class Physic extends Damage
{
    private $physicRegistance;
    
    public function resistance() {
         return $physicRegistance;
    };
}

class Magic extends Damage
{
    private $magicRegistance;
    
    public function resistance() {
         return $magicRegistance;
    };
}

class DamageCalculator
{
    public function damageTaken(Damage $damage, $damageReceive) {
        $dameTaken = $damageReceive * $damage->resistance() ?? 0;
        
        return $dameTaken;
    }
}

```

Giờ đây muốn thêm thắt gì ta chỉ cần viết thêm các lớp kế thừa từ Damage thôi mà không phải sửa lại cách tính damage nữa.

# 3. Liskov's Substitution Principle (LSP)
Nguyên lý này của ông Barbara Liskov. Đại khái ông này bảo là khi kế thừa, các lớp con phải đảm bảo được không làm thay đổi chức năng của lớp cha dưới góc nhìn người dùng.

Không hiểu gì đúng không, mình cũng không hiểu, làm cái ví dụ cho dễ hiểu:
```php
abstract class Creature
{
    int $name;
    
    abstract public function gainLevel();
}

class Injoker extends Creature
{
    public function gainLevel() { // tăng level bằng cách nào đó =.= }
}

class JungleCreep extends Creature
{
    public function gainLevel() { //  không tăng được level (em xin anh e chỉ là lính mà lấy level kiểu gì =.=) throw Exception... }
}
```

Rõ ràng ta thấy nguyên tắc LSP đã bị vi phạm, lớp JungleCreep không có khả năng lấy được level nhưng vẫn phải ghi đè phương thức từ lớp cha, thực tế nó không cần đến phương thức này. Ta sẽ sửa lại cho đúng:

```php
abstract class Creature
{
    int $name;
}

interface Levelable
{
    public function gainLevel();
}

class Injoker extends Creature implements Levelable
{
    public function gainLevel() { // lấy level bằng cách nào đó =.= }
}

class JungleCreep extends Creature
{
    // sth...
}
```
Ta sẽ sử dụng interface để thể hiện rằng lớp Injoker có khả nằng lấy level (has a Levelable). Còn lớp JungleCreep sẽ không có khả năng này, do đó nó không phải là Levelable.

# 4. Interface Segregation Principle (ISP)

Nguyên lý này của Robert Cecil Martin hay còn gọi là Uncle Bob.  Đại khái ông này muốn nói rằng, với các interface, ta nên tách ra thành nhiều interface, trong đó mỗi interface sẽ thể hiện 1 vai trò đặc trưng, phục vụ cho một nhiệm vụ riêng biệt.

Ví dụ sau sẽ giúp các bạn dễ hiểu hơn (vì mấy cái lý thuyết đọc chả hiểu gì đâu, đọc ví dụ rồi ngẫm lại lý thuyết mới ngấm được):
```php
interface IsCreature
{
    public function attack();
    public function reborn();
}

class Injoker implements IsCreature
{
    public function attack() { // tấn công};
    public function reborn() { // hồi sinh};
}

class JungleCreep implements IsCreature
{
    public function attack() { // tấn công};
    public function reborn() { // ra đi không ngày trở lại};
}
```

Rõ ràng JungleCreep không có khả năng hồi sinh, nhưng vẫn phải định nghĩa lại phương thức reborn(). Ta sẽ làm nó trở lên tốt hơn như sau: 
```php
interface Attackable
{
    public function attack();
}

interface Rebornable
{
    public function reborn();
}

interface IsCreature extends Attackable, Rebornable
{
}

class Injoker implements IsCreature
{
    public function attack() { // tấn công};
    public function reborn() { // hồi sinh};
}

class JungleCreep implements Attackable
{
    public function attack() { // tấn công};
}
```

Thiết kế như vậy giúp ta dễ tổ chức code hơn, có thể định nghĩa, thêm bớt 1 cách rõ ràng hơn (thực ra đôi khi cũng dễ gây rối code hơn do người dùng phải lần mò qua quá nhiều các tầng => khó đọc hiểu code nhanh được, nhưng nó dễ hơn cho việc thêm bớt code và chỉnh sửa sau này).

# 5. Dependency Inversion Principle (DIP)
Cái này cũng vẫn là nguyên lý của Uncle Bob. Nguyên lý này nói rằng, những thành phần có sự khái quát cao hơn thì không nên phụ thuộc trực tiếp vào các thành phần mang tính cụ thể hơn.

Chúng ta lại đi vào ví dụ sau cho dễ hiểu.
```php
class SeaPlayer
{
    public function acceptGame(){ // click nút accept trên màn hình };
}

class SeaChannel
{
    public function getPlayersInRoom() { // đưa thằng player vào phòng};
}

class Room
{
   public function createSeaRoom(SeaPlayer $player, SeaChannel $channel) {
       $player->acceptGame();
       $channel->getPlayersInRoom();
   }
}
```
Ở ví dụ trên ta thấy, rõ ràng khi tạo Room, ta đã sử dụng trực tiếp player ở khu vực sea và channel ở khu vực sea để tạo room. Như vậy nếu có nhiều khu vực ta sẽ phải tạo ra nhiều phương thức createRoom tương ứng. Do đó ta sẽ sửa lại để chỉ cần 1 phương thức có thể thông được mọi khu vực:
```php
interface Player
{
    public function acceptGame();
}

interface Channel
{
    public function getPlayersInRoom();
}

class SeaPlayer implements Player
{
    public function acceptGame() { // click nút accept trên màn hình };
}

class SeaChannel implements Channel
{
    public function getPlayersInRoom() { // đưa thằng player vào phòng};
}

class Room
{
   public function createRoom(Player $player, Channel $channel) {
       $player->acceptGame();
       $channel->getPlayersInRoom();
   }
}
```
Và ta có được phương thức createRoom chung và chỉ quan tâm đến player và channel truyền vào mà thôi.

# Chốt tộ
Tóm lại các nguyên lý này cho mình hiểu được cách viết code sao cho dễ hiểu, có khả năng tái sử dụng, dễ bảo trì, và tuân theo 1 quy củ chặt chẽ. Hy vọng bài viết sẽ giúp chúng ta có thể trở thành một developer tốt hơn với những dòng code sạch hơn. Cảm ơn đã đọc bài viết này. Mọi góp ý comment phía dưới giúp mình nhé 

### * Warning:
Nếu các bạn sau bài này các bạn tìm hiểu và chơi dota 2 khiến cho mất tập trung chểnh mảng thì không phải lỗi tại mình nhé =))