# I. Lặp với số lần biết trước và lặp với số lần không biết trước

Cùng xem xét hai bài toán sau đây: 

- Bài toán $1$: Tính giá trị tổng $S,$ biết:
$$S = \frac{1}{1} + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{N}$$
- Bài toán $2$: Tính giá trị tổng $S,$ biết:
$$S = 1 + 2 + 3 + \cdots + ...$$ 
cho tới khi $S \ge 10^6$.

Đối với bài toán $1,$ $S$ có thể được tính bằng cách sau:
- Đầu tiên, $S$ được gán giá trị $1 \ (\frac{1}{1})$.
- Tiếp theo, cộng vào tổng S một giá trị $\frac{1}{x}$ với $x = 2, 3, 4,..., N$. Việc cộng này được lặp lại $N - 1$ lần tới khi $x = N$ thì thu được tổng $S$ ban đầu.

Đối với bài toán $2,$ ta có một cách tính tương tự: 
- Đầu tiên, $S$ được gán giá trị $1$.
- Tiếp theo, cộng vào tổng $S$ một số $x$ với $x = 2, 3, 4,...$ Số lần lặp lại công việc này chưa được biết trước nhưng sẽ dừng lại khi đạt được tổng $S \ge 10^6$.

Nhìn chung, trong mọi thuật toán đều sẽ có những thao tác phải lặp đi lặp lại nhiều lần. Đối với con người, khi số lần lặp lại công việc quá lớn, việc thực hiện sẽ là bất khả thi. Nhưng với máy tính, khả năng tính toán cực kỳ nhanh chóng sẽ khiến cho việc thực hiện các thao tác lặp trở nên rất hiệu quả. Có hai dạng lặp là ***lặp với số lần biết trước*** và ***lặp với số lần không biết trước***. C++ cung cấp cả hai cấu trúc lặp để biểu diễn hai thao tác lặp này. 

 # II. Câu lệnh `for` - Lặp với số lần biết trước

Câu lệnh for là một cấu trúc điều khiển rất hiệu quả để lặp đi lặp lại một công việc trong một số lần nhất định. 

***Cú pháp:*** 

```cpp
for ({Khởi_tạo_biến_đếm}; {Điều_kiện_dừng}; {Tăng_giảm_biến_đếm})
{
    {Khối_lệnh};
}
```

***Quy trình thực hiện của vòng lặp:***
- Bước $1$ - ***{Khởi_tạo_biến_đếm}:*** Một lệnh khởi tạo ra một hoặc nhiều biến đếm bất kỳ trong vòng lặp, hoặc không khởi tạo biến nào cả (tuy nhiên vẫn phải có dấu chấm phẩy). 
- Bước $2$ - ***{Điều_kiện_dừng}:*** Là một biểu thức logic xác định điều kiện khi nào vòng lặp sẽ dừng lại. Trước khi thực hiện ***{Khối_lệnh},*** biểu thức sẽ kiểm tra kết quả, nếu là `true` thì ***|Khối lệnh|*** sẽ được thực hiện tiếp, ngược lại thì vòng lặp sẽ dừng.
- Bước $3$ - ***{Khối_lệnh}:*** Sau khi kiểm tra ***{Điều_kiện_dừng}*** và thấy kết quả là `true`, khối lệnh sẽ được thực hiện.
- Bước $4$ - ***{Tăng_giảm_biến_đếm}:*** Cập nhật giá trị biến đếm theo bất kỳ cách nào người dùng mong muốn (có thể không cập nhật gì cả nhưng vẫn phải có dấu chấm phẩy). Sau khi cập nhật xong, quá trình quay trở lại từ bước $2$ cho tới khi ***{Điều_kiện_dừng}*** nhận giá trị `false`.

***Ví dụ:*** Cùng xét chương trình sau:

