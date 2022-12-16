Ở kì trước chúng ta đã tìm hiểu về concept và vai trò của Storybook. Kì này ta sẽ thử áp dụng xây dựng một flow khi phát triển dự án với thư viện này.

![](https://images.viblo.asia/3ed56ebf-da3e-46bb-97e3-1d76803589c9.jpg)
## 1. Khởi tạo

Mình sẽ tạo một project với create-react-app qua Terminal

```bash
create-react-app storybook-demo && cd $_
```

Sau đó add package Storybook React

```bash
npm i -D @storybook/react
```

Ở file **package.json** chúng ta add thêm script để chạy storybook ở một port độc lập

```
"scripts": {
    "storybook": "start-storybook -p 6006 -c .storybook"
  },
```

Chạy luôn scripts này để Storybook xuất hiện ở port 6006

```
npm run storybook
```

![](https://images.viblo.asia/f9472dec-17c5-4c12-8e12-507c88af362e.png)

Chúng ta hình dung workflow như sau, với một file _Component.js_ được tạo trong folder **src** của dự án, ta sẽ tạo một file _Components.stories.js_ đi kèm để thể hiện Component đó thông qua **Storybook**. Để setup điều này, ta sẽ tạo file **config.js** trong folder .storybook

```bash
mkdir .storybook && cd $_
touch config.js
```

File config.js setup như sau:

```js
// .storybook/config.js

import { configure } from '@storybook/react';

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(file => req(file));
}

configure(loadStories, module);
```

## 2. The first story

Okie giờ ta sẽ vào folder **src** để tạo một Component có tên là Button.js

```js
// src/Button.js

import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { bg, padding, children } = this.props;
    return <button style={{ backgroundColor: bg, padding }}>{children}</button>;
  }
}

export default Button;
```

Tiếp đến là setup **Button.stories.js** đây là file chúng ta sẽ 'kể chuyện' cho Component Button.

- Import React, storiesOf của Storybook, Component Button vừa tạo

```js
// src/Button.stories.js

import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';
```

Gọi storiesOf(category, module) với category là 'Button', ta sẽ add story thứ nhất bằng `add(description, callback)`. Callback sẽ là một simple function trả về trược tiếp Component với những thuộc tính tương ứng

```js
// src/Button.stories.js

storiesOf('Button', module)
  .add('with background', () => (
    <Button bg="palegoldenrod" padding="8px 12px">
      HELLO WORLD
    </Button>
  ))
  .add('with background 2', () => (
    <Button bg="goldenrod" padding="12px 22px">
      HALLOWEEN
    </Button>
  ));
```

Đây là kết quả của 2 stories tương ứng 2 styles của Component Button:
![](https://images.viblo.asia/c205e0b9-c1ae-4d30-818c-4088923f7bc7.png)

## 3. Add Storybook addons

Addons là một feature khiến **Storybook** trở nên mạnh mẽ và khác biệt so với các thư viện guideline đang trên đà xu thế.

Addons khiến việc hiển thị, tương tác với các Component trong Storybook trở nên đa dạng và chi tiết hơn rất nhiều. Ta sẽ thử nghiệm với 02 addons là **storybook-addon-jsx** và **@storybook/addon-info**

- Add **@storybook/addons** (package sử dụng addons), **storybook-addon-jsx**, **@storybook/addon-info** dưới dạng save dev dependencies

```bash
npm i -D @storybook/addons @storybook-addon-jsx @storybook/addon-info
```

### - storybook-addon-jsx

- Thường các addon sẽ require một file **addons.js** trong cùng folder .storybook. File này đơn giản chỉ define thư viện cần add vào để Storybook có thể đối chiếu global, ta đơn thuần chỉ cần `import 'storybook-addon-jsx/register'`

```js
// .storybook/addons.js

import 'storybook-addon-jsx/register';
```

- Config lại file **config.js** một chút với `{ setAddon } from '@storybook/react'` và `JSXAddon from 'storybook-addon-jsx'`

```js
import { configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);
const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  require('./welcomeStory.js');
  req.keys().forEach(file => req(file));
}

configure(loadStories, module);
```

- Thay function `add` thành `addWithJSX` trong file stories của chúng ta, hãy chú ý func này đã được set globally

```js
storiesOf('Button', module).addWithJSX('with background', () => (
  <Button bg="palegoldenrod" padding="8px 12px">
    HELLO WORLD
  </Button>
));
```

- Thành quả, các Component đã được hiển thị dưới dạng JSX trên view của Storybook
![](https://images.viblo.asia/54fe198f-21ed-4e33-ba7f-ca5065420995.png)

### - @storybook/addon-info

**@storybook/addon-info** sẽ nâng cấp Storybook thành một document, addon này sẽ giúp bạn in ra toàn bộ thông tin code của Component với style theo cách của bạn. Rất phù hợp để xây dựng một bộ Docs chỉnh chu và...đẹp.

**@storybook/addon-info** không đòi hỏi phải setup file addons.js, chúng ta chỉ cần import trực tiếp vào stories

```js
// src/Button.stories.js

import { withInfo } from '@storybook/addon-info';
```

- **withInfo** sẽ wrap toàn bộ callback mà trả về Component cùng với đó truyền vào description chi tiết hơn và có thể style cho phần thông tin này:

```js
// src/Button.stories.js

import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module)
  .addWithJSX(
    'with background',
    withInfo({
      styles: {
        header: {
          h1: {
            color: 'orange'
          }
        }
      },
      text: `
        Description goes here!
      `
    })(() => (
      <Button bg="palegoldenrod" padding="8px 16px">
        HELLO WORLD
      </Button>
    ))
  )
  .addWithJSX('with background 2', () => (
    <Button bg="goldenrod" padding="12px 22px">
      HALLOWEEN
    </Button>
  ));
```
Kết quả:
![](https://images.viblo.asia/dfe5fdfe-92aa-4c80-b286-6c1b6c987c8f.png)

Để gọn gàng và khi cần một style chung, ta có thể tạo một template về info qua file **utils.js**

`import { withInfo } from '@storybook/addon-info'` và modify nó thành một template chỉ việc nhập text là description cho những lần kế tiếp.

```js
// src/utils.js

import { withInfo } from '@storybook/addon-info';

const styles = {
  header: {
    h1: {
      marginRight: '20px',
      fontSize: '24px',
      display: 'inline',
      color: 'red'
    },
    body: {
      paddingTop: 0,
      paddingBottom: 0
    },
    h2: {
      display: 'inline',
      color: 'orange'
    }
  },
  infoBody: {
    backgroundColor: '#eee',
    padding: '0 8px',
    lineHeight: '2'
  }
};

export const wInfo = text =>
  withInfo({
    inline: true,
    source: false,
    styles,
    text
  });
```

Kế đến ta chỉ việc import function mới modify là **wInfo** từ file utils.js thay thế và thêm description cần thiết:

```js
// src/Button.stories.js

import React from 'react';
import { wInfo } from './utils';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module).addWithJSX(
  'with background',
  wInfo(`
      Description goes here!
    `)(() => (
    <Button bg="palegoldenrod" padding="8px 16px">
      HELLO WORLD
    </Button>
  ))
);
```

Boom! Kết quả là rất nuột nà và gọn gàng:
![](https://images.viblo.asia/c1ec5018-2c89-4de6-981f-f088ee2f0a0d.png)

## 4. Tạm kết
Như vậy công việc xây dựng thư viện Styleguide của dự án với StoryBook trở nên rất **tường minh và được kiểm soát, bổ sung, theo dõi dễ dàng.**
Demo trên các bạn có thể view phần code trên [github này](https://github.com/spideyinf/storybook-with-react-beaufiful-dnd) để tiện follow.

Hi vọng bài viết sẽ giúp ích cho công việc của các bạn!