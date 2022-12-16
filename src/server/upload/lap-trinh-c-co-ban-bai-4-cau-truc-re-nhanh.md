# I. Biểu thức logic trong C++

## 1. Kiểu dữ liệu `bool`

Trong mọi ngôn ngữ lập trình đều tồn tại hai trạng thái đúng - sai, tương đương với hai giá trị $1$ và $0$. Để biểu diễn hai trạng thái này, trong C++ sử dụng kiểu dữ liệu nguyên thủy `bool`. Để khai báo các biến kiểu `bool`, ta sử dụng cú pháp:

```cpp
bool {Danh_sách_biến};
```

Các biến kiểu `bool` còn được gọi là các ***biến logic***, chúng chỉ được phép nhận hai giá trị là `true` hoặc `false`. Tuy nhiên, như đã nói ở trên, trong C++, `true` tương ứng với $1,$ còn `false` tương ứng với $0$. Vì thế, nếu như các biến kiểu `bool` được gán giá trị $0$ hoặc $1$ thì chương trình biên dịch vẫn sẽ hiểu được.

## 2. Toán tử quan hệ và toán tử logic

Phần này mình đã đề cập tới ở bài học đầu tiên, nhưng ở đây sẽ nhắc lại để bạn đọc dễ hình dung hơn về tác dụng của hai loại toán tử này trong biểu thức logic.

### 2.1. Toán tử quan hệ

Các loại toán tử quan hệ sẽ xác định quan hệ giữa các toán hạng, và trả ra kết quả là quan hệ đó đúng (`true`) hay không đúng (`false`). Bảng dưới đây thể hiện các quan hệ giữa hai toán hạng $a=5, b=10$:


<img  width="650" src="https://i.imgur.com/0LTYN93.png">


### 2.2. Toán tử logic

Các toán tử logic sẽ xác định quan hệ về mặt đúng/sai giữa các toán hạng logic. Giả sử ta có hai toán hạng logic $A=\text{true}$ và $B=\text{false}$, bảng dưới đây thể hiện quan hệ logic giữa chúng:


<img width="650" src="https://i.imgur.com/mW3kz47.png">



## 3. Biểu thức logic

Biểu thức logic là những biểu thức thể hiện quan hệ giữa các biểu thức với nhau. Chúng sử dụng các toán tử quan hệ hoặc logic để kết nối các biểu thức thành phần, và luôn luôn trả về một trong hai giá trị `true` hoặc `false`. Để xây dựng một biểu thức quan hệ, ta viết theo cú pháp:

```cpp
{Biểu_thức_A} {Phép_toán} {Biểu_thức_B}
```

Trong đó, ***{Biểu_thức_A}, {Biểu_thức_B}*** có thể là các biến, hằng, hàm trả về giá trị hay các biểu thức toán học. Còn ***{Phép_toán}*** là một trong những toán tử quan hệ hoặc toán tử logic thuộc tập sau: {`>, <, >=, <=, ==, !=, &&, ||`}. Ví dụ dưới đây là một vài biểu thức logic:

```cpp
5 > 8
a != b && b != c
delta == 0
5 != 8 || 4 == 2
```

Những biểu thức này sẽ được tính toán theo đúng thứ tự ưu tiên của toán tử (đã đề cập trong bài $2$). Lấy ví dụ, trong biểu thức `a != b && b != c`, do toán tử `!=` có độ ưu tiên cao hơn toán tử `&&` nên chương trình sẽ tính toán hai biểu thức `a != b` và `b != c` trước, rồi mới lấy kết quả của chúng để thực hiện phép toán `&&`.

## 3. Toán tử `!` trong biểu thức logic

Trong C++, toán tử quan hệ `!` là một toán tử khá đặc biệt. Khác với các toán tử `&&` hay `||`, toán tử `!` không dùng để kết nối các biểu thức logic, mà dùng để ***đảo ngược*** kết quả của một biểu thức logic. Cú pháp sử dụng toán tử này như sau:

```cpp
!({Biểu_thức_logic})
```

