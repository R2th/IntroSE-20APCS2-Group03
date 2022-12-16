#### 1. Khái niệm
- Căn chỉnh dữ liệu trong máy tính là sự sắp xếp dữ liệu trong bộ nhớ máy tính để việc đọc và ghi dữ liệu được hiệu quả nhất.

- Alignment memory (căn chỉnh biến trong bộ nhớ): Là cách sắp xếp và truy cập dữ liệu trong bộ nhớ máy tính. Nó bao gồm 3 vấn đề riêng biệt: Căn chỉnh dữ liệu, bộ đệm cấu trúc dữ liệu,và đóng gói.

- Giá trị mỗi ô nhớ trong bộ nhớ máy tính 4byte. Bộ nhớ máy tính giao tiếp với người dụng thông qua bộ nhớ ảo. Các địa chỉ mà bính thường khi log ra từ cú pháp &name_ là địa chỉ từ bộ nhớ ảo cung cấp.

- Thứ tự các biến trong bộ nhớ:

- Các biến trong class, struct: được sắp xếp theo thứ tự khai báo và không gian địa chỉ đã được định nghĩa.

- Các biến trong union: được khai báo tại một địa chỉ. Các biến này được dùng chung một địa. Vì thế tại một thời điển chỉ có thể sử dụng một trong các biến được khai báo trong union.

- Các biến trong hàm main: được sắp xếp theo thứ tự sizeof() từ nhỏ đến lớn.
Eg:

```
#include <iostream>

using namespace std;

union test

{
   int i;  
   double d;
   float f;
   short int e;
   int t;
} test2;

int main()
{
   int a;
   double c;
   float b;
   short int e;
   int t;
    
   cout << &a << "\t" << &c << "\t" << &b << "\t" << &e << "\t" << &t << endl;
   cout << &test2.i << "\t" << &test2.d << "\t" << &test2.f << "\t" << &test2.e << "\t" << &test2.t << endl;
    
   return 0;
}
```

__Kết quả trả về:__

![](https://images.viblo.asia/4f63fbe5-7a44-4af7-9a0b-930ee0813308.png)

#### 2. ALIGNED và UNALIGNED trong C++
   - Thông thường khi khai báo struct bộ nhớ sẽ tự động cấp phát vùng nhớ cho struct được khai báo và lập trình viên sẽ không cần thiết phải quan tâm xem sẽ được cấp phát bộ nhớ như thế nào và được cấp bao nhiêu byte.
   - Tuy nhiên trong một số trường hợp cần kiểm soát vấn đề này, c++ cung cấp thuộc tính để quản lý vấn đề này.
	
* ____atribute__ __ __aligned__
    - Trong các bài toán liên quan đến protocol (giao thức) cần phải định dạng rõ các gói tin (độ dài, số lượng và thứ tự các gói tin) vì thế cần định nghĩa rõ ràng độ dài cho các struct được khai báo.

__Eg:__
```
struct bien1
{
   int b1i;
   float b1f;
} __attribute__(( aligned(8) ));

int main()
{
   cout << sizeof( bien1 ) << "\t" << sizeof( bien1.b1i )
   << "\t" << sizeof( bien1.b1f )  << endl;
    
   return 0;
}
```
__Kết quả trả về:__                ![](https://images.viblo.asia/ca80fa10-bfad-432f-bb0b-db301192c8f9.png)

* ____atribute__ __ __packed__
	- Dùng minimum độ dài vùng nhớ của struct. Mục đích tiết kiệm bộ nhớ.

__Eg:__
```
struct bien1
{
   int b1i;
   float b1f;
   char cha;
} __attribute__ (( aligned(8) ));

int main()
{
   bien1 bien1;

   cout << sizeof( bien1 ) << "\t" << sizeof( bien1.b1i ) << "\t" << sizeof( bien1.b1f ) << "\t" << sizeof( bien1.cha ) << endl;

   return 0;
}
```
__Kết quả trả về:__    ![](https://images.viblo.asia/08d7ff4a-76a6-4abc-a615-0b59777f2bfb.png)