# I. Khái niệm về mảng

Trong lập trình, đôi khi ta gặp tập dữ liệu gồm rất nhiều đối tượng có kiểu giống nhau. Lấy ví dụ:

- Danh sách điểm tổng kết của các học sinh trong lớp (một danh sách các số thực).
- Danh sách tên của một phòng thi (một danh sách các chuỗi kí tự).
$\dots$

Mọi ngôn ngữ lập trình đều cung cấp những kiểu dữ liệu có cấu trúc để lưu trữ các dạng dữ liệu như mô tả bên trên. Đối với C++, đó là ***mảng***, ***mảng động*** và ***danh sách liên kết***. Tuy nhiên với mục tiêu hướng tới lập trình thi đấu, chúng ta sẽ tập trung nghiên cứu ***mảng*** và ***mảng động***.

# II. Khai báo và khởi tạo mảng một chiều

## 1. Khai báo mảng một chiều

Để khai báo một mảng trong C++, ta sử dụng cú pháp:

```
{Kiểu_phần_tử} {Tên_mảng}[{Kích_thước_mảng}];
```

Trong đó, ***{Kiểu_phần_tử}*** là một kiểu dữ liệu nguyên thủy hoặc kiểu do người dùng tự định nghĩa - thể hiện kiểu dữ liệu của các phần tử trong mảng; ***{Tên_mảng}*** là một định danh do người dùng đặt ra và không được trùng với từ khóa của hệ thống; ***{Kích_thước_mảng}*** là một số nguyên thể hiện kích thước tạo ra cho mảng. Giả sử kích thước được khởi tạo là $N,$ thì hệ thống sẽ tạo ra một dãy gồm $N$ ô nhớ liền nhau trong bộ nhớ để biểu thị cho mảng. 

***Ví dụ:*** Khai báo một mảng số nguyên gồm $10$ phần tử: 

```cpp
int a[10];
```

***Lưu ý:*** Nên tránh việc khai báo mảng là biến cục bộ, vì có thể gây ra tràn bộ nhớ (đây là kinh nghiệm thi cử). Với các mảng có kích thước nhỏ (dưới $1000$) thì có thể khai báo cục bộ không sao, nhưng với các mảng kích thước lớn, kiểu dữ liệu lớn (như `long long` hay `double`) thì nên khai báo mảng là biến toàn cục sẽ an toàn hơn.

## 2. Khởi tạo mảng một chiều

Cũng giống như biến, mảng có thể được khởi tạo trước các giá trị khi khai báo. Số lượng phần tử khởi tạo không được phép vượt quá kích thước mảng đã khai báo. Nếu như kích thước mảng được để trống thì hệ thống sẽ tự tạo ra số ô nhớ vừa đủ để chứa các phần tử khởi tạo. Cú pháp khởi tạo mảng là: 

```
{Kiểu_phần_tử| {Tên_mảng}[{Kích_thước_mảng}] = {{Danh_sách_phần_tử_khởi_tạo}};
```

Có nhiều cách khác nhau để khởi tạo mảng
- Khởi tạo một mảng với kích thước cố định: 
		
    ```cpp
    int a[5] = {1, 2, 3, 4, 5};
    ```

- Khởi tạo một mảng có số phần tử khởi tạo ít hơn kích thước đã khai báo:

    ```cpp
    int a[5] = {1, 2, 3};
    ```
    Trong trường hợp này, các phần tử chưa được khởi tạo sẽ nhận một giá trị bất kỳ nào đó. Nếu mảng được khai báo là biến toàn cục thì các phần tử trống sẽ nhận giá trị $0,$ nhưng nếu mảng là biến cục bộ thì các phần tử trống sẽ nhận những giá trị tùy ý. Thông thường khi khai báo mảng chúng ta nên khai báo biến toàn cục thay vì biến cục bộ để tránh những nhầm lẫn không đáng có trong khi tính toán vì những phần tử mang giá trị tùy ý.
   
- Khởi tạo mảng không có kích thước: 
    		
    ```cpp
    int a[] = {1, 2, 3, 4, 5};
    ```

    Đối với trường hợp này, mảng sẽ có số vị trí bằng đúng với số phần tử được khởi tạo.

- Minh họa mảng một chiều bằng hình vẽ:


![](https://cdn.ucode.vn/uploads/2247/upload/UKuAZIUa.png)


# III. Các thao tác cơ bản trên mảng một chiều

## 1. Truy cập các phần tử trong mảng

Các phần tử trong mảng đều được đánh số, bắt đầu từ $0$ tới $N-1$ ($N$ là kích thước mảng). Để truy cập và sử dụng một phần tử trong mảng, ta sử dụng toán tử `[]` với cú pháp:

```cpp
{Tên_mảng}[{Chỉ_số_phần_tử}];
```
	
Mỗi phần tử của mảng khi được truy cập sẽ trở thành giống như một biến đơn, có thể sử dụng để tính toán, kết hợp cùng các câu lệnh và toán tử.

***Ví dụ:*** 
- Gán giá trị cho một phần tử của mảng:

    ```cpp
    a[50] = 10;
    ```

- Lấy giá trị của mảng gán cho một biến: 
		
    ```cpp
    int value = a[50];
    ```

## 2. Duyệt các phần tử của mảng

Để duyệt qua tất cả các phần tử trong một mảng, ta có thể sử dụng vòng lặp kết hợp với toán tử `[]` để truy cập vào từng phần tử trong mảng. Cú pháp tổng quát như sau:

```cpp
for ({Biến_đếm} = {Chỉ_số_đầu}; {Biến_đếm} <= {Chỉ_số_cuối}; {Tăng_giảm_biến_đếm})
    {Các_thao_tác_truy_cập_phần_tử};
```

Chẳng hạn, nếu cần duyệt qua và in ra các phần tử trong một mảng $A$ gồm $4$ phần tử, ta có thể viết:

```cpp
for (int i = 0; i < 4; ++i)
    cout << a[i] << endl;
```

Để duyệt ngược mảng hay duyệt một đoạn phần tử trên mảng, chúng ta chỉ cần biến đổi vòng lặp đi một chút là được. Ngoài ra, vòng lặp `while` cũng có thể được sử dụng để duyệt qua mảng. Bạn đọc hãy thử tự thao tác thêm để thành thạo hơn!

## 3. Nhập dữ liệu vào mảng

Trong trường hợp cần yêu cầu nhập vào giá trị cho một mảng gồm $N$ phần tử, ta có thể làm như sau:

```cpp
int a[N];
for (int i = 0; i < N; ++i)
    cin >> a[i];
```

Hoặc nếu muốn cho mảng bắt đầu từ vị trí $1$ thì khai báo tăng kích thước thêm $1$ đơn vị:

```cpp
int a[N + 1];
for (int i = 1; i <= N; ++i)
    cin >> a[i];
```	

***Ví dụ cụ thể:*** Dưới đây minh họa một chương trình nhập vào một mảng gồm $N$ số nguyên sau đó in ra mảng theo thứ tự ngược lại. Bạn đọc có thể xem ví dụ này để hiểu về những điều đã nói ở trên:

```cpp=
#include <iostream>

using namespace std;

int a[100]; // Khai báo mảng là biến toàn cục.
    
int main()
{
    int N;
    cin >> N;
        	
    for (int i = 1; i <= N; ++i)
	cin >> a[i];

    cout << "Mảng in ngược lại: "
    for (int i = N; i >= 1; --i)
        cout << a[i] << ' ';
}
```
	
Giả sử nhập vào $N = 4$ và mảng $a=\{1, 2, 3, 4\},$ kết quả chạy chương trình sẽ đưa ra như sau:
	
```cpp
Mảng in ngược lại: 4 3 2 1
```

## 4. Thêm giá trị vào cuối mảng

Đôi khi chúng ta cần thêm các giá trị mới vào mảng trong quá trình tính toán, thường gặp nhất là thêm giá trị vào cuối mảng. Khi đó, ta sẽ sử dụng một biến đếm $\text{cnt}$ để lưu số lượng phần tử hiện có trong mảng, sau đó tăng biến $\text{cnt}$ lên và gán vị trí $\text{cnt}$ trong mảng bằng phần tử cần thêm vào. Lúc này kích thước của mảng sẽ chính bằng $\text{cnt}$:

```cpp
int a[100], cnt = 0;

void insert_element(int x)
{
     ++cnt;
    a[cnt] = x; // Có thể viết gọn là a[++cnt] = x;
}
```

Trong trường hợp cần thêm phần tử vào đầu hoặc giữa mảng, việc xử lý sẽ trở nên hơi khó khăn. Tất nhiên, sử dụng mảng ta vẫn có thể chèn được phần tử vào giữa, bạn đọc hãy thử suy nghĩ cách làm! 

# IV. Vài bài toán cơ bản trên mảng một chiều

## 1. Bài toán tìm kiếm tuần tự

### Đề bài

Cho một mảng số nguyên gồm $n$ số nguyên $a_1, a_2,..., a_n$ và một số nguyên $x,$ hãy đếm số lần xuất hiện của $X$ trong mảng?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $n$ - số lượng phần tử trong mảng $(1 \le n \le 10^5)$.
- Dòng thứ hai chứa $n$ số nguyên $a_1, a_2, \dots, a_n$ phân tách nhau bởi dấu cách $(1 \le a_i \le 10^9; \forall i: 1 \le i \le n)$.

***Output:***

- Số nguyên duy nhất là số lượng phần tử bằng với giá trị $x$ trong mảng.

***Sample Input:***

```
5 10
10 10 2 1 4
```

***Sample Output:***

```
2
```

### Ý tưởng

Đây có thể nói là bài toán cơ bản nhất với mảng một chiều. Ta có thể giải rất đơn giản bằng một vòng lặp từ đầu tới cuối mảng, nếu phần tử nào của mảng có giá trị bằng $x$ thì tăng một biến đếm lên $1$ đơn vị.

### Cài đặt

```cpp=
#include <bits/stdc++.h>

using namespace std;
	
int main()
{
    int n, x;
    cin >> n >> x;

    int a[n];
    for (int i = 0; i < n; ++i)
        cin >> a[i];

    int res = 0; // Biến đếm số phần tử X trong mảng.
    for (int i = 0; i < n; ++i)
        if (a[i] == x)
            ++res;

    cout << res;
}
```

## 2. Bài toán tính tổng mảng

### Đề bài

Cho một mảng số nguyên gồm $n$ số nguyên $a_1, a_2,..., a_n,$ hãy tính tổng tất cả các phần tử trong mảng?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $n$ - số lượng phần tử trong mảng $(1 \le n \le 10^5)$.
- Dòng thứ hai chứa $n$ số nguyên $a_1, a_2, \dots, a_n$ phân tách nhau bởi dấu cách $(1 \le a_i \le 10^9; \forall i: 1 \le i \le n)$.

***Output:***

- In ra số nguyên duy nhất là tổng các số trong mảng.

***Sample Input:***

```
5
1 2 3 4 5
```

***Sample Output:***

```
15
```

### Ý tưởng

Sử dụng một biến $\text{array sum}$ để lưu tổng các phần tử trong mảng. Dùng một vòng lặp từ đầu tới cuối mảng và cộng giá trị các phần tử vào biến đó.

Tuy nhiên lưu ý rằng tổng các phần tử có thể vượt quá phạm vi kiểu dữ liệu `int`, vì thế cần đặt kiểu dữ liệu cho biến $\text{array sum}$ là `long long`.

### Cài đặt

```cpp=
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n;
    cin >> n;

    int a[n];
	long long array_sum = 0;
    for (int i = 0; i < n; ++i)
    {
        cin >> a[i];
        array_sum += a[i];
    }

    cout << array_sum;
}
```

## 3. Bài toán tìm giá trị lớn nhất - giá trị nhỏ nhất trong mảng

### Đề bài 

Cho một mảng số nguyên gồm $n$ số nguyên $a_1, a_2,..., a_n,$ hãy tìm số lớn nhất và số nhỏ nhất trong mảng?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $n$ - số lượng phần tử trong mảng $(1 \le n \le 10^5)$.
- Dòng thứ hai chứa $n$ số nguyên $a_1, a_2, \dots, a_n$ phân tách nhau bởi dấu cách $(1 \le a_i \le 10^9; \forall i: 1 \le i \le n)$.

***Output:***

- Đưa ra hai số nguyên lần lượt là giá trị nhỏ nhất và giá trị lớn nhất trong mảng.

***Sample Input:***

```
5
-1 5 3 -10 8
```

***Sample Output:***

```
-10 8
```

### Ý tưởng

Áp dụng một kĩ thuật gọi là ***kĩ thuật đặt cờ***. Ta gọi hai biến $\text{min_value}$ và $\text{max value}$ lần lượt là giá trị nhỏ nhất và giá trị lớn nhất của mảng, ban đầu gán cả hai bằng số đầu tiên trong mảng. Sau đó duyệt một vòng lặp từ phần tử thứ hai tới cuối mảng và cập nhật giá trị min - max vào hai biến với mỗi phần tử duyệt đến.

### Cài đặt

```cpp=
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n;
    cin >> n;

    int a[n];
    for (int i = 0; i < n; ++i)
        cin >> a[i];

    int min_value = a[0], max_value = a[0];
    for (int i = 1; i < n; ++i)
    {
        if (a[i] < min_value) // Tìm thấy phần tử khác nhỏ hơn min_value.
            min_value = a[i];
        if (a[i] > max_value) // Tìm thấy phần tử khác lớn hơn min_value;
            max_value = a[i]; 
    }

    cout << min_value << ' ' << max_value;
}
```

# V. Tài liệu tham khảo

- https://nguyenvanhieu.vn/huong-dan-cach-nhap-mang-mot-chieu-trong-c/
- https://daynhauhoc.com/t/mang-mot-chieu-c-c/30080
- https://www.howkteam.vn/course/khoa-hoc-lap-trinh-c-can-ban/mang-1-chieu-trong-c-arrays-1377