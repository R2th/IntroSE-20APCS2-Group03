Mediator được sử dụng để giảm thiểu độ phức tạp trong giao tiếp giữa nhóm nhiều object.
Mediator cung cấp một class trung gian đóng vai trò xử lý tất cả các tương tác trao đổi
qua lại giữa các object vệ tinh. Mediator được xếp vào nhóm các pattern Hành Vi.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/3aec40a5-7dae-4e32-8d50-4a01b1bc65c5.png)

Chúng ta đang có một ví dụ về một phần mềm chat cho phép tạo phòng chat `room` có nhiều 
người dùng `user`. Khi có một người dùng gửi tin nhắn vào phòng chat. Object mô tả phòng chat
`ChatRoom` có nhiệm vụ thông báo tin nhắn đó tới tất cả các tài khoản người dùng còn lại trong phòng.

### Bước 1

Tạo `class User` mô tả người dùng.

`mediatorpatter/User.java`
```java
package mediatorpattern;

import java.util.Date;

public class User {
   private String name;
   private ChatRoom chatRoom;

   public User(String name) {
      this.name = name;
      this.chatRoom = null;
   }

   public String getName() {
      return name;
   }

   public void joinRoom(ChatRoom room) {
      this.chatRoom = room;
      room.addUser(this);
   }

   public void sendMessage(String msg) {
      chatRoom.displayMessage(this, msg);
   }

   public void receive(
      Date timestamp,
      User sender,
      String msg
   ) {
      System.out.println("=== User: " + name);
      System.out.println(timestamp.toString());
      System.out.println("Received message from: " + sender.getName());
      System.out.println("Message content: " + msg);
   }
}
```

### Bước 2

Tạo class trung gian `ChatRoom` mô tả phòng chat.

`mediatorpattern/ChatRoom.java`
```java
package mediatorpattern;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ChatRoom {
   private List<User> userList;

   public ChatRoom() {
      this.userList = new ArrayList<User>();
   }

   public void addUser(User user) {
      userList.add(user);
   }

   public void displayMessage(
      User sender,
      String msg
   ) {
      Date timestamp = new Date();
      System.out.println("=== Chat room");
      System.out.println(timestamp.toString() + " [" + sender.getName() + "]: " + msg);
      notifyAllUsers(timestamp, sender, msg);
   }

   private void notifyAllUsers(
      Date timestamp,
      User sender,
      String msg
   ) {
      userList.stream()
            // filter tài khoản của người gửi tin nhắn
            // và chỉ thông báo cho những user còn lại
            .filter((user) -> ! user.getName().equalsIgnoreCase(sender.getName()))
            .forEach((user) -> user.receive(timestamp, sender, msg));
   }
}
```

### Bước 3

VIết code `main` để thử xem tương tác giữa các người dùng qua phòng chat.

`PatternDemo.java`
```java
import mediatorpattern.ChatRoom;
import mediatorpattern.User;

public class PatternDemo {
   public static void main(String[] args) {
      ChatRoom chatRoom = new ChatRoom();

      User robert = new User("Robert");
      robert.joinRoom(chatRoom);

      User john = new User("John");
      john.joinRoom(chatRoom);

      robert.sendMessage("Hi! John!");
      john.sendMessage("Hello! Robert!");
   }
}
```

### Bước 4

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
=== Chat room
Wed Mar 09 19:45:54 ICT 2022 [Robert]: Hi! John!
=== User: John
Wed Mar 09 19:45:54 ICT 2022
Received message from: Robert
Message content: Hi! John!
=== Chat room
Wed Mar 09 19:45:54 ICT 2022 [John]: Hello! Robert!
=== User: Robert
Wed Mar 09 19:45:54 ICT 2022
Received message from: John
Message content: Hello! Robert!
```