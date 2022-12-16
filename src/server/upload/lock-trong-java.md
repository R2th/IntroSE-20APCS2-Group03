Lock là một cơ chế đồng bộ thread giống với synchronized block nhưng phức tạp hơn. Lock (và các cơ chế đồng bộ tiên tiến khác) được tạo thành bằng việc sử dụng synchronized block, nên không phải là chúng ta có thể hoàn toàn bỏ keyword đó đi.

Kể từ Java 5 package `java.util.concurrent.locks` có chứa rất nhiều các implementation của lock nên bạn không cần phải tự tạo ra lock của mình nữa. Nhưng bạn vẫn sẽ cần phải biết cách sử dụng chúng, và cũng sẽ tốt hơn nếu chúng ta hiểu được cơ chế đằng sau những implementation này. 

## Lock cơ bản

Hãy bắt đầu bằng việc xem đoạn code về synchronized block trong Java:

```
public class Counter{

  private int count = 0;

  public int inc(){
    synchronized(this){
      return ++count;
    }
  }
}
```

Hãy chú ý vào block `synchronized(this)` trong hàm `inc()`. Block này đảm bảo rằng chỉ một thread có thể được truy xuất và trả về ++count ở một thời điểm. Đoạn code trong synchronized block có thể phức tạp hơn trong những project thật nhưng ở ví dụ này chỉ cần `++count` là đủ để chúng ta tìm hiểu bản chất vấn đề rồi.

Class Counter có thể được viết lại thành thế này bằng cách sử dụng Lock thay vì synchronized block:

```
public class Counter{

  private Lock lock = new Lock();
  private int count = 0;

  public int inc(){
    lock.lock();
    int newCount = ++count;
    lock.unlock();
    return newCount;
  }
}
```

Hàm `lock()` khóa lại instance `Lock` nên tất cả các thread gọi đến `lock()` sẽ bị chặn cho đến khi `unlock()` được gọi đến.

Dưới đây là một implementation cơ bản của class `Lock`:

```
public class Lock{

  private boolean isLocked = false;

  public synchronized void lock()
  throws InterruptedException{
    while(isLocked){
      wait();
    }
    isLocked = true;
  }

  public synchronized void unlock(){
    isLocked = false;
    notify();
  }
}
```

