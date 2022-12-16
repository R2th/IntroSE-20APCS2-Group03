# Polymorphism trong C++
## Định nghĩa: 
Từ đa hình có nghĩa là có nhiều dạng. Nói một cách đơn giản thì có thể định nghĩa đa hình là khả năng của một thông điệp được hiển thị dưới nhiều dạng.
Ví dụ như một người cùng một lúc có thể có đặc tính khác nhau. Giống như một người đàn ông đồng thời là một người cha, một người chồng, một nhân viên. Vì vậy, cùng một người sở hữu hành vi khác nhau trong các tình huống khác nhau. Điều này được gọi là đa hình.

## Đa hình trong c++
Trong đa hình C ++ được chia thành hai loại:
- Compile time Polymorphism
- Runtime Polymorphism

![](https://images.viblo.asia/afbaf8d3-4874-4c3d-8c36-ab95ab99878e.png)

### Compile time Polymorphism
Loại đa hình này đạt được bằng cách nạp chồng hàm hoặc quá tải toán tử.

Function overloading: Là hàm các hàm có cùng tên nhưng khác nhau về chức năng và tham số truyền vào. Các hàm được phân biệt thông qua các tham số truyền vào.
```
using namespace std; 
class Geeks 
{ 
    public: 
      
    // function with 1 int parameter 
    void func(int x) 
    { 
        cout << "value of x is " << x << endl; 
    } 
      
    // function with same name but 1 double parameter 
    void func(double x) 
    { 
        cout << "value of x is " << x << endl; 
    } 
      
    // function with same name and 2 int parameters 
    void func(int x, int y) 
    { 
        cout << "value of x and y is " << x << ", " << y << endl; 
    } 
}; 
  
int main() { 
      
    Geeks obj1; 
      
    // Which function is called will depend on the parameters passed 
    // The first 'func' is called  
    obj1.func(7); 
      
    // The second 'func' is called 
    obj1.func(9.132); 
      
    // The third 'func' is called 
    obj1.func(85,64); 
    return 0; 
}  
```

```
Output:

value of x is 7
value of x is 9.132
value of x and y is 85, 64
```

Trong ví dụ trên, một hàm duy nhất có tên func nhưng khi truyền các tham số khác nhau sẽ được kết quả khác nhau, đây là thuộc tính của đa hình.

Operator overloading: C ++ cũng cung cấp tùy chọn cho các toán tử. Các toán tử có thể được định nghĩa lại trong các đối tượng.
Ví dụ: chúng ta có thể tạo toán tử "+" cho lớp chuỗi để nối hai chuỗi.
```
#include<iostream> 
using namespace std; 
   
class Complex { 
private: 
    int real, imag; 
public: 
    Complex(int r = 0, int i =0)  {real = r;   imag = i;} 
       
    // This is automatically called when '+' is used with 
    // between two Complex objects 
    Complex operator + (Complex const &obj) { 
         Complex res; 
         res.real = real + obj.real; 
         res.imag = imag + obj.imag; 
         return res; 
    } 
    void print() { cout << real << " + i" << imag << endl; } 
}; 
   
int main() 
{ 
    Complex c1(10, 5), c2(2, 4); 
    Complex c3 = c1 + c2; // An example call to "operator+" 
    c3.print(); 
} 
```

```
Output:

12 + i9
```

Trong ví dụ trên, toán tử ‘+, được định nghĩa lại để cộng 2 đối tượng.

### Runtime polymorphism
Overload xảy ra khi một lớp dẫn xuất có định nghĩa laij cho một trong các hàm thành viên của lớp cơ sở. Chức năng này được gọi là ghi đè.
```
#include <bits/stdc++.h> 
using namespace std; 
  
class base 
{ 
public: 
    virtual void print () 
    { cout<< "print base class" <<endl; } 
   
    void show () 
    { cout<< "show base class" <<endl; } 
}; 
   
class derived:public base 
{ 
public: 
    void print (){
        cout<< "print derived class" <<endl;
    } 
   
    void show (){
        cout<< "show derived class" <<endl;
    } 
}; 
  
int main()  
{ 
    base *bptr; 
    derived d; 
    bptr = &d; 
       
    bptr->print();  
    bptr->show();  
  
    return 0; 
}  
```

```
Output:

print derived class
show base class
```