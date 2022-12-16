Chào anh em,
Đã lâu lắm không quay lại viết blog. 
Để ở màn cho đợt comeback  lần này. Mình xin giới thiệu 1 chủ đề đã cũ nhưng được xào nấu lại là NegaMax – Biến thể tối giản của MiniMax.

Oke chúng ta đi vào bài luôn.

I, Tại sao cần phải ra đời NegaMax?

- Đầu tiên, nhắc lại kiến thức cũ 1 tí. MiniMax là thuật toán xác định kết quả định lượng tình trạng hiện tại của trò chơi từ đó sẽ chọn bước đi tiếp theo.
(Xem bài viết về MiniMax của mình nếu chưa biết về MiniMax: https://viblo.asia/p/thuat-toan-minimax-ai-trong-game-APqzeaVVzVe)

Được mô tả bằng thuật toán như sau:

```
function minimax(node, depth, maximizingPlayer)
        if depth = 0 or node is a terminal node
        return the heuristic value of node 
        if maximizingPlayer
            bestValue := -∞
        for each child of node
            val := minimax(child, depth - 1, FALSE)
                bestValue := max(bestValue, val)
                return bestValue
        else
            bestValue := +∞
        for each child of node
                val := minimax(child, depth - 1, TRUE)
                bestValue := min(bestValue, val)
        return bestValue
```

Ta sẽ thấy qua là việc thực thi cho 2 bên min và max.

Liệu có cách nào có thể tối giản cho phần này không????
Oke, chúng ta gọi thì NegaMax trả lời. Dựa trên nguyên tắc thực tế max(a,b) = -min(-a,-b) giúp đơn giản cho việc thực hiện thuật toán MiniMax được dễ dàng hơn. 

Đến đây thì cũng hiểu tại sao lại tên NegaMax rồi nhỉ.  (= Negative Max theo ý kiến riêng mình suy ra nhé :D chưa search kiểm chứng vụ này).

II, Thuật toán NegaMax

```
function minimax(node, depth, maximizingPlayer)
    if depth = 0 or node is a terminal node
        return the heuristic value of node 
    bestValue := -∞
    foreach child of node
        val := -negamax(child, other_player)
        bestValue := max( bestValue, val )
    return bestValue
```

Và ta thấy  việc viết code được giảm đi kha khá.

Tương tự mình có thể áp dụng cắt tỉa Alpha Beta vào NegaMax.

```
function negamax(node, depth, α, β, color) is
    if depth = 0 or node is a terminal node then
        return color × the heuristic value of node

    childNodes := generateMoves(node)
    childNodes := orderMoves(childNodes)
    value := −∞
    foreach child in childNodes do
        value := max(value, −negamax(child, depth − 1, −β, −α, −color))
        α := max(α, value)
        if α ≥ β then
            break (* cut-off *)
    return value
```


Mình đi vào ví dụ trực quan hóa bằng hình như bên dưới

MiniMax:
![](https://images.viblo.asia/9d5813e6-d23b-4de0-890d-a9ccfa2e4def.png)

NegaMax:

![](https://images.viblo.asia/3db9281d-1f28-4ea9-bfe7-28025c7f7724.png)

Đi nhanh giải thích hình 2.
Ta có kết quả cuối cùng bên trái có kết quả ở các node lá là 2 và -5 => Max(2,-5) = 2

Node cha ở trên max(a,b) = -min(a,b). Tính được như sau: 2x(-1) = -2 và có node lá còn lại là 1.
Tiếp tục tương tự ta có: Max(-2,1) = 1. 
Và tiếp tục cho đến hết kết quả cuối cùng.

Đến đây chắc các bạn có cái nhìn sơ qua về thuật toán rồi.
Mình xin kết thúc tại đây.

Bài viết này được tham khảo: 
http://www.hamedahmadi.com/gametree/
https://en.wikipedia.org/wiki/Negamax