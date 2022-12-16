Xin chào, lại là mềnh đây. T_T hôm nay lại là một bài dịch mà mềnh học được trong lúc ngồi viết báo cáo thực tập. Mình nghĩ bài viết này sẽ khá hay cho các fresher như mình để hiểu sâu hơn về Swift và iOS. Rất mong các bạn ủng hộ.


-----
# Lazy var trong swift

Trong quá trình phát triển các sản phẩm iOS, chắc chắn rằng các developer luôn để ý tới việc số lượng bộ nhớ (amount of memory) mà app của chúng ta sử dụng. Nếu app của chúng ta quá phức tạp thì vấn đề về bộ nhớ là một trong những thách thức khó nhằn với các dev. Chính vì lẽ đó, các dev chúng ta phải rất cẩn thận với từng dòng code của mình và đương nhiên đặt ưu tiên hàng đâu cho việc tối ưu hoá cấp phát bộ nhớ. Chúng ta nên tránh việc khởi tạo hay làm gì đó vô tội vạ trừ khi điều đó rất là cần thiết, bởi đơn giản, những điều nó có thể gây khó khăn cho chúng ta về sau này trong việc fix bug hay thậm chí là gây ảnh hưởng tới performance của app.
![](https://images.viblo.asia/f8bad122-354b-4211-8972-ce83b099f3db.png)

Trong Swift có một kỹ thuật gọi là `lazy` giúp cho bạn trì hoãn việc khởi tạo đối tượng cho đến khi nó thật sự được gọi đến. Nếu không được gọi đến, nó sẽ không bao giờ chạy. Chính vì lẽ đó, nó sẽ giúp bạn khá nhiều trong việc tiết kiệm thời gian xử lý trong app.


Đây là định nghĩa của lazy được lấy từ doc của Apple:

> A lazy stored property is a property whose initial value is not calculated until the first time it is used. You indicate a lazy stored property by writing the lazy modifier before its declaration.
> 

Bạn cũng nên để ý rằng, luôn dùng từ khoá `lazy` cho các đối tượng là biến(với từ khoá `var`), bởi vì giá trị ban đầu của nó không được lấy ra cho đến khi việc khởi tạo giá trị hoàn tất. Các biến hằng số (constants) thì luôn luôn phải có giá trị trước khi việc khởi tạo hoàn tất nên thành ra không được khởi tạo với `lazy`.

Chúng ta hãy đi vào ví dụ cho dễ hiểu nhé: Hãy tưởng tượng rằng bạn có 1 struct là InterviewCandidate. Nó có 1 biến optional bool để kiểm tra là thí sinh này (candidate) apply cho vị trí iOS hay Android. Biến string để mô tả hồ sơ cá nhân của thí sinh này được khai báo với từ khoá `lazy`. Nhìn vào dòng code dưới đây bạn sẽ hiểu, thí sinh apply ở vị trí iOS và biến giá trị lazy iOSResumeDescription sẽ được khởi tạo khi gọi print, còn biến androidResumeDescription sẽ bị nil cho đến khi nào nó được gọi khởi tạo gía trị.
```
import UIKit

struct InterviewCandidate {
    var isiOS:Bool?
    
    lazy var iOSResumeDescription: String = {
        return "I am an iOS developer"
    }()
    lazy var androidResumeDescription: String = {
        return "I am an android developer"
    }()
}

var candidateA = InterviewCandidate()
candidateA.isiOS = true

if candidateA.isiOS! {
    print(candidateA.iOSResumeDescription)
} else {
    print(candidateA.androidResumeDescription)
}
```
Đây là 1 ví dụ khá đơn giản. Nếu chúng ta có 1 class hay struct khá phức tạp chứ một đống biến computed (computed variable) và trả nó về giá trị từ 1 hàm đệ quy nào đó. Thử tưởng tượng bạn tạo khoảng 1000 objects như vậy thì chắc chắn 100% là vấn đề về performance và memory sẽ đập vào mặt bạn ngay.

# Lazy Stored Property vs Stored Property

Có một vài lời ích mà 1 biến lazy nhỉnh sơn so với các biến thông thường:

1. Closure đi kèm với các biến lazy chỉ được thực thi chỉ khi bạn sử dụng biến ấy. Vì thế, nếu như vì vài lí do nào đó nó không được sử dụng (Vd: có thể là do quyết định của user giống như androidResumeDescription ở đoạn code phần trên cũng vậy) bạn sẽ tránh được việc phân bổ và khởi tạo không cần thiết cho app.
1. Bạn có thể gán giá trị 1 một biến đã được lưu trữ vào một biến lazy
1. Bạn có thể dùng self bên trong closure của biến lazy. Nếu như dùng self bên trong closure của lazy, nên để ý và khai báo thêm `[unowned self]` để tránh việc làm tăng strong reference count lên 1.

```
import UIKit
import Foundation

class InterviewTest {
    var name: String
    lazy var greeting : String = { [unowned self] in
        return "Hello \(self.name)"
    }()
    
    init(name: String) {
        self.name = name
    }
}
let testObj = InterviewTest(name:"abhi")
testObj.greeting
```

Bạn có thể tham chiếu các biến cho dù bạn có dùng closure hay không. Ví dụ:
```
lazy var iOSResumeDescription = “I am an iOS developer”
```

Note: Các bạn phải nhớ rằng, mục đích chính của biến lazy là nó chỉ được compiler thực thi khi nó được gọi ra, sau đó thì giá trị của nó đã được lưu lại. Chính vì lẽ đó, nếu bạn gọi iOSResumeDescription lần nữa, thì bạn vẫn sẽ thấy giá trị cũ trước đó.

# Các quy tắc của Lazy
* Bạn không thể dùng lazy với let
* Bạn chỉ có thể dùng lazy bên trong struct và class
* Biến lazy không được khởi tạo lúc ban đầu nên nó sẽ gây không an toàn cho thread.
* Bạn không thể dùng lazy chung với computed properties. Bởi vì các computed properties thường trả về giá trị mỗi lần chúng ta truy cập tới sau khi chúng thực thi các dòng code bên trong block.


-----

Tài liệu tham khảo:
https://medium.com/@abhimuralidharan/lazy-var-in-ios-swift-96c75cb8a13a