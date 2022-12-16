Animations là một phần rất quan trọng giúp tăng trải nghiệm người dùng tốt hơn.

React Native cung cấp 2 hệ thống animation bổ sung : 
+ Animated API : Kiểm soát từng chi tiết và tương tác tới từng giá trị cụ thể.
+ LayoutAnimation API: Animation cho sự chuyển đổi bố cục toàn màn hình.

Trong phần này, mình xin giới thiệu về Animated API.
Có 3 phương thức tạo animation chính, thường dùng đó là : 

1.  ***Animated.timing()*** : Phương thức dựa vào time để thay đổi giá trị.
2. ***Animated.decay()*** : Bắt đầu với vận tốc ban đầu và từ từ dừng lại.
3.  ***Animated.spring()*** :  Dựa theo nguyên lí lò xo, tạo ra các chuyển động.

Trong đó phương thức ***Animated.timing()*** và ***Animated.spring()*** được dùng nhiều hơn cả.
Cùng với các phương thức trên là các phương thức có thể kết hợp các animate một cách phức tạp : 
1. ***Animated.parallel()*** : Phương thức nhận vào một mảng animations , và chạy song song các animation đó.
2. ***Animated.sequence()*** : Phương thức nhận vào một mảng animations , và chạy tuần tự các animation đó.
3.   ***Animated.stagger()*** : Phương thức nhận vào một mảng animations , chạy chúng song song (chồng chéo) nhưng có thể bắt đầu với độ trễ khác nhau, cũng khá tương tự với ***Animated.parallel()***  tuy nhiên có thêm độ trễ.
4.  ***Animated.delay()*** : Phương thức bắt đầu một animation sau một thời gian cho trước.

Sau đây, mình sẽ đi chi tiết vào từng ví dụ về cách sử dụng 2 phương thức chính : timing, spring.
# 1. Animated.timing()
- Phương thức này cũng rất hay được sử dụng và cũng khá đơn giản. Xét một đoạn code sau: 

// import 
```
import { Platform, StyleSheet, Text, View, Animated } from 'react-native';
```

//style chung 
```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
```

```
constructor(props) {
    super(props)
    // init animated with value = 0
    this.animated = new Animated.Value(0)
  }

  componentDidMount() {
    // using timing 
    Animated.timing(this.animated,
      {
        toValue: 100, // from value 0 to 100 
        duration: 1000 // time running 
      }).start()
  }

  render() {
        // render view with animation
    return (
      <View style={styles.container}>
        <Animated.View style={{
          backgroundColor: 'pink',
          width: this.animated,
          height: this.animated
        }} />
      </View>
    );
  }
```
Cũng khá là dễ hiểu và sử dụng đúng không? Và đây là kết quả:
![](https://images.viblo.asia/bae47378-8437-4a83-bd4f-df1bcdc6649a.gif)

Ngoài ra, nếu bạn muốn kết hợp hai giá trị animation thông qua các phép cộng/trừ/nhân/chia, chúng ta có thể phát triển đoạn code trên như sau: 
```
constructor(props) {
    super(props)
    // init animated with value = 0
    this.animated = new Animated.Value(0)
    // value borderRadius change = this.animated/2
    this.borderRadius = Animated.divide(this.animated, 2)
  }

  componentDidMount() {
    // using timing 
    Animated.timing(this.animated,
      {
        toValue: 100,
        duration: 1000
      }).start()
  }

  render() {
    //render view with animation
    return (
      <View style={styles.container}>
        <Animated.View style={{
          backgroundColor: 'pink',
          width: this.animated,
          height: this.animated,
          borderRadius: this.borderRadius
        }} />
      </View>
    );
  }
```
Kết quả là:
![](https://images.viblo.asia/902eead3-64c2-4ddb-b08f-c7bbfc71ca8a.gif)


**Sử dụng interpolate để tạo những animated khác lại hơn =)))**
Hãy cùng theo dõi đoạn code sau: 
```
 constructor(props) {
    super(props)
    // init animated with value = 0
    this.animated = new Animated.Value(0)
  }

  componentDidMount() {
    // using timing 
    Animated.timing(this.animated,
      {
        toValue: 1,
        duration: 5000,
      }).start()
  }

  render() {
    // time input tuong ung voi output ra
    // 0 => 18, 0.5 => 32, 1=> 18
    // 0 => 0.5 => 1 : 2 khoang time 
    const textSize = this.animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })
    return (
      <View style={styles.container}>
        <Animated.Text style={{ color: 'green', fontSize: textSize }}>Hello animation</Animated.Text>
      </View>
    );
  }
```
Và đây là kết quả: 
![](https://images.viblo.asia/f50fdcc2-702d-4cfe-bc42-231774b907fb.gif)

Ngoài ra, còn rất nhiều cách tạo animation bằng timing rất đẹp =))) , bạn hãy thử tạo xem ? 

# 2. Animated.spring()
Xét đoạn code dưới đây : 
// style container 
```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
```

```
constructor(props) {
    super(props)
    // init animated with value = 0
    this.animated = new Animated.Value(0)
  }

  componentDidMount() {
    // using spring 
    Animated.spring(this.animated, {
      toValue: 100,
      friction: 10, // control "bounciness"/ overshoot , default 7
      duration: 1000
    }).start()
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'pink',
            marginTop: this.animated
          }} />
      </View>
    );
  }
```

Và đây là kết quả:
![](https://images.viblo.asia/0503a225-e555-4ef6-a48a-11303d6b643e.gif)

Ngoài ra, sử dụng thêm interpolate hay các thuộc tính khác như : tension, speed, bounciness, friction,.. thì sẽ làm animation của bạn đẹp hơn rất nhiều, hay dùng chính thuộc tính của view đó: 
```
 constructor(props) {
    super(props)
    // init animated with value = 0
    this.animated = new Animated.Value(0.3)
  }

  componentDidMount() {
    // using spring 
    Animated.spring(this.animated, {
      toValue: 1,
      friction: 10, // control "bounciness"/ overshoot , default 7
      duration: 1000
    }).start()
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            // borderRadius: 50,
            backgroundColor: 'pink',
            transform: [{scale: this.animated}] 
          }} />
      </View>
    );
  }
```
Kết quả sẽ tương tự như với ví dụ đầu tiên ở bên timing.

Trên đây là những chia sẻ của mình về cách sử dụng timing và spring để tạo animation, ngoài ra tuỳ theo bài toán cần làm , ta sẽ sử dụng các phương thức trên linh hoạt hơn.

Vào lần chia sẻ sau, mình sẽ giới thiệu thêm về các hàm khác(Sequence , parallel...) để kết hợp nhiều animation theo nhiều cách khác nhau. Cám ơn bạn đã đọc!

Nguồn tài liệu: https://facebook.github.io/react-native/docs/animated