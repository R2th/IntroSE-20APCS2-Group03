## Introduction
Mỗi developer hay gặp phải các công việc lặp đi lặp lại gây ra sự nhàm chán. Có những công việc mà ta hoàn toàn có thể tự động hóa chúng. Giúp ta có thể dành thời gian đó cho những công việc khác, đẩy nhanh được năng suất dự án hơn.

Các developer app có các công việc lặp lại như: build app, test package version , publish lên store,...

Trong bài viết này ta sẽ cùng nhau tìm hiểu về một giải pháp giúp tự động hóa các công việc trên

Giải pháp trong bài viết đơn giản khi tận dụng các service có sẵn, tuy nhiên có khá nhiều bước setting nên bài viết sẽ tương đối dài 😅😅

Source code trong bài: https://github.com/dtdat1997/flutter-app-test-auto-publish/

## Workflow

Bài toán cụ thể chúng ta sẽ cùng phân tích là: auto publish flutter app lên Google Play

Giải pháp đưa ra sẽ sử dụng các công cụ sau:

* GitHub Actions
* Google Play Console
* Google Cloud Serivce (IAM)

Ta sử dụng Git Actions free nên có một số giới hạn nhất định về hiệu năng xử lí. Để xử lí một bài toán có nhiều yêu cầu như sử dụng repository khác ngoài GitHub hay publish lên Apple Store không phải Google Play, multiple project, ta nên build một server riêng để xử lí việc này.

