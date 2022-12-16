### CMake, add thư viện và định nghĩa thư viện trong CMake
   ##### Giới Thiệu
   Khi chạy một chương trình c++, java, ... đơn giản ta có thể dụng command line để build và chạy chương trình. Nhưng trong một dự án lớn với nhiều modunle khác nhau, khi đó ta không thể sử dụng cmd/terminal để vào từng thư mục vào build được. Trong trường hợp cmake là công cụ hỗ trợ build tốt nhất.
   
   Cmake là công cụ hỗ trợ trong việc build các chương trình lớn có nhiều modunle phức tạp.
   
   Cmake đang được sử dụng rất phổ biết hiện nay.
   #### Demo cmake
file: CMakeLists.txt
   ```
   cmake_minimum_required(VERSION 2.6)
   project(program)
   add_executable(program program.cpp)
```
file:program.cpp
```
#include<iostream>

int main()
{
   std::cout << "Hello World!" << std::endl;

   return 0;
}
```
run terminal:
```
cmake ..
make
./program
```
kết quả:
```
Hello Would!
```
#### Thêm thư viện
Thêm một thư viện:
```
add_library(MathFunctions mysqrt.cxx)
```
mysqrt.cxx có chức năng gọi mysqrt cung cấp chức năng tương tự như chức năng biên dịch hàm sqrt. Để sử dụng thư viện mới, chúng ta gọi lệnh add_subdirectory trong tệp CMakeLists.txt cấp cao nhất để thư viện sẽ được xây dựng.
```
include_directories ("${PROJECT_SOURCE_DIR}/MathFunctions")
add_subdirectory (MathFunctions) 
 
# add the executable
add_executable (Tutorial tutorial.cxx)
target_link_libraries (Tutorial MathFunctions)
```
Ta cũng có thể tự định nghĩa các hàm toán học của riêng mình:
```
# should we use our own math functions?
option (USE_MYMATH 
        "Use tutorial provided math implementation" ON) 
```
Liên kết thư viện được định nghĩa:
```
# add the MathFunctions library?
#
if (USE_MYMATH)
  include_directories ("${PROJECT_SOURCE_DIR}/MathFunctions")
  add_subdirectory (MathFunctions)
  set (EXTRA_LIBS ${EXTRA_LIBS} MathFunctions)
endif (USE_MYMATH)
 
# add the executable
add_executable (Tutorial tutorial.cxx)
target_link_libraries (Tutorial  ${EXTRA_LIBS})
```
#### Step 3: Cài đặt và kiểm tra
Tiếp theo là các quy tắc cài đặt và hỗ trợ thử nghiệm cho dự án. 

Thiếp lập tệp và thư viện sẽ được cài đặt bằng cách thêm 2 dòng sau vào tệp Mathakexit CMakeLists.txt:
```
install (TARGETS MathFunctions DESTINATION bin)
install (FILES MathFunctions.h DESTINATION include)
```
Đối với các ứng dụng các dòng sau được thêm vào tệp CMakeLists.txt để cài đặt tệp tiêu đề thực thi:
```
# add the install targets
install (TARGETS Tutorial DESTINATION bin)
install (FILES "${PROJECT_BINARY_DIR}/TutorialConfig.h"        
         DESTINATION include)
```

Xây dựng và cài đặt các tệp tiêu đề, thư viện thích hợp:
```
include(CTest)

# does the application run
add_test (TutorialRuns Tutorial 25)
# does it sqrt of 25
add_test (TutorialComp25 Tutorial 25)
set_tests_properties (TutorialComp25 PROPERTIES PASS_REGULAR_EXPRESSION "25 is 5")
# does it handle negative numbers
add_test (TutorialNegative Tutorial -25)
set_tests_properties (TutorialNegative PROPERTIES PASS_REGULAR_EXPRESSION "-25 is 0")
# does it handle small numbers
add_test (TutorialSmall Tutorial 0.0001)
set_tests_properties (TutorialSmall PROPERTIES PASS_REGULAR_EXPRESSION "0.0001 is 0.01")
# does the usage message work?
add_test (TutorialUsage Tutorial)
set_tests_properties (TutorialUsage PROPERTIES PASS_REGULAR_EXPRESSION "Usage:.*number")
```
Sau khi xây dựng, có thể chạy dòng lệnh "ctest" (chạy trong command line) để chạy thử nghiệm.

Nếu muốn thêm nhiều case khác nhau cho việc thử nghiệm, Chúng ta có thể tạo một macro:
```
#define a macro to simplify adding tests, then use it
macro (do_test arg result)
  add_test (TutorialComp${arg} Tutorial ${arg})
  set_tests_properties (TutorialComp${arg}
    PROPERTIES PASS_REGULAR_EXPRESSION ${result})
endmacro (do_test)
 
# do a bunch of result based tests
do_test (25 "25 is 5")
do_test (-25 "-25 is 0")
```





Nguồn: https://cmake.org/cmake-tutorial/