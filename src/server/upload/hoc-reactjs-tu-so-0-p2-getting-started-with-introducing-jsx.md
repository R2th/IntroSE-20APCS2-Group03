Hi Mọi người.
Ở bài trước chúng ta đã setup xong môi trường, hôm nay chúng ta sẽ bắt đầu tiến hành tìm hiểu về ReactJs nhé.

# Getting Started
Trước tiên chúng ta sẽ định nghĩa React là gì.
- React là một thư viện được phát triển dựa trên Javascript, nó tới với trái đất để xây dựng giao diện người dùng.
- React sử dụng function **render()** để biến các giá trị đầu vào và trả về những gì sẽ hiển thị.
- React sử dụng cú pháp JSX để biểu diễn code, không bắt buộc sử dụng nhưng JSX được nhà phát triển React khuyến khích sử dụng
- React dựa vào **props** và **state** để gọi function **render()**, giúp cho những gì hiển thị luôn là mới nhất.

# Introducing JSX
## Why JSX?
> JSX is optional and not required to use React. Try the[ Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA) to see the raw JavaScript code produced by the JSX compilation step.
> 
Như đã nói, JSX là không bắt buộc sử dụng nhưng nhưng hầu hết mọi người đều thấy nó hữu ích như một trợ giúp trực quan khi làm việc với UI bên trong mã JavaScript. Nó cũng cho phép React hiển thị các thông báo lỗi và cảnh báo hữu ích hơn..

```JSX
const element = <h1>Hello, world!</h1>;
```

cú pháp trên gọi là JSX thay vì sử dụng code javascript như đoạn code sau:
```
const element = React.createElement("h1", null, "Hello, world!");
```

## Sử dụng JSX như thế nào.
Như định nghĩa ban đầu thì JSX được sử dụng trong React để giúp chúng ta làm việc một cách trực quan hơn với javascript nhưng nó còn có nhiều chức năng hữu ích hơn nhiều.
### Nhúng một biểu thức (Expressions)  vào JSX
>You can put any valid JavaScript expression inside the curly braces in JSX. 
>
Có thể hiểu nôm na là bạn có thể nhúng bất cứ biểu thức nào vào JSX bằng cách để biểu thức đó vào giữa 2 đấu ngoặc nhọn **{}**

```
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

### JSX is an Expression Too
> After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.
> 
Chúng ta có thể hiểu sau khi được compilation convert về javascript thì tất cả sẽ được convert về kiểu **function** và **object** và JSX Expressions cũng không là ngoại lệ. Vì vậy JSX Expressions còn có thể sử dụng  trong các câu lệnh if, vòng lặp for,...

> This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions
```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
### Specifying Attributes with JSX
Để gán value cho các attribute các bạn có thể sử dụng 2 cách:
 - sử dụng dấu quote **""** (quotes)
 - sử dụng dấu ngoặc nhọn** {}** (curly braces)

Sử dụng dấu Quote để gán giá trị attribute
```
const element = <div tabIndex="0"></div>;
```
Sử dụng curly braces để gán giá trị attribute
```
const element = <img src={user.avatarUrl}></img>;
```

> **Warning:**
>  - Quote và curly braces chỉ nên sử dụng 1 trong 2 cách để gán giá trị, ko sử dụng **Curly braces** phía trong **Quote**  vì lúc đó **Curly braces** sẽ là 1 chuỗi tring
>  - React DOM uses camelCase property naming convention instead of HTML attribute names. For example, class becomes className in JSX, and tabindex becomes tabIndex.
>  

### Specifying Children with JSX
Giống như là XML thì JSX cũng có cơ chế đóng mở tag.
- If a tag is empty, you may close it immediately with />, like XML

```
const element = <img src={user.avatarUrl} />;
```

- JSX tags may contain children:

```
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX Prevents Injection Attacks
> Everything is converted to a string before being rendered. 
> 
Tất cả các JSX Epressions sau khi được chạy trả về kết quả thì tất cả các giá trị trả về đều sẽ được convert hết về string, đảm  bảo rằng không có một đoạn code thực thi nào được chạy sau khi convert, điều này giảm thiểu tối đa việc tấn công bằng XSS[ (cross-site-scripting) ](https://en.wikipedia.org/wiki/Cross-site_scripting)

Ok hôm nay chúng ta sẽ dừng ở đây  nhé mn