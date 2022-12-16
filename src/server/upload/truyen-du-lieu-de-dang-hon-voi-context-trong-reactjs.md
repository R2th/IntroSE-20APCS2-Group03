Xin chào các bạn, hôm nay mình xin giới thiệu 1 tính năng trong React mà có thể giúp bạn giảm số lượng props phải truyền trung gian xuống. Đó là Context.

### 1. Context là gì: 
`Context`hay `React.Context` là một công cụ trong ReactJS, giúp truyền dữ liệu từ `Component` cha xuống con.

### 2. Tại sao lại phải dùng Context :
Bạn nên sử dụng Context khi có dữ liệu nào đó cần được truyền xuống nhiều Component ở nhiều tầng khác nhau. 
Trong quá trình sử dụng ReactJS, ắt hẳn bạn đã trải qua tình trạng mà cần truyền `props` xuống Component Tree. Sẽ không có vấn đề gì nếu Component Tree của bạn đơn giản, nhưng khi số Component tăng lên nhiều, Component Tree của bạn sẽ bắt đầu có nhiều tầng và việc truyền `props` xuống trở nên cực kỳ rườm rà. Tưởng tượng một tình huống sau:

```
const App = (props) => (
    <Page>
        <Heading />
   </Page>
);

const Heading = () => (
    <div>
        <UserInfo />
    </div>
)

const UserInfo = () => (
    <UserInfoContainer>
        <UserAvatar />
    <UserInfoContainer>
)
```

Như có thể thấy, component ở tầng cao nhất là `<App />` và component ở tầng thấp nhất là  `<UserAvatar />`. Giả dụ bạn muốn truyền xuống một props từ tầng cao nhất xuống tầng thấp nhất, ví dụ `user` và `theme`, có khả năng bạn sẽ phải làm như sau:

```
const App = (props) => {
    
    const { user } = props; // tương đương với const user = props.user;
    const theme = 'dark'';
    return (
        <Page>
            <Heading user={user} theme={theme}/>
       </Page>
      );
};

const Heading = (props) => {

    const { user, theme } = props;
    return (
        <div>
            <UserInfo user={user} theme={theme} />
        </div>
    );
};

const UserInfo = (props) => (

    const { user, theme } = props;
    return (
        <UserInfoContainer>
            <UserAvatar user={user} theme={theme} />
        <UserInfoContainer>
    );
)
```

Có thể thấy việc này rất mất thời gian. Chưa kể là nếu sau này bạn phải truyền thêm vào trong props, bạn sẽ phải truyền lại qua hết tất cả các tầng trung gian như trên, kèm theo việc rất nhiều component phải render lại. 

Vì vậy để tránh phải làm như trên, ReactJS cung cấp sẵn 1 API là `Context`. Thay vì phải truyền xuống nhiều tầng như trên thì bạn có thể làm như sau:
```
const ThemeContext = React.CreateContext('dark');
const UserContext = React.CreateContext({});

const App = (props) => (
    const { theme, user } = props;
   return (
       <ThemeContext.Provider value={theme}>
           <UserContext.Provider value={user}>
                <Page>
                    <Heading user={user} theme={theme} />
               </Page>
            <UserContext.Provider/>
       <ThemeContext.Provider />
   );
};

const Heading = () => (
    <div>
        <UserInfo />
    </div>
)

const UserInfo = () => (
    <ThemeContext.Consumer>
        {theme => (
         <UserContext.Consumer>
         {user => ( 
            <UserInfoContainer>
                <UserAvatar theme={theme} user={user} />
            <UserInfoContainer />
        )}
        <UserContext.Consumer />
        )}
    <ThemeContext.Consumer />
)
```

Để truyền props từ `<App />` xuống `<UserAvatar />`, ta chỉ cần bọc `<App />` vào với các `Provider` của `ThemeContext` và `UserContext`, rồi bọc `<UserAvatar />` bằng các `Consumer` của 2 Context trên.  

Nếu bạn dùng class Component và compponent chỉ sử dụng 1 context , bạn có thể sử dụng `contextType` .
Ví dụ:
```
 class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}
```

### 3.  Khi nào thì không nên dùng Context:
Như bạn đã thấy, Context có thể rất tiện dụng. Tuy nhiên chúng ta không nên lạm dụng nó vì làm vậy có thể khiến việc tái sử dụng Component trở nên rất khó khăn. Ở trong các ví dụ trước, có thể thấy Component `UserInfo`	rất khó có thể được sử dụng ở các chỗ khác vì nó sẽ yêu cầu `Context`. Nếu bạn chỉ đơn thuần cần truyền `props` xuống, thì có thể dùng `Component Composition`.  Mình sẽ lấy ví dụ như ở trên, mục tiêu là cần truyền `theme` và `user` xuống `UserAvatar` :

```
const App = () => (
    <Page>
        <Heading />
   </Page>
);

const Heading = () => (
    <div>
        <UserInfo />
    </div>
)

const UserInfo = () => (
    <UserInfoContainer>
        <UserAvatar />
    <UserInfoContainer>
)
```

Bạn có thể làm như sau:

```
const App = (props) => {
    const { user } = props;
    const theme = 'dark';
    const userInfo = (
        <UserInfoContainer>
            <UserAvatar user={user} theme={theme} />
        <UserInfoContainer>
    );
    
    return (
        <Page>
            <Heading userInfo={userInfo/>
       </Page>
   );
};

const Heading = (props) => {
    const { userInfo } = this.props;
    return (
        <div>
           {userInfo}
        </div>
    )
};

```

Ở trong ví dụ này mình đã nâng `UserInfo` lên component cao hơn cho tiện việc truyền props. Có thể thấy việc truyền props xuống đã dễ dàng hơn. 

### Lưu ý
Nếu bạn truyền vào `value`của `Provider` một object, các Component con sẽ luôn bị render lại.
```
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

Lý do là vì `{something: 'something'}` sẽ luôn là một object mới nên `value` sẽ luôn nhận vào 1 object mới. 

Để khắc phục điều này, bạn có nâng giá trị truyền vào value lên state của Component cha như sau: 
```
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

Hy vọng các bạn đã học được một công cụ mới có ích. Để biết thêm thông tin có thể tham khảo tại [đây](https://reactjs.org/docs/context.html).

Cảm ơn vì đã đọc.