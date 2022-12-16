Danh sách liên kết là 1 cấu trúc dữ liệu được sử dụng để lưu trữ 1 tập hợp các dữ liệu. Danh sách liên kết có các tính chất sau:

* Các phần tử trong danh sách liên kết được kết nối bằng con trỏ.
* Phần tử cuối trỏ tới NULL.
* Có thể tăng hoặc giảm số lượng phần tử trong quá trình thực thi chương trình.
* Tối ưu dung lượng bộ nhớ.

Có 2 giải thuật chính đối với danh sách liên kết là:

* Insert: Chèn một phần tử vào vị trí bất kỳ trong danh sách liên kết.
* Delete: Xóa một phần tử ở vị trí bất kỳ trong danh sách liên kết.

Danh sách liên kết được chia làm 3 loại:

* Danh sách liên kết đơn (Singly Linked List): Mỗi một phần tử (hay còn gọi là node) trong danh sách liên kết đơn gồm có **data** và **next pointer**, **next pointer** sẽ trỏ tới node kế tiếp trong danh sách liên kết đơn. Và nếu **next pointer** trỏ tới **NULL** thì có nghĩa là node đó là node cuối cùng trong danh sách liên kết đơn.

![](https://images.viblo.asia/37da1f6a-927e-4c22-9555-06fb3351189b.png)


* Danh sách liên kết đôi (Doubly Linked List): Mỗi node trong danh sách liên kết đôi gồm có **previous pointer**, **data** và **next pointer**, **previous pointer** trỏ tới phần tử đứng trước, **next pointer** trỏ tới phần tử phía sau. Nếu **previous pointer** trỏ tới **NULL** thì có nghĩa node đó là node đứng đầu tiên trong danh sách liên kết đơn. Và tương tự với danh sách liên kết, **next pointer** trỏ tới **NULL** thì đó là node cuối trong danh sách liên kết đơn.

![](https://images.viblo.asia/85bd1011-06f5-49d9-867f-12b72b7cdc4f.png)

* Danh sách liên kết vòng tròn (Circular Linked Lists): Gần giống với danh sách liên kết đơn, nhưng khác nhau ở một điểm, **next pointer** của node cuối trỏ tới node đầu tiên của danh sách.

![](https://images.viblo.asia/ea3e2e58-0b98-433d-aced-3e8f76aec2b2.png)

Trong bài viết này, mình sẽ hướng dẫn cách cài đặt thuật toán với danh sách liên kết đơn sử dụng Javascript, và kết hợp với Jest (unit test framework) để chứng minh thuật toán mình cài đặt chạy đúng. Let's go!!!

**1. Setup**

- Các bạn clone source code tại đây để tiện theo dõi bài viết: https://github.com/DucLS/Data-structure-algorithm/tree/main/linked-list
- Mình khởi tạo 1 class là Node gồm 2 property là: **value** và **next**, đại diện cho mỗi node trong singly linked list.

```
class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

module.exports = Node;
```

- Và khởi tạo 1 class là LinkedList gồm 2 property là: **head** và **length**, đại diện cho singly linked list. Những thuật toán chèn và xóa mình sẽ viết trong class này.

```
const Node = require('./Node');

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
}

module.exports = LinkedList;
```

**2. Singly Linked List Insertion**

Đối với chèn một phần tử vào trong danh sách liên kết, gồm có 3 loại:
* Chèn vào đầu danh sách liên kết.
* Chèn vào cuối danh sách liên kết.
* Chèn vào giữa danh sách liên kết.

**Chèn vào đầu danh sách liên kết**

![image.png](https://images.viblo.asia/97c5df0c-6009-4874-afd3-5594ee5599fa.png)

Để có thể chèn 1 phần tử vào đầu danh sách liên kết, cần làm 2 bước sau:
- Tạo một **node** mới, và **next pointer** trỏ tới **head node** hiện tại.
- Update lại **head node** là **node** mới vừa tạo.

Thuận toán sẽ như sau:

- Mình tạo một method **insertAtHead** trong class **LinkedList**:

```
    insertAtHead(data) {
        const node = new Node(data, this.head);
        this.head = node;
        this.length++;
    }
```

**Chèn vào cuối danh sách liên kết**

![image.png](https://images.viblo.asia/e69ccecd-fca8-44a0-a13f-12c0a5ed9654.png)


Để có thể chèn 1 phần tử vào cuối danh sách liên kết, cần làm 2 bước sau:
- Tạo một **node** mới, và **next pointer** của node đó trỏ tới **NULL**.
- Update **next pointer** của **last node** hiện tại trỏ tới **node** mới vừa tạo.

Thuật toán sẽ như sau:

- Mình tạo một method **insertAtTail** trong class **LinkedList**:

```
    insertAtTail(data) {
        if (this.length === 0) {
            return this.insertAtHead(data);
        }

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        const node = new Node(data, null);
        current.next = node;
        this.length++;
    }
```

**Chèn vào giữa danh sách liên kết**

![image.png](https://images.viblo.asia/9cbb80b1-24af-436d-ace2-3c38449c142e.png)

Để có thể 1 phần tử vào giữa danh sách liên kết, cụ thể ở đây mình muốn chèn **node E** vào vị trí **node C** cần làm những bước sau:

- Lấy **node** ở trước vị trí mình cần chèn, cụ thể nếu mình sẽ cần lấy **node B**.
- Tạo một **node** mới với **next pointer** trỏ tới **node C**.
- Update **next pointer** của **node B** trỏ tới **node** vừa tạo.

Mình sẽ viết một method để lấy **node** ở vị trí bất kỳ:

```
    getNodeAtIndex(index) {
        if (index < 0 || index > this.length) { 
            return null;
        }

        if (index === 0) {
            return this.head;
        }

        if (index > 0 && index <= this.length - 1) {
            let current = this.head;

            for (let i = 1; i <= index; i++) {
                current = current.next;
            }

            return current;
        }
    }
```

Thuật toán sẽ như sau:

- Mình tạo một method **insertAtIndex()** trong class **LinkedList**:

```
    insertAtIndex(data, index) {
        if (index < 0) {
            return null;
        }

        if (index == 0) {
            return this.insertAtHead(data);
        }

        if (index >= this.length) {
            return this.insertAtTail(data);
        }

        const prevNode = this.getNodeAtIndex(index - 1);
        const node = new Node(data, prevNode.next);
        prevNode.next = node;
        this.length++;
    }
```

**3. Singly Linked List Deletion**

Tương tự với chèn, để xóa 1 phần tử trong danh sách liên kết gồm 3 loại:

- Xóa phần tử đầu trong danh sách liên kết.
- Xoá phần tử cuối trong danh sách liên kêt.
- Xóa phần tử bất kỳ ở giữa danh sách liên kết.

**Xóa phần tử đầu trong danh sách liên kết**

![image.png](https://images.viblo.asia/eb36eec2-fb30-4b89-8375-1c219a81197d.png)

Để xóa phần tử đầu trong danh sách liên kết, cần làm những bước sau:

- Lấy **node** ở vị trí thứ 2 trong danh sách liên kết.
- Update **head node** là **node** thứ 2.

Thuật toán sẽ như sau:

Mình tạo một method **deleteFirstNode()** trong class **LinkedList**:

```
    deleteFirstNode() {
        if (this.head === null) {
            return null;
        }

        const newFirstNode = this.head.next;
        this.head = newFirstNode;
        this.length --;
    }
```

**Xóa phần tử cuối trong danh sách liên kết**

![image.png](https://images.viblo.asia/ab2c1e1e-d257-4d25-aeb5-d28b38f35f66.png)

Để xóa phần tử cuối trong danh sách liên kết, cần làm những bước sau:

- Lấy phần tử kế cuối cuối trong danh sách liên kết.
- Update **next pointer** của phần tử vừa lấy trỏ tới **NULL**.

Thuật toán sẽ như sau:

Mình tạo một method **deleteLastNode()** trong class **LinkedList**:
```
    deleteLastNode() {
        if (this.head === null || this.head.next === null) {
            return this.deleteFirstNode();
        }

        const prevNode = this.getNodeAtIndex(this.length - 2);
        prevNode.next = null;
        this.length--;
    }
```

**Xóa phần tử ở vị trí bất kỳ ở giữa danh sách liên kết**

![image.png](https://images.viblo.asia/6ad02c40-ecf1-4ec4-b8f4-2075e2c9cf30.png)

Để xóa phần tử ở vị trí bất kỳ ở giữa danh sách liên kết, cần làm những bước sau:

- Lấy **node** cần xóa,  **previous node**  và **next node**.
- Update **next pointer** của **previous node** trỏ tới **next node**.

Thuật toán sẽ như sau:

Mình tạo một method **deleteNodeAtIndex()** trong class **LinkedList**:

```
    deleteNodeAtIndex(index) {
        if (this.head === null) {
            return null;
        }

        if (index < 0) {
            return null;
        }

        if (index === 0) {
            return this.deleteFirstNode();
        }

        if (index >= this.length - 1) {
            return this.deleteLastNode();
        }

        const prevNode = this.getNodeAtIndex(index - 1);
        const deleteNode = this.getNodeAtIndex(index);
        const nextNode = deleteNode.next;

        prevNode.next = nextNode;
        this.length --;
    }
```


**4. Lời kết**

Trong bài viết này, mình đã giới thiệu về danh sách liên kết, và các cài đặt thuật toán cho danh sách liên kết đơn. Ở bài tiếp theo, mình sẽ giới thiệu về cách cài đặt thuật toán cho [danh sách liên kết đôi](https://viblo.asia/p/cau-truc-du-lieu-va-giai-thuat-danh-sach-lien-ket-doi-doubly-linked-list-924lJ82WKPM) . Hy vọng bài viết sẽ có ích cho các bạn. Có gì chỗ nào không hiểu các bạn comment ở dưới bài viết, mình sẽ giải đáp. Happy Coding!!!