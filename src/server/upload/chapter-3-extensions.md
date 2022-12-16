Quay trở lại thời kì đầu những năm 90s khi ngôn ngữ cơ bản tôi đã lập trình đó là C. Tôi có nhiều thư viện tuỳ chỉnh chứa những chức năng mà không phải là chuẩn của thư viện C. Tôi đã tìm thấy những thư viện cực kì hữu ích bởi vì tôi dự định dùng những tính năng mà nó cung cấp trong hầu hết các ứng dụng của tôi. Những tính năng này bao gồm nhiều thứ như chuyển đổi kí tự đầu tiên trong chuỗi thành viết hoa hoặc chuyển đổi một giá trị double sang chuỗi kiểu tiền tệ( 2 kí tự phía sau dấu . và thêm kí tự tiền tệ $) Có nhiều thư viện như thế thật sự hữu ích bởi vì những tính năng này luôn luôn được chúng ta dùng nhưng nó không phải là của thư viện chuẩn của ngôn ngữ chúng ta phát triển. Tôi thường thực hiện những tính năng thêm trong c với dạng hàm toàn cục. Trong 1 số ngông ngữ hướng đối tượng, chúng ta có thể thực hiện những tính năng này bằng cách tạo lớp con cho lớp mà chúng ta muốn thêm tính năng, nhưng trong swift chúng ta có thể mở rộng để thêm tính năng cho những kiểu đang tồn tại mà không cần dùng hàm toàn cục hay tạo lớp con. Để làm cho những phần mở rộng hữu dụng hơn nữa, Apple cho chúng ta khả năng để mở rộng protocols, cái này cho phép chúng ta thêm tính năng tới bất cứ kiểu nào có nguồn gốc là protocol.

Chúng ta sẽ học trong chương này:
- Cách để mở rộng struct, class, enumerations
- Cách để mở rộng protocol
- Cách để dùng phần mở rộng trong dự án thực

Extensions là một trong những tính năng hữu ích nhất trong ngôn ngữ swift. Chúng cho phép chúng ta thêm tính năng tới thậm chí là những kiểu đang tồn tại nếu chúng ta không có source code của kiểu đó. Protocol extension thì được cho là một trong những tính năng thú vị của lập trình hướng protocol. Nếu bạn không quen với protocol extensions, bạn có thể ngạc nhiên cách chúng ta thêm tính năng tới một protocol khi protocol này không chứa bất cứ tính năng nào. Chúng ta sẽ nhìn thấy cách dùng protocol extensions ở phần sau trong chương này và xem tại sao chúng rất thú vị. Tuy nhiên đầu tiên cùng xem extensions là gì và cách để mở rộng class, struct, enumerations.

Với extensions chúng ta có thể thêm những thành phần sau đây vào một kiểu dữ liệu đang tồn tại:
- thuộc tính được tính toán (computed properties)
- thực thể và kiểu phương thức
- Hàm khởi tạo thuận tiện (convenience initializers)
- Subscripts

Một nhược điểm của extensions đó là chúng ta không thể ghi đè tính năng của một kiểu mà chúng ta đang mở rộng. Extensions được thiết kế để thêm tính năng và không được thiết kế để thay đổi tính năng của kiểu dữ liệu. Một cái khác chúng ta không thể làm với extensions là thêm thuộc tính lưu trữ, tuy nhiên chúng ta có thể thêm thuộc tính tính toán.

Để hiểu tại sao extension khá hữu ích. Chúng ta cần hiểu vấn đề chúng được thiết kế ra để giải quyết. Trong hầu hết các ngôn ngữ hướng đối tượng, khi nào chúng ta muốn thêm tính năng tới một class đang tồn tại. Chúng ta thường tạo lớp con của lớp mà chúng ta muốn thêm tính năng. Chúng ta sau đó thêm những tính năng mới tới lớp con này. Vấn đề với cách này là chúng ta không thực sự thêm tính năng tới lớp gốc, do đó chúng ta phải thay đổi tất cả thực thể  của lớp gốc tới thực thể của lớp con mới này. Mới một số class, như NSString nó chứa một lượng lớn code để tạo một lớp con.

Một vấn đề khác chúng ta có thể thêm vào đó là chúng ta chỉ có thể tạo lớp con cho kiểu tham chiếu (class). điều này có nghĩa là chúng ta không thể tạo lớp con cho kiểu tham trị như struct và enumeration. Điều này thực sự là điều tồi tệ khi phần lớn trong thư viện swift được tạo bằng kiểu tham trị, cũng đồng nghĩa với việc chúng ta không thể thêm tính năng tới những kiểu đến từ thư viện swift chuẩn bằng cách tạo lớp con từ chúng. Apple đã khuyến cáo chúng ta nên dùng kiểu tham trị hơn là kiểu tham chiếu trong ứng dụng của mình. Do đó nếu chúng ta lắng nghe apple khuyến cáo, chúng ta không thể tạo lớp con cho những kiểu tuỳ chọn của mình.

