# I. Giới thiệu chung

Trong Toán học, hệ cơ số (hay hệ đếm) là một hệ thống các kí hiệu toán học và quy tắc sử dụng tập kí hiệu đó để biểu diễn số đếm. Các kí hiệu toán học có thể là chữ số hoặc các kí tự chữ cái. Cần phân biệt giữa ***Hệ cơ số*** và ***Cơ số*** (số lượng kí hiệu sử dụng trong một hệ cơ số).

Có rất nhiều hệ cơ số khác nhau, mỗi hệ cơ số có những quy tắc biểu diễn số khác nhau. Những dãy kí hiệu giống nhau có thể sẽ ứng với những số khác nhau trong các hệ đếm khác nhau. Ví dụ trong hệ thập phân, $11$ thể hiện số "mười một", tuy nhiên trong hệ nhị phân, nó lại thể hiện số "ba",... Số đếm mà dãy kí hiệu thể hiện được gọi là giá trị của nó. 

Có hai loại hệ cơ số là hệ cơ số phụ thuộc vào vị trí và hệ cơ số không phụ thuộc vào vị trí. Chẳng hạn, hệ đếm La Mã là một hệ cơ số không phụ thuộc vào vị trí. Hệ đếm này gồm các kí hiệu chữ cái: $I, V, X, L, C, D, M;$ mỗi kí hiệu có giá trị cụ thể:

$$I=1, V=5, X=10, L=50, C=100, D=500, M=1000$$ 

Trong hệ đếm này, giá trị của các kí hiệu không phụ thuộc vào vị trí của nó. Ví dụ, trong hai biểu diễn $IX \ (9)$ và $XI \ (11)$ thì $X$ đều có giá trị là $10$.

Các hệ đếm thường dùng là các hệ đếm phụ thuộc vị trí. Mọi số nguyên $base$ bất kỳ có giá trị lớn hơn $1$ đều có thể được chọn làm cơ số cho một hệ đếm. Trong các hệ đếm loại này, số lượng kí hiệu sử dụng sẽ chính bằng cơ số của hệ đếm đó, và giá trị tương ứng của các kí hiệu là: $0, 1, 2,..., base - 1$. Để thể hiện một biểu diễn $X$ là biểu diễn của số ở hệ cơ số $base$, ta kí hiệu là $X_{base}$.

# II. Biểu diễn số trong các hệ đếm

## 1. Giá trị của một số trong hệ cơ số bất kỳ

Trong một hệ cơ số $b,$ giả sử số $N$ có biểu diễn:

$$d_nd_{n-1}d_{n-2}...d_0,d_{-1}d_{-2}...d_{-m}$$ 

Trong đó có $n + 1$ chữ số bên trái dấu phẩy, $m$ chữ số bên phải dấu phẩy thể hiện cho phần nguyên và phần phân của $N,$ và $0 \le d_i < b$. Khi đó giá trị của số $N$ được tính theo công thức:

$$N=d_nb^n+d_{n-1}b^{n-1}+...+ d_0b^0+d_{-1}b^{-1}+d_{-2}b^{-2}+...+ d_{-m}b^{-m}$$
    
Giá trị của một số trong hệ cơ số $b$ cũng chính là biểu diễn tương ứng của nó ở hệ cơ số $10$.

### Cài đặt 

Chương trình tính giá trị một số thực $N$ trong hệ cơ số $b$. Ta có thể làm cách đơn giản hơn như sau: Coi như số đó không có phần phân, tính giá trị của nó trong hệ cơ số $b$ rồi chia cho $10^x,$ với $x$ là số chữ số phần phân.

***Ngôn ngữ C++:***

```cpp
void enter(string &N, int &b)
{
    getline(cin, N); // Nhập N ở dạng xâu.
    cin >> b;
}

// Tính giá trị của biểu diễn N trong hệ cơ số b, chính là biểu diễn thập phân của nó.
double get_value(string &N, int b) 
{
    int pos = N.find('.'); // Tìm vị trí dấu '.' của N.
    long long mul = (long long) pow(10, N.size() - pos - 1);

    // Tính giá trị từng phần, lưu ý ép kiểu số thực.
    double value = 0, power = 1;
    for (int i = N.size() - 1; i >= 0; --i)
    {
        value += (double) (N[i] - '0') * power;
        power = power * (double) b;
    }

    return value / mul;
}

main()
{
    string N;
    int b;

    enter(N, b);
    solution(N, b);
}
```

