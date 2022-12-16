# I. Giới thiệu
  Đầu tiên trước khi đọc bài viết này chắc bạn cũng đã biết về khái niệm về dependency injection. Thì bài viết hôm nay mình sẽ đi thẳng vào vấn đề làm sao để sử dụng nó trong các dự án Android. Bắt đầu nhé!.

  Dagger 2 là một khung công tác tiêm phụ thuộc cho Android và Java được phát triển bởi Google. Trong hướng dẫn này, chúng ta sẽ từng bước tìm hiểu cách sử dụng Dagger 2 và lý do tại sao chúng ta cần nó.
![Class A đang phụ thuộc vào class B và class B là phụ thuộc của A](https://images.viblo.asia/ab39089f-817f-48ed-ab7d-042d9a006e4b.PNG)

Để sử dụng Dagger trong dự án của bạn, hãy thêm các phần phụ thuộc này vào ứng dụng trong build.gradle tệp của bạn
```Java
dependencies {
    implementation 'com.google.dagger:dagger:2.x'
    annotationProcessor 'com.google.dagger:dagger-compiler:2.x'
}
```
# II. Thực hiện bài toán
## 1. Component, Phương thức Provision& Phương thức khởi tạo tiêm phụ thuộc
Ta sẽ cùng nhau đi vào ví dụ sau:
![](https://images.viblo.asia/656536ef-1b7e-48bf-a452-ba090934f413.PNG)
Đây là sơ đồ nhà máy ta sẽ cũng nhau xây dựng để hiểu được cách thức mà dagger 2 đã làm: 
Ta thấy: <br>
`Car` -> phụ thuộc vào `Engine`, `Wheels`.<br>
`Engine` -> `Block`, `Cylinders`, `SparkPlugs` <br>
`Wheels` -> `Tires`, `Rims`

Đầu tiên ta sẽ cùng nhau xây dựng class `Car` với phụ thuộc của nó
```Java
public class Car {
    private static final String TAG = "Car";
    private Engine engine;
    private Wheels wheels;
    
    @Inject 
    public Car(Engine engine, Wheels wheels) {
        this.engine = engine;
        this.wheels = wheels;
    }
    public void drive() {
        Log.d(TAG, "driving..."); 
    }
}
```
Thêm @Inject để tạo ra một đối tượng `Car` mà ta ko cần phải tạo chúng bằng toán tử new nữa<br>
Sau đó ta sẽ tạo ra phần xưởng sản xuất xe của nó đó chính là @Component 
```Java
@Component // Đây là nơi sẽ bảo gồm các phương thức để tạo ra các thể hiện tương ứng
public interface CarComponent {
    Car getCar(); 
}
```
  Là nơi sẽ bảo gồm các phương thức để tạo ra các thể hiện tương ứng mà ta đã sử dụng @Inject<br>
=> Phương thức getCar() sẽ tạo ra 1 thể hiện Car trước đó đã được khai báo @InJect cho constuctor của nó giúp @Component có thể tạo ra các thể hiện của nó
 <Khi ta run app vẫn có lỗi xảy ra bạn biết tại sao ko> 
Vì trong contrustor của Car lại phụ thuộc vào 2 tham số khác vì vậy ta cũng cần tiêm phụ thuộc cho chúng


Tương tự ta có class `Wheels`, `Engine`
```Java
public class Engine {
    @Inject
    public Engine() {
    }
}
```

```Java
public class Wheels {
    @Inject
    public Wheels() {
    }
}
```
Khi bạn rebuild lại sẽ có thêm lớp Dagger+ClassName được tạo ra.<br>
-> Dễ hiểu đúng ko bạn. Giờ làm sao để sử dụng chúng 
Trong OnCreate Activity ta chỉ cần thực hiện như sau: 
```Java
CarComponent component = DaggerCarComponent.create();
        car = component.getCar(); // Thể hiện của class Car được tạo ra mà ta không cần tạo ra các phụ thuộc của nó
        car.drive();
```

## 2. Thuộc tính tiêm phụ thuộc
  Chúng ta sẽ học cách thực hiện tiêm trường. Bằng cách chú thích một biến thành viên không riêng tư, không phải là thành viên cuối cùng với @Inject, chúng tôi yêu cầu Dagger đặt giá trị của nó bằng cách tham chiếu trực tiếp đến nó.<br>
  Field injection chủ yếu được sử dụng để đưa các biến vào các loại khuôn khổ Android mà hệ thống khởi tạo và trên đó chúng ta không thể thực hiện chèn hàm tạo, như các hoạt động, BroadcastReceivers và các mảnh.<br>
  Để kích hoạt quá trình tiêm vào một đối tượng đã được khởi tạo sẵn (như một hoạt động), chúng ta phải tạo và gọi một phương thức tiêm vào thành viên trong thành phần của chúng ta để lấy lớp cụ thể này làm đối số.<br>

Trong `MainActivity` ta thêm biến sau:<br>
```Java
@Inject Car car; //Yêu cầu nó phải là public nhé.
```

Trong `CarCompent` ta thêm phương thức truyền vào class với thuộc tính cần tạo.
```Java
@Component
public interface CarComponent {
    Car getCar();
    void inject(MainActivity mainActivity);
}
```

Trong onCreate rất đơn giản ta chỉ cần thực hiện như sau:
```Java
 @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        CarComponent component = DaggerCarComponent.create();
        component.inject(this); //Phân xưởng sẽ lấy ra truyền lớp này và tiêm phụ thuộc lên field car 
        car.drive();
    }
```

Điều này giúp ta tạo ra 1 biến car 1 cách nhành trong mà ta không phải làm từng bước để tạo ra 1 lớp `Car` bằng toán tử new cũng như phụ thuộc của nó. Đó là điểm mạnh của dagger.<br>
## 3. Phương thức tiêm phụ thuộc
  Trong phần này, chúng ta sẽ học cách thực hiện phương pháp tiêm.<br>
Bằng cách chú thích một phương thức không riêng tư với @Inject, chúng tôi yêu cầu Dagger gọi nó như một phần của quá trình tiêm và cung cấp các đối số của nó dưới dạng phụ thuộc. Kết hợp với việc chèn hàm tạo, điều này xảy ra tự động sau khi hàm khởi tạo kết thúc. Nếu không có phương thức tiêm hàm tạo, nó sẽ xảy ra khi phương thức tiêm các thành viên được gọi trên thành phần. Trong cả hai trường hợp, phương thức (hoặc các phương thức) được gọi sau khi tất cả các trường có chú thích @Inject được đưa vào.<br>
Một trường hợp sử dụng cho phương thức tiêm là nếu chúng ta muốn truyền bản thân đối tượng đã được xây dựng đầy đủ đến phụ thuộc với “this”, vì vậy chúng ta không để nó thoát khỏi hàm tạo.

Trong lớp `Car`.class ta thêm 1 phương thức sau.
```Java
@Inject
    public void enableRemote(Remote remote) { 
        remote.setListener(this); 
    }
```

Sau đó ta tạo `Remote`.class tương ứng với tham số truyền vào cho phương thức trên.
```Java
public class Remote {
    private static final String TAG = "Car";
    @Inject
    public Remote() {
    }
    public void setListener(Car car) {
        Log.d(TAG, "Remote connected");
    }
}
```
Khi ta run app: 
![](https://images.viblo.asia/e2fd67df-49cc-4408-a9ea-70a2e7f33bc4.PNG)<br>
Bạn thấy đó khi run app lên ta không hề gọi đến phương thức inject nhưng khi biên dịch thì nó sẽ được tiêm phụ thuộc và được tạo ra luôn cùng với lớp @Inject.
## 4. Module & Phương thức Provider
  Chúng ta sẽ học cách sử dụng các mô-đun và phương thức của trình cung cấp để thêm các đối tượng vào biểu đồ phụ thuộc không thể sử dụng hàm tạo @Inject, như các lớp thuộc thư viện của bên thứ ba.<br> 
  Mô-đun là các lớp Java đơn giản mà chúng tôi chú thích bằng @Module và thêm vào một thành phần. Chúng chứa các phương thức được chú thích bằng @Provides và xác định cách các đối tượng được khởi tạo và cấu hình. Các phương thức trình cung cấp này có thể có các đối số phụ thuộc rất riêng của chúng, sau đó Dagger sẽ cung cấp các đối số này nếu có thể. Bằng cách làm cho các phương thức của trình cung cấp trở nên tĩnh, chúng ta có thể tăng hiệu suất vì thành phần của chúng ta không phải khởi tạo mô-đun để gọi chúng.

Đầu tiên ta tạo `Wheels`.class 
```Java
public class Wheels {
    //Ví dụ class này là của thư viện java gốc ta ko thể thêm @Inject vào đc
    
    private Rims rims;
    private Tires tires;
    public Wheels(Rims rims, Tires tires) {
        this.rims = rims;
        this.tires = tires;
    }
}
```
Tiếp đến ta cần tạo Mudule tương ứng để cung cấp nó với class không thể tiêm phụ thuộc
```Java
@Module //Giúp class này có thể cung cấp các đối tượng được cấu hình lại
public class WheelsModule {
    @Provides //Các phương thức cung cấp
    static Rims provideRims() {
        return new Rims();
    }
    @Provides
    static Tires provideTires() {
        Tires tires = new Tires();
        tires.inflate();
        return tires;
    }
    @Provides
    static Wheels provideWheels(Rims rims, Tires tires) {
        return new Wheels(rims, tires);
    }
}
```

Sau đó ta cần thêm Module này vào phân xưởng `CarComponent` để cung cấp nó
```Java
@Component(modules = WheelsModule.class)
```

Ta run thử app bạn sẽ thấy: 
![](https://images.viblo.asia/5d75850b-5174-482f-a8f2-d14b0c64a1e4.PNG)<br>

## 5. Hiểu về @Bind
Chúng ta sẽ tìm hiểu cách thức và lý do tại sao chúng ta nên sử dụng @Binds thay vì @Provides để cung cấp triển khai cho các giao diện từ các mô-đun của chúng ta. Các phương thức ràng buộc ngắn gọn hơn vì chúng được khai báo là các phương thức trừu tượng không có phần thân và chúng hiệu quả hơn vì Dagger không phải gọi chúng hoặc thậm chí khởi tạo mô-đun chứa của chúng.

Tạo interface `Engine`
```Java
public interface Engine {
    void start();
}
```

Sau đó ta tạo ra các class implement interface `Engine`
```Java
public class PetrolEngine implements Engine {
    private static final String TAG = "Car";
    @Inject
    public PetrolEngine() {
    }
    @Override
    public void start() {
        Log.d(TAG, "Petrol engine started");
    }
}
```

```Java
public class DieselEngine implements Engine {
    private static final String TAG = "Car";
    @Inject
    public DieselEngine() {
    }
    @Override
    public void start() {
        Log.d(TAG, "Diesel engine started");
    }
}
```

Tiếp đến, ta cần tạo 1 module để cung cấp nó
```Java
@Module
//ta cần khai bao là lớp trừu tượng
public abstract class PetrolEngineModule {
    @Binds //Ta đã xử dụng @Bind thay cho @Provider nó sẽ tự động thổi phồng và trả về lớp đã kế thừa Engine đã được truyền vào.
    abstract Engine bindEngine(PetrolEngine engine);
}
```

Nhớ rằng ta phần cần phải thêm nó vào component sau đó nhé.<br>
Trong `Car`.class ta thêm
```Java
public void drive() {
        engine.start(); //tý run app bạn sẽ biết nó có chạy vào Class đã kế thừa interface Engine ko nhé
        Log.d(TAG, "driving...");
    }
```

Nó hoạt động bình thường nhé.
![](https://images.viblo.asia/3acde1f0-f0b7-40f4-992e-ef6468887119.PNG)

Nhưng có một trường hợp sau: <br>
    Ví dụ ta tạo thêm một class module nữa như sau:
```Java
@Module
public abstract class DieselEngineModule {
    @Binds
    abstract Engine bindEngine(DieselEngine engine);
}
```
Khi run app lên sẽ bị lỗi do nó không biết sẽ nhận class nào kế thừa nó đã chạy.


![](https://images.viblo.asia/753fc418-bbfe-4d4e-bc79-8c987147d959.PNG)
## 6. Mô-đun trạng thái
Phần này mình sẽ chỉ các bạn cách sử dụng các mô-đun trạng thái để đưa các biến vào biểu đồ phụ thuộc của chúng ta tại thời điểm chạy. Đối với điều này, chúng ta phải thêm một phương thức khởi tạo vào mô-đun của mình và thiết lập thủ công nó trên Trình tạo thành phần với các tham số bắt buộc.<br>

Nhưng câu hỏi đặt ra trong trường hợp bạn muốn truyền tham số sau khi chương trình được chạy thì ta cần phải làm gì.

Trong `DieselEngine`.class phương thức ta cần truyền vào 1 giá trị int
```Java
private int horsePower;
    public DieselEngine(int horsePower) {
        this.horsePower = horsePower;
    }
```

Trong Module cung cấp nó
```Java
@Module 
public class DieselEngineModule {
    private int horsePower;
    public DieselEngineModule(int horsePower) {
        this.horsePower = horsePower;
    }
    @Provides
    Engine provideEngine() {
        return new DieselEngine(horsePower);
    }
}
```
Nếu trước đấy ta sử dụng abstract class, method ta cần đổi lại để có thể chỉnh sửa được giá trị truyền vào sau đó khi chương trình đã được chạy
Sau đó ta reBuild lại app nó sẽ báo đỏ trong hàm OnCreate Activity ta cần truyền vào tham số cần cung cấp như sau.
```Java
CarComponent component = DaggerCarComponent.builder()
                .dieselEngineModule(new DieselEngineModule(100))
                .build();
```
![](https://images.viblo.asia/88505f6b-9355-454c-a910-1ee73217401a.PNG)
Giờ thì nó hoạt động bình thường rồi nhé.
## 7. Cách sử dụng @Component.Builder, @BindsInstance & @Named
Cách sử dụng @BindsInstance để liên kết các biến với đồ thị phụ thuộc của chúng ta trong thời gian chạy như một giải pháp thay thế cho việc cung cấp chúng từ một mô-đun trạng thái. Đối với điều này, chúng ta phải khai báo @ Component.Builder của riêng mình.
Để phân biệt giữa nhiều liên kết từ cùng một loại, chúng tôi sẽ sử dụng bộ định tính @Named.

Trong `PetrolEngine`.class 
```Java
public class PetrolEngine implements Engine {
    private static final String TAG = "Car";
    private int horsePower;
    private int engineCapacity;
    @Inject
    public PetrolEngine(@Named("horse power") int horsePower,
                        @Named("engine capacity") int engineCapacity) {
        this.horsePower = horsePower;
        this.engineCapacity = engineCapacity;
    }
    @Override
    public void start() {
        Log.d(TAG, "Petrol engine started. " +
                "\nHorsepower: " + horsePower +
                "\nEngine capacity: " + engineCapacity);
    }
}
```
Lớp này ta tạo như bình thường với tham số truyền vào nhưng điểm khác biệt là ta đặt tên cho nó.
Bởi vì ta đã truyền tham số đều là int, Sau đây nếu tôi tạo interface `Builder` khi cung cấp một giá trị là Int sẽ cùng cấp cấp 1 giá trị cho cả 2 tham số
=> Đó là điều chúng ta không hề mong muốn

Trong `CarComponent` 
```Java
@Component.Builder
    interface Builder {
        @BindsInstance
        Builder horsePower(@Named("horse power") int horsePower);
        @BindsInstance
        Builder engineCapacity(@Named("engine capacity") int engineCapacity);
        CarComponent build();
    }
```
@BindsInstance đánh dấu một phương thức trên trình tạo thành phần hoặc trình tạo thành phần con cho phép một thể hiện được liên kết với một số kiểu trong thành phần.<br>
Các thành phần có thể có một lớp trừu tượng tĩnh lồng nhau hoặc giao diện được chú thích bằng @Component.Builder. Nếu đúng như vậy, thì trình tạo được tạo của thành phần sẽ khớp với API trong loại. Các nhà xây dựng phải tuân theo một số quy tắc:
- Một phương thức trừu tượng không có đối số phải tồn tại và phải trả về thành phần. (Đây thường là build()phương pháp.)
- Tất cả các phương thức trừu tượng khác phải nhận một đối số duy nhất và phải trả về void, loại Builder hoặc supertype của trình tạo.
- Mỗi phụ thuộc thành phần phải có một phương thức setter trừu tượng.
- Mỗi phụ thuộc mô-đun mà Dagger không thể tự khởi tạo (ví dụ: mô-đun không có hàm tạo no-args hiển thị) phải có một phương thức setter trừu tượng. Các phụ thuộc mô-đun khác (những phụ thuộc mà Dagger có thể khởi tạo) được phép, nhưng không bắt buộc.
- Các phương thức không trừu tượng được cho phép, nhưng bị bỏ qua khi có liên quan đến việc xác thực và tạo trình tạo. 

Tiếp đến trong `Activity` ta sẽ xử lý như sau:
```Java
CarComponent component = DaggerCarComponent.builder()
                .horsePower(150)
                .engineCapacity(1400)
                .build();
```
Và giờ nó đã trả về 2 kết đúng gía trị cần nhận tương ứng với tên ta đã đặt: ![](https://images.viblo.asia/a56f6b79-e041-4d74-bcdb-1d33d91f5d38.PNG)
## 8. Tìm hiểu về @Singleton
@Singleton (và bất kỳ chú thích phạm vi nào khác) làm cho lớp của bạn trở thành một cá thể duy nhất trong biểu đồ phụ thuộc của bạn (có nghĩa là cá thể này sẽ là "singleton" miễn là đối tượng Thành phần tồn tại).<br> 
Sử dụng nó cũng rất là đơn giản
```Java
@Singleton
public class Driver {
    @Inject
    public Driver() {
    }
}
```
Tạo lớp `Driver` với từ khóa @Singleton
**Chú ý:** Điều này chỉ tạo ra duy nhật 1 singleton Driver khi nó được gọi trong cùng 1 component thôi nhé.
## 9. Tạo 1 @Component duy nhất với vòng đời ứng dụng
- Phần này chúng ta sẽ làm cách nào tạo ra 1 component duy nhất ta có thể gọi nó trên bất kỳ đâu trong ứng dung.. Điều này hữu ích nếu chúng ta muốn sử dụng lại các trường hợp phụ thuộc đơn lẻ, ví dụ như trong một hoạt động hoặc phân đoạn.

Để nó hoạt động trong suốt vòng đợi ứng dụng ta cần tạo ra lớp extends Application
```Java
public class ExampleApp extends Application {
    private AppComponent component;
    @Override
    public void onCreate() {
        super.onCreate();
        component = DaggerAppComponent.create();
    }
    public AppComponent getAppComponent() {
        return component;
    }
}
```

Trong Manifest.xml
ta cần thêm dòng này: android:name=".ExampleApp" vào thẻ application

Trong `Activity` ta chỉ cần gọi phương thức trong `ExampleApp`
```Java
AppComponent component = ((ExampleApp) getApplication()).getAppComponent()
```
# III. Kết luận
Đây là những vi dụ đơn giản để bạn hiểu rõ hơn cách dùng dagger trong dự án của mình. Bài viết có thể còn rất nhiều lỗi rất mong được sự đóng ghóp ý kiến của các bạn. Nếu các bạn thấy hay cho mình 1 comment nhé và các bạn muốn mình viết về chủ đề gì nữa không. 

# IV. Tài liệu tham khảo
https://dagger.dev/<br>
https://codinginflow.com/