### Mở đầu
*React Native là một framework tuyệt vời để bắt đầu một dự án mới dành cho mobile. Nhưng làm thế nào để bắt đầu xây dựng một React Native App từ những dòng code đầu tiên?*
* **Nếu bạn là một người vẫn chưa quen với phát triển mobile** thì cách dễ nhất để bắt đầu là dùng [**Expo CLI**](https://github.com/expo/create-react-native-app) . 
Expo là một bộ công cụ được xây dựng xung quanh React Native với nhiều tính năng và có thể giúp bạn viết một ứng dụng React Native chỉ trong vài phút. Bạn sẽ chỉ cần cài Node.js và một chiếc điện thoại hoặc trình giả lập (emulator). Nếu muốn dùng thử React Native trực tiếp trong trình duyệt web của mình trước khi cài đặt bất kỳ công cụ nào, thì bạn có thể dùng thử [**Snack**](https://snack.expo.io/). Nhưng cách này sẽ có những hạn chế nhất định như sẽ chỉ dùng được những API mà Expo SDK hỗ trợ, sử dụng Expo là chết dính với bộ toolset của nó. Do vậy đây không phải là cách để phát triển React Native App lâu dài.
* **Nếu bạn đã quen với việc phát triển mobile** thì bạn có thể sử dụng [**React Native CLI**](https://github.com/react-native-community/cli). Đây cũng là cách chủ yếu để các developer dùng để phát triển React Native App. Nó yêu cầu bạn phải cài Android Studio hoặc Xcode để bắt đầu. Với cách này bạn có đầy đủ những công cụ phổ biến nhất để phát triển như React Navigation, Redux Saga, I18n... có thể can thiệp sâu vào hệ thống như Camera, Bluetooth với Native Modules. Tuy nhiên việc cài đặt và kết nối chúng với nhau cũng sẽ khiến bạn mất khá nhiều thời gian. Vậy thì còn một cách nữa có đầy đủ những ưu điểm của 2 cách trên, đó là sử dụng boilerplate.

Bài viết này mình xin được giới thiệu một boilerplate mạnh mẽ, đầy đủ và khá linh hoạt đó là Ignite. Ignite cung cấp một công cụ riêng để khởi tạo ứng dụng được gọi là Ignite CLI.

### Ignite CLI
* Dễ dàng nhanh chóng tạo ra một ứng dụng React Native đầy đủ.
* No runtime! Đây chỉ là một công cụ dành cho developer. Không phải là một thư viện khiến bạn phải phụ thuộc vào hoặc tìm cách nâng cấp.
* Một cộng đồng lớn đủ lớn, được kiểm thử và sử dụng bởi hàng ngàn người trên toàn thế giới, đủ để hỗ trợ bạn khi cần thiết.
* Một danh sách các plugin cần thiết và ngày càng được mở rộng mỗi khi cần khởi tạo ứng dụng mới.
* Hoạt động trên cả MacOS, Windows và Linux vì không phải tất cả các developer đều chỉ sử dụng một nền tảng.
* Tiết kiệm trung bình 2 tuần cho việc phát triển ứng dụng trên React Native của bạn.

### Setup
Để bắt đầu hãy chắc chắn rằng bạn đã cài đặt đầy đủ [**React Native**](https://reactnative.dev/docs/getting-started.html#content), **Node.js** (phiên bản tối thiểu là 7.6) và [**Yarn**](https://yarnpkg.com/lang/en/docs/install/)

Cài đặt Ignite CLI và khởi tạo 1 project mới:
```
$ yarn global add ignite-cli
$ ignite new PizzaApp
```

Tiếp theo bạn sẽ có 2 lựa chọn để tiếp tục cài đặt ứng dụng của mình. Đây cũng chính là đặc điểm cho thấy tính linh hoạt của Ignite.
### Andross
```
$ ignite new PizzaApp
  ( Choose `Andross` when prompted )
```
Hoặc 
```
$ npx ignite-cli new PizzaApp --boilerplate andross
```
Cách này dành cho những ai muốn sử dụng Redux đặc biệt là Redux Saga. Và gồm những package khi cài đặt như:
* React Native 0.59.9
* React Navigation 3.11.0
* Redux
* Redux Sagas
* Và nhiều hơn thế

Mô tả thư mục ứng dụng bao gồm:

**Container**

* `App.js` - nơi bao gồm Redux store và các config.
* `RootContainer.js` - giao diện chính của ứng dụng bao gồm cả navigation và status bar.

Để generate một *Container* hay một *Screen* ta dùng lệnh

* `npx ignite-cli g container New` - tạo một `New.js` file và đi kèm luôn một file style `Styles/NewStyle.js`.
* `npx ignite-cli g screen New` - tạo một file screen mới `NewScreen.js` và một file `Styles/NewScreenStyle.js`. Điều quan trọng ở đây khi generate một screen là nó sẽ tạo một thư mục chứa tên screen luôn để giúp ta dễ xác định hơn.

**Navigation**

Thành phần chính và tất cả điều hướng giữa các screen sẽ nằm ở đây
* `AppNavlation.js` - tải màn hình ban đầu và tạo menu của app trong `StackNavigation`
* `ReduxNavlation.js` - file này chứa điều hướng cốt lõi của ứng dụng. Nếu cần thay đổi màn hình khởi chạy của mình, hãy đảm bảo rằng bạn cũng phải thay đổi màn hình tại `if (nav.routes.length === 1 && (nav.routes [0] .routeName === 'LaunchScreen')) {`, nếu không bạn có thể gặp phải vấn đề điều hướng với nút back trong Android.

**Components**

Để generate một Component ta dùng lệnh
* `npx ignite-cli g component New` - tạo một component `New.js` mới và một file style `Styles/NewStyle.js`.

**Theme** Nơi bao gồm các file định hình cho theme của App như *Font, Color, Images, Metric*

**Config** 

* `AppConfig.js` - nơi đặt các config của app.
* `ReduxPersist.js` - cấu hình Redux Persist (sẽ được tách riêng thành plugin trong tương lai).

**Services** bao gồm các API service và các tiện ích API quan trọng.

**Redux, Sagas** nơi chứa các thiết lập Redux, Redux Sagas đã được cấu hình sẵn. Để generate chúng ta dùng lệnh:

* `npx ignite-cli g redux Amazing` - tạo một link redux mới Amazing.
* `npx ignite-cli g saga Amazing` -  tạo một sagas mới Amazing.

Cách thứ được Ignite khuyến khích dùng hơn đó là

### Bowser

Bao gồm:
* React Native
* React Navigation 5
* MobX State Tree
* TypeScript
* Reactotron (yêu cầu 2.x)
* Và nhiều hơn thế nữa.

Cài đặt bằng lệnh

```
$ ignite new PizzaApp
  ( Choose `Bowser` when prompted )
```
Hoặc 
```
$ ignite new PizzaApp --boilerplate bowser
```

Tương tự như **Andross** thì **Bowser** cũng có tool để generate các thành phần ứng dụng như:

**Generate Component**
```
ignite generate component awesome-component --function-component
```
Hoặc
```
ignite generate component awesome-component --stateless-function
```
**Generate screen**
```
ignite generate screen awesome-screen
```
**Generate Model** - tạo một Mobx-State-Tree model.
```
ignite generate model awesome-model
```
Đi sâu hơn vào cấu trúc thư mục. Cấu trúc của **Bowser boilerplate** sẽ tương tự như thế này

```
ignite-project
├── app
│   ├── components
│   ├── i18n
│   ├── models
│   ├── navigation
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   ├── app.tsx
│   ├── environment-variables.ts
|   ├── assets/fonts/
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── README.md
├── android
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.js
├── ios
└── package.json
```

**./app directory** - thư mục chứa các thành phần chính của ứng dụng bao gồm các *Component*, *Screen*, *Navigation*, *Service*,...

**./ignite directory** - nơi lưu trũ tất cả mọi thứ của **Ignite** bao gồm **Ignite CLI** và các **boilerplate items**. Bạn sẽ thấy các *generator*, *plugin* và các ví dụ để bắt đầu với *React Native*.

**./storybook directory** - nơi config các *Story book*

**./test directory** - nơi chứa các thư mục test **Jest** config và các *snapshot* của tất cả các component.

Vậy là mình đã giới thiệu tới các bạn một boilerplate khá là tuyệt vời và đầy đủ mà mình đã sử dụng từ những ngày đầu học *React Native*. Hi vọng nó sẽ giúp ích cho mọi người khởi tạo và bắt đầu một *React Native project* nhanh chóng.

Cảm ơn mọi người vì đã ghé qua!

*Bài viết có tham khảo*: https://github.com/infinitered/ignite