Khi đó, nếu ***{Biểu_thức_logic}*** có giá trị là `true` thì cả biểu thức sẽ có kết quả ngược lại là `false`, tương tự với trường hợp ***{Biểu_thức_logic}*** có giá trị `false`. Chẳng hạn, biểu thức `5 > 4` có giá trị là `true`, nhưng biểu thức `!(5 > 4)` sẽ có giá trị là `false`.

# II. Mệnh đề "Nếu...thì" và "Nếu không...thì"

Trong cuộc sống nói chung và trong Tin học nói riêng, có rất nhiều tình huống mà một công việc chỉ được thực hiện nếu như có một hoặc một số điều kiện được thỏa mãn. Lấy ví dụ, mẹ bạn Sơn nói với bạn Sơn rằng: "Nếu cuối tuần mẹ rảnh thì cả nhà sẽ đi chơi". Điều kiện cụ thể trong câu nói này là "nếu mẹ rảnh", và nếu điều kiện này thỏa mãn thì công việc sẽ được thực hiện là "cả nhà sẽ đi chơi". Cách diễn đạt như vậy là cách diễn đạt ở dạng thiếu:
$$\text{Nếu...thì...}$$

Nếu như mẹ bạn Sơn thay đổi câu nói thành: "Nếu cuối tuần mẹ rảnh thì cả nhà sẽ đi chơi, còn nếu mẹ không rảnh thì chúng ta sẽ ở nhà", thì cách diễn đạt trở thành cách diễn đạt dạng đủ:
$$\text{Nếu...thì..., Nếu không thì... (Ngược lại thì...)}$$

Trong mọi ngôn ngữ lập trình đều cung cấp cấu trúc để diễn tả các mệnh đề có dạng như trên, gọi là ***Cấu trúc rẽ nhánh***. Trong C++, có hai loại cấu trúc rẽ nhánh là `if...else...` và `switch...case...` Đây là một trong những cấu trúc căn bản của mọi ngôn ngữ lập trình, có tác dụng điều khiển các khối lệnh trong chương trình và tạo lập nên các thuật toán.

# III. Câu lệnh `if` và `if...else...`

C++ sử dụng câu lệnh `if` và `if...else` để diễn tả hai mệnh đề điều kiện thiếu và đủ. Cú pháp của hai dạng như sau:
- Dạng thiếu: 

```cpp
if ({Biểu_thức_logic})
    {Câu_lệnh};
```

- Dạng đủ: 

```cpp
if ({Biểu_thức_logic})
    {Câu_lệnh_1};
else 
    {Câu_lệnh_2};
```

Vế điều kiện trong các mệnh đề $\text{Nếu...thì}$ hoặc $\text{Nếu không...thì}$ chính là các ***{Biểu_thức_điều_kiện}*** trong lập trình. Chẳng hạn, mệnh đề điều kiện **a chia hết cho 5** có thể viết thành biểu thức điều kiện `a % 5 == 0` trong C++.

Trong trường hợp có nhiều câu lệnh tạo thành một khối lệnh thì ta sẽ đặt tất cả các câu lệnh đó trong cặp dấu `{}` theo cú pháp dưới đây:

```cpp
if ({Biểu_thức_logic})
{
    {Khối_lệnh_1};
}
else 
 {
     {Khối_lệnh_2};
 }
 ```

***Các bước thực thi:***
- Ở dạng thiếu, ***{Biểu_thức_logic}*** sẽ được kiểm tra, nếu như điều kiện đó đúng thì ***{Câu_lệnh}*** sẽ được thực hiện, ngược lại thì ***{Câu_lệnh}*** bị bỏ qua.
- Ở dạng đủ, ***{Biểu_thức_logic}*** sẽ được kiểm tra, nếu như điều kiện đó đúng thì thực hiện ***{Câu_lệnh_1},*** ngược lại thì thực hiện ***{Câu_lệnh_2}.***

***Ví dụ 1:*** Để thực hiện tìm giá trị nhỏ nhất trong hai số nguyên $a$ và $b$, ta viết như sau:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a, b;
    cin >> a >> b;
    
    int min_value = 0;
    if (a < b)
        min_value = a;
    else 
        min_value = b;
}
```

***Ví dụ 2:*** Xác định một số nguyên $a$ có chia hết cho $3$ hay không:

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a;
    cin >> a;
    
    if (a % 3 == 0)
        cout << "a chia hết cho 3";
    else 
        cout << "a không chia hết cho 3";
}
```

