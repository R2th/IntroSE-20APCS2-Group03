# Introduction
Hi All.
Ở các bài trước thì chúng ta đã tìm hiểu các loại navigation thường sử dụng rồi, và hôm nay chúng ta sẽ đi tới một loại navigation hay ho khác đó chính là `Modal Navigation`.

Trước khi vào chủ đề chính thì mình xin đưa ra 2 bài toán sau:

1. Một số ứng dụng thì thường sẽ có một vài action được đặt sẵn ở màn hình home để tiện cho user sử dụng, nhưng nếu như vậy thì màn hình Top nhìn sẽ ko được đẹp lắm do có quá nhiều button hay là label. 
2. Ứng dụng đặt xe thì màn hình top sẽ là nơi chứa bản đồ  và sẽ không có không gian để chúng ta đặt các button hay là label.

Vậy chúng ta sẽ giải quyết bài toán này như thế nào, và chắc hẳn thì Modal sẽ được tính tới như là một phương án hay ho để xử lý bài toán trên, và mọi người cùng xem một demo sau nha:


![](https://images.viblo.asia/f950d2b4-f050-4373-a7b8-59bfdc61cf9c.gif)

Thật là tiện lợi đúng ko ạ, chúng ta có thêm không gian để bố trí các chức năng cần thiết nhưng ở màn hình home lại ko cần quá nhiều không gian.

Nhưng khi bắt tay vào làm chúng ta sẽ có một issue mới đó chính là chúng ta sẽ phải xử lý khá nhiều logic cho Modal này, vậy làm sao để chúng ta có thể sử dụng Modal mà ít logic nhất đây.

Rồi mở bài đã xong giờ chúng ta vào đề luôn nhỉ.

# Transparent modals
Nguyên văn giới thiệu từ phía React Navigation là như sau

> A transparent modal is like a modal dialog which overlays the screen. The previous screen still stays visible underneath. To get a transparent modal screen, it's usually easier to create a separate modal stack. In the modal stack, you will want to configure few things:

Đơn giản là 2 cái màn hình sẽ nằm chồng lên nhau và cái màn hình phía trên sẽ có background là transparent. Thay vì chúng ta phải code nhiều logic để quản lý việc hiển thị Modal thì nay chỉ cần navigate đến màn hình chúng ta cần và việc còn lại thì đã có React Navigation lo hết rồi.

Như ví dụ mình đã code như sau:

![](https://images.viblo.asia/fb9a914f-f03c-4d0f-aad6-debb83f1bef0.gif)

## Setup
Chúng ta sẽ làm như sau:

1.  Set mode cho Stack Navigator là `modal`
2.  Set cardStyle với option `backgroundColor: 'transparent'`
3.  Khoá Navigation Header bằng cách set `headerShown: false`
4.  Set `cardOverlayEnabled: true`
5.  Custom animation


```JS
const modalStack = createStackNavigator();

const AnimationConfig: TransitionSpec = {
  ...TransitionSpecs.TransitionIOSSpec,
  animation: 'timing',
  config: {
    duration: 2000,
    easing: Easing.inOut(Easing.quad),
  },
};

const ModalStackSampleStack = () => {
  return (
    <modalStack.Navigator
      initialRouteName={StackRoute.ModalNavigation1Screen}
      mode="modal"
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardOverlay: (props) => <View {...props} style={styles.cardOverlay} />,
        gestureDirection: 'vertical',
        transitionSpec: {
          open: AnimationConfig,
          close: AnimationConfig,
        },
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.height, 0],
                }),
              },
            ],
          },
        }),
      }}>
      <modalStack.Screen
        name={StackRoute.ModalNavigation1Screen}
        component={ModalNavigation1Screen}
        options={{
          title: 'Modal Navigation Example',
        }}
      />
      <modalStack.Screen
        name={StackRoute.ModalNavigation2Screen}
        component={ModalNavigation2Screen}
        options={{
          headerShown: false,
          transitionSpec: {
            open: AnimationConfig,
            close: AnimationConfig,
          },
        }}
      />
    </modalStack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardOverlay: {
    opacity: 0.5,
    backgroundColor: 'black',
    height: '100%',
  },
});
```

## Custom Animation
Như trong ví dụ mình nếu ở trên thì mình đang setup cho Modal đi từ phía dưới lên. Và giờ mình sẽ giải thích một chút cho config này

```JS
 cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.height, 0],
                }),
              },
            ],
          },
        }),
```

Để config animation cho navigation thì chúng ta sẽ config trong trong option [cardStyleInterpolator](https://reactnavigation.org/docs/stack-navigator/#animations) và animation mình đang config cho `cardStyle` là fadeIn từ dưới lên bằng cách di chuyển card theo trục Y.

![](https://images.viblo.asia/27ae27f1-9cfd-4c57-9d74-9f1bdd2c357b.jpeg)

Với config ở phía trên thì chúng ta có thể hiểu rằng, screen thứ 2 sẽ chạy từ phía dưới lên và khoảng cách chạy là bằng chiều cao của màn hình.

```JS
   translateY: current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.height, 0],
    }),
```

Ai chưa hiểu interpolate [thì vào đây nha](https://reactnative.dev/docs/animations#interpolation), chúng ta có quảng đường,  có thời gian và `interpolate` sẽ giúp chúng ta tính toán chính xác ở mỗi thời điểm thì card sẽ ở vị trí nào.

```JS
const AnimationConfig: TransitionSpec = {
  ...TransitionSpecs.TransitionIOSSpec,
  animation: 'timing',
  config: {
    duration: 2000,
    easing: Easing.inOut(Easing.quad),
  },
};
```

Chẳng hạn như mình đang config animation là loại `timing` với duration là `2000 ms`, thì `current.progress.interpolate` sẽ tự động tính toán tốc độ và cập nhật ví trí của screen theo trục Y.

###  Note

Mình có một số note với các bạn như sau:
 - Khi sử dụng react navigation modal thì hạn chế việc update state trong quá trình animation đang diễn ra, bởi nếu có sự update UI thì sẽ có hiện tượng giật lag, điều này sẽ ảnh hưởng tới trải nghiệm người dùng.
 - Với IOS thì khi sử dụng modal thì cần chú ý tới việc multipe modal, bởi IOS Ko hỗ trợ việc này, đề phòng trường hợp bị freeze app khi multiple modal cùng mở.