***Ngôn ngữ Python:***

```python
def enter(N, b):
    N = input()
    b = int(input())


def get_value(N, b):
    pos = N.find(".")
    mul = b ** (len(s) - pos - 1) if pos >= 0 else 1

    res, power = 0, 1
    for d in N[::-1]:
        if d != ".":
            res += power * int(d)
            power *= b

    return res / mul


if __name__ == '__main__':
    N = ""
    b = 0

    enter(N, b)
    get_value(N, b)
```

## 2. Các hệ cơ số thông dụng trong Tin học

Trong Tin học, ngoài hệ cơ số $10$, người ta còn sử dụng hai loại hệ đếm sau:
- Hệ cơ số $2$ (Hệ nhị phân): Chỉ sử dụng hai kí hiệu $0$ và $1$. Lấy ví dụ, $1011_2=1\times 2^0 + 1\times 2^1 + 0\times 2^2 + 1\times 2^3=11_{10}$.
- Hệ cơ số $16$ (Hệ thập lục phân hay hệ Hexa): Sử dụng các chữ số từ $0$ tới $9$ và $6$ chữ cái $A, B, C, D, E, F;$ trong đó $A, B, C, D, E, F$ có giá trị lần lượt là $10, 11, 12, 13, 14, 15$. Lấy ví dụ, $16A = 10\times 16^0+6\times 16^1+1\times 16^2=362_{10}$.

## 3. Biểu diễn số nguyên và số thực

### 3.1. Biểu diễn số nguyên

Trong Tin học, các số nguyên có thể được biểu diễn dưới dạng có dấu hoặc không dấu. Để biểu diễn số nguyên, ta có thể chọn kích thước số nguyên là $1$ byte, $2$ byte, $4$ byte$,...,2^N$ byte, mỗi cách chọn sẽ tương ứng với một khoảng giá trị có thể biểu diễn. 

Đối với số nguyên không âm, kích thước $2^N$ byte sẽ lưu trữ được các số trong phạm vi từ $0$ tới $(2^{8 \times 2^N} - 1),$ bởi $1$ byte gồm $8$ bit và toàn bộ các bit đều được sử dụng để biểu diễn giá trị số. 

Đối với số nguyên có dấu, bit bên phải nhất của số nguyên sẽ được dùng để thể hiện dấu của số đó, quy ước $1$ là dấu âm, $0$ là dấu dương, các bit còn lại sẽ dùng để biểu diễn giá trị số. Theo đó, số nguyên kích thước $2^N$ sẽ biểu diễn được các giá trị trong phạm vi $(-2^{8 \times 2^N - 1} + 1)$ đến $(2^{8 \times 2^N - 1} - 1)$. Vấn đề này sẽ liên quan tới việc lựa chọn ***kiểu dữ liệu*** và kiểm soát bộ nhớ chương trình khi lập trình.

