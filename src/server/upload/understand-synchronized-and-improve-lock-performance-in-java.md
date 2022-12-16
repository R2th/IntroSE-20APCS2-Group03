Đây không phải là chủ đề mới, nhưng hy vọng với nhiều nguồn tư liệu đã được chọn lọc (Java docs, stackoverflow, blog...), cộng với cách trình bày trong bài viết sẽ giúp cho các bạn dễ nắm hơn về `synchronized` và cách để tăng `performance` trong khi sử dụng `synchronized` giữa các `thread` trong Java.
## Related definition and explanation
Java cung cấp nhiều cơ chế để giao tiếp giữa các `Thread`. Phương pháp cơ bản nhất của các phương thức này là `synchronization`, được thực hiện bằng cách sử dụng các `monitor`. Mỗi đối tượng trong Java được liên kết với một *monitor*, mà một *thread* có thể *lock* hoặc *unlock* nó. Chỉ có một *thread* tại một thời điểm có thể giữ một khóa trên *monitor*  của đối tượng. Bất kỳ *thread* nào khác cố `lock monitor` đó sẽ bị chặn cho đến khi chúng có thể lấy được *khóa* trên *monitor* đó. Một *thread* có thể *lock* cùng một *monitor* cụ thể nhiều lần; mỗi lần *unlock* sẽ đảo ngược tác dụng của một hoạt động *lock* trước đó.

### Synchronized statement (or synchronized block)

`Synchronized statement` hay `synchronized block` tính toán một tham chiếu (`reference`) đến một đối tượng, sau đó nó cố gắng thực hiện một hành động *lock* trên *monitor* của đối tượng đó và không tiến hành thực thi thêm gì cho đến khi hành động *lock* đã hoàn tất thành công. Sau khi hành động *lock* đã được thực hiện, phần `body`  (gồm những câu lệnh nằm bên trong phần `synchronized`) của `synchronized statement` được thực hiện. Nếu việc phần `body`  được hoàn thành một cách bình thường hoặc đột ngột, một hành động *unlock* sẽ tự động được thực hiện trên cùng một *monitor* đó.

```java
class BumpTest {
    int count;
    void bump() {
        synchronized (this) {
            // synchronized (this) { // you can also call this multiple times }
            count++; 
        }
    }
    static int classCount;
    static void classBump() {
        try {
            synchronized (Class.forName("BumpTest")) {
                // synchronized statement's body
                classCount++;
            }
        } catch (ClassNotFoundException ignore) {}
    }
}
```
Một vài lưu ý:
> *Lock* được acquire bởi `synchronized statements` giống với *Lock* được acquired ngầm định bởi `synchronized methods`.

```java
// This implicitly aquire by synchronized methods has same with previous synchronized statement sample
class Test {
    int count;
    synchronized void bump() {
        count++;
    }
    static int classCount;
    static synchronized void classBump() {
        classCount++;
    }
}
```

> Aquire *Lock* liên kết với một đối tượng không ngăn cản các *thread* khác truy cập vào các `field` hoặc gọi các `method` không được *synchronize* trên đối tượng. Các *thread* khác cũng có thể sử dụng các `synchronized method` hoặc `synchronized statement` theo cách thông thường để đạt được `mutual exclusion` (loại trừ lẫn nhau).

### Synchronized method
Một `synchronized method` sẽ tự động thực hiện một hành động `lock` khi `method` được gọi; phần `body` của nó sẽ không được thực hiện cho đến khi hành động `lock` đã hoàn tất thành công. Nếu *method* là một `instance method`(một `non-static` *method* bình thường), nó sẽ *lock* trên *monitor* liên kết với `instance` mà nó được gọi ra (tức *monitor* liên kết với `this`). Nếu *method* là `static`, nó sẽ *lock* trên *monitor* liên kết với cả đối tượng `Class` đại diện cho lớp mà phương thức được định nghĩa.  Nếu việc phần `body`  được hoàn thành một cách bình thường hoặc đột ngột, một hành động *unlock* sẽ tự động được thực hiện trên cùng *monitor* đó.

### More examples and explanation
```java
final Object a = new Object();
final Object b = new Object();
synchronized(a){
    doStuff();
}
synchronized(b){
    doSomeStuff();
}
synchronized(a){
    doOtherStuff();
}
```
Trong ví dụ này, một *thread* thực thi `doStuff` sẽ ngăn các *thread* khác thực thi `doOtherStuff` vì nó đang *lock* trên `monitor` của đối tượng `a`. Tuy nhiên, một *thread* khác sẽ được phép thực thi `doSomeStuff` một cách bình thường.

```java
public synchronized void methodA() { // Synchronized instance method
  doStuff();
}
public void methodB() {
    synchronized(this) { // Synchronized statement
        doStuff();
    }
}
public void methodC() {
  doOtherStuff(); // without synchronized
}
```
Trong ví dụ này, `synchronized instance` method `methodA()` và `synchronized statement` `methodB()` hoạt động hoàn toàn giống nhau, do *monitor* liên kết với `this` được dùng để *lock*. Tuy nhiên nếu có một `methodC()` không có *synchronized*, một *thread* khác hoàn toàn có thể truy cập cùng lúc và thực thi `doOtherStuff()`.

