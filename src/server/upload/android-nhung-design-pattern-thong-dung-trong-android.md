## Mở đầu
Đôi khi trong quá trình phát triển phần mềm, bạn gặp phải một vấn đề mà chưa tìm được giải pháp tối ưu. Sử dụng Design Pattern có thể sẽ là giải pháp cho bạn.

Các Design Pattern là các giải pháp có thể tái sử dụng cho các vấn đề phần mềm phổ biến. Design Pattern có thể đẩy nhanh quá trình phát triển phần mềm bằng cách cung cấp một giải pháp đã được chứng minh để giải quyết các vấn đề thường gặp cho các lập trình viên.

Trong bài viết này mình xin giới thiệu một vài Pattern thường sử dụng trong Android.


-----


# Giới thiệu
Các Design Pattern có thể chia làm 3 loại:
* **Creational patterns** (Nhóm khởi tạo): Giúp khởi tạo đối tượng
* **Structural patterns**(Nhóm cấu trúc): Kết hợp các đối tượng
* **Behavioral patterns**(Nhóm hành vi): Cách giao tiếp giữa các đối tượng

Có thể bạn đã sử dụng Design Pattern nhưng không biết là mình đã sử dụng chúng. Vậy cùng tìm hiểu xem sử dụng Design Pattern trong 3 nhóm trên hư thế nào nhé.

## Creational patterns
### Builder Pattern
> Khi  muốn tạo một đối tượng phức tạp thì bạn sẽ làm như thế nào?
> 
Có thể bạn sẽ nghĩ tới cách tạo một Constructor dài ngoằng với một chục các tham số. Builder Pattern sẽ cho bạn một cách giải quyết khác.

**Builder Pattern đơn giản hóa việc tạo đối tượng theo cách rất rõ ràng và dễ đọc.** Nó phân chia việc khởi tạo(construction) tổng thể một đối tượng phức tạp ra làm nhiều phần nhỏ.

Chúng ta có thể tùy chọn các tham số là bắt buộc hoặc không và không cần quan tâ đến thứ tự của chúng như dùng Constructor.

Trong Android, Builder design pattern xuất hiện khi sử dụng những đối tượng như AlertDialog.Builder hay NotificationCompat.Builder....
```java
Notification notification = new NotificationCompat.Builder(this, "")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setLargeIcon(R.mipmap.ic_launcher)
                .setContentTitle(mTrack.getTitle())
                .build();
```
### Cách thực hiện:
Giả sử chúng ta có một lớp User: 
```java
public class User {
    private String firstName;
    private String lastName;
    private int age;
}
```
Và thay vì tạo các đối tượng của lớp này bằng cách sử dụng các Constructor, chúng ta muốn tạo chúng bằng cách sử dụng Builder Pattern:
```java
new User.Builder()
        .setFirstName("Leonardo")
        .setLastName("da Vinci")
        .setAge(67)
        .create();
```
Chúng ta làm như vậy nhủ thế nào? 

**Thứ nhất,** chúng ta cần tạo lớp Builder bên trong lớp User (static nested classes để tránh Memory leak nhé) 

```java
static class Builder {
    private String firstName;
    private String lastName;
    private int age;

    public Builder setFirstName(final String firstName) {
        this.firstName = firstName;
        return this;
    }

    public Builder setLastName(final String lastName) {
        this.lastName = lastName;
        return this;
    }

    public Builder setAge(final int age) {
        this.age = age;
        return this;
    }

    public User create() {
        return new User(this);
    }
}
```
Đối với mỗi tham số chúng ta có một setter - sự khác biệt là những phương thức đó trả về kiểu Builder. Cuối cùng chúng ta có một phương thức trả về User sử dụng Constructor của lớp User.

**Sau đó,** chúng ta cần tạo hàm tạo với tất cả các tham số là Builder
```java
public class User {
    private String firstName;
    private String lastName;
    private int age;

    private User(final Builder builder) {
        firstName = builder.firstName;
        lastName = builder.lastName;
        age = builder.age;
    }
}
```
Điều quan trọng ở đây là Constructor là private, vì vậy nó không thể được truy cập từ lớp khác và chúng ta phải sử dụng Builder để tạo đối tượng mới.

