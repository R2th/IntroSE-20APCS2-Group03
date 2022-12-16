# Builder
## 1. Ý tưởng
Builder là một mẫu thiết kế sáng tạo cho phép bạn xây dựng các đối tượng phức tạp theo từng bước. Mẫu cho phép bạn tạo ra các kiểu và hình ảnh đại diện khác nhau của một đối tượng bằng cách sử dụng cùng một đoạn code xây dựng.
![](https://images.viblo.asia/0e51c46c-707c-4880-b1ba-3da4de00c63f.png)

## 2. Đặt vấn đề
Hãy tưởng tượng một đối tượng phức tạp đòi hỏi nhiều công sức, khởi tạo từng bước của nhiều trường và các đối tượng lồng nhau. Mã khởi tạo như vậy thường được chôn bên trong một hàm tạo khổng lồ với rất nhiều tham số. Hoặc thậm chí tệ hơn: nằm rải rác trên toàn bộ mã khách hàng.
![](https://images.viblo.asia/d8645545-f5eb-44ab-9bdd-c9e1d9a3a399.png)

Ví dụ: hãy nghĩ về cách tạo đối tượng House. Để xây một ngôi nhà đơn giản, bạn cần xây dựng bốn bức tường và một tầng, lắp cửa ra vào, lắp một cặp cửa sổ và xây dựng một mái nhà. Nhưng nếu bạn muốn một ngôi nhà lớn hơn, sáng sủa hơn, có sân sau và các tiện ích khác (như hệ thống sưởi, hệ thống ống nước và hệ thống dây điện)?

Giải pháp đơn giản nhất là mở rộng lớp House cơ sở và tạo một tập hợp các lớp con để bao gồm tất cả các kết hợp của các tham số. Nhưng cuối cùng bạn sẽ kết thúc với một số lượng đáng kể các lớp con. Bất kỳ thông số mới nào, chẳng hạn như kiểu hiên nhà, sẽ yêu cầu phát triển hệ thống phân cấp này nhiều hơn nữa.

Có một cách tiếp cận khác không liên quan đến việc lai tạo các lớp con. Bạn có thể tạo một hàm tạo khổng lồ ngay trong lớp House cơ sở với tất cả các tham số có thể có để điều khiển đối tượng House. Trong khi cách tiếp cận này thực sự loại bỏ sự cần thiết của các lớp con, nó tạo ra một vấn đề khác.
![](https://images.viblo.asia/334d12f5-4e80-4a77-98db-315965ff0dc9.png)

Trong hầu hết các trường hợp, hầu hết các tham số sẽ không được sử dụng, làm cho các cuộc gọi hàm tạo khá xấu. Ví dụ, chỉ một phần nhỏ các ngôi nhà có bể bơi, vì vậy các thông số liên quan đến bể bơi sẽ vô dụng chín lần trên mười.

## 3. Giải pháp
Mẫu Builder gợi ý rằng bạn trích xuất mã xây dựng đối tượng ra khỏi lớp của chính nó và di chuyển nó đến các đối tượng riêng biệt được gọi là trình tạo.

Một số bước xây dựng có thể yêu cầu thực hiện khác nhau khi bạn cần xây dựng các hình ảnh đại diện khác nhau của sản phẩm. Ví dụ, tường của một cabin có thể được xây bằng gỗ, nhưng tường lâu đài phải được xây bằng đá.

Trong trường hợp này, bạn có thể tạo một số lớp trình xây dựng khác nhau triển khai cùng một tập hợp các bước xây dựng, nhưng theo một cách khác. Sau đó, bạn có thể sử dụng các trình xây dựng này trong quá trình xây dựng (tức là một tập hợp lệnh gọi đến các bước xây dựng) để tạo ra các loại đối tượng khác nhau.
![](https://images.viblo.asia/f8f64e72-40e3-4f9a-8e3f-09191cb71820.png)

Ví dụ, hãy tưởng tượng một người thợ xây dựng mọi thứ từ gỗ và kính, người thứ hai xây mọi thứ bằng đá và sắt và người thứ ba sử dụng vàng và kim cương. Bằng cách gọi cùng một nhóm các bước, bạn sẽ có được một ngôi nhà thông thường từ người xây dựng đầu tiên, một lâu đài nhỏ từ người thứ hai và một cung điện từ người thứ ba. Tuy nhiên, điều này sẽ chỉ hoạt động nếu mã máy khách gọi các bước xây dựng có thể tương tác với các nhà xây dựng bằng giao diện chung.

## 4. Hướng dẫn
Bạn có thể đi xa hơn và trích xuất một loạt lệnh gọi đến các bước của trình tạo mà bạn sử dụng để xây dựng sản phẩm thành một lớp riêng biệt có tên là director. Lớp derector xác định thứ tự thực hiện các bước xây dựng, trong khi trình xây dựng cung cấp việc triển khai cho các bước đó.
![](https://images.viblo.asia/a5ba833c-4342-4cca-b6d7-441e7d8c28fb.png)

Việc có một lớp đạo diễn trong chương trình của bạn là không hoàn toàn cần thiết. Bạn luôn có thể gọi các bước xây dựng theo thứ tự cụ thể trực tiếp từ mã khách hàng. Tuy nhiên, lớp giám đốc có thể là một nơi tốt để đưa các quy trình xây dựng khác nhau để bạn có thể sử dụng lại chúng trong chương trình của mình.

Ngoài ra, hạng giám đốc hoàn toàn giấu kín các chi tiết cấu tạo sản phẩm với mã khách hàng. Khách hàng chỉ cần liên kết người xây dựng với giám đốc, khởi chạy công trình với người giám đốc và nhận kết quả từ người xây dựng.

## 5. Cấu trúc

![](https://images.viblo.asia/dd398c3a-e938-4698-8748-c52539f59712.png)

## 6. Mã giả
Ví dụ về mẫu Builder này minh họa cách bạn có thể sử dụng lại cùng một mã xây dựng đối tượng khi xây dựng các loại sản phẩm khác nhau, chẳng hạn như ô tô và tạo hướng dẫn sử dụng tương ứng cho chúng.
![](https://images.viblo.asia/2a78ebbe-b9e6-4a4d-aa1b-a00cbff87624.png)

Xe hơi là một vật thể phức tạp có thể được cấu tạo theo hàng trăm cách khác nhau. Thay vì mở rộng lớp Xe bằng một hàm tạo khổng lồ, chúng tôi trích xuất mã lắp ráp xe thành một lớp xây dựng xe riêng biệt. Lớp này có một tập các phương thức để cấu hình các bộ phận khác nhau của ô tô.

Nếu mã khách hàng cần lắp ráp một mô hình ô tô đặc biệt, được tinh chỉnh, mã này có thể làm việc trực tiếp với người chế tạo. Mặt khác, khách hàng có thể ủy thác việc lắp ráp cho lớp giám đốc, lớp này biết cách sử dụng trình xây dựng để tạo ra một số mẫu ô tô phổ biến nhất.

Bạn có thể bị sốc, nhưng mọi chiếc xe đều cần có sách hướng dẫn (nghiêm túc đấy, ai đọc chúng?). Sách hướng dẫn mô tả mọi tính năng của xe hơi, vì vậy các chi tiết trong sách hướng dẫn sẽ khác nhau trên các mẫu xe khác nhau. Đó là lý do tại sao bạn nên sử dụng lại quy trình xây dựng hiện có cho cả ô tô thật và sách hướng dẫn tương ứng của chúng. Tất nhiên, việc xây dựng sổ tay hướng dẫn không giống như chế tạo một chiếc ô tô và đó là lý do tại sao chúng tôi phải cung cấp một lớp người xây dựng khác chuyên về việc soạn sách hướng dẫn. Lớp này thực hiện các phương thức xây dựng tương tự như người anh em chế tạo ô tô của nó, nhưng thay vì chế tạo các bộ phận ô tô, nó mô tả chúng. Bằng cách chuyển các trình xây dựng này đến cùng một đối tượng Director, chúng ta có thể xây dựng một chiếc xe hơi hoặc một hướng dẫn sử dụng.

Phần cuối cùng là tìm nạp đối tượng kết quả. Một chiếc xe kim loại và một cuốn sổ tay bằng giấy, mặc dù có liên quan đến nhau, nhưng vẫn là những thứ rất khác nhau. Chúng tôi không thể đặt một phương pháp để tìm nạp kết quả trong đạo diễn mà không kết hợp đạo diễn với các lớp sản phẩm cụ thể. Do đó, chúng tôi nhận được kết quả của việc xây dựng từ người xây dựng đã thực hiện công việc.

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

## 7. Áp dụng
1. Đảm bảo rằng bạn có thể xác định rõ ràng các bước xây dựng chung để xây dựng tất cả các bản đại diện sản phẩm có sẵn. Nếu không, bạn sẽ không thể tiếp tục triển khai mẫu.

2. Khai báo các bước này trong giao diện trình tạo cơ sở.

3. Tạo một lớp người xây dựng bê tông cho từng đại diện sản phẩm và thực hiện các bước xây dựng của chúng.

    Đừng quên triển khai một phương pháp để tìm nạp kết quả của việc xây dựng. Lý do tại sao phương pháp này không thể được khai báo bên trong giao diện trình tạo là vì các trình xây dựng khác nhau có thể tạo ra các sản phẩm không có giao diện chung. Do đó, bạn không biết đâu sẽ là kiểu trả về cho một phương thức như vậy. Tuy nhiên, nếu bạn đang xử lý các sản phẩm từ một hệ thống phân cấp, thì phương pháp tìm nạp có thể được thêm vào giao diện cơ sở một cách an toàn.

4. Hãy nghĩ về việc tạo một director class. Nó có thể bao gồm nhiều cách khác nhau để xây dựng một sản phẩm bằng cách sử dụng cùng một đối tượng trình tạo.

5. Mã khách hàng tạo cả đối tượng trình tạo và giám đốc. Trước khi bắt đầu xây dựng, khách hàng phải chuyển một đối tượng người xây dựng cho giám đốc. Thông thường, khách hàng chỉ thực hiện việc này một lần, thông qua các tham số của hàm tạo của giám đốc. Giám đốc sử dụng đối tượng người xây dựng trong tất cả các công trình xây dựng khác. Có một cách tiếp cận thay thế, trong đó người xây dựng được chuyển trực tiếp đến phương pháp xây dựng của giám đốc.

6. Chỉ có thể nhận được kết quả xây dựng trực tiếp từ giám đốc nếu tất cả các sản phẩm tuân theo cùng một giao diện. Nếu không, khách hàng sẽ lấy kết quả từ trình tạo.

Link tham khảo: https://refactoring.guru/design-patterns/builder