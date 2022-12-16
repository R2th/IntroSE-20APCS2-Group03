# Giới thiệu
Trước khi bắt đầu bằng protocol-oriented, ta đã quen thuộc với lập trình hướng đối tượng. Lập trình hướng đối tượng được dựa trên ý tưởng xoay quanh các Object. Điều này có nhiều ưu điểm như:
-Tính đóng gói
-Tính kế thừa
-Tính đa hình
-Tính trừu tượng .v.v.v.

Tuy nhiên, do class là kiểu reference type nên sẽ gây ra các bất cập như

- Retain cycle 
- Khó quản lí
- Tính trừu tượng không cao.

Vì vậy họ thay thế họ ưu tiên sử dụng value type hơn là reference type. Ta đã biết trong swift một số custom Type kiểu value type là struct, enum. Tuy nhiên, các kiểu value type thường không có tính chất kế thừa, đó chính là nguyên nhân protocol ra đời, điều này giúp các kiểu value type có được các thuật tính kế thừa như trong OOP. Ngoài ra protocol cũng cho phép áp dụng đa kế thừa cho các value type, giúp cho việc sử dụng trở nên linh hoạt hơn. Và người ta gọi việc lập trình với protocol là Protocol-oriented programming (POP)

- Tiếp theo mình sẽ trình bày ví dụ so sánh giữa POP và OOP

## Ví dụ
Đặt vấn đề: Cho thực thể vihicle trong đó có 3 loại land, air, sea. Trong đó một số thực thể con có thể kế thừa nhiều loại như Amphibious vừa là land và vừa là air
![](https://images.viblo.asia/5158ca97-a84e-4af4-8714-1674c1af4d8f.png)

### OOP

class  Vehicle

Do mỗi thực thể con có thể gồm nhiều loại vì vậy ta phải tạo ra 1 mảng chứa các loại type ững với mỗi thực thể
```
enum TerrainType{
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

    func isVehicleType(type: TerrainType) -> Bool { return vehicleTypes.contains(type)
    }
    func canVehicleAttack(type: TerrainType) -> Bool {
        return vehicleAttackTypes.contains(type) }
    func canVehicleMove(type: TerrainType) -> Bool { return vehicleMovementTypes.contains(type)
    }
    func doLandAttack() {}
    func doLandMovement() {}
    func doSeaAttack() {}
    func doSeaMovement() {}
    func doAirAttack() {}
    func doAirMovement() {}
    func takeHit(amount: Int) { hitPoints -= amount }
    func hitPointsRemaining() ->Int { return hitPoints }
    func isAlive() -> Bool { return hitPoints > 0 ? true : false }
}

```

- class Tank gồm 1 loại .land , class Amphibious vừa có các phương thức của cả land và sea

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

class Amphibious: Vehicle {
    override init() {
        super.init()
        vehicleTypes = [.land, .sea]
        vehicleAttackTypes = [.land, .sea]
        vehicleMovementTypes = [.land, .sea]
        landAttackRange = 1
        seaAttackRange = 1
        hitPoints = 25

    }
    override func doLandAttack() {
        print("Amphibious Land Attack")
    }
    override func doLandMovement() {
        print("Amphibious Land Move")
    }
    override func doSeaAttack() {
        print("Amphibious Sea Attack")
    }
    override func doSeaMovement() {
        print("Amphibious Sea Move")
    }
}
```

Ta thấy cách tiếp cận bằng OOP có thể giải quyết được vấn đề nhưng khá bất cập vì có khá nhiều code dư thừa và code rất rối. 

### POP

- Đối với tiếp cận bằng protocol, ta có thể chia nhỏ từng loại vehicle thành các protocol để trở nên nhỏ gọn hơn

Protocol Vehicle

![](https://images.viblo.asia/07564b9d-ec36-47f5-b365-67d742bc4bf3.png)
```
protocol Vehicle {
     var hitPoints: Int {get set}
}

extension Vehicle {
    mutating func takeHit(amount: Int) {
        hitPoints -= amount }
    func hitPointsRemaining() -> Int { return hitPoints }
    
    func isAlive() -> Bool {
        return hitPoints > 0 ? true : false
    }
}
```

Tạo 3 protocol tương ứng với từng loại (LandVehicle, SeaVehicle, AirVehicle)

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

Do tính đa kế thừa của protocol ta có thể biến code trở nên linh hoạt hơn
```
struct Tank: LandVehicle {
    var hitPoints = 68
    let landAttackRange = 5
    let landAttack = true
    let landMovement = true
    func doLandAttack() { print("Tank Attack") }
    func doLandMovement() { print("Tank Move") }
}

struct Amphibious: LandVehicle, SeaVehicle {
    var hitPoints = 25
    let landAttackRange = 1
    let seaAttackRange = 1
    let landAttack = true
    let landMovement = true
    let seaAttack = true
    let seaMovement = true
    
    func doLandAttack() {
        print("Amphibious Land Attack")
    }
    func doLandMovement() {
        print("Amphibious Land Move")
    }
    func doSeaAttack() {
        print("Amphibious Sea Attack")
    }
    func doSeaMovement() {
        print("Amphibious Sea Move")
    }
}
```
### Kết luận

Protocol-oriented programing là cách tiếp cận mới của swift dựa trên việc xoay quanh việc ưu tiên sử dụng các kiểu dữ liệu value type bên cạnh đó kết hợp với sự linh hoạt và trừu tượng hoá cao của protocol. Điều này giúp code trở nên thân thiện và linh hoạt hơn. Tuy nhiên, ta cũng không thể phủ nhận những lợi ích của OOP, và reference type. Vì vậy việc quyết đinh sử dụng cách nào còn tuỳ thuộc vào từng trường hợp và điều kiện cụ thể. Việc chọn lựa giải pháp đúng giúp code trở nên tối ưu hơn