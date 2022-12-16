# I. Giới thiệu:

-----


**Prototype Pattern** là một **Design Pattern** thuộc nhóm **Creational**. Nó cho phép chúng ta có thể copy một object mà không phụ thuộc vào **class** của của **object** đó. **Prototype Pattern** gồm các thành phần chính như sau:

![](https://images.viblo.asia/341e4ab5-8e2d-418c-99d4-7fde5153e4c4.png)
- **Copyng Ptotocol**: là **protocol** được sử dụng để khai báo các phương thức phục vụ cho việc **copy object**.
- **Prototye**: là class adopt **Copying Protocol** để phục vụ cho việc nhân bản các **object** của nó.

# II. Cách thức hoạt động:

-----


Để **copy** một **object** của **class**, **Prototype Pattern** sẽ sử dụng một hàm khởi tạo với params đầu vào là thuộc tính của **object** cần **copy**. Các giá trị lấy ra được từ params truyền vào trong hàm khởi tạo sẽ được sử dụng để khởi tạo một **object** mới.

![](https://images.viblo.asia/4f75e0bc-5a81-465d-980d-f4eafc640660.png)

# III. Prototype Pattern được sử dụng khi nào?

-----


**Prototype Pattern** được sử dụng khi muốn một **object** của **class** có thể tạo ra một **bản sao copy** từ chính nó.

# IV. Ví dụ:

-----


Khai báo Copying Protocol
```swift
protocol Copying: class {
    
    func copy() -> Self
}
```

Implement Copying Ptotocol trong Prototype object.
```swift
class Monster: Copying {
    private var health: Int
    public var level: Int
    
    public init(health: Int, level: Int) {
        self.health = health
        self.level = level
    }
    
    func copy() -> Monster {
        let newMonster = Monster(health: self.health, level: self.level)
        return newMonster
    }
}
```

Sử dụng
```swift
let monster = Monster(health: 700, level: 37)
let monster2 = monster.copy()
```

# V. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- Prototype Pattern by [refactoring.guru](https://refactoring.guru/design-patterns/prototype)