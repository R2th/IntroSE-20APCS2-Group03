# I. Giới thiệu:

-----


**Mediator Pattern** là một **Design Pattern** thuộc loại **Behavior**, đóng vai trò giảm sự phụ thuộc lẫn nhau của các  tượng. **Mediator Pattern** hạn chế việc tương tác trức tiếp với nhau giữa các đối tượng và bắt chúng phải tương tác với nhau qua một đối tượng chung gian là **Mediator**. **Mediator Pattern** gồm các thành phần chính:

![](https://images.viblo.asia/bbcc28b6-cd73-4d83-83d4-f9591ac0b6b4.png)
- **Components**: là các đối tượng chứa đựng các business logic và cần phải tương tác với nhau trong quá trình hoạt động.
- **Mediator Interface**: là lớp trừu tượng để khai báo các phương thức giúp cho các **Component** có thể tương tác với nhau.
- **Concrete Mediator**: là đổi tượng chung gian adopt **Mediator Interface** giúp cho các **Component** tương tác qua lại với nhau.

# II. Cách thức hoạt động:

-----


Các **Component** trong **Mediator Pattern** thay vì tương tác trực tiếp với nhau trong quá trình hoạt động thì sẽ đều phải tương tác với nhau thông qua một đối tượng là **Mediator**. Đối tượng **Mediator** này sẽ tiếp nhận các sự kiện được gửi tới từ các **Component** khác nhau và xử lý chúng. **Mediator** đóng vai trò như một người điều phối các công việc được gửi tới và giải quyết các công việc đó tập trung tại một chỗ.

![](https://images.viblo.asia/a3fc08ca-a166-475c-9a41-242e9c2b68d4.png)

# III. Mediator Pattern được sử dụng khi nào?

-----


**Mediator Pattern** được sử dụng trong trường hợp có nhiều các đối tượng tương tác trực tiếp với nhau. Nó giúp các sự kiện của các đối tượng được điều tiết một cách rõ ràng, loại bỏ đi sự cồng kềnh và chồng chéo nhau của source code.

# IV. Ví dụ:

-----


Khai báo Mediator Protocol.
```swift
protocol Mediator: class {

    func notify(sender: BaseComponent, event: String)
}
```

Tạo lớp Base cho các Component.
```swift
class BaseComponent {

    weak var mediator: Mediator?

    init(mediator: Mediator? = nil) {
        self.mediator = mediator
    }

    func update(mediator: Mediator) {
        self.mediator = mediator
    }
}
```

Các đối tượng Component có các sự kiện liên quan tới nhau.
```swift
class Component1: BaseComponent {

    func doA() {
        print("Component 1 does A.")
        mediator?.notify(sender: self, event: "A")
    }

    func doB() {
        print("Component 1 does B.\n")
        mediator?.notify(sender: self, event: "B")
    }
}

class Component2: BaseComponent {

    func doC() {
        print("Component 2 does C.")
        mediator?.notify(sender: self, event: "C")
    }

    func doD() {
        print("Component 2 does D.")
        mediator?.notify(sender: self, event: "D")
    }
}
```

Đối tượng Mediator đóng vai trò điều phối hoạt động.
```swift
class ConcreteMediator: Mediator {

    private var component1: Component1
    private var component2: Component2

    init(_ component1: Component1, _ component2: Component2) {
        self.component1 = component1
        self.component2 = component2

        component1.update(mediator: self)
        component2.update(mediator: self)
    }

    func notify(sender: BaseComponent, event: String) {
        if event == "A" {
            print("Mediator reacts on A and triggers following operations:")
            self.component2.doC()
        } else if event == "D" {
            print("Mediator reacts on D and triggers following operations:")
            self.component1.doB()
            self.component2.doC()
        }
    }
}
```

Sử dụng:
```swift
        let component1 = Component1()
        let component2 = Component2()

        let mediator = ConcreteMediator(component1, component2)
        print("Client triggers operation A.")
        component1.doA()

        print("\nClient triggers operation D.")
        component2.doD()

        print(mediator)
```

```swift
Client triggers operation A.
Component 1 does A.
Mediator reacts on A and triggers following operations:
Component 2 does C.

Client triggers operation D.
Component 2 does D.
Mediator reacts on D and triggers following operations:
Component 1 does B.

Component 2 does C.
```

# V. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- Mediator Pattern by [refactoring.guru](https://refactoring.guru/design-patterns/mediator)