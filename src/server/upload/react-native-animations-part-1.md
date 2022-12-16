Trong quá trình  phát triển ứng dụng, hầu như mọi dev đều đã quen thuộc với những phần xử lý logic nhưng lại hay gặp trở ngại trong phần hiệu ứng. Và trong bài viết này mình sẽ chia sẽ những kiến thức cơ bản nhất để các bạn có cái nhìn tổng quan về hiệu ứng trong RN. 

  Có 3 phương thức chính bạn có thể tạo ra hiệu ứng:

   1. **Animated.timing()**
   2. **Animated.decay()**
   3. **Animated.spring()**

 Nào bây giờ chúng ta hay cùng đi vào 3 phương thức chính này nhé.
 
###  Animated.timing()
 Giúp cho ta bắt đầu một hiệu ứng sau trong khoảng thời gian bao lâu.
 
 Các thuộc tính hay sử dụng:

  1. duration: thực thi trong bao lâu (ms). Mặc định là 500.
  2. easing:  Có 3 chuẩn hay được sử dụng là linear, cubic và quad.
  3. delay: Bắt đầu 1 animation sau thời gian bao nhiêu ms. Mặc định là 0. 

Và sau đây là đoạn code example của mình cho mọi người dễ hình dung.

```
 constructor () {
    super()
    this.spinValue = new Animated.Value(0) // khởi tạo giá trị 
  }
  
  componentDidMount () {
    this.spin()
  }
  
  spin = () => {
    this.spinValue.setValue(0) 
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: timing,
        easing: Easing.linear
      }
    ).start(this.spin)  // gọi lại chính nó khi đã hoàn thành 
  }
  
  render () {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']  // rotate từ 0 đến 360 độ dựa vào input range 
    })
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{ width: 227, height: 200, transform: [{rotate: spin}] }} // gán giá trị vào đây 
          source={require('../assets/images/photo.jpg')} />
      </View>
    )
  }
```

Mục đích: Muốn image nó xoay 360 mãi mãi

![](https://images.viblo.asia/d9fa75e5-ed2d-43da-b7ea-401ca6d2d600.gif)


###  Animated.decay()

Giúp component di chuyển với 1 gia tốc nhất định cùng với lực hãm kèm theo.

Hai tham số cần quan tâm:

 1. velocity: gia tốc khởi tạo ( bắt buộc phải có )
 2. deceleration: lực hãm. Mặc định là 0.997. Range [0, 1]

Sau đây sẽ là code example: 

```
constructor(props) {
    super(props)
    this.anim = new Animated.ValueXY();
  }
  
  onAction = () => {
    Animated.decay(
      this.anim,
      { 
        velocity: { x: 50, y:0 },
        deceleration: 0.2
      }
    ).start()
  }

  render() {
    return (
        <TouchableOpacity onPress={this.onAction} style={{ backgroundColor: 'red', width: 100 }} >
          <Animated.Text style={this.anim.getLayout()}> Click here to start animation </Animated.Text>
        </TouchableOpacity>
    )
  }
```

Ở đây mình muốn sau khi click button thì text sẽ dịch sang phải với gia tốc 50. Các bạn chú ý nếu tăng deceleration thì khoảng cách giữa text và button càng xa. Tuy nhiên nếu deceleration = 1 thì nó giữ nguyên vị trí.

Dưới đây là hình ảnh sau khi click 

![](https://images.viblo.asia/da41b93f-df6c-4c3e-9e87-465b10dc7cb5.gif)

###  Animated.spring()

Tạo hiệu ứng dạng vật lý như nhún nhảy, đàn hồi ... 

Có 4 thuộc tính cần quan tâm trong config của nó:

 1. friction: Độ đàn hồi / overshot. Default 7.
 2. tension: Quản lý tốc độ speed. Default 40.
 3. speed: Quản lý tốc độ của animation. Default 12.
 4. bounciness: Độ đàn hồi. Default 8.

**NOTE** cặp friction-tension đi cùng nhau, speed-bouciness đi cùng với nhau. Không thể kết hợp lộn xộn.

Sau đây sẽ là code example 

```
constructor () {
    super()
    this.springValue = new Animated.Value(100)
  }
  spring = () => {
    this.springValue.setValue(100)
    Animated.spring(
      this.springValue,
      {
        toValue: 250,
        friction: 1,
        tension: 1,
        // speed: 1,
        // bounciness: 1
      }
    ).start()
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={{marginBottom: 100}} onPress={this.spring}>Click</Text>
        <Animated.Image
          style={{ width: this.springValue, height: 200, resizeMode: 'stretch' }}

          source={require('../assets/images/photo.jpg')} />
      </View>
    )
  }
```

Ở đây mình mong đợi sau khi bấm nút thì width sẽ tăng lên + hiệu ứng nảy.

# Kết
Qua bài viết này mình hy vọng các bạn sẽ có cái nhìn tổng quan về animation trong react native. 

Phần tiếp theo mình sẽ làm 1 số hiệu ứng kết hợp với nhau. Hy vọng nhận được sự ủng hộ của mọi người.

#  Tham khảo 
https://facebook.github.io/react-native/docs/animated