**Chú ý:**
Chúng ta có thể tùy chọn cho một số tham số là bắt buộc bằng cách sửa đổi phương thức create() của  và ném một số ngoại lệ:
```java
public User create() {
    User user = new User(firstName, lastName, age);
    if (user.firstName.isEmpty()) {
        throw new IllegalStateException(
           "First name can not be empty!");
    }
    return user;
}
```

**Chú ý nữa:**
Nếu bạn không muốn gõ tay Builder thì đừng lo Android Studio sẽ hỗ trợ bạn bằng cách tới File bạn muốn -> Generate -> Replace Constructor with Builder.


-----

## Singleton Pattern
> Singleton Design Patter chỉ định rằng sẽ chỉ tồn tại một instance duy nhất của một class nào đó trong toàn bộ chương trình.
> 

Bất kỳ lúc nào nhiều Class hoặc client yêu cầu cho class đó, chúng sẽ nhận được cùng một thể hiện của class. Trong một ứng dụng Android, có nhiều đối tượng mà chúng ta chỉ cần một instance, cho dù bạn đang sử dụng nó trực tiếp hay chỉ đơn giản là chuyển nó sang một lớp khác : OkHttpClient, HttpLoggingInterceptor, Retrofit, Gson, SharedPreferenc...
Nếu chúng ta khởi tạo nhiều hơn một trong số các loại đối tượng này, chúng ta sẽ gặp phải các vấn đề như ứng dụng không chính xác, lãng phí tài nguyên và các kết quả khó hiểu khác.

### Thực hiện: 
```java
public class ExampleSingleton {
  private static ExampleSingleton instance = null;
  private ExampleSingleton() {
    // customize if needed
  }
  public static ExampleSingleton getInstance() {
    if (instance == null) {
      instance = new ExampleSingleton();
    }
    return instance;
  }
} 
```
Trong đoạn code trên, chúng ta có một biến static để giữ một instance của lớp. Chúng ta cũng định nghĩa Constructor là private để những Class khác không thể khởi tạo được instance mới của Class Singleton.

#### Ví dụ:  Singleton với [Retrofit](https://viblo.asia/p/android-co-the-ban-chua-biet-retrofit-924lJxG0KPM)
Retrofit là một thư viện phổ biến để kết nối tới một REST Webservice bằng cách chuyển đổi API thành các interface Java.

Trong một ứng dụng Android, bạn sẽ cần instance của đối tượng Retrofit để các phần khác của ứng dụng như Activity hay Presenter có thể sử dụng nó để thực thi một request API mà không cần phải tạo một instance mới mỗi lần chúng ta cần nó. Việc tạo nhiều instance sẽ là dư thừa, lãng phí tài nguyên bộ nhớ.
```java
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
  
public class RetrofitClient {
  
    private static Retrofit retrofit = null;
  
    public static Retrofit getClient(String baseUrl) {
        if (retrofit==null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(baseUrl)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
```
Vì vậy, bất cứ lúc nào client A gọi RetrofitClient.getClient(), nó tạo ra instance mới nếu nó chưa được tạo, và sau đó khi client B gọi phương thức này, nó sẽ kiểm tra xem instance Retrofit đã tồn tại chưa. Nếu có rồi, nó trả về instance cho B thay vì tạo một instance mới.


-----

## Dependence Injection


Ứng dụng Android được tạo thành từ nhiều lớp và các lớp này cộng tác với nhau để thực hiện một số thao tác. Thêm vào đó, chúng ta tạo instance của Class A trong  Class B để thực hiện công việc mà A có thể làm. Với Dependence Injection(DI) thì instance của A sẽ được tạo ở bên ngoài B, và B nhận tham chiếu tới instance của A mà không phải tự khởi tạo nó.
```java
class A {
  B b;
  A( B b) {
     this.b = b;
  }
}
```

