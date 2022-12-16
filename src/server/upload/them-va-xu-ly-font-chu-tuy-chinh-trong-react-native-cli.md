Hi các bạn, trong bài viết này mình xin chia sẻ cách thêm và xử lí font chữ trong React Naitve CLI, còn bạn nào xài Expo có thể thêm font chữ rất dễ dàng hơn so với CLI nha <3. Các bạn có thể tham khảo cách [thêm font chữ khi sử dụng expo](https://docs.expo.io/versions/latest/sdk/font/) nha. Bạn nào sử dụng Expo để tham khảo thêm cách tùy chỉnh `fontWeight` và `fontStyle` bạn vui lòng xem phần 3 của bài viết.

Bài viết này được tham khảo từ rất nhiều nguồn do mình lục tung google lên, ở cuối bài viết mình sẽ để đường dẫn.

## 1. Tải Và Cài Đặt Font
### Đổi Tên Font
* Ở đây mình ví dụ một font rất phổ biến **[Open Sans](https://fonts.google.com/specimen/Open+Sans)**, font tuy rất đẹp nhưng chỉ có khoảng 5 styles: *Light (300), Regular (400), Semi-Bold (600), Bold (700), Extra-Bold (800)* khi tải về bạn sẽ nhận được các file như sau.

![](https://images.viblo.asia/c31e6eda-8b3d-4df3-8023-82f4f8ece9d7.jpg)

* Mình cũng tiến hành copy vào source code và đổi hết tên thành chữ thường (không in hoa) theo cú pháp: tên font _ độ đậm _ italic (nếu có) và copy vào thư mục `app/assets/fonts`.

![](https://images.viblo.asia/7624c7e2-62db-4272-8aaf-74b75b7699e4.jpg)

### Cài Đặt Font Vào Dự Án
Tiếp theo, chúng ta sẽ phải báo nơi mà chúng ta đã đặt các phông chữ.

Bài viết được hướng dẫn khi cài đặt React Native 0.64, nếu bạn ở phiên bản cũ hoặc mới hơn có thể làm theo hướng dẫn này hoặc dùng cách khác.

1. Tạo file `react-native.config.js` ở thư mục gốc của dự án, sau đó thêm như sau, nhớ tùy chỉnh đường dẫn font của bạn cho chính xác.
```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./app/assets/fonts'],
};
```

2. Chạy lệnh sau để cài đặt font chữ: `react-native link`

> Ở đây mình không khuyến khích sử dụng lệnh `react-native link`. Các bạn có thể cài đặt thư viện npm [react-native-asset](https://www.npmjs.com/package/react-native-asset) để thêm và xóa font dễ dàng nếu bạn có làm sai gì đó khi link dữ liệu vào.

Sau khi link dữ liệu thành công các bạn có thể kiểm tra tại thư mục Android: 

![](https://images.viblo.asia/709b27af-0ba4-4b74-9539-cf7ebaf265fc.jpg)

Còn đây là ở tại file `Info.plist` trên thư mục IOS:

![](https://images.viblo.asia/73a966b2-d391-4162-8c02-eec68c6d1d91.jpg)


## 2. Sử Dụng Font Như Thế Nào?

Ok ok, đây mới là phần quan trọng sử dụng thì dễ thôi, cứ viết tên font mà các bạn đã đặt là xong, ở đây mình muốn in đậm cái text nên mình sẽ cho nó như sau:

```js
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontFamily: 'opensans_bold',
    fontSize: 20,
  },
  text2: {
    color: '#000',
    fontFamily: 'opensans_bold',
    // không hoạt động, fontWeight và fontStyle không thể sử dụng
    fontWeight: '800',
    fontStyle: 'italic',
  },
  text3: {
    fontFamily: 'opensans_bold_italic',
  },
});
```

Khá bất tiện phải không nhỉ, muốn sử dụng `fontWeight` hay `fontStyle` cũng không thể vì khi sử dụng font tùy chỉnh bạn không thể sử dụng được 2 thằng này. Giải pháp tiếp theo mình sẽ hướng dẫn các bạn tùy chỉnh một Text components sử dụng loại font này nhé.


##  3. Custom Text Sử Dụng Font Custom
### Custom Text Components
Ở đây mình tạo một file mới là `StyledText.jsx` và thêm như sau:

```js
import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

/* ở font open sans chỉ có 5 styles, còn mặc định của react-native có 9 styles 
và kèm 2 styles mặc định ở đây chúng ta custom lại sao cho khớp với react-native */
const OpenSansFont = {
  normal: 'normal',
  bold: 'bold',
  '100': 'light',
  '200': 'light',
  '300': 'light',
  '400': 'normal',
  '500': 'normal',
  '600': 'semi-bold',
  '700': 'bold',
  '800': 'extra-bold',
  '900': 'extra-bold',
};

/* chuyển fontWeight và fontStyle lại ban đầu
bởi vì chúng ta sử dụng fontFamily có kèm 2 thằng này rồi */
const disableStyles = {
  fontStyle: 'normal',
  fontWeight: 'normal',
};

export function OpenSansText(props) {
  /* ở đây mình lấy giá trị fontWeight với fontStyle ra */
  const {fontWeight = '400', fontStyle} = StyleSheet.flatten(props.style || {});

  /* bây giờ mình thêm fontFamily vào với cú pháp font mình đã định trước 
  cú pháp: tên font _ độ đậm _ italic (nếu có) */
  const fontFamily = `opensans_${OpenSansFont[fontWeight]}${
    fontStyle === 'italic' ? '_italic' : ''
  }`;

  return <Text {...props} style={[props.style, {fontFamily}, disableStyles]} />;
}
```

Bạn nào sử dụng Typescript có thể tham khảo dưới đây:

```ts
import * as React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

const OpenSansFont = {
  normal: 'normal',
  bold: 'bold',
  '100': 'light',
  '200': 'light',
  '300': 'light',
  '400': 'normal',
  '500': 'normal',
  '600': 'semi-bold',
  '700': 'bold',
  '800': 'extra-bold',
  '900': 'extra-bold',
};

const disableStyles: StyleProp<TextStyle> = {
  fontStyle: 'normal',
  fontWeight: 'normal',
};

type TextProps = Text['props'];

export function OpenSansText(props: TextProps) {
  const {fontWeight = '400', fontStyle} = StyleSheet.flatten(props.style || {});

  const fontFamily = `opensans_${OpenSansFont[fontWeight]}${
    fontStyle === 'italic' ? '_italic' : ''
  }`;

  return <Text {...props} style={[props.style, {fontFamily}, disableStyles]} />;
}

```

### Sử Dụng Custom Font

Để sử dụng thì lại dễ quá rồi, chỉ cần import vào và xài như bình thường, giống như Text component của react-native thôi.

```js
import * as React from 'react';
import {OpenSansText} from './StyledText.jsx';

export function App() {
  return <OpenSansText style={styles.text} />;
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    // sử dụng bình thường luôn nha <3
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

```

## 4. Kết Thúc

Cảm ơn các bạn đã xem bài viết, cho mình 1 vote nếu các bạn thấy hay, nếu có thắc mắc hay sửa lỗi trong code các bạn bình luận ở dưới giúp mình nha.

Các nguồn tham khảo:
1. https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e
2. https://stackoverflow.com/a/65652782/9724078
3. Và rất rất nhiều nguồn khác nhau...