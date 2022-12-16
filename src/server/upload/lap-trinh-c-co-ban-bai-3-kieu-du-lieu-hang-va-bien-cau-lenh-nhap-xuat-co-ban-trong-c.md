Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về kiểu dữ liệu, hằng và biến - những khái niệm cơ sở của mọi ngôn ngữ lập trình.

# I. Kiểu dữ liệu

## 1. Kiểu dữ liệu nguyên thủy (Primitive Type)

Các bài toán trong thực tế thường sẽ có dữ liệu đầu vào và kết quả ra thuộc những kiểu dữ liệu quen thuộc như số nguyên, số thực,...Việc sử dụng các kiểu dữ liệu có liên quan mật thiết đến các phép toán có thể thao tác trên dữ liệu và bộ nhớ cấp phát cho dữ liệu đó. Mỗi ngôn ngữ lập trình sẽ cung cấp cho người dùng một số kiểu dữ liệu và cho biết phạm vi lưu trữ cũng như các phép toán có thể tác động lên dữ liệu kiểu đó. Đối với ngôn ngữ C++, người dùng được cung cấp sẵn $7$ kiểu dữ liệu nguyên thủy (Primitive Type) dưới đây:


<img width="500" src="https://i.imgur.com/I0LIYcg.png">


## 2. Phạm vi của các kiểu dữ liệu

Mỗi kiểu dữ liệu đều có một phạm vi lưu trữ nhất định. Ngoài ra, người dùng có thể thêm vào một số modifier ở phía trước dữ liệu để thay đổi khoảng giá trị của kiểu. Có $4$ loại modifier:
- `signed`: Kiểu có dấu.
- `unsigned`: Kiểu không dấu.
- `long`: Kiểu nhiều chữ số.
- `short`: Kiểu ít chữ số.

Bảng dưới đây thống kê phạm vi lưu trữ cũng như bộ nhớ tiêu tốn của các kiểu dữ liệu dạng số trong C++ kèm theo modifier của chúng:


<img width="650" src="https://i.imgur.com/HRmWUTD.png">


Ngoài ra, C++ cung cấp một số từ khóa để đưa ra giá trị nhỏ nhất và lớn nhất lưu trữ được của một kiểu dữ liệu, thể hiện trong bảng dưới đây:


	
<img width="650" src="https://i.imgur.com/uN9RsJm.png">


Riêng với kiểu dữ liệu `char`, kiểu này có thể lưu được cả số lẫn kí tự. Đối với kí tự, kiểu `char` lưu trữ được toàn bộ $256$ kí tự thuộc bảng mã **ASCII** - là bảng kí tự và mã kí tự sử dụng trong tin học và một số lĩnh vực khác. 

# II. Khai báo hằng và biến

## 1. Khai báo và sử dụng hằng số

***Định nghĩa:*** Hằng là giá trị cố định, không thể thay đổi trong suốt chương trình sau khi đã khai báo. Khai báo hằng thường được sử dụng cho các giá trị xuất hiện nhiều lần trong chương trình.

***Cú pháp khai báo:***

```cpp
const {Kiểu_dữ_liệu} {Tên_hằng} = {Giá_trị};
```

***Ví dụ:*** 

```cpp
const double pi = 3.14; // Khai báo hằng.
```

***Sử dụng:*** Sau khi được khai báo, hằng số có thể được sử dụng trong các câu lệnh, đi kèm với các toán tử trong C++. Thông thường, khai báo hằng số được đặt ngay sau phần khai báo thư viện và không gian tên của chương trình. Dưới đây là ví dụ đưa ra diện tích của một hình tròn có bán kính bằng $2.5$ sử dụng hằng số $\text{pi} = 3.14$:

```cpp
#include <iostream>
using namespace std;
const double pi = 3.14;

int main()
{
    double r = 2.5;
    cout << r * r * pi;

    return 0;
}
```

### 2. Khai báo và sử dụng biến

