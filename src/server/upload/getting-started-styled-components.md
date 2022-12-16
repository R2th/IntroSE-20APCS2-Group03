# Motivation
Styled-components là giải pháp để ta có thể style React component một cách tốt hơn, linh hoạt hơn.

# Installation
`npm install --save styled-components`


# Getting started
Để bắt đầu làm việc với styled-components, ta import thư viện: `import styled from 'styled-components';`

Một component đơn giản sẽ được style như sau:
```javascript
const DivWrapper = styled.div`
    text-align: center;
    color: #red;
`;

render() {
    <DivWrapper>
        Hello Worlds
    </DivWrapper>
}
```

Syntax styled.div\`\` lấy tính chất từ tính năng **tagged template literal** của ES6.


Một số tính năng sau đây giúp cho styled-components trở nên hữu ích khi ta cần tạo kiểu cho React components.

## Thay đổi dựa trên `props`


```javascript
const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

render(
    <div>
        <Button>Normal</Button>
        <Button primary>Primary</Button>
    </div>
);
```

Component có thể thay đổi style dựa trên props được truyền vào. Với `Button` có `props` là `primary` được set, thuộc tính `background` và `color` sẽ thay đổi.

## Extending Styles
Với thuộc tính này, ta có thể tái sử dụng một component đã được styled. Ta truyền vào hàm construtor `styled()` component ta muốn kế thừa.

```javascript
const Button = styled.button`
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

const TomatoButton = styled(Button)`
    color: tomato;
    border-color: tomato;
`;
```

Component ta muốn kế thừa có thể là styled component như ví dụ ở trên, hoặc có thể là một React component
```javascript
// This could be react-router-dom's Link for example
const Link = ({ className, children }) => (
    <a className={className}>
        {children}
    </a>
);

const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
`;
```

## Animation
Để sử dụng animation từ styled-components, ta import: `import { keyframes } from 'styled-components';`

```javascript
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`;

render(
    <Rotate>8</Rotate>
);
```

## Theming
Theme được tạo bằng wrapping tất cả components bên trong một component lớn là `ThemeProvider`. `ThemeProvider` được import bằng cách: `import { ThemeProvider } from 'styled-components';`

<br>

Component `ThemeProvider` tồn tại một props duy nhất là `theme`, các components bên trong `ThemeProvider` sẽ nhận thuộc tính `props.theme` để style.

```javascript
const Button = styled.button`
    border: 2px solid ${props => props.theme.primaryColor};
`;

const theme = {
    primaryColor: #DDD;
}

render() {
    <ThemeProvider theme={theme}>
        <Button>Click Me</Button>
    </ThemeProvider>
}

```

### Nested theme
Nếu một `ThemeProvider` được nested bên trong một parent `ThemeProvider` thì child `ThemeProvider` sẽ nhận vào cho theme props một function, parameter cho function đó là chính là theme props từ parent. Hãy xem ví dụ:

```javascript
// Define our `fg` and `bg` on the theme
const theme = {
    fg: "palevioletred",
    bg: "white"
};

// This theme swaps `fg` and `bg`
const invertTheme = ({ fg, bg }) => ({
    fg: bg,
    bg: fg
});

render(
    <ThemeProvider theme={theme}>
        <div>
            <Button>Default Theme</Button>

            <ThemeProvider theme={invertTheme}>
                <Button>Inverted Theme</Button>
            </ThemeProvider>
        </div>
    </ThemeProvider>
);
```

# Một vài chú ý
* Không viết styled-component bên trong hàm `render()`, việc này sẽ gây cho việc render trở nên chậm chạp.

# References
1. https://medium.freecodecamp.org/es6-tagged-template-literals-48a70ef3ed4d
2. https://www.styled-components.com/docs/basics#getting-started