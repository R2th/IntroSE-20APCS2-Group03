**Chapter 4 Generic**

Tôi đã nhận rất nhiều những phản hồi về lập trình hướng protocol sau khi bản đầu tiên được xuất bản. Hầu hết những phản hồi này rất tích cực, tuy nhiên có một đoạn đối thoại tôi đa thực hiện với một trong những người thông minh nhất tối đã có đặt ân để được gặp, để nói về lập trình hướng protocol. Một trong những bình luận anh ấy đã nói làm tôi không nên bỏ qua phần lập trình generic. Đoạn hội thoại đó chúng tối đã nói về lập trình generic thật sự là phần thiếu xót của tôi và khi tôi có cơ hội để viết phiên bản mới của cuốn sách này, tôi đã có cơ hội để thêm nó vào chương này generics.

Nhưng gì chúng ta sẽ làm trong chương này:
* Generics là gì
* Cách để tạo hàm generic.
* Cách để tạo kiểu generic
* Cách để dùng subscripts generic
* Cách để thực thi copy-on-write
* Cách để thiết kế rất linh hoạt và tái sử dụng với protocols và generic

Generic cho phép chúng ta viết rất linh hoạt và tái sử dụng và tránh sự trùng lắp . Với một ngôn ngữ an toàn như swift, chúng ta thường xuyên cần viết những chức năng hoặc kiểu và có giá trị cho nhiều loại kiểu dữ liệu. Ví dụ chúng ta có thể cần viết một hàm để hoán đổi giá trị của 2 biến , tuy nhiên chúng ta có thể muốn hàm này hoán đổi 2 biến kiểu String, 2 biến kiểu Integer hay Double. Nếu không có generic chúng ta sẽ viết 3 hàm riêng biệt. Với generic chúng ta có thể viết một hàm generic để cung cấp tính năng hoán đổi cho những kiểu khác nhau.

“Generics cho phép chúng ta nói với hàm hoặc kiểu dữ liệu rằng: Tôi biết swift là một ngôn ngữ an toan, nhưng tôi không biết kiểu sẽ cần sau này. Tôi sẽ đưa cho bạn 1 chỗ giữ chân bây giờ và sẽ cho bạn biết đó là kiểu gì vào lúc chạy thực sự”

Cho dù bạn có nhận ra hay không, generic phần đóng vai trò rất lớn trong mõi chương trình được viết trong swift bởi vì generics đóng vai trò lớn trong ngôn ngữ swift. Chúng ta có thể thấy nhiều mảng như một ví dụ về nơi generics được dùng trong thư viện chuẩn swift. Generics cho phép chúng ta tạo một mảng chứa thực thể của bất kì kiểu dữ liệu nào.

Optionals là một ví dụ khác của generics được dùng trong ngôn ngữ swift. Kiểu tuỳ biến được định nghĩa như một enumeration với 2 giá trị tuỳ biến: None và Some(T), nơi T là giá trị thích hợp của kiểu thích hợp. nếu chúng ta thiết lập optional là nil sao đó nó sẽ nhận giá trị None và nếu chúng ta thiết lập giá trị tới một giá trị cho optional sau đó nó sẽ có giá trị của Some với một giá trị thích hợp của kiểu thích hợp. Bên trong, một Optional được định nghĩa như sau:
```
enum Optional<T> {
	case None
	case Some(T)
}
```
ở đây T là kiểu thích hợp với optional. Phần giữ chỗ T được dùng để định nghĩa một generic, như chúng ta sẽ thấy sau này trong chương này. Chúng ta không giới hạn việc chỉ dùng kí tự T như là phần giữ chỗ, nhưng trong hầu hết các ví dụ trong chương này chúng ta sẽ dùng T hoặc E để thể hiện một generic bởi vì đó là chuẩn cho phần giữ chỗ được dùng trong hầu hết các văn bản về kiểu generic.

**Generic Functions**

Để hiểu đầy đủ generics, chúng ta cần hiểu vấn đề rằng chúng được thiết kế ra để giải quyết. Như đã nói rằng chúng tôi muốn tạo hàm để hoán đổi giá trị giữ 2 biến như đã giới thiệu bên trên. Tuy nhiên cho ứng dụng của chúng ta, cần hoán đổi những thực thể kiểu integer, double, string. Nếu không có generic, việc này đòi hỏi chúng ta viết 3 hàm như sau:
```
func swapInts(a: inout Int, b: inout Int) {
	let tmp = a
	a = b
	b = tmp
}

func swapInts(a: inout Double, b: inout Double) {
	let tmp = a
	a = b
	b = tmp
}

func swapInts(a: inout String, b: inout String) {
	let tmp = a
	a = b
	b = tmp
}
```
Với 3 hàm này chúng ta có thể hoán đổi những kiểu như Integer, Double, String. Bây giờ hãy xem như chúng ta phát triển ứng dụng xa hơn nữa, chúng ta thấy rằng mình cần hoán đổi những giá trị UInt32, FLoat hoặc thậm chí là kiểu tuỳ biến. Chúng ta có thể dễ dàng hoàn thành với 8 hay 9 hàm hoán đổi. Phần tồi tệ nhất ở đây là mỗi hàm trong nhóm này chứa đựng phần code trùng lắp bởi chúng chỉ khác nhau ở biến số truyền vào. Trong khi giải pháp cho việc làm này, generic đưa một cách sang trọng và đơn giản để loại bỏ tất cả những code trùng lắp. Hãy cùng xem cách chúng ta cô đọng lại 3 hàm bên trên thành một hàm generic.
```
func swapGeneric<T>(a: inout T, b: inout T) {
	let tmp = a
	a = b
	b = tmp
}
```
Cùng nhìn phần chúng ta đã định nghĩa hàm swapGeneric(a: b:). Hàm này tự nó trong khá tương tự với một hàm thông thường, ngoại trừ kí tự viết hoa T phần giữ chỗ được dùng trong phần định nghĩa hàm. Phần giữ chỗ này nói cho swift rằng chúng ra định nghĩa kiểu ở thời điểm máy chạy. Chúng ta có thể dùng kiểu phần đặt chỗ ở những nơi mà định nghĩa kiểu trong phần định nghĩa tham số, kiểu trả về, hoặc bản thân hàm. Phần lớn nhất cần nhớ trong đầu, một phần giữ chỗ được định nghĩa như một kiểu dữ liệu, tất cả những phần đặt chỗ khác cũng được xem là kiểu dữ liệu khác. Do đó bất cứ biến số hoặc hằng số được định nghĩa với phần giữ chỗ cần được đảm bảo là thực thể của kiểu đó.