Ở đây lớp A có sự phụ thuộc vào lớp B. B được cung cấp cho constructor của A. Đó chính là Dependency Injection.

> Nếu một thành phần phụ thuộc vào thành phần khác, thay vì tự tạo ra sự phụ thuộc này, nó sẽ được cung cấp (được inject ) từ bên ngoài.
> 

Nó được xây dựng dựa trên khái niệm [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control)

Trong Java/Android, chỉ có ba kỹ thuật cơ bản để thực hiện DI :
* Constructor Injection
*  Method Injection 
*  Field Injection.

Lợi ích của việc sử dụng DI:

* Giảm sự phụ thuộc giữa các thành phần
* Test dễ dàng hơn
* Tái sử dụng code

Những DI Framework phổ biến cho Android như : Dagger2, RoboGuice...
### [RoboGuice](https://github.com/roboguice/roboguice)
RoboGuice sử dụng Java Annotation, được nhúng bên trong code Java, để xác định những gì đã được inject  ở đâu.

Các phiên bản trước của RoboGuice khá chậm vì sử dụng Reflection API của Java để xử lý các Annotation ở Runtime. Nhưng từ RoboGuice 3 đi kèm với RoboBlender, một bộ xử lý Annotation ở Compile time giúp cải thiện đáng kể hiệu suất của RoboGuice.