# IV. Câu lệnh `if` lồng nhau và biểu thức logic gộp

## 1. Câu lệnh `if` lồng nhau

Trong quá trình lập trình, đôi khi chúng ta phải kiểm tra cùng một lúc nhiều biểu thức logic rồi mới quyết định thực hiện một công việc nào đó. Chẳng hạn, để kết luận một bộ ba $(a, b, c)$ có phải là ba cạnh của một tam giác hay không, chúng ta cần kiểm tra tới vài điều kiện khác nhau: 
- $(a > 0), (b > 0)$ và $(c > 0)$.
- $(a + b > c), (a + c > b)$ và $(b + c > a)$.

Khi đó, ta có thể viết nhiều câu lệnh `if` gộp vào nhau để kiểm tra các điều kiện nhiều cùng lúc:

```cpp
if (a > 0)
    if (b > 0)
        if (c > 0)
	    if (a + b > c)
	        if (a + c > b)
		    if (b + c > a)
			...
```

Cú pháp tổng quát của câu lệnh `if` lồng nhau sẽ là:

```cpp
if ({Biểu_thức_logic_1})
    if ({Biểu_thức_logic_2})
	if ({Biểu_thức_logic_3})
	...
```

Nếu như biểu thức ở dạng đầy đủ, tức là bao gồm cả `else`, thì chúng ta cũng có thể gộp tương tự:

```cpp
if ({Biểu_thức_logic_1})
{
    if ({Biểu_thức_logic_2})
    {
	if ({Biểu_thức_logic_3})
	...
	else
	    {Câu_lệnh_3}
    }
    else
    	{Câu_lệnh_2};
}
else
    {Câu_lệnh_1};
```

Khi viết ở dạng đầy đủ, các câu lệnh thuộc câu lệnh `if` bên trong nên được đặt trong một cặp dấu `{}` để phân tách với vế `else` của câu lệnh `if` bên ngoài. Chương trình sẽ tuần tự kiểm tra từng biểu thức logic từ ngoài vào trong, nếu tất cả các biểu thức đều có giá trị `true` cho tới biểu thức trong cùng thì câu lệnh trong cùng sẽ được thực hiện. Ngược lại thì chương trình sẽ thực hiện tới vế `else` của câu lệnh `if` đầu tiên có biểu thức logic của nó trả ra giá trị `false`.

## 2. Biểu thức logic gộp

Dễ dàng nhận thấy, nếu như với mỗi điều kiện mà ta lại sử dụng một câu lệnh `if`, thì chương trình sẽ rất dài và khó kiểm soát. Những trường hợp như vậy, thay vì viết nhiều câu lệnh `if`, thì ta sử dụng tới ***biểu thức logic gộp***. Hiểu một cách đơn giản, ***biểu thức logic gộp*** là nhiều biểu thức logic kết hợp lại với nhau bằng các toán tử logic `&&` hoặc `||`. Khi kết hợp các biểu thức logic lại với nhau, nếu như bạn muốn biểu thức nào đó được ưu tiên tính toán trước thì phải đặt chúng trong cặp ngoặc `()`. Cùng xem vài ví dụ:

```cpp
(a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a)
(a + b == 0 || (a + b != 0 && a != b))
(5 * 3 <= 15 && (5 == 5 || 5 == 6))
```

