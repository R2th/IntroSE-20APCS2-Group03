Dùng Protocol như một kiểu dữ liệu.
Thậm chí không có chức năng nào được thực thi trong protocol thì chúng vẫn được xem là một kiểu dữ liệu chính thức trong ngôn ngữ swift và có thể dùng chúng như những kiểu dữ liệu khác. Điều này có nghĩa là chúng ta có thể dùng protocol như biến hoặc kiểu dữ liệu trả về cho một function. Chúng ta cũng có thể dùng chúng như kiểu dữ liệu của biến, hằng số, và danh sách. xem ví dụ
```
protocol Person {
     var firstName: String {get set}
     var lastName: String {get set}
     var birthDate: Date {get set}
     var profession: String {get}
     init (firstName: String, lastName: String, birthDate: Date)
} 
```
Protocol này định nghĩa 4 thuộc tính và một hàm khởi tạo. Chúng ta sẽ xem cách để dùng protocol này như là biến và giá trị trả về của hàm.
```
func updatePerson(person: Person) -> Person {
	var newPerson: Person

	return newPerson
}
```
Chúng ta cũng có thể dùng protocol như là kiểu dữ liệu để lưu trữ trong danh sách.
```
var personArray = [Person]()
var personDict = [String: Person]()
```
Chúng ta có thể dùng thực thể của bất cứ kiểu dữ liệu nào thoã mãn protocol của mình ở bất cứ đâu kiểu protocol này được yêu cầu. Cùng giả định rằng có 2 kiểu là SwiftProgrammer và FootballPlayer thoã mãn person protocol. Chúng ta có thể dùng chúng như sau:
```var myPerson : Person
myPerson = SwiftProgrammer(firstName: “Jon”, lastName:”Hoffman”, birthDate: birthDateProgrammer)
myPerson = FootballPlayer(firstName: "Dan", lastName: "Marino", birthdate:
   birthDatePlayer)
   ```
Như đã đề cập bên trên, protocol được dùng như là kiểu dữ liệu của Array, nghĩa là chúng ta có thể lưu trữ những đối tượng thoã mãn với protocol trong Array.
```
var programmer = SwiftProgrammer(firstName: "Jon", lastName: "Hoffman",
                                    birthDate: bDateProgrammer)
   var player = FootballPlayer(firstName: "Dan", lastName: "Marino",
                               birthDate: bDatePlayer)
   var people: [Person] = [] 
people.append(programmer) 
people.append(player)
```
Đây là một ví dụ khác về đa hình của protocol. Để dùng được toàn bộ tiềm năng của protocol , chúng ta cần hiểu về đa hình là gì.

**Polymorphism With protocols (Đa hình với protocol)**

Từ polymorphism bắt nguồn từ tiếng tiếng hy lạp với nghĩa là nhiều, mà morphe có nghĩa là dạng. Trong nhiều ngôn ngữ lập trình, đa hình là một interface đơn lẻ có nhiều dạng. Có hai nguyên nhân để học về nghĩa của từ đa hình. 
Nguyên nhân đầu tiên là từ đặt biệt có thể làm cho bạn thấy thông minh hơn trong các cuộc đối thoại. 
Nguyên nhân thứ 2 là đa hình cung cấp một trong những kĩ thuật lập trình hữu ích nhất không chỉ trong ngôn ngữ lập trình hướng đối tượng mà còn ngôn ngữ lập trình hướng protocol.
Đa hình đưa chúng ta cơ hội để tương tác với nhiều loại kiểu dữ liệu thông quan một chuẩn interface. Trong ngôn ngữ lập trình hướng đối tượng, một interface đồng dạng đến từ một super class, trong khi trong lập trình hướng protocol interface đơn thường đến từ một protocol.
Trong ví dụ bên trên chúng ta có thể thấy đa hình trong swift.
```
var myPerson: Person
   myPerson = SwiftProgrammer(firstName: "Jon", lastName: "Hoffman",
                              birthDate: birthDateProgrammer)
   myPerson = FootballPlayer(firstName: "Dan", lastName: "Marino",
                             birthdate: birthDatePlayer)
```
Trong ví dụ này chúng ta có một biến kiển Person, Đa hình cho phép chúng ta có thể thiết lập biến tới những kiểu dữ liệu khác nhau thoã mãn protocol Person.
Và ví dụ về array Person bên trên.
Khi chúng ta truy xuất một thực thể thông qua một interface duy nhất đồng nhất như ở các vi dụ trên, chúng ta không thể truy xuất vào những chức năng đặc biệt. Ví du chúng ta có một thuộc tính trong kiểu FootballPlayer là age. Chúng ta sẽ không thể truy xuất tới thuộc tính này vì nó không được định nghĩa trong Person protocol. Nếu muốn truy xuất thì cần phải ép kiểu.

