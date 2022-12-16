# I. Phân chia chương trình thành từng hàm

## 1. Kĩ thuật lập trình hướng cấu trúc

Cùng xem xét một ví dụ sau: *Cho ba số nguyên dương $a, b, c,$ đều không nhỏ hơn $2,$ hãy kiếm tra xem những số nào là số nguyên tố và đưa ra thông báo số đó là số nguyên tố?*.

Ta biết rằng một số nguyên tố sẽ không chia hết cho số nào ngoài $1$ và chính nó. Áp dụng những gì đã học từ các bài trước, ta có thể xây dựng một chương trình như sau:

```cpp=	
#include <iostream>

using namespace std;

int main()
{
    int a, b, c;
    cin >> a >> b >> c;

    bool kt = true; // Biến logic kt dùng để kiểm tra a có phải số nguyên tố không.
    for (int i = 2; i < a; ++i)
        if (a % i == 0) 
        {
            kt = false;
            break; // Vì a đã không phải số nguyên tố nên có thể dừng kiểm tra luôn.
        }

    if (kt == true)
        cout << a << " là số nguyên tố";
    else 
        cout << a << " không là số nguyên tố";

    // Thực hiện hoàn toàn tương tự đối với b và c.
    kt = true;
    for (int i = 2; i < b; ++i)
        if (b % i == 0) 
        {
            kt = false;
            break; // Vì a đã không phải số nguyên tố nên có thể dừng kiểm tra luôn.
        }

    if (kt == true)
        cout << b << " là số nguyên tố";
    else 
        cout << b << " không là số nguyên tố";

    kt = true;
    for (int i = 2; i < c; ++i)
        if (c % i == 0) 
        {
            kt = false;
            break; // Vì a đã không phải số nguyên tố nên có thể dừng kiểm tra luôn.
        }

    if (kt == true)
        cout << c << " là số nguyên tố";
    else 
        cout << c << " không là số nguyên tố";
	
    return 0;
}
```
    
Biên dịch và chạy chương trình trên với $a=2, b=5, c = 9$ sẽ cho ra kết quả:

```
2 là số nguyên tố
5 là số nguyên tố
9 không là số nguyên tố
```
	
Vấn đề chúng ta nhận thấy ở đây là, quá trình kiểm tra số nguyên tố đối với từng số là quá trình tương tự nhau, chỉ thay đổi giá trị số thôi, nhưng chúng ta phải viết lại tới ba lần khiến cho chương trình rất dài. Điều này sẽ còn tệ hơn nữa nếu như cần kiểm tra $4, 5,...$ thậm chí là $1000$ số!

Trên thực tế, lập trình chính là xây dựng một quá trình giải bài toán gồm nhiều bước khác nhau, mỗi bước sẽ giải quyết một công việc cụ thể. Rất nhiều trường hợp ta sẽ gặp phải các công việc tương tự nhau, để tránh phải viết đi viết lại một đoạn code gây lãng phí thời gian, ta sẽ chia chương trình thành các hàm con, mỗi hàm phụ trách một công việc nhất định và tất cả sẽ được gọi ra trong một hàm chính. Cách lập trình như vậy gọi là ***lập trình hướng cấu trúc*** hay ***lập trình module hóa***. Ưu điểm của phương pháp này là:

- Tư duy giải thuật rõ ràng.
- Chương trình đơn giản và dễ hiểu.
- Có thể tái sử dụng lại các đoạn code tại nhiều vị trí trong chương trình mà không phải viết nhiều lần.
- Dễ dàng theo dõi và kiểm tra, chỉnh sửa giải thuật.

Cách lập trình này rất phù hợp trong lập trình thi đấu, vì mỗi giải thuật thường chỉ áp dụng cho những bài toán nhất định. Tất nhiên, nó cũng có những nhược điểm, nhưng chúng ta sẽ không bàn đến trong bài học này.

## 2. Định nghĩa về hàm. Hàm tự định nghĩa và hàm dựng sẵn

C++ là một ngôn ngữ lập trình có khả năng hướng cấu trúc, bao gồm một hàm `main()` và các hàm con khác trong chương trình. Hàm là một khối các lệnh dùng để xử lý một phần công việc nhỏ nào đó trong chương trình.  

Có hai loại hàm trong C++ là ***hàm tự định nghĩa*** và ***hàm dựng sẵn*** được cung cấp bởi các thư viện của C++. Sử dụng linh hoạt các hàm sẽ hỗ trợ rất tốt cho lập trình viên trong quá trình xây dựng chương trình.

# II. Các hàm toán học dựng sẵn trong C++

Trong thư viện chuẩn của C++ cung cấp khá nhiều hàm dựng sẵn giúp ích cho người lập trình, và một trong số đó là các hàm toán học. Để sử dụng các hàm toán học trong C++, đầu tiên ta cần khai báo thư viện và không gian tên chứa chúng:
    
```cpp
#include <cmath>

using namespace std;
```

Bảng dưới đây là một số hàm thường sử dụng trong quá trình làm việc với C++:



![](https://cdn.ucode.vn/uploads/2247/upload/wyCEnenT.png)


# III. Các bước định nghĩa và sử dụng một hàm

## 1. Khai báo hàm

Giống như các biến và hằng, một hàm phải được khai báo và định nghĩa trước khi sử dụng. Một khai báo hàm có thể đặt ở bất kỳ đâu trong chương trình. Cú pháp khai báo một hàm như sau:

```cpp
{Kiểu_trả_về} {Tên_hàm}({Danh_sách_tham số});
```
    
Trong đó ta có:

- ***{Kiểu_trả_về}:*** Mỗi hàm đều phải trả về một giá trị nào đó. ***{Kiểu_trả_về}*** là kiểu dữ liệu của giá trị mà hàm đó sẽ trả về. Ngoài ra, C++ cho phép tạo ra những hàm chỉ thực hiện công việc mà không trả ra giá trị nào cả, khi đó ***{Kiểu_trả_về}*** sẽ là `void`. 
- ***{Tên_hàm}:*** Là tên mà người dùng đặt cho hàm, quy ước đặt tên theo đúng convention của C++ là ***snake_case*** và không nên trùng với các từ khóa của hệ thống.
- ***{Danh_sách_tham số}:*** Khi sử dụng một hàm để thực hiện công việc nào đó, ta cần cung cấp dữ liệu đầu vào cho hàm. Các tham số chính là các biến lưu trữ những dữ liệu đó để hàm sử dụng trong quá trình tính toán. Danh sách tham số không bắt buộc phải luôn luôn có.

Ví dụ, dưới đây là một vài khai báo hàm hợp lệ:

```cpp
int sum(int a, int b); // Hàm tính tổng hai số nguyên a và b.
	
double get_circle_area(double d) // Hàm tính diện tích hình tròn có đường kính là d.

long long multiply(long long a, long long b, long long c) // Hàm tính tích ba số nguyên a, b, c.
```

## 2. Định nghĩa hàm

Phần định nghĩa hàm là phần quan trọng nhất của một hàm, nó quyết định hàm đó sẽ làm công việc gì và trả ra kết quả là gì. Cú pháp định nghĩa hàm như sau:

```
{Khai_báo_hàm}
{
    {Thân_hàm};
}
```

Trong đó, phần ***{Thân_hàm}*** chứa các câu lệnh của hàm. Đối với hàm có ***{Kiểu_trả_về}*** là một ***kiểu dữ liệu*** nào đó thì bắt buộc phải có ít nhất một dòng lệnh `return {Giá_trị_trả_về};` trong thân hàm. Còn đối với hàm có ***{Kiểu_trả_về}*** là `void` thì không cần phải (và cũng không thể) `return` một giá trị nào cả. Phần định nghĩa hàm có thể đặt ngay bên dưới khai báo hàm, hoặc sau khi đã khai báo hàm rồi mới định nghĩa ở một vị trí nào đó trong chương trình.

***Ví dụ:*** Hàm dưới đây trả về giá trị lớn nhất giữa hai số nguyên $a$ và $b$:

```cpp=
int max_value(int a, int b)
{
    if (a > b)
        return a;
    else 
        return b;
}
```
    
## 3. Lời gọi hàm

Một hàm sau khi được định nghĩa, nếu muốn hoạt động thì phải được gọi ra trong hàm `main()`, hoặc được gọi trong một hàm khác và hàm đó được gọi trong `main()`. 

Việc hàm được gọi ra như thế nào cũng tùy thuộc vào ***{Kiểu_trả_về}*** của hàm. Nếu như ***{Kiểu_trả_về}*** là một ***kiểu dữ liệu*** - nghĩa là hàm có giá trị trả về - thì lời gọi hàm đó được phép sử dụng kết hợp trong các câu lệnh gán, biểu thức tính toán hoặc logic. Ngược lại nếu ***{Kiểu_trả_về}*** là `void` thì hàm đó chỉ được phép đứng đơn lẻ khi gọi ra.

***Ví dụ 1:*** Hàm `int max_value(int a, int b)` được gọi ra trong chương trình chính để tìm giá trị lớn nhất của $3$ cặp số khác nhau:

```cpp=
#include <iostream>

using namespace std;

int max_value(int a, int b)
{
    if (a > b)
        return a;
    else 
        return b;
}
    
int main()
{
    int x1, y1, x2, y2, x3, y3;
    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;
        
    // Lời gọi hàm.
    cout << "Max giữa x1 và y1 là: " << max_value(x1, y1) << endl; 
    cout << "Max giữa x2 và y2 là: " << max_value(x2, y2) << endl;
    cout << "Max giữa x3 và y3 là: " << max_value(x3, y3);
        
    return 0;
}
```

Kết quả chạy chương trình với $x1 = 1, y1 = 2, x2 = 5, y2 = 4, x3 = 10, y3 = 10$ là:

```
Max giữa x1 và y1 là: 2
Max giữa x2 và y2 là: 5
Max giữa x3 và y3 là: 10
```
    
Ta thấy ở ví dụ trên, cần tìm giá trị lớn nhất giữa ba cặp số $(x, y)$ khác nhau. Nếu không sử dụng hàm, ta sẽ phải viết lại quy trình tìm giá trị lớn nhất đủ $3$ lần, nhưng khi dùng hàm thì việc kiểm tra chỉ cần viết một lần trong hàm và gọi hàm đó ra sử dụng ba lần với tham số truyền vào lần lượt là các cặp số cần kiểm tra thôi. Đây chính là lợi thế của việc viết chương trình thành các hàm.

***Ví dụ 2:*** Dùng hàm `void sum(int a, int b)` để tính tổng hai số $a$ và $b,$ sau đó lưu vào biến $s$. Vì kiểu của hàm là `void` nên chỉ có thể gọi hàm bằng lời gọi đơn lẻ:

```cpp=
#include <iostream>

using namespace std;

int s = 0;

void sum(int a, int b)
{
    s = a + b;
}
    
int main()
{
    int a = 5, b = 6;
    sum(a, b);
        
    cout << s;
        
    return 0;
}
```

Kết quả chạy chương trình: 

```
11
```

# IV. Tham số của hàm

Tham số thực chất là các biến đại diện cho dữ liệu truyền vào hàm khi có một lời gọi hàm nào đó. Khi dữ liệu truyền vào hàm, nó sẽ được lưu vào tham số và hàm sẽ tính toán bằng dữ liệu trên tham số đó. Tham số được phân làm hai loại: Tham số  thực sự và tham số hình thức. 

## 1. Tham số thực sự

Chính là các biến, hằng ở bên ngoài truyền vào trong một hàm. Khi truyền các giá trị này vào hàm, các giá trị đó sẽ được sử dụng dưới tên của tham số hình thức. Lấy ví dụ: 

```cpp=
int sum(int a, int b)
{
    return a + b;
}

int main()
{
    int a = 10, b = 5;
    cout << sum(a, b);
}
```   
	
Trong hàm `main()`, ta thấy hai biến $a$ và $b$ được truyền vào hàm `int sum(int a, int b);`. Ở đây, $a$ và $b$ chính là các tham số thực sự, vì chúng chứa dữ liệu thực tế cần thao tác.
    
## 2. Tham số hình thức

Là danh sách tham số đứng phía sau khai báo của một hàm. Những tham số này sẽ đại diện cho dữ liệu truyền vào hàm, nhờ vào tham số mà chúng ta có thể tái sử dụng hàm với rất nhiều các bộ dữ liệu khác nhau. Có hai cách truyền tham số thực sự từ bên ngoài vào hàm: 

### 2.1. Truyền tham trị

Với cách truyền tham số này, hàm sẽ tạo một bản sao của dữ liệu được truyền vào, sau đó thực hiện các tính toán trong hàm với dữ liệu đó mà không làm thay đổi dữ liệu bên ngoài truyền vào. Ví dụ:

```cpp=
#include <iostream>

using namespace std;

void increase(int x) // Tăng giá trị biến x dùng tham trị.
{
    x = x + 2;        
}

int main()
{
    int a = 5;
    cout << "Giá trị a ban đầu: " << a << endl;

    increase(a);
    cout << "Giá trị a mới: " << a;
}
```

Chạy chương trình này sẽ thu được kết quả:

```
Giá trị a ban đầu: 5
Giá trị a mới: 5
```

Ta thấy hai giá trị $a$ lúc đầu và lúc sau vẫn giữ nguyên. Nguyên do là vì, giá trị của biến $a$ ở hàm `main()` khi thực hiện lời gọi `increase(a)` hoàn toàn không bị ảnh hưởng, chương trình đã tạo ra một bản sao của biến $a$ này để truyền vào hàm `increase(int x)`, do đó biến $a$ trong hàm `main()` và tham số $x$ trong hàm `increase(int x)` là độc lập.

***Khi nào sử dụng truyền tham trị:*** Nên sử dụng cách truyền tham trị trong những trường hợp mà dữ liệu truyền vào chỉ dùng để tính toán trung gian cho những kết quả khác.

### 2.2. Truyền tham chiếu

Với tham chiếu, biến truyền vào sẽ được truyền thẳng địa chỉ của nó vào trong hàm nhưng với một cái tên khác, và dữ liệu bị thay đổi trong hàm sẽ được cập nhật sang dữ liệu gốc đã truyền vào. Muốn truyền dữ liệu bằng tham chiếu, chỉ cần thêm toán tử `&` ở phía trước tham số hình thức trong khai báo hàm. Ví dụ:

```cpp=
#include <iostream>

using namespace std;

void increase(int &x) // Tăng giá trị biến x dùng tham trị.
{
    x = x + 2;        
}

int main()
{
    int a = 5;
    cout << "Giá trị a ban đầu: " << a << endl;

    increase(a);
    cout << "Giá trị a mới: " << a;
}
```

Chạy chương trình này sẽ thu được kết quả:

```
Giá trị a ban đầu: 5
Giá trị a mới: 7
```

Giá trị $a$ lúc sau so với ban đầu đã thay đổi. Lí do là vì khi sử dụng tham chiếu để truyền giá trị $a$ vào thì chính địa chỉ của biến $a$ được truyền vào hàm, nhưng dưới cái tên là $x,$ từ đó mọi thay đổi của tham số $x$ sẽ được cập nhật thẳng lên $a$.

***Khi nào sử dụng truyền tham chiếu:*** Khi cần chuyển dữ liệu đã xử lý ra ngoài hàm để sử dụng trong các hàm khác.

Trong trường hợp muốn sử dụng tham chiếu nhưng không muốn dữ liệu bị cập nhật thay đổi lên biến gốc, ta sử dụng cú pháp khai báo như sau: 

```cpp
{Kiểu_trả_về} {Tên_hàm} (const {Kiểu_dữ_liệu} &{Tên_tham_chiếu}) 
```
    
***Ví dụ:***

```cpp
void increase(const int &a);
    
int get_sum(const int &a, const int &b, int &sum);
```

# V. Biến toàn cục và Biến cục bộ

Tùy vào vị trí khai báo biến mà chúng ta có thể chia các biến trong C++ ra làm hai loại: Biến toàn cục (global variables) và Biến cục bộ (local variables). Sử dụng thành thạo hai loại biến này có ý nghĩa rất quan trọng trong lập trình nói chung và lập trình thi đấu nói riêng. 

## 1. Biến toàn cục (global variables)

***Định nghĩa:*** Là các biến được khai báo ở ngoài hàm, có giá trị kể từ vị trí nó được khai báo cho tới hết chương trình. Mọi hàm kể từ vị trí khai báo đều có thể sử dụng biến toàn cục. Khi khai báo biến toàn cục, các biến sẽ nhận giá trị mặc định là $0$ đối với kiểu số, và giá trị rỗng đối với kiểu chuỗi hoặc kí tự.

***Ví dụ:***

```cpp=
#include <iostream>

using namespace std;

int x, y; // Biến toàn cục x và y.

void func1() // Hàm thứ nhất.
{
    x = x + 1;
    y = y + 1;

    cout << "Giá trị lần 1: " << x << ' ' << y << endl;
}

void func2() // Hàm thứ hai.
{
    x = x * 2;
    y = y * 2;

    cout << "Giá trị lần 2: " << x << ' ' << y;
}

int main()
{
    // Gọi hai hàm trong main để thay đổi giá trị x, y.
    func1();
    func2();

    return 0;
}
```

***Kết quả chạy chương trình:***

```
Giá trị lần 1: 1 1
GIá trị lần 2: 2 2
```

Ta thấy hai biến $x$ và $y$ sẽ bị thay đổi ở cả hai hàm `func1()` và `func2()`, do $x$ và $y$ là hai biến toàn cục.

## 2. Biến cục bộ (local variables)

***Định nghĩa:*** Là các biến được khai báo ở trong một hàm, chỉ có tác dụng cho tới hết khối lệnh mà nó thuộc vào và sẽ biến mất khi khối lệnh kết thúc. Khi khai báo các biến cục bộ, chúng sẽ nhận giá trị mặc định là những giá trị tùy ý sinh ra bởi chương trình. Do đó, chúng ta cần lưu ý luôn luôn khởi tạo giá trị ban đầu cho các biến cục bộ trước khi thực hiện tính toán liên quan tới biến đó (trừ khi ta sẽ nhập giá trị cho biến đó sau khi khai báo).

***Ví dụ:***

```cpp=
#include <iostream>

using namespace std;

int get_sum1()
{
    int a = 5, b = 6; // Hai biến cục bộ.

    return a + b; // Trả về tổng a và b;
}

int get_sum2()
{
    int a = 4, b = 8; // Hai biến cục bộ.

    return a + b;
}

int main()
{
    cout << "Giá trị lần 1: " << get_sum1() << endl;
    cout << "Giá trị lần 2: " << get_sum2();
}
```

***Kết quả:***

```
Giá trị lần 1: 11
Giá trị lần 2: 12
```

Ta thấy hai biến $a$ và $b$ ở hàm `get_sum1()` là hoàn toàn độc lập so với hai biến $a$ và $b$ ở hàm `get_sum2()`, mặc dù chúng có cùng tên. Lí do là vì $a$ và $b$ ở mỗi hàm đều là những biến cục bộ, khi kết thúc hàm thì chúng sẽ bị hủy đi, nên các hàm khác sẽ không nhầm lẫn những biến đó với nhau.

# VI. Nạp chồng hàm và nạp chồng toán tử

## 1. Nạp chồng hàm

Ngôn ngữ C++ cho phép người dùng định nghĩa ra các hàm giống tên và chức năng với nhau, nhưng khác nhau về kiểu trả về hoặc khác nhau về tham số. Khi gọi hàm, chương trình sẽ dựa vào đặc điểm của tham số trong lời gọi để quyết định hàm nào sẽ được gọi. Các hàm trùng tên, tính năng tương tự nhưng khác về tham số như vậy được gọi là các ***hàm nạp chồng***. Hàm nạp chồng giúp lập trình viên tiết kiệm thời gian hơn khi không phải mất công nghĩ ra các tên hàm khác nhau cho nhiều biến thể của cùng một công việc.

***Ví dụ:*** Dưới đây định nghĩa hàm `tong()` nhưng với ba kiểu tham số khác nhau:

```cpp
#include <bits/stdc++.h>
using namespace std;

int tong(int a, int b) // Tính tổng hai số nguyên.
{
    return a + b;
}

int tong(int a, int b, int c) // Tính tổng ba số nguyên.
{
    return a + b + c;
}

double tong(double a, double b) // Tính tổng hai số thực.
{
    return a + b;
}

int main()
{
    int a = 1, b = 2, c = 3;
    cout << tong(a, b) << endl; // Sử dụng hàm thứ nhất.
    cout << tong(a, b, c) << endl; // Sử dụng hàm thứ hai.

    double x = 1.5, y = 2.0;
    cout << tong(x, y); // Sử dụng hàm thứ ba.

    return 0;
}
```
Biên dịch và chạy chương trình trên sẽ cho ra kết quả:

```
3
6
3.5
```

***Lưu ý:*** Các hàm nạp chồng buộc phải khác nhau hoàn toàn về danh sách tham số, chứ không thể chỉ khác nhau về kiểu trả về.

Việc sử dụng hàm nạp chồng rất hữu ích trong lập trình, bởi vì có rất nhiều kiểu dữ liệu sẽ phát sinh trong quá trình làm việc. Thay vì sử dụng ép kiểu khiến cho chương trình trở nên dài dòng và rối mắt, ta nên tạo ra các hàm nạp chồng cho mọi kiểu dữ liệu cần dùng. Rất nhiều hàm có sẵn của C++ được xây dựng bằng phương pháp nạp chồng hàm này. 

## 2. Nạp chồng toán tử

Trên thực tế, các toán tử trong C++ chính là các hàm được viết sẵn. Khi người dùng sử dụng một toán tử nào đó, trình biên dịch sẽ gọi ra phiên bản tương ứng của toán tử đó dựa vào kiểu dữ liệu của toán hạng. Lấy ví dụ: 

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 3, b = 5;
    cout << a + b << endl;

    double x = 3.0, b = 5.0;
    cout << x + y;

    return 0;
}
```

Trong trình biên dịch đã chứa sẵn các phiên bản khác nhau của toán tử `+`. Đối với câu lệnh `cout << a + b << endl;`, ta có thể liên tưởng tới một lời gọi hàm `operator + (a, b)`, với `operator +` là tên hàm và trả ra kết quả tương ứng là tổng của hai số nguyên.

Đối với câu lệnh thứ hai: `cout << x + y;`, lời gọi hàm `operator + (x, y)` vẫn được thực hiện, nhưng lúc này tham số truyền vào lại là hai số thực. Nạp chồng hàm sẽ chỉ định trình biên dịch cần gọi ra phiên bản toán tử `+` mà nhận vào tham số là số thực và trả ra tổng của hai số thực.

Lập trình viên có thể nạp chồng hầu hết các toán tử trong C++. Cú pháp để nạp chồng toán tử hoàn toàn giống như nạp chồng hàm:

```cpp
{Kiểu_trả_về} operator {Toán_tử}({Danh_sách_tham_số})
```

Trong đó, ***{Kiểu_trả_về}*** là một kiểu có sẵn hoặc một kiểu do người dùng tự định nghĩa. ***{Toán_tử}*** là một toán tử sẵn có của C++. ***{Danh_sách_tham_số}*** là các tham số với kiểu do người dùng tự định nghĩa (không được sử dụng kiểu có sẵn cho các tham số).

Dưới đây là danh sách các toán tử có thể nạp chồng trong C++:



![](https://cdn.ucode.vn/uploads/2247/upload/EsUqynad.png)


Các toán tử không thể nạp chồng bao gồm:



![](https://cdn.ucode.vn/uploads/2247/upload/sbaBxflX.png)


# VII. Khuôn mẫu hàm (Function Template) trong C++

Khuôn mẫu hàm là một phương thức dùng để tạo ra các hàm tổng quát. Đặt trường hợp chúng ta có một công việc nhưng phải xử lý trên rất nhiều kiểu dữ liệu khác nhau. Nếu như định nghĩa quá nhiều hàm nạp chồng cũng sẽ gây dài dòng và khó kiểm tra. Khuôn mẫu hàm sẽ giúp cho lập trình viên giải quyết việc đó, bằng cách tạo ra 1 hàm tổng quát và trình biên dịch sẽ tự chọn kiểu dữ liệu phù hợp cho nó trong quá trình biên dịch mã nguồn.

***Cú pháp:***

 ```cpp
template <typename {Kiểu_dữ_liệu_tổng_quát}>
{Kiểu_trả_về} {Tên_hàm}({Danh_sách_tham_số}) 
{
    {Thân_hàm};
}
```  

Ở đây, ***{Kiểu_dữ_liệu_tổng_quát}*** là một định danh bất kỳ do người dùng đặt ra để thay thế cho tên kiểu cụ thể. Từ khóa `typename` có thể thay thế bằng từ khóa `class` hoàn toàn không ảnh hưởng.

***Ví dụ:*** Dưới đây là một function template trả về giá trị lớn nhất trong hai giá trị ở các kiểu: số nguyên, số thực và chuỗi kí tự.

```cpp
#include <iostream>
#include <string>

using namespace std;

template <typename cherry>
cherry const& Max (cherry const& a, cherry const& b) 
{ 
    return a < b ? b : a; 
} 

int main ()
{
    int i = 15;
    int j = 26;
    cout << "Giá trị lớn nhất của (i, j) là: " << Max(i, j) << endl; 

    double f1 = 4.5; 
    double f2 = 14.2; 
    cout << "Giá trị lớn nhất của (f1, f2) là: " << Max(f1, f2) << endl; 

    string s1 = "Học lập trình"; 
    string s2 = "Tại nhà"; 
    cout << "Giá trị lớn nhất của (s1, s2) là: " << Max(s1, s2) << endl; 

   return 0;
}
```

Biên dịch và chạy chương trình trên sẽ cho ra kết quả:

```
Giá trị lớn nhất của (i, j) là: 26
Giá trị lớn nhất của (f1, f2) là: 14.2
Giá trị lớn nhất của (s1, s2) là: Tại nhà
```
   
Ngoài khuôn mẫu hàm, trong C++ còn có ***khuôn mẫu lớp***, tuy nhiên lớp (class) trong C++ thuộc về kĩ thuật lập trình hướng đối tượng, nên tôi sẽ không đề cập ở đây.

# VIII. Tài liệu tham khảo

- https://www.howkteam.vn/course/khoa-hoc-lap-trinh-c-can-ban/khuon-mau-ham-trong-c-function-templates-3967
- https://vietjack.com/cplusplus/ham_trong_cplusplus.jsp
- https://vietjack.com/cplusplus/pham_vi_bien_trong_cplusplus.jsp