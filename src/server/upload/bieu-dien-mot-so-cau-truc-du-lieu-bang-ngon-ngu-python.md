# Giới thiệu đôi nét về Python
**Tổng quan:**   Python là một ngôn ngữ lập trình bậc cao, thông dịch, hướng đối tượng, đa mục đích và cũng là một ngôn ngữ lập trình động

**Một số tính năng nổi bật của Python**
1. Ngôn ngữ lập trình đơn giản, dễ học – rõ ràng
2. Miễn phí, mã nguồn mở
3. Khả năng di động linh hoạt: có thể lấy một mã và chạy nó trên bất kỳ máy nào, không cần phải viết mã khác nhau cho các máy khác nhau. 
4. Khả năng mở rộng và có thể nhúng
5. Ngôn ngữ thông dịch cấp cao
6. Thư viện tiêu chuẩn lớn để giải quyết những tác vụ phổ biến: Python có một số lượng lớn thư viện tiêu chuẩn giúp cho công việc lập trình trở nên dễ dàng, đơn giản hơn.
7. Hướng đối tượng: Mọi thứ trong Python đều là hướng đối tượng. Lập trình hướng đối tượng (OOP) giúp giải quyết những vấn đề phức tạp một cách trực quan.
# Danh sách liên kết 
*Trong phần này mình sẽ trình bày việc biểu diễn một số cấu trúc dữ liệu bằng ngôn ngữ Python bao gồm các danh sách liên kết đơn, kép, vòng, cây nhị phân,…*
## 1. Danh sách liên kết đơn
- Danh sách liên kết đơn được tạo nên từ các thành phần được liên kết với nhau bởi các con trỏ. Mỗi thành phần trong DSLK đơn chứa dữ liệu và một con trỏ trỏ tới thành phần tiếp theo. Mỗi thành phần (còn gọi là nút) của DSLK có thể mô tả như một hộp gồm hai ngăn: một ngăn chứa dữ liệu và một ngăn chứa con trỏ (thường gọi là next) như trong hình:

| Dữ liệu  | next |
| -------- | -------- |

- Trong nút cuối cùng của DSLK đơn, giá trị của next là hằng con trỏ NULL, có nghĩa là nó không trỏ tới đâu cả.
Để tiến hành các xử lý trên DSLK, ta cần phải có khả năng truy cập tới từng nút của DSLK. Nếu biết được nút đầu tiên, “đi theo” con trỏ next, ta truy cập tới nút thứ hai, rồi từ nút thứ hai ta có thể truy cập tới nút thứ ba, … Do đó, khi lưu trữ một DSLK, ta cần phải xác định một con trỏ trỏ tới nút đầu tiên trong DSLK đơn, con trỏ này sẽ được gọi là con trỏ đầu Head. Khi mà DSLK đơn không chứa thành phần nào cả (ta nói DSLK rỗng), ta lấy hằng con trỏ NULL làm giá trị của biến Head. Hình sau biểu diễn DSLK đơn với con trỏ đầu Head.

