### Problem-21
Chúng ta có thể giải quyết Problem-18 bằng cách sử dụng Stack

**Solution**: Yes. Algorithm:
* Tạo hai ngăn xếp: một cho danh sách đầu tiên và một cho danh sách thứ hai.
* Duyệt qua danh sách đầu tiên và đẩy tất cả các địa chỉ node lên ngăn xếp đầu tiên.
* Duyệt qua danh sách thứ hai và đẩy tất cả các địa chỉ node vào ngăn xếp thứ hai.
* Bây giờ cả hai ngăn xếp đều chứa địa chỉ nút của các danh sách tương ứng.
* Bây giờ so sánh địa chỉ nút trên cùng của cả hai ngăn xếp.
* Nếu chúng giống nhau, hãy lấy các phần tử trên cùng từ cả hai ngăn xếp và giữ chúng trong một số biến tạm thời (vì cả hai địa chỉ nút đều là nút, chỉ cần chúng ta sử dụng một biến tạm thời là đủ).
* Tiếp tục quá trình này cho đến khi địa chỉ nút trên cùng của các ngăn xếp không giống nhau.
* Đây là điểm mà các danh sách hợp nhất thành một danh sách duy nhất.
* Trả về giá trị của biến tạm thời.

Time Complexity: $O(m + n)$, để duyệt cả 2 list.\
Space Complexity: $O(m + n)$, để tạo 2 list.

### Problem-22
Có cách nào khác để giải quyết Problem-18 không?

**Solution**: Yes, sử dụng thuật toán "Tìm kiếm phần tử đầu tiên lặp lại" trong mảng (Chi tiết bài toán này mình sẽ trình bày trong chương Search)

Algorithm:
* Tạo một mảng A và giữ tất cả các node của cả hai danh sách trong mảng.
* Trong mảng tìm phần tử lặp đầu tiên (Chương Search)
* Số lặp lại đầu tiên cho biết điểm hợp nhất của cả hai danh sách.

Time Complexity: $O(m + n)$. Space Complexity: $O(m + n)$.

### Problem-23
Có cách nào khác nữa để giải quyết Problem-18 không?

**Solution**: Yes, bằng cách kết hợp các kỹ thuật sắp xếp và tìm kiếm, chúng ta có thể giảm bớt sự phức tạp.
* Tạo một mảng A và giữ tất cả các con trỏ tiếp theo của danh sách đầu tiên trong mảng.
* Sắp xếp các phần tử mảng này.
* Sau đó, đối với mỗi phần tử của danh sách thứ hai, hãy tìm kiếm trong mảng đã sắp xếp (giả sử rằng chúng ta đang sử dụng binary search cho kết quả O (logn)).
* Vì chúng ta đang quét từng danh sách thứ hai nên phần tử lặp lại đầu tiên xuất hiện trong mảng không là gì khác ngoài điểm hợp nhất.

Time Complexity: Time for sorting + Time for searching = $O(Max(mlogm, nlogn))$.\
Space Complexity: $O(Max(m, n))$.

### Problem-24
Chúng ta có thể cải thiện độ phức tạp cho Problem-18 không?

**Solution**:Yes.\
Efficient Approach:
* Tìm độ dài (L1 và L2) của cả hai danh sách:  $O (n) + O (m) = O (max (m, n))$.
* Lấy hiệu d của độ dài: $O (1)$.
* Thực hiện d bước trong danh sách dài hơn: $O (d)$.
* Duyệt song song cả hai danh sách cho đến khi các liên kết đến nút tiếp theo khớp: $O (min (m, n))$.
* Total time complexity = $O(max(m, n))$.
* Space Complexity = $O(1)$.

