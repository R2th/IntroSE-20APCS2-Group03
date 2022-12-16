# I. Tổng quan về thư viện STL C++

Đã là dân lập trình, đặc biệt lại sử dụng ngôn ngữ C++, thì chắc chắn không ai trong số chúng ta không biết đến thư viện Template chuẩn C++ (Standard Template Library). Thư viện này cung cấp rất nhiều thứ hỗ trợ sẵn cho lập trình viên trong quá trình làm việc, trong số đó có những thuật toán cơ bản. Một trong số những thuật toán mà STL C++ hỗ trợ là ***Tìm kiếm nhị phân***, một thuật toán vô cùng hữu ích đối với tất cả những người học Lập trình.

Có bốn hàm tìm kiếm nhị phân đã được xây dựng sẵn trong thư viện STL C++, đó là: `lower_bound`, `upper_bound`, `binary_search` và `equal_range`. Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách sử dụng của các hàm này và áp dụng chúng vào một số bài toán cụ thể. Sử dụng tốt các hàm nói trên có thể giúp các bạn giảm được thời gian lập trình rất nhiều, code cũng trở nên ngắn gọn và đẹp mắt hơn.

Trước khi đọc bài viết này, các bạn cần phải có kiến thức về ***Bài toán tìm kiếm*** và ***Phương pháp Tìm kiếm nhị phân***. Nếu như các bạn vẫn chưa nắm được những nội dung trên, hãy tìm hiểu về chúng ở hai bài viết trước đây của mình: 
- <b><a href="https://hackmd.io/7Me0y5g6Q06Qtpqd-DhUOA">Bài toán tìm kiếm.</a></b>
- <b><a href="https://hackmd.io/jEu6UqpsQ--1QTBvo3WFQw">Giải thuật Tìm kiếm nhị phân nâng cao.</a></b>

# II. Các hàm tìm kiếm nhị phân trong STL C++

## 1. Nhắc lại cách truy cập địa chỉ trên mảng và vector

Trước khi đi vào cách sử dụng của các hàm tìm kiếm nhị phân, các bạn cần lưu ý rằng chúng đều đều thuộc vào thư viện `<algorithm>`. Trong thư viện này có khá nhiều hàm dựng sẵn hỗ trợ các thuật toán trên mảng như: Tìm phần tử lớn nhất - nhỏ nhất, Tìm hoán vị kế tiếp, Tìm kiếm nhị phân,...Những hàm này đều có đặc điểm là được cài đặt theo kiểu ***nửa khoảng***, nghĩa là khi các bạn gọi thực hiện hàm đó trên đoạn $[l, r],$ thì thực tế hàm chỉ thao tác trên đoạn $[l, r - 1]$. Nói cách khác, các bạn sẽ cần truyền vào cặp vị trí $(l, r + 1)$ nếu muốn thực hiện thuật toán trên đoạn $[l, r]$.

Điều thứ hai, các hàm thao tác trên đoạn trong thư viện `<algorithm>` đều sử dụng các tham số là các ***biến lặp (iterator)*** hoặc ***biến con trỏ***, và hàm Tìm kiếm nhị phân không phải là ngoại lệ. Mỗi biến được tạo ra trong khi lập trình đều có địa chỉ cụ thể trong bộ nhớ, và các ***biến lặp*** hoặc ***con trỏ*** sẽ giúp chúng ta truy cập tới địa chỉ của các biến trong STL C++. Đối với mảng và vector, ta có cách truy cập nhanh tới địa chỉ của các phần tử như sau:
- Đối với mảng:
    
```cpp
{Tên_mảng} + {Vị_trí};
```

Chẳng hạn, `a + 0` tức là địa chỉ của $a_0,$ `a + 1` là địa chỉ của $a_1,...$

- Đối với `vector`:

```cpp
{Tên_vector}.begin() + {Vị_trí};
```

