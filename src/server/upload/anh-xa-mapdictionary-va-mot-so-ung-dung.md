# I. Giới thiệu chung

Ánh xạ là một cấu trúc dữ liệu có tính ứng dụng rất cao trong lập trình. Về bản chất, cấu trúc dữ liệu này được cài đặt thủ công (dựa trên cây nhị phân tự cân bằng hoặc bảng băm), tuy nhiên việc cài đặt thủ công rất dài dòng và phức tạp, lại dễ xảy ra nhầm lẫn. Vì thế, những ngôn ngữ lập trình hiện đại đã giải quyết việc này bằng cách cài đặt sẵn nó. Trong C++ và Python, chúng lần lượt có tên là `map` và `dictionary`.

Vậy cấu trúc dữ liệu này là gì? Trong toán học, "ánh xạ" có nghĩa là một quy tắc cho một phần tử $x$ trong tập hợp $A$ tương ứng với một phần tử $y$ trong tập hợp $B,$ nói cách khác là một phép "mã hóa" $x$ thành $y$. Vận dụng định nghĩa đó, ánh xạ trong lập trình là một cấu trúc dữ liệu cho phép tạo ra các phần tử ở dạng một cặp ***khóa - giá trị (key - value),*** mà ***giá trị*** chính là một ánh xạ của ***khóa*** do người dùng quy định, từ đó dễ dàng hơn trong việc kiểm soát dữ liệu. 

Trong bài viết này, tôi sẽ giới thiệu tới các bạn cách sử dụng ánh xạ trong C++, Python và một số bài toán ứng dụng của nó.

# II. Sử dụng ánh xạ trong C++

Trong C++, ánh xạ được cài đặt sẵn trong STL C++, đó là associative container `map`. Giống như `set`, các phần tử trong `map` có khóa phân biệt, và chúng sẽ được tự động sắp xếp theo khóa (dựa trên phép so sánh mà người dùng quy định). 

Trong `map`, các phần tử được xác định bằng khóa. Tức là giả sử có một cặp phần tử là $1 - 0$ thì toàn bộ phần tử này sẽ được đại diện bằng khóa là $1$. Kiểu của khóa và giá trị ánh xạ có thể khác nhau.

Mỗi phần tử của `map` được cài đặt theo kiểu `pair`, với khóa tương ứng với trường `first` và giá trị ánh xạ tương ứng với trường `second`.

## 1. Khai báo

Ta khai báo thư viện `<map>` và không gian tên `std`, sau đó tạo một `map` theo cú pháp:

```cpp
#include <map>

using namespace std;

map < {Kiểu_khóa}, {Kiểu_ánh_xạ} > {Tên_map};
```

Ví dụ:

```cpp
#include <map>

using namespace std;

map < string, int > mymap;
```

## 2. Các thao tác với `map` trong C++

### Duyệt `map` và truy cập phần tử

Các phần tử trong `map` chỉ có thể duyệt qua bằng cách sử dụng vòng lặp và biến lặp giống như `set`:

```cpp
map < {Kiểu_khóa}, {Kiểu_ánh_xạ} > :: iterator {Tên_biến_lặp};

for ({Biến_lặp} = {Địa_chỉ_đầu}; {Biến_lặp} != {Địa_chỉ_cuối}; ++{Biến_lặp})
{
    {Các_câu_lệnh};
}
```

Hoặc có thể sử dụng một cách ngắn gọn hơn là dùng biến `auto` trong C++11. Nhưng cách này chỉ có thể duyệt qua toàn bộ phần tử trên `map` chứ không thể duyệt một đoạn:

```cpp
for (auto {Tên_biến_lặp}: {Tên_map})
{
    {Các_câu_lệnh};
}
```

Giả sử ta có biến lặp là $\text{it},$ thì khi duyệt `map`, ta có thể truy cập vào các trường của phần tử theo những cách sau:

- `(*it)`: Trả về phần tử mà biến lặp đang trỏ đến, kiểu là `pair`.
- `(*it).first`: Trả về khóa của phần tử mà biến lặp đang trỏ đến.
- `(*it).second`: Trả về giá trị của phần tử mà biến lặp đang trỏ đến.
- `it -> first`: Giống như `(*it).first`.
- `it -> second`: Giống như `(*it).second`.

Để truy cập tới một phần tử thông qua khóa, ta sử dụng cú pháp:

```cpp
{Tên_map}[{Khóa}];
```
 
