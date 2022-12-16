Bài viết này mình xin giới thiệu một vài thư viện hữu ích mà mình hay dùng trong dự án.

### Tạo Splash Screen với react-native-bootsplash

Đây là màn hình đầu tiên trong bất kỳ ứng dụng mobile nào. Nơi đặt bộ nhận diện thương hiệu thay vì màn hình đen, bạn có thể ẩn nó đi khi ứng dụng đã sẵn sàng.

Một trong những lý do mình thích sử dụng **[react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash)** hơn package nổi tiếng **[react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)** là nó không ngăn bạn gặp lỗi màn hình đỏ. Package này cũng cung caasp một CLI để thay đổi kích thước nội dung, tạo tệp **Android Drawable XML** và tạo **iOS Storyboard** một cách tự động.

![](https://images.viblo.asia/9ebf81ed-d48f-4b79-b45d-bf4c115651e0.gif)



### Tạo app icon cho từng nền tảng với react-native-make

[**react-native-make**](https://github.com/bamlab/react-native-make) là một plugin dành cho **React Native CLI**. Sau khi được cài đặt, plugin sẽ có sẵn thông qua **React Native CLI** và bạn có thể dễ dàng tạo cái **platform-specific icons** bằng cách sử dụng command sau:
```
react-native set-icon --path path-to-image
```

### react-navigation giải pháp hàng đầu cho điều hướng trong ứng dụng

Mình chọn **[react-navigation](https://reactnavigation.org/)** như một lựa chọn đầu tiên khi bắt đầu với một project.

Kể từ phiên bản v3, thư viện này sử dụng [react-native-reanimated](https://software-mansion.github.io/react-native-reanimated/) và [react-native-gesture-handler](https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html) để xử lý các hoạt ảnh và cử chỉ người dùng.

Và kể từ phiên bản react-navigation v5, thư viện cung cấp một component API hoàn toàn mới. Các developer đến từ nền tảng web ReactJs sẽ cảm thấy dễ dàng và quen thuộc hơn với cách sử dụng giống như **react-router**.

### react-native-svg cho icons

Khi bắt đầu mình đã sử dụng **react-vector-icon** ddeert ạo các custom icon. Tuy nhiên cách này gặp một vài vấn đề như mình phải tạo lại một font chữ mới bất cứ khi nào design của ứng dụng có sự thay đổi. Nó còn một số giới hạn trong việc hỗ trợ các thuộc tính của SVG.

Dùng [react-native-svg](https://github.com/react-native-community/react-native-svg) sẽ khắc phục được hầu hết các vấn đề đó. Nếu bạn chỉ có SVG icon thì bạn có thể sử dụng tool này để convert SVG file sang React Native Component.

### Validate form với react-hook-form

Với hầu hết các ứng dụng đều có sự xuất hiện của Form. Một package quá nổi tiếng và đầy đủ để làm việc với form, đặc biệt có cả trên 2 nền tảng web với ReactJs và mobile với React Native. Xem thêm document và demo đầy đủ tại [react-hook-form](https://react-hook-form.com/)


### react-native-keychain để bảo mật những dữ liệu nhạy cảm

Hầu hết mọi người đều sử dụng Async-storage để lưu trữ những API token hay những key bảo mật khác. Thư viện [react-native-keychain](https://github.com/oblador/react-native-keychain) cung cấp quyền truy cập keychain/keystore vào ứng dụng React Native, giúp các dữ liệu được an toàn hơn.

### API call sử dụng react-apollo hoặc react-query

Ứng dụng thì không thể thiếu việc giao tiếp với API được. Việc áp dụng các tính năng như caching, offline suport hay optimize API sẽ không dễ dàng nếu như bạn sử dụng Redux Saga của Redux. Với [react-query](https://github.com/tannerlinsley/react-query) hoặc [apollo-client](https://www.apollographql.com/docs/react/) (cái này cần phụ thuộc vào công nghệ mà backend sử dụng nữa) đều có những tính năng kể trên. React-query dành cho REST API và react-apollo dành cho GraphQL.

### Content Loader

[React-content-loader](https://github.com/danilowoz/react-content-loader) là một thư viện tuyệt vời để tạo các placeholder loading, nó là các component SVG với nhiều preset để sử dụng, dể dàng tạo hoặc custom theo ý của mình.


![](https://images.viblo.asia/50f6f766-4b3f-49fb-a40a-aba41c8d7a93.gif)

### Handling và Tracking Error

[React-native-sentry](https://github.com/getsentry/sentry-react-native) là một cloud-base dùng để tracking lỗi một cách real-time. Bằng cách tạo free account và cài đặt react-native-sentry bạn có thể dễ dàng tìm và fix nhanh các lỗi trên môi trường production.

[react-native-exception-handler](https://github.com/master-atul/react-native-exception-handler) là một react native module cho phép bạn handle các exception fatal/non-fatal. Module này cũng giúp ngăn chặn các sự cố đột ngột của ứng dụng React Native mà không có thông báo đến user.

### Patch packages

Khi bạn sử dụng các package nhỏ lẻ hoặc không chính thống trên các ứng dụng cũ. Bạn có update các node_modules file để fix một vài issue, và khi bạn update một vài code bên trong node_module, sau đó khi npm install hoặc yarn lại thì những update đó sẽ mất đi. Trong trường hợp này có thể sử dụng [patch-package](https://github.com/ds300/patch-package) để xử lý.

### Detox cho E2E testing

[native-testing-library](https://github.com/testing-library/native-testing-library) là một thư viện testing API nổi tiếng cho React Native. Dành cho end-to-end testing thì bạn có thể sử dụng [Wix Detox](https://github.com/wix/Detox) như một giải pháp cho automation end to end test. 


Tổng hợp lại các package mình giới thiệu trong bài nhé:

* [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash)
* [react-native-make](https://github.com/bamlab/react-native-make)
* [react-navigation](https://reactnavigation.org/)
* [react-native-reanimated](https://software-mansion.github.io/react-native-reanimated/)
* [react-native-gesture-handler](https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html)
* [react-native-svg](https://github.com/react-native-community/react-native-svg)
* [react-hook-form](https://react-hook-form.com/)
* [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)
* [react-native-keychain](https://github.com/oblador/react-native-keychain)
* [react-query](https://github.com/tannerlinsley/react-query)
* [apollo-client](https://www.apollographql.com/docs/react/)
* [react-content-loader](https://github.com/danilowoz/react-content-loader)
* [react-native-sentry](https://github.com/getsentry/sentry-react-native)
* [react-native-exception-handler](https://github.com/master-atul/react-native-exception-handler)
* [patch-package](https://github.com/ds300/patch-package)
* [native-testing-library](https://github.com/testing-library/native-testing-library)
* [Wix Detox](https://github.com/wix/Detox)

Xin cảm ơn vì đã đọc bài viết, hi vọng nó giúp ích dành cho bạn!