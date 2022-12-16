# 1. Khái quát về Reverse Engineering
![](https://images.viblo.asia/8aa7f8f6-90bf-4c35-9bbf-c64dcfb59e2c.jpg)

Reverse Engineering là quá trình tách biệt một thứ gì đó riêng biệt để theo dõi cách hoạt động của chúng. Decompiling là một dạng của Reverse Engineering , 
nơi mà một đối tượng nào đó hay cụ thể là một ứng dụng mobile có thể được phân tích ra thành source code của nó.

Một ứng dụng Android dạng nhị phân được gọi là APK (Android Package Kit) , nó chứa dữ liệu ở dạng Dalvik Executable (.DEX) được build từ DVM (Dalvik Virtual Machine - Một implementation của JVM)

# 2. Smali
Smali/BackSmali là một Assembler/Disassembler được dành cho .Dex format , được sử dụng bởi Dalvik.

Smali code , thứ mà chúng ta mong muốn có thể truy cập ,sửa đổi , có thể hiểu tương đương như những ngôn ngữ hợp ngữ hay ngôn ngữ C.
Để hiểu thêm về Smali code , chúng ta cùng xem qua quá trình biên dịch của một ứng dụng Android 

![image.png](https://images.viblo.asia/ce03b8fc-9b14-4298-bd0c-c7d32d4c9495.png)

Đây là sơ đồ chi tiết của quá trình biên dịch một chương trình Java và một ứng dụng Android

Chúng ta có thể thấy quá trình biên dịch ứng dụng Android có thêm một số bước so với một chương trình Java thông thường .
Sau khi được biên dịch ra JavaBytecode , chúng được chạy qua Dalvik Compiler. Sau đó Dalvik Bytecode (.Dex format)  được sinh ra và DVM sẽ khởi chạy
chúng thành ứng dụng Android.

Như vậy , Smali tools giúp dịch ngược bytecode trong .Dex file thành smali code.

Tuy nhiên, mặc dù Smali là một ngôn ngữ hybrid, sử dụng opcodes và có thể đọc được nhưng để hiểu được chúng thì không hề đơn giản chút nào.

>  There are still challenges that remain despite smali being a hybrid language; using opcodes as well as semi-readable code.

Nó không hẳn là ngôn ngữ hợp ngữ như assembly , nhưng nó cũng không phải là "readable code" , nó là sự kết hợp của 2 ngôn ngữ này mà những nhà phân tích
bắt buộc phải đọc hiểu nó.

# 3. Tiến hành dịch ngược APK

Ở đây chúng ta có thể kể đến một vài tool hỗ trợ như  **dex2jar** , **jadx** , **JD** , **JAD** , **Procyon** , **CFR**
Bây giờ chúng ta sẽ cùng thử dịch ngược APK với tool **jadx**:

Giao diện tool **Jadx** sau khi tải apk của một ứng dụng lên:

![image.png](https://images.viblo.asia/7c701e07-38a3-456e-810e-d8c4c8dcb0fb.png)

Đầu tiên chúng ta sẽ bắt đầu với việc phân tích file AndroidManifest. Đây là một phần rất quan trọng đối với một ứng dụng Android.
Nó cung cấp data về project structure, metadata , permission và các activity.

![image.png](https://images.viblo.asia/61e65f0a-8511-415d-9488-4d1edb61ed4a.png)

Ở đây chúng ta có thể thấy cấu trúc một file AndroidManifest như các permission , flags , theme ,activities,... được hiển thị giống y hệt trong source code.

Tiếp theo có thể xem qua một class model:

![image.png](https://images.viblo.asia/1449e8e9-7947-4ed1-9452-218e659b56b9.png)

Class model Category đã được dịch ngược sang mã Java , hiển thị khá chi tiết các trường , method trong class và cấu trúc của nó ở thanh tab bên trái !

# 4. Tài liệu tham khảo:

https://www.nowsecure.com/blog/2020/02/26/what-to-look-for-when-reverse-engineering-android-apps/

https://mobsecguys.medium.com/smali-assembler-for-dalvik-e37c8eed22f9

https://mobile-security.gitbook.io/mobile-security-testing-guide/android-testing-guide/0x05c-reverse-engineering-and-tampering