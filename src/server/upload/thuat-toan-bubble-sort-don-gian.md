# 1. Overview
Tiếp tục SERI Thuật Toán Sắp Xếp Đơn Giản chúng ta sẽ tìm hiểu một thuật toán rất dễ để cài đặt mà bất kì bạn sinh viên nào cũng sẽ được học ngay từ những năm đầu tiên của đại học. Giới thiệu qua cho bạn nào chưa biết : SERI Thuật Toán Đơn Giản chúng ta sẽ tìm hiểu những thuật toán bao gồm **Bubble Sort, Insertion Sort, Merge Sort, Heap Sort, QuickSort, Radix Sort, Counting Sort, Bucket Sort, ShellSort** . Trong bài viết này mình chúng ta sẽ tìm hiểu về thuật toán **Bubble Sort**.
# 2. Bubble Sort (Sắp Xếp Nổi Bọt)
Bubble Sort là thuật toán sắp xếp đơn giản nhất hoạt động bằng cách hoán đổi nhiều lần các phần tử liền kề nếu chúng sai thứ tự.

Ví dụ dùng thuật toán Bubble Sort:

``` Python
Vòng chạy đầu tiên:

(5 1 4 2 8) -> (1 5 4 2 8), Ở đây, thuật toán so sánh hai phần tử đầu tiên và hoán đổi vì 5> 1.

(1 5 4 2 8) -> (1 4 5 2 8), Hoán đổi vì 5> 4

(1 4 5 2 8) -> (1 4 2 5 8), Hoán đổi vì 5> 2

(1 4 2 5 8) -> (1 4 2 5 8), Bây giờ, vì các phần tử này đã có thứ tự (8> 5), thuật toán không hoán đổi chúng.
```
Hãy xem sơ đồ dưới đây để hiểu rõ hơn
![](https://images.viblo.asia/09b8d98d-8d5c-435c-bc9e-c64d6ee74a55.png)

``` Python
Vòng chạy thứ hai:

(1 4 2 5 8) -> (1 4 2 5 8)

(1 4 2 5 8) -> (1 2 4 5 8), Hoán đổi vì 4> 2

(1 2 4 5 8) -> (1 2 4 5 8)

(1 2 4 5 8) -> (1 2 4 5 8)
```
Hãy xem sơ đồ dưới dây để hiểu rõ hơn
![](https://images.viblo.asia/2e87b6cf-a84e-438c-b8fd-e835139f5ec5.png)

Bây giờ, mảng đã được sắp xếp, nhưng thuật toán của chúng tôi không biết liệu nó có hoàn thành hay không. Thuật toán cần một lần chuyển toàn bộ mà không có bất kỳ sự hoán đổi nào để biết nó được sắp xếp.

``` Python
Vòng chạy thứ ba:

(1 2 4 5 8) -> (1 2 4 5 8)

(1 2 4 5 8) -> (1 2 4 5 8)

(1 2 4 5 8) -> (1 2 4 5 8)

(1 2 4 5 8) -> (1 2 4 5 8)
```
Hãy xem sơ đồ dưới dây để hiểu rõ hơn

![](https://images.viblo.asia/da4152e4-11ca-484a-862d-37438acb8381.png)

Dưới đây là code được triển khai trên ngôn ngữ Python
``` Python
# Bubble Sort

def bubbleSort(arr):
    n = len(arr)

    # Duyệt Tất Cả Phần Tử Của Mảng
    for i in range(n):

        for j in range(0, n-i-1):

            # Duyệt phần tử trong mảng từ 0 to n-i-1
            # Đổi chỗ khi tìm thấy phần tử lớn hơn
            if arr[j] > arr[j+1] :
                arr[j], arr[j+1] = arr[j+1], arr[j]

# Chạy hàm vừa viết
arr = [5, 1, 4, 2, 8]

bubbleSort(arr)

print ("Sorted array is:")
for i in range(len(arr)):
    print ("%d" %arr[i])
```

Dưới đây là kết quả
``` Python
1 2 4 5 8
```

Độ phức tạp của thuật toán Bubble Sort là  O(n*n). Trường hợp xấu nhất xảy ra là khi mảng được sắp xếp ngược lại.

# 3. Conclusion (Kết Luận)
Thông qua bài viết này chúng ta đã tìm hiểu về thuật toán Bubble Sort . Các thành phần của Bubble Sort. Độ phúc tạp của thuật toán và cách cài đặt thuật toán thông qua ví dụ. Rất mong đã đem lại những kiến thức thú vị cho các bạn. Nếu thấy hữu ích các bạn nhớ bấm follow mình nha.!! 
### Bài Viết Cùng Seri:

+ Thuật Toán Sắp Xếp Chọn ( Selection Sort ): https://viblo.asia/p/thuat-toan-selection-sort-don-gian-3Q75wVBelWb
+ Thuật Toán Sắp Xếp Chèn (Insertion Sort): https://viblo.asia/p/thuat-toan-selection-sort-don-gian-3Q75wVBelWb