Ví dụ, `a.begin()` là địa chỉ của phần tử đầu tiên trong `vector`, `a.begin() + 1` là địa chỉ của phần tử thứ nhất trong vector,...Tuy nhiên, vector có một đặc điểm là luôn luôn tồn tại một vị trí cuối cùng là `a.end()` có tác dụng đánh dấu vector đã kết thúc (nhưng không mang giá trị gì cả), vì thế địa chỉ của phần tử này có thể hiểu là `a.begin() + n`, với $n$ là kích thước của vector $a$.

## 2. Hàm `binary_search`:

***Cú pháp:***

```cpp
// Dạng 1:
binary_search(l, r, val);

// Dạng 2:
binary_search(l, r, val, comp);
```

***Tác dụng:*** Tìm kiếm xem giá trị $val$ có xuất hiện trong đoạn $[l, r - 1]$ của đoạn cần tìm không (lưu ý đoạn tìm kiếm phải được sắp xếp theo một trật tự nhất định). Nếu tìm thấy $val$ thì trả về $\text{true},$ ngược lại trả về $\text{false}$. 

Ở dạng $1,$ phép so sánh mặc định của hàm là `<`, nghĩa là hai phần tử $a, b$ được xem là bằng nhau nếu như `!(a < b) && !(b < a)`.

Ở dạng $2,$ các bạn có thể tự viết một hàm so sánh kiểu boolean `comp` theo ý mình, khi đó hai phần tử $a, b$ được xem là bằng nhau nếu như `!(comp(a, b)) && !(comp(b, a))`.

Lưu ý, nếu như không gian tìm kiếm có kiểu của các phần tử là `pair`, thì phép so sánh sẽ ưu tiên thực hiện theo trường `first` trước, rồi mới tới trường `second`.

***Ví dụ:*** 

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool comp(int a, int b)
{
    return a > b;	
}

int main()
{
    int a[] = {1, 2, 3, 4, 5, 4, 3, 2, 1};
    // Copy mảng a sang vector v. Sau đây v = {1, 2, 3, 4, 5, 4, 3, 2, 1}.
    vector < int > v(a, a + 9); 
	
    // a = {1, 1, 2, 2, 3, 3, 4, 4, 5}.
    sort(a, a + n);
    if (binary_search(a, a + n, 5))
        cout << "Tìm thấy phần tử 5" << endl;
    else 
        cout << "Không tìm thấy phần tử 5" << endl;
	
    // v = {5, 4, 4, 3, 3, 2, 2, 1, 1}.
    sort(v.begin(), v.end(), comp);
    if (binary_search(a, a + n, 6, comp))
        cout << "Tìm thấy phần tử 6";
    else 
        cout << "Không tìm thấy phần tử 6";

    return 0;
}
```

Biên dịch và chạy đoạn chương trình trên, ta thu được kết quả:

```
Tìm thấy phần tử 5
Không tìm thấy phần tử 6
```

***Độ phức tạp của hàm:*** $O(\log_2(n)),$ với $n$ là kích thước không gian tìm kiếm.

## 3. Hàm `lower_bound`:

***Cú pháp:***

```
// Dạng 1:
lower_bound(l, r, val);

