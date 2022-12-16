Đây là lần đầu tiên mình viết 1 bài public nên nhiều khi sắp xếp nội dung có thể không hợp lý lắm, mọi người cứ góp ý :)
Thực ra cũng lâu rồi không đụng đến C++ nhưng gần đây có việc nên mình có coi lại C++ 17 và thấy có vài điểm thấy hay muốn chia sẻ với mọi người. 

# Recall
Nói đến polymorphism hay đa hình thì chắc hẳn hầu hết mọi người đã quen thuộc rồi, một trong những ứng dụng dễ thấy của nó là giúp source code của mình tuân thủ theo 1 trong 5 nguyên tắc cơ bản của SOLI**D** , đó là D or Dependency Inversion Principle (DI). Nghĩa là hạn chế sự phụ thuộc hay ràng buộc (decoupling) giữa high-level module và low-level module 1 cách trực tiếp, thay vào đó tất cả nên phụ thuộc vào lớp abstraction.
Ví dụ như code dưới đây:
```C++
class Backend {
    public:
        void devBackend();
};

class Frontend {
    public:
        void devFrontend();
};

class Application {
    public:
        void deliver() {
            _frontend.devFrontend();
            _backend.devBackend();
        }
    private:
        Frontend _frontend;
        Backend _backend;
};
```
Như code bên trên thì high level module là Application phụ thuộc trực tiếp vào lower level modules, đó là Frontend và Backend, nếu mình viết test cho Application thì mình phải tạo mocks cho cả backend và frontend, ngoài ra thì compile cũng sẽ tốn thêm 1 chút khi mà change low level code sẽ làm high level code cũng phải re-compile. Giờ mình sẽ apply polymorphism để tuân theo DI:
```C++
class Service {
    public:
        virtual ~Service() = default;
        virtual void develop() = 0;
};
class Backend : public Service {
    public:
        void develop() override {
            devBackend();
        }
    private:
        void devBackend();
};

class Frontend : public Service {
    public:
        void develop() override {
            devFrontend();
        }
    private:
        void devFrontend();
};

class Application {
    using Services = std::vector<std::unique_ptr<Service>> ;
    
    public:
        explicit Application(Services services) : _services{std::move(services)} {}
        void deliver() {
            for (auto& svc : _services) {
                svc->develop();
            }
        }
    private:
        Services _services;

};
```
Như vậy là mình đã decouple Application và implementation của concrete classes (Backend và Frontend), và thay vào là cả 3 classes (gồm low level và high level ) chỉ depend trên interface Service, Unit test sẽ dễ hơn khi mà mình chỉ cần pass mock vào contructor của Application. 

Thủ thuật passing những dependencies vào constructor hay setter thì còn gọi là dependency injection.


Đến dây thì có lẽ chúng ta đã rõ polymorphism là gì rồi, cách làm này là cách phổ biến mọi người thường thấy, nhưng có 1 cái cost ở đây đó là việc xác định service là Backend hay Frontend sẽ thông qua 1 cái virtual method tables or vtables (dynamic dispatch) at run time và sẽ phải allocate memory cho implemetation tương ứng. Đây có thể coi là 1 drawback của cách implementation này.


Có 1 cách làm khác giúp mình vẫn tuân thủ DI mà không cần tạo vtables, đó chính là sử dụng template, cách làm này không phải đến C++17 mới có mà đúng hơn C++17 có introduce thêm 1 số utilites giúp chúng ta implement một cách khá trực quan, đó là std::variant và std::visit.


# Polymorphism using template
Hiểu đơn giản std::variant là một class có thể hold any types dưới dạng template, mọi người có thể liên tưởng nó như union nhưng dạng type safe, như vậy nếu mình khai báo 1 vector các variant thì có nghĩa vector đó có thể có chứa các object thuộc các type khác nhau, tưởng tượng giống 1 list mà vừa có integer, string or other user-defined type ... Khá là giống Python 🙂


std::visit thì sẽ giúp mình apply 1 cái Callable object (hoặc với ai chưa quen thì hiểu nôm na như apply 1 function, nôm na nghĩa là không thực sự chính xác nha) tới từng item trong vector of variant ở trên. Ở đây mình đã diễn giải theo 1 cách hiểu đơn giản, nếu bạn nào đọc trên cppreference thì sẽ định nghĩa chính xác hơn. Còn Callable object hay Function object hay Functor hay Closure hay Lambda là những khái niệm liên quan và tương tự nhau, có lẽ 1 bài post riêng thì sẽ tốt hơn 🙂 Trong python cũng có khái niệm Callable object và có vài điểm tương tự ở đây.


OK, giờ sẽ viết lại polymorphism mà không dùng tới Abstract, nghĩa là sẽ không cần phải tạo vtables.
```C++
class Backend {
    public:
        void develop() {
            devBackend();
        }
    private:
        void devBackend(){
                std::cout << "Call me backend!" << std::endl;
        }
};

class Frontend {
    public:
        void develop() {
            devFrontend();
        }
    private:
        void devFrontend(){
                std::cout << "Call me frontend!" << std::endl;
        }
};
```
Về Application class, mình sẽ define nó là dạng template, và whatever type input đưa vào là gì, compiler sẽ giúp mình xác định type đó (type deduction mechanism), mình chỉ cần implement phần thực thi trên typename mà mình dùng cho template parameters. Type của mỗi loại service ở trên (Backend, Frontend) sẽ được dùng làm input, ở đây Application cần support nhiều type khác nhau và mình cũng không thể biết trước được số lượng (giống như cách implement dùng abstraction, có thể có 1 concrete implementation nhưng cũng có thể có nhiều concrete implementation), do đó ta sẽ dùng variadic template (cũng tương tự variadic arguments khi số lượng argument của function không xác định)


```C++
template<typename... Service>
class Application {
    using Services = std::vector<std::variant<Service...>> ;
    
    public:
        explicit Application(Services services) : _services{std::move(services)} {}
        void deliver() {
            for (auto& service : _services) {
                std::visit( [] (auto& svc){ svc.develop(); }, service );
            }
        }
    private:
        Services _services;

};
```
Như trên, ta thấy tất cả type input sẽ được store trong 1 vector of variant, khi contructor của Application được gọi, những service objects sẽ được store trong variable \_services, khi call function member deliver(), duyệt qua list này và apply lamdba function 
```C++
[] (auto& svc) { svc.develop(); } 
```
với input là từng service item.
Như ta thấy code của Application không thay đổi nhiều, thậm chí ta không cần phải khai báo abstract class.


Usage:
```C++
int main() {
    using MyApplication = Application<Backend, Frontend>;
    auto _backend = Backend {}; //Define Backend object
    auto _frontend = Frontend {}; //Define Frontend object
    auto application = MyApplication {{_backend, _frontend}}; //Define application object by passing list of services to constructor
    application.deliver();
}
```