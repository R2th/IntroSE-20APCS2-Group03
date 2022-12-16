# I. Cấu trúc dữ liệu Heap

Để thuận tiện, mình sẽ nhắc lại những khái niệm cơ bản về Heap và một số thao tác Heap cung cấp. Heap là một cấu trúc dữ liệu dạng cây, trong đó các nút trên cây được sắp xếp theo một thứ tự ràng buộc nhất định giữa khóa của nút cha và khóa của nút con (thường là nút cha nhỏ hơn hoặc lớn hơn nút con). Nút ở gốc của Heap luôn luôn là nút có mức ưu tiên cao nhất, nghĩa là lớn nhất hoặc nhỏ nhất.

Dưới đây là một số thao tác của Heap và cách cài đặt các thao tác đó (với $\text{heap}$ là mảng cài đặt Heap, **n_heap** là số phần tử của Heap):
- Trả về nút có khóa lớn nhất/nhỏ nhất trên Heap (chính là nút gốc):

    ```cpp
    int get_root()
    {
        return heap[1];
    }
    ```
    
- Cập nhật Heap từ trên xuống và từ dưới lên:

    ```cpp
    void up_heap(int i) // Cập nhật từ dưới lên.
    {
        If (i == 1 || heap[i] < heap[i / 2]) return; 
        // Nếu i là nút gốc hoặc nhỏ hơn nút cha thì không cần quan tâm.
        swap(heap[i], heap[i / 2]);
        up_heap(i / 2); // Tiếp tục di chuyển lên các nút phía trên của Heap.
    } 
    
    void down_heap(int i) // Cập nhật từ trên xuống.
    {
        // Nút con trái và phải của nút i, ban đầu coi như ta chọn trước nút bên trái.
        int left = i * 2, right = i * 2 + 1, j = left; 
        
        // Nếu giá trị Left > n_heap => nút i không có con, không đi vào nhánh con nữa.
        if (left > n_heap) 
            return; 
            
        // Nếu nút i có 2 nút con thì ta chọn giá trị lớn hơn giữa chúng.
        if (left < n_heap && heap[right] > heap[left]) 
            j = right; 
        
        if (heap[i] < heap[j]) // Nếu nút con đc chọn > nút i thì tráo đổi xuống.
        {
            swap(heap[i], heap[j]);
            down_heap(j); // Di chuyển xuống nhánh vừa được swap để làm tiếp.
        }
    }
    ```
    
- Thêm một nút vào Heap:

    ```cpp
    void push(int x)
    {
        // Khi thêm phần tử x, ta tăng kích thước heap lên 1 và thêm nó vào vị trí đó; 
        // sau đó bắt đầu update lên từ vị trí vừa thêm x vào – chính là vị trí n_heap.
        heap[++n_heap] = x;
        up_heap(n_heap);
    }
    ```

- Xóa nút gốc khỏi Heap:

    ```cpp
    void pop()
    {
        heap[1] = heap[n_heap];
        --n_heap;
        down_heap(1); // Chỉ cần cập nhật xuống vì nút gốc không có nút cha.
    }
    ```
    
# II. Giải thuật sắp xếp vun đống (Heap Sort)

## 1. Ý tưởng

Có nhiều giải thuật sắp xếp khác nhau, nhưng Heap Sort, Quick Sort và Counting Sort là những giải thuật thường xuyên được sử dụng nhất trong lập trình thi đấu. Ý tưởng của giải thuật sắp xếp vun đống (Heap Sort) như sau:
- Chia mảng ban đầu thành hai mảng con: Một mảng bao gồm các phần tử đã sắp xếp và một mảng bao gồm các phần tử còn lại chưa được sắp xếp. Ban đầu, mảng đã sắp xếp là mảng rỗng, mảng chưa sắp xếp chính là mảng ban đầu.
- Tìm phần tử nhỏ nhất/lớn nhất trong mảng chưa sắp xếp và đưa nó vào cuối mảng đã sắp xếp (tùy vào cách sắp xếp là tăng dần hay giảm dần). Đây chính là bước cần sử dụng đến cấu trúc dữ liệu Heap.

## 2. Các bước thực hiện

***Bước 1:*** Bắt đầu từ một Heap rỗng, ta đưa toàn bộ các phần tử trong mảng ban đầu vào Heap này. Ở đây mình giả sử rằng chúng ta cần sắp xếp giảm dần, vậy thì Heap sẽ phải cài đặt là một Max Heap (chính là các thao tác đã cài đặt ở phần trên). 

