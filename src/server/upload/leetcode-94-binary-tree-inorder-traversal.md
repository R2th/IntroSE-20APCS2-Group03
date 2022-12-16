![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/09/tree-569275_1920.jpeg)

Tuần này, mình cùng giải tiếp một bài leetcode về binary tree, [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

## Đề bài
Given the root of a binary tree, return the inorder traversal of its nodes’ values.

**Ví dụ 1**

```
Input: root = [1,null,2,3]
Output: [1,3,2]
```

**Ví dụ 2**
```
Input: root = [1,null,2]
Output: [1,2]
```
(bạn hãy đọc đề trong leetcode để có mô tả thêm về hình ảnh nhé)

## Phân tích đề

Đề tài yêu cầu mình sẽ nhận một cây nhị phân, rồi trả về giá trị của nút theo thứ tự duyệt là inorder traversal. 

### Cây nhị phân

**[Cây nhị phân(binary tree)](https://vi.wikipedia.org/wiki/C%C3%A2y_nh%E1%BB%8B_ph%C3%A2n)** là một cấu trúc dữ liệu dạng cây mà mỗi nút có nhiều nhất hai nút con: nút trái và nút phải.

Ở ví dụ 1, cây nhị phân có giá trị là root = [1,null,2,3]

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-11.09.54.png)

Cây được mô tả như hình bên với 1 là nút gốc, null là nút trái, 2 là nút phải, sau 2 còn giá trị là 3 nên 3 là nút trái của cây con có gốc là 2.

<hr/>

Cây nhị phân được biểu diễn là một đối tượng của lớp đối tượng TreeNode với code Python như sau:

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

Để tạo được cây với giá trị `[1, null, 2, 3]` thì leetcode đã giúp mình làm thao tác tạo cây này rồi, code của nó sẽ tương tự như thế này.

```python
root = TreeNode(1)
root.right = TreeNode(2)
root.right.left = TreeNode(3)
```

Khi mình thực hiện print(root) là mình nhận được đối tượng ấy:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-16.41.15.png)

### Inorder traversal

**Inorder traversal** là một cách duyệt cây nhị phân theo thứ tự **Left – Root – Right**. 

Ở đây chữ **in** thể hiện nút gốc sẽ được duyệt ở giữa, tức thứ tự là duyệt nút trái, nút gốc rồi đến nút phải

*Thuận toán Inorder Traversal cụ thể là:*

   – Duyệt cây bên trái (theo inorder traversal)

   – Duyệt nút gốc

   – Duyệt cây bên phải (theo inorder traversal)
   
## Hướng tiếp cận 1: Đệ quy
   
### Tìm công việc được lặp lại và xây dựng hàm đệ quy

#### Công việc được lặp lại

Để duyệt cây trên với thứ tự Left – Root – Right thì mình sẽ thực hiện như hình dưới và bỏ qua các giá trị null mình nhận được kết quả là `[1, 3, 2]`

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-16.14.04.png)

Nếu để ý bạn có thể thấy tại vị trí số 2, chính là duyệt Left – Root – Right cho cây con từ vị trí này, và đây chính là công việc được lặp lại.

#### Hàm đệ quy cho công việc được lặp lại

Công việc được lặp lại là: duyệt bên trái, duyệt gốc, duyệt bên phải.

Tạo một hàm có tên là recursive_inorder_traversal với công việc trên và thực hiện gọi đệ quy cho bên trái, bên phải như sau:

```python
def recursive_inorder_traversal(root):
    """Recursive inorder traversal"""
    if root:
        # duyệt bên trái
        recursive_inorder_traversal(root.left)
        # duyệt gốc
        print(root.val)
        # duyệt bên phải
        recursive_inorder_traversal(root.right)
```

Khi đó kết quả có được là:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-02-at-17.28.52.png)

