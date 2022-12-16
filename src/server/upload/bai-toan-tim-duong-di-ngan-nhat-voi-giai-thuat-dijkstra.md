Với các bạn sinh viên chuyên ngành công nghệ thông tin, chắc không lạ gì với bài toán tìm đường đi ngắn nhất (Shortest Path Problems) trong đồ thị trọng số nữa. Ở bài viết lần này, mình sẽ làm 3 việc:
* Giới thiệu bài toán tìm đường đi ngắn nhất và ứng dụng của nó.
* Giải thích giải thuật Dijkstra để giải quyết bài toán trên
* Viết giải thuật Dijkstra bằng code Ruby .

## 1. Giới thiệu bài toán tìm đường đi ngắn nhất
Mình sẽ đưa ra một ví dụ cơ bản về bài toán này.

> Bài toán: Cho một đồ thị trọng số gồm các `nodes` A,B,C,D,E,F và khoảng cách giữa các nodes tương ứng với các cạnh như hình bên dưới . Tìm đường đi ngắn nhất từ node B đến các node còn lại trong đồ thị? 

![](https://images.viblo.asia/c76edc38-0624-4de5-a22b-d1ffc018952e.png)

Sau khi giải bài toán, ta được kết quả như sau. Đường đi ngắn nhất từ A đến 5 node còn lại:
*  **Từ A -> B** : A - B, tổng độ dài đường đi = 2
*  **Từ A -> C** : A - C, tổng độ dài đường đi = 5
*  **Từ A -> D** : A - D, tổng độ dài đường đi = 1
*  **Từ A -> E** : A - D - E, tổng độ dài đường đi = 2
*  **Từ A -> F** : A - D - E - F, tổng độ dài đường đi = 4

![](https://images.viblo.asia/e4ca4166-70b8-459e-b92a-bc07432763b3.png)

Để nói về ứng dụng của việc giải bài toán này, nếu bạn thay các `node` bằng các giao lộ, và các cạnh của nó là các tuyến đường, ta sẽ có 1 bài toán rất quen thuộc. Bài toán tìm đường đi ngắn nhất đến một địa điểm trên bản đồ.

![](https://images.viblo.asia/5f65f7c6-2f88-4660-ab96-2336a4d16ac4.png)

Ví dụ như hình ở trên, bằng cách giải quyết bài toán này, bạn sẽ tìm được lộ trình ngắn nhất để đi từ vị trí của bạn đến Mễ Trì Thượng.

Ngoài ra, nếu thay các node bằng các router mạng hoặc các host , chúng ta có bài toán định tuyến đường đi của một hệ thống mạng - loại bài toán cơ bản mà các kỹ sư mạng cần phải biết đến:

![](https://images.viblo.asia/38f729f1-5d75-4d4e-b96a-7f936bbb0188.png)

Có khá nhiều giải thuật được đưa ra để giải quyết bài toán này : Dijkstra's algorithm , Bellman–Ford algorithm, A* search algorithm, Floyd–Warshall algorithm, .....

Tuy nhiên ở bài viết này, mình sẽ giải thích về giải thuật Dijkstra và cách để viết nó bằng code Ruby.

## 2. Giải thích về giải thuật Dijkstra
Mô tả về giải thuật Dijkstra:
* **Bước 1**: Chọn S = {}  là tập các `soure_node` bao gồm `current_node` và `passed_node` . Với current_node là node đang được xét đến, passed_node là các node đã được xét.
current_node đầu tiên sẽ là node đích của bài toán tìm đường đi ngắn nhất.
*  **Bước 2**: Khởi tạo giải thuật với current_node là node đích và cost(N) là giá trị của đường đi ngắn nhất từ N đến node đích.
* **Bước 3**: Xét các node kề N với current_node . Gọi `d(current_node,N)` là khoảng cách giữa node kề N và current_node . Với `p = d(current_node,N) + cost (current_node)`.  Nếu `p < cost(N)` thì `cost(N) = p` . Nếu không thì cost(N) giữ nguyên giá trị . 
* **Bước 4**: Sau khi xét hết các node kề N, đánh dấu current_node thành passed_node . 
* **Bước 5**: Tìm current_node mới với 2 điều kiện: không phải passed_node và cost(current_node) là nhỏ nhất
* **Bước 6**: Nếu tập S = {} chứa đủ các node của đồ thị thì dừng thuật toán. Nếu không thì quay trở lại **Bước 3** .



Để giải thích về cách giải thuật Dijkstra hoạt động, mình sẽ sử dụng đồ thị trọng số dưới đây để đi tìm đường đi ngắn nhất từ node C đến mọi node còn lại trong đồ thị :

![](https://images.viblo.asia/0a4df8ae-a48d-44be-a52d-0f216189f290.png)

Trong quá trình thuật toán chạy, ta gọi `cost(node)` là **khoảng cách ngắn nhất từ mỗi node đến node C** và đánh dấu nó trên hình (giá trị số màu xanh da trời) . Khi thuật toán mới bắt đầu, ta mặc định lưu `cost(C) = 0` , cost(A) = cost(B) = cost(D) = cost(E) = infinity. 

![](https://images.viblo.asia/830bc615-ecfc-4d93-b4dc-c0e71e184f3e.png)

Ta cũng đánh dấu current_node (node đang xét hiện tại) bằng một dấu chấm đỏ trên hình. 
current_node đầu tiên sẽ là node đích của bài toán - ở đây là C. 

Thuật toán bắt đầu chạy bằng cách xét tất cả các node kề với current_node (các node được nối trực tiếp với current_node ) , ở đây là A, B và D. Ta sẽ bắt đầu với node B trước và thực hiện 4 bước:

* Đầu tiên ta tìm được khoảng các từ `current_node` đến `node B`: d(C,B) = 7. 
* Tính toán giá trị đường đi từ `node đích -> current_node -> node B` :
`p = d(C,B) + cost(current_node) = 0 + 7 = 7`
* Nếu giá trị vừa tính `p < cost(B)` thì `cost(B) = p`, ngược lại thì cost(B) giữ nguyên. ( ở đây `7 < infinity` nên `cost(B) = 7` )
* Đánh dấu cost(B) lên hình.

![](https://images.viblo.asia/6f824b6c-3575-4e5c-a5a3-29eef6a5e8f5.png)

Tương tự với A và D, ta cũng tìm được cost(A) = 1 và cost(D) = 2 . 

![](https://images.viblo.asia/8155c90e-43fe-4649-869e-708e2986b9e9.png)

Sau khi xét hết tất cả các node kề với current_node, ta chuyểncurrent_node thành passed_node - tức là node đã được xét rồi. passed_node sẽ được đánh 1 dấu tích xanh trên hình. 

![](https://images.viblo.asia/c662ae20-3acb-47a2-a6f5-6af20dd760e5.png)

Bây giờ chúng ta sẽ chọn 1 current_node mới với 2 điều kiện:
* current_node không thể là passed_node.
* cost(current_node) có giá trị nhỏ nhất. 

Nếu xét trên hình, current_node tiếp theo sẽ là node A . Ta đánh dấu node A với 1 dấu chấm đỏ. 

![](https://images.viblo.asia/60e36be0-59b7-4051-8b21-b503298af1b4.png)

Ta tiếp tục giải thuật bằng cách xét các node kề với current_node với điều kiện node kề không được là passed_node . Như vậy ở đây ta chỉ được xét node B .
* `d(A,B) = 3, cost(A) = 1` .
* `p = d(A,B) + cost(A) = 4`
* `p < cost(B) ( 4 < 7 )` . Vậy `cost(B) = 4`
* Đánh dấu cost(B) lên hình

![](https://images.viblo.asia/d2415d90-9650-46d7-ba0f-897cfaac7650.png)

Đánh dấu node A trở thành passed_node. Ta tiếp tục tìm current_node mới, lần này nó là node D với cost(D) = 2:

![](https://images.viblo.asia/8736ca78-1849-4103-9d0c-dc17da6c7b07.png)

Có 2 node kề với D là B và E.

Xét với `node B`
* `d(D,B) = 5, cost(D) = 2` .
* `p = d(D,B) + cost(D) = 7`
* `p > cost(B) ( 7 > 4 )` . Vậy `cost(B) = 4`
* Giữ nguyên cost(B)

Xét với `node E`
* `d(D,E) = 7, cost(D) = 2` .
* `p = d(D,E) + cost(D) = 9`
* `p < cost(E) ( 7 < infinity )` . Vậy `cost(E) = 9`
* Đánh dấu cost(E) lên hình.

Đánh dấu node D trở thành passed_node.   Ta tiếp tục tìm current_node mới, lần này nó là node B với `cost(B) = 4` :

![](https://images.viblo.asia/897c94a9-93e1-4a1e-ac34-7902a048d69d.png)

Chỉ còn 1node kề với B là E.

Xét với `node E`
* `d(B,E) = 1, cost(B) = 4` .
* `p = d(B,E) + cost(B) = 5`
* `p < cost(E) ( 5 < 9 )` . Vậy `cost(E) = 5`
* Đánh dấu cost(E) lên hình.

![](https://images.viblo.asia/b66c4727-b6ab-41f5-9b6d-281d0864d054.png)

Giờ chúng ta không còn node nào để check nữa. Đánh dấu node E trở thành passed_node và kết thúc thuật toán.

![](https://images.viblo.asia/b0e1a6db-754d-4520-88c0-f975ff83fb86.png)

Vậy ta có kết quả của thuật toán với đường đi ngắn nhất từ C đến các điểm còn lại là:
* **Từ C -> A:** C - A, cost(A) = 1
* **Từ C -> B:** C - A - B, cost(B) = 4
* **Từ C -> D:** C - D, cost(D) = 2
* **Từ C -> E:** C - A - B - E, cost(E) = 5

## 3. Giải thuật Diijkstra với code Ruby

Mình đã giải thích rất rõ cách hoạt động của giải thuật Dijkstra rồi. Nên việc triển khai nó trong code Ruby khá dễ hiểu. 

Đây là sourecode Ruby về giải thuật này:

```ruby
class Graph
  # Constructor
  def initialize
    @g = {}  # the graph // {node => { edge1 => weight, edge2 => weight}, node2 => ...
    @nodes = Array.new
    @INFINITY = 1 << 64
  end

  def add_edge(s,t,w)     # s= source, t= target, w= weight
    if (not @g.has_key?(s))
      @g[s] = {t=>w}
    else
      @g[s][t] = w
    end

    # Begin code for non directed graph (inserts the other edge too)

    if (not @g.has_key?(t))
      @g[t] = {s=>w}
    else
      @g[t][s] = w
    end
    # End code for non directed graph (ie. deleteme if you want it directed)
    if (not @nodes.include?(s))
      @nodes << s
    end
    if (not @nodes.include?(t))
      @nodes << t
    end
  end

  # based of wikipedia's pseudocode: http://en.wikipedia.org/wiki/Dijkstra's_algorithm

  def dijkstra(s)
    @d = {}
    @prev = {}
    @nodes.each do |i|
      @d[i] = @INFINITY
      @prev[i] = -1
    end
    @d[s] = 0
    q = @nodes.compact
    while (q.size > 0)
      u = nil;
      q.each do |min|
        if (not u) or (@d[min] and @d[min] < @d[u])
          u = min
        end
      end
      if (@d[u] == @INFINITY)
        break
      end
      q = q - [u]
      @g[u].keys.each do |v|
        alt = @d[u] + @g[u][v]
        if (alt < @d[v])
          @d[v] = alt
          @prev[v]  = u
        end
      end
    end
  end

  # To print the full shortest route to a node

  def print_path(dest)
    if @prev[dest] != -1
      print_path @prev[dest]
    end
    print ">#{dest}"
  end

  # Gets all shortests paths using dijkstra

  def shortest_paths(s)
    @source = s
    dijkstra s
    puts "Source: #{@source}"
    @nodes.each do |dest|
      puts "\nTarget: #{dest}"
      print_path dest
      if @d[dest] != @INFINITY
        puts "\nDistance: #{@d[dest]}"
      else
        puts "\nNO PATH"
      end
    end
  end
end
```

```ruby
  gr = Graph.new
  gr.add_edge("a","b",5)
  gr.add_edge("b","c",3)
  gr.add_edge("c","d",1)
  gr.add_edge("a","d",10)
  gr.add_edge("b","d",2)
  gr.add_edge("f","g",1)
  gr.shortest_paths("a")
```

Mình sẽ thử chạy nó ở trong terminal nhé:

![](https://images.viblo.asia/1b046657-7b15-411b-9651-593f257b0438.gif)

Bài viết của mình còn nhiều thiếu xót, mong nhận được nhiều phản hồi tốt từ các bạn. 



-----

References:

https://gist.github.com/yaraki/1730288

https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm