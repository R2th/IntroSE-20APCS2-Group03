# I. Bài toán mở đầu

Bài toán chia kẹo Euler là một bài toán tổ hợp xuất hiện từ thời xa xưa, đây là một bài toán rất hay và có nhiều ứng dụng trong Toán học. Xuất phát từ một vấn đề rất đơn giản, nhà bác học Leohard Euler đã phát biểu nó thành một bài toán như sau:

*"Có $m$ chiếc kẹo giống nhau, cần chia chúng cho $n$ em bé. Hỏi có bao nhiêu cách chia kẹo như vậy?"*

Bài toán tưởng chừng như đơn giản, nhưng nó lại gây khó khăn cho không ít học sinh. Từ bài toán này, người ta đã phát triển ra cách giải cho vô số bài toán đếm khác nhau. Trong bài viết này, tôi sẽ giới thiệu tới các bạn phương pháp giải bài toán chia kẹo Euler và một số ứng dụng từ cơ bản tới nâng cao của nó. Tất nhiên, nội dung các bài toán sẽ liên quan nhiều tới lập trình, do đó tôi sẽ bỏ qua những bài toán quá khó (mà chỉ dành cho học sinh chuyên Toán).

## 1. Phương pháp giải bài toán cơ bản

Nếu gọi số kẹo mà mỗi em bé nhận được lần lượt là $x_1, x_2, \dots, x_n \ (0 \le x_i \le m; \forall i: 1 \le i \le n)$. Bài toán khi đó sẽ trở thành: *Đếm số nghiệm nguyên không âm của phương trình:*

$$x_1 + x_2 + \cdots + x_n = m$$

Sử dụng kĩ thuật song ánh, coi rằng giữa mỗi em bé có một số $0$ và số kẹo của em bé thứ $i$ nhận được sẽ biểu diễn bằng một dãy gồm $x_i$ số $1,$ thì bài toán trở thành đếm số cấu hình có dạng:

<center>

