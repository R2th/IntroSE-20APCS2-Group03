# I. Mở đầu về số nguyên lớn trong lập trình

Chúng ta đều biết rằng, việc giải bài toán bằng máy tính nói chung và lập trình thi đấu nói riêng luôn luôn đối mặt với dữ liệu có kích thước rất lớn. Hiển nhiên là vì những dữ liệu quá lớn vượt ra ngoài khả năng tính toán của con người, nên mới cần tới sự trợ giúp của máy tính. 

Với sự nâng cấp liên tục của máy tính điện tử, độ lớn dữ liệu mà máy tính có thể lưu trữ được cũng ngày càng tăng lên. Tuy nhiên, khả năng lưu trữ luôn luôn là hữu hạn, mà dữ liệu là vô hạn (dữ liệu dạng văn bản có thể dài vô hạn, dữ liệu dạng số có thể cực kỳ lớn,...). Ngôn ngữ lập trình đã có sẵn rất nhiều kiểu dữ liệu với khoảng giá trị rất lớn, nhưng cũng không phải luôn luôn lưu trữ được mọi giá trị.

Riêng đối với kiểu số trong C++, chúng ta có sẵn kiểu dữ liệu nguyên thủy là `long long` với tầm lưu trữ lên tới khoảng $20$ chữ số. Nhưng nếu như có những dữ liệu số với độ dài nhiều hơn thế thì sao? Kĩ thuật xử lý số nguyên lớn ra đời nhằm giải quyết vấn đề đó. Trong chuyên đề này, chúng ta sẽ được học cách biểu diễn các số nguyên lên tới hàng trăm, hàng nghìn, thậm chí vài chục nghìn chữ số,...dựa vào khả năng lưu trữ chuỗi kí tự của máy tính. Các số nguyên sẽ được chuyển sang dạng chuỗi kí tự, sau đó thiết kế những phép toán ***cộng, trừ, nhân, chia, đồng dư*** tương ứng. Do độ dài của chuỗi kí tự phụ thuộc vào khả năng lưu trữ của trình biên dịch (mà thông thường rất lớn) nên ta dễ dàng giải quyết vấn đề.

Trước khi đọc chuyên đề này, bạn đọc nên nắm vững các kĩ thuật xử lý chuỗi kí tự, các quy tắc so sánh kí tự trong máy tính cũng như kiến thức về nạp chồng toán tử. Các cài đặt cụ thể trong bài viết sẽ được minh họa bằng ngôn ngữ C++11.

# II. Cách biểu diễn số nguyên lớn

## 1. Biểu diễn bằng chuỗi kí tự

Một cách hay để biểu diễn các số nguyên lớn trong C++ là sử dụng lớp chuỗi kí tự `<string>` trong C++. Các chữ số sẽ tương ứng với các kí tự trong chuỗi, và độ dài của các số khi đó sẽ phụ thuộc vào chương trình biên dịch của ngôn ngữ. Phương pháp biểu diễn này khá được ưa chuộng vì nó đơn giản, dễ hiểu, tuy nhiên trong một số trường hợp cụ thể, thời gian chạy của chương trình cài đặt số lớn bằng `string` sẽ khá lâu. Mình sẽ giải thích cụ thể ở các thuật toán chi tiết.

## 2. Biểu diễn bằng mảng các kí tự

Sử dụng một mảng để chứa các chữ số cũng là một phương án thường được sử dụng. Với phương pháp này, mỗi chữ số sẽ tương ứng với một kí tự trong mảng, đồng thời ta duy trì một biến đếm để kiểm soát số chữ số của số ban đầu. Với phương pháp này, tuy cài đặt có khó hơn, nhưng tốc độ chạy chương trình sẽ nhanh hơn, và chúng ta cũng không cần tới thao tác chuyển đổi giữa kí tự và chữ số như phương pháp đầu tiên.

# III. Các phép toán Nhập - Xuất, So sánh, Cộng và Trừ

Bây giờ thì chúng ta sẽ đi vào cách cài đặt cụ thể với từng phép toán đối với số nguyên lớn. Tôi sẽ cài đặt các phép toán ở cả hai phương pháp sử dụng chuỗi kí tự và mảng các chữ số. Để cho đơn giản, chúng ta sẽ quy định như sau:
- Đối với phương pháp thứ nhất, tôi định nghĩa một kiểu `bignum_str` để biểu diễn các số lớn (chính là `string`):
    ```cpp
    typedef string bignum_str;
    ```
