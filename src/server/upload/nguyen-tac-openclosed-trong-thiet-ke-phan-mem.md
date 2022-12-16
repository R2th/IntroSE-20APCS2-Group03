**Open/Closed Principle** hay còn gọi là nguyên tắc **Open/Closed** là một trong năm design principles cho phát triển phần mềm hướng đối tượng, được miêu tả bở **Robert C.Martin**. Chúng được biết phổ biến nhất với tên **SOLID principles**:

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion

Mặc dù, nó là nguyên tắc thứ hai trong danh sách các nguyên tắc được đề ra nhưng với ý kiến cá nhân của tôi nó là quan trọng mà bất kỳ lập trình viên cần phải biết, do vậy tôi sẽ đi tìm hiểu trước tiên. 

Tất cả 5 nguyên tắc thiết kế này đều được sử dụng một cách rộng rãi và hầu hết các lập trình viên từng phát triển phần mềm sẽ quen thuộc với chúng. Nhưng đừng lo lắng, nếu bạn chưa từng nghe về chúng. Tôi đã làm lập trình viên trong một vài năm trước khi tôi học về **SOLID principles** và nhanh chóng nhận ra rằng chúng đã miêu tả các quy tắc và nguyên tắc mà các đồng nghiệp của tôi đã dạy tôi về cách viết code tốt. Như vậy, nếu bạn thậm chí không biết về tên của chúng thì có thể bạn cũng đã từng sử dụng chúng.

Nhưng điều đó không có nghĩa là chúng ta không nên nói và học về **SOLID principles**. Trong bài viết này, tôi sẽ tập trung về **Open/Closed Principle** và tôi sẽ giải thích các nguyên tắc khác trong các bài viết tiếp theo.

# Định nghĩa về Open/Closed Principle

**Rebert C.Martin** đã xem xét nguyên tắc này như  "**Nguyên tắc quan trọng nhất của thiết kế hướng đối tượng**". Nhưng ông ấy không phải là người định nghĩa đầu tiên. **Bertrand Mayer** đã viết năm 1998 trong cuốn sách **Object-Oriented Software Construction**. Ông ấy giải thích **Open/Closed Principle** như sau:

> “Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.”

Dịch một cách nôm na là: Các thực thể phần mềm (classes, modules, function,...) nên mở với việc thêm mới nhưng đóng với việc sửa đổi.

Ý tưởng chung của nguyên tắc này là tuyệt vời. Nó nói cho bạn viết code làm sao để có thể thêm function mới mà không cần phải thay đổi code hiện tại. Điều đó ngăn chặn tình huống mà một thay đổi của class cũng yêu cầu bạn thay đổi tất cả các class phụ thuộc. Thật không may, **Bertrand Mayer** đề suất sử dụng kế thừa để đạt được mục đích này:

> “A class is closed, since it may be compiled, stored in a library, baselined, and used by client classes. But it is also open, since any new class may use it as parent, adding new features. When a descendant class is defined, there is no need to change the original or to disturb its clients.”

Có nghĩa là một class là đóng vì nó có thể được biên dịch, lưu trữ trong một library, baselined và được sử dụng bởi client classes. Nhưng mở vì bất kỳ class nào cũng có thể sử dụng nó như parent class. thêm tính năng mới. Khi một lớp con được định nghĩa không cần thay đổi code ban đầu hoặc ảnh hưởng đến client class của nó.

Nhưng như chúng ta đã học qua các năm và như các tác giả khác đã giải thích một cách rất chi tiết, ví dụ như **Robert C.Matin** trong bài viết của ông ấy về SOLID principles hoặc **Joshua Bloch** trong cuốn sách **Effective Java**, việc kế thừa sẽ kết hợp chặt chẽ nếu class con phụ thuộc vào chi tiết implement của class cha.

Đó là tại sao **Robert C.Martin** và một số người khác đã định nghĩa lại nguyên tắc **Open/Closed** thành **Polymorphic Open/Closed Principle** (Nguyên tắc **Open/Closed** đa hình). Nó sử interface thay vì class con để cho phép triển khai cái mà bạn có thể dễ dàng thay thế mà không cần thay đổi code sử dụng chúng. Interface là đóng cho việc sửa đổi và bạn có thể cung cấp triển khai mới để mở rộng chức năng của phần mềm.

Lợi ích chính của cách tiếp cận này là một interface sẽ giới thiệu thêm cấp độ ảo hóa (abstraction) nhằm cho phép việc kết nối mềm dẻo. Việc triển khai một interface là độc lập với những cái còn lại và không cần chia sẻ bất kỳ code nào. Nếu bạn cho rằng việc nhiều implement của một interface chia sẻ một số code có lợi, bạn có thể sử dụng inheritance hoặc composition.


