## Giới thiệu
`Python` và `C++` hiện tại là hai ngôn ngữ đang rất phổ biến với sự linh hoạt và khả năng xử lý vấn đề đa dạng của chúng. Vì bản chất là một ngôn ngữ động nên hiệu năng của `Python` chắc chắn sẽ không tốt bằng các ngôn ngữ tĩnh. Với sự hỗ trợ của thư viện `boost`, ta có thể viết các thư viện động, mà `Python` có thể sử dụng như một module mà hiệu năng được cải thiện đáng kể.

### Cài đặt

#### MacOS
Ta cài đặt `boost` thông qua `homebrew`:
```
$ brew install boost
```
Nếu ta cài đặt `Python` thông qua `homebrew` thì `python-dev` cũng sẽ được cài đặt chung.

#### Ubuntu
Ta sử dụng `apt` để cài đặt `boost`:
```
$ sudo apt-get install libboost-all-dev
```

## Một Module đơn giản.

Để sử dụng, ta sẽ phải thêm vào `<boost/python.hpp>`, trong đó, `namespace` chính sẽ là `boost::python`:
```Cpp
// python.cpp
#include <iostream>
#include <boost/python.hpp>

namespace python = boost::python;

void hello() {
    std::cout << "Hello world!" << std::endl;
}

BOOST_PYTHON_MODULE(bpy) {
    python::def("hello", hello);
}
```
Ta sử dụng lệnh sau để dịch thành thư viện động:
```
$ g++ --std=c++17 -o bpy.so python.cpp -fPIC -shared `pkg-config --cflags --libs python3` -L/usr/local/lib -lboost_python37
```
Mở `Python shell` lên và thực hiện:
```Python
In [1]: from bpy import hello
In [2]: hello()
Hello world!
```

Ở đây `python::def("function_name", function_address)`, với argument thứ 2 là địa chỉ của hàm.

Các kiểu `double/float, int, std::string/const char*` sẽ tương thích với `float, int, str` trong `Python`:

```Cpp
#include <iostream>
#include <boost/python.hpp>

namespace python = boost::python;

void hello(std::string name) {
    std::cout << "Hello " << name << "!" << std::endl;
}

int add(int a, int b) {
    int c;
    c = a + b;
    return c;
}

double power(double x, unsigned int n) {
    if (n == 0) return 1;
    return x * power(x, n - 1);
}

BOOST_PYTHON_MODULE(bpy) {
    python::def("hello", hello);
    python::def("add", add);
    python::def("power", power);
}
```

## Class
#### Xây dựng một class

```Cpp
struct Person {
    Person(std::string firstname, std::string lastname): firstname(firstname), lastname(lastname) {}
    void sayHello() const {std::cout << "Hello! I'm " << this->firstname << " " << this->lastname << std::endl;}
    std::string firstname;
    std::string lastname;
};
```
Và trong `BOOST_PYTHON_MODULE`, ta khai báo `python::class_` để định nghĩa một `class` trong `Python`:
```Cpp
BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::class_<Person>("Person", python::init<std::string, std::string>())
    .def("sayHello", &Person::sayHello);
}
```
Ta thực hiện biên dịch và khởi động `Python shell`:
```Python
In [1]: from bpy import Person
In [2]: someone = Person("Some", "One")
In [3]: someone.sayHello()
Hello! I'm Some One
```
Ta có thể xây dựng thêm nhiều hàm `constructure`:
```Cpp
struct Person {
    Person() {}
    Person(std::string firstname, std::string lastname): firstname(firstname), lastname(lastname) {}
    void sayHello() const {std::cout << "Hello! I'm " << this->firstname << " " << this->lastname << std::endl;}
    void setFirstname(std::string firstname) {this->firstname = firstname;}
    void setLastname(std::string lastname) {this->lastname = lastname;}
    std::string firstname;
    std::string lastname;
};

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::class_<Person>("Person")
    .def(python::init<std::string, std::string>())
    .def("setFirstname", &Person::setFirstname)
    .def("setLastname", &Person::setLastname)
    .def("sayHello", &Person::sayHello);
}
```
#### Variables exposing
Với các biến `private`, ta không cần thiết phải thêm `_` ở trước mà chỉ cần không expose nó, đối với các biến `public`, ta có thể thiết lập `readonly` hay `readwrite`:
```Cpp
struct Pair {
    Pair(int value): first(), second(value) {}
    int first;
    int const second;
};

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::class_<Pair>("Pair", python::init<int>())
    .def_readwrite("first", &Pair::first)
    .def_readonly("second", &Pair::second);
}
```
#### Operator
Ta cũng có thể sử dụng các `operator` với một khai báo rất tường minh:
```Cpp
struct Pp {
    Pp(int value): value(value) {}
    int value;
};

struct Pair {
    Pair(int value): first(), second(value) {}
    int first;
    int const second;
    Pair operator+(int x) {
        Pair temp(this->second + x);
        temp.first = this->first + x;
        return temp;
    }
    Pair operator-(const Pair& x) {
        Pair temp(this->second - x.second);
        temp.first = this->first - x.first;
        return temp;
    }
    friend Pair operator+(int x, const Pair& self) {
        Pair temp(self.second + x);
        temp.first = self.first + x;
        return temp;
    }
    Pair operator+(const Pp& x) {
        Pair temp(this->second);
        temp.first = this->first + x.value;
        return temp;
    }
};

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::class_<Pp>("Pp", python::init<int>())
    .def_readwrite("value", &Pp::value);
    
    python::class_<Pair>("Pair", python::init<int>())
    .def(python::self + int())
    .def(int() + python::self)
    .def(python::self - python::self)
    .def(python::self - Pp(int()))
    .def_readwrite("first", &Pair::first)
    .def_readonly("second", &Pair::second);
}
```

