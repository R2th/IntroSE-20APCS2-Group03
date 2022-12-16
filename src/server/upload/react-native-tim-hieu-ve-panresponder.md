Khi lập trình giao diện ứng dụng, chúng ta sẽ gặp nhiều trường hợp cần di chuyển một view từ vị trí này đến vị trí khác, thường gặp như dạng re-order list hoặc drag and drop. Những dạng này sẽ có nhiều thư viện hỗ trợ và chúng ta có thể sử dụng luôn. Tuy nhiên để hiểu rõ hơn về việc di chuyển một view trong react native, chúng ta sẽ sử dụng API mà chính React Native cung cấp là `PanResponder`. 

`PanResponder` là một lớp được sử dụng để handle các sự kiện của việc `touch` của người dùng. Trong lớp này chúng ta có rất nhiều function để handle như sau
```javascript
class ExampleComponent extends Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    return <View {...this._panResponder.panHandlers} />;
  }
}
```

Tuy nhiên để đơn giản chúng ta sẽ quan tâm đến 3 functions dễ hiểu nhất là `onPanResponderGrant, onPanResponderMove và onPanResponderRelease`.
* onPanResponderGrant: function này sẽ được gọi khi người dùng touch vào màn hình ứng dụng của chúng ta
* onPanResponderMove: function này sẽ được gọi khi người dùng di chuyển ngón tay trên màn hình ứng dụng của chúng ta
* onPanResponderRelease: function này sẽ được gọi khi người dùng nhấc ngón tay rời khỏi màn hình ứng dụng.

Nếu bạn nào từng làm Android sẽ thấy tương tự với các actions là ACTION_DOWN, ACTION_MOVE và ACTION_UP. 

Mỗi function trên đều nhận đầu vào gồm 2 tham số là `event` và `gestureState`.

* event chính là `touch event`, object này có rất nhiều thuộc tính nhưng chúng ta cần quan tâm chính là nativeEvent, object `nativeEvent` bao gồm các thuộc tính:
1. changedTouches - một mảng gồm tất cả các sự kiện touch từ sự kiện cuối cùng
2. identifier - system sẽ tự gen cho chúng ta một ID cho mỗi event
3. locationX - khoảng cách từ vị trí touch đến lề trái của view mà chúng ta gán vào PanResponder
4. locationY - khoảng cách từ vị trí touch đến lề trên của view mà chúng ta gán vào PanResponder
5. pageX - khoảng cách từ vị trí touch đến lề trái của rootview
6. pageY - khoảng cách từ vị trí touch đến lề trên của rootview
7. target - id của view mà chúng ta gán vào PanResponder
8. timestamp - thời gian khi chúng ta touch, thường được sử dụng để tính vận tốc di chuyển trên màn hình
9. touches - một mảng bao gồm tất cả sự kiện touch đang có trên màn hình ứng dụng.

* gestureState là một object bảo gồm các thuộc tính sau
1. stateID - ID của event touch
2. moveX - khoảng cách từ vị trí touch hiện tại so với cạnh trái của màn hình
3. moveY - khoảng cách từ vị trí touch hiện tại so với cạnh trên của màn hình
4. x0 - khoảng cách từ vị trí touch ban đầu so với cạnh trái của màn hình
5. y0 - khoảng cách từ vị trí touch ban đầu so với cạnh trên của màn hình
6. dx - độ chệnh lệch theo chiều X của vị trí hiện tại so với vị trí ban đầu
7. dy - độ chênh lệch theo chiều Y của vị trí hiện tại so với vị trí ban đầu
8. vx - current velocity of the gesture
9. vy - current velocity of the gesture
10. numberActiveTouches - số lượng touchs trên màn hình.

Các bạn nên lưu ý cần phần biệt rõ ràng giữa hai object trên nhé, nativeEvent liên quan đến view, còn gestureState liên quan đến màn hình.

Bây giờ chúng ta sẽ tạo một ví dụ nho nhỏ , đơn giản là di chuyển một đoạn Text trên màn hinh nhé :D

Trước hết chúng ta tạo một component Text có chiều cao = chiều rộng = 100, và gán một biến `view` cho Text thông qua `ref` như sau:
```javascript
render() {
    return (<Text ref={view => this.view = view} style={{ width: 100, height: 100, backgroundColor: 'red' }}>Hello</Text>)
}
```

Tiếp đến chúng ta sẽ tạo PanResponder trong constructor của component

```javascript
constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.view.setNativeProps({
            backgroundColor: 'green'
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        this.view.setNativeProps({
            backgroundColor: 'green',
            top: gestureState.moveY,
            left: gestureState.moveX
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.view.setNativeProps({
            backgroundColor: 'red',
            top: gestureState.x0,
            left: gestureState.y0
        });
      }
    });
  }
```

Khi bắt đầu touch chúng ta sẽ đổi màu background của Text từ màu đỏ sang màu xanh. Khi di chuyển view trên màn hình chúng ta sẽ set lại khoảng cách của view theo hai trục x và y so với màn hình. Cuối cùng khi dừng việc move và nhấc ngón tay khỏi màn hình, chúng ta sẽ set lại background của Text sang màu đỏ ban đầu và đưa Text về vị trí ban đầu sử dụng `gestureState.x0` và `gestureState.y0`. 

Các bạn có thể sử dụng một cách khác là Animated API để kéo thả có thể mượt mà hơn, nhưng trong bài viết lần này mình sẽ sử dụng `setNativeProps` cho đơn giản nhất có thế. Hy vọng bài viết phần nào giúp bạn hiểu rõ hơn về các sự kiện touch trên màn hình cũng như việc handle chúng trong ứng dụng.

#### Cảm ơn các bạn đã đọc bài viết. Happy Coding