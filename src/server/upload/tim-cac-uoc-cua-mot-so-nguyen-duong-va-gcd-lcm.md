# I. Tìm các ước của một số nguyên dương

## 1. Giải thuật ngây thơ

Để tìm tất cả các ước nguyên dương của một số nguyên dương $N,$ phương pháp dễ nhất là sử dụng một vòng lặp, duyệt qua toàn bộ các giá trị từ $1$ tới $N,$ kiểm tra nếu $N$ chia hết cho giá trị đó thì ta thu được một ước nguyên dương của $N$.

***Cài đặt:*** Dưới đây là cài đặt đếm số lượng ước nguyên dương của một số nguyên dương $N$:

```cpp
int count_divisors(int N)
{
    int cnt = 0;
    for (int i = 1; i <= N; ++i)
        if (N % i == 0)
            cnt++;

    return cnt;
}
```

Dễ dàng nhận thấy giải thuật có độ phức tạp $O(N),$ nếu như $N$ có giá trị khoảng $10^8$ trở lên sẽ không thể đảm bảo tốc độ thực thi trong khoảng $1$s. Ta cần một giải thuật tốt hơn!

## 2. Cải tiến giải thuật

Ta có một nhận xét như sau: Giả sử viết được $N$ dưới dạng $N = i \times j$ với $i \le j,$ thì giá trị lớn nhất của $i$ là $\sqrt{N}$. Khi đó, giá trị $j$ chắc chắn phải bằng $\frac{N}{i},$ và hiển nhiên cả $i$ lẫn $j$ đều là ước của $N$. Như vậy, chỉ cần đếm số lượng giá trị $i$ là có thể biết được $N$ có bao nhiêu ước nguyên dương:

```cpp
int count_divisors(int N)
{
    int cnt = 0;
    for (int i = 1; i * i<= N; ++i)
        if (N % i == 0)
        {
            ++cnt;

            int j = N / i;
            if (j != i)  // Cần xét trường hợp đặc biệt nếu N là số chính phương thì có thể i = j
		++cnt;
        }

    return cnt;
}
```

Lúc này giải thuật có độ phức tạp giảm xuống còn $O(\sqrt{N}),$ và có thể sử dụng thoải mái cho các số $N \le 10^{15}!$

# II. Ước chung lớn nhất và Bội chung nhỏ nhất

## 1. Giới thiệu

Ước chung lớn nhất (Greatest Common Divisor – viết tắt là $\text{GCD}$) của hai hay nhiều số là số nguyên dương lớn nhất mà là ước chung của tất cả các số đó.
Bội chung nhỏ nhất (Lowest Common Multiple – viết tắt là $\text{LCM}$) của hai hay nhiều số là số nguyên dương nhỏ nhất mà là bội chung của tất cả các số đó.
Trong lập trình thi đấu, $\text{GCD - LCM}$ là chủ đề rất được yêu thích trong mảng số học và đòi hỏi người lập trình có cái nhìn sâu sắc, kiến thức toán học tốt để giải quyết các vấn đề số học. Có hai cách để giải quyết bài toán liên quan tới $\text{GCD - LCM}$, một là sử dụng "duyệt trâu" (Giải thuật “ngây thơ”), hai là sử dụng giải thuật Euclid. Dưới đây sẽ trình bày các giải thuật tìm $\text{GCD - LCM}$ với $2$ số nguyên $A$ và $B$. Các cài đặt sẽ sử dụng ngôn ngữ C++ theo phong cách lập trình của người viết, bạn đọc hoàn toàn có thể chỉnh sửa theo ý mình để thu được những cài đặt đẹp mắt hơn. 

## 2. Giải thuật ngây thơ

Tiến hành duyệt tất cả các số từ $\text{min}⁡(A,B)$ về $1$ và kiểm tra xem số đó có phải là ước của $A$ và $B$ hay không, nếu đúng như vậy thì số đó chính là $\text{GCD}(A,B)$. Đối với Bội chung nhỏ nhất, chỉ cần lấy tích của $A$ và $B$ chia cho ước chung lớn nhất của chúng. Độ phức tạp giải thuật là $O(\text{min}(A,B))$.

```cpp
long long find_gcd(long long A, long long B)
{
    for (long long i = min(A, B); i > 0; --i)
        if (A % i == 0 && B % i == 0)
            return i;
}

long long find_lcm(long long A, long long B)
{
    return (A / gcd(A, B)) * B;
}
```

