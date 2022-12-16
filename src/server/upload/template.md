## 1. Định nghĩa:
Template: là một khuôn mẫu, đại diện cho nhiều kiểu dữ liệu khác nhau
Có 2 loại 2 template:  
- Function template
- Class template

## 2. Function template
Function template là 1 function đặc biệt, có thể sử dụng được cho nhiều hơn 1 kiểu tham số truyền vào (khác với override function cần phải định nghĩa nhiều hàm với các kịch bản param được cố định. Function template chỉ cần định nghĩa 1 lần).

Trong C++, chúng ta có thể hoàn toàn sử dụng template parameters, để viết các hàm cần sử dụng cho nhiều kiểu tham số truyền vào.

    Format của function template với type parameters:

```php
    template <class identifier> function_declaration;
    template <typename identifier> function_declaration;
```

Sự khác biệt duy nhất giữa hai kiểu khai là việc sử dụng lớp từ khóa hoặc tên kiểu từ khóa. Công dụng của sự khác nhau này là không rõ ràng, vì cả hai biểu thức đều có cùng một nghĩa và xử lý giống hệt nhau.

vd:

```csharp
template <class T>
T getMax (T x, T y) {
    return x > y ? x : y;
}
```

Ở đây một hàm đã được tạo ra với T làm parameters template của nó. Parameters template này đại diện cho một loại chưa được chỉ định, nhưng có thể được sử dụng trong function template như thể đó là một kiểu tham số thông thường (kiểu tham số thông thường như int, double, ...). Như chúng ta có thể thấy, hàm GetMax trả về giá trị lớn hơn của hai tham số của loại vẫn chưa được xác định này.

Sử dụng function template, theo dõi việc gọi và sử dụng nó:

```html
int x = 5, y = 8;
getMax <int> (5,8);
```

Theo dõi ví dụ:

```cpp
// function template
#include <iostream>
using namespace std;

template <class T>
T GetMax (T a, T b) {
T result;
result = (a>b)? a : b;
return (result);
}

int main () {
int i=5, j=6, k;
long l=10, m=5, n;
k=GetMax<int>(i,j);
n=GetMax<long>(l,m);
cout << k << endl;
cout << n << endl;
return 0;
}
```

Trong ví dụ này, trước khi chúng ta sử dụng function template getMax(), ở lần gọi đầu tiên sử dụng với kiểu int và lần gọi thứ 2 sử dụng với tham số kiểu long. Mỗi lần gọi đều xác định kiểu tham số trong dấu <> (<int>, <long>).

Tuy nhiên, trên thực tế thì khi thực hiện compiler, trình compiler có thể tự động xác định kiểu dữ liệu truyền vào mà không cần người gọi phải xác định trước (bằng cách để trong dấu <>).

```cpp
    int x = 5, y = 8;
    getMax (5,8);

    Theo dõi ví dụ:
    // function template II
    #include <iostream>
    using namespace std;

    template <class T>
    T GetMax (T a, T b) {
    return (a>b?a:b);
    }

    int main () {
    int i=5, j=6, k;
    long l=10, m=5, n;
    k=GetMax(i,j);
    n=GetMax(l,m);
    cout << k << endl;
    cout << n << endl;
    return 0;
    }
```

   Trong trường hợp trên, chúng ta có thể gọi function template getMax() mà không cần xác định kiểu tham số của nó trong dấu <>, trình biên dịch có thể dự động làm việc này.

   Trường hợp chúng ta muốn sử dụng nhiều parameters template khác nhau.

```c
    template <class T, class U>
    T GetMin (T a, U b) {
        return (a<b?a:b);   
    }

    int i,j;
    long l;
    i = GetMin<int,long> (j,l);
```
## 3. Class template

   Giả sử cần xây dựng một class mà trong đó các hàm, member có thể thực hiện với bất kì kiểu dữ liệu nào? Khi đó cần xây một kiểu class template.

   Class template là một mẫu class, mà trong đó các teamplate được định nghĩa để đại diện cho các member, các member template đại diện cho nhiều kiểu dữ liệu khác nhau.

   Cú pháp:

```java
    template <class T>
    class class_name {
        T value;
        ...
    };
```

   Use class template:

```cpp
    name_class<type 0f class template> aaa;

    // template specialization
    #include <iostream>
    using namespace std;

    // class template:
    template <class T>
    class mycontainer {
        T element;
    public:
        mycontainer (T arg) {element=arg;}
        T increase () {return ++element;}
    };

    // class template specialization:
    template <>
    class mycontainer <char> {
        char element;
    public:
        mycontainer (char arg) {element=arg;}
        char uppercase ()
        {
        if ((element>='a')&&(element<='z'))
        element+='A'-'a';
        return element;
        }
    };

    int main () {
    mycontainer<int> myint (7);
    mycontainer<char> mychar ('j');
    cout << myint.increase() << endl;
    cout << mychar.uppercase() << endl;
    return 0;
    }
```

   Chú ý: mycontainer<int> myint (7); đối với class template cần xác định rõ kiểu dữ liệu của class trong đấu <>.

## 4. Non-type parameters for template
   Bên cạnh những teamplate được sử dụng để dại diện cho những kiểu khác nhau, thì chúng ta cũng có thể định nghĩa teamplate là một kiểu thông thường. Theo dõi ví dụ sau:

```cpp
    // sequence template
    #include <iostream>
    using namespace std;

    template <class T, int N>
    class mysequence {
        T memblock [N];
    public:
        void setmember (int x, T value);
        T getmember (int x);
    };

    template <class T, int N>
    void mysequence<T,N>::setmember (int x, T value) {
    memblock[x]=value;
    }

    template <class T, int N>
    T mysequence<T,N>::getmember (int x) {
    return memblock[x];
    }

    int main () {
    mysequence <int,5> myints;
    mysequence <double,5> myfloats;
    myints.setmember (0,100);
    myfloats.setmember (3,3.1416);
    cout << myints.getmember(0) << '\n';
    cout << myfloats.getmember(3) << '\n';
    return 0;
    }
```
##### P/s: mọi thắc mắc hay góp ý, xin vui lòng để phía dưới comment, để mình có thê giải đáp cũng như những bài viết sau được chất lượng hơn, mình xin chân thành cảm ơn!