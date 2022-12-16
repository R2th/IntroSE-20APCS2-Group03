# I. Giới thiệu:

-----


**Iterator** là một **Design Pattern** thuộc loại **Behavior**. Nó cho phép chúng ta duyệt các phần tử của một **collection** mà không để lộ các implement chi tiết của nó. **Iterator Pattern** gồm các thành phần chính như sau:

![](https://images.viblo.asia/2904b00d-7c90-4d04-920a-8665139babdf.png)
- `IterableProtocol` trong **Swift** định nghĩa kiểu dữ liệu cho phép truy xuất các phần tử thông qua vòng lặp `for`.
- **Iterator Object**: Object được custom để có thể truy xuất dữ liệu theo kiểu **vòng lặp**.

# II. Cách thức hoạt động:

-----


**Iterator Pattern** cung cấp cách truy xuất tuần tự vào các phần tử của một **collection**. Cách truy xuất này sẽ được chúng ta quyết định tùy thuộc vào **cấu trúc dữ liệu** của **collection**. Cấu trúc dữ liệu có thể là Array, Tree,... Đồng thời, cách truy xuất dữ liệu của nó sẽ được che giấu đi và không để lộ ra bên ngoài.

![](https://images.viblo.asia/99d314aa-af53-4edd-aacb-9a8e1eb1567b.png)

# III. Iterator Pattern được sử dụng khi nào?

-----


**Iterator Pattern** được sử dụng khi có một **lớp** hoặc **cấu trúc** chứa một nhóm các đối tượng được sắp xếp và muốn truy xuất phần tử bằng cách sử dụng vòng lặp `for`.

# IV. Ví dụ:

-----


Để dễ tiếp cận và hiểu rõ hơn, chúng ta sẽ xử dụng cấu trúc dữ liệu **Queue** để làm một ví dụ về **Iterator Pattern**. **Queue** trong ví dụ sẽ đóng vai trò là **Iterator Object**.
```swift
public struct Queue<T> {
  fileprivate var array = [T]()

  public var isEmpty: Bool {
    return array.isEmpty
  }
  
  public var count: Int {
    return array.count
  }

  public mutating func enqueue(_ element: T) {
    array.append(element)
  }
  
  public mutating func dequeue() -> T? {
    if isEmpty {
      return nil
    } else {
      return array.removeFirst()
    }
  }
}
```

Thực hiện adopt `Sequence` protocol để đưa **Queue** thành dạng **Iterator**.
```swift
extension Queue: Sequence {
    public func makeIterator() -> IndexingIterator<[T]> {
        return array.makeIterator()
    }
}
```

Thêm các phần tử vào **Queue**.
```swift
var queue = Queue<String>()
queue.enqueue("Element 1")
queue.enqueue("Element 2")
queue.enqueue("Element 3")
```

Truy xuất phần tử trong Queue
```swift
for element in queue {
    print(element)
}
```

# V. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- Iterator Pattern by [refactoring.guru](https://refactoring.guru/design-patterns/iterator)