Hi All.
Hôm trước dự kiến sẽ viết theo series về navigation theo document nhưng suy đi nghĩ lại thì chỉ cần làm theo document là đủ rồi nên mình chuyển qua hướng dẫn impliment một số case cụ thể luôn.

# Animation
Animation cho navigation là gì, đó là những hiệu ứng khi chúng ta di chuyển giữa các màn hình (khi đi tới hoặc goBack trở về), nó làm cho trải nghiệm người dùng được tốt hơn.


![](https://images.viblo.asia/2131363a-85a6-42a2-b449-20f7d6ea21b8.gif)



Vậy chúng ta sẽ làm như thế nào để có thể apply các animation cho navigation đây.

## Config
### gestureDirection

`gestureDirection` - đây là config để chúng ta chỉnh hướng cho navigation khi chúng ta vuốt màn hình

 - horizontal: sẽ đóng khi vuốt màn hình  từ trái qua phải, ngược lại là đóng khi vuốt màn hình từ phải qua trái trong chế độ RTL.
 - horizontal-inverted: sẽ đóng khi vuốt màn hình từ phải qua trái, ngược lại là đóng khi vuốt màn hình từ trái qua phải trong chế độ RTL. 
 - vertical: sẽ đóng khi vuốt màn hình từ trên xuống.
 - vertical-inverted: sẽ đóng khi vuốt màn hình từ dưới lên.

Chú ý là: Để animations khi chuyển trang được mượt mà thì các bạn nên xác định từ trước và áp dụng cho tất cả các màn hình vì nếu có một navigation set `gestureDirection` khác với những navigation khác thì có thể dẫn tới hiện tượng bị  `nháy` màn hình. Như bản thân mình thì thường định nghĩa 1 biến constant và dùng chung cho toàn bộ app.

```Javascript
export const GESTURE_DIRECTION = 'horizontal';
```

```Javascript
const AnimationStack = createStackNavigator();

const AnimationSampleStack = () => {
  return (
    <AnimationStack.Navigator
      initialRouteName={StackRoute.AnimationNavigation1Screen}
      screenOptions={{
       gestureDirection: 'horizontal-inverted',
        transitionSpec: {
          open: AnimationConfig,
          close: AnimationConfig,
        },
         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
     .
     .
     .
    </AnimationStack.Navigator>
  );
};
```
### transitionSpec
`transitionSpec` - Đây là config giúp chúng ta định nghĩa rõ ràng về animation mà chúng ta sẽ sử dụng.
Nó dùng để config cho việc đóng và mở của navigation bằng 2 property:

 - open: dùng để config khi stack navigation mở màn hình
 - close: dùng để config khi stack navigation đóng màn hình
 
Với mỗi property chúng ta sẽ truyền vào đó là một animation với config cụ thể như sau:
 - anmation: loại animation sẽ dùng- hiện tại có 2 loại được support là timing và spring.
 - config: sẽ tuỳ thuộc vào animation là timing hay là spring mà có config khác nhau:

```Javascript
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
```

```Javascript
const config = {
  animation: 'timing',
  config: {
    duration: 1000,
    easing: Easing.inOut(Easing.quad),
  },
};
```

Và thông thường thì để đồng bộ animation cho cả app thì mình sẽ biến nó thành một constant

```Javascript
const AnimationConfig: TransitionSpec = {
  ...TransitionSpecs.TransitionIOSSpec,
  animation: 'spring',
  config: {
    stiffness: 600,
    damping: 200,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
```

và import nó vào tất cả các navigation khác và sử dụng:

```Javascript
const AnimationStack = createStackNavigator();

const AnimationSampleStack = () => {
  return (
    <AnimationStack.Navigator
      initialRouteName={StackRoute.AnimationNavigation1Screen}
      screenOptions={{
       gestureDirection: 'horizontal-inverted',
        transitionSpec: {
          open: AnimationConfig,
          close: AnimationConfig,
        },
         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
     .
     .
     .
    </AnimationStack.Navigator>
  );
};
```

`cardStyleInterpolator` -  đây là function nơi mà sẽ tính toán các điểm dữ liệu, nó cho phép chúng ta có thể chỉnh sửa các hiệu ứng chuyển tiếp từ màn hình tới màn hình.

Và trong bài này thì tạm thời chúng ta chưa tìm hiểu kỹ các property của config `cardStyleInterpolator` mà sử dụng các option có sẵn.

## Pre-made configs

Với các option được cung cấp sẵn, nó khả thi cho việc để xây dựng các hiệu ứng dịch chuyển giữa các màn hình, một số option có sẵn được cung cấp bởi react-navigation có thể kể tới như sau:

###TransitionSpecs

  - TransitionIOSSpec: sử dụng các giá trị của cấu hình UINavigationController's animation.
  - FadeInFromBottomAndroidSpec: cấu hình cho hiệu ứng mở Activity từ Android Nougat (API 24).
  - FadeOutToBottomAndroidSpec: cấu hình cho hiệu ứng đóng Activity từ Android Nougat (API 24).
  - RevealFromBottomAndroidSpec: Cấu hình cho hiệu ứng mở Activity từ Android Pie (API 28).

```Javascript
import { TransitionSpecs } from '@react-navigation/stack';

// ...

<Stack.Screen
  name="Profile"
  component={Profile}
  options={{
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
  }}
```

### CardStyleInterpolators
 
  - forHorizontalIOS: Cấu hình theo IOS cơ bản - trượt từ bên phải
  - forVerticalIOS: Cấu hình theo IOS cơ bản - trượt từ bên dưới
  - forModalPresentationIOS: Cấu hình theo IOS cơ bản - phong cách modal trong ios 13
  - forFadeFromBottomAndroid: Cấu hình theo Android cơ bản - phong cách mờ dần từ phía dưới theo Android Pie
  - forRevealFromBottomAndroid: Cấu hình theo Android cơ bản - phong cách hiển thị từ phía dưới theo Android Pie

 Example:

 ```Javascript
  import { CardStyleInterpolators } from '@react-navigation/stack';

  // ...

  <Stack.Screen
    name="Profile"
    component={Profile}
    options={{
      title: 'Profile',
      cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    }}
  />;
 ```

 ### HeaderStyleInterpolators
  - forUIKit: theo bộ UIkit cơ bản, biểu diễn animation cho header sẽ làm mờ dần khi trở vào button back
  - forFade: Hiệu ứng làm mờ đơn giản cho các element của header
  - forStatic: hiệu ứng dịch chuyển header cùng thời điểm với lúc màn hình được mở.

  Example:

  ```Javascript
  import { HeaderStyleInterpolators } from '@react-navigation/stack';

  // ...

  <Stack.Screen
    name="Profile"
    component={Profile}
    options={{
      title: 'Profile',
      headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    }}
  />;
  ```

 ### TransitionPresets
 Một số hiệu ứng để biểu diễn quá trình chuyển tiếp của các screen được cung cấp bởi react-navigation
  
  - SlideFromRightIOS: Hiệu ứng cơ bản của IOS.
  - ModalSlideFromBottomIOS: hiệu ứng chuyển tiếp cơ bản dạng modal của IOS.
  - ModalPresentationIOS: hiệu ứng chuyển tiếp cơ bản dạng modal của IOS (IOS 13).
  - FadeFromBottomAndroid: Hiệu ứng làm mờ cơ bản khi mở và đóng một Activity của Android < 9.
  - RevealFromBottomAndroid: Hiệu ứng làm mờ cơ bản khi mở và đóng một Activity của Android >= 9.
  - DefaultTransition: hiệu ứng chuyển tiếp cơ bản của Platform.
  - ModalTransition: hiệu ứng chuyển tiếp cơ bản dạng modal của Platform.

Example

```Javascript
import { TransitionPresets } from '@react-navigation/stack';

// ...

<Stack.Screen
  name="Profile"
  component={Profile}
  options={{
    title: 'Profile',
    ...TransitionPresets.ModalSlideFromBottomIOS,
  }}
/>;
```


Và nếu bạn muốn apply cho toàn bộ navigation thì có thể config như sau:

```Javascript
import { TransitionPresets } from '@react-navigation/stack';

// ...

<Stack.Navigator
  initialRouteName="Home"
  screenOptions={({ route, navigation }) => ({
    headerShown: false,
    gestureEnabled: true,
    cardOverlayEnabled: true,
    headerStatusBarHeight:
      navigation.dangerouslyGetState().routes.indexOf(route) > 0
        ? 0
        : undefined,
    ...TransitionPresets.ModalPresentationIOS,
  })}
  mode="modal"
>
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen name="Profile" component={Profile} />
</Stack.Navigator>;
```