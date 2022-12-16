Chào các bạn, hôm nay mình sẽ viết bài về sự khác nhau giữa các kiểu check: is, as, as?, as! trong Swift. Bài viết được lấy từ nguồn: https://medium.com/@abhimuralidharan/typecastinginswift-1bafacd39c99

*Type casting* trong Swift được thực hiện bởi operator **is** và **as**. **is** được sử dụng để kiểm tra kiểu của giá trị, còn **as** được sử dụng để chuyển đổi một giá trị sang một kiểu khác. 

Xem class LivingBeing bên dưới và 2 subclass của nó là Human và Animal:

```
import Foundation

class LivingBeing {
    var age :Int?
    
    init(age:Int?) {
        if let age = age {
            self.age = age
        }
    }
}

class Human: LivingBeing {
    var name: String?
    
    init(name: String?, age: Int?) {
        if let name = name {
        self.name = name
        }
        super.init(age: age ?? 0)
    }
}

class Animal: LivingBeing {
    var isMammals: Bool?
    
    init(isMammals: Bool?, age: Int?) {
        if let isMammals = isMammals {
            self.isMammals = isMammals
        }
        super.init(age: age ?? 0)
    }
}

let livingBeingArray = [Animal(isMammals: true, age: 12), Human(name: "Abhilash", age: 25)]
```

Bây giờ, tạo ra một constant array gọi là *livingBeingArray* với 1 object Human và 1 object Animal. Human và Animal có 1 superClass chung, nên livingBeingArray có kiểu [LivingBeing]. 

Các item của livingBeingArray vẫn là các instance của class Human và Animal. Tuy nhiên, nếu bạn gõ lệnh append để thêm phần tử mới, bạn sẽ nhận được suggest là kiểu LivingBeing, không phải Human hay Animal:

![](https://images.viblo.asia/d83ba862-2d0b-40b6-a25b-800c41d43d38.png)

Để sử dụng các item của livingBeingArray, bạn phải *check* type của chúng, hoặc *downcast* chúng tới 1 type khác:

## Checking Type

Sử dụng **is** để kiểm tra xem một instance có thuộc kiểu subclass cụ thể nào không. Trả về true nếu instance thuộc kiểu subclass đó và false nếu không.

Xem đoạn code sau:

```
let livingBeingArray = [Animal(isMammals: true, age: 12), Human(name: "Abhilash", age: 25)]
let livingBeingObj = livingBeingArray[0] // trả về a LivingBeing object.

for item in livingBeingArray {
    if item is Animal {
            print("item is of type Animal")  // item đầu tiên sẽ nhảy vào đây
    } else if item is Human {
        print("item is of type Human")  // item thứ 2 sẽ nhảy vào đây
    }
}
```

## Downcasting

Apple doc: Một hằng hoặc biến của một type class cụ thể có thể refer tới một subclass, trường hợp này bạn có thể downcast tới type subclass đó bằng operator **as?** hoặc **as!**.

Xét array livingBeingArray, chúng ta biết rằng item đầu tiên có kiểu Animal, vì mảng có chứa một object Animal và một object Human, nên array có kiểu LivingBeing. Nếu chúng ta cố gắng get bất kỳ item nào của mảng, nó sẽ return ra object kiểu LivingBeing, trường hợp này chúng ta có thể downcast nó sau khi get từ mảng.

**Sự khác nhau giữa as? và as!**

Việc downcast có thể thực hiện bằng 2 cách:
* Conditional downcasting (**as?**).
* Forced downcasting (**as!**).

**as?** trả về một optional value của kiểu mà bạn đang cố gắng downcast tới. **as!** cố gắng downcast và force-unwrap kết quả. Sử dụng **as?** khi bạn không chắc chắn việc downcast sẽ thành công, as? luôn trả về một optional value, value này sẽ là nil khi downcast bị fail, điều này cho phép bạn kiểm tra việc downcast có thành công hay không. Chỉ sử dụng **as!** khi bạn chắc chắn rằng downcast chắc chắn thành công, as! sẽ trigger một runtime error nếu bạn cố gắng downcast tới 1 kiểu class sai. 

Ví dụ:
```
let animalObj = livingBeingArray[0] as! Animal //forced downcasting to Animal
let humanObj = livingBeingArray[1] as! Human //forced downcasting to Human
```

Vì chắc chắn rằng item đầu tiên là kiểu Animal, item thứ 2 là kiểu Human nên có thể dùng **as!**, nhưng nếu bạn force downcast item đầu tiên tới kiểu Human và item thứ 2 tới kiểu Animal thì app sẽ bị crash:
```
let animalObj = livingBeingArray[0] as! Human //error and crashes
let humanObj = livingBeingArray[1] as! Animal //error and crashes
```

Chúng ta nên sử dụng as? vì không biết downcast có thành công hay không:
```
let animalObj = livingBeingArray[0] as? Human // return nil
let humanObj = livingBeingArray[1] as? Animal // return nil

let animalObj = livingBeingArray[0] as? Animal // success, returns Animal?
let humanObj = livingBeingArray[1] as? Human // success, returns Human?
```

**Upcasting**

Chúng ta cũng có thể upcast từ base class tới superclass của nó, ví dụ:

```
let animalObj = livingBeingArray[0] as! Animal
let animalObjectAsLivingBeingObj = animalObj **as** LivingBeing
```
animalObjectAsLivingBeingObj là kiểu LivingBeing.

**Type casting cho Any và AnyObject**

Swift cung cấp 2 kiểu đặc biệt để làm việc với các kiểu nonspecific :
* Any có thể đại diện cho 1 instance của bất kỳ kiểu nào, bao gồm cả function types.
* AnyObject có thể đại diện cho 1 instance của bất kỳ kiểu class nào.

![](https://images.viblo.asia/d4edd826-e388-452d-bd12-1355077f84ff.png)

Xem xét một mảng có kiểu Any, sử dụng switch để check và downcasting:
```
var groups = [Any]()
groups.append(1.0)
groups.append(1)
groups.append("string")

for item in groups {
    switch item {
    case let anInt as Int:
        print("\(item) is an int")
    case let aDouble as Double:
        print("\(item) is a double")
    case let aString as String:
        print("\(item) is a string")

    default:
        print("dunno")
    }
}

/*
1.0 is a double
1 is an int
string is a string
*/
```

Sử dụng switch để check và downcasting:
```
for obj in livingBeingArray
{
    switch obj {
        case let animalObj as Animal:
            print(“\(obj) is an animal”)
            break
        case let humanObj as Human:
            print(“\(obj) is an human”)
            break
        default:
            print(“unknown type”)
    }
}
```

Bạn cũng có thể sử dụng **is** để check:
```
for obj in livingBeingArray
{
    switch obj {
        case is Animal:
            print(“\(obj) is an animal”)
            break
        case is Human:
            print(“\(obj) is an human”)
            break
        default:
            print(“unknown type”)
    }
}
```

Cảm ơn bạn đã đọc bài viết!