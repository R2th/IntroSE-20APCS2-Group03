Iterator pattern là một lựa chọn hoàn hảo cho bạn khi bạn cần duyệt qua bộ sưu tập các đối tượng. Nó khá đơn giản và nó được sử dụng rộng rãi đến mức hầu hết các loại bộ sưu tập đều thực hiện pattern này trong những library tiêu chuẩn. Trong bài viết này, sẽ triển khai iterator pattern. Điều này cũng sẽ giúp bạn hiểu cách các trình vòng lặp tích hợp hoạt động và sẽ cho phép bạn xây dựng các trình vòng lặp tùy chỉnh nếu các trình vòng lặp hệ thống không đủ cho nhu cầu của bạn.

### Iterator Pattern

 Như tên cho thấy, Pattern cho phép bạn lặp lại qua một bộ sưu tập các phần tử:
 
>  Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

<br>

Đây là tất cả các mô hình đang làm. Nó cung cấp cho bạn một giao diện cho phép bạn lặp lại các bộ sưu tập bất kể họ đã thực hiện như thế nào trong background. Hãy tưởng tượng bạn có một lớp tùy chỉnh chứa một bộ sưu tập các phương tiện, nếu lớp của bạn thực hiện mô hình này thì nó sẽ không quan trọng đối với các lớp khác về cách bạn lưu giữ những chiếc xe này. Bạn có thể lưu trữ chúng trong một mảng, từ điển, danh sách được liên kết, tùy thuộc vào bạn. Chúng tôi sẽ thấy điều này trong ví dụ sau.

### Our Example

Trong ví dụ, chúng tôi sẽ sử dụng bốn lớp khác nhau và lưu trữ bốn bộ sưu tập phương tiện khác nhau, Array ,  dictionary, linked list and a wrapper object. Chúng tôi sẽ có một class sẽ in ra tất cả các phương tiện từ các lớp này. Hãy để xem nó trên sơ đồ:

