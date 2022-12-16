Styled-Components là một library cho phép chúng ta encapsulate (đóng gói) style vào trong component trong js nhưng vẫn giữ được những tính năng của css trong projet React.

Phần install library các bạn có thể tham khảo ở [đây](https://www.styled-components.com/docs)
Sau đây là một số tính năng mình thấy rất hay trong việc apply styled-component:

### 1. attrs

 - Sử dụng attrs thêm các attribute

```
const Input = styled.input.attrs({
  type: 'text',
})`
  padding: 6px 12px; 
`;

```

- Sử dụng attrs rất tiện lợi trong việc apply trong việc sử dụng framework css với class module.

```
  # Ta có thể add thêm class của bootstrap

  const Button = styled.button.attrs({
   className: `btn btn-primary btn-${props => props.size || 'medium'}`
  })``;


# Sử dụng

<Button size="large" />


```

### 2.  Tự động thêm các tiền tố css

```
# Style component 

  display: flex;
  flex-direction: row;

# Css nhận được
  -ms-flex: 1;
  flex: 1 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;

```

### 3. Sử dụng Mixins pattern
- Ta hoàn toàn có thể sử dụng mixins giống khi sử dụng trong SCSS, LESS
```
import { css } from 'styled-components';

const marginMixinFunc = (top, right, bottom, left) => {
   return `margin: ${top}px ${right}px ${bottom}px ${left};`;
}

const StyledMargin = styled.div`
   ${marginMixinFunc(10, 20, 10, 10)}
`;
```

### 4. Chuyển đổi element với withComponent

```
const Button = styled.button`
  background-color: blue;
`;

# Chuyển đổi style button → a

const Link = Button.withComponent('a');


```

### 5. Css lồng nhau
- Nó không chỉ xuất hiện trong SCSS hay LESS mà trong styled component ta cũng có thể sử dụng.

```
# example
const Box = styled.div`
  width: 500px;
 height: 300px;
  ::before {
    content: '';
  }
  ::after {
    content: '';
  }
`;

```
### 6. Sử dụng variable với ThemeProvider.

- Việc truy cập variable ta hay sử dụng trong viết SCSS hay LESS, đối với styled component ta import nó thông qua ThemeProvider

```
  import styled, { ThemeProvider } from 'styled-components';
  const theme = {
    colors: {
        white: '#fff',
        porcelain: '#f6f7f8',
        sirocco: '#6E7D7C',
        dodger_blue: '#3296f8',
        black: '#000000',
        caribbean_green: '#00bbb0',
      },
  };
const Button = styled.button`
  background: ${props => props.theme.colors.white }
  color: ${props => props.theme.colors.black}
`;

<ThemeProvider theme={theme}>  
  <Button /> 
</ThemeProvider>


```

### 7. Tùy biến style với điều kiện giá trị props

```
const Button = styled.button`
  background-color: ${props =>
   (props.type === 'primary' && 'blue') || 
   (props.type === 'danger' && 'red') ||
   (props.type === 'warning' && 'yellow') ||
  }`

# Sử dụng
<Button primary />
```


### Tài liệu tham khảo
https://www.styled-components.com/docs/basics

https://github.com/styled-components/styled-components