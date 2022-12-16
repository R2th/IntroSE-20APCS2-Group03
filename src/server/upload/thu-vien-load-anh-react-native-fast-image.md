Hôm nay mình xin giới thiệu với các bạn một thư viện load ảnh cực kì tiện dụng trong React native, nó dựa trên 2 thư viện SDWebImage đối với iOS và Glide đối Android. Còn hai thư viện này khi code native chắc các bạn cũng đã quá quen thuộc rồi đúng ko ạ.

![](https://github.com/DylanVann/react-native-fast-image/raw/master/docs/assets/scroll.gif) ![](https://github.com/DylanVann/react-native-fast-image/raw/master/docs/assets/priority.gif)
Nhìn vào 2 bức ảnh trên, hẳn các bạn cũng phần nào thấy được tính nào đó của thư viện này. Ở react native thì cũng đã hỗ trợ khá nhiều việc cache lại data cũng giống như trên browser. Tuy nhiên một vài vấn đề chúng ta vẫn hay gặp phải như: 

- Load ảnh bị nhấp nháy, không mượt.
- Cache bị lỗi.
- Performance load ảnh từ bộ nhớ cache chậm.
- Làm chậm app.


**Các tính năng của thư viện:**
- cache ảnh tốt
- Authorization (bổ sung vào header để autho)
- Ưu tiên (Prioritize)
- Tải trước (Preload)
- Hỗ trợ tải ảnh gif
- tạo viền ảnh, bo góc (Border radius)

**Cách sử dụng:**

- Việc đầu tiên là chúng ta phải cài thêm thư viện 

```
 - yarn add react-native-fast-image
 - react-native link react-native-fast-image
```

- 
Tiếp theo là import thư viện vào để sử dụng, cách bạn khai báo để sử dụng thư viện cũng giống như sử dụng Image. Ví dụ:
```
import FastImage from 'react-native-fast-image'

const YourImage = () =>
  <FastImage
    style={styles.image}
    source={{
      uri: 'https://unsplash.it/400/400?image=1',
      headers:{ Authorization: 'someAuthToken' },
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
```

**Proguard**

Cái này áp dụng với android, bạn tìm theo dường dẫn sau android/app/proguard-rules.pro để mở file rule của proguard để thêm vào dòng sau:
```
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
```

việc này sẽ giúp bạn trong trường hợp buid bản release sẽ không bị gặp vấn đề là không tìm thấy thư viện để sử dụng.


**Các thuộc tính mà bạn có thể tuỳ chọn trong quá trình sử dụng theo mong muốn **

- source?: object
- source.uri?: string               //load ảnh từ url 
- source.headers?: object    //Bổ sung vào header các thuộc tính nào đó nếu cần
- source.priority?: enum      // có các option như: normal (default, low, hight)
- source.cache?: enum     
    - FastImage.priority.immutable // chỉ update khi url thay đổi
    - FastImage.priority.web  //sử dụng header và theo dõi việc cache
    - FastImage.priority.cacheOnly //chỉ hiển thị image từ bộ nhớ cache
- resizeMode?: enum
    - FastImage.resizeMode.contain // scale image với width, height
    - FastImage.resizeMode.cover //mặc định theo tỷ lệ
    - FastImage.resizeMode.stretch // scale width, height tràn màn hình
    - FastImage.resizeMode.center // không scale ảnh, luôn hiển thị ở giữa
 - onLoadStart?: () => void // gọi khi muốn load ảnh
 - onProgress?: (event) => void // gọi khi đang load ví dụ : 
     onProgress={e => console.log(e.nativeEvent.loaded / e.nativeEvent.total)}
 - onLoad?: (event) => voi // khi load ảnh thành công, bạn có thể check dc width, height của ảnh
 - onError?: () => void // khi đang load ảnh mà bị lỗi
 - onLoadEnd?: () => void // kết thúc quá trình load ảnh, dù thành công hay lỗi
 - style // hỗ trợ việc sử dụng borderRadius
 - fallback: boolean //Nếu đúng thì ảnh có thể sử dụng dc
 
**Ngoài ra còn có một phương thức static**

FastImage.preload: (source[]) => void   // Việc load trước sẽ giúp hiển thị ảnh tốt hơn. ví dụ:

```
FastImage.preload([
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
])
```

Bài viết được dịch từ [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)

Cảm ơn các bạn đã đọc, chúc các bạn sử dụng hiệu quả thư viện vào ứng dụng của bạn.