Không có gì đặt biệt về kiểu T, Chúng ta có thể dùng bất cứ kiểu định nghĩa hợp lệ nào. sau đây là ví dụ:
```
func swapGeneric<G> (a: inout G, b: inout: G) {
}

func swapGeneric<xyz>(a: inout xyz, b: inout xyz) {
}
```
Trong hầu hết các văn bản, Phần giữ chỗ generic được định nghĩa là T(for Type) hoặc E(for Element). Vì mục đích chuẩn. chúng ta sẽ dùng T để định nghĩa hầu hết các chỗ giữ chân generic trong chương này. Nó cũng good practice để dùng T định nghĩa generic trong code của chúng ta vì nó dễ nhận biết khi chúng ta nhìn vào code.

hãy cùng xem
```
var a = 5
var b = 10
swapGeneric(a: &a, b: &b)
print(“a \(a) b: \(b)”)
```
Nếu chúng ta thực thi đoạn code, kết quả đầu ta sẽ là a: 10 b:5. Chúng ta có thể thấy rằng chúng ta không phải làm bất cứ điều gì đặt biệt để gọi hàm generic. hàm sẽ suy luận kiểu từ biến đầu tiên và sau đó thiết lập tất cả phần còn lại của phần giữ chỗ tới kiểu đó. Bây giờ nếu chúng ta muốn hoán đổi những giá trị của 2 chuỗi, chúng ta cũng có thể dùng cùng hàm này.
```
var c = "My String 1"
   var d = "My String 2"
   swapGeneric(a: &c, b: &d)
   print("c:\(c) d:\(d)")
```
Chúng ta có thể thấy chúng ta gọi hàm này chính xác giống cách dúng ta gọi hàm hoán đổi 2 số tự nhiên. Một cái nữa chúng ta không thể truyền 2 thực thể khác kiểu vào trong hàm swapGeneric() bởi vì chúng ta đã định nghĩa chỉ một phẩn giữ chỗ generic. Nếu chúng ta cố gắng chạy code theo như ví dụ tiếp theo sẽ báo lỗi.
```
var a = 5
var c = “My String 1”
swapGeneric(a: &a, b: &c)
```
Lỗi ở đây chúng ta nhận dc là “*cannot covert value of type String to expected argument type Int*”. Điều này nói cho chúng ta biết rằng chúng ta đang cố gắng dùng String trong khi kiểu dc mong đợi là Integer. Nguyên nhân là do hàm này đang tìm thấy một số tự nhiên ở biến số đầu tiên chúng ta truyền vào hàm là một thực thể kiểu integer, do đó tất cả những kiểu generic còn lại kiểu T sẽ biến thành kiểu integer.

Nếu chúng ta cần dùng nhiều loại kiểu generic, chúng ta có thể tạo nhiều phần giữ chỗ bằng cách tách chúng bằng dầu , .Theo ví dụ tiếp theo sẽ chỉ ra cách để định nghĩa nhiều phần giữ chỗ trong 1 hàm đơn.
```
func testGeneric<T,E>(a: T, b: E) {
	print(“\(a) \(b)”)
}
```

Trong ví dụ này, chúng ta đang định nghĩa 2 chỗ giữ chân generic T, E. Trong trường hợp này chúng ta có thể thiết lập chỗ giữ chân T tới một kiểu và chỗ giữ chân E tới 1 kiểu khác.

Hàm này sẽ chấp nhận biến của những kiểu khác nhau, tuy nhiên từ đây chúng là những kiểu khác nhau, chúng ta sẽ không thể hoán đổi giá trị của chúng. Cũng Có những giới bạn khác trên generic. Ví dụ chúng ta có thể nghĩ rằng hàm generic sẽ có hiệu lực, tuy nhiên chúng ta sẽ nhận một lỗi nếu chúng ta cố gắng thực thi nó:
```
func genericEqual<T>(a: T, b: T) -> Bool {
	return a == b
}
```
Lỗi này chúng ta nhận là *binary operator ‘==’ cannot be applied to two ’T’ operands*. Vì kiểu của những tham số thì không biết ở thời điểm code được biên dịch, swift không biết được nếu nó có khả năng dùng toán tử bằng trên kiểu đó hay không, nên lỗi này bị đưa ra. Chúng ta có thể nghĩ rằng đây là một giới hạn làm cho generic khó sử dụng. Tuy nhiên chúng ta có một cách để nói tới swift rằng chúng ta mong chờ kiểu này sẽ chắc chắn có tính năng đó. Việc này được hoàn thành với kiểu ràng buộc.

**Type Constrains với Generic** (kiểu ràng buộc với generic)

Một kiểu ràng buộc chỉ ra rằng một kiểu generic cần phải kết thừa từ một lớp hoặc thoã mãn một protocol cụ thể. Việc này cho phép chúng ta dùng những phương thức và thuộc tính được định nghĩa bởi lớp cha hoặc protocol với kiểu generic. Cùng xem cách dùng kiểu ràng buộc bằng cách viết lại genericEqual() để dùng Comparable protocol
```
func testGenericComparable<T: Comparable>(a: T, b: T) -> Bool {
	return a == b
}
```
Để chỉ kiểu ràng buộc, chúng ta đặt kiểu hoặc protocol ràng buộc sau phần giữ chỗ generic nơi phần giữ chỗ generic và ràng buộc được tách rời bởi dấu :. Đây là hàm mới làm việc như mong đợi của chúng ta, và nó sẽ so sánh những giá trị của 2 biến số và trả về true nếu chúng bằng nhau hoặc false nếu chúng khác nhau.

