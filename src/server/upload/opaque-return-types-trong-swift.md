Opaque Return Types là một tính năng mới được phát hành trong Swift 5.1 bởi Apple. Nó có thể được sử dụng để return `some`  value cho method / function và `property` mà không tiết lộ cụ thể type của giá trị cho người gọi nó. Return type sẽ là `some` của một `protocol`. Sử dụng phương pháp này thì module không cần công khai return type và nội dung của method, nó chỉ cần return opaque type của một protocol với từ khoá `some`. Swift compiler cũng có thể giữ nguyên `identity` của return type không giống với việc sử dụng `protocol` làm return type. `SwiftUI` sử dụng opaque return type bên trong nó. `View` protocol sẽ return `some View` trong `body` của property.

Dưới đây là một số điều cần thiết mà các opaque return cung cấp để giữ trong toolbox của chúng ta và tận dụng bất cứ khi nào chúng ta muốn tạo API bằng Swift:
1. Cung cấp một type protocol cụ thể mà không để lộ `concrete` type cho người gọi API để `encapsulation` tốt hơn.
2. Bởi vì API không để lộ return type cụ thể cho người gọi nên người gọi không cần lo lắng về việc nếu trong tương lai các type cơ bản bị thay đổi chỉ cần nó miễn sao nó implement base protocol.
3. Cung cấp một sự đảm bảo mạnh mẽ về identity bằng cách return một type cụ thể trong thời gian chạy. Sự đánh đổi là mất đi tính linh hoạt của việc return nhiều type của giá trị được đề nghị vì sử dụng `protocol` như một return type.
4. Bởi vì việc đảm bảo sẽ return về một protocol cụ thể. Function có thể return `opaque` `protocol` type nếu nó có `Self` hoặc yêu cầu `associated type`.
5. Trong khi `protocol` để lại việc quyết định type của return cho người gọi. Còn `opaque` thì ngược lại. Chính `function` sẽ quyết định việc return type cụ thể nào miễn là nó implement `protocol`.

## Hãy xem ví dụ về việc sử dụng Opaque return type.
Để hiểu hơn về `opaque` return type và tại sao nó khác so với việc chỉ sử dụng `protocol` như một return type.
### Định nghĩa một protocol với associatedtype
Chúng ta có một `protocol` gọi là `MobileOS`. `Protocol` này có một `associatedtype` gọi là `Version` và một `property` để get `Version` cho type cụ thể để có thể implement.
```Swift
protocol MobileOS {
    associatedtype Version
    var version: Version { get }
    init(version: Version)
}
```
### Implement type cụ thể cho protocol
Định nghĩa 2 type cụ thể cho protocol này, gọi là `iOS` và `Android`. Cả 2 có sự khác nhau về ngữ nghĩa của `Version`. `iOS` sử dụng type `float` trong khi `Android` sử dụng `String`
```Swift
struct iOS: MobileOS {
    var version: Float
}
struct Android: MobileOS {
    var version: String
}
```
## Tạo function để return một Protocol type
Chúng ta muốn tại một function return một `MobileOS` protocol như là một return type. Theo cách thông thường ta sẽ viết như thế này:
### Solution 1 (Returns Protocol Type):
```Swift
func buildPreferredOS() -> MobileOS {
    return iOS(version: 13.1)
}
// Compiler ERROR 😭
Protocol 'MobileOS' can only be used as a generic constraint because it has Self or associated type requirements
```
Như bạn thấy, build fail tại vì protocol có sử dụng `associatedtype`. Compiler không giữ type identity của return value khi sử dụng protocol như một return type. Vậy giờ chúng ta hãy thử một vài cách khi mà return một type cụ thể.
### Solution 2 (Returns Concrete Type):
```Swift
func buildPreferredOS() -> iOS {
    return iOS(version: 13.1)
}
// Build successfully
```
Phương pháp này có vẻ hoạt động. Nhưng bạn có thể thấy người gọi có thể nhìn thấy type cụ thể. Đoạn code này có thể sẽ cần rất nhiều lần refactor nếu trong tương lại bạn muốn thay đổi gì đó như return `Android` như là return type của function.
### Solution 3 (Generic Function Return)
```Swift
func buildPreferredOS<T: MobileOS>(version: T.Version) -> T {
    return T(version: version)
}
let android: Android =  buildPreferredOS(version: "Jelly Bean")
let ios: iOS = buildPreferredOS(version: 5.0)
```
Cách làm này có vẻ "professional" hơn. Nhưng bây giờ người gọi phải cung cấp một type cụ thể cho function để return. Nhưng nếu bạn muốn người gọi thực sự không cần quan tâm đến type return cụ thể thì phương pháp này chưa đúng lắm.
### Final Solution (Opaque Return Type to the rescue 😋:)
```Swift
func buildPreferredOS() -> some MobileOS {
    return iOS(version: 13.1)
}
```
Sử dụng opaque return type, cuối cùng chúng ta có thể return `MobileOS` như một return type của function. Compiler duy trì identity cụ thể của return type ở đây và người gọi không cần phải biết type bên trong của return type miễn là nó thực hiện giao thức MobileOS.
## Opaque returns types chỉ có thể return một type cụ thể.
Bạn có thể nghĩ rằng giống như protocol return type, chúng ta cũng có thể return type cụ thể khác nhau bên trong opaque return type như sau:
```Swift
func buildPreferredOS() -> some MobileOS {
   let isEven = Int.random(in: 0...100) % 2 == 0
   return isEven ? iOS(version: 13.1) : Android(version: "Pie")
}
// Compiler ERROR 😭
Cannot convert return expression of type 'iOS' to return type 'some MobileOS'
func buildPreferredOS() -> some MobileOS {
   let isEven = Int.random(in: 0...100) % 2 == 0
   return isEven ? iOS(version: 13.1) : iOS(version: 13.0)
}
// Build Successfully 😎
```
Compiler sẽ trả về lỗi nếu bạn cố gắng return type khác nhau cho opaque return value. Bạn chỉ có thể return type khác nhau về giá trị cho cùng một type cụ thể.
## Đơn giản hoá sự phức tạp và nested type vào opaque return type
Final solution là một ví dụ về cách tận dụng `Opaque` return type để ẩn sự phức tạp và nested type vào một opaque protocol type đơn giản có thể được tiếp xúc với người gọi.

