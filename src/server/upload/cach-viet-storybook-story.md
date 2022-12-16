Hello hello, xin chào tất cả anh em Viblo. Anh em nào đã vào đây thì comment chào nhau một cái cho sum vầy nhé. :wave::wave::wave:

Trong [bài trước](https://viblo.asia/p/huong-dan-cai-dat-storybook-can-moi-du-an-aNj4vXQ8L6r), chúng ta đã cùng nhau tìm hiểu quá trình cài đặt Storybook và một số lưu ý khi setup Storybook mà mình đã đề cập. Ngày hôm nay, chúng ta sẽ tìm hiểu chi tiết hơn về cách viết và xây dựng một Story trong Storybook. :wink: 

Cùng bắt đầu từ những thứ nhỏ nhất nào! :sweat_smile: 

## Component-Driven Development (CDD)

Khi chia sẻ về Storybook, có một điều mà mình thường đề cập đầu tiên đó là về quy trình phát triển UI.
- Các component được Storybook đặt vào một môi trường riêng (http://localhost:6006)
- Tách biệt hoàn toàn khỏi ứng dụng chính (ex: http://localhost:3000)
 
Điều này càng phù hợp hơn khi chúng ta áp dụng quy trình phát triển được gọi là Component-Driven Development (CDD).

Về mặt lý thuyết, Component-Driven Development là một quy trình xây dựng UI theo hướng Bottom Up - tức là sẽ cần build các component nho nhỏ trước tiên; kiểu như: Button, Icon, Heading... Sau đó, sẽ kết hợp các component nhỏ đó lại với nhau để tạo ra những component lớn hơn như: Section, Popup, Dialog...

Nói thì dễ! Nhưng cũng có những trường hợp dở khóc dở cười. :smirk: 

### Bad Practice: CDD

![](https://images.viblo.asia/82fd4409-49f2-4c82-baab-87bdc8eb1691.gif)

Hình trên là ví dụ minh họa cho một dự án X. Bạn sẽ thấy có một group Button, bên trong có nhiều mục như: Project, Dialog, Icon.

Mỗi mục có rất nhiều story và... tất cả trong số đó đều thể hiện một mục đích là hiển thị một Button theo những cách khác nhau!! Việc chia component to thành các component nhỏ là đúng... nhưng phải chia là sao để có thể tái sử dụng ở các component khác.

Trong ví dụ trên là một sai lầm khi sử dụng Storybook mà bạn nên tránh, không những tách nhỏ component ở nhiều dạng button không làm code có thể tái sử dụng được ở những nơi khác, mà lại làm tăng số lượng Story phải viết gây lãng phí effort không cần thiết.

### Best Practice: CDD

#### Từ Bad thành Best

Thay vì tách component như trên, do tất cả đều là Button nên chúng ta có thể tạo một component duy nhất là Button và viết nhiều story cho từng trạng thái hiển thị mà component đó hỗ trợ, chẳng hạn như:

![](https://images.viblo.asia/235e48a2-eb49-4d6a-a3f3-f096d53183ad.gif)

Sau khi refactor, khi nhìn vào Storybook bạn sẽ thấy nó gọn gàng và dễ nắm bắt các feature mà Button hỗ trợ phải không?

#### Viblo Best Practice

Dưới đây cũng là một ví dụ khác về việc phân chia component khá hợp lý trong một dự án thực tế của Viblo. Mời các bạn cùng tham khảo.

![](https://images.viblo.asia/c4fa8639-7121-461c-8a4b-6b3aa7702633.gif)

Bây giờ chúng ta sẽ chuyển qua phần tiếp theo, cùng mình viết một Story.

## Cách viết Story

Nếu bạn chưa biết Story là gì. Hãy dành ít phút đọc lại bài viết [đầu tiên](https://viblo.asia/p/storybook-la-gi-tai-sao-dung-storybook-vlZL9NB7VQK) của mình.

### VSCode Extensions

Nếu bạn dùng VSCode, tham khảo một số extension sau sẽ giúp bạn nhanh chóng khởi tạo story:
- Storybook helper v1.2.0 (React): https://marketplace.visualstudio.com/items?itemName=riccardoforina.storybook-helper - Khi đang mở một file component, nhấn `Ctrl  + Shift +  P > Create a Storybook story` nó sẽ generate một file `Component.stories.tsx`
- Storybook Snippets v1.0.0 (React): https://marketplace.visualstudio.com/items?itemName=DanielleDSouza.storybooksnippets - Bạn tự tạo một file stories.tsx, gõ `!story` và nhấn tab nó sẽ generate ra đoạn template cho Story cho React.

Cả hai extension trên đều dùng đơn giản nên mình sử dụng. Tuy nó chỉ cho React, nhưng khi nắm được syntax của Vue thì việc bạn convert lại cũng rất nhanh.

Một extension khác support cả Vue và React nhưng mình thấy nó khá nhiều snippet khó nhớ nên với một người lười như mình thì mình chọn không cài đặt.
- Storybook Snippets v1.0.3 @Jayanta Samaddar: https://marketplace.visualstudio.com/items?itemName=jayantasamaddar.clk-storybook-snippets

### Conventional

Một file Story được quy định theo format chung:

Một số điểm cần lưu ý khi viết story đó là:
- Mỗi một component chúng ta sẽ cần tạo một file có đuôi dạng `*.stories.js` hoặc `*.stories.ts` hoặc `*.stories.mdx`. VD: `Avatar.stories.tsx`
- Một file `*.stories.ts` sẽ là một tập hợp của rất nhiều Story về component đó. VD:

![image.png](https://images.viblo.asia/af721be8-a3ea-4258-9165-4c348c88575c.png)

- Mỗi Story sẽ thể hiện một trạng thái hiển thị mà component đó cung cấp. Sễ dàng dùng thử và nắm bắt được các cách thức hoạt động của component khi đọc doc.

- Tên của một Story nên là một tiêu đề mô tả ngắn về câu chuyện mà nó đang kể. VD:
![image.png](https://images.viblo.asia/c37b78be-f8e1-4379-9817-d7a788be9ffe.png)

### Component Story Format (CSF)

Một Storybook story sẽ tuân thủ theo Component Story Format - quy định một format chung để viết Story. Các công cụ tương tự như Storybook implement theo CSF sẽ đễ dàng đọc story.

CSF dựa vào ES6 module để để phân chia ra các thành phần. Cụ thể thì:

```javascript
export default { title: 'atoms/Button' };

export const text = () => <Button>Hello</Button>;
export const emoji = () => <Button>😀😎👍💯</Button>;
```

- Default module sẽ chứa các thông tin mô tả chung như: `title`.
- Tên các module sẽ được đặt theo dạng [startCase](https://lodash.com/docs/4.17.15#startCase)

| identifier | Transformation |
| -------- | -------- |
| name     | Name     |
| someName     | Some Name     |
| someNAME     | Some NAME     |
| some_custom_NAME     | Some Custom NAME     |
| someName1234     | Some Name 1 2 3 4     |

> Tên các module được export được Storybook recommend viết hoa cả chữ cái đầu tiên như này: SomeName

- Ngooài module default, các module khác được export ra như Circle, Square, No Shadow... trong ví dụ đều được hiểu là một Story.
- Trong template chung của một file stories, thường chúng ta sẽ tạo một function `Template`, kết hợp sử dụng hàm `bind` trong JavaScript để binding các argument. 
- Mỗi Story sẽ nhận `args` chính là giá trị props của component

### Viết Story với React

- Tạo file component. VD: Avatar.tsx
- Nhấn `Ctrl+Shift+P > Create a Storybook story` để tự động tạo file `Avatar.stories.tsx`

```typescript:Avatar.stories.tsx
// TypeScript
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from '~/components/Avatar';
import { avatar } from '~/fixtures/thumbnail;

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Square = Template.bind({});
Square.args = {
  src: avatar,
  size: '150px',
};

export const Circle = Template.bind({});
Circle.args = {
  src: avatar,
  circle: true,
};

export const NoShadow = Template.bind({});
NoShadow.args = {
  src: avatar,
  circle: true,
  shadow: false,
};

export const CustomCSS = Template.bind({});
CustomCSS.args = {
  src: avatar,
  circle: true,
  shadow: false,
  styles: {
    border: 'solid 3px black',
  }
};
```

Nếu không dùng typescript, bạn chỉ cần xóa bỏ phần khái báo type đi là được:

```javascript:Avatar.stories.js
// JavaScript
import { Avatar } from '~/components/Avatar';
import { avatar } from '../fixtures/thumbnail';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

const Template = (args) => (
  <Avatar {...args} />
);

export const Square = Template.bind({});
Square.args = {
  src: avatar,
  size: '150px',
};

export const Circle = Template.bind({});
Circle.args = {
  src: avatar,
  circle: true,
};

export const NoShadow = Template.bind({});
NoShadow.args = {
  src: avatar,
  circle: true,
  shadow: false,
};

export const CustomCSS = Template.bind({});
CustomCSS.args = {
  src: avatar,
  circle: true,
  shadow: false,
  styles: {
    border: 'solid 3px black',
  }
};

```

### Viết Story với Vue.js

Tương tự với React, chúng ta thực hiện thay đổi:
- Đổi gói framework từ `@storybook/react` thành `@storybook/vue3`, `ComponentMeta` -> `Meta`, `ComponentStory` -> `StoryFn`
- Đổi syntax khai báo component `Template` sang thành Vue component
```javascript

// React:
const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

// Vue:
const Template: ComponentStory<typeof Avatar> = (args) => ({
    components: { Avatar },
    setup() {
      return args;
    },
    template: '<Avatar v-binds="args" />'
});
```
- Nếu không dùng typescript khi viết stories, có thể xóa bỏ phần khai báo type tương tự với React như ở trên.

```typescript:Avatar.stories.ts

// TypeScript
import { StoryFn, Meta } from '@storybook/vue3';
import { Avatar } from '~/components/Avatar.vue';
import { avatar } from '~/fixtures/thumbnail;

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => ({
    components: { Avatar },
    setup() {
      return args;
    },
    template: '<Avatar v-binds="args" />'
});

export const Square = Template.bind({});
Square.args = {
  src: avatar,
  size: '150px',
};

export const Circle = Template.bind({});
Circle.args = {
  src: avatar,
  circle: true,
};

export const NoShadow = Template.bind({});
NoShadow.args = {
  src: avatar,
  circle: true,
  shadow: false,
};

export const CustomCSS = Template.bind({});
CustomCSS.args = {
  src: avatar,
  circle: true,
  shadow: false,
  styles: {
    border: 'solid 3px black',
  }
};
```

## Tóm lại

- Hãy tách UI thành các component con, tuy nhiên cần đảm bảo các component con này có thể tái sử dụng dễ dàng ở nhiều component khác
- Sử dụng extension / plugin của Editor / IDE để có snippets cho story sẵn thay vì phải viết từ đầu
- Viết Story tuẩn thủ theo CSF
- Tên Story viết theo `startCase` và viết hoa cả ký tự đầu tiên
- Tên Story nên khái quát được về trạng thái hiển thị
- Mỗi trạng thái hiển thị khác nhau của Component đều cần phải tạo một Story
- Với mỗi framework như: React, Vue, Angular, gói framework có thể khác nhau nhưng về bản chất thì các phần khai báo Story vẫn tuân thủ đúng theo format CSF.


Bài viết này xin phép tạm dừng tại đây. Nếu các bạn thấy hay hãy upvote và theo dõi mình nhé.

Ae cũng có thể donate cho mình tại trang https://kimyvgy.webee.asia để mình có thêm các bài viết khác. Yêu cầu chủ để bạn quan tâm bằng cách comment để mình viết nhé. Cảm ơn các bạn đã đón đọc.