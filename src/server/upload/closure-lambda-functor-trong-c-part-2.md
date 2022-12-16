Trong [part 1](https://viblo.asia/p/closure-lambda-functor-trong-c-part-1-jvElaqnDlkw), mọi người đã biết lambda function hay functor là gì rồi, và cũng biết là ta có thể pass lambda thay functor như là 1 argument vào 1 function khác.
Vậy làm thế nào để có thể khai báo 1 function mà nhận lambda hay functor như một parameter của function đó. 
# std::function
Trước hết ta thử khai báo function giống như cách ta làm với function pointer, vì ta biết là function pointer cũng có thể dùng để pass as argument vào một function khác.

```C++
#include <iostream>

void (*func_ptr)(int&);

void print_it(int& x) {
    std::cout << "Funtion pointer received: " << x << std::endl;
}

// This function takes 2 arguments: function pointer and a desired value to print
void acceptFunctionPointer(void (*f)(int&), int y) {
    f(y);
}

class Functor {
    public:
        void operator()(int& x) {
            std::cout << "Functor received: " << x << std::endl;
        }
};
int main() {
    int dummy = 10;
    int a = 100;
    
    // lambda with capture a dummy
    auto lambda1 = [dummy](int& x) {
        std::cout << "Lambda1 received: " << x << std::endl;
    };
    
    // lambda with capture nothing
    auto lambda2 = [](int& x) {
        std::cout << "Lambda2 received: " << x << std::endl;
    };
    
    // Pass function pointer
    func_ptr = &print_it;
    acceptFunctionPointer(func_ptr, a);
    
    // Pass Lambda1
    acceptFunctionPointer(lambda1, a);  //Compile error
    
    // Pass Lambda2
    acceptFunctionPointer(lambda2, a);   
    
    // Pass Functor
    Functor func;
    acceptFunctionPointer(func, a);   //Compile error

    return 0;
}
```
Run code ở trên ta sẽ gặp compile error ở 2 chỗ: *acceptFunctionPointer(lambda1, a)* và *acceptFunctionPointer(func, a)* , đều là không thể convert lambda1 hay func thành kiểu void (\*f)(int&)
Nếu comment out 2 dòng này sẽ được output:
```
Funtion pointer received: 100
Lambda2 received: 100
```
Như vậy ta thấy function acceptFunctionPointer chỉ accept function pointer hoặc lambda không capture gì hay còn gọi là captureless là valid argument. 
Để giải quyết điều này, C++11 đã introduce một template functor class gọi là \<function\> để ta có thể khai báo mọi type of function object, bao gồm luôn cả function pointer.

```C++
#include <iostream>
#include <functional>


void (*func_ptr)(int&);

void print_it(int& x) {
    std::cout << "Funtion pointer received: " << x << std::endl;
}

// This function takes 2 arguments: function pointer and a desired value to print
void acceptFunctionPointer(void (*f)(int&), int y) {
    f(y);
}

void acceptFunctionObject(std::function<void(int&)> f, int y) {
    f(y);
}

class Functor {
    public:
        void operator()(int& x) {
            std::cout << "Functor received: " << x << std::endl;
        }
};
int main() {
    int dummy = 10;
    int a = 100;
    
    auto lambda1 = [dummy](int& x) {
        std::cout << "Lambda1 received: " << x << std::endl;
    };
    
    auto lambda2 = [](int& x) {
        std::cout << "Lambda2 received: " << x << std::endl;
    };
    
    // Pass function pointer
    func_ptr = &print_it;
    acceptFunctionObject(func_ptr, a);
    
    // Pass Lambda1
    acceptFunctionObject(lambda1, a);
    
    // Pass Lambda2
    acceptFunctionObject(lambda2, a);
    
    // Pass Functor
    Functor func;
    acceptFunctionObject(func, a);   

    return 0;
}
```
Thay vì dùng function acceptFunctionPointer, ta khai báo thêm 1 function là acceptFunctionObject với argument là std::function\<void (int&)> f
```C++
void acceptFunctionObject(std::function<void (int&)> f, int y) {
    f(y);
}
```
Và output nhận được:
```
Funtion pointer received: 100
Lambda1 received: 100
Lambda2 received: 100
Functor received: 100
```
# std::bind
Đến đây hi vọng mọi người đã có thể hiểu về Closure hay Function object rồi. Ngoài ra, C++11 cũng introduce thêm 1 tool khác rất useful Khi làm việc với function object, đó là std::bind.

Giả sử ta dùng 1 library hay framework nào, trong đó có 1 function take 1 function object as its argument, vậy thì khi ta dùng function đó, đơn giản là ta cứ pass 1 function object vào là ok, tuy nhiên, có 1 vấn đề là số lượng arguments của function object đó expect khác với số lượng argument của function ta định passing vào. Solution khá đơn giản, rewrite lại function đó 😀 , tuy nhiên vẫn còn 1 cách khác đó là sử dụng std::bind
Simple example:
```C++
void acceptFunctionObject(std::function<void (int&)> f, int y) {
    f(y);
}

int main() {
    
    auto lambda3 = [](int& x, int& y) {
        std::cout << "Subtract x to y : " << x-y << std::endl;
    };
    using namespace std::placeholders;
    auto lambda_bind = std::bind(lambda3, _1, 5);
    
    //acceptFunctionObject(lambda3, 3);  Compile error
    acceptFunctionObject(lambda_bind, 3);

    return 0;
}
```
Mình dùng lại ví dụ lúc nãy, nhưng giờ tạo lambda function take 2 arguments. Rõ ràng là nếu pass lambda3 vào function acceptFunctionObject thì sẽ compile fail ngay thì nó chỉ accept function object có 1 argument. Nhưng bằng cách sử std::bind, ta set luôn argument thứ 2 (là y) là 5, và chỉ còn 1 argument (là x) cần phải passing từ ngoài vào, ta gọi là placeholder. Khi acceptFunctionObject take binding function này, nó sẽ passing value 3 vào placeholder này, kết quả ta được là x - y = 3 - 5 = -2
```
Subtract x to y : -2
```
Vị trí placeholder này xác định bằng \_1 hoặc \_2 ... những vị trí này được define trong std::placeholders nên ta có thể dùng std::placeholders::\_1 hoặc \_1 thôi nếu đã khai báo using trước đó.
Đây là ví dụ đơn giản nên không thấy nhiều ý nghĩa lắm. 

Mình sẽ dùng lại ví dụ  ở [part 1](https://viblo.asia/p/closure-lambda-functor-trong-c-part-1-jvElaqnDlkw) và sửa lại một chút:
```C++
class Compare {
    public:
        bool operator() (int first, int second, bool _ascending) {
            if(_ascending)
                return first < second; // ascending order
            else
                return first > second; // descending order
        }
};
```
Operator() sẽ take 3 arguments thay vì 2 trước. Làm thế nào ta có thể sử dụng nó như là một argument của function std::sort ? 
Mình sẽ để đây như một practice nhỏ cho mọi người. 😉 Happy coding!