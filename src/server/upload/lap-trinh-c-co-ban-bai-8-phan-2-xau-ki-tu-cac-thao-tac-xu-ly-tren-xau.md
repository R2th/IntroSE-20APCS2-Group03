# IV. Các thao tác xử lý chuỗi kí tự

## 1. Phép so sánh

Như đã đề cập ở phần I, máy tính sử dụng một bảng chữ cái gồm $256$ kí tự được đánh số từ $0$ tới $255,$ mỗi kí tự đều được mã hóa bằng những bit nhị phân, gọi là bảng mã **ASCII**. Hai chuỗi kí tự được so sánh với nhau dựa trên bảng mã này. Quy trình so sánh hai chuỗi kí tự $X$ và $Y$ trong C++ diễn ra như sau:

- Các kí tự được đánh số từ $0$ ở mỗi chuỗi, sau đó tìm vị trí $i$ đầu tiên sao cho $X_i \ne Y_i$. Khi đó, nếu $X_i$ nằm sau $Y_i$ trong bảng mã ASCII thì chuỗi $X$ sẽ lớn hơn chuỗi $Y,$ ngược lại chuỗi $Y$ lớn hơn chuỗi $X$.
- Trong trường hợp không tìm được vị trí $i$ thỏa mãn thì chuỗi nào dài hơn sẽ là chuỗi lớn hơn.
- Nếu cả hai trường hợp trên không xảy ra thì kết luận chuỗi $X$ bằng chuỗi $Y$.

Các toán tử `>, <, <=, >=, ==, !=` có thể được sử dụng trực tiếp để so sánh hai kí tự hoặc hai chuỗi trong C++, tất nhiên là theo quy tắc nêu trên vì hệ thống đã có sẵn các toán tử so sánh nạp chồng cho kiểu chuỗi.

***Ví dụ 1:*** Chương trình dưới đây sẽ so sánh hai xâu kí tự và đưa ra xâu lớn hơn

```cpp=
#include <iostream>
#include <string>

using namespace std;

int main()
{
    string s1 = "Tôi đi học";
    string s2 = "Tôi đi ngủ";

    cout << "Chuỗi lớn hơn là: "
    if (s1 > s2)
        cout << s1;
    else
	cout << s2;
}
```
	
Kết quả chạy chương trình sẽ là:

```cpp
Chuỗi lớn hơn là: Tôi đi ngủ
```

Chuỗi `Tôi đi học` nhỏ hơn chuỗi `Tôi đi ngủ` vì kí tự `n` lớn hơn kí tự `h` trong bảng mã **ASCII**. Một điều rất thú vị trong so sánh chuỗi, đó là mặc dù số $100$ lớn hơn số $90,$ nhưng chuỗi `100` sẽ nhỏ hơn chuỗi `90`, vì kí tự `1` đứng trước kí tự `9` trong bảng mã **ASCII**. Do đó, khi so sánh các số ở dạng chuỗi cần hết sức chú ý (vấn đề này sẽ được nhắc tới trong chủ đề ***Xử lý số nguyên lớn*** ở phần lập trình thi đấu). 

***Ví dụ 2:*** In ra các kí tự chữ cái latin in thường trên một dòng (không có dấu cách):

```cpp
#include <iostream>
using namespace std;

int main()
{
    for (char c = 'a'; c <= 'z'; ++c)
        cout << c;

    return 0;
}
```
	
Kết quả chạy chương trình:

```cpp
abcdefghijklmnopqrstuvwxyz
```

## 2. Phép nối chuỗi

