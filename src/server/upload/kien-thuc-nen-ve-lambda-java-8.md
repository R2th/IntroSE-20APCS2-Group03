Như các bạn đã biết, Java 8 là một sự thay đổi lớn. Giúp cú pháp Java thon gọn và dễ đọc hơn. 

Nhưng nhiều bạn khá khó khăn khi bắt đầu, nên mình sẽ viết 1 bài phần tích cặn kẽ tại sao lại sử dụng lambda Java 8, nó giúp gì được cho chúng ta.
 
Lưu ý: Do bài viết phân tích cặn kẽ, nên code sẽ dài. Các bạn có thể sử dụng chức năng clips để lưu lại và đọc từ từ. 

Mình muốn giúp các bạn chỉ đọc một lần và hiểu cặn kẽ, thay vì đọc nhiều lần, nhiều nơi nhưng vẫn chưa hiểu rõ cách sử dụng như thế nào.

> Có ba thứ dốt: Không biết những gì mình cần phải biết; Biết không rành những gì mình biết; Biết những gì mình không nên biết. (La Rochefoucauld)

### Đương đầu với sự thay đổi

Viết code để thích nghi với sự thay đổi yêu cầu là một viêc khó khăn. Chúng ta sẽ cùng xem xét qua các ví dụ, từng bước từng bước cái thiện code, giúp cho code của bạn linh hoạt hơn.

Trong ngữ cảnh của ứng dụng về quản lý nông trại, bạn thực thi chức năng như sau:

* Tìm kiếm những quả táo màu *xanh* trong danh sách.

### Cách 1: lọc những quả táo màu xanh

Phương pháp các bạn hay sử dụng sẽ như sau:

```
public static List<Apple> filterGreenApple(List<Apple> inventory) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
        if ( "green".equals(apple.getColor())) {
            result.add(apple);
        }
    }
    return result;
}
```

Lọc quả táo màu xanh với điều kiện như sau: `"green".equals(apple.getColor())`. Nhưng chủ nông trại muốn thay đổi ý định và muốn tìm kiếm quả táo theo màu đỏ.

Bạn sẽ làm gì với vấn đề này? Cách mà chúng ta hay làm là copy code hiện tại, đổi tên hàm từ `filterGreenApple` thành `filterRedApple`, và thay đổi điều kiện tìm kiếm thành `"red".equals(apple.getColor())`.

Tuy nhiên với cách này thì sẽ không đáp ứng yêu cầu của ông chủ nông trại, yêu cầu có thể tìm kiếm nhiều loại màu sắc như: xanh, đỏ đen, vàng. 

Có 1 qui tắc giải quyết vấn đề này là: khi gặp những đoạn code trùng lặp, hãy trừu tượng nó.

### Cách 2: tham số hoá màu sắc

Những gì bạn có thể làm là thêm 1 tham số vào hàm để tham số hoá màu sắc để giúp code linh hoạt với sự thay đổi:

```
public static List<Apple> filterApplesByColor(List<Apple> inventory, String color) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
        if ( color.equals(apple.getColor())) {
            result.add(apple);
        }
    }
    return result;
}
```

Và bây giờ, chủ nông trại rất vui vẻ vì ông ta có thể tìm kiếm theo tất cả màu sắc:

`List<Apple> greenApples = filterApplesByColor(inventory, "green");`

`List<Apple> redApples = filterApplesByColor(inventory, "red");`

Thật dễ phải không nào? Bây giờ chúng ta sẽ tìm hiểu với ví dụ khó hơn.

Chủ nông trại gặp bạn và nói với bạn rằng

> Sẽ rất tuyệt vời nếu như phân tách táo dựa theo trọng lượng.

Như bạn biết đáp án sẽ như thế nào:

```
public static List<Apple> filterApplesByWeight(List<Apple> inventory, int weight) {
    List<Apple> result = new ArrayList<>(); 
    for (Apple apple: inventory){
        if ( apple.getWeight() > weight ){
            result.add(apple);
        }
    }
    return result; 
}
```

Nhìn nó có vẻ ổn, nhưng sau khi xem xét kỹ bạn sẽ nhận ra rằng chỉ có điều kiện tìm kiếm là thay đổi  `if ( apple.getWeight() > weight )`. Tất cả các đoạn code kia điều lặp lại.

