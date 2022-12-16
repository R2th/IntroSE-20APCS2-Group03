Overloading và Overriding hẳn đã là những thuật ngữ quen thuộc đối với những ai theo đuổi trường phái OOP (Object-Oriented Programing) và mình biết đa phần các bạn đã từng được nghe qua khi dấn thân vào ngành IT (qua trường lớp, trung tâm đào tạo) vì những lợi ích thú vị mà nó mang lại khi lập trình, cả 2 đều nói về tính chất Đa hình (Polymorphism) nhưng liệu bạn có nhớ được ngay khái niệm và công dụng của nó khi đọc đến tên không? Với bản thân mình là không vì những khái niệm trên tài liệu, internet thường quá khô khan và đầy trừu tượng hoặc là với những ví dụ siêu kinh điển như "phương thức tính tổng" hay "tiếng kêu con vật" dù nghe qua thì dễ hiểu nhưng không đọng lại được gì 🤣 
Nếu bạn đang bị như mình thì trong bài viết này mình sẽ dùng những ví dụ mới mẻ hơn, những khái niệm ít khô khan hơn để chúng ta hiểu lâu hơn nhé. Nào let's code it!

## Trước khi bắt đầu
Đây là phần mình sẽ giải thích, cung cấp thông tin cơ bản để bạn đọc đi đến những phần tiếp theo "mượt" hơn, bắt đầu bằng việc giới thiệu **vật phẩm trong game** mà mình nhắc đến ở tiêu đề chính là vũ khí "súng" - loại vũ khí thường thấy trong các trò chơi hiện nay cho việc ghi nhớ dễ dàng hơn. Tiếp theo **ngôn ngữ** mình sử dụng trong bài viết này là Java - một ngôn ngữ lập trình không thuần OOP nhưng rất xứng đáng để code dễ hiểu 👏

Code base ban đầu sẽ là một class như sau:
```java
package com.phatng;

public class Main {

    public static void main(String[] args) {
        Gun basicGun = new Gun();
        basicGun.shoot()
    }
}

class Gun {
    String shoot() {
        System.out.println("chưa có đạn");
    };
}

```
**Note**: *Mình không chia module (tách file cho từng class) mà viết chung vào 1 file là để các bạn tiện theo dõi trong bài viết hơn.*

Giải thích code: chúng ta có class Main (ai cũng biết để làm gì rồi phải không nào) và class Gun, điều bình thường ở đây là trong class Gun có hàm shoot dùng để thực hiện hành động bắn. Kết quả khi chạy hàm main là gì nhỉ 😁 (câu hỏi đơn giản thôi nên bạn thử trả lời mà không cần quăng code vào IDE chạy nha).

## Áp dụng Overloading
Đầu tiên mình sẽ đưa ra khái niệm cơ bản về Overloading - Nạp chồng hay được biết đến là Compiletime polymorphism:
> Overloading là cơ chế giúp chúng ta nạp chồng lên phương thức bằng cách tạo ra 1 phương thức khác đối số (khác kiểu và số lượng đối số) với phương thức đã có.

**Note**: *đối số (paramater) hay là dữ liệu truyền vào trong 1 phương thức.*

"Phương thức khác đối số" sẽ thỏa mãn điều kiện sau:
- Cùng tên với phương thức đã cho.
- Khác số lượng đối số hoặc cùng số lượng nhưng khác kiểu đối số.

Ting...Bạn vừa nhận được 1 yêu cầu cho game: hãy giúp cho cây súng bắn ra "đạn bạc".  Áp dụng overloading, mình sẽ thực hiện yêu cầu như sau
```java
package com.phatng;

public class Main {

    public static void main(String[] args) {
        Gun basicGun = new Gun();
        //basicGun.shoot()
        basicGun.shoot(new SilverBullet());
    }
}

class Gun {
    String shoot() {
        System.out.println("chưa có đạn");
    };

    String shoot(Bullet bullet) {
        System.out.println(bullet.explode());
    }
}

abstract class Bullet {
    abstract void explode();
}

class SilverBullet extends Bullet {
    @Override
    String explode() {
        return "đạn bạc";
    }
}

```
Mình đã tạo ra abstract class Bullet và 1 implement của nó để code được thuận tiện hơn (cũng là các tính chất của OOP), tập trung và bạn có thấy mình đã áp dụn overloading ở đâu không? Đúng rồi chính là phương thức shoot có 1 đối số truyền vào kiểu Bullet, mình đã nạp chồng phương thức shoot ban đầu để tạo ra 1 phương thức cùng tên nhưng khác số lượng đối số rồi đấy 🥳

