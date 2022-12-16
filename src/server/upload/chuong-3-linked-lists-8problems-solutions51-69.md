### Problem-51
Hãy xem xét đoạn mã Java sau, có thời gian chạy F là một hàm có kích thước đầu vào là n.
```
		java.util.ArrayList<Integer> list = new java.util.ArrayList<Integer>();
		for(int i = 0; i < n; i++) {
			list.add(0,  i);
		}
```
Điều nào sau đây là đúng?\
1. $F(n)=Θ(n)$
2. $F(n)=Θ(n^2 )$
3. $F(n)=Θ(n^3 )$
4. $F(n)=Θ(n^4 )$
5. $F(n)=Θ(nlogn)$


**Solution**: (2)
Hoạt động list.add (0, i) trên ArrayList có độ phức tạp theo thời gian tuyến tính, đối với kích thước hiện tại của cấu trúc dữ liệu. Do đó, về tổng thể, chúng ta có độ phức tạp thời gian bậc hai.

### Problem-52
Hãy xem xét đoạn mã Java sau, có thời gian chạy F là một hàm có kích thước đầu vào là n.
```
		java.util.ArrayList<Integer> list = new java.util.ArrayList<Integer>();
		for(int i = 0; i < n; i++) {
			list.add(i,  i);
		}
        for(int j = 0; j < n; j++) {
			list.remove(n-j-1);
		}
```
Điều nào sau đây là đúng?\
1. $F(n)=Θ(n)$
2. $F(n)=Θ(n^2 )$
3. $F(n)=Θ(n^3 )$
4. $F(n)=Θ(n^4 )$
5. $F(n)=Θ(nlogn)$


**Solution**: (1) Cả hai thân vòng lặp đều có độ phức tạp constant time vì chúng xử lý ở cuối của ArrayList.


### Problem-53
Hãy xem xét đoạn mã Java sau, có thời gian chạy F là một hàm có kích thước đầu vào là n.
```
    java.util.LinkedList<Integer> k = new java.util.LinkedList<Integer>();
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            k.add(k.size()/2, j);
```
Điều nào sau đây là đúng?\
1. $F(n)=Θ(n)$
2. $F(n)=Θ(n^2 )$
3. $F(n)=Θ(n^3 )$
4. $F(n)=Θ(n^4 )$
5. $F(n)=Θ(nlogn)$


**Solution**: (4)  LinkedList phát triển đến kích thước bậc hai trong quá trình thực thi 2 vòng lặp. Do đó, phần thân của vòng lặp bên trong có độ phức tạp bậc hai. Ở vòng lặp bên trong, k.size() cần $O(n^2)$. Do đó tổng time cần $O(n^4)$


### Problem-54
Cho một danh sách liên kết đơn L: $L _ { 1 } -> L _ { 2  } -> L _ { 3 ^ { \ldots } } -> L _ { n - 1  } -> L _ { n }$, đổi thứ tự thành $L _ { 1  } -> L _ { n  } -> L _ { 2 } -> L _ { n - 1 }...$

**Solution**:
Chúng ta chia danh sách thành hai phần ví dụ 1-> 2-> 3-> 4-> 5 sẽ trở thành 1-> 2-> 3 và 4-> 5, chúng ta phải đảo ngược danh sách thứ hai và đưa ra một danh sách thay thế cả hai. Việc phân chia được thực hiện bằng một con trỏ chậm và nhanh. Giải pháp đầu tiên (sử dụng stack để đảo ngược danh sách):

```
	public void reorderList(ListNode head) {
		if(head == null) {
			return;
		}
		ListNode slowPointer = head;
		ListNode fastPointer = head;
		while(fastPointer != null && fastPointer.getNext() != null) {
			fastPointer = fastPointer.getNext().getNext();
			slowPointer = slowPointer.getNext();
		}
		
		ListNode head2 = slowPointer.getNext();
		slowPointer.setNext(null);
		LinkedList<ListNode> queue = new LinkedList<>();
		while(head2 != null) {
			ListNode temp = head2;
			head2 = head2.getNext();
			temp.setNext(null);
			queue.push(temp);
		}
		while(!queue.isEmpty()) {
			ListNode temp = queue.pop();
			temp.setNext(head.getNext());
			head.setNext(temp);
			head = temp.getNext();
		}
	}
```

