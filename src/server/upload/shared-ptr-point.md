### Định nghĩa: 
   shared_ptr: Đại diện cho quyền chia sẻ!
   
   Các đối tượng kiểu shared_ptr có khả năng chiếm quyền sở hữu của một con trỏ và chia sẻ quyền sở hữu đó. Khi chiếm quyền sở hữu, nhóm đối tượng sở hữu sẽ chịu trách nhiệm xóa nó bởi đối tượng cuối cùng sở hữu nó.

   Shared_ptr giải phóng quyền sở hữu đối tượng mà chúng cùng sở hữu ngay khi chúng bị hủy hoặc ngay khi giá trị của chúng bị thay đổi theo thao tác gán hoặc bằng cách gọi hàm shared_ptr::reset. Khi tất cả các đối tượng shared_ptr chia sẻ quyền sở hữu trên con trỏ đã được khai báo quyền sở hữu này. Đối tượng được quản lý sẽ bị xóa (thường gọi bằng cách ::delete, nhưng cũng có thể chỉ định một deleter khác).

   Các shared_ptr chỉ có thể chia sẻ quyền sở hữu bằng cách sao chép giá trị của chúng. Nếu hai shared_ptr được khai báo từ cùng một con trỏ (non-shared_ptr), cả hai đều sẽ sở hữu con trỏ mà không chia sẻ nó, gây ra các vấn đề truy cập tiềm năng khi một trong số chúng xóa đối tượng được quản lý và để con trỏ còn lại trỏ đến một vùng nhớ không hợp lệ.
   
   Ngoài ra  các đối tượng shared_ptr có thể chia sẻ quyền sở hữu trên cùng một con trỏ và cũng đồng thời trỏ đến một đối tượng khác, và thường được sử dụng để trỏ đến các đối tượng thành viên trong khi sở hữu đối tượng của chúng. Do đó,  shared_ptr có thể liên quan đến hai con trỏ:
   
   + Con trỏ được lưu trữ, đó là con trỏ được trỏ tới và các tham chiếu đến toán tử.

   + Con trỏ thuộc sở hữu (có thể được chia sẻ), là con trỏ mà nhóm quyền sở hữu chịu trách nhiệm xóa tại một thời điểm nào đó và nó được tính là sử dụng.
	
### Member function:

| Column 1 | Column 2 |
| -------- | -------- |
| constructor    | Constructor shared_ptr (public function) |
| destructor     | Destructor shared_ptr (public function)     |
| operator=      | Gán đối tượng đang được trỏ tới có thêm một đối tượng làm chủ sở hữu (public function)     |
| swap           | Thay đổi nội dung (public function)     |
| reset          | Reset shared_ptr (public function)     |
| get            | Get pointer (public function)     |
| operator*      | Trả về tham chiếu đến đối tượng được trỏ bởi con trỏ (public function)     |
| operator->     | Trả về một con trỏ trỏ tới đối tượng để truy cập vào một trong các thành viên của đối tượng đó (public function)     |
| use_count      | Trả về các đối tượng shared_prt chia sẻ quyền sở hữu trên cùng một con trỏ với đối tượng này (public function)     |
| unique         | Trả về “true” khi đối tượng shared_ptr không chia sẻ quyền sở hữu trên con trỏ của nó với các đối tượng shared_ptr khác (public function template)     |
| operator bool  | Trả về “null” khi shared_ptr là con trỏ null (publich function template)     |
| Owener         | Owner-based ordering (public function template)     |


### Non-member function:
#### Overloads:

| Column 1 | Column 2 |
| -------- | -------- |
| swap     | Thay đổi nội dung của đối tượng shared_ptr (function template)     |
| relational operators   | !=, ==, <, <=, >, >= (function template)     |
| osteam operator        | insert info output stream (function template)     |


#### Specific function:

