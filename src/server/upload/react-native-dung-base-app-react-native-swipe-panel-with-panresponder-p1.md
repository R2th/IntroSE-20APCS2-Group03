Hi All.
Hôm nay mình sẽ làm 1 bài hướng dẫn để làm 1 swipe panel bằng panResponder nha mn.

# Requirement
Bài toán đặt ra cho chúng ta những yêu cầu như sau:
Màn hình sẽ bao gồm các component:

- Swipe Panel: Panel này cho phép chúng ta swipe, Panel này có thể swipe lên và xuống
- Modal Panel: Panel này không cho phép chúng ta swipe, nó sẽ di chuyển theo Swipe Panel
- BackGround Panel: đây là Panel sẽ đứng yên chứa các control, khi Swipe Panel đi lên phía trên thì toàn bộ control trong Panel này sẽ bị block và không thể sử dụng
- Opacity Panel: Panel này chỉ xuất hiện khi Swipe Panel đi lên phía trên và sẽ biến mất khi Swipe Panel trở về đúng vị trí xuất phát, nó có nhiệm vụ block toàn bộ BackGround Panel 

Với các Component như trên thì mình có đánh màu nó như sau

- Swipe Panel: màu xanh
- Modal Panel: màu đỏ
- BackGround Panel: màu vàng

Về yêu cầu logic như sau:

- Khi `Swipe Panel` rời khỏi vị trí ban đầu và di chuyển lên phía trên thì `Opacity Panel` sẽ xuất hiện và block toàn bộ ` BackGround Panel`, đồng thời `Modal Panel` sẽ di chuyển theo  `Swipe Panel`
-  `Swipe Panel` được thoải mái di chuyển lên xuống nhưng khi User thả tay ra thì  `Swipe Panel` sẽ phải tự động  tính toán vị trí sao cho:
    - Vị trí đứng của  `Swipe Panel` khi swipe đi lên chính là chiều cao của  `Swipe Panel` + `Modal Panel`
    - Vị trí đứng của  `Swipe Panel` khi swipe đi xuống chính là điểm xuất phát ban đầu


Các bạn có thể xem ví dụ như ảnh gif nha:

