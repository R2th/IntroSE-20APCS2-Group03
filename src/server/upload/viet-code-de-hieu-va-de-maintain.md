### Giới thiệu

Những đoạn code tốt không chỉ là những dòng code giải quyết được vấn đề với hiệu suất cao, mà nó còn phải là một đoạn code có thể được đọc hiểu như ngôn ngữ tự nhiên. Dựa vào đó, những người không viết ra những dòng code này hay thậm chí những người không có kiến thức về lập trình khi đọc vào vẫn có thể hiểu được nhiệm vụ của nó là gì.

Vậy thì chúng ta hãy cùng nhìn vào đoạn code sau:

```
let array = Array(1...100)
array.filter { $0 % 2 == 0}
```

Đoạn code này dùng để lọc ra những số chẵn, và trông nó cũng khá dễ hiểu. Tuy nhiên vấn đề chỉ phức tạp hơn khi ta cho thêm một số điều kiện lọc vào, ví dụ như:

```
let array = Array(1...100)
array.filter { $0 % 2 == 0 && $0 < 40 && $0 > 10}
```

Trông cũng rườm rà nhỉ? Nếu chỉnh nó lại như sau để trông rõ ràng hơn:

```
let array = Array(1...100)
array.filter { $0 % 2 == 0 }
    .filter { $0 < 40 }
    .filter{ $0 > 10}
```