Với extensions, chúng ta có thể thêm tính năng mới trực tiếp tới kiểu dữ liệu chúng ta muốn mở rộng. Điều này có nghĩa là tất cả thực thể của kiểu dữ liệu này sẽ tự động nhận dc tính năng mới này mà không cần thay đổi kiểu của thực thể. Chúng ta cũng có thể mở rộng cả kiểu tham chiếu và kiểu tham trị bao gồm cả protocol. Chúng ta sẽ thấy trong phần sau trong chương này. Khả năng để mở rộng protocol là một trong những điều làm cho lập trình hướng protocol trở lên khả dụng.

Hãy bắt đầu nhìn cách chúng ta mở rộng những kiểu dữ liệu như struct, class, enumeration.

**Định nghĩa một Extension.**

Một extension được định nghĩa bằng cách dùng từ khoá extension theo sao bởi tên của kiểu dữ liệu chúng ta muốn mở rộng. Chúng ta sau đó thêm phần tính năng chúng ta sẽ thêm giữa dấu {}

trong ví dụ trước sẽ thêm tính năng tới kiểu String trong thư viện swift chuẩn. Từ đó chúng ta có thể mở rộng bất cứ kiểu nào chúng ta có thể mở rộng để thêm tính năng tới những kiểu dữ liệu chuẩn trong thư viện swift, những kiểu trong framework, và kiểu tuỳ chỉnh của chúng ta. trong khi chúng ta có thể dùng extension để thêm tính năng cho kiểu tuỳ chỉnh của mình, nó thường tốt hơn là thêm tính năng trực tiếp vào kiểu dữ liệu đó. Nguyên nhân là code sẽ dễ để bảo trì nếu tất cả các tính năng của kiểu dữ liệu được đặt cùng với nhau.

Nếu chúng thêm thêm tính năng cho một framework và chúng ta có code của framework, sẽ tốt hơn nếu thêm tính năng với extension thay vì thay đổi trực tiếp code ở trong framework. Nguyên nhân cho điều này đó là, nếu chúng ta thêm tính năng trực tiếp tới code trong framework, khi chúng ta lấy phiên bản mới hơn của framework thì những phần thay đổi của chúng ta sẽ bị ghi đè. Phiên bản mới của framework sẽ không ghi đèn extensions miễn là chúng ta không đặt nó trong file thuộc về framework.

Cùng xem cách chúng ta thêm tính năng cho kiểu dữ liệu của swift bằng extensions. Theo đoạn code tiếp theo mở rộng String để thêm một phương thức trả về một giá trị tuỳ biến cái mà chứa đựng kí tự đầu tiên trong chuỗi hoặc là nil nếu chuỗi rỗng.
```
extension String {
	func getFirstChar() -> Character? {
		guard charaters.count > 0 else {
			return nil
		}
		return self[startIndex]
	}
}
```
Không có gì đặc biệt để truy xuất vào tính năng này. Những thực thể của kiểu String không cần biết cũng như không quan tâm rằng tính năng này đến từ phần thực thi gốc hay đến từ extension. Ví dụ tiếp theo chỉ cho bạn cách dùng phương thức này.
```
var myString = “This is a test”
print(myString.getFirstChar())
```
Ví dụ trước đó sẽ in ra chữ T. Nó khá đơn giản để thêm những tính năng khác như subscripts tới một kiểu đang tồn tại. Ví dụ tiếp theo sẽ hướng dẫn chúng ta cách thêm một subscript tới String nó chấp nhận một toán tử phạm vi và trả về một subscript với những kí tự được định nghĩa trong toán tử phạm vi đó.
```
extension String {
	func getFirstChar() -> Character? {
		guard characters.count > 0 else {return nil}
		return self[startIndex]
	}

subscript (r: CountableCloseRange<Int>) -> String {
	get {
		let start = index(self.startIndex, offsetBy: r.lowerBound)
		let end = index(self.startIndex, offsetBy: r.upperBound)
		return substring(with: start..<end)
	}
}

}
```
Trong chương 2, chúng ta đã đề cập đến những kiểu dữ liệu được thực thi như là những kiểu gốc trong những ngôn ngữ khác thì được thực thi như là kiểu có tên trong swift. Những kiểu này bao gồm những kiểu thể hiện cho numbers, characters và Boolean. từ đây chúng đã được thực thi như là kiểu được đặt tên, chúng ta cũng có thể mở rộng chúng như chúng ta làm với những kiểu dữ liệu khác. Một ví dụ nếu chúng ta mở rộng Integer để thêm một phương thức trả về giá trị bình phương của số tự nhiên, chúng ta làm việc này với extensions
```
extension Int {
	func squared() -> Int {
		return self * self
	}
}
```
Chúng ta dùng chúng như sau
```
print(21.squared())
```
Ví dụ khác là mở rộng kiểu Double để thêm một phương thức chuyển đổi giá trị double sang kiểu String thể hiện giá trị tiền tệ. Phương thức này làm tròn số tới 2 số lẻ và thêm kí hiệu tiền tệ. 
```
extension Double {
	func currencyString() -> String {
		let divisor = pow(10.0, 2.0)
		let num = (self * divisor).rounded() / divisor
		return “$ \(num)”
	}
}
```
Chúng ta không thể thêm thuộc tính với extensions, tuy nhiên chúng ta có thể thêm thuộc tính tính toán. Trong phần trước đây chúng ta thêm một phương thức là squared() tới kiểu integer. Chúng ta có thể thực hiện tính năng này như một thuộc tính tính toán như ví dụ sau đây:
```
extension Int {
	var squared: Int {
		return self * self
	}
}
```
Chúng ta đã xem cách để mở rộng nhưng kiểu như class, enumeration hoặc struct. Bây giờ chúng ta cùng xem tới mở rộng protocol là gì.