- Đối với phương pháp thứ hai, tôi định nghĩa một kiểu `bignum_vec` để biểu diễn mảng chứa các chữ số của số nguyên, ở đây sử dụng kiểu `vector`:
    ```cpp
    typedef vector < int > vi;
    ```

Ngoài ra, chúng ta sẽ coi như chỉ thực hiện các phép toán đối với các số nguyên không âm thôi. Nếu muốn sử dụng tính toán số lớn với các số nguyên có dấu, các bạn chỉ cần biến đổi một chút từ code gốc là được. Chẳng hạn, khi cộng hai số nguyên âm với nhau, các bạn chỉ cần coi như đang cộng hai số nguyên dương rồi thêm dấu trừ vào phía trước,...Giờ thì bắt đầu thôi!

## 1. Nhập xuất các số nguyên lớn

Đối với cách biểu diễn bằng chuỗi kí tự, chúng ta chỉ cần trực tiếp nhập - xuất các chuỗi kí tự biểu diễn số nguyên là xong. Cài đặt như sau:

```cpp
void input(bignum_str &number)
{
    cin >> number;
}

void output(bignum_str number)
{
    cout << number;
}

int main()
{
    string a, b;
    input(a);
    input(b);
    
    output(a);
    output(b);
}
```

Còn đối với cách biểu diễn bằng mảng, ta vẫn nhập chuỗi bằng kiểu `string`, nhưng sau đó ta sẽ đưa lần lượt từng kí tự số vào `vector`, và đổi chúng thành chữ số luôn. 

***Cài đặt 2:*** Đối với hai hàm `cin` và `cout`, tôi sẽ sử dụng nạp chồng các toán tử `>>` và `<<`, kèm theo luôn cách sử dụng trong chương trình chính:

```cpp
// Nạp chồng toán tử trích luồng, dùng để nhập vào số lớn.
istream &operator >> (istream &cin, vi &number)
{
    string s;
    cin >> s;

    number.clear();
    for (int i = 0; i < s.size(); ++i)
        number.push_back(s[i] - '0');

    return cin;
}

// Nạp chồng toán tử chèn luồng, dùng để in ra số lớn.
ostream &operator << (ostream &cout, const vi &a) 
{
    for (auto d: a) 
        cout << d;

    return cout;
} 

int main()
{
    // Khi nhập xuất thì khai báo biến kiểu vi và dùng trực tiếp lệnh cin, cout.
    vi a, b;
    cin >> a >> b;
    
    cout << a << endl << b;

    return 0;
}
```

## 2. So sánh hai số nguyên lớn

Nguyên tắc so sánh hai số nguyên lớn khi sử dụng chuỗi kí tự như sau:
- Bước $1$: Chuẩn hóa hai chuỗi bằng cách cân bằng độ dài của chúng. Nếu chuỗi nào ngắn hơn thì ta thêm kí tự `0` vào đầu chuỗi đó tới khi độ dài hai chuỗi bằng nhau.
- Bước $2$: So sánh hai chuỗi sử dụng trực tiếp các toán tử `>, <, >=, <=. ==, !=`. Những toán tử này sẽ so sánh các chuỗi theo mã ASCII của từng cặp kí tự, và "vô tình" thứ tự ASCII lại chính là thứ tự đúng của các số.

***Cài đặt 1:*** Hàm `compare(a, b)` dưới đây sẽ so sánh hai chuỗi số $a$ và $b,$ nếu $a < b$ thì trả về $-1,$ nếu $a > b$ thì trả về $1,$ còn $a = b$ thì trả về $0$. Ngoài ra, tôi viết sẵn hàm `equal_length(a, b)` để cân bằng độ dài hai chuỗi số $a$ và $b$. Từ các phép tính dưới sẽ sử dụng luôn chứ không viết lại nữa.

```cpp
void equal_length(bignum_str &a, bignum_str &b)
{
    while (a.size() < b.size())
        a = '0' + a;
    while (b.size() < a.size())
        b = '0' + b;
}
        
int compare(bignum_str a, bignum_str b)
{
    equal_length(a, b);
    
    if (a < b) // Có thể là a <= b.
        return -1;
    if (a > b) // Có thể là a >= b.
        return 1;

    return 0;
}
```

Đối với phương pháp dùng mảng, ta thực hiện hai bước:

- Bước $1$: Cân bằng độ dài hai số, bằng cách đẩy thêm các số $0$ vào đầu hai số.
- Bước $2$: chúng ta sẽ nạp chồng toán tử cho các toán tử `<`, `>`, `<=`, `>=` và `==`. Thực tế, trong khi lập trình ta không cần dùng nhiều tới vậy vì các trường hợp có thể bù trừ cho nhau, tuy nhiên tôi vẫn viết đủ tất cả các toán tử để bạn đọc lựa chọn sử dụng tùy ý.

***Cài đặt 2:*** So sánh hai số nguyên lớn $a$ và $b$ sử dụng mảng lưu chữ số:

```cpp
// Viết thêm các số 0 ở đầu.
void add_zero(vi &a, int sz) 
{
    // Đầu tiên đảo ngược hai số để tối ưu thời gian khi thêm phần tử.
    reverse(a.begin(), a.end()); 
    
    while (a.size() < sz) 
        a.push_back(0); 
	
    reverse(a.begin(), a.end());
}

// Đưa 2 số về cùng một size bằng các push các số 0 lên đầu.
void change(vi &a, vi &b) 
{ 
    int sz = max(a.size(), b.size());
    add_zero(a, sz);
    add_zero(b, sz);
}

bool operator < (vi a, vi b) 
{
    change(a, b);

    for (int i = 0; i < a.size(); ++i) 
        if (a[i] < b[i]) 
            return true;
        else if (a[i] > b[i]) 
            return false;
	
    return false;
}

bool operator > (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] > b[i]) 
            return true;
        else if (a[i] < b[i]) 
            return false;

    return false;
}

bool operator <= (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] < b[i]) 
            return true;
        else if (a[i] > b[i]) 
            return false;
	
    return true;
}

bool operator >= (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] > b[i]) 
            return true;
        else if (a[i] < b[i]) 
            return false;
	
    return true;
}

bool operator == (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] != b[i]) return false;

    return true;
}
```

## 3. Phép cộng hai số nguyên lớn

Thuật toán cộng hai số nguyên lớn sử dụng chuỗi kí tự như sau:
- Bước $1$: Cân bằng độ dài hai chuỗi bằng cách thêm kí tự `0` vào đầu chuỗi ngắn hơn.
- Bước $2$: Cộng từng kí tự chữ số của hai chuỗi từ phải qua trái giống như quy tắc đặt tính ở tiểu học, phần nhớ được mang theo sang bên trái ở mỗi lần cộng. Sau mỗi lần cộng ở một hàng, ta thêm kí tự cuối của kết quả cộng hàng đó vào bên trái chuỗi kết quả.
- Bước $3$: Nếu biến nhớ còn khác $0,$ viết thêm kí tự `1` vào bên trái chuỗi kết quả.

***Cài đặt 1:*** Cộng hai số nguyên lớn $a$ và $b$ sau đó trả về tổng của chúng bằng chuỗi kí tự:

```cpp
bignum_str add(bignum_str a, bignum_str b)
{
    equal_length(a, b);
    
    int carry = 0;
    bignum_str res;
    for (int i = a.size() - 1; i >= 0; --i)
    {
        // Cộng hai chữ số cùng hàng và thêm biến nhớ từ hàng bên phải dồn lên.
        int d = (a[i] - '0') + (b[i] - '0') + carry;
        
        carry = d / 10; // Biến nhớ bằng kết quả hàng trước chia 10.
        res = (char)(d % 10 + '0') + res; // Viết chữ số cuối của kết quả.
    }
    
    if (carry)
        res = '1' + res;
        
    return res;
}
```

Đối với phương pháp mảng chữ số, ta làm hoàn toàn tương tự. Nhưng vì ban đầu các số được đưa vào mảng theo thứ tự ngược lại, nghĩa là chữ số hàng đơn vị của số ban đầu sẽ là phần tử đầu tiên của mảng, nên bước cân bằng độ dài hai mảng là không cần thiết nữa. Điều này giúp tiết kiệm thời gian chạy đáng kể.

***Cài đặt 2:*** Cộng hai số nguyên lớn sử dụng mảng chữ số. Sử dụng nạp chồng toán tử `+` đối với hai biến kiểu `vi`. Ngoài ra, ta cần thiết kế một hàm `del_zero()` để xóa các chữ số $0$ vô nghĩa ở đầu kết quả sau khi cộng xong. Hàm `change()` sẽ được tái sử dụng từ cài đặt của phép so sánh.