## Function Overloading
Để overloading một hàm, ta phải tạo ta các con trỏ hàm với kiểu tương ứng:
```Cpp
double sum(double a, double b) {
    return a + b;
}
double sum(double a, double b, double c) {
    return a + b + c;
}

double (*sum1)(double, double) = sum;
double (*sum2)(double, double, double) = sum;

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::def("sum", sum1);
    python::def("sum", sum2)
}
```
Cách này có một khuyết điểm là nếu ta gặp `default arguments` thì sẽ để mất dấu `default arguments` ngay khi tạo con trỏ hàm. Để xử lý vấn đề này, ta sẽ wrap vào trong một hàm khác, và vấn đề này được giải quyết:
```Cpp
double sum(double a, double b = 0) {
    return a + b;
}
double sum(double a, double b, double c) {
    return a + b + c;
}

double sum1(double a, double b = 0) {
    return sum(a, b);
}
double sum2(double a, double b, double c) {
    return sum(a, b, c);
}

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::def("sum", sum1);
    python::def("sum", sum2)
}
```
Trong tài liệu viết thế, nhưng mình không hiểu tại sao không viết kiểu này cho dễ thở:
```Cpp
double sum1(double a, double b = 0) {
    return a + b;
}
double sum2(double a, double b, double c) {
    return a + b + c;
}

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::def("sum", sum1);
    python::def("sum", sum2)
}
```
Đối với `default arguments` của một constructure, ta dùng `python::optional`:
```Cpp
struct A {
    A(int x, double y = 8.5, std::string str = "Hello world") {...}
    ...
};

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::class_<A>("A", python::init<int, python::optional<double, std::string>>());
}
```
`boost` cho ta một cách đơn giản hơn để sử lý các `default arguments` một hàm đó là dùng `BOOST_PYTHON_FUNCTION_OVERLOADS`, macro này sẽ tự tạo một wraper cho ta:
```Cpp
bool foo(int a, char b = 'b', double c = 0.5) {
    ...
}

BOOST_PYTHON_FUNCTION_OVERLOADS(foo_overload, foo, 1, 3)

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::def("foo", foo, foo_overload());
}
```
Hoặc sử dụng như sau để `overloading` các hàm có kiểu trả về tương thích:
```Cpp
int foo();
int foo(int);
int foo(int, char);
int foo(int, char, std::string);

BOOST_PYTHON_FUNCTION_OVERLOADS(foo_overload, foo, 0, 3)

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::def("foo", (void(*)(int, char, std::string))0, foo_overload());
}
```

Đối với một phương thức ở một class, ta sẽ sử dụng macro `BOOST_PYTHON_MEMBER_FUNCTION_OVERLOADS`:
```Cpp
struct X {
    void func(int a, char b = 'D', std::string c = "constructor", double d = 0.0) {
        ...
    }
};

BOOST_PYTHON_MEMBER_FUNCTION_OVERLOADS(X_overloads, func, 1, 4)

BOOST_PYTHON_MODULE(bpy) {
    namespace python = boost::python;
    python::class_<X>("X")
    .def("func", &X::func, X_overloads());
}
```

## Python Object
Trong `boost::python` có các lớp biểu diễn các đối tượng trong `Python` để có thể nhận và trả về các kiểu dữ liệu đặc thù của `Python`:
```Cpp
python::list
python::dict
python::tuple
python::str
python::long_
python::enum
```
Trong `boost::python` cũng chứa các hàm cơ bản trong `Python`. Để truy cập một thuộc tính trong một `python::object`, ta sử dụng `.attr("method_name")`

Để chuyển kiểu dữ liệu từ `Python` sang `C++`, ta sử dụng `boost::python::extract<type>(object)`:
```
python::list x;
double first = python::extract<double>(x[0]);
int length = python::extract<int>(python::len(x));
```
Lưu ý đoạn mã sau sẽ không làm thay đổi `x.__dict__`:
```Cpp
dict d(x.attr("__dict__"));
d["whatever"] = 3;
```
Tuy nhiên khi dùng `python::extract` thì giá trị của `x.__dict__` sẽ thay đổi:
```Cpp
dict d = python::extract<dict>(x.attr("__dict__"));
d["whatever"] = 3;
```

## Kết
Những gì mình viết trên đây là những gì cơ bản nhất của `boost::python`. Chúng ta giờ đây đã có thể tạo ra các `module` `Python` đơn giản để sử dụng. Ngoài ra ta còn có một thư viện `boost::numpy` để có thể kết nối `C++` với `numpy`. Tài liệu chính thức đầy đủ hơn [tại đây](https://www.boost.org/doc/libs/1_69_0/libs/python/doc/html/tutorial/index.html)! Cảm ơn các bạn đã theo dõi bài viết!