Giờ thì chúng ta lại nhận thêm yêu cầu mới: tôi không chỉ muốn đạn bạc, hãy cho nó bắn 2 viên 1 bạc 1 vàng đi. Bạn làm giúp mình được chứ, cùng làm và xem qua cách của mình nào
```java
public class Main {

    public static void main(String[] args) {
        Gun basicGun = new Gun();
        //basicGun.shoot();
        //basicGun.shoot(new SilverBullet());
        basicGun.shoot(new SilverBullet(), new GoldBullet());
    }
}

class Gun {
    void shoot() {
        System.out.println("chưa có đạn");
    };

    void shoot(Bullet bullet) {
        System.out.println(bullet.explode());
    }

    void shoot(Bullet bullet1, Bullet bullet2) {
        System.out.println(bullet1.explode());
        System.out.println(bullet2.explode());

    }
}
...
class GoldBullet extends Bullet {
    @Override
    String explode() {
        return "đạn vàng";
    }
}
```
Rất dễ dàng đúng không, giờ đây dù yêu cầu bao nhiêu viên đạn, bao nhiêu kiểu đạn khác nhau chúng ta cũng đều đáp ứng được và thử nghĩ xem nếu không có overloading, cứ mỗi 1 yêu cầu chúng ta lại phải tạo ra 1 method với tên riêng thì ngồi đặt tên mệt nghỉ luôn nhỉ 😪
Anyway chúc mừng bạn đã hoàn thành yêu cầu game đầu tiên về overloading... 

À chưa, có yêu cầu kì lạ nè: tôi muốn súng có thể bắn ra 2 đạn nhưng vì nó quá độc lạ nên phải giấu bí mật về cách bắn này, tôi đã có ý tưởng là thay vì cho nổ (in ra output hàm explode) chúng ta sẽ chỉ kích hoạt trong âm thầm và trả về mật mã 4 số, khi tôi nhận được mật mã này tôi sẽ biết được tôi đang bắn đạn gì.

Chà khó đây, hãy thử cùng tạo ra bí mật cho cách bắn mới này nào

```java
public class Main {

    public static void main(String[] args) {
        Gun basicGun = new Gun();
        //basicGun.shoot();
        //basicGun.shoot(new SilverBullet());
        //readGunCode chỉ là 1 hàm giả tưởng sẽ thực hiện việc đọc mã và cho người dùng biết thông tin như yêu cầu
        readGunCode(basicGun.shoot(new SilverBullet(), new GoldBullet()));
    }
}

class Gun {
    void shoot() {
        System.out.println("chưa có đạn");
    };

    void shoot(Bullet bullet) {
        System.out.println(bullet.explode());
    }

    void shoot(Bullet bullet1, Bullet bullet2) {
        System.out.println(bullet1.explode());
        System.out.println(bullet2.explode());
    }
    
    String shoot(Bullet bullet1, Bullet bullet2) {
        bullet1.explode();
        bullet2.explode();
        return "1111";
    }
}
```

Xời, chỉ cần Overloading là ra hết... Ơ nhưng mã sao code không chạy nhỉ?  Để check lại điều kiện của Overloading xem nào, cùng tên - check, khác đối số - fail... ơ nhưng mà khác kiểu trả về (return type) cũng không thể bù lại việc giống đối số sao, thật là một việc làm ngu ngốc chỉ vì mình không muốn sửa lại phương thức đã có mà áp dụng overloading vô tội vạ 😭 (lỗi sẽ xuất hiện trước khi chúng ta chạy chương trình vì vậy nó được gọi là Compiletime polymorphism -> có thể xác định được ở giai đoạn compile)

==> Qua yêu cầu này chúng ta nhận ra, kiểu trả về trong overloading trong trường hợp này là không thể, nhưng không có nghĩa là chúng ta không thể tạo ra phương thức nạp chồng khác kiểu trả về được nhé, cùng xem qua phương thức nạp chồng dưới đây
```java
String shoot(Bullet bullet1, Bullet bullet2, Bullet bullet3) {
        bullet1.explode();
        bullet2.explode();
        bullet3.explode();
        return "1111";
    }
```
Đã thỏa mãn 2 điều kiện của Overloading và chúng ta còn có thể thay đổi kiểu trả về của phương thức, quả là kiến thức thú vị.
## Overriding
Vẫn như trên, chúng ta cùng xem qua khái niệm Overriding - Ghi đè  hay được biết đến là Runtime polymorphism:
> Overriding là cơ chế giúp chúng ta ghi đè lại phương thức bằng cách tạo ra phương thức mới giống hệt với phương thức đã có NGỌAI TRỪ nội dung thực thi bên trong. Nội dung thực thi bên trong phương thức ghi đè thể hiện đặc tính riêng của nó.

