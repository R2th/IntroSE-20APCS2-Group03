* Trong vòng đời phát triển của một dự án, bạn có thể tạo ra các bản build khác nhau ở các giai đoạn khác nhau. Vào giai đoạn đầu, Sẽ có một bản phù hợp với cấu hình local của bạn. Khi bạn đã sẵn sàng để qua giai đoạn tiếp theo, có một bản build sẽ được sử dụng cho QC để test các chức năng và fix bug. Khi app đã pass qua tất cả case test và được QC approval, bạn sẽ tạo version khác để gửi cho khách hàng cho beta test trước khi đưa lên App Store. Cuối cùng, chúng sẽ có ứng dụng đã sẵn sàng để release, một khi khách hàng đã hài lòng với bản build mà bạn đã gửi. Tất cả các bản build không giống như nhau, mỗi bản sẽ có những bản config khác nhau.
* Ví dụ: nếu App cần tương tác với API, thì app của bạn có thể build một bản config kết nối với môi trường test trong khi QC test. Bản build sẽ được config với test URL. Khi bạn chuyển sang giai đoạn tiếp theo thì có thể các bản build khác sẽ có URL setting cho việc kết nối với môi trường staging/production server.Bạn không thể show ra các level của thông tin khi gặp lỗi trong ứng dụng cho tất cả các bản build.
**Làm thế nào để có thể quản lý hiệu quả tất cả các bản build biến thể (nhiều môi trường) trên cùng một source code trong Xcode? Đây là những gì tôi muốn đề cập đến trong bài viết này.**

-----
> Làm thế nào để quản lý nhiều bản build?
+ Có nhiều cách khác nhau để làm: 
Một trong số đó là sử dụng file `Info.plist` khác nhau. Khi build ở các môi trường khác nhau, một file `Info.plist` sẽ được sử dụng, do đó có thể phân biệt chúng như token, URL cho các bản build khác nhau. 

Cũng có thể dùng Bundle Indentifiers. Xác định các macro tiền xử lý khác nhau sẽ kiểm soát việc biên dịch có điều kiện của các đoạn mã khác nhau.

Ở bài viết này sẽ cài đặt các thiết lập cấu hình bản build của bạn thành các file .xcconfig và tham khảo trong dự án của bạn. Sau đó bạn có thể build các version khác nhau của app bằn cách thay đổi scheme.

**1.  Tạo Build Config**

