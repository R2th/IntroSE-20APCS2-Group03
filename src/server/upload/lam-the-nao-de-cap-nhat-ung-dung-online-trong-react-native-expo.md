![](https://images.viblo.asia/a22856d1-91d8-4376-80e6-3d2a67b302e1.jpg)

**Thế nào là cập nhật ứng dụng online?**

Đầu năm nay (2021), mình bắt tay vào làm ứng dụng bằng React Native (các bạn có thể tải nó [ở đây](https://play.google.com/store/apps/details?id=com.tronghieuit.toeicew) ủng hộ mình nha hehe :money_mouth_face:).

Vì là lần đầu làm app up store nên cần cập nhật khá nhiều, mà mỗi lần cập nhật thì phải build lại app, sau đó up lên store, chờ duyệt (cái này thì chờ duyệt khoảng 1-3 ngày), bla bla... Khi đó ứng dụng mới được cập nhật tới tay người dùng, mà còn chưa chắc người dùng có chịu chạy lên store cập nhật không, hay gặp bug lại bảo thằng này viết app như... :slightly_smiling_face:.

*Vậy làm thế nào để cập nhật ứng dụng ngay lập tức cho người dùng mà không cần thông qua store?*

Bài viết này được thực hiện trên React Native Expo bạn nào sử dụng React Native CLI có thể tham khảo các bài viết khác, nếu có thể mình sẽ viết thêm 1 bài trong tương lai nhé :hugs:.

## 1. OTA Updates Là Gì?

Nói một cách dễ hiểu [OTA Updates](https://docs.expo.io/guides/configuring-ota-updates/) cho phép bạn cập nhật trực tiếp Javascript và các dữ liệu của ứng dụng mới, mà không cần phải build lại ứng dụng và đưa lên các store, các bản publish được đưa lên CDN của Expo hoàn toàn miễn phí (mà chắc là miễn phí thật Expo có bảo thế :rofl:).

![](https://images.viblo.asia/43f2ddaa-167a-44ef-bd93-55979216974f.jpg)

Theo mặc định, Expo sẽ tự động kiểm tra các bản cập nhật khi ứng dụng của bạn được khởi chạy và sẽ cố gắng tải phiên bản mới nhất. Nếu có bản cập nhật mới, Expo sẽ cố gắng tải xuống trước khi khởi chạy.

Điểm hạn chế của cập nhật kiểu này này là bạn không thể thay đổi **icon** hay **tên ứng dụng**,.... Ngoài những cái đó, các bạn có thể đọc các hạn chế của OTA Updates [tại đây](https://docs.expo.io/workflow/publishing/).

![](https://images.viblo.asia/94444235-fe14-426f-9bfa-e19ce5998436.jpg)

## 2. Cài Đặt OTA Updates Thế Nào?

Theo mặc định, chức năng này được tích hợp sẵn vào ứng dụng, bạn không cần phải làm gì cả, ứng dụng sẽ được cập nhật mỗi lần build ứng dụng.

> Để hủy toàn toàn chức năng tự động cập nhật này, bạn đọc [ở đây](https://docs.expo.io/guides/configuring-ota-updates/#disabling-updates) nha. Sau khi hủy, chỉ có up store mới cập nhật được ứng dụng.

Theo mặc định thì là thế, còn bạn nào muốn thông báo kiểu, *"ứng dụng này đang cập nhật, bạn đợi tí xíu nha"* thì phải custom lại nó một tí. Tài liệu gốc về custom update bạn có thể đọc [ở đây](https://docs.expo.io/guides/configuring-ota-updates/#manual-updates).

Cách custom cũng dễ thôi, bạn chỉ cần thêm một trường thế này trong `*app.json* (nằm ở thư mục gốc của Expo).

```json
{
    /* ... */
    "updates": {
          "checkAutomatically": "ON_ERROR_RECOVERY",
    },
}
```

Sau đó các bạn cài thêm *expo-updates* bằng cách gõ `npm install expo-updates`, sau đó thêm mấy dòng này vào ứng dụng để em nó kiểm tra và cập nhật.

```js
import * as Updates from 'expo-updates';

try {
  const update = await Updates.checkForUpdateAsync();
  if (update.isAvailable) {
    await Updates.fetchUpdateAsync();
    // ... thông báo cho người dùng về bản cập nhật ...
    await Updates.reloadAsync();
  }
} catch (e) {
  // xử lí lỗi.
  // thường thì sẽ vào đây khi ứng dụng không thể kết nối đến internet.
}
```

## 3. Cập Nhật Ứng Dụng Lên Release Channel

Ok, khi bạn build 1 ứng dụng bằng câu lệnh `expo build`, mặc định release channel (kênh phát hành) của bạn là `default`, nhưng nếu bạn muốn cập nhật cho từng ứng dụng thì sao? Ví dụ như bạn cần một ứng dụng để test trước khi công bố cho người dùng.

Để tạo một ứng dụng kèm release channel bạn dùng những câu lệnh sau:

```bash
$ expo build:ios --release-channel <your-channel>
$ expo build:android --release-channel <your-channel>
```

Bạn cũng có thể publish ứng dụng lên những release channel riêng:

```bash
$ expo publish --release-channel <your-channel>
```

Ví dụ mình có 2 release channel `staging` (dùng để test) và `production` (dùng để đưa lên store), mình có thể cấu hình `package.json` scripts như sau:

```json
{
    /* ... */
    "scripts": {
        /* ... */
        "build:production": "expo build:android --release-channel production",
        "build:staging": "expo build:android --release-channel staging",
        "publish:production": "expo publish --release-channel production",
        "publish:staging": "expo publish --release-channel staging"
  },
}
```

Để publish cho máy test mình gõ `npm run publish:staging` sau khi test xong thấy ok, mình có thể publish cho người dùng với câu lệnh `npm run publish:production`.

> Mặc định khi build ứng dụng sẽ publish cập nhật cho những người dùng đã cài đặt trước đó. Để build ứng dụng mà không publish cập nhật cho người dùng hiện tại bạn thêm tag `--no-publish`.

## 4. Kết Thúc

Thế là qua bài viết này, bạn có thể thêm một option cập nhật chuyên nghiệp hơn cho ứng dụng của mình. Nếu thấy hay, hãy cho mình 1 vote nha :hugs:, có gì sai sót mong các bạn bình luận phía dưới đóng góp hehe.

Các nguồn tham khảo:
1. https://docs.expo.io/workflow/publishing/
2. https://docs.expo.io/versions/latest/sdk/updates/
3. https://docs.expo.io/guides/configuring-ota-updates/
4. https://docs.expo.io/versions/latest/sdk/updates/
5. https://docs.expo.io/distribution/release-channels/