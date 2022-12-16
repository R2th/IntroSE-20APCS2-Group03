![](https://images.viblo.asia/314ef8e8-606a-4d3f-a699-e8d845a6c034.png)
## Khi nào thì sử dụng Context
Context được thiết kế để chia sẻ các “global” data cho cây React component, như là tình trạng authen của user, theme, hoặc language trong setting. Như ví dụ sau đây, props theme được truyền thủ công tới component Button. 

```javascript
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // The Toolbar component must take an extra "theme" prop
  // and pass it to the ThemedButton. This can become painful
  // if every single button in the app needs to know the theme
  // because it would have to be passed through all components.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}

```

Nếu sử dụng Context chúng ta có thể tránh được việc phải pass props xuống element trực tiếp.

```javascript
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

## Trước khi sử dụng Context
Context chỉ nên được sử dụng khi mà data cần được truy cập bởi nhiều component ở các nesting level khác nhau. Cho nên các bạn nên sử dụng nó một cách cẩn thận, vì nó sẽ làm cho việc reuse các component trở nên khó khăn hơn.

Nếu bạn chỉ đang muốn tránh phải pass vài props qua nhiều level, thì hãy cân nhắc sử dụng Component Composition như là một giải pháp đơn giản hơn

Ví dụ, component Page truyền props user và avatarSize xuống nhiều level để component Link và Avatar có thể đọc được.
```javascript
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... which renders ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... which renders ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

Và tất nhiên việc truyền props user và avatarSize đi qua khắp các component, mặc dù chỉ có 1 vài component thật sự cần dùng tới nó rất là khó chịu. 

Một cách để giải quyết vấn đề này mà không cần dùng tới context là pass cả componentnent Avatar xuống, và bằng cách đó, thì những component nằm phía trên Avatar sẽ ko cần phải biết tới props user và avatarSize nữa.
```javascript
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Now, we have:
<Page user={user} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```

Với thay đổi như trên, chỉ cần component Page là cần biết tới việc Link và Avatar cần sử dụng tới props user và avatarSize

Pattern này gọi là Inversion of Control, có thể giúp code gọn gàng sạch sẽ hơn trong nhiều trường hợp, đồng thời có thể cho root component nhiều kiểm soát hơn. Tuy nhiên thì đây ko hẳn là lựa chọn chính xác trong nhiều trường hợp: nhiều này làm cho các component ở level cao phức tạp hơn, đồng thời bắt buộc các component ở level thấp phải flexible hơn. 

Pattern này cũng hiệu quả trong nhiều trường hợp bạn muốn decouple giữa component con và cha. Thậm chí bạn có thể dùng render props nếu component con cần phải communicate với cha trước khi render.

Mặc dù thế, thỉnh thoảng một data cần được sử dụng ở nhiều nơi khác nhau với nhiều nesting level khac nhau. Context giúp broadcast data đó, và apply thay đổi với data đó tới tất cả các component phía dưới. Vài use case hữu dụng đó là setting của theme, ngôn ngữ  vvv.

## API
### React.createContext
```javascript
const MyContext = React.createContext(defaultValue);
```
Tạo một object Context. Khi React render một component mà subscribles tới Context object này, Nó sẽ đọc giá trị Context từ Provider gần nhất nằm phía trên nó trong cây component.

defaultValue argument chỉ được dùng kh mà một component không có Provider nào phía trên nó trong cây component. 

### Context.Provider
```javascript
<MyContext.Provider value={/* some value */}>
```

Mỗi Context đi kèm với một Provider component, cho phép component sử dụng Context có thể subscrible với mỗi thay đổi của Context

Một provider có thể kết nối tới nhiều consumer,. Provider cũng có thể được lồng để override các giá trị ở các component ở sâu hơn.

Tất cả các consumer là con của Provider sẽ được re-render mỗi khi props value của Provider thay đổi. Và Provider không tuân theo method shouldComponentUpdate, nên component consumer sẽ update kể cả khi component cha không cập nhật.

### Class.contextType

```javascript
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

thuộc tính contextType của một class có thể được gán bằng một Context object tạo từ React.createContext().  Điều này cho phép bạn sử dụng giá trị của context này với từ khoá this.context. 

### Context.Consumer
```javascript
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

Đây là một component subscribe một Context. Điều này cho phép bạn subscribe một context trong một function component.

Yêu cầu một function con. Function nhận value của Context hiện tại rồi return một React node.  Giá trị của tham số value truyền vào sẽ bằng với prop value của Provider gần nhất. nếu không có Provider nào, thì giá trị sẽ bằng với defaultValue đã được truyền vào khi createContext().

## Ví dụ
### Dynamic Context

Một ví dụ phức tạp hơn với giá trị dynamic cho theme:

**theme-context.js**
```javascript
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

**themed-button.js**
```javascript
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

**app.js**
```javascript
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

## Caveats
Bởi vì Context sử dụng tham chiếu để xác định lúc nào cần re-render, nên sẽ có vài lúc mà chường trình làm bạn giật mình bởi vì vài trường hợp consumers được updated ngoài ý muốn do parent của provider re-render. Ví dụ, đoạn code phía sau sẽ re-render tất cả các consumers, mỗi khi mà Provider được re-render vì nó luôn tạo object value mới 

```javascript
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

Để fix đoạn này, chúng ta đưa value lên state của parent 
```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

## Tham khảo
https://reactjs.org/docs/context.html