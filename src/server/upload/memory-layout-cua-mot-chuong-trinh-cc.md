# 1. Đặt Vấn Đề
Khi chúng ta viết 1 chương trình C/C++ , source code của chúng ta sẽ được lưu trong storage, sau đó khi chúng ta compile hệ thống sẽ tạo ra file cài đặt và file này cũng được lưu trong storage. Cuối cùng là quá trình chúng ta run file program, thực chất đây là quá trình chúng ta load chương trình vào Memory và excute. Vậy chương trình được load vào Memory sẽ được structure như thế nào ở Memory? Trong bài viết này mình và các bạn sẽ cùng tìm hiểu.
![](https://images.viblo.asia/44f1f178-0642-41df-a4c0-39110abe148e.png)


# 2. Memory Layout
![](https://images.viblo.asia/eccce77d-6b51-4792-b544-a058f013b43d.png)
Memory layout của của một chương trình C/C++ gồm 5 phần chính: **Text Segment, Initialized Data Segment, Uninitialized Data Segment, Heap và Stack**
### 2.1 Text Segment
Text Segment  ở vùng nhớ của địa chỉ thấp nhất, đây là phần chứa các đoạn mã lệnh của chương trình.
### 2.2 Initialized Data Segment (DS)
Initialized Data Segment ( Data Segment ) là nơi lưu trữ **global variables, static variables** với điều kiện các biến này được khởi tạo bởi programmer với **giá trị khác 0**.
``` cpp
int global = 100;
int foo() {
    static int number = 10;
    return 0;
}
```

Trong đoạn chương chính trên, biến global được khởi tạo với giá trị 100, và biến **static** *number* được khởi với giá trị 10 bởi programmer nên được lưu trữ vào Initialized Data Segment.
### 2.3 Uninitialized Data Segment (BSS) 
Uninitialized Data Segment (BSS) là nơi lưu trữ **global variables, static variables**  **không được khởi tạo**  *hoặc* khởi tạo với **giá trị bằng 0.**
``` cpp
int global;
int foo() {
    static int number = 0;
    return 0;
}
```
Trong đoạn chương trình trên, biến global **không được khởi tạo giá trị** mặc định và biến **static** *number* **được khởi tạo với giá trị bằng 0** sẽ được lưu trữ vào  Uninitialized Data Segment.
### 2.4 Heap (Dynamic Memory Allocation)
Trong C/C++ chúng ta có thể hoàn toàn control được quá trình cấp phát hoặc giải phóng bộ nhớ bằng các lệnh như malloc, calloc, relloc, free, new, delete, ... Vùng nhớ được cấp phát chính là HEAP, vùng nhớ này sẽ phình lên ( grows upward ) mỗi khi bạn cấp phát. Khi sử dụng xong các bạn phải delete vùng nhớ này. Nếu quên không delete sẽ gây ra hiện tượng Memory Leak.
``` cpp
struct MyClass {
  int data[100];
  MyClass() {std::cout << "constructed [" << this << "]\n";}
};

int main () {

  std::cout << "1: ";
  MyClass * p1 = new MyClass;      //cấp chát bộ nhớ trong HEAP
  return 0;
  
  }
```
### 2.5 Stack (Automatic Variable Storage)
Khác với HEAP, Stack là một vùng nhớ được cấp phát tự động và có cấu trúc LIFO (Last In First Out). Mỗi khi chương trình được gọi, thì các function frame sẽ được gọi và push vào trong stack. Function Frame có cấu trúc như ví dụ dưới đây.
![](https://images.viblo.asia/a5cce181-5aab-481f-ad25-84c3ce8d2b48.png)
Khi main() được gọi, function frame của main() sẽ được push vào stack, và khi function foo() được gọi thì function frame của foo() sẽ được push vào. Cấu trúc của một function frame gồm bốn phần chính: Function Parameter, Return Address, Saved Previus Frame Pointer, Local Variable.
1. **Funtion Parameter** là các tham số truyền vào.
2.  **Return Address** trong ví dụ trên, Return Address trả về địa chỉ p trong hàm main() chính là Local Variable.
3.  **Saved Previus Frame Pointer** trỏ vào vị trí đầu tiên của function foo() tức là kết thúc của function main() 
4.  **Local Variable** là các biến local của function
* Lưu ý: Nếu chúng ta sử dụng hết vùng nhớ của Stack thì sẽ có một lỗi rất kinh điển đó là Stack OverFlow xảy ra.
# 3. Tổng Kết
Trong bài viết này chúng ta đã tìm hiểu rõ hơn về cách 1 chương trình C/C++ được tổ chức trong bộ nhớ. Rất mong sẽ đem lại những kiến thức thú vị cho bạn đọc.