***Định nghĩa:*** Biến là giá trị sử dụng trong chương trình, có thể thay đổi tùy ý người sử dụng. Các biến trong chương trình cũng đều phải được đặt tên và khai báo cho chương trình dịch biết. 

***Cú pháp khai báo:***

```cpp
{Kiểu_dữ_liệu} {Danh_sách_biến} = {Giá_trị_ban_đầu_nếu_có};
```

***Ví dụ:***

```cpp
int x, y; // Khai báo biến, mặc định giá trị ban đầu là 0.
int index = 1; // Khai báo biến và khởi tạo giá trị ban đầu.
```

***Sử dụng:*** Sau khi được khai báo, biến có thể được sử dụng trong các câu lệnh, đi kèm với các toán tử trong C++. Dưới đây là ví dụ đưa ra tổng của hai số $10$ và $15$:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int x = 5, y = 10;
    cout << x + y;

    return 0;
}
```

## 3. Lưu ý khi khai báo và sử dụng hằng, biến

Các tên biến, tên hằng, tên của các hàm,...đều được gọi chung là các ***định danh (identifier).*** Các định danh do người dùng đặt ra cần tuân theo một số quy tắc chung sau đây:
- Các định danh không được phép trùng với các ***từ khóa*** của C++. Các ***từ khóa*** là các từ tiếng Anh đã được quy định sẵn ý nghĩa và tác dụng, ví dụ như: `cin, cout, enum, struct,...`; và chúng sẽ được hiển thị với màu khác với các định danh của người dùng.
- Các định danh chỉ được phép chứa các kí tự chữ, số và dấu gạch dưới `_`, ngoài ra không được phép chứa dấu cách, các kí tự đặc biệt và không được phép bắt đầu bằng chữ số.
- Các định danh có phân biệt giữa chữ hoa và chữ thường. Ví dụ, hai tên biến $\text{Your\_Name}$ và $\text{your\_name}$ là hoàn toàn khác nhau.
- Tên của các định danh nên đặt theo chuẩn mực lập trình C++ (C++ coding convention): chỉ gồm các chữ cái latin in thường và số, nếu tên biến gồm nhiều từ thì phân tách chúng bằng dấu gạch dưới `_` (quy tắc snake case). Ví dụ: $\text{school\_name, school\_id},...$
- Tên của các định danh nên đặt theo ý nghĩa thực tế của nó trong quá trình sử dụng, tránh đặt tên bừa bãi như $a, b, c,...$ vì nó sẽ gây khó khăn trong quá trình kiểm tra và tìm lỗi chương trình.
 
# III. Biến tự động (automatic variables)

***Định nghĩa:*** Biến tự động là một phát triển rất tiện lợi của phiên bản C++11, nó cho phép người dùng sử dụng từ khóa `auto` để khai báo một biến mà không cần biết trước kiểu dữ liệu của biến đó. Từ khóa `auto` sẽ tự động chọn kiểu phù hợp cho biến. Điều này có thể không cần thiết đối với những kiểu dữ liệu nguyên thủy, tuy nhiên sẽ rất thuận lợi khi cần dùng các kiểu dữ liệu phức tạp sau này, hay thậm chí là tự động chọn kiểu trả về cho một hàm.

Ngoài ra bạn có thể kiểm tra kiểu trả về của biến bằng cú pháp: 

```cpp
typeid({Tên_biến}).name();
```

***Ví dụ:***

```cpp
int main()
{
    auto x = 6.5F; // x tự động nhận kiểu float.
    auto y = 7.1; // y tự động nhận kiểu double.
    auto k = 10; // k tự động nhận kiểu int.

    cout << x << endl;
    cout << "Kiểu của x: " << typeid(x).name() << endl;
    cout << y << endl;
    cout << "Kiểu của y: " << typeid(y).name() << endl;
    cout << k << endl;
    cout << "Kiểu của k: " << typeid(k).name();
        
    return 0;
}
```

***Kết quả:***

```
6.5
Kiểu của x: f // Đây là kiểu float.
7.1
Kiểu của y: d // Đây là kiểu double.
10
Kiểu của k: i // Đây là kiểu int
```

# III. Câu lệnh nhập - xuất cơ bản trong C++

C++ cung cấp hai câu lệnh nhập xuất dữ liệu nằm trong thư viện `<iostream>` là `cin` và `cout`, sử dụng để nhận dữ liệu từ bàn phím hoặc file và trả kết quả tính ra ra màn hình hoặc file. Cách sử dụng như sau:

```cpp
cin >> {Danh_sách_biến};
cout << {Các_biểu_thức_hoặc_biến};
```

Đối với câu lệnh `cin`, bạn chỉ được phép sử dụng nó để nhập vào giá trị cho các biến. Ví dụ, các câu lệnh `cin >> a;`, `cin >> x >> y;`,...là các câu lệnh hợp lệ; ngược lại `cin >> 4;`, `cin >> int x;`, `cin >> "number";`,...là không hợp lệ và sẽ báo lỗi. 

Đối với câu lệnh `cout`, bạn chỉ được phép sử dụng nó để in ra giá trị của các *biến - biểu thức có giá trị*, hoặc các *hằng số*, hoặc các *kí tự* và *chuỗi kí tự*. Khi đưa ra một kí tự thì đặt kí tự đó trong cặp dấu `''`, còn khi đưa ra một chuỗi thì đặt chuỗi đó trong cặp dấu `""`. Ví dụ, `cout << 5;`, `cout << a + b;`, `cout << "Hello World";`,...là các câu lệnh hợp lệ; ngược lại các câu lệnh `cout << a = 5;`, `cout << int g = a + b;`,...là không hợp lệ và sẽ báo lỗi.

Các lệnh `cin` và `cout` cũng có thể được áp dụng với nhiều biến, biểu thức hoặc hằng phía sau Khi cần nhập hay xuất nhiều đối tượng liên tiếp, chỉ cần phân tách chúng bằng các dấu `>>` hoặc `<<` tương ứng. Đối với lệnh `cin`, khi sử dụng để nhập giá trị cho nhiều biến thì phân tách chúng trong khi nhập bằng dấu cách hoặc dấu xuống dòng. Chẳng hạn: `cin >> a >> b;` hay `cout << "Tổng các số từ 1 tới " << N << " là: " << S;`.

***Ví dụ:*** Chương trình dưới đây cho phép nhập vào hai số nguyên $a$ và $b$ từ bàn phím sau đó đưa ra tổng của hai số đó:

```cpp
int main()
{
    int a, b;
    cin >> a >> b;
        
    cout << a + b;
}
```

# IV. Ép kiểu cho biến và hằng

## 1. Khi nào cần ép kiểu?

Trong khi tính toán, có nhiều trường hợp kết quả của biểu thức cần tính sẽ có kiểu dữ liệu khác với các toán hạng trong biểu thức. Đơn cử một trường hợp như khi phải tính giá trị thập phân của một số hữu tỉ $\frac{a}{b},$ với $a, b \in \mathbb(Z)$. Theo tư duy thông thường, nhiều bạn sẽ viết chương trình như thế này:

```cpp
int main()
{
    int a, b;
    cin >> a >> b;

    cout << "Giá trị thập phân là: " << a / b;
}
``` 

Nếu chạy chương trình này với $a = 5, b = 4,$ điều gì sẽ xảy ra? Có phải kết quả là $1.25$ hay không? Không may là không! Kết quả của chương trình sẽ đưa ra như sau:

```
Giá trị thập phân là: 1
```

Lí giải cho điều này, đó là do $a$ và $b$ đều có kiểu dữ liệu số nguyên, mà kết quả của toán tử `/` trong C++ sẽ phụ thuộc vào kiểu của hai toán hạng. Vì thế, kết quả của phép tính `a / b` sẽ tự động chọn kiểu là số nguyên, mà số nguyên thì chỉ có thể lấy giá trị phần nguyên của số $1.25$ thôi. Những trường hợp kiểu như vậy xuất hiện khá nhiều trong các phép tính, khi đó chúng ta cần sử dụng ép kiểu. Tựu chung lại, có $3$ trường hợp cần sử dụng tới ép kiểu:
- Khi cần đưa dữ liệu về định dạng mình mong muốn, phục vụ cho tính toán.
- Khi cần khởi tạo hoặc gán một biến với giá trị của một biến (hoặc biểu thức) có kiểu khác với kiểu của biến gán (biến bên trái của toán tử gán `=`).
- Khi trả về kết quả cho một hàm nhưng kiểu dữ liệu của biến kết quả lại khác với kiểu dữ liệu của hàm.

## 2. Cách ép kiểu cho biến và hằng

Để ép kiểu cho biến trong C++, ta sử dụng cú pháp: 

```
({Kiểu_dữ_liệu_mới}) {Tên_biến}
```

Toàn bộ cụm biến đã được ép kiểu có thể được sử dụng vào các phép tính như bình thường, nhưng sẽ có kiểu dữ liệu khác so với ban đầu khai báo (chỉ trong phép tính đó). Việc ép kiểu có thể làm thay đổi khoảng giá trị biểu diễn của một biến, ví dụ như từ số thực trở thành số nguyên, hoặc từ số nguyên sang số thực, từ kí tự sang mã của kí tự,...Điều này có khá nhiều tác dụng trong lập trình thi đấu nói riêng và lập trình nói chung, bởi trong nhiều thời điểm chúng ta sẽ cần những giá trị ở kiểu khác nhau của biến.

***Ví dụ 1:*** Đưa ra bình phương của số thực $N$ và giá trị làm tròn của số thực $N$:

```cpp
int main()
{
    double N = 7.5;
        
    cout << N * N << endl; // Bình phương của N.
    cout << (int)N; // Làm tròn của N.
}
```

***Kết quả 1:***

```
56.25
7
```

***Ví dụ 2:*** Đưa ra vị trí của kí tự $x$ trong bảng kí tự **ASCII**:

```cpp
int main()
{
    char x = 'A';
        
    cout << (int)x;
}
```

***Kết quả 2:***

```
65
```

***Lưu ý:***

- Trong các biểu thức, chỉ cần có một toán hạng có kiểu số thực thì kết quả của cả biểu thức sẽ có kiểu số thực.
- Khi tính toán các biểu thức, hãy cố gắng đặt kiểu dữ liệu của các toán hạng giống với kiểu dữ liệu của kết quả biểu thức đó. Ví dụ, phép nhân giữa hai số kiểu `int` là $a = 10^9$ và $b = 10^9$ sẽ cho ra kết quả là $10^{18}$ - thuộc phạm vi của kiểu `long long`. Vậy hãy khai báo $a$ và $b$ ở kiểu `long long`, hoặc ép kiểu cho $a$ và $b$ trong phép tính. Cách làm này sẽ giúp cho dữ liệu luôn luôn chuẩn xác trong khi tính toán, tránh trường hợp tràn số gây kết quả sai.
- Đối với các hằng số, khi sử dụng chương trình sẽ tự động chọn một kiểu dữ liệu phù hợp cho hằng đó (trừ khi đã khai báo hằng bằng từ khóa `const`). Đây gọi là ép kiểu ngầm định của chương trình. Nếu muốn ép kiểu cụ thể cho hằng, ta cũng có thể làm như phương pháp bên trên. Ngoài ra, có thể ép kiểu cho các hằng số bằng những kí hiệu thêm vào phía sau, giả sử nếu cần ép kiểu `long long` cho số $5$ (mặc định là `int`), ta viết: `5LL`, hoặc ép kiểu `float` cho số $5.5$ (mặc định là `double`), ta viết `5.5F`,...

# V. Biểu diễn số thực trong C++

## 1. Kí hiệu khoa học của số thực

Trong toán học, để biểu diễn các số thực rất nhỏ hoặc rất lớn, thông thường người ta sử dụng kí hiệu khoa học, đó là biểu diễn các số dựa trên lũy thừa cơ số 10. Ví dụ, khối lượng của một electron là $9.1093822 \times 10^{-31},$ hay $\text{mol}$ - một đơn vị đo lường trong hóa học có giá trị là $6.022 \times 10^{23},...$

Trong C++, ta sử dụng kí tự $e$ để thay cho giá trị $(\times 10)$ khi biểu diễn số thực. Ví dụ:
- $24327 = 2.4327 \times 10^4 = 2.4327e4$.
- $0.00069 = 6.9 \times 10^{-4} = 6.9e\text{-}4$.
- $...$

## 2. Độ chính xác của kiểu số thực

Như ta đã biết, có hai kiểu dữ liệu hỗ trợ biểu diễn số thực trong C++ ở dạng *dấu chấm động* là `float` và `double`. Mặc định một hằng số thực trong C++ luôn luôn có kiểu là `double`, còn nếu muốn sử dụng kiểu `float` thì ta thêm hậu tố `f` vào sau hằng số thực (chẳng hạn `3.5f`). 

Các số thực có dạng hữu hạn và dạng vô hạn. Đối với dạng vô hạn, sẽ có vô số chữ số phía sau dấu chấm thập phân, tuy nhiên bộ nhớ máy tính và kích thước kiểu dữ liệu thì lại hữu hạn. Các biến kiểu thực chỉ có thể lưu được một số lượng chữ số nhất định phía sau dấu chấm thập phân, và phần còn lại sẽ bị bỏ đi. Trong C++, câu lệnh `cout` mặc định sẽ có độ chính xác là $6$ chữ số đối với số thực kể cả phần thực lẫn phần phân. Những số ngoài phạm vi sẽ bị cắt bỏ và làm tròn lên 1 đơn vị nếu số bị cắt sau nó lớn hơn 5, hoặc số đó có thể được chuyển sang ký hiệu khoa học trong vài trường hợp tùy vào từng trình biên dịch. Cùng xem ví dụ sau:

```cpp
#include <iostream>
using namespace std;

