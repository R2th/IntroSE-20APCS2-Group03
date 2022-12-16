# Introdution
Thông thường, data trong React sẽ được truyền từ trên xuống dưới (parent to child) thông qua `props`, tuy nhiên trong những trường hợp ta cần chia sẻ dữ liệu trong toàn bộ app mà không phải truyền `props` qua từng tầng của React component tree, ta sử dụng React Context.

# Trước khi sử dụng Context
Context được sử dụng khi dữ liệu cần được truy cập ở nhiều components ở các level khác nhau. Nếu bạn chỉ muốn tránh việc phải truyền `props` qua nhiều tầng khác nhau, sử dụng [component composition](https://reactjs.org/docs/composition-vs-inheritance.html) sẽ dễ dàng hơn.

<br>

Ví dụ: `Page` component cần truyền hai `props` là `user` và `avatarSize` cho  `Link` component.

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

Theo cách thông thường thì ta phải truyền hai `props` này qua các level of component rồi mới đến được `Link` component. Việc này sẽ gây dư thừa `props` cho các component ở giữa khiến code trở nên khó đọc.

<br> 

Để giải quyết vấn đề này mà không sử dụng context, ta sẽ truyền cả `Link` component xuống dưới như là `props`.
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
<Page user={user} avatarSize={avatarSize}/>
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```

# Setup React context
Để setup React context, ta có hai bước:
1. Setup **context Provider** và định nghĩa dữ liệu mà ta muốn lưu trữ.
2. Sử dụng **context Consumer** ở bất cứ nơi nào ta muốn đọc dữ liệu.

Để khởi tạo context provider,  ta sử dụng [React.createContext](https://reactjs.org/docs/context.html#reactcreatecontext).
```javascript
const MyContext = React.createContext(defaultValue);
```

Sau đó, ta wrap React components cần truy cập dữ liệu từ context bởi context [Provider](https://reactjs.org/docs/context.html#contextprovider).
```javascript
const state = {
    name: "Quang",
    age: 24
}

render() {
    return (
        <MyContext.Provider value={state}>
            <Components>
        </MyContext.Provider>
    );
}
```

Dữ liệu từ `value` sẽ được truyền vào trong context, để truy cập dữ liệu ta sử dụng context [Consumer](https://reactjs.org/docs/context.html#contextconsumer).
```javascript
<MyContext.Consumer>
    {(context) => context.name}
</MyContext.Consumer>
```

Giá trị `value` mà Consumer nhận được là từ Provider gần nó nhất, nếu không có Provider nào thì giá trị `defaultValue` sẽ được sử dụng. Tất cả Consumers gán với Provider sẽ re-render khi mà giá trị `value` của Provider thay đổi .

# Thay đổi data trong context 
Trong trường hợp ta muốn thay đổi data trong context từ component consume context, ta sẽ thêm một function là properties của data ta truyền vào giá  trị `value` của context. Ví dụ cụ thể:
```javascript
const state = {
    name: "Quang",
    age: 24,
    increment: () => {
        this.setState({
            ...this.state,
            age: this.state.age + 1
        });
    }
}

render() {
    return (
        <MyContext.Provider value={state}>
            {(context) => <button onClick={context.increment}>INC</button>}
        </MyContext.Provider>
    );
}
```

# References
1. https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
2. https://reactjs.org/docs/context.html