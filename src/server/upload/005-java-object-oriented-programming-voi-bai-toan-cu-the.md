© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Object-Oriented Design from real life to software](https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY).

**Hồ chủ tịch** có dạy:
- Học phải đi đôi với hành. Học không hành thì vô ích. Hành không học thì không trôi chảy.

Tất nhiên lời Bác đã dạy thì không thể nào trượt đi đâu được. Lý thuyết giỏi mà chưa thực chiến bao giờ thì chỉ xếp xó. Nhưng code nhiều theo kiểu **trăm hay tay quen** không nắm vững lý thuyết đến lúc đi phỏng vấn khó mà deal lương cao cho được.

> Bản thân mình hoặc đa số chúng ta đều đã từng rơi vào hoàn cảnh như trên. Chém phần phật nhưng làm không ra hồn. Hoặc apply design pattern phần phật mà lại không biết là đang sử dựng nó :joy_cat:.

Ok, let's begin.

## 1) Hunt the Wumpus

Chơi một game giải trí nhẹ nhàng trước đã. Nó có tên là [**Hunt the Wumpus**](https://osric.com/wumpus/) - dịch là **Săn quái vật** cho sang mồm. 

Luật chơi rất đơn giản, chúng ta sẽ đóng vai **chàng thợ sửa**.. à nhầm **thợ săn may mắn** đi săn các **con quái vật**.

Các phím điều hướng :arrow_left::arrow_right::arrow_up::arrow_down: + phím điều khiển (Ctrl/Alt) để di chuyển nhân vật hoặc bắn quái thú. Nếu 8 hướng xung quanh xuất hiện quái thú thì sẽ có dòng thông báo kiểu **Tao ngửi thấy mùi gì đó quanh đây**, lúc nãy hãy cẩn thận nếu không bạn sẽ bị thịt. 

Hãy chơi thử để hiểu hơn về trò chơi, vì bài toán của chúng ta chính là code lại game này :hammer_and_pick:. 

Sau khi chơi xong, hãy tự code một version đơn giản, không cần UI, chỉ cần in ra màn hình thôi, kiểu **System.out.println()** là ngon lành rồi.

Hãy tự trải nghiệm và thử sức trước khi đi đến phần lời giải tiếp theo nhé.

## 2) Phân tích bài toán

Bước đầu tiên chính là phải hiểu thật kĩ requirement của bài toán, phân tích vẽ vời các kiểu cho nó professional. Đừng có hùng hục lao vào code luôn là **chết toi**, à cũng không chết đâu, chỉ là **ngắc ngoải** thôi.

> Năm 3 đại học khi bắt đầu kì thực tập, mình đi phỏng vấn công ty X và được các anh giao cho làm bài này trong vòng.. 4 tiếng.
> 
> Ôn cả mớ lý thuyết tưởng trúng tủ rồi, giờ bắt thực hành lại còn ngồi im 4 tiếng.. chả lẽ quay xe?
>
> Thôi, cố vậy chứ không lại mất mặt với mấy đứa bạn giới thiệu mình vào đây.
> 
> Thế là ngồi code luôn, chơi game đến đâu code đến đấy, chả có design hay phân tích gì.. Và finish xong trong 2 tiếng, trong lòng mừng thầm, pass cmnr hehe.
> 
> Các anh chưa cần xem đã hỏi luôn chú chắc chưa. Mình tự tin chắc rồi anh ạ. Sau một hồi chạy thử các anh chỉ phán một câu: **chú làm đúng như requirement, vậy là được**. 
> 
> Đang hí hửng thì các anh bảo thêm, bây giờ chú làm thêm cho anh 3 loại quái vật khác nhau là X, Y và Z. Y thành tinh rồi, bắn 2 phát mới chết, Z thì là bố của thành tinh, phải bắn 3 phát. 
> 
> Er... lại làm tiếp à anh? Thế chú có muốn pass phỏng vấn không? Thế là mình lại hì hục sửa code.. xin lỗi không phải sửa, mà là code lại từ đầu. Vì đã có kinh nghiệm nên lần này chỉ mất.. hơn 1 tiếng.

> Lại gọi các sếp ra ngó, và y hệt lần trước. Các sếp tiếp tục thêm requirement. Lần này trên bản đồ có thêm các item: **thêm mạng**, **thêm đạn**. Rồi thì **anh thợ săn** có 100 HP, gặp quái vật Y thì mất 50 tiết thôi, nhưng gặp quái vật Z thì die cmnl. 
> 
> Và các bạn biết diễn biến tiếp theo thế nào rồi đấy.. Không có tiếp theo nữa.

Đấy, các project trong thực tế thì nó cũng như chiếc phỏng vấn trên của mình thôi. Requirement thêm liên tục, thâm chỉ còn bị sửa luôn mới vcđ :joy:, thế nên là việc phân tích bài toán, design vẽ vời các thứ vô cùng quan trọng. Và một điều đặc biệt nữa, hãy nghĩ đến những thứ có thể thay đổi trong tương lai, hoặc ít nhất phải thiết kế làm sao để có thể mở rộng được.

Mình không chắc bạn đã code bài trên chưa. Nếu đã code, giả sự phải thêm các requirement như chiếc phỏng vấn của mình, bạn có cần.. đập đi làm lại không :joy_cat:.

**Nếu câu trả lời là có thì bài này đúng là dành cho bạn rồi đấy**.

### 2.1) Xác định yêu cầu bài toán

Bước đầu tiên luôn luôn là **xác định rõ requirement** là gì, cần **giải quyết vấn đề gì**?

Không quá phức tạp để xác định được requirement của bài toán, bao gồm:

- Một bản đồ hình vuông có tổng cộng N ô được xác định bởi 2 vị trí X và Y.
- Trong bản đồ bao gồm 1 hunter và N monsters không trùng vị trí của nhau.
- Hunter có khả năng di chuyển và bắn monsters. Nếu hunter di chuyển trúng monster hoặc bắn hết đạn thì game kết thúc.
- Monster không thể di chuyển, chỉ đứng im.
- Bản đồ chỉ hiển thị hunter, không hiển thị monsters.

### 2.2) Phân tích khả năng mở rộng

Bước này sẽ quyết định khá nhiều đến việc design thế nào, code ra sau để ready cho việc thêm/sửa requirement sau này. Nếu làm không tốt sẽ rất dễ dẫn đến kết quả như chiếc phỏng vấn của mình :hammer:.

Hãy quan sát dưới góc độ một người làm product, một người chơi game và một nhà phát hành, nghĩ xem liệu trong tương lai có phát sinh thêm requirement gì, hoặc có thể thêm gì để sản phẩm trở nên tốt hơn hay không:
- Một vài tình huống muốn hiển thị cả monsters thay vì chỉ hiển thị hunter.
- Map có thể có nhiều người chơi.
- Thay đổi kích thước map.
- Có thêm các item như bullet, hp...
- Có thêm nhiều loại quái vật khác nhau.
- ...

Thực ra để nghĩ thì vô vàn thứ, nếu nghĩ quá thì sẽ rơi vào tình huống over thinking, YAGNI (You aren't gonna need it), khiến bài toán trở nên phức tạp, và rối rắm... Vậy nên, hãy cẩn thận.

### 2.3) Design

Mấu chốt của vấn đề là thiết kế làm sao để open nhất có thể, hãy luôn tâm niệm rằng requirement sẽ thay đổi. Viết code sao cho clean, apply design pattern, phân chia layer, module hợp lý. Suy cho cùng mọi thứ bạn là đều là làm cho chính bản thân mình. Nếu không rất có khả năng một ngày nào đó chính bạn là người lọ mọ và chửi code của mình lúc.. 2h đêm.

Đến lúc apply OOP, SOLID hay Design pattern rồi. Hãy quy tất cả mọi thứ chúng ta thấy về thành các đối tượng, và các đối tượng này sẽ tương tác với nhau để tạo thành một trò chơi hoàn chỉnh.

Với bài toán này, phần design chỉ gói gọn trong mấy thứ:
- Xác định đối tượng.
- Xác định hành vi.
- Xác định sự tương tác giữa các đối tượng.

> Thực tế các bài toán phức tạp hơn cần trải qua nhiều thứ khác như design flow, phân chia module, layer, tương tác database, cache, diagram này nọ.

Bài toán bao gồm 5 đối tượng chính với các properties và behaviors:
- **GameConfig**: các config cần thiết để set-up game như số lượng đạn, số lượng monsters, kích thước bản đồ.
- **Location**: vị trí của các đối tượng trên bản đồ.
    - Properties: x, y.
- **Hunter**: thợ săn.
    - Properties: location.
    - Behaviors: di chuyển, bắn.
- **Monster**: quái vật.
    - Properties: location.
    - Behaviors: bị bắn.
- **Game**: lưu ý rằng game cũng là một object cần lưu ý và nó chứa **hunter** và **monster**:
    - Properties: hunter, monster, map size.
    - Behaviors: print map.

Ok, sau khi có đủ input, tiến hành bước tiếp theo là chuyển mọi thứ trên giấy sang code.

## 3) Code

Apply các kiến thức thu được tư bài trước, đến giờ quẩy rồi. Phần này như tiêu đề chỉ có code thôi chứ không còn gì :joy:. 

### 3.1) Tạo các interface tương ứng

Với **hunter** là khả năng di chuyển và bắn súng.

```java
public interface Attackable {

    void shoot(Damaged character);

}
```

```java
public interface Movable {

    void moveUp(int boundary);

    void moveDown(int boundary);

    void moveLeft(int boundary);

    void moveRight(int boundary);

}
```

Với **monster** là bị bắn :hammer:.

```java
public interface Damaged {

    void beAttacked(int hp);

    void attackedBy(Hunter hunter);

}
```

### 3.2) Tạo đối tượng cho monster và hunter

```java
public abstract class Character {

    private final Location location;

    protected Character(final Location location) {
        this.location = location;
    }

    public Location getLocation() {
        return Location.clone(location);
    }

    public void moveTo(Location newLocation) {
        location.setX(newLocation.getX());
        location.setY(newLocation.getY());
    }

    public abstract boolean alive();

    public abstract String name();

}
```
---
```java
public abstract class Hunter extends Character implements Movable, Attackable {

    protected Hunter(final Location location) {
        super(location);
    }

    public abstract boolean outOfBullet();

}
```
---
```java
public abstract class Monster extends Character implements Damaged {

    protected Monster(final Location location) {
        super(location);
    }

}
```
---
```java
public class Bear extends Monster {

    private int hp;

    public Bear(final Location location) {
        super(location);
        hp = 100;
    }

    @Override
    public boolean alive() {
        return hp > 0;
    }

    @Override
    public String name() {
        return "X";
    }

    @Override
    public void beAttacked(int hp) {
        this.hp -= hp;
    }

    @Override
    public void attackedBy(Hunter hunter) {
        beAttacked(100);
    }

}
```
---
```java
public class RobinHood extends Hunter {

    private int bulletCount;

    public RobinHood(final int bulletCount, final Location location) {
        super(location);
        this.bulletCount = bulletCount;
    }

    @Override
    public boolean outOfBullet() {
        return bulletCount <= 0;
    }

    @Override
    public void moveUp(int boundary) {
        final var newLocation = getLocation().transform(0, -1);
        if (!GameUtils.canMoveToNewLocation(newLocation, boundary)) {
            System.out.println("Cannot move up");
            return;
        }
        moveTo(newLocation);
    }

    @Override
    public void moveDown(int boundary) {
        final var newLocation = getLocation().transform(0, 1);
        if (!GameUtils.canMoveToNewLocation(newLocation, boundary)) {
            System.out.println("Cannot move down");
            return;
        }
        moveTo(newLocation);
    }

    @Override
    public void moveLeft(int boundary) {
        final var newLocation = getLocation().transform(-1, 0);
        if (!GameUtils.canMoveToNewLocation(newLocation, boundary)) {
            System.out.println("Cannot move left");
            return;
        }
        moveTo(newLocation);
    }

    @Override
    public void moveRight(int boundary) {
        final var newLocation = getLocation().transform(1, 0);
        if (!GameUtils.canMoveToNewLocation(newLocation, boundary)) {
            System.out.println("Cannot move right");
            return;
        }
        moveTo(newLocation);
    }

    @Override
    public String name() {
        return "H";
    }

    @Override
    public boolean alive() {
        return true;
    }

    @Override
    public void shoot(Damaged character) {
        if (outOfBullet()) {
            System.out.println("Out of bullet");
            return;
        }

        bulletCount -= 1;
        System.out.println("Bullets: " + bulletCount);

        if (character == null) {
            System.out.println("Miss!");
            return;
        }
        character.attackedBy(this);
    }

}
```

Và cuối cùng là ráp nối các thành phần lại với nhau.

Tham khảo chi tiết code mình đã push lên GitHub [tại đây](https://github.com/datbv/tutorials/tree/main/oop) nhé.

Với cách code trên, chúng ta hoàn toàn có khả năng mở rộng bài toán với các yêu cầu ở phần 2.2. Cách code của mình có thể chưa thật sự hoàn hảo, nếu có cao kiến gì hãy góp ý ở phần comment nhé. Thanks.

### Reference
Reference in series https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee](https://drive.google.com/file/d/10PVj-kjVqCrKd_PevOliWwl5fiwtZi9H/view?usp=sharing)