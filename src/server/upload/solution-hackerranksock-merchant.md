# 1. Đề bài
Cho một mảng số nguyên n phần tử.Hãy đếm trong mảng có bao nhiêu cặp số giống nhau.(Mỗi số nguyên chỉ được bắt cặp duy nhất một lần).

Khoảng giá trị của n : từ 2 đến 10^6.

Sample Input:
```
9     
10 20 20 10 10 30 50 10 20
```

Sample Output:
```
3
```

 Miêu tả đề bằng hình ảnh:
![](https://images.viblo.asia/4c6be9ab-066e-4a16-a64f-afc5a99dc387.png)
             
# 2. Hướng giải.
Với việc phải nối các cặp số với nhau các số nào đã nối lại rồi không xét nữa. Như vậy ta phải có một mảng để lưu giữa trạng thái.

Duyệt từng phần tử trong mảng với các phần tử còn lại . Nếu thỏa điều kiện bằng nhau và trang thái của chúng chưa được bắt cặp thì 
tiến hành bắt cặp.Tiếp tục với số tiếp theo.
# 3.Code.
   ```
static int sockMerchant(int n, int[] ar) {
    if (n <= 0)
        return 0;
    boolean[] status = new boolean[n];
    int count = 0;
    for (int i = 0 ; i < n ; i++)
    {
        for (int j = i; j < n ; j++)
        {
            if (ar[i] == ar[j] && status[i] == false && status[j] == false && i != j)
            {
                status[i] = true;
                status[j] = true;
                count++;
                break;
            }
        }
    }
    return count;
}
```
# 4. Giải pháp tối ưu hơn.
## Giải pháp.
Hướng giải bài trên có độ phức tạp thuật toán là O(n^2) . Nếu ví dụ là mảng gồm 10^6 phần tử , thuật toán giải rất là chậm sẽ không vượt qua solution này.Cách giải mới bài toán như sao.Đầu tiên ta sẽ sort mảng lại , sau khi sort mảng đã được sắp xếp ta chỉ cần so sanh với số đứng trước nó để xem có phải cặp không.

Ở đây mình dùng thuật toán sort : QuickSort.

Độ phức tạp:

-BestCase: O(nlog(n)) 

-WorstCase: O(n^2).

Lần duyệt cuối có độ phức tạp: O(n).

Vậy tổng độ phức tạp:
                        
-BestCase: O(n).
                      
 -WorstCase: O(n^2).
 
 ## Code.
 ### QuickSort.
 ```
public class Sort {
public static void quickSort(int[] arr,int low, int high)
{
// check for empty or null array
if (arr.length == 0 || arr == null)
return;
if (low >= high)
return;
// find the middle
int middle = low + (high - low) / 2;
int pviot = arr[middle];
int i = low;
int j = high;

while(i <= j)
{
// check until all values on the left lower than pviot
while(arr[i] < pviot)
    i++;
// check until all value on the right higher than pviot
while (arr[j] > pviot)
    j--;
if (i <= j)
{
    swap(arr,i,j);
    i++;
    j--;
}
}

if (low < j)
quickSort(arr,low,j);
if (high > i)
quickSort(arr,i,high);
}
private static void swap(int[] arr,int x ,int y)
{
int temp = arr[x];
arr[x] = arr[y];
arr[y] = temp;
}
}
```
### Solution.
```
static int sockMerchant(int n, int[] ar) {
        if (n <= 0)
        {
            return 0;
        }
        Sort.quickSort(ar,0,n-1);

        int count = 0;

        for (int i = 0 ; i < n - 1;i++)
        {
            if (ar[i] == ar[i+1])
            {
                count++;
                i++;
            }
        }

        return count;
    }
```
Github cho bạn nào cần.

https://github.com/nguyenphuc22/solutionHackerRank.