Điều này phá vỡ nguyên tắc lập trình DRY (don't repeat yourself).

Nếu bạn muốn nâng cấp tốc độ điều kiện tìm kiếm thì bạn phải sửa lại toàn bộ code thực thi, thay vì chỉ sửa 1 nơi. Điều này rất tốn thời gian bảo trì, và rất dễ tạo ra bug.

Và bạn muốn gom 2 điều kiện tìm kiếm theo màu và trọng lượng vào một nơi. Nhưng bạn cần phải có 1 thuộc tính phân biệt điều kiện tìm kiếm (tìm theo màu sắc hoặc trọng lượng) bằng cách tạo 1 biến cờ flag.

### Cách 3: Tìm kiếm với nhiều thuộc tính

Bạn có thể thực thi đoạn code như sau: (nhưng trông nó có vẻ khó hiểu, khá rối)

```
public static List<Apple> filterApples(List<Apple> inventory, String color, int weight, boolean flag) {
    List<Apple> result = new ArrayList<>(); 
    for (Apple apple: inventory){
        if ( (flag && apple.getColor().equals(color)) || 
                    (!flag && apple.getWeight() > weight ) ){
            result.add(apple);
        }
    }
    return result; 
}
```

Khi flag là `true` sẽ tìm kiếm theo màu sắc.

`List<Apple> greenApples = filterApples(inventory, "green", 0, true);`

Khi flag là `false` sẽ tìm kiếm theo kích thước.

`List<Apple> heavyApples = filterApples(inventory, "", 150, false);`

Cách giải quyết này rất tệ. 

1. Code client nhìn rất kinh khủng. `true` `false` là gì?

2. Không đáp ứng được khi yêu cầu thay đổi. Điều gì sẽ xảy ra nếu chủ nông trại yêu cầu tìm kiếm theo nơi sản xuất, kiểu loại,... ?

3. Nếu chủ nông trại yêu cầu kết hợp nhiều điều kiện: Tìm kiếm quả táo màu xanh cân nặng trên 600g? Bạn phải copy đoạn code ra 1 nơi khác rồi sửa lại code, hoặc là tạo ra 1 hàm phức tạp, ví dụ như tạo ra 1 biến flag như trên.

Tham số hoá bằng giá trị có thể giải quyết trong 1 vài trường hợp cụ thể. Nhưng với trường hợp này thì bạn cần 1 cách tốt hơn, và phần tiếp theo tôi sẽ đề cập đến nó.

### Tham số hoá hành vi (behavior parameterization)

Như bạn đã thấy trong phần trước, bạn cần 1 giải pháp tốt hơn thay vì phải thêm nhiều tham số. 

Bạn chỉ cần thay đổi điều kiện tìm kiếm và các đoạn code còn lại vẫn giữ nguyên. Một đối tượng chỉ trả về kết quả `true` hoặc `false`.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/d0ky94qk45_image.png)

Ta sẽ tạo một interface có 1 hàm là điều kiện tìm kiếm

```
public interface ApplePredicate {
    boolean test(Apple apple);
}
```

Và bây giờ bạn định nghĩa điều kiện tìm kiếm theo cách mình muốn:

Tìm kiếm những quả táo nặng hơn 150g:

```
public class AppleHeavyWeightPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return apple.getWeight() > 150
    }
}
```

Tìm kiếm những quả táo màu xanh:

```
public class AppleGreenColorPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return "green".equals(apple.getColor());
    }
}
```

Như bạn đã thấy ta đã chia ra 2 loại tìm kiếm, dựa theo nhu cầu của người sử dụng.

Những gì bạn vừa nhìn thấy đó chính là Strategy Design Pattern, giúp bị đóng gói các phần thay đổi, và có thể chạy trong thời gian thực.

Phần thay đổi là điều kiện tìm kiếm nên ta tạo interface `ApplePredicate` với 2 class thực thi là `AppleHeavyWeightPredicate` và `AppleGreenColorPredicate`.

Bạn có thể tham khảo bài viết sau đây về Strategy Design Pattern, giới thiệu Design Pattern là gì, và cách thiết kế Strategy Design Pattern:

https://viblo.asia/p/design-pattern-la-gi-V3m5WPbyKO7

Nhưng làm cách nào để thực thi `ApplePredicate`?

