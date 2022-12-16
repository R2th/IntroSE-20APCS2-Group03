Đầu tiên chúng ta sẽ tìm hiểu xem tại sao nên sử dụng nó và áp dụng nó trong trường hợp nào.

## Tại sao nên sử dụng Generics

Hãy cùng xem qua một phương thức add dơn giản phía dưới. Với phương thức đó thì chúng ta không thể truyền vào một biến `long`, `float` hoặc `double` như một đối số của phương thức.

```java
public static int add(int a, int b) {
    return a + b;
}
```

Nếu chúng ta trừu tượng hóa kiểu dữ liệu truyền vào thì chúng ta sẽ được một phương thức mới như phía dưới. Ở đây thì `<T>` là ***tham số kiểu***, tương tự như tham số truyền vào thông thường. Các giá trị như ***<Integer>*** hoặc ***<Double>*** được truyền vào cho tham số kiểu được gọi là ***đối số kiểu*** , tương tự như đối số của hàm mà chúng ta hay truyền.

```java
public class Main {
//Trong 2 phương thức phía dưới thì chỉ kiểu dữ liệu nào kế thừa Number mới được chấp nhận.
    public static < T extends Number > double addStaticMethod(T a, T b) {
            return a.doubleValue() + b.doubleValue();
    }
    public < T extends Number > double addInstanceMethod(T a, T b) {
        return a.doubleValue() + b.doubleValue();
    }
    public static void main(String[] args) {
        //Hàm static được gọi với đối số kiểu. đây là trường hợp type safe do hàm chỉ chấp nhận Integer.
        System.out.println(Main. < Integer > addStaticMethod(3, 4));
        //Hàm static được gọi mà không có đối số kiểu, đây không phải là trường hợp type safe. Cả Integer và Float đều được chấp nhận.
        System.out.println(addStaticMethod(3, 4.3));
        Main m = new Main();
        //Cách gọi hàm của một instance với đối số kiểu
        System.out.println(m. < Double > addInstanceMethod(3.2, 4.3));
    }
}
```

Tiếp theo hãy cùng xem xét đến một cấu trúc dữ liệu. Để đơn giản thì chúng ta sẽ xem xét đến Array. Liệu chúng ta có thể tạo ra một mảng có thể chứa bất kỳ kiểu dữ liệu nào không? Câu trả lời là không, chúng ta chỉ có thể tạo ra một mảng chỉ chứa Integer, Float hoặc của bất kỳ một kiểu dữ liệu cụ thể nào đó. Câu hỏi tiếp theo là liệu chúng ta có thể trừu tượng hóa kiểu dữ liệu của cấu trúc dữ liệu này không?

![](https://images.viblo.asia/e8062d20-9aa7-45fb-97fd-d4402c81f50b.jpg)

Câu trả lời là có. Trong Java thì `ArrayList` là lớp làm điều này. Khi chúng ta khai báo `List<String> = new ArrayList<>()` thì nó sẽ tạo ra một mảng `String`. Nếu chúng ta truyền `Integer` như một đối số kiểu thì thay vì là `String` nó sẽ tạo ra một mảng các `Integer`. Và tương tự chúng ta có thể tạo một danh sách của một kiểu dữ liệu bất kỳ.

Ở trên dù đang nói về `ArrayList` nhưng chúng ta sẽ không đi sâu vào cách nó được implement do tính phức tạp của nó. Thay vào đó chúng ta ta sẽ định nghĩa một đối tượng là box và tìm hiểu cách tạo một cái box generic từ một box có kiểu cụ thể.

![](https://images.viblo.asia/7ddde3e8-e369-419e-9384-8b0c2ae6bcd2.jpg)

Hãy cùng xem đoạn code sau. Chúng ta có thể bỏ một `String` vào trong đối tượng `SpecilizedStringBox` và có thể lấy ra một `String` từ nó.

```java
public class SpecilizedStringBox {
    private String item;
    public String getItem() {
        return item;
    }
    public void setItem(String item) {
        this.item = item;
    }
}
```

Bây giờ, nếu chúng ta trừu tượng hóa kiểu dữ liệu `String` từ `SpecilizedStringBox` thì chúng ta sẽ có một chiếc hộp generic được thể hiện bởi đoạn code bên dưới. Chiếc hộp này chấp nhận bất kỳ kiểu dữ liệu nào:

```java
public class GenericBox<T> {
    private T item;
    public T getItem() {
        return item;
    }
    public void setItem(T item) {
        this.item = item;
    }
}
```

Như vậy chúng ta sử dụng Generics là khi chúng ta muốn trừu tượng hóa kiểu dữ liệu cho một phương thức, lớp nhằm mục đích để có thể sử dụng phương thức hoặc lớp đó cho nhiều kiểu dữ liệu.

## Khi nào thì áp dụng Generics

Việc ứng dụng generics bằng cách sửa lại một phương thức hoặc lớp như 2 ví dụ ở trên là tương đối dễ dàng bởi chúng ta mới chỉ làm việc với một kiểu cấu trúc dữ liệu đơn giản và các kiểu dữ liệu nguyên thuỷ. Tuy nhiên thì trong thực tế không phải lúc nào cũng đơn giản như vậy do chúng ta thường sẽ phải tạo nhiều kiểu dữ liệu với rất nhiều lớp khác nhau. Việc kết hợp mô hình lập trình generic (Generic Programming Paradigm) với lập trình hướng đối tượng đôi khi khiến chúng ta cảm thấy khó khăn khi phải quyết định có nên áp dụng generics vào hay không. Nắm bắt được tình huống nên áp dụng nó là điều rất quan trọng.

Bài viết sẽ nêu một số trường hợp sử dụng generics thông dụng và cách áp dụng để bạn có thể dễ dàng ứng dụng trong thực tế.

Java tích hợp Generics vào Java 5.0 nhằm mục đích:

1. Hỗ trợ type safety: đảm bảo rằng một khi đối số kiểu được áp dụng thì không kiểu dữ liệu nào khác được phép truyền vào phương thúc hoặc lớp. Ngoài ra thì nó cũng giúp chúng ta tránh phải ép kiểu trong các phiên bản trước đó.

2. Hỗ trợ lập trình generic/đa hình tham số


Chúng ta hãy cùng xem một số trường hợp sử dụng thông dụng của Generics.

### Trường hợp 1: Thuật toán và cấu trúc dữ liệu là các đối tượng hàng đầu cần sử dụng Generics

Thuật toán và cấu trúc dữ liệu hầu như luôn song hành với nhau. Chỉ một thay đổi nhỏ trong cấu trúc dữ liệu của một thuật toán có thể sẽ làm thay đổi tính phức tạp của nó.

Trong cấu trúc dữ liệu sẽ có dữ liệu và dữ liệu thì hiển nhiên là phải có kiểu. Chúng ta có thể trừu tượng hóa kiểu của dữ liệu với tham số kiểu với Generics.

Tham số đầu vào của bất kỳ thuật toán nào cũng có kiểu dữ liệu. Tương tự chúng ta cũng sẽ trừu tượng hóa nó với Generics.

Như vậy, Generics nên được áp dụng với bất kỳ một thuật toán cụ thể sử dụng một cấu trúc dữ liệu nào đó. Thực tế thì Generics ban đàu được thiết kế chủ yếu dành cho Java's Collection API.

Nếu bạn phải viết một cấu trúc dữ liệu của riêng mình thì hãy cố gắng áp dụng Generics. Ngoài Java's Collection API thì bạn có thể gặp nhiều trường hợp áp dụng rất tốt Generics trong các thư viện khác như Guava, Apache Common Collections, FastUtils...

###Trường hợp 2: Value Typed Boxes hoặc Single Element Container 

Cấu trúc dữ liệu với kiểu Generics được gọi là Generics Boxes. Các lớp như ArrayList, LinkedList,... đại diện cho một cấu trúc dữ liệu và hoạt động như một Generics Box riêng biệt.

Chúng ta thường xuyên sẽ bắt gặp các Generic Box dưới dạng single element thay vì là một collection. Chúng chỉ đóng vai trò như một holder hoặc wrapper cho một dữ liệu  thuộc một kiểu dữ liệu cụ thể nào đó. Ví dụ như `Entry<K,V>` trong `Map`, `Node<K,V>`, `Pair<K,V>`, và các kiểu dữ liệu đại số như `Optional<T>`, `Choice<U,V>`,...

ThreadLocal và AtomicReference là các ví dụ điển hình của Single Element Container áp dụng thuật toán được yêu cầu cho một truy nhập đồng thời.

Các trường hợp sử dụng như ở trên đã chứng tỏ được tính hiệu quả của Generics trong khi có những trường hợp khác thì không. `GenericBox` vừa nãy của chúng ta có thể chứa bất cứ thứ gì bỏ vào nó. Tuy nhiên bây giờ chúng ta sẽ phải bắt đầu phân loại nó: Chiếc hộp nào đựng đồ chơi, đựng bút....

![](https://images.viblo.asia/87042193-d985-4cea-8fb9-f04aa55aad59.png)

Một chiếc cốc với vai trò như một Holder có thể chứa trà, cà phê hay bất kỳ loại đồ uống nào. Chiếc cốc là một ví dụ dễ hiểu cho một Holder trong thế giới thực. Một chiếc xe buýt có thể chở cả nam lẫn nữ. Nếu chúng ta làm cho nó type safe chỉ chấp nhận nữ lên xe thì chúng ta sẽ gọi nó xe buýt dành cho nữ. Điều này có thể cần hoặc không cần thiết do nó còn tùy thuộc vào business use cases . Việc nắm bắt được các business use cases, đặc biệt là Wrapper cho Holder, sẽ giúp chúng ta nhìn thấy được những chỗ cso thể áp dụng Generics. Nếu việc sử dụng một wrapper hoặc holder được sử dụng trong business có xu hướng thiên về việc sử dụng cấu trúc dữ liệu thì việc sử dụng generics trong trường hợp này sẽ làm cho nó tốt hơn rất nhiều.

![](https://images.viblo.asia/cb749806-67af-4817-a802-e97b8730aa50.jpg)

### Trường hợp 3: Các phương thức tiện ích generic với lớp trừu tượng

Thuật toán generic không cần phải lúc nào cũng gắn chặt với một cấu trúc dữ liệu hoặc một thuật toán cụ thể. Đôi khi chúng có thể được áp dụng vào phần lớn một nhóm các cấu trúc dữ liệu trừu tượng dựa trên contract mà các implement thực tế của chúng phải thỏa mãn.

Trong Java thì chúng ta có lớp tiện ích `Collections`. Chúng ta hãy cùng xem các phương thức trong lớp tiện ích đó để phần nào có thể biết được phương thức như thế nào thì có thể implement.

#### Collection Factories Methods (Empty, Singleton):

- emptyList, emptyMap, emptySet,...
- singleton, singletonList, singletonMap,...


#### Wrapper Methods (Synchronized, UnModifiable, Checked Collection):

- synchronizedCollection, synchronizedSet, synchronizedMap...

- unmodifiableCollection, unmodifiableSet, unmodifiableList,...

- checkedCollection, checkedList, checkedSet,...


#### Một số ít phương thức generics nữa được phân loại thành 4 loại chính sau đây

1. Thay đổi thứ tự của phần tử trong list: reverse, rotate, shuffle, sort, swap.
2. Thay đổi nội dung của list: copy, fill, replaceAll
3. Tìm giá trị cực đại và cực tiểu trong collection.
4. Tìm một giá trị cụ thể trong danh sách: binarySearch, indexOfSubList, lastIndexOfSubList.


Các phương thức này đều là các phương thức có tính tái sử dụng cao do chúng có thể áp dụng cho Lists hoặc trong nhiều trường hợp cho cả Collections của bất kỳ kiểu dữ liệu nào. Chúng ta có thể tìm được rất nhiều phương thức  Generics có thể áp dụng được cho hầu hết các kiểu `Collection` thông thường.

### Trường hợp 4: Các phương thức Generic trong phân cấp song song của lớp

JpaRepository, CrudRepository trong Spring Framework được xây dựng với Generics. Các phương thức thêm, sửa, tìm, xóa,... đều là các phương thức generic có thể áp dụng cho tất cả các thực thể.

Với tất cả các thực thể thì một DAO song song cần phải được khởi tạo, do vậy nên một phân cấp song song của các lớp sẽ xuất hiện trong trường hợp này. Mẫu thiết kế DAO không phải là trường hợp duy nhất.

Nó còn thường xuyên xảy ra khi chúng ta áp dụng Strategy Pattern để giải quyết vấn đề nghiệp vụ gặp phải bằng cách tách rời phương thức ra khỏi đối tượng nhằm mục đích có thể hỗ trợ được cho càng nhiều instance của phương thức càng tốt.

Bất cứ khi nào chúng ta thêm một lớp mới thì chúng ta phải thêm một Test case song song. Nếu chúng ta cần factory thì chúng ta sẽ thêm một lớp factory song song nữa.  Chúng ta có thể bắt gặp phân cấp song song trong các tình huống nghiệp vụ. Giả sử chúng ta thêm một phương tiện giao thông mới là Bus được thêm vào phân cấp các loại phương tiện giao thông. Trong trường hợp này thì chúng ta sẽ phải thêm một lớp Bus Driver.

![](https://images.viblo.asia/43bfedbd-1405-4b28-b071-cd71233198bd.png)

![](https://images.viblo.asia/6d5590df-4b91-4649-9950-6d3482937bee.png)

Phía dưới là một ví dụ về phân cấp song song của lớp và Generics.

![](https://images.viblo.asia/b79cf34a-8c92-4e2c-844f-49570b586591.png)

```java
import java.util.ArrayList;
import java.util.Collection;
public abstract class Habitat <A extends Animal> {
  //Một generic collection có thể lưu Animal hoặc bất kỳ subclass nào của Animal
 Collection<A> collection = new ArrayList<A>();
 /*
  * add an Inhabitant to the collection. Should be overridden by subclass
  
  */
  public abstract  void addInhabitant( A animal);
}
```

```java

public class Aquarium extends Habitat < Fish > {
    @Override
    public void addInhabitant(Fish fish) {
        collection.add(fish);
        System.out.println(Aquarium.class);
    }
}
```

```java
/*
 * Super class cho phân cấp Animal
 */
public abstract class Animal {
}
```

```java
public class Fish extends Animal {
  
}
```

```java
public class Test {
    public static void main(String[] args) {
        Animal animal = new Fish();
        Fish fish = new Fish();
        new Aquarium().addInhabitant(fish);
    }
}
```



### Trường hợp 5: Để tạo các container không đồng nhất typesafe

`Collection<String>` là một ví dụ về một container đồng nhất. Chúng ta không thể bỏ bất cứ cái gì ngoài `String` vào trong box. Mặt khác, `Collection<Object>` là một ví dụ về một container không đồng nhất. Chúng ta có thể bỏ bất cứ cái gì vào nó. `Collection<Object>`không phải type safe cho nên cần phải kiểm tra kiểu dữ liệu của nó và ép kiểu nếu cần, tương tự như kiểu thô `Collection` (kiểu thô là một kiểu Generic mà không áp dụng đối số kiểu Generic. Nó lấy `Object` như một đối số kiểu mặc định). Java không hỗ trợ tốt cho các container không đồng nhất typesafe.


Nguồn: https://dzone.com/articles/hack-1-understanding-the-use-cases-of-generics

Trong `Collection<String>` thì kiểu đối số `String` được áp dụng cho cho tham số kiểu `T` để làm cho nó type safe. Hãy cùng xem `Map<String, String>`, nó yêu cầu 2 đối số kiểu truyền vào. Cách sử dụng thông thường của `Generics` giới hạn lập trình viên về số lượng các tham số kiểu cho container mà họ có thể dùng. Có thể khắc phục điều này bằng cách đặt tham số kiểu làm key cho `Map` thay vì là container. Chúng ta có thể sử dụng đối tượng `Class` như là key để tạo một container không đồng nhất typesafe hoặc map. 

Các container như container creation bean, exception handler container hoặc service lookup container là ví dụ về các containers không đồng nhất mà tại đó Generics có thể được sử dụng để làm chúng typesafe với ép kiểu động với đối tượng lớp như là khóa.