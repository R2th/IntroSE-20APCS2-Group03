Làm việc với các protocol là một trong những tính năng cơ bản nhất của Swift. Với protocol, bạn xác định "quy tắc" mà một lớp tiếp nhận phải tuân theo. Nguyên tắc này cho phép bạn viết mã Swift tách rời, modular và có thể mở rộng.

Trong bài viết này bạn sẽ biết cách làm việc với protocol, và tại sao nó hữu ích trong iOS development.
Mình sẽ đề cập đến các nguyên tắc Swift dựa trên các giao thức để hoạt động, chẳng hạn như dependency injection và delegate. Và tất nhiên, hướng dẫn này có rất nhiều code mà bạn có thể thực hành.

# Thế nào là một Protocol trong Swift?
Hãy xem một ví dụ đơn giản về protocol trong Swift:
```Swift
protocol Edible {
    func eat()
}
```
Một protocol có tên là `Edible`, và có chức năng ăn. 
Tương tự như cách các class hoạt động, bạn define một protocol với cú pháp sau:
```Swift
protocol name {
    body
}
```
Protocol `Edible` định nghĩa một function gọi là `eat()`. Hãy xem protocol define function này, nhưng nó không hiện thực cho nó?

So sánh với class bạn sẽ thấy sự khác biệt rất lớn giữa class và protocol. Các protocol chỉ xác định các function và property nhưng không implement chúng.

Hãy xem định nghĩa chính thức của protocol:
> A protocol defines a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality.

Bạn có thể nói protocol định nghĩa luật hay "yêu cầu" như function hay property. Và các class khác có thể kế thừa những luật này và implement chúng sau. Bất cứ class nào thoả mãn luật của protocol thì có thể nói rằng nó conform theo protocol đó.
```Swift
class Apple: Edible {
    func eat() {
        print("Omnomnom! Eating the apple...")
    }
}
```

Một vài điểm chú ý:
* Class `Apple` kế thừa `Edible` protocol bằng cách ghi nó phía sau tên của class.
* Class `Apple` thoả mãn protocol `Edible` bằng cách implement `eat()` function

# Tại sao Protocol lại hữu dụng?
Nhưng… tại sao lại sử dụng các protocol? Chẳng lẽ chúng ta vừa cung cấp cho class `Apple` một function `eat ()?` Tại sao bạn cần một protocol để define nó?

Sức mạnh của các protocol là chúng hợp thức kết nối giữa các phần khác nhau trong code của bạn mà không cung cấp các implement. Điều này cho phép bạn xây dựng các cấu trúc khác nhau trong code của mình mà không cần kết hợp chặt chẽ các thành phần của code.

Hãy cùng tìm hiểu ý nghĩa chính xác của điều đó… Chúng ta sẽ bắt đầu bằng cách tạo một lớp đơn giản, như sau:
```Swift
class Person {
    var name: String = ""

    func provideSnack(withItem item: Apple) {
        item.eat()
    }
}
```

Trong mẫu code ở trên, bạn đã tạo một class `Person`. Nó có một thuộc tính `name` kiểu String. Và nó có một function `provideSnack(withItem:)`

Function `provideSnack(withItem:)` có một tham số `item` có kiểu `Apple`. Khi hàm này được gọi, sau đó nó gọi `eat ()` trên instance `Apple` và được cho là "ăn" quả táo như một bữa ăn nhẹ.

Hãy sử dụng các class `Person` và `Apple` như thế này:
```Swift
let apple = Apple()

let bob = Person()
bob.name = "Bob"

bob.provideSnack(withItem: apple)

// Output: Omnomnom! Eating the apple...
```

Vậy, vấn đề với class `Person` là gì? Nó chỉ có thể ăn táo! Và thậm chí tệ hơn: class `Person` và `Apple` hiện đang kết hợp chặt chẽ với nhau, bởi vì chúng dựa vào việc triển khai của nhau để hoạt động. Có cách nào để khắc phục nhược điểm đó không? Đó là nơi xuất hiện các giao thức.

