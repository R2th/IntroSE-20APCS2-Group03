### Problem-1
Đưa ra một thuật toán để đảo ngược hàng đợi Q.
Để truy cập hàng đợi, bạn chỉ được phép sử dụng các method của queue ADT.

**Solution:**
```
	public LinkedQueue reverseQueue(LinkedQueue queue) throws Exception {
		Stack<Object> stack = new Stack();
		while(!queue.isEmpty()) {
			stack.push(queue.dequeue());
		}
		while(!stack.isEmpty()) {
			queue.enqueue(stack.pop());
		}
		return queue;
	}
```

Time Complexity: O(n).
Space Complexity: O(n).

### Problem-2
Làm thế nào để implement một queue sử dụng hai stack?

**Solution:** Gọi S1 và S2 là hai ngăn xếp được sử dụng để thực hiện hàng đợi. Tất cả những gì chúng ta phải làm là xác định các hoạt động enQueue và deQueue cho hàng đợi.

**EnQueue Algorithm:**
* Chỉ cần push đến ngăn xếp S1

Time Complexity: O(1).

**DeQueue Algorithm:**
* Nếu ngăn xếp S2 không trống thì pop từ S2 và trả về phần tử đó.
* Nếu ngăn xếp trống, sau đó chuyển tất cả các phần tử từ S1 sang S2 và pop phần tử trên cùng từ S2 và trả lại phần tử được pop đó [chúng ta có thể tối ưu mã một chút bằng cách chỉ chuyển n-1 phần tử từ S1 sang S2 và bật phần tử thứ n từ S1 và trả về phần tử đã xuất hiện đó].
* Nếu ngăn xếp S1 cũng trống thì báo lỗi.

Time Complexity: Từ thuật toán, nếu ngăn xếp S2 không trống thì độ phức tạp là O (1). Nếu ngăn xếp S2 trống, thì ta cần chuyển các phần tử từ S1 sang S2. Nhưng nếu chúng ta quan sát kỹ, số phần tử được chuyển và số phần tử được pop ra từ S2 là bằng nhau. Theo phân tích khấu hao, thời gian trung bình của hoạt động pop sẽ là O(1)

```
public class QueueWithTwoStacks<T> {
	private Stack<T> S1 = new Stack<T>();
	private Stack<T> S2 = new Stack<T>();
	
	public void enqueue(T data) {
		S1.push(data);
	}
	
	public T dequeue() {
		if(S1.isEmpty()) {
			while(!S1.isEmpty()) {
				S2.push(S1.pop());
			}
		}
		return S2.pop();
	}
}

```

### Problem-3
Chỉ ra cách bạn có thể triển khai hiệu quả một ngăn xếp bằng cách sử dụng hai hàng đợi. Phân tích thời gian chạy của các hoạt động ngăn xếp.

**Solution:** Yes, có thể triển khai Stack ADT bằng cách sử dụng 2 Queue ADT. Một hàng đợi sẽ được sử dụng để lưu trữ các phần tử và hàng còn lại để giữ chúng tạm thời trong các phương thức pop và top. Phương thức push sẽ xếp phần tử đã cho vào hàng đợi lưu trữ. Phương thức top sẽ chuyển tất cả trừ phần tử cuối cùng từ hàng đợi lưu trữ vào hàng đợi tạm thời, lưu phần tử phía trước của hàng đợi lưu trữ để trả về, chuyển phần tử cuối cùng vào hàng đợi tạm thời, sau đó chuyển tất cả các phần tử trở lại hàng đợi lưu trữ. Phương thức pop sẽ thực hiện tương tự như top, ngoại trừ việc thay vì chuyển phần tử cuối cùng vào hàng đợi tạm thời sau khi lưu nó để trả về, phần tử cuối cùng đó sẽ bị loại bỏ. Gọi Q1 và Q2 là hai hàng đợi được sử dụng để thực hiện ngăn xếp. Tất cả những gì chúng ta phải làm là xác định các hoạt động push và pop cho ngăn xếp.

Trong các thuật toán này, chúng tôi đảm bảo rằng một hàng đợi luôn trống.

**Push Operation Algorithm:** Chèn phần tử vào bất kỳ hàng đợi nào không trống.
* Kiểm tra xem hàng đợi Q1 có trống hay không. Nếu Q1 trống thì Enqueue phần tử vào Q2.
* Nếu không thì enQueue phần tử vào Q1.