Khi đó, nếu như khóa này đã tồn tại trong `map` thì cú pháp sẽ trả về giá trị của khóa đó, ngược lại thì nó sẽ thêm khóa đó vào `map`. Độ phức tạp của thao tác là $O\big(\log(n)\big)$ với $n$ là kích thước của `map`.

Đoạn chương trình dưới đây sẽ minh họa toàn bộ các thao tác trên:

```cpp
#include <map>

using namespace std;

main()
{
    map < char, int > mymap;
    map < char, int > :: iterator it;

    // Thêm các phần tử vào map.
    mymap['a'] = 1;
    mymap['b'] = 2;
    mymap['c'] = 3;

    for (it = mymap.begin(); it != mymap.end(); ++it)
        cout << (*it).first << ' ' << (*it).second << endl;
        // cout << it -> first << ' ' << it -> second << endl;

    /* Hoặc có thể viết:
        for (auto e: mymap)
            cout << e.first << ' ' << e.second << endl;
    */

    return 0;
}
```

Kết quả chạy sẽ là:

```cpp
a 1
b 2
c 3
```

### Viết lại hàm so sánh cho `map`

Phép so sánh mặc định của `map` là `less`, tức là các phần tử sẽ được sắp xếp tăng dần theo khóa. Các bạn cũng có thể viết lại hàm so sánh theo ý mình như sau:

```cpp
struct cmp
{
    bool operator() ({Khóa_đại_diện_1}, {Khóa_đại_diện_2})
    {
        {Quan_hệ_giữa_hai_khóa};
    }
};

map < {Kiểu_khóa}, {Kiểu_ánh_xạ}, cmp > {Tên_map};
```

***{Khóa_đại_diện_1}, {Khóa_đại_diện_2}*** lần lượt đại diện cho các phần tử đứng trước và đứng sau trong `map`, quan hệ giữa chúng sẽ thể hiện cho thứ tự sắp xếp các phần tử trong `map`. Ví dụ:

```cpp
#include <map>

using namespace std;

// Quy định phép so sánh của map là khóa giảm dần.
struct cmp
{
    bool operator() (char a, char b)
    {
        return a > b;
    }
};

main()
{
    map < char, int, cmp > mymap;
    mymap.insert({'a', 1});
    mymap.insert({'b', 2});
    mymap.insert({'c', 3});

    for (auto e: mymap)
        cout << e.first << ' ' << e.second << endl;
}
```

Kết quả chạy chương trình trên sẽ là:

```
c 3
b 2
a 1
```

### Một số hàm dựng sẵn với `map`

Container `map` đã xây dựng sẵn một số hàm để thao tác với `set`, cụ thể tôi trình bày ở bảng dưới đây. Để sử dụng hàm, ta dùng cú pháp: `{Tên_set}.{Tên_hàm}`. Coi rằng kích thước của một `map` $m$ là $|m|$.

| Tên hàm | Tác dụng | Độ phức tạp |
|:------------------:|:-----------:|:--------------:|
| `m.insert({key, value})`, `m.insert(make_pair(key, value))`  | Thêm phần tử $x$ vào tập hợp, tự động sắp xếp lại | $O\Big(\log\big(\|s\|\big)\Big)$ |
| `m.find(x)`  | Trả về `iterator` trỏ tới phần tử $x$ trong `map`, nếu không tìm thấy thì trả về `iterator` `end()`| $O\Big(\log\big(\|s\|\big)\Big)$ |
|  `m.clear()` | Xóa toàn bộ `map` | $O\big(\|m\|\big)$ |
| `m.erase()`  | Xóa một phần tử trong `map`, có thể xóa theo khóa hoặc xóa theo `iterator` | $O\Big(\log\big(\|s\|\big)\Big)$ |
| `m.size()` | Trả về kích thước hiện tại của `map` | $O(1)$ |
| `m.empty()` | Trả về `true` nếu `map` rỗng, ngược lại trả về `false` | $O(1)$ |
| `m.lower_bound(key)` | Trả về `iterator` trỏ tới phần tử nhỏ nhất có khóa lớn hơn hoặc bằng khóa $\text{key}$ trong `map` (theo phép so sánh), nếu không tìm thấy thì trả về `iterator` `end()` | $O\Big(\log\big(\|s\|\big)\Big)$ |
| `m.upper_bound(key)` | Trả về `iterator` trỏ tới phần tử nhỏ nhất có khóa lớn hơn khóa $key$ trong tập hợp (theo phép so sánh), nếu không tìm thấy thì trả về `iterator` `end()` | $O\Big(\log\big(\|s\|\big)\Big)$ |
| `m.count(key)` | Trả về số lần xuất hiện của khóa $\text{key}$ trong tập hợp | $O\Big(\log\big(\|s\|\big)\Big)$ |

