Hôm nay tôi xin phép giới thiệu với các bạn một package thường được sử dụng để lưu trữ an toàn. Nó được xây dựng dựa trên  [react-native-keychain](https://www.npmjs.com/package/react-native-keychain) và tương thích với [redux-persist-sensitive-storage](https://www.npmjs.com/package/redux-persist-sensitive-storage).

Bước đầu tiên bạn cần làm là chạy lệnh sau:
```
$ npm install react-native-secure-storage --save
```
hoặc 
```
$ yarn add react-native-secure-storage
```
**Cài đặt tự động thì bạn chỉ cần làm như sau:**
```
$ react-native link react-native-secure-storage
```
**Cài đặt thủ công thì cần các thao tác:**
            
Trên IOS:
    
    
   1. Trong Xcode,  trên project navigator, click chuột phải ở Libraries -> sau đó thêm tập tin đến [Tên project của bạn]
    2. Đi đến mục node_modules -> react-native-secure-storage và thêm RNSecureStorage.xcodeproj
    3. Vẫn trong Xcode, trên  project navigator, chọn project của bạn. Thêm libRNSecureStorage.a vào Build Phases ➜ Link Binary With Libraries trong project của bạn.
    4. Nhấn Command + R  để reload lại project của bạn.
    
Trên Android:


   1. Mở file android/app/src/main/java/[...]/MainActivity.java trong project của bạn.
    2. Thêm lib : import li.yunqi.RNSecureStoragePackage;
    3. Thêm new RNSecureStoragePackage() trong danh sách lấy được về từ hàm getPackages()
    4. Bổ sung trong file android/settings.gradle:
        
    include ':react-native-secure-storage'
    project(':react-native-secure-storage').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-secure-storage/android')
    

5. Mở android/app/build.gradle và thêm vào trong dependencies dòng sau: 

```
 compile project(':react-native-secure-storage')
```

**Cách sử dụng**

Sau các bước cài đặt thư viện ở trên thì giờ là việc bạn phải triển khai việc save của mình trong component mà bạn muốn xử lý.
```
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'
 
async() => {
  const config = {
    accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
    authenticationPrompt: 'auth with yourself',
    service: 'example',
    authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
  }
  const key = 'someKey'
  await SecureStorage.setItem(key, 'some value', config)
  const got = await SecureStorage.getItem(key, config)
  console.log(got)
}
```
**Các Method bạn có thể sử dụng:**


   Với thư viện này có thể cho phép bạn sử dụng các method getItem, setItem, removeItem và getAllKeys của AsyncStorage trong [ React Native](http://facebook.github.io/react-native/). Thư viện này thì không hỗ trợ các callback và nó được thay thế bằng các param tuỳ chọn.
  
 Trong phần bổ sung, thư viện có một method *getSupportedBiometryType()*  nó trả về BIOMETRY_TYPE tức kiểu device mà nó hỗ trợ và một method canCheckAuthentication([{ authenticationType }]) kiểm tra xem authenticationType được quy định thì có sẵn hay không.
 
 **SecureStorage.ACCESS_CONTROL enum**
 

| key | Mô tả |
| -------- | -------- | -------- |
| USER_PRESENCE     | Ràng buộc truy cập vào một item với mỗi Touch ID hoặc passcode |
| BIOMETRY_ANY | Ràng buộc truy cập vào một item với mỗi Touch ID đối với bất kỳ fingers nào đã đăng kí |
| BIOMETRY_CURRENT_SET     | Ràng buộc truy cập vào một item với mỗi Touch ID cho fingers hiện tại đã đăng kí |
| DEVICE_PASSCODE | Ràng buộc truy cập vào một item với một passcode |
| APPLICATION_PASSWORD     |  Ràng buộc sử dụng mật khẩu do ứng dụng cung cấp để tạo khóa mã hóa dữ liệu. |
| BIOMETRY_ANY_OR_DEVICE_PASSCODE | Ràng buộc truy cập một item với mỗi Touch ID đối với bất kỳ fingers nào hoặc passcode đã đăng kí. |
| BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE     | Ràng buộc truy cập một item với mỗi Touch ID đối với fingers hoặc passcode hiện tại đã đăng ký.|

**SecureStorage.ACCESSIBLE enum**

| key | Mô tả |
| -------- | -------- | -------- |
| WHEN_UNLOCKED     | Dữ liệu trong keychain item chỉ có thể được truy cập  khi mà thiết bị được mở khoá bởi người dùng. |
| AFTER_FIRST_UNLOCK | Dữ liệu trong keychain item không thể được truy cập sau khi mà người dùng đã mở khoá một lần cho tận đến khi thiết bị được khởi động lại|
| ALWAYS     | Dữ liệu trong keychain item có thể luôn được truy cập bất kể thiết bị có bị khoá hay không |
| WHEN_PASSCODE_SET_THIS_DEVICE_ONLY |  Dữ liệu trong keychain item chỉ có thể được truy cập  khi mà thiết bị được mở khoá. Nó chỉ có hiệu lực khi có một passcode được cài trên thiết bị. Các item có các đặc tính này thì không bao giờ được chuyển sang các thiết bị mới|
| WHEN_UNLOCKED_THIS_DEVICE_ONLY     |  Dữ liệu trong keychain item chỉ có thể được truy cập  khi mà thiết bị được mở khoá bởi người dùng.  Các item có các đặc tính này thì không bao giờ được chuyển sang các thiết bị mới|
| AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY | Dữ liệu trong keychain item không thể được truy cập sau khi mà người dùng đã mở khoá một lần cho tận đến khi thiết bị được khởi động lại. Các item có các đặc tính này thì không bao giờ được chuyển sang các thiết bị mới|
| ALWAYS_THIS_DEVICE_ONLY     | Dữ liệu trong keychain item có thể luôn được truy cập bất kể thiết bị có bị khoá hay không. Các item có các đặc tính này thì không bao giờ được chuyển sang các thiết bị mới|


Bài viết được dịch từ [react-native-secure-storage](https://www.npmjs.com/package/react-native-secure-storage)