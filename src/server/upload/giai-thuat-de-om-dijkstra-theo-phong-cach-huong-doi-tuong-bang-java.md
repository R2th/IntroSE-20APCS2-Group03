Chắc hẳn không sinh viên IT nào là không phải học môn Cấu trúc dữ liệu & Giải thuật, trong bộ môn này các bạn sẽ học tới giải thuật **tìm đường đi ngắn nhất** (find the shortest path), 1 thuật toán cụ thể đó là Dijkstra.

## Nhắc lại về Graph và Dijkstra

### Graph (Đồ thị)

Đồ thị là một khái niệm trừu tượng thể hiện kết nối giữa các đối tượng. Đồ thị hữu ích với cả khoa học máy tính và những vấn đề khác trên đời, vì ta có thể sử dụng đồ thị để biểu diễn nhiều hiện tượng quan trọng.
Ví dụ áp dụng đồ thị phổ biến:

- Bản đồ
- Mạng lưới internet

Biểu diễn đồ thị vô hướng bằng ma trận kề (Adjacency Matrix)


Cho đồ thị sau:
![Ví dụ về đồ thị](https://images.viblo.asia/2a4c8f7a-8afa-40a6-aeee-3e410bd69d28.png)

Xét theo đồ thị phía trên chúng ta sẽ biểu diễn theo ma trận kề như sau:
![Biểu diễn đồ thị bằng ma trận kề](https://images.viblo.asia/6148baef-15c8-423f-b69a-77c8a0e86ee9.png)

Theo hình trên, tạm gọi ma trận là mảng 2 chiều **array** thì ta có thể thấy được khoảng cách giữa các đỉnh với nhau, ví dụ:

- Khoảng cách từ mỗi đỉnh đến chính nó là 0.
- Khoảng cách từ đỉnh A tới đỉnh B:
  - **array[0][1]** = 10
- Khoảng cách từ đỉnh B tới đỉnh C:
  - **array[1][2]** = ∞ (dương vô cực, bởi vì không tồn tại đường từ B tới C).

### Lí thuyết thuật toán Dijkstra

#### Ý tưởng thuật toán

Thuật toán hoạt động bằng cách duy trì một tập hợp các đỉnh trong đó ta đã biết chắc chắn đường đi ngắn nhất. Mỗi bước, thuật toán sẽ chọn ra một đỉnh **u** mà chắc chắn sẽ không có đường nào ngắn hơn, sau đó tiến hành tìm đường ngắn nhất của các đỉnh **v** khác dựa trên các cạnh **(u,v)** đi ra từ đỉnh **u**. Sau N bước, tất cả các đỉnh đều sẽ được duyệt, mọi đường đi tìm được đều là ngắn nhất.

Cụ thể hơn, thuật toán sẽ duy trì đường đi ngắn nhất đến tất cả các đỉnh. Ở mỗi bước, chọn đường đi **S→u** có tổng trọng số nhỏ nhất trong tất cả các đường đi đang được duy trì. Sau đó tiến hành tìm các đường đi từ S→v bằng cách thử kéo dài thành S→u→v (đi qua các cạnh khác rồi mới tới đích đích). (Tham khảo [vnoi.info/wiki/algo/graph-theory/shortest-path.md](https://vnoi.info/wiki/algo/graph-theory/shortest-path.md))

Nói 1 cách đơn giản thì Dijkstra dựa trên phương pháp duyệt chiều rộng, với mỗi đỉnh **u** trong tập hợp, ta đi tìm hết các đỉnh hàng xóm **v** của nó, và nếu đường đi hiện tại **(u, v)** khác dương vô cùng hoặc ngắn hơn **cost(v)**, thì chúng ta cập nhật lại **cost** mới nhỏ hơn và đỉnh kề chính là đỉnh **u** đang duyệt.

#### Pseudocode

```{r, tidy=FALSE, eval=FALSE, highlight=FALSE }
BEGIN
    d(v[1]) ← 0
    FOR i = 2,..,n DO
        d(v[i]) ← ∞, parent(v[i]) ← NULL
    WHILE queue ≠ ∅ DO
        u = queue.extractMin()
        FOR ALL (u,w) ∈ E DO
            dist ← d(u) + l(u,w)
            IF w ∈ queue AND d(w) > dist DO
                d(w) = dist, parent(w) = (u,w)
            ELSE IF parent(w) == NULL THEN
                d(w) = dist, parent(w) = (u,w)
                queue.insert(w,dist)
END
```

## Bắt tay vào code

Nói về lí thuyết đủ rồi, ta sẽ đi tiếp vào nội dung chính, implement thuật toán này theo phong cách hướng đối tượng bằng Java sử dụng PriorityQueue (hàng đợi ưu tiên). Cá nhân mình ghét kiểu code mà tên biến toàn i, j rồi k, n nên mình sẽ code theo cách đặt tên biến dễ hiểu hơn.

Chúng ta quy ước đặt dương vô cùng có giá trị là 9999.

- Đầu tiên chúng ta thêm class Vertex đại diện cho từng đỉnh:
  Mỗi đỉnh đều sẽ có thông tin về hàng (row), cột (column) và biểu tượng (symbol) đại diện cho label của đỉnh đó.

  Ta có thêm distance lưu khoảng cách từ đỉnh bắt đầu tới đỉnh này, prev là đỉnh phía trước nó.

  Phương thức getSymbol() để lấy về tên của đỉnh đó (A,B,C) thay cho (1,2,3) dựa trên col (nhìn lại ma trận kề phía trên), phương thức getColFromSymbol() để lấy về vị trí của đỉnh dựa trên label của 1 đỉnh bất kì.

  Thêm constructor và getters setters phù hợp.

```Java
public class Vertex {
    private final static String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private int row;
    private int col;
    private int distance;
    private Vertex prev;

    public Vertex(int row, int col) {
        this.row = row;
        this.col = col;
    }

    public char getSymbol() {
        return ALPHABET.charAt(col);
    }

    public static int getColFromSymbol(char symbol){
        return ALPHABET.indexOf(symbol);
    }
    /**
    Phần getters setters cắt bớt cho gọn
    */
}
```

- Tiếp theo sẽ là class Graph đại diện cho đồ thị:

```Java
public class Graph {
    private static int INFINITY = 9999;
    private int[][] matrix = {
            {0, 10, 20, 9999, 9999, 9999},
            {9999, 0, 9999, 50, 10, 9999},
            {9999, 9999, 0, 20, 33, 9999},
            {9999, 9999, 9999, 0, 20, 2},
            {9999, 9999, 9999, 9999, 0, 1,},
            {9999, 9999, 9999, 9999, 9999, 0}
    };

    /**
     * Tìm đường ngắn nhất từ start tới target
     * Phương thức nhận 2 tham số
     *
     * @param startSymbol  đỉnh bắt đầu
     * @param targetSymbol đỉnh đích
     */
    public void dijkstra(char startSymbol, char targetSymbol) {

    }
}

```

- Chúng ta code tiếp hàm dijkstra trong class Graph, theo pseudocode, thì chúng ta khởi tạo 1 list với tất cả các đỉnh trong đồ thị đều có cost (hay gọi là distance) là dương vô cùng, ở đây quy ước là INFINITY = 9999; sau đó gán cho cost của đỉnh bắt đầu = 0;

```java
List<Vertex> vertices = new ArrayList<>();
for (int i = 0; i < matrix.length; i++) {
    Vertex vertex = new Vertex(i, i);
    vertex.setDistance(INFINITY);
    vertices.add(vertex);
}
Vertex startVertex = vertices.get(Vertex.getColFromSymbol(startSymbol));
Vertex targetVertex = vertices.get(Vertex.getColFromSymbol(targetSymbol));

startVertex.setDistance(0);
```

- Tiếp tục sử dụng PriorityQueue (hàng đợi FIFO) để duyệt (ưu tiên các đỉnh có khoảng cách ngắn hơn), và tuần tự xét các đỉnh hàng xóm của đỉnh được lấy từ queue ra, đỉnh đầu tiên được thêm vào chính là đỉnh bắt đầu.

```java
Queue<Vertex> vertexQueue = new PriorityQueue<>(Comparator.comparing(Vertex::getDistance));
vertexQueue.add(startVertex);
while (!vertexQueue.isEmpty()){
    Vertex current = vertexQueue.poll();
    // xét đỉnh hàng xóm
    for(Vertex neighbor : vertices){

    }
}
```

- Các đỉnh hàng xóm **neighbor** của đỉnh **current** chính là những đỉnh tồn tại đường đi từ current tới nó, tức là distance(current, neighbor) != INFINITY. Nhìn lại ma trận kề phía trên ta có thể thấy được, khoảng cách từ **current** đến **neighbor** chính là **matrix[row of current][col of neighbor]**:

```Java
// xét đỉnh hàng xóm
for(Vertex neighbor : vertices){
    int nextWeight = matrix[current.getRow()][neighbor.getCol()];
    if(neighbor != startVertex && nextWeight != INFINITY){

    }
}
```

- Tới đây theo pseudocode, sẽ có 2 trường hợp để chúng ta cập nhật lại cost của đỉnh hàng xóm:

  - Thứ nhất: Nếu đỉnh hàng xóm đang có cost là dương vô cùng, tức là chưa có con đường nào đi đến nó, ta cập nhật đường đi nhỏ nhất tới **neighbor** là thông qua **current**.
  - Thứ 2: Nếu đỉnh hàng xóm này đã có 1 con đường nào đó đi tới nó, tuy nhiên đường đi qua **current** tới **neighbor** có chi phí (cost) thấp hơn so với chi phí hiện tại của **neighbor**, thì cập nhật lại đường đi qua **current** mới là đường ngắn nhất.

- Khi chúng ta xét hết đỉnh hàng xóm của đỉnh đích thì tức là ta đã tìm được đường ngắn nhất của đỉnh này, cho nên ta có thể break vòng lặp ngay khi đó.

```java
// xét đỉnh hàng xóm
for(Vertex neighbor : vertices){
    int nextWeight = matrix[current.getRow()][neighbor.getCol()];
    // đỉnh hàng xóm tồn tại đường đi và khác đỉnh bắt đầu, tránh trường hợp quay ngược.
    if(neighbor != startVertex && nextWeight != INFINITY){
        int distance = nextWeight + current.getDistance();
        // chưa tồn tại đường đi
        if(neighbor.getPrev() == null){
            neighbor.setDistance(distance);
            neighbor.setPrev(current);
            vertexQueue.add(neighbor);
        }
        // đường mới ngắn hơn đường cũ
        else if(vertexQueue.contains(neighbor) && distance < neighbor.getDistance()){
            // lấy con đường mới ngắn hơn
            neighbor.setDistance(distance);
            neighbor.setPrev(current);
        }
    }
    if(neighbor == targetVertex){
        break;
    }
}
```

- Sơ bộ ta đã xong, nhưng _KHOAN, CHỜ TÍ_, tới đây ta gặp 1 vấn đề với Java, đó chính là PriorityQueue không cập nhật lại thứ tự ưu tiên khi bạn cập nhật giá trị **distance**. Cho nên lúc ta cập nhật lại đường đi của đỉnh mà đang nằm trong hàng đợi, ta phải xóa và thêm nó lại 1 lần nữa để Queue cập nhật lại thứ tự ưu tiên. (Cứ test để kiểm chứng :D).

```java
// đường mới ngắn hơn đường cũ
else if(vertexQueue.contains(neighbor) && distance < neighbor.getDistance()){
    // lấy con đường mới ngắn hơn
    neighbor.setDistance(distance);
    neighbor.setPrev(current);
    // cập nhật thứ tự ưu tiên
    vertexQueue.remove(neighbor);
    vertexQueue.add(neighbor);
}
```

- Đến đây thuật toán đã xong, chúng ta chỉ cần in ra đường đi ngắn nhất nữa là xong:

```java
if (targetVertex.getPrev() == null) {
    System.out.println("KHÔNG TỒN TẠI ĐƯỜNG ĐI TỪ " + startSymbol + " TỚI " + targetSymbol);
} else {
    System.out.println("ĐƯỜNG ĐI TỪ " + startSymbol + " TỚI " + targetSymbol + " MẤT " + targetVertex.getDistance());
    printPath(startVertex, targetVertex);
}
```

- Hàm in đường đi:

```java
/**
* In ra đường đi truy ngược theo prev
*
* @param startVertex  đỉnh bắt đầu
* @param targetVertex đỉnh kết thúc
*/
private void printPath(Vertex startVertex, Vertex targetVertex) {
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.insert(0, " -> " + targetVertex.getSymbol());
    while (targetVertex.getPrev() != null) {
        if (targetVertex == startVertex) {
            break;
        }
        stringBuilder.insert(0, " -> " + targetVertex.getPrev().getSymbol());
        targetVertex = targetVertex.getPrev();
    }
    System.out.println(stringBuilder.toString());
}
```

- Hoàn tất bước cuối cùng để chạy thử:

```java
public static void main(String[] args) {
    Graph graph = new Graph();
    graph.dijkstra('A', 'E');
}
```

## Thành quả

![console output dijikstra](https://images.viblo.asia/214730da-7cc0-4ecd-9ce2-8458f0e4c897.png)

Các bạn có thể lấy code hoàn chỉnh ở đây [Dijkstra sample gist](https://gist.github.com/kienmatu/b270064b353f077e621e79ff72feda4f)

### Lời kết

Hãy cố gắng lên và môn giải thuật sẽ không còn là ác mộng nữa, chúc các bạn học tốt, happy coding !

Bài viết gốc [ở đây](https://devgiangho.github.io/giai-thuat-de-om-dijkstra-theo-phong-cach-huong-doi-tuong-bang-java)