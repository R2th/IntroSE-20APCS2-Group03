![](https://images.viblo.asia/bd08a948-d874-455b-bbf4-c21bb758d726.png)

React Native là một framework để phát triển ứng dụng mobile với JavaScript và gần giống với Reactjs. Nó sử dụng các thành phần UI native . Nếu bạn đã quen với Reactjs thì Reactjs sử dụng virtual DOM . Khi 1 phần tử thay đổi , thay đổi đó được phản ánh trên real DOM bởi Virtual DOM sử dụng một nude tương ứng với mỗi phần tử. Tuy nhiên, trong React Native không có DOM, thay vào đó là các Native Components mà được cung cấp bởi Android hoặc IOS . 

React Native có một instance của [JavaScriptCore](https://facebook.github.io/react-native/docs/javascript-environment.html)  để thực thi code JS khi ứng dụng start . React Native sử dụng RCTBridgeModule để tạo kết nối giữa code native và code JavaScript . Giả sử rằng bạn đã làm nhiều với React Native , bạn có thể gặp phải việc sử dụng SDK của bên thứ ba cho một nền tảng di động cụ thể thì cầu nối này sẽ rất hữu ích .

## **Sự khác nhau giữa React Native và Reactjs**

React Native có các gói riêng của nó xung quanh các native components và không sử dụng phần tử HTML . Ví dụ , *<View>* nó tương tự như thẻ <div> trong HTML . Đây là điểm khác biệt chính giữa React Native và Reactjs . Điều này cũng có nghĩa là bạn không thể sử dụng lại các thư viện để hiển thị HTML có sẵn cho Reactjs . Nó có các mô-đun điều hướng riêng
    
## **Môi trường phát triển cho React Native**

Đây là những thứ bắt buộc để setup trên môi trường local và further, để phát triển bất kỳ kiểu app nào sử dụng nó trên máy của bạn. 
Điều kiển bắt buộc :

Lưu ý: Lưu ý rằng bạn phải có phiên bản Node.js> = 4.0 để tiếp tục.

Để thiết lập Native SDK  cho các nền tảng cụ thể: 

* iOS (cài đặt / có Xcode, nó hoàn toàn miễn phí và có thể được cài đặt trước)
* Android (Mình khuyên bạn nên làm theo hướng dẫn tại [đây](https://facebook.github.io/react-native/docs/getting-started.html))

Bước cuối cùng là cài đặt React Native CLI bằng cách sử dụng lệnh này:

> npm install -g react-native-cli

Các hướng dẫn trên sẽ làm việc ổn nếu bạn cần build code native trong ứng dụng của bạn hoặc muốn tích hợp React Native vào một ứng dụng đã có sẵn. Nếu bạn muốn tạo nhanh chóng mẫu ứng dụng bạn có thể sử dụng module  *[Create React Native App](https://facebook.github.io/react-native/docs/getting-started.html)* rất giống với Create React App. Để *Create React Native App*, bạn không cần phải cài đặt các dependencies trên (tất nhiên bạn cần Node.js cho các module npm) và các nền tảng SDK cụ thể . Facebook giới thiệu sử dụng [Expo](https://expo.io/) client trên điện thoại của bạn để xem ứng dụng hoạt động. Trong bài viết này mình sẽ sử dụng react-native-cli cho ngắn gọn .

## **Hello World với React Native**
Để tạo một ứng dụng, hãy sử dụng giao diện command line React Native mà chúng ta vừa cài đặt ở bước trước.

```
react-native init HelloWorld

cd HelloWorld
```

Nếu bạn vào bên trong thư mục để xem cấu trúc , bạn sẽ thấy cấu trúc như sau : 
![](https://images.viblo.asia/9170ad8b-3480-4b0d-88b5-e1b7f0127835.png)

Hãy thử chạy ứng dụng trước khi thực hiện bất kỳ thay đổi nào. Mình đang sử dụng mac, nên mình sẽ gõ lệnh sau :

> react-native run-ios

Để chạy cùng một ứng dụng trong Emulator hoặc device trên Android (nếu được kết nối), bạn có thể sử dụng lệnh:

> react-native run-android

Vì bạn đang chạy 1 số lệnh trên cho lần đầu tiên, phải mất vài phút để ứng dụng hiển thị trong emulator. Đừng lo lắng, nếu mọi thứ chạy thành công, nó sẽ hiển thị như sau : 
![](https://images.viblo.asia/fad4501e-98cf-4679-ba5b-f0edc071f1b4.png)

Code bạn thấy bên trên đang chạy có sẵn trong App.js:

![](https://images.viblo.asia/98d0b47d-943c-45e6-98ab-57008954d615.png)

Nếu bạn đã quen với Reactjs, bạn có thể dễ dàng hiểu được đoạn code này. <View> nó giống như div và <Text> nó giống như thẻ <p> trong HTML 
    
Bạn sẽ nhận được thông báo với message thành công trong một cửa sổ terminal mới . Metro Bundler (được phát triển bởi Facebook) sẽ chạy cho đến khi ứng dụng đóng lại.

![](https://images.viblo.asia/d1c0ae60-394a-4156-9880-2d8e671cfdeb.png)

![](https://images.viblo.asia/77f23f68-589f-414f-a99c-c8dd59cec530.png)
File để render thành phàn App này là index.js trong thư mục gốc . Bạn sẽ thấy đoạn code sau :

![](https://images.viblo.asia/b23c7924-9202-43e8-a430-c42a7c88f684.png)

Bạn có thấy điểm gì khác ko ? Không có *react-dom* bới vì không có DOM trong React Native. AppRegistery là điểm bắt đầu để chạy ứng dụng React Native.  Thành phần của app hoặc bất kỳ thành phần nào khác trong ứng dụng phải đăng ký bằng cách sử dụng AppRegistry.registerComponent sao cho hệ thống native có thể load bundle của app và chạy ứng dụng bằng cách khởi động AppRegistry.runApplication.

Bạn có thể tìm hiểu sâu hơn về AppRegistery tại [đây](https://facebook.github.io/react-native/docs/appregistry.html) . 

Vậy là bạn đã hoàn thành bước setup đầu tiền cho ứng dụng React Native . 
Cảm ơn bạn đã đọc bài viết, hẹn gặp lại trong bài viết tới 
Thanks for watching <3.  





Bài viết được tham khảo trên trang : https://hackernoon.com/react-native-how-to-setup-your-first-app-a36c450a8a2f