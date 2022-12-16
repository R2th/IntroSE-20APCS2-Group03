## I. Địa chỉ của biến trong máy tính

## 1. Điều gì xảy ra khi khai báo một biến?

Như các bạn đã biết từ những bài học đầu tiên về ngôn ngữ lập trình, khi ta muốn sử dụng một biến với kiểu dữ liệu nguyên thủy, thì biến đó cần được khai báo. Sau khi khai báo một biến, thì hệ điều hành sẽ tìm đến một vùng nhớ trống trên các thiết bị lưu trữ tạm thời của máy tính (RAM, hoặc ngăn xếp hay các vùng lưu trữ khác,...); nếu như tìm được một vùng nhớ có đủ khoảng trống cho kích thước của biến đó thì biến sẽ nắm giữ vùng nhớ vừa tìm được.


	
![](https://cdn.ucode.vn/uploads/2247/upload/kunwKDPO.png)
	
*Minh họa một biến $var$ chiếm vùng nhớ 4 bytes trên RAM*


Tuy nhiên, sau khi một vùng nhớ đã được cấp phát cho một biến, thì làm sao để chương trình dịch biết được chính xác vị trí của biến đó trên bộ nhớ để thực hiện các lệnh với biến? Rất đơn giản, mỗi biến sau khi được khai báo sẽ có một ***địa chỉ vùng nhớ*** trên thiết bị lưu trữ mà biến đó đang được lưu. 

## 2. Địa chỉ của biến

Các thiết bị nhớ cung cấp bộ nhớ tạm thời (là bộ nhớ được sử dụng trong quá trình máy tính làm việc để lưu trữ dữ liệu) đều được tạo nên bởi các ô nhớ liên tiếp nhau, mỗi ô nhớ tương ứng với một byte và đều có một ***số thứ tự*** đại diện cho vị trí của ô nhớ đó trong thiết bị. Số thứ tự đó được gọi là ***địa chỉ*** của ô nhớ.

Các địa chỉ của ô nhớ là những con số ảo được tạo ra bởi hệ điều hành, mà con người chúng ta rất khó đọc. Hãy cứ tưởng tượng các ô nhớ được đánh số từ $0,$ và địa chỉ cuối cùng được đánh số tương đương với số ô nhớ của thiết bị đó.


	
![](https://cdn.ucode.vn/uploads/2247/upload/EcyTbomx.png)


## 3. Lấy địa chỉ của một biến trong C++

Giả sử ta khai báo một biến $x$ với kiểu dữ liệu bất kỳ trong các kiểu dữ liệu nguyên thủy. Muốn lấy ra địa chỉ của biến $x$ này, các bạn chỉ cần thêm toán tử `&` phía trước nó.

```cpp=
#include <iostream>

using namespace std;

main()
{
    int x;
    cout << &x;
}
```

Thử chạy chương trình này, ta thu được kết quả là một dãy địa chỉ của biến $x$ đã khai báo:


	
![](https://cdn.ucode.vn/uploads/2247/upload/LxcFnmfW.png)


## 4. Tham chiếu (Reference)

Chúng ta đã nói tới khái niệm này khi học về ***Hàm*** trong C++. Tuy nhiên, trong bài này tôi sẽ nói kĩ hơn về tham chiếu.

Một ***tham chiếu*** cũng là một kiểu dữ liệu cơ bản, nó giống như các bạn tạo ra một tên khác (tên giả) cho một biến đã có. 

Để tạo ra một tham chiếu, các bạn thêm toán tử `&` giữa kiểu dữ liệu và tên biến trong lời khai báo biến. Ngoài ra, biến tham chiếu bắt buộc phải được khởi tạo bằng với một biến đã có sẵn.

```cpp=
{Kiểu_dữ_liệu} & {Tên_biến_tham_chiếu} = {Tên_biến_có_sẵn}
```

Lấy ví dụ:

```cpp=
int x = 10;
int & x_reference = x;
```

Cùng in ra giá trị của hai biến này với đoạn lệnh dưới đây:

```cpp=
#include <iostream>

using namespace std;

main()
{
    int x = 10;
    int & x_reference = x;
	
    cout << "Giá trị của x: " << x << endl;
    cout << "Giá trị của tham chiếu tới x: " << x_reference;
}
```

Ta thấy kết quả như sau:

```
Giá trị của x: 10
Giá trị của tham chiếu tới x: 10
```

Như các bạn thấy, giá trị của hai biến này giống nhau. Vậy phải chăng biến tham chiếu là một bản sao của biến gốc? Hoàn toàn không phải! Hãy cùng in ra thêm địa chỉ của hai biến:

```cpp=
#include <iostream>

using namespace std;

main()
{
    int x = 10;
    int & x_reference = x;
	
    cout << "Giá trị của x: " << x << endl;
    cout << "Giá trị của tham chiếu tới x: " << x_reference << endl;
	
    cout << "Địa chỉ của x: " << &x << endl;
    cout << "Địa chỉ của tham chiếu tới x: " << &x_reference;
}
```

Ta có kết quả:

```
Giá trị của x: 10
Giá trị của tham chiếu tới x: 10
Địa chỉ của x: 0x104dfee8
Địa chỉ của tham chiếu tới x: 0x104dfee8
```

Có thể thấy, hai biến có chung địa chỉ. Về bản chất, toán tử `&` không có nghĩa là "địa chỉ của", mà nó có nghĩa là "tham chiếu tới". Khi thực hiện tham chiếu từ biến $\text{x reference}$ tới biến $x,$ thì biến $\text{x reference}$ sẽ cùng kiểm soát vùng nhớ có địa chỉ là địa chỉ của biến $x$.


	
![](https://cdn.ucode.vn/uploads/2247/upload/OOGbFIRo.png)


Nói cách khác, hai biến này là hai tên khác nhau nhưng cùng kiểm soát một địa chỉ vùng nhớ. Điều này đồng nghĩa với việc, khi các bạn thay đổi giá trị của biến $\text{x reference},$ thì giá trị của biến $x$ cũng sẽ thay đổi theo và ngược lại. Đó chính là cơ chế của việc truyền tham chiếu trong hàm ở C++.

***Lưu ý:***

- Một biến tham chiếu chỉ được phép tham chiếu tới một biến cùng kiểu, và khi đã tham chiếu rồi thì không thể tham chiếu tới một biến khác. 
- Không thể khai báo một biến tham chiếu tới một hằng số, vì hằng số không thể thay đổi mà biến tham chiếu thì có, do vậy sẽ gây xung đột. 

# II. Con trỏ trong C++

## 1. Khái niệm con trỏ (pointer)

>***Một con trỏ (a pointer)*** là một biến được dùng để lưu trữ ***địa chỉ*** của biến khác.

Khác với tham chiếu, con trỏ là một biến có địa chỉ độc lập, nhưng giá trị trong vùng nhớ của con trỏ lại chính là địa chỉ của biến mà nó trỏ tới (hoặc một địa chỉ ảo).


![](https://cdn.ucode.vn/uploads/2247/upload/TzsioxAs.png)


Trong ví dụ trên, ta có một biến con trỏ được cấp phát vùng nhớ tại địa chỉ $3255,$ và nó trỏ đến vùng nhớ $1224,$ nghĩa là giá trị của nó là $1224$ (tất nhiên chỉ là do người viết minh họa một cách dễ hiểu, còn thực tế các địa chỉ phức tạp hơn nhiều).

## 2. Khai báo con trỏ

Để khai báo một con trỏ, ta sử dụng thêm toán tử `*` trong lời khai báo (không cần thiết phải đặt sát cạnh tên biến)

```cpp=
// Cách 1.
{Kiểu_dữ_liệu} *{Tên_con_trỏ};
// Cách 2.
{Kiểu_dữ_liệu}* {Tên_con_trỏ};
```

Tuy nhiên các bạn nên dùng cách thứ $2$ để phân biệt hẳn với việc ***lấy giá trị*** của một biến lặp trong C++ (phần này sẽ được đề cập ở trong bài về thư viện STl C++).

Khi khai báo một biến con trỏ, thì biến đó chỉ được phép trỏ vào địa chỉ của các biến có cùng kiểu đã khai báo.

Chẳng hạn, tôi sẽ khai báo một con trỏ kiểu `int` , thì biến con trỏ này chỉ được phép trỏ vào các địa chỉ của biến kiểu `int`:

```cpp=
int* ptr;
```

***Lưu ý:*** Khi khai báo một con trỏ mà chưa khởi tạo địa chỉ trỏ đến cho nó, thì việc in ra giá trị của con trỏ có thể gây ra lỗi và chương trình sẽ bị đóng luôn. Nguyên nhân là do khi chưa khởi tạo, thì con trỏ sẽ nắm giữ một giá trị rác nào đó, có thể là một địa chỉ vượt quá giới hạn của bộ nhớ ảo.

Để khắc phục, khi khởi tạo một con trỏ mà chưa sử dụng đến ngay, các bạn nên gán cho nó một giá trị là `NULL` hoặc `nullptr` (chuẩn C++ 11). Đây là các macro được định nghĩa sẵn trong C++, khi gán một con trỏ bằng `NULL` hoặc `nullptr` nghĩa là con trỏ đó chưa trỏ đến giá trị nào cả. Nó được định danh sẵn trong C++:

```cpp
#define NULL 0
```

Ví dụ:

```cpp=
main()
{
    int* ptr = NULL; // Hoặc int* ptr = nullptr;
	
    cout << ptr;
	
    return 0;
}
```

Lúc này, đoạn chương trình sẽ chạy bình thường, và kết quả in ra là:

```
0
```

## 3. Các phép toán cơ bản với con trỏ

### Phép gán

Ta chỉ được phép gán giá trị của con trỏ bằng với ***địa chỉ*** của một biến khác (hoặc một con trỏ khác) cùng kiểu dữ liệu với nó. 

Muốn gán địa chỉ của biến thông thường cho con trỏ, trước hết cần sử dụng toán tử `&` để lấy ra ***địa chỉ ảo*** của biến, sau đó mới gán địa chỉ đó cho con trỏ được. Còn nếu như gán một con trỏ khác cho con trỏ thì chỉ cần chúng cùng kiểu là được.

Lấy ví dụ:

```cpp=
int x = 5;
int* ptr = &x;
int* ptr_1 = ptr;
```


	
![](https://cdn.ucode.vn/uploads/2247/upload/xlFGAtqX.png)


Khác với tham chiếu, một con trỏ sau khi được khai báo, hoàn toàn có thể trỏ đến địa chỉ của nhiều biến khác nhau sau khi được gán giá trị. Còn tham chiếu không thể thay đổi địa chỉ sau lần tham chiếu đầu tiên.

Ví dụ dưới đây sẽ minh họa điều đó:

```cpp=
#include <iostream>

using namespace std;
	
main()
{
    int* ptr;
    int a[] = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; ++i)
    {
        ptr = &a[i];
        cout << ptr << endl;
    }

    return 0;
}
```

Kết quả của đoạn chương trình trên là:

```
0x104dfed4
0x104dfed8
0x104dfedc
0x104dfee0
0x104dfee4
```

Ta thấy biến con trỏ đã lần lượt trỏ vào địa chỉ của $5$ phần tử trên mảng $a,$ chính là $5$ địa chỉ liên tiếp nhau trên bộ nhớ ảo.

### Truy xuất giá trị ở vùng nhớ mà con trỏ trỏ đến

Khi đã có một con trỏ trỏ đến địa chỉ nào đó trong thiết bị nhớ, muốn đưa ra giá trị của vùng nhớ mà con trỏ đang trỏ tới, các bạn sử dụng toán tử `*` ở phía trước biến con trỏ.

Ví dụ:

```cpp=
#include <iostream>

using namespace std;

main()
{
    int* ptr;
    int value = 5;

    ptr = &value;

    cout << "Giá trị ở vùng nhớ mà con trỏ trỏ đến: " << *ptr;
	
    return 0;
}
```

Kết quả đoạn chương trinh trên là:

```
Giá trị ở vùng nhớ mà con trỏ trỏ đến: 5
```

Và tất nhiên, theo cách này chúng ta cũng có thể thay đổi được giá trị của vùng nhớ mà con trỏ đang trỏ đến, bằng cách gán trực tiếp giá trị đó:

```cpp=
int value = 5;
int* ptr = &value;

*ptr = 10;

cout << *ptr << ' ' << value;
```

Đoạn code trên sẽ cho kết quả là `10 10`, bởi vì biến $\text{value}$ đã bị thay đổi giá trị thành $10$ với câu lệnh `*ptr = 10`.

### Tăng và giảm con trỏ

Giống như các biến thông thường, các con trỏ cũng có thể sử dụng những toán tử tăng giảm, chúng bao gồm: `++`, `--`, `+`, `-`, `+=`, `-=`. Tuy nhiên, tác động của các toán tử này lên con trỏ sẽ có đôi chút khác biệt.

Trước hết, ta khai báo một biến con trỏ kiểu `int` và xem kết quả chạy chương trình dưới đây:

```cpp=
#include <iostream>

using namespace std;

main()
{
    int value = 0;
    int* ptr = &value;
	
    cout << ptr << endl;
    ++ptr;
	
    cout << ptr;
	
    return 0;
}
```

Kết quả đoạn chương trình trên như sau:

```
0x104dfee8
0x104dfeec
```

Ta thấy hai địa chỉ này khác nhau, tất nhiên. Nhưng khác nhau như thế nào? Cần biết rằng, các địa chỉ trong bộ nhớ ảo được biểu diễn bằng số hệ thập lục phân (cơ số $16$). Kí hiệu `0x` ở đầu địa chỉ thể hiện số đứng phía sau là thập lục phân. Quy đổi hai giá trị `104dfee8` và `104dfeec` ra hệ thập phân, ta được hai giá trị: 
- Trước khi tăng: $273 546 984$ (bytes).
- Sau khi tăng: $273 546 988$ (býtes).

Hai giá trị này chênh nhau đúng $4$ đơn vị, vừa bằng kích thước của kiểu dữ liệu `int` là $4$ byte. Như vậy, toán tử `++` sẽ làm con trỏ trỏ đến địa chỉ tiếp theo trên bộ nhớ ảo, với khoảng cách đúng bằng kích thước của kiểu dữ liệu đã khai báo cho nó.


	
![](https://cdn.ucode.vn/uploads/2247/upload/ADOcNBen.png)


Tương tự như trên, các bạn cũng có thể mường tượng ra cách hoạt động của các toán tử `--`, `+`, `-` đối với con trỏ. Còn `+=` và `-=` chỉ là cách viết ngắn gọn của phép gán `+` và `-` mà thôi.

Đoạn code dưới đây sẽ minh họa hết tác dụng của những toán tử tăng giảm còn lại:

```cpp=
#include <iostream>

using namespace std;

main()
{
    int value = 5;
    int* ptr = &value;

    cout << "Giá trị gốc: " << ptr << endl;

    --ptr;

    cout << "Giá trị sau khi giảm 1 đơn vị: " << ptr << endl;

    ptr = ptr - 5; // Có thể viết là ptr += 5.

    cout << "Giá trị sau khi tăng 5 đơn vị: " << ptr << endl;

    ptr = ptr - 10; // Có thể viết là ptr -= 10;

    cout << "Giá trị sau khi giảm 10 đơn vị: " << ptr;

    return 0;
}
```

Kết quả chạy chương trình:

```
Giá trị gốc: 0x104dfee8
Giá trị sau khi giảm 1 đơn vị: 0x104dfee4
Giá trị sau khi tăng 5 đơn vị: 0x104dfed0
Giá trị sau khi giảm 10 đơn vị: 0x104dfea8
```

Quy đổi các địa chỉ trên từ hệ thập lục phân sang hệ thập phân, các bạn sẽ thấy chênh lệch của chúng đúng bằng độ tăng giảm tương ứng.

Trong bài tiếp theo về con trỏ, chúng ta sẽ cùng đến với ứng dụng của con trỏ đối với một số trường hợp nâng cao hơn, chẳng hạn như con trỏ đối với mảng hay đối với hàm.

# III. Tài liệu tham khảo

- https://cpp.daynhauhoc.com/4/4-dia-chi-cua-bien/
- https://cpp.daynhauhoc.com/8/0-con-tro
- https://vietjack.com/cplusplus/con_tro_trong_cplusplus.jsp