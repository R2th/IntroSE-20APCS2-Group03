Chào các bạn hôm nay chúng ta sẽ tiếp tục về bài Context nha.
[P1 xem ở đây](https://viblo.asia/p/hoc-reactjs-tu-so-0-advance-p1-context-XL6lAQnRlek)

#  Cách sử dụng context

### React.createContext
```Javascript
const MyContext = React.createContext(defaultValue);
```

Với cú pháp trên chúng ta sẽ tạo mới một context cho ứng dụng. Khi react render component đã đăng ký với context trên thì đều có quyền sử dụng giá trị của context ở lớp trên mà chúng ta đã tạo ra.

Giá trị `defaultValue` chỉ được sử dụng duy nhất khi react không tìm được một `Provider` nào khớp với giá trị ở lớp con đang gọi, Giá trị `defaultValue` rất hữu ích trong việc kiểm tra xem các component con có bị cô lập với lớp cha hay là ko. Nhưng các bạn cần nhớ rằng khi truyền vào `Provider` undefined thì sẽ ko sử dụng được giá trị `defaultValue`.

### Context.Provider

```Javascript
<MyContext.Provider value={/* some value */}>
```

Như đã nói ở P1 thì Context là một object nó được truyền qua nhiều lớp của component mà chúng ta ko cần phải đưa thông qua Props, cho nên khi một object được đưa vào Provider thì khi nó thay đổi thì Component cũng sẽ render lại như là một props change. Nhưng sẽ có một điểm khác ở chỗ 
 - Props change thì sẽ raise sự kiện `shouldComponentUpdate`
 - Context change thì sẽ re-render lại tất các các component được wrapper bên trong.

Cho nên ở bài trước mình có nói rằng chỉ nên đưa các giá trị mang tính chất global, ít thay đổi vì nó sẽ ảnh hưởng tới performance của cả app.

### Class.contextType

```
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* render something based on the value of MyContext */
  }
}
MyClass.contextType = MyContext;
```

Property `contextType` có thể được sử dụng để chứa một context được tạo bởi `React.createContext()` khi class được gán context

Ví dụ
```
MyClass.contextType = MyContext;
```

Với cách này các bạn có thể phân tầng Context, và các component có thể sử dụng giá trị Context ở gần nó nhất.  Để sử dụng giá trị của Context khi class được gán `contextType` thì bạn sử dụng từ khoá `this.context`

### Context.Consumer

```Javascript
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

Với việc sử dụng `Context.Consumer` thì khi context thay đổi giá trị thì các lớp component con sẽ được nhận được giá trị thay đổi và render lại. Một trong những tiện lợi của việc sử dụng `Context.Consumer` là trong function Component mà không nhất thiết là phải sử dụng class kế thừa từ React.Component


### Context.displayName

Đây là props để giúp chúng ta đặt tên Context và được sử dụng trong DevTools, 

Ví dụ dưới đây thì component  sẽ hiển thị tên Context theo như ý của chúng ta.

```
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

# Examples
### Dynamic Context


```theme-context.js
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
```


```themed-button.js
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
```

```app.js
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```