// Dạng 2:
lower_bound(l, r, val, comp);
```

***Tác dụng:*** Trả về iterator hoặc con trỏ trỏ tới phần tử đầu tiên trong đoạn $[l, r - 1]$ mà lớn hơn hoặc bằng khóa tìm kiếm $val$. Nếu như không tìm thấy, hàm sẽ trả về iterator trỏ vào vị trí $r$. Đoạn tìm kiếm ***bắt buộc*** phải được sắp xếp theo đúng phép toán so sánh của hàm. 

Ở dạng $1,$ phép toán so sánh mặc định là `<`. Nghĩa là hàm sẽ trả về iterator vào vị trí đầu tiên mà `(*it >= val)`

Ở dạng $2,$ phép toán so sánh sẽ được định nghĩa theo hàm boolean `comp` do người dùng tự viết. Hàm `comp` phải bao gồm hai tham số $a$ và $b$ - đại diện cho phần tử trong đoạn tìm kiếm và khóa tìm kiếm. Khi sử dụng hàm `comp` làm phép so sánh, hàm `lower_bound` sẽ trả về iterator vào vị trí đầu tiên mà `(comp(*it, val) == false)`.

Lưu ý, nếu như không gian tìm kiếm có kiểu của các phần tử là `pair`, thì phép so sánh sẽ ưu tiên thực hiện theo trường `first` trước, rồi mới tới trường `second`.

***Ví dụ:***

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool comp(int a, int b)
{
    return a > b;	
}

int main()
{
    int a[] = {10, 20, 30, 40, 50, 40, 30, 20, 10};
    vector < int > v(a, a + 9);
	
    // a = {10, 10, 20, 20, 30, 30, 40, 40, 50}
    sort(a, a + 9);
	
    // Tìm vị trí của phần tử đầu tiên lớn hơn hoặc bằng 30 trong mảng a.
    // Muốn đưa ra vị trí là số nguyên thì lấy kết quả hàm trừ đi iterator a[0].
    int pos1 = lower_bound(a, a + 9, 30) - a;
    cout << "Vị trí đầu tiên lớn hơn hoặc bằng 30 là: " << pos1 << endl;

    // v = {50, 40, 40, 30, 30, 20, 20, 10, 10};
    sort(v.begin(), v.end(), comp);
    
    // Tìm vị trí đầu tiên nhỏ hơn hoặc bằng số 20 trong đoạn [0, 5] của vector v.
    // Tương tự, lấy hai iterator trừ cho nhau để ra được vị trí là số nguyên.
    int pos2 = lower_bound(v.begin(), v.begin() + 5, 20, comp) - v.begin();
    cout << "Vị trí đầu tiên nhỏ hơn hoặc bằng 20 là: " << pos2;
	
    return 0;
}
```

Biên dịch và chạy đoạn chương trình trên, ta thu được kết quả:

```
Vị trí đầu tiên lớn hơn hoặc bằng 30 là: 4
Vị trí đầu tiên lớn hơn hoặc bằng 20 là: 5
```

***Độ phức tạp của hàm:*** $O(\log_2(n)),$ với $n$ là kích thước không gian tìm kiếm.

## 4. Hàm `upper_bound`:

***Cú pháp:***

```
// Dạng 1:
upper_bound(l, r, val);

// Dạng 2:
upper_bound(l, r, val, comp);
```

***Tác dụng:*** Trả về iterator hoặc con trỏ trỏ tới phần tử đầu tiên trong đoạn $[l, r - 1]$ mà ***lớn hơn hẳn*** khóa tìm kiếm $val$. Nếu như không tìm thấy, hàm sẽ trả về iterator trỏ vào vị trí $r$. Đoạn tìm kiếm ***bắt buộc*** phải được sắp xếp theo đúng phép toán so sánh của hàm. 

Ở dạng $1,$ phép toán so sánh mặc định là `<`. Nghĩa là hàm sẽ trả về iterator vào vị trí đầu tiên mà `(*it > val)` (khác với `lower_bound`, các bạn chú ý phân biệt).

Ở dạng $2,$ phép toán so sánh sẽ được định nghĩa theo hàm boolean `comp` do người dùng tự viết. Hàm `comp` phải bao gồm hai tham số $a$ và $b$ - đại diện cho phần tử trong đoạn tìm kiếm và khóa tìm kiếm. Khi sử dụng hàm `comp` làm phép so sánh, hàm `upper_bound` sẽ trả về iterator vào vị trí đầu tiên mà `(comp(*it, val) == false)`. Lưu ý, phần tử mà hàm `upper_bound` trả về sẽ không thể bằng với khóa $val$.

