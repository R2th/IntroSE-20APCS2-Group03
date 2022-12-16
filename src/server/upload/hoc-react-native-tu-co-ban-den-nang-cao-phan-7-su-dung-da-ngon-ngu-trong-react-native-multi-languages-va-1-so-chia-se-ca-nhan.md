![](https://images.viblo.asia/97551184-8e46-492b-ad03-c4b38692df83.png)

# I. Giới thiệu
Chào các bạn! Trong phần này tôi sẽ giới thiệu cách các bạn có thể xây dựng app đa ngôn ngữ trong React Native. Tất nhiên đây là chức năng thiết yếu và phải có cho ứng dụng. Nhưng lại vất vả khi tìm các thư viện hỗ trợ cho React Native và không biết chọn cái nào cho phù hợp.

Ở bài này tôi sẽ dùng [`react-i18next`](https://react.i18next.com/) để làm hướng dẫn. Sẽ có bạn thắc mắc tại sao tôi lại không dùng [`react-native-i18n`](https://github.com/AlexanderZaytsev/react-native-i18n) đã thông dụng từ trước. Các bạn chú ý nhé, giờ `react-native-i18n` đã không còn được phát triển nữa  và tác giả cũng gợi ý chuyển sang dùng `react-i18next` luôn

# II. Cách sử dụng

Để các bạn tiện theo dõi tôi đã làm ví dụ mẫu dưới đây

> git clone -b demo_react_i18next https://github.com/oTranThanhNghia/DemoReactNavigation.git

## 1. Chuẩn bị cài đặt

Trước khi tiến hành, tôi xin lưu ý 1 số vấn đề sau để dễ dàng thống nhất môi trường giữa tôi và bạn:
```json
+ Tôi đang sử dụng: react-native-cli
+ Node: 10.15.0
+ React: 16.8.3
+ React Native: 0.59.9
+ Xcode: 10.2.1
+ Android Studio: 3.3.2
```

Okay các bạn gõ lệnh sau vào terminal để cài đặt `react-i18next`, `i18next` và `react-native-device-info` vào project

```
npm install react-i18next@legacy i18next react-native-device-info --save
```

Trong đó: 
+  `react-i18next`, `i18next`để cấu hình đa ngôn ngữ
+  `react-native-device-info` để xác định ngôn ngữ trên device đang sử dụng

Do hiện tại tôi đang sử dụng React Native 0.59 nên cần phải có bước link thư viện với nhau
```
react-native link react-i18next@legacy i18next react-native-device-info
```

#### Chia sẻ cá nhân
Khi cài đặt `react-native-device-info` bằng `CocoaPods` mà bạn nào gặp lỗi sau : [Duplicate Module Name: react-native](https://stackoverflow.com/questions/50805753/duplicate-module-name-react-native)
 thì hãy thực hiện các bước sau nhé:
 
 + Bước 1: Thêm đoạn sau vào file `Podfile`

```
# Add these to your Podfile
pod 'React', :path => '../node_modules/react-native'
pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
```
Cụ thể bạn có thể xem trong https://github.com/oTranThanhNghia/DemoReactNavigation/blob/demo_react_i18next/ios/Podfile
+ Bước 2: Cài lại pod
```
cd ios
rm -rf Pods
pod install
```
và đợi đến khi thấy thông báo cài xong nhé
> Pod installation complete!

## 2. Coding
Trong phần này tôi sẽ giới thiệu cách tổ chức code của multi-languages như sau:

![](https://images.viblo.asia/27642a3c-72ad-40c2-a7e9-061ac69bfeb3.png)

Trong đó:
+ assets: là folder chứa các resourses của bạn
+ locales: là folder chứa texts các loại ngôn ngữ khác nhau
+ `en`, `vi` ... là folder chứa text của từng ngôn ngữ. Ở đây tôi ví dụ English (en) và Tiếng Việt (vi)
+ `index.js` là để khai báo các ngôn ngữ sẽ sử dụng

### Trong file strings.json (vi/strings.json)

```json
{
  "home": "Màn hình chính",
  "detail": "Màn chi tiết",
  "go_to_detail": "Đi đến màn hình chi tiết",
  "back": "Trở lại",
  "setting": "Cấu hình"
}

```

### Cụ thể file `index.js` trong folder `locales` như sau:
```javascript
export default {
  vi: {
    translation: require("./vi/strings.json")
  },
  en: {
    translation: require("./en/strings.json")
  }
};

```

Trong đó:
+ `en`, `vi` là mã code ngôn ngữ
+ translation là namespaces bạn sử dụng. 

### Cấu hình `i18n.js`

```javascript
import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import localesResourse from "app/assets/locales";
import DeviceInfo from "react-native-device-info";

const languageDetector = {
  type: "languageDetector",
  detect: () => DeviceInfo.getDeviceLocale(),
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(reactI18nextModule)
  .use(languageDetector)
  .init({
    resources: localesResourse,
    fallbackLng: "vi",
    debug: true,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  });

export default i18n;

```

Trong đó:
+ `languageDetector` là để xác định ngôn ngữ trên device đang sử dụng để khởi động app 
+ `localesResourse`là các texts được phân loại theo mã language bạn đã làm ở trên

### Cách translate 

Cấu trúc gọi như sau:

```
import i18n from "app/utils/i18n";

i18n.t("key")
```

Trong đó:
+ Fuction `t` sẽ nhận giá trị key để lấy giá trị tương ứng. 
Ví dụ i18n.t("home") sẽ lấy giá trị với key = "home"
```json
{
  "home": "Màn hình chính",
  "detail": "Màn chi tiết",
  "go_to_detail": "Đi đến màn hình chi tiết",
  "back": "Trở lại",
  "setting": "Cấu hình"
}

```
và kết quả nhận được là `"Màn hình chính"`

### code ví dụ với ReactNavigation

```javascript
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeScreen from "app/HomeScreen";
import DetailsScreen from "app/DetailsScreen";
import SettingsScreen from "app/SettingsScreen";
import i18n from "app/utils/i18n";

const back_title = i18n.t("back");

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: back_title
    }
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: back_title
    }
  }
);

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: i18n.t("home")
    }
  },
  Setting: {
    screen: SettingsStack,
    navigationOptions: {
      title: i18n.t("setting")
    }
  }
});

export default createAppContainer(AppNavigator);

```

### Code ví dụ với Component 
Ví dụ sử dụng multi-languages với file `HomeScreen.js` như sau:

```javascript
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import i18n from "app/utils/i18n";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{i18n.t("home")}</Text>
        <Button
          title={i18n.t("go_to_detail")}
          onPress={() => this.props.navigation.navigate("Details")}
        />
        <Text> App version 1.0</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
```

# III. Demo
## iOS
![](https://images.viblo.asia/eaeaf3b1-7973-4c67-ae67-32b828048a73.gif)

## Android
### 1. Ở chế độ English

![](https://images.viblo.asia/2821b597-3968-46a9-accf-ae9d31f7f60f.png)
### 2. Ở chế độ tiếng việt

![](https://images.viblo.asia/abbc35eb-705d-4a0c-a297-1a082893b872.png)

Okay vậy là đã xong. Cảm ơn các bạn đã theo dõi nhé
# IV. Tài liệu tham khảo
1. https://react.i18next.com/legacy-v9/step-by-step-guide
2. https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/reactnative-expo
3. https://github.com/react-native-community/react-native-device-info
4. https://stackoverflow.com/questions/50805753/duplicate-module-name-react-native