![](https://images.viblo.asia/20704d82-aed6-4261-a696-7b8625ca7d87.gif)

Ok chúng ta sẽ cùng bắt tay vào làm nào, nhưng để làm được như thế này thì các bạn cần phải nắm rõ về 2 kiến thức sau:

- [React Native Animated](https://reactnative.dev/docs/animated)
- [React Native Panresponnder](https://reactnative.dev/docs/panresponder)

Vì sao lại là Animated và Panresponse. Vì Panresponse sẽ giúp chúng ta tính toán các vị trí khi User Swipe, còn Animated sẽ giúp chúng ta xử lý các hiệu ứng được mượt mà hơn.


# Setup
## Panresponder
Đây là đoạn code tạo Panresponder.

```JS

import { PanResponder, Animated } from 'react-native';

 const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

const handleShouldSetPanResponder = (evt: any, gestureState: any) => {
    return evt.nativeEvent.touches.length === 1 && Math.abs(gestureState.dy) > 5;
  };

const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: handleShouldSetPanResponder,
    onMoveShouldSetPanResponder: handleShouldSetPanResponder,
    onPanResponderMove: (e, gestureState) => {
      return Animated.event(
        [
          null,
          {
            dy: pan.y,
          },
        ],
        {
          useNativeDriver: false,
        },
      )(e, gestureState);
    },
    onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderRelease: (_e, gestureState) => {
      pan.flattenOffset();
      if (gestureState.dy > 0) {
        fadeOut();
      } else {
        fadeIn();
      }
    },
  });
  
  <Animated.View
        ref={ref}
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.swipePanel]}
      />
   <Animated.View style={[pan.getLayout(), styles.modalPanel]} />
```

trước hết chúng ta cần phải tạo ra 1 `Panresponder` bằng cách sử dụng method `PanResponder.create` và tiến hành config một vài option.
Và trong bài toán của chúng ta thì chúng ta cần config những gì

### Check Should Panresponder run?
Bài toán thực tế thì sẽ có rất nhiều case và trong đó có một vài trường hợp như thế này thì chúng ta cần phải block Panresponder:

 - User touch và ko swipe
 - User swipe nhưng khoảng cách swipe quá ngắn
 
Để giải quyết vấn đề này thì `Panresponder` đã support bằng cách cho phép chúng ta config các option và ở đây mình sử dụng 2 option :
 - `onStartShouldSetPanResponder`
 - `onMoveShouldSetPanResponder` 

Như đoạn code sau:

```JS
const handleShouldSetPanResponder = (evt: any, gestureState: any) => {
    return evt.nativeEvent.touches.length === 1 && Math.abs(gestureState.dy) > 5;
  };
  
const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: handleShouldSetPanResponder,
    onMoveShouldSetPanResponder: handleShouldSetPanResponder,
  });
```

2 Option này sẽ sử dụng `handleShouldSetPanResponder` để check xem User toucher bao nhiêu lần và khoảng cách mà User đã swipe là bao xa, function `handleShouldSetPanResponder` sẽ trả về kết quả `true` hoặc `false` (`true` thì `Panresponder` sẽ chạy và `false` thì không)

### onPanResponderMove
Đây là phần quan trọng nhất, tại function này chúng ta sẽ quyết định việc di chuyển của các panel bằng cách set các toạ độ tương ứng.

```JS
onPanResponderMove: (e, gestureState) => {
      return Animated.event(
        [
          null,
          {
            dy: pan.y,
          },
        ],
        {
          useNativeDriver: false,
        },
      )(e, gestureState);
    },
```

Ở đây mình đang trả về cho `onPanResponderMove` là một `Animated.event`, điều này có nghĩa là gì. `PanResponder` sẽ tạo ra một function mà nó sẽ tự động lấy 2 giá trị của `gestureState` là `dx` và `dy`, sau đó nó đi update giá trị `x` và `y` tương ứng của Animated. Và tất nhiên khi giá trị của Animated được update thì nhiệm vụ còn lại là của `Animated.View` sẽ biểu diễn sự thay đổi của giá trị.

### onPanResponderGrant
Mỗi một lần User swipe thì function này sẽ được gọi một lần duy nhất với mục đích thiết lập các giá trị cần thiết (tuỳ vào mục đích chúng ta cần cái gì).

```JS
 onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
      pan.setValue({ x: 0, y: 0 });
    },
```

Ở đoạn code này chúng ta sẽ quan tâm tới 1 giá trị đó là `Offset`

- `Offset` dịch ra Tiếng Việt là `Giá Trị Bù`.
- Mình sẽ giải thích vì sao chúng ta lại cần `Giá Trị Bù` này: 
    - Khi bạn chạm vào bất cứ đâu trên màn hình điện thoại và tiến hành swipe thì chúng ta không thể tính toán được toạ độ chính xác là đang ở đâu.
    - Còn ở trong function `onPanResponderMove` sẽ chỉ trả về cho bạn khoảng cách mà các bạn đã swipe

Dựa trên 2 bài toán trên thì `Offset` hay còn gọi là  `Giá Trị Bù` đã được ra đời để giải quyết bài toán.

Ví dụ:
 - Bạn đang ở ví trí `{ x: 0, y: 0 }` 
 - Bạn swipe lần 1 lên phía trên và khoảng cách là 200
 - Bạn dừng swipe
 - Bạn lại swipe lần thứ 2 lên phía trên và khoảng cách là 200

Với bài toán này thì ở lần thứ 2 chúng ta mong muốn rằng điểm xuất phát phải ở `{ x: 0, y: 200 }`  đúng ko ạ.

Và mục đích của `onPanResponderGrant` là để giải quyết bài toán ở trên, chúng ta set `Offset` chính là vị trí hiện tại (trước khi thực hiện swipe), và sau đó dựa vào giá trị này chúng ta có thể tính toán chính xác toạ độ bắt đầu và toạ độ di chuyển.

Còn giá trị `Value` sau khi lưu trữ bằng cách set `Offset` thì chúng ta sẽ tiến hành reset nó về  `{ x: 0, y: 0 }`

### onPanResponderRelease

```JS
onPanResponderRelease: (_e, gestureState) => {
      pan.flattenOffset();
}
```

`onPanResponderRelease`: đây là function sẽ chạy khi User kết thúc swipe (User nhấc tay khỏi màn hình), và ở đây chúng ta sẽ call function `pan.flattenOffset();`.

 `pan.flattenOffset();`: Nó sẽ set lại giá trị của Animated bằng cách gộp giá trị hiện tại với giá trị `Offset`
 
 Ví dụ
Tại `onPanResponderRelease` Animated có giá trị `Offset` là `{ x: 0, y: 200 }`  và giá trị `Value` của Animated là `{ x: 0, y: 200 }` thì sau khi call `pan.flattenOffset();` giá trị của `Offset` là `{ x: 0, y: 0 }` và giá trị `value` của Animated là `{ x: 0, y: 400 }`.

Như vậy ở function `onPanResponderRelease` này là điểm kết thúc của một quá trình swipe, function này kết hợp với `onPanResponderGrant` sẽ đảm bảo rằng chúng ta sẽ luôn có giá trị cuối cùng của swipe.


### Part 1 Conlusion
Phần 1 chúng ta sẽ dừng lại ở mức hiểu về nguyên lý hoạt động của `PanResponder`, ở phần sau chúng ta sẽ đi chi tiết hơn về bài toán cụ thể mà chúng ta đã nêu ở trên.
Tạm biệt và hẹn gặp lại mn.

Nếu bạn nào muốn xem code thì [Xem tại đây](https://github.com/dattx-0602/ReactNativeSample/pull/7)