**Command pattern** là một pattern rất đơn giản cho phép chúng ta chuyển lệnh vào các objects mà sẽ thực hiện đúng danh sách các chức năng tùy thuộc vào objects, mà không cần phải sửa đổi các objects chính nó (nó sẽ là một điều không vui nếu chúng ta phải yêu cầu các developers của hai ứng dụng thay đổi codebase của họ).

Điều này mang lại cho bạn sự linh hoạt đáng kinh ngạc. Trong bài viết này, chúng ta sẽ xem xét lý thuyết về **Command pattern** sau đó chúng ta sẽ theo dõi với một ví dụ. Chúng ta cũng sẽ thấy cách sử dụng pattern này để thêm một số chức năng thú vị, lệnh và giao dịch có thể hoàn tác.

<br>

#### Command Pattern 

Command Pattern cung cấp một cách để bạn gói các loại khác nhau của các đối tượng trong một giao diện tương tự. Bằng cách này bạn có thể tách đối tượng sử dụng chúng cho phép một class để sử dụng nhiều loại khác nhau của các đối tượng. Đây là định nghĩa chính thức:

> Command pattern đóng gói một yêu cầu như là một đối tượng, do đó cho phép bạn parameterise clients với các yêu cầu khác nhau, queue hoặc log requests, và hỗ trợ các hoạt động undoable.

Hãy xem biểu đồ dưới đây.

<br>

#### The Actors on the Stage

Đây là class diagram của pattern:

![](https://images.viblo.asia/f5312f7c-391b-4d50-aaca-e9458650d088.png)

* **Receiver** là class đó là làm công việc thực tế. Trong project của bạn class này sẽ được networking request, hoạt động cơ sở dữ liệu của bạn, mảnh của business logic, một thuật toán phân loại phức tạp... Nói cách khác, class của bạn, cụ thể cho dự án của bạn.
* **Command** là một protocol mà sẽ có chỉ là một số ít các chức năng. Trong ví dụ của chúng tôi, chúng tôi sẽ chỉ có hai chức năng: execute và undo. Những lệnh này sẽ được xử lý bởi các Invoker.
* **Concrete Command** là một class mà phù hợp với protocol 'Command' và nó sẽ mất một trường hợp của người nhận trong initialiser. Khi Invoker gọi 'execute' chức năng class này sẽ biết phải làm gì với người nhận. Class này cũng sẽ biết làm thế nào để thực hiện một hoạt động Undo.
* **Invoker** có một công việc đơn giản của kêu gọi các 'execute' chức năng trên các commands. Thông thường các Invoker sẽ có một mảng của các command objects và nó sẽ quyết định khi thực hiện các lệnh. Ví dụ, nó sẽ thực hiện Batch processing trong Invoker như chúng ta sẽ xem sau. Các Invoker cũng có thể gọi là 'Undo' nếu lệnh thất bại. Một Invoker có thể được sử dụng bởi nhiều clients khác nhau.
* **Client** là một class mà sẽ tạo ra các đối tượng concrete command và vượt qua nó vào Invoker. Tùy thuộc vào trường hợp sử dụng của bạn, client có thể có một tham chiếu đến các Invoker và nó có thể nhận được thông báo khi hàng đợi/lệnh được xử lý.

<br>

Hãy kiểm tra một sơ đồ để hiểu rõ hơn về các sự kiện và timings trong mô hình.


<br>

#### The Chain of Events

Kiểm tra sequence diagram:

![](https://images.viblo.asia/268cd891-81a8-4d97-bc45-4be3559f18c3.png)

1. Bắt đầu với 'Aclient' chịu trách nhiệm cho việc tạo ra các command objects. Client tạo ra một instance của một object mà phù hợp với protocol 'Command' và có một tham chiếu đến người nhận.
2. Sau đó, client sẽ vượt qua lệnh này để Invoker. Nói chung, tại thời điểm này công việc của client được thực hiện.
3. Sau một khoảng thời gian, các Invoker sẽ gọi 'execute' chức năng trên lệnh. Khi điều này xảy ra là hoàn toàn lên đến các Invoker. Nó có thể xảy ra ngay lập tức sau khi client thêm lệnh cho các Invoker, hoặc sau một thời gian. Trong ví dụ của chúng tôi, chúng tôi sẽ xử lý 5 lệnh tại một thời điểm. Chỉ để minh họa cho điểm này.
4. Khi Invoker gọi 'execute' lệnh các command object sẽ bắt đầu chức năng gọi trên client. Bạn có thể có nhiều loại khác nhau của lệnh và họ sẽ biết chính xác những gì để làm với client. Tất nhiên, khi client nhận được lệnh Stuff sẽ xảy ra. 

Chúng ta sẽ đến với Example để hiểu rõ hơn.

<br>

#### Example

Chúng ta sẽ xem làm thế nào tất cả điều này phù hợp với nhau trên một ví dụ đơn giản. Trong ví dụ của chúng ta, chúng ta sẽ tiết kiệm một chiếc xe để phụ trợ, cơ sở dữ liệu, đăng nhập vào hệ thống tập tin và chứng minh cách sử dụng một giao dịch. Chúng ta sẽ tập trung vào việc sử dụng các pattern ở đây, do đó, các phương pháp không thực sự lưu bất cứ điều gì bất kỳ nơi nào, họ chỉ chứng minh việc sử dụng các patterns. Hãy bắt đầu...

#### Protocols

protocol chính sẽ là:

```
mand ProtocolSwift

protocol Command {
    @discardableResult func execute() -> Result
    @discardableResult func undo() -> Result
}
```

và invofer:

```

protocol Invoker {
    func addCommand(command: Command)
}
```

<br>

#### Receivers

Trong sơ đồ của chúng tôi các class được gọi là 'Receivers'. Trong thực tế, đây sẽ là các class hiện tại của bạn trong các Project của bạn. Ví dụ, một trong những receivers của bạn có thể giống như sau:

```
enum VehicleAPIError: Error {
    case APIError
}

class VehicleAPI
{
    private let vehicle: Vehicle
    
    init(vehicle: Vehicle) {
        self.vehicle = vehicle
    }
    
    func sendToBackend() -> Result {
        print("Sending the vehicle '\(vehicle.name)' to backend!")
        
        // Simulate failure
        let success = false //Bool.random
        
        if success == true {
            print("Success")
            return .success
        } else {
            print("Failure")
            return .failure(VehicleAPIError.APIError)
        }
    }
    
    func deleteFromBackend() -> Result {
        print("Deleted the vehicle '\(vehicle.name)' from the backend")
        return .success
    }
}
```

Làm thế nào bạn xây dựng chúng sẽ được hoàn toàn vào bạn bởi vì họ có chứa rất nhiều logic tùy chỉnh của bạn. Trong ví dụ này, chúng tôi chỉ cần printing công cụ để console và chúng tôi có một  bool switch để đơn giản chúng tôi có thể mô phỏng API failures.

<br>

#### Commands

Các lệnh sẽ wrap receivers của bạn, hầu hết trong số đó sẽ được thực sự đơn giản và sẽ chỉ chuyển tiếp các phương pháp gọi đến client:

Thêm phương tiện API CommandSwift

```
class AddVehicleAPICommand: Command
{
    private var vehicleAPI: VehicleAPI
    
    init(api: VehicleAPI) {
        self.vehicleAPI = api
    }
    
    func execute() -> Result {
        return self.vehicleAPI.sendToBackend()
    }
    
    func undo() -> Result {
        return self.vehicleAPI.deleteFromBackend()
    }
}
```

Bây giờ mọi thứ đang nhận được thú vị. Một lệnh đơn giản như một ở trên là tự giải thích, nhưng hãy tưởng tượng có một lệnh macro. Một lệnh mà phải mất trong một loạt các lệnh và thực hiện tất cả. Hoặc, thậm chí tốt hơn, một lệnh giao dịch như thế này một:

```
class TransactionCommand: Command
{
    private let commands: [Command]
    private var finishedCommands: [Command] = []
    
    init(commands: [Command]) {
        self.commands = commands
    }
    
    func execute() -> Result {
        
        print("Transaction started")
        for command in commands {
            let result = command.execute()
            if result == .success {
                finishedCommands.append(command)
            } else {
                print("Transaction failed: \(result)")
                finishedCommands.forEach { $0.undo() }
                finishedCommands.removeAll()
                return .failure(TransactionError.TransactionFailed)
            }
        }
        
        return .success
    }
    
    func undo() -> Result {
        return commands.reduce(Result.success, { (result, command) -> Result in
            guard result == .success else { return result }
            return command.undo()
        })
    }
}
```

Lệnh này sẽ có một loạt các lệnh để thực hiện. Khi bạn gọi 'execute' trên nó, nó sẽ bắt đầu thực hiện chúng trong trình tự. Nếu một lệnh không thành công nó sẽ gọi hoàn tác trên tất cả các lệnh đã thực hiện trước đó. Điều này sẽ đóng lại hệ thống để một state nó đã được ở trước khi nó bắt đầu thực hiện các giao dịch. Tất cả điều này phụ thuộc vào việc thực hiện các chức năng 'Undo'. Nếu bạn không thực hiện chúng, sau đó hệ thống không thể được đóng trở lại, rõ ràng.

Không phải tất cả các lệnh cần phải thực hiện chức năng Undo:

```
class LogVehicleCommand: Command
{
    private let logger: VehicleLogger
    
    init(logger: VehicleLogger) {
        self.logger = logger
    }
    
    func execute() -> Result {
        self.logger.appendToLogfile()
        return .success
    }
    
    func undo() -> Result {
        print("Cannot undo a logging operation")
        return .success
    }
}
```

Trong lệnh Logger ở trên chúng tôi chỉ quan tâm đến việc tạo ra một audit log. Vì vậy, chúng tôi chắc chắn không muốn xóa bất cứ điều gì từ các bản ghi bằng cách thực hiện chức năng 'Undo'.

<br>

#### Invoker

Lệnh trên sẽ không thực sự làm nhiều. Thực ra, những lợi ích thực sự duy nhất trong code chúng ta đã viết cho đến nay là lệnh giao dịch và khả năng dễ dàng quay trở lại. Điều này mang lại cho chúng ta để Invoker. Invoker là trung tâm của mô hình. Đây là class mà sẽ có trong các lệnh và thực hiện chúng khi bao giờ nó thấy phù hợp. Bạn có thể có một số logic rất phức tạp trong các Invoker. Bạn có thể chạy các lệnh của bạn trong nối tiếp hoặc song song. Nếu bạn đang truy cập tài nguyên được chia sẻ giống như tệp, bạn có thể điều khiển truy nhập tới nó bằng cách gọi. Hãy nói rằng bạn muốn ứng dụng của bạn để có hiệu quả truy cập vào mạng, bạn có thể chạy lệnh của bạn trong lô. Chúng tôi sẽ chứng minh cách tiếp cận này. Kiểm tra hàng loạt của chúng tôi Invoker class:

```
class BatchInvoker: Invoker
{
    private enum Constants {
        static let BatchSize = 5
    }
    
    private var toBeExecuted: [Command] = [] {
        didSet {
            if toBeExecuted.count >= Constants.BatchSize {
                executeCommands()
            }
        }
    }
    
    private var finished: [Command] = []
    private var failed: [Command] = []
    
    func addCommand(command: Command) {
        toBeExecuted.append(command)
    }
    
    private func executeCommands() {
        toBeExecuted.forEach { (command) in
            if command.execute() == .success {
                finished.append(command)
            } else {
                failed.append(command)
            }
        }
        toBeExecuted.removeAll()
    }
}
```

Như đã thấy, class là khá đơn giản. Nó sẽ lưu trữ tất cả các lệnh và ngay sau khi nó có 5 điều trong số chúng sẽ thực hiện. Ngoài ra, nó sẽ tiết kiệm được hoàn thành và thất bại lệnh nó mảng tương ứng. Bạn có thể quyết định cho chính mình những gì tốt nhất cho bạn và thực hiện logic tùy chỉnh của riêng bạn ở đây.

<br>

#### Client


Và, cuối cùng, Client. Điều này có thể dễ dàng được điều khiển của bạn, view controller của bạn, hoặc một số class khác. Nó phụ thuộc vào architecture bạn đang sử dụng. Trong bối cảnh này là một class đó là bằng cách sử dụng các command pattern chúng ta đang thảo luận ở đây. Client cho project Demo của chúng ta trông như thế này:

```
class VehicleClient
{
    // This would be your normal controller, you'll have your business logic here.
    // Among other things this class will create your commands and pass them to the invoker.
    
    private let invoker = BatchInvoker()
    
    func startTesting() {
        
        // Just sending a vehicle to the API
        let vehicle = ATVehicle(id: 1, name: "first vehicle")
        let apiReceiver = VehicleAPI(vehicle: vehicle)
        let addVehicleCommand = AddVehicleAPICommand(api: apiReceiver)
        invoker.addCommand(command: addVehicleCommand)
        
        let dbReceiver = VehicleDAO(vehicle: vehicle)
        let saveVehicleCommand = SaveVehicleToDBCommand(dao: dbReceiver)
        invoker.addCommand(command: saveVehicleCommand)
        
        let logReceiver = VehicleLogger(vehicle: vehicle)
        let logVehicleCommand = LogVehicleCommand(logger: logReceiver)
        invoker.addCommand(command: logVehicleCommand)
        
        let addVehicleTransactionCommand = TransactionCommand(commands:
            [
                LogVehicleCommand(logger: logReceiver),
                SaveVehicleToDBCommand(dao: dbReceiver),
                AddVehicleAPICommand(api: apiReceiver),
                LogVehicleCommand(logger: logReceiver)
            ])
        invoker.addCommand(command: addVehicleTransactionCommand)
        
        let anotherLogReceiver = VehicleLogger(vehicle: ATVehicle(id: 2, name: "Another Vehicle"))
        let secondLogCommand = LogVehicleCommand(logger: anotherLogReceiver)
        invoker.addCommand(command: secondLogCommand)
    }
}
```


Client của chúng ta có một tài liệu tham khảo để Invoker. Trong trường hợp của bạn này có thể khác nhau. Invoker của bạn có thể là một Singleton, ví dụ. Lý tưởng nhất là bạn sẽ vượt qua một tham chiếu đến Invoker của bạn trong initialiser của client. Bạn có thể thấy rằng chúng tôi chỉ có một chức năng và chúng tôi đang sử dụng nó để thử nghiệm. Chúng tôi đang tạo 5 lệnh trong phương pháp thử nghiệm, một trong số chúng là một lệnh giao dịch. Chúng tôi chỉ thêm các lệnh để Invoker, chúng tôi không kiểm soát được thực hiện. Đó là khá nhiều nếu cho client. Hãy thử nghiệm nó ra.

#### Test Drive

Nếu chúng ta chỉ cần tạo ra một thể hiện của client của chúng ta và chạy phương pháp thử nghiệm đầu ra của chúng ta sẽ giống như thế này:

```

Sending the vehicle 'first vehicle' to backend!
Success
Saved the vehicle 'first vehicle' to DB!
This class will append the logfile with a vehicle 'first vehicle'
Transaction started
This class will append the logfile with a vehicle 'first vehicle'
Saved the vehicle 'first vehicle' to DB!
Sending the vehicle 'first vehicle' to backend!
Success
This class will append the logfile with a vehicle 'first vehicle'
This class will append the logfile with a vehicle 'Another Vehicle'
```

Nhưng nếu chúng ta mô phỏng một API failure bằng cách đặt flag trong lớp 'VehicleAPI' đầu ra là bit khác nhau:

```

Sending the vehicle 'first vehicle' to backend!
Failure
Saved the vehicle 'first vehicle' to DB!
This class will append the logfile with a vehicle 'first vehicle'
Transaction started
This class will append the logfile with a vehicle 'first vehicle'
Saved the vehicle 'first vehicle' to DB!
Sending the vehicle 'first vehicle' to backend!
Failure
Transaction failed: failure(ATCommandPattern.VehicleAPIError.APIError)
Cannot undo a logging operation
Deleted the vehicle 'first vehicle' from database
This class will append the logfile with a vehicle 'Another Vehicle'
```

Ở đây chúng ta có thể thấy các giao dịch đang được đóng trở lại do API failure.

#### Conclusion

Các **Command Pattern** thường được sử dụng để xây dựng các menu, đó là một trong những Usages đầu tiên, trên thực tế. Nhưng tôi tin rằng sức mạnh lớn nhất của nó ngày hôm nay là dễ thực hiện một cơ chế giao dịch. Thực hiện các giao dịch là nguyên tử hoạt động là đơn giản, nhưng với pattern này nó là child’s play.

Bài viết này được dịch theo [bài viết cùng tên của tác giả Dejan Agostini](https://agostini.tech/2018/06/03/design-patterns-in-swift-command-pattern/). Và source code tham khảo tại [đây](https://github.com/agostini-tech/ATCommandPattern).