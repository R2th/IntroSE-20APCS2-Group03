Hôm trước mình có viết 1 bài về [thuật toán Quick Sort ](https://viblo.asia/p/tim-hieu-thuat-toan-quick-sort-1VgZv0Ar5Aw), một trong những thuật toán sắp xếp hiệu quả với độ phức tạp thuật toán là O(nlogn) có thể nói là loại nhanh  nhất. Và hôm nay mình sẽ giới thiệu thêm về 1 thuật toán sắp xếp nữa đó là thuật toán sắp xếp đếm (hay còn gọi là Counting Sort). Cùng tìm hiểu nhé!:wink:

### Ý tưởng

**Input**: Đầu vào sẽ là n số nguyên trong khoảng [0,k], trong đó *k*  là số nguyên, phạm vị giá trị của n và *k = O(n)*

**Ý tưởng**: Với mỗi phần tử x của dãy đầu vào ta xác định hạng (rank) của nó như là số lượng phần tử nhỏ hơn x. Một khi ta đã biết hạng *r* của x, ta có thể xếp nó vào vị trí *r+1*

**Ví dụ**: Nếu có 6 phần tử nhỏ hơn 17, ta có thể xếp 17 vào vị trí thứ 7.

**Lặp**: Khi có 1 loại phần tử có cùng giá trị, ta sẽ xếp chúng theo thứ tự xuất hiện trong dãy ban đầu để có được tính ổn định nhất của sắp xếp

![](https://images.viblo.asia/bdf9243c-cd9f-44d0-a24c-989bda8f1ae0.gif)

### Cài đặt
Ở đây mình sẽ dùng javascript để thực hiện ví dụ nhé:slightly_smiling_face:
```php
countingSort = (array, min, max) => {
        let index = 0;
        const count = [];

        // Mảng count với max phần tử và được gán giá trị là 0 tại mỗi vị trí 
        for (let i = min; i <= max; i++) {
            count[i] = 0;
        }

        // Đếm số lượng đối tượng có cùng giá trị và lưu kết quả vào mảng count
        for (let i=0; i < array.length; i++) {
            count[array[i]]++;
        }
        
        // Thay đổi giá trị của mảng count và return ra mảng đã sx
        for (let i = min; i <= max; i++) {
            while (count[i] > 0) {
                array[index] = i; 
                index++;
                count[i]--;
            }
        }
        
        return array;
    }
    
    const array = [4, 2, 3, 1, 5];
    
    const min = Math.min(...array) // lấy giá trị thấp nhất trong mảng
    const max = Math.max(...array) // lấy giá trị cao nhất trong mảng
    
    this.countingSort(array, min, max)
```
### Độ phức tạp của thuật toán
- Counting Sort  một thuật toán tuyến tính với độ phức tạp là O(n+k).
- Do k = O(n) nên thời gian của thuật toán là O(n) => thuật toán tốt nhất.
- Trường hợp k = n*n => Thuật toán làm việc rất tồi.
- Counting Sort không có tính tại chỗ.

Như vậy mình đã giới thiệu sơ qua về thuật toán Counting Sort và cách cài đặt nó trong js. 

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**: giáo trình cấu trúc dữ liệu vào giải thuật - ĐHBKHN

https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/counting-sort