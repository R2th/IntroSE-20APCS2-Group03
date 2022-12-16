Chắc chắn sẽ có khá nhiều bạn dev khi mới bắt đầu tìm hiểu Swift sẽ hỏi rằng: "Đệt, file-private và private của thằng này khác nhau con mịa gì nhỉ ???" Hôm nay, bài viết này của mình (thật ra là chôm bài người khác dịch lại T_T mấy nay sml quá các bạn thông cảm :D ) sẽ giúp bạn phân biệt được các khái niệm: `Open, Public, Internal, File-private, Private` trong Swift.
## Bắt đầu

Trước khi đi vào mấy cái từ khoá Access control ở trên, các bạn phải biết khái niệm **Module** trước đã. Cứ tưởng tượng **module** là 1 cái gói chứa 1 đống code trong ấy. 1 project Xcode project/framework/bundle cũng được xem là 1 một module

Thậm chí **UIKit** cũng được xem là 1 **module** . Vd nà, khi bạn cần thao tác với các UIComponents như UITableView, UIButton, UIViewController hay lung ta lung tung thứ khác, điều đầu tiên bạn cần làm là import thư viện/ module UIKit.

```
import UIKit
class BobController: UIViewController {}
```

Thế là giờ bạn có thể dùng code được viết trong thư viện UIKit cmnr. 1 project trong Xcode thường sẽ không chứa các file Objective-C hay Swift, các bạn cần phải import em nó vào. Mình thật sự cũng méo biết cái UIKit này nó nằm ở đâu trong folder Xcode nhưng chắc chắc 96,69% là nó nằm ở đâu đó trong máy của bạn =))).

-----

Mấy pa kĩ sư của Apple không nói cho các iOS dev về cách UIKit được thế kế bên trong cùng với Xcode. Chỉ biết là Swift là một ngôn ngữ mở.

(Apple engineers don’t tell iOS developers how UIKit is designed internally along with Xcode. Only Swift is open-sourced.)

-----
Vì vậy, nếu bạn muốn import code của ai đó, vd như là 1 lib nào đó trên Github, bạn có thể kéo thả library/ folder vào các folder ở bên trái giao diện Xcode và import tên lib vào là xong
```
import RandomLibraryFromGithub
```
Nếu bạn vẫn méo hiểu bundle là cái vẹo gì sau tất cã những gì mình đã giải thích thì đọc doc Apple đỡ đi này.
Apple nói là:


-----

A module is a single unit of code distribution — a framework or application that is built and shipped as a single unit and that can be imported by another module with Swift’s import keyword.

-----
## Thế giờ nàm thao? 🤔
Vâng, thế là bạn đã đọc thấy mịa thấy cha mà vẫn méo hiểu sao nó chưa vô vấn đề chính. Có đôi lúc bạn méo muốn loay hoay với cái đống mà bạn vừa mới import. Chịu thôi, cuộc sống mà =))). Vd nhé, các kĩ sư làm ra UKit tại Apple chắc chắn méo bao giờ muốn bạn đụng tới và sửa lại các classes, methods, variables hay functions của mấy ổng cã. Ý tui là, chúng ta vẫn có thể implement các cấu trúc mà chúng ta muốn như UICollectionView chẳng hạn, bằng cách overriding hoặc tạo subclassing, nhưng chúng ta có thể làm rối mẹ nó cấu trúc của các kĩ sư Apple đã làm ra thành ra nó méo cho đụng vô code của nó đâu :v.

Tương tự như kiểu bạn là 1 ông bố và chỉ cho thằng con 5 tuổi của bạn cách sử dụng 1 chiếc máy tính. Nhưng mà thằng con bạn nó lại lại tò mò muốn mở mẹ cái CPU ra và chỉnh sửa để máy nó đủ sức chơi mấy games hạng nặng. Chính vì lẽ đó, họ tạo ra các rào cản và các quyền tuỳ theo từng level để chặn chúng ta xâm nhập quá sâu vào code/library của họ. Đó là lí do vì sao nó gọi là Access Control (Kiểm soát truy cập). Quá rõ ràng phải hơm nè :D ?

Trong **Swift 3** thì chúng ta có 5 loại. Có thể bạn thấy khá nhiều đấy nhưng mình sẽ cố gắng méo lằm quá mọi thứ lên và sẽ đưa ra các ví dụ ngăn nhưng sẽ rõ ràng cho bạn hiểu cho mỗi loại. Bắt đầu bằng thằng cấp quyền ít bị kiểm soát. (nhớ kĩ là Swift 3 nhé :v đừng có đọc lơ tơ mờ rồi mốt phỏng vấn người ta hỏi trả lời sai rồi về đổ thừa và down vote mình nhen vì Swift 4 nó có vài thay đổi ở private và fileprivate nhưng mình không muốn sửa bài của tác giả)

