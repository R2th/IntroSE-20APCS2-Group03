![](https://i.imgur.com/rwv5iel.png)
# I. Giới thiệu
![](https://i.imgur.com/k6ghld4.jpg)
Lấy ví dụ 1 chút về Facebook nhé. Vào 1 ngày đẹp giời bạn mở app Facebook ra thấy design thay đổi và thấy thêm 1 số chức năng mới nhưng lạ 1 điều là bạn không hề cập nhật ứng dụng trên Google Play hay App Store. Rồi bạn thắc mắc "Có cách nào để làm như vậy không ?"

Câu trả lời của tôi là "Có" vì đã có Code Push hỗ trợ bạn :) 

Vậy thì tóm tắt Code Push là 1 cloud service của **App Center** cho phép developer Apache Cordova và React Native có thể cập nhật ứng dụng trực tiếp tới User.

Vậy thì lợi ích bạn đã thấy ngay:
+ Cập nhật ứng dụng ngay lập tức mà không cần chờ người dùng cập nhật ứng dụng trên Store
+ Thời gian để deploy chức năng mới trong app được rút ngắn
+ Dễ dàng đưa những bản vá, fix bug nhanh chóng cho người dùng 
+ Dễ dàng rollback lại version cũ nếu như bản cập nhật mới có vấn đề (https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli#rolling-back-updates)
 
 và còn nhiều ưu điểm nữa chắc bạn dùng sẽ khám phá thêm nhé.
 
 Do **CodePush** là 1 chức năng của **AppCenter** nên bài viết này tôi sẽ hướng dẫn cho bạn cả 2 luôn nhé. :) 
 
 # II. Hướng dẫn AppCenter và Code Push
 ## 1. Chuẩn bị project 
 
 Okay đầu tiên chúng ta bắt đầu với việc tạo 1 project React Native nhé 
 
 Có 2 cách để làm 
 
 1. Bạn tạo mới project 
~~~
$ react-native init AwesomeProject
~~~

2. Bạn có thể sử dụng lại project cũ mà tôi đã làm trong [Phần 5](https://viblo.asia/p/hoc-react-native-tu-co-ban-den-nang-cao-phan-5-su-dung-react-navigation-3x-va-1-so-chia-se-ca-nhan-WAyK84dWKxX) của tôi

Bằng cách như sau:

```
$ git clone -b bottom_tab_navigator https://github.com/oTranThanhNghia/DemoReactNavigation.git
```

>Chú ý:  Nếu bạn muốn theo dõi hướng dẫn dễ hơn thì tôi đã có sẵn ví dụ cho bạn:
> ```
> $ git clone -b master https://github.com/oTranThanhNghia/DemoReactNavigation.git
> ```
> Và các hướng dẫn dưới đây sẽ dựa trên branch **master**

Sau đó bạn đẩy code lên Github của bạn rồi sang bước 2 này nhé 
 
 ## 2. Chuẩn bị tài khoản trên App Center và build app
 
 ![](https://images.viblo.asia/937d68d7-ae64-47e6-aa84-6538a682636a.png)
 
 Các bạn lên trang https://appcenter.ms/ để đăng ký tài khoản nhé 
 
 + Bước 1: Khi bạn đăng ký xong sẽ thấy cái này 
 
 ![](https://images.viblo.asia/57c8fb1e-b1c7-402a-ba8f-04d9d7d9f4c9.png)
 
 + Bước 2: Bạn tạo app trên App Center.

 ![](https://images.viblo.asia/6eb75519-4b19-4614-a7d8-c66753e7c72e.png)
 
 + Bước 3: Đặt tên ứng dụng của bạn và chọn Android OS, React Native (đối với iOS thì cũng tương tự)
 
 ![](https://images.viblo.asia/fbcce28e-ef77-4f3e-a32d-4a9c93655586.png)
 
 + Bước 4: Bạn chọn liên kết tới Repo chứa code của bạn. Trong bài này tôi chọn GitHub để làm ví dụ. 
 
 ![](https://images.viblo.asia/43fc4fbb-8452-4e52-8bc6-fcd92cbbae0d.png)
 
 + Bước 5: Sau khi bạn liên kết xong Repo thì được như hình dưới đây. Sau đó bạn click nào 1 branch rất kỳ
 
 ![](https://images.viblo.asia/729ef9fe-efd1-415c-86d2-74157d748662.png)
 
 + Bước 6: Bạn chọn nút setting để cấu hình môi trường build
 
 ![](https://images.viblo.asia/69fe9583-ff76-4420-ad25-c5db7a843b3b.png)
 
 + Bước 7: Các bạn chọn chế độ **Build Variant** là release nhé :D vì nó có 2 loại là **debug** và **release**
 
  ![](https://images.viblo.asia/c5aba8ce-a37f-4c03-9600-0d3f1d86cedf.png)
 
 Đến đây có bạn sẽ thắc mắc tại sao phải chọn **Build Variant**  là **release** thay vì **debug** 
 
 Giải thích như sau: 
 
 i) Ở **Release** thì các bạn sẽ không cần bật **Metro Bundler** mà vẫn có thể chạy được app do toàn bộ resources đã được tích hợp bên trong.
 
 ii) Ở **Debug** thì các bạn cần bật **Metro Bundler** và devices của bạn phải được kết nối vào máy tính.  Cái này chỉ phục vụ chính cho lúc code thôi. Nếu như bạn muốn đưa cho ai khác dùng thử app thì bản phải chọn **Release**
 
 **Sign builds** bạn để Off khi bạn đã có key sign trong project. 
 Ví dụ như trong project demo của tôi đã có sẵn như sau:
 https://github.com/oTranThanhNghia/DemoReactNavigation/blob/master/android/app/build.gradle
 
 ```
 
 signingConfigs {
        dev {
            keyAlias "nghia"
            keyPassword "12345678"
            storeFile file('../keystores/dev.keystore')
            storePassword "12345678"
        }
 }
 ...
 
 signingConfigs {
        dev {
            keyAlias "nghia"
            keyPassword "12345678"
            storeFile file('../keystores/dev.keystore')
            storePassword "12345678"
        }
}
...    
    
buildTypes {

        debug {
           signingConfig signingConfigs.dev
        }

        release {
            signingConfig signingConfigs.dev
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }

 ```
 
> Trong đây là key để phục vụ cho demo nên đừng bạn nào mang đi dùng để đẩy App lên Store nhé :)

**Build frequency** thì bạn nên để **manually** nhé vì mỗi lần bạn push commit mới lên Repo thì appcenter sẽ tự động build khi bạn để chế độ build **"every push"**. Còn 1 điều nữa bạn dùng tài khoản free nên sẽ có giới hạn thời gian build là **240 phút/tháng** thôi. Bạn có thể tham khảo thêm tại đây https://visualstudio.microsoft.com/app-center/pricing/

Okay, khi đã chọn xong môi trường thì bạn ấn **Save & Build** nhé.

+ Bước 8: Quá trình build sẽ mất kha khá thời gian đấy nên bạn có thể nghe 1 bản nhạc của Sơn Tùng xong là vừa

Ví dụ như bài **Hãy trao cho anh** nhé
{@embed: https://www.youtube.com/watch?v=knW7-x7Y7RE}
  
Okay nếu như bạn xem xong thì chắc Appcenter cũng đã build hoàn tất. Kết quả trông sẽ như sau. Bạn ấn **Download** để tải apk về nhé.
 
 ![](https://images.viblo.asia/1ecdffb8-5b2f-433b-a310-45694a012e32.png)
 
 Về các bước bên iOS cũng tương tự nhưng do chính sách giới hạn tài khoản free Apple Developer nên tôi khó có thể demo cho bạn build release cho iOS được. Muốn làm được thì tôi phải mua với giá [99$](https://developer.apple.com/support/purchase-activation/). Vậy nên tôi xin phép hạn chế phạm vi bài viết này.
 
##### Đến đây bạn coi như đã hoàn thành xong các bước cơ bản để có thể sử dụng AppCenter cho việc test, build và release app rồi nhé.
 
 ## 3. Cài đặt, cấu hình appcenter và code-push trên terminal 
 
 > Ở bước trên bạn đã build ra 1 bản release và đẩy lên Store, các bước dưới đây tôi sẽ giúp bạn cách cập nhật ứng dụng react native trực tiếp tới người dùng mà không cần phải đẩy lại app mới lên Store.
 > 

### 3.1. Cài đặt App Center CLI

Đầu tiên bạn cài cho máy bạn

```
$ npm install -g appcenter-cli
$ appcenter login                 # Login to appcenter
```

Lúc này trên web xuất hiện mã như dưới đây xong bạn copy lại vào terminal để login nhé.
 
 ![](https://images.viblo.asia/1dce42fe-f295-4f50-93bc-7442b713bb1e.png)
 
 #### * Chia sẻ cá nhân về appcenter-cli
 
 Khi bạn gõ lệnh appcenter-cli trên terminal thì mặc định sẽ không tự động bật chế độ **autocomplete** 
 Bạn phải gõ lệnh sau để bật lên:
 
 ```
$ appcenter setup-autocomplete
 ```
 
 Chi tiết bạn xem trong https://github.com/microsoft/appcenter-cli nhé
 
 ### 3.2. Cài đặt library hỗ trợ cho project
 
 Đầu tiên các bạn cài AppCenter SDK trước nhé.
 
 Các bạn có thể xem chi tiết trong https://github.com/microsoft/appcenter-sdk-react-native 
 
 ```
$ npm install appcenter appcenter-analytics appcenter-crashes --save
$ react-native link appcenter appcenter-analytics appcenter-crashes
```
Chờ 1 lúc là sẽ ok nhé. 

Okay đến đây bạn quay trở lại https://appcenter.ms để điền 1 số key cho Android và iOS nhé.

Bước này là bạn đã làm xong trong bước **2. Chuẩn bị tài khoản trên App Center và build app** ở trên


![](https://images.viblo.asia/5458d586-80d8-4a3c-a1d9-a021f840eb8a.png)

Trong đó :

+ DemoReactNativigation dành cho Android 
+ DemoReactNavigation-iOS dành cho iOS 

#### 3.2.1 Bên Android
Các bạn vào app DemoReactNativigation rồi copy key sau vào project bên Android nhé

![](https://images.viblo.asia/b26ea85b-8412-4238-b1d1-6a84512855d2.png)

![](https://images.viblo.asia/263dd4b8-cfa7-45d6-8c80-0583368a2ee0.png)

Okay thế là xong cho Android

#### 3.2.2 Bên iOS
Các bạn vào app DemoReactNativigation-iOS rồi copy key sau vào project bên iOS nhé

![](https://images.viblo.asia/1e5d2171-b3ca-481d-81c7-f10d8819ddaa.png)

![](https://images.viblo.asia/8db091d6-1099-49cb-9ce6-2dd01ab13e7a.png)


Đến hết bước này là bạn đã cài xong AppCenter SDK rồi nhé



### 3.3. Giới thiệu và cấu hình Code Push

![](https://images.viblo.asia/d3a96660-895e-4601-aba0-8551ed2d4d77.png)

Mô tả cơ bản về cách CodePush hoạt động:

+ Đầu tiên Developer sẽ deploy code bằng termimal để push code và resource mới lên CodePush Cloud
+ Với thời gian định kỳ bạn set trong code thì App sẽ hỏi CodePush Cloud có bản cập nhật mới hay không. Nếu có thì sẽ tải về và cập nhật ứng dụng

Các bạn gõ lệnh terminal sau:

```
$ npm install --save react-native-code-push # Install the code push client sdk
$ react-native link react-native-code-push  # Link this npm with the natvie build
```

Okay đến đây bạn quay trở lại https://appcenter.ms để điền 1 số key cho Android và iOS nhé.

Bước này là bạn đã làm xong trong bước **2. Chuẩn bị tài khoản trên App Center và build app** ở trên


![](https://images.viblo.asia/5458d586-80d8-4a3c-a1d9-a021f840eb8a.png)

Trong đó :

+ DemoReactNativigation dành cho Android 
+ DemoReactNavigation-iOS dành cho iOS  

Trong demo này tôi tạm thời sẽ dùng key Production để trông giống với những gì bạn phải làm.

#### 3.3.1 Bên Android

Bạn copy code Production vào Android nhé

![](https://images.viblo.asia/3223ed97-1cd3-4d7c-a70f-30b7be3c3ebc.png)

![](https://images.viblo.asia/58a0533f-bef1-4564-bf77-fba686be29cc.png)

#### 3.3.2 Bên iOS

Bạn copy code Production vào iOS nhé

![](https://images.viblo.asia/53961373-cdfe-425d-a8fb-6f84dfcd11d5.png)

![](https://images.viblo.asia/f49fa172-25c3-427f-9aef-92946bbdb282.png)


Okay, đến đây quay trở về code React Native nhé 

#### 3.3.3 React Native 

Trong file `App.js` bạn thêm đoạn code như sau:

```javascript
import codePush from "react-native-code-push";
...

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
};
class App extends Component<Props> {
  render() {
    return <AppNavigator />;
  }
}

export default codePush(codePushOptions)(App);
```

Chi tiết trong https://github.com/oTranThanhNghia/DemoReactNavigation/blob/master/app/App.js

Đoạn code này sẽ giúp codepush xác định thời điểm cập nhật ứng dụng 
Trong đó: 
+ **checkFrequency** là xác định lúc nào hỏi CodePush Cloud có bản cập nhật mới hay không. Ở đây tôi đang để tự động check ở trạng thái `ON_APP_RESUME`  (chi tiết https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md#checkfrequency)
+ **installMode** là xác định thời điểm cài bản cập nhật. Ở đây tôi đang để `IMMEDIATE` cài ngay khi có bản cập nhật  (chi tiết https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md#installmode)

Và để biết được code đã được thay đổi, bạn thêm đoạn code sau để xác định cho dễ 

```javascript
export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        />
+++        <Text> App version 1.0</Text> 
      </View>
    );
  }
}
```

Đoạn `<Text> App version 1.0</Text>` sẽ giúp bạn sẽ nhìn nhất trong demo lần này.


#### Câu lệnh deploy code lên CodePush Cloud

```
$ appcenter codepush release-react -a <ownerName>/<appName>
```

Trong đó: 
+ **ownerName** là tên đăng nhập của bạn. Các bạn nhìn trong https://appcenter.ms/settings phần Profile nhé.
+ **appName** là app bạn muốn deploy. Tên app là ở đây nhé.

![](https://images.viblo.asia/5458d586-80d8-4a3c-a1d9-a021f840eb8a.png)

> Chú ý: Devices của bạn phải có Internet thì mới cập nhật được nhé. :D 

Để chi tiết hơn cho đoạn deploy này, bạn hãy qua xem cách **DEMO** dưới đây nhé.
 # III. Demo
**Kiểm tra device android và ios của bạn đã kết nối Internet.**

## 1. Demo Android

Các bạn build vào device như sau:

![](https://images.viblo.asia/7a0eb830-25df-4ca1-b3e1-91dcc3f4af72.png)

Khi bạn đã chạy app lên máy Android xong thì bạn sửa file HomeScreen.js 

`App version 1.0` thành `App version 1.1`nhé xong rồi **Save** lại 

dùng lệnh sau deploy code:
 ```
$ appcenter codepush release-react -a <ownerName>/DemoReactNavigation -d Production // Android
 ```
 
 Trong đó: `-d Production` là deploy trên Production.
 
![](https://images.viblo.asia/90ddf680-1c9b-4dd3-94f7-eaaf5ec9af63.png)
![](https://images.viblo.asia/61009fb9-0832-4455-8330-3156c0707a2f.png)

Khi deploy xong các bạn back ra màn hình Home rồi vào lại để app check cập nhật nhé.
Và dưới đây là kết quả.

![](https://images.viblo.asia/348abead-0507-45c2-ab65-88dd3773022c.gif)

* Chú ý: Nếu bạn không thấy cập nhật ngay thì bạn vào 
`DemoReactNavigation/Distribute/CodePush/{version}` để bật **Required Update**nhé 
![](https://images.viblo.asia/1a390b43-7145-4cfa-b6b5-bcec890f44d3.png)

## 2. Demo iOS

Các bạn cấu hình lại Xcode như sau để build release cho iOS:
![](https://images.viblo.asia/c4a9d346-f875-4eb7-98a0-11bfb3b9592e.png)
![](https://images.viblo.asia/83f11659-2d07-4cb4-96b0-daef21392b3b.png)

Khi bạn đã chạy app lên iOS xong thì bạn sửa file HomeScreen.js 

`App version 1.0` thành `App version 1.1`nhé xong rồi **Save** lại 

dùng lệnh sau deploy code:
  ```
$ appcenter codepush release-react -a <ownerName>/DemoReactNavigation-iOS -d Production // iOS
 ```
![](https://images.viblo.asia/0a78b41a-5e0a-4f51-b661-93115fe1566f.png)

Khi deploy xong các bạn back ra màn hình Home rồi vào lại để app check cập nhật nhé.
Và dưới đây là kết quả.

![](https://images.viblo.asia/e8de2826-0387-4285-abbb-d28d7e842e30.gif)
 
 # IV. Tài liệu tham khảo
 
1. https://codeburst.io/react-native-updates-with-vs-app-center-codepush-3d56ef07f1c4
2. https://medium.com/@rajanmaharjan/get-started-with-wonderful-technology-d838aafdc2d3
3. https://github.com/microsoft/appcenter-cli
4. https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native
5. https://github.com/microsoft/appcenter-sdk-react-native
6. https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native
7. https://medium.com/reportbee/dynamic-delivery-in-react-native-codepush-9e3856e3a68a
8. https://github.com/microsoft/appcenter-sdk-react-native/issues/420#issuecomment-506736243
9. https://www.youtube.com/watch?v=9kMGCeiVnm0
10. https://www.youtube.com/watch?v=OEjv4iBzUJU