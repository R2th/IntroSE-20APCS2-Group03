# I. Dữ liệu dạng văn bản

## 1. Bảng kí tự ASCII

***ASCII*** - tên đầy đủ là ***American Standard Code for Information Interchange*** - là một bảng mã chuẩn trao đổi thông tin Hoa Kỳ, bao gồm các kí tự và mã của chúng dựa trên bảng chữ cái Latin được dùng trong tiếng Anh hiện đại. Bảng mã này bao gồm $256$ kí tự được đánh số hiệu thập phân từ $0$ tới $255,$ thường được dùng để hiển thị văn bản trong máy tính và các thiết bị thông tin khác. Các kí tự mà chúng ta sử dụng trong lập trình đều nằm trong bảng mã này. Để làm việc dễ dàng trên máy tính, mỗi kí tự đều được mã hóa bởi những bit nhị phân $0 - 1$ và quy đổi ra giá trị thập phân tương ứng để người dùng dễ thao tác hơn. Ví dụ, kí tự `A` có số hiệu thập phân là $65,$ kí tự `z` có số hiệu là $122,...$

Trong bảng mã ***ASCII*** có những kí tự in được và không in được. Trong chương này, chúng ta sẽ làm việc với các kí tự in được, nhiều nhất là các kí tự chữ cái và chữ số. Nếu muốn tìm hiểu kĩ hơn về bảng mã ***ASCII*** đầy đủ, bạn đọc có thể truy cập vào đường link sau: https://vi.wikipedia.org/wiki/ASCII

## 2. Kí tự và chuỗi kí tự

Trong máy tính, thông tin được biểu diễn ở dạng số và dạng phi số. Chúng ta đã quá quen thuộc với thông tin dạng số, vậy còn dạng phi số? Đó là văn bản, hình ảnh, âm thanh,...Đối với lập trình thi đấu, thông tin dạng văn bản cũng xuất hiện thường xuyên không kém dạng số, và các ngôn ngữ lập trình đều cung cấp những kiểu dữ liệu để lưu trữ thông tin dạng văn bản. Có hai loại dữ liệu dạng văn bản thường gặp nhất là kiểu kí tự và kiểu chuỗi kí tự (nhiều kí tự ghép lại với nhau).

Đối với kiểu kí tự, chúng ta có kiểu dữ liệu `char` để biểu diễn, còn chuỗi kí tự thì có hai cách khác nhau:

- Sử dụng một mảng gồm nhiều phần tử kiểu `char`.
- Sử dụng lớp chuỗi `<string>` đã được xây dựng sẵn trong C++. Cách này được ưa chuộng hơn vì thao tác dữ liệu tốt hơn.

# II. Lớp `<string>` trong C++

Thư viện chuẩn của C++ cung cấp cho chúng ta một lớp `<string>` hỗ trợ việc lưu trữ các ***chuỗi kí tự (xâu kí tự)*** và rất nhiều các phương thức xử lý đi kèm. Bạn đọc có thể chưa hiểu khái niệm về ***lớp*** ngay lúc này, nhưng sẽ hiểu về nó khi học tới bài ***Cấu trúc và Lớp***. Còn bây giờ, để cho dễ hiểu, có thể coi `<string>` như một kiểu dữ liệu nhưng hỗ trợ người dùng xử lý dữ liệu luôn.

## 1. Khai báo và truy cập các phần tử chuỗi

Để khai báo một chuỗi sử dụng lớp `<string>`, đầu tiên ta cần khai báo thư viện và không gian tên chứa nó bằng cú pháp: 

```cpp=
#include <string>

using namespace std;
```

Sau đó, khai báo một chuỗi bằng cú pháp:

```cpp=
string {Tên_chuỗi};
```

Vẫn như thường lệ, ***{Tên_chuỗi}*** là một định danh do người dùng đặt ra, miễn là không trùng với từ khóa của hệ thống. Ta không cần khai báo độ dài của chuỗi, mà mỗi khi thêm một kí tự vào thì `string` sẽ tự động điều chỉnh độ dài của chuỗi cho vừa khớp với số lượng kí tự. Khi khai báo chuỗi, mặc định chuỗi đó sẽ là ***chuỗi rỗng*** (không có kí tự nào).

