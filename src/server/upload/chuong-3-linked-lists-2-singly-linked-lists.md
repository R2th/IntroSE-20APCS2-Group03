# 3.6 Singly Linked Lists
Thông thường, khi ta nói tới “linked list” sẽ mang nghĩa là một "singly linked list" ~ Danh sách liên kết đơn.\
Danh sách này bao gồm một số node trong đó mỗi node có một con trỏ tiếp theo đến phần tử sau.\
Liên kết của node cuối cùng trong danh sách là NULL, cho biết điểm kết thúc của danh sách.

![image.png](https://images.viblo.asia/07383a3f-d886-4170-ba8d-c42a012cb3ca.png)

Sau đây là một khai báo kiểu linked list:
```
public class ListNode {
	private int data;
	private ListNode next;

	public ListNode(int data) {
		this.data = data;
	}

	public int getData() {
		return data;
	}

	public void setData(int data) {
		this.data = data;
	}

	public ListNode getNext() {
		return next;
	}

	public void setNext(ListNode next) {
		this.next = next;
	}
}

```

## Basic Operations on a List
* Duyệt qua list
* Chèn một phần tử vào list
* Xóa một phần tử trong list


-----


## Traversing the Linked List
Giả sử rằng Head trỏ đến nút đầu tiên của danh sách. Để xem qua danh sách, chúng tôi làm như sau.
* Đi theo con trỏ
* Hiển thị nội dung của các nút (hoặc số lượng) khi chúng được duyệt qua.
* Dừng khi con trỏ tiếp theo trỏ đến NULL.

![image.png](https://images.viblo.asia/f500c27c-97ee-4bbf-9b3d-f30e1622f0ab.png)

Hàm $ListLength()$ nhận một linked list làm đầu vào và đếm số lượng các nút trong list.
Hàm này có thể được sử dụng để in dữ liệu danh sách với chức năng in bổ sung.
```
	public int ListLength(ListNode headNode) {
		int length = 0;
		ListNode currentNode = headNode;
		while(currentNode.next != null) {
			length++;
			currentNode = currentNode.getNext();
		}
		return length;
	}
```

Time Complexity: $O (n)$, để quét danh sách kích thước n. Space Complexity: $O (1)$, để tạo một biến tạm thời.



-----



## Singly Linked List Insertion
Thêm một phần tử vào một singly-linked list có ba trường hợp:
* Thêm một nút mới ở đầu
* Thêm một nút mới ở cuối
* Thêm một nút mới ở giữa của list(vị trí bất kỳ)

**Note**: Để thêm một phần tử trong danh sách liên kết ở vị trí p nào đó, giả sử rằng sau khi thêm, vị trí của nút mới này là p.

### Thêm một nút mới ở đầu Singly Linked List
Trong trường hợp này, một nút mới được thêm vào trước nút đầu hiện tại. Chỉ một con trỏ tiếp theo cần được sửa đổi (con trỏ tiếp theo của nút mới) và nó có thể được thực hiện theo hai bước:
* Cập nhật con trỏ tiếp theo của nút mới, để trỏ đến phần đầu hiện tại.

![image.png](https://images.viblo.asia/2881fb95-c35b-41e3-85a9-0ac39bc83637.png)
* Cập nhật head trỏ đến nút mới.

![image.png](https://images.viblo.asia/1c80cdd6-9541-4dcd-aeb8-b7b808836568.png)

### Thêm một nút mới ở cuối Singly Linked List
Trong trường hợp này, chúng ta cần sửa đổi 2 con trỏ ở 2 nút cuối cùng và nút mới thêm vào.
* Con trỏ của nút mới trỏ tới NULL

![image.png](https://images.viblo.asia/63071b86-1577-402b-9b12-91e52374cc4c.png)

* Con trỏ ở nút cuối cùng trỏ tới nút mới

![image.png](https://images.viblo.asia/2a20e228-17b6-4814-9334-b9b5a3967895.png)

### Thêm một nút mới ở giữa Singly Linked List
Trong trường hợp này, chúng ta sẽ cần phải sửa con trỏ ở 2 nút
* Nếu chúng ta muốn thêm một phần tử ở vị trí position 3 thì chúng ta dừng lại ở vị trí position 2.
Điều đó có nghĩa là chúng ta đi qua 2 nút và chèn nút mới.
Chúng ta hãy giả sử rằng nút thứ hai được gọi là position node.
Nút mới trỏ đến nút tiếp theo của vị trí mà chúng ta muốn thêm nút này.

![image.png](https://images.viblo.asia/194bd358-0e9d-4be5-a341-76110e41bd47.png)

* Con trỏ của Position node sẽ trỏ tới nút mới thêm vào.

![image.png](https://images.viblo.asia/014cb72b-bab5-4c6b-af7b-a9477726e817.png)

Lưu ý: Chúng ta có thể triển khai ba biến thể của thao tác chèn riêng biệt.

Time Complexity: $O(n)$, vì trong trường hợp xấu nhất, chúng ta có thể cần chèn nút vào cuối danh sách..\
Space Complexity: $O(1)$, để tạo một biến tạm thời.


-----


##  Singly Linked List Deletion
Tương tự như thêm nút mới, thao tác xoá chúng ta cũng có 3 trường hợp
* Xóa một nút ở đầu
* Xóa một nút ở cuối
* Xóa một nút ở giữa của list(vị trí bất kỳ)

### Xóa một nút ở đầu Singly Linked List
Xóa nút đầu khỏi danh sách có thể thực hiện trong 2 bước:
* Tạo một nút tạm thời sẽ trỏ đến cùng một nút với nút của phần đầu.

![image.png](https://images.viblo.asia/59175a11-f911-4e0c-b318-e90d13f673ab.png)
* Bây giờ, di chuyển con trỏ các nút đầu đến nút tiếp theo và loại bỏ nút.

![image.png](https://images.viblo.asia/25a78945-147e-4b17-a940-b6f42dc63782.png)

### Xóa một nút ở cuối Singly Linked List
Trong trường hợp này, nút cuối cùng bị xóa khỏi danh sách.
Thao tác này phức tạp hơn một chút so với việc loại bỏ nút đầu tiên, bởi vì thuật toán sẽ tìm một nút nằm trước nút cuối cùng.
Nó có thể được thực hiện trong ba bước:
* Duyệt qua danh sách và trong khi duyệt cũng duy trì địa chỉ nút trước đó. Khi đến cuối danh sách, chúng ta sẽ có hai con trỏ, một trỏ tới nút đuôi và một trỏ đến nút trước nút đuôi.

![image.png](https://images.viblo.asia/ad005319-c9da-41d7-92b7-387960c73d3c.png)
* Cập nhật con trỏ tiếp theo của nút cạnh nút cuối với NULL.

![image.png](https://images.viblo.asia/5fe51feb-83ee-4aad-be48-9f8b5493f09d.png)
* Loại bỏ nút cuối.

![image.png](https://images.viblo.asia/0d89eaac-9f84-4a6f-9970-6336c2023d6d.png)

### Xóa một nút ở giữa Singly Linked List
Trong trường hợp này, nút cần loại bỏ luôn nằm giữa hai nút. Việc loại bỏ như vậy có thể được thực hiện theo hai bước:
* Tương tự như trường hợp trước, duy trì nút trước đó trong khi duyệt qua danh sách. Khi chúng tôi thấy nút cần xóa, hãy thay đổi con trỏ của previos node thành con trỏ tiếp theo của nút sẽ bị xóa.

![image.png](https://images.viblo.asia/824ce203-2dcc-4506-832c-a99f0afedb2f.png)

* Loại bỏ nút hiện tại.

![image.png](https://images.viblo.asia/af9f043a-56b9-4e68-82d3-733ea48656b6.png)

Time Complexity: $O(n)$. Trong trường hợp xấu nhất, chúng ta có thể cần xóa nút ở cuối danh sách.\
Space Complexity: $O(1)$. Vì chúng tôi chỉ tạo một biến tạm thời.

### Deleting Singly Linked List
Điều này hoạt động bằng cách lưu trữ nút hiện tại trong một số biến tạm thời và giải phóng nút hiện tại.\
Sau khi giải phóng nút hiện tại, hãy chuyển đến nút tiếp theo với một biến tạm thời và lặp lại quá trình này cho tất cả các nút.\
Time Complexity: $O(n)$, để quét toàn bộ danh sách kích thước n.\
Space Complexity: $O(1)$, cho biến tạm thời.

## Implementation
```
public class LinkedList {
	// This is only field of the class. It holds the head of the list
	ListNode head;

	// Length of linked list
	private int length = 0;

	// Default constructor
	public LinkedList() {
		length = 0;
	}

	// Return the first node of list
	public synchronized ListNode getHead() {
		return head;
	}

	// Insert a node at the beginning of the list
	public synchronized void insertAtBegin(ListNode node) {
		node.setNext(head);
		head = node;
		length++;
	}

	// Insert a node at the end of the list
	public synchronized void insertAtEnd(ListNode node) {
		if (head == null) {
			head = node;
		} else {
			ListNode p, q;
			for (p = head; (q = p.getNext()) != null; p = q) {
				p.setNext(node);
			}
		}
		length++;
	}

	// Add a new value to the list at a given position
	// All values at that position to the end move over to make room.
	public void insert(int data, int position) {
		// fix the position
		if (position < 0) {
			position = 0;
		}
		if (position > length) {
			position = length;
		}

		// if the list is empty, make it be the only element
		if (head == null) {
			head = new ListNode(data);
		} else {
			// if adding at the front of the list
			if (position == 0) {
				ListNode temp = new ListNode(data);
				temp.setNext(head);
				head = temp;
			}
			// else find the correct position and insert
			else {
				ListNode temp = head;
				for (int i = 1; i < position; i++) {
					temp = temp.getNext();
				}
				ListNode newNode = new ListNode(data);
				newNode.setNext(temp.getNext());
				temp.setNext(newNode);
			}

			// the list is now one value longer
		}
	}

	//Remoce and return the node at the head of the list
	public synchronized ListNode removeFromBegin() {
		ListNode node = head;
		if (node != null) {
			head = node.getNext();
			node.setNext(null);
		}
		return node;
	}
	
	//Remove and return the node at the end of the list
	public synchronized ListNode removeFromEnd() {
		if(head == null) {
			return null;
		}
		ListNode p = head, q = null, next = head.getNext();
		if(next == null) {
			head = null;
			return p;
		}
		while((next = p.getNext()) != null) {
			q = p;
			p = next;
		}
		q.setNext(null);
		return p;
	}
	
	//Remove a node matching the specified node from the list
	//Use equals() instead of == to test for a matched node
	public synchronized void removeMatched(ListNode node) {
		if(head == null) {
			return;
		}
		if(node.equals(head)) {
			head = head.getNext();
			return;
		}
		ListNode p = head, q = null;
		while((q = p.getNext()) != null) {
			if(node.equals(q)) {
				p.setNext(q.getNext());
				return;
			}
			p=q;
		}
	}
	
	//Remove value at a given position
	//If the position is less than 0, remove the value at position 0
	//If the position is greater than 0, remove the value at last position
	public void remove(int position) {
		//fix position
		if(position < 0) {
			position = 0;
		}
		if(position >= length) {
			position = length - 1;
		}
		//if nothing in the list, do nothing
		if(head == null) {
			return;
		}
		//if removing the head element
		if(position == 0) {
			head = head.getNext();
		}
		//else advance to the correct position and remove
		else {
			ListNode temp = head;
			for(int i = 1; i < position; i++) {
				temp = temp.getNext();
			}
			temp.setNext(temp.getNext().getNext());
		}
		//reduce the length of the list
		length--;
	}
	
	//Retrun a string representation of this collection in the form ["str1", "str2", ...]
	public String toString() {
		String result = "[";
		if(head == null) {
			return result + "]";
		}
		result += head.getData();
		ListNode temp = head.getNext();
		while(temp != null) {
			result += "," + temp.getData();
			temp = temp.getNext();
		}
		return result + "]";
	}
	
	//Return the current length of the list
	public int length() {
		return length;
	}
	
	//Find the position of the first value that is equal to a given value
	//The equals method used to determine equality
	public int getPosition(int data) {
		ListNode temp = head;
		int pos = 0;
		while(temp != null) {
			if(temp.getData() == data) {
				return pos;
			}
			pos++;
			temp = temp.getNext();
		}
		//else return MIN_VALUE
		return Integer.MIN_VALUE;
	}
	
	//Remove everything from the list
	public void clearList() {
		head = null;
		length = 0;
	}
}
```