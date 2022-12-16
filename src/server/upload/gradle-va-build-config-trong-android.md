# Lý thuyết về Gradle và Build Config trong Android
## 1. Gradle là gì?<br>
#### 👉️ Là một bộ công cụ build nâng cao - An Advanced build toolkit<br>
#### 🤜 Gradle chạy độc lập với Android Studio, chính vì vậy có thể build app trên máy mà không cần cài Android Studio (CI server)<br>
## 2. Hình ảnh thể hiện quá trình Build app<br>
![](https://images.viblo.asia/f8cb2736-6507-475e-ad97-7fda8caa549c.PNG)<br>
## 🎉 Có thể giải thích quá trình build từ ảnh trên như sau: <br>
#### 🍌 Bước 1: Compiler chuyển các thành phần như source code -> file DEX (Dalvik executable) và resource files -> compiled resource<br>
#### 🍌 Bước 2: APK Packager kết hợp với DEX file vào compiled resource thành APK<br>
#### 🍌 Bước 3: Sign key APK đó bằng Debug or Release Keystore<br>

#### 📢📢📢📢📢 Với 2 loại Debug version và Release version. Đối với Debug version thì debug Keystore được Android Studio tự động config để Packager sử dụng. Còn Release version cần cung cấp release Keystore<br>
#### 🍌 Bước 4: Packager sử dụng zipalign tool để optimize app để tối ưu memory khi chạy trên device sau đó mới generate thành APK.<br>
## 3. Custom build config<br>
##### Build types: thường gắn với các stage của chu trình phát triển: debug, release, sit, uat, etc,..<br>
![](https://images.viblo.asia/3a512591-ad4f-4fb9-8843-43e9471d9ad1.PNG)<br>

##### 🥒 Product flavors: mỗi loại thì đại diện cho một version của app: Free, Test, Release app <br>
![](https://images.viblo.asia/66ab72f0-4934-423e-9f14-5099c18378ce.PNG)<br>
##### 🥒 Build Variant: mỗi loại là sự kết hợp của một productFlavor và build type: debug version, free version, paid version, release version, ...<br>
![](https://images.viblo.asia/787e8c07-357d-49ed-9d94-83e9c38321d8.PNG)<br>

##### 🥒 Signing: có thể chỉ định các Signing config để khi build sẽ tự sign key theo signing config đã chỉ định<br>

##### 🥒 Dependency: quản lý các dependency local và remote Android studio support tận răng thay vị download add thủ công vào app<br>

##### 🥒 Code and Respurce shrinking: loại bỏ code và resource không dùng đến -> Optimize app<br>

##### 🥒 ProguardFiles: hỗ trợ trộn xào code khi build tránh bị dịch ngược mã<br>

## 4. Build Configuration files<br>
![](https://images.viblo.asia/99eb99c6-d4f8-448d-afa3-b4588dcd33d1.PNG)<br>
#### ⚽️ `settings.gradle`: Xem Project include bao nhiêu module<br>
![](https://images.viblo.asia/432b4fae-f8c9-46ee-8c1d-7734d672391c.PNG)<br>
#### ⚽️ build.gradle (Project) : chứa config toàn bộ các module trong Project. Gồm 2 phần -> <br>
##### ⚽️⚽️ block buildscript: config repository và dependency cho chính Gradle, repository: jcenter, maven, dependency.<br>
##### ⚽️⚽️ block allprojects: config repository và dependency cho all module trong project: plugins, 3rd-party libaries. Tuy nhiên, không nên config ở đây mà nên config ở file build.gradle của từng Module.<br>
-----<br>
## 5. Kết bài<br>
### 🖖 Trên đây là toàn bộ về Gradle trong Android. Cảm ơn các bạn đã đọc. Xin chào và hẹn gặp lại!. 😋😋😋😋😋<br>
## 6.Link tham khảo<br>
#### [https://developer.android.com/studio/build](https://developer.android.com/studio/build)<br>
#### [https://www.journaldev.com/21533/android-build-types-product-flavors](https://www.journaldev.com/21533/android-build-types-product-flavors)<br>
#### [https://developer.android.com/studio/releases/gradle-plugin?gclid=CjwKCAjw2rmWBhB4EiwAiJ0mtZrpzn8HIz8BehWIoRNq4Um8GlUJ09BaejjghmWN7abQW5pODNFajBoCEJkQAvD_BwE&gclsrc=aw.ds](https://developer.android.com/studio/releases/gradle-plugin?gclid=CjwKCAjw2rmWBhB4EiwAiJ0mtZrpzn8HIz8BehWIoRNq4Um8GlUJ09BaejjghmWN7abQW5pODNFajBoCEJkQAvD_BwE&gclsrc=aw.ds)