Là một lập trình viên, nhiệm vụ của chúng ta là giải quyết các bài toán được đưa ra. Rất nhiều bài toán đã được giải quyết bởi các lập trình viên khác, vậy tại sao chúng ta cần giải quyết lại chúng. Chúng ta đều không muốn "phát minh lại bánh xe". Design pattern sẽ giúp giải quyết vấn đề này. Hãy cùng tìm hiểu một số design pattern mà chúng ta nên biết thông qua các ví dụ để hiểu rõ hơn về chúng.
# 1. Singleton
- Đây là design pattern được sử dụng khá phổ biến. Rất nhiều framwork sử dụng design pattern này. Pattern này được sử dụng khi ta muốn tạo một object từ một class và muốn chắc chắn rằng chỉ có một object được tạo từ nó. Implement cho design pattern này
``` java
   public class SingletonSample {
       private static SingletonSample instance = null;

       private SingletonSample() {
       }

       public static SingletonSample getInstance() {
          if(instance == null) {
             instance = new SingletonSample();
          }
          return instance;
       }
}
```
Một construtor được khởi tạo private để tránh truy cập từ bên ngoài vào. Cũng cần phải tạo một biến static và method getInstance() đảm bảo rằng chỉ một instance của class được tạo ra.
# 2. Initialization On Demand Holder
Pattern này khá giống với Singleton bên trên nhưng nó có một ưu điểm hơn đó là khi là việc với thread thì pattern này sẽ giúp thread safe, trường hợp của singleton nếu không xử lý đồng bộ có thể tạo 2 instance khác nhau. Ví dụ với Initialization On Demand Holder như sau: <br>
``` java
    public class SingletonSample {
        private SingletonSample() {
        }

        public static SingletonSample getInstance() {
            return SingletonSampleHolder.INSTANCE;
        }

        private static class SingletonSampleHolder {
            private static final SingletonSample INSTANCE = new SingletonSample();
        }
    }
```
Đúng với cái tên của pattern này thì nó sẽ không khởi tạo của instance cho đến khi method getInstance() được gọi, với ưu điểm này thì nó giúp thread safe.
# 3. Strategy và factory pattern
- 2 pattern này được sử dụng rất phổ biến, hãy xem xét ví dụ khi chúng được kết hợp cùng nhau
``` java
    // một interface building
    public interface Building {
        String getType();
    }
    
    // class biểu diễn cho cái nhà
    public class House implements Building {
        public String getType(){
            return "house"
        }
    }
    
    // class biểu diễn cho lâu đài
    public class Edifice implements Building {
        public String getType(){
            return "edifice"
        }
    }
    
    public class BuildingFactory {
        private static Map<String, Building> instances;

        static {
            instances = new HashMap<>();

            instances.put("house", new House());
            instances.put("edifice", new Edifice());
        }

        public static <T extends Building> T getBuilding(String type){
            return (T) instances.get(type); 
        }
    }
    // Khởi tạo object
    Building building = BuildingFactory.getBuilding("house");
```

Nếu cần một loại building nào đấy, ta chỉ cần truyền vào loại và nó sẽ trả về object của loại đó hoặc null nếu như không có instance cho loại này, nó sẽ rất hữu ích trong trường hợp sử dụng đa hình .
# 4. Chain of responsibility
Khi build một ứng dựng với nhiều logic xử lý nghiệp vụ, có rất nhiều logic phức tạp đằng sau phải thực thi, sự phức tạp này có thể khiến code khó hiểu cũng như khó theo dõi, log bug ... Pattern này sẽ giúp code của ta có thể được chia nhỏ thành từng phần và quản lý chúng theo từng bước tuần tự. <br>
``` java
    public interface Command<T>{
        boolean execute(T context);
    }
    public class FirstCommand implements Command<Map<String, Object>>{
        public boolean execute(Map<String, Object> context){
            //doing something in here
        }
    }
    public class SecondCommand implements Command<Map<String, Object>>{
        public boolean execute(Map<String, Object> context){
            //doing something in here
        }
    }
    public class Chain {
        public List<Command> commands;

        public Chain(Command... commands){
            this.commands = Arrays.asList(commands);
        }

        public void start(Object context){
            for(Command command : commands){
                boolean shouldStop = command.execute(context);

                if(shouldStop){
                    return;
                }
            }
        }
    }
    Chain chain = new Chain(new FirstCommand(), new SecondCommand());
    Map<String, Object> context = new HashMap<>();
    context.put("some parameter", "some value");
    chain.start(context);
```