```cpp
// Xóa các số 0 vô nghĩa ở đầu.
void del_zero(vi &a) 
{ 
    reverse(a.begin(), a.end()); 
	
    while (a.size() >= 2) 
        if (a.back() == 0) 
            a.pop_back();
        else 
            break;

    reverse(a.begin(), a.end());
}

// Phép toán cộng.
vi operator + (vi a, vi b) 
{
    change(a, b);

    int sz = a.size();
    vi c;
	
    int rem = 0; 
    for (int i = sz - 1; i >= 0; --i) 
    {
        int x = a[i] + b[i] + rem;
        rem = x / 10; 
        x %= 10;
        c.push_back(x);
    }
	
    c.push_back(rem);
    reverse(c.begin(), c.end());
    del_zero(c);
	
    return c;
}
```

## 4. Phép trừ hai số nguyên lớn

Để cho đơn giản, chúng ta chỉ xét trường hợp lấy số lớn hơn trừ số nhỏ hơn. Nếu như $a < b$ thì phải hoán đổi vị trí của chúng trước khi trừ, rồi đưa ra kết quả có thêm dấu `-` ở đằng trước.

Đối với phương pháp chuỗi, thuật toán như sau:
- Bước $1$: Cân bằng độ dài hai chuỗi bằng cách thêm kí tự **'0'** vào đầu chuỗi ngắn hơn.
- Bước $2$: Lầy từng cặp chữ số trừ đi nhau theo chiều từ phải qua trái giống như đặt tính, nếu kết quả bị âm thì cộng thêm $10$ và nhớ $-1$ sang hàng phía trước.
- Bước $3$: Nếu kết quả cuối cùng còn số $0$ vô nghĩa ở bên trái thì xóa nó đi. Lưu ý chỉ được xóa đến khi kết quả còn $1$ chữ số thì dừng lại.

***Cài đặt 1:*** Trừ hai số lớn kiểu chuỗi:

```cpp
bignum_str diff(bignum_str a, bignum_str b)
{
    equal_length(a, b);
    
    int d = 0, carry  = 0;
    bignum_str res;
    for (int i = a.size() - 1; i >= 0; --i)
    {
        d = (a[i] - '0') - (a[i] - '0') - carry;
        
        // Tính toán biến nhớ cho hàng này.
        if (d < 0)
        {
            d += 10;
            carry = 1;
        }
        else 
            carry = 0;
        
        // Thêm kí tự cuối cùng của kết quả trừ hàng vào đầu biến hiệu.
        res = (char) (d + '0') + res;
    }
    
    // Xóa chữ số 0 vô nghĩa ở đầu kết quả. Nếu kết quả bằng 0 thì giữ lại một kí tự.
    while (res.size() > 1 && res.front() == '0')
        res.erase(res.begin());
        
    return res;
}
```

Đối với phương pháp dùng mảng lưu chữ số, cách làm cũng hoàn toàn tương tự: Đầu tiên cân bằng độ dài hai mảng, rồi xét lần lượt từng cặp chữ số từ cuối về đầu, trừ chúng cho nhau và lưu biến nhớ để đẩy giá trị sang hàng phía trước khi cần thiết.

***Cài đặt 2:*** Trừ hai số nguyên lớn cho nhau sử dụng phương pháp mảng lưu chữ số. Hàm `change()` được tái sử dụng từ đoạn chương trình so sánh hai số bên trên. Lưu ý, các bạn phải đảm bảo phép trừ được thực hiện bởi số lớn hơn trừ đi số bé hơn.

```cpp
// Xóa các số 0 vô nghĩa ở đầu.
void del_zero(vi &a) 
{ 
    reverse(a.begin(), a.end()); 
	
    while (a.size() >= 2) 
        if (a.back() == 0) 
            a.pop_back();
        else 
            break;

    reverse(a.begin(), a.end());
}

vi operator - (vi a, vi b) 
{
    change(a, b);
	
    int sz = a.size();
    vi c;
	
    int rem = 0;
    for (int i = sz - 1; i >= 0; --i) 
    {
        int x = a[i] - b[i] - rem;
        if (x < 0) 
        {
            x += 10;
            rem = 1;
        }
        else 
            rem = 0;
		
        c.push_back(x);
	}
	
    reverse(c.begin(), c.end());
    del_zero(c);
	
    return c;
}
```