```cpp
void create_heap_from_array(int N, int a[])
{
    for (int i = 1; i <= N; ++i)
        push(a[i]);
}
```

Cách làm này sẽ tốn thời gian $O(N.\log(N))$. Tuy nhiên, ta có thể có phương pháp làm trong $O(N),$ bằng cách "vun đống" trực tiếp mảng ban đầu thành một Heap. Vẫn bắt đầu từ một Heap rỗng, ta xếp các phần tử trong mảng vào Heap theo thứ tự bất kỳ (miễn là lấp đầy các phần tử trong Heap để tạo thành một cây nhị phân cân bằng). Sau đó, ứng với mỗi phần tử của Heap, ta sẽ vun đống nó xuôi xuống dưới, và thực hiện điều này bắt đầu từ các nút lá của Heap. Chứng minh độ phức tạp này khá dài dòng và không cần thiết nên mình xin phép không đi sâu.

```cpp
void create_heap_from_array(int N, int a[])
{
    for (int i = 1; i <= N; ++i)
        heap[i] = a[i];
        
    // Vun đống từ nút i xuống các nút bên dưới, thực hiện từ mức cuối cùng trước.
    for (int i = N; i >= 1; --i)
        down_heap(i);
}
```

***Bước 2:*** Tới đây, ta chỉ cần lần lượt in ra các phần tử ở đầu của Heap, rồi dùng thao tác `pop()` để loại bỏ phần tử ở đầu Heap đi là xong. Trong thao tác `pop()` mình đã viết kèm sẵn việc cập nhật Heap, nên code sẽ đơn giản như sau:

```cpp
void heap_sort(int N, int a[])
{
    create_heap_from_array(N, a);
    
    for (int i = 1; i <= N; ++i)
    {
        a[i] = get_root(); // Gán a[i] bằng phần tử đầu tiên của Heap.
        pop(); // Loại bỏ phần tử đầu tiên của Heap.
        
        cout << a[i] << endl;
    }
}
```

## 3. Sử dụng `priority_queue` để thực hiện Heap Sort

Với template `priority_queue` trong container `queue` của C++, giải thuật sắp xếp vun đống sẽ trở nên rất ngắn gọn. Chúng ta chỉ cần tạo một hàng đợi ưu tiên rỗng, thêm lần lượt các phần tử của mảng ban đầu vào hàng đợi ưu tiên. Cuối cùng các bạn in ra hàng đợi ưu tiên là hoàn thành. Dưới đây mình sẽ viết mẫu code C++ sắp xếp một mảng ***tăng dần*** sử dụng `priority_queue`:

```cpp
void heap_sort(int N, int a[])
{
    priority_queue < int, vector < int >, greater < int > > qu_min;
    
    // Thêm các phần tử của mảng vào priority_queue.
    for (int i = 1; i <= N; ++i)
        qu_min.push(a[i]);
        
    // In ra các phần tử trong priority_queue.
    while (!qu_min.empty())
    {
        cout << qu_min.top() << ' ';
        qu_min.pop();
    }
}
```

# III. Nhận xét

Nếu so sánh về tốc độ, giải thuật Heap Sort sẽ chạy chậm hơn Quick Sort một chút. Tuy nhiên, ưu điểm của Heap Sort là độ phức tạp trong trường hợp tệ nhất chỉ là $O(N.\log(N)),$ ngoài ra chúng ta không cần sử dụng thêm bất kỳ một cấu trúc dữ liệu nào khác trong quá trình sắp xếp, vì thế Heap Sort vẫn được ưa chuộng và đánh giá là một thuật toán sắp xếp tốt.

Nhược điểm duy nhất của Heap Sort có lẽ chỉ là nó chạy chậm hơn Quick Sort và Merge Sort, và nó là một thuật toán sắp xếp không ổn định về thời gian. Tuy nhiên, cấu trúc dữ liệu Heap lại có những ứng dụng to lớn hơn nhiều trong thực tế hơn là chỉ để sắp xếp, vì vậy hiểu và ứng dụng được Heap Sort cũng rất tốt cho các bạn đang học về Cấu trúc dữ liệu và Giải thuật.

# IV. Tài liệu tham khảo

- https://niithanoi.edu.vn/heap-sort.html
- https://www.stdio.vn/giai-thuat-lap-trinh/heap-sort-thuat-toan-sap-xep-vun-dong-9kQFE1
- https://cafedev.vn/thuat-toan-heapsort-gioi-thieu-chi-tiet-va-code-vi-du-tren-nhieu-ngon-ngu-lap-trinh/
- https://www.giaithuatlaptrinh.com/?p=736