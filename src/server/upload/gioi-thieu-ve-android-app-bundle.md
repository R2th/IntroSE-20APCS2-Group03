![](https://images.viblo.asia/c72fc804-9f13-4bdb-868c-079cdf533377.png)
## 1. Giới thiệu
Có rất nhiều điều thú vị được công bố tại I / O năm nay - trong đó có App bundles. Android App Bundles không chỉ cung cấp một định dạng upload mới cho các ứng dụng, mà nó sẽ  ảnh hưởng đến cách chúng ta xây dựng và cấu trúc các ứng dụng của chúng ta theo một định dạng modules. Trong bài này, mình sẽ giới thiệu về Android App Bundles để  áp dụng vào project của mình 


## 2. Sử dụng Android App Bundles có lợi gì?

* **Kích thước ứng dụng nhỏ hơn**

* **Không còn phải quản lí nhiều file APK**

* **Dynamic Delivery (Module động)** - Chỉ tải các tính năng trong ứng dụng của bạn khi người dùng cần chúng, tức là theo yêu cầu. Các tính năng này phải có mặt dưới dạng các mô-đun khác nhau trong dự án của ứng dụng của bạn.

* **Tối ưu cho việc tích hợp Instant app** - Người dùng có thể chạy ứng dụng của bạn ngay lập tức mà không phải cài đặt ứng dụng. Để tìm hiểu về instant app bạn có thểm xem [tại đây](https://viblo.asia/p/android-instant-app-buoc-dot-pha-cho-trai-nghiem-nguoi-dung-XL6lAA0mlek) 

![](https://images.viblo.asia/c77adbd5-68b1-4b04-9abf-68a0e08a6d15.gif)

Trước đây chúng ta phải tạo ra nhiều loại file Android Package (APK) để phù hợp với từng phiên bản API hay từng loại thiết bị khác nhau. Với Android App Bundles ta chỉ cần tải lên và tạo ra duy nhất với tất cả tài nguyên ứng dụng. Nghĩa là khi bạn sử dụng Android App Bundle(.aab) nó sẽ tạo ra nhiều loại apk được tối ưu hóa cho cấu hình của từng thiết bị cài đặt nó, vì vậy ta chỉ cần download source code và resource để chạy chúng, ví dụ ta không cần thêm ngôn ngữ khác khi mà ta đã để Tiếng Anh là ngôn ngữ mặc định của mình. Ta không còn phải tạo, quản lý nhiều APK để hỗ trợ các thiết bị khác nhau và người dùng nhận được các ứng dụng với dung lượng nhỏ hơn, được tối ưu hóa nhiều hơn.

![](https://images.viblo.asia/3c4f1907-bedb-467a-b569-d0e3c7786fd4.png)

Ngoài ra, bạn có thể thêm các module tính năng động vào ứng dụng của mình và đưa chúng vào App Bundles. Các module này chứa các tính năng và nội dung mà bạn có thể quyết định không bao gồm khi người dùng tải xuống và cài đặt ứng dụng của bạn lần đầu tiên. Sử dụng Thư viện cốt lõi của Play , sau đó ứng dụng của bạn có thể yêu cầu tải xuống các module đó dưới dạng APK tính năng động và thông qua Dynamic Delivery, Google Play chỉ phân phát mã code và resoure cho modules đó cho thiết bị.

## 3. Trong Android App Bundles (.aab) có gì?
APK là thứ ta có thể phân phối trực tiếp cho thiết bị của người dùng, trong khi đó, App Bundles là định dạng xuất bản không thể được cài đặt trên thiết bị của chính nó. Mặc dù chúng có điểm giống nhau, nhưng aab có chứa một số nội dung mà ta sẽ không tìm thấy trong các tệp APK. Ví dụ: các tệp dữ liệu meta trong các gói được sử dụng bằng cách sử dụng công cụ để tạo APK sẽ được phân phối cho người dùng, những tệp này sau đó không được bao gồm trong các APK. Một tệp abb điển hình có thể chứa:

![](https://images.viblo.asia/2f1cd0ad-7865-4630-8cf3-c2d1223746c6.png)

* **manifest.xml** - Giống như bạn sẽ thấy trong các APK của mình, có tệp kê khai hiện diện trên mỗi gói ứng dụng. Tuy nhiên, không giống như các APK này không được lưu trữ ở định dạng nhị phân - nó được biên dịch thành định dạng đệm giao thức giúp dễ dàng chuyển đổi công cụ khi cần. 
* **res / assets / libs** - Tất cả tài nguyên, nội dung và thư viện gốc đều được lưu trữ giống như trong APK. Sự khác biệt duy nhất ở đây là bất kỳ tệp tài nguyên nào cũng sẽ được lưu trữ trong định dạng bộ đệm giao thức làm điểm cuối cùng. 
* **resources.pb** - Tương tự như tệp resource.arac có thể tìm thấy bên trong tệp APK hiện tại , file resources.pb là một bảng tài nguyên nêu rõ các tài nguyên và chi tiết cụ thể để nhắm mục tiêu có trong ứng dụng. Phần extention .pb là do định dạng đệm giao thức được sử dụng bởi công cụ để chuyển đổi gói ứng dụng trước khi được chuyển đổi thành định dạng nhị phân được sử dụng trong APK. 
* **assets.pb** - Đây là bảng tương đương với một resource cho các ứng dụng và sẽ chỉ xuất hiện nếu bạn đang sử dụng resource trong ứng dụng của mình. 
* **native.pb** - Đây là resource cho các native library và sẽ chỉ có nếu bạn đang sử dụng các native lib trong ứng dụng của mình.

## 4. Dynamic Delivery (phân phối động)
![](https://images.viblo.asia/56f69ba8-86dc-4f69-80dc-12b2045364a4.gif)

Một thành phần cơ bản của Phân phối động là cơ chế phân tách APK có sẵn trên Android 5.0 (API = 21) trở lên. APK phân tách rất giống với APK thông thường — chúng bao gồm bytecode DEX được biên dịch, tài nguyên và tệp manifest Android. Tuy nhiên, nền tảng Android có thể xử lý nhiều APK phân tách được cài đặt dưới dạng một ứng dụng. Với các APK phân tách, Google Play có thể chia nhỏ ứng dụng lớn thành các gói nhỏ hơn, riêng biệt được cài đặt trên thiết bị của người dùng theo yêu cầu .

Slip APK được chia thành 3 loại:

**Base APK** : APK này chứa code và resource mà tất cả các APK phân tách khác có thể truy cập và cung cấp chức năng cơ bản cho ứng dụng của bạn. Khi người dùng download ứng dụng của bạn chắc chắn có file APK này

**Configuration APKs**: Mỗi APK trong số này bao gồm native libraries và resource cho từng cấu hình device cụ thể, nó sẽ tối ưu hóa nội dung APK theo dựa theo :
- Ngôn ngữ 
- Mật độ màn hình
- Kiến trúc CPU
    
Khi bạn build abb, theo mặc định, tất cả các phần tách sẽ được tạo, nhưng trong build.gradle, ta có thể khai báo những phần tách nào sẽ được tạo:
```kotlin
bundle {
        language {
            // Specifies that the app bundle should not support
            // configuration APKs for language resources. These
            // resources are instead packaged with each base and
            // dynamic feature APK.
            enableSplit = false
        }
        density {
            // This property is set to true by default.
            enableSplit = true
        }
        abi {
            // This property is set to true by default.
            enableSplit = true
        }
    }
```
Ban đầu, các thuộc tính này sẽ được đặt thành true. Tuy nhiên, đặt một thành false có nghĩa là nó không hỗ trợ phân tách phần đó trong APK config, có nghĩa là nó sẽ được đóng gói trong Base APK hoặc Dynamic-Feature APK

**Dynamic feature APKs**: Mỗi APK này chứa code và resource không bắt buộc khi ứng dụng của bạn được cài đặt lần đầu, nhưng có thể được tải xuống và cài đặt sau.

### 4.1 Dynamic feature module (Module tính năng động)

Dynamic feature module cho phép bạn tách các tính năng và tài nguyên nhất định khỏi module cơ sở của ứng dụng và đưa chúng vào aab. Thông qua Dynamic Delivery, sau này người dùng có thể tải xuống và cài đặt các thành phần đó theo yêu cầu sau khi họ đã cài đặt APK cơ sở của ứng dụng của bạn.
![](https://images.viblo.asia/f0ce0ec7-7270-4586-a85c-9e55811b4353.png)


Ví dụ, một ứng dụng nhắn tin văn bản bao gồm chức năng chụp và gửi tin nhắn hình ảnh, nhưng chỉ một phần nhỏ người dùng gửi tin nhắn hình ảnh. Có thể có ý nghĩa khi đưa tin nhắn hình ảnh làm nó thành Dynamic feture module có thể tải xuống. Bằng cách đó, tải xuống ứng dụng ban đầu nhỏ hơn cho tất cả người dùng và chỉ những người dùng gửi tin nhắn hình ảnh đó mới cần tải xuống thành phần bổ sung đó.
 
Lưu ý rằng loại module hóa này đòi hỏi nhiều effort để có thể tái cấu trúc lại ứng dụng, vì vậy, nên xem xét cẩn thận những tính năng nào của ứng dụng sẽ mang lại lợi ích nhiều nhất cho người dùng. Android App Bundles cung cấp một số tùy chọn bổ sung giúp bạn chuyển đổi ứng dụng của mình theo hướng hỗ trợ đầy đủ các tính năng theo yêu cầu. 

### 4.2 Tạo Dynamic feature module 

Để tạo Dynamic feture module ta sử dụng Android Studio 3.2 hoặc cao hơn
Mở tệp manifest ta thấy : 
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:dist="http://schemas.android.com/apk/distribution"
    package="com.ntd.samples.dynamicfeatures.ondemand.assets"
    split="assets">

    <dist:module
        dist:onDemand="true"
        dist:title="@string/title_dynamic_feature">
        <dist:fusing dist:include="true" />
    </dist:module>

</manifest>
```
* **onDemand**  : Nếu thuộc tính được đặt thành true thì module sẽ có sẵn để tải xuống theo yêu cầu. Khi được đặt thành false, tính năng động sẽ được tải xuống khi người dùng tải xuống lần đầu tiên và cài đặt ứng dụng.
* **title**  : Title sẽ được sử dụng để xác định module khi người dùng xác nhận tải về module. Đoạn string này nên được lưu trữ trong resource của ứng dụng để nó có thể được nhận cho các phần khác nhau mà ứng dụng của bạn hỗ trợ.
* **fusing** : Đặt thuộc tính này thành true sẽ có nghĩa là các thiết bị cũ hơn (4.4 trở xuống) sẽ có thể nhận các tính năng động này dưới dạng multi-APK. Để sử dụng chức năng này, bạn phải bật thuộc tính onDemand.

**Làm sao để dowload Dynamic Feature Module trong thời gian chay?**

* Thêm Play Core Library vào  build.gradle
```
dependencies {
    implementation 'com.google.android.play:core:1.3.4'
}
```
* Để tải xuống và quản lí Dynamic Feature trong thời gian chạy, sử dụng lớp [SplitInstallManager](https://developer.android.com/reference/com/google/android/play/core/splitinstall/SplitInstallManager)
```kotlin
val splitInstallManager = SplitInstallManagerFactory.create(this)
```
* Tạo Request dowload: 
```kotlin
val request = SplitInstallRequest
        .newBuilder()
        .addModule("someDynamicModule")
        .build()
```
* Install module với request 
```
splitInstallManager.startInstall(request).addOnSuccessListener {
            
        }
```
* Lắng nghe trạng thái của request 
```Kotlin
val stateListener = SplitInstallStateUpdatedListener { state ->
    when (state.status()) {
        PENDING -> { }
        DOWNLOADING -> { }
        DOWNLOADED -> { }
        INSTALLED -> { }
        INSTALLING -> { }
        REQUIRES_USER_CONFIRMATION -> { }
        FAILED -> { }
        CANCELING -> { }
        CANCELED -> { }
    }
}
splitInstallManager.registerListener(stateListener)
```
* Khi không dùng đến Dynamic Module đó nữa ta có thể uninstall chúng : 
```
splitInstallManager
        .deferredUninstall(Arrays.asList("dynamicModuleUninstall"))
```

## 5. Cách hoạt động của Dynamic Delivery

![](https://images.viblo.asia/c21d8878-46da-43df-95ac-1b0ddd1ad148.png)
Ví dụ: Người dùng có thiết bị Android có cấu hình: arm, xhdpi, en_US sau đó APK cuối cùng sẽ là kết hợp của (base + arm + xhdpi + en) .apk

Nếu người dùng chuyển sang quốc gia khác và thay đổi / thêm ngôn ngữ mới trong cài đặt thiết bị khi người dùng thực hiện Playstore này phát hiện điều này và cố gắng tải xuống phần tách ngôn ngữ bổ sung mới (APK) cho tất cả ứng dụng sử dụng khái niệm phân phối động thiết bị. Nếu internet không có sẵn thì nó sẽ tải xuống sau.


-----


***API >= 21***
![](https://images.viblo.asia/66becbfa-bb46-428b-a54f-343892ca58c3.png)
Phân phối động đầy đủ với Android App Bundles chỉ hỗ trợ với AndLollipop trở lên. Tuy nhiên, nó cũng hỗ trợ trên các thiết bị Lollipop trước nhưng không giảm nhiều trong kích thước ứng dụng. Trên gói ứng dụng trước L thiết bị chỉ phục vụ mật độ, chia tách liên quan đến kiến trúc CPU.


-----

***API < 21***

![](https://images.viblo.asia/28d42fcd-256f-4be2-a3fc-21ce102c96e2.png)
Đối với các thiết bị chạy Android 4.4 (API = 20) và thấp hơn không hỗ trợ tải xuống và cài đặt các APK phân tách (slip APK), nên Google Play sẽ phân phát các APK đó, được gọi là mutli-APK, được tối ưu hóa cho cấu hình của thiết bị. Tức là, nhiều APK thể hiện trải nghiệm ứng dụng đầy đủ của bạn nhưng không bao gồm mã và tài nguyên không cần thiết — chẳng hạn như ngôn ngữ và mật độ màn hình khác và kiến trúc CPU. 

Tuy nhiên, chúng bao gồm các tài nguyên cho tất cả các ngôn ngữ mà ứng dụng của bạn hỗ trợ. Điều này cho phép, ví dụ: người dùng thay đổi cài đặt ngôn ngữ ưa thích của ứng dụng mà không phải tải xuống nhiều APK khác nhau. 

> Lưu ý rằng với Dynamic Delivery, bạn không cần phải tạo, upload và quản lý APK cho mỗi cấu hình thiết bị mà ứng dụng của bạn hỗ trợ. Bạn vẫn tạo và tải lên chỉ một gói ứng dụng duy nhất cho toàn bộ ứng dụng của mình và Google Play sẽ đảm nhiệm phần còn lại cho bạn. Vì vậy, cho dù bạn có dự định hỗ trợ các thiết bị chạy Android 4.4 trở xuống hay không, Dynamic Delivery cung cấp cơ chế phân phối linh hoạt cho cả bạn và người dùng ứng dụng
## 6. Tham khảo
> https://developer.android.com/platform/technology/app-bundle/
> 
> https://medium.com/google-developer-experts/exploring-the-android-app-bundle-ca16846fa3d7
> 
> https://medium.com/mindorks/android-app-bundle-6c65ce8105a1\
> 
> https://proandroiddev.com/modular-and-dynamic-app-delivery-android-app-bundle-9bbfac814787
> 
> https://developer.android.com/studio/projects/dynamic-delivery