| Column 1 | Column 2 |
| -------- | -------- |
| make_shared            | Được sử đụng để cấp phát bộ nhớ cho đối tượng (function template)     |
| allocate_shared        | Được sử dụng để cấp bộ nhớ cho đối tượng (function template)     |
| static_pointer_cast    | Trả về một bản sao của đối tượng (function template)     |
| dynamic_point_cast     | Trả về một bản sao của đối tượng (function template)     |
| const_pointer_cast     | Trả về một bản sao của đối tượng (function template)     |
| get_deleter            | Trả về con trỏ tới deleter thuộc sở hữu của đối tượng     |

Chú ý:

   Quyền sở hữu đối tượng chỉ có thể được chia sẻ với shared_ptr khác bằng cách sao chép hoặc xây dựng phép gán giá trị của nó cho một shared_ptr khác. Xây dựng một shared_ptr mới bằng cách sử dụng con trỏ cơ bản thuộc sở hữu của shared_ptr khác dẫn đến hành vi không xác định.
   
   Khi shared_ptr được tạo bằng cách gọi std :: make_shared hoặc std :: allocate_shared, bộ nhớ cho cả khối điều khiển và đối tượng được quản lý vào trong một đơn vị được phân bổ. Đối tượng được quản lý được xây dựng tại chỗ trong một thành viên dữ liệu của khối điều khiển. Khi shared_ptr được tạo ra thông qua một trong các hàm tạo shared_ptr, đối tượng được quản lý và khối điều khiển phải được phân bổ riêng biệt. Trong trường hợp này, khối điều khiển lưu trữ một con trỏ tới đối tượng được quản lý.
   
   Con trỏ được tổ chức bởi shared_ptr trực tiếp là con trỏ được trả về bởi get (), trong khi con trỏ/đối tượng được tổ chức bởi khối điều khiển là con trỏ sẽ bị xóa khi số lượng các chủ sở hữu được chia sẻ bằng không. Những con trỏ này không nhất thiết phải bằng nhau.

Eg:
```
#include <iostream>
#include <memory>
#include <thread>
#include <chrono>
#include <mutex>
 
struct Base
{
    Base() { std::cout << "  Base::Base()\n"; }
    // Note: non-virtual destructor is OK here
    ~Base() { std::cout << "  Base::~Base()\n"; }
};
 
struct Derived: public Base
{
    Derived() { std::cout << "  Derived::Derived()\n"; }
    ~Derived() { std::cout << "  Derived::~Derived()\n"; }
};
 
void thr(std::shared_ptr<Base> p)
{
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::shared_ptr<Base> lp = p; // thread-safe, even though the
                                  // shared use_count is incremented
    {
        static std::mutex io_mutex;
        std::lock_guard<std::mutex> lk(io_mutex);
        std::cout << "local pointer in a thread:\n"
                  << "  lp.get() = " << lp.get()
                  << ", lp.use_count() = " << lp.use_count() << '\n';
    }
}
 
int main()
{
    std::shared_ptr<Base> p = std::make_shared<Derived>();
 
    std::cout << "Created a shared Derived (as a pointer to Base)\n"
              << "  p.get() = " << p.get()
              << ", p.use_count() = " << p.use_count() << '\n';
    std::thread t1(thr, p), t2(thr, p), t3(thr, p);
    p.reset(); // release ownership from main
    std::cout << "Shared ownership between 3 threads and released\n"
              << "ownership from main:\n"
              << "  p.get() = " << p.get()
              << ", p.use_count() = " << p.use_count() << '\n';
    t1.join(); t2.join(); t3.join();
    std::cout << "All threads completed, the last one deleted Derived\n";
}
```

ouput:
```
  p.get() = 0xd54c30, p.use_count() = 1
Shared ownership between 3 threads and released
ownership from main:
  p.get() = 0, p.use_count() = 0
local pointer in a thread:
  lp.get() = 0xd54c30, lp.use_count() = 5
local pointer in a thread:
  lp.get() = 0xd54c30, lp.use_count() = 3
local pointer in a thread:
  lp.get() = 0xd54c30, lp.use_count() = 2
  Derived::~Derived()
  Base::~Base()
All threads completed, the last one deleted Derived
```

link tham khảo: 
   http://www.cplusplus.com/reference/memory/shared_ptr/
            
   https://en.cppreference.com/w/cpp/memory/shared_ptr