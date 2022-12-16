Chào mọi người, hôm nay mình chia sẻ cách đơn giản để giảm ứng dụng của file apk  từ ~20Mb xuống còn ~6Mb,  khi build ứng dụng với React Native.

Trong thư mục gốc của RN(React Native), tìm đến file build.gradle:

 ![](https://images.viblo.asia/8dbc108f-aa8e-44ae-a869-02cb8e9dd500.png)

Trong file build.gradle, các bạn thay đổi giá trị của 2 biến sau thành false

`enableSeparateBuildPerCPUArchitecture = false` 

`enableProguardInReleaseBuilds= false`

Mặc định sau khi build ứng dụng với React Native thì file apk sẽ có tên app-release.apk, bởi build.gradle sẽ combine tất cả các kiến trúc arm x86 và x64 tạo để thành một file apk duy nhất. Tuy nhiên, việc này sẽ làm cho dung lượng của file apk trở nên vô cùng lớn (x4 lần cho tất cả các kiến trúc).

 Sau đó, chúng ta có thể lựa chọn file apk với dung lượng size nhỏ hơn để  kiểm tra ứng dụng hoặc upload lên Google Play

Bài viết tham khảo: https://medium.com/@aswinmohanme/how-i-reduced-the-size-of-my-react-native-app-by-86-27be72bba640