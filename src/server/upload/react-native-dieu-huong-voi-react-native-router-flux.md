Điều hướng giữa các route/screen/scene là một trong những component cốt lõi của bất cứ một ứng dụng nào. Hôm nay mình sẽ hướng dẫn các bạn thực hiện những việc sau: thiết lập các route, điều hướng giữa các màn hình, thiết lập các tab và sử dụng một modal.
## 1. Setup
Đầu tiên chúng ta sẽ tạo một project react native và cài đặt *react-native-router-flux* package.
```terminal
react-native init reactRouterFluxDemo
cd reactRouterFluxDemo
npm install --save react-native-router-flux
```
Sau đó chúng ta thêm đoạn code sau vào file App.js
```javascript:App.js

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to the Demo!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
```
Kết quả trên giả lập sẽ như thế này:

![](https://images.viblo.asia/a4cb77e9-9ed9-4798-ab96-75664e72f8a8.png)

## 2. Di chuyển màn hình
Vậy là giờ chúng ta đã có được một app React Native cơ bản. Bây giờ chúng ta sẽ tạo ra hai màn hình, một màn hình màu cam, một màn hình màu xanh (cyan). Đầu tiên hãy tạo *OrangeScreen.js* và *CyanScreen.js*. Mình sẽ chỉ post code của một màn, màn còn lại sẽ chỉ khác ở text, tên component và *backgroundColor*. Hãy tạo folder *screens* và file *OrangeScreen.js* ở trong đó.
```javascript:screens/OrangeScreen.js

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const OrangeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Orange Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa500',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default OrangeScreen;
```
Màn Cyan các bạn tạo tương tự trong folder screens nhé (mã màu của cyan: #00ffff).
<br><br>
Vậy là ta đã setup được hai màn hình, giờ làm sao để hiển thị được chúng ? Lúc nãy chính là lúc chúng ta sử dụng *react-native-router-flux*. Hãy khai báo như sau trong file App.js và đọc qua một lượt đoạn code rồi mình sẽ giải thích tiếp.
```javascript:App.js
import React from 'react';
import { Router, Scene } from 'react-native-router-flux'

import OrangeScreen from './screens/OrangeScreen';
import CyanScreen from './screens/CyanScreen;

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="orange"
          component={OrangeScreen}
          title="Orange"
        />
        <Scene
          key="cyan"
          component={CyanScreen}
          title="Cyan"
        />
      </Scene>
    </Router>
  );
}

export default App;
```
Roài, bây giờ mình sẽ giải thích những thứ đã làm trong đoạn code trên, đầu tiên chúng ta bỏ bớt mấy component không dùng nữa của react-native và require các component cần dùng từ *react-native-router-flux* và require hai màn hình đã tạo. Sau đó trong *App* khai báo một component *Router* bọc lấy một  component *Scene*, khai báo như vậy để làm gì ? đơn giản đây chỉ là cú pháp của package thôi.
<br><br>
Sau đó bạn thấy trong code của chúng ta là hai component *scene* thực sự dùng để hiển thị hai màn hình của chúng ta. Chúng có các props ở mức tối thiểu đủ để render, đó là *key* (một lúc nữa bạn sẽ thấy chúng ta dùng nó ra sao), *component*, và *title* (dùng trên navbar).
<br><br>
*Vậy làm thế nào để chúng ta điều hướng giữa các scene ?*
<br><br>
Chúng ta sẽ dựa vào *Actions* được lấy ra từ *react-native-router-flux*. Mỗi khi ta muốn đến một màn hình khác thì chúng ta sẽ gọi *Actions.\[KEY]*, trong đó *\[KEY]* chính là key mà chúng ta đã truyền vào hai component Scene khi khai báo chúng. Hãy xem *Actions.\[KEY]* khi hoạt động sẽ như thế nào.
```javascript:screens/OrangeScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

const OrangeScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.welcome}
        onPress={() => Actions.cyan()} // New Code
      />
        Orange Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa500',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default OrangeScreen;
```
Bạn có thể thấy chúng ta sử dụng *Actions* trong việc điều hướng như thế nào!

![](https://images.viblo.asia/699e039d-b535-4452-9acd-7f3f52f76250.gif)

Vậy là chỉ với vài dòng code chúng ta đã có thể di chuyển qua lại giữa hai màn hình và bonus thêm một Navbar.

## 3. Tabs
Trước khi chúng ta tạo ra tab hãy tạo thêm một vài màn hình nữa cho các tab. Các màn hình thêm mới cơ bản là giống nhau, chỉ khác tên, *backgroundColor*, text.
<br><br>
Hãy tạo thêm các màn hình sau trong folder screens:
```
MagentaScreen.js
GreenScreen.js
VioletScreen.js
YellowScreen.js
```
Vậy là đã thêm đủ các màn, giờ chúng ta bắt đầu tạo tab bar.
<br><br>
Việc set up tabs thực sự rất dễ dàng, bạn chỉ cần thêm prop *tabs* vào root scene. Khi đó root scene sẽ biến chính mỗi component con của nó thành tab. Mỗi tab sẽ có navbar của riêng nó cũng như state di chuyển riêng. Chúng ta sẽ thấy được điều đó chỉ sau một lúc nữa, trước tiên hay viết code nào.
<br><br>
Chúng ta sẽ taọ 3 tab cho app của mình, mỗi tab sẽ có hai màn.
```javascript:app/index.js

import React from 'react';
import { Router, Scene } from 'react-native-router-flux'

import OrangeScreen from './screens/OrangeScreen';
import CyanScreen from './screens/CyanScreen';
import MagentaScreen from './screens/MagentaScreen';
import GreenScreen from './screens/GreenScreen';
import VioletScreen from './screens/VioletScreen';
import YellowScreen from './screens/YellowScreen';

const App = () => {
  return (
    <Router>
      <Scene
        key="root"
        tabs
        tabBarStyle={{ backgroundColor: '#FFFFFF' }}
        labelStyle={{ fontSize: 16, marginBottom: 15 }}
      >
        {/* Tab 'Ichi' và các màn hình của nó */}
        <Scene key="ichi" tabBarLabel="Ichi">
          <Scene
            key="orange"
            component={OrangeScreen}
            title="Orange"
          />
          <Scene
            key="cyan"
            component={CyanScreen}
            title="Cyan"
          />
        </Scene>
        {/* Tab 'Ni' và các màn hình của nó */}
        <Scene key="ni" tabBarLabel="Ni">
          <Scene
            key="magenta"
            component={MagentaScreen}
            title="Magenta"
          />
          <Scene
            key="green"
            component={GreenScreen}
            title="Green"
          />
        </Scene>
        {/* Tab 'San' và các màn hình của nó */}
        <Scene key="san" tabBarLabel="San">
          <Scene
            key="violet"
            component={VioletScreen}
            title="Violet"
          />
          <Scene
            key="yellow"
            component={YellowScreen}
            title="Yellow"
          />
        </Scene>
      </Scene>
    </Router>
  );
}

export default App;
```
Các bạn có thể thấy ở đây chúng ta đã "nhét" các màn hình ban đầu vào trong "tab" (mỗi tab có 2 màn). Một điều nữa là các bạn hãy để ý đến prop "tabs", có phải nó không có value gì không ? thực ra *tabs* tương đương với *tabs={true}* đây là cú pháp của react native. Sản phẩm của chúng ta giờ sẽ trông như thế này.

![](https://images.viblo.asia/7c46dd6d-7408-4bb3-9ad6-b3625e133b0f.gif)

## 4. Modal
Vậy là chúng ta đã có 3 tab và mỗi tab có 2 màn hình trong đó. Nhưng nếu chúng ta muốn có một modal trồi lên trên tất cả thì sao ? Thực tế thì thứ mà chúng ta sắp làm không thực sự là một modal mà là một màn hình khác thì chính xác hơn. Package của router flux có các kiểu modal khác nhau cho chúng ta chọn. Modal mà chúng ta làm sẽ trông như sau.

![](https://images.viblo.asia/9624d9a0-c478-4873-99e7-e887c4693362.gif)

Như bạn thấy, khi chúng ta ấn "Open Modal" một màn hình sẽ trồi lên trên tất cả và animation của nó đi từ dưới lên trên. Nó rất đơn giản và việc implement nó cũng vậy. Việc đầu tiên mà chúng ta cần làm là tạo ra một component *ModalScreen* giống như các màn khác mà chúng ta đã tạo.
```javascript:screens/ModalScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const ModalScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.welcome}
        onPress={() => Actions.pop()}
      >
        Modal
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default ModalScreen;
```
Các bạn thấy bên trên mình sử dụng *Action.pop()*, nó sẽ loại màn hình hiện tai khỏi stack các di chuyển hay nói cách khác là quay lại màn hình ngay trước nó.
<br><br>
Tiếp theo chúng ta thêm đoạn code sau vào App.js
```javascript:App.js

// lược bớt

import ModalScreen from '.screens/ModalScreen';

const App = () => {
  return (
    <Router>
      <Scene key="sroot" hideNavBar>
        <Scene
          key="root"
          tabs
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
          labelStyle={{ fontSize: 16, marginBottom: 15 }}
        >
            // lược bớt
        </Scene>
        <Scene  // scene mới
          key="modal"
          component={ModalScreen}
          title="Modal"
          direction="vertical"
          hideNavBar
        />
      </Scene>
    </Router>
  );
}

export default App;
```
Bạn có thể thấy đoạn code của scene mới thêm vào ở trên vô cùng đơn giản. Đầu tiên ta import ModalScreen, sau đó bọc toàn bộ các scene vào một scene. Chúng ta khai báo các prop cho modal scene giống như các màn hình khác (key, component, title) thứ mà chúng ta thêm vào là *direction* cho phép chúng ta đưa màn hình đi từ dưới lên và *hideNavBar* dùng để ẩn navbar của màn hình modal đi.
<br><br>
Giờ chúng ta cần chọn vị trí sẽ gọi modal lên. Minh sẽ chọn gọi modal từ màn hình orange. Thêm đoạn code sau vào ngay bên dưới component *Text* trong file OrangeScreen.js
```javascript:screens/OrangeScreen.js

// lược bớt

      <Text
        style={styles.welcome}
        onPress={() => Actions.modal()}
      >
        Open Modal
      </Text>
      
 // lược bớt
```
Vậy là đã xong toàn bộ code, các bạn hãy thử chạy giả lập của mình để xem kết quả.
***
Vừa rồi là bài giới thiệu ngắn gọn về sử dụng package *react-native-router-flux* thứ có thể xử lý được nhiều di chuyển màn hình mà bạn cần. Cảm ơn các bạn đã xem bài viết của mình. :kissing_heart:
<br><br>
Dich, thay đổi và bổ sung từ: https://medium.com/differential/react-native-basics-using-react-native-router-flux-f11e5128aff9