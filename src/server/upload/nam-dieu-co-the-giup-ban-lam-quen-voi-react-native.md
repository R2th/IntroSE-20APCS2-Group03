Bài viết này mình đọc được trên medium, thấy tác giả khác là tâm huyết khi tóm tắt lại những kiến thức cơ bản về React Native sau những trải nghiệm làm project với  React Native, Expo CLI, Rẽu, Hooks, styled-components và Ruby on Rails.
# 1. React Native CLI vs Expo CLI 
Khi set up ứng dụng của mình, có hai cách để tạo và chạy là : [Expo CLI ](https://docs.expo.io/workflow/expo-cli/)và React Native CLI. Xem tài liệu về [React native để set up môi trường phát triển ](https://reactnative.dev/docs/environment-setup).

Expo CLI thì thân thiện hơn với người mới bắt đầu và chỉ mất vài phút để thiết lập và chạy được ứng dụng của bạn. Tuy nhiên, React Native CLI tốt hơn cho các dev mobile có kinh nghiệm và khả năng customize tốt hơn là Expo CLI. 

Và [video](https://www.youtube.com/watch?v=uHlAM4ICi1s) này sẽ nêu ưu điểm và nhược điểm của cả hai.

# 2. Core Components
Vì không có DOM trên mobile, vì vậy chúng ta không thể sử dụng các thẻ HTML như `<div>` . Thay vào đó, React Native sử dụng các component: 
```
<View> hoạt động như <div>
```
```
<Text> tương đương với một <p>. Nó có thể hiện thị văn bản
```
```
<Image> hiển thị như <img>
```
```
<ScrollView> giống như View nhưng có thể cuộn
```
Đây là danh sách đầy đủ list Native component. Đừng lo lắng vì có thể cảm thấy lạ, khi bạn sử dụng nhiều, sẽ thấy quen thôi ^^.

# 3. Screens/ Navigating between them (Màn hình/Di chuyển giữa các màn hình)
Mobile apps tạo thành từ các màn hình. Và React Navigation là thư viện cho phép điều hướng các màn hình. Thư viện này chứ 3 loại trình điều hướng: 
1. `StackNavigator`: Được sử dụng để chuyển đổi giữa các màn hình, trong đó mỗi màn hình mới được đặt trên đầu 1 stack.

![](https://images.viblo.asia/372d94df-e24c-4c7c-b963-cc84d272e365.gif)

2. `TabNavigator`: ( Phổ biến nhất): Các tab ở cuối màn hình hoặc trên đầu.

![](https://images.viblo.asia/453f553f-1120-4c89-adf6-5387a42bb1f1.gif)

3.  `DrawerNavigator`:  Panel ở cạnh trái của màn hình, thường bị ẩn cho tới khi người dùng vuốt sang phải.

![](https://images.viblo.asia/b8291a37-2559-44ce-b62e-fad38abe98b6.gif)

# 4. Styling
React Native không sử  dụng CSS, thay vào đó, bạn sử dụng Javascript để tạo style cho ứng dụng của mình. Tất cả các core component chấp nhận một props named style. Các tên style và giá trị thường khớp với cách hoạt động của CSS ngoại trừ các tên được viết bằng caseCamel(backgroundColor). 

Cách tốt nhất là sử dụng StyleSheet,create để xác định một số kiểu như trong đoạn code dưới đây.

```
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={styles.container}>
    <Text style={styles.row}>Row 1</Text>
    <Text style={styles.row}>Row 2</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "blue"
  },
  row: {
    padding: 4,
    color: "white",
  }
});

export default App;
```
Cá nhân tôi thấy cách viết này clearn và dễ dùng hơn. Ngoài ra, các component tạo kiểu như là 1 thư viện CSS trong JS nơi bạn viết CSS cho mỗi thành phần như: 
```
import React from "react";
import styled from 'styled-components';

const App = () => (
  <StyledView>
    <StyledText>Row 1</StyledText>
    <StyledText>Row 2</StyledText>
  </StyledView>
);

const StyledView = styled.view `
  flex: 1;
  padding: 24px;
  backgroundColor: blue;
`

const StyledText = styled.text `
  padding: 4px;
  color: white;
`
 
export default App;
```

Một điều quan trọng cần lưu ý khi tạo style trong React Native là Flexbox. FlexDirection mặc định là column thay vì row. Flex thì phức tạp hơn một chút.

Flex xác định các item của bạn được fill trong 1 không gian có sẵn. Các không gian được phân chia dựa trên thuộc tính linh hoạt của từng item và chỉ hỗ trợ một số duy nhất. Bạn có thể đọc thêm tài liệu chính thức tại [đây](https://reactnative.dev/docs/flexbox).

# 5. Helpful Resources
Cuối cùng là một số thông tin document giúp ích cho bạn và cả tôi khi nghiên cứu đó là: 
1. [React Native Docs](https://reactnative.dev/docs/getting-started) : Đây là điều hiển nhiên rồi ^^ 
2. Expo CLI Docs
3. [React Native Beginner Tutorial](https://www.youtube.com/watch?v=0-S5a0eXPoc&ab_channel=ProgrammingwithMosh)
4. [Running Your App on a Device with Local Backend](https://dev.to/katkelly/running-your-react-native-expo-app-on-a-device-with-local-backend-k8l)
5. [Form template](https://gist.github.com/dabit3/1c6b1808c9bdf10138f51dae46418d8c)

Tôi hy vọng bài viết này đã giúp xóa tan mọi do dự cho bất kỳ ai đang nghĩ về việc học React Native.

Bài viết dịch từ nguồn : https://medium.com/swlh/5-things-to-help-react-native-beginners-9b692e12df4d