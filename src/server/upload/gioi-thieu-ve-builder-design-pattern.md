Nguồn: [refactoring.guru](https://refactoring.guru/design-patterns/builder)

# Builder

## Ý đồ
Builder là một creational design pattern (DP) cho phép bạn chia quá trình xây dựng một đối tượng phức tạp thành các bước nhỏ. Bằng việc sử dụng DP này, chỉ với một đoạn code xây dựng duy nhất, bạn có thể tạo đối tượng thuộc nhiều hình thức khác nhau.![](https://images.viblo.asia/50fde79d-04b8-4475-aaaa-032dc7826160.png)

## Vấn đề
Hãy tưởng tượng một đối tượng phức tạp, đòi hỏi bạn tốn rất nhiều công sức để khởi tạo rất nhiều trường và các đối tượng lồng nhau. Code khởi tạo như vậy thường được nhét bên trong một hàm khởi tạo khổng lồ với rất nhiều tham số. Hoặc thậm chí tệ hơn: nằm rải rác trên toàn bộ code bên client.![](https://images.viblo.asia/9cdf1734-d091-4342-ba63-9ac7922e18c6.png)

*Bạn có thể làm cho chương trình trở nên cực kì phức tạp nếu tạo một lớp con cho mỗi tập tính chất có thể tồn tại của một đối tượng.*

Ví dụ: Hãy nghĩ về cách tạo đối tượng `Nhà`. Để xây một ngôi nhà đơn giản, bạn cần xây dựng bốn bức tường và một tầng, lắp cửa ra vào, lắp thêm cặp cửa sổ và dựng mái. Nhưng nếu bạn muốn một ngôi nhà lớn hơn, sáng sủa hơn, có sân sau và các tiện ích khác (như hệ thống sưởi, hệ thống ống nước và hệ thống dây điện), thì lúc đó bạn sẽ làm thế nào?

Giải pháp đơn giản nhất là mở rộng base class `Nhà` và tạo các subclass để có thể cover hết tất cả các nhóm tham số. Nhưng kết quả của cách làm đó là bạn sẽ có một số lượng đáng kể các subclass. Bất kỳ tham số mới nào, chẳng hạn như kiểu hiên nhà, sẽ khiến bạn phải mở rộng hệ thống phân cấp này nhiều hơn nữa.

Có một cách tiếp cận khác mà không cần phải tạo subclass, đó là tạo một hàm constructor khổng lồ ngay trong base class `Nhà` với tất cả các tham số có thể có để điều khiển đối tượng nhà. Mặc dù đúng là cách tiếp cận này sẽ giúp bạn tránh vấn đề subclass kể trên, nó tạo ra một vấn đề khác
![](https://images.viblo.asia/68dbf6db-ea80-4628-8b01-9563ad95ca94.png)

*Hàm khởi tạo với nhiều tham số cũng có nhược điểm của nó: không phải lúc nào cũng cần tất cả các tham số.*

## Giải pháp
Builder DP gợi ý rằng chúng ta nên tách code xây dựng đối tượng ra khỏi chính class của nó và đưa nó vào các đối tượng riêng biệt được gọi là *builder*.
![](https://images.viblo.asia/2abed900-9ee3-4356-a107-e403580bdede.png)

*Builder DP cho phép bạn xây dựng các đối tượng phức tạp theo từng bước. Builder không cho phép một đối tượng truy cập vào đối tượng sản phẩm khác đang được xây dựng.*

DP này chia việc xây dựng đối tượng thành một tập hợp các bước (`buildWalls`, `buildDoor`, v.v.). Để tạo một đối tượng, bạn thực hiện một loạt các bước này trên một đối tượng builder. Điều đáng chú ý ở đây là bạn không cần gọi tất cả các bước, mà chỉ cần muốn đối tượng có phần nào thì gọi bước build tương ứng cho phần đó.

Một số bước build có thể yêu cầu cách implement khác nhau nếu bạn muốn xây dựng các hình thức khác nhau của đối tượng sản phẩm. Ví dụ, tường của một cabin có thể được xây bằng gỗ, nhưng tường lâu đài phải được xây bằng đá.

Trong trường hợp này, bạn có thể tạo một số builder class khác nhau cùng triển khai cùng một tập hợp các bước build, nhưng với cách thức khác nhau. Sau đó, bạn có thể sử dụng các builder này trong quá trình build (tức là một tập hợp các lệnh gọi đến các bước build) để tạo ra các loại đối tượng khác nhau.

![](https://images.viblo.asia/fd5705a8-c0a2-4529-8b65-35ebcab53a66.png)

*Các builder khác nhau thực hiện cùng một nhiệm vụ theo nhiều cách khác nhau.*

Ví dụ, hãy tưởng tượng một người thợ xây xây mọi thứ từ gỗ và kính, người thứ hai xây mọi thứ bằng đá và sắt và người thứ ba sử dụng vàng và kim cương. Bằng cách gọi cùng một nhóm các bước, bạn sẽ có được một ngôi nhà bình thường từ thợ xây đầu tiên, một lâu đài nhỏ từ người thứ hai và một cung điện từ người thứ ba. Tuy nhiên, điều này sẽ chỉ khả thi nếu code client gọi các bước build có thể tương tác với các builder thông qua một giao diện chung.

### Director
Bạn có thể làm xịn xò hơn nữa bằng cách tách lệnh gọi đến các bước của builder vào một lớp riêng biệt có tên là *director*. Class Director sẽ định nghĩa ra một trình tự thực hiện các bước build, trong khi builder sẽ implement các bước đó.
![](https://images.viblo.asia/1d7c5a07-94a4-431b-a621-b9b58de889a5.png)

*Director biết các bước xây dựng cần thực hiện để có thể build ra một đối tượng hoàn chỉnh.*

Bạn không nhất thiết phải implement Director, mà vẫn có thể làm theo cách truyền thống là gọi các bước xây dựng trực tiếp từ code trên client. Tuy nhiên, nếu bạn muốn tái sử dụng một tập hợp bước xây dựng, thì nên đưa vào Director.

Ngoài ra, class Director giấu kín hoàn toàn các chi tiết của việc tạo đối tượng với code trên client. Client chỉ cần liên kết builder với director, khởi chạy việc build với director và nhận kết quả từ builder.

## Cấu tạo
![](https://images.viblo.asia/8e10a613-4179-477e-84af-935d84d2daed.png)
1. **Giao diện Builder** khai báo các bước xây dựng sản phẩm chung cho tất cả các loại buildler
2. Các **class Builder cụ thể** cung cấp các implementation khác nhau của các bước xây dựng. Các class Builder cụ thể có thể tạo ra các đối tượng không tuân theo giao diện chung.
3. **Product** là đối tượng kết quả. Các sản phẩm do các nhà xây dựng khác nhau tạo ra không nhất thiết phải thuộc cùng một hệ thống phân cấp hoặc giao diện lớp.
4. Class **Director** định nghĩa ra thứ tự gọi các bước xây dựng, vì vậy bạn có thể tạo và sử dụng lại các cách cấu hình cụ thể của đối tượng sản phẩm.
5. **Client** phải liên kết một trong các builder với director. Thông thường, việc này chỉ được thực hiện một lần, thông qua các tham số của hàm khởi tạo director. Sau đó, director sử dụng builder đó cho tất cả các lần xây dựng tiếp theo. Tuy nhiên, có một cách tiếp cận khác nếu  client truyền đối tượng builder sang method chịu trách nhiệm tạo ra sản phẩm của builder, đó là mỗi lần dùng director để tạo đối tượng, thì bạn truyền builder tương ứng vào.

## Giả mã
Ví dụ sau đây về Builder DP minh họa cách bạn có thể sử dụng lại cùng một code xây dựng đối tượng khi xây dựng các loại đối tượng sản phẩm khác nhau, chẳng hạn như ô tô, và tạo hướng dẫn sử dụng tương ứng cho chúng.
![](https://images.viblo.asia/28558f19-ff57-43a4-b17a-0da9418d811c.png)

*Ví dụ về các bước xây dựng ô tô và hướng dẫn sử dụng tương ứng với các dòng ô tô đó.*

Ô tô là một đối tượng phức tạp có thể được cấu tạo theo hàng trăm cách khác nhau. Thay vì làm class `Car` bị phồng to bằng một hàm khởi tạo khổng lồ, chúng ta tách logic xây dựng xe thành một class riêng biệt. Class này có một tập các phương thức để cấu hình các bộ phận khác nhau của ô tô.

Nếu code client muốn xây dựng một mẫu ô tô custom, có nhiều tính chất đặc biệt, client có thể làm việc trực tiếp với builder. Còn không, client có thể ủy thác việc xây dựng cho class `Director` (class này định nghĩa ra một số preset ô tô phổ biến)

Ngoài ra, chúng ta sẽ phải tạo sách hướng dẫn sử dụng cho xe. Sách hướng dẫn mô tả mọi tính năng của xe hơi, vì vậy với mỗi mẫu xe khác nhau, thì các chi tiết trong sách hướng dẫn cũng sẽ khác nhau. Đó là lý do tại sao chúng ta sẽ tái sử dụng quy trình xây dựng hiện có cho cả bản thân chiếc ô tô và sách hướng dẫn tương ứng của nó. Tất nhiên, việc xây dựng sổ tay hướng dẫn không giống như chế tạo một chiếc ô tô và đó là lý do tại sao chúng ta phải cung cấp một class builder khác chuyên về việc soạn sách hướng dẫn. Class này thực hiện các phương thức xây dựng tương tự như class chế tạo ô tô, nhưng thay vì chế tạo các bộ phận ô tô, nó mô tả các bộ phận đó. Bằng cách truyền các builder này vào cùng một đối tượng Director, chúng ta có thể xây dựng một chiếc xe hơi hoặc một hướng dẫn sử dụng, tùy vào builder được sử dụng.

Phần cuối cùng là lấy về đối tượng kết quả. Một chiếc xe kim loại và một cuốn sổ tay bằng giấy, mặc dù có liên quan đến nhau, nhưng vẫn là những thứ rất khác nhau. Chúng ta không thể đặt phương thức lấy kết quả nếu không couple director với class cụ thể. Do đó, chúng ta sẽ lấy kết quả của việc xây dựng từ chính builder đã thực hiện công việc.

```
// Using the Builder pattern makes sense only when your products
// are quite complex and require extensive configuration. The
// following two products are related, although they don't have
// a common interface.
class Car is
    // A car can have a GPS, trip computer and some number of
    // seats. Different models of cars (sports car, SUV,
    // cabriolet) might have different features installed or
    // enabled.

class Manual is
    // Each car should have a user manual that corresponds to
    // the car's configuration and describes all its features.


// The builder interface specifies methods for creating the
// different parts of the product objects.
interface Builder is
    method reset()
    method setSeats(...)
    method setEngine(...)
    method setTripComputer(...)
    method setGPS(...)

// The concrete builder classes follow the builder interface and
// provide specific implementations of the building steps. Your
// program may have several variations of builders, each
// implemented differently.
class CarBuilder implements Builder is
    private field car:Car

    // A fresh builder instance should contain a blank product
    // object which it uses in further assembly.
    constructor CarBuilder() is
        this.reset()

    // The reset method clears the object being built.
    method reset() is
        this.car = new Car()

    // All production steps work with the same product instance.
    method setSeats(...) is
        // Set the number of seats in the car.

    method setEngine(...) is
        // Install a given engine.

    method setTripComputer(...) is
        // Install a trip computer.

    method setGPS(...) is
        // Install a global positioning system.

    // Concrete builders are supposed to provide their own
    // methods for retrieving results. That's because various
    // types of builders may create entirely different products
    // that don't all follow the same interface. Therefore such
    // methods can't be declared in the builder interface (at
    // least not in a statically-typed programming language).
    //
    // Usually, after returning the end result to the client, a
    // builder instance is expected to be ready to start
    // producing another product. That's why it's a usual
    // practice to call the reset method at the end of the
    // `getProduct` method body. However, this behavior isn't
    // mandatory, and you can make your builder wait for an
    // explicit reset call from the client code before disposing
    // of the previous result.
    method getProduct():Car is
        product = this.car
        this.reset()
        return product

// Unlike other creational patterns, builder lets you construct
// products that don't follow the common interface.
class CarManualBuilder implements Builder is
    private field manual:Manual

    constructor CarManualBuilder() is
        this.reset()

    method reset() is
        this.manual = new Manual()

    method setSeats(...) is
        // Document car seat features.

    method setEngine(...) is
        // Add engine instructions.

    method setTripComputer(...) is
        // Add trip computer instructions.

    method setGPS(...) is
        // Add GPS instructions.

    method getProduct():Manual is
        // Return the manual and reset the builder.


// The director is only responsible for executing the building
// steps in a particular sequence. It's helpful when producing
// products according to a specific order or configuration.
// Strictly speaking, the director class is optional, since the
// client can control builders directly.
class Director is
    private field builder:Builder

    // The director works with any builder instance that the
    // client code passes to it. This way, the client code may
    // alter the final type of the newly assembled product.
    method setBuilder(builder:Builder)
        this.builder = builder

    // The director can construct several product variations
    // using the same building steps.
    method constructSportsCar(builder: Builder) is
        builder.reset()
        builder.setSeats(2)
        builder.setEngine(new SportEngine())
        builder.setTripComputer(true)
        builder.setGPS(true)

    method constructSUV(builder: Builder) is
        // ...


// The client code creates a builder object, passes it to the
// director and then initiates the construction process. The end
// result is retrieved from the builder object.
class Application is

    method makeCar() is
        director = new Director()

        CarBuilder builder = new CarBuilder()
        director.constructSportsCar(builder)
        Car car = builder.getProduct()

        CarManualBuilder builder = new CarManualBuilder()
        director.constructSportsCar(builder)

        // The final product is often retrieved from a builder
        // object since the director isn't aware of and not
        // dependent on concrete builders and products.
        Manual manual = builder.getProduct()
```

## Tính ứng dụng
**Dùng Builder DP để tránh việc tạo ra constructor "lồng ghép"**
Giả sử bạn có một hàm khởi tạo với 10 optional param. Bạn thấy một hàm như thế gọi rất bất tiện; do đó, bạn overload hàm tạo và tạo một số phiên bản ngắn hơn với ít tham số hơn. Các hàm tạo này vẫn tham chiếu đến hàm chính, và tham số nào bị bỏ qua sẽ được gán giá trị mặc định.
```
class Pizza {
    Pizza(int size) { ... }
    Pizza(int size, boolean cheese) { ... }
    Pizza(int size, boolean cheese, boolean pepperoni) { ... }
    // ...
```

Builder DP cho phép bạn xây dựng các đối tượng từng bước một, và bạn chỉ phải sử dụng những bước bạn thực sự cần. Sau khi implement DP này, bạn sẽ không phải nhồi nhét hàng tá tham số vào các hàm khởi tạo của mình nữa.

**Sử dụng mẫu Builder khi bạn muốn tạo các hình thức khác nhau của cùng một đối tượng (ví dụ: nhà bằng đá và bằng gỗ).**

Builder DP có thể được áp dụng khi việc xây dựng các hình thức khác nhau của đối tượng bao gồm các bước tương tự nhau, và chỉ khác nhau về chi tiết.

Interface Builder base xác định tất cả các bước xây dựng có thể có và builder sẽ implement các bước này để xây dựng các hình thức cụ thể của đối tượng. Trong khi đó, class director hướng dẫn trình tự xây dựng.

**Sử dụng Builder để tạo cây Composite hoặc các đối tượng phức tạp khác.**

Builder DP cho phép bạn xây dựng đối tượng từng bước một. Bạn có thể trì hoãn việc thực hiện một số bước mà không làm ảnh hưởng tới sản phẩm cuối cùng. Bạn thậm chí có thể gọi đệ quy các bước, một việc rất hữu ích khi bạn muốn xây dựng một cây đối tượng.

Builder không để lộ đối tượng chưa hoàn thành (tức các bước xây dựng vẫn đang chạy). Điều này ngăn không cho client lấy phải đối tượng kết quả không hoàn chỉnh.

## Cách implement
1. Xác định rõ ràng các bước xây dựng để build tất cả các hình thức có thể tồn tại của đối tượng. Đây là điều kiện tiên quyết để thực hiện các bước tiếp theo.

2. Khai báo các bước này trong base interface Builder

3. Tạo class builder cụ thể cho từng hình thức của đối tượng và implement các bước xây dựng của chúng.

Đừng quên triển khai method lấy ra kết quả xây dựng. Lý do tại sao phương thức này không thể được khai báo bên trong giao diện builder là vì các builder khác nhau có thể tạo ra các đối tượng không kế thừa chung giao diện. Do đó, bạn không biết đâu sẽ là kiểu trả về cho một phương thức như vậy. Tuy nhiên, nếu các đối tượng cùng nằm trong một hierarchy, thì phương pháp lấy ra đối tượng kết quả hoàn toàn có thể được thêm vào base interface mà không có vấn đề gì.

4. Cân nhắc việc tạo một class Director. Class này đóng gói các cách khác nhau để xây dựng đối tượng dựa trên loại builder truyền vào .

5.Client code tạo cả đối tượng director và builder. Trước khi bắt đầu xây dựng, client phải truyền một đối tượng builder cho director. Thông thường, client chỉ thực hiện việc này một lần, thông qua các tham số của hàm khởi tạo của director. Director sử dụng đối tượng builder trong các bước xây dựng tiếp theo. Có một cách tiếp cận thay thế, đó là builder được truyền trực tiếp vào hàm khởi tạo của director.

6. Kết quả xây dựng có thể được lấy ra từ director nếu tất cả các đối tượng cùng implement một giao diện. Nếu không, khách hàng sẽ phải lấy kết quả từ builder.

## Ưu và nhược điểm

Ưu điểm 1: Bạn có thể xây dựng các đối tượng theo từng bước, trì hoãn các bước xây dựng hoặc chạy đệ quy các bước.
Ưu điểm 2: Bạn có thể tái sử dụng lại cùng một tập các bước xây dựng khi xây dựng các hình thức khác nhau của đối tượng.
Ưu điểm 3: Single Responsibility Principle. Bạn có thể tách biệt code xây dựng phức tạp khỏi business logic
Nhược điểm: Độ phức tạp tổng thể của mã code lên vì phải tạo nhiều class mới

## Mối quan hệ với các mẫu khác
* Nhiều DP có khởi điểm là sử dụng Factory Method (ít phức tạp hơn và có thể tùy chỉnh nhiều hơn thông qua các lớp con) và phát triển theo hướng Abstract Factory, Prototype hoặc Builder (linh hoạt hơn nhưng phức tạp hơn).

* Builder tập trung vào việc xây dựng các đối tượng phức tạp theo từng bước. Abstract Factory chuyên tạo các tập hợp đối tượng liên quan. Abstract Factory trả về đối tượng ngay lập tức, trong khi Builder cho phép bạn chạy một số bước xây dựng bổ sung trước khi lấy đối tượng.

* Bạn có thể sử dụng Builder khi tạo các cây Composite phức tạp vì bạn có thể lập trình các bước xây dựng của nó để chạy đệ quy.

* Bạn có thể kết hợp Builder với Bridge: class Director đóng vai trò trừu tượng, trong khi các builder đóng vai trò implement.

* Abstract Factories, Builders and Prototypes đều có thể được implement như là các Singleton.