# Mở đầu 
Ở 2 phần trước mình đã giới thiệu cơ bản về React Navagation ở phần này mình sẽ đi vào giới thiệu các kiểu navigator của thư viện này. Hãy cùng theo dõi nhé ;) 

# Các kiểu navigator
## 1. Stack 
Khi chúng ta sử dụng `createStackNavigator(RouteConfigs, StackNavigatorConfig)` có nguyên lý hoạt động giống như Stack, khi mở 1 màn hình mới thì nó sẽ xếp chồng lên trên màn hình trước đó


![](https://images.viblo.asia/763bff68-ba1d-498d-9c55-ea6b7c9325ab.png)

Theo mặc định, màn hình mới chạy từ cạnh phải -> qua trái màn hình trong iOS, mờ -> đến rõ dần từ dưới lên trong Android

![](https://images.viblo.asia/57b252f0-9bc5-4a7f-a76f-2acd9497f9f9.png)

Cách cài đặt
```js
const StackScreens = createStackNavigator(
  {
    Main: { screen: Main },
    Login: { screen: Login }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);
```

## 2. Switch
Với Swtich Navigator chỉ hiển thị 1 màn hình, không có goBack(), phù hợp nhất với flow Authentication sử dụng trong màn hình xác nhận đăng nhập như chúng ta đã đề cập ở [Phần 2](https://viblo.asia/p/react-navigation-part-2-gDVK297n5Lj) hoặc có thể nghiên cứu trực tiếp tại [trang chủ React Navigation](https://reactnavigation.org/docs/en/auth-flow.html)

Cách cài đặt
```js
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import {HomeScreen, SignInScreen, OtherScreen, AuthLoadingScreen} from './screens';

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
```


## 3.Drawer
Nếu như các bạn đã làm việc với Android thì Drawer Navigation đã không còn xa lạ gì. Nó là 1 dạng menu trượt từ bên trái sang được Google giới thiệu từ năm 2013 nay đã được mang lên React Native thông qua 

`createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);`

![](https://images.viblo.asia/fb0e4673-ba20-4a44-a1d0-5bb067b1edcd.png)

Ở phần này chúng ta chú ý vào các tham số nằm trong `DrawerNavigatorConfig` 
* drawerWidth: chiều rộng của drawer
* drawerPosition: Vị trí của drawer (trái, phải) mặc định là trái
* contentComponent: dùng để render nội dung bên trong của drawer
* useNativeAnimations: enable animation của native (mặc định true)
* drawerBackgroundColor: set Background color cuả drawer (mặc định là màu trắng)
DrawerNavigator có sử dụng DrawerLayout nên có kế thừa các thuộc tính sau:
* drawerType: 1 trong front, back hoặc slide
* hideStatusBar:  ẩn status bar khi mở drawer
* overlayColor: độ mờ của màn hình ứng dụng khi drawer mở ra

```js
import React, { Component } from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import {RootStackScreen1, RootStackScreen2, RootStackScreen3} from './screens';


// 1) `TouchableMenuIcon` là component luôn hiển thị ở góc trái của màn hình

class TouchableMenuIcon extends Component {

  toggleDrawer=()=>{    
    this.props.navigationProps.toggleDrawer();
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
          <Image
            source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png'}}
            style={{ width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
```

```js
// 2) Chạm vào icon, `SideMenu` component được hiển thị, style tùy thích

class SideMenu extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'column', marginTop:30, justifyContent: 'space-around'}}>
         <Button
              title="Screen 1"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen1');
                this.props.navigation.closeDrawer();

              }}
          />
          <Button
              title="Screen 2"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen2');
                this.props.navigation.closeDrawer();

              }}
            />
          <Button
              title="Screen 3"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen3');
                this.props.navigation.closeDrawer();

              }}
            />
        </View>
      </View>
    );
  }
}

```

```js
// 3) `RootStack` là một Stack Navigator chứa các màn hình chính của ứng dụng
const RootStack = createStackNavigator(
  {
    RootStackScreen1: RootStackScreen1,
    RootStackScreen2: RootStackScreen2,
    RootStackScreen3: RootStackScreen3
  },
  {
    initialRouteName: 'RootStackScreen1',  
    navigationOptions: ({ navigation }) => ({
      title: "Root Stack", 
      headerLeft: <TouchableMenuIcon navigationProps={ navigation }/>
    })
  }
);
```

```js
// 4) `MyDrawerNavigator` tạo ra từ `createDrawerNavigator()`, sẽ đảm nhiệm việc show side menu, để ý cái `props` **contentComponent**

export default MyDrawerNavigator = createDrawerNavigator(  
  {
    RootStack: RootStack,
  },
  {
    contentComponent: SideMenu
  }
);
```

## 4. Bottom Tab
Kiểu tab bar nằm ở dưới màn hình, các màn hình sẽ không được render cho đến khi user focus. 

Được tạo khi gọi `createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);`

![](https://images.viblo.asia/52a32ced-6230-45bd-afe6-7a77605904e2.png)

Ở phần này thì chúng ta chú ý các thuộc tính sau:
* lazy: Mặc định là true, nếu false tất cả các tab sẽ được render ngay lập tức. Nếu true thì tab sẽ được render chỉ khi người dùng kích vào tab lần đầu tiên và nó sẽ không render lại khi vào lần click tiếp theo.
* tabBarComponent: Tùy chọn, ghi đè component để sử dụng làm tab bar.
* tabBarOptions: gồm các thuộc tính sau
    
    *  activeTintColor: Color của label và icon của tab đang được active
    *  activeBackgroundColor: background color của tab đang active
    *  inactiveTintColor: Color của label và icon của tab không được active
    *  inactiveBackgroundColor: background color của tab Không được active
    *  showLabel: Hiển thị label của tab (mặc định là true)
    *  labelStyle: custom style của label
    *  tabStyle: style của tab
    *   .... Các bạn có thể tham khảo thêm tại [đây](https://reactnavigation.org/docs/en/bottom-tab-navigator.html)

Các bạn cũng có thể thao khảo thêm [Material Top Tab](https://reactnavigation.org/docs/en/material-top-tab-navigator.html)

![](https://images.viblo.asia/300851fb-7aed-41a5-bb22-5cc42e6c61fc.png)

## 5. Material Bottom Tab
Gần tương tự như Bottom tab nhưng nó có được thiết kế theo chuẩn Material Design của Google . Muốn sử dụng chúng ta cài thêm thư viện  `react-navigation-material-bottom-tabs

![](https://images.viblo.asia/3404d7ce-2baf-4b7b-bf8b-06f9575d20d7.gif)


# Tổng Kết
Ở phần này mình đã giới thiệu về các loại của React Navigator và cách sử dụng cơ bản. Cảm ơn các bạn đã theo dõi (bow)

# Tham khảo
https://reactnavigation.org/en/