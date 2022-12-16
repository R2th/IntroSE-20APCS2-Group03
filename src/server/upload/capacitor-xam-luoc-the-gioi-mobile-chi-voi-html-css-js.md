Bạn là một tech lead chuyên về web nhưng bỗng một ngày bị bắt phải triển khai sản phẩm cho nền tảng di động trong thời gian ngắn? Hay là một front-end/back-end/full-stack web dev đang muốn lấn sân sang mobile nhưng không biết bắt đầu từ đâu? Hoặc bạn đang có một ý tưởng độc đáo về mobile app có thể kiếm 🍚 cho mình nhưng chỉ biết mỗi HTML, CSS và JS? Hay chỉ là một cốt đơ quèn, muốn khám phá, mở rộng kiến thức nhưng năng lực có hạn, không thể nhồi nhét được nhiều thứ giống mình 😔

**Capacitor** chính là giải pháp cho anh em ta. Cùng mình tìm hiểu về **Capacitor** và những ưu thế mà nó mang lại cho dân web trong việc phát triển một ứng dụng di động qua bài viết này nhé.

> Disclaimer: Capacitor cũng chỉ là một trong nhiều giải pháp giúp anh em dev có nhiều lựa chọn để giải quyết các vấn đề tùy yêu cầu, trường hợp, hoàn cảnh và resources. Nên trong bài viết này, mình chỉ tập trung giới thiệu, hướng dẫn về Capacitor chứ không chỉ ra những ưu, nhược điểm so với các giải pháp tương tự như Cordova, PWA, hay React Native...

# Một ít lý thuyết

