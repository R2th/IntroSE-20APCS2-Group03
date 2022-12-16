## I. Ý tưởng thuật toán
Chúng ta hãy cùng xem xét tình huống sau: Trong giờ Toán tại lớp $1A$, thầy giáo viết lên bảng một dãy số như sau:

$4, 2, 2, 8, 3, 3, 1, 2$

Thầy giáo yêu cầu cả lớp hãy sắp xếp dãy số trên theo thứ tự không giảm từ trái qua phải. Cả lớp đều đang loay hoay vì trong bài toán lần này mỗi số không phải chỉ xuất hiện $1$ lần duy nhất như bình thường mà có thể lặp lại. An là một học sinh thông minh, An đưa ra cách xếp độc đáo như sau: Đầu tiên, đếm mỗi số xuất hiện bao nhiêu lần và ghi chúng vào bảng như sau:


![Thuat toan-06.png](https://images.viblo.asia/fdfe3a83-34d1-48fe-a3d7-a88e32de3a91.png)

Như vậy chỉ cần viết các giá trị lặp lại đúng bằng số lần xuất hiện của chúng thì An sẽ thu được dãy số thỏa mãn yêu cầu của thầy:

$1, 2, 2, 2, 3, 3, 4, 8$

Cách làm của An thật độc đáo phải không? Liệu chúng ta có thể áp dụng nó trong Tin học?
## II. Chi tiết thuật toán
Vẫn tiếp tục sử dụng dãy số thầy giáo ở trên:

$4, 2, 2, 8, 3, 3, 1, 2$

Coi dãy trên là mảng $a[\ ]$ như sau:


![Thuat toan-07.png](https://images.viblo.asia/682d176a-3507-430e-8eed-ca71252780cf.png)

Ta để ý rằng mảng trên có số lớn nhất là $8$, khai báo một mảng mới $c[\ ]$ có $9$ phần tử đều nhận giá trị bằng $0$ như sau:


![Thuat toan-08.png](https://images.viblo.asia/b6f5b7bd-17f7-4544-951f-a1b2dcbb3fe1.png)

Coi phần tử $c[i]$ đại diện cho số $i$, thực hiện gắn giá trị cho mảng $c[\ ]$ giống với cách làm của An ta thu được bảng sau:


![Thuat toan-09.png](https://images.viblo.asia/e2d0ea1e-a359-4dc7-8af7-15f8f489eb1e.png)

Cuối cùng ta thực hiện sắp xếp lại dãy như sau:

* Cho số $i$ chạy từ $0$ đến $8$, nếu có $c[i]>0$ ta viết số $i$ và giảm $c[i]$ xuống $1$ đơn vị, đến khi nào $c[i]=0$ thì cho $i$ tiếp tục tăng lên $1$ đơn vị, và tiếp tục như vậy.
* Cụ thể, ban đầu tại $i=0$, ta có $c[0]=0$ nên chuyển sang $i=1$, lúc này $c[1]=1>0$ ta viết xuống số $i=1$:
Dãy số kết quả: $1$
* Sau khi viết xong giảm xuống $c[1]=0$ và tiếp tục chuyển sang $i=2$, ta có $c[2]=3>0$ ta viết tiếp số $i=2$:
Dãy số kết quả: $1, 2$
* Ta giảm xuống $c[2]=2>0$ và tiếp tục viết tiếp số $i=2$:
Dãy số kết quả: $1, 2, 2$
* Tương tự như vậy ta thu được dãy số hoàn chỉnh:
Dãy số kết quả: $1, 2, 2, 2, 3, 3, 4, 8$
## III. Thuật toán tham khảo
* Ngôn ngữ C++:
```c
#include<iostream>
using namespace std;
#define LENGTH 23
#define MAX_ELEMENT 13
int main()
{
    int array[LENGTH] = {1,12,9,3,6,1,9,3,3,8,8,13,10,4,4,6,5,5,5,12,10,11,9};

    int count[MAX_ELEMENT+1] = {0}; 
    for(int i = 0 ; i < LENGTH ; i++)
    {
        count[array[i]]++;
    }

    for(int i = 0, j= 0 ; i <= MAX_ELEMENT && j < LENGTH ; j++)
    {
        while(count[j] > 0)
        {
            count[j]--;
            array[i++] = j;
        }
    }


    return 0;
}
```
* Ngôn ngữ Java:
```java
class CountingSort {
    void sort(char arr[])
    {
        int n = arr.length;
        char output[] = new char[n];
        int count[] = new int[256];
        for (int i = 0; i < 256; ++i)
            count[i] = 0;
        for (int i = 0; i < n; ++i)
            ++count[arr[i]];
        for (int i = 1; i <= 255; ++i)
            count[i] += count[i - 1];
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            --count[arr[i]];
        }
        for (int i = 0; i < n; ++i)
            arr[i] = output[i];
    }
    public static void main(String args[])
    {
        CountingSort ob = new CountingSort();
        char arr[] = { 'g', 'e', 'e', 'k', 's', 'f', 'o',
                       'r', 'g', 'e', 'e', 'k', 's' };
 
        ob.sort(arr);
 
        System.out.print("Sorted character array is ");
        for (int i = 0; i < arr.length; ++i)
            System.out.print(arr[i]);
    }
}
```
* Ngôn ngữ PHP:
```php
<?php
    $RANGE = 255;
    function countSort($arr)
    {
        global $RANGE;
        $output = array(strlen($arr));
        $len = strlen($arr);
        $count = array_fill(0, $RANGE + 1, 0);
        for($i = 0; $i < $len; ++$i) {
            ++$count[ord($arr[$i])];
        }
        for ($i = 1; $i <= $RANGE; ++$i) {
            $count[$i] += $count[$i - 1];
        }
        for ($i = $len-1; $i >= 0 ; $i--) {
            $output[$count[ord($arr[$i])] - 1] = $arr[$i];
            --$count[ord($arr[$i])];
        }
        for ($i = 0; $i < $len; ++$i) {
            $arr[$i] = $output[$i];
        }

        return $arr;
    }
    $arr = "geeksforgeeks"; //"applepp";
    $arr = countSort($arr);
    echo "Sorted character array is " . $arr;
?>
```
## Xung quanh thuật toán sắp xếp bằng đếm phân phối
### 1. Ưu điểm
* Ý tưởng đơn giản, dễ hiểu.
* Đoạn code dễ nhớ, gần gũi với người mới học về sắp xếp.
### 2. Nhược điểm
* Cần tìm dữ kiện lớn nhất trong dãy.
* Chưa phù hợp với các trường hợp dãy số lớn.
## V. Tài liệu tham khảo
* [https://vi.wikipedia.org/wiki/Sắp_xếp_đếm_phân_phối](https://vi.wikipedia.org/wiki/S%E1%BA%AFp_x%E1%BA%BFp_%C4%91%E1%BA%BFm_ph%C3%A2n_ph%E1%BB%91i#:~:text=S%E1%BA%AFp%20x%E1%BA%BFp%20%C4%91%E1%BA%BFm%20ph%C3%A2n%20ph%E1%BB%91i%20l%C3%A0%20m%E1%BB%99t%20ph%C6%B0%C6%A1ng%20ph%C3%A1p%20s%E1%BA%AFp,h%E1%BA%A1n%20t%E1%BB%AB%201%20%C4%91%E1%BA%BFn%20N.)
* [https://en.wikipedia.org/wiki/Counting_sort](https://en.wikipedia.org/wiki/Counting_sort)