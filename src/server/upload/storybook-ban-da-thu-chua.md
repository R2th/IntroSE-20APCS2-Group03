# Storybook là gì thế ?
**Storybook:**  Storybook là một công cụ để phát triển giao diện người dùng. Nó làm cho việc phát triển nhanh hơn và dễ dàng hơn bằng cách cô lập các thành phần. Điều này cho phép bạn làm việc trên một thành phần tại một thời điểm. Bạn có thể phát triển toàn bộ giao diện người dùng mà không cần khởi động một ngăn xếp nhà phát triển phức tạp, buộc một số dữ liệu nhất định vào cơ sở dữ liệu của bạn hoặc điều hướng xung quanh ứng dụng của bạn.

## Tại sao nên dùng Storybook ?
* Một trong những tool phổ biến và quyền lực nhất để build components, được tả trong GitHub như một component interactive UI dev & test mà có support react, react-native, vue và angular.

* Nói cách khác, storybook như một môi trường dev UI components. Nó cho phép bạn browse tất cả các components project và view các states khác of mỗi component.

* Storybook mang theo rất nhiều add-ons cho việc design components, tư liệu, test và hơn thế. Từ ví dụ này, bạn có thể thử hết với các component props một cách dễ dàng bằng các add-on storybook prop.

* Bạn có thể dùng storybook-preview và storybook-deploy để tạo và triển khai các stories như một documentation static website.

## Dùng như thế nào ?
Không dài dòng văn tự nữa, Storybook cơ bản nó sẽ trông như thế này đây:

![addon-controls-optimized.2021-02-23 18_09_13.gif](https://images.viblo.asia/a0332bed-24a5-4072-820b-c32853c9bc0e.gif)

![1_593C9tIr2pYJRbjmhA2GJA.gif](https://images.viblo.asia/f7d03ba5-6109-402f-8e38-14bd965e8e62.gif)

## Thử code xem nào
Lần demo này mình sẽ dùng Storybook + Vuejs + antdv ( Ant Design of Vue )
Thử viết storybook cho button trong antdv nhử ảnh trên xem nhé.

```javascript
import { Button } from 'ant-design-vue';

export default { 
  component: Button,
  title: 'Components/Button',
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'select'
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Button },
  props: Object.keys(argTypes),
  template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = { type: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { type: 'secondary' };

export const Large = Template.bind({});
Large.args = { type: 'primary', size: 'large' };

export const Small = Template.bind({});
Small.args = { type: 'primary', size: 'small' };
```

Thế là xong, quá đơn giãn mà lại rất tiện lợi đúng không. Nó dùng làm document cho các components trong Project thì khá hay !
Storybook còn khá nhiều options nhiều dạng control... các bạn tìm hiểu thêm ở trang chủ storybook nhé.

## Lời Kết
Trên đây là chia sẻ ngắn gọn của mình về storybook, hy vọng sẽ giới thiệu đến các bạn một công cụ preview components hay ho :D. Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^ Cảm ơn bạn đã ghé thăm 😍

Nguồn: [Storybook](https://storybook.js.org/docs/vue/writing-stories/introduction)

[Github](https://github.com/nhanpv-2250/storybook)