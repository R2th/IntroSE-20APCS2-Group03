# Context
Chúng ta hiểu `Context` là gì, là nơi cung cấp cho chúng ta cách để truyền các giá trị xuống component con mà không cần truyền vào props của component con.

Thông thường khi truyền data giữa các Component thì chúng ta thường đưa chúng vào props của các component, điều này sẽ dẫn tới một số component sẽ có props rất là cồng kềnh và nhiều component có props giống nhau và để giải quyết vấn đề này thì chúng ta có một cách đó chính là sử dụng Context

## When to Use Context
Lý thuyết là vậy nhưng chúng ta không sử dụng Context để truyền tất cả data được. Vậy chúng ta sẽ sử dụng Context để truyền những data như thế nào.

Context được thiết kế để chia sẻ data giữa các component, loại data được share thông qua Context thường là các loại mang tính chất "Global" dùng chung cho nhiều Component, ví dụ như: thông tin người dùng, theme, ngôn ngữ.

Chúng ta sẽ bắt đầu bằng một ví dụ với theme.

```Javascript
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
Với ví dụ trên thì để sử dụng theme thì chúng ta sẽ phải đưa theme vào props của component và các bạn thử tưởng tượng xem nếu toàn bộ app sử dụng như vậy thì `theme={props.theme}` sẽ bị lặp bao nhiêu lần.

Còn với Context chúng ta sẽ sử dụng như sau:

```Javascript
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
function Toolbar() {
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

## Before You Use Context
Context thường là được sử dụng khi một số data cần được truy cập ở nhiều nhiều Component và ở nhiều cấp độ, Nhưng chúng ta cần phải thận trọng và không nên lạm dụng Context bởi vì nó sẽ làm cho việc tái sử dụng component trở nên khó hơn.

Nếu bạn chỉ muốn giảm tải việc truyền nhiều props giữa các component thì bạn nên xem xét sử dụng  [component composition](https://reactjs.org/docs/composition-vs-inheritance.html) hơn là Context.

Một ví dụ đơn giản như sau:
```Javascript
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

Với ví dụ trên thì bạn cần phải truyền `user` and `avatarSize` xuống tới lớp cuối cùng và chỉ có lớp cuối cùng sử dụng 2 prop trên, nhưng ở ví dụ trên thì 2 props đó được truyền qua nhiều lớp Component và nó là dư thừa, và khi `Avata` Component cần thêm một số props nữa thì chuyện gì sẽ xảy ra, props của các Component khác sẽ phình lên rất nhiều trong khi chúng ko có nhu cầu sử dụng các props đó.

Như đã nói ở trên thì chúng ta có thể vận dụng [component composition](https://reactjs.org/docs/composition-vs-inheritance.html)  bằng cách đưa component `Avatar` lên đầu tiên và truyền nó qua các Component khác, như vậy các Component khác sẽ ko cần quan tâm rằng `Avatar` sẽ thay đổi như thế nào mà nó chỉ cần nhận được 1 Component `Avatar` là đủ, còn về phần `Avatar` dù nó có cần bao nhiêu props đi nữa thì cũng ko ảnh hưởng tới các Component khác.

Với cách đảo ngược như này sẽ giúp code của bạn sạch sẽ hơn và dễ dàng `maintenance` hơn nhiều bằng cách giảm tải tối đa việc truyền props, tuy nhiên nó không phải là cách tốt trong nhiều trường hợp, chuyển qua một ví dụ có độ phức tạp cao hơn một tí

```Javascript
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

Bạn có thể thấy chúng ta không thể giới hạn một component chỉ có 1 component con, mà nó có thể truyền nhiều Component con một lúc hoặc là nhiều cách [xem tại đây](https://reactjs.org/docs/composition-vs-inheritance.html#containment). Đây là một ví dụ cho việc chia nhỏ Component thành nhiều thành phần ngay ở Component cha, nếu như muốn giao tiếp với Component cha (sử dụng các method, state, props của component cha) thì các bạn có thể sử dụng [Render Props](https://reactjs.org/docs/render-props.html).

Tuy nhiên trong thực tế thì nó không đơn giản như những ví dụ chúng ta vừa xem, mà sẽ phức tạp hơn nhiều, ví dụ như việc chia sẽ data không hẳn chỉ trong Component Cha và Con mà phải chia sẻ ở nhiều cấp độ khác nhiều, giữa nhiều component ngang hàng với nhau. Và Context có thể giúp các component có thể sử dụng chung data, nếu data trong Context thay đổi thì ở các Component sử dụng sẽ thay đổi theo.

Hôm nay chúng ta dừng ở việc Context là gì và khi nào thì sử dụng nó, bài sau sẽ nói về cách sử dụng nha mn.