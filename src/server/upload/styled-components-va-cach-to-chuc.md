Chào anh em, như tiêu đề hôm nay mình xin giới thiệu một vài thủ thuật làm việc với `styled components`.


Trong các dự án React mình support, phần lớn đều ứng dụng [styled components](https://styled-components.com/) để thay thế cho cách viết `CSS` hay `SCSS` truyền thống. Đây là thư viện thường dùng để styled cho React App.

![](https://images.viblo.asia/86b98fba-6891-4ee7-9b4c-3d1941fe2b9b.png)

#### Vì sao không dùng SCSS để styled?
Với React, ta viết các style của các component như CSS thông thường là `import` file CSS tương ứng này vào ở component đó (hoặc root component chứa nó).
Nếu là file SCSS ta có thể dùng `node-sass` để import thẳng vào hoặc có thể dùng webpack để build tương tự. Tuy nhiên với React thì cách đó không được khuyến khích, vì nó không thể hiện được CSS nào tương ứng với component nào, style nên đi kèm với component.

## Cài đặt
Với npm
```npm
npm install --save styled-components
```
Hoặc dùng CDN
```html
<script src="https://unpkg.com/styled-components/dist/styled-components.min.js"></script>
```

Tạo 1 component

```HTML
<!-- Cách truyền thống -->
<style>
  .card { 
    color: #00d8ff; 
    background: #222; 
  }
</style>

<div class="card"></div>
```

```js
// Với styled components
import styled from "styled-components";

const component = styled.nameTag`
  // css
`;

// Ví dụ tạo một component card
const Card = styled.div`
  padding: 10px;
  color: white;
  background: red;
  border: solid 1px green;
`;
```

Ta cũng có thể extends lại component dễ dàng
```js
// Extends component <Card />
const ProductItem = styled(Card)`
  transition: all .3s;

  &:hover {
    opacity: .7;
  }
`;
```

## Một số tricks có thể bạn chưa biết
### 1. Sử dụng Context API
```js
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  primaryColor: 'salmon',
  fontFamily: 'Bebas',
};

const Button = styled.button`
  background: ${({theme}) => theme.primaryColor};
  font-family: ${({theme}) => theme.fontFamily};
`;

<ThemeProvider theme={theme}>  
  <Button />
  
  {/* bạn cũng có thể override */}
  <Button theme={{ primaryColor: 'green' }} />
</ThemeProvider>
```

### 2. Styled linh hoạt với props
Đây là tính năng thú vị khi sử dụng styled components, bạn có thể truyền props các thuộc tính để styled linh hoạt hơn.
```js
export const Component = styled.div`
  /* Mặc định set background màu đỏ nếu không truyền vào props */
  background: ${({ background }) => background || "red"};

  /* Lấy giá trị size từ theme */
  font-size: ${({ theme }) => theme.fontSize.sm};

  /* Check điều kiện để lấy giá trị */
  margin-left: ${({ isRight }) => (isRight ? "20px" : "10px")};

  /* Hoặc có thể truyền props multiline */
  ${({ isPrimary, theme }) =>
    isPrimary &&
    css`
      margin: 10px 0;
      padding: 0 10px;
      color: ${theme.colors.orange};
      transition: all .3s;
  `}
`;

const Component = () => (
  <Component background="yellow" isRight isPrimary />
);
```

### 3. Selector đến phần tử khác
Giống với CSS truyền thống, bạn cũng có thể selector được đến phần tử con hoặc ngang cấp.

```js
const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: white;
  color: ${({ theme }) => theme.colors.red};

  /* Cách truyền thống */
  &:hover svg {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;

  /* Với styled components */
  ${Link}:hover & {
    fill: ${({ theme }) => theme.colors.yellow};
  }
`;

const SelectorDemo = () => (
  <Link href="#">
    <Icon viewBox="0 0 20 20">
      <path d="M10 15h8c1 0 2-1 2-2V3c0-1-1-2-2-2H2C1 1 0 2 0 3v10c0 1 1 2 2 2h4v4l4-4zM5 7h2v2H5V7zm4 0h2v2H9V7zm4 0h2v2h-2V7z" />
    </Icon>
  </Link>
);
```

### 4. Kế thừa styled nhưng custom tagName
Với styled components bạn cũng có thể thay đổi tag name so với định nghĩa ban đầu. Phù hợp cho việc tạo common nhưng có thể thay đổi linh hoạt cấu trúc tag HTML5 cho phù hợp.
```js
const Footer = styled.div`
  color: white;
  background: gray;
  margin-top: 50px;
  border-top: 2px solid yellow;
`;

// Thay đổi tag div => footer
<Footer as="footer"></Footer>
```

### 5. Thêm attribute thông qua `attrs`
```js
const Input = styled.input.attrs(() => ({
  type: "text",
}))`
  border: 1px solid red;
  border-radius: 6px;
`;
```

### 6. Override existing / inline style
Thông thường nó được sử dụng khi bạn override styled của một component đã có sẵn ở thư viện, ví dụ bạn sử dụng [reactstrap](https://reactstrap.github.io/) và muốn custom component thì hãy xem phần demo bên dưới:
```js
const MyStyledBox = styled(AlreadyStyledComponent)`
  &&& {
    color: palevioletred;
    font-weight: bold;
  }
`;

// Became
.MyBox.MyBox.MyBox {
  color: palevioletred;
  font-weight: bold;
}

// Override Inline style
const MyStyledComponent = styled(InlineStyledComponent)`
  &[style] {
    font-size: 12px !important;
    color: blue !important;
  }
`;
```

### 7. Định nghĩa `keyframe` CSS3
```html
<!-- Cách truyền thống -->
<style>
  @keyframes bouncedelay {
    0%, 80%, 100% { transform: scale(0.0); } 
    40% { transform: scale(1.0); }
  }

  .bounce {		
    animation: bouncedelay 1.4s infinite ease-in-out;
  }	
</style>

<div className='bounce'></div>
```

```js
// Styled components
const bouncedelay = keyframes`
  0%, 80%, 100% { transform: scale(0.0); } 
  40% { transform: scale(1.0); }
`;

const Bounce = styled.div`
  animation: ${bouncedelay} 1.4s infinite ease-in-out;
`;

const ComponentBounce = () => (
  <Bounce/>
);
```

### 8. Mixins pattern
```js
// Mixin breakpoint
export const breakpoint = {
  xxs: (...args) => css`
    @media (max-width: 576px) {
      ${css(...args)}
    }
  `,
  xs: (...args) => css`
    @media (max-width: 767.98px) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (max-width: 991.98px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (max-width: 1199.98px) {
      ${css(...args)}
    }
  `
};

// Mixin position
export const position = {
  relative: css`
    position: relative;
    left: ${({left}) => left}px;
    top: ${({top}) => top}px;
    right: ${({right}) => right}px;
    bottom: ${({bottom}) => bottom}px;
  `,
  absolute: css`
    position: relative;
    left: ${({left}) => left}px;
    top: ${({top}) => top}px;
    right: ${({right}) => right}px;
    bottom: ${({bottom}) => bottom}px;
  `
};

// Dùng mixin
const Circle = styled.div`
  background: yellow;
  border: 1px solid yellow;
  ${position.position}

  ${breakpoint.sm`
    display: flex;
    flex-direction: column;
  `}
`;

const IconCircle = () => (
  <Circle top="10" left="150" />
);
```

### 9. Quy hoạch thế nào để dễ quản lý
Đến đây chắc các bạn cũng đã biết kha khá về thanh niên này. Mình thường tổ chức project React với cấu trúc như bên dưới, mình nghĩ đây là cách tổ chức tối ưu nhất để làm việc với styled components.
```
- src/
|---index.js
|---App.js
|---components/
|  |---styles/
|  |  |---globalStyles.js
|  |  |---theme.js
|  |  |---mixin.js
|  |  |---images.js
|
|  |---common/
|  |  |---Form/
|  |  |  |---index.jsx
|  |  |  |---styled.js
|  |  |---Table/
|  |  |  |---index.jsx
|  |  |  |---styled.js
|
|  |---layout/
|  |  |---Header/
|  |  |  |---index.jsx
|  |  |  |---styled.js
|  |  |---Footer/
|  |  |  |---index.jsx
|  |  |  |---styled.js
|
|  |---pages/
|  |  |---About/
|  |  |  |---index.jsx
|  |  |  |---styled.js
|  |  |---Contact/
|  |  |  |---index.jsx
|  |  |  |---styled.js
```

## Nhận xét
### Điểm mạnh
* Truyền được props linh hoạt
* Performance tốt tối ưu
* Đóng gói được styled vào component, tránh vấn đề trùng lặp override selector
* Cách viết lồng, thừa kế, có prefix giống SCSS và dễ tiếp cận

### Hạn chế
* Tốn nhiều thời gian định nghĩa component
* Tên class được generate ngẫu nhiên nên sẽ gây khó chịu cho người quen debug css bằng tên class
* Là kiểu viết `CSS-in-JS` nên sẽ có nhiều người chưa thích
* Không được dùng ref trên component phải chuyển sang innerRef bởi vì ref sẽ được truyền vào wrapper của styled component thay vì component mình muốn.

### Thời buổi này phải dùng tools
#### - Debug tool
Với styled components, để debug CSS không phải là chuyện dễ dàng. Tuy nhiên **"*vỏ quýt dày có móng tay nhọn, móng tay nhọn đã có bấm móng tay*"**. Đây là tool debug hàng chính chủ, bạn có thể follow ở link này để setup trong source:
https://styled-components.com/docs/tooling
#### - Extension VS Code
Để tăng tốc độ gõ phím mình thường dùng 2 em này, có nhiều tính năng support
- Autocomplete & suggestion:
https://marketplace.visualstudio.com/items?itemName=blanu.vscode-styled-jsx
- Format, syntax highlight:
https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components
---
Nếu anh em có thêm tricks hay, thú vị hãy chia sẻ thêm ở comment nhé! Cảm ơn các bro.