## 1. Cơ duyên gặp gỡ
 Dự án vẫn trôi nhẹ nhẹ qua những sprint. Tôi cứ ngỡ rằng lúa sắp về  đến nơi rồi. Tuần cuối cùng bỗng khách hàng yêu cầu thêm 1 app di động cho IOS. Bỏ qua những câu chửi thề, chúng tôi họp lại và nhiều ý kiến được đưa ra: 
 + "Sao khách hàng không dùng app trên trình duyệt di động ấy ?", cậu Junior said. Thật ra dự án này chúng tôi thực hiện responsive rất chuẩn, sử dụng PWA cũng là một ý kiến không tệ nhưng khách hàng nói họ sẽ trả thêm 15% hợp đồng.
 + "Có ai biết code swift không ?" , anh PM hỏi với giọng có vẽ nghiêm trọng.
 + "Anh biết React Native, cho anh 1 team, 2 tháng sau là có chạy ngon lành ngay mà !", anh Tech Lead hồ hởi nói, kèm tiếng thở phào của mọi ngươi .
 + Ngờ đâu anh PM chốt: "Dùng React Native nhưng có 2 tuần thôi !". Anh ấy hẹn chúng tôi ngày mai đưa ra giải pháp.

Cuối cùng chúng tôi quyết định nhúng ứng dụng web của mình vào [WebView](https://reactnative.dev/docs/webview) trong React Native( Cách này giống với việc nhúng thẻ iframe trong html ). Vì chỉ với cách này chúng tôi mới tận dụng được mọi giao diện, chúng tôi sẽ code ít hơn và đảm bảo tiến độ dự án. Khi release, tôi có một chút ngạc nhiên về performance không hề tệ của nó.
## 2. Các bạn tự setup các thứ để bắt đầu một dự án React Native như bình thường: 
```
 react-native init <ProjectName> && cd <ProjectName>
```
## 3. Cấp độ 1, Sử dụng [WebView](https://reactnative.dev/docs/webview) mặc định.
Thật sự rất đơn giản, chúng ta chỉ cần import thư viện từ react-native và sử dụng với hơn 5 dòng lệnh. Trong file App.js
```js
import React, { Component } from 'react';
import { WebView } from 'react-native';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://github.com/facebook/react-native'
        }}
      />
    );
  }
}

``` 
Các bạn thay đổi uri để trỏ về domain của ứng dụng web mà bạn muốn nhúng.
+ Ưu điểm của cấp độ 1 là nhanh :sweat_smile: 
+ Nhược điểm là app của bạn hoạt động giống một brower nó sẽ load source code từ server về và chạy. Bạn không có khả năng thay đổi gì tính năng của ứng dụng bằng react native.

Ta có thể  thay đổi một tý : 
```js
import React, { Component } from 'react';
import { WebView } from 'react-native';

class MyInlineWeb extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>App của tôi này !! </h1>' }}
      />
    );
  }
}

```
Tôi gọi cách này là level (1.5 - 0.75 = 0.75) 😅
+ Ưu điểm là việc khắc phục nhược điểm của level 1
+ Nhược điểm : Code html truyển vào là một string, thật sự khá là cù lần khi build code dự án thành một string.


## 3. Cấp độ 2, sử dụng [react-native-static-server](https://github.com/futurepress/react-native-static-server) .

### Bước 1: Tạo static server:
Tạo thư mục assets/www trong root. tạo file index.html
```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
    <p id="text">App của tôi này!</p>
    <div id="example"></div>
    <script type="text/javascript" src="./index.js"></script>
  </body>
</html>

```
Như một dự án frontend, chúng ta có thể code thêm 2 file style.css và index.js: 
```css
#text {
  color: pink;
}
```
```js
document.getElementById("example").innerHTML = "Code javascript vẫn chạy được !";
```
### Bước 2: Thêm đường dẫn ở Native Platform, ví dụ tôi làm trong Xcode.
+ Mớ dự án trong xcode: `ios/<ProjectName>.xcodeproj`
+ Kích chuột vào cái thư mục mẹ rồi chọn `Add Files to “<ProjectName>”` rồi trỏ về  `assets/www/` 
Kết quả :
 ![](https://images.viblo.asia/df88deeb-f67f-445e-9208-1476e85734c9.png)
### Bước 3: Code file App.js:

```js
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import StaticServer from "react-native-static-server";
import WebView from "react-native-webview";

class App extends React.Component {
  state = {
    url: null
  };
  componentDidMount() {
    this.server = new StaticServer(8080);
    this.server.start().then(url => {
      this.setState({ url });
    });
  }

  componentWillUnmount() {
    if (this.server && this.server.isRunning()) {
      this.server.stop();
    }
  }

  render() {
    if (!this.state.url) {
      return (
        <SafeAreaView>
          <Text>Đợi một tý đang chạy server</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView>
        <Text>{this.state.url}</Text>
        <View style={{ height: "100%", width: "100%" }}>
          <WebView
            style={{ flex: 1, marginBottom: 20 }}
            source={{ uri: this.state.url }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default App;

```

Thêm tý về flow:
+ Code tạo cái static server từ thư mục mặc định
+ khởi động xong thì đưa Url vào state
+ Webview hiển thị url đó.
+ Khi hủy kết nối thì sẽ tự động kill server này
  
Thật tuyệt vời, Chúng ta có thể code dự án bằng html, css, js, thậm chí code bằng react, angular rồi build vào file `assets/www/`.

## 4. Chúng tôi chọn cách nào ?

Chúng tôi chọn cách làm của level 1. Chúng tôi cố găng tối ưu responsive, bỏ những thành phần không phù hợp với app di động, build về một subdomain (ví dụ `m.domain.com`), rồi dùng webview trỏ về

Nguyên nhân lựa chọn level 1 thay vì level 2:

+ Ứng web của chung tôi đễ dàng tốt ưu cho di động.
+ Ứng dụng web đã được test và chạy ổn định.
+ Chúng tôi không nhiều kinh nghiệm làm việc với react-native và cả môi trường Xcode nên không muốn mạo hiểm.
  
 Tham khảo code tại đây: [here](https://github.com/gvanderclay/ReactNativeHTTPServer)

*Như tôi đã viết ở mục 1, tôi có chút ngạc nhiên về performance của ứng dụng, nó không hề tệ, khách hàng đánh giá tốt và lúa chúng tôi đã nhận cả rồi. Nếu của bạn không tin có thể tạo một app trỏ về trang [facebook](https://m.facebook.com/). Sau đó comment cảm nhận phía dưới nhé !*