## 3. Giải thuật Euclid

### 3.1. Giải thuật cơ sở

Từ bậc trung học cơ sở, các bạn có lẽ đã biết đến giải thuật tìm ước chung lớn nhất của hai số $A$ và $B$ sử dụng phép trừ. Ý tưởng giải thuật như sau:
- Bước $1$: Giả sử $A > B$. Đặt $A = A - B$ cho tới khi $A < B$ thì chuyển qua bước $2$.
- Bước $2$: Khi $A < B,$ đổi chỗ $A$ và $B$ rồi lặp lại bước $1$ cho tới khi $A = B$.
- Bước $3$: Khi $A = B,$ đưa ra kết luận ước chung lớn nhất của hai số ban đầu chính là $A$.
- 
***Cài đặt:***

```cpp
int find_gcd(int A, int B)
{
    // Trường hợp đặc biệt: A = 0 thì gcd(A, B) = B, ngược lại B = 0 thì gcd(A, B) = A.
    if (A == 0)
        return B;
    else if (B == 0)
        return A;

    while (A != B)
    {
        if (A > B)
            A -= B;
    	else 
	    B -= A;
    }

    return A;
}
```

### 3.2. Giải thuât Euclid

Giải thuật cơ sở trên có một nhược điểm, đó là nếu $A$ và $B$ lớn thì việc thực hiện phép trừ sẽ diễn ra rất lâu, dẫn đến không đáp ứng độ phức tạp thuật toán. Để cải tiến nó, ta có thể áp dụng giải thuật Euclid. Giải thuật dựa trên một tính chất của ước chung lớn nhất như sau: Nếu $A = B.q + r$ thì:
$$\text{GCD}(A,B)=\text{GCD}(B,A \ \% \ B)$$ 

Dựa trên ý tưởng này, chỉ cần tiến hành đệ quy tới khi $A \ \% \ B=0$, ước chung lớn nhất sẽ chính bằng $A$. Độ phức tạp thuật toán là $O(\log(\text{max}⁡(A,B)))$. 

```cpp
long long gcd_euclid(long long A, long long B)
{
    if (B == 0)
        return A;
    else 
        return gcd_euclid(B, A % B);
}
```

Ngoài ra, trong thư viện STL của C++ cung cấp một hàm tìm ước chung lớn nhất của hai số nguyên là `__gcd(a, b)` với độ phức tạp giống như giải thuật Euclid. Để sử dụng nó, bạn cần khai báo thư viện `<algorithm>`. Lấy ví dụ:
    
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    int a = 5, b = 10;
    cout << "Ước chung lớn nhất của 5 và 10 là: " << __gcd(a, b);

    return 0;
}
```
   
Kết quả đoạn chương trình trên sẽ là:
    
```
Ước chung lớn nhất của 5 và 10 là: 5
```

## 4. Tìm ước chung lớn nhất và bội chung nhỏ nhất của nhiều số

Để tìm ước chung lớn nhất của dãy số gồm $N$ số $(N \ge 3)$, thực hiện như sau:
- Bước $1$: Tìm ước chung lớn nhất của hai số đầu tiên
$$T = \text{GCD}(a_1, a_2)$$

- Bước $2$: Tiếp tục tìm $\text{GCD}$ của $a_3$ với $T$ rồi gán luôn vào $T,$ sau đó tìm $\text{GCD}$ của $a_4$ và $T$ rồi gán vào $T,...$tiếp tục như vậy cho tới $a_N$. Ta có công thức tổng quát:
$$\text{GCD}(a_1, a_2,...,a_N) = \text{GCD}(\text{GCD}(\text{GCD}(\text{GCD}(a_1, a_2), a_3), a_4,..),a_N)$$

Đối với bội chung nhỏ nhất của $N$ số, cách tìm hoàn toàn tương tự với ước chung lớn nhất. Cài đặt dưới đây sẽ tìm ước chung lớn nhất và bội chung nhỏ nhất của một dãy số $a_1, a_2,..., a_N$:

```cpp
int find_gcd(int A, int B) // Tìm ước chung lớn nhất của hai số.
{
    if (B == 0)
        return A;
    else 
        return find_gcd(B, A % B);   
}

