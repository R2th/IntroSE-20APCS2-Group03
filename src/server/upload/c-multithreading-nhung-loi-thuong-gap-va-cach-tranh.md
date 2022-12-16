#  Nội dung
   Sử dụng multi threading trở nên quá phổ biến trong chương trình hiện nay, đặc biệt trong xây dựng app. Bài này sẽ liệt kê 1 số lỗi mà mình thấy là phổ biến trong việc sử dụng multithreading, về quản lý data sử dụng mutex.
   
### 1. Quên mở khóa khi kết thúc section
  - Đây là lỗi cơ bản khi sở dụng mutex trong multi thread. Việc quên mở khóa sẽ dẫn đến chương trình bị treo.
```
void CallHome(string message)
{
  mu.lock();
  cout << "Thread " << this_thread::get_id() << " says " << message << endl;
  //mu.unlock();  Mutex không được mở khóa
}
```
Tuy nhiên, lỗi này khá dễ khắc phục bằng cách dùng `std::lock_guard`. Khi 1 biến `std::lock_guard` out of scope, biến này sẽ bị hủy đồng nghĩa với việc mutex sẽ được mở khóa.
```
void CallHome(string message)
{
  std::lock_guard<std::mutex> lock(mu);  
  cout << "Thread " << this_thread::get_id() << " says " << message << endl;
}// mutex được mở khóa khi thoát hàm
```

### 2. Không khóa mutex theo "hướng" nhất định
 Cũng là 1 lỗi mang khá cơ bản. Lỗi này gây ra hiện tượng DEADLOCK.
```
std::mutex mutexA;
std::mutex mutexB;
void CallHome_AB(string message)
{
  mutexA.lock();
  std::this_thread::sleep_for(std::chrono::milliseconds(100));
  mutexB.lock();
  cout << "Thread " << this_thread::get_id() << " says " << message << endl;
  mutexB.unlock();
  mutexA.unlock();
}
void CallHome_BA(string message)
{
  mutexB.lock();
  std::this_thread::sleep_for(std::chrono::milliseconds(100));
  mutexA.lock();
  cout << "Thread " << this_thread::get_id() << " says " << message << endl;
  mutexA.unlock();
  mutexB.unlock();
}
int main()
{
  thread t1(CallHome_AB, "Hello from CallHome_AB");
  thread t2(CallHome_BA, "Hello from CallHome_BA");
  t1.join();
  t2.join();
  return 0;
}
```
Trong ví dụ trên, thead A khóa mutex A và đợi mutex B mở khóa để tiếp tục. Trong khi thread B cũng làm điều tương tự. 2 thread này sẽ chờ nhau để làm việc, dẫn đến không thread nào tiếp tục chạy cả -> treo 2.<br>
Làm thế nào để tránh DEADLOCK:<br>
    1. Lock in order: kiểm soát được viêc lock, unlock mutex được khóa/mở khi nào. Khóa cùng lúc chẳng hạn: `std::scoped_lock lock{muA, muB};`<br>
    2. Sử dụng `std::timed_mutex` ,`try_lock_for`, `try_lock_until`. Mutex sẽ được mở khóa khi time out.[ std::timed_mutex](https://en.cppreference.com/w/cpp/thread/timed_mutex)
###  3. Khóa mutex 2(n) lần
 Thông thường, trong 1 hàm, lỗi này thường rất dễ nhìn ra và không hay gặp. Tuy nhiên, xét ví dụ sau:
 ```
std::mutex mu;
static int counter = 0;
void start()
{
  try
  {
    // do something here
  }
  catch (...)
  {
    std::lock_guard<std::mutex> lock(mu); // mutex mu lock 2 lần khi catch
    std::cout << "R_ERROR" << std::endl;
  }
}
void open()
{
  std::lock_guard<std::mutex> lock(mu);
  counter++;
  start();
}
int main()
{
  std::thread t1(open);
  t1.join();
  return 0;
}
```
Trong ví dụ trên, việc lock mutex 2 lần trong 2 hàm có thể sẽ dẫn đến crash. Sử dụng `std::recursive_mutex` là 1 giải pháp.<br>Khi thực hiện 1 thao tác trên data, chính hàm đó  sẽ quản lý việc khóa/mở khóa data. 
```
class X {
    std::mutex m;
    int data;
    int const max=50;

    void increment_data() {
        if (data >= max)
            throw std::runtime_error("R_ERROR");
        ++data;
    }
public:
    X():data(0){}
    int fetch_count() {
        std::lock_guard<std::mutex> guard(m);
        return data;
    }
    void increase_count() {
        std::lock_guard<std::mutex> guard(m);
        increment_data();
    } 
    int increase_count_and_return() {
        std::lock_guard<std::mutex> guard(m);
        increment_data();
        return data;
    } 
};
```
Một cách thông dụng, dễ dàng hơn là dùng [std::scoped_lock](https://en.cppreference.com/w/cpp/thread/scoped_lock).
### 4. Xử lý exception bên ngoài thread
```
    static std::exception_ptr teptr = nullptr;
void open()
{
  throw std::runtime_error("Catch me in MAIN");
}
int main()
{
  try
  {
    std::thread t1(open);
    t1.join();
  }
  catch (const std::exception &ex)
  {
    std::cout << "Thread exited with exception: " << ex.what() << "\n";
  }
  return 0;
}
```
Trong ví dụ trên, hàm block `catch` trong main sẽ không bắt được lỗi trong hàm `open` do khi out scope, `std::runtime_error` sẽ bị hủy.<br>
Để catch được error, đơn giản, ta tạo 1 biến global kiểu [std::exception_ptr](https://en.cppreference.com/w/cpp/error/exception_ptr) để lưu lại error thôi. Code sẽ như sau: 
```
static std::exception_ptr globalExceptionPtr = nullptr;
void open()
{
  try
  {
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    throw std::runtime_error("Catch me in MAIN");
  }
  catch (...)
  {
    //Set the global exception pointer in case of an exception
    globalExceptionPtr = std::current_exception();
  }
}
int main()
{
  std::thread t1(open);
  t1.join();
  if (globalExceptionPtr)
  {
    try
    {
      std::rethrow_exception(globalExceptionPtr);
    }
    catch (const std::exception &ex)
    {
      std::cout << "Thread exited with exception: " << ex.what() << "\n";
    }
  }
  return 0;
}
```
### 5. Tạo ra quá nhiều thread
Như đã biết, chức năng chính của thread là tận dụng tối đa phần cứng (core) để tối ưu hóa thời gian chạy của chương trình. Tuy nhiên, việc tạo ra quá nhiều luồng, vượt qua giới hạn của core là điều không nên.<br> Các thread dư thừa sẽ vẫn phải chờ đợi để thực hiện task được giao, có thể gây suy giảm hiệu suất chương trình.<br> Sử dụng [std :: thread :: hardware_concurrency ()](https://en.cppreference.com/w/cpp/thread/thread/hardware_concurrency).Hàm này sẽ trả về số lõi bộ xử lý. Sử dụng giá trị này để tính toán số lượng thread trong chương trình hợp lý nhất.
# Tổng kết
  Multithreading tối ưu hóa chương trình về mặt thời gian. Tuy nhiên, sử dụng multithreading có thể phát sinh nhiều vấn đề phức tạp như quản lý data, crash,...<br>Hãy đảm bảo rằng bạn thực sự cần đến multithreading trước khi muốn sử dụng nó.<br>
 The Best Synchronization Is No Synchronization!