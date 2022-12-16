Link bài viết gốc: https://gpcoder.com/4164-gioi-thieu-design-patterns/

## Design Patterns là gì?

Design Pattern là một kỹ thuật trong lập trình hướng đối tượng, nó khá quan trọng và mọi lập trình viên muốn giỏi đều phải biết. Được sử dụng thường xuyên trong các ngôn ngữ OOP. Nó sẽ cung cấp cho bạn các "mẫu thiết kế", giải pháp để giải quyết các vấn đề chung, thường gặp trong lập trình. Các vấn đề mà bạn gặp phải có thể bạn sẽ tự nghĩ ra cách giải quyết nhưng có thể nó chưa phải là tối ưu. Design Pattern giúp bạn giải quyết vấn đề một cách tối ưu nhất, cung cấp cho bạn các giải pháp trong lập trình OOP.

Design Patterns không phải là ngôn ngữ cụ thể nào cả. Nó có thể thực hiện được ở phần lớn các ngôn ngữ lập trình, chẳng hạn như Java, C#, thậm chí là Javascript hay bất kỳ ngôn ngữ lập trình nào khác.

*Mỗi pattern mô tả một vấn đề xảy ra lặp đi lặp lại, và trình bày trọng tâm của giải pháp cho vấn đề đó, theo cách mà bạn có thể dùng đi dùng lại hàng triệu lần mà không cần phải suy nghĩ.*

*— Christopher Alexander —*

## Phân loại Design Patterns

Năm 1994, bốn tác giả Erich Gamma, Richard Helm, Ralph Johnson và John Vlissides đã cho xuất bản một cuốn sách với tiêu đề Design Patterns – Elements of Reusable Object-Oriented Software, đây là khởi nguồn của khái niệm design pattern trong lập trình phần mềm.

Bốn tác giả trên được biết đến rộng rãi dưới tên Gang of Four (bộ tứ). Theo quan điểm của bốn người, design pattern chủ yếu được dựa theo những quy tắc sau đây về thiết kế hướng đối tượng.

* Lập trình cho interface chứ không phải để implement interface đó.
* Ưu tiên object composition hơn là thừa kế.

Hệ thống các mẫu Design pattern hiện có **23 mẫu** được định nghĩa trong cuốn “Design patterns Elements of Reusable Object Oriented Software” và được chia thành 3 nhóm:

* [Creational Pattern](https://gpcoder.com/category/design-pattern/creational-pattern/) (nhóm khởi tạo – 5 mẫu) gồm: Factory Method, Abstract Factory, Builder, Prototype, Singleton. Những Design pattern loại này cung cấp một giải pháp để tạo ra các object và che giấu được logic của việc tạo ra nó, thay vì tạo ra object một cách trực tiếp bằng cách sử dụng method new. Điều này giúp cho chương trình trở nên mềm dẻo hơn trong việc quyết định object nào cần được tạo ra trong những tình huống được đưa ra.
* [Structural Pattern](https://gpcoder.com/category/design-pattern/structuaral-pattern/) (nhóm cấu trúc – 7 mẫu) gồm: Adapter, Bridge, Composite, Decorator, Facade, Flyweight và Proxy. Những Design pattern loại này liên quan tới class và các thành phần của object. Nó dùng để thiết lập, định nghĩa quan hệ giữa các đối tượng.
* [Behavioral Pattern](https://gpcoder.com/category/design-pattern/behavior-pattern/) (nhóm tương tác/ hành vi – 11 mẫu) gồm: Interpreter, Template Method, Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy và Visitor. Nhóm này dùng trong thực hiện các hành vi của đối tượng, sự giao tiếp giữa các object với nhau.

### Nhóm Creational (nhóm khởi tạo)


![](https://images.viblo.asia/db99da2e-7eee-45b2-90ee-8e599f975a29.png)

* [Hướng dẫn Java Design Pattern – Singleton](https://gpcoder.com/4190-huong-dan-java-design-pattern-singleton/)
* [Hướng dẫn Java Design Pattern – Factory Method](https://gpcoder.com/4352-huong-dan-java-design-pattern-factory-method/)
* [Hướng dẫn Java Design Pattern – Abstract Factory](https://gpcoder.com/4365-huong-dan-java-design-pattern-abstract-factory/)
* [Hướng dẫn Java Design Pattern – Builder](https://gpcoder.com/4434-huong-dan-java-design-pattern-builder/)
* [Hướng dẫn Java Design Pattern – Prototype](https://gpcoder.com/4413-huong-dan-java-design-pattern-prototype/)
* [Hướng dẫn Java Design Pattern – Object Pool](https://gpcoder.com/4456-huong-dan-java-design-pattern-object-pool/)

### Nhóm Structural (nhóm cấu trúc)

![](https://images.viblo.asia/d32eddff-6ff8-4e3c-a2f2-9aa0185312a7.png)

* [Hướng dẫn Java Design Pattern – Adapter ](https://gpcoder.com/4483-huong-dan-java-design-pattern-adapter/)
* [Hướng dẫn Java Design Pattern – Bridge ](https://gpcoder.com/4520-huong-dan-java-design-pattern-bridge/)
* [Hướng dẫn Java Design Pattern – Composite ](https://gpcoder.com/4554-huong-dan-java-design-pattern-composite/)
* [Hướng dẫn Java Design Pattern – Decorator ](https://gpcoder.com/4574-huong-dan-java-design-pattern-decorator/)
* [Hướng dẫn Java Design Pattern – Facade ](https://gpcoder.com/4604-huong-dan-java-design-pattern-facade/)
* [Hướng dẫn Java Design Pattern – Flyweight ](https://gpcoder.com/4626-huong-dan-java-design-pattern-flyweight/)
* [Hướng dẫn Java Design Pattern – Proxy ](https://gpcoder.com/4644-huong-dan-java-design-pattern-proxy/)

### Nhóm Behavioral (nhóm hành vi/ tương tác)

![](https://images.viblo.asia/6653a5ac-b273-4002-9226-8470e4eb6867.png)

* [ Hướng dẫn Java Design Pattern – Chain of Responsibility](https://gpcoder.com/4665-huong-dan-java-design-pattern-chain-of-responsibility/)
* [Hướng dẫn Java Design Pattern – Command](https://gpcoder.com/4686-huong-dan-java-design-pattern-command/)
* [Hướng dẫn Java Design Pattern – Interpreter](https://gpcoder.com/4702-huong-dan-java-design-pattern-interpreter/)
* [Hướng dẫn Java Design Pattern – Iterator ](https://gpcoder.com/4724-huong-dan-java-design-pattern-iterator/)
* [Hướng dẫn Java Design Pattern – Mediator ](https://gpcoder.com/4740-huong-dan-java-design-pattern-mediator/)
* [Hướng dẫn Java Design Pattern – Memento](https://gpcoder.com/4763-huong-dan-java-design-pattern-memento/)
* [Hướng dẫn Java Design Pattern – Observer ](https://gpcoder.com/4747-huong-dan-java-design-pattern-observer/)
* [Hướng dẫn Java Design Pattern – State](https://gpcoder.com/4785-huong-dan-java-design-pattern-state/)
* [Hướng dẫn Java Design Pattern – Strategy](https://gpcoder.com/4796-huong-dan-java-design-pattern-strategy/)
* [Hướng dẫn Java Design Pattern – Template Method](https://gpcoder.com/4810-huong-dan-java-design-pattern-template-method/)
* [Hướng dẫn Java Design Pattern – Visitor](https://gpcoder.com/4813-huong-dan-java-design-pattern-visitor/)

Nguồn: https://gpcoder.com/4164-gioi-thieu-design-patterns/