int main()
{
    double d = 9.87654321;
    cout << d << endl;
	
    d = 987.654321;
    cout << d << endl;
	
    d = 987654.321;
    cout << d << endl;
	
    d = 9876543.21;
    cout << d << endl;

    d = 0.0000987654321;
    cout << d << endl;
	
    d = 1.23456789;
    cout << d << endl;
	
    return 0;
}
```

Biên dịch và chạy chương trình trên với CodeBlocks, ta thu được kết quả:

```
9.87654
987.654
987654
9.87654e+006
9.87654e-005
1.23457
```

Đối với kiểu `float`, độ chính xác sẽ là $7$ chữ số phần phân, còn với kiểu `double`, độ chính xác lên tới $16$ chữ số phần phân. Do đó, khi cần sử dụng tới số thực với độ chính xác cao, kiểu `double` nên được ưu tiên để tránh sai số ở mức tối đa.

## 3. Làm tròn số thực

Bạn có thể làm tròn được các số thực tới số lượng chữ số mà mình mong muốn bằng cách sử dụng hàm `setprecision` trong thư viện `<iomanip>` của C++. Cú pháp như sau:

```cpp
cout << fixed << setprecision({Số_chữ_số}) << {Hằng_hoặc_biến_số_thực};
```

Sử dụng hàm này, chúng ta có thể điều chỉnh số chữ số sẽ xuất hiện sau dấu chấm động của một hằng hoặc biến kiểu thực, đồng thời chương trình cũng sẽ tự làm tròn lên $1$ đơn vị cho chữ số cuối cùng nếu như chữ số đầu tiên trong phần bị cắt đi lớn hơn $5$. Chẳng hạn, khi viết ra số thực $9.87654321$ với $3$ chữ số phần phân, ta viết như sau:

```cpp
#include <iostream>
#include <iomanip>

