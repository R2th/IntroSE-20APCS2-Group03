Như chúng ta đã biết, **React-Native**  là nền tảng xây dựng ứng dụng di động **Cross-Platform** mạnh mẽ và phổ biến nhất hiện nay. **React-Native** sử dụng **Inline-style** và ứng dụng **flex-box** để phát triển giao diện, cú pháp tương tự với ngôn ngữ **CSS**.

Trong bài viết này, mình xin được giới thiệu phương pháp thêm **FontFamily** bất kỳ cũng như **FontIcons** cho ứng dụng **React-Native** trên cả hai nền tảng IOS và Android một cách nhanh chóng và đơn giản.  

Đầu tiên, chúng ta khởi tạo ứng dụng **React-Native** với **react-native-cli**
```
  react-native init native-app
```

### 1. FontFamily
Bây giờ, hãy tạo một thẻ **Text** bất kì với logic style như sau
```js
...
import { View, Text, StyleSheet } from 'react-native'
...
  render() {
    const { textStyle } = styles
    return (
      <View>
        <Text style={textStyle}>Hello</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    textStyle: {
      fontSize: 20,
      fontFamily: 'Lato'
    }
  })
...
```
'**Lato**' là một font trong thư viện **GoogleFonts**  
Khi run **app** trên 1 trong 2 nền tảng **Android** hoặc **IOS**, ta sẽ nhận được **Red Box** với **Error**:
![](https://images.viblo.asia/56dd026d-83db-4e38-952a-065a808afee8.png)

Do trong nền tảng **Mobile** không có sẵn **Font Lato**, ứng dụng sẽ báo lỗi thay vì sử dụng một font mặc định như trên **Web**. Vì vậy, chúng ta cần cài font **Lato** này vào trong ứng dụng để sử dụng.

Đầu tiên, hãy truy cập GoogleFonts và tải về bộ font **Lato** ở trên ta sẽ được thư mục với các file .tff
```
  Lato
    Lato-Black.tff
    Lato-BlackItalic.tff
    Lato-Bold.tff
    ...
```
Trong thư mục của Project, tạo đường dẫn **"assets/fonts/"** và **Copy** toàn bộ các file **.tff** ở trên vào trong thư mục vừa tạo.
Bước tiếp theo, chúng ta cần cho ReactNative biết nơi chúng ta lưu **Fonts** bằng cách thêm đoạn mã code sau vào file **package.json**
```js
{
  ...
  "rnpm": {
    "assets": [ "./assets/fonts/" ]
  }
}
```
Tiếp đó, trở lại với **Terminal** và chạy lệnh sau:
```js
  react-native link
```
**Message** nhận được sẽ là:
```
....
rnpm-install info Linking assets to ios project
rnpm-install info Linking assets to android project
rnpm-install info Assets have been successfully linked to your project
```
Kiểm tra hai file **"/ios/info.splist"** 
```
  ...
  <string>Lato-Black.ttf</string>
  <string>Lato-BlackItalic.ttf</string>
  <string>Lato-Bold.ttf</string>
  ...
```
Và trong thư mục **"/android/app./src/main/assets/fonts"** sẽ chứa toàn bộ file **.tff** ta cần thêm vào ứng dụng.
***
Xong, như vậy **Font Lato** đã được thêm thành công vào trong ứng dụng, bây giờ thì chỉ cần khởi chạy lại ứng dụng.  

### 2. FontIcons

Đối với **FontIcons**, **Lib** mạnh mẽ nhất hiện nay là [react-native-vectors-icons](https://github.com/oblador/react-native-vector-icons), sử dụng tốt trên cả 2 nền tảng và chứa rất nhiều bộ **Icons** miễn phí phổ biến nhất hiện nay:

* [Entypo](http://entypo.com/) by Daniel Bruce (411 icons)
* [EvilIcons](http://evil-icons.io/) by Alexander Madyankin & Roman Shamin (v1.8.0, 70 icons)
* [Feather](https://feathericons.com/) by Cole Bemis & Contributors (v4.7.0, 266 icons)
* [FontAwesome](https://fontawesome.com/icons?from=io) by Dave Gandy (v4.7.0, 675 icons)
* [Foundation](https://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0, 283 icons)
* [Ionicons](https://ionicframework.com/docs/ionicons/) by Ben Sperry (v3.0.0, 859 icons)
* [MaterialIcons](https://material.io/tools/icons/?style=baseline) by Google, Inc. (v3.0.1, 932 icons)
* [MaterialCommunityIcons](https://materialdesignicons.com/) by MaterialDesignIcons.com (v2.2.43, 2244 icons)
* [Octicons](https://octicons.github.com/) by Github, Inc. (v7.2.0, 176 icons)
* [Zocial](http://zocial.smcllns.com/) by Sam Collins (v1.0, 100 icons)
* [SimpleLineIcons](http://simplelineicons.com/) by Sabbir & Contributors (v2.4.1, 189 icons)

Cài đặt đơn giản với hai bước, không cần **config**
```
  npm install --save react-native-vector-icons
  react-native link
```
#### Sử dụng **Icon**
Đầu tiên ta cần lựa chọn bộ Icons mà mình muốn sử dụng
```js
import Icon from 'react-native-vector-icons/FontAwesome'
```
Sau đó sử dụng **Icon** trong phần **render**
```
  <Icon name="rocket" color="#eee" size={30} />
```
Lưu ý là ta sẽ không thể **Style** như bình thường, mà sẽ dựa vào 3 **props** là:  
* **name** (tên của **Icon**, tham khảo [Link](https://oblador.github.io/react-native-vector-icons/) sau)
* **color**
* **size** (kích thước - **pixel**).

Trên đây mình vừa trình bày cách thêm **Font** và **FontIcons** vào ứng dụng **ReactNative**. Chúc các bạn thành công.