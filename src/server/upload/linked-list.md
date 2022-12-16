# 1. Linked List là cái gì?
### Linked List là tập hợp các nodes được liên kết với nhau. Node sau chứa link đến node trước :D
![](https://images.viblo.asia/e531ddbd-d7e8-433a-8b89-84ad477e22d5.png)
-> Một linked list chứa tập hợp các node.

![](https://images.viblo.asia/a0200582-3ac6-409d-929e-43e3b4f0050b.png)
->Một node chứa data và liên kết đến node tiếp theo. Ví dụ ở đây data là 12. Có thể thay thế bằng các object hoặc bất kì dữ liệu nào khác thậm chí là một linked list khác (hại não =)) )

![](https://images.viblo.asia/021a47c7-afd2-4c55-ba46-1b52e211a42f.png)

![](https://images.viblo.asia/a2c2788f-73b0-44da-a81f-5bff56360518.png)
# 2. Đặc điểm chính:
## Ưu điểm:
   - Tiết kiếm bộ nhớ và cấp phát động: Không như array cần 1 lượng chỉ định ô nhớ trên bộ nhớ ngay khi khỏi tạo. Linked list chỉ sử dụng bộ nhớ để lưu trữ khi dữ liệu thực sự được lưu vào linked list.
   - Nó còn có thể lưu các phần tử ở bất cứ đâu được phép trên bộ nhớ mà không cần các ô nhớ liền kề nhau như array :D 
   - Quick insertion (Thêm rất nhanh với complexity chỉ là O(1))
   - Quick deletion (Xóa nhanh)
## Nhược điểm
   - Slow search (Tìm kiểm chậm do phải duyệt qua nhiều node để đến được node cần tìm)
# 3. Thực hiện tạo linked list trên python
### Đầu tiên ta tạo 1 class nodes trên python: 
```
class Node:
    def __init__(self,data):
        self.data = data #Đây là dữ liệu mà ta sẽ lưu trữ trong mỗi node
        self.next = None #Đây là con trỏ trỏ đến node tiếp theo trong linked list
```
### Thử set dữ liệu cho các node bằng tay:
```
node1 = Node("Java")
node2 = Node("Python")
node3 = Node("C++")
node1.next = node2
node2.next = node3

# Ta sẽ được linked list dạng như: Java -> Python -> C++
```
### Hàm push để thêm dữ liệu cho linked list
```
def push(head, valuetoInsert):
    currentNode = head
    while currentNode is not None:
        if currentNode.nextNode is None:
            currentNode.nextNode = linkedListNode(valuetoInsert)
            return head
        currentNode = currentNode.nextNode
```
### Thử tạo hàm duyệt các phần tử của linked list:
```
class Node:
    ...
    
    def traverse(self):
        node = self # Xác định node đầu tiên hay còn gọi là head node
        while node != None:
            print node.data # in ra dữ liệu
            node = node.next # tiếp tực đến node tiếp theo
```
### Ngoài ra ta còn có Double Linked List (Danh sách liên kết đôi)
```
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None
```
   -> Điểm khác nhau của double linked list và linked list chính là mỗi node của DLL vừa có chứa con trỏ đến node tiếp theo vừa chứa con trỏ đến node trước nó.
#    4. Độ phức tạp thuật toán của linked list
Với n là số phần tử của linked:
    - Thêm một phần tử vào sau danh sách: O(n) do phải duyệt hết các ptử để lấy node ở đuôi
    - Thêm một phần tử ở đầu danh sách: O(1)
    - Duyệt qua tất cả các phần tử O(n)
    - Xóa 1 phần tử: Trường hợp xấu nhất là O(n) và tốt nhất là O(1)
    ## Tài liệu tham khảo: https://medium.com/@kojinoshiba/data-structures-in-python-series-1-linked-lists-d9f848537b4d