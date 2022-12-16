## 1. Cây nhị phân tìm kiếm (Binary Search Tree)

![](https://images.viblo.asia/124ec21b-2296-4e89-82a2-928d7a980ae7.jpg)

Một cây tìm kiếm nhị phân (Binary Search Tree – viết tắt là BST) là một cây mà trong đó tất cả các nút đều có các đặc điểm sau:

Cây con bên trái của một nút có khóa (key) nhỏ hơn hoặc bằng giá trị khóa của nút cha (của cây con này).

Cây con bên phải của một nút có khóa lớn hơn hoặc bằng giá trị khóa của nút cha (của cây con này).

Vì thế có thể nói rằng, một cây tìm kiếm nhị phân (BST) phân chia tất cả các cây con của nó thành hai phần: cây con bên trái và cây con bên phải và có thể được định nghĩa như sau:

```
left_subtree (keys)  ≤  node (key)  ≤  right_subtree (keys)
```

## 2. Cấu trúc dữ liệu cây
Cây nhị phân là một cấu trúc dữ liệu đặc biệt được sử dụng cho mục đích lưu trữ dữ liệu.
Một cây nhị phân có một điều kiện đặc biệt là mỗi nút có thể có tối đa hai nút con. 
Một cây nhị phân tận dụng lợi thế của hai kiểu cấu trúc dữ liệu: một mảng đã sắp thứ tự và một danh sách liên kết (Linked List), do đó việc tìm kiếm sẽ nhanh như trong mảng đã sắp thứ tự và các thao tác chèn và xóa cũng sẽ nhanh bằng trong Linked List.

![](https://images.viblo.asia/e09fad1d-478b-4f80-b61b-cd10499908f8.jpg)

###  2.1 Node

Node trong cây tìm kiếm nhị phân có đặc điểm chung là giá trị bên phải bao giờ cũng lớn hơn giá trị bên trái.
Một node trong cây tìm kiếm nhị phân sẽ bao gồm node trái-phải, key giá trị của node đó trong cây.

```
class BSNode<T>{
    var key: T?
    var left: BSNode?
    var right: BSNode?
}
```

```
public var isLeaf: Bool {
    return left == nil && right == nil
}
```

thuộc tính này để xác định node là leaf hay còn node con nữa.

### 2.2 Bậc của node cây nhị phân tìm kiếm
bậc của một nút biểu diễn số con của một nút. Nếu nút gốc có bậc là 0, thì nút con tiếp theo sẽ có bậc là 1, và nút cháu của nó sẽ có bậc là 2, …

```
public func height() -> Int {
    if isLeaf {
        return 0
    } else {
        return 1 + max(left?.height() ?? 0, right?.height() ?? 0)
    }
}
```

## 3. 1 số hoạt động cơ bản trên cây nhị phân tìm kiếm
### 3.1 Chèn thêm node vào cây
Mỗi khi một phần tử được chèn: đầu tiên chúng ta cần xác định vị trí chính xác của phần tử này. 
Bắt đầu tìm kiếm từ nút gốc, sau đó nếu dữ liệu là nhỏ hơn giá trị khóa (key), thì tìm kiếm vị trí còn trống ở cây con bên trái và chèn dữ liệu vào đó; nếu dữ liệu là nhỏ hơn thì tìm kiếm vị trí còn sống ở cây con bên phải và chèn dữ liệu vào đó.

```
func insert(element key: T) {
    // init root
    guard root.key != nil else {
        root.key = key
        return
    }
    
    var current: BSNode<T> = root
    
    while current.key != nil {
        if key < current.key! {
            if let leftBSNode = current.left {
                current = leftBSNode
            } else {
                let childBSNode = BSNode<T>()
                childBSNode.key = key
                current.left = childBSNode
                break
            }
        } else if key > current.key! {
            if let rightBSNode = current.right {
                current = rightBSNode
            } else {
                let childBSNode = BSNode<T>()
                childBSNode.key = key
                current.right = childBSNode
                break
            }
        }
    }
}
```

### 3.2 Duyệt cây nhị phân tìm kiếm

![](https://images.viblo.asia/2311a4fc-1eb3-4aaa-aa99-2d8a33d3443a.png)

Khi bạn muốn xem tất cả node trong cây nhị phân tìm kiếm, chúng ta sẽ tiến hành duyệt cây, như ví dụ ở trên khi duyệt chúng ta sẽ in ra các giá trị cây từ nhỏ nhất đến lớn nhất tương ứng: 1, 2, 5, 7, 9, 10.
Việc duyệt cây nhị phân tìm kiếm sẽ bắt đầu từ ngọn (root) sau đó đi sang trái tìm đến giá trị nhỏ nhất rồi lần lượt đi hết sang bên phải.

```
func traverse() {
    
    //trivial condition
    guard let key = self.key else {
        print("no key provided..")
        return
    }
    
    //process the left side
    if self.left != nil {
        left?.traverse()
    }
    
    print("...the value is: \(key) - height: \(self.height)..")
    
    //process the right side
    if self.right != nil {
        right?.traverse()
    }
}
```

### 3.3 Tìm kiếm trên cây nhị phân
Tìm kiếm trên cây nhị phân được thực hiện theo 3 bước
* nếu giá trị lớn hơn giá trị ở gốc thì tìm kiếm bên phải.
* nếu gía trị nhỏ hơn giá trị gốc thì tìm kiếm bên trái.
* nếu giá trị node tiếp theo bằng giá trị tìm kiếm thì trả về node tương ứng còn nếu ko trả về nil

![](https://images.viblo.asia/5e6cc0ae-9905-4b52-9e84-e88085922aad.png)

```
public func search(value: T) -> BSNode<T>? {
    var node: BSNode<T>? = self.root
    
    while let n = node {
        if value < n.key! {
            node = n.left
        } else if value > n.key! {
            node = n.right
        } else {
            return node
        }
    }
    
    return nil
}
```