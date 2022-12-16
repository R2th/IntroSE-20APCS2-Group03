Chào các bạn, lần trước mình có cùng các bạn tìm hiểu về Strategy Pattern. [Link cho bạn nào chưa xem](https://viblo.asia/p/design-pattern-strategy-pattern-924lJYwXZPM) =))) Lần này mình sẽ cùng các bạn tìm hiểu tiếp về một Pattern khác được áp dụng rất nhiều trong lập trình và ý tưởng của nó được thể hiện rất rõ trong thực tế - đó là Observer Pattern.
## 1. Bài toán
NoName làm việc cho một công ty gia công phần mềm. Công ty nhận được một đơn đặt hàng cho việc thiết kế và xây dựng một hệ thống phần mềm cho một trạm quan sát thời tiết. Dữ liệu của hệ thống được xây dựng thông qua một đối tượng gọi là WeatherData - đóng vai trò theo dõi điều kiện thời tiết hiện tại (nhiệt độ, độ ẩm, áp suất). Bên khách hàng yêu cầu công ty xây dựng một ứng dụng mà cung cấp 3 phần tử màn hình hiển thị: **CurrentConditionDisplay, StatsisticsDisplay, ForcastDisplay**, tất cả sẽ được cập nhật theo thời gian thực mỗi khi đối tượng WeatherData lấy được dự liệu mới nhất.
Ngoài ra, trạm quan sát cũng muốn "public" những API để những lập trình viên khác có thể viết ra những màn hình hiển thị thời tiết của riêng họ.
## 2. Phân tích
### 2.1. Tổng quan về xây dựng ứng dụng
Hệ thống cần xây dựng có mô hình như sau\
![alt](http://imageshack.com/a/img923/8567/BwN3Tm.png)\
Một cách đơn giản nhất, ta có thể thiết kế lớp WeatherData gồm 4 phương thức: **getTemperature(), getHumidity(), getPressure(), measurementsChanged()**. Trong đó phương thức **measurementsChanged()** được mô tả như sau:
```
public class WeatherData {
    // instance variable declarations
    
    public void mesurementsChanged() {
        float temp = getTemperature();
        float humidity = getHumidity();
        float pressure = getPressure();
        
        currentConditionsDisplay.update(temp, humidity, pressure);
        statisticsDisplay.update(temp, humidity, pressure);
        forecastDisplay.update(temp, humidity, pressure);
    }
    // other WeatherData methods here
}
```
Nhìn vào đoạn code trên, chúng ta có thể thấy một vấn đề ở đây đó là việc thực hiện các lời gọi: **currentConditionsDisplay.update(temp, humidity, pressure), statisticsDisplay.update(temp, humidity, pressure), forecastDisplya(temp, humidity, pressure)**; đang được **coding to concrete implementations**. Nếu làm như thế này, chúng ta sẽ gặp phải vấn đề về việc mở rộng. Ở đây nếu cần thêm một màn hình khác muốn cập nhật thời tiết ta phải thêm một dòng kiểu như: **other_1_Display.update(temp, humidity, pressure)**. Hay nếu giờ ta muốn màn hình nào đó không cập nhật dữ liệu nữa, ta phải xóa dòng code "update" của màn hình đó đi -> vi phạm nguyên tắc Open-closed principle.
### 2.2. Observer Pattern
#### 2.2.1. Ý tưởng
Ý tưởng của Observer Pattern có thể rất quen thuộc với các bạn thông qua ví dụ sau: Giả sử bạn là fan của Mr.Siro và luôn hóng mỗi khi Mr.Siro ra bài trên Youtube. Bạn muốn nhận thông tin về clip mới nhất của Mr.Siro => Bạn đăng kí kênh Youtube của anh ấy. Bây giờ, mỗi khi anh Siro ra bài mới, bạn đều nhận được thông báo. Tuy nhiên, đến một ngày, bạn nhận ra là nhạc của Mr.Siro buồn quá, làm bạn không còn yêu cuộc sống nữa (tại suốt ngày chìm đắm trong thất tình), bạn quyết định không đăng kí theo dõi kênh của anh Siro nữa. Từ đó, bạn chẳng bao giờ nhận bất kì thông báo nào về những bản nhạc mới nhất của anh "Ro" trên Youtube nữa.\
Hay giả sử bạn muốn đi làm gia sư. Có thể bạn sẽ đến một trung tâm gia sư nào đó, đăng kí với người ta. Họ sẽ thêm bạn vào một danh sách các gia sư của họ. Khi có một lớp mà phù hợp, họ sẽ gọi cho bạn vào thông báo là bạn có thể đi dạy lớp này. Nếu bạn không thích trung tâm đó nữa (tiền cọc đắt mà mãi chẳng có lớp) -> bạn có thể rút tiền đặt cọc -> tên bạn sẽ bị xóa khỏi danh sách gia sử của trung tâm.
#### 2.2.2. Observer Pattern
Định nghĩa
> **The Observer Pattern defines a one-to-many dependency between object so that when one object changes state, all of its dependency are notified and updated automatically.**
> 
Biểu đồ UML\
![alt](https://i.imgur.com/kr3uJGp.png)
## 3. Áp dụng vào bài toán
* Trong bài toán đưa ra, ta có thể thấy rằng mối quan hệ 1-n ở đây đó là 1-WeatherData và n-Screen (currentConditionstDisplay, statisticsDisplay, ...). Mỗi khi WeatherData có sự thay đổi về trạng thái (nhiệt độ, độ ẩm, áp suất) thì nó sẽ "thông báo" cho các màn hình đang "quan sát" sát nó để cập nhật lại việc hiển thị thông tin.
* Do đó chúng ta có Subject ở đây là WeatherData, Observer là các màn hình hiển thị.
*  Mỗi màn hình hiển thị có thể khác nhau, vì thể cách tốt nhất là chúng ta tạo ra một interface cho việc hiển thị.

Chúng ta sẽ xây dựng được biểu đồ UML của hệ thống cần xây dựng như sau:\
![alt](http://imageshack.com/a/img922/426/5jONKg.png)
* Các interface:
```
public interface Subject {
    public void registerObserver(Observer o);
    public void removeObserver(Observer o);
    public void notifyObservers(); // phương thức này được gọi để thông báo cho tất cả các observer một khi trạng thái của Subject được thay đổi.
}

public interface Observer {
    public void update(float temp, float humidity, float pressure);
}

public interface DisplayElement {
    public void display();
}
```
* WeatherData:
```
public class WeatherData implements Subject {
    // Chúng ta thêm một ArrayList để lưu danh sách cách Observer, khởi tạo nó ở constructor.
    private ArrayList observers;
    private float temperature;
    private float humidity;
    private float pressure;
    
    public WeatherData() {
        observers = new ArrayList();
    }
    
    public void registerObserver (Observer o) {
    // Khi một observer đăng kí quan sát, chúng ta sẽ thêm nó vào cuối danh sách.
        observer.add(o);
    }
    
    public void removerObserver(Observer o) {
    // Ngược lại, nếu một observer không muốn đăng kí nữa, chúng ta sẽ loại nó ra khỏi danh sách
        int i = observers.indexOf(o);
        if (i >= 0) {
        observers.remove(i);
        }
    }
    
    public void notifyObservers() {
        for (int i = 0; i < observer.size(); ++i) {
            Observer observer = (Observer)observers.get(i);
            observer.udpate(temperature, humidity, pressure);
        }
    }
    
    public void measurementsChanged() {
    // Chúng ta thông báo cho các Observer một khi chúng ta đã cập nhật thành công các thông tin từ Weather Station.
        notifyObservers();
    }
    
    pubic void setMeasurements(float temperature, float humidity, float pressure) {
    // Chúng ta có phương thức này để tạm thời có thể thay đổi trạng thái của WeaterData.
        this.temperature = temperatur;
        this.humidity = humidity;
        this.pressure = pressure;
        
        measurementsChanged();
    }
    
    // other WeatherData methods here
}
```
* Display elements
```
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temperatur;
    private float humidity;
    private Subject weatherData;
    
    public CurrentConditionsDisplay(Subject weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }
    
    public void display() {
        System.out.println("Current conditions: " + temperature + " F degrees and " + humidity + "% humidity");
    }
}
```
* Chạy thử nào
```
public class WeatherStation {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();
        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay(weatherData);
        StatisticsDisplay statisticsDisplay = new StatisticsDisplay(weatherData);
        ForecastDisplay forecastDisplay = new ForecastDisplay(weatherData);
        
        weatherData.setMeasurements(80, 65, 30.4f);
        weatherData.setMeasurements(82, 70, 29.2f);
        weatherData.setMeasurements(78, 90, 29.2f);
    }
}
```
## 4. Tổng kết
Trên đây chúng ta đã cùng đi tìm hiểu Observer Pattern và một trường hợp áp dụng pattern này vào giải quyết vấn đề. Trong thực tế, ý tưởng của Pattern này được sử dụng rất nhiều, có thể kể đến như việc lập trình giao diện trong Java với Swing, việc bạn subcribe một kênh Youtube, hay đăng kí nhận thông báo của các trang web,...\
Tài liệu tham khảo:\
[***Head First Design Pattern***](https://github.com/NLAQ/ebook/blob/master/HeadFirstDesignPatterns.pdf)\
Các bạn có câu hỏi, thắc mắc, hoặc muốn thảo luận về vấn đề nào thì có thể comment ở dưới.\
Cảm ơn các bạn đã đọc bài.