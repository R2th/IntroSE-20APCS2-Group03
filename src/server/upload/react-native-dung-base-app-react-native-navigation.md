Chào mọi người hôm nay chúng ta sẽ cùng đi tìm hiểu những điều hay ho khi sử dụng Navigation nha

Ở bài 1 chúng ta đã dựng sẵn một project sử dụng typescript template rồi mọi người có thê [xem tại đây](https://viblo.asia/p/react-native-dung-base-cho-mot-app-react-native-init-project-924lJ3Gz5PM).

# React Navigation 
Có rẩt nhiều thư viện được sử dụng để code navigation cho react native nhưng mình khuyến khích các bạn sử dụng `react-navigation` bởi vì đây là thư viện được chính FaceBook phát triển nên chắc chắn nó sẽ dễ dàng tích hợp vào react native hơn, ngoài ra đây còn là thư viện có cộng đồng support đông đảo phần nào giúp chúng ta yên tâm hơn khi có issue xảy ra.

### Setup
 - Cài đặt package react-navigation
 
 ```Javascript
 yarn add @react-navigation/native
# or with npm
# npm install --save @react-navigation/native
 ```
 
 - Cài đặt các thư viện support cho react-navigation bao gồm:

```Javascript
react-native-gesture-handler
react-native-reanimated
react-native-screens 
react-native-safe-area-context 
@react-native-community/masked-view.
```
Để cài đặt các thư viện trên các bạn chạy lệnh sau:

`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

> Với React Native từ phiên bản 0.60.0 trở lên thì các bạn không cần làm gì nữa mà React Native sẽ tự động link, còn nếu từ phiên bản 0.59 trở xuống thì các bạn cần phải chạy lệnh `yarn react-native link`

- Nếu các bạn đang sử dụng Mac và phát triển ứng dụng trên ios thì cần phải cài đặt pods:

`npx pod-install ios`

- Cuối cùng chúng ta nhớ import `react-native-gesture-handler` ở line đầu tiên của `App.js` hoăc `index.js`

```Javascript
/**
 * @format
 */
import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

```

### Creating a stack navigator
Để sử dụng được navigation chúng ta cần chú ý những điểm sau:
- `createStackNavigator` là function sẽ trả về 2 object bao gồm `Screen` và `Navigator`. Cả 2 đều được sử dụng cho việc config navigation.
    - `Navigator` thì sẽ chứa các `Screen` và `Screen` sẽ là nơi để chúng ta định nghĩa thông tin cho router (name: đặt tên cho screen, Component: đăng ký screen cho router)
- `NavigationContainer` đây là component sẽ quản lý toàn bộ navigation của app, nó sẽ bọc ở lớp ngoài cùng , thông thường thì `NavigationContainer` sẽ bọc ở root của app nằm ở App.js

```Javascript
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```
### Configuring the navigator
Việc config navigator thì khá là đơn giản, chúng ta chỉ cần sử dụng các prop mặc định của navigator là có thể hoàn thành rồi.
Ví dụ như trong app của mình thì mình đã config nó như sau:
 
 ```Javascript
 import LoginScreen from 'screens/Authentication/Login';
 import RegisterScreen from 'screens/Authentication/Register';

 const Stack = createStackNavigator();

const AuthNavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName={StackRoute.LoginScreen}>
      <Stack.Screen
        name={StackRoute.LoginScreen}
        component={LoginScreen}
        options={{
          title: 'Login Page',
        }}
      />
      <Stack.Screen
        name={StackRoute.RegisterScreen}
        component={RegisterScreen}
        options={{
          title: 'Register Page',
        }}
      />
    </Stack.Navigator>
  );
};
 ```
 
 Và ở App.tsx mình config như sau:
 
 ```Javascript
 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { UserStore } from 'stores';
import AuthNavigationStack from 'navigations/Authentication';
import HomeNavigationStack from 'navigations/Home';
import { observer } from 'mobx-react';