Time Complexity: O(1).

**Pop Operation Algorithm:** Chuyển n - 1 phần tử sang hàng đợi khác và xóa phần tử cuối cùng khỏi hàng đợi để thực hiện thao tác pop.
* Nếu hàng đợi Q1 không trống thì chuyển n - 1 phần tử từ Q1 sang Q2 và sau đó, loại bỏ phần tử cuối cùng của Q1 và trả về.
* Nếu hàng đợi Q2 không trống thì chuyển n - 1 phần tử từ Q2 sang Q1 và sau đó, loại bỏ phần tử cuối cùng của Q2 và trả về.

Time Complexity: Thời gian chạy của hoạt động pop là $O (n)$ vì mỗi lần pop được gọi, chúng tôi đang chuyển tất cả các phần tử từ hàng đợi này sang hàng đợi khác.

```
public class StackWithTwoQueues<T> {
	private Queue<T> Q1 = new LinkedList();
	private Queue<T> Q2 = new LinkedList();
	
	public void push(T data) {
		if(Q1.isEmpty()) {
			Q2.offer(data);
		} else {
			Q1.offer(data);
		}
	}
	
	public T pop() {
		int i = 0, size;
		if(Q2.isEmpty()) {
			size = Q1.size();
			while(i < size-1) {
				Q2.offer(Q1.poll());
				i++;
			}
			return Q1.poll();
		} else {
			size = Q2.size();
			while(i < size-1) {
				Q1.offer(Q2.poll());
				i++;
			}
			return Q2.poll();
		}
	}
}
```

### Problem-4
**Số lớn nhất trong cửa sổ trượt:** (Đọc hơi khó hiểu, nhưng xem ví dụ các bạn sẽ thấy rõ ngay)\
Cho mảng A [] có cửa sổ trượt kích thước w đang di chuyển từ bên trái của mảng sang bên phải. Giả sử rằng chúng ta chỉ có thể nhìn thấy các số w trong cửa sổ. Mỗi lần cửa sổ trượt di chuyển sang phải một vị trí. Ví dụ:
  Mảng là [1 3 -1 -3 5 3 6 7] và w là 3.
  
  

| Window position | Max |
| -------- | -------- |
| [1 3 -1] -3 5 3 6 7     | 3     | 
| 1 [3 -1 -3] 5 3 6 7     | 3     | 
| 1 3[-l -3 5] 3 6 7     | 5     | 
| 1 3 -1[ -3 5 3] 6 7     | 5     | 
| 1 3 -1 -3 [5 3 6] 7     | 6     | 
| 1 3 -1 -3 5 [3 6 7]     | 7     | 

**Input**: Một mảng $A []$ và chiều rộng cửa sổ $w$.\
**Output**: Một mảng $B []$, $B [i]$ là giá trị lớn nhất từ $A [i]$ đến $A [i + w-1]$.\
**Requirement**: Tìm một cách tối ưu tốt để có được $B [i]$

**Solution:** Vấn đề này có thể được giải quyết với doubly ended queue (hỗ trợ chèn và xóa ở cả hai đầu). Mình sẽ trình bày chi tiết trong chương về Priority Queues.

### Problem-5
Cho một hàng đợi Q chứa n phần tử, chuyển các mục này vào một ngăn xếp S (ban đầu trống) để phần tử phía trước của Q xuất hiện ở trên cùng của ngăn xếp và thứ tự của tất cả các mục khác được giữ nguyên.
Sử dụng các hoạt động enqueue và dequeue cho hàng đợi và các hoạt động push và pop cho ngăn xếp, phác thảo một thuật toán O (n) hiệu quả để hoàn thành nhiệm vụ trên, chỉ sử dụng một lượng lưu trữ bổ sung không đổi.

**Solution:** Giả sử các phần tử của hàng đợi Q là $a _ { 1 } , a _ { 2 } \ldots a _ { n }$. Xếp thứ tự tất cả các phần tử và đẩy chúng vào stack sẽ dẫn đến một stack có $a _ { n }$ ở trên cùng và $a _ { 1 }$ ở dưới cùng. Điều này được thực hiện trong O (n) thời gian vì dequeue và mỗi lần push yêu cầu constant time cho mỗi hoạt động. Queue bây giờ trống. Bằng cách pop tất cả các phần tử và đẩy chúng vào queue, chúng ta sẽ nhận được a1 ở trên cùng của stack. Điều này được thực hiện lại trong thời gian O (n).\
Như trong phần về độ phức tạp thuật toán Big-O, chúng ta có thể bỏ qua các yếu tố hằng số. Quá trình được thực hiện trong O (n) thời gian. 