```java
class ClassName {
  public void static synchronized staticMethodA() {
    doStaticStuff();
  }
  public static void staticMethodB() {
    synchronized(ClassName.class) {
      doStaticStuff();
    }
  }
  public void nonStaticMethodC() {
    synchronized(this.getClass()) {
      doStuff();
    }
  }
  public static void unSafeStaticMethodD() {
   doStaticStuff();
  }
  public synchronized void unSafeNonStaticMethodF() {
      doStuff();
  }
}
```
Đặc biệt trong ví dụ này, cần lưu ý:
1. Nếu bạn có một `static` *method* được *synchronized*, nó đồng nghĩa với việc bạn thực hiện *synchronized statement (block)* với `ClassName.class` (hay `getClass()`) làm tham số (`argument`)
2. Vì vậy, `staticMethodA()` và `staticMethodB` hoạt động giống nhau, *thread* đang thực thi chúng sẽ ngăn chặn các *thread* khác truy cập `nonStaticMethodC` vì nó được *synchronize* trên cùng đối tượng.
3. Tuy nhiên, lưu ý rằng, một *thread* vẫn có thể truy cập và thực thi `unSafeStaticMethodD` and `unSafeNonStaticMethodF`

> `Synchronized on Class object` không có nghĩa là đồng bộ tất cả các truy cập đến các *method* của lớp đó, nó chỉ đơn giản có nghĩa là dùng *monitor* liên kết với đối tượng `Class` để đồng bộ.

## Improve lock performance
Một điều khá quan trọng là hiểu được sự khác nhau giữa `contended` và `uncontended lock` (khóa tranh chấp và khóa không tranh chấp). *Lock*  tranh chấp xuất hiện khi một *thread* cố truy cập vào vùng `synchronized statement/method` đang được thực thi bởi *thread* khác. Khi đó *thread* đến sau phải buộc chờ đợi đến khi *thread* trước đó thực thi xong và giải phóng *monitor* của đối tượng. Khi chỉ có duy nhất một *thread* tại một thời điểm thực thi *synchronized code* thì *lock* ở trạng thái *uncontended*.

Một vấn đề thực tế, việc đồng bộ hóa trong *JVM* được tối ưu hóa cho các trường hợp *uncontended*, và đa số các ứng dụng, *uncontended lock* không tốn nhiều chi phí khi thực hiện, và điều này hoàn toàn ngược lại với `contended lock`. Vì vậy, chúng ta sẽ cố gắng giảm khả năng tranh chấp và độ dài của tranh chấp trong lúc *contended lock*  xuất hiện.

### Protect data not the code
Thông thường một *developer* dùng cách đơn giản nhất, nhanh nhất để đạt được `thread-safety` đó là tiến hành *lock* các truy cập trên cả *method* (dùng *synchronized method*)
```java
class GameServer {
  public final Map<<String, List<Player>> tables = new HashMap<String, List<Player>>();

  public synchronized void join(Player player, Table table) {
    if (player.getAccountBalance() > table.getLimit()) {
      List<Player> tablePlayers = tables.get(table.getId());
      if (tablePlayers.size() < 9) {
        tablePlayers.add(player);
      }
    }
  }
  public synchronized void leave(Player player, Table table) {/*do something*/}
  public synchronized void createTable() {/*do something*/}
  public synchronized void destroyTable(Table table) {/*do something*/}
}
```
Ý tưởng là một *player* `join()` vào bàn, phải đảm bảo rằng số dư tài khoản của *player* phải lớn hơn giới hạn đặt cược của bàn và số lượng *player* đã tham gia trên bàn nhỏ hơn 9.

Tuy nhiên, với cách `synchronize` như trên, hệ thống sẽ phải liên tục kích hoạt sự kiện tranh chấp (`contention`) bởi các *thread* đang chờ cùng một *lock*. Ngoài ra, phần `synchronized body` chứa các  thao tác kiểm tra *account balance* và *table limit*, là các thao tác có thể liên quan đến các hoạt động tăng khả năng tranh chấp và độ dài của tranh chấp.

Bước đầu tiên, hướng đến giải pháp sẽ đảm bảo rằng chúng ta sẽ `Protect data not the code`, bằng cách di chuyển từ khóa *synchronized* từ điểm khai báo *method* vào bên trong *body* của nó. 
```java
  class GameServer {
  public final Map<String, List<Player>> tables = new HashMap<String, List<Player>>();

  public void join(Player player, Table table) {
    synchronized (tables) {
      if (player.getAccountBalance() > table.getLimit()) {
        List<Player> tablePlayers = tables.get(table.getId());
        if (tablePlayers.size() < 9) {
          tablePlayers.add(player);
        }
      }
    }
  }
  public synchronized void leave(Player player, Table table) {/*do something*/}
  public synchronized void createTable() {/*do something*/}
  public synchronized void destroyTable(Table table) {/*do something*/}
}
```
Với thay đổi nhỏ này, ảnh hưởng đến hành vi của cả lớp. 
-  Bất cứ khi nào *player* `join()` vào bàn, *synchronized method* trước đó *lock* trên đối tượng `GameServer (this)` và vì thế, hiển nhiên tranh chấp có thể xảy ra khi có một người chơi cố gắng `leave()` rời khỏi bàn chơi. 
-  Việc thay *synchronized method* bởi *synchronized statement* sử dụng *monitor* đối tượng `tables` rõ ràng làm trì hoãn và giảm khả năng tranh chấp trên lớp `GameServer`.

