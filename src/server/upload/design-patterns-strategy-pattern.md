Strategy (kế hoạch) được sử dụng khi chúng ta muốn triển khai một class có phương thức
hoạt động có thể được lựa chọn ở thời điểm phần mềm đang vận hành `runtime`.
Strategy được xếp vào nhóm các pattern Hành Vi.

## Áp dụng triển khai

Khá giống với State mà chúng ta đã đề cập tới trong một bài viết mới gần đây - 
[[Design Patterns] State Pattern](https://viblo.asia/p/design-patterns-state-pattern-yMnKMRqQZ7P) -
Strategy được sử dụng để triển khai tính đa hình trong kiến trúc phần mềm
thay vì trong tính năng của ngôn ngữ.

Điểm khác biệt cơ bản so với State, đó là Strategy tập trung vào câu hỏi "Kế hoạch 
hoạt động là gì?" hay "Việc cần làm là gì?". Trong khi đó thì State lại tập trung vào 
câu hỏi "Thực hiện như thế nào trong tình huống này?"

![sơ đồ các class](https://images.viblo.asia/69aff494-b780-4334-9770-cfdfb0009273.png)

Trong bài viết trước đó về State, chúng ta đã lấy ví dụ về phiên bản desktop của một phần mềm 
quản lý blog với "Việc cần làm" đã được xác định trước. Đó là phương thức `save()`
thực hiện tác vụ lưu trữ bài viết `Post` mà người dùng đang soạn thảo. Tuy nhiên việc phương thức
này hoạt động "như thế nào?" thì lại phụ thuộc vào trạng thái `State` của `Post`. Hay nói một cách 
khác là cách thức thực hiện công việc `save()` sẽ thay đổi tùy thuộc vào trạng thái của `Post`.
Nếu `Post` đang là một bản nháp thì `save()` sẽ chỉ tiếp tục lưu thành "Bản nháp" chứ không 
đăng tải bài viết. Còn nếu `Post` là bài viết đã được đăng tải rồi thì `save()` sẽ cập nhật bài viết
chứ không lưu thành một "Bản nháp" mới.

Trong bài viết này chúng ta có Strategy và vẫn lấy ví dụ về phần mềm quản lý blog ở trên. Giả định
rằng người dùng đang ở giao diện quản lý danh sách các bài viết và có thể đánh dấu chọn nhiều
bài viết để thực hiện một thao tác gộp nào đó: Đăng tải, Gỡ bài, hoặc Xóa bài. Lúc này "Việc cần làm"
đối với các bài viết được đánh dấu lại chưa được xác định trước và chỉ ở thời điểm người dùng nhấn
vào danh sách "Thao tác" để lựa chọn và nhấn nút "Áp dụng" thì chúng ta mới biết được "Việc cần làm là gì?".

### Bước 1

Tạo class `Post` mô tả thực thể các bài viết.

`strategypattern/Post.java`
```java
package strategypattern;

public class Post {
   private String title;
   private String author;
   private String status;

   public String getTitle() {
      return title;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   public String getAuthor() {
      return author;
   }

   public void setAuthor(String author) {
      this.author = author;
   }

   public String getStatus() {
      return status;
   }

   public void setStatus(String status) {
      this.status = status;
   }
}
```

### Bước 2

Tạo `interface Strategy` làm giao diện chung cho các kế hoạch hay các thao tác với phương thức `apply()`.

`strategypattern/Strategy.java`
```java
package strategypattern;

import java.util.List;

public interface Strategy {
   public void apply(List<Post> selectedPosts);
}
```

### Bước 3

Tạo ra các kế hoạch hay các thao tác cụ thể để áp dụng cho các `Post` được đánh dấu.

Thao tác "Đăng tải" `Publish` sẽ gắn nhãn "Đã đăng tải" cho các `Post` và in thông báo ra `console`.

`strategypattern/Publish.java`
```java
package strategypattern;

import java.util.List;

public class Publish
implements Strategy {
   @Override
   public void apply(List<Post> selectedPosts) {
      // với mỗi post đã được chọn
      // gắn nhãn Đã đăng tải
      // và in ra thông báo
      selectedPosts.stream().forEach((post) -> {
         post.setStatus("Đã đăng tải");
         System.out.println(
            "Bài viết [" +
            post.getTitle() + " - " + post.getAuthor() +
            "] đã được cập nhật và đăng tải."
         );
      });
   }
}
```

Thao tác "Gỡ bài" `Unpublish` sẽ gắn nhãn "Bản nháp" cho các `Post` và in thông báo ra `console`.

`stategypattern/Unpublish.java`
```java
package strategypattern;

import java.util.List;

public class Unpublish
implements Strategy {
   @Override
   public void apply(List<Post> selectedPosts) {
      // với mỗi post đã được chọn
      // gắn nhãn Bản nháp
      // và in ra thông báo
      selectedPosts.stream().forEach((post) -> {
         post.setStatus("Bản nháp");
         System.out.println(
            "Bài viết [" +
            post.getTitle() + " - " + post.getAuthor() +
            "] đã được gỡ xuống và lưu nháp."
         );
      });
   }
}
```

Thao tác "Xóa bài" `Remove` sẽ gắn nhãn "Đã xóa gần đây" cho các `Post` và in thông báo ra `console`.

`strategypattern/Remove.java`
```java
package strategypattern;

import java.util.List;

public class Remove
implements Strategy {
   @Override
   public void apply(List<Post> selectedPosts) {
      // với mỗi post đã được chọn
      // gắn nhãn Đã xóa gần đây
      // và in thông báo
      selectedPosts.stream().forEach((post) -> {
         post.setStatus("Đã xóa gần đây");
         System.out.println(
            "Bài viết [" +
            post.getTitle() + " - " + post.getAuthor() +
            "] đã được tạm xóa. " +
            "Hệ thống sẽ xóa bài viết sau 30 ngày."
         );
      });
   }
}
```

###  Bước 4

Giả định cơ sở dữ liệu để sử dụng trong code `main` với một vài bài viết đã được người dùng soạn thảo.

`PatternDemo.java`
```java
import strategypattern.*;

import java.util.ArrayList;
import java.util.List;

public class PatternDemo {
   private static List<Post> database;

   public static void main(String[] args) {
      connectDatabase();
  }

   private static void connectDatabase() {
      database = new ArrayList<Post>();

      Post designPatterns = new Post();
      designPatterns.setTitle("Giới Thiệu Design Patterns");
      designPatterns.setAuthor("Semi Art");
      designPatterns.setStatus("Đã đăng tải");
      database.add(designPatterns);

      Post statePattern = new Post();
      statePattern.setTitle("State Pattern");
      statePattern.setAuthor("Semi Art");
      statePattern.setStatus("Đã đăng tải");
      database.add(statePattern);

      Post strategyPattern = new Post();
      strategyPattern.setTitle("Strategy Pattern");
      strategyPattern.setAuthor("Semi Art");
      strategyPattern.setStatus("Bản nháp");
      database.add(strategyPattern);
   }
}
```

###  Bước 5

Giả lập các thao tác người dùng để kiểm tra hoạt động của Strategy Pattern.

`PatternDemo.java`
```java
import strategypattern.*;

import java.util.ArrayList;
import java.util.List;

public class PatternDemo {
   private static List<Post> database;

   public static void main(String[] args) {
      connectDatabase();

      // giả định người dùng đánh dấu chọn vài bài viết
      List<Post> selectedPosts;
      // object mô tả thao tác được chọn để áp dụng với các post được đánh dấu
      Action action = new Action();

      System.out.println("========== Thao tác người dùng 1");
      // người dùng chọn 2 bài viết "State" và "Strategy"
      selectedPosts = selectTwoLatestPosts();
      // người dùng nhấn vào danh sách "Thao tác" và chọn "Gỡ bài"
      action.setStrategy(new Unpublish());
      // người dùng nhấn vào nút "Áp dụng" để thực hiện thao tác vừa chọn
      action.apply(selectedPosts);

      System.out.println("========== Thao tác người dùng 2");
      // người dùng chọn bài viết "Giới Thiệu Design Patterns"
      selectedPosts = selectFirstPost();
      // người dùng nhấn vào danh sách "Thao tác" và chọn "Xóa bài"
      action.setStrategy(new Remove());
      // người dùng nhấn vào nút "Áp dụng" để thực hiện thao tác vừa chọn
      action.apply(selectedPosts);

      System.out.println("========== Thao tác người dùng 3");
      // người dùng lại chọn 2 bài viết "State" và "Strategy"
      selectedPosts = selectTwoLatestPosts();
      // người dùng nhấn vào danh sách "Thao tác" và chọn "Đăng tải"
      action.setStrategy(new Publish());
      // người dùng nhấn vào nút "Áp dụng" để thực hiện thao tác vừa chọn
      action.apply(selectedPosts);
   }

   private static void connectDatabase() { ... }

   private static List<Post> selectFirstPost() {
      return database.stream()
         .filter((post) -> post.getTitle().equalsIgnoreCase("giới thiệu design patterns"))
         .toList();
   }

   private static List<Post> selectTwoLatestPosts() {
      return database.stream()
         .filter((post) ->
            post.getTitle().equalsIgnoreCase("state pattern") ||
            post.getTitle().equalsIgnoreCase("strategy pattern")
         )
         .toList();
   }
}
```

### Bước 6

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
========== Thao tác người dùng 1
Bài viết [State Pattern - Semi Art] đã được gỡ xuống và lưu nháp.
Bài viết [Strategy Pattern - Semi Art] đã được gỡ xuống và lưu nháp.
========== Thao tác người dùng 2
Bài viết [Giới Thiệu Design Patterns - Semi Art] đã được tạm xóa. Hệ thống sẽ xóa bài viết sau 30 ngày.
========== Thao tác người dùng 3
Bài viết [State Pattern - Semi Art] đã được cập nhật và đăng tải.
Bài viết [Strategy Pattern - Semi Art] đã được cập nhật và đăng tải.
```