1 cách tiếp cận khác: Đảo ngược toàn bộ con trỏ của List thứ 2, xem thêm [Problem-17](https://viblo.asia/p/chuong-3-linked-lists-8problems-solutions11-20-W13VM2MD4Y7)

```
	public void reorderList(ListNode head) {
		if(head == null) {
			return;
		}
		ListNode slowPointer = head;
		ListNode fastPointer = head;
		while(fastPointer != null && fastPointer.getNext() != null) {
			fastPointer = fastPointer.getNext().getNext();
			slowPointer = slowPointer.getNext();
		}
		
		ListNode head2 = slowPointer.getNext();
		slowPointer.setNext(null);
		head2 = reverseList(head2);
		alternate(head, head2);
	}
	
	public ListNode reverseList(ListNode head) {
		if(head == null) 
			return null;
		
		ListNode reversedList = head;
		ListNode pointer = head.getNext();
		reversedList.setNext(null);
		while(pointer != null) {
			ListNode temp = pointer;
			pointer = pointer.getNext();
			temp.setNext(reversedList);
			reversedList = temp;
		}
		return reversedList;
	}
	
	public void alternate(ListNode head1, ListNode head2) {
		ListNode pointer = head1;
		head1 = head1.getNext();
		boolean nextList1 = false;
		while(head1 != null || head2 != null) {
			if((head2 != null && nextList1 == false) || (head1 == null)) {
				pointer.setNext(head2);
				head2 = head2.getNext();
				nextList1 = true;
				pointer = pointer.getNext();
			} else {
				pointer.setNext(head1);
				head1 = head1.getNext();
				nextList1 = false;
				pointer = pointer.getNext();
			}
		}
	}
```

### Problem-55
Thuật toán sắp xếp nào có thể dễ dàng thích ứng với các danh sách liên kết đơn?

**Solution**:\
Insertion sort có thể dễ dàng phù hợp với  danh sách liên kết đơn. Để chèn một phần tử, danh sách liên kết được duyệt cho đến khi tìm thấy vị trí thích hợp hoặc cho đến khi đến cuối danh sách. Nó được chèn vào danh sách chỉ bằng cách điều chỉnh các con trỏ mà không cần dịch chuyển bất kỳ phần tử nào, không giống như trong mảng. Điều này làm giảm thời gian cần thiết cho việc chèn nhưng không giảm thời gian cần thiết để tìm kiếm vị trí thích hợp.


### Problem-56
Triển khai sắp xếp Insertion sort cho Linked List?

**Solution**:
```
	public ListNode insertionSortList(ListNode head) {
		if(head == null || head.getNext() == null) {
			return head;
		}
		
		ListNode newHead = new ListNode(head.getData());
		ListNode pointer = head.getNext();
		
		//loop through each element in the list
		while(pointer != null) {
			//insert this element to the new list
			ListNode innerPointer = newHead;
			ListNode next = pointer.getNext();
			if(pointer.getData() <= newHead.getData()) {
				ListNode oldHead = newHead;
				newHead = pointer;
				newHead.setNext(oldHead);
			} else {
				while(innerPointer.getNext() != null) {
					if(pointer.getData() > innerPointer.getData() && pointer.getData() <= innerPointer.getNext().getData()) {
						ListNode oldNext = innerPointer.getNext();
						innerPointer.setNext(pointer);
						pointer.setNext(oldNext);
					}
					innerPointer = innerPointer.getNext();
				}
				if(innerPointer.getNext() == null && pointer.getData() > innerPointer.getData()) {
					innerPointer.setNext(pointer);
					pointer.setNext(null);
				}
			}
			//finally
			pointer = next;
		}
		return newHead;
	}
```

Note: chi tiết về sắp xếp Insertion Sort mình sẽ trình bày trong chương về Sorting.

### Problem-57
Cho một danh sách, xoay danh sách sang phải k vị trí, trong đó k không âm. Ví dụ: Cho $1-> 2-> 3-> 4-> 5-> NULL$ và k = 2, trả về $4-> 5-> 1-> 2-> 3-> NULL$.

**Solution**:
```
	public ListNode rotateRight(ListNode head, int n) {
		if(head == null || head.getNext() == null) {
			return head;
		}
		
		ListNode rotateStart = head, rotateEnd = head;
		while(n-- > 0) {
			rotateEnd = rotateEnd.getNext();
			if(rotateEnd == null) {
				rotateEnd = head;
			}
		}
		
		if(rotateStart == rotateEnd) {
			return head;
		}
		
		while(rotateEnd.getNext() != null) {
			rotateStart = rotateStart.getNext();
			rotateEnd = rotateEnd.getNext();
		}
		ListNode temp = rotateStart.getNext();
		rotateEnd.setNext(head);
		rotateStart.setNext(null);
		return temp;
	}
```
Time Complexity: O(n). Space Complexity: O(1).

### Problem-58
Ta có 2 linked list chứa các số không âm. Các chữ số được lưu trữ theo thứ tự ngược lại và mỗi nút của chúng chứa một chữ số duy nhất.
Thêm hai số và trả lại nó dưới dạng một danh sách được liên kết.
Ví dụ với đầu vào: $(3 -> 4 -> 3) + (5 -> 6> 4)$; đầu ra phải là $8 -> 0 -> 8$.


**Solution**:
```
	public ListNode addTwoNumbers(ListNode list1, ListNode list2) {
		if(list1 == null) {
			return list2;
		}
		if(list2 == null) {
			return list1;
		}
		
		ListNode head = new ListNode(0);
		ListNode cur = head;
		int advance = 0;
		while(list1 != null && list2 != null) {
			int sum = list1.getData() + list2.getData() + advance;
			advance = sum/10;
			sum = sum%10;
			cur.setNext(new ListNode(sum));
			cur = cur.getNext();
			list1 = list1.getNext();
			list2 = list2.getNext();
		}
		
		if(list1 != null) {
			if(advance != 0) {
				cur.setNext(addTwoNumbers(list1, new ListNode(advance)));
			}else {
				cur.setNext(list1);
			}
		}else if(list2 != null) {
			if(advance != 0) {
				cur.setNext(addTwoNumbers(list2, new ListNode(advance)));
			}else {
				cur.setNext(list2);
			}
		}else if(advance == 0) {
			cur.setNext(new ListNode(advance));
		}
		return head.getNext();
	}
```

### Problem-59
Cho một danh sách liên kết và một giá trị K, hãy phân vùng nó sao cho tất cả các nút nhỏ hơn K đến trước các nút lớn hơn hoặc bằng K.
Bạn nên bảo toàn thứ tự tương đối ban đầu của các nút trong mỗi phân vùng.
Ví dụ, cho $1-> 4-> 3-> 2-> 5-> 2$ và $K = 3$, trả về $1-> 2-> 2-> 4-> 3-> 5$.

**Solution**:
```
	public ListNode partition(ListNode head, int K) {
		ListNode root = new ListNode(0);
		ListNode pivot = new ListNode(K);
		ListNode rootNext = root, pivotNext = pivot;
		ListNode currentNode = head;
		while(currentNode != null) {
			ListNode next = currentNode.getNext();
			if(currentNode.getData() >= K) {
				pivotNext.setNext(currentNode);
				pivotNext = currentNode;
				pivotNext.setNext(null);
			}else {
				rootNext.setNext(currentNode);
				rootNext = currentNode;
			}
			currentNode = next;
		}
		rootNext.setNext(pivot.getNext());
		return root.getNext();
	}
```

Time Complexity: O(n). Space Complexity: O(1).

### Problem-60
Hợp nhất k danh sách liên kết đã được sắp xếp và trả lại nó dưới dạng một danh sách được sắp xếp.

**Solution**: Mình sẽ trình bày chi tiết trong chương 
Priority Queues

**Note**: Problem tiếp theo tác giả nhảy hẳn từ 60 lên 66, chắc lại code quá 180p rồi, mình sẽ để đúng như nguyên tác 😎

### Problem-66
Đưa ra một danh sách liên kết không có thứ tự, làm cách nào để bạn loại bỏ các bản sao trong đó?

**Solution**:
```
	public static void removeDuplicate(ListNode head) {
		ListNode curr = head;
		if(curr == null || curr.getNext() == null) {
			return; // 0 or 1 node in the list so no duplicates
		}
		ListNode curr2, prev;
		while(curr != null) {
			curr2 = curr.getNext();
			prev = curr;
			while(curr2 != null) {
				//check and see if curr and curr2 values are the same, if they are then delete curr2
				if(curr.getData() == curr2.getData()) {
					prev.setNext(curr2.getNext());
				}
				prev = curr2;
				curr2 = curr2.getNext();
			}
			curr = curr.getNext();
		}
	}
```

### Problem-67
Có thể giảm time complexity của Problem-66

**Solution**: Chúng ta có thể chỉ cần sử dụng hash table và kiểm tra xem một phần tử đã tồn tại hay chưa.
```
	public static void removeDuplicate2(ListNode head) {
		Map<Integer, Boolean> mapper = new HashMap<>();
		ListNode curr = head;
		ListNode next;
		while(curr.getNext() != null) {
			next = curr.getNext();
			if(mapper.get(next.getData()) != null) {
				//already seen it, so delete
				curr.setNext(next.getNext());
			}else {
				mapper.put(next.getData(), true);
				curr = curr.getNext();
			}
		}
	}
```

### Problem-68
Cho một danh sách được liên kết với các số chẵn và lẻ, hãy tạo một thuật toán để thực hiện các thay đổi đối với danh sách sao cho tất cả các số chẵn đều xuất hiện ở đầu.

**Solution**: Để giải quyết vấn đề này, chúng ta có thể sử dụng logic phân tách. Trong khi duyệt qua danh sách, hãy chia danh sách được liên kết thành hai: một chứa tất cả các nút chẵn và nút kia chứa tất cả các nút lẻ. Bây giờ, để có được danh sách cuối cùng, chúng ta có thể chỉ cần nối danh sách liên kết nút lẻ sau danh sách liên kết nút chẵn.\
Để tách danh sách được liên kết, hãy duyệt qua danh sách được liên kết ban đầu và di chuyển tất cả các nút lẻ sang một danh sách được liên kết riêng biệt của tất cả các nút lẻ. Vào cuối vòng lặp, danh sách ban đầu sẽ có tất cả các nút chẵn và danh sách nút lẻ sẽ có tất cả các nút lẻ. 

Time Complexity: O(n). Space Complexity: O(1).
### Problem-69
Đưa ra hai danh sách liên kết được sắp xếp, đưa ra một thuật toán để in các phần tử chung của chúng.

**Solution**:\
Giải pháp dựa trên merge sort logic. Giả sử hai danh sách được liên kết đã cho là:
  list1 và list2. Vì các phần tử được sắp xếp theo thứ tự, chúng tôi chạy một vòng cho đến khi chúng tôi đến cuối một trong hai danh sách. Chúng ta so sánh các giá trị của list1 và list2. Nếu các giá trị bằng nhau, chúng tôi thêm nó vào danh sách chung. Chúng ta di chuyển list1 / list2 / cả hai nút tới con trỏ tiếp theo nếu các giá trị được trỏ bởi list1 nhỏ hơn / nhiều hơn / bằng giá trị được trỏ bởi list2.

```
	public static ListNode commonElement(ListNode list1, ListNode list2) {
		ListNode temp = new ListNode(0);
		ListNode head = temp;
		while(list1 != null && list2 != null) {
			if(list1.getData() == list2.getData()) {
				head.setNext(new ListNode(list1.getData()));
				list1 = list1.getNext();
				list2 = list2.getNext();
				head = head.getNext();
			} else if(list1.getData() > list2.getData()) {
				list2 = list2.getNext();
			} else {
				list1 = list1.getNext();
			}
		}
		return temp.getNext();
	}
```

Time complexity $O(m + n)$, trong đó m là độ dài của list1 và n là độ dài của list2.\
Space complexity: $O(1)$.


\
\
\
\
Yeah, vậy là đã kết thúc được chương 3 về Linked List, lý thuyết thì ít mà các vấn đề xoay quanh nó khá là nhiều. Hi vọng mọi người vẫn còn hứng thú cho những phần tiếp theo 😁