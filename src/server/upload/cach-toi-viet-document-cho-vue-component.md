#### Chào anh em lại là mình đây :D, sau một thời gian dài ăn nằm với `React`, hôm nay mình quyết định đổi gió và sẽ viết 1 cái gì đó về `Vue`. Tất nhiên để viết 1 component hoàn chỉnh không chỉ có code cho nó bao quát các trường hợp sử dụng cần thiết mà còn phải viết cả document để cho những người khác dùng nữa nhé. Mình sẽ chia sẽ luôn về cách mình làm việc này nhé. Chiến thôi :fist_oncoming:

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về `vue`.
- Môi trường mình sẽ demo:
  - Window 10
  - Node v12.14.0
  - Yarn v1.22.4
  - VSCode v1.45.1

#### Mục đích:
- Biết cách cấu hình.
- Biết cách sử dụng.
- Khuyến khích thói quen viết document cho những gì mình code.
- Áp dụng vào hệ thống nếu có thể.

#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản).
-  Phần cấu hình mình project sẽ không đề cập, các bạn có thể theo dõi thông qua repo.

#### Thư viện
- Storybook

# 2. Tiến hành
## 1. Storybook 
#### Nó là gì ? [trang chủ](https://storybook.js.org/)
> Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

#### Cài đặt thư viện
```js
yarn add @storybook/vue --dev
```

#### Tạo project
Mình sẽ xử dụng `vue-cli` để tạo project
```js
vue create document-vue-components
```
#### Cấu hình cho `storybook`
1. Mọi thứ liên quan đến cấu hình thằng `storybook` sẽ được đặt trong folder `.storybook` nằm cùng cấp với `package.json`

2. Tạo file `.storybook/babel.config.js` để sử dụng cấu hình babel của project chính.
```js
module.exports = require('../babel.config')
```

3. Tạo file `.storybook/main.js` để custom config `webpack` cho thằng `storybook`
![](https://images.viblo.asia/f8711590-69cb-4acb-aab3-4aa84738eaa3.png)

`['../src/components/**/stories.js']` Chỉ cho storybook tìm các file có tên là `stories.js` nằm trong thư mục và các thư mục con của `src/components` để nó tải lên.
Mình sẽ sử dụng toàn bộ config `loader` của thằng `vue-cli`

#### Tạo component và stories
1. Tạo component `src/components/MyButton/index.vue`

![](https://images.viblo.asia/c233489c-17c8-4b4e-bbb6-44d8da63c9b8.png)

Tạo 1 component button đơn giản nhận 2 props `color, size` và cho phép truyền bất cứ thứ gì làm nội dung và hiển thị thông qua `slot`

2. Tạo stories tương ứng `src/components/MyButton/stories.js`

![](https://images.viblo.asia/40b5f2b9-b4c3-4d9e-8800-8413ef6f63f8.png)

Các trường hợp component nhận và nó sẽ hiển thị như thế nào.

####  Chạy xem nào
```js
yarn start-storybook -p 6969 
```

![](https://images.viblo.asia/5029eec3-aad8-4f8b-a5b9-e7ed42d7d549.gif)

Mọi thứ có vẻ ngon lành :heart_eyes:

## 2. Addons của storybook
Việc sử dụng các addons sẽ giúp document cho component trở nên hiệu quả hơn.

Cụ thể mình sẽ sử dụng `@storybook/addon-storysource` (This addon is used to show stories source in the addon panel.)
Ngoài ra còn rất nhiều `addon` khác phục vụ cho những việc khác, bạn có thể tham khảo tại [đây](https://storybook.js.org/addons/)

#### Cài đặt thư viện
```js
yarn add @storybook/addon-storysource --dev
```

#### Bổ sung cấu hình cho `storybook` để có thể nhận và xử lý cho `addon`
![](https://images.viblo.asia/70cf8964-b433-49b8-a99d-2eaa661218a6.png)

####  Chạy lại xem nào
```js
yarn start-storybook -p 6969 
```

![](https://images.viblo.asia/a33b6076-b683-46a3-9d30-186c2e4ac427.gif)

Thật tuyệt vời =))

# 3. Kết luận
Tuy đơn giản nhưng lại có vẻ rất chất lượng các anh em nhỉ :D.

Hi vọng bài viết này có ích cho anh em.

Cảm ơn đã đọc bài viết này :clap:

[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/document-vue-components)