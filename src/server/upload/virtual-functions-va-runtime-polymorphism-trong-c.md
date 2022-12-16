# Virtual Functions và Runtime Polymorphism trong C++
## 1. Virtual Functions và Runtime Polymorphism

Hãy xem xét chương trình đơn giản sau đây như một ví dụ về runtime polymorphism. Điều chính cần lưu ý trong chương trình là hàm dẫn xuất lớp được gọi bằng cách sử dụng một con trỏ lớp cơ sở.
Ở đây các hàm ảo được gọi theo loại đối tượng được trỏ hoặc tham chiếu, không theo loại con trỏ hoặc tham chiếu, có nghĩa là việc gọi hàm sẽ được xử lý trong quá trình chạy không phải trong qua trình biên dịch.

```
#include <iostream> 
using namespace std; 
  
class Base { 
public: 
    virtual void show() 
    { 
        cout << " In Base \n"; 
    } 
}; 
  
class Derived : public Base { 
public: 
    void show() 
    { 
        cout << "In Derived \n"; 
    } 
}; 
  
int main(void) 
{ 
    Base* bp = new Derived; 
  
    // RUN-TIME POLYMORPHISM 
    bp->show(); 
  
    return 0; 
} 
```

```
Output: In Derived
```

### Ưu điểm của hàm ảo:
Các hàm ảo cho phép tạo một danh sách các con trỏ lớp cơ sở và các phương thức được gọi từ lớp dẫn xuất mà không cần biết chính xác đối tượng của lớp dẫn xuất.

**Vd:**

Xét một lớp cơ sở đơn giản Nhân viên, lớp chứa các hàm ảo như growSalary (), transfer (), Promotion (), v.v. Các loại nhân viên khác nhau như Manager, Engineering, v.v. có thể có các triển khai riêng cho các hàm ảo có mặt trong lớp nhân viên cơ sở.

Trong phần mềm hoàn chỉnh của chúng tôi, chúng tôi chỉ cần vượt qua một danh sách nhân viên ở khắp mọi nơi và gọi các chức năng phù hợp mà không cần biết loại nhân viên. Chẳng hạn, chúng ta có thể dễ dàng tăng lương cho tất cả nhân viên bằng cách lặp qua danh sách nhân viên. Mỗi loại nhân viên có thể có logic riêng trong lớp, nhưng chúng tôi không cần phải lo lắng về họ vì nếu nângSalary () có mặt cho một loại nhân viên cụ thể, chỉ có chức năng đó sẽ được gọi.

```
class Employee { 
public: 
    virtual void raiseSalary() 
    { 
        cout << "raiseSalary Employee." << endl;
    } 
  
    virtual void promote() 
    { 
        cout << "promote Employee." << endl;
    } 
}; 
  
class Manager : public Employee { 
    virtual void raiseSalary() 
    { 
        cout << "raiseSalary Manager." << endl;
    } 
  
    virtual void promote() 
    { 
        cout << "promote Manager." << endl;
    } 
}; 
  
int main()
{
    Employee *e = new Manager();
    e->promote();
    return 0;
}
```

```
Output: promote Manager.
```

**Các hàm ảo hữu ích đến mức mà các ngôn ngữ sau này như Java giữ tất cả các phương thức là ảo theo mặc định.**

### 2. Cơ chế virtual table và con trỏ vptr.
- Virtual table là cơ chế để thực hiện việc gọi hàm virtual.
- vtable: là một mảng các con trỏ hàm được khai báo cho mỗi lớp.
- vptr: là con trỏ trỏ tới vtable, được khai báo cho mỗi đối tượng.

Trình biên dịch thêm mã bổ sung tại hai nơi để duy trì và sử dụng vptr.

1. Mã này đặt vptr của đối tượng được tạo. Mã này đặt vptr để trỏ đến vtable của lớp.

2) Với lệnh gọi hàm đa hình (ví dụ: e->promote() trong mã trên). Bất cứ nơi nào việc gọi hàm được thực hiện, trình biên dịch sẽ chèn mã để tìm vptr trước bằng cách sử dụng con trỏ hoặc tham chiếu lớp cơ sở (Trong ví dụ trên, vì đối tượng được gọi là loại dẫn xuất, vptr của lớp dẫn xuất được truy cập). Khi vptr được tìm nạp, vtable của lớp dẫn xuất có thể được truy cập. Sử dụng vtable, địa chỉ của hàm lớp dẫn xuất dẫn được truy cập và gọi.

Vấn đề này sẽ được chi tiết hơn trong bài sau.