# Lời nói đầu

Hôm nay mình sẽ chia sẻ về một bài toán rất cơ bản và kinh điển trong Java: bài toán so sánh. Đây là bài toàn mà ai cũng từng gặp phải. Trước đây mình nghĩ, so sánh hai đối tượng trong Java, đơn giản và dễ dàng. Nhưng khi tiếp xúc nhiều với các bài toán thực tế, nó không còn dễ như trong suy nghĩ nữa. Bởi vậy mình viết bài chia sẻ này với hi vọng sẽ giúp cho các bạn Java newbie sẽ có cái nhìn tốt hơn về bài toán so sánh đối tượng trong Java. Bài viết sẽ đưa ra các ví dụ từ đơn giản đến phức tạp và cách giải quyết đối với từng trường hợp. Từ đó nâng cao technical và giúp bạn làm việc hiệu quả hơn khi gặp bài toán so sánh.

# Một số khái niệm

Trước khi đến với bài toán so sánh, mình sẽ giới thệu lại một số khái niệm cơ bản trong Java. Đây là các khái niệm mình sẽ dùng để phân tích trong các ví dụ ở phần tiếp theo của bài viết.

## Kiểu dữ liệu
Đây là kiến thức cơ bản nhất cần phải nắm bắt khi làm việc với Java cũng như mọi ngôn ngữ lập trình khác. Tất cả giải thuật đều xây dựng trên cấu trúc dữ liệu. Và bài toán so sánh cũng vậy, trước tiên bạn phải nắm được đối tượng cần so sánh là kiểu dữ liệu gì.
Có hai kiểu dữ liệu có sẵn trong Java: *kiểu nguyên thủy* và *kiểu tham chiếu*

* Các kiểu dữ liệu gốc hay kiểu dữ liệu nguyên thủy (Primitive Type): Java cung cấp 8 kiểu dữ liệu nguyên thủy

    | Kiểu dữ liệu | Giá trị mặc định | Kích cỡ mặc định |
    | -------- | -------- | -------- |
    | boolean     | false     | 1 bit     |
    char     | '\u0000'     | 2 byte     | 
    byte     | 0     | 1 byte     | 
    short     | 0     | 2 byte     | 
    int     | 0     | 4 byte     | 
    long     | 0L     | 8 byte     | 
    float     | 0.0f     | 4 byte     | 
    double     | 0.0d     | 8 byte     | 

