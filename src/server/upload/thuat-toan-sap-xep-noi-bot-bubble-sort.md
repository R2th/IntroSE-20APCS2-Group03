![](https://images.viblo.asia/ad9436a5-bb09-4d28-8da3-25b794cf0163.jpg)

## I. Làm quen với thuật toán
<p>

Nghe đến tên gọi thú vị của thuật toán sắp xếp này có khi các bạn cũng hình dung sơ sơ về phương thức làm việc của thuật toán rồi chứ. Sắp xếp nổi bọt (bubble sort) là một thuật toán sắp xếp cơ bản, chúng ta sẽ thao tác dữ liệu cần sắp xếp "nổi bọt" lần lượt theo thứ tự chúng ta mong muốn (từ trái sang phải, từ dưới lên trên, từ trên xuống dưới, ...).
</p>

## II. Miêu tả về thuật toán
### 1. Ý tưởng
<p>

Ý tưởng thuật toán cũng giống như việc xếp hàng trong giờ thể dục. Thầy giáo thể dục muốn xếp các bạn trong lớp thành một hàng theo thứ tự từ thấp đến cao, thầy so sánh chiều cao của $2$ bạn học sinh đứng cạnh nhau trong hàng, nếu bạn bên phải thấp hơn bạn bên trái thì đổi chỗ $2$ bạn cho nhau.
</p>

### 2. Chi tiết thuật toán
<p>

Xét một mảng gồm $n$ số nguyên:
**$a_1, a_2, a_3, ..., a_n$**
* Với cách sắp xếp không giảm từ trái qua phải, mục đích của chúng ta là đưa dần các số lớn nhất về cuối dãy (ngoài cùng bên phải).
* Bắt đầu từ vị trí số $1$, xét lần lượt từng cặp $2$ phần tử, nếu phần tử bên phải nhỏ hơn phần tử bên trái, ta sẽ thực hiện đổi chỗ $2$ phần tử này, nếu không, xét tiếp cặp tiếp theo. Với cách làm như vậy, phần tử nhỏ hơn sẽ "nổi" lên, còn phần tử lớn hơn sẽ "chìm" dần và về bên phải.
* Khi kết thúc vòng thứ nhất, ta sẽ đưa được phần tử lớn nhất về cuối dãy. Sang vòng thứ hai, ta tiếp tục bắt đầu ở vị trí đầu tiên như vậy và đưa được phần tử lớn thứ hai về vị trí thứ hai ở cuối dãy ...
* Hình ảnh minh họa thuật toán:
![](https://i.imgur.com/EpA9rWa.jpg)


* Thuật toán C++ tham khảo:
```cpp
// hàm sắp xếp nổi bọt (bubble sort)
void BubbleSort(int a[], int n){
    int temp; // biến tạm temp
    for (int i = 0; i < n; i++){
	for (int j = i + 1; j < n; j++){
		if (a[j] > a[j+1]){
                    temp = a[j];
                    a[j] = a[j+1];
                    a[j+1] = temp;
			}
		}
	}
}
```
* Thuật toán Java tham khảo:
```java
private static void bubbleSort(int[] unsortedArray, int length) {
        int temp, counter, index;
        
        for(counter=0; counter<length-1; counter++) { //Loop once for each element in the array.
            for(index=0; index<length-1-counter; index++) { //Once for each element, minus the counter.
                if(unsortedArray[index] > unsortedArray[index+1]) { //Test if need a swap or not.
                    temp = unsortedArray[index]; //These three lines just swap the two elements:
                    unsortedArray[index] = unsortedArray[index+1];
                    unsortedArray[index+1] = temp;
                }
            }
        }
    }
```
* Thuật toán PHP tham khảo:
```php
$arr = [...];
$arr_count = count($arr);

//loop
for ($i = 0; $i < $arr_count; $i++)
{
    for ($j = 1; $j < $arr_count - $i; $j++)
    {
        if ($arr[$j-1] > $arr[$j])
        {
            $tmp = $arr[$j-1];
            $arr[$j-1] = $arr[$j];
            $arr[$j] = $tmp;
        }
    }
}


for($i=0;$i<$arr_count;$i++){
    echo $arr[$i]."<br>";
}
```
</p>

## III. Những điều lưu ý của thuật toán
### 1. Ưu điểm
<p>

* Là thuật toán cơ bản, dễ hiểu, phù hợp cho người bắt đầu học về sắp xếp.
* Đoạn code ngắn gọn, dễ nhớ.
### 2. Nhược điểm

* Hiệu suất chậm nhất trong các thuật toán sắp xếp.
* Không hiệu quả với những dữ liệu lớn.
### 3. Thời gian tính và độ phức tạp
Với mỗi $i = 1,2,..,n-1$ ta cần $n-i$ phép so sánh. Do đó số nhiều nhất các lần so sánh và đổi chỗ trong giải thuật là:
$(n-1)+(n-2)+...+2+1=\frac{(n-1)n}{2}$
Do đó ta có độ phúc tạp là $O(n^2)$.
</p>

## IV. Tài liệu tham khảo
* [https://vi.wikipedia.org/wiki/S%E1%BA%AFp_x%E1%BA%BFp_n%E1%BB%95i_b%E1%BB%8Dt](https://vi.wikipedia.org/wiki/S%E1%BA%AFp_x%E1%BA%BFp_n%E1%BB%95i_b%E1%BB%8Dt)
* [https://en.wikipedia.org/wiki/Bubble_sort](https://en.wikipedia.org/wiki/Bubble_sort)