```cpp
#include <iostream>
using namespace std;
    
int main()
{
    int N;
    cin >> N;
        
    int S = 0;
    for (int i = 1; i <= N; ++i)
        S = S + i;
        
    cout << "Tổng từ 1 tới N là: " << S;
        
    return 0;
}
```

Vòng lặp sẽ khởi tạo biến đếm `i = 1`, kế đến kiểm tra điều kiện `i <= N`, nếu điều kiện này đúng thì thực hiện câu lệnh `S = S + i`, sau đó tăng biến $i$ lên $1$ đơn vị, rồi lại quay trở về kiểm tra điều kiện `i <= N`,...Quá trình sẽ lặp lại cho tới khi biến $i$ nhận giá trị $N + 1,$ vòng lặp dừng lại. 

Giả sử nhập vào $N$ bằng $10,$ kết quả in ra là: 

```
Tổng từ 1 tới N là 55
```

***Sơ đồ quá trình thực hiện:***



<img src="https://i.imgur.com/0PA46wF.png">


# III. Câu lệnh `while` - lặp với số lần không biết trước

Đôi khi chúng ta cần lặp lại một công việc nào đó, nhưng không biết trước số lần sẽ lặp mà chỉ biết được điều kiện khi nào công việc đó sẽ dừng lại, khi đó vòng lặp `while` sẽ trở nên rất hữu dụng. Có hai dạng vòng lặp **while** trong C++: `while` và `do...while`.

## 1. Vòng lặp `while`

***Cú pháp:***

```cpp
while ({Điều_kiện_dừng})
{
    {Khối_lệnh};
}
```

***Quy trình thực hiện vòng lặp:***
- Bước $1$ - ***{Điều_kiện_dừng}:*** Là biểu thức logic xác định điều kiện dừng của vòng lặp. Trước khi thực thi ***{Khối_lệnh},*** chương trình sẽ kiểm tra ***{Điều_kiện_dừng},*** nếu kết quả là `true` thì tiếp tục thực thi ***{Khối_lệnh},*** ngược lại vòng lặp kết thúc.
- Bước $2$ - ***{Khối_lệnh}:*** Sau khi kiểm tra ***{Điều_kiện_dừng}*** và thấy kết quả là `true`, khối lệnh sẽ được thực hiện. Sau đó, quy trình tiếp tục quay lại bước $1$ tới khi vòng lặp dừng.

***Ví dụ:***

```cpp
#include <iostream>
using namespace std;
    
int main()
{   
    int S = 0, i = 1;
    while (S <= 100)
    {
        S = S + i;
        i = i + 5;
    }
        
    cout << "Tổng S là: " << S;
        
    return 0;
} 
```

Đầu tiên chương trình sẽ khởi tạo biến hai biến `S = 0` và `i = 1`. Sau đó khi vào vòng lặp, kiểm tra điều kiện `S <= 100`, nếu điều kiện này đúng thì thực hiện câu lệnh `S = S + i`, sau đó tăng biến $i$ lên $5$ đơn vị, rồi lại quay trở về kiểm tra điều kiện `i <= N`,...Quá trình sẽ lặp lại cho tới khi biến $S$ nhận giá trị lớn hơn $100$ thì vòng lặp dừng lại.

Kết quả in ra khi chạy chương trình là: 

```
Tổng S là 112
```

***Sơ đồ quá trình thực hiện:***


<img src="https://i.imgur.com/wN22lsb.png">


## 2. Vòng lặp `do...while`

Về cơ bản, vòng lặp `do...while` giống với vòng lặp `while`, nhưng điểm khác biệt là vòng lặp `do...while` sẽ thực hiện khối lệnh trước rồi mới tiến hành kiểm tra điều kiện dừng. Có nghĩa là, khối lệnh trong vòng lặp `do...while` luôn luôn được thực thi ít nhất một lần, trong khi vòng lặp `while` thì có thể sẽ không thực hiện lần nào cả.

***Cú pháp:*** 

```cpp
do
{
    {Khối_lệnh};
}
while ({Điều_kiện_dừng});
```

