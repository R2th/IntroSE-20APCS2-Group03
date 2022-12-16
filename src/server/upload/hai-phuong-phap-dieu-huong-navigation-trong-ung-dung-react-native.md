Mình là một **reactjs** - developer và mới tìm hiểu **React-Native**, **React-Native** thực sự là dễ để làm quen, đặc biệt là việc xây dựng giao diện với phương pháp code khá tương đồng với **CSS** (Nếu bạn sử dụng thư viện **styled-components** thì **dev** phần giao diện sẽ càng gần gũi với **CSS** hơn)  

Trong bài viết này, mình xin phép chia sẻ hai phương pháp điều hướng giao diện (**Navigate Screen**) trong ứng dụng **React-Native**.  

### Khởi tạo Project
Mình thường dùng **create-react-native-app** để tạo **project**, đây là phương pháp được giới thiệu trong **[documentation](https://facebook.github.io/react-native/docs/getting-started.html)** của **React-Native** và được phát triển bởi đội ngũ đã phát triển **React-Native**.  
Giả sử file **App.js** sẽ có 2 **component** tương ứng với 2 màn hình cần điều hướng như sau (Mình sử dụng thư viện **styled-components** để **style**)
```js
import React from 'react';
import { Text, View, Button } from 'react-native';
import styled from 'styled-components'

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 50px 0;
  align-items: center;
`

class Home extends React.Component {
  render() {
    return (
      <Wrapper>
        <Text>Hello!, This is Home!</Text>
        <Text>Goto Profile</Text>
      </Wrapper>
    )
  }
}

class Profile extends React.Component {
  render() {
    return (
      <Wrapper>
        <Text>Hi!, This is Profile!</Text>
        <Text>GoBack Home</Text>
      </Wrapper>
    )
  }
}
```
### 1. Sử dụng thư viện **react-router-native** 
**react-router-native** là một thành phần của **react-router** - công cụ vô cùng phổ biến trong hệ sinh thái **React**.  

Trước tiên, ta thực hiện install thư viện vào trong ứng dụng với lệnh 
```
npm install --save react-router-native
```
Và import các thành phần cần thiết vào trong file App.js như sau
```js
import { NativeRouter, Route, Link } from 'react-router-native'
```
Tên các thành phần khá giống khi điều hướng trong ứng dụng **reactjs** phải không? và các sử dụng cũng khá là tương đồng như vậy

```js
...

const Wrapper = styled.View`
  ...
`

class Home extends React.Component {
  render() {
    ...
  }
}

class Profile extends React.Component {
  render() {
    ...
  }
}

class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View>
          <View>
            <Text>Navigator Bar</Text>
            <Link to="/home">Go To Home</Link>
            <Link to="/profile">Go To Profile</Link>
          </View>

          <Route exact path='/home' component={Home} />
          <Route exact path='/profile' component={Profile} />
        </View>
      </NativeRouter>
    )
  }
}
```
Vì khá tương tự với bản **Web** nên chắc chắn là chúng ta sẽ hiểu ngay những công cụ trên có chức năng gì phải không?, việc truyền params cũng sẽ tương đồng với web.
```js
<Route exact path='/user/:id' component={Home} />
```

### 2. Sử dụng công vụ **React-Navigation**  

Công cụ thứ 2 mình muốn giới thiệu là **react-navigation**, công cụ này có cách sử dụng không thân thiện với các **Web dev** nhưng nó là công cụ phổ biến nhất trong cộng đồng **react-native**, đồng thời cũng đạt nhiều "Sao" hơn trên **Github**. Và công cụ này được thiết kế dành riêng cho **React-Native**.  
Tất nhiên như mình đã kiểm nghiệm thì cả 2 công cụ này đều hoạt động tốt trên cả **Android** và **IOS**.  
Bước đầu tiên vẫn là cài đặt thư viện
```
npm install react-navigation
```
import công cụ cần thiết và **Navigate**
```js
import { createStackNavigator } from 'react-navigation'

export default createStackNavigator({
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
})
```
Phía trên là bước khai báo việc hiển thị, hiểu đơn giản là ta sẽ điều hướng dựa vào **KEY** thay vì **URL** như phía **WEB**. Key "Home" sẽ tương ứng với component **Home**.  
Khi được khai báo với **createStackNavigator**, các components thành phần (**Home** và **Profile**) sẽ có thêm 1 props **navigation** là công cụ giúp điều hướng.  

Việc điều hướng cũng sẽ được thực hiện dựa theo **KEY**.  
```js
class Home extends React.Component {
  render() {
    return (
      <Wrapper>
        <Text>Hello!, This is Home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </Wrapper>
    )
  }
}

```
Truyền params:
```js
  this.props.navigation.navigate('Profile', {
    id: 1,
    user: 'Me'
  })
```
Tại thư mục Profile, ta nhận params bằng hàm sau:
```js
this.props.navigation.getParam('me', defaultValue)
```
***
Như vậy mình đã giới thiệu 2 phương pháp điều hướng trong ứng dụng **React-Native**, và có lẽ mình sẽ chọn sử dụng phương pháp **react-navigation** vì độ phổ biến, cũng như là phương pháp tách biệt với việc phát triển **Web**. Cảm ơn đã theo dõi bài viết.