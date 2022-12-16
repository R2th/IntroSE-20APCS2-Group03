# I. Giới thiệu chung

Với những ai đã và đang học lập trình, đặc biệt là lập trình thi đấu, thì những cấu trúc dữ liệu như `set`, `map` hay `dictionary` có lẽ là rất quen thuộc. Tên gọi của chúng có thể khác nhau ở các ngôn ngữ, nhưng tác dụng thì không hề thay đổi. Ứng dụng của chúng lớn đến mức, nhiều tài liệu khi hướng dẫn về lập trình cơ bản cũng đưa những cấu trúc dữ liệu này vào giảng dạy song song với mảng hay danh sách liên kết,...

Đúng như tên gọi của nó, tập hợp (set) là một cấu trúc dữ liệu dạng giống như mảng, lưu một danh sách các phần tử. Bản chất cấu trúc này được xây dựng dựa trên cấu trúc dữ liệu cây tìm kiếm nhị phân, nhưng nó đã phổ biến đến mức người ta quên đi cách cài đặt gốc của nó. Tuy nhiên, trong C++ và trong Python thì cấu trúc dữ liệu này sẽ có những sự khác biệt nhất định. Trong bài viết này, tôi sẽ giới thiệu tới các bạn về cách sử dụng chúng, cũng như minh họa một vài bài toán để bạn đọc hiểu hơn về ứng dụng của những cấu trúc này.

# II. Sử dụng `set` trong C++

## 1. Khai báo

Trong C++, `set` là một ***associative container*** của thư viện Template chuẩn C++ (STL) (những container mà kiểm soát phần tử bằng giá trị chứ không phải bằng vị trí thì gọi là associative containers). Nó sử dụng để lưu trữ các phần tử có cùng kiểu dữ liệu, tuy nhiên các phần tử đó không được lặp lại. 

Những phần tử được lưu trong `set` gọi là ***khóa.*** Trong `set` sử dụng sẵn phép so sánh mặc định là `less`, nghĩa là phần tử đứng trước sẽ nhỏ hơn phần tử đứng sau (theo phép so sánh). Khi sử dụng `set`, các bạn có thể viết lại hàm so sánh theo ý muốn của mình.

Để khai báo một `set`, ta sử dụng những cú pháp sau:

```cpp
#include <set>

using namespace std;

// Khởi tạo một set rỗng.
set <{Kiểu_phần_tử}> {Tên_set};
// Tạo một set từ mảng khác. Có thể tạo ra set từ một đoạn của mảng.
set <{Kiểu_phần_tử}> {Tên_set}({Phạm_vi_trên_mảng});
```

Ví dụ, dưới đây ta tạo ra một `set` gồm toàn số nguyên từ một mảng cho trước (`vector` cũng sử dụng tương tự):

```cpp
#include <set>

using namespace std;

main()
{
    int a[] = {1, 5, 2, 4, 3};
    set < int > integers(a, a + 5); // integers = {1, 2, 3, 4, 5}.
}
```

## 2. Các thao tác với `set` trong C++

### Duyệt `set`

Các phần tử trong `set` không thể truy cập trực tiếp qua vị trí, mà buộc phải sử dụng vòng lặp để duyệt. Vì `set` là một container thuộc STL, nên các phần tử của nó có thể duyệt qua bằng `iterator` theo cú pháp:

```cpp
// Khai báo biến lặp.
set < {Kiểu_phần_tử} > :: iterator {Tên_biến_lặp};

// Duyệt set.
for ({Biến_lặp} = {Địa_chỉ_đầu}; {Biến_lặp} != {Địa_chỉ_cuối}; ++{Biến_lặp})
```

Chẳng hạn, với một `set` kiểu số nguyên là $\text{integers}$, ta duyệt qua nó như sau:

```cpp
set < int > :: iterator it;
for (it = integers.begin(); it != integers.end(); ++it)
    cout << *it << endl;
```

Với `set` $\text{integers} = \{1, 2, 3, 4, 5\};$ đoạn chương trình trên sẽ có kết quả là:

```
1
2
3
4
5
```

### Các hàm dựng sẵn

Container `set` đã xây dựng sẵn một số hàm để thao tác với `set`, cụ thể tôi trình bày ở bảng dưới đây. Để sử dụng hàm, ta dùng cú pháp: `{Tên_set}.{Tên_hàm}`. Coi rằng kích thước của `set` hiện tại là $n$.

| Tên hàm | Tác dụng | Độ phức tạp |
|:------------------:|:-----------:|:--------------:|
| `insert(x)`  | Thêm phần tử $x$ vào tập hợp, tự động sắp xếp lại | $O\big(\log(n)\big)$ |
| `find(x)`  | Trả về `iterator` trỏ tới phần tử $x$ trong tập hợp, nếu không tìm thấy thì trả về `iterator` `end()`| $O\big(\log(n)\big)$ |
|  `clear()` | Xóa toàn bộ tập hợp | $O(n)$ |
| `erase(id)`  | Xóa một phần tử $id$ trong tập hợp, có thể xóa theo khóa hoặc xóa theo `iterator` | $O\big(\log(n)\big)$ |
| `size()` | Trả về kích thước hiện tại của tập hợp | $O(1)$ |
| `empty()` | Trả về `true` nếu tập hợp rỗng, ngược lại trả về `false` | $O(1)$ |
| `lower_bound(key)` | Trả về `iterator` trỏ tới phần tử nhỏ nhất có giá trị lớn hơn hoặc bằng khóa $\text{key}$ trong tập hợp (theo phép so sánh), nếu không tìm thấy thì trả về `iterator` `end()` | $O\big(\log(n)\big)$ |
| `upper_bound(key)` | Trả về `iterator` trỏ tới phần tử nhỏ nhất có giá trị lớn hơn khóa $key$ trong tập hợp (theo phép so sánh), nếu không tìm thấy thì trả về `iterator` `end()` | $O\big(\log(n)\big)$ |
| `count(key)` | Trả về số lần xuất hiện của khóa $\text{key}$ trong tập hợp | $O\big(\log(n)\big)$ |

### Viết hàm so sánh cho `set`

Hàm so sánh của `set` có thể được viết riêng theo ý các bạn theo cú pháp sau:

```cpp
struct cmp
{
    bool operator() ({Kiểu_phần_tử} x, {Kiểu_phần_tử} y) 
    {
        return {Quan_hệ_x_và_y};
    }
};

set <{Kiểu_phần_tử}, cmp> {Tên_set};
```

Trong hàm so sánh trên, phần tử $x$ sẽ đại diện cho phần tử đứng trước trong `set`, $y$ đại diện cho phần tử đứng sau. Nếu như hàm đó trả về kết quả `true` thì phần tử $x$ sẽ được xếp đứng trước phần tử $y$ trong `set`, ngược lại thì hai phần tử sẽ đổi chỗ cho nhau.

Ví dụ, muốn tạo một `set` lưu các số nguyên nhưng theo thứ tự giảm dần, ta làm như sau:

```cpp
#include <set>

using namespace std;

struct cmp
{
    bool operator() (int x, int y)
    {
        return x > y;
    }
};

main()
{
    int arr[] = {1, 5, 2, 4, 3};
    set < int, cmp > integers(arr, arr + 5); // integers = {5, 4, 3, 2, 1}.
}
```

## 3. Các cấu trúc `multiset` và `unordered_set`

Ngoài ra, trong STL C++ còn xây dựng hai associative container khác gần giống với `set`:

- `multi_set`: Cấu trúc này giống hệt như `set` nhưng cho phép lưu trữ nhiều phần tử có cùng khóa với nhau. Các bạn có thể tìm hiểu thêm về cấu trúc này tại <i><b><a href="https://www.cplusplus.com/reference/set/multiset/">đây.</a></b></i>
- `unordered_set`: Cấu trúc này cũng giống như `set`, nhưng các phần tử khi thêm vào sẽ không được sắp xếp theo thứ tự, nên các thao tác thêm và tìm kiếm phần tử chỉ tốn thời gian $O(1)$. Nhưng cũng chính vì thế mà cấu trúc này sẽ không có các hàm tìm kiếm như `lower_bound()` và `upper_bound()`. Các bạn tìm hiểu thêm về cấu trúc này tại <i><b><a href="https://en.cppreference.com/w/cpp/container/unordered_set">đây.</a></b></i>

# III. Sử dụng `set` trong Python

## 1. Khai báo

Trong ngôn ngữ Python, `set` có hơi khác biệt một chút so với C++. Vẫn là một danh sách lưu các phần tử phân biệt, tuy nhiên các phần tử lưu trong `set` của Python sẽ không có tính thứ tự (không được sắp xếp). Nhưng điều thuận tiện là nó có thể lưu trữ các phần tử với kiểu khác nhau, chẳng hạn như các phần tử kiểu chuỗi, số và `list` có thể được lưu cùng trong một `set`.

Để khai báo một `set` trong Python, ta sử dụng một số cú pháp sau:

```python
# Khai báo set rỗng.
{Tên_set} = set()

# Khởi tạo set có sẵn các phần tử.
{Tên_set} = {{Phần_tử_thứ_nhất}, {Phần_tử_thứ_hai},...}

# Tạo set từ một list có sẵn.
{Tên_set} = set({Tên_list})
```

Lấy ví dụ:

```python
set1 = set()
set2 = {"Vũ Quế Lâm", 1, ['a', 'b', 'c']}
set3 = set([1, 4, 2, 2, 5, 5])  # set3 = {1, 4, 2, 5}
```

Vậy có thể các bạn sẽ thắc mắc, nếu như ta muốn có một cấu trúc được sắp xếp giống như `set` của C++ trong Python thì phải làm sao? Câu trả lời là cấu trúc đó không tồn tại trong Python, vì bản chất cài đặt của `set` ở hai ngôn ngữ là khác nhau. Nhưng các bạn có thể cải tiến `dictionary` trong Python để thu được một cấu trúc tương tự, điều này sẽ được đề cập tới trong bài viết sau.

## 2. Các thao tác với `set` trong Python

### Duyệt `set`

Các phần tử trong `set` của Python không có thứ tự nên không thể truy cập thông qua vị trí, mà buộc phải sử dụng vòng lặp:

```python
for {Biến_đại_diện} in {Tên_set}:
    {Các_câu_lệnh}
```

Ví dụ:

```python
set1 = {5, 6, 7, 4}
for item in set1:
    print(item)
```

Kết quả đoạn chương trình trên như sau:

```
5
6
7
4
```

### Kiểm tra phần tử có ở trong `set` hay không

Sử dụng `in` hoặc `not in` để kiểm tra một phần tử có trong `set` hay không. Ví dụ:

```python
myset = {10, 15, 19, 14}

print(10 in myset)
print(15 not in myset)
```

Kết quả:

```
True
False
```

### Các hàm dựng sẵn

Tương tự như trong C++, `set` trong Python cũng đã được xây dựng sẵn một số hàm hỗ trợ, cụ thể như bảng dưới đây. Kí hiệu kích thước của `set` $s$ là $|s|$:

| Tên hàm | Tác dụng | Độ phức tạp |
|:------------------:|:-----------:|:--------------:|
| `s.add(x)`  | Thêm phần tử $x$ vào tập hợp | $O(1)$ |
| `s.update({Các_phần_tử})`  | Thêm nhiều phần tử vào `set` | $O(m)$ - $m$ là số phần tử thêm vào |
|  `s.clear()` | Xóa toàn bộ `set` | $O\big(\|s\|\big)$ |
| `s.pop()`  | Xóa phần tử ở cuối `set`, tuy nhiên không nên sử dụng vì ta không biết phần tử ở cuối là phần tử nào | $O(1)$ |
| `s.discard(x)` | Xóa phần tử $x$ trong `set`, nếu phần tử này không tồn tại thì cũng không báo lỗi | $O(1)$ |
| `s.remove(x)` | Xóa phần tử $x$ trong `set`, nếu phần tử này không tồn tại thì sẽ báo lỗi | $O(1)$ |
| `s1.union(s2)` | Kết hợp hai `set` $s1$ và $s2$ loại bỏ các phần tử trùng nhau của hai `set` - còn gọi là phép hợp | $O\big(\|s1\| + \|s2\|\big)$ |
| `s1.intersection(s2)` | Trả về các phần tử chung giữa hai `set` - còn gọi là phép giao | $O\left(\text{min}\big(\|s1\|, \|s2\|\big)\right)$ |
| `s1.different(s2)` | Trả về các phần tử chỉ thuộc một trong hai `set` - còn gọi là phép trừ | $O\big(\|s1\|\big)$ |

Ngoài ra trong `set` của Python còn khá nhiều hàm tích hợp khác, các bạn có thể xem kĩ hơn cả ví dụ minh họa tại <i><b><a href="https://nguyenvanhieu.vn/cach-su-dung-set-trong-python/">đây.</a></b></i>

# IV. Một số bài toán minh họa

## 1. Bài toán 1

### Đề bài

Tèo chuẩn bị tổ chức một bữa tiệc và anh ấy có nhiều thanh chocolate, trong đó có một số thanh chocolate cùng loại. Anh ấy muốn tặng chocolate cho bạn bè của mình một cách hoàn hảo, tức là mỗi người bạn của Tèo chỉ nhận được một thanh chocolate, và không có hai người bạn nào nhận được cùng một loại chocolate.

Hãy cho biết Tèo có thể tặng chocolate cho tối đa bao nhiêu người bạn?

***Input:***

- Dòng đầu tiên chứa số nguyên $n$ chỉ số lượng thanh chocolate mà Tèo đang có.
- Dòng thứ hai chứa $n$ số nguyên $a_1, a_2, ..., a_n$ với $a_i$ là loại của thanh chocolate thứ $i$.

***Ràng buộc:***

- $1 \le n \le 10^6$.
- $0 \le a_i \le 10^9; \forall i: 1 \le i \le n$.

***Output:***

- Số nguyên duy nhất là số lượng người bạn tối đa mà Tèo có thể phát chocolate.

***Sample Input:***

```
3
1 2 2
```

***Sample Output:***

```
2
```

### Ý tưởng

Ý tưởng của bài toán này rất rõ ràng là đếm số lượng phần tử khác nhau trong dãy số ban đầu.

Ta có một vài cách để làm bài toán này:

- Sắp xếp lại dãy số rồi duyệt lại cả dãy để xác định các phần tử phần biệt. Cách làm này hơi dài dòng và không đúng chủ đề nên tôi không đề cập.
- Đếm phân phối các phần tử trong dãy số ban đầu. Cách làm này chỉ mất phức tạp $O\big(\text{max}(a_i)\big)$ - không phù hợp với ràng buộc của bài toán là $a_i \le 10^9$.
- Tạo ra một `set` từ dãy số ban đầu rồi đưa ra kích thước của `set` đó - cũng chính là số lượng phần tử phân biệt trong `set`. Cách làm này ngắn gọn và phù hợp nhất cho bài này.

Độ phức tạp chung của giải thuật sẽ là $O\big(n.\log(n)\big)$.

### Cài đặt

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>

using namespace std;

main()
{
    int n;
    cin >> n;

    vector < int > a(n);
    for (int i = 0; i < n; ++i)
        cin >> a[i];

    set < int > unique_elements(a.begin(), a.end());

    cout << unique_elements.size();
}

```

***Ngôn ngữ Python:***

```python
if __name__ == '__main__':
    n = int(input())
    a = [int(x) for x in input().split()]

    print(len(set(a)))
```

## 2. Bài toán 2

### Đề bài

Hãy gọi một số là $k$ - tốt nếu nó chứa tất cả các chữ số không vượt quá $k \ (0, ..., k)$. Bi có một số $k$ và một mảng $A$ chứa $n$ số. Tìm giúp Bi xem có bao nhiêu số đẹp $k$ trong $A$ (đếm từng số mỗi khi nó xuất hiện trong mảng $a$).

Hãy xác định có bao nhiêu số $k$ - tốt trong dãy $A?$.

***Input:***
 
- Dòng đầu tiên chứa $n$ và $k$ tương ứng với đề bài.
- $n$ dòng tiếp theo, mỗi dòng chứa một số $a_i$ - phần tử thứ $i$ của mảng $A \ (1 \le i \le n)$.

***Ràng buộc:***

- $1 \le n \le 10^5$.
- $0 \le k \le 9$.
- $1 \le a_i \le 10^9; \forall i: 1 \le i \le n$.

***Output:***

- In ra số lượng số $k$ - tốt trong dãy $a$.

***Sample Input:***

```
2 1
1
10
```

***Sample Output:***

```
1
```

### Ý tưởng

Ứng với mỗi số $a_i,$ sử dụng đếm phân phối hoặc `set` để đếm các chữ số khác nhau của nó mà không vượt quá $k$. Nếu số lượng chữ số khác nhau đó đúng bằng $k + 1$ thì số $a_i$ là số $k$ - tốt, ngược lại thì không phải.

Sử dụng `set` tất nhiên sẽ cài đặt ngắn gọn hơn rất nhiều, nên tôi khuyến khích các bạn sử dụng cách này.

Độ phức tạp: $O\big(n \times \log(k)\big)$.

### Cài đặt

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>

using namespace std;

void enter(int &n, int &k, vector < string > &a)
{
    cin >> n >> k;

    a.resize(n + 1);
    for (int i = 1; i <= n; ++i)
        cin >> a[i];
}

void solution(int n, int k, vector < string > &a)
{
    int res = 0;
    for (int i = 1; i <= n; ++i)
    {
        set < char > digits;
        for (char d: a[i])
        {
            if (d - '0' > k)
                continue;

            digits.insert(d);
        }

        res += (digits.size() == k + 1);
    }

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    vector < string > a;

    enter(n, k, a);
    solution(n, k, a);

    return 0;
}
```

***Ngôn ngữ Python:***

```python
if __name__ == '__main__':
    n, k = map(int, input().split())

    res = 0
    for _ in range(n):
        a = input()

        digits = set()
        for d in a: 
            if int(d) > k: 
                digits.add(d)

        if len(digits) == k + 1:
            res += 1

    print(res)
```

# V. Tài liệu tham khảo

- https://codelearn.io/Discussion/Topic/136961
- https://nguyenvanhieu.vn/cach-su-dung-set-trong-python/
- https://www.codegrepper.com/code-examples/cpp/c%2B%2B+custom+compare+in+set
- https://www.cplusplus.com/reference/set/multiset/
- https://www.cplusplus.com/reference/set/set/