Chúng ta có thể định nghĩa nhiều ràng buộc giống như chúng ta định nghĩa nhiều loại generic. Theo ví dụ tiếp theo chỉ ra cách để định nghĩa 2 kiểu generic với những ràng buộc khác nhau.
```
func testFunction<T: MyClass, E: MyProtocol> (a: T, b: E) {

}
```
Trong hàm này, kiểu định nghĩa bởi phần giữ chân T cần phải kế thừa từ MyClass, và phần giữ chân kiểu E phải thực thi protocol MyProtocol. Bây giờ chúng ta đã thấy hàm generic và kiểu ràng buộc, tiếp theo ta sẽ tìm hiểu kiểu generic.

**Generic types**

Một kiểu generic là một class, struct hoặc enumeration có thể làm việc với bất kì kiểu nào, giống như mảng và optional swift có thể làm việc với bất kì kiểu dữ liệu nào. Khi chúng ta tạo một thực thể của kiểu generic của chúng ta, chúng ta chỉ kiểu mà thực thể sẽ làm việc với. Một kiểu được định nghĩa nó không thể bị thay đổi.
Để chứng mình cách để tạo một kiểu generic , cùng tạo một class List đơn giản. Lớp này sẽ dùng một mảng swift như nơi lưu trữ và cũng ta sẽ thêm phần tử hoặc nhận giá trị từ list.

Cùng bắt đầu nhìn cách định nghĩa kiểu List generic
```
struct List<T> {

}
```
Phần code phía trên định nghĩa kiểu List generic. Chúng ta có thể thấy rằng chúng ta dùng thẻ < T > để đinh nghĩa một chỗ giữ chân generic, giống như chúng ta làm khi chúng ta định nghĩa một hàm generic. Chỗ giữ chân T có thể sau đó được dùng bất cứ đâu trong kiểu để thay thế cho một kiểu rõ ràng.
Để tạo một thực thể của kiểu này chúng ta sẽ cần định nghĩa kiểu của những phần tử mà list của chúng ta nắm giữ. theo ví dụ sau đây.
 ```
 var stringList = List<String>()
var intList = List<Int>()
var customList = List<MyObject>()
 ```
 ví dụ bên trên tạo 3 thực thể của kiểu List. Thực thể stringList có thể được dùng với những thực thể kiểu String, intList có thể được dùng với thực thể kiểu integer, và kiểu customList có thể được dùng với những thực thể kiểu MyObject.

Chúng ta không bị giới hạn để dùng chỉ kiểu generic với struct. chúng ta cũng có thể định nghĩa với class và enumeration như là kiểu generic. cùng xem ví dụ tiếp theo cách để định nghĩa một generic class và enumeration
```
class GenericStruct<T> {

}

enum GenericEnum<T> {

}
```
Bước tiếp theo trong kiểu dữ liệu List của chúng ta đó là thêm phần mảng lưu trữ. Những thành phần được lưu trữ trong mảng này cần phải có cùng kiểu dữ liệu như chúng ta đã định nghĩa khi chúng ta khởi tạo class, do đó chúng ta sẽ dùng phần giữ chỗ cho việc định nghĩa mảng. Ví dụ tiếp theo sẽ chỉ ra struct List với một mảng tên là items:
```
struct List<T> {
	var items = [T]()
}
```
Bây giờ chúng ta sẽ cần thêm phương thức add(item:) các sẽ dùng để thêm một thành phần tới danh sách. Chúng ta sẽ dùng phần giữ chỗ T trong phần định nghĩa phương thức để định nghĩa biến số sẽ có cùng kiểu như chúng ta định nghĩa khi chúng ta khởi tạo loại dữ liệu này. Do đó nếu chúng ta tạo một thực thể kiểu List để dùng cho kiểu String chúng ta được đòi hỏi phải dùng kiểu String như là tham số cho hàm này.
Ở đây là code cho hàm add()
```
mutating func add(item: T) {
	items.append(item)
}
```
Khi chúng ta tạo một hàm generic độc lập, chúng ta thêm định nghĩa < T > sau tên hàm để định nghĩa nó là hàm generic. Khi chúng ta dùng phương thức generic trong một kiểu generic chúng ta không cần phải định nghĩa nữa bởi vì chúng ta thực sự chỉ đến kiểu này tự nó là generic với kiểu T. Để định nghĩa một phương thức generic trong một kiểu generic, tất cả những gì chúng ta cần làm là dùng cũng phần giữ chỗ chúng ta đã định nghĩa trong phần định nghĩa kiểu.
Bây giờ cùng thêm phương thức getItemAtIndex(index:) sẽ trả về một thành phần từ mảng bên trong ở vị trí được chỉ định:
```
func getItemAtIndex(index: Int) -> T? {
	if items.count > index {
		return items[index]
	} else {
		return nil
	}
}
```
Phương thức getItemAtIndex(index:) chấp nhận một tham số là chỉ số của phần tử chúng ta muốn nhận. Chúng ta sau đó dùng Phần giữ chỗ T như là kiểu dữ liệu trả về. kiểu trả về cho phương thức là một optional có thể của kiểu T hoặc có thể là nil. Nếu phần lưu trữ phía trong mảng chứa phần tử ở vị trí dc chỉ định, chúng ta sẽ trả về phần tử đó, ngược lại chúng ta sẽ trả về nil.
Bây giờ cùng xe toàn bộ struct List của chúng ta:
```
struct List<T> {
	var items =  [T]()
	mutating func add(item:T) {
		items.append(item)
	}

	func getItemAtIndex(index: Int) -> T? {
		if items.count > index  {
			return items[index]
		} else {
			return nil
		}
	}
}
```
Như chúng ta đã thấy chúng ta ban đầu đã định kiểu nghĩa phần giữ chỗ T generic trong phần khởi tạo của struct. Chúng ta sau đó dùng kiểu phần giữ chỗ này trong struct ở 3 nơi. Chúng ta dùng nó như là kiểu của mảng items, như là biến của phương thức add(index:) và như kết quả trả về optional trong phương thức getItemAtIndex()

