Chúng ta muốn phát triển một ứng dụng multiple platforms với React Native hay đã sử dụng từ lâu rồi, nhưng mình dám chắc rằng không phải lúc nào những câu lệnh hay thủ thuật hay dùng mà bạn hay dùng đều nhớ! Bài viết này mình sẽ liệt kê những thủ thuật hữu ích hay được sử dụng để bạn có thể tìm lại mỗi khi cần hoặc nếu ai đó mới tìm hiểu về React Native sẽ dễ dàng tổng hợp và ứng dụng được luôn.

Tất nhiên với các bạn đã làm với RN thành thạo rồi sẽ thấy có 1 vài câu lệnh rất đơn giản nhưng trên vị trí một ai đó đang học thì nó cũng có phần phức tạp vì khác với một số ngôn ngữ khác như Swift hay Android bạn đều có IDE hỗ trợ tất cả chỉ cần tìm tòi chút là nhớ ra ngay. Còn với RN bạn phải thực hiện nó bằng câu lệnh, đương nhiên rồi chúng ta cần phải nhớ nó thôi chứ không còn phương án khác phải không nào? Tiếp tục vào phần chính thôi các bạn ...

### 1. Lệnh khởi tạo dự án


Bạn chạy trong Terminal: `react-native init FirstProject`

**Lưu ý:** Để project của mình nằm trong folder bạn mong muốn ( dễ nhớ thì các bạn phải `cd path\name_folder\name_project` ) rồi mới chạy lệnh trên nhé. Tránh trường hợp tạo xong project rồi 2 ngày sau quay lại code ko biết mình đã để nó ở đâu =))

### 2. Build App


Chạy trong Terminal, điều này là tất nhiên rồi nên từ phần sau mình không nhắc lại điều này nữa bạn nhé :) 

Sau khi chạy dòng lệnh ở mục 1 bạn thực hiện thêm lệnh này: `cd FirstProject`
- Android :  `react-native run-android`
- iOS: `react-native run-ios`

### 3. Show danh sách device

Liệt kê danh sách thiết bị mà bạn có thể chạy ứng dụng của mình

- MAC: `xcrun simctl list devices`
- Other: `emulator -list-avds`

Ex: Pixel_2_API_24

### 4. Autolinking

Đây là 1 sự thay đổi mới từ phiên bản RN 0.60, trước đây sau khi bạn muốn thêm thư viện mới vào project bạn thường dùng command : `react-native link`

Nhưng hiện nay chúng ta sẽ dùng phương pháp mới này cho cả 2 nền tảng iOS và Android:

```
# install
yarn add react-native-webview
cd ios && pod install && cd .. # CocoaPods on iOS needs this extra step
# run
yarn react-native run-ios
yarn react-native run-android
```

### 5. Nâng cấp React Native

Từ phần trên bạn hãy kiểm tra version RN của mình bằng cách : `react-native -v`

EX: 

> react-native-cli: 2.0.1
> 
> react-native: 0.60.5


Nếu nó đã cũ rồi hãy cập nhật bản mới bằng command dưới đây: `npm install --save react-native@latest`

Tiếp theo:  `react-native upgrade`

Bạn chỉ muốn 1 package cập nhật thôi thì dùng : `npm install --save package-name@latest`

### 6. Debug 

Bạn có thể bật 1 số tính năng này bằng cách:

- Android : Ctrl + M
- iOS : Command + D 

Rồi chọn tính năng bạn muốn :

- Enabling Hot Reloading 
- Enabling Remote Debugging

