# 1. Bài toán
Trong lúc làm việc với React Native, mình có gặp một task liên quan tới việc hiển thị 1 screen theo 'portrait' và 'landspace'.  
Kiểu như:

![](https://images.viblo.asia/b00515f3-a443-4712-b21a-ea341c85f387.PNG)

![](https://images.viblo.asia/caff4503-a4d5-4017-a9a9-783bc42ee877.PNG)

Đây chắc là ví dụ khá tiêu biểu và hầu như với app nào có liên quan tới màn video, vào theo mình thấy hầu như các app đều có xử lí với màn video này :D .


Mình có tìm hiểu được một vài cách xử lí vấn đề này, mong là sẽ có nhiều ý kiến góp ý, bình luận thêm về cách xử lí của mình.

# 2. Các hướng xử lí
## 1. Cách 1: Dựa vào các thuộc tính của view  
Ta để ý: 

'portrait' khi mà height > width
'landspace' khi mà height < width

Vậy dựa vào thuộc tính này ta có thể check được screen đó đang là 'portrait' hay là 'landspace' dựa vào: 

```
const { width, height } = Dimensions.get('window')
```

Tuy nhiên, nếu chỉ dùng `Dimensions` thì ta sẽ không bắt được việc khi đang ở màn đó mà xoay màn hình về  'portrait' hay là 'landspace'.

Để handle được việc này ở view có thuộc tính `onLayout`

```
render(): {
  // return a different layout depending on this.state.isPortrait
  return <View onLayout={this.onLayout} />
},

onLayout = e => {
    let isPortrait = e.nativeEvent.layout.height > e.nativeEvent.layout.width
    if (isPortrait != this.state.isPortrait) {
      this.setState({ isPortrait });
    }
  }
```

Vậy chỉ dựa vào biến isPortrait ta có thể check và render ra view phù hợp với yêu cầu màn hình.

Khá là dễ và đơn giản phải không ạ :D.

## 2. Cách 2: Sử dụng thư viện 
Khi tìm hiểu về phần này, tình cờ đọc 1 issue trên github mình thấy bạn ý giới thiệu tới thư viện này: [react-native-orientation](https://github.com/yamill/react-native-orientation) để giải quyết issue cũng liên quan tới vấn đề như bài toán đầu bài mình đề cập tới.

Ở phần giới thiệu, thư viện cũng có vẻ khá an tâm (1.5k star), tuy nhiên cũng khá lâu rồi k thấy hoạt động. Mình có thử cài đặt trên RN 0.61 thì vẫn oke và sử dụng khá tốt.

### Về cài đặt
```
npm install react-native-orientation --save
```

còn mình dùng yarn 
```
 yarn add install react-native-orientation
```
và dùng cho RN 0.61 nên việc link cũng k cần config nhiều và thủ công như trước nữa.

### Về sử dụng
```
import Orientation from 'react-native-orientation'
```
Thư viện có giới thiệu tới một số Orientation Events:

`addOrientationListener((orientation) => {});` - `removeOrientationListener((orientation) => {});`

`orientation` sẽ trả về các giá trị: 
+ LANDSCAPE
+ PORTRAIT
+ PORTRAITUPSIDEDOWN
+ UNKNOWN

`addSpecificOrientationListener` - `removeSpecificOrientationListener` thì trả về `orientation` các giá trị đặt biệt hơn.

Trong ví dụ này, mình sẽ sử dụng cặp event
`addOrientationListener` -`removeOrientationListener`  cho ví dụ: 

```
componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  },

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  },

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
```

Ngoài ra, còn cung cấp thêm một số function, giúp handle view screen cho các trường hợp khác như đối với từng app : khoá 'landspace', chỉ handle 'landspace' ở một số màn nhất định...
```
+ lockToPortrait() // this locks the view to Portrait Mode
+ lockToLandscape() // this locks the view to Landscape Mode
+ lockToLandscapeLeft()
+ lockToLandscapeRight() 
+ unlockAllOrientations() // this unlocks any previous locks to all Orientations
+ getOrientation((err, orientation) => {}) // `getInitialOrientation` returns directly because its a constant set at the
+ getSpecificOrientation((err, specificOrientation) => {})
```

# 3. Kết luận
Trên đây là một vài tìm hiểu của mình về vấn đề điều chỉnh view screen trong React Native. Mỗi cách mình nêu trên sẽ có những ưu, nhược nhất định: 

Cách 1: nhẹ nhàng, không dùng tới thư viện, dễ dùng. Tuy nhiên thì với những case handle view không chuẩn, cần vài thuộc tính lock 1 màn bất kì thì sẽ phải tìm một cách khác, thay vì gọi những function có sẵn từ thư viện ở cách 2.
Và biết đâu có thể sẽ có những cách hay hơn, clear hơn.

Vì vậy, rất mong nhận được ý kiến chia sẻ, góp ý thêm của mọi người để mình cũng bổ sung được kiến thức và update được bài viết này và các bài viết sau được tốt hơn.

Xin cám ơn mọi người! <3