Hãy xem xét một function chấp nhận một mảng sử dụng ràng buộc chung cho phần tử của nó để tuân thủ numeric protocol. Array này thực hiện một số điều:
1. Lấy ra phần tử đầu tiên và cuối cùng của mảng
2. Lazily map function một cách khéo léo bằng cách thực hiện nhiều thao tác của chính nó cho từng phần tử.

Người gọi function này không cần biết return type, người gọi chỉ cần loop và print value.

Thử thực hiện điều này bằng cách sử dụng function.

### Solution 1: Using Generic Return Function
```Swift
func sliceFirstAndEndSquareProtocol<T: Numeric>(array: Array<T>) -> LazyMapSequence<ArraySlice<T>, T> {
   return array.dropFirst().dropLast().lazy.map { $0 * $0 }
}
sliceFirstAndEndSquareProtocol(array: [2,3,4,5]).forEach { print($0) }
// 9
// 16
```
Như bạn thấy thì return type của function này rất phức tạp và lồng nhau `LazyMapSequence<ArraySlice<T>, T>` trong khi người dùng lại sử dụng nó chỉ để loop và print cho mỗi phần tử.
### Solution 2: Simple Opaque Return Types
```Swift
func sliceHeadTailSquareOpaque<T: Numeric>(array: Array<T>) -> some Sequence {
    return array.dropFirst().dropLast().lazy.map { $0 * $0 }
}
sliceHeadTailSquareOpaque(array: [3,6,9]).forEach { print($0) }
// 36
```
Sử dụng cách này thì người dùng không cần phải biết về return type của function miễn là nó phù hợp với `sequence` protocol mà người dùng sử dụng.
## Opaque Return Types trong SwiftUI
SwiftUI cũng phụ thuộc rất nhiều vào cách tiếp cận này, do đó, phần `body` trong `View` không cần phải tiết lộ rõ ràng về return type miễn là tuân theo `View` protocol. Nếu không, kiểu trả về được suy ra có thể rất lồng nhau và phức tạp như thế này.
```Swift
struct Row: View {
    var body: some View {
        HStack {
           Text("Hello SwiftUI")
           Image(systemName: "star.fill")
        }
    }
}
```
Return type của `body` sẽ là:
```Swift
HStack<TupleView<(Text, Image)>>
```
Nó khá phức tạp và lồng nhau 🤯, hãy nhớ rằng nó cũng sẽ thay đổi bất cứ khi nào chúng ta thêm một view lồng nhau mới bên trong HStack. Opaque return type thực sự tỏa sáng trong triển khai SwiftUI, người dùng không thực sự quan tâm đến type cụ thể bên trong `View` miễn là loại trả về tuân thủ protocol `View`.

Bài viết về Opaque Return Type đến đây là hết. Cảm ơn các bạn đã đọc.

Nguồn: https://medium.com/@alfianlosari/understanding-opaque-return-types-in-swift-9c36fb5dfa86