# Con trỏ void*

### 1. Định nghĩa, công dụng
  - Thông thường 1 con trỏ được xác đinh bởi 2 yếu tố:
    + Kiểu dữ liệu mà con trỏ trỏ đến (int, double, ...) xác định phương pháp truy xuất dữ liệu của vùng nhớ được trỏ tới.
    + Địa chỉ vùng nhớ là địa chỉ mà con trỏ trỏ đến.
   
- Và câu hỏi đặt ra là có kiểu con trỏ nào mà có thể linh hoạt trỏ tới các đối tượng mà các đối tượng này thuộc nhiều kiểu dữ liệu khác nhau. Câu trả lời là con trỏ void, là một kiểu con trỏ không định nghĩa kiểu dữ liệu mà nó trỏ đến.

**- Định nghĩa:**

   Con trỏ void (void*) là một con trỏ tổng quát, nó không trỏ đến các đối tượng của bất kì kiểu dữ liệu nào.
    Cũng như những loại con trỏ khác, con trỏ void cũng có kích thước 4 bytes khi sử dụng trên nền tảng 32 bits và 8 bytes khi sử dụng trên nền tảng 64 bits.

**Khai báo:**
    void *ptr;

## 2. Cách sử dụng + Ứng dụng
### a. Sử dụng
- Con trỏ void có thể trỏ đến các vùng nhớ có các kiểu dữ liệu khác nhau.

vd:
```
int n;
float f;
double d;

void *ptr;
ptr = &n; // ok
ptr = &f; // ok
ptr = &d; // ok
```

   - Tuy nhiên, con trỏ void không xác định được kiểu dữ liệu của vùng nhớ mà nó trỏ tới, vì vậy chúng ta không thể truy cập xuất trực tiếp nội dung thông qua toán tử derefernce (*) được. Mà con trỏ kiểu void cần phải được ép kiểu một cách rõ ràng sang con trỏ có kiểu dữ liệu khác trước khi sử dụng toán tử derefernce (*).
   
   - Trong trường hợp truy xuất trực tiếp đến con trỏ void, trình biên dịch sẽ báo lỗi khi build.

```
int value = 10;
void *voidPtr = &value;

// cout << *voidPtr << endl; // Trình biên dịch sẽ báo lỗi.

int *intPtr = static_cast<int*>(voidPtr); // ép kiểu thành con trỏ int
cout << *intPtr << endl; // ok
```

 - Trong đoạn code trên, voidPtr và intPrt đều trỏ vào địa chỉ của biến value, nhưng chúng ta chỉ có thể sử dụng toán tử dereference (*) lên con trỏ intPtr chứ không thể sử dụng cho con trỏ voidPrt, vì trình biên dịch không thể biết con trỏ voiPtr trỏ đến kiểu dữ liệu gì.

 - Trường hợp ép kiểu sai cho con trỏ void sẽ dẫn tới việc sai kết quả.

```
    int value = 5;
    void *vPtr = &value;

    int *iPtr = static_cast<int *> (vPtr);
    cout << *iPtr << endl;

    int64_t * i64Ptr = static_cast<int64_t *> (vPtr);
    cout << *i64Ptr << endl;
```

### b. Ứng dụng
  - Khi một con trỏ void không xác định được kiểu dữ liệu của vùng nhớ mf nó trỏ tới, làm thế nào để chúng ta biết kiểu dữ liệu mà nó đang trỏ tới là gì???
   - Thông thường, để sử dụng được con trỏ void, chúng ta phải lấy thông tin về kiểu con trỏ theo cách khác (sử dụng thêm tham số hoặc biến cho biết kiểu con trỏ), sau đó ép kiểu con trỏ đó đến một kiểu cụ thể và sau đó sử dụng như bình thường.
    Theo dõi một vd cụ thể: (*#)
        
```
#include <iostream>
using namespace std;

enum Type
{
    INT,
    DOUBLE
};

void printValueOfPointer(void *ptr, Type type)
{
    switch (type)
    {
    case INT:
        cout << *(static_cast<int*>(ptr)) << '\n'; // ép con trỏ void thành con trỏ int
        break;
    case DOUBLE:
        cout << *(static_cast<double*>(ptr)) << '\n'; // ép con trỏ void thành con trỏ double
        break;
    }
}

int main()
{
    int nValue = 10;
    double dValue = 6.9;

    printValueOfPointer(&nValue, INT);
    printValueOfPointer(&dValue, DOUBLE);

    return 0;
}
```


   - Trong vd trên, hàm printValueOfPointer() được truyền vào có thể là các con trỏ có kiểu double hoặc int để sử dụng cho các mục đích khác nhau, kèm theo đó truyền vào tham số type để xác định kiểu con trỏ được truyền vào.

## 3. Lưu ý
   - Thông thường, chúng ta nên lạm dụng việc sử dụng con trỏ void trừ khi cần thiết. Khi sử dụng con trỏ void, cần xác định rõ kiểu dữ liệu mà con trỏ đang trỏ đến khi sử dụng.
   - Ở vd (*#), trong nhiều trường hợp không thuận tiện cho việc sử dung con trỏ void, chúng ta có thể dụng dụng function overload hoặc function template để thay thế.

## 4. Kết luận
   - Con trỏ void rất linh hoạt trong cách sử dụng, nhưng không nên lạm dụng việc sử dụng con trỏ void và khi sử dụng cần sử dụng một cách rất cẩn thận.
   - Sử dụng con trỏ void nhiều sẽ dẫn tới việc code không tường minh.