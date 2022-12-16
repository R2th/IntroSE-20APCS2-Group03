# Giới thiệu
Xin chào các bạn, trong bài viết này mình xin hướng dẫn các bạn làm 1 Animation về Header khi scroll, cũng như [bài viết trước](https://viblo.asia/p/bubble-animation-trong-react-native-Ljy5VBMj5ra) về animation của mình. Đây cũng là một bài demo khá đơn giản giúp các bạn làm quen với animation trong React Native. 
Animation này có thể ứng dụng vào các scroll view, list view giúp view của bạn thân thiện hơn với người dùng.

![](https://images.viblo.asia/87ca170e-ac2d-441a-9958-82785fc90095.gif)

Bài viết được tham khảo tử nguồn : https://medium.com/appandflow/react-native-scrollview-animated-header-10a18cb9469e

Bắt đầu thôi nào :)

# Cách thức hoạt động

Ý tưởng của chúng ta là hiển thị header trên ScrollView sử dụng position: ‘absolute’ và margin vào đầu ScrollView. Sau đó, chúng ta chỉ có thể tạo hiệu ứng cho tiêu đề khi scroll View.

# Getting Started

Hãy bắt đầu bằng cách tạo một ScrollView với một số nội dung và nhập một vài fake data chúng ta cần cho các bước tiếp theo.

```
import React, {Component} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ScrollableHeader extends Component {

  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.fill}>
        <ScrollView
          style={styles.fill}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Tiếp theo, chúng ta cần tạo header View margin với nội dung ScrollView để nội dung của nó không nằm trong tiêu đề. Chúng tôi cũng sẽ thêm title cho Header. Hãy thêm View sau đây dưới ScrollView. Chúng ta sẽ sử dụng một Animated.View vì nó sẽ được animated cuối cùng.

```
...
<ScrollView>
  ...
</ScrollView>
<Animated.View style={styles.header}>
  <View style={styles.bar}>
    <Text style={styles.title}>Title</Text>
  </View>
</Animated.View>
...
```

Hãy thêm vào một vài style nhé

```
...
header: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#03A9F4',
  overflow: 'hidden',
},
bar: {
  marginTop: 28,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
},
title: {
  backgroundColor: 'transparent',
  color: 'white',
  fontSize: 18,
},
scrollViewContent: {
  marginTop: HEADER_MAX_HEIGHT,
},
...
```

Chúng ta cũng sẽ define một vài constants cho các kích thước của Header, sẽ được sử dụng để thêm vào giá trị vị trí scroll.

```
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT — HEADER_MIN_HEIGHT;
```

Bây giờ hãy build thử, chúng ta đã có 1 view cơ bản nhất để sẵn sàng cho các bước tiếp theo.

![](https://images.viblo.asia/8fa718fe-0ee7-455f-a08f-338ee9fe5ba1.png)

# Add Animation

React Native đã có sẵn API rất mạnh về animation có sẵn rất nhiều props rất dễ dàng sử dụng. Trong trường hợp này, chúng ta cần thêm giá trị cho scrollY. 

```
...

constructor(props) {
  super(props);

  this.state = {
    scrollY: new Animated.Value(0),
  };
}

...
  
render() {
  const headerHeight = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  
  ...

  <ScrollView
    style={styles.fill}
    scrollEventThrottle={16}
    onScroll={Animated.event(
      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
    )}
  >
    ...
  </ScrollView>
  <Animated.View style={[styles.header, {height: headerHeight}]}>
    ...
  </Animated.View>
  ...
}
```


Đầu tiên, chúng ta tạo một Animated.Value, gán một giá trị đơn giản để có thể tạo được chuyển động bằng AnimatedAPI.

Sau đó, chúng ta gán value cho scroll position của ScrollView. Để làm điều này, chúng ta sử dụng Animated.event để mapping giữa thuộc tính với giá trị muốn gán. ở case này, hãy dùng `<eventObject>.nativeEvent.contentOffset.y.`
    
Sau đó sử dụng interpolate method để map scroll position đến header height mong muốn. Điều chúng ta làm là khi bắt đầu ở vị trí 0 => header sẽ có chiều cao HEADER_MAX_HEIGHT. Và khi di chuyển scroll, header sẽ được thu nhỏ về đến HEADER_MIN_HEIGHT.

Cuối cùng, chúng ta đặt chiều cao cho animated value cho header view. Đặt giá trị cho scrollEventThrottle = 16 để các event có thể hoạt động mượt nhất.

Lúc này header sẽ di chuyển khi scroll view. Với kỹ thuật này chúng ta cỏ thể thêm các animate khác vào header khi người dùng scrolling.

# More Animations

Mình sẽ thử thêm ảnh vào cho header để cho đỡ nhàm chán hơn nhé. Để làm điều này, hãy thêm 2 thứ là interpolated và Image component.

```
...

const imageOpacity = this.state.scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
  outputRange: [1, 1, 0],
  extrapolate: 'clamp',
});
const imageTranslate = this.state.scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [0, -50],
  extrapolate: 'clamp',
});

...

<ScrollView>
  ...
</ScrollView>
<Animated.View style={[styles.header, {height: headerHeight}]}>
  <Animated.Image
    style={[
      styles.backgroundImage,
      {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
    ]}
    source={require('./images/cat.jpg')}
  />
  <Animated.View>
    ...
  </Animated.View>
</Animated.View>

...

backgroundImage: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  width: null,
  height: HEADER_MAX_HEIGHT,
  resizeMode: 'cover',
},
  
...
```

Chúng ta sẽ thêm một hiệu ứng opacity như một điểm nhấn khi header được scroll đến giữa chừng, ảnh sẽ được làm mở dần. Và bây giờ nhũng gì chúng ta còn thiếu là là việc scaling image khi scroll lên và header được show ra.

Hãy thử làm phần này nhé. 

Và dĩ nhiên, nếu loay hoay một hồi mà bạn vẫn chưa thành công, hãy thử xem demo của mình ở :

https://github.com/oNguyenManhDuc/rn-header-animated

Chúc các bạn thành công.