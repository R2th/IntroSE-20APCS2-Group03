# Mở đầu
Chắc hẳn quá trình chuyển màn hình trong quá trình phát triển ứng dụng React Native đã quá quen thuộc đối với các Dev chúng ta. Có rất nhiều thư viện hỗ trợ công việc này như  [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) , [React Router](https://github.com/ReactTraining/react-router) , [React Native Navigation](https://github.com/wix/react-native-navigation), nhưng các thư viện đều chưa thỏa mãn được yêu cầu của các lập trình viên :D.

Hôm nay tôi xin giới thiệu đến các bạn React Navigation là thư viện rất được cộng đồng React Native tin tưởng và sử dụng vì sự đơn giản, dễ dùng và trải nghiệm tuyệt vời của nó.

# Cài đặt
* Cài đặt package react-navigation
```
yarn add react-navigation
# or with npm
# npm install --save react-navigation
```
* Sau đó cài đặt react-native-gesture-handler. Nếu bạn đang sửu dụng [ Expo managed workflow](https://docs.expo.io/versions/latest/introduction/managed-vs-bare/) thì bạn không phải thực hiện bất cứ điều gì nữa vì nó có trong SDK.

```
yarn add react-native-gesture-handler
# or with npm
# npm install --save react-native-gesture-handler
```

* Link all native dependencies:

```
react-native link react-native-gesture-handler
```

Đối với iOs thì chúng ta không cần làm thêm bước nào nữa, còn với Android thì chúng ta cần thêm trong file MainActivity

```java
package com.demoreactnavigation;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "demoReactNavigation";
    }

    @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
    };
  }
}
```
# Tạo Stack Navigator
* createStackNavigator là một hàm trả về một React Component và vì vậy mà chúng ta có thể export nó trực tiếp từ App.js và được sử dụng như là App's root component của chúng ta. 
* Nó còn cung cấp một cách để ứng dụng của bạn chuyển đổi giữa các màn hình trong đó mỗi mãn hình mới được đặt trên cùng của ngăn xếp.  Cung cấp các animation chuyển màn hình giúp cho traỉ nghiệm giống như ở trên native.
*  Hàm này gồm 2 tham số đầu vào là  RouteConfigs và StackNavigatorConfig

```js
createStackNavigator(RouteConfigs, StackNavigatorConfig);
```

1. RouteConfigs
    Được ánh xạ từ route name tới route config nó sẽ cho navigator biết được rằng những màn hình nào sẽ được xuất hiện trong quá trình navigate.
    
```js
createStackNavigator(
  {
    Home: {
    // screen: là tham số dùng để định danh tên màn hình, có thể viết hoa hay viết thường
      screen: HomeScreen
       // When `HomeScreen` được load bởi StackNavigator, nó sẽ đưa ra `navigation` prop.

    // Mở rộng: Ghi đè hàm `navigationOptions` để setup các option cho màn hình như title,...
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    }),
    },
  }
```

2. StackNavigatorConfig

Gồm các tham số

*     initialRouteName:  dùng để setup màn hình mặc định của stack và phải trùng với khóa của 1 trong các route config
*     initialRouteParams: Param của initial route
*     defaultNavigationOptions: Những config mặc định để sử dụng cho màn hình.

Còn rất nhiều options các bạn có thể tham khảo thêm ở đây
https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig

3. Navigation Options 
*     title: Tên của màn hình
*     headerBackImage: icon của nút back
*     headerBackTitle: Text hiển thị trên navigation bar bên cạnh nút back
Còn nhiều options tùy mục đích sử dụng của các bạn để đưa ra lựa chọn thích hợp  
https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
#  Navigate giữa các màn hình

```js
import React from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation"; // Version can be specified in package.json

// Tạo 2 màn hình để di chuyển

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate("Details");
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

// Tạo stack navigator chứa 2 màn hình là Home và Details

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Home',
      })
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: () => ({
        title: 'Details',
      })
    }
  },
  {
  // đặt màn hình mặc định xuất hiên là Home
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);

```


Khi chạy thành công thì sẽ xuất hiện màn hình 

![](https://images.viblo.asia/fd5f6be9-d9e1-42c4-852d-2bdbc2245372.png)

Khi click vào màn button Go To Details thì sẽ navigate tới màn hình Detail và khi nhấn nút back trên navigation bar thì sẽ trở lại màn hình Home.
![](https://images.viblo.asia/4eb0f89f-4989-4a3c-b0a6-57d10bb7ccc6.png)

Hoặc các bạn có thể tạo 1 button và set sự kiện onClick để quay lại màn hình trước

```js
<Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
```

Như vậy chúng ta đã chuyển màn hình thành công bằng cách sử dụng thư viện React Navigation. 
Ở bài sau mình sẽ giới thiệu sâu hơn về thư viện này. Cảm ơn các bạn đã theo dõi.

# Tham khảo

https://reactnavigation.org/en/