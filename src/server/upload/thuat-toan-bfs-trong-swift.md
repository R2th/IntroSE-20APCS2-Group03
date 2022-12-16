# Giới thiệu
Xin chào các bạn, đến hẹn lại lên trong bài trước thì mình đã chia sẻ về một số kiến thức cơ bản trong lý thuyết đồ thị và thuật toán Dijkstra. Hôm nay mình xin phép chia sẻ về 1 thuật toán cơ bản nhưng cực kì mạnh mẽ và hiệu quả trong đồ thị đó là `Tìm kiếm theo chiều rộng` (Breadth-First Search hay gọi tắt là BFS).
# Thuật toán BFS
Tìm kiếm theo chiều rộng (BFS) là một thuật toán để duyệt hoặc tìm kiếm cấu trúc dữ liệu cây hoặc đồ thị.

Về cơ bản, mục đích của BFS là từ một đỉnh chọn trước s, ta đi thăm tất cả các đỉnh u có liên thông với s và (có thể) đi qua tất cả các cạnh trong nhóm liên thông của s. 

Tên của thuật toán được đặt theo cách chúng ta đi thăm các đỉnh. Cụ thể là từ đỉnh xuất phát s, ta đi đến tất cả các đỉnh u1,u2,…ui ở kề với s, sau đó ta đến tất cả các đỉnh v1,v2,…vj kề với các đỉnh u1,u2…. Tiếp đó, ta đến tất cả các đỉnh t1,t2,…tk kề với các đỉnh được đến thăm trong lựơt trước, cho đến khi không còn đỉnh nào để thăm. 

Ta có thể thâý, các đỉnh đựơc đến thăm ưu tiên theo chiều rộng, đỉnh gần với điểm xuất đựơc đến thăm trước. Trong ví dụ trên, thứ tự đi thăm sẽ là s,u1,u2,…ui,v1,v2,…vj,t1,t2,…tk.

Đây là cách tìm kiếm theo chiều rộng hoạt động trên biểu đồ:

![](https://images.viblo.asia/fb5849a5-be40-46c5-8b85-c5636c9b1338.gif)

Khi ta truy cập vào một nút thì nút đó sẽ được tô màu đen.
Chúng ta sẽ theo dõi thuật toán thông qua ví dụ đồ thị động bên trên. Chúng ta sẽ bắt đầu với đỉnh A và sẽ `add` nó 1 hàng đợi. Trên hình thì ta thấy đỉnh A trở nên màu xám

```
queue.enqueue(A)
```

Bây giờ hiện tại queue là [ A ]. Ý tưởng của thuật toán là sẽ dùng một hàng đợi Queue để ghi nhớ các đỉnh chưa được thăm. Vì đặc tính của queue là vào trước ra trước(FIFO), các đỉnh được đưa vào queue sẽ được lấy ra trước, và như vật sẽ được thăm trước. Mỗi đỉnh sẽ có 2 trạng thái( Trắng là chưa thăm, đen là đã thăm). 

Oke ta sẽ bắt đầu với đồ thị ở trên, sau khi đỉnh A được thăm thì màu của nó sẽ chuyển qua màu đen. Sau đó chúng ta `enqueue` 2 đỉnh hàng xóm của nó là B và C. Màu chúng sẽ trở thành xám. Đồng thời sẽ `dequeue` đỉnh A vì nó đã được thăm rồi.

```
queue.dequeue()   // A
queue.enqueue(B)
queue.enqueue(C)
```

Queue hiện tại là [B, C]. Ta sẽ `dequeue` đỉnh B và sau đó `enqueue` hàng xóm của B là D và E.

```
queue.dequeue()   // B
queue.enqueue(D)
queue.enqueue(E)
```

Queue hiện tại sẽ là [C, D, E]. Tiếp tục `dequeue` C và `enqueue` hàng xóm của C là F và G.

```
queue.dequeue()   // C
queue.enqueue(F)
queue.enqueue(G)
```

Queue hiện tại là [D, E, F, G]. Tiếp tục `dequeue` D. Tại đây ta sẽ không có đỉnh nào để `enqueue` vào nữa vì thằng D nó không có hàng xóm (chắc do ăn ở =)) )

