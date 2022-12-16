# 1.Giới thiệu
Cocos2d-x là framework lập trình game đực viết bằng ngôn ngữ C++. Nhưng đôi khi game cần tích hợp Sdk của bên thứ 3. Sdk cho từng platform sẽ được viết bằng các ngôn ngữ khác nhau. Bên Ios Sdk có thể được đóng gói bằng 1 framework viết bằng objective C hoặc Swift, bên android thì đa phần sẽ được viết bằng java. Hôm nay mình sẽ hướng dẫn các bạn cách gọi function java trong C++ với JNI.
# 2.JNI là gì?
JNI (java native interface) là framework cho phép gọi các hàm java trong JVM(java virtual machine)  từ các ngôn ngữ thấp hơn như C++, C, assembly... Cocos2dx cung cấp 1 class singleton để có thể sử dụng JNI đó là JNIHelper, vì vậy muốn sử dụng JNI trong dự án chúng ta phải include JNIHelper.h.
# 3.Cách làm
Trước tiên trong file .cpp cần gọi function java chúng ta cần include JNIHelper:
``` 
#include "platform/android/jni/JniHelper.h"
```
Khởi tạo một jni bằng câu lệnh :
```
cocos2d::JniMethodInfo methodInfo;
```
### - Gọi void function java không có tham số
Ví dụ: ta có static void TestJNI() trong Activity.java, gọi function này trong C++ như sau :
```
if (JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/cpp/AppActivity", "TestJNI",  "()V")) {  
      methodInfo.env->CallStaticVoidMethod(t.classID, t.methodID);
      methodInfo.env->DeleteLocalRef(t.classID);
 }
 ```
### - Gọi function java có giá trị trả về và tham số
Việc gọi function này sẽ phức tạp hơn 1 chút. Ví dụ ta có function java sau:
static bool sayHello(String to, int times);
trong C++ ta gọi function này như sau:
```
JniMethodInfo t;
 if (JniHelper::getStaticMethodInfo(t, "MyAwesomeJavaClass", "sayHello", "(Ljava/lang/String;I;)Z;")) { 
 const char* myName = "Beautiful Name";
 int times = 3;
 jstring stringArg1 = t.env->NewStringUTF(myName);
 jboolean retV = t.env->CallStaticBooleanMethod(t.classID, t.methodID, stringArg1, times);
 t.env->DeleteLocalRef(t.classID);
 t.env->DeleteLocalRef(stringArg1);
 }
```
(Ljava/lang/String;I;) danh sách kiểu tham số truyền vào Z; là kiểu trả về của hàm. Các kiểu dữ liệu được quy định trong bảng sau:
![](https://images.viblo.asia/f8257a50-0e58-4a63-9e3e-70dbe17a370d.png)
# 4.Tổng kết
Jni cung cấp một giải pháp hữu hiệu nhất để gọi các function java trong C++ nói chung và cocos2d-x nói riêng qua đó góp phần đơn giản hoá việc tích hợp các SDK của bên thứ 3 hay các thư viện viết bằng java vào trong Game.
Trong bài viết tiếp theo mình sẽ giới thiệu với cái bạn cách để gọi 1 function C++ trong java. Điều này hữu ích khi có callback từ SDK của bên thứ 3 yêu cầu cần được sử lý trong C++.
Hy vọng bài viết này có thể giúp ích cho các bạn. Xin chào và hẹn gặp lại.