Nguyên tắc tính toán của các biểu thức logic sẽ được tính toán theo thứ tự ưu tiên của toán tử: Trong ngoặc trước, ngoài ngoặc sau, rồi tới các toán tử khác. Kết quả của cả biểu thức sẽ phụ thuộc vào sự kết hợp giữa các biểu thức logic thành phần là `&&` hay `||`. Nếu quan hệ giữa chúng là `&&` - **đồng thời**, thì tất cả các biểu thức thành phần đều phải có giá trị `true` mới khiến cho biểu thức ban đầu mang giá trị `true`. Ngược lại, nếu quan hệ giữa chúng là `||` - **hoặc**, thì chỉ cần một trong số các biểu thức thành phần mang giá trị `true`, cả biểu thức sẽ mang giá trị `true`. Chẳng hạn, với biểu thức `(5 * 3 <= 15 && (5 == 5 || 5 == 6))`, chương trình sẽ tính nó như sau:
- Đầu tiên xét biểu thức trong ngoặc: `(5 == 5 || 5 == 6)`. Biểu thức này có kết quả là `true`, do `5 == 5` là `true` còn `5 == 6` là `false`, đồng thời quan hệ giữa chúng chỉ là `||` - **hoặc**.
- Kế đến xét biểu thức `5 * 3 <= 15`. Biểu thức này tất nhiên có giá trị là `true`.
- Cuối cùng gộp kết quả của `(5 * 3 <= 15)` và `(5 * 3 <= 15 && (5 == 5 || 5 == 6))` bằng toán tử `&&`. Do cả hai biểu thức thành phần đều có giá trị `true` nên cả biểu thức ban đầu sẽ có giá trị `true`.

Nói chung, để đặt được đúng các biểu thức logic theo thứ tự mong muốn, các bạn cần có kiến thức vững về độ ưu tiên toán tử, nghĩa là biết cái gì sẽ được tính trước, cái gì sẽ được tính sau để đặt các biểu thức vào trong ngoặc cho đúng. Các bạn có thể xem lại bài $2$ để biết độ ưu tiên của các toán tử trong C++ như thế nào nhé!

# V. Sử dụng toán tử điều kiện thay cho câu lệnh if...else

Ở bài đầu tiên, các bạn đã được giới thiệu về một loại toán tử đặc biệt trong C++, đó là toán tử hỗn hợp. Trong số đó, có một loại với cú pháp như sau:

```
(X) ? A : B
```

trong đó `(X)` là một biểu thức logic, `A` và `B` là các biểu thức hoặc câu lệnh. Thực ra, đây chính là một cách viết khác của câu lệnh `if...else`. Thay vì viết:

```cpp
if (X)
{
    A;
}
else 
{
   B;
}
```

thì ta sẽ viết như trên, cách viết đó sẽ ngắn gọn hơn rất nhiều. Chẳng hạn, muốn kiểm tra một số nguyên $N$ có chia hết cho $2$ hay không, thay vì viết:

```cpp
if (N % 2 == 0)
    cout << "N chia hết cho 2";
else 
    cout << "N không chia hết cho 2";
```

thì ta viết:

```cpp
(N % 2 == 0) ? cout << "N chia hết cho 2" : cout << "N không chia hết cho 2";
```

Ngoài ra, khi sử dụng toán tử này, nếu như cần thực hiện nhiều câu lệnh với một điều kiện, thì ta có thể phân tách chúng bằng dấu `,` mà không cần phải tạo khối lệnh bằng cặp dấu `{}` như câu lệnh `if..else` truyền thống. Cú pháp viết như sau:

```
(X) ? A1, A2,..., AN : B1, B2,..., BN;
```

Tuy nhiên, có một lưu ý rằng, bản chất của cặp toán tử `(X) ? A : B` thực ra là ***trả về*** giá trị `A` nếu như biểu thức logic `(X)` có giá trị `true`, ngược lại thì ***trả về***  giá trị `B`. Do đó, chúng ta không được sử dụng câu lệnh ở vế `A` hoặc vế `B` khác kiểu nhau. Chẳng hạn, câu lệnh sau sẽ là không hợp lệ:

```cpp
int b = 0;
(N % 2 == 0 && N % 3 == 0) ? cout << "N chia hết cho 6" : b = 1;
```

Lí do vì câu lệnh này có vế `A` là một câu lệnh in ra, còn vế `B` lại là biểu thức số học. Hơi khó để phân biệt, nhưng nếu làm nhiều bài tập các bạn sẽ biết rằng những biểu thức nào có thể kết hợp với nhau. Tuy nhiên, cách viết này không được ưu tiên, bởi vì nó có thể rất rối mắt trong những trường hợp câu lệnh dài và nhiều. Chúng ta chỉ nên sử dụng toán tử này khi cần thực hiện những câu lệnh rất ngắn thôi!

