Trong bài biết trước tôi đã giới thiệu đến các bạn nguyên tắc thiết kế **Open/Closed**, một trong những nguyên tắc cơ bản và quan trọng nhất trong thiết kế phần mềm, ít nhất là theo quan điểm của bản thân. Các bạn có thể theo dõi lại [ở đây](https://viblo.asia/p/nguyen-tac-openclosed-trong-thiet-ke-phan-mem-1Je5E7ajZnL) . Trong bài viết này tôi sẽ tiếp tục về chủ đề nguyên tắc thiết kế đó là **Interface Segregation Principles**.

Nguyên tắc **Interface Segregation** là một trong những nguyên tắc thiết kế được định nghĩa bởi Rebert C.Martin. Chúng được ra đời từ nhiều năm trước nhưng vẫn rất quan trọng như lúc ban đầu tác giả xuất bản chúng lần đầu tiên. Bạn có lẽ sẽ cho rằng kiến trúc microservices đã nâng tầm quan trọng của chúng bởi vì bạn có thể áp dụng những nguyên tắc này vào microservices.

# Định nghĩa nguyên tắc Interface Segregation
Nguyên tắc **Interface Segregation** đã được định nghĩa bởi Rebert C.Martin trong khi tư vấn cho công ty Xerox để hỗ trợ họ xây dựng phần mềm cho hệ thống in ấn mới. Ông ấy định nghĩa như sau:

> “Clients should not be forced to depend upon interfaces that they do not use.”.

Nghe có vẻ rõ ràng phải không ? Tôi sẽ chỉ ra cho bạn trong bài viết này, chúng ta khá là dễ dàng vi phạm nguyên tắc này, đặc biệt nếu phần mềm của bạn ngày càng lớn lên, đồng thời bạn phải thêm nhiều, thật nhiều các tính năng mới.

Tương tự nguyên tắc S**ingle Responsibility**, mục đích của **Interface Segregation** là để giảm các mặt ảnh hưởng của các yêu cầu thay đổi bằng việc chia tách phần mềm thành nhiều phần độc lập nhau.

Tôi cũng sẽ trình bày với các bạn ví dụ bên dưới, nguyên tắc này chỉ đạt được nếu bạn định nghĩa các interfaces mà chúng đáp ứng một client hoặc task chỉ định.

# Sự vi phạm nguyên tắc Interface Segregation
Không một ai trong chúng ta sẵn lòng bỏ qua những nguyên tắc thiết kế phổ biến để viết một phần mềm tồi. Nhưng nó vẫn xảy ra khá thường xuyên. Là ứng dụng đã sử dụng nhiều năm và người dùng thường xuyên yêu cầu các tính năng mới.

Từ quan điểm kinh doanh, đó là một tình huống hết sức bình thường. Nhưng từ quan điểm của người làm kỹ thuật, việc triển khai bất kỳ thay đổi nào cũng mang đến những nguy hiểm tiềm ẩn cho hệ thống. Việc thêm một phương thức mới vào các interface có sẵn luôn dễ dàng cán dỗ lập trình viên mặc dù nó triển khai một nhiệm vụ khác biệt và trong khi nếu chúng ta tách ra một interface mới thì sẽ tốt hơn. Điều đó chính là sự khởi đầu cho một mớ hỗn độn của interface và sớm hay muộn thì cũng dẫn đến các interface chứa những phương thức mà class triển khai không dùng đến.

Hãy xem một ví dụ đơn giản bên dưới nơi mà điều này đã xảy ra.

Ban đầu, dự án đã sử dụng class ```BasicCoffeeMachine``` để mô hình hóa một máy pha cà phê đơn giản. Nó sử dụng cà phê xay để pha cà phê phin thơm ngon.

```java
class BasicCoffeeMachine implements CoffeeMachine {
    private Map<CoffeeSelection, Configuration> configMap;
    private GroundCoffee groundCoffee;
    private BrewingUnit brewingUnit;

    public BasicCoffeeMachine(GroundCoffee coffee) {
        this.groundCoffee = coffee;
        this.brewingUnit = new BrewingUnit();

        this.configMap = new HashMap<>();
        this.configMap.put(CoffeeSelection.FILTER_COFFEE, new Configuration(30, 480));
    }

    @Override
    public CoffeeDrink brewFilterCoffee() {
        Configuration config = configMap.get(CoffeeSelection.FILTER_COFFEE);

        // brew a filter coffee
        return this.brewingUnit.brew(CoffeeSelection.FILTER_COFFEE, this.groundCoffee, config.getQuantityWater());
    }

    @Override
    public void addGroundCoffee(GroundCoffee newCoffee) throws CoffeeException {
        if (this.groundCoffee != null) {
            if (this.groundCoffee.getName().equals(newCoffee.getName())) {
                this.groundCoffee.setQuantity(this.groundCoffee.getQuantity() + newCoffee.getQuantity());
            } else {
                throw new CoffeeException("Only one kind of coffee supported for each CoffeeSelection.");
            }
        } else {
            this.groundCoffee = newCoffee;
        }
    }
}
```

Tại thời điểm đó, nó khá là tốt để mở rộng interface ```CoffeeMachine``` với phương thức ```addGroundCoffe``` và ```brewFilterCoffee```. Hai phương thức cơ bản này của một máy pha cà phê nên được triển khai bởi tất cả các máy trong tương lai.

```java
public interface CoffeeMachine {
    CoffeeDrink brewFilterCoffee() throws CoffeeException;
    void addGroundCoffee(GroundCoffee newCoffee) throws CoffeeException;
}
```

# Vấn đề khi thêm phương thức mới
Nhưng sau đó một số người đã quyết định rằng ứng dụng cần hỗ trợ cả các máy espresso nữa. Đội phát triển đã mô hình hóa class mới là ```EspressoMachine```. Nó khá tương tự với class ```BasicCoffeeMachine```.

```java
public class EspressoMachine implements CoffeeMachine {
    private Map configMap;
    private GroundCoffee groundCoffee;
    private BrewingUnit brewingUnit;

    public EspressoMachine(GroundCoffee coffee) {
        this.groundCoffee = coffee;
        this.brewingUnit = new BrewingUnit();

        this.configMap = new HashMap();
        this.configMap.put(CoffeeSelection.ESPRESSO, new Configuration(8, 28));
    }

    @Override
    public CoffeeDrink brewEspresso() {
        Configuration config = configMap.get(CoffeeSelection.ESPRESSO);

        // brew a filter coffee
        return this.brewingUnit.brew(CoffeeSelection.ESPRESSO,
            this.groundCoffee, config.getQuantityWater());
    }

    @Override
    public void addGroundCoffee(GroundCoffee newCoffee) throws CoffeeException {
        if (this.groundCoffee != null) {
            if (this.groundCoffee.getName().equals(newCoffee.getName())) {
                this.groundCoffee.setQuantity(this.groundCoffee.getQuantity()
                    + newCoffee.getQuantity());
            } else {
                throw new CoffeeException(
                    "Only one kind of coffee supported for each CoffeeSelection.");
            }
        } else {
            this.groundCoffee = newCoffee;
        }
    }

    @Override
    public CoffeeDrink brewFilterCoffee() throws CoffeeException {
       throw new CoffeeException("This machine only brew espresso.");
    }
}
```

Lập trình viên đã quyết định rằng một máy espresso chỉ là một loại khác của máy pha cà phê. Và vì vậy nó phải triển khai interface ```CoffeeMachine```.

Ở đậy chỉ có sự khác biệt là phương thức ```brewEspresso``` và class ```EspressoMachine``` sẽ triển khai nó thay vì phương thức ```brewFilterCoffee```. Bây giờ, hãy bỏ qua nguyên tắc **Interface Segregation**  và thực hiện ba thay đổi bên dưới:

1. Class ```EspressoMachine``` triển khai interface ```CoffeeMachine``` và phương thức ```brewFilterCoffee``` của nó.

```java
public CoffeeDrink brewFilterCoffee() throws CoffeeException {
  throw new CoffeeException("This machine only brews espresso.");
}
```
2. Chúng ta thêm phương thức ```brewEspresso``` tới interfce ```CoffeeMachine``` như vậy interface sẽ cho phép bạn pha espresso.

```java
public interface CoffeeMachine {
  CoffeeDrink brewFilterCoffee() throws CoffeeException;
  void addGroundCoffee(GroundCoffee newCoffee) throws CoffeeException;
  CoffeeDrink brewEspresso() throws CoffeeException;
}
```
3.  Bạn cần triển khai phương thức ```brewEspresso``` trên class ```BasicCoffeeMachine``` bởi vì nó được định nghĩa trong interface ```CoffeeMachine```. Bạn cũng có thể cung cấp cách triển khai tương tự như một phương thức mặc định trên interface ```CoffeeMachine```

```java
@Override
public CoffeeDrink brewEspresso() throws CoffeeException {
    throw new CoffeeException("This machine only brews filter coffee.");
}
```

Sau khi bạn đã thực hiện các thay đổi, class diagram sẽ trông như thế này:

![](https://images.viblo.asia/f218bb2a-efb7-4420-8b8d-070c4a7583b2.png)


Chúng ta có thể thấy thay đổi thứ hai và ba ở interface ```CoffeeMachine```  không phải là một sự đáp ứng tốt cho hai loại máy cà phê này. Phương thức ```brewEspresso``` của class ```BasicCoffeeMachine``` và phương thức ```brewFilterCoffee``` của ```EspressoMachine``` ném ra một ```CoffeeException``` bởi vì những hoạt động này không được hỗ trợ. Bạn phải triển khai chúng chỉ bởi vì chúng được yêu cầu bởi interface ```CoffeeMachine```.

Nhưng việc triển khai hai phương thức này không phải là một vấn đề thực sự. Vấn đề đó là interface ```CoffeeMachine``` sẽ thay đổi nếu phương thức ```brewFilterCoffee``` của class ```BasicCoffeeMachine``` thay đổi. Điều đó cũng yêu cầu một thay đổi của class ```EspressoMachine``` và tất cả các class khác sử dụng ```EspressoMachine``` mặc dù phương thức ```brewFilterCoffee``` không cung cấp bất kỳ chức năng gì và chúng cũng không hề gọi nó.

# Áp dụng nguyên tắc Interface Segregation
Vậy làm thế nào để sửa interface ```CoffeeMachine``` và các triển khai của nó là ```BasicCoffeeMachine```, ```EspressoMachine``` ?

Bạn cần chia tách interface ```CoffeeMachine``` thành nhiều interfaces cho các loại khác nhau của máy cà phê. Tất cả các triển khai đã biết của interface này sẽ dùng chung phương thức ```addGroundCoffee```. Như vậy, không có lý do để bỏ nó đi.

```java
public interface CoffeeMachine {
    void addGroundCoffee(GroundCoffee newCoffee) throws CoffeeException;
}
```

Chúng ta không giữ lại hai phương thức ```brewFilterCoffee``` và ```brewEspresso```. Bạn nên tạo hai interface riêng cho từng loại. Và trong ví dụ này, hai interfaces nên extend interface  ```CoffeeMachine```. Điều đó sẽ không nên áp dụng trong trường hợp bạn tái cấu trúc lại ứng dụng. Vui lòng kiểm tra cẩn thận.

Sau khi làm việc trên, interface ```FilterCoffeeMachine``` extend interface ```CoffeeMachine``` và định nghĩa phương thức ```brewFilterCoffee```.

```java
public interface FilterCoffeeMachine extends CoffeeMachine {
    CoffeeDrink brewFilterCoffee() throws CoffeeException;
}
```

Tương tự với interface ```EspressoCoffeeMachine ```:

```java
public interface EspressoCoffeeMachine extends CoffeeMachine {
    CoffeeDrink brewEspresso() throws CoffeeException;
}
```

Ok, bây giờ bạn đã chia các interfaces như vậy là chức năng của các máy cà phê khách nhau sẽ độc lập. Với kết quả đó, class ```BasicCoffeeMachine``` và ```EspressoMachine``` không cần cung cấp các triển khai những phương thức rỗng nữa và sẽ độc lập với nhau.

![](https://images.viblo.asia/1b606c09-7c72-4ee3-96bd-7015fd1bcafa.png)

Class ```BasicCoffeeMachine``` bây giờ triển khải phương thức ```FilterCoffeeMachine``` đồng thời chỉ định nghĩa phương thức ```addGroundCoffee``` và ```brewFilterCoffee```.

```java
public class BasicCoffeeMachine implements FilterCoffeeMachine {
    private Map<CoffeeSelection, Configuration> configMap;
    private GroundCoffee groundCoffee;
    private BrewingUnit brewingUnit;

    public BasicCoffeeMachine(GroundCoffee coffee) {
        this.groundCoffee = coffee;
        this.brewingUnit = new BrewingUnit();

        this.configMap = new HashMap<>();
        this.configMap.put(CoffeeSelection.FILTER_COFFEE, new Configuration(30, 480));
    }

    @Override
    public CoffeeDrink brewFilterCoffee() {
        Configuration config = configMap.get(CoffeeSelection.FILTER_COFFEE);

        // brew a filter coffee
        return this.brewingUnit.brew(CoffeeSelection.FILTER_COFFEE,
            this.groundCoffee, config.getQuantityWater());
    }

    @Override
    public void addGroundCoffee(GroundCoffee newCoffee) throws CoffeeException {
        if (this.groundCoffee != null) {
            if (this.groundCoffee.getName().equals(newCoffee.getName())) {
                this.groundCoffee.setQuantity(this.groundCoffee.getQuantity()
                    + newCoffee.getQuantity());
            } else {
                throw new CoffeeException(
                    "Only one kind of coffee supported for each CoffeeSelection.");
            }
        } else {
            this.groundCoffee = newCoffee;
        }
    }
}
```

Tương tự, class ```EspressoMachine``` triển khai interface ```EspressoCoffeeMachine``` với những phương thức của nó là ```addGroundCoffee``` và ```brewEspresso```.

```java
public class EspressoMachine implements EspressoCoffeeMachine {
    private Map configMap;
    private GroundCoffee groundCoffee;
    private BrewingUnit brewingUnit;

    public EspressoMachine(GroundCoffee coffee) {
        this.groundCoffee = coffee;
        this.brewingUnit = new BrewingUnit();

        this.configMap = new HashMap();
        this.configMap.put(CoffeeSelection.ESPRESSO, new Configuration(8, 28));
    }

    @Override
    public CoffeeDrink brewEspresso() throws CoffeeException {
        Configuration config = configMap.get(CoffeeSelection.ESPRESSO);

        // brew a filter coffee
        return this.brewingUnit.brew(CoffeeSelection.ESPRESSO,
            this.groundCoffee, config.getQuantityWater());
    }

    @Override
    public void addGroundCoffee(GroundCoffee newCoffee) throws CoffeeException {
        if (this.groundCoffee != null) {
            if (this.groundCoffee.getName().equals(newCoffee.getName())) {
                this.groundCoffee.setQuantity(this.groundCoffee.getQuantity()
                    + newCoffee.getQuantity());
            } else {
                throw new CoffeeException(
                    "Only one kind of coffee supported for each CoffeeSelection.");
            }
        } else {
            this.groundCoffee = newCoffee;
        }
    }
}
```

# Mở rộng ứng dụng

Sau khi bạn đã chia tách các interfaces như vậy là bạn có thể nâng cấp việc triển khai hai máy pha cà phê độc lập với nhau, bạn có thể tự hỏi làm thế nào có thể thêm những loại khác của máy cà phê tới ứng dụng của bạn. Nói chung là có bốn tùy chọn:

1. Máy cà phê mới là một ```FilterCoffeeMachine``` hoặc là ```EspressoMachine```. Trong trường hợp này, bạn chỉ cần triển khai interface tương ứng.
2. Máy cà phê mới pha cà phê phin và espresso. Tình huống này tương tự trường hợp đầu tiên. Chỉ khác là class bây giờ triển khai cả hai interface ```FilterCoffeeMachine``` và ```EspressoMachine```.
3. Máy cà phê mới là hoàn toàn khác với hai loại chúng ta đề cập ở trên.  Có thể là một pad machine, loại máy mà bạn muốn sử dụng để làm trà hoặc các đồ uống nóng khác. Trong trường hợp này, bạn cần tạo một interface mới và quyết định nếu bạn muốn mở rộng ```CoffeeMachine```. Trong ví dụ của pad machine, chúng ta không làm như vậy bởi vì bạn không thể thêm cà phê xay (```addGroundCoffee```) vào pad machine. Như vậy, class ```PadMachine``` không cần triển trai phương thức ```addGroundCoffee```.
4. Máy cà phê mới cung cấp chức năng mới, nhưng bạn vẫn có thể sử dụng nó để pha cà phê phin và espressso. Trong trường hợp này, chúng ta nên định nghĩa một interface mới cho chức năng mới. Class của nó có thể triển khai interface mới và một hoặc nhiều interface đã có (```BasicCoffeeMachine```, ```EspressoMachine```).

# Tổng kết
Qua bài viết này các bạn có thể nắm được tư tưởng chủ đạo của nguyên tắc thiết kế **Interface Segregation**, đồng thời bạn cũng biết được những vi phạm thường gặp trong thực tế, cũng như ví dụ về cách áp dụng đúng nguyên tắc này. Tác giả bài viết cũng chỉ ra 4 trường hợp thường gặp khi mở rộng hệ thống và hướng xử lý cho từng trường hợp. Hy vọng bài viết mang đến sự hữu ích cho các bạn.

**Bài viết được dịch từ nguồn:**

https://stackify.com/interface-segregation-principle/