**Protocol extensions.**

Protocol giống như những kiểu dữ liệu khác có thể được mở rộng. Mở rộng protocol có thể được dùng để cung cấp những tính năng chung tới tất cả các kiểu dữ liệu thoã mãn 1 protocol cụ thể. Việc này cho chúng ta khả năng để thêm những tính năng tới bất cứ kiểu nào thoã mãn một protocol hơn là thêm tính năng tới từng kiểu riêng biệt hoặc thông qua một hàm toàn cục. Mở rộng protocol giống như những việc mở rộng thông thường, nó cũng có thể cho chúng ta khả năng thêm tính năng cho những kiểu dữ liệu cái chúng ta không có source code của nó.

Chương trình hướng protocol và framework như GameplayKit phụ thuộc nặng nề vào protocol extensions. Nếu không có protocol extensions, nếu chúng ta muốn thêm những tính năng đặt biệt tới một nhóm kiểu dữ liệu mà cùng thoã một protocol, chúng ta sẽ phải thêm tính năng tới từng kiểu dữ liệu.  Nếu chúng ta dùng kiểu tham chiếu, chúng ta phải tại hệ thống lớp phân cấp, nhưng như chúng ta đã đề cập ở phần trước, nó sẽ bất khả khi đối với kiểu tham trị. Apple đã phát biểu rằng chúng ta nên ưu tiên dùng kiểu tham trị hơn là kiểu tham chiếu và protocol extensions chúng ta có khả năng để thêm tính năng chung tới một nhóm của kiểu tham trị hoặc tham chiếu thoã mãn tới một protocol đặt biệt, nếu không có thì chúng ta phải thực hiện tính năng đó tới tất cả các kiểu.

Cùng xem mở rộng protocol có thể làm gì cho chúng ta. thư viện chuẩn swift cung cấp một protocol tên Collection: http:/ / swiftdoc. org/ nightly/ protocol/ Collection/  
Protocol này kết thừa từ Sequence protocol và nó được sử dụng trong tất cả kiểu tập hợp chuẩn như Dictionary và Array.
Cùng xem cái chúng ta muốn thêm tính năng tới tất cả các kiểu thoã mãn tới protocol Collection. Đây là tính năng mới sẽ sáo trộn những phần tử trong một tập hợp hoặc trả về chỉ những phần tử mà thứ tự của nó là những số chẵn. Chúng ta có thể dễ dàng thêm tính năng này bằng cách mở rộng Collection protocol
```
extension Collection {
	func evenElements() -> [Iterator.Element] {
		var index = startIndex
		var result: [Iterator.Element] = []
		var i = 0
		repeat {
			if i % 2 == 0 {
				result.append(self[index])
			}
			index = self.index(after: index)
			 i += 1
		} while (index != endIndex)
		return result
	}

	func shuffle() -> [Iterator.Element] {
		return sorted() { left, right in
			return arc4random() < arc4random()
		}
	}
}
```
Chú ý rằng khi chúng ta mở rộng một protocol chúng ta dùng cùng cú pháp và định dạng chúng ta dùng khi chúng ta mở rộng những kiểu khác. Chúng ta dùng từ khoá extension theo sau bởi tên của protocol chúng ta muốn mở rộng. Chúng ta sau đó đặt tính năng chúng ta sẽ thêm vào giữa {}. Bây giờ mõi kiểu thoã mãn protocol sẽ nhận cả hàm evenElements() và shuffle(). ví dụ sau
```
var origArray = [1,2,3,4,5,6,7,8,9,10]
var newArray = origArray.evenElements()
var ranArray = origArray.shuffle()
```
Trong đoạn code trước newArray sẽ chứa những phần tử 1,3,5,7,9 bởi vì những phần tử này nằm ở vị trí chẵn. ranArray sẽ chứa những phần tử giống như origArray nhưng thứ tự sẽ bị xáo trộn.