int find_lcm(int A, int B) // Tìm bội chung nhỏ nhất của hai số.
{
    return A / find_gcd(A, B) * B;
}

void gcd_lcm_seq(int N, int a[])
{
    int gcd_all = find_gcd(a[1], a[2]), lcm_all = find_lcm(a[1], a[2]);
    for (int i = 3; i <= N; ++i)
    {
    gcd_all = find_gcd(gcd_all, a[i]);
    lcm_all = find_lcm(lcm_all, a[i]);
    }

   cout << "Ước chung lớn nhất của cả dãy là: " << gcd_all << endl;
   cout << "Bội chung nhỏ nhất của cả dãy là: " << lcm_all;
}
```

Chạy chương trình trên với dãy $a = \{12, 8, 10, 4, 6\},$ ta thu được kết quả là:

```
Ước chung lớn nhất của cả dãy là: 2
Bội chung nhỏ nhất của cả dãy là: 360
```

## 5. Giải thuật Euclid mở rộng

$\text{GCD}(A,B)$ có một tính chất là luôn có thể biểu diễn dưới dạng phương trình: 
$$Ax+By=\text{GCD}(A,B) \ (1)$$

Giải thuật Euclid mở rộng sử dụng để tìm một cặp số nguyên $(x,y)$ thỏa mãn phương trình trên, và còn dùng để tính nghịch đảo modulo (mình sẽ nói tới ở phần sau). Cặp số $(x,y)$ có thể có giá trị âm, hoặc bằng $0$ đều được. Dưới đây mình sẽ trình bày giải thuật tìm $\text{GCD}(A,B)$ và một cặp $(x,y)$ thỏa mãn phương trình.

```cpp
long long d, x, y; // UCLN và cặp nghiệm (x, y).

void extended_euclid(long long A, long long B)
{
    if (B == 0)
    {
        x = 1;
        y = 0;
        d = A;
    }
    else
    {
        extended_euclid(B, A % B);
        long long temp = x;
        x = y;
        y = temp – (A / B) * y;
    }
}

int main()
{
    cin >> A >> B;
    extended_euclid(A, B);
    cout << d << ' ' << x << ‘  ‘ << y;
    return 0;
}
```

Cơ chế của giải thuật như sau: Ban đầu chương trình thực thi giống giải thuật Euclid, tới khi $B=0,$ khi đó ta sẽ có $A$ là ước chung lớn nhất của $A$ và $B,$ sau đó đặt $x=1,y=0$. Bởi vì $B=0$ và hiện tại $\text{GCD}(A,B)=A$ nên phương trình $(1)$ trở thành: 
$$A.1+0.0=A$$

Sau đó chương trình gọi lại các lệnh dưới lời gọi đệ quy để tìm ra $x$ và $y$. Chứng minh: 
- Sau khi gọi đệ quy, phương trình ở bước tiếp theo của giải thuật là: 
$$B.x+(A \% B).y=\text{GCD}(A,B) \ (2)$$

- Thay $A \ \% \ B=A-\left \lfloor{\frac{A}{B}} \right \rfloor .B$, phương trình $(2)$ trở thành: 
$$B.x+(A-\left \lfloor{\frac{A}{B}} \right \rfloor.B).y=\text{GCD}(A,B)$$ 
$$\Leftrightarrow A.y+B.(x-\left \lfloor{\frac{A}{B}} \right \rfloor.y)=\text{GCD}(A,B)$$ 

- Từ đây được công thức đệ quy: 
$$x' = y; y' = x - \left \lfloor{\frac{A}{B}} \right \rfloor.y$$

- Như vậy từ bước cơ bản $x=1,y=0;$ chương trình sẽ tiếp tục tính ngược lên để ra được $x,y$ thỏa mãn phương trình ban đầu. Độ phức tạp giải thuật là $O(\log(\text{max}⁡(A,B)))$.

Ngoài ra, giải thuật Euclid mở rộng còn có thể sử dụng để giải ***phương trình Diophantine tuyến tính,*** sẽ được đề cập tới ở một bài viết khác.

# Tài liệu tham khảo

- https://www.geeksforgeeks.org/find-divisors-natural-number-set-1/
- https://www.geeksforgeeks.org/find-all-divisors-of-a-natural-number-set-2/
- [https://vnoi.info/wiki/translate/he/So-hoc-Phan-1-Modulo-gcd.md](https://)