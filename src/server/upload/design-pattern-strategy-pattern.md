# I. Giới thiệu:

-----


**Strategy Pattern** là một **Design Pattern** thuộc loại **Behavior**. Nó cho phép chúng ta định nghĩa các business logic thành các đối tượng khác nhau và các đối tượng này có thể thay thế cho nhau trong quá trình runtime. **Strategy Pattern** gồm các thành phần chính:

![](https://images.viblo.asia/8ed998ae-2365-433e-9b51-2caaea7c9e29.png)
- **Object** using **Strategy**: là đối tượng sử dụng các **Concrete Strategy**. Bên trong đối tượng sẽ chứa một property có kiểu dữ liệu là **Strategy Protocol**.
- **Strategy Protocol**: định nghĩa các thuộc tính và phương thức mà tất cả các **Concrete Strategy** bắt buộc phải có và implement chúng.
- **Concrete Strategy**: là các class sẽ implement chi tiết các thuộc tính và phương thức được khai báo trong **Strategy Protocol**. Nó sẽ chứa đựng các business logic đặc thù của từng class.

# II. Cách thức hoạt động:

-----


Cách thức hoạt động của **Strategy Pattern** gần giống với **Delegate Pattern**. Các action cụ thể của một class sẽ không được nó thực hiện trực tiếp mà sẽ ủy quyền việc đó cho **Concrete Strategy** thực hiện. Cùng một công việc nhưng sẽ có thể xử lý theo những cách khác nhau tùy thuộc vào việc chúng ta đang sử dụng **Concrete Strategy** nào.

![](https://images.viblo.asia/d2088fdf-353c-43bc-a9a5-7989aa199591.png)

# III. Strategy Pattern được sử dụng khi nào?

-----


Strategy Pattern được sử dụng khi có hai hoặc nhiều hành vi có thể thay thế nhau trong quá trình runtime của project.

# IV. Ví dụ:

-----


Khai báo Strategy Protocol.
```swift
protocol Strategy {

    func doAlgorithm<T: Comparable>(_ data: [T]) -> [T]
}
```

Tạo các Concrete Strategy.
```swift
class ConcreteStrategyA: Strategy {

    func doAlgorithm<T: Comparable>(_ data: [T]) -> [T] {
        return data.sorted()
    }
}

class ConcreteStrategyB: Strategy {

    func doAlgorithm<T: Comparable>(_ data: [T]) -> [T] {
        return data.sorted(by: >)
    }
}
```

Context sẽ là đối tượng sử dụng Strategy.
```swift
class Context {

    private var strategy: Strategy

    init(strategy: Strategy) {
        self.strategy = strategy
    }

    func update(strategy: Strategy) {
        self.strategy = strategy
    }

    func doSomeBusinessLogic() {
        print("Context: Sorting data using the strategy (not sure how it'll do it)\n")

        let result = strategy.doAlgorithm(["a", "b", "c", "d", "e"])
        print(result.joined(separator: ","))
    }
}
```

Sử dụng:
```swift
        let context = Context(strategy: ConcreteStrategyA())
        print("Client: Strategy is set to normal sorting.\n")
        context.doSomeBusinessLogic()

        print("\nClient: Strategy is set to reverse sorting.\n")
        context.update(strategy: ConcreteStrategyB())
        context.doSomeBusinessLogic()
```

# V. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- Strategy Pattern by [refactoring.guru](https://refactoring.guru/design-patterns/strategy)