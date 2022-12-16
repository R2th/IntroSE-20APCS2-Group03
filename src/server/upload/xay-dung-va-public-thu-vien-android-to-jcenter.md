## I. Tạo thư viện
`New -> Module -> Android Library`

## II. Deploy library to jcenter 
### Tại sao lại là jcenter
- `gradle` supports `Maven Repository Dependences`
- Khi add 1 dependencies vào gradle, nó sẽ lên trên `Maven Repository` đê down về
- Hai `Maven repositories` phổ biến là `jCenter` and `Maven Central Repository`
- `jcenter` hiện tại đang là cái mặc định (khi tạo project Android là có luôn)

### Bước 1: Đăng kí và config bintray
1) Đăng kí một tài khoản ở https://bintray.com/  
2) Genere `gpg key` trên máy  
Generate `gpg public key` và `gpg private key` dựa vào tutorial này https://help.github.com/articles/generating-a-new-gpg-key/   (hơi nhiều bước nhưng làm dễ, nhớ nhớ password `passphrase` để tí dùng lại ở bước sau).  
(Nếu bạn đang chạy trên ubuntu 14.04, bạn có thể xem 1 số lưu ý này để tránh lỗi https://stackoverflow.com/a/50284478/5381331)

3) Add ` gpg key` to account  
Ở trên bintray, nhắp vào bintray username -> Edit Profile -> GPG Signing, sau đó add 2 cái `gpg public key` và `gpg private key` vào sau đó `Update`

### Bước 2: Tạo repository trên bintray
Ở bintray, click vào `Add repository` sau đó điền thông tin và `Create`
![](https://images.viblo.asia/49b98e47-aeab-4bd5-886e-905e2990831c.png)

**Lưu ý**
- Chọn `type` là `Maven`
- Phần `Name` ở đây là tên của `Repository` không phải là tên thư viện (đặt gì cũng được, trùng với tên thư viện cũng được)

### Bước 3:  Config local
1) Config `local.properties`
Thêm 3 dòng này
```
bintray.user=phanvanlinh94vn
bintray.apikey={cái API key này lấy trên bintray trong EditProfile -> API key}
bintray.gpg.password={password này lấy khi gen gpg key }
```

2) Config build.gradle (**Project**)
Thêm 2 dòng dưới
```
buildscript {
    ...
    dependencies {
        ...
        classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.7.3'
        classpath 'com.github.dcendents:android-maven-gradle-plugin:1.5'
        ...
    }
}
```
3. Config build.gradle (**Library module**)

Copy phần `ext` vào trong `build.gradle` và sửa lại thông tin cẩn thận

```
apply plugin: 'com.android.library'
android {
  ...
}

ext {
  bintrayRepo = 'PermissionHandler' // your repo name
  bintrayName = 'permissionhandler' // has to be same as your library module name
  publishedGroupId = 'com.linh' // your module package name
  libraryName = 'PermissionHandler'
  artifact = 'permissionhandler' // has to be same as your library module name
  libraryDescription = 'A library which help you request runtime permission on Android easier.'

  siteUrl = 'https://github.com/PhanVanLinh/AndroidPermissionHandler'
  gitUrl = 'https://github.com/PhanVanLinh/AndroidPermissionHandler.git'

  libraryVersion = '1.0.0'
  developerId = 'phanvanlinh94vn'
  developerName = 'PhanVanLinh'
  developerEmail = 'phanvanlinh.94vn@gmail.com'
  licenseName = 'The Apache Software License, Version 2.0'
  licenseUrl = 'http://www.apache.org/licenses/LICENSE-2.0.txt'
  allLicenses = ["Apache-2.0"]
}

apply from: 'https://raw.githubusercontent.com/numetriclabz/jcenter/master/installv.gradle'
apply from: 'https://raw.githubusercontent.com/numetriclabz/jcenter/master/bintrayv.gradle'

dependencies {
  ...
}
```

### Bước 4: Public
`./gradlew bintrayUpload`

Nếu chạy lệnh đó thành công, nó sẽ thông báo SUCCESS sau khi chạy xong.  
Sau đó lên bintray sẽ thấy
![](https://images.viblo.asia/239d9009-393a-4f79-a042-b36dd5a4916a.png)

Bây giờ bạn có thể dùng được thư viện bằng cách 

```
allprojects {
    repositories {
        ...
         maven {
             url  "https://dl.bintray.com/phanvanlinh94vn/PermissionHandler"
         }
     }
 }
```
```
dependencies {
   ...
   implementation 'com.linh:permissionhandler:1.0.0'
}
```

### Bước 5: Link to jcenter
Sẽ có một nút là `Add to jcenter`, bạn click vào đó sau đó điền một message về lí do vì sao bạn lại tạo ra thư viện.
Submit xong thì đợi người ta phản hồi (mình mất khoảng nửa ngày)
 ![](https://images.viblo.asia/ebd76d46-c725-4511-a544-6243064ec33f.png)

Sau khi link to jcenter, để dùng thư viện bạn chỉ cần dùng 
```
dependencies {
   ...
   implementation 'com.linh:permissionhandler:1.0.0'
}
```

## III. Tham khảo
Mình làm theo những link ở dưới thì ko có cái nào chạy được hoàn thiện cả, mỗi tutorial nó cứ lỗi chỗ này chỗ khác, chắp vá lại xong may chạy được  
https://inthecheesefactory.com/blog/how-to-upload-library-to-jcenter-maven-central-as-dependency/en  
https://medium.com/@eliaslecomte/publish-an-android-library-on-jcenter-a37770dc9570  
https://android.jlelse.eu/how-to-distribute-android-library-in-a-convenient-way-d43fb68304a7