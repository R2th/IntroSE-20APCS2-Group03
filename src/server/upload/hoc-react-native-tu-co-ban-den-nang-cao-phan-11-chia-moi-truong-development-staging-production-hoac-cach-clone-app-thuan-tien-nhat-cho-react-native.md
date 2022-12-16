![source: https://hackernoon.com/drafts/ro2832a9.png](https://images.viblo.asia/29b99fca-c8ad-4b1c-9ad0-7992a368c38f.png)
# I. Dùng khi nào ?
Mục đích của bài viết này sẽ giúp:
## 1. Để clone ra nhiều app trên cùng 1 project

Okay có tình huống tương đối phổ biến như sau: 

Bạn có 1 project ngon lành về đọc tin tức nhưng giờ bạn muốn tạo các app khác nhau để bán cho khách hàng như App thể thao, App tin tức học đường, App tin tức chính trị, ... và bạn thấy tất cả những app đó đều có thể dùng chung 1 project. Việc duy nhất ở đây chỉ là đổi biến môi trường, thay icon hay style cho app là xong :D.

Vậy đây chính là giải pháp của bạn để dễ dàng đóng gói 1 app mới cho khách hàng 1 cách nhanh chóng và thuận tiện cho việc maintain (nếu như không có sự sai khác về business :) ) 
 
## 2. Để thuận tiện cho việc phát triển, testing và đưa lên production 

Tình huống thứ 2 như sau:

Bạn làm app cho ngân hàng nhưng bạn không thể dùng server thật để chạy thử các chức năng trừ/cộng tiền cho khách hàng được; bạn cần 1 server mock để tiện cho việc coding và test hoàn thiện nhất rồi mới đưa cho khách hàng sử dụng. 

Câu hỏi trong đầu của bạn sẽ là "Làm cách nào để đổi giữa các môi trường dễ dàng nhất ?"

Còn rất nhiều tình huống khác nữa bạn sẽ gặp phải nhưng tạm thời tôi chỉ nêu như vậy để các bạn có thể dễ dàng hình dung trước khi đi vào sử dụng 

> Do bài viết khá dài nên tôi sẽ giải thích ngắn gọn nhưng thay vào đó tôi chèn nhiều hình ảnh để các bạn dễ làm theo 

***Okay bắt đầu thôi !***

# II. Demo
Đầu tiên tôi sẽ demo trên Xcode và Android Studio trước để các bạn dễ hình dung và mường tượng được kết quả của bài viết chia môi trường này :D 

> Đây là repo tôi đã làm để các bạn có thể xem được kết quả https://github.com/oTranThanhNghia/SimpleAppReactNative1. 
> 
> Chú ý bên ios do tôi không thể chia sẻ certificate cho các bạn được nên các bạn phải làm theo hướng dẫn để chạy app nhé 
## 1. Android