Bây giờ cùng nhìn cách dùng kiểu List. Khi chúng ta dùng một kiểu generic, chúng ta định nghĩa kiểu được dùng trong thực thể giữa khung tam giác. Đoạn code tiếp theo trình bày cách dùng List để lưu kiểu String
```
var list = List<String>()
list.add(item: “Hello”)
list.add(item: “World”)
print(list.getItemAtIndex(index: 1))
```
Trong đoạn code trên chúng ta bắt đầu tạo một thực thể kiểu List gọi là list và dự định nó sẽ lưu trữ kiểu String. Chúng ta sau đó dùng phương thức add(index:) 2 lần để lưu trữ 2 thành phần vào trong list. Cuối cùng chúng ta dùng getItemAtIndex() để nhận về item ở vị trí số 1, Kết quả sẽ hiện Optional(World).

Ở phần cuối của chương này chúng ta sẽ nhìn thấy kiểu List một lần nữa và trình bày cho bạn cách để thiết kế và phát triển List trong cách hướng protocol với tính năng copy-on-write.

Chúng ta cũng có thể định nghĩa kiểu generic của chúng ta với nhiều kiểu phần giữ chỗ , tương tự như cách chúng ta dùng nhiều phần giữ chỗ trong phương thức generic. Để dùng nhiều phần giữ chỗ , chúng ta sẽ phân tách chúng với dấu , cùng xem ví dụ sau đây:
```
class MyClass<T,E> {

}
```
chúng ta sau đó tạo một thực thể của kiểu MyClass, thực thể này dùng kiểu String và Integer như sau:
```
var mc = MyClass<String,Int>()
```
Kiểu ràng buộc có thể được dùng với kiểu dữ liệu generic. Một lần nữa , dùng một kiểu ràng buộc cho một kiểu generic thì giống như việc dùng với hàm generic. Code sau đây sẽ trình bày cách dùng một kiểu ràng buộc cái mà kiểu generic thoã mãn tới protocol Comparable
```
struct MyStruct<T: Comparable>{

}
```
xa hơn trong chương này chúng ta đã thấy cách để dùng một phần giữ chỗ trong  hàm và kiểu, Tuy nhiên cuốn sách này là về lập trình hướng protocol. khi chúng ta định nghĩa một kiểu generic trong một protocol, chúng được biết như là một kiểu liên kết (Associated types)

**Associated types**

Một kiểu liên kết định nghĩa tên một phần giữ chỗ có thể được dùng thay thế cho một kiểu dữ liệu trong một protocol. Kiểu dùng thật sự được dùng thì không được chỉ có đến khi protocol tự nó được thông qua. Trong khi tạo một hàm và kiểu generic , chúng ta dùng một cấu trúc tương tự nhau như chúng ta đã thấy trong phần trước trong chương này. Việc định nghĩa kiểu liên kết cho một protocol , tuy nhiên có 1 chút khác biệt. Chúng ta chỉ một kiểu liên kết dùng từ khoá associtatedtype

Cùng xem cách dùng kiểu liên kết khi chúng ta định nghĩa một protocol. Ví dụ chúng ta sẽ tạo một protocol đơn giản tên MyProtocol
```
protocol MyProtocol {
	associatedtype E
	var items : [E] {get set}
	mutating func add(item: E)
}
```
Trong protocol này chúng ta định nghĩa một kiểu liên kết tên là E. Chúng ta sau đó dùng kiểu liên kết này như là kiểu cho mảng items và cũng như kiểu biến số cho phương thức add(item:)
Chúng ta có thể tạo những kiểu thoã mãn tới protocol này bằng cách cung cấp một kiểu chắc chắn hoặc một kiểu generic cho kiểu liên kết này. 

Cùng xem cách chúng ta có thể tạo một kiểu thoã mãn MyProtocol dùng một kiểu rõ ràng
```
struct MyIntType: MyProtocol {
	var items: [Int] = []
	mutating func add(item: Int) {
		items.append(item)
	}
}
```
trong đọan code trên chúng ta tạo một kiểu tên là MyIntType thoã mã tới protocol MyProtocol. Chúng ta sau đó thực thi mảng items và phương thức add(item:) dùng kiểu Integer.Swift nhận ra rằng chúng ta sẽ dùng kiểu integer trong nơi của kiểu liên kết. Chúng ta cần làm là đảm bảo chúng ta sẽ dùng cùng kiểu bất cứ nơi nào kiểu liên kết được dùng. Bây giờ cùng xem cách chúng ta dùng một kiểu generic khi tạo một kiểu thoã mãn với protocol MyProtocol
```
struct MyGenericType<T>: MyProtocol {
	var items: [T] = []
	mutating func add(item: T) {
		items.append(item)		
	}
}
```
đoạn code trên trong khá quen, nó rất giống với cách chúng ta tạo một kiểu generic. Phần giữ chỗ T được dùng bất cứ nơi nào kiểu liên kết được dùng trong protocol và khi chúng ta tạo một thực thể kiểu MyGenericType chúng ta sẽ cần định nghĩa kiểu gì để dùng.

Cùng xem generic subscript cái đã được thêm vào trong phiên bản swift 4.

**Generic Subscript**

