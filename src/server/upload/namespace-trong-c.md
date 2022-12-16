# Namespace trong C++

## 1. Namespace là gì?
**Tình huống:** 

Khi đang lập trình trong một file A bạn include 2 file B và C, nhưng 2 file này có cùng định nghĩa một hàm function() giống nhau về tên và tham số truyền vào, nhưng xử lý của mỗi hàm ở mỗi file là khác nhau, vấn đề đặt ra là code làm sao để trình biên dịch hiểu được khi nào bạn muốn gọi function của file B, khi nào bạn muốn gọi function của file C. 
Khi gọi hàm function() ở file A, trình biên dịch sẽ không biết được hàm function() bạn muốn gọi là hàm được định nghĩa ở file B hay file C. Vì vậy trình biên dịch chương trình sẽ báo lỗi.

fileB.hpp:
```
#include <iostream>

using namespace std;

void function() { cout << “function in fileB running.” << endl; }
```

fileC.hpp:
```
#include <iostream>

using namespace std;

void function(() { cout << “function in fileC running.” << endl; }
```

fileA.hpp:
```
#include <iostream>
#incldue “fileB.hpp”
#include “fileC.hpp”

using namespace std;

int main() {
    function();
    
    return 0;
}
```
Trình biên dịch báo lỗi:
```
In file included from fileA.cpp:3:0:
fileC.hpp: In function ‘void function()’:
fileC.hpp:5:6: error: redefinition of ‘void function()’
 void function(){ cout << "function file1 running." << endl;}
      ^
In file included from fileA.cpp:2:0:
fileB.hpp:5:6: note: ‘void function()’ previously defined here
void function(){ cout << "function file1 running." << endl;}
```

**---> Namespace sẽ giải quyết chọn vẹn vấn đề này!**
    
#### Định nghĩa:

   Namespace là từ khóa trong C++ được sử dụng để định nghĩa một phạm vi nhằm mục đích phân biệt các hàm, lớp, biến, ... cùng tên trong các thư viện khác nhau.

## 2. Tại sao cần sử dụng namespace?
Trong các project lớn, sẽ có các hàm, lớp, ... cùng tên được định nghĩa, nhưng nội dụng khác nhau (giống như vd trên phần 1). Trong những trường hợp này cần đặt các hàm, lớp, ... này vào các amespace khác nhau để trình biên dịch có thể phân biệt được, cũng như việc tường minh code cho những người cần đọc và sử dụng sau đó.

## 3. Sử dụng namespace
Cú pháp:
```
namespace ten_namespace{
    //code
}
```

Tiếp tục vd ở phần 1 khi sử dụng namespace.
fileB.hpp:
```
#include <iostream>

using namespace std;

namespace fileB{
    void function(() { cout << “function in fileB running.” << endl; }
}
```

fileC.hpp:
```
#include <iostream>

using namespace std;

namespace fileC{
    void function(() { cout << “function in fileC running.” endl; }
}
```
fileA.hpp:
```
#include <iostream>
#incldue “fileB.hpp”
#include “fileC.hpp”

using namespace std;

int main() {
    fileB::function();
    fileC::function();
    
    return 0;
}
```
Kết quả:
```
function fileB running.
function fileC running.
```

**- Khai báo Namespace:**

Khi bạn cảm thấy việc gọi hàm thông qua gọi tên của namespace là dài dòng và không cần thiết, trong trường hợp này bạn có thể sử dụng từ khóa khai báo namespace để sử dụng.

```
using namespace ten_namespace;
```

Khi khai báo như này bạn có thể gọi trực tiếp các hàm, ... được định nghĩa trong namespace. Bạn sẽ thấy quen thuộc hơn trong việc khai báo sử dụng namespace std.
fileB.hpp:
```
#include <iostream>

using namespace std;

namespace fileB{
    Void function(() { cout << “function in fileB running.” << endl; }
}
```


fileA.hpp:
```
#include <iostream>
#incldue “fileB.hpp”

Using namespace std;
Using namespace fileB;

Int main() {
    function();

    return 0;
}
```

## 4. Trường hợp đặc biệt
### a. namespace không kề nhau 
Là 1 namespace nhưng được định nghĩa ở nhiều file khác nhau.

Vd:
fileB.hpp:
```
#include <iostream>

using namespace std;

namespace file{
    void function1() { cout << “function in fileB running.” << endl; }
}
```
fileC.hpp:
```
#include <iostream>

using namespace std;

namespace file{
    void function2(() { cout << “function in fileC running.” << endl; }
}
```
fileA.hpp:
```
#include <iostream>
#include "fileB.hpp"
#include "fileC.hpp"

using namespace std;
using namespace file;

int main() {
    function1();
    function2();

    return 0;
}
```
### b. namespace lồng nhau
- Có nghĩa là bạn định nghĩa một namespae trong một namespace khác.
```
Namespace parent_namespace{
    //code
    Namespace child_namespace{
        //code
    }
}
```