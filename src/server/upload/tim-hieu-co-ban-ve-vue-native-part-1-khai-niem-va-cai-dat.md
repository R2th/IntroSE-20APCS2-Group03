# Lời nói đầu:
Trong xã hội  hiện nay, khi mà hầu như mỗi người đều sở hữu cho mình một chiếc smart phone thì việc lập trình ứng dụng di động đang trở thành một vùng đất hứa cho những lậpp trình viên.

Và trong số vô vàn lựa chọn để viết ứng dụng di động, `React Native` đang dần trở thành hot trend trong  mảng lập trình mobile app nói chung và native app nói riêng. Nó cho phép bạn xây dựng ứng dụng trên android và iOS chỉ với một ngôn ngữ thống nhất là javascript.

Nghe có vẻ hấp dẫn nhỉ, nhưng `React Native` là một framework sử dụng thư viện ReactJS mà tôi thì đang dùng VueJS thay vì ReactJS. Chẳng nhẽ giờ tôi lại phải học thêm React nữa à?

Câu trả lời cho bạn là không, framework `Vue Native` ra đời giúp cho những người như bạn (và tôi) có thể xây dựng một native app mà không cần phải học ReactJS.
# Nội dung:
## Khái niệm Native App:
Ở phần mở đầu bài viết, mình có nhắc đến Native App. Vậy bạn có thực sự biết Native App là gì?

Trong lập trình ứng dụng di động, người ta dựa vào ngôn ngữ lập trình mà chia ra thành 3 loại:
- **Native App** (ứng dụng gốc): là loại ứng dụng mà bạn sẽ download nội dung xuống điện thoại và truy cập vào chúng khi sử dụng. VD: ứng dụng tra từ điển, Facebook, ...
- **Web App** (ứng dụng web): là các ứng dụng được viết trên nền tảng browser (Chrome, Firefox, Safari) để người dùng có thể sử dụng và tương tác ngay trên đó mà không cần phải cài đặt và cũng không có yêu cầu về cấu hình và dung lượng đĩa cần thiết gì cả.
- **Hybrid App** (ứng dụng lai): nằm giữa **Web App** và **Native App**. Về cơ bản ứng dụng vẫn viết bằng ngôn ngữ web, nhưng được đặt trong native container, nên vẫn có thể dưa lên các cửa hàng ứng dụng. VD: Uber, Gmail, ...

Giờ hãy cùng tìm hiểu điểm mạnh, điểm yếu của từng loại để xem xem vì sao Native App lại đang trở thành xu thế?

- **Native App**:
    - Ưu điểm:  
        - Về mặt performance thì native app chạy nhanh hơn
        - Về tính năng native app có khả năng truy cập các phần cứng, thể khai thác được sức mạnh phần cứng nhiều nhất của nền tảng.
        - Có thể chạy offline bằng dữ liệu đã cache.
    - Nhược điểm:
        - Một native app chỉ có thể chạy trên một hệ điều hành nhất định. 
        - Với mỗi HDH thì người lập trình phải viết riêng native code cho nó, dẫn đến không nhất quán giữa các phiên bản ứng dụng, chi phí phát triển cao và đòi hỏi khả năng thành thạo nhiều ngôn ngữ ở lập trình viên.
- **Hybrid App**:
    - Ưu điểm:
        - Việc phát triển ứng dụng ít phức tạp hơn Native Mobile App.
    - Nhược điểm:
        - Không thể sử dụng khi không có mạng.
        - Tốc không được nhanh và mượt như Native App vì nó còn phụ thuộc vào tốc độ trình duyệt của thiết bị.
- **Web App**:
    - Ưu điểm:
        - Có thể chạy trên tất cả trình duyệt của mobile hỗ trợ phiên bản HTML và javascript.
        - Không cần cài đặt trên máy.
        - Ứng dụng không cần phải được build lại qua SDK hoặc một công cụ phát triển độc quyền khác như xCode (chỉ cần deploy lên server và chạy).
    - Nhược điểm:
        - Về performance, web-based app không chạy nhanh như native app.
        - Luôn phải chạy online. Khi mạng không ổn định thì ứng dụng web cũng ngay lập tức thể hiện điểm yếu của mình.

<hr>

Rồi, tìm hiểu lí thuyết một chút thế thôi, giờ chúng ta cùng bắt tay  vào cài đặt thử một project Vue Native như thế nào nhé!
## Cài đặt một project Vue Native:
Để khởi tạo một project Vue Native, bạn sẽ có 2 cách: 
- Một là tạo project Vue Native trực tiếp bằng `vue-native-cli`
- Hai là khởi tạo một project `React Native` rồi sau đó cài đặt `Vue Native` vào và chỉnh sửa một chút để có được một project `Vue Native` (cái này nghe chừng hơi lằng nhằng nhỉ).

=> Đến đây chắc có bạn sẽ thắc mắc, tại sao lại có thể khởi tạo một project `Vue Native` thông qua một project `React Native` được, chẳng nhẽ giữa 2 cái có gì đó liên quan đến nhau à?

=> Câu trả lời là đúng như vậy. Về cơ bản thì `Vue Native` sẽ kết nối `React Native` và VueJS. Nói một cách đơn giản hơn thì bạn sẽ viết code VueJS và nó sẽ được biên soạn sang `React Native` để tạo ra một native mobile application thay vì phải học ReactJS.

### Cài đặt bằng vue-native-cli:
- Trước hết, chúng ta sẽ cần cài đặt `vue-native-cli` (command-line interface) với câu lệnh:
    ```bash
    $ npm install -g vue-native-cli
    ```
