Một trong những đặc điểm mà bạn phải phát triển khi xây dựng ứng dụng là tính đơn giản và liền mạch **login and sign up flow** trong việc mà người dùng không cần phải ghi nhớ mật khẩu phức tạp.

 Một tùy chọn rất thú vị cho việc này là **Facebook’s Account Kit** cung cấp quy trình xác thực số điện thoại thông qua SMS, miễn phí.
 
* Account Kit cho phép mọi người nhanh chóng đăng ký và đăng nhập vào ứng dụng của bạn bằng cách chỉ sử dụng số điện thoại hoặc địa chỉ email của họ - không cần mật khẩu. Nó có độ tin cậy cao, dễ sử dụng và cho bạn lựa chọn về cách đăng ký ứng dụng.*
   ref.: https://developers.facebook.com/docs/accountkit/
   Sử dụng phương thức xác thực này, chúng ta có thể giảm rủi ro khi đăng kí hàng loạt, vì mọi người dùng phải cung cấp số điện thoại hợp lệ, thứ mà không dễ dàng để có được như tài khoản email.
##    Một chút về kiến trúc
Nói chung, như trong bất kỳ kiến trúc client/ server nào, chúng ta cần biết liệu người dùng đang cố truy cập tài nguyên có phải là người dùng hợp lệ hay không.

Không đi sâu vào chi tiết, ý tưởng là mọi yêu cầu của client nên bao gồm một tiêu đề Ủy quyền để được xác định từ server và cấp quyền truy cập vào tài nguyên được đề cập.

Để hiểu được luồng giữa client  và server  chúng tôi đã thiết kế sơ đồ này mô tả từng bước xác minh dữ liệu:

