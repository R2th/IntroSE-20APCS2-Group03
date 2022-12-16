### Problem-1
Triển khai một Stack sử dụng Linked List

**Solution**: Mình sẽ trình bày chi tiết khi viết tới chương Stacks

### Problem-2
Tìm node thứ n từ cuối của Linked List

**Solution**:\
Đơn giản thì chúng ta có thể sử dụng **Brute-Force** Method: \
Bắt đầu với nút đầu tiên và đếm số lượng nút hiện diện sau nút đó. Nếu số nút $< n - 1$ thì trả về thông báo "số nút trong danh sách ít hơn số cần tìm".\
Nếu số nút $> n - 1$ thì chuyển sang node tiếp theo. Tiếp tục điều này cho đến khi số nút sau node hiện tại cho tới node cuối cùng là $n - 1$.

Độ phức tạp thời gian: $O (n^2)$, để quét danh sách còn lại (từ nút hiện tại) cho mỗi nút.\
Độ phức tạp không gian: $O (1)$.

### Problem-3
Chúng ta có thể cải thiện mức độ phức tạp của Problem-2 không?

**Solution**:\
Có, bằng cách sử dụng hash table. Ví dụ, hãy xem xét danh sách sau:

![image.png](https://images.viblo.asia/3d273aed-02da-44d7-824b-0b33df9bed44.png)

Trong cách tiếp cận này, hãy tạo một bảng băm có các mục nhập là <vị trí của nút, địa chỉ nút>.\
Điều đó có nghĩa là, key là vị trí của nút trong danh sách và value là địa chỉ của nút đó.


| Position in List | Address of Node | 
| -------- | -------- |
| 1     | Address of 5 node     | 
| 2     | Address of 1 node     | 
| 3     | Address of 17 node     | 
| 4     | Address of 4 node     | 

Vào thời điểm chúng tôi duyệt qua toàn bộ danh sách(để tạo hash table), chúng tôi có độ dài danh sách.\
Giả sử độ dài danh sách là M. Để tìm node thứ n từ cuối danh sách liên kết, chúng ta có thể chuyển nó thành tìm vị trí thứ $M - n + 1$ từ đầu của list.\
Vì chúng ta đã biết độ dài của danh sách, vấn đề giờ chỉ là việc trả về giá trị khóa thứ $M - n + 1$ từ bảng băm.
Time Complexity: Thời gian để tạo bảng băm, $T (m) = O (m)$.\
Space Complexity: chúng ta cần tạo một bảng băm có kích thước m, $O(m)$.

### Problem-4
Chúng ta có thể sử dụng cách tiếp cận Problem-3 để giải quyết Problem-2 mà không cần tạo hash table không?

**Solution**:\
Có.\
Nếu chúng ta quan sát solution cho Problem-3, những gì chúng ta đang thực sự làm là tìm kích thước của linked list.\
Điều đó có nghĩa là chúng ta đang sử dụng bảng băm để tìm kích thước của danh sách liên kết.\
Chúng ta có thể tìm thấy độ dài của danh sách được liên kết chỉ bằng cách duyệt qua list từ node đầu.Vì vậy chúng ta có thể có được độ dài mà không cần tạo bảng băm.\
Sau khi tìm được độ dài, hãy tính $M - n + 1$ và với một lần duyệt nữa, chúng ta có thể nhận được nút thứ $M - n + 1$ ngay từ đầu.\
Giải pháp này cần hai lần duyệt: một để tìm độ dài của danh sách và một để tìm nút thứ M - n + 1 từ đầu.

Time Complexity: Thời gian tìm độ dài + Thời gian tìm nút thứ $M - n + 1$ tính từ đầu.
Do đó, $T (n) = O (n) + O (n) ≈ O (n)$.\
Space Complexity: $O (1)$.
Do không cần tạo bảng băm.

### Problem-5
Chúng ta có thể giải quyết Problem-2 trong một lần quét không?

**Solution**:\
**Yes. Efficient Approach**\
Sử dụng hai con trỏ pNthNode và pTemp.\
Ban đầu, cả hai đều trỏ đến nút đầu của danh sách.\
pNthNode chỉ bắt đầu di chuyển sau khi pTemp thực hiện n lần di chuyển.\
Từ đó cả hai di chuyển về phía trước cho đến khi pTemp đến cuối danh sách.\
Kết quả là pNthNode trỏ đến nút thứ n từ cuối danh sách liên kết.

**Note**: Tại bất kỳ thời điểm nào, cả hai đều di chuyển một nút tại một thời điểm.
```
	public ListNode NthNodeFromEnd(ListNode head, int NthNode) {
		ListNode pTemp = head, pNthNode = null;
		for(int count = 1; count < NthNode; count++) {
			if(pTemp != null) {
				pTemp = pTemp.getNext();
			}
		}
		
		while(pTemp != null) {
			if(pNthNode == null) {
				pNthNode = head;
			} else {
				pNthNode = pNthNode.getNext();
			}
			
			pTemp = pTemp.getNext();
		}
		
		if(pNthNode != null) {
			return pNthNode;
		}
		
		return null;
	}
```

Time Complexity: O(n).\
Space Complexity: O(1).

### Problem-6
Chúng ta có thể giải quyết Problem-5 bằng đệ quy không?

**Solution**:\
Yes, chúng ta có thể sử dụng một biến toàn cục trong hàm đệ quy và trả về khi giá trị bằng n.
```
	
	public ListNode NthNodeFromEnd(ListNode head, int NthNode) {
		if(head != null) {
			NthNodeFromEnd(head.getNext(), NthNode);
			counter++;
			if(counter == NthNode) {
				return head;
			}
		}
		return null;
	}
```

Time Complexity: O(n) cho các cuộc gọi đệ quy trước và O (n) cho các cuộc gọi đệ quy sau, là $O (2n) = O (n)$.\
Space Complexity: O(n) cho ngăn xếp đệ quy.

### Problem-7
Kiểm tra xem danh sách được liên kết đã cho là kết thúc NULL hay kết thúc trong một cycle (theo chu kỳ)

**Solution**:\
**Brute-Force Approach**\
Ví dụ, hãy xem xét danh sách liên kết sau đây có một vòng lặp trong đó.
Sự khác biệt giữa danh sách này và danh sách thông thường là, trong danh sách này, có hai nút có con trỏ tiếp theo giống nhau.\
Trong danh sách được liên kết đơn thông thường (không có vòng lặp), mỗi con trỏ tiếp theo của nút là duy nhất.
Điều đó có nghĩa là sự lặp lại của các con trỏ tiếp theo chỉ ra sự tồn tại của một vòng lặp.

![image.png](https://images.viblo.asia/7bcf1572-07cf-4b2e-91f1-fffe875f69bd.png)

Một cách đơn giản và thô bạo để giải quyết vấn đề này là bắt đầu với nút đầu tiên và xem liệu có bất kỳ nút nào có con trỏ tiếp theo là địa chỉ của nút hiện tại hay không.\
Nếu có một nút có cùng địa chỉ thì điều đó chỉ ra rằng một số nút khác đang trỏ đến nút hiện tại và chúng ta có thể nói rằng một vòng lặp tồn tại.\
Tiếp tục quá trình này cho tất cả các nút của danh sách được liên kết.

**Phương pháp này có hiệu quả không?**\
Theo thuật toán, chúng ta đang kiểm tra các địa chỉ con trỏ tiếp theo, nhưng làm thế nào để chúng ta tìm thấy phần cuối của danh sách được liên kết (nếu không chúng ta sẽ kết thúc trong một vòng lặp vô hạn)?

**Note**:  Nếu chúng ta bắt đầu với một nút trong vòng lặp, phương pháp này có thể hoạt động tùy thuộc vào kích thước của vòng lặp.

### Problem-8
Chúng ta có thể sử dụng hashing technique để giải quyết Problem-7 không?

**Solution**: Yes, sử dụng Hash Tables có thể giải quyết được vấn đề này.\
**Algorithm**:
* Duyệt qua danh sách từng node một.
* Kiểm tra xem địa chỉ của nút có trong bảng băm hay không.
* Nếu nó đã có sẵn trong bảng băm, điều đó cho thấy rằng chúng ta đang truy cập vào nút đã được truy cập. Điều này chỉ có thể thực hiện được nếu danh sách liên kết đã cho có một vòng lặp trong đó.
* Nếu địa chỉ của nút không có trong bảng băm, hãy chèn địa chỉ của nút đó vào bảng băm.
* Tiếp tục quá trình này cho đến khi chúng tôi đến cuối danh sách liên kết hoặc chúng ta tìm thấy vòng lặp.

Time Complexity: O(n) để duyệt qua danh sách.\
Space Complexity: O(n) cho hash table.


### Problem-9
Chúng ta có thể giải quyết Problem-7 bằng cách sử dụng Sort không?\
**Solution**:\
**No**. Hãy xem xét thuật toán sau dựa trên sắp xếp.
Sau đó, chúng tôi xem tại sao thuật toán này không thành công.

Algorithm:
* Duyệt lần lượt các nút danh sách liên kết và lấy tất cả các giá trị con trỏ tiếp theo vào một mảng.
* Sắp xếp mảng có các con trỏ nút tiếp theo.
* Nếu có một vòng lặp trong danh sách liên kết, chắc chắn hai con trỏ nút tiếp theo sẽ trỏ đến cùng một nút.
* Sau khi sắp xếp nếu có một vòng lặp trong danh sách, các nút có con trỏ tiếp theo giống nhau sẽ kết thúc liền kề trong danh sách đã sắp xếp.
* Nếu bất kỳ cặp nào như vậy tồn tại trong danh sách đã sắp xếp thì chúng ta nói rằng danh sách liên kết có một vòng lặp trong đó.

Time Complexity: O(nlogn) cho việc sắp xếp mảng
Space Complexity: O(n) cho mảng n phần tử.

**Vấn đề với thuật toán này:** Thuật toán trên chỉ hoạt động nếu chúng ta có thể tìm thấy độ dài của danh sách.
Nhưng nếu danh sách có một vòng lặp thì chúng ta có thể kết thúc bằng một vòng lặp vô hạn.
Do lý do này mà thuật toán không thành công.

### Problem-10
Chúng ta có thể giải quyết Problem-7 trong $O(n)$ không?

**Solution**:\
**Yes. Efficient Approach (Memoryless Approach):** \
Vấn đề này đã được giải quyết bởi Floyd. Giải pháp được đặt tên là thuật toán tìm chu trình Floyd. Nó sử dụng hai con trỏ di chuyển với tốc độ khác nhau để xem danh sách được liên kết. Khi cả 2 vào vòng lặp, chúng dự kiến sẽ gặp nhau, điều này biểu thị rằng có một vòng lặp.

Điều này hoạt động bởi vì cách duy nhất một con trỏ di chuyển nhanh hơn sẽ trỏ đến cùng một vị trí với một con trỏ di chuyển chậm hơn là nếu bằng cách nào đó toàn bộ danh sách hoặc một phần của nó là hình tròn. Hãy nghĩ về một con rùa và một con thỏ rừng đang chạy trên đường đua. Thỏ chạy nhanh hơn sẽ đuổi kịp rùa nếu chúng chạy vòng.

Xem xét ví dụ sau và tìm ra thuật toán Floyd. Từ sơ đồ bên dưới, chúng ta có thể thấy rằng sau bước cuối cùng, chúng gặp nhau tại một số điểm trong vòng lặp mà có thể không phải là điểm bắt đầu của vòng lặp.

Note: slowPtr (rùa) di chuyển một bước tại một thời điểm và fastPtr (thỏ) di chuyển hai bước cùng một lúc.

![image.png](https://images.viblo.asia/debe5fd4-456b-4416-95ce-083657922b10.png)

![image.png](https://images.viblo.asia/a4264352-c22c-4ec7-839e-3090b3869395.png)

```
	private static boolean findIfLoopExistsUsingFloyds(ListNode head) {
		ListNode fastPtr = head;
		ListNode slowPtr = head;
		while(fastPtr != null && fastPtr.getNext() != null) {
			fastPtr = fastPtr.getNext().getNext();
			slowPtr = slowPtr.getNext();
			if(slowPtr == fastPtr) {
				return true;
			}
		}
		return true;
	}
```

Time Complexity: O(n)\
Space Complexity: O(n)