- **B1**: Khởi tạo project:
    ```bash
    $ vue-native init <projectName>
    hoặc
    $ vue-native init <projectName> --no-crna
    $ cd <projectName>
    ```
   
    Đến đây, sẽ có bạn thắc mắc là thêm cái tuỳ chọn `--no-crna` thì khác gì không có?
    
    Theo như mình tìm hiểu được thì `--no-crna` nghĩa là không sử dụng **C**reate **R**eact **N**ative **A**pp. **C**reate **R**eact **N**ative **A**pp cho phép bạn chạy thử ứng dụng trên device thật thông qua phần mềm [Expo](https://expo.io/tools#client) (mình sẽ giới thiệu thêm ở phần cuối bài viết).

![](https://images.viblo.asia/4a6fc202-58f9-47b2-92c0-3f8d54190918.png)

- **B2**: Sau khi khởi tạo xong project, bạn sẽ nhận được những hướng dẫn cơ bản nhất để chạy thử ứng dụng, có các lựa chọn cho bạn như sau (chú thích cho từng tuỳ chọn đã nói rất rõ trong ảnh rồi nhé)
    ```bash
    $ npm start
    $ npm run ios
    $ npm run android
    $ npm test
    $ npm run eject
    ```

- **B3**: Chúng ta sẽ chạy lệnh `npm start` để chạy ứng dụng nhé:

![](https://images.viblo.asia/cf36e99a-e617-48c4-b03e-9fcae0f09265.png)

Khi này, bạn sẽ có các tuỳ chọn tương ứng với thiết bị mà bạn muốn chạy:
- iOS:  bấm s để nhận URL qua tin nhắn điện thoại hoặc email.
- Android: dùng [Expo Client](https://expo.io/tools#client) quét mã QR (hình như chỉ Android quét được QR thì phải, mình dùng iOS thì không thấy có phần đấy)
- Sử dụng phần mềm giả lập.



### Cài đặt bằng React Native:
- **B1**: Khởi tạo project `React Native`:
    ```bash
    react-native init <projectName>
    cd <projectName>
    ```
- **B2**: Cài đặt thành phần `Vue Native` gồm 3 thành phần (core/helper/scripts):
    ```bash
    npm install vue-native-core --save
    npm install vue-native-helper --save
    npm install vue-native-scripts --save-dev
    ```
 - **B3**: Tiếp tục cấu hình lại một chút nào:
     - Tạo file `vueTransformerPlugin.js` với nội dung như sau:
    ```javascript
    var upstreamTransformer = require("metro/src/transformer");

    var vueNativeScripts = require("vue-native-scripts");
    var vueExtensions = ["vue"];

    module.exports.transform = function({ src, filename, options }) {
    if (vueExtensions.some(ext => filename.endsWith("." + ext))) {
    return vueNativeScripts.transform({ src, filename, options });
    }
    return upstreamTransformer.transform({ src, filename, options });
    };
    ```
     - Tiếp tục khởi tạo file `rn-cli.config.js` với nội dung:
     ```javascript
    module.exports = {
        getTransformModulePath() {
            return require.resolve("./vueTransformerPlugin.js");
        },
        getSourceExts() {
            return ["vue"];
        }
    };
     ```
 - **B4**: Đổi tên `App.js` thành `App.vue` rồi sửa nội dung thành code Vue:
    ```html
    <template>
        <view class="container">
            <text class="text-color-primary">This is vuongthaiVueNative Project</text>
        </view>
    </template>

    <style>
    .container {
        background-color: white;
        align-items: center;
        justify-content: center;
        flex: 1;
    }
    .text-color-primary {
        color: red;
    }
    </style>
    ```
 - **B5**: Chạy ứng dụng thôi nào: câu lệnh chạy project cũng sẽ khác so với cách cài đặt bên trên đấy nhé:
     ```bash
     react-native run-ios
     react-native run-android
     ```
     
Và đây là kết quả thu được khi chạy ứng dụng trên điện thoại như sau:

![](https://images.viblo.asia/5dcd2407-a7df-4269-b3c4-a87241a28e31.jpg)


## Expo.io:
Ứng dụng này có cả 2 phiên bản cho Android và iOS. Nó giúp chúng ta đẩy project lên mạng và có thể kết nối từ thiết bị di động.

Và ở đây, mình sử dụng iOS nên sẽ tải app [Expo Client](https://expo.io/tools) cho điện thoại và cài thêm [Expo XDE](https://docs.expo.io/versions/v29.0.0/introduction/installation) trên máy tính với giao diện chính như sau. 

![](https://images.viblo.asia/0823d19f-8671-4096-bcf1-1dbb53a25cec.png)

Để chạy ứng dụng trên thiết bị, sẽ có 2 cách cho bạn lựa chọn:
+ **Cách 1**: đẩy project lên mạng bằng nút **Publish** rồi vào ứng dụng Expo Client chạy project.
+ **Cách 2**: không cần đẩy project lên mạng, bạn sẽ dùng cable kết nối thiết bị di động với máy tính và vẫn có thể chạy thử ứng dụng trên thiết bị di động của mình.

# Lời kết:
Nếu bạn đã từng biết về VueJS thì mình nghĩ bạn sẽ dễ dàng vọc vạch từ vọc vạch một chút rồi đấy. Nếu chưa, bạn có thể tham khảo qua [series VueJS của mình](https://viblo.asia/s/cung-hoc-vuejs-tu-con-so-0-L6lAyeBrlek) hoặc chờ đợi bài viết tiếp theo của mình. Trong phần tiếp theo của bài viết, mình sẽ làm một ứng dụng demo thử cho các bạn. 

Các bạn hãy chờ mình nha, mình sẽ làm nhanh nhất có thể!

**Link phần 2 (Updating)**
# Tài liệu tham khảo:
https://vue-native.io/docs/