Đầu tiên, chúng ta sẽ thay đổi func `provideSnack(withItem:)`. Như thế này:
```Swift
func provideSnack(withItem item: Edible) {
    item.eat()
}
```

Loại tham số item hiện là `Edible`, thay vì `Apple`. Vì vậy, chúng ta đã chỉ ra rằng `item` có thể là bất kỳ type nào miễn là nó phù hợp với `Edible`.

Hãy kiểm tra điều đó. Tạo một loại thực phẩm khác, như thế này:
```Swift
class CandyBar: Edible {
    func eat() {
        print("*** munch, munch *** Mmmm, tasty candy bar!")
    }
}
```

Hãy xem class `CandyBar` này cũng kế thừa và tuân theo `Edible` như thế nào? Bạn có thể dễ dàng cung cấp một instance của class đó cho `provideSnack(withItem:)` Như thế này:
```Swift
let candy = CandyBar()
bob.provideSnack(withItem: candy)
// Output: *** munch, munch *** Mmmm, tasty candy bar!
```
Vậy, điều gì đang thực sự xảy ra ở đây?
* Thay vì ghép các class `Person` và `Apple` với nhau, chúng ta chỉ cần thêm protocol `Edible` như một yêu cầu cho hàm `provideSnack(withItem:)`. 
* Về cơ bản, hàm `provideSnack(withItem:)` không quan tâm đến item bạn cung cấp, miễn là nó phù hợp với `Edible`.
* Vì protocol định nghĩa một hàm `eat ()`, bạn có thể gọi hàm đó trên item mà không cần biết chính xác type của nó.

Bạn có thể tóm tắt điều đó như sau… Class `Person` có thể sử dụng bất kỳ class nào phù hợp với `Edible` mà không cần biết việc triển khai của class đó. Điều này làm tăng tính linh hoạt và khả năng kết hợp trong code của bạn, đồng thời làm cho nó được liên kết lỏng lẻo hơn.

Đó là sức mạnh của protocol
# Protocols as Types
Các protocol có một lợi thế khác. Giả sử bạn và tôi đang làm việc trên cùng một ứng dụng. Đó là một ứng dụng nhà hàng và tôi đang xây dựng nhà bếp và bạn đang xây dựng bàn ăn, bồi bàn và khách.

Có lúc tôi cần giao một chiếc bánh pizza đã làm trong nhà bếp cho người phục vụ. Bởi vì bạn đang xây dựng người phục vụ, bạn cần biết từ tôi loại thực phẩm mà tôi sẽ cung cấp cho người phục vụ.

Và pizza không phải là thứ duy nhất nhà bếp có thể cung cấp. Nó nấu bít tết, phục vụ bia, làm súp, v.v.

Vì vậy, chúng ta đưa ra một cấu trúc mà người phục vụ có thể làm việc. Chúng ta sử dụng subclassing and inheritance, nhưng sau đó chúng tôi phát hiện ra rằng một miếng bít tết và một cốc bia không thể thực sự kế thừa từ cùng một class cha. Chúng quá khác nhau!

Và chúng ta cũng muốn giữ cho những người phục vụ yên tâm hơn và không để họ phụ thuộc quá nhiều vào hoạt động bên trong của nhà bếp. Chúng tôi nhận ra rằng thông tin duy nhất mà một người phục vụ thực sự cần, là liệu một món đồ từ nhà bếp có thể được mang từ bếp lên bàn hay không.

Vì vậy, chúng tôi tạo một protocol `Servable`:
```Swift
protocol Servable {
    func pickup()
    func carry()
    func serve()
}
```
Do đó, những người phục vụ giờ đây biết rằng cái gì từ nhà bếp đều có thể được phục vụ. Họ đã xác định như vậy trong code của họ rằng bất kỳ thứ gì nhà bếp cung cấp đều cần tuân theo protocol `Servable`.

