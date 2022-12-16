#### Mở Đầu


-----

 Các đồ thị trong khoa học máy tính là một chủ đề khá thú vị và thuật toán đồ thị là một trong những câu hỏi yêu thích trong các cuộc phỏng vấn kỹ thuật. Trong bài viết này, chúng ta sẽ tìm hiểu về chúng một cách nhanh chóng. Đây là cấu trúc cơ bản mà chúng ta sẽ sử dụng sau này khi chúng ta đến với phần tiếp theo là thuật toán Dijkstra để tìm đường đi ngắn nhất. Đến cuối bài viết, bạn sẽ nắm được các đồ thị đơn giản như thế nào và chúng hữu ích như thế nào.

 <br>
 
#### Vertices And Edges
-----

Để hiểu các đồ thị nói chung, bạn sẽ cần phải làm quen với một vài thuật ngữ cơ bản:

* **Vertex** - Là một node trên biểu đồ. Trong thực tế nó có thể đại diện cho bất cứ điều gì có thể được kết nối. Một sân bay, một thành phố, một ngã ba đường.
* **Edge** - Là một liên kết giữa hai đỉnh. Họ có hai loại: có hướng (directed) và không có hướng(undirected). Cạnh được định hướng luôn luôn chỉ theo cùng một cách. Nó có một nguồn và một điểm đến. Nó giống như một con đường một chiều. Cạnh không xác định có thể trỏ theo cả hai cách.
* **Weight** - Đại diện cho giá trị của cạnh. Nếu biểu đồ của bạn đại diện cho các sân bay, Weight có thể đại diện cho giá của vé máy bay, ví dụ.

<br>

