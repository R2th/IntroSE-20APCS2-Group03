![](https://images.viblo.asia/a1be630a-329d-4ce2-8472-d7d636251c87.JPG)

Android Studio hiện cung cấp rất nhiều plugin khác nhau với vô vàn những tác dụng. ngay cả khi bạn search từ khóa "android studio plugin" (ASP) trên viblo hay google cũng có rất nhiều bài nói đến vấn đề này. Bài viết của mình sẽ chỉ tập trung đi vào những ASP mà thực sự cần thiết và nên sử dụng cho quá trình phát triển.

**Lưu ý: Phần mô tả của mỗi plugin đều rất dài nên mình chỉ nêu tóm tắt nhất có thể, các bạn hãy click vào tên plugin để vào xem thông tin chi tiết nhé.**

# [ADB Idea](https://plugins.jetbrains.com/plugin/7380-adb-idea/)


![](https://images.viblo.asia/f584e18d-b47b-4779-9e1a-f0ceba70f6ca.png)

Thêm những lệnh ADB sau cho Android Studio và Intellij:
* ADB Uninstall App
* ADB Kill App
* ADB Start App
* ADB Restart App
* ADB Clear App Data
* ADB Clear App Data and Restart
* ADB Revoke Permissions
* ADB Start App With Debugger
* ADB Restart App With Debugger

Có 2 cách để gọi các câu lệnh này:
* Tools->Android->ADB Idea menu
![](https://images.viblo.asia/63cb2fd6-811e-4133-999e-f41bdd3f2706.jpeg)

* Tìm "adb" trong "Find Actions" (osx: cmd+shift+a, windows/linux: ctrl+shift+a)
![](https://images.viblo.asia/59518995-9a7c-487a-908f-93b453124419.png)

# ADB Wifi

![](https://images.viblo.asia/691412f2-5a69-429e-aed8-2b1232c59b62.png)

Kết nối tới device một lần để nhận biết và có thể chạy adb qua wifi các lần saumà không còn phải lo cắm dây quá nhiều gây ra chai pin hay dây chập chờn không.

Có nhiều plugin và bạn có thể chọn cái phù hợp nhất.

# [Android Drawable Importer](https://plugins.jetbrains.com/plugin/7658-android-drawable-importer/)

Plugin có 3 chức năng chính sau:
1. AndroidIcons and Material Icons Drawable Import 

![](https://images.viblo.asia/f0c4a685-4804-46b2-98c6-6f30567a180c.png)

![](https://images.viblo.asia/c9ff0645-80a3-42cb-b6f5-9b3f4de47c20.png)

2. Batch Drawable Import: import drawable từ một source file và auto gen các size dựa trên size gốc

![](https://images.viblo.asia/1bf64681-8da8-4b28-8175-795f76c2c5cf.png)

3. Multisource-Drawable: import drawable từ nhiều nguồn

![](https://images.viblo.asia/95e7b896-fe06-49e7-914e-f210a15d5a27.png)


# [Android Drawable Preview](https://plugins.jetbrains.com/plugin/10730-android-drawable-preview/)

Hiển thị preview của drawable trên source tree thay vì là default icon

![](https://images.viblo.asia/18f28bb7-ddd2-41fd-9d11-e08d49e4085d.png)

Android Studio 3.4 có thêm tab Resource Manager để bạn dễ quản lý resource cũng như kéo thả resource vào sử dụng trong code.

![](https://images.viblo.asia/7ea888cb-0a5f-40cc-baf6-930249093c8f.png)

# [Android Parcelable code generator](https://plugins.jetbrains.com/plugin/7332-android-parcelable-code-generator/) (java)

Cài đặt Android Parcelable code cho các field của class

![](https://images.viblo.asia/6e630caf-c8dd-4513-9813-2a21905420d1.png)

# [AndroidLocalize](https://plugins.jetbrains.com/plugin/11174-androidlocalize/)
Hỗ trợ chuyển đồi string res sang các ngôn ngữ khác.

Thực hiện theo các bước sau:
1. Chọn file values/strings.xml.
2. Right-click và chọn Convert to other languages.
3. Chọn ngôn ngữ để dịch.
4. Click ok.

![](https://images.viblo.asia/1f75fcdd-c661-4be6-a038-aeb9d31b0461.png)

# [Dart](https://plugins.jetbrains.com/plugin/6351-dart/) (dart)

Plugin hỗ trợ ngôn ngữ dart cho Android Stduio.

![](https://images.viblo.asia/f9f1c685-7394-4ab3-bd8d-384e20cc97d9.png)

# [Databinding Support](https://plugins.jetbrains.com/plugin/9271-databinding-support/)

Pkugin hỗ trợ đơn giản hóa các thao tác với xml khi sử dụng databinding. Plugin gồm các chức năng sau:
* Convert non-databinding layout to databinding layout
* Add data tag
* Add import tag
* Add variable tag
* Wrap with @{}
* Wrap with @={}
* Switch between @{} and @={}
* Jump from a class to layouts that the instance is binded

![](https://images.viblo.asia/f81f5468-3ccc-4e25-9c4c-f89fbd27dea8.png)

# [Flutter](https://plugins.jetbrains.com/plugin/9212-flutter/) (flutter)

Plugin hỗ trợ phát triển Flutter app, bắt buộc phải có với các bạn Flutter dev.

![](https://images.viblo.asia/d35bc97c-769c-4728-9d44-4fcf8a54b2f8.png)

# [GsonFormat](https://plugins.jetbrains.com/plugin/7654-gsonformat/) (java)

Plugin convert json to java class

![](https://images.viblo.asia/f9904ebf-222f-43f7-88b3-8fa320330198.png)

# [JSON To Kotlin Class (JsonToKotlinClass)](https://plugins.jetbrains.com/plugin/9960-json-to-kotlin-class-jsontokotlinclass-/) (kotlin)

Plugin convert json to kotlin class

![](https://images.viblo.asia/a68b84b3-d382-481a-8ee2-c64bc2277295.JPG)

Với rất nhiều tùy chỉnh nâng cao:

![](https://images.viblo.asia/2263b8f3-da32-421f-8314-9e498cf74863.png)

# [Json2Dart](https://plugins.jetbrains.com/plugin/11460-json2dart/) (dart)

Plugin convert json to dart class

![](https://images.viblo.asia/c8a0bab7-411f-4bf3-930e-628f98bb8c56.JPG)


# [Kotlin](https://plugins.jetbrains.com/plugin/6954-kotlin/) (kotlin)
Plugin cung cấp hỗ trợ ngôn ngữ kotlin cho IntelliJ IDEA và Android Studio. 

Bắt buộc phải có cho các bạn dev Android hiện tại.

![](https://images.viblo.asia/1a90190f-c7ed-4a18-bb88-39adfda9869e.jpeg)

# [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation/)

Plugin cung cấp các tính năng sau:
* Escape/Unescape...
* Encode/Decode...
* Switch case...
* Increment/Decrement...
* Sort...
* Filter/Remove/Trim...
* Align...
* Swap Characters/Selections/Lines/Tokens
* Wrap or swap between " and  ' and `
* Switch file path separators: Windows<->UNIX

![](https://images.viblo.asia/8bc13fbe-0ae2-4f15-8b23-7412a86e14a0.JPG)




Danh sách trên ít nhiều cũng sẽ mang tính chủ quan của bản thân mình nên các bạn cảm thấy cần cứ comment góp ý nhé.

Mình sẽ tiếp tục cập nhật danh sách trong thời gian tiếp theo.

Xin chào và hẹn gặp lại