![](https://images.viblo.asia/6109449f-eb88-4002-840c-e23352f37111.jpg)

* Các kiểu dữ liệu tham chiếu hay kiểu đối tượng (Reference type / Non-primitive Type): các kiểu dữ liệu ngoài 8 kiểu trên và tất cả đều được mở rộng từ Object. Kiểu dữ liệu tham chiếu được chia thành 2 loại là:
    * Framwork định nghĩa: Những đối tượng này được tạo sẵn và công việc của chúng ta chỉ việc gọi lên và sử dụng chúng
    * Do người dùng định nghĩa: Chính là những class được chúng ta define

Một số điểm cần lưu ý đối với kiểu dữ liệu:
* String là kiểu tham chiếu, không phải kiểu nguyên thủy. Bạn có thể thấy nó không nằm trong 8 kiểu dữ liệu nguyên thủy của Java.
* Java xây dựng các lớp Wrapper cho mỗi kiểu dữ liệu gốc. Lớp Wrapper trong java cung cấp cơ chế để chuyển đổi kiểu dữ liệu nguyên thủy thành kiểu đối tượng và ngược lại từ đối tượng thành kiểu dữ liệu nguyên thủy (autoboxing và unboxing).

    | Kiểu gốc | Lớp Wrapper | 
    | -------- | -------- |
    boolean     | Boolean     | 
    char     | Character     | 
    byte     | Byte     | 
    short     | Short     | 
    int     | Integer     | 
    long     | Long     | 
    float     | Float     | 
    double     | Double     | 

Ưu điểm lớn nhất của các lớp Wrapper là cho phép các đối tượng kiểu nguyên thủy chuyển thành kiểu tham chiếu, từ đó các đối tượng có thể nhận giá trị null và giúp dễ dàng phát hiện lỗi hơn khi thao tác nhầm lẫn.

## Bộ nhớ Heap và Stack
Tiếp theo là về kiến thức lưu trữ các đối tượng. Ứng với từng kiểu dữ liệu tất nhiên sẽ có sự lưu trữ khác nhau. Việc so sánh hai đối tượng tất nhiên sẽ phải dựa trên các giá trị đã được lưu trữ trong bộ nhớ. Vậy bộ nhớ trong Java có gì.

Khi khởi chạy một chương trình Java, JVM (Java Virtual Machine) sẽ request hệ điều hành cung cấp một vùng nhớ trong RAM để thực thi chương trình. Vùng nhớ này sẽ được chia thành 2 phần chính là Heap và Stack.

**Bộ nhớ Stack:**
* Là một vùng nhớ được sử dụng để lưu trữ các tham số và các biến local của phương thức mỗi khi một phương thức được gọi ra.
* Stack memory được sử dụng cho quá trình thực thi của mỗi thread.
* Stack memory bao gồm các giá trị cụ thể của method: các biến local và các tham chiếu tới các đối tượng chứa ở trong heap memory được tham chiếu bởi method.
* Stack memory được tham chiếu theo thứ tự LIFO (Last In First Out – vào cuối cùng thì ra đầu tiên). Tức là lưu trữ kiểu ngăn xếp (stack). Khi có một method được thực thi, một block được tạo ra trong stack memory để chứa các biến nguyên thủy local và các tham chiếu tới các object. Khi method kết thúc, block đó sẽ không còn được sử dụng và được phục vụ cho method tiếp theo.
* Stack memory có kích thước rất nhỏ so với Heap memory.

**Bộ nhớ Heap**
* Heap memory là bộ nhớ được sử dụng bởi Java Runtime để cấp phát bộ nhớ cho các đối tượng (object) và String.
* Bất kỳ khi nào có một đối tượng được tạo, nó sẽ được tạo lưu ở bộ nhớ Heap.
* Bộ dọn rác (Garbage Collection) chạy trên heap memory để giải phóng bộ nhớ được sử dụng bởi các đối tượng có bất kỳ tham chiếu nào.

Ví dụ về lưu trữ trong bộ nhớ Stack và Heap
![](https://images.viblo.asia/f4dcb853-a57f-412e-97c2-b5ef589d355c.jpg)

* Dòng thứ 1: khi khai báo int i = 4 nó sẽ đưa i = 4 vào stack
* Dòng thứ 2: khi khai báo y = 2 nó sẽ đưa y = 2 vào stack (xếp trên i = 4)
* Dòng thứ 3: khi khai báo class1 cls1 = new class1(): đây là kiểu đối tượng nên nó sẽ tạo đối tượng cls1 trong heap đồng thời chứa tham chiếu của đối tượng cls1 vào stack (xếp trên cùng trong stack). 
* Sau khi kết thúc method, bộ nhớ trong stack được giải phóng, còn bộ nhớ trong heap thì chưa. Bộ nhớ trong heap phải chờ cho tới khi garbage collector (bộ dọn rác) của Java quét qua để giải phóng.

**Một số điểm cần lưu ý với bộ nhớ head và bộ nhớ stack**

Ở ví dụ trên, nếu ta thêm một biến `int z = y` thì bộ nhớ stack sẽ tạo thêm một biến `z = 2`
Còn nếu ta thêm class `cls 2 = cls 1` thì lúc nào trong bộ nhớ stack sẽ tạo ra đối tượng cls và sẽ tham chiếu đến đối tượng cls trong heap chứ không tạo thêm đối tượng ở heap

# Các bài toán về so sánh
## Bài toán cơ bản level 1
Ở phần 1 này, chúng ta sẽ bắt đầu bằng bài toán cơ bản nhất và nâng độ khó lên từng chút một. Đầu tiên là  so sánh hai biến thuộc kiểu nguyên thủy. Rất đơn giản, chỉ cần dùng toán tử == để so sánh.

```java
    int x = 1;
    int y = 2;
    int z = 2;
    System.out.println(x == y); // false
    System.out.println(y == z); // true
```

Khi so sánh kiểu nguyên thủy bằng toán tử ==, việc so sánh sẽ dựa vào giá trị lưu ở bộ nhớ stack để cho ra kết quả. 
Khó hơn chút nữa. So sánh kiểu nguyên thủy với kiếu tham chiếu. Ví dụ, chúng ta có các biến sau:

```c
    int x = 1;
    Integer a = 1;
    int y = 128;
    Integer b = 128;
```

Bạn hãy thử trả lời kết quả của những lệnh sau:

```java
    System.out.println("x == a: " + (x == a)); (1)
    System.out.println("y == b: " + (y == b)); (2)
```

Cả 2 trường hợp đều cho kết quả là true,có thể các bạn cần chưa đến 2 giây để trả lời nhỉ :D tuy nhiên hãy cứ xem phần giải thích một chút nhé.

Đối tượng a và b thuộc lớp Wrapper được khởi tạo từ giá trị nguyên thủy. Việc này hoàn toàn không xảy ra lỗi nhờ cơ chế autoboxing – cơ chế chuyển đổi tự động từ kiểu nguyên thủy sang lớp Wrapper tương ứng được xử lý bởi Java Compiler. Và khi so sánh kiểu nguyên thủy và kiểu đối tượng tham chiếu thuộc lớp Wrapper tương ứng, thì đối thượng thuộc lớp Wrapper sẽ bị unboxing, tự động chuyển về lại kiểu nguyên thủy (ngược lại với autoboxing). Việc so sánh trở thành so sánh 2 giá trị nguyên thủy với nhau nên kết quả sẽ là true ở cả hai trường hợp.

Như bạn đã biết, đối với kiểu tham chiếu, có thể tạo ra đối tượng bằng toán tử new. Vậy với trường hợp sau kết quả sẽ như thế nào?

```java
    int x = 1;
    Integer a = new Integer(1);
    System.out.println("x == a: " + (x == a));
```

Kết quả vẫn là true. Mặc dù a không được tạo từ autoboxing, nhưng cơ chế unboxing vẫn được thực hiện khi so sánh x với a. Nhiều bạn mới tiếp xúc với Java thường hay có nhận thức sai lầm là phải autoboxing thì mới unboxing được. Vậy nên, hãy bỏ suy nghĩ đó đi nhé.

Tiếp tục nâng độ khó, chúng ta đến với trường hợp bên dưới, so sánh hai đối tượng kiểu tham chiếu thuộc lớp Wrapper

```rust
    Integer c = new Integer(1);
    Integer d = new Integer(1);
    System.out.println("c == d: " + (c == d)); 
```

Có thể nhận thấy c và d thì được tạo thông qua toán tử new và có giá trị là 1. Vậy là nó bằng nhau. Khoan đã nào, đừng vội vàng như vậy. Vì với từ khóa new, nó sẽ tạo ra đối tượng riêng biệt, hoàn toàn mới. c và d là hai đối tượng hoàn toàn khác nhau nên khi sử dụng toán tử == kết quả sẽ trả về false. 

Nguyên nhân là với kiểu tham chiếu, toán tử == sẽ so sánh vị trí trên bộ nhớ mà chúng trỏ tới. Nếu cùng vị trí là bằng nhau, khác vị trí là khác nhau. 
Để cho dễ nắm, hãy hình dung bộ nhớ stack đang lưu trữ c và d như sau:
* d = abcxyz gì đó mô tả địa chỉ cụ thể giá trị của d trong heap
* c = zyxcbz gì đó mô tả địa chỉ cụ thể giá trị của c trong heap
và khi so sánh bằng toán tử ==, nó sẽ so sánh abcxyz có giống với zyxcbz hay không. Rõ ràng là khác nhau rồi nhé.

Với kiểu tham chiếu, nếu chúng ta muốn kết quả true khi so sánh hai đối tượng có cùng giá trị như c và d thì hãy dùng phương thức equals. Đây là phương thức có sẵn của lớp Object, mà Object là cha của kiểu tham chiếu nên đối tượng nào thuộc kiểu tham chiếu đều có thể sử dụng được phương thức này:

`System.out.println("c equals d: " + (c.equals(d))); // c equals d: true`

Mặc định, phương thức equals sẽ so sánh giá trị cụ thể của đối tượng chứ không so sánh vị trí trên vùng nhớ. Nên khi so sánh giá trị của c với d, kết quả sẽ là true. Ở đây mình nói là mặc định, vì lập trình hướng đối tượng có tính đa hình và chúng ta hoàn toàn có thể sửa đổi phương thức equals theo cách mà chúng ta muốn. Việc chỉnh sửa lại phương thức equals nhằm phục vụ cho các bài toán so sánh phức tạp hơn và tất nhiên là mình sẽ đề cập đến ở phần sau.

## Bài toán cơ bản level 2

Với các kiến thức trên thì các bạn cũng đã có cách giải quyết các bài toán so sánh cơ bản trong Java. Tuy nhiên đấy là mức cơ bản nhất và hầu hết mọi người đều biết, nên sẽ không dừng lại ở mức này. Vậy chúng ta đến với bài toán sau.

```objectivec
    Integer a = 1;
    Integer b = 1;
    Integer c = 128;

Integer d = 128;
// Biết dòng lệnh sau cho kết quả true
System.out.println("a == b: " + (a == b));
// Vậy hãy cho kết kết quả của câu lệnh sau
System.out.println("c == d: " + (c == d));
```

Cơ bản và đơn giản. Kết quả của đoạn lệnh trên là False. Bạn có giải thích được vì sao  không?

Có thể nhận thấy, cả 4 đối tượng đều tạo ra bằng Autoboxing và sẽ lưu trữ giá trị ở heap. Tuy nhiên vùng nhớ dùng để lưu trữ dữ liệu xử lý bởi Autoboxing có sự khác biệt giữa các giá trị. Với kết quả thì có thể đoán được, vùng nhớ của a và b là giống nhau và của c và d là khác nhau (vì toán tử == khi so sánh kiểu tham chiếu sẽ so sánh vùng nhớ). 

Giải thích cho việc này, JVM tạo ra một vùng nhớ đặc biệt ở heap (gọi là caches) để lưu các giá trị được tạo bởi Autoboxing cho từng kiểu Wraper. Đối với kiểu Integer thì caches sẽ lưu các giá trị trong khoảng từ “-128” đến “+127”. Khi autoboxing một đối tượng trong khoảng này (chẳng hạn như Integer a = 1), nó sẽ tạo ra đối tượng tương ứng với giá trị 1 trong vùng nhớ caches và tạo tham chiếu địa chỉ vùng nhớ đối tượng đó vào x. Khi tiếp tục autoboxing mội đối tượng khác cũng có gia trị là 1 (Integer b = 1), lúc này JVM sẽ không tạo ra đối tượng tương ứng trong heap mà sẽ tạo tham chiếu địa chỉ của giá trị 1 đã tạo trước đó vào b. Như vậy, cả a và b đều có cùng một địa chỉ vùng nhớ và sẽ cho kết quả true khi so sánh bằng toán tử ==. Còn với những đối tượng ngoài khoảng “-128” đến “+127” thì JVM sẽ tạo đối tượng ngoài vùng nhớ caches và sẽ tạo ra sự khác biệt về địa chỉ vùng nhớ. Đó là nguyên nhân mà c == d lại cho kết quả false.

Một trường hợp khác, chúng ta đến với kiểu dữ liệu tham chiếu kinh điển trong Java, lớp String. Như đã nói ở trên String không phải là kiểu nguyên thủy mà là kiểu tham chiếu. Nhưng xét về bản chất, nó có thể được coi là sự lai trộn giữa kiểu nguyên thủy và kiểu tham chiếu. Điều này tạo ra khá nhiều rắc rối khi làm việc với lớp String. Chính vì thế mà nó cũng là kiểu dữ liệu bị ghét nhất nhì đối với người mới học Java. Mình cũng đã lên kế hoạch viết về làm việc hiệu quả với String trong Serie Java cho newbie. Khi nào có mình sẽ link trong bài biết này tại đây nhé. 

Lớp String cũng tương tự lớp Wrapper, cũng có 2 cách tạo là sử dụng string literal (tương tự như autoboxing từ kiểu nguyên thủy) và dùng toán tử new.

```python
    String s1 = "welcome";  
    String s2 = "welcome";
    System.out.print("s1 == s2: " + (s1 == s2));
```

Ở case trên s1 và s2 được tạo bằng string literal, khi so sánh bằng toán tử == kết quả sẽ là true. Nguyên nhân thì tương tự việc autoboxing, khi tạo bằng string literal, thì giá trị của string literal sẽ được đưa vào string pool trong heap (tương tự caches). 

![](https://images.viblo.asia/f01e7c2a-d425-4571-86c9-25e9eb46bb16.jpg)

Bạn có thể dễ dàng nhận thấy qua hình ảnh minh họa ở trên nhỉ. Còn với trường hợp toán tử new, nó sẽ tạo ra hai đối tượng khác biệt và bạn phải dùng phương thức equals để so sánh một cách chính xác hơn.

# Lời kết
Qua bài viết này, mình mong các bạn nắm lại những kiến thức cơ bản nhất trong Java cũng như có cái nhìn cao hơn về các bài toán cơ bản. Mặc dù nó chỉ là các ví dụ đơn giản nhưng có lẽ bạn sẽ gặp những điều này khi đi phỏng vấn ở mọi trình độ. Ở phần tiếp theo, mình sẽ đưa ra các bài toán phức tạp hơn 1 tí xíu như so sánh đối tượng là kiểu tham chiếu tự định nghĩa, so sánh hai Collection...

Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót.  Rất mong các bạn có thể góp ý thêm.

Và lời cuối cùng, các bạn hãy thử cho biết kết quả và giải thích thử ví dụ sau nhé:

```javascript
    Integer x = 1;
    Integer a = new Integer(1);
    System.out.println("x == a: " + (x == a));
```