![](https://images.viblo.asia/0d3d8a45-0fbe-4e2a-aed0-34df0d684180.png)

Phương tiện của chúng tôi sẽ sử dụng ‘VehicleQueue,‘ Factory, ‘ParkingLot' và ‘Garage' classes. Mỗi lớp sẽ lưu trữ phương tiện trong một loại bộ sưu tập khác nhau. Từ quan điểm của ‘VehiclesInventory', nó đã giành chiến thắng trong vấn đề bộ sưu tập cơ bản là gì. Nó đã thắng được nhận thức về các chi tiết thực hiện.

<br>
Để làm được điều này, chúng tôi sẽ cần bốn trình lặp khác nhau, một lần cho mỗi loại bộ sưu tập mà chúng tôi sẽ sử dụng.

### VehicleIterator

Đây là một protocol đơn giản mà các trình vòng lặp tùy chỉnh của chúng tôi sẽ thực hiện:
```
protocol VehicleIterator
{
    func next() -> Vehicle?
}
```

Như bạn có thể thấy, protocol chỉ có một hàm sẽ trả về phần tử tiếp theo trong bộ sưu tập, hoặc return nil, nếu không có thêm phần tử nào để trả về.

<br>

Chúng tôi sẽ thực hiện một trình vòng lặp tùy chỉnh cho từng loại bộ sưu tập mà chúng tôi sẽ sử dụng. Trình lặp mảng như thế này:


```
class ArrayVehicleIterator: VehicleIterator
{
    private var cursor: Int?
    private let items: [Vehicle]
    init(_ items: [Vehicle]) {
        self.items = items
    }
    
    func next() -> Vehicle? {
        if let idx = getNextCursor(cursor) {
            self.cursor = idx
            return self.items[idx]
        }
        return nil
    }
    
    private func getNextCursor(_ cursor: Int?) -> Int? {
        if var idx = cursor, idx < items.count - 1 {
            idx += 1
            return idx
        } else if cursor == nil, items.count > 0 {
            return 0
        } else {
            return nil
        }
    }
}
```

Chúng ta khởi tạo trình vòng lặp này với một loạt các phương tiện và chúng ta giữ một con trỏ tới phần tử hiện tại trong mảng. Mỗi lệnh gọi hàm ’next' sẽ di chuyển con trỏ theo một. Và trước khi bạn nói điều đó, chúng tôi có thể đã thực hiện điều này với khái quát, nhưng tôi muốn giữ ví dụ đơn giản nhất có thể và tập trung vào chính pattern đó.

<br>

Hãy cùng nhìn vào một vòng lặp khác. linked list iterator:


```
class LinkedListVehicleIterator: VehicleIterator
{
    private var cursor: LinkedList<Vehicle>?
    private let items: LinkedList<Vehicle>
    init(_ items: LinkedList<Vehicle>) {
        self.items = items
        self.cursor = self.items
    }
    
    func next() -> Vehicle? {
        let vehicle = self.cursor?.item
        self.cursor = self.cursor?.nextItem
        return vehicle
    }
}
```

Thực hiện Linked list rõ ràng là hoàn toàn khác với thực hiện mảng. Chúng ta vẫn cần giữ một tham chiếu đến phần tử hiện tại (cursor) nhưng nó đơn giản hơn nhiều.

```
class ManufacturedVehicleIterator: ArrayVehicleIterator
{
    init(_ items: [ManufacturedVehicle]) {
        let items: [Vehicle] = items.map { $0.vehicle }
        super.init(items)
    }
}
```

<br>

‘ManufacturedVehicleIterator’ đang phân lớp ‘ArrayVehicleIterator', và trong công cụ xây dựng, nó trích xuất các phương tiện ra khỏi đối tượng có một phương tiện là một trong những đặc tính của nó. Chúng tôi chắc chắn có thể thực hiện điều này mà không cần phân lớp ‘ArrayVehicleIterator', giữ một mảng bên trong ‘ManufacturedVehicles’ và trả lại thuộc tính xe của từng thành phần mảng khi gọi hàm ‘tiếp theo ‘next’. Đây chỉ đơn giản là một cách khác để thực hiện nó.

### Iterable

Iterable là một protocol rất đơn giản sẽ chỉ có một chức năng để tạo các trình vòng lặp:

```
protocol Iterable {
    func makeIterator() -> VehicleIterator
}
```

Các classes có chứa logic nghiệp vụ của bạn sẽ thực hiện giao thức này. Để tranh luận, hãy nói với chúng tôi rằng chúng tôi có một class có tên ‘Factory', mà trách nhiệm sản xuất xe trên dây chuyền lắp ráp. Class đó có thể  như thế này:

```
class Factory: Iterable
{
    private let items: [ManufacturedVehicle]
    init(_ items: [ManufacturedVehicle]) {
        self.items = items
    }
    
    // This class could be responsible for producing vehicles, for example...
    
    func makeIterator() -> VehicleIterator {
        return ManufacturedVehicleIterator(items)
    }
}
```

Class này có một mảng các đối tượng ‘ManufacturedVehicle’, một trong những thuộc tính của đối tượng là phương tiện thực tế mà chúng ta quan tâm. . Người gọi chức năng này đã giành chiến thắng và biết được trình lặp mà nó sử dụng, và nó đã giành được sự quan tâm.

<br>

Một triển khai giả tưởng khác có thể sử dụng một từ điển để lưu trữ các phương tiện nội bộ. Hãy gọi cho cái này 'Garage':

```
class Garage: Iterable
{
    private let cars: [String : Vehicle]
    init(_ cars: [String : Vehicle]) {
        self.cars = cars
    }
    
    // Might be your personal garage, might be your neighbours'... This is another class that will contain your business logic...
    
    func makeIterator() -> VehicleIterator {
        return DictionaryVehicleIterator(cars)
    }
}

```

Ở đây chúng ta thấy rằng chúng tôi đã trả lại một trình lặp tùy chỉnh khác, trình dictionary iterator.

### Using the Iterators

Sử dụng các trình vòng lặp thực sự khá đơn giản. Chúng tôi có một lớp gọi là 'VehiclesInventory’ mà chúng tôi sử dụng để chứng minh điều này:

```
class VehiclesInventory
{
    // Create the test objects... Usually you would inject these in the constructor.
    private let queue = VehicleQueue(VehiclesFactory.getVehiclesList())
    private let factory = Factory(VehiclesFactory.getFactoryVehicles())
    private let parking = ParkingLot(VehiclesFactory.getVehiclesArray())
    private let garage = Garage(VehiclesFactory.getVehiclesDictionary())
    
    func printVehiclesInventory() {
        print("==========QUEUE============")
        printVehicles(iterator: queue.makeIterator())
        print("==========FACTORY==========")
        printVehicles(iterator: factory.makeIterator())
        print("==========PARKING==========")
        printVehicles(iterator: parking.makeIterator())
        print("==========GARAGE===========")
        printVehicles(iterator: garage.makeIterator())
    }
    
    private func printVehicles(iterator: VehicleIterator) {
        while let item = iterator.next() {
            print(item.name)
        }
    }
}
```

Class này không có ý tưởng làm thế nào các phương tiện đang được lưu trữ trong mỗi lớp tương ứng. Và nó không nên quan tâm. Hãy tưởng tượng nếu chúng ta thể hiện việc triển khai của chúng ta và thay vì trả về một trình vòng lặp từ lớp ‘Garage', chúng ta đã trả lại từ điển Nếu chúng ta thay đổi từ điển đó thành một mảng, chúng ta sẽ có hai lớp để sửa đổi thay vì một lớp. Nó tốt nhất để giữ cho bản thân tiếp xúc ít nhất có thể. Chúng ta đều biết việc giới thiệu các lỗi dễ dàng như thế nào khi sửa đổi mã hiện có. Bằng cách này, chúng tôi chỉ đơn giản là đảm bảo rằng chúng tôi sửa đổi càng ít code càng tốt trong tương lai.

### Testing It Out

Trong đoạn code trên, bạn có thể thấy rằng chúng tôi đang sử dụng một nhà máy để tạo ra các bộ sưu tập của mình. Đây là nhà máy chúng tôi sử dụng:

```
class VehiclesFactory
{
    static func getVehiclesArray() -> [Vehicle] {
        return [
            VehicleItem(id: 0, name: "Red Car", make: "Ford", model: "Mondeo", registration: "123aa4"),
            VehicleItem(id: 1, name: "Blue Car", make: "Ford", model: "Fiesta", registration: "432dd"),
            VehicleItem(id: 2, name: "Green Car", make: "Nissan", model: "Leaf", registration: "hhg654"),
            VehicleItem(id: 3, name: "Rusty Car", make: "Ford", model: "T", registration: "855tes"),
            VehicleItem(id: 4, name: "Red Pickup", make: "Toyota", model: "Hilux", registration: "kjjg665"),
            VehicleItem(id: 5, name: "Jude's Candy Van", make: "Toyota", model: "Hiace", registration: "3321jjg"),
        ]
    }
    
    static func getFactoryVehicles() -> [ManufacturedVehicle] {
        return [
            FactoryVehicle(date: Date(), assemblyLine: "Detroid", passedQA: true, qaPerformedBy: "Jude", vehicle: VehicleItem(id: 9, name: "New Shiny Car", make: "GM", model: "Top Secret", registration: "xx4433")),
            FactoryVehicle(date: Date(timeIntervalSinceNow: -1000), assemblyLine: "Mexico", passedQA: true, qaPerformedBy: "Nenad", vehicle: VehicleItem(id: 88, name: "Fiery Red", make: "Opel", model: "Astra", registration: "55422")),
            FactoryVehicle(date: Date(timeIntervalSinceNow: -4444), assemblyLine: "Germany", passedQA: false, qaPerformedBy: "Hans", vehicle: VehicleItem(id: 66, name: "Space Car", make: "BMW", model: "X0", registration: "Mars-1"))
        ]
    }
    
    static func getVehiclesList() -> LinkedList<Vehicle> {
        let head = LinkedList<Vehicle>(VehicleItem(id: 44, name: "Pac Man", make: "Mini", model: "Cooper", registration: "887744da"))
        head.nextItem = LinkedList<Vehicle>(VehicleItem(id: 33, name: "Little Thumper", make: "Rolls Royce", model: "Royal", registration: "blue1"))
        head.nextItem?.nextItem = LinkedList<Vehicle>(VehicleItem(id: 90, name: "Green Beast", make: "Ford", model: "Mustang", registration: "4213245"))
        head.nextItem?.nextItem?.nextItem = LinkedList<Vehicle>(VehicleItem(id: 77, name: "Big Blue", make: "Smart", model: "forTwo", registration: "09876"))
        return head
    }
    
    static func getVehiclesDictionary() -> [String : Vehicle] {
        return [
            "slot 1" : VehicleItem(id: 55, name: "My Car", make: "Lada", model: "Niva", registration: "554433"),
            "slot 2" : VehicleItem(id: 66, name: "Not My Car", make: "Lamborghini", model: "Diablo", registration: "RichInSpirit")
        ]
    }
}
```

Từ ‘AppDelegate', chúng tôi chỉ đơn giản gọi các hàm 'printVehiclesInventory' và đầu ra trông như thế này:

```
==========QUEUE============
Pac Man
Little Thumper
Green Beast
Big Blue
==========FACTORY==========
New Shiny Car
Fiery Red
Space Car
==========PARKING==========
Red Car
Blue Car
Green Car
Rusty Car
Red Pickup
Jude's Candy Van
==========GARAGE===========
Not My Car
My Car
```

### Conclusion

Như  đã đề cập trước đây, pattern này rất phổ biến và hữu ích đến nỗi nó là một phần của thư viện tiêu chuẩn nhanh chóng. Kiểm tra '[Sequence](https://developer.apple.com/documentation/swift/sequence)' và '[IteratorProtocol](https://developer.apple.com/documentation/swift/iteratorprotocol)' để tìm hiểu thêm. Vì vậy, nếu bạn sử dụng các kiểu dựng sẵn, bạn chỉ cần sử dụng các trình vòng lặp đó. Nhưng nếu bạn cần xây dựng riêng của mình, hoặc chỉ đơn giản là muốn biết các trình vòng lặp tích hợp hoạt động như thế nào, bây giờ bạn đã biết cách.

Bài viết được dịch theo [bài viết](https://agostini.tech/2018/06/10/design-patterns-in-swift-iterator-pattern/) cùng tên của tác giả Dejan Agostini . Và source code ứng dụng đầy đủ tại [GitLab](https://gitlab.com/agostini.tech/ATIteratorPattern).