int main()
{
    cout << fixed << setprecision(3) << 9.87654321;
}
```

Kết quả thu được sẽ là:

```
9.877
```

Tuy nhiên, như đã nói ở trên, kiểu dữ liệu số thực trong C++ chỉ cung cấp độ chính xác tối đa tới $16$ chữ số, nên nếu như bạn cố viết ra các số thực với độ chính xác nhiều hơn $16$ chữ số, sẽ dẫn đến kết quả bị sai số nhất định. Điều này hầu như sẽ không xảy ra trong các bài toán lập trình thi đấu, nên chúng ta không cần quá lo lắng về nó!

## 4. So sánh bằng nhau giữa hai số thực

Trong C++, khi so sánh giữa hai số thực, nếu như chúng đều là các số thực hữu hạn thì không có gì đáng lưu tâm cả. Tuy nhiên, nếu so sánh những số thực vô hạn, thì sẽ không bao giờ xảy ra trường hợp chúng bằng nhau hoàn toàn được cả, vì số chữ số chính xác của kiểu dữ liệu là hữu hạn. Lấy ví dụ, số $1.0$ khi chia cho $3$ bằng $0.333333...,$ nhưng nếu đem $3$ giá trị $0.333333...$ cộng với nhau thì chỉ thu được kết quả là $0.999999...,$ rõ ràng khác với $1.0$. Cùng xem một ví dụ sau để hiểu kĩ hơn:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main()
{
    double d = 0.1;
    cout << d << endl;			// Độ chính xác mặc định 6 chữ số.
    
    cout << std::setprecision(20);	// Làm tròn 20 chữ số.
    cout << d << endl;
	
    return 0;
}
```

