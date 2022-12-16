## Dạo đầu với CMake thông qua ví dụ

Trong bài viết này mình sẽ trình bày các ví dụ đơn giản và mang tính ứng dụng cao trong việc áp dụng CMake để xây dựng một project C++. Các ví dụ mình đều thực hiện trên Ubuntu.

Tiện ích **make** và **Makefiles** cung cấp một hệ thống build mà chúng ta có thể sử dụng để quản lý việc compile và re-compilation của một chương trình được viết bằng ngôn ngữ bất kỳ. Việc sử dụng Makefiles đôi khi lại có thể trở thành một công việc phức tạp trong trường hợp project mà chúng ta build có nhiều sub directories hoặc sẽ phải triển khai trên nhiều nền tảng khác nhau.

Để khắc phục điều đó thì CMake ra đời. CMake là một công cụ sinh Makefile đa nền tảng. Nói đơn giản thì CMake sẽ tự động tạo ra Makefiles cho project của chúng ta. Ngoài ra thì nó cũng làm được nhiều hơn nhưng trong khuôn khổ bài viết thì mình sẽ chỉ tập trung vào việc tự động sinh Makefiles cho các project C/C++.

### Ví dụ 1: Hello World

Code cho project này có thể tìm thấy ở [thư mục](https://github.com/derekmolloy/exploringBB/tree/master/extras/cmake/helloworld). Trong ví dụ này thì một chương trình `Hello World` đơn giản sẽ được build ([HelloWorld.cpp](https://github.com/derekmolloy/exploringBB/blob/master/extras/cmake/helloworld/helloworld.cpp)):

```c++
#include<iostream>

int main(int argc, char *argv[]){
   std::cout << "Hello World!" << std::endl;
   return 0;
}
```

Ngoài file `HelloWorld.cpp` ra thì chúng ta sẽ cần đến một file khác ở cùng thư mục là `CMakeLists.txt` có nội dung như sau:

```
cmake_minimum_required(VERSION 2.8.9)
project (hello)
add_executable(hello helloworld.cpp)
```

File này chỉ có 3 dòng và có ý nghĩa như sau:

- Dòng đầu tiên sẽ định nghĩa phiên bản thấp nhất của CMake dành cho project này.

- Dòng thứ hai sử dụng lệnh `project()` để đặt tên cho project.

- Dòng thứ ba là lệnh `add_executable()`. Lệnh này nhằm mục đích tạo thêm một executable. Đối số đầu truyền vào là tên của executable sẽ được tạo, đối số thứ hai là source file sẽ được dùng để build executable.


Để build project thì hãy chắc chắn rằng CMake đã được cài đặt trên máy. Nếu hệ điều hành của bạn là một flavor của Linux thì hãy cài dặt nó thông qua package manager, ví dụ như với Ubuntu:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~$ sudo apt-get install cmake
FRAMGIA\luong.the.vinh@framgia0221-pc:~$ cmake -version
cmake version 3.5.1
```

Điều hướng terminal đến thư mục chứa code project và check xem có đủ 2 file ở trên không:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~$ cd ~/Workspaces/Examples/exploringBB/extras/cmake/helloworld/
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/helloworld$ ls
CMakeLists.txt  helloworld.cpp
```

Bây giờ thì chúng ta đã sẵn sàng để build project HelloWorld sử dụng CMake. Chúng ta sẽ thực thi lệnh `cmake` kèm đường dẫn chứa source code và file CmakeLists.txt. Trong trường hợp này thì "." sẽ dùng để trỏ đến thư mục hiện tại:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/helloworld$ cmake .
-- The C compiler identification is GNU 5.4.0
-- The CXX compiler identification is GNU 5.4.0
-- Check for working C compiler: /usr/bin/cc
-- Check for working C compiler: /usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: /usr/bin/c++
-- Check for working CXX compiler: /usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/luong.the.vinh/Workspaces/Examples/exploringBB/extras/cmake/helloworld
```

CMake sẽ xác định cấu hình môi trường được cài đặt trên máy và tạo một file Makefile cho project này. Chúng ta có thể xem và edit Makefile được tạo này, tuy nhiên thì những sự thay đổi chúng ta tạo ra sẽ bị ghi đè lại mỗi lần chúng ta chạy lại lệnh `cmake`.

Một khi Makefile đã được tạo thì chúng ta sẽ dùng lệnh `make` để build project:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/helloworld$ make
Scanning dependencies of target hello
[ 50%] Building CXX object CMakeFiles/hello.dir/helloworld.cpp.o
[100%] Linking CXX executable hello
[100%] Built target hello
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/helloworld$ ls -l hello
-rwxr-xr-x 1 FRAMGIA\luong.the.vinh FRAMGIA\domain^users 9224 Th08 20 09:58 hello
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/helloworld$ ./hello
Hello World!

```

Project chúng ta build đã chạy! Như các bạn thấy thì quá trình build chương trình HelloWorld.cpp này thực sự có hơi rườm rà nhưng lại rất quan trọng đối với những người mới học bởi nó giải thích các hoạt động cơ bản của CMake. Bây giờ thì chúng ta đã sẵn sàng xem xét đến một số ví dụ CMake phức tạp hơn.

## Ví dụ 2: Một project với nhiều directory

Khi project của chúng ta bắt đầu phình to thì chúng ta sẽ muốn quản lý chúng dưới dạng nhiều sub-directory. Việc sử dụng Makeflies trở nên khá dài dòng khi có sự hiện diện của sub-directories do trong thực tế thì việc tạo một Makefile trong mỗi sub-directory là việc rất phổ biến. Các Makefile này sau đó sẽ được gọi bởi Makefile trong thư mục cha.

Cmake sẽ tỏ ra rất hữu dụng trong trường hợp này. Trong ví dụ này thì một project với cấu trúc thư mục điển hình sẽ được sử dụng. Chúng ta sẽ điều hướng terminal đến thư mục `/exploringBB/extras/cmake/student` có cấu trúc thư mục như sau:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student$ tree
.
├── build
├── CMakeLists.txt
├── include
│   └── Student.h
└── src
    ├── mainapp.cpp
    └── Student.cpp

3 directories, 4 files
```

Các bạn có thể thấy là tất cả các file header (.h) được đặt trong thư mục `include` và tất cả các file mã nguồn (.cpp) được đặt trong thư mục `src`. Ngoài ra thì có cả thư mục `build` (hiện đang rỗng) được sử dụng để chứa các file binary executable và các file tạm cần thiết cho quá trình build. File CmakeLists.txt cho project này sẽ có một chút khác biệt so với file được sử dụng trong ví dụ 1:

```
cmake_minimum_required(VERSION 2.8.9)
project(directory_test)

include_directories(include)

#set(SOURCES src/mainapp.cpp src/Student.cpp)

file(GLOB SOURCES "src/*.cpp")

add_executable(testStudent ${SOURCES})
```

Các thay đổi quan trọng trong file CMake này là như sau:

- Hàm `include_directories()` được sử dụng để tích hợp các file header vào trong môi trường build.
- Hàm `set(SOURCE...)` có thể được sử dụng để đặt một biến (SOURCE) chứa tất cả tên của các file source (.cpp) trong project. Tuy nhiên thì bởi mỗi một file source cần được thêm một cách thủ công nên dòng tiếp theo sẽ được dùng thay thế lệnh này và hàm set sẽ bị comment lại.
- Hàm `file()` được sử dụng để thêm source file vào project. `GLOB` (hoặc `GLOB_RECURSE`) sẽ được sử dụng để tạo một  danh sách  các file thỏa mãn expression được khai báo (ví dụ: `src/*.cpp`) và thêm chúng vào biến SOURCE.
- Hàm `add_executable()` sử dụng biến `SOURCE` thay vì việc sử dụng tham chiếu cụ thể của từng source file để build một  chương trình executable là `testStudent`.


Trong ví dụ này thì tất cả các file build sẽ được đặt ở trong thư mục `build`. Chúng ta có thể làm việc này một cách dễ dàng bằng cách gọi `cmake` từ thư mục `build` như sau:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student$ cd build
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student/build$ cmake ..
-- The C compiler identification is GNU 5.4.0
-- The CXX compiler identification is GNU 5.4.0
...
```

Thư mục `build` lúc này sẽ bao gồm Makefile cho project, Makefile sẽ tham chiếu chính xác đến các file trong thư mục `src` và `include`. Project lúc này sẽ có thể được build từ thư mục `build` sử dụng lệnh `make`

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student/build$ ls
CMakeCache.txt  CMakeFiles  cmake_install.cmake  Makefile
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student/build$ make
...
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student/build$ ls
CMakeCache.txt  CMakeFiles  cmake_install.cmake  Makefile  testStudent
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student/build$ ./testStudent
A student with name Joe

```

Một ưu điểm dễ thấy của cách tiếp cận này là tất cả các file liên quan đến quá trình build đều nằm trong thư mục build. Để clean project thì chúng ta đơn giản là chỉ cần xóa đệ quy tất cả files/directories nằm trong thư mục build, ví dụ:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student/build$ cd ..
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student$ rm -r build/*
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/student$ tree
.
├── build
├── CMakeLists.txt
├── include
│   └── Student.h
└── src
    ├── mainapp.cpp
    └── Student.cpp

3 directories, 4 files

```

Như các bạn thấy thì cấu trúc cây thư mục của project là tương tự như trước khi `cmake` được thực thi.

**Lưu ý**: Mỗi lần thêm source file mới vào project thì chúng ta sẽ phải chạy lại `cmake`. Do chúng ta cần phải cập nhật lại Makefiles cho những thay đổi mới.

## Ví dụ 3: Xây dựng một Shared Library

Với bạn nào chưa hiểu shared library là gì thì có thể xem bài viết rất hay [này](https://manthang.wordpress.com/2010/12/04/quan-ly-cac-shared-library-trong-linux/). Trong ví dụ này thì một shared library (thư viện được chia sẻ) sẽ được xây dựng sử dụng code trong Example 2. Project trong gần giống project trong ví dụ 2, khác biệt duy nhất là `mainapp.cpp` sẽ bị loại bỏ do nó sẽ không liên quan đến việc build lib. Như vậy thì shared library sẽ chỉ chứ một class Student. Cấu trúc thư mục của project là như sau:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_shared$ tree
.
├── build
├── CMakeLists.txt
├── include
│   └── Student.h
└── src
    └── Student.cpp

3 directories, 3 files

```

Một lần nữa thì header file sẽ được đặt trong thư mục `include` và source file sẽ được đặt trong thư mục `src`. Thư mục `build` rỗng sẽ được sử dụng để chứa file lib ở dạng binary và các file tạm thời cần thiết cho quá trình build. File `CMakeLists` có nội dung như sau:

```
cmake_minimum_required(VERSION 2.8.9)
project(directory_test)
set(CMAKE_BUILD_TYPE Release)

include_directories(include)

file(GLOB SOURCES "src/*.cpp")

add_library(testStudent SHARED ${SOURCES})

install(TARGETS testStudent DESTINATION /usr/lib)
```

Các thay đổi quan trọng trong file này bao gồm:

- Hàm `set(CMAKE_BUILD_TYPE Release)` được sử dụng để set kiểu build thành release.
- Thay vì sử dụng hàm `add_executable()` trong ví dụ trước thì ví dụ này sử dụng hàm `add_library()`. Thư viện được xây dựng là một shared library cho nên chúng ta sẽ set flag ở đây là SHARED (ngoài ra còn có các tùy chọn khác là STATIC hoặc MODULE) và `testStudent` là tên được sử dụng cho shared library này.
- Dòng cuối cùng sử dụng hàm `install()` để định nghĩa vị trí cài đặt cho lib này (trong trường hợp này là `usr/lib`). Việc deploy trong trường hợp này được invoke bằng cách gọi `sudo make install`


Trong ví dụ này thì lib được build trong thư mục `build` với output kết quả như sau:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_shared/build$ cmake ..
...
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_shared/build$ make
Scanning dependencies of target testStudent
[ 50%] Building CXX object CMakeFiles/testStudent.dir/src/Student.cpp.o
[100%] Linking CXX shared library libtestStudent.so
[100%] Built target testStudent
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_shared/build$ ls -l *.so
-rwxr-xr-x 1 FRAMGIA\luong.the.vinh FRAMGIA\domain^users 13704 Th08 20 13:27 libtestStudent.so

```

Chúng ta có thể sử dụng lệnh `ldd` để hiển thị các dependencies của shared library:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_shared/build$ ldd libtestStudent.so
	linux-vdso.so.1 =>  (0x00007ffffc324000)
	libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007faf2f985000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007faf2f5bb000)
	libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007faf2f2b2000)
	/lib64/ld-linux-x86-64.so.2 (0x00007faf2ff0a000)
	libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007faf2f09c000)

```

File CMakeLists.txt còn bao gồm cả bước deploy cho phép chúng ta cài đặt lib ở một vị trí thuận lợi cho việc truy cập. Vị trí của shared library còn có thể thêm vào path, hoặc nếu muốn nó khả dụng ở mức system wide thì chúng ta có thể thêm chúng vào thư mục `/usr/lib`. Ví dụ như lib `libtestStudent.so` có thể được cài đặt system wide bằng cách sau:

```
RAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_shared/build$ sudo make install
[sudo] password for FRAMGIA\luong.the.vinh: 
[100%] Built target testStudent
Install the project...
-- Install configuration: "Release"
-- Installing: /usr/lib/libtestStudent.so

```

Bước này cần được thực hiện với quyển root nhằm có thể ghi vào thư mục `usr/lib`. Chúng ta có thể tìm thấy file `install_manifest.txt` trong thư mục `build` mô tả vị trí mà lệnh `make install` thực hiện những thay đổi.

## Ví dụ 4: Xây dựng một static library

Một static library được tạo tại thời điểm compile để có thể tổng hợp toàn bộ code liên quan đến thư viện - về bản chất thì nó sẽ copy lại code của các dependency vào một thư viện khác. ĐIều này dẫn đến việc lib được sinh ra thường sẽ có kích cỡ lớn hơn một shared library, tuy nhiên thì do tất cả các dependency đều được xác định tại thời điểm compile nên chi phí cho việc loading tại thời điểm runtime sẽ ít hơn và lib sẽ ít trở nên ít phụ thuộc hơn vào platform mà nó đang chạy. Trong phần lớn các trường hợp thì chúng ta chỉ nên dùng shared library, trừ khi bắt buộc mới dùng static library. Lý do là bởi nó sẽ hạn chế được việc trùng lặp code và trong trường hợp shared library có thể được cập nhật thì sẽ không phải recompile.

Để xây dựng một static library sử dụng CMake thì các bước sẽ gần như y hệt ví dụ 3. Code cho ví dụ này có thể tìm thấy ở [đây](https://github.com/derekmolloy/exploringBB/tree/master/extras/cmake/studentlib_static) và file CMakeLists.txt có nội dung như sau:

```
cmake_minimum_required(VERSION 2.8.9)
project(directory_test)
set(CMAKE_BUILD_TYPE Release)

include_directories(include)

file(GLOB SOURCES "src/*.cpp")

add_library(testStudent STATIC ${SOURCES})

install(TARGETS testStudent DESTINATION /usr/lib)
```

Sử dụng các bước tương tự như lần trước để xây dựng một static library:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_static/build$ cmake ..
-- The C compiler identification is GNU 5.4.0
...
/home/luong.the.vinh/Workspaces/Examples/exploringBB/extras/cmake/studentlib_static/build
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_static/build$ make
Scanning dependencies of target testStudent
[ 50%] Building CXX object CMakeFiles/testStudent.dir/src/Student.cpp.o
[100%] Linking CXX static library libtestStudent.a
[100%] Built target testStudent
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_static/build$ ls -l lib*
-rw-r--r-- 1 FRAMGIA\luong.the.vinh FRAMGIA\domain^users 6054 Th08 22 09:06 libtestStudent.a

```

Chúng ta có thể xác định được các thành phần cấu tạo nên static library bằng cách sử dụng  lệnh `ar` trong GNU, ví dụ:

```
make/studentlib_static/build$ ar -t libtestStudent.a
Student.cpp.o
```

Ngoài ra thì chúng ta có thể sử dụng lệnh `nm` trong GNU để liệt kê tất cả các ký tự trong file object và binary. Trong trường hợp này thì lệnh này sẽ liệt kê các ký tự trong thư viện student và kiểu của nó (ví dụ như T là code, U là không xác định, R là dữ liệu read-only). Thông tin này sẽ rất hữu dụng cho việc debug các vấn đề có thể xảy ra với static library

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/studentlib_static/build$ nm -C libtestStudent.a

Student.cpp.o:
                 U __cxa_atexit
                 U __dso_handle
0000000000000000 t _GLOBAL__sub_I__ZN7StudentC2ENSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEEE
                 U memcpy
                 U __stack_chk_fail
0000000000000000 T Student::display()
00000000000000a0 T Student::Student(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >)
00000000000000a0 T Student::Student(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >)
                 U std::ctype<char>::_M_widen_init() const
0000000000000000 W std::ctype<char>::do_widen(char) const
                 U std::ostream::put(char)
                 U std::ostream::flush()
                 U std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::_M_create(unsigned long&, unsigned long)
                 U std::ios_base::Init::Init()
                 U std::ios_base::Init::~Init()
                 U std::basic_ostream<char, std::char_traits<char> >& std::__ostream_insert<char, std::char_traits<char> >(std::basic_ostream<char, std::char_traits<char> >&, char const*, long)
                 U std::__throw_bad_cast()
                 U std::__throw_logic_error(char const*)
                 U std::cout
0000000000000000 b std::__ioinit
0000000000000000 V typeinfo for Student
0000000000000000 V typeinfo name for Student
0000000000000000 V vtable for Student
                 U vtable for __cxxabiv1::__class_type_info
```



## Ví dụ 5: Sử dụng một shared hoặc static library

Một khi thư viện đã được tạo qua ví dụ 3 và ví dụ 4 thì câu hỏi tiếp theo là chúng ta có thể sử dụng các thư viện đấy trong project của chúng ta như nào? CMake có thể được sử dụng để sinh ra Makefile trong project của chúng ta nhằm đơn giản hóa việc này.

Dưới đây là nội dung của CMakeLists.txt có thể được sử dụng để build một chương trình link đến lib (là lib shared hoặc static), Trong ví dụ này thì shared lib được sinh ra trong ví dụ 3 sẽ được sử dụng và một chương trình C++ ngắn đã được viết để sử dụng các chức năng của lib đó. Nội dung của đoạn code ngắn này cũng được trình bày phía dưới và cũng có thể được tìm thấy ở [đây](https://github.com/derekmolloy/exploringBB/tree/master/extras/cmake/usestudentlib)

```
cmake_minimum_required(VERSION 2.8.9)
project (TestLibrary)

#For the shared library:
set ( PROJECT_LINK_LIBS libtestStudent.so )
link_directories( ~/exploringBB/extras/cmake/studentlib_shared/build )

#For the static library:
#set ( PROJECT_LINK_LIBS libtestStudent.a )
#link_directories( ~/exploringBB/extras/cmake/studentlib_static/build )

include_directories(~/exploringBB/extras/cmake/studentlib_shared/include)

add_executable(libtest libtest.cpp)
target_link_libraries(libtest ${PROJECT_LINK_LIBS} )
```

```
int main(int argc, char *argv[]){
   Student s("Joe");
   s.display();
   return 0;
}
```

Project có thể được build và chạy theo các bước dưới đây. Trong trường hợp build fail thì các bạn hãy check xem trong CmakeLists.txt đường dẫn đến shared lib đã đúng chưa nhé:

```
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/usestudentlib/build$ cmake ..
-- Configuring done
-- Generating done
-- Build files have been written to: /home/luong.the.vinh/Workspaces/Examples/exploringBB/extras/cmake/usestudentlib/build
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/usestudentlib/build$ make
Scanning dependencies of target libtest
[ 50%] Building CXX object CMakeFiles/libtest.dir/libtest.cpp.o
[100%] Linking CXX executable libtest
[100%] Built target libtest
FRAMGIA\luong.the.vinh@framgia0221-pc:~/Workspaces/Examples/exploringBB/extras/cmake/usestudentlib/build$ ./libtest
A student with name Joe
```

## Lời kết

Các ví dụ ở trên hi vọng đã mang lại cho các bạn có cái nhìn ngắn gọn và dễ hiểu về công dụng và cách sử dụng cơ bản của CMake. Để có thể tìm hiểu sâu hơn về Cmake và cập nhật những thông tin mới nhất thì các bạn có thể ghé qua trang `www.cmake.org`. Hẹn gặp lại các bạn trong những bài đăng sau



Nguồn: http://derekmolloy.ie/hello-world-introductions-to-cmake/#Source_Code_for_this_Discussion