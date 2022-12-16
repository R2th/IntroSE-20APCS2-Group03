Cuốn sách này là về lập trình hướng protocol. Khi Apple thông báo swift 2 ở WWDC 2015. Họ cũng định nghĩa swift là ngôn ngữ đầu hướng protocol đầu tiên trên thế giới. Từ cái tên của nó chúng ta cũng giả định rằng lập trình hướng protocol thì tất cả là về protocol. Tuy nhiên đây là giả định sai lầm nhé. Lập trình hướng protocol có nhiều thứ hơn thế. Nó thật sự là một cách mới không chỉ để viết ứng dụng mà còn là cách suy nghĩ về lập trình.

Trong chương này chúng ta sẽ học
- Lập trình hướng protocol là gì 
- Cách chúng ta dùng tổ hợp protocol như thế nào
- Cách chúng ta dùng protocol kế thừa thế nào
- Cách lập trình hướng protocol so sánh với lập trình hướng đối tượng.


Trong chương 5 lập trình hướng đối tượng, chúng ta đã thấy cách chúng ta thiết kế kiểu vehicle bằng cách hướng đối tượng. Trong chương này, chúng ta sẽ thiết kế cùng kiểu vehicle bằng cách hướng protocol và so sánh 2 mẫu này.

Sau một số chủ đề nâng cao được thảo luận ở chương trước, Những ví dụ trong chương này trong khá cơ bản, giống như một bước lùi. Điều này hoàn toàn có mục đích. Những ví dụ trong chương này được viết để giúp bạn bắt đầu suy nghĩ theo hướng protocol và giúp suy nghĩ của bạn tách khỏi cách suy nghĩ hướng đối tượng. Một khi bạn làm điều đó bạn có thể bắt đầu kết hợp một số chủ đề nâng cao chúng ta đã trình bày trước đây.

Mẫu thiết kế này chúng tôi giới thiệu trong chương này sẽ trình bày cơ bản về  thiết kế hướng protocol và được viết để bạn bắt đầu suy nghĩ theo hướng protocol. Bạn không nên quên rằng một số ưu điểm chúng ta đã đề cập ở các chương trước như Generics.

Cùng bắt đầu xem lại những yêu cầu của loại Vehicle.

**Những yêu cầu cho code mẫu.**

Khi chúng ta phát triển ứng dụng chúng ta thường có một tập hợp những yêu cầu chúng ta cần làm. Những dự án mẫu của chúng ta trong chương này và các chương tiếp theo cũng không khác gì. Theo một danh sách những yêu cầu cho loại phương tiện chúng ta sẽ tạo:
- Chúng ta sẽ có 3 thể loại địa hình cho phương tiện: đường thuỷ, đường bộ, hàng không. Một Phương tiện có thể là thành viên của 3 loại trên
- Những phương tiện có thể di chuyển hoặc tấn công khi nó nằm ở ô vuông ứng với bất kì thể loại nào bên trên.
- Những phương tiện sẽ không thể di chuyển hoặc tấn công trên ô vuông không khớp với những loại địa hình trên.
- Khi số điểm của một phương tiện về giá trị 0, nó được xem là không còn hoạt động. Chúng ta sẽ giữ những phương tiện còn hoạt động trong một mảng đơn duy nhất và có thể duyệt qua mảng đó

Bản thiết kế của chúng ta trong chương này, chúng ta sẽ chứng minh mẫu thiết kế với chỉ một số phương tiện giao thông, nhưng chúng ta biết rằng số phương tiện sẽ tăng lên khi chúng ta phát triển game. Trong chương này chúng ta sẽ không thực thi nhiều logic cho các phương tiện bởi vì chúng ta tập trung vào phần thiết kế và không code để thực hiện việc tấn công và di chuyển

Bây giờ xem cách chúng ta thiết kế những phương tiện trong cách hướng protocol