***Quy trình thực hiện vòng lặp:***
- Bước $1$ - ***{Khối_lệnh}:*** ***{Khối_lệnh}|*** sẽ được thực thi trước tiên.
- Bước $2$ - ***{Điều_kiện_dừng}:*** Kiểm tra ***{Điều_kiện_dừng},*** nếu biểu thức logic trả ra kết quả `true` thì tiếp tục quay trở về bước $1,$ ngược lại thì dừng vòng lặp.

***Ví dụ:***

```cpp
#include <iostream>
using namespace std;
    
int main()
{   
    int S = 0, i = 1;
    do
    {
        S = S + i;
        i = i + 5;
    }
    while (S <= 100);
        
    cout << "Tổng S là: " << S;
        
    return 0;
} 
```

Đầu tiên chương trình sẽ khởi tạo biến hai biến `S = 0` và `i = 1`. Khi vào vòng lặp, đầu tiên chương trình sẽ tính `S = S + i`, kế đến gán `i = i + 5` rồi mới kiểm tra điều kiện `S <= 100`. Nếu điều kiện vẫn đang có kết quả là  `true` thì tiếp tục thực hiện lại khối lệnh, lặp lại cho tới khi biến $S$ nhận giá trị lớn hơn $100$ thì vòng lặp dừng lại.

Kết quả in ra khi chạy chương trình là:

```
Tổng S là 112
```

***Sơ đồ quá trình thực hiện:***


<img src="https://i.imgur.com/eNjetKG.png">


# IV. Vòng lặp lồng nhau

Cú pháp C++ cho phép người dùng có thể lồng nhiều vòng lặp vào nhau. Khi đó, ứng với mỗi lần lặp của vòng lặp bên ngoài thì vòng lặp bên trong sẽ được thực hiện đủ số lần lặp của nó. Dưới đây là một số ví dụ:

## 1. Lồng vòng lặp `for`

***Cú pháp:***

```cpp
for ({Khởi_tạo_biến_đếm_1}; {Điều_kiện_dừng_1}; {Tăng_giảm_biến_đếm_1})
{
    for ({Khởi_tạo_biến_đếm_2}; {Điều_kiện_dừng_2}; {Tăng_giảm_biến_đếm_2})
    {
        {Khối_lệnh_2};
	...
    }
       
    {Khối_lệnh_1};
    ...
}
```

***Ví dụ:*** Chương trình dưới đây sử dụng hai vòng lặp `for` lồng nhau để đếm số ước nguyên dương của mỗi số nguyên dương từ $1$ tới $10$:

```cpp
#include <iostream>
#include <cmath>

using namespace std;
    
int main()
{   
    for (int i = 1; i <= 10; ++i) // Duyệt các số i từ 1 tới 10.
    {
        int cnt_divisors = 0; // Số ước của i.
        for (int j = 1; j <= i; ++j) // Duyệt tìm các ước của i.
            if (i % j == 0) 
                ++cnt_divisors;
            
        cout << "Số ước của " << i << " là: " << cnt_divisors << endl;
    }
        
    return 0;
} 
```

Biên dịch và chạy chương trình trên sẽ cho ra kết quả:

```
Số ước của 1 là 1
Số ước của 2 là 2
Số ước của 3 là 2
Số ước của 4 là 3
Số ước của 5 là 2
Số ước của 6 là 4
Số ước của 7 là 1
Số ước của 8 là 4
Số ước của 9 là 3
Số ước của 10 là 4
```

## 2. Lồng vòng lặp `while`

***Cú pháp:***

```cpp
while ({Điều_kiện_1})
{
    while ({Điều_kiện_2})
    {
        {Khối_lệnh_2};
	...
    }
        
    {Khối_lệnh_1};
    ...
}
```

***Ví dụ:*** Đặt $F(N)$ là tổng các số từ $1$ tới $N,$ chương trình dưới đây sử dụng hai vòng lặp `while` lồng nhau để in ra các giá trị $F(1), F(2),.., F(5)$:

```cpp
#include <iostream>
#include <cmath>

using namespace std;
    
int main()
{   
    int i = 1; 
    while (i <= 5)
    {
	int j = 1, f = 0;
	while (j <= i)
	{
	    f += j;
	    ++j;
	}

	cout << "F(" << i << " = " << f << endl; 

	++i; // Tăng i lên để tính F(i) tiếp theo.
    }
        
    return 0;
} 
```

Biên dịch và chạy chương trình, ta thu được kết quả là:

```
F(1) = 1
F(2) = 3
F(3) = 6
F(4) = 10
F(5) = 15
```

## 3. Lồng vòng lặp `do...while`

***Cú pháp:***

```cpp
do
{
    {Khối_lệnh_1};
        
    do 
    {
       {Khối_lệnh_2};
	...
    }
    while ({Điều_kiện_2});
    ...
}
while ({Điều_kiện_1});
```

***Ví dụ:*** Đặt $F(N)$ là tổng các số từ $1$ tới $N,$ chương trình dưới đây sử dụng hai vòng lặp `do...while` lồng nhau để in ra các giá trị $F(1), F(2),.., F(5)$:

```cpp
#include <iostream>
#include <cmath>

using namespace std;
    
int main()
{   
    int i = 1; 
    do
    {
	int j = 1, f = 0;
	do
	{
	    f += j;
	    ++j;
	}
	while (j <= i);

	cout << "F(" << i << " = " << f << endl; 

	++i; // Tăng i lên để tính F(i) tiếp theo.
    }
    while (i <= 5);
   
    return 0;
} 
```

Biên dịch và chạy chương trình, ta thu được kết quả là:

```
F(1) = 1
F(2) = 3
F(3) = 6
F(4) = 10
F(5) = 15
```

## 4. Lồng vòng lặp hỗn hợp

***Cú pháp:***

```cpp
for ({Khởi_tạo_biến_đếm_1}; {Điều_kiện_dừng_1}; {Tăng_giảm_biến_đếm_1})
{
    while ({Điều_kiện_2})
    {
        {Khối_lệnh_2};
        
        do
        {
            {Khối_lệnh_3};
	    ....
        }
        while ({Điều_kiện_3});
	...
    }
        
    {Khối_lệnh_1};
    ...
}
```

***Ví dụ:*** Chương trình dưới đây lồng hai vòng lặp `for` và `while` để tính tổng $1! + 2! + \cdots + 10!$:

```cpp
#include <iostream>
#include <cmath>

using namespace std;
    
int main()
{   
    int sum = 0; // Biến lưu tổng 1! + 2! + ... + 10!
    for (int i = 1; i <= 10; ++i)
    {
	int j = 1, factorial = 1;
	while (j <= i)
	{
	    factorial *= j;
	    ++j;
	}

	sum += factorial;
    }
   
    cout << sum;
} 
```

Biên dịch và chạy chương trình, ta thu được kết quả là:

```
4037913
```

# V. Các lệnh `break` và `continue`

## 1. Lệnh `break`

***Tác dụng:*** Sử dụng để ngắt vòng lặp. Khi gặp lệnh `break`, vòng lặp đang chứa lệnh đó sẽ ngay lập tức bị ngắt kể cả khi ***{Điều_kiện_dừng}*** vẫn đang nhận giá trị `true`.

***Cú pháp:*** 

```cpp
break;
```

***Ví dụ:***

```cpp
#include <iostream>
using namespace std;
    
int main()
{
    int S = 0;
    for (int i = 1; i <= 15; ++i)
    {    
        S = S + i;

        cout << i << endl;

        if (S > 10) // Nếu S > 10 thì dừng vòng lặp luôn.
            break;
    }
        
    cout << "Tổng S là: " << S;
        
    return 0;
}    
```
    
Biên dịch và chạy chương trình sẽ cho kết quả:

```
1
2
3
4
5
Tổng S là: 15
```

