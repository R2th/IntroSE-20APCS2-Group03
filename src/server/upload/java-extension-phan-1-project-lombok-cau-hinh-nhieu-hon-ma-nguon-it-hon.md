**1. Vấn đề:** 

Khi bạn làm việc nhiều với Java, chắc hẳn bạn đã "*chán ngấy*" với việc tạo ra các getters, setters hay các constructors với các params khác nhau cho *Model class*. Điều này không chỉ làm cho mã nguồn của class đó nhiều lên, gây rối khi ta muốn kiểm tra lại các method/function chính của class đó, hoặc đơn giản chỉ là gây khó chịu khi chúng ta phải làm đi làm lại công việc insert nhàm chán đó. *(với một người lười như tớ thì đây là một điều hết sức kinh khủng ^^! )*

Với một số lí do như trên và nhiều hơn thế nữa thì Lombok ra đời giúp cho bạn loại bỏ bớt đi những đoạn mã nguồn *tẻ nhạt* đó chỉ bằng những **Anotations**. **Project Lombok** là một thư viện java tự động tích hợp vào Editor và Build tools, làm tăng tốc java cho bạn. Bằng việc sử dụng các Anotations của Lombok, bạn đã có được đầy đủ tính năng mà bạn cần!

**2. Cài đặt:**
- Để cài được Lombok cần có 2 bước: cài Lombok plugin và Lombok dependency. *(ở đây tớ sử dụng Intelij Idea là editor và Maven là công cụ quản lý dependency, các công cụ khác có thể khác biệt một chút xíuuu)*
- Bước 1: Để cài được Lombok plugin, chúng ta làm như sau: **Mở intelij idea > File > Settings > Plugins > Search Lombok và nhấn Install** hoặc **search lombok plugin trên plugin store của Intelij và cài đặt thủ công**.
- Bước 2: Cài đặt Lombok dependency, mở file **pom.xml** và thêm vào dependency của lombok:
```
<dependency>
  	<groupId>org.projectlombok</groupId>
  	<artifactId>lombok</artifactId>
  	<version>1.18.12</version>
  </dependency>
```
Sau đó các bạn **enable** lombok plugin tron idea mà các bạn sử dụng là hoàn thành!

**3. Khám phá:**

Lombok có 2 features chính là Stable và Experimental:
* Stable: là các feature chính được phát hành và hỗ trợ mạnh mẽ, nói chung là đã được kiểm nghiệm và fix bug, an tâm sử dụng.
* Experimental: nó là các features thử nghiệm, cũng có sẵn trong gói Lombok và có thể sử dụng như các Stable features, nhưng không được hỗ trợ mạnh mẽ và vẫn có khả năng phát sinh lỗi.

