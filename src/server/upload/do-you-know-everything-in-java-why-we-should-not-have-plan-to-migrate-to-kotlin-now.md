# Context
Công nghệ đang phát triển chóng mặt trong thời đại hiện nay. Là dân lập trình, chúng ta cần phải luôn đổi mới tư duy và bắt kịp công nghệ để không bị tụt lại ở phía sau. Tuy nhiên, không phải chúng ta luôn luôn chạy theo công nghệ, chạy theo cái mới khi bản thân chưa nắm thực sự vững chắc về những cái mà ta nghĩ rằng mình đã thông thạo, đã có kinh nghiệm. Theo ý kiến chủ quan, tôi luôn đánh giá cao việc nghiên cứu và nắm vứng một công nghệ, một ngôn ngữ nền tảng mà bản thân chúng ta xác định sẽ sống mái với nó lâu dài trước khi nghĩ đến việc sẽ chuyển sang nghiên cứu một công nghệ mới. Nếu chạy theo công nghệ mới, chúng ta mãi mãi như người " đẽo cầy giữa đường" khi lạc lối không biết bản thân thực sự mạnh về điểm nào, có value ở điểm nào nhất và nhà tuyển dụng cũng không tìm thấy lý do thực sự thuyết phục nào để offer bạn.

Tôi đã tiếp xúc với Java khá lâu, từ trên giảng đường Đại học đến nay đi làm được vài năm, tôi vẫn tiếp xúc với nó hằng ngày. Tuy nhiên, bản thân tôi chưa tự tin rằng mình biết và hiểu hết về nó, thậm chí tôi chưa tự tin rằng mình biết nhiều về nó, bởi học một ngôn ngữ để làm được việc thì dễ, nhưng hiểu sâu nó là một chuyện học cả đời. *Kotlin* ra đời như sự thay thế cho Java, trước mắt là mảng lập trình mobile cho Android. Mạnh mẽ, đơn giản, hiệu năng cao, người ta đổ xô vào nghiên cứu và học nó như một xu hướng mới trong lập trình Android mobile, nhưng ở thời điểm hiện tại, tôi chưa dám áp dụng nó, bởi nhiều lý do mà tôi đã nhắc đến ở trên. **Tôi chưa tự tin về kiến thức Java của mình**.

Ở bài viết này tôi sẽ trình bày một số khái niệm cơ bản trong Java mà mọi lập trình viên đều nên biết, các bạn hãy thử chấm điểm cho mình được bao nhiêu và biết mình đang ở vị trí nào nhé.

# Thread Interference - 1point
Khái niệm này mô tả sự xen lẫn giữa các thread trong khi một thread khác đang access đến một biến và đang làm việc với biến đó, xảy ra khi một thread invoke một *non-atomic method* - một khái niệm sẽ bàn đến ở phần sau. Đến với ví dụ bên dưới:

```
public static void main(String[] args) {
    final Counter counter = new Counter();
    new Thread() {
        public void run() {
            counter.increase();
        };
    }.start();

    new Thread() {
        public void run() {
            counter.decrease();
        };
    }.start();
}

public static class Counter {

    private int count;

    public void increase() {
        count++;
    }

    public void decrease() {
        count--;
    }

}
```
    
Có một điều mà các bạn cần chú ý : Phép `++` or `--` thực chất là 3 operation

1. Đọc biến count từ memory.
1. Tăng/giảm giá trị lấy được 1 đơn vị.
1. Gán nó lại vào biến count.

Và khi run chương trình này, các action xảy ra có thể theo trình tự bên dưới

    1. Thread 1 đọc biến count từ memory bằng 0
    2. Thread 2 đọc biến count từ memory bằng 0
    3. Thread 1 tăng giá trị đọc được lên 1
    4. Thread 2 giảm giá trị đọc được về -1
    5. Thread 1 gán giá trị đó vào count bằng 1
    6. Thread 2 gán giá trị đó vào count bằng -1

Dễ dàng nhận thấy, các thread access biến count một cách xen kẽ nhau, và dẫn đến việc biến count cuối cùng sẽ có giá trị là **-1** chứ không phải là 1 nữa. Khái niệm này trong Java gọi là **Thread Interference**. 

# Memory Consistency Errors - 1point
Khái niệm này mô tả một lỗi bất đồng nhất mà 2 thread nhìn thấy từ một biến là khác nhau, điều này dẫn đến một số side effect rất khó để trace ra. 