# 3. Các cấu trúc `multimap` và `unordered_map`

Ngoài `map`, trong STL C++ còn có thêm hai cấu trúc cũng tương tự như `map`:

- `multimap`: Là một lớp nằm trong thư viện `map`. Giống như `map`, này cho phép chứa các phần tử có khóa giống nhau, vì thế nên không thể truy cập phần tử thông qua khóa bằng toán tử `[]`. Các bạn đọc thêm về container này tại <i><b><a href="https://www.cplusplus.com/reference/map/multimap/">đây.</a></b></i>
- `unordered_map`: Cần khai báo thư viện `<unordered_map>` khi sử dụng. Cũng giống như `map`, nhưng các phần tử khi thêm vào sẽ không có thứ tự, vì thế nên các thao tác gần như sẽ giảm độ phức tạp về $O(1)$. Tuy nhiên vì thế nên nó sẽ không có các hàm tìm kiếm `lower_bound()`, `upper_bound`. Các bạn đọc thêm về container này tại <i><b><a href="https://www.cplusplus.com/reference/unordered_map/unordered_map/">đây.</a></b></i>

# III. Sử dụng ánh xạ trong Python

Trong Python, ánh xạ được xây dựng sẵn bằng container `dictionary`. Nó là một tập hợp các phần tử ở dạng ***khóa - giá trị (key - value),*** nhưng lại không có tính thứ tự. Một phần tử ***key - value*** được gọi là một ***item,*** trong mỗi item thì key và value được phân biệt với nhau bằng một toán tử `:`. Trong `dictionary`, mỗi item lại được phân tách với nhau bằng toán tử `,`.

## 1. Khai báo

Để khai báo một `dictionary` trong Python, ta sử dụng một vài cú pháp dưới đây:

```python
# Khởi tạo dictionary rỗng.
mydict1 = {}

# Khởi tạo dictionary có sẵn các phần tử.
mydict2 = {key_1: value_1, key_2: value_2,...}
```

Ví dụ:

```python
mydict1 = {}
mydict2 = {'a': 1, 'b': 2, 'c': 3}
```

## 2. Thao tác với `dictionary` trong Python 

### Duyệt và truy cập phần tử trong `dictionary`

Để duyệt qua `dictionary`, các bạn sử dụng vòng lặp như dưới đây để duyệt qua các khóa của nó:

```python
for {Tên_biến_lặp} in {Tên_dictionary}:
    {Các_câu_lệnh}
```

Còn khi muốn truy cập một phần tử trong `dictionary`, các bạn có thể truy cập trực tiếp theo cú pháp:

```python
# Cách 1.
{Tên_dictionary}[{Khóa}]

# Cách 2.
{Tên_dictionary}.get({Khóa})
```

Cú pháp trên sẽ trả về giá trị của khóa nếu nó có tồn tại trong `dictionary`. Còn nếu không tồn tại khóa đó trong `dictionary` thì chương trình sẽ báo lỗi, đây là điểm các bạn cần lưu ý.

Lấy ví dụ:

```python
mydict = {'a': 1, 'b': 2, 'c': 3}

for item in mydict:
    print(item, ': ', mydict[item])  # Hoặc mydict.get(item)
```

Kết quả chạy chương trình:

```
a: 1
b: 2
c: 3
```

### Một số hàm dựng sẵn của `dictionary`

Kí hiệu kích thước của `dictionary` $d$ là $|d|,$ các hàm tích hợp sẵn được minh họa ở bảng dưới đây:

| Tên hàm | Tác dụng | Độ phức tạp |
|:------------------:|:-----------:|:--------------:|
| `key in d`  | Kiểm tra xem khóa $\text{key}$ có tồn tại trong `dictionary` không, nếu có trả về `True`, ngược lại trả về `False` | $O(1)$ |
| `d[key] = value` | Thêm khóa $\text{key}$ vào `dictionary` với giá trị $\text{value},$ nếu khóa đã tồn tại thì cập nhật giá trị mới | $O(1)$ |
| `d.update({Các_phần_tử})`  | Thêm nhiều phần tử vào `dictionary` | $O(m)$ - $m$ là số phần tử thêm vào |
|  `d.clear()` | Xóa toàn bộ `set` | $O\big(\|s\|\big)$ |
| `d.pop(key)`  | Xóa phần tử có khóa $\text{key}$ trong `dictionary` | $O(1)$ |
| `d.copy()` | Tạo một bản sao của `dictionary` $d$ | $O\big(\|d\|\big)$ |
| `d.keys()` | Trả về một tập gồm tất cả các khóa đang có trong `dictionary` | $O\big(\|d\|\big)$ |
| `d.values(s2)` | Trả về một tập gồm tất cả các giá trị đang có trong `dictionary` | $O\big(\|d\|\big)$ |