![image.png](https://images.viblo.asia/b7f3f44d-f173-49ab-a686-fee433dfdf1d.png)

Mô tả luồng hoạt động:

* GitHub action trigger các sự kiện khi có commit push vào các nhánh **release/** 
* Workflow jobs sẽ chạy các job test, build, publish lên Google Play
* Khi auto test done sẽ build ra một bản **.abb** để tự động upload

Giờ ta cùng nhau bắt đầu các bước thao tác thiết đặt

## Configuration
### Google Play console
Chúng ta vào Goolge Play Console bằng tài khoản quản trị viên, ở đây mình đã tạo sẵn một ứng dụng

![image.png](https://images.viblo.asia/48983b71-776b-4105-97f0-050428890cd9.png)

Bên left side bar, chọn **Quyền truy cập API**, đảm bảo rằng đã liên kết với **Google Play Console Developer**

![image.png](https://images.viblo.asia/d0614713-722f-42c5-9815-44fa86f33f12.png)

Chọn phần **Xem dự án**, chúng ta sẽ được chuyển hướng tới Google Cloud Service

### Google service account key

Tại bước này ta cần tạo một service account và lấy ra **service account key**

![image.png](https://images.viblo.asia/11c0b202-103b-4e8b-b936-db0c2e5054b1.png)

Ấn vào left side bar, chọn **IAM & Admin**

![image.png](https://images.viblo.asia/e72c0809-9e62-4f17-8a54-168650187a45.png)

Tại **IAM & Admin**, chọn **Service Accounts** rồi ấn **CREATE SERVICE ACCOUNT**

![image.png](https://images.viblo.asia/e202a82e-d1d0-49ae-a067-ac42a26f670d.png)

Điền **Service account name** rồi ấn **CREATE AND COUNTINE**

![image.png](https://images.viblo.asia/faa1d8d4-c1e8-46df-ad1b-0d6b4dc15996.png)

Chọn role **Service Account User**, ấn **DONE**

![image.png](https://images.viblo.asia/9746d102-6c31-4413-9f13-ec18408925e4.png)

Tại màn chi tiết user, ta chọn tab **KEYS**

![image.png](https://images.viblo.asia/e5b0c1f1-9558-403b-9b06-8be157dce3f4.png)

Ấn **ADD KEY**, type **JSON** rồi **CREATE**

![image.png](https://images.viblo.asia/042fdb17-77f9-4d35-a193-b83ed9ca6b18.png)

Service account key sẽ được tải xuống

![image.png](https://images.viblo.asia/b8054c7d-0aee-4618-b74f-2b65967391f7.png)

Khi tạo xong, quay lại màn **Quyền truy cập API**, ta thấy account vừa mới tạo

Tuy nhiên để account này có quyền publish app lên store ta phải invite account này console

Ấn **Quản lý quyền trên Play Console** bên cạnh account, chọn **Mời người dùng mới**

Như account cũng như account key đã có quyền publish app

![image.png](https://images.viblo.asia/16f5eb41-030a-4851-b315-fe5fd76581c3.png)

### Flutter App

Để publish lên Google Play Console luôn cần có file keystore

Nếu chưa có các bạn tạo bằng câu lệnh sau

```shell
  keytool -genkey -v -keystore c:\Users\USER_NAME\upload-keystore.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

Ở đây mình để 

![image.png](https://images.viblo.asia/444473c7-132a-4008-a28e-41fcc0d087b1.png)

Vì lí do bảo mật không được phép up file, password keystore lên repository nên ta sẽ encode file keystore sang base64

Vào thư mục chứ file keystore, chạy lệnh dưới đây sẽ sinh ra một đoạn base64 encode từ keystore, ta copy lại.

```shell
openssl base64 < upload-keystore.jks | tr -d '\n' | tee upload-keystore.jks.base64.txt
```

### GitHub Workflow

Chúng ta vào phần **Settings** >> **Secrets** >> **Actions**

![image.png](https://images.viblo.asia/988a3f8e-8ce8-4dd1-9bde-395397a22b97.png)

Ta tạo các biến secret sau:

* **ANDROID_KEYSTORE_BASE64**: chuỗi base64 encode từ file keystore
* **ANDROID_KEY_ALIAS**: alias đã tạo ở bước trên (ở đây mình để là "upload") 
* **ANDROID_KEY_PASSWORD**: password đã tạo ở bước trên (ở đây mình để là "123456")
* **ANDROID_KEYSTORE_PASSWORD**: password đã tạo ở bước trên (ở đây mình để là "123456")
* **ANDROID_PACKAGE_NAME**: package name từ applicationId trong file **android/app/build.gradle**
![image.png](https://images.viblo.asia/daf82dfb-b789-420c-ae4e-62e50d120326.png)
* **GOOGLE_SERVICE_ACCOUNT_KEY**: paste file service account json

Tiếp theo, trong folder project flutter, mình tạo 1 file workflow **android_publish.yaml**  theo path **.github/workflows/**

![image.png](https://images.viblo.asia/1d8118e6-cca9-4b68-899b-4fc44e06fb44.png)

Dưới đây mình sẽ giải thích các thành phần trong file workflow này

```python
name: Flutter release

on:
  push:
    branches:
      - 'release/**'
```
**name**: tên job workflow này

**on**: event cần bắt cho workflow này, mình để event khi push commit lên các nhánh bắt đầu bằng **release/**

```python
jobs:
  release:
    name: Test, build and release

    runs-on: ubuntu-latest
```

Trong **jobs** sẽ chứa các step test, build và publish lên Google Play, ta sẽ sử dụng môi trường ubuntu làm môi trường ảo hóa chạy job này

```markdown
steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Setup Java
        uses: actions/setup-java@v1
        with:
          java-version: '12.x'

      - name: Setup Flutter
        uses: subosito/flutter-action@v1
        with:
          channel: beta

      - name: Flutter version
        run: flutter --version
```

Đã có môi trường ảo hóa rồi thì cần thêm các package Java, Flutter để build được app, ta chọn phiên bản tùy thuộc vào project đang sử dụng

```rust
      - name: Cache pub dependencies
        uses: actions/cache@v2
        with:
          path: ${{ env.FLUTTER_HOME }}/.pub-cache
          key: ${{ runner.os }}-pub-${{ hashFiles('**/pubspec.lock') }}
          restore-keys: ${{ runner.os }}-pub-

      - name: Download pub dependencies
        run: flutter pub get

      - name: Run analyzer
        run: flutter analyze

      - name: Run tests
        run: flutter test
```

Ta tạo pub dependencies rồi chạy flutter analyze, test để kiểm tra source code

> ⚠️Lưu ý: Các câu lệnh trên bạn nên chạy kiểm tra trước ở local, tùy vào yêu cầu dự án bạn có thể sử dụng thêm các package khác để kiểm thử source code

```shell

      - name: Download Android keystore
        id: android_keystore
        uses: timheuer/base64-to-file@v1.0.3
        with:
          fileName: key.jks
          encodedString: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}

      - name: Create key.properties
        run: |
          echo "storeFile=${{ steps.android_keystore.outputs.filePath }}" > android/key.properties
          echo "storePassword=${{ secrets.ANDROID_KEYSTORE_PASSWORD }}" >> android/key.properties
          echo "keyPassword=${{ secrets.ANDROID_KEY_PASSWORD }}" >> android/key.properties
          echo "keyAlias=${{ secrets.ANDROID_KEY_ALIAS }}" >> android/key.properties
```

Ở thao tác này sẽ gọi tới **ANDROID_KEYSTORE_BASE64** đã lưu trong Git Secrets để decode thành file keystore

Rồi gọi các key, alias, password đó parse vào file key.properties

Các bạn dev Flutter đã không lạ gì file này rồi nên mình sẽ không cần nói kĩ hơn
```shell
      - name: Build Android App Bundle
        run: flutter build appbundle --build-name=1.0.${{ github.run_number }} --build-number=${{ github.run_number }}
```
Khi build app sẽ dùng tới câu lệnh **flutter build appbundle**

Ta phải cần config thêm **--build-name --build-number** dựa theo thông số của **git run number** nếu không các lần sau workflow chạy sẽ tạo ra cả bản app trùng version với nhau, Google Play ngăn không cho upload
```shell

- name: Deploy to Play Store
        uses: r0adkll/upload-google-play@v1.0.17
        with:
          serviceAccountJsonPlainText: ${{secrets.GOOGLE_SERVICE_ACCOUNT_KEY}}
          packageName: ${{ secrets.ANDROID_PACKAGE_NAME }}
          releaseFiles: build/app/outputs/bundle/release/app-release.aab
          track: internal
          status: draft
```

Khi upload sẽ cần tới package name và service account key

**releaseFiles**: vị trí file sau khi build trong môi trường ảo này

**track**: loại phiển bản mà bạn muốn phát hành gồm các value: **production**, **beta**, **alpha**, **internalsharing**, **internal**
Do phát hành bản product hay beta cần cấu hình thêm khá nhiều bước nên ở đây mình dùng value **internal** để phát hành bản thử nghiệm nội bộ, khi phát hành bản **internal** ta sẽ cần thêm **status: draft**

Toàn bộ nội dung workflow 

https://github.com/dtdat1997/flutter-app-test-auto-publish/blob/main/.github/workflow/android_publish.yaml

```shell

name: Flutter release

on:
  push:
    branches:
      - 'release/**'

jobs:
  release:
    name: Test, build and release

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Setup Java
        uses: actions/setup-java@v1
        with:
          java-version: '12.x'

      - name: Setup Flutter
        uses: subosito/flutter-action@v1
        with:
          channel: beta

      - name: Flutter version
        run: flutter --version

      - name: Cache pub dependencies
        uses: actions/cache@v2
        with:
          path: ${{ env.FLUTTER_HOME }}/.pub-cache
          key: ${{ runner.os }}-pub-${{ hashFiles('**/pubspec.lock') }}
          restore-keys: ${{ runner.os }}-pub-

      - name: Download pub dependencies
        run: flutter pub get

      - name: Run analyzer
        run: flutter analyze

      - name: Run tests
        run: flutter test

      - name: Download Android keystore
        id: android_keystore
        uses: timheuer/base64-to-file@v1.0.3
        with:
          fileName: key.jks
          encodedString: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}

      - name: Create key.properties
        run: |
          echo "storeFile=${{ steps.android_keystore.outputs.filePath }}" > android/key.properties
          echo "storePassword=${{ secrets.ANDROID_KEYSTORE_PASSWORD }}" >> android/key.properties
          echo "keyPassword=${{ secrets.ANDROID_KEY_PASSWORD }}" >> android/key.properties
          echo "keyAlias=${{ secrets.ANDROID_KEY_ALIAS }}" >> android/key.properties

      - name: Build Android App Bundle
        run: flutter build appbundle --build-name=1.0.${{ github.run_number }} --build-number=${{ github.run_number }}

      - name: Deploy to Play Store
        uses: r0adkll/upload-google-play@v1.0.17
        with:
          serviceAccountJsonPlainText: ${{secrets.GOOGLE_SERVICE_ACCOUNT_KEY}}
          packageName: ${{ secrets.ANDROID_PACKAGE_NAME }}
          releaseFiles: build/app/outputs/bundle/release/app-release.aab
          track: internal
          status: draft
```

## Finally

Như vậy các công đoạn setup đã xong, bạn hãy upload file workflow vừa tạo lên nhánh một nhánh bắt đầu bằng **release/**, khi push lên Git Action sẽ chạy luôn workflow này

![image.png](https://images.viblo.asia/da64b247-98c0-45bf-b665-3f84eee75ec1.png)
Khi vào Git Actions ta sẽ thấy các workflow đã và đang chạy

![image.png](https://images.viblo.asia/5291e09e-8026-4c17-bb22-e6178b35c5eb.png)

Ta dễ dàng kiểm tra log trong quá trình chạy

![image.png](https://images.viblo.asia/0ffa8b50-839a-49f2-ad39-9c080ada113f.png)

Qua bài viết này, chúng ta có thể phần nào nắm được luồng triển khai cơ bản việc auto test, publish một project mobile lên Google Play

Rất cảm ơn các bạn đã đọc bài viết này🤝🤝

Source code trong bài: https://github.com/dtdat1997/flutter-app-test-auto-publish/