Chúng ta đã chia nhỏ code khi implement method của interface Commands và tách logic sử lý nó vào một chỗ. Ta cũng có thể sắp xếp lại code nếu muốn để làm code decoupled hơn.
# 5. Builder
- Rất nhiều class khi tạo một object cần phải truyền vào rất nhiều tham số, trong trường hợp như vậy thì khi ta sử dụng contructor hoặc sử dụng get, set đều khiến code trở nên khá rối và dài dòng. Builder pattern sẽ giúp ta giải quyết vấn đề này. Hãy xem xét ví dụ <br>
``` java
    // Ta có một class Product
    public class Product {
        private String id;
        private String name;
        private String description;
        private Double value;

        private Product(Builder builder) {
            setId(builder.id);
            setName(builder.name);
            setDescription(builder.description);
            setValue(builder.value);
        }

        public static Builder newProduct() {
            return new Builder();
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Double getValue() {
            return value;
        }

        public void setValue(Double value) {
            this.value = value;
        }

        // định nghĩa một inner class bên trong class product

        public static final class Builder {
            private String id;
            private String name;
            private String description;
            private Double value;

            private Builder() {
            }

            public Builder id(String id) {
                this.id = id;
                return this;
            }

            public Builder name(String name) {
                this.name = name;
                return this;
            }

            public Builder description(String description) {
                this.description = description;
                return this;
            }

            public Builder value(Double value) {
                this.value = value;
                return this;
            }

            public Product build() {
                return new Product(this);
            }
        }
    }
    // Khi muốn tạo một object ta chỉ cần khai báo như sau
    Product product = Product.newProduct()
                       .id(1l)
                       .description("TV 46'")
                       .value(2000.00)
                       .name("TV 46'")
                   .build();
    // nhìn vào có thể thấy code khá dễ hiểu trong việc mô tả các trường trong trường hợp cần nhiều biến cần truyền vào
```
# 6. Template method
Pattern này được áp dụng trong trường hợp chúng ta có nhiều method chung nhưng khác nhau về hành vi của chúng, pattern này thì hoàn toàn dựa trên tính đa hình.
``` java
    public abstract class Animal {
        public abstract void makeSound();
        public abstract void eatFood();
        public abstract void sleep();

        public void doEveryday(){
            makeSound();
            eatFood();
            sleep();
        }
    }
    
    public class Dog extends Animal {
        public void makeSound(){
            //bark!
        }

        public void eatFood(){
            //eat dog food
        }

        public void sleep(){
            //sleep a lot!
        }
    }
```
# 7. State
- Rất nhiều object có trạng thái riêng của chúng. Ví dụ như đài radio có 2 trạng thái là bật(on) và tắt(off). Chúng ta sẽ biểu diễn nó dưới dạng hướng đối tượng <br>
``` java
    // một interface cho trạng thái của radio
    public interface RadioState {
        void execute(Radio radio);
    }
    
    // class radio
    public class Radio {
        private boolean on;
        private RadioState state;

        public Radio(RadioState state){
            this.state = state;
        }

        public void execute(){
            state.execute(this);
        }

        public void setState(RadioState state){
            this.state = state;
        }

        public void setOn(boolean on){
            this.on = on;
        }

        public boolean isOn(){
            return on;
        }

        public boolean isOff(){
            return !on;
        }
    }
    // 2 class cho trạng thái của radio
    public class OnRadioState implements RadioState {
        public void execute(Radio radio){
            //throws exception if radio is already on
            radio.setOn(true);
        }
    }
    
    public class OffRadioState implements RadioState {
        public void execute(Radio radio){
            //throws exception if radio is already off
            radio.setOn(false);
        }
    }
    
    // Khi thực thi kết quả như sau
    Radio radio = new Radio(new OffRadioState()); //initial status
    radio.setState(new OnRadioState());
    radio.execute(); //radio on
    radio.setState(new OffRadioState());
    radio.execute(); //radio off
```
Ví dụ trên có thể đơn giản nhưng trong trường hợp có nhiều trạng thái có thể sẽ giúp ích rất tốt, ví dụ chúng ta có thể đặt điều kiện cho trạng thái, một trạng thái được chuyển khi một trạng thái khác được thực thi, ví dụ trong trường hợp trên là trạng thái on chỉ được thực thi khi đã có trạng thái off nếu không sẽ có ngoại lệ được bắn ra, ta cũng có thể thực thi bất kỳ nghiệp vụ nào mà ta muốn.
# 8. Kết luận
Trên đây là những kiến thức tìm hiểu về một số pattern hữu ích thông qua các ví dụ. Hi vọng bài viết sẽ có ích cho mọi người. Nếu có gì góp ý hay thảo luận hãy để lại bình luận phía dưới.  Hẹn gặp lại (seeyou)

# Reference
https://medium.com/educative/the-7-most-important-software-design-patterns-d60e546afb0e
http://www.thedevpiece.com/design-patterns-that-every-developer-should-know/
https://www.tutorialspoint.com/design_pattern/index.htm