![](https://images.viblo.asia/51858e50-4067-482c-9563-c0d3c7cad5a9.png)

### 7. Thủ thuật hữu ích

**a. Screen size**

```
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

Alert.alert(`Screen size: ${width} x ${height}`);
```

**b. Text Component**

**Viết hoa chữ:**

`<Text>{this.props.title.toUpperCase()}</Text>`

**Chuyển sang viết thường;**

`<Text>{this.props.title.toLowerCase()}</Text>`

**Max line:**

```
<Text numberOfLines={2}>
    Max lines are two
</Text>
```

**c. Properties**

**- Default Prop**

```
 static defaultProps = {
    title: 'Default Header'
  }
```

**- Spread Attributes**

```
render() {
  const props = {
    title: 'My Title',
    size: 20,
  };
  return <Header {...props} />;
}
```

**- Tổng hợp các giá trị của Object thành một object mới**

```
render() {
  const { title, size, ...rest } = this.props;
  return (
    <View>
      <Text style={[styles.header, { fontSize: size }]} {...rest}>
        {title.toUpperCase()}
      </Text>
    </View>
  );
}
```

Các bạn nhìn trong ví dụ thấy rất ngắn gọn và dù có viết dài lắm thì cũng không thêm code là bao, tuy nhiên ở cách làm này không phải ngắn gọn như thế đâu. Vì trường hợp ứng dụng thực tế của nó sẽ rất khác đấy.

**Ví dụ:** Thông thường mình sẽ hay dùng cách làm này khi lấy dữ liệu từ API trả về, nhiệm vụ bạn cần tổng hợp nó thành 1 object mới để truyền sang Component khác để dùng theo cách mà client bạn muốn. Vì thế mà dòng code : `const { title, size, ...rest } = this.props;`  khi bóc tách và lấy dữ liệu theo cách truyền thống sẽ rất dài đó. Rất may là RN đã hỗ trợ sẵn việc khai báo như trên rồi.

**d. UI Tips**

**- Dùng multiple styles**

```
<View style={[styles.generic, styles.specific, { color: 'blue' }]} />
```

**- Vẽ 1 hình tròn **

```
<View style={{
  width: 90,
  height: 90,
  borderRadius: 90 / 2,
  backgroundColor: '#2196F3'
}}/>
```

**- Show image theo 1 View tùy biến**

```
<View style={{
    backgroundColor: '#dddddd',
    flex: 1,
  }}>
  <Image source={{ uri: 'https://placekitten.com/g/800/600' }} style={{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }} />
</View>
```

**- Điều chỉnh vị trí của view:**

Việc đặt view vào đúng vị trí mong muốn một việc làm thiết yếu khi làm giao diện, bạn có thế ứng dụng cách làm dưới đây cho việc điều chỉnh UI của mình dễ dàng hơn

Bạn cần chú ý đến tham số của đối tượng sau : **flexDirection** Nó cho phép bạn bố trí view theo *row* và *column*

Đi cùng với đó là `justifyContent` cho phép bạn sắp xếp nội dung theo vị trí, ví dụ chi tiết ở dưới đây:

`flex-start`

![](https://images.viblo.asia/b7b13358-409f-47f4-a082-31bcbd6cee04.png)

`center`

![](https://images.viblo.asia/5ebcd5f8-3ff5-49b7-a424-d7ee417e9045.png)

`flex-end`

![](https://images.viblo.asia/889ca3ee-c6f6-4ffe-b263-35e7ee0801a7.png)

`space-around`

![](https://images.viblo.asia/746dadb1-e0f8-4da4-8e06-5bd278c606ad.png)

`space-between`

![](https://images.viblo.asia/7b1c5dc2-1de0-48e4-bcd6-226917469cba.png)

Bạn chỉ cần khai báo như sau trong container style như sau:

```
container: {
  flexDirection: 'row',
  justifyContent: 'space-between'
}
```

**Lưu ý:** Thay giá trị của `flexDirection` và `justifyContent` bằng các tham số trên các bạn nhé

- Tiếp theo bạn có thể dùng `alignItems` nếu cần căn chỉnh view theo chiều dọc

`flex-start`

![](https://images.viblo.asia/d1bebb60-4527-45d1-8363-bd726f89e0ad.png)

`center`

![](https://images.viblo.asia/4e55df8d-5af4-4d85-9011-4cc3db83367c.png)

`flex-end`

![](https://images.viblo.asia/aea07596-cb45-4be1-9ee4-d2acdf0b7d09.png)

`stretch`

Đây là trạng thái default bạn chạy thử code để biết kết quả nhé.

```
container: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end'
}
```

### 8. Tổng kết 

Trên đây là những thủ thuật cũng như câu lệnh mà chúng ta hay sử dụng và không ngoài mục đích ban đầu mình có nói, mong rằng ai đó tìm thấy sự hữu ích trong bài mình chia sẻ. Bạn nào có cách làm thú vị và thủ thuật hữu ích nào đừng ngại chia sẻ cho mình và các bạn khác được học hỏi nhé. Nếu có khó khăn trong việc áp dụng bạn cũng để lại comment mình sẽ hỗ trợ nha.