Thì vô tình lại làm tăng số vòng lặp lên hơn hẳn so với trước đây, vì bây giờ nó phải lọc lại thêm hai lần nữa cho từ mảng kết quả của lần lọc đầu tiên. Hãy cùng xem qua kết quả dưới đây:
![](https://images.viblo.asia/2acd15a0-14c8-4803-b79d-e6e09601225d.png)

### Case Study

Hãy cùng tìm hiểu sâu hơn bằng ví dụ sau, ta tạo ra một struct Person định nghĩa các thuộc tính như name, eye color, hair color. Và các enum chứa các loại eye và hair color như bên dưới:

```
enum EyeColor {
    case dark, blue, green, brown
}

enum HairColor {

    case brunette, blonde, ginger, dark
}

struct Person {
    var name: String
    var eyesColor: EyeColor
    var hairColor: HairColor
}
```

Ta có thể dễ dàng lọc ra những người với những màu mắt và màu tóc nhất định bằng việc kết hợp các điều kiện cho filter:

```
let people = [ ... ] 
let subset = people.filter { ($0.eyesColor == .green && $0.hairColor == .blonde) || ($0.eyesColor == .blue && $0.hairColor == .ginger) }
```

Nhưng nó hơi khó đọc và khó maintain, vì vậy ta sẽ cùng chỉnh lại đoạn code trên sao cho nó dễ đọc và dễ maintain hơn.

### Filter

Hãy bọc điều kiện lọc vào một object như sau:

```
struct Filter<Element> {
    typealias Condition = (Element) -> Bool
    var condition: Condition
}
```

Bây giờ struct Filter sẽ chứa điều kiện lọc cho generic element, nhờ đó ta có thể sử dụng cho nhiều đối tượng khác nhau mà không cần phải tạo ra những struct khác. Sau đó, hãy extend Array để sử dụng Filter:

```
extension Array {
    func filtering(_ filter: Filter<Element>) -> Array {
        self.filter(filter.condition)
    }
}
```

Ta có thể thêm vào các thành phần matching và không matching với các điều kiện được đưa vào, và kết quả trả về sẽ bao gồm cả hai loại output:

```
extension Filter {
    
    struct Result {
        private var matchingBlock: () -> Array<Element>
        private var restBlock: () -> Array<Element>
        
        var matching: Array<Element> { matchingBlock() }
        var rest: Array<Element> { restBlock() }
        
        init(matching: @escaping @autoclosure () -> Array<Element>,
             rest: @escaping @autoclosure () -> Array<Element>) {
            self.matchingBlock = matching
            self.restBlock = rest
        }
    }
    
}
```

Và ta bọc các thành phần lại trong một closure, nhờ đó, việc filter sẽ chỉ được thực hiện khi nó được gọi đến, ta sẽ chỉnh lại extension của Array trên như sau:

```
extension Array {
    func filtering(_ filter: Filter<Element>) -> Filter<Element>.Result {
        Filter.Result(matching: self.filter(filter.condition),
                     rest: self.filter((!filter).condition))
    }
}
```

Giờ ta có thể viết:

`let subset = people.filter { $0.eyesColor == .blue }`

thành:

```
let hasBlueEyes = Filter<Person> { $0.eyesColor == .blue }
let subset = people.filtering(hasBlueEyes).matching
```

Trông đã gọn gàng và dễ đọc hơn hẳn rồi phải không, tuy nhiên nếu ta cần thêm nhiều điều kiện hơn để lọc thì thế nào?

```
let hasBlondeHair = Filter<Person> { $0.hairColor == .blonde }
let hasBlueEyes = Filter<Person> { $0.eyesColor == .blue }
let subset = people.filtering(hasBlueEyes).mathing
    .filtering(hasBlondeHair).matching
```

Ta lại vướng phải vấn đề về performance như đã đề cập ở đầu bài. Tuy nhiên ta sẽ sửa nó trong phần tiếp theo dưới đây, hãy cùng tiếp tục đọc nhé.
    
### Thêm các function bổ trợ
Để hỗ trợ việc kết hợp các điều kiện filter lại với nhau, ta có thể tạo thêm các function bổ trợ cho nó, đây là những function cơ bản cho các toán tử như and, or.

```
var inverted: Self {
    .init { !self.condition($0) }
}
func and(_ filter: Self) -> Self {
    .init { filter.condition($0) && self.condition($0) }
}
func or(_ filter: Self) -> Self {
    .init { filter.condition($0) || self.condition($0) }
}
```

Ta có thể viết lại đoạn code trên sử dụng các toán tử mới như sau:

`let subset = people.filtering(hasBlueEyes.and(hasBlondeHair)).matching`

Thậm chí có thể tạo thêm nhiều hơn nữa các function kết hợp:

```
struct Filter<Element> {
    typealias Condition = (Element) -> Bool
    var condition: Condition
}

extension Filter {
    
    static var all: Self {
        .init { _ in true }
    }
    
    static var none: Self {
        .init { _ in false }
    }
    
    var inverted: Self {
        .init { !self.condition($0) }
    }
    
    func and(_ filter: Self) -> Self {
        .init { filter.condition($0) && self.condition($0) }
    }

    func or(_ filter: Self) -> Self {
        .init { filter.condition($0) || self.condition($0) }
    }
    
    static prefix func ! (_ filter: Self) -> Self {
        filter.inverted
    }
    
    static func & (_ lhs: Self, _ rhs: Self) -> Self {
        lhs.and(rhs)
    }
    
    static func | (_ lhs: Self, _ rhs: Self) -> Self {
        lhs.or(rhs)
    }

    static func any(of filters: Self...) -> Self {
        Self.any(of: filters)
    }
    
    static func any(of filters: [Self]) -> Self {
        filters.reduce(.none, |)
    }

    static func not(_ filters: Self...) -> Self {
        Self.combine(filters.map { !$0 })
    }
    
    static func combine(_ filters: [Self]) -> Self {
        filters.reduce(.all, &)
    }

    static func combine(_ filters: Self...) -> Self {
        Self.combine(filters)
    }
    
}
```

Việc kết hợp điều kiện filter bây giờ sẽ rất dễ dàng, ta có thể viết nó như sau:

```
let hasBlondeHair = Filter<Person> { $0.hairColor == .blonde }
let hasBlueEyes = Filter<Person> { $0.eyesColor == .blue }
let result1 = people.filtering(!hasBlueEyes)
let result2 = people.filtering(hasBlueEyes & hasBlondeHair)
let result3 = people.filtering(hasBlueEyes | !hasBlondeHair)
```
    
### Final Result

Để tạo ra những filter có thể tái sử dụng lại, ta có thể extend Filter và thêm vào các trường hợp phổ biến như sau:

```
extension Filter where Element == Person {
    static let brownEyes = Filter { $0.eyesColor == .brown }
    static let blueEyes = Filter { $0.eyesColor == .blue }
    static let darkEyes = Filter { $0.eyesColor == .dark }
    static let greenEyes = Filter { $0.eyesColor == .green }

    static let brunette = Filter { $0.hairColor == .brunette }
    static let blonde = Filter { $0.hairColor == .blonde }
    static let ginger = Filter { $0.hairColor == .ginger }
    static let darkHair = Filter { $0.hairColor == .dark }

    static func name(startingWith letter: String) -> Filter {
        Filter { $0.name.starts(with: letter) }
    }
}
```

Hãy quay lại đoạn code từ đầu mà ta muốn refactor:

```
let subset = people.filter { ($0.eyesColor == .green && $0.hairColor == .blonde) || ($0.eyesColor == .blue && $0.hairColor == .ginger) }
```

Nó được viết lại thành:

```
let subset = people.filtering(Filter.greenEyes.and(.blonde)
    .or(Filter.ginger.and(.blueEyes))).matching
```

Thậm chí filter những trường hợp phức tạp hơn:

```
let people = [
    Person(name: "Eliott", eyesColor: .brown, hairColor: .blonde),
    Person(name: "Eoin", eyesColor: .brown, hairColor: .brunette),
    Person(name: "Michelle", eyesColor: .brown, hairColor: .brunette),
    Person(name: "Kevin", eyesColor: .blue, hairColor: .brunette),
    Person(name: "Jessica", eyesColor: .green, hairColor: .brunette),
    Person(name: "Thomas", eyesColor: .dark, hairColor: .dark),
    Person(name: "Oliver", eyesColor: .dark, hairColor: .blonde),
    Person(name: "Jane", eyesColor: .blue, hairColor: .ginger),
    Person(name: "Justine", eyesColor: .brown, hairColor: .dark),
    Person(name: "Joseph", eyesColor: .brown, hairColor: .brunette),
    Person(name: "Michael", eyesColor: .blue, hairColor: .dark)
]

people.filtering(.combine(.name(startingWith: "E"), .brownEyes, .blonde)).matching      // Eliott
people.filtering(.any(of: .ginger, .blonde, .greenEyes)).matching       // Eliott, Jessica, Oliver, Jane
people.filtering(Filter.not(.name(startingWith: "J"), .brownEyes).and(.brunette)).matching      // Kevin
people.filtering(Filter.greenEyes.and(.blonde).or(Filter.ginger.and(.blueEyes))).matching       // Jane
```

Hoặc filter cả Dog...

```
enum DogBreed {
    case pug
    case husky
    case boxer
    case bulldog
    case chowChow
}

struct Dog {
    var name: String
    var breed: DogBreed
}

let dog = [
    Dog(name: "Rudolph", breed: .husky),
    Dog(name: "Hugo", breed: .boxer),
    Dog(name: "Trinity", breed: .pug),
    Dog(name: "Neo", breed: .pug),
    Dog(name: "Sammuel", breed: .chowChow),
    Dog(name: "Princess", breed: .bulldog)
]

extension Filter where Element == Dog {
    static let pug = Filter { $0.breed == .pug }
    static let husky = Filter { $0.breed == .husky }
    static let boxer = Filter { $0.breed == .boxer }
    static let bulldog = Filter { $0.breed == .bulldog }
    static let chowChow = Filter { $0.breed == .chowChow }
}

dog.filtering(.boxer).matching                          // Hugo
dog.filtering(.not(.husky, .chowChow)).rest             // Rudolph, Sammuel
dog.filtering(Filter.boxer.or(.chowChow)).matching      // Hugo, Sammuel
```
    
### Kết luận
    
Đối với lập trình viên, việc viết code không chỉ dừng lại ở giải quyết vấn đề mà nó còn phải dễ đọc, dễ hiểu và dễ maintain, và nó có thể được đọc như ngôn ngữ tự nhiên. Việc sử dụng generics cũng là một trong những cách giúp ta có thể dễ dàng reuse và maintain. Trong quá trình tạo ứng dụng, việc viết ra những đoạn code tốt hơn nữa là thử thách thú vị mà các bạn lập trình viên luôn phải cố gắng để phát triển.