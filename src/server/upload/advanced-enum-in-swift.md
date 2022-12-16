# 1. Properties

Trong enum không thể tạo các stored properties, nhưng có thể chứa các computed property.

Giờ tạo một enum tên là Device, nó chứa một computed property mang tên year, trả về năm ra đời của device đó.
```
enum Device {
	case iPad
	case iPhone
	
	var year: Int {
		switch self {
			case .iPhone: 
				return 2007
			case .iPad: 
				return 2010
		}
	}
}

let device = Device.iPhone
print(device.year)
//prints "2007"
```
# 2. Methods
Chúng ta cũng có thể định nghĩa các methods trong một enum. 

Ví dụ dưới đây sử dụng Switch chính các case trong enum Device để in ra năm sản xuất của divce đó:
```
enum Device { 
	case iPad
	case iPhone
	
    func introduced() -> String {
		switch self {
			case .iPhone: 
				return "\(self) was introduced 2007"
			case .iPad: 
				return "\(self) was introduced 2010"
		}
	}
}

let device = Device.iPhone
print (device.introduced())
//prints "iPhone was introduced 2007"
```
# 3. Nested Enums
Chúng ta có thể tạo một enum bên trong một enum, điều này cho phép code cấu trúc và clear hơn.
```
enum Animal {
    case fourLegs
    case twoLegs
    
    enum Dog {
        case chihuahua
        case fox
    }
    
    enum Bird {
        case penguin
        case ostrich
    }
}
```
# 4. Containing Enums
Chúng ta có thể nhúng các enum vào trong struct hoặc class.
#### 4.1 Tạo một struct chứa các enum
Ví dụ khi làm một trò chơi, ta cần tạo một nhân vật, có vũ khí và "class":
```
struct Character {
	enum CharacterType {
		case thief
		case warrior
	}
	enum Weapon {
		case bow
		case sword
		case dagger
	}
	let type: CharacterType
	let weapon: Weapon
}
```
#### 4.2 Initialization
Để init một nhân vật mới, chúng ta phải chọn "class" và loại vũ khí:
```
let character = Character(type: .warrior, weapon: .sword)
print("\(character.type) chosen \(character.weapon)")
//warrior chosen sword
```
# 5. Mutating Method
Tạo một mutating function mà có thể thay đổi case thành một case khác để sử dụng vào các trường hợp đặc biệt.
Ví dụ dưới đây định nghĩa một enum cho ba tốc độ của một cái quạt:

```
enum FanSpeedSwitch {
	case off
	case low
	case high
	mutating func next() {
		switch self {
			case .off:
				self = .low
			case .low:
				self = .high
			case .high:
			self = .off
		}
	}
}

var fanSpeed = FanSpeedSwitch.off
fanSpeed.next() // fanSpeed is now equal to .low
fanSpeed.next() // fanSpeed is now equal to .high
fanSpeed.next() // fanSpeed is now equal to .off again
```
# 6. Static Method
Chúng ta cũng có thể tạo các static method trong enum. Ví dụ dưới đây tạo một enum tên là Device, chứa một static funtion trả về enum Device dựa trên tên thiết bị nhập vào từ tham số của static function:
```
enum Device {
	case iPhone
	case iPad

	static func getDevice(name: String) -> Device? {
		switch name {
			case "iPhone":
				return .iPhone
			case "iPad":
				return .iPad
			default:
				return nil
		}
	}
}

if let device = Device.getDevice(name: "iPhone") {
	print(device) 
	//prints iPhone
}
```
# 7. Custom Init
Tạo một phương thức khởi tạo custom:
```
enum IntCategory {
	case small
	case medium
	case big
	case weird

	init(number: Int) {
		switch number {
			case 0..<1000 :
				self = .small
			case 1000..<100000:
				self = .medium
			case 100000..<1000000:
				self = .big
			default:
				self = .weird
		}
	}
}

let intCategory = IntCategory(number: 34645)
print(intCategory)
//prints medium
```
# 8. Protocol Oriented Enum
Ta cũng có thể conform một protocol với enum.

