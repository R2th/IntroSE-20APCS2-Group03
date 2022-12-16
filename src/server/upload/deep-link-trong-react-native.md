> Hiện tại đang là thời đại mọi thứ được kết nối với nhau và chúng ta chia sẻ các mọi thứ rất nhiều, đặc biệt là các link. Chúng ta đều muốn khách hàng tiếp cận những trang mà họ mong muốn nhanh nhất có thể bất kể họ đang dùng nền tảng nào.
> 
> Deep link không chỉ gói gọn trong việc click vào một đường link và mở ra ứng dụng mà nó còn là một cách thông minh để điều hướng người dùng đến một trang thích hợp.
> 
> Vì thế hôm nay tôi viết bài này để hướng dẫn các bạn cách triển khai deep link trong ứng dụng React Native với nền tảng iOS và Android :D

# I. Deep link là gì?
Là một kỹ thuật cho phép một ứng dụng được mở ra từ một nơi khác như UI, phản hồi lại với một số sự kiện bên ngoài ứng dụng. “Deep" là độ sâu của một trang trong cấu trúc phân cấp ứng dụng. 

Chắc hẳn bạn đã từng nhìn thấy những link kiểu dạng như thế này: mailto:thien@gmail.com khi click vào nó sẽ mở ứng dụng mail mặc định và tự động điền người nhận là thien@gmail.com. Chúng ta sẽ làm một URL tương tự cho ứng dụng của chúng ta. Nó sẽ có dạng như này app://post/1 để vào trực tiếp màn hình post đầu tiên của ứng dụng.

# II. Deep link giải quyết vấn đề gì?
Giải quyết link trong các ứng dụng mobile.

Nếu bạn dùng mobile để mở một đường link đến một bài viết như ở ví dụ trên thì nó sẽ mở bằng web browser kể cả khi bạn đã cài ứng dụng dành riêng để mở bài viết đấy.


# III. Các cách để triển khai Deep link:
Có 2 cách để triển khai là:
- URL scheme
- Universal links

URL scheme thì khá là phổ biến rồi, Universal links là cách mới mà Apple triển khai để bạn dễ dàng kết nối trang web và ứng dụng của bạn sử dụng cùng một link.

## 1. Setup react native cho iOS và Android:

Tạo 2 file là, đầu tiên là `Home.js`:
```javascript
import React from 'react';
import { Text } from 'react-native';
class Home extends React.Component {
 static navigationOptions = {
  title: 'Home',
 };
render() {
 return <Text>Hello from Home!</Text>;
}
}
export default Home;
```
Tiếp theo là `Article.js`:
```javascript
import React from 'react';
import { Text } from 'react-native';
class Article extends React.Component {
 static navigationOptions = {
  title: 'Article',
 };
render() {
  const { id } = this.props.navigation.state.params;
  return <Text>Hello from Article {id}!</Text>;
 }
}
export default Article;
```

Cuối cùng là config routes:
```javascript
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createAppContainer, createStackNavigator} from "react-navigation";
import Home from './src/Home';
import Article from './src/Article';
const AppNavigator = createStackNavigator({
 Home: { screen: Home },
 Article: { screen: Article, path: 'article/:id', },
},
{
 initialRouteName: "Home"
}
);
const prefix = 'myapp://myapp/';
const App = createAppContainer(AppNavigator)
const MainApp = () => <App uriPrefix={prefix} />;
export default MainApp;
```
## 2. Triển khai cho iOS
Trước khi setup Android, hãy setup iOS trước nhé. Mở iOS project bằng xcode. Sau đó mở mục URL Types và thêm scheme như hình (tên thì tuỳ bạn chọn)

![](https://images.viblo.asia/ae0b1cd8-af76-4908-bcbd-9a7081d91637.png)

Sau đó mở AppDelegate.h và thêm:
```objectiveC
#import “React/RCTLinkingManager.h” 
```

Cuối cùng là thêm vào trước @end như sau:
```objectiveC
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
return [RCTLinkingManager application:application openURL:url
sourceApplication:sourceApplication annotation:annotation];
}

```

Vậy là đã setup xong cho iOS!

## 3. Triển khai cho Android:
Mở AndroidManifest (/src/main/AndroidManifest.xml ) và thêm như sau:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
 package="com.deeplinkexample">

   <uses-permission android:name="android.permission.INTERNET" />

   <application
     android:name=".MainApplication"
     android:label="@string/app_name"
     android:icon="@mipmap/ic_launcher"
     android:roundIcon="@mipmap/ic_launcher_round"
     android:allowBackup="false"
     android:theme="@style/AppTheme">
     <activity
       android:name=".MainActivity"
       android:label="@string/app_name"
       android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
       android:launchMode="singleTask"
       android:windowSoftInputMode="adjustResize">
       <intent-filter>
           <action android:name="android.intent.action.MAIN" />
           <category android:name="android.intent.category.LAUNCHER" />
       </intent-filter>
        <intent-filter>
             <action android:name="android.intent.action.VIEW" />
             <category android:name="android.intent.category.DEFAULT" />
             <category android:name="android.intent.category.BROWSABLE" />
             <data android:scheme="myapp" />
         </intent-filter>
     </activity>
     <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
   </application>

</manifest>
```

Ok rùi, vậy là chúng ta đã triển khai Deep link cho cả 2 nền tảng iOS và Android trong ứng dụng React Native! 

Cảm ơn các bạn đã theo dõi bài viết này. Nếu có ý kiến hãy nhớ để lại comment bên dưới nha :D