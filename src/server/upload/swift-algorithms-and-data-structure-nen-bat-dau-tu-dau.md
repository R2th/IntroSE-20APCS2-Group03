### Giới thiệu 
Có bao giờ các bạn tự hỏi rằng những kiến thức về thuật toán và cấu trúc dữ liệu giải thuật học được ở trên trường dùng để làm gì chưa? Có lẽ với một mobile dev ở level hiện tại của mình vẫn chưa phải đối mặt với nhiều trường hợp cần dùng đến nó. Nhưng với mình thì những thứ này là những kiến thức cơ bản mà lập trình viên nào cũng cần biết, cần thiết để tạo nên tư duy logic điều rất cần ở một lập trình viên. 
Vì khá lâu không động tới nên mình viết bài này để ôn lại những kiến thức này. Có rất nhiều Thuật toán, những cấu trúc dữ liệu. Vậy nếu mới bắt đầu chúng ta sẽ bắt đầu từ đâu? Bài viết này sẽ đề cập đến những cấu trúc dữ liệu và giải thuật phù hợp khi mới bắt đầu tìm hiểu.
### Stack
Đầu tiên sẽ là Stack, cái này giống như một mảng vậy nhưng bị hạn chế về mặt chức năng một xíu. Bạn chỉ có thể `push` - thêm vào phần tử mới vào đỉnh của `stack` và `pop` - loại bỏ phần từ ở đỉnh một `stack` và `peek` - xem phần tử ở đỉnh `stack` mà không loại bỏ phần tử đó.
Vậy tại sao chúng ta phải dùng cái thằng khuyết tật này. Hmm, trong rất nhiều thuật toán bạn sẽ muốn thêm một đối tương vào một danh sách tạm thời và đẩy chúng ra sau đó. Thường thì chúng ta sẽ cần một thứ tự cho việc thêm vào và lấy ra như vậy. Thứ tự thêm vào và lấy ra của một `stack` sẽ là `last-in-first-out` hay còn gọi là `LIFO`. Phần tử mà bạn đẩy vào cuối cùng sẽ được lấy ra đầu tiên khi gọi `pop`
Tự tạo một `stack` trong Swift rất là đơn giản: 
```
public struct Stack<T> {
  fileprivate var array = [T]()

  public var isEmpty: Bool {
    return array.isEmpty
  }

  public var count: Int {
    return array.count
  }

  public mutating func push(_ element: T) {
    array.append(element)
  }

  public mutating func pop() -> T? {
    return array.popLast()
  }

  public var top: T? {
    return array.last
  }
}
```

Có một vài điểm lưu ý về stack đó là vì stack thêm một phần tử vào cuối của mảng nên nó sẽ khiến memory cảm thấy nhẹ đầu hơn là khi bạn thêm một phần tử vào đầu mảng vì điều đó sẽ khiến tất cả những phần tử đã tồn tại trong mảng thay đổi trong bộ nhớ. Nếu cost của việc thêm vào cuối mảng là `O(1)` thì cost cho việc thêm vào đầu sẽ là `O(n)`

### Queue
Queue cũng là một dạng "khuyết tật" của array như `stack` nhưng với thứ tự thêm vào và loại ra khác. Thứ tự của `queue` là `first-in-first-out` hay còn gọi là `FIFO`. Khi thêm một phần tử vào đầu tiên bạn sẽ lấy được nó ra đầu tiên khi `dequeue` (có thể hình dung đến việc xếp  hàng, người đầu tiên xếp hàng sẽ được xử lý đầu tiên).

### Insertion sort
Tại sao không phải là Buble sort hay Quick sort, Merge sort mà lại là Insertion sort? Theo mình thấy thì Insertion sort tư tưởng đơn giản, dễ code, sẽ thực sự nhanh nếu mảng đã được sắp xếp sẵn. Nghe khá là lạ khi nếu mảng được sắp xếp sẵn :v, trong thực tế thì có rất nhiều data đã được sắp xếp sẵn rồi và khi bạn thêm mới vào những dữ liệu như vậy thì thuật toán này chạy khá tốt luôn. Tất nhiên độ khó của thuật toán `O(n^2)` khá là lớn khi so với quick sort hay merge sort chỉ có `O(n log(n))`. Nhưng với những dữ liệu nhỏ thì nó sẽ chạy không thua kém những thuật toán kia đâu.
Tư tưởng và cách cài đặt của thuật toán này rất đơn giản thôi. Insertion sort sẽ chạy theo flow là: 
* Sẽ có hai mảng: mảng chưa được sắp xếp và mảng đã được sắp xếp
* Đầu tiên, sẽ lấy một phần tử từ trong mảng chưa sắp xếp (phần tử nào cũng được nhưng thường sẽ lấy phần tử đầu theo thứ tự duyệt)
* Thêm phần tử đó vào mảng đã sắp xếp
* Đặt vị phần tử mới đó vào đúng vị trí trong mảng đã sắp xếp (theo đúng thứ tự)
* Tiếp tục lấy phần tử từ mảng chưa sắp xếp (thường sẽ lấy phần tử ngay sau phần tử vừa lấy) 
* Đặt vào mảng đã sắp xếp và swap lại đúng vị trí.
* Lặp lại cho đến khi không còn phần tử nào trong mảng chưa sắp xếp.
Các bạn có thể tham khảo code ví dụ:
```
func insertionSort(_ array: [Int]) -> [Int] {
    var a = array
    for x in 1..<a.count {
        var y = x
        while y > 0 && a[y] < a[y - 1] {
            a.swapAt(y - 1, y)
            y -= 1
        }
    }
    return a
}

```

Chúng ta cũng có thể biến nó thành một generic function để sử dụng với nhiều các kiểu dữ liệu khác. Chỉ cần thay function thành:
```
func insertionSort<T>(_ array: [T], _ isOrderedBefore: (T, T) -> Bool) -> [T] {
```
và điều kiện lặp vòng while thành:
```
 while y > 0 && isOrderedBefore(temp, a[y - 1]) {
```
Trong đó thì `isOrderedBefore: (T, T) -> Bool` là function để định nghĩa hai đối tượng kiểu T sẽ trả về `true` khi mà đối tượng bên trái nhỏ hơn đối tượng bên phải.

Trên là một vài kiến thức ôn lại và lướt qua thôi. Các bạn có thể tìm hiểu thêm về các thuật toán ở References.
### References
Swift-algorithm-club của raywenderlich: [(https://github.com/raywenderlich/swift-algorithm-club)]