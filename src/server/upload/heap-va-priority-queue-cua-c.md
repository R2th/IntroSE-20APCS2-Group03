## I. Kiểu dữ liệu Heap trong C++
### 1. Biểu diễn dưới dạng cây nhị phân

Để làm quen về kiểu dữ liệu Heap, chúng ta có thể biểu diễn kiểu dữ liệu Heap theo một cây nhị phân. Ta có thể biểu diễn theo hai kiểu như sau:

**Kiểu 1 (Max-Heap): Các nút cha luôn có giá trị lớn hơn các nút con**
![](https://i.imgur.com/S0NS1rR.png)

**Kiểu 2 (Min-Heap): Các nút cha luôn có giá trị nhỏ hơn các nút con**
![](https://i.imgur.com/onlSRRn.png)

Xét kiểu biểu diễn thứ hai, quan sát cây nhị phân với kiểu dữ liệu **Heap**, ta có một số đặc điểm như sau:

- Giá trị nhỏ nhất trong cây là **10**, được gọi là giá trị **root**.
- Các nút cha luôn có giá trị nhỏ hơn các nút con.
- Nếu sắp xếp theo thứ tự từ trên xuống dưới, từ trái sang phải thì ta có dãy giá trị **[10, 14, 19, 26, 31, 42, 27, 44, 35, 33]** (đặt tên là **heap**, với phần tử đầu tiên là **heap[0]=10**). Khi đó, tại **heap[i]**, chỉ số của phần tử con bên trái tương ứng là **heap[2i+1]**, phần tử con bên phải là **heap[2i+2]**. Tương ứng ta cũng có chỉ số phần tử cha của **heap[i]** là **heap[(i-1)/2]**.
(Lưu ý ở trên tương ứng với phần tử đầu tiên mang chỉ số **0**, nếu coi phần tử đầu tiên là chỉ số **1** thì hai phần tử con, và phần tử cha của **heap[i]** lần lượt là: **heap[2i], heap[2i+1], heap[i/2]**)

### 2. Cài đặt

Ví dụ về cài đặt **Min-Heap**:

```c
void min_heap(int A[], int i) {
// Chỉ số của phần tử nhỏ nhất trong bộ ba: nút hiện tại, nút con bên trái, và nút con bên phải của nó
    int smallest;
    int left = 2 * i; // Vị trí của nút con bên trái
    int right = 2 * i + 1; // Vị trí của nút con bên phải
    if (left <= N and A[left] < A[i]) // N là số phần tử trong mảng, biến toàn cục
        smallest = left;
    else
        smallest = i;
    if (right <= N and A[right] < A[smallest])
        smallest = right;
    if (smallest != i) {
// Thực hiện đổi chỗ hai phần tử nếu giá trị của nút cha lớn hơn nút con
        swap(A[i], A[smallest]);
// Gọi đệ quy nút tại vị trí mới
        min_heap(A, smallest);
    }
}
```

### 3. Các thao tác hay sử dụng với Heap

![](https://i.imgur.com/onlSRRn.png)
#### 3.1. **make_heap()**
Xây dựng kiểu dữ liệu **heap**.

#### 3.2. **Push** (Sử dụng hàm **push_heap()** )
Thêm một giá trị nút mới vào dữ liệu **heap**. Cách làm thông thường là chèn nút vào sau cùng (tức phần tử cuối cùng của mảng), sau đó so sánh liên tục với nút cha của nó và tiến hành **swap** (hoán đổi) liên tục giữa hai phần tử để đưa phần tử cần chèn về vị trí đúng của nó. Độ phức tạp thời gian là $O(log_n)$. Ví dụ: Thêm phần tử **12** vào **heap** trong hình trên:
- Thêm **12** vào cuối **heap**.
- Tiến hành so sánh **12** và **31**, nhận thấy rằng **12** nhỏ hơn nên hoán đổi vị trí của **12** và **31**. Lúc này, **12** trở thành nút con bên phải của nút cha **14**.
- Tiến hành so sánh **12** và **14**, tiếp tục nhận thấy rằng **12** nhỏ hơn nên hoán đổi vị trí của **12** và **14**. Lúc này, **12** trở thành nút con bên trái của nút cha (cũng chính là nút gốc) **10**.
- Cuối cùng, so sánh **12** và **10**. Vì **10** nhỏ hơn **12** nên thao tác **Push** kết thúc.

#### 3.3. **Pop** (Sử dụng hàm **pop_heap()** )

**Pop** có mục đích đưa ra đỉnh nút. Cách làm cũng là sự so sánh liên tục giữa các nút cha và nút con sau đó tiến hành hoán đổi (tương tự **Push**). Độ phức tạp thời gian cũng là $O(log_n)$.

#### 3.4. **Remove**

**Remove** sẽ xóa một nút chỉ định trong **heap** (không nhấp thiết là nút đỉnh). Thông thường chúng ta sẽ tìm kiếm ra nút cần xóa và thực hiện thao tác. Về độ phức tạp thời gian sẽ phụ thuộc vào công việc tìm kiếm. Chúng ta nên kiến tạp một bảng **hash** để hỗ trợ việc tìm kiếm. Ngoài ra bạn có thể tìm đọc thêm về chủ đề **HashHeap**.

#### 3.4. **Sort**

Việc sử dụng hàm **sort_heap()** giúp ta sắp xếp lại kiểu dữ liệu theo mục đích bản thân (thông qua tham số phụ **cmp**).

* Tổng hợp ví dụ cách cài đặt các thao tác trên:

```c
//STL heap
#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;
 
bool cmp(int a,int b){
	return a > b;
}
 
int main(){
	int i; 
	vector <int> v;
	for(int i = 5; i > 0; i--)
	    v.push_back(i+2);
	make_heap(v.begin(),v.end(),cmp);  // tạo min-heap 
// output: 3, 4, 5, 7, 6 
	for(int i = 0;i < 5; i++)
	    cout << v[i] << " ";
	cout << endl;
	v.push_back(2);
// thêm vào 2, tái tạo heap
	push_heap(v.begin(), v.end(), cmp);
// output: 2, 4, 3, 7, 6, 5 
	for(int i = 0; i < 6; i++)
	    cout << v[i] << " ";
	cout << endl;
	pop_heap(v.begin(),v.end(),cmp); // lấy ra nút đỉnh
	v.pop_back();
// kết quả 3, 4, 5, 7, 6
	for(int i = 0; i < 6; i++)
	    cout << v[i] << " ";
	cout << endl; 
	sort_heap(v.begin(),v.end(),cmp);  // sắp xếp heap
//  output: 7, 6, 5, 4, 3
	for(int i = 0; i < 5; i++)
	    cout << v[i] << " ";
	cout << endl;
    
	return 0;
}
```

## II. Phân biệt vùng nhớ Heap với Stack

Chúng ta hãy cùng xem xét một tình huống như sau:

An là một đứa trẻ khá bừa bãi. Sau khi học bài, An thường bỏ các cuốn sách vở lung tung khắp nơi trên bàn học. Thấy vậy, mẹ An sắp xếp lại tất cả sách vở cho An vào một giá để sách thành một chồng sách trông rất gọn gàng và sạch đẹp. (Các bạn không được như An nhé, học bài xong cần để gọn gàng sách vở kẻo bố mẹ phạt đó).

Trong tình huống, chúng ta có thể coi chồng sách sau khi mẹ sắp xếp là một kiểu dữ liệu **Stack** (sách vở xếp vào đầu tiên sẽ được lấy ra sau cùng). Còn **Heap** thì hoàn toàn ngược lại - đó chính là đống sách vở vứt bừa bộn trên bàn học của An. Hay chúng ta còn gọi là kiểu dữ liệu **Đống** (**Heap**).

Vậy thì, chúng khác nhau như thế nào? Đối với chồng sách mẹ xếp trong giá đựng sách, giá sách đó sẽ có giới hạn về số lượng sách xếp vào. Còn các không gian để An bỏ sách lung tung trên bàn thì lớn hơn nhiều! Đúng như vậy, bộ nhớ được máy tính cấp phát cho kiểu dữ liệu **Stack** là có hạn, đối với **Heap**, chúng ta không cần quan tâm về bộ nhớ cho lắm, thậm chí ta có thể yêu cầu thêm bộ nhớ trong khi chương trình đang thực thi. Cụ thể, khi chúng ta yếu cầu cấp phát bộ nhớ đối với **Heap**, chương trình bắt đầu đọc giá trị kích thước cần cấp phát sau đó mới thực hiện nhu cầu của bạn. Như vậy, ta có thể thấy việc sử dụng bộ nhớ trong **Stack** sẽ có khá nhiều bất tiện so với **Heap** trong việc lưu trữ (Việc có cả một mặt bàn để bỏ lung tung các cuốn sách vở thực sự thoải mái và chẳng cần quan tâm thiếu không gian để sách đúng không :100: ).

Tuy nhiên chúng ta cũng cần lưu ý trong việc sử dụng bộ nhớ đối với **heap**. Cụ thể, để yêu cầu cấp phát bộ nhớ trong **Heap**, ta có thể sử dụng từ khóa **new** trong **C++**. Khi kết thúc chương trình cần phải sử dụng tham trị **delete** để trả lại vùng nhớ đó cho máy tính. Vì nếu như chúng ta quên giải phóng bộ nhớ sau khi sử dụng xong vùng nhớ yêu cầu từ đầu, bộ nhớ đó sẽ không thể được sử dụng nữa do máy tính rơi vào trạng thái lầm tưởng rằng bạn vẫn đang cần sử dụng nó. Dẫn đến tình trạng **memory leak** (rò rỉ bộ nhớ).

## III. Priority_queue trong C++
### 1. Mở đầu về Priority_queue

Tại bệnh viện đa khoa Hà Nội có rất nhiều bệnh nhân, họ đều mang trong mình những bệnh tình, vấn đề sức khỏe, tình trạng cơ thể khác nhau. Và chắc chắn các bác sĩ sẽ ưu tiên chữa trị trước cho các bệnh nhân có tình trạng nguy cấp nhất, sau đó mới đến các bệnh nhân thông thường khác. Điều đó có nghĩa là các bệnh nhân mang trong mình một thứ tự ưu tiên nào đó (ở đây là mức độ nghiêm trọng của căn bệnh họ bị). Các bệnh nhân chính là các phần tử trong một cấu trúc **Priority_queue**.

**Priority_queue** (hàng đợi ưu tiên) chỉ một kiểu cấu trúc dữ liệu trong đó các phần tử đều mang trong mình một thứ tự ưu tiên cụ thể. Bởi vậy, có thể coi **Priority_queue** là một dạng hàng đợi đặc biệt bởi các phần tử của nó đều được liên kết với một mức độ ưu tiên - hỗ trợ cho thao tác thực thi đối với các phần tử trong bài toán.

### 2. Cài đặt và các thao tác đối với Hàng đợi ưu tiên Priority_queue

#### 2.1. Cài đặt

Trước tiên cần khai báo thư viện ```#include <queue>```. Cú pháp khai báo định nghĩa:

```c
#include <queue>

priority_queue<Type, Container, Functional>


```

Trong đó, **Type** chỉ kiểu dữ liệu, **Container** chỉ kiểu dữ liệu chứa (bắt buộc là kiểu mảng, ví dụ **vector, deque**... chú ý không sử dụng **list**) và mặc định là kiểu **vector**. Tham trị **Functional** là phần tham trị phụ chỉ thứ tự ưu tiên cho các phần tử. Chỉ khi cần tự định nghĩa các vấn đề mới cần nhập đầy đủ cả **3** giá trị này. Bình thường chỉ cần nhập giá trị của **Type**, mặc định là giảm dần.

```c
#include<iostream>
#include <queue>
#include <functional>

using namespace std;
int main() 
{
// cách khai báo priority_queue cơ bản
// mặc định là giảm dần
    priority_queue<int> a; 
// tương đương với priority_queue<int, vector<int>, less<int> > a;
    
  
    priority_queue<int, vector<int>, greater<int> > c;  // tăng dần
    priority_queue<string> b;

    for (int i = 0; i < 5; i++) 
    {
        a.push(i);
        c.push(i);
    }
    while (!a.empty()) 
    {
        cout << a.top() << ' ';
        a.pop();
    } 
    cout << endl;

    while (!c.empty()) 
    {
        cout << c.top() << ' ';
        c.pop();
    }
    cout << endl;

    b.push("abc");
    b.push("abcd");
    b.push("cbd");
    while (!b.empty()) 
    {
        cout << b.top() << ' ';
        b.pop();
    } 
    cout << endl;
    return 0;
}
```

Output:

```c
4 3 2 1 0
0 1 2 3 4
cbd abcd abc
```

#### 2.2. Các thao tác

**empty()**: Thao tác này kiểm tra xem **Priority_queue** trống hay không. Nếu nó trống, trả về **true**, ngược lại là **false**. Nó không chứa bất kỳ tham số nào.

```c
q.empty()
```

**size()**: Phương thức này cung cấp số phần tử của **Priority_queue**. Nó trả về giá trị là một số nguyên. Nó không chứa bất kỳ tham số nào.

```c
q.size()
```

**push()**: Phương thức này chèn phần tử vào hàng đợi ưu tiên **Priority_queue**. Đầu tiên, phần tử được thêm vào cuối hàng đợi và đồng thời các phần tử tự sắp xếp lại với mức độ ưu tiên. Nó có giá trị chứa trong tham số.

```c
q.push(3) // chèn phần tử 3 vào q
```

**pop()**: Phương thức này xóa phần tử trên cùng (mức độ ưu tiên cao nhất) khỏi hàng đợi ưu tiên. Nó không có bất kỳ tham số nào.

```c
q.pop()
```

**top()**: Phương thức này cung cấp phần tử trên cùng từ vùng chứa hàng đợi ưu tiên. Nó không có bất kỳ tham số nào.

```c
q.top()
```

**swap()**: Phương thức này hoán đổi các phần tử của một **Priority_queue** với một **Priority_queue** (có cùng kích thước và kiểu). Nó nhận hàng đợi ưu tiên trong một tham số có các giá trị cần được hoán đổi.

```c
q.swap(qu)
```

**emplace()**: Phương thức này thêm một phần tử mới vào một vùng chứa ở đầu hàng đợi ưu tiên. Nó nhận giá trị trong một tham số.

```c
q.emplace(3) // thêm phần tử 3
```

#### 2.3. Các ứng dụng của Priority_queue

- Để triển khai ngăn xếp.
- Tất cả các ứng dụng xếp hàng có liên quan đến mức độ ưu tiên.
- Để triển khai thuật toán Dijkstra.
- Để cân bằng tải và xử lý các ngắt trong hệ điều hành.
- Lập lịch CPU.

## Tài liệu tham khảo

* [https://en.wikipedia.org/wiki/Heap_(data_structure)](https://en.wikipedia.org/wiki/Heap_(data_structure))
* [https://en.wikipedia.org/wiki/Priority_queue](https://en.wikipedia.org/wiki/Priority_queue)