Lưu ý, nếu như không gian tìm kiếm có kiểu của các phần tử là `pair`, thì phép so sánh sẽ ưu tiên thực hiện theo trường `first` trước, rồi mới tới trường `second`.

***Ví dụ:***

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool comp(int a, int b)
{
    return a > b;	
}

int main()
{
    int a[] = {10, 20, 30, 40, 50, 40, 30, 20, 10};
    vector < int > v(a, a + 9);
	
    // a = {10, 10, 20, 20, 30, 30, 40, 40, 50}
    sort(a, a + 9);
	
    // Tìm vị trí của phần tử đầu tiên lớn hơn 30 trong mảng a.
    // Muốn đưa ra vị trí là số nguyên thì lấy kết quả hàm trừ đi iterator a[0].
    int pos1 = upper_bound(a, a + 9, 30) - a;
    cout << "Vị trí đầu tiên lớn hơn 30 là: " << pos1 << endl;

    // v = {50, 40, 40, 30, 30, 20, 20, 10, 10};
    sort(v.begin(), v.end(), comp);
    
    // Tìm vị trí đầu tiên nhỏ hơn hơn 50 trong đoạn [0, 5] của vector v.
    // Tương tự, lấy hai iterator trừ cho nhau để ra được vị trí là số nguyên.
    int pos2 = upper_bound(v.begin(), v.end(), 50, comp) - v.begin();
    cout << "Vị trí đầu tiên nhỏ hơn 50 là: " << pos2;
	
    return 0;
}
```

Biên dịch và chạy đoạn chương trình trên, ta thu được kết quả:

```
Vị trí đầu tiên lớn hơn 30 là: 6
Vị trí đầu tiên nhỏ hơn 50 là: 1
```

***Độ phức tạp của hàm:*** $O(\log_2(n)),$ với $n$ là kích thước không gian tìm kiếm.

## 5. Hàm `equal_range`:

***Cú pháp:***

```
// Dạng 1:
equal_range(l, r, val);

// Dạng 2:
equal_range(l, r, val, comp);
```

***Tác dụng:*** Hàm `equal_range` trả về một biến kiểu `pair` có hai trường đều là iterator hoặc con trỏ trỏ vào khoảng có giá trị ***tương đương*** với khóa tìm kiếm $val$ trong đoạn $[l, r]$. Thực tế, hàm này là sự kết hợp giữa `lower_bound` và `upper_bound`, nó sẽ trả về một cặp iterator `(first, second)` thỏa mãn:
- Phần tử ở iterator `first` là phần tử đầu tiên lớn hơn hoặc bằng khóa $val$.
- Phần tử ở iterator `second` là phần tử đầu tiên lớn khóa $val$.

Nếu như không tồn tại khoảng nào như vậy, hàm sẽ trả về hai iterator bằng nhau: Hoặc cùng trỏ vào phần tử đầu tiên lớn hơn $val,$ hoặc cùng trỏ vào iterator $r$ nếu như $val$ lớn hơn tất cả các phần tử trong đoạn tìm kiếm.

Đoạn tìm kiếm cần được sắp xếp tuân theo phép so sánh của hàm trước khi sử dụng.

Ở dạng $1,$ phép so sánh mặc định của hàm là `<`, nghĩa là áp dụng phép so sánh này với hàm `lower_bound` cho iterator `first` và `upper_bound` cho iterator `second`.

Ở dạng $2,$ phép so sánh mặc định của hàm là hàm `comp` do người dùng tự viết, nghĩa là áp dụng hàm này làm phép so sánh cho hàm `lower_bound` cho iterator `first` và `upper_bound` cho iterator `second`.

Lưu ý, nếu như không gian tìm kiếm có kiểu của các phần tử là `pair`, thì phép so sánh sẽ ưu tiên thực hiện theo trường `first` trước, rồi mới tới trường `second`.

***Ví dụ:***

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <utility>

using namespace std;

bool comp(int a, int b)
{
    return a > b;
}

int main()
{
    int a[] = {10, 20, 30, 30, 20, 10, 10, 20};
    // Biến tìm kiếm đối với mảng phải sử dụng con trỏ.
    pair < int* , int* > bounds_1;
    
    vector < int > v(a, a + 8);
    // Biến tìm kiếm đối với vector phải sử dụng iterator.
    pair < vector < int > :: iterator, vector < int > :: iterator > bounds_2;

    // a = {10, 10, 10, 20, 20, 20, 30, 30}.
    sort(a, a + 8);

    // Dùng phép toán so sánh mặc định với mảng a.
    // Tìm kiếm đoạn đầu tiên bằng 20.
    bounds_1 = equal_range(a, a + 8, 20); // Đoạn [3, 6].
    cout << bounds_1.first - a << ' ' << bounds_1.second - a << endl;

    // v = {30, 30, 20, 20, 20, 10, 10, 10}.
    sort(v.begin(), v.end(), comp);

    // Dùng phép toán so sánh comp với vector v.
    // Iterator first: Trỏ vào phần tử đầu tiên nhỏ hơn hoặc bằng 20.
    // Iterator second: Trỏ vào phần tử đầu tiên nhỏ hơn 20.
    bounds_2 = equal_range(v.begin(), v.end(), 20, comp); // Đoạn [2, 5].
    cout << bounds_2.first - v.begin() << ' ' << bounds_2.second - v.begin() << endl;

    return 0;
}
```