```
queue.dequeue()   // D
```

Queue bây giờ còn [E, F, G]. Tiếp tục `dequeue` E và `enqueue` đỉnh H. Chúng ta lưu ý chỗ này thằng B cũng là hàng xóm của thằng E nhưng vì nó đã được thăm rồi nên nó sẽ không được `add` và queue nữa.

```
queue.dequeue()   // E
queue.enqueue(H)
``` 

Queue hiện tại là [F, G, H]. Tiếp tục `dequeue` F và thằng này thì hàng xóm của nó đã được thăm hết nên ở đây không `enqueue` thằng nào vào nữa.

```
queue.dequeue()   // F
```

Queue hiện tại là [G, H]. Tiếp tục `deqeue` G. Tại đây cũng không có hàng xóm nào chưa thăm nên cũng không `enqueue` 

```
queue.dequeue()   // G
```

Queue hiện tại là [H]. Tiếp tục `dequeue` H cũng đã hết hàng xóm 

```
queue.dequeue()   // H
```

Và cuối cùng Queue đã trống, có nghĩa là tất cả các đỉnh đã được thăm. Thứ tự các đỉnh đã được thăm là `A, B, C, D, E, F, G, H`.

Chúng ta có thể trực quan bằng cách xem `tree` dưới đây: 

![](https://images.viblo.asia/136a2959-3125-48db-91d1-80df22ae118b.png)

Cha của đỉnh đó là đỉnh mà phát hiện ra nó. Đỉnh A là đỉnh mà mình bắt đầu với BFS

Đối với đồ thì mà không có trọng số thì ở trên cây này là xác định một đường đi ngắn nhất từ đỉnh bắt đầu đến mọi đỉnh khác. Vì vậy tìm kiếm theo chiều rộng là một trong nhiều cách tìm đường đi ngắn nhất giữa 2 đỉnh trong đồ thị.

# Implementation thuật toán BFS bằng ngôn ngữ Swift

Ở đây đầu vào ta sẽ cần 1 đồ thị là Grap và 1 đỉnh bắt đầu

```
func breadthFirstSearch(_ graph: Graph, source: Node) -> [String] {
  var queue = Queue<Node>()
  queue.enqueue(source)

  var nodesExplored = [source.label]
  source.visited = true

  while let node = queue.dequeue() {
    for edge in node.neighbors {
      let neighborNode = edge.neighbor
      if !neighborNode.visited {
        queue.enqueue(neighborNode)
        neighborNode.visited = true
        nodesExplored.append(neighborNode.label)
      }
    }
  }

  return nodesExplored
}
```


```
let graph = Graph()

let nodeA = graph.addNode("a")
let nodeB = graph.addNode("b")
let nodeC = graph.addNode("c")
let nodeD = graph.addNode("d")
let nodeE = graph.addNode("e")
let nodeF = graph.addNode("f")
let nodeG = graph.addNode("g")
let nodeH = graph.addNode("h")

graph.addEdge(nodeA, neighbor: nodeB)
graph.addEdge(nodeA, neighbor: nodeC)
graph.addEdge(nodeB, neighbor: nodeD)
graph.addEdge(nodeB, neighbor: nodeE)
graph.addEdge(nodeC, neighbor: nodeF)
graph.addEdge(nodeC, neighbor: nodeG)
graph.addEdge(nodeE, neighbor: nodeH)
graph.addEdge(nodeE, neighbor: nodeF)
graph.addEdge(nodeF, neighbor: nodeG)

let nodesExplored = breadthFirstSearch(graph, source: nodeA)
print(nodesExplored)
```

Kết quả sẽ là `["a", "b", "c", "d", "e", "f", "g", "h"]`

# Tổng kết
Vậy sau bài này mình đã trình bày các khái niệm cơ bản thuật toán BFS cũng như cách triển khai nó bằng Swift. Hy vọng giúp ích cho mọi người. Cảm ơn các bạn đã theo dõi.

# Tài liệu tham khảo 

1. https://github.com/raywenderlich/swift-algorithm-club/tree/master/Breadth-First%20Search

2. https://en.wikipedia.org/wiki/Breadth-first_search