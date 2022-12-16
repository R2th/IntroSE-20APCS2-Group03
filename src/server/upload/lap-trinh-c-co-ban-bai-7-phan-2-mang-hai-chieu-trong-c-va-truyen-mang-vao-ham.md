# I. Mảng hai chiều trong C++

## 1. Khai báo và truy xuất

Ngoài kiểu dữ liệu mảng một chiều, C++ hỗ trợ kiểu dữ liệu mảng từ hai chiều tới nhiều chiều. Mảng hai chiều là ví dụ rất trực quan và dễ tưởng tượng, ta có thể xem nó như một bảng hình chữ nhật gồm có $M$ hàng và $N$ cột. Cú pháp khai báo rất đơn giản:
	
```
{Kiểu_phần_tử} {Tên_mảng}[{Số_hàng}][{Số_cột}];
```

Khi đó, tổng số phần tử của mảng sẽ là `{Số_hàng}` $\times$ `{Số_cột}`. Chẳng hạn, khai báo một mảng hai chiều gồm $10$ hàng và $12$ cột chứa toàn số nguyên, ta viết như sau:
	
```cpp
int a[10][12];
```

Các hàng và cột của mảng hai chiều đều sẽ được đánh số từ $0$. Cách truy cập phần tử tương tự như ở mảng một chiều, chỉ cần dùng toán tử `[]` ở từng chiều để đưa ra một phần tử nào đó. Ví dụ, muốn truy cập phần tử ở hàng $3,$ cột $4,$ ta chỉ cần viết:

```cpp
a[3][4];
```

Để tiện cho việc đánh số và biểu diễn trên hình, thường người ta sẽ quy ước đánh số các hàng từ trên xuống dưới và các cột từ trái qua phải:


	
![](https://cdn.ucode.vn/uploads/2247/upload/nLiegRwM.png)


Tuy nhiên, có một lưu ý nho nhỏ, đó là khi khai báo mảng hai chiều các bạn không nên khai báo bằng biến cục bộ. Lí do là vì, khi khai báo biến cục bộ thì bộ nhớ cấp phát cho biến sẽ lưu trong stack của máy tính, và đối với một số trình biên dịch có thể gây ra lỗi không đáng có!

## 2. Khởi tạo mảng hai chiều

Giống như mảng một chiều, mảng hai chiều cũng có thể khởi tạo trước giá trị. Cú pháp như sau:

```
{Kiểu_phần_tử} {Tên_mảng}[{Số_hàng}][{Số_cột}] = 
{
    {{Danh_sách_phần_tử_của_hàng_0}};    
    {{Danh_sách_phần_tử_của_hàng_1}};
    ...
    {{Danh_sách_phần_tử_của_hàng_cuối}};
};
```

***Ví dụ:*** Khởi tạo mảng hai chiều kích thước $3 \times 4$ gồm $12$ số nguyên:

```cpp=
int a[3][4] = 
{
    {1, 2, 3, 4};
    {5, 6, 7, 8};
    {9, 10, 11, 12};
};
```

Ngoài cách khởi tạo mảng với số phần tử cố định, trên mảng hai chiều cũng có thể khởi tạo với các cách không khai báo số lượng hàng, cột hoặc không khởi tạo hết các phần tử giống như mảng một chiều. Bạn đọc có thể tự mình cài đặt các cách khởi tạo khác nhau để kiểm chứng. Trong C++ không chỉ có mảng hai chiều, mà còn có mảng nhiều chiều, nhưng sẽ khá khó tưởng tượng và cũng không thường xuyên sử dụng, vì vậy chúng ta không cần đề cập đến ở đây.

## 3. Nhập xuất dữ liệu trên mảng hai chiều

Ví dụ dưới đây sẽ minh hoạt một chương trình yêu cầu nhập vào một mảng hai chiều kích thước $M\times N$ và in ra toàn bộ mảng đó theo thứ tự hàng cột. Bạn đọc có thể áp dụng đúng phương pháp này cho việc nhập và truy xuất dữ liệu trên các mảng $3$ chiều, $4$ chiều,...:

```cpp=
#include <iostream>

using namespace std;	
	
int main()
{
    int M, N;	
    cin >> M >> N;
        
    for (int i = 0; i < M; ++i)
        for (int j = 0; j < N; ++j)
            cin >> a[i][j];

    cout << "Mảng đã nhập vào là: " << endl;
    for (int i = 0; i < M; ++i)
    {
        for (int j = 0; j < N; ++j)
            cout << a[i][j] << ' ';

        cout << endl;
    }
}
```		

Giả sử nhập vào mảng kích thước $3 \times 4$ với các giá trị từ $1$ tới $12,$ chạy chương trình sẽ thu được kết quả sau:

```
Mảng đã nhập vào là:
1 2 3 4
5 6 7 8
9 10 11 12
```

# II. Một vài bài toán với mảng hai chiều

## 1. Tìm giá trị lớn nhất trong mảng hai chiều

### Đề bài

Cho mảng hai chiều $A$ gồm $m$ hàng $n$ cột, các hàng được đánh số từ $1$ tới $m$ từ trên xuống dưới, các cột được đánh số từ $1$ tới $n$ từ trái qua phải. Ô nằm trên giao của hàng $i,$ cột $j$ gọi là ô $(i, j)$ và có chứa số nguyên $a_{i, j}$.

Hãy xác định giá trị lớn nhất trong mảng $A?$

***Input:***

- Dòng đầu tiên chứa hai số nguyên dương $m, n$ - kích thước mảng hai chiều $(1 \le m, n \le 1000)$.
- $m$ dòng tiếp theo, mỗi dòng chứa $n$ số nguyên $a_{i, j}$ thể hiện hàng thứ $i$ của mảng $(a_{i, j} \le 10^9)$.

***Output:***

- In ra giá trị lớn nhất trong mảng $A$.

***Sample Input:***

```
4 5
1 2 3 4 5
-1 -2 0 3 5
10 4 -5 -10 6
4 4 4 4 4
```

***Sample Output:***

```
10
```

### Ý tưởng

Sử dụng kĩ thuật đặt cờ, gán một biến $res = a_{1, 1}$ để coi như phần tử lớn nhất trong mảng là $a_{1, 1}$. Sau đó duyệt qua tất cả các giá trị trong bảng, nếu phần tử nào lớn hơn $res$ thì cập nhật lại $res$ bằng phần tử đó.

Kết quả cuối cùng chính là $res$.

### Cài đặt

```cpp=
#include <bits/stdc++.h>

using namespace std;

int a[1001][1001];

main()
{
    int m, n;
    cin >> m >> n;
	
    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j)
            cin >> a[i][j];

    int res = a[1][1];
    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j)
            if (a[i][j] > res)
                res = a[i][j];

    cout << res;
}
```

## 2. Tính tổng các phần tử trong mảng

### Đề bài

Cho mảng hai chiều $A$ gồm $m$ hàng $n$ cột, các hàng được đánh số từ $1$ tới $m$ từ trên xuống dưới, các cột được đánh số từ $1$ tới $n$ từ trái qua phải. Ô nằm trên giao của hàng $i,$ cột $j$ gọi là ô $(i, j)$ và có chứa số nguyên $a_{i, j}$. 

Hãy tính tổng các phần tử trong mảng?

***Input:***

- Dòng đầu tiên chứa hai số nguyên dương $m, n$ - kích thước mảng hai chiều $(1 \le m, n \le 1000)$.
- $m$ dòng tiếp theo, mỗi dòng chứa $n$ số nguyên $a_{i, j}$ thể hiện hàng thứ $i$ của mảng $(a_{i, j} \le 10^9)$.

***Output:***

- Số nguyên duy nhất là tổng các phần tử trong mảng.

***Sample Input:***

```
3 3
1 2 3
4 5 6
7 8 9
```

***Sample Output:***

```
45
```

### Ý tưởng

Giống như mảng một chiều, chúng ta chỉ cần sử dụng một biến $sum$ để lưu tổng các phần tử trong mảng, rồi duyệt qua toàn bộ các phần tử và tính tổng của chúng.

### Cài đặt

```cpp=
#include <bits/stdc++.h>

using namespace std;

int a[1001][1001];

main()
{
    int m, n;
    cin >> m >> n;
	
    int sum = 0;
    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j)
        {
            cin >> a[i][j];
            sum += a[i][j];
        }

    cout << sum;
}
```

## 3. Tổng đường chéo

### Đề bài

Cho mảng hai chiều dạng vuông $A$ gồm $m$ hàng $m$ cột, các hàng được đánh số từ $1$ tới $m$ từ trên xuống dưới, các cột được đánh số từ $1$ tới $n$ từ trái qua phải. Ô nằm trên giao của hàng $i,$ cột $j$ gọi là ô $(i, j)$ và có chứa số nguyên $a_{i, j}$.

Đường chéo chính của ma trận là đường chéo nối ô $(1, 1)$ với ô $(m, m)$. Đường chéo phụ của ma trận là đường chéo nối ô $(1, m)$ với ô $(m, 1)$.

Hãy tính tổng các số trên đường chéo chính và đường chéo phụ của ma trận vuông?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $m$ - kích thước ma trận vuông $(1 \le m \le 1000)$.
- $m$ dòng tiếp theo, mỗi dòng chứa $m$ số nguyên $a_{i, j}$ phân tách nhau bởi dấu cách, mô tả ma trận $(1 \le a_{i, j} \le 10^9)$.

***Output:***

- Hai số nguyên lần lượt là tổng đường chéo chính và tổng đường chéo phụ của ma trận.

***Sample Input:***

```
3
1 2 1
3 1 8
2 5 4
```

***Sample Output:***

```
6 4
```

### Ý tưởng

Một ô $(i, j)$ sẽ thuộc đường chéo chính của ma trận nếu như $i = j$. Còn nếu như $i = m - i + 1,$ thì ô đó sẽ thuộc đường chéo phụ của ma trận.

Ta duyệt qua các phần tử của ma trận và kết hợp câu lệnh `if` để tính tổng hai đường chéo.
 
### Cài đặt

```cpp=
#include <bits/stdc++.h>

using namespace std;

int a[1001][1001];

int main()
{
    int m;
    cin >> m;

    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= m; ++j)
            cin >> a[i][j];

    long long main_diagonal = 0, secondary_diagonal = 0;
    for (int i = 1; i <= N; ++i)
        for (int j = 1; j <= N; ++j)
        {
            if (i == j)
                main_diagonal += a[i][j];
            if (j == m - i + 1)
                secondary_diagonal += a[i][j];
        }

    cout << main_diagonal << ' ' << secondary_diagonal;
}
```

# III. Truyền mảng vào hàm như một tham số

## 1. Truyền mảng một chiều

Mảng cũng có thể được truyền vào hàm giống như một tham số để tính toán. Có $3$ cách để truyền mảng vào hàm: ***Sử dụng tham số mảng có kích cỡ***, ***sử dụng tham số mảng không có kích cỡ*** và ***sử dụng con trỏ***. Trong bài học này chúng ta sẽ tập trung vào hai cách đầu tiên, còn cách thứ ba với C++ là không cần thiết nên sẽ không đề cập ở đây.

***Cú pháp:***

- Truyền mảng có kích cỡ: 
		
    ```
    {Kiểu_trả_về} {Tên_hàm}({Kiểu_phần_tử} {Tên_mảng}[{Kích_cỡ}])
    ```

    ***Ví dụ:***

    ```cpp
    int function1(int a[10])
    {
        {Thân_hàm};
    }
    ```

- Truyền mảng không kích cỡ: 
		
    ```
    {Kiểu_trả_về} {Tên_hàm}({Kiểu_phần_tử} {Tên_mảng}[])
    ```

    Ví dụ: 
		
    ```cpp
    int function2(int a[])
    {
        {Thân_hàm};
    }
    ```

Khác với việc truyền biến vào hàm, việc truyền mảng vào hàm không phân biệt ra tham trị hay tham chiếu. Khi truyền mảng, hệ thống luôn luôn truyền trực tiếp ***địa chỉ của phần tử đầu tiên*** của mảng ban đầu vào hàm, dẫn đến mọi thay đổi trên tham số đại diện trong hàm sẽ tác động đến mảng gốc bên ngoài, dù là theo cách nào trong số các cách trên. Vì vậy cần hết sức chú ý đến dữ liệu khi thực hiện truyền mảng vào hàm. Dưới đây là ví dụ cụ thể:
	
```cpp=
#include <bits/stdc++.h>

using namespace std;

void increase(int b[])
{
    for (int i = 0; i <= 4; ++i)
	++b[i];
}
	
int main()
{
    int a[5] = {1, 2, 3, 4, 5};
    increase(a);

    cout << "Mảng sau khi tăng lên: ";
    for (int i = 0; i <= 4; ++i)
	cout << a[i] << ' ';
		
    return 0;
}
```

Khi biên dịch và chạy chương trình này, ta sẽ thu được kết quả:

```
Mảng sau khi tăng lên: 2 3 4 5 6
```

Trong phần tham số của hàm `void increase(int b[])`, nếu ta thay `int b[]` bằng `int b[5]` thì cũng vẫn trả ra kết quả tương tự, do hệ thống sẽ không tạo ra một bản sao của mảng mà lấy trực tiếp địa chỉ của mảng gốc rồi truyền vào hàm.

Một lưu ý khác là C++ không cho phép trả về trực tiếp một mảng như là kết quả của hàm. Để trả ra kết quả cho hàm là một mảng, cần phải sử dụng ***con trỏ***, nhưng việc đó khá phức tạp. Để tránh việc phải trả ra kết quả là một mảng, ta nên khai báo các mảng là ***biến toàn cục*** hoặc sử dụng kiểu mảng động `<vector>` (sẽ học ở bài số $8$).

## 2. Truyền mảng hai chiều

Về bản chất, mảng hai chiều thực ra là một "mảng chứa các mảng", nghĩa là nó giống như một mảng một chiều nhưng mỗi phần tử lại là một mảng một chiều khác. Do đó, trên bộ nhớ, toàn bộ các phần tử của mảng hai chiều thực ra được viết liền kề với nhau, chứ không phải tạo thành một bảng số như chúng ta vẫn tưởng tượng.
Chính vì thế, khi truyền mảng hai chiều vào hàm thì thực chất chương trình vẫn sẽ truyền địa chỉ của phần tử đầu tiên trong mảng hai chiều vào hàm. Chẳng hạn, với một mảng hai chiều $3 \times 3$ thì địa chỉ của các phần tử trên thanh RAM sẽ trông như thế này:



![](https://cdn.ucode.vn/uploads/2247/images/SmHrAuId.png)


Mảng hai chiều cũng có thể được truyền vào hàm như mảng một chiều, tuy nhiên có một số lưu ý khi khai báo tham số hình thức. Có ba cách để truyền mảng hai chiều vào hàm:

- Cách $1$: Khai báo cụ thể số hàng, số cột:

    ```
    {Kiểu_trả_về} {Tên_hàm}({Kiểu_phần_tử} {Tên_mảng}[{Số_hàng}][{Số_cột}])
    ```

- Cách $2$: Khai báo cụ thể số cột, số hàng bỏ trống:

    ```
    {Kiểu_trả_về} {Tên_hàm}({Kiểu_phần_tử} {Tên_mảng}[][{Số_cột}])
    ```

- Cách $3$: Sử dụng từ khóa `typedef` để định nghĩa trước kiểu mảng:

    ```cpp
    typedef {Kiểu_dữ_liệu} {Tên_thay_thế}[{Số_hàng}][{Số_cột}];

    // Khi truyền vào hàm.
    {Kiểu_trả_về} {Tên_hàm}({Tên_thay_thế} {Tên_mảng});
    ``` 
	
Ví dụ, nếu truyền mảng $3 \times 3$ vào hàm `void function()` thì ta có thể khai báo tham số hình thức theo các cách sau đều được:

```cpp
typedef int arr[100][100];

void function(int a[3][3]); // Cách 1.
void function(int a[][3]); // Cách 2.
void function(arr a); // Cách 3.
```

Thông thường, cách thứ $2$ và $3$ sẽ được ưu tiên sử dụng hơn. Lưu ý nhỏ, nếu các bạn truyền mảng từ hai chiều trở lên thì chỉ có chiều đầu tiên được phép để trống kích thước, còn các chiều sau đó đều phải xác định kích thước. Ví dụ, cách khai báo tham số `int a[][]` sẽ là không hợp lệ và bị báo lỗi khi biên dịch.

# IV. Tài liệu tham khảo

- https://nguyenvanhieu.vn/nhap-xuat-mang-2-chieu/
- https://codelearn.io/sharing/mang-hai-chieu-mang-da-chieu-trong-cpp
- https://cpp.daynhauhoc.com/5/3-mang-hai-chieu/