Protocol extension thì rất tuyệt cho việc thêm tính năng tới một nhóm của kiểu dữ liệu mà không cần phải thêm code tời từng kiểu riêng biệt. Tuy nhiên điều quan trọng cần biết đó là kiểu gì thoã mãn tới protocol chúng ta sẽ mở rộng. Trong ví dụ trước chúng ta mở rộng protocol Collection bằng cách thêm phương thức evenElements() và shuffle() tới tất cả những kiểu thoã mãn tới protocol. Một trong những kiểu thoã mãn với protocol này là kiểu Dictionary. Tuy nhiên kiểu Dictionary là một tập hợp không có thứ tự, do đó eventElements() sẽ không làm việc như mong đợi.
```
var origDict = [1:”one”, 2:”two”,3:”three”,4:”four”]
var returnElements = origDict.eventElements()
for item in returnElements {
	print(item)
}
```
Bởi vì kiểu Dictionary không hứa lưu trữ những phần tử trong bất cứu thứ tự cụ thể nào, 2 phần tử bất kì có thể được in ra màn hình trong ví dụ trên.
```
(2, "two")
   (1, "One")
```
Một vấn đề khác là bất cứ ai không quen với cách mà phương thức evenElements() thực hiện có thể mong chờ kết quả trả về là mảng là kiểu Dictionary bởi vì kiểu gốc của tập hợp này là Dictionary. Tuy nhiên nó thật sự là thực thể của kiểu Array. Việc này có thể là nguyên nhân của 1 số khó hiểu. Do đó chúng ta cần cẩn thận khi chúng ta mở rộng một protocol để đảm bảo tính năng chúng ta sẽ thêm vào hoạt động như mong đợi cho tất cả các kiểu thoã mãn tới protocol. Trong trường hợp shuffle() và evenElements() chúng ta có thể thực hiện tốt hơn bằng cách thêm tính năng này trực tiếp vào phần mở rộng của Array hơn là Collection protocol Tuy nhiên có một cách khác. Chúng ta có thể thêm ràng buộc tới extensions của chúng ta để giới hạn những kiểu nhận được tính năng được định nghĩa trong extension.

Để một kiểu dữ liệu nhận tính năng được định nghĩa trong protocol extensions. Nó phải thoã mãn tất cả các ràng buộc được định nghĩa trong protocol extension. Một ràng buộc được thêm vào sau tên của protocol mà chúng ta sẽ mở rộng bằng từ khoá where. Hãy cùng xem ví dụ cách chúng ta thêm ràng buộc với phần mở rộng Collection
```
extension Collection where Self: ExpressibleByArrayLiteral {
	// Extension code here	
}
```
Trong Collection protocol extensions trong ví dụ trước chi những kiểu thoã mãn ExpresssibleByArrayLiteral protocol sẽ nhận những chức năng được định nghĩa trong extensions. Từ đây Dictionary không thoã mãn ExpressibleByArrayLiteral Protocol. Nó sẽ không nhận những tính năng được định nghĩa trong protocol extensions.

Chúng ta cũng có thể dùng ràng buộc này để chỉ những Collection protocol của chúng ta chỉ áp dụng tới một collection mà những phần tử của nó thoã mãn một protocol đặc biệt. Trong phần ví dụ tiếp theo chúng ta dùng ràng buộc này để đảm bảo những phần tử trong collection thoã mãn tới protocol Comparable. Điều này có thể cần thiết nếu tính năng chúng ta sẽ thêm vào dựa trên khả năng so sánh 2 hoặc nhiều hơn các phần tử trong tập hợp. Chúng ta sẽ thêm ràng buộc này
```
extension Collection where Iterator.Element: Comparable {
	//Add function
}
```
Những ràng buộc này cho chúng ta khả năng để giới hạn những kiểu nhận tính năng được định nghĩa trong extension. Một thứ chúng ta cần cẩn thận là dùng protocol extension khi chúng ta thật sự nên mở rộng một kiểu cá nhân. Mở rộng Protocol nên được dùng khi chúng ta muốn thêm tính năng tới một nhóm của kiểu dữ liệu. Nếu chúng ta cố gắng thêm tính năng tới một kiểu đơn, chúng ta nên xem xét lại việc mở rộng kiểu dữ liệu cá nhân đó.
Bây giờ chúng ta đã thấy cách để dùng extension và protocol extensions, Hãy cùng xem ví dụ thực tế. Trong ví dụ này chúng ta sẽ chỉ cách để tạo một framework kiểm tra sự đúng đắn của một chuỗi kí tự.

**Text validation**

Trong nhiều ứng dụng, trên nhiều nền tảng (IOS, Android, windows) tôi đã được giao nhiệm vụ kiểm tra dữ liệu người dùng nhập vào sau khi người dùng nhập nó hoặc nó được đưa vào. Việc xác thực này có thể được hoàn thành một cách dễ dàng với regular expression. Tuy nhiên chúng ta không muốn nhiều regular expression nằm rải rác trong code của mình. Chúng ta có thể giải quyết vấn đề này bằng cách tạo những lớp khác nhau hoặc struct chứa đựng những đoạn code xác thực. Câu hỏi là cách này để sắp xếp những kiểu đó lại để làm chúng dễ dàng sử dụng và bảo trì. Phần trước protocol extension trong swift. tôi đã dùng protocols để định nghĩa những yêu cần xác thực và sau đó tạo một kiểu thoã mãn tới protocol này cho mõi kiểu xác thực nếu cần.

Trước khi nhìn vào cách chúng ta hoàn thành việc thẫm định chuỗi kí tự, hãy cùng nhìn nhanh qua regular expression là gì và cách chúng ta dùng chúng trong swift. Một regular expression được biết như  regex là một chuỗi kí tự đặc biệt được dùng để diễn tả một sự tìm kiếm hoặc ánh xạ mẫu. Chuỗi regular expression cũng được biết như là mẫu chứa đựng một hoặc nhiều kí tự, toán tử hoặc cấu trúc. Regular expression rất hữu dụng khi chúng ta tìm kiếm một chuỗi cho một mẫu đặc biệt hoặc thẫm định một chuỗi.

