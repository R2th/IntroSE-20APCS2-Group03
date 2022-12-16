> Trong khi làm một số dự án, mình gặp phải một vấn đề mà mình cho là gặp khá nhiều trong quá trình làm một sản phẩm IT hiện nay. Đó là vấn đề về animation kéo thả trên các thiết bị di động. Để làm được việc này trong React Native cũng không quá khó, bài viết này mình sẽ giới thiệu và hướng dẫn cách sử dụng PanResponder để kéo thả.

# 1. Ứng dụng mà chúng ta sẽ cùng xây dựng:
Chúng ta sẽ làm một ứng dụng như thế này:
![](https://images.viblo.asia/01e95cf7-8600-4c67-9cae-bf0deb0e03f3.gif)

# 2. Tạo component có thể kéo thả:
 Trong bài viết này, mình sẽ sử dụng PanResponder. Sau khi import class PanResponder, khởi tạo nó bằng phương thức `.create` bên trong phương thức `componentWillMount()` hoặc trong `constructor()`:
```javascript
import React, { Component } from "react";
import {
 StyleSheet,
 View,
 PanResponder,
 Animated
} from "react-native";

export default class Draggable extends Component {
 constructor() {
   super();
   this.state = {
     pan: new Animated.ValueXY()
   };
 }

 componentWillMount() {
   // Thêm listener khi gía trị thay đổi
   this._val = { x:0, y:0 }
   this.state.pan.addListener((value) => this._val = value);
   // Khởi tạo PanResponder và xử lý khi component dịch chuyển
   this.panResponder = PanResponder.create({
     onStartShouldSetPanResponder: (e, gesture) => true,
     onPanResponderMove: Animated.event([
       null, { dx: this.state.pan.x, dy: this.state.pan.y }
     ])
     // cập nhật giá trị vị trí
     this.state.pan.setValue({ x:0, y:0})
   });
 }

 render() {
   const panStyle = {
     transform: this.state.pan.getTranslateTransform()
   }
   return (
       <Animated.View
         {...this.panResponder.panHandlers}
         style={[panStyle, styles.circle]}
       />
   );
 }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
 circle: {
   backgroundColor: "skyblue",
   width: CIRCLE_RADIUS * 2,
   height: CIRCLE_RADIUS * 2,
   borderRadius: CIRCLE_RADIUS
 }
});
```
* `this.panResponder = PanResponder.create()` sẽ khởi tạo PanResponder và tạo một tham chiếu. Chúng ta sử dụng nó trong component `<Animate.View>` bằng cách truyền vào một nhóm props `{…this.panResponder.panHandlers}`.

* Bên trong `PanResponder.create()` chúng ta set `onStartShouldSetPanResponder` là `true` để panResponder phản hồi khi chúng ta chạm vào màn hình. Sau đó, chúng ta truyền vào `onPanResponderMove:` một `Animated.event` để cập nhật vị trí cho component `Animated.View` mà người dùng đang tương tác.

* Để lấy vị trí của component, chúng ta lấy animated value đã được tính toán từ `this.state.pan.getTranslateTransform()` và sử dụng nó để tạo một transform style mà chúng ta truyền vào `Animated.View`.
* Cuối cùng, chúng ta điều chỉnh giá trị để nó ko bị "nhảy" khi chạm vào màn hình lần thứ hai. 
* Tại thời điểm này, chúng ta có một compoenent hình tròn có thể kéo thả mà người dùng có thể tương tác được:
![](https://images.viblo.asia/dbf8888b-2909-4978-9d44-f268221e9b85.gif)

# 3. Đưa hình tròn về vị trí ban đầu của nó:
Nếu bạn muốn hình tròn trở về vị trí ban đầu của nó khi chúng ta thả tay ra khỏi màn hình. Để làm được điều này, chúng ta sử dụng `onPanResponderRelease`:
```javascript
componentWillMount() {
 ...
   this.panResponder = PanResponder.create({
     ...
     onPanResponderRelease: (e, gesture) => {
       Animated.spring(this.state.pan, {
         toValue: { x: 0, y: 0 },
         friction: 5
       }).start();
     }
   });
```
* Bây giờ hình tròn của chúng ta sẽ trở về vị trí ban đầu của nó khi chúng ta thả tay ra khỏi nó:

![](https://images.viblo.asia/7c24af07-4702-4129-8ffb-3ae3d08520b6.gif)

# 4. Tạo vùng để thả:
Bây giờ chúng ta đã có vùng để kéo, tiếp theo chúng ta sẽ tạo vùng để thả. Chúng ta tạo một component khác với vùng thả và sử dụng `Draggable` component bên trong nó:
```javascript
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Draggable from "./Draggable";

export default class Screen extends Component {
 render() {
   return (
     <View style={styles.mainContainer}>
       <View style={styles.dropZone}>
         <Text style={styles.text}>Drop them here!</Text>
       </View>
       <View style={styles.ballContainer} />
       <View style={styles.row}>
         <Draggable />
         <Draggable />
         <Draggable />
         <Draggable />
         <Draggable />
       </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
 mainContainer: {
   flex: 1
 },
 ballContainer: {
   height:200
 },
 row: {
   flexDirection: "row"
 }, 
 dropZone: {
   height: 200,
   backgroundColor: "#00334d"
 },
 text: {
   marginTop: 25,
   marginLeft: 5,
   marginRight: 5,
   textAlign: "center",
   color: "#fff",
   fontSize: 25,
   fontWeight: "bold"
 }
});

```
* Sau đó chúng ta thêm một logic vào `Draggable`, và  thêm một hàm để xác định khi nào chúng ta kéo component vào bên trong vùng thả. Giả sử vùng thả trên màn hình sẽ là như thế này:
```javascript
constructor()
   super.props();
   this.state = {
     showDraggable: true,
     pan: new Animated.ValueXY(),
     opacity: new Animated.Value(1)
   };
 }
 componentWillMount() {
   ...
   this.panResponder = PanResponder.create({
     ...
     onPanResponderRelease: (e, gesture) => {
       if (this.isDropArea(gesture)) {
         Animated.timing(this.state.opacity, {
         toValue: 0,
         duration: 1000
       }).start(() =>
         this.setState({
            showDraggable: false
         })
       );
     } else {
       Animated.spring(this.state.pan, {
         toValue: { x: 0, y: 0 },
         friction: 5
       }).start();
     }
   }
 isDropArea(gesture) {
   return gesture.moveY < 200;
 }

```
Thế là xong! Màn hình của chúng ta giờ sẽ trông như thế này:

![](https://images.viblo.asia/080ee368-2497-4d25-b56f-ea686df38028.gif)

# 5. Kết luận:
- Theo mình, React Native PanReponder API khi mới làm quen sẽ khá khó sử dụng, nhưng mình nghĩ đây là một API tuyệt vời mà mọi dev đều có thể sử dụng để tăng trải nghiệm cho người dùng ứng dụng tốt hơn.
- Mình hi vọng bài viết này ít nhiều có thể giúp các bạn phần nào đó khi làm animation cho ứng dụng React Native. Cảm ơn bạn đã đọc hết bài viết này và happy coding!
- Link bài viết tham khảo: https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0