![capacitorjs.jpg](https://images.viblo.asia/1d405b53-b753-418a-aa6c-b11bd51b6e93.jpg)

> A cross-platform native runtime for web apps.

Tạm dịch: Thời gian chạy bẩm sinh đa nền tảng dành cho ứng dụng web??? Wtf??? Đọc tiếng Anh thì khó hiểu, mà dịch ra nghe vừa củ chuối, vừa khó hiểu hơn 😂 Nhưng đó là dòng chữ to bự ngay trên [trang chủ](https://capacitorjs.com) để giới thiệu về **Capacitor**, một sản phẩm thuộc nền tảng [Ionic](https://ionic.io/) do bộ đôi [Max Lynch](https://github.com/mlynch) và [Ben Sperry](https://github.com/bensperry) đồng sáng lập và phát triển. Giải thích đơn giản thì Capacitor là một công cụ cho phép anh em dev có thể xây dựng những ứng dụng di động trên Android và iOS chỉ với công nghệ web cơ bản như HTML, CSS, JS, hoặc cao hơn là Angular, React, Vue..., hoặc cao hơn nữa là Nextjs, Nuxt, Quasar...

## Cơ chế làm việc

> Đoạn này mình cũng chỉ dịch một phần từ bài blog của Max Lynch, các bạn gút tiếng Anh có thể đọc trực tiếp bài blog của anh để hiểu rõ hơn tại [đây](https://capacitorjs.com/blog/how-capacitor-works).

![How capacitor works - basic](https://images.viblo.asia/40052ed9-275d-4b76-b2c7-6bb420e201e2.png)

Về cơ bản, Capacitor là cầu nối giúp cho ứng dụng web được viết từ HTML, CSS, JS có thể chạy và giao tiếp với các nền tảng mobile như Android hay iOS. Đi sâu hơn chút thì các bạn có thể thấy Capacitor gồm những thành phần sau:

![How capacitor works - advanced](https://images.viblo.asia/58b84cc1-a9d3-4262-94b9-0d23a0e4ee45.png)

Trong sơ đồ trên, các bạn hãy chú ý đến một thành phần quan trọng là **Web View**, nó là một phần không thể thiếu của hệ điều hành Android và iOS. Web View cho phép hiển thị trang web giống như một web browser nên các web app cũng sẽ hoạt động tốt. Tận dụng điều này, Capacitor gói gọn web app của chúng ta trong Web View, rồi hoạt động như một cầu nối giúp tương tác với các tính năng "native" (tức các tính năng đặc thù của hệ điều hành, ví dụ để mở một dialog, Android sẽ có cách implement khác, iOS có cách implement khác), khi cần sử dụng tính năng nào, chỉ cần gọi đến tính năng đó thông qua API.

Đối với những bạn đã có kinh nghiệm trong mảng mobile thì chắc không còn xa lạ với mô hình này, đây còn được gọi là mô hình ứng dụng **Hybrid**.

Với cách thức trên, chúng ta có thể phát triển mobile app cho nhiều nền tảng chỉ với một codebase viết từ ngôn ngữ web, bằng bất kì công nghệ web nào mà team đã lựa chọn, hoặc thậm chí là một web app đã hoàn thiện vẫn có thể tích hợp Capacitor để trở thành một mobile app mà không phải thay đổi nhiều về codebase.

## Hệ sinh thái plugin

Như đã kể trên, các tính năng "native" của mobile được Capacitor "bridge" để web app của chúng ta có thể gọi bất kì lúc nào thông qua API. Những tính năng native tồn tại dưới dạng "plugin". Ví dụ như app của mình cần chức năng rung để tương tác với người dùng, mình có thể cài đặt plugin [Haptics](https://capacitorjs.com/docs/apis/haptics), rồi từ code JS gọi `Haptics.vibrate()` để rung thiết bị của người dùng 📳 Quá ư là đơn giản.

Ngoài Haptics thì còn rất rất nhiều plugin được cả team core của Capacitor lẫn cộng đồng dev phát triển để chúng ta có thể sử dụng ngay và luôn. Các bạn có thể xem danh sách các plugin như bên dưới:

* Plugin chính thống của team core: https://capacitorjs.com/docs/apis
* Plugin của cộng đồng: https://github.com/capacitor-community

Những plugin này thực chất được viết bằng ngôn ngữ đặc thù của hệ điều hành, ví dụ đối với plugin Haptics, để xây dựng API rung thiết bị là `Haptics.vibrate()`, team Capacitor đã phải viết cả 2 ngôn ngữ cho 2 nền tảng là Android (bằng Java) và iOS (bằng Swift) như các bạn có thể thấy tại github [repo này](https://github.com/ionic-team/capacitor-plugins/tree/main/haptics). Tưởng đơn giản nhưng lại không hề giản đơn, nhưng các bạn cứ yên tâm, chắc 99% trường hợp các plugin có sẵn đã đủ để phục vụ nhu cầu của chúng ta, 1% còn lại thì ~~khó quá bỏ qua~~ chúng ta có thể tự tạo plugin cho riêng mình 😂

Ngoài ra, trong 99% đó còn có cả các plugin từ Cordova, Capacitor được thiết kế để tương thích với khá nhiều plugin của Cordova/PhoneGap (tiền bối của Capacitor, cùng ý tưởng và cách thức ứng dụng mô hình Hybrid apps). Cách cài đặt và sử dụng cũng tương đối đơn giản. Tiện hơn nữa là, do đa số các plugin của Cordova được viết bằng JS nên cộng đồng dev còn xây dựng các TypeScript wrapper được tập hợp tại [repo này](https://github.com/danielsogl/awesome-cordova-plugins), giúp các plugin này càng dễ sử dụng và tường minh hơn.

# Biến web app thành mobile app

Ở đây mình chọn một web app [To-do list](https://github.com/ha-manel/Todo-list) ngẫu nhiên trên github:

![Capacitor todo app demo](https://images.viblo.asia/ac4cb4b1-f3a3-4aa5-b81d-dbc376e43bee.png)

App này đã được code đầy đủ các chức năng cơ bản, giờ mình thử tích hợp Capacitor để biến nó thành một Android app có thể sử dụng các tính năng "native" như sau:

* Khi user thêm, sửa hay xóa một item, sẽ có một thông báo toast hiện ra - dùng [Toast plugin](https://capacitorjs.com/docs/apis/toast)
* Khi user tick hoàn thành một item, thiết bị của họ sẽ rung lên - dùng [Haptics plugin](https://capacitorjs.com/docs/apis/haptics)

Chỉ với 3 bước như trên trang chủ, chúng ta cùng bắt tay thực hiện.

## 1. Cài đặt CLI + core package và khởi tạo

```sh
npm install @capacitor/cli @capacitor/core
npx cap init
```

Terminal sau đó sẽ yêu cầu nhập các thông tin cần thiết để khởi tạo, như tên app, package ID của app trên Play Store/App Store, và thư mục sau khi build có chứa file `index.html` để Capacitor nhận diện. Trong ví dụ này mình đã điền như sau:

![Capacitor todo app init](https://images.viblo.asia/95836b17-9d74-4027-aecb-fb7f44877cdd.png)

## 2. Cài đặt platform package

Do mình chỉ muốn tạo một Android app nên mình chỉ cần chạy lệnh sau để cài đặt cho Android:

```sh
npm install @capacitor/android
npx cap add android
```

Để cài đặt cho cả 2 nền tảng, các bạn có thể thêm package `@capacitor/ios` rồi gọi `npx cap add ios` tương tự.

## 3. Sửa code để dùng tính năng "native" và build app

Như đã kể trên, mình sẽ cài thêm 2 plugin là Toast và Haptics để tích hợp tính năng "native":

```sh
npm install @capacitor/toast @capacitor/haptics
```

Trong [`src/tasks.js`](https://github.com/khang-nd/Todo-list-capacitor/commit/5afd736e3b36392a88d504aac4e25e296f10108a#diff-c1d699dd6ae4e4cefe908d90f96a49b3558667f84b81ec5e1d503dae12530786), mình import Toast plugin và gọi hàm `Toast.show()` để hiện thông báo mỗi khi user add/update/remove một item.

Trong [`src/status.js`](https://github.com/khang-nd/Todo-list-capacitor/commit/5afd736e3b36392a88d504aac4e25e296f10108a#diff-80a15cbd42e84124b3fcd0e2c35058874b26dc1e702f1db24387e20e999e6646), mình import Haptics plugin và gọi hàm `Haptics.vibrate()` để rung thiết bị của user khi họ tick hoàn thành một item.

Sau đó, build source và đồng bộ với thư mục `android` bằng lệnh:

```sh
npm run build
npx cap sync
```


### 3.x. Dùng Android Studio để đóng gói source code thành app

Ở bước này có thể sẽ có bạn thắc mắc: sao phải dùng Android Studio? tưởng Capacitor hô biến web app thành mobile app luôn mà không cần IDE đặc thù của nền tảng/hệ điều hành đó chứ? Lý do là vì Capacitor không hoạt động như vậy. Như đã nói trên, Capacitor chỉ đóng vai trò là cầu nối giữa codebase web của bạn với môi trường "native" của hệ điều hành, đơn giản hóa các bước trong quy trình phát triển mobile app, tuy nhiên, việc đóng gói code và build thành một mobile app vẫn phải do các IDE là **Android Studio** (đối với Android) hay **Xcode** (đối với iOS) đảm nhận. Nhưng bước này cũng không quá phức tạp nên các bạn không phải lo lắng.

Để cài đặt Android Studio, các bạn cứ lên [trang chủ](https://developer.android.com/studio) tải về rồi tiến hành cài đặt bình thường. Sau khi cài đặt, các bạn có thể mở Android Studio cùng với project của mình bằng lệnh `npx cap open android`. Đợi tí để gradle tự động cài đặt các package cần thiết cho app. Cuối cùng, các bạn có thể chạy app trực tiếp trên simulator hoặc điện thoại của mình để trải nghiệm, hay build source thành file apk hoặc bundle để deploy lên store.

![Android Studio run](https://images.viblo.asia/5f36d20d-32bc-4afe-b691-08f49ef2d008.png)

Trường hợp của mình, sau khi chạy app trên điện thoại, mình nhập một item mới thì một Toast hiện kết quả như code mình đã sửa:

![Capacitor todo app success](https://images.viblo.asia/d9b198e2-503e-4aca-8366-3b5c420c8653.png)

Vậy là mình đã có một Android app được xây dựng từ ngôn ngữ web, cực kỳ dễ dàng và nhanh chóng 🥳

# Tự tạo một plugin

Trường hợp app của bạn nằm trong số 1% đen đủi, phải sử dụng một tính năng "native" nào đó mà chưa có plugin nào có sẵn, thì Capacitor cũng có hỗ trợ tận răng các bước để bạn có thể tự tay tạo một plugin cho app của mình. Vấn đề còn lại không quá khó khăn, chỉ việc tìm một khóa học nào đó để học thêm về Java/Kotlin hay Swift/Objective-C thôi 😂

Ở đây mình thử tạo một Capacitor plugin cho Android (lại là Android, ước được viết bài hướng dẫn về iOS... 😢). Giả sử use case là app todo của mình muốn truy xuất được thông tin ngôn ngữ của thiết bị mà chưa có plugin nào cung cấp, mình sẽ tự tạo một plugin `locale` theo các bước sau:

## 1. Khởi tạo từ template plugin

Đầu tiên mình dùng bộ [generator](https://github.com/ionic-team/create-capacitor-plugin/) mà team Capacitor đã phát triển để tạo một khung sườn plugin:

```sh
npm init @capacitor/plugin
```

Nhập các thông tin cần thiết cho plugin generator, sau khi hoàn tất, các bạn sẽ có một project có cấu trúc thư mục tương tự như sau:

![Capacitor plugin structure](https://images.viblo.asia/4a9dc186-b114-422c-bc2b-a55349921dc9.png)

Ở đây mình sẽ chỉ quan tâm 2 thư mục `android` và `src`:

* `android` - Chứa source code của plugin cho Android (trong `android/src/main/java/com/.../LocalePlugin.java`)
* `src` - Chứa source code của plugin cho web và một bộ definition bằng TS để bridge với source code phía Android hoặc iOS.

## 2. Code xử lý phía Android

Truy cập theo [đường dẫn dài ngoằng đến source code của plugin phía Android](https://github.com/khang-nd/Todo-list-capacitor/tree/main/plugins/capacitor-plugin-locale/android/src/main/java/com/khangnd/todoapp/plugins/locale), các bạn sẽ thấy 2 file:

* `Locale.java` - chứa phần code xử lý logic của plugin
* `LocalePlugin.java` - chứa phần code để giao tiếp với web

Việc tổ chức file như trên giúp cho logic code của mình được tách ra rõ ràng và dễ maintain hơn nếu plugin của mình tương đối bự, nhưng do plugin mình dự định viết rất nhỏ nên mình sẽ chỉ viết code trong file `LocalePlugin.java`. Trong file này đã có sẵn một đoạn code mẫu tuy ngắn nhưng đầy đủ logic xử lý của một plugin API như sau:

```java
@CapacitorPlugin(name = "Locale") // <-- tên của plugin để bên phía web nhận diện được khai báo bằng decorator annotation
public class LocalePlugin extends Plugin {

    private Locale implementation = new Locale(); // <-- phần code xử lý logic nếu cần tách

    @PluginMethod // <-- annotation để khai báo hàm echo là một API của plugin
    public void echo(PluginCall call) { // <-- PluginCall là cục data nhận từ phía web
        String value = call.getString("value"); // <-- PluginCall chứa các hàm để nhận và chuyển đổi kiểu dữ liệu tương ứng

        JSObject ret = new JSObject(); // <-- tạo một cục data mới để trả về phía web
        ret.put("value", implementation.echo(value));
        call.resolve(ret); // <-- gọi hàm resolve của PluginCall để trả cục data về khổ chủ
    }
}
```

Mình sẽ sửa đoạn code này để làm nhiệm lấy thông tin locale của thiết bị như sau:

```java
@CapacitorPlugin(name = "Locale")
public class LocalePlugin extends Plugin {

    @PluginMethod
    public void getLocale(PluginCall call) {
        Locale locale = Locale.getDefault();
        call.resolve(locale);
    }
}
```

Quàooooo, logic xịn xò thía...

## 3. Định nghĩa interface

Ở bước này, mình sẽ định nghĩa hàm `getLocale` đã code ở phía Android trong [`src/definitions.ts`](https://github.com/khang-nd/Todo-list-capacitor/blob/main/plugins/capacitor-plugin-locale/src/definitions.ts):

```ts
export interface LocalePlugin {
  /**
   * Return the device's locale information.
   */
  getLocale(): Promise<string>;
}
```

Interface này sẽ giúp bạn hoặc một ai khác sử dụng plugin này có thể dễ dàng tận dụng type checking hay code completion của intellisense. Việc comment code là optional, nhưng chắc hẳn các bạn cũng đã quá rõ những lợi ích từ việc comment code, huống chi là tầm quan trọng của nó khi xây dựng API. Hơn nữa, các comment tại đây đóng vai trò là documentation comment và sẽ được generate ra cùng với file README khi các bạn chạy câu lệnh `npm run docgen` đã được tích hợp sẵn với template plugin.

## 4. Code xử lý phía Web

Ở bước này, mình chỉ cần tạo một hàm `getLocale` tương ứng bên phía web để kết nối với phía Android là có thể bắt đầu sử dụng plugin. Tại file [`src/web.ts`](https://github.com/khang-nd/Todo-list-capacitor/blob/main/plugins/capacitor-plugin-locale/src/web.ts), các bạn cũng có thể thấy một đoạn code mẫu đã có sẵn tương tự như bên Android. Mình sửa lại để trả thông tin ngôn ngữ của trình duyệt như sau:

```ts
export class LocaleWeb extends WebPlugin implements LocalePlugin {
  async getLocale(): Promise<string> {
      return navigator.language;
  }
}
```

> Lưu ý là nếu app của bạn đang nhắm tới nhiều nền tảng cùng lúc, cả Web, cả Android hoặc iOS, thì việc bạn phải viết code xử lý cho nhiều nền tảng là cần thiết, nhưng nếu app của bạn chỉ nhắm tới các nền tảng di động thì tại file này, các bạn có thể implement hàm rỗng mà không cần viết code xử lý bên trong.

Cuối cùng, chỉ việc build source bằng câu lệnh `npm run build` rồi đẩy lên npm để chia sẻ với cộng đồng hoặc import package vào project của mình để sử dụng thôi. Vậy là mình đã có một Capacitor plugin đơn giản.

# Kết

**Capacitor** quả thực là một vũ khí lợi hại cho anh em web dev, sự đơn giản, tiện lợi và nhanh chóng mà nó mang lại là cực kỳ giá trị. Nếu kết hợp với những bộ framework chuyên dụng để phát triển các cross-platform app như [Ionic](https://ionicframework.com/) (cùng cha đẻ), [Framework7](https://framework7.io/), [Quasar](https://quasar.dev/)... thì trông chuyên nghiệp bá cháy con bà bảy, không khác gì một "native" app thực thụ. Tuy vậy, rõ ràng không có công nghệ nào là "silver bullet" để giải quyết mọi vấn đề. Mỗi loại công nghệ đều có những ưu, khuyết điểm trong những trường hợp nhất định (về yêu cầu, quy mô, nhân lực, timeline, bảo mật, ông lead, bà PM, vân vân mây mây...). Nên cần đặt câu hỏi, trao đổi và đánh giá trước khi quyết định lựa chọn.

Hi vọng bài chia sẻ phần nào giúp ích cho các bạn, cảm ơn các bạn đã theo dõi bài viết 🙂

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)