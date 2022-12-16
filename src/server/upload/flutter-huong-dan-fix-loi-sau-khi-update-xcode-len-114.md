![](https://images.viblo.asia/6c4cf9d5-18fa-409e-bf76-4c4f32546ef8.jpg)

Bài viết này dành cho các bạn hiện tại vẫn còn đang ở nhánh stable của Flutter(Channel stable, v1.12.13+hotfix.9 hoặc nhỏ hơn) hoặc khi build App bạn nhận được error như dưới đây:

> Building for iOS, but the linked and embedded framework ‘App.framework’ was built for iOS Simulator.
> 


Hoặc:

> Building for iOS Simulator, but the linked and embedded framework ‘App.framework’ was built for iOS.
> 

Để fix được lỗi trên, các bạn follow theo hướng dẫn của mình từng bước phía dưới nhé:

1. Mở file ***ios/Runner.xcworkspace*** trong project của Flutter của bạn
1. Bạn nhìn qua bên **Navigation Pane** của XCode, bên trong thư mục Flutter bạn sẽ thấy **App.framework** và **Flutter.framework**.
1. Nhẹ nhàng remove chúng bằng cách Select -> chuột phải -> Delete.

![](https://images.viblo.asia/444a954f-e0e1-4f07-8885-abe72bfe2f2d.jpg)

Sau khi remove xong, các bạn chọn **Target Runner -> Build Phases > Link Binary With Libraries** và **Embed Frameworks** để đảm bảo rằng không còn xuất hiện 2 file **App.framework** và **Flutter.framework** nữa.

![](https://images.viblo.asia/60df052b-c8ee-40a0-b735-3ebf6cd89896.jpg)

Vẫn trong **Build Phases** đó, bạn chọn tiếp **Thin Binary** và thêm đoạn script dưới đây:
```
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" embed 
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" thin
```

![](https://images.viblo.asia/147eb269-9e19-4991-bd10-ce74fff52592.jpg)

Và cuối cùng, các bạn chọn **Target Runner -> Other Linker Flags**, thêm các dòng sau nếu chưa có **$(inherited) -framework Flutter**

![](https://images.viblo.asia/8cb64aad-fa4e-49bb-98da-abdac4ab66f3.jpg)

Cuối cùng, nếu các bạn vẫn chưa hiểu các thành phần trong XCode, mình sẽ bonus cho các bạn 1 tấm hình tổng hợp các thành phần trong XCode mà chúng mình thường sử dụng mà không để ý đến.

![](https://images.viblo.asia/58d76c6a-0136-4b0f-86e6-b8d7719312d4.jpg)

**Lưu ý**: Flutter v1.15.3 và các version sau đó đã tự động migrate vào project trong XCode của bạn.

Nếu bạn muốn xem được những bài viết chất lượng, hay thảo luận những kiến thức, chia sẻ hiểu biết của bạn đến mọi người, hãy tham gia group của bọn mình trên [Facebook](https://www.facebook.com/groups/2753546238005745/) nhé: ^^