**Type casting with protocol  (Ép kiểu với Protocol)**

Type casting là một cách để kiểm tra kiểu của một thực thể hoặc diễn giải kiểu dữ kiệu của một thực thể. Trong Swift chúng ta có thể từ khoá is để kiểm tra bất kì kiểu dữ liệu chỉ định  và từ khoá as để diễn giải về kiểu dữ liệu được chỉ định đó.
ví dụ
```
if person is SwiftProgrammer {
	print(“\(person.firstName) is a swift programmer”)
}
```
Trong ví dụ trên điều kiện câu lệnh trên là true. Nếu thực thể person là một kiểu swiftProgrammer hoặc là false nếu ko cùng kiểu. Chúng ta có thể dùng từ khoá where kết hợp với từ khoá is để lọc một mảng chỉ trả về những thực thể có kiểu được chỉ định. Trong ví dụ tiếp theo chúng ta lọc một mảng chứa những thực thể của person protocol và chỉ trả về những phần từ có kiểu swiftProgrammer
```
for person in people where is swiftProgrammer {
	print(“\(person.FirstName) is a swift programmer”)
}
```
Bây giờ chúng ta cùng xem cách để ép kiểu một thực thể về một kiểu được chỉ định. Để làm việc này chúng ta có thể dùng từ khoá as. Khi thực hiện việc này chúng ta có thể bị fail nếu thực thể không phải là kiểu chỉ định, từ khoá as sẽ đi kèm với 2 dạng as? và as!. Với as? nếu ép kiểu bị fail nó sẽ trả về nil. Với as! nếu ép kiểu bị fail sẽ fail sẽ báo lỗi lúc thực thi, do đó khuyến cáo nên dùng as?. Chúng ta hoàn toàn có thể đảm bảo về kiểu của thực thể hoặc chúng ta có thể kiểm tra kiểu của thực thể trước khi ép kiểu.
ví dụ tiếp theo.
```
if let _ = person as? SwiftProgrammer {
	print(“\(person.firstName) is a swift Programmer”)
}
```
do từ khoá as? trả về kiểu tuỳ biến nên ta có thể thực hiện việc ép kiểu

Tiếp theo cùng xem cách chúng ta dùng associated type với protocol

**Associated types (AT) with protocols**
Khi định nghĩa một protocol, có nhiều lần khi nó được dùng để định nghĩa một hoặc nhiều AT. Một AT cho phép chúng ta thay thế tên mà chúng ta có thể dùng trong protocol cho kiểu dữ liệu đó. Kiểu dữ liệu thực sự để dùng cho associated type không định nghĩa cho tới khi protocol được sử dụng. AT cơ bản phát biểu rằng: Chúng ta không biết chính xác kiểu được dùng, do đó khi một kiểu được chọn thì protocol này phải định nghĩa nó. Như ví dụ nếu chúng ta định nghĩa một protocol kiểu hàng đợi,  kiểu mà protocol được chọn để định nghĩa kiểu của hàng đợi mà nó chứa đựng
```
protocol Queue {
	associatedtype QueueType
	mutating func addItem(item: QueueType)
	mutating func getItem() -> QueueType?
	func count() -> Int
}
```
Trong protocol này chúng ta định nghĩa một kiểu liên quan (AT) là QueueType. Chúng ta sau đó dùng kiểu này 2 lần trong protocol. Chúng ta dùng nó như là kiểu của dữ liệu trong hàm addItem(). Chúng ta dùng nó 1 lần nữa để định nghĩa kiểu trả về của hàm getItem()
Bât cứ kiểu dữ liệu nào thực thi protocol Queue cần phải chỉ ra kiểu cho QueueType và cần đảm bảo là chỉ những phần từ của kiểu này được dùng ở những nơi mà protocol yêu cầu QueueType
Cùng thực thi Queue trong 1 lớp không tổng quát gọi là IntQueue. Lớp này sẽ thực thi Queue protocol
```
struct IntQueue : Queue {
    var items = [Int]()
    mutating func addItem(item: Int) {
        items.append(item)
    }
    mutating func getItem() -> Int? {
        if !items.isEmpty {
            return items.remove(at: 0)
        } else {
            return nil
        }
    }
    
    func count() -> Int {
        return items.count
    }
}

```
Như chúng ta có thể thấy IntQueue struct chúng ta dùng kiểu integer cho cả kiểu biến của hàm addItem() và kiểu trả về cho hàm getItem(). Trong ví dụ này chúng ta đã thực thi Queue protocol bởi cách không tổng quát. Generics  trong swift cho phép chúng ta định nghĩa kiểu để dùng ở thời runtime hơn là thời điểm biên dịch. Chúng ta sẽ xem cách dùng của AT với Generic trong chương 4.

