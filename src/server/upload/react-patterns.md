## 1. Stateless function

Stateless function là một cách tuyệt vời để define một reuseable components. Nó không có state, lifecycle của react, nó chỉ là một function.

```
    const Greeting = () => <div>Hello World!</div>
```

- Trường hợp nó nhận vào props và context.

```
const Greeting = (props, context) => 
    <div style={{color: context.color}}>Hello {props.name}!</div>
```

- Có thể define local variables:
```
const Greeting = (props, context) => {
  const style = {
    fontWeight: "bold",
    color: context.color,
  }

  return <div style={style}>{props.name}</div>
}
```

## 2. JSX spread attributes

Spread attributes là JSX feature. nó là một cú pháp ngắn gọn để truyển tất cả thuộc tính của object như JSX attrubutes.

```
// props written as attributes
<main className="main" role="main">{children}</main>

// props "spread" from object
<main {...{className: "main", role: "main", children}} />
```

```
const FancyDiv = props =>
  <div className="fancy" {...props} />
```

## 3. Destructuring arguments
Destructuring assignment is an ES2015 feature. It pairs nicely with props in Stateless Functions.

2 ví dụ dưới đây là tương đương.

```
const Greeting = props => <div>Hi {props.name}!</div>

const Greeting = ({ name }) => <div>Hi {name}!</div>
```

```
const Greeting = ({ name, ...props }) =>
  <div>Hi {name}!</div>
```

## 4. Conditional rendering

Nếu bạn thường xuyên sử dụng nhiều if else unless  sẽ làm code cho bạn thêm dài và xấu hơn.
if-else (tidy one-liners)

```
{condition
  ? <span>Rendered when `truthy`</span>
  : <span>Rendered when `falsey`</span>
}
```
if-else (big blocks)


```
{condition ? (
  <span>
    Rendered when `truthy`
  </span>
) : (
  <span>
    Rendered when `falsey`
  </span>
)}
```

## 5. Children types
React có thể render nhiều loại, trong hầu hết các trường hợp là array hoặc string.

string

```
<div>
  Hello World!
</div>
```

array

```
<div>
  {["Hello ", <span>World</span>, "!"]}
</div>
```

## 6. Render callback