```
	public static ListNode findIntersectingNode(ListNode list1, ListNode list2) {
		int L1=0, L2=0, diff=0;
		ListNode head1 = list1, head2 = list2;
		
		while(head1 != null) {
			L1++;
			head1 = head1.getNext();
		}
		while(head2 != null) {
			L2++;
			head2 = head2.getNext();
		}
		
		if(L1 < L2) {
			head1 = list2;
			head2 = list1;
			diff = L2 - L1;
		} else {
			head1 = list1;
			head2 = list2;
			diff = L1 - L2;
		}
		
		for(int i = 0; i < diff; i++) {
			head1 = head1.getNext();
		}
		
		while(head1 != null && head2 != null) {
			if(head1 == head2) {
				return head1;
			}
			head1 = head1.getNext();
			head2 = head2.getNext();
		}
		return null;
	}
```

### Problem-25
Làm thế nào bạn sẽ tìm thấy điểm giữa danh sách liên kết?

**Solution**: Brute-Force Approach: Đối với mỗi nút, hãy đếm xem có bao nhiêu nút trong danh sách và xem liệu đó có phải là nút ở giữa hay không.

Time Complexity: O(n 2 ). Space Complexity: O(1).

### Problem-26
Chúng ta có thể cải thiện mức độ phức tạp của Problem-25 không?

**Solution**: Yes
Algorithrm:
* Duyệt qua danh sách và tìm độ dài của danh sách.
* Sau khi tìm được độ dài, hãy quét lại danh sách và xác định vị trí nút n / 2 từ đầu.

Time Complexity: Time for finding the length of the list + Time for locating middle node $= O(n) + O(n) ≈ O(n)$.\
Space Complexity: O(1).

### Problem-27
Chúng ta có thể sử dụng bảng băm để giải quyết Problem-25 không?

**Solution**:Yes, lý do tương tự như của Problem-3

Time Complexity: Time để tạo hashtable $T(n) = O(n)$.\
Space Complexity: $O(n)$. Chúng ta cần tạo hashtable có kích thước n.

### Problem-28
Chúng ta có thể giải quyết Problem-25 chỉ trong một lần quét không?

**Solution**: Efficient Approach: Sử dụng hai con trỏ, di chuyển một con trỏ với tốc độ gấp đôi tốc độ của con trỏ thứ hai. Khi con trỏ đầu tiên đến cuối danh sách, con trỏ thứ hai sẽ trỏ đến nút giữa.

Note: Nếu danh sách có số nút chẵn, nút ở giữa sẽ là [n / 2].
```
	public static ListNode findMiddle(ListNode head) {
		ListNode ptr1x, ptr2x;
		ptr1x = ptr2x = head;
		int i = 0;
		
		while(ptr1x.getNext() != null) {
			if(i == 0) {
				ptr1x = ptr1x.getNext();
				i = 1;
			} else if(i == 1) {
				ptr1x = ptr1x.getNext();
				ptr2x = ptr2x.getNext();
				i = 0;
			}
		}
		
		return ptr2x;
	}
```
Time Complexity: O(n). Space Complexity: O(1).

### Problem-29
Làm thế nào bạn sẽ hiển thị một danh sách liên kết từ cuối?

**Solution**: Duyệt đệ quy tới cuối của list. Trong khi come back, chúng ta sẽ in ra phần tử.
```
    public static void printListFromEnd(ListNode head){
        if(head == null){
             return;
        }
        printListFromEnd(head.getNext());
        System.out.println(head.getData());
    }
```

Time Complexity: O(n).\
Space Complexity: O(n)→ for Stack.

### Problem-30
Kiểm tra xem độ dài Danh sách liên kết đã cho là chẵn hay lẻ?

**Solution**: Sử dụng 1 con trỏ di chuyển với tốc độ 2x(hai nút mỗi bước). Cuối cùng nếu độ dài là chẵn, con trỏ sẽ null, nếu không nó sẽ trỏ tới nút cuối cùng.
```
	public boolean isLinkedListLengthEven(ListNode head) {
		while(head != null && head.getNext() != null) {
			head = head.getNext().getNext();
		}
		if(head == null) {
			return true;
		}
		return false;
	}
```

Time Complexity: $O(⎣ n/2 ⎦) ≈O(n)$.\
Space Complexity: $O(1)$.