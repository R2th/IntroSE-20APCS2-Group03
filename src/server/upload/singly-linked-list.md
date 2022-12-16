# Tổng quan
Hai bài trước chúng ta đã tìm hiểu về Array và Hash Table. Và chúng ta thấy cả hai loại cấu trúc dữ liệu đều có những nhược điểm của mình.<br>
Với **Array** : Chúng ta thường gặp phải vấn đề là chèn hoặc xoá một phần tử chậm và mỗi khi thêm phần tử đến giới hạn, ta lại phải sao chép toàn bộ data sang một vùng nhớ có kích thước lớn gấp đôi.<br>
Với **Hash Table** : Hàm băm khá là tuyệt, nó sẽ lo cho chúng ta việc lưu bộ nhớ, nhưng tiếc là mảng băm không có thứ tự và bộ nhớ sẽ được lưu rải rác.<br>
Để giải quyết những vấn đề trên chúng ta có thể sử dụng một loại CTDL mới là **Linked List**.<br>
Nói vậy không có nghĩa Linked List là tốt nhất và ta sẽ luôn sử dụng Linked List, chúng ta luôn có những sự đánh đổi khi dùng một loại CTDL.

# Linked List là gì?
Như tên gọi của nó, đó là một loại danh sách có liên kết.
Có hai loại Linked List đó là  **Singly Linked List**  và **Doubly Linked List.**
Trong bài này chúng ta sẽ tìm hiểu về **Singly Linked List** trước.

