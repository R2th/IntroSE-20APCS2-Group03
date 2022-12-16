# Mở đầu
## Styled-components là gì ?
Styled-component là một thư viện CSS-in-JS tuyệt vời dành cho ReactJS. Nó giúp bạn có thể tùy biến và quản lý code CSS một cách dễ dàng.

Cài đặt Styled-components như sau:
```javascript
# with npm
npm install styled-components

# with yarn
yarn add styled-components
```
## Styled-components cơ bản
Khi làm việc với Styled-component các component được viết trong file với đuôi .ts hoặc .js.

Với các ví dụ bên dưới mình sẽ tạo components trong file **styles.js**. 

Sau đó bạn cần phải thực hiện export , import
### Tạo một component bằng styled-components
```javascript
import styled from 'styled-components';
// Tạo một component Title và nó sẽ render ra thẻ h1 với các styles
const Title = styled.h1`
  font-size: 16px;
  text-align: center;
  color: black;
`;

// Tạo một component Wrapper và nó sẽ render ra thẻ section với các styles
const Wrapper = styled.section`
  padding: 60px;
  background: blue;
`;

// Sử dụng Title và Wrapper như là một React component
render(
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
);
```
### Props
Bạn cũng có thể truyền props qua một component như React để có thể tùy biến CSS.
```javascript
import styled from 'styled-components';
// Tạo một Button với các styles như sau:
const Button = styled.button`

/* ở đây nhận vào một props primary dùng toán tử 3 ngôi để kiểm tra và set giá trị cho background */

  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```
Một ví dụ khác cho việc pass props.
```javascript
// Tạo một input component
const Input = styled.input`
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

render(
  <div>
    <Input defaultValue="Không màu" type="text" />
    <Input defaultValue="Có màu" type="text" inputColor="rebeccapurple" />
  </div>
);
```
### Extending Styles
Là một cách dễ dàng để tạo ra một component mới được kế thừa những styles của component cũ.
```javascript
import styled from 'styled-components';
// Tạo một component Button có màu blue
const Button = styled.button`
  color: blue;
  font-size: 1em;
  border: none;
  border-radius: 3px;
`;

// Tạo một RedButton kế thừa những style từ Button component phía trên và ghi đè, thêm mới một số styles
const RedButton = styled(Button)`
  color: red;
  border-color: red;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <RedButton>Red Button</RedButton>
  </div>
);
```
### Styling any component
Tính năng này giúp chúng ta có thể CSS cho một component bất kì ví dụ như Link trong React-router-dom.
```javascript
import styled from 'styled-components';
// Thực hiện việc import Link từ React-router-dom
// Tạo một component mới kế thừa từ Link component
const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

render(
  <div>
    <Link>Link chưa được CSS</Link>

    <StyledLink>Sau khi CSS</StyledLink>
  </div>
);
```

### CSS Selector
Trong Styled-components có thể sử dụng những CSS selector cơ bản như > , + , ~ ...

Và sử dụng Nesting như SASS
```javascript
import styled from 'styled-components';
const Thing = styled.div`
  color: blue;
  /* & ở đây đại diện cho thẻ div được hiểu như sau div:hover */
  &:hover {
    color: red; // <Thing> khi hover vào thẻ div
  }

  & ~ & {
    background: tomato; // <Thing> nằm phía sau không trực tiếp của <Thing>
  }

  & + & {
    background: lime; // <Thing> nằm phía sau trực tiếp của <Thing>
  }

  &.something {
    background: orange; // <Thing> có class .something
  }

  & .something {
    border: 1px solid; // element có class .something nằm bên trong <Thing>
    display: block;
  }

  .something-else & {
    border: 1px solid; // <Thing> nằm bên trong của element có class .something-else
  }
`

render(
  <React.Fragment>
    <Thing>Hello world!</Thing>
    <Thing>How ya doing?</Thing>
    <Thing className="something">The sun is shining...</Thing>
    <div>Pretty nice day today.</div>
    <Thing>Don't you think?</Thing>
    <div className="something-else">
      <Thing>Splendid.</Thing>
    </div>
  </React.Fragment>
)
```

### Animations 
```javascript
import styled from 'styled-components';
import { keyframes } from 'styled-component';
// Tạo keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// áp dụng vào animation css
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(
  <Rotate>💅🏾</Rotate>
);
```

###  Sử dụng Styled-component trong React như thế nào ?
```javascript
import React from 'react'
import styled from 'styled-components'

const StyledCounter = styled.div`
  /* ... */
`
const Paragraph = styled.p`
  /* ... */
`
const Button = styled.button`
  /* ... */
`

// Một component đơn giản là Counter
export default const Counter = () => {
  const [count, setCount] = useState(0);

  render() {
    return (
      <StyledCounter>
        <Paragraph>{count}</Paragraph>
        <Button onClick={() => setCount(count + 1)}>+</Button>
        <Button onClick={() => setCount(count - 1)}>-</Button>
      </StyledCounter>
    )
  }
}
```

## Kết luận
Trên đây là những tính năng cơ bản của Styled-components. Mặc dù cơ bản nhưng nó đủ để bạn có thể ứng dụng vào ReactJS rồi.

Hãy đón xem **phần 2** với nhưng tính năng như theme, global, css nhé. Cảm ơn bạn đã đọc bài viết.