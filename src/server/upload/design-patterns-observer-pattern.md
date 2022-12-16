Observer được sử dụng khi chúng ta muốn tự động hóa một phương thức tương tác
cập nhật giữa 1 object chủ thể và nhiều object khác tham chiếu tới. Khi object chủ thể
được cập nhật trạng thái, các object tham chiếu tới sẽ được thông báo ngay khi sự kiện 
xảy ra. Observer được xếp vào nhóm các pattern Hành Vi.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/9a3c98d4-4369-42e2-9602-15969c247ff7.png)

Ở đây chúng ta lấy ví dụ về một mạng xã hội chia sẻ video mà ở đó mỗi kênh `Channel`
là một object chủ thể được quan sát `subscribe` bởi nhiều object người dùng `User` 
tham chiếu tới. Khi `Channel` đăng tải một video mới, một sự kiện sẽ được phát động
để thông báo cho tất cả các `User` đã đăng ký kênh.

### Bước 1

Tạo `abstract Observed` chủ thể được quan sát, và `abstract Observer` tham chiếu tới
object chủ thể. Cả 2 đối tượng "được quan sát" và "người quan sát" đều xuất hiện cùng lúc
nên chúng ta có thể định nghĩa cái nào trước cũng được.

`observerpattern/Observer.java`
```java
package observerpattern;

public abstract class Observer {
   public abstract void onEvent(String event, Object data);
}
```

`observerpattern/Observed.java`
```java
package observerpattern;

import java.util.ArrayList;
import java.util.List;

public abstract class Observed {
   protected List<Observer> observerList;

   public Observed() {
      observerList = new ArrayList<Observer>();
   }

   public void addObserver(Observer o) {
      observerList.add(o);
   }

   public abstract void dispatchEvent(String event, Object data);
}
```

### Bước 2

Tạo các class mô tả thực thể của phần mềm quản lý mạng xã hội chia sẻ video bao gồm:
`Video`, `Channel` kế thừa `Observed`, và `User` kế thừa `Observer`.

`observerpattern/Video.java`
```java
package observerpattern;

public class Video {
   private String name;

   public Video(String name) {
      this.name = name;
   }

   public String getName() {
      return name;
   }
}
```

`observerpattern/Channel.java`
```java
package observerpattern;

import java.util.ArrayList;
import java.util.List;

public class Channel
extends Observed {
   private String name;
   private List<Video> videoList;

   public Channel(String name) {
      super();
      this.name = name;
      videoList = new ArrayList<Video>();
   }

   @Override
   public void addObserver(Observer o) {
      observerList.add(o);
   }

   @Override
   public void dispatchEvent(String event, Object data) {
      observerList.stream()
            .forEach((subscriber) -> subscriber.onEvent(name + " " + event, data));
   }

   public void addNewVideo(Video v) {
      videoList.add(v);
      dispatchEvent("added new video", v);
   }

   public void addSubscriber(User u) {
      addObserver((Observer) u);
   }
}
```

`observerpattern/User.java`
```java
package observerpattern;

public class User
extends Observer {
   private String name;

   public User(String name) {
      this.name = name;
   }

   @Override
   public void onEvent(
      String event,
      Object data
   ) {
      System.out.println("=== User: " + name);
      System.out.println("Notification: " + event + " " + ((Video) data).getName());
   }

   public void subscribe(Channel c) {
      c.addSubscriber(this);
   }
}
```

### Bước 4

Viết code `main` để kiểm tra hoạt động của phần mềm.

`PatternDemo.java`
```java
import observerpattern.Channel;
import observerpattern.User;
import observerpattern.Video;

public class PatternDemo {
   public static void main(String[] args) {
      Channel theCoder = new Channel("The Coder");

      User john = new User("John");
      john.subscribe(theCoder);

      User ryan = new User("Ryan");
      ryan.subscribe(theCoder);

      theCoder.addNewVideo(new Video("Design Patterns"));
      theCoder.addNewVideo(new Video("Observer Pattern"));
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
=== User: John
Notification: The Coder added new video Design Patterns
=== User: Ryan
Notification: The Coder added new video Design Patterns
=== User: John
Notification: The Coder added new video Observer Pattern
=== User: Ryan
Notification: The Coder added new video Observer Pattern
```