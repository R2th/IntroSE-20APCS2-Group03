### 1.Yêu cầu thuật toán:

Ta bắt đầu khởi tạo các mảng n phần tử: label, length, prev. Gán label[k] = 1, length[k] = -1 (inf), prev[k] = -1 với k chạy từ 0 -> n – 1. Gán length[first] = 0.

Chọn đỉnh v trong mảng sao cho length[k] là nhỏ nhất. Sau đó gán label[k] = 0 (Đã đánh dấu).

Tạo vòng lặp với biến chạy k, xét nếu label[k] = 1 (Chưa đánh dấu) và có đường đi từ v -> k: Nếu length[k] > length[v] + trọng số từ v -> k hoặc length[k] = inf, có nghĩa là nếu ta tìm được 1 đường từ v -> k là nhỏ nhất, hoặc là chưa tìm được đường nào ngắn nhất (inf) => Gán length[k] = length[v] + trọng số v -> k, prev[k] = v (Tạo vết chân đỉnh trước đó).

Nếu label[last] = 0 (Đã đánh dấu đỉnh đến), kết thúc vòng lặp. Nếu không thì quay lại bước 2.

VD: Ta có 1 đồ thị như sau
![](https://images.viblo.asia/5a4918e7-b0b4-4687-8d21-4bec2f66a0f1.jpeg)
Ta cần chỉ ra đường đi ngắn nhất từ đỉnh 1 tới 6. Vậy các bước sẽ như thế nào?

![](https://images.viblo.asia/25da54eb-f569-4d15-950b-38466e7e4728.jpeg)
### 2. Viết và chạy thuật toán

Để đơn giản, trong phần này tôi dùng ma trận kề, và mỗi các đỉnh được đặt tên theo số thứ tự 0,1,2.
```
/**
* Trong nay, cac dinh khong co canh noi voi nhau se co khoang cach la -1
*/
public int[] dijkstra(int[][] graph, int s){
	int [] dist = new int[graph.length];
	for(int i = 0; i < graph.length; i++){
		dist[i] = Integer.MAX_VALUE;
	}
	dist[s] = 0;
	int [] visit = new int[graph.length]; 
	for(int i = 0; i < graph.length; i ++){
		int v = closestVertice(graph[s], visit);
		for(int j = 0; j < graph[v].length; j++){
			if (graph[v][j] != -1){ // neu co canh noi giua v va j
				int currentDist = dist[v] + graph[v][j];
				if (currentDist < dist[j]){
					dist[j] = currentDist;
				}
			}
		}
	}
	return dist;
}
/**
 * Chon ra dinh o gan s nhat va danh dau dinh do la da tham
 * */
public int closestVertice(int[] adjacentVertices, int[] visit){
	int closest = -1;
	int minDist = Integer.MAX_VALUE;
	for(int i = 0; i < adjacentVertices.length; i ++){
		if (visit[i] == 0 && adjacentVertices[i] < minDist){
			closest = i;
			minDist = adjacentVertices[i];
		}
	}
	visit[closest] = 1;
	return closest;
}
```
Output của thuật toán trên sẽ là:
```
Distance from '0' to '0':0
Distance from '0' to '1':2
Distance from '0' to '2':3
Distance from '0' to '3':4
Distance from '0' to '4':4
```
### 3.Đánh giá độ phức tạp

Độ phức tạp của thuật toán trên sẽ là O(V2).

Nếu ta sử dụng một hàng đợi ưu tiên (priority queue), ví dụ như Binary heap, và sử dụng danh sách kề thì độ phức tạp của thuật toán sẽ bị giảm xuống còn O((V+E)∗logV).

Nguyên nhân là, với danh sách kề, thời gian để duyệt các cạnh và các đỉnh sẽ là O(E+V) thay vì O(V2) như ma trận kề. Ngoài ra, với binary heap, việc tìm đỉnh gần nhất ở


`closestVertice(graph[s], visit);`


sẽ chỉ còn O(1) thay vì O(V). Vì thế ta cần nhập khoảng cách tới các đỉnh xung quanh vào binary heap bằng cách bỏ các đỉnh đó ra khỏi heap rồi thêm lại, cái này mất O(logV).

Vậy cuối cùng độ phức tạp sẽ là O((V+E)∗logV).

Trên đây là bài viết về "Tìm đường ngắn nhất bằng thuật toán Dijkstra". Tuỳ theo từng yêu cầu cụ thể mà bạn có thể lựa chọn cách làm hợp lý.