Biên dịch và chạy đoạn chương trình trên, ta thu được kết quả:

```
3 6
2 5
```

***Độ phức tạp của hàm:*** $O(2 \times \log_2(n)),$ với $n$ là kích thước không gian tìm kiếm.

# III. Tổng kết

Như vậy, mình vừa hướng dẫn tới các bạn cách sử dụng bốn hàm Tìm kiếm nhị phân được dựng sẵn trong thư viện STL của C++. Theo kinh nghiệm cá nhân cũng như kinh nghiệm được chia sẻ từ các diễn đàn Tin học, thì các hàm này đều được sử dụng rất thường xuyên trong lập trình C++, giúp giảm một lượng thời gian đáng kể trong việc code, đồng thời khiến cho code của các bạn dễ kiểm tra và đẹp mắt hơn nhiều.

Tuy nhiên, nhược điểm của các hàm này là nếu như người dùng không hiểu rõ cách hoạt động của chúng thì sẽ dễ bị nhầm lẫn, hoặc bị tìm kiếm sai kết quả khi áp dụng với các kiểu dữ liệu phức tạp (chẳng hạn như kiểu Cấu trúc hay Lớp). Vì vậy, lời khuyên của mình là các hàm này chỉ sử dụng để hỗ trợ thêm chứ không thể thay thế được phương pháp Tìm kiếm nhị phân truyền thống. Các bạn bắt buộc phải hiểu và code được Tìm kiếm nhị phân thông thường thì các bạn mới có thể sử dụng hàm một cách thành thạo, chứ đừng lạm dụng các hàm này.

Ngoài ra, các hàm này chỉ có thể thao tác tìm kiếm trên đoạn với khóa tìm kiếm có sẵn, chứ không thể sử dụng để giải bài toán Tìm kiếm nhị phân tổng quát. Hãy lựa chọn thông minh trong khi lập trình để tránh nhầm lẫn! 

# IV. Tài liệu tham khảo

- https://www.cplusplus.com/reference/algorithm/upper_bound/?kw=upper_bound
- https://www.cplusplus.com/reference/algorithm/lower_bound/?kw=lower_bound
- https://www.cplusplus.com/reference/algorithm/binary_search/?kw=binary_search
- https://www.cplusplus.com/reference/algorithm/equal_range/?kw=equal_range
- <a href="https://vnoi.info/library/56/4958/">Tài liệu STL C++ - Tác giả Điêu Xuân Mạnh.</a>