const App = () => {
  const selectStack = () => {
    if (!UserStore.IsUserLogined) {
      return <AuthNavigationStack />;
    } else {
      return <HomeNavigationStack />;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
      <NavigationContainer>{selectStack()}</NavigationContainer>
    </>
  );
};

export default observer(App);
 ```

> Có một vài đoạn code lạ lạ thì mn đừng quan tâm nha, những đoạn code đó sẽ phục vụ ở các bài sau.

### Moving between screens
Đầu tiên chúng ta có screen `Login` Như sau

```Javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { observer } from 'mobx-react';
import React from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { UserStore } from 'stores';
import { StackRoute } from 'constants/Routes';

type Props = {
  navigation: any;
};

const LoginScreen = (props: Props) => {
  const { navigation } = props;
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Button
          title="Login"
          onPress={() => {
            UserStore.setHasLogin(true);
          }}
        />
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate(StackRoute.RegisterScreen);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
});

export default observer(LoginScreen);

```

Mọi người cùng focus vào Button `Register` nha

```Javascript
    <Button
      title="Register"
      onPress={() => {
        navigation.navigate(StackRoute.RegisterScreen);
      }}
    />
```

 - navigation - Đây là prop được truyền mặc định vào component của chúng ta khi chúng ta đăng ký component vào stack của navigation.
 - navigation.navigate(StackRoute.RegisterScreen); -  Chúng ta gọi function `navigate` từ props navigation và truyền vào đó một chuỗi string là tên của một route, điều này có nghĩa là báo cho navigation biết rằng chúng ta sẽ tới màn hình `StackRoute.RegisterScreen`. Nếu màn hình `RegisterScreen` mà chưa được đăng ký vào stack của navigation thì khi click vào chúng ta sẽ nhận được thông báo lỗi là màn hình `RegisterScreen` chưa được handle bởi navigation.

### Navigate to a route multiple times

Chúng ta di chuyển qua component `RegisterScreen` một chút nha

```Javascript
const RegisterScreen = (props:any) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Button
            title="Register and Login"
            onPress={() => {
                  props.navigation.navigate(StackRoute.RegisterScreen);
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

```

Ở đoạn code này rõ ràng là có cái gì đó không đúng.

Không đúng ở chỗ chúng ta đang đứng ở màn hình `RegisterScreen` mà button navigate lại đi tới `RegisterScreen` một lần nữa, nếu chạy đoạn code trên thì chắc chắn các bạn sẽ nhận được thông báo rằng không thể làm như vậy vì hiện tại đang ở màn hình `RegisterScreen`.

Nhưng giả sử bạn vẫn muốn ở `RegisterScreen` mà đi tiếp vào trang `RegisterScreen` một lần nữa thì chúng ta làm như thế nào. Rất tiện lợi là react-navigation có hỗ trợ cho việc này, các bạn chỉ cần sửa lại đoạn code như này:

```Javascript
 <Button
    title="Register and Login"
    onPress={() => {
          props.navigation.push(StackRoute.RegisterScreen);
    }}
  />
```

với function `push` thì navigation cho phép chúng ta thêm mới 1 stack vào history mà ko cần quan tâm tới có bị trùng như là function `navigate`

### Going back
Vậy là chúng ta đã có thể di chuyển giữa các màn hình với nhau rồi, vấn đề tiếp theo là chúng ta làm thế nào để quay ngược trở lại màn hình phía trước mà không cần sử dụng button back của device.
Đừng quá lo lắng vì react-navigation sẽ hỗ trợ cho chúng ta làm điều này, chúng ta có thể thực hiện bằng 2 function:
 - `goBack`: function này cho phép chúng ta trở lại màn hình gần nhất với màn hình hiện tại, nói theo một cách khác thì giống như chồng stack, chúng ta remove trên cùng.
 - `popToTop`: bùm, chúng ta sẽ quay về route đầu tiên của navigation luôn.

```Javascript
const RegisterScreen = (props: any) => {
  const { navigation } = props;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Button
            title="Register and Login"
            onPress={() => {
              UserStore.setHasLogin(true);
            }}
          />
          <Button
            title="Register and Login"
            onPress={() => {
              props.navigation.navigate(StackRoute.RegisterScreen);
            }}
          />
          <Button title="Go back" onPress={() => navigation.goBack()} />
          <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()} />
        </View>
      </SafeAreaView>
    </>
  );
};

```

Tạm thời hôm nay chúng ta sẽ dừng ở đây nha, bài sau chúng ta sẽ tiếp tục tìm hiểu làm thế nào để truyền các parameter giữa các screen thông qua navigation và cách custom header như thế nào nhé.
[Link GitHub Project mình đang làm demo](https://github.com/dattx-0602/ReactNativeSample)