Khác với phép cộng ở kiểu số, toán tử `+` khi được kết hợp với hai chuỗi có ý nghĩa là nối hai chuỗi đó với nhau. Ví dụ dưới đây có thể làm rõ:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main()
{
    string s1 = "Ngày mai ";
    string s2 = "tôi đi học.";

    cout << s1 + s2;
}
```
	
Kết quả chạy chương trình sẽ là:

```cpp
Ngày mai tôi đi học.
```

***Lưu ý:*** 
- Đặc điểm của phép cộng chuỗi là chuỗi đứng sau toán tử `+` sẽ được nối vào phía sau của chuỗi đứng trước toán tử `+`. Ví dụ, nếu như ta viết `cout << s2 + s1;` ở chương trình trên, thì kết quả sẽ trả ra là `tôi đi học.Ngày mai ` thay vì `Ngày mai tôi đi học.`
- Phép nối chuỗi bản chất là tạo ra một bản sao của chuỗi ban đầu, nối bản sao đó với chuỗi cần nối rồi gán ngược trở lại chuỗi ban đầu. Vì vậy, phép nối bằng toán tử `+` sẽ có thời gian chạy khá lâu trong các trường hợp chuỗi dài, cần hết sức lưu ý khi sử dụng. 

## 3. Lấy số hiệu trong bảng mã ASCII của một kí tự

Bằng kĩ thuật ép kiểu, ta có thể xác định được số thứ tự trong bảng mã ASCII của một kí tự $c$ bất kỳ, với $c$ là một biến kí tự hoặc hằng kí tự. Cú pháp như sau: 

```cpp
(int)(c);
```

Nếu $c$ là một hằng kí tự thì ta cần đặt nó trong cặp dấu `''`, còn nếu là biến kí tự thì không cần. Ví dụ, muốn biết số thứ tự của kí tự `a`, ta có câu lệnh`(int)('a')` sẽ trả ra kết quả $97,$ còn nếu muốn biết số thứ tự của một biến kí tự $c,$ thì chỉ cần viết `(int)(c)` thôi.  Số hiệu của kí tự phải được sử dụng trong các câu lệnh chứ không được đặt nó đứng đơn lẻ.

Hoàn toàn tương tự, ta có thể xác định được kí tự ứng với số hiệu $x$ trong bảng mã **ASCII** bằng cú pháp ép kiểu `char` ngược lại: 

```cpp
(char)(x);
```

Chẳng hạn, câu lệnh `cout << (char)(48);` sẽ trả ra kết quả là kí tự chữ số `0`.

Có rất nhiều bài tập ứng dụng phần lấy số hiệu kí tự này, chẳng hạn như đổi từ kí tự số sang số đếm được, hay đổi chữ in hoa thành in thường và ngược lại,...Bạn đọc hãy đến phần bài tập của chương này để luyện tập thêm nhé!

## 5. Các hàm xử lý chuỗi có sẵn trong thư viện của C++

Giả sử ta khai báo một chuỗi kí tự $s$ bằng cú pháp: `string s;`. Bảng dưới đây liệt kê những phương thức xử lý dữ liệu thường dùng nhất, được hỗ trợ sẵn trong lớp `<string>` dành cho chuỗi $s$:



![](https://cdn.ucode.vn/uploads/2247/upload/loSvCHFZ.png)


Thư viện `<string>` cũng cung cấp các hàm liên quan tới chuyển đổi giữa chuỗi - số ở bảng dưới đây:



![](https://cdn.ucode.vn/uploads/2247/upload/iHcgBaCt.png)

Ngoài ra còn rất nhiều phương thức khác được xây dựng sẵn để hỗ trợ người dùng, bạn đọc có thể tra cứu ở địa chỉ: <b><a href="https://www.cplusplus.com/reference/string/">Lớp <string> trong C++</a></b>.

## 6. Xóa các kí tự trong chuỗi:

Như bạn đọc đã thấy ở mục $5,$ khi cần xóa một kí tự hoặc một chuỗi con trong chuỗi ban đầu, ta có thể sử dụng hàm `erase()` của lớp `<string>`. Tuy nhiên, khi xóa các kí tự trong chuỗi, thì sẽ xảy ra tình huống là các kí tự phía sau đoạn được xóa sẽ đẩy lên phía trên và nối liền với đoạn phía trước, dẫn đến số thứ tự của các kí tự trong chuỗi được đánh số lại. Nếu không cẩn thận khi xử lý sẽ rất dễ đưa ra kết quả sai. Cùng xem một ví dụ dưới đây, ta sẽ xóa các dấu cách trong một chuỗi và đưa ra chuỗi đó sau khi xóa:

```cpp=
#include <bits/stdc++.h>
	
using namespace std;

int main()
{
    string s;
    getline(cin, s);

    for (int i = 0; i < s.size(); ++i)
        if (s[i] == ' ')
            s.erase(i, 1);

    cout << s;
}
```

Nếu chạy đoạn chương trình trên với $s$ bằng `ab c  css e ad`, kết quả trả về sẽ như sau:

```
abc cssead
```

Ta thấy kết quả hoàn toàn sai, điều này là do các kí tự bị đánh số lại, chiều dài chuỗi cũng thay đổi mỗi khi xóa dẫn đến vị trí của các dấu cách cũng thay đổi theo. Để khắc phục điểm này, khi xóa các kí tự hoặc chuỗi con trong một chuỗi, hãy xóa từ phải qua trái, và luôn đảm bảo rằng phần chuỗi phía sau đoạn bị xóa đi ở mỗi lần xóa sẽ không còn cần sử dụng đến nữa!

```cpp=
#include <bits/stdc++.h>
	
