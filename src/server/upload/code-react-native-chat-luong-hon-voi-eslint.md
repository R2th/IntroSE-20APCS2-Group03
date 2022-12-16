![](https://images.viblo.asia/ca43c028-c101-4fc0-9430-a3c49177db7e.png)

Để code React Native không quá khắt khe về việc lựa chọn IDE hay Editor và rất nhiều lập trình viên lựa chọn Editor vì nó gọn nhẹ, khởi chạy rất nhanh không tốn tài nguyên hệ thống. Trên editor hạn chế việc hỗ trợ kiểm soát lỗi trong quá trình code, check style hay coding convention (đây là điều bắt buộc với những dự án lớn). Vậy sẽ phải làm gì để chất lượng code của bạn viết ra luôn được đảm bảo và không phải quá mệt mỏi check lại hàng nghìn line code thay đổi trong mỗi commit. Thay vì thế bạn sẽ có thời gian nhiều hơn chăm chút về mặt UI, logic và optimize hiệu năng...

### 1. Lựa chọn ESlint vì sao?

ESlint hoạt động trên Editor như một plugin, đây là một chương trình cho phép kiểm tra real-time phần code bạn viết ra có đảm bảo chất lượng và quy chuẩn của Team hay tổ chức đã quy định ngay từ đầu hay không. 
Ngoài ra nó sẽ phát hiện những vấn đề tiềm ẩn trong code, đặc biệt nó hỗ trợ **ES6** (ECMAScript 6) và **JSX**

Mình sẽ giải thích thêm về ES6 để các bạn mới có thêm thông tin nhé:

ES6 hay còn gọi **ECMAScript 6** được chính thức ra mắt vào năm 2015, đây là một tập hợp các kỹ thuật nâng cao của Javascript do hiệp hội các nhà sản xuất máy tình Châu Âu đề xuất làm tiêu chuẩn của ngôn ngữ Javascript. Bạn cũng đã biết React Native dựa trên ngôn ngữ chính là Javascript kết hợp với React vì thế mà chúng ta tuân thủ theo quy chuẩn chung để hạn chế tối đa các lỗi tiềm ẩn và tất nhiên code của bạn sẽ chuyên nghiệp hơn rồi. :blush:

**JSX** mình sẽ đề cập một cách ngắn gọn để bạn mới có thể nắm bắt nội dung của cả bài viết được dễ dàng hơn nha.

`App.js`

```
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    const pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Image source={pic} style={{ width: 193, height: 110 }} />
      </View>
    );
  }
}

```

Khi nhìn vào đoạn mã dùng các component như View, Text, Image ở trên bạn sẽ thấy các thẻ XML đã được nhúng vào trong code Javascript để thiết kế giao diện, cho phép hiển thị nội dung lên mobile (Android, iOS) có phần đặc biệt phải không nào? Và đó chính là JSX ( JavaScript XML) một loại cú pháp mở rộng dành cho ngôn ngữ JavaScript viết theo kiểu XML. Ngắn gọn hơn là bạn sử dụng các thẻ XML ngay trong Javascript. Một sự kết hợp hoàn hảo để xây dựng lên ứng dụng đa nền tảng.

![](https://images.viblo.asia/2a6f8cfc-c829-481f-a20f-6ee2e9e38648.png)

Vậy là chúng ta đã biết ESlint phạm vi hỗ trợ của nó có độ phủ lớn như thế nào rồi và trong quá trình sử dụng mình cảm nhận được một số lợi ích khác nữa. Nếu mà ai dùng rồi có thể bổ xung thêm vào comment dưới bài viết chia sẻ cho mình nha:

**- Tiết kiệm thời gian**

**- Code chuyên nghiệp hơn**

**- Dễ tích hợp và sử dụng**

**- Ngăn ngừa code xấu, bug phát sinh sau khi release**


### 2. Một số coding convention thường gặp

Phần này chắc hẳn anh em Native không còn xa lạ nữa, nhưng đó là ở ngôn ngữ Android và iOS thôi còn với React Native thì convention này sẽ ra sao? 

> Sau ký tự cuối cùng vẫn còn *space*
> 
> Dùng *let* và *const* không có line space
> 
> Không nên dùng => mà phải dùng *function* 
> 
> Không dùng *let* mà *var* , *const* ở đây không hợp lý cần sửa là *let* 
> 
> ...
> 
Qua ví dụ như vậy các bạn sẽ hình dung thêm về cách bắt lỗi coding convention của Javascript rồi, bây giờ chúng ta sẽ đến phần cài đặt ESlint vào Atom và chạy thử project xem nó hoạt động như nào nhé!

### 3. Cài đặt ESlint vào Atom

Mình dùng Atom còn có bạn dùng Sublime Text hay Visual Code thì cũng làm gần tương tự nhé hoặc bài viết sau mình sẽ làm về cách cài đặt trên 2 editor này.

Trước tiên các bạn vào mục Install Package trên Atom (hình ảnh):

![](https://images.viblo.asia/b92ea7a8-bbfe-455a-9519-5284dfe8e132.png)

Các bạn gõ : *eslint* >> chọn *linter-eslint* (version mới nhất hiện tại là : 8.5.5) >> *Install* 

Tiếp theo các bạn cài đặt thêm plugin *linter* (version mới nhất : 2.3.0) nó là base linter rất hữu dụng

![](https://images.viblo.asia/360c2339-57f3-4c75-89f9-1bc7bfcdb8b6.png)

**Cài đặt ESlint thông qua npm**

Bước làm ở trên bạn đã thêm plugin cho Atom rồi bây giờ bạn cần cài đăt nó cho project của mình và cấu hình config cơ bản. Hai việc làm này là khác nhau các bạn nhé, ngày trước lúc mình mới cài cứ ngỡ install nó trong Atom là xong luôn rồi, đến lúc gì code lỗi nó cũng chẳng báo gì "Atom vẫn im lặng" một cách lạnh lùng. :laughing:

Bạn mở Terminal lên và vào root project : `npm install eslint-config-rallycoding --save-dev`

Tiếp đến vào Atom, tạo 1 file mới nằm ở root project : *.eslintrc*

Thêm vào dòng config sau:

```
{
  "extends": "rallycoding",
  "rules": {
    "arrow-body-style": 0
    }
}
```

Giờ quay trở lại project ban đầu của bạn, mở thử vài file lên và quan sát kết quả nhé.

![](https://images.viblo.asia/2d2b0bf7-8858-4122-ac39-4af3e5886205.png)

*Ví dụ (hình ảnh):* Nó đang báo lỗi  **A space is required after '{' **

Tại dòng : `<Image source={pic} style={{width: 193, height: 110 }} />`

Bạn có thể fix nhanh bằng việc click luôn vào button FIX hoặc đọc document để sửa lỗi bằng việc click vào button tại cuối gợi ý.

Kết quả sau khi sửa đúng: `<Image source={pic} style={{ width: 193, height: 110 }} />`

**Mẹo:**

Check convention của 1 file hoặc component bất kỳ bằng câu lệnh sau: `eslint path-source-code`

Bạn có thể tự sửa hoặc dùng thêm option *--fix* để Eslint nó tự fix cho mình. Tất nhiên sẽ lựa chọn cách thêm *--fix* để tiết kiệm thời gian chứ :D 

Vậy là từ bây giờ anh em code thoải mái mọi việc check convention cứ để ESlint tự động thông báo cho bạn. 

### 4. Tổng kết 

Với những thông tin ở trên mong rằng các bạn đã có thêm cho mình công cụ hữu ích giúp chất lượng code React Native của mình cải thiện hơn, từng commit về sau không phải là lỗi ám ảnh vì việc sửa convention thông báo ngút ngàn nữa. Anh em vừa code vừa suy tư về một bầu trời mộng mơ nào đó, ngắm nghía thêm ai đó và hạnh phúc vì cách coding của mình giờ đây đang thông thoáng hơn sưa. =))

Bài viết của mình có điều gì khó hiểu bạn hãy để lại comment để được giải đáp nhé, hẹn gặp các bạn trong bài viết tới.