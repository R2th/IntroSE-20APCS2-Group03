# React Native là gì?
Reat Native là 1 framework được xây dựng như 1 hệ thống cấp bậc của các UI component được viết bằng ngôn ngữ JavaScript. 

![](https://images.viblo.asia/8810ad9f-c084-4d4d-8286-02daefc6f3ea.png)

Các UI component này sẽ tương ứng với các View của 2 platform Android và iOS. Và 1 điều nữa là React Native được phát triển bởi Facebook.

# Tại sao cần React Native Framework?
Với React Native Framework, bạn có thể render giao diện của cả 2 Android và iOS.

![](https://images.viblo.asia/a2c2d06f-a621-4b3f-9530-460e42248e87.jpg)

Nó là 1 sự lựa chọn tuyệt vời với những web dev muốn chuyển qua mobile dev 1 cách nhanh chóng thông qua JavaScript. 

![](https://images.viblo.asia/877137c9-33a7-4adc-b50e-67532b2b0f7d.png)

Tập trung vào giao diện, nó làm người dùng ứng dụng có trải nghiệm mượt mà hơn. Bạn sẽ phát triển ứng dụng đơn giản, nhanh chóng và hiệu quả.

![](https://images.viblo.asia/1a3bfe07-3e50-40b5-b7f6-eaa72d602007.png)

React Native đang được rất nhiều ông lớn đang sử dụng để phát triển ứng dụng của họ như Facebook, Instagram, Skype, Airbnb, Tesla, Walmart, Baidu Mobile, Bloomberg, UberEATS Vogue. 

![](https://images.viblo.asia/2f264a81-377c-4882-8c27-31220d858732.jpg)

Có 1 thực tại đó là số người dùng iOS ít hơn số người dùng Android nhưng lại tạo ra nhiều lợi nhuận hơn nên đã khiến cho việc lựa chọn tập trung vào thị trường hay là tạo ra lợi nhuận trở nên đau đầu. Nhưng nhờ có React Native thì giữa  thị trường lớn hay lợi nhuận không còn quá trọng nữa vì React Native hỗ trợ cả 2.

![](https://images.viblo.asia/1f073271-693f-45ce-866f-795daf97952a.png)

# Cài đặt
Do mình mới chỉ cài đặt để chạy trên iOS nên mình sẽ hướng dẫn cài đặt trên iOS :D.

- Đầu tiên bạn cần cài Xcode qua AppStore.
- Tiếp đến Node và Watchman bằng Terminal:

```
brew install node
brew install watchman
```

- Tiếp đến là React Native CLI bằng Terminal:

```
npm install -g react-native-cli
```

- Sau khi đã tải xong Xcode về các bạn nên lưu ý rằng cần phải chọn version cho Command Line Tools của XCode, bằng cách vào Preferences của Xcode -> Locations:

![](https://images.viblo.asia/f993b288-fcc9-4556-bb50-58b0caa51db1.png)

Vậy là đã cài đặt xong rồi đó. Bây giờ chúng ta hãy tạo thử project đầu tiên nào, sử dụng Terminal tiếp:

```
react-native init AwesomeProject
```

Sau khi init xong, các bạn hãy di chuyển vào folder project vừa tạo, vào run app:

```
cd AwesomeProject
react-native run-ios
```

Kết quả:

![](https://images.viblo.asia/de3d9e80-a20b-4f1f-9d30-f80dbf72bf3d.png)

# Phần Kết
Vậy là mình đã giới thiệu sơ bộ và hướng dẫn các bạn cài đặt React Native.

Bài viết tham khảo:
- https://medium.com/@thinkwik/react-native-what-is-it-and-why-is-it-used-b132c3581df
- https://facebook.github.io/react-native/docs/getting-started.html

**Cảm ơn bạn đã dành thời gian để đọc bài viết này.**