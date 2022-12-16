Đối với React Native, khi bạn muốn tạo animation thì [Animated API](https://reactnative.dev/docs/animated.html) là cách hữu hiệu nhất.
![](https://images.viblo.asia/85e92cfa-cf60-4ca3-9600-f1b0af9169fb.gif)

Có ba method chủ yếu mà bạn sẽ dùng để tạo ra animation

1. `Animated.timing()`- Kết nối quãng thời gian với giá trị tuyến tính
2. `Animated.decay()` - Bắt đầu với một gia tốc nhất định sau đố giảm dần cho đến khi dừng lại.
3.  `Animated.spring()` - Một model vật lý `single-spring` đơn giản dựa vào [Rebound](http://facebook.github.io/rebound/) và [Origami](https://origami.design/). Kiểm tra trạng thái gia tốc để tạo ra một chuyển động lỏng bồng bềnh khi giá trị `toValue` được update và có thể kết nối với nhau.

Chúng ta sẽ tìm hiểu chính về `Animated.timing()` và `Animated.spring()` vì chúng có độ phổ biến cao nhất.

Cùng với ba method trên thì có ba cách để gọi những animation này. Chúng ta sẽ tìm hiểu cả ba cách này nữa.

1. `Animated.parallel()` - Bắt đầu với một array các animation cùng một lúc.
2. `Animated.sequence()` - Bắt đầu với một array các animation theo thứ tự, đợi khi cái này xong cái khác mới được bắt đầu. Nếu animation hiện tại bị dừng, sẽ không có animation nào được bắt đầu nữa.
3. `Animated.stagger()`- Giống với `Animated.parallel()` những cho phép chúng ta thêm delay vào giữa các animation.


## 1. Animated.timing()
![](https://images.viblo.asia/aceebf31-08e3-404c-aeb7-4a1bb84a1fb3.gif)

Animation đầu tiên mà chúng ta sẽ tạo là animation xoay này bằng cách dùng `Animated.timing()`.

```javascript
Animated.timing(
  someValue,
  {
    toValue: number,
    duration: number,
    easing: easingFunction,
    delay: number
  }
)
```
Loại animation vĩnh viễn này rất phù hợp để tạo ra các icon loading. Để bắt đầu đương nhiên chúng ta cần phải tạo project React Native rồi.

```js
react-native init animations
cd animations
```
Trong folder này, mở ra `index.android.js` hoặc `index.ios.js` file

Bây giờ chúng ta đã có một project mới được tạo, điều đầu tiên mà chúng ta cần làm đó là import `Animated` ,`Image` và `Easing` vào : 

```javascript
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing
} from 'react-native'
```

`Animated` là thư viện mà chúng ta cần để tạo ra animation.

`Image` cần thiết để tạo ra ảnh trong UI

`Easing` là module cho phép ta tạo ra các dạng tuyến tính như là `linear, ease, quad, cubic, sin. elastic, bounce, back, benzier, in, out, inout` và nhiều thứ khác. Ở đây chúng ta sẽ sử dụng `linear`.

Tiếp theo, chúng ta cần đặt một giá trị khởi tạo cho giá trị xoay : 

```js
constructor () {
  super()
  this.spinValue = new Animated.Value(0)
}
```

Chúng ta đặt `spinValue` là giá trị mới của `Animated.Value` và truyền 0 vào.

Tiếp theo chúng ta cần tạo ra một hàm spin và gọi hàm này trong `componentDidMount` để cho nó chạy lúc load app.

```js
componentDidMount () {
  this.spin()
}
spin () {
  this.spinValue.setValue(0)
  Animated.timing(
    this.spinValue,
    {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }
  ).start(() => this.spin())
}
```
hàm `spin()`sẽ làm những việc sau đây :

1. Đặt `this.spinValue` về lại 0
2. Gọi `Animated.timing` và đặt giá trị `this.spinValue` thành 1 trong khoảng 4000 miliseconds với easing là linear.
3. Gọi `start()` ở method theo sau vào đưa vào `this.spin()` vào trong callback để gọi vòng lặp vĩnh cửu.

Tiếp theo chúng ta cần phải render nó ra : 

```js
render () {
  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: 227,
          height: 200,
          transform: [{rotate: spin}] }}
          source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
    </View>
  )
}
```
Cuối cùng là style component ra giữa. 

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
```
## 2. Một vài ví dụ nữa về Animated.timing

![](https://images.viblo.asia/55deaa06-42aa-4426-aca6-e0064acd2c2a.gif)

Chúng ta biết được phần cơ bản của `Animated.timing`, bây giờ hãy xem thêm một vài ví dụ nữa liên quan đến `interpolate`(giá trị nội suy) và tạo ra chúng.

Trong ví dụ tiếp theo, chúng ta sẽ tạo ra giá trị animation đơn lẻ, và dùng chúng để tạo ra nhiều animation theo các style sau : 

1. marginLeft
2. opacity
3. fontSize
4. rotateX

Điều đầu tiên mà chúng ta vẫn phải làm đó là tạo giá trị khởi tạo.


```js
constructor () {
  super()
  this.animatedValue  = new Animated.Value(0)
}
```

Sau đó tạo ra hàm animation trong `componentDidMount()`

```js
componentDidMount () {
  this.animate()
}
animate () {
  this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }
  ).start(() => this.animate())
}
```

trong hàm render, chúng ta tạo 5 giá trị nội suy khác nhau: 

```js
render () { 
  const marginLeft = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300]
  })
  const opacity = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })
  const movingMargin = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0]
  })
  const textSize = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, 32, 18]
  })
  const rotateX = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg']
  })
...
}
```

`interpolate` chó phép chúng ta dùng `this.animatedValue` theo nhiều cách khác nhau. Vì giá trị của nó chỉ có từ 0 đến 1 nên chúng ta có thể thay đổi nó theo nhiều giá trị khác nhau cho các style khác nhau như opacity, margin, text size, rotation.

Sau đó chúng ta return như sau :

```js
return (
    <View style={styles.container}>
      <Animated.View
        style={{
          marginLeft,
          height: 30,
          width: 40,
          backgroundColor: 'red'}} />
      <Animated.View
        style={{
          opacity,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'blue'}} />
      <Animated.View
        style={{
          marginLeft: movingMargin,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'orange'}} />
      <Animated.Text
        style={{
          fontSize: textSize,
          marginTop: 10,
          color: 'green'}} >
          Animated Text!
      </Animated.Text>
      <Animated.View
        style={{
          transform: [{rotateX}],
          marginTop: 50,
          height: 30,
          width: 40,
          backgroundColor: 'black'}}>
        <Text style={{color: 'white'}}>Hello from TransformX</Text>
      </Animated.View>
    </View>
)
```

Có thể thêm style vào 

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150
  }
})
```

Trên đây là phần 1 của bài hướng dẫn tạo animation, ở phần sau chúng ta sẽ tìm hiểu tiếp các cách tạo animation khác thú vị hơn.

REF: https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae