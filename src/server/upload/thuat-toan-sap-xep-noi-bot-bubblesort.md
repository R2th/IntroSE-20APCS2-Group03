Đây là bài viết đầu tiên trong series các thuật toán sắp xếp thông dụng trong lập trình mình sẽ chia sẻ tới mọi người. Trong bài viết này, chúng ta sẽ cùng tìm hiểu về thuật toán sắp xếp nổi bọt nhé.
Các phần trong bài viết lần này bao gồm:
1. Tư tưởng của thuật toán
2. Code Demo
3. Đánh giá thuật toán.<br>
##  Bắt đầu nào.<br>
### **1. Tư tưởng thuật toán**
Thuật toán này có tư tưởng sắp xếp như sau:<br>
*   Thực hiện đổi chỗ các phần tử từ đầu đến cuối mảng.  Đổi chỗ 2 phần tử đứng cạnh nhau theo quy ước sắp xếp của mình (tùy vào sắp xếp từ lớn đến bé hay từ bé đến lớn ma ta quyết định xem có thực hiện đổi chỗ 2 phần tử hay không), bước swap này được thực hiện tuần tự và lần lượt từ đầu cho tời cuối mảng. Sau khi thực hiện đổi chỗ hết một loạt sẽ có 1 phần tử đứng đúng chỗ là phần tử đứng cuối mảng. <br>
    Ví dụ ta có mảng các số 4, 5, 2,  3, 7, 6, 1, và cần sắp xếp từ lớn đến bé. Các bước đổi chỗ sẽ được thực hiện như sau:<br>
       **B1**: Ta xác định 2 phần tử cần đổi chỗ là 1 và 5. Vì 4<5 nên ta giữ nguyên vị trí hai số => [**4**, **5**, 2, 3, 7, 6, 1].<br>
       **B2**: Ta xác định 2 phần tử cần đổi chỗ tiếp theo là 5 và 2. Vì 5>2 nên ta đổi vị trí hai số => [4, **2**,**5**, 3, 7, 6, 1].<br>
       **B3**: Ta xác định 2 phần tử cần đổi chỗ tiếp theo là 5 và 3. Vì 5>3 nên ta đổi vị trí hai số => [4, 2,**3**, **5**, 7, 6, 1].<br>
       **B4**: Ta xác định 2 phần tử cần đổi chỗ tiếp theo là 5 và 7. Vì 5<7 nên ta giữ nguyên vị trí hai số => [4, 2,3, **5**, **7**, 6, 1].<br>
       **B5**: Ta xác định 2 phần tử cần đổi chỗ tiếp theo là 7 và 6. Vì 7>6 nên ta đổi vị trí hai số => [4, 2,3, 5, **6**, **7**, 1].<br>
       **B6**: Ta xác định 2 phần tử cần đổi chỗ tiếp theo là 7 và 1. Vì 7>1 nên ta đổi vị trí hai số => [4, 2,3, 5, 6, **1**, **7**].<br>
*   Thực hiện lặp tiếp tục quá trình trên nhưng qua mỗi lần sẽ giảm size của mảng được lặp đi 1.<br>
*   Do đó lần thứ 2 thực hiện quá trình trên nhưng ta chỉ thực hiên với mảng in đậm thôi nhé: [**4, 2,3, 5, 6,** **1**, 7]
*   Các lần khác tương tự cho đến khi mảng cần sắp xếp chỉ còn 1 phần tử để đổi chỗ.
Nói hơi khó hiểu nhỉ. Vậy chúng ta cùng đi vào code nhé.<br>


### **2. Code Demo**
```Java
 public void BubbleSort(int[] arr)
    {
        int arrSize = arr.length;
        for(int i = 0; i < arrSize-1; i++)
        {
            //giảm dần qua các lần lặp ở đây nhé
            //ta chỉ lặp khi j<arrSize-i-1.
            for(int j = 0; j < arrSize-i-1; j++) 
            {
                if(arr[j] > arr[j+1])
                {//swap
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }
    }
```
### **3. Đánh giá thuật toán:**<br>
Độ phức tạp thuật toán
* Trường hợp tốt: O(n)
* Trung bình: O(n^2)
* Trường hợp xấu: O(n^2)