## 5. Chương trình đầy đủ

Dưới đây là chương trình gồm đầy đủ các thao tác nhập - xuất và các phép toán so sánh, cộng, trừ hai số nguyên lớn (chỉ sử dụng mảng lưu chữ số, vì cách làm này tối ưu hơn). Bạn đọc có thể tham khảo để có cái nhìn tổng quan hơn về các thao tác này:

```cpp
#include <bits/stdc++.h>
#define int long long

using namespace std;

typedef vector < int > vi;

// Nạp chồng toán tử nhập luồng, dùng để nhập vào số lớn.
istream &operator >> (istream &cin, vi &a)
{
    string s;
    cin >> s;

    a.clear();
    for (int i = 0; i < s.size(); ++i)
        a.push_back(s[i] - '0');

    return a, cin;
}

// Nạp chồng toán tử trích luồng, dùng để in ra số lớn.
ostream &operator << (ostream &cout, const vi &a) 
{
   	for (auto d: a) 
        cout << d;

   	return cout;
} 

// Viết thêm các số 0 ở đầu một số nguyên lớn a.
void add_zero(vi &a, int sz) 
{	
    // Đảo ngược vector lại để tối ưu thời gian khi thêm số 0 vào.
    reverse(a.begin(),a.end()); 

	while (a.size() < sz) 
        a.push_back(0); 

	reverse(a.begin(), a.end());
}

// Xóa các số 0 vô nghĩa ở đầu một số nguyên lớn a.
void del_zero(vi &a) 
{ 	
    reverse(a.begin(), a.end()); 
	
    while (a.size() >= 2) 
    {
		if (a.back() == 0) 
            a.pop_back();
		else 
            break;
 	}

 	reverse(a.begin(), a.end());
}

// Cân bằng độ dài hai số a và b bằng cách thêm các số 0 vào đầu.
void change(vi &a, vi &b) 
{ 
	int sz = max(a.size(), b.size());
	add_zero(a, sz);
	add_zero(b, sz);
}

// Các phép toán so sánh.
bool operator < (vi a, vi b) 
{
    change(a, b);

    for (int i = 0; i < a.size(); ++i) 
        if (a[i] < b[i]) 
            return true;
        else if (a[i] > b[i]) 
            return false;
	
    return false;
}

bool operator > (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] > b[i]) 
            return true;
        else if (a[i] < b[i]) 
            return false;

    return false;
}

bool operator <= (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] < b[i]) 
            return true;
        else if (a[i] > b[i]) 
            return false;
	
    return true;
}

bool operator >= (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] > b[i]) 
            return true;
        else if (a[i] < b[i]) 
            return false;
	
    return true;
}

bool operator == (vi a, vi b) 
{
    change(a, b);
	
    for (int i = 0; i < a.size(); ++i) 
        if (a[i] != b[i]) return false;

    return true;
}

// Phép toán cộng.
vi operator + (vi a, vi b) 
{
    change(a, b);

    int sz = a.size();
    vi c;
	
    int rem = 0; 
    for (int i = sz - 1; i >= 0; --i) 
    {
        int x = a[i] + b[i] + rem;
        rem = x / 10; 
        x %= 10;
        c.push_back(x);
    }
	
    c.push_back(rem);
    reverse(c.begin(), c.end());
    del_zero(c);
	
    return c;
}

// Phép toán trừ.
vi operator - (vi a, vi b) 
{
    change(a, b);
	
    int sz = a.size();
    vi c;
	
    int rem = 0;
    for (int i = sz - 1; i >= 0; --i) 
    {
        int x = a[i] - b[i] - rem;
        if (x < 0) 
        {
            x += 10;
            rem = 1;
        }
        else 
            rem = 0;
		
        c.push_back(x);
	}
	
    reverse(c.begin(), c.end());
    del_zero(c);
	
    return c;
}

// Test.
main() 
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    vi a, b;
    cin >> a >> b;

    if (a < b) 
        cout << "a < b\n";
    else if (b < a) 
        cout << "a > b\n";
    else if (a == b) 
        cout << "a = b\n";

    cout << a + b << '\n';

    // Phải đảm bảo a >= b để thực hiện phép trừ.
    if (a < b) 
        swap(a, b); 
    cout << a - b << '\n';

    return 0;
} 

```

# IV. Bài toán minh họa

## 1. Số Fibonaci thứ n

### Đề bài

