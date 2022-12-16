# 6.4 Binary Tree Traversals
Để xử lý cây, chúng ta cần một cơ chế để duyệt qua chúng và điều đó tạo thành chủ đề của phần này. Quá trình truy cập tất cả các node của một cây được gọi là duyệt qua cây. Mỗi nút chỉ được xử lý một lần nhưng nó có thể được truy cập nhiều hơn một lần. Như chúng ta đã thấy trong cấu trúc dữ liệu tuyến tính (như danh sách được liên kết, ngăn xếp, hàng đợi, v.v.), các phần tử được truy cập theo thứ tự tuần tự.

Nhưng, trong cấu trúc cây có nhiều cách khác nhau. Duyệt cây giống như tìm kiếm cây, ngoại trừ việc di chuyển qua cây, mục tiêu là di chuyển qua cây theo một thứ tự cụ thể. Ngoài ra, tất cả các node được xử lý trong quá trình duyệt nhưng việc tìm kiếm sẽ dừng lại khi tìm thấy nút yêu cầu.

## Traversal Possibilities(Các khả năng duyệt cây)
Bắt đầu từ gốc của cây nhị phân, có ba bước chính có thể được thực hiện và thứ tự thực hiện chúng xác định kiểu duyệt. Các bước sau là: thực hiện một hành động trên nút hiện tại (được gọi là “visiting(ghé thăm)” node và được ký hiệu là “D”), đi qua node con bên trái (được ký hiệu bằng “L”) và đi qua node con bên phải (được ký hiệu là “R ”). Quá trình này có thể được mô tả dễ dàng thông qua đệ quy. Dựa trên định nghĩa trên, có 6 khả năng:

1. LDR: Xử lý cây con bên trái, xử lý dữ liệu nút hiện tại và sau đó xử lý cây con bên phải.
2. LRD: Xử lý cây con bên trái, xử lý cây con bên phải và sau đó xử lý dữ liệu nút hiện tại.
3. DLR: Xử lý dữ liệu nút hiện tại, xử lý cây con bên trái và sau đó xử lý cây con bên phải.
4. DRL: Xử lý dữ liệu nút hiện tại, xử lý cây con bên phải và sau đó xử lý cây con bên trái.
5. RDL: Xử lý cây con bên phải, xử lý dữ liệu nút hiện tại và sau đó xử lý cây con bên trái.
6. RLD: Xử lý cây con bên phải, xử lý cây con bên trái và sau đó xử lý dữ liệu nút hiện tại.

## Classifying the Traversals(Phân loại Duyệt cây)
Trình tự trong đó các node được xử lý xác định một phương thức duyệt cụ thể. Việc phân loại dựa trên thứ tự mà nút hiện tại được xử lý. Điều đó có nghĩa là, nếu chúng ta đang phân loại dựa trên nút hiện tại (D) và nếu D ở giữa thì việc L ở bên trái của D hay R ở bên trái của D. không quan trọng. Tương tự, việc L nằm bên phải D hay R nằm bên phải D. không quan trọng.
Do đó, tổng số 6 khả năng được giảm xuống còn 3 và đó là: 
* Preorder (DLR) Traversal
* Inorder (LDR) Traversal
* Postorder (LRD) Traversal

\
Có một phương pháp duyệt khác không phụ thuộc vào các đơn đặt hàng ở trên và đó là:
* Level Order Traversal(Duyệt theo cấp độ): Phương pháp này được lấy cảm hứng từ Breadth First Traversal (BFS của các thuật toán Đồ thị).

Chúng ta sẽ sử dụng sơ đồ dưới đây cho phần thảo luận còn lại.