# IV. Một số bài toán minh họa

## 1. Bài toán 1

### Đề bài

Trên xe ô tô đi tham quan, bạn Sơn Tùng được chơi trò chơi đập ếch trên máy tính bảng của cô bạn ngồi cùng xe. Màn hình trò chơi hiển thị một lưới ô vuông kích thước $m \times n,$ mỗi ô trên đó có in hình một chú ếch và một số nguyên là số hiệu của nó. Ở mỗi lượt chơi, khi người chơi dùng tay chạm vào bất kỳ ô nào đó trong bảng thì:

- Tất cả các chú ếch trong bảng có cùng số hiệu với chú ếch vừa chạm vào đều biến mất khỏi bảng.
- Người chơi dành được thêm số điểm bằng với số lượng chú ếch biến mất.

Sơn Tùng có $k$ lượt chơi, xác định số điểm lớn nhất cậu có thể đạt được?

***Input:***

- Dòng đầu tiên ghi ba số nguyên dương $m, n, k$.
- $m$ dòng tiếp theo, mỗi dòng chứa $n$ số nguyên là số hiệu của $n$ chú ếch trên từng hàng trong bảng, phân tách nhau bởi dấu cách.

***Ràng buộc:***

- $1≤m, n≤1000$.
- $1≤k≤m \times n$.
- $|a_{i,j} |≤10^9;∀i,j:1≤i≤m,1≤j≤n$.

***Output:***

- Số nguyên duy nhất là tổng điểm tối đa Sơn Tùng giành được.

***Sample Input:***

```
4 6 2
1 4 3 3 2 4
2 4 2 1 4 1
2 3 4 4 1 1
1 1 2 3 4 4
```

***Sample Output:***

```
15
```

***Giải thích:***

Bạn Sơn Tùng có thể chơi theo cách sau:

- Lượt $1$ chạm vào ô có số hiệu $1,$ đạt $7$ điểm.
- Lượt $2$ chạm vào ô có số hiệu $4,$ đạt $8$ điểm.
$→$ Tổng hai lượt chơi đạt $15$ điểm.

### Ý tưởng

Ý tưởng của bài toán này khá dễ, đơn giản là các bạn cần chọn ra $k$ số có số lần xuất hiện nhiều nhất trong ma trận, và cộng tất cả số lần xuất hiện của các số đó lại để thu được kết quả.

Ta sẽ sử dụng một `map` hoặc `dictionary` để lưu số lần xuất hiện của các số trong ma trận (bởi vì các số này nhỏ hơn hoặc bằng $10^9$ nên nếu dùng đếm phân phối bằng mảng sẽ không khả thi). Sau đó chỉ cần lưu lại số lần xuất hiện của từng số ra một mảng riêng rồi chọn $k$ số xuất hiện nhiều nhất là được.

Trong bài toán này, do không cần đến tính thứ tự của các khóa nên tôi sẽ sử dụng `unordered_map` đối với C++ để đẩy nhanh tốc độ chương trình hơn.

Độ phức tạp giải thuật: $O(m \times n)$.

### Cài đặt

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>

using namespace std;

void enter(int &m, int &n, int &k, map < int, int > &cnt)
{
    cin >> m >> n >> k;

    // Nhập ma trận và đếm các số bằng unordered_map.
    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j)
        {
            int x;
            cin >> x;

            if (cnt.find(x) != cnt.end())
                cnt[x]++;
            else
                cnt[x] = 1;
        }
}

void solution(int m, int n, int k, map < int, int > &cnt)
{
    // Nếu ma trận không có đủ k giá trị phân biệt thì 
    // số điểm ghi được là m * n.
    if (cnt.size() < k)
    {
        cout << m * n;
        return;
    }

    // Lưu số lần xuất hiện của các giá trị phân biệt trong ma trận
    // vào một vector riêng.
    vector < int > frequency;
    for (auto e: cnt)
        frequency.push_back(e.second);
    
    // Sắp xếp lại tần suất của các giá trị theo chiều giảm dần.
    sort(frequency.begin(), frequency.end(), greater < int >());

    // Tính tổng số điểm dành được với k lượt chơi.
    cout << accumulate(frequency.begin(), frequency.begin() + k, 0);
}

main()
{
    int m, n, k;
    unordered_map < int, int > cnt;

    enter(m, n, k, cnt);
    solution(m, n, k, cnt);
}
```

***Ngôn ngữ Python:***

```python
def enter():
    m, n, k = map(int, input().split())

    cnt = {}
    for i in range(m):
        row = [int(x) for x in input().split()]

        for x in row:
            cnt[x] = 1 if x not in cnt else cnt[x] + 1

    return m, n, k, cnt


def solution(m, n, k, cnt):
    # Nếu ma trận không có đủ k giá trị phân biệt thì 
    # số điểm ghi được là m * n.
    if len(cnt) < k:
        print(m * n)
        return

    # Lưu số lần xuất hiện của các giá trị phân biệt trong ma trận
    # vào một list riêng.
    frequency = []
    for key, value in cnt:
        frequency.append(value)

    frequency.sort(reverse = True)

    # Tính tổng số điểm giành được sau k lượt chơi.
    res = 0
    for i in range(0, k):
        res += frequency[i]

    print(res)


if __name__ == '__main__':
    m, n, k, cnt = enter()
    solution(m, n, k, cnt)
```

## 2. Bài toán 2

### Đề bài

Tèo rất thích học hình học. Cậu ấy đã biết về phương trình tổng quát của đường thẳng là $ax + by + c = 0$, trong đó $a, b$ và $c$ là các hệ số và $x$ và $y$ là các biến. Hôm nay, Tèo đã học về các đường thẳng song song. Các đường thẳng song song là các đường thẳng không bao giờ gặp nhau tại bất kỳ điểm nào.

Tèo có một tập hợp gồm $n$ đường thẳng theo dạng tổng quát, biết trước các hệ số $a, b, c$ của phương trình đường thẳng $(ax + by + c = 0)$. Trong tập hợp này có thể tồn tại nhiều tập hợp con gồm các đường thẳng song song với nhau. 

Hãy giúp Tèo tìm ra tập con có nhiều đường thẳng song song nhất?

***Input:***

- Dòng đầu tiên chứa số nguyên $n$ chỉ số lượng các đường thẳng.
- $n$ dòng tiếp theo, mỗi dòng chứa ba số nguyên $a,b,c$ là hệ số của ,một đường thẳng.  

***Ràng buộc:***

- $1 \le n \le 10^5$.
- $|a|, |b|, |c| \le 10^9$.
- Đối với một đường thẳng, ba hệ số $a, b, c$ và $a, b$ không đồng thời bằng $0$.

***Output:***

- In ra kích thước của tập hợp gồm nhiều đường thẳng song song nhất trong các đường thẳng đã cho.

***Sample Input:***

```
5
1 0 0
1 2 3
3 4 5
30 40 0
30 40 50
```

***Sample Output:***

```
2
```

***Giải thích:***

Hai đường thẳng $3x + 4y + 5 = 0$ và $30x + 40y + 0 = 0$ tạo thành một tập con chứa nhiều đường thẳng song song nhất.

### Ý tưởng

Ta có phương trình đường thẳng có dạng $ax + by + c = 0\; (1)$ với $a, b$ và $c$ là các hệ số và $x$ và $y$ là các biến.

Phương trình của $(1)$ theo hệ số góc là $y = mx + C \;(2)$ với $m$ là hệ số góc của đường thẳng $(1)$.

Từ $(1)$ và $(2),$ ta có:

$$\begin{cases} m = -\frac{a}{b}. \\ C = -\frac{c}{b}.
\end{cases}$$

Bây giờ, để hai đường thẳng song song thì chúng phải có cùng hệ số góc $m$ và $C$ khác nhau. Nếu $C$ bằng nhau thì chúng là hai đường thẳng trùng nhau. Vì vậy, chúng ta chỉ cần tạo các `set` chứa các đường thẳng song song khác nhau theo hệ số góc của chúng và sau đó tìm độ dài của `set` lớn nhất. 

Để lưu tập hợp các đường thẳng theo từng hệ số góc, ta sử dụng một `map` với `key` là hệ số góc, còn `value` là một `set` chứa hệ số tự do $C$ của các đường thẳng có chung hệ số góc tương ứng đối với C++. Còn đối với Python, các bạn sẽ sử dụng $1$ `dictionary` để lưu các đường thẳng phân biệt (tránh trường hợp các đường thẳng bị trùng nhau tính hai lần), còn một `dictionary` để lưu số lần xuất hiện của các đường thẳng có hệ số góc giống nhau. 

Tuy nhiên, các bạn cần lưu ý trường hợp đường thẳng có $b = 0$. Khi đó, đường thẳng này sẽ song song với trục tung, và dĩ nhiên mọi đường thẳng có $b = 0$ đều sẽ song song với nhau. Ta sẽ coi $m = \infty$ và $C = -\frac{c}{a}$ để phân biệt các đường thẳng đó với nhau, chứ không sử dụng hệ số góc để tránh chia cho $0$.

Độ phức tạp tổng quát của giải thuật là $O\big(n.\log(n)\big)$.

### Cài đặt

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>
#define task "tap_hop_lon_nhat."

using namespace std;

// Cấu trúc lưu ba hệ số của một đường thẳng dạng tổng quát.
struct Line
{
    int a, b, c;
};

void enter(int &n, vector < Line > &lines)
{
    cin >> n;

    lines.resize(n + 1);
    for (int i = 1; i <= n; ++i)
        cin >> lines[i].a >> lines[i].b >> lines[i].c;
}

void query(int n, vector < Line > &lines)
{
    // Sử dụng map với key là các hệ số góc, value là set lưu tập hợp các đường thẳng
    // phân biệt có chung hệ số góc (tức là song song).
    map < double, set < double > > parallel_lines;
    for (int i = 1; i <= n; ++i)
        // Nếu b = 0 thì coi như hệ số góc là vô cùng và hệ số tự do là -c/a.
        if (lines[i].b == 0)
        {
            double m = DBL_MIN;
            double C = -lines[i].c / (double) lines[i].a;

            parallel_lines[m].insert(C);
        }
        // Nếu b != 0 thì hệ số góc và hệ số tự do tính theo công thức bình thường.
        else
        {
            double m = -lines[i].a / (double) lines[i].b;
            double C = -lines[i].c / (double) lines[i].b;

            parallel_lines[m].insert(C);
        }

    // Tìm tập hợp có số đường thẳng song song lớn nhất.
    // Phải ép kiểu int cho hàm size() của map value, do tính chất ngôn ngữ C++.
    int res = 0;
    for (auto e: parallel_lines)
        res = max(res, (int) e.second.size());

    cout << res << endl;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int ntest;
    cin >> ntest;

    while (ntest--)
    {
        int n;
        vector < Line > lines;

        enter(n, lines);
        query(n, lines);
    }

    return 0;
}
```