Dãy số Fibonaci được định nghĩa theo công thức:
$$\begin{cases}f_0 = 0, f_1 = 1 \\ f_i = f_{i - 1} + f_{i - 2}, &\forall i: i \ge 2\end{cases}$$

***Yêu cầu:*** Tìm số fibonaci thứ $n?$ 

***Input:***

- Một dòng duy nhất chứa số tự nhiên $n$.

***Ràng buộc:***

- $0 \le n \le 10^6$.

***Output:***

- In ra số Fibonacci thứ $n$.

***Sample Input:***

```
5
```

***Sample Output:***

```
8
```

### Ý tưởng

Chắc chắn số fibonacci thứ $n$ có thể sẽ vượt khỏi kiểu dữ liệu `long long`, mà đề bài lại không yêu cầu in ra kết quả mod cho giá trị nào cả. Do đó chúng ta cần sử dụng tới kiểu số lớn để tính toán ra số Fibonacci thứ $n$.

Chỉ cần sử dụng phép cộng số lớn để có thể đưa ra số Fibonacci thứ $n$. Ta dùng xâu hoặc dùng mảng lưu chữ số đều được.

***Độ phức tạp:*** $O(n \times \alpha)$ với $\alpha$ là độ phức tạp phép cộng số lớn. Nó sẽ bằng với độ dài của các xâu cần cộng ở mỗi lượt. 

### Cài đặt

Dưới đây tôi cài đặt bằng phương pháp sử dụng chuỗi kí tự vì bài toán khá đơn giản, chỉ phải sử dụng duy nhất phép cộng số lớn:

```cpp=
#include <bits/stdc++.h>

using namespace std;

bignum_str fibonacci(int n)
{
    if (N == 0)
        return "0";
    
    if (N == 1)
        return "1";
        
    bignum_str f0 = "0", f1 = "1", fN;
    for (int i = 2; i <= N; ++i)
    {
        fN = add(f0, f1);
        f0 = f1;
        f1 = fN;
    }
    
    return fN;
}
```

## 2. Số nguồn

### Đề bài

Cho số nguyên dương $N$. Gọi số nguyên $M$ là tổng của $N$ cộng với các chữ số của số $N$. Như vậy, $N$ được gọi là ***số nguồn*** của $M$. Lấy ví dụ, với $N = 245,$ thì $M = 245 + 2 + 4 + 5 = 256$. Ta nói nguồn của $256$ là $245$.

Có những số có nhiều nguồn và cũng có những số không có nguồn. Chẳng hạn, số $216$ có hai nguồn là $198$ và $207$.

***Yêu cầu:*** Cho số nguyên dương $M,$ hãy tìm nguồn nhỏ nhất của nó?

***Input:***

- Một dòng duy nhất chứa số nguyên dương $M$.

***Ràng buộc:***

- $1 \le M \le 10^{100}$.

***Output:***

- Số nguyên duy nhất là nguồn nhỏ nhất tìm được. Trong trường hợp số $M$ đã cho không có nguồn nào, đưa ra $0$.

***Sample Input:***

```
216
```

***Sample Output:***

```
198
```

### Ý tưởng

Xét số nguyên dương $m$. Ta gọi nguồn của $m$ là $n$ và tổng các chữ số của $n$ là $d(n)$ (giả sử $m$ có số nguồn).

Theo đề bài, ta có:

$$n + d(n) = m$$

Từ đây suy ra, $n$ luôn luôn nhỏ hơn $m$. Vì vậy, số chữ số của $n$ cũng không thể vượt quá số chữ số của $m,$ dẫn đến $d(n)$ cùng lắm chỉ đạt giá trị tối đa là $9x$ với $x$ là số chữ số của $m$. Từ đây, ta phát triển một thuật toán như sau:

- Thử xét tất cả các giá trị $d(n)$ có thể ($9x...1$). Do ta cần tìm nguồn nhỏ nhất, mà $n = m - d(n)$ nên ta sẽ xét các $d(n)$ từ lớn nhất về bé nhất. 
- Đặt $\text{diff} = m - d(n)$. Chỗ này ta phải thực hiện phép trừ số lớn do $m$ rất lớn. Nếu như $m > d(n)$ thì ta sẽ thu được $\text{diff} > 0$. Tới đây có thể coi rằng $\text{diff}$ có khả năng là nguồn nhỏ nhất của $m$. 
- Điều kiện đủ cần kiểm tra là tổng các chữ số của $\text{diff}$ phải chính bằng $d(n)$ đang duyệt ở bước $1$. Nếu đúng như vậy thì ta in ra $\text{diff}$ chính là nguồn nhỏ nhất của $m$.