Tới đây chúng ta đã khám phá protocol một cách khá chi tiết, Bây giờ hãy cùng xem cách chúng ta dùng chúng trong thế giới thực, Trong phần tiếp theo chúng ta sẽ thấy cách dùng protocol để thực thi mẫu thiết kế delegation.

**Delegation**
Delegation được dùng nhiều trong Cocoa và Cocoa Touch. Mẫu Delegation khá đơn giản nhưng sức mạnh của mẫu này ở chổ một thực thể của một kiểu hành động trên đại diện của một thực thể khác. Một thực thể thực hiện việc uỷ quyền nắm giữ tham chiếu của thực thể uỷ quyền, và sau đó khi có một hành động xảy ra, thực thể thực hiện việc uỷ quyền gọi uỷ quyền để thực hiện chức năng, nghe khác là khó hiểu.
Mẫu này được thực thi trong swift bằng cách tạo một protocol cái mà đã định nghĩa những trách nhiệm uỷ quyền. Kiểu nào thoã mãn protocol này được xem là delegate, sẽ làm con của protocol này, đảm bảo rằng nó sẽ cung cấp những chức năng được định nghĩa trong protocol

Ví dụ chúng ta sẽ có một struct Person. struct này sẽ chứa đựng 2 thuộc tính là kiểu String là firstName, lastName. Nó cũng sẽ có một thuộc tính thứ 3 sẽ lưu trữ một thực thể uỷ quyền. Khi cả firstName và LastName được thiết lập, chúng ta sẽ gọi phương thức trong thực thể uỷ quyền cái sẽ hiện lên full name. Từ đây Person struct đang dc uỷ quyền trách nhiệm cho việc hiện tên tới thực thể khác, nó không cần biết hoặc quan tâm cách mà tên dc hiện như thế nào. Do đó tên đầy đủ có thể dc hiện trong console hoặc trong UILabel….

Chúng ta cùng bắt đầu nhìn phần định nghĩa trách nhiệm uỷ quyền.
```
protocol DisplayNameDelegate {
	func displayName(name: String)
}
```
Trong protocol DisplayNameDelegate chúng ta định nghĩa một phương thức rằng đối tượng dc uỷ quyền cần thực thi việc displayName(). Giả sử rằng trong phương thức này đối tượng uỷ quyền sẽ bằng cách nào đó để hiện được tên. Tuy nhiên nó không yêu cầu gì đặt biệt. Yêu cầu duy nhất đó là bên uỷ quyền phải thực hiện công việc này.
```
struct Person {
    var displayNameDelegate: DisplayNameDelegate
    var firstName = "" {
        didSet {
            displayNameDelegate.displayName(name: getFullName())
        }
    }
    
    var lastName = "" {
        didSet {
            displayNameDelegate.displayName(name: getFullName())
        }
    }
    
    init(displayNameDelegate: DisplayNameDelegate) {
        self.displayNameDelegate = displayNameDelegate
    }
    
    func getFullName() -> String {
        return "\(firstName) \(lastName)"
    }
    
}
```
Trong struct Person chúng ta có 3 thuộc tính tên là displayNameDelegate, firstName, lastName. thuộc tính displayNameDelegate chứa đựng một thực thể của kiểu uỷ quyền. thực thể này sẽ có trách nhiệm thể hiện full name khi giá trị của firstName hoặc lastName thay đồi