Bây giờ chúng ta hãy xem xét một ví dụ về **Open/Closed Principle**

# Ứng dụng pha cà phê với Open/Closed Principle

Bạn có thể mua rất nhiều loại máy pha cà phê khác nhau. Có loại tương đối cơ bản chỉ pha cà phê phin và loại khác có bao gồm máy xay để pha các loại cà phê khác nhau, ví dụ espresso và cà phê phin. Tất cả chúng đều phục vụ chung một mục đích là: Chúng pha cà phê ngon tuyệt để đánh thức mọi người mỗi sáng.

Vấn đề duy nhất là bạn cần ra khỏi giường để bật máy pha cà phê. Như vậy, tại sao không bỏ qua tất cả các thử thách của thế giới vật chất, ví dụ như là: Làm sao để đưa nước và cà phê xay vào máy hoặc làm thế nào đặt một cái cốc bên dưới nó mà không cần ra khỏi giường và thực hiện một chương trình đơn giản phục vụ bạn một ly cà phê ?

Để chỉ ra lợi ích của **Open/Closed Principle**, tôi đã viết một ứng dụng đơn giản điều khiển máy cà phê đơn giản để pha cho bạn cà phê phin tuyệt vời vào buổi sáng.

# ```BasicCoffeeMachine``` class

Việc triển khai của class ```BasicCoffeeMachine``` tương đối đơn giản. Nó chỉ có một constructor, một phương thức public để thêm cà phê xay và một phương thức pha cà phê phin.

```java
import java.util.HashMap;
import java.util.Map;

public class BasicCoffeeMachine {

    private Map<CoffeeSelection, Configuration> configMap;
    private Map<CoffeeSelection, GroundCoffee>; groundCoffee;
    private BrewingUnit brewingUnit;

    public BasicCoffeeMachine(Map<CoffeeSelection, GroundCoffee> coffee) {
    this.groundCoffee = coffee;
    this.brewingUnit = new BrewingUnit();

    this.configMap = new HashMap<>();
        this.configMap.put(CoffeeSelection.FILTER_COFFEE, new Configuration(30, 480));
    }

    public Coffee brewCoffee(CoffeeSelection selection) {
        Configuration config = configMap.get(CoffeeSelection.FILTER_COFFEE);

        // get the coffee
        GroundCoffee groundCoffee = this.groundCoffee.get(CoffeeSelection.FILTER_COFFEE);

        // brew a filter coffee
        return this.brewingUnit.brew(CoffeeSelection.FILTER_COFFEE, groundCoffee, config.getQuantityWater());
    }

    public void addGroundCoffee(CoffeeSelection sel, GroundCoffee newCoffee) throws CoffeeException {
        GroundCoffee existingCoffee = this.groundCoffee.get(sel);
        if (existingCoffee != null) {
            if (existingCoffee.getName().equals(newCoffee.getName())) {
                existingCoffee.setQuantity(existingCoffee.getQuantity() + newCoffee.getQuantity());
            } else {
                throw new CoffeeException("Only one kind of coffee supported for each CoffeeSelection.");
            }
        } else {
            this.groundCoffee.put(sel, newCoffee);
        }
    }
}
```

Bạn có thể dễ dàng điều khiển một máy cà phê đơn giản thông qua ứng dụng, đúng không nào ? Hãy làm điều đó.

# ```BasicCoffeeApp``` class

Phương thức ```main``` của ```BasicCoffeeApp``` chuẩn bị một ```Map``` với cà phê xay, khởi tạo một đối tượng ```BasicCoffeeMachine``` và gọi phương thức ```prepareCoffee``` để pha cà phê.

```java
public class BasicCoffeeApp {

    private BasicCoffeeMachine coffeeMachine;

    public BasicCoffeeApp(BasicCoffeeMachine coffeeMachine) {
        this.coffeeMachine = coffeeMachine;
    }

    public Coffee prepareCoffee(CoffeeSelection selection) throws CoffeeException {
        Coffee coffee = this.coffeeMachine.brewCoffee(selection);
        System.out.println("Coffee is ready!");
        return coffee;
    }

    public static void main(String[] args) {
        // create a Map of available coffee beans
        Map<CoffeeSelection, GroundCoffee> beans = new HashMap<CoffeeSelection, GroundCoffee>();
        beans.put(CoffeeSelection.FILTER_COFFEE, new GroundCoffee(
            "My favorite filter coffee bean", 1000));

        // get a new CoffeeMachine object
        BasicCoffeeMachine machine = new BasicCoffeeMachine(beans);

        // Instantiate CoffeeApp
        BasicCoffeeApp app = new BasicCoffeeApp(machine);

        // brew a fresh coffee
        try {
            app.prepareCoffee(CoffeeSelection.FILTER_COFFEE);
        } catch (CoffeeException e) {
            e.printStackTrace();
        }
    } // end main
} // end CoffeeApp
```