![](https://images.viblo.asia/fb9759d9-b183-4a17-906f-b59b11c2428c.png)

Biết được những thuật ngữ này, chúng ta có thể hiểu tiêu đề của bài viết này tốt hơn rất nhiều. ‘**Edge**-**Weighted**‘ có nghĩa là đồ thị sẽ có các cạnh (hoặc các kết nối) có trọng lượng (hoặc cost), ‘**Digraph**’ có nghĩa là đồ thị sẽ là đồ thị có hướng - các cạnh sẽ chỉ có một chiều.

<br>

#### Airports

Hãy triển khai biểu đồ này trên một ví dụ thú vị. Các đỉnh trong biểu đồ của chúng tôi sẽ đại diện cho các sân bay và các cạnh sẽ là các chuyến bay trực tiếp giữa các sân bay. The weight sẽ là giá vé máy bay.

Toàn bộ ví dụ mã sẽ chỉ sử dụng ba classes. Đầu tiên trong danh sách là đỉnh(vertex). Đây sẽ là một trivial class để thực hiện:

```
class Vertex<Element: Equatable> {
    var value: Element
    private(set) var adjacentEdges: [DirectedEdge<Element>] = []
    
    init(_ value: Element) {
        self.value = value
    }
    
    func addEdge(_ edge: DirectedEdge<Element>) {
        self.adjacentEdges.append(edge)
    }
    
    func edgeForDestination(_ destination: Vertex<Element>) -> DirectedEdge<Element>? {
        return adjacentEdges.filter { $0.destination == destination }.first
    }
}

extension Vertex: Equatable {
    static func ==(lhs: Vertex, rhs: Vertex) -> Bool {
        return lhs.value == rhs.value && lhs.adjacentEdges == rhs.adjacentEdges
    }
}
```

Đỉnh của chúng ta giữ một giá trị chung và nó có một mảng các cạnh liền kề (các kết nối gửi đi). Chúng ta có một hàm để thêm một cạnh và một hàm sẽ trả về một cạnh tới một đỉnh đích nếu nó tồn tại. Chúng tôi cũng đã triển khai ‘**Equatable**’ để chúng tôi có thể dễ dàng kiểm tra nếu hai đỉnh bằng nhau.

Class tiếp theo là ‘DirectedEdge’ sẽ đại diện cho một kết nối giữa hai đỉnh:

```
class DirectedEdge<Element: Equatable> {
    var source: Vertex<Element>
    var destination: Vertex<Element>
    var weight: Double
    
    init(source: Vertex<Element>, destination: Vertex<Element>, weight: Double) {
        self.source = source
        self.destination = destination
        self.weight = weight
    }
}

extension DirectedEdge: Equatable {
    static func ==(lhs: DirectedEdge, rhs: DirectedEdge) -> Bool {
        return lhs.source == rhs.source &&
            lhs.destination == rhs.destination &&
            lhs.weight == rhs.weight
    }
}
```

Như bạn có thể thấy, lớp này thậm chí còn đơn giản hơn. Nó chỉ giữ source, destination và weight của cạnh. Chúng tôi cũng đã thực hiện ‘Equatable’ tại đây.

<br>

#### The Graph

Biểu đồ thực tế là một class lớn hơn một chút, nhưng vẫn khá đơn giản để hiểu:

```
class EdgeWeightedDigraph<Element: Equatable> {
    private(set) var vertices: [Vertex<Element>] = []
    
    func addVertex(_ vertex: Vertex<Element>) {
        vertices.append(vertex)
    }
    
    // This function assumes that the source and destination vertices are in the vertices array.
    func addEdge(source: Vertex<Element>, destination: Vertex<Element>, weight: Double) {
        
        // If we find an existing edge, just update the weight.
        if let existingEdge = source.edgeForDestination(destination) {
            existingEdge.weight = weight
        } else {
            let newEdge = DirectedEdge<Element>(source: source, destination: destination, weight: weight)
            source.addEdge(newEdge)
        }
    }
    
    func adjacentEdges(forVertex vertex: Vertex<Element>) -> [DirectedEdge<Element>] {
        return vertex.adjacentEdges
    }
    
    func edges() -> [DirectedEdge<Element>] {
        return vertices
            .reduce([DirectedEdge<Element>]()) {
                (result, vertex) -> [DirectedEdge<Element>] in
                return result + vertex.adjacentEdges
        }
    }
    
    func edgesCount() -> Int {
        return edges().count
    }
    
    func verticesCount() -> Int {
        return vertices.count
    }
}
```

 Trong hàm ‘addEdge’, chúng tôi đang kiểm tra xem cạnh đã tồn tại chưa. Nếu có, chúng tôi sẽ cập nhật weight của cạnh đó. Hàm này giả định rằng các đỉnh ‘source’ và ‘destination’ đã có trong mảng, chỉ để giữ cho mọi thứ đơn giản và rõ ràng. Chúng ta có thể nhận được một mảng của tất cả các đỉnh và tất cả các cạnh trong biểu đồ. Chúng ta cũng có thể nhận được một mảng các cạnh liền kề cho một đỉnh nhất định. Để hoàn thành, chúng tôi có các hàm trả về số đỉnh và cạnh trong biểu đồ.
 
 <br>
 
#### Test It Out

Chúng ta sẽ xây dựng một biểu đồ giống như sau:

![](https://images.viblo.asia/d6a0b19e-3061-4ad1-8504-a0e8a86499ae.png)

Nó có thể trông phức tạp, nhưng nó khá đơn giản để xây dựng nó bằng cách sử dụng class của chúng tôi:

```
let dublin = Vertex<String>("Dublin")
let london = Vertex<String>("London")
let paris = Vertex<String>("Paris")
let amsterdam = Vertex<String>("Amsterdam")
let montreal = Vertex<String>("Montreal")
let sanFrancisco = Vertex<String>("San Francisco")

let graph = EdgeWeightedDigraph<String>()
// Don't forget to add the vertices
graph.addVertex(dublin)
graph.addVertex(london)
graph.addVertex(paris)
graph.addVertex(amsterdam)
graph.addVertex(montreal)
graph.addVertex(sanFrancisco)
    
graph.addEdge(source: dublin, destination: london, weight: 20)
graph.addEdge(source: dublin, destination: amsterdam, weight: 25)
graph.addEdge(source: dublin, destination: paris, weight: 35)
graph.addEdge(source: london, destination: paris, weight: 10)
graph.addEdge(source: london, destination: montreal, weight: 200)
graph.addEdge(source: london, destination: sanFrancisco, weight: 500)
graph.addEdge(source: paris, destination: amsterdam, weight: 10)
graph.addEdge(source: paris, destination: sanFrancisco, weight: 400)
graph.addEdge(source: amsterdam, destination: montreal, weight: 300)
graph.addEdge(source: amsterdam, destination: sanFrancisco, weight: 450)
graph.addEdge(source: montreal, destination: sanFrancisco, weight: 200)
graph.addEdge(source: sanFrancisco, destination: dublin, weight: 700)
```

Đầu tiên chúng ta tạo các đỉnh và thêm chúng vào biểu đồ. Sau đó, chúng tôi thêm cạnh với weights. Ghi nhớ, bạn phải thêm đỉnh vào đồ thị trước, sau đó thêm các cạnh. Chúng ta có thể kiểm tra đồ thị của chúng ta và in một số đỉnh và cạnh:
```
print("=====Vertices=====")
print(graph.vertices)

print("=====Edges=====")
print(graph.edges())

print("Destinations from London: \(graph.adjacentEdges(forVertex: london))")
```

Ví dụ, chúng ta có thể dễ dàng in tất cả các chuyến bay trực tiếp từ London. Khi chúng ta chạy ví dụ nhỏ, giao diện điều khiển sẽ xuất ra một cái gì đó như thế này:


```
=====Vertices=====
[
[Vertex]: Dublin | [Adjacent Edges]: [[
[Edge] [Destination]: London - [Weight]: 20.0, 
[Edge] [Destination]: Amsterdam - [Weight]: 25.0, 
[Edge] [Destination]: Paris - [Weight]: 35.0]], 
[Vertex]: London | [Adjacent Edges]: [[
[Edge] [Destination]: Paris - [Weight]: 10.0, 
[Edge] [Destination]: Montreal - [Weight]: 200.0, 
[Edge] [Destination]: San Francisco - [Weight]: 500.0]], 
[Vertex]: Paris | [Adjacent Edges]: [[
[Edge] [Destination]: Amsterdam - [Weight]: 10.0, 
[Edge] [Destination]: San Francisco - [Weight]: 400.0]], 
[Vertex]: Amsterdam | [Adjacent Edges]: [[
[Edge] [Destination]: Montreal - [Weight]: 300.0, 
[Edge] [Destination]: San Francisco - [Weight]: 450.0]], 
[Vertex]: Montreal | [Adjacent Edges]: [[
[Edge] [Destination]: San Francisco - [Weight]: 200.0]], 
[Vertex]: San Francisco | [Adjacent Edges]: [[
[Edge] [Destination]: Dublin - [Weight]: 700.0]]]
=====Edges=====
[
[Edge] [Destination]: London - [Weight]: 20.0, 
[Edge] [Destination]: Amsterdam - [Weight]: 25.0, 
[Edge] [Destination]: Paris - [Weight]: 35.0, 
[Edge] [Destination]: Paris - [Weight]: 10.0, 
[Edge] [Destination]: Montreal - [Weight]: 200.0, 
[Edge] [Destination]: San Francisco - [Weight]: 500.0, 
[Edge] [Destination]: Amsterdam - [Weight]: 10.0, 
[Edge] [Destination]: San Francisco - [Weight]: 400.0, 
[Edge] [Destination]: Montreal - [Weight]: 300.0, 
[Edge] [Destination]: San Francisco - [Weight]: 450.0, 
[Edge] [Destination]: San Francisco - [Weight]: 200.0, 
[Edge] [Destination]: Dublin - [Weight]: 700.0]
Destinations from London: [
[Edge] [Destination]: Paris - [Weight]: 10.0, 
[Edge] [Destination]: Montreal - [Weight]: 200.0, 
[Edge] [Destination]: San Francisco - [Weight]: 500.0]
```

Và bạn đã triển khai thành công biểu đồ hướng đầu tiên của mình

#### Conclusion

Các thuật toán đồ thị và đồ thị có rất nhiều công dụng, bạn có thể thậm chí không nhận thức được một số thuật toán. Ban đầu chúng hầu như được sử dụng trong các bộ định tuyến để tìm tuyến đường rẻ nhất giữa hai máy tính, ngày nay chúng có thể được tìm thấy trong hệ thống định vị vệ tinh của bạn, hoặc thậm chí trên một trong những hệ thống trực tuyến đang cố gắng tìm chuyến bay rẻ nhất cho bạn.

Bài viết này được dich theo [bài viết cùng tên của tác giả  Dejan Agostini](https://agostini.tech/2018/07/29/edge-weighted-digraph-in-swift/) là phần giới thiệu cho bài viết tiếp theo, trong đó chúng ta sẽ nói về thuật toán đường đi ngắn nhất của Dijkstra. Trong bài viết này, chúng tôi đã tạo một triển khai đơn giản của một hình ảnh, để giúp bạn hiểu nó. Trong bài viết tiếp theo, chúng tôi sẽ xem xét lại việc triển khai này và tối ưu hóa nó. Bạn có thể tìm thấy tất cả source code trên [GitLab](https://gitlab.com/agostini.tech/ATEdgeWeightedDigraph).