Vậy thì phương thức ghi đè sẽ thỏa mãn điều kiện sau:
- Cùng method signature
- Khác nội dung thực thi

**Note**: *method signature thể hiện qua 2 đặc điểm: giống tên và giống đối số*

Yêu cầu lại đến rồi đây: súng của chúng ta đã có được cách bắn tuyệt vời, nhưng tôi muốn tận dụng tối đa súng bằng cách tạo ra 2 loại đạn riêng cho loại súng này, nó sẽ có tên là RedGoldBullet được làm dựa trên GoldBullet nhưng sức mạnh x1000 và BlueGoldBullet cũng được làm dựa trên GoldBullet nhưng có thể hóa lỏng thứ nó chạm vào!!!

Wuah, thật là một loại đạn tuyệt vời, để xem nào cốt lõi là làm từ GoldBullet... OK làm thử mẫu đạn đầu tiên nào
```java
public class Main {

    public static void main(String[] args) {
        Gun basicGun = new Gun();
        //basicGun.shoot();
        //basicGun.shoot(new SilverBullet());
        //readGunCode chỉ là 1 hàm giả tưởng sẽ thực hiện việc đọc mã và cho người dùng biết thông tin như yêu cầu
        //readGunCode(basicGun.shoot(new SilverBullet(), new GoldBullet()));
        basicGun.shoot(new RedGoldBullet());
         basicGun.shoot(new BlueGoldBullet());
    }
}
...
class RedGoldBullet extends GoldBullet {
    @Override
    String explode() {
        return super.explode() + " đỏ";
    }
}
class BlueGoldBullet extends GoldBullet {
    @Override
    String explode() {
        return super.explode() + " xanh";
    }
}
```
Nhờ vào yêu cầu mà chúng ta thấy, cũng dùng cùng 1 phương thức explode với tên, đối số (trường hợp này là không có đối số) giống nhau nhưng khi được gọi lại cho những kết quả khác nhau (dựa trên đặc tính của bản thân nó) và đây cũng chính là cách mà overriding được áp dụng vào trong code.

À còn về kiểu trả về thì sao nhỉ, nó có bất kì sự thú vị nào giống với điều chúng ta vừa biết ở Overloading không 🤔? Đương nhiên nếu bạn thử override lại phương thức nhưng với kiểu dữ liệu khác phương thức ban đầu thì sẽ bị báo lỗi nữa cho xem, nhưng mà...chúc mừng bạn đã tìm thêm được 1 sự thú vị: kể từ Java 5, chúng ta có khái niệm **Covariant Return Type**, nhờ cái này chúng ta có thể override phương thức **mà khác kiểu trả về** nhưng kiểu trả về mới này phải là subtype của kiểu trả về phương thức ban đầu. Lấy ví dụ override phương thức getCurrentGunBullet của class Gun như sau
```java
class Gun {
    ...
    Bullet getCurrentGunBullet(RedGoldBullet redGoldBullet) {
        return redGoldBullet;
    }
}
class SuperGun extends Gun {
    @Override
    RedGoldBullet getCurrentGunBullet(RedGoldBullet bullet) {
        return bullet;
    }
}
```
Các bạn thấy chứ, kiểu trả về của phương thức ghi đè trong class SuperGun là RedGoldBullet khác với kiểu ban đầu là Bullet nhưng thật ra RedGoldBullet là con của Bullet nên viết như này vẫn được chấp nhận (phần code nhìn có vẻ vô nghĩa vì mình chỉ đang lấy ví dụ cho Covariant Return Type)

## Tóm lại
Sau khi đã đi vào tìm hiểu từng cái, mình đã rút ra được một số câu rút gọn khi nói về cả 2 như sau:
- Overloading là dạng Compiletime polymorphism còn Overriding là Runtime polymorphism
- Overloading cần khác đối số còn Overriding khi muốn khác cách thực thi bên trong phương thức
- Overloading thực hiện trong cùng 1 class còn Overriding thực hiện thông qua class kế thừa
- Nếu chúng ta sai Overloading sẽ dễ nhận thấy vì chúng được quyết định vào thời điểm compile - các IDE sẽ báo lỗi nhưng nếu chúng ta sai Overriding vì quyết định vào thời điểm runtime - khi chương trình chạy nên sẽ gây ra nhiều vấn đề không dễ giải quyết

Okey bài viết về Overloading và Overriding đến đây là hết, nếu có đóng góp các bạn hãy bình luận phía dưới để mình cải thiện hơn nhé. Happy coding!