![](https://images.viblo.asia/613a0a1c-97b6-4ec3-a02c-fbe08eed754d.png)
1. Người dùng xác thực số điện thoại của họ qua SMS và sau đó lấy mã Facebook chỉ có thể được sử dụng một lần.
2. Ứng dụng sẽ gửi mã đó đến **Authorization API** 

3. **Authorization API**  xác minh rằng mã hợp lệ và, nếu có, sẽ trả về JWT.

4. Khi chúng tôi có được JWT, Ứng dụng di động sẽ kiểm tra **Services API** bao gồm giá trị của JWT này làm tiêu đề ủy quyền để truy cập tài nguyên.

## Cùng bắt tay vào làm thôi !
Một thời gian trước tại Underscope, chúng ta đã phát triển react-native-facebook-account-kit, một thư viện để dễ dàng tích hợp Bộ tài khoản trong dự án React Native.

Ở các bước tiếp theo, chúng ta sẽ:

1. Tạo và định cấu hình một ứng dụng trên web dành cho nhà phát triển của Facebook.
2.  Tích hợp thư viện kit-Reac-facebook-account-kit vào một dự án React Native mới.
3. Cấu hình dự án với dữ liệu thu được từ ứng dụng mới được tạo.
4. Xác thực rằng luồng hoàn chỉnh hoạt động đúng với một ví dụ đơn giản.
## Tạo ứng dụng trên Facebook
Bước đầu tiên là tạo một ứng dụng trên Facebook và lấy dữ liệu cần thiết để thiết lập ứng dụng của chúng tôi sau đó.

.Từ trang Facebook, https://developers.facebook.com/apps/, nhấp vào nút Thêm ứng dụng mới![](https://images.viblo.asia/6290b3c9-7b71-47b5-8490-2d8c83e0a531.png)

.Nhập tên ứng dụng của bạn và e-mail liên hệ trên các trường đầu vào:

![](https://images.viblo.asia/b1105159-e9eb-49f5-b43e-bf7eca31b7f6.png)

.Trong trang Add a Product, nhấn vào nút Set Up trên Account Kit

![](https://images.viblo.asia/6c489cda-7f8f-48e6-af52-62a362185e20.png)


Sau khi nhấp vào Thiết lập, chúng ta sẽ bỏ qua *Quickstart* và quay lại phần Cài đặt cơ bản của ứng dụng

![](https://images.viblo.asia/9b1f9188-ff28-4b0a-ba1a-376f5fdb7bce.png)

Tại cuối của phần Settings   click  Add Platformbutton và chọn 1 một trong các Platform .Ở đây chúng tôi chọn  iOS

![](https://images.viblo.asia/161b5912-1188-47e4-889e-23319c6f75e6.png)

Tiếp theo config iOS bundle ID  của ứng dụng . Trong trường hợp của chúng ta, nó sẽ là *io.underscope.example.accountkit* . Hơn nữa chúng ta sẽ cần điều này để thiết lập dự án của chúng ta.

![](https://images.viblo.asia/8a6913fa-53da-40cd-a043-ba77f652c4ac.png)

Chúng ta cũng làm giống như vậy với **android**

![](https://images.viblo.asia/560fd6de-9996-4b0b-a4c1-0d81e43d4358.png)
![](https://images.viblo.asia/29d4448f-d52d-4e9b-819a-46379929f23b.png)

Giờ chúng ta lưu thay đổi sau đó đến Account Kit’s Settings , chuyển đổi **Require server validation** option và sau đó click **Get Started**

![](https://images.viblo.asia/4bb00293-1f14-4b40-8fbf-816c6d9d699b.png)

Trong phần tiếp theo, chúng tôi sẽ lấy dữ liệu chúng tôi cần cho ứng dụng: **Account Kit App Secret & Account Kit Client Token**.  Chúng sẽ có ích trong các bước tiếp theo:

![](https://images.viblo.asia/c565a1ca-21eb-4d10-9755-35834388ece4.png)

### **Tích hợp Facebook Account Kit**

**Các bước được chia sẻ giữa Android và iOS**

Điều đầu tiên chúng ta cần làm là tích hợp mô-đun vào ứng dụng React Native của chúng tôi bằng cách sử dụng *yarn* và sau đó *link* các thư viện riêng 
```
yarn add react-native-facebook-account-kit
react-native link react-native-facebook-account-kit
```
## IOS
Chúng tôi khuyên bạn nên làm theo các bước tiếp theo bằng cách sử dụng Cocoapods. Nhưng bạn có thể tìm thấy thông tin về cách tiến hành thủ công trên dự án repo Github của dự án.

Trên thư mục iOs, loại bỏ mọi thay đổi được tạo bằng cách sử dụng liên kết ở bước trước. Nếu bạn sử dụng git, trên terminal của bạn, bạn có thể nhập git checkout - ios
Thêm RNAccountKit vào Podfile của bạn (nếu bạn đã tạo ra tệp này, bạn có thể làm như vậy bằng cách làm theo các hướng dẫn trên trang React ). Trong ví dụ này, Podfile cuối cùng sẽ trông như thế này:

```
target 'AccountKitExample' do
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket',
  ]
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
  pod 'RNAccountKit', :path => '../node_modules/react-native-facebook-account-kit/ios'
end
```

Từ các thư mục chạy lệnh cài đặt pod trên terminal của bạn
Thêm các loại trừ sau vào tệp .gitignore của bạn:
```
# CocoaPods
Pods/
```

Bước cuối cùng, tất cả những gì mà còn lại là để sửa đổi tệp Info.plist nằm trên thư mục / [PRO DỰ_NAME] của dự án React Native.

Điều quan trọng là chúng tôi thay thế trường CFBundleIdentifier bằng package identifier mà chúng tôi đã định cấu hình khi tạo ứng dụng trên Facebook:

```
<plist version="1.0">
    <dict>
        ...
        <key>CFBundleIdentifier</key>
        <string>io.underscope.example.accountkit</string>
        
        <key>FacebookAppID</key>
        <string>2118871078377333</string>
        
        <key>AccountKitClientToken</key>
        <string>d2a3ef2d51a7b181a9b3c9a4a2594aa5</string>
        
        <key>CFBundleURLTypes</key>
        <array>
            <dict>
                <key>CFBundleURLSchemes</key>
                <array>
                <string>ak2118871078377333</string>
                </array>
            </dict>
        </array>
    </dict>
</plist>
```

### Android

Configure the application ID trong file android/app/build.gradle:
```
...
defaultConfig {
    applicationId "io.underscope.example.accountkit"
    ...
}
...
```

Và trong file `android/app/src/main/res/values/strings.xml:`

```
...
<string name="fb_app_id">2118871078377333</string>
<string name="ak_client_token">d2a3ef2d51a7b181a9b3c9a4a2594aa5</string>
...
```

Trong `android/app/src/main/AndroidManifest.xml`thêm những dòng dưới đây vào :
```
...
<application>
...
    <meta-data
        android:name="com.facebook.sdk.ApplicationId"
        android:value="@string/fb_app_id" />
    <meta-data
        android:name="com.facebook.accountkit.ApplicationName"
        android:value="@string/app_name" />
    <meta-data
        android:name="com.facebook.accountkit.ClientToken"
        android:value="@string/ak_client_token" />
 </application>
 ...
```

**Xác nhận rằng tích hợp hoạt động**

Khi chúng tôi tích hợp đầy đủ mô-đun, tất cả những gì chúng tôi còn lại là viết một vài dòng mã để xác minh rằng mọi thứ hoạt động như mong đợi. Vì vậy, chúng tôi sẽ chỉnh sửa tệp App.js và thay thế nó bằng mã sau:
```
import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import RNAccountKit from 'react-native-facebook-account-kit'

export default class App extends Component {
  componentDidMount() {
    RNAccountKit.configure({
      responseType: 'code',
      initialPhoneCountryPrefix: '+54',
      defaultCountry: 'AR',
    })
  }

  handleLoginButtonPress = async () => {
    try {
      const payload = await RNAccountKit.loginWithPhone()

      if (!payload) {
        console.warn('Login cancelled', payload)
      } else {
        console.warn('Logged with phone. Payload:', payload)
      }
    } catch (err) {
      console.warn('Error', err.message)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login" onPress={this.handleLoginButtonPress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
```

Chạy ứng dụng với react-native run-ios hoặc react-native run-android và bạn sẽ có thể hoàn thành các bước sau:

![](https://images.viblo.asia/80a74007-f8b9-4266-8742-8a12fd9ad6cb.png)

Bạn đã thiết lập tất cả! Nếu mọi việc suôn sẻ, Facebook sẽ trả về các giá trị trên một object đơn giản (token và mã)
Cảm ơn các bạn đã theo dõi  .