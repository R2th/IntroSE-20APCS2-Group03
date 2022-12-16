# Tổng quan

Thuật toán Bellman-Ford là thuật toán dùng để tìm đường đi ngắn nhất từ một đỉnh tới các đỉnh còn lại trong đồ thị có trọng số. Cùng một vấn đề nhưng thuật toán Bellman-Ford **chậm hơn** so với thuật toán Dijsktra nhưng lại **đa năng hơn** ở chỗ thuật toán có thể xử lý **trên đồ thị có cạnh mang trọng số âm**. Thuật toán được đề xuất lần đầu tiên bởi Alfonso Shimbel (1955), nhưng được đặt tên theo Richard Bellman và Lester Ford Jr. Hai người đã công bố thuật toán lần lượt vào năm 1958 và 1956.

# Kĩ thuật

## Đặt vấn đề

Cho đồ thị như sau:
![image.png](https://images.viblo.asia/409cdc64-3da2-48d4-a60d-9a39aac59afd.png)


Tìm đường đi ngắn nhất giữa đỉnh 1 với các đỉnh còn lại trong đồ thị.

Nếu đồ thị có cạnh trọng số âm, cách cài đặt thuật toán tìm đường đi ngắn nhất Dijkstra cổ điển sẽ thất bại. Cách cài đặt cải tiến sẽ giúp cho thuật toán Dijkstra khắc phục vấn đề này. Tuy nhiên khi đồ thị có chu trình âm, cách cài đặt cải tiến này cũng không sử dụng được do thuật toán sẽ thực hiện vòng lặp vô hạn.

Thuật toán Bellman Ford sẽ giải quyết vấn đề này. Ý tưởng chính rất đơn giản đó là

## Mô tả thuật toán

Ta xét ví dụ với đồ thị có hướng trên (giả định các đường đi là một chiều, chỉ đi từ đỉnh có số thứ tự thấp hơn tới đỉnh có số thứ tự cao hơn, số có màu đỏ cạnh mỗi đỉnh là độ dài đường đi ngắn nhất từ gốc tới đỉnh đó, và đỉnh gốc là đỉnh 1).

Khởi tạo:

![Imgur](https://imgur.com/CkaR8aI.png)

Thực hiện lần duyệt đầu tiên, ta cập nhật được đường đi ngắn nhất thông qua các cạnh (1, 2); (1, 3); (1, 4):

![Imgur](https://imgur.com/RsmNhLC.png)

Tương tự với lần duyệt thứ 2, cạnh (2, 5) và (3, 4) là các cạnh tối ưu:

![Imgur](https://imgur.com/4eMdfml.png)

Với lần duyệt thứ 3, chỉ có cạnh (4, 5) cải tiến đường đi tối ưu:

![Imgur](https://imgur.com/9aS5zlr.png)								    
Tới lần duyệt thứ 4, ta thấy không còn cạnh nào có thể tối ưu hóa bất kỳ đường đi ngắn nhất nào nữa. Tới đây, ta hoàn toàn có thể dừng duyệt (vì chắc chắn việc không còn cạnh có thể tối ưu cũng đồng nghĩa với việc không có chu trình âm trong đồ thị).

**Mã giả**:

```C
 function BellmanFord(danh_sách_đỉnh, danh_sách_cung, nguồn)
   // hàm yêu cầu đồ thị đưa vào dưới dạng một danh sách đỉnh, một danh sách cung
   // hàm tính các giá trị khoảng_cách và đỉnh_liền_trước của các đỉnh,
   // sao cho các giá trị đỉnh_liền_trước sẽ lưu lại các đường đi ngắn nhất.

   // bước 1: khởi tạo đồ thị
   for each v in danh_sách_đỉnh:
       if v is nguồn then khoảng_cách(v):= 0
       else khoảng_cách(v):= vô cùng
       đỉnh_liền_trước(v):= null

   // bước 2: kết nạp cạnh
   for i from 1 to size(danh_sách_đỉnh)-1:
       for each (u,v) in danh_sách_cung:
           if khoảng_cách(v) > khoảng_cách(u) + trọng_số(u,v):
               khoảng_cách(v):= khoảng_cách(u) + trọng_số(u,v)
               đỉnh_liền_trước(v):= u

   // bước 3: kiểm tra chu trình âm
   for each (u,v) in danh_sách_cung:
       if khoảng_cách(v) > khoảng_cách(u) + trọng_số(u,v):
           error "Đồ thị chứa chu trình âm"
```
# Cài đặt

**Code**:

```cpp

// Thuat toan voi do thi khong co chu trinh am

#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> ii;
vector<ii> a[181220];
int n, m;

int d[181220];
bool inqueue[181220];
int pre[181220];
vector<int>path;

void bellman(int u) {
    //Buoc 1: Khoi tao
    queue<int> qu;
    for (int i = 1; i <= n; i++) d[i] = 99999999;
    d[u] = 0;
    qu.push(u); //push u vào queue
    inqueue[u] = true; //Đánh dấu đỉnh u đã trong queue
    // Buoc 2: Lap
    while (qu.size()) {
        u = qu.front(); //Lấy giá trị đầu của queue
        inqueue[u] = false; //Đánh dấu là đỉnh u đã pop ra khỏi queue (hay không còn trong queue)
        qu.pop(); // pop đỉnh u ra khỏi queue
        for (int i = 0; i < a[u].size(); i++) { // Duyệt các đỉnh kề u
            int v = a[u][i].second;
            int uv = a[u][i].first;
            if (d[v] > d[u] + uv) {
                d[v] = d[u] + uv;
                pre[v] = u;
                if (!inqueue[v]) { // Nếu đỉnh v chưa trong queue
                    qu.push(v); // Cho v vào queue
                    inqueue[v] = true; // Đánh dấu là đỉnh v đã trong queue
                }
            }
        }
    }
}

int main() {
    int u, v; // dinh nguon va dinh dich
    scanf("%d%d%d%d", &n, &m, &u, &v);
    while (m--) {
        int p, q, w;
        scanf("%d%d%d", &p, &q, &w);
        // Do thi vo huong
        a[p].push_back(ii(w, q));
        a[q].push_back(ii(w, p));
    }
    bellman(u);
    printf("%d\n", d[v]);
    for(int i = v; i != u;  i = pre[i]) path.push_back(i); // them dinh vao duong di
    path.push_back(u);
    reverse(path.begin(), path.end());
    printf("Duong di: ");
    for(int i = 0; i < path.size(); i++){
    	if(i == path.size() - 1){
    		printf("%d", v);
    		break;
	}
   	printf("%d -> ",path[i]);
    }
}

```

- Độ phức tạp thời gian trong trường hợp tốt nhất: $O(|E|)$
- Độ phức tạp thời gian trung bình: $O(|E|.|V|)$
- Độ phức tạp thời gian trong trường hợp xấu nhất: $O(|E|.|V|)$

# Ứng dụng thuật toán

Một biến thể phân tán của thuật toán Bellman-Ford được dùng trong các giao thức định tuyến vector khoảng cách, chẳng hạn giao thức RIP (Routing Information Protocol). Đây là biến thể phân tán vì nó liên quan đến các nút mạng (các thiết bị định tuyến) trong một hệ thống tự động (autonomous system), ví dụ một tập các mạng IP thuộc sở hữu của một nhà cung cấp dịch vụ Internet (ISP).

Thuật toán gồm các bước sau:

- Mỗi nút tính khoảng cách giữa nó và tất cả các nút khác trong hệ thống tự động và lưu trữ thông tin này trong một bảng.
- Mỗi nút gửi bảng thông tin của mình cho tất cả các nút lân cận.
- Khi một nút nhận được các bảng thông tin từ các nút lân cận, nó tính các tuyến đường ngắn nhất tới tất cả các nút khác và cập nhật bảng thông tin của chính mình.

Nhược điểm chính của thuật toán Bellman-Ford trong cấu hình này là:

- Không nhân rộng tốt.
- Các thay đổi của tô-pô mạng không được ghi nhận nhanh do các cập nhật được lan truyền theo từng nút một.
- Đếm dần đến vô cùng (nếu liên kết hỏng hoặc nút mạng hỏng làm cho một nút bị tách khỏi một tập các nút khác, các nút này vẫn sẽ tiếp tục ước tính khoảng cách tới nút đó và tăng dần giá trị tính được, trong khi đó còn có thể xảy ra việc định tuyến thành vòng tròn).

# Tổng kết

| Đặc điểm đồ thị                  | BFS $O(V+E)$        | Dijsktra $O((V+E) \log V)$ | Bellman Ford $O(VE)$     | Floyd Warshall $O(V^3)$ |
| -------------------------------- | ------------------- | -------------------------- | ------------------------ | ----------------------- |
| Kích thước đồ thị có thể áp dụng | $V,E \le 10M$       | $V,E \le 300K$             | $VE \le 10M$             | $V \le 400$             |
| Không trọng số                   | Tốt nhất            | Ổn                         | Tệ                       | Đa phần là tệ           |
| Có trọng số                      | WA                  | Tốt nhất                   | Ổn                       | Đa phần là tệ           |
| Trọng số âm                      | WA                  | Ổn                         | Ổn                       | Đa phần là tệ           |
| Chu trình âm                     | Không xác định được | Không xác định được        | Xác định được            | Xác định được           |
| Đồ thị nhỏ                       | WA nếu có trọng số  | Lấy dao mổ trâu giết gà    | Lấy giao mổ trâu giết gà | Tốt nhất                |

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. https://sites.google.com/site/kc97ble/algorithm-graph/fordbellmanqueue-cpp