# Singly Linked List
![image.png](https://images.viblo.asia/9230ca44-0288-47b3-8dd9-4f390a10223f.png)<br>
Như hình vẽ ta có thể thấy mỗi một khối xanh-xanh lá là một **Node**, mỗi Node chứa một **giá trị (value)** và một **con trỏ (pointer)** trỏ đến Node tiếp theo. Node đầu được gọi là **Head**, nốt cuối gọi là **Tail**.<br>
Khi một phần tử mà con trỏ trỏ đến Node tiếp theo là **Null**, ta biết đó là phần tử cuối cùng và là **Tail**.<br>
Bạn có thể thấy Linked List là một CTDL khá đơn giản, **nó là một phần tử liên kết với phần tử tiếp theo với phần tử tiếp theo và giữ cho đến khi phần tử cuối cùng trỏ đến Null.**

# Con trỏ (Pointer)
Chắc hẳn các bạn cũng đã từng nhiều lần nghe đến khái niệm **con trỏ** và cũng nhiều bạn vẫn còn mơ hồ về khái niệm này.<br>
Hiểu đơ giản thì con trỏ là một tham chiếu đến một vị trí khác, một bộ nhớ khác hoặc một đối tượng khác, ở đây là một Node khác.<br>
Chúng ta cùng xem qua một ví dụ:
```
 final obj1 = {'value': 1};
  final obj2 = obj1;
  obj1['value'] = 2;
  print(obj2);
```
Và kết quả nhận được:
```
dart implement.dart
{value: 2}
```
Kết quả xảy ra như vậy là ở đây tôi đã tạo ra một con trỏ ở đây nói rằng đối tượng **obj2** sẽ tham chiếu đến **obj1** và cả 2 đối tượng sẽ cùng trỏ đến một vị trí bộ nhớ, con trỏ ở đây đơn giản là một vị trí trong bộ nhớ.<br>
# Cách implement và các hàm cơ bản
Chúng ta cùng xem qua một cách implement từ đầu một Linked List
```
class Node<E> {
  final E value;
  Node? next;

  Node(this.value, this.next);
}

class MyLinkedList<E> {
  Node? head;
  Node? tail;
  var length = 0;

  MyLinkedList(E value) {
    head = Node(value, null);
    tail = head;
    length = 1;
  }

  Node append(value) {
    final newNode = Node(value, null);
    tail!.next = newNode;
    tail = newNode;
    length++;
    return head!;
  }

  Node appendAll(List<E> values) {
    values.forEach((element) {
      append(element);
    });
    return head!;
  }

  Node prepend(value) {
    final newNode = Node(value, head);
    head = newNode;
    length++;
    return head!;
  }

  Node insert(index, value) {
    if (index > length) {
      throw Exception("Out of index");
    } else if (index == 0) {
      prepend(value);
    } else if (index == length) {
      append(value);
    } else {
      final leadNode = traverseToIndex(index - 1);
      final newNode = Node(value, leadNode!.next);
      leadNode.next = newNode;
    }
    length++;
    return head!;
  }

  Node? remove(index) {
    if (index >= length) {
      throw Exception("Out of index");
    } else if (index == 0) {
      head = head!.next;
    } else {
      final leadNode = traverseToIndex(index - 1);
      final removeNode = leadNode!.next;
      leadNode.next = removeNode!.next;
      removeNode.next = null;
    }
    length--;
    return head;
  }

  Node? traverseToIndex(int index) {
    var count = 0;
    var temp = head;
    while (count != index) {
      temp = temp!.next;
      count++;
    }
    return temp;
  }

  Node? reverse() {
    if (length == 1) {
      return head;
    }
    var first = head;
    var second = first!.next;
    while (second != null) {
      var temp = second.next;
      second.next = first;
      first = second;
      second = temp;
    }
    head!.next = null;
    head = first;
    return head;
  }
}
```
Qua đoạn code trên ta có thể thấy mỗi phần tử của Linked List là một **Node(value, next)**. <br>
Một Linked List bao gồm có **Head** (phần tử đầu) **Tail** (phần tử cuối), **length** (độ dài) và một chuỗi các Node liên kết với nhau.
Tiếp theo chúng ta sẽ tìm hiểu sâu hơn vào các hàm cơ bản của Linked List.
### Append
```
final newNode = Node(value, null);
tail!.next = newNode;
tail = newNode;
length++;
```
Qua đoạn code trên, chúng ta có thể thấy việc thêm một Node mới vào cuối của Linked List là khá đơn giản, chỉ cần update lại con trỏ của  **phần tử cuối cùng(tail)**  trỏ vào Node mới và update Node mới là phần tử cuối cùng.<br>
Chúng ta có thể thấy độ phức tạp hàm này là  **O(1)**.
### Prepend
```
final newNode = Node(value, head);
head = newNode;
length++;
```
Tương tự, việc thêm vào đầu Linked List cũng khá đơn giản và có độ phức tạp là **O(1)**, chỉ cần update Node mới trỏ và head và update node mới là head.
### Get
```
  Node? get(int index) {
    var count = 0;
    var temp = head;
    while (count != index) {
      temp = temp!.next;
      count++;
    }
    return temp;
  }
```
Việc look up phần tử của Linked List bắt buộc cần di chuyển tuần tự từ Head và đi tới vị trí cần lấy, nên việc tìm kiếm phần tử theo chỉ mục của Linked List sẽ có độ phức tạp là **O(n).**
### Insert
```
if (index > length) {
      throw Exception("Out of index");
    } else if (index == 0) {
      prepend(value);
    } else if (index == length) {
      append(value);
    } else {
      final leadNode = traverseToIndex(index - 1);
      final newNode = Node(value, leadNode!.next);
      leadNode.next = newNode;
    }
    length++;
```
Việc insert như chúng ta thấy nếu insert vào đầu hoặc cuối thì sẽ tương tự với việc **append** hoặc **prepend**.<br>
Nhưng nếu chèn một phần tử vào giữa thì sẽ phức tạp hơn, chúng ta sẽ cần tìm Node tại vị trí **index-1**, sau đó cập nhật con trỏ của Node mới vào **Node(index)** và cập nhật con trỏ next của **Node(index-1)** vào Node mới tạo.<br>
Vì muốn thêm một phần tử vào vị trí **index**, ta cần **tìm phần từ tại vị trí index-1** nên việc chèn một phần tử vào LinkedList sẽ là **O(n)**.
### Remove
```
Node? remove(index) {
    if (index >= length) {
      throw Exception("Out of index");
    } else if (index == 0) {
      head = head!.next;
    } else {
      final leadNode = get(index - 1);
      final removeNode = leadNode!.next;
      leadNode.next = removeNode!.next;
      removeNode.next = null;
    }
    length--;
    return head;
  }
```
Tương tự, việc xoá một phần tử ở giữa LinkedList thì ta cũng cần tìm phần tử ở vị trí **index-1** và cập nhật lại con trỏ của vị trí **index-1** sẽ trỏ đến vị trí **index+1.** nên độ phức tạp cũng là **O(n)**.
# Tạm kết
Chúng ta vừa đi qua một lượt về Singly Linked List, trong bài tiếp theo chúng ta sẽ tìm hiểu về Doubly LinkedList và đánh giá cách sử dụng chúng.<br>
Cảm ơn các bạn.


[Link Github](https://github.com/hieu-dd/data-structures-algorithms/tree/master/bin/datastructures/linkedlist/singly_linked_list)