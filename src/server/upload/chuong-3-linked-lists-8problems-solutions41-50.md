### Problem-41
Đối với một giá trị K cho trước (K> 0), đảo ngược từng cụm K nodes trong list.\
Ví dụ: Input: 1 2 3 4 5 6 7 8 9 10, Output cho các giá trị K khác nhau:\
For K = 2: 2 1 4 3 6 5 8 7 10 9,\
For K = 3: 3 2 1 6 5 4 9 8 7 10,\
For K = 4: 4 3 2 1 8 7 6 5 9 10

**Solution**:
**Algorithm**: Đây là một phần mở rộng của việc hoán đổi các nút trong một danh sách liên kết.
1. Kiểm tra xem danh sách còn lại có K nút hay không.

    *  Nếu còn, lấy con trỏ của nút thứ K+1
    *  Nếu không, return
2. Đảo ngược K nodes đầu tiên
3.  Đặt con trỏ next của node cuối(sau khi đảo ngược) tới node thứ K+1
4.  Nhảy tới node K+1
5.  Về bước 1
6.  Node thứ K-1 của K nút đầu tiên trở thành head mới nếu có. Nếu không, chúng ta có thể return head.

```java
    //Phiên bản đệ quy
	public static ListNode reverseKNodesRecursive(ListNode head, int k) {
		ListNode current = head;
		ListNode next = null, prev = null;
		int count = k;
		
		//Reverse K nodes
		while(current != null && count > 0) {
			next = current.getNext();
			current.setNext(prev);
			prev = current;
			current = next;
			count--;
		}
		
		//Now next points to K+1 th node, returns the pointer to the head node
		if(next != null) {
			head.setNext(reverseKNodesRecursive(next, k));
		}
		
		//Return head node
		return prev;
	}
	
    //Phiên bản vòng lặp
	public static ListNode reverseKNodes(ListNode head, int k) {
		//Start with head
		ListNode current = head;
		//Last node after reverse
		ListNode prevTail = null;
		//First node before reverse
		ListNode prevCurrent = head;
		
		while(current != null) {
			//loop for reversing K nodes
			int count = k;
			ListNode tail = null;
			while(current != null && count > 0) {
				ListNode next = current.getNext();
				current.setNext(tail);
				tail = current;
				current = next;
				count--;
			}
			
			//reversed K nodes
			if(prevTail != null) {
				//Link this set and previous set
				prevTail.setNext(tail);
			} else {
				//we just reversed first set of K nodes, update head point to the Kth node
				head = tail;
			}
			
			//save the last node after reverse since we need to connect to the next set
			prevTail = prevCurrent;
			
			//Save the current node, which will become the last node after revsese.
			prevCurrent = current;
		}
		
		return head;
	}
	
	public static void main(String[] args) {
		ListNode l0 = new ListNode(1);
		ListNode l1 = new ListNode(2);
		ListNode l2 = new ListNode(3);
		ListNode l3 = new ListNode(4);
		ListNode l4 = new ListNode(5);
		ListNode l5 = new ListNode(6);
		ListNode l6 = new ListNode(7);
		ListNode l7 = new ListNode(8);
		ListNode l8 = new ListNode(9);
		ListNode l9 = new ListNode(10);
		
		l0.setNext(l1);
		l1.setNext(l2);
		l2.setNext(l3);
		l3.setNext(l4);
		l4.setNext(l5);
		l5.setNext(l6);
		l6.setNext(l7);
		l7.setNext(l8);
		l8.setNext(l9);
		
		l0.ListLength(l0);
		
		ListNode temp;
		temp = reverseKNodes(l0, 4);
		//temp = reverseKNodesRecursive(l0, 4);
	}
```

Ở bài này có lẽ tác giả có chút nhầm lẫn khi code, vì vẫn đảo ngược các phần tử ở lần lặp cuối, dù không còn đủ k node.\
Nên với K = 4: mình đã thử và ra kết quả là 4 3 2 1 8 7 6 5 **10 9** chứ không phải 4 3 2 1 8 7 6 5 **9 10** như đề yêu cầu.

### Problem-42
Chúng ta có thể giải quyết Problem-39 bằng đệ quy không?

**Solution**: 
```java
	public static ListNode reverseKNodes(ListNode head, int k) {
		//Start with head
		ListNode current = head;
		//last node after reverse
		ListNode prevTail = null;
		//first node before reverse
		ListNode prevCurrent = head;
		
		while(current != null) {
			//loop for reversing K nodes
			int count = k;
			ListNode tail = null;
			while(current != null && count > 0) {
				ListNode next = current.getNext();
				current.setNext(tail);
				tail = current;
				current = next;
				count--;
			}
			
			//reversed K Nodes
			if(prevTail != null) {
				//Link this set and previous set
				prevTail.setNext(tail);
			} else {
				//We just reversed first set of K nodes, update head point to the Kth node
				head = tail;
			}
			
			//Save the last node after reverse since we need to connect to the next set
			prevTail = prevCurrent;
			
			//Save the current node, which will become the last node after reverse
			prevCurrent = current;
		}
		
		return head;
	}
```

