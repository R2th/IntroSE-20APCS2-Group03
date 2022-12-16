Trong bài viết lần này, chúng ta sẽ cùng nhau tìm hiểu về cách tạo hoặc hủy một `object` trong Java. Có rất nhiều cách để khởi tạo một đối tượng, tuy nhiên chúng ta cần biết khi nào nên sử dụng cách nào cho phù hợp và tối ưu nhất nhé :D

### Cách 1: Consider static factory methods instead of constructors
Một cách thông thường chúng ta có thể tạo một `instance` thông qua `constructor` của class. Tuy nhiên `class` cũng có thể cung cấp một `public static factory method` để `return` một `instance` của class. Chúng ta có thể lấy ví dụ từ class `Boolean` (một wrapper của kiểu nguyên thủy `boolean`). 

```java
public static Boolean valueOf(boolean b) {
    return b ? Boolean.TRUE : Boolean.FALSE;
}
```

Chú ý, một `static factory method` không giống như `Factory Method Pattern` trong Design Patterns. 

Cách khởi tạo một `instance` như trên có cả ưu lần nhược điểm.

**Ưu điểm đầu tiên của static factory methods, chính là nó có tên rõ ràng.** Nếu tham số của constructor không mô tả được đối tượng mà nó sẽ `return` thì static factory là một lựa chọn tốt hơn để thay thế. Ví dụ, class `BigInteger` có một constructor là `BigInteger(int, int, Random)`, hàm này sẽ tạo ra một số nguyên tố, tuy nhiên nếu sử dụng hàm constructor này, chúng ta sẽ rất khó hiểu được. Do đó, một cách thay thế, chúng ta sẽ sử dụng một static factory method `BigInteger.probablePrime`. 

Một class có thể chỉ có duy nhất một `constructor` với một tham số đầu vào. Nhiều lập trình viên đã dùng  cách là tạo thêm constructor với các chữ ký (tham số) khác nhau. Tuy nhiên đây là một cách không tốt. Người dùng class này sẽ không thể nhớ được các constructor mà class cung cấp, có thế họ sẽ bị nhầm lẫn khi sử dụng. Nói cách khác là chúng ta cũng sẽ không hiểu mục đích của constructor này là tạo ra instance như nào nếu chúng không có tài liệu mô tả rõ ràng.

Với static factory method thì lại khác, vì chúng có tên rõ ràng, nên người dùng class sẽ dễ dàng hơn trong việc sử dụng. Tuy nhiên thay vì phải tạo nhiều constructor với các tham số khác nhau, thì chúng ta cần đặt tên method một cách rõ ràng và cẩn thận nhé :D

**Ưu điểm thứ hai chính là static fatory method không nhất thiết phải tạo ra một object mới.**  Điều này cho phép sử dụng các đối tượng có sẵn của class, như vậy chúng ta sẽ tránh được việc tạo ra các object trùng lặp và không cần thiết. Ví dụ `Boolean.valueOf(boolean)` sẽ không bao giờ tạo ra một object mới. Kỹ thuật này tương tự với `Flyweight pattern`. Nó có thể nâng cao hiệu năng hơn nếu đối tượng được yêu cầu sử dụng thường xuyên, đặc biệt đối với trường hợp khởi tạo đối tượng mang nhiều thuộc tính và phương thức.

Khả năng của `static factory method` là trả về cùng một đối tượng khi được gọi sẽ khiến cho việc bảo trì và điều khiển các instance được dễ dàng hơn. Đây cũng có một phần tương tự như SIngleton với mục đích tạo ra một class không thể thay đổi, chỉ có một thể hiện duy nhất. 

**Ưu điểm thứ ba là static factory method có thể return một object có kiểu là subtype của return type của nó.** Đây là một cách làm tăng tính khả chuyển để tạo ra một objects của class mà không nhất thiết phải sử dụng `public constructor`.  Việc ẩn đi sự thực thi một class sẽ khiến cho class trở nên gọn nhẹ hơn. 

Trước Java 8, interfaces không có static methods. Bởi theo quy ước, static factory method for một interface được đặt tên là `Typed` lại được đặt trong một class kiểu `không thể tạo instance` là `Types`. Ví dụ chính là Java Collections Framework có đến 45 utilities được kế thừa từ chính interfaces của nó, tương tự như các collections không thế thay đổi. 

**Ưu điểm thứ 4 là static factory method có thể return các đối tượng một cách đa dạng dựa vào tham số.** Bất kể kiểu con nào của return type đều được cho phép return. Một ví dụ chính là `EnumSet` class. Class này không có `puclic constructor`, chỉ có static factories. Trong OpenJDK, nó trả về một instance của một trong 2 subclass, phụ thuộc vào kích thước của enum type: nếu nó có 64 phần tử hoặc ít hơn, thì static method sẽ trả về instance của `RegularEnumSet`; trường hợp enum type nó có 65 phần tử hoặc nhiều hơn thì factory sẽ trả về `JumboEnumSet` instance. Sự tồn tài hai subclass này là hiển thị cho người dùng, người dùng ko cần quan tâm đến điều này :D

Trên đây là 4 ưu điểm của việc sử dụng static factory method, tuy nhiên nó cũng có một số nhược điểm.

**Nhược điểm thứ nhất chính là đối với các lớp không có public hoặc protected constructor thì không thể cung cấp các static factory method ở các lớp con**. Ví dụ như trường hợp của Collections Java API, nó khuyến khích người dùng sử dụng các method có sẵn thay vì kế thừa và viết lại phương thức. Nói cách khác chính là không cũng cấp các static factory method. 

**Nhược điểm thứ hai chính là lập trình viên như chúng ta khó có thể tìm thấy các factory method.**  Chúng ta sẽ khó khăn hơn trong việc tìm một static factory method thay thế cho constructor phù hợp nhất. Tuy nhiên thông thường sẽ có một số từ khóa gợi ý cho chúng ta dễ tìm kiếm, ví dụ

- from: sẽ nhận một single param và trả về một instance của lớp đang xét. Ví dụ
```java
Date d = Date.from(instant);
```
- of: nhận nhiều tham số và trả về một instance với kiểu kết hợp với lớp đang xét. Ví dụ
```java
Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING);
```
-  valueOf
```java
BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);
```
-  instance hoặc getInstance
```java
StackWalker luke = StackWalker.getInstance(options);
```
-  create hoặc newInstance hoặc makeInstance
```java
Object newArray = Array.newInstance(classObject, arrayLen);
```
-  getType
```java
FileStore fs = Files.getFileStore(path);
```
-  newType
```java
 BufferedReader br = Files.newBufferedReader(path);
 ```
-  type
```java
List<Complaint> litany = Collections.list(legacyLitany);
```

#### Tổng kết
Static factory method và public constructor là hai kỹ thuật mà chúng ta đều sử dụng cả lúc dùng API cũng như lúc xây dựng class. Trong bài viết này cũng đã nêu rõ một số ưu nhược điểm của chúng. Hy vọng chúng ta sẽ hiểu rõ hơn về static factory method. Ở phần tiếp theo, chúng ta sẽ tiếp tục với `builder`, một cách tạo instance cũng khá thú vị :D

#### Cảm ơn các bạn đã đọc bài viết. Happy coding!