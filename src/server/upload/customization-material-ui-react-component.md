**Material UI là gì**
Material UI là một thư viện gồm tập hợp các react component được Google viết cho reactJS theo phong cách của Material design. 

Material design là một ngôn ngữ thiết kế được google vào ngày 25 tháng 6 năm 2014, tại hội nghị Google I/O 2014. Nó mang đến phong cách tự do hơn với các cách bố trí dạng lưới, các phản hồi hoạt họa chuyển động, kéo giãn, và các hiệu ứng chiều sâu như ánh sáng và đổ bóng. 
Các bạn có thể xem thêm thông tin tại đây:http://material-ui.com/ 

**Cách cài đặt Material ui react component**

Trải qua rất nhiều version thì version mới nhất 3.9.2 và việc cài đặt Material UI và thêm dependencies vào package.json rất đơn giản:
```
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```
*Lưu ý với version nhất này làm việc với react >= 16.3.0 and react-dom >= 16.3.0*

 **Customization Material ui react component**

Material UI cung cấp cho ta 2 cách để có thể customization 

1. ***Override individual component styles via the style prop***

Cách này được dùng khi chúng ta cần override theme mặc định của material ui theo các style guilde của từng dự án khác nhau. 

Chúng ta có thể customization màu, kiểu màu sáng tối, kiểu chữ
    1.     Palette
    2.     Type (light / dark theme)
    3.     Typography

**Palette** thì chúng ta làm việc với object `palette`.  Nếu bất kỳ đối tượng trong palette.primary, palette.secondary hoặc palette.error ', chúng sẽ thay thế các giá trị theme mặc định.

1 Ví dụ đơn giản như sau
```
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});

function Palette() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
    </MuiThemeProvider>
  );
}

export default Palette;
```
**Type (light /dark theme)** cũng tương tự như 

```
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import WithTheme from './WithTheme';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true },
});

function DarkTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <WithTheme />
    </MuiThemeProvider>
  );
}

export default DarkTheme;
```

**Typography** chỉnh sửa kích thước chữ cũng rất dễ dàng, chúng ta có thể customization Font family, Font size, HTML font size

```
const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    // In Japanese the characters are usually larger.
    fontSize: 12,
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

2. ***Use a custom theme to style components***
Đối với component thì chúng ta có thể override theo 2 cách 
1.  Dùng `withStyles`
2.  Dùng props `style`

Với ***withStyles***  
```
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// property that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default function ClassesShorthand() {
  return <StyledButton>Classes Shorthand</StyledButton>;
}
```

Với `style`
```
<Typography
    variant="subheading"
    gutterBottom
    style={{
      color: 'rgb(0, 0, 0, 0.54)',
      width: '400px',
      fontSize: '16px',
      lineHeight: '24px',
    }}
  >
    style inline component
  </Typography>
```
**Kết luận**
Như vậy thư viện Material UI rất flexible cho chúng ta customize component thông qua các props đã được define sẵn cũng như customize theme cũng flexible không kém. Trên đây là những kinh nghiệm mình trải qua trong dự án. Mong các ý kiến đóng góp của mọi người.