Đó là nó. Kể từ bây giờ, bạn có thể ở tại giường cho đến khi ngửi thấy mùi cà phê được chuẩn bị bởi ```BasicCoffeeApp```.

# Áp dụng Open/Closed principle

Nhưng điều gì xảy ra khi bạn thay ```BasicCoffeeApp``` ? Bạn có thể nhận một cái tốt hơn với máy xay tích hợp để có thể pha thêm những thứ khác không chỉ là cà phê phin. Không may, **CoffeeApp** không hỗ trợ loại này.

Nó sẽ tuyệt vời nếu ứng dụng của bạn có thể điều khiển cả hai kiểu này. Nhưng điều đó sẽ yêu cầu một vài code thay đổi. Và như bạn đã sử dụng nó rồi, tại sao bạn không thay đổi nhằm đáp ứng những máy cà phê trong tương lai.

# Mở rộng ```CoffeeMachine``` interface

Theo **Open/Closed Principle**, bạn cần thêm một interface để cho phép điều khiển máy cà phê. Đó thường là phần quan trọng trong việc tái cấu trúc. Bạn cần để đưa vào phương thức mà bắt buộc cho việc điều khiển máy cà phê, nhưng không đưa vào phương thức tùy chọn nào mà có thể làm giới hạn khả năng mềm dẻo của việc triển khai.

Trong ví dụ này, chỉ có duy nhất phương thức ```brewCoffee```. Như vậy, interface ```CoffeeMachine``` chỉ có một phương thức, nó cần được triển khai bởi tất cả các class implement.

```java
public interface CoffeeMachine {
    Coffee brewCoffee(CoffeeSelection selection) throws CoffeeException;
}
```

# Điều chỉnh class BasicCoffeeMachine 

Trong bước tiếp theo, bạn cần điều chỉnh class ```BasicCoffeeMachine```. Nó đã triển khai phương thức ```brewCoffee``` và cung cấp tất cả chức năng cần thiết. Như vậy, bạn chỉ cần khai báo rằng ```BasicCoffeeMachine``` triển khai interface ```CoffeeeMachine```.

```java
public class BasicCoffeeMachine implements CoffeeMachine { ... }
```

# Thêm các implementations

Bây giờ bạn có thể thêm triển khai mới của interface ```CoffeeMachine```.

Triển khai của class ```PremiumCoffeeMachine``` là phức tạp hơn class ```BasicCoffeeMachine```. Phương thức ```brewCoffee``` được định nghĩa bởi interface ```CoffeeMachine``` hỗ trợ 2 ```CoffeeSelection``` khác nhau. Dựa trên ```CoffeeSelection``` được cung cấp, phương thức sẽ gọi cách pha cà phê tương ứng. Như bạn có thể thấy trong việc triển khai của những phương thức này, class cũng sử dụng composition để tham chiếu đến một **Grinder** cái mà xay cà phê hạt trước khi pha cà phê.

```java
import java.util.HashMap;
import java.util.Map;

public class PremiumCoffeeMachine implements CoffeeMachine {

    private Map<CoffeeSelection, Configuration> configMap;
    private Map<CoffeeSelection, CoffeeBean> beans;
    private Grinder grinder;
    private BrewingUnit brewingUnit;

    public PremiumCoffeeMachine(Map<CoffeeSelection, CoffeeBean> beans) {
        this.beans = beans;
        this.grinder = new Grinder();
        this.brewingUnit = new BrewingUnit();

        this.configMap = new HashMap<>();
        this.configMap.put(CoffeeSelection.FILTER_COFFEE, new Configuration(30, 480));
        this.configMap.put(CoffeeSelection.ESPRESSO, new Configuration(8, 28));
    }

    @Override
    public Coffee brewCoffee(CoffeeSelection selection) throws CoffeeException {
        switch(selection) {
        case ESPRESSO:
            return brewEspresso();
        case FILTER_COFFEE:
            return brewFilterCoffee();
        default:
            throw new CoffeeException("CoffeeSelection [" + selection + "] not supported!");
        }
    }

    private Coffee brewEspresso() {
        Configuration config = configMap.get(CoffeeSelection.ESPRESSO);

        // grind the coffee beans
        GroundCoffee groundCoffee = this.grinder.grind(
            this.beans.get(CoffeeSelection.ESPRESSO),
            config.getQuantityCoffee());

        // brew an espresso
        return this.brewingUnit.brew(CoffeeSelection.ESPRESSO, groundCoffee,
            config.getQuantityWater());
    }

    private Coffee brewFilterCoffee() {
        Configuration config = configMap.get(CoffeeSelection.FILTER_COFFEE);

        // grind the coffee beans
        GroundCoffee groundCoffee = this.grinder.grind(
            this.beans.get(CoffeeSelection.FILTER_COFFEE),
            config.getQuantityCoffee());

        // brew a filter coffee
        return this.brewingUnit.brew(CoffeeSelection.FILTER_COFFEE, groundCoffee,
            config.getQuantityWater());
    }

    public void addCoffeeBeans(CoffeeSelection sel, CoffeeBean newBeans) throws CoffeeException {
        CoffeeBean existingBeans = this.beans.get(sel);
        if (existingBeans != null) {
            if (existingBeans.getName().equals(newBeans.getName())) {
                existingBeans.setQuantity(existingBeans.getQuantity() + newBeans.getQuantity());
            } else {
                throw new CoffeeException("Only one kind of coffee supported for each CoffeeSelection.");
            }
        } else {
            this.beans.put(sel, newBeans);
        }
    }
}
```

