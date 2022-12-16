Dependency injection (DI) là gì?, Dagger là gì? và làm sao mà chúng giúp chúng ta viết code một cách clean hơn và dễ dàng để test hơn? Trong bài này chúng ta sẽ tìm hiểu về chúng.

## I. Giới thiệu

### 1. Khái niệm
 
### a. Dependency injection

Trước khi tìm hiểu về Dagger - cái mà sử dụng DI, ta hãy tìm hiểu DI trước nhé :)

Ta có ví dụ như sau: 
```
public class WeatherReporter {
    private final WeatherService weatherService;
    private final LocationProvider locationProvider;
    public WeatherReporter() {
        weatherService = new WeatherService();
        locationProvider = new LocationProvider();
    }
    public void report() {
        Location location = locationProvider.getCurrentLocation()
        Temperature temperature = weatherService.getTemperature(location)
        print(temperature)
    }
}
```

Trong lập trình OOP một thiết kế tốt là một class chỉ có một trách nhiệm rõ ràng và phụ thuộc vào các đối tượng khác để hoàn thành công việc. Các đối tượng đó gọi là **dependencies**. 

Trước khi class có thể chạy thì các đối tượng mà nó phụ thuộc phải được cung cấp trước bằng một cách nào đó. 

Trong ví dụ trên, ta khởi tạo 2 đối tượng ngay trong class WeatherReporter
- **WeatherService**: cung cấp thông tin thời tiết
- **Location**: cung cấp địa điểm


Bạn thấy bình thường, không có vấn đề gì phải không nào ?? Nhưng có 2 **vấn đề** như sau:

