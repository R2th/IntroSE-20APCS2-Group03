Xin chào tất cả các bạn, 

Hẳn những bạn đang làm react native trước đây đều đã từng code android hay ios, với giao diện như dưới chắc chắn sẽ khá quen thuộc với các bạn. Rất rất nhiều ứng dụng đã được ra đời với giao diện như kiểu này

![](https://images.viblo.asia/4ce48b53-0ee9-43a9-9170-12ec5af4d4fd.gif)

Vậy trên react native bạn sẽ làm như thế nào để đuọc một ứng dụng giống như thế, vừa nhanh, đẹp. Tôi xin phép giới thiệu cho các bạn một thư viện hỗ trợ cho các bạn để làm ứng dụng kiểu như thế này đó là: native-base. Thư viện này được tạo ra bởi 1 nhóm React Loving tại Geekyants.com.

Sau đây tôi sẽ hướng dẫn bạn cách sử dụng thư viện này.

- Cài đặt:

    `npm install native-base --save`
    
    sau khi cài bạn chạy lệnh sau để link đến các thư viện
    
    `react-native link`
    
- Cài đặt với CRNA:
    
    Đầu tiên bạn cần tạo một ứng dụng react native sử dụng CRNA cli.
    CRNA giúp bạn tạo ứng dụng React Native mà không phải build config. có thể tạo một React App hoạt động trên macOS, Windows và Linux.
    Bạn có thể tham khảo thêm về CRAN tại [đây](https://github.com/react-community/create-react-native-app)
    cài đặt NativeBase
    
    `npm install native-base --save`
    
    cài đặt @expo/vector-icons
    
    `npm install @expo/vector-icons --save`
    
- Chú ý:
    NativeBase sử dựng font custom nên bạn có thể sử dụng function loadAsync. ví dụ: 
    
>     async componentWillMount() {
>       await Expo.Font.loadAsync({
>         'Roboto': require('native-base/Fonts/Roboto.ttf'),
>         'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
>         'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
>       });
      
 
- Cài đặt với ignite-native-base-boilerplate:

    Đầu tiên bạn chạy lệnh
    
    `ignite new appname --boilerplate native-base-boilerplate`
     
     sau đó di chuyển vào location app:
     
     `cd appname`
     
     Chạy trên ios bạn sẽ dùng lệnh:
     
     `react-native run-ios`
     
     và trên android:
     
     `react-native run-android`
     
- Components:
    
    NativeBase được tạo ra từ việc xây dựng một các hiệu qủa các block và được giới thiệu như là các component. Các Components được xây dựng trong nền tảng React Native thuần túy cùng với một số chức năng JavaScript với tập hợp các thuộc tính tùy chỉnh phong phú. Các Components này cho phép bạn nhanh chóng xây dựng giao diện hoàn hảo.
    
    
    Cảm ơn các bạn đã tham khảo bài viết. Chúc các bạn ứng dụng hiệu quả vào các app của mình. 
    
    bài viết được dịch từ [Native base](https://github.com/GeekyAnts/NativeBase#readme)