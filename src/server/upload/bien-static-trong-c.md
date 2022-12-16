## Biến Static trong C++

### 1. Nội dung
Biến static: Biến trong hàm, Biến trong lớp.
Các thành viên static của class: Các đối tượng và hàm của lớp trong một lớp.
### 2. Biến static
**Biến static trong Hàm:**
Khi một biến được khai báo với từ khóa static, vùng nhớ cho nó tồn tại theo vòng đời của chương trình. Ngay cả khi hàm được gọi nhiều lần, vùng nhớ cho biến static chỉ được cấp nhát một lần và giá trị của biến trong những lần gọi trước đó được lưu lại và được sử dụng để thực hiện thông qua các lượt gọi hàm tiếp theo. Điều này rất hữu ích để triển khai các ứng dụng nào khác mà trạng thái chức năng trước đó cần được lưu trữ.
```
#include <iostream> 
#include <string> 

using namespace std; 
  
void demo() 
{  
    static int count = 0; 
    cout << count << " "; 
      
    count++; 
} 
  
int main() 
{ 
    for (int i=0; i<5; i++)     
        demo(); 
    return 0; 
} 
```

Kết quả:
```
0 1 2 3 4
```

Bạn có thể thấy trong chương trình trên, biến count được khai báo là tĩnh. Vì vậy, giá trị của nó được thực hiện thông qua các cuộc gọi chức năng. Biến count không được khởi tạo lại cho mỗi lần gọi hàm.

**Các biến static trong class:**
Vì các biến được khai báo là tĩnh chỉ được khởi tạo một lần khi chúng được cấp phát một địa chỉ trong bộ lưu trữ tĩnh riêng biệt, do đó, các biến tĩnh trong một lớp được chia sẻ bởi các đối tượng. Chúng ta không tạo ra các bản sao cho cùng một biến tĩnh của các đối tượng khác nhau. Cũng vì lý do này mà các biến tĩnh không thể được khởi tạo bằng cách sử dụng các hàm khởi tạo (hàm constructor()).
```
#include<iostream> 
using namespace std; 
  
class GfG 
{ 
   public: 
     static int i; 
      
     GfG() {  }; 
}; 
  
int main() 
{ 
  GfG obj1; 
  GfG obj2; 
  obj1.i =2; 
  obj2.i = 3; 
    
  cout << obj1.i<<" "<<obj2.i;
} 
```

---> chương trình lỗi, không chạy được.

Bạn có thể thấy trong chương trình trên, mình thử tạo ra nhiều bản sao của biến static i của các đối tượng. Nhưng việc này là không thể. Vì vậy, một biến static bên trong một class nên được khởi tạo bằng cách sử dụng toán tử tên và toán tử phân giải phạm vi bên ngoài class như dưới đây:
```
#include<iostream> 
using namespace std; 
  
class GfG 
{ 
public: 
    static int i; 
      
    GfG() {}; 
}; 
  
int GfG::i = 1; 
  
int main() 
{ 
    GfG obj; 
    cout << obj.i;  
} 
```
Kết quả:
```
1
```

### 3. Thành viên static của class
Các đối tượng của class là static:
Cũng giống như các biến, các đối tượng cũng khi được khai báo là static có thời gian tồn tại bằng với thời gian tồn tại của chương trình.
Xét ví dụ sau:
```
#include<iostream> 
using namespace std; 
  
class GfG 
{ 
    int i = 0; 
      
    public: 
    GfG() 
    { 
        i = 0; 
        cout << "Inside Constructor\n"; 
    } 
      
    ~GfG() 
    { 
        cout << "Inside Destructor\n"; 
    } 
}; 
  
int main() 
{ 
    int x = 0; 
    if (x==0) 
    { 
        GfG obj; 
    } 
    cout << "End of main\n"; 
} 
```
Kết quả:
```
Inside Constructor
Inside Destructor
End of main
```
Trong chương trình trên, đối tượng được khai báo bên trong khối lệnh if là không phải là biến static. Vì vậy, phạm vi của biến chỉ nằm trong khối if. Vì vậy, khi đối tượng được tạo, hàm tạo được gọi và ngay khi kết thúc điều câu lệnh if hàm hủy được gọi ngay lập tức vì phạm vi của đối tượng nằm trong khối lệnh if.
Theo dõi một ví dụ khi khai báo đối tượng là static.
```
#include<iostream> 
using namespace std; 
  
class GfG 
{ 
    int i = 0; 
      
    public: 
    GfG() 
    { 
        i = 0; 
        cout << "Inside Constructor\n"; 
    } 
      
    ~GfG() 
    { 
        cout << "Inside Destructor\n"; 
    } 
}; 
  
int main() 
{ 
    int x = 0; 
    if (x==0) 
    { 
        static GfG obj; 
    } 
    cout << "End of main\n"; 
} 
```
Kết quả:
```
Inside Constructor
End of main
Inside Destructor
```
Có thể thấy rõ sự khác biệt trong kết quả. Bây giờ hàm hủy được gọi sau khi kết thúc main. Điều này xảy ra bởi vì thời gian tồn tại của đối tượng static là cùng với thời gian tồn tại của chương trình.
**Các hàm static trong class:**
Giống như các thành viên kiểu static hoặc các biến static bên trong class, các hàm static cũng không phụ thuộc vào đối tượng của class. Cho phép gọi một hàm thành viên static bằng cách sử dụng đối tượng và toán tử "." . Nhưng nên gọi các thành viên static bằng cách sử dụng tên lớp và toán tử phân giải phạm vi.
Các hàm thành viên tĩnh chỉ được phép truy cập các thành viên dữ liệu kiểu static hoặc các hàm thành viên static khác, chúng không thể truy cập các thành viên không phải kiểu static của class.
```
#include<iostream> 
using namespace std; 
  
class GfG 
{ 
   public: 
      
    // static member function 
    static void printMsg() 
    { 
        cout<<"Welcome to GfG!"; 
    } 
}; 
  
// main function 
int main() 
{ 
    // invoking a static member function 
    GfG::printMsg(); 
} 
```
```
Welcome to GfG!
```