Trước phiên bản swift 4, chúng ta có thể dùng generic với subscript chỉ khi generic được định nghĩa trong kiểu có khả năng chứa đựng. Tuy nhiên chúng ta không thể định nghĩa một kiểu generic mới trong phần định nghĩa subscript. Ví dụ nếu chúng ta có một kiểu List chúng ta có thể dùng kiểu generic được định nghĩa bởi kiểu List trong subscript như trong ví dụ:
```
struct List<T> {
	subscript(index: Int) -> T? {
		return getItemAtIndex(index: index)
	}
}
```
Với swift 4 hoặc sau này, chúng ta có thể định nghĩa những kiểu generic bên trong phần định nghĩa subscript. Hãy nhìn cách chúng ta sẽ làm. tạo một cái khác khá cơ bản kiểu generic List.
```
struct List<T> {
    private var items = [T]()
    public mutating func add(item: T) {
        items.append(item)
    }
    
    public func getItemAtIndex(index: Int) -> T? {
        if items.count > index {
            return items[index]
        } else {
            return nil
        }
    }
    
    public subscript(index: Int) -> T? {
        return getItemAtIndex(index: index)
    }
    
}
```
Kiểu List này của chúng ta có tính năng cơ bản là thêm một thành phần vào phía cuối của list và nhận về một thành phần ở một vị trí được chỉ định. Chúng ta có thể cần thêm tính năng cho kiểu List nhưng trong ví dụ của chúng ta đủ để trình bày một generic subscript

Bây giờ chúng ta có một yêu cầu là nhận về một đoạn những phần tử từ danh sách dùng một subscript. Với generic subscript chúng ta có thể làm việc này một cách dễ dàng
```
    public subscript<E: Sequence>(indices: E) -> [T] where E.Iterator.Element == Int {
        var result = [T]()
        for index in indices {
            result.append(items[index])
        }
        return result
    }
```
Subscript này sẽ nhận một hàng đợi của những chỉ số và sẽ trả về một mảng chứa đựng giá trị ở mỗi vị trí. Chúng ta có một kiểu generic (E) thoã mãn protocol Sequence và sau đó dùng kiểu này như là biến số cho subscript. Với điều kiện where chúng ta đang yêu cầu những phần tử trong vòng lặp bên trong kiểu E phải là kiểu integer
Chúng ta có thể dùng subscript như sau:
```
var myList = List<Int>()
myList.add(item: 1)
myList.add(item: 2)
myList.add(item: 3)
myList.add(item: 4)
myList.add(item: 5)
var values = myList[2...4]
```
Trong đoạn code trên chúng ta tạo một thực thể của kiểu List và chỉ ra rằng nó sẽ chứa đựng những thực thể kiểu Integer. Chúng ta sau đó thêm 5 giá trị tới list. chúng ta dùng subscript chúng ta đã thêm vào trong kiểu List để nhận về một mảng chứa những giá trị có vị trí 2,3,4. Những giá trị này sẽ chứa 3 phần tử cuối của danh sách các thực thể.

Trong chương 2 chúng ta đã đề cập về COW(copy-on-write), ở đây chúng ta đã đề cập rằng Apple cung cấp COW cho một số kiểu chuẩn trong thư viện swift. Cùng xem cách chúng ta làm điều tương tự với những kiểu dữ liệu tuỳ biến của mình.

**Copy-on-write**

Thông thường, khi chúng ta truyền một thực thể của một kiểu giá trị như struct, enumeration chúng ta tạo một bảng sao chép của thực thể đó. Điều này có nghĩa là nếu chúng ta có một cấu trúc dữ liệu lớn chứa hơn 50000 phần tử, mỗi lần chúng ta truyền thực thể đó chúng ta lại phải sao chép 50000 phần tử. Điều này có thể một bất lợi nghiên trọng cho việc thực thi của ứng dụng đặc biệt nếu chúng ta truyền thực thể đó qua nhiều hàm.
Để giải quyết vấn đề này, Apple đã thực thi tính năng COW cho tất cả dữ liệu struct (Array, Dictionary, Set) trong thư viện chuẩn của swift. Với COW swift không thực hiện việc sao chép cấu trúc dữ liệu cho đến khi có sự thay đổi tới cấu trúc dữ liệu. do đó nếu chúng ta truyền một mảng chứa 50,000 phần tử tới phần khác trong code của mình và code đó không thực sự có thay đổi gì, chúng ta sẽ tránh chi phí sao chép tất cả các phần tử ở thời điểm chạy.

Đây là một tính năng đẹp và có thể làm tăng hiệu suất của ứng dụng, tuy nhiên những kiểu dữ liệu tuỳ biến của chúng ta không tự động có được tính năng này. Trong phần này chúng ta sẽ thấy cách chúng ta có thể dùng kiểu tham chiếu và kiểu tham trị chung với nhau để thực thi COW trên kiểu dữ liệu tuỳ biến của chúng ta. Để làm việc này chúng ta sẽ tạo một kiểu hàng đợi cơ bản.

Chúng ta sẽ bắt đầu bằng cách tạo kiểu lưu trữ bên trong gọi là BackendQueue và sẽ thực thi nó như một kiểu tham chiếu. theo như đoạn code bên dưới
```
fileprivate class BackendQueue<T> {
    private var items = [T]()
    public func addItem(item: T) {
        items.append(item)
    }
    
    public func getItem() -> T? {
        if items.count > 0 {
            return items.remove(at: 0)
        } else {
            return nil
        }
    }
    
    public func count() -> Int {
        return items.count
    }
}
```
Kiểu BackendQueue là một kiểu generic dùng một mảng để lưu trữ dữ liệu. Kiểu này chứa đựng 3 phương thức để thêm phần tử tới hàng đợi, nhận một phần từ từ hàng đợi, và trả về số lượng phần tử trong hàng đợi. Chúng ta dùng fileprivate để ngăn chặn dùng kiểu này bên ngoài phạm vi định nghĩa của file bởi vì nó chỉ nên được dùng để thực thi tính năng COW cho kiểu hàng đợi của chúng ta.

