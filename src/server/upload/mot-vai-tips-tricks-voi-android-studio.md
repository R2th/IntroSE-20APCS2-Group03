# I. Giới thiệu
- Gần như 99,99% các bạn Android developers đều sử dụng Android Studio phải không :D Tuy nhiên IDE này khá cồng kềnh vì có rất nhiều chức năng hỗ trợ cho lập trình viên, thậm chí support cho developers đến tận chân răng và chắc đa phần các bạn đều không sử dụng đến hoặc chưa nghe đến bao giờ. Bài viết dưới đây mình sẽ hướng dẫn cho các bạn một số thủ thuật để cải thiện performance coding của các bạn ^^.

# II. Refactor Code
- Ít nhất vài lần các bạn phải chia tách các đoạn code ra các function riêng biệt nhằm code tường minh hơn, function không quá dài mà phải dùng **copy, cut, paste** để refactor code. Để tiết kiệm thời gian và giúp bạn refactore một cách pro hơn :D thì Android Studio có tool hỗ trợ refactore sau:

![](https://cdn-images-1.medium.com/max/800/1*2Zg6lU_1Wjt6cNYxVeEcsA.gif)

**Chọn trên thanh menu: Select->Refactor->Extract->Method** *(Ctrl+Alt+Shift+T)*

# III. Line Numbers & Method separators
- Hiển thị số thứ tự của các dòng và ngăn cách giữa các method.

![](https://cdn-images-1.medium.com/max/800/1*8AkF512mFmHIec_HvSmmUQ.gif)
- **Click on File -> Settings -> Editor -> General -> Appearance -> Select Line number/Select Method separators**

# IV. Inspect Tool
- Trong một số tường hợp bạn có thể quên các import, function, variable v.vv.. không sử dụng đến. Mà project bạn quá nhiều class nên không thể nào đi dò từng class một :D. Vậy bạn nên sử dụng **Inspect Tool** của Android Studio để giải quyết vấn đề trên.

![](https://cdn-images-1.medium.com/max/800/1*65gAemzh3UyTGoSaiq8QVw.gif)

- **Analyze -> Inspect code -> Chọn option bạn muốn inspect & nhấn “Ok”**

# V. Imports On The Fly
- Android Studio hỗ trợ tự động import với phím tắt **Alt + Enter**. Nếu việc import là rõ ràng như vậy, tại sao không để IDE tự nhận diện và import thay chúng ta :D.
- Chúng ta chọn trong menu như sau **File|Settings -> Editor -> General -> Auto Import -> Tick Optimize imports on fly & Add unambiguous imports on fly.**
- Ví dụ dưới đây sẽ giúp chúng ta hiểu hơn về vấn đề này:

![](https://cdn-images-1.medium.com/max/800/1*eOvGy8iaS40E1fNi_FpvBg.gif)

# VI. Gradle Tasks
- Nếu bạn thường xuyên đóng góp cho các project mã nguồn mở. Đa phần những project thường dùng Travis để build và chắc là cũng thường xuyên failed vì gradle build ko thành công.
- Sử dụng tác vụ **assembleDebug** trước khi tạo commit. Mờ side-bar bên phải chọn **Gradle -> Tasks -> build -> assembleDebug.** hoặc gõ lệnh sau vào terminal của Android Studio **./gradlew assembleDebug**
![](https://cdn-images-1.medium.com/max/800/1*ZE6msQc4UVTWBJfTxoGz3w.gif)

# VII. Favorite Keyboard shortcuts
- Đây là phần mình khá là quan tâm vì mình dùng thường xuyên những cụm shortcuts này.
- Mở file: **Ctrl+Shift+N**
![](https://cdn-images-1.medium.com/max/800/1*2TirvBMPunJ8PMARis5ffg.gif)
- Mở file được edit gần nhất **Ctrl+Shift+E**
![](https://cdn-images-1.medium.com/max/800/1*0LK0IrXyG5Ec3LCuccx9Hw.gif)
- Trỏ đến vị trí được edit gần nhất **Ctrl+Shift+Backspace**
![](https://cdn-images-1.medium.com/max/800/1*_m2-6FxkbKQyuswPfYhVVg.gif)
- Generate Getter & Setter **Alt + Insert**
![](https://cdn-images-1.medium.com/max/800/1*7N3KwTlekG8PzlKsepCwGA.gif)
- Mở Terminal của Android Studio **Alt + F12**
![](https://cdn-images-1.medium.com/max/800/1*9149nFxz-FFMVn0OYPhX3g.gif)
- Xóa dòng **Ctrl + Y** hoặc có thẻ dùng cut dòng **Ctrl + X** rồi paste vào đâu đó :D
![](https://cdn-images-1.medium.com/max/800/1*6bCSsjeyfvhoAXUh5GeRxA.gif)
- Duplicate line **Ctrl + D**
![](https://cdn-images-1.medium.com/max/800/1*6bCSsjeyfvhoAXUh5GeRxA.gif)
- Search Everywhere, đúng như tên gọi search mọi ngõ ngách trong Project luôn :D **Shift + Shift**
![](https://cdn-images-1.medium.com/max/800/1*pJwYfi4ZjSnxdGow71Ir3w.gif)
- Surround with **Ctrl+Alt+T**
![](https://cdn-images-1.medium.com/max/800/1*bsf4NMnexnXcJXgl_nuHDQ.gif)
- Reformat code **Ctrl + Shift + L** cái này thì khỏi phải bàn nhé, nhiều khi bí bách quá cũng ấn cho giải stress :D

# VIII. Summary
- Phía trên là 1 số **Tip & Trick** giúp các bạn tăng hiệu suất khi làm việc cùng với Android Studio. Ngoài ra đối với mỗi hệ điều hành khác nhau thì khả năng các shortcuts key trên có thể bị trùng với shortcuts của hệ thống, mình nghĩ các bạn nên tự custom cho mình các bộ shortcuts sao cho hợp lý với mình nhất cũng như tránh được trùng với shortcut của hệ thống
- Cảm ơn bạn đã đọc bài viết & Happy Reading ^^.
- Nguồn [Medium](https://medium.com)