Hãy để ý đến vòng lặp `while(isLocked)`, hay còn được gọi là "khóa xoay" (spin lock). Khóa xoay và các hàm `wait()` và `notify()` được miêu tả chi tiết hơn trong bài [Thread Signaling](http://tutorials.jenkov.com/java-concurrency/thread-signaling.html). Khi `isLocked` là `true`, thread gọi đến `lock()` sẽ được đưa vào hàng chờ với hàm `wait()`. Trong trường hợp thread cần trả về đột ngột từ hàm gọi `wait()` mà không cần chờ đến hàm `notify()` (được gọi là "đánh thức giả mạo" - [Spurious Wakeups](http://tutorials.jenkov.com/java-concurrency/thread-signaling.html#spuriouswakeups)), thread đó sẽ kiểm tra lại biến `isLocked` để xem nó đã được phép đi tiếp chưa. Nếu `isLocked` là `false`, thread đó sẽ thoát khỏi vòng lặp `while` sau đó set lại `isLocked` là `true`, để khóa lại instance của Lock dành cho những thread gọi đến hàm `lock()`, nếu có.

Khi một thread đã xong việc với đoạn code trong [critical section](http://tutorials.jenkov.com/java-concurrency/race-conditions-and-critical-sections.html) (đoạn code nằm giữa `lock()` và `unlock()`), thread đó sẽ gọi đến `unlock()`. `unlock()` khi được gọi đến sẽ set `isLocked` lại thành `false`, và thông báo (đánh thức) một trong những thread đang chờ trong lời gọi đến hàm `wait()` trong hàm `lock()`, nếu có.

## Lock Reentrance

Synchronized block trong Java có thể lặp lại. Điều đó có nghĩa là nếu một thread Java truy xuất vào một synchronized block, đồng nghĩa với việc khóa lại object giám sát của synchronized block đó, thread này sẽ có thể truy xuất bất cứ một synchronized block nào được đồng bộ bằng object nói trên. Dưới đây là ví dụ:

```
public class Reentrant{

  public synchronized outer(){
    inner();
  }

  public synchronized inner(){
    //do something
  }
}
```


Hãy chú ý là cả 2 hàm `outer()` và `inner()` đều được khai báo với từ khóa `synchronized`, trong Java thì nó tương ứng với block `synchronized(this)`. Nếu một thread gọi đến `outer()`, sẽ không có vấn đề gì nếu nó gọi `inner()` từ trong `outer()`, vì cả 2 hàm đều được đồng bộ trên cùng một object giám sát (`this`). Nếu một thread đã giữ khóa của một object giám sát, nó có khả năng truy xuất mọi synchronized block của object đó. Điều này được gọi là "reentrance". Một thread có thể tái truy xuất bất cứ một đoạn code nào mà nó đang nắm giữ khóa.

Implementation của `Lock` mà chúng ta đã xem ở đầu bài không phải là reentrance. Nếu chúng ta viết lại class `Reentrant` như dưới đây, thread nào gọi đến `outer()` sẽ bị chặn bởi hàm `lock.lock()` trong hàm `inner()`.

```
public class Reentrant2{

  Lock lock = new Lock();

  public outer(){
    lock.lock();
    inner();
    lock.unlock();
  }

  public synchronized inner(){
    lock.lock();
    //do something
    lock.unlock();
  }
}
```

Một thread gọi đến `outer()` đầu tiên sẽ khóa lại instance của `Lock`. Sau đó nó gọi đến `inner()`. Bên trong hàm `inner()`, thread đó sẽ một lần nữa thử khóa lại instance của `Lock`. Nó sẽ thất bại (nghĩa là thread sẽ bị chặn), bởi vì instance `Lock` lúc này đã bị khóa từ ngoài hàm `outer()` rồi.

Lý do thread bị chặn ở lần thứ hai nó gọi đến `lock()` mà không gọi đến `unlock()` trước đó sẽ rõ ràng hơn nếu chúng ta nhìn vào implementation của `lock()`:


```
public class Lock{

  boolean isLocked = false;

  public synchronized void lock()
  throws InterruptedException{
    while(isLocked){
      wait();
    }
    isLocked = true;
  }

  ...
}
```

Điều kiện trong vòng lặp `while` (khóa xoay) sẽ quyết định nếu một thread được phép thoát hàm `lock()` hay khộng. Hiện tại thì điều kiện đó là `isLocked` phải là `false`, bất kể thread nào thực hiện khóa.

Để làm cho class `Lock` trở thành reentrance chúng ta cần thay đổi một chút:

```
public class Lock{

  boolean isLocked = false;
  Thread  lockedBy = null;
  int     lockedCount = 0;

  public synchronized void lock()
  throws InterruptedException{
    Thread callingThread = Thread.currentThread();
    while(isLocked && lockedBy != callingThread){
      wait();
    }
    isLocked = true;
    lockedCount++;
    lockedBy = callingThread;
  }


  public synchronized void unlock(){
    if(Thread.curentThread() == this.lockedBy){
      lockedCount--;

      if(lockedCount == 0){
        isLocked = false;
        notify();
      }
    }
  }

  ...
}
```

Hãy chú ý là vòng lặp `while` (khóa xoay) giờ sẽ xem xét rằng thread nào đã khóa instance của `Lock`. Nếu khóa đã được mở (`isLocked = false`) hoặc thread gọi đến chính là thread đã khóa instance của `Lock`, vòng lặp `while` sẽ không được chạy, và thread gọi đến `lock()` sẽ được phép thoát khỏi hàm này.

Thêm nữa, chúng ta cần đếm số lần mà lock bị khóa bởi cùng một thread. Nếu không thì chỉ một lời gọi duy nhất đến `unlock()` sẽ mở khóa lock, kể cả khi lock đã được khóa rất nhiều lần. Chúng ta không muốn lock được mở khóa cho đến khi thread thực hiện khóa đã gọi đủ số hàm `unlock()` tương ứng với số hàm `lock()`.

Class `Lock` giờ đã trở thành reentrance.

## Tính công bằng

Synchronized block trong Java không đảm bảo về thứ tự gán truy xuất cho các thread. Vì thế, nếu có nhiều thread cùng đồng thời yêu cầu truy xuất đến cùng một synchronized block, có một vấn đề có thể xảy ra là một hoặc nhiều thread sẽ không bao giờ được gán quyền truy xuất - quyền truy xuất sẽ luôn được gán cho những thread khác. Điều đó được gọi là "chết đói" (starvation). Để tránh việc này thì `Lock` cần phải công bằng. Do implementation của `Lock` ở trên có sử dụng synchronized block, nó không đảm bảo được tính công bằng. Chết đói và tính công bằng được thảo luận kỹ hơn ở bài [Starvation and Fairness](http://tutorials.jenkov.com/java-concurrency/starvation-and-fairness.html).

## Gọi `unlock()` trong `finally`

Khi bảo vệ một critical section với `Lock`, và critical section đó có thể ném ra exception, chúng ta cần phải nhớ việc gọi đến `unlock()` trong `finally`. Điều đó sẽ đảm bảo rằng `Lock` được mở khóa để các thread khác có thể khóa lại. Dưới đây là một ví dụ: 

```
lock.lock();
try{
  //do critical section code, which may throw exception
} finally {
  lock.unlock();
}
```

Làm như trên sẽ đảm bảo là `Lock` được mở khóa trong trường hợp một exception được ném ra từ đoạn code nằm trong critical section. Nếu `unlock()` không được gọi trong mệnh đề `finally`, một exception ném ra từ critical section sẽ làm cho `Lock` bị khóa vĩnh viễn, dẫn đến mọi thread gọi đến `lock()` sẽ không bao giờ chạy tiếp được nữa.

Bài viết được dịch từ [Locks in Java](http://tutorials.jenkov.com/java-concurrency/locks.html).