Regular expression không phải duy nhất cho swift. Hầu hết các ngôn ngữ hiện đại có một cách để dùng regular expressions. trong toàn bộ những cuốn sách viết về regular expressions chúng tôi sẽ đưa một đoạn giới thiệu ngắn gọn với đủ thông tin cho bạn để hiểu những ví dụ trong chương này.
Trong dạng đơn giản nhất, một regular expression là một chuỗi của những kí tự như abc hoặc 12345. Dùng một regular expression như một cái sẽ khớp mẫu nằm trong chuỗi sẽ được đưa ra trong ví dụ tiếp theo.

| Regex | Matches | Description |
| -------- | -------- | -------- |
| abc     | xyzabcxyzabc     | chuỗi khớp là abc     |
| 12345     | 123456789     | khớp chuỗi 12345     |

Chúng ta cũng có thể định nghĩa tập kí tự dùng dấu []. Tập kí tự sẽ khớp một kí tự trong chuỗi tới bất cứ kí tự nào nằm trong tập hợp. Để định nghĩa một tập hợp, chúng ta có thể dùng một chuỗi các kí tự như đã đưa ở ví dụ trên hoặc chúng ta có thể dùng dấu - để chỉ một khoản.

| Regex | Matches | Description |
| -------- | -------- | -------- |
|[abc]	| xyzabcxyz |	chỉ khớp với những kí tự nằm trong tập abc |
|[a-zA-Z] |	xyzabcxyz |	khớp với bất cứ kí tự viết thường hay viết hoa |
Chúng ta dùng kí tư { } để chỉ một khoảng lặp lại vì vậy chúng ta có thể  khớp nhiều hơn một kí tự. ví dụ nếu chúng ta dùng {2,5} nghĩa là chúng ta muốn khớp ít nhất 2 kí tự nhưng ko quá 5 kí tự

| Regex | Matches | Description |
| -------- | -------- | -------- |
|[a-z]{2,5} |	xyzabcxyz |	khớp từ 2 tới 5 kí tự viết thường |
|[a-z0-9]{2,5} |	xyzabcxyz |	khớp từ 2 tới 5 kí tự viết thường hoặc số. |

Dấu (^) ở chỗ bắt đầu có nghĩa là chúng ta muốn khớp ở phần bắt đầu và kí tự $ có nghĩa là phần khớp ở cuối. Chúng ta có thể dùng 2 kí tự đặt biệt này để khớp với toàn bộ 1 chuỗi. Ví dụ ^[a-z]{0,5}$ mẫu này sẽ khớp một chuỗi chỉ nếu như giữ 0 và 5 là những kí tự viết thường. Phần khớp sẽ bị lỗi nếu có bất cứ những kí tự khác bên cạnh những kí tự viết thường hoặc nhiều hơn 5 kí tự

| Regex | Matches | Description |
| -------- | -------- | -------- |
|^[a-z]{2,5}$ |	xyzabcxyz |	thất bại vì có hơn 5 kí tự|
|[a-z0-9]{0,5} |	xyz12	|khớp 5 kí tự chữ viết thường hoặc chữ số |

cuối cùng, cùng xem một số kí tự đặt biệt trong regular expression. Có những kí tự cần dùng dấu (\) để có ý nghĩa
|Kí tự	| Định nghĩa|
| -------- | -------- |
| .|	dấu . khớp với bất kì kì tự nào|
|\n	|khớp với kí tự bắt đầu dòng mới|
|\t	|khớp với một tab|
|\d	|khớp với một kí tự [0-9]|
|\D	|khớp với những kí tự không phái số|
|\w	|khớp một kí tự  chữ và số tương đương [a-zA-Z0-9]|
|\W	|khớp với một kí tự ko phải chữ và số|
|\s	|khớp với kí tự khoản trắng|
|\S |	khớp với một kí tự không phải khoản trắng|

Có nhiều regular expression hơn những thứ chúng ta vừa nhìn thấy. Trong phần này chúng ta chỉ đưa đủ thông tin để giúp bạn hiểu những ví dụ thẫm định text trong chương này. Nếu bạn có kế hoạch dùng regular expression ở mức cơ bản tôi đề nghị bạn đọc nhiều hơn về chúng.