Bạn cần một hàm filterApples, có tham số là đối tượng ApplePredicate để kiếm tra điều kiện của táo.

Ý nghĩa của tham số hoá hành vi: cho phép hàm chấp nhận nhiều hành vi(strategies) như là một tham số, và sử dụng chúng để thực thi.

### Cách 4: Tìm kiếm bằng cách trường tượng hành vi

```
public static List<Apple> filterApples(List<Apple> inventory, ApplePredicate p) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
       //Điều kiện tìm kiếm đã được đóng gói
        if (p.test(apple)) {
            result.add(apple);
        }
    }
    return result;
}
```

Đoạn code trở nên linh hoạt hơn so với những lần trước, code dễ đọc và dễ sử dụng.

Bạn có thể tạo thêm các class thực thi interface `ApplePredicate` và truyền vào hàm `filterApples`.

Nếu chủ nông trại yêu cầu bạn tìm kiếm những quả táo màu đỏ và nặng hơn 150g, tất cả những điều bạn cần làm là tạo ra class ApplePredicate tương ứng.

Code của bạn bây giờ rất linh hoạt để có thể áp dụng vào yêu cầu mới:

```
public class AppleRedAndHeavyPredicate implements ApplePredicate{
    public boolean test(Apple apple){
        return "red".equals(apple.getColor()) && apple.getWeight() > 150;
    } 
}

//Tìm kiếm táo màu đỏ và trọng lượng > 150g
List<Apple> redAndHeavyApples = filterApples(inventory, new AppleRedAndHeavyPredicate());
```

Bạn vừa hoàn thành những thứ thật tuyệt vời: hành vi của hàm `filterApples` phụ thuộc vào đối tượng bạn truyền vào. Nói cách khác là bạn vừa tham số hoá hành vi của hàm `filterApples`.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/tmbat7qpsk_image.png)

### Nhiều hành vi, một tham số

Như được giải thích trước đó, tham số hoá hành vi thật tuyệt vời, bởi vì nó cho phép bạn tách phần "duyệt từng phần tử của vòng for" và "hành vi tìm kiếm".

Với cách áp dụng này bạn có thể tái sử dụng lại hàm, và có thể truyền tất cả cả hành vi mình mong muốn.

Điều này giải thích tại sao tham số hoá hành vi là một khái niệm hay, bạn nên lưu giữ lại như là 1 công cụ tạo ra những dòng code linh hoạt.

### Tham số hoá hành vi hàm filterApples() và truyền những strategies(hành vi, behavior) khác nhau

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/9f0ltf0pbk_image.png)

Để bạn hiểu rõ hơn về tham số hóa hành vi(behavior parameterization) chúng ta sẽ tìm hiểu qua ví dụ sau:

### Viết hàm xuất ra thông tin quả táo

Chúng ta sẽ tạo ra hàm có tên là `prettyPrintApple`
* Input: danh sách táo(Apple).
* Output: xuất ra nhiều định dạng khác nhau.

Trong ví dụ này mình sẽ đưa ra 2 loại output, trong thực tế bạn có thể tạo 5 hoặc 10 hoặc 100 loại:
1. Xuất ra loại táo: nặng hay nhẹ và màu sắc của chúng.
2. Xuất ra cân nặng của táo.

Để giúp bạn dễ hình dung mình sẽ làm khung mẫu cho bạn:

```
public static void prettyPrintApple(List<Apple> apples, ???) {
    for(Apple apple : apples) {
        String output = ???.???(apple);
        System.out.print(output);
    }
}
```

`String output = ???.???(apple);`. Như bạn đã thấy chúng ta cần 1 hàm xử lý, giá trị truyền vào là Apple và kết quả trả về là một chuỗi đã được xử lý.

Bạn sẽ thực hiện giống như khi ta tạo một interface `ApplePredicate`:

```
public interface AppleFormatter{
    String accept(Apple a);
}
```

Và bây giờ chúng ta sẽ tạo ra các class để thực thi `AppleFormatter` interface

```
public class AppleFancyFormatter implements AppleFormatter{
    
    public String accept(Apple apple){
        String characteristic = apple.getWeight() > 150 ? "heavy" : "light";
        return "A " + characteristic + " " + apple.getColor() +" apple";
    }
}

public class AppleSimpleFormatter implements AppleFormatter{

        public String accept(Apple apple){
            return "An apple of " + apple.getWeight() + "g";
        }
}
```

