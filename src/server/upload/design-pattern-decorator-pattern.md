# 1. Đặt vấn đề
Giả sử chúng ta có một cửa hàng đồ uống. Khách đến cửa hàng sẽ chọn các loại đồ uống khác nhau bằng cách chọn các thành phần của đồ uống. Ví dụ như trà sữa chân trâu dưa hấu, bạc xỉu đậu xanh,... Vì là một lập trình viên, chúng ta muốn tự viết ra phần mềm tính toán giá cả đồ uống của chính cửa hàng của mình.  Ban đầu, rất có thể thiết kế các class như sau:\
![alt](http://imageshack.com/a/img924/9146/7YiVtz.png)\
Ngoài các đồ uống có sẵn, khách hàng còn có thể  gọi thêm các thành phần đồ uống khác, ví dụ như: sữa, đậu nành, socola, matcha,... Mỗi loại đồ uống được "mix" như thế sẽ có giá khác nhau. Như vậy, với cách thiết kế class như ở trên, thì lúc này tổ hợp class đồ uống sẽ như sau:\
![alt](http://imageshack.com/a/img922/2264/kofFHu.png)\
Như các bạn có thấy, hệ thống class trên thật ... quá nhiều class => ác mộng cho việc bảo trì sau này (chúng ta viết xong chắc sau chả dám quay lại đọc hay bảo trì đống code do mình viết ra đâu).
Một điều hiển nhiên nữa là điều gì sẽ xảy ra nếu giờ giá của sữa tăng hoặc giảm. Hay giờ có thêm một loại gia vị khác: caramel topping chẳng hạn => tổ hợp với một đống class cũ...=>  the hell is comming.
Điều sai lầm của thiết kế ban đầu đó là: tại sao chúng ta cần tất cả các những class đó. Chúng ta có thể dùng instance variables và inheritance trong superclass để giữ thông tin của những thành phần đồ uống.
Áp dụng suy luận trên, class Beverage có thể như sau:\
![alt](http://imageshack.com/a/img924/8263/d78hMd.png)
![alt](http://imageshack.com/a/img923/5268/fqKAQr.png)\
Nhìn có vẻ khá hợp lý nhỉ, giờ chúng ta chỉ còn lại có 5 class thôi.
...
Tuy nhiên, vẫn có một vài vấn đề với cách thiết kế như này bằng cách nghĩ về vấn đề: thiết kế này có thể bị thay đổi trong tương lai.
Ví dụ:
+ Giá thay đổi cho mỗi thành phần đồ uống sẽ "ép" chúng ta phải thay đổi code => vi phạm nguyên tắc SOLID.
+ Cửa hàng nhập về thành phần mới: matcha => chúng ta sẽ phải thêm phương thức mới: getMatcha() và setMatcha() vào class Beverage.
+ Chúng ta có thể có đồ uống mới, ví dụ như món: trà đá hoàng gia, các thành phần có lẽ không thích hợp cho lắm, nhỉ.
+ Và nếu khách hàng muốn một đồ uống 2 socola thì sao????
+ ...
# 2. Một vài vấn đề với kế thừa (inheritance)
+ Mặc dù kế thừa rất mạnh, tuy nhiên không phải lúc nào cũng giúp chúng ta có một thiết kế mềm dẻo và dễ bảo trì.
+ Có một vài cách để "inheriting" hành vi tại runtime thông qua composition và delegation.
+ Khi chúng ta kế thừa hành vi bằng cách subclassing, hành vi đó sẽ được đặt cố định tại compile time. Ngoài ra, tất cả subclass phải kế thừa cùng hành vi. Tuy nhiên, chúng ta có thể mở rộng hành vi của đối tượng thông qua composition và làm điều đó một cách linh động tại runtime.
+ Composition giúp chúng ta có thể thêm hành vi mới đến đối tượng, bao gồm cả hành vi mà thậm chí superclass không có. Và đặc biệt là, chúng ta không đụng chạm gì vào code cũ cả.
+ Bằng cách linh động composing đối tượng, chúng ta có thể thêm chức năng mới bằng cách viết code mới hơn là thay đổi code đã tồn tại. Bởi vì chúng ta không thay đổi code đã tồn tại, nguy cơ của việc dẫn tới bug hoặc lỗi ngoài ý muốn trong code đã tồn tại được giảm thiểu.
# 3. Decorator Pattern
Chúng ta đã thấy thiết kế hệ thống class đồ uống của chúng ta sử dụng kế thừa là không tốt: bùng nổ class, thiết kế cứng, chúng thêm thêm chức năng cho base class mà có thể nó không thích hợp cho một vài subclass.
Chúng ta sẽ làm lại như sau: bắt đầu với một beverage và "decorate" nó với các thành phần vào runtime. Ví dụ, nếu khách hàng muốn một Dark Roast với Mocha và Whip, chúng ta sẽ làm như sau:\
1, Tạo đối tượng DarkRoast.\
![alt](http://imageshack.com/a/img923/231/N2Wv48.png)\
2, Decorate nó với một đối tượng Mocha.\
![alt](http://imageshack.com/a/img923/7158/xSaoKq.png)\
3, Decorate nó với một đối tượng Whip.
![alt](http://imageshack.com/a/img923/1240/rqxEeT.png)\
4, Gọi phương thức cost().\
![alt](http://imageshack.com/a/img922/4761/VQpPuM.png)\
Dưới đây là định nghĩ về Decorator Pattern
>```
> The Decorator Pattern attaches additional responsibilities to an object dynamically.
> Decorators provide a flexible alternative to subclassing for extending functionality.

**Biểu đồ UML của mẫu thiết kế này.**
![alt](http://imageshack.com/a/img923/6621/BJIsCA.png)\
**Áp dụng vào thiết kế lớp của ứng dụng tính giá tiền đồ uống.**
![alt](http://imageshack.com/a/img924/6380/Tmsyyd.png)
# 4. Thực hành
1. Bắt đầu với Beverage class - super class của các loại đồ uống.
```
public abstract class Beverage {
    String description = "Unknown Beverage";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}
```
2. Implement abstract class cho Condiment (Decorator) - superclass cho các thành phần thêm vào đồ uống.
```
public abstract class CondimentDecorator extends Beverage {
    public abstract String getDescription();
}
```
3. Bây giờ, chúng ta đã có các class cơ sở. Chúng ta sẽ bắt đầu với một loại cà phê, tên là Espresso.
```
// Đầu tiên, chúng ta kế thừa Beverage class, vì Espresso là một loại đồ uống.
public class Espresso extends Beverage {
    public Espresso() {
        description = "Espresso";
    }
    // Tính giá của một cốc Espresso. Chúng ta không cần lo lắng đến việc thêm
    // các thành phần đồ uống khác vào class này, chỉ đơn giản là trả về giá của
    // một cốc Espresso.
    public double cost() {
        return 1.99;
    }
}
```

Một loại đồ uống khác. Chúng ta chỉ cần đặt lại mô tả và trả về giá của đúng loại đồ uống đó.
```
public class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "House Blend Coffee";
    }
    public double cost() {
        return 0.89;
    }
}

public class DarkRoast extends Beverage {
    public DarkRoast() {
        description = "Dark Roast Coffee";
    }
    public double cost() {
        return 0.94;
    }
}
```
4. Coding cho các thành phần đồ uống.
```
// Mocha là một decorator, vì thế chúng ta kế thừa từ CondimentDecorator class
public class Mocha extends CondimentDecorator {
    // Một biến instance để giữ lại loại beverage mà chúng ta sẽ "gói" lại
    Beverage beverage;
    
    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }
    
    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }
    
    public double cost() {
    // Chúng ta cần tính giá của đồ uống dùng thêm Mocha. Trước hết, chúng ta
    // gọi đến phương thức tính giá của loại đồ uống mà chúng ta "gói" vào, sau đó
    // cộng thêm giá của Mocha
        return 0.20 + beverage.cost();
    }
}

public class Soy extends CondimentDecorator {
    Beverage beverage;
    
    public Soy(Beverage beverage) {
        this.beverage = beverage;
    }
    
    public String getDescription() {
        return beverage.getDescription() + ",  Soy";
    }
    
    public double cost() {
        return 0.1 + beverage.cost();
    }
}

public class Whip extends CondimentDecorator {
    Beverage beverage;
    
    public Whip(Beverage beverage) {
        this.beverage = beverage;
    }
    
    public String getDescription() {
        return beverage.getDescription() + ",  Whip";
    }
    
    public double cost() {
        return 0.05 + beverage.cost();
    }
}
```
5. Thử tính giá của một vài loại đồ uống.
```
public class CoffeeFunny {
    public static void main(String args[]) {
        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription() + " $" + beverage.cost());
        // Tạo ra một đối tượng DarkRoast
        Beverage beverage2 = new DarkRoast();
        // "Gói" đối tượng trên với một đối tượng Mocha
        beverage2 = new Mocha(beverage2);
        // "Gói" tiếp đối tượng trên với một đối tượng Mocha nữa
        beverage2 = new Mocha(beverage2);
        // Cuối cùng gói bằng một đối tượng Whip
        beverage2 = new Whip(beverage2);
        System.out.println(beverage2.getDescription() + " $" + beverage2.cost());

        // Tương tự trên, đồ uống HouseBlend với Soy, Mocha, Whip.
        Beverage beverage3 = new HouseBlend();
        beverage3 = new Mocha(beverage3);
        beverage3 = new Mocha(beverage3);
        beverage3 = new Whip(beverage3);
        System.out.println(beverage3.getDescription() + " $" + beverage3.cost());
    }
}
```

Kết quả khi chạy đoạn code trên sẽ như sau:\
![alt](http://imageshack.com/a/img922/5773/7o73qo.png)

# 5. Tổng kết
Trên đây chúng ta đã cùng đi tìm hiểu về Decorator Pattern và một trường hợp áp dụng pattern này vào giải quyết vấn đề.\
Ngoài ra các bạn cũng nên tìm hiểu thêm một nguyên lý lập trình hướng đối tượng: **Prefer composition over inheritance**.\
Tài liệu tham khảo: [***Head First Design Pattern***](https://github.com/NLAQ/ebook/blob/master/HeadFirstDesignPatterns.pdf)\
Các bạn có câu hỏi, thắc mắc, hoặc muốn thảo luận về vấn đề nào thì có thể comment ở dưới.
Cảm ơn các bạn đã đọc bài