Bạn đã hoàn thành với hầu hết công việc tái cấu trúc. Bạn đã áp dụng **Open/Closed Principle** với việc sử dụng interface ```CoffeeMachine``` và cung cấp 2 triển khai độc lập.

![](https://images.viblo.asia/9f20771f-8cf7-482a-8de5-e7c176365670.png)

Chỉ còn duy nhất một điều là hãy cho ứng dụng sử dụng các triển khai khác nhau của interface.
# Điều chỉnh CoffeeApp

Class ```CoffeeApp``` bao gồm 2 phần:

- Class ```CoffeeApp```
- Phương thức ```main```

Bạn cần khởi tạo một triển khai ```CoffeeMachine``` chỉ định trong phương thức ```main```. Như vậy, bạn sẽ luôn cần điều chỉnh phương thức này, nếu bạn thay máy cà phê hiện tại. Nhưng miễn là class ```CoffeeApp``` sử dụng interface ```CoffeeMachine``` thì bạn không cần phải sửa nó.

```java
import java.util.HashMap;
import java.util.Map;

public class CoffeeApp {

    private CoffeeMachine coffeeMachine;

    public CoffeeApp(CoffeeMachine coffeeMachine) {
        this.coffeeMachine = coffeeMachine;
    }

    public Coffee prepareCoffee(CoffeeSelection selection) throws CoffeeException {
        Coffee coffee = this.coffeeMachine.brewCoffee(selection);
        System.out.println("Coffee is ready!");
        return coffee;
    }

    public static void main(String[] args) {
        // create a Map of available coffee beans
        Map<CoffeeSelection, CoffeeBean>; beans = new HashMap<CoffeeSelection, CoffeeBean>();
        beans.put(CoffeeSelection.ESPRESSO, new CoffeeBean(
            "My favorite espresso bean", 1000));
        beans.put(CoffeeSelection.FILTER_COFFEE, new CoffeeBean(
            "My favorite filter coffee bean", 1000));

        // get a new CoffeeMachine object
        PremiumCoffeeMachine machine = new PremiumCoffeeMachine(beans);

        // Instantiate CoffeeApp
        CoffeeApp app = new CoffeeApp(machine);

            // brew a fresh coffee
        try {
            app.prepareCoffee(CoffeeSelection.ESPRESSO);
        } catch (CoffeeException e) {
            e.printStackTrace();
        }
    } // end main
} // end CoffeeApp
```

# Tổng kết

Bài viết này thảo luận về nguyên tắc **Open/Closed** trong phát triển phần mềm. Nó là một trong năm **SOLID design principles** được miêu tả bởi **Robert C.Martin**. Nó thúc đẩy việc sử dụng interface để cho phép bạn đáp ứng chức năng của ứng dụng mà không phải thay đổi code hiện tại.

Chúng ta sử dụng nguyên tắc này trong ví dụ ứng dụng điều khiển các loại khác nhau của máy pha cà phê thông qua **CoffeeApp**. Miễn là máy pha cà phê triển khai interface ```CoffeeMachine``` thì bạn có thể điều khiển nó qua ứng dụng. Điều duy nhất bạn cần làm khi thay đổi máy cà phê hiện tại là cung cấp một triển khai mới của interface và thay đổi trong phương thức ```main``` để khởi tạo loại chỉ định. Nếu bạn muốn tiến một bước xa hơn, bạn có thể sử dụng dependency injection, reflection hoặc service loader API để thay thế thể hiện của class chỉ định. Cảm ơn các bạn đã theo dõi bài viết, hy vọng mang đến cho các bạn những điều bổ ích.

**Bài viết được dịch từ nguồn:**

https://stackify.com/solid-design-open-closed-principle/