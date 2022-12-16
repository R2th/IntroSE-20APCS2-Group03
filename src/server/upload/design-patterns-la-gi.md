# Giới thiệu
Xin chào, Trong phần đầu tiên này thì mình sẽ giới thiệu cho các bạn biết khái niệm, và các loại design patterns để bạn có thể hiểu và ứng dụng nó vào trong quá trình phát triển sản phẩm nhé.

Do tóm gọn bài viết về design pattern trong một bài kèm theo những ví dụ minh hoạ thì mình thấy sẽ rất là dài, cho nên mình sẽ chia nội dung thành 4 phần:
- Phần 1: Design Patterns Là gì
- [ Phần 2: Creational Design Patterns](https://viblo.asia/p/creational-design-patterns-ORNZqLrnK0n)
- [Phần 3: Structural Design Patterns](https://viblo.asia/p/structural-design-patterns-Eb85ok6052G)
- [Phần 4: Behavioral Design Patterns](https://viblo.asia/p/behavioral-design-patterns-YWOZrbJ7ZQ0)
# Khái niệm
Design patterns là một kỹ thuật trong lập trình hướng đối tượng (OOP) mà mọi lập trình viên đều phải biết, nó không phải là package hay thư viện gì cả, mà nó nhằm mục đích giải quyết các vấn đề chung, và đưa ra hướng giải quyết tối ưu hơn. 

Bạn có thể hiểu nó là một mô tả hoặc một khuôn mẫu cho cách giải quyết vấn đề có thể áp dụng được vào nhiều tình huống khác nhau.

# Tại sao nên sử dụng Design pattern
Nó cung cấp giải pháp dạng tổng quát, giúp tăng tốc độ phát triển phần mềm. Thiết kế phần mềm hiệu quả cần phải cân nhắc các vấn đề phát sinh trong quá trình làm.

Design patterns giúp tái sử dụng code và dể dàng mở rộng.

Dễ dàng nâng cấp, bảo trì, đội dev có thể nhanh chóng hiểu code của nhau.
# Phân loại
Hiện có 23 mẫu design patterns được định nghĩa và được chia thành 3 nhóm:
## 1.Creational (nhóm khởi tạo)
Có 6 loại trong Creational patterns:
- Simple Factory
- Factory method
- Abtract Factory
- Builder
- Prototype
- Singleton

Những design patterns này cung cấp giải pháp tạo ra các object và che dấu logic việc tạo ra nó, thay vì tạo ra object một cách trực tiếp với `new`.
## 2. Structural (nhóm cấu trúc)
Có 7 loại trong Structural patterns:
- Adapter
- Bridge
- Composite
- Decorator
- Facade
- Flyweight
- Proxy

Những Design patterns này liên quan tới `class` và các thành phần của `object`. Nó được dùng để thiết lập, định nghĩa quan hệ giữa các đối tượng.

## 3. Behavioral (nhóm tương tác)
Có 10 loại trong behavioral design patterns:
- Chain of Responsibility
- Command
- Iterator
- Mediator
- Memento
- Observer
- Visitor
- Strategy
- State
- Template Method

Nhóm này dùng trong việc thực hiện các hành vi của đối tượng và sự giao tiếp giữa các đổi tượng với nhau.

## Mối quan hệ giữa 23 Design Patterns cơ bản (GoF):
![](https://images.viblo.asia/0fac5bc8-8bfd-4a26-98af-6b28b7e14371.jpg)

nguồn: https://www.google.com/url?sa=i&url=https%3A%2F%2Fgpcoder.com%2F4164-gioi-thieu-design-patterns%2F&psig=AOvVaw2m8avyGPhhZXSK26TR0hOQ&ust=1587285332639000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCugejI8egCFQAAAAAdAAAAABAD
# Tổng kết
Trên đây là phần giới thiệu tổng quát về Design pattern, hy vọng sẽ giúp bạn nắm khái quát về design pattern, trong phần 2, mình sẽ giải thích về Creational Design Patterns.