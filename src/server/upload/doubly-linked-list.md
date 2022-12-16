# Tổng quan
Tiếp theo chúng ta sẽ tiếp tục tìm hiểu về một loại Linked List khác, được gọi là Doubly Linked List. Để dễ theo dõi các bạn nên tìm hiểu trước tổng quan về Linked List và Singly Linked List.<br>
Các bạn có thể tham khảo [tại đây](https://viblo.asia/p/singly-linked-list-924lJBzWlPM)
# Doubly Linked List
![image.png](https://images.viblo.asia/e4c12f9d-5d32-4e54-b4dc-d72bde0fcbef.png)<br>
Quan sát  hình vẽ, tương tự như Singly Linked List, mỗi Node của Doubly Linked List cũng giống như Node của Singly Linked List, tuy nhiên nó sẽ **có thêm 1 con trỏ** nữa để chỉ vào **phần tử trước** của nó trong danh sách.<br>
Nếu các bạn đã xem bài trước của tôi, thì bây giờ chắc các bạn đã hình dung ra được **Singly Linked List** và **Doubly Linked List** khác nhau ở điểm nào.
# Cách implement và các hàm cơ bản
Chúng ta cùng xem cách implement một Doubly Linked List:
```
class Node<E> {
  final E value;
  Node? next;
  Node? previous;

  Node(this.value, this.next, this.previous);
}

class DoublyLinkedList<E> {
  Node? head;
  Node? tail;
  var length = 0;

  DoublyLinkedList(E value) {
    head = Node(value, null, null);
    tail = head;
    length = 1;
  }

  Node append(value) {
    final newNode = Node(value, null, tail);
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
    final newNode = Node(value, head, null);
    head!.previous = newNode;
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
      final currentNode = traverseToIndex(index);
      final leadNode = currentNode!.previous;
      final newNode = Node(value, currentNode, leadNode);
      leadNode!.next = newNode;
      currentNode.previous = newNode;
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
      final notNeedNode = traverseToIndex(index)!;
 ****     final leadNode = notNeedNode.previous;
      final trailNode = notNeedNode.next;
      leadNode!.next = trailNode;
      trailNode!.previous = leadNode;
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
}
```
Qua đoạn code trên các bạn mỗi Node của Doubly Linked List sẽ gồm các **value**(giá trị), **next**(con trỏ tới phần tử kế tiếp) và **previous**(con trỏ phần tử trước).<br>
Doubly Linked List cũng bao gồm **Head**(phần tử đầu tiên), **Tail**(phần tử cuối) và **length**(số lượng node) và một chuỗi các Node được liên kết với nhau.

Tiếp theo chúng ta cũng tìm hiểu về các hàm của Doubly Linked List
### Append
```
 Node append(value) {
    final newNode = Node(value, null, null);
    newNode.previous = tail;
    tail!.next = newNode;
    tail = newNode;
    length++;
    return head!;
  }
```
Tương tự như Singly Linked List, khi thêm một phần tử vào cuối, độ phức tạp của hàm này cũng sẽ là **O(1).** Tuy nhiên, trước khi cập nhập **newNode** là tail, ta cũng cần cập nhật thêm  `newNode.previous = tail;` .
### Prepend
```
  Node prepend(value) {
    final newNode = Node(value, null, null);
    newNode.next = head;
    head!.previous = newNode;
    head = newNode;
    length++;
    return head!;
  }
```
Tương tự, việc thêm một Node vào đầu của Doubly Linked List cũng là **O(1)**. Tuy nhiên trước khi cập nhật lại head, ta cũng cần nhờ update con trỏ **previous** của head là **newNode**.
### Get
Hàm get của Doubly Linked List hoàn toàn giống với Singly Linked List, tuy nhiên ta cũng có thể cập nhật nếu vị trí ở gần đuôi hơn, ta có thể đọc ngược từ đuôi để có thể tìm kiếm nhanh hơn. Tất nhiên độ phức tạp của hàm này vẫn là **O(n)**.
### Insert và Remove
```
Node insert(index, value) {
    if (index > length) {
      throw Exception("Out of index");
    } else if (index == 0) {
      prepend(value);
    } else if (index == length) {
      append(value);
    } else {
      final currentNode = traverseToIndex(index);
      final leadNode = currentNode!.previous;
      final newNode = Node(value, currentNode, leadNode);
      leadNode!.next = newNode;
      currentNode.previous = newNode;
    }
    length++;
    return head!;
  }
```

```
Node? remove(index) {
    if (index >= length) {
      throw Exception("Out of index");
    } else if (index == 0) {
      head = head!.next;
    } else {
      final notNeedNode = traverseToIndex(index)!;
      final leadNode = notNeedNode.previous;
      final trailNode = notNeedNode.next;
      leadNode!.next = trailNode;
      trailNode!.previous = leadNode;
    }
    length--;
    return head;
  }
```
Cả việc insert và remove đều không khác quá so với Singly Linked List, tuy nhiên chúng ta đều cần thêm một việc đó là cập nhật lại các con trỏ **previous** cho chính xác.

Chúng ta vừa tìm hiểu cách implement và các hàm cơ bản của Doubly Linked List. Tiếp theo chúng ta cùng xem cách dùng chúng.
# So sánh và cách dùng
* Singly Linked List: 
    * Ưu điểm của Singly Linked List là tốn ít bộ nhớ hơn, qua việc implement chúng ta cũng thấy việc implemet là đơn giản hơn, các thao tác chèn, xoá cũng đơn giản hơn.
    * Nhược điểm: Không thể lặp lại theo hướng ngược lại hoặc trở về phía trước, do đó nếu chúng ta đánh mất con trỏ đến danh sách đơn này thì ta có thể mất danh sách đơn trong bộ nhớ mãi mãi.
* Doubly Linked List:
    * Ưu điểm: Có thể lặp lại từ hai phía, việc tìm kiếm có thể sẽ nhanh hơn vì có thể thao tác từ hai phía

Vì vậy chúng ta chúng ta sử dụng Singly Linked List trong trường hợp chúng ta có ít bộ nhớ hoặc bộ nhớ thực sự tốn kém và cần cẩn thận khi sử dụng bộ nhớ, còn nếu không Doubly Linked List là một lựa chọn phù hợp.

# Tổng kết
* Ưu điểm: 
    * So với Array thì Linked List  sẽ có thời gian chèn hoặc xoá một phần tử nhanh hơn, flexible size.
    * So với Hash Table thì sẽ có thứ tự hơn.
* Nhược điểm:
    * Thời gian tìm kiếm chậm O(n)
    * Tốn bộ nhớ hơn.
  
  Linked List không được tạo sẵn trong một số ngôn ngữ, ví dụ như JavaScript bởi vì nó là một CTDL cấp thấp. Tuy nhiên nó được ứng dụng khá nhiều trong các CTDL khác như giải quyết Collision của Hash Table hay Stack, Queue mà chúng ta sẽ tìm hiểu trong bài tiếp theo. Nó cũng được triền khai trong hệ thống tệp trên máy tính hoặc lịch sử trên trình duyệt...
  
  [Bài trước](https://viblo.asia/p/singly-linked-list-924lJBzWlPM)
  
  [Bài sau](https://viblo.asia/p/stacks-and-queues-V3m5Wk885O7)
  
  [Link Github](https://github.com/hieu-dd/data-structures-algorithms/tree/master/bin/datastructures/linkedlist)
  
#   Hẹn gặp lại các bạn