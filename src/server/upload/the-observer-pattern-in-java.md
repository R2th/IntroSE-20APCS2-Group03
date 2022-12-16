## 1. Mở đầu
Để tiếp tục series giới thiệu về các design pattern, hôm nay mình sẽ giới thiệu một design pattern nữa cũng được sử dụng khá phổ biến & hữu ích đó là Observer Pattern.<br>
Chúng ta sẽ cùng tìm hiểu qua bài viết này.<br>
## 2. Observer Pattern là gì?
Observer là một mẫu thiết kế hành vi (behavioral design pattern).  Nó chỉ định giao tiếp giữa các đối tượng: observable và observers.  Một observable là một đối tượng thông báo cho các observers khác về những thay đổi trong trạng thái của nó. Hay nói cách khác, nó giúp cho một đối tượng khi thay đổi trạng thái của nó thì sẽ gửi thông báo đến các đối tượng khác để các đối tượng khác có thể tiến hành những thay đổi theo cho phù hợp.<br>
## 3. Khi nào thì sử dụng Observer Pattern
Observer Pattern được sử dụng khi có một đến nhiều mối quan hệ giữa các đối tượng, chẳng hạn như nếu một đối tượng được sửa đổi, các đối tượng phụ thuộc của nó sẽ được thông báo tự động và các thay đổi tương ứng được thực hiện cho tất cả các đối tượng phụ thuộc.
## 4. Implementation
Xét ví dụ cụ thể như sau: một cơ quan tin tức (gọi là đối tượng `NewsAgency`) có thể thông báo cho các kênh (`Channel`) khi nhận được tin tức.  Khi nhận tin tức sẽ thay đổi về trạng thái của `NewsAgency` và nó thông báo đến các `Channel`.<br>
Hãy cùng xem cách để implement như sau:<br>
Đầu tiên, chúng ta define ra 1 class `NewsAgency` cho đối tượng NewsAgency đã nói ở trên:<br>
```
public class NewsAgency {
    private String news;
    private List<Channel> channels = new ArrayList<>();
 
    public void addObserver(Channel channel) {
        this.channels.add(channel);
    }
 
    public void removeObserver(Channel channel) {
        this.channels.remove(channel);
    }
 
    public void setNews(String news) {
        this.news = news;
        for (Channel channel : this.channels) {
            channel.update(this.news);
        }
    }
}
```
Có thể thấy, `NewsAgency` là 1 đối tượng observable chứa các thông tin `news` & các `Channel`. Khi trạng thái của `NewsAgency` thay đổi (trong ví dụ trên sẽ là thay đổi `news` thông qua method `setNews()`), nó sẽ thông báo cho tất cả các `Channel` biết và tiến hành update cho các `Channel` thông qua method `update()` của mỗi `Channel`.<br>
Để có thể làm điều đó, đối tượng observable được cần phải giữ các tham chiếu đến các observers (trong trường hợp này, nó là các `Channel`).<br>
Bây giờ chúng ta hãy xem các observers (`Channel` class), có thể trông như thế nào.  Nó nên có phương thức `update()` để có thể được gọi khi trạng thái NewsAgency thay đổi:<br>
```
public class NewsChannel implements Channel {
    private String news;
 
    @Override
    public void update(Object news) {
        this.setNews((String) news);
    } 
}
```
Interface `Channel` chỉ có duy nhất 1 method `update()`:<br>
```
public interface Channel {
    public void update(Object o);
}
```
Bây giờ, nếu ta thêm bất kỳ `Channel` mới vào danh sách các `Channel` của `NewsAgency` và thay đổi trạng thái của NewsAgency, thì các trạng thái của các `Channel` được thêm sẽ được cập nhật:<br>
```
NewsAgency observable = new NewsAgency();
NewsChannel observer = new NewsChannel();
 
observable.addObserver(observer);
observable.setNews("news");
assertEquals(observer.getNews(), "news");
```
## 5. Implement Observer Pattern with java.util.Observer library
Trong các thư viện Java core, có một interface Observer giúp cho việc thực hiện mẫu quan sát thậm chí còn đơn giản hơn, đó là thư viện `java.util.Observer`.<br>
Interface `java.util.Observer` định nghĩa phương thức `update()`, do đó ta không cần phải tự định nghĩa nó như ví dụ đã làm trong phần trước mà chỉ đơn giản là đem chúng ra sử dụng:<br>
```
public class ONewsChannel implements Observer {
 
    private String news;
 
    @Override
    public void update(Observable o, Object news) {
        this.setNews((String) news);
    }
}
```
Có đối tượng observers thì cũng có thư viện dành cho đối tượng observable. Hãy cùng xem ví dụ về cách sử dụng chúng:<br>
```
public class ONewsAgency extends Observable {
    private String news;
 
    public void setNews(String news) {
        this.news = news;
        setChanged();
        notifyObservers(news);
    }
}
```
Lưu ý rằng chúng ta không cần gọi trực tiếp method `update()` của các observers.  Chúng ta chỉ gọi `stateChanged()` và `notifyObservers()` và `Observable` sẽ làm tất cả các phần còn lại.<br>
Ngoài ra, nó còn chứa một danh sách các observers và có các phương thức để làm việc với danh sách đó - `addObserver()` và `removeObserver()`.<br>
Để kiểm tra kết quả, chúng ta chỉ cần thêm observers vào danh sách này và cập nhật news:<br>
```
ONewsAgency observable = new ONewsAgency();
ONewsChannel observer = new ONewsChannel();
 
observable.addObserver(observer);
observable.setNews("news");
assertEquals(observer.getNews(), "news");
```
## 6. Implementation With PropertyChangeListener
Interface của `Observer` như đã nói ở trên không hoàn hảo và không được dùng nữa từ Java 9. Một trong những nhược điểm của nó là `Observable` không phải là interface mà là một class, đó là lý do tại sao các lớp con không thể được sử dụng để trở thành observable.<br>
Ngoài ra, ta cũng có thể ghi đè một số phương thức được synchronized của Observable và phá vỡ tính chất thread-safety của nó.<br>
Một interface được đề xuất để thay thế & khắc phục những khuyết điểm trên của `Observer` đó chính là `ProperyChangeListener` interface<br>
Trong ví dụ này, các observable được quản lý bởi đối tượng `PropertyChangeSupport`.  Nó giúp gửi thông báo cho observers khi một thuộc tính của class được thay đổi.<br>
Như vậy, đối tượng observable sẽ được define như sau:<br>
```
public class PCLNewsAgency {
    private String news;
 
    private PropertyChangeSupport support;
 
    public PCLNewsAgency() {
        support = new PropertyChangeSupport(this);
    }
 
    public void addPropertyChangeListener(PropertyChangeListener pcl) {
        support.addPropertyChangeListener(pcl);
    }
 
    public void removePropertyChangeListener(PropertyChangeListener pcl) {
        support.removePropertyChangeListener(pcl);
    }
 
    public void setNews(String value) {
        support.firePropertyChange("news", this.news, value);
        this.news = value;
    }
}
```
Bằng chách sử dụng `PropertyChangeSupport` này, ta có thể thêm và xóa các `observers` và thông báo cho họ khi trạng thái của những thay đổi thông qua method `firePropertyChange()`:
```
support.firePropertyChange("news", this.news, value);
```
Ở đây, param đầu tiên là tên của thuộc tính được thay đổi.  Param thứ hai và thứ ba là giá trị cũ và mới tương ứng.<br>
Các observers cần được implement từ `PropertyChangeListener` interface:<br>
```
public class PCLNewsChannel implements PropertyChangeListener {
 
    private String news;
 
    public void propertyChange(PropertyChangeEvent evt) {
        this.setNews((String) evt.getNewValue());
    }
}
```
Class `PropertyChangeSupport` sẽ thực hiện khi nhận được thay đổi & thông báo notify đến các observers, Các observers sẽ nhận được thông báo thay đổi thông qua event bằng cách mà `propertyChange()` method được gọi<br>
Cách hoạt động:<br>
```
PCLNewsAgency observable = new PCLNewsAgency();
PCLNewsChannel observer = new PCLNewsChannel();
 
observable.addPropertyChangeListener(observer);
observable.setNews("news");
 
assertEquals(observer.getNews(), "news");
```
## 7. Kết luận
Trong bài viết này, chúng ta đã tìm hiểu về Observer pattern & hai cách để implement Observer pattern trong Java. Hi vọng vài viết sẽ giúp ích cho các bạn trong học tập cũng như công việc.
## 8. Tham khảo
[The Observer Pattern in Java - Baeldung.com](https://www.baeldung.com/java-observer-pattern)