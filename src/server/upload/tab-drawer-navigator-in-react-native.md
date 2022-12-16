## Giới thiệu
React Navigation được sinh ra từ nhu cầu của cộng đồng React Native cho một giải pháp điều hướng mở rộng nhưng dễ sử dụng được viết hoàn toàn bằng JavaScript.
https://reactnavigation.org/docs/en/getting-started.html

## Cài đặt
Cài đặt, build project mình đã hướng dẫn ở https://viblo.asia/p/react-native-LzD5d6kdZjY
```
yarn add react-navigation or npm install --save react-navigation
```
## Build app
* Để hiểu rõ hơn về  "React Navigation" mình sẻ làm một cái project demo.
* Trước tiên mình cần tạo một vài màn hình sau Home, Promotion, Transaction history, My wallet,... những màn hình này để vào 1 Tab Navigator và hiển thị phía dưới màn hình.
    - forder images
    
    images/homeIcon.png
    
    images/new.png
    
    images/history.png
    
    images/myWallet.png
    
    - src/components/HomeComponent.js
    ```
    import React, { Component } from 'react';
    import { Text, View, Image } from 'react-native';
    
    export default class HomeComponent extends Component {
      static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Home';
        let tabBarIcon = () => (
          <Image
            source={require('./../../images/homeIcon.png')}
            style={{ width: 26, height: 26, tintColor: '#0067a7' }}
          />
        );
        return { tabBarLabel, tabBarIcon };
      }
      
      render() {
        return (
          <View style={{
            flex: 1,
            backgroundColor: '#0067a7',
            alignItems: 'center',
            justifyContent: 'center'
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>This is Home Screen</Text>
          </View>
        );
      }
    }
    ```
    - src/components/PromotionComponent.js
    ```
    import React, { Component } from 'react';
    import { Text, View, Image } from 'react-native';
   
    export default class PromotionComponent extends Component {
      static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Home';
        let tabBarIcon = () => (
          <Image
            source={require('./../../images/new.png')}
            style={{ width: 26, height: 26, tintColor: '#e97600' }}
          />
        );
        return { tabBarLabel, tabBarIcon };
      }
      
      render() {
        return (
          <View style={{
            flex: 1,
            backgroundColor: '#e97600',
            alignItems: 'center',
            justifyContent: 'center'
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>This is Promotion Screen</Text>
          </View>
        );
      }
    }
    ```
    - src/components/TransactionHistoryComponent.js
    ```
    import React, { Component } from 'react';
    import { Text, View, Image } from 'react-native';
   
    export default class TransactionHistoryComponent extends Component {
      static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Home';
        let tabBarIcon = () => (
          <Image
            source={require('./../../images/history.png')}
            style={{ width: 26, height: 26, tintColor: '#964f8e' }}
          />
        );
        return { tabBarLabel, tabBarIcon };
      }
      
      render() {
        return (
          <View style={{
            flex: 1,
            backgroundColor: '#964f8e',
            alignItems: 'center',
            justifyContent: 'center'
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>This is Transaction History Screen</Text>
          </View>
        );
      }
    }
    ```
    - src/components/MyWalletComponent.js
    ```
    import React, { Component } from 'react';
    import { Text, View, Image } from 'react-native';
   
    export default class MyWalletComponent extends Component {
      static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let tabBarLabel = 'Home';
        let tabBarIcon = () => (
          <Image
            source={require('./../../images/myWallet.png')}
            style={{ width: 26, height: 26, tintColor: '#007256' }}
          />
        );
        return { tabBarLabel, tabBarIcon };
      }
      
      render() {
        return (
          <View style={{
            flex: 1,
            backgroundColor: '#007256',
            alignItems: 'center',
            justifyContent: 'center'
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>This is My Wallet Screen</Text>
          </View>
        );
      }
    }
    ```