Chọn 1 loại trong danh sách dưới đây
![](https://images.viblo.asia/0bfcc657-79d6-42eb-9ee4-cadc76540deb.png)

Kết quả trên điện thoại 

![](https://images.viblo.asia/3ed83909-e9e3-417f-8f46-6ca81ed30c27.png)

## 2. iOS

Trên Xcode sẽ có 3 môi trường để chọn 

![](https://images.viblo.asia/0e3b1dde-63d1-4f38-8ebc-4a2ea2c49980.png)

Còn đây là kết quả trên điện thoại 

![](https://images.viblo.asia/a2093473-0319-48b6-8df0-fcdb81533b60.jpeg)


# III. Hướng dẫn cài đặt
Trong bài viết tôi sẽ hướng dẫn tạo ra 3 môi trường là development, staging và production. Còn việc tại sao lại có 3 môi trường này thì mình đưa ra 1 bài viết khác để tóm tắt ngắn gọn nhất cho bạn là:

[Difference Between Development, Stage, And Production](https://dev.to/flippedcoding/difference-between-development-stage-and-production-d0p)

## Góc ủng hộ 

Bài viết này mình dựa trên https://github.com/maxkomarychev/react-native-ultimate-config và chạy thấy khá ổn định cho các dự án react native mà mình đã làm trong thời gian qua. 

Vậy nên các bạn hãy vào ủng hộ 1 star để ủng hộ mấy anh em dev phát triển thư viện này nhé. Mình xin cảm ơn ! <3 

## 1. Các bước chuẩn bị 

Để tiện theo dõi bài viết tôi cần thống nhất những thứ sau:

1. Chuẩn bị máy macos để build cho cả android và ios
2. React native: **0.63.3**
3. Xcode: 12.1
4. Android Studio: 4.1
5. Node: 14.7.0

Bên phía khác gồm:

* Chuẩn bị backend cho các môi trường development, staging và production 
* Tạo tài khoản firebase với các môi trường development, staging và production 

Ví dụ tôi đã tạo sẵn như dưới đây 

![](https://images.viblo.asia/102e4c10-1127-4798-9044-22d5c6884d2c.png)


* Tạo môi trường development, staging và production tương ứng cùng với các dịch vụ bên thứ 3 khác như Facebook, Twitter, ... 

> Chú ý: Bạn phải chuẩn bị máy mac thật khoẻ để build nhé. Vì khi dự án càng lớn thì build app sẽ càng lâu. Nhất là đối với ios, build ra được 1 file ipa chắc bạn có thể ngủ được 1 giấc kha khá :) 

## 2. Về project React Native

```
$ yarn add react-native-ultimate-config
$ cd ios 
$ pod install
```

Dựa theo tài liệu https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/quickstart.md

Tạo 3 môi trường dev, stag và prod

![](https://images.viblo.asia/dcc0a391-3916-4b7a-9faf-0b9a03183e50.png)

file .env 
```
ENV=init
```

* file .env.dev.yaml

```yaml
ENV: dev
BASE_URL: https://newsapi.org
API_KEY: 2761498486644b8e8bd7af2861768628
```

* file .env.prod.yaml

```yaml
ENV: prod
BASE_URL: https://newsapi.org
API_KEY: 2761498486644b8e8bd7af2861768628
```

* file .env.stag.yaml

```yaml
ENV: stag
BASE_URL: https://newsapi.org
API_KEY: 2761498486644b8e8bd7af2861768628
```

cập nhật .gitignore 
```
# react-native-ultimate-config
rnuc.xcconfig
```

Chạy script sau để sinh các file cho native 

```
$ yarn rnuc .env
```

**Tạo file config để sử dụng trong javascript**

![](https://images.viblo.asia/6eb00f79-52f9-4946-a496-808af29f59c9.png)


## 3. Về Android

Tham khảo 
https://developer.android.com/studio/build/build-variants

thêm đoạn script sau 

```java
flavorDimensions "root"
    productFlavors {
        dev {
            applicationId "com.ngh.simpleappreactnative1.dev"
            dimension 'root'

            signingConfig signingConfigs.debug
        }

        stag {
            applicationId "com.ngh.simpleappreactnative1.stag"
            dimension 'root'

            signingConfig signingConfigs.debug
        }

        prod {
            applicationId "com.ngh.simpleappreactnative1"
            dimension 'root'

            signingConfig signingConfigs.release
        }
    }
```

thêm signingConfigs cho release 

> Chú ý: Các bản phải tạo keystore riêng cho production nhé. Còn trong bài viết này tôi sẽ sử dụng lại debug keystore để demo 

![](https://images.viblo.asia/af72caa5-a58a-471e-ba63-fe541e4b2474.png)


vào app/build.gradle

![](https://images.viblo.asia/2d59d5ed-122a-4e80-963e-4e6b8611ce0c.png)

okay giờ các bạn thêm script sau để nhận các file .env đã được tạo ở trên ( docs: 
https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/cookbook.md#using-multiple-flavors-android)

trong file android/app/build.gradle

![](https://images.viblo.asia/3ce33276-1536-48da-b108-f90186b09950.png)

Trong file MainApplication.java thêm đoạn sau 

```java
// import module
import com.reactnativeultimateconfig.UltimateConfigModule;

...

@Override
public void onCreate() {
   super.onCreate();
   ...
   UltimateConfigModule.setBuildConfig(BuildConfig.class); // expose
}
```


Tạo config cho mỗi product flavor

![](https://images.viblo.asia/f97ae184-c51b-4c6e-93f1-e3cbf51639cb.png)

về file `google-services.json` cho mỗi loại thì các bạn tải ở đây

![](https://images.viblo.asia/102e4c10-1127-4798-9044-22d5c6884d2c.png)

Khi đã tạo xong thì sẽ được kết quả như sau trên Android Studio

![](https://images.viblo.asia/0bfcc657-79d6-42eb-9ee4-cadc76540deb.png)



## 4. Về iOS

### a) Chuẩn bị tài khoản apple developer (mất phí) và tạo Bundle Identifier

![](https://images.viblo.asia/a82f98cb-e4cf-4dca-bb12-d811f2bd5ff7.png)

![](https://images.viblo.asia/fa7d9761-ca16-4458-8737-c98a3606b1ae.png)

![](https://images.viblo.asia/097db197-1ad1-4733-8205-848c0986e40f.png)

![](https://images.viblo.asia/dc964de1-cd30-4d80-939f-cf3d1d500acd.png)


Bundle ID này sẽ là cho môi trường production 
com.ngh.simpleapp.reactnative3

Tương tự với 2 môi trường Development và Staging còn lại tôi sẽ tạo được kết quả như sau 

![](https://images.viblo.asia/7b4f76e9-f554-45ad-82a2-b32a6ed5dde6.png)

> Lưu ý: Bạn vào keychain access rồi export ra AppleDistributionCertificates.p12 và AppleDevelopmentCertificates.p12 để người khác sử dụng nữa nhé 


### b) Tạo certificate 

> Bạn có thể bỏ qua bước này nếu đã có certificate rồi.

![](https://images.viblo.asia/24e7ff4d-db41-479a-9ee1-a363a6867b44.png)

tạo file request

![](https://images.viblo.asia/e377cefd-350c-4609-b2cf-2be478dfceea.png)


tạo certificate

![](https://images.viblo.asia/d99c22f4-f3b8-4a7a-b012-f2c666c627cc.png)

Các bạn sẽ phải tạo 2 certificate (Development và Distribution)
các bước thì y hệt giống nhau 

![](https://images.viblo.asia/dfc6e912-2f1f-4abe-bfe4-68e6a6f5f3c4.png)

còn bạn nào bị báo đỏ thì kiểm tra mình có thể dùng lại certificate đã có (vì bạn đã tạo đến giới hạn apple cho phép)

![](https://images.viblo.asia/a3edb913-5b21-46f6-aa03-4a004c59067e.png)

Chọn file request bạn đã có ở trên 

![](https://images.viblo.asia/33d74ca1-42bb-470a-9604-27ee148d8242.png)

Ấn download 

![](https://images.viblo.asia/9ec18bfa-3857-4bd8-bb04-71996ebc81f3.png)

Khi tải về bạn sẽ nhận được 1 file 

![](https://images.viblo.asia/523cee4e-0cf2-43fe-a13e-539772995509.png)

Sau đó bạn click đúp để cài certificate đó vào máy.

Bạn mở app Keychain Access trên máy mac sẽ thấy 

![](https://images.viblo.asia/6f855f85-1b80-4c5b-a8c9-b271524691a7.png)

và thời gian expires giống với trên trang  developer apple ở trên 

Tương tự đối với certificate cho distribution thì sẽ có kết quả như sau

![](https://images.viblo.asia/41acd760-8196-47a6-a2ea-ed74b0707584.png)



### c) Tạo profile 

#### Development

![](https://images.viblo.asia/f07facaf-e71d-4bc9-81b0-d5f3b9be59b4.png)

Các bạn cần tạo ít nhất 3 môi trường (Development, Ad Hoc và App Store ) cho app ios

![](https://images.viblo.asia/8fcdfdee-d610-4fba-8238-b16bff8f9ba8.png)

tiếp tục demo với development

![](https://images.viblo.asia/a4fda9be-3d81-4aaf-a731-cb7a86706788.png)


Chọn certificate 

![](https://images.viblo.asia/620faf2e-bde6-4410-a5d3-55e326183ad4.png)


Chọn các device cho phép chạy app 

![](https://images.viblo.asia/ac8b56db-797e-4d3a-804e-391996ef923d.png)


Đặt tên cho provisioning profile 

![](https://images.viblo.asia/5d9ac0a1-5edc-421a-a414-cd40d6730189.png)

#### Ad Hoc và App Store

![](https://images.viblo.asia/19705436-77b2-41ea-9688-64bd76d471b8.png)

Tương tự như development bạn sẽ chọn app ID, certificate và các devices 

Khi tạo xong tất cả thì bạn upload lên đâu đó để team bạn dùng chung nhé

Ví dụ để lên google drive chẳng hạn 

![](https://images.viblo.asia/d8dfff2a-e88b-401e-a530-57e1475f00a1.png)



### d) Cấu hình trên xcode 


Sau khi cài đặt` react-native-ultimate-config` và chạy lệnh 

```
$ yarn rnuc .env
```

thì sẽ có 1 file `rnuc.xcconfig` xuất hiện trong folder `ios/` của bạn 

Lúc này bạn kéo file `rnuc.xcconfig` vào xcode như sau

![](https://images.viblo.asia/b98de56e-d828-46ce-83ab-7de989aad667.png)

sau đó chọn target bạn muốn 

![](https://images.viblo.asia/8f06475b-cf9c-4efe-9ead-84406ee0b0dc.png)

#### b.1. Tạo Configuration mới 

Trong setting của project xcode -> chọn phần project, tab Info, tìm phần Configurations, sau đó ấn nút + để thực hiện Duplicate Debug Configuration để tạo ra DebugDev, DebugStag và đổi tên Debug -> DebugProd, tương tự Duplicate Release Configuration để tạo ra ReleaseDev, ReleaseStag và đổi tên Release -> ReleaseProd

Kết quả sẽ như sau

![](https://images.viblo.asia/d28c5c24-a1af-4703-a8f3-bcae8232b49e.png)

Đổi based on configuration file về `rnuc`

![](https://images.viblo.asia/99a5ab01-d573-44f5-9f0f-ec2cad5f3b82.png)


#### b.2. Tạo scheme mới

Ấn vào biểu tượng app góc trên bên trái xcode -> Chọn Manage scheme

![](https://images.viblo.asia/54fe712b-afd3-4d30-9372-a27b54a6021c.png)

Ấn nút + để tạo thêm 2 scheme mới là SimpleAppReactNative1_Dev, SimpleAppReactNative1_Stag

Sau đó sửa tên scheme cũ thành SimpleAppReactNative1_Prod

Bạn phải chắc chắn chọn target SimpleAppReactNative1 là app như hình ảnh dưới đây 

![](https://images.viblo.asia/c440cd97-a909-41e9-a853-a2ac6bb4c6bc.png)

Kết quả tạo xong scheme như sau

![](https://images.viblo.asia/41377162-b274-45fd-987a-91b13fbec4b7.png)

và ở xcode sẽ xuất hiện 3 scheme 

![](https://images.viblo.asia/8fb0f5a7-e5e1-401d-ae44-c74c9941d8ff.png)


#### b.3. Thiết lập config build cho Scheme

Edit 3 schemes mới với config : Run, Test, Analyze chọn build configuration Debug<config tương ứng> , Profile và Archive chọn build configuration Release<config tương ứng>

* Scheme: SimpleAppReactNative1_**Dev**

![](https://images.viblo.asia/c655a79f-e19c-4b30-9432-e210f8854ff3.png)

Vào Build-> pre-actions để tạo script

![](https://images.viblo.asia/c7242a29-5a3f-402e-ab7b-49f75cfadbe2.png)

chọn target cho `provide build setting from` 

![](https://images.viblo.asia/7a0f58f7-9db1-4047-b314-32b481001953.png)

Thêm script theo tài liệu https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/cookbook.md#using-multiple-schemes-ios

![](https://images.viblo.asia/3028576e-35c7-4cb8-9dab-65e9b339989c.png)

```java
if [ -d "$HOME/.nvm" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
fi

RN_ROOT_DIR=$(dirname "$PROJECT_DIR")

cd "$RN_ROOT_DIR"
yarn run rnuc ".env.dev.yaml"
```

* Scheme: SimpleAppReactNative1_**Stag**

![](https://images.viblo.asia/faa3ac6f-3980-467e-bfda-a5b4aad496f3.png)

Với Build-> pre-actions cũng tương tự như Dev

![](https://images.viblo.asia/7a6b7a4d-df37-4f75-b067-f58497b12cd3.png)


* Scheme: SimpleAppReactNative1_**Prod**

![](https://images.viblo.asia/fd22c316-d33b-45c0-be0d-acb264e49a06.png)

Với Build-> pre-actions cũng tương tự như trên ![](https://images.viblo.asia/9268e0f3-80e8-413f-bcf0-ec811c6a10d2.png)




Bạn mở file Podfile thêm những config sau (dựa theo config [project](https://guides.cocoapods.org/syntax/podfile.html#project) của cocoapods )

![](https://images.viblo.asia/a4806331-5eee-40f6-adaa-c0ae22556198.jpg)


Rồi chạy lại lệnh 

```
$ pod install
```

#### b.4. Thiết lập Info.plist theo Scheme

Clone file Info.plist, để cùng thư mục và sửa tên thành Info-Prod.plist,  Info-Stag.plist, Info-Dev.plist và add vào project.
Mỗi 1 scheme sẽ có 1 .plist riêng để tiện cấu hình

Kết quả sẽ như sau 

![](https://images.viblo.asia/d3411f1d-30df-4a2d-ac5a-a1f2ce590803.png)


Sửa lại path tương ứng 

![](https://images.viblo.asia/b283f906-bced-4248-b29d-89a8dfff17e4.png)


#### b.5. Thiết lập Bundle Identifier tương ứng với scheme

Như đã tạo các Bundle Identifier trên developer apple

![](https://images.viblo.asia/7b4f76e9-f554-45ad-82a2-b32a6ed5dde6.png)

thì các bạn sẽ sửa tương ứng như sau 


![](https://images.viblo.asia/be661983-379b-4b0d-b3d2-8a6a3d2ae976.png)

#### b.6 Thiết lập Firebase config theo Scheme tương ứng

Tạo 1 thư mục mới tên là AppConfig bên trong chia ra như sau

![](https://images.viblo.asia/cb82c869-2886-4471-a085-0bce5a13efb9.png)

Mỗi file GoogleService-Info.plist sẽ được tải về từ đây

![](https://images.viblo.asia/7469f3ba-3b05-4661-bf27-2f5e1c790095.png)


Vào Build Phase thêm script như sau: https://stackoverflow.com/a/48789232

![](https://images.viblo.asia/9c3d485b-be2d-4703-8a4b-20583837954b.png)

![](https://images.viblo.asia/9cbe6188-e88a-44e9-952e-3c4607f2f484.png)

```java
# Type a script or drag a script file from your workspace to insert its path.
PATH_TO_GOOGLE_PLISTS="${PROJECT_DIR}/SimpleAppReactNative1/AppConfig"

case "${CONFIGURATION}" in

   "DebugDev" | "ReleaseDev" )
        cp -r "$PATH_TO_GOOGLE_PLISTS/Dev/GoogleService-Info.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;
        
   "DebugStag" | "ReleaseStag" )
        cp -r "$PATH_TO_GOOGLE_PLISTS/Stag/GoogleService-Info.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;        

   "DebugProd" | "ReleaseProd" )
        cp -r "$PATH_TO_GOOGLE_PLISTS/Prod/GoogleService-Info.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;

    *)
        ;;
esac

```

>  **Lưu ý trong Target -> Build Phases -> Copy Bundle Resources**
Chỉ nên để 1 file GoogleSerivce-Info.plist. Nếu nhiều hơn thì sẽ build lỗi

![](https://images.viblo.asia/d1c442c7-9245-4793-ae0c-9e8c5fd786ed.png)


**Okay vậy đến đây là xong. Nếu có bất kỳ vấn đề nào khi đang làm, bạn có thể comment ở dưới để mình hỗ trợ nhé :)**


# IV. Tài liệu tham khảo
https://github.com/maxkomarychev/react-native-ultimate-config