Chúng ta bây giờ cần thêm một số thành phần cho kiểu BackendQueue vì vậy chúng ta có thể dùng nó để thực hiện tính năng COW. Điều đầu tiên chúng ta sẽ thêm là một hàm khởi tạo mặt định và một hàm khởi tạo kín có thể được dùng để tạo một thực thể của kiểu BackendQueue,
```
public init() {}
    private init(_ items: [T]) {
        self.items = items
    }
```
Hàm khởi tạo public sẽ được dùng để tạo một thực thể của BackendQueue với những phần tử trong queue, Hàm khởi tạo riêng tư sẽ được dùng bên trong để tạo một bản sao chép cho chính nó. Bây giờ chúng ta sẽ cần tạo một phương thức sẽ dùng hàm khởi tạo riêng tư này để tạo một bản sao của chính nó khi cần
```
public func copy() -> BackendQueue<T> {
        return BackendQueue<T>(items)
    }
```
Khá dễ để làm hàm khởi tạo riêng tư này công khai và sau đó để cho kiểu queue gọi hàm khởi tạo này để tạo một bản sao , tuy nhiên nó là một mẫu tốt để giữ phần logic cần thiết để tạo một bản sao chép bên trong chính nó. Nguyên nhân bạn nên làm như vậy nếu bạn cần tạo những sự thay đổi tới kiểu có thể sẽ ảnh hướng tới cách kiểu này bị sao chép, phần logic bạn cần thay đổi thì dc nhúng vào bên trong kiểu đó và dễ dàng để tìm. Thêm nữa nếu bạn dùng BackendQueue để lưu trữ cho nhiều loại dữ liệu, bạn sẽ chỉ cần tạo sự thay đổi để sao chép logic trong 1 nơi. 

Dưới đây là code tổng hợp cuối cùng của kiểu BackendQueue
```
fileprivate class BackendQueue<T> {
    public init() {}
    private init(_ items: [T]) {
        self.items = items
    }
    private var items = [T]()
    public func addItem(item: T) {
        items.append(item)
    }
    
    public func getItem() -> T? {
        if items.count > 0 {
            return items.remove(at: 0)
        } else {
            return nil
        }
    }
    
    public func count() -> Int {
        return items.count
    }
    
    public func copy() -> BackendQueue<T> {
        return BackendQueue<T>(items)
    }   
}
```
Bây giờ cùng tạo một kiểu Queue sẽ dùng kiểu BackendQueue để thực thi tính năng COW
```
struct Queue {
    private var internalQueue = BackendQueue<Int>()
    public mutating func addItem(item: Int) {
        internalQueue.addItem(item: item)
    }
    
    public mutating func getItem() -> Int? {
        return internalQueue.getItem()
    }
    
    public func count() -> Int {
        return internalQueue.count()
    }
}
```
Kiểu Queue được thực thi như là kiểu tham trị. kiểu này có một thuộc tính riêng tư kiểu BackendQueue cái sẽ được dùng để lưu trữ dữ liệu. Kiểu này chứa đựng 3 phương thức để thêm phần tử vào Queue, nhận một phần tử và trả về số lượng phần tử trong Queue. Bây giờ cùng xem cách chúng ta sẽ thực hiện tính năng COW cho kiểu Queue.

Swift có một hàm toàn cục tên là isKnownUniquelyReferenced(). Hàm này sẽ trả về true nếu chỉ có một tham chiếu tới một thực thể của kiểu tham chiếu hoặc false nếu có nhiều hơn một tham chiếu.
Chúng ta sẽ bắt đầu thêm một hàm để kiểm tra nếu có một tham chiếu duy nhất tới thực thể internalQueue. Đây sẽ là hàm riêng tư tên là checkUniquelyReferencedInternalQueue. đoạn code sau đây sẽ trình bày phần thực thi của hàm này.
```
mutating private func checkUniquelyReferencedInternalQueue() {
        if !isKnownUniquelyReferenced(&internalQueue) {
            internalQueue = internalQueue.copy()
            print("Making a copy of internal Queue")
        } else {
            print("Not making a copy of internalQueue")
        }
    }
```
Trong phương thức này, chúng ta kiểm tra để xem có nhiều tham chiếu tới thực thể internalQueue. Nếu có nhiều tham chiếu nghĩa là chúng ta biết rằng chúng ta có nhiều bảng sao chép của thực thể Queue, do đó chúng ta tạo một bản sao chép.

Kiểu Queue tự nó là kiểu tham trị, do đó khi chúng ta truyền một thực thể của kiểu Queue bên trong code của mình chúng ta đang truyền một bản sao chép mới của thực thể đó. Kiểu BackendQueue cái đang được kiểu Queue sử dụng, nó là một kiểu tham chiếu, do đó khi một bản sao chép được tạo ra của thực thể Queue, bản sao chép mới nhận dc một tham chiếu tới thực thể BackendQueue và nó không phải bản sao chép. Điều này có nghĩa là mỗi thực thể kiểu Queue có một tham chiếu tới cùng thực thể internalQueue. Như một ví dụ trong đoạn code tiếp theo cả queue1 và queue2 cùng có tham chiếu tới cùng internalQueue.
```
var queue1 = Queue()
var queue2 = queue1
```
Trong kiểu Queue, chúng ta biết rằng phương thức AddItem() và getItem() thay đổi thực thể internalQueue, do đó trước khi chúng ta thực hiện việc thay đổi chúng ta phải gọi hàm checkUniquelyReferencedInternalQueue() để tạo một bản sao cho thực thể internalQueue. Cùng cập nhật lại code
```
public mutating func addItem(item: Int) {
     checkUniquelyReferencedInternalQueue()
     internalQueue.addItem(item: item)
   }
   public mutating func getItem() -> Int? {
     checkUniquelyReferencedInternalQueue();
     return internalQueue.getItem()
   }
   ```
