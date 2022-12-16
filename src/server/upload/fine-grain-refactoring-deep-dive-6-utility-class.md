## 1. Introduction

Đầu tiên, hãy lướt qua định nghĩa về thế nào là [Utility class](https://qa-faq.com/en/Q%26A/page=c215d1ea050b049494eef21e1e2df846#s0):
> Utility Class, also known as Helper class, is a class, which contains just static methods, it is stateless and cannot be instantiated. It contains a bunch of related methods, so they can be reused across the application.
> 
> Utility Class hay còn được gọi là Helper class, là một class chỉ chứa static methods,  nó không có trạng thái và không thể khởi tạo. Nó chứa một cụm methods liên quan đến nhau, nên vì thế mà có thể được sử dụng lại trên toàn ứng dụng.

Về khả năng tái sử dụng lại code (reusability), nếu là lập trình viên thì chắc hẳn không còn xa lạ gì với nguyên tắc `Don't Repear Yourself` aka `DRY` được phát biểu chính thức lần đầu tiên trong cuốn sách `The Pragmatic Programmer` của hai tác giả `Andy Hunt` và `Dave Thomas` như sau:
> Every piece of knowledge or logic must have a single, unambiguous representation within a system. (Mỗi phần của kiến thức hoặc logic phải có một biểu diễn duy nhất, rõ ràng trong một hệ thống.). 
> 
> DRY is about the duplication of knowledge, of intent. It’s about expressing the same thing in two different places, possibly in two totally different ways. 

![image.png](https://images.viblo.asia/a64d77bd-bf0d-4c46-af68-f56dfdfdfb71.png)

Hiểu một cách đơn giản thì [ý tưởng chính của nguyên tắc DRY nói về sự trùng lặp về mặt kiến thức và mục đích](https://linhta.dev/blog/ban-dang-hieu-sai-ve-nguyen-tac-DRY/). Đó là việc biểu diễn cùng một thứ ở hai nơi khác nhau, có thể bằng hai cách hoàn toàn khác nhau. Ví dụ như chúng ta có triển khai thuật toán `A()` trả về kết quả là chữ cái với bất kỳ tham số truyền vào thì phải không được phép tồn tại một thuật toán `A()` khác trả về kết quả là con số được. Việc vi phạm nguyên tắc này đôi lúc trở nên rất nghiêm trọng nếu như người viết code gọi nhầm phương thức chứa thuật toán không mong muốn. 

Có lẽ một trong những ví dụ điển hình nhất để miêu tả nguyên tắc `DRY` đó chính là Utility class, nơi chứa những phần code dùng chung. Tuy nhiên, Utility class lại chưa thực sự là thiết kế tốt, thậm chí còn được xếp vào loại `anti-pattern`. 

![image.png](https://images.viblo.asia/b98f3bc6-ad05-4a17-a041-451bd8149165.png)

Hãy cùng tìm hiểu tại sao nhé.

 ## 2. Issue

Trước khi đến với vấn đề chính thì mình muốn cùng các bạn xem lại hai khái niệm quan trọng về class trong `Java` đó chính là **stateful class** và **stateless class**.
> Stateless class là class mà không có instance variable mặc dù cho phép sự tồn tại của constant. Hay nói cách khác là class không có trạng thái, không bị thay đổi bởi tham số truyền vào.
> 
> Stateful class thì ngược lại.
>
Lấy ví dụ, nếu chúng ta có class People và làm cho nó thành stateless thì chúng ta sẽ tạo thành những đối tượng People chỉ có hành động mà không có trạng thái gì cả, rõ ràng điều này là một thiết kế xấu, không hợp lí so với thực tế là con người có nhiều sắc thái biểu cảm khác nhau. Class People bắt buộc phải là stateful.

Tuy nhiên đối với trường hợp chúng ta có một class chỉ gồm các method dùng để thao tác với các chuỗi kí tự thì rõ ràng chúng ta không cần trạng thái nào cả, sẽ hợp lí khi đánh dấu class là stateless. Và đó chính là cách mà chúng ta thiết kế Utility class. Nhưng hãy nhớ rằng, đây là Java, đây là `object-oriented programming` chứ không phải là `procedural programming` thế nên là trừ những tình huống đặc biệt thì: 
>
> Design descision phải luôn luôn ưu tiên statefulclass so với stateless class.
> 

Ngoài việc thất bại trong việc mô phỏng thế giới bên ngoài qua ngôn ngữ code, Utility class còn phá vỡ hàng loạt tiêu chuẩn thiết kế như sau:
- **Dependency Injection**
    - Code to interface instead of implementation. Khi chúng ta không thể khởi tạo Utility class thì chúng ta không thể `inject(tiêm)` vào đâu được cả.
- **OSP (Open-Close Principle)**
    - Rõ ràng rồi, mở rộng thế nào khi `static method` không cho phép subclass `override` .
- **SRP (Single-Responsibility Principle)**
    - Chắc là bạn đã từng gặp trường hợp một class có tên là `StringHelper` mà bên trong có chứa những method xử lý `business logic`, `semi-related logic` như `buildUserName()` chẳng hạn.
- **High coupling**
    - Một method được sử dụng rất nhiều nơi và mỗi khi implement của method thay đổi thì sẽ gây impact lớn đến hệ thống.
- **Low cohension**
    - Bạn tạo ra một class gồm rất nhiều method không liên quan trực tiếp đến nhau hay nói cách khác là class thiếu tính gắn kết. Điều này trực tiếp làm gián đoạn quá trình phát triển. 
- **Don't repeat yourself**
    - Hả, cái gì cơ? Haha, bạn không nghe nhầm đâu, nếu một thành viên mới tham gia vào project mà trong quá trình onboarding không biết về sự tồn tại của Utility class thì việc xuất hiện một đoạn code tương tự là điều hoàn toàn dễ xảy ra.
- **Large class**
    -  Đôi lúc thật khó để giữ mình trong trước những cơn lười biếng đang xâm chiếm. Thế nên là anh mang em lên Đà Lạt và nhốt em vào Utility class 🤣🤣.
-  **Polluting source code**
    - Việc clone Utility class từ project này sang project khác xảy ra khá thường xuyên tuy nhiên rất nhiều phương thức trong số đó không được sử dụng vừa tốn thời gian compile vừa làm cho đứa con tinh thần của bạn trở nên "xấu xí".  
-  **Testing**

🤔🤔

Thế thì, tại sao Utility class lại xuất hiện phổ biến như vậy? Để tìm câu trả lời, xin mời các bạn cùng mình trả lời câu hỏi sau:
> Nếu không dùng Utility class, phần generic code sẽ phải viết ở đâu?

## 3. Solution

 Đây là một Utils class tiêu chuẩn chứa generic code của thư viện `org.apache.commons.lang3.math`:
 ```Java
 public class NumberUtils {
    public static int max(final int a, final int b) {
        return a > b ? a : b;
    }
}
 ```
 
 Khi không dùng NumberUtils class, chúng ta sẽ tái thiết lại đoạn code phía trên bằng việc tách method `max()` thành một class mới như sau:
 ```Java
 public class Max implements Number {
    private final int a;
    private final int b;
    public Max(int x, int y) {
        this.a = x;
        this.b = y;
    }
    
    @Override
    public int intValue() {
        return this.a > this.b ? this.a : this.b;
    }
}
 ```
 
Và kết quả cuối cùng:
```Java
//procedural
int max = NumberUtils.max(10, 5);

//object-oriented
int max = new Max(10, 5).intValue();
```

Ok, done. Nhưng nếu bạn vẫn thấy khó hiểu là tại sao phải tốn công như vậy khi không giải quyết được vấn đề gì đặc biệt mà kết quả trả về vẫn như nhau thì xin chia buồn với bạn, we're the same. Mình cũng không hiểu tại sao đây này 😂😂😂. Ở trường hợp này việc sử dụng Utility class tiện lợi hơn hẳn.

Vậy hãy tới ví dụ tiếp theo để cảm nhận rõ ràng sự khác biệt.
 ```Java
 void transform(File in, File out) {
    Collection<String> src = FileUtils.readLines(in, "UTF-8");
    Collection<String> dest = new ArrayList<>(src.size());
    for (String line : src) {
        dest.add(line.trim());
    }
    FileUtils.writeLines(out, dest, "UTF-8");
}
```

Bạn có thể thấy, đoạn code trên thực thi 3 nhiệm vụ, đọc tập tin, loại bỏ khoảng trắng từ dữ liệu và viết ra tập tin khác sử dụng định dạng chuyển đổi `UTF-8`. Trông có vẻ ổn nhưng sẽ như thế nào nếu bạn muốn mở rộng với phương phức này với cách xử lý dữ liệu khác và định dạng chuyển đổi bất kỳ?
Ý dời, bạn gật gù, cái này thì dễ 😂😂😂.
 ```Java
 void transform(File in, File out, String dataStrategy, String encoding) {
    Collection<String> src = FileUtils.readLines(in, encoding);
    Collection<String> dest = new ArrayList<>(src.size());
    for (String line : src) {
        if (TRIM.equalsIgnoreCase(dataStrategy)) {
            line = line.trim();
        }
        dest.add(line);
    }
    FileUtils.writeLines(out, dest, encoding);
}
```

Mọi thứ đều tuyệt vời cho đến khi bạn có hàng tá loại `dataStrategy`/`encoding` khác nhau cần implement khiến method trở nên khó đọc bởi một dãy `if/else` kéo dài liên tục thì cũng là lúc Utility class bộc lộ những giới hạn riêng của nó.
Hãy cùng mình cải tiến bằng cách tái cấu trúc sử dụng decorator pattern như sau:

```Java
//decorator pattern
void transform(File in, File out) {
    Collection<String> src = new Trimmed(
        new FileLines(new UnicodeFile(in))
    );
    Collection<String> dest = new FileLines(
        new UnicodeFile(out)
    );
    dest.addAll(src);
}

//generic improvement
void transform(File in, File out, Contructor<?> dataStrategyDecorator, Contructor<?> encodingDecorator) {
    Collection<String> src = dataStrategyDecorator.newInstance(
        new FileLines(encodingDecorator.newInstance(in))
    );
    Collection<String> dest = new FileLines(
        encodingDecorator.newInstance(in)(out)
    );
    dest.addAll(src);
}
```

That's it. Và đó cũng là lợi thế của [object-oriented programming so với procedural programming](https://www.quora.com/What-is-the-advantage-of-OOP-concept-programming-over-procedural-programming).

![image.png](https://images.viblo.asia/788fa8c8-0221-41b0-a6a3-466a56c3b6de.png)

## 4. Redesign
Qua những ví dụ trên, bạn có thể thấy, Utility class vẫn mang lại những lợi thế nhất định nhưng để giảm thiểu tối đa side-effect trong quá trình thiết kế bạn nên tuân thủ vài cái gạch đầu dòng sau đây

- ### Utility class must be fully stateless
    ```Java
    //raw
    public final class NumberUtils {
        private NumberUtils() {}
        public static int max(final int a, final int b) {
           return a > b ? a : b;
       }
    }

    //lombok
    @UtilityClass
    public class NumberUtils {
        public static int max(final int a, final int b) {
           return a > b ? a : b;
        }
    }
    ```

- ### Split utility class into smaller class contain only related method (Separation of concerns)
    ```Java
    //before
    @UtilityClass
    public class StringUtils {
        public static Date convertStringToDate(String date, String pattern) throws Exception {
            return new SimpleDateFormat(pattern).parse(date);
        }

        public static boolean hasLength(String str) {
            return (str != null && !str.isEmpty());
        }
    }


    //after
    @UtilityClass
    public class StringUtils {
        public static boolean hasLength(String str) {
            return (str != null && !str.isEmpty());
        }
    }

    @UtilityClass
    public class DateUtils {
        public static Date convertStringToDate(String date, String pattern) throws Exception {
            return new SimpleDateFormat(pattern).parse(date);
        }
    }
    ```

- ### Take care
     Trước khi thêm một method vào Utility class, hãy xem xét đến việc nó có thực sự độc lập với Object/Service không, có thể được viết lại tốt hơn bằng design-pattern không, có cần thiết phải tách ra không và tách ra như thế nào cho đúng để hạn chế gặp phải những vấn đề như [wrong abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction), [impure function](https://en.wikipedia.org/wiki/Pure_function)...
    
    ![image.png](https://images.viblo.asia/cb9a7bbd-ed4e-4c0b-85ab-d74a27c16bc1.png)

    Chúng ta sẽ nói về vấn đề này ở những bài viết sau.


## 5. Side notes
Helper class và Utility class là hai khái niệm khác nhau, tuy nhiên về cơ bản có thể dùng thay thế được.
> Utility class contains only static methods so no need to create object where helper class contains both static and non static methods so it restrict to create object.
 
 ----
 
Từ trái nghĩa với nguyên tắc`DRY` là chính là `WET`
> Stop trying to be so DRY, instead Write Everything Twice (WET)
 
 ![image.png](https://images.viblo.asia/d05459ea-7c7f-43e1-89d2-396d75588a13.png)

```
 ____________________
< Thanks for reading >
 --------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     |
```
 ## References
 1. [Helper class is evil](https://blog.itkonekt.com/2017/11/22/helper-class-is-evil-2/)
 2. [What is the best way to refactor Utility class in java (static classes)](https://stackoverflow.com/questions/30505511/what-is-the-best-way-to-refactor-utility-class-in-java-static-classes)
 3. [Cons of static utility classes in java?](https://stackoverflow.com/questions/6642096/cons-of-static-utility-classes-in-java)
 4. [Object-Oriented Design Decisions: Stateful or Stateless Classes?](https://dzone.com/articles/stateful-or-stateless-classes)
 5. [OOP Alternative to Utility Classes](https://www.yegor256.com/2014/05/05/oop-alternative-to-utility-classes.html)
 6. [LOW COUPLING VÀ HIGH COHESION LÀ GÌ?](https://edwardthienhoang.wordpress.com/2018/01/08/low-coupling-and-high-cohesion/)
 7. [Avoid Utility Classes](https://www.vojtechruzicka.com/avoid-utility-classes/)
 8. [What is the advantage of OOP concept programming over procedural programming?](https://www.quora.com/What-is-the-advantage-of-OOP-concept-programming-over-procedural-programming)
 9. [Utility and helper classes - a code smell?](https://www.jmgundersen.net/blog/utility-and-helper-classes-a-code-smell)
 10. [How to Avoid Static Helper Classes](https://www.bettercodebytes.com/how-to-avoid-static-helper-classes/)
 11. [Bạn đang hiểu sai về nguyên tắc DRY](https://linhta.dev/blog/ban-dang-hieu-sai-ve-nguyen-tac-DRY/)
 12. [Stop trying to be so DRY, instead Write Everything Twice (WET)](https://dev.to/wuz/stop-trying-to-be-so-dry-instead-write-everything-twice-wet-5g33)
 13. [DRY is about knowledge, never about code](https://verraes.net/2014/08/dry-is-about-knowledge/)