Các kí tự trong chuỗi sẽ được đánh số từ $0$. Để truy cập một vị trí trong chuỗi (với điều kiện vị trí đó hiện đang có kí tự hoặc đã được khởi tạo), ta dùng cú pháp:

```
{Tên_chuỗi}[{Vị_trí}]
```

Khá giống với mảng đúng không nào! Sau khi truy cập, mỗi vị trí trong chuỗi có thể được thao tác giống như một kí tự và kết hợp với các câu lệnh cũng như toán tử. Ví dụ, gán một biến $c$ bằng kí tự ở vị trí số $2$ của chuỗi $s$ bằng cú pháp:

```cpp
char c = s[2];
```

## 2. Cách nhập xuất một chuỗi

### 2.1. Nhập xuất các biến kiểu `<string>`

Khi nhập xuất một biến chuỗi kí tự, ta có thể coi chuỗi đó như một biến đơn và sử dụng hai câu lệnh `cin` và `cout` để nhập xuất. Cú pháp như sau:

```cpp=
cin >> {Tên_biến_chuỗi}; // Nhập vào một biến chuỗi.
cout << {Tên_biến_chuỗi}; // Viết ra một biến chuỗi.
```

Tuy nhiên, có một lưu ý khi sử dụng lệnh `cin` đối với `string`, đó là nếu như trong quá trình nhập liệu gặp phải dấu cách, thì việc nhập sẽ bị ngắt tại đó, cho dù người dùng có nhập thêm bao nhiêu kí tự đi chăng nữa thì chuỗi cũng sẽ chỉ lưu trữ phần ở phía trước dấu cách mà thôi. Cùng xem ví dụ dưới đây:

```cpp=
#include <iostream>
#include <string>

using namespace std;

int main()
{
    string name;
    cin >> name;
        
    cout << "Tên vừa nhập là: " << name;
}
```

Nếu người dùng nhập vào một tên là `Vũ Quế Lâm`, thì khi chạy chương trình ta sẽ thu được kết quả này:

```
Tên vừa nhập là: Vũ
```

Do đó, trong trường hợp cần đọc vào một chuỗi có cả dấu cách,  ta sẽ sử dụng kết họp hai cú pháp: 		

```cpp=
getline(cin, {Tên_chuỗi});
```

Lệnh `getline()` sẽ thu nhận cả dòng dữ liệu nhập vào, bao gồm cả những dấu cách. Nó sẽ dừng việc đọc lại khi  gặp kí tự `\n` - tức là kí tự xuống dòng:

```cpp=
#include <iostream>
#include <string>

using namespace std;
    
int main()
{
    string name;
    getline(cin, name);
        
    cout << "Tên vừa nhập là: " << name;
}
```
	
Lúc này, với tên nhập vào là `Vũ Quế Lâm`, chạy chương trình sẽ thu được kết quả chính xác:

```cpp
Tên vừa nhập là: Vũ Quế Lâm
```

### 2.2. Nhập nhiều chuỗi kí tự hoặc chuyển đổi từ nhập số sang nhập chuỗi bằng `getline()`

Nếu như chúng ta chỉ nhập một chuỗi kí tự duy nhất, thì sẽ không có điều gì đáng lưu tâm cả, bạn chỉ cần lựa chọn giữa `cin` và `getline(cin)` tùy vào việc chuỗi bạn nhập vào có dấu cách hay không. Tuy nhiên, khi dữ liệu đầu vào có nhiều chuỗi kí tự khác nhau, hoặc khi dữ liệu đầu vào bao gồm cả số và chuỗi, thì câu chuyện sẽ khác đi. Về bản chất, khi các bạn nhập bất cứ thứ gì vào từ bàn phím, chúng sẽ được đẩy vào bộ nhớ đệm, rồi hàm `cin` sẽ "đọc" dữ liệu ra từ bộ nhớ đệm rồi nạp vào biến. 