**Swift là một ngôn ngữ hướng protocol**
Như Chúng ta đã làm với thiết kế hướng đối tượng, chúng ta sẽ bắt đầu bằng việc tạo ra một biểu đồ trình bày cách để thiết kế những kiểu phương tiện trong cách hướng protocol. Giống như biểu đồ của hướng đối tượng, cái này rất cơ bản nó đơn giản trình bày những kiểu của chúng mà ko có phần chi tiết.
![](https://images.viblo.asia/2fb95fbf-6534-40f5-9f8a-c0863a314758.png)


Thiết kế hướng protocol có một chút khác với thiết kế hướng đối tượng. Trong hướng đối tượng chúng ta bắt đầu với một lớp cha, cái sẽ trở thành trung tâm của bản thiết kế và tất cả các lớp con kế thừa thuộc tính và phương thức từ lớp cha.

Trong thiết kế hướng protocol chúng ta bắt đầu thiết kế với protocol. Những protocol và protocol extensions là trọng tâm của thiết kế hướng protocol. Tuy nhiên như chúng ta đã biết xuyên suốt cuốn sách này, thiết kế hướng protocol ko phải chỉ là protocol.

Trong thiết kế mới chúng ta dùng 3 kĩ thuật để lập trình hướng protocol khác biệt với hướng đối tượng. Những kĩ thuật này là protocol kế thừa , protocol tổ hợp và protocol extensions.

Protocol kế thừa là nơi một protocol có thể kế thừa những yêu cầu từ những protocol khác. Việc này tương tự với lớp kế thừa, tuy nhiên thay vì kế thừa những tính năng từ lớp cha chúng ta sẽ kế thừa những yêu cầu từ protocol. Một trong những tiến bộ của protocol kế thừa hơn so với lớp kế thừa trong swift đó là protocol có thể kế thừa từ nhiều protocol khác. Trong ví dụ của chúng ta LandVehicle, SeaVehicle, AirVehicle kế thừa những yêu cầu từ Vehicle protocol. Đó là ghi chú quan trọng với một cách kết hợp của protocol extension và protocols. Chúng ta có khả năng để kế thừa những tính năng.

Protocol Tổ hợp cho phép nhiều loại thoã mãn tới nhiều hơn một protocol. Trong ví dụ của chúng ta có một số loại như Tank, Submarine, Jet thoã mãn tới một protocol duy nhất, tuy nhiên có 2 loại Amphibious và Transformer nhận được lợi ích của protocol tổ hợp bằng cách thoã mãn tới nhiều protocol

Protocol kế thừa và tổ hợp rất quan trọng trong thiết kế hướng protocol bởi vì chúng cho phép chúng ta dùng chúng để tạo những protocol nhỏ hơn và đặt biệt hơn. Việc này cho phép chúng ta tránh làm phình to lớp cha như chúng ta đã thấy trong thiết kế hướng đối tượng. Chúng ta cần cẩn thận để không tạo những protocol quá nhỏ bởi vì chúng sẽ trở nên khó để bảo trì và quản lý.

Protocol extension cho phép chúng ta mở rộng một protocol để cung cấp phương thức và thuộc tính đầy đủ cho những kiểu thoã mãn protocol. Việc này cho phép chúng ta có khả năng để cúng cấp những tính năng chúng cho tất cả những kiểu nào thoã protocol, loại bỏ việc phải cung cấp một phần thực thi cho từng kiểu riêng biệt hoặc cần tạo một cấu trúc phân lớp. Trong khi protocol extension không xem là quá thú vị, nhưng bạn cần phải hiểu sức mạnh của nó như thế nào, chúng sẽ chuyển đổi cách nghĩ của bạn về thiết kế ứng dụng.

Cùng bắt đầu bằng việc tạo Vehicle Protocol.  Nó sẽ định nghĩa một thuộc tính duy nhất là hitPoints để lưu giữ số điểm còn lại của phương tiện
```
protocol Vehicle {
    var hitPoints: Int {get set}
}
```

Nếu bạn xem lại phần thiết kế hướng đối tượng, chúng ta có 3 phương thức định nghĩa trong lớp cha mà tất cả các loại phương tiện sẽ dùng. Những phương thức này là takeHit(amount:), hitPointsRemaining(), isAlive(). Phần thực thi của những phương thức này sẽ giống nhau cho mõi loại phương tiện, do đó chúng là ứng cử viên để được thực thi trong phần protocol extensions. Code tiếp theo sẽ trình bày cách chúng ta tạo một Vehicle extension, và cách chúng ta sẽ thực thi 3 phương thức này trong extension.
```
extension Vehicle {
    mutating func takeHit(amount: Int) {
        hitPoints -= amount
    }
    
    func hitPointsRemaining() -> Int {
        return hitPoints
    }
    
    func isAlive() -> Bool {
        return hitPoints > 0 ? true : false
    }
}
```

Bây giờ , bất cứ kiểu nào thoã mãn tới kiểu Vehicle protocol hoặc kế thừa protocol sẽ tự động nhận những phương thức này. Protocol kế thừa những yêu cầu từ những protocol khác cũng kế thừa những tính năng được cung cấp bởi protocol extension

 Bây giờ cùng xem cách chúng ta định nghĩa những protocol LandVehicle, SeaVehicle, AirVehicle
```
protocol LandVehicle: Vehicle {
    var landAttack: Bool {get}
    var landMovement: Bool {get}
    var landAttackRange: Int {get}
    func doLandAttack()
    func doLandMovement()
}

protocol SeaVehicle: Vehicle {
    var seaAttack: Bool {get}
    var seaMovement: Bool {get}
    var seaAttackRange: Int {get}
    func doSeaAttack()
    func doSeaMovement()
}
protocol AirVehicle: Vehicle {
    var airAttack: Bool {get}
    var airMovement: Bool {get}
    var airAttackRange: Int {get}
    func doAirAttack()
    func doAirMovement()
}
```
Có một số điều cần chú ý về những protocol. Đầu tiên là tất cả chúng đều kế thừa những yêu cầu từ protocol Vehicle. Điều này có nghĩa là chúng cũng kế thừa những tính năng trong protocol extension của Vehicle

Một điều khác cần chú ý về những protocols này là chúng chỉ chứa những yêu cầu cần thiết cho loại phương tiện đặt biệt của chúng. Nếu bạn còn nhớ lớp cha Vehicle trong thiết kế hướng đối tượng chứa đựng những yêu cầu cho tất cả các loại phương tiện. Việc chia những yêu cầu thành 3 protocol tách biệt làm cho code an toàn hơn dễ bảo hành, dễ quản lý. Nếu chúng ta cần một số tính năng chung chúng ta có thể thêm vào protocol extension tới từng loại hoặc tất cả các protocol.

Chúng ta định nghĩa những thuộc tính cho 3 protocol với tính chất get, điều này có nghĩa là chúng ta sẽ định nghĩa những thuộc tính là hằng số bên trong kiểu dữ liệu thoã mãn những protocol trên. Đây rõ ràng là lợi thế lớn khi dùng thiết kế hướng protocol bởi vì nó ngăn chặn code bên ngoài thay đổi giá trị đã được thiết lập cho chúng, việc này có thể làm giảm lỗi và rất khó để điều tra.

Bây giờ cùng xem cách chúng ta sẽ tạo những kiểu thoã mãn tới những protocol trên. Chúng ta sẽ tạo cùng kiểu Tank, Amphibious và Transformer, chúng ta đã làm trong thiết kế hướng đối tượng. Cùng bắt đầu với kiểu Tank
```
struct Tank: LandVehicle {
    var landAttack: Bool = true
    
    var landMovement: Bool = true
    
    var landAttackRange: Int = 5
    
    func doLandAttack() {
        print("Tank Attack")
    }
    
    func doLandMovement() {
        print("Tank Move")
    }
    var hitPoints: Int = 68   
}
```
Có một số khác biệt với kiểu Tank được định nghĩa ở đây so với kiểu Tank trong thiết kế hướng đối tượng. Cùng xem những khác biệt này. 
```
class Tank: Vehicle {
     override init() {
       super.init()
       vehicleTypes = [.land]
       vehicleAttackTypes = [.land]
       vehicleMovementTypes = [.land]
       landAttackRange = 5
       hitPoints = 68
} 
     override func doLandAttack() { print("Tank Attack") }
     override func doLandMovement() { print("Tank Move") }
   }
```

Điều đầu tiên chúng ta có thể thấy là kiểu Tank trong thiết kế hướng đối tượng là lớp kiểu tham chiếu, trong khi trong thiết kế hướng protocol là struct kiểu tham trị. Thiết kế hướng protocol không nói với chúng ta nên dùng kiểu tham trị, nhưng nó nói rằng chúng ta nên ưu tiên kiểu này. Cũng có nghĩa là chúng ta có thể định nghĩa kiểu Tank bằng class việc này còn phụ thuộc vào thiết kế tổng quát của ứng dụng.

Một trong những nguyên nhân chọn kiểu tham trị hơn kiểu tham chiếu bởi vì chúng an toàn hơn. Nếu bạn luôn luôn nhận 1 bản sao chép của kiểu tham trị thì bạn có thể tin tưởng rằng không chổ nào trong code có thể thể thay đổi thực thể của chúng ta. Điều này đặt biệt hữu ích trong môi trường nhiều thread nơi mà chúng ta không muốn những thread khác có thể thay đổi dữ liệu trong khi chúng ta dùng dữ liệu đó. Bởi vì nó có thể tạo ra những bug rất khó để xử lý. Trong trường hợp của chúng ta, chúng ta sẽ có thể cần khả năng cho phép một phần code có thể thay đổi thực thể vehicle và hoặc không được thay đổi. Trong khi việc này không phải là hành vi mặc định của kiểu tham trị nhưng chúng ta có thể dùng inout trước tham số để đạt được mục đích này. Chúng ta sẽ thấy cách thực hiện việc này trong phần tiếp theo của chương này.

Một sự khác biệt khác giữa 2 kiểu Tank đó là một cái được thiết kế bằng cách hướng protocol có thể dùng hàm khởi tạo mặc định mà struct cung cấp. và chúng ta có thể định nghĩa những thuộc tính như hằng số. Bởi vì một số thuộc tính như là hằng số nên chúng không thể bị thay đổi khi chúng đã được thiết lập. Trong kiểu Tank của thiết kế hướng đối tượng, chúng ta phải ghi đè hàm khởi tạo và sau đó thiết lập giá trị bên trong hàm khởi tạo đó. Những thuộc tính trong thiết kế hướng đối tượng được định nghĩa như biến số và chúng có thể bị thay đổi sau khi chúng dc thiết lập.

Một thứ chúng ta không thấy khi chúng ta xem 2 kiểu Tank là kiểu Tank trong thiết kế hướng protocol chỉ chứa đựng tính năng của phương tiện chạy trên đất liền. Kiểu tank của thiết kế hướng đối tượng kế thừa những tính năng và thuộc tính của cả Biển và bầu trời cũng như trên đất liền, thậm chí nó không cần những tính năng đó.

Bây giờ xem cách chúng ta tạo Amphibious
```
struct Amphibious: LandVehicle, SeaVehicle {
    var landAttack: Bool = true
    
    var landMovement: Bool = true
    
    var landAttackRange: Int = 1
    
    func doLandAttack() {
        print("Amphibious Attack land")
    }
    
    func doLandMovement() {
        print("Amphibious land move")
    }
    
    var seaAttack: Bool = true
    
    var seaMovement: Bool = true
    
    var seaAttackRange: Int = 1
    
    func doSeaAttack() {
        print("Amphibious Attack see")
    }
    
    func doSeaMovement() {
        print("Amphibious sea move")
    }
    
    var hitPoints: Int = 25
}
```

Kiểu Amphibious trong rất giống với kiểu Tank, tuy nhiên nó dùng protocol tổ hợp để thoã mãn tới nhiều protocol kiểu phương tiện. Việc này cho phép nó có những tính năng của cả đất liền và biển. Bây giờ cùng xem cách chúng ta thực thi kiểu Transformer
```
struct Transformer: LandVehicle, SeaVehicle, AirVehicle {
    var landAttack: Bool = true
    
    var landMovement: Bool = true
    
    var landAttackRange: Int = 7
    
    func doLandAttack() {
        print("Transformer Land attack")
    }
    
    func doLandMovement() {
        print("Transformer Land move")
    }
    
    var seaAttack: Bool = true
    
    var seaMovement: Bool = true
    
    var seaAttackRange: Int = 5
    
    func doSeaAttack() {
        print("Transformer Sea attack")
    }
    
    func doSeaMovement() {
        print("Transformer Sea move")
    }
    
    var airAttack: Bool = true
    
    var airMovement: Bool = true
    
    var airAttackRange: Int = 6
    
    func doAirAttack() {
        print("Transformer Air attack")
    }
    
    func doAirMovement() {
        print("Transformer Air move")
    }
    
    var hitPoints: Int = 75
}
```

Bởi vì kiểu Transformer có thể di chuyển và tấn công từ 3 loại địa hình, chúng ta dùng protocol tổ hợp để thoã mãn tới LandVehicle, SeaVehicle, AirVehicle protocol.

Bây giờ xem cách chúng ta dùng những kiểu mới này. Như trong thiết kế hướng đối tượng chúng ta có yêu cầu là có thể giữ những thực thể này trong một mảng duy nhất. Việc này có thể cho phép chúng ta duyệt qua từng phần tử  còn hoạt động của mảng để thực hiện những hành động cần thiết. Để làm việc này chúng ta dùng đa hình như chúng ta đã làm trong thiết kế hướng đối tượng, Tuy nhiên với thiết kế hướng protocol chúng ta sẽ dùng giao diện được cung cấp bởi protocol để tương tác tới những thực thể của kiểu phương tiện. Cùng xem cách chúng ta làm việc này bằng cách tạo một mảng và đặt những thực thể kiểu vehicle vào trong đó.
```
var vehicles = [Vehicle]()

var vh1 = Amphibious()
var vh2 = Amphibious()
var vh3 = Tank()
var vh4 = Transformer()

vehicles.append(vh1)
vehicles.append(vh2)
vehicles.append(vh3)
vehicles.append(vh4)
```

Đoạn code này chính xác giống như trong thiết kế hướng đối tượng. Trong code chúng ta tạo một mảng sẽ lưu những thực thể thoã mãn kiểu Vehicle. Với protocol kết thừa, việc này có nghĩa là mảng sẽ có thể chấp nhận những kiểu thoã protocol kế thừa từ Vehicle protocol. Trong ví dụ của chúng ta, điều này có nghĩa là mảng sẽ chấp nhận những thực thể thoã protocol LandVehicle, SeaVehicle, AirVehicle, và Vehicle 

Mảng, trong ví dụ này được định nghĩa để chứa đựng những thực thể kiểu thoã mãn protocol Vehicle. Điều này có nghĩa là chúng ta có thể dùng giao diện được định nghĩa bởi protocol Vehicle để tương tác với những kiểu trong mảng. Xem protocol Vehicle, nó không thực sự hữu ích, Tuy nhiên chúng ta có thể thử ép kiểu của thực thể để có thể tìm nếu chúng thoã mãn một protocol đặt biệt nào đó. Đoạn code sau đây sẽ chứng minh.
```
for (index, vehicle) in vehicles.enumerated() {
    if let vehicle = vehicle as? AirVehicle {
        print("Vehicle at \(index) is Air")
    }
    
    if let vehicle = vehicle as? LandVehicle {
        print("Vehicle at \(index) is Land")
    }
    
    if let vehicle = vehicle as? SeaVehicle {
        print("Vehicle at \(index) is Sea")
    }
}
```
Trong code này, chúng ta dùng một dòng lặp for để duyệt qua mảng vehicles. Chúng ta dùng một loại ép kiểu để kiểm tra xem nếu thực thể đó thoã mãn tới một protocol như AirVehicle, LandVehicle, SeaVehicle. Chúng ta sẽ in ra vị trí của phương tiện đó.

Truy cập tới từng phần tử trong mảng bằng cách này thì khá giống với cách chúng ta đã làm trong thiết kế hướng đối tượng. Tuy nhiên cái mà chúng ta muốn đó là lấy một kiểu dữ liệu hơn là lấy tất cả kiểu dữ liệu. Chúng ta có thể làm việc đó bằng câu lệnh where. Theo ví dụ sau đây:
```
for (index, vehicle) in vehicles.enumerated() where vehicle is LandVehicle {
    let vh = vehicle as! LandVehicle
    if vh.landAttack {
        vh.doLandAttack()
    }
    if vh.landMovement {
        vh.doLandMovement()
    }
}
```
Trong ví dụ này chúng ta dùng từ khoá where để lọc kết quả cho lệnh for để nhận về chỉ những thực thể thoã mãn protocol LandVehicle. Chúng ta có thể ép kiểu bất cứ thực thể nào được trả về từ dòng lặp for đều thoã protocol LandVehicle và tương tác với nó dùng giao diện dc cung cấp bởi protocol đó.

Bây giờ chúng ta đã hoàn thành việc thiết kế lại, Cùng tổng kết lại cách lập trình hướng protocol khác với lập trình hướng đối tượng như thế nào. 
Tổng kết lập trình hướng đối trượng và lập trình hướng protocol.

Trong chương này và chương 5, lập trình hướng đối tượng chúng ta đã thấy swift có thể dùng cho cả 2 loại. 
Trong chương này chúng ta đã thấy rằng có 2 sự khác biệt giữ 2 mẫu thiết kế.

Phần khác biệt đầu tiên chúng ta thấy đó là với thiết kế hướng protocol chúng ta nên bắt đầu với protocol hơn là với một lớp cha. Chúng ta có thể dùng protocol extension để thêm tính năng tới những kiểu thoã mãn protocol hoặc những kiểu thoã mãn protocol kế thừa từ protocol đó. Với Lập trình hướng đối tượng chúng ta bắt đầu với một lớp cha. Khi chúng ta thiết kế những loại phương tiện của mình theo hướng protocol chúng ta chuyển đổi lớp cha Vehicle sang Vehicle protocol và sau đó dùng protocol extension để thêm những tính năng cần thiết.

Trong ví dụ hướng protocol chúng ta dùng protocol kế thừa và protocol tổ hợp cho phép chúng ta tạo những protocol với những yêu cầu đặt biệt. Việc này cho phép chúng ta tạo những kiểu chính xác chỉ chứa những tính năng cần thiết cho kiểu đó. Trong thiết kế hướng đối tượng, Những kiểu chính xác kết thừa tất cả những tính năng được cung cấp bởi lớp cha Vehicle

Sự khác biệt lớn thứ 2 chúng ta đã thấy là việc dùng struct kiểu tham trị hơn là dùng kiểu tham chiếu class cho kiểu Vehicle. Trong tài liêu của Apple cũng nói rằng những lập trình viên bên ưu tiên dùng kiểu tham trị hơn là kiểu tham chiếu ở những nơi phù hợp. Trong ví dụ của chúng ta, chúng ta đã dùng struct là kiểu tham trị tuy nhiên chúng ta có thể dùng kiểu tham trị. Chúng ta sẽ thảo luận điều này sau trong chương này.

Cả 2 mẫu thiết kế hướng đối tượng và thiết kế hướng protocol đều dùng đa hình để cho phép chúng ta tương tác với những kiểu khác nhau trong một giao diện duy nhất. Với thiết kế hướng đối trượng chúng ta dùng giao diện được cung cấp bởi lớp cha để tương tác với tất cả các lớp con. Trong thiết kế hướng protocol chúng ta dùng giao diện được cung cấp bởi protocol và protocol extension để tương tác với những kiểu thoã mãn protocol.

Bây giờ chúng ta tổng kết những sự khác nhau giữa thiết kế hướng đối tượng và thiết kế hướng protocol, Cùng xem chi tiết hơn những sự khác biệt đó,

**Sự khác biệt giữa lập trình hướng đối tượng và hướng protocol**

Tôi đã đề cập ở phần đầu của chương này lập trình hướng protocol có nhiều thứ hơn là protocol. Đây là một cách mới không chỉ trong lập trình mà còn là cách suy nghĩ về lập trình. Trong phần này chúng ta sẽ kiểm tra những sự khác biệt giữa 2 thiết kế để xem ý nghĩa của câu phát biểu này là gì?

Như một lập trình viên, mục tiêu cuối cùng của chúng ta luôn luôn là để phát triển một ứng dụng có thể hoạt động, nhưng chúng ta cũng tập trung vào viết code rõ ràng và an toàn. Code rõ ràng thì dễ để đọc và dể hiểu. Rất quan trọng để viết code rõ ràng bởi vì bất cứ đoạn code nào chúng ta viết sẽ cần được bảo trì bởi một ai đó. và người đó thường là người viết ra nó. không có gì tệ hơn là nhìn lại code mà bạn đã viết và không thể hiểu nó là cái gì. Cũng có thể dễ dàng nhìn ra lỗi trong code nếu nó rõ ràng và dễ hiểu.

Code an toàn có nghĩa là code khó bị phá vỡ. Không có gì khó hiểu cho chúng ta những nhà lập trình viên thực hiện một sự thay đổi nhỏ trong code của mình và sau đó lỗi xuất hiện trong toàn bộ code. Bằng cách viết code rõ ràng, code của chúng ta vốn dĩ sẽ an toàn bởi vì những người lập trình viên khác sẽ có thể hiểu được code và hiểu chính xác nó làm gì.

Bây giờ cùng so sánh protocol và protocol extension với lớp cha.

Trong lập trình hướng đối tượng chúng ta tạo lớp cha Vehicle cái sẽ được kế thừa bởi tất cả các lớp con. Trong lập trình hướng protocol chúng ta dùng một sự kết hợp của những protocol và protocol extension để đạt được điều tương tự. Tuy nhiên có một số ưu điểm của kiểu hướng protocol.

Để làm mới lại bộ nhớ của các bạn về 2 giải pháp Cùng xem lại lớp cha Vehicle và Protocol Vehicle và protocol extension. 
```
enum TerrainType {
    case land
    case sea
    case air
}

class Vehicle {
    fileprivate var vehicleTypes = [TerrainType]()
    fileprivate var vehicleAttackTypes = [TerrainType]()
    fileprivate var vehicleMovementTypes = [TerrainType]()
    fileprivate var landAttackRange = -1
    fileprivate var seaAttackRange = -1
    fileprivate var airAttackRange = -1
    fileprivate var hitPoints = 0
    func isVehicleType(type: TerrainType) -> Bool {
        return vehicleTypes.contains(type)
    }
    func canVehicleAttack(type: TerrainType) -> Bool {
        return vehicleAttackTypes.contains(type)
    }
    func canVehicleMove(type: TerrainType) -> Bool {
        return vehicleMovementTypes.contains(type)
    }
    func doLandAttack() {}
    func doLandMovement() {}
    func doSeaAttack() {}
    func doSeaMovement() {}
    func doAirAttack() {}
    func doAirMovement() {}
    func takeHit(amount: Int) { hitPoints -= amount }
    func hitPointsRemaining() -> Int { return hitPoints }
    func isAlive() -> Bool { return hitPoints > 0 ? true : false }
}
```
Lớp cha Vehicle là một kiểu hoàn chỉnh chúng ta có thể tạo thực thể từ nó. Việc này có thể là một điều tốt hoặc xấu. Có một số lần như trong ví dụ khi chúng ta không nên tạo thực thể từ lớp cha. Việc này có thể vẫn dùng protocol với lập trình hướng đối tượng. Tuy nhiên chúng ta cần dùng protocol extension để thêm những tính năng chung và việc này dẫn chúng ta quay về với lập trình hướng protocol.

Bây giờ cùng xem cách chúng ta dùng protocols và protocol extension trong thiết kế hướng protocol 
```
protocol Vehicle {
     var hitPoints: Int {get set}
}

extension Vehicle {
    mutating func takeHit(amount: Int) {
        hitPoints -= amount
    }
    
    func hitPointsRemaining() -> Int {
      return hitPoints
    }
    func isAlive() -> Bool {
      return hitPoints > 0 ? true : false
    }
    
}
```
Chúng ta sau đó tạo thên 3 protocol mõi cái sẽ là một kiểu phương tiện và dùng protocol kế thừa để kế thừa những yêu cầu và tính năng từ protocol Vehicle. Những protocol đó là 
```
protocol LandVehicle: Vehicle {
    var landAttack: Bool {get}
    var landMovement: Bool {get}
    var landAttackRange: Int {get}
    func doLandAttack()
    func doLandMovement()
}
protocol SeaVehicle: Vehicle {
    var seaAttack: Bool {get}
    var seaMovement: Bool {get}
    var seaAttackRange: Int {get}
    func doSeaAttack()
    func doSeaMovement()
}
protocol AirVehicle: Vehicle {
    var airAttack: Bool {get}
    var airMovement: Bool {get}
    var airAttackRange: Int {get}
    func doAirAttack()
    func doAirMovement()
}
```
Code trong cả 2 giải pháp này rất an toàn và dễ hiểu, Tuy nhiên thiết kế hướng protocol thì an toàn hơn. Bằng cách phân chi phần thực thi khỏi phần định nghĩa và chia những yêu cầu thành từng phần nhỏ và chi tiết hơn, Chúng ta có thể loại bỏ việc phình to lớp cha và cũng ngăn chặn những kiểu kế thừa những tính năng mà nó ko cần.

Có 3 ưu điểm rõ ràng của protocol và protocol extension trong thiết kế của chúng ta. Ưu điểm đầu tiên là những kiểu có thể thoã mãn tới nhiều loại protocol. Điều này có nghĩa là chúng ta có thể tạo nhiều protocol chứa đựng những tính năng đặt biệt hơn là tạo một lớp cha duy nhất. Chúng ta có thể thấy trong ví dụ của mình lớp cha Vehicle chứa những tính năng của cả đất liền, Biển , bầu trời trong khi trong thiết kế hướng protocol chúng ta có thể tạo 3 protocol mõi cái tương ứng với một kiểu phương tiện.

Ưu điểm thứ 2 của protocol là chúng ta có dùng protocol extension để thêm tính năng mà không cần đổi code gốc. Điều này có nghĩa là chúng ta có thể mở rộng bất cứ protocol nào thậm chí protocol là một phần của ngôn ngữ swift. Để thêm tính năng tới lớp cha của mình chúng ta cần phải có code của lớp cha đó hoặc chúng ta cần tạo lớp con kế thừa lớp cha đó. Tuy nhiên thông thường chúng ta phải tạo kiểu dữ liệu mới kế thừa lớp cha. Chúng ta có thể dùng extension để thêm tính năng cho lớp cha, Tuy nhiên thêm tính năng tới một cấu trúc phân lớp. Trong chương 3 chúng ta đã thấy tại sao chúng ta nên dùng nó cẩn trọng khi dùng extension để thêm tính năng cho cấu trúc phân lớp.

Ưu điểm thứ 3 của protocol là protocol có thể tiếp cận bởi class, struct, enumeration. Trong khi cấu trúc phân lớp hạn chế dành cho kiểu class. Protocol cho chúng ta sự lựa chọn để dùng kiểu tham trị ở những nơi phù hợp.

**Thực thi kiểu Vehicle.**

Việc thực thi những kiểu vehicle thì hơi khác giữ hướng đối tượng và hướng protocol, Tuy nhiên sự khác biệt rất đáng kể. Chúng ta sẽ thấy những sự khác biệt giữa 2 ví dụ, Nhưng đầu tiên cùng xem code lại lần nữa để gợi chúng ta nhớ lại cách chúng ta đã thực thi kiểu Vehicle. Chúng ta sẽ thấy cách chúng ta thực thi kiểu Tank theo cách hướng đối tượng.
```
class Tank: Vehicle {
     override init() {
       super.init()
       vehicleTypes = [.land]
       vehicleAttackTypes = [.land]
       vehicleMovementTypes = [.land]
       landAttackRange = 5
       hitPoints = 68
     }
     override func doLandAttack() {
	print("Tank Attack")
	}
	override func doLandMovement() {
  	print("Tank Move") 
	}
} 
```
Lớp này là lớp con của lớp cha Vehicle, và nó thực thi một hàm khởi tạo duy nhất. Trong khi đây là một việc khá đơn giản và rõ ràng. Chúng ta thực sự cần hiểu đầy đủ lớp cha mong đợt gì để thực thi kiểu cho chính xác. Ví dụ Nếu chúng ta không hiểu đầy đủ lớp cha Vehicle chúng ta có thể quên thiết lập giá trị LandAttackRange. Trong ví dụ của chúng ta, việc quên thiết lập giá trị thuộc tính sẽ dẫn đến kiểu Tank không thể tấn công.

Bây giờ cũng xem cách chúng ta thực thi một kiểu phương tiện theo hướng protocol.
```
struct Tank: LandVehicle {
     var hitPoints = 68
     let landAttackRange = 5
     let landAttack = true
     let landMovement = true
     func doLandAttack() { print("Tank Attack") }
     func doLandMovement() { print("Tank Move") }
   }
```
Kiểu Tank từ thiết kế hướng protocol thoã mãn kiểu LandVehicle protocol và dùng giá trị mặc định được cung cấp bằng struct. Chúng ta có thể nói rằng thiết kế hướng protocol an toàn hơn nhiều và dễ dàng hiểu bởi vì cách những thuộc tính và hàm khởi tạo được thực thị trong cả 2 ví dụ.

Trong lập trình hướng đối tượng, Tất cả các thuộc tính được định nghĩa trong lớp cha như là biến số. Chúng ta sẽ cần xem lại code hoặc tài liệu từ lớp cha để xem những thuộc tính đã được định nghĩa và cách chúng được định nghĩa. Nếu chúng ta quên thiết lập một cái gì đó trong lớp con, trình biên dịch vẫn vui vẻ biên dịch ứng dụng và không cảnh báo cho chúng ta.

Với protocol chúng ta cũng cần xem lại protocol đó hoặc tài liệu về protocol để xem những thuộc tính để thực thi chúng. Sự khác biệt ở đây nếu chúng ta quên bất cứ yêu cầu nào trình biên dịch sẽ báo lỗi và từ chối biên dịch cho tới khi chúng ta thiết lập mọi thứ đúng. Chúng ta cũng có thể định nghĩa bất cứ thuộc tính nào như là hằng số, trong khi trong thiết kế hướng đối tượng chúng ta phải định nghĩa nó là biến số.

**Dùng kiểu tham trị và kiểu tham chiếu.**

Trong chương này chúng ta đã thực thi những kiểu phương tiện như là struct là kiểu tham trị. Chúng ta cũng đề cập rằng nó có thể thực thi những kiểu này bằng kiểu tham chiếu. Nguyên nhân chúng ta nói là những thực thể này thể hiện cho một phương tiện duy nhất trong game và bất cứ khi nào có gì đó xảy ra tới thực thể đó như là bị tấn công bởi những phương tiện khác chúng ta muốn thay đổi đó được lưu trữ.

Khi chúng ta truyền một thực thể của kiểu tham trị với một phần khác của code chúng ta truyền mộ bản sao chép  của thực thể đó chứ kho phải là thực thể gốc. Việc này có thể dẫn đến vấn đề khi chúng ta muốn lưu trữ sự thay đổi để dùng cho kiểu dữ liệu của mình. Cùng xem vấn đề trong code sau. Chúng ta bắt đầu bằng việc tạo một hàm sẽ cập nhật sát thương cho một kiểu phương tiện khi nó thực thi như một kiểu tham chiếu như chúng ta làm với thiết kế hướng đối tượng.
```
func takeHit(vehicle: Vehicle) {
	vehicle.takeHit(amount: 10)
}
```
chúng ta có thể dùng hàm này như sau:
```
var vh = Tank()
takeHit(vehicle: vh)
print(vh.hitPointsRemaining())
```
Nó hoạt động như mong đợi và ở cuối đoạn code thực thể vh của kiểu Tank sẽ có giá trị còn lại là 58. Việc này sẽ không làm việc với kiểu tham trị. Thậm chí nếu swift compiler vẫn cho chúng ta thực hiện, Thực thể vehicle trong phương thức takeHit là bản sao của thực thể vh chúng ta truyền vào, do đó bất cứ thay đổi nào trên thực thể vehicle sẽ không được lưu trở lại cho thực thể gốc. Có nhiều lần chúng ta muốn làm việc này nhưng cũng có những lần chúng ta muốn sự thay đổi được lưu lại. Chúng ta có phỏng theo hành vi này của kiểu tham chiếu, nhưng nó tốn thêm một ít code . Hàm dưới đây sẽ trình bày cách chúng ta tạo một hàm có thể chấp nhận một thực thể là kiểu tham trị và lưu trữ bất cứ sự thay đổi nào cho thực thể góc của nó.
```
func takeHit<T: Vehicle> (vehicle: inout T) {
	vehicle.takeHit(amount: 10)
}
```
Hàm này định nghĩa như một hàm generic nhận vào một biến số thoã mãn protocl Vehicle. Tham số này cũng được đánh dấu như đầu vào của biến số. Điều này có nghĩa là bất cứ thay thay đổi trên biến ở trong hàn sẽ được lưu trữ lại cho thực thể gốc.

Chúng ta sẽ dùng hàm như sau:
```
var tank = Tank()
takeHit(vehicle: &tank)
print(tank.hitPointsRemaining())
```
khi chúng ta gọi hàm này. chúng ta cần đặt kí tự & trước thực thể của kiểu Vehicle, điều này có nghĩa là chúng ta truyền một tham chiếu của thực thể chứ không phải giá trị. Điều này cũng có nghĩa là bất cứ thay đổi nào bên trong hàm sẽ được lưu lại cho thực thể gốc.

Vậy cái nào là ngôn ngữ tốt hơn. Chùng ta cùng tìm hiểu.

**Người chiến thắng là….**

Nhưng chúng ta đã đọc xuyên suốt chương này và thấy những ưu điểm của hướng protocol hơn lập trình hướng đối tượng, chúng ta có thể nghĩ lập trình hướng protocol rõ ràng vượt trội lập trình hướng đối tượng. Giả định này không hoàn toàn chính xác.

Lập trình hướng đối tượng đã xuất hiện từ 1970 nó là mô hình lập trình đã được kiểm tra qua thực chiến. Lập trình hướng protocol là một đứa trẻ mới và chúng được thiết kế để sửa một số vấn đề của lập trình hướng đối tượng. Tôi đã dùng lập trình hướng protocol trong một số dự án và tôi rất thích thú về khả năng của nó.

Lập trình hướng đối tượng và lập trình hướng protocol có khái niệm khá giống nhau để tạo những kiểu tuỳ chọn để mô hình hoá những đối tượng trong thế giới thật hay thế giới ảo. Cả hai đề dùng đa hình để sử dụng một giao diện duy nhất để tương tác với nhiều kiểu dữ liệu. Sự khác nhau là cách chúng ta thiết kế ứng dụng.

Theo ý kiến cá nhân của tôi, Phần cơ bản của một dự án thì dùng lập trình hướng protocol sẽ an toàn và dễ để đọc hơn khi so sánh với lập trình hướng đối tượng. Việc này không có nghĩa là tôi sẽ bỏ rơi lập trình hướng đối tượng. Tôi có thể thấy nhiều nhu cầu cần dùng cấu trúc phân lớp và kế thừa.

Nhớ rằng, Khi chúng ta thiết kế ứng dụng của mình chúng ta nên dùng đúng công cụ cho đúng việc. Chúng ta sẽ không muốn dùng một máy chưa để cắt một khúc gỗ nhỏ nhưng chúng ta cũng không muốn dùng cưa tay để đốn một cái cây. Do đó người chiến thắng là lập trình viên, nơi chúng ta chọn để dùng những mô hình lập trình khác nhau hơn là giới hạn bản thân chỉ với 1 loại.

**Tổng kết**

Trong chương này, chúng ta đã thấy cách chúng ta thiết kế những phương tiện cho một video game trong cách hướng protocol. Chúng ta thấy cách chúng ta dùng protocol tổ hợp và protocol kế thừa, chúng cho phép chúng ta tạo những protocol nhỏ hơn và cụ thể hơn so với một lớp cha. Chúng ta cũng thấy cách lập trình hướng protocol giải quyết vấn đề chúng ta gặp phải khi dùng lập trình hướng đối tượng.

Trong chương tiếp theo chúng ta sẽ thấy cách để thực thi một số mẫu thiết kế phổ biến bằng swift.
*Hẹn gặp các bạn ở chương tiếp theo*