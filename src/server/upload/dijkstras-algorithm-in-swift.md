Thuật toán Dijkstra là một thuật toán đơn giản và nổi tiếng để tìm đường đi ngắn nhất giữa hai điểm trên biểu đồ. Trong bài viết này, chúng ta sẽ triển khai thuật toán Dijkstra trong swift và chúng ta sẽ thực hiện một hàng đợi ưu tiên đơn giản mà chúng ta sẽ sử dụng trong thuật toán. Bạn có thể tìm hiều thêm nhiều điều về [Dijkstra’s algorithm tại đây](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).

<br>

### Quick Refresher
Một đồ thị bao gồm các đỉnh được kết nối bởi các cạnh. Các cạnh có một nguồn, một đích và một trọng lượng. Giống như mô hình đã được thể hiện tại bài viết [Edge-Weighted Digraph in Swift](https://viblo.asia/p/edge-weighted-digraph-in-swift-63vKjRLbK2R):
<br>

![](https://images.viblo.asia/34317d51-149f-4aa6-9eb9-cc3b775d55fd.png)

<br>

Ví dụ tương tự với các sân bay để khám phá các tuyến đường rẻ nhất từ ​​một thành phố được chọn. Ví dụ, chuyến bay rẻ nhất từ ​​Dublin đến Paris thực sự là qua London. Trước khi chúng ta bắt đầu thực hiện thuật toán thực tế, chúng ta sẽ cần hai điều. Một hàng đợi ưu tiên và một đối tượng để giữ các điểm đến của chúng ta. Hãy bắt đầu với hàng đợi ưu tiên trước.

<br>

### Priority Queue

Priority Queue là một cấu trúc dữ liệu đơn giản. Mỗi yếu tố bạn thêm vào hàng đợi có một ưu tiên liên quan đến nó. Khi bạn xử lý một yếu tố, bạn sẽ luôn nhận được một yếu tố có mức ưu tiên thấp nhất (hoặc cao nhất, tùy thuộc vào việc triển khai của bạn).

<br>

Chúng ta sẽ thực hiện một hàng đợi ưu tiên tối thiểu. Điều đó có nghĩa là các yếu tố sẽ được sắp xếp từ trọng lượng thấp nhất đến cao nhất. Để giữ mọi thứ đơn giản nhất có thể, chúng ta sẽ sử dụng một mảng để lưu trữ các phần tử hàng đợi . Heap sẽ là cách lưu trữ các yếu tố ưa thích.

<br>

Để thực hiện hàng đợi ưu tiên của chúng ta đơn giản nhất có thể sử dụng, chúng ta sẽ sử dụng một class bên trong để lưu trữ dữ liệu:

<br>

```
private class QueueItem<Element: Equatable>: Comparable {
	
	let value: Element
	var priority: Double
	
	init(_ value: Element, priority: Double) {
		self.value = value
		self.priority = priority
	}
	
	static func < (lhs: QueueItem<Element>, rhs: QueueItem<Element>) -> Bool {
		return lhs.priority < rhs.priority
	}
	
	static func == (lhs: QueueItem<Element>, rhs: QueueItem<Element>) -> Bool {
		return lhs.priority == rhs.priority
	}
}

```


Như bạn có thể thấy, đây là một class chung rất đơn giản chỉ lưu trữ hai thuộc tính; ưu tiên và đối tượng thực tế. Nó cũng thực hiện giao diện so sánh.

<br>

```
public class SimplePriorityQueue<Element: Equatable> {
    
    //private class QueueItem<Element: Equatable>: Comparable {//..Redacted for clarity..//}
    
    private var items: [QueueItem<Element>] = []
    
    public var isEmpty: Bool {
        return items.isEmpty
    }
    
    public func contains(_ item: Element) -> Bool {
        return items.contains { $0.value == item }
    }
    
    public func insert(_ item: Element, priority: Double) {
        if contains(item) {
            update(item, priority: priority)
        } else {
            let newItem = QueueItem<Element>(item, priority: priority)
            items.append(newItem)
            sortItems()
        }
    }
    
    public func update(_ item: Element, priority: Double) {
        if let existingItem = items.filter({ $0.value == item }).first {
            existingItem.priority = priority
            sortItems()
        }
    }
    
    public func deleteMin() -> Element? {
        guard isEmpty == false else {
            return nil
        }
        
        let item = items.removeFirst()
        return item.value
    }
    
    private func sortItems() {
        items = items.sorted(by: < )
    }
}
```
 <br>
 
 Nó có một class rất đơn giản sẽ sắp xếp các thành phần dựa trên mức độ ưu tiên sau mỗi lần insert hoặc update. Nó cũng có một số phương thức tiện ích nhưng những phương thức quan trọng nhất là 'insert' và 'deleteMin'. Function chức năng deleteMin sẽ trả về phần tử có mức ưu tiên thấp nhất và xóa nó khỏi hàng đợi.
  <br>
###  Destination

Việc triển khai thuật toán Dijkstra của chúng ta sẽ có một loạt các điểm đến. Khi chúng ta khởi tạo class thuật toán, chúng ta sẽ cung cấp cho nó một đỉnh nguồn. Mảng đích sẽ chứa tất cả các đỉnh trên biểu đồ. Chúng ta sẽ sử dụng mảng này để tính toán tuyến đường rẻ nhất. Thêm về điều đó sau này.

class ‘Destination đích rất đơn giản:

```
class Destination<Element: Equatable> {
    let vertex: Vertex<Element>
    var previousVertex: Vertex<Element>?
    var totalWeight: Double = Double.greatestFiniteMagnitude
    
    init(_ vertex: Vertex<Element>) {
        self.vertex = vertex
    }
}
```

Chúng ta đang khởi tạo class với giá trị mặc định là 'Double.greatestFiniteMagnitude', đối với biến‘ ‘totalWeight’ . Bạn sẽ thấy tại sao khi chúng ta đi qua thuật toán. Lớp này cũng chứa một con trỏ tới một đỉnh trước đó trên đường dẫn. Chúng tôi sẽ sử dụng điều này để xây dựng một đường dẫn từ nguồn tới đích.

### Dijkstra’s Algorithm

Thuật toán Dijkstra sẽ tính toán con đường ngắn nhất (hoặc rẻ nhất) từ nguồn đến tất cả các điểm đến có thể tiếp cận. Nó sử dụng hàng đợi ưu tiên và danh sách các điểm đến để đạt được điều này. Thuật toán bắt đầu với đỉnh nguồn. Nó lấy tất cả các cạnh 'outgoing' và thêm chúng vào hàng đợi ưu tiên. Nó sẽ lấy cạnh ‘cheapest’ từ ​​hàng ưu tiên, nhảy đến đích và làm lại từ đầu.

<br>

Hãy để xem một số hình ảnh Chúng ta bắt đầu thuật toán với ‘London’ là đỉnh nguồn. Trước khi thuật toán bắt đầu, chúng ta tạo các đối tượng Destination Destination trong số tất cả các đỉnh trên biểu đồ với trọng số vô hạn (hoặc chi phí) và không có liên kết đến một đỉnh trước trong đường dẫn. Bởi vì chúng ta không biết nếu tất cả các đỉnh có thể truy cập được từ nguồn được chọn.

<br>

Trong lần lặp đầu tiên của thuật toán, chúng ta sẽ đẩy đỉnh 'London' lên hàng đợi ưu tiên với tổng trọng số là 0, vì nó là nguồn của chúng tôi. Chúng tôi sẽ đi qua tất cả các cạnh liền kề. Kết hợp trọng lượng cạnh cạnh và tổng trọng lượng cho đỉnh hiện tại và xem liệu nó có rẻ hơn so với tuyến đường mà chúng ta đã lưu trong mảng đích không. Nói cách khác, chúng ta sẽ kiểm tra xem chúng tôi có tìm thấy tuyến đường rẻ hơn đến đích không. Nếu chúng ta đã tìm thấy một tuyến đường rẻ hơn, chúng tôi sẽ cập nhật mảng đích và chèn đỉnh đích mới với mức độ ưu tiên mới vào hàng đợi. Điều này được minh họa trên sơ đồ dưới đây:

<br>

![](https://images.viblo.asia/49b78429-d9cf-4c97-9b2e-a180a9eb7b86.png)

<br>

Hãy nhớ rằng, cạnh có một nguồn, một đích và một trọng lượng. Nhưng đối tượng ‘Destination của chúng ta có một đỉnh, một đỉnh trước đó và tổng trọng lượng. Chúng tôi sẽ xóa điều này trong ví dụ lặp lại tiếp theo. Nhưng bây giờ, nếu bạn nhìn vào sơ đồ trên, bạn có thể thấy hàng đợi ưu tiên có ’Paris' , ở trên cùng. Và ngay khi loại bỏ đỉnh đó khỏi hàng đợi, nó sẽ cập nhật mảng đích (cho đối tượng đích 'Paris') với giá trị '10' và nó sẽ lấy đỉnh nguồn của cạnh và đặt nó làm đỉnh trước đó cho đó là đối tượng 'Đích' (trong trường hợp này, nguồn sẽ là 'London'). Thuật toán cũng sẽ chèn tất cả các cạnh liền kề từ đỉnh ’Paris' vào hàng ưu tiên.

<br>

Và tiếp tục với lần lặp thứ 3:

![](https://images.viblo.asia/1d46834a-a90a-4e60-a259-dfd058c709a3.png)

<br>

Trong lần lặp thứ 3, chúng tôi đã tính toán chi phí cho ’Amsterdam và 'Paris'. Cạnh rẻ nhất tiếp theo trong hàng đợi ưu tiên của chúng tôi là cạnh kết nối ‘London' và 'Montreal' để chúng tôi quan sát cạnh đó. Chúng tôi loại bỏ cạnh đó khỏi hàng ưu tiên, thêm tất cả các cạnh đi từ ‘Montreal' vào hàng ưu tiên, bởi vì chi phí cho‘ Montreal' là vô hạn và cập nhật đích đến ‘Montreal' trong mảng đích.

<br>

Chúng tôi sẽ chạy thuật toán theo vòng lặp cho đến khi hàng đợi ưu tiên trống. Khi thuật toán kết thúc, chúng ta sẽ kết thúc với một biểu đồ trông như thế này:

<br>

![](https://images.viblo.asia/e7b201d4-916e-410d-9e16-e7936d1d5091.png)


Hàng đợi ưu tiên của chúng tôi trống và chúng tôi đã tính chi phí cho tất cả các điểm đến trên biểu đồ. Chúng ta có thể thấy từ biểu đồ đi đến ‘San Francisco' sẽ rẻ hơn thông qua‘ Montreal'. Vì vậy, điểm đến ‘San Francisco 'Hiện sẽ có‘ Montreal' đặt làm đỉnh trước đó.

<br>

### Implementation

Sau tất cả lý thuyết đó và chuẩn bị, thời gian thực hiện thuật toán. Lớp học của chúng tôi sẽ có hai biến thể hiện. Một cho hàng đợi ưu tiên và một cho các điểm đến. Trong trình khởi tạo, chúng tôi sẽ điền vào mảng đích với tất cả các đỉnh từ biểu đồ và đặt tổng trọng số của chúng là vô hạn. Điều cuối cùng mà chúng tôi sẽ làm trong trình khởi tạo là chèn đỉnh nguồn vào hàng đợi ưu tiên và tiếp tục gọi hàm ‘thư giãn cho đến khi hàng đợi trống:

<br>

```
private var destinations: [Destination<Element>] = [] // Dictionary would be more efficient. Using array for simplicity.
private var priorityQueue: SimplePriorityQueue<Vertex<Element>> = SimplePriorityQueue<Vertex<Element>>()

init(_ graph: EdgeWeightedDigraph<Element>, source: Vertex<Element>) {
	
	graph.vertices.forEach { self.destinations.append(Destination($0)) }
	
	let sourceDestination = destination(for: source)
	sourceDestination.totalWeight = 0.0
	
	priorityQueue.insert(source, priority: 0.0)
	
	while (priorityQueue.isEmpty == false) {
		if let min = priorityQueue.deleteMin() {
			relax(min)
		}
	}
}
```

relax function: 

```
private func relax(_ vertex: Vertex<Element>) {
	vertex.adjacentEdges.forEach { (edge) in
		
		let edgeDestination = edge.destination
		let nextDestination = destination(for: edgeDestination)
		let currentDestination = destination(for: vertex)
		
		if nextDestination.totalWeight > (currentDestination.totalWeight + edge.weight) {
			nextDestination.totalWeight = currentDestination.totalWeight + edge.weight
			nextDestination.previousVertex = edge.source
			
			priorityQueue.insert(nextDestination.vertex, priority: nextDestination.totalWeight)
		}
	}
}
```


Đối với mỗi cạnh liền kề trong đỉnh chúng ta sẽ có điểm đến tiếp theo từ mảng đích. Sau đó, chúng tôi kiểm tra xem tổng trọng lượng hiện tại của điểm đến tiếp theo có đắt hơn trọng lượng kết hợp của điểm đến hiện tại và trọng lượng cạnh của điểm đến tiếp theo hay không. Điều này có nghĩa là, chúng ta đang tìm kiếm để xem liệu chúng tôi có tuyến đường rẻ hơn không, không có gì hơn. Nếu cạnh hiện tại mang lại cho chúng ta tuyến đường rẻ hơn thì chúng ta sẽ cập nhật mảng đích với tổng trọng số mới và đặt đỉnh trước đó là đỉnh nguồn của cạnh. Chúng ta sẽ gọi hàm này trong một vòng lặp cho đến khi hàng đợi ưu tiên của chúng ta trống. Khi chức năng hoàn thành, chúng tôi sẽ có một mảng với các đường dẫn ngắn nhất tới tất cả các đích có thể tiếp cận.

<br>

Chúng tôi có một vài chức năng tiện ích trong lớp mà chúng tôi đã giành được. Chúng tôi chỉ nói về chức năng mà chúng tôi sử dụng để có được con đường ngắn nhất:

```
public func pathTo(_ vertex: Vertex<Element>) -> [Vertex<Element>]? {
	guard hasPathTo(vertex) else {
		return nil
	}
	
	var results: [Vertex<Element>] = [vertex]
	
	var currentDestination = destination(for: vertex)
	while let previousVertex = currentDestination.previousVertex {
		results.insert(previousVertex, at: 0)
		currentDestination = destination(for: previousVertex)
	}
	
	return results
}
```

Đầu tiên chúng ta kiểm tra xem chúng ta có một đường dẫn đến đỉnh được truyền không. Chúng ta chỉ cần kiểm tra mảng đích và xem chi phí cho đích đó không phải là vô hạn. Nếu chúng ta có đường dẫn đến đỉnh, chúng ta tìm nạp đối tượng đích cho đỉnh đó và bắt đầu xây dựng đường dẫn từ đích trở về nguồn.

### Test It Out

 Cuối cùng, với chức năng đó, bạn có thể tạo thuật toán Dijkstra Lần mới của chúng tôi và in con đường ngắn nhất giữa ‘London' và 'Dublin':
 
 ```
 let dijkstra = DijkstraShortestPath(graph, source: london)

print("Path to Dublin: ", dijkstra.pathTo(dublin))
 
 ```
 
 Đầu ra ví dụ của chúng tôi sẽ trông như thế này:

```
Path to Dublin:  Optional([
[Vertex]: London | [Adjacent Edges]: [[
[Edge] [Destination]: Paris - [Weight]: 10.0, 
[Edge] [Destination]: Montreal - [Weight]: 200.0, 
[Edge] [Destination]: San Francisco - [Weight]: 500.0]], 
[Vertex]: Montreal | [Adjacent Edges]: [[
[Edge] [Destination]: San Francisco - [Weight]: 200.0]], 
[Vertex]: San Francisco | [Adjacent Edges]: [[
[Edge] [Destination]: Dublin - [Weight]: 700.0]], 
[Vertex]: Dublin | [Adjacent Edges]: [[
[Edge] [Destination]: London - [Weight]: 20.0, 
[Edge] [Destination]: Amsterdam - [Weight]: 25.0, 
[Edge] [Destination]: Paris - [Weight]: 35.0]]])
```
 

Trong thử nghiệm này, chúng tôi đặt ‘London' làm nguồn của chúng tôi, nhưng bạn có thể đặt bất kỳ đỉnh nào trên biểu đồ làm nguồn. Từ bài kiểm tra mà chúng tôi vừa chạy, chúng tôi có thể thấy rằng tuyến đường rẻ nhất từ ​​‘London' đến‘ Dublin qua ‘Montreal' và 'San Francisco'.

### Conclusion

Các thuật toán đồ thị và đồ thị có rất nhiều công dụng, bạn có thể thậm chí không nhận thức được một số thuật toán. Ban đầu chúng hầu như được sử dụng trong các bộ định tuyến để tìm tuyến đường rẻ nhất giữa hai máy tính, ngày nay chúng có thể được tìm thấy trong hệ thống định vị vệ tinh của bạn, hoặc thậm chí trên một trong những hệ thống trực tuyến đang cố gắng tìm chuyến bay rẻ nhất cho bạn.

Bài viết này được dich theo b[ài viết cùng tên của tác giả Dejan Agostini ](https://agostini.tech/2018/08/05/dijkstras-algorithm-in-swift/). Bạn có thể tham khảo source tại [GitLab](https://gitlab.com/agostini.tech/ATEdgeWeightedDigraph).