Chào các bạn, là một lập trình viên Android chắc hẳn bạn đã từng sử dụng qua Library (Thư viện) trong Android. Nó có thể là một thư viện mở được chia sẻ trên internet, hoặc một thư viện ra chính bạn tạo ra. 

Hôm nay mình sẽ chia sẻ kiến thức nhỏ mà mình biết được liên quan đến việc publish thư viện Android dưới lên Remote (Online) và Local. Với những khái niệm như Publish Library, Local Maven,….

### I. Khái niệm
Đầu tiên, Android Library là gì?
* Android Library có cấu trúc giống như Module ứng dụng Android.
* Android Library có thể bao gồm mọi thứ cần thiết để xây dựng một ứng dụng xây dựng: Source code, Resource file và một Android Manifest.
* Thay vì, tệp App build thành APK file, thì Library build thành AAR file(Android Archive) và sử dụng như một phần phụ thuộc của module ứng dụng Android.


### II. Sử dụng và Lợi ích
Vậy, khi nào sử dụng Android Library? 
Khi sử dụng nhiều ứng dụng mà bạn có một số thành phần giống nhau, chẳng hạn như activity, service hoặc UI layout người dùng. 

Một trong những lợi ích của việc sử dụng Library mà chúng ta có thể kể đến như là:
* Tăng tốc developemnt time.
* Tái sử dụng lại source code được phân chia chức năng cụ thể.

### III. Truy cập
* Tạo và keep Library trong Project
* Tạo and Publish it to global to truy cập chúng một cách remote hoặc share chúng tới các project khác. Một số cách thông dụng để publish Library lên remote. Một số nơi có thể kể tới
   1. Jitpack.io
   2. Maven Publish 
   3. Jfrog Bintray Artifactory ([Refer]((https://github.com/bintray/gradle-bintray-plugin)))

### IV. Tạo và Publish Library
1. Tạo Library: 
Để tạp library module bạn làm theo cách sau: Vào File > New > New Module. Trong cửa sổ Create New Module xuất hiện, nhấp vào Thư viện Android, sau đó nhấp vào Tiếp theo. Ở màn hình tạo Module mới xuất hiện, bạn chọn Thư viện Android, sau đó nhấn Next.

[![image](https://www.linkpicture.com/q/1_995.png)](https://www.linkpicture.com/view.php?img=LPic6322b4fc53ab1994425412)

Sau khi hoàn tất các thao tác tạo Lib và implement functions cần thiết

[![image](https://www.linkpicture.com/q/2_364.png)](https://www.linkpicture.com/view.php?img=LPic6323385981c0d750217726)

Bạn cũng có thể tạo 1 project thuần tuý là thư viện mà không có App Module kèm theo bằng cách đổi plugin trong Gradle file thành 

<pre>
 plugins {
    id 'com.android.library'
}
</pre>

[![image](https://www.linkpicture.com/q/2_367.png)](https://www.linkpicture.com/view.php?img=LPic632338d1745201205245695)

Vì bài này tập trung vào các publish Library nên mình chỉ làm một ví dụ đơn giản về nội dung của Library này về chức năng tính toán.

2. Push Project lên Github

[![image](https://www.linkpicture.com/q/4_175.png)](https://www.linkpicture.com/view.php?img=LPic63233af2c9a5f2019593489)

<pre>
-> git init
-> git add
-> git commit -m “calculated Library 1.0.0”

-> git remote add origin “Paste Your-Repository-Address”
-> git remote -v
-> git push origin master
</pre>


3. Tạo và publish version release trên Github

[![image](https://www.linkpicture.com/q/7_94.png)](https://www.linkpicture.com/view.php?img=LPic63233cb3b03772123005623)


4. Thêm repository vào Jitpack.io và click "Get it" version mong muốn.

[![image](https://www.linkpicture.com/q/9_25.png)](https://www.linkpicture.com/view.php?img=LPic63233d0131c8b1627628273)

5. Apply vào Main Project theo hướng dẫn 

[![image](https://www.linkpicture.com/q/10_64.png)](https://www.linkpicture.com/view.php?img=LPic63233d378d682561402762)

Cụ thể trong Project: 

[![image](https://www.linkpicture.com/q/11_69.png)](https://www.linkpicture.com/view.php?img=LPic63233d60d48c41077372383)

[![image](https://www.linkpicture.com/q/11_69.png)](https://www.linkpicture.com/view.php?img=LPic63233d60d48c41077372383)

Sau khi Sync và Download xong thư viện. Giờ chúng ta có thể sử dụng nó trong code.

Bài tiếp theo. Mình sẽ tiếp tục chia sẻ thêm về Local Maven và về tình huống cụ thể sử dụng nó.

Cảm ơn mọi người.

**Source code**: 

[Library](https://github.com/PhongPhungNgoc/CalculatedLibrary.git)

[Main Project](https://github.com/PhongPhungNgoc/CalculatedApp.git)