***Ngôn ngữ Python:***

```python
# TASK_NAME = tap_hop_lon_nhat

def enter():
    n = int(input())

    lines = []
    for _ in range(n):
        a, b, c = map(int, input().split())
        lines.append((a, b, c))

    return n, lines


def query(n, lines):
    # Dictionary lưu các đường thẳng phân biệt.
    different_lines = {}
    # Dictionary lưu số lần xuất hiện của các đường thẳng chung hệ số góc,
    # đồng nghĩa với việc chúng song song với nhau.
    parallel_lines = {}

    for line in lines:
        m, C = 0, 0

        # Tính hệ số góc và hệ số tự do của từng đường thẳng.
        if line[1] == 0:
            m = -1000000000000
            C = -line[2] / line[0]
        else:
            m = -line[0] / line[1]
            C = -line[2] / line[1]

        # Lưu vào dictionary.
        if (m, C) not in different_lines:
            different_lines[(m, C)] = 1

            if m not in parallel_lines:
                parallel_lines[m] = 1
            else:
                parallel_lines[m] += 1

    # Tìm tập hợp đường thẳng song song lớn nhất.
    res = 0
    for g in parallel_lines.keys():
        res = max(res, parallel_lines[g])

    print(res)


if __name__ == '__main__':
    ntest = int(input())

    for _ in range(ntest):
        n, lines = enter()
        query(n, lines)
```

# V. Tài liệu tham khảo

- https://www.cplusplus.com/reference/map/
- https://www.stdio.vn/modern-cpp/stl-map-trong-c-v12lmL
- https://vi.wikipedia.org/wiki/%C3%81nh_x%E1%BA%A1