Và cuối cùng ta sẽ chỉnh sửa lại hàm `prettyPrintApple`

```
public static void prettyPrintApple(List<Apple> apples, AppleFormatter formatter){
    for(Apple apple: apples){
        String output = formatter.accept(apple);
        System.out.println(output);
    }
}
```

Thật tuyệt vời! Và bây giờ ta có thể truyền bất kỳ hành vi nào vào hàm `prettyPrintApple`. Thực hiện việc đó bằng cách khởi tạo class thực thi của `AppleFormatter` interface tương ứng.

Ta muốn xuất thông tin màu sắc và loại táo nên sẽ xử dụng hành vi là `AppleFancyFormatter`

`prettyPrintApple(inventory, new AppleFancyFormatter());`

Kết quả:

> A light green apple
> 
> A heavy red apple
> 
> ...

Hoặc chỉ xuất kích thước của táo:

`prettyPrintApple(inventory, new AppleSimpleFormatter());`

Kết quả:

> An apple of 80g
> 
> An apple of 155g
> 
> ...

Bằng cách trừu tượng hóa hành vi, giúp cho code có thể đáp ứng với nhiều yêu cầu khác nhau, nhưng có 1 vấn đề gặp phải là chúng ta phải tạo rất nhiều class. Để giải quyết vấn đề này ta sẽ tìm hiểu ví dụ tiếp theo.

### Giải quyết sự dư thừa

Java có 1 kỹ thuật gọi là lớp ẩn danh(anonymous  class), giúp bạn khai báo và khởi tạo class cùng lúc.

Giống như tên gọi của nó(anonymous class) lớp này được sử dụng giống như lớp bình thường, nhưng sẽ *không có tên lớp*. 

### Cách 5: sử dụng lớp ẩn danh

Đoạn code dưới đây sẽ tạo ra một class ẩn danh thực thi interface `ApplePredicate`

```
List<Apple> redApples = filterApples(apples, new ApplePredicate() {
    public boolean test(Apple apple) {
        return "red".equals(apple.getColor());
    }
})
```

Lớp ẩn danh thường được sử dụng trong ngữ cảnh của ứng dụng Java (Java application) để tạo ra những đối tượng xử lý sự kiện.

```
button.setOnAction(new EventHandler<ActionEvent>() {
    public void handle(ActionEvent event) {
        System.out.println("Woooo a click!!");
    }
});
```

Nhưng lớp ẩn danh vẫn chưa đủ tốt cùng xem xét lại đoạn code tìm kiếm những quả táo màu đỏ:

```
List<Apple> redApples = filterApples(apples, new ApplePredicate() {
    public boolean test(Apple apple) {
       //Code của chúng ta chỉ thay đổi tại đây, những đoạn còn lại vẫn giữ nguyên
        return "red".equals(apple.getColor());
    }
})
```

` return "red".equals(apple.getColor());` chỉ có đoạn này là thay đổi. Những đoạn code khác chúng ta phải copy và paste, rất dư thừa.

Còn một điều nữa là những đoạn code dư thừa sẽ khiến chúng ta bị rối. Ví dụ như trương hợp sau:

Khi thực hiện đoạn code dưới đây, kết quả xuất ra là gì: 4, 5, 6 hay 42?

```
public class MeaningOfThis {
    public final int value = 4;
    
    public void doIt() {
        int value = 6;
        Runnable r = new Runnable() {
            public final int value = 5;
            public void run() {
                int value = 10;
                System.out.println(this.value);
            }
        };
        r.run();
    }
    
    public static void main(String ...args) {
        MeaningOfThis m = new MeaningOfThis();
        m.doIt();
    }
}
```

Kết quả sẽ xuất ra là 5, bởi vì nó thuộc phạm vi của Runnable, không phải của MeaningOfThis class.

Sự dư thừa thường là không tốt, và không được khuyến khích trong ngôn ngữ lập trình bởi vì làm tốn thời gian viết code và bảo trì, và gây khó khăn khi đọc code.

Một đoạn code hay là một đoạn code dễ hiểu, gây thích thú cho người đọc.

### Cách 6: sử dụng biểu thức lambda (lambda expression)

Với lambda expression bạn có thể viết lại như sau:

```
List<Apple> result = filterApples(apples, (Apple apple) -> "red".equals(apple.getColor()));
```