Bạn và tôi, chúng ta có thể tự triển khai nhà bếp và nhà hàng. Quy tắc duy nhất mà chúng ta đã chính thức hóa là cách nhà bếp giao tiếp với những người phục vụ. Và đó là tất cả những gì họ cần biết!

Khi nhà bếp thay đổi cách làm bia, nhân viên phục vụ vẫn có thể phục vụ bia đó đến bàn của khách. Và khi một người phục vụ mới được thuê, họ chỉ cần được đào tạo về cách gọi các chức năng của `Servable` bất kể chúng được implement như thế nào.

Tất nhiên đây chỉ là một câu chuyện. Nó giúp bạn hiểu các bộ phận chuyển động trong ứng dụng iOS bằng cách phóng đại chúng. Trong quá trình phát triển iOS thực tế, bạn có thể sẽ không viết code nhà hàng với những người phục vụ. Vì vậy, bạn sẽ sử dụng các giao thức để làm gì?

Hãy xem một vài ví dụ:

* [Delegate](https://viblo.asia/p/delegate-trong-swift-L4x5xa6qKBM) là một trong những cách sử dụng phổ biến nhất cho các protocol. Delegate hoạt động bằng cách chuyển chức năng từ một class cơ sở sang một delegate class khác. Class cơ sở này thường nằm ngoài sự kiểm soát của nhà phát triển, nhưng bằng cách sử dụng một delegate, bạn vẫn có thể ảnh hưởng đến chức năng của nó. Và bạn đã đoán được điều đó, delegate sử dụng các protocol để xác định chức năng nào có thể được sử dụng. Delegate được sử dụng phổ biến trong các nền tảng và SDK của Apple, vì vậy, bạn phải nắm vững. Các trường hợp sử dụng phổ biến bao gồm table view, CLLocationManager và truyền dữ liệu giữa các ViewController.
* Dependency Injection là một kỹ thuật giúp kiểm tra các thành phần trong code của bạn dễ dàng hơn. Nó sử dụng các protocol để tạo ra các implement nông của một số loại nhất định, được gọi là sơ khai và triển khai giả mạo của các đối tượng nhất định, được gọi là mocks. Hãy tưởng tượng bạn đang chế tạo một chiếc ô tô có động cơ. Bạn muốn kiểm tra xe và động cơ riêng biệt. Vì vậy, bạn tạo ra một giao thức xác định sự tương tác giữa ô tô và động cơ. Bạn tiêm một động cơ "giả" vào xe để kiểm tra xem xe phản ứng với động cơ như thế nào và bạn giả một chiếc xe giả với động cơ thật để kiểm tra xem động cơ phản ứng với xe như thế nào.
* Protocol-Oriented Programming(POP) là một tập hợp các nguyên tắc, khái niệm và phương pháp hay nhất để cung cấp cho các protocol có thể kết hợp một vai trò nổi bật hơn trong việc phát triển iOS thực tế. Bạn có thể xem Protocol-Oriented Programming như một phần mở rộng của Object-Oriented Programming. Với POP, bạn tạo các function trong ứng dụng của mình bằng cách soạn các protocol khác nhau, thay vì xác định cấu trúc class cứng nhắc và phân cấp bằng cách sử dụng kế thừa. Protocol-Oriented Programming làm tăng tính mô-đun cho code của bạn bằng cách làm cho các thành phần riêng lẻ gọn gàng hơn, đồng thời nó cho phép kiểm soát nhiều hơn việc triển khai chính xác chức năng. Lý thuyết và ứng dụng thực tế của POP khác nhau rất nhiều. Một điểm khởi đầu tốt là [video WWDC này từ năm 2015](https://developer.apple.com/videos/play/wwdc2015/408/).

Bài viết đến đây là hết.

**NGUỒN**: https://learnappmaking.com/protocols-swift-how-to/