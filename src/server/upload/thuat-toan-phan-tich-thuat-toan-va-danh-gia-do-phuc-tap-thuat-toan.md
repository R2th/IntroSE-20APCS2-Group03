# I. Thuật toán và những tính chất của thuật toán

## 1. Khái niệm

Thuật toán - hay còn gọi là giải thuật - là khái niệm quan trọng nhất trong Tin học. Nó là nền tảng cho mọi khía cạnh của Tin học. Khái niệm về thuật toán đã tồn tại từ thời cổ đại, sớm nhất ở đế chế Babylonia với thuật toán chia vào năm $2500$ TCN. Khái niệm về thuật toán có thể phát biểu như sau: *Thuật toán là một dãy hữu hạn các bước, mỗi bước mô tả chính xác các phép toán hoặc hành động cần thực hiện để giải quyết một vấn đề*.

Với sự phát triển chóng mặt của khoa học máy tính, các thuật toán cũng ngày càng phát triển về số lượng cũng như chất lượng. Trong phạm vi của lập trình thi đấu, chúng ta sẽ tập trung nghiên cứu chuyên sâu về các thuật toán từ dễ đến khó, phục vụ cho các kỳ thi về thuật toán như HSG Tin học, Tin học trẻ hay các kỳ thi thuật toán online. Toàn bộ các cài đặt sẽ được viết ở ngôn ngữ C++ vì như đã nói ở các chuyên đề lập trình cơ bản, C++ là một ngôn ngữ rất mạnh trong lập trình thi đấu.

## 2. Các đặc trưng của thuật toán

Mỗi thuật toán luôn luôn có đủ $5$ đặc trưng sau:
- Có đầu vào (Input): Thuật toán nhận dữ liệu vào từ một tập nào đó.
- Có đầu ra (Output): Từ dữ liệu đầu vào, thuật toán sẽ tính toán và đưa ra kết quả tương ứng với đầu vào đó.
- Tính chính xác: Các bước của thuật toán được mô tả chính xác.
- Tính hữu hạn: Thuật toán cần phải đưa ra được output sau một số hữu hạn các bước với mọi input.
- Tính đơn trị: Các kết quả trung gian của từng bước thực hiện thuật toán được xác định một cách đơn trị và chỉ phụ thuộc và input và kết quả của các bước trước.
- Tính tổng quát: Thuật toán có thể áp dụng để giải mọi bài toán có cùng dạng với bài toán đã giải.

Chẳng hạn, dưới đây là thuật toán tìm số ước của một số nguyên dương $N$ được viết trong một hàm `int count_divisors(int N)`

```cpp
int count_divisors(int N)
{
    int divisors = 0;
    for (int i = 1; i <= N; ++i)
	if (N % i == 0)
	    ++divisors;

    return divisors;
}
``` 

# II. Phân tích tính hiệu quả của thuật toán

## 1. Các tiêu chí đánh giá một thuật toán

Thông thường, khi giải một bài toán, chúng ta luôn luôn có xu hướng chọn cách giải "tốt" nhất. Nhưng thế nào là "tốt"? Trong toán học, một cách giải "tốt" có thể là cách giải ngắn gọn, xúc tích, hoặc trên tiêu chí sử dụng những kiến thức dễ hiểu. Còn đối với thuật toán trong Tin học thì dựa vào hai tiêu chuẩn sau:
- Thuật toán đơn giản, dễ hiểu, dễ cài đặt.
- Thuật toán hiệu quả: Dựa vào hai yếu tố là ***thời gian thực hiện thuật toán (còn gọi là độ phức tạp thuật toán)*** và ***dung lượng bộ nhớ cần thiết để lưu trữ dữ liệu***. Tuy nhiên, trong bối cảnh hiện tại khi các máy tính có khả năng lưu trữ rất lớn thì yếu tố mà chúng ta cần quan tâm nhiều hơn là ***độ phức tạp thuật toán***.

## 2. Sự cần thiết của thuật toán hiệu quả

Công nghệ càng phát triển thì sẽ dẫn tới độ lớn dữ liệu cần tính toán ngày càng lớn, tất nhiên khả năng tính toán của máy tính cũng ngày càng phát triển. Nhưng không phải vì việc máy tính hiện đại mà chúng ta có thể bỏ qua tầm quan trọng của một thuật toán hiệu quả. Để làm rõ vấn đề này, mình xin trích lại một ví dụ trong sách giáo khoa chuyên Tin quyển $1$ về thuật toán kiểm tra tính nguyên tố của một số.


```cpp
bool is_prime(int N)
{
    if (N < 2) // Nếu N nhỏ hơn 2 thì chắc chắn không phải số nguyên tố.
        return false;

    // Nếu N có ước trong đoạn [2, N - 1] thì N không phải số nguyên tố.
    for (int i = 2; i < N; ++i)
        if (N % i == 0) 
            return false;

    return true;
}
```

Bên trên là cách cài đặt đơn giản nhất của giải thuật kiểm tra tính nguyên tố. Thuật toán này cần $N-2$ bước kiểm tra trong vòng lặp. Hãy giả sử cần kiểm tra một số có khoảng $25$ chữ số, và ta sở hữu một siêu máy tính có thể tính toán được một trăm nghìn tỉ ($10^{14}$) phép tính trên giây, thì tổng thời gian cần để kiểm tra là:
$$\frac{10^{25}}{10^{14} \times 60 \times 60 \times 24 \times 365} \approx 3170 \text{ năm!}$$ 
Tuy nhiên, nếu tinh ý ta có thể nhận xét như sau: Một số $N$ có ước là $x \ (x \le \sqrt{N})$ thì chắc chắn nó cũng có ước là $\frac{N}{x} \ge \sqrt{N}$. Do đó, thay vì duyệt từ $2$ tới $N - 1$ thì ta chỉ cần duyệt từ $2$ tới $\sqrt{N}$ là có thể biết được $N$ có ước nào trong đoạn này hay không:

```cpp
bool is_prime(int N)
{
    if (N < 2) // Nếu N nhỏ hơn 2 thì chắc chắn không phải số nguyên tố.
	return false;

    // Nếu N có ước trong đoạn [2, N - 1] thì N không phải số nguyên tố.
    for (int i = 2; i * i <= N; ++i)
        if (N % i == 0) 
            return false;

    return true;
}
```

Theo phương pháp này, vẫn là một số nguyên có khoảng $25$ chữ số nhưng thời gian kiểm tra sẽ giảm xuống còn:
$$\frac{\sqrt{10^{25}}}{10^{14}} \approx 0.03 \text{ giây!}$$

# III. Phương pháp đánh giá độ phức tạp thuật toán

## 1. Phương pháp đánh giá bằng lý thuyết

Trong lập trình thi đấu, người ta sẽ đánh giá độ phức tạp thuật toán bằng phương pháp lý thuyết. Trong phương pháp này, ta quan tâm tới yêu tố ***kích thước của dữ liệu đầu vào***, thông thường là một con số $n$. Mối liên hệ giữa yếu tố này và số lượng các phép tính toán để tìm ra được kết quả của bài toán gọi là ***độ phức tạp thuật toán*** (chứ không phải thời gian cụ thể như $1, 2$ hay $10$ giây). Ta sử dụng hàm số $T(n)$ để biểu diễn thời gian thực hiện của thuật toán với dữ liệu đầu vào kích thước là $n$.

Độ lớn của hàm $T(n)$ được biểu diễn bằng một hàm $O(f(n))$ với $T(n)$ và $f(n)$ là hai hàm số thực không âm. Nếu một thuật toán có thời gian thực hiện là $T(n) = O(f(n))$ thì ta nói thuật toán đó có thời gian thực hiện cấp $f(n)$. Nói một cách dễ hiểu, $T(n)$ sẽ biểu diễn số phép tính tối đa cần thực hiện trong thuật toán với một bộ dữ liệu cấp $n,$ chẳng hạn trong bài toán kiểm tra tính nguyên tố của số $n,$ nếu $n$ là số nguyên tố thì thuật toán sẽ phải thực hiện nhiều lần thử nhất.

### 2. Các quy tắc đánh giá thời gian thực hiện thuật toán