using namespace std;

int main()
{
    string s;
    getline(cin, s);

    for (int i = s.size() - 1; i >= 0; --i)
	if (s[i] == ' ')
            s.erase(i, 1);

    cout << s;
}
```

Với đoạn code mới này, kết quả sẽ trả ra hoàn toàn chính xác:

```
abccssead
```
	
# V. Chuỗi kí tự theo phong cách ngôn ngữ C (đọc thêm)

Vì C++ có nền tảng là ngôn ngữ C, nên cũng hỗ trợ xử lý chuỗi kí tự theo phong cách ngôn ngữ C. Trong C, chuỗi kí tự được biểu diễn dưới dạng một mảng chứa các kí tự. Cú pháp để khai báo chuỗi phong cách C là:

```cpp
char {Tên_chuỗi}[{Kích_thước_chuỗi}];
```

Các kí tự trong chuỗi kiểu C vẫn được đánh số từ $0$. Vì nó là mảng nên cách sử dụng cũng giống như mảng thông thường. Ví dụ khai báo một chuỗi `Hello` theo phong cách C, ta có thể viết theo quy tắc khởi tạo mảng như sau:

```cpp
char test_str[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
```

hoặc viết theo quy tắc khởi tạo chuỗi, thì kích thước chuỗi sẽ tự động điều chỉnh cho khớp với số lượng kí tự:

```cpp
char test_str[] = "Hello";
```

Các hàm xử lý với chuỗi theo phong cách C được hỗ trợ không nhiều, được liệt kê ở bảng dưới đây. Nói chung ta nên ưu tiên sử dụng lớp `<string>` vì nó hỗ trợ xử lý chuỗi cực kỳ tốt, đặc biệt trong các bài toán lập trình thi đấu cần yêu cầu tốc độ lập trình nhanh.



![](https://cdn.ucode.vn/uploads/2247/upload/RrELgsRN.png)


# VI. Một số bài toán quen thuộc về xâu kí tự
	
## 1. Xâu đối xứng
	
### Đề bài
	
Một xâu kí tự được gọi là đối xứng nếu như khi viết ngược nó lại, ta vẫn thu được một xâu mới giống xâu ban đầu. Chẳng hạn, `aba`, `aaccaa`,...là các xâu đối xứng, còn các xâu `a`, `ba`, `vuquelam`,...thì không phải.
	
Cho trước một xâu kí tự $s,$ hãy xác định xâu đó có phải đối xứng hay không?
	
***Input:***
	
- Một dòng duy nhất chứa xâu kí tự $s$ chỉ bao gồm các chữ cái latin in thường.
	
***Ràng buộc:***
	
- Độ dài xâu $s$ không vượt quá $10^6$.

***Output:***
	
- In ra `YES` nếu như xâu $s$ là xâu đối xứng, ngược lại in ra `NO`.
	
***Sample Input:***
	
```
aabbaa
```
	
***Sample Output:***
	
```
YES
```
	
### Ý tưởng
	
Cách làm dễ nhất là sử dụng một xâu $s_1,$ lưu các kí tự của xâu $s$ theo chiều ngược lại, rồi so sánh hai xâu. Cách làm này không phải một cách hay, vì phép cộng xâu trong C++ sẽ có độ phức tạp bằng độ dài của xâu mới, ngoài ra phép so sánh hai xâu cuối cùng cũng sẽ có độ phức tạp bằng đúng độ dài xâu. Vì thế, cách này chưa tối ưu.
	
Gọi $n$ là độ dài của xâu kí tự và coi rằng đánh số các kí tự trong xâu từ vị trí $0$ tới vị trí $n - 1$. Ta nhận xét thấy, nếu một xâu là đối xứng, thì cặp kí tự thứ $i$ và $n - i - 1$ sẽ giống nhau. Vì thế, chỉ cần sử dụng một vòng lặp duyệt $i$ từ $0$ tới $\left(\left\lfloor{\frac{n}{2}} \right\rfloor - 1\right)$ rồi kiểm tra cặp kí tự $i$ và $n - i - 1$ có giống nhau hay không, nếu tồn tại một cặp khác nhau thì kết luận luôn xâu không phải đối xứng.
	
Bằng cách này, chúng ta giảm được số lần lặp xuống chỉ còn tối đa $\left\lfloor{\frac{n}{2}} \right\rfloor$ lần.
	
### Cài đặt
	
```cpp=
#include <bits/stdc++.h>
	
using namespace std;
	
bool is_palindrome(string &s)
{
    int n = s.size();
    for (int i = 0; i < n; ++i)
        if (s[i] != s[n - i - 1])
            return false;
						  
    return true;
}
	
main()
{
    string s;
    cin >> s;
	
    if (is_palindrome(s))
        cout << "YES";
    else 
        cout << "NO";
}
```
	
## 2. Chuẩn hóa xâu
	
### Đề bài
	
Cho một xâu kí tự $s$ chỉ gồm các chữ cái latin in thường và in hoa cùng các dấu cách. Một xâu được gọi là chuẩn hóa nếu như nó thỏa mãn các điều kiện sau:
	
- Không bao gồm các dấu cách thừa ở đầu và cuối xâu.
- Gồm nhiều từ, mỗi từ bắt đầu bằng một chữ cái in hoa và theo sau là các chữ cái in thường.
- Giữa các từ phân tách nhau bằng đúng một dấu cách.
	
Hãy chuẩn hóa xâu $s$ và đưa ra kết quả?
	
***Input:***
	
- Một dòng duy nhất chứa xâu kí tự $s$ chỉ bao gồm các chữ cái latin và dấu cách.
	
***Ràng buộc:***
	
- Độ dài xâu $s$ không vượt quá $1000$.

***Output:***
	
- In ra xâu $s$ sau khi đã chuẩn hóa.
	
***Sample Input:***
	
```
     Toi ten lA nhaT MINH    	
```
	
***Sample Output:***
	
```
Toi Ten La Nhat Minh	
```
	
### Ý tưởng

Cách làm hoàn toàn đơn giản như sau:
	
- Đầu tiên xóa các dấu cách thừa ở đầu và cuối xâu, sử dụng hàm `erase()` của thư viện `<string>`.
- Sau đó duyệt qua các kí tự của xâu $s,$ lần lượt xử lý các trường hợp kí tự đó là chữ thường, chữ hoa hay dấu cách. 
	- Nếu là chữ thường mà đứng ở đầu một từ thì phải viết hoa nó lên, còn là chữ hoa mà không đứng đầu một từ thì viết thường nó.
	- Nếu là dấu cách thì ta bỏ qua không quan tâm tới nó.
	- Nếu kí tự đó là kí tự đầu tiên của mỗi từ thì in thêm ra một dấu cách. 
	- Cuối cùng in ra kí tự vừa xử lý.

Tuy nhiên, cần lưu ý trong bài này, xâu nhập vào có dấu cách, vì thế ta cần sử dụng `getline()` để nhập xâu.
	
### Cài đặt
	
```cpp
#include <bits/stdc++.h>
	
using namespace std;

void enter(string &s)
{
    getline(cin, s);	
}
	
void solution(string &s)
{
    // Xóa các dấu cách thừa ở đầu chuỗi và cuối chuỗi.
    while (s[0] == ' ')
        s.erase(0, 1);
    while (s.back() == ' ')
        s.erase(s.size() - 1, 1);

    for (int i = 0; i < (int)s.size(); ++i)
    {
        if (s[i] == ' ')
            continue;
        else if (s[i] == '.') // Kí tự dấu chấm kết thúc chuỗi.
            cout << s[i];
        else if (s[i - 1] == ' ' || i == 0) // Kí tự đầu tiên của mỗi từ.
        {
            if ('a' <= s[i] && s[i] <= 'z')
                s[i] = (char)(s[i] - 32);

            // Nếu không phải kí tự đầu tiên của chuỗi thì in ra
            // một dấu cách để phân tách với từ phía trước.
            if (i != 0) 
                cout << ' ';
            cout << s[i];
        }
        // Nếu không phải kí tự đầu tiên của từ mà bị viết hoa thì viết thường nó lại.
        else if (s[i - 1] != ' ') 
        {
            if ('A' <= s[i] && s[i] <= 'Z')
                s[i] = (char)(s[i] + 32);
            cout << s[i];
        }
    }
}
	
int main()
{
    string s;
	
    enter(s);
    solution(s);
	
    return 0;
}
```
						
# VI. Tài liệu tham khảo
						
- https://vnoi.info/wiki/languages/cpp/string.md
- https://laptrinh.vn/books/cpp/page/xau-ky-tu-trong-cpp
- https://daynhauhoc.com/t/thu-vien-string-trong-c/30092