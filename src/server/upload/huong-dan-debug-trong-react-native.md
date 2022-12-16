Debug là kỹ thuật không thể thiếu được trong quá trình lập trình của mỗi lập trình viên. Bạn đã bao giờ code một project mà không debug lần nào chưa? nếu có chắc đó là chương trình kinh điển của mọi thời đại("Hello world")

Trong một số ngôn ngữ lập trình không support việc debug ngay trên IDE vì thế việc kiểm tra logic, data của bạn sẽ gặp nhiều khó khăn và bất lợi và `react native` là một trong số những ngôn ngữ như thế.

Vì thế hôm nay mình sẽ hướng dẫn các bạn cách debug trên `reac native` sao cho thuận tiện nhất có thể
### Remote JS Debugging


-----

Đây là cách debug đơn giản, và cũng đã được giới thiệu ngay trên trang chủ của `react-native` rồi, mình sẽ nhắc lại 1 chút để các bạn nắm được.

Để bắt đầu bạn cần mở được developer menu của devices nên:

> You can access the developer menu by shaking your device or by selecting "Shake Gesture" inside the Hardware menu in the iOS Simulator. You can also use the ⌘D keyboard shortcut when your app is running in the iOS Simulator, or ⌘M when running in an Android emulator on Mac OS and Ctrl+M on Windows and Linux. Alternatively for Android, you can run the command adb shell input keyevent 82 to open the dev menu (82 being the Menu key code).
> 
Trên đây là hướng chính thức của facebook để mở developer menu. Sau khi thực hiện nó sẽ hiển thị giao diện như sau

![](https://images.viblo.asia/016a5606-e9dd-4cef-8a7c-2d98f589085b.png)

Bạn chọn vào `Debug JS Remotely` để bắt đầu

Tiếp theo các bạn tạo component `App` như sau
```
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
export default class App extends Component {
  componentDidMount() {
    let a = 3
    let b = 2
    a = a + b
    a = a * b
    a = a /2
    console.log('Gia tri cua a la: ', a);
    
  }
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}
```

bạn có thể thấy trong `componentDidMount` đang tính toán để thay đổi giá trị của biến `a` và giá trị của nó là bao nhiêu thì chúng ta phải chạy chương trình mới biết được
Và bây giờ chạy nào

Bạn truy cập đường dẫn để xem kết quả debug nhé http://localhost:8081/debugger-ui/

![](https://images.viblo.asia/220016e9-4326-4c62-961b-e350c775501a.png)

Như các bạn thấy `console.log('Gia tri cua a la: ', a);` được biên dịch và in giá trị ra màn hình.

### Sử dụng Debug Worker của Browser


-----

Với cách debug ở trên chắc hẳn nhiều người đã biết đến. Tuy nhiên nếu giờ tôi muốn biết được chi tiết giá trị của từng biến trong 1 hàm thì chẳng lẽ tôi phải đặt log cho từng biến. Nếu phải làm như thế thì đó là 1 giải pháp khá tồi.

Để việc debug của bạn giải quyết được vấn đề tôi đề cập ở trên thì bạn có thể sử dụng Debug worker. cách thực hiện như sau:

Vẫn trên cửa sổ debug trên bạn chọn vào tab `source-> debuggerWorker.js->localhost:xxxx-> File mà bạn muốn debug`

![](https://images.viblo.asia/b0a22005-ad52-4985-b9e3-98ff853be0a7.png)


Bây giờ bạn đã thấy code của bạn rồi và tiếp tục đặt các điểm `break point` vào các vị trí mà bạn muốn kiểm tra

![](https://images.viblo.asia/1185f978-ff71-4e6a-8287-ce4139291071.png)

Khi đặt break point chương trình sẽ dừng biên dịch tại câu lệch mà bạn mong muốn để xem chi tiết giá trị của chúng

![](https://images.viblo.asia/a89bdd38-d8ec-4a8d-b798-c57103462c41.png)

ở vùng khoanh đỏ là các nút điều khiển việc nhẩy break point

- Mũi tên màu xanh là kết thúc debug
- Mũi tên vòng cung là nhẩy vào hàm con
- Mũi tên đi xuống là biên dịch đến dòng tiếp theo

### Kết Luận


-----
Như thế chúng ta đã có thể debug ngay trên trình duyệt browser cho `react native`, hi vọng có thể giúp được cho các bạn