Đầu tiên, hãy sử dụng xcode tạo new project hoặc nếu bạn đã có thì bắt đầu bằng project đã có trên máy tính của bạn. Chọn phần đầu tiên của dự án. Sau khi chọn bạn sẽ thấy trong phần configurations sẽ có 2 chế độ Debug và Release. Nếu trước đó bạn không biết thì cái này có nghĩa là bạn có thể tạo một bản build cho debug và một bản khác cho release với cài đặt khác nhau.
![](https://images.viblo.asia/9294d0d2-19f8-49ca-bd11-ed5c7e39c48c.png)
Bây giờ hãy tạo mới configuration. nhấn vào "+" và sau đó chọn "Duplicate Debug configuration". bởi vì làm thế có thể loại bỏ một số cài đặt không cần thiết cũng như cài đặt như ý muốn.
![](https://images.viblo.asia/f6f28e32-4422-4f09-8ebc-19ae42b72efa.png)
![](https://images.viblo.asia/e9d89e96-9eab-46de-9d60-750d88ae4e42.png)
**2.  Sử dụng Xcode Configuration File (.xcconfig)**

Như đã đề cập, ta sử dụng Xcode configuration file (`.xcconfig`) thay vì sử dụng code constant để quản lý build setting. Nếu bạn  không biết Xcode configuration file (`.xcconfig`) là gì thì nó thực ra là một cặp key/value dựa trên file. Bạn có thể lưu lại các thiết lập theo từng cặp giá trị key/value bằng cách sử dụng `.xcconfig` file, Nó rất dễ để định nghĩa các thông số cho mỗi lần build. 

Bây giờ hãy trở lại project của bạn để tạo `.xcconfig` file .chọn project của bạn -> click chuột phải -> new file -> configuration Setting File. Ở màn hình tiếp theo bạn nhập vào tên của file và hãy đảm bảo rằng bạn đã uncheck hết các checkbox nếu bạn không muốn bao gồm các bundle của app bên trong file setting.
![](https://images.viblo.asia/744c8fa0-07e7-439b-9ee9-c8c14a4ca445.png)
Quay lại màn hình info project. Bên dưới configuration xổ Staging ra sau đó chọn file configuration chọn xcconfile "Staging".
![](https://images.viblo.asia/afd4fbae-87e9-45bf-baf9-32029dec06d9.png)
![](https://images.viblo.asia/5ffbed85-0cc3-458b-8924-ca0e669dcfe0.png)
**3.  Thay đổi Build Infomation**

Khi bạn có file cài đặt Xcode configuration, Việc thay đổi bản build là khá đơn giản, bạn muốn thay đổi thông tin bản build như app name, app versioin, bundle indentifier và bundle version cho mỗi bản build. Bạn có thể chỉnh sửa cho mỗi file .xcconfig file như ví dụ:

**Debug.xcconfig
**
```
IS_APP_NAME = DemoMaps Debug
IS_APP_VERSION = 0.3
IS_APP_BUNDLE_ID = Example.DemoMapsDebug
```

**Staging.xccongfig:
**
```
IS_APP_NAME = DemoMaps Stagin
IS_APP_VERSION = 0.3
IS_APP_BUNDLE_ID = Example.DemoMapsStagin
```

**Release.xccongfig:
**
```
IS_APP_NAME = DemoMaps Release
IS_APP_VERSION = 0.3
IS_APP_BUNDLE_ID = Example.DemoMapsRelease
```

Bạn có thể sử dụng các biến đã định nghĩa của bạn trong project setting, info.plist và entitlement files. Ví dụ, chúng ta sẽ sử dụng bên trong file info.plist để thay đổi app name, app versioin và bundle identifier như hình bên dưới: 

![](https://images.viblo.asia/1829e322-9a2b-4177-8777-30db2bfc6daa.png)

**Note:** Thay đổi Bundle Idetifier sẽ yêu cầu bàn tạo ra provisioning profile.

**4.  Thay đổi App Icon**

Với file configuration, bạn có thể thay đổi icon của app một cách dễ dàng đối với mỗi bản build trên các môi trường khác nhau. Các quy trình để đổi một icon app tương ứng như quy trình để thay đổi một số thông tin cơ bản như app name, app version, ... như chúng ta đã đề cập ở phần trên, ngoại trừ các biến sẽ được sử dụng ở bên ngoài file build settings. LET DO IT:

**Debug.xcconfig:**

`IS_APP_ICON = AppIconDebug`

**Staging.xcconfig:**

`IS_APP_ICON = AppIconStaging`

**release.xcconfig:**

`IS_APP_ICON = AppIconRelease`

Sau khi thay đổi, ta thay đổi build setting và thay app icon với biến ${IS_APP_ICON}

![](https://images.viblo.asia/8a4c8384-4fc8-4717-9fb3-564619ffb0ee.png)

Sau đó, tạo một vài bộ icon app mới trong Assets.xcassets và đổi tên chúng cho phù hợp.

![](https://images.viblo.asia/ab3a307f-676c-4bae-bdad-29bd3528cbd7.png)

sau đó kéo icon app tương ứng vào và tận hưởng kết quả!

**5. Truy cập biến từ code define**

Các file xcode configuration thực sự mạnh và có thể sử dụng nhiều mục đích khác nhau. Giả sử, nếu bạn có khóa API và URL phụ trợ khác nhau cho các bản build khác nhau, bạn có thể chỉ định chúng trong mỗi tệp .xcconfig. Sau đó, trong code của bạn, bạn có thể sử dụng chúng. 
Đây là một ví dụ:

**Debug.xcconfig:**

```
BASE_URL = https:abcbebug.com/api
API_KEY = ck_a57e4fa2e14c12ae3f400371cf2951ec3dea5_dev
```

**Staging.xcconfig:**

```
BASE_URL = https:abcstagin.com/api
API_KEY = ck_a57e4fa2e14c12ae3f400371cf2951ec3dea5_stg
```

**Release.xcconfig:**

```
BASE_URL = https:abcrelease.com/api
API_KEY = ck_a57e4fa2e14c12ae3f400371cf2951ec3dea5_release
```

Sau đó add các biến đã định nghĩa vào `Info.plist` bằng cách tạo thêm field mới như hình:

![](https://images.viblo.asia/b009436b-217a-49d2-9ec7-005d6ce2c6e3.png)

Bạn có thể lấy các giá trị define bằng mã đoạn mã như sau:

```
func getDefineValueForKey(_ key: String) -> String? {
        return (Bundle.main.infoDictionary?[key] as? String)
 }
```

**6. Thay đổi môi trường build**

![](https://images.viblo.asia/0ae9beec-2d71-480e-b9f8-3970e82975e7.png)
![](https://images.viblo.asia/4106a409-cccd-49a1-bae2-2d59ce03a2b6.png)

**Kết luận**

Sử dụng Xcode Configuration file là một cách mạnh mẽ để định cấu hình cấu hình cho các bản build trên các môi trường khác nhau trên cùng source code, cho phép bạn quản lý biến thể bản dựng dễ dàng. Bạn nghĩ gì về hướng dẫn? Xin vui lòng comment nhiệt cho tôi biết :* .

Thank for your watching