![](https://images.viblo.asia/40e95a94-78cb-415e-a1f3-3682984b8198.png)
Biểu diễn danh sách liến kết đơn

### 1.1 Tạo danh sách liên kết đơn
- Trong C/C++, ta có thể biểu diễn một nút bằng cách dùng kiểu cấu trúc. Trong Python, DSLK đơn có thể được biểu diễn như một lớp và mỗi nút là một lớp riêng biệt khác như sau:

```
# Lớp Node 
class Node: 
# Hàm khởi tạo đối tượng nút  
    	def __init__(self, data): 
        	self.data = data  
        	self.next = None  
# Lớp Linked List 
class LinkedList: 
    	# Hàm khởi tạo đối tượng Linked List 
    	def __init__(self):  
        	self.head = None

```

- Chương trình sau sẽ tạo một DSLK đơn gồm 3 nút:

```python
class Node: 

    def __init__(self, data): 
        self.data = data  # Assign data 
        self.next = None  # Initialize next as null 
class LinkedList: 
    def __init__(self): 
        self.head = None

if __name__=='__main__': 

    # Khởi đầu với danh sách rỗng 
    llist = LinkedList() 

    # Tạo 3 nút có dữ liệu lần lượt là 1, 2, 3 
    llist.head = Node(1) 
    second = Node(2) 
    third = Node(3) 

    llist.head.next = second;# Liên kết nút đầu với nút 2    
    second.next = third; # Liên kết nút thứ 2 với nút thứ 3
```

### 1.2 Duyệt danh sách liên kết đơn
- Giả sử đã có một DSLK đơn, duyệt DSLK đơn có nghĩa là truy cập tới từng nút của DSLK bắt đầu từ nút đầu tiên đến nút cuối cùng và tiến hành các xử lý cần thiết với mỗi thành phần của DSLK.

- Hàm sau đây định nghĩa trong lớp LinkedList trong ví dụ 2.1 để in dữ liệu của mỗi nút.
- In dữ liệu các nút, từ nút đầu của DSLK 
```python
    def printList(self): 
        temp = self.head 
        while (temp): 
            print (temp.data
            temp = temp.next
```
### 1.3 Chèn nút mới vào danh sách liên kết đơn
- Giả sử đã có một DSLK đơn với một con trỏ ngoài Head, ta cần chèn một nút mới chứa dữ liệu là value vào sau (trước) một thành phần được trỏ tới bởi con trỏ p. Các thao tác cần tiến hành để chèn một nút mới phụ thuộc vào vị trí của nút p, nó ở đầu hay giữa DSLK đơn, và ta cần xen vào sau hay trước nút p.

**Chèn nút mới vào đầu DSLK đơn:**

![](https://images.viblo.asia/240e4fc8-338d-4b99-a592-699c026430e3.png)

```python
# Hàm push() chèn nút mới vào đầu DSLK đơn 
def push(self, new_data): 
    # 1. Tạo nút mới
    # 2. và đặt dữ liệu cho nút mới
    new_node = Node(new_data) 
    # 3. Cho con trỏ next của nút mới trỏ vào Head 
    new_node.next = self.head 
    # 4. Di chuyển head trỏ vào nút mới  
    self.head = new_node 
```
**Chèn nút mới vào sau prev_node:**

![](https://images.viblo.asia/2087cac5-2f07-4910-ae63-54db9967f51c.png)

```python
# Hàm chèn nút mới vào sau nút prev_node cho trước. 
def insertAfter(self, prev_node, new_data):  
    # 1. Kiểm tra sự tồn tại của  nút prev_node 
    if prev_node is None: 
        print ("Nút pre_node không thể rỗng.")
        return
    # 2. Tạo nút mới & 
    # 3. Đặt dữ liệu cho nút mới 
    new_node = Node(new_data) 
    # 4. Gán con trỏ next của nút mới là prev_node.next  
    new_node.next = prev_node.next
    # 5. Cho next của prev_node trỏ vào new_node  
    prev_node.next = new_node

```

**Chèn nút mới vào sau nút cuối:**

![](https://images.viblo.asia/f99f0fd1-0970-4ff7-a0cb-f983cf80a55c.png)

```python
# Hàm thêm nút mới vào sau nút cuối. 
def append(self, new_data): 

   # 1. Tạo nút mới 
   # 2. Đặt dữ liệu cho nút mới 
   # 3. Cho next = None 
   new_node = Node(new_data) 
   # 4. Nếu DSLK là rỗng thì cho head trỏ vào nút mới 
   if self.head is None: 
        self.head = new_node 
        return
   # 5. Ngoài ra thì di chuyển last về nút cuối 
   last = self.head 
   while (last.next): 
       last = last.next
   # 6. Thay đổi next của nút cuối 
   last.next =  new_node

```

### 1.4 Xóa một nút khỏi danh sách liên kết đơn

- Ta cần xóa khỏi DSLK đơn một nút có giá trị khóa cho trước. Cũng như phép toán chèn, khi xóa một nút, cần quan tâm tới nó nằm ở đâu trong DSLK. Nếu nút cần xóa ở giữa DSLK thì giá trị của con trỏ ngoài head không thay đổi, nhưng nếu ta loại đầu DSLK thì nút tiếp theo trở thành đầu của DSLK, và do đó giá trị của con trỏ head cần thay đổi thích ứng .
- Để xóa một nút ở giữa DSLK, ta cần thực hiện theo các bước:
1. Tìm nút prev ở ngay trước nút cần xóa
2. Thay đổi liên kết của nút prev
3. Giải phóng bộ nhớ đối với nút cần xóa 

*Hàm sau đây minh họa phép toán xóa nút của DSLK đơn:*
```python
# Xóa nút có giá trị khóa trong DSLK đơn  
    def deleteNode(self, key):  
        temp = self.head  
        # Nếu nút đầu có giá trị khóa thì xóa nút đầu  
        if (temp is not None):  
            if (temp.data == key):  
                self.head = temp.next
                temp = None
                return
        while(temp is not None):  
            if temp.data == key:  
                break
            prev = temp  
            temp = temp.next

        if(temp == None):  
            return
        # Xóa nút khỏi DSLK  
        prev.next = temp.next
        temp = None
```

### 1.5 Tìm kiếm một nút trong danh sách liên kết đơn
- Để tìm một nút có giá trị khóa cho trước trong một DSLK đơn, ta thực hiện việc duyệt từng nút của DSLK kể từ nút đầu tiên. 
- Hàm sau đây sẽ minh họa phép toán tìm kiếm một nút:
```python
 # Kiểm tra nút có giá trị khóa x có trong DSLK không 
    def search(self, x): 
        current = self.head 
        while current != None: 
            if current.data == x: 
                return True # tìm thấy 
            current = current.next
        return False # không tìm thấy 
```
*Chú ý: Hàm đệ quy để kiểm tra xem nút có giá trị khóa cho trước có trong DSLK không.*
```python
def search(self, li, key): 
        if(not li): 
            return False
        if(li.data == key): 
            return True
        return self.search(li.next, key) 
```