Bạn phải thừa nhận rằng đoạn code trên trông dễ hiểu hơn các đoạn code trước.

Nó thật tuyệt vời bởi vì nó chỉ thực thi những đoạn code liên quan tới vấn đề cần giải quyết. Ví dụ: Tôi muốn lấy những quả táo màu đỏ `(Apple apple) -> "red".equals(apple.getColor())`

### Biểu đồ so sánh tham số là giá trị vs tham số là hành vi

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/y7szmq0t40_image.png)

### Cách 7: Trừu tượng hóa loại danh sách (list type)

Hiện tại  hàm filterApple chỉ danh riêng cho táo, nhưng còn cam, bưởi, mận và xoài thì sao?

Ta sẽ xử dụng generic để giải quyết vấn đề này:

```
public interface Predicate<T>{
    boolean test(T t);
}

public static <T> List<T> filter(List<T> list, Predicate<T> p) {
    List<T> result = new ArrayList<>();
    for (T e: list) {
        if(p.test(e)) {
            result.add(e);
        }
    }
    return result;
}
```

Và bây giờ bạn có thể tìm kiếm theo danh sách táo, chuối, cam, Interger hay String.

```
List<Apple> redApples = filter(apples, (Apple apple) -> "red".equals(apple.getColor()));
List<String> evenNumbers = filter(numbers, (Integer i) -> i % 2 == 0);
```

Thật tuyệt vời phải không nào? Bạn đã nhận ra được sự ngắn gọn và súc tích của Java 8, thứ mà các phiên bản trước không làm được.

### Bonus ví dụ thực tế:

**Sắp xếp với Comparator:**

Chủ nông trại muốn sắp xếp lại danh sách táo theo kích thước. Hoặc anh ta thay đổi ý định muốn sắp xếp theo màu sắc. 

Bạn cần một hành vi để thể hiện cách loại sắp xếp khác nhau, đáp ứng với yêu cầu thay đổi của khách hàng.

Trong java, class `List` có hàm `sort` với tham số truyền vào là một tham số hành vi của sự sắp xếp `java.util.Comparator` có interface như sau:

```
public interface Comparator<T> {
    public int compare(T o1, T o2);
}
```

Và ta có thể tạo những hành vi tương ứng theo yêu cầu của khách hàng, bằng cách sử dụng lớp ẩn danh.

Sắp sếp tăng dần theo cân nặng của táo:

```
inventory.sort(new Comparator<Apple>() {
    public int compare(Apple a1, Apple a2){
        return a1.getWeight().compareTo(a2.getWeight());
    }
});
```

Đối với cách viết bằng Lambda expression:

```
inventory.sort((Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight()));
```

### Tổng kết

Dưới đây là những điểm bạn cần lưu ý:

* Tham số hóa hành vi cho phép bạn truyền những hành vi khác nhau để đáp ứng với yêu cầu thay đổi liên tục của khách hàng.
* Tham số hóa hành vi giúp cho code của bạn dễ đọc, dễ bảo trì, loại bỏ sự dư thừa.
* Tạo những class mới hoặc sử dụng lớp ẩn danh khiến cho đoạn code bạn trở nên dư thừa. Java 8 đã giải quyết vấn đề này bằng cách sử dụng lambda, cho phép bạn tạo ra những đoạn code chỉ liên quan tới vấn đề cần giải quyết.
* Java API có chứa rất nhiều nhiều hàm giúp bạn tham số hóa hành vi: tìm kiếm, threads, xử lý Java app,...

Nếu có thời gian mình khuyên bạn nên tìm hiểu về Strategy Design Pattern: 

https://viblo.asia/p/design-pattern-la-gi-V3m5WPbyKO7

### Source code

https://github.com/java8/Java8InAction/tree/master/src/main/java/lambdasinaction/chap2

### Đóng góp

Các bạn bỏ ra 1 phút giúp mình nhé. Vui lòng để lại ý kiến của bạn để giúp người sau dễ đọc và dễ hiểu hơn.

Cảm ơn các bạn đã quan tâm bài viết này. Chúc các bạn 1 ngày tốt lành! 😃

Tham khảo từ: Java 8 in Action (Raoul-Gabriel Urma, Mario Fusco, and Alan Mycroft).

Phúc Vưu.