Bây giờ chúng ta sẽ tạo một kiểu dữ liệu thoã mãn với protocol DisplayNameDelegate. chúng ta sẽ đặt tên là MyDisplayNameDelegate:
```
struct MyDisplayNameDelegate: DisplayNameDelegate {
     func displayName(name: String) {
       print("Name: \(name)")
     }
} 
```
Trong ví dụ này việc chúng ta làm là in tên ra màn hình console. Bây giờ cùng xem cách chúng ta dùng delegate:
```
   var displayDelegate = MyDisplayNameDelegate()
   var person = Person(displayNameDelegate: displayDelegate)
   person.firstName = "Jon"
   person.lastName = "Hoffman"
```
Trong đoạn code trên chúng ta bắt đầu tạo một thực thể với kiểu MyDisplayNamedelegate và sau đó dùng thực thể này để tạo tạo một thực thể kiểu Person. Bây giờ khi chúng ta thiết lập giá trị cho thực thể person, bên uỷ quyền được sử dụng để in full name ra console.
Trong khi in tên ra màn hinh console có thể không thú vị, sức mạnh thực sự của mẫu uỷ quyền đến khi những ứng dụng  chúng ta muốn thay đổi hành vi. Có thể trong ứng dụng của chúng ta sẽ muốn gữi tên tới web service hoặc hiện nó tới 1 nơi nào đó trên màn hình hoặc thậm chí là bỏ qua nó. Để thay đổi hành vi này, chúng tôi đơn giản là tạo thêm một kiểu mới thoã mãn với protocol DisplayNameDelegate. Chúng ta sau đó dùng kiểu dữ liệu mới này khi chúng ta tạo một thực thể person.
Lợi thế khác chúng ta nhận từ việc dùng mẫu uỷ quyền đó là liên kết lỏng lẻo. Trong ví dụ của chúng ta, chúng ta đã phân chia logic ra khỏi phần hiển thị bằng cách dùng uỷ quyền để hiện tên bất cứ khi nào có sự thay đổi. Việc liên kết lỏng lẻo thúc đẩy việc phân chia trách nhiệm, nơi mà mõi kiểu sẽ chịu trách nhiệm cho những công việc được chỉ định. Việc này rất thuận tiện khi chuyển đổi những công việc khi những yêu cầu thay đổi, bởi vì chúng ta biết rằng những thay đổi sẽ xảy ra thường xuyên.
Cho đến đây trong chương này, chúng ta đã thấy rằng protocol từ một góc nhìn code, bây giờ cùng nhìn protocol từ khía cạnh thiết kế.

**Design with protocol.**

Với ngôn ngữ lập trình hướng protocol, chúng ta luôn luôn bắt đầu thiết kết của mình với protocol, nhưng cách nào để chúng ta thiết kế với protocol. Trong ngôn ngữ lập trình hướng đối tượng, chúng ta có superclass,  chứa đựng tất cả những yêu cầu cơ bản cho các lớp con. Protocol thiết kế khác 1 chút. Trong thế giới của lập trình hướng protocol, chúng ta có thể dùng protocol đê thay thế super class và nó thích hợp để phân tách những yêu cầu thành những phần nhỏ hơn, nhiều protocol riêng biệt tốt hơn là một protocol lớn nguyên khối. Trong phần này chúng ta sẽ thấy cách để phân chia những yêu cầu thành những phần nhỏ hơn, protocol rất riêng biệt và cách dùng protocol kết thừa và tổ hợp. Trong chương 3, Extension chúng tôi sẽ chỉ cho bạn cách để thêm tính năng cho tất cả các kiểu dữ liệu cùng thoã mãn một protocol bằng extension.

