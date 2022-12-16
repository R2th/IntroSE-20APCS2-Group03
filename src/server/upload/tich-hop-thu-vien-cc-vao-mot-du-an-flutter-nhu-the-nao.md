![](https://images.viblo.asia/a070fcda-8d7a-4bb0-8e10-0fc0d145feea.png)


Chào các bạn :grinning: hôm nay rảnh rỗi thì mình viết một bài hướng dẫn về cách tích hợp một thư viện C/C++ vào một dự án Flutter. Thì cũng khá đơn giãn thôi vì Flutter đã cũng cấp cho chúng ta một thư viện khá hữu ích để giải quyết vấn đề trên đó là [dart:ffi](https://api.dart.dev/dev/2.14.0-209.0.dev/dart-ffi/dart-ffi-library.html) .

FFI là từ viết tắt  **Foreign function interface** cho phép chúng ta gọi các hàm C / C ++ trên cả nền tảng iOS và Android mà không cần tạo liên kết Java / Objective-C. 

# 1. Binding từ C đến Dart
Như ta đã biết thì C có nhiều kiểu giá trị để trả về thì để ánh xạ nó đến Dart thì phải thông qua thư viện FFI như là một cầu nối giữa 2 ngôn ngữ để ánh xạ qua nhau. Dưới đây sẽ chỉ rõ cho các bạn cách để ánh xạ các kiểu giá trị với nhau.

Danh sách cho việc khai báo giá trị cho các biến.
![](https://images.viblo.asia/eaa2c641-cff3-4a6c-8336-b0072e086e10.png)

Danh sách cho việc khai báo giá trị cho các hàm.

![](https://images.viblo.asia/15d23f6d-9386-4951-9862-32c18d05b3e4.png)

Mình chỉ liệt kê một số kiểu giá trị cơ bản, ngoài ra còn có nhiều giá trị khác. Các bạn cố gắng tìm hiểu nhé :grin::grin::grin:
# 2. Tạo một Plugin
Tạo một plugin có tên là `my_native` ở đây bạn có thể đặt tên bất kỳ tuỳ vào bạn.
```
$ flutter create --platforms=android,ios --template=plugin my_native
$ cd my_native
```
Thế là hoàn tất.
 
![](https://images.viblo.asia/0836dfaf-75a0-4eeb-b30b-380a3ed2a99c.png)
# 3. Thêm thư việc C/C++ vào project
Vì chạy cross-platform nên bạn cần thông báo cho cả Android và iOS để có thể được biên dịch và liên kết đến thư viện..

Bạn thêm các nguồn vào thư mục iOS vì CocoaPods không cho phép bao gồm các nguồn phía trên tệp podspec. Không bắt buộc phải sử dụng cùng một nguồn cho cả iOS và Android. Tất nhiên, bạn có thể thêm các nguồn dành riêng cho Android vào thư mục Android và sửa đổi **[CMakeLists.txt](https://developer.android.com/studio/projects/configure-cmake)** một cách thích hợp.

Thư viện FFI chỉ có thể liên kết với các ký hiệu C, vì vậy trong C ++ các ký hiệu này phải được **extern** C. Bạn cũng nên thêm các thuộc tính để chỉ ra rằng các ký hiệu được tham chiếu từ Dart, để ngăn trình liên kết loại bỏ các ký hiệu trong quá trình tối ưu hóa thời gian liên kết.

Ở đây mình sẽ code một hàm cộng hai số đơn giản:
```
#include <stdint.h>

extern "C" __attribute__((visibility("default"))) __attribute__((used))
int32_t native_add(int32_t x, int32_t y) {
    return x + y;
}
```

## 3.1 Thêm thư viện vào cho Android:
Trong thư mục **native_add**  mình có thêm file **CMakeLists.txt** vào:

![](https://images.viblo.asia/574f8bf9-d946-4d27-9c5f-ba8b7e3297d5.png)

Bạn có thể thêm file **CMakeLists.txt** ở bất kì đâu nhưng ở trong build.gradle của Android phải trỏ đúng **path** của file thì mới hoạt động.

Nội dung file **CMakeLists.txt** của mình trong này có 2 phần: 
* cmake_minimum.
* add_library: (Tên thư viện) (Thiết lập SHARED cho file) (path của file)

```
cmake_minimum_required(VERSION 3.4.1)

add_library(native_add SHARED ../ios/Classes/native_add.cpp)
```

Cuối cùng là trong file **build.gradle**:
```
android{
    ...
    externalNativeBuild {
        cmake {
            path file('../../native_add/android/CMakeLists.txt')
        }
    }
 }
```

## 3.2 Thêm thư viện vào cho iOS:
Đối với iOS thì đơn giản hơn nhiều chỉ cần thêm thư viện vào file **Runner.xcworkspace** của folder iOS là được.

![](https://images.viblo.asia/b629b37b-b836-400e-a13f-dff32652be18.png)

# 4. Tạo cầu nối bằng FFI
Ở các bước trên mình đã hoàn tất việc tạo thư viện và thêm thư viện vào trong folder của 2 OS. Sau đây mình sẽ tạo một cầu nối để **dart** có thể gọi đến hàm của thư viện **native_add.cpp**. 

Tạo một file **native_add.dart** để làm cầu nối:

```
import 'dart:ffi' as ffi;
import 'dart:ffi';
import 'dart:io';

ffi.DynamicLibrary _lib = Platform.isAndroid
    ? ffi.DynamicLibrary.open('libnative_add.so')
    : ffi.DynamicLibrary.process();

final int Function(int x, int y) nativeAdd =
_lib.lookup<NativeFunction<Int32 Function(Int32, Int32)>>("native_add").asFunction();
```

FFI cung cấp cho ta hai loại liên kết **Dynamic** và **Static** linking.

**Static linking**: Cũng giống với định nghĩa trong C thì nó chỉ được gọi trong quá trình compile time.

**Dynamic linking**:  Nó sẽ được gọi trong quá trình runtime.  Có thể được thực thi bằng cách gọi **DynamicLibrary.executable** hoặc **DynamicLibrary.process.**

Lý do tại sao lại là file **libnative_add.so** *(vì đây là binding nên bạn phải để từ lib + tên thư viện của bạn ở đây tên file của mình là nativeadd)*:

Vì trên Android, một thư viện được liên kết động được phân phối dưới dạng một tập hợp các tệp **.so (ELF)**. Trên iOS, nó được phân phối dưới dạng thư mục **.framework** nhưng ở đây mình không thêm thư viện như một framework nên không cần dùng đến.

# 5. Build lên test:
Bước cuối thì đơn giản rồi, bạn vào file **main.dart** và gọi hàm thôi.
```
Text('1 + 2 == ${nativeAdd(1, 2)}');
```
 Thành quả:
 Trên Iphone 12 Pro Max :heart_eyes::heart_eyes:
 
 ![](https://images.viblo.asia/343f86ce-67a5-4bdc-b175-0b3ecca11e1d.png)
 

Trên Pixel 3 :heart_eyes::heart_eyes:

![](https://images.viblo.asia/b4829d90-fb34-4a86-94cd-3359d6fd2ff4.png)

# 6 Kết luận:
Bài viết của mình chỉ đơn giản thêm một thư viện C/C++ với hàm đơn giản giúp các bạn có cái nhìn tổng quan và cách thiết lập cho cả 2 OS. Hy vọng bài viết giúp ích được cho các bạn.:heart_eyes::heart_eyes::heart_eyes:

Cảm ơn các bạn đã theo dõi. :grin::grin:

Bài viết tham khảo:


>Flutter:  https://flutter.dev/docs/development/platform-integration/c-interop

> ArtFlutter: https://www.youtube.com/watch?v=5atLUFlfmXk