* Tạo Tab Navigator để chứa các components trên
   - src/components/TabNavigatorComponent.js
   ```
   import { createBottomTabNavigator } from 'react-navigation';
   import HomeComponent from './HomeComponent';
   import PromotionComponent from './PromotionComponent';
   import TransactionHistoryComponent from './TransactionHistoryComponent';
   import MyWalletComponent from './MyWalletComponent';

   let routeConfigs = {
     'Home': {
       screen: HomeComponent,
     },
     'Promotion': {
       screen: PromotionComponent,
     },
     'Transaction': {
       screen: TransactionHistoryComponent,
     },
     'MyWallet': {
       screen: MyWalletComponent,
     },
   };
   
   let tabNavigatorConfig = {
     tabBarPosition: 'bottom',
     animationEnabled: true,
     swipeEnabled: true,
     tabBarOptions: {
       showIcon: true,
       activeTintColor: 'blue',
       labelStyle: {
         fontSize: 13,
       },
       style: {
         backgroundColor: 'lightgray',
         padding: -10
       },
     },
     order: ['Home', 'Promotion', 'Transaction', 'MyWallet'],
   };
   
   export const TabNavigator = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);
   ```
 + Vậy là đã làm xong Tab Navigator, tiếp tục đưa import vào file index
   - index.js
   ```
   import { AppRegistry } from 'react-native';
   import { TabNavigator } from '.src/components/TabNavigatorComponent';
   
   AppRegistry.registerComponent('demo', () => TabNavigator);
   ```
 + Bây giờ chạy lên thử nãy giờ làm được những gì nào
 
 ![](https://images.viblo.asia/f42edede-a14c-41d4-b695-f7fad1b58a01.png) ![](https://images.viblo.asia/33f74c3d-4c93-4755-8d0c-23be3c759857.png)  ![](https://images.viblo.asia/8475daf2-e914-4349-8eca-d919aef13617.png) ![](https://images.viblo.asia/cf7a2b84-8d3e-49b1-99ee-212289341ac8.png)
 
 + Tiếp tục, sử dụng Drawer Navigator, tạo thêm các màn hình Withdrawal, Scan code, Payment code
   - Thêm ảnh vào forder images

   images/withdrawal.png
   
   images/paymentCode.png
   
   images/scanCode.png
   
   images/menuIcon.png
   
   - src/components/HeaderComponent.js  
   ```
   import React, { Component } from 'react';
   import Button from 'react-native-button';
   import {
     Text, View, Image, TouchableHighlight, Alert
   } from 'react-native';

   export default class HeaderComponent extends Component {
     render() {
       return (
         <View style={{
           height: 40,
           flexDirection: 'row',
           justifyContent: 'flex-start',
           alignItems: 'center'
           }}
         >
           <TouchableHighlight
             style={{ marginLeft: 10, marginTop: 10 }}
             onPress={() => this.props.navigation.openDrawer()}>
             <Image
               style={{ width: 20, height: 20 }}
               source={require('./../../images/menuIcon.png')}
             />
           </TouchableHighlight>
         </View>
       );
     }
   }
   ```
   - src/components/HomeDrawerComponent.js
   ```
   import React, { Component } from 'react';
   import {
     Text, View, Image, TouchableHighlight,
   } from 'react-native';
   import HeaderComponent from './HeaderComponent';
   import {TabNavigator} from './TabNavigator'; // đưa tab vào page Home, nên chỉ có trang Home mới xuất hiện tab

   const backgroundColor = '#0067a7';
   export default class HomeComponent extends Component {
     static navigationOptions = ({ navigation }) => {
       let drawerLabel = 'Home';
       let drawerIcon = () => (
         <Image
           source={require('./../../images/home-icon.png')}
           style={{ width: 26, height: 26, tintColor: backgroundColor }}
         />
       );
       return {drawerLabel, drawerIcon};
     }
     
     render() {
       return (
         <View style={{
           flex: 1,
           flexDirection: 'column',
         }}>
           <HeaderComponent {...this.props} />
           <TabNavigator />
         </View>
       );
     }
   }
   ```
   - src/components/WithdrawalComponent.js
   ```
   import React, { Component } from 'react';
   import Button from 'react-native-button';
   import {
     Text, View, Image, TouchableHighlight
   } from 'react-native';
   import HeaderComponent from './HeaderComponent';

   export default class WithdrawalComponent extends Component {
     static navigationOptions = ({ navigation }) => {
       let drawerLabel = 'Withdrawal';
       let drawerIcon = () => (
         <Image
           source={require('./../../images/withdrawal.png')}
           style={{ width: 26, height: 26, tintColor: '#e97600' }}
         />
       );
       return { drawerLabel, drawerIcon };
     }
     
     render() {
       return (
         <View style={{flex: 1, flexDirection: 'column' }}>
           <HeaderComponent {...this.props} />
           <View style={{
             flex: 1,
             backgroundColor: '#e97600',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
             <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
               This is Withdrawal Screen
             </Text>
           </View>
         </View>
       );
     }
   }
   ```
   - src/components/PaymentCodeComponent.js
   ```
   import React, { Component } from 'react';
   import Button from 'react-native-button';
   import {
     Text, View, Image, TouchableHighlight
   } from 'react-native';
   import HeaderComponent from './HeaderComponent';

   export default class PaymentCodeComponent extends Component {
     static navigationOptions = ({ navigation }) => {
       let drawerLabel = 'Withdrawal';
       let drawerIcon = () => (
         <Image
           source={require('./../../images/paymentCode.png')}
           style={{ width: 26, height: 26, tintColor: '#964f8e' }}
         />
       );
       return { drawerLabel, drawerIcon };
     }
     
     render() {
       return (
         <View style={{flex: 1, flexDirection: 'column' }}>
           <HeaderComponent {...this.props} />
           <View style={{
             flex: 1,
             backgroundColor: '#964f8e',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
             <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
               This is Payment Code Screen
             </Text>
           </View>
         </View>
       );
     }
   }
   ```
   - src/components/ScanCodeComponent.js
   ```
   import React, { Component } from 'react';
   import Button from 'react-native-button';
   import {
     Text, View, Image, TouchableHighlight
   } from 'react-native';
   import HeaderComponent from './HeaderComponent';

   export default class ScanCodeComponent extends Component {
     static navigationOptions = ({ navigation }) => {
       let drawerLabel = 'Withdrawal';
       let drawerIcon = () => (
         <Image
           source={require('./../../images/scanCode.png')}
           style={{ width: 26, height: 26, tintColor: '#007256' }}
         />
       );
       return { drawerLabel, drawerIcon };
     }
     
     render() {
       return (
         <View style={{flex: 1, flexDirection: 'column' }}>
           <HeaderComponent {...this.props} />
           <View style={{
             flex: 1,
             backgroundColor: '#007256',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
             <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
               This is Scan Code Screen
             </Text>
           </View>
         </View>
       );
     }
   }
   ```
   - src/components/DrawerNavigator.js
   ```
   import { AppRegistry, Dimensions } from 'react-native';
   import { createDrawerNavigator } from 'react-navigation';
   import HomeDrawerComponent from './src/components/HomeDrawerComponent';
   import WithdrawalComponent from './src/components/WithdrawalComponent';
   import PaymentCodeComponent from './src/components/PaymentCodeComponent';
   import ScanCodeComponent from './src/components/ScanCodeComponent';
   
   var {height, width} = Dimensions.get('window');
   let routeConfigs = {
     'Home': {
       screen: HomeDrawerComponent,
     },
     'ScanCode': {
       screen: ScanCodeComponent,
     },
     'Withdrawal': {
       screen: WithdrawalComponent,
     },
     'PaymentCode': {
       screen: PaymentCodeComponent,
     },
   };
   let drawerNavigatorConfig = {
     initialRouteName: 'Home',
     drawerWidth: width / 2,
     drawerPosition: 'left',
     contentOptions: {
       activeTintColor: 'red',
     },
     order: ["Home", "Withdrawal", "PaymentCode", "ScanCode"],
   };
   export const DrawerNavigator = createDrawerNavigator(routeConfigs, drawerNavigatorConfig);
   ```
   - Sửa file index.js
   ```
   import { AppRegistry } from 'react-native';
   import { DrawerNavigator } from '.src/components/DrawerNavigatorComponent';
   
   AppRegistry.registerComponent('demo', () => DrawerNavigator);
   ```
   - Bây giờ chạy lại và xem kết quả:
   
   ![](https://images.viblo.asia/273e30b0-138d-492d-ab4d-8a3fdb85f1d3.png)
   ![](https://images.viblo.asia/39ffa4d2-567b-4ea0-bdb0-0001300651fd.png)
   - Sau project demo này mong sẻ giúp ích cho các bạn hiểu hơn. Chúc các bạn thành công nhé !
## Tài liệu tham khảo
https://reactnavigation.org/docs/en/getting-started.html