![](https://cdn.ucode.vn/uploads/2247/upload/RqzczAeF.png)

### 3.2. Biểu diễn số thực

Khác với cách viết trong Toán học, khi mà ta dùng dấu `,` để ngăn cách giữa phần nguyên và phần phân; trong Tin học ta thay dấu `,` bằng dấu `.`, và các nhóm ba chữ số cạnh nhau sẽ viết liền. Ví dụ, trong toán ta viết $123 \ 456,789;$ thì trong Tin học sẽ viết là $123456.789$.

Một cách biểu diễn mà máy tính sử dụng để lưu trữ số thực là dạng ***khoa học***, khi mọi số thực sẽ được biểu diễn ở dạng $\pm M \times 10^{\pm K}$. Trong đó, $0,1 \le M < 1, M$ được gọi là ***phần định trị***, và $K$ là một số nguyên không âm được gọi là ***phần bậc***. Ví dụ, số $123 \ 456,789$ sẽ được biểu diễn dưới dạng ***khoa học*** là $0.123456789 \times 10^6$.

## 4. Phân tách các chữ số của một số nguyên

Việc đếm số chữ số của một số nguyên dương $N$ không có gì khó khăn, bởi vì các số nguyên đều có thể coi như biểu diễn dưới dạng thập phân. Vì thế, ta sẽ chia $N$ cho $10$ tới khi thương bằng $0,$ số lần chia sẽ tương ứng với số chữ số của $N$.

### Cài đặt 1: Đếm số chữ số của số nguyên dương $N$ theo cách thủ công

***Ngôn ngữ C++:***

```cpp=
int cnt_digits(int n)
{
    // Xét riêng trường hợp n = 0.
    if (n == 0)
        return 1;
		
    int digits = 0;
    while (n != 0)
    {
        ++digits;
        n /= 10;
    }

    return digits;
}
```

***Ngôn ngữ Python:***

```python
def cnt_digits(N):
    digits = 0
    while N != 0:
        digits += 1
        N /= 10

    return digits
```

Tuy nhiên, hãy giả sử số nguyên $N$ có $n$ chữ số được biểu diễn ở hệ thập phân dưới dạng:

$$N=d_nd_{n-1}d_{n-2}...d_1$$ 

Phân tích cấu tạo số của $N,$ ta có:

$N=d_n \times 10^{n - 1} + d_{n-1}\times10^{n-2}+...+d_1\times 10^0$

$\Rightarrow \log(d_n\times 10^{n-1}) \le \log(N)=\log(d_n \times 10^{n - 1} + d_{n-1}\times10^{n-2}+...+d_1\times 10^0) \le \log(10^n)$

$\Leftrightarrow (n-1)\le \log(N) \le n$.

$\Leftrightarrow \log(N) \le n \le \log(N)+1$.

Giữa hai số $\log(N)$ và $\log(N)+1$ chỉ có duy nhất một số là $\left\lfloor{\log(N)}\right\rfloor + 1$. Vậy $n=\left\lfloor{\log(N)}\right\rfloor + 1$.

Khi đó, các bạn có thể sử dụng trực tiếp hàm `log10()` của thư viện `<cmath>` trong C++, hàm `log()` trong thư viện `math` của Python để đếm số chữ số của $N$.

### Cài đặt 2: Đếm số chữ số của số nguyên dương $N$ bằng hàm `log`

***Ngôn ngữ C++:***

```cpp
#include <cmath>

using namespace std;

int cnt_digits(int N)
{
    return (int) log10(N) + 1;
}
```

***Ngôn ngữ Python:***

```python
import math


def cnt_digits(N):
    return int(log(N)) + 1
```

Dựa vào biểu diễn trên của số nguyên $N,$ ta nhận thấy, chữ số hàng đơn vị của N chính bằng $N \text{ mod } 10,$ chữ số hàng chục bằng $N \text{ mod }100, \dots,$ chữ số ở hàng thứ $K$ tính từ phải qua trái chính bằng $N \text{ mod } 10^K$. Đối với bất kỳ hệ cơ số nào ta cũng có thể coi như đang ở hệ cơ số $10$ để tìm các chữ số từ phải qua trái theo cách này.

### Cài đặt 3: Xác định chữ số thứ $K$ từ bên phải sang của số nguyên dương $N$

***Ngôn ngữ C++:***

```cpp
// Tìm chữ số thứ K từ bên phải sang của số nguyên dương N.
int find_k_digits(int N, int K)
{
    int power = (int) pow(10, K);

    return N % power;
}
```

***Ngôn ngữ Python:***

```python
# Tìm chữ số thứ K từ bên phải sang của số nguyên dương N.
def find_k_digits(N, K):
    power = 10 ** K

    return N % power
```

# III. Chuyển đổi giữa các hệ cơ số

## 1. Chuyển đổi từ hệ cơ số $10$ sang các hệ cơ số khác

Xét số thực $N$ ở hệ cơ số $10$. Để tìm biểu diễn của $N$ trong hệ cơ số $b$, ta sẽ lần lượt chuyển đổi phần nguyên và phần phân, sau đó ghép chúng lại với nhau.

### 1.1. Chuyển đổi phần nguyên

Xét phần nguyên của $N$ là $K$. Giả sử trong hệ đếm $b, K$ có giá trị là:

$$K=d_nb^n + d_{n-1}b^{n-1} + \cdots + d_1b + d_0$$

Do $0 \le d_0 < b$ nên khi chia $K$ cho $b$ thì phần dư của phép chia là $d_0,$ còn thương là: 

$$K_1=d_nb^n + d_{n-1}b^{n-1} + \cdots +d_1$$

Tương tự, $d_1$ chính là phần dư của phép chia $K_1$ cho $b,$ và sẽ thu được $K_2$ là thương của phép chia đó. Lặp lại quá trình chia như trên tới khi thu được thương bằng $0,$ khi đó biểu diễn của $K$ ở hệ cơ số $b$ là $d_n...d_0$. Nói cách khác, ta lấy $K$ chia cho $b,$ thu nhận thương và số dư ở mỗi lần chia cho tới khi thương bằng $0,$ khi đó viết các số dư theo thứ tự ngược từ dưới lên trên thì sẽ thu được biểu diễn của $K$ ở hệ cơ số $b$.

Ví dụ, với $K=4_{10}$ và $b=2,$ quá trình chuyển đổi sẽ diễn ra như sau:

- Chia $4$ cho $2$, thu được $K_1=2, d_0 = 0$.
- Chia $2$ cho $2$, thu được $K_2=1, d_1=0$.
- Chia $1$ cho $2$, thu được $K_3=0, d_2=1$.
- Tới đây quá trình dừng lại, thu được kết quả $4_{10}=100_2$.

#### Cài đặt

***Ngôn ngữ C++:***

```cpp
// Chuyển phần nguyên K của số N sang hệ đếm b, lưu vào chuỗi res.
string change_integer_path(int K, int b) 
{
    string res;
    while (K != 0)
    {
        res = (char) (K % b + 48) + res;
        K /= b;
    }

    return res;
}
```

***Ngôn ngữ Python:***

```python
# Chuyển phần nguyên K của số N sang hệ đếm b, lưu vào chuỗi res. 
def change_integer_path(K, b):
    res = ""
    while K != 0:
        res = str(K % b) + res
        K /= b

    return res
```

### 1.2. Chuyển đổi phần phân

Xét phần phân của số thực $N$ là $K'$. Giả sử trong hệ đếm $b, K'$ có giá trị là:

$$K'=d_{-1}b^{-1}+d_{-2}b^{-2} + \cdots + d_{-m}b^{-m} \ (1)$$  

Nhân cả $2$ vế của $(1)$ với $b,$ ta có:

$$K'_1=d_{-1}+d_{-2}b^{-1}+\cdots+d_{-m}b^{-(m-1)}$$

Ta thấy, $d_{-1}$ chính là phần nguyên của kết quả phép nhân $K'$ với $b$, còn phần phân của kết quả là:

$$K'_2=d_{-2}b^{-1}+\cdots+d_{-m}b^{-(m-1)} \ (2)$$

Tiếp tục lặp lại phép nhân như trên với $(2),$ ta sẽ thu được $d_{-2}$ là phần nguyên. Làm liên tục theo cách này, cuối cùng thu được dãy $d_{-1}d_{-2}d_{-3}...,$ trong đó $0 \le d_i < b$. Nói cách khác, lấy phần phân $K'$ nhân liên tục với $b,$ ở mỗi bước thu nhận chữ số ở phần nguyên của kết quả và lặp lại quá trình nhân với phần phân của kết quả cho tới khi thu được số lượng chữ số như ý muốn.

Ví dụ, với $K'=0.123_{10}, b=2$ và cần lấy tới $5$ chữ số phần phân ở kết quả, ta làm như sau:

- $0.123 \times 2 = 0.246 \rightarrow d_{-1}=0$.
- $0.246 \times 2 = 0.492 \rightarrow d_{-2}=0$.
- $0.492 \times 2 = 0.984 \rightarrow d_{-3}=0$.
- $0.984 \times 2 = 1.968 \rightarrow d_{-4}=1$.
- $0.968 \times 2 = 1.936 \rightarrow d_{-5}=1$.
$\cdots$

Tới đây thu được kết quả $0.123_{10}=0.00011..._2$

#### Cài đặt

***Ngôn ngữ C++:***

```cpp
// Chuyển phần phân K sang hệ đếm b, lấy cnt_digits chữ số phần phân.
string change_double_path(double K, int b, int cnt_digits)
{
    string ans;
    while (ans.size() < cnt_digits)
    {
        double next_K = K * (double) b;
        int digit = (int) next_K;

        ans = ans + (char) (digit + 48);
        K = next_K - (int) next_K;
    }

    return ans;
}
```

***Ngôn ngữ Python:***

```python
# Chuyển phần phân K sang hệ đếm b, lấy cnt_digits chữ số phần phân.
def change_double_path(K, b, cnt_digits):
    res = []
    while len(res) < cnt_digits:
        next_K = K * float(b)
        digit = int(next_K)

        res.append(digit)
        K = next_K - int(next_K)

    return res 
```

## 2. Chuyển đổi số từ hệ cơ số $x$ sang hệ cơ số $y$

Để chuyển một số $N$ từ hệ cơ số $x$ sang hệ cơ số $y,$ ta làm theo các bước sau:

- Bước $1$: Tính giá trị của số $N$ trong hệ cơ số $x,$ nói cách khác là chuyển $N_x$ sang hệ cơ số $10$.
- Bước $2$: Chuyển kết quả vừa tìm được sang hệ cơ số $y$ theo phương pháp chuyển một số ở hệ $10$ sang hệ $y$ ở phần $1$.

### Cài đặt

Tái sử dụng lại một số hàm đã xây dựng sẵn ở trên: `get_value(), change_integer_path(), change_double_path`, ta sẽ chuyển đổi được số thực $N$ từ hệ cơ số $x$ sang hệ cơ số $y$.

***Ngôn ngữ C++:***

```cpp
// Chuyển số thực N từ hệ đếm x sang hệ đếm y, lấy d chữ số sau dấu phẩy.
string change_x_to_y(double N, int x, int y, int d)
{
    string NN = to_string(N);
    double value_x = get_value(NN, x);

    int integer_path = (int) value_x;
    double double_path = value_x - integer_path;

    string res = change_integer_path(integer_path, y) + '.' 
	         + change_double_path(double_path, y, d);
			 
    return res;
}
```

***Ngôn ngữ Python:***

```python
def change_x_to_y(N, x, y, d):
    NN = str(N)
    value_x = get_value(NN, x)
    
    integer_path = int(value_x)
    double_path = value_x - integer_path
	
    res = change_integer_path(integer_path, y) + '.'
	  + change_double_path(double_path, y, d)
	  
    return res
```

## 3. Chuyển đổi giữa hệ cơ số $2$ (hệ nhị phân) và hệ cơ số $16$ (hệ Hexa)

Do $16$ là lũy thừa của $2$ $(16=2^4)$, nên việc chuyển đổi giữa hệ nhị phân và hệ hexa có thể được thực hiện dễ dàng theo quy tắc sau:
- Bước $1$: Tính từ vị trí phân cách phần nguyên và phần phân, ta gộp các chữ số thành từng nhóm $4$ chữ số về hai phía trái phải, nếu thiếu chữ số sẽ thay bằng các chữ số $0$.
- Bước $2$:Tính giá trị của từng nhóm chữ số, sau đó thay kết quả bằng một kí hiệu tương ứng ở hệ Hexa. Ví dụ $2$ tương ứng với $2$, $10$ tương ứng với $A$,... 
- Bước $3$: Đặt các kí hiệu sau khi đã chuyển đổi vào đúng thứ tự của từng nhóm, ta thu được kết quả chuyển đổi.

### Cài đặt 1: Chuyển đổi từ hệ nhị phân sang hệ Hexa

```cpp
#include <bits/stdc++.h>

using namespace std;

const char hexa[16] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                       'A', 'B', 'C', 'D', 'E', 'F'};

string binary_to_hexa(double N)
{
    string NN = to_string(N);
    int pos = NN.find('.');
    string left_path = NN.substr(0, pos), right_path = NN.substr(pos + 1, NN.size() - pos);

    // Bổ sung đủ chữ số 0 để tạo thành các nhóm 4.
    while (left_path.size() % 4 != 0)
        left_path = '0' + left_path;
    while (right_path.size() % 4 != 0)
        right_path = right_path + '0';

    string ans_left, ans_right;
    for (int i = 0; i < left_path.size() - 3; i += 4)
    {
        // Gộp cụm 4 kí tự liên tiếp.
        string group = left_path.substr(i, 4);

        // Tính giá trị cụm 4 kí tự.
        int power = 1, value = 0;
        for (int j = 3; j >= 0; --j)
        {
            value += (group[j] - '0') * power;
            power *= 2;
        }

        // Lấy kí tự hexa mang giá trị tương ứng.
        ans_left = ans_left + hexa[value];
    }
    for (int i = 0; i < right_path.size() - 3; ++i)
    {
        string group = right_path.substr(i, 4);

        int power = 1, value = 0;
        for (int j = 3; j >= 0; --j)
        {
            value += (group[j] - '0') * power;
            power *= 2;
        }

        ans_right = ans_right + hexa[value];
    }

    return (ans_left + '.' + ans_right);
}
```

***Ngôn ngữ Python:***

```python
hexa = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F']

def binary_to_hexa(n: float) -> str:
    nn = str(n)
    pos = nn.index('.')
    left_path, right_path = nn[:pos], nn[pos+1:]

    # Bổ sung đủ chữ số 0 để tạo thành các nhóm 4.
    while len(left_path) % 4 != 0:
        left_path = '0' + left_path
    while len(right_path) % 4 != 0:
        right_path = right_path + '0'

    ans_left, ans_right = '', ''

    for i in range(0, len(left_path)-3, 4):
        # Gộp cụm 4 kí tự liên tiếp
        group = left_path[i:i+4]
        
        # Tính giá trị cụm 4 kí tự.
        power, value = 1, 0
        for j in range(3, -1, -1):
            value += int(group[j]) * power
            power *= 2
        
        # Lấy kí tự hexa mang giá trị tương ứng.
        ans_left = ans_left + hexa[value]

    for i in range(0, len(right_path)-3, 4):
        group = right_path[i:i+4]

        power, value = 1, 0
        for j in range(3, -1, -1):
            value += int(group[j]) * power
            power *= 2

        ans_right = ans_right + hexa[value]

    return ans_left + '.' + ans_right
```

Ở chiều hướng ngược lại, khi chuyển từ hệ nhị phân sang hệ hexa, chúng ta chỉ cần đổi từng kí tự hexa sang cụm bốn kí tự nhị phân có giá trị tương ứng. Ta có thể đơn giản hóa bằng cách khởi tạo trước một mảng $\text{binary\_code}$ gồm $15$ phần tử, với nghĩa nghĩa $\text{binary\_code}[i]$ là biểu diễn nhị phân tương ứng với kí tự Hexe $i \ (0 \le i \le 15)$. Lưu ý rằng, với $i > 10$ thì sẽ tương ứng với các kí tự `A`, `B`, `C`, `D`, `E`, `F` nên ta cần xử lý tinh tế để biết được kí tự chữ cái tương ứng với $i$ bằng bao nhiêu.

### Cài đặt 2: Chuyển đổi từ hệ Hexa sang hệ nhị phân

***Ngôn ngữ C++:***

```cpp
string hexa_to_binary(double N)
{
    string binary_code[15] = {"0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111",
                              "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"}
    string NN = to_string(N);

    string res;
    for (int i = 0; i < NN.size(); ++i)
        if ('0' <= NN[i] && NN[i] <= '9')
            res += binary_code[NN[i] - '0'];
        else if ('A' <= NN[i] && NN[i] <= 'F')
        {
            int pos = NN[i] - 55;
            res += binary[pos];
        }

    return res;
}
```

***Ngôn ngữ Python:***

```python
def hexa_to_binary(n: float) -> str:
    binary_code = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111",
                   "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"]
				   
    nn = str(n)
    res = ''
    for i in range(len(nn)):
        if '0' <= nn[i] and nn[i] <= '9':
            res += binary_code[nn[i] - '0']
        elif 'A' <= nn[i] and nn[i] <= 'F':
            pos = nn[i] - 55
            res += binary_code[pos]
			
    return res
```

# IV. Bài toán minh họa

## 1. Số nhị phân thứ K

### Đề bài

Xét các số nhị phân có độ dài $N$ với số bé nhất là $\overline{100…0}$ ($N-1$ chữ số $0$) và số lớn nhất là $\overline{111…1}$ ($N$ chữ số $1$). Ví dụ với $N=3,$ ta có các số nhị phân độ dài 3 là $100,101,110$ và $111$.

***Yêu cầu:*** Cho trước hai số nguyên dương $N$ và $K$. Hãy xác định số nhị phân thứ $K$ trong dãy số nhị phân có độ dài $N?$

***Input:***

- Một dòng duy nhất chứa hai số nguyên dương $N$ và $K$.

***Ràng buộc:***

- $1 \le N \le 30$.
- $1 \le K \le 10^9$.

***Output:***

- Số nhị phân thứ $K$ tìm được.

***Sample Input:***

```
3 3
```

***Sample Output:***

```
110
```

### Ý tưởng

Trong dãy nhị phân có độ dài $N,$ số bé nhất là: $\overline{100…0}$ ($N - 1$ chữ số $0$). Số này có giá trị tương ứng trong hệ thập phân chính là $2^{N - 1}$. Muốn lấy số thứ $K,$ ta chỉ cần cộng thêm $K - 1$ đơn vị vào số bé nhất đó, nhưng nếu như tiến hành cộng ở hệ nhị phân thì sẽ khá phức tạp. Do đó, ta có thể lấy luôn giá trị $2^{N - 1} + (K - 1)$ ở hệ thập phân của số nhị phân thứ $K,$ rồi đổi ngược lại hệ nhị phân, kết quả vẫn sẽ hoàn toàn chính xác.

***Độ phức tạp:*** $O(N)$.

### Code mẫu

```cpp
#include <bits/stdc++.h>
#define int long long

using namespace std;

void solution(int n, int k)
{
    int power = 1 << (n - 1) + (k - 1); // Tính 2^{n - 1} + (k - 1).

    string res;
    while (power > 0)
    {
        if (power % 2) 
            res = '1' + res;
        else 
            res = '0' + res;

        power /= 2;
    }

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;

    solution(n, k);
    
    return 0;
}
```

## 2. Biểu diễn nhị phân

### Đề bài

Mọi số nguyên dương $X$ đều có thể biểu diễn trong hệ nhị phân tương tự như biểu diễn trong hệ thập phân. Chẳng hạn, số $X=17$ có biểu diễn nhị phân là $10001$ vì $17=1×2^4+1$.

***Yêu cầu:*** Cho trước một số nguyên dương $X$. Hãy thực hiện các yêu cầu sau: 
- Tìm biểu diễn nhị phân của số $X$. 
- Tìm số $Y$ lớn nhất trong hệ thập phân sao cho biểu diễn nhị phân của $Y$ thu được từ $X$ bằng cách hoán vị vòng quanh các chữ số trong biểu diễn nhị phân của $X$.

***Input:***

- Gồm một số nguyên dương $X$ duy nhất.

***Ràng buộc:***

- $1≤X≤10^9$.

***Output:***

- Dòng thứ nhất ghi biểu diễn nhị phân của $X$. 
- Dòng thứ hai ghi số $Y$ tìm được.

***Sample Input:***

```
17
```

***Sample Output:***

```
10001
24
```

***Giải thích:***

Ta có $17=1×2^4+1,$ do đó biểu diễn nhị phân của $17$ là $10001$.

Số nhị phân có giá trị lớn nhất thu được từ $X$ khi hoán vị vòng quanh các chữ số trong biểu diễn nhị phân của $X$ là $11000$. Số đó có giá trị thập phân là $24$.

### Ý tưởng

Đối với yêu cầu thứ nhất, ta dùng thuật toán chuyển đổi từ hệ cơ số $10$ sang hệ nhị phân thông thường, không có gì đặc biệt. Sau đó lưu kết quả thu được vào một xâu $s$.

Đối với yêu cầu thứ hai, trước tiên các bạn cần hiểu rõ thế nào là ***hoán vị vòng quanh?*** Bởi vì có rất nhiều bạn ở bài này sẽ lầm tưởng kết quả là đảo toàn bộ số $1$ lên trước, số $0$ về cuối. Tuy nhiên, ta chỉ được phép xét các ***hoán vị vòng quanh*** của xâu nhị phân $s,$ tức là cứ đảo một chữ số từ trên đầu xuống cuối thì ta được một hoán vị vòng quanh, chứ không phải hoán vị lộn xộn tất cả các chữ số. Như vậy, nếu xâu nhị phân có độ dài $n$ thì ta sẽ có $n$ hoán vị vòng quanh.

Để xét các hoán vị vòng quanh, ta sử dụng một kĩ thuật nhỏ, đó là nhân đôi xâu. Chẳng hạn, xâu `110011` sẽ trở thành `110011110011`. Gọi $n$ là độ dài của xâu nhị phân cũ, ta xét từng vị trí $i \ (0 \le i < n),$ thì một xâu con độ dài $n$ bắt đầu từ vị trí $i$ sẽ là một hoán vị vòng quanh. Sau đó, với mỗi hoán vị này ta chỉ cần đổi nó sang hệ thập phân lại, rồi lấy kết quả lớn nhất là xong.

***Độ phức tạp:*** $O(n^2)$ với $n$ là độ dài xâu nhị phân $s$.

### Code mẫu

```cpp
#include <bits/stdc++.h>
#define int long long

using namespace std;

string dec_to_bin(int x)
{
    string res;

    while (x != 0)
    {
        res = (char) (x % 2 + '0') + res;
        x /= 2;
    }

    return res;
}

// Tìm giá trị thập phân của một xâu nhị phân S.
int bin_to_dec(string s)
{
    int exp = 1, res = 0;

    for (int i = s.size() - 1; i >= 0; --i)
    {
        res = res + (s[i] - '0') * exp;
        exp *= 2;
    }

    return res;
}

/**
  * Hàm tính toán hai yêu cầu của đề bài.
  * Yêu cầu thứ nhất: Đưa ra biểu diễn nhị phân của số X -> Dùng hàm dec_to_bin().
  * Yêu cầu thứ hai: Ta xét mọi hoán vị vòng quanh của xâu nhị phân s (là biểu diễn của x), sau đó tìm giá trị
    thập phân lớn nhất trong tất cả các hoán vị vòng quanh đó. Phương pháp xây dựng hoán vị vòng quanh là gấp
    đôi xâu lên, rồi xét mọi xâu độ dài n (n là độ dài xâu np ban đầu) bắt đầu từ vị trí i (0 <= i < n).
*/
void solution(int x)
{
    string circular_per = dec_to_bin(x);

    // Kết thúc yêu cầu thứ nhất: In ra biểu diễn nhị phân của x.
    cout << circular_per << endl; 

    // Bắt đầu yêu cầu thứ hai, ta nhân đôi xâu nhị phân lên để tiến hành tìm các hoán vị vòng quanh.
    int n = circular_per.size(), max_decimal = 0;
    circular_per += circular_per;

    for (int i = 0; i < n; ++i)
        max_decimal = max(max_decimal, bin_to_dec(circular_per.substr(i, n)));

    cout << max_decimal;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr); 

    int x;
    cin >> x;

    solution(x);

    return 0;
}
```

# V. Tài liệu tham khảo

- [https://en.wikipedia.org/wiki/Numeral_system](https://)
- <a href="https://sachhoc.com/sach-giao-khoa-tin-hoc-10">Sách giáo khoa Tin học 10 - Thầy Hồ Sĩ Đàm</a>