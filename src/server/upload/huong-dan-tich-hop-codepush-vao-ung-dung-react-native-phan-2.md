CodePush là một dịch vụ đám mây cho phép các developer Cordova và React Native deploy các bản cập nhật ứng dụng trực tiếp trên các thiết bị của người dùng. Chỉ với một vài bước đơn giản, bạn có thể thay đổi các cập nhật trong ứng dụng của mình và thay đổi ngay trên các thiết bị iPhone của người dùng. Tham khảo [Phần 1](https://viblo.asia/p/huong-dan-tich-hop-codepush-vao-ung-dung-react-native-phan-1-QpmleeQolrd) về cách tích hợp CodePush vào Android. Ở bài viết này sẽ trình bày riêng về cách tích hợp CodePush vào các ứng dụng iOS.

### 1. Tạo ứng dụng trên App Center

**Bước 1:** Hãy chắc chắn rằng ứng dụng của bạn đã được publish trên App Store.

**Bước 2:** Mở `appcenter.ms` và click vào **Add New App**

**Bước 3:** Nhập tên của ứng dụng rồi chuyển đến phần tên OS. Chọn vào iOS và **React Native** platform. Click **Add New App** sẽ hiển thị hình như bên dưới

![](https://images.viblo.asia/71c3d7e3-a7d3-44f2-b249-9886743d5d73.jpeg)

**Bước 4:** Vì đã cài đặt appcenter-analytics và appcenter-crashes ở Phần 1 cho nên chúng ta chỉ cần thực hiện bước 2 trong hình

![](https://images.viblo.asia/56d58399-3aee-4039-a6ab-b99995dc265d.jpeg)

**Bước 5:** Đi tới **Distribute** lựa chọn mục **CodePush**

**Bước 6:** Tiếp theo nhấn chọn **Create Standard Deployments**

![](https://images.viblo.asia/db43ab56-7f61-4f21-8e8f-ba3178f8d1ad.jpeg)

**Bước 7:** Trên màn hình tiếp theo chọn vào **Setting icon** bên trên góc phải bạn có thể thay đổi môi trường thành Production

![](https://images.viblo.asia/647d4da8-f45a-4dc1-970e-8e197bbe2575.jpeg)

**Bước 8:** Các key dành cho Production và Staging sẽ được hiển thị khi click vào Setting icon. Copy cái này để dùng cho Bước 12

### 2. Cài đặt và tích hợp React Native CodePush

**Bước 9:** Coi như bạn đã cài đặt react-native-codepush rồi. Còn nếu chưa thì bạn có thể cài đặt ở [đây](https://www.npmjs.com/package/react-native-code-push)

**Bước 10:** Tiếp theo, tích hợp `react-native-codepush` vào iOS app theo hướng dẫn từ [link](https://github.com/microsoft/react-native-code-push/blob/HEAD/docs/setup-ios.md) này

**Bước 11:** Trong link trên bạn sẽ gặp cái này:

![](https://images.viblo.asia/4e630ff7-43db-47a9-b521-0f3e8f9e6262.jpeg)

**Bước 12:** Bạn còn nhớ key đã copy được ở Bước 8 chứ? Nó được dùng để hoàn tất quá trình tích hợp CodePush

**Bước 13:** Sau khi hoàn thành các bước ở trên bạn có thể thay đổi `App.js` thành ứng dụng React Native

### Kết nối App Center tới App Store

**Bước 14:** Trong **App Center console** chọn **Stores** ở dưới mục **Distribute** rồi click vào **Connect to Store**

![](https://images.viblo.asia/467e93ad-6b63-4af5-9623-b3df27fa1b46.jpeg)

**Bước 15:** Chọn **App Store Connect** như bên dưới

![](https://images.viblo.asia/192d9094-6144-45db-821e-7825a38eb156.jpeg)

**Bước 16:** Bạn sẽ thấy danh sách ứng dụng iOS kết nối với tài khoản Apple developer của bạn. Chọn ứng dụng được yêu cầu sẽ như hình bên dưới

![](https://images.viblo.asia/4909b26c-6470-4ab2-8dc0-2d5f91333f74.jpeg)

**Bước 17:** Chọn **Assign** thì có thể sẽ gặp lỗi như sau:

![](https://images.viblo.asia/219407e7-4be7-4a12-ae76-3aeb278d54f8.jpeg)

**Bước 18:** Để giải quyết lỗi này thì bạn cần tạo một app-specific password từ tài khoản Apple developer, nó sẽ như hình sau:

![](https://images.viblo.asia/a5c0f346-67ba-4750-9dc2-1e6ff9b2bd3e.jpeg)

**Bước 19:** Copy app-specific password đó và dán vào **App Center** 

![](https://images.viblo.asia/861d2b91-cc07-4e1a-9d25-d316038481f8.jpeg)

**Bước 20:** Click chọn **Stores** bên dưới **Distribute** và chọn Production sau đó click **Public to App Store**

![](https://images.viblo.asia/87693ec1-1e40-450c-a146-b9eef0936cb6.jpeg)

**Bước 21:** Bạn cần tạo một IPA file từ Xcode và upload nó ở đây

![](https://images.viblo.asia/9c071e84-6d2d-423b-b8f0-41da7bc301e8.jpeg)

**Bước 22:** Sau khi điền release note thì bước cuối cùng là click **Publish**

![](https://images.viblo.asia/17c18673-30f9-4fcd-8d84-01143989b26f.jpeg)

**Bước 23:** Chúc mừng vậy là bạn đã hoàn thành việc tích hợp **App Center** và **CodePush** vào ứng dụng iOS rồi. Kết quả sẽ như hình bên dưới

![](https://images.viblo.asia/413a3056-590b-4356-82f6-c96e65db8234.jpeg)

### Kết luận

Sau khi hoàn thành tất cả các bước bên trên, Apple sẽ nhận được quyền review ứng dụng của bạn (dưới dạng bản cập nhật) điều này thường mất khoảng vài giờ đồng hồ. Sau khi được chấp thuận, bạn có thể thay đổi bên trong ứng dụng của mình và chạy lệnh được hướng dẫn trong bước 4 hình bên dưới, khi chạy xong những thay đổi của bạn sẽ được đưa tới người dùng trong vòng vài phút.

![](https://images.viblo.asia/53504648-c0e2-4e33-9bfb-25733ad3181e.jpeg)

Nếu bạn muốn release một bản cập nhật ứng dụng thì đừng quên thêm flag `-m` như code dưới đây để nó hoạt động đúng nhé

```
appcenter codepush release-react -a <YourName>/<AppName> -d Production -m --description '<Description>'
```

Hi vọng bạn thấy bài viết thú vị!


Bài viết được dịch từ: https://techblog.geekyants.com/a-guide-to-integrating-codepush-to-your-react-native-app-part-2