Kết quả của đoạn chương trình trên sẽ là:

```
0.1
0.1000000000000000555
```

Mặc dù cùng là số $d = 0.1,$ nhưng khi làm tròn tới $20$ chữ số thì ta lại thu được một giá trị lớn hơn $0.1$. Lí do là vì, dữ liệu kiểu `double` chỉ có thể cho độ chính xác tới $16$ chữ số, nếu người dùng muốn làm tròn ngoài khoảng đó thì sẽ xảy ra ***lỗi làm tròn dấu chấm động***. Bởi thế, khi so sánh giữa hai số thực trong C++, ta chỉ có thể sử dụng các phép toán `<`, `>`, `<=` và `>=` thôi, còn riêng với phép toán `==`, thì cần sử dụng đến một khái niệm là ***độ chính xác epsilon***. Cụ thể, với hai số thực $a$ và $b,$ muốn biết chúng có bằng nhau hay không, người ta sẽ lựa chọn một giá trị thật nhỏ (thông thường là $10^{-6}$), đặt nó làm giá trị epsilon. Sau đó, xét hiệu $|a - b|,$ nếu hiệu này nhỏ hơn hoặc bằng epsilon thì sẽ coi rằng $a$ và $b$ bằng nhau. Ngược lại thì $a$ và $b$ sẽ khác nhau. Chi tiết về cài đặt các bạn sẽ hiểu rõ hơn khi học tới bài ***Cấu trúc rẽ nhánh***.

# VI. Tài liệu tham khảo

- https://codelearn.io/sharing/kien-thuc-co-ban-khi-bat-dau-hoc-cpp
- https://www.tinhocsoctrang.com/2015/04/hang-va-bien-trong-cc.html
- https://cafedev.vn/tu-hoc-c-bai-tap-c-ve-bien-va-kieu-du-lieu/