Chẳng hạn, nếu như các bạn nhập vào một số là $123,$ rồi ấn phím `Enter` (chính là kí tự xuống dòng), thì $123$ và kí tự `\n` sẽ được đẩy vào bộ nhớ đệm trước, sau đó hàm `cin` mới "quét qua" dữ liệu trong bộ nhớ đệm và đưa nó vào biến phía sau. Trong trường hợp biến phía sau là một biến kiểu số, thì chỉ có các chữ số mới được ghi nhận vào biến, còn những kí tự như ` ` và `\n` sẽ bị bỏ qua, nhờ đó nên trong trường hợp đọc nhiều số khác nhau, chương trình vẫn sẽ phân tách đúng các số, dù các bạn dùng dấu cách hay dấu xuống dòng. Tuy nhiên, nếu như theo sau số nhập vào là một kí tự, hoặc một chuỗi kí tự, thì nó sẽ đọc được cả kí tự `\n` (vì kí tự `\n` chỉ bị bỏ qua chứ nó vẫn còn tồn tại trong bộ nhớ đệm), dẫn đến chuỗi kí tự sẽ bị đọc sai. Cùng xem một ví dụ dưới đây:

```cpp=
int main()
{
    int id;
    cin >> id; // Nhập mã số sinh viên.

    string name;
    getline(cin, name);

    cout << id << endl << name;
}
```

Nếu như nhập vào dữ liệu là $id = 1$ và $name=$ `Nguyen Van A`, thì khi chạy chương trình các bạn sẽ thấy kết quả in ra chỉ có như sau:

```
1
```

Nguyên do là vì, khi nhập xong số $1,$ chúng ta sẽ nhấn `Enter` hoặc dấu cách. Biến $id$ chỉ có thể đọc được số $1,$ còn kí tự dấu cách hoặc xuống dòng vẫn nằm lại trong bộ nhớ đệm. Hàm `getline(cin, name)` tiếp theo sẽ đọc luôn cả những kí tự đó, dẫn đến hai trường hợp sau:

- Nếu kí tự còn lại là dấu cách, thì kí tự đó sẽ bị thêm vào đầu của chuỗi kí tự $name$.
- Nếu kí tự còn lại là dấu xuống dòng, thì hàm `getline()` sẽ dừng lại luôn và chuỗi kí tự $name$ sẽ bị mất giá trị.

Tựu chung lại, dữ liệu của chúng ta sẽ bị sai! Vậy giải pháp là gì? Chúng ta cần xóa bộ nhớ đệm trước khi nhập một chuỗi (nên làm như vậy dù nhập một chuỗi hay nhiều chuỗi). Hàm `cin` trong C++ cung cấp phương thức `cin.ignore()` để làm điều đó. Cú pháp như sau:

```cpp=
cin.ignore(n, c);
```

Phương thức `cin.ignore()` sẽ xóa đi $n$ kí tự trong bộ nhớ đệm cho tới khi gặp kí tự $c$ thì dừng lại, và luồng nhập dữ liệu sẽ bắt đầu từ kí tự phía sau kí tự $c$. Nếu như ta để trống tham số thì chương trính sẽ tự động hiểu là chỉ xóa $1$ kí tự trong bộ nhớ đệm. Điều này khá hữu ích khi nhập chuỗi ngay sau một số, vì chúng ta sẽ có thói quen dùng một dấu cách hoặc một dấu xuống dòng sau khi nhập số. Như vậy, đoạn code phía trên có thể sửa lại như sau:

```cpp=
int main()
{
    int id;
    cin >> id; // Nhập mã số sinh viên.

    string name;
    cin.ignore();
    getline(cin, name);

    cout << id << endl << name;
}
```

Lúc này, kết quả sẽ trở nên chính xác với bộ dữ liệu nhập vào:

```
1
Nguyen Van A
```

### 2.3. Xuất ra các hằng chuỗi hoặc hằng kí tự