Bây giờ chúng ta cùng xem cách để chúng ta phát triển framework thẫm định của mình mà không có protocol extension. Chúng ta sẽ bắt đầu định nghĩa một protocol tên TextVaidation chứa những yêu cầu cho bất cứ kiểu được dùng cho việc thẫm định văn bản. Điều này cho phép chúng ta dùng protocol TextValidation ở nơi thực thi những kiểu dữ liệu. Nếu bạn nhớ, đây là một dạng của đa hình.
```
protocol TextValidation {
	var regExMatchingString :String {get}
	var regExFindMatchString: String {get}
	var validationMessage: String {get}
	func validateString(str: String) -> Bool
	func getMatchingString(str:String) -> String
}
```
Trong protocol này, chúng ta định nghĩa ba thuộc tính và 2 phương thức cái mà bất kì kiểu dữ liệu nào thoã mãn protocol này phải thực hiện. Ba thuộc tính đó là:
- regExMatchingString: Regular expression này dùng để thẫm định chuỗi đầu vào chứa những kí tự hợp lệ
- regExFindMatchString: Regular expression này dùng để nhận một chuỗi từ chuỗi đầu vào chứa những kí tự hợp lệ. regular expression này thường được dùng khi chúng ta cần thẫm định đầu vào thời gian thực, như là những thông tin người dùng, bởi vì nó sẽ loại bỏ tất cả những kí tự bắt đầu với  kí tự đầu tên không hợp lệ để kết thúc chuỗi.
- validationMessage: đây là tin nhắn lỗi để hiển thị nếu chuỗi đầu vào chứa những kí tự không hợp lệ.
Hai phương thức cho protocol này:
- validateString: phương thức này sẽ trả về giá trị true nếu chuỗi đầu vào chứa đựng chỉ những kí tự hợp lệ. thuộc tính regExMatchingString sẽ được dùng trong phương thức này để thực hiện việc so khớp.
- getMatchingString: Phương thức sẽ trả về một chuỗi mới chỉ chứa đựng những kí tự hợp lệ. Phương thức này sẽ thường được dùng khi chúng ta cần thẫm định giá trị đầu vào thời gian thực, như thông tin  người dùng, bởi vì nó sẽ loại bỏ tất cả những kí tự bắt đầu với những kí tự không hợp lệ. Chúng ta sẽ dùng regExFindMatchString thuộc tính trong phương thức này để nhận về chuỗi mới.

Bây giờ chúng ta sẽ nhìn cách chúng ta tạo một class thoã mãn với protocol này. class theo sau đó sẽ được dùng để thẫm định chuỗi đầu vào chứa đựng kí tự từ 0 tới 10.
```
class AlphabeticValidation1: TextValidation {
    static let shareInstance = AlphabeticValidation1()
    private init() {
        
    }
    
    let regExFindMatchString : String = "^[a-zA-Z]{0,10}"
    
    let validationMessage: String = "Can only contain Alpha characters"
    
    var regExMatchingString  : String {
        get {
            return regExFindMatchString + "$"
        }
    }
    
    func validateString(str: String) -> Bool {
        if let _ = str.range(of: regExMatchingString,options: .regularExpression) {
            return true
        } else {
            return false
        }
    }
    
    func getMatchingString(str: String) -> String? {
        if let newMatch = str.range(of: regExFindMatchString,options: .regularExpression) {
            print("\(newMatch)")
            return String(str[newMatch])
        } else {
            return nil
        }
    }
}
```
Trong phần thực thi này regExFindMatchString và thuộc tính validationMessage được thuộc tính được lưu trữ và thuộc tính regExMatchingString là thuộc tính tính toán. Chúng ta cũng thực thi phương thức validateString() và getMatchString() trong class để thoã mãn protocol.

Thông thường chúng ta sẽ có một vài kiểu định nghĩa khác nhau thoã mãn protocol TextValidation nơi mà mõi cái thẫm định một kiểu của dữ liệu đầu vào. Như chúng ta có thể thấy trong class AlphabeticValidation1 
, có 1 chút code liên quan tới mõi kiểu thẫm định. Phần tệ hại nhất là có nhiều code cần phải được trùng lắp cho mõi loại thẫm định. Đây không phải là ý tưởng hay. Tuy nhiên nếu chúng ta muốn tránh việc tạo một hệ thống lớp phân cấp với một lớp cha chứa đựng những phần code trùng lắp, chúng ta không có sự lựa chọn nào khác. Protocol đưa cho chúng ta một lựa chọn tốt hơn. Cùng nhìn cách chúng ta thực thi việc thẫm định văn bản của chúng ta với extension protocol.

Với protocol extensions chúng ta cần suy nghĩ thêm về code một chút khác biệt. Sự khác biệt to lớn đó là chúng ta không cần hoặc ko muốn định nghĩa mọi thứ trong protocol. Chuẩn protocol hoặc khi chúng ta dùng một hệ thống lớp phân cấp, tất cả các phương thức và thuộc tính chúng ta muốn truy cập được cung cấp giao diện bởi lớp cha tổng quát hoặc kiểu protocol cần phải định nghĩa trong lớp cha hoặc protocol. Với protocol extension nó thật sự thích hợp cho chúng ta để không định nghĩa thuộc tính tính toán hoặc phương thức trong protocol nếu chúng ta sẽ thực thi nó trong một protocol extensions. Do đó khi chúng ta viết lại kiểu thẫm định văn bản của chúng ta với protocol extensions. TextValidation protocol có thể đơn giản như sau:
```
protocol TextValidation {
	var regExFindMatchString: String {get}
	var validationMessage: String {get}
}
```
Trong TextValidation protocol gốc, chúng ta định nghĩa 3 thuộc tính và 2 phương thức. Như chúng ta thấy trong protocol mới chúng ta chỉ định nghĩa 2 thuộc tính. Bây giờ chúng ta có phần định nghĩa của TextValidation protocol, cùng tạo một protocol extension nơi chúng ta thực thi 2 hàm và 1 thuộc tính còn lại.
```
extension TextValidation {
	var regExMatchingString : String {
		get{
			return regExFindMatchString + “$”
		}
	}

	func validateString(str: String) -> Bool {
        if let _ = str.range(of: regExMatchingString,options: .regularExpression) {
            return true
        } else {
            return false
        }
    }
	
	func getMatchingString(str: String) -> String? {
        if let newMatch = str.range(of: regExFindMatchString,options: .regularExpression) {
            print("\(newMatch)")
            return String(str[newMatch])
        } else {
            return nil
        }
    }
}
```
Trong phần mở rộng của protocol TextValidation chúng tôi thực hiện 2 phương thức và một thuộc tính tính toán chúng ta đã định nghĩa trong protocol cũ. nhưng không có định nghĩa trong một cái nào khác mới.