Note: Có lẽ tác giả code quá 180 phút nên quên mất bài trên code cả 2 cách rồi, đề cũng phải là Problem-41 và không dùng đệ quy nữa mới đúng cho code này 😂

![image.png](https://images.viblo.asia/a8b1a7eb-fd21-42ac-9c97-9a7d1247c61f.png)

### Problem-43
Có thể có được thời gian truy cập O (1) cho Linked Lists không?

**Solution**:
Tạo danh sách liên kết và đồng thời giữ nó trong bảng băm.

Đối với n phần tử, chúng ta phải giữ tất cả các phần tử trong một bảng băm cho thời gian tiền xử lý là O (n). Để đọc bất kỳ phần tử nào, chúng ta chỉ yêu cầu thời gian không đổi O (1) và để đọc n phần tử, chúng ta yêu cầu n * 1 đơn vị thời gian = n đơn vị.

Do đó, bằng cách sử dụng [phân tích khấu hao](https://viblo.asia/p/chuong-1-introduction-9phan-tich-khau-hao-aAY4qwpKLPw), chúng ta có thể nói rằng việc truy cập phần tử có thể được thực hiện trong thời gian O (1).

- Time Complexity – O(1) [Amortized].\
- Space Complexity - O(n) for Hash.

### Problem-44
JosephusCircle: N người đã quyết định bầu ra một người lãnh đạo bằng cách sắp xếp họ vào một vòng tròn và loại bỏ mọi người thứ M xung quanh vòng tròn, đóng hàng khi mỗi người bỏ đi.

Tìm người cuối cùng còn lại (có hạng 1).

**Solution**: Giả sử đầu vào là một danh sách liên kết tròn với N nút và mỗi nút có một số (phạm vi từ 1 đến N) được liên kết với nó. Nút đầu có số 1 là dữ liệu.

```java
	public void getJosephusPosition(int N, int M) {
		ListNode p, q;
		//Create cicular linked list containing all the players
		p = new ListNode(1);
		q = p;
		for(int i = 2; i <= N; i++) {
			ListNode temp = new ListNode(i);
			p.setNext(temp);
			p = p.getNext();
		}
		p.setNext(q);
		
		//Eliminate every M-th  player as long as more than one player remains:
		for(int count = N; count > 1; --count) {
			for(int i = 0; i < M - 1; i++) {
				p = p.getNext();
			}
			p.setNext(p.getNext().getNext());//Remove the eliminated player from the list
		}
		System.out.println("Last player left standing (Josephus Position) is " + p.getData());
	}
```


### Problem-45
Cho một danh sách được liên kết bao gồm dữ liệu, một con trỏ next và cả một con trỏ random trỏ đến một nút ngẫu nhiên của danh sách. Đưa ra một thuật toán để nhân bản list.

**Solution**: Chúng ta có thể sử dụng bảng băm để liên kết các nút mới được tạo với các phiên bản của nút
trong danh sách đã cho.

Algorithm:
* Quét danh sách ban đầu và đối với mỗi nút X, tạo một nút Y mới với dữ liệu của X, sau đó lưu trữ cặp (X, Y) trong bảng băm sử dụng X làm khóa. Lưu ý rằng trong quá trình quét này, chúng tôi đặt Y. next và Y. random thành NULL và chúng tôi sẽ sửa chúng trong lần quét tiếp theo.
* Bây giờ đối với mỗi nút X trong danh sách ban đầu, chúng ta có một bản sao Y được lưu trữ trong bảng băm của chúng ta. Chúng tôi quét danh sách ban đầu một lần nữa và thiết lập các con trỏ xây dựng danh sách mới.

```java
    puclic RandomListNode copyRandomList(RandomListNode head){
        RandomListNode X = head, Y;
        Map<RandomListNode, RandomListNode> map = new HashMap<>();
        while(X != null){
            Y = new RandomListNode(X.label);
            Y.next = null;
            Y.random = null;
            map.put(X, Y);
            X = X.next;
        }
        
        X = head;
        while(X != null){
            Y = map.get(X);
            Y.next = map.get(X.next);
            Y.random = map.get(X.random);
            X = X.next;
        }
        return map.get(head);
    }
```

Time Complexity: O(n). Space Complexity: O(n).

### Problem-46
Trong danh sách liên kết có n nút, thời gian cần thiết để chèn một phần tử vào sau một phần tử được trỏ bởi một số con trỏ là

1. $O(1)$
2. $O(logn)$
3. $O(n)$
4. $O(nlogn)$

**Solution**: 1


### Problem-47
**Find modular node:** Cho một danh sách liên kết đơn, viết hàm tìm phần tử cuối cùng từ đầu có n % k == 0 , trong đó n là số phần tử trong danh sách và k là hằng số nguyên. Ví dụ, nếu n = 19 và k = 3 thì chúng ta sẽ trả về nút thứ 18.

**Solution**: Đối với bài toán này, giá trị của n không được biết trước.
```java
	public ListNode modularNodes(ListNode head, int k) {
		ListNode modularNode = null;
		int i = 0;
		if(k <= 0) {
			return null;
		}
		
		for(; head != null; head = head.getNext()) {
			if(i%k == 0) {
				modularNode = head;
			}
			i++;
		}
		
		return modularNode;
	}
```
Time Complexity: O(n). Space Complexity: O(1).

### Problem-48
**Find modular node from the end:** Cho một danh sách liên kết đơn, hãy viết hàm tìm phần tử đầu tiên từ cuối có n% k == 0, trong đó n là số phần tử trong danh sách và k là hằng số nguyên. Ví dụ, nếu n = 19 và k = 3 thì chúng ta sẽ trả về nút thứ 16.

**Solution**: Đối với bài toán này, giá trị của n không được biết trước và nó giống như việc tìm phần tử thứ k từ cuối danh sách liên kết.

```java
	public ListNode modularNodes(ListNode head, int k) {
		ListNode modularNode = null;
		int i = 0;
		if(k <= 0) {
			return null;
		}
		
		for(i = 0; i < k; i++) {
			if(head != null) {
				head = head.getNext();
			} else {
				return null;
			}
		}
		
		while(head != null) {
			modularNode = modularNode.getNext();
			head = head.getNext();
		}
		
		return modularNode;
	}
```
Time Complexity: O(n). Space Complexity: O(1).

### Problem-49
**Find fractional node:** Cho một danh sách liên kết đơn, viết hàm tìm phần tử thứ $n / k$, với n là số phần tử trong danh sách.

**Solution**: Đối với bài toán này, giá trị của n không được biết trước.
```java
	public ListNode fractionalNodes(ListNode head, int k) {
		ListNode fractionalNode = null;
		int i = 0;
		if(k <= 0) {
			return null;
		}
		
		for(; head != null; head = head.getNext()) {
			if(i%k ==  0) {
				if(fractionalNode != null) {
					fractionalNode = fractionalNode.getNext();
				} else {
					fractionalNode = head;
				}
			}
			i++;
		}
		 
		return fractionalNode;
	}
```


### Problem-50
Trung vị trong một chuỗi số nguyên vô hạn

**Solution**:\
Trung vị là số ở giữa trong một danh sách các số đã được sắp xếp (nếu chúng ta có một số phần tử lẻ).

Nếu chúng ta có một số phần tử chẵn, trung vị là giá trị trung bình của hai số ở giữa trong một danh sách các số đã được sắp xếp.

Chúng ta có thể giải quyết vấn đề này với danh sách liên kết (với cả danh sách liên kết được sắp xếp và không được sắp xếp).

Đầu tiên, chúng ta hãy thử với một danh sách liên kết chưa được sắp xếp.\
Trong danh sách liên kết chưa được sắp xếp, chúng ta có thể chèn phần tử ở đầu hoặc ở đuôi.\
Điểm bất lợi với cách tiếp cận này là việc tìm trung vị mất $O (n)$. Ngoài ra, phép toán chèn lấy $O (1)$.

Bây giờ, chúng ta hãy thử với một danh sách liên kết được sắp xếp. Chúng ta có thể tìm thấy trung vị trong thời gian O (1) nếu chúng ta theo dõi các phần tử ở giữa. Chèn vào một vị trí cụ thể cũng là O (1) trong bất kỳ danh sách liên kết nào.

Tuy nhiên, tìm vị trí thích hợp để chèn không phải là O (logn) như trong một mảng đã sắp xếp, thay vào đó là O (n) vì chúng ta không thể thực hiện tìm kiếm nhị phân trong danh sách được liên kết ngay cả khi nó đã được sắp xếp.
Vì vậy, việc sử dụng danh sách liên kết được sắp xếp không đáng để nỗ lực vì việc chèn là O (n) và tìm trung vị là O (1), giống như mảng đã sắp xếp.

Trong mảng đã sắp xếp, phần chèn là tuyến tính do dịch chuyển, nhưng ở đây là tuyến tính vì chúng tôi không thể thực hiện tìm kiếm nhị phân trong danh sách liên kết.

Note: Một thuật toán hiệu quả hơn mình sẽ trình bày trong chương Priority Queues and Heaps,

Các bạn cũng có thể tham khảo thêm [ở đây](https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/)