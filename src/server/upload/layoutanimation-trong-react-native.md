### Mở đầu 
Nếu bạn đang phát triển ứng dụng bằng React Native, muốn sử dụng các animations nhưng lại chưa biết về **LayoutAnimation**, có lẽ đó thật sự là 1 thiếu sót. Ở bài viết này mình sẽ giúp các bạn hiểu thêm về nó.
### Chú ý
**1.** Để có thể thực thi được trên Android bạn cần phải check các cờ sau thông qua UIManager 
```
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
```
**2.** Thường được đặt trước khi gọi setState 
```
LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

this.setState({index});
```

### Tiến hành 
Trong ví dụ dưới đây, mình sẽ tạo ra 1 complex view với 3 trạng thái. Chiều cao, chiều rộng và số item được render dựa vào state **index** 

***Khi chưa apply LayoutAnimation***

![](https://cdn-images-1.medium.com/max/600/1*y2xXWMHw2B-EeF4j0GtNHg.gif)

***Sau khi đã apply LayoutAnimation***

Chỉ với 1 dòng code sau
```
LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
```

ta đã có được 

![](https://cdn-images-1.medium.com/max/600/1*2AstNM8YGZjooCJILlLhqg.gif)

LayoutAnimation gồm có 3 presets:
 
 1.  spring 
 2.  easeInEaseOut
 3.  linear

Bạn vẫn có thể custom LayoutAnimation bằng đoạn code ví dụ sau 

```
// Spring 
var CustomLayoutSpring = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.7,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
  };
  
// Linear with easing
var CustomLayoutLinear = {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.curveEaseInEaseOut,
    },
  };
  
 
 // Execute by calling before a state change
 // LayoutAnimation.configureNext(CustomLayoutSpring);
```

### Kết luận 
Hy vọng với bài viết của mình các bạn có thể có cái nhìn tổng quan để có thể áp dụng vào dự án, làm cho dự án sinh động hơn.

### Tham khảo 
https://medium.com/@Jpoliachik/react-native-s-layoutanimation-is-awesome-4a4d317afd3e
https://facebook.github.io/react-native/docs/layoutanimation