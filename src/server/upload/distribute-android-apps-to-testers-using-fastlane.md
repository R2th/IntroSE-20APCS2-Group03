Như các bạn đã biết hoặc chưa biết thì vào tháng 3 năm 2020, Frabric sẽ chính thức bị deprecated để tích hợp sang Firebase. Một số tính năng của Fabric bao gồm Crashlytics, Real-time Analytics (phân tích thời gian thực) sẽ đc tích hợp sang Firebase để mang đến cho bạn một nền tảng phát triển ứng dụng tốt hơn  
Chính vì vậy việc sử dụng fastlane để đẩy file build lên Fabric cũng sẽ bị diprecated theo. Cho nên trong bài viết này mình sẽ trình bày cách distribute file apk lên Firebase sử dụng Fastlane. Hy vọng bài viết sẽ hữu ích với bạn 
## I. Before you begin
### 1. Step1: install and setup fastlane
* Để install fastlane sẽ có 2 option dành cho bạn  
Option 1 : install fastlane sử dụng RubyGems   
Gem là một thư viện của Ruby. Nó không có gì khác biệt với các thư viện của các ngôn ngữ bình thường khác như PHP, Java hay Python tuy nhiên thư viện trong Ruby được gọi là GEM. Đơn giản chỉ có vậy.
Chi tiết hơn xem tại [đây](https://www.codehub.vn/Phan-Biet-GEM-BUNDLE-BUNDLER-va-RVM-Trong-Ruby)  nhé  
Run command sau
```javascript
sudo gem install fastlane -NV
```

Option 2: Bạn có thể sử dụng HomeBrew  

```javascript
brew cask install fastlane
```
* Setup fastlane  
Open terminal và trỏ vào đúng đường dẫn project bạn muốn config fastlane và gõ lệnh sau   
```javascript
fastlane init
```

Sau khi chaỵ lệnh fastlane sẽ yêu cầu bạn nhập một số thông tin, và sau đó fastlane sẽ tự động config cho bạn dựa trên những thông tin mà bạn đã cung cấp trước đó
Bạn có thể thấy thư mục fastlane gồm các file như bên dưới  
![](https://images.viblo.asia/4e1b46b0-732d-4c86-8e06-cda71c6ce6d2.png)  
Fastfile chính là file chứa tất cả những thông tin bạn cần để distribute file apk
### 2. Install or update FirebaseCLI  
Firebase CLI như một thành phần dùng để kết nối giữa project của bạn ở local và firebase
Firebase CLI là một tiện ích được sử dụng để quản lí các dự án Firebase và thực hiện các tác vụ như quản lí cơ sở dữ liệu thời gian thực từ dòng lệnh trên các thiết bị đầu cuối . Firebase CLI cũng là phương thức mà Firebase Cloud Function được triển khai và quản lý
có 3 cách để install Firebase CLI   
**cách 1: automatic install script**   
Bạn chỉ cần chạy một lệnh duy nhất và sau đó hệ thống sẽ tự động tải xuống version CLI phù hợp nhất với hệ điều hành trên máy bạn
recomment cách này cho những bạn là new developers, chưa biết sử dụng Node.js   
chạy lệnh sau:
```javascript
curl -sL firebase.tools | bash
```
**cách 2: standanlone binary (nhị phân độc lập)**  
* download Firebase CLI binary: [Linux](https://firebase.tools/bin/linux/latest)  
* set up firebase  
```javascript
chmod +x ./firebase_tools
```
Thêm đường dẫn Firebase CLI  
```javascript
PATH=$PATH:~/opt/bin
```
hoặc 
```javascript
PATH=~/opt/bin:$PATH
```
* Sign in and test Firebase CLI  
sign in firebase
```javascript
firebase login
```  
lệnh trên sẽ connect từ thiết bị local của bạn tới firebase và cho phep bạn truy cập vào Firebase project  

**cách 3: sử dụng npm (Node package manager)** 
```javascript
npm install -g firebase-tools
```  
sau đó tiếp tục Sign in and test Firebase CLI giống như cách 2 bên trên mình đã trình bày

### 3.  Distribute file apk using fastlane
để làm được điều này bạn cần thêm một lane  “firebase_app_distribution” vào trong Fastfile
Sau đây là một ví dụ về việc định cấu hình  cho lane đó nhé   
```javascript
platform :android do
      desc "My awesome app"
      lane :distribute do
          build_android_app(...) # build_android_app is a built-in fastlane action.
          firebase_app_distribution(
              app: "1:123456789:android:abcd1234",
              testers: "tester1@company.com, tester2@company.com",
              release_notes: "Lots of amazing new features to test out!",
              firebase_cli_path: "/absolute/path/to/firebase/cli/binary"
          )
      end
  end
```
trong khối block trên có sử dụng một số params để định cấu hình cho lane, sau đây mình sẽ trình bày về một số params thường dùng


|firebase_app_distribution params | |
| -------- | -------- 
| app     | chính là Firebase app ID. bạn có thể tìm thấy nó trong Filebase console    
![](https://images.viblo.asia/1ada08e3-dea6-4e41-9613-777beb9a4c8c.png)   
chọn Project setting    
![](https://images.viblo.asia/d70fc8f2-6e56-4e11-8a5d-31439bf2eb8d.png)



|  | | 
| -------- | -------- |
| firebase_cli_path     | Đường dẫn tuyệt đối đến thư viện Friebase CLI     | 
| apk_path     | Đường dẫn tuyệt đối đến file apk mà bạn muốn upload     | 
| release_notes ,  release_notes_file    | Bạn có thể note trực tiếp  **release_notes: "Text of release notes"**  hoặc thông qua đường dẫn file  **release_notes_file: "/path/to/release-notes.txt"**   | 
|Testers, tester_file      | Chứa địa chỉ email mà bạn muốn invite để test.  bạn có thể chỉ định email cụ thể **testers: "ali@example.com, bri@example.com, cal@example.com"**     hoặc bạn có thể đưa đường dẫn đến file chứa danh sách các email mà bạn muốn invite  teste**rs_file: "/path/to/testers.txt"**   | 
| groups, groups_file     | Chứa group tester mà bạn muốn invite     | 

Và cuối cùng run dòng lệnh sau để distribute app
```javascript
fastlane <lane>
```
Sau khi distribute app bạn có thể theo dõi trạng thái của từng tester mà bạn đã invite trong Filebase console  
## III. Tài liệu tham khảo    
https://medium.com/@ryanisnhp/firebase-app-distribution-and-fastlane-5303c17b4395  
https://firebase.google.com/docs/app-distribution/android/distribute-fastlane 

### **Thanks for Reading :D**