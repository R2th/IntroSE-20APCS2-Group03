# I. Giới thiệu về thư viện chuẩn C++ (STL)

## 1. Lời mở đầu

***Standard Template Library*** - thư viện Template chuẩn của C++ có lẽ là một trong những thứ mà các bạn học lập trình C++ được nghe tới rất nhiều. Nếu như bạn đọc còn nhớ, ở các bài trước mình đã giới thiệu về khái niệm ***Template - khuôn mẫu hàm***. STL chính là một thư viện chứa những template của cấu trúc dữ liệu cũng như thuật toán được xây dựng một cách tổng quát nhất, nhằm hỗ trợ cho người dùng trong quá trình lập trình. Có thể nói, điều làm nên sức mạnh của ngôn ngữ C++ chính là STL, thư viện này giúp việc lập trình có tính khái quát hóa rất cao, đồng thời giúp việc lập trình trở nên dễ dàng hơn nhiều.

Thư viện STL giúp người dùng thực hiện toàn bộ các công việc như vào ra dữ liệu, quản lý mảng động, xây dựng sẵn những cấu trúc dữ liệu cơ bản (ngăn xếp, hàng đợi, tập hợp,...) và bao gồm cả các giải thuật cơ bản như sắp xếp, tìm min - max, tính tổng, thậm chí là tìm ước chung lớn nhất chẳng hạn. Việc sử dụng STL là rất quan trọng đối với những bạn nào có định hướng tham gia những kỳ thi HSG Tin học hoặc nghiên cứu về thuật toán trên ngôn ngữ C++.

Ở chuyên đề này, mình sẽ chỉ chia sẻ những thứ cơ bản nhất của STL kèm theo một vài template hữu dụng nhất của STL đối với các bạn đang học lập trình C++ cơ bản. Những ứng dụng tiếp  theo của STL sẽ được đề cập cụ thể trong từng chuyên đề của cấu trúc dữ liệu và giải thuật. 

## 2. Các thành phần của thư viện STL

Thư viện STL vô cùng rộng lớn, gồm rất nhiều các template khác nhau. Nhưng ta có thể chia STL làm $4$ phần chính:
- ***Containers Library:*** Thư viện chứa các cấu trúc dữ liệu mẫu như `vector`, `stack`, `queue`, `deque`, `set`, `map`,...
- ***Algorithm Library:*** Chứa các thuật toán viết sẵn để thao tác với dữ liệu.
- ***Iterator Library:*** Là các biến lặp, sử dụng để truy cập, duyệt các phần tử dữ liệu của các containers. Về cơ bản, nó giống như các biến chạy trên dữ liệu nhưng truy cập vào địa chỉ của dữ liệu. Dạng dễ hình dung nhất của iterator là con trỏ, nhưng chúng ta đã bỏ qua con trỏ nên iterator sẽ được đề cập trong từng containers.
- ***Numeric Library:*** Chứa các hàm toán học.

Từ những buổi học trước, các bạn cũng đã sử dụng nhiều thứ thuộc thư viện STL như các hàm nhập xuất của thư viện `<iostream>` là `cin`, `cout` hay thư viện `<string>` để xử lý chuỗi kí tự. Bài học này sẽ giới thiệu thêm một vài thư viện con hữu ích của STL, sẽ hỗ trợ rất tốt các bạn trong quá trình học lập trình C++.

Để sử dụng thư viện STL, các bạn cần khai báo không gian tên là `using namespace std;`, sau đó khai báo thư viện cần dùng bằng cú pháp `#include <{Tên_thư_viện}>`. Qua mỗi phiên bản của C++, lại có thêm những template mới được bổ sung vào STL, vì thế các bạn nên tham khảo thêm về thư viện này trên trang web cplusplus.com. 

# II. Sử dụng thư viện STL

## 1. Thư viện `<vector>` (Mảng động)
    
Thực tế, `vector` chỉ là một trong số các ***Containers Library (Thư viện lưu trữ)*** của STL, ngoài ra trong thư viện này còn có rất nhiều các containers khác nữa. Tuy nhiên đối với những bạn đang học cơ bản, thì việc giới thiệu các cấu trúc dữ liệu khác trong thư viện này cũng không có tác dụng gì, các bạn sẽ mau chóng quên vì chưa sử dụng tới chúng. Do đó, mình sẽ chỉ giới thiệu `vector` vì nó sẽ đi theo các bạn trong suốt quá trình học tập ngôn ngữ C++. Các containers khác sẽ được giới thiệu tới mọi người khi học tới những bài học cụ thể liên quan tới chúng.

### 1.1. Khai báo và truy cập phần tử

`Vector` là kiểu dữ liệu mảng động - hỗ trợ người dùng lưu trữ các phần tử có cùng kiểu. Nhưng khác với mảng thông thường, `vector` rất linh hoạt và có nhiều phương thức để hỗ trợ người dùng. Nếu như mảng thông thường phải khai báo trước số lượng phần tử cố định (do đó còn gọi là ***mảng tĩnh***), thì `vector` sẽ tự động cập nhật các ô nhớ mới cho dữ liệu đưa vào, qua đó giảm thiểu tối đa sự lãng phí vùng nhớ. Cú pháp khai báo như sau:

```cpp
#include <vector> // Khai báo thư viện chứa vector
using namespace std;
    
vector < {Kiểu_phần_tử} > {Tên_vector};
```

***{Kiểu phần tử}*** là một kiểu dữ liệu bất kỳ, còn ***{Tên_vector}*** là một định danh của người dùng. Ví dụ dưới đây khai báo một `vector` chứa số nguyên.

```cpp
#include <vector>
using namespace std;
    
vector < int > integer_list;
```

Khi mới khai báo, mặc định trong `vector` sẽ không có gì cả, trừ khi bạn khởi tạo trước giá trị cho nó. Ta có thể khởi tạo trước cho `vector` có bao nhiêu vị trí, thậm chí khởi tạo đồng loạt giá trị ban đầu cho tất cả các vị trí đó theo cách sau:

```cpp
vector < {Kiểu_phần_tử} > {Tên_vector}({Số_vị_trí}, {Giá_trị});
```

Các phần tử trong vector cũng sẽ mặc định đánh số từ vị trí $0$. Ví dụ dưới đây khởi tạo một vector gồm $10$ số $1$:

```cpp
vector < int > integer_list(10, 1);
```

Để truy cập một phần tử trong vector, ta sử dụng toán tử `[]` giống như mảng (tất nhiên vị trí đó phải tồn tại trong vector rồi). Ví dụ, cú pháp `integer_list[5]` sẽ truy cập tới phần tử ở vị trí thứ $5$ của `vector`.

### 1.2. Các hàm cung cấp sẵn của vector

Thư viện `vector` đã được viết sẵn rất nhiều hàm hỗ trợ. Để sử dụng hàm có sẵn, ta sử dụng cú pháp `{Tên_vector}.{Tên hàm}`. Có những hàm chỉ đứng riêng lẻ, và có những hàm lại chỉ đi cùng với các câu lệnh cụ thể. Bảng dưới đây liệt kê những hàm thường sử dụng của `vector` và tác dụng của chúng, kèm theo ví dụ về cách sử dụng chúng:


<img width=700 src="https://i.imgur.com/HWDggEH.png">


### 1.3. Duyệt vector bằng chỉ số phần tử

Muốn duyệt qua các phần tử của vector rất đơn giản, ta áp dụng vòng lặp giống như mảng. Giả sử vector $a$ đã được khởi tạo với kích thước là $N$. Do vector được đánh số từ $0,$ nên các phần tử sẽ có số thứ tự lần lượt là $0, 1, 2,..., N - 1$. Dựa vào đó có thể duyệt các phần tử của vector bằng một vòng lặp qua các chỉ số như sau:

```cpp
for (int i = {Chỉ_số_đầu}; i <= {Chỉ_số_cuối}; ++i)
{
    {Các câu lệnh với a[i]};
}
```

Ví dụ, muốn in ra các phần tử của vector $a = \{1, 2, 3, 4\},$ ta viết như sau:
    
```cpp
for (int i = 0; i <= 3; ++i)
    cout << a[i] << ' ';
```

Kết quả chạy chương trình:

```
1 2 3 4
```

### 1.4. Duyệt và truy cập vector bằng biến lặp (iterator)

Mỗi containers trong STL đều hỗ trợ sẵn ***iterator (biến lặp)*** dùng để duyệt qua và truy cập các phần tử, đôi khi sẽ dùng để thao tác với các hàm thành viên của containers. Cú pháp khai báo như sau:
    
```cpp
vector < |Kiểu phần tử| > :: iterator |Tên biến lặp|;
```

***Ví dụ:***

```cpp
vector < int > :: iterator it_1;
vector < double > :: iterator it_2;
```

Khi được khai báo, các biến lặp sẽ chỉ duyệt qua được các phần tử có kiểu đúng với kiểu đã khai báo cho biến lặp. Đối với tất cả các containers khác trong STL, cách khai báo biến lặp hoàn toàn tương tự. Sau khi đã khai báo, để duyệt và in ra các phần tử bằng biến lặp, ta sử dụng vòng lặp như sau:

```cpp
for ({Biến_lặp} = {Địa_chỉ_đầu}; {Biến_lặp} != {Địa chỉ cuối}; {Tăng_giảm_biến_lặp})
    cout << *{Tên_Biến_Lặp};
```

Ngoài lệnh `cout`, biến lặp cũng có thể thao tác với các câu lệnh khác. Các biến lặp `iterator` có thể được sử dụng kèm với các phép toán như `++, --, !=, ==, =` và `+, -` với các hằng số. Các phép toán này đã được nạp chồng sẵn trong thư viện STL.

***Ví dụ cụ thể:*** Dưới đây là chương trình sử dụng biến lặp để duyệt qua tất cả các phần tử của một vector và in ra các phần tử đó:

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
    vector < int > integers;
    integers.push_back(1);
    integers.push_back(2);
    integers.push_back(3);
    integers.push_back(4); // v = {1, 2, 3, 4}.

    vector < int > :: iterator it;
    for (it = vector.begin(); it != vector.end(); ++it)
        cout << *it << ' ';

    return 0;
}
```

Biên dịch và chạy chương trình trên sẽ cho ra kết quả:

```
1 2 3 4
```

### 1.5. Duyệt vector bằng biến auto

Từ phiên bản C++11 trở đi, sự xuất hiện của biến `auto` đã khiến cho việc duyệt phần tử trong `vector` trở nên đơn giản hơn rất nhiều. Ta có thể dùng một biến `auto` để duyệt toàn bộ các phần tử từ đầu `vector` tới cuối `vector` bằng cú pháp:

```cpp
for (auto e: {Tên_vector})
{
    {Các_câu_lệnh};
}
```

Ví dụ:
    
 ```cpp
vector < int > integers;
integers.push_back(1);
integers.push_back(2);
integers.push_back(3);
integers.push_back(4); // v = {1, 2, 3, 4}.

// Duyệt và in ra các phần tử trong vector.
for (auto e: integers)
    cout << e << ' ';
```

Kết quả chạy chương trình:

```
1 2 3 4
```

Tuy nhiên, cách duyệt này có một nhược điểm là chỉ duyệt được các phần tử từ đầu tới cuối `vector` chứ không thể duyệt được một đoạn phần tử trên `vector`. Do đó nó ít khi được sử dụng.

## 2. Kiểu `pair`

Thư viện `<utility>` trong STL cung cấp một kiểu dữ liệu rất hữu dụng là `pair`, cho phép ghép hai biến hoặc hằng thành một biến gồm hai trường giá trị (có thể khác kiểu dữ liệu nhau). Để sử dụng, ta khai báo như sau:

```cpp
#include <utility>

using namespace std;

pair <{Kiểu_dữ_liệu_1}, {Kiểu_dữ_liệu_2}> {Tên_biến};
``` 

Ví dụ, có thể khai báo một biến kiểu `pair` lưu trữ hai thông tin về một sinh viên là mã số và tên bằng cách khai báo:

```cpp
pair < int, string > student;
``` 

Sau khi khai báo, hai trường giá trị của biến `pair` có thể được truy cập thông qua hai từ khóa `first` và `second`. Cú pháp truy cập:

```cpp
{Tên_biến_pair}.first
{Tên_biến_pair}.second
```

Sau khi truy cập vào các trường, ta có thể sử dụng kết hợp các câu lệnh với từng trường giống như một biến đơn.

```cpp
pair < int, string > student;
cout << student.first << ' ' << student.second;
``` 

Ngoài ra, chúng ta cũng có thể sử dụng `pair` như một kiểu dữ liệu cho các phần tử trong mảng hay `vector`. Có rất nhiều bài toán mà `pair` sẽ thể hiện sự hữu ích của nó, ở phần bài tập chúng ta sẽ được biết thêm về cách sử dụng `pair`!

## 3. Algorithm Library (Thư viện thuật toán)

Thư viện thuật toán của STL chứa rất nhiều thuật toán viết sẵn từ đơn giản tới nâng cao. Để sử dụng thư viện này, trước tiên ta phải khai báo tên thư viện và tất nhiên là không gian tên `std`:

```cpp
#include <algorithm>

using namespace std;
```

Dưới đây mình sẽ giới thiệu vài thuật toán hữu ích và dễ sử dụng cho các bạn mới học C++.

### 3.1. Hàm tìm min - max giữa hai số

***Cú pháp:***

```cpp
min(a, b); // Hàm tìm min giữa a và b.
max(a, b); // Hàm tìm max giữa a và b.
```

Hai hàm này vì có trả về giá trị nên buộc phải đi kèm với phép toán gán hoặc nằm trong một biểu thức - câu lệnh. Đặc biệt hai biến $a$ và $b$ phải có cùng kiểu dữ liệu thì mới sử dụng được hai hàm này.

***Ví dụ:*** 

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int main()
{
    int a = 5, b = 10;
    cout << "Số nhỏ hơn là: " << min(a, b);

    return 0;
}
```

Kết quả chạy chương trình:

```
Số nhỏ hơn là: 5
```

### 3.2. Hàm hoán đổi giá trị

Hàm `swap()` cho phép chúng ta hoán đổi giá trị của hai biến ***cùng kiểu*** trong C++ theo cú pháp:

```cpp
swap({Biến_thứ_nhất}, {Biến_thứ_hai});
```

Ví dụ:

```
#include <iostream>
#include <algorithm>

using namespace std;

int main()
{
    int a = 5, b = 10;

    swap(a, b);

    cout < "Hai số sau khi hoán đổi giá trị: " << a << ' ' << b;

    return 0;
}
```

Kết quả chạy chương trình

```
Hai số sau khi hoán đổi giá trị: 10 5
```

### 3.3. Truy cập địa chỉ của phần tử trong mảng và vector

Các hàm thao tác trên đoạn trong thư viện `<algorithm>` đều sử dụng các tham số là các ***địa chỉ***. Mỗi biến được tạo ra trong khi lập trình đều có địa chỉ cụ thể trong bộ nhớ, và các ***biến địa chỉ (iterator)*** sẽ giúp chúng ta truy cập tới địa chỉ của biến đó. Đối với mảng và vector, ta có cách truy cập nhanh tới địa chỉ của các phần tử như sau:

- Đối với mảng:
    
    ```cpp
    {Tên_mảng} + {Vị_trí};
    ```

Chẳng hạn, `a + 0` tức là địa chỉ của $a_0,$ `a + 1` là địa chỉ của $a_1,...$

- Đối với `vector`:

    ```cpp
    {Tên_vector}.begin() + {Vị_trí};
    ```

Ví dụ, `a.begin()` là địa chỉ của phần tử đầu tiên trong `vector`, `a.begin() + 1` là địa chỉ của phần tử thứ nhất trong `vector`,...Tuy nhiên, `vector` có một đặc điểm là luôn luôn tồn tại một vị trí cuối cùng là `a.end()` có tác dụng đánh dấu `vector` đã kết thúc (nhưng không mang giá trị gì cả), vì thế địa chỉ của phần tử này có thể hiểu là `a.begin() + N`, với $N$ là kích thước của `vector` $a$.

Lí do tôi phải đề cập tới điều này là vì tiếp theo, chúng ta sẽ cùng tìm hiểu một số hàm dựng sẵn cho phép thao tác trên đoạn trong thư viện STL C++!

### 3.4. Hàm tìm min - max trên một dãy số

STL cung cấp một hàm để tìm min - max trên một dãy số, cụ thể là mảng hoặc `vector`. Cú pháp sử dụng như sau:
    
```cpp
*min_element(l, r); // Tìm min đoạn.
*max_element(l, r); // Tìm max đoạn.
```

Trong đó, $l$ và $r$ là hai biến trỏ vào ***địa chỉ*** của phần tử đầu và phần tử cuối trong đoạn cần tìm min - max. Đối với mảng hay vector, cách truy cập tới ***địa chỉ*** của phần tử sẽ khác nhau và đã được đề cập ở mục $2.2$. Hàm sẽ trả về giá trị min - max trong đoạn $[l, r - 1]$. 

***Ví dụ:***

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
    
using namespace std;

int main()
{
    int a[5] = {1, 5, 2, 10, 14};
    vector < int > v;
    v.push_back(-10);
    v.push_back(5);
    v.push_back(2);
    v.push_back(9); // v = {-10, 5, 2, 9}.

    // In ra min của cả mảng a, vị trí cuối là a[4].
    cout << *min_element(a, a + 4 + 1) << endl; 
    // In ra max của cả vector v.
    cout << *max_element(v.begin(), v.end()) << endl;

    // In ra min từ a[1] tới a[3].
    cout << *min_element(a + 1, a + 3 + 1) << endl;
    // In ra max từ v[0] tới v[2].
    cout << *max_element(v.begin(), v.begin() + 2 + 1);

    return 0;
}
```

Kết quả thu được là:

```
1
9
2
2
```

### 3.5. Hàm tính tổng một dãy số

STL cung cấp sẵn một hàm tính tổng các số trên một mảng hoặc `vector`. Các lưu ý chi tiết về địa chỉ đầu và cuối của đoạn cần tính tổng giống hệt với hai hàm tìm min - max trên đoạn mà mình vừa giới thiệu ở trên. Dưới đây chỉ cung cấp cú pháp tổng quát:

```cpp
accumulate(l, r, x);
```

Trong đó, $l$ và $r$ là hai biến trỏ vào ***địa chỉ*** của phần tử đầu và phần tử cuối trong đoạn cần tính tổng, $x$ là một hằng số hoặc biến kiểu số. Hàm sẽ tính tổng tất cả các phần tử thuộc đoạn $[l, r - 1]$ rồi cộng vào $x$, sau đó trả ra tổng cuối. Tất nhiên, hàm này có trả về một kết quả nên luôn luôn phải đi kèm với toán tử hoặc nằm trong câu lệnh - biểu thức.

***Ví dụ:***

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main()
{
    int a[5] = {1, 5, 2, 10, 14};
    vector < int > v;
    v.push_back(-10);
    v.push_back(5);
    v.push_back(2);
    v.push_back(9); // v = {-10, 5, 2, 9}.

    // In ra tổng của cả mảng a, vị trí cuối là a[4].
    cout << accumulate(a, a + 4 + 1, 0) << endl; 
    // In ra tổng của cả vector v.
    cout << accumulate(v.begin(), v.end(), 0) << endl;

    // In ra tổng từ a[1] tới a[3].
    cout << accumulate(a + 1, a + 3 + 1, 0) << endl;
    // In ra tổng từ v[0] tới v[2].
    cout << accumulate(v.begin(), v.begin() + 2 + 1, 0);

    return 0;
}
```

Kết quả thu được là:

```
32
6
17
-3
```

### 3.6. Hàm sắp xếp

#### **Hàm sắp xếp cơ bản**

Thư viện thuật toán cung cấp một hàm sắp xếp có thể sắp xếp các kiểu dữ liệu bao gồm số, kí tự, chuỗi kí tự và cả các kiểu dữ liệu tự định nghĩa của người dùng. Cú pháp như sau:

```cpp
sort(l, r);
```

Trong đó,  $l$ và $r$ là hai biến trỏ vào ***địa chỉ*** của phần tử đầu và phần tử cuối trong đoạn cần sắp xếp. Hàm sẽ sắp xếp toàn bộ các phần tử thuộc đoạn $[l, r - 1]$. Tuy nhiên hàm `sort()` sẽ đứng đơn lẻ chứ không đi kèm các câu lệnh khác. Mặc định hàm `sort()` sẽ sắp xếp các phần tử trong đoạn cần sắp xếp theo thứ tự tăng dần (số hoặc kí tự theo đúng quy tắc riêng của mỗi kiểu dữ liệu).

***Ví dụ:***

```cpp
#include <bits/stdc++.h> // Khai báo luôn các thư viện cho ngắn gọn.

using namespace std;

int main()
{
    int a[] = {5, 2, 10, 3, 1};
    vector < int > v;
    v.push_back(-10);
    v.push_back(5);
    v.push_back(2);
    v.push_back(9); // v = {-10, 5, 2, 9}.

    // Sắp xếp mảng và vector tăng dần.
    sort(a, a + 4 + 1); // a = {1, 2, 3, 5, 10}.
    sort(v.begin(), v.end()); // v = {-10, 2, 5, 9}.

    // In ra kết quả sắp xếp.
    cout << "Kết quả sắp xếp: " << endl;
    for (int i = 0; i < 5; ++i)
        cout << a[i] << ' ';
    cout << endl;
    for (int i = 0; i < 4; ++i)
        cout << v[i] << ' ';

    return 0;
}
```

Kết quả chạy chương trình trên như sau:

```
Kết quả sắp xếp:
1 2 3 5 10
-10 2 5 9
```

#### **Tùy biến việc sắp xếp theo ý thích**

Hàm sắp xếp thực tế còn có một tham số thứ ba, dùng để điều chỉnh việc sắp xếp theo ý muốn của người dùng. Cú pháp dạng này của hàm sắp xếp là:

```cpp
sort(l, r, cmp);
```

Trong đó, `cmp` là một hàm kiểu `boolean` do người dùng tự định nghĩa, hoặc là một trong hai từ khóa thể hiện phép so sánh: `less` hoặc `greater`.

**Cách 1: Sử dụng 2 phép toán `less` và `greater`**

Hai từ khóa `less` và `greater` thể hiện cho hai phép toán sắp xếp tăng dần hoặc giảm dần (thực ra chính là thể hiện của các toán tử `<` và `>`), khi muốn điều chỉnh cách sắp xếp ta chỉ cần thêm hai phép toán này vào tham số thứ ba của hàm sắp xếp theo cú pháp:

```cpp
sort(l, r, greater < {Kiểu_phần_tử} >());
sort(l, r, less < {Kiểu_phần_tử} >());
```

Trong đó, ***{Kiểu_phần_tử}*** là kiểu dữ liệu của các phần tử trong tập hợp cần sắp xếp.

***Ví dụ:***

```cpp
#include <bits/stdc++.h> // Khai báo luôn các thư viện cho ngắn gọn.

using namespace std;

int main()
{
    int a[] = {5, 2, 10, 3, 1};

    sort(a, a + 4 + 1); // a = {1, 2, 3, 5, 10}.

    // In ra kết quả sắp xếp.
    cout << "Sắp xếp tăng dần: " << endl;
    for (int i = 0; i < 5; ++i)
        cout << a[i] << ' ';
    cout << endl;

    sort(a, a + 4 + 1, greater < int >()); // a = {10, 5, 3, 2, 1}.

    cout << "Sắp xếp giảm dần: " << endl;
    for (int i = 0; i < 4; ++i)
        cout << a[i] << ' ';

    return 0;
}
```

Kết quả chạy chương trình trên như sau:
    
```
Sắp xếp tăng dần:
1 2 3 5 10
Sắp xếp giảm dần:
10 5 3 2 1
```

***Lưu ý:***

- Phép so sánh mặc định của hàm sort là `less`, do đó nếu muốn sắp xếp tăng dần ta không cần thêm từ khóa `less` mà chỉ cần viết hàm sắp xếp và bỏ qua tham số thứ ba là được.
- Đối với tập hợp gồm các phần tử kiểu `pair`, hàm sắp xếp sẽ tự động sắp xếp ưu tiên theo trường giá trị `first`, nếu như hai phần tử trước sau có trường `first` bằng nhau thì mới xét tới trường `second`. Cụ thể, phép toán `less` sẽ ưu tiên sắp xếp các phần tử tăng dần theo trường giá trị `first`, nếu trường `first` bằng nhau thì sẽ sắp xếp tăng dần theo trường giá trị `second`; tương tự với phép toán `greater`.

**Cách 2: Sử dụng hàm sắp xếp tự định nghĩa**

Khi muốn sắp xếp theo những cách riêng, ví dụ như sắp xếp các số chẵn ra phía đầu, số lẻ ra phía cuối, hoặc khi kiểu dữ liệu của tập cần sắp xếp là những kiểu dữ liệu do người dùng tự định nghĩa, ta có thể tự viết ra một hàm `cmp` dùng làm tham số thứ ba cho hàm `sort`. Cú pháp như sau:

```cpp
bool cmp({Tham_số_thứ_nhất}, {Tham_số_thứ_hai})
{
    {Định_nghĩa_quan_hệ_so_sánh_giữa_hai_tham_số};
}
```

Trong đó, ***{Tham_số_thứ_nhất}*** đại diện cho phần tử đứng trước, ***{Tham_số_thứ_hai}*** đại diện cho phần tử đứng sau trong dãy. Hàm `sort()` sẽ tự động sắp xếp lại các phần tử theo thứ tự bạn quy định giống như hai tham số này. Lấy ví dụ, nếu ta muốn sắp xếp một dãy số nguyên giảm dần, bạn cũng có thể viết như sau:

```cpp
#include <bits/stdc++.h>

using namespace std;

bool cmp(int A, int B)
{
    return A > B;
}

int main()
{
    int a[] = {5, 2, 10, 3, 1};

    // Sắp xếp mảng.
    sort(a, a + 5, cmp); // a = {10, 5, 3, 2, 1}.

    // In ra kết quả sắp xếp.
    cout << "Kết quả sắp xếp: " << endl;
    for (int i = 0; i < 5; ++i)
        cout << a[i] << ' ';

    return 0;
}
```

Biên dịch và chạy chương trình trên sẽ cho ra kết quả:

```
Kết quả sắp xếp:
10 5 3 2 1
```

## 4. Numeric Library (Thư viện số học):

Thư viện số học trong STL được khai báo bằng cú pháp:

```cpp
#include <cmath>

using namespace std;
```

Thư viện này cung cấp nhiều hàm toán học để xử lý số học trong quá trình tính toán. Bảng dưới đây là một số hàm thường sử dụng trong quá trình làm việc với C++ (đã được nhắc đến ở bài $5$ - Hàm trong C++, ở đây vẫn nhắc lại):


<img width = 500 src="https://i.imgur.com/pRv9rjK.png">