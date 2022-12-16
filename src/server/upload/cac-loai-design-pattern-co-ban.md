# Design Pattern (DP) là gì ?
Là developer, chúng ta chắc chắn đã, đang và sẽ phải gặp các vấn đề khó khăn cần phải đưa ra phương án giải quyết. Nhưng nếu vấn đề đó đã được những người khác giải quyết trước rồi thì sao? Thay vì tốn thời gian để suy nghĩ lại giải pháp từ đầu mà chưa chắc được tối ưu thì chúng ta nên sử dụng lại những cách thức mà đã được giải quyết, được đông đảo các developer trong cả cộng đồng công nhận.

Design Pattern về cơ bản là những mẫu thiết kế chung cho một giải pháp phần mềm. Nó sẽ là một bộ khung, đưa ra phương pháp giải quyết tối ưu cho 1 bài toán cụ thể.

# Lý do cần có Design Pattern
Một câu hỏi mà mọi developer đều đặt ra trước khi dùng đến DP đó là: Liệu nó có thực sự quan trọng ? Chúng ta sẽ không thể code được nếu thiếu nó ?

Câu trả lời thì đơn giản là: Không có DP vẫn code bình thường, nhưng nó có vai trò thực sự quan trọng. Có một số lí do chính sau đây:

- Tiết kiệm thời gian: liệu bạn có sẵn sàng bỏ ra rất nhiều thời gian để suy nghĩ cách giải quyết vấn đề khi mà câu trả lời đã có sẵn và được chứng minh tính hiệu quả qua rất nhiều developer khác? Ok, bạn có thể nói là sẵn sàng nghiên cứu lại, nhưng có lẽ sếp bạn sẽ nói không :D
- DP được biết đến rộng rãi: được sử dụng và công nhận trong cả cộng đồng dev toàn thế giới. Không khó hiểu khi giải pháp bạn chọn bởi DP có tính hiệu quả cao, cũng như bạn có thể dễ dàng giao tiếp với người khác vì đã có 1 thứ công cụ không khác gì một "ngôn ngữ chung" ở trong tay.
- Hầu hết các giải pháp đưa ra bởi DP đều khá đơn giản và có tính hiệu quả. Trong khi ta quyết định thực hiện lại theo 1 cách khác thì chưa chắc đã tốt được như vậy.

# Các loại pattern cơ bản

Có khoảng 26 loại DP, được nhóm vào 3 loại chính như sau:
1. **Creational** : Các dp thuộc nhóm này đều nhằm mục đích phục vụ việc khởi tạo của class. Cụ thể hơn thì sẽ chia ra làm "**class-creation patterns**" và "**object-creational patterns**".  **class-creation patterns** sẽ sử dụng việc kế thừa hiệu quả trong quá trình khởi tạo. Còn **object-creational patterns** sử dụng mô hình ủy quyền (delegation).
3. **Structural** : Các Dp thuộc nhóm này được thiết kế liên quan tới cấu trúc và thành phần của class. Mục tiêu là tăng chức năng của các class có liên quan mà không làm ảnh hưỏng tới nhiều thành phần đã có của nó.
4. **Behavioral** : Các Dp thuộc nhóm này thiết kế dựa trên khả năng tương tác, giao tiếp của 1 class với các thành phần khác.

# Ví dụ 
## Singleton (nhóm Creational)

Đây là DP khá phổ biến, được áp dụng nhiều ngay cả trong các framework hay lib.
Với Android, chúng ta sẽ gặp khá nhiều khi dùng Dagger để inject các đối tượng. Hay khi tương tác với đối tượng Calendar của Java, ta không thể khởi tạo instance cho nó mà phải gọi getInstance().