Bây giờ chúng ta phải tạo protocol của chúng ta và protocol extension , chúng ta có thể định nghĩa những kiểu thẫm định văn bản của mình. trong đoạn code tiếp theo chúng ta định nghĩa 3 lớp chúng ta sẽ dùng để thẫm định văn bản.
```
class AlphabeticValidation: TextValidation {
    static let sharedInstance = AlphabeticValidation()
    private init() {}
    
    let regExFindMatchString: String = "^[a-zA-Z]{0,10}"
    let validationMessage: String = "Can only contain Alpha characters"
}

class AlphaNumbericValidation: TextValidation {
    static let sharedInstance = AlphaNumbericValidation()
    private init() {}
    
    let regExFindMatchString: String = "^[a-zA-Z0-9]{0,15}"
    let validationMessage: String = "Can only contain Alpha Numberic characters"
}

class DisplayNameValidation: TextValidation {
    static let sharedInstance = DisplayNameValidation()
         private init(){}
         let regExFindMatchString = "^[\\s?[a-zA-Z0-9\\-_\\s]]{0,15}"
         let validationMessage = "Display Name can contain only contain Alphanumeric Characters"
}
```
Trong mõi lớp thẫm định văn bản của chúng ta .Chúng ta tạo một hằng số tĩnh và một hàm khởi tạo riêng tư vì vậy chúng ta có thể dùng lớp này như một singleton. Để có thêm thông tin về mẫu singleton hãy đọc phần mẫu thiết kế singleton của chương 7.

Sau khi chúng ta định nghĩa mẫu singleton, tất cả chúng ta làm cho mõi kiểu là thiết lập giá trị cho regExFindMatchString và thuộc tính validationMessage. Bây giờ chúng ta có hầu như không phải trùng lắp code giữa những kiểu dữ liệu. Thậm chí nếu chúng ta muốn. chúng ta sẽ không muốn định nghĩa code singleton trong protocol extension bởi vì chúng ta không muốn ép buộc mẫu này cho tất cả những kiểu dữ liệu thoã mãn protocol. Chúng ta cũng có thể thấy rằng chúng ta có thể định nghĩa 3 lớp nhưng với ít code hơn là định nghĩa lại từng cái một mà không có protocol extension.
Chúng ta có thể dùng những lớp thẫm định này như sau:
```
var myString1 = "abcxyz"
var myString2 = "abc123"
var validation = AlphabeticValidation.sharedInstance
validation.validateString(str: myString1)
validation.validateString(str: myString2)

validation.getMatchingString(str: myString1)
validation.getMatchingString(str: myString2)
```
Trong ví dụ trên, chúng ta tạo 2 chuỗi chứa những chuỗi khác nhau. Chúng ta sau đó tạo thực thể  của AlphabeticValidation. Chúng ta dùng validateString() để xác nhận chuỗi, nó sẽ xác nhận toàn bộ chuỗi có khớp với mẫu regular expression được định nghĩa trong AlphabeticValidation. Chúng ta sau đó dùng getMatchingString() để trả về chuỗi mới chứa đựng chỉ những kí tự hợp lệ được định nghĩa trong regular expression.

validateString() trả về giá trị true cho chuỗi myString1 bởi vì giá trị của myString1 khớp với regular expression. Tuy nhiên nó trả về false đối với chuỗi myString2 bởi vì giá trị của nó chứa đụng số không thoã mới regular expression ^[a-zA-Z]{0,10}

getMatchingString() trả về toàn bộ giá trị chuỗi myString1 vì nó khớp với mẫu regular expression. Tuy nhiên giá trị của myString2 chi trả về chuỗi abc bởi vì chỉ có phần đó thoã regular expression.

Như đã đề cập ở chương 2. rất quan trọng để hiểu được phần lớn những thư viện chuẩn của swift được tạo nên bởi struct kiểu tham trị và protocols. trong phân tiếp theo chúng ta sẽ thấy tại sao nó quan trọng.

**Extension với thư viện chuẩn swift**