*(Do đó, ở bài này mình sẽ chỉ giới thiệu các Stable features nhé! Các bạn có thể đọc thêm [tại đây](https://projectlombok.org/features/all).)*

**4. Tính năng:**

* **val: tạo ra các biến final trong phạm vi local.**

Fearture **val** được giới thiệu trong lombok 0.10, bạn có thể sử dụng **val** như type của local variables mà không cần chỉ rõ kiểu tường minh của variable đó. Do **val** là **final** nên bạn phải gắn nó với một biểu thức khởi tạo và không thể thay đổi giá trị của nó.

Ví dụ:

```
// => Dùng lombok val
public class ValExample {
  public String example() {
    val example = new ArrayList<String>();
    example.add("Hello, World!");
    val foo = example.get(0);
    return foo.toLowerCase();
  }
}
  
  // => Dùng java thuần
public class ValExample {
  public String example() {
    final ArrayList<String> example = new ArrayList<String>();
    example.add("Hello, World!");
    final String foo = example.get(0);
    return foo.toLowerCase();
  }
}
```

* **var: tạo ra các biến trong phạm vi local**

Fearture **var** được sử dụng là tính năng chính từ lombok 1.16.20, nó có tác dụng giống như **val** ngoại trừ biến được khai báo không còn là **final**, do đó nó có thể thay đổi giá trị tuy nhiên **vẫn phải giữ nguyên kiểu của biểu thức khởi tạo ban đầu**.

Ví dụ:

```
var x = "Hello"; // x giờ có kiểu là String
x = 3; // fail: không hoạt động
```

* **@NonNull**

Lombok cung cấp cho chúng ta 1 anotation giúp generate một null-check statement, có dạng: `if (param == null) throw new NullPointerException("param is marked @NonNull but is null");` ở đầu tiên trong method hoặc ngay sau khi thực hiện xong **this(), super()** đối với constructor. **@NonNull** được sử dụng ở trước parameter của method hoặc constructor, đánh dấu parameter đó **không được null**, nó cũng được sử dụng trong các anotation tạo các method và constructor của Lombok: @Data, ...

Ví dụ:

```
// => dùng Lombok @NonNull
public class NonNullExample extends Something {
  private String name;
  
  public NonNullExample(@NonNull Person person) {
    super("Hello");
    this.name = person.getName();
  }
}

// dùng java tường minh
public class NonNullExample extends Something {
  private String name;
  
  public NonNullExample(@NonNull Person person) {
    super("Hello");
    if (person == null) {
      throw new NullPointerException("person is marked @NonNull but is null");
    }
    this.name = person.getName();
  }
}
```

Nếu đã tồn tại một null-check ở đầu của method, Lombok sẽ không generate thêm một null-check nào khác.

* **@Cleanup**

Bạn có thể sử dụng **@Cleanup** để chắc chắn rằng resource bạn sử dụng được dọn dẹp trước khi thoát khi ra scope mà resource được sử dụng, như là: `@Cleanup InputStream in = new FileInputStream("some/file");`. Khi đó, trước khi thoát khỏi scope, `in.close();` sẽ được gọi đến và đảm bảo thực hiện cuối cùng bằng cách đặt chúng trong một khối **try/finally**.

Ví dụ:

```
// => sử dụng lombok @Cleanup
public class CleanupExample {
  public static void main(String[] args) throws IOException {
    @Cleanup InputStream in = new FileInputStream(args[0]);
    @Cleanup OutputStream out = new FileOutputStream(args[1]);
    byte[] b = new byte[10000];
    while (true) {
      int r = in.read(b);
      if (r == -1) break;
      out.write(b, 0, r);
    }
  }
}

// sử dụng java tường minh
public class CleanupExample {
  public static void main(String[] args) throws IOException {
    InputStream in = new FileInputStream(args[0]);
    try {
      OutputStream out = new FileOutputStream(args[1]);
      try {
        byte[] b = new byte[10000];
        while (true) {
          int r = in.read(b);
          if (r == -1) break;
          out.write(b, 0, r);
        }
      } finally {
        if (out != null) {
          out.close();
        }
      }
    } finally {
      if (in != null) {
        in.close();
      }
    }
  }
}
```

Theo mặc định, lombok sẽ gọi đến method **close()** của resource được đánh dấu bởi **@Cleanup**. Nếu resource không có method **close()** nhưng lại có một method **không tham số** khác có nhiệm vụ tương tự, bạn có thể chỉ định tường minh cho lombok gọi đến chúng thay vì **close()** bằng cách thêm tên của method đó vào tham số đầu tiên của **@Cleanup**: `@Cleanup("dispose") org.eclipse.swt.widgets.CoolBar bar = new CoolBar(parent, 0);`. Ở đây, trước khi ra khỏi current scope, **bar.dispose();** sẽ được gọi.

Mặt khác, nếu resource **không có một phương thức cleanup nào không có đối số** hoặc **chứa một hoặc nhiều đối số** thì bạn **không thể sử dụng @Cleanup** trong trường hợp này.

* **@Getter/@Setter**

Bạn có thể dụng dụng 2 anotations này trước các Field để báo cho lombok tạo cho bạn **các method getter/setter mặc định tương ứng**. Bạn cũng có thể đặt chúng phía trên class, khi đó **tất cả các Field trong class sẽ được áp dụng**.

Mặc định, các method được generate sẽ có phạm vi **public** và tên được đặt theo tên của Field đó: `ví dụ field có tên là foo, getter được tạo ra là isFoo đối với kiểu boolean và getFoo với mọi kiểu còn lại.` Đối với setter sẽ trả về kiểu **void** và **chứa 1 tham số cùng kiểu với Field hiện tại**. Bạn cũng có thể chỉ định phạm vi của getter/setter được tạo ra bằng cách chỉ rõ thông qua tham số **AccessLevel**, nó sẽ nhận các access level: **PUBLIC, PROTECTED, PACKAGE, và PRIVATE**: `@Setter(AccessLevel.PROTECTED) private String name;`

Ví dụ:

```
// => dùng lombok @Getter/@Setter
public class GetterSetterExample {

  @Getter @Setter private int age = 10;

  @Setter(AccessLevel.PROTECTED) private String name;
  
  @Override public String toString() {
    return String.format("%s (age: %d)", name, age);
  }
}

// => dùng java tường minh
public class GetterSetterExample {
  private int age = 10;
  private String name;
  
  @Override public String toString() {
    return String.format("%s (age: %d)", name, age);
  }
  
  public int getAge() {
    return age;
  }
  
  public void setAge(int age) {
    this.age = age;
  }

  protected void setName(String name) {
    this.name = name;
  }
}
```

* **@ToString**

Các class được đánh dấu bởi anotation này sẽ được lombok generate một implement của **toString()** method, mặc định sẽ in ra tên class và giá trị của các field.

```
// => dùng lombok @ToString
@ToString
public class ToStringExample {
  private static final int STATIC_VAR = 10;
  private String name;
  private Shape shape = new Square(5, 10);
  private String[] tags;
  @ToString.Exclude private int id;
  
  public String getName() {
    return this.name;
  }
  
  @ToString(callSuper=true, includeFieldNames=true)
  public static class Square extends Shape {
    private final int width, height;
    
    public Square(int width, int height) {
      this.width = width;
      this.height = height;
    }
  }
}

// => dùng java tường minh
public class ToStringExample {
  private static final int STATIC_VAR = 10;
  private String name;
  private Shape shape = new Square(5, 10);
  private String[] tags;
  private int id;
  
  public String getName() {
    return this.name;
  }
  
  public static class Square extends Shape {
    private final int width, height;
    
    public Square(int width, int height) {
      this.width = width;
      this.height = height;
    }
    
    @Override public String toString() {
      return "Square(super=" + super.toString() + ", width=" + this.width + ", height=" + this.height + ")";
    }
  }
  
  @Override public String toString() {
    return "ToStringExample(" + this.getName() + ", " + this.shape + ", " + Arrays.deepToString(this.tags) + ")";
  }
}
```

Sử dụng **includeFieldNames** cho phép giá trị toString trả về có **bao gồm tên các Field hay là không**.

Theo mặc định, **@ToString** sẽ áp dụng lên **tất cả các biến non-static**, nếu bạn muốn **loại bỏ một số Field không cần thiết phải in ra**, sử dụng `@ToString.Exclude` **trước các Field đó**, mặt khác có thể đánh dấu class với `@ToString(onlyExplicitlyIncluded = true)` và sử dụng `@ToString.Include` **trước các Field bạn muốn in ra**.

Sử dụng tham số **callSuper** để cấu hình rằng giá trị `toString` được in ra có bao gồm giá trị `toString` của supper class hay không.

Bạn cũng có thể thêm giá trị trả về của **các method không tham số** vào trong giá trị `toString` được in ra bằng cách thêm `@ToString.Include` phía trên các method đó. Bạn cũng có thể thay đổi tên của các Field hoặc các method khi in ra bằng cách thêm vào trước chúng: `@ToString.Include(name = "some other name")`.

Cuối cùng, thứ tự in ra được sắp xếp mặc định theo thứ tự khai báo, bạn có thế thay đổi thứ tự này bằng cách cấu hình tham số **rank trong @ToString.Include**, thứ tự được in ra sẽ theo **rank từ cao xuống thấp**, field **không được khai báo rank sẽ có rank là 0**, **các field cùng rank sẽ được in ra theo thứ tự khai báo của chúng**.

* **@EqualsAndHashCode**

Anotation này giúp bạn dễ dàng tạo ra phần thực `hashCode` và `equals` tương ứng với các fields trong object của bạn.Khi sử dụng các collection, Để nhận được các hành vi mong muốn, chúng ta nên ghi đè các phương thức equals() và hashCode() trong các lớp của các phần tử được thêm vào collection.

**Lớp Object (lớp cha của tất cả các lớp trong Java)** định nghĩa hai phương thức **equal() và hashCode()**. Điều đó có nghĩa là tất cả các lớp trong Java (bao gồm cả các lớp bạn đã tạo) thừa kế các phương thức này. Về cơ bản, lớp Object thực hiện các phương thức này cho mục đích chung.

Tuy nhiên, bạn sẽ **phải ghi đè chúng một cách cụ thể cho các lớp có đối tượng được thêm vào các collection**, đặc biệt là các collection dựa trên **bảng băm như HashSet và HashMap** để bảo bảo không bị trùng lặp khi thêm vào.

Một số quy tắc:

```
1. Khi phương thức equals() được ghi đè, phương thức hashCode() cũng phải được ghi đè.
2. Nếu hai đối tượng bằng nhau, mã băm của chúng phải bằng nhau.
3. Nếu hai đối tượng không bằng nhau, không có ràng buộc về mã băm của chúng (mã băm của chúng có thể bằng nhau hay không).
4. Nếu hai đối tượng có mã băm giống nhau, thì không có ràng buộc nào về sự bình nhau của chúng (chúng có thể bằng nhau hay không).
5. Nếu hai đối tượng có mã băm khác nhau, chúng không được bằng nhau.
```

Nếu chúng ta vi phạm các quy tắc này, các collection sẽ hoạt động có thể không đúng như các đối tượng không thể tìm thấy, hoặc các đối tượng sai được trả về thay vì các đối tượng chính xác. Các bạn có thể đọc thêm chi tiết về [EqualsAndHashCode](https://projectlombok.org/features/EqualsAndHashCode) và [ví dụ](https://viettuts.vn/java/phuong-thuc-equals-va-hashcode-trong-java#goto-h2-3).

* **@NoArgsConstructor, @RequiredArgsConstructor, @AllArgsConstructor**

**@NoArgsConstructor** sẽ tạo ra một constructor không tham số, nếu trong các field của class có **tồn tại ít nhất 1 final field** thì compiler sẽ báo lỗi biên dịch. Để tránh lỗi này, bạn có thể sử dụng tham số **force = true**: `@NoArgsConstructor(force = true)`, khi đó các **final fields sẽ được khởi tạo với giá trị tương ứng sau đây: 0 / false / null**. Đối với các field được đánh dấu **@NonNull**, lombok sẽ không tạo null-check nào trong trường hợp này cho đến khi các field này được khởi tạo đúng cách.

**@RequiredArgsConstructor** sẽ tạo ra một constructor với một parameter tương ứng với một field yêu cầu xử lý đặc biệt, **như là các final và @NonNull fields chưa được khởi tạo** và lombok sẽ **generate các null-check cho các @NonNull fields tại đây**.

**@AllArgsConstructor** sẽ tạo ra một constructor với số parameters tương ứng với số field trong class đó và lombok sẽ **generate các null-check cho các @NonNull fields tại đây**.

**NOTE**: mỗi anotation trong số 3 cái trên đều có một parameter là **staticName = "special_name"**, khi sử dụng tham số này, các constructors được tạo ra sẽ là **PRIVATE** và một **static constructor sẽ được tạo thêm với tên là special_name (tùy theo người dùng cấu hình).** như là: `@RequiredArgsConstructor(staticName="of")`

Ví dụ:

```
// => dùng lombok
@RequiredArgsConstructor(staticName = "of")
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ConstructorExample<T> {
  private int x, y;
  @NonNull private T description;
  
  @NoArgsConstructor
  public static class NoArgsExample {
    @NonNull private String field;
  }
}

// dùng java tường minh
public class ConstructorExample<T> {
  private int x, y;
  @NonNull private T description;
  
  private ConstructorExample(T description) {
    if (description == null) throw new NullPointerException("description");
    this.description = description;
  }
  
  public static <T> ConstructorExample<T> of(T description) {
    return new ConstructorExample<T>(description);
  }
  
  @java.beans.ConstructorProperties({"x", "y", "description"})
  protected ConstructorExample(int x, int y, T description) {
    if (description == null) throw new NullPointerException("description");
    this.x = x;
    this.y = y;
    this.description = description;
  }
  
  public static class NoArgsExample {
    @NonNull private String field;
    
    public NoArgsExample() {
    }
  }
}
```

* **@Data**

**@Data là một chú thích phím tắt tiện lợi kết hợp các tính năng của @ToString, @EqualsAndHashCode, @Getter, @Setter và @RequiredArgsConstructor lại với nhau.** *Tuy nhiên, các thông số của các chú thích này (chẳng hạn như **callSuper**, **includeFieldNames** và **exclude**) không thể được đặt bằng @Data. Nếu bạn cần đặt giá trị không phải mặc định cho bất kỳ tham số nào trong số này, chỉ cần thêm các chú thích đó một cách rõ ràng; **@Data** đủ thông minh để nhận biết các chú thích đó.*

* **@Value**

**@Value là một biến thể của @Data, có chức năng tạo các imutable class**, nó có các chức năng giống hệt với **@Data**, ngoại trừ class đánh dấu bằng **@Value** và các field trong nó **sẽ là final**.

Thực tế, **@Value** là viết tắt của: `final @ToString @EqualsAndHashCode @AllArgsConstructor @FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE) @Getter`, khi bạn khai báo một phương thức tường mình trong số các phương thức trên thì lombok chỉ đơn giản không tạo ra phương thức đó của **@Value** nữa, dù là khác chữ ký hay không. Nếu cả **@Value và @Builder cùng được sử dụng trên class**, phương thức `private allargs của Builder` sẽ được sử dụng thay vì `public allargs của Value`, bạn có thể loại bỏ các phương thức hoặc constructor với `@lombok.experimental.Tolerate` để ẩn chúng khỏi lombok.

Bạn có thể sử dụng **@NonFilnal hoặc @PackagePrivate để loại bỏ final hoặc private mặc định.** **@NonFinal** cũng có thể dùng trên class để loại bỏ **chỉ final của class đó**.

* **@Builder**

Lombok cung cấp anotation **@Builder** đặt trên class giúp bạn áp dụng **Builder pattern** chỉ với 1 anotation mà không cần thêm nhiều mã nguồn, bạn đọc có thể xem chi tiết [tại đây](https://projectlombok.org/features/Builder).

* **@Synchronized**

**@Synchronized được sử dụng với mục đích giống như synchronized, được đặt trên các static và instance method.** Điều khác biệt duy nhất là **synchronized được khóa trên đối tượng this, còn @Synchronized thì khóa trên các đối tượng private $lock (sẽ là $LOCK đối với static method)**, nếu các đối tượng **lock** này bạn chưa tạo sẵn thì lombok sẽ được tạo cho bạn.

Ví dụ:

```
// => dùng lombok @Synchronized
public class SynchronizedExample {
  private final Object readLock = new Object();
  
  @Synchronized
  public static void hello() {
    System.out.println("world");
  }
  
  @Synchronized
  public int answerToLife() {
    return 42;
  }
  
  @Synchronized("readLock")
  public void foo() {
    System.out.println("bar");
  }
}

// => dùng java tường minh
public class SynchronizedExample {
  private static final Object $LOCK = new Object[0];
  private final Object $lock = new Object[0];
  private final Object readLock = new Object();
  
  public static void hello() {
    synchronized($LOCK) {
      System.out.println("world");
    }
  }
  
  public int answerToLife() {
    synchronized($lock) {
      return 42;
    }
  }
  
  public void foo() {
    synchronized(readLock) {
      System.out.println("bar");
    }
  }
}
```

* **@Log**

Lombok cung cấp cho bạn anotation này với rất nhiều loại log khác nhau, chi tiết từng loại bạn có thể xem [tại đây](https://projectlombok.org/features/log).