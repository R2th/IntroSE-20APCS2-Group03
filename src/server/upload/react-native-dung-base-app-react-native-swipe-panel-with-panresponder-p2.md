Hi All.
Ở [Phần 1](https://viblo.asia/p/react-native-dung-base-app-react-native-swipe-panel-with-panresponder-p1-QpmleNBm5rd) Chúng ta đã hoàn thiện phần setup panResponder và hôm nay chúng ta sẽ hoàn thiện thêm một vài hiệu ứng để giúp cho ứng dụng chúng ta mượt mà hơn. Vậy những hiệu hứng đó là gì:

- Khi swipe pannel thực hiện di chuyển lên trên thì sẽ xuất hiện 1 View và làm mờ đi những phần không được swipe pannel che phủ.
- Khi thực hiện swipe lên đến điểm cao nhất của màn hình và release swipe thì swipe pannel sẽ tự động di chuyển trở lại đúng vị trí chúng ta settup
- Tương tự như swipe lên thì swipe xuống cũng sẽ tự động điều chỉnh để trở lại vị trí xuất phát nếu chúng ta swipe xuống quá sâu.

![](https://images.viblo.asia/20704d82-aed6-4261-a696-7b8625ca7d87.gif)

### Opacity View

Opacity View sẽ làm những nhiệm vụ gì.
 - Block toàn bộ những phần view còn lại của screen mà swipe pannel ko che phủ
 - Thay đổi thuộc tính Opacity theo vị trí của swipe pannel, thuộc tính opacity sẽ thay đổi vị trí của swipe pannel, đậm hơn khi swipe pannel đi lên và biến mất khi swipe pannel trở lại vị trí xuất phát.

Để làm điều này chúng ta sẽ làm gì.

Đầu tiên chúng ta sẽ định nghĩa một `Animated.Value` để tracking vị trí của swipe pannel.

```TS
 const animationValue = useRef(new Animated.Value(StartY)).current;
```

Và để đảm bảo rằng giá trị được tracking đúng thì các bạn hãy sử dụng thêm `useRef` nha.

Sau khi đã được định nghĩa thì `animationValue` sẽ tracking swipe pannel bằng cách nào?. Đơn giản chúng ta sẽ tracking khi giá trị `y` của swipe pannel thay đổi.

```TS
useEffect(() => {
    pan.y.addListener((value: any) => {
      animationValue.setValue(value.value);
    });

    return () => {
      pan.y.removeAllListeners();
    };
  }, []);
```

Và Opacity View của chúng ta sẽ là như sau:

```TS
<Animated.View
        style={[
          styles.opacityPanel,
          {
            opacity: animationValue.interpolate({
              inputRange: [0, StartY],
              outputRange: [1, 0],
            })
          },
        ]}
      />
```

các bạn có thắc mắc vì sao chúng ta lại đặt giá trị từ `0` đến `StartY` ko?
Hãy nhìn bức hình sau nha.

![](https://images.viblo.asia/27ae27f1-9cfd-4c57-9d74-9f1bdd2c357b.jpeg)

Như vậy vị trí `y=0` chính là vị trí cao nhất trong screen và công thức của chúng ta sẽ luôn đảm bảo được rằng khi swipe pannel của chúng ta di chuyển tới vị trí cao nhất thì `Opacity View` sẽ có thuộc tính `opacity = 1` và ngược lại khi về tới vị trí xuất phát (`StartY`) thì sẽ có giá trị `opacity = 0`.

Nhưng như thế này là chưa đủ, chúng ta sẽ phải đảm bảo rằng `Opcity View` sẽ nằm trên các control khác và sẽ không che lấp swipe pannel.

Để làm được điều đó chúng ta sẽ sử dụng `zIndex` và update lại view một chút như sau:

Chúng ta sẽ thêm một `Animated.Value` nữa để sử dụng cho việc thay đổi `zIndex`

```TS
 const opacityAnimationValue = useRef(new Animated.Value(0)).current;
```

`opacityAnimationValue` sẽ tracking ở đâu?, nó sẽ được cập nhập dựa theo vị của swipe pannel và chúng ta sẽ update sự kiện thay đổi giá trị của swipe pannel như sau:

```TS
pan.y.addListener((value: any) => {
      animationValue.setValue(value.value);
      opacityAnimationValue.setValue(value.value >= StartY ? 0 : 1);
    });
```

Và `Opacity View` sẽ update lại như này.

```TS
<Animated.View
        style={[
          styles.opacityPanel,
          {
            zIndex: opacityAnimationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 3],
            }),
            opacity: animationValue.interpolate({
              inputRange: [0, StartY],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
```


Full các View sẽ có Index như sau

```TS
<View style={styles.container}>
      <View style={styles.backgroundPanel}>
        <Button
          title="press"
          onPress={() => {
            Alert.alert('button press');
          }}
        />
      </View>
      <Animated.View
        style={[
          styles.opacityPanel,
          {
            zIndex: opacityAnimationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 3],
            }),
            opacity: animationValue.interpolate({
              inputRange: [0, StartY],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Animated.View
        ref={ref}
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.swipePanel]}
      />
      <Animated.View style={[pan.getLayout(), styles.modalPanel]} />
    </View>
    
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'yellow',
    zIndex: 0,
  },
  backgroundPanel: {
    zIndex: 1,
  },
  opacityPanel: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: 'white',
    zIndex: 0,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  swipePanel: {
    backgroundColor: '#61dafb',
    height: 100,
    width: DEVICE_WIDTH,
    borderRadius: 4,
    zIndex: 5,
  },

  modalPanel: {
    backgroundColor: 'red',
    height: DEVICE_HEIGHT / 2,
    width: DEVICE_WIDTH,
    borderRadius: 4,
    zIndex: 4,
  },
});
```

Như vậy chúng ta sẽ đảm bảo được rằng Opacity sẽ có `zIndex` phía trên các control và không che lấp swipe pannel. Ngoài ra thuộc tính opacity sẽ luôn thay đổi theo vị trí của swipe pannel.

### Fade In and Fade Out

Tiếp theo sẽ là chức năng tự động điều chỉnh vị trí của swipe pannel. Với chức năng này thì chúng ta sẽ đảm bảo được điều gì:

 - Sẽ đảm bảo được swipe pannel ở đúng vị trí chúng ta quy định, cho dù chúng ta có swipe lên quá cao so  vị trí `EndY` hoặc swipe xuống quá thấp so với vị trí `StartY`

Để làm điều đó chúng ta sẽ làm như sau:

Đầu tiên chúng ta sẽ sử dụng `Animated.timing` để định nghĩa 2 function `fadeIn` và `fadeOut` như sau:

```TS
const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(pan, {
      useNativeDriver: false,
      toValue: { x: 0, y: EndY },
      duration: AUTO_ANIMATION_TIME,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(pan, {
      useNativeDriver: false,
      toValue: { x: 0, y: StartY },
      duration: AUTO_ANIMATION_TIME,
    }).start();
  };
```

Nhìn có thì chúng ta có thể dễ dàng thấy được mục đích của 2 function nói trên.
 - `fadeIn` nó sẽ đảm bảo cho vị trí của swipe pannel sẽ luôn ở vị trí  `EndY`
 - `fadeOut` nó sẽ đảm bảo cho vị trí của swipe pannel sẽ luôn ở vị trí  `StartY`

Nhưng có một câu hỏi là 2 function sẽ chạy lúc nào, trả lời luôn là nó sẽ chạy lúc chúng ta rời tay khỏi màn hình và đoạn code như thế này:

```TS
 onPanResponderRelease: (_e, gestureState) => {
      pan.flattenOffset();
      if (gestureState.dy > 0) {
        fadeOut();
      } else {
        fadeIn();
      }
    },
```

Đoạn code trên chúng ta sẽ cùng phân tích như sau:
 - `pan.flattenOffset();`  function `flattenOffset` sẽ lấy các gía trị của `offset` và cộng vào giá trị hiện tại của `Animated.Value`, cụ thể là của `pan` và thực hiện set `offset` về 0. Ví dụ `pan` của chúng ta đang có giá trị `y:50` và `offset` có giá trị là `{x:0, y:100}` thì sau khi chạy function  `flattenOffset`, biến `pan.y` của chúng ta sẽ có giá trị là 150, và `offset` sẽ được set lại giá trị là `{x:0, y:0}`
 - `gestureState.dy` - `accumulated distance of the gesture since the touch started` có nghĩa là khoảng cách từ lúc chúng ta thực hiện swipe đến lúc chúng ta thực hiện bỏ tay ra. Ở đoạn này thì mình sẽ check xem giá trị của `gestureState.dy` đi lên hay đi xuống mà gọi `fadeIn` và `fadeOut` tương ứng.

Như vậy là chúng ta đã hoàn thiện đầy đủ các bước hoàn thành swipe pannel mà ko cần phải sử dụng thư viện nào cả.

[Các bạn có thể xem full code ở đây](https://github.com/dattx-0602/ReactNativeSample/blob/master/src/screens/SwipeSample/SwipeSample.tsx)