Ví dụ về cách tạo cây và hàm đệ quy duyệt cây theo inorder traversal [ở đây](https://replit.com/@diemthanhthanh/inorder-traversa), nếu thích bạn có thể fork về repl.it xem thử.

À, cái cây đẹp hông ^^, cái cây này mình lượm nó ở trên [ASCII Art](https://ascii.co.uk/art/) ấy.

### Code

Sau khi đã biết cách duyệt cây theo thứ tự inorder traversal rồi, mình có thể sử dụng một danh sách  tên là results để lưu lại kết quả trên, và đây là đáp án submit leetcode với hướng này:

```python
class Solution:
    def inorderTraversal(self, root): 
        results = []
        self.recursive_inorder_traversal(root, results)
        return results
    
    def recursive_inorder_traversal(self, root, results=None):
        """Recursive inorder traversal"""
        if root:
            # duyệt bên trái
            self.recursive_inorder_traversal(root.left, results)
            # duyệt gốc
            results.append(root.val)
            # duyệt bên phải
            self.recursive_inorder_traversal(root.right, results)
```

### Độ phức tạp

Từ bài này mình sẽ thử đi phân tích độ phức tạp của các hướng tiếp cận để dễ dàng hơn trong việc đánh giá phương án nào là tối ưu hơn. Có hai chỉ số hay sử dụng khi phân tích độ phức tạp của một thuật toán là: **Time complexity** và **Space complexity**.

Time complexity thể hiện thời gian, còn Space complexity thể hiện cho việc sử dụng bộ nhớ.

(Cái này mình cũng còn cù lần lắm nên mình có đi tham khảo xung quanh nếu có gì sai sót mong anh chị em chỉ bày nha.)

#### Time Complexity

Phương án này mình dùng đệ quy duyệt qua cây bên trái và bên phải, nên có T(n) = 2 * T(n/2) + 1

Do đó, time complexity là **O(n)**

#### Space Complexity

Phương án này mình dùng một biến results lưu kết quả:

– nếu cây nhị phân này mỗi gốc chỉ có một nút thôi thì space sẽ là O(log n)

– nếu cây nhị phân này mỗi gốc có đủ hai nút, thì space sẽ là O(n)

Do đó, space complexity là **O(n)**

## Hướng tiếp cận 2: dùng ngăn xếp(stack)

### Ngăn xếp là gì?

Ngăn xếp(stack) có thể hiểu đơn giản là một cái hộp giấy, nơi bạn có thể bỏ vào (*push*) các tờ giấy theo thứ tự từ dưới lên trên, và khi muốn lấy ra(*pop*) thì mình sẽ lấy theo từ trên xuống dưới. 

Nó có thứ tự là “*vào sau – ra trước*” hay “*last in – first out*” hay *LIFO*.

Bạn có thể đọc thêm về [ngăn xếp ở Wikipedia tiếng Việt](https://vi.wikipedia.org/wiki/Ng%C4%83n_x%E1%BA%BFp) hoặc xem video dưới đây nha.

https://youtu.be/CgFVgp_VCN8

### Vì sao chọn ngăn xếp?

Bạn có thắc mắc vì sao bài toán này có thể giải với ngăn xếp không nhỉ?

Đơn giản là ngăn xếp có thể giúp mình chứa các nút theo thứ tự và mình có thể lấy ra với thứ tự từ trên xuống dưới, thứ tự này tương tự như khi mình lấy từ lá đến gốc 

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-03-at-14.25.49.png)

*Còn điều kiện để lấy một phần tử ra khỏi ngăn xếp là gì?*

Nếu đã hết **nút để duyệt(null)** thì mình sẽ lấy nút từ ngăn xếp ra, thêm giá trị của nút đó vào kết quả rồi, chuyển nút đó thành nút tiếp theo cần duyệt rồi tiếp tục duyệt qua nút bên phải của nút đó(vì bên trái đã duyệt rồi). 

*Vậy còn khi nào thì chương trình kết thúc? *

Chương trình sẽ kết thúc khi ngăn xếp không còn nút nào để lấy, và nút ở vị trí hiện tại là null.

### Giải bài toán với ngăn xếp

Mình sẽ dùng một biến **curr** để lưu nút hiện tại đang duyệt, một biến **stack**(list) để lưu các nút và một biến **results**(list) để lưu kết quả.

**Ban đầu:**

– curr có giá trị là root, tức mình bắt đầu duyệt từ nút gốc

– stack và results có giá trị là []

Cùng xem qua sơ đồ mình vẽ cho bài toán này nhé(bạn có thể xem dạng [slide show](https://beautyoncode.com/leetcode-94-binary-tree-inorder-traversal/) ở blog của mình nha).

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/1.png)
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/2.png)
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/3.png)
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/4.png)
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/5.png)
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/6.png)
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/09/7.png)

Như vậy, mình có thể thấy là ban đầu biến curr có giá trị là root, tiến hành bỏ nút curr này vào stack, sau đó nó thay đổi thành curr.left và cứ tiếp tục bỏ vào stack cho đến khi curr.left là null, tức là đã đến nút lá cuối cùng của cây ở phía bên trái, thì nó sẽ bắt đầu tiến hành lấy từ ngăn xếp ra, đặt kết quả nút trái cuối cùng vào sau đó lại qua phía bên phải. 

Tức là mình luôn thực hiện theo thứ tự Left – Root – Right theo đề bài yêu cầu.

### Code

```python
class Solution:
    def inorderTraversal(self, root): 
        results = []
        stack = []
        curr = root
        
        while (curr or len(stack) != 0):
            while curr:
                stack.append(curr)
                curr = curr.left
            
            curr = stack.pop()
            results.append(curr.val)
            curr = curr.right
        
        return results
```

### Độ phức tạp

Time Complexity: O(n)

Space Complexity: O(n)

<hr/>

Bài tập hôm nay đến đây là hết rồi, ai có cách giải nào xịn hơn thì nhớ comment bày mình với nhé. 

À, mình có tạo một danh sách các bài easy trên Leetcode mà mình thực hành ở đây, bạn có thể Clone về tài khoản leetcode của bạn để thực hành nhé.

Và [bài gốc của nội dung này](https://beautyoncode.com/leetcode-94-binary-tree-inorder-traversal/) nằm trên blog cá nhân của mình nhé!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!