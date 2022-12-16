Hiện tại, Firebase App Distribution là công cụ phổ biến và hữu hiệu giúp việc phân phối ứng dụng đến tester trở nên dễ dàng. Phần này sẽ tập trung vào việc giới thiệu cách sử dụng fastlane cho việc đẩy file apk lên Firebase App Distribution. Qua đó có thể hỗ trợ phần nào xây dựng nên một hệ thống CI/CD giúp việc deploy ứng dụng một cách tự động.

# 1. Cài đặt
Bạn có thể phân phối các bản build cho tester, người dùng thử, bằng fastlane, một nền tảng mã nguồn mở tự động hóa việc xây dựng và phát hành các ứng dụng iOS và Android. Nó tuân theo các hướng dẫn đơn giản được định nghĩa trong Fastfile. Sau khi thiết lập fastlane và Fastfile, bạn có thể tích hợp App Distribution với cấu hình fastlane của mình.

## 1.1 Cài đặt fastlane
Phần hướng dẫn cài fastlane được môt tả đầu đủ tại **[Install and set up fastlane](https://docs.fastlane.tools/getting-started/android/setup/)**.

## 1.2 Cài đặt plugin firebase_app_distribution
Để thêm plugin firebase_app_distribution vào cấu hình fastlane, chạy lệnh sau từ thư mục gốc của dự án Android:
```
fastlane add_plugin firebase_app_distribution
```
Nếu trên terminal có đề xuất một lựa chọn, hãy chọn **Option 3: RubyGems.org**
![](https://images.viblo.asia/01e1869e-99c6-40bc-8e8d-70e9304b4cde.png)

# 2. Phân phối ứng dụng thông qua fastlane
## 2.1 Xác thực Firebase project
Trước khi có thể sử dụng plugin Fastlane, trước tiên bạn phải xác thực project Firebase của mình.
Có ba cách làm được đề cập bên dưới:
* Đăng nhập tài khoản Google thông qua hành động login của plugin: Cách này phải thao tác nên sẽ không được sử dụng trong mục đích tự động hóa quá trình build và đẩy file apk lên Firebase App Distribution.
* Sử dụng Firebase service account credentials
* Sử dụng Firebase CLI
Chúng ta sẽ chỉ tập trung vào tìm hiểu 2 cách làm sau mà thôi.

### 2.1.1 Xác thực project trên Firebase sử dụng Firebase service account credentials
1. Trên trang **[Google Cloud Platform console](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts/)**, chọn đúng project sau đó click vào **Create Service Account**

![](https://images.viblo.asia/05ff78f8-a3c1-44ed-bc52-0b8e238da1c6.png)

2. Tạo một account mới với quyền **Firebase App Distribution Admin**. Firebase App Distribution Admin là quyền bắt buộc phải có
3. Tạo một file json chứa private key cho tài khoản vừa rồi. Đảm bảo file json chứa private key này chỉ được gửi cho những ai có quyền vì nó cung cấp quyền Admin cho phần Firebase App Distribution trên project của bạn.

![](https://images.viblo.asia/47f85c0f-8484-44f0-9678-cf5bd0cc58d4.png)

4. Lưu trữ lại file json đó. Nó được dùng làm tham số **service_credentials_file** trong **firebase_app_distribution** action của fastlane.

### 2.1.2 Xác thực project trên Firebase sử dụng Firebase CLI
1. Cài đặt Firebase CLI bằng cách chạy câu lệnh:
```
curl -sL https://firebase.tools | bash
```

2. Chạy câu lệnh để login vào Firebase CLI
```
firebase login:ci
```

![](https://images.viblo.asia/8d430670-b13a-457f-aaed-3cab349c8bfb.png)

3. Sau khi chạy câu lệnh **firebase login:ci**, một URL xuất hiện trên terminal, bạn hãy login tài khoản firebase thông qua đường link đó.
4. Sau khi login thành công, trên terminal sẽ xuất hiện một token mới được in ra, các token trước đó sẽ vẫn không bị ảnh hưởng gì. Hãy lưu trữ lại token đó. Nó được sử dụng làm tham số **firebase_cli_token** trong **firebase_app_distribution** action của fastlane
![](https://images.viblo.asia/c6b3e865-e063-4d88-a4d8-30e715d56386.png)

## 2.2 Cài đặt Fastfile và phân phối ứng dụng
Để có thể phân phối file apk của ứng dụng tới tester bằng Firebase App Distribution, việc trước tiên phải build app để xuất ra file apk trước đã.

```
desc 'Build app on develop or product environment'
lane :build do |values|
# Check build type (debug or release)
branch = git_branch
if branch == 'master'
build_type = "release"
else
build_type = "debug"
end

puts "------------------- Stating build app  : #{build_type}:"
# Stating build app
gradle(task: 'clean' )
gradle(task: 'assemble', build_type: build_type)
puts "------------------- Build app type #{build_type} successfully!"
end
```

Trong đoạn code trên, mặc định khi branch là **master** thì sẽ làm build bản release, còn các branch khác, bản build đều là debug. Chạy **task: clean** trước khi build sau đó chạy **task: assemble, build_type: debug/release** để build ra file apk tương ứng.

File apk sẽ được đặt trong thư mục default là **"./app/build/outputs/apk/"**

Khi đã có được file apk, công việc tiếp theo là đẩy nó lên Firebase App Distribution.

### Với cách xác thực bằng file credentials:

```
firebase_app_distribution(
app: app_id,
groups: "group-test",
release_notes: release_notes,
service_credentials_file: "#{ENV['SERVICE_CREDENTIALS_FILE']}",
apk_path: path
)
```

Trong đó:
- app:  Firebase App ID
- groups:  group tester mà bạn muốn họ nhận được file apk. Các group này được chỉ định bằng **group alias**.
- release_notes:  Note những gì thay đổi trong bản build đó
- service_credentials_file:  đường dẫn của file credentials có chứa private key thông qua cách xác thực bằng file credentials
- apk_path:  **đường dẫn tuyệt đối** của file apk đã build từ trên.

![](https://images.viblo.asia/95443cc7-34a7-43b2-a2ee-94e84f8dac62.png)

![](https://images.viblo.asia/005c5bb1-52be-45f0-ae7c-4354f199a80f.png)

### Với cách xác thực bằng Firebase CLI:
```
firebase_app_distribution(
app: app_id,
groups: "group-test",
release_notes: release_notes,
firebase_cli_token: "#{ENV['FIREBASE_CLI_TOKEN']}",
apk_path: path
)
```
Trong đó:
- app:  Firebase App ID
- groups:  group tester mà bạn muốn họ nhận được file apk. Các group này được chỉ định bằng **group alias**
- release_notes:  Note những gì thay đổi trong bản build đó
- firebase_cli_token:  token sinh ra bắng cách xác thực với Firebase CLI ở trên
- apk_path:  **đường dẫn tuyệt đối** của file apk đã build từ trên

Có thể kiểm tra lại file Fastfile có đúng hay không ở local bằng cách chạy câu lệnh **fastlane** trên terminal của Android Studio, sau đó chọn lane tương ứng muốn chạy.

 Dưới đây là một số hình ảnh kết quả chạy được:
![](https://images.viblo.asia/da54dcc5-0f98-46d0-9cf1-37360c3262ce.png)

![](https://images.viblo.asia/e092688b-8a8b-4d28-9e43-139578379031.png)

![](https://images.viblo.asia/a1089753-9be6-4eb0-be3a-034ce134893f.png)