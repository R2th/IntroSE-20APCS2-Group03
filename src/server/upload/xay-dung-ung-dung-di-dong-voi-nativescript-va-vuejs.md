# **Giới thiệu**
NativeScript là một framework ra đời dùng để xây dựng các dụng đa nền tảng cho cả IOS và Android, các lập trình viên chỉ cần viết một lần là có thể chạy trên cả 2 nền tảng này. NativeScript sử dụng các công nghệ web như Angular, Vue.js, Typescript, Flexbox và CSS để có một trải nghiệm giao diện người dùng thực sự khi sử dụng lại các kỹ năng và mã nguồn từ các dự án web của bạn. Nhận 100% quyền truy cập vào các API gốc thông qua JavaScript và sử dụng lại các gói từ npm, CocoaPods and Gradle. Đây là một mã nguồn mở và miễn phí. Đối với các nhà phát triển Vue.js NativeScript cung cấp một loạt các công cụ để có thể tạo các ứng dụng di động nguyên gốc Native Application mà không cần phải dựa vào WebView như những ứng dụng Hybrid khác. Trong bài này mình sẽ hướng dẫn các bước để xây dựng một ứng dụng cơ bản.
# **Cài đặt bước đầu**
Để xây dựng được một ứng dụng NativeScript, trước hết bạn cần thiết lập một vài thứ như sau:
*     Cài đặt NodeJs
*     Cài NativeScript CLI
*     Các thiết lập hệ điều hành với NativeScript
Đây thực sự là phần khó nhất trong hướng dẫn này, vì bạn sẽ cần cập nhật hầu hết các công cụ của mình lên các phiên bản mới nhất để tránh các nguy cơ xảy ra lỗi trong quá trình xây dựng ứng dụng. Khi bạn đã vượt qua giai đoạn thiết lập, việc phát triển cũng tương tự như việc xây dựng bất kỳ ứng dụng Vue.js bình thường nào.
## Cài đặt Nodejs
Cài đặt và cập nhật phiên bản Node.js mới nhất của bạn. Cách bạn làm điều này sẽ phụ thuộc nhiều vào HĐH và sở thích của bạn để quản lý NPM và Node
##  Cài đặt NativeScript CLI
Tiếp theo ta cần cài đặt NativeScript CLI bằng lệnh sau:

    `npm install -g nativescript`
    
