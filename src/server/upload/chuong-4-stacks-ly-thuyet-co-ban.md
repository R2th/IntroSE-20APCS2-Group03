## 4.1 Stack là gì?
Stack - Ngăn xếp là một cấu trúc dữ liệu đơn giản được sử dụng để lưu trữ dữ liệu (tương tự như Linked Lists).\
Trong một ngăn xếp, thứ tự của dữ liệu đến là điều quan trọng. Một đống đĩa trong quán ăn tự phục vụ là một ví dụ điển hình về stack.Các đĩa được thêm vào chồng khi chúng được làm sạch và chúng được đặt lên trên cùng. Khi một tấm, được yêu cầu, nó được lấy từ trên cùng của chồng. Tấm đầu tiên được đặt trên chồng là tấm cuối cùng được sử dụng.

**Định nghĩa**: Stack là một danh sách có thứ tự trong đó việc chèn và xóa được thực hiện ở một đầu, được gọi là top - đỉnh. Phần tử cuối cùng được chèn là phần tử đầu tiên sẽ bị xóa. Do đó, nó được gọi là Last in First out (**LIFO**) hoặc First in Last out (**FILO**) list.\
Các tên đặc biệt được đặt cho hai thay đổi có thể được thực hiện đối với một ngăn xếp. Khi một phần tử được chèn vào một ngăn xếp, khái niệm được gọi là **push** và khi một phần tử bị xóa khỏi ngăn xếp, khái niệm được gọi là **pop**.\
Việc cố gắng pop một stack trống được gọi là underflow và cố gắng đẩy một phần tử trong một stack đầy được gọi là overflow. (Trang web nổi tiếng Stack Overflow có lẽ từ đây mà ra 😁)\
Khi những điều này xảy ra, chúng ta gọi chúng là exceptions(ngoại lệ).\
Ví dụ về stack:

![image.png](https://images.viblo.asia/f90f90ab-e709-431b-9e15-726ec6550dc7.png)

## 4.2 Stack được sử dụng như thế nào?
Hãy xem xét một ngày làm việc trong văn phòng.
Hãy giả sử một nhà phát triển đang làm việc trong một dự án dài hạn.
Sau đó, người quản lý giao cho nhà phát triển một nhiệm vụ mới quan trọng hơn.
Nhà phát triển đặt dự án dài hạn sang một bên và bắt đầu làm việc với nhiệm vụ mới.
Điện thoại đổ chuông và đây là ưu tiên cao nhất vì nó phải được trả lời ngay lập tức.
Nhà phát triển đẩy nhiệm vụ hiện tại vào khay đang chờ xử lý và trả lời điện thoại.\
Khi cuộc gọi hoàn tất, tác vụ đã bị bỏ qua để trả lời điện thoại sẽ được truy xuất từ khay đang chờ xử lý và công việc được tiến hành.
Để thực hiện một cuộc gọi khác, nó có thể phải được xử lý theo cách tương tự, nhưng cuối cùng tác vụ mới sẽ hoàn thành và nhà phát triển có thể rút dự án dài hạn từ khay đang chờ xử lý và tiếp tục với điều đó.

## 4.3 Stack ADT
Các hoạt động sau đây làm cho stack trở thành một ADT. Để đơn giản, hãy giả sử dữ liệu là kiểu số nguyên.

**Main stack operations**
* void push(int data): Thêm data vào stack.
* int pop(): Xóa và return phần tử được insert cuối cùng từ stack.

**Auxiliary stack operations**
* int Top(): Return phần tử được insert cuối cùng từ stack mà không xóa nó.
* int Size(): Return số phần tử hiện có trong stack.
* int IsEmptyStack(): Kiểm tra stack có rỗng hay không.
* int IsFullStack(): Kiểm tra stack đầy hay chưa.

## 4.4 Exceptions(Ngoại lệ)
Việc cố gắng thực hiện một thao tác đôi khi có thể gây ra tình trạng lỗi, được gọi là ngoại lệ.
Các ngoại lệ sẽ được thrown(ném) bởi một hoạt động không thể thực hiện được.
Trong Stack ADT, không thể thực hiện các hoạt động pop và top nếu ngăn xếp trống.
Cố gắng thực hiện cửa sổ pop (top) trên một ngăn xếp trống sẽ ném ra một ngoại lệ.
Cố gắng đẩy một phần tử trong một ngăn xếp đầy sẽ tạo ra một ngoại lệ.

## 4.5 Các ứng dụng
Sau đây là một số ứng dụng trong đó ngăn xếp đóng một vai trò quan trọng.

**Ứng dụng trực tiếp**
* [Balancing of symbols](http://www.openbookproject.net/books/pythonds/BasicDS/BalancedSymbols(AGeneralCase).html)
* Infix-to-postfix conversion
* Evaluation of postfix expression
* Implementing function calls (including recursion)
* Finding of spans (tìm nhịp trên thị trường chứng khoán, chi tiết mình sẽ viết trong phần về Problem)
* Lịch sử đã truy cập trang trong trình duyệt Web [Nút Quay lại]
* Hoàn tác trình tự trong trình soạn thảo văn bản
* Matching Tags in HTML and XML

**Indirect applications**
* Cấu trúc dữ liệu bổ trợ cho các thuật toán khác (Ví dụ: Thuật toán duyệt cây)
* Thành phần của cấu trúc dữ liệu khác (Ví dụ: Mô phỏng hàng đợi, mình sẽ viết chi tiết trong chương về Queue).


## 4.6 Implementation
Có nhiều cách để triển khai Stack ADT; dưới đây là các phương pháp thường được sử dụng.
* Triển khai dựa trên Array thông thường
* Triển khai dựa trên Dynamic Array
* Triển khai dựa trên Linked List

### Simple Array Implementation
Việc triển khai Stack ADT này sử dụng một mảng. Trong mảng, chúng ta thêm các phần tử từ trái sang phải và sử dụng một biến để theo dõi chỉ số của phần tử trên cùng.

![image.png](https://images.viblo.asia/cc8940f5-8a73-458d-8d74-5cf333345f65.png)

Mảng lưu trữ các phần tử ngăn xếp có thể trở nên đầy. Một hoạt động push sau đó sẽ ném ra một full stack exception. Tương tự, nếu chúng ta thử xóa một phần tử khỏi ngăn xếp trống, nó sẽ ném ra stack empty exception.

```
public class FixedSizeArrayStack {
	//Length of the array used to implement the stack
	protected int capacity;
	
	//Default array capacity
	public static final int CAPACITY = 10;
	
	//Array used to implement the stack
	protected int[] stackRep;
	
	//Index of top element of the stack in the array
	protected int top = -1;
	
	//Initializes the stack to use an array of default length
	public FixedSizeArrayStack() {
		this(CAPACITY);
	}

	//Initializes the stack to use an array of given length
	public FixedSizeArrayStack(int cap) {
		capacity = cap;
		stackRep = new int[capacity];
	}
	
	//Returns the number of elements in the stack. This method runs in O(1) time
	public int size() {
		return (top+1);
	}
	
	//Tests whether the stack is empty. This method runs in O(1) time
	public boolean isEmpty() {
		return (top < 0);
	}
	
	//Inserts an element at the top of the stack. This method runs in O(1) time
	public void push(int data) throws Exception{
		if(size() == capacity) {
			throw new Exception("Stack is full.");
		}
		stackRep[++top] = data;
	}
	
	//Removes the top element from the stack. This method runs in O(1) time.
	public int pop() throws Exception {
		int data;
		if(isEmpty()) {
			throw new Exception("Stack is empty");
		}
		data = stackRep[top];
		stackRep[top--] = Integer.MIN_VALUE;
		return data;
	}
	
	//Returns a string representation of the stack as a list of elements
	//with the top element at the end. 
	//This mehtod runs in O(n) time, where n is the size of the stack.
	public String toString() {
		String s;
		s = "[";
		if(size() > 0) {
			s += stackRep[0];
		}
		if(size() > 1) {
			for (int i = 1; i < size() - 1; i++) {
				s += ", " + stackRep[i];
			}
		}
		return s + "]";
	}
}
```

\
**Performance & Limitations**

**Performance**: Gọi n là số phần tử trong ngăn xếp. Sự phức tạp của các hoạt động ngăn xếp với biểu diễn này có thể được đưa ra như sau:



| Column 1 | Column 2 | 
| -------- | -------- | 
| Space Complexity (for n push operations)     | O(n)     | 
|    Time Complexity of push()  | O(1)     | 
|   Time Complexity of pop()   | O(1)     | 
| Time Complexity of size()     | O(1)     | 
|  Time Complexity of isEmpty()    | O(1)     | 
|   Time Complexity of isFullStack()   | O(1)     | 
|  Time Complexity of deleteStack()    | O(1)     | 

**Limitations**: Kích thước tối đa của ngăn xếp trước tiên phải được xác định và nó không thể thay đổi được. Cố gắng đẩy một phần tử mới vào một ngăn xếp đầy sẽ gây ra một ngoại lệ.

### Dynamic Array Implementation
Trước tiên, hãy xem xét cách chúng ta triển khai một ngăn xếp dựa trên mảng đơn giản.
Chúng ta đã lấy một đỉnh biến chỉ mục trỏ đến chỉ mục của phần tử được chèn gần đây nhất trong ngăn xếp.
Để insert (or push) một phần tử, chúng tôi tăng chỉ số hàng đầu và sau đó đặt phần tử mới tại chỉ mục đó.\
Tương tự, để delete (or pop) một phần tử, chúng ta lấy phần tử ở đầu chỉ mục và sau đó giảm chỉ mục trên cùng.
Chúng ta biểu diễn một hàng đợi trống với giá trị hàng đầu bằng –1.
Vấn đề vẫn cần được giải quyết là chúng ta sẽ làm gì khi tất cả các vị trí trong ngăn xếp mảng kích thước cố định đã bị chiếm hết?

**First try**: Điều gì sẽ xảy ra nếu chúng ta tăng kích thước của mảng lên 1 mỗi khi ngăn xếp đầy?
* Push(); tăng size của S[] thêm 1
* Pop(): giảm size của S[] đi 1

**Problems with this approach?**
Cách tăng kích thước mảng này quá đắt. Hãy để chúng ta xem lý do cho điều này. Ví dụ, tại n = 1, để đẩy một phần tử, hãy tạo một mảng mới có kích thước 2 và sao chép tất cả các phần tử cũ của mảng sang mảng mới, và cuối cùng thêm phần tử mới. Tại n = 2, để đẩy một phần tử, hãy tạo một mảng mới có kích thước 3 và sao chép tất cả các phần tử cũ của mảng sang mảng mới, và cuối cùng thêm phần tử mới.\
Tương tự, tại n = n - 1, nếu chúng ta muốn đẩy một phần tử, hãy tạo một mảng mới có kích thước n và sao chép tất cả các phần tử cũ của mảng sang mảng mới và cuối cùng thêm phần tử mới. Sau n thao tác đẩy, tổng thời gian T (n) (số thao tác sao chép) tỷ lệ với $1 + 2 + ...+ n ≈ O (n2).$

### Alternative Approach: Repeated Doubling
Hãy để chúng tôi cải thiện độ phức tạp bằng cách sử dụng kỹ thuật nhân đôi mảng. Nếu mảng đã đầy, hãy tạo một mảng mới có kích thước gấp đôi và sao chép các mục. Với cách tiếp cận này, việc đẩy n mục cần thời gian tỷ lệ với n (không phải $n^2$).\
Để đơn giản, chúng ta hãy giả sử rằng ban đầu chúng ta bắt đầu với n = 1 và chuyển lên n = 32. Điều đó có nghĩa là, chúng tôi nhân đôi ở 1, 2, 4, 8, 16. Cách khác để phân tích cùng một cách tiếp cận là: tại n = 1, nếu chúng ta muốn add (push) một phần tử, hãy nhân đôi kích thước hiện tại của mảng và sao chép tất cả các phần tử của mảng cũ sang mảng mới.\
Tại n = 1, chúng ta thực hiện 1 thao tác sao chép, tại n = 2, chúng ta thực hiện 2 thao tác sao chép và tại n = 4, chúng ta thực hiện 4 thao tác sao chép, v.v. Tại thời điểm chúng ta đạt đến n = 32, tổng số hoạt động sao chép là 1 + 2 + 4 + 8 + 16 = 31 xấp xỉ bằng giá trị $2^n$ (32). Nếu quan sát kỹ, chúng ta đang thực hiện thao tác nhân đôi số lần là $logn$.\
Bây giờ, chúng ta hãy khái quát cuộc thảo luận. Đối với n hoạt động push, chúng tôi nhân đôi kích thước mảng $logn$ lần. Điều đó có nghĩa là, chúng ta sẽ có $logn$ các số hạng trong biểu thức bên dưới. Tổng thời gian T (n) của một loạt n thao tác push:

$1 + 2 + 4 + 8 + ... + \frac { n } { 4 } + \frac { n } { 2 } + n$\
$=n ( 1 + \frac { 1 } { 2 } + \frac { 1 } { 4 } + \frac { 1 } { 8 } + ... + \frac { 4 } { n } + \frac { 2 } { n } + \frac { 1 } { n } )$\
$= n ( 2 ) \approx 2 n = O ( n )$

$T (n)$ là $O (n)$ và thời gian khấu hao của một hoạt động đẩy là $O (1)$.

```
public class DynamicArrayStack {
	// Length of the array used to implement the stack
	protected int capacity;

	// Default array capacity
	public static final int CAPACITY = 16;// power of 2
	public static int MINCAPACITY = 1 << 15;// power of 2

	// Array used to implement the stack
	protected int[] stackRep;

	// Index of top element of the stack in the array
	protected int top = -1;

	// Initializes the stack to use an array of default length
	public DynamicArrayStack() {
		this(CAPACITY);
	}

	// Initializes the stack to use an array of given length
	public DynamicArrayStack(int cap) {
		capacity = cap;
		stackRep = new int[capacity];
	}

	// Returns the number of elements in the stack. This method runs in O(1) time
	public int size() {
		return (top + 1);
	}
	
	//Tests whether the stack is empty. This method runs in O(1) time
	public boolean isEmpty() {
		return (top < 0);
	}
	
	//Inserts an element at the top of the stack. This method runs in O(1) time
	public void push(int data) throws Exception{
		if(size() == capacity) {
			expand();
		}
		stackRep[++top] = data;
	}
	
	private void expand() {
		int length = size();
		int[] newstack = new int[length<<1];
		System.arraycopy(stackRep, 0, newstack, 0, length);
		stackRep = newstack;
		this.capacity = this.capacity<<1;
	}
	
	//dynamic array operation: shrinks to 1/2 if more than 3/4 empty
	private void shrink(){
		int length = top +1;
		if(length <= MINCAPACITY || top<<2 >= length) {
			return;
		}
		length = length + (top<<1);//still means shrink to at 1/2 or less of the heap
		if(top<MINCAPACITY) length = MINCAPACITY;
		int[] newstack = new int[length];
		System.arraycopy(stackRep, 0, newstack, 0, top+1);
		stackRep = newstack;
		this.capacity = length;
	}
	
	//Inspects the element at the top of the stack. This method runs in O(1) time.
	public int top() throws Exception{
		if(isEmpty()) {
			throw new Exception("Stack is empty.");
		}
		return stackRep[top];
	}
	
	//Removes the top element from the stack. This method runs in O(1) time.
	public int pop() throws Exception {
		int data;
		if(isEmpty()) {
			throw new Exception("Stack is empty");
		}
		data = stackRep[top];
		stackRep[top--] = Integer.MIN_VALUE;
		shrink();
		return data;
	}
	
	//Returns a string representation of the stack as a list of elements
	//with the top element at the end. 
	//This mehtod runs in O(n) time, where n is the size of the stack.
	public String toString() {
		String s;
		s = "[";
		if(size() > 0) {
			s += stackRep[0];
		}
		if(size() > 1) {
			for (int i = 1; i < size() - 1; i++) {
				s += ", " + stackRep[i];
			}
		}
		return s + "]";
	}
	
}
```

### Linked List Implementation
Cách khác để triển khai ngăn xếp là sử dụng Danh sách liên kết. Thao tác push được thực hiện bằng cách chèn phần tử vào đầu danh sách. Hoạt động pop được thực hiện bằng cách xóa nút từ đầu (the header/top node).

![image.png](https://images.viblo.asia/ae6526a4-3c27-4693-8029-2d3f574b3995.png)

```
import java.util.EmptyStackException;

public class LinkedStack<T> {
	private int length;
	private ListNode top;
	
	//Constructor: Creates an empty stack
	public LinkedStack() {
		length = 0;
		top = null;
	}
	
	//Adds the specified data to the top of this stack
	public void push(int data) {
		ListNode temp = new ListNode(data);
		temp.setNext(top);
		top = temp;
		length++;
	}
	
	//Removes the data at the top of this stack and returns a reference to it. Throws an EmptyStackException if the stack is empty
	public int pop() throws EmptyStackException{
		if(isEmpty()) {
			throw new EmptyStackException();
		}
		int result = top.getData();
		top = top.getNext();
		length--;
		return result;
	}
	
	public int peek() throws EmptyStackException{
		if(isEmpty()) {
			throw new EmptyStackException();
		}
		return top.getData();
	}
	
	//Returns true if this stack is empty and false otherwise
	public boolean isEmpty() {
		return (length == 0);
	}
	
	//Returns the number of elements in the stack.
	public String toString() {
		String result = "";
		ListNode current = top;
		while(current != null) {
			result += current.toString() + "\n";
			current = current.getNext();
		}
		return result;
	}
}
```

**Performance**\
Gọi n là số phần tử trong ngăn xếp. Sự phức tạp đối với các hoạt động với biểu diễn này có thể được đưa ra như sau:


| Column 1 | Column 2 | 
| -------- | -------- |
| Space Complexity (for n push operations)     | O(n)     |
|   Time Complexity of create Stack: DynArrayStack()   | O(1)     |
|    Time Complexity of push()  | O(1)     |
| Time Complexity of pop()    | O(1)     |
|  Time Complexity of top()    | O(1)     |
|    Time Complexity of isEmpty()  | O(1)     |
|  Time Complexity of deleteStack()    | O(1)     |

## 4.7 So sánh các Implementations
### So sánh Incremental Strategy(Chiến lược Gia tăng) và Doubling Strategy(Chiến lược Nhân đôi)
Chúng ta so sánh chiến lược gia tăng và chiến lược nhân đôi bằng cách phân tích tổng thời gian T (n) cần thiết để thực hiện một chuỗi n hoạt động push.
Chúng tôi bắt đầu với một ngăn xếp trống được đại diện bởi một mảng có kích thước 1.
Chúng tôi gọi thời gian phân bổ của một hoạt động đẩy là thời gian trung bình thực hiện bởi một lần đẩy qua một chuỗi hoạt động, nghĩa là $T (n) / n$.

**Incremental Strategy:** Thời gian phân bổ (thời gian trung bình cho mỗi hoạt động) của một hoạt động push là $O(n) [O(n^2)/n]$

**Doubling Strategy:** Trong phương pháp này, thời gian phân bổ của một hoạt động push là $O(1) [O(n)/n]$.

### So sánh Array Implementation & Linked List Implementation
**Array Implementation**
* Các hoạt động diễn ra trong constant time.
* Hoạt động nhân đôi rất tốn chi phí.
* Bất kỳ chuỗi nào gồm n thao tác (bắt đầu từ ngăn xếp trống) - giới hạn “phân bổ” cần thời gian tỷ lệ với n.

**Linked List Implementation**
* Tăng và giảm size một cách dễ dàng.
* Mọi hoạt động đều mất constant time $O(1)$
* Mọi hoạt động đều sử dụng thêm không gian và thời gian để xử lý các tham chiếu.