Code thông thường: 
```java
TextView textView = findViewById(R.id.textView);
```
Với RoboGuice 
```php
@InjectView(R.id.textView) TextView textView;
```
Chúng ta có thể Inject nhiểu Resource khác như:
```javascript
@InjectResource(R.string.hello) private String hello;
@InjectResource(R.color.red) private ColorStateList red;
@InjectResource(R.drawable.square) private Drawable square;
```
Để inject một instance của lớp Employee
```java 
 @Inject Employee mEmployee;	// tương đương với new Employee()
```
Bạn có thể tìm hiểu cách inject các đối tượng khác tại [đây](https://code.tutsplus.com/tutorials/dependency-injection-on-android-with-roboguice--cms-24827).


### [Dagger2](https://github.com/google/dagger)

Dagger2 là DI Framework mã nguồn mở phổ biến nhất cho Android và được phát triển với sự hợp tác giữa Google và Square.



**Một số Annotation quan trọng của Dagger 2:**

####  **@Inject**: 
 Được sử dụng theo 2 cách:
 
1. Bởi một thành phần để khai báo rằng nó muốn những phụ thuộc
2. Nói với Dagger sử dụng Constructor này để tạo đối tượng nếu bạn muốn inject  nó dưới dạng phụ thuộc. Sự inject này là đệ quy, nếu Constructor có các tham số, Dagger sẽ tìm cách để inject chúng.
    ```java
    class MyClass {
        @Inject
        A a;    // MyClass yêu cầu Dagger inject A

    }

    class A {
        @Inject       //Dagger cố gắng inject A qua Constructor(Cách dùng 2) dẫn đến Constructor của B
        A(B b) {

        }
    }
    class B {
        @Inject   //Sử dụng @Inject với Constructor của B để có thể được inject
        B() {

        }
    }
    ```
    Sự Inject sẽ tiếp tục đến khi nào sự phụ thuộc không có một Constructor nào có tham số hoặc nó đã được tảo bởi Dagger ở đâu đó.
#### @Provides và @Module
Bây giờ bạn đang tự hỏi, những trường hợp không có Constructor, như Retrofit vì nó được xây dựng bởi Builder của nó. Hoặc khi chúng ta không thể khởi tạo sự phụ thuộc, giống như một đối tượng Context. Chúng ta không thể sử dụng @Inject cho những trường hợp như vậy.

Có 2 Annotation cho trường hợp này: @Module và @Provide

* **@Provides** : Đánh dấu một phương thức với Annotation này sẽ cho Dagger biết rằng phương thức này cung cấp kiểu dữ liệu trả về.

    Ví dụ, ta có  phương thức getContext() trả về Context. Đánh dấu phương thức này với @Provides sẽ cho Dagger biết phải tìm Context ở đâu.
    
    Nhưng nếu cần inject ApplicationContext và ActivityContext làm phụ thuộc ở đâu đó. Đối với cả hai kiểu trả về sẽ là Context.
 Dagger cung cấp  @Named để đánh dấu Id cho các phương thức @Provides của bạn. Vì vậy, đối với Application Context, chẳng hạn chúng ta  sẽ sử dụng  @Named("ApplicationContext") và tương tự cho ActivityContext. 
     Chú ý là bạn phải chỉ định Id hoặc tên khi bạn yêu cầu phụ thuộc nếu bạn đã dùng nó khi cung cấp phụ thuộc.
 
   
 
 * **@Module** : Vậy ta định nghĩa phương thức @Provides ở đâu. Câu trả lời là ở @Module. Nó dùng trên một Class để nhóm các phương thức @Provides có liên quan lại với nhau.
    ```java
    class MyDatabase {
      @Inject
      MyDatabase(@Named("ApplicationContext") Context context) {
        // more code
      }
    }
    ```
    ```java
    @Module
    class ContextModule {
        Context context;

        ContextModule(Context context) {
            this.context = context;
        }

        @Provides
        @Named("ApplicationContext")
        Context getContext() {
            return context;
        }
    }
    ```
    
 **Chú ý:** Nếu có bất cứ thành phần nào mà không thể khởi tạo như Context hay ContentResolver, chúng ta sẽ yêu cầu nó ở Constructor của Module.
 
####  **@Component**

Chúng ta đã biết cách yêu cầu và cung cấp sự phụ thuộc. Giờ chúng ta sẽ cần định nghĩa thành phần để kết nối các Annotation, tức là inject phụ thuộc vào bất cứ nơi nào cần. 

Bây giờ ta sẽ tạo Component. Chúng ta phải cho nó biết phải dùng những Module nào và nơi nó cần để inject. Để cho nó biết nơi chúng ta cần inject, chúng ta định nghĩa một hàm gọi là inject() trả về void và lấy nơi cần inject làm tham số.
```java
@Component (modules={ContextModule.class})
interface MyComponent {
  void inject(MyPresenter presenter);
}
```

Nhưng đây là một interface. Vậy code được inject nằm ở đâu?

Build project lần nữa, Dagger sẽ tự tạo ra tất cả code để inject ở Compiletime. Sau khi build DaggerMyComponent sẽ được tạo ra và implement MyComponent interface. Dagger tạo ra class với "Dagger" là tiền tố trong tên class. Sự thực hiện này tạo ra các phương thức cung cấp phụ thuộc tới những nơi cần phụ thuộc đó.

Giờ chúng ta phải tìm cách cung cấp component này tới các client(nơi cần phụ thuộc). Trong trường hợp này chúng ta khai báo component là một biến static của Application class. bạn cũng có thể khởi tạo nó trong Activity, Fragment.. Sau đó, chúng ta cần khởi tạo component bằng Builder class của nó và truyền vào Module mà nó phụ thuộc.
```java
class MyApplication extends Application {
  private static MyComponent component;
  
  @Override
  void onCreate() {
    component = DaggerMyComponent.builder()
                .contextModule(new ContextModule(getApplicationContext()))
                .build();
  }
  
  public static MyComponent getMyComponent() {
    return component;
  }
}
```

Đây là Presenter yêu cầu phụ thuộc :
```java
class MyPresenter {

  @Inject 
  MyDatabase db;
  
  MyPresenter() {
     MyApplication.getMyComponent().inject(this);
  }
}
```

# Kết
Trên đây là những Design Pattern trong nhóm Creation hay sử dụng trong Android,  phần sau mình sẽ giới thiệu thêm Design Pattern ở 2 loại còn lại nhé.

Cảm ơn bạn đã đọc bài viết của mình.


-----


**Tham khảo:**

https://android.jlelse.eu/practical-guide-to-dagger-76398948a2ea

https://medium.com/@pszklarska

https://code.tutsplus.com/tutorials/dependency-injection-with-dagger-2-on-android--cms-23345