Nếu mọi việc suôn sẻ, bạn sẽ nhắc về một vài điều để hoàn thành thiết lập.
##  Các thiết lập hệ điều hành với NativeScript
Có lẽ nhiệm vụ tốn nhiều thời gian nhất sẽ là tự thiết lập NativeScript trên hệ điều hành cụ thể của bạn. Các tài liệu NativeScript Vue được hướng dẫn đầy đủ tại [đây](https://nativescript-vue.org/en/docs/getting-started/installation/) 

Đối với hướng dẫn này, mình sẽ sử dụng máy Mac và đang xây dựng một ứng dụng iOS. Vì vậy, để tiếp tục, các bạn nên đảm bảo máy tính của bạn có xCode để thiết lập.
# **Bắt đầu**
Sau khi đã thiết lập xong ta đã có thể bắt đầu xây dựng một ứng dụng. Để dễ dàng hơn khi bắt đầu bạn có thể sử dụng template gốc có sẵn của NativeScript: nativescript-vue/vue-cli-template như hướng dẫn tại [đây](https://github.com/nativescript-vue/vue-cli-template) để bắt đầu. Bạn chạy các lệnh sau để thiết lập: 

    `npm install -g @vue/cli @vue/cli-init
    vue init nativescript-vue/vue-cli-template vue-nativescript-getting-started`
    
Trong quá trình cài đặt bạn sẽ được hỏi một loạt các câu hỏi để cài đặt các tùy chọn, đối với hướng dẫn này mình sẽ chọn Yes để cài đặt vue-router và vuex.
Sau khi tiến hành cài đặt xong thư mục dự án của bạn sẽ có một cấu trúc như sau:

```
.
├── LICENSE
├── README.md
├── launch.js
├── package.json
├── prepare.js
├── src
│   ├── assets
│   │   └── images
│   │       └── NativeScript-Vue.png
│   ├── components
│   │   ├── Counter.vue
│   │   ├── HelloWorld.vue
│   │   └── Home.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   │       └── counter.js
│   └── styles.scss
├── template
│   ├── app
│   │   ├── App_Resources
│   │   │   ├── Android
│   │   │   └── iOS
│   └── package.json
└── webpack.config.js
```

Như bạn thấy có rất nhiều tệp tin ở đây, đừng lo lắng tiếp đến ta sẽ tìm hiểu nó sau đây.
##     Xây dựng ứng dụng
Ta sẽ chạy lệnh build ứng dụng này để xem điều gì sẽ xảy ra.
Trước hệt ta cần cài một số gói cần thiết cho dự án này:

    `npm install`
Tiếp theo, hãy thử chạy nó với trình debug được bật"

    `npm run watch:ios `
    
  Nếu những thiết lập của bạn như của tôi, bạn sẽ nhận được thông báo sau vì NativeScript chưa được thiết lập hoàn toàn:
  
 ![](https://images.viblo.asia/c8c11479-1b46-43c3-9cd3-58fe59d2a357.png)
 
 Để tắt thông báo trên bạn cần chạy lệnh sau để cài đặt NativeScript:
 
 `tns setup`
 
 Trong quá trình cài đặt bạn sẽ được hỏi để cài đặt xCode, HomeBrew, Google Chrome, Java SDK, Android SDK và nhiều hơn nữa cho ứng dụng của bạn. Nếu bạn cảm thấy thoải mái với việc cài đặt mọi thứ thì hãy lựa chọn A để cài tất cả.
 
 Tiếp đến bạn hãy cài đặt NativeScript Cloud cho ứng dụng của bạn với lệnh sau:
 
 `tns cloud setup`
 
 Bây giờ hãy thử chạy lại lệnh build ở trên:
 
 `npm run watch:ios `
 
 Nếu mọi thứ thuận lợi và không có lỗi gì, bạn sẽ thấy ở trong XCode một màn hình IPhone và kết quả hiển thị như hình sau:
 
 ![](https://images.viblo.asia/93aa27f4-fb4b-42db-b27f-638bdbd5e904.png)
 
 Như vậy là bạn đã thiết lập thành công ban đầu ứng dụng của bạn.
##  Kiểm tra kết quả
Bây giờ hãy bắt đầu với một cái gì đó đơn giản, trong dự án của bạn, hãy truy cập HelloWorld.vue và cập nhật một số văn bản trong mẫu. Khi bạn cập nhật, bạn sẽ thấy ứng dụng tải lại với các thay đổi như thay đổi của bạn.
## Mở rộng ứng dụng
 Bây giờ mình sẽ thiết lập ứng dụng của mình, hãy xem cách mình sẽ thêm một màn hình hoặc phần mới trong ứng dụng.
###  Router
Mở file `src/router/index.js` và thêm một đường dẫn mới như sau:
```
<script>
import Sample from '../components/Sample';

const router = new VueRouter({
...
    {
      path: '/sample',
      component: Sample,
      meta: {
        title: 'Sample',
      },
    },
...
});
</script>
```
### Sample Component
Tiếp đến ta tạo một sample component `src/components/Sample.vue` với một đoạn mã đơn giản:
```
<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Sample Page">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
    </ActionBar>

    <StackLayout class="hello-world">
      <Label class="body" textWrap=true text="text"/>
    </StackLayout>
  </Page>
</template>
<script>
  export default {
    data () {
      return {
        text: "I am sample text"
      };
    },
  };
</script>
```
### Thêm thành phần vào trang chủ (Home page)
Cuối cùng hãy thêm một liên kết đến Sample Page từ Home page từ button trong StackLayout:
```
<StackLayout>
  <Button class="btn btn-primary" @tap="$router.push('/counter')">Counter</Button>
  <Button class="btn btn-primary" @tap="$router.push('/hello')">Hello World</Button>
  <Button class="btn btn-primary" @tap="$router.push('/sample')">Sample</Button>
</StackLayout>
```
Và kết quả ứng dụng của bạn sẽ có giao diện như sau:

![](https://images.viblo.asia/d15aaf2a-f76c-4e87-aa09-be2bde7d3e9e.png)

![](https://images.viblo.asia/f601cd89-9db7-4a6c-8c90-8ee034ee715a.png)

### Thêm một vài thành phần cơ bản
Với NativeScript, thật dễ dàng để thêm vào một số thành phần biểu mẫu phổ biến mà bạn sẽ cần trong một ứng dụng thông thường. Sử dụng trang mẫu (Sample) mà mình đã tạo, cho phép thêm nút chọn ngày (DatePicker) và nút thông thường (Button). Đây là nội dung chính của trang sẽ trông như thế này:
```
<StackLayout class="sample">
  <Label class="body" textWrap=true text="Date Pick"/>
  <DatePicker @loaded="onDatePickerLoaded" @dateChange="onDateChanged" />
  <Button text="Button" @tap="buttonTap" />
</StackLayout>
```
Chúng tôi đã thêm phần tử DatePicker và Button với các sự kiện thích hợp để gọi dựa trên các hành động cụ thể. Khi ngày được thay đổi, ứng dụng sẽ hiển thị một cửa sổ nhắc nhở cảnh báo cơ bản và đóng nó khi ta chọn OK. Đối với Button, khi chọn thì ứng dụng sẽ hiển thị ra một loạt các lựa chọn và ghi lại hành động được chọn. Trong kịch bản này, mình sẽ cung cấp hai tùy chọn và xử lý kết quả thông qua call back.
```
<script>
methods: {
  onDateChanged () {
    alert({
      title: "Date Changed",
      message: "The date was changed",
      okButtonText: "OK"
    }).then(() => {
      console.log("closed it");
    });
  },
  buttonTap () {
    action("Take Action", "Cancel", ["Option1", "Option2"])
      .then(result => {
        console.log(result);
      });
  }
}
</script>
```
Và đây là kết quả:

![](https://images.viblo.asia/766af389-70bb-4e23-9555-7f03b6f36590.png)

# Tổng kết
Như vậy mình đã xây dựng được một ứng dụng di động cơ bản với NativeScript và Vue.js. Với những nhà phát triển Vue.js thì khi bạn tạo một ứng dụng như thế này bạn gần như có thể quên bạn đang sử dụng NativeScript vì mọi thứ đều ở trong thế giới Vue quen thuộc đối với bạn. Đây là một công nghệ mới, vì vậy các bạn hãy thử và cảm nhận nhé. Hãy chia sẻ trong phần bình luận bên dưới.

### [Bài tham khảo](https://www.vuejsradar.com/getting-started-with-building-mobile-apps-with-nativescript-and-vuejs/)