![](https://images.viblo.asia/0535c1ab-20bf-4a75-a91d-1624706baf1d.png)

Ngày nay, phần lớn các CPU đều đa lõi, mỗi lõi đều có một cache riêng (Chúng ta thường hay nghe về L1 cache và L2 cache). Khi một biến được access từ nhiều thread khác nhau ở những CPU (core) khác nhau, chúng sẽ được copy một bản vào cache của CPU vì vấn đề tối ưu performance, đều đó dẫn đến tình trạng sự thay đổi giá trị của biến ở thread này không được visible ở thread khác dẫn đến sự sai khác về giá trị của cùng một biến ở những thread khác nhau. Khái niệm này trong Java gọi là **Memory Consistency Errors**.

Trong Java còn có một khái niệm khác gọi là **Happens-Before Relationship**. Khái niệm này mô tả một relationship giữa những statement ở những thread khác nhau cùng access đến một biến, đảm bảo rằng sự thay đổi biến ở statement này sẽ luôn được visible đến những statement ở thread khác. Do đó, việc đảm bảo một *happens-before relationship* trong java cực kỳ quan trọng khi làm việc với multi threading.

```
private static int value = 0;

public static void main(String[] args) {
    new ChangeListener().start();
    new ChangeMaker().start();
}

static class ChangeListener extends Thread {
    @Override
    public void run() {
        int local_value = value;
        while (local_value < 5) {
            if (local_value != value) {
                System.out.println("Got change to value is " + value);
                local_value = value;
            }
        }
    }
}

static class ChangeMaker extends Thread {
    @Override
    public void run() {
        int local_value = value;
        while (value < 5) {
            System.out.println("Increase value to " + ++local_value);
            value = local_value;
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```
    
Ở ví dụ trên, ta sẽ thấy kết quả được in ra như sau:

    1. Increase value to 1
    1. Increase value to 2
    1. Increase value to 3
    1. Increase value to 4
    1. Increase value to 5

![](https://images.viblo.asia/8b80fddb-bae9-4842-982a-90287d96adce.png)

Thread `ChangeMaker` thực hiện modify biến value nhưng `ChangeListener` hoàn toàn không thấy được điều đó. Để giải quyết vấn đề này, chúng ta cần tạo ra một *happens-before relationship* giữa 2 thread này bằng nhiều cách khác nhau, một trong những cách đó là dùng từ khóa `volatile`.

# Volatile - 1point
**Volatile** sử dụng để tạo ra một *happens-before relationship* giữa các statement được thực hiện trên những thread khác nhau, đảm bảo rằng các biến luôn được visible ở các statement ở thread khác khi một statement ở thread này modify biến đó. 

Bằng cách define một biến với từ khóa `volatile`, ta có thể xác nhận rằng biến này sẽ được nhìn thấy ở những thread khác nhau với cùng một giá trị. Sở dĩ nó làm được việc này vì khi một statement modify một biến `volatile`, nó sẽ viết trực tiếp biến này vào bộ nhớ mà không phải thông qua CPU cache, điều này ít nhiều làm ảnh hưởng performance của ứng dụng.

Chạy lại đoạn code trên với biến volatile được sử dụng để khai báo value.

    Increase value to 1
    Got change to value is 1
    Increase value to 2
    Got change to value is 2
    Increase value to 3
    Got change to value is 3
    Increase value to 4
    Got change to value is 4
    Increase value to 5
    Got change to value is 5

![](https://images.viblo.asia/992c7bc9-3db9-4d98-a885-cf4458342fb5.png)

# Synchronized - 2 point
Một cách khác để tạo happens-before relationship là sử dụng từ khóa synchronized. Chúng ta thường xem xét đến 2 cách sử dụng cụ thể của synchronized keyword.

### 1. Synchonized method
Thỉnh thoảng, bạn thấy một số phương thức được định nghĩa như sau

```
public synchronized void increase() {
        count++;
   }
```
        
hay 

```
public static  synchronized void increase() {
        count++;
   }
```
        
Cách định nghĩa này là `synchronized` method. Các thread khác nhau khi access method này sẽ không thể access một cách đồng thời mà phải theo một thứ tự nhất định mà chúng ta sẽ nói tiếp ở phần sau với khái niệm **mornitor lock** hay **intrisic lock**. 
Đến với ví dụ bên dưới:

```
public static void main(String[] args) {

    final Sender sender = new Sender();
    new SendThread("1", sender).start();
    new SendThread("2", sender).start();
    new SendThread("3", sender).start();
}

public static class Sender {

    private int count;

    public void send() {
        count++;
        System.out.println("Thread " + Thread.currentThread().getName() + " sending message count " + count);
        try {
            Thread.sleep(1000);
        } catch (Exception e) {
            System.out.println("Thread  interrupted.");
        }
        System.out.println(
                "Thread " + Thread.currentThread().getName() + " message count " + count + " is deliveried");
    }

}

public static class SendThread extends Thread {

    private Sender sender;

    public SendThread(String name, Sender sender) {
        super(name);
        this.sender = sender;
    }

    @Override
    public void run() {
        sender.send();
    }

}
```
    
Khi run đoạn code này,  bạn sẽ thấy kết quả như sau : 

    Thread 1 sending message count 1
    Thread 2 sending message count 2
    Thread 3 sending message count 3
    Thread 1 message count 3 is deliveried
    Thread 2 message count 3 is deliveried
    Thread 3 message count 3 is deliveried

Result ở trên cho thấy cả 3 thread cùng access đến method `send()` cùng một lúc, dẫn đến sau khi `Thread.sleep(1000);` thì biến `count` được in ra cùng một lúc và giá trị lúc này bằng 3. 
Nếu dùng `synchronized` cho methdod `send()`, ta sẽ thấy chúng được thực hiện lần lượt và kết quả như sau

    Thread 1 sending message count 1
    Thread 1 message count 1 is deliveried
    Thread 3 sending message count 2
    Thread 3 message count 2 is deliveried
    Thread 2 sending message count 3
    Thread 2 message count 3 is deliveried

### 2. Synchonized statement
Có một khái niệm trong java liên quan đến synchronization đó là **intrisic lock** (hay còn gọi là **mornitor lock**). Cơ chế của `synchronized` là khi một thread access một method, nó sẽ chiếm lấy lock này và chỉ release sau khi method này được return hoặc statement được thực thi xong. Khi một thread chiếm lấy một *intrisic lock*, không có thread nào khác có thể access được những method sử dụng chung một *intrisic lock* này cho tới khi nó được release. Vậy nếu các thread access cùng lần, thread nào sẽ được quyền chiếm lấy intrisic lock này? Câu trả lời là dựa vào **Thread Priority**.

Ở ví dụ `synchronized` method ở trên, nó tương đương với việc synchonized statement với monitor là Object instance hiện tại. Được biểu diễn như sau

```
public void increase() {
    synchronized (this) {
        count++;
    }
}
```
    
Đối với static method sẽ là 

```
public void increase() {
    synchronized (Foo.class) {
        count++;
    }
}
```
    
*Synchronized statement* khó hơn method nhưng chúng đặt ra thách thức cùng tính linh hoạt khi làm việc với multi threading. Đến với ví dụ bên dưới

```
public void addName(String name) {
    synchronized(this) {
        lastName = name;
        nameCount++;
    }
    nameList.add(name);
}
```

Chúng ta chỉ cần `synchronized` 2 variable là `lastName` và `nameCount`, và tránh việc `synchronized` variable `nameList` vì một lý do gì đó ví dụ như performance chẳng hạn. Cách implement trên là tối ưu và hiệu quả hơn cả.

#### Chú ý
Khi dùng `synchronized(this)` vì nó thực tế sử dụng monitor chính là object instance chứa method này. Trong thực tế, đôi khi có những biến không bao giờ access cùng nhau trong một method, nếu chúng ta lạm dụng cách `synchronized` này sẽ gây ảnh hưởng performance của ứng dụng. Giả sử ta có 2 biến `A` và `B` không bao giờ được access cùng lúc trong 1 method, và 2 method `setA()` và `setB()` để update value cho 2 biến này. Chúng ta sử dụng `synchronized(this)` ở cả 2 method và vô tình khi một thread access `setA()`, nó sẽ block tất cả method sử dụng chung khóa intrisic lock cho tới khi lock này được release sau khi method `setA()` được thực thi xong, vô tình `setB()` sẽ bị block không thể truy cập được từ một thread khác, điều này là bad performance.

# Deadlock - 1point
Khái niệm này trong Java định nghĩa khi một hay nhiều thread bị block mãi mãi, do chờ đợi những thread khác release lock. Đến với ví dụ bên dưới:

```
public class Deadlock {
    static class Friend {
        private final String name;
        public Friend(String name) {
            this.name = name;
        }
        public String getName() {
            return this.name;
        }
        public synchronized void bow(Friend bower) {
            System.out.format("%s: %s"
                + "  has bowed to me!%n", 
                this.name, bower.getName());
            bower.bowBack(this);
        }
        public synchronized void bowBack(Friend bower) {
            System.out.format("%s: %s"
                + " has bowed back to me!%n",
                this.name, bower.getName());
        }
    }

    public static void main(String[] args) {
        final Friend alphonse =
            new Friend("Alphonse");
        final Friend gaston =
            new Friend("Gaston");
        new Thread(new Runnable() {
            public void run() { alphonse.bow(gaston); }
        }).start();
        new Thread(new Runnable() {
            public void run() { gaston.bow(alphonse); }
        }).start();
    }
}
```

# Atomic access - 1point
Chúng ta thường nghe đến khái niệm này khi nhắc đến **Atomic variable** ví dụ như `AtomicLong`, `AtomicBoolean` ... thường được sử dụng khi làm việc với multi threading. Trong java, *Atomic action* là khái niệm mô tả hành động chỉ thực thi tất cả trong một lần, nó không thể bị stop hay xen vào giữa chừng khi đang thực thi, một là thực thi hoàn tất, hai là không thực thi.

Nghe có vẻ khá trừu tượng. Một vài ví dụ thực tiễn như *getter*/*setter* methods là những *Atomic Action*. Và statement `count++` trong các ví dụ trên **hoàn toàn không phải** là Atomic.

* Read và Write là Atomic cho các biến reference hoặc kiểu dữ liệu nguyên thủy (**ngoại trừ double và long**) 
* Read và Write là Atomic cho tất cả các biến `volatile`, **kể cả long và double**.

Bởi vì *Atomic* không thể bị stop hay xen vào giữa khi đang thực thi, do đó chúng ta hoàn toàn yên tâm có thể loại bỏ trường hợp *Thread Interference* đã được nhắc đến ở trên, tuy nhiên *Memory Consistency Errors* thì có thể xảy ra. Giải pháp đưa ra là sử dụng `volatile`.

Các bạn có thể inspect Java code các class Atomic và nghiên cứu thêm về vấn đề này nhé. 

#### Chú ý
Sử dụng `volatile` sẽ hiệu quả hơn so với việc access các biến này thông qua một  `synchonized` statement/method, tuy nhiên trong nhiều trường hợp cần xử lý tuần tự thì `synchronized` là một lựa chọn không thể thay thế.

#### Tại sao Read và Write là Atomic cho các biến reference hoặc kiểu dữ liệu nguyên thủy (ngoại trừ double và long) ?
Chúng ta đều biết rằng kiến trúc CPU hiện nay có 2 loại là 32 bit và 64 bit, và hệ điều hành (OS) được viết để support các kiến trúc CPU này, chúng ta vẫn thường nghe OS 32 bit, OS 64 bit. Tương tự như vậy cũng có các ứng dụng 32 bit, 64 bit. JVM cũng vậy, cũng là một phần mềm, do đó nó có JVM 32 bit và JVM 64 bit. Giả sử OS run trên kiến trúc CPU 32 bit thì bắt buộc JVM tương ứng phải là JVM 32 bit, điều này khiến cho việc write một biến double/long (64 bit) sẽ chia làm 2 action write riêng biệt 32 bit, do đó nó không còn là atomic action nữa. Tuy nhiên, nếu JVM 64 bit thì việc write biến double/long vẫn là atomic action. 

# Conclusion
Qua bài viết này, tôi đã giới thiệu đến các bạn các khái niệm khi làm việc multi threading trong Java. Các bạn hãy thử xem mình nắm rõ được bao nhiêu trong các vấn đề nêu trên? Hãy tự chấm điểm cho mình nhé.

* 1/7 : Kiến thức Java còn sơ sài lắm.
* 2/7 : Bạn phải cố gắng nhiều hơn nữa để hiểu về Java.
* 3/7 : Bạn đã nắm được nhiều khái niệm nhưng chưa đủ.
* 4/7 : Bạn đã làm việc và hiểu về ngôn ngữ này kha khá rồi đó.
* 5/7 : Bạn đã nắm được rất nhiều điểm quan trọng về Java.
* 6/7 : Bạn đã hiểu Java khá nhiều rồi đó.
* 7/7 : Bạn đã hiểu Java rất nhiều đó