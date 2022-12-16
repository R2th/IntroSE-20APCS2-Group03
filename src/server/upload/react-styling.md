![React Styling](https://images.viblo.asia/1ba9bd6c-e767-49d6-95ae-b21bb316faf7.png)
<br/><br/>
Mỗi khi bắt đầu một dự án React, chúng ta thường phải quyết định trước xem nên dùng những thư viện gì, dùng cấu trúc thư mục như thế nào hay nên sử dụng `kiểu` stylesheet nào cho hợp lý.
<br/><br/>
Trong bài viết này mình sẽ giới thiệu một số cách khác nhau để sử dụng `stylesheet` trong `React`. Mỗi cách có những ưu điểm - nhược điểm riêng, việc quyết định sử dụng cách nào phụ thuộc vào sở thích cá nhân của bạn và độ phức tạp của ứng dụng của bạn.

## 1. CSS Stylesheet truyền thống
Như thế nào là truyền thống, đó chính là chẳng có tí css nào trong component của bạn, bạn chả cần import hay  tạo style trong component, vì bạn đã `import` nó trong code `html` rồi.
<br/><br/>

Đây là cách truyền thống nhất và được dùng khá nhiều trong thời gian trước đây.
- Ưu điểm: 
    + Bạn có thể sử dụng bất kì loại `CSS pre-processors` (sass, scss, stylus, less,...) nào mà bạn muốn - trước khi `import` trong `html` bạn cần phải `compile` nó sang `css` - hoặc css thuần.
    + Bạn không phải lo code `css` của bạn bị lặp lại, chỉ cần viết 1 lần và sử dụng trong toàn bộ dự án.
    + Hỗ trợ sử dụng `postcss` hay các `transforming styles` tool khác để transform style của bạn cho các trình duyệt khác nhau
- Nhược điểm: 
    + File `.css` lớn, ảnh hưởng tới tốc độ load trang
    + Bạn phải `import` những `styles` mà mình không cần dùng (vì chúng nằm chung 1 file mà)

## 2. Inline styling
Dưới đây là 1 ví dụ về `inline-style`:
```js
import React from 'react';

const divStyle = {
    margin: '40px',
    border: '5px solid pink'
};
const pStyle = {
    fontSize: '15px',
    textAlign: 'center'
};

const Box = () => (
    <div style={divStyle}>
        <p style={pStyle}>Get started with inline style</p>
    </div>
);

export default Box;
```

Cách này khá là đơn giản, trong mỗi `component` bạn khai báo `style` cho mỗi phần tử của nó (nếu có).
- Ưu điểm:
    + Mỗi `component` có `style` xác định, khi có chỉnh sửa thì chỉnh sửa đó không tác động lên bất kì phần nào khác ngoài component cần chỉnh sửa
- Nhược điểm:
    + Không thể dùng lại style đã viết ở component khác vì trong mỗi `component` bạn đều phải viết `style` cho nó, nên đối với các `component` có cùng `style` bạn vẫn phải viết riêng ra cho từng component khác nhau.
    + Khi được render ra, style của các component có thể bị trùng lặp
    + Không hỗ trợ sử dụng `postcss` hay các `transforming styles` tool khác nên bạn cần phải viết nhiều code hơn cho các trình duyệt khác nhau

## 3. Imported CSS Stylesheet
```css
/* DottedBox.css */
.DottedBox {
    margin: 40px;
    border: 5px dotted pink;
}

.DottedBox_content {
    font-size: 15px;
    text-align: center;
}
```

```js
import React from 'react';
import './DottedBox.css';

const DottedBox = () => (
    <div className="DottedBox">
        <p className="DottedBox_content">Get started with CSS styling</p>
    </div>
);

export default DottedBox;
```

Cách này gần tương tự với cách trên. Ở đây, bạn tách `style` riêng ra và đặt vào 1 file `.css` rồi `import` nó.
- Ưu điểm:
    - Có thể dùng lại
    - Có thể sử dụng `postcss` để transform style cuả bạn để nó hỗ trợ các trình duyệt khác nhau
- Nhược điểm:
    - Khi có chỉnh sửa, nó có thể ảnh hưởng tới các `component` dùng chung `style` được chỉnh sửa
    - Style của bạn vẫn bị trùng lặp khi được render ra `html`

## 4. CSS Modules
```css
/* DashedBox.css */
.container {
   margin: 40px;
   border: 5px dashed pink;
}
.content {
   font-size: 15px;
   text-align: center;
}
```

```js
import React from 'react';
import styles from './DashedBox.css';

const DashedBox = () => (
    <div className={styles.container}>
        <p className={styles.content}>Get started with CSS Modules style</p>
    </div>
);

export default DashedBox;
```

Nhìn thì nó na ná cách thứ 3, tuy nhiên sau chúng ta `import` style thì ứng với mỗi phần tử, chúng ta gán cho chúng `style` tương ứng trong file `.css` thông qua `styles`. Với cách này, chúng ta có ít nhược điểm hơn cách trên:
- Ưu điểm:
    - Có thể dùng lại
    - Có thể sử dụng `postcss` để transform style cuả bạn để nó hỗ trợ các trình duyệt khác nhau
    - Style của các component không bị trùng lặp khi render ra `html`
- Nhược điểm:
    - Khi có chỉnh sửa, nó có thể ảnh hưởng tới các `component` dùng chung `style` được chỉnh sửa
<br/><br/>
***Note:*** Nếu bạn sử dụng `create-react-app` thì trong file `.css` bạn sử dụng `:local(.className)` chứ không sử dụng trực tiếp `.className` như trong ví dụ

## 5. Styled-components

Chúng ta sử dụng thư viện [styled-components](https://github.com/styled-components/styled-components)
<br/><br/>
> Styled-components is a library for React and React Native that allows you to use component-level styles in your application that are written with a mixture of JavaScript and CSS
<br/><br/>
Hiểu 1 cách đơn giản thì nó cho phép bạn tạo các `styled-component` tương tự như `component` của React
<br/><br/>
Nó có thể được cài đặt thông qua `npm` hoặc `yarn`
```sh
npm install --save styled-components
# Or
yarn add styled-components
```
Dưới đây là ví dụ về cách dùng của thư viện này:
```js
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    margin: 40px;
    border: 5px outset pink;
    &:hover {
        background-color: yellow;
    }
`;

const Paragraph = styled.p`
    font-size: 15px;
    text-align: center;
`;

const OutsetBox = () => (
    <Div>
        <Paragraph>Get started with styled-components 💅</Paragraph>
    </Div>
);

export default OutsetBox;
```

Như bạn có thể thấy, ở đoạn code trên chúng ta tạo ra 2 `styled-component` là `Div` và `Paragraph`. Mỗi một `component` có style riêng. 
<br/><br/>
Còn một điểm khá hay, vì thư viện này tạo ra `styled-component` nó cũng tương tự một `component` của React, nên chúng ta hoàn toàn có thể truyền giá trị vào cho nó. Ví dụ:

```js
const Button = styled.button`
    background: red;
    border-radius: 8px;
    color: white;
    height: ${props => props.small ? 40 : 60}px;
    width: ${props => props.small ? 60 : 120}px;
`;

const Div = styled.div`
    padding: 10px 16px;
    border: 1px dash #222;
`;

const ButtonGroup = () => (
    <Div>
        <Button small>Small Button</Button>
        <Button large>Large Button</Button>
    </Div>
)

export default ButtonGroup
```

Chúng ta cũng có thể `compose` component này (tương tự Higher-Order Component):
```js
const BasicNotification = styled.p`
    background: lightblue;
    padding: 5px;
    margin: 5px;
    color: black;
`;

const SuccessNotification = styled(BasicNotification)`
    background: lightgreen;
`;

const ErrorNotification = styled(BasicNotification)`
    background: lightcoral;
    font-weight: bold;
`;

const Div = styled.div`
    padding: 10px 16px;
    border: 1px dash #222;
`;

const Notification = () => (
    <Div>
        <BasicNotification>Basic Message</BasicNotification>
        <SuccessNotification>Success Message</SuccessNotification>
        <ErrorNotification>Error Message</ErrorNotification>
    </Div>
)
```
Ngoài ra, cũng chính vì thư viện này tạo ra các *`styled-component`* nên chúng ta hoàn toàn có thể sử dụng lại các `component` này như các component của React. Bạn có thể tạo sẵn 1 *thư viện* nhỏ chứa các `styled-component` này để `import` và sử dụng nó ở các `component` khác
<br/><br/>
- Ưu điểm:
    + Tính ứng dụng và khả năng sử dụng lại cao
    + Hỗ  trợ `condition-style` thông qua `props`
- Nhược điểm:
    + Chưa hỗ trợ sử dụng `postcss` hay các `transforming styles` tool khác nên bạn cần phải viết nhiều code hơn cho các trình duyệt khác nhau.

## Lời kết
Trên đây mình đã giới thiệu một số cách để sử dụng `style` cho code `React` của bạn. Việc quyết định sử dụng phương pháp nào hoàn toàn phụ thuộc vào cá nhân hay nhóm của bạn, đồng thời nó cũng phụ thuộc vào độ phức tạp và mức độ đặc trưng của ứng dụng mà bạn chuẩn bị làm.

- Nếu bạn chỉ thêm 1 vài `style` thì nên sử dụng `inline-style` (cách 2)
- Nếu bạn muốn sử dụng lại `style` của mình nhiều lần đồng thời có nhiều style đặc biệt thì nên sử dụng `styled-component` (cách 5)
- Nếu ứng dụng của bạn phức tạp, phải hỗ trợ nhiều trình duyệt thì bạn nên sử dụng `CSS Modules` hoặc `CSS Stylesheet` (cách 3 hoặc cách 4)

REFERENCE: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822