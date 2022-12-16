### Đề bài
Cho trước một Binary Tree `BT` và một giá trị `S`, kiểm tra xem `BT` có một đường đi từ root đến leaf mà tổng mỗi node trên đường đi đúng bằng `S` hay không. 
### Ví dụ
Cho cây nhị phân sau:
```ruby
      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
```

và  giá trị `S` = 22
Nhận thấy đường đi: `5 -> 4 -> 11 -> 2` có tổng là `5 + 4 + 11 + 2 == 22`, vậy nên giá trị trả về sẽ là `TRUE`.

### Hướng giải quyết
Trong dạng bài này đầu tiên chúng ta nghĩ tới sẽ là đệ quy, với một `node` đang xét, chúng ta sẽ đệ quy `left child` và `right child` của nó, và tất nhiên giá trị S sẽ giảm dần.
Đến khi node đang xét là `leaf`: `node.left == nil && node.right == nil` thì sẽ kiểm tra  giá trị `node` hiện tại với giá trị S.

### Lời giải
```ruby
class TreeNode 
    attr_accessor :val, :left, :right 
    
    def initialize(val)
        @val = val
        @left = nil
        @right = nil
    end
end

def has_path_sum?(root, sum)
    return false if root.nil?
    
    left_path_sum = has_path_sum?(root.left, sum - root.val) if root.left
    right_path_sum = has_path_sum?(root.right, sum - root.val) if root.right
   
     if root.left.nil? && root.right.nil? && root.val == sum
         return true
     end
     
     left_path_sum || right_path_sum
end
```