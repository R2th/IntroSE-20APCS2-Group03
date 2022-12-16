#### Chào mấy anh nhé, hôm nay lơ ngơ không biết nên viết cái gì thú vị bèn nhớ đến việc đơn giản mà mình hay làm khi xây dựng một ứng dụng `React`mà không phải ai cũng chịu khó làm, đó là viết document cho các `react component` . Hôm nay mình sẽ chia sẽ luôn về các thư viện mà mình thường dùng để làm việc này nhé :D .

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về reactjs.
- Đã có kiến thức cơ bản về webpack, babel (nếu bạn muốn custom được các config của một số thư viện cho phép)
- Môi trường mình sẽ demo:
  - window 10
  - node v12.14.0
  - yarn v1.7.0
 
#### Mục đích:
- Thực hiện để biết cách sử dụng.
- Khuyến khích thói quen viết document cho những gì mình code.
- Tự kiểm nghiệm ưu và nhược điểm để sử dụng sao cho phù hợp với từng quy mô dự án.

#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản).
-  Phần cấu hình mình sẽ không mô tả chi tiết trong bài viết, các bạn có thể theo dõi thông qua repo.
- .etc

#### Thư viện
- Storybook
- Docz

2 thằng này cốt lõi cũng được xây dựng bằng `webpack` và `babel` nên hoàn toàn có thể merge với config của app các bạn nhé.

# 2. Tiến hành
## 1. Storybook 
#### Nó là gì ? [trang chủ](https://storybook.js.org/)
> Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

Như mô tả ở trên thì thằng này có thể tích hợp với nhiều thư việc khác không chỉ `React`. Qúa ngon :smiley:
#### Cài đặt các thư viện chính sau
```
yarn add react react-dom
yarn add @babel/core babel-loader @storybook/react --dev
```

#### Các file

##### Sau khi cài các thư viện cần thiết, tiếp theo mình sẽ thêm `script` trong  file `package.json` để chạy thằng storybook như sau
`package.json`
```json
{
  "name": "storybook",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "storybook": "start-storybook -p 6969"
  },
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "devDependencies": {
    "@babel/core": "^7.7.5",
    "@storybook/react": "^5.2.8",
    "babel-loader": "^8.0.6"
  }
}
```
Port `6969` anh em chú ý nhé =))

##### Cấu hình cho `storybook`
Chúng ta tạo 1 folder tên là `.storybook`, những file config anh em phang vào đây để storybook chạy nhé.
Ở đây mình sẽ thêm 1 file cấu hình sau:

`config.js`
```js
import { configure } from '@storybook/react'

configure(require.context('../components', true, /\.stories\.js$/), module)
```
Mục đích để storybook duyệt qua thư mục `../components` và tìm các file có regex tương ứng là `/\.stories\.js$/`, những file này sẽ được storybook coi là các module mà nó cần load lên UI của nó.

Ngoài ra còn nhiều cấu hình khác anh em tìm hiểu thêm nhé.

##### Tạo file ví dụ
Tạo một `react component` trước nhé
`components/Button/index.js`
```jsx
import React from 'react'

const styles = {
  colors: {
    red: 'red',
    green: 'green',
    blue: 'blue',
  },
  sizes: {
    small: 16,
    medium: 20,
    large: 24,
  },
}

const Button = ({ color = 'green', size = 'medium', ...rest }) => (
  <button
    type="button"
    style={{
      color: styles.colors[color],
      fontSize: styles.sizes[size],
    }}
    {...rest}
  />
)

export default Button
```
Đơn giản là tạo các prop để style cho `Button component`

Storybook component
`components/Button/index.stories.js`
```jsx
import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '.'

storiesOf('Button', module)
  .add('Default', () => <Button>Default</Button>)
  .add('With color', () => (
    <>
      <Button color="red">red</Button>
      <Button color="green">green</Button>
      <Button color="blue">blue</Button>
    </>
  ))
  .add('With size', () => (
    <>
      <Button size="small">small</Button>
      <Button size="medium">medium</Button>
      <Button size="large">large</Button>
    </>
  ))
```