![](https://images.viblo.asia/12b19222-6c19-4c25-8b1b-a9de8542984b.png)

1 class sử dụng singleton sẽ có các thành phần sau:
- Biến static private, giữ 1 instance duy nhất của class.
- Private constructor, ngăn chặn việc khởi tạo từ những nơi khác.
- Public static method để trả về single instance ở trên.

### Singleton - Eager

```
public class EagerSingleton {
	// create an instance of the class.
	private static EagerSingleton instance = new EagerSingleton();

	// private constructor, so it cannot be instantiated outside this class.
	private EagerSingleton() {  }

	// get the only instance of the object created.
	public static EagerSingleton getInstance() {
		return instance;
	}
}
```
Single instance được khởi tạo trong quá trình load class.

### Singleton - Lazy

```
public class LazySingleton {
	// initialize the instance as null.
	private static LazySingleton instance = null;

	// private constructor, so it cannot be instantiated outside this class.
	private LazySingleton() {  }

	// check if the instance is null, and if so, create the object.
	public static LazySingleton getInstance() {
		if (instance == null) {
			instance = new LazySingleton();
		}
		return instance;
	}
}
```

Điểm khác biệt duy nhất, với lazy chỉ khi ta tường minh gọi function get thì single-instance mới được khởi tạo.

### Singleton - Thread-safe

Điều gì xảy ra khi có nhiều hơn một thread truy cập vào class singleton tại cùng 1 thời điểm ? Lúc đó check null đều là true, do đó 2 instance mới sẽ được tạo ra.
```
public class ThreadSafeSingleton {
	// initialize the instance as null.
	private static ThreadSafeSingleton instance = null;

	// private constructor, so it cannot be instantiated outside this class.
	private ThreadSafeSingleton() {  }

	// check if the instance is null, within a synchronized block. If so, create the object
	public static ThreadSafeSingleton getInstance() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
		return instance;
	}
}
```

Việc synchronize class cho phép giải quyết vấn đề trên. Tuy nhiên ta sẽ phải đánh đổi lại bằng hiệu suất. 

## Proxy (nhóm Structural)
Proxy thuộc nhóm Structural. Mục đích xây dựng Proxy pattern vì muốn tạo ra một đối tượng sẽ ủy quyền, thay thế cho một đối tượng khác.

Có thể liên tưởng đến Http proxy, nơi giao tiếp trung gian giữa user và môi trường internet, Proxy pattern sẽ hướng client đến việc sử dụng 1 class trung gian để giao tiếp với các thành phần đích và ngăn chặn việc tương tác trực tiếp. Ý nghĩa của nó thì tùy thuộc vào bài toán, có thể chặn để xử lý logic làm tăng hiệu suất, hay chặn để kiểm tra quyền truy cập, xử lý cache,...

Chúng ta sẽ đi vào 1 ví dụ sau. Hệ thống cung cấp 1 class CommandExecutor nhằm cho phép client truyền vào các lệnh để thực hiện. Tuy nhiên, cần phải có 1 cơ chế để ngăn chặn việc thực hiện các lệnh nguy hiểm. Ví dụ các member thì không được phép thực thi các lệnh xóa.

```
public interface CommandExecutor {
    public void runCommand(String cmd) throws Exception;
}
```

```
final public class CommandExecutorImpl implements CommandExecutor {
    protected CommandExecutorImpl() {

    }

    @Override
    public void runCommand(String cmd) throws IOException {
        //some heavy implementation
        Runtime.getRuntime().exec(cmd);
        System.out.println("'" + cmd + "' command executed.");
    }

}
```
Đây là class  impl chính. Proxy cuối cùng cũng gọi đến class này. Ở đây để có thể giảm bớt sự truy cập trực tiếp vào class này, ta có thể để là final class để tránh kế thừa. 

Tiếp theo constructor sẽ để protected. Ở bước tiếp theo ta tạo class Proxy sẽ cùng chung package với class này để có quyền tạo mới instance của nó.

```
public class CommandExecutorProxy implements CommandExecutor {

    private boolean isAdmin;
    private CommandExecutor executor;

    public CommandExecutorProxy(String user, String pwd){
        if("dattien".equals(user) && "abcxyz".equals(pwd)) isAdmin=true;
        executor = new CommandExecutorImpl();
    }

    @Override
    public void runCommand(String cmd) throws Exception {
        if(isAdmin){
            executor.runCommand(cmd);
        }else{
            if(cmd.trim().startsWith("rm")){
                throw new Exception("rm command is not allowed for non-admin users.");
            }else{
                executor.runCommand(cmd);
            }
        }
    }

}
```
Khi proxy đc khởi tạo sẽ check xem có phải admin thực hiện câu lệnh hay không.
Nếu đúng thì auto cho chạy lệnh. Còn nếu không thì phải check, là member không cho chạy lệnh xóa.

## Iterator (nhóm Behavioral)
Iterator chắc hẳn đã rất quyen thuộc với mọi người. Đây là dạng pattern cung cấp cách thức để duyệt qua 1 nhóm các Objects. Iterator được sử dụng rộng rãi trong Java Collection Framework, với target object là 1 collection.

Về nguyên tắc, iterator không chỉ cung cấp cách thức duyệt phần tử mà còn có thể tạo ra nhiều loại iterator khác nhau dựa trên yêu cầu bài toán.

Pattern này sẽ ẩn đi sự thực thi cụ thể của data, chỉ cung cấp cho client cách thức tương tác duy nhất là qua các function của iterator.

Ta có ví dụ sau. Ta có 1 danh sách các channel trên TV khác nhau. Client sẽ thực thi việc duyệt qua các data đó, có thể là lần lượt, và cũng có thể là theo type của channel (theo ngôn ngữ). Giả sử như có người chỉ thích xem kênh nào nói tiếng việt, nên chỉ muốn duyệt qua các kênh đó mà bỏ qua phần còn lại.

Ở ví dụ này:
+ Danh sách các channel chính là target object cần tương tác.
+ Iterator sẽ duyệt qua các phần tử đó, và có thể dựa theo channelType.

```
public enum ChannelTypeEnum {
    VIETNAMESE, ENGLISH, FRENCH, ALL;
}
```
```
public class Channel {
    private double frequency;
    private ChannelTypeEnum TYPE;

    public Channel(double freq, ChannelTypeEnum type){
        this.frequency=freq;
        this.TYPE=type;
    }

    public double getFrequency() {
        return frequency;
    }

    public ChannelTypeEnum getTYPE() {
        return TYPE;
    }
}
```
```
public interface ChannelCollection {
    public void addChannel(Channel c);

    public void removeChannel(Channel c);

    public ChannelIterator iterator(ChannelTypeEnum type);
}
```
```
public interface ChannelIterator {

    public boolean hasNext();

    public Channel next();
}
```
Ở trên ta đã định nghĩa ra POJO channel, đại diện cho kênh. Cùng với đó là các interface định nghĩa các function tương tác cho channel.

Nhìn vào ChannelCollection, ta thấy hoàn toàn không có function nào trả về list channel. Ta sẽ bắt client chỉ có thể tương tác thông qua iterator của nó.

```
public class ChannelCollectionImpl implements ChannelCollection {

    private List<Channel> channelsList;

    public ChannelCollectionImpl() {
        channelsList = new ArrayList<>();
    }

    public void addChannel(Channel c) {
        this.channelsList.add(c);
    }

    public void removeChannel(Channel c) {
        this.channelsList.remove(c);
    }

    @Override
    public ChannelIterator iterator(ChannelTypeEnum type) {
        return new ChannelIteratorImpl(type, this.channelsList);
    }

    private class ChannelIteratorImpl implements ChannelIterator {

        private ChannelTypeEnum type;
        private List<Channel> channels;
        private int position;

        public ChannelIteratorImpl(ChannelTypeEnum ty,
                                   List<Channel> channelsList) {
            this.type = ty;
            this.channels = channelsList;
        }

        @Override
        public boolean hasNext() {
            while (position < channels.size()) {
                Channel c = channels.get(position);
                if (c.getTYPE().equals(type) || type.equals(ChannelTypeEnum.ALL)) {
                    return true;
                } else
                    position++;
            }
            return false;
        }

        @Override
        public Channel next() {
            Channel c = channels.get(position);
            position++;
            return c;
        }

    }
}
```
Ở đây ta đã tạo ra logic duyệt channel dựa trên channel type của nó.

Nguồn:

https://sourcemaking.com/design_patterns

http://www.thedevpiece.com/design-patterns-that-every-developer-should-know/

https://www.freecodecamp.org/news/the-basic-design-patterns-all-developers-need-to-know/