![image.png](https://images.viblo.asia/8db1534c-a755-4799-88be-ac71fd2990f1.png)

### PreOrder Traversal
Trong PreOrder Traversal, mỗi nút được xử lý trước (trước) một trong các cây con của nó. Đây là cách hiểu đơn giản nhất. Tuy nhiên, mặc dù mỗi nút được xử lý trước các cây con, nó vẫn yêu cầu một số thông tin phải được duy trì trong khi di chuyển xuống cây. Trong ví dụ trên, 1 được xử lý đầu tiên, sau đó đến cây con bên trái và tiếp theo là cây con bên phải. 

Do đó, quá trình xử lý phải quay trở lại cây con bên phải sau khi kết thúc quá trình xử lý cây con bên trái. Để chuyển sang cây con bên phải sau khi xử lý cây con bên trái, chúng ta phải duy trì thông tin gốc. ADT rõ ràng cho thông tin như vậy là một ngăn xếp. Do cấu trúc LIFO của nó, có thể lấy lại thông tin về các cây con bên phải theo thứ tự ngược lại.

Preorder traversal được định nghĩa như sau:
* Ghé thăm gốc.
* Di chuyển qua cây con bên trái trong PreOrder.
* Di chuyển qua cây con bên phải trong PreOrder.

Các nút của cây sẽ được thăm theo thứ tự: 1 2 4 5 3 6 7

```
public void PreOrder(BinaryTreeNode root){
    if(root != null){
        System.out.println(root.data);
        PreOrder(root.left);
        PreOrder(root.right);
    }
}
```

Time Complexity: O(n). Space Complexity: O(n).

### Iterative Preorder Traversal
Trong phiên bản vòng lặp, cần có một ngăn xếp vì chúng ta cần nhớ nút hiện tại để sau khi hoàn thành cây con bên trái, chúng ta có thể chuyển đến cây con bên phải. Để mô phỏng tương tự, đầu tiên chúng ta xử lý nút hiện tại và trước khi chuyển đến cây con bên trái, chúng ta lưu trữ nút hiện tại trên ngăn xếp. Sau khi hoàn thành xử lý cây con bên trái, hãy pop phần tử và chuyển đến cây con bên phải của nó. Tiếp tục quá trình này cho đến khi ngăn xếp không còn gì nữa.

```
	public ArrayList<Integer> preorderTraversal(BinaryTreeNode root){
		ArrayList<Integer> res = new ArrayList<>();
		if(root == null) {
			return res;
		}
		
		Stack<BinaryTreeNode> s = new Stack<>();
		s.push(root);
		while(!s.isEmpty()) {
			BinaryTreeNode tmp = s.pop();
			res.add(tmp.data);
			// pay more attention to this sequence
			if(tmp.right != null) {
				s.push(tmp.right);
			}
			if(tmp.left != null) {
				s.push(tmp.left);
			}
		}
		return res;
	}
```

### InOrder Traversal
Trong Inorder Traversal, gốc được truy cập giữa các cây con. Duyệt Inorder được định nghĩa như sau:
* Di chuyển qua cây con bên trái trong Inorder.
* Ghé thăm gốc.
* Di chuyển cây con bên phải trong Inorder.

Các nút của cây sẽ được thăm theo thứ tự: 4 2 5 1 6 3 7

```
    public void InOrer(BinaryTreeNode root){
        if(root != null){
            InOrer(root.left);
            System.out.println(root.data);
            InOrer(root.right);
        }
    }
```

Time Complexity: O(n). Space Complexity: O(n).

### Non-Recursive Inorder Traversal
Phiên bản không đệ quy của Inorder duyệt tương tự như Preorder. Thay đổi duy nhất là, thay vì xử lý nút trước khi chuyển đến cây con bên trái, hãy xử lý nó sau khi pop lên (được chỉ ra sau khi hoàn thành xử lý cây con bên trái).

```
	public ArrayList<Integer> inorderTraversal(BinaryTreeNode root){
		ArrayList<Integer> res = new ArrayList<>();
		Stack<BinaryTreeNode> s = new Stack<>();
		
		BinaryTreeNode currentNode = root;
		boolean done = false;
		while(!done) {
			if(currentNode != null) {
				s.push(currentNode);
				currentNode = currentNode.left;
			} else {
				if(s.isEmpty()) {
					done = true;
				} else {
					currentNode = s.pop();
				}
				res.add(currentNode.getData());
				currentNode = currentNode.right;
			}
		}
		
		return res;
	}
```

Time Complexity: O(n). Space Complexity: O(n).


### PostOrder Traversal
Trong duyệt qua PostOrder, gốc được truy cập sau cả hai cây con.
Postorder sau được định nghĩa như sau:
 * Di chuyển qua cây con bên trái trong Postorder.
* Di chuyển cây con bên phải trong Postorder.
* Ghé thăm gốc.

Các nút của cây sẽ được thăm theo thứ tự: 4 5 2 6 7 3 1

```
public void PostOrder(BinaryTreeNode root){
    if(root != null){
            PostOrder(root.left);
            PostOrder(root.right);
            System.out.println(root.data);
    }
}
```
 
Time Complexity: O(n). Space Complexity: O(n).

### Non-Recursive Postorder Traversal
Trong duyệt preorder và inorder, sau khi đặt phần tử ngăn xếp, chúng ta không cần phải truy cập lại cùng một đỉnh. Nhưng trong duyệt theo postorder, mỗi nút được truy cập hai lần. Điều đó có nghĩa là, sau khi xử lý cây con bên trái, chúng ta sẽ truy cập vào nút hiện tại và sau khi xử lý cây con bên phải, chúng ta sẽ truy cập vào cùng một nút hiện tại. Nhưng chúng ta nên xử lý nút trong lần truy cập thứ hai. Ở đây vấn đề là làm thế nào để phân biệt xem chúng ta đang quay trở lại từ cây con bên trái hay cây con bên phải.

Chúng ta sử dụng một biến **previous** để theo dõi nút đã duyệt trước đó. Giả sử node hiện tại nằm trên cùng của ngăn xếp. Khi **previous** là node cha của node hiện tại, chúng ta đang đi xuống qua cây. Trong trường hợp này, chúng tôi cố gắng chuyển sang phần con bên trái của hiện tại nếu có (tức là đẩy phần con bên trái vào ngăn xếp). Nếu nó không có sẵn, chúng tôi xem xét node bên phải phù hợp của node hiện tại. Nếu cả node con trái và node con phải không tồn tại (nghĩa là node hiện tại là một node lá), chúng ta in giá trị của node hiện tại và pop nó ra khỏi ngăn xếp.

Nếu **previous** là node con bên trái của node hiện tại, chúng ta sẽ đi ngang cây từ bên trái. Chúng tôi xem xét node con bên phải của node hiện tại. Nếu nó có sẵn, chuyển xuống node con bên phải (tức là, đẩy con bên phải vào ngăn xếp); nếu không, hãy in giá trị hiện tại và pop nó ra khỏi ngăn xếp. Nếu **previous** là node con bên phải của hiện tại, chúng ta sẽ đi ngang cây từ bên phải. Trong trường hợp này, chúng ta in giá trị hiện tại và pop nó ra khỏi ngăn xếp.

![image.png](https://images.viblo.asia/825f2afd-2ef7-4038-a33d-6a98bdf7bd77.png)

Đoạn trên mình dịch nhưng cảm giác còn hơi lấn cấn, có thể có chỗ chưa rõ nghĩa, các bạn tham khảo thêm nguyên văn của tác giả.

```
	public ArrayList<Integer> postorderTraversal(BinaryTreeNode root){
		ArrayList<Integer> res = new ArrayList<>();
		if(root == null) {
			return res;
		}
		
		Stack<BinaryTreeNode> s = new Stack<>();
		s.push(root);
		BinaryTreeNode prev = null;
		while(!s.isEmpty()) {
			BinaryTreeNode curr = s.peek();
			if(prev == null || prev.left == curr || prev.right == curr) {
				// traverse from top to bottom, and if curr has left child or right child,
				// push into the stack; otherwise, pop out.
				if(curr.left != null) {
					s.push(curr.left);
				} else if(curr.left == prev) {
					if(curr.right != null) {
						s.push(curr.right);
					}
				} 
			} else if(curr.left == prev) {
				if(curr.right != null) {
					s.push(curr.right);
				}
			} else {
				res.add(curr.data);
				s.pop();
			}
			prev = curr;
		}
		return res;
	}
```

Time Complexity: O(n). Space Complexity: O(n).

### Level Order Traversal
Level Order Traversal được định nghĩa như sau:
* Ghé thăm gốc.
* Trong khi đi qua level 1, hãy giữ tất cả các phần tử ở level 1 trong hàng đợi.
* Chuyển đến level tiếp theo và truy cập tất cả các nút ở level đó.
* Lặp lại điều này cho đến khi tất cả các level được hoàn thành.

Các nút của cây được thăm theo thứ tự: 1 2 3 4 5 6 7

```
	public ArrayList<ArrayList<Integer>> levelOrder(BinaryTreeNode root){
		ArrayList<ArrayList<Integer>> res = new ArrayList<>();
		if(root == null) {
			return res;
		}
		
		//Initialization
		Queue<BinaryTreeNode> q = new LinkedList<>();
		q.offer(root);
		q.offer(null);
		ArrayList<Integer> curr = new ArrayList<>();
		while(!q.isEmpty()) {
			BinaryTreeNode tmp = q.poll();
			if(tmp != null) {
				curr.add(tmp.data);
				if(tmp.left != null) {
					q.offer(tmp.left);
				}
				if(tmp.right != null) {
					q.offer(tmp.right);
				}
			} else {
				ArrayList<Integer> c_curr = new ArrayList<>(curr);
				res.add(c_curr);
				curr.clear(); // Java will clear the reference, so have to new an new ArrayList, complition of a level
				if(!q.isEmpty()) {
					q.offer(null);
				}
			}
		}
		
		return res;
	}
```

Time Complexity: O(n). Space Complexity: O(n). Vì trong trường hợp xấu nhất, tất cả các nút trên toàn bộ level cuối cùng có thể đồng thời nằm trong hàng đợi.