Trong trường hợp cần viết các ***hằng chuỗi*** hoặc ***hằng kí tự*** trong C++, ta có quy tắc như sau:
- Nếu viết ra một kí tự, thì đặt kí tự đó trong cặp ngoặc `''` hoặc `""`. Ví dụ, viết ra kí tự `a` thì có thể viết `cout << 'a';` hoặc `cout << "a";` đều được.
- Nếu viết ra một chỗi có nhiều hơn $1$ kí tự, thì cần đặt chuỗi trong cặp dấu `""`. Ví dụ, khi muốn viết ra thông báo `Bạn đã đăng nhập thành công` thì phải viết là `cout << "Bạn đã đăng nhập thành công";`.

# III. Duyệt và tìm kiếm tuần tự trên chuỗi

## 1. Duyệt chuỗi

Để duyệt qua các phần tử trên chuỗi, ta sử dụng một vòng lặp từ vị trí đầu tiên tới vị trí cuối cùng của chuỗi. Lớp `<string>` cung cấp cú pháp `{Tên_chuỗi}.size()` để lấy độ dài của chuỗi, mà ta biết rằng các phần tử trong chuỗi được đánh số từ vị trí $0,$ nên cú pháp duyệt chuỗi như sau:

```cpp=
for ({Biến_đếm} = {Vị_trí_đầu}; {Biến_đếm} < {Tên_chuỗi}.size(); {Tăng_giảm_biến_đếm})
{
    {Các_câu_lệnh};
}
```

Chẳng hạn, để duyệt các phần tử của một chuỗi $s$ từ đầu tới cuối chuỗi, ta viết như sau:

```cpp=
for (int i = 0; i < s.size(); ++i)
```

Nếu muốn duyệt một đoạn nhỏ trên chuỗi, hoặc duyệt ngược từ cuối về đầu chuỗi chẳng hạn, chỉ cần biến đổi vòng lặp một chút xíu. Bạn đọc hãy thử tự suy nghĩ về vấn đề này nhé.

Ngoài ra, chúng ta còn có thể duyệt qua tất cả các phần tử trong chuỗi theo cú pháp duyệt trực tiếp phần tử như sau:

```cpp=
for (char {Tên_biến_kí_tự}: {Tên_chuỗi})
{
    {Các_câu_lệnh};
}
```

Ví dụ, muốn duyệt qua mọi phần tử của chuỗi $s$ bất kỳ theo cách này, ta viết:

```cpp=
for (char c: s)
```

Tuy nhiên, cách duyệt này chỉ có thể duyệt được mọi phần tử của chuỗi theo thứ tự từ trái qua phải, và buộc phải duyệt qua tất cả chuỗi. Vì thế nó không được ưu tiên như cách thứ nhất.

## 2. Tìm kiếm tuần tự trên chuỗi

Bài toán đặt ra rất đơn giản: Cho chuỗi kí tự $s$ chỉ gồm toàn chữ cái latin in thường và một kí tự chữ cái $c$ bất kỳ, hãy đếm số lượng kí tự $c$ trong chuỗi $s?$ 

Bằng cách duyệt qua các phần tử trên chuỗi và áp dụng các toán tử, ta có thể giải quyết bài toán này như sau:

```cpp=
#include <iostream>
#include <string>

using namespace std;

int main()
{
    string s;
    char c;
    cin >> s;
    cin >> c;

    int cnt = 0; // Biến đếm số kí tự khác c trong chuỗi.
    for (int i = 0; i < s.size(); ++i)
	if (s[i] == c) // Nếu kí tự ở vị trí i khác c thì tăng biến đếm lên.
	    ++cnt;

    cout << cnt;

    return 0;
}
```

Bài toán tìm kiếm trên chuỗi có thể biến đổi linh hoạt theo nhiều cách khác nhau, chỉ cần các bạn hiểu rõ về cách đánh số thứ tự của kí tự và cách duyệt qua các kí tự trong chuỗi là sẽ làm được.

Trong phần tiếp theo của bài viết, tôi sẽ nói về các thao tác xử lý chuỗi kí tự và một số bài toán áp dụng, các bạn hãy cùng đón đọc!