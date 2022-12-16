### 1. Tổng quan

Khi vừa triển khai ứng dụng tâm đắc của mình, những gì mà bạn đã nỗ lực tâm huyết để xây dựng, bạn nghĩ rằng bạn đã quyết định sử dụng Vue JS để mang đến cho người dùng trải nghiệm mượt mà và trơn chu khi sử dụng ứng dụng của bạn. Bạn đã thử nghiệm bao quát ứng dụng của mình và cảm thấy khá tự tin về cách nó sẽ hoạt động, nhưng bạn biết người dùng sẽ tương tác với ứng dụng của bạn từ nhiều trình duyệt và thiết bị mà bạn cần có cách để track errors, xem những gì người dùng nhìn thấy trước khi họ tiếp cận. 

### 2. Rollbar

Vue JS cung cấp một trình xử lý lỗi toàn cục mà bạn có thể sử dụng để nắm bắt tất cả các trường hợp ngoại lệ chưa được phát hiện ở bất kỳ đâu trong ứng dụng của bạn. Bạn có thể thiết lập như sau: 

```
// main.js
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // or log error
};
```

Đối với một ứng dụng cơ bản, thêm một vài dòng như trong đoạn trích trên là đủ để giúp bạn bắt và xử lý các trường hợp ngoại lệ, để ứng dụng của bạn không gặp sự cố và làm ảnh hưởng đến trải nghiệm của người dùng.

Tuy nhiên, các ứng dụng được nhiều người dùng sử dụng trên nhiều thiết bị, trình duyệt và điều kiện mạng khác nhau, yêu cầu là cần xử lý lỗi chính xác hơn. Đây là nơi các service như Sentry và Rollbar thể hiện sự hữu ích.

Rollbar cung cấp khả năng hiển thị lỗi thời gian thực cùng với stack trace tương ứng và tất cả dữ liệu bạn cần gỡ lỗi, bao gồm các tham số yêu cầu, trình duyệt, IP cũng như thông báo theo thời gian thực qua Slack và email để có thể khắc phục lỗi ngay khi chúng xảy ra.

 ![](https://images.viblo.asia/5909971e-9d32-4255-80b9-26a103d4ccfb.png)
 
 Rollbar cung cấp SDK JavaScript mà bạn có thể thêm thủ công trong ứng dụng của mình nhưng việc thêm Rollbar vào ứng dụng của bạn thậm chí còn tầm thường hơn nếu bạn sử dụng plugin vue-rollbar chính thức, chỉ cần bao gồm gói trong dự án của bạn bằng cách cài đặt từ npm.
 
 ```
 yarn add vue-rollbar
 ```
 
 Sau đó, nhập và khởi tạo vue-rollbar trong main của project, thay thế accessToken bằng thông báo của riêng bạn.
 
 ```
 // main.js

import Vue from 'vue';
import Rollbar from 'vue-rollbar';
import App from './App.vue';

Vue.use(Rollbar, {
  accessToken: 'post_client_item_token_secret',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  environment: 'production',
  payload: {
    client: {
      javascript: {
        code_version: 'version-1',
      },
    },
  },
  });

new Vue({
  render: h => h(App),
}).$mount('#app');
```

Tiếp tục và bắt lỗi bằng cách thêm dòng sau ngay trước khi Vue được khởi tạo.

```
// main.js
JSON.parse('invalid json string');

new Vue({
  render: h => h(App),
}).$mount('#app');
```

Nếu mọi việc suôn sẻ, lỗi này sẽ hiển thị trong Bảng điều khiển Rollbar được thấy như dưới đây.

![](https://images.viblo.asia/46388c3c-b895-4b85-a55f-f6b0884f2cbb.png)

Nhấp vào lỗi để xem chi tiết và nhận thêm thông tin về lỗi cụ thể đó, như trình duyệt, thiết bị hệ điều hành và các full stack trace để bạn có thể dễ dàng tìm và khắc phục sự cố.

![](https://images.viblo.asia/d1485651-3b7d-4f27-98c7-4022417da7ac.png)

Bạn cũng có thể theo dõi các lỗi bạn đã xử lý một cách gracefully trong ứng dụng của mình bằng vue-rollbar vì nó hiển thị chức năng debug mà bạn có thể gọi thủ công ở bất cứ đâu trong ứng dụng của mình, ví dụ:

```
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  mounted() {
    try {
      JSON.parse('Can not parse');
    } catch (error) {
      this.rollbar.debug(error);
    }
  },
};
</script>
```


Nếu bạn giảm bớt code JavaScript để sử dụng trên production, bạn cần tải lên các  sources maps tương ứng cho các file JavaScript của mình để Rollbar có thể hiểu code của bạn và hiển thị stack traces có nghĩa.

Thông thường, khi uploading các yêu cầu về source maps chúng ta cần đăng nhập vào Bảng điều khiển Rollbar và tải lên thủ công sourcemap của chúng ta hoặc tạo một yêu cầu POST cho Rollbar nhưng vì chúng ta sử dụng webpack, chúng ta có thể tự động thực hiện việc này bằng cách sử dụng plugin rollbar-sourcemap-webpack-plugin.

```
yarn add rollbar-sourcemap-webpack-plugin -D
```

Thêm vào plugins block của file cấu hình webpack:

```
// vue.config.js

import RollbarSourceMapPlugin from 'rollbar-sourcemap-webpack-plugin';

module.exports = {
  configureWebpack: {
    plugins: [
      new RollbarSourceMapPlugin({
        accessToken: 'post_server_item_token',
        version: 'version-1',
        publicPath: 'https://mywebsite.com'
      })
    ]
  }
}
```

### 3. Tổng kết

Bây giờ mỗi khi bạn build ứng dụng, source maps được tựu động tải lên Rollbar và mọi lỗi xảy ra sau khi bạn deploy sẽ được ghi lại và báo cáo cho Rollbar với stack trace thích hợp. 

Bạn có thể thấy lỗi khi chúng xảy ra, tần suất xảy ra cũng như thông tin bổ sung để debug và fixbug.

Tài liệu tham khảo: https://dev.to/olumytee/error-tracking-in-vuejs-with-rollbar-c6g.