Với code này bất cứ khi nào hàm addItem() hoặc getItem() được gọi, nó sẽ thay đổi dữ liệu trong thực thể internalQueue, chúng ta dùng hàm checkUniquelyReferencedInternalQueue() để tạo một thực thể mới của cấu trúc dữ liệu nếu cần.

Cùng thêm một phương thức nữa nào kiểu Queue, cùng xem nếu có một tham chiếu duy nhất tới internalQueue hoặc không. ở đây thì code
```
mutating public func uniquelyReferenced() -> Bool {
        return isKnownUniquelyReferenced(&internalQueue)
    }
```
Dưới đây là toàn bộ code
```
struct Queue {
    private var internalQueue = BackendQueue<Int>()
    public mutating func addItem(item: Int) {
        checkUniquelyReferencedInternalQueue()
        internalQueue.addItem(item: item)
    }
    
    public mutating func getItem() -> Int? {
        checkUniquelyReferencedInternalQueue()
        return internalQueue.getItem()
    }
    
    public mutating func count() -> Int {
        return internalQueue.count()
    }
    
    mutating private func checkUniquelyReferencedInternalQueue() {
        if !isKnownUniquelyReferenced(&internalQueue) {
            internalQueue = internalQueue.copy()
            print("Making a copy of internal Queue")
        } else {
            print("Not making a copy of internalQueue")
        }
    }
    
    mutating public func uniquelyReferenced() -> Bool {
        return isKnownUniquelyReferenced(&internalQueue)
    }
}
```
Bây giờ cùng xem COW làm việc với kiểu Queue. chúng ta sẽ bắt đầu tạo một thực thể kiểu Queue , thêm một phần tử vào queue và sau đó nếu chúng ta có một tham chiếu duy nhất tới thực thể internalQueue. 
```
var queue3 = Queue()
queue3.addItem(item: 1)
print(queue3.uniquelyReferenced())
```
Khi chúng ta thêm một phần tử tới một hàng đợi, tin nhắn sẽ được in ra màn hình. Điều này nói với chúng ta trong hàm checkUniquelyReferencedInternalQueue() nó được xác định khi chỉ có 1 tham chiếu tới internalQueue
“Not making a copy of internalQueue”
Chúng ta có thể xác định việc này bằng cách in kết quả của phương thức uniquelyReference() ra màn hình console. Bây giờ chúng ta thực hiện một bản sao của thực thể queue3 bằng cách truyền nó tới một biến số mới
```
var queue4 = queue3
```
Bây giờ cùng nhìn nếu chúng ta có một tham chiếu duy nhất tới thực thể internalQueue cho cả thực thể queue3 hoặc queue4
```
print(queue3.uniquelyReferenced()) 
   print(queue4.uniquelyReferenced())
```
Đoạn code này sẽ in ra 2 giá trị false ra màn hình để cho chúng ta biết cả 2 thực thể đều không có duy nhất một tham chiếu tới internalQueue. Bây giờ chúng ta thêm một phần tử vào trong mõi hàng đợi theo code sẽ thêm phần tử khác tới queue 3
```
queue3.addItem(item:2)
```
khi chúng ta thêm phần tử vào hàng đợi chúng ta sẽ thấy tin nhắn dc in ra 
“Making a copy of internal Queue”
Tin nhắn này báo với chúng ta rằng chúng ta thêm một phần tử mới tới hàng đợi, một bản sao của thực thể internalQueue được tạo ta. để xác thực việc này chúng ta có thể in kết quả của hàm uniquelyReferenced() ra màn hình lần nữa. nếu bạn kiểm tra, bạn sẽ nhìn thấy 2 tin nhắn true. Chúng ta có thể thêm những phần tử tới hàng đợi chúng ta sẽ nhìn thấy chúng ta không tạo mới thực thể internalQueue bởi vì mỗi thực thể của Queue bây giờ có một bản sao của chính nó

**Generic trong thiết kế hướng protocol.**

Bây giờ chúng ta đã thấy cách dùng generic, cùng xem cách chúng ta có thể dùng chúng trong thiết kế hướng protocol. Trong  ví dụ trước đây trong chương này, chúng ta đã tạo một kiểu List generic, tuy nhiên chúng ta sẽ cải tiến hơn rất nhiều trong việc thiết kế bằng cách dùng những gì chúng ta đã học thông qua chương này. Chúng ta sẽ bao gồm một tập các yêu cầu nhỏ thực tế cho một kiểu List vì vậy chúng ta có thể tập trung vào phần thiết kế hơn là tất cả các yêu cầu.

Với một thiết kế hướng protocol chúng ta luôn luôn bắt đầu với protocol. 
```
protocol List {
    associatedtype T
    subscript<E:Sequence>(indices: E) -> [T] where E.Iterator.Element == Int {get}
    
    mutating func add(_ item: T)
    func length() -> Int
    func get(at index:Int) -> T?
    mutating func delete(at index:Int)
    
}
```
Chúng ta bắt đầu với thuộc tính List bằng cách định nghĩa kiểu liên kết T. Kiểu liên kết này sẽ là kiểu lưu dữ liệu trong list. Chúng ta dùng kiểu T như là kiểu biến số trong hàm add(item:). Chúng ta cúng dùng kiểu T như kiểu trả về của hàm get(at index:) và subscript. Phương thức add(item:) sẽ dùng để thêm một phần tử vào list. phương thức get(index:) và subscript sẽ dùng để nhận 1 hoặc nhiều phần tử ở vị trí được chỉ định. Length() sẽ trả về số lượng phần tử trong list và delete(index) dùng để remove một phần tử ở vị trí trong list.

Ví vụ trong phần trước của cuốn sách này, chúng ta có thể nghĩ chúng ta tạo một protocol extension cho List protocol. Tuy nhiên chúng ta muốn giữ cho List protocol generic nhất có thể, vì vậy chúng ta có dùng nó cho bất cứ loại dữ liệu danh sách nào. Chúng ta sẽ nhìn cách nó làm việc thông qua những ví dụ

