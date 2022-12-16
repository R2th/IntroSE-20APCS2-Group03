Vừa rồi mình vừa học được cách dùng `themeprovider` và `styled-component` để tạo hiệu ứng chuyển theme sáng tối trong reactjs

# Bắt đầu nào
1. Tạo app reactjs
```
    npx create-react-app change-theme
    cd change-theme
```

2. thêm lib `styled component`
```
    npm install --save styled-component
```

3. Tạo file theme.js để config màu cho light theme và dark theme
```js
// theme.js
const lightTheme = {
  textColor: "#fff",
  background: "#000"
};

const darkTheme = {
  textColor: "#000",
  background: "#fff"
};
```
**Chú ý**: bạn phải để 2 biến muốn chuyển của element có tên giống nhau.

4. Tạo global.js để config các biến chung màu chung của trang.
```js
// global.js
const Global = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    transition: all 200ms;
  }
`;
```
`${({ theme }) => theme.background}`  với biến `theme` là biến chúng ta để quản lý người dùng đang chọn theme gì sẽ được viết ở phần dưới. Còn `background` là biến chúng ta tạo ở file `theme.js` để biết người dùng đang chọn theme gì để lấy màu cho `background`

5. Tạo component `TextChange` để check.
```js
const TextChange = styled.h1`
  color: ${({ theme }) => theme.textColor};
`;
```
`${({ theme })` biến theme ở đây cũng tương tự như trên

6.  Đầu tiên bạn dùng `useState` và tạo function `toggleTheme`
```js
// App.js
const [theme, setTheme] = useState("light");
const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
};
```
state `theme` là nơi để ta điều khiển theme của cả trang

7. Ở phần render ta viết như sau.
```js
// App.js
export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Global />
        <button onClick={toggleTheme}>Toggle Theme</button>
        <TextChange>Dark Mode</TextChange>
      </ThemeProvider>
    </div>
  );
}
```
`ThemeProvider` là thằng cung cấp biến theme để xác định theme nào đang được chọn để hiển thị. Với việc control biến theme là function `toggleTheme` được gán cho `button`

8. Cuối cùng ta sẽ được kết quả
<br>
Link Demo
https://dlu8l.csb.app/

9. Các bạn có thể làm cho gọn file `App.js` bầng cách tách việc control theme ra hẵn 1 file với tên `useDarkMode`
```js
// DarkMode.js
export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return [theme, toggleTheme];
};
```

10. Ta sửa file `App.js` lại:
```js
// App.js
export default function App() {
  const [theme, setTheme] = useDarkMode();
  return (
    <div className="App">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Global />
        <button onClick={toggleTheme}>Toggle Theme</button>
        <TextChange>Dark Mode</TextChange>
      </ThemeProvider>
    </div>
  );
}
```
Bây giờ `App.js` của ta đã gọn hơn nhiều rồi.

11. Nếu các bạn muốn giữ việc chọn theme trước đó, mặc dù đã tắt browser. Thì bạn có thể dùng theo `localStorage` để giữ lại lại chọn của mình trước đó.
     Trong file `DarkMode.js` ta thêm một chút là có thể làm được điều đó rồi
```js
// DarkMode.js
export const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, toggleTheme];
};
```
# Kết
Đó là những gì mình đã học được trong việc làm `Switch Theme` trong reactjs với `styled-component`