### Reduce the lock scope
Bước tiếp theo, giải pháp sẽ là chỉ *lock* những gì cần thiết
```java
public class GameServer {
  public final Map<String, List<Player>> tables = new HashMap<String, List<Player>>();

  public void join(Player player, Table table) {
    if (player.getAccountBalance() > table.getLimit()) {
      synchronized (tables) {
        List<Player> tablePlayers = tables.get(table.getId());
        if (tablePlayers.size() < 9) {
          tablePlayers.add(player);
        }
      }
    }
  }
  ...
```
Rõ ràng, hoạt động kiểm tra số dư tài khoản (có thể tốn nhiều thời gian) nằm ngoài phạm vi *lock* sẽ làm tăng `performance` đáng kể khi `contended lock` xuất hiện. 
### Split your lock
Tại thời điểm này, bạn có thể nhận thấy rõ ràng rằng, toàn bộ cấu trúc dữ liệu được bảo vệ bởi cùng một `lock` (dựa trên *tables' monitor*). Xem xét việc chúng ta có thể giữ hàng ngàn *poker table* trong cấu trúc này, và điều đó vẫn đặt ra nguy cơ cao các sự kiện tranh chấp. Vì vậy, chúng ta phải bảo vệ mỗi *table* riêng biệt khỏi việc vượt quá số lượng (*capacity*). 
```java
public class GameServer {
  public final Map<String, List<Player>> tables = new HashMap<String, List<Player>>();

  public void join(Player player, Table table) {
    if (player.getAccountBalance() > table.getLimit()) {
      List<Player> tablePlayers = null;
      synchronized (tables) {
          tablePlayers = tables.get(table.getId());
      }
      
      synchronized (tablePlayers) {
        if (tablePlayers.size() < 9) {
          tablePlayers.add(player);
        }
      }
    }
  }
  ...
}
```
Hiện tại, chúng ta đồng bộ riêng biệt quyền truy cập vào các *table*, để nhanh chóng có được các *tablePlayers* được yêu cầu, và sau đó khóa riêng biệt các *tablePlayers* làm việc với nó. Bằng cách này, ta đã làm giảm đáng kể khả năng khóa trở thành `contended lock`, bởi vì các khóa đã trở nên chi tiết hơn.

### Use concurrent data structures
Thêm một giải pháp khác là sử dụng các cấu trúc sẵn có hỗ trợ synchronized. Ví dụ: *ConcurrentHashMap*, *BlockingQueue*, *ConcurrentNavigableMap*...
```java
public class GameServer {
  public final Map<String, List<Player>> tables = new ConcurrentHashMap<String, List<Player>>();

  public void join(Player player, Table table) {
    if (player.getAccountBalance() > table.getLimit()) {
      List<Player> tablePlayers = tables.get(table.getId());
      
      synchronized (tablePlayers) {
        if (tablePlayers.size() < 9) {
          tablePlayers.add(player);
        }
      }
    }
  }

  public void leave(Player player, Table table) {/*do something*/}

  public void createTable() {
    Table table = new Table();
    tables.put(table.getId(), table);
  }

  public void destroyTable(Table table) {
    tables.remove(table.getId());
  }
}
```
Việc đồng bộ hóa giữa các method *join()* và *leave()* đã được đơn giản, vì chúng không cần khóa các *table* vì bản thân việc tạo và hủy *table* đã được thực hiện một cách đồng bộ bằng các method `createTable` và `destroyTable` trên cấu trúc `ConcurrentHashMap`. Tuy nhiên, chúng ta vẫn cần phải bảo vệ tính toàn vẹn của từng *tablePlayers*.

### Other tips and tricks
1. Hạn chế mức độ truy cập (*visibility* ) bằng cách thay đổi *access modifier* của các biến, đối tượng dùng để sử dụng *monitor*, tránh việc thay đổi, tranh chấp `lock` trên đối tượng này . Trong ví dụ trên, đổi tượng `tables` nếu có thể hãy để nó là `private` thay vì `public`

2. *Java concurrent package* còn rất nhiều thứ để giải quyết các vấn đề của *synchronization* giữa các *thread*,  tùy vào các chiến lược đồng bộ khác nhau, hãy tìm đến với các keyword: `Atomic`, `volatile`, `Lock`... 

**HAPPY CODING !**

Reference links:

https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html#jls-17.1

https://stackoverflow.com/a/6368211/3682565

https://plumbr.io/blog/locked-threads/improving-lock-performance-in-java