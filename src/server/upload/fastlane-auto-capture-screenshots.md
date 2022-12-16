## Cài đặt fastlane
### Yêu cầu:
OSX: Từ 10.9 trở lên
Ruby 2.0 trở lên
### Cài đặt:
Để cài đặt fastlane, chúng ta có thể sử dụng gem hoặc homebrew
Mở terminal và chạy câu lệnh sau:
```
[sudo] gem install fastlane -NV
```
hoặc
```
brew cask install fastlane
```
Sau đó chờ cho fastlane cài đặt hoàn tất.
## Auto capture screenshots
Fastlane hỗ trợ tự động chụp ảnh màn hình và đẩy lên store, tuy nhiên trong bài viết này mình chỉ thực hành cách chụp ảnh và lưu lại trong folder project.
### Tạo project ios
Chúng ta sẽ tiến hành tạo một project tabbed app trong ví dụ này.
![](https://images.viblo.asia/df16ea73-996e-478d-9506-d94405082021.png)
Khi tạo project chúng ta sẽ cần phải tích vào Include Unittest và Incluse UI test
![](https://images.viblo.asia/b7c558f1-5f12-4743-be83-74b6b16ce0eb.png)
Sau khi tạo xong project, chúng ta sẽ cần vào phần Edit scheme để cài đặt
![](https://images.viblo.asia/bca89058-102a-47c4-b596-7557a3a1d64a.png)
Sau khi chọn mục Edit scheme xong, chúng ta se xuất hiện một cái bảng, nhìn xuống phía dưới và tick vào mục Shared. Điều này cho phép khi thiết lập fastlane cho project thì có thể thấy được nó. 
![](https://images.viblo.asia/a774443e-140b-4424-a282-6bfa845e9aa7.png)
### Cài đặt fastlane cho project
* Bước 1: Mở terminal và trỏ đến folder project.
* Bước 2: Chạy câu lệnh
```
fastlane init
```
```
export LC_ALL=en_US.UTF-8
```
```
export LANG=en_US.UTF-8
```
Sau khi chạy xong, vào thư mục project chúng ta sẽ thấy có thêm 3 tệp tin: fastlane, gemfile, gemfile.lock.
Trong thư mục fastlane sẽ chứa các tệp tin cấu hình. 
* Bước 3. Mở thư mục fastlane và mở file Snapfile lên (Sử dụng sublime text)
* Bước 4. Copy đoạn text sau vào và lưu lại
```
# A list of devices you want to take the screenshots from
devices([
  "iPhone 6s"
])
 
# A list of supported languages
languages([
  'en-US',
  'fr-FR'
])
 
# Where should the resulting screenshots be stored?
output_directory "./fastlane/screenshots"
 
# Clears previous screenshots
clear_previous_screenshots true
 
# Latest version of iOS
ios_version '11.0'
```
* Bước 5: Mở project lên và chọn mục UITests, thêm file SnapshotHelper.swift vào thư mục đó (File này được sinh ra trong thư mục fastlane)
![](https://images.viblo.asia/33d9deaa-4e46-4959-b0fc-92663174f121.png)
Sau đó mở file: AutoSnapshotUITests.swift lên và viết thêm cho nó một test function
![](https://images.viblo.asia/139e11a3-e0cb-4d43-b6e6-41907663ef5e.png)
Sau đó lưu lại và tắt xcode project đi.
* Bước 6: Ở terminal, chạy câu lệnh
```
fastlane screenshots
```

Sau khi quá trình chạy hoàn tất, trong thư mục fastlane sẽ tạo ra thêm thư mục screenshots (bên trong có chứa ảnh) và tự động mở trình duyệt để show ra ảnh đã chụp được với từng ngôn ngữ đã được thiết lập. 
![](https://images.viblo.asia/4c3712ef-6469-422a-8e7c-013ab4dbf2c0.png)