từ đây kiểu List sẽ là cấu trúc lưu trữ dữ liệu, cùng tạo một kiểu lưu trữ bên trong cái chúng ta sẽ dùng để thực thi COW tính năng cho mõi kiểu List, nó được thực thi bằng một kiểu tham trị. Dùng kiến thức chúng ta đã học về COW trong chương này, chúng ta có thể thực thi kiểu này như sau:
```
private class BackendList<T> {
    private var items: [T] = []
    public init() {}
    private init(_ items:[T]) {
        self.items = items
    }
    
    public func add(_ item: T) {
        items.append(item)
    }
    
    public func length() -> Int {
        return items.count
    }
    
    public func get(at index: Int) -> T? {
        return items[index]
    }
    
    public func delete(at index: Int) {
        items.remove(at: index)
    }
    
    public func copy() -> BackendList<T> {
        return BackendList<T>(items)
    }
}

Kiểu BackenList thực thi tất cả các tính năng cần thiết để thêm ,lấy và xoá những phần tử, cái này sẽ lưu trữ phần tử cho cấu trúc dữ liệu của chúng ta. Chúng ta cũng sẽ có phương thức để nhận kích thước của mảng và để tạo một bản sao chép của BackendList. Tất cả code trong rất quen thuộc ở thời điểm này.

Bây giờ cùng tạo một kiểu ArrayList sẽ dùng BackendList như là cơ chế lưu trữ. code này sẽ trình bày chúng ta cách để tạo một kiểu mà thoã mãn tới protocol List và thực thi tính năng COW.
struct ArrayList<T>: List {
    
    private var items = BackendList<T>()
    
    
    public subscript<E>(indices: E) -> [T] where E : Sequence, E.Element == Int {
        var result = [T]()
        for index in indices {
            if let item = items.get(at: index) {
                result.append(item)
            }
        }
        return result
    }
    
    mutating func add(_ item: T) {
        checkUniquelyReferencedInternalQueue()
        items.add(item)
    }
    
    func length() -> Int {
        return items.length()
    }
    
    func get(at index: Int) -> T? {
        return items.get(at: index)
    }
    
    mutating func delete(at index: Int) {
        checkUniquelyReferencedInternalQueue()
        items.delete(at: index)
    }
    
    mutating private func checkUniquelyReferencedInternalQueue() {
        if isKnownUniquelyReferenced(&items) {
            print("Making a copy of internalQueue")
            items = items.copy()
        } else {
            print("Not making a copy of internal Queue")
        }
    }
    
    
}
```
chúng ta có thể tạo một thực thể ArrayList và thêm những phần tử như code sau đây:
```
var arrayList = ArrayList<Int>()
   arrayList.add(1)
   arrayList.add(2)
   arrayList.add(3)
   ```
code này sẽ tạo một thực thể của kiểu ArrayList chưa số tự nhiên và thêm 3 phần tử vào đó.
Cùng xem thiết kế của chúng ta bây giờ.

![](https://images.viblo.asia/e53e51b1-84a3-4dce-be43-c7318c8665e7.png)

Biểu đồ này chỉ ra rằng kiểu ArrayList thoã mãn tới protocol List và dùng kiểu BackEndList. Bây giờ chúng ta có thể rất dễ dàng thêm những kiểu khác thoã mãn tới protocol list của mình và nếu chúng được thực thi như kiểu tham trị, chúng ta có thể dùng cùng kiểu BackEndList để thực thi tính năng COW. theo biểu đồ tiếp theo sẽ chứng minh việc này.

![](https://images.viblo.asia/1a99717d-dcaf-4115-8ffc-d372fdfd5bb1.png)

Bây giờ chúng ta có thể thấy được cách để thiết kế một cấu trúc dữ liệu cơ bản trong hướng protocol với generic. Cùng xem cách generic được dùng trong thư viện chuẩn swift

**Generic trong thư viện chuẩn của swift.**
Generic được dùng để mở rộng  trong thư viện chuẩn swift và chúng là cái cho phép kiểu tập hợp swift có thể lưu trữ bất cứ kiểu thực thể nào. cùng xem ở link http:/ / swiftdoc. org/  và nhìn vào kiểu Array.

![](https://images.viblo.asia/93cd21d3-fdf3-4796-a581-ff90b2d1e148.png)


Ở phần đầu của trang chúng ta thấy kiểu Array được định nghĩa struct Array< Element > việc này nói cho chúng ta  biết kiểu Array được thực thi như một kiểu tham trị generic bằng struct. Nếu chúng ta nhìn vào Set chúng ta cũng thấy nó được thực thi bởi một struct generic.

**Tổng kết**
    
Generic trong swift có sức mạnh rất lớn, với protocol chúng ta có thể dùng một giao diện chung để tương tác với những kiểu dữ liệu khác nhau cái mà thoã mãn tới protocol. Cũng vậy khi chúng ta dùng generic, chúng ta có thể tạo một kiểu generic có thể chấp nhận dc thực thể của bất cứ kiểu dữ liệu nào. Khi chúng ta kết hợp protocol với generic chúng ta đã thấy kiểu List trong chương này, chúng ta có thể tạo thư viện rất mạnh mẽ cái mà không chỉ phù hợp với những yêu cầu hiện tại của chúng ta mà còn những yêu cầu trong tương lai.

Apple đã thông báo rằng Generic là một trong những tính năng mạnh mẽ nhất của swift và hầu hết trong những thư viện chuẩn của swift được xây dựng trên generic. Bạn nên giữ trong đầu  điều này khi bạn viết ứng dụng của mình.

 Từ khi lập trình hướng protocol được giới thiệu, có nhiều so sanh giữ lập trình hướng đối tượng và nó. để thực hiện một so sánh thích hợp giữa 2 loại này, cùng xem qua lập trình hướng đối tượng trong swift.
 
*Hẹn gặp các bạn ở chương tiếp theo vào tuần sau. *