Để đánh giá thời gian thực hiện thuật toán, ta xuất phát từ các lệnh đơn trong chương trình, rồi tới các câu lệnh có cấu trúc, các khối lệnh phức tạp hơn, sau đó hợp lại thành thời gian thực hiện cả chương trình. Cụ thể ta có các quy tắc:
- Các lệnh đơn (lệnh khai báo, gán, nhập xuất dữ liệu, phép toán số học,...): Thời gian $O(1)$.
- Các khối lệnh: Giả sử một khối lệnh gồm các câu lệnh $S_1, S_2,..., S_m$ có thời gian thực hiện lần lượt là $O(f_1(n)), O(f_2(n),..., O(f_m(n))$ thì thời gian thực hiện của cả khối lệnh là: $O(\text{max}(f_1(n), f_2(n),...,f_m(n)))$.
- Câu lệnh rẽ nhánh: Ta có cú pháp lệnh rẽ nhánh là:

    ```cpp
    if ({Điều_kiện})
        {Câu_lệnh_1}
    else 
        {Câu_lệnh_2}
    ```

    Giả sử thời gian thực hiện của câu lệnh $1$ và câu lệnh $2$ lần lượt là $O(f_1(n))$ và $O(f_2(n))$ thì thời gian thực hiện lệnh rẽ nhánh là: $O(\text{max}(f_1(n), f_2(n)))$.
- Câu lệnh lặp: Giả sử thời gian thực hiện phần thân của lệnh lặp là $O(f(n))$ và số lần lặp tối đa của vòng lặp là $g(n)$ thì thời gian thực hiện của cả vòng lặp là $O(f(n).g(n))$. Điều này áp dụng cho tất cả các vòng lặp `for`, `while` và `do...while`.
- Sau khi đánh giá được thời gian thực hiện của tất cả các câu lệnh trong chương trình, thời gian thực hiện của toàn bộ chương trình sẽ là thời gian thực hiện của câu lệnh có thời gian thực hiện lớn nhất.

## 3. Phân tích ví dụ

***Ví dụ 1:*** Phân tích thời gian thực hiện của đoạn chương trình sau:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;  // (1)
    cin >> n; // (2)

    int s1 = 0; // (3)
    for (int i = 1; i <= n; ++i)  // (4)
	s1 += i;  // (5)

    int s2 = 0; // (6)
    for (int i = 1; i <= n; ++i) // (7)
	s2 += i * i; // (8)

    cout << s1 << endl << s2; // (9)
}
```

Thời gian thực hiện chương trình trên phụ thuộc vào số $n$. Ta phân tích chi tiết:
- Các lệnh $(1), (2), (3), (5), (6), (8), (9)$ đều có thời gian thực hiện là $O(1)$. 
- Vòng `for` số $4$ có số lần lặp là $n$ và câu lệnh ở phần thân (là câu lệnh $(5)$) có thời gian thực hiện $O(1)$. Vậy cả vòng lặp có thời gian thực hiện là $O(n)$. Tương tự với vòng lặp số $(7)$.

Vậy thời gian thực hiện của cả thuật toán là: 
$$\text{max}(O(1), O(n)) = O(n)$$

***Ví dụ 2:*** Phân tích thời gian thực hiện thuật toán của đoạn chương trình sau:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int sum = 0; // (1)
    for (int i = 1; i <= N; ++i) // (2)
	for (int j = 1; j <= i; ++j) // (3)
	    sum = sum + 1;  // (4)

    cout << sum;  // (5)
}
```

Đoạn chương trình trên có thời gian thực hiện phụ thuộc vào số $N$. Phân tích chi tiết:
- Câu lệnh $(1)$ và $(5)$ có thời gian thực hiện $O(1)$.
- Câu lệnh $(4)$ có thời gian thực hiện $O(1)$.
- Ứng với mỗi giá trị $i$ của câu lệnh lặp $(2),$ thì:
	- Khi $i = 1,$ lệnh lặp $(3)$ thực hiện $1$ lần.
	- Khi $i = 2,$ lệnh lặp $(2)$ thực hiện $2$ lần.
	$...$
	- Khi $i = N,$ lệnh lặp $(2)$ thực hiện $N$ lần.
	
    Như vậy, lệnh lặp $(3)$ có số lần thực hiện là $\frac{N.(N + 1)}{2},$ từ đó suy ra cả lệnh lặp $(2)$ có thời gian thực hiện là $\approx O(N^2)$.

$\Rightarrow$ Cả chương trình có thời gian thực hiện là $O(N^2)$.

## 4. Một số lưu ý

Trong khi giải các bài toán trong các kỳ thi lập trình, mình có tổng hợp vài quy tắc nho nhỏ rất hữu ích có thể giúp đỡ các bạn trong quá trình học tập như sau:
- Một chương trình có thời gian thực chạy không vượt quá $1$ giây nếu như nó có độ phức tạp không quá $O(10^8)$. Điều này rất quan trọng khi bạn muốn đánh giá độ phức tạp của thuật toán mình đang sử dụng, bởi vì phần lớn các bài toán hiện tại có giới hạn thời gian thực thi chỉ là $1$ giây, chỉ có một số rất ít là từ $2$ giây trở lên.
- Trong thư viện STL C++ có nhiều hàm dựng sẵn, tuy nhiên chúng đều có độ phức tạp chứ không phải cứ gọi ra là sử dụng thoải mái. Vì vậy chúng ta cần lưu ý khi sử dụng các hàm dựng sẵn trong chương trình của mình:
	- Hàm `sort()` trong STL C++ có độ phức tạp là $O(N.\log(N))$ với $N$ là độ dài dãy cần sắp xếp.
	- Hàm `pow(x, y)` trong STL C++ có độ phức tạp là $O(y)$.
	- Các hàm `min_element(), max_element(), accumulate()` đều có độ phức tạp là $O(N)$ với $N$ là số phần tử của không gian cần tính toán.
	- Các hàm `min(), max(), swap()` đều có độ phức tạp là $O(1)$.
	- Hàm `__gcd(a, b)` có độ phức tạp là $O(\log(\text{max}(a, b)))$.