Những ví dụ trong chương này, chúng ta sẽ mô hình hoá cái gì đó. tôi thích tại Robots.
Có nhiều loại robots với nhiều cảm biến, vì vậy mô hình của chúng ta cần có khả năng để phát triển và xử lý tất cả những lựa chọn khác nhau. Từ đó tất cả robot có cùng kiểu di chuyển, chúng ta sẽ bắt đầu bằng cách tạo protocol định nghĩa những yêu cầu về di chuyển chúng ta sẽ gọi là RobotMovement:
```
protocol RobotMovement {
    func forward(speedPercent: Double)
    func reverse(speedPercent: Double)
    func left(speedPercent: Double)
    func right(speedPercent: Double)
    func stop()
}
```
 Trong protocol này chúng ta định nghĩa 5 phương thức để những kiểu nào muốn thoã mãn cần phải thực thi. Những phương thức này sẽ di chuyển robot tiến lên lùi lại, qua trái, phải, dừng. Protocol này sẽ phù hợp với nhu cầu của chúng ta nếu chúng ta chỉ muốn robot di chuyển trong không gian 2 chiều nhưng nếu robot phải bay. Để thực hiện mục tiêu này thì robot của chúng ta cũng phải di chuyển lên và xuống. Để thực hiện việc này chúng ta dùng protocol kế thừa để tạo một protocol mới bằng cách thêm một vài yêu cầu để có thể di chuyển trong không gian 3 chiều.
 ```
protocol RobotMovementThreeDimensions: RobotMovement {
    func up(speedPercent: Double)
    func down(speedPercent: Double)
}
```

 Chú ý rằng chúng ta dùng protocol kế thừa khi chúng ta tạo protocol này để kế thừa những yêu cầu gốc từ RobotMovement protocol. Việc này cho phép chúng ta dùng đa hình (polymorphism) như đã diễn tả trong chương này.  Điều này cho phép chúng ta dùng những thực thể của kiểu dữ liệu mà thoã mãn với một trong hai protocol trên để  thay thế cho nhau bằng cách sử dụng giao diện được cung cấp bởi RobotMovement protocol. Bây giờ chúng ta cần thêm một số cảm biến vào bản thiết kế của chúng ta. Chúng ta sẽ bắt đầu tạo protocol sensor cái mà tất cả nhữnng sensor sẽ phải kết thừa. Protocol này sẽ chứa 4 yêu cầu. đầu tiên là thuộc tính chỉ đọc định nghĩa tên và kiểu của sensor. Chúng ta sẽ cẩn một hàm khởi tạo để cho phép chúng ta tạo sensor và một phương thức sẽ dùng để thăm dò sensor
 ```
protocol Sensor {
    var sensorType: String {get}
    var sensorName: String {get set}
    init(sensorName: String)
    func pollSensor()
}
```
 Kiểu sensor sẽ được dùng để định nghĩa kiểu của sensor và sẽ chứa một chuỗi như DHT22 Environment sensor. Tên sensor sẽ giúp chúng ta phân biệt giữa các sensor và sẽ chứa chứa một chuỗi như Rear Environment Sensor. Phương thức pollSensor() sẽ dùng để thực hiện hành vi mặc định của sensor. Tổng quát phương thức này sẽ dùng để đọc tín hiệu một cách đều đặn.
 Bây giờ chúng ta sẽ tạo những yêu cầu cho những loại sensor được chỉ định. Theo như ví dụ cách chúng ta sẽ tạo những yêu cầu cho sensor môi trường
 ```
protocol EnvironmentSensor: Sensor {
    func currentTemperature() -> Double
    func currentHumidity() -> Double
}
```
 Protocol kết thừa những yêu cầu từ Sensor protocol và thêm vào 2 yêu cầu đặc biệt cho cảm biến môi trường. currentTemperature() sẽ trả về nhiệt độ gần nhất được đọc từ cảm biến và currentHumidity() trả về độ ẩm của lần đọc cuối cùng từ cảm biến. Phương thức pollSensor() từ Sensor Protocol sẽ dùng để đọc giá trị nhiệt độ và độ ẩm trong 1 khoản thời gian đều đặn. PollSensor() có thể chạy trên những thread riêng biệt
 tiếp theo tạo một cặp kiểu sensor
 ```
protocol RangeSensor: Sensor {
    func setRangeNotification(rangeCentimeter: Double, rangeNotification:() -> Void)
    func currentRange() -> Double
}

protocol DisplaySensor:Sensor {
    func displayMessage(message: String)
}

protocol WirelessSensor:Sensor {
    func setMessageReceiveNotification(messageNotification: (String) -> Void)
    func messageSend(message: String)
}
```
 Bạn sẽ chú ý rằng 2 protocol (RangeSensor và WirelessSensor) định nghĩa các phương thức thiết lập những thông báo (setRangeNotification, setMessageReceiveNotification). Những phương thức này chấp nhận closures trong biến của phương thức và sẽ dùng trong phương thức pollSensor để thông báo code robot ngay lập tức nếu có việc gì xảy ra. Với RangeSensor, closure sẽ gọi nếu robot ở trong một khoản cách nhất định của đối tượng, còn với WirelessSensor closure sẽ gọi nếu một message đến.
 
 2 ưu điểm chúng ta nhận dc từ thiết kế hướng protocol. Đầu tiên mõi protocol chỉ chứa những yêu cầu đặt biệt cần thiết cho kiểu cảm biến đó. Thứ hai là chúng ta có thể dùng protocol tổ hợp để cho phép một kiểu dữ liệu đơn có thể thoã mãn tới nhiều protocol. Trong ví dụ. Nếu chúng ta có Display sensor, chúng ta sẽ tạo một kiểu để thoã mãn với cả DisplaySensor và WirelessSensor protocol. Có nhiều loại sensor khác nhau, tuy nhiên việc này sẽ cho chúng ta một sự khởi đầu tốt cho con robot của chúng ta.
 Bây giờ chúng ta sẽ tạo một protocol để định nghĩa kiểu robot
 ```
protocol Robot {
    var name: String {get set}
    var robotMovement: RobotMovement {get set}
    var sensors: [Sensor] {get}
    
    init(name: String, robotMovement: RobotMovement)
    func addSensor(sensor:Sensor)
    func pollSensor()
}
```
 Đây là protocol định nghĩa 3 thuộc tính, 1 hàm khởi tạo và hai phuơng thức sẽ cần để thực thi bởi bất cứ kiểu dữ liệu nào muốn thoã mãn protocol này. Những yêu cầu này sẽ cho chúng ta những chức năng cơ bản cần thiết cho robot
 Có thể có chút bối rối trong việc suy nghĩ về tất cả những protocol này Đặc biệt nếu chúng ta dùng một vài superclass. Nó thường giúp ta có bản đồ cơ bản về protocol của mình
 

 ![](https://images.viblo.asia/5fb7dbf3-5b7d-416e-b969-4226fb4ded3f.png)

 Tấm hình này cho chúng ta khái niệm cơ bản về mô hình thiết kế hướng protocol. Bạn sẽ chúng ý rằng mõi protocol định nghĩa những yêu cầu riêng biệt cho từng loại thiết bị. Trong chương 6 chúng ta sẽ đi vào chi tiết hơn cách để mô hình những yêu cầu của chúng ta với protocol.
 
 Trong phần này chúng ta dùng protocol để định nghĩa những yêu cầu cho những thành phần của robot.
 Bây giờ đến lượt bạn, bỏ ít thời gian để xem nếu bạn có thể tạo một phần thực thi của Robot protocol mà không tạo bất cứ phần thực thi cứng ngắt nào của những protocol khác. Điểm mấu chốt để hiểu protocol là hiểu cách để dùng chúng mà ko cần phần thực thi thoã mãn chúng.
 Tiếp theo chúng ta sẽ xem cách apple dùng protocol trong thư viện của họ
 Apple dùng protocols một cách chuyên sâu trong thư viện swift của họ. Tài nguyên tốt nhất để thấy điều này là trang http://swiftdoc.org
 Để xem cách apple dùng protocol hãy cùng xem kiểu Dictionary. Kiểu này rất phổ biến nhưng cũng là một trong những kiểu có cấu trúc protocol đơn giản.
 
 
 ![](https://images.viblo.asia/11a21608-73d1-4757-9fad-c06f67e10cae.png)
 
 Như chúng ta đã thấy mô hình Dictionary thoã mãn 5 kiểu protocol, và kiểu collection protocol kết thừa từ Sequence Protocol.
 
**Tổng kết**

Trong khi Protocol tự nó thì không có gì hấp dẫn, nhưng chúng thật sự khá hữu ích. Như chúng ta đã thấy trong chương này, chúng ta có thể dùng chúng để tạo những yêu cầu đặt biệt. Chúng ta có dùng protocol kết thừa, tổ hợp, để tạo protocol phân cấp. Chúng ta cũng thấy cách để thực thi mẫu delegation với protocol
Cuối chương này đã trình bày cách chúng ta mô hình hoá một robot với những cảm biến bằng cách dùng protocol và cách apple dùng protocol trong thư viện của họ
Trong chương 3 Extension chúng ta sẽ xem cách chúng ta có thể dùng protocol extension để thêm tính năng cho kiểu dữ liệu thoã mãn protocol nhưng trước đó chúng ta tìm kiếm lựa chọn của chúng ta.

*Còn tiếp chương 2, hẹn các bạn vào tối thứ 2 hàng tuần*