***Độ phức tạp:*** $O\big(9 \times |m| \times \alpha\big)$ với $\alpha$ là độ phức tạp của thao tác trừ số lớn.

### Code mẫu

Dưới đây, tôi cài đặt lời giải theo phương pháp biểu diễn số lớn bằng mảng chữ số. Cài đặt mặc dù khá dài, nhưng về thời gian chạy sẽ tối ưu hơn dùng chuỗi kí tự:

```cpp
#pragma GCC optimize("O3","unroll-loops")
#pragma GCC target("avx2")

#include <bits/stdc++.h>
#define int long long

using namespace std;

typedef vector < int > vi;

// Nạp chồng toán tử trích luồng, dùng để nhập vào số lớn.
istream &operator >> (istream &cin, vi &a)
{
    string s;
    cin >> s;

    a.clear();
    for (int i = 0; i < s.size(); ++i)
        a.push_back(s[i] - '0');

    return cin;
}

// Nạp chồng toán tử chèn luồng, dùng để in ra số lớn.
ostream &operator << (ostream &cout, const vi &a)
{
    for (auto d: a)
        cout << d;

    return cout;
}

// Viết thêm các số 0 ở đầu một số nguyên lớn a.
void add_zero(vi &a, int sz)
{
    // Đảo ngược vector lại để tối ưu thời gian khi thêm số 0 vào.
    reverse(a.begin(),a.end());

    while (a.size() < sz)
        a.push_back(0);

    reverse(a.begin(), a.end());
}

// Xóa các số 0 vô nghĩa ở đầu một số nguyên lớn a.
void del_zero(vi &a)
{
    reverse(a.begin(), a.end());

    while (a.size() >= 2)
    {
        if (a.back() == 0)
            a.pop_back();
        else
            break;
    }

    reverse(a.begin(), a.end());
}

// Cân bằng độ dài hai số a và b bằng cách thêm các số 0 vào đầu.
void change(vi &a, vi &b)
{
    int sz = max(a.size(), b.size());
    add_zero(a, sz);
    add_zero(b, sz);
}

// Phép toán so sánh nhỏ hơn.
bool operator < (vi a, vi b)
{
    change(a, b);

    for (int i = 0; i < a.size(); ++i)
        if (a[i] < b[i])
            return true;
        else if (a[i] > b[i])
            return false;

    return false;
}

// Phép toán trừ.
vi operator - (vi a, vi b)
{
    change(a, b);

    int sz = a.size();
    vi c;

    int rem = 0;
    for (int i = sz - 1; i >= 0; --i)
    {
        int x = a[i] - b[i] - rem;
        if (x < 0)
        {
            x += 10;
            rem = 1;
        }
        else
            rem = 0;

        c.push_back(x);
    }

    reverse(c.begin(), c.end());
    del_zero(c);

    return c;
}

void solution(vi m)
{
    for (int i = 9 * s.size(); i >= 1; --i)
    {
        // Biến i thành kiểu số lớn, lưu vào mảng chữ số b.
        int n = i, temp = 0;
        vi b;
        while (n > 0)
        {
            b.push_back(n % 10);
            n /= 10;
        }
        reverse(b.begin(), b.end());

        // Nếu s < b thì bỏ qua.
        if (s < b)
            continue;

        // Tìm nguồn khả thi của m là s - b, kiểm tra nó có đúng là nguồn không.
        vi diff = s - b;
        for (int j = 0; j < diff.size(); ++j)
            temp += diff[j];

        if (temp == i)
        {
            cout << diff;
            return;
        }
    }

    cout << 0;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    vi m;
    cin >> m;

    solution(m);

    return 0;
}
```

Như vậy, trong bài viết này tôi đã giới thiệu tới các bạn những kiến thức cơ bản đầu tiên về xử lý số nguyên lớn trong C++, kèm theo đó là các thao tác dễ nhất là so sánh và các phép cộng, trừ. Để tiếp tục theo dõi phần hai của series ***Xử lý số nguyên lớn trong C++,*** các bạn hãy nhấn vào <a href="https://hackmd.io/Cw0MDmPrQneyFAUDEHZmHw">đây</a>.