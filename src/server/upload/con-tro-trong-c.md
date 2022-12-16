Hi anh em, hôm nay mình sẽ mang đến một chủ đề mà rất nhiều anh em sinh viên năm nhất, những anh em mới bắt đầu làm quen với ngôn ngữ lập trình thường xuyên đau đầu đó chính là Con trỏ trong ngôn ngữ C++. Bài viết này sẽ không có những giải thuật quá cao siêu mà chỉ tập trung vào định nghĩa cơ bản để mọi người hiểu được bản chất của con trỏ trong ngôn ngữ lập trình C++.
# 1.Toán tử địa chỉ (&) và toán tử trỏ đến (*) 
Để làm quen với con trỏ trước hết chúng ta sẽ tìm hiểu 2 toán tử **(*)** và **(&)**.
## 1.1.Toán tử địa chỉ 
Khi ta khai báo 1 biến, biến đó sẽ nằm tại một vị trí nào đó trên máy tính, vị trí đó gọi là địa chỉ của biến. Toán tử này có tác dụng lấy địa chỉ của 1 biến.

**Input**
```C++
#include <iostream>
using namespace std;

int main() {
	int a = 5; 
	cout << &a;
	
   return 0;	
}
```

**Output**
![image.png](https://images.viblo.asia/631cc2ba-9b23-4e14-aeba-dafba9aadcc2.png)
## 1.2.Toán tử trỏ đến
Toán tử này trỏ đến một địa chỉ, cho phép ta truy cập **giá trị** tại địa chỉ đó.

**Input**
```C++
#include <iostream>
using namespace std;

int main() {
	int a = 5; 
    cout << *&a;
    
   return 0;	
}
```

**Output**

![image.png](https://images.viblo.asia/2093411c-45de-46d8-bb19-798cbd1730cf.png)

**Giải thích :**

Khi ta khai báo biến ```a ``` biến  ```a ``` sẽ nằm đâu đó trên máy tính tại vị trí có địa chỉ là  ```&a ```, địa chỉ này là duy nhất, trong ví dụ trên ```&a = 0x6ffe1c```. Sau đó ta trỏ vào địa chỉ đó ```*&a``` để truy cập giá trị tại địa chỉ ```&a``` mà giá trị này chính là 5.
# 2.Con trỏ 
## 2.1.Định nghĩa
Trong ngôn ngữ lập trình C++, con trỏ là một biến mà giá trị của nó là địa chỉ của một biến khác. Con trỏ chứa địa chỉ của biến nào thì trỏ đến biến đó.
![image.png](https://images.viblo.asia/18143e7b-a54a-42aa-92a8-cb0ac95c11f4.png)
## 2.2.Khai báo
Để khai báo 1 con trỏ chúng ta sử dụng dấu sao (*) trước tên biến, muốn dùng con trỏ để trỏ đến 1 biến kiểu int thì khai báo con trỏ kiểu int, muốn trỏ đến biến kiểu float thì khai báo con trỏ kiểu float...

```C++
int a = 5; //khai báo biến a kiểu int có giá trị là 5
int *p; //khai báo con trỏ kiểu int
```
Vậy bây giờ muốn dùng con trỏ ```p``` để trỏ đến ```a``` thì làm thế nào ? 

```C++
int a = 5; 
int *p; 
p = &a;
```

hoặc
```C++
int a = 5; 
int *p = &a; 
```


Theo định nghĩa thì giá trị của con trỏ là 1 địa chỉ, muốn con trỏ ```p``` trỏ đến ```a``` thì gán giá trị con trỏ ```p``` bằng địa chỉ của ```a``` là xong.
## 2.3.Phân biệt
Đến đây có lẽ anh em sẽ thắc mắc khi thì ```p = &a``` khi thì ```*p = &a```, oke mình sẽ giúp anh em phân biệt
* *p : giá trị tại địa chỉ mà con trỏ p đang giữ
*  p : giá trị của con trỏ p
*  &p : địa chỉ của con trỏ p

![image.png](https://images.viblo.asia/baaea575-1222-45e5-b8f4-54055ac669fc.png)

Vậy để con trỏ p trỏ đến a thì cách chính xác sẽ là
```C++
p = &a;
```
không được
```C++
*p = &a;
```
hay
```C++
&p = &a;
```
Còn ở ví dụ trên sở dĩ có thể ghi ```*p = &a``` là vì đó là 1 cách viết tắt để con trỏ ```p``` trỏ đến ```a``` ngay lúc khai báo ```p```

```C++
int *p = &a; 
```

**Input**
```C++
#include <iostream>
using namespace std;

int main() {
	
	int a = 5; 
	int *p; 
	p = &a;
	
	cout << "Dia chi cua a: " << &a << endl;
	cout << "Gia tri con tro p: " << p <<endl;
	
	cout << "Gia tri tai dia chi ma p tro den: " << *p << endl;
	cout << "Dia chi cua con tro p: " << &p;
	
   return 0;		
}
```

**Output**

![image.png](https://images.viblo.asia/49ae6602-06ea-45c9-8e98-c438316eeb74.png)
## 2.4.Ví dụ
Cùng đến 1 ví dụ để hiểu rõ hơn về con trỏ ae nhé

**Input**
```C++
#include <iostream>
using namespace std;

void thayDoiA(int a) {
    a = 10;
}

int main() {

    int a = 5; 

    thayDoiA(a);
    cout << a;

   return 0;		
}
```

Mình có biến ```a```, 1 hàm ```thayDoiA()``` để thay đổi giá trị của biến ```a```. Anh em đoán xem output của đoạn code trên là gì.

Câu trả lời là vẫn bằng 5. Tại sao vậy ? Anh em nên nhớ biến ```a``` ở hàm ```main()``` và biến ```a``` ở hàm ```thayDoiA()``` là 2 biến khác nhau hoàn toàn. Sở dĩ chúng trùng tên được là vì phạm vi của 2 biến đó không bị xung đột nhau. Điều đó có nghĩa là việc anh em thay đổi biến ```a``` trong hàm ```thayDoiA()``` sẽ chẳng ảnh hưởng gì biến ```a``` ngoài hàm ```main()``` cả. Cái mà anh em truyền vào cho hàm ```thayDoiA()``` chỉ là giá trị của biến ```a``` ngoài hàm ```main()```, là con số 5 mà thôi.

Vậy để có thể output ra 10 anh em cần làm gì ?

Ta có 2 cách để làm điều này
```C++
#include <iostream>
using namespace std;

void thayDoiA(int *a) {
    *a = 10;
}

int main() {

    int a = 5; 

    thayDoiA(&a);
    cout << a;

   return 0;		
}
```

Anh em hãy truyền vào hàm ```thayDoiA()``` địa chỉ của biến ```a```, sau đó trong hàm ```thayDoiA()``` ta khai báo 1 con trỏ ```a``` lưu giữ địa chỉ mà ta truyền vào. Lúc này ta có con trỏ ```a``` trỏ đến biến ```a```. Dùng toán tử trỏ lên con trỏ ```a``` ta sẽ truy cập được giá trị của biến ```a``` và thay đổi nó.

Cách 2 

```C++
#include <iostream>
using namespace std;

void thayDoiA(int *a) {
    *a = 10;
}

int main() {

    int a = 5; 
    int *p; 
    p = &a;

    thayDoiA(p);
    cout << a;

   return 0;		
```

Anh em có thể định nghĩa 1 con trỏ ```p``` trỏ đến biến ```a``` ngoài hàm ```main()``` và truyền giá trị của con trỏ vào hàm ```thayDoiA()```, thực ra cách này anh em vẫn sẽ truyền địa chỉ của biến ```a``` vào thôi. Đây là 1 cách dài dòng hơn của cách đầu tiên :) nhưng mình viết ra để anh em có thể hiểu rõ hơn về con trỏ.

Thực ra vẫn con 1 cách đơn giản hơn để giải quyết bài toán này nhưng mình sẽ không đề cập trong bài viết này anh em nhé.
# Tổng kết
Vậy là mình đã trình bày sơ lược để anh em có thể hiểu được định nghĩa của con trỏ trong C++. Sau khi đã hiểu anh em có thể tận dụng được sức mạnh của con trỏ để giải quyết nhiều bài toán. Chúc anh em học tốt!!!