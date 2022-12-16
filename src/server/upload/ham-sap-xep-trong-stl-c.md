## I. Giới thiệu về STL
STL (Standard Template Library) là một thư viện template (lập trình theo mẫu) cho C++ với những cấu trúc dữ liệu cũng như giải thuật được xây dựng tổng quát mà vẫn tận dụng được hiệu năng và tốc độ của ngôn ngữ lập trình C. Với khái niệm template, những người lập trình đã đề ra khái niệm lập trình khái lược (generic programming), C++ được cung cấp kèm với bộ thư viện chuẩn STL.

Để sử dụng STL, bạn cần khai báo từ khóa `using namespace std;` sau các khai báo thư viện (ví dụ `#include`).
```cpp
#include <iostream>
#include <vector>

using  namespace std;  //khai báo sử dụng STL
 
main()
{
 ....
}
```

Tại bài viết này mình sẽ không đi sâu vào các tính năng của thư viện STL mà chú yếu khai thác các đặc tính cũng như cách sử dụng của hàm `sort()` trong thư viện STL của C++.
## II. Một số cách sử dụng hàm sort()
### 1. Khai báo thư viện
Để sử dụng hàm `sort()`, chúng ta cần khai báo thư viện `algorithm`:
```cpp
#include<algorithm>
```
### 2. Truy cập địa chỉ của phần tử trong mảng và vector
Các hàm thao tác trên đoạn trong thư viện <algorithm> đều sử dụng các tham số là các địa chỉ. Mỗi biến được tạo ra trong khi lập trình đều có địa chỉ cụ thể trong bộ nhớ, và các biến địa chỉ sẽ giúp chúng ta truy cập tới địa chỉ của biến đó. Đối với mảng và vector, ta có cách truy cập nhanh tới địa chỉ của các phần tử như sau:

Đối với mảng:
    
```cpp
{Tên_mảng} + {Vị_trí};
```
    
Đối với vector:
    
```cpp
{Tên_vector}.begin() + {Vị_trí};
```
    
### 3. Sắp xếp cơ bản
Xét mảng gồm n phần tử:

$a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]$

Cách dùng cơ bản nhất của hàm `sort()` là sắp xếp tăng dần các phần tử từ vị trí $i$ đến vị trí $j$ (lưu ý ở đây ta xét mảng bắt đầu từ vị trí $0$):
```cpp
sort(a + i, a + j + 1);
```
Ngoài ra đối với một số kiểu dữ liệu khác, như `vector`, ta có thể sử dụng câu lệnh như sau:
```cpp
sort(a.begin(), a.end());
```
Ví dụ tham khảo:
```cpp
#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;

int main()
{
	int a[6] = {5, 4, 3, 2, 1, 0};
	sort(a, a + 6);   // thu được 0 1 2 3 4 5
//	sort(a + 2, a + 5);  thu được 5 4 1 2 3 0
    vector<int> a = {5, 4, 3, 2, 1, 0};
    sort(a.begin(), a.end()); // thu được 0 1 2 3 4 5
	return 0;
}
```
### 4. Sắp xếp theo thứ tự giảm dần
Chúng ta có thể sắp xếp các phần tử theo thứ tự giảm dần bằng cách truyền tham số `comp` vào con trỏ hàm của hàm `sort()` như sau:
```cpp
bool comp(const int a, const int b){
   return a > b;
}
int main(){
   int a[6] = {0, 1, 2, 3, 4, 5};
   sort(a, a + 6, comp); // thu được 5 4 3 2 1 0
   vector<int> a = {0, 1, 2, 3, 4, 5};
   sort(a.begin(), a.end(), comp); // thu được 5 4 3 2 1 0
   return 0;
}
```
### 5. Sử dụng 2 phép toán less và greater
Hai từ khóa `less` và `greater` thể hiện cho hai phép toán sắp xếp tăng dần hoặc giảm dần (thực ra chính là thể hiện của các toán tử `<` và `>`), khi muốn điều chỉnh cách sắp xếp ta chỉ cần thêm hai phép toán này vào tham số thứ ba của hàm sắp xếp theo cú pháp:
```cpp
sort(l, r, greater < {Kiểu_phần_tử} >());
sort(l, r, less < {Kiểu_phần_tử} >());
```
Trong đó, `{Kiểu_phần_tử}` là kiểu dữ liệu của các phần tử trong tập hợp cần sắp xếp.
* Chương trình tham khảo:
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
```cpp
Kết quả sắp xếp:
10 5 3 2 1
```
### 6. Một vài kiểu sắp xếp khác
* Sắp xếp theo bảng chữ cái:
```cpp
int main()
{
	string str[5] = {"c", "abc", "ac", "bb", "aaaa"};
	sort(str, str + 5); // "aaaa" "abc" "ac" "bb" "c"
	return 0;
}
```
* Sắp xếp theo bảng chữ cái kết hợp độ dài tăng dần:
```cpp
bool cmp(string str1,string str2)
{
    return str1.length() < str2.length();
}
int main()
{
	string str[5] = {"c", "abc", "ac", "bb", "aaaa"};
	sort(str, str + 5, cmp); // "c" "ac" "bb" "abc" "aaaa"
	return 0;
}
```
## III. Xung quanh hàm sort()
### 1. Tham số phụ comp
Đây là một yếu tố ta có thể thay đổi linh hoạt để hướng hàm `sort()` đến mục đích mong muốn của chúng ta. Ngoài những ví dụ như trên bạn hoàn toàn có thể xây dựng một hàm `sort()` đặc biệt dành riêng cho bạn.
### 2. Nhận xét về hàm sort()
Hàm `sort()` tối ưu hóa hơn các đặc điểm so với những thuật toán sắp xếp thông thường, nó là một sự kết hợp cũng như cải tiến dung hòa giữa các thuật toán sắp xếp. Với tính linh hoạt của nó, hầu như hàm `sort()` có thể đáp ứng đầy đủ những nhu cầu sắp xếp của chúng ta.
### 3. Một số hàm sắp xếp khác
Ngoài ra bạn có thể tìm hiểu một số hàm sắp xếp khác, mỗi hàm đều có những điểm đặc biệt riêng của nó:

`stable_sort`
`partial_sort`
`partial_sort_copy`
`nth_element`
`is_sorted`
`partition`
`stable_partition`

## IV. Tài liệu tham khảo
* [https://en.wikipedia.org/wiki/Standard_Template_Library](https://en.wikipedia.org/wiki/Standard_Template_Library)
* [https://en.wikipedia.org/wiki/Sort_(C%2B%2B)](https://en.wikipedia.org/wiki/Sort_(C%2B%2B))