Hãy nói rằng, trong ứng dụng của chúng ta, chúng ta cần tính toán những giai thừa của một số tự nhiên. Một giai thừa được viết 5!. để tính một giai thừa, chúng ta lấy tích của tất cả những số tự nhiên dương nhỏ hơn hoặc bằng số cần tính. Cùng xem ví dụ:
```
5! = 5*4*3*2*1
5! = 120
```
Chúng ta có thể dễ dàng tạo một hàm toàn cục để tính toán giai thừa này và chúng ta sẽ thực hiện nó trong hầu hết các ngôn ngữ, tuy nhiên trong swift extension cho chúng ta một cách tốt hơn để làm việc này. Kiểu Integer trong swift được thực thi như một struct cái mà chúng ta có thể mở rộng để thêm tính năng trực tiếp tới kiểu đó. Theo ví dụ tiếp theo cách chúng ta làm:
```
extension Int {
	func factorial() -> Int {
		var answer = 1
		for x in (1…self).reversed() {
			answer *= x
		}
		return answer
	}
}
```
Chúng ta có thể tính toán giai thừa số tự nhiên như sau:
```
print(10.factorial())
```
Nếu bạn chạy đoạn code này chúng tá sẽ thấy chính xác kết quả 3628800 được trả về. Trong ví dụ trên chúng ta cũng nhìn thấy cách rất dễ dàng mở rộng một kiểu để thêm tính năng thậm chí nếu chúng ta không có source code của kiểu đó.

Nếu chúng ta làm nhiều việc so sánh kiểu tuỳ biến cho mình, nó là một ý kiến tốt để chúng thoã mãn với protocol Equatable. Trong phần tiếp theo, chúng ta sẽ nhìn cách chúng ta làm việc này với extension.

**Conforming to the Equatable protocol (thoã mãn với protocol Equatable)**

Trong phần này chúng ta sẽ chỉ cho bạn cách chúng ta thoã mãn protocol Equatable bằng extension. Khi một kiểu thoã mãn tới protocol Equatable, chúng ta có thể dùng dấu == để so sánh hoặc kí hiệu không bằng !=.

(tip) Nếu bạn so sánh những thực thể của một kiểu tuỳ biến, ý kiến tốt ở đây là kiểu của bạn nên thoã mãn với protocol Equatable, nó sẽ giúp bạn dễ dàng so sánh thực thể của mình.

Cùng bắt đầu tạo kiểu chúng ta sẽ so sánh. Chúng ta đặt tên là Place:
```
struct Place {
	let id: String
	let latitude: Double
	let longitude: Double
}
```
Trong kiểu Place, chúng ta có 3 thuộc tính được thể hiện là ID của nơi và vĩ độ và kinh độ của nơi. Nếu có 2 thực thể place có cùng ID và toạ độ, thì chúng ta sẽ xem chúng là cùng nơi.

Để thực thi Equaltable protocol, chúng ta có thể tạo một hàm toàn cục, tuy nhiên đó là giải pháp không được khuyến cáo nhé trong lập trình hướng protocol. Chúng ta cũng có thể thêm một hàm tĩnh tới place để tự nó thực hiện nhưng đôi khi nó tốt hơn kéo những tính năng cần thiết để thoã mãn tới một protocol nằm ngoài phần thực thi của chính nó. Đoạn code dưới dây thực thi để thoã mãn protocol Equatable
```
extension Place: Equatable {
	static func ==(lhs: Place, rhs:Place) -> Bool {
		return lhs.id == rhs.id && lhs.latitude == rhs.latitude && lhs.longtitude == rhs.longtitude
	}
}
```
Chúng ta bây giờ có thể so sánh những thực thể Place như sau:
```
var placeOne = Place(id:”Fenway Park”, latitude:42.3467, longtitude:-71.0972)
var placeTwo = Place(id: "Wrigley Field", latitude: 41.9484, longitude: -87.6553)

print(placeOne == placeTwo)
```
kết quả xuất ra là false vì đây là 2 nơi khác nhau.

Bạn có thể thấy ngạc nhiên tại sao chúng ta đã nói rằng tốt hơn nên kéo những tính năng cần được thoã mãn của 1 protocol ra ngoài khỏi phần thực thi của chính nó. Suy nghĩ một chút về những kiểu dữ liệu lớn hơn bạn có thể đã tạo trong quá khứ. Về mặt cá nhân, tôi đã thấy nhiều kiểu dữ liệu có hàng trăm dòng code và đã thoã mãn tới rất nhiều protocol. Bằng cách kéo những phần code dùng để thoã mãn một protocol ra ngoài khỏi phần thực thi của nó và đặt nó nằm trong phần mở rộng của chính nó, chúng ta đang làm cho code của mình dễ dàng để đọc và bảo trì trong tương lai bởi vì phần thực thi này được cô lập trong phần mở rộng của chính nó.

**TỔNG KẾT.**

Trong chương này chúng ta đã xem extension và protocol extension, Trong phiên bản gốc của swift, chúng ta đã có thể dùng extension để mở rộng struct, class, enumerations nhưng từ swift 2, chúng ta cũng có thể dùng extension để mở rộng protocol.

Nếu ko có protocol extension, lập trình hướng protocol sẽ không thể trở nên hữu dụng, nhưng chúng ta cần chắc chắn rằng chúng ta dùng protocol extension ở nơi phù hợp và không cố gắng dùng chúng ở nơi mà extensions thông thường nên được dùng.

Trong chương tiếp theo chúng ta sẽ thấy mảnh ghép cuối cùng của hướng protocol. đó là Generics.

*Hẹn gặp các bạn ở chương tiếp theo vào tuần sau. *