Cách viết cũng khá đơn giản. vì cơ bản nó cũng trả về react component thôi :D


##### Chạy
```js
yarn storybook
```

##### Hiển thị
![](https://images.viblo.asia/3f45e348-7200-4ace-8b32-aba19748bcff.gif)

Nhìn có vẻ xịn :D

## 2. Docz 
#### Nó là gì ? [trang chủ](https://docz.site/)
> It's never been easier to document your things!

Xây dựng dựa trên 4 nguyên tắc sau:
1. Zero config and easy to learn.
2. Blazing fast.
3. Easy to customize.
4. MDX based.

Thằng này khá mới, giao diện khi run app được xây dựng bằng `gastsby` và cũng sịn sò không kém.
#### Cài đặt các thư viện chính sau
```
yarn add react react-dom docz

Mình sẽ demo thêm phần Props nên cần cài đặt thêm
yarn add prop-types
```

##### Mình sẽ thêm `script` trong  file `package.json` để chạy thằng docz như sau
`package.json`
```json
{
  "name": "docz",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "docz": "docz dev"
  },
  "dependencies": {
    "docz": "^2.2.0",
    "prop-types": "^15.7.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
}
```

##### Cấu hình cho `docz`

Mình sẽ điều chỉnh một vài cấu hình cho nó, những phần khác nó sẽ dùng cấu hình mặc định của docz.
`doczrc.js`
```js
export default {
  title: 'Document',
  port: 6969,
  codeSandbox: true,
  files: 'components/**/*.mdx',
}
```

Thằng docz sẽ duyệt qua các file `.mdx` thay vì `.js` hay `.jsx` nhé.

##### Tạo file ví dụ

Tạo component
`components/Button/index.js`
```jsx
import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  colors: {
    red: 'red',
    green: 'green',
    blue: 'blue',
  },
  sizes: {
    small: 16,
    medium: 20,
    large: 24,
  },
}

const Button = ({ color = 'green', size = 'medium', ...rest }) => (
  <button
    type="button"
    style={{
      color: styles.colors[color],
      fontSize: styles.sizes[size],
    }}
    {...rest}
  />
)

Button.propTypes = {
  color: PropTypes.oneOf(Object.keys(styles.colors)),
  size: PropTypes.oneOf(Object.keys(styles.sizes)),
}

export default Button
```

Mình vẫn sử dụng component ở ví dụ trên nhưng thêm phần `PropTypes` cho nó.

File document
`components/Button/index.mdx`
```jsx
---
name: Button
---

import { Playground, Props } from 'docz';
import Button from '.'


## Props

<Props of={Button} />

## Default

<Playground>
  <Button>Default</Button>
</Playground>

## With color

<Playground>
  <Button color="red">red</Button>
  <Button color="green">green</Button>
  <Button color="blue">blue</Button>
</Playground>

## With size

<Playground>
  <Button size="small">small</Button>
  <Button size="medium">medium</Button>
  <Button size="large">large</Button>
</Playground>
```


Nhìn có vẻ gọn gàng, chuyên nghiệp nhỉ :laughing:



##### Chạy
```js
yarn docz
```

##### Hiển thị
![](https://images.viblo.asia/39ca73e4-ac42-44fc-bb88-97558c301444.gif)

Ngon không kém `Storybook`

# 3. Kết luận
Đó là những gì mình muốn chia sẽ hôm nay, tuy đơn giản nhưng lại vô cùng sâu sắc, hehe.

Ngoài kia còn rất nhiều thư viện hỗ trợ tạo document cho `react component`, anh em có thể tìm hiểu thêm nhé.

Cảm ơn mọi người đã đọc bài viết này.

[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/document-react-components)