# VI. Cấu trúc lựa chọn `switch...case...`

## 1. Lựa chọn nhiều trường hợp

Đôi khi, người ta cần kiểm tra rất nhiều trường hợp xảy ra của một đối tượng, và ứng với mỗi trường hợp ta sẽ có cách xử lý khác nhau. Ví dụ, một cửa hàng quần áo đặt biển quảng cáo như sau:
- Nếu mua $1$ chiếc áo, giá tiền là $50.000$ VNĐ/chiếc.
- Nếu mua $2$ chiếc áo, giá tiền là $45.000$ VNĐ/chiếc.
- Nếu mua $3$ chiếc áo, giá tiền là $40.000$ VNĐ/chiếc.
- Nếu mua nhiều hơn $3$ chiếc áo, giá tiền là $35.000$ VNĐ/chiếc và được tặng thêm một đôi tất.

Ở đây, đối tượng đang được xem xét là ***số lượng chiếc áo được mua***, và ứng với mỗi giá trị $1, 2, 3$ hoặc nhiều hơn $3,$ sẽ có một đơn giá khác nhau cho mỗi chiếc áo. Những cách diễn đạt như vậy được gọi là ***mệnh đề lựa chọn***. C++ cung cấp một cấu trúc để biểu diễn các mệnh đề dạng lựa chọn là `switch...case...`.

## 2. Cấu trúc lựa chọn `switch...case...`

Cấu trúc `switch...case...` dùng để lựa chọn trường hợp giá trị cho một đối tượng xác định, và quyết định sẽ làm công việc gì tương ứng với mỗi trường hợp xảy ra.

***Cú pháp:***

```cpp
switch ({Biểu_thức})
{
    case {Giá_trị_1}:
        {Câu_lệnh_1};
        break;
        
    case {Giá_trị_2}:
        {Câu_lệnh_2};
        break;
        
    case {Giá_trị_3}:
        {Câu_lệnh_3};
        break;
    ...
        
    default:
        {Câu_lệnh_mặc_định};
}    
```
   
Trong đó, ***{Biểu_thức}*** là một biến/biểu thức, hoặc hàm có giá trị, thường là kiểu số nguyên hoặc kiểu ***chuỗi - kí tự***. Các giá trị $1, 2, 3...$ phải là các hằng số. Nếu như giá trị của đối tượng không trùng với bất kỳ giá trị nào trong danh sách thì câu lệnh ở `default` sẽ được thực hiện.

Trong trường hợp nhiều giá trị có chung công việc thực hiện, ta có thể viết theo cách sau:

```cpp
case {Giá_trị_1} : case {Giá_trị_2} : ... : case {Giá_trị_n}:
    {Câu_lệnh};
    break;
```

***Ví dụ 1:*** Nhập vào một tháng bất kỳ trong năm, in ra màn hình số ngày của tháng đó.

```cpp
int month;
cin >> month;
    
switch (month)
{
    case 1 : case 3 : case 5 : case 7 : case 8 : case 10 : case 12:
        cout << "Có 31 ngày";
        break;
            
    case 2:
        cout << "Có 28 hoặc 29 ngày";
        break;
            
    default:
        cout << "Có 30 ngày";
        break;
}
```

***Ví dụ 2:*** Nhập vào điểm môn học dạng chữ của một sinh viên $(A, B, C, D, F),$ hãy đưa ra điểm tích lũy tương ứng của môn học đó $(4, 3, 2, 1, 0)?$

```cpp
char point;
cin >> point;
    
int CPA = 0; // Điểm tích lũy môn học.
switch (point)
{
    case 'A': 
        CPA = 4;
        break;
            
    case 'B':
        CPA = 3;
        break;
            
    case 'C':
        CPA = 2;
        break;
            
    case 'D':
        CPA = 1;
        break;
            
    default:
        CPA = 0;
        break;
}
```

# VII. Tài liệu tham khảo

- https://kienthucitech.blogspot.com/2012/08/ccau-truc-re-nhanh.html
- Sách giáo khoa Tin học lớp $11$.
- https://www.programiz.com/cpp-programming/if-else