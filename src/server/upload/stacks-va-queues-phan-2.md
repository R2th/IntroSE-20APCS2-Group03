# Giới thiệu
Nếu các bạn chưa tìm hiểu về Stacks và Queues, các bạn có thể coi lại bài giới thiệu về Stacks và Queues [tại đây](https://viblo.asia/p/stacks-and-queues-V3m5Wk885O7).<br>
Sau khi hiểu được khái niệm cơ bản về Stacks và Queues, chúng ta cùng đi sâu hơn một chút về cách implement Stacks và Queues bằng những loại CTDL mà chúng ta đã tìm hiểu trước đây như **Arrays**, **Hash tables.**
# Stacks
Trước khi tìm hiểu cách để implement **Stacks**, chúng ta cần nhớ lại Stacks có ba hàm chính **push**, **pop** và **peek**.<br>
Trước khi đọc đoạn code bên dưới, chúng ta hãy suy nghĩ một chút. Khá là đơn giản đúng không nào :))

Stacks là một loại CTDL mà chỉ có thể thao tác với phần tử thêm vào cuối cùng, 

### With arrays
Để implement Stacks với Arrays, chúng ta cần một Arrays để lưu giữ dữ liêu. Mỗi khi ta thêm một phần tử ta sẽ thêm vào Arrays đó. Và chúng ta sẽ chỉ thao tác với phần tử có **index = Arrays.length - 1**.<br>
Cùng thực hiện nhé.
```
class MyStack<E> {
  final List<E> _data = [];

  int get length => _data.length;

  int push(E value) {
    return (_data..add(value)).length;
  }

  E pop() {
    return _data.removeLast();
  }

  E? peek() {
    return _data.isEmpty ? null : _data.last;
  }
}
```
 
Nhìn đoạn code này chúng ta có thể thấy được cách implement một Stacks bằng Arrays, chúng ta chỉ cho phép người dùng **push**, **pop** hay **peek**.
Và qua đoạn code trên, chúng ta có thể độ phức tạp các hàm này đều chỉ là **O(1)**.
### With linked list
Tương tự như sử dụng Arrays, khi sử dụng Linked List, chúng ta cũng sẽ chỉ cho người dùng thao tác với phần tử được thêm vào cuối cùng. Và suy nghĩ một chút, để cho việc thao tác như thêm, xoá xem là nhanh nhất, mỗi khi thêm một phần tử chúng ta sẽ thêm vào **đầu** chứ không thêm vào **cuối** Linked Lists, để đảm bảo việc push, pop hay peek là nhanh nhất.
```
class MyStack<E> {
  final MyLinkedList<E> _data = MyLinkedList();

  int get length => _data.length;

  int push(E value) {
    return (_data..prepend(value)).length;
  }

  int pop() {
    return (_data..remove(0)).length;
  }

  E? peek() {
    return length > 0 ? _data.head?.value : null;
  }
}
```
Tương tự như với Arrays, Implement bằng Linked Lists cũng đơn giản và các hàm cũng có độ phức tạp tương tự như bằng Arrays.

# Queues
Trước khi thực hiện chúng ta cũng suy nghĩ lại một chút, có thể dùng Arrays và LinkedLists để implement Queues.<br>
Tất nhiên cũng có thể làm tương tự như Stacks, nhưng mà Arrays là một lựa chọn không tốt. Khi nhìn vào đoạn code Stacks phía trên, chúng ta có thể thấy việc xoá phần tử của Queues ngược với Stacks, chúng ta có thể thấy nếu dùng Arrays để implement thì việc xoá phần tử đầu tiên sẽ tồn thời gian là **O(n)**.<br>
Còn việc xoá phần tử đầu tiên của LinkedList là **O(1)**, nên việc dùng LinkedList để implement Queues sẽ là tốt hơn.<br>
Khi dùng Linked List, **ngược với Stacks,** mỗi khi thêm một phần tử, chúng ta sẽ thêm vào cuối LinkedLists, và chúng ta sẽ chỉ thao tác với phần tử thêm vào đầu tiên.
```
class MyQueue<E> {
  final MyLinkedList<E> _data = MyLinkedList();

  int get length => _data.length;

  int enqueue(E value) {
    return (_data..append(value)).length;
  }

  int dequeue() {
    return (_data..remove(0)).length;
  }

  E? peek() {
    return _data.head?.value;
  }
}
```
Qua đoạn code trên chúng ta có thể thấy việc thực hiện các hàm **enqueue**, **dequeue** và **peek** đều là **O(1).**

### Queues by Stacks
Một câu hỏi hay gặp khi phỏng vấn Stacks và Queues là hỏi liệu có thể implement Queues bằng Stacks hay không? Có thể nhưng mà về độ phức tạp thì sẽ không tốt.Tuy nhiên mình vẫn và các bạn vẫn có thể thực hiện câu hỏi đó.
```
class MyQueue<E> {
  final MyStack<E> _first = MyStack();
  final MyStack<E> _second = MyStack();

  int get length => _first.length == 0 ? _second.length : _first.length;

  void enqueue(E value) {
    if (_second.length > 0) {
      _second.push(value);
    } else {
      _first.push(value);
    }
  }

  E? dequeue() {
    if (_second.length > 0) {
      return _second.pop();
    } else {
      while (_first.length > 1) {
        _second.push(_first.pop());
      }
      return _first.pop();
    }
  }

  E? peek() {
    if (_second.length > 0) {
      return _second.peek();
    } else {
      while (_first.length > 0) {
        _second.push(_first.pop());
      }
      return _second.peek();
    }
  }
}
```
# Tổng kết
Chúng ta đã tìm hiểu xong về Stacks và Queues. Một cách để ghi nhớ đó là Stacks thì như một **chồng đĩa** còn Queues thì giống như một **hàng đợi**. Chúng ta cũng đã tìm hiểu về trường hợp có thể sử dụng và cách implement chúng.
* Ưu điểm : Ưu điểm của Stacks và Queues là chúng rất nhanh trong các thao tác của mình. Các hành động push, pop, enqueue, dequeue hay peek đều có độ phức tạp là **O(1).**.
* Nhược điểm: Nhược điểm duy nhất là các loại CTDL này hạn chế hành động của người dùng, tuy nhiên trong nhiều trường hợp đây cũng là ưu điểm do chúng ta có thể kiểm soát được hầu hết hành động của người dùng.\

[Bài trước](https://viblo.asia/p/stacks-and-queues-phan-1-V3m5Wk885O7)

[Bài sau](https://viblo.asia/p/data-structures-trees-aWj53z0pl6m)

[Link github](https://github.com/hieu-dd/data-structures-algorithms)