![](https://cdn.ucode.vn/uploads/2247/upload/bVpfwNUm.png)

*Với $m$ số $1$ và $n - 1$ số $0$*
</center>

Như vậy, thực tế ta đang đếm số cách đặt $n - 1$ số $0$ vào một dãy gồm $m + n - 1$ vị trí, còn lại sẽ là các số $1$. Theo quy tắc tổ hợp không lặp, số nghiệm của bài toán sẽ là: 

$$C^{n - 1}_{m + n - 1}$$

Tuy nhiên, khi lập trình các bạn sẽ cần lưu ý cả tới giới hạn dữ liệu của bài toán. Nếu như bài toán yêu cầu đưa ra kết quả là phần dư sau khi chia cho một giá trị nào đó thì cần sử dụng các phương pháp phù hợp như ***Nghịch đảo modulo, Thuật toán bình phương và nhân*** hay ***Phép nhân Ấn Độ*** tương ứng. Lập trình ở phần này không khó nên tôi sẽ không viết lại code nữa!

## 2. Nếu các em bé đều phải nhận được ít nhất 1 chiếc kẹo?

Bài toán có thể lắt léo hơn một chút, nếu như đề bài yêu cầu rằng khi chia kẹo, mỗi em bé đều phải được nhận ít nhất $1$ chiếc kẹo. Khi đó, bài toán sẽ trở thành: *Đếm số nghiệm nguyên dương của phương trình:*

$$x_1 + x_2 + \cdots + x_n = m$$

Đối với bài toán này, ta giải như sau: Đặt $y_i = x_i - 1; \forall i: 1 \le i \le n$. Khi đó ta có:

$$y_1 + y_2 + \cdots + y_n = x_1 + x_2 + \cdots + x_n - n = m - n \ (1)$$

Lúc này phương trình xảy ra hai trường hợp kết quả:

- Nếu $m < n$ thì phương trình vô nghiệm.
- Nếu $m \le n$ thì bài toán lại trở thành dạng giống với bài toán cơ bản, lúc này số nghiệm của phương trình chính là số bộ giá trị $(y_1, y_2, \dots, y_n)$ thỏa mãn phương trình $(1),$ đó là: 
    $$C^{n - 1}_{m - 1}$$

## 3. Phát triển bài toán tổng quát

Các bài toán có dạng như hai bài toán nói trên đều có thể phát biểu thành dạng tổng quát như sau: *Đếm số nghiệm nguyên của phương trình $x_1 + x_2 + \cdots + x_n = m;$ với $x_i \ge a_i \ (\forall i: 1 \le i \le n)$.*

Lời giải của bài toán này tương tự với bài toán số 2, ta gọi $y_i = x_i - a_i; \forall i: 1 \le i \le n$ và $s = \sum_{i = 1}^n a_i$. Phương trình đã cho sẽ trở thành:

$$y_1 + y_2 + \cdots + y_n = (x_1 - a_1) + (x_2 - a_2) + \cdots + (x_n - a_n) = m - s \ (2)$$

Giờ ta cần xét tới ba trường hợp kết quả:

- Nếu $m < s,$ thì phương trình đã cho sẽ vô nghiệm.
- Nếu $m = s,$ thì phương trình đã cho có duy nhất một nghiệm là $x_i = a_i; \forall i: 1 \le i \le n$.
- Nếu $m > s,$ thì ta cần đếm số bộ giá trị $(y_1, y_2, \dots, y_n)$ thỏa mãn phương trình $(2),$ đó là:
    $$C^{n - 1}_{m + n - s - 1}$$

Bây giờ chúng ta hãy cùng xét một vài bài toán ứng dụng của công thức chia kẹo Euler trong lập trình thi đấu, để hiểu rõ hơn về ứng dụng của công thức này trong các kì thi lập trình!

# II. Một số bài toán minh họa

## 1. Đếm đường đi

### Đề bài

Cho một lưới gồm các ô vuông. Các ô được đánh số từ $0$ đến $m$ theo chiều từ trái sang phải và từ $0$ đến $n$ theo chiều từ dưới lên trên. Giả sử ta đang ở ô $(0,0);$ ta chỉ có thể di chuyển trên cạnh các ô vuông theo chiều từ trái sang phải hoặc từ dưới lên trên.

***Yêu cầu:*** Hãy tính số đường đi khác nhau từ ô $(0,0)$ đến ô $(m,n)$ của lưới ô vuông?

***Input:***

- Một dòng duy nhất chứa hai số nguyên $m$ và $n$.

***Ràng buộc:***

- $1 \le m, n \le 5000$.
- $m + n \le 5000$.

***Output:***

- In ra số dư của kết quả của bài toán sau khi chia cho $10^9 + 7$.

***Sample Input:***

```
2 3
```

***Sample Output:***

```
10
```

### Ý tưởng

Nhận xét thấy, một đường đi thỏa mãn gồm $m + n$ bước đi (mỗi bước đi là một cạnh ô vuông). Tại mỗi bước đi chỉ được chọn một trong hai giá trị đi lên (ta đặt là $1$) hoặc đi sang phải (ta đặt là $0$). Số bước đi lên đúng bằng $n$ và số bước sang phải đúng bằng $m$. Bài toán lúc này dẫn đến việc tìm xem có bao nhiêu dãy nhị phân có độ dài $m + n$ trong đó có đúng $n$ thành phần có giá trị bằng $1$. 

Dựa trên bài toán chia kẹo Euler, kết quả cần tìm lúc này là $m + n \choose m$.

Ta có thể tính tổ hợp $n \choose k$ bằng quy hoạch động dựa trên tính chất sau của tổ hợp:

$${n \choose k} = {n - 1 \choose k - 1} + {n - 1 \choose k}$$

Độ phức tạp: $O(n^2)$. Các bạn cần kết hợp với việc tính toán modulo liên tục để tránh gây ra tràn số nếu như sử dụng ngôn ngữ C++.

### Cài đặt

```cpp=
#include <bits/stdc++.h>

using namespace std;

const int MOD = 1e9 + 7;
long long ncr[5005][5005], n, m;

void pre_compute() 
{
    int k;
    for (int i = 0; i < 5001; i++) 
    {
        ncr[i][0] = ncr[i][i] = 1;

        // Chỉ tính đến vị trí cột thứ i / 2 là đủ cho hàng i.
        k = i >> 1;
        for (int j = 1; j < k + 1; j++) 
            ncr[i][j] = ncr[i][i - j] = (ncr[i - 1][j] + ncr[i - 1][j - 1]) % MOD;
    }
}

int main() 
{
    int m, n;
    cin >> m >> n;

    pre_compute();

    cout << ncr[m + n][m];

    return 0;
}
```

## 2. Hợp nhất danh sách

### Đề bài

Hôm nay Tí vừa học xong về danh sách liên kết trên trường. Cậu ấy đã được học về cách hợp nhất hai danh sách liên kết. Khi ta hợp nhất hai danh sách liên kết, thứ tự của các phần tử của mỗi danh sách không thay đổi. Ví dụ, nếu ta hợp nhất $[1,2,3]$ và $[4,5,6]$, ta sẽ thu được danh sách mới là $[1,4,2,3,5,6]$, tuy nhiên $[1,4,3,2,5,6]$ không hợp lệ vì $3$ đứng sau $2$.

***Yêu cầu:*** Tí có hai danh sách liên kết gồm $n$ và $m$ phần tử, hãy giúp cậu ấy tính xem có bao nhiêu cách để hợp nhất cả hai danh sách. Dữ liệu đảm bảo rằng $n + m$ phần tử trong hai danh sách đều phân biệt.

***Input:***

- Dòng đầu tiên chứa số nguyên $t$ chỉ số lượng truy vấn.
- $t$ dòng tiếp theo, mỗi dòng chứa một truy vấn gồm hai số nguyên là $n$ và $m$.

***Ràng buộc:***

- $1 \le t \le 10$.
- $1 \le n, m \le 100$.

***Output:***

- In ra đáp án của bài toán sau khi chia cho $10^9 + 7$ và lấy số dư làm kết quả.

***Sample Input:***

```
1
2 2
```

***Sample Output:***

```
6
```

***Giải thích:***

Giả sử hai danh sách là $[1,2]$ và $[3,4]$, các cách khác nhau để hợp nhất các danh sách này là:

- $[1,2,3,4]$.
- $[1,3,2,4]$.
- $[3,4,1,2]$.
- $[3,1,4,2]$.
- $[1,3,4,2]$.
- $[3,1,2,4]$.

### Ý tưởng

Bạn phải hợp nhất hai danh sách gồm $m$ và $n$ phần tử lại với nhau. Điều này tương đương với việc sắp xếp $m$ vật thuộc cùng một loại với $n$ vật cùng thuộc loại khác trên cùng một hàng. Đây chính là bài toán chia kẹo Euler! 

Tổng số cách để hợp nhất hai danh sách sẽ là $n + m \choose n$. Lí do là vì ta cần chọn ra $n$ vị trí trong $m + n$ vị trí để đặt $n$ vật thuộc loại thứ $2$ vào. Kết quả không có gì thay đổi nếu như bạn chọn nó bằng $n + m \choose m$.

Ta có thể tính tổ hợp $n \choose k$ bằng quy hoạch động dựa trên tính chất sau (chính là tam giác Pascal, nếu các bạn chưa nhớ về công thức này thì hãy tìm đọc lại trên internet):

$${n \choose k} = {n - 1 \choose k - 1} + {n - 1 \choose k}$$

Độ phức tạp: $O(n^2)$. Các bạn nên khởi tạo trước mảng hai chiều lưu tam giác Pascal rồi đưa ra kết quả của mỗi test case trong $O(1)$.

### Cài đặt

```cpp=
#include <bits/stdc++.h>
#define int long long 

using namespace std;

const int MOD = 1e9 + 7;

void pre_compute(vector < vector < int > > &ncr, int max_size)
{
    ncr = vector < vector < int > >(max_size + 1, vector < int >(max_size + 1));

    for (int i = 0; i <= max_size; ++i)
    {
        ncr[i][0] = ncr[i][i] = 1;

        for (int j = 1; j < i; ++j)
            ncr[i][j] = (ncr[i - 1][j] + ncr[i - 1][j - 1]) % MOD;
    }
}

main()
{
    vector < vector < int > > ncr;
    pre_compute(ncr, 200);

    int t;
    cin >> t;

    while (t--)
    {
        int n, m;
        cin >> n >> m;

        cout << c[n + m][m] << endl;
    }

    return 0;
}
```

# III. Tài liệu tham khảo

- https://www.dropbox.com/s/q69pd0ctlzhjaim/B%C3%A0i%20to%C3%A1n%20chia%20k%E1%BA%B9o%20c%E1%BB%A7a%20Euler.pdf?dl=0
- https://vted.vn/tin-tuc/bai-toan-chia-keo-euler-va-ung-dung-4529.html
- https://math.stackexchange.com/questions/1586500/share-m-candy-bars-for-n-people