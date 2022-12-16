- Đứa em mình mới đi phỏng vấn và được hỏi về một số thuật toán sắp xếp và có một một số thuật toán em mình không nhớ, nên là mình làm bài viết này để viết bài về thuật toán sắp xếp để mình cũng ôn lại nó chứ lâu không đụng cũng không nhớ luôn :))
# 1. Sắp xếp chọn (Selection Sort)
- Ý tưởng của thuật toán này như sau: duyệt từ đầu đến phần tử kề cuối danh sách, duyệt tìm phần tử nhỏ nhất từ vị trí kế phần tử đang duyệt đến hết, sau đó đổi vị trí của phần tử nhỏ nhất đó với phần tử đang duyệt và cứ tiếp tục như vậy.
- Cho mảng A có n phần tử chưa được sắp xếp. Cụ thể các bước của giải thuật này áp dụng trên mảng A như sau:

1.  Gán i = 0
2.  Gán j = i + 1 và min = A[i]
3.  Nếu j < n:
    * Nếu A[j] < A[min] thì min = j
    * j = j + 1
    * Quay lại bước 3
4. Đổi chỗ A[min] và A[i]
5.  Nếu i < n – 1:
    * Đúng thì i = i + 1 và quay lại bước 2
    * Sai thì dừng lại
```
void SelectionSort(int A[], int n)
{
    int min;
    int cache;
    for (int i = 0; i < n - 1; i++)
    {
        min = i; // tạm thời xem A[i] là nhỏ nhất
        // Tìm phẩn tử nhỏ nhất trong đoạn từ A[i] đến A[n - 1]
        for (int j = i + 1; j < n; j++)
            if (A[j] < A[min]) // A[j] mà nhỏ hơn A[min] thì A[j] là nhỏ nhất
                min = j; // lưu lại vị trí A[min] mới vừa tìm được
        if (min != i) // nếu như A[min] không phải là A[i] ban đầu thì đổi chỗ
        {
            swap(A[i],A[min]);
        }
    }
}
```

-- Còn dây là ví dụ nhá
```
int main()
{
    cout<<"Data selection sort :";
    int a[] = {3,8,7,23,1};
    int arrSize = *(&a + 1) - a;
    SelectionSort(a,arrSize);
    for(int i = 0; i < arrSize; i++){
        cout<<" "<<a[i];
    }
    
}
Kết quả in ra : Data selection sort : 1 3 7 8 23
```
# 2.  Sắp xếp nhanh (Quick Sort)
- Sắp xếp nhanh (quick sort) hay sắp xếp phân đoạn (Partition) là là thuật toán sắp xếp dựa trên kỹ thuật chia để trị, cụ thể ý tưởng là: chọn một điểm làm chốt (gọi là pivot), sắp xếp mọi phần tử bên trái chốt đều nhỏ hơn chốt và mọi phần tử bên phải đều lớn hơn chốt, sau khi xong ta được 2 dãy con bên trái và bên phải, áp dụng tương tự cách sắp xếp này cho 2 dãy con vừa tìm được cho đến khi dãy con chỉ còn 1 phần tử.

Cụ thể áp dụng thuật toán cho mảng như sau:

1. Chọn một phần tử làm chốt
2. Sắp xếp phần tử bên trái nhỏ hơn chốt
3. Sắp xếp phần tử bên phải nhỏ hơn chốt
4. Sắp xếp hai mảng con bên trái và bên phải pivot
Phần tử được chọn làm chốt rất quan trọng, nó quyết định thời gian thực thi của thuật toán. Phần tử được chọn làm chốt tối ưu nhất là phần tử trung vị, phần tử này làm cho số phần tử nhỏ hơn trong dãy bằng hoặc sấp xỉ số phần tử lớn hơn trong dãy. Tuy nhiên, việc tìm phần tử này rất tốn kém, phải có thuật toán tìm riêng, từ đó làm giảm hiệu suất của thuật toán tìm kiếm nhanh, do đó, để đơn giản, người ta thường sử dụng phần tử chính giữa làm chốt.

```
void Partition(int A[], int left, int right)
{
     int cache;
    // Kiểm tra xem nếu mảng có 1 phần tử thì không cần sắp xếp
    if (left >= right)
        return;

    int pivot = A[(left + right) / 2]; // Chọn phần tử chính giữa dãy làm chốt

    // i là vị trí đầu và j là cuối đoạn
    int i = left, j = right;
    while (i < j)
    {
        while (A[i] < pivot) // Nếu phần tử bên trái nhỏ hơn pivot thì ok, bỏ qua
            i++;
        while (A[j] > pivot) // Nếu phần tử bên phải lớn hơn pivot thì ok, bỏ qua
            j--;

        // Sau khi kết thúc hai vòng while ở trên thì chắc chắn
        // vị trí A[i] phải lớn hơn pivot và A[j] phải nhỏ hơn pivot
        // nếu i < j
        if (i <= j)
        {
            if (i < j) // nếu i != j (tức không trùng thì mới cần hoán đổi)
                swap(A[i], A[j]); // Thực hiện đổi chổ ta được A[i] < pivot và A[j] > pivot
            i++;
            j--;
        }
    }

    // Gọi đệ quy sắp xếp dãy bên trái pivot
    Partition(A, left, j);
    // Gọi đệ quy sắp xếp dãy bên phải pivot
    Partition(A, i, right);
}

// Hàm sắp xếp chính
void QuickSort(int A[], int n)
{
    Partition(A, 0, n - 1);
}

```
- Còn đây là ví dụ nhé :
```
int main()
{
    cout<<"Data QuickSort sort :";
    int a[] = {6,3,8,9,1,6,7,12};
    int arrSize = *(&a + 1) - a;
    QuickSort(a,arrSize);
    for(int i = 0; i < arrSize; i++){
        cout<<a[i]<<" ";
    }
    return 0;
}

Kết quả in ra : Data QuickSort : 1 3 6 6 7 8 9 12
```
# 3. Sắp xếp chèn (Insertion Sort)
- ý tưởng của thuật toán này như sau: ta có mảng ban đầu gồm phần tử A[0] xem như đã sắp xếp, ta sẽ duyệt từ phần tử 1 đến n – 1, tìm cách chèn những phần tử đó vào vị trí thích hợp trong mảng ban đầu đã được sắp xếp.
- Giả sử cho mảng A có n phần tử chưa được sắp xếp. Các bước thực hiện của thuật toán áp dụng trên mảng A như sau:
1. Gán i = 1
2. Gán x = A[i] và pos = i – 1
3. Nếu pos >= 0 và A[pos] > x:
    * A[pos + 1] = A[pos]
    * pos = pos – 1
    * Quay lại bước 3
4. A[pos + 1] = x
5. Nếu i < n:
    * Đúng thì i = i + 1 và quay lại bước 2
    * Sai thì dừng lại
Bây giờ thì áp dụng nó vào trong C++ thôi!
```
void InsertionSort(int A[], int n)
{
    int pos, x;
    for (int i = 1; i < n; i++)
    {
        x = A[i]; // lưu lại giá trị của x tránh bị ghi đè khi dịch chuyển các phần tử
        pos = i - 1;
        // tìm vị trí thích hợp để chèn x
        while (pos >= 0 && A[pos] > x)
        {
            // kết hợp với dịch chuyển phần tử sang phải để chừa chỗ cho x
            A[pos + 1] = A[pos];
            pos--;
        }
        // chèn x vào vị trí đã tìm được
        A[pos + 1] = x;
    }
}
```
-- Đây là ví dụ nhé :
```
int main()
{
    cout<<"Data InsertionSort :";
    int a[] = {6,3,8,9,1,6,7,12};
    int arrSize = *(&a + 1) - a;
    InsertionSort(a,arrSize);
    for(int i = 0; i < arrSize; i++){
        cout<<a[i]<<" ";
    }
    return 0;
}
Kết quả in ra : Data InsertSort : 1 3 6 6 7 8 9 12
```

# 4. Tài liệu tham khảo
https://khiemle.dev/thuat-toan-sap-xep-trong-cpp