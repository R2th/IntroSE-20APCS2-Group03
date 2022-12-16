![](https://images.viblo.asia/6fbb0925-5772-4e28-96e7-056d37f8267c.jpeg)


Với một số ứng dụng di động, đặc biệt như các ứng dụng về tài chính, ngân hàng có chứa những dữ liệu nhạy cảm. Việc để lộ dữ liệu ngay cả khi người dùng không hoạt động trong một khoảng thời gian sẽ tạo ra một lỗ hổng bảo mật vì tin tặc có thể lợi dụng điều đó để xâm nhập điện thoại và đánh cắp các dữ liệu nhạy cảm. Để giảm thiểu nguy cơ xảy ra điều đó thì bạn nên đăng xuất sau khi thấy ứng dụng không hoạt động trong một khoảng thời gian nhất định (tùy chỉnh theo từng ứng dụng). Trong bài viết này tôi sẽ chia sẻ với mọi người một cách để làm được điều đó.

Tôi sẽ dùng [Panesponder](https://reactnative.dev/docs/panresponder) để detect các hoạt động của người dùng khi app ở trạng thái background mà không dùng AppState (cách này có một vài hạn chế).

Trong project bạn tạo một custom hook gọi là `useAutoLogout.ts` với code như sau:

```
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = "token value";
  const lastInteraction = useRef(new Date());
  const [timeWentInactive, setTimeWentInactive] = useState<Date | null>(null);
  const inactivityTimer = useRef<boolean | NodeJS.Timeout | number>(false);
  const waitForInactivity = useRef<number>(0);

  const INACTIVITY_CHECK_INTERVAL_MS = 1000;

  useEffect(() => {
    if (token) {
      //  180 secs
      const autologoutTime = 180;
      waitForInactivity.current = autologoutTime * 1000;
    }
  }, [token, waitForInactivity.current]);

  const performAutoLogout = useCallback(() => {
    navigation.navigate('Logout');
  }, []);

  const checkInactive = useCallback(() => {
    if (inactivityTimer.current) {
      return;
    }
    inactivityTimer.current = setInterval(() => {
      if (Math.abs(new Date().valueOf() - lastInteraction.current.valueOf()) >=
        waitForInactivity.current) {
        setIsInactive();
      }
    }, INACTIVITY_CHECK_INTERVAL_MS);
  }, []);

  useEffect(() => {
    if (token) {
      checkInactive();
    }
  }, [checkInactive]);

  const setIsActive = useCallback(() => {
    lastInteraction.current = new Date();
    if (timeWentInactive) {
      setTimeWentInactive(null);
    }

    if (token) {
      checkInactive();
    }
  }, []);

  const setIsInactive = () => {
    setTimeWentInactive(new Date());
    performAutoLogout();
    clearInterval(inactivityTimer.current as number);
    inactivityTimer.current = false;
  };

  const handleMoveShouldSetPanResponder = useCallback(() => {
    setIsActive();
    return false;
  }, [setIsActive]);

  const handleStartShouldSetPanResponder = useCallback(() => {
    setIsActive();
    return false;
  }, [setIsActive]);

  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    }), []);

  return {
    panResponder,
  };
}
```

Bây giờ sẽ giải thích từng chỗ một nhé. Đầu tiên:
```
useEffect(() => {
    if (token) {
      //  180 secs
      const autologoutTime = 180;
      waitForInactivity.current = autologoutTime * 1000;
    }
  }, [token, waitForInactivity.current]);
```

Ở đây đảm bảo rằng đã có user token (đồng nghĩa với user đã login) . Chúng ta đặt `autologoutTime` là đơn vị giây, có thể lấy từ server hoặc là làm thủ công. Convert thành mili giây và đặt vào trong biến `ref`


```
const checkInactive = useCallback(() => {
    if (inactivityTimer.current) {
      return;
    }
    inactivityTimer.current = setInterval(() => {
      if (Math.abs(new Date().valueOf() - lastInteraction.current.valueOf()) >=
        waitForInactivity.current) {
        setIsInactive();
      }
    }, INACTIVITY_CHECK_INTERVAL_MS);
  }, []);
```

Hàm `checkInactive` sẽ kiểm tra chênh lệch thời gian giữa thời điểm hiện tại và thời điểm tương tác cuối cùng  có lớn hơn khoảng thời gian đã được setting để ứng dụng không hoạt động hay không. Nếu điều kiện được đáp ứng thì ứng dụng được cho là không hoạt động và `setIsInactive()` sẽ được gọi. `setIsInactive()` là nơi đăng xuất ứng dụng.

Các hàm `handleMoveShouldSetPanResponder` và  `handleStartShouldSetPanResponder` sẽ được gọi khi có tương tác (hoạt động) trong ứng dụng. Trong mỗi hàm thì `setIsActive` đều được gọi để cập nhật lại giá trị `lastInteraction` cho thời gian hiện tại và cũng kiểm tra luôn việc không hoạt động trong ứng dụng. Với chu kỳ như vậy, ứng dung sẽ hoạt động như bình thường nhưng nếu không có tương tác gì trong 180s thì ứng dụng sẽ tự động đăng xuất.

Cuối cùng thì cần import `useAutoLogout.ts` này vào Root component khi người dùng đã đăng nhập và sủ dụng như bên dưới:

```
import React from 'react';
import { View } from 'react-native';
import { panResponder } from 'useAutoLogout.ts'

const Home = () => {
   return (
    <View {...panResponder.panHandlers}>
    /* screens. */
   </View>
   )
}
```

Như vậy là chúng ta đã có thể thêm tính năng tự động logout sử dụng [**PanResponder**](https://reactnative.dev/docs/panresponder) vào ứng dụng của mình rồi. Để tham khảo thêm, bạn có thể truy cập [Document về PanResponder](https://reactnative.dev/docs/panresponder).