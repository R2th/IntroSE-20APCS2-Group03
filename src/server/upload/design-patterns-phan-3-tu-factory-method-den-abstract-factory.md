![](https://images.viblo.asia/09318985-e6e1-411b-afd1-44c830ebdc92.png)

Chào mừng các bạn đã tới với phần 3 của series **[Cùng học Design Patterns](https://viblo.asia/s/cung-hoc-design-patterns-z45bx8zqZxY)**. Hôm nay chúng ta cùng nhau tìm hiểu 2 pattern tiếp theo trong `Creational Design Pattern` đó chính là **Factory Method** và **Abstract Factory**. Không luyên thuyên nữa, mình sẽ cùng các bạn chinh phục pattern này trong hôm nay. 
Lét gô..ô...ô...

# 1. Tổng quan
- **Abstract Factory** là một pattern cung cấp một interface để tạo ra tập các đối tượng liên quan nhau hoặc phụ thuộc mà không chỉ định các class cụ thể của chúng.
- Nó là phương pháp tạo ra một Super-Factory dùng để tạo ra các Factory khác. Hay còn được gọi là Factory của các Factory.
- Abstract Factory Pattern là một Pattern cấp cao hơn so với Factory Method Pattern.
- Hãy tưởng tượng, Abstract factory như là một nhà máy lớn chứa nhiều nhà máy nhỏ, trong các nhà máy đó có những xưởng sản xuất, các xưởng đó tạo ra những sản phẩm khác nhau.
- Vì Abstract Factory là pattern cao cấp hơn Factory Method Pattern nên trước khi đi sâu vào Abstract Factory thì chúng ta hãy qua mục 2 để tìm hiểu về Factory Method Pattern nhé.

# 2. Tìm hiểu về Factory Method Pattern
- **Factory Method Pattern** đúng nghĩa là một **"nhà máy sản xuất"** các đối tượng theo yêu cầu của người dùng mà không để lộ logic ở phía người dùng. Pattern này tham chiếu đến đối tượng được tạo ra thông qua một `interface` chung.
- Factory Pattern được sử dụng khi có một class cha (super-class) với nhiều class con (sub-class), dựa trên đầu vào và phải trả về 1 trong những class con đó.
### 2.1 Đặt vấn đề
- **Bài toán đặt ra:** Giả sử chúng ta thực hiện xây dựng một ứng dụng để quản lý vận chuyển hàng hóa. Ban đầu chỉ quản lý vận chuyển bằng xe tải. Tuy nhiên sau 1 thời gian, khách hàng có tiền, muốn mở rộng vận chuyển bằng tàu thủy thì ta phải làm sao trong khi code ban đầu được viết để cho 1 phương tiện duy nhất là xe tải. Muốn thêm tàu thủy vào thì sẽ ảnh hưởng lớn và thay đổi codebase khá nhiều. Hơn nữa nếu sau này khách hàng muốn đưa thêm phương tiện vận chuyển vào ứng dụng thì chúng ta phải làm sao ? 
 ![image.png](https://images.viblo.asia/ea4f4ebf-da09-4555-bf01-eb5e6a066b95.png)
 
    **==>** Kết quả là, bạn sẽ nhận được mã khá khó chịu, có nhiều điều kiện thay đổi hành vi của ứng dụng tùy thuộc vào loại đối tượng vận chuyển.
### 2.2 Phương án giải quyết:
- Chúng ta sẽ tạo ra 1 `class Factory` nhằm xem đối tượng sẽ khởi tạo là đối tượng nào dựa vào tham số đầu vào. Trong bài toán này thì sẽ tạo ra đối tượng `Truck` hoặc `Ship` thông qua tham số đầu vào.
- Vì bài toán quản lý vận chuyển, mỗi phương tiện lại có kiểu di chuyển khác nhau nên chúng ta cần có 1 `class abstract` hoặc `interface` để chứa các phương thức chung. Trong bài toàn thì chúng ta sẽ tạo ra 1 phương thức trừu tượng `deliver()`
- Khi chúng ta đã tạo được đối tượng chúng ta cần thông qua `class Factory` thì chúng ta sẽ cho đối tượng này thực thi phương thức chung theo cách riêng của từng đối tượng. Trong ví dụ thì đối tượng `Truck` sẽ vận chuyển theo `RoadTransport` còn `Ship` thì vận chuyển theo `SeaTransport`
![image.png](https://images.viblo.asia/554f92ae-4f29-46be-8aca-55c72b171106.png)
### 2.3 Mời các bạn tham khảo đoạn code sau:
- **Code Kotlin**
```kotlin
    interface Transport{
        fun deliver()
    }

    enum class TransportType{
        TRUCK, SHIP;
    }

    class TransportFactory{

        companion object{
            fun getTransport(type: TransportType) : Transport =
            when(type){
                TransportType.TRUCK ->  Truck()
                TransportType.SHIP ->   Ship()
            }
        }
    }

    class Truck : Transport{
        @Override
        override fun deliver(){
            println("RoadTransport")
        }
    }

    class Ship : Transport{
        @Override
        override fun deliver(){
            println("SeaTransport")
        }
    }

    fun main(){
        val transport = TransportFactory.getTransport(TransportType.TRUCK)
        transport.deliver() // RoadTransport
    }
```

- **Code Java**
```java
    interface Transport{
        void deliver();
    }

    enum TransportType{
        TRUCK, SHIP
    }

    class TransportFactory{
        private TransportFactory() { }

        public static final Transport getTransport(TransportType transportType) {
            switch (transportType) {
                case TRUCK:
                    return new Truck();
                case SHIP:
                    return new Ship();
                default:
                    throw new IllegalArgumentException("This Transport type is unsupported");
            }
        }
    }

    class Truck implements Transport {
        @Override
        public void deliver() {
            System.out.println("RoadTransport");
        }
    }

    class Ship implements Transport {
        @Override
        public void deliver() {
            System.out.println("SeaTransport");
        }
    }

    public class Client {
        public static void main(String[] args) {
            Transport transport = TransportFactory.getTransport(TransportType.SHIP);
            transport.deliver(); //SeaTransport
        }
    }    
```

### 2.4 Các thành phần của Factory Pattern
- Một Factory Pattern thường sẽ bao gồm các thành phần cơ bản như sau:
    + **Một Super Class hoặc 1 interface**: Chúng ta cần `1 abstract class` hoặc `1 class cha bình thường`, đôi khi là `interface ` để chứa những phương thức chung mà các đối tượng thực hiện
    + **Class Object:** Các class sẽ implements các phương thức của `supper class` và thực hiện theo nghiệp vụ riêng của chúng.
    + **Factory class:** Đây là class quan trọng, dùng để khởi tạo các Object dựa theo tham số định danh đầu vào. **Lưu ý:** Class này là [**Singleton**](https://viblo.asia/p/design-patterns-phan-2-singleton-6J3ZgdARlmB) hoặc class sẽ cung cấp một `public static method` cho việc truy xuất và khởi tạo Object.
    + **Enum Class:** class chứa các định danh để Factory phân biệt khi khởi tạo Object. (Class này có thể có hoặc không).

### 2.5 Khi nào thì sử dụng Factory Pattern ?
- Factory Pattern được sử dụng khi:
    + Khi bạn chưa biết nên khởi tạo đối tượng mới từ class nào.
    + Khi bạn muốn xử lý việc khởi tạo các đối tượng mới có liên quan đến nhau về cùng 1 nơi, nơi đó gọi là `nhà máy - Factory`
    + Khi bạn không muốn người dùng phải biết hết tên của các class có liên quan đến quá trình khởi tạo cũng như muốn che giấu, đóng gói toàn bộ logic của quá trình khởi tạo một đối tượng mới nào đó khỏi phía người dùng.
    + Khi chúng ta không biết sau này sẽ có thêm những class con nào cần được khởi tạo. Khi cần mở rộng, ta chỉ cần tạo ra class con và implement phương thức chung và sau đó khởi tạo class con đó bằng class Factory.
    + Ngoài ra Factory Pattern còn được áp dụng trong:
        + JDK: java.util.Calendar, ResourceBundle, NumberFormat, …
        + BeanFactory trong Spring Framework.
        + SessionFactory trong Hibernate Framework.

### 2.6 Ưu điểm và nhược điểm

| Ưu điểm | Nhược điểm |
| -------- | -------- | 
| Factory Pattern giúp giảm sự phụ thuộc giữa các module: Giúp chương trình độc lập với những class cụ thể mà chúng ta cần tạo 1 đối tượng | Với những bài toán đơn giản nếu như áp dụng Factory Pattern thì code sẽ trở nên phức tạp hơn vì bạn cần phải khai báo nhiều class theo pattern. Với những bài toán đơn giản thì chúng ta nên xử lý khởi tạo Object ngay tại class User sử dụng.     | 
| Mở rộng code dễ dàng hơn: khi cần mở rộng, chỉ việc tạo ra sub class và implement thêm vào factory method. Điều này sẽ không làm thay đổi các đoạn code nền tảng đã có trước đó.    |      | 
| Khởi tạo các Objects mà che giấu đi xử lý logic của việc khởi tạo đấy. Người dùng không biết logic thực sực được khởi tạo bên dưới phương thức factory.     |      | 
| Dễ dạng quản lý life cycle của các Object được tạo bởi Factory Pattern.     |      | 
| Thống nhất về naming convention: giúp cho các developer có thể hiểu về cấu trúc source code.    |      | 

### 2.7 Mối quan hệ giữa các Pattern khác
- Nhiều design pattern đều bắt đầu bằng cách sử dụng `Factory Method Pattern` (ít phức tạp hơn và có thể tùy chỉnh nhiều hơn thông qua các lớp con) và phát triển theo hướng: `Abstract Factory, Prototype, Builder` (chúng linh hoạt nhưng phức tạp hơn)
- Các class trong `Abstract Factory` thường dựa trên một tập hợp các `Factory Method` nhưng bạn cũng có thể sử dụng `Prototype` để biên soạn các phương thức trên các class này.
- Bạn có thể sử dụng `Factory Method` cùng với `Iterator` để cho phép các class con của collection trả về các loại vòng lặp khác nhau tương thích với các collection
- `Factory Method` có thể đóng vai trò là 1 bước nhỏ trong `Template Method`.

## 3.  Abstract Factory Pattern
- Phần trên chúng ta đã tìm hiểu về **Factory Method Pattern**, tiếp theo đó, phát triển từ Factory Method Pattern chúng ta sẽ có **Abstract Factory Pattern**.
- Như đã nói ở phần tổng quan chúng ta đã biết Abstract Factory Pattern là gì tuy nhiên đó mới chỉ là tổng quan. Sau đây chúng ta sẽ tìm hiểu sâu hơn về nó.

### 3.1 Đặt vấn đề
- **Bài toán đặt ra:** Hãy tưởng tượng rằng bạn bán đồ nội thất. Cửa hàng của bạn bao gồm các mặt hàng sau: `Chair` + `Sofa` + `Table`. 
    + Mỗi mặt hàng trên có 3 kiểu dáng: `Art Deco` , `Vitorian`, `Modern`
    + Công ty đã có quy trình code quản lý để sản xuất `Chair`, bây giờ muốn thêm `Sofa` + `Table` vào. 
    
    ![image.png](https://images.viblo.asia/839d6347-5c96-49bb-ac22-e35bf0d9c329.png)
    
    Vậy nếu là bạn thì bạn sẽ code như thế nào để khi thêm sản phẩm mới sẽ không ảnh hưởng tới code base ban đầu.
    
    ==> Đương nhiên là áp dụng **Abstract Factory Pattern** rồi (vì tên bài là vậy mà :D :D :D )

#### 3.2 Code tham khảo và giải thích
- Trong bài toán chúng ta xác định được 3 Object: `Chair`, `Sofa`, `Table`
- Một Object lại có 3 kiểu thiết kế khác nhau --> Sẽ có 3 Factory để mỗi Factory tạo ra 3 loại Object. VD: `ArtDecoFactory` sẽ tạo ra: `ChairArtDeco`, `SofaArtDeco`, `TableArtDeco` và tương tự như vậy với `VictorianFactory` và `ModernFactory`
- Theo như `Abstract Factory Pattern` thì nó sẽ tạo ra 1 interface hoặc một abstract class để chứa những phương thức tạo lập những đối tượng chung. Ngoài ra Abstract factory còn được hiểu như là một nhà máy lớn chứa nhiều nhà máy nhỏ, trong các nhà máy đó có những xưởng sản xuất, các xưởng đó tạo ra những sản phẩm khác nhau.
- Tương tự như `Factory Method` bên trên chúng ta có :
```java
    interface Chair{
        void create();
    }

    interface Sofa{
        void create();
    }

    interface Table{
        void create();
    }
    
    interface FurnitureAbstractFactory{
        Chair createChair();
        Sofa createSofa();
        Table createTable();
    }
    
    enum StyleType{
        ARTDECO, VICTORIAN, MODERN;
    }
```

- Tiếp theo chúng ta sẽ tạo ra 1 class Factory cha để chứa các Factory con nhé:

```java
    class FurnitureFactory{
        private FurnitureFactory() { }

        public static final FurnitureAbstractFactory getFactory(StyleType styleType) {
            switch (styleType) {
                case ARTDECO:
                    return new ArtDecoFactory();
                case VICTORIAN:
                    return new VictorianFactory();
                case MODERN:
                    return new ModernFactory();    
                default:
                    throw new UnsupportedOperationException("This furniture is unsupported");
            }
        }
    }
```

- Sau chúng ta sẽ khởi tạo các Factory con:

```java
    //ArtDeco
    class ArtDecoFactory implements FurnitureAbstractFactory{

        @Override
        public Chair createChair(){
            return new ChairArtDeco();
        }

        @Override
        public Sofa createSofa(){
            return new SofaArtDeco();
        }

        @Override
        public Table createTable(){
            return new TableArtDeco();
        }
    }
    
    //Victorian
    class VictorianFactory implements FurnitureAbstractFactory{

        @Override
        public Chair createChair(){
            return new ChairVictorian();
        }

        @Override
        public Sofa createSofa(){
            return new SofaVictorian();
        }

        @Override
        public Table createTable(){
            return new TableVictorian();
        }
    }  
 
     //Modern
    class ModernFactory implements FurnitureAbstractFactory{

        @Override
        public Chair createChair(){
            return new ChairModern();
        }

        @Override
        public Sofa createSofa(){
            return new SofaModern();
        }

        @Override
        public Table createTable(){
            return new TableModern();
        }
    }
```
- Tiếp đến sẽ là Các Object sẽ được khởi tạo theo từng Factory trên:

```java
    //Chair
    class ChairArtDeco implements Chair{
        @Override
        public void create() {
            System.out.println("Create ChairArtDeco");
        }
    }

    class ChairVictorian implements Chair{
        @Override
        public void create() {
            System.out.println("Create ChairVictorian");
        }
    }

    class ChairModern implements Chair{
        @Override
        public void create() {
            System.out.println("Create ChairModern");
        }
    }
    
    //Sofa
    class SofaArtDeco implements Sofa{
        @Override
        public void create() {
            System.out.println("Create SofaArtDeco");
        }
    }

    class SofaVictorian implements Sofa{
        @Override
        public void create() {
            System.out.println("Create SofaVictorian");
        }
    }

    class SofaModern implements Sofa{
        @Override
        public void create() {
            System.out.println("Create SofaModern");
        }
    }

    //Table
    class TableArtDeco implements Table{
        @Override
        public void create() {
            System.out.println("Create TableArtDeco");
        }
    }

    class TableVictorian implements Table{
        @Override
        public void create() {
            System.out.println("Create TableVictorian");
        }
    }

    class TableModern implements Table{
        @Override
        public void create() {
            System.out.println("Create TableModern");
        }
    }
```

- Cuối cùng chúng ta sẽ chạy chương trình với func main(). 
- **Các bước sẽ là từ Factory cha -> tạo Factory con -> tạo Object -> thực hiện phương thức của Object đó**
```java
    public class Client{
        public static void main(String []args){
            FurnitureAbstractFactory factory = FurnitureFactory.getFactory(StyleType.ARTDECO);
            Chair chair = factory.createChair();
            chair.create(); // Create ChairArtDeco
        }
    }
```

- Các bạn có thể tham khảo đoạn code trên viết bằng **Kotlin** dưới đây:

```kotlin
    interface Chair{
        fun create()
    }

    interface Sofa{
        fun create()
    }

    interface Table{
        fun create()
    }

    interface FurnitureAbstractFactory{
        fun createChair() : Chair
        fun createSofa() : Sofa
        fun createTable() : Table
    }

    enum class StyleType{
        ARTDECO, VICTORIAN, MODERN
    }

    class ArtDecoFactory : FurnitureAbstractFactory{

        @Override
        override fun createChair() : Chair = ChairArtDeco()

        @Override
        override fun createSofa() : Sofa = SofaArtDeco()

        @Override
        override fun createTable() : Table = TableArtDeco()
    }

    class VictorianFactory : FurnitureAbstractFactory{

        @Override
        override fun createChair() : Chair = ChairVictorian()

        @Override
        override fun createSofa() : Sofa = SofaVictorian()

        @Override
        override fun createTable() : Table = TableVictorian()
    }

    class ModernFactory : FurnitureAbstractFactory{

        @Override
        override fun createChair() : Chair = ChairModern()

        @Override
        override fun createSofa() : Sofa = SofaModern()

        @Override
        override fun createTable() : Table = TableModern()
    }


    class FurnitureFactory{

        companion object{
            fun getFactory(styleType: StyleType) : FurnitureAbstractFactory =
            when(styleType){
                StyleType.ARTDECO ->  ArtDecoFactory()
                StyleType.VICTORIAN ->   VictorianFactory()
                StyleType.MODERN ->   ModernFactory()
            }
        }
    }

    class ChairArtDeco : Chair{
        @Override
        override fun create() {
            println("Create ChairArtDeco")
        }
    }

    class ChairVictorian : Chair{
        @Override
        override fun create() {
            println("Create ChairVictorian")
        }
    }

    class ChairModern : Chair{
        @Override
        override fun create() {
            println("Create ChairModern")
        }
    }

    class SofaArtDeco : Sofa{
        @Override
        override fun create() {
            println("Create SofaArtDeco")
        }
    }

    class SofaVictorian : Sofa{
        @Override
        override fun create() {
            println("Create SofaVictorian")
        }
    }

    class SofaModern : Sofa{
        @Override
        override fun create() {
            println("Create SofaModern")
        }
    }

    class TableArtDeco : Table{
        @Override
        override fun create() {
            println("Create TableArtDeco")
        }
    }

    class TableVictorian : Table{
        @Override
        override fun create() {
            println("Create TableVictorian")
        }
    }

    class TableModern : Table{
        @Override
        override fun create() {
            println("Create TableModern")
        }
    }

    fun main(){
        val factory = FurnitureFactory.getFactory(StyleType.ARTDECO)
        val chair = factory.createChair()
        chair.create() //Create ChairArtDeco
    }
```

### 3.3 Các thành phần của Abstract Factory Pattern
- Một **Abstract Factory Pattern** bao gồm các thành phần cơ bản sau:
    + **Abstract Factory:** Khai báo dạng `interface` hoặc `abstract class` chứa các phương thức để tạo ra các đối tượng trừu tượng.
    + **Factory cha:** Xây dựng và khởi tạo các Factory con.
    + **Abstract Product:** Khai báo dạng `interface` hoặc `abstract class` để chứa các phương thức của Object và sẽ được implements bởi các Object tương ứng.
    + **Object:** Cài đặt các Object cụ thể và các Object này sẽ được triển khai các phương thức mà chúng implements tại Abstract Product tương ứng.
    + **Client:** Là người dùng sẽ tạo Factory con từ Factory cha sau đó sẽ tạo Object từ Factory con cuối cùng sẽ thực hiện các phương thức của Object.

### 3.4 Ưu điểm và nhược điểm

| Ưu điểm |Nhược điểm |
| -------- | -------- | 
| Abstract Factory Pattern giúp đảm bảo rằng các Object mà bạn nhận được từ một factory đều tương thích với nhau     | Code có thể trở nên nhiều hơn và phức tạp hơn do đòi hỏi phải sử dụng nhiều class mới có thể cài đặt được pattern này.     |  
| Tránh sự phụ thuộc giữa code khởi tạo Object với code client     |      |  
| Abstract Factory Pattern giúp gom các đoạn code tạo ra Object vào một nơi trong chương trình, nhờ đó giúp dễ theo dõi và thao tác.     |      |  
| Với Abstract Factory Pattern, chúng ta có thể thoải mái thêm nhiều loại Object mới vào chương trình mà không làm thay đổi các đoạn code nền tảng đã có trước đó.     |      |  
|Dễ dàng xây dựng một hệ thống đóng gói, sử dụng được với nhiều nhóm đối tượng (factory)|

### 3.5 Abstract Factory hơn gì Factory Method
- **Abstract Factory** giúp  tránh được việc sử dụng điều kiện logic bên trong **Factory Pattern**. Khi một Factory Method lớn (có quá nhiều sử lý if-else hay switch-case), chúng ta nên sử dụng theo mô hình Abstract Factory để dễ quản lý hơn (cách phân chia có thể là gom nhóm các class con cùng loại vào một Factory để khởi tạo).
- **Abstract Factory Pattern** là factory của các factory, có thể dễ dạng mở rộng để chứa thêm các factory và các class con khác.
- **Factory Method** dựa vào sự kế thừa (implements): việc tạo đối tượng được ủy quyền cho các lớp con thực hiện phương thức Factory để tạo đối tượng. còn **Abstract Factory** dựa vào kết hợp đối tượng: việc tạo đối tượng được thực hiện theo các phương thức được hiển thị trong interface của factory.
- Mục đích của **Factory Method** là cho phép một lớp trì hoãn việc khởi tạo đối với các lớp con của nó. Còn **Abstract Factory** là tạo ra một bộ của các đối tượng liên quan mà không phải phụ thuộc vào các lớp cụ thể của chúng.

### 3.6 Mối quan hệ với các Pattern khác
- Abstract Factories, Builders và Prototypes đều có thể được triển khai dưới dạng [**Singleton**](https://viblo.asia/p/design-patterns-phan-2-singleton-6J3ZgdARlmB)
- Nhiều thiết kế bắt đầu bằng việc sử dụng Factory Method (ít phức tạp, có thể tùy chỉnh nhiều). Sau đó sẽ phát triển theo hướng Abstract Factory, Prototype, hay Builder (linh hoạt nhưng phức tạp hơn)
- **Builder** tập trung vào việc xây dựng các đối tượng phức tạp theo từng bước. **Abstract Factory** chuyên tạo các class gom các đối tượng liên quan. **Abstract Factory** trả lại Object ngay lập tức, trong khi **Builder** cho phép bạn chạy một số bước xây dựng bổ sung trước khi tìm nạp đối tượng.
- Các lớp **Abstract Factory** thường dựa trên một tập hợp các **Factory Method**, nhưng bạn cũng có thể sử dụng **Prototype** để soạn các phương thức trên các lớp này.
- **Abstract Factory** có thể phục vụ như một giải pháp thay thế cho **Facade** khi bạn chỉ muốn ẩn cách các đối tượng hệ thống con được tạo ra khỏi code client.
- Bạn có thể sử dụng **Abstract Factory** cùng với **Bridge**. Việc ghép nối này rất hữu ích khi một số trừu tượng được xác định bởi **Bridge** chỉ có thể hoạt động với các triển khai cụ thể. Trong trường hợp này, **Abstract Factory** có thể đóng gói các quan hệ này và ẩn sự phức tạp khỏi code client.

# 4 . Kết luận
- Vậy là chúng ta đã cùng nhau tìm hiểu về **Factory Method Pattern** và **Abstract Factory Pattern**. Hi vọng thông qua bài chia sẻ sẽ giúp mọi người hiểu hơn 1 chút về 2 pattern này.
- Hãy cùng nhau tìm hiểu các pattern khác ở các phần tiếp theo nhé !
- Bài viết trên là cá nhân tìm hiểu nên có thể đúng, có thể sai, mong được mọi người góp ý để mình có thể hoàn thiện kiến thức hơn nữa.
- Cảm ơn mọi người đã đọc bài của mình. Nếu thấy có ích, mọi người **bấm theo dõi** và **upvote** cho mình nha. 
- Tài liệu tham khảo:
    + https://refactoring.guru/design-patterns/abstract-factory
    + https://gpcoder.com/4352-huong-dan-java-design-pattern-factory-method/#Su_dung_Factory_Pattern_khi_nao
    + https://refactoring.guru/design-patterns/factory-method
    + https://gpcoder.com/4365-huong-dan-java-design-pattern-abstract-factory/