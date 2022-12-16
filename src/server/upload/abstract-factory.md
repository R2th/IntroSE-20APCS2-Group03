## Abstract factory

### 1. Giới thiệu
   Abstract factory là một mẫu thiết kế sáng tạo, nó cho phép bạn tạo ra họ các đối tượng có quan hệ với nhau mà không cần chỉ rõ các lớp cụ thể của chúng.

![](https://images.viblo.asia/074f0ed7-fd87-4669-87cd-62ef9609113a.png)


####   Vấn đề: 
   Hãy tưởng tượng rằng bạn đang tạo một mô phỏng cửa hàng đồ nội thất. Mã của bạn bao gồm các lớp đại diện:
   + Một nhóm các sản phẩm liên quan: chair, sofa, coffee table.
   + Một số biến thể của họ này. Ví dụ: các sản phẩm Ghế + Sofa + Bàn cà phê có sẵn trong các biến thể sau: Modern, Victoria, ArtDeco.

![](https://images.viblo.asia/422cce85-7cd6-4639-96c3-f358030ce49e.png)

   Bây giờ bạn cần làm đúng với yêu cầu của khách hàng bằng cách tạo ra các đồ vật nội thất riêng lẻ để chúng phù hợp với các đồ vật khác trong cùng một gia đình.

![](https://images.viblo.asia/74e68478-46f9-463f-80ed-e76f693a5a71.png)

   Hơn nữa, việc bạn thay đổi mã code hiện có khi thêm sản phẩm mới hoặc nhóm sản phẩm mới vào chương trình sẽ rất bất tiện. Đặc biệt các nhà cung cấp đồ nội thất cập nhật danh mục của họ rất thường xuyên và nếu mỗi lần như vậy bạn đều thực hiện một lần thay đổi mã code thì sẽ vô cùng khó khăn.

####  Giải pháp:
   Có một giải pháp là design pattern abstract factory gợi ý: Đầu tiên bạn định nghĩa rõ ràng các giao diện cho từng sản phẩm riêng biệt mà bạn đang có (chair, sofa, coffee table), sau đó bạn có thể làm cho tất cả các biến thể của sản phẩm đã được định nghĩa. vd: tất cả các biến thể của sản phẩm chair đều được triển khai trên giao diện chair.

![](https://images.viblo.asia/acfb805b-6ecc-4625-8fd6-e2c7f1478969.png)

   Bước tiếp theo là khai báo Abstract Factory (bước này là khai báo các phương pháp tạo ra các sản phẩm biến thể từ các sản phẩm gốc) — một giao diện cho các sản phẩm thuộc dòng sản phẩm biến thể (ví dụ: createChair, createSofa và createCoffeeTable). Các phương thức này phải trả về các sản phẩm được đại diện bởi các giao diện mà chúng tôi đã trích xuất trước đây: chair, sofa, CoffeeTable, v.v.

![](https://images.viblo.asia/bc52364b-5cf4-431f-8ad7-0369084bca3f.png)

   Bây giờ, làm thế nào về các biến thể sản phẩm? Đối với mỗi biến thể của một họ sản phẩm, chúng tôi tạo một lớp nhà máy riêng dựa trên giao diện AbstractFactory. Nhà máy là một lớp trả lại các sản phẩm của một loại cụ thể. Ví dụ: ModernFurnitureFactory chỉ có thể tạo các đối tượng ModernChair, ModernSofa và ModernCoffeeTable.

   Mã khách hàng phải được kết nối với cả nhà máy và các sản phẩm thông qua các giao diện trừu tượng tương ứng. Điều này cho phép bạn thay đổi loại nhà máy mà bạn chuyển sang mã khách hàng, cũng như biến thể sản phẩm mà mã khách hàng nhận được, mà không phá vỡ mã khách hàng thực tế.
   
   ![](https://images.viblo.asia/4c68825b-502b-46f0-92d4-44ac86592abe.png)

   Giả sử khách hàng muốn có một nhà máy để sản xuất một chiếc ghế. Khách hàng không cần phải biết về loại ghế của nhà máy, cũng như không quan trọng loại ghế mà họ nhận được. Cho dù đó là kiểu ghế Modern hay kiểu ghế  Victoria, khách hàng phải xử lý tất cả các ghế theo cùng một cách, sử dụng giao diện chair trừu tượng. Với cách tiếp cận này, điều duy nhất mà khách hàng biết về chiếc ghế là nó thực hiện theo một cách nào đó. Ngoài ra, bất kỳ biến thể nào của ghế được trả lại, nó sẽ luôn khớp với loại ghế sofa hoặc table coffee được sản xuất bởi cùng một đối tượng nhà máy.

### 2. Cấu trúc

![](https://images.viblo.asia/407bc8fe-626d-415d-9fdc-686dde6ff39c.png)

### 3. Ví dụ
   Trong ví dụ này, chúng ta sử dụng design pattern Abstract Factory để tạo các phần tử giao diện người dùng đa nền tảng mà không cần ghép mã máy của các hệ điều hành khác nhau với các lớp giao diện người dùng cụ thể, đồng thời giữ cho tất cả các phần tử được tạo nhất quán với hệ điều hành đã chọn.
   
![](https://images.viblo.asia/58779137-0343-48c8-a4e7-1dc4634e500d.png)

   Các phần tử giao diện người dùng giống nhau trong một ứng dụng đa nền tảng dự kiến sẽ hoạt động tương tự, nhưng trông hơi khác một chút trong các hệ điều hành khác nhau. Hơn nữa, nhiệm vụ của bạn là đảm bảo rằng các phần tử giao diện người dùng phù hợp với phong cách của hệ điều hành hiện tại. Bạn sẽ không muốn chương trình của mình hiển thị các điều khiển macOS khi nó được thực thi trong Windows.

   Giao diện Abstract Factory khai báo một tập hợp các phương pháp tạo mà mã máy khách có thể sử dụng để tạo ra các loại phần tử UI khác nhau. Các nhà máy bê tông tương ứng với các hệ điều hành cụ thể và tạo các phần tử giao diện người dùng phù hợp với hệ điều hành cụ thể đó.

   Nó hoạt động như thế này: khi một ứng dụng khởi chạy, nó sẽ kiểm tra loại hệ điều hành hiện tại. Ứng dụng sử dụng thông tin này để tạo một đối tượng gốc từ một lớp phù hợp với hệ điều hành. Phần còn lại của mã sử dụng nhà máy này để tạo các phần tử giao diện người dùng. Điều này ngăn không cho các phần tử sai được tạo ra.

   Với cách tiếp cận này, mã khách hàng không phụ thuộc vào các lớp cụ thể của nhà máy và phần tử giao diện người dùng miễn là nó hoạt động với các đối tượng này thông qua giao diện trừu tượng của chúng. Điều này cũng cho phép mã máy khách hỗ trợ các nhà máy hoặc phần tử giao diện người dùng khác mà bạn có thể thêm vào trong tương lai.

   Do đó, bạn không cần phải sửa đổi mã khách hàng mỗi khi bạn thêm một biến thể mới của các phần tử giao diện người dùng vào ứng dụng của mình. Bạn chỉ cần tạo một lớp nhà máy mới tạo ra các phần tử này và sửa đổi một chút mã khởi tạo của ứng dụng để nó chọn lớp đó khi thích hợp.

```
// The abstract factory interface declares a set of methods that
// return different abstract products. These products are called
// a family and are related by a high-level theme or concept.
// Products of one family are usually able to collaborate among
// themselves. A family of products may have several variants,
// but the products of one variant are incompatible with the
// products of another variant.
interface GUIFactory is
    method createButton():Button
    method createCheckbox():Checkbox


// Concrete factories produce a family of products that belong
// to a single variant. The factory guarantees that the
// resulting products are compatible. Signatures of the concrete
// factory's methods return an abstract product, while inside
// the method a concrete product is instantiated.
class WinFactory implements GUIFactory is
    method createButton():Button is
        return new WinButton()
    method createCheckbox():Checkbox is
        return new WinCheckbox()

// Each concrete factory has a corresponding product variant.
class MacFactory implements GUIFactory is
    method createButton():Button is
        return new MacButton()
    method createCheckbox():Checkbox is
        return new MacCheckbox()


// Each distinct product of a product family should have a base
// interface. All variants of the product must implement this
// interface.
interface Button is
    method paint()

// Concrete products are created by corresponding concrete
// factories.
class WinButton implements Button is
    method paint() is
        // Render a button in Windows style.

class MacButton implements Button is
    method paint() is
        // Render a button in macOS style.

// Here's the base interface of another product. All products
// can interact with each other, but proper interaction is
// possible only between products of the same concrete variant.
interface Checkbox is
    method paint()

class WinCheckbox implements Checkbox is
    method paint() is
        // Render a checkbox in Windows style.

class MacCheckbox implements Checkbox is
    method paint() is
        // Render a checkbox in macOS style.


// The client code works with factories and products only
// through abstract types: GUIFactory, Button and Checkbox. This
// lets you pass any factory or product subclass to the client
// code without breaking it.
class Application is
    private field factory: GUIFactory
    private field button: Button
    constructor Application(factory: GUIFactory) is
        this.factory = factory
    method createUI() is
        this.button = factory.createButton()
    method paint() is
        button.paint()


// The application picks the factory type depending on the
// current configuration or environment settings and creates it
// at runtime (usually at the initialization stage).
class ApplicationConfigurator is
    method main() is
        config = readApplicationConfigFile()

        if (config.OS == "Windows") then
            factory = new WinFactory()
        else if (config.OS == "Mac") then
            factory = new MacFactory()
        else
            throw new Exception("Error! Unknown operating system.")

        Application app = new Application(factory)
```

### 4. Cách thực hiện

   1. Lập bản đồ ma trận các loại đối tượng khác biệt so với các biến thể của những đối tượng này.

   2. Khai báo các interface của các đối tượng cho tất cả các loại đối tượng.

   3. Khai báo giao diện factory trừu tượng với một tập hợp các phương pháp tạo cho tất cả các đối tượng trừu tượng.

   4. Triển khai một tập hợp các lớp nhà máy cụ thể, một lớp cho mỗi biến thể của đối tượng.

   5. Tạo mã khởi tạo gốc ở đâu đó trong ứng dụng. Nó sẽ khởi tạo một trong các lớp của nhà máy bê tông, tùy thuộc vào cấu hình ứng dụng hoặc môi trường hiện tại. Chuyển đối tượng factory này cho tất cả các lớp tạo đối tượng.

   6. Quét qua mã và tìm tất cả các lệnh gọi trực tiếp đến các nhà xây dựng đối tượng. Thay thế chúng bằng các cuộc gọi đến phương thức tạo thích hợp trên đối tượng factory.

### 5. Ưu nhược điểm
####    Ưu điểm:
-   Bạn có thể chắc chắn rằng các đối tượng bạn nhận được factory sẽ tương thích với nhau
-   Nguyên tắc Trách nhiệm Đơn lẻ. Bạn có thể trích xuất mã tạo đối tượng vào một nơi, hỗ trợ mã dễ dàng hơn.
-   Nguyên tắc Mở / Đóng. Bạn có thể giới thiệu các biến thể mới của đối tượng mà không cần phá vỡ các đối tượng ban đầu
####    Nhược điểm:
-   Mã có thể trở nên phức tạp hơn mức bình thường, vì rất nhiều giao diện và lớp mới được giới thiệu cùng với mẫu.