### Problem-6
Hàng đợi được thiết lập trong một mảng tròn $A [0..n-1]$ với front và rear được xác định như bình thường.
Giả sử rằng $n - 1$ vị trí trong mảng có sẵn để lưu trữ các phần tử (với phần tử còn lại được sử dụng để phát hiện điều kiện đầy / rỗng).
Đưa ra công thức cho số phần tử trong hàng đợi theo rear, front và n.

**Solution:** Hãy xem xét hình sau để có một ý tưởng rõ ràng về hàng đợi.

![image.png](https://images.viblo.asia/038ace5e-fed2-4222-94da-1d0f89b51ee8.png)

* Rear của queue một nơi nào đó theo chiều kim đồng hồ từ front.
* Để enqueue một phần tử, chúng ta di chuyển về phía sau một vị trí theo chiều kim đồng hồ và ghi phần tử vào vị trí đó.
* Để dequeue, chúng ta chỉ cần di chuyển về phía trước một vị trí theo chiều kim đồng hồ.
* Hàng đợi di chuyển theo chiều kim đồng hồ khi chúng ta enqueue và dequeue.
* Độ trống và độ đầy cần được kiểm tra cẩn thận.
* Phân tích các tình huống có thể xảy ra (các bạn hãy thử tự vẽ một số hình vẽ để xem vị trí phía trước và phía sau khi hàng đợi trống, và được lấp đầy một phần và toàn bộ). Chúng ta sẽ nhận được điều này:

![image.png](https://images.viblo.asia/d66ee1dd-e74a-48b5-8f66-815cb48c8396.png)

### Problem-7
Cấu trúc dữ liệu thích hợp nhất để in các phần tử của queue theo thứ tự ngược lại là gì?

**Solution:** Stack.

### Problem-8
Cho một stack các số nguyên, làm cách nào để bạn kiểm tra xem từng cặp số liên tiếp trong stack có liên tiếp hay không.
Các cặp có thể tăng hoặc giảm và nếu stack có số phần tử lẻ, thì phần tử ở trên cùng sẽ bị loại ra khỏi một cặp.
Ví dụ: nếu chồng các phần tử là [4, 5, -2, -3, 11, 10, 5, 6, 20], thì kết quả đầu ra phải là true vì mỗi cặp (4, 5), (- 2, -3), (11, 10), và (5, 6) bao gồm các số liên tiếp.

**Solution:**

```
	public boolean checkStackPairwiseOrder(Stack<Integer> s) {
		Queue<Integer> q = new LinkedList<>();
		boolean pairwiseOrdered = true;
		while(!s.isEmpty()) {
			q.add(s.pop());
		}
		
		while(!q.isEmpty()) {
			s.push(q.remove());
		}
		
		while(!s.isEmpty()) {
			int n = s.pop();
			q.add(n);
			if(!s.isEmpty()) {
				int m = s.pop();
				q.add(m);
				if(Math.abs(n-m) != 1) {
					pairwiseOrdered = false;
				}
			}
		}
		
		while(!q.isEmpty()) {
			s.push(q.remove());
		}
		return pairwiseOrdered;
	}
```

Time Complexity: O(n). Space Complexity: O(n).

### Problem-9
Cho một hàng đợi các số nguyên, hãy sắp xếp lại các phần tử bằng cách xen kẽ nửa đầu của danh sách với nửa sau của danh sách.
Ví dụ: giả sử một hàng đợi lưu trữ chuỗi giá trị sau:
  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].
Hãy xem xét hai nửa của danh sách này: nửa đầu: [11, 12, 13, 14, 15], nửa sau:  [16, 17, 18, 19, 20].
Chúng được kết hợp theo kiểu xen kẽ để tạo thành một chuỗi các cặp xen kẽ: các giá trị đầu tiên từ mỗi nửa (11 và 16), sau đó là các giá trị thứ hai từ mỗi nửa (12 và 17), sau đó là các giá trị thứ ba từ mỗi nửa (13 và 18), v.v.
Trong mỗi cặp, giá trị từ nửa đầu xuất hiện trước giá trị từ nửa sau.
Do đó, sau khi kết thúc, hàng đợi lưu trữ các giá trị sau:
  [11, 16, 12, 17, 13, 18, 14, 19, 15, 20].

**Solution:**
```
	public static void interLeavingQueue(Queue<Integer> q) {
		if(q.size() % 2 != 0) {
			throw new IllegalArgumentException();
		}
		
		Stack<Integer> s = new Stack<>();
		int halfSize = q.size()/2;
		for(int i = 0; i < halfSize; i++) {
			s.push(q.dequeue());
		}
		
		while(!s.isEmpty()) {
			q.enqueue(s.pop());
			for(int i = 0; i < halfSize; i++) {
				q.enqueue(q.dequeue());
			}
		}
		
		for(int i = 0; i < halfSize; i++) {
			s.push(q.dequeue());
		}
		
		while(!s.isEmpty()) {
			q.enqueue(s.pop());
			q.enqueue(q.dequeue());
		}
	}
```

Đây là code của tác giả viết, mình k thấy giải thích thuật toán, đọc khá khó hiểu nên mình có tham khảo [ở đây](https://www.geeksforgeeks.org/interleave-first-half-queue-second-half/). 
```
class GFG {
 
    // Function to interleave the queue
    static void interLeaveQueue(Queue<Integer> q)
    {
        // To check the even number of elements
        if (q.size() % 2 != 0)
            System.out.println(
                "Input even number of integers.");
 
        // Initialize an empty stack of int type
        Stack<Integer> s = new Stack<>();
        int halfSize = q.size() / 2;
 
        // Push first half elements into the stack
        // queue:16 17 18 19 20, stack: 15(T) 14 13 12 11
        for (int i = 0; i < halfSize; i++) {
            s.push(q.peek());
            q.poll();
        }
 
        // enqueue back the stack elements
        // queue: 16 17 18 19 20 15 14 13 12 11
        while (!s.empty()) {
            q.add(s.peek());
            s.pop();
        }
 
        // dequeue the first half elements of queue
        // and enqueue them back
        // queue: 15 14 13 12 11 16 17 18 19 20
        for (int i = 0; i < halfSize; i++) {
            q.add(q.peek());
            q.poll();
        }
 
        // Again push the first half elements into the stack
        // queue: 16 17 18 19 20, stack: 11(T) 12 13 14 15
        for (int i = 0; i < halfSize; i++) {
            s.push(q.peek());
            q.poll();
        }
 
        // interleave the elements of queue and stack
        // queue: 11 16 12 17 13 18 14 19 15 20
        while (!s.empty()) {
            q.add(s.peek());
            s.pop();
            q.add(q.peek());
            q.poll();
        }
    }
 
    // Driver code
    public static void main(String[] args)
    {
        Queue<Integer> q = new java.util.LinkedList<>();
        q.add(11);
        q.add(12);
        q.add(13);
        q.add(14);
        q.add(15);
        q.add(16);
        q.add(17);
        q.add(18);
        q.add(19);
        q.add(20);
        interLeaveQueue(q);
        int length = q.size();
        for (int i = 0; i < length; i++) {
            System.out.print(q.peek() + " ");
            q.poll();
        }
    }
}
```

### Problem-10
Cho một số nguyên k và một hàng đợi các số nguyên, làm thế nào để đảo ngược thứ tự của k phần tử đầu tiên của hàng đợi, để các phần tử khác theo cùng một thứ tự tương đối? Ví dụ, nếu k = 4 và hàng đợi có các phần tử [10, 20, 30, 40, 50, 60, 70, 80, 90]; đầu ra phải là [40, 30, 20, 10, 50, 60, 70, 80, 90].

**Solution:**
```
	public void reverseQueueFirstKElements(int k, Queue<Integer> q) {
		if(q == null || k > q.size()) {
			throw new IllegalArgumentException();
		} else {
			if(k > 0) {
				Stack<Integer> s = new Stack<>();
				for(int i = 0; i < k; i++) {
					s.push(q.remove());
				}
				while(!s.isEmpty()) {
					q.add(s.pop());
				}
				for(int i = 0; i < q.size(); i++) {
					q.add(q.remove());
				}
			}
		}
	}
```
Time Complexity: O(n). Space Complexity: O(n).