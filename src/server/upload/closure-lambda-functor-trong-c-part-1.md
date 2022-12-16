# Giới thiệu
Trong bài post trước về [polymorphism using C++ template](https://viblo.asia/p/polymorphism-with-c-template-Ljy5VDOVZra), một chút cho ai chưa đọc thì đây là một cách tiếp cận mới hơn, giúp code giảm overhead in runtime, hay nói đơn giản là giúp chương trình chạy nhanh hơn (tất nhiên không phải đúng mới mọi trường hợp) khi mà ta loại bỏ overhead dynamic dispatch và dynamic allocation in runtime, thay vào đó những overhead này sẽ được giải quyết vào compile time bởi compiler. Đây cũng chính là ý tưởng của meta template programming: "programming at compile-time".


Trong bài post đó mình có sử dụng lambda function, hôm nay mình sẽ đi sâu hơn một chút về vấn đề này và một số ứng dụng của nó.

# Khái niệm
Trước khi nói về lambda thì mình sẽ nói về 1 khái niệm general hơn, đó là **Closure**. Có thể nhiều bạn sẽ thấy khái niệm này rất là quen thuộc trong các ngôn ngữ "high-level" hơn C++ như là Javascript hay Python, thực ra đây là 1 khái niệm chung trong programming language hơn là riêng biệt cho 1 vài ngôn ngữ. Nếu mình wiki sẽ thấy nó được định nghĩa như sau:


"In programming languages, a closure, also lexical closure or function closure, is a *technique for implementing* lexically scoped *name binding* in a language with *first-class functions*". 

Và định nghĩa của first-class function là:
"It is said to have first-class functions if it *treats functions as first-class citizens*. This means the language supports *passing functions as arguments* to other functions, *returning them as the values* from other functions, and *assigning them to variables* or *storing them in data structures*",

hiểu nôm na là ta sẽ coi first-class functions như là 1 class object (hiểu nôm na nghĩa là không hoàn toàn chính xác)

Nếu ai đã từng làm với C hoặc C++ thì sẽ thấy việc passing function as argument hay return them from a function hay kể cả assign them to variable hoàn toàn có thể làm được bằng function pointer, tuy nhiên Closures mang lại nhiều hơn thế. Function pointer thì suy cho cùng nó cũng chỉ là address của 1 function, chúng ta không thể create function at runtime hay make a copy hoặc save a state itself (ta có thể hiểu state như là những data bên trong function có thể store lại được mà không bị reset hay mất đi, có thể hiểu giống như những function thông thường mà sử dụng static variables).
First-class functions còn được gọi là Closure hay Function object, 2 khái niệm này có thể được hiểu 1 cách tương đương qua lại với cùng 1 ý nghĩa, mặc dù nó không hoàn toàn giống nhau, Closure đúng hơn là type of function object, giống như khai báo Class là type của class object.


Đã là function thì tất nhiên nó là callable rồi, ví dụ ta define function do_it, thì ta gọi thực thi bằng cách gọi do_it(). Vậy ngoài function thì class có thể là callable không? Câu trả lời là hoàn toàn được, bằng cách ta overloading operator() (khá giống với khởi tạo class, đó là 1 trong những lý do mordern C++ sẽ recommend mình khởi tạo bằng {} thay vì ()), những class overload operator() còn được gọi là Functor. Trong C++, ta có thể tạo Closure bằng 3 cách: Functor, lambda và std::function.


# Functor

```C++
class MySquareFunctor {
    public:
        MySquareFunctor(int data) : _data{data} {}
        int operator()() {
            return _data*_data;
        }
    private:
        int _data;
};

int main(){
    MySquareFunctor functor_5{5}, functor_10{10};
    std::cout << "Square of 5 is " << functor_5() << std::endl;
    std::cout << "Square of 10 is " << functor_10() << std::endl;
 
    return 0;
}
```
Ta thấy 2 instances của Functor class MySquareFunctor có thể được gọi như là những function object. Giờ ta sẽ dùng những function object này để pass như là argument vào 1 function khác.
```C++
#include <iostream>
#include <vector>
#include <algorithm>

class Compare {
    public:
        Compare(bool ascending) : _ascending{ascending} {}
        bool operator() (int first, int second) {
            if(_ascending)
                return first < second; // ascending order
            else
                return first > second; // descending order
        }
        
    private:
        bool _ascending{true};
};

class Display {
    public:
        // Operator take 1 argument to print
        void operator()(int something) {
            std::cout << something << " ";
        }
};

int main(){
    std::vector<int> data_list {1,5,6,3,2,7,8,9,4};
    
    Display visualizer;
    std::cout << "Initial list:" << std::endl;
    std::for_each(data_list.begin(), data_list.end(), visualizer); // we passed visualizer function object 
                                                    // as argument of function for_each
    std::cout << std::endl;
    
    std::cout << "Sorted ascending:" << std::endl;
    bool Ascending{true};
    Compare ascen{Ascending};
    std::sort(data_list.begin(), data_list.end(), ascen); // we pass ascen function object to sort function
    std::for_each(data_list.begin(), data_list.end(), visualizer); // we passed visualizer function object
    std::cout << std::endl;
    
    std::cout << "Sorted descending:" << std::endl;
    Ascending = false;
    Compare desc{Ascending};
    std::sort(data_list.begin(), data_list.end(), desc); // we pass desc function object to sort function
    std::for_each(data_list.begin(), data_list.end(), visualizer); // we passed visualizer function object
    std::cout << std::endl;
    
    return 0;
}
```

Output:
```
Initial list:
1 5 6 3 2 7 8 9 4 
Sorted ascending:
1 2 3 4 5 6 7 8 9 
Sorted descending:
9 8 7 6 5 4 3 2 1 
```

Ngoài ra, function object còn có thể copy/assign to another variable hoặc return from a function.


# Lambda function

Ở trên ta thấy ta có thể đặt tên (naming or name binding) cho một Function object or Closure  như variable ascen hay desc với type Compare, nhưng đôi khi chúng ta chỉ cần 1 closure tương đối nhỏ và define ngay tại nơi ta dùng, đó là lúc chúng ta dùng lambda function. Lambda function được introduce từ C++11. Một điểm cộng nữa cho lambda function đó là ta có thể capture những variables trong context hiện tại để sử dụng bên trong lambda function, bằng cách dùng square bracket \[\].

Rewrite ví dụ lúc nãy bằng cách dùng lambda:
```C++
#include <iostream>
#include <vector>
#include <algorithm>

int main(){
    std::vector<int> data_list {1,5,6,3,2,7,8,9,4};
    
    //Display visualizer;
    // Instead of create functor object, we defined a lambda function and assigned to visualizer variable
    // Type of visualizer will be resolved by compiler, we dont need to care about it
    // This lambda function captured nothing from current context
    // The caller of this function object need to pass value for data argument when call it
    auto visualizer = [](int data) {
        std::cout << data << " ";  
    };
    std::cout << "Initial list:" << std::endl;
    std::for_each(data_list.begin(), data_list.end(), visualizer); // we passed visualizer function object 
                                                    // as argument of function for_each
    std::cout << std::endl;
    
    //=============================================
    //Compare ascen{Ascending};
    // We created a lambda function which captured Ascending variable
    // The caller of this function object will pass values for first argument and second argument
    // when call the function object
    bool Ascending{true};
    auto comparator = [&Ascending](int first, int second){
        if (Ascending)
            return first < second;
        else
            return first > second;
    };
    std::cout << "Sorted ascending:" << std::endl;
    std::sort(data_list.begin(), data_list.end(), comparator); // we pass ascen function object to sort function
    std::for_each(data_list.begin(), data_list.end(), visualizer); // we passed visualizer function object
    std::cout << std::endl;
    
    //======================================
    Ascending = false;
    //Compare desc{Ascending};
    std::cout << "Sorted descending:" << std::endl;
    std::sort(data_list.begin(), data_list.end(), comparator); // we pass desc function object to sort function
    std::for_each(data_list.begin(), data_list.end(), visualizer); // we passed visualizer function object
    std::cout << std::endl;
    
    return 0;
}
```
Output sẽ giống với code sử dụng Functor.

Ta tạm kết thúc part 1 ở đây, ở part 2, ta sẽ tiếp tục với std::function và làm sao để define 1 function mà take or receive function object như là một argument. Ở part 1, ta dùng 2 stl functions là std::for_each và std::sort để take function objects.