## 1. Open (Least Control)
Giờ thì xem qua 1 tí cách mà các kĩ sư Apple thiết kế code của họ cho UIKit Framework. Vd nè, chúng ta luôn có thể subclass UICollectionView bất cứ khi nào bạn muốn.
```
myCollectionView: UICollectionView { }
```
Tuyệt, nhưng làm thế nào chúng ta có thể subclass nó? Để tìm câu trả lời thì chỉ cần bạn nhấn `option+click` vào UICollectionView class
```
@available(iOS 6.0, *)

open class UICollectionView : UIScrollView { }
```
Từ khoá **open** đã xác định rằng bạn có thể truy cập từ module xác định đó là UIKit. Bạn thậm chí còn có thể subclass như mình đã làm ở vd trên **myCollectionView** cho dù UIKit nằm ở một module tách biệt so với App bundle của bạn.
## 2. Public
Vâng, **public** thì y chang **open** thôi chỉ ngoại trừ 1cái. Bạn có quyền truy cập vào 1 module. Ví dụ nhá, Từ app bundle hay Xcode project, bạn truy cập vào theUICollectionView class. Nhưng giờ thì hãy để ý tới UICollectionViewDelegate
```
public protocol UICollectionViewDelegate : UIScrollViewDelegate {}
```
Nếu bạn vẫn chưa quen với delegate và protocol thì kệ mẹ nó đi. Điểm chính của chúng ta ở đây là chúng ta không thể subclass UICollectionViewDelegate.
Nó chỉ có thể override hoặc subclass bên trong module mà chúng được định nghĩa. Bởi lẻ đó UIKit như kiểu bị giấu đi và chúng ta thì méo làm gì được nó.

## 3. Internal (default)
Lí do bạn không thường xuyên thấy từ khoá này thường xuyển khi khởi tạo function, variable, class là bởi vì nó là kiểu mặc định cmnr. Những thằng nào được gán với **internal** có thể sử dụng từ bất kì file nào từ module xác định của chúng. Còn bên ngoài module này thì không.
1 function **Internal**  được tạo ra bởi kỉ sư UIKit thì chúng ta không thể đụng tới chúng thậm chí khi ta đã import UIKit. Vd nà:
```
// A function Apple UIKit Engineers wrote in UIKit

internal func useMeIfYouCan() {
 print("You can't stop me")
}
```

Khác với UIViewController hay các public/open functions hay classes. Thậm chí chúng ta import UIKit đi nữa chúng ta không  thể nào dùng được useMeIfYouCan().
## 4. File-Private
fileprivate được dùng khi bạn muốn function/class/variables chỉ được sử dụng trong 1 file duy nhất. Vd nà:
```
// random.swift

fileprivate func introduce() {
 print("Hello from the other side")
}
```
Không có cách nào bạn có thể sử dụng class/function từ 1 file khác thậm chí bạn đang truy cập tới cùng 1 module. Vd:
```
// viewcontroller.swift

override func viewDidLoad() {
 super.viewDidLoad()
 introduce() // error
}
```

## 5. Private(Most Control)
Cuối cùng, cái này đơn giản nhất nà. Không có cách nào bạn dùng nó khi bạn ra khỏi class/function/method. Vd:
```
// human.swift

class Human {
 private var name = "Bob"
}

Human() // Good
Human().name // Error
```
## 6. Note
:v dm nói 5 cái mà giờ có cái số 6 là sao? 
Thật ra thì trong ***swift 4*** thì  **private** đã có sự thay đổi đáng kể. :D Mình xin add thêm tí ở đây cho các bác hiểu hơn.
Vấn đề mình đang nói ở đang là **extension**.
+ Ở Swift 3 khi bạn extension thì nó đã xác định là ra ngoài scope thành ra các variables/functions/classes đi kèm với **private** sẽ không sử dụng được còn **fileprivate** thì vẫn dùng được vèo vèo nếu như nó ở cùng 1 file.
+ Ở Swift 4 thì private có vài chỉnh sửa đó là hổ trợ thêm cho scope của extension nhưng mà bắt buộc nó phải cùng chung 1 file

==> Tới đây thì chắc 100% nếu để ý bạn sẽ hỏi dm thế thì nó khác đết gì fileprivate vậy dùng 2 cái làm vẹo gì? Nếu nó y chang thì gộp mẹ thành 1 cái để tiện hơn không. Bạn xem ví dụ dưới đây sẽ rõ:
```
// Widget.swift
class Widget {   
  private func privateMethod() { ... }
  fileprivate func fileprivateMethod() { ... }
}
```
Mặc dù method nằm ngoài source file nhưng còn trường hợp một subclass nằm trong file thì sao?. Đó không phải là một extension của class  Widget do vậy sẽ không thể truy cập vào private method, nhưng fileprivate method thì có thể.
```
// Widget.swift
class SpecialWidget: Widget {
  func start() {
//  privateMethod()      // No access to private method
    fileprivateMethod()  // fileprivate access allowed
  }
}
```

Giờ thì chắc bạn sẽ quào :v hoặc chửi thề bọn này vì lằng nhằng vcl. Trời sinh "Private" sao còn sinh "Fileprivate". :v cuộc sống mà, chúng nó sinh ra là có lí do hết bạn ạ :D 

![](https://images.viblo.asia/2da6f453-34e8-434d-b15e-b2cc54f300a2.gif)

-----
Okie, vậy là xong. Mong là viết ít giúp các bạn hiểu nhiều hơn về Access Level hay Access Control của Swift. Cảm ơn các bạn rất nhiều

Các tài liệu tham khảo mình tìm hiểu ở đây:
+ [TechMaster: Access level trong Swift 4](https://techmaster.vn/posts/34540/access-level-trong-swift-4)
+ [The Complete Understanding of Access Control in Swift](https://www.bobthedeveloper.io/blog/the-complete-understanding-of-access-control-in-swift)