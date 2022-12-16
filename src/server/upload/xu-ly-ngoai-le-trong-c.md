# Xử lý ngoại lệ trong C++

## 1. Định nghĩa

Một trong những lợi thế của C ++ so với C là Xử lý ngoại lệ. Các ngoại lệ là sự bất thường trong thời gian chạy hoặc các điều kiện bất thường mà chương trình gặp phải trong quá trình thực thi.
Có hai loại ngoại lệ:
+ Đồng bộ
+Không đồng bộ
Ví dụ: nằm ngoài chương trình Điều khiển, chương trình Lỗi đĩa, v.v.. 
C ++ cung cấp các từ khóa chuyên ngành sau cho mục đích này.

try: đại diện cho một khối mã có thể ném ngoại lệ.

Catch: đại diện cho một khối mã được thực thi khi ném một ngoại lệ cụ thể.

throw: Được sử dụng để ném một ngoại lệ. Cũng được sử dụng để liệt kê các trường hợp ngoại lệ mà một hàm ném ra, nhưng không xử lý chính nó.

## 2. Ưu điểm
- Tách mã xử lý lỗi khỏi Mã thông thường: Trong các mã xử lý lỗi truyền thống, luôn có các điều kiện khác để xử lý lỗi. Các điều kiện này và mã để xử lý lỗi được trộn lẫn với luồng bình thường. Điều này làm cho mã ít đọc và có thể duy trì. Với các khối try - catch, mã để xử lý lỗi trở nên tách biệt với luồng thông thường.
- Function / methods có thể xử lý bất kỳ ngoại lệ nào họ chọn: Một hàm có thể đưa ra nhiều ngoại lệ, nhưng có thể chọn xử lý một số ngoại lệ. Các ngoại lệ khác được ném, nhưng không bắt được có thể được xử lý bởi người gọi. Nếu người gọi chọn không bắt chúng, thì các ngoại lệ được xử lý bởi người gọi của người gọi.
Trong C ++, một function có thể chỉ định các ngoại lệ mà nó ném bằng cách sử dụng từ khóa throw. Người gọi hàm này phải xử lý ngoại lệ theo một cách nào đó (bằng cách chỉ định lại hoặc bắt nó)
- Nhóm các loại lỗi: Trong C ++, cả loại và đối tượng cơ bản đều có thể được ném thành ngoại lệ. Chúng ta có thể tạo một hệ thống phân cấp của các đối tượng ngoại lệ, ngoại lệ nhóm trong không gian tên hoặc lớp, phân loại chúng theo các loại


## 3. Xử lý ngoại lệ
### a. Sau đây là một ví dụ đơn giản để hiển thị xử lý ngoại lệ trong C ++. Đầu ra của chương trình giải thích luồng thực thi của các khối try-catch:

```

#include <iostream>
using namespace std;
  
int main()
{
   int x = -1;
  
   // Some code
   cout << "Before try \n";
   try {
      cout << "Inside try \n";
      if (x < 0)
      {
         throw x;
         cout << "After throw (Never executed) \n";
      }
   }
   catch (int x ) {
      cout << "Exception Caught \n";
   }
  
   cout << "After catch (Will be executed) \n";
   return 0;
}
```


Output:
```
Before try
Inside try
Exception Caught
After catch (Will be executed)
```
           
### b. Có một khối đánh bắt đặc biệt gọi là ‘bắt tất cả’ các bẫy bắt (...) để bắt tất cả các loại ngoại lệ. Ví dụ, trong chương trình sau, một int được ném như một ngoại lệ, nhưng không có khối bắt cho int, vì vậy khối Catch (...) sẽ được thực thi.

```
#include <iostream>
using namespace std;
  
int main()
{
    try  {
       throw 10;
    }
    catch (char *excp)  {
        cout << "Caught " << excp;
    }
    catch (...)  {
        cout << "Default Exception\n";
    }
    return 0;
}
```


Output:
```
Default Exception
```


### c. Chuyển đổi kiểu ngầm định không xảy ra đối với các kiểu nguyên thủy. Ví dụ, trong chương trình sau đây, một tên lửa không được chuyển đổi hoàn toàn thành int


```
#include <iostream>
using namespace std;
  
int main()
{
    try  {
       throw 'a';
    }
    catch (int x)  {
        cout << "Caught " << x;
    }
    catch (...)  {
        cout << "Default Exception\n";
    }
    return 0;
}
```


Output:
```
Default Exception
```

## 4. Kết luận
Try-catch là một những xử lý vô cùng quan trọng trong C++, giúp trương trình hay project của bạn có thể tránh được những lỗi không cần thiết xử lý (những lỗi này phải bỏ qua hoặc sẽ được thông báo, vd như chia một số cho 0). Nếu xử dụng thành thạo try-catch nó sẽ giúp ích rất nhiều cho bạn trong quá trình làm việc trong các dự án lớn.
Chúc các bạn thành công!