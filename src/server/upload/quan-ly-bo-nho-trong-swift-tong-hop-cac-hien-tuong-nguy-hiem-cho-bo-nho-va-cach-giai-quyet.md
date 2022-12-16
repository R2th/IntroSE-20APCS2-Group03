Chúng ta đã biết cách hoạt động của ARC trong swift và khi nào xảy ra của hiện tượng strong reference cycle, trong bài này chúng ta sẽ cùng tìm hiểu cách cách để giải quyết hiện tượng nguy hiểm trên, đồng thời sẽ tìm hiểu thêm một số hiện tượng nguy hiểm khác và cách giải quyết chúng thông bài này.

Để bắt đầu cho bài viết này, các bạn nên sử dụng Xcode Playground để thực hành code theo các ví dụ trong bài, nó giúp bạn sẽ dễ hiểu và nhớ lâu hơn.

## Giải quyết strong reference cycle
Swift sẽ cung cấp cho chúng ta 2 cách giải quyết ứng với 2 từ khoá là weak và unowned.
Có thể hiểu đơn giản là khi dùng 2 từ khoá trên thì chúng ta có thể dễ dàng bẻ gãy liên kết và giải phóng đối tượng.


**Weak reference**
Có thể hiểu nó là một liên kết yếu, là liên kết dễ bị phá vỡ bởi ARC, do đó chúng ta chỉ cần sử dụng từ khoá weak trước từ khoá khai bao biến là có thể dùng nó để tránh được strong reference cycle. 

Lưu ý:
ARC sẽ tự động gián giá trị nil cho biến dùng từ khoá weak khi biến đó được giải phóng. Do đó các biến dùng từ khoá weak thì sẽ dùng từ khoá var để khái báo và là biến optional.

Giờ chúng ta sẽ xem ví dụ giải quyết strong reference cycle ở trên:
```swift
class Person {

   let name: String

   init(name: String) { self.name = name }

   var apartment: Apartment?

   deinit { print("\(name) is being deinitialized") }

}

 
class Apartment {

   let unit: String

   init(unit: String) { self.unit = unit }

   weak var tenant: Person?

   deinit { print("Apartment \(unit) is being deinitialized") }

}
```
Chắc các bạn cũng thấy được sự khác biệt trong khái báo biến ở trên. Đó là dùng từ khoá weak.
Bây giờ sẽ tạo 2 instance liên kết với nhau:
```swift
var john: Person?

var unit4A: Apartment?



john = Person(name: "John Appleseed")

unit4A = Apartment(unit: "4A")



john!.apartment = unit4A

unit4A!.tenant = john
```
Và chúng ta cùng xem sự khác biệt trong liên kết giữa hai instance như sau:

![](https://images.viblo.asia/be468431-633c-472d-b04e-65f9cc29e226.png)

Giờ chúng ta đã có một liên kết yếu tư tenant tới Persion, và 3 liên kết mạnh. Bây giờ chúng ta sẽ phá vỡ liên kết của biến john .khi đó chúng ta chỉ cần gán nil cho john thì liên kết weak sẽ bị ARC tự phá vỡ và giải phóng instance đồng thời các liên kết từ john tới Persion và từ Persion tới Apartment cũng bị phá vỡ liên kết, như các bạn đã biết nếu Persion instance không có liên kết nào(reference counting = 0) thì nó sẽ bị ARC hủy và khi đó trong màn hình console sẽ xuất hiện dòng chữ "Prints 'John Appleseed' is...." Như hình minh họa bên dưới:

john = nil 
// Prints "John Appleseed is being deinitialized"
![](https://images.viblo.asia/5b9c995e-48c1-40d8-9c03-33b071a7b0bb.png)

Tương tự gán nil cho unit4A chúng ta sẽ phá vỡ liên kết strong còn lại như sau.

![](https://images.viblo.asia/5f108dd8-934b-4e78-b033-db217cae3259.png)

Cuối cùng các instance đã được giải phóng hoàn toàn trong bộ nhớ một cách an toàn.Tiếp theo một cách khác đó là:


## Unowned reference
Giống như weak reference nó cũng tạo ra một liên kết nhưng liên kiết này không phải là một liên kết mạnh(liên kết khó bị phá vỡ). Không giống với weak reference, tuy nhiên nó được sử dụng khi chúng ta muốn có một instance mới nào đó có cùng thời gian tồn tại với instance mà nó tham chiếu, hiểu đơn giản hơn thì khi chúng ta tạo mới một instance A tham chiếu unowned tới insatnce B, khi đó insatnce B bị hủy thì instance A cũng bị hủy và liên kết cũng tự bị phá vỡ. Nếu còn khó hiểu thì chúng ta có thể hiểu đơn giản thế này: Chúng ta có một cái thuyền(nó là một instance) đang ở giữa sông và có 2 người trên thuyền(là 2 instance đang tham chiếu tới cái thuyền đó), bây giờ thuyền đó bị chìm thì mọi thứ trên thuyền cũng đi theo luôn. Đó được hiểu là kiểu tham chiếu Unowned.
  
Vậy để tạo một liên kết như vậy chúng ta dùng từ khóa unowned trước từ khóa khai báo biến let or var.

**Lưu ý:**
Vì unowend reference luôn luôn có giá trị vì nó tham chiếu tới một instance nào đó có giá trị. Khi đó ARC không bao giờ gán nil cho các biến unowend có nghĩa là biến unowned sẽ không được định nghĩa dưới dạng biến optional.
Khi sử dụng biến unowned chúng ta phải đảm bảo rằng instance mà chúng ta tham chiếu sẽ không bị giải phóng khi biến unowned vẫn còn được dùng. Như các bạn đã biết ở trên thì nếu insatnce được tham chiếu bị giải phóng thì biến unowned tham chiếu tới cũng tự bị giải phóng vì thế nên khi chúng ta sử dụng biến đã bị giải phóng thì sẽ xảy ra lỗi runtime và dẫn tới crash ứng dụng.
Để hiểu hơn chúng ta sẽ cùng nhiều tìm hiểu ví dụ sau:
Đầu tiên chúng ta sẽ định nghĩa 2 class sau đây:
```swift
class Customer {

   let name: String
   var card: CreditCard?

   init(name: String) {
       self.name = name
   }
   deinit { print("\(name) is being deinitialized") }
}


class CreditCard {
   let number: UInt64
   unowned let customer: Customer

   init(number: UInt64, customer: Customer) {
       self.number = number
       self.customer = customer
   }

   deinit { print("Card #\(number) is being deinitialized") }
}

```
Tiếp theo chúng ta sẽ khai báo và khởi tạo các biến như sau:

```swift
var john: Customer? 
john = Customer(name: "John Appleseed") 
john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
```

Chúng ta sẽ xem các liên kết được tạo ra như hình sau:

![](https://images.viblo.asia/ab7e656a-6f7b-4c1e-b44b-a4501c47ef3a.png)

Chúng ta sẽ thấy Customer instance đang liên kết mạnh với CreditCard instance và CreditCard instance đang liên kết unowned với  Customer instance.

Bởi vì biến customer có liên kết unowned nên khi đó chúng ta phá vở liên kết strong của biến join bằng cách gián nil cho biến john thì sẽ phá vỡ các liên kết tới Customer instance như sau:

![](https://images.viblo.asia/e3f1206e-57ff-4d39-bc8d-f29508336370.png)

Bởi vì không còn liên kết strong tới customer instance nửa nên nó sẽ bị giải phóng và sau đó, CreditCard instance cũng sẽ không còn liên kết mạnh nửa nên nó cũng bị giải phóng luôn. Bạn có thế gián nil cho john để xem log kết quả như bên dưới:

```swift
john = nil 
// Prints "John Appleseed is being deinitialized" 
// Prints "Card #1234567890123456 is being deinitialized"
```

Vậy chúng ta đã biết thêm được một cách nửa để không bị strong reference cycle.

**Unowned References and Implicitly Unwrapped Optional Properties**

Ngoài 2 cách trên chúng ta còn một cách thứ 3 nửa để tránh được strong reference cycle như sau:

```swift
class Country {

   let name: String
   var capitalCity: City!

   init(name: String, capitalName: String) {
       self.name = name
       self.capitalCity = City(name: capitalName, country: self)
   }
}

class City {

   let name: String
   unowned let country: Country
   
   init(name: String, country: Country) {
       self.name = name
       self.country = country
   }
}

var country = Country(name: "Canada", capitalName: "Ottawa")

print("\(country.name)'s capital city is called \(country.capitalCity.name)")

// Prints "Canada's capital city is called Ottawa"
```
Với cách mô tả như trên thì chúng ta sẽ thấy được rằng trong lớp City có lưu trữ lớp Country thông qua thuộc tính country và là một liên kết dễ phá vỡ(unowned). Khi đó ARC có thể dễ dàng bị bẽ gãy các tham chiếu giữa class City với class Country và giải phóng các đối tượng khi đối tượng đó không được sử dụng trong một thời gian nào đó.
Đó cũng là một cách tránh tạo nên strong reference cycle giữa các đối tượng với nhau.

Tiếp theo chúng ta sẽ đến với trường hợp cuối có thể tạo nên strong reference cycle đó là:


**Strong Reference Cycles for Closures**

Để biết và hiểu được tại sao Closures lại tạo nên Strong reference cycles thì chúng ta sẽ tìm hiểu qua ví dụ sau:
```swift
class HTMLElement {

   let name: String
   let text: String?

   lazy var asHTML: () -> String = {
       if let text = self.text {
           return "<\(self.name)>\(text)</\(self.name)>"
       } else {
           return "<\(self.name) />"
       }
   }

   init(name: String, text: String? = nil) {

       self.name = name

       self.text = text
   } 

   deinit {
       print("\(name) is being deinitialized")
   }
}
```

Chúng ta để ý sẽ thấy trong class HTMLElement có một biến closurse asHTML và trong closurse đó có dùng 2 properties (text, name) của class HTMLElement.

Bây giờ chúng ta khởi tạo chúng như sau:

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world") 
print(paragraph!.asHTML()) 
// Prints "<p>hello, world</p>"
```

Với cách viết như trên mặc nhiên chúng ta đã tạo ra một strong reference cycle giữa lớp HTMLElement và closures như hình bên dưới như sau:

![](https://images.viblo.asia/656d7267-3d12-4939-a4d1-216067bb8117.png)

Lưu ý:

Biến paragraph được mô tả dưới dạng biến optional để có thể gián nil và để chứng minh rằng biến paragraph không bị giải phóng vì bị strong reference cycle.

Chúng ta bắt đầu gán nil cho biến paragraph để bẻ gảy liên kết và giải phóng biến đó như sau:

```swift
pharagraph = nil
```
Nhưng điều gì đã xảy ra, nếu mà biến đó thực sự được giải phóng thì console đã in dòng chữ trong hàm deinit rồi. Lý do là vì nó đang bị strong reference cycle.

Vậy cách giải quyết vấn đề này như thế nào?

**Giải quyết strong reference cycle với clouse như sau:**

Để giải quyết cycle giữa class và closure chúng ta cần định nghĩa một capture list, Có thể hiểu đơn giản capture list là một cách định nghĩa lại các biến bên ngoài mà được sử dụng lại bên trong phần thân của closure. Việc định nghĩa này chúng ta sẽ dùng các từ khóa weak hay unowned để định nghĩa lại các biến và sử dụng chúng trong thân của closure, Chắc các bạn cũng hiểu tại sao lại dùng các từ khóa này, đơn giản vì nhờ các từ khóa này mà ARC có thể dễ dàng phá vở các liên kết và giải phóng đối tượng.

Đinh nghĩa capture list như ví dụ sau:
```swift
lazy var someClosure: (Int, String) -> String = {
    [unowned self, weak delegate = self.delegate!] (index: Int, stringToProcess: String) -> String in
   // closure body goes here
}
```

Nếu một closure không có tham số thì ta có thể mô tả đơn giản như thế này:

```swift
lazy var someClosure: () -> String = {
     [unowned self, weak delegate = self.delegate!] in
   // closure body goes here 
}
```

Một số lưu ý lớn khi dùng weak và unowned với Closure:

Nếu chúng ta đinh nghĩa các biến capture trong closurse mà sử dụng liên kết unowned thì biến capture được định nghĩa đó sẽ luôn luôn được liên kết tới tham chiếu instance của nó và khi instance mà nó tham chiếu tới bị hủy thì nó cũng bị hủy ngay lập tức. Chúng ta phải lưu ý đều này nhé, sẽ có trường hợp trong closures bạn sử dụng các bến capture đã bị hủy thì sẽ xảy ra crash ứng dụng. Do đó nên khi sử dụng từ khóa unowned chúng ta phải cân nhắc cận thận các trường hợp xảy ra.

Ngược lại, Nếu định nghĩa các biến capture mà dùng weak thì sẽ có trường hợp là biến capture đó sẽ bị gián nil khi mà đối tượng nó tham chiếu tới bị hủy. Do vậy mà các biến weak thường dùng từ khóa var và là biến optional để có thể được gián nil bởi ARC. Do đó các bạn lưu ý khi sử dụng các biến capture mà dùng weak thì nên kiểm tra xem nó có bị nil không rồi hãy sử dụng nhé. Không lại gây crash ứng dụng.


Mẹo nhỏ:

Nếu bạn chắc chắc 100% là biến capture sẽ không bao giờ bị nil thì bạn hãy dùng unowned reference nhé.

Bây giờ chúng ta sẽ giải quyết vụ cycle ở trên bắng cách dùng unowned như sau:

```swift
class HTMLElement {

   let name: String
   let text: String?
 
   lazy var asHTML: () -> String = {
       [unowned self] in
       if let text = self.text {
           return "<\(self.name)>\(text)</\(self.name)>"
       } else {
           return "<\(self.name) />"
       }
   }

   init(name: String, text: String? = nil) {
       self.name = name
       self.text = text
   }

   deinit {
       print("\(name) is being deinitialized")
   }  

}
```

Và khởi tạo như sau:

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world") 
print(paragraph!.asHTML()) 
// Prints "<p>hello, world</p>"
```

Chúng ta sẽ có các tham chiếu như sau:

![](https://images.viblo.asia/4808fa32-482e-4068-adfd-c0d6514f7a1a.png)

Tương tự như các ví dụ trên thì chúng ta sẽ bẻ gãy liên kết strong của bến paragarph như sau:

```swift
paragraph = nil 
// Prints "p is being deinitialized"
```

Và thấy được hàm deinit được gọi, có nghĩa mà biến này đã được hủy hoàn toàn.
Bạn có thể thử code nhưng sử dụng từ khóa weak cho ví dụ trên và sẽ thấy kết quả tương tự như trên.


Kết thúc bài này, chúng ta đã biết được các trường hợp xảy ra strong reference cycle, các phòng tránh nò và các giải quyết nó một cách hợp lý nhất. Đồng thời chúng ta cũng hiểu rõ cơ chế hoạt động của ARC trong Swift như thế nào. Từ đó mà chúng ta có thể tạo ra những dòng code an toàn, không sợ gây ra tràn bộ nhớ và nguy hiểm hơn là gây ra crash ứng dụng.

Nếu các bạn thức sự chưa hiểu bài này hoặc có thắc mắc gì liên qua thì nên comment bên dưới để hiểu rõ hơn vì bài này cực kỳ quan trọng cho chúng ta đặt biệt khi làm các ứng dụng lớn. Bộ nhớ là thứ quan trọng để chạy một ứng dụng nào đó nên không những tiết kiệm mà còn tránh làm hao phí nó một cách vô lý như vậy.

Mọi kiến thức trên được tham khảo từ tài liệu Apple và một số kinh nghiệm của mình. Nếu có gì sai hoặc thiếu hoặc khó hiểu mong các bạn góp ý. Chân thành cảm ơn.
Hy vọng các bạn thích và học được nhiều kiến thức từ bài viết này. Mong các bạn chia sẽ nó để mọi người cùng học và cùng trao đổi. Mọi thắc mắc hay trao đổi về bài viết, các bạn có thể để lại bình luận bên dưới mình sẽ hỗ trợ sớm nhất.
Chân thành cảm ơn các bạn đã theo dõi. 

Trích : http://xuanvinhtdswift.blogspot.com/2018/01/quan-ly-bo-nho-trong-swiftphan-2-tong.html