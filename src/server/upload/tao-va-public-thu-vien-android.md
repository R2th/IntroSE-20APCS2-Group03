Thư viện của bên thứ ba là một phần quan trọng trong phát triển ứng dụng dành cho thiết bị di động. Các thư viện nổi tiếng như Retrofit, RxJava, Picasso giúp xử lý network, bất động bộ và xử lý ảnh đang được sử dụng rất rộng rãi trong phát triển ứng dụng Android. 
Tuy nhiên, tạo và pulbic thư viện như vậy để cho những lập trình viên khác như nào? Ở bài viết tôi hướng đẫn từng các để tạo và xuất bản một thư viện cho JCenter.

# 1. Tạo thư viện
### Tạo Project
Thật không may, Android Studio không hỗ trợ cho tạo thư viện ngay lập tức. Chúng ta sẽ phải tạo Project trước.

![](https://images.viblo.asia/f8d77ce6-3383-424d-ad14-2fe663af9637.png)

### Library Module

Sau khi đã tạo được một project, bạn cần tạo Library Module và đưa những phần code mà bạn muốn đưa thư viện. Kích chuột phải "File" và chọn "New -> New Module" để tạo Library Module. Đây là hình ảnh minh họa các bước làm:

![](https://images.viblo.asia/03766d4c-4174-4eed-87e3-fdf4f3b4c33f.png)

![](https://images.viblo.asia/64a07023-b519-4079-9c41-a59c82c76eb5.png)

![](https://images.viblo.asia/0225ac28-1488-4f8c-9c9e-704b423fea6b.png)

### Sử dụng thư viện trong Project

Để có thể dụng được code của thư viện, hãy thêm dòng sau vào "dependencies" của file build.gradle của projet:

```
implementation project(':lib')
```

Bây giờ bạn đã có thể sử dụng thư viện rồi.

# 2. Public thư viện

Ở phần trên chúng ta mới chỉ tạo lib và khi sử dụng sẽ phải copy paste vào project. Như vậy khá bất tiện, vì thế tôi sẽ hướng dẫn tiếp các bạn public thư viện để thuận tiện sử dụng hơn.

### Tạo tài khoản Bintray

Bintray là một dịch vụ phân phối phần mềm mà bạn có thể sử dụng để đưa thư viện của mình lên. Bạn có thể tạo một tài khoản [ở đây](https://bintray.com/) và chú ý rằng tạo dạng "Sign Up to an Open Source account" nhé.

### Library Configuration

Thêm đoạn config sau vào build.gradle của Lib:

```
ext {
    PUBLISH_GROUP_ID = 'com.chiz'
    PUBLISH_ARTIFACT_ID = 'sample'
    PUBLISH_VERSION = '1.0.0'
	}
```

Giải thích cho từng phần:

- PUBLISH_GROUP_ID: tên package name của bạn.
- PUBLISH_ARTIFACT_ID: tên thư viện bạn muốn đặt.
- PUBLISH_VERSION: phiên bản hiện tại của thư viên.

Ngoài ra bạn đặc biệt chú ý rằng cần thêm dòng này vào cuối file để giúp build file zip:

```
apply from: 'https://raw.githubusercontent.com/blundell/release-android-library/master/android-release-aar.gradle'
```

### Project Configuration

Thêm 2 dòng sau vào file build.gradle của project:

```
dependencies {
        ...
	    classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.2'
        classpath 'com.github.dcendents:android-maven-plugin:1.2'
	}
```

### Setup Bintray API

Sau khi đã config xong, chúng ta cần thêm thông tin tài khoản của bintray vào file local.properties:

```
bintray.user=bintrayUserName
bintray.apikey=abc123ApiKey
```

- bintray.user: tên tài khoản Bintray.
- bintray.apikey: bạn có thể lấy được khi login vào tài khoản Bintray. Bạn chọn vào Avatar trên cùng bên phải và chọn "edit profile". Bạn chọn tab API Key ở phía bên trái dưới.

![](https://images.viblo.asia/ae2d0763-7f1c-43e3-8f07-9f9292162360.png)

### Tạo file zip

Bước gần cuối cùng, bạn cần nén Library Module thành file zip để đưa Bintray. Bạn có thể sử dụng terminal của Android Studio và chạy câu lệnh sau:

```
./gradlew clean build generateRelease
```

Sau khi câu lệnh hoàn tất, bạn vào lib/build folder và tìm file có tên release-x.y.z.zip. Đó là file bạn sẽ upload lên Bintray.

### Bintray Upload

Sau khi đã có file zip, bước cuối cùng sẽ upload thôi:
1. Đăng nhập Bintray.
2. Chọn "Add New Repository", khi nhập thông tin chú ý chọn Type Maven.
3. Chọn "Add New Package", điền thông tin thì chú ý URL VCS thì nhập link repo lib của bạn (github, ...).
4. Chọn "New version", điền thông tin và submit.

![](https://images.viblo.asia/b9ee6403-fc61-4053-afe4-54baf0d13bec.png)

5. Chọn version, và upload file zip lên bằng trình upload bên file. Nhớ tích vào "explode this archive". 

![](https://images.viblo.asia/c0868047-7bfa-429d-a44b-447ab5291038.png)

![](https://images.viblo.asia/6aaf3f93-b7a9-455a-9ce1-a2298a8de247.png)

8. Sau đó, chọn gói package của bạn và chọn "Add To Jcenter" ở cuối cùng bên phải.

![](https://images.viblo.asia/a10d0b46-e395-4a1b-825e-a96d70d2e0f7.png)

Sau khi Add To Jcenter, bạn phải chờ chờ Jcenter duyệt reuqest thì lib của bạn mới có thể sử dụng được. Và đây là cách sử dụng, bạn add dòng sau vào file build.gradle của app, ví dụ với lib của mình:

```
dependencies {
    compile 'com.chiz:sample:1.0.0'
    ...
    }
```

# 3. Phần kết
Mình xin kết thúc tại đây. Cảm ơn các bạn đã đọc bài viết. Chúc các bạn thực hiện thành công.

Link tham khảo:
https://androidessence.com/android/developing-and-publishing-android-libraries/