# 1. Introduction
Gần đây, với việc ra mặt bản phát hành mới nhất của macOS Mojave, chúng ta đã có một tính năng tuyệt vời. Đó là Dark Mode. Và nó là một tính năng thực sự thú vị. Đối với những người sử dụng Macbook, nó mang lại một trải nghiệm vô cùng mới mẻ. Vì vậy, điều gì sẽ xảy ra tiếp theo từ phía nhà phát triển Apple?

Và cho đến khi release version iOS 13, chúng ta đã được thông báo tính năng Dark Mode sẽ được phát triển trên thiết bị di động. Và chắc hẳn, các bạn là một nhà phát triển di động (mobile developer), việc phát triển tính năng Dark Mode trên những ứng dụng tiếp theo là điều hiển nhiên, và các bạn có sẵn sàng làm điều đó trên ứng dụng của mình, và làm nó như thế nào? Trong bài viết này, mình sẽ hướng dẫn các bạn cách implement Dark Mode vào ứng dụng React Native một cách nhanh nhất. 

![](https://images.viblo.asia/b142b251-65ac-4927-89c9-bcd0df8e74f2.gif)

Les't go :D

# 2. Implement
Mình sẽ có 1 sample app với 1 màn hình ***Home*** như sau:
```javascript
export const Home = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>Use Dark Mode?</Text>
    <Button style={styles.button} title='Toggle Dark Mode 🌚' onPress={onToggleTheme}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  button: {
    color: '#000000',
  },
});
```

Tiến hành rendered vào trong Application Root (App.js)
```javascript
export const App = () => {

  const toggleTheme = () => {
    // 
  };

  return (
    <Home toggleTheme={toggleTheme}/>
  );
};
```

Và bây giờ chúng ta chỉ nên sửa đổi *toggleTheme*. Những gì chúng ta sẽ làm ở đây là sửa đổi container, text và cả button để sử dụng màu sắc được cung cấp bởi "light or dark theme" (chủ đề sáng hoặc tối). Tất nhiên, chúng ta có thể triển khai cả hai chủ đề, chọn một số màu sắc đẹp, thực hiện chức năng chuyển đổi chủ đề và cuối cùng sửa đổi StyleSheet.

Tuy nhiên, đó là 1 cách, vừa dài dòng và cầu kỳ. Vậy có cách nào đơn giản, ngắn gọn hơn nữa không? Câu trả lời sẽ là ***UI Kitten***. 

Các bạn đã bao giờ nghe đến UI Kitten? UI Kitten là một framework của của UI component được cung cấp bởi Eva Design System. Thư viện này cung cấp cho bạn một API dễ sử dụng cho tính năng này. 

Dưới đây là các bước chúng ta cần triển khai implement Dark Mode.
## 2.1 Step 1: Install UI Kitten and Eva Design System

Cài đặt bộ thư viện UI Kitten:
```
npm i react-native-ui-kitten @eva-design/eva
```

## 2.2 Step 2: Wrap Application Root into ApplicationProvider
```javascript
import { ApplicationProvider } from 'react-native-ui-kitten';
import { mapping, light } from '@eva-design/eva';

export default App = () => {

  const toggleTheme = () => {
    // 
  };

  return (
    <ApplicationProvider mapping={mapping} theme={light}>
      <Home toggleTheme={toggleTheme}/>
    </ApplicationProvider>
  );
};
```
Ở bước này, mình vừa import ***ApplicationProvider*** từ bộ thư viện "react-native-ui-kitten", design UI, và setting theme. Và theme đang được setting mặc định là Light Mode.

## 2.3 Step 3: Use UI Kitten components
Và bây giờ, chúng ta sẽ tiến hành thay thế các thành phần (component) được hiển thị trên Màn hình chính (Home screen) bằng các thành phần tương tự được cung cấp bởi UI Kitten. 
```javascript
import { Button, Text, Layout } from 'react-native-ui-kitten';

export const Home = (props) => (
  <Layout style={styles.container}>
    <Text>Use Dark Mode?</Text>
    <Button onPress={props.toggleTheme}>Toggle Dark Mode 🌚</Button>
  </Layout>
);
```

Import các thành phần như là: Button, Text, Layout nhưng là từ bộ thư viện UI Kitten. Và thay thế các thành phần mặc định từ bộ thư viện 'react-native'.

## 2.4 Step 4: Switch theme
Bước tiếp theo, triển khai *toggleTheme* function:

```javascript
import React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { mapping, light, dark } from '@eva-design/eva';

const themes = { light, dark };

export default App = () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ApplicationProvider mapping={mapping} theme={themes[theme]}>
      <Home toggleTheme={toggleTheme}/>
    </ApplicationProvider>
  );
};
```

Ở đây mình tiến hành import và sử dụng 1 trong 2 theme là: **dark** hoặc **light** 
Các bạn sẽ thấy phương thức *setTheme* được gọi từ bộ thư viện UI Kitten, và ngay lập tức theme sẽ được thay đổi tương ứng với mỗi lần toggleTheme function được gọi. 

Vậy là xong rồi, bài toán được xử lý rất đơn giản với UI Kitten. :D

# Conclusion
Tương tự như trên, bằng cách sử dụng các thành phần UI Kitten, bạn có thể xây dựng một ứng dụng có độ phức tạp cao mà cũng sẽ hỗ trợ Chế độ tối (Dark Mode). Và hơn nữa, bạn có thể xây dựng các theme của riêng bạn để làm cho ứng dụng của bạn có dấu ấn hơn.

Hy vọng bài viết sẽ giúp ích cho các bạn. Thanks for reading!


Nguồn tham khảo:
1. [Source on Github](https://github.com/artyorsh/react-native-dark-mode-app)
2. [Same example on Snack](https://snack.expo.io/@art.yorsh/ui-kitten---welcome)
3. [UI Kitten documentation](https://akveo.github.io/react-native-ui-kitten/)