Ta thấy mặc dù vòng lặp có điều kiện dừng là `i <= 15`, nhưng khi đến `i = 5` thì vòng lặp đã bị dừng lại vì điều kiện `S = 10` đã nhận giá trị `true` và lệnh `break` sẽ phát huy tác dụng.

**Sơ đồ hoạt động:**


<img src="https://i.imgur.com/KlZLotG.png">


## 2. Lệnh `continue`

***Tác dụng:*** Sử dụng để bỏ qua một lần lặp. Khi gặp lệnh `continue`, toàn bộ phần lệnh bên dưới lệnh này (thuộc cùng khối lệnh) sẽ bị bỏ qua và chuyển tới lần lặp tiếp theo trong vòng lặp đó. Đối với vòng lặp `for`, lệnh `continue` sẽ điều khiển tới phần ***{Tăng_giảm_biến_đếm};*** còn đối với lệnh `while` và `do...while` thì lệnh `continue` sẽ điều khiển tới phần ***{Điều_kiện_dừng}.***

***Cú pháp:***

```cpp
continue;
```

***Ví dụ:***

```cpp
#include <iostream> 
using namespace std; 
    
int main () 
{ 
    int a = 10; 
    do 
    { 
       if (a == 15) // Nếu a = 15 thì bỏ qua toàn bộ đoạn lệnh bên dưới.
       { 
          a = a + 1; 
          continue; 
       } 
           
       cout << "Gia tri cua a la: " << a << endl; 
       a = a + 1; 
    }
    while(a < 20); 
        
    return 0; 
}
```

Biên dịch và chạy chương trình trên sẽ cho ra kết quả là:

```
Giá trị của a là 10
Giá trị của a là 11
Giá trị của a là 12
Giá trị của a là 13
Giá trị của a là 14
Giá trị của a là 16
Giá trị của a là 17
Giá trị của a là 18
Giá trị của a là 19
```

Ta thấy giá trị $a = 15$ đã bị bỏ qua mất do lệnh `continue`.

***Sơ đồ hoạt động:***



<img src="https://i.imgur.com/bLmEuMM.png">


# VI. Vòng lặp vô hạn

Đôi khi trong chương trình, chúng ta sẽ gặp phải những trường hợp vòng lặp bị lặp vô hạn lần, dẫn đến chương trình không thể trả ra kết quả. Điều này là do thuật toán của chúng ta đã bị sai sót ở đâu đó khiến cho điều kiện dừng của vòng lặp không bao giờ có thể đạt tới giá trị `false`. Cùng xem xét ví dụ sau:

```cpp
for (int i = 1; i <= 10; ++i)
{
    S = S + i;
    i = 1;
}
    
cout << S;
```

Biên dịch đoạn code này sẽ không trả ra được kết quả, nguyên do là vì ở mỗi lần lặp, biến $i$ lại được gán lại bằng $1$ trong khối lệnh, dẫn đến $i$ không bao giờ đạt được giá trị lớn hơn $10$ cả. Vì vậy cần hết sức chú ý vấn đề này trong khi thiết kế giải thuật.

Vòng lặp vô hạn đôi khi cũng có ích, ví dụ trong các trường hợp như lập trình viên không thể xác định được số lần lặp để xử lý một logic nào đó (như trong quá trình nhập dữ liệu từ file mà không biết trước số dòng chẳng hạn). Lúc này cần sử dụng đến vòng lặp vô hạn, và các dạng thường được dùng sẽ là: `while (true)`, `for( ; ;)`, `while (1)`,...Khi điều kiện của vòng lặp `for` bị bỏ trống, nó sẽ mặc định nhận giá trị `true`.

# VII. Tài liệu tham khảo

- https://quantrimang.com/vong-lap-trong-cplusplus-156189
- https://vietjack.com/cplusplus/vong_lap_trong_cplusplus.jsp
- https://www.softwaretestinghelp.com/loops-in-cpp/