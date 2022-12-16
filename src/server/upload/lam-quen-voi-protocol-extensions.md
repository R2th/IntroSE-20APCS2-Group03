### Extension
Trước khi bắt đầu, chúng ta hãy cùng nhìn lại Extentions trên Swift. Chắc bạn nào đã từng code ios sử dụng ngôn ngữ Objective C thì sẽ biết rằng có một cái tên mang tư tưởng tương tự với Extensions trong Swift. Trong Objective C, nó được biết đến với một cái tên khác đó là "Category". Việc sử dụng Extensions giúp chúng ta có thể thêm các function vào trong các class, struct, enum or protocol một cách đơn giản. Lưu ý, chúng ta không thể mở rộng class/struct/protocol/enum với một stored property mới.
Các bạn có thể đọc thêm ở trong [Extensions](https://docs.swift.org/swift-book/LanguageGuide/Extensions.html)

### Protocol 
Protocol giúp chúng ta tạo ra một bản thiết kế (bluesprint) bao gồm các function, properties , mà để sử dụng nó thì các class/struct/enumeration sẽ cần phải tuân theo bản thiết kế đó.
Chúng ta có thể dễ ràng tạo ra một protocol như sau:
```
import UIKit

protocol Actions {
    func goAhead()
}

```
Ở trên, mình có tạo một protocol có tên là Actions, nó đại điện cho một bản thiết kế bao gồm các hành động, kịch bản ở đây sẽ là tạo một bản thiết kế bao gồm các actions, mà có thể dùng cho cả người mà động vật.
Tiếp theo, mình sẽ tạo một struct có tên là Human, sau đó mình sẽ adopt function goAhead(). như sau:
```
struct Human: Actions {
    func goAhead() {
        print("Di thang")
    }
}
```
Lúc này, Human sẽ cần phải tuân theo bản thiết kế Actions, bằng cách sử dụng function goAhead. 
Tiếp theo, mình cũng sẽ tạo ra Animal, sau đó cũng sẽ cho nó adopt bản thiết kế Actions.
```
struct Animal: Actions {
    func goAhead() {
        print("Di thang")
    }
}
```

Sau khi cả Human và Animal đều đã conform với Actions, mình sẽ chạy thử, lúc này kết quả như sau:
![](https://images.viblo.asia/6b814027-3b0a-4f34-b2ba-89d9d75f11d4.png)

Thay vì chỉ adopt một protocol, thì chúng ta có thể cùng lúc adopt nhiều protocol khác nhau. Ví dụ mình sẽ thêm 1 protocol có tên Dog:
```
protocol Dog {
    func bark()
}
```
Một chú chó thì sẽ biết sủa. Và mình sẽ tạo ra một struct có tên là Golden, nó đại diện cho giống chó Golden nổi tiếng:
```
struct Golden: Actions, Dog {
    func goAhead() {
        print("Di thang")
    }
    
    func bark() {
        print("Sua gau gau")
    }
}
```

Lúc này, chú chó Golden của chúng ta đã có thể vừa đi, vừa sủa =))
![](https://images.viblo.asia/8adcdb50-c90a-4ecd-b540-9d06b601cf7a.png)

### Protocol extensions
Chúng ta hãy cũng xem lại ví dụ phía trên, nếu như chú chó Golden của chúng ta không adopt phương thức bark() thì hệ thống sẽ báo lỗi.
```
struct Golden: Actions, Dog {
    func goAhead() {
        print("Di thang")
    }
}
```
Lỗi:
![](https://images.viblo.asia/2dc53c35-7750-44c6-92da-b3fe829eb0b1.png)
Chúng ta có thể ngầm hiểu rằng, bất cứ chú chó nào cũng sẽ biết sủa, nhưng cũng sẽ vẫn có ngoại lệ 1 số con bị câm :))
Vậy làm sao để chúng ta vẫn adopt được protocol Dog để đảm bảo rằng tất cả những con chó khác đều sẽ biết sủa (bark) nhưng vẫn thỏa mãn rằng có 1 số con không thể sủa. Đây là lúc chúng ta sẽ sử dụng extensions.
Để giúp bất kỳ chú chó nào cũng có thể sủa, vì chó thì thường sẽ sủa "gâu gâu",  nên chúng ta sẽ để mặc định cho chúng như vậy. Ví dụ:

```
protocol Dog {
    func bark()
}

extension Dog {
    func bark() {
        print("sua gau gau")
    }
}
```
Khi bất kỳ giống chó nào adopt protocol Dog, thì nó sẽ đều biết sủa "gâu gâu" giống nhau, ví dụ:
```
struct Golden: Actions, Dog {
    
    func goAhead() {
        print("Di thang")
    }
}

let golden = Golden()
golden.goAhead() // di thang
golden.bark() // sua gau gau
```
Như ví dụ trên thì chúng ta có thể thấy rằng, việc khởi tạo code của function bark bên trong extension thì nó ngầm hiểu rằng các class/struct/enum sẽ không cần phải thêm function đó bên trong nó (**Optional protocol functions**), mà nó sẽ sử dụng luôn function đã được định nghĩa bên trong extension.
Tuy nhiên nếu như với giống chó bị câm, ở đây mình sẽ tạo ra một con chó Poodle, không hề biết sủa. 
```

struct Poodle: Actions,Dog {
    func goAhead() {
        print("di thang");
    }
    
    func bark() {
        print("Bi cam");
    }
}

let poodle = Poodle()
poodle.goAhead() // di thang
poodle.bark() //bi cam
```
Thì lúc này, chúng ta có thể adopt lại function bark để thực hiện một hành động, chức năng riêng biệt thay vì giống các chú chó khác là sủa gâu gâu, thì chú chó này lại bị câm :))
Ngoài ra, chúng ta cũng có thể thêm các function khác cho protocol (**Additional functionality**) để các class/struct/enum mà đang adopt nó đều có thể sử dụng được. Ở extensions Dog phía trên, mình sẽ thêm 1 func nữa:
```

extension Dog {
    func bark() {
        print("sua gau gau")
    }
    
    func tailWagging() {
        print("vẫy đuôi")
    }
}
```
thì lúc này với cả chú chó Poodle và Golden ở trên đều sẽ có thể sử dụng được
```
let golden = Golden()
golden.goAhead()
golden.bark()
golden.tailWagging() // vẫy đuôi
```
Dưới đây là toàn bộ đoạn code trong bài
![](https://images.viblo.asia/9ccae7e9-23ec-4252-8e72-020921a88753.png)

### Kết bài
Mình xin phép dừng bài viết lại ở đây, bài viết bao gồm 1 chút lý thuyết và ví dụ minh họa, hy vọng nó dễ hiểu. Nếu các bạn muốn thì có thể đọc thêm về protocol và extension trong docs của [Swift](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html)