Để hiểu được cách conform protocol với enum. Ta sẽ tạo ra một trò chơi, trong đó, một player có thể có 2 trạng thái .dead hoặc .alive. Khi .alive, player có các chỉ số máu, và mạng. nếu các chỉ số này xuống đến 0, player sẽ chết (.dead):
#### 8.1 Create Protocol
Let's create a protocol called, LifeSpan. It contains one property, numberOfHearts and two mutating functions which will be used to increase/decrease a player's heart.
Tạo một protocol gọi là LifeSpan, chứa 1 property - numberOfHearts và 2 mutating functions mà sẽ sử dụng để tăng hoặc giảm chỉ số máu của player:
```
protocol LifeSpan {
	var numberOfHearts: Int { get }
	mutating func getAttacked() // heart -1
	mutating func increaseHeart() // heart +1
}
```
#### 8.2 Create Enum
Bây giờ, tạo một enum Player, conform protocol LifeSpan, có 2 case, .alive hoặc .dead, case .alive gán với chỉ số máu hiện tại - currentHeart. 1 computed property tính chỉ số máu của nhân vật - numberOfHearts, dựa vào trạng thái .dead hoặc .alive của player.
```
enum Player: LifeSpan {
	case dead
	case alive(currentHeart: Int)
	
	var numberOfHearts: Int {
		switch self {
			case .dead: return 0
			case let .alive(numberOfHearts): return numberOfHearts
		}
	}
	
	mutating func increaseHeart() {
		switch self {
			case .dead:
				self = .alive(currentHeart: 1)
			case let .alive(numberOfHearts):
				self = .alive(currentHeart: numberOfHearts + 1)
		}
	}
	
	mutating func getAttacked() {
		switch self {
			case .alive(let numberOfHearts):
				if numberOfHearts == 1 {
					self = .dead
				} else {
					self = .alive(currentHeart: numberOfHearts - 1)
				}
			case .dead:
			break
		}
	}
}
```
#### 8.3 Play Game
Chơi game nào.
```
var player = Player.dead // .dead

player.increaseHeart()  // .alive(currentHeart: 1)
print(player.numberOfHearts) //prints 1

player.increaseHeart()  // .alive(currentHeart: 2)
print(player.numberOfHearts) //prints 2

player.getAttacked()  // .alive(currentHeart: 1)
print(player.numberOfHearts) //prints 1

player.getAttacked() // .dead
print(player.numberOfHearts) // prints 0
```
# 9. Extensions
Chúng ta cũng có thể tạo extension cho enum để bổ sung các property và method:
```
enum Animal {

    case fourLegs
    case twoLegs
    
    enum Dog {
        case chihuahua
        case fox
    }
    
    enum Bird {
        case penguin
        case ostrich
    }
}

extension Animal {

    var description: String {
        switch self {
        case .fourLegs:
            return "Động vật 4 chân"
        case .twoLegs:
            return "Động vật 2 chân"
        }
    }
    
    mutating func swapAnimal() {
        switch self {
        case .fourLegs:
            self = .twoLegs
        case .twoLegs:
            self = .fourLegs
        }
    }
}

var animal = Animal.fourLegs
print(animal.description)
//"Động vật 4 chân"
animal.swapAnimal()
print(animal.description)
//"Động vật 2 chân"
```
# 10. Generic Enums
Ta cũng có thể tạo các enum generic:
```
enum Information<T1, T2> {
	case name(T1)
	case website(T1)
	case age(T2)
}
```

Init:

`let info = Information.name("Bob") // Error`

Trình biên dịch báo lỗi do ta mới cho biết T1 là kiểu String dựa vào chuỗi "Bob". Tuy nhiên, kiểu dữ liệu của T2 chưa được định nghĩa. Do đó, ta phải định nghĩa cả 2 kiểu T1 và T2:
```
let info =Information<String, Int>.age(20) 
print(info) //prints age(20)
```