- **Thứ nhất**: Khi ta không sử dụng **WeatherService** nữa, mà chẳng hạn dùng **GoogleWeatherService** nào đó, thì  sao ?? Thì ... ta phải sửa trong class **WeatherReporter** thành cái Google kia và **vào từng** class sử dụng **WeatherService** khác để mà đổi :(( 

- **Thứ hai**: Ta vẫn dùng class **WeatherService** kia - hay quá không đổi nữa. Tuy nhiên giờ chằng hạn giờ hàm khởi tạo có tham số, như  **new WeatherService(season)** - lấy thời tiết theo mùa. Thì ==> Ta lại phải đổi ở đây và ... nhiều chỗ khác nữa.

==> Cách khởi tạo trên còn nhiều khuyết điểm, chưa hợp lý.

Ta sẽ đi tiếp tới ví dụ tiếp theo

```
public class WeatherReporter {
    private final WeatherService weatherService;
    private final LocationProvider locationProvider;
    public WeatherReporter(WeatherService weatherService,
                           LocationProvider locationProvider) {
        this.weatherService = weatherService;
        this.locationProvider = locationProvider;
    }
    public void report() {
        Location location = locationProvider.getCurrentLocation()
        Temperature temperature = weatherService.getTemperature(location)
        print(temperature)
    }
}
```

Chúng ta thấy gì nào ?? Khác với phần trên là ta truyền đối tượng **WeatherService** và **LocationProvider** ở ngoài vào thông qua hàm khởi tạo. Chứ không khởi tạo đối tượng trực tiếp ở trong.

Vậy hai vấn để ở trên đã được giải quyết chưa ?? Câu trả lời là đã hoàn toàn được giải quyết rồi đó:

- **GoogleWeatherService**: ta sẽ không cần vào từng class sử dụng để sửa mà sẽ làm được như phần dưới.

- **Tham số**: khởi tạo ở ngoài rồi thì có bao nhiêu tham số cũng vậy.

Ta làm như sau
```

public interface WeatherService {
    Temperature getTemperature();
}

public interface LocationProvider {
    Location getCurrentLocation();
}
public class Main {
    public static void main(String args[]) {
        WeatherService ws = new GoogleWeatherService();
        LocationProvider lm = new GoogleLocationProvider();
        WeatherReporter reporter = new WeatherReporter(ws, lm);
        reporter.report();
    }
}
```

Như cách làm trên:

- **WeatherService**, **LocationProvider** được chuyển thành interface. Class **WeatherReporter** nhận các dependencies từ bên ngoài truyền vào. 

- Các **dependencies** có thể là bất cứ implement nào thực hiện interface 2 trên, khi có thay đổi về ví dụ **WeatherService** từ Google sang Yahoo thì chỉ cần thay đổi 1 dòng code duy nhất bên ngoài thay vì phải sửa từng class sử dụng dependency location.

Done, vậy là các vấn đề đã được giải quyết hết rồi :D Sử dụng thôi.

### Tổng quan

**Dependency Injection** được xây dựng dựa trên khái niệm **Inversion of Control**. 

Nghĩa là các phụ thuộc của 1 class chỉ nên được cung cấp từ bên ngoài. Hiểu đơn giản là không 1 class nào được khởi tạo đối tượng của class khác (class phụ thuộc) bên trong nó, mà nên lấy class phụ thuộc đó từ 1 configuration class

Tác dụng lớn nhất của việc sử dụng **Depedency Injection** là việc có thể tăng tính tái sử dụng của các class, giúp các class hoàn toàn độc lập với nhau

Nhưng hãy thử nhìn xa thêm một chút nào !!! Nếu project chỉ có từng đó đối tượng, rất ít dependencies thì DI trên chằng có vấn đề gì.

Ta lại xem ví dụ sau:

```
public class Main {
    public static void main(String args[]) {
    
        WebSocket webSocket = getWebSocket());
        WeatherService weatherService = new GoogleWeatherService(webSocket);
       
        GPSProvider gps = new GoogleGPSProvider();
        ExploreService explore = new GoogleExploreService();
        LocationProvider location = new GoogleLocationProvider(gps, explore);
        
        WeatherReporter reporter = new WeatherReporter(weatherService, location);
        reporter.report();
    }
    private static WebSocket getWebSocket() {
        SocketConfig conf = FileConfigReader.read("./tmp/web.yaml")
        return new WebSocketImpl(conf.getHost(), conf.getPort())
    }
}
```

LocationProvider có dependencies của nó là **GPSProvider** để định vị trí hiện tại, **ExploreService** để cung cấp các địa điểm hấp dẫn xung quanh, **WeatherService** cần **WebSocket** để giao tiếp với đài khí tượng thủy văn.

Tưởng tượng rằng **WebSocket, GPSProvider**,... có dependencies riêng của nó, và cách khởi tạo không chỉ đơn giản là một dòng new duy nhất mà phải đọc file, khởi tạo theo logic,... lúc này hàm main sẽ là một đống hỗn độn.

Tuy nhiên nếu sử dụng Dagger thì ví dụ trên sẽ thành đơn giản thế này

```
public class Main {
    public static void main(String args[]) {
        AppComponent component = DaggerAppComponent.create();
        WeatherReporter reporter = component.getWeatherReporter();
        reporter.report();
    }
}
```

Đọc phần tiếp theo để tìm hiểu lý do - cách dùng nhé :D

### 2. Lý do sử dụng

**Dagger 2** là một open source giúp chúng ta tự động tạo các mã code, tạo ra 1 sơ đồ phụ thuộc (dependency graph) dựa vào các **Annotation** khi compile time. Trong khi một số framework khác, ví dụ như Spring thì DI được hiện thực dựa vào reflection khiến nó chậm hơn khi runtime. 

Vì code sẽ tự gen cho chúng ta các phụ thuộc cho nên code sẽ ngắn gọn hơn, đơn giản hơn rất nhiều.

Các dependencies được tự động khởi tạo mà chúng ta không cần phải tự viết từng dòng code và đặt vào các contructor

Trước dagger 2 còn có **dagger 1**, bạn vẫn hoàn toàn có thể sử dụng, tuy nhiên không nên nhé :v Lý do thì như sau

Ngày xưa, có 1 framework có chức năng phân tích sự phụ thuộc của 1 class (xem class đó phụ thuộc vào các class nào). Sau khi phân tích, framework này khởi tạo các class phụ thuộc và nhúng chúng vào class gốc thông qua **Java Reflection**. Như vậy các class này có thể được test (kiểm thử) 1 cách độc lập. Framework mà chúng ta nói tới chính là Dagger 1.

Nhưng quá trình vận hành của Dagger 1 có 2 nhược điểm: 

- **Thứ nhất:**  Reflection là việc rất chậm chạp

- **Thứ hai:** Dagger 1 tạo ra các đối tượng mà class gốc phụ thuộc (dependency) tại thời điểm **Runtime**, điều này có thể dẫn đến các lỗi không mong muốn.

Nên hãy chuyển sang Dagger 2 nhé mn :D Mà dagger 1 cũng bị cho deprecated rồi đó (15/09/2016)

Các bạn có thể đọc thêm cái bài viết về kiến thức Android cả chém gió tại blog của mình nhé

Blog Code cùng Trung: http://codecungtrung.com/